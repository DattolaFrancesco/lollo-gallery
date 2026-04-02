"use client";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Draggable from "gsap/dist/Draggable";
import InertiaPlugin from "gsap/dist/InertiaPlugin";
import { useEffect, useRef, useState } from "react";
import MemoryForm from "./MemoryForm"

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

export default function DesktopGallery() {
  const containerRef = useRef(null);
  const btnShuffleRef = useRef(null);
   // btn grid alto
  const btnGridRef = useRef(null);
  //timeout btn
  const timeOutBtn = useRef(false);
  const dragRef = useRef([]);
  const ModalRef = useRef(null);
  const [btnGrid, setBtnGrid] = useState("Grid");
  const gridedRef = useRef(false);
  // last photo clicked
  const lastClickedRef = useRef(null);
  // last photo description clicked
  const lastClickedDescriptionRef = useRef(null);
  // modal img active that can mount the component every time that change
  const [activeImage, setActiveImage] = useState(0);
  const randomNumber = () => {
     const zone = Math.random();

    if (zone < 0.3) {
      // 30% delle immagini vicino al centro
      const n = Math.random() * 12; // 0-8
      const direction = Math.random() > 0.5 ? 1 : -1;
      return n * direction;
    } else {
      // 70% distribuite nel resto della pagina
      const n = 12 + Math.random() * 20; // 12-32
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
    images.forEach((e) => {
      e.classList.remove("customWidth");
      const description = e.querySelector("div");
      if (description) description.classList.add("hidden");
      gsap.to(e, {
        x: () => `${randomNumber()}vw`,
        y: () => `${randomNumber()}vh`,
      });
    });
    lastClickedRef.current = null;
    lastClickedDescriptionRef.current = null;
  };
  const openImg = (e) => {
    // put the last clicked photo in a random position
    randomPosition(lastClickedRef.current);
   // checking if the same photo is clicked
    if (e === lastClickedRef.current) return clearScale();
    // current foto as lasct clicked photo ready for the switch
    lastClickedRef.current = e;
    // centered
    gsap.to(e, {
      x: 0,
      y: 0,
    });
    // scaled for a bigger photo
    e.classList.add("customWidth");
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
  const Grid = () => {
    gridedRef.current = !gridedRef.current;
    if (gridedRef.current) dragRef.current.forEach((d) => d.disable());
    else dragRef.current.forEach((d) => d.enable());
    const images = document.querySelectorAll(".imgs");
    const container = containerRef.current;
    const Body = document.querySelector("body");
    setBtnGrid(!btnGrid);
    Body.classList.toggle("overflow-x-hidden");
    //btnGridRef.current.classList.toggle("activeBtn");
    //btnShuffleRef.current.classList.toggle("activeBtn");
    container.classList.toggle("shuffle");
    container.classList.toggle("columns-3");
    container.classList.toggle("gap-0");
    lastClickedRef.current = null;
    lastClickedDescriptionRef.current = null;
    images.forEach((e) => {
      gsap.to(e, { scale: 1 });
      e.classList.toggle("gridCustom");
      e.classList.add("transitionCustom");
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
    images.forEach((e) => {
      e.classList.remove("customWidth");
    });
    randomPosition(lastClickedRef.current);
    // removed previus description
    if (lastClickedDescriptionRef.current) lastClickedDescriptionRef.current.classList.add("hidden");
    lastClickedRef.current = null;
    lastClickedDescriptionRef.current = null;
  };
  useGSAP(
    () => {
      //if (!loaded) return;
      const img = document.querySelectorAll(".imgs");
      gsap.set(img, { x: 0, y: 0, opacity: 1 });

      gsap.to(img, {
        duration: 1.2,
        x: () => `${randomNumber()}vw`,
        y: () => `${randomNumber()}vh`,
        ease: "power1.out",
      });

      dragRef.current = Draggable.create(img, {
        type: "x,y",
        bounds: containerRef.current,
        inertia: true,
        edgeResistance: 0.8,
        onClick() {
          img.forEach((el) => {
            el.classList.remove("customWidth");
          });
          // call a function to scale and center the img
          openImg(this.target);
          // stop click propagation
          this.target.stopPropagation();
        },
               onDragEnd: function() {
    // se si è mosso meno di 8px in totale, trattalo come click
    const distX = Math.abs(this.endX - this.startX);
    const distY = Math.abs(this.endY - this.startY);
    if (distX < 8 && distY < 8) {
      img.forEach((el) => {
            el.classList.remove("customWidth");
          });
          // call a function to scale and center the img
          openImg(this.target);
          // stop click propagation
          this.target.stopPropagation();
    }
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
      className="w-screen min-h-[100svh] bg-black relative  shuffle  "
      onClick={() => {
        clearScale();
      }}
    >
       <div
              className=" flex justify-center  left-[50%]  top-[90%] -translate-1/2  w-[380] min-h-[40] z-999999999999 fixed top-0"
            >
              {/* inizio shuffle  */}
              <div className="bg-white  active:bg-gray-300 hover:bg-gray-200 border-[1px] border-black w-[33%]  flex items-center justify-center flex-col">
                <button
                className="w-full h-full text-xs cursor-pointer "
                  ref={btnShuffleRef}
                      onClick={() => {
                        if(timeOutBtn.current) return
                        if(!gridedRef.current) return
                        Grid();
                        closeModal();
                        btnGridRef.current.classList.remove("activeBtn");
                        btnShuffleRef.current.classList.add("activeBtn");
                        timeOutBtn.current = true;
                         setTimeout(() => {
                           timeOutBtn.current = false;
                         }, 1000);
                      }}
                >
                 SHUFFLE
                </button>
              </div>
              {/* fine shuffle  */}
              {/* inizio logo */}
              <div className="bg-white active:bg-gray-300 hover:bg-gray-200 border-t border-b border-black w-[30%]  flex items-center justify-center flex-col relative">
                <button
                className="w-full h-full cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    if(timeOutBtn.current) return
                    if (gridedRef.current){
                      Grid(); 
                      closeModal();
                    }
                    else shuffle();
                  }}
                >
                  <div className="absolute top-[-62%] right-[-10%] w-full"><MemoryForm/></div>
                </button>
              </div>
              {/* fine logo */}
         {/* inizio shuffle  */}
              <div className="bg-white  active:bg-gray-300 hover:bg-gray-200 border-[1px] border-black w-[33%] flex items-center justify-center flex-col">
                <button
                className="w-full h-full text-xs cursor-pointer"
                  ref={btnGridRef}
                      onClick={() => {
                        if(timeOutBtn.current) return
                        if(gridedRef.current) return
                        Grid();
                        btnGridRef.current.classList.add("activeBtn");
                        btnShuffleRef.current.classList.remove("activeBtn");
                          timeOutBtn.current = true;
                         setTimeout(() => {
                           timeOutBtn.current = false;
                         }, 1000);
                      }}
                >
                 GRID
                </button>
              </div>
              {/* fine shuffle  */}
              <div r className="absolute text-nowrap justify-center flex h-full flex-col  top-[130%] text-white text-[9px]">
              <p className="flex gap-1 tracking-widest"><span> <a target="blank"  href="https://www.instagram.com/lollochef_/">
              <p>SHOT BY LORENZO ACCORDI</p>
              </a></span><span> <a target="blank" href="https://www.instagram.com/francescodattola_/">
              <p>DEVELOPED BY FRANCESCO DATTOLA</p>
              </a></span></p>
              </div>
            </div>
      {
        gallery.map((e, i) => {
          return (
            <div
              key={i}
              data-number={i}
              data-ratio={e.includes("v") ? "vertical" : undefined}
              className=" imgs absolute w-[30vw] sm:w-[22vw] md:w-[20vw] lg:w-[15vw] opacity-0"
              onClick={(e) => {
                openModal(e.currentTarget);
              }}
            >
              <Image
                src={e}
                alt="foto"
                width={450}
                height={300}
                style={{ opacity: 1 }}
                className="relative w-full will-change-[transform,opacity]"
                data-name={e.includes("v") ? "vertical" : undefined}
              />
              <div className=" hidden ">
                <p className="text-white text-customMobile  p-2 text-center font-thin tracking-tight">{descriptionPhotos[activeImage]}</p>
              </div>
            </div>
          );
        })
      }
      <div
        ref={ModalRef}
        onClick={() => {
          closeModal();
        }}
        className="fixed inset-0 bg-black/50 hidden items-center justify-center z-9999999"
      >
        (
        <Image
          src={gallery[activeImage]}
          alt="foto"
          width={1200}
          height={800}
          className={`relative scaleModalVerticalMobile`}
          style={{ opacity: 1 }}
        />
        )<p className="text-white text-customModalMobile p-2 text-center font-thin tracking-tight">{descriptionPhotos[activeImage]}</p>
      </div>
    </div>
  );
}
