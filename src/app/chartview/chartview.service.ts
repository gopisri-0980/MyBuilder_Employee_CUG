import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { promise } from 'protractor';

import 'rxjs/add/operator/map'
import { Http, RequestOptions, Headers } from '@angular/http';
import { CommonComponent } from '../common/common.component';
declare const $: any;
declare const swal: any;

@Injectable({
  providedIn: 'root'
})
export class ChartviewService {
  chatcountUpdate = new BehaviorSubject({});
  NumberOfunreadmessages = new BehaviorSubject({});
  ledgerData:Array<any> =[];
  customerviewDetails: any;
  messageId: any;
  createdById: any;
  bindingdata:Array<any> =[];
  constructor(private _httpClient: HttpClient, public cmn: CommonComponent) {

    this.customerviewDetails = JSON.parse(localStorage.getItem('Customerviewchartdetails'));

    if (this.customerviewDetails !== null) {
      this.bindingdata.push(this.customerviewDetails);
    

    
      this.messageId = this.bindingdata[0].messengerId;
      this.createdById = this.bindingdata[0].createdById;
       this.getmessageslist(this.bindingdata[0].messengerId);

   

    }

  }

  getmessageslist(messageID): Promise<any> {
    return new Promise((resolve, reject) => {
      var body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "messengerId": messageID,
      }
      let url = this.cmn.commonUrl + "messenger/getChatDetails.spring";
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      
      this._httpClient.post(url, body).subscribe(r => {
        this.NumberOfunreadmessages.next(r), resolve(r);
      }, reject);
    }).catch(() => {
      swal('Session expired,<br/> Please login and try again.', 'Alert!', { enableHtml: true });
    });
  }
}
