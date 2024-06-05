import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { debug } from 'util';
import { CommonComponent } from '../common/common.component';
declare const $: any;
declare const swal: any;
var fromDate;
var toDate;


@Component({
  selector: 'app-table-three-all-ticket-type-project-wise',
  templateUrl: './table-three-all-ticket-type-project-wise.component.html',
  styleUrls: ['./table-three-all-ticket-type-project-wise.component.sass'],
  styles: [`
  .my-class{
    text-decoration: underline;
  }`]
})
export class TableThreeAllTicketTypeProjectWiseComponent implements OnInit {
  // table3totalResponse: any;
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
  ticketTypeId: any;
  ticketStatus: any = [];
  siteIds: any = [];
  controller1: string[];
  tickettypeidsval: any[];
statusitem : any;
  preloader: boolean;


  constructor(private cmn: CommonComponent, private http: Http, private router: Router) {
   this.preloader = false
   $('.page-loader-wrapper').hide();
    this.statusitem = sessionStorage.getItem("status"); 

   

    this.json_response_allTktTypeProjectWiseReport = eval('(' + sessionStorage.getItem('getAllTicketTypesProjectWiseTicketCount') + ')');
    this.headersArray = ['Ticket Type', 'Total', 'Open', 'Closed'];
    this.AllTicketTypesProjectWiseTableData = this.json_response_allTktTypeProjectWiseReport.ticketReportingResponces[0].ticktTypewiseTicketCount;
    setTimeout(function () {
      $('#exampledata').DataTable({
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

        "scrollY": true,
        "scrollX": true
      });
    }, 2000)


    for (var i = 0; i < this.json_response_allTktTypeProjectWiseReport.ticketReportingResponces[0].maxArraySize; i++) {
      this.headersArray.push("Project");
      this.headersArray.push("Open");
      this.headersArray.push("Closed");
    }
    for (var i = 0; i < this.AllTicketTypesProjectWiseTableData.length; i++) {
      let ticketTypeReport: Array<string> = [];
      let controller: Array<string> = [];
      ticketTypeReport.push(this.AllTicketTypesProjectWiseTableData[i].ticketType);
      ticketTypeReport.push(this.AllTicketTypesProjectWiseTableData[i].totalTickets);
      ticketTypeReport.push(this.AllTicketTypesProjectWiseTableData[i].openT);
      ticketTypeReport.push(this.AllTicketTypesProjectWiseTableData[i].closedT);
      for (var j = 0; j < this.AllTicketTypesProjectWiseTableData[i].siteList.length; j++) {
        ticketTypeReport.push(this.AllTicketTypesProjectWiseTableData[i].siteList[j].siteName);
        ticketTypeReport.push(this.AllTicketTypesProjectWiseTableData[i].siteList[j].openT);
        ticketTypeReport.push(this.AllTicketTypesProjectWiseTableData[i].siteList[j].closedT);
        controller.push(this.AllTicketTypesProjectWiseTableData[i].siteList[j].siteId);
      }
      this.ticketTypeWiseReports.push(ticketTypeReport);
      this.controller1 = controller;
    }
    for (let item of this.AllTicketTypesProjectWiseTableData) {
      this.sumOfTotal += item.totalTickets;
      this.sumOfOpen += item.openT;
      this.sumOfClosed += item.closedT;
    }
    this.sumOfArray.push('Total', this.sumOfTotal, this.sumOfOpen, this.sumOfClosed)
    let Open = this.headersArray.lastIndexOf("Open");
    let Closed = this.headersArray.lastIndexOf("Closed");
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
  }

  ngOnInit() {
  }

 

