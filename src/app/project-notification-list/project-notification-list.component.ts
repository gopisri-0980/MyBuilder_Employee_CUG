import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { RequestOptions, Headers, Http } from '@angular/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
declare const swal: any;

declare const $: any;
var site_idd_Notif;
var fromdatee
var todatee
var controller_data = [];
@Component({
  selector: 'app-project-notification-list',
  templateUrl: './project-notification-list.component.html',
  styleUrls: ['./project-notification-list.component.sass']
})
export class ProjectNotificationListComponent implements OnInit {
  fg: FormGroup;
  // tabledata: { "NotificationId": string; "applicantName": string; "project": string;"block": string;"cdate": string; }[];
  mybookingform: boolean;
  MrMrsMs: any;
  inputText: string;
  showLoadingIndicatior: boolean;
  genderInfo: string;
  itemsPer_Page: number;
  current_Page: number;
  totalItems: number;
  searchText: any;
  tabledata: any;
  constructor(private router: Router, private cmn: CommonComponent, private http: Http) {
    this.inputText = "I am sample text";
    this.mybookingform = true;
    this.MrMrsMs = "Mr";
    this.genderInfo = "no";
    $('.page-loader-wrapper').hide();
    this.siteList_temp()
    // this.projectNotificationList() 
    $('#noData').hide();
    setTimeout(function () {
      $('#noData').show();
    }, 5000)
    this.sitelist()
  }

