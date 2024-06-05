import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras, RoutesRecognized } from "@angular/router";
import { Http, RequestOptions, Headers } from '@angular/http';
import { HttpClient } from "@angular/common/http";
import { CommonComponent } from '../common/common.component';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { filter, pairwise } from 'rxjs/operators';
import { Location } from '@angular/common';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {
  ValidatorFn,
  AbstractControl
} from "@angular/forms";

declare const $: any;
declare const swal: any;
var total_interest_Amount = 0;
var amount_waivedoff = 0;
var Waiver_amount_request_pending = 0;
var Interest_Collected = 0;
var Bal_Interest = 0;
var Basic_Flat_Cost = 0
var Amenities_Flat_Cost = 0
var Total_Flat_Cost_Excl_Gst = 0
var Total_Agreement_Cost = 0
var Total_Paid_Amount = 0
var Legal_Amount = 0
var Legal_Paid_Amount = 0
var Flat_Khata_Amount = 0
var Flat_Khata_Paid_Amount = 0
var Maintenance_Charge_Pay_Amount = 0
var Maintenance_Charge_Paid_Amount = 0
var Modification_Charges_Amount = 0
var Modification_Charges_Paid_Amount = 0
var Corpus_Amount = 0
var Corpus_Paid_Amount = 0
var Carparking_pay_Amount = 0
var Carparking_Paid_Amount = 0;
var selected_projectid;
@Component({
  selector: 'app-view-interest-paidand-waived-details',
  templateUrl: './view-interest-paidand-waived-details.component.html',
  styleUrls: ['./view-interest-paidand-waived-details.component.sass']
})
export class ViewInterestPaidandWaivedDetailsComponent implements OnInit {
  closeResult = '';
  fg: FormGroup;
  sitename: any;
  flatSelection: any;
  fromDate: any;
  toDate: any;

  controller: Array<any> = [];
  controller1: Array<any> = [];
  loading: boolean;
  loading1: boolean;
  hideme : boolean;

  constructor(private cmn: CommonComponent, private http: Http, private router: Router, private modalService: NgbModal) {
    $('.page-loader-wrapper').hide();
    this.siteList();
  }

