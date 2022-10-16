// https://thewidlarzgroup.com/nextjs-auth/
// https://khendrikse.netlify.app/blog/nextjs-auth-with-httponly-cookies-incl-refresh/
import axios from 'axios';
import cookie from 'cookie';
import AES from 'crypto-js/aes';
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { headers } = req
  try {
    const { data } = await axios.post(
      `${process.env.SERVER_API}/auth/refresh`,
      undefined,
      {
        headers,
      },
    )

    const serializedCookie = cookie.serialize('refresh_token', data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 60 * 60 * 24,
      sameSite: 'strict',
      path: '/',
      encode: (value) => AES.encrypt(value, process.env.ENCRYPT_KEY || '').toString(),
    })

    res.setHeader('Set-Cookie', [serializedCookie]);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
  } catch (error) {
    res.send(error)
  }
}
