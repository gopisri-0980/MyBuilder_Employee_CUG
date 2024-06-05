import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras, RoutesRecognized } from "@angular/router";
import { Http, RequestOptions, Headers } from '@angular/http';
import { HttpClient } from "@angular/common/http";
import { CommonComponent } from '../common/common.component';
import 'rxjs/add/operator/map'
import { ViewclosedticketsService } from './viewclosedtickets.service';
import { TicketdetailsComponent } from '../ticket/ticketdetails/ticketdetails.component';
import { filter, pairwise } from 'rxjs/operators';
import { Location } from '@angular/common';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {

  ValidatorFn,
  AbstractControl
} from "@angular/forms";
declare const $: any;
declare const swal: any;
var fromDate;
var toDate;
var flatbooking_Id;
var selected_siteID;
var controller_data = [];
@Component({
  selector: 'app-view-closed-tickets',
  templateUrl: './view-closed-tickets.component.html',
  styleUrls: ['./view-closed-tickets.component.sass'],
  providers: [ViewclosedticketsService],

})
export class ViewClosedTicketsComponent implements OnInit {
  preloader: boolean;

  @ViewChild('auto') auto;
  fg: FormGroup;
  customerauto: any;
  ticketList: any;
  viewticketData: any;
  total_tickets: any;
  open_tickets: any;
  total_inProgress: any;
  total_closed: any;
  showLoadingIndicatior: boolean;
  itemsPer_Page: number;
  current_Page: number;
  totalItems: number;
  searchText: string;
  total_length: any;
  customerdata: any;
  faltbookingIDval: any;
  flatbookingId: any;
  pagenationnumber: any = 1;
  backcontroller: string;
  status: string;
  availableTags: Array<any> = [];
  keyword = "name";
  previousUrl: string = ''
  currentUrl: string = ''
  public countries = this.availableTags;
  customerNumber: any;
  componentFactoryResolver: any;
  searchhideme: boolean = false;
  completer: any;
  setelistval: any;
  loginsession: string;
  currentpagenationno: string;
  pagenationsiteids: string;
  pagenationcustomername: string;
  pagenationticketno: string;
  loaderhideme: boolean = false;
  currentpagenumber: string;
  autocompleteform: FormGroup;
  ticketListtotaldata: string;


  public initialValue = {
    id: 1,
    name: 'Albania',
  }
  customerName: string;


