import { Router } from 'express';
import { validate } from '../middlewares/validator.check';
import { jwtCheck } from '../middlewares/jwt.check';
import { usuarioController } from '../controllers/usuario.controller';

class IndexRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.config();
  }

  config(): void {
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
    this.router.get('/usuarios', [validate, jwtCheck], usuarioController.getUsuarios);

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
    this.router.post('/usuarios', [validate, jwtCheck], usuarioController.insert);

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
    this.router.put('/usuarios/:id', [validate, jwtCheck], usuarioController.update);

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
    this.router.delete('/usuarios/:id', [validate, jwtCheck], usuarioController.delete);
  }
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;
