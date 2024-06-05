import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { Http, Headers, RequestOptions, Jsonp } from '@angular/http';
declare const $: any;
declare const swal: any;
import { FormGroup, FormBuilder, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { Router, NavigationExtras, RoutesRecognized } from "@angular/router";
import { filter, pairwise } from 'rxjs/operators';
import * as moment from 'moment';

var states_value;
var selected_projectid;
var site_name;
var selected_flatid;
var temp2_forhideingbuttons;
var selected_blockid;
var flatbooking_Id;
var flatId_Id;
var totaltransactionAmount;
var controller_data = [];
var totalrecept_transactionamount = 0;
var finally_interest_waiver_amount = 0;
var finally_transaction_amount
var grand_total = 0;
@Component({
  selector: 'app-cleared-transaction-report',
  templateUrl: './cleared-transaction-report.component.html',
  styleUrls: ['./cleared-transaction-report.component.css']
})
export class ClearedTransactionReportComponent implements OnInit {
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
  flatId_Id = [];
  previousUrl: string;
  currentUrl: string;
  flatsitewise: string;
  fromdatevaluename: number;
  todatevaluename: number;
  fromdatevalue2: any;
  fromdatevaluename2: any;
  todatevalue2: any;
  todatevaluename2: any;
  milestonedemand_table2: any[];
  milestonedemand_table3: any[];
  temp_2: any;
  temp_3: any;
  milestonedemand_table_recieptList: any;
  milestonedemand_table_paymentList: any;
  milestonedemand_table2_recieptList: any;
  milestonedemand_table2_paymentList: any;
  invoiceamount_1: any;
  status_controller: any;
  grand_total: any;
  
  constructor(private cmn: CommonComponent, private http: Http, private router: Router) {
    $('.page-loader-wrapper').hide();
    sessionStorage.setItem('fromviewpagepredefined', null);
    //  this.defaultCompleteTransactionlist();
    sessionStorage.setItem('fromviewpagepredefined', null);

    this.statusdropdown();

console.log(sessionStorage.getItem("Clear_transaction_TitleName"));
console.log(sessionStorage.getItem("for_fromdate_bind"));
console.log(sessionStorage.getItem("for_todate_bind"));
    if (sessionStorage.getItem("Clear_transaction_TitleName") == "Backoption") {


      $(function () {
        // alert(sessionStorage.getItem("for_fromdate_bind"))
        // alert(sessionStorage.getItem("for_todate_bind"))
        //  sessionStorage.setItem("for_fromdate_bind", this.fromdatevalue2)
        $("#fromDate2").val(sessionStorage.getItem("for_fromdate_bind"))
        $("#toDate2").val(sessionStorage.getItem("for_todate_bind"))
      })


      this.temp_2 = sessionStorage.getItem('view_pending_transaction_data')
      this.temp_3 = sessionStorage.getItem('view_suspense_transaction_data')


      


      if (sessionStorage.getItem("status_dropdown") == undefined || sessionStorage.getItem("status_dropdown") == null || sessionStorage.getItem("status_dropdown") == "null" || sessionStorage.getItem("status_dropdown") == "undefined") {
        this.status_controller = null;
      } else {
        this.status_controller = [sessionStorage.getItem("status_dropdown")];
      }



      if (this.temp_2 !== "null") {
        
        this.backbuttonfunction2(sessionStorage.getItem("clear_Fromdate"), sessionStorage.getItem("clear_toDate"),
          sessionStorage.getItem("Siteid"), sessionStorage.getItem("Siteids"), sessionStorage.getItem("flatId_Id"), sessionStorage.getItem("flatbooking_Id"), this.status_controller);


      } else {
        //  alert("back2")

      }
      if (this.temp_3 !== "null") {
        this.backbuttonfunction3(sessionStorage.getItem("clear_Fromdate"), sessionStorage.getItem("clear_toDate"),
          sessionStorage.getItem("Siteid"), sessionStorage.getItem("Siteids"), sessionStorage.getItem("flatId_Id"), sessionStorage.getItem("flatbooking_Id"), this.status_controller);
        $(function () {
          $("#tablecomplete3").css("display", "block")
        })
      } else {

      }
      this.grandTotal_session(sessionStorage.getItem("clear_Fromdate"), sessionStorage.getItem("clear_toDate"),
      sessionStorage.getItem("Siteid"), sessionStorage.getItem("Siteids"), sessionStorage.getItem("flatId_Id"), sessionStorage.getItem("flatbooking_Id"), this.status_controller)
      this.backbuttonfunction(sessionStorage.getItem("clear_Fromdate"), sessionStorage.getItem("clear_toDate"),
        sessionStorage.getItem("Siteid"), sessionStorage.getItem("Siteids"), sessionStorage.getItem("flatId_Id"), sessionStorage.getItem("flatbooking_Id"), this.status_controller);
      

    }


  }

  ngOnInit() {




    $(function () {
      $("#clearens_card2").css("display", "none")
      $("#clearens_card3").css("display", "none")
    })
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

    $('#fromDate').on('change', function (e, date) {
      var maxDate = $('#fromDate').val();
      // $('#toDate').attr('min', maxDate);

    });


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
      $('#fromDate').on('change', function (e, date) {
        //  var maxDate = $('#fromDate').val();
        //  alert("ok")
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

      $("#StatesID").select2({
        placeholder: "--Select--",
        dir: "ltl",
      });


      // $("#BlockId").select2({
      //   placeholder: "--Select--",
      //   dir: "ltl"
      // });




      $('#StatesID').change(function (e) {
        states_value = $(e.target).val();
        if (selected_projectid == "select") {
        } else {
        }
      })







      $('#flatSelection').change(function (e) {
        selected_flatid = $(e.target).val();

        if (selected_flatid == "select") {
          flatbooking_Id = null;
          flatId_Id = null;
        } else {
          flatbooking_Id = selected_flatid.split("-")[3];
          flatId_Id = selected_flatid.split("-")[0];

        }
      })
    });

  }


  startdatefun() {
    $("#fromDate").val("");
  }

  endtimefun() {
    $("#toDate").val("");
  }


  startdatefun2() {
    $("#fromDate2").val("");
  }

  endtimefun2() {
    $("#toDate2").val("");
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

      
     
          if (sessionStorage.getItem("status_dropdown") == undefined || sessionStorage.getItem("status_dropdown") == null || sessionStorage.getItem("status_dropdown") == "null" || sessionStorage.getItem("status_dropdown") == "undefined") {
          } else {
            
            $('#StatesID').val(sessionStorage.getItem("status_dropdown"));
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




        if (sessionStorage.getItem("flatId_Id") != null || sessionStorage.getItem("flatId_Id") != "null" || sessionStorage.getItem("flatId_Id") != "undefined" || sessionStorage.getItem("flatId_Id") != undefined) {
          this.flatsitewise = JSON.parse(sessionStorage.getItem("selected_flatid"));

          $('#flatSelection').val(this.flatsitewise);
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
      "ids": [siteid],
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



        if (sessionStorage.getItem("flatId_Id") != null || sessionStorage.getItem("flatId_Id") != "null" || sessionStorage.getItem("flatId_Id") != "undefined" || sessionStorage.getItem("flatId_Id") != undefined) {
          this.flatsitewise = JSON.parse(sessionStorage.getItem("selected_flatid"));

          $('#flatSelection').val(this.flatsitewise);
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



  completedTransactions() {
    sessionStorage.setItem("for_fromdate_bind", null)
    sessionStorage.setItem("for_todate_bind", null)
    this.milestonedemand_table2_recieptList = []
    this.milestonedemand_table2_paymentList = []
    this.milestonedemand_table3 = []
    $(function () {
      //  $("#clearens_card2").css("display","none")
      // $("#clearens_card3").css("display","none")
      $("#button2").css("display", "block")
      $("#button3").css("display", "block")
    })
    if ($("#fromDate2").val() == "") {
      this.fromdatevalue2 = null;
    } else {
      this.fromdatevalue2 = $("#fromDate2").val();
      sessionStorage.setItem("for_fromdate_bind", this.fromdatevalue2)
    }

    if ($("#toDate2").val() == "") {
      this.todatevalue2 = null;
    } else {
      this.todatevalue2 = $("#toDate2").val();
      sessionStorage.setItem("for_todate_bind", this.todatevalue2)
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

    if (this.fromdatevaluename2 == null && this.todatevaluename2 == null) {
      swal("Please select any date")
      return false;
    }
    if ((this.fromdatevaluename2 != null && this.todatevaluename2 == null) || (this.fromdatevaluename2 == null && this.todatevaluename2 != null)) {

    } else {
      if (this.fromdatevaluename2 > this.todatevaluename2) {

        swal("Clearence to date should be greater than clearence from date:")
        return false;
      }
    }


    if (states_value == undefined || states_value == null || states_value == "null" || states_value == "undefined") {
      this.status_controller = null;
    } else {
      this.status_controller = [states_value];
    }

   

    sessionStorage.setItem("status_dropdown", this.status_controller);
    sessionStorage.setItem("clear_Fromdate", this.fromdatevaluename2);
    sessionStorage.setItem("clear_toDate", this.todatevaluename2);



    //     alert(this.fromdatevaluename)
    // alert(this.todatevaluename)
    // alert(this.fromdatevaluename2)
    // alert(this.todatevaluename2)
    //return false;
    $('#tablecomplete').DataTable().destroy();
    $('#tablecomplete_1').DataTable().destroy();
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/getClearedTransactionReport.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      // "siteIds": [sessionStorage.getItem("session_siteId")],
      "clearanceFromDate": this.fromdatevaluename2,
      "clearanceToDate": this.todatevaluename2,
      "requestUrl": "clearedTransactionReport",
      "stateId": this.status_controller

    }



    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
    
      $('.page-loader-wrapper').hide();
      $(function () {
        $("#clearens_card").css("display", "block")
        $("#clearens_note").css("display", "block")
        
        $("#clearens_card2").css("display", "block")
        $("#clearens_card3").css("display", "block")
      })
      if (resp.responseCode == 200) {
        // alert(this.fromdatevaluename2)
        // alert(this.todatevaluename2)

        this.milestonedemand_table_recieptList = [];
        this.milestonedemand_table_paymentList = [];
        //   $("#tableExportvthdates").show()
        //   $("#tableExport").hide()

        //  $("#milestone_blocks_tables").show();

        // this.milestonedemand_table = resp.responseObjList;
        this.milestonedemand_table_recieptList = resp.responseObjList.recieptList
        this.milestonedemand_table_paymentList = resp.responseObjList.paymentList
       this.grandTotal()

        setTimeout(function () {
          $(document).ready(function () {
            $('#tablecomplete_1').DataTable({
              pageLength: 5,
              lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todos']],
              dom: 'Bfrltip',
              buttons: [
                'copy', 'csv', 'excel', 'print', {
                  extend: 'pdfHtml5',
                  orientation: 'landscape',
                  pageSize: 'LEGAL'
                }
              ],

              "ordering": false,
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

              


                totaltransactionAmount = 0;
                totalrecept_transactionamount = 0;
                finally_interest_waiver_amount = 0;
                controller_data = [];

                if (display.length == 0) {
                  $('#invoiceamount2').html(0);
                } else {
                  for (var j = 0; j < display.length; j++) {


                    totalrecept_transactionamount += parseFloat(data[display[j]][2].replace(/\,/g, ''));

                    const fmt = require('indian-number-format');
                   


                    $('#invoiceamount2').html(fmt.format(Number(totalrecept_transactionamount.toFixed(2))));
                    //controller_data.push(resp.responseObjList.finTransactionEntryResponseList[display[j]]);
                  }

            
                }

              },
            });

          });
        }, 2000);

        setTimeout(function () {
          $(document).ready(function () {
            $('#tablecomplete').DataTable({
              pageLength: 5,
              lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todos']],
              dom: 'Bfrltip',
              buttons: [
                'copy', 'csv', 'excel', 'print', {
                  extend: 'pdfHtml5',
                  orientation: 'landscape',
                  pageSize: 'LEGAL'
                }
              ],

              "ordering": false,
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

               


                totaltransactionAmount = 0;
                totalrecept_transactionamount = 0;
                finally_interest_waiver_amount = 0;
                controller_data = [];

                if (display.length == 0) {
                  $('#invoiceamount1').html(0);
                } else {
                  for (var j = 0; j < display.length; j++) {


                    totalrecept_transactionamount += parseFloat(data[display[j]][2].replace(/\,/g, ''));
                    const fmt = require('indian-number-format');
                    

                    grand_total = grand_total + totalrecept_transactionamount;
                    console.log("-----------"+grand_total)
                    $('#invoiceamount1').html(fmt.format(Number(totalrecept_transactionamount.toFixed(2))));
                    // this.invoiceamount_1 = Number(totalrecept_transactionamount).toFixed(2)
                    // alert(this.invoiceamount_1)
                    //controller_data.push(resp.responseObjList.finTransactionEntryResponseList[display[j]]);
                  }

                  
                }

              },

            });

          });
        }, 2000);

    

        sessionStorage.setItem("Siteid", sessionStorage.getItem("session_siteId"));
        sessionStorage.setItem("Siteids", JSON.stringify(this.selected_projectid));
        sessionStorage.setItem("flatId_Id", JSON.stringify(this.flatId_Id));
        sessionStorage.setItem("flatbooking_Id", JSON.stringify(this.flatbooking_Id));
        sessionStorage.setItem("selected_flatid", JSON.stringify(selected_flatid));
        sessionStorage.setItem("Clear_transaction_TitleName", "Backoption");

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
  // completedTransactions_second(){
  //   if (sessionStorage.getItem("Clear_transaction_TitleName") == "Backoption") {
  //     this.backbuttonfunction2(sessionStorage.getItem("clear_Fromdate"), sessionStorage.getItem("clear_toDate"),
  //     sessionStorage.getItem("Siteid"), sessionStorage.getItem("Siteids"), sessionStorage.getItem("flatId_Id"), sessionStorage.getItem("flatbooking_Id"));

  //   }else{
  //     this.completedTransactions2()
  //   }
  // }
  completedTransactions2() {


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

    if (this.fromdatevaluename2 == null && this.todatevaluename2 == null) {
      swal("Please select any date")
      return false;
    }
    if ((this.fromdatevaluename2 != null && this.todatevaluename2 == null) || (this.fromdatevaluename2 == null && this.todatevaluename2 != null)) {

    } else {
      if (this.fromdatevaluename2 > this.todatevaluename2) {

        swal("To date should be greater than From date:")
        return false;
      }
    }

    if (states_value == undefined || states_value == null || states_value == "null" || states_value == "undefined") {
      this.status_controller = null;
    } else {
      this.status_controller = [states_value];
    }
    sessionStorage.setItem("status_dropdown", this.status_controller);

    sessionStorage.setItem("clear_Fromdate", this.fromdatevaluename2);
    sessionStorage.setItem("clear_toDate", this.todatevaluename2);

    $('#tablecomplete2').DataTable().destroy();
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/getPendingTransactionReport.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      // "siteIds": [sessionStorage.getItem("session_siteId")],
      "receivedFromDate": this.fromdatevaluename2,
      "receivedToDate": this.todatevaluename2,
      "requestUrl": "pendingTransactionReport",
      "stateId": this.status_controller


    }

   

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
     
      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 200) {
        $("#button2").hide()
        

       
        this.milestonedemand_table2_recieptList = []
        this.milestonedemand_table2_paymentList = []

        this.milestonedemand_table2_recieptList = resp.responseObjList.recieptList
        this.milestonedemand_table2_paymentList = resp.responseObjList.paymentList

       

        setTimeout(function () {
          $(document).ready(function () {
            $('#tablecomplete2').DataTable({
              pageLength: 5,
              lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todos']],
              dom: 'Bfrltip',
              buttons: [
                'copy', 'csv', 'excel', 'print', {
                  extend: 'pdfHtml5',
                  orientation: 'landscape',
                  pageSize: 'LEGAL'
                }
              ],

              "ordering": false,
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

              


                totaltransactionAmount = 0;
                totalrecept_transactionamount = 0;
                finally_interest_waiver_amount = 0;
                controller_data = [];

                if (display.length == 0) {
                  $('#invoiceamount3').html(0);
                } else {
                  for (var j = 0; j < display.length; j++) {


                    totalrecept_transactionamount += parseFloat(data[display[j]][2].replace(/\,/g, ''));

                    const fmt = require('indian-number-format');
                  


                    $('#invoiceamount3').html(fmt.format(Number(totalrecept_transactionamount.toFixed(2))));
                    
                  }

                  
                }

              },
            });

          });
        }, 2000);
        setTimeout(function () {
          $(document).ready(function () {
            $('#tablecomplete2_2').DataTable({
              pageLength: 5,
              lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todos']],
              dom: 'Bfrltip',
              buttons: [
                'copy', 'csv', 'excel', 'print', {
                  extend: 'pdfHtml5',
                  orientation: 'landscape',
                  pageSize: 'LEGAL'
                }
              ],

              "ordering": false,
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

              


                totaltransactionAmount = 0;
                totalrecept_transactionamount = 0;
                finally_interest_waiver_amount = 0;
                controller_data = [];

                if (display.length == 0) {
                  $('#invoiceamount4').html(0);
                } else {
                  for (var j = 0; j < display.length; j++) {


                    totalrecept_transactionamount += parseFloat(data[display[j]][2].replace(/\,/g, ''));

                    const fmt = require('indian-number-format');
                  


                    $('#invoiceamount4').html(fmt.format(Number(totalrecept_transactionamount.toFixed(2))));
                    
                  }

                 
                }

              },
            });

          });
        }, 2000);

       

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

  completedTransactions3() {


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

    if (this.fromdatevaluename2 == null && this.todatevaluename2 == null) {
      swal("Please select any date")
      return false;
    }
    if ((this.fromdatevaluename2 != null && this.todatevaluename2 == null) || (this.fromdatevaluename2 == null && this.todatevaluename2 != null)) {

    } else {
      if (this.fromdatevaluename2 > this.todatevaluename2) {

        swal("To date should be greater than From date:")
        return false;
      }
    }


    if (states_value == undefined || states_value == null || states_value == "null" || states_value == "undefined") {
      this.status_controller = null;
    } else {
      this.status_controller = [states_value];
    }
    sessionStorage.setItem("status_dropdown", this.status_controller);

    sessionStorage.setItem("clear_Fromdate", this.fromdatevaluename2);
    sessionStorage.setItem("clear_toDate", this.todatevaluename2);
    //     alert(this.fromdatevaluename)
    // alert(this.todatevaluename)
    // alert(this.fromdatevaluename2)
    // alert(this.todatevaluename2)
    //return false;
    $('#tablecomplete3').DataTable().destroy();
    sessionStorage.setItem("clear_Fromdate", this.fromdatevaluename2);
    sessionStorage.setItem("clear_toDate", this.todatevaluename2);
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/getSuspnesEntryTransactionReport.spring";
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      // "siteIds": [sessionStorage.getItem("session_siteId")],
      "receivedFromDate": this.fromdatevaluename2,
      "receivedToDate": this.todatevaluename2,
      "requestUrl": "getSuspnesEntryTransactionReport",
      "stateId": this.status_controller


    }

  

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
    
      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 200) {

        // alert(this.fromdatevaluename2)
        // alert(this.todatevaluename2)

        this.milestonedemand_table3 = [];
        //   $("#tableExportvthdates").show()
        $("#button3").hide()

        //  $("#milestone_blocks_tables").show();

        this.milestonedemand_table3 = resp.responseObjList;


        setTimeout(function () {
          $(document).ready(function () {
            $('#tablecomplete3').DataTable({
              pageLength: 5,
              lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todos']],
              dom: 'Bfrltip',
              buttons: [
                'copy', 'csv', 'excel', 'print', {
                  extend: 'pdfHtml5',
                  orientation: 'landscape',
                  pageSize: 'LEGAL'
                }
              ],

              "ordering": false,
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

              


                totaltransactionAmount = 0;
                totalrecept_transactionamount = 0;
                finally_interest_waiver_amount = 0;
                controller_data = [];

                if (display.length == 0) {
                  $('#invoiceamount5').html(0);
                } else {
                  for (var j = 0; j < display.length; j++) {


                    totalrecept_transactionamount += parseFloat(data[display[j]][2].replace(/\,/g, ''));

                    const fmt = require('indian-number-format');
                   


                    $('#invoiceamount5').html(fmt.format(Number(totalrecept_transactionamount.toFixed(2))));
                    
                  }

                  
                }

              },
            });

          });
        }, 2000);


       

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
  goToDetails(itemData) {
    //sessionStorage.setItem("Clear_transaction_TitleName", null)
    this.viewTransactionData = JSON.stringify(itemData);
    sessionStorage.setItem('view_clreared_transaction_data', this.viewTransactionData);
    this.router.navigate(["View-Completed-Transactions"]);
    

  }
  goToDetails2(itemData) {
    this.viewTransactionData = JSON.stringify(itemData);
    sessionStorage.setItem('view_pending_transaction_data', this.viewTransactionData);
    this.router.navigate(["View-Pending-Transactions-Status"]);


  }

  goToDetails3(itemData) {
    this.viewTransactionData = JSON.stringify(itemData);
    sessionStorage.setItem('view_suspense_transaction_data', this.viewTransactionData);
    this.router.navigate(["crm-view-anonymous-entries"]);


  }
  homeClick() {
    this.cmn.commonHomeNavigation();
  }

  attachmentlink(link) {

    window.open(link, '_system', 'location=yes,closebuttoncaption=Fechar,enableViewportScale=no');

  }




  backbuttonfunction(Fromdate: any, toDate: any, Siteid: any, Siteids: any, flatId_Id: any, flatbooking_Id: any, status_controller: any) {

    if (Fromdate == "null") {
      Fromdate = null;
    }

    if (toDate == "null") {
      toDate = null;
    }


    // $('#tablecomplete').DataTable().destroy();
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/getClearedTransactionReport.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      // "siteIds": [sessionStorage.getItem("session_siteId")],
      "clearanceFromDate": Fromdate,
      "clearanceToDate": toDate,
      "requestUrl": "clearedTransactionReport",
      "stateId": status_controller



    }

  

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

     
      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 200) {
        $(function () {
          $("#clearens_card").css("display", "block")
          $("#clearens_note").css("display", "block")
          
          $("#clearens_card2").css("display", "block")
          $("#clearens_card3").css("display", "block")
        })
        this.milestonedemand_table_recieptList = [];
        this.milestonedemand_table_paymentList = [];
       
        this.milestonedemand_table_recieptList = resp.responseObjList.recieptList
        this.milestonedemand_table_paymentList = resp.responseObjList.paymentList
       

        

        this.milestonedemand_table = resp.responseObjList;

      


        setTimeout(function () {
          $(document).ready(function () {
            $('#tablecomplete').DataTable({
              pageLength: 5,
              lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todos']],
              dom: 'Bfrltip',
              buttons: [
                'copy', 'csv', 'excel', 'print', {
                  extend: 'pdfHtml5',
                  orientation: 'landscape',
                  pageSize: 'LEGAL'
                }
              ],

              "ordering": false,
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

                


                totaltransactionAmount = 0;
                totalrecept_transactionamount = 0;
                finally_interest_waiver_amount = 0;
                controller_data = [];

                if (display.length == 0) {
                  $('#invoiceamount1').html(0);
                } else {
                  for (var j = 0; j < display.length; j++) {


                    totalrecept_transactionamount += parseFloat(data[display[j]][2].replace(/\,/g, ''));

                    const fmt = require('indian-number-format');
                   


                    $('#invoiceamount1').html(fmt.format(Number(totalrecept_transactionamount.toFixed(2))));
                   
                    this.invoiceamount_1 = Number(totalrecept_transactionamount).toFixed(2)
                   
                  }

                  
                }

              },
            });

          });
        }, 2000);

        setTimeout(function () {
          $(document).ready(function () {
            $('#tablecomplete_1').DataTable({
              pageLength: 5,
              lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todos']],
              dom: 'Bfrltip',
              buttons: [
                'copy', 'csv', 'excel', 'print', {
                  extend: 'pdfHtml5',
                  orientation: 'landscape',
                  pageSize: 'LEGAL'
                }
              ],

              "ordering": false,
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



                totaltransactionAmount = 0;
                totalrecept_transactionamount = 0;
                finally_interest_waiver_amount = 0;
                controller_data = [];

                if (display.length == 0) {
                  $('#invoiceamount2').html(0);
                } else {
                  for (var j = 0; j < display.length; j++) {


                    totalrecept_transactionamount += parseFloat(data[display[j]][2].replace(/\,/g, ''));

                    const fmt = require('indian-number-format');
                


                    $('#invoiceamount2').html(fmt.format(Number(totalrecept_transactionamount.toFixed(2))));
                   
                  }

                
                }

              },
            });

          });
        }, 2000);

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

  backbuttonfunction2(Fromdate: any, toDate: any, Siteid: any, Siteids: any, flatId_Id: any, flatbooking_Id: any, status_controller: any) {
  
    if (Fromdate == "null") {
      Fromdate = null;
    }

    if (toDate == "null") {
      toDate = null;
    }


    // $('#tablecomplete').DataTable().destroy();
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/getPendingTransactionReport.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      // "siteIds": [sessionStorage.getItem("session_siteId")],
      "receivedFromDate": Fromdate,
      "receivedToDate": toDate,
      "requestUrl": "pendingTransactionReport",
      "stateId": status_controller



    }

   

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

     
      $('.page-loader-wrapper').hide();
      
      if (resp.responseCode == 200) {
        $(function () {
          // alert("entered")
          $("#button2").hide()
          $("#clearens_card").css("display", "block")
          $("#clearens_note").css("display", "block")
          $("#clearens_card2").css("display", "block")
          $("#clearens_card3").css("display", "block")
         
        })


        this.milestonedemand_table2_recieptList = []
        this.milestonedemand_table2_paymentList = []

        this.milestonedemand_table2_recieptList = resp.responseObjList.recieptList
        this.milestonedemand_table2_paymentList = resp.responseObjList.paymentList

     


        setTimeout(function () {
          $(document).ready(function () {
            $('#tablecomplete2').DataTable({
              pageLength: 5,
              lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todos']],
              dom: 'Bfrltip',
              buttons: [
                'copy', 'csv', 'excel', 'print', {
                  extend: 'pdfHtml5',
                  orientation: 'landscape',
                  pageSize: 'LEGAL'
                }
              ],

              "ordering": false,
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

             


                totaltransactionAmount = 0;
                totalrecept_transactionamount = 0;
                finally_interest_waiver_amount = 0;
                controller_data = [];

                if (display.length == 0) {
                  $('#invoiceamount3').html(0);
                } else {
                  for (var j = 0; j < display.length; j++) {


                    totalrecept_transactionamount += parseFloat(data[display[j]][2].replace(/\,/g, ''));

                    const fmt = require('indian-number-format');
                  


                    $('#invoiceamount3').html(fmt.format(Number(totalrecept_transactionamount.toFixed(2))));
                  
                  }

                 
                }

              },
            });

          });
        }, 2000);

        setTimeout(function () {
          $(document).ready(function () {
            $('#tablecomplete2_2').DataTable({
              pageLength: 5,
              lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todos']],
              dom: 'Bfrltip',
              buttons: [
                'copy', 'csv', 'excel', 'print', {
                  extend: 'pdfHtml5',
                  orientation: 'landscape',
                  pageSize: 'LEGAL'
                }
              ],

              "ordering": false,
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

            


                totaltransactionAmount = 0;
                totalrecept_transactionamount = 0;
                finally_interest_waiver_amount = 0;
                controller_data = [];

                if (display.length == 0) {
                  $('#invoiceamount4').html(0);
                } else {
                  for (var j = 0; j < display.length; j++) {


                    totalrecept_transactionamount += parseFloat(data[display[j]][2].replace(/\,/g, ''));

                    const fmt = require('indian-number-format');
                   

                    $('#invoiceamount4').html(fmt.format(Number(totalrecept_transactionamount.toFixed(2))));
                    
                  }

                 
                }

              },
            });

          });
        }, 2000);

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

  backbuttonfunction3(Fromdate: any, toDate: any, Siteid: any, Siteids: any, flatId_Id: any, flatbooking_Id: any, status_controller: any) {

    if (Fromdate == "null") {
      Fromdate = null;
    }

    if (toDate == "null") {
      toDate = null;
    }


    // $('#tablecomplete').DataTable().destroy();
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/getSuspnesEntryTransactionReport.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      // "siteIds": [sessionStorage.getItem("session_siteId")],
      "receivedFromDate": Fromdate,
      "receivedToDate": toDate,
      "requestUrl": "getSuspnesEntryTransactionReport",
      "stateId": status_controller



    }



    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

     
      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 200) {
        $(function () {
          $("#button3").hide()
          $("#clearens_card").css("display", "block")
          $("#clearens_note").css("display", "block")
          $("#clearens_card2").css("display", "block")
          $("#clearens_card3").css("display", "block")
        })
        this.milestonedemand_table3 = [];
       

        this.milestonedemand_table3 = resp.responseObjList;

     


        setTimeout(function () {
          $(document).ready(function () {
            $('#tablecomplete3').DataTable({
              pageLength: 5,
              lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todos']],
              dom: 'Bfrltip',
              buttons: [
                'copy', 'csv', 'excel', 'print', {
                  extend: 'pdfHtml5',
                  orientation: 'landscape',
                  pageSize: 'LEGAL'
                }
              ],

              "ordering": false,
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

              


                totaltransactionAmount = 0;
                totalrecept_transactionamount = 0;
                finally_interest_waiver_amount = 0;
                controller_data = [];

                if (display.length == 0) {
                  $('#invoiceamount5').html(0);
                } else {
                  for (var j = 0; j < display.length; j++) {


                    totalrecept_transactionamount += parseFloat(data[display[j]][2].replace(/\,/g, ''));


                    const fmt = require('indian-number-format');
               


                    $('#invoiceamount5').html(fmt.format(Number(totalrecept_transactionamount.toFixed(2))));
                   
                  }

                 
                }

              },
            });

          });
        }, 2000);



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
  /*------------------------Transaction type start-------------------*/
  transactionTypeAndMode() {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/viewFinTransactionTypeModeData.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "condition": "fetchTransactionData",
      "actionUrl": "ApproveTransaction"
    }
   
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#transactiontypeId').html('');
        $('#transactiontypeId').append('<option value="select">--Select--</option>');
        
        for (var i = 0; i < resp.responseObjList.finTrnasactionTypeResponseList.length; i++) {
          $('#transactiontypeId').append("<option value='" + resp.responseObjList.finTrnasactionTypeResponseList[i].transactionTypeId + "'>" + resp.responseObjList.finTrnasactionTypeResponseList[i].name + "</option>");
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

  projectchangeFun_remainDropdowndata(id, text) {
    $('.page-loader-wrapper').show();

    let url = this.cmn.commonUrl + "financial/loadTransactionStatusData.spring";


    let headers = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteId": id,
      "siteName": text,
      "flatIds": [],
      "bookingFormIds": [],
      "requestUrl": "CompletedTransaction"
    }

  
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 200) {
        $('#setoffID').html("");
        $('#setoffID').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.paymentSetOffData.length; i++) {
          $('#setoffID').append("<option value='" + resp.responseObjList.paymentSetOffData[i].value + "'>" + resp.responseObjList.paymentSetOffData[i].key + "</option>");
        }
      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        swal(resp.errors[0]);
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
//Grand Total
grandTotal() {


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

  // if (this.fromdatevaluename2 == null && this.todatevaluename2 == null) {
  //   swal("Please select any date")
  //   return false;
  // }
  // if ((this.fromdatevaluename2 != null && this.todatevaluename2 == null) || (this.fromdatevaluename2 == null && this.todatevaluename2 != null)) {

  // } else {
  //   if (this.fromdatevaluename2 > this.todatevaluename2) {

  //     swal("To date should be greater than From date:")
  //     return false;
  //   }
  // }

  if (states_value == undefined || states_value == null || states_value == "null" || states_value == "undefined") {
    this.status_controller = null;
  } else {
    this.status_controller = [states_value];
  }
  sessionStorage.setItem("status_dropdown", this.status_controller);

  sessionStorage.setItem("clear_Fromdate", this.fromdatevaluename2);
  sessionStorage.setItem("clear_toDate", this.todatevaluename2);

 // $('#tablecomplete2').DataTable().destroy();
 // $('.page-loader-wrapper').show();
  let url = this.cmn.commonUrl + "financial/getTransactionMonthlyReportGrandtotal.spring";
  //http://106.51.38.64:8888/SumadhuraGateway/employeeservice/financial/getTransactionMonthlyReportGrandtotal.spring

  let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers });
  var body = {
    "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
    // "siteIds": [sessionStorage.getItem("session_siteId")],
    "clearanceFromDate": this.fromdatevaluename2,
    "clearanceToDate": this.todatevaluename2,
    "requestUrl": "clearedTransactionReport",
    "stateId": this.status_controller


  }
