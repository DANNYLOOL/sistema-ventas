import { Request, Response } from "express";
import prisma from "../database/database";

class RolController {

  public async getRoles(req: Request, res: Response) {
    try {
      const roles = await prisma.rol.findMany({
        where: {
          activo: 1
        }
      });
      res.json(roles);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener roles' });
    }
  }  
}

export const rolController = new RolController();
