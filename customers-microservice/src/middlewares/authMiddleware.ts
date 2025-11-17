import jwt, { JwtPayload } from "jsonwebtoken";

export const authMiddleware = (req: any, res: any, next: any) => {
    try {
        const token = req.headers["authorization"]?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ error: "Token missing" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

        if (!decoded || typeof decoded !== "object" || !decoded.id || !decoded.email) {
            return res.status(401).json({ error: "Invalid token payload" });
        }

        req.user = {
            id: decoded.id,
            email: decoded.email
        };

        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};
