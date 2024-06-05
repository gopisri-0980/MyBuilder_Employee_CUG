import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
declare const $: any;
declare const swal: any;
var base64textString;
var json_response
// var checkedornot;
var flatId_bookingid;
var flatId;
var convertbasesixtyfour = [];
var selectbankNameValue;
var selectbanknametext;
@Component({
  selector: 'app-modify-crm-receipt-payment-view',
  templateUrl: './modify-crm-receipt-payment-view.component.html',
  styleUrls: ['./modify-crm-receipt-payment-view.component.sass']
})
export class ModifyCrmReceiptPaymentViewComponent implements OnInit {

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
  filenameval: any;
  urls: Array<any> = [];
  imgsrc: any;

  fileUrl: any;
  imageUrl: string | ArrayBuffer;
  base64_array_object_data: any = [];
  ortitle: boolean;
  fileName: string;
  extensiontype: any;
  filetypeurlsplit: any;
  filetypeurlsplit1: any;
  filenamedoc: any;
  filesplitdata: any;
  sanitizer: any;
  bindingFileInfo: Array<any> = []
  deleteArray: Array<any> = [];
  RefundableChargesSetOffId: string;
  LegalChargesSetOffId: string;
  bindingbankname: any;
  bindingbankid: any;
  bankName: any;
  bankID: any;
  siteID: string;
  projectName: string;
  transactionForId: string;
  flatID: any;
  bookingFormID: string;
  companyBankAccountNo: string;
  principleAmountSetOffId: string;
  InterestSetOffId: string;
  modificationChargesSetOffId: string;
  FlatCancellationChargesSetOffId: string;
  transSetOffEntryId: any;
  transactionDate: any;
  transactionReceiveDate: any;
  transactionAmount: any;
  SetOffResponseList: any;
  setOffID: any;
  banknamevalue: any;
  banknametext: any;
  finTransactionSetOffId: any;
  finpaidbyname: any;
  finBokAccInvoiceNo: any;
  principleAmount: any;
  setOffInterest: any;
  modificationCharges: any;
  modificationChargeInvoiceNo: any;
  LegalCharges: any;
  legalChargeInvoiceNo: any;
  refundableAdvance: any;
  cancellationCharges: any;
  modificationInvoiceNumber: any;
  ModificationdocumentLocation: any;
  legalChargeInvoiceNumber: any;
  documentLocationname: any;
  requesturl: string;

  CorpusFund: any;
  MaintinaceCharges: any;
  FlatKhataBifurcation: any;
  finTransactionSetOffId_maintanance: any;
  finTransactionSetOffId_corpus: any;
  finTransactionSetOffId_flatkhata: any;
  CorpusFund_amount: any;
  Registration_And_Mutation_Charges: any;
  Non_refundable_Caution_Deposit: any;
  Electricity_Deposit: any;

  Registration_and_Mutation_back: any;
  Non_refundable_Caution_back: any;
  Electricity_Deposit_back: any;


  constructor(private cmn: CommonComponent, private http: Http, private router: Router) {


    this.deptid = sessionStorage.getItem("session_deptid");
    this.roleid = sessionStorage.getItem("session_roleId");


    this.viewTransactionResponse = eval('(' + sessionStorage.getItem('view_transaction_data') + ')');
    json_response = eval('(' + sessionStorage.getItem('view_transaction_data') + ')');

    console.log("------------payment Initiate :" + JSON.stringify(json_response))
    this.controller = json_response;
    this.sideidname = this.controller['siteId'];
    this.con_sitename = this.controller['siteName'];
    this.transactionTypeId = this.controller['transactionTypeId'];
    this.transactionModeId = this.controller['transactionModeId'];
    this.transactionTypeName = this.controller['transactionTypeName'];
    this.transactionModeName = this.controller['transactionModeName'];
    // alert(this.transactionModeName )
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



    this.controller = this.viewTransactionResponse;
    this.sideidname = this.controller['siteId'];
    this.con_sitename = this.controller['siteName'];

    this.transactionTypeId = this.controller['transactionTypeId'];
    this.transactionModeId = this.controller['transactionModeId'];
    this.transactionTypeName = this.controller['transactionTypeName'];
    this.transactionModeName = this.controller['transactionModeName'];
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
      // this.paymentchequebutton_hide_show = false;
      // $('#file').prop("disabled", true);
      // // $('#checlist').prop("disabled", true);

      // $(".form-control").prop("disabled", true);
      // $(".form-control").attr("disabled", true);
      // $(".form-group").attr("disabled", true);
      // $("textarea").attr("disabled", true);

      // $("input[type=radio]").attr('disabled', true);
      //this.disableEnableEditableFields(false);
      $('#ModificationInvoiceId').prop('disabled', true);
      $('#LegalInvoiceId').prop('disabled', true);
    }
    var self = this;
    // var date = new Date().getMonth();
    // var minimumdate = new Date().setMonth(date - 3);
    // var maximumdate = new Date().setMonth(date + 3);

