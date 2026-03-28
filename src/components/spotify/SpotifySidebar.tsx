import { albums } from "#constants/spotify";
import useSpotifyStore from "#store/spotify";
import { HomeIcon, Library } from "lucide-react";

interface SpotifySidebarProps {
    isMobile?: boolean;
}

const SpotifySidebar = ({ isMobile = false }: SpotifySidebarProps) => {
    const { setCurrentView, setSelectedAlbumId, currentView, selectedAlbumId } = useSpotifyStore();

    const handleHomeClick = () => {
        setCurrentView("home");
        setSelectedAlbumId(null);
    };

    const handleAlbumClick = (albumId: string) => {
        setSelectedAlbumId(albumId);
    };

    if (isMobile) {
        return (
            <div className="px-4 py-3">
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    <button
                        onClick={handleHomeClick}
                        className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors
                            ${currentView === "home" 
                                ? "bg-white dark:bg-zinc-700 text-black dark:text-white" 
                                : "bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700"
                            }`}
                    >
                        Home
                    </button>
                    {albums.map((album) => (
                        <button
                            key={album._id}
                            onClick={() => handleAlbumClick(album._id)}
                            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors truncate
                                ${selectedAlbumId === album._id 
                                    ? "bg-white dark:bg-zinc-700 text-black dark:text-white" 
                                    : "bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700"
                                }`}
                        >
                            {album.title}
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="w-56 flex flex-col gap-2 h-full overflow-hidden">
            {/* Navigation */}
            <div className="rounded-lg bg-gray-100 dark:bg-zinc-800/50 p-2">
                <div className="space-y-1">
                    <button
                        onClick={handleHomeClick}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer
                            ${currentView === "home" 
                                ? "bg-gray-200 dark:bg-zinc-700 text-gray-900 dark:text-white" 
                                : "hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-700 dark:text-white"
                            }`}
                    >
                        <HomeIcon className="w-5 h-5" />
                        <span>Home</span>
                    </button>
                </div>
            </div>

            {/* Library */}
            <div className="flex-1 rounded-lg bg-gray-100 dark:bg-zinc-800/50 p-2 overflow-hidden flex flex-col">
                <div className="flex items-center gap-2 px-3 py-2 text-gray-500 dark:text-zinc-400">
                    <Library className="w-5 h-5" />
                    <span className="text-sm font-medium">Albums</span>
                </div>

                <div className="flex-1 overflow-y-auto mt-2">
                    <div className="space-y-1 px-1">
                        {albums.map((album) => (
                            <button
                                key={album._id}
                                onClick={() => handleAlbumClick(album._id)}
                                className={`w-full flex items-center gap-3 p-2 rounded-md transition-colors group cursor-pointer
                                    ${selectedAlbumId === album._id 
                                        ? "bg-gray-200 dark:bg-zinc-700" 
                                        : "hover:bg-gray-200 dark:hover:bg-zinc-700"
                                    }`}
                            >
                                <img
                                    src={album.imageUrl}
                                    alt={album.title}
                                    className="w-10 h-10 rounded object-cover flex-shrink-0"
                                />
                                <div className="flex-1 min-w-0 text-left">
                                    <p className="text-sm font-medium truncate text-gray-800 dark:text-white">
                                        {album.title}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-zinc-400 truncate">
                                        Album • {album.artist}
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpotifySidebar;