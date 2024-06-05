
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, RoutesRecognized } from "@angular/router";
import { Http, RequestOptions, Headers } from '@angular/http';
import { CommonComponent } from '../common/common.component';
import { ViewLegalInvoiceService } from './view-legal-invoice.service';
import { filter, pairwise } from 'rxjs/operators';

import { FormControl, Validators, ValidatorFn, AbstractControl } from "@angular/forms";
declare const $: any;
declare const swal: any;
var selected_projectid;
var selected_blockid;
var selected_floorid;
var selected_flatid;
var interestval;
var site_name;

var totalInvoiceAmount = 0;
var totalpaidAmount = 0;
var totalDueAmountval = 0;

@Component({
  selector: 'app-view-legal-invoice',
  templateUrl: './view-legal-invoice.component.html',
  styleUrls: ['./view-legal-invoice.component.sass'],
  providers: [ViewLegalInvoiceService]

})
export class ViewLegalInvoiceComponent implements OnInit {
  fg: FormGroup;
  controller: number[];
  autocompleteform: any;
  selected: any[];
  count: number;
  count1: number;
  count2: number;
  count3: number;
  count4: number;
  customer_Id: any;
  flatbooking_Id: any;
  flatId_Id: any;
  projectname: any;
  BlockIdname: any;
  floorIDname: any;
  flatIDname: any;
  invoicedatatable: Array<any> = [];
  hideme: boolean = false;
  previousUrl: string;
  currentUrl: string;
  sitedetails: any;
  loaderhideme: boolean;
  invoice_type: any[];
  fromDate: any;
  toDate: any;
  todate: string;
  invoicetype: string;
  givenNumber: any = 0;
  internationalNumberFormat: Intl.NumberFormat;
  totalamount: any;
  binding_Amount: any;
  deptid: any;
  roleid: any;
  paidAmount: any;
  paid_amount: any;
  totalDueAmount: any;
  total_DueAmount: any;
  // Totalinvoiceamount = 0;
  finance_fullname: any;


  constructor(private formBuilder: FormBuilder, private service: ViewLegalInvoiceService, private cmn: CommonComponent, private http: Http, private router: Router,) {
    this.siteList();

    this.deptid = sessionStorage.getItem("session_deptid");
    this.roleid = sessionStorage.getItem("session_roleId");

    console.log(this.deptid);

  }

  ngOnInit() {

    this.fg = new FormGroup(
      {
        from: new FormControl(""),
        to: new FormControl("")
      },
      [Validators.required, this.dateRangeValidator]
    );

    this.router.events
      .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
      .subscribe((events: RoutesRecognized[]) => {
        this.previousUrl = events[0].urlAfterRedirects;
        this.currentUrl = events[1].urlAfterRedirects;
        if (this.previousUrl.includes('AddLeagalinvoice')) {

          this.projectchangeFun(sessionStorage.getItem("projectname"));
          this.projectchangeFun(sessionStorage.getItem("projectname"));
          this.floorsitewisechange(sessionStorage.getItem("projectname"));
          this.flatsitewisechange(sessionStorage.getItem("projectname"));

        } else {


        }
      });



    var self = this;
    $("#projectID").select2({
      placeholder: "--Select--",
      dir: "ltl",
    });

    $("#BlockId").select2({
      placeholder: "--Select--",
      dir: "ltl"
    });

    $("#floorSelection").select2({
      placeholder: "--Select--",
      dir: "ltl"
    });

    $("#flatSelection").select2({
      placeholder: "--Select--",
      dir: "ltl"
    });

    $("#invoice_type").select2({
      placeholder: "--Select--",
      dir: "ltl"
    });



    $(function () {
      $('#projectID').change(function (e) {
        selected_projectid = $(e.target).val();
        site_name = $('#projectID').select2('data')[0].text
        if (selected_projectid == "select") {
          $("#BlockId option[value]").remove();
          $("#floorSelection option[value]").remove();
          $("#flatSelection option[value]").remove();
        } else {
          sessionStorage.setItem('ledgerData', '');
          self.projectchangeFun(selected_projectid);
          self.floorsitewisechange(selected_projectid);
          self.flatsitewisechange(selected_projectid);
          this.siteIDvalue = selected_projectid;
        }
      })

      $('#BlockId').change(function (e) {
        selected_blockid = $(e.target).val();
        if (selected_blockid == "select") {
          $("#floorSelection option[value]").remove();
          $("#flatSelection option[value]").remove();
          sessionStorage.removeItem("flatIDname");
          $("#flatSelection").val("");
          self.flatsitewisechange(selected_projectid);
          self.floorsitewisechange(selected_projectid);
        } else {
          this.controller = [0];
          sessionStorage.setItem('ledgerData', '');
          self.blockchangeFun(selected_blockid);
          self.flatwiseblockchange(selected_blockid);
        }
      })

      $('#floorSelection').change(function (e) {
        this.selectedFloorID = "";
        selected_floorid = $(e.target).val();
        if (selected_floorid == "select") {
          $("#flatSelection option[value]").remove();
        } else {
          this.controller = [0];
          sessionStorage.setItem('ledgerData', '');
          self.floorchangeFun(selected_floorid);
        }
      })

      $('#flatSelection').change(function (e) {
        this.selectedFlatID = "";
        selected_flatid = $(e.target).val();
        if (selected_flatid == "select") {
          $("#hideflat2").show();
        } else {
          sessionStorage.setItem('ledgerData', '');
          self.flatchangeFun(selected_flatid);

        }
      })

    })


  }



