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
  // const [loaded, setLoaded] = useState(false);
  const [lastClicked, setLastClicked] = useState(null);
  // const [lastClickedTitle, setLastClickedTitle] = useState(null);
  const [lastClickedDescription, setLastClickedDescription] = useState(null);
  // const loadImage = (src) => {
  //   return new Promise((resolve, reject) => {
  //     const img = new window.Image();
  //     img.src = src;
  //     img.onload = () => resolve(src);
  //     img.onerror = () => reject(src);
  //   });
  // };
  // const preloadImages = async (images) => {
  //   const promises = images.map((src) => loadImage(src));
  //   await Promise.all(promises);
  // };
  // useEffect(() => {
  //   const init = async () => {
  //     await preloadImages(gallery);
  //     setLoaded(true);
  //   };

  //   init();
  // }, []);
  const randomNumber = () => {
    let n = Math.floor(Math.random() * 80);
    while (n < 7) {
      n = Math.floor(Math.random() * 80);
    }
    return n;
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
  const clearScale = () => {
    const images = document.querySelectorAll(".imgs");
    images.forEach((e) => {
      gsap.to(e, { scale: 1 });
    });
    gsap.to(lastClicked, {
      x: () => `${randomNumber()}vw`,
      y: () => `${randomNumber()}vh`,
    });
    // lastClickedTitle.classList.add("hidden");
    lastClickedDescription.classList.add("hidden");
    setLastClicked(null);
    // setLastClickedTitle(null);
    setLastClickedDescription(null);
  };

  useGSAP(
    () => {
      //if (!loaded) return;
      const img = document.querySelectorAll(".imgs");
      gsap.set(img, { x: 0, y: 0 });

      gsap.to(img, {
        duration: 1.2,
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
            gsap.to(el, {
              scale: 1,
            });
          });
        },
      });
    },
    {
      scope: containerRef,
      //dependencies: [loaded]
    },
  );
  return (
    <div
      ref={containerRef}
      className="w-screen h-screen bg-gray-900 relative overflow-hidden "
      onClick={() => {
        clearScale();
      }}
    >
      <button
        onClick={() => {
          shuffle();
        }}
        className="text-white  cursor-pointer -translate-x-1/2 -translate-Y-1/2 absolute bottom-[5vh] left-[50%] z-[99999999]"
      >
        Lollo Gallery
      </button>
      {/* {!loaded && <h1 className="text-red-700">ciao sto caricando...</h1>} */}
      {
        //loaded &&
        gallery.map((e, i) => {
          return (
            <div
              key={i}
              className=" imgs absolute w-1/12  -translate-x-1/2 -translate-Y-1/2 "
              onClick={(e) => {
                setLastClicked(e.currentTarget);
                e.stopPropagation();
                gsap.to(e.currentTarget, {
                  scale: 3,
                  x: window.innerWidth / 2,
                  y: window.innerHeight / 2.5,
                });
                gsap.to(lastClicked, {
                  x: () => `${randomNumber()}vw`,
                  y: () => `${randomNumber()}vh`,
                });
                // const title = e.currentTarget.querySelector("h1");
                const description = e.currentTarget.querySelector("div");
                // setLastClickedTitle(title);
                setLastClickedDescription(description);
                // title.classList.remove("hidden");
                description.classList.remove("hidden");
                // lastClickedTitle.classList.add("hidden");
                lastClickedDescription.classList.add("hidden");
              }}
            >
              {/* <h1 className="text-yellow-400  hidden absolute top-[35%] left-[-50%]">TITOLO</h1> */}
              <Image src={e} alt="foto" width={800} height={1200} className="relative" />
              <div className=" hidden ">
                <p className="text-yellow-400 text-[0.4vw] bg-blue-700 ">descrixione cmdcsmkskmmkmcsmklcl;dl;dlm; bla bla bla</p>
              </div>
            </div>
          );
        })
      }
    </div>
  );
}
