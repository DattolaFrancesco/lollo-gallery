"use client";
import styles from "./page.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import RecallMemoryFormWhite from "./components/RecallMemoryFormWhite";
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
  useGSAP(() => {
    const blocks = document.querySelectorAll(".block");
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
  });

  return (
    <>
      <div className="gallery flex flex-col justify-center items-center">
        <RecallMemoryFormWhite width="35vw" height="50vh" className="max-h-[450px] z-999" />
        <button
          className="mt-2 px-2 bg-white hover:bg-gray-300 cursor-pointer z-[999]"
          onClick={() => {
            console.log("ciao");
            router.push("/gallery");
          }}
        >
          Show Gallery
        </button>
        {gallery.map((e, i) => {
          return (
            <div key={e} className={`block block-${i}`}>
              <Image src={e} alt="foto" width={800} height={600} />
            </div>
          );
        })}
      </div>
    </>
  );
}
