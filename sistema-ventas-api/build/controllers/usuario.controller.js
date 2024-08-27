"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioController = void 0;
const database_1 = __importDefault(require("../database/database"));
const utils_1 = require("../utils/utils");
class UsuarioController {
    getUsuarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers['auth'];
                const currentUser = utils_1.utils.getPayload(token);
                const usuarios = yield database_1.default.usuario.findMany({
                    where: {
                        cveusuario: {
                            not: currentUser.cveusuario
                        }
                    },
                    include: {
                        rol: true
                    }
                });
                res.json(usuarios);
            }
            catch (error) {
                res.status(500).json({ error: 'Error al obtener usuarios' });
            }
        });
    }
    insert(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nombre, apellido, username, email, rol, password } = req.body;
                // Validar que el usuario no exista
                const userExists = yield database_1.default.usuario.findUnique({
                    where: { username },
                });
                if (userExists) {
                    return res.status(400).json({ message: "El usuario ya existe." });
                }
                // Validar que el email no exista
                const emailExists = yield database_1.default.usuario.findUnique({
                    where: { email },
                });
                if (emailExists) {
                    return res.status(400).json({ message: "El email ya existe." });
                }
                const hashedPassword = yield utils_1.utils.hashPassword(password);
                // Crear el usuario en la base de datos
                const newUser = yield database_1.default.usuario.create({
                    data: {
                        nombre,
                        apellido,
                        username,
                        email,
                        password: hashedPassword.toString(),
                        rol: {
                            connect: rol.map((id) => ({ id }))
                        }
                    },
                });
                return res.status(201).json(newUser);
            }
            catch (error) {
                console.error('Error al crear usuario:', error);
                return res.status(500).json({ message: `Error: ${error.message}` });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { nombre, apellido, rol, password } = req.body;
                // Validar si el usuario existe
                const userExists = yield database_1.default.usuario.findUnique({
                    where: { cveusuario: Number(id) },
                });
                if (!userExists) {
                    return res.status(404).json({ message: "Usuario no encontrado" });
                }
                // Construir el objeto de datos a actualizar
                const updateData = {
                    nombre,
                    apellido,
                    rol: {
                        set: rol.map((id) => ({ id })),
                    },
                };
                // Actualizar solo si se proporcionó un nuevo password
                if (password) {
                    const hashedPassword = yield utils_1.utils.hashPassword(password);
                    updateData.password = hashedPassword.toString();
                }
                // Actualizar el usuario
                const updatedUser = yield database_1.default.usuario.update({
                    where: { cveusuario: Number(id) },
                    data: updateData,
                });
                return res.json(updatedUser);
            }
            catch (error) {
                return res.status(500).json({ message: `Error: ${error.message}` });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const deletedUser = yield database_1.default.usuario.delete({
                    where: { cveusuario: Number(id) }
                });
                return res.json({ message: "Usuario eliminado correctamente" });
            }
            catch (error) {
                return res.status(500).json({ message: `Error: ${error.message}` });
            }
        });
    }
}
exports.usuarioController = new UsuarioController();
