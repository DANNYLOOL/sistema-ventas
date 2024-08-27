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
exports.indexController = void 0;
const database_1 = __importDefault(require("../database/database"));
const utils_1 = require("../utils/utils");
class IndexController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = {
                    cveusuario: 1,
                    nombre: 'jose',
                    rol: [1, 2, 3]
                };
                // return res.json({ message: "API Works" });
                const newUser = yield database_1.default.usuario.create({
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
                const usuarios = yield database_1.default.usuario.findMany();
                /*const deletedUser = await prisma.usuario.delete({
                  where: { cveusuario: newUser.cveusuario }
                });*/
                const token = utils_1.utils.generateJWT(user);
                console.log(token);
                var jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdmVVc3VhcmlvIjoxLCJub21icmUiOiJqb3NlIiwicm9sIjpbMSwyLDNdLCJpYXQiOjE3MjAyMjgxMTAsImV4cCI6MTcyMDIzMTcxMH0.Vjbot1kUX3nL70T0z_IbOmqcVBC7m8ril0EOU6n9VQ4";
                var data = utils_1.utils.getPayload(jwt);
                console.log(data);
                return res.json(usuarios);
            }
            catch (error) {
                return res.status(500).json({ message: `Error: ${error}` });
            }
        });
    }
}
exports.indexController = new IndexController();