  ngOnInit() {





    if (sessionStorage.getItem("enddate_notif") == "null") {

    } else {
      // $("#toDate").val(sessionStorage.getItem("enddate_notif"))
      $(function () {
        $("#toDate").val(sessionStorage.getItem("enddate_notif"))
      });

    }
    if (sessionStorage.getItem("startdate_notif") == "null") {
    } else {
      $(function () {
        $("#fromDate").val(sessionStorage.getItem("startdate_notif"))
      });
      // $("#fromDate").val(sessionStorage.getItem("startdate_notif"))
    }
    $(function () {

      $("#siteID").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });
    })
    this.fg = new FormGroup(
      {
        from: new FormControl(""),
        to: new FormControl("")
      },
      [Validators.required, this.dateRangeValidator]
    );
  }


  leadId(res) {
    //alert("---"+JSON.stringify(res));
    //alert(sessionStorage.setItem('response',JSON.stringify(res)))

    sessionStorage.setItem('response', JSON.stringify(res));
    sessionStorage.setItem("Totalticketdata1", JSON.stringify(controller_data));
    sessionStorage.setItem('response', JSON.stringify(res));

    this.router.navigate(['viewandapprovetwo']);


  }

  ngAfterViewInit() {
    //   this.projectNotificationList();
    $('.js-basic-example').DataTable({
      responsive: true
    });

    $('.save-stage').DataTable({
      "scrollX": true,
      stateSave: true
    });

    var t = $('#example3').DataTable({
      "scrollX": true
    });
    var counter = 1;

  }
  projectNotificationList() {
    $('.page-loader-wrapper').show();

    let url = this.cmn.commonUrl + "notification/sitesNotifys.spring";
    console.log("url :" + url);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "osType": "Android",
    }
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $("#tablecard").css("display", "block")
        this.itemsPer_Page = resp.responseObjList.pagecount * 10;
        this.current_Page = 1;
        this.totalItems = 10;
        this.tabledata = resp.responseObjList.siteLevelNotifyResponseDto;
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
                  controller_data.push(resp.responseObjList.siteLevelNotifyResponseDto[display[j]]);
                }
              },

            }).draw();

          });

        }, 2000)
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
        //  var error=JSON.parse(error._body).responseCode;
        //alert(error);
        $('.page-loader-wrapper').hide();
        // if(error == 440){
        //   swal("Your Session has been Timed Out!", "Please login once again.", "error");
        //   this.router.navigate([""]);
        // }
      }
    );
  }


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
        // alert(sessionStorage.getItem("site_idd_Notif"))
        if (sessionStorage.getItem("site_idd_Notif") == "" || sessionStorage.getItem("site_idd_Notif") == null || sessionStorage.getItem("site_idd_Notif") == "null") {
        } else {
          $("#siteID").val(sessionStorage.getItem("site_idd_Notif"));
          this.searchNotificationList_ses()

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

  searchNotificationList() {
    $('#tableExport').DataTable().destroy();
    var startdate_notif = $('#fromDate').val();
    var endDate = $('#toDate').val();
    if (new Date(startdate_notif) > new Date(endDate)) {
      swal('To Date should be greater than or equal to From Date');
      return false;
    }

    if ($("#siteID").val() == "select") {
      site_idd_Notif = null
    } else {
      site_idd_Notif = [$("#siteID").val()]
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

    if (site_idd_Notif == null && fromdatee == null && todatee == null) {
      swal("Please select any option to continue!");
      return false;
    }

    $(".page-loader-wrapper").show();

    let url = this.cmn.commonUrl + "notification/sitesNotifys.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "osType": "Android",
      "siteIds": site_idd_Notif,
      "startDate": fromdatee,
      "endDate": todatee,
    }

    console.log(url);
    console.log(body);


    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      console.log(resp);

      $(".page-loader-wrapper").hide();
      if (resp.responseCode == 200) {
        $("#tablecard").css("display", "block")

        this.tabledata = resp.responseObjList.siteLevelNotifyResponseDto;
        sessionStorage.setItem("site_idd_Notif", $("#siteID").val());
        sessionStorage.setItem("startdate_notif", fromdatee);
        sessionStorage.setItem("enddate_notif", endDate);
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
                  controller_data.push(resp.responseObjList.siteLevelNotifyResponseDto[display[j]]);
                }
              },


            }).draw();

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
  searchNotificationList_ses() {
    // }
    $("#tablecard").css("display", "block")
    //  $('#tableExport').DataTable().destroy();
    var startdate_notif = $('#fromDate').val();
    var endDate = $('#toDate').val();
    if (new Date(startdate_notif) > new Date(endDate)) {
      swal('To Date should be greater than or equal to From Date');
      return false;
    }


    // alert(mystaus_val)
    if (sessionStorage.getItem("site_idd_Notif") == "select") {
      site_idd_Notif = null
    } else {
      site_idd_Notif = [sessionStorage.getItem("site_idd_Notif")]
    }

    if (sessionStorage.getItem("startdate_notif") == "") {
      fromdatee = null;
    } else {
      fromdatee = sessionStorage.getItem("startdate_notif");
    }

    if (sessionStorage.getItem("enddate_notif") == "") {
      todatee = null;
    } else {
      todatee = sessionStorage.getItem("enddate_notif")
    }


    console.log(site_idd_Notif);
    console.log(fromdatee);
    console.log(todatee);

    if (site_idd_Notif == null && fromdatee == null && todatee == null) {
      swal("Please select any option to continue!");
      return false;
    }

    if (fromdatee == "null") {
      fromdatee = null;
    }

    if (todatee == "null") {
      todatee = null;
    }

    $(".page-loader-wrapper").show();

    let url = this.cmn.commonUrl + "notification/sitesNotifys.spring";
    //http://localhost:9999/SumadhuraGateway/employeeservice/notification/sitesNotifys.spring
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "osType": "Android",
      "siteIds": site_idd_Notif,
      "startDate": fromdatee,
      "endDate": todatee

    }
    console.log(JSON.stringify(body))
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

      console.log(JSON.stringify(resp));
      $(".page-loader-wrapper").hide();
      if (resp.responseCode == 200) {


        this.tabledata = resp.responseObjList.siteLevelNotifyResponseDto;
        sessionStorage.setItem("site_idd_Notif", $("#siteID").val());
        sessionStorage.setItem("startdate_notif", fromdatee);
        sessionStorage.setItem("enddate_notif", endDate);

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
                  controller_data.push(resp.responseObjList.siteLevelNotifyResponseDto[display[j]]);
                }
              },


            })

          });

        }, 2000)

      } else if (resp.responseCode == 700) {
        swal("Error!", "Your session has been expired.", "error");
        this.router.navigate(['']);
      } else if (resp.responseCode == 440) {
        swal("Error!", "Your session has been expired.", "error");
        this.router.navigate([""]);
      }
    },
      error => {
        $(".page-loader-wrapper").hide();
        // swal("Error!", "Internal server error.", "error");
        //  var error = JSON.parse(error._body).responseCode;
        //alert(error);
        $('.page-loader-wrapper').hide();
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }
  getToday(): string {
    return new Date().toISOString().split('T')[0]
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

  startdatefun() {
    $("#fromDate").val("");
  }

  endtimefun() {
    $("#toDate").val("");
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
