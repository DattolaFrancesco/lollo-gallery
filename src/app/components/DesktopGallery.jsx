"use client";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Draggable from "gsap/dist/Draggable";
import InertiaPlugin from "gsap/dist/InertiaPlugin";
import { useEffect, useRef } from "react";

gsap.registerPlugin(Draggable, InertiaPlugin);

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

export default function DesktopGallery() {
  const containerRef = useRef(null);
  const imgsRef = useRef([]);
  const randomNumber = () => {
    let n = Math.floor(Math.random() * 90);
    while (n < 7) {
      n = Math.floor(Math.random() * 90);
    }
    return n;
  };
  const clearScale = () => {
    const images = document.querySelectorAll(".imgs");
    images.forEach((e) => {
      gsap.to(e, { scale: 1 });
    });
  };

  useGSAP(
    () => {
      const img = document.querySelectorAll(".imgs");
      gsap.set(img, {
        xPercent: 0,
        yPercent: 0,
      });

      gsap.to(img, {
        duration: 1,
        x: () => `${randomNumber()}vw`,
        y: () => `${randomNumber()}vh`,
        stagger: 0.09,
        ease: "power1.inOut",
      });

      Draggable.create(img, {
        type: "x,y",
        bounds: containerRef.current,
        inertia: true,
        edgeResistance: 0.8,
        onClick() {
          img.forEach((el) => {
            console.log("ciao");
            gsap.to(el, {
              scale: 1,
            });
          });
        },
      });
    },
    { scope: containerRef },
  );
  return (
    <div
      ref={containerRef}
      className="w-screen h-screen bg-gray-900 relative overflow-hidden d-flex justify-center items-center"
      onClick={() => {
        clearScale();
      }}
    >
      {gallery.map((e, i) => {
        return (
          <div
            key={i}
            className=" imgs absolute w-1/12 "
            onClick={(e) => {
              e.stopPropagation();
              gsap.to(e.currentTarget, {
                scale: 5,
              });
            }}
          >
            <Image src={e} alt="foto" width={800} height={1200} />
          </div>
        );
      })}
    </div>
  );
}
