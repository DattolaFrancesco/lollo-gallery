"use client";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/src/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const imagesRef = useRef([]);
  const containerRef = useRef(null);
  useGSAP(() => {
    // timeline-------
    const totalScroll = imagesRef.current.length * window.innerHeight * 2;
    const tl = gsap.timeline();

    imagesRef.current.forEach((img, i) => {
      const direction = i % 2 === 0 ? 1 : -1;
      tl.fromTo(
        img,
        { xPercent: 100 * direction, yPercent: -100 * direction, autoAlpha: 0, scale: 0.2 },
        { xPercent: 0, yPercent: 0, autoAlpha: 1, scale: 1.5, duration: 1.5 },
        i * 1.5,
      ).to(img, { xPercent: -100 * direction, yPercent: -100 * direction, autoAlpha: 0, scale: 0.2, duration: 1.5 }, i * 1.5 + 1.5);
    });

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=" + totalScroll,
      scrub: 1,
      pin: true,
      animation: tl,
    });
  }, []);
  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden bg-lime-900 flex items-center justify-center">
      {Array.from({ length: 10 }).map((e, i) => {
        return (
          <div ref={(el) => (imagesRef.current[i] = el)} style={{ willChange: "transform, opacity, scale" }} className=" absolute w-1/2 flex justify-center ">
            <Image src="/bigbang.jpg" alt="foto" width={800} height={1200} className="photo" />
          </div>
        );
      })}
    </div>
  );
}
