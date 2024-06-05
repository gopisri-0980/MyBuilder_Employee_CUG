import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { promise } from 'protractor';
import { CommonComponent } from '../../common/common.component';
import 'rxjs/add/operator/map'
import { Http, RequestOptions, Headers } from '@angular/http';
declare const $: any;
declare const swal: any;
@Injectable({
  providedIn: 'root'
})
export class ViewticketsService {
  NamePlatesUpdate = new BehaviorSubject({});
  constructor(public cmn: CommonComponent, private _httpClient: HttpClient,) {
  }

  Getclosedticketview(sessionKey, pageno, pagesize, type, requesturl): Promise<any> {
    return new Promise((resolve, reject) => {
      const body = {
        "sessionKey": sessionKey,
        "pageNo": pageno,
        "pageSize": pagesize,
        "type": type,
        "requestUrl": requesturl
      };
      const url = this.cmn.commonUrl + "employeeTicket/getTicketList.spring";
      let headers = new Headers({
        'Content-Type': 'application/json'
      });
      let options = new RequestOptions({ headers: headers });
      this._httpClient.post(url, body).subscribe(r => resolve(r), reject);
    }).catch(() => {
      swal('Session expired,<br/> Please login and try again.', 'Alert!', { enableHtml: true });
    });
  }


  GetsiteListfun(sessionKey, siteids): Promise<any> {
    return new Promise((resolve, reject) => {
      const body = {
        "siteIds": siteids,
        "sessionKey": sessionKey
      };
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



  GetCustomernamefun(sessionKey, siteid): Promise<any> {

    return new Promise((resolve, reject) => {
        const body = {
          "customerName":null,
          "sessionKey":sessionKey,
          "requestUrl" : "ViewAllData",
          "siteId" : siteid
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




