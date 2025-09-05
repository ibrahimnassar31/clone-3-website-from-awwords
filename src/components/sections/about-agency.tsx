"use client";

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

const AboutAgency = () => {
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (!headingRef.current) return;

    // Split lines/words/chars using SplitType
    const split = new SplitType(headingRef.current, {
      types: 'lines,words,chars',
    });

    const lines = split.lines || [];
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      scrollTrigger: {
        trigger: headingRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    // Visual polish
    gsap.set(headingRef.current, { perspective: 800 });
    gsap.set(lines, { overflow: 'hidden' });

    const lineDelay = 0.18; // spacing between lines

    lines.forEach((lineEl, i) => {
      const chars = Array.from(lineEl.querySelectorAll('.char')) as HTMLElement[];

      // Line enters: slide up + fade + skew relax
      tl.from(
        lineEl,
        {
          y: 100,
          autoAlpha: 0,
          skewX: 10,
          duration: 1.2,
          ease: 'power3.out',
        },
        i * lineDelay
      );

      // Characters inside each line rotateX into place with slight overlap
      tl.from(
        chars,
        {
          rotateX: -90,
          transformOrigin: '50% 100% -20',
          duration: 0.9,
          ease: 'back.out(1.7)',
          stagger: { each: 0.012, from: 'start' },
          opacity: 0,
        },
        i * lineDelay + 0.12 // overlap with line motion
      ).to(
        lineEl,
        {
          skewX: 0,
          duration: 0.6,
          ease: 'power2.out',
        },
        i * lineDelay + 0.3
      );
    });

    return () => {
      tl.kill();
      split.revert();
    };
  }, []);

  return (
    <section className="bg-background">
      <div className="container flex flex-col items-center text-center py-24 md:py-36">
        <h3
          ref={headingRef}
          className="max-w-[900px] text-[32px] font-normal leading-tight text-foreground"
          style={{ willChange: 'transform, opacity' }}
        >
          Alfa Charlie is a women-owned creative agency dedicated to brands driving change in women's health. We understand both the mission and the market challenges you face every day.
        </h3>
        <p className="mt-12">
          <Link 
            href="/about" 
            className="inline-flex items-center text-sm font-bold uppercase tracking-wider text-foreground transition-colors hover:text-primary group"
          >
            About Alfa Charlie
            <ArrowRight className="ml-2.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </p>
      </div>
    </section>
  );
};

export default AboutAgency;
