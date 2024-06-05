import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { Http, Headers, RequestOptions, Jsonp } from '@angular/http';
declare const $: any;
declare const swal: any;
import { FormGroup, FormBuilder, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { Router, NavigationExtras, RoutesRecognized } from "@angular/router";
import { filter, pairwise } from 'rxjs/operators';
import * as moment from 'moment';

var selected_projectid;
var site_name;
var selected_flatid;
var temp2_forhideingbuttons;
var selected_blockid;
var flatbooking_Id;
var flatId_Id;
var totaltransactionAmount;
var totalrecept_transactionamount;
var finally_transaction_amount;
var finally_interest_waiver_amount;
var transactiontypeval;
var transactiontypeId;
var statusId;
var customerId_flat;
var selected_bookingstatusID;
var controller_data = [];

var Transaction_Mode_back;
@Component({
  selector: 'app-completed-transactions',
  templateUrl: './completed-transactions.component.html',
  styleUrls: ['./completed-transactions.component.sass']
})
export class CompletedTransactionsComponent implements OnInit {
  milestonedemand_table: any;
  viewTransactionData: string;
  controller: Array<any> = [];
  fromdatevalue: any;
  todatevalue: any;

  fg: FormGroup;
  flatIdIDval: any;
  selected_projectid = [];
  selected_blockid = [];
  flatbooking_Id = [];
  flatId_Id: Array<any> = [];
  previousUrl: string;
  currentUrl: string;
  flatsitewise: string;
  fromdatevaluename: any;
  todatevaluename: any;
  fromdatevalue2: any;
  fromdatevaluename2: any;
  todatevalue2: any;
  todatevaluename2: any;
  view_clreared_transaction_data: any;
  Clear_from_Date_value: any;
  Clear_to_Date_value: any;

  sessinstatus: any = [];
  controler_main: any;
  selected_projectid_value: Array<any> = [];
  selected_Flat_id_value: Array<any> = [];
  selected_flatbooking_Id_value: Array<any> = [];
  selected_booking_status_value: Array<any> = [];
  booking_status: Array<any> = [];

  multi_controller: Array<any> = [];
  controller_hun: any;
  controller_res: Array<any> = [];
  viewselected: boolean;
  transactionReceiveDate: any;
  deptId : any;
  roleId ; any;
  sending_receipst_value: any;

  constructor(private cmn: CommonComponent, private http: Http, private router: Router) {

    this.deptId = sessionStorage.getItem("session_deptid");
    this.roleId = sessionStorage.getItem("session_roleId");

    sessionStorage.removeItem("unclear");
    $('.page-loader-wrapper').hide();
    this.view_clreared_transaction_data = eval('(' + sessionStorage.getItem('view_clreared_transaction_data') + ')')
    // alert(this.view_clreared_transaction_data.siteId)



    if (this.view_clreared_transaction_data == null && sessionStorage.getItem("complete_back_titleName") == null) {
      this.siteList();
      this.transactionTypeAndMode()
      this.bookingstatuslist();
      this.projectchangeFun_remainDropdowndata();

    } else if (this.view_clreared_transaction_data !== null && sessionStorage.getItem("complete_back_titleName") !== "complete_transaction_back") {
      // this.search_completedTransactions('default')
      this.siteList();
      this.transactionTypeAndMode()
      this.bookingstatuslist();
      this.projectchangeFun_remainDropdowndata();
      this.getFinallsubmition_service("default", null, null, null, null,
        null, null, null, null, null, null, null,null);
    }

    sessionStorage.setItem('fromviewpagepredefined', null);
    sessionStorage.setItem('fromviewpagepredefined', null);

    if (sessionStorage.getItem("complete_back_titleName") == "complete_transaction_back") {

      this.siteList();
      this.transactionTypeAndMode()
      this.bookingstatuslist();
      this.projectchangeFun_remainDropdowndata();

      if (sessionStorage.getItem("complete_back_Siteids") != undefined && sessionStorage.getItem("complete_back_Siteids") != "undefined" && sessionStorage.getItem("complete_back_Siteids") != "" && sessionStorage.getItem("complete_back_Siteids") != "select") {
        this.selected_projectid = JSON.parse(sessionStorage.getItem("complete_back_Siteids"));
      } else {
        this.selected_projectid = [];
      }


      if (sessionStorage.getItem("complete_back_setofftypeId") != undefined && sessionStorage.getItem("complete_back_setofftypeId") != "undefined" && sessionStorage.getItem("complete_back_setofftypeId") != "" && sessionStorage.getItem("complete_back_setofftypeId") != "select") {
        transactiontypeval = sessionStorage.getItem("complete_back_setofftypeId");
      } else {
        transactiontypeval = null;
      }

      if (sessionStorage.getItem("complete_back_Transaction_Mode") != undefined && sessionStorage.getItem("complete_back_Transaction_Mode") != "undefined" && sessionStorage.getItem("complete_back_Transaction_Mode") != "" && sessionStorage.getItem("complete_back_Transaction_Mode") != "select") {
        Transaction_Mode_back = sessionStorage.getItem("complete_back_Transaction_Mode");



      } else {
        Transaction_Mode_back = null;
      }



      if (sessionStorage.getItem("complete_back_transactiontypeId") != undefined && sessionStorage.getItem("complete_back_transactiontypeId") != "undefined" && sessionStorage.getItem("complete_back_transactiontypeId") != "" && sessionStorage.getItem("complete_back_transactiontypeId") != "select") {
        transactiontypeId = sessionStorage.getItem("complete_back_transactiontypeId");
      } else {
        transactiontypeId = null;
      }

      if (sessionStorage.getItem("complete_back_fromdate") != undefined && sessionStorage.getItem("complete_back_fromdate") != "undefined" && sessionStorage.getItem("complete_back_fromdate") != "" && sessionStorage.getItem("complete_back_fromdate") != "select") {

        var date = sessionStorage.getItem("complete_back_fromdate");
        var d = new Date(parseInt(date, 10));
        var datestring_from = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
        $(function () {
          $("#fromDate").val(datestring_from);
        });

        this.fromdatevaluename = sessionStorage.getItem("complete_back_fromdate");
      } else {
        this.fromdatevaluename = null;
      }

      if (sessionStorage.getItem("complete_back_todate") != undefined && sessionStorage.getItem("complete_back_todate") != "undefined" && sessionStorage.getItem("complete_back_todate") != "" && sessionStorage.getItem("complete_back_todate") != "select") {

        var date = sessionStorage.getItem("complete_back_todate");
        var d = new Date(parseInt(date, 10));
        var datestring_todate = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
        $(function () {
          $("#toDate").val(datestring_todate);
        });

        this.todatevaluename = sessionStorage.getItem("complete_back_todate");
      } else {
        this.todatevaluename = null;
      }

      if (sessionStorage.getItem("complete_back_clearanceFromDate") != undefined && sessionStorage.getItem("complete_back_clearanceFromDate") != "undefined" && sessionStorage.getItem("complete_back_clearanceFromDate") != "" && sessionStorage.getItem("complete_back_clearanceFromDate") != "select") {

        var date = sessionStorage.getItem("complete_back_clearanceFromDate");
        var d = new Date(parseInt(date, 10));
        var datestring_clearfrom = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
        $(function () {
          $("#fromDate2").val(datestring_clearfrom);
        });

        this.fromdatevaluename2 = sessionStorage.getItem("complete_back_clearanceFromDate");
      } else {
        this.fromdatevaluename2 = null;
      }

      if (sessionStorage.getItem("complete_back_clearanceToDate") != undefined && sessionStorage.getItem("complete_back_clearanceToDate") != "undefined" && sessionStorage.getItem("complete_back_clearanceToDate") != "" && sessionStorage.getItem("complete_back_clearanceToDate") != "select") {
        var date = sessionStorage.getItem("complete_back_clearanceFromDate");
        var d = new Date(parseInt(date, 10));
        var datestring_cleartodate = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
        $(function () {
          $("#toDate2").val(datestring_cleartodate);
        });

        this.todatevaluename2 = sessionStorage.getItem("complete_back_clearanceToDate");
      } else {
        this.todatevaluename2 = null;
      }

      if (sessionStorage.getItem("complete_back_flatbooking_Id") != undefined && sessionStorage.getItem("complete_back_flatbooking_Id") != "undefined" && sessionStorage.getItem("complete_back_flatbooking_Id") != "" && sessionStorage.getItem("complete_back_flatbooking_Id") != "select") {
        flatbooking_Id = JSON.parse(sessionStorage.getItem("complete_back_flatbooking_Id"));
      } else {
        flatbooking_Id = null;
      }


      if (sessionStorage.getItem("booking_status") != undefined && sessionStorage.getItem("booking_status") != "undefined" && sessionStorage.getItem("booking_status") != "" && sessionStorage.getItem("booking_status") != "select") {
        this.booking_status = JSON.parse(sessionStorage.getItem("booking_status"));
      } else {
        this.booking_status = [];
      }


      if (sessionStorage.getItem("complete_back_flatId_Id") != undefined && sessionStorage.getItem("complete_back_flatId_Id") != "undefined" && sessionStorage.getItem("complete_back_flatId_Id") != "" && sessionStorage.getItem("complete_back_flatId_Id") != "select") {
        flatId_Id = JSON.parse(sessionStorage.getItem("complete_back_flatId_Id"));
      } else {
        flatId_Id = [];
      }

      if (sessionStorage.getItem("customerId_flat") != undefined && sessionStorage.getItem("customerId_flat") != "undefined" && sessionStorage.getItem("customerId_flat") != "" && sessionStorage.getItem("customerId_flat") != "select") {
        customerId_flat = sessionStorage.getItem("customerId_flat");
      } else {
        customerId_flat = null;
      }

      if (sessionStorage.getItem("receiptagainstTo") != undefined && sessionStorage.getItem("receiptagainstTo") != "undefined" && sessionStorage.getItem("receiptagainstTo") != "" && sessionStorage.getItem("receiptagainstTo") != "select") {
        this.sending_receipst_value = sessionStorage.getItem("receiptagainstTo");
      
      } else {
        this.sending_receipst_value = null;
      }








      this.getFinallsubmition_service("search", this.selected_projectid, flatId_Id, transactiontypeval, Transaction_Mode_back,
        transactiontypeId, this.fromdatevaluename, this.todatevaluename, this.fromdatevaluename2, this.todatevaluename2,
        this.booking_status, flatbooking_Id, this.sending_receipst_value);

    }
















    // sessionStorage.getItem("complete_back_flatbooking_Id");

    // sessionStorage.getItem("booking_status");


    // console.log(sessionStorage.getItem("complete_back_Siteids"));
    // console.log(sessionStorage.getItem("complete_back_flatId_Id"));
    // console.log(sessionStorage.getItem("complete_back_transactiontypeId"));
    // console.log(sessionStorage.getItem("complete_back_fromdate"));
    // console.log(sessionStorage.getItem("complete_back_todate"));
    // console.log(sessionStorage.getItem("complete_back_clearanceFromDate"));
    // console.log(sessionStorage.getItem("complete_back_clearanceToDate"));
    // console.log(sessionStorage.getItem("complete_back_flatbooking_Id"));
    // console.log(sessionStorage.getItem("complete_back_titleName"));
    // console.log(sessionStorage.getItem("booking_status"));


  }

  ngOnInit() {

    $("input").on("change", function () {
      this.setAttribute(
        "data-date",
        moment(this.value, "DD-MM-YYYY")
          .format(this.getAttribute("data-date-format"))
      )
    }).trigger("change")

    this.fg = new FormGroup(
      {
        from: new FormControl(""),
        to: new FormControl("")
      },
      [Validators.required, this.dateRangeValidator]
    );

    // $('#fromDate').on('change', function (e, date) {
    //   var maxDate = $('#fromDate').val();
    //   // $('#toDate').attr('min', maxDate);

    // });


    this.router.events
      .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
      .subscribe((events: RoutesRecognized[]) => {
        this.previousUrl = events[0].urlAfterRedirects;
        this.currentUrl = events[1].urlAfterRedirects;



        if (this.previousUrl.includes('Accounts-Receipt-Cheque')
          || this.previousUrl.includes('receipt-cheque-edit') || this.previousUrl.includes('Receipt-Cheque')
          || this.previousUrl.includes('receipt-online-edit') || this.previousUrl.includes('Receipt-Online')
          || this.previousUrl.includes('payment-cheque-edit') || this.previousUrl.includes('Payment-Cheque')
          || this.previousUrl.includes('interestwaiver-details')) {





          $(function () {

            $("#fromDate").val(sessionStorage.getItem("Fromdate"));
            $("#toDate").val(sessionStorage.getItem("toDate"));
          });


        } else {
          console.log('previous url is something else. call the ususal service from start');
        }


      }, error => {
      }
      );
    //   var date = new Date().getMonth();
    //  var minimumdate = new Date().setMonth(date - 3);
    //  var maximumdate = new Date().setMonth(date + 3);
    // $('#fromDate').bootstrapMaterialDatePicker({
    //   format: 'YYYY-MM-DD',
    //   // minDate: new Date(minimumdate),
    //   maxDate: new Date(),
    //   clearButton: true,
    //   weekStart: 1,
    //   time: false,
    // }).on('change', function (e, date) {
    //   $('#toDate').bootstrapMaterialDatePicker('setMinDate', date);
    // });


    // $('#toDate').bootstrapMaterialDatePicker({
    //   format: 'YYYY-MM-DD',
    //   //  minDate: new Date(minimumdate),
    //   maxDate: new Date(),
    //   clearButton: true,
    //   weekStart: 1,
    //   time: false
    // });

    var self = this;

    $(function () {
      $(".fistdaterow").css("display", "block")
      $(".seconddaterow").css("display", "block")
      $('#fromDate').on('change', function (e, date) {
        //  var maxDate = $('#fromDate').val();
        // alert("ok")
        //  $("#fistdaterow").css("display","block")
        $(".seconddaterow").css("display", "none")
        $("#fromDate2").val("")
        $("#toDate2").val("")
      });

      $('#fromDate2').on('change', function (e, date) {
        //  var maxDate = $('#fromDate').val();
        //  alert("ok")
        $(".fistdaterow").css("display", "none")
        $("#fromDate").val("")
        $("#toDate").val("")
        //$("#seconddaterow").css("display","block")
      });

      $('#toDate').on('change', function (e, date) {
        //   var maxDate = $('#fromDate').val();
        //  alert("ok")
        // $("#fistdaterow").css("display","block")
        $(".seconddaterow").css("display", "none")
        $("#fromDate2").val("")
        $("#toDate2").val("")

      });

      $('#toDate2').on('change', function (e, date) {
        // var maxDate = $('#fromDate').val();
        // alert("ok")
        $(".fistdaterow").css("display", "none")
        $("#fromDate").val("")
        $("#toDate").val("")
        // $("#seconddaterow").css("display","block")
      });
      $("#flatSelection").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });

      $("#setoffID").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });

      $("#transactiontypeId").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });

      $("#projectID").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });
      $("#bookingstatusID").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });


      $("#transaction_mode").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });
      $("#receiptagainst").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });

      
      // $("#BlockId").select2({
      //   placeholder: "--Select--",
      //   dir: "ltl"
      // });

      $('#bookingstatusID').change(function (e) {
        if (selected_bookingstatusID == "select") {
          sessionStorage.removeItem("booking_status");
        } else {
          sessionStorage.removeItem("booking_status");
        }
      });


      $('#projectID').change(function (e) {
        selected_projectid = $(e.target).val();

        console.log(selected_projectid);
        var project_name = $(e.target).select2('data')[0].text
        site_name = $('#projectID').select2('data')[0].text
        if (selected_projectid.length == 0) {
          sessionStorage.removeItem("complete_back_flatId_Id");
          sessionStorage.removeItem("complete_back_Siteids");
          sessionStorage.removeItem("complete_back_flatbooking_Id");

          sessionStorage.removeItem("customerId_flat");
          flatbooking_Id = [];
          flatId_Id = []
          this.selected_projectid = [];
          $("#flatSelection option[value]").remove();
          //  $("#BlockId option[value]").remove();

          $("#flatSelection").val('select')
          $('#flatSelection').select2().trigger('change');



        } else {
          self.view_clreared_transaction_data = null
          sessionStorage.removeItem("complete_back_flatId_Id");
          sessionStorage.removeItem("complete_back_flatbooking_Id")
          flatbooking_Id = [];
          flatId_Id = []
          $("#flatSelection option[value]").remove();
          sessionStorage.removeItem("customerId_flat");
          //  self.projectchangeFun(selected_projectid);

          self.flatsitewisechange(selected_projectid);


        }
      })




      // $('#BlockId').change(function (e) {
      //   selected_blockid = $(e.target).val();
      //   if (selected_blockid == "select") {

      //     $("#floorSelection option[value]").remove();
      //     selected_blockid = null;
      //     flatbooking_Id = null;
      //     flatId_Id = null;
      //     self.flatsitewisechange(selected_projectid);
      //   } else {
      //     self.flatwiseblockchange(selected_blockid);
      //   }
      // })


      $('#flatSelection').change(function (e) {
        selected_flatid = $(e.target).val();
        console.log(selected_flatid);
        sessionStorage.removeItem("complete_back_flatId_Id");
        sessionStorage.removeItem("customerId_flat");
        if (selected_flatid == "select") {
          sessionStorage.removeItem("complete_back_flatId_Id");
          sessionStorage.removeItem("customerId_flat");
          flatbooking_Id = null;
          flatId_Id = null;
        } else {

          flatId_Id = selected_flatid.split("-")[0];
          flatbooking_Id = selected_flatid.split("-")[3];
          customerId_flat = selected_flatid;

        }
      })
    });

  }


  startdatefun() {
    $("#fromDate").val("");

    sessionStorage.removeItem("complete_back_fromdate");


  }

  endtimefun() {
    $("#toDate").val("");
    sessionStorage.removeItem("complete_back_todate");

  }


  startdatefun2() {
    $("#fromDate2").val("");
    sessionStorage.removeItem("complete_back_clearanceFromDate");

  }

  endtimefun2() {
    $("#toDate2").val("");
    sessionStorage.removeItem("complete_back_clearanceToDate");
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
  siteList() {
    var arr = localStorage.getItem('ViewCompletedTransactions');

    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "site/site.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteIds": JSON.parse(arr).map(String)
    }



    this.http.post(url, body).map(res => res.json()).subscribe(resp => {



      if (sessionStorage.getItem("customeridsession") == null || sessionStorage.getItem("customeridsession") == "") {
        //   $('.page-loader-wrapper').hide();
      }
      if (resp.responseCode == 200) {
        $('#projectID').html("");
        // $('#projectID').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#projectID').append("<option value='" + resp.responseObjList[i].id + "'>" + resp.responseObjList[i].name + "</option>");
        }

        if (sessionStorage.getItem("complete_back_Siteids") != undefined && sessionStorage.getItem("complete_back_Siteids") != "" && sessionStorage.getItem("complete_back_Siteids") != "select" && sessionStorage.getItem("complete_back_Siteids") != "undefined") {
          $('#projectID').val(JSON.parse(sessionStorage.getItem("complete_back_Siteids")));

          this.flatsitewisechange(sessionStorage.getItem("complete_back_Siteids"));

        }


        sessionStorage.getItem("complete_back_Siteids")

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
  /*-----------------Getting Project(site) list End---------------------*/


  /*------------------------Projects On Change Functionality Start--------------------*/
  projectchangeFun(selectedSiteID) {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "block/blocks.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "ids": [selectedSiteID],
      "requestUrl": "ViewAllData"
    }
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#BlockId').html("");
        $('#BlockId').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#BlockId').append("<option value='" + resp.responseObjList[i].detId + "'>" + resp.responseObjList[i].name + "</option>");
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

  flatwiseblockchange(blockid) {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "flat/flatBlock.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "ids": [blockid],
      "requestUrl": "ViewAllData"
    }
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {



      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#flatSelection').html("");
        this.controller = [0];
        $('#flatSelection').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#flatSelection').append("<option value='" + resp.responseObjList[i].detId + "-" + resp.responseObjList[i].statusId + "-" + resp.responseObjList[i].customerId + "-" + resp.responseObjList[i].flatBookingId + "'>" + resp.responseObjList[i].name + "</option>");
          this.controller.push(resp.responseObjList[i].detId);
        }

        if (sessionStorage.getItem("customerId_flat") != null || sessionStorage.getItem("customerId_flat") != "null" || sessionStorage.getItem("customerId_flat") != "undefined" || sessionStorage.getItem("customerId_flat") != undefined) {


          $('#flatSelection').val(sessionStorage.getItem("customerId_flat"));
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


  flatsitewisechange(siteid) {

    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "flat/flatSite.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "ids": $("#projectID").val(),       //[siteid],
      "requestUrl": "ViewAllData"
    }
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {

      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#flatSelection').html("");
        this.controller = [0];
        $('#flatSelection').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#flatSelection').append("<option value='" + resp.responseObjList[i].detId + "-" + resp.responseObjList[i].statusId + "-" + resp.responseObjList[i].customerId + "-" + resp.responseObjList[i].flatBookingId + "'>" + resp.responseObjList[i].name + "</option>");
          this.controller.push(resp.responseObjList[i].detId);
        }


        if (sessionStorage.getItem("customerId_flat") != null || sessionStorage.getItem("customerId_flat") != "null" || sessionStorage.getItem("customerId_flat") != "undefined" || sessionStorage.getItem("customerId_flat") != undefined) {


          $('#flatSelection').val(sessionStorage.getItem("customerId_flat"));
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



  search_completedTransactions(status) {

    sessionStorage.removeItem("complete_back_Siteids");
    sessionStorage.removeItem("complete_back_flatId_Id");
    sessionStorage.removeItem("complete_back_setofftypeId");
    sessionStorage.removeItem("complete_back_transactiontypeId");

    sessionStorage.removeItem("complete_back_Transaction_Mode");




    sessionStorage.removeItem("complete_back_fromdate");
    sessionStorage.removeItem("complete_back_todate");
    sessionStorage.removeItem("complete_back_clearanceFromDate");
    sessionStorage.removeItem("complete_back_clearanceToDate");
    sessionStorage.removeItem("complete_back_flatbooking_Id");
    sessionStorage.removeItem("complete_back_titleName");
    sessionStorage.removeItem("booking_status");
    sessionStorage.removeItem("customerId_flat");
    if (this.view_clreared_transaction_data == null) {

      if (selected_projectid == null || selected_projectid == "null" || selected_projectid == undefined || selected_projectid == "undefined" || selected_projectid == "select") {
        this.selected_projectid = [];
      } else {
        this.selected_projectid = selected_projectid;
      }
    }

    //alert(this.selected_projectid)

    // if (selected_blockid == null || selected_blockid == "null" || selected_blockid == undefined || selected_blockid == "undefined") {
    //   this.selected_blockid = [];
    // } else {
    //   this.selected_blockid = [JSON.parse(selected_blockid)];
    // }

    console.log(flatbooking_Id);
    console.log(flatId_Id);

    if (flatbooking_Id == undefined) {
      this.flatbooking_Id = [];
    } else {
      if (flatbooking_Id.length != 0) {
        this.flatbooking_Id = [JSON.parse(flatbooking_Id)];
      } else {
        this.flatbooking_Id = [];
      }

    }

    if (flatId_Id == undefined) {
      this.flatId_Id = [];
    } else {

      if (flatId_Id.length != 0) {
        this.flatId_Id = [JSON.parse(flatId_Id)]
      } else {
        this.flatId_Id = [];
      }

    }

    if ($("#bookingstatusID").val() == null || $("#bookingstatusID").val() == "select" || $("#bookingstatusID").val() == undefined || $("#bookingstatusID").val() == "undefined") {
      this.booking_status = []
    } else {
      this.booking_status = $("#bookingstatusID").val()



    }



    // if ($("#fromDate").val() == "" && $("#toDate").val() == "" && this.selected_projectid.length == 0 && this.flatId_Id.length == 0) {
    //   swal("Please select any option to continue!");
    //   return false;
    // }

    if ($("#fromDate").val() == "") {
      this.fromdatevalue = null;
    } else {
      this.fromdatevalue = $("#fromDate").val();
    }

    if ($("#toDate").val() == "") {
      this.todatevalue = null;
    } else {
      this.todatevalue = $("#toDate").val();
    }

    if ($("#fromDate2").val() == "") {
      this.fromdatevalue2 = null;
    } else {
      this.fromdatevalue2 = $("#fromDate2").val();
    }

    if ($("#toDate2").val() == "") {
      this.todatevalue2 = null;
    } else {
      this.todatevalue2 = $("#toDate2").val();
    }




    if (this.fromdatevalue != null) {
      var d = new Date(this.fromdatevalue);
      var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
        d.getFullYear();

      var offset = d.getTimezoneOffset() * 60 * 1000;
      var withOffset = d.getTime();
      this.fromdatevaluename = withOffset;

    } else {
      this.fromdatevaluename = null;
    }


    if (this.todatevalue != null) {
      var todate = new Date(this.todatevalue);
      var todatestring = ("0" + todate.getDate()).slice(-2) + "-" + ("0" + (todate.getMonth() + 1)).slice(-2) + "-" +
        todate.getFullYear();

      var offset1 = todate.getTimezoneOffset() * 60 * 1000;
      var withOffset1 = todate.getTime();

      var withoutOffset = withOffset1 - offset1;
      this.todatevaluename = withoutOffset;
      //this.todatevalue = new Date(todatestring).getTime();
    } else {
      this.todatevaluename = null;
    }


    if ((this.fromdatevaluename != null && this.todatevaluename == null) || (this.fromdatevaluename == null && this.todatevaluename != null)) {

    } else {
      if (this.view_clreared_transaction_data == null) {
        if (this.fromdatevaluename > this.todatevaluename) {
          swal("Last Approved To Date should be greater than Last Approved From Date")
          return false;
        }
      }

    }

    if (this.fromdatevalue2 != null) {
      var d = new Date(this.fromdatevalue2);
      var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
        d.getFullYear();

      var offset = d.getTimezoneOffset() * 60 * 1000;
      var withOffset = d.getTime();
      this.fromdatevaluename2 = withOffset;

    } else {
      this.fromdatevaluename2 = null;
    }


    if (this.todatevalue2 != null) {
      var todate = new Date(this.todatevalue2);
      var todatestring = ("0" + todate.getDate()).slice(-2) + "-" + ("0" + (todate.getMonth() + 1)).slice(-2) + "-" +
        todate.getFullYear();

      var offset1 = todate.getTimezoneOffset() * 60 * 1000;
      var withOffset1 = todate.getTime();

      var withoutOffset = withOffset1 - offset1;
      this.todatevaluename2 = withoutOffset;
      //this.todatevalue = new Date(todatestring).getTime();
    } else {
      this.todatevaluename2 = null;
    }

    // if(this.fromdatevaluename2 == null && this.todatevaluename2 == null){
    //   swal("Please select any date")
    //   return false;
    // }
    if ((this.fromdatevaluename2 != null && this.todatevaluename2 == null) || (this.fromdatevaluename2 == null && this.todatevaluename2 != null)) {

    } else {
      if (this.view_clreared_transaction_data == null) {
        if (this.fromdatevaluename2 > this.todatevaluename2) {

          swal("Clearence to date should be greater than clearence from date")
          return false;
        }
      }

    }



    //   if(this.view_clreared_transaction_data == null){
    //   if(this.fromdatevaluename2 > this.todatevaluename2){
    //     swal("Clearence to date should be greater than clearence from date:")
    //     return false;
    //   }
    // }

    if ($("#setoffID").val() == "select") {
      transactiontypeval = null;
    } else {
      transactiontypeval = $("#setoffID").val()
    }

    if ($("#transactiontypeId").val() == "select") {
      transactiontypeId = null;
    } else {
      transactiontypeId = $("#transactiontypeId").val()
    }


    if ($("#transaction_mode").val() == "select") {
      Transaction_Mode_back = null;
    } else {
      Transaction_Mode_back = $("#transaction_mode").val()
    }




    if (sessionStorage.getItem("clear_Fromdate") == "null") {
      this.Clear_from_Date_value = null;
    } else {
      this.Clear_from_Date_value = sessionStorage.getItem("clear_Fromdate");
    }

    if (sessionStorage.getItem("clear_toDate") == "null") {
      this.Clear_to_Date_value = null;
    } else {

      this.Clear_to_Date_value = sessionStorage.getItem("clear_toDate");
    }


    if (this.view_clreared_transaction_data == null) {
      // if ($("#projectID").val() == "select") {
      //   swal("Please select project");
      //   return false;
      // }

      //alert(selected_projectid)


      //alert($("#bookingstatusID").val())
      // if (selected_projectid == null && transactiontypeval == null && transactiontypeId == null && this.fromdatevaluename == null && this.todatevaluename == null && this.fromdatevaluename2 == null && this.todatevaluename2 == null && this.booking_status == []) {
      //   swal("Please search with any option");
      //   return false;
      // }

    }

    if (selected_projectid == undefined || selected_projectid == null || selected_projectid.length == 0) {
      selected_projectid = null;
    }

    if (this.flatId_Id == undefined || this.flatId_Id == null || this.flatId_Id.length == 0) {
      this.flatId_Id = null;
    }

    if (transactiontypeval == undefined || transactiontypeval == null) {
      transactiontypeval = null;
    }

    if (Transaction_Mode_back == undefined || Transaction_Mode_back == null) {
      Transaction_Mode_back = null;
    }

    if (transactiontypeId == undefined || transactiontypeId == null) {
      transactiontypeId = null;
    }


    if (this.fromdatevaluename == undefined || this.fromdatevaluename == null) {
      this.fromdatevaluename = null;
    }

    if (this.todatevaluename2 == undefined || this.todatevaluename2 == null) {
      this.todatevaluename2 = null;
    }


    if (this.booking_status == undefined || this.booking_status == null) {
      this.booking_status = null;
    }


    if (this.flatbooking_Id == undefined || this.flatbooking_Id == null) {
      this.flatbooking_Id = null;
    }


    console.log(selected_projectid);
    console.log(this.flatId_Id);

    console.log(transactiontypeval);
    console.log(Transaction_Mode_back);
    console.log(transactiontypeId);

    console.log(this.fromdatevaluename);
    console.log(this.todatevaluename);
    console.log(this.fromdatevaluename2);
    console.log(this.todatevaluename2);

    console.log(this.booking_status);
    console.log(this.flatbooking_Id);
    if ($("#receiptagainst").val() == "" || $("#receiptagainst").val() == "select") {
     // swal("Please select receipt against to");
      // $('#CustomerCommentsId').focus();
      this.sending_receipst_value = null
      return false;
    }else{
      this.sending_receipst_value = $("#receiptagainst").val()
    }
    


    if (selected_projectid == null && this.sending_receipst_value == null && this.flatId_Id == null && transactiontypeval == null
      && Transaction_Mode_back == null && transactiontypeId == null && this.fromdatevaluename == null &&
      this.todatevaluename == null && this.fromdatevaluename2 == null && this.todatevaluename2 == null &&
      this.booking_status.length == 0 && this.flatbooking_Id.length == 0
    ) {
      swal("Please select any option to continue !!");
      return false;
    }

    this.getFinallsubmition_service("search", selected_projectid, this.flatId_Id, transactiontypeval, Transaction_Mode_back,
      transactiontypeId, this.fromdatevaluename, this.todatevaluename, this.fromdatevaluename2, this.todatevaluename2, this.booking_status, this.flatbooking_Id, this.sending_receipst_value);



  }


  goToDetails(itemData) {
    console.log(itemData);

    if (selected_projectid != undefined && selected_projectid != "" && selected_projectid != "select" && selected_projectid != "undefined" && selected_projectid.length != 0) {
      for (var i = 0; i < selected_projectid.length; i++) {
        this.selected_projectid_value.push(selected_projectid[i]);
      }
      sessionStorage.setItem("complete_back_Siteids", JSON.stringify(this.selected_projectid_value));
    }

    if (this.flatId_Id != undefined && this.flatId_Id.length != 0) {
      for (var i = 0; i < this.flatId_Id.length; i++) {
        this.selected_Flat_id_value.push(this.flatId_Id[i]);
      }

      sessionStorage.setItem("complete_back_flatId_Id", JSON.stringify(this.selected_Flat_id_value));
    }

    if (transactiontypeval != undefined && transactiontypeval != "undefined" && transactiontypeval != "" && transactiontypeval != "select") {
      sessionStorage.setItem("complete_back_setofftypeId", transactiontypeval);
    }



    if (transactiontypeId != undefined && transactiontypeId != "undefined" && transactiontypeId != "" && transactiontypeId != "select") {
      sessionStorage.setItem("complete_back_transactiontypeId", transactiontypeId);
    }


    if (Transaction_Mode_back != undefined && Transaction_Mode_back != "undefined" && Transaction_Mode_back != "" && Transaction_Mode_back != "select") {
      sessionStorage.setItem("complete_back_Transaction_Mode", Transaction_Mode_back);
    }




    if (this.fromdatevaluename != undefined && this.fromdatevaluename != "undefined" && this.fromdatevaluename != "" && this.fromdatevaluename != "select") {
      sessionStorage.setItem("complete_back_fromdate", this.fromdatevaluename);
    }

    if (this.todatevaluename != undefined && this.todatevaluename != "undefined" && this.todatevaluename != "" && this.todatevaluename != "select") {
      sessionStorage.setItem("complete_back_todate", this.todatevaluename);
    }

    if (this.fromdatevaluename2 != undefined && this.fromdatevaluename2 != "undefined" && this.fromdatevaluename2 != "" && this.fromdatevaluename2 != "select") {
      sessionStorage.setItem("complete_back_clearanceFromDate", this.fromdatevaluename2);
    }

    if (this.todatevaluename2 != undefined && this.todatevaluename2 != "undefined" && this.todatevaluename2 != "" && this.todatevaluename2 != "select") {
      sessionStorage.setItem("complete_back_clearanceToDate", this.todatevaluename2);
    }

    if (customerId_flat != undefined && customerId_flat != "undefined" && customerId_flat != "" && customerId_flat != "select") {
      sessionStorage.setItem("customerId_flat", customerId_flat);
    }
    if (this.sending_receipst_value != undefined && this.sending_receipst_value != "undefined" && this.sending_receipst_value != "" && this.sending_receipst_value != "select") {
      sessionStorage.setItem("receiptagainstTo", this.sending_receipst_value);
    }

    if (this.flatbooking_Id != undefined && this.flatbooking_Id.length != 0) {
      for (var i = 0; i < this.flatbooking_Id.length; i++) {
        this.selected_flatbooking_Id_value.push(this.flatbooking_Id[i]);
      }
      sessionStorage.setItem("complete_back_flatbooking_Id", JSON.stringify(this.selected_flatbooking_Id_value));
    }


    if (this.booking_status != undefined && this.booking_status.length != 0) {
      for (var i = 0; i < this.booking_status.length; i++) {
        this.selected_booking_status_value.push(this.booking_status[i]);
      }
      sessionStorage.setItem('booking_status', JSON.stringify(this.selected_booking_status_value))
    }


    sessionStorage.setItem("complete_back_titleName", "complete_transaction_back");
    console.log(itemData.transactionTypeName);
    console.log(itemData.transactionModeName);
    this.viewTransactionData = JSON.stringify(itemData);



    sessionStorage.setItem('view_transaction_data', this.viewTransactionData);
    if (itemData.transactionTypeName == "Receipt" && itemData.transactionModeName == "Cheque") {
      if (sessionStorage.getItem("session_deptid") == '997') {
        this.router.navigate(["Accounts-Receipt-Cheque"]);
        return false;
      } else if (sessionStorage.getItem("session_deptid") == '993') {
        sessionStorage.setItem("headtitle", "Completed Transactions");
        this.router.navigate(["receipt-cheque-edit"]);
      } else {
        this.router.navigate(["Receipt-Cheque"]);
      }
    } else if (itemData.transactionTypeName == "Receipt" && itemData.transactionModeName == "TDS") {
      if (sessionStorage.getItem("session_deptid") == '997') {
        this.router.navigate(["receipt_tds_view"]);
      } else {
        this.router.navigate(["receipt_tds_view"]);
      }
    } else if (itemData.transactionTypeName == "Receipt" && itemData.transactionModeName == "Online") {
      if (sessionStorage.getItem("session_deptid") == '993') {
        sessionStorage.setItem("headtitle", "Completed Transactions");
        this.router.navigate(["receipt-online-edit"]);
        return false;
      } else {
        this.router.navigate(["Receipt-Online"]);
      }
    } else if (itemData.transactionTypeName == "Payment" && itemData.transactionModeName == "Cheque") {
      if (sessionStorage.getItem("session_deptid") == '993') {
        sessionStorage.setItem("headtitle", "Completed Transactions");
        this.router.navigate(["payment-cheque-edit"]);
      } else {
        this.router.navigate(["Payment-Cheque"]);
      }
    } else if (itemData.transactionTypeName == "Payment" && itemData.transactionModeName == "Online") {

      if (sessionStorage.getItem("session_deptid") == '993') {
        sessionStorage.setItem("headtitle", "Completed Transactions");
        this.router.navigate(["payment-online-edit"]);
      } else {
        this.router.navigate(["Payment-Cheque"]);
      }




    }
    else if (itemData.transactionTypeName == "Interest Waiver" && itemData.transactionModeName == "Interest Waiver") {
      sessionStorage.setItem("headtitle", "Completed Transactions");
      this.router.navigate(["interestwaiver-details"]);

    } else if (itemData.transactionTypeName == "Receipt" && itemData.transactionModeName == "waived off") {
      sessionStorage.setItem("headtitle", "Completed Transactions");
      this.router.navigate(["Approve_Waive-Off"]);

    }



  }

  homeClick() {
    this.cmn.commonHomeNavigation();
  }
  ctreport() {
    // alert("ok")
    this.router.navigate(["ClearedTransactionReport"]);
  }
  attachmentlink(link) {

    window.open(link, '_system', 'location=yes,closebuttoncaption=Fechar,enableViewportScale=no');

  }





  /*------------------------Transaction type start-------------------*/
  transactionTypeAndMode() {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/viewFinTransactionTypeModeData.spring";
    console.log(url)
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "condition": "fetchTransactionData",
      "actionUrl": "ApproveTransaction"
    }
    console.log(JSON.stringify(body))
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

      console.log(resp);

      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#transactiontypeId').html('');
        $('#transactiontypeId').append('<option value="select">--Select--</option>');
        $('#transaction_mode').html('');
        $('#transaction_mode').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.finTrnasactionTypeResponseList.length; i++) {
          $('#transactiontypeId').append("<option value='" + resp.responseObjList.finTrnasactionTypeResponseList[i].transactionTypeId + "'>" + resp.responseObjList.finTrnasactionTypeResponseList[i].name + "</option>");
        }

        for (var i = 0; i < resp.responseObjList.finTransactionModeResponseList.length; i++) {
          $('#transaction_mode').append("<option value='" + resp.responseObjList.finTransactionModeResponseList[i].transactionModeId + "'>" + resp.responseObjList.finTransactionModeResponseList[i].name + "</option>");

        }


        if (sessionStorage.getItem("complete_back_transactiontypeId") != null || sessionStorage.getItem("complete_back_transactiontypeId") != "null" || sessionStorage.getItem("complete_back_transactiontypeId") != "undefined" || sessionStorage.getItem("complete_back_transactiontypeId") != undefined) {
          $('#transactiontypeId').val(sessionStorage.getItem("complete_back_transactiontypeId"));
        }

        if (sessionStorage.getItem("receiptagainstTo") != null || sessionStorage.getItem("receiptagainstTo") != "null" || sessionStorage.getItem("receiptagainstTo") != "undefined" || sessionStorage.getItem("receiptagainstTo") != undefined) {
          $('#receiptagainst').html("<option value='select'>Select</option>" + "" + "<option value='Land owner cost'>Land owner cost</option>" + "" + "<option value='Amenities cost'>Amenities cost</option>");

          $('#receiptagainst').val(sessionStorage.getItem("receiptagainstTo"));
        }
        //alert(this.sending_receipst_value)
       // $("#receiptagainst").val(sessionStorage.getItem("receiptagainstTo"))

        if (sessionStorage.getItem("complete_back_Transaction_Mode") != undefined && sessionStorage.getItem("complete_back_Transaction_Mode") != "undefined" && sessionStorage.getItem("complete_back_Transaction_Mode") != "" && sessionStorage.getItem("complete_back_Transaction_Mode") != "select") {
          Transaction_Mode_back = sessionStorage.getItem("complete_back_Transaction_Mode");
          $("#transaction_mode").val(Transaction_Mode_back);
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


  bookingstatuslist() {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/getBookingStatuses.spring";
    console.log(url)
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),

    }
    console.log(JSON.stringify(body))
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      console.log(JSON.stringify(resp))
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#bookingstatusID').html('');

        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#bookingstatusID').append("<option value='" + resp.responseObjList[i].statusId + "'>" + resp.responseObjList[i].status + "</option>");
        }

        if (sessionStorage.getItem("booking_status") != undefined && sessionStorage.getItem("booking_status") != "undefined" && sessionStorage.getItem("booking_status") != "" && sessionStorage.getItem("booking_status") != "select") {

          $('#bookingstatusID').val(JSON.parse(sessionStorage.getItem("booking_status")));
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
  /*------------------------Transaction type end-------------------*/

  projectchangeFun_remainDropdowndata() {
    $('.page-loader-wrapper').show();

    let url = this.cmn.commonUrl + "financial/loadTransactionStatusData.spring";
    console.log(url)
    // http://106.51.38.64:9999/employeeservice/site/site.spring

    let headers = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      //  "siteId": id,
      //  "siteName": text,
      //   "flatIds": [],
      //  "bookingFormIds": [],
      //  "requestUrl": "CompletedTransaction"
    }

    console.log(JSON.stringify(body))
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 200) {
        // $('#pending_at').html("");
        // $('#pending_at').append('<option value="select">--Select--</option>');
        // for (var i = 0; i < resp.responseObjList.pendingLevelEmpDetails.length; i++) {
        //   $('#pending_at').append("<option value='" + resp.responseObjList.pendingLevelEmpDetails[i].EMP_ID + "'>" + resp.responseObjList.pendingLevelEmpDetails[i].EMP_NAME + "</option>");
        // }

        $('#setoffID').html("");
        $('#setoffID').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.paymentSetOffData.length; i++) {
          $('#setoffID').append("<option value='" + resp.responseObjList.paymentSetOffData[i].value + "'>" + resp.responseObjList.paymentSetOffData[i].key + "</option>");
        }

        if (sessionStorage.getItem("complete_back_setofftypeId") != null || sessionStorage.getItem("complete_back_setofftypeId") != "null" || sessionStorage.getItem("complete_back_setofftypeId") != "undefined" || sessionStorage.getItem("complete_back_setofftypeId") != undefined) {
          $('#setoffID').val(sessionStorage.getItem("complete_back_setofftypeId"));
        }


      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        //alert(resp.status);
        swal(resp.errors[0]);
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


  getFinallsubmition_service(status, selected_projectid, flatId_Id, transactiontypeval, Transaction_Mode_back,
    transactiontypeId, fromdatevaluename, todatevaluename, fromdatevaluename2, todatevaluename2, booking_status, flatbooking_Id, receiptagainstTo) {


    console.log(status);
    console.log(selected_projectid);
    console.log(flatId_Id);
    console.log(transactiontypeval);
    console.log(Transaction_Mode_back);
    console.log(transactiontypeId);
    console.log(fromdatevaluename);
    console.log(todatevaluename);
    console.log(fromdatevaluename2);
    console.log(todatevaluename2);
    console.log(booking_status);
    console.log(flatbooking_Id);
    console.log(receiptagainstTo)




    if (sessionStorage.getItem("clear_Fromdate") == "null") {
      this.Clear_from_Date_value = null;
    } else {
      this.Clear_from_Date_value = sessionStorage.getItem("clear_Fromdate");
    }

    if (sessionStorage.getItem("clear_toDate") == "null") {
      this.Clear_to_Date_value = null;
    } else {

      this.Clear_to_Date_value = sessionStorage.getItem("clear_toDate");
    }



    $('.page-loader-wrapper').show();
    $('#tablecomplete').DataTable().destroy();
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/viewMisPendingTransactions.spring";
    console.log(url)
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body;

    console.log(this.view_clreared_transaction_data);
    console.log(sessionStorage.getItem("complete_back_clearanceToDate"));
    if (status !== "search") {
      body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "siteIds": [this.view_clreared_transaction_data.siteId],
        "clearanceFromDate": this.Clear_from_Date_value,
        "clearanceToDate": this.Clear_to_Date_value,
        "flatSaleOwnerId": this.view_clreared_transaction_data.flatSaleOwnerId,
        "receiptAgainstTo": this.sending_receipst_value,
        "condition": "clearedCompletedTransaction",
        "requestUrl": "CompletedTransaction",
        "operationType": this.view_clreared_transaction_data.operationType
      }
    } else if (status == "search") {
      body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "condition": "loadCompletedTransaction",
        "fromDate": fromdatevaluename,
        "toDate": todatevaluename,
        "siteIds": selected_projectid,
        "blockIds": [],
        "flatIds": flatId_Id,
        "bookingFormIds": flatbooking_Id,
        "searchBySetOffType": transactiontypeval,
        "clearanceFromDate": fromdatevaluename2,
        "clearanceToDate": todatevaluename2,
        "transactionTypeId": transactiontypeId,

        "transactionModeId": Transaction_Mode_back,
        "requestUrl": "CompletedTransaction",
        "fbStatusId": booking_status,
        "receiptAgainstTo": this.sending_receipst_value,
      }

    }


    console.log(JSON.stringify(body));



    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      console.log(JSON.stringify(resp))
      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 200) {
        this.milestonedemand_table = [];
        //   $("#tableExportvthdates").show()
        //   $("#tableExport").hide()

        //  $("#milestone_blocks_tables").show();

        this.controller_hun = resp.responseObjList;

        this.milestonedemand_table = resp.responseObjList.finTransactionEntryResponseList;

        console.log(this.milestonedemand_table);

        setTimeout(function () {
          $(document).ready(function () {
            $('#tablecomplete').DataTable({
              pageLength: 10,
              lengthMenu: [[10, 20, -1], [10, 20, 'Todos']],
              dom: 'Bfrltip',
              buttons: [
                'copy', 'csv', 'print', {
                  extend: 'pdfHtml5',
                  orientation: 'landscape',
                  pageSize: 'LEGAL'
                },

                {
                  extend: 'excelHtml5',
                  customize: function (xlsx) {
                    var sheet = xlsx.xl.worksheets['sheet1.xml'];
                    // set cell style: Wrapped text
                    $('row c', sheet).attr('s', '55');
                  }
                }
              ],


              retrieve: true,
              "scrollY": "300px",
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


                console.log(resp.responseObjList.finTransactionEntryResponseList.length);
                console.log(display);

                totaltransactionAmount = 0;
                totalrecept_transactionamount = 0;
                finally_interest_waiver_amount = 0;
                controller_data = [];

                if (display.length == 0) {
                  $('#invoiceamount').html(0);
                } else {
                  for (var j = 0; j < display.length; j++) {

                    console.log(resp.responseObjList.finTransactionEntryResponseList.length);
                    console.log(display.length);


                    if (resp.responseObjList.finTransactionEntryResponseList.length == display.length) {
                      console.log(resp.responseObjList.finTransactionEntryResponseList.length);
                      console.log(display.length);

                      console.log(data[display[j]][8]);

                      if (data[display[j]][8] == "Receipt") {
                        totaltransactionAmount += parseFloat(data[display[j]][16].replace(/\,/g, ''));
                      }

                      if (data[display[j]][8] == "Payment") {
                        totalrecept_transactionamount += parseFloat(data[display[j]][16].replace(/\,/g, ''));
                      }

                      console.log(totaltransactionAmount);
                      console.log(totalrecept_transactionamount);



                      if (totaltransactionAmount !== 0 && totalrecept_transactionamount !== 0) {
                        finally_transaction_amount = totaltransactionAmount - totalrecept_transactionamount;
                        const fmt = require('indian-number-format');
                        $('#invoiceamount').html(fmt.format(Number(finally_transaction_amount.toFixed(2))));
                        controller_data.push(resp.responseObjList.finTransactionEntryResponseList[display[j]]);

                      } else if (totaltransactionAmount !== 0 && totalrecept_transactionamount == 0) {
                        finally_transaction_amount = totaltransactionAmount;
                        const fmt = require('indian-number-format');
                        $('#invoiceamount').html(fmt.format(Number(finally_transaction_amount.toFixed(2))));
                        controller_data.push(resp.responseObjList.finTransactionEntryResponseList[display[j]]);

                      } else if (totaltransactionAmount == 0 && totalrecept_transactionamount !== 0) {
                        finally_transaction_amount = totalrecept_transactionamount;
                        const fmt = require('indian-number-format');
                        $('#invoiceamount').html(fmt.format(Number(finally_transaction_amount.toFixed(2))));
                        controller_data.push(resp.responseObjList.finTransactionEntryResponseList[display[j]]);
                      } else if (totaltransactionAmount == 0 && totalrecept_transactionamount == 0) {
                        $('#invoiceamount').html(0);
                      }






                    } else {
                      console.log(data[display[j]][8]);
                      console.log(display.length !== 0);
                      console.log(display.length == 0);
                      if (display.length !== 0) {

                        if (data[display[j]][8] == "Receipt") {
                          totaltransactionAmount += parseFloat(data[display[j]][16].replace(/\,/g, ''));

                          const fmt = require('indian-number-format');
                          //   console.log(fmt.format(Number(totaltransactionAmount.toFixed(2))))


                          $('#invoiceamount').html(fmt.format(Number(totaltransactionAmount.toFixed(2))));
                          controller_data.push(resp.responseObjList.finTransactionEntryResponseList[display[j]]);

                        } else if (data[display[j]][8] == "Payment") {
                          totalrecept_transactionamount += parseFloat(data[display[j]][16].replace(/\,/g, ''));


                          const fmt = require('indian-number-format');
                          //   console.log(fmt.format(Number(totalrecept_transactionamount.toFixed(2))))


                          $('#invoiceamount').html(fmt.format(Number(totalrecept_transactionamount.toFixed(2))));
                          controller_data.push(resp.responseObjList.finTransactionEntryResponseList[display[j]]);

                        } else if (data[display[j]][8] == "Interest Waiver") {

                          finally_interest_waiver_amount += parseFloat(data[display[j]][16].replace(/\,/g, ''));

                          console.log(finally_interest_waiver_amount);

                          const fmt = require('indian-number-format');
                          // console.log(fmt.format(Number(finally_interest_waiver_amount.toFixed(2))))


                          $('#invoiceamount').html(fmt.format(Number(finally_interest_waiver_amount.toFixed(2))));
                          controller_data.push(resp.responseObjList.finTransactionEntryResponseList[display[j]]);

                        }

                      }
                    }
                  }

                  // console.log(finally_transaction_amount);
                }

              },
            });

          });
        }, 2000);


        // if (this.view_clreared_transaction_data == null) {

        // } else {
        //   this.siteList();
        //   this.transactionTypeAndMode()
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

        $('.page-loader-wrapper').hide();
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }

  isAllSelected(event, index, item) {

    const checked = item.target.checked;

    this.multi_controller = [];
    for (var i = 0; i < this.milestonedemand_table.length; i++) {
      if (this.milestonedemand_table[i].checked === true) {
        console.log(this.milestonedemand_table[i].transactionTypeName);

        if (this.milestonedemand_table[i].transactionTypeName == "Payment") {
          this.transactionReceiveDate = this.milestonedemand_table[i].transactionDate
        } else {
          this.transactionReceiveDate = this.milestonedemand_table[i].transactionReceiveDate
        }

        console.log(this.transactionReceiveDate);

        this.multi_controller.push({
          "siteId": this.milestonedemand_table[i].siteId,
          "siteName": this.milestonedemand_table[i].siteName,
          "transactionTypeId": this.milestonedemand_table[i].transactionTypeId,
          "transactionModeId": this.milestonedemand_table[i].transactionModeId,
          "transferModeId": this.milestonedemand_table[i].transferModeId,
          "transactionTypeName": this.milestonedemand_table[i].transactionTypeName,
          "transactionModeName": this.milestonedemand_table[i].transactionModeName,
          "transferModeName": this.milestonedemand_table[i].transferModeName,
          "referenceNo": this.milestonedemand_table[i].chequeOrReferenceNo,

          "transactionReceiveDate": this.transactionReceiveDate,

          "actualTransactionReceiveDate": this.transactionReceiveDate,
          "transactionAmount": this.milestonedemand_table[i].transactionAmount,
          "flatIds": [this.milestonedemand_table[i].flatId],
          "bookingFormId": this.milestonedemand_table[i].bookingFormId,
          "actualFlatIds": [this.milestonedemand_table[i].flatId],
          "actualBookingFormId": this.milestonedemand_table[i].bookingFormId,
          "buttonType": "Delete",
          "actionUrl": "Delete_Transaction",
          "transactionEntryId": this.milestonedemand_table[i].transactionEntryId,
          "transactionSetOffEntryId": this.milestonedemand_table[i].transactionSetOffEntryId,
          "transactionNo": this.milestonedemand_table[i].finTransactionNo,
          "comment": "",
          "transactionReceiptNo": this.milestonedemand_table[i].transactionReceiptNo,
          "flatNo": this.milestonedemand_table[i].flatNo
        });
      }
    }


    console.log(this.multi_controller);

    if (this.multi_controller.length == 0) {
      this.viewselected = false;
    }


  }


  data_multi_rows_delete_fun() {

    console.log(this.controller_hun);


    console.log(this.milestonedemand_table);


    this.multi_controller = [];
    for (var i = 0; i < this.milestonedemand_table.length; i++) {
      if (this.milestonedemand_table[i].checked === true) {
        console.log(this.milestonedemand_table[i]);

        if (this.milestonedemand_table[i].transactionTypeName == "Payment") {
          this.transactionReceiveDate = this.milestonedemand_table[i].transactionDate
        } else {
          this.transactionReceiveDate = this.milestonedemand_table[i].transactionReceiveDate
        }


        this.multi_controller.push({
          "siteId": this.milestonedemand_table[i].siteId,
          "siteName": this.milestonedemand_table[i].siteName,
          "transactionTypeId": this.milestonedemand_table[i].transactionTypeId,
          "transactionModeId": this.milestonedemand_table[i].transactionModeId,
          "transferModeId": this.milestonedemand_table[i].transferModeId,
          "transactionTypeName": this.milestonedemand_table[i].transactionTypeName,
          "transactionModeName": this.milestonedemand_table[i].transactionModeName,
          "transferModeName": this.milestonedemand_table[i].transferModeName,
          "referenceNo": this.milestonedemand_table[i].chequeOrReferenceNo,

          "transactionReceiveDate": this.transactionReceiveDate,

          "actualTransactionReceiveDate": this.transactionReceiveDate,
          "transactionAmount": this.milestonedemand_table[i].transactionAmount,
          "flatIds": [this.milestonedemand_table[i].flatId],
          "bookingFormId": this.milestonedemand_table[i].bookingFormId,
          "actualFlatIds": [this.milestonedemand_table[i].flatId],
          "actualBookingFormId": this.milestonedemand_table[i].bookingFormId,
          "buttonType": "Delete",
          "actionUrl": "Delete_Transaction",
          "transactionEntryId": this.milestonedemand_table[i].transactionEntryId,
          "transactionSetOffEntryId": this.milestonedemand_table[i].transactionSetOffEntryId,
          "transactionNo": this.milestonedemand_table[i].finTransactionNo,
          "comment": "",
          "transactionReceiptNo": this.milestonedemand_table[i].transactionReceiptNo,
          "flatNo": this.milestonedemand_table[i].flatNo
        });
      }
    }


    console.log(this.multi_controller);




    if (this.multi_controller.length == 0) {
      swal("Please select atleast one record");
      return false;
    }



    if (confirm("Are you sure you want to delete?")) {
      this.approve_and_reject_data_fun(this.multi_controller);
    }
  }



  approve_and_reject_data_fun(multi_controller) {
    $('.page-loader-wrapper').show();

    //http://localhost:8888/SumadhuraGateway/employeeservice/financial/deleteMultipleFinancialTransaction.spring

    let url = this.cmn.commonUrl + "financial/deleteMultipleFinancialTransaction.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "transactionList": multi_controller
    }

    console.log(url);
    console.log(JSON.stringify(body));



    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      console.log(resp);
      console.log(JSON.stringify(resp));
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {

        for (var i = 0; i < resp.responseObjList.length; i++) {
          this.controller_res.push(resp.responseObjList[i]);
        }

        swal({ title: this.controller_res.join("\r\n") }, function () {
          location.reload();
        });
        return false;

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

  allNonTrades(event) {
    const checked = event.target.checked;
    //this.allNonTrades_data = event.target.checked;
    this.milestonedemand_table.forEach(item => item.checked = checked);
    console.log(this.milestonedemand_table);
  }


}
