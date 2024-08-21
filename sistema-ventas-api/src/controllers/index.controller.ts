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
}

export const indexController = new IndexController();
