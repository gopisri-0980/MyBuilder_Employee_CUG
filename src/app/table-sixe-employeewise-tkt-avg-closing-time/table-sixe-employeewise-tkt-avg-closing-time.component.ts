import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { CommonComponent } from '../common/common.component';
declare const $: any;
declare const swal: any; import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-sixe-employeewise-tkt-avg-closing-time',
  templateUrl: './table-sixe-employeewise-tkt-avg-closing-time.component.html',
  styleUrls: ['./table-sixe-employeewise-tkt-avg-closing-time.component.sass']
})
export class TableSixeEmployeewiseTktAvgClosingTimeComponent implements OnInit {
  tab6sumOfTotal: any = 0;
  tab6sumOfOpen: any = 0;
  tab6sumOfClosed: any = 0;
  tab6sumOfAvgClosingTime: any = 0;
  tab6sumOfAvgReplyTime: any = 0;
  projectWiseTicketCountTableData: any = [];
  allSiteIds: any = [];
  tab6GetTicketsData: any = [];
  tab6TotalTicketResponse: any;
  json_response_avgTktClosingTimeEmpWiseArray: any = [];
  tab6TotalTicketResponseTwo: any;
  tab6GetTicketsDataTwo: any = [];
  endDate: any;
  startDate: any;
  allTktTypeIds: any = [];
  allTktTypeDetailsIds: any = [];
  controller: any;
  tab6sumOfTotal1: any;
  tab6sumOfOpen1: any;
  tab6sumOfClosed1: any;
  tab6sumOfAvgClosingTime1: any;
  tab6sumOfAvgReplyTime1: any;
  statusitem: string;
  preloader: boolean;

  constructor(private cmn: CommonComponent, private http: Http, private router: Router) {

    $('.page-loader-wrapper').hide();

    this.statusitem = sessionStorage.getItem("status"); 
    

   this.preloader = false
    this.json_response_avgTktClosingTimeEmpWiseArray = eval('(' + sessionStorage.getItem('getEmployeeWiseTicketAverageClosingTime') + ')');
    setTimeout(function () {
      $('#tableExportdata').DataTable({
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

    }, 2000)


    this.controller = JSON.parse(sessionStorage.getItem('TotalArray'));

    console.log(this.controller);

    this.tab6sumOfTotal1  = this.controller[0].Total;
    this.tab6sumOfOpen1 = this.controller[0].open;
    this.tab6sumOfClosed1 = this.controller[0].close;
    this.tab6sumOfAvgClosingTime1 = this.controller[0].Avgclosingtime;
    this.tab6sumOfAvgReplyTime1 = this.controller[0].avgReplyTime;




    let uniqueTktTypeIdsArray = [];
    let uniqueSiteIdsArray = [];
    for (let item of this.json_response_avgTktClosingTimeEmpWiseArray) {
      this.tab6sumOfTotal += item.totalTickets;
      this.tab6sumOfOpen += item.openTickets
      this.tab6sumOfClosed += item.closedTickets;
      this.tab6sumOfAvgClosingTime += item.avgClosingTime;
      this.tab6sumOfAvgReplyTime += item.avgReplyTime;
      this.startDate = item.startDate;
      this.endDate = item.endDate;
      uniqueTktTypeIdsArray.push(item.ticketTypeIds);
      uniqueSiteIdsArray.push(item.siteIds);
      for (let subitem of item.ticketTypeDetailsId) {
        this.allTktTypeDetailsIds.push(subitem);
      }
    }
    this.allTktTypeIds = Array.from(new Set(uniqueTktTypeIdsArray));
    this.allSiteIds = Array.from(new Set(uniqueSiteIdsArray));
  }

  ngOnInit() {
  }

  getTicketingDashBoardDetails(startDate, endDate, siteid, ticketStatusIds, ticketTypeDetailsId) {
   this.preloader = true;
    let url = this.cmn.commonUrl2 + "ticketreport/getTicketingDashBoardDetails.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "startDate": startDate,
      "endDate": endDate,
      "siteIds": siteid,
      "ticketStatusIds": ticketStatusIds,
      "ticketTypeDetailsId": ticketTypeDetailsId,
      "requestUrl": "getEmployeeWiseTicketDetails",
      "flag": true
    }

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

      console.log(resp);
     this.preloader = false
      if (resp.responseCode == 200) {
        this.tab6TotalTicketResponse = resp;
        this.tab6GetTicketsData = resp.ticketReportingResponces[0].ticketReportingPojos;
        if (this.tab6GetTicketsData.length == 0) {
          swal("No tickets available");
        } else {
          sessionStorage.setItem('totalTicketResponse', JSON.stringify(this.tab6TotalTicketResponse));
          sessionStorage.setItem('navigatingFrom', 'empWiseTktAvgCLosingTime');
          sessionStorage.setItem('totalTableClick', 'showTableOne');
          sessionStorage.setItem('totalTicketResponseTwo',"");
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


  getEmployeeWiseTicketAverageClosingAndReplyTimeDtls(startDate, endDate, ticketTypeIds, siteid ,ticketTypeDetailsId) {
   this.preloader = true;
    let url = this.cmn.commonUrl2 + "ticketreport/getEmployeeWiseTicketAverageClosingAndReplyTimeDtls.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "startDate": startDate,
      "endDate": endDate,
      "ticketTypeIds": ticketTypeIds,
      "siteIds": siteid,
      "ticketIds" : ticketTypeDetailsId,
    }

    console.log(body);

   
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      console.log(resp);
     this.preloader = false
      if (resp.responseCode == 200) {
        this.tab6TotalTicketResponseTwo = resp;
        this.tab6GetTicketsDataTwo = resp.ticketReportingResponces[0].ticketReportingPojos;
        if (this.tab6GetTicketsDataTwo.length == 0) {
          swal("No tickets available");
        } else {
          sessionStorage.setItem('totalTicketResponse',"");
          sessionStorage.setItem('totalTicketResponseTwo', JSON.stringify(this.tab6TotalTicketResponseTwo));
          sessionStorage.setItem('navigatingFrom', 'empWiseTktAvgCLosingTime');
          sessionStorage.setItem('totalTableClick', 'showTableTwo');
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

  dashtitle(){
    this.router.navigateByUrl("Ticketing-Dashboard");
  }

  dashtitle1(){
    this.router.navigateByUrl("Ticket_Average_Time");
  }

}