  constructor(private router: Router, private http: Http, public cmn: CommonComponent,
    public service: ViewclosedticketsService, private _location: Location, public formBuilder: FormBuilder) {
    sessionStorage.setItem('jsontotalticketresponse1', 'empty')
    this.preloader = false;
    if (JSON.parse(sessionStorage.getItem("PagesearchsiteIds")) == null) {
    } else {
      // alert(JSON.parse(sessionStorage.getItem("PagesearchsiteIds"))[0])
      this.customernamelist(JSON.parse(sessionStorage.getItem("PagesearchsiteIds")));
    }


    if (sessionStorage.getItem("ticketing") == "Ticketing") {
      this.loaderhideme = true;
      this.preloader = true;
      setTimeout(() => {
        this.preloader = true;
        this.loginsession = sessionStorage.getItem("login_sessionkey");
        this.currentpagenationno = sessionStorage.getItem('currentPageNo');

        this.pagenationsiteids = sessionStorage.getItem("PagesearchsiteIds");
        this.pagenationcustomername = sessionStorage.getItem("pagecustomernumber");
        this.pagenationticketno = sessionStorage.getItem("PageTicketnumber");
        sessionStorage.getItem("startdate");
        sessionStorage.getItem("enddate");
        $(function () {
          if (sessionStorage.getItem("enddate") == "null") {
          } else {
            $("#toDate").val(sessionStorage.getItem("enddate"))
          }
          if (sessionStorage.getItem("startdate") == "null") {
          } else {
            $("#fromDate").val(sessionStorage.getItem("startdate"))
          }

          if (sessionStorage.getItem("PageTicketnumber") == "null") {

          } else {
            $("#Ticketnumber").val(sessionStorage.getItem("PageTicketnumber"));
          }




        });
        this.loaderhideme = true;
        this.preloader = true;
        $('.page-loader-wrapper').show();
        this.service.searchfunction(this.loginsession, this.currentpagenationno, '20', 'closedTickets', 'getTickets/AllTickets', this.pagenationsiteids, this.pagenationcustomername, this.pagenationticketno, sessionStorage.getItem("startdate"), sessionStorage.getItem("enddate"), flatbooking_Id).then(resp => {
          this.preloader = false;
          this.loaderhideme = false;
          $('.page-loader-wrapper').hide();
          if (resp.responseCode == 200) {
            this.itemsPer_Page = resp.pageCount * 20;
            this.current_Page = JSON.parse(this.currentpagenationno);
            this.totalItems = 20;
            this.total_tickets = resp.rowCount;
            localStorage.setItem('totalTickets', this.total_tickets);
            this.open_tickets = resp.open;
            localStorage.setItem('openTickets', this.open_tickets);
            this.total_inProgress = resp.inProgress;
            this.total_closed = resp.closed;
            localStorage.setItem('Closed', this.total_closed);
            this.ticketList = resp.responseObjList.ticketResponseList;
            this.total_length = resp.responseObjList.ticketResponseList.length;
            sessionStorage.setItem('getPageName', "viewmyticketspage");
            if (resp.responseObjList.ticketResponseList.length !== 0) {
              this.searchhideme = true;
            }
            setTimeout(function () {
              $(document).ready(function () {
                $('#tableExport').DataTable({
                  pageLength: 10,
                lengthMenu: [[ 10, 20, -1], [ 10, 20, 'Todos']],
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
                      controller_data.push(resp.responseObjList.ticketResponseList[display[j]]);
                    }
                  },

                })

              });

            }, 2000)
          } else if (resp.responseCode == 440) {
            swal("Error!", "Your session has been expired.", "error");
            this.router.navigate([""]);
          } else {
            $('.page-loader-wrapper').hide();
            swal(resp.errors[0]);
            return false;
          }
        }, error => {
          $('.page-loader-wrapper').hide();
          var error = JSON.parse(error._body).responseCode;
          if (error == 440) {
            swal("Your Session has been Timed Out!", "Please login once again.", "error");
            this.router.navigate([""]);
          }
        }

        )
      }, 3000);

