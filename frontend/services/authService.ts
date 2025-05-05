import axios from "axios";
import { toast } from "sonner";

export const logoutService = async (logoutFn: () => void) => {
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/logout`,
      {},
      { withCredentials: true }
    );
    toast.success("Logout successful!");
  } catch (error) {
    console.error("Backend logout failed:", error);
    toast.error("Logout failed on server, clearing client session anyway.");
  } finally {
    logoutFn();
  }
};
