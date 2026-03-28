import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";
import useWindowStore from "#store/window";
import useSpotifyStore from "#store/spotify";
import { ChevronLeft } from "lucide-react";
import { useEffect, useRef } from "react";
import SpotifySidebar from "#components/spotify/SpotifySidebar";
import SpotifyHome from "#components/spotify/SpotifyHome";
import SpotifyPlayer from "#components/spotify/SpotifyPlayer";
import SpotifyAlbum from "#components/spotify/SpotifyAlbum";
import { allSongs } from "#constants/spotify";

const Spotify = () => {
    const { closeWindow } = useWindowStore();
    const { currentView, selectedAlbumId, initializeQueue } = useSpotifyStore();
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        initializeQueue(allSongs);
    }, [initializeQueue]);

return (
        <>
            <audio ref={audioRef} className="hidden" />

            {/* Desktop Header */}
            <div className="window-header max-sm:hidden">
                <WindowControls target="spotify" />
                <div className="flex-1 flex-center">
                    <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300">Music</h2>
                </div>
                <div className="w-20" />
            </div>

            {/* Mobile Header */}
            <div className="sm:hidden sticky top-0 left-0 w-full pt-[52px] pb-3 px-5 flex items-center justify-between z-50 bg-white/80 dark:bg-[#1e1e1e]/80 backdrop-blur-xl border-b border-gray-200 dark:border-transparent">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        closeWindow("spotify");
                    }}
                    className="relative z-50 p-4 -ml-4 text-[#0a84ff] flex items-center text-[15px] tracking-wide font-medium cursor-pointer touch-manipulation"
                >
                    <ChevronLeft size={18} className="mr-1" /> Go Back
                </button>
                <h2 className="text-black dark:text-white font-semibold text-[17px] absolute left-1/2 -translate-x-1/2 pointer-events-none truncate max-w-[200px]">
                    Music
                </h2>
            </div>

            {/* Desktop Layout - Sidebar left, Content right */}
            <div className="spotify-desktop-layout max-sm:hidden" onPointerDown={(e) => e.stopPropagation()}>
                <SpotifySidebar />
                <div className="flex-1 overflow-y-auto spotify-main-scroll pb-20">
                    {currentView === "home" && <SpotifyHome />}
                    {currentView === "album" && selectedAlbumId && <SpotifyAlbum albumId={selectedAlbumId} />}
                </div>
            </div>

            {/* Mobile Layout */}
            <div className="sm:hidden" onPointerDown={(e) => e.stopPropagation()}>
                <SpotifySidebar isMobile />
                {currentView === "home" && <SpotifyHome isMobile />}
                {currentView === "album" && selectedAlbumId && <SpotifyAlbum albumId={selectedAlbumId} isMobile />}
            </div>

            {/* Player Controls - desktop only */}
            <div className="max-sm:hidden" onMouseDown={(e) => e.stopPropagation()}>
                <SpotifyPlayer audioRef={audioRef} />
            </div>
        </>
    );
};

const SpotifyWindow = WindowWrapper(Spotify, "spotify");

export default SpotifyWindow;