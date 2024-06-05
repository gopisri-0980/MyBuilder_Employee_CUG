import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { RequestOptions, Headers, Http } from '@angular/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
declare const swal: any;
declare const $: any;

@Component({
  selector: 'app-all-company-notificationslist',
  templateUrl: './all-company-notificationslist.component.html',
  styleUrls: ['./all-company-notificationslist.component.sass']
})
export class AllCompanyNotificationslistComponent implements OnInit {
  mybookingform: boolean;
  MrMrsMs: any;
  inputText: string;
  showLoadingIndicatior: boolean;
  genderInfo: string;
  searchText: any;
  tabledata_companyNotifications: any;
  current_Page_companyNotifications: number;
  totalItems_companyNotifications: number;
  itemsPer_Page_companyNotifications: number;
  device_val: any;
  fromdate_val: any;
  todate_val: any;
  state_val_array: any = [];
  isButtonClicked: string;
  notType_val_array: any = [];
  showMore = false;
  notificationId: string;
  constructor(private router: Router, private cmn: CommonComponent, private http: Http) {
    console.log("from date" + sessionStorage.getItem('sessionAll_fromDate'));
    console.log("to date" + sessionStorage.getItem('sessionAll_toDate'));
  }

  ngOnInit() {
    sessionStorage.removeItem("notificationId");
    var date = new Date().getMonth();
    var minimumdate = new Date().setMonth(date - 3);
    var maximumdate = new Date().setMonth(date + 3);

    $(function () {
      if (sessionStorage.getItem('sessionAll_notificationType') == null || sessionStorage.getItem('sessionAll_notificationType') == 'null') {
        $('#notificationTypeID').val('select');
      } else {
        $('#notificationTypeID').val(sessionStorage.getItem('sessionAll_notificationType'));
      }

      if (sessionStorage.getItem('sessionAll_fromDate') == null || sessionStorage.getItem('sessionAll_fromDate') == 'null') {
        $('#fromDate').val('');
      } else {
        $('#fromDate').val(sessionStorage.getItem('sessionAll_fromDate'));
      }

      if (sessionStorage.getItem('sessionAll_toDate') == null || sessionStorage.getItem('sessionAll_toDate') == 'null') {
        $('#toDate').val('');
      } else {
        $('#toDate').val(sessionStorage.getItem('sessionAll_toDate'));
      }

      if (sessionStorage.getItem('sessionAll_deviceID') == null || sessionStorage.getItem('sessionAll_deviceID') == 'null') {
        $('#deviceID').val('select');
      } else {
        $('#deviceID').val(sessionStorage.getItem('sessionAll_deviceID'));
      }

      $("#notificationTypeID").select2({
        placeholder: "--Select Type--",
        dir: "ltl"
      });

      $('#fromDate').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
        maxDate: new Date(),
        clearButton: true,
        weekStart: 1,
        time: false
      });

      $('#toDate').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
        maxDate: new Date(),
        clearButton: true,
        weekStart: 1,
        time: false
      });

      $("#stateID").select2({
        placeholder: "--Select State--",
        dir: "ltl"
      });

      $("#deviceID").select2({
        placeholder: "--Select Device--",
        dir: "ltl"
      });

    });


  }
  leadId(res) {
    sessionStorage.setItem('response', JSON.stringify(res));
    this.router.navigate(['View-All-Notification-Details']);
  }

  ngAfterViewInit() {
    this.isButtonClicked = sessionStorage.getItem('isBackButtonClickedAll');
    this.notificationId =  sessionStorage.getItem("notificationId");
    
    if (this.isButtonClicked == "true") {
      sessionStorage.removeItem("notificationId");
      this.companynotificationList();
    } else if(this.notificationId == "undefined" || this.notificationId == null){
      
      this.companynotificationList();
    }
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

  stateList() {
    let url = this.cmn.commonUrl + "notification/getStateList.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "osType": "Android",
    }
  
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        var Options = "";
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#stateID').append("<option value='" + resp.responseObjList[i].id + "'>" + resp.responseObjList[i].name + "</option>");
        }
        if (sessionStorage.getItem('sessionAll_stateID') == null || sessionStorage.getItem('sessionAll_stateID') == 'null') {
          $('#stateID').val('select');
        } else {
          $('#stateID').val(sessionStorage.getItem('sessionAll_stateID'));
        }
    

      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        sessionStorage.clear();
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

  searchCompanynotificationList() {
    $('#tableExport').DataTable().destroy();
    if (($("#notificationTypeID").val() == "select" || $("#notificationTypeID").val() == null) && ($("#stateID").val() == "select" || $("#stateID").val() == null) && ($("#deviceID").val() == "select" || $("#deviceID").val() == null) && $("#fromDate").val() == "" && $("#toDate").val() == "") {
      swal("Please select Notification type or State or Device or From date or To date");
      return false;
    }

    var notTypeval = $("#notificationTypeID").val();
    if (notTypeval == "select" || notTypeval == null) {
      this.notType_val_array = ["All"];
      sessionStorage.setItem('sessionAll_notificationType', 'All');
    } else {
      sessionStorage.setItem('sessionAll_notificationType', $('#notificationTypeID').val());
      this.notType_val_array = [sessionStorage.getItem('sessionAll_notificationType')];
    }

    var stateval = $("#stateID").val();
    if (stateval == "select" || stateval == "0" || stateval == null) {
      this.state_val_array = null;
      sessionStorage.setItem('sessionAll_stateID', null);
    } else {
      sessionStorage.setItem('sessionAll_stateID', $('#stateID').val());
      this.state_val_array = [sessionStorage.getItem('sessionAll_stateID')];
    }

    var deviceval = $("#deviceID").val();
    if (deviceval == "select" || deviceval == null) {
      this.device_val = null;
      sessionStorage.setItem('sessionAll_deviceID', null);
    } else {
      sessionStorage.setItem('sessionAll_deviceID', $('#deviceID').val());
      this.device_val = sessionStorage.getItem('sessionAll_deviceID');
    }

    var fromdateval = $("#fromDate").val();
    if (fromdateval == "") {
      this.fromdate_val = null;
      sessionStorage.setItem('sessionAll_fromDate', null);
    } else {
      sessionStorage.setItem('sessionAll_fromDate', $('#fromDate').val());
      this.fromdate_val = sessionStorage.getItem('sessionAll_fromDate');
    }

    var todateval = $("#toDate").val();
    if (todateval == "" && fromdateval == "") {
      this.todate_val = null;
      sessionStorage.setItem('sessionAll_toDate', null);
    } else if (fromdateval != "" && todateval == "") {
      sessionStorage.setItem('sessionAll_toDate', $('#fromDate').val());
      this.todate_val = sessionStorage.getItem('sessionAll_toDate');
    } else {
      sessionStorage.setItem('sessionAll_toDate', $('#toDate').val());
      this.todate_val = sessionStorage.getItem('sessionAll_toDate');
    }

    sessionStorage.setItem('sessionAll_pageNo', '1');
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "notification/nonCustomerAndCompanyNotifications.spring";

  

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "types": this.notType_val_array, 
      "osType": this.device_val,
      "stateIds": this.state_val_array, 
      "startDate": this.fromdate_val,
      "endDate": this.todate_val,
      
    }

    console.log(url);
    console.log(JSON.stringify(body));


    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      console.log(resp);
      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 200) {
        sessionStorage.setItem('sessionAll_fromDate', $('#fromDate').val());
        sessionStorage.setItem('sessionAll_toDate', $('#toDate').val());
        this.itemsPer_Page_companyNotifications = resp.responseObjList.pagecount * 10;
        this.current_Page_companyNotifications = 1;
        this.totalItems_companyNotifications = 10;
        this.tabledata_companyNotifications = resp.responseObjList.notificationRequests;
        setTimeout(function () {
          $(document).ready(function () {
            $('#tableExport').DataTable({
              pageLength: 5,
              lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todos']],
              dom: 'Bfrltip',
              buttons: [
                'copy', 'csv', 'excel', 'print' , {
                  extend : 'pdfHtml5',
                  title : function() {
                      return "ABCDE List";
                  },
                  orientation : 'landscape',
                  pageSize : 'A1', 
                  text : '<i class="fa fa-file-pdf-o"> PDF</i>',
                  titleAttr : 'PDF'
                  },
                  
              ],
              retrieve: true,
              "scrollY": true,
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


            }).draw();
          });
        }, 2000)
      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        sessionStorage.clear();
        this.router.navigate([""]);
      } else {
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
      }
    },
      error => {
        $('.page-loader-wrapper').hide()
       
      });
  }

  companynotificationList() {
    console.log("its working");
    
    $('.page-loader-wrapper').show();
    var notTypeval = $("#notificationTypeID").val();
    if (notTypeval == "select" && (sessionStorage.getItem('sessionAll_notificationType') == "" || sessionStorage.getItem('sessionAll_notificationType') == "null")) {
      this.notType_val_array = ["All"];
    } else {
      this.notType_val_array = [sessionStorage.getItem('sessionAll_notificationType')];
    }

    var stateval = $("#stateID").val();
    if (stateval == "select" && (sessionStorage.getItem('sessionAll_stateID') == "" || sessionStorage.getItem('sessionAll_stateID') == "null")) {
      this.state_val_array = null;
    } else if (stateval == "select" && sessionStorage.getItem('sessionAll_stateID') != "") {
      this.state_val_array = [sessionStorage.getItem('sessionAll_stateID')];
    } else {
    }

    var deviceval = $("#deviceID").val();
    if (deviceval == "select" && (sessionStorage.getItem('sessionAll_deviceID') == "" || sessionStorage.getItem('sessionAll_deviceID') == "null")) {
      this.device_val = null;
    } else if (deviceval == "select" && sessionStorage.getItem('sessionAll_deviceID') != "") {
      this.device_val = sessionStorage.getItem('sessionAll_deviceID');
    } else {
    }

    var fromdateval = $("#fromDate").val();
    if (fromdateval == "" && (sessionStorage.getItem('sessionAll_fromDate') == "" || sessionStorage.getItem('sessionAll_fromDate') == "null")) {
      this.fromdate_val = null;
    } else if (fromdateval == "" && sessionStorage.getItem('sessionAll_fromDate') != "") {
      this.fromdate_val = sessionStorage.getItem('sessionAll_fromDate');

    } else {
    }

    var todateval = $("#toDate").val();
    if (todateval == "" && (sessionStorage.getItem('sessionAll_toDate') == "" || sessionStorage.getItem('sessionAll_fromDate') == "null")) {
      this.todate_val = null;
    } else if (todateval == "" && sessionStorage.getItem('sessionAll_toDate') != "") {
      this.todate_val = sessionStorage.getItem('sessionAll_toDate');
    } else {
    }

    sessionStorage.setItem('sessionAll_pageNo', '1');

    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "notification/nonCustomerAndCompanyNotifications.spring";



    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "types": this.notType_val_array,
      "osType": this.device_val,
      "stateIds": this.state_val_array, 
      "startDate": this.fromdate_val,
      "endDate": this.todate_val,
    }

    console.log(body);
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      console.log(resp);
      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 200) {
        this.itemsPer_Page_companyNotifications = resp.responseObjList.pagecount * 10;
        this.current_Page_companyNotifications = 1;
        this.totalItems_companyNotifications = 10;
        this.tabledata_companyNotifications = resp.responseObjList.notificationRequests;
        setTimeout(function () {
          $(document).ready(function () {
            $('#tableExport').DataTable({
              pageLength: 10,
              lengthMenu: [[10, 20, -1], [10, 20, 'Todos']],
              dom: 'Bfrltip',
              buttons: [
                'copy', 'csv', 'excel', 'print' , {
                  extend : 'pdfHtml5',
                  title : function() {
                      return "ABCDE List";
                  },
                  orientation : 'landscape',
                  pageSize : 'A1', 
                  text : '<i class="fa fa-file-pdf-o"> PDF</i>',
                  titleAttr : 'PDF'
                  },
                  
              ],
              retrieve: true,
              "scrollY": true,
              "scrollX": true,
              "autoWidth": false,
              "fnStateSave": function (oSettings, oData) {
                localStorage.setItem('offersDataTables', JSON.stringify(oData));
              },
              "fnStateLoad": function (oSettings) {
                return JSON.parse(localStorage.getItem('offersDataTables'));
              },


            });
          });
        }, 2000)
        this.stateList()
      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        sessionStorage.clear();
        this.router.navigate([""]);
      } else {
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
      }
    },
      error => {
        $('.page-loader-wrapper').hide()
      });
  }

  public pageChanged(event: any): void {

    if (sessionStorage.getItem('sessionAll_notificationType') == null || sessionStorage.getItem('sessionAll_notificationType') == "" || sessionStorage.getItem('sessionAll_notificationType') == 'null') {
      this.notType_val_array = ["All"];
    } else {
      this.notType_val_array = [sessionStorage.getItem('sessionAll_notificationType')];
    }

    if (sessionStorage.getItem('sessionAll_fromDate') == null || sessionStorage.getItem('sessionAll_fromDate') == "" || sessionStorage.getItem('sessionAll_fromDate') == 'null') {
      this.fromdate_val = null;
    } else {
      this.fromdate_val = sessionStorage.getItem('sessionAll_fromDate');
    }

    if (sessionStorage.getItem('sessionAll_toDate') == null || sessionStorage.getItem('sessionAll_toDate') == "" || sessionStorage.getItem('sessionAll_toDate') == 'null') {
      this.todate_val = null;
    } else {
      this.todate_val = sessionStorage.getItem('sessionAll_toDate');
    }

    if (sessionStorage.getItem('sessionAll_stateID') == null || sessionStorage.getItem('sessionAll_stateID') == "" || sessionStorage.getItem('sessionAll_stateID') == 'null') {
      this.state_val_array = null;
    } else {
      this.state_val_array = [sessionStorage.getItem('sessionAll_stateID')];
    }

    if (sessionStorage.getItem('sessionAll_deviceID') == null || sessionStorage.getItem('sessionAll_deviceID') == "" || sessionStorage.getItem('sessionAll_deviceID') == 'null') {
      this.device_val = null;
    } else {
      this.device_val = sessionStorage.getItem('sessionAll_deviceID');
    }


    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "notification/nonCustomerAndCompanyNotifications.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "types": this.notType_val_array, 
      "osType": this.device_val,
      "stateIds": this.state_val_array,
      "pageNo": "" + sessionStorage.getItem('sessionAll_pageNo'),
      "startDate": this.fromdate_val,
      "endDate": this.todate_val,
      "pageSize": "10"
     
    }
   
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
   
      if (resp.responseCode == 200) {
        this.itemsPer_Page_companyNotifications = resp.responseObjList.pagecount * 10;
        this.current_Page_companyNotifications = event;
        this.totalItems_companyNotifications = 10;
        this.tabledata_companyNotifications = resp.responseObjList.notificationRequests;
        setTimeout(function () {
          $(document).ready(function () {
            $('#tableExport').DataTable({
              pageLength: 5,
              lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todos']],
              dom: 'Bfrltip',
              buttons: [
                'copy', 'csv', 'excel', 'print' , {
                  extend : 'pdfHtml5',
                  title : function() {
                      return "ABCDE List";
                  },
                  orientation : 'landscape',
                  pageSize : 'A1',
                  text : '<i class="fa fa-file-pdf-o"> PDF</i>',
                  titleAttr : 'PDF'
                  },
                  
              ],
              retrieve: true,
              "scrollY": true,
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


            });
          });
        }, 2000)
    
      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        sessionStorage.clear();
        this.router.navigate([""]);
      } else {
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
      }
    },
      error => {
        $('.page-loader-wrapper').hide()
        var error = JSON.parse(error._body).responseCode;
        //alert(error);

        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
        console.log(error);
      }
    );
  }

  homeClick() {
    this.cmn.commonHomeNavigation();
  }
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
  
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {


      if (resp.responseCode == 200) {
        $(function () {
          setTimeout(function () {
            $('.page-loader-wrapper').hide();
          }, 5000)
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
