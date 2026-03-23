import { locations } from "#constants";
import useLocationStore from "#store/location";
import useWindowStore from "#store/window";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import { Draggable } from "gsap/all";
import type { LocationItem } from "#types";

const projects = locations.work?.children ?? [];

const Home = () => {
  const { setActiveLocation } = useLocationStore();
  const { openWindow } = useWindowStore();

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
      <ul className="sm:hidden absolute top-20 w-full px-6 grid grid-cols-3 min-[425px]:grid-cols-4 gap-x-0.5 gap-y-5 items-center">
        <li
          className="!relative flex flex-col items-center justify-center cursor-pointer"
          onClick={() => openWindow("resume")}
        >
          <img src="/images/pages.png" alt="Resume" className="w-[85%] aspect-square object-contain drop-shadow-md rounded-[20%]" />
        </li>
        <li
          className="!relative flex flex-col items-center justify-center cursor-pointer"
          onClick={() => openWindow("terminal")}
        >
          <img src="/images/terminal.png" alt="Terminal" className="w-[110%] aspect-square object-contain drop-shadow-md rounded-[20%]" />
        </li>
      </ul>
    </section>
  );
};

export default Home;
