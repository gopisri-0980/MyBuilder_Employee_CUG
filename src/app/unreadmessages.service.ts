import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { promise } from 'protractor';
import { CommonComponent } from './common/common.component';
import 'rxjs/add/operator/map'
import { Http, RequestOptions, Headers } from '@angular/http';

import { interval, Subscription } from 'rxjs';

declare const $: any;
declare const swal: any;

@Injectable({
  providedIn: 'root'
})
export class UnreadmessagesService {

  mySubscription: Subscription;


  ticketcountUpdate = new BehaviorSubject({});

  chatcountUpdate = new BehaviorSubject({});
  NumberOfunreadmessages = new BehaviorSubject({});
  ledgerData: Array<any> = [];
  constructor(private _httpClient: HttpClient, public cmn: CommonComponent) {
    this.ChartTotalCountListservice();
    this.sidemenu_ticket_TotalCountListservice();


    // this.mySubscription = interval(110000).subscribe((x => {
    //   this.ChartTotalCountListservice();
    //   this.sidemenu_ticket_TotalCountListservice();
    // }));





  }

  ChartTotalCountListservice(): Promise<any> {
    return new Promise((resolve, reject) => {
      const body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey")
      };
      const url = this.cmn.commonUrl + "messenger/getUnviewChatCount.spring";

      console.log(url);
      console.log(JSON.stringify(body));

      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      this._httpClient.post(url, body).subscribe(r => {
        this.chatcountUpdate.next(r), resolve(r);
      }, reject);
    }).catch(() => {
      swal('Session expired,<br/> Please login and try again.', 'Alert!', { enableHtml: true });
    });
  }


  sidemenu_ticket_TotalCountListservice(): Promise<any> {
    return new Promise((resolve, reject) => {
      const body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey")
      };
      const url = this.cmn.commonUrl + "getCount/getAllCount.spring";

      console.log(url);
      console.log(JSON.stringify(body));

      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      this._httpClient.post(url, body).subscribe(r => {
        this.ticketcountUpdate.next(r), resolve(r);
      }, reject);
    }).catch(() => {
      swal('Session expired,<br/> Please login and try again.', 'Alert!', { enableHtml: true });
    });
  }


  Approvenotificationfun(employeeid, mailpassword, id, action, comment): Promise<any> {
    return new Promise((resolve, reject) => {
      const body = {
        "employeeId": employeeid,
        "mailPassword": mailpassword,
        "id": id,
        "action": action,
        "comments": comment
      }

      console.log(body);
      let url = this.cmn.commonUrl + "notification/approveOrRejectCompanyNotificationsfrommail.spring";
      //http://localhost:8888/SumadhuraGateway/employeeservice/notification/approveOrRejectCompanyNotificationsfrommail.spring
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


  Modifienotificationfun(id): Promise<any> {
    return new Promise((resolve, reject) => {
      const body = {
        "id": id,
      }
      let url = this.cmn.commonUrl + "notification/getNotificationstatusformodifymail.spring";
      let headers = new Headers({
        'Content-Type': 'application/json'
      });

      let options = new RequestOptions({ headers: headers });
      this._httpClient.post(url, body).subscribe(r => resolve(r), reject);
    }).catch(() => {
      swal('Session expired,<br/> Please login and try again.', 'Alert!', { enableHtml: true });
    });
  }

  view_details_mail(id): Promise<any> {
    return new Promise((resolve, reject) => {
      const body = {
        "id": id,
        "notificationType": "Company"
      }
      let url = this.cmn.commonUrl + "notification/getNotificationdetailsformail.spring";
      //http://localhost:8888/SumadhuraGateway/employeeservice/notification/getNotificationdetailsformail.spring
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
