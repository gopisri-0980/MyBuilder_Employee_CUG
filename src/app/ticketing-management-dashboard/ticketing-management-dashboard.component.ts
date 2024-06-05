import { JsonPipe } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router, NavigationExtras, RoutesRecognized } from "@angular/router";
import { CommonComponent } from '../common/common.component';
import { EmployeeProjectwiseReport } from '../model/employee-projectwise-report';
import { Sitewisetickettype } from '../model/sitewisetickettype';
import { TicketAvgClosingTime } from '../model/ticket-avg-closing-time.model';
import { Tickettype } from '../model/tickettype';
import { TicketingmanagementdashboardService } from './ticketingmanagementdashboard.service';
declare const $: any;
declare const swal: any;
var fromDate;
var toDate;
var TotalEmployeeTickets = 0;
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl
} from "@angular/forms";
import { ConfirmDialogService } from '../dailogbox/confirm-dialog.service';
import { JSONP_ERR_WRONG_RESPONSE_TYPE } from '@angular/common/http/src/jsonp';
import { filter, pairwise } from 'rxjs/operators';
@Component({
  selector: 'app-ticketing-management-dashboard',
  templateUrl: './ticketing-management-dashboard.component.html',
  styleUrls: ['./ticketing-management-dashboard.component.sass'],
  providers: [TicketingmanagementdashboardService],
})
export class TicketingManagementDashboardComponent implements OnInit {

  fg: FormGroup;

  loading: boolean;
  controllerval: boolean = true;
  projectWiseTicketCountTableData: any = [];
  sumOfTotal: any = 0;
  sumOfNew: any = 0;
  sumOfOpen: any = 0;
  sumOfInprogress: any = 0;
  sumOfReopen: any = 0;
  sumOfClose: any = 0;
  totalResponse: any;
  table2totalResponse: Array<any> = [];
  projectWiseTicketRaisedTicketTypeTableData: Array<any> = [];
  projectWiseTicketRaisedTicketTypeSubTableData: any = [];
  table7totalResponse: any;
  unRespondingTicketsTableData: any = [];
  buttonHide: boolean = true;
  tab7explorebtnHide: boolean = false;
  noDataAvailable: boolean;
  table3totalResponse: any;
  AllTicketTypesProjectWiseTableData: any = [];
  escButtonHide: boolean = true;
  tab5explorebtnHide: boolean;
  table5totalResponse: any;
  escalationTicketsDetailsTableData: any = [];
  escNoDataAvailable: boolean;
  headersArray: any = [];
  ticketTypeWiseReports: Array<Array<string>> = [];
  empticketTypeWiseReports: Array<Array<string>> = [];
  empticketTypeWiseReportstwo: Array<Array<string>> = [];
  sumOfArray: any = [];
  tab3sumOfTotal: any = 0;
  tab3sumOfOpen: any = 0;
  tab3sumOfClosed: any = 0;
  sumOfSiteClosedT: any = 0;
  sumOfSiteOpenT: any = 0;
  avgClosingButtonHide: boolean = true;
  tab6explorebtnHide: boolean;
  table6totalResponse: any;
  avgClosingTimeTicketsDetailsTableData: any = [];
  avgClosingNoDataAvailable: boolean;
  tktAvgClosingTimeTableArray: Array<TicketAvgClosingTime> = [];
  avgTktClosingTimeObject: { startDate: any; endDate: any; ticketType: any; projectName: any; totalTickets: any; openTickets: any; closedTickets: any; avgClosingTime: any; empName: any; avgReplyTime: any; ticketTypeIds: any; ticketTypeDetailsId: any; siteIds: any; };
  tab6sumOfTotal: any = 0;
  tab6sumOfOpen: any = 0;
  tab6sumOfClosed: any = 0;
  tab6sumOfAvgClosingTime: any = 0;
  tab6sumOfAvgReplyTime: any = 0;
  ticketTypeDetailsIds: any = [];
  Headers: string[];
  controller: Array<any> = [];
  employeename: any;
  totalTickets = 0;
  openT = 0;
  inprogressT = 0;
  reopenT = 0;
  closedT = 0;
  empheadersArray: any = [];
  Employeeprojectwisetickets: any = [];
  Employeename: any;
  EmpTotalTickets: any;
  EmpTotalTicketsval = 0;
  Employeesitename: any;
  EmployeeOpen: any;
  EmployeeClose: any;
  Employeenameval: any;
  empsumOfArray = [];
  employeetotalTickets: any = 0;
  emptab3sumOfTotal = 0;
  emptab3sumOfOpen = 0;
  employeeOpenT: any = 0;
  EmployeeCloseT: any = 0;
  loaderhideme: boolean = true;
  loaderhideme2: boolean = true;
  loaderhideme3: boolean = true;
  loaderhideme4: boolean = true;
  loaderhideme5: boolean = true;
  loaderhideme6: boolean = true;
  loaderhideme7: boolean = true;
  employeenumoftickets: any = 0;
  employeeprojectwisereports: Array<EmployeeProjectwiseReport> = [];
  EmployeeDetails: boolean = false;
  fromreport: any;
  toreport: any;
  employeetotalcount: boolean = false;
  projectbasenoOfTickets: any;
  secondtabledata: any;
  AvgClosingTimerecords: Array<any> = [];
  preloader: boolean;
  loaderhideme8: boolean = true;
  controllermaindata: Array<any> = [];
  startdateDatavalue: any;
  enddateDatavalue: any;
  startdate: any;
  endDate: any;
  startdatedata: any;
  endDatedata: any;
  previousUrl: string;
  currentUrl: string;

