import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
declare const $: any;
declare const swal: any;
var base64textString;
var checkedornot;
var json_response;
var flatId;
var flatId_bookingid;
var convertbasesixtyfour = [];
var selectbankNameValue;
var selectbanknametext;
var selectElementText;
var carparkinginvoicenumber;
var carparkingdetails_url;

@Component({
  selector: 'app-crm-receipt-online-completed-edit',
  templateUrl: './crm-receipt-online-completed-edit.component.html',
  styleUrls: ['./crm-receipt-online-completed-edit.component.sass']
})
export class CrmReceiptOnlineCompletedEDITComponent implements OnInit {
  totalPenaltyAmount: any;
  totaldueamount: any;
  customerName: any;
  fileExtension_array: any[];
  file_name_array1: any[];

  base64_array_object_data1: any[];
  base64_array_object_data: Array<any> = [];
  File_Info1: any[];
  binaryString: any;
  base64textString: string;
  filename: any;
  filename_extension: any;
  refernceNumber: any;
  crmcomentsArray: any;
  attachmentArray: any;
  receiveDate: any;
  miscommentsArray: any;
  viewTransactionResponse: any;
  operationType: any;
  paymentMode: any;
  transactionAmount: any;
  bankName: any;
  bankID: any;
  transactionReceiveDate: string;
  finTransactionEntryDetails: any;
  transactionType: any;
  transactionID: any;
  transSetOffEntryId: any;
  bookingFormID: any;
  referenceNum: any;
  customerPropertyDetails: any;
  projectName: any;
  blockNumber: any;
  flatNumber: any;
  flatID: any = [];
  siteID: any;
  transReceiveFormat: string;
  attachedFiles: any;
  location: any;
  previousCRMComments: any;
  SetOffResponseList: any;
  setOffTypeName: any;
  setOffAmount: any;
  finBokAccInvoiceNo: any;
  principleAmount: any;
  setOffInterest: any;
  modificationCharges: any;
  modificationChargeInvoiceNo: any;
  LegalCharges: any;
  legalChargeInvoiceNo: any;
  customerCommentsArray: any;
  metadataName: any;
  custComments: any;
  customerComments: string;
  pathName: string;
  blockID: any;
  flattID: any;
  finBookingFormAccountsId: any;
  modificationChargeInvoiceID: any;
  legalChargeInvoiceID: any;
  siteAccountId: any;
  siteBankAccountNumber: any;
  paymentModeID: any;
  bankAccountNumber: any;
  docListArray: any = [];
  fileInfo: any = [];
  refundableAdvance: any;
  lastTransactionEditedDate: any;
  lastTransactionEditedBy: any;
  controller: Array<any> = [];
  sideidname: any;
  con_sitename: any;
  transactionTypeId: any;
  transactionModeId: any;
  transactionTypeName: any;
  transactionModeName: any;
  actualTransactionReceiveDate: any;
  flatIds: any;
  bookingFormId: any;
  actualFlatIds: any;
  actualBookingFormId: any;
  buttonType: string;
  actionUrl: string;
  transactionSetOffEntryId: any;
  transactionNumber: any;
  commentfield: string;
  transactionReceiptNumber: any;
  transactionEntryId: any;
  transactionDate: any;
  transactionStatusNameval: any;
  transactionReceiptNo: any;
  documentLocation: any;
  sourceOfFunds: any;
  paidByName: string;
  deptid: any;
  roleid: any;
  finTransactionSetOffId: any;
  finpaidbyname: any;
  bindingbankname: any;
  bindingbankid: any;
  fileName: string;
  extensiontype: any;
  filetypeurlsplit: any;
  filetypeurlsplit1: any;
  filenamedoc: any;
  filesplitdata: any;
  imgsrc: any;
  fileName1: any;
  Edit_hide_show: boolean;

  ortitle: boolean;


  imageUrl: string;
  filenameval: any;
  deleteArray: Array<any> = [];

  tempfileInfo: Array<any> = [];
  bindingFileInfo: Array<any> = [];
  urls: Array<any> = [];
  resp_onse: any;
  payment_status: any;
  transactionReceive_Date: any;
  bankNameID: any;
  selectbankname: any;

  CorpusFund: any;
  MaintinaceCharges: any;
  FlatKhataBifurcation: any;
  CorpusFund_amount: any;
  bankname: any;
  ModificationInvoiceId: any;
  LegalInvoiceId: any;
  carparkingInvoiceID: any;
  carparkingcost_amount: any;
  Registration_And_Mutation_Charges: any;
  Non_refundable_Caution_Deposit: any;
  Electricity_Deposit: any;
  constructor(private sanitizer: DomSanitizer, private cmn: CommonComponent, private http: Http, private router: Router) {
    this.payment_status = "false;"
    this.deptid = sessionStorage.getItem("session_deptid");
    this.roleid = sessionStorage.getItem("session_roleId");
    console.log(this.deptid)
    console.log(this.roleid)
    if (this.deptid == 993 && this.roleid == 20) {
      $(function () {
        $("#editsubmitid").hide()
        $("#attachfile").hide()

      })
    }
    $('.page-loader-wrapper').hide();
    var json_response;
    json_response = eval('(' + sessionStorage.getItem('view_transaction_data') + ')');
    this.viewTransactionResponse = json_response;
    this.controller = this.viewTransactionResponse;

    console.log(this.controller);
    this.siteID = this.controller['siteId'];
    this.sideidname = this.controller['siteId'];
    this.con_sitename = this.controller['siteName'];
    this.transactionTypeId = this.controller['transactionTypeId'];
    this.transactionModeId = this.controller['transactionModeId'];
    this.transactionTypeName = this.controller['transactionTypeName'];
    this.transactionModeName = this.controller['transactionModeName'];
    this.transactionDate = this.controller['transactionDate'];
    this.transactionReceiveDate = this.controller['transactionReceiveDate'];
    this.actualTransactionReceiveDate = this.controller['transactionReceiveDate'];
    this.transactionAmount = this.controller['transactionAmount'];
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
    this.operationType = this.viewTransactionResponse.operationType;

    console.log(this.operationType);

    this.getReceiptOnlineData();
  }

