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
    this.router.get('/usuarios', indexController.getUsuarios);

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
    this.router.get('/roles', indexController.getRoles);

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
    this.router.post('/usuarios', indexController.insert);

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
    this.router.put('/usuarios/:id', indexController.update);

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
    this.router.delete('/usuarios/:id', indexController.delete);
  }
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;
