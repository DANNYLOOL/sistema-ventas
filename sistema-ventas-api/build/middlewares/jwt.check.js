"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtCheck = void 0;
const utils_1 = require("../utils/utils");
const jwtCheck = (req, res, next) => {
    try {
        const token = req.headers["auth"];
        if (!token) {
            return res.status(401).send("Not Authorized: Token missing");
        }
        // Obtener la información del token
        let payload = utils_1.utils.getPayload(token);
        // refreshToken
        const newToken = utils_1.utils.generateJWT(payload);
        res.setHeader("auth", newToken);
        // Continuar con la petición
        next();
    }
    catch (error) {
        console.error("Error al verificar el token:", error);
        return res.status(401).send("Not Authorized: Invalid token");
    }
};
exports.jwtCheck = jwtCheck;
