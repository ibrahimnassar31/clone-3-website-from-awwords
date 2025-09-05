'use client';

import * as React from 'react';
import * as PIXI from 'pixi.js';
import Delaunator from 'delaunator';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type TrianglesImageProps = {
  src: string;
  width: number;
  height: number;
  explode?: number;
  cols?: number;
  rows?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
  autoplay?: boolean;         
  once?: boolean;             
  scrub?: boolean;            
  start?: string;             
  end?: string;               
};

export default function TrianglesImage({
  src,
  width,
  height,
  explode = 200,
  cols = 48,
  rows = 32,
  duration = 1.6,
  className,
  style,
  autoplay = false,           
  once = true,                
  scrub = false,              
  start = 'top 80%',
  end = 'bottom 60%',
}: TrianglesImageProps) {
  const hostRef = React.useRef<HTMLDivElement | null>(null);
  const appRef = React.useRef<PIXI.Application | null>(null);
  const meshRef = React.useRef<PIXI.Mesh | null>(null);
  const finalPosRef = React.useRef<Float32Array | null>(null);
  const startPosRef = React.useRef<Float32Array | null>(null);
  const indicesRef = React.useRef<Uint32Array | Uint16Array | null>(null);
  const tlRef = React.useRef<gsap.core.Timeline | null>(null);
  const stRef = React.useRef<ScrollTrigger | null>(null);

  React.useEffect(() => {
    if (!hostRef.current) return;

    const app = new PIXI.Application({
      width,
      height,
      backgroundAlpha: 0,
      antialias: true,
      resolution: Math.min(window.devicePixelRatio || 1, 2),
      autoDensity: true,
    });
    appRef.current = app;
    hostRef.current.appendChild(app.view as HTMLCanvasElement);

    let cancelled = false;

    (async () => {
      const baseTexture = await PIXI.Assets.load<PIXI.BaseTexture>(src);
      if (cancelled) return;

      const texture = new PIXI.Texture(baseTexture);

      const pts: [number, number][] = [];
      for (let y = 0; y <= rows; y++) {
        for (let x = 0; x <= cols; x++) {
          pts.push([ (x / cols) * width, (y / rows) * height ]);
        }
      }
      const dela = Delaunator.from(pts);
      const indices = dela.triangles;
      indicesRef.current = new (indices.length > 65535 ? Uint32Array : Uint16Array)(indices);

      const positions = new Float32Array(pts.flat());
      const uvs = new Float32Array(pts.map(([x, y]) => [x / width, y / height]).flat());

      const finalPos = positions.slice();
      finalPosRef.current = finalPos;

      for (let i = 0; i < indices.length; i += 3) {
        const a = indices[i], b = indices[i + 1], c = indices[i + 2];
        const theta = Math.random() * Math.PI * 2;
        const dist = (0.35 + Math.random()) * explode;
        const dx = Math.cos(theta) * dist;
        const dy = Math.sin(theta) * dist;
        positions[a * 2] += dx; positions[a * 2 + 1] += dy;
        positions[b * 2] += dx; positions[b * 2 + 1] += dy;
        positions[c * 2] += dx; positions[c * 2 + 1] += dy;
      }
      const startPos = positions.slice();
      startPosRef.current = startPos;

      const geometry = new PIXI.Geometry()
        .addAttribute('aVertexPosition', positions, 2)
        .addAttribute('aTextureCoord', uvs, 2)
        geometry.addIndex(Array.from(indicesRef.current!));

      const material = new PIXI.MeshMaterial(texture);
      const mesh = new PIXI.Mesh(geometry, material);
      meshRef.current = mesh;
      app.stage.addChild(mesh);

      const triCount = indices.length / 3;
      const tl = gsap.timeline({ paused: true });
      tlRef.current = tl;

      for (let t = 0; t < triCount; t++) {
        const i0 = indices[t * 3 + 0];
        const i1 = indices[t * 3 + 1];
        const i2 = indices[t * 3 + 2];
        const obj = { p: 0 };
        tl.to(obj, {
          p: 1,
          duration: duration * (0.6 + Math.random() * 0.6),
          ease: 'power3.out',
          delay: (t % (cols + 1)) * 0.002 + Math.floor(t / (cols + 1)) * 0.001,
          onUpdate: () => {
            const p = obj.p;
            const apply = (idx: number) => {
              const sx = startPos[idx * 2], sy = startPos[idx * 2 + 1];
              const fx = finalPos[idx * 2], fy = finalPos[idx * 2 + 1];
              positions[idx * 2]     = sx + (fx - sx) * p;
              positions[idx * 2 + 1] = sy + (fy - sy) * p;
            };
            apply(i0); apply(i1); apply(i2);
            mesh.geometry.getBuffer('aVertexPosition').update();
          }
        }, 0);
      }

      if (autoplay) tl.play(0);

      if (hostRef.current) {
        stRef.current = ScrollTrigger.create({
          trigger: hostRef.current,
          start,
          end,
          scrub: scrub ? true : false,
          onEnter: () => {
            if (once) {
              tl.play(0);
            } else {
              tl.play();
            }
          },
          onLeaveBack: () => {
            if (!once) {
              tl.reverse();
            }
          },
          onUpdate: scrub
            ? (self) => tl.progress(self.progress)
            : undefined,
        });
      }
    })();

    return () => {
      cancelled = true;
      stRef.current?.kill();
      tlRef.current?.kill();
      if (appRef.current) {
        appRef.current.destroy(true, { children: true, texture: true, baseTexture: true });
        appRef.current = null;
      }
      meshRef.current = null;
      finalPosRef.current = null;
      startPosRef.current = null;
      indicesRef.current = null;
      if (hostRef.current?.firstChild) {
        hostRef.current.removeChild(hostRef.current.firstChild);
      }
    };
  }, [src, width, height, explode, cols, rows, duration, autoplay, once, scrub, start, end]);

  return (
    <div
      ref={hostRef}
      className={className}
      style={{
        width: '100%',
        maxWidth: width,
        aspectRatio: `${width} / ${height}`,
        ...style,
      }}
    />
  );
}
