import { JsonPipe } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router, NavigationExtras, RoutesRecognized } from "@angular/router";
import { CommonComponent } from '../common/common.component';
import { EmployeeProjectwiseReport } from '../model/employee-projectwise-report';
import { Sitewisetickettype } from '../model/sitewisetickettype';
import { TicketAvgClosingTime } from '../model/ticket-avg-closing-time.model';
import { Tickettype } from '../model/tickettype';
import { filter, pairwise } from 'rxjs/operators';
declare const $: any;
declare const swal: any;
var fromDate;
var toDate;
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl
} from "@angular/forms";
import { ConfirmDialogService } from '../dailogbox/confirm-dialog.service';
import { TicketmonthlyreportService } from './ticketmonthlyreport.service';


var selected_projectid;
var selected_sitename;
var selected_Escalationlevel;

@Component({
  selector: 'app-ticket-monthly-report',
  templateUrl: './ticket-monthly-report.component.html',
  styleUrls: ['./ticket-monthly-report.component.sass'],
  providers: [TicketmonthlyreportService],
})
export class TicketMonthlyReportComponent implements OnInit {



  json_response_ticketList: any;
  getTicketsData: any;
  sitenamedata: any;
  masterdata: Array<any> = [];
  fromdata: string;
  todate: string;
  viewticketData: string;
  ticketdetails: any;
  totalTicketResponse: any;
  sitename: string;
  Rating: string;
  EmployeeID: string;
  Maindata: any;
  siteidname: any[];


  fg: FormGroup;
  availableTags: Array<any> = [];

  keyword = "name";
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
  autocompleteform: FormGroup;


  isDisabled = true;

  // public countries = this.availableTags;
  customerdata: Array<any> = [];
  deptid: any;
  roleid: any;
  countries: any[];
  selectSitevalue: any;
  selectedsiteidvalue: any;
  startdatevalue: any;
  endDatevalue: any;
  sitenamevalue: any;
  ratingvalue: any;
  categoryname: any;
  MainArray: Array<any> = [];
  openclass: any;
  closedclass: any;
  totalTicketsArray: any;
  OpenTickets: any;
  escalatedTickets: any;
  ClosedTickets: any;
  avgClosingTime: any;
  avgReplyTime: any;
  enddatevalue: any;
  startdateDatavalue: any;
  enddateDatavalue: any;
  employeeIds: any;
  deptidvalue: string[];
  Categorydeptno: any;
  Escalationlevelempid: any;
  previousUrl: string;
  currentUrl: string;
  customerName: any;

  constructor(private cmn: CommonComponent, private http: Http,
    private router: Router,
    private service: TicketmonthlyreportService, private confirmDialogService: ConfirmDialogService, private formBuilder: FormBuilder,) {
    this.deptid = sessionStorage.getItem("session_deptid");
    this.roleid = sessionStorage.getItem("session_roleId");
    $('.page-loader-wrapper').hide();

    if (sessionStorage.getItem("ProjectWise") == "ProjectWiseticketcount") {
      this.backtogetEmployeeWiseFeedbackreport(sessionStorage.getItem("startdatedata"),
        sessionStorage.getItem("endDatedata"), sessionStorage.getItem("sitenamevalue"),
        sessionStorage.getItem("this.ratingvalue"), sessionStorage.getItem("categoryname"),
        sessionStorage.getItem("employeeIds"), sessionStorage.getItem("Escalationlevelempid"));
    } else {
      this.getEmployeeWiseFeedbackreport(null, null, null, null, null, null, null);
    }


    this.siteList();
    //this.preloader = false
    this.customerautofield();
    this.Escalationlevel();


  }



