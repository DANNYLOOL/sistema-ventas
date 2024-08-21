import { Router } from 'express';
import { validate } from '../middlewares/validator.check';
import { jwtCheck } from '../middlewares/jwt.check';
import { rolController } from '../controllers/rol.controller';

class IndexRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.config();
  }

  config(): void {
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
    this.router.get('/roles', [validate, jwtCheck], rolController.getRoles);
  }
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;
