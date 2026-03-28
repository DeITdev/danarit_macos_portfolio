import { locations } from "#constants";
import useLocationStore from "#store/location";
import useWindowStore from "#store/window";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import { Draggable } from "gsap/all";
import type { LocationItem } from "#types";
import { useTheme } from "#components/theme-provider";
import { useEffect, useState } from "react";

const projects = locations.work?.children ?? [];

const Home = () => {
  const { setActiveLocation } = useLocationStore();
  const { openWindow } = useWindowStore();
  const { theme, setTheme } = useTheme();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDark = () => {
      if (theme === "dark") return true;
      if (theme === "light") return false;
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    };
    setIsDark(checkDark());
  }, [theme]);

  const handleOpenProjectFinder = (project: LocationItem) => {
    setActiveLocation(project);
    openWindow("finder");
  };

  useGSAP(() => {
    const instances = Draggable.create(".folder");
    return () => {
      instances.forEach((instance) => instance.kill());
    };
  }, [projects]);

  return (
    <section id="home">
      <ul className="max-sm:hidden">
        {projects.map((project) => (
          <li
            key={project.id}
            className={clsx("group folder", project.windowPosition)}
            onClick={() => handleOpenProjectFinder(project)}
            role="button"
            tabIndex={0}
            aria-label={`Open ${project.name}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleOpenProjectFinder(project);
              }
            }}
          >
            <img src="/images/folder.png" alt={project.name} />
            <p>{project.name}</p>
          </li>
        ))}
      </ul>

      {/* Mobile Home Apps */}
      <ul className="sm:hidden absolute top-20 w-full px-6 grid grid-cols-4 gap-x-0.5 gap-y-5 items-center">
        <li
          className="!relative flex flex-col items-center justify-center cursor-pointer"
          onClick={() => openWindow("resume")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openWindow("resume");
            }
          }}
        >
          <img src="/images/pages.png" alt="Resume" className="w-[85%] aspect-square object-contain drop-shadow-md rounded-[20%]" />
        </li>
        <li
          className="!relative flex flex-col items-center justify-center cursor-pointer"
          onClick={() => openWindow("terminal")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openWindow("terminal");
            }
          }}
        >
          <img src="/images/terminal.png" alt="Terminal" className="w-[110%] aspect-square object-contain drop-shadow-md rounded-[20%]" />
        </li>
        <li
          className="!relative flex flex-col items-center justify-center cursor-pointer"
          onClick={() => setTheme(isDark ? "light" : "dark")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setTheme(isDark ? "light" : "dark");
            }
          }}
        >
          <img
            src={isDark ? "/images/dark-mode.png" : "/images/light-mode.png"}
            alt="Toggle theme"
            className="w-full aspect-square object-contain drop-shadow-md rounded-[20%]"
          />
        </li>
        <li
          className="!relative flex flex-col items-center justify-center cursor-pointer"
          onClick={() => {
            const aboutMeFile = locations.about.children.find((child) => child.name === "about-me.txt");
            if (aboutMeFile && "fileType" in aboutMeFile) {
              openWindow("txtfile", aboutMeFile);
            }
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              const aboutMeFile = locations.about.children.find((child) => child.name === "about-me.txt");
              if (aboutMeFile && "fileType" in aboutMeFile) {
                openWindow("txtfile", aboutMeFile);
              }
            }
          }}
        >
          <img
            src="/images/user.png"
            alt="About me"
            className="w-full aspect-square object-contain drop-shadow-md rounded-[20%]"
          />
        </li>
        <li
          className="!relative flex flex-col items-center justify-center cursor-pointer"
          onClick={() => openWindow("spotify")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openWindow("spotify");
            }
          }}
        >
          <img
            src="/images/spotify.png"
            alt="Music"
            className="w-full aspect-square object-contain drop-shadow-md rounded-[20%]"
          />
        </li>
      </ul>
    </section>
  );
};

export default Home;
