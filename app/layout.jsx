import "./globals.css";
import { Roboto } from "next/font/google";

const roboto = Roboto({ subsets: ["latin"], weight: "400" });
import { GeistSans } from "geist/font/sans"; // import font

export const metadata = {
  title: "Weight Wise",
  description: "Numerical Methods Final Project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
