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
  "/gallery/2v.jpg",
  "/gallery/3.jpg",
  "/gallery/4.jpg",
  "/gallery/5.jpg",
  "/gallery/6.jpg",
  "/gallery/7v.jpg",
  "/gallery/8.jpg",
  "/gallery/9.jpg",
  "/gallery/10v.jpg",
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
  "/gallery/24v.jpg",
  "/gallery/25.jpg",
  "/gallery/26.jpg",
  "/gallery/27v.jpg",
  "/gallery/28v.jpg",
  "/gallery/29.jpg",
  "/gallery/30.jpg",
  "/gallery/31.jpg",
  "/gallery/32.jpg",
  "/gallery/33v.webp",
  "/gallery/34v.webp",
  "/gallery/35v.webp",
  "/gallery/36.webp",
  "/gallery/37.webp",
  "/gallery/38.webp",
  "/gallery/39.webp",
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
  "/gallery/53.jpg",
  "/gallery/54.jpg",
];

export default function DesktopGallery() {
  const containerRef = useRef(null);
  const btnShuffleRef = useRef(null);
  const [btnGrid, setBtnGrid] = useState("Grid");
  const [loaded, setLoaded] = useState(false);
  const [lastClicked, setLastClicked] = useState(null);
  const [lastClickedDescription, setLastClickedDescription] = useState(null);
  const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      img.src = src;
      img.onload = () => {
        resolve(src);
        console.log("img caricata");
      };
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
    let n = Math.floor(Math.random() * 37);
    let direction = Math.random();
    while (n < 7) {
      n = Math.floor(Math.random() * 37);
    }
    if (direction > 0.5) return n;
    else return -n;
  };
  const shuffle = () => {
    const images = document.querySelectorAll(".imgs");
    images.forEach((e) => {
      gsap.to(e, {
        scale: 1,
        x: () => `${randomNumber()}vw`,
        y: () => `${randomNumber()}vh`,
      });
    });
  };
  const Grid = () => {
    const images = document.querySelectorAll(".imgs");
    const container = containerRef.current;
    const btnShuffle = btnShuffleRef.current;
    const Body = document.querySelector("body");
    setBtnGrid(!btnGrid);
    Body.classList.toggle("overflow-x-hidden");
    btnShuffle.classList.toggle("hidden");
    container.classList.toggle("shuffle");
    container.classList.toggle("columns-8");
    container.classList.toggle("gap-0");
    images.forEach((e) => {
      e.classList.toggle("gridCustom");
    });
  };
  const clearScale = () => {
    const images = document.querySelectorAll(".imgs");
    images.forEach((e) => {
      gsap.to(e, { scale: 1 });
    });
    gsap.to(lastClicked, {
      x: () => `${randomNumber()}vw`,
      y: () => `${randomNumber()}vh`,
    });
    lastClickedDescription.classList.add("hidden");
    setLastClicked(null);
    setLastClickedDescription(null);
  };
  useGSAP(
    () => {
      if (!loaded) return;
      const img = document.querySelectorAll(".imgs");
      gsap.set(img, { x: 0, y: 0, opacity: 1 });

      gsap.to(img, {
        duration: 1.2,
        x: () => `${randomNumber()}vw`,
        y: () => `${randomNumber()}vh`,
        stagger: 0.09,
        ease: "power1.out",
      });

      Draggable.create(img, {
        type: "x,y",
        bounds: containerRef.current,
        inertia: true,
        edgeResistance: 0.8,
        onClick() {
          img.forEach((el) => {
            gsap.to(el, {
              scale: 1,
            });
          });
        },
      });
    },
    {
      scope: containerRef,
      dependencies: [loaded],
    },
  );
  return (
    <div
      ref={containerRef}
      className="w-screen min-h-screen bg-gray-900 relative  shuffle "
      onClick={() => {
        clearScale();
      }}
    >
      <button
        ref={btnShuffleRef}
        onClick={(e) => {
          e.stopPropagation();
          shuffle();
        }}
        className="text-white  cursor-pointer fixed bottom-[10vh] z-99999999"
      >
        Lollo Gallery
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          Grid();
        }}
        className="text-white  cursor-pointer fixed top-[10vh] z-99999999"
      >
        {btnGrid ? "Grid" : "Shuffle"}
      </button>
      {!loaded && <h1 className="text-red-700">ciao sto caricando...</h1>}
      {gallery.map((e, i) => {
        return (
          <div
            key={i}
            className=" imgs absolute w-[12vw] opacity-0"
            onClick={(e) => {
              setLastClicked(e.currentTarget);
              e.stopPropagation();
              const vertical = e.currentTarget.querySelector("img").dataset.name;
              if (vertical) {
                gsap.to(e.currentTarget, {
                  scale: 2,
                  x: 0,
                  y: 0,
                });
              } else {
                gsap.to(e.currentTarget, {
                  scale: 3,
                  x: 0,
                  y: 0,
                });
              }

              gsap.to(lastClicked, {
                x: () => `${randomNumber()}vw`,
                y: () => `${randomNumber()}vh`,
              });
              const description = e.currentTarget.querySelector("div");
              setLastClickedDescription(description);
              description.classList.remove("hidden");
              lastClickedDescription.classList.add("hidden");
            }}
          >
            <Image src={e} alt="foto" width={800} height={1200} className="relative" data-name={e.includes("v") ? "vertical" : undefined} />
            <div className=" hidden ">
              <p className="text-yellow-400 text-[0.4vw] bg-blue-700 ">descrixione cmdcsmkskmmkmcsmklcl;dl;dlm; bla bla bla</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
