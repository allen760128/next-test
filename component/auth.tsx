import { jwtVerify, SignJWT } from "jose";

export const verifyAuth = async (token: string) => {
    const secret = process.env.JWT_SECRET
    try {
        const verified = await jwtVerify(token, new TextEncoder().encode(secret))
        return verified.payload
    } catch (e) {
        throw new Error('your token has expired')
    }
}