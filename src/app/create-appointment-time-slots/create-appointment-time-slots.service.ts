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
export class CreateAppointmentTimeSlotsService {
  
 
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
        "siteId": selectblock
      }
      let url = this.cmn.commonUrl + "block/getBlocks.spring";
      let headers = new Headers({
        'Content-Type': 'application/json'
      });
      let options = new RequestOptions({ headers: headers });
      this._httpClient.post(url, body).subscribe(r => resolve(r), reject);
    }).catch(() => {
      swal('Session expired,<br/> Please login and try again.', 'Alert!', { enableHtml: true });
    });
  }



  Floordetails(selectblock, value): Promise<any> {
    return new Promise((resolve, reject) => {
      const body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "siteId": selectblock,
        "blockDetIds": value
      }

      console.log(body);
      let url = this.cmn.commonUrl + "floor/getFloors.spring";
      let headers = new Headers({
        'Content-Type': 'application/json'
      });
      let options = new RequestOptions({ headers: headers });
      this._httpClient.post(url, body).subscribe(r => resolve(r), reject);
    }).catch(() => {
      swal('Session expired,<br/> Please login and try again.', 'Alert!', { enableHtml: true });
    });
  }


  Flatdetails(selectblock, blocks, Flats): Promise<any> {
    return new Promise((resolve, reject) => {
      const body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "siteId": selectblock,
        "blockDetIds": blocks,
        "floorDetIds": Flats
      }

      console.log(body);
      let url = this.cmn.commonUrl + "flat/getFlats.spring";
      let headers = new Headers({
        'Content-Type': 'application/json'
      });
      let options = new RequestOptions({ headers: headers });
      this._httpClient.post(url, body).subscribe(r => resolve(r), reject);
    }).catch(() => {
      swal('Session expired,<br/> Please login and try again.', 'Alert!', { enableHtml: true });
    });
  }


  GetBookingFlatDetailsval(selectblock,blocks, fromdate, todate): Promise<any> {
    return new Promise((resolve, reject) => {
      const body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "siteId": selectblock,
        "blockDetIds": blocks,
        "fromDate": fromdate,
        "toDate": todate

      }
      let url = this.cmn.commonUrl + "flat/getBookingFlats.spring";

      console.log(url);
      console.log(JSON.stringify(body));

      let headers = new Headers({
        'Content-Type': 'application/json'
      });
      let options = new RequestOptions({ headers: headers });
      this._httpClient.post(url, body).subscribe(r => resolve(r), reject);
    }).catch(() => {
      swal('Session expired,<br/> Please login and try again.', 'Alert!', { enableHtml: true });
    });
  }




  final_submissionfun(siteid , apptmtDtlsReqstList): Promise<any> {
    return new Promise((resolve, reject) => {
      const body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        //"siteId" : siteid,
        "apptmtDtlsReqstList":apptmtDtlsReqstList

      }
      let url = this.cmn.commonUrl + "appointmentBooking/saveAppointmentTimeslots.spring";

      console.log(url);
      console.log(JSON.stringify(body));

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
