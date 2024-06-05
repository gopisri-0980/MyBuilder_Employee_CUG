import { Component, OnInit, ViewChild } from '@angular/core';

import { Router, NavigationExtras } from "@angular/router";
import { Http, RequestOptions, Headers } from '@angular/http';
import { HttpClient } from "@angular/common/http";
import { CommonComponent } from '../common/common.component';

import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { ViewCarparkingInvoiceService } from './view-carparking-invoice.service';

declare const $: any;
declare const swal: any;

@Component({
  selector: 'app-view-carparking-invoice',
  templateUrl: './view-carparking-invoice.component.html',
  styleUrls: ['./view-carparking-invoice.component.sass']
})
export class ViewCarparkingInvoiceComponent implements OnInit {

  @ViewChild('raiseInvoice') form: NgForm;
  modificationdetails: Array<any> = [];
  Approvependinginvoicedata: any;
  customerName: any;
  GSTAmount: number;
  transactionAmount: number = 0;
  percentageValue: any;
  percentageID: any;
  CGSTAmount: number;
  SGSTAmount: number;
  afterGST: any;
  siteName: any;
  flatNo: any;
  floorName: any;
  commentsdata: Array<any> = [];
  commentstext: any;
  controller: Array<any> = [];
  employeeid: any;
  percentageId: any;
  modiCostDtlsRequests: Array<any> = [];
  buttontype: string;


  constructor(private router: Router, private service: ViewCarparkingInvoiceService, private http: Http, public cmn: CommonComponent) {
    $('.page-loader-wrapper').hide();
  }

  ngOnInit() {


    this.Approvependinginvoicedata = JSON.parse(sessionStorage.getItem("userdata"));

    console.log(this.Approvependinginvoicedata);

    if (this.Approvependinginvoicedata !== null || this.Approvependinginvoicedata !== "null" || this.Approvependinginvoicedata !== "undefined" || this.Approvependinginvoicedata !== undefined) {

      this.modification_Invoice(this.Approvependinginvoicedata.siteId, this.Approvependinginvoicedata.bookingFormId, this.Approvependinginvoicedata.finBookingFormCarParkingCostId);

    }




  }


