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
    const dx = 50;
    const sx = -50;
    imagesRef.current.forEach((img, i) => {
      let position;
      if (i % 2 === 0) position = dx;
      else position = sx;
      const photo = img.querySelector(".photo");
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: img,
          start: "top 100%",
          end: "bottom 0%",
          scrub: 0.5,
        },
      });
      tl.from(img, {
        xPercent: position,
        opacity: 0.1,
        scale: 0.2,
      });
      tl.to(img, {
        xPercent: 0,
        opacity: 1,
        scale: 1.2,
      });
      tl.to(img, {
        xPercent: -position,
        opacity: 0.1,
        scale: 0.2,
      });

      // gsap.set(img, {
      //   xPercent: 100,
      //   opacity: 0.6,
      //   scale: 0.2,
      // });
      // gsap.to(img, {
      //   xPercent: -150,
      //   opacity: 1,
      //   scale: 1.2,
      //   scrollTrigger: {
      //     trigger: photo,
      //     start: "top 150%",
      //     end: "bottom bottom", // piccolo tratto di scroll per completare
      //     scrub: 4, // anima lentamente legata allo scroll
      //   },
      // });
    });
  }, []);
  return (
    <div ref={containerRef} className="bg-lime-900 min-h-[100svh] flex justify-center items-center flex-col overflow-hidden">
      {Array.from({ length: 10 }).map((e, i) => {
        return (
          <div
            ref={(el) => (imagesRef.current[i] = el)}
            style={{ willChange: "transform, opacity, scale" }}
            className=" w-1/2 min-h-[100svh] flex items-center "
          >
            <Image src="/bigbang.jpg" alt="foto" width={800} height={1200} className="photo" />
          </div>
        );
      })}
    </div>
  );
}
