"use client";
import MobileGallery from "./MobileGallery";
import DesktopGallery from "./DesktopGallery";
import { useState, useEffect } from "react";

export default function Switcher() {
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1200);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile === null) return;
  return isMobile ? <MobileGallery /> : <DesktopGallery />;
}
