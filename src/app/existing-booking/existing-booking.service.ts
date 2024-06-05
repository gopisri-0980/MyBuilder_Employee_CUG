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
export class ExistingBookingService {

  constructor(private _httpClient: HttpClient, private cmn: CommonComponent) {

  }



  getKycdocuments_list(): Promise<any> {
    return new Promise((resolve, reject) => {
      const body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "requestUrl": "getBookingDetails"
      }
      let url = this.cmn.commonUrl + "bookingFormService/getKycDocumentsList.spring";

      let headers = new Headers({
        'Content-Type': 'application/json'
      });

      let options = new RequestOptions({ headers: headers });
      this._httpClient.post(url, body).subscribe(r => resolve(r), reject);
    }).catch(() => {
      swal('Session expired,<br/> Please login and try again.', 'Alert!', { enableHtml: true });
    });
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


  getstate_list(country_id): Promise<any> {
    return new Promise((resolve, reject) => {
      const body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "countryId" : country_id

      }
      let url = this.cmn.commonUrl + "notification/getCountryStateList.spring";
// https://106.51.38.64:7777/SumadhuraGateway/employeeservice/notification/getAllStateList.spring
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


  getFlat_details(siteids): Promise<any> {
    return new Promise((resolve, reject) => {
      const body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "requestUrl": "nonBookedBlocks",
        "siteId": siteids
      }
      let url = this.cmn.commonUrl + "bookingFormService/getNonBookedDetails.spring";

      console.log(url);
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

  getblock_details(siteids, blockDetId): Promise<any> {
    return new Promise((resolve, reject) => {
      const body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "requestUrl": "nonBookedFloor",
        "siteId": siteids,
        "blockDetId": blockDetId
      }
      let url = this.cmn.commonUrl + "bookingFormService/getNonBookedDetails.spring";

      let headers = new Headers({
        'Content-Type': 'application/json'
      });

      let options = new RequestOptions({ headers: headers });
      this._httpClient.post(url, body).subscribe(r => resolve(r), reject);
    }).catch(() => {
      swal('Session expired,<br/> Please login and try again.', 'Alert!', { enableHtml: true });
    });
  }


  getunit_details(siteids, blockDetId, floorDetId): Promise<any> {
    return new Promise((resolve, reject) => {
      const body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "requestUrl": "nonBookedFlats",
        "siteId": siteids,
        "blockDetId": blockDetId,
        "floorDetId": floorDetId
      }
      let url = this.cmn.commonUrl + "bookingFormService/getNonBookedDetails.spring";

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






  get_unitbooking_details(flatids): Promise<any> {
    return new Promise((resolve, reject) => {
      const body = {
        "flatId": flatids,
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "requestUrl": "getBookingDetails"
      }
      let url = this.cmn.commonUrl + "bookingFormService/getFlatDetails.spring";

      let headers = new Headers({
        'Content-Type': 'application/json'
      });

      let options = new RequestOptions({ headers: headers });
      this._httpClient.post(url, body).subscribe(r => resolve(r), reject);
    }).catch(() => {
      swal('Session expired,<br/> Please login and try again.', 'Alert!', { enableHtml: true });
    });
  }


  get_Country_List(): Promise<any> {
    return new Promise((resolve, reject) => {
      const body = {

        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),

      }
      let url = this.cmn.commonUrl + "bookingFormService/getCountryList.spring";

      let headers = new Headers({
        'Content-Type': 'application/json'
      });

      let options = new RequestOptions({ headers: headers });
      this._httpClient.post(url, body).subscribe(r => resolve(r), reject);
    }).catch(() => {
      swal('Session expired,<br/> Please login and try again.', 'Alert!', { enableHtml: true });
    });
  }

  get_citys_List(state_id): Promise<any> {
    return new Promise((resolve, reject) => {
      const body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "stateId":state_id
      }
      let url = this.cmn.commonUrl + "bookingFormService/getCityList.spring";

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


  get_schemes_list(projectid): Promise<any> {
    return new Promise((resolve, reject) => {
      const body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "siteId":projectid
      }
      let url = this.cmn.commonUrl + "bookingFormService/getFinSchemes.spring";

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

  get_oldsalesforesbookingid(projectid): Promise<any> {
    return new Promise((resolve, reject) => {
      const body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "siteId":projectid,
        "requestFrom":"createExistingBooking"
      }

      //http://localhost:8066/Gateway/employeeservice/bookingFormService/getOldSalesForesBookingIds.spring
      let url = this.cmn.commonUrl + "bookingFormService/getOldSalesForesBookingIds.spring";
    

      let headers = new Headers({
        'Content-Type': 'application/json'
      });

      let options = new RequestOptions({ headers: headers });
      this._httpClient.post(url, body).subscribe(r => resolve(r), reject);
    }).catch(() => {
      swal('Session expired,<br/> Please login and try again.', 'Alert!', { enableHtml: true });
    });
  }

  GetCustomernamefun(sessionKey, customername,siteId): Promise<any> {
    return new Promise((resolve, reject) => {
      const body = {
        "customerName":null,
        "sessionKey":sessionKey,
        "requestUrl" : "getPendingActiveFlats",
        "siteId" : siteId
        //"requestUrl" : "getPendingActiveFlats",
      }
      console.log("-------------cust name :"+JSON.stringify(body));
      let url = this.cmn.commonUrl + "references/searchCustomer.spring";
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


  get_pan_number_fun(customerName, pancard): Promise<any> {
    return new Promise((resolve, reject) => {
      const body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "customerName": customerName,
        "pancard": pancard
      }
      let url = this.cmn.commonUrl + "bookingFormService/getExistingPanCardDetails.spring";

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
  

  get_customer_name_validation_fun(customerName, customer_id): Promise<any> {
    return new Promise((resolve, reject) => {
      const body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "custId": customer_id,
        "custName": customerName
      }
      let url = this.cmn.commonUrl + "bookingFormService/updateCustomerName.spring";

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
  
  get_site_list_details(projectid): Promise<any> {
    return new Promise((resolve, reject) => {
      const body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "siteId": projectid
      }
      let url = this.cmn.commonUrl + "financial/getMileStoneSetsDtls.spring";
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

