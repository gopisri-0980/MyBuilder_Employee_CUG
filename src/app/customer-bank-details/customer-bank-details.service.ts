import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { promise } from 'protractor';
import { CommonComponent } from '../common/common.component';
import 'rxjs/add/operator/map'
import { Http, RequestOptions, Headers } from '@angular/http';
declare const $: any;
declare const swal: any;

@Injectable({
  providedIn: 'root'
})
export class CustomerBankDetailsService {

  chatcountUpdate = new BehaviorSubject({});
  NumberOfunreadmessages = new BehaviorSubject({});

  NamePlatesUpdate = new BehaviorSubject({});
  constructor(public cmn: CommonComponent, private _httpClient: HttpClient,) {
  }


  GetCustomernamefun(sessionKey, customername,siteId): Promise<any> {
    return new Promise((resolve, reject) => {
      const body = {
        "customerName":null,
        "sessionKey":sessionKey,
        "requestUrl" : "ViewAllData",
        "siteId" : siteId
      }
      console.log("-------------cust name :"+JSON.stringify(body));
      let url = this.cmn.commonUrl + "references/searchCustomer.spring";
      console.log(url);
      let headers = new Headers({
        'Content-Type': 'application/json'
      });
      let options = new RequestOptions({ headers: headers });
      this._httpClient.post(url, body).subscribe(r => resolve(r), reject);
    }).catch(() => {
      swal('Session expired,<br/> Please login and try again.', 'Alert!', { enableHtml: true });
    });
  }


}
