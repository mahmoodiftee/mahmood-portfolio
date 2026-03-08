import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const stackData = [
    {
        category: 'BACKEND',
        skills: ['Node.js', 'Express.js', 'NestJS', 'Laravel'],
        watermark: 'BE',
        className: 'md:col-span-2 bg-neo-yellow text-black',
        accentBorder: 'hover:border-(-background)'
    },
    {
        category: 'FRONTEND',
        skills: ['Next.js', 'React', 'React Native', 'Tailwind'],
        watermark: 'FE',
        className: 'bg-(--background)',
        accentBorder: 'hover:border-(-background)'
    },
    {
        category: 'STATE & DATA & VALIDATION',
        skills: ['Redux Toolkit', 'TanStack Query', 'Zod', 'Zustand'],
        watermark: 'ST',
        className: 'bg-(--background)',
        accentBorder: 'hover:border-(-background)'
    },
    {
        category: 'DATABASE',
        skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'],
        watermark: 'DB',
        className: 'bg-neo-lemon text-black',
        accentBorder: 'hover:border-(-background)'
    },
    {
        category: 'REAL-TIME & QUEUES',
        skills: ['Socket.io', 'Kafka', 'RabbitMQ', 'Redis'],
        watermark: 'RT/Q',
        className: 'md:col-span-2 bg-neo-blue text-white',
        accentBorder: 'hover:border-(-background)'
    },
    {
        category: 'LANGUAGES',
        skills: ['JavaScript', 'PHP', 'Python', 'C/C++'],
        watermark: 'LG',
        className: 'bg-(--background)',
        accentBorder: 'hover:border-(-background)'
    },
    {
        category: 'DEVOPS & CLOUD',
        skills: ['AWS', 'Docker', 'NGINX', 'CI/CD', 'GitHub Actions'],
        watermark: 'DO',
        className: 'bg-neo-red text-white',
        accentBorder: 'hover:border-(-background)'
    },
    {
        category: 'CURRENTLY LEARNING',
        skills: 'Diving deeper into system design and distributed systems.',
        watermark: '??',
        className: 'md:col-span-2 text-(--foreground) justify-center uppercase',
        accentBorder: 'hover:border-(-background)',
        isSentence: true
    },
    {
        category: 'GITHUB',
        skills: 'Explore more on GitHub',
        icon: ArrowUpRight,
        watermark: 'GH',
        className: 'bg-(--foreground) text-(--background) justify-center items-center hover:bg-neo-yellow hover:text-black transition-all duration-300 cursor-pointer',
        accentBorder: 'hover:border-(-background)',
        isLink: true,
        url: 'https://github.com/mahmoodiftee'
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    whileInView: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants: any = {
    hidden: { y: 20, opacity: 0 },
    whileInView: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.4, ease: 'easeOut' }
    }
};

const Stack = () => {
    return (
        <section id="stack" className="py-12 px-4 md:px-8 xl:px-12 bg-(--background) relative flex flex-col justify-center items-center">
            <div className="w-full max-w-360 mx-auto overflow-hidden border-4 border-(--neo-border-color) neo-shadow-lg grid grid-cols-1 bg-(--background) relative z-10 transition-colors duration-300">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row border-b-4 border-(--neo-border-color)">
                    <div className="flex-1 p-4 md:p-8 border-b-4 md:border-b-0 md:border-r-4 border-(--neo-border-color) flex items-center gap-4">
                        <h2 className="text-4xl md:text-5xl font-black uppercase text-(--foreground) tracking-tighter">STACK</h2>
                        <span className="text-xl md:text-2xl font-black uppercase opacity-60"></span>
                    </div>
                    <div className="flex-1 p-4 md:p-8 flex items-center md:justify-end bg-(--background)">
                        <span className="text-sm font-bold uppercase tracking-widest opacity-60">THINGS I WORK WITH</span>
                    </div>
                </div>

                {/* Grid Layout */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="whileInView"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-4 border-b-4 border-(--neo-border-color)"
                >
                    {stackData.map((item, index) => {
                        const Icon = (item as any).icon;
                        return (
                            <motion.div
                                key={item.category}
                                variants={itemVariants}
                                className={`relative p-4 md:p-8 border-b-4 border-(--neo-border-color) transition-colors duration-200 overflow-hidden flex flex-col ${item.className} ${item.accentBorder}
                                    ${index === 2 || index === 5 || index === 8 ? 'md:border-r-0' : 'md:border-r-4'}
                                    ${index === 0 || index === 4 || index === 7 ? 'md:col-span-2' : ''}
                                    ${index >= 8 ? 'border-b-0' : 'border-b-4'}
                                    ${index === 8 ? 'md:border-r-0' : ''}
                                `}
                            >
                                {/* Watermark */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] font-black opacity-[0.05] pointer-events-none leading-none select-none">
                                    {item.watermark}
                                </div>

                                <span className="text-xs font-bold uppercase opacity-60 mb-8 z-10 block">
                                    {item.category}
                                </span>

                                <div className="mt-auto z-10 w-full">
                                    {item.isSentence ? (
                                        <p className="text-lg md:text-xl font-bold leading-tight">
                                            {item.skills}
                                        </p>
                                    ) : (item as any).isLink ? (
                                        <a href={(item as any).url} target="_blank" rel="noopener noreferrer" className="text-xl md:text-2xl lg:text-3xl font-black uppercase tracking-tighter hover:scale-105 transition-transform flex items-center gap-2 leading-none group/link">
                                            {item.skills}
                                            {Icon && <Icon size={32} strokeWidth={3} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />}
                                        </a>
                                    ) : (
                                        <div className="flex flex-wrap gap-x-3 gap-y-1">
                                            {(item.skills as string[]).map((skill, sIdx, arr) => (
                                                <span key={skill} className="text-lg md:text-xl font-black uppercase tracking-tight text-inherit">
                                                    {skill}
                                                    {sIdx < arr.length - 1 && <span className="ml-3 opacity-30">—</span>}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Bottom Bar Statement */}
                <div className="block border-t-0 border-(--neo-border-color) bg-black text-white py-4 text-center">
                    <span className="text-base md:text-lg font-black uppercase tracking-[0.2em]">
                        ALWAYS LEARNING // MORE IN THE PIPELINE
                    </span>
                </div>
            </div>
        </section>
    );
};

export default Stack;
