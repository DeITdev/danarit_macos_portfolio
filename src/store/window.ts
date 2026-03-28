import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "#constants";
import type { LocationItem, WindowKey, WindowStore, MusicPreviewData } from "#types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const useWindowStore = create<WindowStore>()(
    immer((set) => ({
        windows: { ...WINDOW_CONFIG },
        nextZIndex: INITIAL_Z_INDEX + 1,
        openWindow: (windowKey: WindowKey, data: LocationItem | MusicPreviewData | null = null) =>
            set((state) => {
                const win = state.windows[windowKey];
                if (!win) return;
                win.isOpen = true;
                win.zIndex = state.nextZIndex;
                win.data = data ?? win.data;
                state.nextZIndex++;
            }),

        closeWindow: (windowKey: WindowKey) =>
            set((state) => {
                const win = state.windows[windowKey];
                if (!win) return;
                win.isOpen = false;
            }),

        resetZIndex: (windowKey: WindowKey) =>
            set((state) => {
                const win = state.windows[windowKey];
                if (!win) return;
                win.zIndex = INITIAL_Z_INDEX;
            }),

        focusWindow: (windowKey: WindowKey) =>
            set((state) => {
                const win = state.windows[windowKey];
                if (!win) return;
                win.zIndex = state.nextZIndex++;
            }),
    })),
);

export default useWindowStore;
