import { Request, Response } from "express";
import prisma from "../database/database";
import { utils } from "../utils/utils";

class IndexController {
  public async index(req: Request, res: Response) {
    try {
      const user = {
        cveusuario : 1,
        nombre: 'jose',
        rol: [1, 2, 3]
      };
      // return res.json({ message: "API Works" });
      const newUser = await prisma.usuario.create({
        data: {
          nombre: 'Daniel',
          apellido: 'Rangel',
          username: 'drangel',
          password: '123',
          email: 'danyrangel2002@gmail.com',
          rol: {
            connect: { id: 1 }
          }
        }
      });
      const usuarios = await prisma.usuario.findMany();
      /*const deletedUser = await prisma.usuario.delete({
        where: { cveusuario: newUser.cveusuario }
      });*/

      const token = utils.generateJWT(user);
      console.log(token);

      var jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdmVVc3VhcmlvIjoxLCJub21icmUiOiJqb3NlIiwicm9sIjpbMSwyLDNdLCJpYXQiOjE3MjAyMjgxMTAsImV4cCI6MTcyMDIzMTcxMH0.Vjbot1kUX3nL70T0z_IbOmqcVBC7m8ril0EOU6n9VQ4";
      var data = utils.getPayload(jwt);
      console.log(data);

      return res.json(usuarios);
    } catch (error: any) {
      return res.status(500).json({ message: `Error: ${error}` });
    }
  }

  public async getUsuarios(req: Request, res: Response) {
    try {
      const usuarios = await prisma.usuario.findMany({
        include: {
          rol: true
        }
      });
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener usuarios' });
    }
  }

  public async getRoles(req: Request, res: Response) {
    try {
      const roles = await prisma.rol.findMany();
      res.json(roles);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener roles' });
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

export const indexController = new IndexController();
