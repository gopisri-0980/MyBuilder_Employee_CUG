import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router, RoutesRecognized } from "@angular/router";
import { ViewInterestwaiverRequestforapprovalService } from './view-interestwaiver-requestforapproval.service';
import { CommonComponent } from '../common/common.component';
import { RequestOptions, Http, Headers } from '@angular/http';
declare const $: any;
declare const swal: any;

var selected_projectid;
var site_name;

var buttonType;
var optionalButtonType;
var userRoleListTemp = [];
var maindivarray = [];
var userRoleListTemp1 = [];
var body;
var temp;

var totalInvoiceAmount = 0;
var  controller_data = [];
@Component({
  selector: 'app-view-interestwaiver-requestforapproval',
  templateUrl: './view-interestwaiver-requestforapproval.component.html',
  styleUrls: ['./view-interestwaiver-requestforapproval.component.sass']
})
export class ViewInterestwaiverRequestforapprovalComponent implements OnInit {
  fg: FormGroup;
  sitename: any;
  customernames: any;
  fromdate: any;
  todate: any;
  pendingTransData: any[];
  sitecontroller: Array<any> = [];
  custnamecontroller: Array<any> = [];
  fromdatevaluename: any;
  todatevaluename: any;
  temp: any;
  viewTransactionData: string;
  totalcontroller: string;
  selected: any[];
  site_names:  any;
  customer_name:  any;
  customerid: any;

  constructor(private http: Http, private formBuilder: FormBuilder, private cmn: CommonComponent,
    private router: Router, private service: ViewInterestwaiverRequestforapprovalService) {
    $('.page-loader-wrapper').hide();
    this.siteList();
   
   

    if(sessionStorage.getItem("view_interest_waiver_status") == "true"){
      console.log(sessionStorage.getItem("view_interest_waiver_siteid"));
      console.log(sessionStorage.getItem("view_interest_waiver_customername"));
      console.log(sessionStorage.getItem("view_interest_waiver_fromdate"));
      console.log(sessionStorage.getItem("view_interest_waiver_todate"));

      // if(sessionStorage.getItem("view_interest_waiver_siteid") != null){
      //   this.site_names = sessionStorage.getItem("view_interest_waiver_siteid");
      // }
      
      // if(sessionStorage.getItem("view_interest_waiver_customername") != null){
      //   this.customer_name = sessionStorage.getItem("view_interest_waiver_customername");
      // }

      if(sessionStorage.getItem("view_interest_waiver_fromdate") != null){

        var date = sessionStorage.getItem("view_interest_waiver_fromdate");
        var d = new Date(parseInt(date, 10));
        var datestring_from = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
        $(function () {
          $("#fromDate").val(datestring_from);
        });

       
      }

      if(sessionStorage.getItem("view_interest_waiver_todate") != null){
        var date = sessionStorage.getItem("view_interest_waiver_todate");
        var d = new Date(parseInt(date, 10));
        var datestring_to = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
        $(function () {
          $("#toDate").val(datestring_to);
        });
      }

      
      if(sessionStorage.getItem("view_interest_waiver_fromdate") == "null" || sessionStorage.getItem("view_interest_waiver_fromdate") == null){
        this.fromdatevaluename = null;
      } else {
        this.fromdatevaluename = sessionStorage.getItem("view_interest_waiver_fromdate");
      }

      if(sessionStorage.getItem("view_interest_waiver_todate") == "null" || sessionStorage.getItem("view_interest_waiver_todate") == null){
        this.todatevaluename = null;
      } else {
        this.todatevaluename = sessionStorage.getItem("view_interest_waiver_todate");
      }

      // console.log(this.fromdatevaluename);
      // console.log(this.todatevaluename);

      this.getPenidngTransactions("search" ,JSON.parse(sessionStorage.getItem("view_interest_waiver_siteid")) , 
      JSON.parse(sessionStorage.getItem("view_interest_waiver_customername")) , 
      this.fromdatevaluename , this.todatevaluename)

      //this.getPenidngTransactions("search")
      
    } else {
      this.getPenidngTransactions("default" , null ,null ,null ,null);
    }

    
    

    


  }

