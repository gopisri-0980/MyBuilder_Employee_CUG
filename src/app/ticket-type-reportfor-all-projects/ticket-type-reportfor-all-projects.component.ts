import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router, NavigationExtras, RoutesRecognized } from "@angular/router";
import { CommonComponent } from '../common/common.component';
import { ConfirmDialogService } from '../dailogbox/confirm-dialog.service';
import { TicketTypeReportforAllProjectsService } from './ticket-type-reportfor-all-projects.service';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl
} from "@angular/forms";

var fromDate;
var toDate;
declare const $: any;
declare const swal: any;
var grandtotal = 0;
var totaltransactionAmount = 0;
@Component({
  selector: 'app-ticket-type-reportfor-all-projects',
  templateUrl: './ticket-type-reportfor-all-projects.component.html',
  styleUrls: ['./ticket-type-reportfor-all-projects.component.sass']
})
export class TicketTypeReportforAllProjectsComponent implements OnInit {
  controller: Array<any> = [];
  controller_data: Array<any> = [];
  Total_controller: Array<any> = [];
  total_main_controller: Array<any> = [];
  ticketTypeWiseReports: any;
  sumOfSiteOpenT: number;
  sumOfSiteClosedT: number;
  fg: FormGroup;
  fromreport: string;
  toreport: string;
  startdateDatavalue: any;
  enddateDatavalue: any;
  constructor(private cmn: CommonComponent, private http: Http,
    private router: Router,
    private service: TicketTypeReportforAllProjectsService, private confirmDialogService: ConfirmDialogService,) {
    $('.page-loader-wrapper').hide();
    this.completedTransactions_default('default')
  }

  ngOnInit() {

    this.fg = new FormGroup(
      {
        from: new FormControl(""),
        to: new FormControl("")
      },
      [Validators.required, this.dateRangeValidator]
    );


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


  setDate() {
    var getmonth = new Date().getMonth();
    var temp = new Date().setMonth(getmonth - 1);
    var minDate = new Date(temp);
    var year = minDate.getFullYear();
    var month = ("0" + (minDate.getMonth() + 1)).slice(-2);
    var day = ("0" + minDate.getDate()).slice(-2);
    var minimumdate = year + '-' + month + '-' + day;
    var date2 = new Date();
    var year2 = date2.getFullYear();
    var month2 = ("0" + (date2.getMonth() + 1)).slice(-2);
    var day2 = ("0" + date2.getDate()).slice(-2);
    var maximumdate = year2 + '-' + month2 + '-' + day2;
    fromDate = minimumdate;
    toDate = maximumdate;
  }


  searchAllServices(action) {
    if ($('#fromDate').val() == '' && $('#toDate').val() == '') {
      swal('Please select from date (or) to date');
      return false;
    }

    var startdate = $('#fromDate').val();
    var endDate = $('#toDate').val();
    if (new Date(startdate) > new Date(endDate)) {
      swal('Please select  a valid from and to date');
      return false;
    }

    this.completedTransactions_default(action);

  }



  completedTransactions_default(action) {

    if (action == 'submitClick') {
      if ($('#fromDate').val() == '' && $('#toDate').val() == '') {
        swal('Please select from date (or) to date');
        return false;
      }
    }

    if ($('#fromDate').val() != undefined || $('#toDate').val() != undefined) {
      fromDate = $('#fromDate').val();
      toDate = $('#toDate').val();
      if (fromDate == '') {
        fromDate = null;
      } else if (toDate == '') {
        toDate = null;
      } else {
        fromDate = $('#fromDate').val();
        toDate = $('#toDate').val();
      }
    } else {
      this.setDate();
    }

    var d = new Date(fromDate);
    var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
      d.getFullYear();

    if (datestring == "01-01-1970") {
      this.fromreport = " - ";
    } else {
      this.fromreport = datestring;
    }


    var d1 = new Date(toDate);
    var datestring1 = ("0" + d1.getDate()).slice(-2) + "-" + ("0" + (d1.getMonth() + 1)).slice(-2) + "-" +
      d1.getFullYear();

    if (datestring1 == "01-01-1970") {
      this.toreport = "-";
    } else {
      this.toreport = datestring1;
    }

    if (toDate == "") {
      toDate = null;
    }


    $('.page-loader-wrapper').show();
    $('#Alltickettypes').DataTable().destroy();
    let url = this.cmn.commonUrl + "ticketreport/getAllMainTicketTypesProjectWiseTicketCount.spring"
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "startDate": fromDate,
      "endDate": toDate,
    }
    console.log(body);
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      console.log(resp);
      this.controller = [];
      this.controller_data = [];
      this.Total_controller = [];
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        this.controller_data.push("Ticket Type");
        this.Total_controller.push("", "Total");

        this.startdateDatavalue = resp.startDate;
        this.enddateDatavalue = resp.endDate;

        console.log(resp.startDate);
        console.log(resp.endDate);
        
        for (var i = 0; i < resp.ticketReportingResponces[0].ticktTypewiseTicketCount[0].siteList.length; i++) {
          this.controller_data.push(resp.ticketReportingResponces[0].ticktTypewiseTicketCount[0].siteList[i].siteName);
          this.Total_controller.push(resp.ticketReportingResponces[0].ticktTypewiseTicketCount[0].siteList[i].sitewisetotalTickets);
        }
        this.controller_data.push("Grand Total");
        totaltransactionAmount = 0;

        for (var i = 0; i < resp.ticketReportingResponces[0].ticktTypewiseTicketCount.length; i++) {
          console.log(resp.ticketReportingResponces[0].ticktTypewiseTicketCount[i].totalTickets);
          totaltransactionAmount += parseFloat(resp.ticketReportingResponces[0].ticktTypewiseTicketCount[i].totalTickets);
        }

        this.Total_controller.push(totaltransactionAmount);

        this.total_main_controller = this.Total_controller;
        console.log(this.total_main_controller);
        this.controller = resp.ticketReportingResponces[0].ticktTypewiseTicketCount;
        setTimeout(function () {
          $(document).ready(function () {
            $('#Alltickettypes').DataTable({
              pageLength: 10,
              lengthMenu: [[10, 20, -1], [10, 20, 'Todos']],
              dom: 'Bfrltip',
              buttons: [
                'copy', 'csv', 'print', {
                  extend: 'pdfHtml5',
                  orientation: 'landscape',
                  pageSize: 'LEGAL',
                  footer: true,
                },
                { extend: 'excelHtml5', footer: true },
              ],

              retrieve: true,
              "scrollY": true,
              "scrollCollapse": true,
              "scrollX": true,
              "autoWidth": false,
              "iCookieDuration": 60,
              "bStateSave": true,

              "fnInitComplete": function(){
                // Disable TBODY scoll bars
                $('.dataTables_scrollBody').css({
                    'overflow': 'hidden',
                    'border': '0'
                });
                
                // Enable TFOOT scoll bars
                $('.dataTables_scrollFoot').css('overflow', 'auto');
                
                // Sync TFOOT scrolling with TBODY
                $('.dataTables_scrollFoot').on('scroll', function () {
                    $('.dataTables_scrollBody').scrollLeft($(this).scrollLeft());
                });                    
            },

              "fnStateSave": function (oSettings, oData) {
                localStorage.setItem('offersDataTables', JSON.stringify(oData));
              },
              "fnStateLoad": function (oSettings) {
                return JSON.parse(localStorage.getItem('offersDataTables'));
              },

            });
          });
        }, 1000)

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






}