"use client";
import styles from "./page.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import RecallMemoryFormWhite from "./components/RecallMemoryFormWhite";
import { useRef, useState } from "react";

const gallery = [
  "/gallery/1.jpg",
  "/gallery/3.jpg",
  "/gallery/4.jpg",
  "/gallery/5.jpg",
  "/gallery/6.jpg",
  "/gallery/8.jpg",
  "/gallery/9.jpg",
  "/gallery/11.jpg",
  "/gallery/12.jpg",
  "/gallery/13.jpg",
  "/gallery/14.jpg",
  "/gallery/15.jpg",
  "/gallery/16.jpg",
  "/gallery/17.jpg",
  "/gallery/18.jpg",
  "/gallery/19.jpg",
  "/gallery/20.jpg",
  "/gallery/40.webp",
  "/gallery/41.webp",
  "/gallery/42.webp",
  "/gallery/43.webp",
  "/gallery/44.webp",
  "/gallery/45.webp",
  "/gallery/46.webp",
  "/gallery/47.webp",
  "/gallery/48.webp",
  "/gallery/49.webp",
  "/gallery/50.jpg",
  "/gallery/51.jpg",
  "/gallery/52.jpg",
];

export default function Default() {
  const router = useRouter();
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useGSAP(() => {
    const svgMemory = document.querySelector(".svg");
    const blocks = document.querySelectorAll(".block");

    gsap.to(svgMemory, {
      scale: 1.03,
      repeat: -1,
      repeatDelay: 0.1,
      yoyo: true,
      ease: "power1.inOut",
      opacity: 1,
    });

    gsap.from(".block", 5, {
      scale: 0,
      opacity: 0.3,
      x: "50%",
      y: "50%",
      z: -200,
      stagger: {
        each: 0.25,
        repeat: -1,
        repeatDelay: 0.075 * (blocks.length - 1),
      },
    });

    const onMove = (e) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  });

  return (
    <>
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          mixBlendMode: "difference",
          zIndex: 9999,
          transform: "translate(-50%, -50%)",
          opacity: isHovering ? 1 : 0,
          transition: "opacity 0.2s ease",
        }}
      >
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="35">
  <rect width="100" height="35" rx="17" fill="white"/>
  <text
    x="50"
    y="23"
    textAnchor="middle"
    fontFamily="var(--font-gt-america-mono), 'Courier New', monospace"
    fontSize="15"
    fontWeight="300"
    fill="black"
    letterSpacing="0"
  >
    Gallery
  </text>
</svg>
      </div>

      <div className="gallery flex flex-col justify-center items-center">
        <button
          style={{ cursor: "none" }}
          onClick={() => router.push("/gallery")}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <RecallMemoryFormWhite
            width="35vw"
            height="50vh"
            className="max-h-[450px] z-999 svg opacity-[0.8]"
          />
        </button>

        {gallery.map((e, i) => (
          <div key={e} className={`block block-${i}`}>
            <Image src={e} alt="foto" width={800} height={600} />
          </div>
        ))}
      </div>
    </>
  );
}