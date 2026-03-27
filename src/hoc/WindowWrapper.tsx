import useWindowStore from "#store/window";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/all";
import { useRef, type ComponentType } from "react";

import type { WindowKey } from "#types";

const WindowWrapper = <P extends object>(
    Component: ComponentType<P>,
    windowKey: WindowKey,
) => {
    const Wrapped = (props: P) => {
        const focusWindow = useWindowStore((s) => s.focusWindow);
        const isOpen = useWindowStore(
            (s) => s.windows?.[windowKey as keyof typeof s.windows]?.isOpen ?? false,
        );
        const zIndex = useWindowStore(
            (s) => s.windows?.[windowKey as keyof typeof s.windows]?.zIndex ?? 0,
        );
        const resetZIndex = useWindowStore((s) => s.resetZIndex);
        const ref = useRef<HTMLElement>(null);
        const isFirstRender = useRef(true);

        useGSAP(() => {
            const el = ref.current;
            if (!el) return;

            if (isFirstRender.current) {
                isFirstRender.current = false;
                el.style.display = isOpen ? "block" : "none";
                return;
            }

            gsap.killTweensOf(el);

            if (isOpen) {
                el.style.display = "block";
                gsap.fromTo(
                    el,
                    { scale: 0.8, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.4, ease: "power3.out" },
                );
            } else {
                gsap.to(el, {
                    scale: 0.8,
                    opacity: 0,
                    duration: 0.3,
                    ease: "power3.in",
                    onComplete: () => {
                        el.style.display = "none";
                        resetZIndex(windowKey);
                    },
                });
            }
        }, [isOpen]);

        useGSAP(() => {
            const el = ref.current;
            if (!el) return;

            let instance: Draggable | null = null;

            const handleResize = () => {
                if (window.innerWidth <= 640) {
                    gsap.set(el, { x: 0, y: 0 });
                    if (instance) {
                        instance.kill();
                        instance = null;
                    }
                } else {
                    if (!instance) {
                        instance = Draggable.create(el, {
                            type: "x,y",
                            onPress: () => focusWindow(windowKey),
                            exclude: "input, textarea, select, [contenteditable]",
                        })[0];
                    }
                }
            };

            handleResize();
            window.addEventListener("resize", handleResize);

            return () => {
                window.removeEventListener("resize", handleResize);
                if (instance) instance.kill();
            };
        }, []);

        return (
            <section 
                id={windowKey} 
                ref={ref} 
                style={{ zIndex }} 
                className="absolute"
                onMouseDown={() => focusWindow(windowKey)}
            >
                <Component {...props} />
            </section>
        );
    };

    Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;

    return Wrapped;
};

export default WindowWrapper;
