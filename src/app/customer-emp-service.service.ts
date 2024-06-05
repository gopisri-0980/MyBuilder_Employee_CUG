import { Injectable } from '@angular/core'
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';
import 'rxjs/Rx';
import 'rxjs/add/operator/map'
@Injectable({
  providedIn: 'root'
})
export class CustomerEmpServiceService {
  
  constructor(public _http:HttpClient) { }
 
  public loginEmpService(data){debugger;
    return this._http.post("https://reqres.in/api/users", data).map( (res: Response) =>{
      //console.log(res);
      return res;
    });
  }

}
