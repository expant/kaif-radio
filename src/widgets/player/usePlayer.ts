import { useRef, useState, useEffect } from "react";
import type { Station } from "../../entities/station/types";
import type { PlayerState } from "./types";

export const usePlayer = (): PlayerState => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentStation, setCurrentStation] = useState<Station | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.8);

  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = volume;
  }, []);

  const setVolume = (v: number) => {
    setVolumeState(v);
    if (audioRef.current) audioRef.current.volume = v;
  };

  const play = (station: Station) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (currentStation?.stationuuid === station.stationuuid) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play().then(() => setIsPlaying(true)).catch(() => {});
      }
      return;
    }

    audio.src = station.url_resolved || station.url;
    audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    setCurrentStation(station);
    setIsPlaying(true);
  };

  const stop = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  return { currentStation, isPlaying, volume, setVolume, play, stop };
};
