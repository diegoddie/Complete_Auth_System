import jwt, { Secret, SignOptions } from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

if (!process.env.JWT_SECRET || !process.env.JWT_REFRESH_SECRET) {
  throw new Error('JWT secrets are not defined in environment variables')
}

const ACCESS_SECRET: Secret = process.env.JWT_SECRET as Secret
const REFRESH_SECRET: Secret = process.env.JWT_REFRESH_SECRET as Secret
const ACCESS_EXPIRES_IN = process.env.ACCESS_TOKEN_EXPIRES_IN || 900
const REFRESH_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN || 604800   

export interface JwtPayload {
    userId: string
    email: string
    role: 'user' | 'admin'
}

const accessSignOptions: SignOptions = {
    expiresIn: Number(ACCESS_EXPIRES_IN),           
}

const refreshSignOptions: SignOptions = {
    expiresIn: Number(REFRESH_EXPIRES_IN),
}

export function generateAccessToken(payload: JwtPayload): string {
    return jwt.sign(payload, ACCESS_SECRET, accessSignOptions) 
}

export function generateRefreshToken(payload: JwtPayload): string {
    return jwt.sign(payload, REFRESH_SECRET, refreshSignOptions) 
}

export function verifyAccessToken(token: string): JwtPayload {
    return jwt.verify(token, ACCESS_SECRET) as JwtPayload
}

export function verifyRefreshToken(token: string): JwtPayload {
    return jwt.verify(token, REFRESH_SECRET) as JwtPayload
}

