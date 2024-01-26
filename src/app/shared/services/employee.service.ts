import { Injectable, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Iemployee } from '../models/employe';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, Subscription, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService implements OnDestroy {
 

  subscription !: Subscription 
  private baseUrl : string =environment.baseUrl
  constructor(private _http:HttpClient) { }
  

  private post$:Subject<Iemployee>= new Subject()
   edit$ :Subject<Iemployee>= new Subject()
   upadte$ :Subject<Iemployee>= new Subject()

  postAsObs$ = this.post$.asObservable()

  postEmployee(obj:Iemployee){
    const posturl :string = this.baseUrl+ '.json'
    this.subscription=this._http.post(posturl,obj).subscribe(res=>{
     this.post$.next(obj);
    }
    )
  }

  onDelete(id:string){
   const deleteurl : string= this.baseUrl + `/${id}.json` 
  this.subscription = this._http.delete(deleteurl).subscribe(res=>{
    console.log(res);
   })
  }

  getAllemployee(){
    const getUrl :string=  this.baseUrl+ '.json'
  return  this._http.get<Observable<Iemployee>>(getUrl)
    .pipe(
      map((res: any) =>{
        let arr=[]
        for (const key in res) {
         arr.push({
          id: key,
          ...res[key]
         })
        }
        return arr
      })
    )
  }

  onUpdate(obj:Iemployee, id: string){
    const updateUrl : string= this.baseUrl + `/${id}.json` 
   this.subscription = this._http.put(updateUrl,obj).subscribe(res=>{
      console.log(res);
      
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
