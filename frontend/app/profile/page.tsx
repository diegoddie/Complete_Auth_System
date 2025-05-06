"use client";
import ProfileCard from "@/components/ProfileCard";
import { useAuth } from "@/context/AuthContext";
import { getProfileService } from "@/services/userService";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const { user, accessToken, updateUser, updateAccessToken, logout } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!accessToken || !user) {
        logout();
        return router.replace("/login");
      }
      try {
        const result = await getProfileService(accessToken);
        if (!result) {
          logout();
          return router.replace("/login");
        }
        const { user: newUser, newAccessToken } = result;
        updateUser(newUser);
        if (newAccessToken) {
          updateAccessToken(newAccessToken);
        }
      } catch {
        logout();
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };
  
    fetchProfile();
  }, []);

  if (loading || !user) {
    return <Loader2 className="w-10 h-10 animate-spin" />;
  }

  return (
    <div className="w-full mx-auto max-w-md">
      <ProfileCard user={user} />
    </div>
  );
}
