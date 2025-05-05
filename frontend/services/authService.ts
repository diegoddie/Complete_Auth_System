import axios from "axios";

export const logoutService = async () => {
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/logout`,
      {},
      { withCredentials: true }
    );
  } catch (error) {
    console.error("Backend logout failed:", error);
  } 
};


