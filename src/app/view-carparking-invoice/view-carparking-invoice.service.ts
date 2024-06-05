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

import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class ViewCarparkingInvoiceService {
  public stringSubject = new Subject<any>();

  constructor(public cmn: CommonComponent, private _httpClient: HttpClient,) {

    console.log(localStorage.getItem('Pending_Modification_Invoices'));

  }




  getModificationInvoice(siteId, bookingfromid, finbookingmodicostid): Promise<any> {
    return new Promise((resolve, reject) => {
      var body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "siteId": siteId,
        "bookingFormId": bookingfromid,
        "finBookingFormCarParkingCostId": finbookingmodicostid,
        "requestUrl": "carParkingInvoiceDetailsPage"
      }
console.log(JSON.stringify(body));

      let url = this.cmn.commonUrl + "financial/getCarParkingInvoiceDetails.spring";
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



  getApprovemodificationinvoice(siteid, empId, sitename , finBookingFormModiCostId, finsetOffAppLevelId, 
    flatIds ,bookingFormId ,transactionAmount ,percentageId ,percentageValue ,modiCostDtlsRequests ,buttontype): Promise<any> {
    return new Promise((resolve, reject) => {


      var body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "siteId": siteid,
        "siteName": sitename,
        "finBookingFormModiCostId": finBookingFormModiCostId,
        "finsetOffAppLevelId": finsetOffAppLevelId,
        "flatIds": [flatIds],
        "bookingFormId": bookingFormId,
        "transactionAmount": transactionAmount,
        "percentageId": percentageId,
        "percentageValue": percentageValue,
        "buttonType":buttontype,
        "modiCostDtlsRequests":modiCostDtlsRequests,
      }

    
      console.log(JSON.stringify(body));

  
     
      
      let url = this.cmn.commonUrl + "financial/approveModificationChargesEntry.spring";
      console.log(url);

 
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      this._httpClient.post(url, body).subscribe(r => {
        
        this._httpClient.post(url, body).subscribe(r => 
          this.stringSubject.next(r));
      }, reject);
    }).catch(() => {
      swal('Session expired,<br/> Please login and try again.', 'Alert!', { enableHtml: true });
    });
  }


}