import axios from "axios";
import { cookies } from "next/headers";

export default async function getInitialUser(){
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;
  
    if (!refreshToken) {
       return null;
    }
    const routeHandlerUrl = '/api/auth/refresh';
  
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SITE_URL}${routeHandlerUrl}`,
        {
           headers: {
            Cookie: `refreshToken=${refreshToken}`,
          },
        }
      );
  
      return response.data
  
    } catch (error) {
      // Gestisci errori dalla chiamata al Route Handler
      if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          // L'errore 401/403 finirà qui. Il Route Handler dovrebbe
          // aver già inviato l'istruzione per cancellare il cookie.
          console.error(`[getInitialUser] Axios error calling Route Handler: Status ${status}`);
      } else {
          console.error('[getInitialUser] Generic error calling Route Handler:', error);
      }
      return null; // Ritorna null se la chiamata al handler fallisce
    }
  }