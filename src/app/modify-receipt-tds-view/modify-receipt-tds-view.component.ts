import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
declare const $: any;
declare const swal: any;
var challan_Reflection_Date
var selectbankNameValue;
var selectbanknametext;
var challanDate;

@Component({
  selector: 'app-modify-receipt-tds-view',
  templateUrl: './modify-receipt-tds-view.component.html',
  styleUrls: ['./modify-receipt-tds-view.component.sass']
})
export class ModifyReceiptTdsViewComponent implements OnInit {

  customerName: any;
  customerPropertyDetails: any;
  projectName: any;
  blockNumber: any;
  flatNumber: any;
  finTransactionEntryDetails: any;
  chequeNum: any;
  chequeDate: any;
  chequeAmount: any;
  bankName: any;
  bankID: any;
  payableAmount: any;
  attachedFiles: any;
  location: string;
  chequeReceiveDate: string;
  companyBankAccountNo: any;
  customerComments: any;
  setOffPayment: any;
  principleAmount: any;
  setOffInterest: any;
  modificationCharges: any;
  modificationChargeInvoiceNo: any;
  LegalCharges: any;
  legalChargeInvoiceNo: any;
  previousCRMComments: any;
  totalPendingAmount: any;
  totalInterestAmount: any;
  flatID: any[] = [];
  transactionID: any;
  transactionType: any;
  SetOffResponseList: any;
  setOffTypeName: any;
  setOffAmount: any;
  siteID: any;
  transactionEntryId: any;
  bookingFormID: any;
  viewTransactionResponse: any;
  transSetOffEntryId: any;
  transaction_ReceivedDate: string;
  receivedDate_Milliseconds: number;
  chequeReceiveFormat: string;
  chequeDateFormat: string;
  metadataName: any;
  custComments: any;
  customerCommentsArray: any;
  operationType: string;
  pathName: string;
  refundableAdvance: any;
  transaction_chequeDate: string;
  chequeDate_Milliseconds: number;
  siteAccountId: any;
  siteBankAccountNumber: any;
  setOffID: any;
  principleAmountSetOffId: any;
  InterestSetOffId: any;
  modificationChargesSetOffId: any;
  LegalChargesSetOffId: any;
  finalityAmount: any;
  modificationAmount: number;
  legalAmount: any;
  principleMoney: any;
  finBokAccInvoiceNo: any;
  docListArray: any = [];
  transactionReceiptNo: any;
  RefundableChargesSetOffId: any;
  lastTransactionEditedDate: any;
  lastTransactionEditedBy: any;
  chequeDepositedDate: string;
  chequeDepositedDate_Milliseconds: number;
  chequedepositedDate: any;

  controller: Array<any> = [];
  sideidname: any;
  con_sitename: any;
  transactionTypeId: any;
  transactionModeId: any;
  transactionTypeName: any;
  transactionModeName: any;
  transactionDate: any;
  transactionReceiveDate: any;
  transactionAmount: any;
  flatIds: any;
  bookingFormId: any;
  actualFlatIds: any;
  actualBookingFormId: any;
  buttonType: string;
  actionUrl: string;
  transactionSetOffEntryId: any;
  transactionNumber: any;
  commentfield: any;
  transactionReceiptNumber: any;
  actualTransactionReceiveDate: any;
  transactionStatusNameval: any;
  documentLocation: any;
  sourceOfFunds: any;
  paidByName: any;
  deptid: any;
  roleid: any;
  finTransactionSetOffId: any;
  finpaidbyname: any;
  bindingbankname: any;
  bindingbankid: any;
  legalChargeInvoiceNumber: any;
  documentLocationname: any;
  modificationInvoiceNumber: any;
  ModificationdocumentLocation: any;
  controllerdata: any;
  modificationhideme: boolean;
  legalinvoicehideme: boolean;
  displaySpinner: boolean;
  requesturl: string;

  CorpusFund: any;
  MaintinaceCharges: any;
  FlatKhataBifurcation: any;
  finTransactionSetOffId_maintanance: any;
  finTransactionSetOffId_corpus: any;
  finTransactionSetOffId_flatkhata: any;
  CorpusFund_amount: any;
  carparkingInvoiceID: any;
  carparkingInvoiceNumber: any;
  carparkingLocationname: any;
  carparkingcost_amount: any;
  carparkingChargesSetOffId: any;
  challan_Date: any;
  challanReflection_Date: any;
  bsr_Code: any;
  ack_No: any;
  fileExtension_array: any[];
  file_name_array1: any[];
  tempfileInfo: Array<any> = [];
  base64_array_object_data1: any[];
  File_Info1: any[];
  binaryString: any;
  base64textString: string;
  filename: any;
  filename_extension: any;
  filenameval: any;
  urls: Array<any> = [];
  filemode: Array<any> = [];
  ortitle: boolean;
  imageUrl: string | ArrayBuffer;
  base64_array_object_data: any = [];

  bindingFileInfo: Array<any> = [];
  deleteArray: Array<any> = [];
  flat_No: any;
  headtitlee: any;

  //challan_No: any;

