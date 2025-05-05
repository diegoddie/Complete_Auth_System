"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useAuth } from "@/context/AuthContext";
import { logoutService } from "@/services/authService";
import { useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { toast } from "sonner";

function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logoutService();
      toast.success("Logout successful!");
      router.push("/");
    } catch (error) {
      console.error("Navbar: Logout failed:", error);
      toast.error("Logout failed!");
    } finally {
      logout();
    }
  };

  return (
    <header className="border-b">
      <div className="container px-3 mx-auto flex h-16 items-center justify-between py-4">
        <Link href="/" className="text-2xl font-bold">
          Auth Tutorial
        </Link>
        <div className="flex items-center gap-3">
          {!user ? (
            <>
              <Button variant="outline" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button variant="default" asChild>
                <Link href="/register">Register</Link>
              </Button>
            </>
          ) : (
            <>
              {user.role === "admin" && (
                <Button variant="outline" asChild>
                  <Link href="/admin/dashboard">Admin</Link>
                </Button>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger className="rounded-full bg-blue-100 px-3 py-3 text-sm font-bold hover:bg-blue-300 transition-all duration-300 cursor-pointer">
                  {user.firstName[0]}{user.lastName[0]}
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem className="hover:bg-gray-100 cursor-pointer">
                    <Link href="/profile" className="w-full">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive" onClick={() => handleLogout()} className="cursor-pointer">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