  ngOnInit() {



    $("#paidbyname").prop("disabled", true);
    if (this.operationType == 'ViewCustomerData') {
      this.pathName = "View Customer Data";

      //  this.Edit_hide_show = true;
      // $("#ChequeDate").prop("disabled", true);
      // $("#ChequeAmount").prop("disabled", true);
      $("#companybankAcId").attr("disabled", false);
      $("#transactionDateID").attr("disabled", false);
      $("#transactionAmountID").attr("disabled", false);
      $("#ReferenceID").attr("disabled", false);

      // $("#FaltId").attr("disabled", false);
      $("#bankNameID").attr("disabled", false);
      $("#Sourcefound").attr("disabled", false);
      $('#PrincipalAmount').attr("disabled", false);
      $('#InterstAmount').attr("disabled", false);
      $('#ModificationCharges').attr("disabled", false);
      $('#LeagalCharges').attr("disabled", false);
      $('#CorpusFund').attr("disabled", false);
      $('#MaintinaceCharges').attr("disabled", false);
      $('#refundableAdvanceID').attr("disabled", false);
      $("#TdsAmount").attr("disabled", false);
      $("#Sourcefound").attr("disabled", false);
      //this.pathName = "View Completed Transactions";
      //this.disableEnableEditableFields(false);
      $('#actionButtons').hide();
      $('#userCommentsLabel').hide();
      $('#userCommentsField').hide();

    } else if (this.operationType == 'approveTransaction') {
      this.pathName = "View Pending Transactions for Approval";
      this.disableEnableEditableFields(false);
    } else if (this.operationType == 'transactionStatus') {
      this.pathName = "View Temporary Transactions";
      this.disableEnableEditableFields(true);
      $('#actionButtons').hide();
      $('#userCommentsLabel').hide();
      $('#userCommentsField').hide();
    } else if (this.operationType == 'loadCompletedTransaction') {
      this.Edit_hide_show = true;
      // $("#ChequeDate").prop("disabled", true);
      // $("#ChequeAmount").prop("disabled", true);
      $("#companybankAcId").attr("disabled", false);
      $("#transactionDateID").attr("disabled", false);
      $("#transactionAmountID").attr("disabled", false);
      $("#ReferenceID").attr("disabled", false);

      // $("#FaltId").attr("disabled", false);
      $("#bankNameID").attr("disabled", false);
      $("#Sourcefound").attr("disabled", false);
      $('#PrincipalAmount').attr("disabled", false);
      $('#InterstAmount').attr("disabled", false);
      $('#ModificationCharges').attr("disabled", false);
      $('#LeagalCharges').attr("disabled", false);
      $('#CorpusFund').attr("disabled", false);
      $('#MaintinaceCharges').attr("disabled", false);
      $('#refundableAdvanceID').attr("disabled", false);
      $("#TdsAmount").attr("disabled", false);
      $("#Sourcefound").attr("disabled", false);
      this.pathName = "View Completed Transactions";
      //this.disableEnableEditableFields(false);
      $('#actionButtons').hide();
      $('#userCommentsLabel').hide();
      $('#userCommentsField').hide();
    } else { }

    var self = this;
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



      var date = new Date().getMonth();
      var minimumdate = new Date().setMonth(date - 3);
      var maximumdate = new Date().setMonth(date + 3);
      $('#transactionDateID').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
        // minDate: new Date(minimumdate),
        // maxDate: new Date(),
        clearButton: true,
        weekStart: 1,
        time: false,
      })

      $("#companybankAcId").select2({
        placeholder: "Search Company Bank Account",
        dir: "ltl"
      });


      $("#paidbyname").select2({
        placeholder: "Paid By",
        dir: "ltl"
      });

      $("#Sourcefound").select2({
        placeholder: "Source of found",
        dir: "ltl"
      });




      $("#bankNameID").select2({
        placeholder: "Search Bank",
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
        placeholder: "--Select--",
        dir: "ltl"
      });

      $("#LegalInvoiceId").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });


      $("#transaction_mode").select2({
        placeholder: "Search Transacion Mode",
        dir: "ltl"
      });


      $("#CarparkingInvoiceId").select2({
        placeholder: "Search Car Parking Invoice",
        dir: "ltl"
      });

      $('#transactionAmountID').bind("cut copy paste", function (e) {
        e.preventDefault();
      });

      $('#PrincipalAmount').bind("cut copy paste", function (e) {
        e.preventDefault();
      });


      $('#CorpusFund').bind("cut copy paste", function (e) {
        e.preventDefault();
      });


      $('#MaintinaceCharges').bind("cut copy paste", function (e) {
        e.preventDefault();
      });

      $('#InterstAmount').bind("cut copy paste", function (e) {
        e.preventDefault();
      });


      $('#ModificationCharges').bind("cut copy paste", function (e) {
        e.preventDefault();
      });

      $('#LeagalCharges').bind("cut copy paste", function (e) {
        e.preventDefault();
      });

      $('#refundableAdvanceID').bind("cut copy paste", function (e) {
        e.preventDefault();
      });


      $('#ModificationInvoiceId').bind("cut copy paste", function (e) {
        e.preventDefault();
      });

      $('#TdsAmount').bind("cut copy paste", function (e) {
        e.preventDefault();
      });

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



      $('#bankNameID').change(function (event) {

        selectElementText = event.target['options']
        [event.target['options'].selectedIndex].text;
        console.log(selectElementText);

        var bankname = $(event.target).val();

        if (bankname == "select") {
          selectbankNameValue = null;
          selectbanknametext = null;
        } else {
          var banknametext = event.target.options[event.target.options.selectedIndex].text;
          selectbankNameValue = event.target.value;
          selectbanknametext = banknametext;

        }




      });



      $('#ProjectId').change(function (e) {
        var siteId = $(e.target).val();

        self.blockList(siteId);


      });


      $("#CarparkingInvoiceId").change(function (e) {
        if ($(e.target).val() !== 'select') {
          $(".carparkinginvoicecls").show();
          carparkingdetails_url = $(e.target).val().split('$$')[1];
          carparkinginvoicenumber = $(e.target).val().split('$$')[0];

        } else {
          $(function () {
            $(".carparkinginvoicecls").hide();
          });
        }
      });



      $('#BlockId').change(function (e) {
        var siteId = $(e.target).val();

        self.flatList(siteId);

      });

      $('#FaltId').change(function (e) {

        flatId = $(e.target).val().split('-')[0];

        flatId_bookingid = $(e.target).val().split('-')[1];

        self.gridDetails(flatId);
        self.modification_legalInvoiceList(flatId);

      });


    });
  }

  /*-----------------Getting Bank names list Start---------------------*/
  bankNamesList() {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/viewFinTransactionTypeModeData.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: headers });

    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "condition": "fecthAllData"
    }
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {

        $('#bankNameID').html('');
        $('#bankNameID').append('<option value="select">--Select--</option>');

        for (var i = 0; i < resp.responseObjList.finBankResponseList.length; i++) {
          $('#bankNameID').append("<option value='" + resp.responseObjList.finBankResponseList[i].finBankId + "'>" + resp.responseObjList.finBankResponseList[i].bankName + "</option>");
          $('#bankNameID').val(this.bankID);
        }


        if (this.sourceOfFunds == null || this.sourceOfFunds == undefined || this.sourceOfFunds == "undefined") {

        } else {
          $('#Sourcefound').html("<option value='select'>Select</option> " + "" + "<option value='Bank'>Bank</option>" + "" + "<option value='Self'>Self</option>");
          $("#Sourcefound").val(this.sourceOfFunds)

        }

        if (this.paidByName == null || this.paidByName == undefined || this.paidByName == "undefined") {

        } else {
          $('#paidbyname').html("<option value='select'>Select</option> " + "" + "<option value='Customer'>Customer</option>" + "" + "<option value='Omsree'>Om sree</option>");
          $("#paidbyname").val(this.paidByName)
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
  /*-----------------Getting Bank names list End---------------------*/

  /*-----------------Getting Project(site) list Start---------------------*/
  siteList() {
    let url = this.cmn.commonUrl + "financial/raisedMilestoneSites.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "actionUrl": "View Suspense Entries"
    }

    console.log(url);
    console.log(JSON.stringify(body));
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      console.log(JSON.stringify(resp));

      if (resp.responseCode == 200) {
        var Options = "";

        $('#ProjectId').html('');
        $('#ProjectId').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#ProjectId').append("<option value='" + resp.responseObjList[i].siteId + "'>" + resp.responseObjList[i].siteName + "</option>");

          $('#blkcls').show();
        }
        console.log(this.siteID);
        $('#ProjectId').val(this.siteID);
        this.siteBankList(this.siteID);
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
  /*-----------------Getting Project(site) list End---------------------*/



  /*-----------------Getting Blocks list start---------------------*/
  blockList(siteid) {
    $('.page-loader-wrapper').show();
    // -------------------------------
    let url = this.cmn.commonUrl + "financial/activeBlocksFlats.spring";
    // http://localhost:8080/employeeservice/flat/flatBlock.spring
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteIds": [siteid]
    }
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      //this.Blocklinks =  resp;
      if (resp.responseCode == 200) {
        this.flatList(this.blockID);

        $('#BlockId').html('');
        $('#BlockId').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#BlockId').append("<option value='" + resp.responseObjList[i].blockId + "'>" + resp.responseObjList[i].blockName + "</option>");
          $('#BlockId').val(this.blockID);
          // $("#BlockId").attr("disabled", false);
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
  /*-----------------Getting Blocks list End---------------------*/

  /*-----------------Getting Flats list Start---------------------*/
  flatList(blockid) {
    $('.page-loader-wrapper').show();
    // -------------------------------
    let url = this.cmn.commonUrl + "financial/activeBlocksFlats.spring";
    // http://localhost:8080/employeeservice/flat/flatBlock.spring
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "blockIds": [blockid]//$("#BlockId").val()
    }
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      //this.Blocklinks =  resp;
      if (resp.responseCode == 200) {

        this.gridDetails(this.flattID);
        this.modification_legalInvoiceList(this.flattID);
        $('#FaltId').html('');
        $('#FaltId').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#FaltId').append("<option value='" + resp.responseObjList[i].flatId + "-" + resp.responseObjList[i].flatBookingId + "'>" + resp.responseObjList[i].flatNo + "</option>");
          $('#FaltId').val(this.flattID + "-" + this.bookingFormId);
        }
        $("#PaymentSetOffDiv").show();
        // $("#FaltId").val(this.flat_Id + "-" + this.flatBookingId);
        // this.gridDetails(this.flat_Id);
        // this.modification_legalInvoiceList(this.flat_Id);
        // flatId = this.flat_Id;
        // flatId_bookingid = this.flatBookingId;
        // $("#FaltId").attr("disabled", false);
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
  /*-----------------Getting Flats list End---------------------*/

  /*-----------------Getting grid details start---------------------*/
  gridDetails(flatId) {
    $('.page-loader-wrapper').show();
    // -------------------------------
    let url = this.cmn.commonUrl + "financial/viewPendingAmount.spring";
    // http://localhost:8080/employeeservice/flat/flatBlock.spring
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "flatIds": [flatId],//$("#FaltId").val()
      "bookingFormIds": [flatId_bookingid],
      "requestUrl": "CompletedTransaction",
      "transactionEntryId": this.viewTransactionResponse.transactionEntryId,
      "transactionTypeId": "" + this.viewTransactionResponse.transactionTypeId,
      "transactionModeId": "" + this.viewTransactionResponse.transactionModeId,
      "transferModeId": "" + this.paymentModeID,
      "transactionTypeName": "" + this.viewTransactionResponse.transactionTypeName,
      "transactionModeName": "" + this.viewTransactionResponse.transactionModeName,

    }
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      if (resp.responseCode == 200) {
        // alert(JSON.stringify(resp))
        $('.page-loader-wrapper').hide();
        this.totalPenaltyAmount = resp.responseObjList.financialProjectMileStoneResponse[0].totalPenaltyAmount;
        this.totaldueamount = resp.responseObjList.financialProjectMileStoneResponse[0].totalDueAmount;
        this.customerName = resp.responseObjList.financialProjectMileStoneResponse[0].customerName;
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

        $('.page-loader-wrapper').hide();
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }
  /*-----------------Getting grid details End---------------------*/

  /*-----Getting modification and legal invoices list start------------*/
  modification_legalInvoiceList(flatId) {
    $('.page-loader-wrapper').show();
    // -------------------------------
    let url = this.cmn.commonUrl + "financial/viewPendingAmount.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "flatIds": [flatId].map(Number),//$("#FaltId").val(),
      "condition": "CRM_COMMENTS",
      "bookingFormIds": [flatId_bookingid],
      "requestUrl": "CompletedTransaction",
      "transactionEntryId": this.viewTransactionResponse.transactionEntryId,
      "transactionTypeId": "" + this.viewTransactionResponse.transactionTypeId,
      "transactionModeId": "" + this.viewTransactionResponse.transactionModeId,
      "transferModeId": "" + this.paymentModeID,
      "transactionTypeName": "" + this.viewTransactionResponse.transactionTypeName,
      "transactionModeName": "" + this.viewTransactionResponse.transactionModeName,
    }
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

      console.log(resp);
      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        for (var i = 0; i < resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList.length; i++) {
          this.setOffTypeName = resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].metadataName;
          if (this.setOffTypeName == "MODIFICATION_COST") {
            $('#ModificationInvoiceId').append('<option value="select">--Select--</option>');

            $('#ModificationInvoiceId').append("<option value='" + resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo + "'>" + resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo + "</option>");
            $('#ModificationInvoiceId').val(this.modificationChargeInvoiceNo);
          } else if (this.setOffTypeName == "LEGAL_COST") {
            $('#LegalInvoiceId').append('<option value="select">--Select--</option>');
            $('#LegalInvoiceId').append("<option value='" + resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo + "'>" + resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo + "</option>");
            $('#LegalInvoiceId').val(this.legalChargeInvoiceNo);
          } else if (this.setOffTypeName == "CAR_PARKING_COST") {

            $(".carparkinginvoicecls").show();

            $('#CarparkingInvoiceId').append("<option value='" + resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo + '$$' + resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].documentLocation + "'>" + resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo + "</option>");


            if (resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo == this.carparkingInvoiceID) {
              $('#CarparkingInvoiceId').val(resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo + '$$' + resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].documentLocation);

              carparkingdetails_url = resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].documentLocation;


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

        $('.page-loader-wrapper').hide();
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }
  /*-----Getting modification and legal invoices list End------------*/
  handle_FileSelect(evt) {

    this.fileExtension_array = [];
    this.file_name_array1 = [];
    this.base64_array_object_data1 = [];
    this.File_Info1 = [];
    var files = evt.target.files;
    var file_val = evt.target.value;
    this.filename = evt.target.files[0].name.toLowerCase();

    this.filename_extension = this.filename.split('.').pop();



    if (this.filename_extension == "jpg" || this.filename_extension == "JPG" || this.filename_extension == "png" || this.filename_extension == "PNG"
      || this.filename_extension == "jpeg" || this.filename_extension == "JPEG" || this.filename_extension == "pdf"
      || this.filename_extension == "PDF") {

      const fsize = files.item(i).size;
      const file_second = Math.round((fsize / 1024));
      if (file_second >= 1024) {
        $("#files").val(null);
        swal("File too Big, please select a file less than 1MB");
        return false;
      } else {
        for (var i = 0; i < files.length; i++) {
          var temp = evt.target.files[i].name.toLowerCase();
          var tempFileExtension = temp.split('.').pop();
          this.filenameval = temp.split('.').pop();
          this.fileExtension_array.push(tempFileExtension);
          this.file_name_array1.push(temp);


          var file = files[i];

          console.log(file);

          if (files && file) {
            var reader = new FileReader();
            reader.onload = this._handleReader_Loaded.bind(this);
            reader.readAsBinaryString(file);
          } else {

          }
        }



        if (evt.target.files && evt.target.files[0]) {
          var filesAmount = evt.target.files.length;
          for (let i = 0; i < filesAmount; i++) {
            var reader = new FileReader();
            reader.onload = (event: any) => {
              this.urls.push({
                'upload': event.target.result,
                'Type': this.filenameval,
                'Name': this.filename,
              });

            }

            reader.readAsDataURL(evt.target.files[i]);
          }
        }


      }
    } else {
      $('#files').val("");
      $('#files').css("color", "transparent");
      swal("The selected file format is invalid, please upload only .jpg, .png, .pdf");
      return false;
      this.urls = [];

      this.tempfileInfo = [];
    }


  }


  Deleteimage(val) {
    this.tempfileInfo.splice(val, 1);
    this.urls.splice(val, 1);
    if (this.tempfileInfo.length == 0) {
      $('#files').css("color", "black");
      $('#files').val("");
      $('#imageLinkField').show();
      this.ortitle = true;
    } else {
      $('#imageLinkField').hide();
      this.ortitle = false;
    }
  }

  Deleteimage1(val, item) {
    if (confirm("Do you want to Delete the file ?")) {
      debugger;
      this.bindingFileInfo.splice(val, 1);
      // this.tempfileInfo= [];

      // this.urls.splice(val, 1);
      this.deleteArray.push(
        {
          "id": item.id,
          "filePath": item.filePath,
          "url": item.url
        }
      )
      if (this.bindingFileInfo.length == 0) {
        $('#files').css("color", "black");
        $('#files').val("");
        $('#imageLinkField').show();
        this.ortitle = true;
      } else {
        $('#imageLinkField').hide();
        this.ortitle = false;
      }
      console.log("-------Deleted Array object :" + JSON.stringify(this.deleteArray));
      console.log("---bindingFileInfo object array :" + JSON.stringify(this.bindingFileInfo));
    } else { }

  }

  _handleReader_Loaded(readerEvt) {

    console.log(readerEvt.target.result);

    this.binaryString = readerEvt.target.result;
    this.base64textString = btoa(this.binaryString);
    this.base64_array_object_data.push(btoa(this.binaryString));
    this.imageUrl = "data:image/jpeg;base64," + btoa(this.binaryString);

    console.log(this.imageUrl);

    $('#files').css("color", "transparent");

    this.tempfileInfo.push({
      "extension": this.filename_extension,
      "name": this.filename,
      "base64": this.imageUrl
    });


    console.log(this.tempfileInfo);


  }

  /*--------------------------Receipt Online data start------------------*/
  getReceiptOnlineData() {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/viewMisReceiptChequeOnlineData.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: headers }); 

    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "transactionEntryId": this.viewTransactionResponse.transactionEntryId,
      "bookingFormId": this.viewTransactionResponse.bookingFormId,
      "transactionModeName": "" + this.viewTransactionResponse.transactionModeName,
      "operationType": "" + this.operationType
    }
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {

      console.log(resp);

      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        this.resp_onse = resp;

        this.customerPropertyDetails = resp.responseObjList.customerPropertyDetailsInfoList[0];
        this.projectName = this.customerPropertyDetails.siteName;
        this.blockNumber = this.customerPropertyDetails.blockName;
        this.flatNumber = this.customerPropertyDetails.flatNo;
        this.flatID.push(this.customerPropertyDetails.flatId);
        this.siteID = this.customerPropertyDetails.siteId;
        this.blockID = this.customerPropertyDetails.blockId;
        this.flattID = this.customerPropertyDetails.flatId;



        this.finTransactionEntryDetails = resp.responseObjList.finTransactionEntryDetailsResponseList[0];
        this.transactionType = this.viewTransactionResponse.transactionTypeName;
        this.transactionID = this.finTransactionEntryDetails.finTransactionNo;
        this.siteAccountId = this.finTransactionEntryDetails.siteAccountId;
        this.transactionReceive_Date = this.finTransactionEntryDetails.transactionReceiveDate;
        this.siteBankAccountNumber = this.finTransactionEntryDetails.siteBankAccountNumber;

        this.transactionReceiptNo = this.finTransactionEntryDetails.transactionReceiptNo;

        this.documentLocation = this.finTransactionEntryDetails.transactionReceiptDocResponsesList;

        console.log(this.documentLocation);

        this.sourceOfFunds = resp.responseObjList.finTransactionEntryDetailsResponseList[0].sourceOfFunds;

        //  this.transactionEntryId = this.finTransactionEntryDetails.transactionEntryId;
        this.transSetOffEntryId = this.finTransactionEntryDetails.transactionSetOffEntryId;
        this.bookingFormID = this.finTransactionEntryDetails.bookingFormId;
        this.referenceNum = this.finTransactionEntryDetails.referenceNo;
        $('#ReferenceID').val(this.referenceNum);

        // this.transactionDate = this.finTransactionEntryDetails.transactionDate;
        // var transDate = new Date(this.transactionDate).toLocaleDateString(); 
        // $('#transactionDateID').val(transDate);
        this.paymentModeID = this.finTransactionEntryDetails.transferModeId;
        this.paymentMode = this.finTransactionEntryDetails.transferMode;
        $('#paymentModeID').val(this.paymentMode);

        this.transactionAmount = this.finTransactionEntryDetails.transactionAmount;
        $('#transactionAmountID').val(this.transactionAmount);

        this.bankName = this.finTransactionEntryDetails.bankName;
        this.bankID = this.finTransactionEntryDetails.finBankId;
        // this.bankAccountNumber = this.finTransactionEntryDetails.bankAccountNumber;

        // Milliseconds to date (DD-MM-YYYY) convertion
        if (this.finTransactionEntryDetails.transactionReceiveDate == "null") {
          this.transReceiveFormat = "";
        } else {
          this.transactionReceiveDate = this.finTransactionEntryDetails.transactionReceiveDate;
          var transRceiveDate = new Date(this.transactionReceiveDate);
          var year = transRceiveDate.getFullYear();
          var month = ("0" + (transRceiveDate.getMonth() + 1)).slice(-2);
          var day = ("0" + transRceiveDate.getDate()).slice(-2);
          this.transReceiveFormat = year + "-" + month + "-" + day;
          $('#transactionDateID').val(this.transReceiveFormat);
        }


        this.docListArray = resp.responseObjList.finTransactionEntryDetailsResponseList[0].transactionEntryDocResponsesList;

        for (var i = 0; i < this.docListArray.length; i++) {
          this.bindingFileInfo.push({
            "extension": this.docListArray[i].documentName.split('.').pop(),
            "name": this.docListArray[i].documentName,
            "filePath": this.docListArray[i].filePath,
            "url": this.docListArray[i].documentLocation,
            "id": this.docListArray[i].transactionEntryDocId
          });
          console.log("----------" + JSON.stringify(this.tempfileInfo))

        }

        console.log(this.docListArray);
        for (var i = 0; i < this.docListArray.length; i++) {
          this.toDataURL(this.docListArray[i].documentLocation, function (dataUrl) {
            convertbasesixtyfour.push(dataUrl)
          })
        }


        this.previousCRMComments = this.finTransactionEntryDetails.finTransactionApprStatResponseList;
        this.SetOffResponseList = resp.responseObjList.finTransactionEntryDetailsResponseList[0].finTransactionSetOffResponseList;

        for (let i = 0; i < this.SetOffResponseList.length; i++) {
          this.setOffTypeName = this.SetOffResponseList[i].setOffTypeName;
          this.setOffAmount = this.SetOffResponseList[i].setOffAmount;

          console.log(this.setOffTypeName);



          if (this.SetOffResponseList[i].paidByName !== null) {
            this.paidByName = this.SetOffResponseList[i].paidByName;
          }


          this.finBokAccInvoiceNo = this.SetOffResponseList[i].finBokAccInvoiceNo;
          this.finBookingFormAccountsId = this.SetOffResponseList[i].finBookingFormAccountsId

          if (this.setOffTypeName == "Corpus_Fund") {

            this.CorpusFund_amount = this.setOffAmount;
            $('#CorpusFund').val(this.CorpusFund_amount);


          } else if (this.setOffTypeName == "FIN_BOOKING_FORM_MILESTONES") {
            this.principleAmount = this.setOffAmount;
            $('#PrincipalAmount').val(this.principleAmount);
          } else if (this.setOffTypeName == "FIN_PENALTY") {
            this.setOffInterest = this.setOffAmount;
            $('#InterstAmount').val(this.setOffInterest);
          } else if (this.setOffTypeName == "MODIFICATION_COST") {
            this.modificationCharges = this.setOffAmount;
            $('#ModificationCharges').val(this.modificationCharges);
            // $('#modifiChargeInvNo').show();
            this.modificationChargeInvoiceID = this.finBookingFormAccountsId;
            this.modificationChargeInvoiceNo = this.finBokAccInvoiceNo;
          } else if (this.setOffTypeName == "LEGAL_COST") {
            this.LegalCharges = this.setOffAmount;
            $('#LeagalCharges').val(this.LegalCharges);
            // $('#legalChargeInvNo').show();
            this.legalChargeInvoiceID = this.finBookingFormAccountsId;
            this.legalChargeInvoiceNo = this.finBokAccInvoiceNo;
          } else if (this.setOffTypeName == "REFUNDABLE_ADVANCE") {
            this.refundableAdvance = this.setOffAmount;
            $('#refundableAdvanceID').val(this.refundableAdvance);
          } else if (this.setOffTypeName == "TDS") {
            this.finTransactionSetOffId = this.SetOffResponseList[i].finTransactionSetOffId;
            $("#TdsAmount").val(this.setOffAmount);

            if (this.paidByName !== null) {
              $("#paidbyname").val(this.paidByName);
            }


          } else if (this.setOffTypeName == "Maintenance_Charge") {
            $("#MaintinaceCharges").val(this.setOffAmount);

          }
          else if (this.setOffTypeName == "Individual_Flat_Khata_bifurcation_and_other_charges") {
            $("#FlatKhataBifurcation").val(this.setOffAmount);
          } else if (this.setOffTypeName == "CAR_PARKING_COST") {
            $('#carparkingcost').val(this.setOffAmount);

            this.carparkingInvoiceID = resp.responseObjList.finTransactionEntryDetailsResponseList[0].finTransactionSetOffResponseList[i].finBokAccInvoiceNo;
            carparkinginvoicenumber = resp.responseObjList.finTransactionEntryDetailsResponseList[0].finTransactionSetOffResponseList[i].finBokAccInvoiceNo;
            carparkingdetails_url = resp.responseObjList.finTransactionEntryDetailsResponseList[0].finTransactionSetOffResponseList[i].documentLocation;
          } else if(this.setOffTypeName == "REGISTRATION_AND_MUTATION_CHARGES"){
            $('#Registration_and_Mutation_Charges').val(this.setOffAmount);

          } else if(this.setOffTypeName == "NON_REFUNDABLE_CAUTION_DEPOSIT"){
            $('#Non_refundable_Caution_Deposit').val(this.setOffAmount);
          } 
           else if(this.setOffTypeName == "ELECTRICITY_DEPOSIT"){
            $('#Electricity_Deposit').val(this.setOffAmount);
          }

        }

        if (this.modificationChargeInvoiceNo == undefined) {
          this.modificationChargeInvoiceNo = "";
        }
        if (this.legalChargeInvoiceNo == undefined) {
          this.legalChargeInvoiceNo = "";
        }

        this.siteList();
        this.bankNamesList();
        this.blockList(this.siteID);

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
  /*--------------------------Mis Receipt Online data End------------------*/

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


  editSubmit() {



    if (selectbankNameValue !== undefined && selectbanknametext !== undefined) {
      this.bindingbankname = selectbanknametext;
      this.bindingbankid = selectbankNameValue;
    } else if (this.bankID !== null && this.bankName !== null) {
      this.bindingbankname = this.bankName;
      this.bindingbankid = this.bankID;
    } else {
      this.bindingbankname = null;
      this.bindingbankid = null;
    }



    if ($("#transactionDateID").val() == "") {
      swal("Please select received date");
      //$('#ChequeDate').focus();
      return false;
    }

    if ($("#transactionAmountID").val() == "") {
      swal("Please enter transaction amount");
      $('#transactionAmountID').focus();
      return false;
    }


    if ($("#bankNameID").val() == "select") {
      swal("Please select bank name");
      $('#bankNameID').focus();
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

    if ($("#FlatKhataBifurcation").val() == undefined || $("#FlatKhataBifurcation").val() == "" || $("#FlatKhataBifurcation").val() == "0") {
      this.FlatKhataBifurcation = 0;
    } else {
      this.FlatKhataBifurcation = $("#FlatKhataBifurcation").val();
    }


    if ($("#carparkingcost").val() == undefined || $("#carparkingcost").val() == "") {
      this.carparkingcost_amount = 0;
    } else {
      this.carparkingcost_amount = $("#carparkingcost").val();
    }


    if ($("#Registration_and_Mutation_Charges").val() == undefined || $("#Registration_and_Mutation_Charges").val() == "") {
      this.Registration_And_Mutation_Charges = 0;
    } else {
      this.Registration_And_Mutation_Charges = $("#Registration_and_Mutation_Charges").val();
    }


    if ($("#Non_refundable_Caution_Deposit").val() == undefined || $("#Non_refundable_Caution_Deposit").val() == "") {
      this.Non_refundable_Caution_Deposit = 0;
    } else {
      this.Non_refundable_Caution_Deposit = $("#Non_refundable_Caution_Deposit").val();
    }


    if ($("#Electricity_Deposit").val() == undefined || $("#Electricity_Deposit").val() == "") {
      this.Electricity_Deposit = 0;
    } else {
      this.Electricity_Deposit = $("#Electricity_Deposit").val();
    }
    

    if (($("#PrincipalAmount").val() == "0" || $("#PrincipalAmount").val() == "")
      && ($("#ModificationCharges").val() == "0" || $("#ModificationCharges").val() == "") &&
      ($("#InterstAmount").val() == "0" || $("#InterstAmount").val() == "")
      && ($("#LeagalCharges").val() == "0" || $("#LeagalCharges").val() == "")
      && ($("#refundableAdvanceID").val() == "0" || $("#refundableAdvanceID").val() == "") && ($('#TdsAmount').val() == "0" || $('#TdsAmount').val() == "") && this.CorpusFund == "0" && this.MaintinaceCharges == "0" && this.FlatKhataBifurcation == "0" && this.carparkingcost_amount == "0" && this.Registration_And_Mutation_Charges == "0" && this.Non_refundable_Caution_Deposit == "0" && this.Electricity_Deposit == "0") {
      swal("Please enter Principle amount (OR) Corpus Fund (OR) Maintenance Charges (OR) Flat Khata Bifurcation (OR) Interest amount (OR) Modification charges (OR) Legal charges (OR) Refundable Advance (OR) Car parking cost (OR) Registration And Mutation Charges (OR) Non-refundable Caution Deposit (OR) Electricity Deposit");
      return false;
    }


    if ($("#ModificationCharges").val() != "" && $("#ModificationCharges").val() != "0") {
      if ($("#ModificationInvoiceId").val() == "" || $("#ModificationInvoiceId").val() == null) {
        $("#ModificationInvoiceId").attr("disabled", false);
        $('#ModificationInvoiceId').focus();
        swal("Please select modification invoice");
        return false;
      }
    }

    if ($("#LeagalCharges").val() != "0" && $("#LeagalCharges").val() != "") {
      if ($("#LegalInvoiceId").val() == "" || $("#LegalInvoiceId").val() == null) {
        $("#LegalInvoiceId").attr("disabled", false);
        $('#LegalInvoiceId').focus();
        swal("Please select legal invoice");
        return false;
      }
    }

    if ($("#ModificationInvoiceId").val() != "" && $("#ModificationInvoiceId").val() != null && $("#ModificationInvoiceId").val() != 'select') {
      if ($("#ModificationCharges").val() == "" || $("#ModificationCharges").val() == "0") {
        $('#ModificationCharges').focus();
        swal("Please enter the modification charges");
        return false;
      }
    }

    console.log($("#LegalInvoiceId").val());
    console.log($("#LeagalCharges").val());
    if ($("#LegalInvoiceId").val() != "" && $("#LegalInvoiceId").val() != null && $("#LegalInvoiceId").val() != 'select') {
      if ($("#LeagalCharges").val() == "" || $("#LeagalCharges").val() == "0") {
        $('#LeagalCharges').focus();
        swal("Please enter the legal charges");
        return false;
      }
    }

    var tempamount = (Number($('#PrincipalAmount').val()) + Number($('#InterstAmount').val()) + Number($('#refundableAdvanceID').val()) + Number($('#ModificationCharges').val())
      + Number($('#LeagalCharges').val())) + Number(this.CorpusFund) + Number(this.MaintinaceCharges) + Number(this.FlatKhataBifurcation) + Number(this.carparkingcost_amount)
      + Number($('#TdsAmount').val()) + Number(this.Registration_And_Mutation_Charges) + Number(this.Non_refundable_Caution_Deposit) + Number(this.Electricity_Deposit);
    //alert(Number(tempamount).toFixed(2))
    if (Number(tempamount.toFixed(2)) > Number($('#transactionAmountID').val())) {
      swal("Payment Setoff should be equal to transaction amount");
      return false;
    }

    if (Number(tempamount.toFixed(2)) < Number($('#transactionAmountID').val())) {
      swal("Payment Setoff should be equal to transaction amount");
      return false;
    }
    console.log($("#paidbyname").val());


    if (Number($('#TdsAmount').val()) !== 0 && $("#paidbyname").val() == "" || Number($('#TdsAmount').val()) !== 0 && $("#paidbyname").val() == "select") {
      swal("Please select paid by name");
      return false
    }


    this.finpaidbyname = $("#paidbyname").val();

    if (this.finpaidbyname == "select") {
      this.finpaidbyname = null;
    }

    if ($("#Sourcefound").val() == "" || $("#Sourcefound").val() == "select") {
      swal("Please select Source of funds");
      $('#CustomerCommentsId').focus();
      return false;
    }


    if ($("#companybankAcId").val() == "select" || $("#companybankAcId").val() == null) {
      swal("Please select company bank account number");
      $('#transaction_type').focus();
      return false;
    }

    console.log($("#bankNameID").val());
    if ($("#bankNameID").val() == "select" || $("#bankNameID").val() == null) {
      this.bankNameID = null;
      this.bankname = null;
    } else {
      this.bankNameID = $("#bankNameID").val();
      this.bankname = $('#bankNameID').select2('data')[0].text;
    }


    console.log(this.bankNameID);
    console.log(this.bankname);




    if (confirm("Do you want to Submit the Page ?")) {


      for (var i = 0; i < this.bindingFileInfo.length; i++) {
        this.tempfileInfo.push({
          "extension": this.bindingFileInfo[i].extension,
          "name": this.bindingFileInfo[i].name,
          "filePath": this.bindingFileInfo[i].filePath,
          "url": this.bindingFileInfo[i].url
        });


      }





      var temp1 = new Date(this.transactionReceive_Date)
      var temp2 = new Date($("#transactionDateID").val())

      if (temp1.getDate() == temp2.getDate() && temp1.getMonth() + 1 == temp2.getMonth() + 1 && temp1.getFullYear() == temp2.getFullYear()) {

      } else {

        this.payment_status = "true"
      }




      for (var i = 0; i < this.resp_onse.responseObjList.finTransactionEntryDetailsResponseList[0].finTransactionSetOffResponseList.length; i++) {
        this.setOffTypeName = this.resp_onse.responseObjList.finTransactionEntryDetailsResponseList[0].finTransactionSetOffResponseList[i].setOffTypeName;
        this.setOffAmount = this.resp_onse.responseObjList.finTransactionEntryDetailsResponseList[0].finTransactionSetOffResponseList[i].setOffAmount;
        this.paidByName = this.resp_onse.responseObjList.finTransactionEntryDetailsResponseList[0].finTransactionSetOffResponseList[i].paidByName;


        if (this.setOffTypeName == "MODIFICATION_COST") {
          if (this.setOffAmount != $('#ModificationCharges').val()) {
            this.payment_status = "true"
          }


        } else if (this.setOffTypeName == "FIN_BOOKING_FORM_MILESTONES") {
          if (this.setOffAmount != $('#PrincipalAmount').val()) {
            this.payment_status = "true"
          }

        } else if (this.setOffTypeName == "LEGAL_COST") {
          if (this.setOffAmount != $('#LeagalCharges').val()) {
            this.payment_status = "true"
          }


        } else if (this.setOffTypeName == "FIN_PENALTY") {
          if (this.setOffAmount != $('#InterstAmount').val()) {
            this.payment_status = "true"
          }

        } else if (this.setOffTypeName == "REFUNDABLE_ADVANCE") {
          if (this.setOffAmount != $('#refunableCharges').val()) {
            this.payment_status = "true"
          }

        } else if (this.setOffTypeName == "TDS") {

          this.finTransactionSetOffId = this.resp_onse.responseObjList.finTransactionEntryDetailsResponseList[0].finTransactionSetOffResponseList[i].finTransactionSetOffId;
          if (this.setOffAmount != $('#TdsAmount').val()) {
            this.payment_status = "true"
          }
          $("#TdsAmount").val(this.setOffAmount);
          $("#paidbyname").val(this.paidByName);
          if (this.setOffAmount !== null) {
            $("#paidbyname").prop("disabled", false);
          }

        }
      }

      if (this.finTransactionSetOffId == undefined || this.finTransactionSetOffId == "undefined" || this.finTransactionSetOffId == "") {
        this.finTransactionSetOffId = 0;
      }


      if (selectElementText == "--Select--" || selectElementText == "-" || selectElementText == null || selectElementText == "undefined" || selectElementText == undefined) {
        this.selectbankname = null;
      } else {
        this.selectbankname = selectElementText;
      }

      if ($("#ModificationInvoiceId").val() == "select" || $("#ModificationInvoiceId").val() == "" || $("#ModificationInvoiceId").val() == undefined) {
        this.ModificationInvoiceId = "";
      } else {

        this.ModificationInvoiceId = $("#ModificationInvoiceId").val();
      }

      if ($("#LegalInvoiceId").val() == "select" || $("#LegalInvoiceId").val() == "" || $("#LegalInvoiceId").val() == undefined) {
        this.LegalInvoiceId = "";
      } else {
        this.LegalInvoiceId = $("#LegalInvoiceId").val();
      }


      $('.page-loader-wrapper').show();
      // -------------------------------
      let url = this.cmn.commonUrl + "financial/editFinancialTransaction.spring";
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      var body = {
        "sessionKey": sessionStorage.getItem("login_sessionkey"),
        "siteId": $("#ProjectId").val(),
        "siteName": $('#ProjectId').select2('data')[0].text,
        "transactionTypeId": "" + this.viewTransactionResponse.transactionTypeId,
        "transactionModeId": "" + this.viewTransactionResponse.transactionModeId,
        "transferModeId": "" + this.paymentModeID,
        "transactionTypeName": "" + this.viewTransactionResponse.transactionTypeName,
        "transactionModeName": "" + this.viewTransactionResponse.transactionModeName,
        "transferModeName": "" + this.paymentMode,
        "referenceNo": "" + $("#ReferenceID").val(),
        "transactionReceiveDate": "" + new Date($("#transactionDateID").val()).getTime(),
        "transactionAmount": "" + $("#transactionAmountID").val(),
        "flatIds": [($("#FaltId").val()).split("-")[0]],
        "bookingFormId": "" + ($("#FaltId").val()).split("-")[1],
        "flatNames": [$('#FaltId').select2('data')[0].text],
        "actualFlatIds": [this.flattID],
        "actualBookingFormId": "" + this.bookingFormID,
        "actualFlatNames": [this.flatNumber],
        "isRecievedDateORSetOffChanged": this.payment_status,
        "bankId": this.bankNameID,
        "bankName": this.bankname,
        "siteAccountId": $("#companybankAcId").val(),
        "siteBankAccountNumber": $("#companybankAcId").select2('data')[0].text,
        "paymentSetOff": "true",
        "sourceOfFunds": $("#Sourcefound").val(),
        "paymentSetOffDetails": [{ "setOffTypeName": "Principal_Amount", "amount": $("#PrincipalAmount").val() }
          , { "setOffTypeName": "Fin_Penalty", "amount": $("#InterstAmount").val() }
          , { "setOffTypeName": "Refundable_Advance", "amount": $("#refundableAdvanceID").val(), "invoiceNo": "" }
          , { "setOffTypeName": "Modification_Cost", "amount": $("#ModificationCharges").val(), "invoiceNo": this.ModificationInvoiceId }

          , { "setOffTypeName": "Car_Parking_Cost", "amount": $("#carparkingcost").val(), "invoiceNo": carparkinginvoicenumber }

          , { "setOffTypeName": "Legal_Cost", "amount": $("#LeagalCharges").val(), "invoiceNo": this.LegalInvoiceId }
          , { "setOffTypeName": "TDS", "amount": $("#TdsAmount").val(), "paidByName": this.finpaidbyname }
          , { "setOffTypeName": "Maintenance_Charge", "amount": this.MaintinaceCharges }
          , { "setOffTypeName": "Corpus_Fund", "amount": this.CorpusFund }
          , { "setOffTypeName": "Individual_Flat_Khata_bifurcation_and_other_charges", "amount": this.FlatKhataBifurcation }

          , { "setOffTypeName": "Registration_And_Mutation_Charges", "amount": this.Registration_And_Mutation_Charges }
          , { "setOffTypeName": "Non_refundable_Caution_Deposit", "amount": this.Non_refundable_Caution_Deposit }
          , { "setOffTypeName": "Electricity_Deposit", "amount": this.Electricity_Deposit }

        ],
        "comment": "" + $('#CustomerCommentsId').val(),
        "buttonType": "Modify",
        "chequeDepositedDate": null,
        "chequeClearanceDate": null,
        "operationType": "Modify",
        "prevTransactionEntryId": "" + this.viewTransactionResponse.transactionEntryId,
        "transactionEntryId": "" + this.viewTransactionResponse.transactionEntryId,
        "transactionSetOffEntryId": this.transSetOffEntryId,
        "fileInfos": this.tempfileInfo,
        "deleteFileInfos": this.deleteArray

      }

      console.log(body);
      console.log(JSON.stringify(body));



      this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
        $('.page-loader-wrapper').hide();
        console.log(JSON.stringify(resp));
        if (resp.responseCode == 200) {
          this.tempfileInfo = [];
          $('.page-loader-wrapper').hide();
          swal("Transaction updated successfully")
          if (this.operationType == "ViewCustomerData") {
            this.router.navigateByUrl('shortcut-components');
          } else {
            this.router.navigate(["View-Completed-Transactions"])
          }

        } else if (resp.responseCode == 440) {
          this.tempfileInfo = [];
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        } else {
          this.tempfileInfo = [];
          swal(resp.errors[0]);
        }
      },
        error => {
          //  var error = JSON.parse(error._body).responseCode;

          $('.page-loader-wrapper').hide();
          if (error == 440) {
            swal("Your Session has been Timed Out!", "Please login once again.", "error");
            this.router.navigate([""]);
          }
        }
      );
    } else { }

  }
  /*-------------------------------Final Submission Start----------------------------*/
  CRMReceiptonlineSubmit() {




    if (selectbankNameValue !== undefined && selectbanknametext !== undefined) {
      this.bindingbankname = selectbanknametext;
      this.bindingbankid = selectbankNameValue;
    } else if (this.bankID !== null && this.bankName !== null) {
      this.bindingbankname = this.bankName;
      this.bindingbankid = this.bankID;
    } else {
      this.bindingbankname = null;
      this.bindingbankid = null;
    }

    if ($("#transactionDateID").val() == "") {
      swal("Please select received date");
      //$('#ChequeDate').focus();
      return false;
    }

    if ($("#transactionAmountID").val() == "") {
      swal("Please enter transaction amount");
      $('#transactionAmountID').focus();
      return false;
    }


    // if ($("#bankNameID").val() == "select") {
    //   swal("Please select bank name");
    //   $('#bankNameID').focus();
    //   return false;
    // }

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


    if ($("#carparkingcost").val() == undefined || $("#carparkingcost").val() == "") {
      this.carparkingcost_amount = 0;
    } else {
      this.carparkingcost_amount = $("#carparkingcost").val();
    }

    if ($("#Registration_and_Mutation_Charges").val() == undefined || $("#Registration_and_Mutation_Charges").val() == "") {
      this.Registration_And_Mutation_Charges = 0;
    } else {
      this.Registration_And_Mutation_Charges = $("#Registration_and_Mutation_Charges").val();
    }


    if ($("#Non_refundable_Caution_Deposit").val() == undefined || $("#Non_refundable_Caution_Deposit").val() == "") {
      this.Non_refundable_Caution_Deposit = 0;
    } else {
      this.Non_refundable_Caution_Deposit = $("#Non_refundable_Caution_Deposit").val();
    }


    if ($("#Electricity_Deposit").val() == undefined || $("#Electricity_Deposit").val() == "") {
      this.Electricity_Deposit = 0;
    } else {
      this.Electricity_Deposit = $("#Electricity_Deposit").val();
    }


    if (($("#PrincipalAmount").val() == "0" || $("#PrincipalAmount").val() == "")
      && ($("#ModificationCharges").val() == "0" || $("#ModificationCharges").val() == "") &&
      ($("#InterstAmount").val() == "0" || $("#InterstAmount").val() == "")
      && ($("#LeagalCharges").val() == "0" || $("#LeagalCharges").val() == "")
      && ($("#refundableAdvanceID").val() == "0" || $("#refundableAdvanceID").val() == "") && ($('#TdsAmount').val() == "0" || $('#TdsAmount').val() == "") && this.CorpusFund == "0" && this.MaintinaceCharges == "0" && this.FlatKhataBifurcation == "0" && this.carparkingcost_amount == "0" && this.Registration_And_Mutation_Charges == "0" && this.Non_refundable_Caution_Deposit == "0" && this.Electricity_Deposit == "0") {
      swal("Please enter Principle amount (OR) Corpus Fund (OR) Maintenance Charges (OR) Flat Khata Bifurcation (OR) Interest amount (OR) Modification charges (OR) Legal charges (OR) Refundable Advance (OR) Registration And Mutation Charges (OR) Non-refundable Caution Deposit (OR) Electricity Deposit");
      return false;
    }

    if ($("#ModificationCharges").val() != "" && $("#ModificationCharges").val() != "0") {
      if ($("#ModificationInvoiceId").val() == "" || $("#ModificationInvoiceId").val() == null) {
        $("#ModificationInvoiceId").attr("disabled", false);
        $('#ModificationInvoiceId').focus();
        swal("Please select modification invoice");
        return false;
      }
    }

    if ($("#LeagalCharges").val() != "0" && $("#LeagalCharges").val() != "") {
      if ($("#LegalInvoiceId").val() == "" || $("#LegalInvoiceId").val() == null) {
        $("#LegalInvoiceId").attr("disabled", false);
        $('#LegalInvoiceId').focus();
        swal("Please select legal invoice");
        return false;
      }
    }

    if ($("#ModificationInvoiceId").val() != "" && $("#ModificationInvoiceId").val() != null) {
      if ($("#ModificationCharges").val() == "" || $("#ModificationCharges").val() == "0") {
        $('#ModificationCharges').focus();
        swal("Please enter the modification charges");
        return false;
      }
    }

    console.log($("#LegalInvoiceId").val());
    console.log($("#LeagalCharges").val());

    if ($("#LegalInvoiceId").val() != "" && $("#LegalInvoiceId").val() != null) {
      if ($("#LeagalCharges").val() == "" || $("#LeagalCharges").val() == "0") {
        $('#LeagalCharges').focus();
        swal("Please enter the legal charges");
        return false;
      }
    }

    // Future add-on's: + Number($('#CorpusFund').val()) + Number($('#MaintinaceCharges').val()) + Number($('#refundableAdvanceID').val())
    // if ((Number($('#PrincipalAmount').val()) + Number($('#InterstAmount').val()) + Number($('#refundableAdvanceID').val()) + Number($('#ModificationCharges').val())
    //   + Number($('#LeagalCharges').val())) + Number(this.CorpusFund) + Number(this.MaintinaceCharges) + Number(this.FlatKhataBifurcation)
    //   + Number($('#TdsAmount').val()) > Number($('#transactionAmountID').val())) {
    //   swal("Payment Setoff should not be greater than Transaction amount");
    //   return false
    // }
    var tempamount = (Number($('#PrincipalAmount').val()) + Number($('#InterstAmount').val()) + Number($('#refundableAdvanceID').val()) + Number($('#ModificationCharges').val())
      + Number($('#LeagalCharges').val())) + Number(this.CorpusFund) + Number(this.MaintinaceCharges) + Number(this.FlatKhataBifurcation) + Number(this.carparkingcost_amount)
      + Number($('#TdsAmount').val())+ Number(this.Registration_And_Mutation_Charges) + Number(this.Non_refundable_Caution_Deposit) + Number(this.Electricity_Deposit);
    //alert(Number(tempamount).toFixed(2))
    if (Number(tempamount.toFixed(2)) > Number($('#transactionAmountID').val())) {
      swal("Payment Setoff should be equal to transaction amount");
      return false;
    }

    if (Number(tempamount.toFixed(2)) < Number($('#transactionAmountID').val())) {
      swal("Payment Setoff should be equal to transaction amount");
      return false;
    }
    console.log($("#paidbyname").val());


    if (Number($('#TdsAmount').val()) !== 0 && $("#paidbyname").val() == "" || Number($('#TdsAmount').val()) !== 0 && $("#paidbyname").val() == "select") {
      swal("Please select paid by name");
      return false
    }


    this.finpaidbyname = $("#paidbyname").val();

    if (this.finpaidbyname == "select") {
      this.finpaidbyname = null;
    }

    if ($("#Sourcefound").val() == "" || $("#Sourcefound").val() == "select") {
      swal("Please select Source of funds");
      $('#CustomerCommentsId').focus();
      return false;
    }

    // if ($("#CustomerCommentsId").val() == "") {
    //   $('#CustomerCommentsId').focus();
    //   swal("Please enter comments");
    //   return false;
    // }


    if (confirm("Do you want to Submit the Page ?")) {


      //setting default amount values
      if ($('#PrincipalAmount').val() == "") {
        $('#PrincipalAmount').val(0);
      } else {
        $('#PrincipalAmount').val();
      }
      if ($('#InterstAmount').val() == "") {
        $('#InterstAmount').val(0);
      } else {
        $('#InterstAmount').val();
      }
      if ($('#ModificationCharges').val() == "") {
        $('#ModificationCharges').val(0);
      } else {
        $('#ModificationCharges').val();
      }
      if ($('#LeagalCharges').val() == "") {
        $('#LeagalCharges').val(0);
      } else {
        $('#LeagalCharges').val();
      }
      if ($('#refundableAdvanceID').val() == "") {
        $('#refundableAdvanceID').val(0);
      } else {
        $('#refundableAdvanceID').val();
      }

      if (this.finTransactionSetOffId == undefined || this.finTransactionSetOffId == "undefined" || this.finTransactionSetOffId == "") {
        this.finTransactionSetOffId = 0;
      }

      if ($("#bankNameID").val() == "select") {
        this.bankNameID = null;
      } else {
        this.bankNameID = $("#bankNameID").val();
      }




      if (selectElementText == "--Select--" || selectElementText == "-" || selectElementText == null || selectElementText == "undefined" || selectElementText == undefined) {
        this.selectbankname = null;
      } else {
        this.selectbankname = selectElementText;
      }


      console.log(this.docListArray);


      for (var i = 0; i < this.docListArray.length; i++) {
        this.fileInfo.push({
          "extension": this.docListArray[i].documentName.split('.').pop(),
          "name": this.docListArray[i].documentName,
          "filePath": this.docListArray[i].filePath,
          "url": this.docListArray[i].documentLocation
        });
        console.log("----------" + JSON.stringify(this.fileInfo))

        // for (var i = 0; i < this.docListArray.length; i++) {
        //   this.fileInfo.push( {
        //     "extension": this.docListArray[i].documentName.split('.').pop(),
        //     "name": this.docListArray[i].documentName,
        //     "base64": convertbasesixtyfour[i]
        //   });
      }



      $('.page-loader-wrapper').show();
      // -------------------------------
      let url = this.cmn.commonUrl + "financial/saveFinancialTransactionReceiptRequest.spring";
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      var body = {
        "sessionKey": sessionStorage.getItem("login_sessionkey"),
        "siteId": $("#ProjectId").val(),
        "siteName": $('#ProjectId').select2('data')[0].text,
        "transactionTypeId": "" + this.viewTransactionResponse.transactionTypeId,
        "transactionModeId": "" + this.viewTransactionResponse.transactionModeId,
        "transferModeId": "" + this.paymentModeID,
        "transactionTypeName": "" + this.viewTransactionResponse.transactionTypeName,
        "transactionModeName": "" + this.viewTransactionResponse.transactionModeName,
        "transferModeName": "" + this.paymentMode,
        "referenceNo": "" + this.referenceNum,
        "transactionReceiveDate": "" + this.transactionReceiveDate,
        "transactionAmount": "" + this.transactionAmount,
        // "blockIds":[$("#BlockId").val()],
        // "floorIds":[],
        "flatIds": [Number($('#FaltId').val())],
        "bookingFormId": "" + this.bookingFormID,
        "bankId": this.bankNameID,
        "bankName": this.selectbankname,
        // "bankAccountNumber":""+this.bankAccountNumber,
        "siteAccountId": "" + this.siteAccountId,
        "siteBankAccountNumber": "" + this.siteBankAccountNumber,
        "paymentSetOff": "true",
        "sourceOfFunds": $("#Sourcefound").val(),
        "paymentSetOffDetails": [{ "setOffTypeName": "Principal_Amount", "amount": $("#PrincipalAmount").val() }
          , { "setOffTypeName": "Fin_Penalty", "amount": $("#InterstAmount").val() }
          , { "setOffTypeName": "Refundable_Advance", "amount": $("#refundableAdvanceID").val(), "invoiceNo": "" }
          , { "setOffTypeName": "Modification_Cost", "amount": $("#ModificationCharges").val(), "invoiceNo": $("#ModificationInvoiceId").val() }
          , { "setOffTypeName": "Legal_Cost", "amount": $("#LeagalCharges").val(), "invoiceNo": $("#LegalInvoiceId").val() }

          , { "setOffTypeName": "Car_Parking_Cost", "amount": $("#carparkingcost").val(), "invoiceNo": carparkinginvoicenumber }

          , { "finTransactionSetOffId": this.finTransactionSetOffId, "setOffTypeName": "TDS", "amount": $("#TdsAmount").val(), "paidByName": this.finpaidbyname }
          , { "setOffTypeName": "Maintenance_Charge", "amount": this.MaintinaceCharges }
          , { "setOffTypeName": "Corpus_Fund", "amount": this.CorpusFund }
          , { "setOffTypeName": "Individual_Flat_Khata_bifurcation_and_other_charges", "amount": this.FlatKhataBifurcation }

          , { "setOffTypeName": "Registration_And_Mutation_Charges", "amount": this.Registration_And_Mutation_Charges }
          , { "setOffTypeName": "Non_refundable_Caution_Deposit", "amount": this.Non_refundable_Caution_Deposit }
          , { "setOffTypeName": "Electricity_Deposit", "amount": this.Electricity_Deposit }
          
        ],
        "comment": "" + $('#CustomerCommentsId').val(),
        "comments": [],
        "operationType": "Modify",
        "prevTransactionEntryId": "" + this.viewTransactionResponse.transactionEntryId,
        "fileInfos": this.fileInfo
      }



      console.log(JSON.stringify(body));



      this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
        $('.page-loader-wrapper').hide();
        if (resp.responseCode == 200) {
          this.router.navigate(['View-Pending-Transactions']);
          swal("Transaction sent successfully");
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
          if (error == 440) {
            swal("Your Session has been Timed Out!", "Please login once again.", "error");
            this.router.navigate([""]);
          }
        }
      );
    } else { }

  }
  /*-------------------------------Final Submission End----------------------------*/

  modificationInvoice(event: any) {
    if ($("#ModificationCharges").val() == '0' || $("#ModificationCharges").val() == '') {
      $("#ModificationInvoiceId").attr("disabled", true);
    } else {
      $("#ModificationInvoiceId").attr("disabled", false);
    }
  }

  legalInvoice(event: any) {
    if ($("#LeagalCharges").val() == '0' || $("#LeagalCharges").val() == '') {
      $("#LegalInvoiceId").attr("disabled", true);
    } else {
      $("#LegalInvoiceId").attr("disabled", false);
    }
  }


  /*-------------------------file location start---------------------------*/
  viewFiles(location) {

    window.open(location, '_system', 'location=yes,closebuttoncaption=Fechar,enableViewportScale=no');

  }
  /*-------------------------file location end---------------------------*/

  homeClick() {
    this.cmn.commonHomeNavigation();
  }

  redirectToPenidng() {

    if (this.operationType == 'ViewCustomerData') {
      this.router.navigate(['shortcut-components']);
    } else if (this.operationType == 'approveTransaction') {
      this.router.navigate(['View-Pending-Transactions']);
    } else if (this.operationType == 'transactionStatus') {
      this.router.navigate(['View-Pending-Transactions-Status']);
    } else if (this.operationType == 'loadCompletedTransaction') {
      this.router.navigate(['View-Completed-Transactions']);
    } else { }
  }

  /*--------------------------disableEnableEditableFields start------------------*/

  disableEnableEditableFields(condition) {
    $("#transactionDateID").prop('disabled', condition);
    $("#transactionAmountID").prop('disabled', condition);
    $("#bankNameID").prop('disabled', condition);
    $('#PrincipalAmount').prop('disabled', condition);
    $('#InterstAmount').prop('disabled', condition);
    $('#ModificationCharges').prop('disabled', condition);
    $('#LeagalCharges').prop('disabled', condition);
    $('#CorpusFund').prop('disabled', condition);
    $('#MaintinaceCharges').prop('disabled', condition);
    $('#refundableAdvanceID').prop('disabled', condition);
    $("#TdsAmount").prop('disabled', condition);
    $("#Sourcefound").prop('disabled', condition);
    $("#carparkingcost").prop('disabled', condition);
  }

  /*--------------------------disableEnableEditableFields end------------------*/

  keyPressAmount(event: any) {
    // -- for any symbols  /[0-9\+\-\ ]/
    const pattern = /[0-9\.\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }


  Deletelistfun() {
    // var d = new Date(this.transactionDate);
    // var transactionDate = d.toJSON().split('T')[0];
    // var date = new Date(this.transactionReceiveDate);
    // var transactionRecDate = date.toJSON().split('T')[0];
    // var date1 = new Date(this.actualTransactionReceiveDate);
    // var actualTransactionRecDate = date1.toJSON().split('T')[0];

    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/deleteFinancialTransaction.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });

    var body = {
      "sessionKey": sessionStorage.getItem("login_sessionkey"),
      "siteId": JSON.stringify(this.sideidname),
      "siteName": this.con_sitename,
      "transactionTypeId": JSON.stringify(this.transactionTypeId),
      "transactionModeId": JSON.stringify(this.transactionModeId),
      "transferModeId": this.paymentModeID,
      "transactionTypeName": this.transactionTypeName,
      "transactionModeName": this.transactionModeName,
      "transferModeName": this.paymentMode,
      "referenceNo": this.referenceNum,
      "transactionReceiveDate": this.transactionReceiveDate,
      "actualTransactionReceiveDate": this.transactionReceiveDate,
      "transactionAmount": this.transactionAmount,
      "flatIds": [this.flatIds],
      "bookingFormId": JSON.stringify(this.bookingFormId),
      "actualFlatIds": [this.actualFlatIds],
      "actualBookingFormId": JSON.stringify(this.actualBookingFormId),
      "buttonType": this.buttonType,
      "actionUrl": this.actionUrl,
      "transactionEntryId": JSON.stringify(this.transactionEntryId),
      "transactionSetOffEntryId": JSON.stringify(this.transactionSetOffEntryId),
      "transactionNo": this.transactionNumber,
      "comment": $('#CustomerCommentsId').val(),
      "transactionReceiptNo": this.transactionReceiptNo,
    }


    this.http.post(url, body).map(res => res.json()).subscribe(resp => {

      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        swal("Transaction delete successfully");
        if (this.operationType == "ViewCustomerData") {
          this.router.navigateByUrl('shortcut-components');
        } else {
          this.router.navigate(["View-Completed-Transactions"])
        }
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

  paidbynamefun(event) {

    if (event.target.value !== "" && event.target.value !== "0") {
      $("#paidbyname").prop("disabled", false);

    } else {
      $("#paidbyname").prop("disabled", true);

    }
  }
  fileClickfun(val, extensiontype) {

    this.fileName = "";
    this.extensiontype = extensiontype;
    this.filetypeurlsplit = val.split(';')[0];
    this.filetypeurlsplit1 = this.filetypeurlsplit.split(':')[1];
    this.filenamedoc = val.split('/')[0];
    this.filesplitdata = this.filenamedoc.split(':')[1];

    if (this.filesplitdata == "image") {
      this.imgsrc = val;
      $('#imagemodal').modal('show');
    }
    if (this.filetypeurlsplit1 == 'application/pdf') {
      this.fileName = "";
      setTimeout(() => {
        this.fileName1 = this.sanitizer.bypassSecurityTrustResourceUrl(val);
      }, 1000);
      $('#imagemodal').modal('show');

    }
  }

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

      //this.Blocklinks =  resp;
      if (resp.responseCode == 200) {

        $('.page-loader-wrapper').hide();
        $('#companybankAcId').html('');

        $('#companybankAcId').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.finProjectAccountResponseList.length; i++) {
          $('#companybankAcId').append("<option value='" + resp.responseObjList.finProjectAccountResponseList[i].siteAccountId + "'>" + resp.responseObjList.finProjectAccountResponseList[i].siteBankAccountNumber + "</option>");
          //	$('#projectID').formSelect();
        }
        // if(this.operationType == "approveTransaction"){
        //   $("#companybankAcId").attr("disabled", false)

        // }else{
        //   $("#companybankAcId").attr("disabled", true) 
        // }
        $('#ProjectId').val(this.siteID);
        $("#companybankAcId").val(this.siteAccountId);

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
  /*-----------------Getting Blocks list start---------------------*/

  carparkingInvoice(event: any) {
    $("#CarparkingInvoiceId").attr("disabled", false);
  }


  carparkinginvoicefun() {
    console.log(carparkingdetails_url);
    window.open(carparkingdetails_url);
  }

}

