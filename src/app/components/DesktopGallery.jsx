"use client";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Draggable from "gsap/dist/Draggable";
import InertiaPlugin from "gsap/dist/InertiaPlugin";
import { useEffect, useRef, useState } from "react";

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
  const [loaded, setLoaded] = useState(false);
  const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      img.src = src;
      img.onload = () => resolve(src);
      img.onerror = () => reject(src);
    });
  };
  const preloadImages = async (images) => {
    const promises = images.map((src) => loadImage(src));
    await Promise.all(promises);
  };
  useEffect(() => {
    const init = async () => {
      await preloadImages(gallery);
      setLoaded(true);
    };

    init();
  }, []);
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
      if (!loaded) return;
      const img = document.querySelectorAll(".imgs");
      gsap.set(img, { opacity: 0, x: 0, y: 0 });

      gsap.to(img, {
        duration: 1.2,
        opacity: 1,
        x: () => `${randomNumber()}vw`,
        y: () => `${randomNumber()}vh`,
        stagger: 0.1,
        ease: "power1.out",
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
    { scope: containerRef, dependencies: [loaded] },
  );
  return (
    <div
      ref={containerRef}
      className="w-screen h-screen bg-gray-900 relative overflow-hidden d-flex justify-center items-center"
      onClick={() => {
        clearScale();
      }}
    >
      {!loaded && <h1 className="text-red-700">ciao sto caricando...</h1>}
      {loaded &&
        gallery.map((e, i) => {
          return (
            <div
              key={i}
              className=" imgs absolute w-1/12 "
              onClick={(e) => {
                e.stopPropagation();
                gsap.to(e.currentTarget, {
                  scale: 2,
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
