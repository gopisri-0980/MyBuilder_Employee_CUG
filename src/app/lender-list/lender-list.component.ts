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

@Component({
  selector: 'app-lender-list',
  templateUrl: './lender-list.component.html',
  styleUrls: ['./lender-list.component.sass']
})
export class LenderListComponent implements OnInit {
  alias_name: any;
  name: any;
  address: any;
  mobileNumber: any;
  emailId: any;
  lenderList : any=[]
  lendordata: any;
  constructor(private deviceService: DeviceDetectorService, private router: Router, private http: Http, public cmn: CommonComponent) {
     $('.page-loader-wrapper').hide();  
    this.LenderList("")
   }

  ngOnInit() {
    $(function(){
      $("#statusID").select2({
        placeholder: "--Select--",
        dir: "ltl",
      });
    })
  }


  getDetails(){
    var statusId = $('#statusID').val()
    if(statusId == "select"){
      swal("please select status")
      return false;
    }
    this.LenderList(statusId)
  }
  LenderList(staus){
 
    
    $(".page-loader-wrapper").show();

    let url = this.cmn.commonUrl + "lendor/getLendorDetails.spring";
   // http://localhost:8888/SumadhuraGateway/employeeservice/lendor/getLendorDetails.spring
    console.log(url)
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body;
  
    if(staus == ""){
      body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "requestUrl":"getLendorDetails.spring"
      }
      }else{
       
        body = {
          "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
          "requestUrl":"getLendorDetails.spring",
          "statusId":staus,
        }
      }
    
   
console.log(JSON.stringify(body))
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
    
      console.log("---Lender list :"+JSON.stringify(resp))
      console.log(resp);
      $(".page-loader-wrapper").hide();
      if (resp.responseCode == 200) {
        this.lenderList = resp.responseObjList
        setTimeout(function () {
          $(document).ready(function () {
            $('#tableExport').DataTable({
              pageLength: 10,
              lengthMenu: [[10, 20, -1], [10, 20, 'Todos']],
              dom: 'Bfrltip',
              buttons: [
                'copy', 'csv', 'excel', 'print', {
                  extend: 'pdfHtml5',
                  orientation: 'landscape',
                  pageSize: 'LEGAL'
                }
              ],
              retrieve: true,
              "scrollY": false,
              "scrollCollapse": true,
              "scrollX": true,
              "autoWidth": false,
              "iCookieDuration": 60,
              "bStateSave": true,
              "ordering" : true,
              "fnStateSave": function (oSettings, oData) {
                localStorage.setItem('offersDataTables', JSON.stringify(oData));
              },
              "fnStateLoad": function (oSettings) {
                return JSON.parse(localStorage.getItem('offersDataTables'));
              },
              

            })

          });

        }, 2000)

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
  lenderDetailspage(data){
   this.lendordata = JSON.stringify(data)
   sessionStorage.setItem('lender_view',this.lendordata);
//alert(this.lendordata)
   this.router.navigate(["lendor-view-details"],{ state: this.lendordata});
  }

  
  homeClick() {
    this.cmn.commonHomeNavigation();
  }
 
}
