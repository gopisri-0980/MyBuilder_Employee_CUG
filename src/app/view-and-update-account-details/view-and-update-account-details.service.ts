import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { promise } from 'protractor';
import { CommonComponent } from '../common/common.component';
import 'rxjs/add/operator/map'
import { Http, RequestOptions, Headers } from '@angular/http';
declare const $: any;
declare const swal: any;

@Injectable({
  providedIn: 'root'
})
export class ViewAndUpdateAccountDetailsService {
  chatcountUpdate = new BehaviorSubject({});
  NumberOfunreadmessages = new BehaviorSubject({});
  NamePlatesUpdate = new BehaviorSubject({});

  constructor(public cmn: CommonComponent, private _httpClient: HttpClient,) {
  }

  Get_project_list(siteId): Promise<any> {
    return new Promise((resolve, reject) => {
      const body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "siteIds": siteId
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

  Get_setoff_type_list(): Promise<any> {
    return new Promise((resolve, reject) => {
      const body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "requestUrl":"bankaccount"
      }

      let url = this.cmn.commonUrl + "financial/loadTransactionStatusData.spring";
      let headers = new Headers({
        'Content-Type': 'application/json'
      });
      let options = new RequestOptions({ headers: headers });
      this._httpClient.post(url, body).subscribe(r => resolve(r), reject);
    }).catch(() => {
      swal('Session expired,<br/> Please login and try again.', 'Alert!', { enableHtml: true });
    });
  }


  Get_bank_names_list(): Promise<any> {
    return new Promise((resolve, reject) => {
      const body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      }

      let url = this.cmn.commonUrl + "financial/getBank.spring";
      let headers = new Headers({
        'Content-Type': 'application/json'
      });
      let options = new RequestOptions({ headers: headers });
      this._httpClient.post(url, body).subscribe(r => resolve(r), reject);
    }).catch(() => {
      swal('Session expired,<br/> Please login and try again.', 'Alert!', { enableHtml: true });
    });
  }


  Get_owner_type_list(siteId): Promise<any> {
    return new Promise((resolve, reject) => {
      const body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "siteId": siteId,
        "requestUrl": "getSaleOwners"
      }

      let url = this.cmn.commonUrl + "financial/getFlatSaleOwners.spring";
      let headers = new Headers({
        'Content-Type': 'application/json'
      });
      let options = new RequestOptions({ headers: headers });
      this._httpClient.post(url, body).subscribe(r => resolve(r), reject);
    }).catch(() => {
      swal('Session expired,<br/> Please login and try again.', 'Alert!', { enableHtml: true });
    });
  }



  Get_search_list(bank_id, siteId, saleOwnerId, setoffTypeId, accountHolderName): Promise<any> {
    return new Promise((resolve, reject) => {
      const body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "finbankId": bank_id,
        "siteId": siteId,
        "saleOwnerId": saleOwnerId,
        "setoffTypeId": setoffTypeId,
        "accountHolderName": accountHolderName
      }

      let url = this.cmn.commonUrl + "financial/viewBankAccount.spring";

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



  Get_delete_function(finprojAccId, finprojAccMapId): Promise<any> {
    return new Promise((resolve, reject) => {
      const body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "finprojAccId": finprojAccId,
        "finprojAccMapId": finprojAccMapId,
        "action": "delete"
      }

      let url = this.cmn.commonUrl + "financial/updateBankAccount.spring";
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
