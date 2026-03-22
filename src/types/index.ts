// ── Navigation ──────────────────────────────────────────────
export interface NavLink {
    id: number;
    name: string;
    type: WindowKey;
}

export interface NavIcon {
    id: number;
    img: string;
}

// ── Dock ────────────────────────────────────────────────────
export type DockApp = 
    | { id: WindowKey; name: string; icon: string; canOpen: true }
    | { id: string; name: string; icon: string; canOpen: false };

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
    alt: string;
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
    openWindow: (windowKey: WindowKey, data?: LocationItem | null) => void;
    closeWindow: (windowKey: WindowKey) => void;
    focusWindow: (windowKey: WindowKey) => void;
    resetZIndex: (windowKey: WindowKey) => void;
}

export interface LocationStore {
    activeLocation: LocationFolder | LocationItem | null;
    setActiveLocation: (location: LocationFolder | LocationItem | null) => void;
    resetActiveLocation: () => void;
}
