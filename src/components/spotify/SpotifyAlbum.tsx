import { albums } from "#constants/spotify";
import useSpotifyStore from "#store/spotify";
import useWindowStore from "#store/window";
import { ChevronLeft, Play } from "lucide-react";

interface SpotifyAlbumProps {
    albumId: string;
    isMobile?: boolean;
}

const SpotifyAlbum = ({ albumId, isMobile = false }: SpotifyAlbumProps) => {
    const { setSelectedAlbumId, playAlbum } = useSpotifyStore();
    const { openWindow } = useWindowStore();
    const album = albums.find((a) => a._id === albumId);

    if (!album) return null;

    const handleBack = () => {
        setSelectedAlbumId(null);
    };

    const handlePlayAll = () => {
        playAlbum(album.songs, 0);
        if (isMobile) {
            openWindow("musicPreview", {
                song: {
                    _id: album.songs[0]._id,
                    title: album.songs[0].title,
                    artist: album.songs[0].artist,
                    imageUrl: album.songs[0].imageUrl,
                    audioUrl: album.songs[0].audioUrl,
                    duration: album.songs[0].duration,
                    albumId: album.songs[0].albumId,
                },
            });
        }
    };

    const handleSongClick = (song: (typeof album.songs)[0], index: number) => {
        playAlbum(album.songs, index);
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
        }
    };

    return (
        <div className={`${isMobile ? "px-4 pb-20" : "p-4 sm:p-6 pb-20"}`}>
            {/* Back button - mobile only */}
            {isMobile && (
                <button
                    onClick={handleBack}
                    className="flex items-center gap-1 text-gray-500 dark:text-zinc-400 mb-4"
                >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="text-sm">Back</span>
                </button>
            )}

            {/* Album Header */}
            <div className={`flex items-end gap-4 mb-6 ${isMobile ? "gap-3" : ""}`}>
                <img
                    src={album.imageUrl}
                    alt={album.title}
                    className={`${isMobile ? "w-24 h-24" : "w-40 h-40 sm:w-48 sm:h-48"} object-cover rounded shadow-lg flex-shrink-0`}
                />
                <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase mb-1">Album</p>
                    <h1 className={`font-bold mb-2 text-gray-900 dark:text-white ${isMobile ? "text-xl" : "text-2xl sm:text-3xl"}`}>
                        {album.title}
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-zinc-400">
                        {album.artist} • {album.releaseYear} • {album.songs.length} songs
                    </p>
                </div>
            </div>

            {/* Play button */}
            <div className="mb-6">
                <button
                    onClick={handlePlayAll}
                    className="bg-green-500 hover:bg-green-400 text-black font-medium px-6 py-2 rounded-full text-sm transition-colors"
                >
                    Play
                </button>
            </div>

{/* Song List */}
            <div className="space-y-1">
                {album.songs.map((song, index) => (
                    <button
                        type="button"
                        key={song._id}
                        className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800/50 cursor-pointer group w-full text-left"
                        onClick={() => handleSongClick(song, index)}
                        aria-label={`Play ${song.title} by ${song.artist}`}
                    >
                        <span className="w-5 text-center text-sm text-gray-500 dark:text-zinc-400 group-hover:hidden">
                            {index + 1}
                        </span>
                        <div className="w-5 hidden group-hover:flex items-center justify-center">
                            <Play className="w-3 h-3 text-gray-900 dark:text-white" />
                        </div>
                        <img
                            src={song.imageUrl}
                            alt={song.title}
                            className="w-10 h-10 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                            <p className="font-medium truncate text-gray-900 dark:text-white">{song.title}</p>
                            <p className="text-sm text-gray-500 dark:text-zinc-400 truncate">{song.artist}</p>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-zinc-400">
                            {Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, "0")}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SpotifyAlbum;