import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, RoutesRecognized } from "@angular/router";
import { Http, RequestOptions, Headers } from '@angular/http';
import { HttpClient } from "@angular/common/http";
import { CommonComponent } from '../common/common.component';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ValidatorFn, AbstractControl } from "@angular/forms";
import 'rxjs/add/operator/map'
import { filter, pairwise } from 'rxjs/operators';
import { ProductService } from '../product.service';
declare const $: any;
declare const swal: any;

var flatbooking_Id;

var mystausval;
var site_idd;
var fromdatee;
var todatee;
var mystaus_val;
var mysite_idds = []
var fromDate;
var toDate;
var Ticket_number;
var flatbooking_Id;
var PendingDepartment;
var PendingDepartment_type;
var from_date;
var end_date;
var TicketNo;
var pending_depeartments;
var site_name;
var booking_form_id;
var controller_data = [];
@Component({
  selector: 'app-view-my-tickets',
  templateUrl: './view-my-tickets.component.html',
  styleUrls: ['./view-my-tickets.component.sass']
})
export class ViewMyTicketsComponent implements OnInit {
  ticketList: Array<any> = [];
  viewticketData: any;
  total_tickets: any;
  open_tickets: any;
  total_inProgress: any;
  total_closed: any;
  showLoadingIndicatior: boolean;
  itemsPer_Page: number;
  current_Page: number;
  totalItems: number;
  searchText: any;
  total_length: any;
  controller: Array<any> = [];
  ticketListtotaldata: string;
  customerdata: any;
  fg: FormGroup;
  deptno: any;
  roleid: any;
  detailspageArray: string;
  loaderhideme: boolean = false;
  currentpagenumber: string;
  previousUrl: string;
  currentUrl: string;
  sidemenu_controller :Array<any> = [];
  ticket_count: number;


  constructor(private router: Router, private http: Http, public cmn: CommonComponent , private productService: ProductService,) {

    this.deptno = sessionStorage.getItem("session_deptid");
    this.roleid = sessionStorage.getItem("session_roleId");
    this.getNonRefundFlats();
    this.sitelist();
    this.PendingDepartmentfun();

    setTimeout(() => {
      $('#noData').hide();
      setTimeout(function () {
        $('#noData').show();
      }, 5000)
    }, 700);



    if (sessionStorage.getItem("Backbuttonfunction") == "Backbuttonfunction") {
      from_date = sessionStorage.getItem("fromdatee_val");
      end_date = sessionStorage.getItem("todatee_val");
      TicketNo = sessionStorage.getItem("Ticket_number");
      pending_depeartments = sessionStorage.getItem("PendingDepartment") + "-" + sessionStorage.getItem("PendingDepartment_type");
      site_name = sessionStorage.getItem("site_idd");
      booking_form_id = sessionStorage.getItem("flatbooking_Id");

      if (sessionStorage.getItem("todatee_val") == "null") {
      } else {
        $(function () {
          $("#toDate").val(end_date);
        });

      }

      if (sessionStorage.getItem("fromdatee_val") == "null") {
      } else {
        $(function () {
          $("#fromDate").val(from_date);
        });

      }

      if (sessionStorage.getItem("Ticket_number") == "null") {
      } else {
        $(function () {
          $("#Ticketnumber").val(TicketNo);
        });

      }


      this.searchviewallticketList(sessionStorage.getItem("site_idd"),
        sessionStorage.getItem("PendingDepartment"), sessionStorage.getItem("fromdatee_val"),
        sessionStorage.getItem("todatee_val"), sessionStorage.getItem("Ticket_number"),
        sessionStorage.getItem("flatbooking_Id"), sessionStorage.getItem("PendingDepartment_type"));
    } else {
      this.getTicketList();
    }
  }

