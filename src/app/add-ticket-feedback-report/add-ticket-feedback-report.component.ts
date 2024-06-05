import { JsonPipe } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { CommonComponent } from '../common/common.component';
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

@Component({
  selector: 'app-add-ticket-feedback-report',
  templateUrl: './add-ticket-feedback-report.component.html',
  styleUrls: ['./add-ticket-feedback-report.component.sass']
})
export class AddTicketFeedbackReportComponent implements OnInit {

  loaderhideme6: boolean = true;
  MainArray: any;
  json_response_ticketList: any;
  getTicketsData: any;
  controller: Array<any> = [];
  sitenamedata: any;
  masterdata: Array<any> = [];
  fromdata: string;
  todate: string;
  viewticketData: string;
  ticketdetails: any;
  totalTicketResponse: any;

  constructor(private cmn: CommonComponent, private http: Http,
    private router: Router, private confirmDialogService: ConfirmDialogService) {
    $('.page-loader-wrapper').hide();
    this.loaderhideme6 = false;
    this.json_response_ticketList = eval('(' + sessionStorage.getItem('getProjectwiserating') + ')');
    this.getTicketsData = this.json_response_ticketList;

    this.controller = JSON.parse(sessionStorage.getItem("FeedbackMainService"));

    this.fromdata = sessionStorage.getItem("Fromdata");
    this.todate = sessionStorage.getItem("ToDate");



    setTimeout(function () {
      $(document).ready(function () {
        $('#ticketmonthlyreport').DataTable({
          pageLength: 5,
          lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todos']],
          dom: 'Bfrltip',
          aaSorting: [[0, 'desc']],
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


    }, 2000);


    console.log(this.controller);

  }

  ngOnInit() {


  }


  eventclickfun(userdata, index, rating) {
    this.masterdata = [];
    this.sitenamedata = this.controller[index].siteId;
    for (var i = 0; i < this.controller[index].ticketIds.length; i++) {
      if (rating === this.controller[index].ticketIds[i].rating) {
        if (this.controller[index].ticketIds[i].totalTickets !== 0) {
          for (var j = 0; j < this.controller[index].ticketIds[i].ticketReportingPojoList.length; j++) {
            console.log(this.controller[index].ticketIds[i].ticketReportingPojoList[j].ticketId);
            this.masterdata.push(this.controller[index].ticketIds[i].ticketReportingPojoList[j].ticketId);
          }
        }
      }
    }

    console.log(this.sitenamedata);
    console.log(this.masterdata);
    console.log(this.fromdata);
    console.log(this.todate);

    this.getdatafunction();

  }

  getdatafunction() {

    if (this.fromdata == "" || this.fromdata == undefined || this.fromdata == null) {
      this.fromdata = null;
    }

    if (this.todate == null || this.todate == undefined || this.todate == "") {
      this.todate = null;
    }

    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "ticketreport/getTicketingDashBoardDetails.spring";
    console.log(url);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "ticketIds": this.masterdata,
      "requestUrl": "getUnRespondingTickets",
      "startDate": this.fromdata,
      "endDate": this.todate,
      "siteIds": [JSON.parse(this.sitenamedata)],
      "ticketStatusIds": ["Open", "Closed"],
      "flag": true
    }


    console.log(JSON.stringify(body));



    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      console.log(resp);
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {

        this.ticketdetails = resp.ticketReportingResponces[0].ticketReportingPojos;
        this.totalTicketResponse = resp;
        if (this.ticketdetails.length == 0) {
          swal("No tickets available");
          return false;
        } else {
          console.log(this.ticketdetails);

          sessionStorage.setItem('totalTicketResponse', JSON.stringify(this.totalTicketResponse));
          sessionStorage.setItem('totalTicketResponseTwo', "");
          sessionStorage.setItem('navigatingFrom', 'Feedbackreport');
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

  feedbackfun() {
    this.router.navigate(["Ticket_Feedback_Report"]);
  }


  homeClick(){
    this.cmn.commonHomeNavigation();
  }
}
