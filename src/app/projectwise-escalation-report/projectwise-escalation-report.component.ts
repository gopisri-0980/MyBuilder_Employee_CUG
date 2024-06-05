import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router, NavigationExtras, RoutesRecognized } from "@angular/router";
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
import { CommonComponent } from '../common/common.component';
import { ProjectwiseEscalationReportService } from './projectwise-escalation-report.service';
import { filter, pairwise } from 'rxjs/operators';


var selected_projectid;
@Component({
  selector: 'app-projectwise-escalation-report',
  templateUrl: './projectwise-escalation-report.component.html',
  styleUrls: ['./projectwise-escalation-report.component.sass']
})
export class ProjectwiseEscalationReportComponent implements OnInit {
  fg: FormGroup;
  EmployeeDetails: boolean;
  loaderhideme: boolean;
  loaderhideme2: boolean;
  loaderhideme3: boolean;
  loaderhideme4: boolean;
  loaderhideme5: boolean;
  loaderhideme6: boolean;
  loaderhideme7: boolean;
  loaderhideme8: boolean;
  escalationTicketsDetailsTableData: Array<any> =[];
  preloader: boolean;

  escButtonHide: boolean;
  tab5explorebtnHide: boolean;
  table5totalResponse: any;
  escNoDataAvailable: boolean;
  startdatedata: any;
  endDatedata: any;
  startdateDatavalue: any;
  enddateDatavalue: any;
  previousUrl: string;
  currentUrl: string;
  selected_projectid: any;

  table5TotalTicketResponse: any;
  getTicketsData: any = [];
  json_response_EscalationTickets: any;
  escalationTicketCountTableData: any = [];
  totalnumberoftickets: any;
  constructor(private cmn: CommonComponent, private http: Http,
    private router: Router, private service: ProjectwiseEscalationReportService
  ) {
    $('.page-loader-wrapper').hide();




    if (sessionStorage.getItem("ProjectWise") == "ProjectWiseticketcount") {
      this.backgetEscalationTicketsDetailsCount(sessionStorage.getItem("start_date_data"), sessionStorage.getItem("end_Date_data") , sessionStorage.getItem("select_project_id"));
      this.siteList();
    } else {
      this.getEscalationTicketsDetailsCount('default');
      this.siteList();
    }

   

  }

