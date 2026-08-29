import { useRef } from "react";
import useWindowStore from "../store/window";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";


gsap.registerPlugin(Draggable);

const WindowWrapper = (Component, windowKey) => {
    const Wrapped = (props) => {
        const { focusWindow, windows } = useWindowStore();

        const window = windows[windowKey];

        if (!window) {
            console.error(
                `Window "${windowKey}" is not configured in WINDOW_CONFIG`
            );
            return null;
        }

        const { isOpen, zIndex } = window;

        const ref = useRef(null);

        
        useGSAP(
            () => {
                const el = ref.current;

                if (!el || !isOpen) return;

                gsap.fromTo(
                    el,
                    {
                        scale: 0.8,
                        opacity: 0,
                        y: 40,
                    },
                    {
                        scale: 1,
                        opacity: 1,
                        y: 0,
                        duration: 0.4,
                        ease: "power3.out",
                    }
                );
            },
            {
                dependencies: [isOpen],
            }
        );

        
        useGSAP(
            () => {
                const el = ref.current;

                if (!el || !isOpen) return;

                const [instance] = Draggable.create(el, {
                    type: "x,y",

                    onPress: () => {
                        focusWindow(windowKey);
                    },
                });

                return () => {
                    instance.kill();
                };
            },
            {
                dependencies: [isOpen],
            }
        );

        if (!isOpen) return null;

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

    Wrapped.displayName = `WindowWrapper(${
        Component.displayName || Component.name || "Component"
    })`;

    return Wrapped;
};

export default WindowWrapper;