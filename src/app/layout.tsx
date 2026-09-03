import type { Metadata } from "next";
import { Playfair_Display, Poppins, Roboto } from "next/font/google";
import localFont from "next/font/local";
import { MotionConfig } from "framer-motion";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const visionFont = localFont({
  src: "../../public/fonts/tt0627m_.ttf",
  variable: "--font-vision",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vision Media & Entertainment - Premier Event Management & Wedding Planning Services",
  description:
    "Vision Media Entertainment offers comprehensive event management, wedding planning, furniture & decor, and hospitality services. Creating exceptional experiences with professional excellence.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${playfair.variable} ${poppins.variable} ${roboto.variable} ${visionFont.variable}`}
    >
      <body className="flex min-h-screen flex-col antialiased overflow-x-hidden">
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </body>
    </html>
  );
}
