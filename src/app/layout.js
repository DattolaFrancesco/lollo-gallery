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
export const metadata = {
  title: "MEMORY FORM",
  description: "Lorenzo Accorti discomposed archive, to recall memory form",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased ${switzer.className} ${switzer.variable} bg-black`}>{children}</body>
    </html>
  );
}
