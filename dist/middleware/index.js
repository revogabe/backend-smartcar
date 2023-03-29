import { decodeToken } from '../services/auth.js'
export default function authMiddleware(req, res, next) {
  const token = req.headers.authorization
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
// # sourceMappingURL=index.js.map