  eventCapture(index, item, subindex) {
    console.log(this.AllTicketTypesProjectWiseTableData[index]);
    this.siteIds = [];
    if (this.headersArray[subindex] == 'Total' || subindex == 1 || subindex == 2 || subindex == 3) {
      if (item[subindex - 1] == this.AllTicketTypesProjectWiseTableData[index].ticketType || subindex == 1) {
        this.ticketTypeId = this.AllTicketTypesProjectWiseTableData[index].ticketTypeId;
        this.ticketStatus = ["Open", "Closed"];
        this.tickettypeidsval = [this.ticketTypeId];
        for (var j = 0; j < this.AllTicketTypesProjectWiseTableData[index].siteList.length; j++) {
          if (this.AllTicketTypesProjectWiseTableData[index].siteList[j].siteId !== null) {
            this.siteIds.push(this.AllTicketTypesProjectWiseTableData[index].siteList[j].siteId);
          }
        }
      } else if( subindex == 2){
        this.ticketTypeId = this.AllTicketTypesProjectWiseTableData[index].ticketTypeId;
        this.ticketStatus = ["Open"];
        this.tickettypeidsval = [this.ticketTypeId];
        for (var j = 0; j < this.AllTicketTypesProjectWiseTableData[index].siteList.length; j++) {
          if (this.AllTicketTypesProjectWiseTableData[index].siteList[j].siteId !== null) {
            this.siteIds.push(this.AllTicketTypesProjectWiseTableData[index].siteList[j].siteId);
          }
        }

      } else if(subindex == 3){
        this.ticketTypeId = this.AllTicketTypesProjectWiseTableData[index].ticketTypeId;
        this.ticketStatus = ["Closed"];
        this.tickettypeidsval = [this.ticketTypeId];
        for (var j = 0; j < this.AllTicketTypesProjectWiseTableData[index].siteList.length; j++) {
          if (this.AllTicketTypesProjectWiseTableData[index].siteList[j].siteId !== null) {
            this.siteIds.push(this.AllTicketTypesProjectWiseTableData[index].siteList[j].siteId);
          }
        }

      }



    } else {

      this.ticketTypeId = this.AllTicketTypesProjectWiseTableData[index].ticketTypeId;
      this.ticketStatus = [this.headersArray[subindex]];
      this.tickettypeidsval = [this.ticketTypeId];
      for (var j = 0; j < this.AllTicketTypesProjectWiseTableData[index].siteList.length; j++) {
     
        if (item[subindex - 1] == this.AllTicketTypesProjectWiseTableData[index].siteList[j].siteName || item[subindex - 2] == this.AllTicketTypesProjectWiseTableData[index].siteList[j].siteName) {
          if (this.AllTicketTypesProjectWiseTableData[index].siteList[j].siteId !== null) {
            this.siteIds.push(this.AllTicketTypesProjectWiseTableData[index].siteList[j].siteId);
          }
        }

      }
    }
    if (this.headersArray[subindex] !== 'Project' && this.headersArray[subindex] !== 'Ticket Type') {
      this.getTicketingDashBoardDetails(this.siteIds, this.ticketStatus ,this.tickettypeidsval);
    }
  }


  // totaleventCapture(index, item) {
  //   this.siteIds = [];
  //   for (var i = 0; i < this.AllTicketTypesProjectWiseTableData.length; i++) {
  //     if (this.headersArray[index] == 'Total') {
  //       if (item[index - 1] !== this.AllTicketTypesProjectWiseTableData[i].ticketType) {
  //         this.ticketTypeId = this.AllTicketTypesProjectWiseTableData[i].ticketTypeId;
  //         this.tickettypeidsval = [this.ticketTypeId];
  //         this.ticketStatus = ["Open", "Closed"];
  //         for (var j = 0; j < this.AllTicketTypesProjectWiseTableData[i].siteList.length; j++) {
  //           if(this.AllTicketTypesProjectWiseTableData[i].siteList[j].siteId !== null ){
  //             this.siteIds.push(this.AllTicketTypesProjectWiseTableData[i].siteList[j].siteId);
  //           }
           
  //         }
  //       }
  //     } else {
  //       this.ticketTypeId = this.AllTicketTypesProjectWiseTableData[i].ticketTypeId;
  //       this.tickettypeidsval = [this.ticketTypeId];
  //       this.ticketStatus = [this.headersArray[index]];
  //     }
  //     // if (this.headersArray[index] !== 'Project' && this.headersArray[index] !== 'Ticket Type') {
  //     //   this.getTicketingDashBoardDetails(this.controller1, this.ticketStatus ,this.tickettypeidsval);
  //     // }
  //   }
  //   console.log(this.siteIds);

  // }

  getTicketingDashBoardDetails(siteid, ticketStatusIds, tickettypeidsval) {

   this.preloader = true
    let url = this.cmn.commonUrl + "ticketreport/getTicketingDashBoardDetails.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "startDate": this.json_response_allTktTypeProjectWiseReport.startDate,
      "endDate": this.json_response_allTktTypeProjectWiseReport.endDate,
      "siteIds": siteid,
      "ticketStatusIds": ticketStatusIds,
      "ticketTypeIds": tickettypeidsval,
      "requestUrl": "getTicketTypeWiseTicketDetails",
      "flag": "true"
    }
    


    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
     this.preloader = false
      if (resp.responseCode == 200) {
        this.tab3TotalTicketResponse = resp;
        this.tab3GetTicketsData = resp.ticketReportingResponces[0].ticketReportingPojos;
        if (this.tab3GetTicketsData.length == 0) {
          swal("No tickets available");
        } else {
          sessionStorage.setItem('totalTicketResponse', JSON.stringify(this.tab3TotalTicketResponse));
          sessionStorage.setItem('totalTicketResponseTwo', "");
          sessionStorage.setItem('navigatingFrom', 'allTktTypeProjectWise');
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
  getColor(value) {
    if (typeof value != "string") {
      return 'underline'
    }
  }



  dashtitle(){
    this.router.navigateByUrl("Ticketing-Dashboard");
  }

  homeClick() {
    this.router.navigateByUrl("ticket/viewticket");
  }

  dashtitle1(){
    this.router.navigateByUrl("Ticket_Projectwise_Details");
  }
}
