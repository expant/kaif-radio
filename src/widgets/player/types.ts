import type { Station } from "../../entities/station/types";

export type PlayerState = {
  currentStation: Station | null;
  isPlaying: boolean;
  volume: number;
  setVolume: (v: number) => void;
  play: (station: Station) => void;
  stop: () => void;
};

export type PlayerProps = {
  player: PlayerState;
  accentColor: string;
};
