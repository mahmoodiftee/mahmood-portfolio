import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';

interface ScrollbarProps {
    lenis: Lenis | null;
}

const Scrollbar: React.FC<ScrollbarProps> = ({ lenis }) => {
    const thumbRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!lenis) return;

        const updateThumb = () => {
            if (!thumbRef.current) return;

            const progress = lenis.progress;
            const windowHeight = window.innerHeight;
            const scrollHeight = document.documentElement.scrollHeight;

            // Calculate thumb height relative to viewport
            const thumbHeight = Math.max(40, (windowHeight / scrollHeight) * windowHeight);
            const moveRange = windowHeight - thumbHeight;
            const translateY = progress * moveRange;

            thumbRef.current.style.height = `${thumbHeight}px`;
            thumbRef.current.style.transform = `translate3d(0, ${translateY}px, 0)`;
        };

        lenis.on('scroll', updateThumb);
        // Initial update
        updateThumb();

        // Handle window resize
        window.addEventListener('resize', updateThumb);

        return () => {
            lenis.off('scroll', updateThumb);
            window.removeEventListener('resize', updateThumb);
        };
    }, [lenis]);

    const handlePointerDown = (e: React.PointerEvent) => {
        if (!lenis || !thumbRef.current) return;

        const startY = e.clientY;
        const startProgress = lenis.progress;
        const windowHeight = window.innerHeight;
        const scrollHeight = document.documentElement.scrollHeight;
        const thumbHeight = thumbRef.current.offsetHeight;
        const moveRange = windowHeight - thumbHeight;

        const handlePointerMove = (moveEvent: PointerEvent) => {
            const deltaY = moveEvent.clientY - startY;
            const deltaProgress = deltaY / moveRange;
            const newProgress = Math.min(1, Math.max(0, startProgress + deltaProgress));

            const targetScroll = newProgress * (scrollHeight - windowHeight);
            lenis.scrollTo(targetScroll, { immediate: true });
        };

        const handlePointerUp = () => {
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);
            document.body.style.userSelect = '';
        };

        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('pointerup', handlePointerUp);
        document.body.style.userSelect = 'none'; // Prevent text selection during drag
    };

    return (
        <div className="fixed top-0 right-0 w-1.5 h-full z-9998 pointer-events-none">
            <div
                ref={thumbRef}
                onPointerDown={handlePointerDown}
                className="w-full bg-(--foreground)/20 hover:bg-(--foreground)/60 transition-colors pointer-events-auto cursor-pointer"
                style={{ willChange: 'transform, height' }}
            />
        </div>
    );
};

export default Scrollbar;
