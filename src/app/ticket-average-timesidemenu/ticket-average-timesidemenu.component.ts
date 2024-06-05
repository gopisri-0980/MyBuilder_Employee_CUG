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
  selector: 'app-ticket-average-timesidemenu',
  templateUrl: './ticket-average-timesidemenu.component.html',
  styleUrls: ['./ticket-average-timesidemenu.component.css']
})
export class TicketAverageTimesidemenuComponent implements OnInit {
  fg: FormGroup;
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
  avgTktClosingTimeObject: { startDate: any; endDate: any; ticketType: any; projectName: any; totalTickets: any; openTickets: any; closedTickets: any; avgClosingTime: any; empName: any; avgReplyTime: any; ticketTypeIds: any; ticketTypeDetailsId: any; siteIds: any; ticketsids: any };
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
  startdateDatavalue: any;
  enddateDatavalue: any;
  ticketids: any[];
  uniqueticketsidArray: any[];
  previousUrl: string;
  currentUrl: string;
  startdatedata: any;
  endDatedata: any;


  constructor(private cmn: CommonComponent, private http: Http,
    private router: Router,
    private service: TicketingmanagementdashboardService, private confirmDialogService: ConfirmDialogService,) {
    $('.page-loader-wrapper').hide();
    this.siteList_temp()
    this.preloader = false;

   


    if (sessionStorage.getItem("ProjectWise") == "ProjectWiseticketcount") {
      this.backtogetEmployeeWiseTicketAverageClosingTime(sessionStorage.getItem("startdatedata"), sessionStorage.getItem("endDatedata"));
    } else {
      this.getEmployeeWiseTicketAverageClosingTime('default');
    }


  }



  ngOnInit() {


    this.router.events
    .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
    .subscribe((events: RoutesRecognized[]) => {
      this.previousUrl = events[0].urlAfterRedirects;
      this.currentUrl = events[1].urlAfterRedirects;

      if (this.previousUrl.includes('EmployeeWise-Ticket-Average-Closing-Time') || this.previousUrl.includes('Ticketing-Dashboard/View-Tickets/Ticket-Details')) {

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
    //   $('#fromDate').bootstrapMaterialDatePicker({
    //     format: 'YYYY-MM-DD',
    // //    minDate: new Date(minimumdate),
    //     maxDate: new Date(),
    //     clearButton: true,
    //     weekStart: 1,
    //     time: false,

    //   }).on('change', function (e, date) {
    //     $('#toDate').bootstrapMaterialDatePicker('setMinDate', date);
    //   });

    //   $('#toDate').bootstrapMaterialDatePicker({
    //     format: 'YYYY-MM-DD',
    //    // minDate: new Date(minimumdate),
    //     maxDate: new Date(),
    //     clearButton: true,
    //     weekStart: 1,
    //     time: false
    //   });
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
    this.loaderhideme6 = true;
    this.getEmployeeWiseTicketAverageClosingTime(action);

    if (action == 'submitClick') {
      this.tktAvgClosingTimeTableArray = [];
      this.avgClosingButtonHide = true;
    }


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


    console.log(fromDate);
    console.log(toDate);

    if (toDate == "") {
      toDate = null;
    } else {
      toDate = toDate;
    }

    //this.preloader = true
    this.service.EmployeeWiseTicketAverageClosingTime(fromDate, toDate).then(resp => {
      console.log(resp);
      this.preloader = false
      this.loaderhideme6 = false;
      if (resp.responseCode == 200) {

        this.startdateDatavalue = resp.startDate;
        this.enddateDatavalue = resp.endDate;

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

        console.log(this.avgClosingTimeTicketsDetailsTableData);


        if (this.avgClosingTimeTicketsDetailsTableData.length == 0) {
          this.avgClosingNoDataAvailable = true;
          this.tab6explorebtnHide = false;
        }
       


       
        this.tktAvgClosingTimeTableArray = [];
        for (let ticketType of this.avgClosingTimeTicketsDetailsTableData) {
          
          for (let item of ticketType.siteList) {

            console.log(item);
            this.uniqueticketsidArray = [];
            let uniqueticketTypeDetailsIdsArray = [];
            this.ticketids = [];
            let ticketTypeDetailsIds = [];
            for (let ticket of item.ticketIds) {

              ticketTypeDetailsIds.push(ticket.ticketTypeDetailsId);
              this.ticketids.push(ticket.ticketId);
              uniqueticketTypeDetailsIdsArray = Array.from(new Set(ticketTypeDetailsIds));
              this.uniqueticketsidArray = Array.from(new Set(this.ticketids));
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
              siteIds: item.siteId,
              ticketsids: this.uniqueticketsidArray,
            };
            this.tktAvgClosingTimeTableArray.push(this.avgTktClosingTimeObject);
          }
        }


        console.log(this.tktAvgClosingTimeTableArray);

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
              "scrollX": true,
              "autoWidth": false,
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
        this.preloader = false
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
      sessionStorage.setItem("status", "Ticketaveragetimeside");
      this.router.navigate(["EmployeeWise-Ticket-Average-Closing-Time"]);
      sessionStorage.removeItem('Monthlyreport');
      sessionStorage.removeItem('Feedbackreport1');
      sessionStorage.removeItem("Ticketprojectwisereport");
      sessionStorage.setItem("Ticketaveragetimeside", "Ticketaveragetimeside");


    }
  }


  homeClick() {
    this.router.navigateByUrl("ticket/viewticket");
  }

  dashtitle() {
    this.router.navigateByUrl("Ticketing-Dashboard");
  }


  backtogetEmployeeWiseTicketAverageClosingTime(fromdate , todate){

      this.preloader = true
      this.service.EmployeeWiseTicketAverageClosingTime(fromDate, toDate).then(resp => {
        console.log(resp);
        this.preloader = false
        this.loaderhideme6 = false;
        if (resp.responseCode == 200) {
  
          this.startdateDatavalue = resp.startDate;
          this.enddateDatavalue = resp.endDate;
  
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
  
          console.log(this.avgClosingTimeTicketsDetailsTableData);
  
  
          if (this.avgClosingTimeTicketsDetailsTableData.length == 0) {
            this.avgClosingNoDataAvailable = true;
            this.tab6explorebtnHide = false;
          }
         
  
  
         
          this.tktAvgClosingTimeTableArray = [];
          for (let ticketType of this.avgClosingTimeTicketsDetailsTableData) {
            
            for (let item of ticketType.siteList) {
  
              console.log(item);
              this.uniqueticketsidArray = [];
              let uniqueticketTypeDetailsIdsArray = [];
              this.ticketids = [];
              let ticketTypeDetailsIds = [];
              for (let ticket of item.ticketIds) {
  
                ticketTypeDetailsIds.push(ticket.ticketTypeDetailsId);
                this.ticketids.push(ticket.ticketId);
                uniqueticketTypeDetailsIdsArray = Array.from(new Set(ticketTypeDetailsIds));
                this.uniqueticketsidArray = Array.from(new Set(this.ticketids));
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
                siteIds: item.siteId,
                ticketsids: this.uniqueticketsidArray,
              };
              this.tktAvgClosingTimeTableArray.push(this.avgTktClosingTimeObject);
            }
          }
  
  
          console.log(this.tktAvgClosingTimeTableArray);
  
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
                "scrollX": true,
                "autoWidth": false,
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
          this.preloader = false
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