import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/AuthContext";
import { checkSession } from "@/lib/actions";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Auth Tutorial | Learn Authentication',
  description: 'A simple app to demonstrate authentication in Next.js',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const res = await checkSession();
  const user = res?.user 
  const accessToken = res?.accessToken;
  return (
    <html lang="en">
        <body
          className={`${inter.className} flex flex-col min-h-screen`}
        >
          <AuthProvider initialUser={user ?? null} initialAccessToken={accessToken ?? null}>
            <Navbar />
              <main className="container flex-1 flex items-center justify-center px-4 mx-auto">
                {children}
              </main>
            <Footer />
            <Toaster />
          </AuthProvider>
        </body>
      </html>
  );
}
