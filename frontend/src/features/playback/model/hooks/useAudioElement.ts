import { useRef, useEffect, type RefObject } from 'react';
import { INITIAL_VOLUME } from '../constants';
import type { AudioElementHandlers } from '../types';

// Владеет единственным <audio>: создаёт, подписывает на события, подчищает.
export const useAudioElement = (
	handlers: AudioElementHandlers,
): RefObject<HTMLAudioElement | null> => {
	const audioRef = useRef<HTMLAudioElement | null>(null);

	// обработчики читаем через ref — без переподписок и протухших замыканий
	const handlersRef = useRef(handlers);

	useEffect(() => {
		handlersRef.current = handlers;
	});

	useEffect(() => {
		const audio = new Audio();
		audio.volume = INITIAL_VOLUME;
		audioRef.current = audio;

		const onPlaying = () => handlersRef.current.onPlaying();
		const onWaiting = () => handlersRef.current.onWaiting();
		const onError = () => handlersRef.current.onError();
		const onPause = () => handlersRef.current.onPause();

		audio.addEventListener('playing', onPlaying);
		audio.addEventListener('waiting', onWaiting);
		audio.addEventListener('error', onError);
		audio.addEventListener('pause', onPause);

		return () => {
			audio.removeEventListener('playing', onPlaying);
			audio.removeEventListener('waiting', onWaiting);
			audio.removeEventListener('error', onError);
			audio.removeEventListener('pause', onPause);

			audio.pause();
			audio.src = '';
			audioRef.current = null;
		};
	}, []);

	return audioRef;
};
