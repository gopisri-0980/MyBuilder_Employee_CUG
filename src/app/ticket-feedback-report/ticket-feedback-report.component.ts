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


import { TicketfeedbackreportService } from './ticketfeedbackreport.service';
import { filter, pairwise } from 'rxjs/operators';


@Component({
  selector: 'app-ticket-feedback-report',
  templateUrl: './ticket-feedback-report.component.html',
  styleUrls: ['./ticket-feedback-report.component.sass'],
  providers: [TicketfeedbackreportService]
})
export class TicketFeedbackReportComponent implements OnInit {


  json_response_ticketList: any;
  getTicketsData: any;
  controller: Array<any> = [];
  controllerdata: Array<any> = [];
  sitenamedata: any;
  masterdata: Array<any> = [];
  fromdata: string;
  todate: string;
  viewticketData: string;
  ticketdetails: any;
  totalTicketResponse: any;

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
  avgTktClosingTimeObject: { startDate: any; endDate: any; ticketType: any; projectName: any; totalTickets: any; openTickets: any; closedTickets: any; avgClosingTime: any; empName: any; avgReplyTime: any; ticketTypeIds: any; ticketTypeDetailsId: any; siteIds: any; };
  tab6sumOfTotal: any = 0;
  tab6sumOfOpen: any = 0;
  tab6sumOfClosed: any = 0;
  tab6sumOfAvgClosingTime: any = 0;
  tab6sumOfAvgReplyTime: any = 0;
  ticketTypeDetailsIds: any = [];
  Headers: string[];
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
  sitenameval: any;
  ratingfive: any;
  ratingfour: any;
  ratingthree: any;
  ratingtwo: any;
  ratingone: any;
  MainArray: Array<any> = [];
  startdatevalue: any;
  enddatevalue: any;
  startdatedata: any;
  endDatedata: any;
  previousUrl: string;
  currentUrl: string;
  ratingsix: any;
  ratingseveen: any;
  ratingeight: any;
  ratingnine: any;
  ratingten: any;
  ratingZero: any;


  constructor(private cmn: CommonComponent, private http: Http,
    private router: Router,
    private service: TicketfeedbackreportService) {
    $('.page-loader-wrapper').hide();

    //this.preloader = false


    if (sessionStorage.getItem("ProjectWise") == "ProjectWiseticketcount") {
      this.backtogetEmployeeWiseFeedbackreport(sessionStorage.getItem("startdatedata"), sessionStorage.getItem("endDatedata"));
    } else {
      this.getEmployeeWiseFeedbackreport('default');
    }

  }



