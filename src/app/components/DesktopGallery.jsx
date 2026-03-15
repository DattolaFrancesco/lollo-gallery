"use client";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Draggable from "gsap/dist/Draggable";
import InertiaPlugin from "gsap/dist/InertiaPlugin";
import { useEffect, useRef, useState } from "react";
import RecallMemoryForm from "./RecallMemoryForm";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";
import { useRouter } from "next/navigation";

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
const descriptionPhotos = [
  "ZOONTA BRESCIA NOV 2025",
  "DODO BRESCIA NOV 2025",
  "SUPER SILENCED BRESCIA OCT 2023",
  "ERRORE BRESCIA NOV 2025",
  "CARMINE IN FIORE JUL 2023",
  "BARRA1 SOBRIO BERGAMO JUL 2025",
  "SOTTOCASSA CARMINE SEP 2025",
  "KOLPO DELLA SANTAGUERRILLA BRESCIA OCT 2025",
  "UNDER SOUND CARMINE JUL 2024",
  "OMEGA SAFARI BAGNOLO NOV 2022",
  "MAURICIO FLIP OVER CASAZZA SET 2022",
  "SPRITE VILLANUOVA SEP 2022",
  "LIL GREEM RIFLESSO VILLANUOVA SEP 2022",
  "DOYE TEX BRUGHERIO JAN 2025",
  "SLIT TREE AMSTERDAM NOORD APR 2025",
  "DIAGONALE CENTRO AMSTERDAM  APR 2025",
  "DOUBLE EXP ON MY MIND AMSTERDAM NOORD APR 2025",
  "PIRLO CAMPARI CARMINE APR 2024",
  "STILL KIDS CAMERA DI COMMERCIO APR 2024",
  "TIRO LUNGO CARMINE APR 2024",
  "EDEN PULITO CARMINE APR 2024",
  "CLICK & DOYE OCT 2025",
  "PASTA E MANU LEMBRIO JUL 2023",
  "PLAZATI AD ALBENGA JUL 2023",
  "DOUBLE FRONT FLIP ALASSIO JUL 2023",
  "A FUOCO GENOVA JUL 2023",
  "FRANCY FIVE-0 EDEN AUG 2023 ",
  "SESH CALDA FOSSA BAGNI AUG 2023",
  "ALPACA AMSTERDAM NOORD APR 2025",
  "KEBBY T-BAG BAGNOLO APR 2022",
  "BOLO ARGENTO BOLOGNA OCT 2023",
  "ROME STREETZ LOCOMOTIVE BOLOGNA OCT 2023",
  "CHIAVE E MOSCHETTONE BRESCIA NOV 2024",
  "SCORIA CUORE BRESCIA JUL 2024",
  "UNNI CARMINE JAN 2026",
  "BARABBA CARMINE JAN 2026",
  "HEADPIECE BRESCIA JAN 2023",
  "DUE PALAZZI BRESCIA AUG 2024",
  "DUE LAMPIONI BRESCIA AUG 2024",
  "TRIBE CARMINE NOV 2025",
  "LIFFE BB OCT 2025",
  "SANTAGUERILLA BB OCT 2025",
  "CHAINED VILLANUOVA MAR 2023",
  "SISTEMA MOTORIO CARMINE NOV 2025",
  "JESUS PIECE BRESCIA NOV 2025",
  "DOYE BRESCIA NOV 2025",
  "OMEGA SAFARI BAGNOLO NOV 2022",
  "NOTTE BALSAMICA CARMINE JUL 2024",
  "GOVI COI GNARI GENOVA JUL 2023",
  "LIFFE E BARRA TORINO NOV 2025",
  "PASSAGGIO AMSTERDAM NOORD APR 2025",
  "CASA DI VENTO AMSTERDAM NOORD APR 2025",
  "SALOTTO BAGNOLO APR 2022",
  "CARBONE AL DENTE BAGNOLO APR 2022",
];
function LiveClock() {
  const [clockValue, setClockValue] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setClockValue(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Clock
      value={clockValue}
      size={65}
      hourHandLength={45}
      hourHandWidth={2}
      minuteHandLength={70}
      minuteHandWidth={2}
      secondHandLength={90}
      secondHandWidth={1}
      hourHandOppositeLength={10}
      minuteHandOppositeLength={10}
      secondHandOppositeLength={10}
      hourMarksLength={10}
      hourMarksWidth={3}
      minuteMarksLength={6}
      minuteMarksWidth={1}
      renderNumbers={false}
      renderMinuteHand={true}
      renderSecondHand={true}
      renderHourMarks={true}
      renderMinuteMarks={true}
      locale="it-IT"
      useMillisecondPrecision={false}
      className="my-clock"
    />
  );
}
export default function DesktopGallery() {
  const router = useRouter();
  const containerRef = useRef(null);
  // menu
  const menuRef = useRef(null);
  // btn shuffle alto
  const btnShuffleRef = useRef(null);
  // btn grid alto
  const btnGridRef = useRef(null);
  // modale
  const ModalRef = useRef(null);
  // tempo orologio
  // last photo clicked
  const lastClickedRef = useRef(null);
  // last photo description clicked
  const lastClickedDescriptionRef = useRef(null);
  // modal img active that can mount the component every time that change
  const [activeImage, setActiveImage] = useState(0);
  // img ratio
  const [activeImageRatio, setActiveImageRatio] = useState(null);
  const gridedRef = useRef(false);
  const mixArray = (arr1, arr2) => {
    closeModal();
    for (let i = arr1.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr1[i], arr1[j]] = [arr1[j], arr1[i]];
      [arr2[i], arr2[j]] = [arr2[j], arr2[i]];
    }
  };
  const randomNumber = () => {
    const zone = Math.random();

    if (zone < 0.3) {
      // 30% delle immagini vicino al centro
      const n = Math.random() * 12; // 0-8
      const direction = Math.random() > 0.5 ? 1 : -1;
      return n * direction;
    } else {
      // 70% distribuite nel resto della pagina
      const n = 12 + Math.random() * 30; // 12-32
      const direction = Math.random() > 0.5 ? 1 : -1;
      return n * direction;
    }
  };
  const randomPosition = (e) => {
    gsap.to(e, {
      x: () => `${randomNumber()}vw`,
      y: () => `${randomNumber()}vh`,
    });
  };
  const openModal = (e) => {
    if (e.dataset.ratio) {
      ModalRef.current.classList.add("justify-start");
      ModalRef.current.classList.remove("justify-center");
    } else {
      ModalRef.current.classList.remove("justify-start");
      ModalRef.current.classList.add("justify-center");
    }
    setActiveImageRatio(e.dataset.ratio);
    setActiveImage(parseInt(e.dataset.number));
    const modal = ModalRef.current;
    setTimeout(() => {
      modal.classList.remove("hidden");
    }, 150);
    modal.classList.add("flex");
    modal.classList.add("flex-col");
  };
  const closeModal = (e) => {
    const modal = ModalRef.current;
    modal.classList.add("hidden");
  };

  const shuffle = () => {
    const images = document.querySelectorAll(".imgs");
    images.forEach((el) => {
      el.classList.remove("customWidthDesktop");
      el.classList.remove("customWidthDesktopVertical");
      const description = el.querySelector("div");
      if (description) description.classList.add("hidden");
      gsap.to(el, {
        x: () => `${randomNumber()}vw`,
        y: () => `${randomNumber()}vh`,
      });
    });
    // removed previus description
    if (lastClickedDescriptionRef.current) lastClickedDescriptionRef.current.classList.add("hidden");
    lastClickedRef.current = null;
    lastClickedDescriptionRef.current = null;
  };
  const Grid = () => {
    closeModal();
    gridedRef.current = !gridedRef.current;
    const images = document.querySelectorAll(".imgs");
    const container = containerRef.current;
    const Body = document.querySelector("body");
    Body.classList.add("overflow-x-hidden");
    btnGridRef.current.classList.toggle("activeBtn");
    btnShuffleRef.current.classList.toggle("activeBtn");
    container.classList.toggle("shuffle");
    container.classList.toggle("columns-8");
    container.classList.toggle("gap-0");
    // removed previus description
    if (lastClickedDescriptionRef.current) lastClickedDescriptionRef.current.classList.add("hidden");
    lastClickedRef.current = null;
    lastClickedDescriptionRef.current = null;
    images.forEach((e) => {
      e.classList.remove("customWidthDesktop");
      e.classList.remove("customWidthDesktopVertical");
      e.classList.toggle("gridCustom");
      e.classList.toggle("transitionCustom");
      const description = e.querySelector("div");
      if (description) description.classList.add("hidden");
    });
    setTimeout(() => {
      images.forEach((e) => {
        e.classList.remove("transitionCustom");
      });
    }, 1000);
  };
  const clearScale = () => {
    const images = document.querySelectorAll(".imgs");
    images.forEach((el) => {
      el.classList.remove("customWidthDesktop");
      el.classList.remove("customWidthDesktopVertical");
    });
    gsap.to(lastClickedRef.current, {
      x: () => `${randomNumber()}vw`,
      y: () => `${randomNumber()}vh`,
    });
    // removed previus description
    if (lastClickedDescriptionRef.current) lastClickedDescriptionRef.current.classList.add("hidden");
    lastClickedRef.current = null;
    lastClickedDescriptionRef.current = null;
  };
  const openImg = (e) => {
    // check if its in the grid setup
    if (gridedRef.current) return;
    // checking if the same photo is clicked
    if (e === lastClickedRef.current) return clearScale();
    // put the last clicked photo in a random position
    if (lastClickedRef.current) {
      randomPosition(lastClickedRef.current);
    }
    // current foto as lasct clicked photo ready for the switch
    lastClickedRef.current = e;
    // centered
    gsap.to(e, {
      x: 0,
      y: 0,
    });

    // scaled for a bigger photo
    if (e.dataset.ratio) {
      e.classList.add("customWidthDesktopVertical");
    } else {
      e.classList.add("customWidthDesktop");
    }

    // get the current photo description
    const description = e.querySelector("div");
    // removed previus description
    if (lastClickedDescriptionRef.current) lastClickedDescriptionRef.current.classList.add("hidden");
    // added current description
    lastClickedDescriptionRef.current = description;
    // description showed
    description.classList.remove("hidden");
    // active index img
    setActiveImage(parseInt(e.dataset.number));
    // open modal if the grid btn is pressed
    if (gridedRef.current) return openModal(e);
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
        ease: "power1.out",
      });

      Draggable.create(img, {
        type: "x,y",
        bounds: containerRef.current,
        inertia: true,
        edgeResistance: 0.8,
        minimumMovement: 6,
        onClick() {
          img.forEach((el) => {
            el.classList.remove("customWidthDesktop");
            el.classList.remove("customWidthDesktopVertical");
          });
          // call a function to scale and center the img
          openImg(this.target);
        },
      });
    },
    {
      scope: containerRef,
    },
  );
  return (
    <div
      ref={containerRef}
      className="w-screen min-h-screen bg-black relative  shuffle pb-[100] "
      onClick={() => {
        clearScale();
      }}
    >
      <div
        ref={menuRef}
        className=" flex gap-0.5  absolute left-[50%]  top-[90%] -translate-1/2 m-2 w-[600] min-h-[60] z-999999999999 fixed top-0 generic1sTransition"
      >
        {/* logo */}
        <div className=" w-[15%] bg-white hover:bg-gray-200 flex justify-center items-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push("/");
            }}
            className="cursor-pointer"
          >
            <RecallMemoryForm className="w-full h-auto p-1" />
          </button>
        </div>
        {/* fine logo */}
        {/* inizio btn */}
        <div className=" w-[35%] flex flex-col gap-0.5 ">
          <div className="flex justify-between bg-white">
            <p className="text-xs p-1">Visualization</p>
            <div className="flex p-1.5">
              <button
                ref={btnShuffleRef}
                onClick={() => {
                  Grid();
                }}
                className="text-xs text-white hover:bg-gray-300  bg-gray-200 p-1 activeBtn cursor-pointer"
              >
                Shuffle
              </button>
              <button
                ref={btnGridRef}
                onClick={(e) => {
                  e.stopPropagation();
                  Grid();
                }}
                className="text-xs text-white hover:bg-gray-300 bg-gray-200 p-1 cursor-pointer"
              >
                Grid
              </button>
            </div>
          </div>
          <div className="bg-white hover:bg-gray-200">
            <a href="https://www.instagram.com/lollochef_/">
              <p className="text-xs px-1">Archive by Lorenzo Accorti</p>
            </a>
          </div>
          <div className="bg-white hover:bg-gray-200">
            <a href="https://www.instagram.com/francescodattola_/">
              <p className="text-xs px-1">Developed by Francesco Dattola</p>
            </a>
          </div>
        </div>
        {/* fine btn */}
        {/* inizio shuffle */}
        <div className="bg-white hover:bg-gray-200 w-[5%] flex items-center justify-center flex-col">
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (gridedRef.current)
                Grid(); //mixArray(gallery, descriptionPhotos);
              else shuffle();
            }}
            className="-rotate-90 p-1"
          >
            <p className="text-sm text-nowrap cursor-pointer">Shuffle &nbsp;● </p>
          </button>
        </div>
        {/* fine shuffle */}
        {/* inizio descrizione */}
        <div className="w-[30%] bg-white">
          <p className="text-xs p-1">Lorenzo Accorti discomposed archive, to recall memory form. Lorenzo Accorti discomposed archive, to recall memory form.</p>
        </div>
        {/* fine descrizione */}
        <div className="bg-white p-1">
          <LiveClock />
        </div>
      </div>
      {gallery.map((e, i) => {
        return (
          <div
            key={e}
            data-number={i}
            data-ratio={e.includes("v") ? "vertical" : undefined}
            className=" imgs absolute w-[10vw] "
            onClick={(e) => {
              e.stopPropagation();
              if (gridedRef.current) return openModal(e.currentTarget);
            }}
          >
            <Image
              src={e}
              alt="foto"
              width={400}
              height={300}
              className="relative opacity-0 transition-opacity duration-200 w-full"
              loading={i < 6 ? "eager" : "lazy"}
              data-name={e.includes("v") ? "vertical" : undefined}
              onLoad={(e) => e.currentTarget.classList.remove("opacity-0")}
            />
            <div className=" hidden ">
              <p className={`text-white  text-[1.2vw]  p-2 text-center font-thin tracking-tight`}>
                {descriptionPhotos[activeImage]}
                {}
              </p>
            </div>
          </div>
        );
      })}
      <div
        ref={ModalRef}
        onClick={() => {
          closeModal();
        }}
        className="fixed inset-0 bg-black/50 hidden items-center  z-9999999"
      >
        (
        {activeImage !== null && (
          <Image
            src={gallery[activeImage]}
            alt="foto"
            width={800}
            height={1200}
            className={`relative ${activeImageRatio ? "scaleModalVertical" : "scaleModal"}`}
          />
        )}
        )<p className="text-white text-lg  px-2 pt-0 text-center font-thin tracking-tight">{descriptionPhotos[activeImage]}</p>
      </div>
    </div>
  );
}
