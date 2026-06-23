import type { Station } from "../../entities/station/types";

export type PlayerState = {
  currentStation: Station | null;
  isPlaying: boolean;
  volume: number;
  playError: string | null;
  setVolume: (v: number) => void;
  play: (station: Station) => Promise<void>;
  stop: () => void;
};

export type PlayerProps = {
  player: PlayerState;
  accentColor: string;
};
