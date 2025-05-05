import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const refreshToken = request.cookies.get('refreshToken')?.value;

  if (!refreshToken) {
    return NextResponse.json({ user: null, accessToken: null });
  }

  try {
    const backendRes = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/refresh`,
      {},
      {
        headers: {
          Cookie: `refreshToken=${refreshToken}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );

    const newRefreshToken = backendRes.headers['set-cookie']?.find((cookie: string) =>
      cookie.startsWith('refreshToken='));

    const res = NextResponse.json({
      user: backendRes.data.user,
      accessToken: backendRes.data.accessToken,
    });

    if (newRefreshToken) {
      res.headers.set('Set-Cookie', newRefreshToken);
    }

    return res;

  } catch (error: any) {
    console.error('[Route Handler] Error in Axios call:', error);
    return NextResponse.json({ message: 'Error: ' + error.message }, { status: 500 });
  }
}
