import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface Experience {
    id: string;
    company: string;
    role: string;
    date: string;
    bullets: string[];
    tags: string[];
    accentWord: string;
    accentColor: string;
    isCurrent?: boolean;
}

const experiences: Experience[] = [
    {
        id: '01',
        company: 'Dotlines',
        role: 'Software Engineer',
        date: 'JAN 2025 — PRESENT',
        bullets: [
            'Integrated Asterisk to replace the legacy call engine for high-volume OBD and IBD campaigns.',
            'Built a multi-tenant wallet management system with real-time spending tracking.',
            'Developed microservices for pricing and payments using CBS gateway and message queues.',
        ],
        tags: ['Node.js', 'PHP', 'Laravel', 'RabbitMQ', 'Redis', 'mySql'],
        accentWord: 'PRODUCTION.',
        accentColor: 'bg-neo-yellow text-black',
        isCurrent: true,
    },
    {
        id: '02',
        company: 'Premier Code',
        role: 'Software Engineer Intern',
        date: 'JAN 2024 — AUG 2024',
        bullets: [
            'Contributed to HelveticaUI, a pre-made UI component platform for Swift (Apple) apps.',
            'Participated in code reviews focused on clean, maintainable code standards.',
            'Gained hands-on experience working remotely in a professional engineering team.',
        ],
        tags: ['Next.js', 'React', 'Redux', 'Tailwaind', 'Express', 'MongoDB'],
        accentWord: 'PRODUCTION.',
        accentColor: 'bg-neo-blue text-white',
        isCurrent: false,
    },
];

const cellVariants: any = {
    hidden: { x: -30, opacity: 0 },
    whileInView: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.5, ease: 'easeOut' }
    }
};

const Experience = () => {
    return (
        <section id="experience" className="py-12 px-4 md:px-8 xl:px-12 bg-(--background) flex flex-col justify-center items-center">
            <div className="w-full max-w-360 mx-auto overflow-hidden border-4 border-(--neo-border-color) neo-shadow-lg bg-(--background) relative z-10 transition-colors duration-300">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row border-b-4 border-(--neo-border-color)">
                    <div className="flex-1 p-4 md:p-8 border-b-4 md:border-b-0 md:border-r-4 border-(--neo-border-color) flex items-center gap-4">
                        <h2 className="text-4xl md:text-5xl font-black uppercase text-(--foreground) tracking-tighter">EXPERIENCE</h2>
                        <span className="text-xl md:text-2xl font-black uppercase opacity-60"></span>
                    </div>
                    <div className="flex-1 p-4 md:p-8 flex items-center md:justify-end bg-(--background)">
                        <span className="text-sm font-bold uppercase tracking-widest opacity-60">WHERE I'VE WORKED</span>
                    </div>
                </div>

                {/* Experience Cells */}
                {experiences.map((exp, idx) => (
                    <motion.div
                        key={exp.id}
                        variants={cellVariants}
                        initial="hidden"
                        whileInView="whileInView"
                        viewport={{ once: true, margin: '-80px' }}
                        className={`flex flex-col md:flex-row ${idx < experiences.length - 1 ? 'border-b-4 border-(--neo-border-color)' : ''}`}
                    >
                        {/* Left: Main Content */}
                        <div className="relative flex-3 p-4 md:p-10 xl:p-14 border-b-4 md:border-b-0 md:border-r-4 border-(--neo-border-color) overflow-hidden flex flex-col gap-6">
                            {/* Background Number Watermark */}
                            <div className="absolute top-2 left-4 text-[8rem] md:text-[10rem] font-black opacity-[0.05] leading-none select-none pointer-events-none">
                                {exp.id}
                            </div>

                            {/* Company name + CURRENT badge */}
                            <div className="flex items-start gap-4 flex-wrap">
                                <h3 className="text-4xl md:text-6xl xl:text-7xl font-black uppercase tracking-tighter text-(--foreground) leading-none">
                                    {exp.company}
                                </h3>
                                {exp.isCurrent && (
                                    <span className="mt-2 bg-neo-yellow text-black text-xs font-black uppercase tracking-widest px-2 md:px-3 md:py-1.5 border-2 md:border-4 border-(--neo-border-color) self-start">
                                        CURRENT
                                    </span>
                                )}
                            </div>

                            {/* Role */}
                            <div className="flex items-center gap-3">
                                <div className="w-1.5 h-6 bg-neo-yellow shrink-0" />
                                <span className="text-sm md:text-base font-black uppercase tracking-widest text-(--foreground) opacity-80">
                                    {exp.role}
                                </span>
                            </div>

                            {/* Date pill */}
                            <div className="inline-flex">
                                <span className="border-2 border-(--neo-border-color) px-3 py-1 text-xs font-black uppercase tracking-widest text-(--foreground) opacity-70">
                                    {exp.date}
                                </span>
                            </div>

                            {/* Bullets */}
                            <ul className="flex flex-col gap-3 mt-2">
                                {exp.bullets.map((bullet, bIdx) => (
                                    <li key={bIdx} className="flex items-start gap-3 text-sm md:text-base text-(--foreground) opacity-80 leading-relaxed font-medium">
                                        <span className="shrink-0 mt-0.5 font-black"><ChevronRight /></span>
                                        <span>{bullet}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Right: Tags + Accent */}
                        <div className="flex-2 flex flex-col">
                            {/* Tech Stack Tags */}
                            <div className="p-4 md:p-8 flex flex-col gap-4 border-b-4 border-(--neo-border-color) flex-1">
                                <span className="text-xs font-bold uppercase tracking-widest opacity-60">TECH USED</span>
                                <div className="flex flex-wrap  gap-2 mt-auto">
                                    {exp.tags.map(tag => (
                                        <span
                                            key={tag}
                                            className="border-2 border-(--neo-border-color) px-3 py-1 text-xs font-black uppercase tracking-widest text-(--foreground)"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Accent Cell with role vibe word */}
                            <div className={`p-4 md:p-8 flex items-end justify-start ${exp.accentColor}`}>
                                <span className="text-4xl md:text-5xl xl:text-6xl font-black uppercase tracking-tighter leading-none">
                                    {exp.accentWord}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                ))}

                {/* Bottom Bar */}
                {/* <a
                    href="mailto:mahmoodiftee@gmail.com"
                    className="group flex items-center justify-center border-t-4 border-(--neo-border-color) bg-black text-white py-5 px-8 hover:bg-neo-yellow hover:text-black transition-colors duration-300 cursor-pointer"
                >
                    <span className="text-base md:text-lg font-black uppercase tracking-[0.2em] group-hover:tracking-[0.3em] transition-all duration-300">
                        OPEN TO NEW OPPORTUNITIES ↗
                    </span>
                </a> */}
            </div>
        </section>
    );
};

export default Experience;
