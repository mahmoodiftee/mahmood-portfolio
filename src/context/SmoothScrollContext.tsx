import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import Lenis from 'lenis';

interface SmoothScrollContextType {
    lenis: Lenis | null;
}

const SmoothScrollContext = createContext<SmoothScrollContextType | undefined>(undefined);

export const SmoothScrollProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [lenis, setLenis] = useState<Lenis | null>(null);

    useEffect(() => {
        const instance = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
        });

        setLenis(instance);

        function raf(time: number) {
            instance.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            instance.destroy();
            setLenis(null);
        };
    }, []);

    return (
        <SmoothScrollContext.Provider value={{ lenis }}>
            {children}
        </SmoothScrollContext.Provider>
    );
};

export const useSmoothScroll = () => {
    const context = useContext(SmoothScrollContext);
    if (context === undefined) {
        throw new Error('useSmoothScroll must be used within a SmoothScrollProvider');
    }
    return context;
};
