import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, NavigationExtras } from "@angular/router";
import { Http, RequestOptions, Headers } from '@angular/http';
import { HttpClient } from "@angular/common/http";
import { CommonComponent } from '../common/common.component';
import 'rxjs/add/operator/map';
import { DeviceDetectorService } from 'ngx-device-detector';
//import { ViewticketsService } from './viewtickets.service';
import {
  FormGroup, FormControl, Validators,
  ValidatorFn, AbstractControl
} from "@angular/forms";
import { Console } from 'console';
declare const $: any;
declare const swal: any
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
var controller_data = [];
@Component({
  selector: 'app-ticket-graph',
  templateUrl: './ticket-graph.component.html',
  styleUrls: ['./ticket-graph.component.css']
})
export class TicketGraphComponent implements OnInit {
  fg: FormGroup;
  loaderhideme: boolean = true;
  ticketList: Array<any> = [];
  viewticketData: any;
  total_tickets: any;
  open_tickets: any;
  total_inProgress: any;
  total_closed: any;
  showLoadingIndicatior: boolean;
  deviceInfo: any;
  menu_array: any;
  new_tickets: any;
  total_replied: any;
  reOpen_tickets: any;
  itemsPer_Page: any;
  current_Page: any;
  totalItems: any;
  searchText: any;
  @Input() id: string;
  @Input() maxSize: number;
  @Output() pageChange: EventEmitter<number>;
  total_length: any;
  isButtonClicked: string;
  ticketListtotaldata: string;
  detailspageArray: any = [];
  forslideData: any;
  customerNumber: string;
  customerName: string;
  autocompleteform: any;
  //service: any;
  preloader: boolean;
  customerdata: any;
  availableTags: Array<any> = [];
  public countries = this.availableTags;
  flatbookingId: any;
  total_tickets_graph: any;

  constructor(private deviceService: DeviceDetectorService, private router: Router, private http: Http, public cmn: CommonComponent) {
    
    sessionStorage.setItem("from_Changeticketowner", "");
    $(".page-loader-wrapper").hide();
    this.siteList_temp();
    this.isButtonClicked = sessionStorage.getItem('isBackButton_Clicked1');
    console.log(this.isButtonClicked);
    sessionStorage.getItem("site_idd1");
    sessionStorage.getItem("fromdatee1");
    sessionStorage.getItem("todatee1");
    sessionStorage.getItem("mystausval1");


    console.log(sessionStorage.getItem('sessionpageNo'))

    if (this.isButtonClicked == "true") {

      console.log(sessionStorage.getItem("site_idd1"));
      console.log(sessionStorage.getItem("fromdatee1"));
      console.log(sessionStorage.getItem("todatee1"));
      mystaus_val = sessionStorage.getItem("mystausval1");
      // alert(mystaus_val)
      this.total_tickets_graph = sessionStorage.getItem("tottickets1");
      this.open_tickets = sessionStorage.getItem("opentickets1")
      this.reOpen_tickets = sessionStorage.getItem("reOpentickets1")
      this.new_tickets = sessionStorage.getItem("newtickets1")
      this.total_inProgress = sessionStorage.getItem("totalinProgress1")
      this.total_closed = sessionStorage.getItem("totalclosed1")
      this.total_replied = sessionStorage.getItem("totalreplied1")



      this.getTicketList();
      this.sitelist();
      this.customernamelist(sessionStorage.getItem("site_idd1"))
      // this.pageChanged_backbutton(sessionStorage.getItem('sessionpageNo'));
    } else {

      this.getTicketList();
      sessionStorage.setItem("site_idd1", '');
      this.sitelist();
      this.getgraphCount('');
    }
    this.menu_array = eval('(' + sessionStorage.getItem('loginresponse') + ')')
    //this.epicFunction();
    $('#noData').hide();
    setTimeout(function () {
      $('#noData').show();
    }, 5000)
  }

