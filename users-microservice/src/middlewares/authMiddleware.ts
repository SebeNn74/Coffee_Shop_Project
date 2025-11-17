import { Request, Response, NextFunction } from "express";
import { verifyToken } from "@/utils/jwtUtils";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {

    const header = req.headers["authorization"];
    if (!header) {
        return res.status(401).json({ message: "Falta el header Authorization" });
    }

    const [scheme, token] = header.split(" ");
    if (scheme !== "Bearer" || !token) {
        return res.status(401).json({ message: "Formato de token inválido" });
    }

    try {
        const decoded = verifyToken(token);
        (req as any).user = decoded; 
        next();
    } catch (e) {
        return res.status(401).json({ message: "Token inválido o expirado" });
    }
}
