import { useRef } from "react";
import { Tooltip } from "react-tooltip";
import gsap from "gsap";

import { dockApps, locations } from "#constants";
import { useGSAP } from "@gsap/react";
import useWindowStore from "#store/window";
import useLocationStore from "#store/location";

const Dock = () => {
    const { openWindow, closeWindow, windows } = useWindowStore();
    const { activeLocation, setActiveLocation } = useLocationStore();
    const dockRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const dock = dockRef.current;
        if (!dock) return;

        const icons = dock.querySelectorAll<HTMLElement>(".dock-icon");

        const animateIcons = (mouseX: number) => {
            const { left } = dock.getBoundingClientRect();

            icons.forEach((icon) => {
                const { left: iconLeft, width } = icon.getBoundingClientRect();
                const center = iconLeft - left + width / 2;
                const distance = Math.abs(mouseX - center);

                const intensity = Math.exp(-(distance ** 2) / 2000);

                gsap.to(icon, {
                    scale: 1 + 0.25 * intensity,
                    y: -15 * intensity,
                    duration: 0.2,
                    ease: "power1.out",
                });
            });
        };

        const handleMouseMove = (e: MouseEvent) => {
            const { left } = dock.getBoundingClientRect();

            animateIcons(e.clientX - left);
        };

        const resetIcons = () =>
            icons.forEach((icon) =>
                gsap.to(icon, {
                    scale: 1,
                    y: 0,
                    duration: 0.3,
                    ease: "power1.out",
                }),
            );

        dock.addEventListener("mousemove", handleMouseMove);
        dock.addEventListener("mouseleave", resetIcons);

        return () => {
            dock.removeEventListener("mousemove", handleMouseMove);
            dock.removeEventListener("mouseleave", resetIcons);
        };
    }, []);

    const toggleApp = (app: import("#types").DockApp) => {
        if (!app.canOpen) return;

        const window = windows[app.id];
        if (!window) {
            if (import.meta.env.DEV) {
                console.warn(`ToggleApp warning: app.id "${app.id}" not found in windows store.`);
            }
            return;
        }

        if (app.id === "finder") {
            if (window.isOpen) {
                if (activeLocation?.id !== locations.work.id) {
                    setActiveLocation(locations.work);
                } else {
                    closeWindow("finder");
                }
            } else {
                setActiveLocation(locations.work);
                openWindow("finder");
            }
        } else {
            if (window.isOpen) {
                closeWindow(app.id);
            } else {
                openWindow(app.id);
            }
        }
    };

    const handleTrashClick = () => {
        const finderWindow = windows.finder;
        if (finderWindow?.isOpen) {
            if (activeLocation?.id === locations.trash.id) {
                closeWindow("finder");
            } else {
                setActiveLocation(locations.trash);
            }
        } else {
            setActiveLocation(locations.trash);
            openWindow("finder");
        }
    };

    return (
        <section id="dock">
            <div ref={dockRef} className="dock-container">
                {dockApps.map((app) => (
                    <div key={app.id} className={`relative flex justify-center ${!["finder", "safari", "photos", "contact"].includes(app.id) ? "max-sm:hidden" : ""}`}>
                        <button
                            type="button"
                            className="dock-icon"
                            aria-label={app.name}
                            data-tooltip-id="dock-tooltip"
                            data-tooltip-content={app.name}
                            data-tooltip-delay-show={500}
                            disabled={!app.canOpen && app.id !== "trash"}
                            onClick={() => app.id === "trash" ? handleTrashClick() : toggleApp(app)}
                        >
                            <img
                                src={`/images/${app.icon}`}
                                alt={app.name}
                                loading="lazy"
                                className={app.canOpen || app.id === "trash" ? "" : "opacity-60"}
                            />
                        </button>
                    </div>
                ))}

                <Tooltip id="dock-tooltip" place="top" className="tooltip" />
            </div>
        </section>
    );
};

export default Dock;
