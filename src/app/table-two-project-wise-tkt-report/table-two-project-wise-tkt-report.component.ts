import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { CommonComponent } from '../common/common.component';
declare const $: any;
declare const swal: any;

@Component({
  selector: 'app-table-two-project-wise-tkt-report',
  templateUrl: './table-two-project-wise-tkt-report.component.html',
  styleUrls: ['./table-two-project-wise-tkt-report.component.sass']
})
export class TableTwoProjectWiseTktReportComponent implements OnInit {
  json_response_projectWIse: any;
  projectWiseTicketCountTableData: any = [];
  allSiteIds: any = [];
  getTicketsData: any = [];
  totalTicketResponse: any;
  json_response_projectWIseTktReport: any;
  projectWiseTicketReportTableData: any = [];
  ProjectWiseReportTicketListResponse: any;
  allTicketTypeIds: any = [];
  preloader: boolean;

  constructor(private cmn: CommonComponent, private http: Http, private router: Router) {
    $('.page-loader-wrapper').hide();
    this.preloader = false
    this.json_response_projectWIseTktReport = eval('(' + sessionStorage.getItem('getProjectWiseRaisedTicketTypeCount') + ')');
    this.projectWiseTicketReportTableData = this.json_response_projectWIseTktReport.ticketReportingResponces;

    console.log(this.projectWiseTicketReportTableData);


    setTimeout(function () {
      $('table.display').DataTable({
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

      });
    }, 2000)
  }

  ngOnInit() {
  }

  getTicketingDashBoardDetails(siteid, ticketStatusIds, ticketTypeIds) {


    console.log(siteid);
    console.log(ticketStatusIds);
    console.log(ticketTypeIds);


    this.preloader = true;
    let url = this.cmn.commonUrl + "ticketreport/getTicketingDashBoardDetails.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body;
    if (ticketStatusIds[0] == "Open" && ticketStatusIds[1] == "closed") {
      body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "startDate": this.json_response_projectWIseTktReport.startDate,
        "endDate": this.json_response_projectWIseTktReport.endDate,
        "siteIds": siteid,
        "ticketStatusIds": ticketStatusIds,
        "ticketIds": ticketTypeIds,
        "requestUrl": "getUnRespondingTickets",
        "flag": "true",

      }

    } else {
      body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "startDate": this.json_response_projectWIseTktReport.startDate,
        "endDate": this.json_response_projectWIseTktReport.endDate,
        "siteIds": siteid,
        "ticketStatusIds": ticketStatusIds,
        "ticketTypeIds": ticketTypeIds,
        "requestUrl": "getTicketTypeWiseTicketDetails",
        "flag": "false"
      }

    }


    console.log(url);
    console.log(JSON.stringify(body));

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      console.log(resp);
      this.preloader = false
      if (resp.responseCode == 200) {
        this.ProjectWiseReportTicketListResponse = resp;
        this.getTicketsData = resp.ticketReportingResponces[0].ticketReportingPojos;
        if (this.getTicketsData.length == 0) {
          swal("No tickets available");
        } else {
          sessionStorage.setItem('totalTicketResponse', JSON.stringify(this.ProjectWiseReportTicketListResponse));
          sessionStorage.setItem('totalTicketResponseTwo', "");
          sessionStorage.setItem('navigatingFrom', 'projectWiseTktReport');
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
        this.preloader = false
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }

  getTicketingDashBoardDetailss(siteid, ticketStatusIds) {
    for (let siteItem of this.projectWiseTicketReportTableData) {
      for (let item of siteItem.ticktTypewiseTicketCount) {
        if (siteItem.siteId == siteid) {
          this.allTicketTypeIds.push(item.ticketTypeId);
        } else {
        }
      }
    }

    this.preloader = true
    let url = this.cmn.commonUrl + "ticketreport/getTicketingDashBoardDetails.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "startDate": this.json_response_projectWIseTktReport.startDate,
      "endDate": this.json_response_projectWIseTktReport.endDate,
      "siteIds": [siteid],
      "ticketStatusIds": ticketStatusIds,
      "ticketTypeIds": this.allTicketTypeIds,
      "requestUrl": "getTicketTypeWiseTicketDetails",
      "flag": "false"
    }

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      this.preloader = false
      if (resp.responseCode == 200) {
        this.ProjectWiseReportTicketListResponse = resp;
        this.getTicketsData = resp.ticketReportingResponces[0].ticketReportingPojos;
        if (this.getTicketsData.length == 0) {
          swal("No tickets available");
        } else {
          sessionStorage.setItem('totalTicketResponse', JSON.stringify(this.ProjectWiseReportTicketListResponse));
          sessionStorage.setItem('totalTicketResponseTwo', "");
          sessionStorage.setItem('navigatingFrom', 'projectWiseTktReport');
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
        this.preloader = false
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


}
