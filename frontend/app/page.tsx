"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { FaGithub, FaYoutube } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import { logoutService } from "@/services/authService";
import { toast } from "sonner";

export default function Home() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutService();
      toast.success("Logout successful!");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed!");
    } finally {
      logout();
    }
  };

  return (
    <div>
      <div className="text-center max-w-4xl mx-auto space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full mb-8">
          <Button
            variant="outline"
            size="lg"
            className="cursor-pointer w-full bg-gray-600 text-white hover:bg-gray-800 transition-colors duration-300 hover:text-white"
            asChild
          >
            <Link
              href="https://github.com/diegoddie"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto gap-4 flex items-center justify-center"
            >
              <FaGithub />
              <span>See the code on GitHub</span>
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="cursor-pointer w-full bg-red-500 text-white hover:bg-red-700 transition-colors duration-300 hover:text-white"
            asChild
          >
            <Link
              href="https://youtube.com/@yoimdiego"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto gap-4 flex items-center justify-center text-white"
            >
              <FaYoutube />
              <span>See the full tutorial</span>
            </Link>
          </Button>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
          Welcome to the <br className="md:hidden" />
          <span className="text-blue-600">Auth Tutorial</span>
        </h1>
        <p className="text-lg md:text-2xl text-muted-foreground">
          Learn how to build a complete and secure authentication system in
          TypeScript, Node and Express with this step-by-step tutorial.
        </p>

        <div className="flex flex-row items-center justify-center gap-4 mt-8">
          {!user ? (
            <>
              <Button size="lg" className="gap-1 cursor-pointer" asChild>
                <Link href="/login" className="">
                  Login <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-1 cursor-pointer"
                asChild
              >
                <Link href="/register" className="">
                  Register <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Button size="lg" className="gap-1 cursor-pointer" asChild>
                <Link href="/profile" className="">
                  Profile <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="destructive"
                size="lg"
                className="gap-1 cursor-pointer"
                onClick={handleLogout}
              >
                Logout <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
