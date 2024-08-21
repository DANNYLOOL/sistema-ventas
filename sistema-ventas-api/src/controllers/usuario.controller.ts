import { Request, Response } from "express";
import prisma from "../database/database";
import { utils } from "../utils/utils";

class UsuarioController {

    public async getUsuarios(req: Request, res: Response) {
        try {
            const token = <string>req.headers['auth'];
            const currentUser = utils.getPayload(token);

            const usuarios = await prisma.usuario.findMany({
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
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener usuarios' });
        }
    }

    public async insert(req: Request, res: Response) {
        try {
            const { nombre, apellido, username, email, rol, password } = req.body;

            // Validar que el usuario no exista
            const userExists = await prisma.usuario.findUnique({
                where: { username },
            });

            if (userExists) {
                return res.status(400).json({ message: "El usuario ya existe." });
            }

            // Validar que el email no exista
            const emailExists = await prisma.usuario.findUnique({
                where: { email },
            });

            if (emailExists) {
                return res.status(400).json({ message: "El email ya existe." });
            }

            const hashedPassword = await utils.hashPassword(password);

            // Crear el usuario en la base de datos
            const newUser = await prisma.usuario.create({
                data: {
                    nombre,
                    apellido,
                    username,
                    email,
                    password: hashedPassword.toString(),
                    rol: {
                        connect: rol.map((id: number) => ({ id }))
                    }
                },
            });

            return res.status(201).json(newUser);
        } catch (error: any) {
            console.error('Error al crear usuario:', error);
            return res.status(500).json({ message: `Error: ${error.message}` });
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { nombre, apellido, rol, password } = req.body;

            // Validar si el usuario existe
            const userExists = await prisma.usuario.findUnique({
                where: { cveusuario: Number(id) },
            });

            if (!userExists) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }

            // Construir el objeto de datos a actualizar
            const updateData: any = {
                nombre,
                apellido,
                rol: {
                    set: rol.map((id: number) => ({ id })),
                },
            };

            // Actualizar solo si se proporcionó un nuevo password
            if (password) {
                const hashedPassword = await utils.hashPassword(password);
                updateData.password = hashedPassword.toString();
            }

            // Actualizar el usuario
            const updatedUser = await prisma.usuario.update({
                where: { cveusuario: Number(id) },
                data: updateData,
            });

            return res.json(updatedUser);
        } catch (error: any) {
            return res.status(500).json({ message: `Error: ${error.message}` });
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const deletedUser = await prisma.usuario.delete({
                where: { cveusuario: Number(id) }
            });
            return res.json({ message: "Usuario eliminado correctamente" });
        } catch (error: any) {
            return res.status(500).json({ message: `Error: ${error.message}` });
        }
    }
}

export const usuarioController = new UsuarioController();