  constructor(private cmn: CommonComponent, private http: Http, private router: Router) {
    this.headtitlee = sessionStorage.getItem("headtitle");

    this.deptid = sessionStorage.getItem("session_deptid");
    this.roleid = sessionStorage.getItem("session_roleId");
    console.log(this.deptid)
    console.log(this.roleid)

    $('.page-loader-wrapper').hide();
    var json_response;
    json_response = eval('(' + sessionStorage.getItem('view_transaction_data') + ')');
    this.viewTransactionResponse = json_response;

    console.log(JSON.stringify(json_response));

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
    this.bookingFormId = this.controller['bookingFormId'];
    this.actualFlatIds = this.controller['flatId'];
    this.actualFlatIds = this.controller['flatId'];
    this.flat_No = this.controller['flatNo'];

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
    this.challan_Date = this.controller['challanDate'];
    this.challanReflection_Date = this.controller['challanReflectionDate'];
    var bsr_Code = this.controller['bsrCode'];
    var ack_No = this.controller['ackNo'];

    var challan_No = this.controller['challanNo'];
    challan_Reflection_Date = this.controller['challanReflectionDate'];
    challanDate = this.controller['challanDate'];

    this.operationType = this.viewTransactionResponse.operationType;

    
    //alert(challan_No)
    $(function () {
      $('#ChequeNumber').val(challan_No);
      $('#ackNumber').val(ack_No);
      $('#bsrNumber').val(bsr_Code);

      // var chequeDate = new Date(this.challan_Date).toLocaleDateString(); 
      // this.chequeDateFormat = chequeDate.split('/')[1]+"-"+chequeDate.split('/')[0]+"-"+chequeDate.split('/')[2];
      // $('#ChequeDate').val(this.chequeDateFormat);

    })
    this.challan_Date = this.controller['challanDate'];
    this.challanReflection_Date = this.controller['challanReflectionDate'];
    var date = new Date().getMonth();
    var minimumdate = new Date().setMonth(date - 3);
    var maximumdate = new Date().setMonth(date + 3);

    $('#ChequeDate').bootstrapMaterialDatePicker({
      format: 'YYYY-MM-DD',
      //minDate: new Date(minimumdate),
      maxDate: new Date(),
      clearButton: true,
      weekStart: 1,
      time: false
    }).on('change', function (e, date) {
      $('#ChequeDepositedDateID').bootstrapMaterialDatePicker('setMinDate', date);
    });

    this.operationType = this.viewTransactionResponse.operationType;
    this.getMisReceiptChequeData();


  }



