import { body } from "express-validator";

export const authRules = () => {
    return [
        body("username").trim()
        .not().isEmpty().withMessage("campo requerido")
        .isLength({ min: 3, max:150 }).withMessage("Rango Incorrecto"),
        body("password").trim()
        .not().isEmpty().withMessage("campo requerido")
        .isLength({ min: 3, max:150 }).withMessage("Rango Incorrecto")
    ]
}