  ngOnInit() {





    this.router.events
      .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
      .subscribe((events: RoutesRecognized[]) => {
        this.previousUrl = events[0].urlAfterRedirects;
        this.currentUrl = events[1].urlAfterRedirects;

        if (this.previousUrl.includes('Ticketing-Dashboard/View-Tickets') || this.previousUrl.includes('Ticketing-Dashboard/View-Tickets/Ticket-Details')) {

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
          // console.log('previous url is something else. call the ususal service from start');
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
    //   // minDate: new Date(minimumdate),
    //   maxDate: new Date(),
    //   clearButton: true,
    //   weekStart: 1,
    //   time: false,

    // }).on('change', function (e, date) {
    //   $('#toDate').bootstrapMaterialDatePicker('setMinDate', date);
    // });

    // $('#toDate').bootstrapMaterialDatePicker({
    //   format: 'YYYY-MM-DD',
    //   //  minDate: new Date(minimumdate),
    //   maxDate: new Date(),
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
    this.loaderhideme6 = true;
    this.MainArray = [];
    this.getEmployeeWiseFeedbackreport(action);

    if (action == 'submitClick') {
      this.tktAvgClosingTimeTableArray = [];
      this.avgClosingButtonHide = true;
    }


  }


  getEmployeeWiseFeedbackreport(action) {
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

    this.service.getFeedbackReport(fromDate, toDate).then(resp => {
      console.log(resp);

      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        this.controller = resp.ticketReportingResponces[0].ticketReportingPojos[0].siteList;

        console.log(this.controller);

        this.startdatevalue = resp.startDate;
        this.enddatevalue = resp.endDate;



        this.MainArray = [];
        for (var i = 0; i < this.controller.length; i++) {
          this.sitenameval = this.controller[i].siteName;
          for (var j = 0; j < this.controller[i].ticketIds.length; j++) {

            if (this.controller[i].ticketIds[j].rating == 10) {
              this.ratingten = this.controller[i].ticketIds[j].totalTickets;
            }


            if (this.controller[i].ticketIds[j].rating == 9) {
              this.ratingnine = this.controller[i].ticketIds[j].totalTickets;
            }


            if (this.controller[i].ticketIds[j].rating == 8) {
              this.ratingeight = this.controller[i].ticketIds[j].totalTickets;
            }

            if (this.controller[i].ticketIds[j].rating == 7) {
              this.ratingseveen = this.controller[i].ticketIds[j].totalTickets;
            }

            if (this.controller[i].ticketIds[j].rating == 6) {
              this.ratingsix = this.controller[i].ticketIds[j].totalTickets;
            }

            if (this.controller[i].ticketIds[j].rating == 5) {
              this.ratingfive = this.controller[i].ticketIds[j].totalTickets;
            }

            if (this.controller[i].ticketIds[j].rating == 4) {
              this.ratingfour = this.controller[i].ticketIds[j].totalTickets;
            }

            if (this.controller[i].ticketIds[j].rating == 3) {
              this.ratingthree = this.controller[i].ticketIds[j].totalTickets;
            }

            if (this.controller[i].ticketIds[j].rating == 2) {
              this.ratingtwo = this.controller[i].ticketIds[j].totalTickets;
            }

            if (this.controller[i].ticketIds[j].rating == 1) {
              this.ratingone = this.controller[i].ticketIds[j].totalTickets;
            }

            if (this.controller[i].ticketIds[j].rating == 0) {
              this.ratingZero = this.controller[i].ticketIds[j].totalTickets;
            }


          }


          this.MainArray.push({
            "Sitename": this.sitenameval,
            "Ten": this.ratingten,
            "Nine": this.ratingnine,
            "Eight": this.ratingeight,
            "Seven": this.ratingseveen,
            "Six": this.ratingsix,
            "Five": this.ratingfive,
            "Four": this.ratingfour,
            "Three": this.ratingthree,
            "Two": this.ratingtwo,
            "One": this.ratingone,
            "Zero": this.ratingZero
          });

        }

        setTimeout(function () {
          $(document).ready(function () {

            $('#ticketmonthlyreport').DataTable({
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
        $('.page-loader-wrapper').hide();
        var error = JSON.parse(error._body).responseCode;
        //  this.preloader = false;
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }

  homeClick() {
    this.router.navigateByUrl("ticket/viewticket");
  }

  dashtitle() {
    this.router.navigateByUrl("Ticketing-Dashboard");
  }


  // exploreTableSix() {
  //   if (this.MainArray.length == 0) {
  //     swal("No Data available");
  //   } else {
  //     sessionStorage.setItem('getProjectwiserating', JSON.stringify(this.MainArray));
  //     sessionStorage.setItem("FeedbackMainService", JSON.stringify(this.controller));
  //     sessionStorage.setItem("Fromdata", $('#fromDate').val());
  //     sessionStorage.setItem("ToDate", $('#toDate').val());
  //     this.router.navigate(["AddTicketfeedback"])
  //   }
  // }



  eventclickfun(userdata, index, rating) {

    this.startdatedata = $('#fromDate').val();
    this.endDatedata = $('#toDate').val();

    sessionStorage.setItem("startdatedata", this.startdatedata);
    sessionStorage.setItem("endDatedata", this.endDatedata);



    this.masterdata = [];
    this.sitenamedata = this.controller[index].siteId;
    for (var i = 0; i < this.controller[index].ticketIds.length; i++) {
      if (rating === this.controller[index].ticketIds[i].rating) {
        if (this.controller[index].ticketIds[i].totalTickets !== 0) {
          for (var j = 0; j < this.controller[index].ticketIds[i].ticketReportingPojoList.length; j++) {

            this.masterdata.push(this.controller[index].ticketIds[i].ticketReportingPojoList[j].ticketId);
          }
        }
      }
    }



    this.getdatafunction();

  }

  getdatafunction() {

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
    let url = this.cmn.commonUrl + "ticketreport/getTicketingDashBoardDetails.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "ticketIds": this.masterdata,
      "requestUrl": "getUnRespondingTickets",
      "startDate": fromDate,
      "endDate": toDate,
      "siteIds": [JSON.parse(this.sitenamedata)],
      "ticketStatusIds": ["Open", "Closed"],
      "flag": true
    }






    this.http.post(url, body).map(res => res.json()).subscribe(resp => {

      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {

        this.ticketdetails = resp.ticketReportingResponces[0].ticketReportingPojos;
        this.totalTicketResponse = resp;
        if (this.ticketdetails.length == 0) {
          swal("No tickets available");
          return false;
        } else {


          sessionStorage.setItem('totalTicketResponse', JSON.stringify(this.totalTicketResponse));
          sessionStorage.setItem('totalTicketResponseTwo', "");
          sessionStorage.setItem('navigatingFrom', 'Feedbackreport');
          sessionStorage.setItem('Feedbackreport1', 'Feedbackreport1');
          sessionStorage.removeItem("Ticketprojectwisereport");

          sessionStorage.removeItem('Monthlyreport');
          sessionStorage.removeItem("Ticketaveragetimeside");
          this.router.navigate(["Ticketing-Dashboard/View-Tickets"]);
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


  backtogetEmployeeWiseFeedbackreport(fromdate, todate) {
    $('.page-loader-wrapper').show();

    this.service.getFeedbackReport(fromDate, toDate).then(resp => {

      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        this.controller = resp.ticketReportingResponces[0].ticketReportingPojos[0].siteList;

        console.log(this.controller);

        this.startdatevalue = resp.startDate;
        this.enddatevalue = resp.endDate;



        this.MainArray = [];
        for (var i = 0; i < this.controller.length; i++) {
          this.sitenameval = this.controller[i].siteName;
          for (var j = 0; j < this.controller[i].ticketIds.length; j++) {
            if (this.controller[i].ticketIds[j].rating == 10) {
              this.ratingten = this.controller[i].ticketIds[j].totalTickets;
            }


            if (this.controller[i].ticketIds[j].rating == 9) {
              this.ratingnine = this.controller[i].ticketIds[j].totalTickets;
            }


            if (this.controller[i].ticketIds[j].rating == 8) {
              this.ratingeight = this.controller[i].ticketIds[j].totalTickets;
            }

            if (this.controller[i].ticketIds[j].rating == 7) {
              this.ratingseveen = this.controller[i].ticketIds[j].totalTickets;
            }

            if (this.controller[i].ticketIds[j].rating == 6) {
              this.ratingsix = this.controller[i].ticketIds[j].totalTickets;
            }

            if (this.controller[i].ticketIds[j].rating == 5) {
              this.ratingfive = this.controller[i].ticketIds[j].totalTickets;
            }

            if (this.controller[i].ticketIds[j].rating == 4) {
              this.ratingfour = this.controller[i].ticketIds[j].totalTickets;
            }

            if (this.controller[i].ticketIds[j].rating == 3) {
              this.ratingthree = this.controller[i].ticketIds[j].totalTickets;
            }

            if (this.controller[i].ticketIds[j].rating == 2) {
              this.ratingtwo = this.controller[i].ticketIds[j].totalTickets;
            }

            if (this.controller[i].ticketIds[j].rating == 1) {
              this.ratingone = this.controller[i].ticketIds[j].totalTickets;
            }

            if (this.controller[i].ticketIds[j].rating == 0) {
              this.ratingZero = this.controller[i].ticketIds[j].totalTickets;
            }

          }


          this.MainArray.push({
            "Sitename": this.sitenameval,
            "Ten": this.ratingten,
            "Nine": this.ratingnine,
            "Eight": this.ratingeight,
            "Seven": this.ratingseveen,
            "Six": this.ratingsix,
            "Five": this.ratingfive,
            "Four": this.ratingfour,
            "Three": this.ratingthree,
            "Two": this.ratingtwo,
            "One": this.ratingone,
            "Zero": this.ratingZero
          });

        }

        setTimeout(function () {
          $(document).ready(function () {
            $('#ticketmonthlyreport').DataTable({
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
        $('.page-loader-wrapper').hide();
        var error = JSON.parse(error._body).responseCode;
        //  this.preloader = false;
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );

  }


}