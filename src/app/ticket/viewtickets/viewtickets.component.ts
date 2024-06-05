import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, NavigationExtras } from "@angular/router";
import { Http, RequestOptions, Headers } from '@angular/http';
import { HttpClient } from "@angular/common/http";
import { CommonComponent } from '../../common/common.component';
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
var  controller_data = [];
@Component({
  selector: 'app-viewtickets',
  templateUrl: './viewtickets.component.html',
  styleUrls: ['./viewtickets.component.sass'],
  //providers: [ViewticketsService],
})


//import { ConfirmDialogService } from '../dailogbox/confirm-dialog.service';
export class ViewticketsComponent implements OnInit {
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


  constructor(private deviceService: DeviceDetectorService, private router: Router, private http: Http, public cmn: CommonComponent) {
    sessionStorage.setItem("from_Changeticketowner", "");
   // this.siteList_temp();
    this.isButtonClicked = sessionStorage.getItem('isBackButton_Clicked');
    console.log(this.isButtonClicked);
    sessionStorage.getItem("site_iddv");
    sessionStorage.getItem("fromdatee");
    sessionStorage.getItem("todatee");
    sessionStorage.getItem("mystaus_val");
    console.log(sessionStorage.getItem('sessionpageNo'))

    if (this.isButtonClicked == "true") {

      console.log(sessionStorage.getItem("site_iddv"));
      console.log(sessionStorage.getItem("fromdatee"));
      console.log(sessionStorage.getItem("todatee"));

      this.getTicketList();
      this.sitelist();
      this.customernamelist(sessionStorage.getItem("site_iddv"))
      // this.pageChanged_backbutton(sessionStorage.getItem('sessionpageNo'));
    } else {

      this.getTicketList1();
      sessionStorage.setItem("site_iddv", '');
      this.sitelist();

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

      if (sessionStorage.getItem("todatee") == "null") {

      } else {
        $("#toDate").val(sessionStorage.getItem("todatee"))
      }

      console.log(sessionStorage.getItem("fromdatee"));

      if (sessionStorage.getItem("fromdatee") == "null") {

      } else {


        $("#fromDate").val(sessionStorage.getItem("fromdatee"))
      }
      if (sessionStorage.getItem("Ticketnumberr") == "null") {

      } else {
        $("#Ticketnumber").val(sessionStorage.getItem("Ticketnumberr"));
      }

      $('.statuscls').click(function () {
        $(".statuscls").removeClass("activecls");
        $(this).addClass("activecls");
      });

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
    console.log(controller_data);
    sessionStorage.getItem("site_iddv");
    sessionStorage.getItem("fromdatee");
    sessionStorage.getItem("todatee");
    sessionStorage.getItem("mystaus_val");
    sessionStorage.setItem("common_for_flats", "viewtickets");
    sessionStorage.setItem("from_Viewalltickets", "true");

    sessionStorage.setItem("detailspageArray", this.detailspageArray);
    console.log(JSON.stringify(data))
    //return false;
    this.viewticketData = JSON.stringify(data);
    this.ticketListtotaldata = JSON.stringify(this.ticketList);
 //   sessionStorage.setItem("Totalticketdata", this.ticketListtotaldata);
    this.router.navigate(["ticket/ticketdetails"], { state: this.viewticketData });
    sessionStorage.setItem('ticketdetails_view', this.viewticketData);
    sessionStorage.setItem('buttonstutus', 'true');
    sessionStorage.setItem("currentpageindex", JSON.stringify(this.current_Page));
    sessionStorage.setItem("TotalTicketCount", this.total_tickets);
    sessionStorage.setItem("Totalticketdata", JSON.stringify(controller_data));

  }

  getTicketList() {

    // sessionStorage.setItem('sessionpageNo', '1');
    $(".page-loader-wrapper").show();
    if (this.isButtonClicked == "true") {

    } else {
      //$('#tableExport').DataTable().destroy();
    }

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
      "startDate": fromdatee, //"2020-05-20",
      "endDate": todatee, //"2020-05-21",
      "siteIds": site_idd,  //sessionStorage.getItem("site_idd"),
      "flatBookingId": flatbooking_Id,
      "ticketId": Ticket_number,
      "requestEnum": null

    }
console.log(url);
    console.log(JSON.stringify(body))
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

      console.log(resp);

      this.loaderhideme = false;
      $(".page-loader-wrapper").hide();
      if (resp.responseCode == 200) {

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

        this.sitelist()
        //  }


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


  getTicketList1() {
  
    // sessionStorage.setItem('sessionpageNo', '1');
    //$(".page-loader-wrapper").show();
    if (this.isButtonClicked == "true") {

    } else {
      //$('#tableExport').DataTable().destroy();
    }

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
      "startDate": fromdatee, //"2020-05-20",
      "endDate": todatee, //"2020-05-21",
      "siteIds": null,  //sessionStorage.getItem("site_idd"),
      "flatBookingId": null,
      "ticketId": Ticket_number,
      "requestEnum": null

    }
console.log(url);
    console.log(JSON.stringify(body))
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

      console.log(resp);

      this.loaderhideme = false;
 
      if (resp.responseCode == 200) {

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

            }).draw();

          });

        }, 2000)
        this.sitelist()
        //  }


      } else if (resp.responseCode == 700) {
        this.loaderhideme = false;
 
        swal("Error!", "Your session has been expired.", "error");
        this.router.navigate(['']);
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
 
 //       $(".page-loader-wrapper").hide();
        swal("Error!", "Internal server error.", "error");
        var error = JSON.parse(error._body).responseCode;
       
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
    var arr = localStorage.getItem('SiteIDS');
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
        if (sessionStorage.getItem("site_iddv") == "" || sessionStorage.getItem("site_iddv") == null || sessionStorage.getItem("site_iddv") == "null") {
        } else {
          $("#siteID").val(sessionStorage.getItem("site_iddv"));


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

          // $('#customerID').append("<option value='" + this.customerdata[i].custId +'&&'+this.customerdata[i].flatBookingId+'&&'+this.customerdata[i].flatId+'&&'+this.customerdata[i].statusId+ "'>" + this.customerdata[i].siteNameCustomerFlatNo + "</option>");
        }

        console.log(sessionStorage.getItem("flatbooking_Iddv"));
       
        if (sessionStorage.getItem("flatbooking_Iddv") == "" || sessionStorage.getItem("flatbooking_Iddv") == null || sessionStorage.getItem("flatbooking_Iddv") == "null") {
        } else {
          $("#customerID").val(sessionStorage.getItem("flatbooking_Iddv"));
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
  /*searching Functionality start*/

  searchviewallticketList() {
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

    if (mystausval == undefined) {
      mystaus_val = null
    } else {
      mystaus_val = [mystausval];
    }
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
    if (site_idd == null && fromdatee == null && todatee == null && Ticket_number == null && flatbooking_Id == null) {
      swal("Please select any option to continue!");
      return false;
    }


    sessionStorage.setItem("site_iddv", site_idd);
    sessionStorage.setItem("fromdatee", fromdatee);
    sessionStorage.setItem("todatee", todatee);
    sessionStorage.setItem("mystaus_val", mystaus_val);
    sessionStorage.setItem("Ticketnumberr", Ticket_number);
    sessionStorage.setItem("flatbooking_Iddv", flatbooking_Id);
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
      "requestEnum": null

    }

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      this.loaderhideme = false;
      console.log(resp);
      $(".page-loader-wrapper").hide();
      if (resp.responseCode == 200) {
        this.itemsPer_Page = resp.pageCount * 20;
        this.current_Page = 1;
        this.totalItems = 20;
        this.total_tickets = resp.rowCount;
        this.open_tickets = resp.open;
        this.reOpen_tickets = resp.reOpen;
        this.new_tickets = resp.newState;
        this.total_inProgress = resp.inProgress;
        this.total_closed = resp.closed;
        this.total_replied = resp.replied;
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
    mystausval = id;

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

    sessionStorage.removeItem("site_iddv");
    sessionStorage.removeItem("fromdatee");
    sessionStorage.removeItem("todatee");
    sessionStorage.removeItem("mystaus_val");
    sessionStorage.removeItem("Ticketnumberr");
    sessionStorage.removeItem("flatbooking_Iddv")

    this.ticketList = [];

    if ($("#Ticketnumber").val() == "") {
      Ticket_number = null;
    } else {
      Ticket_number = $("#Ticketnumber").val()
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

    $('#tableExport').DataTable().destroy();

     this.getTicketList1();
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
     
      
      if (resp.responseCode == 200) {
        $(function(){
          setTimeout(function(){
            $('.page-loader-wrapper').hide();
          },5000)
        })
        
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