  ngOnInit() {

    this.router.events
      .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
      .subscribe((events: RoutesRecognized[]) => {
        this.previousUrl = events[0].urlAfterRedirects;
        this.currentUrl = events[1].urlAfterRedirects;

        if (this.previousUrl.includes('Ticketing-Dashboard/View-Tickets') || this.previousUrl.includes('Ticketing-Dashboard/View-Tickets/Ticket-Details')) {

          sessionStorage.setItem("ProjectWise", "ProjectWiseticketcount");
          sessionStorage.getItem("sitenamevalue");
          sessionStorage.getItem("this.ratingvalue");
          sessionStorage.getItem("categoryname");
          sessionStorage.getItem("pagecustomerName");
          sessionStorage.getItem("employeeIds");
          sessionStorage.getItem("Escalationlevelempid");

          $(function () {
            if (sessionStorage.getItem("startdatedata") == null) {
            } else {
              $("#fromDate").val(sessionStorage.getItem("startdatedata"));
            }

            if (sessionStorage.getItem("endDatedata") == null) {
            } else {
              $("#toDate").val(sessionStorage.getItem("endDatedata"));
            }

            if (sessionStorage.getItem("this.ratingvalue") == null || sessionStorage.getItem("this.ratingvalue") == "null") {

            } else {
              $("#Rating").val(sessionStorage.getItem("this.ratingvalue"));
            }
    
            if (sessionStorage.getItem("categoryname") == null || sessionStorage.getItem("categoryname") == "null") {
    
            } else {
              $("#Category").val(sessionStorage.getItem("categoryname"));
            }
            
          });


        } else {
          console.log('previous url is something else. call the ususal service from start');
        }
      }, error => {
      }
      );




    this.autocompleteform = this.formBuilder.group({
      employeename: ['']
    });


    $(function () {
      var self = this;
      $("#projectID").select2({
        placeholder: "--Select--",
        dir: "ltl",
      });

      $("#Rating").select2({
        placeholder: "--Select--",
        dir: "ltl",
      });

      $("#CRMEmployee").select2({
        placeholder: "--Select--",
        dir: "ltl",
      });

      $("#Category").select2({
        placeholder: "--Select--",
        dir: "ltl",
      });

      $("#Escalationlevel").select2({
        placeholder: "--Select--",
        dir: "ltl",
      });



    });


    // $('#fromDate').on('change', function (e, date) {
    //   var maxDate = $('#fromDate').val();
    //   $('#toDate').attr('min', maxDate); 
    // });



    // var date = new Date().getMonth();
    // var minimumdate = new Date().setMonth(date - 3);
    // var maximumdate = new Date().setMonth(date + 3);
    // $('#fromDate').bootstrapMaterialDatePicker({
    //   format: 'YYYY-MM-DD',
    //   //  minDate: new Date(minimumdate),
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


    var self = this;

    $(function () {
      $('#Category').change(function (e) {
        this.isDisabled = false;
        selected_projectid = $(e.target).val();
        if (selected_projectid == "select") {
          // self.disabledfun(e.target.value);
          self.Categorydeptno = e.target.value;
          console.log(self.Categorydeptno);
          self.customerautofield();
          // $("#customerdata").css("display", "none");


        } else {
          this.employeeIds = null;
          //$("#customerdata").css("display", "block");
          // self.disabledfun(e.target.value);

          self.Categorydeptno = e.target.value;

          self.customerautofield();
        }
      })



      $('#Escalationlevel').change(function (e) {
        selected_Escalationlevel = $(e.target).val();
        if (selected_Escalationlevel == "select") {
          self.Escalationlevelempid = null;

        } else {
          self.Escalationlevelempid = e.target.value;

        }

      });

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



  selectEvent(item) {
    if (item == undefined) {
      this.employeeIds = null;
    } else {
      this.employeeIds = item.id;
      this.customerName = item.name;
    }
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    // do something when input is focused
  }

  onClearSearch(item) {
    if (item == undefined) {
      this.employeeIds = null;
      sessionStorage.removeItem("employeeIds");
    }
  }


  disabledfun(data) {
    this.isDisabled = true;
    this.employeeIds = null;
    this.autocompleteform.patchValue({
      employeename: '',
    });
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


  /*-----------------Getting Project(site) list Start---------------------*/
  siteList() {
    var arr = localStorage.getItem('SiteIDS');
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "site/site.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": sessionStorage.getItem("login_sessionkey"),
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

        if (sessionStorage.getItem("sitenamevalue") == null || sessionStorage.getItem("sitenamevalue") == "null") {

        } else {
          $('#projectID').val(sessionStorage.getItem("sitenamevalue"));
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
  /*-----------------Getting Project(site) list End---------------------*/


  customerautofield() {

    this.deptid = sessionStorage.getItem("session_deptid");
    if (this.Categorydeptno == undefined) {

      if (this.deptid == "995") {
        this.deptidvalue = ["995"];
      } else if (this.deptid == "994") {
        this.deptidvalue = ["994"];
      } else {
        this.deptidvalue = ["995", "994"];
      }

    } else if (this.Categorydeptno == "select") {
      if (this.deptid == "995") {
        this.deptidvalue = ["995"];
      } else if (this.deptid == "994") {
        this.deptidvalue = ["994"];
      } else {
        this.deptidvalue = ["995", "994"];
      }

    } else {
      this.deptidvalue = [this.Categorydeptno];
    }






    if (this.autocompleteform !== undefined) {
      this.isDisabled = false;
      this.autocompleteform.patchValue({
        employeename: '',
      });

    }



    console.log(this.deptidvalue);


    $('.page-loader-wrapper').show();
    this.service.GetCustomernamefun(sessionStorage.getItem("login_sessionkey"), "DepartmentSpecific", this.deptidvalue).then(resp => {

console.log(resp);

      $(".page-loader-wrapper").hide();
      if (resp.responseCode == 200) {
        this.isDisabled = false;
        this.customerdata = resp.responseObjList;
        if (this.customerdata.length == 0) {
          //swal("Error!", "Please enter valid customer name", "error");

        } else {
          this.isDisabled = false;
          this.availableTags = [];
          for (var i = 0; i < this.customerdata.length; i++) {
            this.availableTags.push({
              id: this.customerdata[i].empId,
              name: this.customerdata[i].employeeName
            });
            //  this.employeeIds = [this.customerdata[i].employeeId];
          }

          console.log(sessionStorage.getItem("employeeIds"));
          console.log(sessionStorage.getItem("pagecustomerName"));

          if (sessionStorage.getItem("employeeIds") == "undefined" || sessionStorage.getItem("employeeIds") == undefined || sessionStorage.getItem("employeeIds") == null || sessionStorage.getItem("employeeIds") == "null") {
          } else {
            this.autocompleteform.get('employeename').patchValue(sessionStorage.getItem("pagecustomerName"));
          }



          this.isDisabled = false;
          this.countries = this.availableTags;



         
        }
      } else if (resp.responseCode == 440) {
        swal("Error!", "Your session has been expired.", "error");
        this.router.navigate([""]);
      } else {
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
      }
    }, error => {
      $('.page-loader-wrapper').hide();
      var error = JSON.parse(error._body).responseCode;
      if (error == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      }
    }
    )
  }




  searchAllServices(action) {

    console.log(sessionStorage.getItem("employeeIds"));


    var startdate = $('#fromDate').val();
    var endDate = $('#toDate').val();
    if (new Date(startdate) > new Date(endDate)) {
      swal('Please select  a valid from and to date');
      return false;
    }
    this.loaderhideme6 = false;

    this.startdatevalue = startdate;
    this.endDatevalue = endDate;
    this.sitenamevalue = $("#projectID").val();
    this.ratingvalue = $("#Rating").val();
    this.categoryname = $("#Category").val();

    if (this.startdatevalue == "") {
      this.startdatevalue = null;
    }

    if (this.endDatevalue == "") {
      this.endDatevalue = null;
    }

    if (this.sitenamevalue == "select") {
      this.sitenamevalue = null;
    } else {
      this.sitenamevalue = JSON.parse(this.sitenamevalue);
    }

    if (this.ratingvalue == "select") {
      this.ratingvalue = null;
    } else {
      this.ratingvalue = JSON.parse(this.ratingvalue);
    }

    if (this.categoryname == "select") {
      this.categoryname = null;
    } else {
      this.categoryname = JSON.parse(this.categoryname);
    }

    if (this.employeeIds == undefined) {
      this.employeeIds = null;
    } else {
      this.employeeIds = this.employeeIds
    }

    if (this.Escalationlevelempid == undefined) {
      this.Escalationlevelempid = null;
    } else {
      this.Escalationlevelempid = this.Escalationlevelempid;
    }


    if(sessionStorage.getItem("employeeIds") !== null){
      this.employeeIds = sessionStorage.getItem("employeeIds");
    }

    if (this.startdatevalue == null && this.endDatevalue == null && this.sitenamevalue == null &&
      this.ratingvalue == null && this.categoryname == null && this.employeeIds == null && this.Escalationlevelempid == null) {
      swal('Please select any option to continue!');
      return false;
    }






    this.getEmployeeWiseFeedbackreport(this.startdatevalue, this.endDatevalue, this.sitenamevalue,
      this.ratingvalue, this.categoryname, this.employeeIds, this.Escalationlevelempid);
  }

  getEmployeeWiseFeedbackreport(startdate, enddate, sitename, rating, categoryname, employeeid, Escalationlevelempid) {

    // if ($('#fromDate').val() == '' && $('#toDate').val() == '') {
    //   swal('Please select from date (or) to date');
    //   return false;
    // }

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
    this.MainArray = [];
    this.loaderhideme6 = true;


    $('.page-loader-wrapper').show();


    this.service.getmonthlyreportfun(startdate, enddate, sitename, rating, categoryname, employeeid, Escalationlevelempid).then(resp => {

      console.log(resp);

      this.loaderhideme6 = false;
      this.controller = [];

      if (resp.responseCode == 200) {


        this.controller = resp.ticketReportingResponces[0].ticketReportingPojos;
        this.startdateDatavalue = resp.startDate;
        this.enddateDatavalue = resp.endDate;

        this.MainArray = [];

        for (var i = 0; i < this.controller.length; i++) {
          this.totalTicketsArray = this.controller[i].totalTickets;


          if (this.controller[i].ticketReportingPojoList.length !== 0) {
            for (var j = 0; j < this.controller[i].ticketReportingPojoList.length; j++) {
              if (this.controller[i].ticketReportingPojoList[j].ticketStatusId == 12) {
                this.OpenTickets = this.controller[i].ticketReportingPojoList[j].totalTickets;
              }
              if (this.controller[i].ticketReportingPojoList[j].ticketStatusId == 17) {
                this.escalatedTickets = this.controller[i].ticketReportingPojoList[j].totalTickets;
              }
              if (this.controller[i].ticketReportingPojoList[j].ticketStatusId == 11) {
                this.ClosedTickets = this.controller[i].ticketReportingPojoList[j].totalTickets;
              }
            }
          } else {
            this.OpenTickets = 0;
            this.escalatedTickets = 0;
            this.ClosedTickets = 0;
          }



          if (this.controller[i].siteList.length !== 0) {
            for (var k = 0; k < this.controller[i].siteList.length; k++) {
              this.avgClosingTime = this.controller[i].siteList[k].avgClosingTime;
              this.avgReplyTime = this.controller[i].siteList[k].avgReplyTime;

            }
          } else {
            this.avgClosingTime = 0;
            this.avgReplyTime = 0;

          }

          this.MainArray.push({
            "TotalTickets": this.totalTicketsArray,
            "Open": this.OpenTickets,
            "Closed": this.ClosedTickets,
            "Escalated": this.escalatedTickets,
            "AvgClosedtime": this.avgClosingTime,
            "AvgReplytime": this.avgReplyTime
          });

        }

        $('.page-loader-wrapper').hide();


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
              "autoWidth": false,
              "iCookieDuration": 60,

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
        var error = JSON.parse(error._body).responseCode;

        $('.page-loader-wrapper').hide();
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


  // addmonthlyreport(){
  //   if (this.MainArray.length == 0) {
  //     swal("No Data available");
  //   } else {
  //     sessionStorage.setItem('getProjectwiserating', JSON.stringify(this.MainArray));
  //     sessionStorage.setItem("FeedbackMainService", JSON.stringify(this.controller));
  //     sessionStorage.setItem("Fromdata", this.startdatevalue);
  //     sessionStorage.setItem("ToDate",this.endDatevalue);
  //     sessionStorage.setItem("Sitename", this.sitenamevalue);
  //     sessionStorage.setItem("Rating", this.ratingvalue);
  //     sessionStorage.setItem("Employeename", this.categoryname);
  //     sessionStorage.setItem("EmployeeID" , this.employeeIds);
  //     this.router.navigate(["Addmonthlyreport"]);
  //   }

  // }


  eventclickfun(item, index, status) {

    sessionStorage.setItem("startdatedata", this.startdatevalue);
    sessionStorage.setItem("endDatedata", this.endDatevalue);
    sessionStorage.setItem("sitenamevalue", this.sitenamevalue);
    sessionStorage.setItem("this.ratingvalue", this.ratingvalue);
    sessionStorage.setItem("categoryname", this.categoryname);

    sessionStorage.setItem("employeeIds", this.employeeIds);
    sessionStorage.setItem("pagecustomerName", this.customerName);
    sessionStorage.setItem("Escalationlevelempid", this.Escalationlevelempid);

    this.masterdata = [];
    this.siteidname = [];
    this.Maindata = this.controller[index].ticketReportingPojoList;

    for (var i = 0; i < this.Maindata.length; i++) {
      if (this.Maindata[i].ticketStatus == status) {

        if (this.Maindata[i].ticketReportingPojoList !== null) {
          for (var j = 0; j < this.Maindata[i].ticketReportingPojoList.length; j++) {
            this.masterdata.push(this.Maindata[i].ticketReportingPojoList[j].ticketId);
            this.siteidname.push(this.Maindata[i].ticketReportingPojoList[j].siteId);
          }
        }


      } else if (status == "Nooftickets") {
        if (this.Maindata[i].ticketReportingPojoList !== null) {
          for (var j = 0; j < this.Maindata[i].ticketReportingPojoList.length; j++) {
            this.masterdata.push(this.Maindata[i].ticketReportingPojoList[j].ticketId);
            this.siteidname.push(this.Maindata[i].ticketReportingPojoList[j].siteId);
          }
        }

      }
    }



    this.masterdata = this.masterdata.filter(function (item, pos, self) {
      return self.indexOf(item) == pos;
    })

    this.siteidname = this.siteidname.filter(function (item, pos, self) {
      return self.indexOf(item) == pos;
    })







    this.getdatafunction();

  }


  getdatafunction() {

    if (this.startdatevalue == "") {
      this.startdatevalue = null;
    }

    if (this.endDatevalue == "") {
      this.endDatevalue = null;
    }


    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "ticketreport/getTicketingDashBoardDetails.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "ticketIds": this.masterdata,
      "requestUrl": "getUnRespondingTickets",
      "startDate": this.startdatevalue,
      "endDate": this.endDatevalue,
      "siteIds": this.siteidname,
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
          sessionStorage.setItem('navigatingFrom', 'Addmonthlyreport');

          sessionStorage.setItem('Monthlyreport', 'Monthlyreport');

          sessionStorage.removeItem('Feedbackreport1');
          sessionStorage.removeItem("Ticketaveragetimeside");
          sessionStorage.removeItem("Ticketprojectwisereport");
          this.router.navigate(["Ticketing-Dashboard/View-Tickets"]);

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


  Escalationlevel() {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "ticketreport/getEscalationLevelDetails.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": sessionStorage.getItem("login_sessionkey"),
    }

    this.http.post(url, body).map(res => res.json()).subscribe(resp => {

      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#Escalationlevel').html("");
        $('#Escalationlevel').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.ticketReportingResponces[0].ticketReportingPojos.length; i++) {
          $('#Escalationlevel').append("<option value='" + resp.ticketReportingResponces[0].ticketReportingPojos[i].empId + "'>" + resp.ticketReportingResponces[0].ticketReportingPojos[i].escalationLevelEmpName + "</option>");
        }

        if (sessionStorage.getItem("Escalationlevelempid") == null) {

        } else {
          $('#Escalationlevel').val(sessionStorage.getItem("Escalationlevelempid"));
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





  backtogetEmployeeWiseFeedbackreport(startDate, enddate, sitename, ratingvalue, categoryname, employeeIds, Escalationlevelempid) {
  
  

  

    this.MainArray = [];
    this.loaderhideme6 = true;


    $('.page-loader-wrapper').show();


    this.service.getmonthlyreportfun(startDate, enddate, sitename, ratingvalue, categoryname, employeeIds, Escalationlevelempid).then(resp => {

      this.loaderhideme6 = false;
      this.controller = [];

      if (resp.responseCode == 200) {


        this.controller = resp.ticketReportingResponces[0].ticketReportingPojos;
        this.startdateDatavalue = resp.startDate;
        this.enddateDatavalue = resp.endDate;

        this.MainArray = [];

        for (var i = 0; i < this.controller.length; i++) {
          this.totalTicketsArray = this.controller[i].totalTickets;


          if (this.controller[i].ticketReportingPojoList.length !== 0) {
            for (var j = 0; j < this.controller[i].ticketReportingPojoList.length; j++) {
              if (this.controller[i].ticketReportingPojoList[j].ticketStatusId == 12) {
                this.OpenTickets = this.controller[i].ticketReportingPojoList[j].totalTickets;
              }
              if (this.controller[i].ticketReportingPojoList[j].ticketStatusId == 17) {
                this.escalatedTickets = this.controller[i].ticketReportingPojoList[j].totalTickets;
              }
              if (this.controller[i].ticketReportingPojoList[j].ticketStatusId == 11) {
                this.ClosedTickets = this.controller[i].ticketReportingPojoList[j].totalTickets;
              }
            }
          } else {
            this.OpenTickets = 0;
            this.escalatedTickets = 0;
            this.ClosedTickets = 0;
          }



          if (this.controller[i].siteList.length !== 0) {
            for (var k = 0; k < this.controller[i].siteList.length; k++) {
              this.avgClosingTime = this.controller[i].siteList[k].avgClosingTime;
              this.avgReplyTime = this.controller[i].siteList[k].avgReplyTime;

            }
          } else {
            this.avgClosingTime = 0;
            this.avgReplyTime = 0;

          }

          this.MainArray.push({
            "TotalTickets": this.totalTicketsArray,
            "Open": this.OpenTickets,
            "Closed": this.ClosedTickets,
            "Escalated": this.escalatedTickets,
            "AvgClosedtime": this.avgClosingTime,
            "AvgReplytime": this.avgReplyTime
          });

        }

        $('.page-loader-wrapper').hide();


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
              "autoWidth": false,
              "iCookieDuration": 60,

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
        //var error = JSON.parse(error._body).responseCode;

        $('.page-loader-wrapper').hide();
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }




}
