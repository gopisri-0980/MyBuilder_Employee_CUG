import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
declare const $: any;
declare const swal: any;
var base64textString;
// var checkedornot;
var flatId_bookingid;
var flatId;
var convertbasesixtyfour = [];

@Component({
  selector: 'app-crm-receipt-payment-view',
  templateUrl: './crm-receipt-payment-view.component.html',
  styleUrls: ['./crm-receipt-payment-view.component.sass']
})
export class CrmReceiptPaymentViewComponent implements OnInit {
  totalPenaltyAmount: any;
  totaldueamount: any;
  customerName: any;
  fileExtension_array: any[];
  file_name_array1: any[];
  tempfileInfo: any[];
  base64_array_object_data1: any[];
  File_Info1: any[];
  binaryString: any;
  base64textString: string;
  filename: any;
  filename_extension: any;
  bookingFormId: any;
  setOffTypeName: any;
  viewTransactionResponse: any;
  transactionEntryId: any;
  operationType: string;
  chequeDate: any;
  bankType: any;
  cheqrecDate: any;
  site_Id: any;
  block_Id: any;
  flat_Id: any;
  flatBookingId: any;
  siteAccountId: any;
  setOffAmount: any;
  modificationChargeInvoiceID: any;
  legalChargeInvoiceID: any;
  customerCommentsArray: any;
  metadataName: any;
  custComments: any;
  customerComments: any;
  finTransactionEntryDetails: any;
  previousCRMComments: any;
  transactionFor: any;
  transactionTypeId: any;
  cancelComments: any;
  paymentchequebutton_hide_show: boolean;
  refundForMilestone: string;
  docListArray: any = [];
  fileInfo: any = [];
  lastTransactionEditedDate: any;
  lastTransactionEditedBy: any;

  controller: Array<any> = [];
  sideidname: any;
  con_sitename: any;

  transactionModeId: any;
  transactionTypeName: any;
  transactionModeName: any;
  actualTransactionReceiveDate: any;
  flatIds: any;

  actualFlatIds: any;
  actualBookingFormId: any;
  buttonType: string;
  actionUrl: string;
  transactionSetOffEntryId: any;
  transactionNumber: any;
  commentfield: string;
  transactionReceiptNumber: any;
  transactionDateval: any;
  transactionReceiveDateval: any;
  transactionAmountval: any;
  paymentMode: any;
  transactionStatusNameval: any;
  transactionReceiptNo: any;
  transferMode: any;
  documentLocation: any;
  deptid: any;
  roleid: any;
  modificationInvoiceNumber: any;
  ModificationdocumentLocation: any;
  legalChargeInvoiceNumber: any;
  documentLocationname: any;
  requesturl: string;

  CorpusFund: any;
  MaintinaceCharges: any;
  FlatKhataBifurcation: any;
  CorpusFund_amount: any;
  carparkingInvoiceID: any;
  carparkingInvoiceNumber: any;
  carparkingLocationname: any;
  transactionFor_name: any;
  carparkingInvoiceID_binding: any;
  constructor(private cmn: CommonComponent, private http: Http, private router: Router) {


    this.deptid = sessionStorage.getItem("session_deptid");
    this.roleid = sessionStorage.getItem("session_roleId");


    this.viewTransactionResponse = eval('(' + sessionStorage.getItem('view_transaction_data') + ')');
    this.controller = this.viewTransactionResponse;
    this.sideidname = this.controller['siteId'];
    this.con_sitename = this.controller['siteName'];
    this.transactionTypeId = this.controller['transactionTypeId'];
    this.transactionModeId = this.controller['transactionModeId'];
    this.transactionTypeName = this.controller['transactionTypeName'];
    this.transactionModeName = this.controller['transactionModeName'];
    console.log(this.transactionModeName);
    this.transactionDateval = this.controller['transactionDate'];
    this.transactionReceiveDateval = this.controller['transactionReceiveDate'];
    this.actualTransactionReceiveDate = this.controller['transactionReceiveDate'];
    this.transactionAmountval = this.controller['transactionAmount'];
    this.flatIds = this.controller['flatId'];
    this.bookingFormId = this.controller['bookingFormId'];
    this.actualFlatIds = this.controller['flatId'];
    this.actualFlatIds = this.controller['flatId'];
    this.actualBookingFormId = this.controller['bookingFormId'];
    this.actualBookingFormId = this.controller['bookingFormId'];
    this.buttonType = "Delete";
    this.actionUrl = "Delete_Transaction";
    this.transactionEntryId = this.controller['transactionEntryId'];
    this.transactionSetOffEntryId = this.controller['transactionEntryId'];
    this.transactionNumber = this.controller['finTransactionNo'];
    this.commentfield = "";
    this.transactionReceiptNumber = this.controller['chequeOrReferenceNo'];
    this.transactionStatusNameval = this.controller['transactionStatusName'];
    this.transactionEntryId = this.viewTransactionResponse.transactionEntryId;
    this.operationType = this.viewTransactionResponse.operationType;
    $('.page-loader-wrapper').hide();
    // checkedornot = false;

    //this.transactionType();
    //this.PaymentFor();
    this.bindingDetails();

  }

