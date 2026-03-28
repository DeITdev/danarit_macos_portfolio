import type { Song } from "#constants/spotify";
import useSpotifyStore from "#store/spotify";
import { Pause, Play } from "lucide-react";
import type { MouseEvent } from "react";

interface PlayButtonProps {
    song: Song;
}

const PlayButton = ({ song }: PlayButtonProps) => {
    const { currentSong, isPlaying, setCurrentSong, togglePlay } = useSpotifyStore();
    const isCurrentSong = currentSong?._id === song._id;

    const handlePlay = (e: MouseEvent) => {
        e.stopPropagation();
        if (isCurrentSong) togglePlay();
        else setCurrentSong(song);
    };

    return (
        <button
            onClick={handlePlay}
            className={`absolute bottom-2 right-2 w-10 h-10 rounded-full items-center justify-center
                bg-green-500 hover:bg-green-400 hover:scale-105 transition-all cursor-pointer
                hidden sm:flex
                ${isCurrentSong && isPlaying ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
                translate-y-2 group-hover:translate-y-0`}
        >
            {isCurrentSong && isPlaying ? (
                <Pause className="w-5 h-5 text-black" />
            ) : (
                <Play className="w-5 h-5 text-black" />
            )}
        </button>
    );
};

export default PlayButton;