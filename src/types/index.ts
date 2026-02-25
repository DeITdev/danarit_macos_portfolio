// ── Navigation ──────────────────────────────────────────────
export interface NavLink {
    id: number;
    name: string;
    type: string;
}

export interface NavIcon {
    id: number;
    img: string;
}

// ── Dock ────────────────────────────────────────────────────
export interface DockApp {
    id: string;
    name: string;
    icon: string;
    canOpen: boolean;
}

// ── Blog ────────────────────────────────────────────────────
export interface BlogPost {
    id: number;
    date: string;
    title: string;
    image: string;
    link: string;
}

// ── Tech Stack ──────────────────────────────────────────────
export interface TechCategory {
    category: string;
    items: string[];
}

// ── Socials ─────────────────────────────────────────────────
export interface Social {
    id: number;
    text: string;
    icon: string;
    bg: string;
    link: string;
}

// ── Gallery ─────────────────────────────────────────────────
export interface PhotoLink {
    id: number;
    icon: string;
    title: string;
}

export interface GalleryItem {
    id: number;
    img: string;
}

// ── Location / Finder tree ──────────────────────────────────
export interface LocationItem {
    id: number;
    name: string;
    icon: string;
    kind: "file" | "folder";
    fileType?: string;
    position?: string;
    windowPosition?: string;
    description?: string[];
    subtitle?: string;
    image?: string;
    imageUrl?: string;
    href?: string;
    children?: LocationItem[];
}

export interface LocationFolder {
    id: number;
    type: string;
    name: string;
    icon: string;
    kind: "folder";
    children: LocationItem[];
}

export interface Locations {
    work: LocationFolder;
    about: LocationFolder;
    resume: LocationFolder;
    trash: LocationFolder;
}

// ── Window state ────────────────────────────────────────────
export interface WindowState {
    isOpen: boolean;
    zIndex: number;
    data: LocationItem | null;
}

export type WindowKey =
    | "finder"
    | "contact"
    | "resume"
    | "safari"
    | "photos"
    | "terminal"
    | "txtfile"
    | "imgfile";

export type WindowConfig = Record<WindowKey, WindowState>;

export interface WindowStore {
    windows: WindowConfig;
    nextZIndex: number;
    openWindow: (windowKey: string, data?: LocationItem | null) => void;
    closeWindow: (windowKey: string) => void;
    focusWindow: (windowKey: string) => void;
}

export interface LocationStore {
    activeLocation: LocationFolder | LocationItem | null;
    setActiveLocation: (location: LocationFolder | LocationItem | null) => void;
    resetActiveLocation: () => void;
}
