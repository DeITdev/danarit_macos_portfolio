import { Moon, Sun, Monitor } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "#components/ui/dropdown-menu";
import { useTheme } from "#components/theme-provider";

export function ModeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button type="button" className="nav-icon" aria-label="Toggle theme">
                    <img src="/icons/mode.svg" alt="theme mode" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="px-2 mt-5 bg-white/35 dark:bg-gray-800/35 backdrop-blur-3xl border-none">
                <DropdownMenuItem className={`mt-2 gap-4 cursor-pointer transition-colors hover:bg-gray-200/60 focus:bg-gray-200/60 dark:hover:bg-white/10 dark:focus:bg-white/10 ${theme === "light" ? "bg-white/50 text-accent-foreground" : ""}`} onClick={() => setTheme("light")}>
                    <Sun className={`size-4 ${theme === "light" ? "fill-[#FFC030] text-[#FFC030]" : "text-black dark:text-white"}`} />
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem className={`my-2 gap-4 cursor-pointer transition-colors hover:bg-gray-200/60 focus:bg-gray-200/60 dark:hover:bg-white/10 dark:focus:bg-white/10 ${theme === "dark" ? "dark:bg-gray-800/50 text-accent-foreground" : ""}`} onClick={() => setTheme("dark")}>
                    <Moon className={`size-4 ${theme === "dark" ? "fill-[#FF6157] text-[#FF6157]" : "text-black dark:text-white"}`} />
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem className={`mb-2 gap-4 cursor-pointer transition-colors hover:bg-gray-200/60 focus:bg-gray-200/60 dark:hover:bg-white/10 dark:focus:bg-white/10 ${theme === "system" ? "bg-white/50 dark:bg-gray-800/50 text-accent-foreground" : ""}`} onClick={() => setTheme("system")}>
                    <Monitor className={`size-4 ${theme === "system" ? "fill-[#2acb42] text-[#2acb42]" : "text-black dark:text-white"}`} />
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}