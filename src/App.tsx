import { useEffect, useState } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/all";

import { Dock, Home, Navbar, Welcome, ThemeProvider } from "#components";
import { useTheme } from "#components/theme-provider";
import {
  Contact,
  Finder,
  Gallery,
  Image,
  Resume,
  Safari,
  Terminal,
  Text,
  Spotify,
  MusicPreview,
} from "#windows";
import Iridescence from "./components/Iridescence";

gsap.registerPlugin(Draggable);

const DesktopBackground = () => {
  const { theme } = useTheme();
  const [isDark, setIsDark] = useState(() => {
    if (theme === "system") {
      return typeof window !== "undefined"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
        : false;
    }
    return theme === "dark";
  });

  useEffect(() => {
    if (theme === "system") {
      const matcher = window.matchMedia("(prefers-color-scheme: dark)");
      setIsDark(matcher.matches);
      const listener = (e: MediaQueryListEvent) => setIsDark(e.matches);
      matcher.addEventListener("change", listener);
      return () => matcher.removeEventListener("change", listener);
    } else {
      setIsDark(theme === "dark");
    }
  }, [theme]);

  return (
    <Iridescence
      color={isDark ? [0.15, 0.25, 0.55] : [0.3, 0.55, 0.95]}
      mouseReact
      amplitude={0.1}
      speed={1}
    />
  );
};

const App = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
      <main>
        <DesktopBackground />
        <Navbar />
        <Welcome />
        <Dock />

        <Terminal />
        <Safari />
        <Resume />
        <Finder />
        <Text />
        <Image />
        <Contact />
        <Gallery />
        <Spotify />
        <MusicPreview />
        <Home />
      </main>
    </ThemeProvider>
  );
};

export default App;