  startdatefun() {
    $("#fromDate").val("");
  }

  endtimefun() {
    $("#toDate").val("");
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

  /*-----------------Getting Project(site) list Start---------------------*/
  siteList() {
    var arr = localStorage.getItem('SiteIDS_singlepage');

    if (arr == null) {

      this.sitedetails = null;
    } else {
      this.sitedetails = JSON.parse(arr).map(String);
    }

    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "site/site.spring";
    console.log(url);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteIds": this.sitedetails
    }

    console.log(JSON.stringify(body));
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      console.log(JSON.stringify(resp));
      if (sessionStorage.getItem("customeridsession") == null || sessionStorage.getItem("customeridsession") == "") {
        $('.page-loader-wrapper').hide();
      }
      if (resp.responseCode == 200) {
        $('#projectID').html("");
        $('#projectID').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#projectID').append("<option value='" + resp.responseObjList[i].id + "'>" + resp.responseObjList[i].name + "</option>");

          if (sessionStorage.getItem("projectname") !== null) {
            $("#projectID").val(sessionStorage.getItem("projectname"));
          }


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


  /*------------------------Projects On Change Functionality Start--------------------*/
  projectchangeFun(selectedSiteID) {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "block/blocks.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "ids": [selectedSiteID],
      "requestUrl": "All"
    }
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#BlockId').html("");
        $('#BlockId').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#BlockId').append("<option value='" + resp.responseObjList[i].detId + "'>" + resp.responseObjList[i].name + "</option>");

          if (sessionStorage.getItem("BlockIdname") !== null) {
            $('#BlockId').val(sessionStorage.getItem("BlockIdname"));
          }

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
  /*------------------------Projects On Change Functionality End--------------------*/

  /*------------------------Block On Change Functionality Start--------------------*/
  blockchangeFun(selectedBlockID) {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "floor/floor.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "ids": [Number($('#BlockId').val())],
      "requestUrl": "All"
    }
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#floorSelection').html("");
        $('#floorSelection').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#floorSelection').append("<option value='" + resp.responseObjList[i].detId + "'>" + resp.responseObjList[i].name + "</option>");
          if (sessionStorage.getItem("floorIDname") !== null) {
            $('#floorSelection').val(sessionStorage.getItem("floorIDname"));
          }

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
  /*------------------------Blocks On Change Functionality End--------------------*/

  /*------------------------Floors On Change Functionality Start--------------------*/
  floorchangeFun(selectedFloorID) {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "flat/flat.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "ids": [selectedFloorID],
      "requestUrl": "All"
    }
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#flatSelection').html("");
        this.controller = [0];
        $('#flatSelection').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#flatSelection').append("<option value='" + resp.responseObjList[i].detId + "'>" + resp.responseObjList[i].name + "</option>");
          this.controller.push(resp.responseObjList[i].detId);

          if (sessionStorage.getItem("flatIDname") !== null) {
            $('#flatSelection').val(sessionStorage.getItem("flatIDname"));
          }

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
  /*------------------------Floors On Change Functionality End--------------------*/


  /*------------------------Floors On Change Functionality Start--------------------*/
  flatchangeFun(selectedFlatID) {
    this.selected = []
    this.count = 0;
    this.count1 = 0;
    this.count2 = 0;
    this.count3 = 0;
    this.count4 = 0;
    this.controller = [0];
    this.controller.push(Number(selectedFlatID));
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/activeBlocksFlats.spring";;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "flatIds": [selectedFlatID]
    }
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        this.customer_Id = resp.responseObjList[0].customerId;
        this.flatbooking_Id = resp.responseObjList[0].flatBookingId;
        this.flatId_Id = resp.responseObjList[0].flatId;
        $("#hideflat2").hide();
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
        //alert(error);
        $('.page-loader-wrapper').hide();
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );

  }


