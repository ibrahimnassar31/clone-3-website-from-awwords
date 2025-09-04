"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const heroImages = [
  {
    src: "https://cdn.sanity.io/images/yy4n24b1/production/76cd8fb653ad38c7d9cc6d0922234c4c62071bbc-1200x1712.jpg?w=1200&q=100&auto=format",
    alt: "Menopause Packaging Design with text 'OUT LIKE A LIGHT, ALL NIGHT'",
    width: 1200,
    height: 1712,
  },
  {
    src: "https://cdn.sanity.io/images/yy4n24b1/production/cf9e7dc3633509fab2ad17d00a93a9a3974c4921-1200x1708.jpg?w=1200&q=100&auto=format",
    alt: "Femtech product packaging with text 'BYE BYE, MOOD SWINGS'",
    width: 1200,
    height: 1708,
  },
  {
    src: "https://cdn.sanity.io/images/yy4n24b1/production/bd41efb137d425e7ebd6fcfa2f4725cd7c41d0ec-1200x1714.jpg?w=1200&q=100&auto=format",
    alt: "Nonprofit graphic design showing a stylized poster",
    width: 1200,
    height: 1714,
  },
  {
    src: "https://cdn.sanity.io/images/yy4n24b1/production/9f9d64a6444ca647fdb847102174cc53ede81124-1200x1712.jpg?w=1200&q=100&auto=format",
    alt: "Belle Health PMDD branding on a supplement bottle",
    width: 1200,
    height: 1712,
  },
  {
    src: "https://cdn.sanity.io/images/yy4n24b1/production/991035f41f27cadb297f6c6c3dcf7ad3bdb8cfab-1500x2142.jpg?w=1500&q=100&auto=format",
    alt: "Hoopsy website design displayed on a mobile phone screen",
    width: 1500,
    height: 2142,
  },
];

const animationDuration = 5000; // 5 seconds

type HeroItemProps = {
  item: (typeof heroImages)[0];
  isActive: boolean;
};

const HeroItem = ({ item, isActive }: HeroItemProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isActive) {
      setProgress(0);
      const timer = setTimeout(() => {
        setProgress(100);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setProgress(0);
    }
  }, [isActive]);

  return (
    <div
      className={cn(
        "absolute inset-0 transition-opacity duration-500",
        isActive ? "opacity-100 z-10" : "opacity-0 z-0",
      )}
    >
      <div className="h-full w-full overflow-hidden">
        <div
          className={cn(
            "h-full w-full transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)]",
            isActive ? "translate-y-0" : "translate-y-full",
          )}
        >
          <div className="absolute top-0 left-0 w-full h-0.5 bg-white/30 z-20">
            <div
              className="h-full bg-white"
              style={{
                width: `${progress}%`,
                transition: `width ${animationDuration}ms linear`,
              }}
            />
          </div>
          <div
            className="w-full h-full"
            style={{
              transformStyle: "preserve-3d",
              transform: "perspective(1200px) rotateX(4deg) rotateY(-14deg)",
            }}
          >
            <div
              className={cn(
                "w-full h-full transition-transform duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)]",
                isActive ? "scale-100" : "scale-95",
              )}
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                priority={isActive}
                className="w-full h-full object-cover shadow-2xl rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroImages.length);
    }, animationDuration);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-[#EFEBEB] overflow-hidden flex items-center justify-center sm:justify-end">
      <div className="absolute inset-0 z-0">
        <div className="absolute w-full h-full opacity-70">
          <svg
            viewBox="0 0 1440 900"
            preserveAspectRatio="xMidYMid slice"
            className="w-full h-full"
          >
            <path
              d="M-100 450 C 250 150, 500 650, 800 400 S 1300 50, 1540 400 V 900 H -100 Z"
              fill="#D6C8E9"
            />
            <path
              d="M-100 750 C 350 950, 600 600, 900 750 S 1400 950, 1740 700 V 900 H -100 Z"
              fill="#EADFEF"
            />
          </svg>
        </div>
      </div>

      <div className="relative z-10 mr-0 sm:mr-8 md:mr-16 lg:mr-[15%] w-[clamp(280px,40vw,450px)] aspect-[3/4.2]">
        {heroImages.map((image, index) => (
          <HeroItem key={image.src} item={image} isActive={index === activeIndex} />
        ))}
      </div>
    </section>
  );
}