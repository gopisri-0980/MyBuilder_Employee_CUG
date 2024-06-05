import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { RequestOptions, Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
declare const $: any;
declare const swal: any;
var buttonType;
var optionalButtonType;
var userRoleListTemp = [];
var maindivarray = [];
var userRoleListTemp1 = [];
var body;
var temp;
@Component({
  selector: 'app-modify-transaction',
  templateUrl: './modify-transaction.component.html',
  styleUrls: ['./modify-transaction.component.sass']
})
export class ModifyTransactionComponent implements OnInit {
  pendingTransData: any;
  viewTransactionData: any;
  userRoleListToSave: any = [];
  controller = [];
  ischecked: any;
  ChequeClearanceDate: any;
  arrOfObj: { name: string; }[];
  injectObj: {};
  buttonType: string;
  newArrOfObjval: any = [];
  optionalButtonType: string;
  approvebtns_showHide: boolean = true;
  checkboxes: any;
  chequedepositeDate_showHide: boolean = false
  chequedepositDateDate: any;
  search_showHide: boolean = true;
  depidval: boolean = false;
  flatdetailsData: any;
  depositedateval: any;
  Array: string[] = [];
  temp: any;
  isDisabled: boolean = true;

  constructor(private cmn: CommonComponent, private http: Http, private router: Router) {
    sessionStorage.setItem('fromviewpagepredefined', null);
    $('.page-loader-wrapper').hide();
    if (sessionStorage.getItem("session_deptName") == "ACCOUNTS") {
      this.chequedepositeDate_showHide = true;

    }
    this.transactionTypeAndMode();
    if (sessionStorage.getItem("Modi_status") == "true") {
      this.getPenidngTransactions("search", sessionStorage.getItem("Modi_transaction_type"), sessionStorage.getItem("Modi_transaction_mode"));
    } else {
      this.getPenidngTransactions("default", null, null);
    }



  }

  ngOnInit() {
    if (sessionStorage.getItem("session_deptName") == "ACCOUNTS") {

      this.depidval = true;
    }
    $(function () {

      $('#chequedepositDate').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
        minDate: new Date(),
        clearButton: true,
        weekStart: 1,
        time: false
      });

      $('#chequereflectionDate').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
        minDate: new Date(),
        clearButton: true,
        weekStart: 1,
        time: false
      });
    })



    $("#transaction_type").select2({
      placeholder: "Search transaction type",
      dir: "ltl"
    });
    $("#transaction_mode").select2({
      placeholder: "Search transaction mode",
      dir: "ltl"
    });

    $('#transaction_type').change(function (e) {
      sessionStorage.removeItem("Modi_transaction_type");
    });

    $('#transaction_mode').change(function (e) {
      sessionStorage.removeItem("Modi_transaction_mode");
    });






  }

  /*--------------------------Pending transactions table start------------------*/

  getPenidngTransactions(search_default_val, transaction_type, transaction_mode) {
    $('#viewpendingdata').DataTable().destroy();
    this.pendingTransData = []
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/viewMisPendingTransactions.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body;
    if (search_default_val == "default") {
      body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "condition": "modifyTransaction",

      }
    } else {
      body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "condition": "modifyTransaction",
        "transactionTypeId": transaction_type,
        "transactionModeId": transaction_mode
      }

      sessionStorage.setItem("Modi_transaction_type", transaction_type);
      sessionStorage.setItem("Modi_transaction_mode", transaction_mode);
      sessionStorage.setItem("Modi_status", "true");

    }
    console.log(body);
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      console.log(resp);
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        this.pendingTransData = [];
        this.pendingTransData = resp.responseObjList.finTransactionEntryResponseList;
        if (this.pendingTransData == null || this.pendingTransData == "" || this.pendingTransData == "null") {
          this.chequedepositeDate_showHide = false;
          this.approvebtns_showHide = false;
          this.search_showHide = false;
        } else {
          this.approvebtns_showHide = true;
        }

        setTimeout(function () {
          $(document).ready(function () {
            $('#viewpendingdata').DataTable({
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
              }

            });
          });

        }, 2000)




        $(function () {
          var pendingTransDetails = resp.responseObjList.finTransactionEntryResponseList;

          for (var i = 0; i < pendingTransDetails.length; i++) {
            var d = new Date(pendingTransDetails[i].chequeOrOnlineDate);
            // var dateToStr = d.toUTCString().split(' ');
            var datestring = d.getFullYear() + "/" + ("0" + (d.getMonth() + 1)).slice(-2) + "/" + ("0" + d.getDate()).slice(-2);
            // var date = new Date().getMonth();
            //  var minimumdate = new Date().setMonth(date - 3);
            //  var maximumdate = new Date().setMonth(date + 3);
            $('#chequedepositDate' + (i + 1)).bootstrapMaterialDatePicker({
              format: 'YYYY-MM-DD',
              minDate: new Date(datestring),
              maxDate: new Date(),
              clearButton: true,
              weekStart: 1,
              time: false
            });

            $('#chequereflectionDate' + (i + 1)).bootstrapMaterialDatePicker({
              format: 'YYYY-MM-DD',
              minDate: new Date(datestring),
              maxDate: new Date(),
              clearButton: true,
              weekStart: 1,
              time: false
            });


            $('#chequedepositDate' + (i + 1)).bootstrapMaterialDatePicker({ weekStart: 0, time: false }).on('change', function (e, date) {

            });

          }

        });

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
  /*--------------------------Mile stone table details End------------------*/

  goToDetails(itemData) {
    this.viewTransactionData = JSON.stringify(itemData);
    sessionStorage.setItem('view_transaction_data', this.viewTransactionData);

    if (itemData.transactionTypeName == "Receipt" && itemData.transactionModeName == "Cheque") {
      if (sessionStorage.getItem("session_deptid") == '997') {
        sessionStorage.setItem('sessionFor_receiptCheque', 'receiptCheque');
        this.router.navigate(["Receipt-Cheque"]);
        return false;
      } else if (sessionStorage.getItem("session_deptid") == '995') {
        this.router.navigate(["modify-crm-receipt-cheque-view"]);
      } else {
        this.router.navigate(["modify-crm-receipt-cheque-view"]);
        // this.router.navigate(["Receipt-Cheque"]);
      }
    } else if (itemData.transactionTypeName == "Receipt" && itemData.transactionModeName == "TDS") {
      this.router.navigate(["modify-receipt-tds-view"]);
    } else if (itemData.transactionTypeName == "Receipt" && itemData.transactionModeName == "Online") {
      if (sessionStorage.getItem("session_deptid") == '995') {
        this.router.navigate(["modify-crm-receipt-online-view"]);
        return false;
      } else if (sessionStorage.getItem("session_deptid") == '993') {
        this.router.navigate(["modify-crm-receipt-online-view"]);
        return false;
      } else {
        this.router.navigate(["Receipt-Online"]);
      }
    } else if ((itemData.transactionTypeName == "Payment" && itemData.transactionModeName == "Cheque") || (itemData.transactionTypeName == "Payment" && itemData.transactionModeName == "Online")) {
      if (sessionStorage.getItem("session_deptid") == '995') {
        this.router.navigate(["modify-crm-receipt-payment-view"]);
      } else if (sessionStorage.getItem("session_deptid") == '993') {
        this.router.navigate(["modify-crm-receipt-payment-view"]);
        return false;
      } else {
        this.router.navigate(["Payment-Cheque"]);
      }
    } else if (itemData.transactionTypeName == "Receipt" && itemData.transactionModeName == "waived off") {

      this.router.navigate(["Approve_Waive-Off"]);

    }


  }



  homeClick() {
    this.router.navigate(['dashboard']);
  }


  toggleVisibility(event, item) {

    console.log(event);
    console.log(item);


    this.temp = event.target.id.split("tablerowdata")[1];
    if (event.target.checked == true) {
      $('#chequedepositDate' + this.temp).prop('disabled', false);
      $('#chequereflectionDate' + this.temp).prop('disabled', false);

      // $("#chequedepositDate" + this.temp).focus();
      userRoleListTemp.push({
        "siteId": item.siteId,
        "siteName": item.siteName,
        "transactionTypeId": item.transactionTypeId,
        "transactionModeId": item.transactionModeId,
        "transactionTypeName": item.transactionTypeName,
        "transactionModeName": item.transactionModeName,
        "transactionAmount": item.transactionAmount,
        "transactionReceiveDate": item.transactionReceiveDate,
        "flatIds": item.flatId,
        "bookingFormId": item.bookingFormId,
        "finTransactionNo": item.finTransactionNo,
        "transactionEntryId": item.transactionEntryId,
        "transactionSetOffEntryId": 8,
        "rowId": this.temp,

        "challanNo": item.challanNo,
        "bsrCode": item.bsrCode,
        "ackNo": item.ackNo,
        "transactionDate": item.transactionDate,


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
        "transactionReceiveDate": item.transactionReceiveDate,
        "flatIds": item.flatId,
        "bookingFormId": item.bookingFormId,
        "finTransactionNo": item.finTransactionNo,
        "transactionEntryId": item.transactionEntryId,
        "transactionSetOffEntryId": 8,
        "challanNo": item.challanNo,
        "bsrCode": item.bsrCode,
        "ackNo": item.ackNo,
        "transactionDate": item.transactionDate,

      });
      userRoleListTemp.splice(index, 1);
      $('#chequedepositDate' + this.temp).prop('disabled', true);
      $('#chequereflectionDate' + this.temp).prop('disabled', true);

      //$('#chequedepositDate' + this.temp).val("");
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
      var temp_tdsreflectionDate;
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
          if ($("#chequereflectionDate" + userRoleListTemp[i].rowId).val() == "") {
            temp_tdsreflectionDate = null;
            swal("Please select reflection date");
            return false;
          } else {
            temp_tdsreflectionDate = new Date($("#chequereflectionDate" + userRoleListTemp[i].rowId).val()).getTime()
          }
        } else {
          temp_chequedepositDate = null;
          temp_tdsreflectionDate = null;
        }



        maindivarray.push({
          "siteId": userRoleListTemp[i].siteId,
          "siteName": userRoleListTemp[i].siteName,
          "transactionTypeId": userRoleListTemp[i].transactionTypeId,
          "transactionModeId": userRoleListTemp[i].transactionModeId,
          "transactionTypeName": userRoleListTemp[i].transactionTypeName,
          "transactionModeName": userRoleListTemp[i].transactionModeName,
          "transactionAmount": userRoleListTemp[i].transactionAmount,
          "transactionReceiveDate":  userRoleListTemp[i].transactionDate,
          "flatIds": [userRoleListTemp[i].flatIds],
          "bookingFormId": userRoleListTemp[i].bookingFormId,
          "finTransactionNo": userRoleListTemp[i].finTransactionNo,
          "transactionEntryId": userRoleListTemp[i].transactionEntryId,
          "transactionSetOffEntryId": 8,
          "chequeDepositedDate": temp_chequedepositDate,
          "challanReflectionDate": temp_tdsreflectionDate,
          "buttonType": userRoleListTemp[i].buttonType,

          "challanNo": userRoleListTemp[i].challanNo,
          "bsrCode": userRoleListTemp[i].bsrCode,
          "ackNo": userRoleListTemp[i].ackNo,
          "transactionDate": userRoleListTemp[i].transactionDate,



        });
      }

    } else {

      maindivarray = [];
      for (var i = 0; i < userRoleListTemp.length; i++) {
        maindivarray.push({
          "siteId": userRoleListTemp[i].siteId,
          "siteName": userRoleListTemp[i].siteName,
          "transactionTypeId": userRoleListTemp[i].transactionTypeId,
          "transactionModeId": userRoleListTemp[i].transactionModeId,
          "transactionTypeName": userRoleListTemp[i].transactionTypeName,
          "transactionModeName": userRoleListTemp[i].transactionModeName,
          "transactionAmount": userRoleListTemp[i].transactionAmount,
          "transactionReceiveDate":  userRoleListTemp[i].transactionDate,
          "flatIds": [userRoleListTemp[i].flatIds],
          "bookingFormId": userRoleListTemp[i].bookingFormId,
          "finTransactionNo": userRoleListTemp[i].finTransactionNo,
          "transactionEntryId": userRoleListTemp[i].transactionEntryId,
          "transactionSetOffEntryId": 8,
          "buttonType": userRoleListTemp[i].buttonType,
          "challanNo": userRoleListTemp[i].challanNo,
          "bsrCode": userRoleListTemp[i].bsrCode,
          "ackNo": userRoleListTemp[i].ackNo,
          "transactionDate": userRoleListTemp[i].transactionDate,



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

    console.log(JSON.stringify(body));


    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      console.log(JSON.stringify(resp));
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
                // window.open(p.url, "_blank");
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
          swal('Your transaction successfully rejected');
          this.router.navigate(["/View-Pending-Transactions"]);
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
        $('#transaction_type').html('');
        $('#transaction_type').append('<option value="select">--Select--</option>');
        $('#transaction_mode').html('');
        $('#transaction_mode').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.finTrnasactionTypeResponseList.length; i++) {
          $('#transaction_type').append("<option value='" + resp.responseObjList.finTrnasactionTypeResponseList[i].transactionTypeId + "'>" + resp.responseObjList.finTrnasactionTypeResponseList[i].name + "</option>");
        }

        for (var i = 0; i < resp.responseObjList.finTransactionModeResponseList.length; i++) {
          $('#transaction_mode').append("<option value='" + resp.responseObjList.finTransactionModeResponseList[i].transactionModeId + "'>" + resp.responseObjList.finTransactionModeResponseList[i].name + "</option>");

        }

        if (sessionStorage.getItem("Modi_transaction_type") != undefined && sessionStorage.getItem("Modi_transaction_type") != "" && sessionStorage.getItem("Modi_transaction_type") != "select" && sessionStorage.getItem("Modi_transaction_type") != "undefined") {
          $('#transaction_type').val(JSON.parse(sessionStorage.getItem("Modi_transaction_type")));
        }
        if (sessionStorage.getItem("Modi_transaction_mode") != undefined && sessionStorage.getItem("Modi_transaction_mode") != "" && sessionStorage.getItem("Modi_transaction_mode") != "select" && sessionStorage.getItem("Modi_transaction_mode") != "undefined") {
          $('#transaction_mode').val(JSON.parse(sessionStorage.getItem("Modi_transaction_mode")));
        }




        sessionStorage.getItem("Modi_transaction_mode")

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
  searchFun() {
    if ($("#transaction_type").val() == "select") {
      swal("Please select transaction type");
      return false;
    }

    if ($("#transaction_mode").val() == "select") {
      swal("Please select transaction mode");
      return false;
    }

    this.getPenidngTransactions("search", $("#transaction_type").val(), $("#transaction_mode").val())
  }

  attachmentlink(link) {
    window.open(link, '_system', 'location=yes,closebuttoncaption=Fechar,enableViewportScale=no');

  }
}
