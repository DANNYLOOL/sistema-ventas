import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import SwaggerUI from "swagger-ui-express";
import swaggerDocs from "./routes/api.docs";
import indexRoutes from "./routes/index.routes";
import authRoutes from "./routes/auth.routes";
import usuarioRoutes from "./routes/usuario.routes";
import rolRoutes from "./routes/rol.routes";

class Server {

    // * Crear la instancia global de nuestra app.
    public app: Application;

    // * Generar el constructor
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    // * Generar un método para la configuración
    private config(): void {
        // * Configuración del puerto para el servidor.
        this.app.set("port", process.env.PORT || 3000);

        // * Mostrar las peticiones en consola
        this.app.use(morgan("dev"));

        // * Uso de CORS (Cross Origin)
        this.app.use(cors());

        // * Generar restricción a la API
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }

    // ! Generar un método para la configuración de rutas
    private routes(): void {
        this.app.use("/api/docs", SwaggerUI.serve, SwaggerUI.setup(swaggerDocs));
        this.app.use("/api", indexRoutes);
        this.app.use("/api/auth", authRoutes);
        this.app.use("/api", usuarioRoutes);
        this.app.use("/api", rolRoutes);
    }

    // * Generar un método para inicializar el servicio
    start(): void {
        this.app.listen(this.app.get("port"), () => {
            console.log("Server on port", this.app.get("port"));
        });
    }
}

const server = new Server();
server.start();