import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
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
@Component({
  selector: 'app-modify-crm-receipt-online-view',
  templateUrl: './modify-crm-receipt-online-view.component.html',
  styleUrls: ['./modify-crm-receipt-online-view.component.sass']
})
export class ModifyCrmReceiptOnlineViewComponent implements OnInit {
  totalPenaltyAmount: any;
  totaldueamount: any;
  customerName: any;
  fileExtension_array: any[];
  file_name_array1: any[];
  tempfileInfo: any = [];
  base64_array_object_data1: any[];
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
  flat_No: any;
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
  deleteArray: Array<any> = [];

  //tempfileInfo: Array<any> = [];
  bindingFileInfo: Array<any> = [];
  ortitle: boolean;
  filenameval: any;
  urls: Array<any> = [];
  imgsrc: any;

  fileUrl: any;
  imageUrl: string | ArrayBuffer;
  base64_array_object_data: any = [];
  banknamevalue: any;
  banknametext: any;

  principleAmountSetOffId: any;
  InterestSetOffId: any;
  modificationChargesSetOffId: any;
  LegalChargesSetOffId: any;
  RefundableChargesSetOffId: any;
  setOffID: any;
  fileName: string;
  extensiontype: any;
  filetypeurlsplit: any;
  filetypeurlsplit1: any;
  filenamedoc: any;
  filesplitdata: any;
  sanitizer: any;
  modificationInvoiceNumber: any;
  ModificationdocumentLocation: any;
  legalChargeInvoiceNumber: any;
  documentLocationname: any;
  requesturl: string;
  // principleAmount: any;
  //setOffInterest: any;

  CorpusFund: any;
  MaintinaceCharges: any;
  FlatKhataBifurcation: any;
  finTransactionSetOffId_maintanance: any;
  finTransactionSetOffId_corpus: any;
  finTransactionSetOffId_flatkhata: any;
  CorpusFund_amount: any;
  carparkingChargesSetOffId: any;
  carparkingInvoiceID: any;
  carparkingcost_amount: any;
  carparkingInvoiceNumber: any;
  carparkingLocationname: any;
  companyAccnumberID: any;
  companyAccnumberIDvalue: any;
  Registration_And_Mutation_Charges: any;
  Non_refundable_Caution_Deposit: any;
  Electricity_Deposit: any;

  Registration_and_Mutation_back: any;
  Non_refundable_Caution_back: any;
  Electricity_Deposit_back: any;

  constructor(private cmn: CommonComponent, private http: Http, private router: Router) {

    this.deptid = sessionStorage.getItem("session_deptid");
    this.roleid = sessionStorage.getItem("session_roleId");



    $('.page-loader-wrapper').hide();
    var json_response;
    json_response = eval('(' + sessionStorage.getItem('view_transaction_data') + ')');
    // this.viewTransactionResponse = eval('(' + sessionStorage.getItem('view_transaction_data') + ')');
    console.log(json_response);
    this.viewTransactionResponse = json_response;
    console.log("---" + this.viewTransactionResponse)

    this.controller = this.viewTransactionResponse;
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
    this.flat_No = this.controller['flatNo'];
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


    this.getReceiptOnlineData();

  }