  ngOnInit() {



    if (sessionStorage.getItem('sessionFor_receiptCheque') == "receiptCheque") {
      $(".chequedepositedateshowhide").show()
      $("#ChequeDepositedDateID").prop('disabled', false);
    } else {
      $(".chequedepositedateshowhide").hide()
    }
    if (this.operationType == 'approveTransaction') {
      this.pathName = "View Pending Transactions for Approval";
      //alert(this.deptid)
      if (this.deptid == 993) {
        this.disableEnableEditableFields(true);
      } else if (this.deptid == 997) {
        this.disableEnableEditableFields(true);
      } else {
        this.disableEnableEditableFields(false);
      }
      //  alert(this.deptid)
    } else if (this.operationType == 'transactionStatus') {
      this.pathName = "View Temporary Transactions Status";
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
    } else { }
    // if(this.operationType == 'loadCompletedTransaction' && this.deptid == 993 && this.roleid != 20){
    //   $(function(){

    //     $("#ChequeNumber").attr("disabled", false);
    //     $("#ChequeDate").attr("disabled", false);
    //     $("#ChequeAmount").attr("disabled", false);
    //     $("#ackNumber").attr("disabled", false);
    //     $("#bsrNumber").attr("disabled", false);
    //     $("#PrincipalAmount").attr("disabled", false);
    //   })

    //   }else{
    //     $(function(){
    //     $("#attchfilehide").hide()
    //     $("#ChequeNumber").attr("disabled", true);
    //     $("#ChequeDate").attr("disabled", true);
    //     $("#ChequeAmount").attr("disabled", true);
    //     $("#ackNumber").attr("disabled", true);
    //     $("#bsrNumber").attr("disabled", true);
    //     $("#PrincipalAmount").attr("disabled", true);
    //   })
    //   }
    var self = this;
    // var date = new Date();
    // var newdate = date.setDate(date.getDate() - 365);

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



      $('#ChequeAmount').bind("cut copy paste", function (e) {
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

      var date = new Date().getMonth();
      var minimumdate = new Date().setMonth(date - 3);
      var maximumdate = new Date().setMonth(date + 3);


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
      var chequeDate = new Date(challanDate).toLocaleDateString();
      var chequeDateFormat = chequeDate.split('/')[2] + "-" + chequeDate.split('/')[0] + "-" + chequeDate.split('/')[1];

      $('#reflectionDate').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
        minDate: new Date(chequeDateFormat),
        maxDate: new Date(),
        clearButton: true,
        weekStart: 1,
        time: false
      }).on('change', function (e, date) {
        // $('#ChequeDepositedDateID').bootstrapMaterialDatePicker('setMinDate', date);
      });

      //$("#reflectionDate").val(datestring)
      $('#ChequeDate').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
       // minDate: new Date(minimumdate),
        maxDate: new Date(),
        clearButton: true,
        weekStart: 1,
        time: false,
      }).on('change', function (e, date) {
        $('#receivedDateID').bootstrapMaterialDatePicker('setMinDate', date);
      });


      $('#receivedDateID').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
        minDate: new Date(minimumdate),
        maxDate: new Date(),
        clearButton: true,
        weekStart: 1,
        time: false
      })





      // $('#receivedDateID').bootstrapMaterialDatePicker({
      //   format: 'DD-MM-YYYY',
      //   minDate: new Date(minimumdate),
      //   maxDate: new Date(maximumdate),
      //   clearButton: true,
      //   weekStart: 1,
      //   time: false
      // });

      // $('#ChequeDate').bootstrapMaterialDatePicker({
      //   format: 'DD-MM-YYYY',
      //   minDate: new Date(minimumdate),
      //   maxDate: new Date(maximumdate),
      //   clearButton: true,
      //   weekStart: 1,
      //   time: false
      // });

      // $('#ChequeDepositedDateID').bootstrapMaterialDatePicker({
      //   format: 'DD-MM-YYYY',
      //   minDate: new Date(minimumdate),
      //   maxDate: new Date(maximumdate),
      //   clearButton: true,
      //   weekStart: 1,
      //   time: false
      // });


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




      $("#paidbyname").select2({
        placeholder: "Paid By",
        dir: "ltl"
      });


      $("#Sourcefound").select2({
        placeholder: "Source of funds",
        dir: "ltl"
      });


      $("#bankNameID").select2({
        placeholder: "Select Bank",
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
    });

  }

  /*-----------------Getting Bank names list Start---------------------*/
  bankNamesList() {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/viewFinTransactionTypeModeData.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "condition": "fecthAllData"
    }


    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      console.log(resp);

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
          $('#Sourcefound').html("<option value='select'>Select</option>" + "" + "<option value='Bank'>Bank</option>" + "" + "<option value='Self'>Self</option>");
          $("#Sourcefound").val(this.sourceOfFunds)

        }

        if (this.paidByName == null || this.paidByName == undefined || this.paidByName == "undefined") {

        } else {
          $('#paidbyname').html("<option value='select'>Select</option>" + "" + "<option value='Customer'>Customer</option>" + "" + "<option value='Omsree'>Om sree</option>");
          $("#paidbyname").val(this.paidByName)
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
  /*-----------------Getting Bank names list End---------------------*/

  /*--------------------------Mis Receipt Cheque data start------------------*/
  getMisReceiptChequeData() {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/viewMisReceiptChequeOnlineData.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "transactionEntryId": this.viewTransactionResponse.transactionEntryId,
      "bookingFormId": this.viewTransactionResponse.bookingFormId,
      "transactionModeName": "" + this.viewTransactionResponse.transactionModeName,
      "operationType": "" + this.operationType
    }

    console.log(body);

    this.http.post(url, body).map(res => res.json()).subscribe(resp => {

      console.log(resp);

      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        //  this.bankNamesList();
        this.lastTransactionEditedDate = resp.responseObjList.lastTransactionEditedDate;
        this.lastTransactionEditedBy = resp.responseObjList.lastTransactionEditedBy;
        this.customerPropertyDetails = resp.responseObjList.customerPropertyDetailsInfoList[0];
        this.projectName = this.customerPropertyDetails.siteName;
        this.blockNumber = this.customerPropertyDetails.blockName;
        this.flatNumber = this.customerPropertyDetails.flatNo;
        this.flatID.push(this.customerPropertyDetails.flatId);
        this.siteID = this.customerPropertyDetails.siteId;
        this.getPendingAndInterestAmount();
        // this.modification_legalInvoiceList();
        this.finTransactionEntryDetails = resp.responseObjList.finTransactionEntryDetailsResponseList[0];
        this.transactionType = this.viewTransactionResponse.transactionTypeName;


        this.transactionID = this.finTransactionEntryDetails.finTransactionNo;

        this.transactionReceiptNo = this.finTransactionEntryDetails.transactionReceiptNo
        this.siteAccountId = this.finTransactionEntryDetails.siteAccountId;
        this.siteBankAccountNumber = this.finTransactionEntryDetails.siteBankAccountNumber;

        this.documentLocation = this.finTransactionEntryDetails.transactionReceiptDocResponsesList;

        //  this.transactionEntryId = this.finTransactionEntryDetails.transactionEntryId;
        this.transSetOffEntryId = this.finTransactionEntryDetails.transactionSetOffEntryId;
        this.chequedepositedDate = this.finTransactionEntryDetails.chequeDepositedDate;

        this.bookingFormID = this.finTransactionEntryDetails.bookingFormId;
        this.chequeNum = this.finTransactionEntryDetails.chequeNumber;
        // $('#ChequeNumber').val(this.chequeNum);

        this.chequeDate = this.finTransactionEntryDetails.chequeDate;



        // var chequeDate = new Date(this.chequeDate).toLocaleDateString(); 
        // this.chequeDateFormat = chequeDate.split('/')[1]+"-"+chequeDate.split('/')[0]+"-"+chequeDate.split('/')[2];
        // $('#ChequeDate').val(this.chequeDateFormat);

        this.chequeAmount = this.finTransactionEntryDetails.transactionAmount;
        $('#ChequeAmount').val(this.chequeAmount);
        this.bankName = this.finTransactionEntryDetails.bankName;
        this.bankID = this.finTransactionEntryDetails.finBankId;
        //  $('#bankNameID').append("<option value='" + this.bankID + "'>" + this.bankName + "</option>");

        this.chequeReceiveDate = this.finTransactionEntryDetails.transactionReceiveDate;
        var date = new Date().getMonth();
        var minimumdate = new Date().setMonth(date - 3);
        var maximumdate = new Date().setMonth(date + 3);

        $('#receivedDateID').bootstrapMaterialDatePicker({
          format: 'YYYY-MM-DD',
          minDate: new Date(minimumdate),
          maxDate: new Date(),
          clearButton: true,
          weekStart: 1,
          time: false
        }).on('change', function (e, date) {
          $('#ChequeDepositedDateID').bootstrapMaterialDatePicker('setMinDate', date);
        });


        var d = new Date(this.chequeReceiveDate);

        var datestring = d.getFullYear() + "/" + ("0" + (d.getMonth() + 1)).slice(-2) + "/" + ("0" + d.getDate()).slice(-2);
        $('#ChequeDepositedDateID').bootstrapMaterialDatePicker({
          format: 'YYYY-MM-DD',
          minDate: new Date(datestring),
          maxDate: new Date(),
          clearButton: true,
          weekStart: 1,
          time: false
        });

        // var chequeRceiveDate = new Date(this.chequeReceiveDate).toLocaleDateString(); 
        // this.chequeReceiveFormat = chequeRceiveDate.split('/')[1]+"-"+chequeRceiveDate.split('/')[0]+"-"+chequeRceiveDate.split('/')[2];
        // $('#receivedDateID').val(this.chequeReceiveFormat);

        this.payableAmount = this.finTransactionEntryDetails.payableAmount;
        // $('#PayableAmount').val(this.payableAmount);

        this.docListArray = resp.responseObjList.finTransactionEntryDetailsResponseList[0].transactionEntryDocResponsesList;

        //  this.attachedFiles = this.finTransactionEntryDetails.docName
        // this.location = this.finTransactionEntryDetails.location;

        //  this.companyBankAccountNo = this.finTransactionEntryDetails.companyAccountNo;

        this.sourceOfFunds = resp.responseObjList.finTransactionEntryDetailsResponseList[0].sourceOfFunds;

        this.previousCRMComments = this.finTransactionEntryDetails.finTransactionApprStatResponseList;
        this.SetOffResponseList = resp.responseObjList.finTransactionEntryDetailsResponseList[0].finTransactionSetOffResponseList;

        for (let i = 0; i < this.SetOffResponseList.length; i++) {
          this.setOffTypeName = this.SetOffResponseList[i].setOffTypeName;
          this.setOffAmount = this.SetOffResponseList[i].setOffAmount;


          this.paidByName = this.SetOffResponseList[i].paidByName;



          this.finBokAccInvoiceNo = this.SetOffResponseList[i].finBokAccInvoiceNo;
          this.setOffID = this.SetOffResponseList[i].finTransactionSetOffId;

          this.finTransactionSetOffId = this.SetOffResponseList[i].finTransactionSetOffId;
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

        this.customerCommentsArray = resp.responseObjList.finTransactionEntryDetailsResponseList[0].finTransactionCommentsResponseList;
        for (let i = 0; i < this.customerCommentsArray.length; i++) {
          this.metadataName = this.customerCommentsArray[i].metadataName;
          this.custComments = this.customerCommentsArray[i].comments;
          if (this.metadataName == "CUSTOMER") {
            this.customerComments = this.custComments;
          }

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
  /*--------------------------Mis Receipt Cheque data End------------------*/

  /*-----------------get Pending And Interest Amount Start---------------------*/
  getPendingAndInterestAmount() {

    if (this.transactionStatusNameval == "Transaction Completed") {
      this.requesturl = "CompletedTransaction";
    } else {
      this.requesturl = "approveTransaction";
    }

    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/viewPendingAmount.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: headers });

    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "flatIds": this.flatID,
      "transactionTypeId": "" + this.viewTransactionResponse.transactionTypeId,
      "transactionModeId": "" + this.viewTransactionResponse.transactionModeId,
      "transactionTypeName": "" + this.viewTransactionResponse.transactionTypeName,
      "transactionModeName": "" + this.viewTransactionResponse.transactionModeName,
      "requestUrl": this.requesturl,
      "bookingFormId": this.viewTransactionResponse.bookingFormId,
    }

    console.log(url);
    console.log(JSON.stringify(body));


    this.http.post(url, body).map(res => res.json()).subscribe(resp => {

      console.log(JSON.stringify(resp));

      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 200) {
        this.totalPendingAmount = resp.responseObjList.financialProjectMileStoneResponse[0].totalDueAmount;
        this.totalInterestAmount = resp.responseObjList.financialProjectMileStoneResponse[0].totalPenaltyAmount;
        this.customerName = resp.responseObjList.financialProjectMileStoneResponse[0].customerName;
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
  /*-----------------get Pending And Interest Amount end---------------------*/

  /*-------------------------View file  start---------------------------*/
  viewFiles(location) {

    window.open(location, '_system', 'location=yes,closebuttoncaption=Fechar,enableViewportScale=no');

  }
  /*-------------------------View file end---------------------------*/

  /*-----Getting modification and legal invoices list start------------*/
  modification_legalInvoiceList() {
    $('.page-loader-wrapper').show();

    if (this.transactionStatusNameval == "Transaction Completed") {
      this.requesturl = "CompletedTransaction";
    } else {
      this.requesturl = "approveTransaction";
    }


    let url = this.cmn.commonUrl + "financial/viewPendingAmount.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "flatIds": this.flatID, //[flatId].map(Number),//$("#FaltId").val(),
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

      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {

        this.controllerdata = resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList;
        for (var i = 0; i < resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList.length; i++) {
          this.setOffTypeName = resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].metadataName;

          // console.log(this.setOffTypeName);

          if (this.setOffTypeName == "MODIFICATION_COST") {
            $('#ModificationInvoiceId').append("<option value='" + resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo + "'>" + resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo + "</option>");
            //  $('#ModificationInvoiceId').val(this.modificationChargeInvoiceNo);
            if (resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo == this.modificationChargeInvoiceNo) {
              this.modificationInvoiceNumber = resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo;
              this.ModificationdocumentLocation = resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].documentLocation;
            }
          } else if (this.setOffTypeName == "LEGAL_COST") {
            $('#LegalInvoiceId').append("<option value='" + resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo + "'>" + resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo + "</option>");
            //   $('#LegalInvoiceId').val(this.legalChargeInvoiceNo);
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
  /*-----Getting modification and legal invoices list End------------*/

  legalChargeInvoiceNumberfun() {
    window.open(this.documentLocationname);
  }

  modificationInvoiceNumberfun() {
    window.open(this.ModificationdocumentLocation);
  }

  carparkingInvoiceNumberfun() {
    window.open(this.carparkingLocationname);
  }

  /*--------------------------Approve MIS Receipt Cheque start------------------*/
  approveMisReceiptCheque(approve) {


    if ($("#ChequeNumber").val() == "") {
      swal("Please enter challan number");
      $('#ChequeNumber').focus();
      return false;
    }

    if (($("#ChequeNumber").val()).length < 5) {
      swal("Challan number should be more than 4 digits");
      $('#ChequeNumber').focus();
      return false;
    }

    if ($("#ChequeDate").val() == "") {
      swal("Please select challan date");
      // $('#ChequeDate').focus();
      return false;
    }

    if ($("#ChequeAmount").val() == "") {
      swal("Please enter challan amount");
      $('#ChequeAmount').focus();
      return false;
    }

    if ($("#receivedDateID").val() == "") {
      swal("Please select challan received date");
      //$('#ChequeRecDate').focus();
      return false;
    }
    // if ($("#reflectionDate").val() == "") {
    //   swal("Please select reflection date");
    //   //$('#ChequeRecDate').focus();
    //   return false;
    // }



    if (($("#PrincipalAmount").val() == "0")) {
      swal("Please enter Principle amount");
      return false;
    }




    if ((Number($('#PrincipalAmount').val())) > Number($('#ChequeAmount').val())) {

      swal("Payment Setoff should be equal to Cheque amount");
      return false
    }

    if ((Number($('#PrincipalAmount').val())) < Number($('#ChequeAmount').val())) {

      swal("Payment Setoff should be equal to Cheque amount");
      return false
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
      // if($('#ModificationInvoiceId').val() == "select"){
      //   $('#ModificationInvoiceId').val('');
      // }else{
      //   $('#ModificationInvoiceId').val();
      // }
      // if($('#LegalInvoiceId').val() == "select"){
      //   $('#LegalInvoiceId').val('');
      // }else{
      //   $('#LegalInvoiceId').val();
      // }

      if (this.finTransactionSetOffId == undefined || this.finTransactionSetOffId == "undefined" || this.finTransactionSetOffId == "") {
        this.finTransactionSetOffId = 0;
      }


      if (this.modificationChargeInvoiceNo == "") {
        this.modificationChargeInvoiceNo = null;
      }

      if (this.legalChargeInvoiceNo == "") {
        this.legalChargeInvoiceNo = null;
      }

      if (this.carparkingInvoiceNumber == undefined) {
        this.carparkingInvoiceNumber = null;
      }

      if (this.carparkingChargesSetOffId == undefined) {
        this.carparkingChargesSetOffId = 0;
      }


      $('.page-loader-wrapper').show();

      let url = this.cmn.commonUrl + "financial/approveFinancialMultipleTransaction.spring";
      console.log(url);

      let headers = new Headers({ 'Content-Type': 'application/json' });
      //let options = new RequestOptions({ headers: headers }); 

      var body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "financialTRNRequests": [
          {
            "siteId": "" + this.siteID,
            "siteName": "" + this.projectName,
            "transactionTypeId": 1,
            "transactionModeId": 6,
            "transactionTypeName": "Receipt",
            "transactionModeName": "TDS",
            "transactionAmount": $("#ChequeAmount").val(),
            // "transactionReceiveDate": new Date($("#ChequeRecDate").val()).getTime(),
            "challanReflectionDate": new Date($("#reflectionDate").val()).getTime(),
            "challanNo": $("#ChequeNumber").val(),
            "bsrNo": $("#bsrNumber").val(),
            "ackNo": $("#ackNumber").val(),
            "transactionDate": new Date($("#ChequeDate").val()).getTime(),
            "flatIds": this.flatID, // [1087],
            "bookingFormId": "" + this.bookingFormID,
            "finTransactionNo": this.transactionID,
            "transactionEntryId": this.viewTransactionResponse.transactionEntryId,
            "transactionSetOffEntryId": this.transSetOffEntryId,

            "paymentSetOffDetails": [
              {
                "finTransactionSetOffId": "" + this.principleAmountSetOffId, //"591",
                "setOffTypeName": "FIN_BOOKING_FORM_MILESTONES",
                "amount": "" + $('#PrincipalAmount').val()
              },

            ],
            "buttonType": "Approve",
            "optionalButtonType": "Modify",
          }
        ]
      }

      console.log(url);
      console.log(JSON.stringify(body));

      this.http.post(url, body).map(res => res.json()).subscribe(resp => {

        console.log(JSON.stringify(resp));

        $('.page-loader-wrapper').hide();

        if (resp.responseCode == 200) {
          this.router.navigate(['modify-transaction']);
          swal("Your transaction sent successfully !!");
        } else if (resp.responseCode == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        } else {
          swal(resp.errors[0]);
        }
      },
        error => {
          $('.page-loader-wrapper').hide();
          // var error = JSON.parse(error._body).responseCode;
          if (error == 440) {
            swal("Your Session has been Timed Out!", "Please login once again.", "error");
            this.router.navigate([""]);
          }
        }
      );
    } else { }


  }
  /*--------------------------Approve MIS Receipt Cheque End------------------*/


  /*--------------------------Reject and Modify MIS Receipt Cheque start------------------*/
  rejectAndModifytMisReceiptCheque(rejectAndModify) {



    if ($('#CustomerCommentsId').val() == "") {
      swal("Please enter comments")
      return false;
    }
    // if (sessionStorage.getItem('sessionFor_receiptCheque') == "receiptCheque") {

    //   this.chequeDepositedDate_Milliseconds = new Date($("#ChequeDepositedDateID").val()).getTime();
    // } else {
    //   this.chequeDepositedDate_Milliseconds = null;
    // }



    // if (sessionStorage.getItem('sessionFor_receiptCheque') == "receiptCheque") {

    //   this.chequeDepositedDate_Milliseconds = new Date($("#ChequeDepositedDateID").val()).getTime();
    // } else {
    //   this.chequeDepositedDate_Milliseconds = null;
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


      if (this.modificationChargeInvoiceNo == "") {
        this.modificationChargeInvoiceNo = null;
      }

      if (this.legalChargeInvoiceNo == "") {
        this.legalChargeInvoiceNo = null;
      }


      if (this.carparkingInvoiceNumber == undefined) {
        this.carparkingInvoiceNumber = null;
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
        "transactionTypeId": 1,
        "transactionModeId": 6,
        "transactionTypeName": "Receipt",
        "transactionModeName": "TDS",
        "chequeNumber": "" + $('#ChequeNumber').val(),
        "transactionAmount": $("#ChequeAmount").val(),
        //  "challanReflectionDate": new Date($("#reflectionDate").val()).getTime(),
        "challanNo": $("#ChequeNumber").val(),
        "bsrNo": $("#bsrNumber").val(),
        "ackNo": $("#ackNumber").val(),
        "transactionDate": new Date($("#ChequeDate").val()).getTime(),
        "flatIds": this.flatID, // [1087],
        "bookingFormId": "" + this.bookingFormID,
        "finTransactionNo": this.transactionID,
        "transactionEntryId": this.viewTransactionResponse.transactionEntryId,
        "transactionSetOffEntryId": this.transSetOffEntryId,
        "paymentSetOffDetails": [{ "setOffTypeName": "Principal_Amount", "amount": $("#PrincipalAmount").val() }],
        "buttonType": rejectAndModify
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
          swal(resp.errors[0]);
        }
      },
        error => {
          $('.page-loader-wrapper').hide();
          // var error = JSON.parse(error._body).responseCode;
          if (error == 440) {
            swal("Your Session has been Timed Out!", "Please login once again.", "error");
            this.router.navigate([""]);
          }
        }
      );

    } else { }

  }
  /*--------------------------Reject MIS Receipt Cheque End------------------*/

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

  /*--------------------------disableEnableEditableFields start------------------*/

  disableEnableEditableFields(condition) {
    $("#ChequeNumber").prop('disabled', condition);
    $("#ChequeDate").prop('disabled', condition);
    $("#ChequeAmount").prop('disabled', condition);
    $("#bankNameID").prop('disabled', condition);
    $("#receivedDateID").prop('disabled', condition);
    $('#PrincipalAmount').prop('disabled', condition);
    $('#InterstAmount').prop('disabled', condition);
    $('#ModificationCharges').prop('disabled', condition);
    $('#LeagalCharges').prop('disabled', condition);
    // $('#CorpusFund').prop('disabled', condition);
    // $('#MaintinaceCharges').prop('disabled', condition);
    $('#refundableAdvanceID').prop('disabled', condition);
    $("#TdsAmount").prop('disabled', condition);
    $("#carparkingcost").prop('disabled', condition);
  }

  /*--------------------------disableEnableEditableFields end------------------*/

  /*--------------------------Modify Mis Receipt Cheque start------------------*/

  // modifyMisReceiptCheque(){
  //   $("#ChequeNumber").prop('disabled', false);
  //   $("#ChequeDate").prop('disabled', false);
  //   $("#ChequeAmount").prop('disabled', false);
  //   $("#bankNameID").prop('disabled', false);
  //   $("#receivedDateID").prop('disabled', false);
  //   $('#PrincipalAmount').prop('disabled', false);
  //   $('#InterstAmount').prop('disabled', false);
  //   $('#ModificationCharges').prop('disabled', false);
  //   $('#LeagalCharges').prop('disabled', false);
  // }

  /*--------------------------Modify Mis Receipt Cheque end------------------*/


  homeClick() {
    // this.router.navigate(['leave-update']);
    this.router.navigate(['dashboard']);
  }

  redirectToPenidng() {
    if (this.operationType == 'approveTransaction') {
      this.router.navigate(['View-Pending-Transactions']);
    } else if (this.operationType == 'transactionStatus') {
      this.router.navigate(['View-Pending-Transactions-Status']);
    } else if (this.operationType == 'loadCompletedTransaction') {
      this.router.navigate(['View-Completed-Transactions']);
    } else { }
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

    var d = new Date(this.transactionDate);
    var transactionDate = d.toJSON().split('T')[0];
    var date = new Date(this.transactionReceiveDate);
    var transactionRecDate = date.toJSON().split('T')[0];
    var date1 = new Date(this.actualTransactionReceiveDate);
    var actualTransactionRecDate = date1.toJSON().split('T')[0];

    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/deleteFinancialTransaction.spring";
    console.log(url)
    let headers = new Headers({ 'Content-Type': 'application/json' });

    var body = {


      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteId": "" + this.siteID,
      "siteName": "" + this.projectName,
      "transactionTypeId": 1,
      "transactionModeId": 6,
      "transactionTypeName": "Receipt",
      "transactionModeName": "TDS",
      "transactionAmount": $("#ChequeAmount").val(),
      // "transactionReceiveDate": new Date($("#ChequeRecDate").val()).getTime(),
      // "challanReflectionDate": new Date($("#reflectionDate").val()).getTime(),
      "challanNo": $("#ChequeNumber").val(),
      "bsrNo": $("#bsrNumber").val(),
      "ackNo": $("#ackNumber").val(),
      "transactionDate": new Date($("#ChequeDate").val()).getTime(),
      "flatIds": this.flatID, // [1087],
      "actualFlatIds": [this.actualFlatIds],
      "actualFlatNos": [this.flat_No],
      "actualBookingFormId": JSON.stringify(this.actualBookingFormId),
      "bookingFormId": "" + this.bookingFormID,
      "finTransactionNo": this.transactionID,
      "transactionEntryId": this.viewTransactionResponse.transactionEntryId,
      "transactionSetOffEntryId": this.transSetOffEntryId,
      "isRecievedDateORSetOffChanged": "false",
      "paymentSetOff": "true",
      "paymentSetOffDetails": [{ "setOffTypeName": "Principal_Amount", "amount": $("#PrincipalAmount").val() }],
      "operationType": "Modify",
      "prevTransactionEntryId": this.transactionEntryId,
      "comment": $("#CrmCommentsId").val(),
      "fileInfos": this.tempfileInfo,
      "deleteFileInfos": this.deleteArray,
      "buttonType": "Delete",
      "actionUrl": "Delete_Transaction",

    }

    console.log(JSON.stringify(body))

    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      console.log(JSON.stringify(resp))
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        if (this.headtitlee == 'View Customer Data') {

          swal("Transaction delete successfully");
          this.router.navigateByUrl('shortcut-components')
        } else {
          swal("Transaction delete successfully");
          this.router.navigateByUrl('modify-transaction')
        }



      } else if (resp.responseCode == 440) {
        $('.page-loader-wrapper').hide();
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        $('.page-loader-wrapper').hide();
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

  attachmentlink(link) {

    window.open(link, '_system', 'location=yes,closebuttoncaption=Fechar,enableViewportScale=no');

  }

  paidbynamefun(event) {
    if (event.target.value !== "" && event.target.value !== "0") {
      $("#paidbyname").prop("disabled", false);
    } else {
      $("#paidbyname").prop("disabled", true);
      $("#paidbyname").val("select");
      $("#paidbyname").trigger('change');

    }
  }

  carparkingInvoice(event: any) {
    $("#CarparkingInvoiceId").attr("disabled", false);
  }

  editSubmit() {

    if ($("#ChequeNumber").val() == "") {
      swal("Please enter challan number");
      $('#ChequeNumber').focus();
      return false;
    }

    if (($("#ChequeNumber").val()).length < 5) {
      swal("Challan number should be more than 4 digits");
      $('#ChequeNumber').focus();
      return false;
    }

    if ($("#ChequeDate").val() == "") {
      swal("Please select challan date");
      // $('#ChequeDate').focus();
      return false;
    }

    if ($("#ChequeAmount").val() == "") {
      swal("Please enter challan amount");
      $('#ChequeAmount').focus();
      return false;
    }

    if ($("#receivedDateID").val() == "") {
      swal("Please select challan received date");
      //$('#ChequeRecDate').focus();
      return false;
    }
    // if ($("#reflectionDate").val() == "") {
    //   swal("Please select reflection date");
    //   //$('#ChequeRecDate').focus();
    //   return false;
    // }



    if (($("#PrincipalAmount").val() == "0")) {
      swal("Please enter Principle amount");
      return false;
    }




    if ((Number($('#PrincipalAmount').val())) > Number($('#ChequeAmount').val())) {

      swal("Payment Setoff should be equal to Cheque amount");
      return false
    }

    if ((Number($('#PrincipalAmount').val())) < Number($('#ChequeAmount').val())) {

      swal("Payment Setoff should be equal to Cheque amount");
      return false
    }


    // if (this.urls.length == 0) {
    //   swal("Please select attachment");
    //   return false;
    // }
    if (this.filename == undefined) {
      this.tempfileInfo = [];

    } else {
      // this.tempfileInfo = [{
      //   "extension": this.filename_extension,
      //   "name": this.filename,
      //   "base64": base64textString
      // }]

      console.log(this.tempfileInfo);
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


      for (var i = 0; i < this.bindingFileInfo.length; i++) {
        this.tempfileInfo.push({
          "extension": this.bindingFileInfo[i].extension,
          "name": this.bindingFileInfo[i].name,
          "filePath": this.bindingFileInfo[i].filePath,
          "url": this.bindingFileInfo[i].url
        });


      }


      $('.page-loader-wrapper').show();

      let url = this.cmn.commonUrl + "financial/approveOrRejectMisReceiptOrPayment.spring";
      console.log(url);
      // http://localhost:8888/SumadhuraGateway/employeeservice/financial/editFinancialTransaction.spring
      let headers = new Headers({ 'Content-Type': 'application/json' });
      //let options = new RequestOptions({ headers: headers }); 

      console.log( this.finTransactionSetOffId);

      var body = {


        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "siteId": "" + this.siteID,
        "siteName": "" + this.projectName,
        "transactionTypeId": 1,
        "transactionModeId": 6,
        "transactionTypeName": "Receipt",
        "transactionModeName": "TDS",
        "transactionAmount": $("#ChequeAmount").val(),
        "transactionReceiveDate": new Date($("#ChequeDate").val()).getTime(),
         //"challanReflectionDate": new Date($("#reflectionDate").val()).getTime(),
        "challanNo": $("#ChequeNumber").val(),
        "bsrCode": $("#bsrNumber").val(),
        "ackNo": $("#ackNumber").val(),
        "transactionDate": new Date($("#ChequeDate").val()).getTime(),
        "flatIds": this.flatID, // [1087],
        "actualFlatIds": [this.actualFlatIds],
        "actualFlatNos": [this.flat_No],
        "actualBookingFormId": JSON.stringify(this.actualBookingFormId),
        "bookingFormId": "" + this.bookingFormID,
        "finTransactionNo": this.transactionID,
        "transactionEntryId": this.viewTransactionResponse.transactionEntryId,
        "transactionSetOffEntryId": this.transSetOffEntryId,
        "isRecievedDateORSetOffChanged": "false",
        "paymentSetOff": "true",
        "paymentSetOffDetails": [
          {
            "finTransactionSetOffId": this.finTransactionSetOffId,
             "setOffTypeName": "Principal_Amount", 
             "amount": $("#PrincipalAmount").val()
         }],
        "buttonType": "Approve",
        "operationType": "Modify",
        "prevTransactionEntryId": this.transactionEntryId,
        //"transactionEntryId": JSON.stringify(this.transactionEntryId),
        // "comments": [{ "CUSTOMER": $("#CustomerCommentsId").val() }],
        // "comment": $("#CrmCommentsId").val(),

        "comment": "" + $('#CustomerCommentsId').val(),
        "fileInfos": this.tempfileInfo,
        "deleteFileInfos": this.deleteArray

      }

      console.log(url);
      console.log(JSON.stringify(body));
    
      this.http.post(url, body).map(res => res.json()).subscribe(resp => {

        console.log(JSON.stringify(resp));

        $('.page-loader-wrapper').hide();

        if (resp.responseCode == 200) {
          if (this.headtitlee == 'View Customer Data') {
            this.router.navigate(['shortcut-components']);
            swal("Your transaction sent successfully !!");
          } else {
            this.router.navigate(['modify-transaction']);
            swal("Your transaction sent successfully !!");
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
          // var error = JSON.parse(error._body).responseCode;
          if (error == 440) {
            swal("Your Session has been Timed Out!", "Please login once again.", "error");
            this.router.navigate([""]);
          }
        }
      );
    } else { }
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
      this.filename_extension == "jpeg" || this.filename_extension == "JPEG" || this.filename_extension == "pdf" ||
      this.filename_extension == "PDF") {

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

  backfun() {

  }

  backfun2() {
    this.router.navigate(["/shortcut-components"]);

  }
}
