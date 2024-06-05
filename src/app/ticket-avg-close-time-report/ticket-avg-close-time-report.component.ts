import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router, NavigationExtras, RoutesRecognized } from "@angular/router";
import { CommonComponent } from '../common/common.component';
import { ConfirmDialogService } from '../dailogbox/confirm-dialog.service';

import { FormGroup, FormBuilder, Validator, FormControl, Validators, ValidatorFn } from '@angular/forms';
var fromDate;
var toDate;
declare const $: any;
declare const swal: any;
var grandtotal = 0;
var totaltransactionAmount = 0;
var totalnooftickets = 0;
var opentickets = 0;
var closedinoneday = 0;
var closedintwodays = 0;
var closedinthreedays = 0;
var closedinfourdays = 0;
var escalation_tickets = 0;
var no_ofticketsreopen = 0;
var Categorydeptno;
var selected_projectid;
var site_name;
var siteIDvalue = [];
var states_selection;
@Component({
  selector: 'app-ticket-avg-close-time-report',
  templateUrl: './ticket-avg-close-time-report.component.html',
  styleUrls: ['./ticket-avg-close-time-report.component.sass']
})
export class TicketAvgCloseTimeReportComponent implements OnInit {
  controller: Array<any> = [];
  project_wise_project: Array<any> = [];
  controller_data: Array<any> = [];
  Total_controller: Array<any> = [];
  total_main_controller: Array<any> = [];
  ticketTypeWiseReports: any;
  sumOfSiteOpenT: number;
  sumOfSiteClosedT: number;
  fg: FormGroup;
  fromreport: string;
  toreport: string;
  startdateDatavalue: any;
  enddateDatavalue: any;
  userForm: FormGroup;
  Family_Status: Array<any> = [];

  singledd8 = {};
  title6: any;
  Projected_wise_data : Array<any> =[];
  main_states_selection:  Array<any> =[];

  constructor(private cmn: CommonComponent, private http: Http,
    private router: Router, public fb: FormBuilder,
    private confirmDialogService: ConfirmDialogService,) {


    this.singledd8 = {
      singleSelection: false,
      enableSearchFilter: true,
      searchPlaceholderText: 'Search',
      classes: 'my_dropdown1',
      unSelectAllText: 'UnSelect All',
      // lazyLoading: true,
    };

    $('.page-loader-wrapper').hide();
    this.completedTransactions_default('default');
  
    this.statusdropdown();
    this.siteList(null);
  }

  ngOnInit() {

    this.Family_Status = [
      {
        status_name: 'Single',
        status_id: '1'
      },
      {
        status_name: 'Married',
        status_id: '2'
      }, {
        status_name: 'Married with Kid / kids',
        status_id: '3'
      }
    ];

    this.Family_Status.forEach((o: any, i) => (o.id = o.status_id));



    this.userForm = this.fb.group({
      Family_status: [''],

    });
    this.fg = new FormGroup(
      {
        from: new FormControl(""),
        to: new FormControl("")
      },
      [Validators.required, this.dateRangeValidator],

    );

    var self = this;
    $(function () {
   
      $("#projectID").select2({
        placeholder: "--Select--",
        dir: "ltl",
      });

      $("#StatesID").select2({
        placeholder: "--Select--",
        dir: "ltl",
      });



      $("#Category").select2({
        placeholder: "--Select--",
        dir: "ltl",
      });

     
      $('#StatesID').change(function (e) {
        
        states_selection = $(e.target).val();
        console.log(states_selection);
        if (states_selection == "select") {
          self.siteList(null);
          this.Projected_wise_data = [];
        } else {
          this.Projected_wise_data = [];
          states_selection = e.target.value;
   
          self.siteList(states_selection);
        }
      })




      $('#projectID').change(function (e) {
        selected_projectid = $(e.target).val();
        site_name = $('#projectID').select2('data')[0].text

        if (selected_projectid == "select") {

          this.Bank_Account_Number("");
        } else {
          siteIDvalue = selected_projectid;
          console.log(selected_projectid);
      
      
       

        }
      })


      $('#Category').change(function (e) {
        Categorydeptno = $(e.target).val();
        if (Categorydeptno == "select") {
        } else {
          Categorydeptno = e.target.value;
          console.log(e.target.value);
        }
      })


    

      

    });


  }

  selectedSIDs(item: any) {
    this.Projected_wise_data = [];
    for (var i = 0; i < this.title6.length; i++) {
      this.Projected_wise_data.push(this.title6[i].id);
      console.log(this.Projected_wise_data);
    }
  }

  onSelectAll(item :any){
    this.Projected_wise_data = [];
    for (var i = 0; i < this.title6.length; i++) {
      this.Projected_wise_data.push(this.title6[i].id);
      console.log(this.Projected_wise_data);
    }
  }

