import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata = {
  title: "Notes App - Capture Your Thoughts",
  description: "A modern notes application built with Next.js, MongoDB, and Tailwind CSS. Create, read, update, and delete notes with ease.",
  keywords: ["notes", "todo", "productivity", "next.js", "mongodb"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
