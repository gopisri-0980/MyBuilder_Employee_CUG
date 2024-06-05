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
export class ProjectwiseEscalationReportService {
  selected_projectid: any;

  constructor(private _httpClient: HttpClient, private cmn: CommonComponent) {
 
  }


  
  EscalationTicketsDetailsCount(fromDate, toDate , selected_projectid): Promise<any> {
    return new Promise((resolve, reject) => {

      if(fromDate == ""){
        fromDate = null;
      }

      if(toDate == ""){
        toDate = null;
      }

      if (selected_projectid == null || selected_projectid == "null" || selected_projectid == undefined || selected_projectid == ""){
        this.selected_projectid = null;
      } else {
        this.selected_projectid = [JSON.parse(selected_projectid)] ;
      }

      const body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "startDate": fromDate,
        "endDate": toDate,
        "siteIds":  this.selected_projectid,
      }

    
      let url = this.cmn.commonUrl + "ticketreport/getEscalationTicketsDetailsCount.spring";

      console.log(url);
      console.log(JSON.stringify(body));
      console.log(body);

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
