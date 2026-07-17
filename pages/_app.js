import { Inter, Montserrat } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export default function App({ Component, pageProps }) {
  return (
    <div className={`${inter.variable} ${montserrat.variable} font-sans`}>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}
