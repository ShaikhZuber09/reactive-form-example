import { AbstractControl, FormGroup } from "@angular/forms";


export function passWordMatch(password: string, confirmPassword: string) {
    return function (form: FormGroup) {
        let passwordValue = form?.get(password)?.value;
        let confirmPasswordValue = form?.get(confirmPassword)?.value;
        // if(passwordValue === confirmPasswordValue){
        //     return null
        // }else{
        //     return {passwordMissmatch : 'Password and confirm password should be same'}
        // }
        //return passwordValue === confirmPasswordValue ? null : { passwordMissmatch: 'Password and confirm password should be same' }
        // if (
        //     confirmPasswordValue.errors &&
        //     !confirmPasswordValue.errors.confirmedValidator
        //   ) {
        //     return;
        //   }
          if (passwordValue.value === confirmPasswordValue.value) {
            form?.get(confirmPassword)?.setErrors(null);
          } else {
            form?.get(confirmPassword)?.setErrors({ confirmedValidator: true });
           
          }
    }
}