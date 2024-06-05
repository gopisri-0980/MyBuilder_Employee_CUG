import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { promise } from 'protractor';
import { CommonComponent } from '../common/common.component';
import 'rxjs/add/operator/map'
import { Http, RequestOptions, Headers } from '@angular/http';
import { DeclareFunctionStmt } from '@angular/compiler';
import { _finally } from 'rxjs-compat/operator/finally';
declare const $: any;
declare const swal: any;

@Injectable({
  providedIn: 'root'
})
export class ModuleAndSiteAccessMastersService {

  constructor(private _httpClient: HttpClient, private cmn: CommonComponent) {

  }

  Employee_Details(): Promise<any> {
    return new Promise((resolve, reject) => {
      const body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "requestUrl":"master"
      }
      let url = this.cmn.commonUrl + "bookingFormService/getSalesTeamDetails.spring";
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


  Department_Details(): Promise<any> {
    return new Promise((resolve, reject) => {
      const body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      }
      let url = this.cmn.commonUrl + "login/getDepartmentsAndRoles.spring";
      let headers = new Headers({
        'Content-Type': 'application/json'
      });

      let options = new RequestOptions({ headers: headers });
      this._httpClient.post(url, body).subscribe(r => resolve(r), reject);
    }).catch(() => {
      swal('Session expired,<br/> Please login and try again.', 'Alert!', { enableHtml: true });
    });
  }


  Project_Details(siteIds): Promise<any> {
    return new Promise((resolve, reject) => {
      const body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "siteIds": siteIds
      }
      let url = this.cmn.commonUrl + "site/site.spring";

      console.log(url);
      console.log(body);

      //https://106.51.38.64:7777/SumadhuraGateway/employeeservice/site/allSites.spring


      let headers = new Headers({
        'Content-Type': 'application/json'
      });

      let options = new RequestOptions({ headers: headers });
      this._httpClient.post(url, body).subscribe(r => resolve(r), reject);
    }).catch(() => {
      swal('Session expired,<br/> Please login and try again.', 'Alert!', { enableHtml: true });
    });
  }


  submodules_details(roleid): Promise<any> {
    return new Promise((resolve, reject) => {
      const body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "roleId": roleid
      }
      let url = this.cmn.commonUrl + "login/getMenuSubmenuModules.spring";
      let headers = new Headers({
        'Content-Type': 'application/json'
      });

      let options = new RequestOptions({ headers: headers });
      this._httpClient.post(url, body).subscribe(r => resolve(r), reject);
    }).catch(() => {
      swal('Session expired,<br/> Please login and try again.', 'Alert!', { enableHtml: true });
    });
  }

  get_finally_submition(departmentId, roleId, sites, empIdToAssignModules, menuSubMenuPojoList) : Promise<any> {

    return new Promise((resolve, reject) => {
      const body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "departmentId": departmentId,
        "roleId": roleId,
        "sites": sites,
        "empIdToAssignModules": empIdToAssignModules,
        "menuSubMenuPojoList":menuSubMenuPojoList,
    }
    let url = this.cmn.commonUrl + "login/assignModuleAndSitesToEmployee.spring";

  
   
      let headers = new Headers({
        'Content-Type': 'application/json'
      });

      let options = new RequestOptions({ headers: headers });
      this._httpClient.post(url, body).subscribe(r => resolve(r), reject);
    }).catch(() => {
      swal('Session expired,<br/> Please login and try again.', 'Alert!', { enableHtml: true });
    });



  }


  get_second_finally_submition( sites, empIdToAssignModules) : Promise<any> {

    return new Promise((resolve, reject) => {
      const body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "sites": sites,
        "empIdToAssignModules": empIdToAssignModules,
    }
      let url = this.cmn.commonUrl + "login/assignSitesToEmployee.spring";

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


  get_employee_change_details(employeeId): Promise<any> {
    return new Promise((resolve, reject) => {
      const body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "empIdToAssignModules": employeeId
      }
      let url = this.cmn.commonUrl + "login/getEmpMenuSubmenuModules.spring";

      //http://localhost:8888/SumadhuraGateway/employeeservice/login/getEmpMenuSubmenuModules.spring

      let headers = new Headers({
        'Content-Type': 'application/json'
      });

      let options = new RequestOptions({ headers: headers });
      this._httpClient.post(url, body).subscribe(r => resolve(r), reject);
    }).catch(() => {
      swal('Session expired,<br/> Please login and try again.', 'Alert!', { enableHtml: true });
    });
  }



  get_submenu_finally_submition(departmentId, roleId, sites, empIdToAssignModules, menuSubMenuPojoList) : Promise<any> {

    return new Promise((resolve, reject) => {
      const body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "departmentId": departmentId,
        "roleId": roleId,
        "sites": sites,
        "empIdToAssignModules": empIdToAssignModules,
        "menuSubMenuPojoList":menuSubMenuPojoList,
        "action": "updateMenu"
    }
    let url = this.cmn.commonUrl + "login/assignModuleAndSitesToEmployee.spring";

 
   
      let headers = new Headers({
        'Content-Type': 'application/json'
      });

      let options = new RequestOptions({ headers: headers });
      this._httpClient.post(url, body).subscribe(r => resolve(r), reject);
    }).catch(() => {
      swal('Session expired,<br/> Please login and try again.', 'Alert!', { enableHtml: true });
    });

  }


  Get_Menu_Details(): Promise<any> {
    return new Promise((resolve, reject) => {
      const body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      }
      let url = this.cmn.commonUrl + "login/getMenuModuleList.spring";
      let headers = new Headers({
        'Content-Type': 'application/json'
      });

      let options = new RequestOptions({ headers: headers });
      this._httpClient.post(url, body).subscribe(r => resolve(r), reject);
    }).catch(() => {
      swal('Session expired,<br/> Please login and try again.', 'Alert!', { enableHtml: true });
    });
  }



  Get_Sub_Menu_Details(): Promise<any> {
    return new Promise((resolve, reject) => {
      const body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      }
      let url = this.cmn.commonUrl + "login/getSubModuleList.spring";
      let headers = new Headers({
        'Content-Type': 'application/json'
      });

      let options = new RequestOptions({ headers: headers });
      this._httpClient.post(url, body).subscribe(r => resolve(r), reject);
    }).catch(() => {
      swal('Session expired,<br/> Please login and try again.', 'Alert!', { enableHtml: true });
    });
  }

  get_Update_new_menu_to_all(roleId , menuSubmenuMappingPresentList): Promise<any> {
    return new Promise((resolve, reject) => {
      const body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "roleId": roleId,
        "menuSubmenuMappingPresentList":menuSubmenuMappingPresentList
      }

      let url = this.cmn.commonUrl + "login/saveMenuSubMenuePresent.spring";

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
