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
export class TransactionDetailsBankStatementViewService {
  siteid_value: any;

  constructor(private _httpClient: HttpClient, private cmn: CommonComponent) { }


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

  GetBank_account_numberfun(siteId): Promise<any> {
    return new Promise((resolve, reject) => {

      if (siteId == "") {
        this.siteid_value = "";
      } else {
        this.siteid_value = siteId;
      }


      const body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "siteIds": this.siteid_value
      }
      console.log(JSON.stringify(body));

      let url = this.cmn.commonUrl + "financial/getAccountNumbers.spring";
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


  GetSearchfunction(siteids, bankAcc_num, action, clear_fromdate, clear_todate): Promise<any> {
    return new Promise((resolve, reject) => {
      const body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "clearanceFromDate": clear_fromdate,
        "clearanceToDate": clear_todate,
        "requestUrl": action,
        "siteIds": siteids,
        "bankAccountNumbers": bankAcc_num
      }
      console.log("-------------cust name :" + JSON.stringify(body));
      let url = this.cmn.commonUrl + "financial/getCleredUnclearedTransactionReport.spring";
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
