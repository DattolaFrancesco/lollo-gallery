"use client";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Draggable from "gsap/dist/Draggable";
import { useRef } from "react";

gsap.registerPlugin(Draggable);

export default function DesktopGallery() {
  const imgsRef = useRef([]);
  const containerRef = useRef(null);
  const randomNumber = () => {
    let n = Math.floor(Math.random() * 90);
    while (n < 7) {
      n = Math.floor(Math.random() * 90);
    }
    return n;
  };
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
  useGSAP(() => {
    gsap.set(imgsRef.current, {
      left: "50%",
      top: "50%",
      xPercent: -50,
      yPercent: -50,
    });

    gsap.to(imgsRef.current, {
      duration: 1,
      x: () => `${randomNumber()}%`,
      y: () => `${randomNumber()}%`,
      stagger: 0.05,
      ease: "power2.out",
    });
    Draggable.create(imgsRef.current, {
      type: "x,y",
      bounds: containerRef.current,
    });
  }, []);
  return (
    <div ref={containerRef} className="w-screen h-screen bg-gray-900 relative">
      {gallery.map((e, i) => {
        return (
          <div key={i} ref={(el) => (imgsRef.current[i] = el)} className="absolute w-1/12 ">
            <Image src={e} alt="foto" width={800} height={1200} />
          </div>
        );
      })}
    </div>
  );
}
