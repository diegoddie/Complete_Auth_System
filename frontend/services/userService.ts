import axios from "axios";
import { User } from "@/context/AuthContext";

export interface ProfileResult {
  user: User;
  newAccessToken?: string;
}

export interface AdminDashboard {
  totalUsers: number;
  users: User[];
  newAccessToken?: string;
}

export const getProfileService = async (
  accessToken: string | null
): Promise<ProfileResult | null> => {
  if (!accessToken) {
    console.error("getProfileService: No access token provided.");
    return null;
  }

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/profile`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      }
    );

    return { user: response.data.user };
  } catch (error: any) {
    if (error.response?.status === 401) {
      console.log("getProfileService: 401 error, refreshing token");
      try {
        const refreshResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = refreshResponse.data.accessToken;
        console.log("getProfileService: newAccessToken:", newAccessToken);

        const retryResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/profile`,
          {
            headers: {
              Authorization: `Bearer ${newAccessToken}`,
            },
            withCredentials: true,
          }
        );

        return {
          user: retryResponse.data.user,
          newAccessToken,
        };
      } catch (refreshError: any) {
        console.error("getProfileService: Refresh token failed", refreshError.response?.data || refreshError.message);
        return null;
      }
    }

    console.error("getProfileService: Request failed", error.response?.data || error.message);
    return null;
  }
};

export const getAdminDashboard = async (
  accessToken: string | null
): Promise<AdminDashboard | null> => {
  if (!accessToken) {
    console.error("getAdminDashboard: No access token provided.");
    return null;
  }

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/dashboard`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      }
    );

    return response.data as AdminDashboard;
  } catch (error: any) {
    if (error.response?.status === 401) {
      try {
        const refreshResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = refreshResponse.data.accessToken;

        const retryResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/dashboard`,
          {
            headers: {
              Authorization: `Bearer ${newAccessToken}`,
            },
            withCredentials: true,
          }
        );

        return {
          ...retryResponse.data,
          newAccessToken,
        };
      } catch (refreshError: any) {
        console.error("getAdminDashboard: Refresh token failed", refreshError.response?.data || refreshError.message);
        return null;
      }
    }

    console.error("getAdminDashboard: Request failed", error.response?.data || error.message);
    return null;
  }
};
