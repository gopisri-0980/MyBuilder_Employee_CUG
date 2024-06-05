import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { RequestOptions, Headers, Http } from '@angular/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
declare const swal: any;

declare const $: any;

@Component({
  selector: 'app-company-notificationlist',
  templateUrl: './company-notificationlist.component.html',
  styleUrls: ['./company-notificationlist.component.sass']
})
export class CompanyNotificationlistComponent implements OnInit {

  // tabledata: { "NotificationId": string; "applicantName": string; "project": string;"block": string;"cdate": string; }[];
  mybookingform: boolean;
  MrMrsMs: any;
  inputText: string;
  showLoadingIndicatior: boolean;
  genderInfo: string;
  // current_Page: number;
  // itemsPer_Page: number;
  // totalItems: number;
  searchText: any;
  tabledata_companyNotifications: Array<any> =[];
  current_Page_companyNotifications: number;
  totalItems_companyNotifications: number;
  itemsPer_Page_companyNotifications: number;
  device_val: any;
  fromdate_val: any;
  todate_val: any;
  state_val_array: any = [];
  isButtonClicked: string;
  constructor(private router: Router, private cmn: CommonComponent, private http: Http) {
    this.stateList();
    sessionStorage.setItem("nval", "4");
    this.inputText = "I am sample text";
    this.mybookingform = true;
    this.MrMrsMs = "Mr";
    this.genderInfo = "no";
    $('.page-loader-wrapper').hide();
    $('#noData').hide();
    setTimeout(function () {
      $('#noData').show();
    }, 5000)

    console.log("from date" + sessionStorage.getItem('session_fromDate'));
    console.log("to date" + sessionStorage.getItem('session_toDate'));



  }

