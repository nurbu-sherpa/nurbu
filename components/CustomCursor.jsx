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
                width: cursorVariant === "interactive" ? 48 : cursorVariant === "pressed" ? 26 : 16,
                height: cursorVariant === "interactive" ? 48 : cursorVariant === "pressed" ? 26 : 16,
                marginLeft: cursorVariant === "interactive" ? -24 : cursorVariant === "pressed" ? -13 : -8,
                marginTop: cursorVariant === "interactive" ? -24 : cursorVariant === "pressed" ? -13 : -8,
                boxShadow:
                    cursorVariant === "interactive"
                    ? "0 0 0 1px rgba(56,189,248,0.28), 0 0 28px rgba(56,189,248,0.16)"
                    : cursorVariant === "pressed"
                        ? "0 0 0 1px rgba(249,115,22,0.28), 0 0 20px rgba(249,115,22,0.14)"
                        : "0 0 0 1px rgba(255,255,255,0.16), 0 0 14px rgba(255,255,255,0.06)"
                }}
                transition={{ type: "spring", stiffness: 240, damping: 22 }}
            />

            <motion.div
                aria-hidden="true"
                className="pointer-events-none fixed left-0 top-0 z-[91] hidden rounded-full md:block"
                style={{ translateX: springX, translateY: springY }}
                animate={{
                opacity: isPointerVisible ? 1 : 0,
                width: cursorVariant === "interactive" ? 10 : 5,
                height: cursorVariant === "interactive" ? 10 : 5,
                marginLeft: cursorVariant === "interactive" ? -5 : -2.5,
                marginTop: cursorVariant === "interactive" ? -5 : -2.5,
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
