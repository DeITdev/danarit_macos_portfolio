import useWindowStore from "#store/window";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { useRef, type ComponentType } from "react";

const WindowWrapper = <P extends object>(
    Component: ComponentType<P>,
    windowKey: string,
) => {
    const Wrapped = (props: P) => {
        const focusWindow = useWindowStore((s) => s.focusWindow);
        const isOpen = useWindowStore(
            (s) => s.windows?.[windowKey as keyof typeof s.windows]?.isOpen ?? false,
        );
        const zIndex = useWindowStore(
            (s) => s.windows?.[windowKey as keyof typeof s.windows]?.zIndex ?? 0,
        );
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
                    },
                });
            }
        }, [isOpen]);

        useGSAP(() => {
            const el = ref.current;
            if (!el) return;

            const [instance] = Draggable.create(el, {
                type: "x,y",
                onPress: () => focusWindow(windowKey),
            });

            return () => {
                instance.kill();
            };
        }, []);

        return (
            <section id={windowKey} ref={ref} style={{ zIndex }} className="absolute">
                <Component {...props} />
            </section>
        );
    };

    Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;

    return Wrapped;
};

export default WindowWrapper;
