"use client";

import { useEffect, useRef } from "react";

// Reads a Tailwind color token like "--accent: 14 165 233" and returns "14,165,233".
function readRgbVar(name, fallback) {
    const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    if (!value) {
        return fallback;
    }
    return value.split(/[\s,]+/).slice(0, 3).join(",");
}

const LINK_DISTANCE = 130;
const POINTER_DISTANCE = 180;

/**
 * Interactive constellation background for the hero.
 * - Nodes drift and connect when close; the pointer pulls in accent-colored links.
 * - Clicking (outside links/buttons) releases a small burst of particles.
 * - Pauses when off-screen or when the tab is hidden; draws a static frame for reduced motion.
 */
export default function HeroCanvas({ className = "" }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        const host = canvas?.parentElement;

        if (!canvas || !ctx || !host) {
            return undefined;
        }

        const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        let reduceMotion = motionQuery.matches;
        let width = 0;
        let height = 0;
        let nodes = [];
        let sparks = [];
        let frameId = 0;
        let isVisible = true;
        let colors = {};
        const pointer = { x: 0, y: 0, active: false };

        const readColors = () => {
            const isDark = document.documentElement.classList.contains("dark");
            colors = {
                accent: readRgbVar("--accent", "56,189,248"),
                warm: readRgbVar("--accent-warm", "249,115,22"),
                node: isDark ? "203,213,225" : "71,85,105",
                lineAlpha: isDark ? 0.2 : 0.14,
                nodeAlpha: isDark ? 0.55 : 0.4
            };
        };

        const createNodes = () => {
            const count = Math.min(90, Math.max(22, Math.round((width * height) / 16000)));
            nodes = Array.from({ length: count }, () => ({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.35,
                vy: (Math.random() - 0.5) * 0.35,
                r: Math.random() * 1.4 + 0.8
            }));
        };

        const resize = () => {
            const rect = canvas.getBoundingClientRect();
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = rect.width;
            height = rect.height;
            canvas.width = Math.round(width * dpr);
            canvas.height = Math.round(height * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            createNodes();
            draw();
        };

        const update = () => {
            for (const node of nodes) {
                if (pointer.active) {
                    const dx = node.x - pointer.x;
                    const dy = node.y - pointer.y;
                    const distance = Math.hypot(dx, dy);

                    // Gentle push away from the pointer so the network "parts" around it.
                    if (distance < 90 && distance > 0.1) {
                        const force = (1 - distance / 90) * 0.6;
                        node.x += (dx / distance) * force;
                        node.y += (dy / distance) * force;
                    }
                }

                node.x += node.vx;
                node.y += node.vy;

                if (node.x < 0 || node.x > width) node.vx *= -1;
                if (node.y < 0 || node.y > height) node.vy *= -1;
                node.x = Math.max(0, Math.min(width, node.x));
                node.y = Math.max(0, Math.min(height, node.y));
            }

            sparks = sparks.filter((spark) => spark.life > 0);
            for (const spark of sparks) {
                spark.x += spark.vx;
                spark.y += spark.vy;
                spark.vx *= 0.96;
                spark.vy *= 0.96;
                spark.life -= 0.018;
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, width, height);
            ctx.lineWidth = 1;

            for (let i = 0; i < nodes.length; i += 1) {
                const a = nodes[i];

                for (let j = i + 1; j < nodes.length; j += 1) {
                    const b = nodes[j];
                    const distance = Math.hypot(a.x - b.x, a.y - b.y);

                    if (distance < LINK_DISTANCE) {
                        ctx.strokeStyle = `rgba(${colors.node},${(1 - distance / LINK_DISTANCE) * colors.lineAlpha})`;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                }

                if (pointer.active) {
                    const distance = Math.hypot(a.x - pointer.x, a.y - pointer.y);

                    if (distance < POINTER_DISTANCE) {
                        ctx.strokeStyle = `rgba(${colors.accent},${(1 - distance / POINTER_DISTANCE) * 0.55})`;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(pointer.x, pointer.y);
                        ctx.stroke();
                    }
                }
            }

            for (const node of nodes) {
                const isNear =
                    pointer.active && Math.hypot(node.x - pointer.x, node.y - pointer.y) < POINTER_DISTANCE;
                ctx.fillStyle = isNear ? `rgba(${colors.accent},0.95)` : `rgba(${colors.node},${colors.nodeAlpha})`;
                ctx.beginPath();
                ctx.arc(node.x, node.y, isNear ? node.r + 0.8 : node.r, 0, Math.PI * 2);
                ctx.fill();
            }

            for (const spark of sparks) {
                ctx.fillStyle = `rgba(${spark.color},${Math.max(0, spark.life)})`;
                ctx.beginPath();
                ctx.arc(spark.x, spark.y, spark.r, 0, Math.PI * 2);
                ctx.fill();
            }
        };

        const tick = () => {
            update();
            draw();
            frameId = window.requestAnimationFrame(tick);
        };

        const start = () => {
            if (reduceMotion || frameId || !isVisible || document.hidden) {
                return;
            }
            frameId = window.requestAnimationFrame(tick);
        };

        const stop = () => {
            window.cancelAnimationFrame(frameId);
            frameId = 0;
        };

        const toLocal = (event) => {
            const rect = canvas.getBoundingClientRect();
            return { x: event.clientX - rect.left, y: event.clientY - rect.top };
        };

        const handlePointerMove = (event) => {
            if (event.pointerType === "touch") {
                return;
            }
            const { x, y } = toLocal(event);
            pointer.x = x;
            pointer.y = y;
            pointer.active = true;
            if (reduceMotion) draw();
        };

        const handlePointerLeave = () => {
            pointer.active = false;
            if (reduceMotion) draw();
        };

        const handlePointerDown = (event) => {
            const target = event.target instanceof Element ? event.target : null;
            if (reduceMotion || target?.closest("a, button, [role='tab']")) {
                return;
            }
            const { x, y } = toLocal(event);
            for (let i = 0; i < 18; i += 1) {
                const angle = (Math.PI * 2 * i) / 18 + Math.random() * 0.3;
                const speed = Math.random() * 2.4 + 1;
                sparks.push({
                    x,
                    y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    r: Math.random() * 1.8 + 1,
                    life: 1,
                    color: i % 3 === 0 ? colors.warm : colors.accent
                });
            }
        };

        const handleVisibility = () => (document.hidden ? stop() : start());

        const handleMotionChange = (event) => {
            reduceMotion = event.matches;
            if (reduceMotion) {
                stop();
                draw();
            } else {
                start();
            }
        };

        const resizeObserver = new ResizeObserver(resize);
        const intersectionObserver = new IntersectionObserver(([entry]) => {
            isVisible = entry.isIntersecting;
            if (isVisible) start();
            else stop();
        });
        const themeObserver = new MutationObserver(() => {
            readColors();
            draw();
        });

        readColors();
        resize();
        start();

        resizeObserver.observe(canvas);
        intersectionObserver.observe(canvas);
        themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
        host.addEventListener("pointermove", handlePointerMove);
        host.addEventListener("pointerleave", handlePointerLeave);
        host.addEventListener("pointerdown", handlePointerDown);
        document.addEventListener("visibilitychange", handleVisibility);
        motionQuery.addEventListener("change", handleMotionChange);

        return () => {
            stop();
            resizeObserver.disconnect();
            intersectionObserver.disconnect();
            themeObserver.disconnect();
            host.removeEventListener("pointermove", handlePointerMove);
            host.removeEventListener("pointerleave", handlePointerLeave);
            host.removeEventListener("pointerdown", handlePointerDown);
            document.removeEventListener("visibilitychange", handleVisibility);
            motionQuery.removeEventListener("change", handleMotionChange);
        };
    }, []);

    return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
