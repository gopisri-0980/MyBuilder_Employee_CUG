import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { debug } from 'util';
import { CommonComponent } from '../common/common.component';
import { EmployeeProjectwiseReport } from '../model/employee-projectwise-report';
declare const $: any;
declare const swal: any;
var fromDate;
var toDate;

@Component({
  selector: 'app-employeewise-tickets',
  templateUrl: './employeewise-tickets.component.html',
  styleUrls: ['./employeewise-tickets.component.sass']
})
export class EmployeewiseTicketsComponent implements OnInit {
  controller: Array<any> = [];
  totalTickets = 0;
  openT = 0;
  inprogressT = 0;
  reopenT = 0;
  closedT = 0;
  controllerhead: Array<any> = [];
  TotalData: string;
  AllTicketTypesProjectWiseTableData: any = [];
  headersArray: any = [];
  ticketTypeWiseReports: Array<Array<string>> = [];
  sumOfArray: any = [];
  sumOfTotal: any = 0;
  sumOfOpen: any = 0;
  sumOfClosed: any = 0;
  sumOfSiteClosedT: any = 0;
  sumOfSiteOpenT: any = 0;
  json_response_allTktTypeProjectWiseReport: any;
  tab3TotalTicketResponse: any;
  tab3GetTicketsData: any;
  ticketTypeId:Array<any> =[];
  ticketStatus: any = [];
  siteIds: any = [];
  controller1: string[];
  Totaldatajson: Array<any> = [];
  stratDate: any;
  endDate: any;
  tickettypeids: Array<any> = [];
  employeeprojectwisereports: Array<EmployeeProjectwiseReport> = [];
  preloader : boolean;

  constructor(private cmn: CommonComponent, private http: Http, private router: Router) { 
    $('.page-loader-wrapper').hide();
  }
  ngOnInit() {
    this.controller = JSON.parse(localStorage.getItem("Userdata"));
    this.controllerhead = JSON.parse(localStorage.getItem("Headers"));
    this.TotalData = JSON.parse(localStorage.getItem("TotalData"));
    this.employeeprojectwisereports = JSON.parse(localStorage.getItem('Totaldatajson'));



   this.preloader = false;
    setTimeout(function () {
      $('#example').DataTable({
        pageLength: 10,
        lengthMenu: [[10, 10, 20, -1], [10, 10, 20, 'Todos']],
        "bDestroy": true,
        retrieve: true,
        dom: 'Bfrltip',
        buttons: [
          'copy', 'csv', 'excel', 'print', {
            extend: 'pdfHtml5',
            orientation: 'landscape',
            pageSize: 'LEGAL'
          }
        ],

        "scrollY": true,
        "scrollX": true
      });
    }, 2000)
  }

  getColor(value) {
    if (typeof value == 'number') {
      return 'underline'
    }
  }



  eventclickfun(index, userdata, subindex, siteids, status) {

    if (status == "Total Tickets") {
      for ( let i = 0; i < userdata.tickettypearray.length; i++) {
        if(userdata.tickettypearray[i].tickettypeDetailsID !== null){
          this.ticketTypeId.push(userdata.tickettypearray[i].tickettypeDetailsID);
        }
      }

      this.stratDate = siteids.startDate;
      this.endDate = siteids.endDate;
      this.siteIds = [siteids.siteids];
      this.ticketStatus = ['Open', 'Closed'];
      this.getTicketingDashBoardDetails(this.ticketTypeId, this.siteIds, this.stratDate, this.endDate, this.ticketStatus);
    }

    if (status == "No.of Tickets") {
      this.stratDate = siteids.startDate;
      this.endDate = siteids.endDate;
      this.siteIds = [siteids.siteids];
      this.ticketTypeId = [userdata.tickettypeDetailsID];
      this.ticketStatus = ['Open', 'Closed'];
      this.getTicketingDashBoardDetails(this.ticketTypeId, this.siteIds, this.stratDate, this.endDate, this.ticketStatus);
    } else if (status == "Open") {
      this.stratDate = siteids.startDate;
      this.endDate = siteids.endDate;
      this.siteIds = [siteids.siteids];
      this.ticketTypeId = [userdata.tickettypeDetailsID];
      this.ticketStatus = ['Open'];
      this.getTicketingDashBoardDetails(this.ticketTypeId, this.siteIds, this.stratDate, this.endDate, this.ticketStatus);
    } else if (status == "Closed") {
      this.stratDate = siteids.startDate;
      this.endDate = siteids.endDate;
      this.siteIds = [siteids.siteids];
      this.ticketTypeId = [userdata.tickettypeDetailsID];
      this.ticketStatus = ['Closed'];
      this.getTicketingDashBoardDetails(this.ticketTypeId, this.siteIds, this.stratDate, this.endDate, this.ticketStatus);
    }

  }
  getTicketingDashBoardDetails(tickettypeids, siteIds, stratDate, endDate, ticketStatus) {
   this.preloader = true;
    let url = this.cmn.commonUrl + "ticketreport/getTicketingDashBoardDetails.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "startDate": stratDate,
      "endDate": endDate,
      "siteIds": siteIds,
      "ticketStatusIds": ticketStatus,
      "ticketTypeDetailsId": tickettypeids,
      "requestUrl": "getEmployeeWiseTicketDetails",
      "flag": "true"
    }
  
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      console.log(resp);
     this.preloader = false;
      if (resp.responseCode == 200) {
        this.tab3TotalTicketResponse = resp;
        this.tab3GetTicketsData = resp.ticketReportingResponces[0].ticketReportingPojos;
        if (this.tab3GetTicketsData.length == 0) {
          swal("No tickets available");
        } else {
          sessionStorage.setItem('totalTicketResponse', JSON.stringify(this.tab3TotalTicketResponse));
          sessionStorage.setItem('totalTicketResponseTwo', JSON.stringify(this.tab3TotalTicketResponse));
          sessionStorage.setItem('navigatingFrom', 'Employeeprojectwisetickets');
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
       this.preloader = false;
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }



  dashtitle(){
    this.router.navigateByUrl("Ticketing-Dashboard");
  }

  homeclick() {
    this.router.navigateByUrl("ticket/viewticket");
  }

}