      this.siteList();
      this.customerautofield();

    } else {
      this.siteList();
      this.customerautofield();
    }
  }

  ngOnInit() {

    this.autocompleteform = this.formBuilder.group({
      employeename: ['']
    });

    this.fg = new FormGroup(
      {
        from: new FormControl(""),
        to: new FormControl("")
      },
      [Validators.required, this.dateRangeValidator]
    );

    // var date = new Date().getMonth();
    // var minimumdate = new Date().setMonth(date - 3);
    // var maximumdate = new Date().setMonth(date + 3);
    // $('#fromDate').bootstrapMaterialDatePicker({
    //   format: 'YYYY-MM-DD',
    //   minDate: new Date(minimumdate),
    //   maxDate: new Date(),
    //   clearButton: true,
    //   weekStart: 1,
    //   time: false,

    // });

    // $('#toDate').bootstrapMaterialDatePicker({
    //   format: 'YYYY-MM-DD',
    //   minDate: new Date(minimumdate),
    //   maxDate: new Date(),
    //   clearButton: true,
    //   weekStart: 1,
    //   time: false
    // });


    this.router.events
      .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
      .subscribe((events: RoutesRecognized[]) => {
        this.previousUrl = events[0].urlAfterRedirects;
        this.currentUrl = events[1].urlAfterRedirects;
        if (this.previousUrl.includes('ticket/ticketdetails')) {
          if (sessionStorage.getItem('currentPageNo') !== null) {
            sessionStorage.setItem("ticketing", 'Ticketing');

            sessionStorage.getItem("PagesearchsiteIds");
            sessionStorage.getItem("pagecustomernumber");
            sessionStorage.getItem("PageTicketnumber");

            console.log(sessionStorage.getItem("PagesearchsiteIds"));
            console.log(sessionStorage.getItem("pagecustomernumber"));
            console.log(sessionStorage.getItem("PageTicketnumber"));

          }
        } else {
          console.log('previous url is something else. call the ususal service from start');
          sessionStorage.removeItem("ticketing");
          // sessionStorage.removeItem('currentPageNo');
        }
      }, error => {

        sessionStorage.removeItem("ticketing");
      }
      );
    this.status = "viewclosedtickets";
    'use strict';
    $(function () {
      initCounters();
      initCharts();
    });

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


    $('#noData').hide();
    setTimeout(function () {
      $('#noData').show();
    }, 5000)

    $("#projectID").select2({
      placeholder: "--Select--",
      dir: "ltl",
    });

    $("#customerID").select2({
      placeholder: "--Select--",
      dir: "ltl"
    });
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
    var self = this;
    $(function () {

      var siteIdsList = [];
      $('#projectID').change(function (e) {
        sessionStorage.removeItem("SiteIdList");
        this.selected_siteID = $(e.target).val();
        selected_siteID = $(e.target).val();
        console.log(selected_siteID)
        //  alert(selected_siteID)
        if (this.selected_siteID[0] == 'select') {
          swal("please select project");
          $('#projectID').val("");
          this.selected_siteID = "";
          sessionStorage.removeItem("SiteIdList");
          return false;
        } else {
          self.customernamelist(selected_siteID);
          siteIdsList = this.selected_siteID;
          sessionStorage.setItem("SiteIdList", JSON.stringify(siteIdsList));

        }
      })
    })

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
  }
  getToday(): string {
    return new Date().toISOString().split('T')[0]
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


  showallfun() {

    $("#fromDate").val("");
    $("#toDate").val("");
    $("#projectID").val("");
    $("#projectID").trigger('change');

    $("#Ticketnumber").val("");
    this.autocompleteform.patchValue({
      employeename: '',
    });

    this.loaderhideme = true;
    this.ticketList = [];
    sessionStorage.removeItem("ticketing");
    sessionStorage.removeItem('currentPageNo')
    sessionStorage.removeItem("SiteIdList");
    sessionStorage.removeItem("PagesearchsiteIds");
    sessionStorage.removeItem("pagecustomernumber");
    sessionStorage.removeItem("PageTicketnumber");
    this.getTicketList("1");
  }


  /*-----------------Getting Project(site) list Start---------------------*/
  siteList() {

    var arr = localStorage.getItem('SiteIDS');
    $('.page-loader-wrapper').show();
    this.service.GetsiteListfun(sessionStorage.getItem("login_sessionkey"), JSON.parse(arr).map(String)).then(resp => {
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#projectID').html("");
        $('#projectID').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#projectID').append("<option value='" + resp.responseObjList[i].id + "'>" + resp.responseObjList[i].name + "</option>");
        }

        console.log(sessionStorage.getItem("PagesearchsiteIds"));

        if (sessionStorage.getItem("PagesearchsiteIds") == "" || sessionStorage.getItem("PagesearchsiteIds") == null || sessionStorage.getItem("PagesearchsiteIds") == "null") {
        } else {
          console.log(JSON.parse(sessionStorage.getItem("PagesearchsiteIds")));
          $("#projectID").val(JSON.parse(sessionStorage.getItem("PagesearchsiteIds")));
        }
      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
      }
    }, error => {
      $('.page-loader-wrapper').hide();
      var error = JSON.parse(error._body).responseCode;
      //alert(error);
      if (error == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      }
    }
    );
  }



  customerautofield() {
    //this.preloader = true;
    this.service.GetCustomernamefun(sessionStorage.getItem("login_sessionkey"), "").then(resp => {
      this.preloader = false;
      if (resp.responseCode == 200) {
        this.customerdata = resp.responseObjList.referedCustomer;




        if (this.customerdata.length == 0) {
          //  swal("Error!", "Please enter valid customer name", "error");

        } else {
          for (var i = 0; i < this.customerdata.length; i++) {

            this.availableTags.push({
              id: this.customerdata[i].custId,
              name: this.customerdata[i].customerName
            });
            this.flatbookingId = this.customerdata[i].flatBookingId;
          }

          console.log(sessionStorage.getItem("pagecustomernumber"));

          if (sessionStorage.getItem("pagecustomernumber") == null) {
          } else {
            this.autocompleteform.get('employeename').patchValue(sessionStorage.getItem("pagecustomerName"));
          }

        }
      } else if (resp.responseCode == 440) {
        swal("Error!", "Your session has been expired.", "error");
        this.router.navigate([""]);
      } else {
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
      }
    }, error => {
      $('.page-loader-wrapper').hide();
      var error = JSON.parse(error._body).responseCode;
      if (error == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      }
    }

    )
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
  startdatefun() {
    $("#fromDate").val("");
  }

  endtimefun() {
    $("#toDate").val("");
  }
  onClearSearch(item) {
    //console.log(item);
    if (item == undefined) {
      this.customerNumber = '';
      sessionStorage.removeItem("pagecustomernumber");
    }
  }


  /*-----------------Getting Project(site) list End---------------------*/
  getTicketList(val) {
    $('#tableExport').DataTable().destroy();
    this.preloader = true;
    this.service.Getclosedticketview(sessionStorage.getItem("login_sessionkey"), val, '20', 'closedTickets', 'getTickets/AllTickets').then(resp => {
      console.log(resp);
      this.loaderhideme = false;
      this.preloader = false;
      if (resp.responseCode == 200) {
        this.itemsPer_Page = resp.pageCount * 20;
        this.current_Page = val;
        this.totalItems = 20;
        this.total_tickets = resp.responseObjList.rowCount;
        localStorage.setItem('totalTickets', this.total_tickets);
        this.open_tickets = resp.open;
        localStorage.setItem('openTickets', this.open_tickets);
        this.total_inProgress = resp.inProgress;
        this.total_closed = resp.closed;
        localStorage.setItem('Closed', this.total_closed);
        this.ticketList = resp.responseObjList.ticketResponseList;
        this.searchhideme = true;
        this.total_length = resp.responseObjList.ticketResponseList.length;
        sessionStorage.setItem('getPageName', "viewmyticketspage");
        setTimeout(function () {
          $(document).ready(function () {
            $('#tableExport').DataTable({
              pageLength: 10,
                lengthMenu: [[ 10, 20, -1], [ 10, 20, 'Todos']],
                dom: 'Bfrltip',
                buttons: [
                  'copy', 'csv', 'excel', 'print', {
                    extend: 'pdfHtml5',
                    orientation: 'landscape',
                    pageSize: 'LEGAL'
                  }
                ],

                columnDefs: [
                  { width: 20, targets: 0 },       
                 { width: 100, targets: 1 }
                  ],
                  fixedColumns: true,

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
                  controller_data.push(resp.responseObjList.ticketResponseList[display[j]]);
                }
              },
            })

          });

        }, 2000)
      } else if (resp.responseCode == 440) {
        swal("Error!", "Your session has been expired.", "error");
        this.router.navigate([""]);
      } else {
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
      }
    }, error => {
      $('.page-loader-wrapper').hide();
      var error = JSON.parse(error._body).responseCode;
      if (error == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      }
    }

    )
  }




  homeClick() {
    this.cmn.commonHomeNavigation();
  }


  searchfun() {
    $('#tableExport').DataTable().destroy();
    console.log(sessionStorage.getItem("pagecustomernumber"));



    var startdate = $('#fromDate').val();
    var endDate = $('#toDate').val();
    if (new Date(startdate) > new Date(endDate)) {
      swal('To Date should be greater than or equal to From Date');
      return false;
    }

    if (sessionStorage.getItem("SiteIdList") == null) {
      this.setelistval = null;
    } else if (JSON.parse(sessionStorage.getItem("SiteIdList")).length == 0) {
      this.setelistval = null;
    } else {
      this.setelistval = sessionStorage.getItem("SiteIdList");
    }



    if (flatbooking_Id == undefined) {
      flatbooking_Id = null
    } else {
      flatbooking_Id = $("#customerID").val();
    }
    // if (this.customerNumber == undefined) {
    //   this.customerNumber = "";
    //   this.customerName = "";
    // }

    if (sessionStorage.getItem("pagecustomernumber") !== null) {
      this.customerNumber = sessionStorage.getItem("pagecustomernumber");
    }


    var startdate = $('#fromDate').val();
    var endDate = $('#toDate').val();
    if (new Date(startdate) > new Date(endDate)) {
      swal('Please select  a valid from and to date');
      return false;
    }

    if(this.customerNumber == undefined){
      this.customerNumber = "";
    }


    console.log(flatbooking_Id);
    console.log(this.setelistval);
    console.log(this.customerNumber);
    console.log($("#Ticketnumber").val());
    console.log(startdate);
    console.log(endDate);

  

    if (flatbooking_Id == null && this.setelistval == null && this.customerNumber == "" && $("#Ticketnumber").val() == "" && startdate == "" && endDate == "") {
      swal("Please select at least one option.");
      return false;
    }


    $('.page-loader-wrapper').show();
    sessionStorage.removeItem('Pagenationform');
    if (this.customerNumber == undefined) {
      this.customerNumber = "";
      this.customerName = "";
    }





    this.preloader = true;
    this.service.searchfunction(sessionStorage.getItem("login_sessionkey"), '1', '20', 'closedTickets',
      'getTickets/AllTickets', sessionStorage.getItem("SiteIdList"), this.customerNumber,
      $("#Ticketnumber").val(), startdate, endDate, flatbooking_Id).then(resp => {
        console.log(resp);
        $('.page-loader-wrapper').hide();
        this.loaderhideme = false;
        this.preloader = false;
        if (resp.responseCode == 200) {
          this.itemsPer_Page = resp.pageCount * 20;
          this.current_Page = 1;
          this.totalItems = 20;
          this.total_tickets = resp.responseObjList.rowCount;
          localStorage.setItem('totalTickets', this.total_tickets);
          this.open_tickets = resp.open;
          localStorage.setItem('openTickets', this.open_tickets);
          this.total_inProgress = resp.inProgress;
          this.total_closed = resp.closed;
          localStorage.setItem('Closed', this.total_closed);
          this.ticketList = resp.responseObjList.ticketResponseList;
          this.total_length = resp.responseObjList.ticketResponseList.length;
          sessionStorage.setItem('getPageName', "viewmyticketspage");
          if (resp.responseObjList.ticketResponseList.length !== 0) {
            this.searchhideme = true;
          }
          sessionStorage.setItem("PagesearchsiteIds", sessionStorage.getItem("SiteIdList"));
          sessionStorage.setItem("pagecustomernumber", this.customerNumber);
          sessionStorage.setItem("pagecustomerName", this.customerName);
          sessionStorage.setItem("PageTicketnumber", $("#Ticketnumber").val());
          sessionStorage.setItem("flatbookingId", flatbooking_Id);
          sessionStorage.setItem("startdate", startdate);
          sessionStorage.setItem("enddate", endDate);

          // $("#Ticketnumber").val("");
          // $('#projectID').html("");

          // $('#fromDate').val("");
          // $('#toDate').val("");

          // this.customerNumber = null;
          // this.autocompleteform.patchValue({
          //   employeename: '',
          // });

          //  this.auto.clear();
          // this.siteList();
          //  this.customerautofield();
          // sessionStorage.removeItem("SiteIdList");
          sessionStorage.removeItem("ticketing");

          sessionStorage.removeItem('currentPageNo');


          setTimeout(function () {
            $(document).ready(function () {
              $('#tableExport').DataTable({
                pageLength: 10,
                lengthMenu: [[ 10, 20, -1], [ 10, 20, 'Todos']],
                dom: 'Bfrltip',
                buttons: [
                  'copy', 'csv', 'excel', 'print', {
                    extend: 'pdfHtml5',
                    orientation: 'landscape',
                    pageSize: 'LEGAL'
                  }
                ],

                columnDefs: [
                  { width: 20, targets: 0 },       
                 { width: 100, targets: 1 }
                  ],
                  fixedColumns: true,


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
                    controller_data.push(resp.responseObjList.ticketResponseList[display[j]]);
                  }
                },

              })

            });

          }, 2000)
        } else if (resp.responseCode == 440) {
          $('.page-loader-wrapper').hide();
          swal("Error!", "Your session has been expired.", "error");
          this.router.navigate([""]);
        } else {
          $('.page-loader-wrapper').hide();
          swal(resp.errors[0]);
          return false;
        }
      }, error => {
        $('.page-loader-wrapper').hide();
        var error = JSON.parse(error._body).responseCode;
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }

      )
  }



  public pageChanged(event: any): void {

    console.log(event);

    this.pagenationnumber = event;
    sessionStorage.setItem('currentPageNo', this.pagenationnumber);
    this.preloader = true;
    $('.page-loader-wrapper').show();
    this.service.searchfunction(sessionStorage.getItem("login_sessionkey"), event, '20', 'closedTickets',
      'getTickets/AllTickets', sessionStorage.getItem("PagesearchsiteIds"), sessionStorage.getItem("pagecustomernumber"),
      sessionStorage.getItem("PageTicketnumber"), sessionStorage.getItem("startdate"), sessionStorage.getItem("enddate"), flatbooking_Id).then(resp => {
        this.loaderhideme = false;
        this.preloader = false;
        $('.page-loader-wrapper').hide();
        if (resp.responseCode == 200) {
          this.itemsPer_Page = resp.pageCount * 20;
          this.current_Page = event;
          this.totalItems = 20;
          this.total_tickets = resp.rowCount;
          localStorage.setItem('totalTickets', this.total_tickets);
          this.open_tickets = resp.open;
          localStorage.setItem('openTickets', this.open_tickets);
          this.total_inProgress = resp.inProgress;
          this.total_closed = resp.closed;
          localStorage.setItem('Closed', this.total_closed);
          this.ticketList = resp.ticketResponseList;
          this.searchhideme = true;
          setTimeout(function () {
            $(document).ready(function () {
              $('#tableExport').DataTable({
                pageLength: 10,
                lengthMenu: [[ 10, 20, -1], [ 10, 20, 'Todos']],
                dom: 'Bfrltip',
                buttons: [
                  'copy', 'csv', 'excel', 'print', {
                    extend: 'pdfHtml5',
                    orientation: 'landscape',
                    pageSize: 'LEGAL'
                  }
                ],

                columnDefs: [
                  { width: 20, targets: 0 },       
                 { width: 100, targets: 1 }
                  ],
                  fixedColumns: true,

                  
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

              })

            });

          }, 2000)
        } else if (resp.responseCode == 440) {
          swal("Error!", "Your session has been expired.", "error");
          this.router.navigate([""]);
        } else {
          $('.page-loader-wrapper').hide();
          swal(resp.errors[0]);
          return false;
        }
      }, error => {
        $('.page-loader-wrapper').hide();
        var error = JSON.parse(error._body).responseCode;
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      });
  }


  gotoTicketDetailspage(data) {
    console.log(controller_data);

    this.currentpagenumber = sessionStorage.getItem('currentPageNo');
    console.log(this.currentpagenumber);
    if (this.currentpagenumber == undefined) {
      this.currentpagenumber = JSON.stringify(1);
    }
    sessionStorage.setItem('currentPageNo', this.currentpagenumber);
    sessionStorage.setItem("common_for_flats", "view_closed_tickets");
    sessionStorage.setItem("from_Viewalltickets", "");
    this.viewticketData = JSON.stringify(data);
    this.ticketListtotaldata = JSON.stringify(this.ticketList);
    this.ticketListtotaldata = JSON.stringify(this.ticketList);
    //  sessionStorage.setItem("Totalticketdata", this.ticketListtotaldata);
    this.router.navigate(["ticket/ticketdetails"], { state: this.ticketList });
    sessionStorage.setItem('ticketdetails_view', this.viewticketData);
    sessionStorage.setItem("Totalticketdata", JSON.stringify(controller_data));
    sessionStorage.setItem('buttonstutus', '');
    sessionStorage.setItem("currentpageindex", JSON.stringify(this.current_Page));



  }






  customernamelist(siteid) {
    debugger;
    console.log(siteid)
    $('.page-loader-wrapper').show();
    var arr = localStorage.getItem('SiteIDS');
    let url = this.cmn.commonUrl + "references/searchCustomer.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {

      "customerName": null,
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "requestUrl": "CustomerFlatNo",
      "siteId": siteid[0]
    }

    console.log(JSON.stringify(body))
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

      console.log(JSON.stringify(resp))
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
        $("#customerID").val(sessionStorage.getItem("flatbookingId"));
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
}