  floorsitewisechange(siteid) {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "floor/floorSite.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "ids": [siteid],
      "requestUrl": "All"
    }
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#floorSelection').html("");
        $('#floorSelection').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#floorSelection').append("<option value='" + resp.responseObjList[i].detId + "'>" + resp.responseObjList[i].name + "</option>");

          if (sessionStorage.getItem("projectname") !== null) {
            $('#floorSelection').val(sessionStorage.getItem("projectname"));
          }

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



  flatsitewisechange(siteid) {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "flat/flatSite.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "ids": [siteid],
      "requestUrl": "All"
    }
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#flatSelection').html("");
        this.controller = [0];
        $('#flatSelection').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#flatSelection').append("<option value='" + resp.responseObjList[i].detId + "'>" + resp.responseObjList[i].name + "</option>");
          this.controller.push(resp.responseObjList[i].detId);

          if (sessionStorage.getItem("flatIDname") !== null) {
            $('#flatSelection').val(sessionStorage.getItem("flatIDname"));
          }

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



  flatwiseblockchange(blockid) {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "flat/flatBlock.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "ids": [blockid],
      "requestUrl": "All"
    }
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#flatSelection').html("");
        this.controller = [0];
        $('#flatSelection').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#flatSelection').append("<option value='" + resp.responseObjList[i].detId + "'>" + resp.responseObjList[i].name + "</option>");
          this.controller.push(resp.responseObjList[i].detId);

          if (sessionStorage.getItem("flatIDname") !== null) {
            $('#flatSelection').val(sessionStorage.getItem("flatIDname"));
          }
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




  getDetails() {

    sessionStorage.removeItem("projectname");

    if ($("#projectID").val() == "select" || $("#projectID").val() == null) {
      this.projectname = [];
    } else {
      this.projectname = [JSON.parse($("#projectID").val())];
    }

    if ($("#BlockId").val() == "select" || $("#BlockId").val() == null) {
      this.BlockIdname = [];
    } else {
      this.BlockIdname = [JSON.parse($("#BlockId").val())];
    }

    if ($("#floorSelection").val() == "select" || $("#floorSelection").val() == null) {
      this.floorIDname = [];
    } else {
      this.floorIDname = [JSON.parse($("#floorSelection").val())];
    }


    if ($("#flatSelection").val() == "select" || $("#flatSelection").val() == null) {
      this.flatIDname = [];
    } else {
      this.flatIDname = [JSON.parse($("#flatSelection").val())];
    }

    if ($("#invoice_type").val() == "select" || $("#invoice_type").val() == null) {
      this.invoice_type = null;
    } else {
      this.invoice_type = $("#invoice_type").val();
    }

    this.fromDate = $("#fromDate").val();
    this.toDate = $("#toDate").val();

    if (this.fromDate == "" || this.fromDate == undefined || this.fromDate == "undefined") {
      this.fromDate = null;
    }

    if (this.toDate == "" || this.toDate == undefined || this.toDate == "undefined") {
      this.toDate = null;
    }

    if (this.projectname.length == 0 && this.BlockIdname.length == 0 && this.floorIDname.length == 0 && this.flatIDname.length == 0 && this.fromDate == null && this.toDate == null && this.invoice_type.length == 0) {
      swal("Please select any option to continue!");
      return false;
    }

    console.log(this.projectname);
    console.log(this.BlockIdname);
    console.log(this.floorIDname);
    console.log(this.flatIDname);
    console.log(this.invoice_type);
    console.log(this.fromDate);
    console.log(this.toDate);


    this.getCustomerInvoices(this.projectname, this.BlockIdname, this.floorIDname, this.flatIDname, this.fromDate, this.toDate, this.invoice_type);

  }


  getCustomerInvoices(projectname, BlockIdname, floorIDname, flatIDname, fromDate, todate, invoice_type) {
    $('.page-loader-wrapper').show();
    $('#tableExport').DataTable().destroy();
    this.loaderhideme = true;

    let url = this.cmn.commonUrl + "financial/getAllCustomersInvoices.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteIds": projectname,
      "blockIds": BlockIdname,
      "floorIds": floorIDname,
      "flatIds": flatIDname,
      "invoiceType": invoice_type,
      "fromDate": fromDate,
      "toDate": todate
    }