  ngOnInit() {
    this.fg = new FormGroup(
      {
        from: new FormControl(""),
        to: new FormControl("")
      },
      [Validators.required, this.dateRangeValidator]
    );

    var self = this;
    $(function () {
      var dtToday = new Date();
      this.month = dtToday.getMonth() + 1;
      this.day = dtToday.getDate();
      this.year = dtToday.getFullYear();
      if (this.month < 10)
        this.month = '0' + this.month.toString();
      if (this.day < 10)
        this.day = '0' + this.day.toString();
      var maxDate = this.year + '-' + this.month + '-' + this.day;
      $('#fromDate').attr('max', maxDate);
      $('#toDate').attr('max', maxDate);



      $("#projectID").select2({
        placeholder: "Select project",
        dir: "ltl",
      });

      $("#customername").select2({
        placeholder: "Select Customer Name",
        dir: "ltl",
      });

    });


    $('#projectID').change(function (e) {
      selected_projectid = $(e.target).val();
      site_name = $('#projectID').select2('data')[0].text
      sessionStorage.removeItem("view_interest_waiver_customername");
      $("#customername").val("");
      if (selected_projectid == "select") {
        sessionStorage.removeItem("view_interest_waiver_siteid");
        self.customerautofield("");
      } else {
        this.siteIDvalue = selected_projectid;
        self.customerautofield(this.siteIDvalue);

      }
    })

    $('#customername').change(function (e) {
      
      if ($(e.target).val() == "select") {
        
        sessionStorage.removeItem("view_interest_waiver_customername");
        $("#customername").val("");
      }
    });
    

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


  startdatefun() {
    $("#fromDate").val("");
    sessionStorage.removeItem("view_interest_waiver_fromdate");
  
  }

  endtimefun() {
    $("#toDate").val("");
  sessionStorage.removeItem("view_interest_waiver_todate");
  }

  /*-----------------Getting Project(site) list Start---------------------*/
  siteList() {
    var arr = localStorage.getItem('Viewinterestwaiverforapprove');
    $('.page-loader-wrapper').show();
    this.service.ProjectDetails(JSON.parse(arr).map(String)).then(resp => {
      if (sessionStorage.getItem("customeridsession") == null || sessionStorage.getItem("customeridsession") == "") {
        $('.page-loader-wrapper').hide();
      }
      if (resp.responseCode == 200) {
        $('#projectID').html("");
        $('#projectID').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#projectID').append("<option value='" + resp.responseObjList[i].id + "'>" + resp.responseObjList[i].name + "</option>");
        }


        console.log(sessionStorage.getItem("view_interest_waiver_siteid"));

        if (sessionStorage.getItem("view_interest_waiver_siteid") != null && sessionStorage.getItem("view_interest_waiver_siteid") != undefined && sessionStorage.getItem("view_interest_waiver_siteid") != "select") {
          $('#projectID').val(JSON.parse(sessionStorage.getItem("view_interest_waiver_siteid")));
          this.customerid =JSON.parse(sessionStorage.getItem("view_interest_waiver_siteid"));
          console.log(this.customerid );
          console.log(this.customerid [0]);
          this.customerautofield(this.customerid[0]);
        }


        // console.log(sessionStorage.getItem("view_interest_waiver_siteid"));
        // console.log(sessionStorage.getItem("view_interest_waiver_customername"));
        // console.log(sessionStorage.getItem("view_interest_waiver_fromdate"));
        // console.log(sessionStorage.getItem("view_interest_waiver_todate"));


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
      if (error == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      }
    }

    )
  }
  /*-----------------Getting Project(site) list end---------------------*/


  /*-----------------Getting Customer Names list Start---------------------*/
  customerautofield(SiteIDS) {
    $(".page-loader-wrapper").show();
    this.service.GetCustomernamefun(sessionStorage.getItem("login_sessionkey"), "", SiteIDS).then(resp => {

      console.log(resp);
      $(".page-loader-wrapper").hide();

      if (resp.responseCode == 200) {
        $('#customername').html("");
        $('#customername').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.referedCustomer.length; i++) {
          $('#customername').append("<option value='" + resp.responseObjList.referedCustomer[i].flatBookingId + "'>" + resp.responseObjList.referedCustomer[i].siteNameCustomerFlatNo + "</option>");
        }

        
        if (sessionStorage.getItem("view_interest_waiver_customername") != null && sessionStorage.getItem("view_interest_waiver_customername") != undefined && sessionStorage.getItem("view_interest_waiver_customername") != "select") {
          $('#customername').val(JSON.parse(sessionStorage.getItem("view_interest_waiver_customername")));
         
        }


        // console.log(sessionStorage.getItem("view_interest_waiver_siteid"));
        // console.log(sessionStorage.getItem("view_interest_waiver_customername"));
        // console.log(sessionStorage.getItem("view_interest_waiver_fromdate"));
        // console.log(sessionStorage.getItem("view_interest_waiver_todate"));


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
  /*-----------------Getting Customer Names list end---------------------*/

  /*-----------------Submit function start---------------------*/
  searchfunction() {

    this.sitename = $("#projectID").val();
    this.customernames = $("#customername").val();
    this.fromdate = $("#fromDate").val();
    this.todate = $("#toDate").val();

    console.log(this.sitename);
    console.log(this.customernames);
    console.log(this.fromdate);
    console.log(this.todate);

    

    if (this.sitename == "select" && (this.customernames == null || this.customernames == "select") && this.fromdate == "" && this.todate == "") {
      swal("Please select any option to continue!");
      return false;
    }

    var startdate = $('#fromDate').val();
    var endDate = $('#toDate').val();
    if (new Date(startdate) > new Date(endDate)) {
      swal('Please select  a valid from and to date');
      return false;
    }

    this.sitecontroller = [];
    this.custnamecontroller = [];


    if (this.sitename == "select" || this.sitename == null || this.sitename == "null") {
      this.sitecontroller = [];
    } else {
      this.sitecontroller.push(parseInt(this.sitename));
    }
    if (this.customernames == "select" || this.customernames == null || this.customernames == "null") {
      this.custnamecontroller = [];
    } else {
      this.custnamecontroller.push(parseInt(this.customernames));
    }

    if (this.fromdate == "" || this.fromdate == undefined) {
      this.fromdate = null;
    }

    if (this.todate == "" || this.todate == undefined) {
      this.todate = null;
    }

    if (this.fromdate != null) {
      var d = new Date(this.fromdate);
      var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
        d.getFullYear();

      var offset = d.getTimezoneOffset() * 60 * 1000;
      var withOffset = d.getTime();
      this.fromdatevaluename = withOffset;

    } else {
      this.fromdatevaluename = null;
    }

    if (this.todate != null) {
      var todate = new Date(this.todate);
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


    this.getPenidngTransactions("search" ,this.sitecontroller , this.custnamecontroller , this.fromdatevaluename , this.todatevaluename)

  }
  /*-----------------Submit function end---------------------*/


  /*--------------------------Pending transactions table start------------------*/

  getPenidngTransactions(search_default_val ,sitecontroller,custnamecontroller ,fromdatevaluename , todatevaluename) {
   

    this.pendingTransData = []
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/viewInterestWaiverPendingTransactions.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body;
    if (search_default_val == "default") {
      body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "condition": "approveTransaction",
        "actionUrl": "Interest Waiver",
        "siteIds": [],
        "bookingFormIds": [],
        "fromDate": null,
        "toDate": null
      }
    } else {
      body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "condition": "approveTransaction",
        "actionUrl": "Interest Waiver",
        "siteIds": sitecontroller,
        "bookingFormIds": custnamecontroller,
        "fromDate": fromdatevaluename,
        "toDate": todatevaluename
      }

      if(this.sitecontroller.length != 0){
        sessionStorage.setItem("view_interest_waiver_siteid" , JSON.stringify(this.sitecontroller));
      }
      if(this.custnamecontroller.length != 0){
        sessionStorage.setItem("view_interest_waiver_customername" , JSON.stringify(this.custnamecontroller));
      }

      if(this.fromdatevaluename != null || this.fromdatevaluename != ""){
        sessionStorage.setItem("view_interest_waiver_fromdate" , this.fromdatevaluename);
      }

      if(this.todatevaluename != null || this.todatevaluename != ""){
        sessionStorage.setItem("view_interest_waiver_todate" , this.todatevaluename);
      }

      sessionStorage.setItem("view_interest_waiver_status" , "true");

    }

  

    console.log(url);
    console.log(JSON.stringify(body));

    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      console.log(resp);
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        this.pendingTransData = [];
        this.pendingTransData = resp.responseObjList.finTransactionEntryResponseList;

        setTimeout(function () {
          $(document).ready(function () {
            $('#viewpendingdata').DataTable({
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
                totalInvoiceAmount = 0;
                controller_data = [];
                for (var j = 0; j < display.length; j++) {
                  totalInvoiceAmount += parseFloat(data[display[j]][7].replace(/\,/g,''));
                 // $('#invoiceamount').html(Number(totalInvoiceAmount).toFixed(2));

                 const fmt = require('indian-number-format');
                 console.log(fmt.format(Number(totalInvoiceAmount.toFixed(2))))


                  $('#invoiceamount').html(fmt.format(Number(totalInvoiceAmount.toFixed(2))));
                  controller_data.push(resp.responseObjList.finTransactionEntryResponseList[display[j]]);
                }

                
                
              },
            });
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
        $('.page-loader-wrapper').hide();
        var error = JSON.parse(error._body).responseCode;
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }

  toggleVisibility(event, item) {
    console.log(event);
    console.log(item);
    this.temp = event.target.id.split("tablerowdata")[1];
    console.log(this.temp);
    if (event.target.checked == true) {
      $('#chequedepositDate' + this.temp).prop('disabled', false);
      $('#chequeHandoverDate' + this.temp).prop('disabled', false);

      // $("#chequedepositDate" + this.temp).focus();
      userRoleListTemp.push({
        "siteId": item.siteId,
        "siteName": item.siteName,
        "transactionTypeId": item.transactionTypeId,
        "transactionModeId": item.transactionModeId,
        "transactionTypeName": item.transactionTypeName,
        "transactionModeName": item.transactionModeName,
        "transactionAmount": item.transactionAmount,
        "transactionReceiveDate": item.transactionDate,
        "flatIds": item.flatId,
        "bookingFormId": item.bookingFormId,
        "finTransactionNo": item.finTransactionNo,
        "transactionEntryId": item.transactionEntryId,
        "transactionSetOffEntryId": 8,
        "rowId": this.temp,

      });



    } else {
      let index = userRoleListTemp.indexOf({
        "siteId": item.siteId,
        "siteName": item.siteName,
        "transactionTypeId": item.transactionTypeId,
        "transactionModeId": item.transactionModeId,
        "transactionTypeName": item.transactionTypeName,
        "transactionModeName": item.transactionModeName,
        "transactionAmount": item.transactionAmount,
        "transactionReceiveDate": item.transactionDate,
        "flatIds": item.flatId,
        "bookingFormId": item.bookingFormId,
        "finTransactionNo": item.finTransactionNo,
        "transactionEntryId": item.transactionEntryId,
        "transactionSetOffEntryId": 8,

      });
      userRoleListTemp.splice(index, 1);

    }


  }

  cheque_bounce_clearFun(buttonval) {
    //   userRoleListTemp = [];
    if (buttonval == "Approve") {
      buttonType = "Approve";
    } else if (buttonval == "Reject") {
      buttonType = "Reject";
    }



    userRoleListTemp.map(function (entry) {
      entry.buttonType = buttonType;
      return entry;
    });

    console.log(userRoleListTemp);

    if (sessionStorage.getItem("session_deptName") == "ACCOUNTS") {
      var temp_chequedepositDate;
      var temp_handoverDate
      maindivarray = [];
      for (var i = 0; i < userRoleListTemp.length; i++) {

        if (buttonType == "Approve") {
          if ($("#chequedepositDate" + userRoleListTemp[i].rowId).val() == "") {
            temp_chequedepositDate = null;
            swal("Please select deposite date");
            return false;
          } else {
            temp_chequedepositDate = new Date($("#chequedepositDate" + userRoleListTemp[i].rowId).val()).getTime()
          }

          if ($("#chequeHandoverDate" + userRoleListTemp[i].rowId).val() == "") {
            temp_handoverDate = null;
            swal("Please select cheque hand over date");
            return false;
          } else {
            temp_handoverDate = new Date($("#chequeHandoverDate" + userRoleListTemp[i].rowId).val()).getTime()
          }
        } else {
          temp_chequedepositDate = null;
          temp_handoverDate = null;
        }
        maindivarray.push({
          "siteId": userRoleListTemp[i].siteId,
          "siteName": userRoleListTemp[i].siteName,
          "transactionTypeId": userRoleListTemp[i].transactionTypeId,
          "transactionModeId": userRoleListTemp[i].transactionModeId,
          "transactionTypeName": userRoleListTemp[i].transactionTypeName,
          "transactionModeName": userRoleListTemp[i].transactionModeName,
          "transactionAmount": userRoleListTemp[i].transactionAmount,
          "transactionReceiveDate": userRoleListTemp[i].transactionReceiveDate,
          "flatIds": [userRoleListTemp[i].flatIds],
          "bookingFormId": userRoleListTemp[i].bookingFormId,
          "finTransactionNo": userRoleListTemp[i].finTransactionNo,
          "transactionEntryId": userRoleListTemp[i].transactionEntryId,
          "transactionSetOffEntryId": 8,
          "chequeDepositedDate": temp_chequedepositDate,
          "chequeHandoverDate": temp_handoverDate,
          "buttonType": userRoleListTemp[i].buttonType,

        });
      }

    } else if (sessionStorage.getItem("session_deptName") == "CRM FINANCE") {
      // var temp_chequedepositDate;
      var temp_handoverDate
      maindivarray = [];
      for (var i = 0; i < userRoleListTemp.length; i++) {

        if (buttonType == "Approve") {
          // if ($("#chequedepositDate" +userRoleListTemp[i].rowId).val() == "") {
          //   temp_chequedepositDate = null;
          //   swal("Please select deposite date");
          //   return false;
          // } else {
          //   temp_chequedepositDate = new Date($("#chequedepositDate" + userRoleListTemp[i].rowId).val()).getTime()
          // }

          if ($("#chequeHandoverDate" + userRoleListTemp[i].rowId).val() == "") {
            temp_handoverDate = null;
            swal("Please select cheque hand over date");
            return false;
          } else {
            temp_handoverDate = new Date($("#chequeHandoverDate" + userRoleListTemp[i].rowId).val()).getTime()
          }
        } else {
          temp_chequedepositDate = null;
          temp_handoverDate = null;
        }



        maindivarray.push({
          "siteId": userRoleListTemp[i].siteId,
          "siteName": userRoleListTemp[i].siteName,
          "transactionTypeId": userRoleListTemp[i].transactionTypeId,
          "transactionModeId": userRoleListTemp[i].transactionModeId,
          "transactionTypeName": userRoleListTemp[i].transactionTypeName,
          "transactionModeName": userRoleListTemp[i].transactionModeName,
          "transactionAmount": userRoleListTemp[i].transactionAmount,
          "transactionReceiveDate": userRoleListTemp[i].transactionReceiveDate,
          "flatIds": [userRoleListTemp[i].flatIds],
          "bookingFormId": userRoleListTemp[i].bookingFormId,
          "finTransactionNo": userRoleListTemp[i].finTransactionNo,
          "transactionEntryId": userRoleListTemp[i].transactionEntryId,
          "transactionSetOffEntryId": 8,
          "chequeHandoverDate": temp_handoverDate,
          "buttonType": userRoleListTemp[i].buttonType,

        });
      }
    } else {

      maindivarray = [];
      for (var i = 0; i < userRoleListTemp.length; i++) {
        console.log(userRoleListTemp);
        maindivarray.push({
          "siteId": userRoleListTemp[i].siteId,
          "siteName": userRoleListTemp[i].siteName,
          "transactionTypeId": userRoleListTemp[i].transactionTypeId,
          "transactionModeId": userRoleListTemp[i].transactionModeId,
          "transactionTypeName": userRoleListTemp[i].transactionTypeName,
          "transactionModeName": userRoleListTemp[i].transactionModeName,
          "transactionAmount": userRoleListTemp[i].transactionAmount,
          "transactionReceiveDate": userRoleListTemp[i].transactionReceiveDate,
          "flatIds": [userRoleListTemp[i].flatIds],
          "bookingFormId": userRoleListTemp[i].bookingFormId,
          "finTransactionNo": userRoleListTemp[i].finTransactionNo,
          "transactionEntryId": userRoleListTemp[i].transactionEntryId,
          "transactionSetOffEntryId": 8,
          "buttonType": userRoleListTemp[i].buttonType,

        });
      }
    }

    console.log(maindivarray);

    if (maindivarray.length < 1) {
      swal("Please select atleast one transaction");
      return false;
    }

    if (maindivarray.length > 0) {
      $(function () {
        $.each($(".checlist:checked"), function () {
          var temp = $(this).attr("id").split('tablerowdata')[1];
          if (($(this).val().split('-')[5]) == "Cheque") {

            if (buttonType == "Approve") {
              if ($('#chequedepositDate' + (temp)).val() == "") {
                $("#chequedepositDate" + (temp)).focus();
                return false;
              }
            }

          }
          $("#demand_note_date").val(2)
        });
        return false;

      });

    }

    // if ($("#demand_note_date").val() == "") {
    //   return false;
    // }


    console.log(maindivarray);
    this.finalSubmission(buttonType);
  }

  finalSubmission(buttonType) {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/approveFinancialMultipleTransaction.spring";

    console.log(url);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    body = {
      "sessionKey": sessionStorage.getItem("login_sessionkey"),
      "financialTRNRequests": maindivarray
    }


    console.log(url);
    console.log(JSON.stringify(body));
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      console.log(JSON.stringify(resp));
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        if (buttonType == "Approve") {

          swal(resp.responseObjList.approvedAndFailedStrMsg);

          let customeResponse = [];
          for (let i = 0; i < resp.responseObjList.approvedAndFailedTRN.length; i++) {
            customeResponse.push(resp.responseObjList.approvedAndFailedTRN[i])
          }

          for (let item of resp.responseObjList.transactionRespList) {
            if (item.fileInfoList == null) {
            } else {
              for (let p of item.fileInfoList) {

                window.open(p.url, '_system', 'location=yes,closebuttoncaption=Fechar,enableViewportScale=no');

              }
            }

          }
          $(document).ready(function () {
            setTimeout(function () {
              // this.router.navigate(["/View-Pending-Transactions"]);
              location.reload();
            }, 3000)
          })
        } else {
          $('.page-loader-wrapper').hide();
          swal('Your transaction successfully rejected');
          this.router.navigate(["/approve-interest-waiver"]);
          $(document).ready(function () {
            setTimeout(function () {
              // this.router.navigate(["/View-Pending-Transactions"]);
              location.reload();
            }, 3000)
          })
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



  goToDetails(itemData, totaldata) {
    console.log(itemData);
    console.log(totaldata);
    console.log(controller_data);



    this.viewTransactionData = JSON.stringify(itemData);
    sessionStorage.setItem('view_transaction_data', this.viewTransactionData);

    this.totalcontroller = JSON.stringify(totaldata);
    sessionStorage.setItem("totalcontroldata", JSON.stringify(controller_data));


    if (itemData.transactionTypeName == "Interest Waiver" && itemData.transactionModeName == "Interest Waiver") {
      this.router.navigate(["View_Interest_waiver"]);
    }

  }

  homeClick() {
    this.router.navigate(['dashboard']);
  }


  allNonTrades(event) {
    this.selected = [];
    const checked = event.target.checked;
    this.temp = event.target.id.split("tablerowdata")[1];
    if (checked == true) {
      console.log("working");
     
    
      for (let i = 0; i < this.pendingTransData.length; i++) {

        $('#chequedepositDate' + this.temp).prop('disabled', false);
        $('#chequeHandoverDate' + this.temp).prop('disabled', false);

        // $("#chequedepositDate" + this.temp).focus();
        userRoleListTemp.push({
          "siteId": this.pendingTransData[i].siteId,
          "siteName": this.pendingTransData[i].siteName,
          "transactionTypeId": this.pendingTransData[i].transactionTypeId,
          "transactionModeId": this.pendingTransData[i].transactionModeId,
          "transactionTypeName": this.pendingTransData[i].transactionTypeName,
          "transactionModeName": this.pendingTransData[i].transactionModeName,
          "transactionAmount": this.pendingTransData[i].transactionAmount,
          "transactionReceiveDate": this.pendingTransData[i].transactionDate,
          "flatIds": this.pendingTransData[i].flatId,
          "bookingFormId": this.pendingTransData[i].bookingFormId,
          "finTransactionNo": this.pendingTransData[i].finTransactionNo,
          "transactionEntryId": this.pendingTransData[i].transactionEntryId,
          "transactionSetOffEntryId": 8,
          "rowId": i+1,

        });


        //  this.selected.push(this.pendingTransData[i]);

        this.pendingTransData.forEach(item => item.selected = checked);
      }
    } else {
      console.log("Not working");
      userRoleListTemp = [];
      this.pendingTransData.forEach(item => item.selected = checked);
    }


    console.log(userRoleListTemp);


  }

}
