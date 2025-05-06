import axios from "axios";

export const logoutService = async () => {
  try {
    await axios.post(
      `/api/auth/logout`,
      {},
      { withCredentials: true }
    );
  } catch (error) {
    console.error("Backend logout failed:", error);
  } 
};


