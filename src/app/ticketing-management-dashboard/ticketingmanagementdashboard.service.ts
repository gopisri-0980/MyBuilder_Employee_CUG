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
export class TicketingmanagementdashboardService {
  constructor(private _httpClient: HttpClient, private cmn: CommonComponent) {
 
  }

  gteprojectwisecount(fromDate, toDate): Promise<any> {
    return new Promise((resolve, reject) => {

      if(fromDate == ""){
        fromDate = null;
      }

      if(toDate == ""){
        toDate = null;
      }
      const body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "startDate": fromDate,
        "endDate": toDate
      }

      console.log(body);
   
      let url = this.cmn.commonUrl + "ticketreport/getProjectWiseTicketCount.spring";
      let headers = new Headers({
        'Content-Type': 'application/json'
      });
      let options = new RequestOptions({ headers: headers });
      this._httpClient.post(url, body).subscribe(r => resolve(r), reject);
    }).catch(() => {
      swal('Session expired,<br/> Please login and try again.', 'Alert!', { enableHtml: true });
    });
  }


  ProjectWiseRaisedTicketTypeCount(fromDate, toDate): Promise<any> {
    return new Promise((resolve, reject) => {

      if(fromDate == ""){
        fromDate = null;
      }

      if(toDate == ""){
        toDate = null;
      }

      const body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "startDate": fromDate,
        "endDate": toDate
      }
      
      let url = this.cmn.commonUrl + "ticketreport/getProjectWiseRaisedTicketTypeCount.spring";
      let headers = new Headers({
        'Content-Type': 'application/json'
      });
      let options = new RequestOptions({ headers: headers });
      this._httpClient.post(url, body).subscribe(r => resolve(r), reject);
    }).catch(() => {
      swal('Session expired,<br/> Please login and try again.', 'Alert!', { enableHtml: true });
    });
  }


  Alltickettypesfun(fromDate, toDate): Promise<any> {
    return new Promise((resolve, reject) => {

      if(fromDate == ""){
        fromDate = null;
      }

      if(toDate == ""){
        toDate = null;
      }

      const body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "startDate": fromDate,
        "endDate": toDate
      }

     
      let url = this.cmn.commonUrl + "ticketreport/getAllTicketTypesProjectWiseTicketCount.spring";
      let headers = new Headers({
        'Content-Type': 'application/json'
      });
      let options = new RequestOptions({ headers: headers });
      this._httpClient.post(url, body).subscribe(r => resolve(r), reject);
    }).catch(() => {
      swal('Session expired,<br/> Please login and try again.', 'Alert!', { enableHtml: true });
    });
  }



  Getemployeedetails(fromDate, toDate): Promise<any> {
    return new Promise((resolve, reject) => {

      if(fromDate == ""){
        fromDate = null;
      }

      if(toDate == ""){
        toDate = null;
      }

      const body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "startDate": fromDate,
        "endDate": toDate
      }
      
      let url = this.cmn.commonUrl + "ticketreport/getEmployeeProjectwiseTicketCount.spring";
      let headers = new Headers({
        'Content-Type': 'application/json'
      });
      let options = new RequestOptions({ headers: headers });
      this._httpClient.post(url, body).subscribe(r => resolve(r), reject);
    }).catch(() => {
      swal('Session expired,<br/> Please login and try again.', 'Alert!', { enableHtml: true });
    });
  }


  EscalationTicketsDetailsCount(fromDate, toDate): Promise<any> {
    return new Promise((resolve, reject) => {

      if(fromDate == ""){
        fromDate = null;
      }

      if(toDate == ""){
        toDate = null;
      }

      const body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "startDate": fromDate,
        "endDate": toDate
      }

      let url = this.cmn.commonUrl + "ticketreport/getEscalationTicketsDetailsCount.spring";
      let headers = new Headers({
        'Content-Type': 'application/json'
      });
      let options = new RequestOptions({ headers: headers });
      this._httpClient.post(url, body).subscribe(r => resolve(r), reject);
    }).catch(() => {
      swal('Session expired,<br/> Please login and try again.', 'Alert!', { enableHtml: true });
    });
  }



  EmployeeWiseTicketAverageClosingTime(fromDate, toDate): Promise<any> {
    return new Promise((resolve, reject) => {
      
      if(fromDate == ""){
        fromDate = null;
      }

      if(toDate == ""){
        toDate = null;
      }

      const body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "startDate": fromDate,
        "endDate": toDate
      }
     

      let url = this.cmn.commonUrl + "ticketreport/getEmployeeWiseTicketAverageClosingTime.spring";
      let headers = new Headers({
        'Content-Type': 'application/json'
      });
      let options = new RequestOptions({ headers: headers });
      this._httpClient.post(url, body).subscribe(r => resolve(r), reject);
    }).catch(() => {
      swal('Session expired,<br/> Please login and try again.', 'Alert!', { enableHtml: true });
    });
  }


  UnRespondingTickets(fromDate, toDate): Promise<any> {
    return new Promise((resolve, reject) => {
      if(fromDate == ""){
        fromDate = null;
      }

      if(toDate == ""){
        toDate = null;
      }

      const body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "startDate": fromDate,
        "endDate": toDate
      }

      


      let url = this.cmn.commonUrl + "ticketreport/getUnRespondingTickets.spring";


      let headers = new Headers({
        'Content-Type': 'application/json'
      });

      let options = new RequestOptions({ headers: headers });
      this._httpClient.post(url, body).subscribe(r => resolve(r), reject);
    }).catch(() => {
      swal('Session expired,<br/> Please login and try again.', 'Alert!', { enableHtml: true });
    });
  }




  TicketDetails(fromDate, toDate): Promise<any> {
    return new Promise((resolve, reject) => {
      if(fromDate == ""){
        fromDate = null;
      }

      if(toDate == ""){
        toDate = null;
      }
      
      const body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "startDate": fromDate,
        "endDate": toDate
      }
      let url = this.cmn.commonUrl + "ticketreport/getTicketDetailsReport.spring";
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