  ngOnInit() {
    $("#paidbyname").prop("disabled", true);

    if (this.operationType == 'approveTransaction') {
      this.pathName = "View Pending Transactions for Approval";
      this.disableEnableEditableFields(false);
    } else if (this.operationType == 'transactionStatus') {
      this.pathName = "View Temporary Transactions";
      this.disableEnableEditableFields(true);
      $('#actionButtons').hide();
      $('#userCommentsLabel').hide();
      $('#userCommentsField').hide();
    } else if (this.operationType == 'loadCompletedTransaction') {
      this.pathName = "View Completed Transactions";
      this.disableEnableEditableFields(true);
      $('#actionButtons').hide();
      $('#userCommentsLabel').hide();
      $('#userCommentsField').hide();
    } else {
      this.disableEnableEditableFields(false);
    }

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
      var minimumdate = new Date().setMonth(date - 24);
      var maximumdate = new Date().setMonth(date + 24);
      $('#transactionDateID').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
        //minDate: new Date(minimumdate),
        maxDate: new Date(),
        clearButton: true,
        // weekStart: 1,
        time: false,
      })




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


      $("#companyAccnumberID").select2({
        placeholder: "Select Project",
        dir: "ltl",
      });



      $('#bankNameID').change(function (event) {
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


      $('#PrincipalAmount').bind("cut copy paste", function (e) {
        e.preventDefault();
      });

      $('#refundableAdvanceID').bind("cut copy paste", function (e) {
        e.preventDefault();
      });

      $('#cancellationChargesID').bind("cut copy paste", function (e) {
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


      $('#transactionAmountID').bind("cut copy paste", function (e) {
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



      $('#ProjectId').change(function (e) {
        var siteId = $(e.target).val();

        if (siteId == "select") {

        } else {
          self.blockList(siteId);
          self.siteAccNumList(siteId);
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


  legalChargeInvoiceNumberfun() {
    window.open(this.documentLocationname);
  }

  modificationInvoiceNumberfun() {
    window.open(this.ModificationdocumentLocation);
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
    // http://106.51.38.64:9999/employeeservice/site/site.spring
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "actionUrl": "View Suspense Entries"

    }
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      //$('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        var Options = "";
        //   $('#projectID').formSelect();
        $('#ProjectId').html('');
        $('#ProjectId').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#ProjectId').append("<option value='" + resp.responseObjList[i].siteId + "'>" + resp.responseObjList[i].siteName + "</option>");
          $('#ProjectId').val(this.siteID);
          $('#blkcls').show();
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
          $('#FaltId').append("<option value='" + resp.responseObjList[i].flatId + "'>" + resp.responseObjList[i].flatNo + "</option>");
          $('#FaltId').val(this.flattID);
        }
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

    if (this.transactionStatusNameval == "Transaction Completed") {
      this.requesturl = "CompletedTransaction";
    } else {
      this.requesturl = "approveTransaction";
    }


    $('.page-loader-wrapper').show();
    // -------------------------------
    let url = this.cmn.commonUrl + "financial/viewPendingAmount.spring";
    // http://localhost:8080/employeeservice/flat/flatBlock.spring
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "flatIds": [flatId],
      "transactionTypeId": "" + this.viewTransactionResponse.transactionTypeId,
      "transactionModeId": "" + this.viewTransactionResponse.transactionModeId,
      "transactionTypeName": "" + this.viewTransactionResponse.transactionTypeName,
      "transactionModeName": "" + this.viewTransactionResponse.transactionModeName,
      "requestUrl": this.requesturl,
      "bookingFormId": this.viewTransactionResponse.bookingFormId,
    }

    console.log(url);
    console.log(JSON.stringify(body));

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

      console.log(JSON.stringify(resp));

      if (resp.responseCode == 200) {
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

    if (this.transactionStatusNameval == "Transaction Completed") {
      this.requesturl = "CompletedTransaction";
    } else {
      this.requesturl = "approveTransaction";
    }

    $('.page-loader-wrapper').show();
    // -------------------------------
    let url = this.cmn.commonUrl + "financial/viewPendingAmount.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "flatIds": [flatId].map(Number),
      "condition": "CRM_COMMENTS",
      "transactionTypeId": "" + this.viewTransactionResponse.transactionTypeId,
      "transactionModeId": "" + this.viewTransactionResponse.transactionModeId,
      "transactionTypeName": "" + this.viewTransactionResponse.transactionTypeName,
      "transactionModeName": "" + this.viewTransactionResponse.transactionModeName,
      "requestUrl": this.requesturl,
      "bookingFormId": this.viewTransactionResponse.bookingFormId,
    }

    console.log(url);
    console.log(JSON.stringify(body));

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

      console.log(JSON.stringify(resp));

      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        for (var i = 0; i < resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList.length; i++) {
          this.setOffTypeName = resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].metadataName;
          if (this.setOffTypeName == "MODIFICATION_COST") {

            $('#ModificationInvoiceId').append("<option value='" + resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo + "'>" + resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo + "</option>");
            //$('#ModificationInvoiceId').val(this.modificationChargeInvoiceNo);

            if (resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo == this.modificationChargeInvoiceNo) {
              this.modificationInvoiceNumber = resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo;
              this.ModificationdocumentLocation = resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].documentLocation;
            }

          } else if (this.setOffTypeName == "LEGAL_COST") {

            $('#LegalInvoiceId').append("<option value='" + resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo + "'>" + resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo + "</option>");
            //  $('#LegalInvoiceId').val(this.legalChargeInvoiceNo);

            if (resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo == this.legalChargeInvoiceNo) {
              this.legalChargeInvoiceNumber = resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo;
              this.documentLocationname = resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].documentLocation;
            }

          } else if (this.setOffTypeName == "CAR_PARKING_COST") {
            $('#carparkingInvoiceId').append("<option value='" + resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo + "'>" + resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo + "</option>");

            if (resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo == this.carparkingInvoiceID) {
              this.carparkingInvoiceNumber = resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo;
              this.carparkingLocationname = resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].documentLocation;
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

      console.log("response: " + JSON.stringify(resp));



      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        this.siteList();
        this.bankNamesList();
        this.customerPropertyDetails = resp.responseObjList.customerPropertyDetailsInfoList[0];
        this.projectName = this.customerPropertyDetails.siteName;
        this.blockNumber = this.customerPropertyDetails.blockName;
        this.flatNumber = this.customerPropertyDetails.flatNo;
        this.flatID.push(this.customerPropertyDetails.flatId);
        this.siteID = this.customerPropertyDetails.siteId;
        this.blockID = this.customerPropertyDetails.blockId;
        this.flattID = this.customerPropertyDetails.flatId;

        this.blockList(this.siteID);

        this.finTransactionEntryDetails = resp.responseObjList.finTransactionEntryDetailsResponseList[0];
        this.transactionType = this.viewTransactionResponse.transactionTypeName;
        this.transactionID = this.finTransactionEntryDetails.finTransactionNo;
        this.siteAccountId = this.finTransactionEntryDetails.siteAccountId;

        console.log(this.siteAccountId);

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
        this.siteAccNumList(this.siteID);
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

          console.log(this.transReceiveFormat);

          $('#transactionDateID').val(this.transReceiveFormat);
        }


        this.docListArray = resp.responseObjList.finTransactionEntryDetailsResponseList[0].transactionEntryDocResponsesList;
        //  this.docListArray = resp.responseObjList.finTransactionEntryDetailsResponseList[0].transactionEntryDocResponsesList;
        for (var i = 0; i < this.docListArray.length; i++) {
          this.bindingFileInfo.push({
            "extension": this.docListArray[i].documentName.split('.').pop(),
            "name": this.docListArray[i].documentName,
            "filePath": this.docListArray[i].filePath,
            "url": this.docListArray[i].documentLocation,
            "id": this.docListArray[i].transactionEntryDocId
          });
        }
        console.log("----------" + JSON.stringify(this.tempfileInfo))
        // console.log(this.docListArray);
        // for (var i = 0; i < this.docListArray.length; i++) {
        //   this.toDataURL(this.docListArray[i].documentLocation, function (dataUrl) {
        //     convertbasesixtyfour.push(dataUrl)
        //   })
        // }


        this.previousCRMComments = this.finTransactionEntryDetails.finTransactionApprStatResponseList;
        this.SetOffResponseList = resp.responseObjList.finTransactionEntryDetailsResponseList[0].finTransactionSetOffResponseList;
        for (var i = 0; i < resp.responseObjList.finTransactionEntryDetailsResponseList[0].finTransactionSetOffResponseList.length; i++) {
          this.setOffTypeName = resp.responseObjList.finTransactionEntryDetailsResponseList[0].finTransactionSetOffResponseList[i].setOffTypeName;
          this.setOffAmount = resp.responseObjList.finTransactionEntryDetailsResponseList[0].finTransactionSetOffResponseList[i].setOffAmount;
          this.paidByName = resp.responseObjList.finTransactionEntryDetailsResponseList[0].finTransactionSetOffResponseList[i].paidByName;


          this.finBokAccInvoiceNo = resp.responseObjList.finTransactionEntryDetailsResponseList[0].finTransactionSetOffResponseList[i].finBokAccInvoiceNo;
          this.setOffID = resp.responseObjList.finTransactionEntryDetailsResponseList[0].finTransactionSetOffResponseList[i].finTransactionSetOffId;

          this.setOffID = this.SetOffResponseList[i].finTransactionSetOffId;
          // this.setOffID = this.SetOffResponseList[i].finTransactionSetOffId;
          if (this.setOffTypeName == "FIN_BOOKING_FORM_MILESTONES") {
            this.principleAmountSetOffId = this.setOffID;
            this.principleAmount = this.setOffAmount;
            $('#PrincipalAmount').val(this.principleAmount);
          } else if (this.setOffTypeName == "FIN_PENALTY") {
            this.InterestSetOffId = this.setOffID;
            this.setOffInterest = this.setOffAmount;
            $('#InterstAmount').val(this.setOffInterest);
          } else if (this.setOffTypeName == "MODIFICATION_COST") {
            this.modificationChargesSetOffId = this.setOffID;
            this.modificationCharges = this.setOffAmount;
            $('#ModificationCharges').val(this.modificationCharges);
            // $('#modifiChargeInvNo').show();
            this.modificationChargeInvoiceNo = this.finBokAccInvoiceNo;
          } else if (this.setOffTypeName == "LEGAL_COST") {
            this.LegalChargesSetOffId = this.setOffID;
            this.LegalCharges = this.setOffAmount;
            $('#LeagalCharges').val(this.LegalCharges);
            // $('#legalChargeInvNo').show();
            this.legalChargeInvoiceNo = this.finBokAccInvoiceNo;
          } else if (this.setOffTypeName == "REFUNDABLE_ADVANCE") {
            this.RefundableChargesSetOffId = this.setOffID;
            this.refundableAdvance = this.setOffAmount;
            $('#refundableAdvanceID').val(this.refundableAdvance);
          } else if (this.setOffTypeName == "TDS") {
            this.finTransactionSetOffId = this.SetOffResponseList[i].finTransactionSetOffId;
            $("#TdsAmount").val(this.setOffAmount);
            $("#paidbyname").val(this.paidByName);
            if (this.setOffAmount !== null) {
              $("#paidbyname").prop("disabled", false);
            }


          } else if (this.setOffTypeName == "Maintenance_Charge") {

            this.finTransactionSetOffId_maintanance = this.SetOffResponseList[i].finTransactionSetOffId;
            $("#MaintinaceCharges").val(this.setOffAmount);

          } else if (this.setOffTypeName == "Corpus_Fund") {
            this.finTransactionSetOffId_corpus = this.SetOffResponseList[i].finTransactionSetOffId;
            $("#CorpusFund").val(this.setOffAmount);

          } else if (this.setOffTypeName == "Individual_Flat_Khata_bifurcation_and_other_charges") {
            this.finTransactionSetOffId_flatkhata = this.SetOffResponseList[i].finTransactionSetOffId;
            $("#FlatKhataBifurcation").val(this.setOffAmount);
          } else if (this.setOffTypeName == "CAR_PARKING_COST") {
            this.carparkingChargesSetOffId = this.setOffID;
            $('#carparkingcost').val(this.setOffAmount);
            this.carparkingInvoiceID = resp.responseObjList.finTransactionEntryDetailsResponseList[0].finTransactionSetOffResponseList[i].finBokAccInvoiceNo;
          } else if (this.setOffTypeName == "REGISTRATION_AND_MUTATION_CHARGES") {

            $('#Registration_and_Mutation_Charges').val(this.setOffAmount);
            this.Registration_and_Mutation_back = this.SetOffResponseList[i].finTransactionSetOffId;

          } else if (this.setOffTypeName == "NON_REFUNDABLE_CAUTION_DEPOSIT") {
            $('#Non_refundable_Caution_Deposit').val(this.setOffAmount);

            this.Non_refundable_Caution_back = this.SetOffResponseList[i].finTransactionSetOffId;

          }
          else if (this.setOffTypeName == "ELECTRICITY_DEPOSIT") {
            $('#Electricity_Deposit').val(this.setOffAmount);

            this.Electricity_Deposit_back = this.SetOffResponseList[i].finTransactionSetOffId;
            
          }


        }
        if (this.principleAmountSetOffId == undefined) {
          this.principleAmountSetOffId = "0";
        }
        if (this.InterestSetOffId == undefined) {
          this.InterestSetOffId = "0";
        }
        if (this.modificationChargesSetOffId == undefined && (this.modificationChargeInvoiceNo == undefined || this.modificationChargeInvoiceNo == "")) {
          this.modificationChargesSetOffId = "0";
          this.modificationChargeInvoiceNo = "";
        }
        if (this.LegalChargesSetOffId == undefined && (this.legalChargeInvoiceNo == undefined || this.legalChargeInvoiceNo == "")) {
          this.LegalChargesSetOffId = "0";
          this.legalChargeInvoiceNo = "";
        }
        if (this.RefundableChargesSetOffId == undefined) {
          this.RefundableChargesSetOffId = "0";
        }

        for (let i = 0; i < this.SetOffResponseList.length; i++) {
          this.setOffTypeName = this.SetOffResponseList[i].setOffTypeName;
          this.setOffAmount = this.SetOffResponseList[i].setOffAmount;



          if (this.SetOffResponseList[i].paidByName !== null) {
            this.paidByName = this.SetOffResponseList[i].paidByName;
          }







          this.finBokAccInvoiceNo = this.SetOffResponseList[i].finBokAccInvoiceNo;
          this.finBookingFormAccountsId = this.SetOffResponseList[i].finBookingFormAccountsId
          if (this.setOffTypeName == "Corpus_Fund") {

            this.CorpusFund_amount = this.setOffAmount;
            $('#CorpusFund').val(this.CorpusFund_amount);


          } if (this.setOffTypeName == "FIN_BOOKING_FORM_MILESTONES") {
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


          }
          else { }
        }

        if (this.modificationChargeInvoiceNo == undefined) {
          this.modificationChargeInvoiceNo = "";
        }
        if (this.legalChargeInvoiceNo == undefined) {
          this.legalChargeInvoiceNo = "";
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

  /*-------------------------------Final Submission Start----------------------------*/
  CRMReceiptonlineSubmit() {

    var date = new Date($("#transactionDateID").val());
    var milliseconds = date.getTime();

    console.log(milliseconds);


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


    if (($("#PrincipalAmount").val() == "0" || $("#PrincipalAmount").val() == "")
      && ($("#ModificationCharges").val() == "0" || $("#ModificationCharges").val() == "") &&
      ($("#InterstAmount").val() == "0" || $("#InterstAmount").val() == "")
      && ($("#LeagalCharges").val() == "0" || $("#LeagalCharges").val() == "")
      && ($("#refundableAdvanceID").val() == "0" || $("#refundableAdvanceID").val() == "") && ($('#TdsAmount').val() == "0" || $('#TdsAmount').val() == "") && this.CorpusFund == "0" && this.MaintinaceCharges == "0" && this.FlatKhataBifurcation == "0" && this.carparkingcost_amount == "0" && this.Registration_And_Mutation_Charges == "0" && this.Non_refundable_Caution_Deposit == "0" && this.Electricity_Deposit == "0") {
      swal("Please enter Principle amount  (OR) Corpus Fund (OR) Maintenance Charges (OR) Flat Khata Bifurcation (OR) Interest amount (OR) Modification charges (OR) Legal charges (OR) Refundable Advance (OR) Car parking cost (OR) Registration And Mutation Charges (OR) Non-refundable Caution Deposit (OR) Electricity Deposit");
      return false;
    }

    if ($("#ModificationCharges").val() != "" && $("#ModificationCharges").val() != "0") {
      if (this.modificationChargeInvoiceNo == "" || this.modificationChargeInvoiceNo == null) {
        $("#ModificationInvoiceId").attr("disabled", false);
        $('#ModificationInvoiceId').focus();
        swal("Please select modification invoice");
        return false;
      }
    }

    if ($("#LeagalCharges").val() != "0" && $("#LeagalCharges").val() != "") {
      if (this.legalChargeInvoiceNo == "" || this.legalChargeInvoiceNo == null) {
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

    if ($("#LegalInvoiceId").val() != "" && $("#LegalInvoiceId").val() != null) {
      if ($("#LeagalCharges").val() == "" || $("#LeagalCharges").val() == "0") {
        $('#LeagalCharges').focus();
        swal("Please enter the legal charges");
        return false;
      }
    }

    // Future add-on's: + Number($('#CorpusFund').val()) + Number($('#MaintinaceCharges').val()) + Number($('#refundableAdvanceID').val())
    // if ((Number($('#PrincipalAmount').val()) + Number($('#InterstAmount').val()) + Number($('#refundableAdvanceID').val()) + Number($('#ModificationCharges').val()) 
    // + Number($('#LeagalCharges').val())) + Number(this.CorpusFund) + Number(this.MaintinaceCharges) + Number(this.FlatKhataBifurcation)
    // + Number($('#TdsAmount').val()) > Number($('#transactionAmountID').val())) {
    //   swal("Payment Setoff should not be greater than Transaction amount");
    //   return false
    // }
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
      // $('#CustomerCommentsId').focus();
      return false;
    }


    if ($('#companyAccnumberID').val() == "select") {
      $('#companyAccnumberID').focus();
      swal("Please select the Account Number");
      return false;
    }


    // if ($("#CustomerCommentsId").val() == "") {
    //   $('#CustomerCommentsId').focus();
    //   swal("Please enter comments");
    //   return false;
    // }
    this.banknamevalue = $('#bankNameID').val();
    // this.banknametext = $('#bankNamesID').select2('data')[0].text;
    //  alert(this.banknamevalue)
    if (this.banknamevalue == "select" || this.banknamevalue == null || this.banknamevalue == undefined) {
      this.banknamevalue = JSON.parse(null);
      this.banknametext = JSON.parse(null);
    } else {
      this.banknamevalue = $('#bankNameID').val();
      this.banknametext = $('#bankNameID').select2('data')[0].text;
    }


    this.companyAccnumberID = $('#companyAccnumberID').select2('data')[0].text;

    if (this.companyAccnumberID == "--Select--") {
      this.companyAccnumberID = JSON.parse(null);
    } else {
      this.companyAccnumberID = $('#companyAccnumberID').select2('data')[0].text;
    }

    this.companyAccnumberIDvalue = $('#companyAccnumberID').val();

    if (this.companyAccnumberIDvalue == "select") {
      this.companyAccnumberIDvalue = JSON.parse(null);
    } else {
      this.companyAccnumberIDvalue = $('#companyAccnumberID').val();
    }


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

      console.log(this.docListArray);


      // if (this.docListArray.length == 0) {
      //   // swal("Please attach file");
      //   $('#files').focus();
      //   this.tempfileInfo = [];
      //   //return false;

      // } else {
      //   for (var i = 0; i < this.docListArray.length; i++) {
      //     this.tempfileInfo.push({
      //       "extension": this.docListArray[i].documentName.split('.').pop(),
      //       "name": this.docListArray[i].documentName,
      //       "filePath": this.docListArray[i].filePath,
      //       "url": this.docListArray[i].documentLocation
      //     });
      //     console.log("----------" + JSON.stringify(this.fileInfo))

      //   console.log(this.tempfileInfo);
      // }
      // }
      for (var i = 0; i < this.bindingFileInfo.length; i++) {
        this.tempfileInfo.push({
          "extension": this.bindingFileInfo[i].extension,
          "name": this.bindingFileInfo[i].name,
          "filePath": this.bindingFileInfo[i].filePath,
          "url": this.bindingFileInfo[i].url
        });
        //console.log("----------"+JSON.stringify(this.tempfileInfo))

      }


      if (this.carparkingChargesSetOffId == undefined) {
        this.carparkingChargesSetOffId = 0;
      }


      $('.page-loader-wrapper').show();
      // -------------------------------
      let url = this.cmn.commonUrl + "financial/approveOrRejectMisReceiptOrPayment.spring";
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      var body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "siteId": $('#ProjectId').val(),
        "siteName": $('#ProjectId').select2('data')[0].text,
        "transactionTypeId": "" + this.viewTransactionResponse.transactionTypeId,
        "transactionModeId": "" + this.viewTransactionResponse.transactionModeId,
        "transactionTypeName": "" + this.viewTransactionResponse.transactionTypeName,
        "transactionModeName": "" + this.viewTransactionResponse.transactionModeName,
        //  "transferModeId": "" +  $('#paymentModeID').val(),
        // "transferModeName":"" + $('#paymentModeID').select2('data')[0].text,
        "referenceNo": $('#ReferenceID').val(),
        "transactionReceiveDate": new Date($("#transactionDateID").val()).getTime(), //"2020-03-29",
        "transactionAmount": "" + $('#transactionAmountID').val(),
        "flatIds": this.flatID, //[1087],
        "bookingFormId": "" + this.bookingFormID,
        "bankId": this.banknamevalue,
        "bankName": this.banknametext,
        //  "bankAccountNumber":"45454545",
        "siteAccountId": this.companyAccnumberIDvalue,
        "siteBankAccountNumber": this.companyAccnumberID,    //$('#companyAccnumberID').select2('data')[0].text,
        "paymentSetOff": "true",
        "sourceOfFunds": $("#Sourcefound").val(),
        "optionalButtonType": "Modify",
        "paymentSetOffDetails": [
          {
            "finTransactionSetOffId": "" + this.principleAmountSetOffId, //"591",
            "setOffTypeName": "FIN_BOOKING_FORM_MILESTONES",
            "amount": "" + $('#PrincipalAmount').val() //this.principleMoney  //"1344000"
          },
          {
            "finTransactionSetOffId": "" + this.InterestSetOffId, //"1",
            "setOffTypeName": "FIN_PENALTY",
            "amount": "" + $('#InterstAmount').val() //this.finalityAmount  //"11000"
          },
          {
            "finTransactionSetOffId": "" + this.modificationChargesSetOffId, //"1",
            "setOffTypeName": "MODIFICATION_COST",
            "amount": "" + $('#ModificationCharges').val(), //this.modificationAmount, //$('#ModificationCharges').val(), //"0",
            "invoiceNo": this.modificationChargeInvoiceNo
          },
          {
            "finTransactionSetOffId": "" + this.LegalChargesSetOffId, //"1",
            "setOffTypeName": "LEGAL_COST",
            "amount": "" + $('#LeagalCharges').val(), //this.legalAmount, // $('#LeagalCharges').val(), //"0",
            "invoiceNo": this.legalChargeInvoiceNo
          },

          {
            "finTransactionSetOffId": "" + this.carparkingChargesSetOffId,
            "setOffTypeName": "Car_Parking_Cost",
            "amount": $("#carparkingcost").val(),
            "invoiceNo": this.carparkingInvoiceNumber
          },


          {
            "finTransactionSetOffId": "" + this.RefundableChargesSetOffId,
            "setOffTypeName": "REFUNDABLE_ADVANCE",
            "amount": $('#refundableAdvanceID').val(),
            "invoiceNo": ""
          },
          { "finTransactionSetOffId": this.finTransactionSetOffId, "setOffTypeName": "TDS", "amount": $("#TdsAmount").val(), "paidByName": this.finpaidbyname }
          , { "finTransactionSetOffId": this.finTransactionSetOffId_maintanance, "setOffTypeName": "Maintenance_Charge", "amount": this.MaintinaceCharges, "invoiceNo": "" }
          , { "finTransactionSetOffId": this.finTransactionSetOffId_corpus, "setOffTypeName": "Corpus_Fund", "amount": this.CorpusFund, "invoiceNo": "" }
          , { "finTransactionSetOffId": this.finTransactionSetOffId_flatkhata, "setOffTypeName": "Individual_Flat_Khata_bifurcation_and_other_charges", "amount": this.FlatKhataBifurcation }
      
      
          , { "finTransactionSetOffId": this.Registration_and_Mutation_back, "setOffTypeName": "Registration_And_Mutation_Charges", "amount": this.Registration_And_Mutation_Charges }
          , { "finTransactionSetOffId": this.Non_refundable_Caution_back, "setOffTypeName": "Non_refundable_Caution_Deposit", "amount": this.Non_refundable_Caution_Deposit }
          , { "finTransactionSetOffId": this.Electricity_Deposit_back, "setOffTypeName": "Electricity_Deposit", "amount": this.Electricity_Deposit }

        ],
        // "comments":[],
        "transactionEntryId": "" + this.viewTransactionResponse.transactionEntryId,
        "transactionSetOffEntryId": +this.transSetOffEntryId,
        "buttonType": "Approve",
        "comment": "" + $('#CustomerCommentsId').val(),
        "transactionReceiptNo": "" + this.transactionReceiptNo, // "SIPL/2020-2021/Sumadhura Soham/262"
        "operationType": "Modify",
        "actualTransactionRequest": {
          "siteId": this.sideidname,
          "siteName": this.con_sitename,
          "transactionTypeId": this.transactionTypeId,
          "transactionModeId": this.transactionModeId,
          "transactionTypeName": this.transactionTypeName,
          "transactionModeName": this.transactionModeName,
          "flatIds": [this.flatIds],
          "flatNos": [this.flat_No],
          "bookingFormId": this.actualBookingFormId,
          "transactionAmount": this.transactionAmount,
        },

        // "actualTransactionRequest":{
        //     "anonymousEntryId": this.finTransactionEntryDetails.transactionEntryId,
        //     "referenceNo":  this.finTransactionEntryDetails.referenceNo,
        //     "transactionReceiveDate": this.finTransactionEntryDetails.transactionReceiveDate,
        //     "receivedAmount": this.finTransactionEntryDetails.transactionAmount,
        //     "transferModeId": this.finTransactionEntryDetails.transferModeId,
        //     "transferModeName":this.finTransactionEntryDetails.transferMode,
        //     "bankId":this.finTransactionEntryDetails.finBankId,
        //     "bankName":this.viewTransactionResponse.bankName,
        //     "siteAccountId":this.viewTransactionResponse.siteAccountId,
        //     "siteBankAccountNumber":this.viewTransactionResponse.siteBankAccountNumber
        // },
        "fileInfos": this.tempfileInfo,
        "deleteFileInfos": this.deleteArray,
        // "transactionSetOffEntryId":this.viewTransactionResponse.transactionEntryId
      }
      // var body = {
      //   "sessionKey": sessionStorage.getItem("login_sessionkey"),
      //   "siteId": $("#ProjectId").val(),
      //   "siteName": $('#ProjectId').select2('data')[0].text,
      //   "transactionTypeId": "" + this.viewTransactionResponse.transactionTypeId,
      //   "transactionModeId": "" + this.viewTransactionResponse.transactionModeId,
      //   "transferModeId": "" + this.paymentModeID,
      //   "transactionTypeName": "" + this.viewTransactionResponse.transactionTypeName,
      //   "transactionModeName": "" + this.viewTransactionResponse.transactionModeName,
      //   "transferModeName": "" + this.paymentMode,
      //   "referenceNo": "" + this.referenceNum,
      //   "transactionReceiveDate": "" +milliseconds,
      //   "transactionAmount": "" + $("#transactionAmountID").val(),
      //   // "blockIds":[$("#BlockId").val()],
      //   // "floorIds":[],
      //   "flatIds": [Number($('#FaltId').val())],
      //   "bookingFormId": "" + this.bookingFormID,
      //   "bankId": this.bindingbankid,
      //   "bankName": this.bindingbankname,
      //   // "bankAccountNumber":""+this.bankAccountNumber,
      //   "siteAccountId": "" + this.siteAccountId,
      //   "siteBankAccountNumber": "" + this.siteBankAccountNumber,
      //   "paymentSetOff": "true",
      //   "sourceOfFunds": $("#Sourcefound").val(),
      //   "optionalButtonType": "Modify",
      //   "paymentSetOffDetails": [{ "setOffTypeName": "Principal_Amount", "amount": $("#PrincipalAmount").val() }
      //     , { "setOffTypeName": "Fin_Penalty", "amount": $("#InterstAmount").val() }
      //     , { "setOffTypeName": "Refundable_Advance", "amount": $("#refundableAdvanceID").val(), "invoiceNo": "" }
      //     , { "setOffTypeName": "Modification_Cost", "amount": $("#ModificationCharges").val(), "invoiceNo": $("#ModificationInvoiceId").val() }
      //     , { "setOffTypeName": "Legal_Cost", "amount": $("#LeagalCharges").val(), "invoiceNo": $("#LegalInvoiceId").val() }
      //     , { "finTransactionSetOffId": this.finTransactionSetOffId, "setOffTypeName": "TDS", "amount": $("#TdsAmount").val(), "paidByName": this.finpaidbyname }
      //   ],
      //   "actualTransactionRequest": {
      //     "siteId": this.sideidname,
      //     "siteName": this.con_sitename,
      //     "transactionTypeId": this.transactionTypeId,
      //     "transactionModeId": this.transactionModeId,
      //     "transactionTypeName": this.transactionTypeName,
      //     "transactionModeName": this.transactionModeName,
      //     "flatIds": [this.flatIds],
      //     "bookingFormId": this.actualBookingFormId,
      //     "transactionAmount": this.transactionAmount,       
      //   },
      //   "comment": "" + $('#CustomerCommentsId').val(),
      //   "comments": [],
      //   "operationType": "Modify",
      //   "prevTransactionEntryId": "" + this.viewTransactionResponse.transactionEntryId,
      //   "fileInfos": this.tempfileInfo
      // }


      console.log(url);
      console.log(JSON.stringify(body));


      this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

        console.log(JSON.stringify(resp));

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
    this.router.navigate(['modify-transaction']);
    // if (this.operationType == 'approveTransaction') {
    //   this.router.navigate(['View-Pending-Transactions']);
    // } else if (this.operationType == 'transactionStatus') {
    //   this.router.navigate(['View-Pending-Transactions-Status']);
    // } else if (this.operationType == 'loadCompletedTransaction') {
    //   this.router.navigate(['View-Completed-Transactions']);
    // } else { }
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


    var date = new Date($("#transactionDateID").val());
    var milliseconds = date.getTime();

    console.log(milliseconds);


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
      "transactionReceiveDate": milliseconds,
      "actualTransactionReceiveDate": milliseconds,
      "transactionAmount": "" + $("#transactionAmountID").val(),
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
        this.router.navigateByUrl("modify-transaction");
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
  handle_FileSelect(evt) {
    this.fileExtension_array = [];
    this.file_name_array1 = [];
    this.base64_array_object_data1 = [];
    this.File_Info1 = [];
    var files = evt.target.files;
    var file_val = evt.target.value;
    this.filename = evt.target.files[0].name.toLowerCase();

    this.filename_extension = this.filename.split('.').pop();



    if (this.filename_extension == "jpg" || this.filename_extension == "JPG" || this.filename_extension == "png" || this.filename_extension == "PNG" ||
      this.filename_extension == "jpeg" || this.filename_extension == "JPEG" || this.filename_extension == "pdf"
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

              console.log(this.urls);
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

  _handleReader_Loaded(readerEvt) {
    this.binaryString = readerEvt.target.result;
    this.base64textString = btoa(this.binaryString);
    this.base64_array_object_data.push(btoa(this.binaryString));
    this.imageUrl = btoa(this.binaryString);
    $('#files').css("color", "transparent");

    this.tempfileInfo.push({
      "extension": this.filename_extension,
      "name": this.filename,
      "base64": this.imageUrl
    });

    console.log(this.tempfileInfo);


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

  rejectAndModifytMisReceiptOnline(rejectAndModify) {


    var date = new Date($("#transactionDateID").val());
    var milliseconds = date.getTime();

    console.log(milliseconds);


    // if (selectbankNameValue !== undefined && selectbanknametext !== undefined) {
    //   this.bindingbankname = selectbanknametext;
    //   this.bindingbankid = selectbankNameValue;
    // } else if (this.bankName !== null && this.bankID !== null) {
    //   this.bindingbankname = this.bankName;
    //   this.bindingbankid = this.bankID;
    // } else {
    //   this.bindingbankname = null;
    //   this.bindingbankid = null;
    // }
    this.banknamevalue = $('#bankNameID').val();

    // this.banknametext = $('#bankNamesID').select2('data')[0].text;
    if (this.banknamevalue == "select" || this.banknamevalue == null) {
      this.banknamevalue = JSON.parse(null);
      this.banknametext = JSON.parse(null);
    } else {
      this.banknamevalue = $('#bankNameID').val();
      this.banknametext = $('#bankNameID').select2('data')[0].text;
    }

    // if ($("#transactionDateID").val() == "") {
    //   swal("Please select received date");
    //   return false;
    // }

    // if ($("#transactionAmountID").val() == "") {
    //   swal("Please enter transaction amount");
    //   return false;
    // }

    // if ($("#transactionAmountID").val() == "") {
    //   swal("Please enter transaction amount");
    //   return false;
    // }


    // if (($("#PrincipalAmount").val() == "0" || $("#PrincipalAmount").val() == "")
    //   && ($("#ModificationCharges").val() == "0" || $("#ModificationCharges").val() == "")
    //   && ($("#InterstAmount").val() == "0" || $("#InterstAmount").val() == "")
    //   && ($("#LeagalCharges").val() == "0" || $("#LeagalCharges").val() == "")
    //   && ($("#refundableAdvanceID").val() == "0" || $("#refundableAdvanceID").val() == "") && ($('#TdsAmount').val() == "0" || $('#TdsAmount').val() == "")) {
    //   swal("Please enter Principle amount (OR) Interest amount (OR) Modification charges (OR) Legal charges (OR) Refundable Advance");
    //   return false;
    // }

    // if ($("#ModificationCharges").val() != "" && $("#ModificationCharges").val() != "0") {
    //   if ($("#ModificationInvoiceId").val() == "" || $("#ModificationInvoiceId").val() == null) {
    //     $("#ModificationInvoiceId").attr("disabled", false);
    //     $('#ModificationInvoiceId').focus();
    //     swal("Please select modification invoice");
    //     return false;
    //   }
    // }

    // if ($("#LeagalCharges").val() != "0" && $("#LeagalCharges").val() != "") {
    //   if ($("#LegalInvoiceId").val() == "" || $("#LegalInvoiceId").val() == null) {
    //     $("#LegalInvoiceId").attr("disabled", false);
    //     $('#LegalInvoiceId').focus();
    //     swal("Please select legal invoice");
    //     return false;
    //   }
    // }

    // if ($("#ModificationInvoiceId").val() != "" && $("#ModificationInvoiceId").val() != null) {
    //   if ($("#ModificationCharges").val() == "" || $("#ModificationCharges").val() == "0") {
    //     $('#ModificationCharges').focus();
    //     swal("Please enter the modification charges");
    //     return false;
    //   }
    // }

    // if ($("#LegalInvoiceId").val() != "" && $("#LegalInvoiceId").val() != null) {
    //   if ($("#LeagalCharges").val() == "" || $("#LeagalCharges").val() == "0") {
    //     $('#LeagalCharges').focus();
    //     swal("Please enter the legal charges");
    //     return false;
    //   }
    // }

    // if ((Number($('#PrincipalAmount').val()) + Number($('#InterstAmount').val()) + Number($('#refundableAdvanceID').val()) + Number($('#ModificationCharges').val()) + Number($('#LeagalCharges').val())) + Number($('#TdsAmount').val()) > Number($('#transactionAmountID').val())) {
    //   swal("Payment Setoff amount should not be greater than Transaction amount");
    //   return false
    // }

    // console.log($("#paidbyname").val());


    // if (Number($('#TdsAmount').val()) !== 0 && $("#paidbyname").val() == "" || Number($('#TdsAmount').val()) !== 0 && $("#paidbyname").val() == "select") {
    //   swal("Please select paid by name");
    //   return false
    // }


    // this.finpaidbyname = $("#paidbyname").val();

    // if (this.finpaidbyname == "select") {
    //   this.finpaidbyname = null;
    // }

    // if ($("#Sourcefound").val() == "" || $("#Sourcefound").val() == "select") {
    //   swal("Please select Source of funds");
    //   $('#CustomerCommentsId').focus();
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


    if (this.deptid != 997) {
      if ($('#CustomerCommentsId').val() == "") {
        swal("please enter the Comments");
        return false;
      }
    }


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


      if (this.modificationChargeInvoiceNo == "") {
        this.modificationChargeInvoiceNo = null;
      }

      if (this.legalChargeInvoiceNo == "") {
        this.legalChargeInvoiceNo = null;
      }


      if (this.carparkingChargesSetOffId == undefined) {
        this.carparkingChargesSetOffId = 0;
      }




      $('.page-loader-wrapper').show();

      let url = this.cmn.commonUrl + "financial/approveOrRejectMisReceiptOrPayment.spring";

      let headers = new Headers({ 'Content-Type': 'application/json' });
      //let options = new RequestOptions({ headers: headers }); 

      var body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "siteId": "" + this.siteID,
        "siteName": "" + this.projectName,
        "transactionTypeId": "" + this.viewTransactionResponse.transactionTypeId,
        "transactionModeId": "" + this.viewTransactionResponse.transactionModeId,
        "transactionTypeName": "" + this.viewTransactionResponse.transactionTypeName,
        "transactionModeName": "" + this.viewTransactionResponse.transactionModeName,
        "transferModeName": "" + this.paymentMode,
        "referenceNo": "" + this.referenceNum,
        "transactionReceiveDate": "" + milliseconds, //"2020-03-29",
        "transactionAmount": "" + $('#transactionAmountID').val(),
        "flatIds": this.flatID, //[1087],
        "bookingFormId": "" + this.bookingFormID,
        "bankId": this.banknamevalue,
        "bankName": this.banknametext,
        //  "bankAccountNumber":"45454545",
        "siteAccountId": "" + this.siteAccountId,
        "siteBankAccountNumber": this.viewTransactionResponse.siteBankAccountNumber, //"10000111101",
        "paymentSetOff": "true",
        "sourceOfFunds": $("#Sourcefound").val(),
        "paymentSetOffDetails": [
          {
            "finTransactionSetOffId": "" + this.principleAmountSetOffId, //"591",
            "setOffTypeName": "FIN_BOOKING_FORM_MILESTONES",
            "amount": "" + $('#PrincipalAmount').val() //this.principleMoney  //"1344000"
          },
          {
            "finTransactionSetOffId": "" + this.InterestSetOffId, //"1",
            "setOffTypeName": "FIN_PENALTY",
            "amount": "" + $('#InterstAmount').val() //this.finalityAmount  //"11000"
          },
          {
            "finTransactionSetOffId": "" + this.modificationChargesSetOffId, //"1",
            "setOffTypeName": "MODIFICATION_COST",
            "amount": "" + $('#ModificationCharges').val(), //this.modificationAmount, //$('#ModificationCharges').val(), //"0",
            "invoiceNo": this.modificationChargeInvoiceNo
          },
          {
            "finTransactionSetOffId": "" + this.LegalChargesSetOffId, //"1",
            "setOffTypeName": "LEGAL_COST",
            "amount": "" + $('#LeagalCharges').val(), //this.legalAmount, // $('#LeagalCharges').val(), //"0",
            "invoiceNo": this.legalChargeInvoiceNo
          },

          {
            "finTransactionSetOffId": "" + this.carparkingChargesSetOffId,
            "setOffTypeName": "Car_Parking_Cost",
            "amount": $("#carparkingcost").val(),
            "invoiceNo": this.carparkingInvoiceNumber
          },

          {
            "finTransactionSetOffId": "" + this.RefundableChargesSetOffId, //"1",
            "setOffTypeName": "REFUNDABLE_ADVANCE",
            "amount": $('#refundableAdvanceID').val(), //this.legalAmount,  //"0",
            "invoiceNo": ""
          },
          {
            "finTransactionSetOffId": this.finTransactionSetOffId, "setOffTypeName": "TDS",
            "amount": $("#TdsAmount").val(), "paidByName": this.finpaidbyname
          }
          , { "finTransactionSetOffId": this.finTransactionSetOffId_maintanance, "setOffTypeName": "Maintenance_Charge", "amount": this.MaintinaceCharges, "invoiceNo": "" }
          , { "finTransactionSetOffId": this.finTransactionSetOffId_corpus, "setOffTypeName": "Corpus_Fund", "amount": this.CorpusFund, "invoiceNo": "" }
          , { "finTransactionSetOffId": this.finTransactionSetOffId_flatkhata, "setOffTypeName": "Individual_Flat_Khata_bifurcation_and_other_charges", "amount": this.FlatKhataBifurcation }
          , { "finTransactionSetOffId": this.Registration_and_Mutation_back, "setOffTypeName": "Registration_And_Mutation_Charges", "amount": this.Registration_And_Mutation_Charges }
          , { "finTransactionSetOffId": this.Non_refundable_Caution_back, "setOffTypeName": "Non_refundable_Caution_Deposit", "amount": this.Non_refundable_Caution_Deposit }
          , { "finTransactionSetOffId": this.Electricity_Deposit_back, "setOffTypeName": "Electricity_Deposit", "amount": this.Electricity_Deposit }
       
        ],
        // "comments":[],
        "transactionEntryId": "" + this.viewTransactionResponse.transactionEntryId,
        "transactionSetOffEntryId": +this.transSetOffEntryId,
        "buttonType": rejectAndModify,
        "comment": "" + $('#CustomerCommentsId').val(),
        "transactionReceiptNo": "" + this.transactionReceiptNo // "SIPL/2020-2021/Sumadhura Soham/262"
      }



      console.log(url);

      console.log(JSON.stringify(body));




      this.http.post(url, body).map(res => res.json()).subscribe(resp => {

        console.log(JSON.stringify(resp));

        $('.page-loader-wrapper').hide();
        if (resp.responseCode == 200) {
          this.router.navigate(['View-Pending-Transactions']);
          if (rejectAndModify == 'Reject') {
            swal("Your transaction got rejected successfully !!");
          } else if (rejectAndModify == 'Modify') {
            swal("Your transaction sent for modification successfully !!");
          } else { }
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
    } else { }
  }

  fileClickfun(val, extensiontype) {
    console.log(val);
    console.log(extensiontype);
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
        this.fileName = this.sanitizer.bypassSecurityTrustResourceUrl(val);
      }, 1000);
      $('#imagemodal').modal('show');

    }
  }

  carparkingInvoiceNumberfun() {
    window.open(this.carparkingLocationname);
  }
  carparkingInvoice(event: any) {
    $("#CarparkingInvoiceId").attr("disabled", false);
  }



  /*-----------------Getting site acc number's list Start---------------------*/
  siteAccNumList(selectedSiteid) {
    $('.page-loader-wrapper').show();

    let url = this.cmn.commonUrl + "financial/viewFinProjectAccountData.spring";


    let headers = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: headers });

    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteIds": [selectedSiteid]//["111"]
    }


    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 200) {
        $('#companyAccBlock').show();
        $('#companyAccnumberID').html("");
        $('#companyAccnumberID').append("<option value='select'>" + "--Select--" + "</option>");
        for (var i = 0; i < resp.responseObjList.finProjectAccountResponseList.length; i++) {
          $('#companyAccnumberID').append("<option value='" + resp.responseObjList.finProjectAccountResponseList[i].siteAccountId + "'>" + resp.responseObjList.finProjectAccountResponseList[i].siteBankAccountNumber + "</option>");
        }

        if (this.siteAccountId != undefined || this.siteAccountId != null || this.siteAccountId != "") {
          $('#companyAccnumberID').val(this.siteAccountId);
        }
      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
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
  /*-----------------Getting Payment mode list End---------------------*/


}
