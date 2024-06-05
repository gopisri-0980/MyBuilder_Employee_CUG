import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { CommonComponent } from '../common/common.component';
declare const $: any;
declare const swal: any;
var controller_data = [];
var controller = [];
@Component({
  selector: 'app-table-seven-unresponding-tickets',
  templateUrl: './table-seven-unresponding-tickets.component.html',
  styleUrls: ['./table-seven-unresponding-tickets.component.sass']
})
export class TableSevenUnrespondingTicketsComponent implements OnInit {

  getTicketsData: any = [];
  current_Page: number;
  totalItems: number;
  json_response_ticketList: any;
  itemsPer_Page: any;
  viewticketData: string;
  breadCrumbProjectWiseTktReport: boolean;
  breadCrumbProjectWiseTktCount: boolean;
  preloader: boolean;

  constructor(private cmn: CommonComponent, private http: Http, private router: Router) {
    this.preloader = false;
    this.json_response_ticketList = eval('(' + sessionStorage.getItem('totalTicketResponse') + ')');
    this.getTicketsData = this.json_response_ticketList.ticketReportingResponces[0].ticketReportingPojos;

    controller = this.json_response_ticketList.ticketReportingResponces[0].ticketReportingPojos;
    console.log(this.getTicketsData);

    this.itemsPer_Page = 10;
    this.current_Page = 1;
    this.totalItems = 10;
    setTimeout(function () {
      $('#tableExport').DataTable({
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

        "footerCallback": function (row, data, start, end, display) {
          console.log(controller);

          controller_data = [];
          for (var j = 0; j < display.length; j++) {

            controller_data.push(controller[display[j]]);
            console.log(controller_data);
          }
        },
      });

    }, 2000)


    if (sessionStorage.getItem('navigatingFrom') == 'projectWiseTktCount') {
      this.breadCrumbProjectWiseTktCount = true;
    } else if (sessionStorage.getItem('navigatingFrom') == 'projectWiseTktReport') {
      this.breadCrumbProjectWiseTktReport = true;
    } else {

    }

  }

  ngOnInit() {
  }

  gotoTicketDetailspage(data) {
    sessionStorage.setItem('navigatingFrom', 'UnRespondingTickets');
    this.viewticketData = JSON.stringify(data);
    this.router.navigate(["Ticketing-Dashboard/View-Tickets/Ticket-Details"]);
    sessionStorage.setItem('ticketdetails_view', this.viewticketData);

    sessionStorage.setItem("Totalticketdata", JSON.stringify(controller_data));

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
