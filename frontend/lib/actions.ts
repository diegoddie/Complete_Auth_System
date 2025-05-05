'use server';

import axios from "axios";
import { cookies } from "next/headers";
import { User } from '@/context/AuthContext';

type UserAndRefreshToken = {
  user: User | null;
  accessToken: string | null;
};

export async function checkSession(): Promise<UserAndRefreshToken | null> {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken");

  if (!refreshToken) return null;

  try {
    const res = await axios.post(
      "/api/auth/refresh",
      {}, 
      {
        headers: {
          Cookie: `refreshToken=${refreshToken.value}`,
        },
        withCredentials: true,
      }
    );

    if (res.status !== 200) return null;

    return { user: res.data.user, accessToken: res.data.accessToken };
  } catch (error) {
    console.log(error);
    return null;
  }
}
