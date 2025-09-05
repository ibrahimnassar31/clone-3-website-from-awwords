"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

const WomankindGrant = () => {
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (!headingRef.current) return;

    const splits: SplitType[] = [];
    const makeSplit = (el: HTMLElement | null) => {
      if (!el) return null;
      const s = new SplitType(el, { types: 'lines,words,chars' });
      splits.push(s);
      return s;
    };

    const splitH = makeSplit(headingRef.current);
    const splitP = makeSplit(paragraphRef.current);
    const splitA = makeSplit(ctaRef.current);

    const allRoots = [headingRef.current, paragraphRef.current, ctaRef.current].filter(Boolean) as HTMLElement[];
    const allLines = [splitH?.lines || [], splitP?.lines || [], splitA?.lines || []].flat() as HTMLElement[];

    // Prepare 3D context and clipping for lines
    gsap.set(allRoots, { perspective: 800, transformStyle: 'preserve-3d' });
    gsap.set(allLines, { overflow: 'hidden', display: 'block' });

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      scrollTrigger: {
        trigger: headingRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    const lineGap = 0.22; // stagger between lines

    const animateSplit = (split: SplitType | null, startAt = 0) => {
      if (!split) return;
      const lines = split.lines || [];
      lines.forEach((lineEl, i) => {
        const words = Array.from(lineEl.querySelectorAll('.word')) as HTMLElement[];
        const chars = Array.from(lineEl.querySelectorAll('.char')) as HTMLElement[];

        // Line slide-in from below with scale overshoot + skew relax
        tl.from(
          words,
          {
            yPercent: 120,
            opacity: 0,
            scale: 1.2,
            skewX: 15,
            duration: 1.2,
            ease: 'power3.out',
          },
          startAt + i * lineGap
        )
          .to(
            words,
            {
              skewX: 0,
              scale: 1,
              duration: 0.6,
              ease: 'power2.out',
            },
            startAt + i * lineGap + 0.35
          );

        // Character rotateY cascade overlapping the line motion
        tl.from(
          chars,
          {
            rotateY: 90,
            opacity: 0,
            duration: 0.9,
            transformOrigin: '50% 50% -12px',
            ease: 'back.out(1.7)',
            stagger: { each: 0.012, from: 'start' },
          },
          startAt + i * lineGap + 0.14
        );
      });
    };

    // Animate heading, then paragraph, then CTA with slight offsets
    animateSplit(splitH, 0);
    animateSplit(splitP, 0.55);
    animateSplit(splitA, 1.0);

    // Subtle end flicker per element for a premium finish
    const flicker = (el: HTMLElement | null, at: number) => {
      if (!el) return;
      tl.to(el, { opacity: 0.85, duration: 0.06, ease: 'none' }, at)
        .to(el, { opacity: 1, duration: 0.12, ease: 'none' }, at + 0.08);
    };
    const approxEnd = (split: SplitType | null, startAt: number) => {
      const count = split?.lines?.length ?? 0;
      return startAt + Math.max(count - 1, 0) * lineGap + 1.2;
    };
    flicker(headingRef.current, approxEnd(splitH, 0) + 0.1);
    flicker(paragraphRef.current, approxEnd(splitP, 0.55) + 0.1);
    flicker(ctaRef.current, approxEnd(splitA, 1.0) + 0.1);

    return () => {
      tl.kill();
      splits.forEach((s) => s.revert());
    };
  }, []);
  return (
    <section className="border-t border-border bg-background py-20 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          <h3 ref={headingRef} className="mb-6 text-3xl font-medium text-foreground" style={{ willChange: 'transform, opacity' }}>
            WomanKind is an annual creative grant supporting innovative femtech startups.
          </h3>
          <p ref={paragraphRef} className="mx-auto mb-10 max-w-3xl text-lg text-muted" style={{ willChange: 'transform, opacity' }}>
            Each year, we invest three months of strategic brand development in one company, delivering the brand strategy, visual identity and design support that turns promising startups into fundable, scalable businesses ready to make their mark on women’s healthcare.
          </p>
          <a
            ref={ctaRef}
            style={{ willChange: 'transform, opacity' }}
            href="https://alfacharlie.co/womankind-health-grant"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full border-2 border-foreground px-8 py-3 text-sm font-medium uppercase tracking-wider text-foreground transition-colors duration-300 hover:bg-foreground hover:text-background"
          >
            MORE WOMANKIND GRANT INFO
          </a>
        </div>
      </div>
    </section>
  );
};

export default WomankindGrant;
