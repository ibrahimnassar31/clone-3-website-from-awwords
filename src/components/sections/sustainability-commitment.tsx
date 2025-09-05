"use client";

import Image from 'next/image';
import { useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

const SustainabilityCommitment = () => {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const descRef = useRef<HTMLHeadingElement | null>(null);

  const IMG_SRC =
    'https://cdn.sanity.io/images/yy4n24b1/production/0c327eff46d04641750a5af1186649e9a83bd6fa-2484x1428.jpg';

  const rows = 5;
  const cols = 8;

  const tiles = useMemo(() => {
    const list: Array<{
      key: string;
      top: string;
      left: string;
      width: string;
      height: string;
      bgPos: string;
      bgSize: string;
    }> = [];
    const w = 100 / cols;
    const h = 100 / rows;
    const bgSize = `${cols * 100}% ${rows * 100}%`;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const key = `${r}-${c}`;
        const top = `${r * h}%`;
        const left = `${c * w}%`;
        const width = `${w}%`;
        const height = `${h}%`;
        const px = cols > 1 ? (c / (cols - 1)) * 100 : 0;
        const py = rows > 1 ? (r / (rows - 1)) * 100 : 0;
        const bgPos = `${px}% ${py}%`;
        list.push({ key, top, left, width, height, bgPos, bgSize });
      }
    }
    return list;
  }, [rows, cols]);

  // Premium masked text reveal for the headings
  useEffect(() => {
    const splits: SplitType[] = [];

    const animateMaskedText = (el: HTMLElement | null) => {
      if (!el) return;
      const split = new SplitType(el, { types: 'lines,words,chars' });
      splits.push(split);

      const lines = split.lines || [];
      const chars = split.chars || [];

      gsap.set(lines, {
        overflow: 'hidden',
        clipPath: 'inset(0% 100% 0% 0%)',
      });

      gsap.set(chars, {
        y: 30,
        autoAlpha: 0,
        filter: 'blur(10px)',
        color: '#ff4d4d',
        willChange: 'transform, opacity, filter, color',
      });

      const tl = gsap.timeline({
        defaults: { ease: 'power4.out' },
        scrollTrigger: {
          trigger: el,
          start: 'top 75%',
          toggleActions: 'play none none none',
          once: true,
        },
      });

      const lineDelay = 0.2;
      lines.forEach((line, i) => {
        const lineChars = Array.from(line.querySelectorAll('.char')) as HTMLElement[];

        tl.to(
          line,
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.8,
            ease: 'power4.out',
          },
          i * lineDelay
        );

        tl.to(
          lineChars,
          {
            y: 0,
            autoAlpha: 1,
            filter: 'blur(0px)',
            color: '#000000',
            duration: 1.0,
            ease: 'back.out(1.7)',
            stagger: 0.015,
          },
          i * lineDelay + 0.12
        );
      });
    };

    animateMaskedText(titleRef.current);
    animateMaskedText(descRef.current);

    return () => {
      splits.forEach((s) => s.revert());
    };
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;
    const ctx = gsap.context(() => {
      const tiles = gsap.utils.toArray<HTMLElement>('.img-tile');
      gsap.set(tiles, { transformOrigin: '50% 50%', willChange: 'transform, opacity' });

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top top',
          toggleActions: 'play none none none',
        },
      });

      tl.fromTo(
        tiles,
        { scale: 0.8, rotate: -15, autoAlpha: 0 },
        {
          scale: 1.05,
          rotate: 0,
          autoAlpha: 1,
          duration: 1.2,
          stagger: { each: 0.06, grid: [rows, cols], from: 'center' },
        }
      ).to(
        tiles,
        {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
          stagger: { each: 0.06, grid: [rows, cols], from: 'center' },
        },
        '>-0.2'
      );
    }, gridRef);

    return () => ctx.revert();
  }, [rows, cols]);

  return (
    <section className="bg-background py-20 lg:py-32">
      <div className="container">
        <div className="flex flex-col items-center gap-12 lg:gap-16">
          <h2 ref={titleRef} className="text-4xl font-medium text-center text-foreground" style={{ willChange: 'transform, opacity, filter' }}>
            Design 1% better.
          </h2>
          <figure className="relative w-full aspect-[2484/1428] rounded-xl overflow-hidden">
            {/* Base image for SEO/paint; tiles animate above */}
            <Image
              src={IMG_SRC}
              alt="Artistic representation of environmental commitment"
              fill
              className="object-cover"
            />
            <div ref={gridRef} aria-hidden className="pointer-events-none absolute inset-0">
              {tiles.map((t) => (
                <div
                  key={t.key}
                  className="img-tile absolute"
                  style={{
                    top: t.top,
                    left: t.left,
                    width: t.width,
                    height: t.height,
                    backgroundImage: `url(${IMG_SRC})`,
                    backgroundSize: t.bgSize,
                    backgroundPosition: t.bgPos,
                    backgroundRepeat: 'no-repeat',
                  }}
                />
              ))}
            </div>
          </figure>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 items-start w-full max-w-7xl mx-auto">
            <div className="lg:col-span-2 text-left">
              <h2 ref={descRef} className="text-2xl md:text-[32px] leading-tight font-normal text-foreground" style={{ willChange: 'transform, opacity, filter' }}>
                We’re proud members of{' '}
                <a
                  href="https://www.onepercentfortheplanet.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline hover:opacity-80 transition-opacity"
                >
                  1% for the Planet
                </a>
                , committing 1% of our gross revenue each year to{' '}
                <a
                  href="https://womensearthalliance.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline hover:opacity-80 transition-opacity"
                >
                  Women’s Earth Alliance
                </a>
                . WEA supports grassroots women leaders on the frontlines of
                climate action, providing them with training, funding, and
                networks of support to protect their communities and our
                planet. Together, we’re investing in long-term solutions that
                create a ripple effect—benefiting women, their communities, and
                future generations.
              </h2>
            </div>
            <div className="lg:col-span-1 flex flex-col items-center lg:items-end justify-start gap-10 w-full">
              <a
                href="https://womensearthalliance.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-80"
              >
                <Image
                  src="https://cdn.sanity.io/images/yy4n24b1/production/f94f6ad286ae11e64d037b3c208394b828283073-356x138.png"
                  alt="Women's Earth Alliance logo"
                  width={178}
                  height={69}
                  className="h-auto w-auto"
                />
              </a>
              <a
                href="https://www.onepercentfortheplanet.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-80"
              >
                <Image
                  src="https://cdn.sanity.io/images/yy4n24b1/production/c5f35cacf14b537ce3acc67a87e5d76068206b99-356x138.png"
                  alt="1% for the Planet logo"
                  width={178}
                  height={69}
                  className="h-auto w-auto"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SustainabilityCommitment;
