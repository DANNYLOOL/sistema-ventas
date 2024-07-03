import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const jwtCheck = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = <string>req.headers["auth"];
        // TODO: Obtener la información del token
        //let payload = 

        // TODO: refreshToken

        next();
    } catch (error) {
        return res.status(401).send("Not Authorized");
    }
}