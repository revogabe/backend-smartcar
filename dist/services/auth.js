import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
export async function hashPassword(password, salt = 10) {
  return await bcrypt.hash(password, salt)
}
export async function comparePasswords(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword)
}
export function generateToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: 10800000, // expires in 3 hours
  })
}
export function decodeToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET_KEY)
}
// # sourceMappingURL=auth.js.map
