import WindowWrapper from "#hoc/WindowWrapper";
import useWindowStore from "#store/window";
import useSpotifyStore from "#store/spotify";
import { ChevronLeft, Pause, Play, SkipBack, SkipForward, Volume2, Volume1, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Slider } from "#components/ui/slider";

interface MusicPreviewData {
    song: {
        _id: string;
        title: string;
        artist: string;
        imageUrl: string;
        audioUrl: string;
        duration: number;
        albumId?: string | null;
    };
}

const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const MusicPreview = () => {
    const { closeWindow, openWindow, windows } = useWindowStore();
    const { queue, mobileCurrentSongId, mobileCurrentTime, mobileIsPlaying, setMobilePlayback } = useSpotifyStore();
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(75);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const isInitializedRef = useRef(false);
    
    const data = windows.musicPreview?.data as MusicPreviewData | null;
    const song = data?.song;

    // Initialize audio when song changes
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || !song) return;

        const songId = song._id;
        
        // Only initialize once per song
        if (isInitializedRef.current) return;
        isInitializedRef.current = true;
        
        const isResuming = mobileCurrentSongId === songId;
        
        audio.src = song.audioUrl;
        audio.load();
        
        if (isResuming) {
            // Restore previous state
            setCurrentTime(mobileCurrentTime);
            setIsPlaying(mobileIsPlaying);
            audio.currentTime = mobileCurrentTime;
            if (mobileIsPlaying) {
                audio.play().catch(() => {});
            }
        } else {
            // Start fresh - new song
            setCurrentTime(0);
            setIsPlaying(true);
            audio.play().catch(() => {});
        }
        
        // Save state when unmounting
        return () => {
            isInitializedRef.current = false;
            setMobilePlayback(songId, audio.currentTime, !audio.paused);
        };
    }, [song?._id]); // Only re-run when song ID changes

    // Audio event listeners
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => setDuration(audio.duration || 0);
        const handleEnded = () => {
            const songIndex = queue.findIndex((s: { _id: string }) => s._id === song?._id);
            if (songIndex !== -1 && songIndex < queue.length - 1) {
                const nextSong = queue[songIndex + 1];
                openWindow("musicPreview", {
                    song: {
                        _id: nextSong._id,
                        title: nextSong.title,
                        artist: nextSong.artist,
                        imageUrl: nextSong.imageUrl,
                        audioUrl: nextSong.audioUrl,
                        duration: nextSong.duration,
                        albumId: nextSong.albumId,
                    },
                });
            }
        };

        audio.addEventListener("timeupdate", updateTime);
        audio.addEventListener("loadedmetadata", updateDuration);
        audio.addEventListener("ended", handleEnded);

        return () => {
            audio.removeEventListener("timeupdate", updateTime);
            audio.removeEventListener("loadedmetadata", updateDuration);
            audio.removeEventListener("ended", handleEnded);
        };
    }, [song, queue, openWindow]);

    // Play/pause control
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.play().catch(() => {});
        } else {
            audio.pause();
        }
    }, [isPlaying]);

    // Volume control
    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.volume = volume / 100;
        }
    }, [volume]);

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

    const handlePrevious = () => {
        const songIndex = queue.findIndex((s: { _id: string }) => s._id === song?._id);
        if (songIndex > 0) {
            const prevSong = queue[songIndex - 1];
            openWindow("musicPreview", {
                song: {
                    _id: prevSong._id,
                    title: prevSong.title,
                    artist: prevSong.artist,
                    imageUrl: prevSong.imageUrl,
                    audioUrl: prevSong.audioUrl,
                    duration: prevSong.duration,
                    albumId: prevSong.albumId,
                },
            });
        }
    };

    const handleNext = () => {
        const songIndex = queue.findIndex((s: { _id: string }) => s._id === song?._id);
        if (songIndex !== -1 && songIndex < queue.length - 1) {
            const nextSong = queue[songIndex + 1];
            openWindow("musicPreview", {
                song: {
                    _id: nextSong._id,
                    title: nextSong.title,
                    artist: nextSong.artist,
                    imageUrl: nextSong.imageUrl,
                    audioUrl: nextSong.audioUrl,
                    duration: nextSong.duration,
                    albumId: nextSong.albumId,
                },
            });
        }
    };

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    const getVolumeIcon = () => {
        if (volume === 0) return <VolumeX className="w-5 h-5" />;
        if (volume < 50) return <Volume1 className="w-5 h-5" />;
        return <Volume2 className="w-5 h-5" />;
    };

    if (!song) return null;

    return (
        <div className="h-full overflow-y-auto bg-white dark:bg-zinc-900">
            <audio ref={audioRef} className="hidden" />
            
            {/* Mobile Header */}
            <div className="sm:hidden sticky top-0 left-0 w-full pt-[52px] pb-3 px-5 flex items-center justify-between z-50 bg-white/80 dark:bg-[#1e1e1e]/80 backdrop-blur-xl border-b border-gray-200 dark:border-transparent">
                <button 
                    onClick={() => closeWindow("musicPreview")} 
                    className="relative z-50 p-4 -ml-4 text-[#0a84ff] flex items-center text-[15px] tracking-wide font-medium cursor-pointer touch-manipulation"
                >
                    <ChevronLeft size={18} className="mr-1" /> Go Back
                </button>
                <h2 className="text-black dark:text-white font-semibold text-[17px] absolute left-1/2 -translate-x-1/2 pointer-events-none">
                    Now Playing
                </h2>
            </div>

            {/* Content */}
            <div className="flex flex-col items-center px-6 py-8">
                {/* Album Art */}
                <div className="w-[280px] h-[280px] rounded-lg shadow-2xl overflow-hidden mb-8">
                    <img
                        src={song.imageUrl}
                        alt={song.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Song Info */}
                <div className="text-center mb-8 w-full px-4">
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-1 truncate">
                        {song.title}
                    </h1>
                    <p className="text-gray-500 dark:text-zinc-400 truncate">
                        {song.artist}
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="w-full max-w-[320px] mb-6">
                    <Slider
                        value={[currentTime]}
                        max={duration || 100}
                        step={1}
                        className="w-full"
                        onValueChange={handleSeek}
                    />
                    <div className="flex justify-between mt-2">
                        <span className="text-xs text-gray-500 dark:text-zinc-400">
                            {formatTime(currentTime)}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-zinc-400">
                            {formatTime(duration)}
                        </span>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-8 mb-8">
                    <button
                        onClick={handlePrevious}
                        className="p-3 text-gray-600 dark:text-zinc-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                        aria-label="Previous track"
                    >
                        <SkipBack className="w-6 h-6" />
                    </button>

                    <button
                        onClick={togglePlay}
                        className="w-16 h-16 bg-gray-900 dark:bg-white rounded-full flex items-center justify-center text-white dark:text-gray-900 hover:scale-105 transition-transform"
                        aria-label={isPlaying ? "Pause" : "Play"}
                    >
                        {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
                    </button>

                    <button
                        onClick={handleNext}
                        className="p-3 text-gray-600 dark:text-zinc-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                        aria-label="Next track"
                    >
                        <SkipForward className="w-6 h-6" />
                    </button>
                </div>

                {/* Volume */}
                <div className="w-full max-w-[280px]">
                    <div className="flex items-center gap-3">
                        <Volume1 className="w-5 h-5 text-gray-500 dark:text-zinc-400" />
                        <Slider
                            value={[volume]}
                            max={100}
                            step={1}
                            className="flex-1"
                            onValueChange={handleVolumeChange}
                        />
                        {getVolumeIcon()}
                    </div>
                </div>
            </div>
        </div>
    );
};

const MusicPreviewWindow = WindowWrapper(MusicPreview, "musicPreview");

export default MusicPreviewWindow;