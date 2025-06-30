import jwt, { SignOptions } from 'jsonwebtoken';

interface JWTPayload {
    _id: string;
}

const JWT_SECRET = process.env.REFRESH_TOKEN_SECRET;

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
}

const EXPIRES_IN = '1d';

export const generateAccessToken = (payload: JWTPayload): string => {
    const options: SignOptions = {
        expiresIn: EXPIRES_IN,
    };

    return jwt.sign(payload, JWT_SECRET, options);
};
