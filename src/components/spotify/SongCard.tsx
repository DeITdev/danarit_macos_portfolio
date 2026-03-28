import type { Song } from "#constants/spotify";
import useSpotifyStore from "#store/spotify";
import useWindowStore from "#store/window";

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
            // On mobile, open the music preview window
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
            // On desktop, play directly
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
                <div className={`aspect-square rounded-md shadow-lg overflow-hidden rounded-md`}>
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
                        className={`absolute ${isMobile ? "bottom-1 right-1 w-8 h-8" : "bottom-2 right-2 w-10 h-10"} 
                            rounded-full flex items-center justify-center cursor-pointer
                            bg-green-500 hover:bg-green-400 hover:scale-105 transition-all 
                            ${isCurrentSong && isPlaying ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
                            translate-y-2 group-hover:translate-y-0`}
                    >
                        {isCurrentSong && isPlaying ? (
                            <div className={`${isMobile ? "w-2.5 h-2.5" : "w-3 h-3"} bg-black rounded-sm`} />
                        ) : (
                            <div className={`${isMobile ? "w-0 h-0 border-l-[5px]" : "w-0 h-0 border-l-[6px]"} border-l-black border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent ml-0.5`} />
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