  ngOnInit() {
    this.router.events
      .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
      .subscribe((events: RoutesRecognized[]) => {
        this.previousUrl = events[0].urlAfterRedirects;
        this.currentUrl = events[1].urlAfterRedirects;
        if (this.previousUrl.includes('ticket/ticketdetails')) {
        } else {

        }
      });
    'use strict';
    this.fg = new FormGroup(
      {
        from: new FormControl(""),
        to: new FormControl("")
      },
      [Validators.required, this.dateRangeValidator]
    );


    var self = this;

    $(function () {
      $("#siteID").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });
      $("#customerID").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });

      $("#flatSelection").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });

      $("#PendingDepartment").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });

      $('#siteID').change(function (e) {
        var selected_projectid = $(e.target).val();
        if (selected_projectid == "select") {
        } else {
          self.customernamelist(selected_projectid);
        }
      })

      $('#customerID').change(function (e) {
        flatbooking_Id = $(e.target).val();
        console.log(flatbooking_Id);
        if (flatbooking_Id == "select") {
          flatbooking_Id = null;
        } else {
          flatbooking_Id = $(e.target).val();
        }
      })

      initCounters();
      initCharts();
    });
    function initCounters() {
      $('.count-to').countTo();
    }

    function initCharts() {
      $('.chart.chart-bar').sparkline(undefined, {
        type: 'bar',
        barColor: '#fff',
        negBarColor: '#fff',
        barWidth: '4px',
        height: '45px'
      });
      $('.chart.chart-pie').sparkline(undefined, {
        type: 'pie',
        height: '45px',
        sliceColors: ['rgba(255,255,255,0.70)', 'rgba(255,255,255,0.85)', 'rgba(255,255,255,0.95)', 'rgba(255,255,255,1)']
      });
      $('.chart.chart-line').sparkline(undefined, {
        type: 'line',
        width: '60px',
        height: '45px',
        lineColor: '#fff',
        lineWidth: 1.3,
        fillColor: 'rgba(0,0,0,0)',
        spotColor: 'rgba(255,255,255,0.40)',
        maxSpotColor: 'rgba(255,255,255,0.40)',
        minSpotColor: 'rgba(255,255,255,0.40)',
        spotRadius: 3,
        highlightSpotColor: '#fff'
      });
    }
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


  ngAfterViewInit() {
  }
  getColor(country) {
    switch (country) {
      case 'Closed':
        return '#4caf50';
      case 'pending':
        return '#9c27b0';
      case 'open':
        return '#f44336';
    }
  }



  getTicketList() {
    this.ticketList = [];
    this.loaderhideme = true;
    $('#tableExport').DataTable().destroy();
    $(".page-loader-wrapper").show();
    var url = this.cmn.commonUrl + "employeeTicket/getMyTicketList.spring";
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": sessionStorage.getItem("login_sessionkey"),
      "requestUrl": "getTickets/MyTickets",
    }


    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

      console.log(resp);

      this.loaderhideme = false;
      $(".page-loader-wrapper").hide();
      if (resp.responseCode == 200) {
        this.ticketList = [];
        $('#tableExport').DataTable().destroy();
        this.total_tickets = resp.totalTickets;
        localStorage.setItem('totalTickets', this.total_tickets);
        this.open_tickets = resp.open;
        localStorage.setItem('openTickets', this.open_tickets);
        this.total_inProgress = resp.inProgress;
        this.total_closed = resp.closed;
        localStorage.setItem('Closed', this.total_closed);
        this.ticketList = resp.ticketResponseList;
        this.total_length = resp.ticketResponseList.length;
        sessionStorage.setItem('getPageName', "viewmyticketspage");


        for(var i=0; i < resp.ticketResponseList.length; i++){
          if(resp.ticketResponseList[i].status == "New"){
            this.sidemenu_controller.push(resp.ticketResponseList[i].status);
          }
        }


        this.productService.ticket_sendNumber(this.ticket_increament());


        console.log(this.sidemenu_controller.length);

        setTimeout(function () {
          $(document).ready(function () {
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
                controller_data = [];
                for (var j = 0; j < display.length; j++) {
                  controller_data.push(resp.ticketResponseList[display[j]]);
                }
              },

            })

          });

        }, 2000)


      } else if (resp.responseCode == 440) {
        this.loaderhideme = false;
        swal("Error!", "Your session has been expired.", "error");
        this.router.navigate([""]);
      } else {
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
      }

    },
      error => {
        this.loaderhideme = false;
        $('.page-loader-wrapper').hide();
        console.log(error);
        var error = JSON.parse(error._body).responseCode;
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }
 

  ticket_increament() {
    this.ticket_count = this.sidemenu_controller.length;
    console.log("done");
    return this.ticket_count;
  }



  gotoTicketDetailspage(data) {
    sessionStorage.setItem("common_for_flats", "view_my_tickets");
    this.currentpagenumber = sessionStorage.getItem('currentPageNo');
    if (this.currentpagenumber == undefined) {
      this.currentpagenumber = JSON.stringify(1);
    }
    sessionStorage.setItem('currentPageNo', this.currentpagenumber);
    sessionStorage.setItem("from_Viewalltickets", "");
    this.viewticketData = JSON.stringify(data);
    this.ticketListtotaldata = JSON.stringify(this.ticketList);
    this.ticketListtotaldata = JSON.stringify(this.ticketList);
    this.router.navigate(["ticket/ticketdetails"], { state: this.ticketList });
    sessionStorage.setItem('ticketdetails_view', this.viewticketData);
    sessionStorage.setItem("Totalticketdata", JSON.stringify(this.ticketList));
    sessionStorage.setItem('buttonstutus', '');
    sessionStorage.setItem("currentpageindex", JSON.stringify(this.current_Page));
  }

  homeClick() {
    this.cmn.commonHomeNavigation();
  }

  getNonRefundFlats() {
    $(".page-loader-wrapper").show();
    var arr = localStorage.getItem('SiteIDS');
    var url = this.cmn.commonUrl + "financial/getNonRefundFlats.spring";
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": sessionStorage.getItem("login_sessionkey"),
      "siteIds": JSON.parse(arr),
      "requestUrl": "getNonRefundFlats",
      "condition": "LoadNonRefundAlertMsg",
    }

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $(".page-loader-wrapper").hide();
      if (resp.responseCode == 200) {
        if (sessionStorage.getItem("session_deptid") == "995") {
          if (sessionStorage.getItem("crmrefund") == "Amount refund") {
            if (resp.responseObjList.length == 0) {
              $('#imagemodal').modal('hide');
            } else {
              if (resp.responseObjList.length !== 0) {
                this.controller = resp.responseObjList;
                if (this.controller.length == 0) {
                  $('#imagemodal').modal('hide');
                } else {
                  $('#imagemodal').modal('show');
                }

              } else {
                $('#imagemodal').modal('hide');
              }
              sessionStorage.removeItem("crmrefund");
              sessionStorage.setItem("NonRefundFlats", JSON.stringify(this.controller));
            }
          }

        }

      } else if (resp.responseCode == 440) {
        $('#imagemodal').modal('hide');
        swal("Error!", "Your session has been expired.", "error");
        this.router.navigate([""]);
      } else {
        $('#imagemodal').modal('hide');
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
      }

    },
      error => {
        $('.page-loader-wrapper').hide();
        var error = JSON.parse(error._body).responseCode;
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }

  paymentProceed() {
    $('#imagemodal').modal('hide');
    this.router.navigateByUrl("crm-receipt-payment");
  }



  /*-----------------Getting Project(site) list Start---------------------*/
  sitelist() {
    var arr = localStorage.getItem('view_my_tickets');
    let url = this.cmn.commonUrl + "site/site.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "siteIds": JSON.parse(arr).map(String),
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
    }
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      if (resp.responseCode == 200) {
        var Options = "";
        $('#siteID').html('');
        $('#siteID').append("<option value='select'>--Select--</option>")
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#siteID').append("<option value='" + resp.responseObjList[i].id + "'>" + resp.responseObjList[i].name + "</option>");
        }
        if (site_name == "" || site_name == null || site_name == "null") {
        } else {
          $("#siteID").val(site_name);

          this.customernamelist(site_name)
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
        //alert(error);
        $('.page-loader-wrapper').hide();
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }
  /*-----------------Getting Project(site) list End---------------------*/


  /*-----------------Getting Project(site) list Start---------------------*/
  customernamelist(siteidd) {
    $('.page-loader-wrapper').show();
    var arr = localStorage.getItem('SiteIDS');
    let url = this.cmn.commonUrl + "references/searchCustomer.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {

      "customerName": null,
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "requestUrl": "CustomerFlatNo",
      "siteId": siteidd
    }
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
  
      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        this.customerdata = resp.responseObjList.referedCustomer;
        var Options = "";
        $('#customerID').html('');
        $('#customerID').append("<option value='select'>--Select--</option>")
        for (var i = 0; i < this.customerdata.length; i++) {
          $('#customerID').append("<option value='" + this.customerdata[i].flatBookingId + "'>" + this.customerdata[i].siteNameCustomerFlatNo + "</option>");
        }

        if (booking_form_id == null || booking_form_id == "null") {

        } else {
          $('#customerID').val(booking_form_id);
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


  PendingDepartmentfun() {
    let url = this.cmn.commonUrl + "employeeTicket/getTicketPendingDeptDtls.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
    }
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      if (resp.responseCode == 200) {
        $('#PendingDepartment').html('');
        $('#PendingDepartment').append("<option value='select'>--Select--</option>")
        for (var i = 0; i < resp.responseObjList.ticketPendingDeptDtlsPojoList.length; i++) {
          $('#PendingDepartment').append("<option value='" + resp.responseObjList.ticketPendingDeptDtlsPojoList[i].pendingEmpOrDeptId + "-" + resp.responseObjList.ticketPendingDeptDtlsPojoList[i].typeId + "'>" + resp.responseObjList.ticketPendingDeptDtlsPojoList[i].pendingEmpOrDeptName + "</option>");
        }

        if (sessionStorage.getItem("PendingDepartment") != null || sessionStorage.getItem("PendingDepartment") != "null") {
          $('#PendingDepartment').val(pending_depeartments);
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

  startdatefun() {
    $("#fromDate").val("");
  }

  endtimefun() {
    $("#toDate").val("");
    $("#toDate").load("#fromDate");
  }


  showallfun() {
    $("#toDate").load("#fromDate");
    sessionStorage.removeItem("site_idd");
    sessionStorage.removeItem("PendingDepartment");
    sessionStorage.removeItem("fromdatee_val");
    sessionStorage.removeItem("todatee_val");
    sessionStorage.removeItem("Ticket_number");
    sessionStorage.removeItem("flatbooking_Id");
    sessionStorage.removeItem("PendingDepartment_type");
    sessionStorage.removeItem("Backbuttonfunction");

    $("#fromDate").val("");
    $("#toDate").val("");
    $("#siteID").val("");
    $("#siteID").trigger('change');
    $("#PendingDepartment").val("");
    $("#PendingDepartment").trigger('change');
    $("#customerID").val("");
    $("#Ticketnumber").val("");
    this.getTicketList();

  }


  searchviewallticketList(site_idd, PendingDepartment, fromdatee, todatee, Ticket_number, bookingid, PendingDepartment_type) {
    sessionStorage.removeItem("site_idd");
    sessionStorage.removeItem("PendingDepartment");
    sessionStorage.removeItem("fromdatee_val");
    sessionStorage.removeItem("todatee_val");
    sessionStorage.removeItem("Ticket_number");
    sessionStorage.removeItem("flatbooking_Id");
    sessionStorage.removeItem("PendingDepartment_type");
    sessionStorage.removeItem("Backbuttonfunction");


    $('#tableExport').DataTable().destroy();
    var startdate = $('#fromDate').val();
    var endDate = $('#toDate').val();
    if (new Date(startdate) > new Date(endDate)) {
      swal('To date should be greater than or equal to from date');
      return false;
    }

    if ($("#siteID").val() == null && site_idd == "" || $("#siteID").val() == "select" && site_idd == "" || $("#siteID").val() == null && site_idd == "null" || $("#siteID").val() == "select" && site_idd == "null") {
      site_idd = null

    } else {
      if (site_idd != "") {
        site_idd = [site_idd];
      } else {
        site_idd = [$("#siteID").val()]
      }


    }

    if ($("#PendingDepartment").val() == "select" && PendingDepartment == "select" || $("#PendingDepartment").val() == null && PendingDepartment == null || $("#PendingDepartment").val() == "select" && PendingDepartment == "" || $("#PendingDepartment").val() == undefined && PendingDepartment == "null" || $("#PendingDepartment").val() == null && PendingDepartment == "") {
      PendingDepartment = null
      PendingDepartment_type = null;

    } else {

      if (PendingDepartment != "") {
        PendingDepartment = PendingDepartment;
        PendingDepartment_type = PendingDepartment_type;
      } else {
        PendingDepartment = $("#PendingDepartment").val().split('-')[0];
        PendingDepartment_type = $("#PendingDepartment").val().split('-')[1];
      }
    }

    if ($("#fromDate").val() == "" && fromdatee == "" || $("#fromDate").val() == undefined && fromdatee == "null") {
      fromdatee = null;

    } else {

      if (fromdatee != "") {
        fromdatee = fromdatee;
      } else {
        fromdatee = $("#fromDate").val();
      }
    }

    if ($("#toDate").val() == "" && todatee == "" || $("#toDate").val() == undefined && todatee == "null") {
      todatee = null;

    } else {

      if (todatee != "") {
        todatee = todatee;
      } else {
        todatee = $("#toDate").val()
      }

    }


    if ($("#Ticketnumber").val() == null && Ticket_number == null || $("#Ticketnumber").val() == "" && Ticket_number == "" || $("#Ticketnumber").val() == undefined && Ticket_number == "null") {
      Ticket_number = null;
    } else {

      if (Ticket_number != "") {
        Ticket_number = Ticket_number;
      } else {
        Ticket_number = $("#Ticketnumber").val()
      }
    }

    if (flatbooking_Id == "" || flatbooking_Id == undefined) {
      flatbooking_Id = null
    } else {

      flatbooking_Id = flatbooking_Id;


    }

    if (site_idd == null || site_idd == [null]) {
      site_idd = null;
    }


    if (site_idd == null && fromdatee == null && todatee == null && Ticket_number == null && flatbooking_Id == null && PendingDepartment == null) {
      swal("Please select any option to continue!");
      return false;
    }

    this.loaderhideme = true;
    $(".page-loader-wrapper").show();
    var url = this.cmn.commonUrl + "employeeTicket/getMyTicketList.spring";
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": sessionStorage.getItem("login_sessionkey"),
      "requestUrl": "getTickets/MyTickets",
      // "pageNo": "1",
      // "pageSize": "100",
      "pendingEmpOrDeptType": PendingDepartment_type,
      "pendingEmpOrDeptId": PendingDepartment,
      "siteIds": site_idd,
      "flatBookingId": flatbooking_Id,
      "ticketId": Ticket_number,
      "fromDate": fromdatee,
      "toDate": todatee
    }

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      this.loaderhideme = false;
      $(".page-loader-wrapper").hide();
      if (resp.responseCode == 200) {

        this.ticketList = [];
        this.total_tickets = resp.totalTickets;
        localStorage.setItem('totalTickets', this.total_tickets);
        this.open_tickets = resp.open;
        localStorage.setItem('openTickets', this.open_tickets);
        this.total_inProgress = resp.inProgress;
        this.total_closed = resp.closed;
        localStorage.setItem('Closed', this.total_closed);
        this.ticketList = resp.ticketResponseList;
        this.total_length = resp.ticketResponseList.length;
        sessionStorage.setItem('getPageName', "viewmyticketspage");

        for(var i=0; i < resp.ticketResponseList.length; i++){
          if(resp.ticketResponseList[i].status == "New"){
            this.sidemenu_controller.push(resp.ticketResponseList[i].status);
          }
        }

        console.log(this.sidemenu_controller.length);
        this.productService.ticket_sendNumber(this.ticket_increament());

        setTimeout(function () {
          $(document).ready(function () {

            $('#tableExport').DataTable({
              pageLength: 10,
              lengthMenu: [[10, 20, -1], [10, 20, 'Todos']],
              columnDefs: [{ "targets": 2, "type": "date" }],
              order: [[2, 'asc']],
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
                controller_data = [];
                for (var j = 0; j < display.length; j++) {
                  controller_data.push(resp.ticketResponseList[display[j]]);
                }
              },

            })

          });

        }, 2000)


        sessionStorage.setItem("site_idd", site_idd);
        sessionStorage.setItem("PendingDepartment", PendingDepartment);
        sessionStorage.setItem("fromdatee_val", fromdatee);
        sessionStorage.setItem("todatee_val", todatee);
        sessionStorage.setItem("Ticket_number", Ticket_number);
        sessionStorage.setItem("flatbooking_Id", flatbooking_Id);
        sessionStorage.setItem("PendingDepartment_type", PendingDepartment_type);
        sessionStorage.setItem("Backbuttonfunction", "Backbuttonfunction");



      } else if (resp.responseCode == 440) {
        this.loaderhideme = false;
        swal("Error!", "Your session has been expired.", "error");
        this.router.navigate([""]);
      } else {
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
      }

    },
      error => {
        this.loaderhideme = false;
        $('.page-loader-wrapper').hide();
        console.log(error);
        var error = JSON.parse(error._body).responseCode;
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );



  }

}
