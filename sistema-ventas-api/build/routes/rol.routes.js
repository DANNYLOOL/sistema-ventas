"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validator_check_1 = require("../middlewares/validator.check");
const jwt_check_1 = require("../middlewares/jwt.check");
const rol_controller_1 = require("../controllers/rol.controller");
class IndexRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        /**
         * @swagger
         * /api/roles:
         *  get:
         *    tags: ["Roles"]
         *    summary: Obtener todos los roles
         *    description: Retorna una lista de todos los roles de la base de datos.
         *    produces:
         *      - application/json
         *    responses:
         *      200:
         *        description: Exitoso
         */
        this.router.get('/roles', [validator_check_1.validate, jwt_check_1.jwtCheck], rol_controller_1.rolController.getRoles);
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
