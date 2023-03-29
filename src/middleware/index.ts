import { Request, Response, NextFunction } from 'express'
import { decodeToken } from '../services/auth.js'

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const token: string | undefined = req.headers.authorization

  if (!token) {
    res.status(401)
    return
  }

  try {
    const decoded = decodeToken(token)
    req = decoded
    next()
  } catch (error) {
    res
      .status(401)
      .json({ auth: false, message: 'Token expirado ou incorreto.' })
  }
}
