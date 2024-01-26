import { Component, OnDestroy, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Observable, Subscription, findIndex } from 'rxjs';
import { Iemployee } from '../../models/employe';

@Component({
  selector: 'app-empolyee-list',
  templateUrl: './empolyee-list.component.html',
  styleUrls: ['./empolyee-list.component.scss']
})
export class EmpolyeeListComponent implements OnInit, OnDestroy {

  subcription !: Subscription

  thead:Array<string>=['First name','Last name','Email','Phone','Company','DOB','Edit','Delete']
empList : Array<Iemployee>=[]

  constructor(private _ser:EmployeeService) { }
  



  ngOnInit(): void {

   this.subcription = this._ser.getAllemployee().subscribe(res=>{
      this.empList=res
    })

  this.subcription=  this._ser.postAsObs$.subscribe(res=>{
      this.empList.push(res)
    })

   this.subcription = this._ser.upadte$.subscribe(res=>{
      let getIndex=this.empList.findIndex(emp=> emp.id === res.id)
      this.empList[getIndex]= res;
    })
  }
onEdit(emp: Iemployee){
 this._ser.edit$.next(emp)
}
onDelete(id:string,i :number){
  this._ser.onDelete(id)
  this.empList.splice(i,1)
}

ngOnDestroy(): void {
  this.subcription.unsubscribe()
}

}
