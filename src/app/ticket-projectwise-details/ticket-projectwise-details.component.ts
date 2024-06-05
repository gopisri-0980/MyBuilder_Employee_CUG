import { JsonPipe } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router, NavigationExtras, RoutesRecognized } from "@angular/router";
import { CommonComponent } from '../common/common.component';
import { EmployeeProjectwiseReport } from '../model/employee-projectwise-report';
import { Sitewisetickettype } from '../model/sitewisetickettype';
import { TicketAvgClosingTime } from '../model/ticket-avg-closing-time.model';
import { Tickettype } from '../model/tickettype';

declare const $: any;
declare const swal: any;
var fromDate;
var toDate;
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl
} from "@angular/forms";
import { ConfirmDialogService } from '../dailogbox/confirm-dialog.service';
import { TicketingmanagementdashboardService } from '../ticketing-management-dashboard/ticketingmanagementdashboard.service';
import { filter, pairwise } from 'rxjs/operators';

@Component({
  selector: 'app-ticket-projectwise-details',
  templateUrl: './ticket-projectwise-details.component.html',
  styleUrls: ['./ticket-projectwise-details.component.css']
})
export class TicketProjectwiseDetailsComponent implements OnInit {

  ticketTypeWiseReports: any[];
  sumOfArray: any[];
  headersArray: any[];
  tab3sumOfTotal: number;
  tab3sumOfOpen: number;
  tab3sumOfClosed: number;
  sumOfSiteOpenT: number;
  sumOfSiteClosedT: number;
  loaderhideme3: boolean;
  table3totalResponse: any;
  AllTicketTypesProjectWiseTableData: any;
  fg: FormGroup;
  unRespondingTicketsTableData: any[];
  buttonHide: boolean;
  avgClosingTimeTicketsDetailsTableData: any[];
  tktAvgClosingTimeTableArray: any[];
  avgClosingButtonHide: boolean;
  escalationTicketsDetailsTableData: any[];
  escButtonHide: boolean;
  fromreport: string;
  toreport: string;
  preloader: boolean;
  startdateDatavalue: any;
  enddateDatavalue: any;
  previousUrl: string;
  currentUrl: string;
  startdatedata: any;
  endDatedata: any;

  constructor(private cmn: CommonComponent, private http: Http,
    private router: Router,
    private service: TicketingmanagementdashboardService, private confirmDialogService: ConfirmDialogService,) {
    this.preloader = false;
    

  $('.page-loader-wrapper').hide();

  this.siteList_temp();

    if (sessionStorage.getItem("ProjectWise") == "ProjectWiseticketcount") {
      this.backtogetAllTicketTypesProjectWiseTicketCount(sessionStorage.getItem("startdatedata"), sessionStorage.getItem("endDatedata"));
    } else {
      this.getAllTicketTypesProjectWiseTicketCount('default');
    }


  }

