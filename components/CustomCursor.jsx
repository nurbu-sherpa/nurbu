"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const HERO_SCOPE = '[data-cursor-scope="hero"]';
const CURSOR_SELECTORS =
    'a, button, input, textarea, select, [role="button"], [data-cursor="interactive"]';

export default function CustomCursor() {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const springX = useSpring(cursorX, { damping: 22, stiffness: 260, mass: 0.5 });
    const springY = useSpring(cursorY, { damping: 22, stiffness: 260, mass: 0.5 });
    const [isPointerVisible, setIsPointerVisible] = useState(false);
    const [cursorVariant, setCursorVariant] = useState("default");
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        const touchCapable =
            window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;

        setIsTouchDevice(touchCapable);

        if (touchCapable) {
            return undefined;
        }

        const handlePointerMove = (event) => {
            const target = event.target instanceof Element ? event.target : null;
            const heroScope = target?.closest(HERO_SCOPE);

            if (!heroScope) {
                setIsPointerVisible(false);
                setCursorVariant("default");
                return;
            }

            cursorX.set(event.clientX);
            cursorY.set(event.clientY);
            setIsPointerVisible(true);

            const interactiveTarget = target?.closest(CURSOR_SELECTORS);
            setCursorVariant(interactiveTarget ? "interactive" : "default");
        };

        const handlePointerDown = (event) => {
            const target = event.target instanceof Element ? event.target : null;

            if (target?.closest(HERO_SCOPE)) {
                setCursorVariant("pressed");
            }
        };

        const handlePointerUp = (event) => {
            const target = event.target instanceof Element ? event.target : null;
            setCursorVariant(target?.closest(CURSOR_SELECTORS) ? "interactive" : "default");
        };

        const handlePointerLeave = () => setIsPointerVisible(false);

        window.addEventListener("pointermove", handlePointerMove);
        window.addEventListener("pointerdown", handlePointerDown);
        window.addEventListener("pointerup", handlePointerUp);
        document.addEventListener("mouseleave", handlePointerLeave);

        return () => {
            window.removeEventListener("pointermove", handlePointerMove);
            window.removeEventListener("pointerdown", handlePointerDown);
            window.removeEventListener("pointerup", handlePointerUp);
            document.removeEventListener("mouseleave", handlePointerLeave);
        };
    }, [cursorX, cursorY]);

    if (isTouchDevice) {
        return null;
    }

    return (
        <>
            <motion.div
                aria-hidden="true"
                className="pointer-events-none fixed left-0 top-0 z-[90] hidden rounded-full border border-white/35 bg-white/5 backdrop-blur-md md:block"
                style={{ translateX: springX, translateY: springY }}
                animate={{
                    opacity: isPointerVisible ? 1 : 0,
                    width: cursorVariant === "interactive" ? 78 : cursorVariant === "pressed" ? 42 : 26,
                    height: cursorVariant === "interactive" ? 78 : cursorVariant === "pressed" ? 42 : 26,
                    marginLeft: cursorVariant === "interactive" ? -39 : cursorVariant === "pressed" ? -21 : -13,
                    marginTop: cursorVariant === "interactive" ? -39 : cursorVariant === "pressed" ? -21 : -13,
                    boxShadow:
                        cursorVariant === "interactive"
                            ? "0 0 0 1px rgba(56,189,248,0.35), 0 0 42px rgba(56,189,248,0.22)"
                            : cursorVariant === "pressed"
                                ? "0 0 0 1px rgba(249,115,22,0.35), 0 0 36px rgba(249,115,22,0.18)"
                                : "0 0 0 1px rgba(255,255,255,0.18), 0 0 24px rgba(255,255,255,0.08)"
                }}
                transition={{ type: "spring", stiffness: 240, damping: 22 }}
            />

            <motion.div
                aria-hidden="true"
                className="pointer-events-none fixed left-0 top-0 z-[91] hidden rounded-full md:block"
                style={{ translateX: springX, translateY: springY }}
                animate={{
                    opacity: isPointerVisible ? 1 : 0,
                    width: cursorVariant === "interactive" ? 14 : 8,
                    height: cursorVariant === "interactive" ? 14 : 8,
                    marginLeft: cursorVariant === "interactive" ? -7 : -4,
                    marginTop: cursorVariant === "interactive" ? -7 : -4,
                    backgroundColor:
                        cursorVariant === "pressed"
                            ? "rgba(249,115,22,0.95)"
                            : cursorVariant === "interactive"
                                ? "rgba(56,189,248,0.95)"
                                : "rgba(255,255,255,0.95)"
                }}
                transition={{ type: "spring", stiffness: 320, damping: 26 }}
            />
        </>
    );
}
