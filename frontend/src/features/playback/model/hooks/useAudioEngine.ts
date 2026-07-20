import { useRef, useState } from 'react';
import { CONNECT_TIMEOUT_MS, INITIAL_VOLUME, RETRY_DELAYS_MS } from '../constants';
import { createRetrySchedule } from '../retrySchedule';
import { useTimer } from './useTimer';
import { useActionToken } from './useActionToken';
import { useAudioElement } from './useAudioElement';
import type { AudioEngine, PlayerStatus } from '../types';

// Оркестрация надёжного воспроизведения: попытка → таймаут → повторы → статус.
export const useAudioEngine = (): AudioEngine => {
	const [status, setStatus] = useState<PlayerStatus>('idle');
	const [playError, setPlayError] = useState<string | null>(null);
	const [volume, setVolumeState] = useState(INITIAL_VOLUME);

	const token = useActionToken();
	const connectTimer = useTimer();
	const retryTimer = useTimer();
	const retriesRef = useRef(createRetrySchedule(RETRY_DELAYS_MS));

	// Одна попытка подключения: ждём звук не дольше таймаута.
	const attemptConnect = (audio: HTMLAudioElement, actionToken: number, reload: boolean) => {
		setStatus('connecting');

		if (reload) audio.load();

		// пустой catch: реальный отказ поймают событие error или таймаут
		audio.play().catch(() => {});

		connectTimer.start(() => handleFailure(actionToken), CONNECT_TIMEOUT_MS);
	};

	// Провал попытки: повтор по расписанию или честная ошибка.
	const handleFailure = (actionToken: number) => {
		if (!token.isCurrent(actionToken)) return;

		if (retryTimer.isActive()) return;

		connectTimer.clear();

		const delayMs = retriesRef.current.nextDelayMs();

		if (delayMs === null) {
			setStatus('error');
			setPlayError('станция не отвечает');

			return;
		}

		retryTimer.start(() => {
			if (!token.isCurrent(actionToken)) return;

			const audio = audioRef.current;
			if (audio) attemptConnect(audio, actionToken, true);
		}, delayMs);
	};

	// Статус ведём по событиям самого <audio>, а не по промису play().
	const audioRef = useAudioElement({
		onPlaying: () => {
			connectTimer.clear();
			retryTimer.clear();
			retriesRef.current.reset();

			setStatus('playing');
		},
		onWaiting: () => {
			setStatus('connecting');

			// затянувшаяся ребуферизация — тоже провал
			if (!connectTimer.isActive() && !retryTimer.isActive()) {
				connectTimer.start(() => handleFailure(token.current()), CONNECT_TIMEOUT_MS);
			}
		},
		onError: () => handleFailure(token.current()),
		// смена src стреляет pause — в connecting игнорируем
		onPause: () => setStatus((prev) => (prev === 'connecting' ? prev : 'paused')),
	});

	// Новое действие пользователя отменяет всё отложенное.
	const beginAction = (): number => {
		connectTimer.clear();
		retryTimer.clear();
		retriesRef.current.reset();

		return token.next();
	};

	const play = (src: string) => {
		const audio = audioRef.current;
		if (!audio) return;

		const actionToken = beginAction();
		setPlayError(null);
		audio.src = src;

		attemptConnect(audio, actionToken, false);
	};

	const resume = () => {
		const audio = audioRef.current;
		if (!audio) return;

		const actionToken = beginAction();
		setPlayError(null);

		// после ошибки поток нужно перезапросить, после паузы — нет
		attemptConnect(audio, actionToken, status === 'error');
	};

	const pause = () => {
		const audio = audioRef.current;
		if (!audio) return;

		beginAction();

		audio.pause();
		setStatus('paused');
	};

	const setVolume = (v: number) => {
		setVolumeState(v);

		if (audioRef.current) audioRef.current.volume = v;
	};

	return { status, playError, volume, play, resume, pause, setVolume };
};
