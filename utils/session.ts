import Iron from '@hapi/iron'
import { Response, Request } from 'express' // WIP:
import { MAX_AGE, setTokenCookie, getTokenCookie } from './auth-cookies'

const { TOKEN_SECRET } = process.env

export async function setLoginSession(res: Response, session: any) {
  const createdAt = Date.now()
  // Create a session object with a max age that we can validate later
  const obj = { ...session, createdAt, maxAge: MAX_AGE }
  const token = await Iron.seal(obj, TOKEN_SECRET || '', Iron.defaults)

  setTokenCookie(res, token)
}

export async function getLoginSession(req: Request) {
  const token = getTokenCookie(req)

  if (!token) return

  const session = await Iron.unseal(token, TOKEN_SECRET || '', Iron.defaults)
  const expiresAt = session.createdAt + session.maxAge * 1000

  if (Date.now() > expiresAt) {
    throw new Error('Session expired')
  }

  // eslint-disable-next-line consistent-return
  return session
}