"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validator_check_1 = require("../middlewares/validator.check");
const jwt_check_1 = require("../middlewares/jwt.check");
const usuario_controller_1 = require("../controllers/usuario.controller");
class IndexRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        /**
         * @swagger
         * /api/usuarios:
         *  get:
         *      tags: ["Usuarios"]
         *      summary: Obtener todos los usuarios
         *      description: Retorna una lista de todos los usuarios de la base de datos.
         *      produces:
         *          - application/json
         *      responses:
         *          200:
         *              description: Exitoso
         */
        this.router.get('/usuarios', [validator_check_1.validate, jwt_check_1.jwtCheck], usuario_controller_1.usuarioController.getUsuarios);
        /**
         * @swagger
         * /api:
         *  post:
         *      tags: ["Usuarios"]
         *      summary: Crear un nuevo usuario
         *      description: Crea un nuevo usuario en la base de datos.
         *      produces:
         *          - application/json
         *      responses:
         *          200:
         *              description: Exitoso
         */
        this.router.post('/usuarios', [validator_check_1.validate, jwt_check_1.jwtCheck], usuario_controller_1.usuarioController.insert);
        /**
         * @swagger
         * /api:
         *  put:
         *      tags: ["Index"]
         *      summary: Default Index
         *      description: Ruta por defecto de la API.
         *      produces:
         *          - application/json
         *      responses:
         *          200:
         *              description: Exitoso
         */
        this.router.put('/usuarios/:id', [validator_check_1.validate, jwt_check_1.jwtCheck], usuario_controller_1.usuarioController.update);
        /**
         * @swagger
         * /api:
         *  delete:
         *      tags: ["Index"]
         *      summary: Eliminar un usuario
         *      description: Elimina un usuario de la base de datos basado en su ID.
         *      produces:
         *          - application/json
         *      responses:
         *          200:
         *              description: Exitoso
         */
        this.router.delete('/usuarios/:id', [validator_check_1.validate, jwt_check_1.jwtCheck], usuario_controller_1.usuarioController.delete);
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
