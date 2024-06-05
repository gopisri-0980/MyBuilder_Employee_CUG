import { Component, OnInit } from '@angular/core';
//import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Http, RequestOptions, Headers } from '@angular/http';
import { CommonComponent } from '../common/common.component';
import { CustomerEmpServiceService } from "../customer-emp-service.service";
//import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
declare const $: any;
declare const swal:any;
var mychcklist_approveCustomer = [];

@Component({
  selector: 'app-approvedcustomer',
  templateUrl: './approvedcustomer.component.html',
  styleUrls: ['./approvedcustomer.component.sass']
})
export class ApprovedcustomerComponent implements OnInit {
  tabledata: { "leadId": string; "applicantName": string; "project": string; "block": string; "unit": string; }[];
  mybookingform: boolean;
  MrMrsMs: any;
  inputText: string;
  showLoadingIndicatior: boolean;
  genderInfo: string;
  approveCustData: any;
  approveCustArray: any;
  constructor(private router: Router, private http: Http, public cmn: CommonComponent, private _service: CustomerEmpServiceService) {
    this.inputText = "I am sample text";
    this.mybookingform = true;
    this.MrMrsMs = "Mr";
    this.genderInfo = "no";
    $('.page-loader-wrapper').hide();
    this.getApproveCustomerList();
    sessionStorage.setItem('fromviewpagepredefined', null);
  }
  modalDismiss(){
    window.location.reload();
  }
  ngOnInit() {
    
  }
  leadId() {
    this.router.navigate(['bookingform']);
  }

  ngAfterViewInit() {

    $('.js-basic-example').DataTable({
      responsive: true
    });

    $('.save-stage').DataTable({
      "scrollX": true,
      stateSave: true
    });

    var t = $('#example3').DataTable({
      "scrollX": true
    });
    var counter = 1;



  }


