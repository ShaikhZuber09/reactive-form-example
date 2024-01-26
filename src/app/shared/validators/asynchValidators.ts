import { AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";



export class EmplIdValidator {
    static isIdInvalid(control : AbstractControl) : ValidationErrors | null{
               
    }
}



export class AsyncIsEmailExist {
    static forbiddenEmail(control: AbstractControl):
        Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
        
    }
}
