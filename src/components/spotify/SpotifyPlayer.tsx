import useSpotifyStore from "#store/spotify";
import type { RefObject } from "react";
import { useEffect, useState } from "react";
import { Pause, Play, SkipBack, SkipForward, Volume2, Volume1, VolumeX } from "lucide-react";
import { Slider } from "#components/ui/slider";

interface SpotifyPlayerProps {
    audioRef: RefObject<HTMLAudioElement | null>;
}

const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const SpotifyPlayer = ({ audioRef }: SpotifyPlayerProps) => {
    const { currentSong, isPlaying, togglePlay, playNext, playPrevious } = useSpotifyStore();
    const [volume, setVolume] = useState(75);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    // Update audio source when song changes
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || !currentSong) return;
        
        const absoluteUrl = new URL(currentSong.audioUrl, window.location.origin).href;
        if (audio.currentSrc !== absoluteUrl) {
            audio.src = currentSong.audioUrl;
            audio.load();
            if (isPlaying) {
                audio.play().catch(() => {});
            }
        }
    }, [currentSong, audioRef]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => setDuration(audio.duration || 0);
        const endedHandler = () => {
            playNext();
        };

        audio.addEventListener("timeupdate", updateTime);
        audio.addEventListener("loadedmetadata", updateDuration);
        audio.addEventListener("ended", endedHandler);

        return () => {
            audio.removeEventListener("timeupdate", updateTime);
            audio.removeEventListener("loadedmetadata", updateDuration);
            audio.removeEventListener("ended", endedHandler);
        };
    }, [audioRef, playNext]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying && currentSong) {
            audio.play().catch((e) => console.log("Play error:", e));
        } else {
            audio.pause();
        }
    }, [isPlaying, audioRef, currentSong]);

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.volume = volume / 100;
        }
    }, [volume, audioRef]);

    const handleSeek = (value: number[]) => {
        const audio = audioRef.current;
        if (audio) {
            audio.currentTime = value[0];
            setCurrentTime(value[0]);
        }
    };

    const handleVolumeChange = (value: number[]) => {
        setVolume(value[0]);
    };

    const getVolumeIcon = () => {
        if (volume === 0) return <VolumeX className="w-4 h-4 text-gray-500 dark:text-zinc-400" />;
        if (volume < 50) return <Volume1 className="w-4 h-4 text-gray-500 dark:text-zinc-400" />;
        return <Volume2 className="w-4 h-4 text-gray-500 dark:text-zinc-400" />;
    };

    return (
        <footer className="spotify-player no-drag">
            {/* Currently playing song - hidden on mobile */}
            <div className="player-song hidden sm:flex">
                {currentSong && (
                    <>
                        <img
                            src={currentSong.imageUrl}
                            alt={currentSong.title}
                            className="w-14 h-14 object-cover rounded-md flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                            <div className="font-medium truncate text-gray-900 dark:text-white">
                                {currentSong.title}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-zinc-400 truncate">
                                {currentSong.artist}
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Player controls */}
            <div className="player-controls">
                <div className="control-buttons">
                    <button
                        onClick={playPrevious}
                        disabled={!currentSong}
                        className="control-btn"
                        aria-label="Previous track"
                    >
                        <SkipBack className="w-4 h-4" />
                    </button>

                    <button
                        onClick={togglePlay}
                        disabled={!currentSong}
                        className="play-btn"
                        aria-label={isPlaying ? "Pause" : "Play"}
                    >
                        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                    </button>

                    <button
                        onClick={playNext}
                        disabled={!currentSong}
                        className="control-btn"
                        aria-label="Next track"
                    >
                        <SkipForward className="w-4 h-4" />
                    </button>
                </div>

                {/* Progress bar - hidden on mobile */}
                <div className="progress-container hidden sm:flex">
                    <span className="time-display">{formatTime(currentTime)}</span>
                    <Slider
                        value={[currentTime]}
                        max={duration || 100}
                        step={1}
                        className="progress-slider"
                        onValueChange={handleSeek}
                        aria-label="Seek"
                        aria-valuetext={formatTime(currentTime)}
                    />
                    <span className="time-display">{formatTime(duration)}</span>
                </div>
            </div>

            {/* Volume controls - desktop only */}
            <div className="player-volume">
                {getVolumeIcon()}
                <Slider
                    value={[volume]}
                    max={100}
                    step={1}
                    className="volume-slider"
                    onValueChange={handleVolumeChange}
                    aria-label="Volume"
                    aria-valuetext={`${volume}%`}
                />
            </div>

            {/* Mobile: Currently playing song - shown below controls */}
            <div className="mobile-song-info sm:hidden">
                {currentSong && (
                    <div className="mobile-song-text">
                        <span className="mobile-song-title">{currentSong.title}</span>
                        <span className="mobile-song-dot">•</span>
                        <span className="mobile-song-artist">{currentSong.artist}</span>
                    </div>
                )}
            </div>
        </footer>
    );
};

export default SpotifyPlayer;