  modification_Invoice(siteId, bookingFormId, finBookingFormModiCostId) {
    $('.page-loader-wrapper').show();
    this.service.getModificationInvoice(siteId, bookingFormId, finBookingFormModiCostId).then(resp => {
      console.log(resp);
      console.log(JSON.stringify(resp));
      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();


        if (resp.responseObjList.length !== 0) {
          this.controller = resp.responseObjList;
          

          this.customerName = resp.responseObjList[0].customerPropertyDetailsInfo.customerName;
          this.siteName = resp.responseObjList[0].customerPropertyDetailsInfo.siteName;
          this.flatNo = resp.responseObjList[0].customerPropertyDetailsInfo.flatNo;
          this.floorName = resp.responseObjList[0].customerPropertyDetailsInfo.floorName
          this.modificationdetails = resp.responseObjList[0].finBookingFormCarParkingCostDtlsList;

          console.log(this.modificationdetails);

          for (var i = 0; i < this.modificationdetails.length; i++) {
            if (this.modificationdetails[i].quantity != undefined && this.modificationdetails[i].quantity != "" && this.modificationdetails[i].rate != "") {
              this.modificationdetails[i].amount = (this.modificationdetails[i].quantity) * (this.modificationdetails[i].rate);
              this.transactionAmount += this.modificationdetails[i].amount;
              this.percentageValue = this.modificationdetails[i].percentageValue;
            }

          }

          this.commentsdata = resp.responseObjList[0].approveRejectDetailsListCR;
          for (var i = 0; i < this.commentsdata.length; i++) {
            this.commentstext = this.commentsdata[i].comments;
          }


          this.valbindFun(this.percentageValue);

          $(function () {
            $("#companybankAcId").select2({
              placeholder: "Search Company Bank Account",
              dir: "ltl"
            });
          })
          
          if(resp.responseObjList[0].siteAccountId !== undefined){
            this.siteBank_Ac_List(this.Approvependinginvoicedata.siteId, resp.responseObjList[0].siteAccountId)
          }

        }
      
        
      } else if (resp.responseCode == 440) {
        $('.page-loader-wrapper').hide();
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
      }
    });

  }


  valbindFun(percent) {
    this.percentageID = percent;
    this.GSTAmount = (this.transactionAmount * percent) / 100;
    var CGSTAmount = this.GSTAmount / 2;
    this.CGSTAmount = CGSTAmount;
    var SGSTAmount = this.GSTAmount / 2;
    this.SGSTAmount = SGSTAmount;
    var afterGST = (this.transactionAmount + this.GSTAmount).toFixed(3);
    this.afterGST = afterGST;
  }

  homeClick() {
    this.router.navigateByUrl("approve-carparking-invoices");
  }

  Approvefun(usertype) {

    console.log(this.controller);

    if (usertype == 'Approve') {
      this.buttontype = 'Approve';

    } else if (usertype == 'Reject') {
      this.buttontype = 'Reject';
    }

    this.modiCostDtlsRequests = [];

    // console.log(this.controller[0].approveRejectDetailsList);
    // console.log(this.controller[0].finBookingFormModiCostDtlsList);

    for (var i = 0; i < this.controller[0].approveRejectDetailsListCR.length; i++) {
      this.employeeid = this.controller[0].approveRejectDetailsListCR[i].empId;
    }

    for (var i = 0; i < this.controller[0].finBookingFormCarParkingCostDtlsList.length; i++) {
      this.percentageId = this.controller[0].finBookingFormCarParkingCostDtlsList[i].percentageId;
      this.percentageValue = this.controller[0].finBookingFormCarParkingCostDtlsList[i].percentageValue;
      this.modiCostDtlsRequests.push({
        'finBookingCarParkingCostDetailsId': this.controller[0].finBookingFormCarParkingCostDtlsList[i].finBookingCarParkingCostDetailsId,
        'carParkingChargeDesc': this.controller[0].finBookingFormCarParkingCostDtlsList[i].carParkingChargeDesc,
        'units': this.controller[0].finBookingFormCarParkingCostDtlsList[i].units,
        'quantity': this.controller[0].finBookingFormCarParkingCostDtlsList[i].quantity,
        'rate': this.controller[0].finBookingFormCarParkingCostDtlsList[i].rate,
        'basicAmount': this.controller[0].finBookingFormCarParkingCostDtlsList[i].basicAmount,
        'actionType': 'N/A'
      });
    }

   



    $(".page-loader-wrapper").show();
    var url = this.cmn.commonUrl + "financial/approveCarParkingChargesEntry.spring";
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteId": this.controller[0].customerPropertyDetailsInfo.siteId,
      "siteName": this.controller[0].customerPropertyDetailsInfo.siteName,
      "finBookingFormCarParkingCostId": this.controller[0].finBookingFormCarParkingCostId,
      "finsetOffAppLevelId": this.controller[0].finsetOffAppLevelId,
      "flatIds": [this.controller[0].customerPropertyDetailsInfo.flatId],
      "bookingFormId": this.controller[0].bookingFormId,
      "transactionAmount": this.afterGST,
      "percentageId": this.percentageId,
      "percentageValue": this.percentageValue,
      "buttonType": this.buttontype,
      "carParkingCostDtlsRequests": this.modiCostDtlsRequests,
      "comment": $("#Comments").val(),
      "siteAccountId": $("#companybankAcId").val(),
      "siteBankAccountNumber": $('#companybankAcId').select2('data')[0].text,
    }

    console.log(body);

 

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

      console.log(resp);

      $(".page-loader-wrapper").hide();

      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        if (resp.responseObjList == null) {
          swal("Car Parking Invoice " + this.buttontype + " successfully");
          setTimeout(() => {
            this.router.navigateByUrl('approve-carparking-invoices');
          }, 2000);

        } else {
          if (resp.responseObjList.url !== undefined || resp.responseObjList.url !== null || resp.responseObjList.url !== "null") {
            swal("Car Parking Invoice " + this.buttontype + " successfully");
            window.open(resp.responseObjList.url, "_blank");
            setTimeout(() => {
              this.router.navigateByUrl('approve-carparking-invoices');
            }, 3000);

          }
        }
      } else if (resp.responseCode == 440) {
        $('.page-loader-wrapper').hide();
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
      }

    }, error => {
      $('.page-loader-wrapper').hide();
      console.log(error);
      var error = JSON.parse(error._body).responseCode;
      if (error == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      }


    });
  }

  siteBank_Ac_List(siteid, binval) {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl2 + "financial/viewFinProjectAccountDataForInvoices.spring";
    console.log("ac num url :" + url)
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteIds": [siteid],
      "condition": "CAR_PARKING_COST",
      "requestUrl": "createModiInvoicePage"
    }

    console.log("ac num req :" + JSON.stringify(body));

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      console.log("ac num response :" + JSON.stringify(resp));

      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        $('#companybankAcId').html('');
        $('#companybankAcId').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.finProjectAccountResponseList.length; i++) {
          $('#companybankAcId').append("<option value='" + resp.responseObjList.finProjectAccountResponseList[i].siteAccountId + "'>" + resp.responseObjList.finProjectAccountResponseList[i].siteBankAccountNumber + "</option>");
        }
        // alert(binval)
        $("#companybankAcId").val(binval)

        $("#companybankAcId").attr("disabled", true)
      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        swal(resp.status);
      }
    },
      error => {
        var error = JSON.parse(error._body).responseCode;
        $('.page-loader-wrapper').hide();
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );

  }
}