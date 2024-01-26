import { AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";



export class EmplIdValidator {
    static isIdInvalid(control : AbstractControl) : ValidationErrors | null{
        let regexp = /^[a-z]\d{3}$/i; // E123
        let val = control.value as string;

        let isValid = regexp.test(val) // returns boolean
        if(isValid){
            return null
        }else {
           return {invalidEmplId : "EMP id Should start 1 Char and ends with 3 numbers"} 
        }
    }
}



export class AsyncIsEmailExist {
    static forbiddenEmail(control: AbstractControl):
        Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
        const p = new Promise<ValidationErrors | null>((resolve, reject) => {
            setTimeout(() => {
                if ((control.value as string) === 'admin@gmail.com') {
                    resolve({ emailExistError: 'Email is already Exit' })
                } else {
                    resolve(null)
                }
            }, 3000);
        })
        return p
    }
}