  ngOnInit() {
    // $('#tableExport').DataTable();
    // this.companyNotificationList();

    var date = new Date().getMonth();
    var minimumdate = new Date().setMonth(date - 3);
    var maximumdate = new Date().setMonth(date + 3);

    $(function () {
      if (sessionStorage.getItem('session_fromDate') == null || sessionStorage.getItem('session_fromDate') == 'null') {
        $('#fromDate').val('');
      } else {
        $('#fromDate').val(sessionStorage.getItem('session_fromDate'));
      }

      if (sessionStorage.getItem('session_toDate') == null || sessionStorage.getItem('session_toDate') == 'null') {
        $('#toDate').val('');
      } else {
        $('#toDate').val(sessionStorage.getItem('session_toDate'));
      }

      if (sessionStorage.getItem('session_deviceID') == null || sessionStorage.getItem('session_deviceID') == 'null') {
        $('#deviceID').val('select');
      } else {
        $('#deviceID').val(sessionStorage.getItem('session_deviceID'));
      }

      // $('#fromDate').val(sessionStorage.getItem('session_fromDate'));
      // $('#toDate').val(sessionStorage.getItem('session_toDate'));
      // $('#stateID').val(sessionStorage.getItem('session_stateID'));
      // $('#deviceID').val(sessionStorage.getItem('session_deviceID'));

      // $('#fromDate').bootstrapMaterialDatePicker({
      //   format: 'YYYY-MM-DD',
      //   minDate: new Date(minimumdate),
      //   maxDate: new Date(maximumdate),
      //   clearButton: true,
      //   weekStart: 1,
      //   time: false
      // });

      // $('#toDate').bootstrapMaterialDatePicker({
      //   format: 'YYYY-MM-DD',
      //   minDate: new Date(minimumdate),
      //   maxDate: new Date(maximumdate),
      //   clearButton: true,
      //   weekStart: 1,
      //   time: false
      // });

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
    //alert(JSON.stringify(res));
    //alert(sessionStorage.setItem('response',JSON.stringify(res)))
    //  sessionStorage.setItem('session_fromDate',$('#fromDate').val());
    //  sessionStorage.setItem('session_toDate',$('#toDate').val());
    sessionStorage.setItem('response', JSON.stringify(res));
    sessionStorage.setItem("Totalticketdata1", JSON.stringify(this.tabledata_companyNotifications));
    sessionStorage.setItem('response', JSON.stringify(res));
    this.router.navigate(['viewand-approve-notifications']);
  }

  ngAfterViewInit() {
    this.isButtonClicked = sessionStorage.getItem('isBackButtonClicked');
    if (this.isButtonClicked == "true") {
      this.pageChanged(sessionStorage.getItem('session_pageNo'));
    } else {
      this.companynotificationList();
    }
    // $('#tableExport').DataTable();
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
    debugger;
    let url = this.cmn.commonUrl + "notification/getStateList.spring";
    console.log("url :" + url);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "osType": "Android",
    }
    console.log("getStateList body----------" + JSON.stringify(body));

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      console.log("state response----------" + JSON.stringify(resp));

      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        var Options = "";
        // $('#stateID').append('<option value="select">--Select State--</option>'); 

        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#stateID').append("<option value='" + resp.responseObjList[i].id + "'>" + resp.responseObjList[i].name + "</option>");
          // $('#stateID').formSelect();
        }
        if (sessionStorage.getItem('session_stateID') == null || sessionStorage.getItem('session_stateID') == 'null') {
          $('#stateID').val('select');
        } else {
          $('#stateID').val(sessionStorage.getItem('session_stateID'));
        }
        // $('#stateID').val(sessionStorage.getItem('session_stateID'));

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

    console.log($("#fromDate").val());
    console.log($("#toDate").val());



    if (($("#stateID").val() == "select" || $("#stateID").val() == null) && ($("#deviceID").val() == "select" || $("#deviceID").val() == null) && $("#fromDate").val() == "" && $("#toDate").val() == "") {
      swal("Please select state or Device or From date and To date");
      return false;
    }

    // if($("#fromDate").val() != "" && $("#toDate").val() == ""){
    //   swal("Please select To date");
    //   return false;
    // }

    // if($("#fromDate").val() == "" && $("#toDate").val() != ""){
    //   swal("Please select From date");
    //   return false;
    // }

    var stateval = $("#stateID").val();
    console.log("stateval :" + stateval);
    if (stateval == "select" || stateval == "0" || stateval == null) {
      this.state_val_array = null;
      sessionStorage.setItem('session_stateID', null);
    } else {
      sessionStorage.setItem('session_stateID', $('#stateID').val());
      this.state_val_array = [sessionStorage.getItem('session_stateID')]; //[$("#stateID").val()]
    }

    var deviceval = $("#deviceID").val();
    console.log("deviceval :" + deviceval);
    if (deviceval == "select" || deviceval == null) {
      this.device_val = null;
      sessionStorage.setItem('session_deviceID', null);
    } else {
      sessionStorage.setItem('session_deviceID', $('#deviceID').val());
      this.device_val = sessionStorage.getItem('session_deviceID'); //$("#deviceID").val();
    }

    var fromdateval = $("#fromDate").val();
    console.log("fromdateval :" + fromdateval);
    if (fromdateval == "") {
      this.fromdate_val = null;
      sessionStorage.setItem('session_fromDate', null);
    } else {
      sessionStorage.setItem('session_fromDate', $('#fromDate').val());
      this.fromdate_val = sessionStorage.getItem('session_fromDate'); //$('#fromDate').val();
    }

    var todateval = $("#toDate").val();
    console.log("todateval :" + todateval);
    if (todateval == "" && fromdateval == "") {
      this.todate_val = null;
      sessionStorage.setItem('session_toDate', null);
    } else if (fromdateval != "" && todateval == "") {
      sessionStorage.setItem('session_toDate', $('#fromDate').val());
      this.todate_val = sessionStorage.getItem('session_toDate'); //$('#toDate').val();
    } else {
      sessionStorage.setItem('session_toDate', $('#toDate').val());
      this.todate_val = sessionStorage.getItem('session_toDate'); //$('#toDate').val();
    }

    sessionStorage.setItem('session_pageNo', '1');
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "notification/companysNotifys.spring";

    console.log("url :" + url);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "osType": this.device_val,//"Android",
      "stateIds": this.state_val_array, //[1,2],
      "pageNo": sessionStorage.getItem('session_pageNo'),//"1",
      "startDate": this.fromdate_val, //"2020-04-13",
      "endDate": this.todate_val, //"2020-05-14",
      "pageSize": "10"
    }

    console.log(body);

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
     
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        this.itemsPer_Page_companyNotifications = resp.responseObjList.pagecount * 10;
        this.current_Page_companyNotifications = 1;
        this.totalItems_companyNotifications = 10;
        this.tabledata_companyNotifications = resp.responseObjList.notificationRequests;
     