console.log(JSON.stringify(body))
 

  this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
   console.log("Grand Total :"+JSON.stringify(resp))
  //  $('.page-loader-wrapper').hide();

    if (resp.responseCode == 200) {
    //  $("#button2").hide()
    this.grand_total = resp.responseObjList.grandTotalAmount;

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


grandTotal_session(Fromdate: any, toDate: any, Siteid: any, Siteids: any, flatId_Id: any, flatbooking_Id: any, status_controller: any) {
  if (Fromdate == "null") {
    Fromdate = null;
  }

  if (toDate == "null") {
    toDate = null;
  }

  let url = this.cmn.commonUrl + "financial/getTransactionMonthlyReportGrandtotal.spring";
  //http://106.51.38.64:8888/SumadhuraGateway/employeeservice/financial/getTransactionMonthlyReportGrandtotal.spring

  let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers });
  var body = {
    "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
    // "siteIds": [sessionStorage.getItem("session_siteId")],
    "clearanceFromDate": Fromdate,
    "clearanceToDate": toDate,
    "requestUrl": "clearedTransactionReport",
    "stateId": status_controller



  }
console.log(JSON.stringify(body))
 

  this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
   console.log("Grand Total :"+JSON.stringify(resp))
  //  $('.page-loader-wrapper').hide();

    if (resp.responseCode == 200) {
    //  $("#button2").hide()
    this.grand_total = resp.responseObjList.grandTotalAmount;

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

onlyNumberKey(event) {
  return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
}
}
