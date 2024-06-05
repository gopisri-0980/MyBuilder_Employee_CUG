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
  selector: 'app-add-monthlyreport',
  templateUrl: './add-monthlyreport.component.html',
  styleUrls: ['./add-monthlyreport.component.sass']
})
export class AddMonthlyreportComponent implements OnInit {

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
  sitename: string;
  Rating: string;
  Employeename: string;
  EmployeeID: string;
  Maindata: any;
  siteidname: any[];

  constructor(private cmn: CommonComponent, private http: Http,
    private router: Router, private confirmDialogService: ConfirmDialogService) {
    $('.page-loader-wrapper').hide();
    this.loaderhideme6 = false;


    this.json_response_ticketList = eval('(' + sessionStorage.getItem('getProjectwiserating') + ')');
    this.getTicketsData = this.json_response_ticketList;
    this.controller = JSON.parse(sessionStorage.getItem("FeedbackMainService"));

    console.log(this.json_response_ticketList);
    console.log(this.getTicketsData);
    console.log(JSON.stringify(this.controller));

    this.fromdata = sessionStorage.getItem("Fromdata");
    this.todate = sessionStorage.getItem("ToDate");
    this.sitename = sessionStorage.getItem("Sitename");
    this.Rating = sessionStorage.getItem("Rating");
    this.Employeename = sessionStorage.getItem("Employeename");
    this.EmployeeID = sessionStorage.getItem("EmployeeID");


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

  }


  ngOnInit() {
  }


  eventclickfun(item, index, status) {
    this.masterdata = [];
    this.siteidname = [];
    this.Maindata = this.controller[index].ticketReportingPojoList;
    for (var i = 0; i < this.Maindata.length; i++) {
      if (this.Maindata[i].ticketStatus == status) {
        for (var j = 0; j < this.Maindata[i].ticketReportingPojoList.length; j++) {
          this.masterdata.push(this.Maindata[i].ticketReportingPojoList[j].ticketId);
          this.siteidname.push(this.Maindata[i].ticketReportingPojoList[j].siteId);
        }
      }
    }
    this.masterdata = this.masterdata.filter(function (item, pos, self) {
      return self.indexOf(item) == pos;
    })

    this.siteidname = this.siteidname.filter(function (item, pos, self) {
      return self.indexOf(item) == pos;
    })


    if (this.masterdata.length == 0) {
      for (var i = 0; i < this.Maindata.length; i++) {
        for (var j = 0; j < this.Maindata[i].ticketReportingPojoList.length; j++) {
          this.masterdata.push(this.Maindata[i].ticketReportingPojoList[j].ticketId);
          this.siteidname.push(this.Maindata[i].ticketReportingPojoList[j].siteId);
        }
      }

      this.masterdata = this.masterdata.filter(function (item, pos, self) {
        return self.indexOf(item) == pos;
      })
  
      this.siteidname = this.siteidname.filter(function (item, pos, self) {
        return self.indexOf(item) == pos;
      })

    } else {

    }

  


    this.getdatafunction();

  }


  getdatafunction() {

    if (this.fromdata == "" || this.fromdata == "undefined" || this.fromdata == null) {
      this.fromdata = null;
    }

    if (this.todate == null || this.todate == "undefined" || this.todate == "") {
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
      "siteIds": this.siteidname,
      "ticketStatusIds": ["Open", "Closed"],
      "flag": true
    }


    console.log(body);

  
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
          sessionStorage.setItem('totalTicketResponse',JSON.stringify(this.totalTicketResponse));
          sessionStorage.setItem('totalTicketResponseTwo',"");
          sessionStorage.setItem('navigatingFrom','Addmonthlyreport');
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


  Monthlyreport(){
    this.router.navigate(['Ticketing-Dashboard/View-Tickets']);
  }

  homeClick(){
    this.cmn.commonHomeNavigation();
  }
  
}
