import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";

@Injectable({ providedIn: 'root'})
export class BaseForm {

    constructor() {}

    isValidfield(form: AbstractControl) {
        var bandera = false;

        if(form){
            bandera = form.touched || form.dirty && form.invalid;
        }
        return bandera;
    }

    getErrorMessage(form: AbstractControl | null) {
        let message = '';

        if (form) {
            const { errors } = form
            if (errors) {
                const messages: any = {
                    required: 'Campo requerido',
                    email: 'Formato inválido',
                    pattern: 'Formato inválido',
                    min: 'El rango no es correcto',
                    max: 'El rango no es correcto',
                    minLenght: 'Formato inválido'
                }

                const errorKey = Object.keys(errors).find(Boolean);
                if (errorKey) message = messages[errorKey];
            }
        }
        return message;
    }
}