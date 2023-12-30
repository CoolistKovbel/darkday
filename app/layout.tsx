import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
// import { ThemeProvider } from "@/components/providers/theme-provider";
import AuthProvider from "../components/providers/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RawrXD",
  description: "The place to get your latest thoughts and stuff.",
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
          {/* <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          > */}

          <div className="bg-[#111] m-h-[100vh] ">
            <div className="m-w-[1536px] mx-auto p-8 h-full text-white">

              <NavBar />
              {children}
              <Footer />

            </div>
          </div>

          {/* </ThemeProvider> */}
        </AuthProvider>
      </body>
    </html>
  );
}