  epicFunction() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();
  }
  ngOnInit() {
    var self = this;
    $(function () {


      $('#siteID').change(function (e) {
        var selected_projectid = $(e.target).val();
        if (selected_projectid == "select") {

        } else {
          self.customernamelist(selected_projectid);
        }


      })

      $('#customerID').change(function (e) {
        flatbooking_Id = $(e.target).val();
        if (flatbooking_Id == "select") {
          flatbooking_Id = null;
        } else {
          flatbooking_Id = $(e.target).val();
        }
        // flatbooking_Id = selected_flatid.split('&&')[1]
        console.log(flatbooking_Id)
        // if(selected_flatid == "select"){

        // }else{
        //   self.customernamelist();
        // }


      })
      // $('#siteID').change(function (e) {
      //   //    self.customerautofield()
      //   self.customernamelist();
      //   })
    })

    this.fg = new FormGroup(
      {
        from: new FormControl(""),
        to: new FormControl("")
      },
      [Validators.required, this.dateRangeValidator]
    );

    // $('#fromDate').on('change', function (e, date) {
    //   var maxDate = $('#fromDate').val();
    //   $('#toDate').attr('min', maxDate);
    // });
    var date = new Date().getMonth();
    var minimumdate = new Date().setMonth(date - 3);
    var maximumdate = new Date().setMonth(date + 3);
    'use strict';
    var self = this;
    $(function () {
      // alert(sessionStorage.getItem("todatee"))
      if (sessionStorage.getItem("todatee") == "null") {

      } else {
        $("#toDate").val(sessionStorage.getItem("todatee1"))
      }

      console.log(sessionStorage.getItem("fromdatee1"));

      if (sessionStorage.getItem("fromdatee") == "null") {

      } else {


        $("#fromDate").val(sessionStorage.getItem("fromdatee1"))
      }
      if (sessionStorage.getItem("Ticketnumberr1") == "null") {

      } else {
        $("#Ticketnumber").val(sessionStorage.getItem("Ticketnumberr1"));
      }

      // alert(sessionStorage.getItem("mystaus_val"))
      if (sessionStorage.getItem("mystausval1") == "null") {

      } else {
        $("#statusID").val(sessionStorage.getItem("mystausval1"));
      }

      $('.statuscls').click(function () {
        $(".statuscls").removeClass("activecls");
        $(this).addClass("activecls");
      });

      $("#siteID").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });
      $("#statusID").select2({
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



      //       $( "#fromDate" ).datepicker({
      //         dateFormat: 'dd-mm-yy',
      //         showButtonPanel: true,
      //         changeMonth: true,
      //         changeYear: true,
      // yearRange: '1999:2012',
      //         showOn: "button",
      //         buttonImage: "images/calendar.gif",
      //         buttonImageOnly: true,
      //         minDate:  new Date(minimumdate),
      //         maxDate: new Date(),
      //        // inline: true
      //     });


      // $('#fromDate').bootstrapMaterialDatePicker({
      //   format: 'YYYY-MM-DD',
      // //  minDate: new Date(minimumdate),
      //   maxDate: new Date(),
      //   clearButton: true,
      //   weekStart: 1,
      //   time: false
      // }).on('change', function (e, date) {
      //   $('#toDate').bootstrapMaterialDatePicker('setMinDate', date);
      // });


      // $('#toDate').bootstrapMaterialDatePicker({
      //   format: 'YYYY-MM-DD',
      // //  minDate: new Date(minimumdate),
      //   maxDate: new Date(),
      //   clearButton: true,
      //   weekStart: 1,
      //   time: false
      // });
      initCounters();
      initCharts();
    });

    //Widgets count plugin
    function initCounters() {
      $('.count-to').countTo();
    }

    //Charts
    function initCharts() {
      //Chart Bar
      $('.chart.chart-bar').sparkline(undefined, {
        type: 'bar',
        barColor: '#fff',
        negBarColor: '#fff',
        barWidth: '4px',
        height: '45px'
      });

      //Chart Pie
      $('.chart.chart-pie').sparkline(undefined, {
        type: 'pie',
        height: '45px',
        sliceColors: ['rgba(255,255,255,0.70)', 'rgba(255,255,255,0.85)', 'rgba(255,255,255,0.95)', 'rgba(255,255,255,1)']
      });

      //Chart Line
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

  setDate() {
    var getmonth = new Date().getMonth();
    var temp = new Date().setMonth(getmonth - 1);
    var minDate = new Date(temp);
    var year = minDate.getFullYear();
    var month = ("0" + (minDate.getMonth() + 1)).slice(-2);
    var day = ("0" + minDate.getDate()).slice(-2);
    var minimumdate = year + '-' + month + '-' + day;
    var date2 = new Date();
    var year2 = date2.getFullYear();
    var month2 = ("0" + (date2.getMonth() + 1)).slice(-2);
    var day2 = ("0" + date2.getDate()).slice(-2);
    var maximumdate = year2 + '-' + month2 + '-' + day2;
    fromDate = minimumdate;
    toDate = maximumdate;
    console.log("fromDate :" + fromDate);
    console.log("toDate :" + toDate);
  }

  ngAfterViewInit() {

    // this.getTicketList();
  }
  //assigning color for status based on condition
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

  gotoTicketDetailspage(data, index) {
    sessionStorage.getItem("site_idd1");
    sessionStorage.getItem("fromdatee1");
    sessionStorage.getItem("todatee1");
    sessionStorage.getItem("mystaus_val1");
    //sessionStorage.setItem("common_for_flats", "viewtickets");
    //  sessionStorage.setItem("from_Viewalltickets", "true");
    sessionStorage.setItem("common_for_flats", "viewtickets_graph");
    sessionStorage.setItem("from_Viewalltickets_graph", "true");

    sessionStorage.setItem("detailspageArray", this.detailspageArray);
    this.viewticketData = JSON.stringify(data);
    this.ticketListtotaldata = JSON.stringify(this.ticketList);
   // sessionStorage.setItem("Totalticketdata", this.ticketListtotaldata);
    this.router.navigate(["ticket/ticketdetails"], { state: this.viewticketData });

    sessionStorage.setItem('ticketdetails_view', this.viewticketData);
    sessionStorage.setItem("Totalticketdata", JSON.stringify(controller_data));

    sessionStorage.setItem('buttonstutus', 'true');
    sessionStorage.setItem("currentpageindex", JSON.stringify(this.current_Page));

    sessionStorage.setItem("TotalTicketCount", this.total_tickets);

  }

  getTicketList() {
    // sessionStorage.setItem('sessionpageNo', '1');
   // $(".page-loader-wrapper").show();
    if (this.isButtonClicked == "true") {
    //  alert(mystaus_val)
      if (mystaus_val == "" || mystaus_val ==null || mystaus_val =="null") {
        mystaus_val = null
      } else {
        mystaus_val = [mystaus_val]
      }

    } else {
      //$('#tableExport').DataTable().destroy();
      mystaus_val = null;
    }


    if(fromdatee == "" || fromdatee == undefined){
      fromdatee = null;
    }
    if(todatee == "" || todatee == undefined){
      todatee = null;
    }

    if(site_idd == "" || site_idd == undefined){
      site_idd = null;
    }

    if(flatbooking_Id == "" || flatbooking_Id == undefined){
      flatbooking_Id = null;
    }

    if(Ticket_number == "" || Ticket_number == undefined){
      Ticket_number = null;
    }

    //alert(mystaus_val)
    this.loaderhideme = true;
    let url = this.cmn.commonUrl + "employeeTicket/getTicketList.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      // "employeeId":""+sessionStorage.getItem('session_empid'),
      // "siteId":"111",
      // "departmentId":""+sessionStorage.getItem('session_deptid'),
      "requestUrl": "getTickets/AllTickets",
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      // "pageNo": "1",
      // "pageSize": "20",
      "ticketStatusIds": mystaus_val,
      "startDate": fromdatee, //"2020-05-20",
      "endDate": todatee, //"2020-05-21",
      "siteIds": site_idd,  //sessionStorage.getItem("site_idd"),
      "flatBookingId": flatbooking_Id,
      "ticketId": Ticket_number,
      "requestEnum": "TICKET_GRAPHS"

    }

    console.log(body);
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
   console.log(resp);


      this.loaderhideme = false;
   //   $(".page-loader-wrapper").hide();
      if (resp.responseCode == 200) {
        this.ticketList = [];
        // this.itemsPer_Page = resp.pageCount * 20;
        // this.current_Page = 1;
        // this.totalItems = 20;
        this.total_tickets = resp.rowCount;
        // this.open_tickets = resp.open;
        // this.reOpen_tickets = resp.reOpen;
        // this.new_tickets = resp.newState;
        // this.total_inProgress = resp.inProgress;
        // this.total_closed = resp.closed;
        // this.total_replied = resp.replied;
        this.ticketList = resp.ticketResponseList;
        this.forslideData = resp.ticketResponseList;
        sessionStorage.setItem("Totalticketdata", JSON.stringify(this.forslideData));
        this.total_length = resp.ticketResponseList.length;
        sessionStorage.setItem('getPageName', "viewAllTicketspage");
        sessionStorage.setItem('mysitids', resp.siteIds);
        for (var i = 0; i < resp.siteIds.length; i++) {
          mysite_idds.push(resp.siteIds[i]);
        }
        // $("#fromDate").val('');
        //  $("#toDate").val('');
        this.sitelist()
        //if (this.isButtonClicked == "true") {
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

        //  }


      } else if (resp.responseCode == 700) {
        this.loaderhideme = false;
        swal("Error!", "Your session has been expired.", "error");
        this.router.navigate(['']);
      } else if (resp.responseCode == 440) {
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
       // $(".page-loader-wrapper").hide();
        swal("Error!", "Internal server error.", "error");
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
  // public pageChanged(event: any): void {

  //   console.log(event);

  //   sessionStorage.setItem('sessionpageNo', event);
  //   if (mystausval == undefined) {
  //     mystaus_val = null
  //   } else {
  //     mystaus_val = [mystausval];
  //   }
  //   if ($("#siteID").val() == "select") {
  //     site_idd = null
  //   } else {
  //     site_idd = [$("#siteID").val()]
  //   }

  //   if ($("#fromDate").val() == "") {
  //     fromdatee = null;
  //   } else {
  //     fromdatee = $("#fromDate").val();
  //   }

  //   if ($("#toDate").val() == "") {
  //     todatee = null;
  //   } else {
  //     todatee = $("#toDate").val()
  //   }
  //   sessionStorage.setItem("site_idd", site_idd);
  //   sessionStorage.setItem("fromdatee", fromdatee);
  //   sessionStorage.setItem("todatee", todatee);
  //   sessionStorage.setItem("mystaus_val", mystaus_val);
  //   $(".page-loader-wrapper").show();
  //   let url = this.cmn.commonUrl + "employeeTicket/getTicketList.spring";
  //   let headers = new Headers({ 'Content-Type': 'application/json' });
  //   let options = new RequestOptions({ headers: headers });
  //   var body = {
  //     // "employeeId":""+sessionStorage.getItem('session_empid'),
  //     // "siteId":"111",
  //     // "departmentId":""+sessionStorage.getItem('session_deptid'),

  //     "requestUrl": "getTickets/AllTickets",
  //     "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
  //     "pageNo": event,
  //     "pageSize": "20",
  //     "startDate": fromdatee, //"2020-05-20",
  //     "endDate": todatee, //"2020-05-21",
  //     "ticketStatusIds": mystaus_val,
  //     "siteIds": site_idd
  //   }

  //   this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
  //     this.loaderhideme = false;
  //     $(".page-loader-wrapper").hide();
  //     if (resp.responseCode == 200) {
  //       this.itemsPer_Page = resp.pageCount * 20;
  //       this.current_Page = event;
  //       this.totalItems = 20;
  //       this.total_tickets = resp.rowCount;
  //       this.open_tickets = resp.open;
  //       this.reOpen_tickets = resp.reOpen;
  //       this.new_tickets = resp.newState;
  //       this.total_inProgress = resp.inProgress;
  //       this.total_closed = resp.closed;
  //       this.total_replied = resp.replied;
  //       this.ticketList = resp.ticketResponseList;
  //       //  setTimeout(function(){
  //       //   $('#tableExport').DataTable();
  //       //  },1000)

  //     } else if (resp.responseCode == 700) {
  //       swal("Error!", "Your session has been expired.", "error");
  //       this.router.navigate(['']);
  //     } else if (resp.responseCode == 440) {
  //       swal("Error!", "Your session has been expired.", "error");
  //       this.router.navigate([""]);
  //     }
  //   },
  //     error => {
  //       $(".page-loader-wrapper").hide();
  //       swal("Error!", "Internal server error.", "error");
  //       var error = JSON.parse(error._body).responseCode;
  //       //alert(error);
  //       $('.page-loader-wrapper').hide();
  //       if (error == 440) {
  //         swal("Your Session has been Timed Out!", "Please login once again.", "error");
  //         this.router.navigate([""]);
  //       }
  //     }
  //   );
  // };

  homeClick() {
    this.cmn.commonHomeNavigation();
  }


  /*-----------------Getting Project(site) list Start---------------------*/
  sitelist() {
    //  $('.page-loader-wrapper').show();
    var arr = localStorage.getItem('SiteIDS');
    let url = this.cmn.commonUrl + "site/site.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "siteIds": JSON.parse(arr).map(String),
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
    }
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      //  $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {

        var Options = "";
        $('#siteID').html('');
        $('#siteID').append("<option value='select'>--Select--</option>")
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#siteID').append("<option value='" + resp.responseObjList[i].id + "'>" + resp.responseObjList[i].name + "</option>");
        }
        if (sessionStorage.getItem("site_idd1") == "" || sessionStorage.getItem("site_idd1") == null || sessionStorage.getItem("site_idd1") == "null") {
        } else {
          $("#siteID").val(sessionStorage.getItem("site_idd1"));


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
    console.log(JSON.stringify(body))
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {


      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        this.customerdata = resp.responseObjList.referedCustomer;
        var Options = "";
        $('#customerID').html('');
        $('#customerID').append("<option value='select'>--Select--</option>")
        for (var i = 0; i < this.customerdata.length; i++) {
          $('#customerID').append("<option value='" + this.customerdata[i].flatBookingId + "'>" + this.customerdata[i].siteNameCustomerFlatNo + "</option>");

          // $('#customerID').append("<option value='" + this.customerdata[i].custId +'&&'+this.customerdata[i].flatBookingId+'&&'+this.customerdata[i].flatId+'&&'+this.customerdata[i].statusId+ "'>" + this.customerdata[i].siteNameCustomerFlatNo + "</option>");
        }
        // alert(sessionStorage.getItem("flatbooking_Idd1"))
        $("#customerID").val(sessionStorage.getItem("flatbooking_Idd1"));
        // if (sessionStorage.getItem("site_idd") == "" || sessionStorage.getItem("site_idd") == null || sessionStorage.getItem("site_idd") == "null") {
        // } else {
        //   $("#siteID").val(sessionStorage.getItem("site_idd"));
        // }

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
  /*searching Functionality start*/
  searchviewallticketList() {
   // alert(typeof $("#statusID").val())
    if ($("#statusID").val() == "11" || $("#statusID").val() == "6") {

      if (confirm("It will take time, Do you want to Continue ?")) {
        // mystaus_val = mystausval;

        this.searchviewallticketList1();
      } else { }
    } else {
      this.searchviewallticketList1();
    }

  }
  searchviewallticketList1() {
  
    // if (action == 'submitClick') {
    //   if ($('#fromDate').val() == '' && $('#toDate').val() == '') {
    //     swal('Please select from date (or) to date');
    //     return false;
    //   }
    // }
    $('#tableExport').DataTable().destroy();
    var startdate = $('#fromDate').val();
    var endDate = $('#toDate').val();
    if (new Date(startdate) > new Date(endDate)) {
      swal('To Date should be greater than or equal to From Date');
      return false;
    }

    // if (mystausval == undefined) {
    //   mystaus_val = null
    // } else {
    //   mystaus_val = [mystausval];
    // }

    if ($("#statusID").val() == "select" || $("#statusID").val() == null) {
      mystaus_val = null
    } else {
      mystaus_val = [$("#statusID").val()]
    }
    // alert(mystaus_val)
    if ($("#siteID").val() == "select") {
      site_idd = null
    } else {
      site_idd = [$("#siteID").val()]
    }

    if ($("#fromDate").val() == "") {
      fromdatee = null;
    } else {
      fromdatee = $("#fromDate").val();
    }

    if ($("#toDate").val() == "") {
      todatee = null;
    } else {
      todatee = $("#toDate").val()
    }
    if ($("#Ticketnumber").val() == "") {
      Ticket_number = null;
    } else {
      Ticket_number = $("#Ticketnumber").val()
    }

    if (flatbooking_Id == undefined) {
      flatbooking_Id = null
    } else {
      flatbooking_Id = flatbooking_Id;
    }

    console.log(site_idd);
    console.log(fromdatee);
    console.log(todatee);
    console.log(Ticket_number)
    console.log(flatbooking_Id)
    console.log(mystaus_val)

    if (site_idd == null && fromdatee == null && todatee == null && Ticket_number == null && flatbooking_Id == null && ($("#statusID").val() == 'select' || $("#statusID").val() == null)) {
      swal("Please select any option to continue!");
      return false;
    }


    sessionStorage.setItem("site_idd1", site_idd);
    sessionStorage.setItem("fromdatee1", fromdatee);
    sessionStorage.setItem("todatee1", todatee);
    sessionStorage.setItem("mystausval1", mystaus_val);
    sessionStorage.setItem("Ticketnumberr1", Ticket_number);
    sessionStorage.setItem("flatbooking_Idd1", flatbooking_Id);
    // sessionStorage.setItem("mystauss_val", mystaus_val);
    // if (sessionStorage.getItem("PageTicketnumber") == "null") {

    // } else {
    //   $("#Ticketnumber").val(sessionStorage.getItem("PageTicketnumber"));
    // }

    $(".page-loader-wrapper").show();

    let url = this.cmn.commonUrl + "employeeTicket/getTicketList.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "requestUrl": "getTickets/AllTickets",
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      // "pageNo": "1",
      // "pageSize": "20",
      "startDate": fromdatee, //"2020-05-20",
      "endDate": todatee, //"2020-05-21",
      "ticketStatusIds": mystaus_val,
      "siteIds": site_idd,
      "flatBookingId": flatbooking_Id,
      "ticketId": Ticket_number,
      "requestEnum": "TICKET_GRAPHS"

    }
    console.log(JSON.stringify(body))
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      this.loaderhideme = false;
      console.log(resp);
      $(".page-loader-wrapper").hide();
      if (resp.responseCode == 200) {
        this.ticketList = [];
        this.itemsPer_Page = resp.pageCount * 20;
        this.current_Page = 1;
        this.totalItems = 20;
         this.total_tickets = resp.rowCount;
        // this.open_tickets = resp.open;
        // this.reOpen_tickets = resp.reOpen;
        // this.new_tickets = resp.newState;
        // this.total_inProgress = resp.inProgress;
        // this.total_closed = resp.closed;
        // this.total_replied = resp.replied;
        this.ticketList = resp.ticketResponseList;
        this.total_length = resp.ticketResponseList.length;
        this.forslideData = resp.ticketResponseList;
        sessionStorage.setItem("Totalticketdata", JSON.stringify(this.forslideData));
        sessionStorage.setItem('getPageName', "viewAllTicketspage");
        this.sitelist()
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

            }).draw()

          });

        }, 2000)

      } else if (resp.responseCode == 700) {
        swal("Error!", "Your session has been expired.", "error");
        this.router.navigate(['']);
      } else if (resp.responseCode == 440) {
        swal("Error!", "Your session has been expired.", "error");
        this.router.navigate([""]);
      } else {
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
      }
    },
      error => {
        $(".page-loader-wrapper").hide();
        swal("Error!", "Internal server error.", "error");
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
  getStatus(id) {
    // mystausval = id;
    this.searchviewallticketList_forgraphsearch(id);
  }


  onChangeSearch(search: string) {
    //console.log(search);
  }

  selectEvent(item) {
    console.log(item);
    if (item == undefined) {
      this.customerNumber = '';
      this.customerName = '';


    } else {
      this.customerNumber = item.id;
      this.customerName = item.name;
      // console.log(this.customerNumber);
    }
  }

  onFocused(e) {

  }

  onClearSearch(item) {
    //console.log(item);
    if (item == undefined) {
      this.customerNumber = '';
      sessionStorage.removeItem("pagecustomernumber");
    }
  }

  //   customerautofield() {
  //     //this.preloader = true;
  //     this.service.GetCustomernamefun(sessionStorage.getItem("login_sessionkey"),$("#siteID").val()).then(resp => {
  //       this.preloader = false;
  //       if (resp.responseCode == 200) {
  //         this.customerdata = resp.responseObjList.referedCustomer;
  //         console.log(JSON.stringify(this.customerdata))



  //         if (this.customerdata.length == 0) {
  //           //  swal("Error!", "Please enter valid customer name", "error");

  //         } else {
  //           for (var i = 0; i < this.customerdata.length; i++) {
  // debugger;
  //             this.availableTags.push({
  //               id: this.customerdata[i].custId,
  //               name: this.customerdata[i].customerName
  //             });
  //             this.flatbookingId = this.customerdata[i].flatBookingId;
  //           }

  //           console.log(sessionStorage.getItem("pagecustomernumber"));

  //           if (sessionStorage.getItem("pagecustomernumber") == null) {
  //           } else {
  //             this.autocompleteform.get('employeename').patchValue(sessionStorage.getItem("pagecustomerName"));
  //           }

  //         }
  //       } else if (resp.responseCode == 440) {
  //         swal("Error!", "Your session has been expired.", "error");
  //         this.router.navigate([""]);
  //       }
  //     }, error => {
  //       $('.page-loader-wrapper').hide();
  //       var error = JSON.parse(error._body).responseCode;
  //       if (error == 440) {
  //         swal("Your Session has been Timed Out!", "Please login once again.", "error");
  //         this.router.navigate([""]);
  //       }
  //     }

  //     )
  //   }
  getgraphCount(grefresh) {

    if (grefresh == 'graph_represh') {
      $('.page-loader-wrapper').show();
    }

    var arr = localStorage.getItem('SiteIDS');
    let url = this.cmn.commonUrl + "employeeTicket/getTicketCountList.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      // "siteIds": JSON.parse(arr).map(String),
      // "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "requestUrl": "getTickets/AllTickets",
      "sessionKey": sessionStorage.getItem("login_sessionkey"),
      "requestEnum": "TICKET_GRAPHS"
    }
    console.log(url);
    console.log(JSON.stringify(body));

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      console.log("Graph count :" + JSON.stringify(resp));
      if (resp.responseCode == 200) {
        if (grefresh == 'graph_represh') {
          $('.page-loader-wrapper').hide();
        }

        this.total_tickets_graph = resp.totalTickets;
        this.open_tickets = resp.open;
        this.reOpen_tickets = resp.reOpen;
        this.new_tickets = resp.newState;
        this.total_inProgress = resp.inProgress;
        this.total_closed = resp.closed;
        this.total_replied = resp.escalated;
        sessionStorage.setItem("tottickets1", this.total_tickets_graph)
        sessionStorage.setItem("opentickets1", this.open_tickets)
        sessionStorage.setItem("newtickets1", this.new_tickets)
        sessionStorage.setItem("reOpentickets1", this.reOpen_tickets)
        sessionStorage.setItem("totalinProgress1", this.total_inProgress)
        sessionStorage.setItem("totalclosed1", this.total_closed)
        sessionStorage.setItem("totalreplied1", this.total_replied)
        //  this.ticketList = resp.ticketResponseList;
        // this.total_length = resp.ticketResponseList.length;

      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {

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

  get_totalTickets(mystausval) {
    if (confirm("It will take time, Do you want to Continue ?")) {
      // mystaus_val = mystausval;

      this.searchviewallticketList_forgraphsearch(mystausval);
    } else { }
  }

  searchviewallticketList_forgraphsearch(mystausval) {
    // if (action == 'submitClick') {
    //   if ($('#fromDate').val() == '' && $('#toDate').val() == '') {
    //     swal('Please select from date (or) to date');
    //     return false;
    //   }
    // }
    $('#tableExport').DataTable().destroy();
    var startdate = $('#fromDate').val();
    var endDate = $('#toDate').val();
    if (new Date(startdate) > new Date(endDate)) {
      swal('To Date should be greater than or equal to From Date');
      return false;
    }


    mystaus_val = [mystausval];
    // if (mystausval == undefined) {
    //   mystaus_val = null
    // } else {

    // }
    // alert(mystaus_val)
    if ($("#siteID").val() == "select") {
      site_idd = null
    } else {
      site_idd = [$("#siteID").val()]
    }

    if ($("#fromDate").val() == "") {
      fromdatee = null;
    } else {
      fromdatee = $("#fromDate").val();
    }

    if ($("#toDate").val() == "") {
      todatee = null;
    } else {
      todatee = $("#toDate").val()
    }
    if ($("#Ticketnumber").val() == "") {
      Ticket_number = null;
    } else {
      Ticket_number = $("#Ticketnumber").val()
    }

    if (flatbooking_Id == undefined) {
      flatbooking_Id = null
    } else {
      flatbooking_Id = flatbooking_Id;
    }

    console.log(site_idd);
    console.log(fromdatee);
    console.log(todatee);
    console.log(Ticket_number)
    console.log(flatbooking_Id)
    //return false;
    // if (site_idd == null && fromdatee == null && todatee == null && Ticket_number == null && flatbooking_Id ==null) {
    //   swal("Please select any option to continue!");
    //   return false;
    // }


    sessionStorage.setItem("site_idd1", site_idd);
    sessionStorage.setItem("fromdatee1", fromdatee);
    sessionStorage.setItem("todatee1", todatee);
    sessionStorage.setItem("mystaus_val1", mystaus_val);
    sessionStorage.setItem("Ticketnumberr1", Ticket_number);
    sessionStorage.setItem("flatbooking_Idd1", flatbooking_Id);
    // if (sessionStorage.getItem("PageTicketnumber") == "null") {

    // } else {
    //   $("#Ticketnumber").val(sessionStorage.getItem("PageTicketnumber"));
    // }

    $(".page-loader-wrapper").show();

    let url = this.cmn.commonUrl + "employeeTicket/getTicketList.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "requestUrl": "getTickets/AllTickets",
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      // "pageNo": "1",
      // "pageSize": "20",
      "startDate": null, //"2020-05-20",
      "endDate": null, //"2020-05-21",
      "ticketStatusIds": mystaus_val,
      "siteIds": null,
      "flatBookingId": null,
      "ticketId": null,
      "requestEnum": "TICKET_GRAPHS"

    }
    console.log("From graphs:" + JSON.stringify(body))
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      this.loaderhideme = false;
      console.log("From graphs:" + JSON.stringify(resp))
      console.log(resp);
      $(".page-loader-wrapper").hide();
      if (resp.responseCode == 200) {
        this.itemsPer_Page = resp.pageCount * 20;
        this.current_Page = 1;
        this.totalItems = 20;
        this.total_tickets = resp.rowCount;
        // this.open_tickets = resp.open;
        // this.reOpen_tickets = resp.reOpen;
        // this.new_tickets = resp.newState;
        // this.total_inProgress = resp.inProgress;
        // this.total_closed = resp.closed;
        // this.total_replied = resp.replied;
        this.ticketList = resp.ticketResponseList;
        this.total_length = resp.ticketResponseList.length;
        this.forslideData = resp.ticketResponseList;
      
        this.sitelist()
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

              // "fnStateSave": function (oSettings, oData) {
              //   localStorage.setItem('offersDataTables', JSON.stringify(oData));
              // },
              // "fnStateLoad": function (oSettings) {
              //   return JSON.parse(localStorage.getItem('offersDataTables'));
              // },
              "footerCallback": function (row, data, start, end, display) {
                controller_data = [];
                for (var j = 0; j < display.length; j++) {
                  controller_data.push(resp.ticketResponseList[display[j]]);
                }
              },


            }).draw()

          });

        }, 2000)
        sessionStorage.setItem("Totalticketdata", JSON.stringify(this.forslideData));
        sessionStorage.setItem('getPageName', "viewAllTicketspage");
      } else if (resp.responseCode == 700) {
        swal("Error!", "Your session has been expired.", "error");
        this.router.navigate(['']);
      } else if (resp.responseCode == 440) {
        swal("Error!", "Your session has been expired.", "error");
        this.router.navigate([""]);
      } else {
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
      }
    },
      error => {
        $(".page-loader-wrapper").hide();
        swal("Error!", "Internal server error.", "error");
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
  startdatefun() {
    $("#fromDate").val("");
  }

  endtimefun() {
    $("#toDate").val("");
  }


  showallfun() {

    $("#fromDate").val("");
    $("#toDate").val("");
    $("#siteID").val("");
    $("#siteID").trigger('change');
    $("#customerID").val("");
    $("#Ticketnumber").val("");
    $("#statusID").val("");
    $("#statusID").trigger('change');
 
   
    sessionStorage.removeItem("site_idd1");
    sessionStorage.removeItem("fromdatee1");
    sessionStorage.removeItem("todatee1");
    sessionStorage.removeItem("mystausval1");

    sessionStorage.removeItem("Ticketnumberr1");
    sessionStorage.removeItem("flatbooking_Idd1");
    sessionStorage.removeItem('isBackButton_Clicked1')

    this.ticketList = [];

   mystaus_val = null;
   flatbooking_Id = null;

   if ($("#statusID").val() == "select" || $("#statusID").val() == null) {
    mystaus_val = null
  } else {
    mystaus_val = [$("#statusID").val()]
  }
  // alert(mystaus_val)
  if ($("#siteID").val() == "select") {
    site_idd = null
  } else {
    site_idd = [$("#siteID").val()]
  }

  if ($("#fromDate").val() == "") {
    fromdatee = null;
  } else {
    fromdatee = $("#fromDate").val();
  }

  if ($("#toDate").val() == "") {
    todatee = null;
  } else {
    todatee = $("#toDate").val()
  }
  if ($("#Ticketnumber").val() == "") {
    Ticket_number = null;
  } else {
    Ticket_number = $("#Ticketnumber").val()
  }

  if (flatbooking_Id == undefined) {
    flatbooking_Id = null
  } else {
    flatbooking_Id = flatbooking_Id;
  }

    $('#tableExport').DataTable().destroy();

   this.getTicketList();
  }

  siteList_temp() {
    var arr = localStorage.getItem('SiteIDS');
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "site/site.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": sessionStorage.getItem("login_sessionkey"),
      "siteIds": [107],
    }
console.log(JSON.stringify(body))
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#projectID').html("");
        $('#projectID').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#projectID').append("<option value='" + resp.responseObjList[i].id + "'>" + resp.responseObjList[i].name + "</option>");
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
}
