import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { promise } from 'protractor';
import { CommonComponent } from '../common/common.component';
import 'rxjs/add/operator/map'
import { Http, RequestOptions, Headers } from '@angular/http';
import { DeclareFunctionStmt } from '@angular/compiler';
declare const $: any;
declare const swal: any;


@Injectable({
  providedIn: 'root'
})
export class ViewLeadDetailsService {

  constructor(private _httpClient: HttpClient, private cmn: CommonComponent) {

  }

  ProjectDetails(siteids): Promise<any> {
    return new Promise((resolve, reject) => {
      const body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "siteIds": siteids
      }
      let url = this.cmn.commonUrl + "site/site.spring";
      let headers = new Headers({
        'Content-Type': 'application/json'
      });


      let options = new RequestOptions({ headers: headers });
      this._httpClient.post(url, body).subscribe(r => resolve(r), reject);
    }).catch(() => {
      swal('Session expired,<br/> Please login and try again.', 'Alert!', { enableHtml: true });
    });
  }


  Select_Flat_Details(siteids): Promise<any> {
    return new Promise((resolve, reject) => {
      const body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "ids": [siteids],
        "requestUrl": "All"
      }
      let url = this.cmn.commonUrl + "flat/flatSite.spring";


      let headers = new Headers({
        'Content-Type': 'application/json'
      });

      let options = new RequestOptions({ headers: headers });
      this._httpClient.post(url, body).subscribe(r => resolve(r), reject);
    }).catch(() => {
      swal('Session expired,<br/> Please login and try again.', 'Alert!', { enableHtml: true });
    });
  }

  GetCustomernamefun(sessionKey, customername, siteId): Promise<any> {
    return new Promise((resolve, reject) => {
      const body = {
        "customerName": null,
        "sessionKey": sessionKey,
        "requestUrl": "CustomerFlatNo",
        "siteId": siteId
      }

      let url = this.cmn.commonUrl + "references/searchCustomer.spring";

      let headers = new Headers({
        'Content-Type': 'application/json'
      });
      let options = new RequestOptions({ headers: headers });
      this._httpClient.post(url, body).subscribe(r => resolve(r), reject);
    }).catch(() => {
      swal('Session expired,<br/> Please login and try again.', 'Alert!', { enableHtml: true });
    });
  }


  Bank_Details(): Promise<any> {
    return new Promise((resolve, reject) => {
      const body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "requestUrl": "ListPage"
      }
      let url = this.cmn.commonUrl + "loan/getBankList.spring";
      let headers = new Headers({
        'Content-Type': 'application/json'
      });
      let options = new RequestOptions({ headers: headers });
      this._httpClient.post(url, body).subscribe(r => resolve(r), reject);
    }).catch(() => {
      swal('Session expired,<br/> Please login and try again.', 'Alert!', { enableHtml: true });
    });
  }

  searchsubmitfun(siteids, customer_id, bookingform_id, customerLoan_edit_id, leadfromdate , leadtodate , bankerlistId ,statusdata): Promise<any> {
    return new Promise((resolve, reject) => {

      const body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "siteIds":siteids,
        "custId":customer_id,
        "bookingFormId":null,
        "flatId": bookingform_id,
        "customerLoanEOIDetailsId":customerLoan_edit_id,
        "leadFromDate":leadfromdate,
        "leadToDate":leadtodate,
        "bankerListId":bankerlistId,
        "requestUrl": statusdata
    }

      console.log(JSON.stringify(body));

      let url = this.cmn.commonUrl + "loan/viewLoanAppliedLeadDetailsList.spring";
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
