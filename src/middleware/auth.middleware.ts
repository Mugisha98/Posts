import { Request, Response, NextFunction } from "express";
import { verifyToken } from "@/utils/token";
import UserModel from "@/resources/user/user.model";
import IToken  from "@/utils/interfaces/token.interface";
import HttpException from "@/utils/exceptions/http.exception";
import jwt from "jsonwebtoken";

const auth = async (
    request: Request,
    response: Response,
    next: NextFunction
    ): Promise<Response | void> => {
    try {
        const bearer = request.headers.authorization;
        if (!bearer || !bearer.startsWith("Bearer ")) {
            return next(new HttpException(401, "Unauthorized"));
        }
        const accessToken = bearer.split("Bearer ")[1].trim();
        try {
            const payload: IToken | jwt.JsonWebTokenError = await verifyToken(accessToken);
            if (payload instanceof jwt.JsonWebTokenError) {
                return next(new HttpException(401, "Unauthorized"));
            }

            const user = await UserModel.findById(payload.id)
            .select("-password") // exclude password
            .exec();

            if (!user) {
                return next(new HttpException(401, "Unauthorized"));
            }
            request.user = user;
            return next();
        } catch (error) {
            return next(new HttpException(401, "Unauthorized"));
        }        
    }catch (error: any) {
        next(new HttpException(400, error.message));
    }
}

export default auth;