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
export class TicketmonthlyreportService {
  deptid: any;
  roleid: any;
  constructor(private _httpClient: HttpClient, private cmn: CommonComponent) {
    this.deptid = JSON.parse(sessionStorage.getItem("session_deptid"));
    this.roleid = sessionStorage.getItem("session_roleId");


  }


  getFeedbackReport(fromDate, toDate): Promise<any> {
    return new Promise((resolve, reject) => {
      const body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "startDate": fromDate,
        "endDate": toDate
      }

      let url = this.cmn.commonUrl + "ticketreport/getAllFeedbackWiseTickets.spring";
      let headers = new Headers({
        'Content-Type': 'application/json'
      });
      let options = new RequestOptions({ headers: headers });
      this._httpClient.post(url, body).subscribe(r => resolve(r), reject);
    }).catch(() => {
      swal('Session expired,<br/> Please login and try again.', 'Alert!', { enableHtml: true });
    });
  }


  GetCustomernamefun(sessionKey, condition, deptno): Promise<any> {
    return new Promise((resolve, reject) => {
      const body = {
        "sessionKey": "" + sessionKey,
        "requestUrl": condition,
        "departmentIds": deptno
      }



      let url = this.cmn.commonUrl + "ticketreport/getTicketOwners.spring";

      let headers = new Headers({
        'Content-Type': 'application/json'
      });
      let options = new RequestOptions({ headers: headers });
      this._httpClient.post(url, body).subscribe(r => resolve(r), reject);
    }).catch(() => {
      swal('Session expired,<br/> Please login and try again.', 'Alert!', { enableHtml: true });
    });
  }




  getmonthlyreportfun(startdate, enddate, sitename, rating, categoryname, employeeid, Escalationlevelempid): Promise<any> {







    if (employeeid == undefined || employeeid == "null" || employeeid == ['undefined']) {
      employeeid = null;
    } else {
      employeeid = [employeeid];
    }

    if (Escalationlevelempid == undefined || Escalationlevelempid == "null" || Escalationlevelempid == ['undefined']) {
      Escalationlevelempid = null;
    } else {
      Escalationlevelempid = [Escalationlevelempid];
    }


    if (sitename == null || sitename == "null" || sitename == "undefined") {
      sitename = null;
    } else {
      sitename = [sitename];
    }


    if (rating == null || rating == "null" || rating == "undefined") {
      rating = null;
    } else {
      rating = [rating];
    }

    if (categoryname == null || categoryname == "null" || categoryname == "undefined") {
      categoryname = null;
    } else {
      categoryname = [categoryname];
    }


    if(startdate == undefined || startdate == "undefined" || startdate == ""){
      startdate = null;
    }

    if(enddate == undefined || enddate == "undefined" || enddate == ""){
      enddate = null;
    }


    console.log(startdate);
    console.log(enddate);
    console.log(sitename);
    console.log(rating);
    console.log(categoryname);
    console.log(employeeid);
    console.log(Escalationlevelempid);

    return new Promise((resolve, reject) => {
      const body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "startDate": startdate,
        "endDate": enddate,
        "empIds": employeeid,
        "departmentIds": categoryname,
        "ratings": rating,
        "siteIds": sitename,
        "levelIds": Escalationlevelempid
      }

      console.log(JSON.stringify(body));

      let url = this.cmn.commonUrl + "ticketreport/getSpecificTicketReport.spring";

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
