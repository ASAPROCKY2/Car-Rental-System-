import jwt from "jsonwebtoken"
import  "dotenv/config"
import { Request, Response, NextFunction } from "express" 

//middleware to check if the user is logged in 
export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        //attaching customer info
        (req as any).customer = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid Token" });
    }
}

export const checkRoles = (requireRole: "admin" | "customer" | "both") => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        const token = authHeader.split(" ")[1];

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
            (req as any).customer = decoded;

            //check for roles
            if (
                typeof decoded === "object" &&
                decoded !== null &&
                "role" in decoded
            ) {
                if (requireRole === "both") {
                    if ((decoded as any).role === "admin" || (decoded as any).role === "customer") {
                        next();
                        return;
                    }
                } else if ((decoded as any).role === requireRole) {
                    next();
                    return;
                }
                res.status(401).json({ message: "Unauthorized" });
                return;
            } else {
                res.status(401).json({ message: "Invalid Token" });
                return;
            }
        } catch (error) {
            res.status(401).json({ message: "Invalid Token" });
        }
    }
}

export const adminRoleAuth = checkRoles("admin");
export const customerRoleAuth = checkRoles("customer");
export const bothRoleAuth = checkRoles("both");