  ngOnInit() {


    this.router.events
    .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
    .subscribe((events: RoutesRecognized[]) => {
      this.previousUrl = events[0].urlAfterRedirects;
      this.currentUrl = events[1].urlAfterRedirects;

      if (this.previousUrl.includes('All-TicketTypes-ProjectWise-Report') || this.previousUrl.includes('Ticketing-Dashboard/View-Tickets/Ticket-Details')) {

        sessionStorage.setItem("ProjectWise", "ProjectWiseticketcount");

        $(function () {
          if (sessionStorage.getItem("startdatedata") == null) {
          } else {
            $("#fromDate").val(sessionStorage.getItem("startdatedata"));
          }

          if (sessionStorage.getItem("endDatedata") == null) {
          } else {
            $("#toDate").val(sessionStorage.getItem("endDatedata"));
          }
        });


      } else {
        console.log('previous url is something else. call the ususal service from start');
      }
    }, error => {
    }
    );

    
  //   $(function(){
  //     $('#fromDate').on('change', function (e, date) {
  //       var maxDate = $('#fromDate').val();
  //       $('#toDate').attr('min', maxDate);
  //     });
  // });
  
    // var date = new Date().getMonth();
    // var minimumdate = new Date().setMonth(date - 3);
    // var maximumdate = new Date().setMonth(date + 3);
    // $('#fromDate').bootstrapMaterialDatePicker({
    //   format: 'YYYY-MM-DD',
    //   //  minDate: new Date(minimumdate),
    //    maxDate: new Date(),
    //   clearButton: true,
    //   weekStart: 1,
    //   time: false,

    // }).on('change', function (e, date) {
    //   $('#toDate').bootstrapMaterialDatePicker('setMinDate', date);
    // });

    // $('#toDate').bootstrapMaterialDatePicker({
    //   format: 'YYYY-MM-DD',
    //   //minDate: new Date(minimumdate),
    //    maxDate: new Date(),
    //   clearButton: true,
    //   weekStart: 1,
    //   time: false
    // });
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




  // ---------------------------------Project Wise Raised Ticket Type Count end

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

    if (action == 'submitClick') {
      if ($('#fromDate').val() == '' && $('#toDate').val() == '') {
        swal('Please select from date (or) to date');
        return false;
      }
    }

    var startdate = $('#fromDate').val();
    var endDate = $('#toDate').val();
    if (new Date(startdate) > new Date(endDate)) {
      swal('Please select  a valid from and to date');
      return false;
    }
    this.loaderhideme3 = true;
    this.getAllTicketTypesProjectWiseTicketCount(action);

    if (action == 'submitClick') {
      this.unRespondingTicketsTableData = [];
      this.buttonHide = true;
      this.avgClosingTimeTicketsDetailsTableData = [];
      this.tktAvgClosingTimeTableArray = [];
      this.avgClosingButtonHide = true;
      this.escalationTicketsDetailsTableData = [];
      this.escButtonHide = true;
    }


  }
  getAllTicketTypesProjectWiseTicketCount(action) {
    if (action == 'submitClick') {
      if ($('#fromDate').val() == '' && $('#toDate').val() == '') {
        swal('Please select from date (or) to date');
        return false;
      }
    }

    if (action == 'submitClick' && ($('#fromDate').val() != '' || $('#toDate').val() != '')) {
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



    this.ticketTypeWiseReports = [];
    this.sumOfArray = [];
    this.headersArray = [];
    this.tab3sumOfTotal = 0;
    this.tab3sumOfOpen = 0;
    this.tab3sumOfClosed = 0;
    this.sumOfSiteOpenT = 0;
    this.sumOfSiteClosedT = 0;
    this.loaderhideme3 = true;
    // this.preloader = true

    this.service.Alltickettypesfun(fromDate, toDate).then(resp => {
      console.log(resp);
      this.preloader = false;
      if (resp.responseCode == 200) {

        this.startdateDatavalue = resp.startDate;
        this.enddateDatavalue = resp.endDate;

        this.table3totalResponse = resp;
        this.AllTicketTypesProjectWiseTableData = resp.ticketReportingResponces[0].ticktTypewiseTicketCount;
        setTimeout(function () {
          $(document).ready(function () {
            $('#Alltickettypes').DataTable({
              pageLength: 10,
              lengthMenu: [[10, 20, -1], [10, 20, 'Todos']],
              dom: 'Bfrltip',
              buttons: [
                'copy', 'csv', 'excel', 'print' , {
                  extend: 'pdfHtml5',
                  orientation: 'landscape',
                  pageSize: 'LEGAL'
                  }
              ],
              retrieve: true,
              "scrollY": true,
              "scrollX": true,
              "autoWidth": false,
            });
          });
        }, 2000)

        this.headersArray = ['Ticket Type', 'Total', 'Open', 'Close'];
        for (var i = 0; i < this.table3totalResponse.ticketReportingResponces[0].maxArraySize; i++) {
          this.headersArray.push("Project");
          this.headersArray.push("Open");
          this.headersArray.push("Close");
        }
        for (let i = 0; i < this.AllTicketTypesProjectWiseTableData.length; i++) {
          let ticketTypeReport: Array<string> = [];
          ticketTypeReport.push(this.AllTicketTypesProjectWiseTableData[i].ticketType);
          ticketTypeReport.push(this.AllTicketTypesProjectWiseTableData[i].totalTickets);
          ticketTypeReport.push(this.AllTicketTypesProjectWiseTableData[i].openT);
          ticketTypeReport.push(this.AllTicketTypesProjectWiseTableData[i].closedT);
          for (let j = 0; j < this.AllTicketTypesProjectWiseTableData[i].siteList.length; j++) {
            ticketTypeReport.push(this.AllTicketTypesProjectWiseTableData[i].siteList[j].siteName);
            ticketTypeReport.push(this.AllTicketTypesProjectWiseTableData[i].siteList[j].openT);
            ticketTypeReport.push(this.AllTicketTypesProjectWiseTableData[i].siteList[j].closedT);
          }
          this.ticketTypeWiseReports.push(ticketTypeReport);

        }



        for (let item of this.AllTicketTypesProjectWiseTableData) {
          this.tab3sumOfTotal += item.totalTickets;
          this.tab3sumOfOpen += item.openT;
          this.tab3sumOfClosed += item.closedT;
        }
        this.sumOfArray.push('Total', this.tab3sumOfTotal, this.tab3sumOfOpen, this.tab3sumOfClosed)
        let Open = this.headersArray.lastIndexOf("Open");
        let Closed = this.headersArray.lastIndexOf("Close");
        var i = 5;
        var j = 6;

        while (i <= Open || j <= Closed) {
          this.sumOfSiteOpenT = 0;
          this.sumOfSiteClosedT = 0;
          for (let item of this.ticketTypeWiseReports) {
            this.sumOfSiteOpenT += item[i];
            this.sumOfSiteClosedT += item[j];
          }
          i += 3;
          j += 3;
          this.sumOfArray.push('-', this.sumOfSiteOpenT, this.sumOfSiteClosedT)
        }


        this.loaderhideme3 = false;

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
        this.preloader = false;
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );



  }

  exploreTableThree() {

    this.startdatedata = $('#fromDate').val();
    this.endDatedata = $('#toDate').val();

    sessionStorage.setItem("startdatedata", this.startdatedata);
    sessionStorage.setItem("endDatedata", this.endDatedata);


    sessionStorage.setItem('getAllTicketTypesProjectWiseTicketCount', JSON.stringify(this.table3totalResponse));
    sessionStorage.setItem("status", "Ticketprojectwisedetails");

    sessionStorage.setItem("Ticketprojectwisereport" ,"Ticket projectwise report");

    this.router.navigate(["All-TicketTypes-ProjectWise-Report"])
  }

  getColor(value) {
    if (typeof value == 'string') {
      return 'bold'
    }
  }


  homeClick() {
    this.router.navigateByUrl("ticket/viewticket");
  }

  dashtitle() {
    this.router.navigateByUrl("Ticketing-Dashboard");
  }



  backtogetAllTicketTypesProjectWiseTicketCount(fromdate , todate){
    this.ticketTypeWiseReports = [];
    this.sumOfArray = [];
    this.headersArray = [];
    this.tab3sumOfTotal = 0;
    this.tab3sumOfOpen = 0;
    this.tab3sumOfClosed = 0;
    this.sumOfSiteOpenT = 0;
    this.sumOfSiteClosedT = 0;
    this.loaderhideme3 = true;
    // this.preloader = true

    this.service.Alltickettypesfun(fromdate, todate).then(resp => {
      console.log(resp);
      this.preloader = false;
      if (resp.responseCode == 200) {

        this.startdateDatavalue = resp.startDate;
        this.enddateDatavalue = resp.endDate;

        this.table3totalResponse = resp;
        this.AllTicketTypesProjectWiseTableData = resp.ticketReportingResponces[0].ticktTypewiseTicketCount;
        setTimeout(function () {
          $(document).ready(function () {
            $('#Alltickettypes').DataTable({
              pageLength: 10,
              lengthMenu: [[10, 20, -1], [10, 20, 'Todos']],
              dom: 'Bfrltip',
              buttons: [
                'copy', 'csv', 'excel', 'print' , {
                  extend: 'pdfHtml5',
                  orientation: 'landscape',
                  pageSize: 'LEGAL'
                  }
              ],
              retrieve: true,
              "scrollY": true,
              "scrollX": true,
              "autoWidth": false,
            });
          });
        }, 2000)

        this.headersArray = ['Ticket Type', 'Total', 'Open', 'Close'];
        for (var i = 0; i < this.table3totalResponse.ticketReportingResponces[0].maxArraySize; i++) {
          this.headersArray.push("Project");
          this.headersArray.push("Open");
          this.headersArray.push("Close");
        }
        for (let i = 0; i < this.AllTicketTypesProjectWiseTableData.length; i++) {
          let ticketTypeReport: Array<string> = [];
          ticketTypeReport.push(this.AllTicketTypesProjectWiseTableData[i].ticketType);
          ticketTypeReport.push(this.AllTicketTypesProjectWiseTableData[i].totalTickets);
          ticketTypeReport.push(this.AllTicketTypesProjectWiseTableData[i].openT);
          ticketTypeReport.push(this.AllTicketTypesProjectWiseTableData[i].closedT);
          for (let j = 0; j < this.AllTicketTypesProjectWiseTableData[i].siteList.length; j++) {
            ticketTypeReport.push(this.AllTicketTypesProjectWiseTableData[i].siteList[j].siteName);
            ticketTypeReport.push(this.AllTicketTypesProjectWiseTableData[i].siteList[j].openT);
            ticketTypeReport.push(this.AllTicketTypesProjectWiseTableData[i].siteList[j].closedT);
          }
          this.ticketTypeWiseReports.push(ticketTypeReport);

        }



        for (let item of this.AllTicketTypesProjectWiseTableData) {
          this.tab3sumOfTotal += item.totalTickets;
          this.tab3sumOfOpen += item.openT;
          this.tab3sumOfClosed += item.closedT;
        }
        this.sumOfArray.push('Total', this.tab3sumOfTotal, this.tab3sumOfOpen, this.tab3sumOfClosed)
        let Open = this.headersArray.lastIndexOf("Open");
        let Closed = this.headersArray.lastIndexOf("Close");
        var i = 5;
        var j = 6;

        while (i <= Open || j <= Closed) {
          this.sumOfSiteOpenT = 0;
          this.sumOfSiteClosedT = 0;
          for (let item of this.ticketTypeWiseReports) {
            this.sumOfSiteOpenT += item[i];
            this.sumOfSiteClosedT += item[j];
          }
          i += 3;
          j += 3;
          this.sumOfArray.push('-', this.sumOfSiteOpenT, this.sumOfSiteClosedT)
        }


        this.loaderhideme3 = false;

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
        this.preloader = false;
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );

  }
  siteList_temp() {
    var arr = localStorage.getItem('SiteIDS');
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "site/site.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": sessionStorage.getItem("login_sessionkey"),
      "siteIds": [107],
    }
console.log(JSON.stringify(body))
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
        this.router.navigate([""]);
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }
}