        // setTimeout(function(){
        //   $('#tableExport').dataTable();
        //  },1000)
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
        //     var error=JSON.parse(error._body).responseCode;
        //   if(error == 440){
        //     swal("Your Session has been Timed Out!", "Please login once again.", "error");
        //     this.router.navigate([""]);
        //   }
      });
  }

  companynotificationList() {

    var stateval = $("#stateID").val();
    console.log("stateval :" + stateval);
    if (stateval == "select" && (sessionStorage.getItem('session_stateID') == "" || sessionStorage.getItem('session_stateID') == "null")) {
      this.state_val_array = null;
    } else if (stateval == "select" && sessionStorage.getItem('session_stateID') != "") {
      this.state_val_array = [sessionStorage.getItem('session_stateID')];
    } else {
    }

    var deviceval = $("#deviceID").val();
    console.log("deviceval :" + deviceval);
    if (deviceval == "select" && (sessionStorage.getItem('session_deviceID') == "" || sessionStorage.getItem('session_deviceID') == "null")) {
      this.device_val = null;
    } else if (deviceval == "select" && sessionStorage.getItem('session_deviceID') != "") {
      this.device_val = sessionStorage.getItem('session_deviceID');
    } else {
    }

    var fromdateval = $("#fromDate").val();
    console.log("fromdateval :" + fromdateval);
    if (fromdateval == "" && (sessionStorage.getItem('session_fromDate') == "" || sessionStorage.getItem('session_fromDate') == "null")) {
      this.fromdate_val = null;
    } else if (fromdateval == "" && sessionStorage.getItem('session_fromDate') != "") {
      this.fromdate_val = sessionStorage.getItem('session_fromDate');
    } else {
    }

    var todateval = $("#toDate").val();
    console.log("todateval :" + todateval);
    if (todateval == "" && (sessionStorage.getItem('session_toDate') == "" || sessionStorage.getItem('session_toDate') == "null")) {
      this.todate_val = null;
    } else if (todateval == "" && sessionStorage.getItem('session_toDate') != "") {
      this.todate_val = sessionStorage.getItem('session_toDate');
    } else {
    }

    sessionStorage.setItem('session_pageNo', '1');


    let url = this.cmn.commonUrl + "notification/companysNotifys.spring";

    console.log("url :" + url);
    $('.page-loader-wrapper').show();
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "osType": this.device_val,//"Android",
      "stateIds": this.state_val_array, //[1,2],
      "pageNo": sessionStorage.getItem('session_pageNo'), // "1",
      "startDate": this.fromdate_val, //"2020-04-13",
      "endDate": this.todate_val, //"2020-05-14",
      "pageSize": "10"
    }

 
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
   
      if (resp.responseCode == 200) {
        this.itemsPer_Page_companyNotifications = resp.responseObjList.pagecount * 10;
        this.current_Page_companyNotifications = 1;
        this.totalItems_companyNotifications = 10;
        this.tabledata_companyNotifications = resp.responseObjList.notificationRequests;
        // setTimeout(function(){
        //   $('#tableExport').dataTable();
        //  },1000)
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
        //     var error=JSON.parse(error._body).responseCode;
        //   if(error == 440){
        //     swal("Your Session has been Timed Out!", "Please login once again.", "error");
        //     this.router.navigate([""]);
        //   }
      });
  }

  public pageChanged(event: any): void {
    //this method will trigger every page click 


    // this.state_val_array = [sessionStorage.getItem('session_stateID')];
    // this.device_val = sessionStorage.getItem('session_deviceID');

    if (sessionStorage.getItem('session_fromDate') == null || sessionStorage.getItem('session_fromDate') == "" || sessionStorage.getItem('session_fromDate') == 'null') {
      this.fromdate_val = null;
    } else {
      this.fromdate_val = sessionStorage.getItem('session_fromDate');
    }

    if (sessionStorage.getItem('session_toDate') == null || sessionStorage.getItem('session_toDate') == "" || sessionStorage.getItem('session_toDate') == 'null') {
      this.todate_val = null;
    } else {
      this.todate_val = sessionStorage.getItem('session_toDate');
    }

    if (sessionStorage.getItem('session_stateID') == null || sessionStorage.getItem('session_stateID') == "" || sessionStorage.getItem('session_stateID') == 'null') {
      this.state_val_array = null;
    } else {
      this.state_val_array = [sessionStorage.getItem('session_stateID')];
    }

    if (sessionStorage.getItem('session_deviceID') == null || sessionStorage.getItem('session_deviceID') == "" || sessionStorage.getItem('session_deviceID') == 'null') {
      this.device_val = null;
    } else {
      this.device_val = sessionStorage.getItem('session_deviceID');
    }



    sessionStorage.setItem('session_pageNo', event);
    console.log('Number items per page: ' + event);

    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "notification/companysNotifys.spring";

    console.log("url :" + url);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "osType": this.device_val,//"Android",
      "stateIds": this.state_val_array, //[1,2],
      "pageNo": "" + sessionStorage.getItem('session_pageNo'), //event,
      "startDate": this.fromdate_val, //"2020-04-13",
      "endDate": this.todate_val, //"2020-05-14",
      "pageSize": "10"
      // "sessionKey": ""+sessionStorage.getItem("login_sessionkey"),
      // "osType" : "Android",
      // "pageNo":""+event,
      // "pageSize":"10"
    }
    console.log("----Page change companysNotifys body :" + JSON.stringify(body));
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      console.log("company notification list response----------" + JSON.stringify(resp));
      if (resp.responseCode == 200) {
        this.itemsPer_Page_companyNotifications = resp.responseObjList.pagecount * 10;
        this.current_Page_companyNotifications = event;
        this.totalItems_companyNotifications = 10;
        this.tabledata_companyNotifications = resp.responseObjList.notificationRequests;
        // setTimeout(function(){
        //   $('#tableExport').dataTable();
        //  },1000)
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

}
