export const INITIAL_VOLUME = 0.8;

// акцентный цвет, пока станция не выбрана или цвет не передан
export const DEFAULT_ACCENT = '#FF5A3C';

// сколько ждём звук, прежде чем счесть попытку провалом
export const CONNECT_TIMEOUT_MS = 12000;

// паузы перед автоповторами; длина массива = число попыток
export const RETRY_DELAYS_MS = [1000, 2000];
