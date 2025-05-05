"use client";
import ProfileCard from "@/components/ProfileCard";
import { useAuth } from "@/context/AuthContext";
import { getProfileService } from "@/services/userService";
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
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full mx-auto max-w-md">
      <ProfileCard user={user} />
    </div>
  );
}
