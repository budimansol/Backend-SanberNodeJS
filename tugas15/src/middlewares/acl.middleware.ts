import { Request, Response, NextFunction } from "express";
import { IReqUser } from "@/utils/interface";

export default (roles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const userRoles = (req as IReqUser).user.role;

    // Pastikan userRoles adalah array
    if (!Array.isArray(userRoles)) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    if (!userRoles.some((userRole) => roles.includes(userRole))) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    next();
  };
