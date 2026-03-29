import { useState, useEffect } from "react";
import type { Song } from "#constants/spotify";

export function useSongDurations(songs: Song[]) {
    const [durations, setDurations] = useState<Record<string, number>>({});

    useEffect(() => {
        let cancelled = false;
        
        const loadDurations = async () => {
            if (songs.length === 0) {
                return {};
            }
            
            const newDurations: Record<string, number> = {};
            
            await Promise.all(
                songs.map((song) => {
                    return new Promise<void>((resolve) => {
                        const audio = new Audio();
                        audio.preload = "metadata";
                        
                        audio.onloadedmetadata = () => {
                            if (!cancelled && audio.duration && isFinite(audio.duration)) {
                                newDurations[song._id] = Math.floor(audio.duration);
                            }
                            resolve();
                        };
                        
                        audio.onerror = () => {
                            resolve();
                        };
                        
                        audio.src = song.audioUrl;
                    });
                })
            );
            
            return newDurations;
        };
        
        loadDurations().then((result) => {
            if (!cancelled) {
                setDurations(result);
            }
        });
        
        return () => {
            cancelled = true;
        };
    }, [songs]);

    const getDuration = (songId: string, fallbackDuration: number): number => {
        return durations[songId] ?? fallbackDuration;
    };

    return { durations, getDuration };
}

export function formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}