  onItemDeSelect(item: any) {
    this.Projected_wise_data = [];
    for (var i = 0; i < this.title6.length; i++) {
      this.Projected_wise_data.push(this.title6[i].id);
      console.log(this.Projected_wise_data);
    }
  }


 

  onDeSelectAll(item: any){
    this.Projected_wise_data = [];
   
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


 
  /*-----------------Getting Project(site) list Start---------------------*/
  siteList(ids) {

    console.log(ids);

   
    var sitIDS
    if (ids == 0 || ids == null) {
      sitIDS = null
    } else {
      sitIDS = [ids]
    }


    var arr = localStorage.getItem('SiteIDS');
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "site/getStateWiseSites.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": sessionStorage.getItem("login_sessionkey"),
      "ids": sitIDS
    }
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      console.log(resp);
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#projectID').html("");

        this.project_wise_project = resp.responseObjList;
        this.project_wise_project.forEach((o: any, i) => (o.id = o.id));

        this.userForm.reset();
        this.Projected_wise_data = [];

        // for (var i = 0; i < resp.responseObjList.length; i++) {
        //   $('#projectID').append("<option value='" + resp.responseObjList[i].id + "'>" + resp.responseObjList[i].name + "</option>");
        // }

        // if (sessionStorage.getItem("sitenamevalue") == null || sessionStorage.getItem("sitenamevalue") == "null") {

        // } else {
        //   $('#projectID').val(sessionStorage.getItem("sitenamevalue"));
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
  /*-----------------Getting Project(site) list End---------------------*/



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


  startdatefun() {
    $("#fromDate").val("");
  }

  enddatefun() {
    $("#toDate").val("");
  }


  homeClick() {
    this.router.navigateByUrl("Ticketing-Dashboard");
  }
  searchAllServices(action) {


  

    // if (this.Projected_wise_data.length == 0) {
    //   swal('Please select project name');
    //   return false;
    // }




    if ($('#fromDate').val() == '' && $('#toDate').val() == '') {
      swal('Please select from date (or) to date');
      return false;
    }

    var startdate = $('#fromDate').val();
    var endDate = $('#toDate').val();
    if (new Date(startdate) > new Date(endDate)) {
      swal('Please select  a valid from and to date');
      return false;
    }

    this.completedTransactions_default(action);

  }



  completedTransactions_default(action) {

    console.log($('#fromDate').val());
    console.log( $('#toDate').val());

    console.log(selected_projectid);
    if (action == 'submitClick') {

      console.log(selected_projectid);
      // if (this.Projected_wise_data.length == 0) {
      //   swal('Please select project name');
      //   return false;
      // }


      if ($('#fromDate').val() == '' && $('#toDate').val() == '') {
        swal('Please select from date (or) to date');
        return false;
      }
    }
    
    if ($('#fromDate').val() != undefined || $('#toDate').val() != undefined) {
      fromDate = $('#fromDate').val();
      toDate = $('#toDate').val();
      if (fromDate == '' || fromDate == undefined) {
        fromDate = null;
      } else if (toDate == '' || toDate == undefined) {
        toDate = null;
      } else {
        fromDate = $('#fromDate').val();
        toDate = $('#toDate').val();
      }
    } else {
      this.setDate();
    }

    var d = new Date(fromDate);
    var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
      d.getFullYear();

    if (datestring == "01-01-1970") {
      this.fromreport = " - ";
    } else {
      this.fromreport = datestring;
    }


    var d1 = new Date(toDate);
    var datestring1 = ("0" + d1.getDate()).slice(-2) + "-" + ("0" + (d1.getMonth() + 1)).slice(-2) + "-" +
      d1.getFullYear();

    if (datestring1 == "01-01-1970") {
      this.toreport = "-";
    } else {
      this.toreport = datestring1;
    }

    if (toDate == "") {
      toDate = null;
    }



    console.log(selected_projectid);
    console.log(Categorydeptno);

    if (selected_projectid == undefined) {
      selected_projectid = null;
    }

    if (Categorydeptno == undefined || Categorydeptno == null) {
      Categorydeptno = null;
    }

    if(states_selection == undefined || states_selection == "select"){
      this.main_states_selection = [];
    } else {
      this.main_states_selection = [states_selection];
    }

    if($('#fromDate').val() == undefined || $('#fromDate').val() == "undefined" || $('#fromDate').val() == "" || $('#fromDate').val() == null){
      fromDate = null;
    }

    if($('#toDate').val() == undefined || $('#toDate').val() == "undefined" || $('#toDate').val() == "" || $('#toDate').val() == null){
      toDate = null;
    }


    console.log(fromDate);
    console.log(toDate);

    $('.page-loader-wrapper').show();
    $('#Alltickettypes').DataTable().destroy();


    let url = this.cmn.commonUrl + "ticketreport/getProjectWiseClosedTicketCount.spring"
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "startDate": fromDate,
      "endDate": toDate,
      "requestUrl": Categorydeptno,
      "siteIds": this.Projected_wise_data,
      "stateids":this.main_states_selection

    }
    
    console.log(url);
    console.log(JSON.stringify(body));
    console.log(body);
   

 
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      console.log(resp);
      this.controller = [];
      this.controller_data = [];
      this.Total_controller = [];
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        this.controller_data.push("Ticket Type");
        this.Total_controller.push("", "Total");

        this.startdateDatavalue = resp.startDate;
        this.enddateDatavalue = resp.endDate;


        this.controller = resp.ticketReportingResponces[0].ticketReportingPojos;
        setTimeout(function () {
          $(document).ready(function () {
            $('#Alltickettypes').DataTable({
              pageLength: 10,
              lengthMenu: [[10, 20, -1], [10, 20, 'Todos']],
              dom: 'Bfrltip',
              buttons: [
                'copy', 'csv', 'print', {
                  extend: 'pdfHtml5',
                  orientation: 'landscape',
                  pageSize: 'LEGAL',
                  footer: true,
                },
                { extend: 'excelHtml5', footer: true },
              ],

              retrieve: true,

              "scrollCollapse": true,

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
                console.log(row);
                console.log(data);
                console.log(start);
                console.log(end);
                console.log(display);

                totalnooftickets = 0;
                opentickets = 0;
                closedinoneday = 0;
                closedintwodays = 0;
                closedinthreedays = 0;
                closedinfourdays = 0;
                escalation_tickets = 0;
                no_ofticketsreopen = 0;

                if (display.length == 0) {
                  const fmt = require('indian-number-format');
                  $('#Total_num_of_tickets').html(fmt.format(Number(totalnooftickets.toFixed(2))));
                  $('#Open_tickets').html(fmt.format(Number(opentickets.toFixed(2))));


                  

                  $('#closedinoneday').html(fmt.format(Number(closedinoneday.toFixed(2))));
                  $('#closedintwodays').html(fmt.format(Number(closedintwodays.toFixed(2))));
                  $('#closedinthreedays').html(fmt.format(Number(closedinthreedays.toFixed(2))));    
                  $('#closedinfourdays').html(fmt.format(Number(closedinfourdays.toFixed(2))));
                  $('#escalation_tickets').html(fmt.format(Number(escalation_tickets.toFixed(2))));
                  $('#no_ofticketsreopen').html(fmt.format(Number(no_ofticketsreopen.toFixed(2))));
                }

                for (var j = 0; j < display.length; j++) {
                  console.log(data[display[j]][2]);
                  totalnooftickets += parseFloat(data[display[j]][2]);
                  opentickets +=  parseFloat(data[display[j]][3]);
                  closedinoneday += parseFloat(data[display[j]][4]);
                  closedintwodays += parseFloat(data[display[j]][5]);
                  closedinthreedays += parseFloat(data[display[j]][6]);
                  closedinfourdays += parseFloat(data[display[j]][7]);
                  escalation_tickets += parseFloat(data[display[j]][8]);
                  no_ofticketsreopen += parseFloat(data[display[j]][9]);




                  const fmt = require('indian-number-format');


                  $('#Total_num_of_tickets').html(fmt.format(Number(totalnooftickets.toFixed(2))));

                  $('#Open_tickets').html(fmt.format(Number(opentickets.toFixed(2))));


                  $('#closedinoneday').html(fmt.format(Number(closedinoneday.toFixed(2))));
                  $('#closedintwodays').html(fmt.format(Number(closedintwodays.toFixed(2))));
                  $('#closedinthreedays').html(fmt.format(Number(closedinthreedays.toFixed(2))));
                  $('#closedinfourdays').html(fmt.format(Number(closedinfourdays.toFixed(2))));
                  $('#escalation_tickets').html(fmt.format(Number(escalation_tickets.toFixed(2))));
                  $('#no_ofticketsreopen').html(fmt.format(Number(no_ofticketsreopen.toFixed(2))));
                }


              }

            });
          });
        }, 1000)

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



  statusdropdown() {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/getStates.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),

    }

    this.http.post(url, body).map(res => res.json()).subscribe(resp => {

      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#StatesID').html("");
        $('#StatesID').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#StatesID').append("<option value='" + resp.responseObjList[i].stateId + "'>" + resp.responseObjList[i].stateName + "</option>");
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
        //alert(error);
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }


}