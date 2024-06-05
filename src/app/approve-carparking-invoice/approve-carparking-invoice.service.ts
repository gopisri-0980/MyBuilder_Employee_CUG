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
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApproveCarparkingInvoiceService {
  constructor(public cmn: CommonComponent, private _httpClient: HttpClient,) {

    console.log(localStorage.getItem('Pending_Modification_Invoices'));


  }




  getApprovePendingInvoice(): Promise<any> {
    return new Promise((resolve, reject) => {
      var body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "empId": '',
        "siteIds": JSON.parse(localStorage.getItem('Pending_Modification_Invoices')),
        "blockIds": [],
        "floorIds": [],
        "flatIds": [],
        "condition": "approveCarParkingInvoices"
      }

      console.log(JSON.stringify(body));
      let url = this.cmn.commonUrl + "financial/getPendingCarParkingInvoices.spring";
      console.log(url);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      this._httpClient.post(url, body).subscribe(r => {

        this._httpClient.post(url, body).subscribe(r => resolve(r), reject);
      }, reject);
    }).catch(() => {
      swal('Session expired,<br/> Please login and try again.', 'Alert!', { enableHtml: true });
    });
  }



}
