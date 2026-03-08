import { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const mousePos = useRef({ x: 0, y: 0 });
    const currentPos = useRef({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const checkDevice = () => {
            const canHover = window.matchMedia('(hover: hover)').matches;
            const isSmall = window.innerWidth < 1024;
            setIsVisible(canHover && !isSmall);
        };

        checkDevice();
        window.addEventListener('resize', checkDevice);
        return () => window.removeEventListener('resize', checkDevice);
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        const handleMouseMove = (e: PointerEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
        };

        const updateCursor = () => {
            if (!cursorRef.current) return;

            const easedX = currentPos.current.x + (mousePos.current.x - currentPos.current.x) * 0.15;
            const easedY = currentPos.current.y + (mousePos.current.y - currentPos.current.y) * 0.15;

            currentPos.current = { x: easedX, y: easedY };
            cursorRef.current.style.transform = `translate3d(${easedX - 12}px, ${easedY - 12}px, 0)`;

            requestAnimationFrame(updateCursor);
        };

        window.addEventListener('pointermove', handleMouseMove, { capture: true, passive: true });
        window.addEventListener('pointerdown', handleMouseMove, { capture: true, passive: true });
        const rafId = requestAnimationFrame(updateCursor);

        return () => {
            window.removeEventListener('pointermove', handleMouseMove, { capture: true });
            window.removeEventListener('pointerdown', handleMouseMove, { capture: true });
            cancelAnimationFrame(rafId);
        };
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 w-6 h-6 bg-white rounded-full pointer-events-none z-9999 mix-blend-difference"
            style={{
                // Initial position to avoid jump
                transform: 'translate3d(-100px, -100px, 0)',
            }}
        />
    );
};

export default CustomCursor;
