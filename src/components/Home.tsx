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
            <ul>
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
        </section>
    );
};

export default Home;
