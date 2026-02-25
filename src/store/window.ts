import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "#constants";
import type { LocationItem, WindowStore } from "#types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const useWindowStore = create<WindowStore>()(
    immer((set) => ({
        windows: { ...WINDOW_CONFIG },
        nextZIndex: INITIAL_Z_INDEX + 1,
        openWindow: (windowKey: string, data: LocationItem | null = null) =>
            set((state) => {
                const win = state.windows[windowKey as keyof typeof state.windows];
                if (!win) return;
                win.isOpen = true;
                win.zIndex = state.nextZIndex;
                win.data = data ?? win.data;
                state.nextZIndex++;
            }),

        closeWindow: (windowKey: string) =>
            set((state) => {
                const win = state.windows[windowKey as keyof typeof state.windows];
                if (!win) return;
                win.isOpen = false;
                win.zIndex = INITIAL_Z_INDEX;
            }),

        focusWindow: (windowKey: string) =>
            set((state) => {
                const win = state.windows[windowKey as keyof typeof state.windows];
                if (!win) return;
                win.zIndex = state.nextZIndex++;
            }),
    })),
);

export default useWindowStore;
