"use client";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/src/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function MobileGallery() {
  const gallery = [
    "/gallery/1.jpg",
    "/gallery/2.jpg",
    "/gallery/3.jpg",
    "/gallery/4.jpg",
    "/gallery/5.jpg",
    "/gallery/6.jpg",
    "/gallery/7.jpg",
    "/gallery/8.jpg",
    "/gallery/9.jpg",
    "/gallery/10.jpg",
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
    "/gallery/21.jpg",
    "/gallery/22.jpg",
    "/gallery/23.jpg",
    "/gallery/24.jpg",
    "/gallery/25.jpg",
    "/gallery/26.jpg",
    "/gallery/27.jpg",
    "/gallery/28.jpg",
    "/gallery/29.jpg",
    "/gallery/30.jpg",
    "/gallery/31.jpg",
    "/gallery/32.jpg",
  ];
  const imagesRef = useRef([]);
  const containerRef = useRef(null);
  const random = () => {
    return Math.floor(Math.random() * 120);
  };
  const randomDir = () => {
    const n = Math.random() * 1;
    if (n > 0.5) return -1;
    else return 1;
  };
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: `+=${gallery.length * 100 * 2}%`,
        scrub: true,
        pin: true,
        markers: true,
        snap: {
          snapTo: "labels",
          duration: 0.5,
        },
      },
    });
    imagesRef.current.forEach((img, i) => {
      gsap.set(img, { left: `${randomDir() * random()}%`, top: `${randomDir() * random()}%`, opacity: 0 });

      tl.to(img, {
        left: "25%",
        top: "0%",
        opacity: 1,
        scale: 1.8,
      });
      tl.addLabel(`img-${i}`);
    });
  }, []);

  return (
    <>
      <div ref={containerRef} className=" overflow-hidden  min-h-[100svh] flex justify-center items-center flex-col relative">
        {gallery.map((e, i) => {
          return (
            <div
              key={i}
              ref={(el) => (imagesRef.current[i] = el)}
              style={{ willChange: "transform, opacity, scale" }}
              className=" w-1/2 h-screen flex items-center absolute test origin-center"
            >
              <Image src={e} alt="foto" width={800} height={1200} className="photo" />
            </div>
          );
        })}
      </div>
    </>
  );
}
