import { type ReactNode } from 'react';
import CustomCursor from '../components/CustomCursor';
import Scrollbar from '../components/Scrollbar';
import Menu from '../components/Menu';
import ThemeToggle from '../components/ThemeToggle';
import { SmoothScrollProvider, useSmoothScroll } from '../context/SmoothScrollContext';

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayoutContent: React.FC<MainLayoutProps> = ({ children }) => {
    const { lenis } = useSmoothScroll();

    return (
        <>
            <CustomCursor />
            <Menu />
            <ThemeToggle />
            <Scrollbar lenis={lenis} />
            <main className="min-h-screen">
                {children}
            </main>
        </>
    );
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <SmoothScrollProvider>
            <MainLayoutContent>{children}</MainLayoutContent>
        </SmoothScrollProvider>
    );
};

export default MainLayout;
