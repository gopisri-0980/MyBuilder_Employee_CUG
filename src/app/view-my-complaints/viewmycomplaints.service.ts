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
export class ViewmycomplaintsService {
  NamePlatesUpdate = new BehaviorSubject({});
  ticketSiteIds: any[];
  constructor(public cmn: CommonComponent, private _httpClient: HttpClient,) {
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


  GetCustomernamefun(sessionKey, customername): Promise<any> {
    return new Promise((resolve, reject) => {
      const body = {
        "customerName": customername,
        "sessionKey": sessionKey,
        "requestUrl": "complaintTickets"
      }

      console.log(body);

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


  Getclosedticketview(sessionKey, pageno): Promise<any> {
    return new Promise((resolve, reject) => {
      const body = {
        "sessionKey": sessionKey,
       // "pageNo": pageno,
      //  "pageSize": 20,
        "requestUrl": "TicketComplaints",
        "ticketSiteIds": [],
        "customerId": null,
        "ticketId": null,
        "fromDate": null,
        "toDate": null
      };
      const url = this.cmn.commonUrl + "employeeTicket/getTicketComplaintList.spring";
      let headers = new Headers({
        'Content-Type': 'application/json'
      });
      let options = new RequestOptions({ headers: headers });
      this._httpClient.post(url, body).subscribe(r => resolve(r), reject);
    }).catch(() => {
      swal('Session expired,<br/> Please login and try again.', 'Alert!', { enableHtml: true });
    });
  }





  searchfunction(sessionKey, pageno, pageSize, type, requestUrl, ticketSiteIds, flatBookingId, ticketId, startdate, endDate,flatbookid): Promise<any> {

    return new Promise((resolve, reject) => {

      if (startdate == "") {
        startdate = null;
      }

      if (endDate == "") {
        endDate = null;
      }

      if(ticketSiteIds == undefined || ticketSiteIds == null || ticketSiteIds == "null"){
        this.ticketSiteIds = [];
      } else {
        this.ticketSiteIds = [JSON.parse(ticketSiteIds)];
      }

      const body = {
        "sessionKey": sessionKey,
        //"pageNo": pageno,
      //  "pageSize": pageSize,
        "requestUrl": "TicketComplaints",
        "ticketSiteIds":this.ticketSiteIds,
       // "customerId": flatbookid,
        "ticketId": ticketId,
        "fromDate": startdate,
        "toDate": endDate,
        "flatBookingId": flatbookid,


      }

      console.log(body);


      let url = this.cmn.commonUrl + "employeeTicket/getTicketComplaintList.spring";
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




