"use client";

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';



const Footer = () => {
    const footerRef = useRef<HTMLDivElement>(null);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        const footerEl = footerRef.current;
        if (!footerEl) return;

        const observer = new window.IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !expanded) {
                    setExpanded(true);
                }
            },
            { threshold: 0.5 }
        );
        observer.observe(footerEl);
        return () => observer.disconnect();
    }, [expanded]);

    useEffect(() => {
        const footerEl = footerRef.current;
        if (!footerEl) return;
        if (expanded) {
            gsap.to(footerEl, {
                height: '100vh',
                duration: 1.2,
                ease: 'power4.inOut',
                backgroundColor: '#ef4444',
                borderRadius: 0,
            });
        } else {
            gsap.set(footerEl, {
                height: 'auto',
                backgroundColor: '#ef4444', 
                borderRadius: 0,
            });
        }
    }, [expanded]);

    return (
        <>
            <footer
                ref={footerRef}
                className={`bg-destructive text-white py-5 transition-all duration-700 overflow-hidden flex items-center justify-center relative`}
                style={{ height: expanded ? '100vh' : 'auto' }}
            >
                {expanded ? (
                    <div className="flex flex-col items-center justify-center w-full h-full gap-6 text-center">
                        <h2 className="text-3xl md:text-5xl font-bold mb-2">Let's work together</h2>
                        <a href="mailto:hello@alfacharlie.co" className="text-xl md:text-2xl underline hover:text-gray-300">ibrahimnassar870@gmail.com</a>
                        <div className="text-base md:text-lg mt-4">
                            © 2025 Alfa Charlie LLC
                        </div>
                        <div className="text-sm uppercase tracking-[0.2em] mt-2">San Diego, CA</div>
                    </div>
                ) : (
                    <div className="container flex justify-end items-center">
                        <p className="text-[10px] font-normal uppercase tracking-[0.2em]">
                            SAN DIEGO, CA
                        </p>
                    </div>
                )}
            </footer>
        </>
    );
};

export default Footer;