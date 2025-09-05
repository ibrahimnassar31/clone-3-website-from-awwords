'use client'
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(SplitText, ScrollTrigger);

const MissionStatement = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!headingRef.current) return;
    const split = new SplitText(headingRef.current, { type: 'lines' });
    gsap.set(split.lines, { perspective: 800 });
    gsap.from(split.lines, {
      scrollTrigger: {
        trigger: headingRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      opacity: 0,
      rotateX: 90,
      y: 60,
      stagger: 0.15,
      duration: 1.1,
      ease: 'back.out(1.7)',
    });
    return () => split.revert();
  }, []);

  return (
    <section className="bg-background text-foreground py-20 lg:py-40">
      <div className="container mx-auto">
        <h1
          ref={headingRef}
          className="px-4 md:px-[8.33333%] text-4xl lg:text-[3.5rem] font-normal leading-tight tracking-tight"
          style={{ overflow: 'hidden' }}
        >
          We are design allies for femtech brands*—those redefining the
          industry by challenging the status quo, rewriting outdated
          narratives, and sparking open, inclusive conversations. We imagine a
          future where women&apos;s health is no longer a whispered topic but a
          vibrant, celebrated movement—powered by{' '}
          <Link href="/services" className="text-foreground">
            strategy and design
          </Link>
          .
        </h1>
      </div>
    </section>
  );
};

export default MissionStatement;