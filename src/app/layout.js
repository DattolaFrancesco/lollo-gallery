import localFont from "next/font/local";
import "./globals.css";


const switzer = localFont({
  src: [
    { path: "./fonts/Switzer-Variable.woff2", style: "normal" },
    { path: "./fonts/Switzer-VariableItalic.woff2", style: "italic" },
  ],
  variable: "--font-switzer",
  fallback: ["Arial", "sans-serif"],
});
const gtAmericaMono = localFont({
  src: [
    { path: "./fonts/GT-AMERICA-MONO-LIGHT-TRIAL.woff2", weight: "300", style: "normal" },
  ],
  variable: "--font-gt-america-mono",
  fallback: ["Courier New", "monospace"],
});
export const metadata = {
  title: "MEMORY FORM",
  description: "Lorenzo Accorti discomposed archive, to recall memory form",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased ${gtAmericaMono.variable} bg-black`}>{children}</body>
    </html>
  );
}
