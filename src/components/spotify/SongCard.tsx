import type { Song } from "#constants/spotify";
import useSpotifyStore from "#store/spotify";
import useWindowStore from "#store/window";
import { Pause, Play } from "lucide-react";

interface SongCardProps {
    song: Song;
    isMobile?: boolean;
}

const SongCard = ({ song, isMobile = false }: SongCardProps) => {
    const { setCurrentSong, currentSong, isPlaying, togglePlay } = useSpotifyStore();
    const { openWindow } = useWindowStore();
    const isCurrentSong = currentSong?._id === song._id;

    const handleClick = () => {
        if (isMobile) {
            openWindow("musicPreview", {
                song: {
                    _id: song._id,
                    title: song.title,
                    artist: song.artist,
                    imageUrl: song.imageUrl,
                    audioUrl: song.audioUrl,
                    duration: song.duration,
                    albumId: song.albumId,
                },
            });
        } else {
            if (isCurrentSong) togglePlay();
            else setCurrentSong(song);
        }
    };

    return (
        <div
            onClick={handleClick}
            className={`bg-gray-100 dark:bg-zinc-800/40 rounded-md hover:bg-gray-200 dark:hover:bg-zinc-700/40 
                transition-all group cursor-pointer ${isMobile ? "p-2" : "p-4"}`}
        >
            <div className={`relative ${isMobile ? "mb-2" : "mb-4"}`}>
                <div className={`aspect-square rounded-md shadow-lg overflow-hidden`}>
                    <img
                        src={song.imageUrl}
                        alt={song.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
                {isMobile ? null : (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            if (isCurrentSong) togglePlay();
                            else setCurrentSong(song);
                        }}
                        className={`absolute bottom-2 right-2 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer
                            bg-green-500 hover:bg-green-400 hover:scale-105 transition-all 
                            ${isCurrentSong && isPlaying ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
                            translate-y-2 group-hover:translate-y-0`}
                    >
                        {isCurrentSong && isPlaying ? (
                            <Pause className="w-6 h-6 text-black" />
                        ) : (
                            <Play className="w-6 h-6 text-black" />
                        )}
                    </button>
                )}
            </div>
            <h3 className={`font-medium truncate text-gray-900 dark:text-white ${isMobile ? "text-xs" : "text-sm mb-1"}`}>
                {song.title}
            </h3>
            <p className={`text-gray-500 dark:text-zinc-400 truncate ${isMobile ? "text-[10px]" : "text-sm"}`}>
                {song.artist}
            </p>
        </div>
    );
};

export default SongCard;