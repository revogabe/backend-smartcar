import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function hashPassword(
  password: string,
  salt = 10,
): Promise<string> {
  return await bcrypt.hash(password, salt)
}

export async function comparePasswords(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword)
}

export function generateToken(payload: any): string {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: 10800000, // expires in 3 hours
  })
}

export function decodeToken(token: string): any {
  return jwt.verify(token, process.env.JWT_SECRET_KEY)
}
