import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import AuthProvider from "../components/providers/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lyub12| BLOg",
  description: "The place to hear my thoughts or maybe share yours?",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <AuthProvider>

          <div className="bg-[#111] m-h-[100vh] ">
            <div className="m-w-[1536px] mx-auto h-full text-white">

              <NavBar />

              <div className="p-6 w-full h-full">
                {children}
              </div>
              
              <Footer />

            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
