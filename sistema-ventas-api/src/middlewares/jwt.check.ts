import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { utils } from "../utils/utils";

export const jwtCheck = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = <string>req.headers["auth"];
        // Obtener la información del token
        let payload = utils.getPayload(token);

        // refreshToken
        const newToken = utils.generateJWT(payload);
        res.setHeader("auth", newToken);

        // Continuar con la petición
        next();
    } catch (error) {
        return res.status(401).send("Not Authorized");
    }
}