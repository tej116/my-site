// src/app/layout.js
import { Suspense } from "react";
import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ["300", "400", "600", "700"] 
});

export const metadata = {
  title: "Tejas More | Portfolio",
  description: "Full Stack Developer Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <Suspense>
      <html lang="en">
        <body className={poppins.className}>{children}</body>
      </html>
    </Suspense>
  );
}