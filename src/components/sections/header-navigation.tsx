"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

const NavLogoIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path d="M30 32V0H22V23.1L16 13.8L10 23.1V0H2V32H10.2L16 22.4L21.8 32H30Z" fill="currentColor" stroke="none"></path>
  </svg>
);

const AlfaCharlieLogotype = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 258 29" fill="currentColor" {...props}>
    <path d="M20.311 28.1102L15.834 14.5052H0.5L13.069 28.1102H20.311Z"></path>
    <path d="M30.4189 0.52832L17.8499 14.1333H33.1849L20.6159 0.52832H30.4189Z"></path>
    <path d="M47.1683 28.1102V0.52832H36.1913V28.1102H47.1683Z"></path>
    <path d="M60.6725 10.7441V0.52832H49.6955V28.1102H60.6725V17.8941L69.6585 28.1102H79.6785L69.4415 16.5921L79.8955 0.52832H69.8755L60.6725 10.7441Z"></path>
    <path d="M96.6453 28.1102V0.52832H85.6683V28.1102H96.6453Z"></path>
    <path d="M129.544 28.1102V17.8942H109.919V28.1102H98.9419V0.52832H109.919V10.7442H129.544V0.52832H140.521V28.1102H129.544Z"></path>
    <path d="M152.023 28.1102V0.52832H141.046V28.1102H152.023Z"></path>
    <path d="M165.748 10.7441V0.52832H154.771V28.1102H165.748V17.8941L174.734 28.1102H184.754L174.517 16.5921L184.971 0.52832H174.951L165.748 10.7441Z"></path>
    <path d="M211.239 28.1102C218.441 28.1102 222.827 24.3122 222.827 17.5102C222.827 10.7842 218.261 6.83423 211.519 6.83423H198.53V28.1102H211.239ZM211.439 17.7622H209.507V13.8042H211.359C212.981 13.8042 213.792 14.5052 213.792 15.7822C213.792 17.0592 212.981 17.7622 211.439 17.7622Z"></path>
    <path d="M198.53 0.52832H211.559C222.467 0.52832 228.697 5.15132 228.697 12.3533C228.697 17.9333 225.432 21.6553 220.465 22.8723V22.9483C226.595 23.9083 229.819 27.6333 229.819 33.3233C229.819 41.5973 222.068 46.5003 211.239 46.5003H198.53V34.9923H211.439C216.486 34.9923 219.819 32.8123 219.819 28.8233C219.819 24.9083 216.406 22.6933 211.359 22.6933H198.53V0.52832Z" transform="translate(0, -18.3899)"></path>
    <path d="M257.5 17.8941V10.7441L244.37 0.52832H233.176L246.305 10.7441V17.8941H233.176V28.1102H244.37V42.5032L249.955 46.4612L255.54 42.5032V28.1102H257.5V17.8941Z"></path>
  </svg>
);

const HamburgerIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 32 15" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path d="M0 1.5H32"></path>
    <path d="M0 13.5H32"></path>
  </svg>
);

const CloseIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path d="M2 2L30 30"></path>
    <path d="M30 2L2 30"></path>
  </svg>
);

export default function HeaderNavigation() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<Array<HTMLLIElement | null>>([]);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      gsap.from(headerRef.current, {
        y: -60,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
      });
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    if (menuRef.current) {
      if (isMenuOpen) {
        const tl = gsap.timeline();
        tl.to(menuRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.7,
          ease: "power4.out",
          pointerEvents: "auto",
        });
        tl.fromTo(
          navLinksRef.current,
          { y: 40, opacity: 0, color: "#fff" },
          {
            y: 0,
            opacity: 1,
            color: "#fbbf24", // amber-400
            stagger: 0.08,
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          "-=0.4"
        );
        tl.from(
          hamburgerRef.current,
          {
            rotation: 90,
            scale: 0.7,
            opacity: 0.5,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.5"
        );
      } else {
        gsap.to(menuRef.current, {
          scale: 0.95,
          opacity: 0,
          duration: 0.5,
          ease: "power4.in",
          pointerEvents: "none",
        });
        gsap.to(navLinksRef.current, {
          y: 40,
          opacity: 0,
          duration: 0.3,
          stagger: 0.05,
          ease: "power1.in",
        });
      }
    }
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/work", label: "Work" },
    { href: "/womankind-health-grant", label: "WomanKind" },
    { href: "/journal", label: "Journal" },
  ];

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ease-in-out ${
          isMenuOpen ? "" : isScrolled ? "bg-background/80 backdrop-blur-sm shadow-sm" : "bg-transparent"
        } ${isScrolled && !isMenuOpen ? "text-foreground" : "text-white"}`}
      >
        <div className="mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-3 items-center h-24">
            <div className="flex items-center gap-4 lg:gap-6 justify-start">
              <Link href="/" aria-label="Home" className="hidden lg:block">
                <NavLogoIcon className="w-8 h-8" />
              </Link>
              <p className="hidden md:block text-xs font-medium uppercase tracking-[0.2em]">Design for WomanKind</p>
            </div>
            <div className="flex justify-center">
              <Link href="/" aria-label="Home">
                <AlfaCharlieLogotype className="h-5 md:h-6" />
              </Link>
            </div>
            <div className="flex items-center gap-4 lg:gap-6 justify-end">
              <p className="hidden md:block text-xs font-medium uppercase tracking-[0.2em]">Women-owned creative agency</p>
              <button
                ref={hamburgerRef}
                onClick={() => setMenuOpen(!isMenuOpen)}
                aria-label="Toggle Menu"
                className="z-50 relative h-8 w-8"
              >
                <span className={`absolute inset-0 transition-opacity duration-300 ${isMenuOpen ? "opacity-0" : "opacity-100"}`}>
                  <HamburgerIcon className={`w-8 h-auto ${isScrolled && !isMenuOpen ? "text-foreground" : "text-white"}`} />
                </span>
                <span className={`absolute inset-0 transition-opacity duration-300 ${isMenuOpen ? "opacity-100" : "opacity-0"}`}>
                  <CloseIcon className="w-8 h-8 text-foreground" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        ref={menuRef}
        className={`fixed inset-0 bg-background z-30 transition-transform duration-500 ease-in-out ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ pointerEvents: isMenuOpen ? "auto" : "none" }}
        onClick={e => {
          if (e.target === menuRef.current) setMenuOpen(false);
        }}
      >
        <div className="mx-auto px-4 sm:px-6 md:px-8 h-full flex flex-col items-center justify-center">
          <nav className="flex flex-col items-center justify-center text-center">
            <ul className="flex flex-col gap-2 md:gap-4 mb-16">
              {navLinks.map((link, i) => (
                <li
                  key={link.href}
                  ref={el => { navLinksRef.current[i] = el; }}
                >
                  <Link href={link.href} onClick={() => setMenuOpen(false)}>
                    <span className="text-4xl md:text-6xl text-amber-400 font-bold uppercase hover:text-primary transition-colors duration-300" style={{opacity: isMenuOpen ? 1 : 0}}>
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="text-center text-foreground">
              <h6 className="text-sm uppercase tracking-wider mb-2">Contact:</h6>
              <a href="mailto:ibrahimnassar870@gmail.com" className="text-3xl md:text-5xl font-light hover:text-primary transition-colors duration-300">
                ibrahimnassar870@gmail.com
              </a>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}