    console.log(body);

    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      this.loaderhideme = true;
      $('.page-loader-wrapper').hide();
      $('#tableExport').DataTable().destroy();
      console.log(resp);
      if (resp.responseCode == 200) {
        this.loaderhideme = false;
        this.invoicedatatable = [];


        if (resp.responseObjList.finBookingFormAccountsResponseList.length == 0) {
          this.hideme = true;
        } else {
          this.hideme = false;
        }


        if (resp.responseObjList.finBookingFormAccountsResponseList.length !== 0) {
          if (resp.responseObjList.payAmount !== null) {
            this.totalamount = resp.responseObjList.payAmount;
            this.binding_Amount = this.totalamount.toLocaleString("en-US");
          }

          if (resp.responseObjList.paidAmount !== null) {
            this.paidAmount = resp.responseObjList.paidAmount;
            this.paid_amount = this.paidAmount.toLocaleString("en-US");
          }

          if (resp.responseObjList.totalDueAmount !== null) {
            this.totalDueAmount = resp.responseObjList.totalDueAmount;
            this.total_DueAmount = this.totalDueAmount.toLocaleString("en-US");
          }


          this.invoicedatatable = resp.responseObjList.finBookingFormAccountsResponseList;


          // for (var i = 0; i < this.invoicedatatable.length; i++) {
          //   // console.log(this.invoicedatatable[i].payAmount);

          //   // this.Totalinvoiceamount = this.Totalinvoiceamount + parseFloat(this.invoicedatatable[i].payAmount);

          //   // console.log(this.Totalinvoiceamount);

          //   //   this.interestamountdue = this.interestamountdue + Number(this.controller[i].totalPendingPenaltyAmount);
          //   //   this.interestamountpaid = this.interestamountpaid + Number(this.controller[i].totalPenalityPaidAmount);
          //   //   this.interestwaiver = this.interestwaiver + Number(this.controller[i].setOffAmount);
          //   //   this.interest_Waiver_Amount = this.interest_Waiver_Amount +  Number(this.controller[i].interestWaiverAdjAmount);
          //   //   this.interestWaiverPendingAmount = this.interestWaiverPendingAmount + Number(this.controller[i].interestWaiverPendingAmount);

          // }



          setTimeout(function () {
            totalInvoiceAmount = 0;
            totalpaidAmount = 0;
            totalDueAmountval = 0;
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
                "fnStateSave": function (oSettings, oData) {
                  localStorage.setItem('offersDataTables', JSON.stringify(oData));
                },
                "fnStateLoad": function (oSettings) {
                  return JSON.parse(localStorage.getItem('offersDataTables'));
                },

                "footerCallback": function (row, data, start, end, display) {
                  totalInvoiceAmount = 0;
                  totalpaidAmount = 0;
                  totalDueAmountval = 0;
                  //   $('#tableExport').data.reload();
               
                  if (display.length == 0) {
                    $('#invoiceamount').html(0);
                    $('#payedamount').html(0);
                    $('#dueamount').html(0);
                  } else {

                    for (var j = 0; j < display.length; j++) {
                      totalInvoiceAmount += parseFloat(data[display[j]][5].replace(/\,/g,''));
                      totalpaidAmount += parseFloat(data[display[j]][6].replace(/\,/g,''));
                      totalDueAmountval += parseFloat(data[display[j]][7].replace(/\,/g,''));
                      const fmt = require('indian-number-format');
                      console.log(fmt.format(Number(totalInvoiceAmount.toFixed(2))))
                      $('#invoiceamount').html(fmt.format(Number(totalInvoiceAmount.toFixed(2))));
                      $('#payedamount').html(fmt.format(Number(totalpaidAmount.toFixed(2))));
                      $('#dueamount').html(fmt.format(Number(totalDueAmountval.toFixed(2))));
                    }

                  }

                  

                },

               

              }).draw();
            });
          }, 2000)

          console.log(totalInvoiceAmount);
          console.log(totalpaidAmount);
          console.log(totalDueAmountval);


          sessionStorage.setItem("projectname", projectname);
          sessionStorage.setItem("BlockIdname", BlockIdname);
          sessionStorage.setItem("floorIDname", floorIDname);
          sessionStorage.setItem("flatIDname", flatIDname);

          sessionStorage.setItem("fromdate", fromDate);
          sessionStorage.setItem("todate", todate);
          sessionStorage.setItem("invoice_type", invoice_type);
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



  // viewcustomerdata(userdata) {
  //   sessionStorage.setItem("userdata", JSON.stringify(userdata));
  //   this.router.navigate(["/AddLeagalinvoice"]);
  // }

  opendocument(data) {
    console.log(data);
    window.open(data.documentLocation);
  }


  homeClick() {
    this.cmn.commonHomeNavigation();
  }

}
