import { GoogleTagManager } from "@next/third-parties/google";
import { Inter, Space_Grotesk } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer";
import ScrollToTop from "./components/helper/scroll-to-top";
import Navbar from "./components/navbar";
import "./css/card.scss";
import "./css/globals.scss";
import ScrollProgress from "./components/helper/scroll-progress";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001";
const siteTitle = "Neha Rai | Software Developer";
const siteDescription =
  "Portfolio of Neha Rai, a Software Developer and B.Tech CSE (AI & ML) graduate from LNCT Bhopal, skilled in Python, MySQL, OpenCV and TensorFlow.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  applicationName: "Neha Rai Portfolio",
  authors: [{ name: "Neha Rai", url: "https://www.linkedin.com/in/neha-rai-06aab0255/" }],
  creator: "Neha Rai",
  keywords: [
    "Neha Rai",
    "Software Developer",
    "Fresher",
    "Python Developer",
    "AI ML",
    "Machine Learning",
    "Computer Vision",
    "OpenCV",
    "TensorFlow",
    "LNCT Bhopal",
    "Portfolio",
  ],
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Neha Rai",
    title: siteTitle,
    description: siteDescription,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#0a0817",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${inter.variable} ${spaceGrotesk.variable} antialiased`}>
        <div className="bg-aurora" aria-hidden="true">
          <div className="blob blob-1" />
          <div className="blob blob-2" />
          <div className="blob blob-3" />
        </div>
        <ToastContainer theme="dark" />
        <ScrollProgress />
        <Navbar />
        <main className="min-h-screen relative mx-auto px-5 sm:px-10 lg:max-w-[70rem] xl:max-w-[76rem] text-[var(--text)]">
          {children}
          <ScrollToTop />
        </main>
        <Footer />
      </body>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />
    </html>
  );
}
