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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.utils = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const keys_1 = __importDefault(require("../config/keys"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
/**
 *
 * @name Utils
 * @author Daniel Rangel
 * @creation 27/06/2024
 *
 */
class Utils {
    /**
     *
     * @name generateJWT
     * @description Metodo para generar un token OAUTH
     * @param payload
     * @returns string
     *
     */
    generateJWT(payload) {
        var token = jsonwebtoken_1.default.sign(payload, keys_1.default.secret.jwt, { expiresIn: '1h' });
        return token;
    }
    /**
     *
     * @name getPayload
     * @description Obtener la información del JWT
     * @param token
     * @returns Object
     *
     */
    getPayload(token) {
        var payload = jsonwebtoken_1.default.verify(token, keys_1.default.secret.jwt);
        const { iat, exp } = payload, data = __rest(payload, ["iat", "exp"]);
        return data;
    }
    /**
     *
     * @name hashPassword
     * @description Encriptar cadena de texto
     * @param password
     * @returns Promise<String>
     *
     */
    hashPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = yield bcryptjs_1.default.genSaltSync(10);
            return yield bcryptjs_1.default.hashSync(password, salt);
        });
    }
    /**
     *
     * @name checkPassword
     * @description Verificar la contraseña
     * @param password
     * @param encryptedPassword
     * @returns Promise<any>
     *
     */
    checkPassword(password, encryptedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcryptjs_1.default.compareSync(password, encryptedPassword);
        });
    }
}
exports.utils = new Utils();
