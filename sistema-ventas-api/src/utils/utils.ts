import jwt from "jsonwebtoken";
import keys from "../config/keys";
import bcrypt from "bcryptjs";

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

    public generateJWT(payload: any): string {
        var token = jwt.sign(payload, keys.secret.jwt, { expiresIn: '1h' });

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

    public getPayload(token: string): any {
        var payload = <any>jwt.verify(token, keys.secret.jwt);
        const { iat, exp, ...data } = payload;

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

    public async hashPassword(password: string): Promise<String> { 
        const salt = await bcrypt.genSaltSync(10);
        return await bcrypt.hashSync(password, salt);
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

    public async checkPassword(password: string, encryptedPassword: string): Promise<any> { 
        return await bcrypt.compareSync(password, encryptedPassword);
    }
}

export const utils = new Utils();