  ngOnInit() {

    this.fg = new FormGroup(
      {
        from: new FormControl(""),
        to: new FormControl("")
      },
      [Validators.required, this.dateRangeValidator]
    );

    var self = this;
    $(function () {

      $("#projectID").select2({
        placeholder: "Search Project",
        dir: "ltl",
      });

      $("#flatSelection").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });


      $('#projectID').change(function (e) {
        selected_projectid = $(e.target).val();

        if (selected_projectid == "select") {
          $("#flatSelection option[value]").remove();
        } else {

          self.projectchangeFun([selected_projectid]);
        }
      })
    });
  }

  private dateRangeValidator: ValidatorFn = (): {
    [key: string]: any;
  } | null => {
    let invalid = false;
    const from = this.fg && this.fg.get("from").value;
    const to = this.fg && this.fg.get("to").value;
    if (from && to) {
      invalid = new Date(from).valueOf() > new Date(to).valueOf();
    }
    return invalid ? { invalidRange: { from, to } } : null;
  };

  getToday(): string {
    return new Date().toISOString().split('T')[0]
  }


  startdatefun() {
    $("#fromDate").val("");
  }

  endtimefun() {
    $("#toDate").val("");
  }



  /*-----------------Getting Project(site) list Start---------------------*/
  siteList() {
    var arr = localStorage.getItem('ViewInterest_Paidand_WaivedDetails');
    console.log(arr)
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "site/site.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteIds": JSON.parse(arr).map(String)
    }
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 200) {
        $('#projectID').html("");
        $('#projectID').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#projectID').append("<option value='" + resp.responseObjList[i].id + "'>" + resp.responseObjList[i].name + "</option>");
        }
      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
      }

    },
      error => {
        $('.page-loader-wrapper').hide();
        var error = JSON.parse(error._body).responseCode;
        //alert(error);
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }
  /*-----------------Getting Project(site) list End---------------------*/



  /*------------------------Projects On Change for blocks Functionality Start--------------------*/


  projectchangeFun(selectedFloorID) {
    console.log(selectedFloorID);
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "flat/flatSite.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "ids": selectedFloorID,
      "requestUrl": "ViewAllData"
    }
    console.log(body);
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      console.log(resp);
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#flatSelection').html("");

        $('#flatSelection').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#flatSelection').append("<option value='" + resp.responseObjList[i].detId + "'>" + resp.responseObjList[i].name + "</option>");
          // this.controller.push(resp.responseObjList[i].detId);
        }
      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
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

  viewinterestpaidandwaiveddetailsfun() {
    this.controller = [];
    this.controller1 = [];
    $('#tableExport1').DataTable().destroy();
    this.sitename = $("#projectID").val();
    this.flatSelection = $("#flatSelection").val();
    this.fromDate = $("#fromDate").val();
    this.toDate = $("#toDate").val();

    if (this.sitename == "" || this.sitename == undefined || this.sitename == "undefined" || this.sitename == "select") {
      this.sitename = null;
    }

    if (this.flatSelection == "" || this.flatSelection == undefined || this.flatSelection == "undefined") {
      this.flatSelection = null;
    }

    if (this.fromDate == "" || this.fromDate == undefined || this.fromDate == "undefined") {
      this.fromDate = null;
    }

    if (this.toDate == "" || this.toDate == undefined || this.toDate == "undefined") {
      this.toDate = null;
    }

    if (this.flatSelection == "select") {
      this.flatSelection = null;
    }

    console.log(this.sitename);
    console.log(this.flatSelection);
    console.log(this.fromDate);
    console.log(this.toDate);

    if (this.sitename == null && this.flatSelection == null && this.fromDate == null && this.toDate == null) {
      swal("Please select any option to continue!");
      return false;
    }


    // this.modalService.open(content, { backdrop: 'static', size: 'sm', keyboard: false, centered: true, windowClass: 'my-class' }).result.then((result) => {
    //   this.closeResult = `Closed with: ${result}`;
    // }, (reason) => {
    //   this.closeResult = `Dismissed ${this.getDismissReason_data(reason)}`;
    // });
    if (confirm("Do you want to Submit the Page ?")) {
    this.controller = [];
    this.controller1 = [];
    $('#tableExport1').DataTable().destroy();
    this.sitename = $("#projectID").val();
    this.flatSelection = $("#flatSelection").val();
    this.fromDate = $("#fromDate").val();
    this.toDate = $("#toDate").val();

    if (this.sitename == "" || this.sitename == undefined || this.sitename == "undefined" || this.sitename == "select") {
      this.sitename = null;
    }

    if (this.flatSelection == "" || this.flatSelection == undefined || this.flatSelection == "undefined") {
      this.flatSelection = null;
    }

    if (this.fromDate == "" || this.fromDate == undefined || this.fromDate == "undefined") {
      this.fromDate = null;
    }

    if (this.toDate == "" || this.toDate == undefined || this.toDate == "undefined") {
      this.toDate = null;
    }

    if (this.flatSelection == "select") {
      this.flatSelection = null;
    }

    console.log(this.sitename);
    console.log(this.flatSelection);
    console.log(this.fromDate);
    console.log(this.toDate);
    this.hideme = false;
    this.loading1 = true;
      $('.page-loader-wrapper').show();
    //http://localhost:8181/SumadhuraGateway/employeeservice/financial/getInterestWaivedAndPaidDetails.spring

    let url = this.cmn.commonUrl + "financial/getInterestWaivedAndPaidDetails.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteId": this.sitename,
      "flatId": this.flatSelection,
      "startDate": this.fromDate,
      "endDate": this.toDate
    }


    console.log(body);
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      console.log(resp);
      console.log(JSON.stringify(resp));
        $('.page-loader-wrapper').hide();
      this.modalService.dismissAll();
      this.loading1 = false;
      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        this.controller = [];
        this.controller1 = [];
        this.controller = resp.responseObjList.finTransactionSetOffResponseList;
        console.log(this.controller);

        if(this.controller.length == 0){
          this.hideme = true;
        }

        setTimeout(function () {
          $(document).ready(function () {
            $('#tableExport').DataTable({
              pageLength: 5,
              lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todos']],
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
              "fnStateSave": function (oSettings, oData) {
                localStorage.setItem('offersDataTables', JSON.stringify(oData));
              },
              "fnStateLoad": function (oSettings) {
                return JSON.parse(localStorage.getItem('offersDataTables'));
              },
            });

          });
        }, 2000)

      } else if (resp.responseCode == 440) {
        this.loading1 = false;
        $('.page-loader-wrapper').hide();
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);

      } else {
        this.loading1 = false;
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
      }
    },
      error => {
        this.loading1 = false;
        $('.page-loader-wrapper').hide();
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

  }


  // private getDismissReason_data(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return `with: ${reason}`;
  //   }
  // }










  viewinterestpendingdetailsfun() {
    this.controller = [];
    this.controller1 = [];
    $('#tableExport').DataTable().destroy();
    this.sitename = $("#projectID").val();
    this.flatSelection = $("#flatSelection").val();
    this.fromDate = $("#fromDate").val();
    this.toDate = $("#toDate").val();

    if (this.sitename == "" || this.sitename == undefined || this.sitename == "undefined" || this.sitename == "select") {
      this.sitename = null;
    }

    if (this.flatSelection == "" || this.flatSelection == undefined || this.flatSelection == "undefined" || this.flatSelection == null) {
      this.flatSelection = [];
    } else {
      this.flatSelection = [this.flatSelection];
    }

    if (this.fromDate == "" || this.fromDate == undefined || this.fromDate == "undefined") {
      this.fromDate = null;
    }

    if (this.toDate == "" || this.toDate == undefined || this.toDate == "undefined") {
      this.toDate = null;
    }

    if (this.flatSelection == "select") {
      this.flatSelection = [];
    }

    if (this.sitename == null && this.flatSelection.length == 0 && this.fromDate == null && this.toDate == null) {
      swal("Please select any option to continue!");
      return false;
    }



    // this.modalService.open(content, { backdrop: 'static', size: 'sm', keyboard: false, centered: true, windowClass: 'my-class' }).result.then((result) => {
    //   this.closeResult = `Closed with: ${result}`;
    // }, (reason) => {
    //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    // });

    if (confirm("Do you want to Submit the Page ?")) {
      this.controller = [];
      this.controller1 = [];
      $('#tableExport').DataTable().destroy();
      this.sitename = $("#projectID").val();
      this.flatSelection = $("#flatSelection").val();
      this.fromDate = $("#fromDate").val();
      this.toDate = $("#toDate").val();
  
      if (this.sitename == "" || this.sitename == undefined || this.sitename == "undefined" || this.sitename == "select") {
        this.sitename = null;
      }
  
      if (this.flatSelection == "" || this.flatSelection == undefined || this.flatSelection == "undefined" || this.flatSelection == null) {
        this.flatSelection = [];
      } else {
        this.flatSelection = [this.flatSelection];
      }
  
      if (this.fromDate == "" || this.fromDate == undefined || this.fromDate == "undefined") {
        this.fromDate = null;
      }
  
      if (this.toDate == "" || this.toDate == undefined || this.toDate == "undefined") {
        this.toDate = null;
      }
  
      if (this.flatSelection == "select") {
        this.flatSelection = [];
      }
  
  
      var d = new Date();
  
      var datestring = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
  
  
  
      console.log(this.sitename);
      console.log(this.flatSelection);
      console.log(this.fromDate);
      console.log(this.toDate);
  
      this.hideme = false;
      this.loading = true;
      $('.page-loader-wrapper').show();
  
      let url = this.cmn.commonUrl + "financial/getInterestWaiverReportDetails.spring";
  
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      var body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "siteId": this.sitename,
        "requestUrl": "GiveInterestWaiverReport",
        "isInterestOrWithOutInterest": "With Interest",
        "isReGenerateDemandNote": "true",
        "isShowGstInPDF": "true",
        "flatIds": this.flatSelection,
        "blockIds1": [
  
        ],
        "financialProjectMileStoneRequests": [
          {
            "projectMilestoneId": 150000,
            "milestoneName": "Dummy MileStone for Regenerate Demand Note",
            "finMilestoneClassifidesId": "1",
            "percentagesId": 1,
            "mileStonePercentage": 12,
            "milestoneDate": datestring,
            "mileStoneDueDate": datestring,
            "mileStoneNo": 0,
            "demandNoteDate": datestring,
            "interestCalculationUptoDate": datestring
          }
        ]
      }
  
      console.log(url);
      console.log(JSON.stringify(body));

      this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
        console.log(resp);
        console.log(JSON.stringify(resp))
      //  this.loading = false;
      //  this.modalService.dismissAll();
        // $('.page-loader-wrapper').hide();
        if (resp.responseCode == 200) {
  
          $('.page-loader-wrapper').hide();
          this.controller = [];
          this.controller1 = [];
          this.controller1 = resp.responseObjList.demandNoteGeneratorInfoList[0].customerDetailsList;
          console.log(this.controller1);
          if(this.controller1.length == 0){
            this.hideme = true;
          }
  
          setTimeout(function () {
            $(document).ready(function () {
              $('#tableExport1').DataTable({
                pageLength: 5,
                lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todos']],
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
                "fnStateSave": function (oSettings, oData) {
                  localStorage.setItem('offersDataTables', JSON.stringify(oData));
                },
                "fnStateLoad": function (oSettings) {
                  return JSON.parse(localStorage.getItem('offersDataTables'));
                },
                "footerCallback": function (row, data, start, end, display) {
                  console.log(row);
              
  
  
                  var total_interest_Amount = 0;
                  var amount_waivedoff = 0.00;
                  var Waiver_amount_request_pending = 0;
                  var Interest_Collected = 0;
                  var Bal_Interest = 0;
                  var Basic_Flat_Cost = 0
                  var Amenities_Flat_Cost = 0
                  var Total_Flat_Cost_Excl_Gst = 0
                  var Total_Agreement_Cost = 0
                  var Total_Paid_Amount = 0
                  var Legal_Amount = 0
                  var Legal_Paid_Amount = 0
                  var Flat_Khata_Amount = 0
                  var Flat_Khata_Paid_Amount = 0
                  var Maintenance_Charge_Pay_Amount = 0
                  var Maintenance_Charge_Paid_Amount = 0
                  var Modification_Charges_Amount = 0
                  var Modification_Charges_Paid_Amount = 0
                  var Corpus_Amount = 0
                  var Corpus_Paid_Amount = 0
                  var Carparking_pay_Amount = 0
                  var Carparking_Paid_Amount = 0
  
                  if( display.length != 0){
                    for (var j = 0; j < display.length; j++) {
                   
                      console.log(data[display[j]]);
                     var total_interestAmount = data[display[j]][8];
                 
                    total_interest_Amount += parseFloat(total_interestAmount.replace(/\,/g,''));

                    if(total_interest_Amount == 0){
                      $('#Total_Cost1').html("0.00");

                     }else{
                      const fmt = require('indian-number-format');
                   
                      console.log(fmt.format(Number(total_interest_Amount.toFixed(2))));
                      $('#Total_Cost1').html(fmt.format(Number(total_interest_Amount.toFixed(2))));
    
                     }
                    
                     var amount_waived_off = data[display[j]][9].replace(/,/g, '');
                    // alert(amount_waived_off)
                     if(amount_waived_off == "0.00"){
                      $('#Total_Cost2').html("0.00");

                     }else{
                      amount_waivedoff += parseFloat(amount_waived_off);
                      const fmt_total_amount_paid = require('indian-number-format');
                      $('#Total_Cost2').html(fmt_total_amount_paid.format(Number((amount_waivedoff.toFixed(2) +0.00))));
    
                     }
                    

                     var Waiver_amount_requestpending = data[display[j]][10].replace(/,/g, '');
                     Waiver_amount_request_pending += parseFloat(Waiver_amount_requestpending);
                    
                     if(Waiver_amount_request_pending == 0){
                      $('#Total_Cost3').html("0.00");

                     }else{
                      const fmt_3 = require('indian-number-format');
                      $('#Total_Cost3').html(fmt_3.format(Number(Waiver_amount_request_pending.toFixed(2))));
    
                     }
                    

                     var InterestCollected = data[display[j]][11].replace(/,/g, '');
                     
                     Interest_Collected += parseFloat(InterestCollected);
                     if(Interest_Collected == 0){
                      $('#Total_Cost4').html("0.00");

                     }else{
                      const fmt_4 = require('indian-number-format');
                      $('#Total_Cost4').html(fmt_4.format(Number(Interest_Collected.toFixed(2))));
    
                     }
                     

                     var BalInterest = data[display[j]][12].replace(/,/g, '');
                     Bal_Interest += parseFloat(BalInterest);

                     if(Bal_Interest == 0){
                      $('#Total_Cost5').html("0.00");

                     }else{
                      const fmt_5 = require('indian-number-format');
                      $('#Total_Cost5').html(fmt_5.format(Number(Bal_Interest.toFixed(2))));
    
                     }
                     
                     var Basic_FlatCost = data[display[j]][13].replace(/,/g, '');
                     Basic_Flat_Cost += parseFloat(Basic_FlatCost);

                     if(Basic_Flat_Cost == 0){
                      $('#Total_Cost6').html("0.00");

                     }else{
                      const fmt_6 = require('indian-number-format');
                      $('#Total_Cost6').html(fmt_6.format(Number(Basic_Flat_Cost.toFixed(2))));
    
                     }
                     

                     var Amenities_FlatCost = data[display[j]][14].replace(/,/g, '');
                     Amenities_Flat_Cost += parseFloat(Amenities_FlatCost);

                     if(Amenities_Flat_Cost == 0){
                      $('#Total_Cost7').html("0.00");

                     }else{
                      const fmt_7 = require('indian-number-format');
                      $('#Total_Cost7').html(fmt_7.format(Number(Amenities_Flat_Cost.toFixed(2))));
    
                     }
                    
                     var Total_Flat_Cost_ExclGst = data[display[j]][15].replace(/,/g, '');
                     Total_Flat_Cost_Excl_Gst += parseFloat(Total_Flat_Cost_ExclGst);
                     
                     
                     if(Total_Flat_Cost_Excl_Gst == 0){
                      $('#Total_Cost8').html("0.00");

                     }else{
                      const fmt_8 = require('indian-number-format');
                      $('#Total_Cost8').html(fmt_8.format(Number(Total_Flat_Cost_Excl_Gst.toFixed(2))));
    
                     }
                    

                     var Total_AgreementCost = data[display[j]][16].replace(/,/g, '');
                     Total_Agreement_Cost += parseFloat(Total_AgreementCost);
                     if(Total_Agreement_Cost == 0){
                      $('#Total_Cost9').html("0.00");

                     }else{
                      const fmt_9 = require('indian-number-format');
                      $('#Total_Cost9').html(fmt_9.format(Number(Total_Agreement_Cost.toFixed(2))));
    
                     }
                   

                     var Total_PaidAmount = data[display[j]][17].replace(/,/g, '');
                     Total_Paid_Amount += parseFloat(Total_PaidAmount);
                     if(Total_Paid_Amount == 0){
                      $('#Total_Cost10').html("0.00");

                     }else{
                      const fmt_10 = require('indian-number-format');
                      $('#Total_Cost10').html(fmt_10.format(Number(Total_Paid_Amount.toFixed(2))));
    
                     }
                    
                     var LegalAmount = data[display[j]][18].replace(/,/g, '');
                     Legal_Amount += parseFloat(LegalAmount);

                     if(Legal_Amount == 0){
                      $('#Total_Cost11').html("0.00");

                     }else{
                      const fmt_11 = require('indian-number-format');
                      $('#Total_Cost11').html(fmt_11.format(Number(Legal_Amount.toFixed(2))));
    
                     }
                     
                     var Legal_PaidAmount = data[display[j]][19].replace(/,/g, '');
                     Legal_Paid_Amount += parseFloat(Legal_PaidAmount);
                     if(Legal_Paid_Amount == 0){
                      $('#Total_Cost12').html("0.00");

                     }else{
                      const fmt_12 = require('indian-number-format');
                      $('#Total_Cost12').html(fmt_12.format(Number(Legal_Paid_Amount.toFixed(2))));
    
                     }
                     

                     var Flat_KhataAmount = data[display[j]][20].replace(/,/g, '');
                     Flat_Khata_Amount += parseFloat(Flat_KhataAmount);

                     if(Flat_Khata_Amount == 0){
                      $('#Total_Cost13').html("0.00");

                     }else{
                      const fmt_13 = require('indian-number-format');
                      $('#Total_Cost13').html(fmt_13.format(Number(Flat_Khata_Amount.toFixed(2))));
    
                     }
                    
                     var Flat_Khata_PaidAmount = data[display[j]][21].replace(/,/g, '');
                     Flat_Khata_Paid_Amount += parseFloat(Flat_Khata_PaidAmount);
                    
                    
                     if(Flat_Khata_Paid_Amount == 0){
                      $('#Total_Cost14').html("0.00");

                     }else{
                      const fmt_14 = require('indian-number-format');
                      $('#Total_Cost14').html(fmt_14.format(Number(Flat_Khata_Paid_Amount.toFixed(2))));
 
                     }
                    

                     var Maintenance_Charge_PayAmount = data[display[j]][22].replace(/,/g, '');
                     Maintenance_Charge_Pay_Amount += parseFloat(Maintenance_Charge_PayAmount);
                   
                     if(Maintenance_Charge_Pay_Amount == 0){
                      $('#Total_Cost15').html("0.00");

                     }else{
                      const fmt_15 = require('indian-number-format');
                      $('#Total_Cost15').html(fmt_15.format(Number(Maintenance_Charge_Pay_Amount.toFixed(2))));
 
                     }
                    

                     var Maintenance_Charge_PaidAmount = data[display[j]][23].replace(/,/g, '');
                     Maintenance_Charge_Paid_Amount += parseFloat(Maintenance_Charge_PaidAmount);
                  
                     if(Maintenance_Charge_Paid_Amount == 0){
                      $('#Total_Cost16').html("0.00");

                     }else{
                      const fmt_16 = require('indian-number-format');
                      $('#Total_Cost16').html(fmt_16.format(Number(Maintenance_Charge_Paid_Amount.toFixed(2))));
 
                     }
                    

                     var Modification_ChargesAmount = data[display[j]][24].replace(/,/g, '');
                     Modification_Charges_Amount += parseFloat(Modification_ChargesAmount);
                  
                     if(Modification_Charges_Amount == 0){
                      $('#Total_Cost17').html("0.00");

                     }else{
                      const fmt_17 = require('indian-number-format');
                      $('#Total_Cost17').html(fmt_17.format(Number(Modification_Charges_Amount.toFixed(2))));
 
                     }
                    
                     var Modification_Charges_PaidAmount = data[display[j]][25].replace(/,/g, '');
                     Modification_Charges_Paid_Amount += parseFloat(Modification_Charges_PaidAmount);
                    
                    
                     if(Modification_Charges_Paid_Amount == 0){
                      $('#Total_Cost18').html("0.00");

                     }else{
                      const fmt_18 = require('indian-number-format');
                      $('#Total_Cost18').html(fmt_18.format(Number(Modification_Charges_Paid_Amount.toFixed(2))));
 
                     }
                    

                     var CorpusAmount = data[display[j]][26].replace(/,/g, '');
                     Corpus_Amount += parseFloat(CorpusAmount);
                     if(Corpus_Amount == 0){
                      $('#Total_Cost19').html("0.00");

                     }else{
                      const fmt_19 = require('indian-number-format');
                      $('#Total_Cost19').html(fmt_19.format(Number(Corpus_Amount.toFixed(2))));
 
                     }
                    
                     var Corpus_PaidAmount = data[display[j]][27].replace(/,/g, '');
                     Corpus_Paid_Amount += parseFloat(Corpus_PaidAmount);

                     if(Corpus_Paid_Amount == 0){
                      $('#Total_Cost20').html("0.00");

                     }else{
                      const fmt_20 = require('indian-number-format');
                      $('#Total_Cost20').html(fmt_20.format(Number(Corpus_Paid_Amount.toFixed(2))));
 
                     }


                     var carparking_Amount = data[display[j]][28].replace(/,/g, '');
                     console.log(carparking_Amount);
                     Carparking_pay_Amount += parseFloat(carparking_Amount);

                     
                     if(Carparking_pay_Amount == 0){
                      $('#Total_Cost21').html("0.00");

                     }else{
                      const fmt_21 = require('indian-number-format');
                      $('#Total_Cost21').html(fmt_21.format(Number(Carparking_pay_Amount.toFixed(2))));
 

                     }

                    //  var assignmentTransferFeePayAmount = data[display[j]][29].replace(/,/g, '');
                    //  console.log(assignmentTransferFeePayAmount);
                    //  assignmentTransferFeePayAmount += parseFloat(assignmentTransferFeePayAmount);

                     
                    //  if(assignmentTransferFeePayAmount == 0){
                    //   $('#Total_Cost22').html("0.00");

                    //  }else{
                    //   const fmt_22 = require('indian-number-format');
                    //   $('#Total_Cost22').html(fmt_22.format(Number(assignmentTransferFeePayAmount.toFixed(2))));
 

                    //  }
                     var assignmentTransferFeePayAmount = data[display[j]][29].replace(/,/g, '');
                     console.log(assignmentTransferFeePayAmount);
                     assignmentTransferFeePayAmount += parseFloat(assignmentTransferFeePayAmount);

                     
                     if(assignmentTransferFeePayAmount == 0){
                      $('#Total_Cost22').html("0.00");

                     }else{
                      const fmt_23 = require('indian-number-format');
                      $('#Total_Cost22').html(fmt_23.format(Number(assignmentTransferFeePayAmount.toFixed(2))));
 

                     }


                     var assignmentTransferFeePaidAmount = data[display[j]][30].replace(/,/g, '');
                     console.log(assignmentTransferFeePaidAmount);
                     assignmentTransferFeePaidAmount += parseFloat(assignmentTransferFeePaidAmount);

                  console.log(assignmentTransferFeePaidAmount);

                     if(assignmentTransferFeePaidAmount == 0){
                      $('#Total_Cost23').html("0.00");

                     }else{
                      const fmt_24 = require('indian-number-format');
                      $('#Total_Cost23').html(fmt_24.format(Number(assignmentTransferFeePaidAmount.toFixed(2))));
 
//console.log(fmt_22.format(Number(Carparking_Paid_Amount.toFixed(2))));
                     }



                     

                   
                    //  console.log(data[display[j]][16]);
  
                    //  Total_pending_amount = data[display[j]][16].replace(/,/g, '');
                    //  total_pending_amount_val += parseFloat(Total_pending_amount);
                    //  console.log(total_pending_amount_val);
                    //  const fmt_total_pending_amount = require('indian-number-format');
                    //  $('#Total_pending_amount_val').html(fmt_total_pending_amount.format(Number(total_pending_amount_val.toFixed(2))));
  
  
   
                    //  Total_pending_amount_Completion = data[display[j]][17].split(";")[1].replace(/,/g, '');
                    //  total_pending_amount_value += parseFloat(Total_pending_amount_Completion);
                    //  const fmt_total_pending_amount_value = require('indian-number-format');
                    //  $('#Total_pending_amount_completion').html(fmt_total_pending_amount_value.format(Number(total_pending_amount_value.toFixed(2))));
   
   
                   }
                  } else {
                    $('#Total_Cost1').html(0);
                    $('#Total_Cost2').html(0);
                    $('#Total_Cost3').html(0);
                    $('#Total_Cost4').html(0);
                    $('#Total_Cost5').html(0);
                    $('#Total_Cost6').html(0);
                    $('#Total_Cost7').html(0);
                    $('#Total_Cost8').html(0);
                    $('#Total_Cost9').html(0);
                    $('#Total_Cost10').html(0);
                    $('#Total_Cost11').html(0);
                    $('#Total_Cost12').html(0);
                    $('#Total_Cost13').html(0);
                    $('#Total_Cost14').html(0);
                    $('#Total_Cost15').html(0);
                    $('#Total_Cost16').html(0);
                    $('#Total_Cost17').html(0);
                    $('#Total_Cost18').html(0);
                    $('#Total_Cost19').html(0);
                    $('#Total_Cost20').html(0);
                    $('#Total_Cost21').html(0);
                    $('#Total_Cost22').html(0);
                    $('#Total_Cost23').html(0);
                    $('#Total_Cost24').html(0);

                    $('#Total_amount_paid_val').html(0);
                    $('#Total_pending_amount_val').html(0);
                    $('#Total_pending_amount_completion').html(0);
                  }
  
                
                },
              });
  
            });
          }, 2000)
  
        } else if (resp.responseCode == 440) {
          this.loading = false;
          $('.page-loader-wrapper').hide();
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
  
        } else {
          this.loading = false;
          $('.page-loader-wrapper').hide();
          swal(resp.errors[0]);
          return false;
        }
      },
        error => {
          this.loading = false;
          $('.page-loader-wrapper').hide();
          var error = JSON.parse(error._body).responseCode;
          swal(error);
          $('.page-loader-wrapper').hide();
          if (error == 440) {
            swal("Your Session has been Timed Out!", "Please login once again.", "error");
            this.router.navigate([""]);
          }
        }
      );
  

    }

   


  }

  opendocument(data) {
    console.log(data);
    window.open(data.location);
  }


  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return `with: ${reason}`;
  //   }
  // }


  // submitfunction_data(data) {
 

  // }

  homeClick() {
    this.cmn.commonHomeNavigation();
  }

}
