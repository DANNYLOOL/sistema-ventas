import { Router } from 'express';
import { indexController } from '../controllers/index.controller';
import { validate } from '../middlewares/validator.check';
import { authRules } from '../rules/auth.rules';
import { jwtCheck } from '../middlewares/jwt.check';

class IndexRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.config();
  }

  config(): void {
    /**
     * @swagger
     * /api:
     *  get:
     *      tags: ["Index"]
     *      summary: Default Index
     *      description: Ruta por defecto de la API.
     *      produces:
     *          - application/json
     *      responses:
     *          200:
     *              description: Exitoso
     */
    this.router.get('/', [validate, jwtCheck], indexController.index);
  }
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;
