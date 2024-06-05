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
export class BookYourAppointmentService {

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

  Blockdetails(selectblock): Promise<any> {
    return new Promise((resolve, reject) => {
      const body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "ids": [selectblock],
        "requestUrl": "All"
      }

      console.log(body);
      let url = this.cmn.commonUrl + "block/blocks.spring";
      let headers = new Headers({
        'Content-Type': 'application/json'
      });

      let options = new RequestOptions({ headers: headers });
      this._httpClient.post(url, body).subscribe(r => resolve(r), reject);
    }).catch(() => {
      swal('Session expired,<br/> Please login and try again.', 'Alert!', { enableHtml: true });
    });
  }



  gettabledetails(): Promise<any> {
    return new Promise((resolve, reject) => {
      const body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "requestFrom": "SubMenu"
      }

      console.log(body);
      let url = this.cmn.commonUrl + "appointmentBooking/getAppointmentBookingDetails.spring";
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


  searchsubmitfun(startDate, endDate, siteId, blockId, statusid): Promise<any> {
    return new Promise((resolve, reject) => {

      if (statusid == "select") {
        statusid = null;
      }

      const body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "requestFrom": null,
        "startDate": startDate,
        "endDate": endDate,
        "siteId": siteId,
        "blockId": blockId,
        "apptmtStatusName": statusid

      }

      console.log(body);
      let url = this.cmn.commonUrl + "appointmentBooking/getAppointmentBookingDetails.spring";
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



  appointmentdeletefun(apptmtSlotTimesId, apptmtBookingsId, flatBookingId): Promise<any> {
    return new Promise((resolve, reject) => {
      const body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "apptmtStatusName": "Cancelled",
        "apptmtSlotTimesId": apptmtSlotTimesId,
        "apptmtBookingsId": apptmtBookingsId,
        "flatBookingId": flatBookingId
      }

      console.log(body);
      let url = this.cmn.commonUrl + "appointmentBooking/updateAppointmentBookingStatus.spring";
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


  ClicktoviewMOMfun(statusdata, apptmtBookingsId, flatBookId, yourminutestextarea): Promise<any> {
    return new Promise((resolve, reject) => {
      const body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "apptmtStatusName" : statusdata,
        "apptmtBookingsId" : apptmtBookingsId,
        "flatBookingId" : flatBookId,
        "apptmtSummary" : yourminutestextarea
      }

      console.log(body);
      let url = this.cmn.commonUrl + "appointmentBooking/updateAppointmentSummary.spring";
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