  constructor(private cmn: CommonComponent, private http: Http,
    private router: Router,
    private service: TicketingmanagementdashboardService, private confirmDialogService: ConfirmDialogService,) {

    $('.page-loader-wrapper').hide();
    if (sessionStorage.getItem("ProjectWise") == "ProjectWiseticketcount") {
      this.backoptionprojectwise(sessionStorage.getItem("startdatedata"), sessionStorage.getItem("endDatedata"));
      this.backtogetProjectWiseRaisedTicketTypeCount(sessionStorage.getItem("startdatedata"), sessionStorage.getItem("endDatedata"));
      this.backtogetEmployeeProjectwiseTicketCount(sessionStorage.getItem("startdatedata"), sessionStorage.getItem("endDatedata"));
    
      this.backtogetUnRespondingTickets(sessionStorage.getItem("startdatedata"), sessionStorage.getItem("endDatedata"));

    } else {
      this.getProjectWiseTicketCount('default');
      this.getProjectWiseRaisedTicketTypeCount('default');
      // this.getAllTicketTypesProjectWiseTicketCount('default');
      this.getEmployeeProjectwiseTicketCount('default');
      this.headersArray = ['Ticket Type', 'Total', 'Open', 'Close'];
     
      // this.getEmployeeWiseTicketAverageClosingTime('default');
      this.getUnRespondingTickets('default');
    }



  }

