import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { CommonComponent } from '../common/common.component';
declare const $: any;
declare const swal: any;
var  controller_data = [];
@Component({
  selector: 'app-table-one-ticket-list',
  templateUrl: './table-one-ticket-list.component.html',
  styleUrls: ['./table-one-ticket-list.component.sass']
})
export class TableOneTicketListComponent implements OnInit {
  getTicketsData: any = [];
  current_Page: number;
  totalItems: number;
  json_response_ticketList: any;
  itemsPer_Page: any;
  viewticketData: string;
  breadCrumbProjectWiseTktReport: boolean;
  breadCrumbProjectWiseTktCount: boolean;
  breadCrumbEscalationTktReport: boolean;
  breadCrumbEmpWiseAvgClosingTime: boolean;
  json_response_ticketList_Two: any;
  getTicketsDataTwo: any = [];
  showTableTwo: boolean;
  showTableOne: boolean;
  breadCrumbEmployeewiseticketcount: boolean;

  breadCrumbAlltickettypesprojectwisereport: boolean;
  preloader: boolean;
  breadCrumbFeedbackticketcount: boolean;
  breadCrumbMonthlyreportcount: boolean;

  constructor(private cmn: CommonComponent, private http: Http, private router: Router) {




    this.preloader = false;
    $('.page-loader-wrapper').hide();
    if (sessionStorage.getItem('totalTicketResponse') !== "") {
      this.json_response_ticketList = eval('(' + sessionStorage.getItem('totalTicketResponse') + ')');
      this.getTicketsData = this.json_response_ticketList.ticketReportingResponces[0].ticketReportingPojos;

      console.log(this.json_response_ticketList);
      console.log(this.getTicketsData);
    }

    if (sessionStorage.getItem('totalTicketResponseTwo') !== "") {
      this.json_response_ticketList_Two = eval('(' + sessionStorage.getItem('totalTicketResponseTwo') + ')');
      this.getTicketsDataTwo = this.json_response_ticketList_Two.ticketReportingResponces[0].ticketReportingPojos;

      console.log(this.json_response_ticketList_Two);
      console.log(this.getTicketsDataTwo);

    }

    if (sessionStorage.getItem('totalTableClick') == 'showTableTwo') {
      this.showTableTwo = true;
      this.showTableOne = false;
    } else if (sessionStorage.getItem('totalTableClick') == 'showTableOne') {
      this.showTableOne = true;
      this.showTableTwo = false;
    } else {
      this.showTableOne = true;
    }

    $('.page-loader-wrapper').show();

    this.itemsPer_Page = 10;//this.getTicketsData.length;
    this.current_Page = 1;
    this.totalItems = 10;

    $('.page-loader-wrapper').hide();

    setTimeout(function () {
      $('#tableExport').DataTable({
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

        "footerCallback": function (row, data, start, end, display) {
    
          if (sessionStorage.getItem('totalTicketResponse') !== "") {
            this.json_response_ticketList = eval('(' + sessionStorage.getItem('totalTicketResponse') + ')');
            this.getTicketsData = this.json_response_ticketList.ticketReportingResponces[0].ticketReportingPojos;
          }
        
          controller_data = [];
          for (var j = 0; j < display.length; j++) {
            controller_data.push(this.json_response_ticketList.ticketReportingResponces[0].ticketReportingPojos[display[j]]);
         
            console.log(controller_data);
          }
        },
      });
    }, 2000)


    //  setTimeout(function(){
    //       $('#tableExport').DataTable();
    //  },1000)

    if (sessionStorage.getItem('navigatingFrom') == 'projectWiseTktCount') {
      this.breadCrumbProjectWiseTktCount = true;
    } else if (sessionStorage.getItem('navigatingFrom') == 'projectWiseTktReport') {
      this.breadCrumbProjectWiseTktReport = true;
    } else if (sessionStorage.getItem('navigatingFrom') == "allTktTypeProjectWise") {
      this.breadCrumbAlltickettypesprojectwisereport = true;
    } else if (sessionStorage.getItem('navigatingFrom') == 'escalationTickets') {
      
      this.breadCrumbEscalationTktReport = true;
    } else if (sessionStorage.getItem('navigatingFrom') == 'empWiseTktAvgCLosingTime') {
      this.breadCrumbEmpWiseAvgClosingTime = true;
    } else if (sessionStorage.getItem('navigatingFrom') == 'Employeeprojectwisetickets') {
      this.breadCrumbEmployeewiseticketcount = true;
    } else if (sessionStorage.getItem('navigatingFrom') == 'Feedbackreport') {
      this.breadCrumbFeedbackticketcount = true;
    } else if (sessionStorage.getItem('navigatingFrom') == 'Addmonthlyreport') {
      this.breadCrumbMonthlyreportcount = true;
    }
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    sessionStorage.setItem('totalTableClick', '');
  }

  gotoTicketDetailspage(data) {


    // console.log("site_idd :"+sessionStorage.getItem("site_idd"));
    // console.log("fromdatee :"+sessionStorage.getItem("fromdatee"));
    // console.log("todatee :"+sessionStorage.getItem("todatee"));
    // console.log("mystaus_val :"+sessionStorage.getItem("mystaus_val"));
    //     sessionStorage.getItem("site_idd");
    //     sessionStorage.getItem("fromdatee");
    //     sessionStorage.getItem("todatee");
    //     sessionStorage.getItem("mystaus_val");
    //return false;
    // sessionStorage.setItem("common_for_flats", "viewtickets");
    // sessionStorage.setItem("from_Viewalltickets", "true");
    this.viewticketData = JSON.stringify(data);

   // this.viewticketData = JSON.stringify(data);
    // this.router.navigate(["ticket_details"], { state: this.viewticketData });
    sessionStorage.setItem("Totalticketdata", JSON.stringify(controller_data));

    sessionStorage.setItem('ticketdetails_view', this.viewticketData);
    this.router.navigate(["Ticketing-Dashboard/View-Tickets/Ticket-Details"]);

    if (sessionStorage.getItem('navigatingFrom') == 'Feedbackreport'){
      sessionStorage.setItem('Feedbackreport', 'Feedbackreport');
     
    } else if (sessionStorage.getItem('navigatingFrom') == 'escalationTickets'){
      sessionStorage.setItem('escalationTickets', 'escalationTickets');
     
    } else if (sessionStorage.getItem('navigatingFrom') == 'projectWiseTktReport') {
      sessionStorage.setItem('Ticketprojectwisereport', 'Ticket projectwise report');
    }
    



  



    //alert(this.viewticketData);
    sessionStorage.setItem('ticketdetails_view', this.viewticketData);
    // sessionStorage.setItem('buttonstutus','true');
  }

  getColor(country) {
    switch (country) {
      case 'Closed':
        return '#4caf50';
      case 'Inprogress':
        return '#9c27b0';
      case 'Open':
        return '#f44336';
      case 'New':
        return 'rgb(103 6 232)';

    }
  }

  homeClick() {
    this.router.navigateByUrl("ticket/viewticket");
  }

  dashtitle() {
    this.router.navigateByUrl("Ticketing-Dashboard");
  }

}
