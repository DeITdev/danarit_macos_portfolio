import { featuredSongs, madeForYouSongs, trendingSongs } from "#constants/spotify";
import PlayButton from "./PlayButton";
import SongCard from "./SongCard";
import useWindowStore from "#store/window";
import useSpotifyStore from "#store/spotify";

interface SpotifyHomeProps {
    isMobile?: boolean;
}

const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "morning";
    if (hour < 18) return "afternoon";
    return "evening";
};

const SpotifyHome = ({ isMobile = false }: SpotifyHomeProps) => {
    const { openWindow } = useWindowStore();
    const { playAlbum, currentSong, togglePlay } = useSpotifyStore();

    const handleFeaturedClick = (song: typeof featuredSongs[0]) => {
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
            const isCurrentSong = currentSong?._id === song._id;
            if (isCurrentSong) togglePlay();
            else playAlbum([song], 0);
        }
    };

    const handleFeaturedKeyDown = (e: React.KeyboardEvent, song: typeof featuredSongs[0]) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleFeaturedClick(song);
        }
    };

    return (
        <div className={`${isMobile ? "px-4 pb-20" : "p-4 sm:p-6 pb-20"}`}>
            <h1 className={`font-bold mb-4 ${isMobile ? "text-xl" : "text-2xl sm:text-3xl"} text-gray-900 dark:text-white`}>
                Good {getGreeting()}
            </h1>

            {/* Featured Section */}
            <section className="mb-6">
                <div className={`grid gap-2 ${isMobile ? "grid-cols-1" : "grid-cols-2 lg:grid-cols-3"}`}>
                    {featuredSongs.slice(0, 6).map((song) => (
                        <div
                            key={song._id}
                            role="button"
                            tabIndex={0}
                            onClick={() => handleFeaturedClick(song)}
                            onKeyDown={(e) => handleFeaturedKeyDown(e, song)}
                            aria-label={`Play ${song.title} by ${song.artist}`}
                            className={`flex items-center bg-gray-100 dark:bg-zinc-800/50 rounded-md overflow-hidden
                                hover:bg-gray-200 dark:hover:bg-zinc-700/50 transition-colors group cursor-pointer relative`}
                        >
                            <img
                                src={song.imageUrl}
                                alt={song.title}
                                className={`${isMobile ? "w-12 h-12" : "w-16 sm:w-20 h-16 sm:h-20"} object-cover flex-shrink-0`}
                            />
                            <div className="flex-1 p-3 min-w-0">
                                <p className="font-medium truncate text-gray-900 dark:text-white">{song.title}</p>
                                <p className="text-sm text-gray-500 dark:text-zinc-400 truncate">{song.artist}</p>
                            </div>
                            <PlayButton song={song} />
                        </div>
                    ))}
                </div>
            </section>

            {/* Made For You */}
            <section className="mb-6">
                <div className="flex items-center justify-between mb-3">
                    <h2 className={`font-bold ${isMobile ? "text-lg" : "text-xl sm:text-2xl"} text-gray-900 dark:text-white`}>
                        Made For You
                    </h2>
                </div>
                <div className={`grid gap-4 ${isMobile ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"}`}>
                    {madeForYouSongs.map((song) => (
                        <SongCard key={song._id} song={song} isMobile={isMobile} />
                    ))}
                </div>
            </section>

            {/* Trending */}
            <section>
                <div className="flex items-center justify-between mb-3">
                    <h2 className={`font-bold ${isMobile ? "text-lg" : "text-xl sm:text-2xl"} text-gray-900 dark:text-white`}>
                        Trending
                    </h2>
                </div>
                <div className={`grid gap-4 ${isMobile ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"}`}>
                    {trendingSongs.map((song) => (
                        <SongCard key={song._id} song={song} isMobile={isMobile} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default SpotifyHome;