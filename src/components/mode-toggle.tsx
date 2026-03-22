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
            <DropdownMenuContent align="center" className="px-2 mt-1.5">
                <DropdownMenuItem className={`mt-2 gap-4 ${theme === "light" ? "bg-accent text-accent-foreground" : ""}`} onClick={() => setTheme("light")}>
                    <Sun className={`size-4 ${theme === "light" ? "fill-[#FFC030] text-[#FFC030]" : ""}`} />
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem className={`my-2 gap-4 ${theme === "dark" ? "bg-accent text-accent-foreground" : ""}`} onClick={() => setTheme("dark")}>
                    <Moon className={`size-4 ${theme === "dark" ? "fill-[#FF6157] text-[#FF6157]" : ""}`} />
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem className={`mb-2 gap-4 ${theme === "system" ? "bg-accent text-accent-foreground" : ""}`} onClick={() => setTheme("system")}>
                    <Monitor className={`size-4 ${theme === "system" ? "fill-[#2acb42] text-[#2acb42]" : ""}`} />
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}