  ngOnInit() {


    this.router.events
      .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
      .subscribe((events: RoutesRecognized[]) => {
        this.previousUrl = events[0].urlAfterRedirects;
        this.currentUrl = events[1].urlAfterRedirects;

        if ( this.previousUrl.includes('Escalation-Tickets') || this.previousUrl.includes('Ticketing-Dashboard/View-Tickets') || this.previousUrl.includes('Ticketing-Dashboard/View-Tickets/Ticket-Details')) {

          sessionStorage.setItem("ProjectWise", "ProjectWiseticketcount");

          $(function () {
            if (sessionStorage.getItem("start_date_data") == null) {
            } else {
              $("#fromDate").val(sessionStorage.getItem("start_date_data"));
            }

            if (sessionStorage.getItem("end_Date_data") == null) {
            } else {
              $("#toDate").val(sessionStorage.getItem("end_Date_data"));
            }
          });


        } else {
          // console.log('previous url is something else. call the ususal service from start');
        }
      }, error => {
      }
      );



    this.fg = new FormGroup(
      {
        from: new FormControl(""),
        to: new FormControl("")
      },
      [Validators.required, this.dateRangeValidator]
    );

    $("#projectID").select2({
      placeholder: "--Select--",
      dir: "ltl",
    });


    var self = this;
    $(function () {
      $('#projectID').change(function (e) {
        selected_projectid = $(e.target).val();

        if (selected_projectid == "select") {
          selected_projectid = null;
          sessionStorage.removeItem("select_project_id");
        } else {
          selected_projectid = selected_projectid;
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







    this.getEscalationTicketsDetailsCount(action);


    if (action == 'submitClick') {

      this.escalationTicketsDetailsTableData = [];

    }

  }

  getEscalationTicketsDetailsCount(action) {

    if (selected_projectid == null || selected_projectid == undefined || selected_projectid == "") {
      this.selected_projectid = null;
    } else {
      this.selected_projectid = selected_projectid;
    }

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

    if (toDate == "") {
      toDate = null;
    }

    console.log(fromDate);
    console.log(toDate);
    this.loaderhideme5 = true;
    this.service.EscalationTicketsDetailsCount(fromDate, toDate, this.selected_projectid).then(resp => {

      console.log(resp);

      this.loaderhideme5 = false;
      this.preloader = false;
      if (resp.responseCode == 200) {

        this.startdateDatavalue = resp.startDate;
        this.enddateDatavalue = resp.endDate;


        this.escButtonHide = false;
        this.tab5explorebtnHide = true;
        this.table5totalResponse = resp;
        this.escalationTicketsDetailsTableData = resp.ticketReportingResponces[0].ticketEscalationLevelEmployeeDetails;

        setTimeout(function () {
          $(document).ready(function () {
            $('#Escalationtickets').DataTable({
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



        if (this.escalationTicketsDetailsTableData.length == 0) {
          this.escNoDataAvailable = true;
          this.tab5explorebtnHide = false;
        }
      } else if (resp.responseCode == 440) {
        this.loaderhideme5 = false;
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        this.loaderhideme5 = false;
        swal(resp.errors[0]);
        return false;
      }
    },
      error => {
        var error = JSON.parse(error._body).responseCode;
        this.loaderhideme5 = false;
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }
  setDate() {
    throw new Error('Method not implemented.');
  }

  exploreTableFive() {

    if (selected_projectid == null || selected_projectid == undefined || selected_projectid == "") {
      this.selected_projectid = null;
    } else {
      this.selected_projectid = selected_projectid;
    }


    this.startdatedata = $('#fromDate').val();
    this.endDatedata = $('#toDate').val();

    sessionStorage.setItem("start_date_data", this.startdatedata);
    sessionStorage.setItem("end_Date_data", this.endDatedata);
    sessionStorage.setItem("select_project_id", this.selected_projectid);


    if (this.escalationTicketsDetailsTableData.length == 0) {
      swal("No Data available");
    } else {
      sessionStorage.setItem('getEscalationTicketsDetailsCount', JSON.stringify(this.table5totalResponse));
      this.router.navigate(["Escalation-Tickets"])
    }
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
      console.log(resp);
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {



        $('#projectID').html("");
        $('#projectID').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#projectID').append("<option value='" + resp.responseObjList[i].id + "'>" + resp.responseObjList[i].name + "</option>");
        }

        console.log(sessionStorage.getItem("select_project_id"));
        if (sessionStorage.getItem("select_project_id") == null || sessionStorage.getItem("select_project_id") == "null") {

        } else {
          $('#projectID').val(sessionStorage.getItem("select_project_id"));
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


  backgetEscalationTicketsDetailsCount(fromDate, toDate, selected_projectid) {

    console.log(selected_projectid );

    this.loaderhideme5 = true;
    this.service.EscalationTicketsDetailsCount(fromDate, toDate, selected_projectid).then(resp => {

      console.log(resp);

      this.loaderhideme5 = false;
      this.preloader = false;
      if (resp.responseCode == 200) {

        this.startdateDatavalue = resp.startDate;
        this.enddateDatavalue = resp.endDate;


        this.escButtonHide = false;
        this.tab5explorebtnHide = true;
        this.table5totalResponse = resp;
        this.escalationTicketsDetailsTableData = resp.ticketReportingResponces[0].ticketEscalationLevelEmployeeDetails;

        setTimeout(function () {
          $(document).ready(function () {
            $('#Escalationtickets').DataTable({
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



        if (this.escalationTicketsDetailsTableData.length == 0) {
          this.escNoDataAvailable = true;
          this.tab5explorebtnHide = false;
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
        this.preloader = false;
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }

  homeClick() {
    this.router.navigateByUrl("Ticketing-Dashboard");
  }


  getSiteEscalationDetails(siteid, levelid, ticketTypeId, employeeid) {

    if (employeeid[0] == null) {
      employeeid = null;
    }

    this.preloader = true;
    let url = this.cmn.commonUrl + "ticketreport/getSiteTickettypeLevelWiseEscalationDetails.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "startDate": this.table5totalResponse.startDate,
      "endDate": this.table5totalResponse.endDate,
      "ticketTypeIds": ticketTypeId,
      "levelIds": levelid,
      "siteIds": siteid,
      "empIds": employeeid,
    }

    // console.log(body);


    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      // console.log(resp);
      this.preloader = false;
      if (resp.responseCode == 200) {
        this.table5TotalTicketResponse = resp;
        this.getTicketsData = resp.ticketReportingResponces[0].ticketReportingPojos;
        if (this.getTicketsData.length == 0) {
          swal("No tickets available");
        } else {
          sessionStorage.setItem('totalTicketResponse', JSON.stringify(this.table5TotalTicketResponse));
          sessionStorage.setItem('totalTicketResponseTwo', "");
          sessionStorage.setItem('navigatingFrom', 'escalationTickets');
          this.router.navigate(["Ticketing-Dashboard/View-Tickets"]);
        }
      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        swal(resp.errors[0]);
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