  getApproveCustomerList() {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "bookingFormService/getFormsList.spring";
    var body = {
      "sessionKey":""+sessionStorage.getItem("login_sessionkey"),
      "requestUrl": "getFormsList"
    }
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      console.log("Approved list----------" + JSON.stringify(resp));
      if (resp.responseCode == 200) {
        this.tabledata = resp.applicantInfo;
        setTimeout(function () {
          $('#tableExport').DataTable();
        }, 1000);
        $('.page-loader-wrapper').hide();
      }else if(resp.responseCode == 440){
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
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
      }
    );
  }


  getApproveCustomer(data) {



    // $('.page-loader-wrapper').show();
    var flatBookingId = data.flatBookingId;
    var cutID = data.customerId;
    //alert(flatBookingId)
    sessionStorage.setItem("custId", cutID)
    sessionStorage.setItem("flatBookingId", flatBookingId)
    this.router.navigate(['approvebooking']);
    // let url = this.cmn.commonUrl + "bookingFormService/getBookingDetails.spring";
    // console.log("url :" + url);
    // let headers = new Headers({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ headers: headers });
    // var body = {
    //   "customerId": cutID,
    //   "flatBookingId":flatBookingId,
    //   "sessionKey":""+sessionStorage.getItem("login_sessionkey"),
    //   "requestUrl": "getBookingDetails"
    // }
    // console.log("body :"+JSON.stringify(body));
    // this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
    //   $('.page-loader-wrapper').hide();
    //   console.log("Booking Data:  " + JSON.stringify(resp));
    //   if (resp.responseCode == 200) {
    //     $('.page-loader-wrapper').hide();
    //     this.approveCustData=resp;
    //     sessionStorage.setItem('approveCustData',JSON.stringify(this.approveCustData));
    //     sessionStorage.setItem('getPageName', "approveCustomerPage");
    //     this.router.navigate(['approvebooking'],  {state: this.approveCustData});
    //   }else if(resp.responseCode == 440){
    //     swal("Your Session has been Timed Out!", "Please login once again.", "error");
    //     this.router.navigate([""]);
    //   }else{
    //     $('.page-loader-wrapper').hide();
    //     swal(resp.errors[0]);
    //     return false;
    //   }
    // },
    //   error => {

    //     console.log(error);
    //     var error=JSON.parse(error._body).responseCode;
    //     //alert(error);
    //     $('.page-loader-wrapper').hide();
    //     if(error == 440){
    //       swal("Your Session has been Timed Out!", "Please login once again.", "error");
    //       this.router.navigate([""]);
    //     }
    //   }
    // );
  }


  approveOrRejectCustomer(action){

    $.each($(".checlist:checked"), function(){ 
      debugger;
          console.log($(this).is(":checked"));
          if($(this).is(":checked") == true){
          //  console.log($(this).val());
           // var myticketid = $(this).val();
           mychcklist_approveCustomer.push();
           
          mychcklist_approveCustomer.push({
            "customerId": $(this).val().split(",")[2],
            "custName": $(this).val().split(",")[1],
            "flatBookingId": $(this).val().split(",")[3],
            "leadId": $(this).val().split(",")[0]
          });
                 
          }
          console.log("Approve customer array :"+JSON.stringify(mychcklist_approveCustomer));
    });
       
    if(mychcklist_approveCustomer.length == 0){
      alert("Please select atleast one record");
      return false;
    }

    $('.page-loader-wrapper').show();
    //var customerId = $("#customerId").val();
   // var flatBookingId = $("#flatBookingId").val();
   //this.approveCustArray = eval("("+mychcklist_approveCustomer+")");
    var data = {
        "bookingFormApproveRequest" : mychcklist_approveCustomer,
        "sessionKey":""+sessionStorage.getItem("login_sessionkey"),
        "requestUrl":"actionBookingDetails",
        "actionStr":action
    }
      console.log("approve customer body "+JSON.stringify(data));
      
    var url = this.cmn.commonUrl + "bookingFormService/actionBookingDetails.spring";
    console.log(url);

    this.http.post(url, data).map(res => res.json()).subscribe(resp => {
      console.log("Booking Data:  " + JSON.stringify(resp));
      if (resp.responseCode == 200) {
        if (action == "approve") {
          debugger;
          var statusData = resp.bookingFormSavedStatuses;
          var str = "";
          for (var i = 0; i < statusData.length; i++) {
            var color;
            if (statusData[i].status == "success") {
              color = "green";
            } else {
              color = "red";
            }
            str += '<tr>';
            str += '<td class="text-center">' + (i + 1) + '</td>';
            str += '<td class="text-center">' + statusData[i].leadId + '</td>';
            str += '<td class="text-center">' + statusData[i].custName + '</td>';
            str += '<td><span style="color:' + color + ';text-center;">' + statusData[i].status + '</span></td>';
            if (statusData[i].status == "success") {
              str += '<td style="text-align:center;">-</td>';
            }else{
              str += '<td><span style="color:' + color + ';text-center; word-break: break-all;">' + statusData[i].error + '</span></td>';
            }
            str += '<tr>';
          }
          $("#responseData").html(str);      
          var error= $("#statusData").modal();
          $('.page-loader-wrapper').hide();
         // window.location.reload();
          //swal("Good job!", "You have been approved customer.", "success");
         // $(".modal").modal('hide');
        } else {
          var statusData = resp.bookingFormSavedStatuses;
          var str = "";
          for (var i = 0; i < statusData.length; i++) {
            var color;
            if (statusData[i].status == "success") {
              color = "green";
            } else {
              color = "red";
            }
            str += '<tr>';
            str += '<td class="text-center">' + (i + 1) + '</td>';
            str += '<td class="text-center">' + statusData[i].leadId + '</td>';
            str += '<td class="text-center">' + statusData[i].custName + '</td>';
            str += '<td><span style="color:' + color + ';text-center;">' + statusData[i].status + '</span></td>';
            if (statusData[i].status == "success") {
              str += '<td style="text-align:center;">-</td>';
            }else{
              str += '<td><span style="color:' + color + ';text-center; word-break: break-all;">' + statusData[i].error + '</span></td>';
            }
            str += '<tr>';
          }
          $("#responseData").html(str);      
          var error=  
          $("#statusData").modal();
          $('.page-loader-wrapper').hide();
        //  window.location.reload();
         // swal("Good job!", "You have been rejected customer.", "info");
         // $(".modal").modal('hide');
        }
      } else if (resp.responseCode == 440) {
        $('.page-loader-wrapper').hide();
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);

      } else {
        $('.page-loader-wrapper').hide();
        swal("Error!", "Internal server error.", "error");
        $(".modal").modal('hide');
        this.router.navigate(['approvedcustomer']);
      

      }
    },
      error => {
        $('.page-loader-wrapper').hide();
        var error = JSON.parse(error._body).responseCode;
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );


  }

  

  homeClick(){
    this.cmn.commonHomeNavigation();
  }
}