  ngOnInit() {
    if (this.operationType == "approveTransaction") {
      this.paymentchequebutton_hide_show = true;
    } else {
      this.paymentchequebutton_hide_show = false;
      $('#file').prop("disabled", true);
      // $('#checlist').prop("disabled", true);

      $(".form-control").prop("disabled", true);
      $(".form-control").attr("disabled", true);
      $(".form-group").attr("disabled", true);
      $("textarea").attr("disabled", true);

      $("input[type=radio]").attr('disabled', true);
    }
    var self = this;
    // var date = new Date().getMonth();
    // var minimumdate = new Date().setMonth(date - 3);
    // var maximumdate = new Date().setMonth(date + 3);

    $(function () {


      $("#PrincipalAmount").val(0);
      $("#CorpusFund").val(0);
      $("#MaintinaceCharges").val(0);
      $("#FlatKhataBifurcation").val(0);
      $("#refundableAdvanceID").val(0);
      $("#cancellationChargesID").val(0);
      $("#InterstAmount").val(0);
      $("#ModificationCharges").val(0);
      $("#LeagalCharges").val(0);
      $("#carparkingcost").val(0);



      $(document).on('keydown', 'input[pattern]', function (e) {
        var input = $(this);
        var oldVal = input.val();
        var regex = new RegExp(input.attr('pattern'), 'g');

        setTimeout(function () {
          var newVal = input.val();
          if (!regex.test(newVal)) {
            input.val(oldVal);
          }
        }, 0);
      });


      $('#ChequeAmount').bind("cut copy paste", function (e) {
        e.preventDefault();
      });

      $('#PrincipalAmount').bind("cut copy paste", function (e) {
        e.preventDefault();
      });

      $('#InterstAmount').bind("cut copy paste", function (e) {
        e.preventDefault();
      });

      $('#CancelationCharges').bind("cut copy paste", function (e) {
        e.preventDefault();
      });

      $('#ModificationCharges').bind("cut copy paste", function (e) {
        e.preventDefault();
      });

      $('#LeagalCharges').bind("cut copy paste", function (e) {
        e.preventDefault();
      });

      $('#refunableCharges').bind("cut copy paste", function (e) {
        e.preventDefault();
      });
      // $('#checlist').click(function(){
      //   if($(this).prop("checked") == true){
      //     $("#PaymentSetOffDiv").show();
      //   }else{}
      // }); 

      $("#transaction_type").select2({
        placeholder: "Search transaction type",
        dir: "ltl"
      });
      $("#bank_type").select2({
        placeholder: "Search bank type",
        dir: "ltl"
      });
      $("#ProjectId").select2({
        placeholder: "Search Project",
        dir: "ltl"
      });
      $("#BlockId").select2({
        placeholder: "Search Block",
        dir: "ltl"
      });
      $("#FaltId").select2({
        placeholder: "Search Flat",
        dir: "ltl"
      });
      $("#ModificationInvoiceId").select2({
        placeholder: "Search Modification Invoice",
        dir: "ltl"
      });
      $("#LegalInvoiceId").select2({
        placeholder: "Search Legal Invoice",
        dir: "ltl"
      });


      $("#companybankAcId").select2({
        placeholder: "Search Company Bank Account",
        dir: "ltl"
      });

      $("#Paymentfor").select2({
        placeholder: "Search Payment For",
        dir: "ltl"
      });



      $('#ProjectId').change(function (e) {
        var siteId = $(e.target).val();

        self.blockList(siteId);
        self.siteBankList(siteId);
        $("#BlockId").attr("disabled", false)
      });

      $('#BlockId').change(function (e) {
        var siteId = $(e.target).val();

        self.flatList(siteId);

      });

      $('#FaltId').change(function (e) {
        flatId = $(e.target).val().split('-')[0];

        flatId_bookingid = $(e.target).val().split('-')[1];
        self.gridDetails(flatId, flatId_bookingid);
        self.modification_legalInvoiceList(flatId);

      });

      var date = new Date().getMonth();
      var minimumdate = new Date().setMonth(date - 3);
      var maximumdate = new Date().setMonth(date + 3);
      $('#ChequeDate').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
        minDate: new Date(),
        maxDate: new Date(),
        clearButton: true,
        weekStart: 1,
        time: false,
      });

    });
  }


  legalChargeInvoiceNumberfun() {
    window.open(this.documentLocationname);
  }

  modificationInvoiceNumberfun() {
    window.open(this.ModificationdocumentLocation);
  }




  /*------------------------Transaction type start-------------------*/
  transactionType() {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/viewFinTransactionTypeModeData.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "condition": "fetchPaymentData"

    }

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#bank_type').html('');
        $('#bank_type').append('<option value="select">--Select--</option>');
        $('#transaction_type').html('');
        $('#transaction_type').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.finTrnasactionTypeResponseList.length; i++) {
          $('#transaction_type').append("<option value='" + resp.responseObjList.finTrnasactionTypeResponseList[i].transactionTypeId + "'>" + resp.responseObjList.finTrnasactionTypeResponseList[i].name + "</option>");
        }
        $('#transaction_type').val(this.transactionTypeId);
        for (var i = 0; i < resp.responseObjList.finBankResponseList.length; i++) {
          $('#bank_type').append("<option value='" + resp.responseObjList.finBankResponseList[i].finBankId + "'>" + resp.responseObjList.finBankResponseList[i].bankName + "</option>");

        }
        $('#bank_type').val(this.bankType)

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
  /*------------------------Transaction type end-------------------*/

  /*------------------------Transaction for start-------------------*/
  transaction_For() {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/viewFinTransactionTypeModeData.spring";

    //http://localhost:8082/SumadhuraGateway/employeeservice/financial/viewFinTransactionTypeModeData.spring
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "condition": "Payment"

    }


    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#Paymentfor').html('');
        $('#Paymentfor').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.transactionForResponseList.length; i++) {
          $('#Paymentfor').append("<option value='" + resp.responseObjList.transactionForResponseList[i].transactionforId + "'>" + resp.responseObjList.transactionForResponseList[i].name + "</option>");
        }
        $('#Paymentfor').val(this.transactionFor)
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
  /*------------------------Transaction for end-------------------*/

  /*-----------------Getting Project(site) list Start---------------------*/
  siteList() {
    let url = this.cmn.commonUrl + "financial/raisedMilestoneSites.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "actionUrl": "Payment Cheque"
    }

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

      if (resp.responseCode == 200) {
        var Options = "";
        $('#ProjectId').html('');
        $('#ProjectId').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#ProjectId').append("<option value='" + resp.responseObjList[i].siteId + "'>" + resp.responseObjList[i].siteName + "</option>");
          //	$('#projectID').formSelect();
          $('#blkcls').show();
        }
        $('#ProjectId').val(this.site_Id)
        this.blockList(this.site_Id);

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

  /*-----------------site bank list start---------------------*/
  /*-----------------site bank list End---------------------*/
  siteBankList(siteid) {
    $('.page-loader-wrapper').show();
    // -------------------------------
    let url = this.cmn.commonUrl + "financial/viewFinProjectAccountData.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteIds": [siteid]
    }

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        $('#companybankAcId').html('');
        $('#companybankAcId').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.finProjectAccountResponseList.length; i++) {
          $('#companybankAcId').append("<option value='" + resp.responseObjList.finProjectAccountResponseList[i].siteAccountId + "'>" + resp.responseObjList.finProjectAccountResponseList[i].siteBankAccountNumber + "</option>");
          //	$('#projectID').formSelect();
        }


        $("#companybankAcId").val(this.siteAccountId)
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
  /*-----------------Getting Blocks list start---------------------*/
  blockList(siteid) {
    $('.page-loader-wrapper').show();
    // -------------------------------
    let url = this.cmn.commonUrl + "financial/activeBlocksFlats.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteIds": [siteid]
    }


    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        $('#BlockId').html('');
        $('#BlockId').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#BlockId').append("<option value='" + resp.responseObjList[i].blockId + "'>" + resp.responseObjList[i].blockName + "</option>");
        }
        $("#BlockId").val(this.block_Id);
        //this.flatList(this.block_Id);

        if (this.transactionFor == "2") {
          this.RefundflatDetailsblock(this.block_Id);

        } else {
          this.flatList(this.block_Id);
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
  /*-----------------Getting Blocks list End---------------------*/

  /*-----------------Getting Flats list Start---------------------*/
  flatList(blockid) {
    $('.page-loader-wrapper').show();
    // -------------------------------
    let url = this.cmn.commonUrl + "financial/activeBlocksFlats.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "blockIds": [blockid]
    }

    console.log(body);

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      console.log(resp);

      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        $('#FaltId').html('');
        $('#FaltId').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#FaltId').append("<option value='" + resp.responseObjList[i].flatId + "-" + resp.responseObjList[i].flatBookingId + "'>" + resp.responseObjList[i].flatNo + "</option>");

        }


        $("#FaltId").val(this.flat_Id + "-" + this.flatBookingId);

        flatId = this.flat_Id;
        flatId_bookingid = this.flatBookingId;
        this.gridDetails(this.flat_Id, flatId_bookingid);
        this.modification_legalInvoiceList(this.flatBookingId);
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
  /*-----------------Getting Flats list End---------------------*/

  /*-----------------Getting grid details start---------------------*/
  gridDetails(flatId, bookingid) {
    $('.page-loader-wrapper').show();
    if (this.transactionStatusNameval == "Transaction Completed") {
      this.requesturl = "CompletedTransaction";
    } else {
      this.requesturl = "CompletedTransaction";
    }
    // -------------------------------
    let url = this.cmn.commonUrl + "financial/viewPendingAmount.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "flatIds": [flatId],
      "bookingFormId": bookingid,
      "transactionEntryId": $("#Paymentfor").val(),
      "transactionTypeId": JSON.stringify(this.transactionTypeId),
      "transactionModeId": JSON.stringify(this.transactionModeId),
      "transactionTypeName": this.transactionTypeName,
      "transactionModeName": this.transactionModeName,
      "transferModeName": this.transferMode,
      "transactionFor": this.transactionFor_name,
      "transferModeId": "1",
      "requestUrl": this.requesturl,
      "condition": "CRM_COMMENTS",

    }

    console.log(url);
    console.log(JSON.stringify(body));

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

      console.log(JSON.stringify(resp));

      if (resp.responseCode == 200) {

        $('.page-loader-wrapper').hide();
        this.totalPenaltyAmount = resp.responseObjList.financialProjectMileStoneResponse[0].totalPenaltyAmount;
        $("#interestamnt").html(this.totalPenaltyAmount);
        this.totaldueamount = resp.responseObjList.financialProjectMileStoneResponse[0].totalDueAmount;
        $("#pendingamnt").html(this.totaldueamount);
        this.customerName = resp.responseObjList.financialProjectMileStoneResponse[0].customerName;
        $("#custname").html(this.customerName);

        for (var i = 0; i < resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList.length; i++) {
          console.log(resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].metadataName);

          this.setOffTypeName = resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].metadataName;
          if (this.setOffTypeName == "CAR_PARKING_COST") {

            $('#carparkingcost').val(this.setOffAmount);

            console.log(this.carparkingInvoiceID_binding);

            if (resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo == this.carparkingInvoiceID_binding) {
              this.carparkingInvoiceID = resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo;

              console.log(this.carparkingInvoiceID);
              this.carparkingLocationname = resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].documentLocation;
            }





          }


        }




        $("#custdet_div").show();
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
  /*-----------------Getting grid details End---------------------*/

  //url to base64 converting  
  toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }

  /*-------------------------------Final Submission Start----------------------------*/
  CRMPaymentChequeSubmit() {

    if ($("#Paymentfor").val() == "select") {
      swal("Please select payment for");
      $('#Paymentfor').focus();
      return false;
    }

    if ($("#ChequeNumber").val() == "") {
      swal("Please enter cheque number");
      $('#ChequeNumber').focus();
      return false;
    }

    if (($("#ChequeNumber").val()).length < 6) {
      swal("Cheque number should be more than 5 digits");
      $('#ChequeNumber').focus();
      return false;
    }

    if ($("#ChequeDate").val() == "") {
      swal("Please select cheque date");
      // $('#ChequeDate').focus();
      return false;
    }

    if ($("#ChequeAmount").val() == "") {
      swal("Please enter cheque amount");
      $('#ChequeAmount').focus();
      return false;
    }

    if ($("#CancelreasonId").val() == "") {
      swal("Please enter reason");
      $('#PayableAmount').focus();
      return false;
    }


    // console.log($("#bank_type").val());

    if ($("#bank_type").val() == "select") {
      swal("Please select customer bank name");
      $('#bank_type').focus();
      return false;
    }

    if ($("#ProjectId").val() == "select") {
      swal("Please select project");
      $('#ProjectId').focus();
      return false;
    }

    // if ($("#BlockId").val() == "select") {
    //   swal("Please select block");
    //   $('#BlockId').focus();
    //   return false;
    // }

    if ($("#FaltId").val() == "select") {
      swal("Please select Flat");
      $('#FaltId').focus();
      return false;
    }

    if ($("#CorpusFund").val() == undefined || $("#CorpusFund").val() == "") {
      this.CorpusFund = 0;
    } else {
      this.CorpusFund = $("#CorpusFund").val();
    }

    if ($("#MaintinaceCharges").val() == undefined || $("#MaintinaceCharges").val() == "") {
      this.MaintinaceCharges = 0;
    } else {
      this.MaintinaceCharges = $("#MaintinaceCharges").val();
    }

    if ($("#FlatKhataBifurcation").val() == undefined || $("#FlatKhataBifurcation").val() == "") {
      this.FlatKhataBifurcation = 0;
    } else {
      this.FlatKhataBifurcation = $("#FlatKhataBifurcation").val();
    }



    if ($("#PrincipalAmount").val() == "0" && $("#ModificationCharges").val() == "0" && $("#InterstAmount").val() == "0" && $("#LeagalCharges").val() == "0" && $("#refunableCharges").val() == "0" && this.CorpusFund == "0" && this.MaintinaceCharges == "0" && this.FlatKhataBifurcation == "0") {
      swal("Please enter Principle amount (OR) Corpus Fund (OR) Maintinance Charges (OR) Flat Khata Bifurcation (OR) Modification charges (OR) Interest amount (OR) Legal charges (OR) Refundable Advance");
      return false;
    }



    if ((Number($('#PrincipalAmount').val()) + Number($('#ModificationCharges').val()) + Number($('#InterstAmount').val())
      + Number($('#LeagalCharges').val()) + Number(this.CorpusFund) + Number(this.MaintinaceCharges) + Number(this.FlatKhataBifurcation)
      + Number($('#refunableCharges').val())) > Number($('#ChequeAmount').val())) {
      swal("Payment Setoff should be equal to Cheque amount");
      return false
    }

    if ((Number($('#PrincipalAmount').val()) + Number($('#ModificationCharges').val()) + Number($('#InterstAmount').val())
      + Number($('#LeagalCharges').val()) + Number(this.CorpusFund) + Number(this.MaintinaceCharges) + Number(this.FlatKhataBifurcation)
      + Number($('#refunableCharges').val())) < Number($('#ChequeAmount').val())) {
      swal("Payment Setoff should be equal to Cheque amount");
      return false
    }

    if ($("#ModificationCharges").val() != "0") {
      if (this.modificationChargeInvoiceID == "") {
        $("#ModificationInvoiceId").attr("disabled", false);
        swal("Please select modification invoice");
        $('#ModificationInvoiceId').focus();
        return false;
      }
    }

    if ($("#LeagalCharges").val() != "0") {
      $("#LegalInvoiceId").attr("disabled", false);
      if (this.legalChargeInvoiceID == "") {
        swal("Please select legal invoice");
        $('#LegalInvoiceId').focus();
        return false;
      }

    }
    // if ($("#CrmCommentsId").val() == "") {
    //   swal("Please enter crm comments");
    //   $('#CrmCommentsId').focus();
    //   return false;
    // }

    // if ($("#CustomerCommentsId").val() == "") {
    //   swal("Please enter customer comments");
    //   $('#CustomerCommentsId').focus();
    //   return false;
    // }

    // if ($("#Sourcefound").val() == "") {
    //   swal("Please select Source of funds");
    //   return false;
    // }




    if ($("#companybankAcId").val() == "select") {
      swal("Please select company bank account");
      $('#companybankAcId').focus();
      return false;
    }

    if (confirm("Do you want to Submit the Page ?")) {


      if (this.filename == undefined) {
        // swal("Please attach file");
        $('#files').focus();
        this.tempfileInfo = [];
        //return false;

      } else {
        this.tempfileInfo = [{
          "extension": this.filename_extension,
          "name": this.filename,
          "base64": base64textString
        }]
      }


      for (var i = 0; i < this.docListArray.length; i++) {
        this.fileInfo = [{
          "extension": this.docListArray[i].documentName.split('.').pop(),
          "name": this.docListArray[i].documentName,
          "base64": convertbasesixtyfour[i]
        }]
      }


      if (this.modificationChargeInvoiceID == "") {
        this.modificationChargeInvoiceID = null;
      }

      if (this.legalChargeInvoiceID == "") {
        this.legalChargeInvoiceID = null;
      }


      $('.page-loader-wrapper').show();
      // -------------------------------
      let url = this.cmn.commonUrl + "financial/saveFinancialTransactionReceiptRequest.spring";

      //  http://localhost:8082/sumadhuragateway/employeeservice/financial/saveFinancialTransactionReceiptRequest.spring

      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      var body = {
        "sessionKey": sessionStorage.getItem("login_sessionkey"),
        "siteId": $("#ProjectId").val(),
        "siteName": $('#ProjectId').select2('data')[0].text,
        "transactionTypeId": $("#transaction_type").val(),
        "transactionModeId": "1",
        "transferModeId": "1",
        "transactionTypeName": $('#transaction_type').select2('data')[0].text,
        "transactionModeName": "Cheque",
        "transactionFor": $("#Paymentfor").select2('data')[0].text,
        "transactionForId": $("#Paymentfor").val(),
        "chequeNumber": $("#ChequeNumber").val(),
        "transactionDate": new Date($("#ChequeDate").val()).getTime(),
        "transactionAmount": $("#ChequeAmount").val(),
        "blockIds": [$("#BlockId").val()].map(Number),
        "floorIds": [],
        "flatIds": [flatId].map(Number),
        "bookingFormId": flatId_bookingid,
        "bankId": $("#bank_type").val(),
        "bankName": $('#bank_type').select2('data')[0].text,
        "siteAccountId": $("#companybankAcId").val(),
        "siteBankAccountNumber": $('#companybankAcId').select2('data')[0].text,
        "paymentSetOffDetails": [
          {
            "setOffTypeName": "Principal_Amount",
            "amount": $("#PrincipalAmount").val(),
            "refundFromMileStone": this.refundForMilestone //"true"
          },
          {
            "setOffTypeName": "Fin_Penalty",
            "amount": $("#InterstAmount").val(),
            "refundFromMileStone": this.refundForMilestone //"true"
          },
          {
            "setOffTypeName": "Refundable_Advance",
            "amount": $("#refunableCharges").val(),
            "invoiceNo": "",
            "refundFromMileStone": this.refundForMilestone //"true"
          },
          {
            "setOffTypeName": "Flat_Cancellation",
            "amount": $("#CancelationCharges").val(),
            "invoiceNo": "",
            "refundFromMileStone": this.refundForMilestone //"true"
          },
          {
            "setOffTypeName": "Modification_Cost",
            "amount": $("#ModificationCharges").val(),
            "invoiceNo": this.modificationChargeInvoiceID,
            "refundFromMileStone": this.refundForMilestone //"true"
          },
          {
            "setOffTypeName": "Legal_Cost",
            "amount": $("#LeagalCharges").val(),
            "invoiceNo": this.legalChargeInvoiceID,
            "refundFromMileStone": this.refundForMilestone //"true"
          }
          , { "setOffTypeName": "Maintenance_Charge", "amount": this.MaintinaceCharges }
          , { "setOffTypeName": "Corpus_Fund", "amount": this.CorpusFund }
          , { "setOffTypeName": "Individual_Flat_Khata_bifurcation_and_other_charges", "amount": this.FlatKhataBifurcation }
        ],
        "comments": [{ "CUSTOMER": $("#CustomerCommentsId").val() }, { "CANCEL_REASON": $("#CancelreasonId").val() }],
        "comment": $("#CrmCommentsId").val(),
        "projectAccountNumber": $('#companybankAcId').select2('data')[0].text,
        "operationType": "Modify", //this.operationType,
        "prevTransactionEntryId": this.transactionEntryId,
        "fileInfos": this.fileInfo
      }


      console.log(url);
      console.log(JSON.stringify(body));




      this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

        console.log(JSON.stringify(resp));

        $('.page-loader-wrapper').hide();


        if (resp.responseCode == 200) {
          swal("Transaction sent successfully");
          this.router.navigate(["View-Pending-Transactions"])

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

  }
  /*-------------------------------Final Submission End----------------------------*/
  handle_FileSelect(evt) {
    // $("#myfilebinding").show();
    this.fileExtension_array = [];
    this.file_name_array1 = [];
    this.base64_array_object_data1 = [];
    this.File_Info1 = [];
    debugger;
    var files = evt.target.files;
    var file_val = evt.target.value;
    this.filename = evt.target.files[0].name;
    this.filename_extension = this.filename.split('.').pop();
    const fsize = files.item(i).size;
    const file_second = Math.round((fsize / 1024));
    if (file_second >= 1024) {
      $("#files").val(null);
      swal("File too Big, please select a file less than 1mb");
      return false;
    } else {
      for (var i = 0; i < files.length; i++) {
        var temp = evt.target.files[i].name;
        var tempFileExtension = temp.split('.').pop();
        this.fileExtension_array.push(tempFileExtension);
        this.file_name_array1.push(temp);
        //alert(this.file_name_array.length);
        var file = files[i];
        if (files && file) {
          var reader = new FileReader();
          reader.onload = this._handleReader_Loaded.bind(this);
          reader.readAsBinaryString(file);

        } else {

        }
      }
    }

  }

  _handleReader_Loaded(readerEvt) {
    this.binaryString = readerEvt.target.result;
    //alert(this.binaryString);
    base64textString = btoa(this.binaryString);
    // alert(this.base64textString);
    // this.base64_array_object_data1.push(btoa(this.binaryString));
    // alert("Data: " + btoa(this.binaryString));
  }

  modificationInvoice(event: any) {
    $("#ModificationInvoiceId").attr("disabled", false);
  }

  legalInvoice(event: any) {
    $("#LegalInvoiceId").attr("disabled", false);
  }

  /*---------------------------------payment for start-----------------------------*/
  PaymentFor() {
    /*------------------------Transaction type start-------------------*/

    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/viewFinTransactionTypeModeData.spring";

    //http://localhost:8082/SumadhuraGateway/employeeservice/financial/viewFinTransactionTypeModeData.spring
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "condition": "fetchAllData"
    }



    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#Paymentfor').html('');
        $('#Paymentfor').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.finTransferModeResponseList.length; i++) {
          $('#Paymentfor').append("<option value='" + resp.responseObjList.finTransferModeResponseList[i].transactionforId + "'>" + resp.responseObjList.finTransferModeResponseList[i].name + "</option>");
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
  /*---------------------------------payment for end-----------------------------*/

  /*-----Getting modification and legal invoices list start------------*/
  modification_legalInvoiceList(flatBookingId) {

    if (this.transactionStatusNameval == "Transaction Completed") {
      this.requesturl = "CompletedTransaction";
    } else {
      this.requesturl = "approveTransaction";
    }


    $('.page-loader-wrapper').show();
    // -------------------------------
    let url = this.cmn.commonUrl + "financial/getExcessAmountDetailsForRefund.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      // "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      // "flatIds": [flatId].map(Number),//$("#FaltId").val(),
      // "condition":"CRM_COMMENTS"
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "bookingFormId": Number(flatBookingId),
      "transactionForId": $("#Paymentfor").val(),
      "transactionTypeId": JSON.stringify(this.transactionTypeId),
      "transactionModeId": JSON.stringify(this.transactionModeId),
      "transactionTypeName": this.transactionTypeName,
      "transactionModeName": this.transactionModeName,
      "transferModeName": this.transferMode,
      "transactionFor": this.transactionFor,
      "flatIds": [this.flatIds],
      "transferModeId": "1",
      "requestUrl": this.requesturl,
    }

    console.log(url);
    console.log(JSON.stringify(body));

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

      console.log(resp);


      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        $('#ModificationInvoiceId').html('');
        $('#LegalInvoiceId').html('');
        $('#LegalInvoiceId').append('<option value="select">--Select--</option>');
        $('#ModificationInvoiceId').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          this.setOffTypeName = resp.responseObjList[i].metadataName;
          if (this.setOffTypeName == "MODIFICATION_COST") {
            $('#ModificationInvoiceId').append("<option value='" + resp.responseObjList[i].finBokAccInvoiceNo + "'>" + resp.responseObjList[i].finBokAccInvoiceNo + "</option>");
            //$('#ModificationInvoiceId').val(this.modificationChargeInvoiceID);

            if (resp.responseObjList[i].finBokAccInvoiceNo == this.modificationChargeInvoiceID) {
              this.modificationInvoiceNumber = resp.responseObjList[i].finBokAccInvoiceNo;
              this.ModificationdocumentLocation = resp.responseObjList[i].documentLocation;
            }


          } else if (this.setOffTypeName == "LEGAL_COST") {
            $('#LegalInvoiceId').append("<option value='" + resp.responseObjList[i].finBokAccInvoiceNo + "'>" + resp.responseObjList[i].finBokAccInvoiceNo + "</option>");
            //$('#LegalInvoiceId').val(this.legalChargeInvoiceID);

            if (resp.responseObjList[i].finBokAccInvoiceNo == this.legalChargeInvoiceID) {
              this.legalChargeInvoiceNumber = resp.responseObjList[i].finBokAccInvoiceNo;
              this.documentLocationname = resp.responseObjList[i].documentLocation;
            }

          } else if (this.setOffTypeName == "CAR_PARKING_COST") {
            $('#carparkingInvoiceId').append("<option value='" + resp.responseObjList[i].finBokAccInvoiceNo + "'>" + resp.responseObjList[i].finBokAccInvoiceNo + "</option>");

            if (resp.responseObjList[i].finBokAccInvoiceNo == this.carparkingInvoiceID_binding) {
              this.carparkingInvoiceNumber = resp.responseObjList[i].finBokAccInvoiceNo;
              this.carparkingLocationname = resp.responseObjList[i].documentLocation;
            }


          }
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
  /*-----Getting modification and legal invoices list End------------*/

  /*------------------------------------------Binding Deatails start ------------------*/
  bindingDetails() {
    $('.page-loader-wrapper').show();
    // -------------------------------
    let url = this.cmn.commonUrl + "financial/viewMisReceiptChequeOnlineData.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "transactionEntryId": this.viewTransactionResponse.transactionEntryId,
      "bookingFormId": this.viewTransactionResponse.bookingFormId,
      "transactionModeName": "" + this.viewTransactionResponse.transactionModeName,
      "operationType": "" + this.operationType
    }

    console.log(url);
    console.log(body);

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

      console.log(resp);

      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $("#ChequeNumber").val(resp.responseObjList.finTransactionEntryDetailsResponseList[0].chequeNumber)
        this.chequeDate = resp.responseObjList.finTransactionEntryDetailsResponseList[0].chequeDate
        $("#ChequeAmount").val(resp.responseObjList.finTransactionEntryDetailsResponseList[0].transactionAmount)
        this.bankType = resp.responseObjList.finTransactionEntryDetailsResponseList[0].finBankId
        this.transactionFor = resp.responseObjList.finTransactionEntryDetailsResponseList[0].transactionForId
        this.transactionFor_name = resp.responseObjList.finTransactionEntryDetailsResponseList[0].transactionFor
        this.transactionTypeId = resp.responseObjList.finTransactionEntryDetailsResponseList[0].transactionTypeId
        this.transactionReceiptNo = resp.responseObjList.finTransactionEntryDetailsResponseList[0].transactionReceiptNo
        this.transferMode = resp.responseObjList.finTransactionEntryDetailsResponseList[0].transferMode;

        this.documentLocation = resp.responseObjList.finTransactionEntryDetailsResponseList[0].transactionReceiptDocResponsesList;

        if (this.operationType == 'approveTransaction' && this.transactionFor == "2") {
          this.refundForMilestone = "true";
          $('#CancelationCharges').prop('disabled', false);
        } else {
          this.refundForMilestone = "false";
          $('#CancelationCharges').prop('disabled', true);
        }

        // this.cheqrecDate = resp.responseObjList.finTransactionEntryDetailsResponseList[0].transactionReceiveDate
        $("#PayableAmount").val(resp.responseObjList.finTransactionEntryDetailsResponseList[0].payableAmount);

        this.site_Id = resp.responseObjList.customerPropertyDetailsInfoList[0].siteId;
        this.block_Id = resp.responseObjList.customerPropertyDetailsInfoList[0].blockId;
        this.flat_Id = resp.responseObjList.customerPropertyDetailsInfoList[0].flatId;


        console.log(this.transactionFor);
        if (this.transactionFor == "2") {
          this.RefundflatDetailsblock(this.block_Id);

        } else {
          this.flatList(this.block_Id);
        }

        this.flatBookingId = resp.responseObjList.customerPropertyDetailsInfoList[0].flatBookingId;
        this.siteAccountId = resp.responseObjList.finTransactionEntryDetailsResponseList[0].siteAccountId;

        for (var i = 0; i < resp.responseObjList.finTransactionEntryDetailsResponseList[0].finTransactionSetOffResponseList.length; i++) {
          this.setOffTypeName = resp.responseObjList.finTransactionEntryDetailsResponseList[0].finTransactionSetOffResponseList[i].setOffTypeName;
          this.setOffAmount = resp.responseObjList.finTransactionEntryDetailsResponseList[0].finTransactionSetOffResponseList[i].setOffAmount;

          if (this.setOffTypeName == "Corpus_Fund") {

            this.CorpusFund_amount = this.setOffAmount;
            $('#CorpusFund').val(this.CorpusFund_amount);


          } else if (this.setOffTypeName == "MODIFICATION_COST") {
            // $('#ModificationCharges').val(this.setOffAmount);

            this.modificationChargeInvoiceID = resp.responseObjList.finTransactionEntryDetailsResponseList[0].finTransactionSetOffResponseList[i].finBokAccInvoiceNo;
            //    $('#ModificationInvoiceId').val(this.modificationChargeInvoiceID);
          } else if (this.setOffTypeName == "FIN_BOOKING_FORM_MILESTONES") {
            $('#PrincipalAmount').val(this.setOffAmount);
          } else if (this.setOffTypeName == "LEGAL_COST") {
            $('#LeagalCharges').val(this.setOffAmount);

            this.legalChargeInvoiceID = resp.responseObjList.finTransactionEntryDetailsResponseList[0].finTransactionSetOffResponseList[i].finBokAccInvoiceNo;
            $('#LegalInvoiceId').val(this.legalChargeInvoiceID);
          } else if (this.setOffTypeName == "FIN_PENALTY") {
            $('#InterstAmount').val(this.setOffAmount);
          } else if (this.setOffTypeName == "REFUNDABLE_ADVANCE") {
            $('#refunableCharges').val(this.setOffAmount);
          } else if (this.setOffTypeName == "FLAT_CANCELLATION") {
            $('#CancelationCharges').val(this.setOffAmount);
          } else if (this.setOffTypeName == "Maintenance_Charge") {
            $("#MaintinaceCharges").val(this.setOffAmount);

          } else if (this.setOffTypeName == "Corpus_Fund") {
            $("#CorpusFund").val(this.setOffAmount);

          } else if (this.setOffTypeName == "Individual_Flat_Khata_bifurcation_and_other_charges") {
            $("#FlatKhataBifurcation").val(this.setOffAmount);
          } else if (this.setOffTypeName == "CAR_PARKING_COST") {
            $('#carparkingcost').val(this.setOffAmount);
            this.carparkingInvoiceID_binding = resp.responseObjList.finTransactionEntryDetailsResponseList[0].finTransactionSetOffResponseList[i].finBokAccInvoiceNo;
          } else if(this.setOffTypeName == "REGISTRATION_AND_MUTATION_CHARGES"){
            $('#Registration_and_Mutation_Charges').val(this.setOffAmount);

          } else if(this.setOffTypeName == "NON_REFUNDABLE_CAUTION_DEPOSIT"){
            $('#Non_refundable_Caution_Deposit').val(this.setOffAmount);
          } 
           else if(this.setOffTypeName == "ELECTRICITY_DEPOSIT"){
            $('#Electricity_Deposit').val(this.setOffAmount);
          }

        }

        this.docListArray = resp.responseObjList.finTransactionEntryDetailsResponseList[0].transactionEntryDocResponsesList;
        for (var i = 0; i < this.docListArray.length; i++) {
          this.toDataURL(this.docListArray[i].documentLocation, function (dataUrl) {
            convertbasesixtyfour.push(dataUrl)
          })
        }

        this.customerCommentsArray = resp.responseObjList.finTransactionEntryDetailsResponseList[0].finTransactionCommentsResponseList;


        for (let i = 0; i < this.customerCommentsArray.length; i++) {
          this.metadataName = this.customerCommentsArray[i].metadataName;
          this.custComments = this.customerCommentsArray[i].comments;
          if (this.metadataName == "CUSTOMER") {
            this.customerComments = this.custComments;
          }
          if (this.metadataName == "CANCEL_REASON") {
            this.cancelComments = this.custComments;
            $("#CancelreasonId").val(this.cancelComments);
          }

          this.finTransactionEntryDetails = resp.responseObjList.finTransactionEntryDetailsResponseList[0];
          this.previousCRMComments = this.finTransactionEntryDetails.finTransactionApprStatResponseList;
        }
        //$("#bank_type option:selected").val(resp.responseObjList.finTransactionEntryDetailsResponseList[0].finBankId)
        this.transactionType();
        this.siteList();
        this.transaction_For();
        this.siteBankList(this.site_Id);
        this.gridDetails(this.flat_Id, this.flatBookingId);
        this.modification_legalInvoiceList(this.flat_Id);

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
  /*------------------------------------------Binding Deatails end ------------------*/

  /*-------------------------file location start---------------------------*/
  viewFiles(location) {

    window.open(location, '_system', 'location=yes,closebuttoncaption=Fechar,enableViewportScale=no');

  }
  /*-------------------------file location end---------------------------*/

  homeClick() {
    this.cmn.commonHomeNavigation();
  }

  keyPress(event: any) {
    // -- for any symbols  /[0-9\+\-\ ]/
    const pattern = /[0-9\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  keyPressAmount(event: any) {
    // -- for any symbols  /[0-9\+\-\ ]/
    const pattern = /[0-9\.\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }


  Deletelistfun() {
    var d = new Date(this.transactionDateval);
    var transactionDate = d.toJSON().split('T')[0];
    var date = new Date(this.transactionReceiveDateval);
    var transactionRecDate = date.toJSON().split('T')[0];
    var date1 = new Date(this.actualTransactionReceiveDate);
    var actualTransactionRecDate = date1.toJSON().split('T')[0];

    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/deleteFinancialTransaction.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });

    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteId": JSON.stringify(this.sideidname),
      "siteName": this.con_sitename,
      "transactionTypeId": JSON.stringify(this.transactionTypeId),
      "transactionModeId": JSON.stringify(this.transactionModeId),
      "transactionTypeName": this.transactionTypeName,
      "transactionModeName": this.transactionModeName,
      "transferModeName": this.transferMode,
      "transactionFor": this.transactionFor,
      "flatIds": [this.flatIds],
      "bookingFormId": JSON.stringify(this.bookingFormId),
      "actualFlatIds": [this.actualFlatIds],
      "actualBookingFormId": JSON.stringify(this.actualBookingFormId),
      "buttonType": this.buttonType,
      "actionUrl": this.actionUrl,
      "transactionEntryId": JSON.stringify(this.transactionEntryId),
      "transactionSetOffEntryId": JSON.stringify(this.transactionSetOffEntryId),
      "transactionNo": this.transactionNumber,
      "comment": "" + $('#CustomerCommentsId').val(),
      "transactionReceiptNo": this.transactionReceiptNo,
    }




    this.http.post(url, body).map(res => res.json()).subscribe(resp => {

      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        swal("Transaction delete successfully");
        this.router.navigateByUrl('View-Completed-Transactions');
      } else if (resp.responseCode == 440) {
        $('.page-loader-wrapper').hide();
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

  attachmentlink(link) {

    window.open(link, '_system', 'location=yes,closebuttoncaption=Fechar,enableViewportScale=no');

  }

  backfun() {
    this.router.navigateByUrl("View-Completed-Transactions");
  }


  RefundflatDetailsblock(blockid) {

    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/getNonRefundFlats.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "blockIds": [JSON.parse(blockid)],
      "requestUrl": "getNonRefundFlats",
      "condition": "FlatsWithCustName",

    }

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      console.log(resp);

      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        $('#FaltId').html('');
        $('#FaltId').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#FaltId').append("<option value='" + resp.responseObjList[i].FLAT_ID + "-" + resp.responseObjList[i].FLAT_BOOK_ID + "'>" + resp.responseObjList[i].customerName_FlatNo + "</option>");
        }

        $("#FaltId").val(this.flat_Id + "-" + this.flatBookingId);


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


  carparkingInvoiceNumberfun() {
    window.open(this.carparkingLocationname);
  }
  carparkingInvoice(event: any) {
    $("#CarparkingInvoiceId").attr("disabled", false);
  }


}
