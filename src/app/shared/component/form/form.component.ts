import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passWordMatch } from '../../validators/passwordMatch';
import { EmployeeService } from '../../services/employee.service';
import { Iemployee } from '../../models/employe';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {
  isEdit: boolean = false;
  editId !: string 
  registerForm !: FormGroup
  subscription !: Subscription

  constructor(private _fb: FormBuilder, private _ser: EmployeeService) { }
  

  ngOnInit(): void {

    this.registerForm = this._fb.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      company: ["", [Validators.required]],
      phone: ["", [Validators.required,]],
      gender: ["", [Validators.required]],
      dob: ["", [Validators.required]],
      password: ["", [Validators.required,]],
      cnfmPswd: ["", [Validators.required]],
    }
    )

   this.subscription= this._ser.edit$.subscribe(res => {
      this.isEdit = true;
      this.editId = res.id!
      this.registerForm.patchValue(res)
    })
  }


  onSubmit() {
    if (this.registerForm.valid ) {
      if(!this.isEdit){
        const value: Iemployee = this.registerForm.value
        this._ser.postEmployee(value)
        this.registerForm.reset()
      }else{
        const value: Iemployee = this.registerForm.value
        this._ser.onUpdate(value,this.editId)
        this.isEdit = false;
        this._ser.upadte$.next({
          id: this.editId,
          ...value
        })
        this.registerForm.reset()
      }
    }
  }

  get f() {
    return this.registerForm.controls;
  }


  ngOnDestroy(): void {
   this.subscription.unsubscribe()
  }

  onCancel(){
    this.registerForm.reset()
    if(this.isEdit){
      this.isEdit=false
    }
  }
}
