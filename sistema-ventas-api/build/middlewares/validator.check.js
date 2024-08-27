"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const express_validator_1 = require("express-validator");
const validate = (req, res, next) => {
    console.log("Init Middleware :: validator.check");
    // Se obtiene los error a partir del request original de la petición
    const errors = (0, express_validator_1.validationResult)(req);
    // Si no existen errores la petición continua
    if (errors.isEmpty())
        return next();
    // Se devuelven los errores con un estado dee petición 400
    return res.status(400).json(errors.array());
};
exports.validate = validate;