    $(function () {
      $("#transactionmodeid").select2({
        placeholder: "Search transaction mode",
        dir: "ltl"
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
        self.gridDetails(flatId);
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
        $('#transactionmodeid').html('');
        $('#transactionmodeid').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.finTransactionModeResponseList.length; i++) {
          $('#transactionmodeid').append("<option value='" + resp.responseObjList.finTransactionModeResponseList[i].transactionModeId + "'>" + resp.responseObjList.finTransactionModeResponseList[i].name + "</option>");

        }

        $('#transactionmodeid').val(this.transactionModeId)
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
        this.flatList(this.block_Id);
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
      "blockIds": [blockid]//$("#BlockId").val()
    }


    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

      console.log(JSON.stringify(resp));

      //$('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        $('#FaltId').html('');
        $('#FaltId').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#FaltId').append("<option value='" + resp.responseObjList[i].flatId + "-" + resp.responseObjList[i].flatBookingId + "'>" + resp.responseObjList[i].flatNo + "</option>");
          //	$('#projectID').formSelect(); 
        }


        $("#FaltId").val(this.flat_Id + "-" + this.flatBookingId);
        this.gridDetails(this.flat_Id);
        this.modification_legalInvoiceList(this.flatBookingId);
        flatId = this.flat_Id;
        flatId_bookingid = this.flatBookingId;

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
  gridDetails(flatId) {
    $('.page-loader-wrapper').show();


    if (this.transactionStatusNameval == "Transaction Completed") {
      this.requesturl = "CompletedTransaction";
    } else {
      this.requesturl = "approveTransaction";
    }

    // -------------------------------
    let url = this.cmn.commonUrl + "financial/viewPendingAmount.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "flatIds": [flatId],
      "transactionTypeId": JSON.stringify(this.transactionTypeId),
      "transactionModeId": JSON.stringify(this.transactionModeId),
      "transactionForId": "" + this.transactionFor,
      "transactionTypeName": "" + this.viewTransactionResponse.transactionTypeName,
      "transactionModeName": "" + this.viewTransactionResponse.transactionModeName,
      "transactionFor": "" + this.transactionFor,
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
        $("#interestamnt").html(this.totalPenaltyAmount);
        this.totaldueamount = resp.responseObjList.financialProjectMileStoneResponse[0].totalDueAmount;
        $("#pendingamnt").html(this.totaldueamount);
        this.customerName = resp.responseObjList.financialProjectMileStoneResponse[0].customerName;
        $("#custname").html(this.customerName);

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
    if ($("#transactionmodeid").val() == "select" || $("#transactionmodeid").val() == null) {
      swal("Please select transaction mode");
      $('#transactionmodeid').focus();
      return false;
    }
    if ($("#Paymentfor").val() == "select") {
      swal("Please select payment for");
      $('#Paymentfor').focus();
      return false;
    }

    // if ($("#ChequeNumber").val() == "") {
    //   swal("Please enter cheque number");
    //   $('#ChequeNumber').focus();
    //   return false;
    // }

    // if (($("#ChequeNumber").val()).length < 6) {
    //   swal("Cheque number should be more than 5 digits");
    //   $('#ChequeNumber').focus();
    //   return false;
    // }

    // if ($("#ChequeDate").val() == "") {
    //   swal("Please select cheque date");
    //   // $('#ChequeDate').focus();
    //   return false;
    // }

    if ($("#ChequeAmount").val() == "") {
      swal("Please enter amount");
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




    if ($("#PrincipalAmount").val() == "0" && $("#ModificationCharges").val() == "0" && $("#InterstAmount").val() == "0" && $("#LeagalCharges").val() == "0" && $("#refunableCharges").val() == "0" && this.CorpusFund == "0" && this.MaintinaceCharges == "0" && this.FlatKhataBifurcation == "0" && this.Registration_And_Mutation_Charges == "0" && this.Non_refundable_Caution_Deposit == "0" && this.Electricity_Deposit == "0") {
      swal("Please enter Principle amount (OR) Corpus Fund (OR) Maintenance Charges (OR) Flat Khata Bifurcation (OR) Modification charges (OR) Interest amount (OR) Legal charges (OR) Refundable Advance (OR) Registration And Mutation Charges (OR) Non-refundable Caution Deposit (OR) Electricity Deposit");
      return false;
    }



    if ((Number($('#PrincipalAmount').val()) + Number($('#ModificationCharges').val()) + Number($('#InterstAmount').val())
      + Number($('#LeagalCharges').val()) + Number(this.CorpusFund) + Number(this.MaintinaceCharges) + Number(this.FlatKhataBifurcation)
      + Number($('#refunableCharges').val())) + Number(this.Registration_And_Mutation_Charges) + Number(this.Non_refundable_Caution_Deposit) + Number(this.Electricity_Deposit) > Number($('#ChequeAmount').val())) {
      swal("Payment Setoff should be equal to Cheque amount");
      return false
    }

    if ((Number($('#PrincipalAmount').val()) + Number($('#ModificationCharges').val()) + Number($('#InterstAmount').val())
      + Number($('#LeagalCharges').val()) + Number(this.CorpusFund) + Number(this.MaintinaceCharges) + Number(this.FlatKhataBifurcation)
      + Number($('#refunableCharges').val())) + Number(this.Registration_And_Mutation_Charges) + Number(this.Non_refundable_Caution_Deposit) + Number(this.Electricity_Deposit) < Number($('#ChequeAmount').val())) {
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




    if ($("#companybankAcId").val() == "select" || $("#companybankAcId").val() == "" || $("#companybankAcId").val() == undefined || $("#companybankAcId").val() == null) {
      swal("Please select company bank account");
      $('#companybankAcId').focus();
      return false;
    }
    this.banknamevalue = $('#bank_type').val();
    // this.banknametext = $('#bankNamesID').select2('data')[0].text;
    //  alert(this.banknamevalue)
    if (this.banknamevalue == "select" || this.banknamevalue == null || this.banknamevalue == undefined) {
      this.banknamevalue = JSON.parse(null);
      this.banknametext = JSON.parse(null);
    } else {
      this.banknamevalue = $('#bank_type').val();
      this.banknametext = $('#bank_type').select2('data')[0].text;
    }

    if (confirm("Do you want to Submit the Page ?")) {


      // if (this.bindingFileInfo.length == 0) {
      //   // swal("Please attach file");
      //   $('#files').focus();
      //   this.tempfileInfo = [];
      //   //return false;

      // } else {
      for (var i = 0; i < this.bindingFileInfo.length; i++) {
        this.tempfileInfo.push({
          "extension": this.bindingFileInfo[i].extension,
          "name": this.bindingFileInfo[i].name,
          "filePath": this.bindingFileInfo[i].filePath,
          "url": this.bindingFileInfo[i].url
        });
        console.log("----------" + JSON.stringify(this.fileInfo))

        console.log(this.tempfileInfo);
      }
      //   }


      // for (var i = 0; i < this.docListArray.length; i++) {
      //   this.fileInfo = [{
      //     "extension": this.docListArray[i].documentName.split('.').pop(),
      //     "name": this.docListArray[i].documentName,
      //     "base64": convertbasesixtyfour[i]
      //   }]
      // }
      // alert(this.setOffID)
      // return false;

      if (this.modificationChargeInvoiceID == "") {
        this.modificationChargeInvoiceID = null;
      }

      if (this.legalChargeInvoiceID == "") {
        this.legalChargeInvoiceID = null;
      }

      console.log($("#companybankAcId").val());
      console.log($('#companybankAcId').select2('data')[0].text);

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
        "transactionTypeId": JSON.stringify(this.transactionTypeId),
        "transactionModeId": $("#transactionmodeid").val(),
        "transferModeId": "1",
        "transactionTypeName": this.transactionTypeName,
        "transactionModeName": $('#transactionmodeid').select2('data')[0].text,
        "transactionFor": $("#Paymentfor").select2('data')[0].text,
        "transactionForId": $("#Paymentfor").val(),
        "chequeNumber": null,
        "transactionDate": null,
        "transactionAmount": $("#ChequeAmount").val(),
        //"blockIds": [$("#BlockId").val()].map(Number),
        // "floorIds": [],
        "flatIds": [flatId].map(Number),
        "bookingFormId": flatId_bookingid,
        "bankId": this.banknamevalue,
        "bankName": this.banknametext,
        "siteAccountId": $("#companybankAcId").val(),
        "siteBankAccountNumber": $('#companybankAcId').select2('data')[0].text,
        "optionalButtonType": "Modify",
        "paymentSetOffDetails": [
          {
            "finTransactionSetOffId": "" + this.principleAmountSetOffId, //"591",
            "setOffTypeName": "FIN_BOOKING_FORM_MILESTONES",
            "amount": $('#PrincipalAmount').val(), //this.principleMoney  //"1344000"
            "refundFromMileStone": this.refundForMilestone
          },
          {
            "finTransactionSetOffId": "" + this.InterestSetOffId, //"1",
            "setOffTypeName": "FIN_PENALTY",
            "amount": $('#InterstAmount').val(), //this.finalityAmount  //"11000"
            "refundFromMileStone": this.refundForMilestone
          },
          {
            "finTransactionSetOffId": "" + this.modificationChargesSetOffId, //"1",
            "setOffTypeName": "MODIFICATION_COST",
            "amount": $('#ModificationCharges').val(), // this.modificationAmount,  //"0",
            "invoiceNo": this.modificationChargeInvoiceID,
            "refundFromMileStone": this.refundForMilestone
          },
          {
            "finTransactionSetOffId": "" + this.LegalChargesSetOffId, //"1",
            "setOffTypeName": "LEGAL_COST",
            "amount": $('#LeagalCharges').val(), //this.legalAmount,  //"0",
            "invoiceNo": this.legalChargeInvoiceID,
            "refundFromMileStone": this.refundForMilestone
          },
          {
            "finTransactionSetOffId": "" + this.RefundableChargesSetOffId, //"1",
            "setOffTypeName": "REFUNDABLE_ADVANCE",
            "amount": $('#refundableAdvanceID').val(), //this.legalAmount,  //"0",
            "invoiceNo": "",
            "refundFromMileStone": this.refundForMilestone
          },
          {
            "finTransactionSetOffId": "" + this.FlatCancellationChargesSetOffId, //"1",
            "setOffTypeName": "FLAT_CANCELLATION",
            "amount": $('#cancellationChargesID').val(), //this.legalAmount,  //"0",
            "invoiceNo": "",
            "refundFromMileStone": this.refundForMilestone
          }
          , { "finTransactionSetOffId": this.finTransactionSetOffId_maintanance, "setOffTypeName": "Maintenance_Charge", "amount": this.MaintinaceCharges, "invoiceNo": "" }
          , { "finTransactionSetOffId": this.finTransactionSetOffId_corpus, "setOffTypeName": "Corpus_Fund", "amount": this.CorpusFund, "invoiceNo": "" }
          , { "finTransactionSetOffId": this.finTransactionSetOffId_flatkhata, "setOffTypeName": "Individual_Flat_Khata_bifurcation_and_other_charges", "amount": this.FlatKhataBifurcation }
          , { "finTransactionSetOffId": this.Registration_and_Mutation_back, "setOffTypeName": "Registration_And_Mutation_Charges", "amount": this.Registration_And_Mutation_Charges }
          , { "finTransactionSetOffId": this.Non_refundable_Caution_back, "setOffTypeName": "Non_refundable_Caution_Deposit", "amount": this.Non_refundable_Caution_Deposit }
          , { "finTransactionSetOffId": this.Electricity_Deposit_back, "setOffTypeName": "Electricity_Deposit", "amount": this.Electricity_Deposit }
        
        ],
        "comments": [{ "CUSTOMER": $("#CustomerCommentsId").val() }, { "CANCEL_REASON": $("#CancelreasonId").val() }],
        "comment": $("#CrmCommentsId").val(),
        "projectAccountNumber": $('#companybankAcId').select2('data')[0].text,
        "operationType": "Modify", //this.operationType,
        "prevTransactionEntryId": this.transactionEntryId,
        "actualTransactionRequest": {
          "siteId": this.sideidname,
          "siteName": this.con_sitename,
          "transactionTypeId": this.transactionTypeId,
          "transactionModeId": this.transactionModeId,
          "transactionTypeName": this.transactionTypeName,
          "transactionModeName": this.transactionModeName,
          "flatIds": [this.flatIds],
          "bookingFormId": this.actualBookingFormId,
          "transactionAmount": this.transactionAmountval,
        },
        "buttonType": "Approve",
        "transactionEntryId": "" + this.viewTransactionResponse.transactionEntryId,
        "transactionSetOffEntryId": JSON.stringify(this.transactionSetOffEntryId),
        //"finTransactionSetOffId" :this.setOffID,
        "fileInfos": this.tempfileInfo,
        "deleteFileInfos": this.deleteArray
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

  // modificationInvoice(event: any) {
  //   $("#ModificationInvoiceId").attr("disabled", false);
  // }

  // legalInvoice(event: any) {
  //   $("#LegalInvoiceId").attr("disabled", false);
  // }

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
      "transactionTypeId": JSON.stringify(this.transactionTypeId),
      "transactionModeId": JSON.stringify(this.transactionModeId),
      "transactionForId": "" + this.transactionFor,
      "transactionTypeName": "" + this.viewTransactionResponse.transactionTypeName,
      "transactionModeName": "" + this.viewTransactionResponse.transactionModeName,
      "transactionFor": "" + this.transactionFor,
      "requestUrl": this.requesturl,
    }


    console.log(url);
    console.log(JSON.stringify(body));

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {


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
            // $('#ModificationInvoiceId').val(this.modificationChargeInvoiceID);

            if (resp.responseObjList[i].finBokAccInvoiceNo == this.modificationChargeInvoiceID) {
              this.modificationInvoiceNumber = resp.responseObjList[i].finBokAccInvoiceNo;
              this.ModificationdocumentLocation = resp.responseObjList[i].documentLocation;
            }


          } else if (this.setOffTypeName == "LEGAL_COST") {
            $('#LegalInvoiceId').append("<option value='" + resp.responseObjList[i].finBokAccInvoiceNo + "'>" + resp.responseObjList[i].finBokAccInvoiceNo + "</option>");
            //  $('#LegalInvoiceId').val(this.legalChargeInvoiceID);

            if (resp.responseObjList[i].finBokAccInvoiceNo == this.legalChargeInvoiceID) {
              this.legalChargeInvoiceNumber = resp.responseObjList[i].finBokAccInvoiceNo;
              this.documentLocationname = resp.responseObjList[i].documentLocation;
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



    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $("#ChequeNumber").val(resp.responseObjList.finTransactionEntryDetailsResponseList[0].chequeNumber)
        this.chequeDate = resp.responseObjList.finTransactionEntryDetailsResponseList[0].chequeDate
        $("#ChequeAmount").val(resp.responseObjList.finTransactionEntryDetailsResponseList[0].transactionAmount)
        this.bankType = resp.responseObjList.finTransactionEntryDetailsResponseList[0].finBankId
        this.transactionFor = resp.responseObjList.finTransactionEntryDetailsResponseList[0].transactionForId
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
        this.flatBookingId = resp.responseObjList.customerPropertyDetailsInfoList[0].flatBookingId;

        console.log(this.flat_Id);
        console.log(this.flatBookingId);


        this.siteAccountId = resp.responseObjList.finTransactionEntryDetailsResponseList[0].siteAccountId;
        this.SetOffResponseList = resp.responseObjList.finTransactionEntryDetailsResponseList[0].finTransactionSetOffResponseList;
        //   this.SetOffResponseList = resp.responseObjList.finTransactionEntryDetailsResponseList[0].finTransactionSetOffResponseList;

        for (let i = 0; i < this.SetOffResponseList.length; i++) {
          this.setOffTypeName = this.SetOffResponseList[i].setOffTypeName;
          this.setOffAmount = this.SetOffResponseList[i].setOffAmount;



          // this.paidByName =  this.SetOffResponseList[i].paidByName;

          // $("#TdsAmount").val(this.setOffAmount);
          // $("#paidbyname").val(this.paidByName);


          this.finBokAccInvoiceNo = this.SetOffResponseList[i].finBokAccInvoiceNo;
          this.setOffID = this.SetOffResponseList[i].finTransactionSetOffId;

          if (this.setOffTypeName == "Corpus_Fund") {

            this.CorpusFund_amount = this.setOffAmount;
            $('#CorpusFund').val(this.CorpusFund_amount);


          } else if (this.setOffTypeName == "FIN_BOOKING_FORM_MILESTONES") {
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
          }
          else if (this.setOffTypeName == "REFUNDABLE_ADVANCE") {
            this.RefundableChargesSetOffId = this.setOffID;
            this.refundableAdvance = this.setOffAmount;
            $('#refundableAdvanceID').val(this.refundableAdvance);
          }
          else if (this.setOffTypeName == "FLAT_CANCELLATION") {
            this.FlatCancellationChargesSetOffId = this.setOffID;
            this.cancellationCharges = this.setOffAmount;
            $('#cancellationChargesID').val(this.cancellationCharges);
          } else if (this.setOffTypeName == "Maintenance_Charge") {

            this.finTransactionSetOffId_maintanance = this.SetOffResponseList[i].finTransactionSetOffId;
            $("#MaintinaceCharges").val(this.setOffAmount);

          } else if (this.setOffTypeName == "Corpus_Fund") {
            this.finTransactionSetOffId_corpus = this.SetOffResponseList[i].finTransactionSetOffId;
            $("#CorpusFund").val(this.setOffAmount);

          } else if (this.setOffTypeName == "Individual_Flat_Khata_bifurcation_and_other_charges") {
            this.finTransactionSetOffId_flatkhata = this.SetOffResponseList[i].finTransactionSetOffId;
            $("#FlatKhataBifurcation").val(this.setOffAmount);
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

        //setting setoffid default values when didn't get id from backend
        if (this.principleAmountSetOffId == undefined) {
          this.principleAmountSetOffId = "0";
        }
        if (this.InterestSetOffId == undefined) {
          this.InterestSetOffId = "0";
        }
        if (this.modificationChargesSetOffId == undefined && this.modificationChargeInvoiceNo == undefined) {
          this.modificationChargesSetOffId = "0";
          this.modificationChargeInvoiceNo = "";
        }
        if (this.LegalChargesSetOffId == undefined && this.legalChargeInvoiceNo == undefined) {
          this.LegalChargesSetOffId = "0";
          this.legalChargeInvoiceNo = "";
        }
        if (this.RefundableChargesSetOffId == undefined) {
          this.RefundableChargesSetOffId = "0";
        }
        if (this.FlatCancellationChargesSetOffId == undefined) {
          this.FlatCancellationChargesSetOffId = "0";
        }

        this.docListArray = resp.responseObjList.finTransactionEntryDetailsResponseList[0].transactionEntryDocResponsesList;
        console.log(this.docListArray)
        for (var i = 0; i < this.docListArray.length; i++) {
          this.bindingFileInfo.push({
            "extension": this.docListArray[i].documentName.split('.').pop(),
            "name": this.docListArray[i].documentName,
            "filePath": this.docListArray[i].filePath,
            "url": this.docListArray[i].location,
            "id": this.docListArray[i].transactionEntryDocId
          });
          console.log("----------" + JSON.stringify(this.tempfileInfo))
          // this.anonymous_EntryId = json_response.anonymousEntryId
          //console.log("Anonymous_EntryId :"+this.anonymous_EntryId)
        }
        // for (var i = 0; i < this.docListArray.length; i++) {
        //   this.toDataURL(this.docListArray[i].documentLocation, function (dataUrl) {
        //     convertbasesixtyfour.push(dataUrl)
        //   })
        // }

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

  backfun() {
    this.router.navigate(['modify-transaction']);
  }
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

  /*--------------------------Reject and Modify MIS Payment Cheque start------------------*/
  rejectAndModifytMisPaymentCheque(rejectAndModify) {

    if (selectbankNameValue !== undefined && selectbanknametext !== undefined) {
      this.bindingbankname = selectbanknametext;
      this.bindingbankid = selectbankNameValue;
    } else if (this.bankName !== null && this.bankID !== null) {
      this.bindingbankname = this.bankName;
      this.bindingbankid = this.bankID;
    } else {
      this.bindingbankname = null;
      this.bindingbankid = null;
    }

    console.log(this.bindingbankname);
    console.log(this.bindingbankid);



    // if (($("#ChequeNumber").val()).length < 6) {
    //   swal("Cheque number should be more than 5 digits");
    //   $('#ChequeNumber').focus();
    //   return false;
    // }

    // if ($("#ChequeDate").val() == "") {
    //   swal("Please select cheque date");
    //   // $('#ChequeDate').focus();
    //   return false;
    // }

    // if ($("#ChequeAmount").val() == "") {
    //   swal("Please enter cheque amount");
    //   $('#ChequeAmount').focus();
    //   return false;
    // }

    // if ($("#CancelreasonId").val() == "") {
    //   swal("Please enter reason");
    //   $('#PayableAmount').focus();
    //   return false;
    // }



    // if ($("#bank_type").val() == "2") {
    //   swal("Please select bank name");
    //   $('#bank_type').focus();
    //   return false;
    // }

    // if ($("#ProjectId").val() == "select") {
    //   swal("Please select project");
    //   $('#ProjectId').focus();
    //   return false;
    // }

    // if ($("#BlockId").val() == "select") {
    //   swal("Please select block");
    //   $('#BlockId').focus();
    //   return false;
    // }

    // if ($("#FaltId").val() == "select") {
    //   swal("Please select Flat");
    //   $('#FaltId').focus();
    //   return false;
    // }

    // if ($("#PrincipalAmount").val() == "0" && $("#ModificationCharges").val() == "0" && $("#InterstAmount").val() == "0" && $("#LeagalCharges").val() == "0" && $("#refundableAdvanceID").val() == "0") {
    //   swal("Please enter Principle amount (OR) Modification charges (OR) Interest amount (OR) Legal charges (OR) Refundable Advance");
    //   return false;
    // }



    // if ((Number($('#PrincipalAmount').val()) + Number($('#ModificationCharges').val()) + Number($('#InterstAmount').val()) + Number($('#LeagalCharges').val()) + Number($('#refundableAdvanceID').val())) > Number($('#ChequeAmount').val())) {
    //   swal("Payment Setoff should be equal to Cheque amount");
    //   return false
    // }

    // if ((Number($('#PrincipalAmount').val()) + Number($('#ModificationCharges').val()) + Number($('#InterstAmount').val()) + Number($('#LeagalCharges').val()) + Number($('#refundableAdvanceID').val())) < Number($('#ChequeAmount').val())) {
    //   swal("Payment Setoff should be equal to Cheque amount");
    //   return false
    // }

    // if ($("#ModificationCharges").val() != "0") {
    //   if ($("#ModificationInvoiceId").val() == "") {
    //     $("#ModificationInvoiceId").attr("disabled", false);
    //     swal("Please select modification invoice");
    //     $('#ModificationInvoiceId').focus();
    //     return false;
    //   }
    // }

    // if ($("#LeagalCharges").val() != "0") {
    //   $("#LegalInvoiceId").attr("disabled", false);
    //   if ($("#LegalInvoiceId").val() == "") {
    //     swal("Please select legal invoice");
    //     $('#LegalInvoiceId').focus();
    //     return false;
    //   }

    // }
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




    // if ($("#companybankAcId").val() == "select") {
    //   swal("Please select company bank account");
    //   $('#companybankAcId').focus();
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


    if (this.modificationChargeInvoiceID == "") {
      this.modificationChargeInvoiceID = null;
    }


    if (this.legalChargeInvoiceID == "") {
      this.legalChargeInvoiceID = null;
    }



    if ($('#CrmCommentsId').val() == "") {
      swal("Please select comments");
      return false;
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
      if ($('#cancellationChargesID').val() == "") {
        $('#cancellationChargesID').val(0);
      } else {
        $('#cancellationChargesID').val();
      }

      $('.page-loader-wrapper').show();
      let url = this.cmn.commonUrl + "financial/approveOrRejectMisReceiptOrPayment.spring";

      let headers = new Headers({ 'Content-Type': 'application/json' });
      //let options = new RequestOptions({ headers: headers }); 
      // "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      // "siteId": JSON.stringify(this.sideidname),
      // "siteName": this.con_sitename,
      // "transactionTypeId": JSON.stringify(this.transactionTypeId),
      // "transactionModeId": JSON.stringify(this.transactionModeId),
      // "transactionTypeName": this.transactionTypeName,
      // "transactionModeName": this.transactionModeName,
      // "transferModeName": this.transferMode,
      // "transactionFor": this.transactionFor,
      // "flatIds": [this.flatIds],
      // "bookingFormId": JSON.stringify(this.bookingFormId),
      // "actualFlatIds": [this.actualFlatIds],
      // "actualBookingFormId": JSON.stringify(this.actualBookingFormId),
      // "buttonType": this.buttonType,
      // "actionUrl": this.actionUrl,
      // "transactionEntryId": JSON.stringify(this.transactionEntryId),
      // "transactionSetOffEntryId": JSON.stringify(this.transactionSetOffEntryId),
      // "transactionNo": this.transactionNumber,
      // "comment": "" + $('#CustomerCommentsId').val(),
      // "transactionReceiptNo": this.transactionReceiptNo,
      var body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "siteId": JSON.stringify(this.sideidname),
        "siteName": this.con_sitename,
        "transactionTypeId": JSON.stringify(this.transactionTypeId),
        "transactionModeId": JSON.stringify(this.transactionModeId),
        "transactionForId": "" + this.transactionFor,
        "transactionTypeName": "" + this.viewTransactionResponse.transactionTypeName,
        "transactionModeName": "" + this.viewTransactionResponse.transactionModeName,
        "transactionFor": "" + this.transactionFor,
        "chequeNumber": "" + $('#ChequeNumber').val(),
        "transactionDate": null, //"2019-06-21",
        "transactionAmount": "" + $('#ChequeAmount').val(),
        "flatIds": this.flatID, // [1087],
        "bookingFormId": "" + JSON.stringify(this.bookingFormId),
        "bankId": this.bindingbankid,
        "bankName": this.bindingbankname,
        "siteAccountId": "" + this.siteAccountId,
        "siteBankAccountNumber": "" + this.companyBankAccountNo, //"10000111101",
        "paymentSetOff": "true",

        // "sourceOfFunds": $("#Sourcefound").val(),
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
          , { "finTransactionSetOffId": this.finTransactionSetOffId_maintanance, "setOffTypeName": "Maintenance_Charge", "amount": this.MaintinaceCharges, "invoiceNo": "" }
          , { "finTransactionSetOffId": this.finTransactionSetOffId_corpus, "setOffTypeName": "Corpus_Fund", "amount": this.CorpusFund, "invoiceNo": "" }
          , { "finTransactionSetOffId": this.finTransactionSetOffId_flatkhata, "setOffTypeName": "Individual_Flat_Khata_bifurcation_and_other_charges", "amount": this.FlatKhataBifurcation }
        
          , { "finTransactionSetOffId": this.Registration_and_Mutation_back, "setOffTypeName": "Registration_And_Mutation_Charges", "amount": this.Registration_And_Mutation_Charges }
          , { "finTransactionSetOffId": this.Non_refundable_Caution_back, "setOffTypeName": "Non_refundable_Caution_Deposit", "amount": this.Non_refundable_Caution_Deposit }
          , { "finTransactionSetOffId": this.Electricity_Deposit_back, "setOffTypeName": "Electricity_Deposit", "amount": this.Electricity_Deposit }

        ],
        "transactionEntryId": "" + this.viewTransactionResponse.transactionEntryId,
        "transactionSetOffEntryId": +this.transSetOffEntryId,
        "buttonType": rejectAndModify,
        "comment": "" + $('#CrmCommentsId').val(),
        "transactionReceiptNo": "" + this.transactionReceiptNo // "SIPL/2020-2021/Sumadhura Soham/262"
      }


      console.log(url);
      console.log(JSON.stringify(body));


      this.http.post(url, body).map(res => res.json()).subscribe(resp => {

        console.log(JSON.stringify(body));

        $('.page-loader-wrapper').hide();
        if (resp.responseCode == 200) {
          this.router.navigate(['View-Pending-Transactions']);
          if (rejectAndModify == 'Reject') {
            swal("Your transaction got rejected sucessfully !!");
          } else if (rejectAndModify == 'Modify') {
            swal("Your transaction sent for modification sucessfully !!");
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

    /*--------------------------Reject and Modify MIS Payment Cheque End------------------*/
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
  Deleteimage1(val, item) {
    if (confirm("Do you want to Delete the file ?")) {
      debugger;
      this.bindingFileInfo.splice(val, 1);
      // this.tempfileInfo= [];

      // this.urls.splice(val, 1);
      this.deleteArray.push(
        {
          "id": item.id,
          "extension": item.extension,
          "name": item.name,
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
}