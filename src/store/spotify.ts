import { create } from "zustand";
import type { Song } from "#constants/spotify";

interface SpotifyStore {
    currentSong: Song | null;
    isPlaying: boolean;
    queue: Song[];
    currentIndex: number;
    currentView: "home" | "album";
    selectedAlbumId: string | null;
    mobileCurrentSongId: string | null;
    mobileCurrentTime: number;
    mobileIsPlaying: boolean;

    initializeQueue: (songs: Song[]) => void;
    playAlbum: (songs: Song[], startIndex?: number) => void;
    setQueue: (songs: Song[], startIndex: number) => void;
    setCurrentSong: (song: Song | null) => void;
    togglePlay: () => void;
    playNext: () => void;
    playPrevious: () => void;
    setCurrentView: (view: "home" | "album") => void;
    setSelectedAlbumId: (albumId: string | null) => void;
    setIsPlaying: (playing: boolean) => void;
    setMobilePlayback: (songId: string | null, time: number, playing: boolean) => void;
}

const useSpotifyStore = create<SpotifyStore>((set, get) => ({
    currentSong: null,
    isPlaying: false,
    queue: [],
    currentIndex: -1,
    currentView: "home",
    selectedAlbumId: null,
    mobileCurrentSongId: null,
    mobileCurrentTime: 0,
    mobileIsPlaying: false,

    initializeQueue: (songs: Song[]) => {
        const { queue, currentIndex } = get();
        
        if (queue.length === 0) {
            set({
                queue: songs,
                currentSong: songs[0] || null,
                currentIndex: 0,
            });
        } else {
            const validIndex = currentIndex === -1 || currentIndex >= queue.length ? 0 : currentIndex;
            if (validIndex !== currentIndex) {
                set({
                    currentIndex: validIndex,
                    currentSong: queue[validIndex] || null,
                });
            }
        }
    },

    playAlbum: (songs: Song[], startIndex = 0) => {
        if (songs.length === 0) return;

        const clampedIndex = Math.max(0, Math.min(startIndex, songs.length - 1));
        const song = songs[clampedIndex];

        set({
            queue: songs,
            currentSong: song,
            currentIndex: clampedIndex,
            isPlaying: true,
        });
    },

    setQueue: (songs: Song[], startIndex: number) => {
        if (songs.length === 0) return;

        const clampedIndex = Math.max(0, Math.min(startIndex, songs.length - 1));
        const song = songs[clampedIndex];

        set({
            queue: songs,
            currentSong: song,
            currentIndex: clampedIndex,
        });
    },

    setCurrentSong: (song: Song | null) => {
        if (song === null) {
            set({
                currentSong: null,
                isPlaying: false,
                currentIndex: -1,
            });
            return;
        }

        const songIndex = get().queue.findIndex((s) => s._id === song._id);
        set({
            currentSong: song,
            isPlaying: true,
            currentIndex: songIndex,
        });
    },

    togglePlay: () => {
        set({
            isPlaying: !get().isPlaying,
        });
    },

    playNext: () => {
        const { currentIndex, queue } = get();
        const nextIndex = currentIndex + 1;

        if (nextIndex < queue.length) {
            const nextSong = queue[nextIndex];
            set({
                currentSong: nextSong,
                currentIndex: nextIndex,
                isPlaying: true,
            });
        } else {
            set({ isPlaying: false });
        }
    },

    playPrevious: () => {
        const { currentIndex, queue } = get();
        const prevIndex = currentIndex - 1;

        if (prevIndex >= 0) {
            const prevSong = queue[prevIndex];
            set({
                currentSong: prevSong,
                currentIndex: prevIndex,
                isPlaying: true,
            });
        } else {
            set({ isPlaying: false });
        }
    },

    setCurrentView: (view: "home" | "album") => {
        set({ currentView: view });
    },

    setSelectedAlbumId: (albumId: string | null) => {
        set({ selectedAlbumId: albumId, currentView: albumId ? "album" : "home" });
    },

    setIsPlaying: (playing: boolean) => {
        set({ isPlaying: playing });
    },

    setMobilePlayback: (songId: string | null, time: number, playing: boolean) => {
        set({
            mobileCurrentSongId: songId,
            mobileCurrentTime: time,
            mobileIsPlaying: playing,
        });
    },
}));

export default useSpotifyStore;