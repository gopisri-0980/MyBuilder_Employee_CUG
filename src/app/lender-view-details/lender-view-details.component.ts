import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, NavigationExtras, RouteReuseStrategy } from "@angular/router";
import { Http, RequestOptions, Headers } from '@angular/http';
import { HttpClient } from "@angular/common/http";
import { CommonComponent } from '../common/common.component';
import 'rxjs/add/operator/map';
import { DeviceDetectorService } from 'ngx-device-detector';
//import { ViewticketsService } from './viewtickets.service';
import {
  FormGroup, FormControl, Validators,
  ValidatorFn, AbstractControl
} from "@angular/forms";
declare const $: any;
declare const swal: any;
declare const autosize: any;
declare const moment: any;
var json_response;
@Component({
  selector: 'app-lender-view-details',
  templateUrl: './lender-view-details.component.html',
  styleUrls: ['./lender-view-details.component.sass']
})
export class LenderViewDetailsComponent implements OnInit {
  alias_name: any;
  name: any;
  address: any;
  mobileNumber: any;
  emailId: any;
  createdDate: any;
  updatesession: string;

  constructor(private deviceService: DeviceDetectorService, private router: Router, private http: Http, public cmn: CommonComponent) {
     $('.page-loader-wrapper').hide();  
//    this.updatesession =  sessionStorage.getItem("fromupdatelist")
//    if(this.updatesession == "true"){
// $(function(){
//   $("#alias_name").removeAttr("disabled");
//   $("#name").removeAttr("disabled");
//   $("#address").removeAttr("disabled");
//   $("#mobileNumber").removeAttr("disabled");
//   $("#emailId").removeAttr("disabled");
//   $("#createdDate").removeAttr("disabled");
// })
//    }
    json_response = eval('(' + sessionStorage.getItem('lender_view') + ')');
    this.alias_name = json_response.aliasName
    this.name = json_response.name
    this.address = json_response.address
    this.mobileNumber = json_response.mobileNo
    this.emailId = json_response.emailId
   // this.createdDate = json_response.createdDate
    var date = new Date(json_response.createdDate)
    var dd = date.getDate()
    var mm = date.getMonth() +1
    var yy = date.getFullYear()
 //   alert(dd+"/"+mm+"/"+yy)
    this.createdDate = dd+"/"+mm+"/"+yy
   }

  ngOnInit() {
  }
  updateLender(){
  // alert(this.alias_name)
    let alias_name = this.alias_name
    if(alias_name == "" || alias_name == undefined){
      swal("Please enter alias name")
      return false;
    }

    var name = this.name
    if(name == "" || name == undefined){
      swal("Please enter name")
      return false;
    }

   
    var address = this.address
    if(address == "" || address == undefined){
      swal("Please enter address")
      return false;
    }
   
    var mobile_Number = this.mobileNumber
//alert(this.mobileNumber)
if(this.mobileNumber!= undefined){
  //alert(this.mobileNumber.length)
  // if (this.mobileNumber.length < 10) {
  //   swal("Please enter valid mobile number");
  //   return false;
  // }

  // if (this.mobileNumber.length > 15) {
  //   swal("Please enter valid mobile number");
  //   return false;
  // }

  let filter_mobile = /^[0-9]{1,15}$/;
  if (!filter_mobile.test(this.mobileNumber)) {
    swal("Please enter valid mobile number");
    this.mobileNumber = "";
    
  }

}


    var email_Id = this.emailId

    if(this.emailId != undefined ){
     // alert(this.emailId)
      let filter_email = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
      if (!filter_email.test(this.emailId)) {
        this.emailId = "";
        swal("Please enter valid email");
        return false;
      }
    }

    
    $(".page-loader-wrapper").show();

    let url = this.cmn.commonUrl + "lendor/saveLendorDetails.spring";
   // http://localhost:8888/SumadhuraGateway/employeeservice/lendor/saveLendorDetails.spring
    console.log(url)
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "name":name,
      "address":address,
      "emailId":email_Id,
      "aliasName":alias_name,
      "statusId":6,
      "status":"save",
      "mobileNo":mobile_Number,
      "createdBy":74,
      "requestUrl":"saveLendorDetails.spring"
 
    }
console.log(JSON.stringify(body))
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
    
      console.log(JSON.stringify(resp))
      console.log(resp);
      $(".page-loader-wrapper").hide();
      if (resp.responseCode == 200) {
        
        this.alias_name = ""
        this.name = ""
        this.address = ""
        this.mobileNumber = ""
        this.emailId = ""
      swal("Lender created successfully")
      } else if (resp.responseCode == 700) {
        swal("Error!", "Your session has been expired.", "error");
        this.router.navigate(['']);
      } else if (resp.responseCode == 440) {
        swal("Error!", "Your session has been expired.", "error");
        this.router.navigate([""]);
      } else {
         $('.page-loader-wrapper').hide();  
        swal(resp.errors[0]);
        return false;
      }
    },
      error => {
        $(".page-loader-wrapper").hide();
        swal("Error!", "Internal server error.", "error");
        var error = JSON.parse(error._body).responseCode;
        //alert(error);
         $('.page-loader-wrapper').hide();  
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }
  public numbersOnlyValidator(event: any) {
    const pattern = /^[0-9\-]*$/;
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^0-9\-]/g, "");
    }
  }

  checkmob_num(e) {
    console.log('val')
    if (e.target.value.length > 15) {
      e.target.value = e.target.value.slice(0, -1)
    }
  }

  valid_name(e) {
    let filter_name = /^[a-zA-Z ]{1,30}$/;
    console.log(filter_name.test(this.name));
    if (!filter_name.test(this.name.trim())) {
      // alert('random');
      this.name = this.name.substr(0, this.name.length - 1);
      return false;
    }
  }

  alias_Name(e) {
    let filter_name = /^[a-zA-Z ]{1,30}$/;
    console.log(filter_name.test(this.alias_name));
    if (!filter_name.test(this.alias_name.trim())) {
      // alert('random');
      this.alias_name = this.alias_name.substr(0, this.alias_name.length - 1);
      return false;
    }
  }

  homeClick() {
   
    this.router.navigate(['dashboard']);
  }


  lendorList(){
    this.router.navigate(["lendor-list"]);
  }
}