  ngOnInit() {

    this.router.events
      .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
      .subscribe((events: RoutesRecognized[]) => {
        this.previousUrl = events[0].urlAfterRedirects;
        this.currentUrl = events[1].urlAfterRedirects;

        if (this.previousUrl.includes('ProjectWise-Ticket-Count') || this.previousUrl.includes('Projectwise-Ticket-Report') ||
          this.previousUrl.includes('Escalation-Tickets') || this.previousUrl.includes('UnResponding-Tickets') || this.previousUrl.includes('Employeewiseticket') || this.previousUrl.includes('Ticketing-Dashboard/View-Tickets/Ticket-Details')) {

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
    // var minimumdate = new Date().setMonth(date - 12);
    // var maximumdate = new Date().setMonth(date + 12);
    // $('#fromDate').bootstrapMaterialDatePicker({
    //   format: 'YYYY-MM-DD',
    //  // minDate: new Date(minimumdate),
    //  maxDate: new Date(),
    //   clearButton: true,
    //   weekStart: 1,
    //   time: false,

    // }).on('change', function (e, date) {
    //   $('#toDate').bootstrapMaterialDatePicker('setMinDate', date);
    // });

    // $('#toDate').bootstrapMaterialDatePicker({
    //   format: 'YYYY-MM-DD',
    //  // minDate: new Date(minimumdate),
    //  maxDate: new Date(),
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

    this.EmployeeDetails = false;
    this.loaderhideme = true;
    this.loaderhideme2 = true;
    this.loaderhideme3 = true;
    this.loaderhideme4 = true;
    this.loaderhideme5 = true;
    this.loaderhideme6 = true;
    this.loaderhideme7 = true;
    this.loaderhideme8 = true;






    this.getProjectWiseTicketCount(action);
    this.getProjectWiseRaisedTicketTypeCount(action);
    // this.getAllTicketTypesProjectWiseTicketCount(action);
    this.getEmployeeProjectwiseTicketCount(action);
   
    // this.getEmployeeWiseTicketAverageClosingTime(action);
    this.getUnRespondingTickets(action);
    //this.ticketDetailsIds(action);

    if (action == 'submitClick') {
      this.unRespondingTicketsTableData = [];
      this.buttonHide = true;
      this.avgClosingTimeTicketsDetailsTableData = [];
      this.tktAvgClosingTimeTableArray = [];
      this.avgClosingButtonHide = true;
      this.escalationTicketsDetailsTableData = [];
      this.escButtonHide = true;
      this.controllermaindata = [];
    }

  }

  // ----------------------------------1.ProjectWise ticket count start------------------------------
  getProjectWiseTicketCount(action) {


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


    $('.page-loader-wrapper').show();
    this.preloader = true;
    this.service.gteprojectwisecount(fromDate, toDate).then(resp => {

      this.startdateDatavalue = resp.startDate;
      this.enddateDatavalue = resp.endDate;

      this.loaderhideme = false;
      this.preloader = false;
      $('.page-loader-wrapper').hide();
      this.projectWiseTicketCountTableData = [];
      this.sumOfTotal = 0;
      this.sumOfNew = 0;
      this.sumOfOpen = 0;
      this.sumOfInprogress = 0;
      this.sumOfReopen = 0;
      this.sumOfClose = 0;

      if (resp.responseCode == 200) {
        this.Headers = ['Project Name', 'No.Of.Tickets', 'New', 'Open', 'Inprogress', 'Reopen', 'Close'];
        this.totalResponse = resp;
        this.projectWiseTicketCountTableData = resp.ticketReportingResponces[0].projectwiseTicketCount;

        this.projectbasenoOfTickets = resp.noOfTickets;

        for (let item of this.projectWiseTicketCountTableData) {
          this.sumOfTotal += item.totalTickets;
          this.sumOfNew += item.newT;
          this.sumOfOpen += item.openT;
          this.sumOfInprogress += item.inprogressT;
          this.sumOfReopen += item.reopenT;
          this.sumOfClose += item.closedT;
        }

        setTimeout(function () {
          $(document).ready(function () {
            $('#Projectwisedatatable').DataTable({
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
              "autoWidth": false,
              "iCookieDuration": 60,


            });
          });


          $('.buttons-excel, .buttons-print').each(function () {
            $(this).removeClass('btn-default').addClass('btn-primary')
          })


        }, 2000)

      } else if (resp.responseCode == 440) {
        $('.page-loader-wrapper').hide();
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
        $('.page-loader-wrapper').hide();
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }
  exploreTable() {

    this.startdatedata = $('#fromDate').val();
    this.endDatedata = $('#toDate').val();

    sessionStorage.setItem("startdatedata", this.startdatedata);
    sessionStorage.setItem("endDatedata", this.endDatedata);

    sessionStorage.setItem('getProjectWiseTicketCountResponse', JSON.stringify(this.totalResponse));
    this.router.navigate(["ProjectWise-Ticket-Count"])
  }


  // ----------------------------------1.ProjectWise ticket count end------------------------------

  // ---------------------------------Project Wise Raised Ticket Type Count start


  getProjectWiseRaisedTicketTypeCount(action) {
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

    this.service.ProjectWiseRaisedTicketTypeCount(fromDate, toDate).then(resp => {

      console.log(resp);

      this.loaderhideme2 = false;
      this.preloader = false;
      if (resp.responseCode == 200) {
        this.table2totalResponse = resp;
        this.projectWiseTicketRaisedTicketTypeTableData = resp.ticketReportingResponces;

        console.log(this.projectWiseTicketRaisedTicketTypeTableData);


        for (var i = 0; i < resp.ticketReportingResponces.length; i++) {
          this.secondtabledata = this.projectWiseTicketRaisedTicketTypeTableData[i].ticktTypewiseTicketCount;
        }


        setTimeout(function () {
          $(document).ready(function () {
            $('table.display').DataTable({
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
              "autoWidth": false,
              "iCookieDuration": 60,

            });
          });
        }, 2000)

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

  exploreTableTwo() {

    this.startdatedata = $('#fromDate').val();
    this.endDatedata = $('#toDate').val();

    sessionStorage.setItem("startdatedata", this.startdatedata);
    sessionStorage.setItem("endDatedata", this.endDatedata);

    sessionStorage.setItem('getProjectWiseRaisedTicketTypeCount', JSON.stringify(this.table2totalResponse));
    this.router.navigate(["Projectwise-Ticket-Report"])
  }


  // ---------------------------------Project Wise Raised Ticket Type Count end




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

    this.ticketTypeWiseReports = [];
    this.sumOfArray = [];
    this.headersArray = [];
    this.tab3sumOfTotal = 0;
    this.tab3sumOfOpen = 0;
    this.tab3sumOfClosed = 0;
    this.sumOfSiteOpenT = 0;
    this.sumOfSiteClosedT = 0;
    this.loaderhideme3 = true;
    this.service.Alltickettypesfun(fromDate, toDate).then(resp => {


      this.preloader = false;
      if (resp.responseCode == 200) {
        this.table3totalResponse = resp;
        this.AllTicketTypesProjectWiseTableData = resp.ticketReportingResponces[0].ticktTypewiseTicketCount;
        setTimeout(function () {
          $(document).ready(function () {
            $('#Alltickettypes').DataTable({
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
              "scrollY": true,
              "scrollCollapse": true,
              "scrollX": true,
              "autoWidth": false,
              "iCookieDuration": 60,
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
    this.router.navigate(["All-TicketTypes-ProjectWise-Report"])
  }





  getEmployeeProjectwiseTicketCount(action) {
    
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

    this.ticketTypeWiseReports = [];
    this.sumOfArray = [];
    this.headersArray = [];
    this.tab3sumOfTotal = 0;
    this.tab3sumOfOpen = 0;
    this.tab3sumOfClosed = 0;
    this.sumOfSiteOpenT = 0;
    this.sumOfSiteClosedT = 0;
    this.preloader = true;
    this.service.Getemployeedetails(fromDate, toDate).then(resp => {


      this.employeeprojectwisereports = [];
      this.empticketTypeWiseReports = [];
      this.empsumOfArray = [];
      this.preloader = false;
      this.controllerval = false;
      if (resp.responseCode == 200) {
        this.controller = resp;
        this.Employeeprojectwisetickets = resp.ticketReportingResponces[0].ticketReportingPojos;

        setTimeout(function () {
          $(document).ready(function () {
            var table = $('#employeeprojectwise').DataTable({
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
              "scrollY": true,
              "scrollCollapse": true,
              "scrollX": true,
              "autoWidth": false,
              "iCookieDuration": 60,
            });

            // $('#employeeprojectwise').on('page.dt', function () {
            //   var info = table.page.info();
            //   var page = info.page + 1;
            //   if (page == info.pages) {
            //     this.employeetotalcount = true;
            //   } else {
            //     this.employeetotalcount = true;
            //   }
            // });

          });



        }, 2000)



        this.empheadersArray = ['Employee Name', 'Total Tickets', 'Project Name'];
        for (var i = 0; i < this.Employeeprojectwisetickets[0].siteList[0].ticketTypeList.length; i++) {
          this.empheadersArray.push("Ticket Type");
          this.empheadersArray.push("No.of Tickets");
          this.empheadersArray.push("Open");
          this.empheadersArray.push("Closed");
        }
        let empticketResponse: Array<string> = [];
        for (let i = 0; i < this.Employeeprojectwisetickets.length; i++) {
          let pojo: EmployeeProjectwiseReport = new EmployeeProjectwiseReport();
          pojo.employeename = this.Employeeprojectwisetickets[i].employeeName;
          //  pojo.totalTickets = this.Employeeprojectwisetickets[i].totalTickets;
          let sitewiseTicketTypePojos: Array<Sitewisetickettype> = [];
          for (let j = 0; j < this.Employeeprojectwisetickets[i].siteList.length; j++) {
            let sitewiseTicketTypePojo: Sitewisetickettype = new Sitewisetickettype();
            sitewiseTicketTypePojo.sitename = this.Employeeprojectwisetickets[i].siteList[j].siteName;
            sitewiseTicketTypePojo.siteids = this.Employeeprojectwisetickets[i].siteList[j].siteId;
            sitewiseTicketTypePojo.totalTickets = this.Employeeprojectwisetickets[i].siteList[j].totalTickets;
            sitewiseTicketTypePojo.startDate = fromDate;
            sitewiseTicketTypePojo.endDate = toDate;
            TotalEmployeeTickets += this.Employeeprojectwisetickets[i].siteList[j].totalTickets;
            let TicketTypePojos: Array<Tickettype> = [];
            if (this.Employeeprojectwisetickets[i].siteList[j].ticketTypeList.length !== 0) {
              for (let k = 0; k < this.Employeeprojectwisetickets[i].siteList[j].ticketTypeList.length; k++) {
                let TicketTypePojo: Tickettype = new Tickettype();
                TicketTypePojo.ticketType = this.Employeeprojectwisetickets[i].siteList[j].ticketTypeList[k].ticketType;
                TicketTypePojo.numOfTickets = this.Employeeprojectwisetickets[i].siteList[j].ticketTypeList[k].totalTickets;
                TicketTypePojo.Open = this.Employeeprojectwisetickets[i].siteList[j].ticketTypeList[k].openT;
                TicketTypePojo.close = this.Employeeprojectwisetickets[i].siteList[j].ticketTypeList[k].closedT;
                TicketTypePojo.startDate = fromDate;
                TicketTypePojo.endDate = toDate;
                TicketTypePojo.tickettypeDetailsID = this.Employeeprojectwisetickets[i].siteList[j].ticketTypeList[k].ticketTypeDetailsId;
                TicketTypePojos.push(TicketTypePojo);

              }
            }


            sitewiseTicketTypePojo.tickettypearray = TicketTypePojos;
            sitewiseTicketTypePojos.push(sitewiseTicketTypePojo);
          }
          pojo.sitewiseticketTypeArray = sitewiseTicketTypePojos;
          this.employeeprojectwisereports.push(pojo);




        }

        let empticketResponse1: Array<string> = [];
        for (let i = 0; i < this.Employeeprojectwisetickets.length; i++) {
          empticketResponse1.push();


          this.Employeename = this.Employeeprojectwisetickets[i].employeeName;
          // this.EmpTotalTickets = this.Employeeprojectwisetickets[0].totalTickets;
          for (let j = 0; j < this.Employeeprojectwisetickets[i].siteList.length; j++) {
            let empticketResponse1: Array<string> = [];
            this.Employeesitename = this.Employeeprojectwisetickets[i].siteList[j].siteName;
            this.EmpTotalTickets = this.Employeeprojectwisetickets[i].siteList[j].totalTickets;
            if (this.Employeeprojectwisetickets[i].siteList[j].ticketTypeList.length !== 0) {
              for (let k = 0; k < this.Employeeprojectwisetickets[i].siteList[j].ticketTypeList.length; k++) {
                empticketResponse1.push(this.Employeeprojectwisetickets[i].siteList[j].ticketTypeList[k].ticketType);
                empticketResponse1.push(this.Employeeprojectwisetickets[i].siteList[j].ticketTypeList[k].totalTickets);
                empticketResponse1.push(this.Employeeprojectwisetickets[i].siteList[j].ticketTypeList[k].openT);
                empticketResponse1.push(this.Employeeprojectwisetickets[i].siteList[j].ticketTypeList[k].closedT);
              }
            }

            empticketResponse1.unshift(this.Employeesitename);
            empticketResponse1.unshift(this.EmpTotalTickets);
            empticketResponse1.unshift(this.Employeename);
            this.empticketTypeWiseReports.push(empticketResponse1);

          }
        }



        let NumofTickets = this.empheadersArray.lastIndexOf("No.of Tickets");
        let Open = this.empheadersArray.lastIndexOf("Open");
        let Closed = this.empheadersArray.lastIndexOf("Closed");
        var n = 4;
        var k = 5;
        var l = 6;


        while (n <= NumofTickets || k <= Open || l <= Closed) {
          for (let item of this.empticketTypeWiseReports) {
            this.employeenumoftickets += item[n];
            this.employeeOpenT += item[k];
            this.EmployeeCloseT += item[l];
          }
          this.empsumOfArray.push("Total", this.employeenumoftickets, this.employeeOpenT, this.EmployeeCloseT);
          this.employeenumoftickets = 0;
          this.employeeOpenT = 0;
          this.EmployeeCloseT = 0;
          n += 4;
          k += 4;
          l += 4;

        }
        this.empsumOfArray.unshift('-');
        this.empsumOfArray.unshift(TotalEmployeeTickets);
        this.empsumOfArray.unshift('-');
        this.loaderhideme4 = false;
        this.EmployeeDetails = true;







      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
        this.preloader = false;
      } else {
        swal(resp.errors[0]);
        this.preloader = false;
      }
    });
  }




  EmployeeTable(header, data) {

    this.startdatedata = $('#fromDate').val();
    this.endDatedata = $('#toDate').val();

    sessionStorage.setItem("startdatedata", this.startdatedata);
    sessionStorage.setItem("endDatedata", this.endDatedata);

    localStorage.setItem("Headers", JSON.stringify(header));
    localStorage.setItem("Userdata", JSON.stringify(data));
    localStorage.setItem('TotalData', JSON.stringify(this.empsumOfArray));
    localStorage.setItem('Totaldatajson', JSON.stringify(this.employeeprojectwisereports));
    this.router.navigateByUrl('Employeewiseticket');
  }






  



  getEmployeeWiseTicketAverageClosingTime(action) {
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

    this.preloader = true;
    this.service.EmployeeWiseTicketAverageClosingTime(fromDate, toDate).then(resp => {

      this.loaderhideme6 = false;
      this.preloader = false;
      if (resp.responseCode == 200) {
        this.avgClosingButtonHide = false;
        this.tab6explorebtnHide = true;
        this.table6totalResponse = resp;
        this.tktAvgClosingTimeTableArray = [];
        this.tab6sumOfTotal = 0;
        this.tab6sumOfOpen = 0;
        this.tab6sumOfClosed = 0;
        this.tab6sumOfAvgClosingTime = 0;
        this.tab6sumOfAvgReplyTime = 0;

        this.avgClosingTimeTicketsDetailsTableData = resp.ticketReportingResponces[0].ticktTypewiseTicketCount;
        if (this.avgClosingTimeTicketsDetailsTableData.length == 0) {
          this.avgClosingNoDataAvailable = true;
          this.tab6explorebtnHide = false;
        }

        this.tktAvgClosingTimeTableArray = [];
        for (let ticketType of this.avgClosingTimeTicketsDetailsTableData) {
          for (let item of ticketType.siteList) {
            let ticketTypeDetailsIds = [];
            let uniqueticketTypeDetailsIdsArray = [];
            for (let ticket of item.ticketIds) {
              ticketTypeDetailsIds.push(ticket.ticketTypeDetailsId);
              uniqueticketTypeDetailsIdsArray = Array.from(new Set(ticketTypeDetailsIds));
            }
            this.avgTktClosingTimeObject = {
              startDate: this.table6totalResponse.startDate,
              endDate: this.table6totalResponse.endDate,
              ticketType: ticketType.ticketType,
              projectName: item.siteName,
              totalTickets: item.totalTickets,
              openTickets: item.openT,
              closedTickets: item.closedT,
              empName: item.employeeName,

              //avgClosingTime: item.avgClosingTime,
              avgClosingTime: item.avgClosingTimeHrsFormat,
              // avgReplyTime: item.avgReplyTime,
              avgReplyTime: item.avgReplyTimeHrsFormat,

              ticketTypeIds: ticketType.ticketTypeId,
              ticketTypeDetailsId: uniqueticketTypeDetailsIdsArray,
              siteIds: item.siteId
            };
            this.tktAvgClosingTimeTableArray.push(this.avgTktClosingTimeObject);
          }
        }
        // for (let item of this.tktAvgClosingTimeTableArray) {
        //   this.tab6sumOfTotal += item.totalTickets;
        //   this.tab6sumOfOpen += item.openTickets
        //   this.tab6sumOfClosed += item.closedTickets;
        //   this.tab6sumOfAvgClosingTime += item.avgClosingTime;
        //   this.tab6sumOfAvgReplyTime += item.avgReplyTime;
        // }

        this.tab6sumOfTotal = resp.noOfTickets;
        this.tab6sumOfOpen = resp.openTT;
        this.tab6sumOfClosed = resp.closedTT;
        this.tab6sumOfAvgClosingTime = resp.avgClosingTimeHrsFormat;
        this.tab6sumOfAvgReplyTime = resp.avgReplyTimeHrsFormat;

        this.AvgClosingTimerecords.push({
          Total: this.tab6sumOfTotal,
          open: this.tab6sumOfOpen,
          close: this.tab6sumOfClosed,
          Avgclosingtime: this.tab6sumOfAvgClosingTime,
          avgReplyTime: this.tab6sumOfAvgReplyTime,
        });

        setTimeout(function () {
          $(document).ready(function () {
            $('#ticketaverageclosingtime').DataTable({
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
              "scrollY": true,
              "scrollCollapse": true,
              "scrollX": true,
              "autoWidth": false,
              "iCookieDuration": 60,
            });
          });
        }, 2000)



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

  exploreTableSix() {

    this.startdatedata = $('#fromDate').val();
    this.endDatedata = $('#toDate').val();

    sessionStorage.setItem("startdatedata", this.startdatedata);
    sessionStorage.setItem("endDatedata", this.endDatedata);

    if (this.tktAvgClosingTimeTableArray.length == 0) {
      swal("No Data available");
    } else {
      sessionStorage.setItem('getEmployeeWiseTicketAverageClosingTime', JSON.stringify(this.tktAvgClosingTimeTableArray));
      sessionStorage.setItem('TotalArray', JSON.stringify(this.AvgClosingTimerecords));
      this.router.navigate(["EmployeeWise-Ticket-Average-Closing-Time"])
    }
  }


  getUnRespondingTickets(action) {
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


    if (toDate == "") {
      toDate = null;
    } else {
      toDate = toDate;
    }


    this.preloader = true;
    this.service.UnRespondingTickets(fromDate, toDate).then(resp => {



      this.loaderhideme7 = false;
      this.preloader = false;
      if (resp.responseCode == 200) {
        this.buttonHide = false;
        this.tab7explorebtnHide = true;
        this.table7totalResponse = resp;
        this.unRespondingTicketsTableData = resp.ticketReportingResponces[0].ticketReportingPojos;

        if (this.unRespondingTicketsTableData.length == 0) {
          this.noDataAvailable = true;
          this.tab7explorebtnHide = false;
        }

        setTimeout(function () {
          $(document).ready(function () {
            $('#Unrespondingdata').DataTable({
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
              "scrollY": true,
              "scrollCollapse": true,
              "scrollX": true,
              "autoWidth": false,
              "iCookieDuration": 60,

            });
          });
        }, 2000)

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

  exploreTableSeven() {

    this.startdatedata = $('#fromDate').val();
    this.endDatedata = $('#toDate').val();

    sessionStorage.setItem("startdatedata", this.startdatedata);
    sessionStorage.setItem("endDatedata", this.endDatedata);

    if (this.unRespondingTicketsTableData.length == 0) {
      swal("No Data available");
    } else {
      sessionStorage.setItem('totalTicketResponse', JSON.stringify(this.table7totalResponse));
      this.router.navigate(["UnResponding-Tickets"]);
    }
  }


  homeclick() {
    this.router.navigateByUrl("ticket/viewticket");
  }


  getColor(value) {
    if (typeof value == 'string') {
      return 'bold'
    }
  }



  ticketDetailsIds(action) {

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

    this.loading = true;

    if (toDate == "") {
      toDate = null;
    }

    this.service.TicketDetails(fromDate, toDate).then(resp => {

      this.loading = false;
      if (resp.responseCode == 200) {
        this.controllermaindata = resp.ticketReportingResponces[0].ticketReportingPojos;
        setTimeout(function () {
          $(document).ready(function () {
            $('#ticketDetails').DataTable({
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
              "scrollY": true,
              "scrollCollapse": true,
              "scrollX": true,
              "autoWidth": false,
              "iCookieDuration": 60,

            });
          });
        }, 2000)


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




  backoptionprojectwise(backfromDate, backtoDate) {
    console.log(backfromDate);
    console.log(backtoDate);

    this.loaderhideme = false;
    this.preloader = false;
    $('#Projectwisedatatable').DataTable().destroy();
    $('.page-loader-wrapper').show();
    this.preloader = true;
    this.service.gteprojectwisecount(backfromDate, backtoDate).then(resp => {
console.log(resp);


      this.startdateDatavalue = resp.startDate;
      this.enddateDatavalue = resp.endDate;


      $('.page-loader-wrapper').hide();
      this.projectWiseTicketCountTableData = [];
      this.sumOfTotal = 0;
      this.sumOfNew = 0;
      this.sumOfOpen = 0;
      this.sumOfInprogress = 0;
      this.sumOfReopen = 0;
      this.sumOfClose = 0;

      if (resp.responseCode == 200) {
        this.Headers = ['Project Name', 'No.Of.Tickets', 'New', 'Open', 'Inprogress', 'Reopen', 'Close'];
        this.totalResponse = resp;
        this.projectWiseTicketCountTableData = resp.ticketReportingResponces[0].projectwiseTicketCount;

        this.projectbasenoOfTickets = resp.noOfTickets;

        for (let item of this.projectWiseTicketCountTableData) {
          this.sumOfTotal += item.totalTickets;
          this.sumOfNew += item.newT;
          this.sumOfOpen += item.openT;
          this.sumOfInprogress += item.inprogressT;
          this.sumOfReopen += item.reopenT;
          this.sumOfClose += item.closedT;
        }

        setTimeout(function () {
          $(document).ready(function () {
            $('#Projectwisedatatable').DataTable({
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
              "autoWidth": false,
              "iCookieDuration": 60,


            });
          });


          $('.buttons-excel, .buttons-print').each(function () {
            $(this).removeClass('btn-default').addClass('btn-primary')
          })


        }, 2000)

      } else if (resp.responseCode == 440) {
        $('.page-loader-wrapper').hide();
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
        $('.page-loader-wrapper').hide();
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }


  backtogetProjectWiseRaisedTicketTypeCount(startdate, enddate) {
    this.loaderhideme2 = false;
    this.preloader = false;

    this.service.ProjectWiseRaisedTicketTypeCount(startdate, enddate).then(resp => {



      if (resp.responseCode == 200) {
        this.table2totalResponse = resp;
        this.projectWiseTicketRaisedTicketTypeTableData = resp.ticketReportingResponces;



        for (var i = 0; i < resp.ticketReportingResponces.length; i++) {
          this.secondtabledata = this.projectWiseTicketRaisedTicketTypeTableData[i].ticktTypewiseTicketCount;
        }


        setTimeout(function () {
          $(document).ready(function () {
            $('table.display').DataTable({
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
              "autoWidth": false,
              "iCookieDuration": 60,

            });
          });
        }, 2000)

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




  backtogetEmployeeProjectwiseTicketCount(startdate, enddate) {

    this.preloader = false;
    this.controllerval = false;
    this.service.Getemployeedetails(startdate, enddate).then(resp => {


      this.employeeprojectwisereports = [];
      this.empticketTypeWiseReports = [];
      this.empsumOfArray = [];

      if (resp.responseCode == 200) {
        this.controller = resp;
        this.Employeeprojectwisetickets = resp.ticketReportingResponces[0].ticketReportingPojos;

        setTimeout(function () {
          $(document).ready(function () {
            var table = $('#employeeprojectwise').DataTable({
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
              "scrollY": true,
              "scrollCollapse": true,
              "scrollX": true,
              "autoWidth": false,
              "iCookieDuration": 60,
            });

            // $('#employeeprojectwise').on('page.dt', function () {
            //   var info = table.page.info();
            //   var page = info.page + 1;
            //   if (page == info.pages) {
            //     this.employeetotalcount = true;
            //   } else {
            //     this.employeetotalcount = true;
            //   }
            // });

          });



        }, 2000)



        this.empheadersArray = ['Employee Name', 'Total Tickets', 'Project Name'];
        for (var i = 0; i < this.Employeeprojectwisetickets[0].siteList[0].ticketTypeList.length; i++) {
          this.empheadersArray.push("Ticket Type");
          this.empheadersArray.push("No.of Tickets");
          this.empheadersArray.push("Open");
          this.empheadersArray.push("Closed");
        }
        let empticketResponse: Array<string> = [];
        for (let i = 0; i < this.Employeeprojectwisetickets.length; i++) {
          let pojo: EmployeeProjectwiseReport = new EmployeeProjectwiseReport();
          pojo.employeename = this.Employeeprojectwisetickets[i].employeeName;
          //  pojo.totalTickets = this.Employeeprojectwisetickets[i].totalTickets;
          let sitewiseTicketTypePojos: Array<Sitewisetickettype> = [];
          for (let j = 0; j < this.Employeeprojectwisetickets[i].siteList.length; j++) {
            let sitewiseTicketTypePojo: Sitewisetickettype = new Sitewisetickettype();
            sitewiseTicketTypePojo.sitename = this.Employeeprojectwisetickets[i].siteList[j].siteName;
            sitewiseTicketTypePojo.siteids = this.Employeeprojectwisetickets[i].siteList[j].siteId;
            sitewiseTicketTypePojo.totalTickets = this.Employeeprojectwisetickets[i].siteList[j].totalTickets;
            sitewiseTicketTypePojo.startDate = fromDate;
            sitewiseTicketTypePojo.endDate = toDate;
            TotalEmployeeTickets += this.Employeeprojectwisetickets[i].siteList[j].totalTickets;
            let TicketTypePojos: Array<Tickettype> = [];
            if (this.Employeeprojectwisetickets[i].siteList[j].ticketTypeList.length !== 0) {
              for (let k = 0; k < this.Employeeprojectwisetickets[i].siteList[j].ticketTypeList.length; k++) {
                let TicketTypePojo: Tickettype = new Tickettype();
                TicketTypePojo.ticketType = this.Employeeprojectwisetickets[i].siteList[j].ticketTypeList[k].ticketType;
                TicketTypePojo.numOfTickets = this.Employeeprojectwisetickets[i].siteList[j].ticketTypeList[k].totalTickets;
                TicketTypePojo.Open = this.Employeeprojectwisetickets[i].siteList[j].ticketTypeList[k].openT;
                TicketTypePojo.close = this.Employeeprojectwisetickets[i].siteList[j].ticketTypeList[k].closedT;
                TicketTypePojo.startDate = fromDate;
                TicketTypePojo.endDate = toDate;
                TicketTypePojo.tickettypeDetailsID = this.Employeeprojectwisetickets[i].siteList[j].ticketTypeList[k].ticketTypeDetailsId;
                TicketTypePojos.push(TicketTypePojo);

              }
            }


            sitewiseTicketTypePojo.tickettypearray = TicketTypePojos;
            sitewiseTicketTypePojos.push(sitewiseTicketTypePojo);
          }
          pojo.sitewiseticketTypeArray = sitewiseTicketTypePojos;
          this.employeeprojectwisereports.push(pojo);




        }

        let empticketResponse1: Array<string> = [];
        for (let i = 0; i < this.Employeeprojectwisetickets.length; i++) {
          empticketResponse1.push();


          this.Employeename = this.Employeeprojectwisetickets[i].employeeName;
          // this.EmpTotalTickets = this.Employeeprojectwisetickets[0].totalTickets;
          for (let j = 0; j < this.Employeeprojectwisetickets[i].siteList.length; j++) {
            let empticketResponse1: Array<string> = [];
            this.Employeesitename = this.Employeeprojectwisetickets[i].siteList[j].siteName;
            this.EmpTotalTickets = this.Employeeprojectwisetickets[i].siteList[j].totalTickets;
            if (this.Employeeprojectwisetickets[i].siteList[j].ticketTypeList.length !== 0) {
              for (let k = 0; k < this.Employeeprojectwisetickets[i].siteList[j].ticketTypeList.length; k++) {
                empticketResponse1.push(this.Employeeprojectwisetickets[i].siteList[j].ticketTypeList[k].ticketType);
                empticketResponse1.push(this.Employeeprojectwisetickets[i].siteList[j].ticketTypeList[k].totalTickets);
                empticketResponse1.push(this.Employeeprojectwisetickets[i].siteList[j].ticketTypeList[k].openT);
                empticketResponse1.push(this.Employeeprojectwisetickets[i].siteList[j].ticketTypeList[k].closedT);
              }
            }

            empticketResponse1.unshift(this.Employeesitename);
            empticketResponse1.unshift(this.EmpTotalTickets);
            empticketResponse1.unshift(this.Employeename);
            this.empticketTypeWiseReports.push(empticketResponse1);

          }
        }



        let NumofTickets = this.empheadersArray.lastIndexOf("No.of Tickets");
        let Open = this.empheadersArray.lastIndexOf("Open");
        let Closed = this.empheadersArray.lastIndexOf("Closed");
        var n = 4;
        var k = 5;
        var l = 6;


        while (n <= NumofTickets || k <= Open || l <= Closed) {
          for (let item of this.empticketTypeWiseReports) {
            this.employeenumoftickets += item[n];
            this.employeeOpenT += item[k];
            this.EmployeeCloseT += item[l];
          }
          this.empsumOfArray.push("Total", this.employeenumoftickets, this.employeeOpenT, this.EmployeeCloseT);
          this.employeenumoftickets = 0;
          this.employeeOpenT = 0;
          this.EmployeeCloseT = 0;
          n += 4;
          k += 4;
          l += 4;

        }
        this.empsumOfArray.unshift('-');
        this.empsumOfArray.unshift(TotalEmployeeTickets);
        this.empsumOfArray.unshift('-');
        this.loaderhideme4 = false;
        this.EmployeeDetails = true;







      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
        this.preloader = false;
      } else {
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
        this.preloader = false;
      }
    });
  }


  

  backtogetUnRespondingTickets(fromdate, todate) {

    this.preloader = true;
    this.service.UnRespondingTickets(fromdate, todate).then(resp => {



      this.loaderhideme7 = false;
      this.preloader = false;
      if (resp.responseCode == 200) {
        this.buttonHide = false;
        this.tab7explorebtnHide = true;
        this.table7totalResponse = resp;
        this.unRespondingTicketsTableData = resp.ticketReportingResponces[0].ticketReportingPojos;

        if (this.unRespondingTicketsTableData.length == 0) {
          this.noDataAvailable = true;
          this.tab7explorebtnHide = false;
        }

        setTimeout(function () {
          $(document).ready(function () {
            $('#Unrespondingdata').DataTable({
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
              "scrollY": true,
              "scrollCollapse": true,
              "scrollX": true,
              "autoWidth": false,
              "iCookieDuration": 60,

            });
          });
        }, 2000)

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

}




