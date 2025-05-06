"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { User } from "@/context/AuthContext";
import { getAdminDashboard } from "@/services/userService";
import AdminDashboard from "@/components/AdminDashboard";

interface AdminDashboardData {
  totalUsers: number;
  users: User[];
}

export default function AdminPage() {
  const { accessToken, updateAccessToken, logout, user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<AdminDashboardData | null>(null);

  useEffect(() => {
    const fetchAdminDashboard = async () => {
      if (!accessToken || !user || user.role !== "admin") {
        logout();
        return router.replace("/login");
      }

      try {
        const result = await getAdminDashboard(accessToken);
        if (!result) {
          logout();
          return router.replace("/login");
        }

        const { totalUsers, users, newAccessToken } = result;
        setDashboardData({ totalUsers, users });

        if (newAccessToken) {
          updateAccessToken(newAccessToken);
        }
      } catch (err) {
        console.log(err);
        logout();
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminDashboard();
  }, []);

  if (loading || !dashboardData) {
    return <div>Loading admin dashboard...</div>;
  }

  return (
    <div className="w-full py-10 md:py-0">
      <AdminDashboard users={dashboardData.users} totalUsers={dashboardData.totalUsers} />
    </div>
    
  );
}
