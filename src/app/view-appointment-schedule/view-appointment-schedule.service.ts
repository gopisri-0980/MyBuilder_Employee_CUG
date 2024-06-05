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
export class ViewAppointmentScheduleService {

  constructor(private _httpClient: HttpClient, private cmn: CommonComponent) {

  }

  ProjectDetails(siteids): Promise<any> {
    return new Promise((resolve, reject) => {
      const body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "siteIds": siteids
      }

      console.log(JSON.stringify(body));
      let url = this.cmn.commonUrl + "site/site.spring";

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




  gettabledetails(): Promise<any> {
    return new Promise((resolve, reject) => {
      const body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "siteId": null,
        "startDate": null,
        "endDate": null

      }

      console.log(JSON.stringify(body));
      let url = this.cmn.commonUrl + "appointmentBooking/getAppointmentTimeslots.spring";
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


  searchsubmitfun(startDate, endDate, siteId , statusid): Promise<any> {
    return new Promise((resolve, reject) => {
      const body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "siteId": siteId,
        "startDate": startDate,
        "endDate": endDate,
        "slotStatusName" : statusid
      }

      console.log(JSON.stringify(body));
      let url = this.cmn.commonUrl + "appointmentBooking/getAppointmentTimeslots.spring";
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



  appointmentdeletefun(apptmtSlotTimesId , apptmtBookingsId , flatBookingId): Promise<any> {
    return new Promise((resolve, reject) => {
      const body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "apptmtStatusName": "Deleted",
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


}

