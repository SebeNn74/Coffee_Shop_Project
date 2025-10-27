import { Request, Response, NextFunction } from "express";
import { decrypt } from "@/utils/cryptoUtils";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: 'Falta el header authorization' });
    }

    const [scheme, token] = authHeader.split(' ');

    if (scheme !== 'Bearer' || !token) {
        return res.status(401).json({ message: 'Formato de token invalido' });
    }

    if (!decrypt(token)) {
        return res.status(401).json({ message: 'Token Invalido o expirado' });
    }

    next();
}