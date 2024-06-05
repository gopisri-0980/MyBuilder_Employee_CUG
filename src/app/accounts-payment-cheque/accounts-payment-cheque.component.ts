import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
declare const $: any;
declare const swal: any;

var selectbankNameValue;
var selectbanknametext;
var otherscomment;
var checkbouncereasonval;
var carparkingLocationname;
@Component({
  selector: 'app-accounts-payment-cheque',
  templateUrl: './accounts-payment-cheque.component.html',
  styleUrls: ['./accounts-payment-cheque.component.css']
})
export class AccountsPaymentChequeComponent implements OnInit {
  customerName: any;
  customerPropertyDetails: any;
  projectName: any;
  blockNumber: any;
  flatNumber: any;
  finTransactionEntryDetails: any;
  bankName: any;
  bankID: any;
  payableAmount: any;
  attachedFiles: any;
  location: string;
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
  transactionDate: any;
  transactionAmount: any;
  paymentMode: any;
  referenceNum: any;
  finBokAccInvoiceNo: any;
  transactionReceiveDate: any;
  transReceiveFormat: string;
  chequeNum: any;
  chequeDate: any;
  chequeDateFormat: string;
  chequeAmount: any;
  transactionFor: any;
  reasonAndCustomerComments: any;
  metadataName: any;
  reasonCustomerComments: any;
  reason: any;
  operationType: any;
  pathName: string;
  refundableAdvance: any;
  cancellationCharges: any;
  docListArray: any;
  setOffID: any;
  principleAmountSetOffId: any;
  InterestSetOffId: any;
  modificationChargesSetOffId: any;
  LegalChargesSetOffId: any;
  transaction_Date: string;
  chequeDate_Milliseconds: number;
  siteAccountId: any;
  transactionForId: any;
  transactionReceiptNo: any;
  RefundableChargesSetOffId: any;
  FlatCancellationChargesSetOffId: any;
  refundForMilestone: string;
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
  transactionStatusNameval: any;
  documentLocation: any;
  sourceOfFunds: any;
  paidByName: any;
  deptid: any;
  roleid: any;
  bindingbankname: any;
  bindingbankid: any;
  handoverdate: any;
  handoverDateFormat: string;
  finTransactionSetOffId: any;
  cheque_DepositedDate: any;

  CorpusFund: any;
  MaintinaceCharges: any;
  FlatKhataBifurcation: any;
  requesturl: string;
  finTransactionSetOffId_maintanance: any;
  finTransactionSetOffId_corpus: any;
  finTransactionSetOffId_flatkhata: any;
  CorpusFund_amount: any;
  carparkingChargesSetOffId: any;
  carparkingInvoiceID: any;
  carparkingInvoiceNumber: any;
  carparkingcost_amount: any;
  transferMode: any;
  carparkingLocationname: any;
  carparkingInvoiceID_binding: any;
  Assignment_ChargesSetOffId: any;
  Assignment_tranfer_InvoiceID: any;
  AssignmentInvoiceNumber: any;
  AssignmentLocationname: any;

  Assignment_transfer_amount: any;
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

    console.log("------------payment Initiate :" + JSON.stringify(json_response))
    this.viewTransactionResponse = json_response;
    this.controller = this.viewTransactionResponse;
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
    this.getMisPaymentChequeData();
    this.paymentModeList();
  }

  ngOnInit() {

    if (this.operationType == 'approveTransaction') {
      this.pathName = "View Pending Transactions for Approval";
      // alert(this.deptid)
      if (this.deptid == 997) {
        this.disableEnableEditableFields(true);
        $("#ChequeNumber").prop('disabled', true);
        $("#ChequeDate").prop('disabled', true);
        $("#ChequehandoverDate").prop('disabled', true);
      } else if (this.deptid == 995) {
        this.disableEnableEditableFields(true);
        $(function () {
          $("#ChequehandoverDate").prop('disabled', false);
        })

      } else {
        this.disableEnableEditableFields(false);
      }

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
      $("#Assignment_transfer_fee").val(0);


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


      var date = new Date().getMonth();
      var minimumdate = new Date().setMonth(date - 3);
      var maximumdate = new Date().setMonth(date + 3);
      $('#ChequeDate').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
        minDate: new Date(minimumdate),
        maxDate: new Date(),
        clearButton: true,
        weekStart: 1,
        time: false,
      });
      $('#ChequehandoverDate').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
        //  minDate: new Date(minimumdate),
        // maxDate: new Date(),
        clearButton: true,
        weekStart: 1,
        time: false,
      });

      // $("#Sourcefound").select2({
      //   placeholder: "Source of funds",
      //   dir: "ltl"
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

      $("#PaymentModeID").select2({
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
    //let options = new RequestOptions({ headers: headers });

    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "condition": "fecthAllData"
    }

    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      console.log("============" + JSON.stringify(resp))
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#bankNameID').html('');
        $('#bankNameID').append('<option value="select">--Select--</option>');

        for (var i = 0; i < resp.responseObjList.finBankResponseList.length; i++) {
          $('#bankNameID').append("<option value='" + resp.responseObjList.finBankResponseList[i].finBankId + "'>" + resp.responseObjList.finBankResponseList[i].bankName + "</option>");
          $('#bankNameID').val(this.bankID);
        }

        // $('#Sourcefound').html("<option value='" + this.sourceOfFunds + "'>" + this.sourceOfFunds + "</option>");
        // $("#Sourcefound").val(this.sourceOfFunds);


        // $('#paidbyname').html("<option value='" + this.paidByName + "'>" + this.paidByName + "</option>");
        // $("#paidbyname").val(this.paidByName);
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

  /*--------------------------Mis Payment Cheque data start------------------*/
  getMisPaymentChequeData() {
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

        this.bankNamesList();
        this.lastTransactionEditedDate = resp.responseObjList.lastTransactionEditedDate;
        this.lastTransactionEditedBy = resp.responseObjList.lastTransactionEditedBy;
        this.customerPropertyDetails = resp.responseObjList.customerPropertyDetailsInfoList[0];
        this.projectName = this.customerPropertyDetails.siteName;
        this.blockNumber = this.customerPropertyDetails.blockName;
        this.flatNumber = this.customerPropertyDetails.flatNo;
        this.flatID.push(this.customerPropertyDetails.flatId);
        this.siteID = this.customerPropertyDetails.siteId;

        this.transferMode = resp.responseObjList.transferMode;



        this.finTransactionEntryDetails = resp.responseObjList.finTransactionEntryDetailsResponseList[0];
        this.transactionType = this.viewTransactionResponse.transactionTypeName;
        this.transactionID = this.finTransactionEntryDetails.finTransactionNo;
        this.transactionReceiptNo = this.finTransactionEntryDetails.transactionReceiptNo;
        this.transactionFor = this.finTransactionEntryDetails.transactionFor;
        this.transactionForId = this.finTransactionEntryDetails.transactionForId;


        this.documentLocation = this.finTransactionEntryDetails.transactionReceiptDocResponsesList;



        if (this.operationType == 'approveTransaction' && this.transactionForId == "2") {
          this.refundForMilestone = "true";
          $('#cancellationChargesID').prop('disabled', false);
        } else {
          this.refundForMilestone = "false";
          $('#cancellationChargesID').prop('disabled', true);
        }
        this.transSetOffEntryId = this.finTransactionEntryDetails.transactionSetOffEntryId;
        this.bookingFormID = this.finTransactionEntryDetails.bookingFormId;
        this.siteAccountId = this.finTransactionEntryDetails.siteAccountId;

        console.log(this.bookingFormID);

        this.getPendingAndInterestAmount(this.bookingFormID);

        this.chequeNum = this.finTransactionEntryDetails.chequeNumber;
        $('#ChequeNumber').val(this.chequeNum);

        //  this.chequeDate = this.finTransactionEntryDetails.chequeDate;
        //  var chequeDate = new Date(this.chequeDate).toLocaleDateString(); 
        //  this.chequeDateFormat = chequeDate.split('/')[1]+"-"+chequeDate.split('/')[0]+"-"+chequeDate.split('/')[2];
        //  $('#ChequeDate').val(this.chequeDateFormat);

        this.chequeDate = this.finTransactionEntryDetails.chequeDate;
        if (this.chequeDate == null) {

        } else {
          var chequeDate = new Date(this.chequeDate);
          var year = chequeDate.getFullYear();
          var month = ("0" + (chequeDate.getMonth() + 1)).slice(-2);
          var day = ("0" + chequeDate.getDate()).slice(-2);
          this.chequeDateFormat = year + "-" + month + "-" + day;
          $('#ChequeDate').val(this.chequeDateFormat);
        }
        this.handoverdate = this.finTransactionEntryDetails.chequeHandoverDate;

        if (this.handoverdate == null) {

        } else {
          var ChequehandoverDate = new Date(this.handoverdate);
          var year = ChequehandoverDate.getFullYear();
          var month = ("0" + (ChequehandoverDate.getMonth() + 1)).slice(-2);
          var day = ("0" + ChequehandoverDate.getDate()).slice(-2);
          this.handoverDateFormat = year + "-" + month + "-" + day;
          $('#ChequehandoverDate').val(this.handoverDateFormat);
        }

        this.chequeAmount = this.finTransactionEntryDetails.transactionAmount;
        $('#ChequeAmount').val(this.chequeAmount);

        this.paymentMode = this.finTransactionEntryDetails.transferMode;
        $('#paymentModeID').val(this.paymentMode);

        this.transactionAmount = this.finTransactionEntryDetails.transactionAmount;
        $('#transactionAmountID').val(this.transactionAmount);

        this.bankName = this.finTransactionEntryDetails.bankName;
        this.bankID = this.finTransactionEntryDetails.finBankId;

        // this.transactionReceiveDate = this.finTransactionEntryDetails.transactionReceiveDate;
        // var transRceiveDate = new Date(this.transactionReceiveDate).toLocaleDateString();
        // this.transReceiveFormat = transRceiveDate.split('/')[1]+"-"+transRceiveDate.split('/')[0]+"-"+transRceiveDate.split('/')[2];
        // $('#transactionDateID').val(this.transReceiveFormat);

        this.payableAmount = this.finTransactionEntryDetails.payableAmount;
        $('#PayableAmount').val(this.payableAmount);

        this.docListArray = resp.responseObjList.finTransactionEntryDetailsResponseList[0].transactionEntryDocResponsesList

        //   this.sourceOfFunds = resp.responseObjList.finTransactionEntryDetailsResponseList[0].sourceOfFunds;
        //  this.attachedFiles = this.finTransactionEntryDetails.docName
        //  this.location = this.finTransactionEntryDetails.location;
        this.companyBankAccountNo = this.finTransactionEntryDetails.siteBankAccountNumber;
        //  $('#bankAccNoID').val(this.companyBankAccountNo);

        this.previousCRMComments = this.finTransactionEntryDetails.finTransactionApprStatResponseList;
        this.SetOffResponseList = resp.responseObjList.finTransactionEntryDetailsResponseList[0].finTransactionSetOffResponseList;
        this.cheque_DepositedDate = this.finTransactionEntryDetails.chequeDepositedDate;
        // alert(this.cheque_DepositedDate)
        var d = new Date(this.cheque_DepositedDate);

        var datestring = d.getFullYear() + "/" + ("0" + (d.getMonth() + 1)).slice(-2) + "/" + ("0" + d.getDate()).slice(-2);
        $('#ChequeClearanceDateID').bootstrapMaterialDatePicker({
          format: 'YYYY-MM-DD',
          minDate: new Date(datestring),
          maxDate: new Date(),
          clearButton: true,
          weekStart: 1,
          time: false
        });
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
            console.log(this.finTransactionSetOffId_maintanance);
            $("#MaintinaceCharges").val(this.setOffAmount);

          } else if (this.setOffTypeName == "Corpus_Fund") {
            this.finTransactionSetOffId_corpus = this.SetOffResponseList[i].finTransactionSetOffId;
            console.log(this.finTransactionSetOffId_corpus);
            $("#CorpusFund").val(this.setOffAmount);

          } else if (this.setOffTypeName == "Individual_Flat_Khata_bifurcation_and_other_charges") {
            this.finTransactionSetOffId_flatkhata = this.SetOffResponseList[i].finTransactionSetOffId;
            console.log(this.finTransactionSetOffId_flatkhata);
            $("#FlatKhataBifurcation").val(this.setOffAmount);
          } else if (this.setOffTypeName == "CAR_PARKING_COST") {
            this.carparkingChargesSetOffId = this.setOffID;
            $('#carparkingcost').val(this.setOffAmount);

            this.carparkingInvoiceID_binding = this.SetOffResponseList[i].finBokAccInvoiceNo;
          } else if (this.setOffTypeName == "ASSIGNMENT_TRANSFER_FEE") {
            this.Assignment_ChargesSetOffId = this.setOffID;
            $('#Assignment_transfer_fee').val(this.setOffAmount);
            this.Assignment_tranfer_InvoiceID = this.SetOffResponseList[i].finBokAccInvoiceNo;
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

        this.reasonAndCustomerComments = resp.responseObjList.finTransactionEntryDetailsResponseList[0].finTransactionCommentsResponseList;
        for (let i = 0; i < this.reasonAndCustomerComments.length; i++) {
          this.metadataName = this.reasonAndCustomerComments[i].metadataName;
          this.reasonCustomerComments = this.reasonAndCustomerComments[i].comments;
          if (this.metadataName == "CANCEL_REASON") {
            this.reason = this.reasonCustomerComments;
            // $('#reasonId').val(this.reason);
          } else if (this.metadataName == "CUSTOMER") {
            this.customerComments = this.reasonCustomerComments;
          }
        }
        this.modification_legalInvoiceList();

        // this.customerComments = this.finTransactionEntryDetails.finTransactionCommentsResponseList[0].comments;


      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        $('.page-loader-wrapper').hide();
        // swal(resp.errors[0]);
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

  /*-----------------get Pending And Interest Amount Start---------------------*/
  getPendingAndInterestAmount(bookingid) {

    if (this.transactionStatusNameval == "Transaction Completed") {
      this.requesturl = "CompletedTransaction";
    } else {
      this.requesturl = "CompletedTransaction";
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
      "transactionEntryId": "" + this.transactionForId,
      "transactionTypeName": "" + this.viewTransactionResponse.transactionTypeName,
      "transactionModeName": "" + this.viewTransactionResponse.transactionModeName,
      "transactionFor": "" + this.transactionFor,
      "requestUrl": this.requesturl,
      "bookingFormId": this.viewTransactionResponse.bookingFormId,
      "buttonType": "initiatepayemt",
      "transferModeName": this.transferMode,
      "transferModeId": "1",
      "condition": "CRM_COMMENTS",
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

        for (var i = 0; i < resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList.length; i++) {
          console.log(resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].metadataName);

          this.setOffTypeName = resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].metadataName;
          if (this.setOffTypeName == "CAR_PARKING_COST") {

            // $('#carparkingcost').val(this.setOffAmount);

            console.log(this.carparkingInvoiceID_binding);

            if (resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo == this.carparkingInvoiceID_binding) {
              this.carparkingInvoiceID = resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo;

              console.log(this.carparkingInvoiceID);
              this.carparkingLocationname = resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].documentLocation;
            }





          }
          else if (this.setOffTypeName == "ASSIGNMENT_TRANSFER_FEE") {

            $('#Assignment_InvoiceID').append("<option value='" + resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo + "'>" + resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo + "</option>");

            if (resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo == this.Assignment_tranfer_InvoiceID) {
              this.AssignmentInvoiceNumber = resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo;
              this.AssignmentLocationname = resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].documentLocation;
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

  /*-----------------get Pending And Interest Amount end---------------------*/

  /*-------------------------View file  start---------------------------*/
  viewFiles(location) {
    // window.open(location);
    window.open(location, '_system', 'location=yes,closebuttoncaption=Fechar,enableViewportScale=no');
  }
  /*-------------------------View file end---------------------------*/

  /*-----Getting modification and legal invoices list start------------*/
  modification_legalInvoiceList() {

    if (this.transactionStatusNameval == "Transaction Completed") {
      this.requesturl = "CompletedTransaction";
    } else {
      this.requesturl = "approveTransaction";
    }

    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/getExcessAmountDetailsForRefund.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "bookingFormId": this.bookingFormID,
      "transactionTypeId": "" + this.viewTransactionResponse.transactionTypeId,
      "transactionModeId": "" + this.viewTransactionResponse.transactionModeId,
      "transactionForId": "" + this.transactionForId,
      "transactionTypeName": "" + this.viewTransactionResponse.transactionTypeName,
      "transactionModeName": "" + this.viewTransactionResponse.transactionModeName,
      "transactionFor": "" + this.transactionFor,
      "requestUrl": this.requesturl,
    }

    console.log(url);
    console.log(JSON.stringify(body));


    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      console.log(JSON.stringify(resp));

      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        for (var i = 0; i < resp.responseObjList.length; i++) {
          this.setOffTypeName = resp.responseObjList[i].metadataName;
          if (this.setOffTypeName == "MODIFICATION_COST") {
            $('#ModificationInvoiceId').append("<option value='" + resp.responseObjList[i].finBokAccInvoiceNo + "'>" + resp.responseObjList[i].finBokAccInvoiceNo + "</option>");
            $('#ModificationInvoiceId').val(this.modificationChargeInvoiceNo);
          } else if (this.setOffTypeName == "LEGAL_COST") {
            $('#LegalInvoiceId').append("<option value='" + resp.responseObjList[i].finBokAccInvoiceNo + "'>" + resp.responseObjList[i].finBokAccInvoiceNo + "</option>");
            $('#LegalInvoiceId').val(this.legalChargeInvoiceNo);
          } else if (this.setOffTypeName == "CAR_PARKING_COST") {
            $('#carparkingInvoiceId').append("<option value='" + resp.responseObjList[i].finBokAccInvoiceNo + "'>" + resp.responseObjList[i].finBokAccInvoiceNo + "</option>");

            if (resp.responseObjList[i].finBokAccInvoiceNo == this.carparkingInvoiceID_binding) {
              this.carparkingInvoiceID_binding = resp.responseObjList[i].finBokAccInvoiceNo;
              carparkingLocationname = resp.responseObjList[i].documentLocation;
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

  /*--------------------------Approve MIS Payment Cheque start------------------*/
  approveMisPaymentCheque(approve) {



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


    if (this.transactionModeName == "Cheque") {
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


      if (this.deptid == 995) {
        if ($("#ChequehandoverDate").val() == "") {
          swal("Please select cheque hand over date");
          // $('#ChequeDate').focus();
          return false;
        }
      }

    } else {
      if (($("#ChequeNumber").val()).length < 6) {
        swal("Reference number should be more than 5 digits");
        $('#ChequeNumber').focus();
        return false;
      }

      if ($("#ChequeDate").val() == "") {
        swal("Please select clearence/paid date");
        // $('#ChequeDate').focus();
        return false;
      }

      if ($("#PaymentModeID").val() == "select") {
        swal("Please select payment mode");
        // $('#ChequeDate').focus();
        return false;
      }


    }

    // if ($("#ChequeAmount").val() == "") {
    //   swal("Please enter amount");
    //   $('#ChequeAmount').focus();
    //   return false;
    // }

    // if ($("#CancelreasonId").val() == "") {
    //   swal("Please enter reason");
    //   $('#PayableAmount').focus();
    //   return false;
    // }



    // if ($("#bank_type").val() == "2") {
    //   swal("Please select customer bank name");
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



    if (this.transactionModeName == "Cheque") {
      this.handoverdate = new Date($("#ChequehandoverDate").val()).getTime()
      //alert(this.handoverdate)
      if (Number.isNaN(this.handoverdate)) {
        this.handoverdate = null;
      } else {
        this.handoverdate = new Date($("#ChequehandoverDate").val()).getTime()
      }
      // if(this.deptid==995){
      //   this.handoverdate = new Date($("#ChequehandoverDate").val()).getTime()
      // }else{
      //   this.handoverdate = null;
      // }

    } else {
      this.handoverdate = null;
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


      if ($("#carparkingcost").val() == undefined || $("#carparkingcost").val() == "") {
        this.carparkingcost_amount = 0;
      } else {
        this.carparkingcost_amount = $("#carparkingcost").val();
      }


      if (this.carparkingInvoiceID_binding == undefined) {
        this.carparkingInvoiceID_binding = null;
      }

      if (this.carparkingChargesSetOffId == undefined) {
        this.carparkingChargesSetOffId = 0;
      }

      if (this.Assignment_ChargesSetOffId == undefined) {
        this.Assignment_ChargesSetOffId = 0;
      }


      $('.page-loader-wrapper').show();

      let url = this.cmn.commonUrl + "financial/approveOrRejectMisReceiptOrPayment.spring";

      let headers = new Headers({ 'Content-Type': 'application/json' });
      //let options = new RequestOptions({ headers: headers }); 
      var body;
      if (this.transactionModeName == "Cheque") {
        body = {
          "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
          "siteId": "" + this.siteID,
          "siteName": "" + this.projectName,
          "transactionTypeId": "" + this.viewTransactionResponse.transactionTypeId,
          "transactionModeId": "" + this.viewTransactionResponse.transactionModeId,
          "transactionForId": this.transactionForId,
          "transactionTypeName": "" + this.viewTransactionResponse.transactionTypeName,
          "transactionModeName": "" + this.viewTransactionResponse.transactionModeName,
          "transactionFor": "" + this.transactionFor,
          "chequeNumber": "" + $('#ChequeNumber').val(),
          "transactionDate": "" + new Date($("#ChequeDate").val()).getTime(), //"2019-06-21",
          "transactionAmount": "" + $('#ChequeAmount').val(),
          "flatIds": this.flatID, // [1087],
          "bookingFormId": "" + this.bookingFormID,
          "bankId": this.bindingbankid,
          "bankName": this.bindingbankname,
          "siteAccountId": "" + this.siteAccountId,
          "siteBankAccountNumber": "" + this.companyBankAccountNo, //"10000111101",
          "paymentSetOff": "true",
          //"sourceOfFunds": $("#Sourcefound").val(),
          "chequeHandoverDate": this.handoverdate,
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
              "invoiceNo": $("#ModificationInvoiceId").val(),
              "refundFromMileStone": this.refundForMilestone
            },
            {
              "finTransactionSetOffId": "" + this.LegalChargesSetOffId, //"1",
              "setOffTypeName": "LEGAL_COST",
              "amount": $('#LeagalCharges').val(), //this.legalAmount,  //"0",
              "invoiceNo": $("#LegalInvoiceId").val(),
              "refundFromMileStone": this.refundForMilestone
            },


            {
              "finTransactionSetOffId": "" + this.carparkingChargesSetOffId,
              "setOffTypeName": "Car_Parking_Cost",
              "amount": $("#carparkingcost").val(),
              "invoiceNo": this.carparkingInvoiceID_binding,
              "refundFromMileStone": this.refundForMilestone
            },

            , {
              "finTransactionSetOffId": "0",
              "setOffTypeName": "Assignment_Transfer_Fee",
              "amount": $("#Assignment_transfer_fee").val(),
              "invoiceNo": this.Assignment_tranfer_InvoiceID,
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
          ],
          "transactionEntryId": "" + this.viewTransactionResponse.transactionEntryId,
          "transactionSetOffEntryId": +this.transSetOffEntryId,
          "buttonType": approve,
          "comment": "" + $('#CustomerCommentsId').val(),
          "transactionReceiptNo": "" + this.transactionReceiptNo // "SIPL/2020-2021/Sumadhura Soham/262"
        }
      } else {
        body = {
          "transferModeId": $("#PaymentModeID").val(),
          "transferModeName": $("#PaymentModeID").select2('data')[0].text,
          "referenceNo": $('#ChequeNumber').val(),
          "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
          "siteId": "" + this.siteID,
          "siteName": "" + this.projectName,
          "transactionTypeId": "" + this.viewTransactionResponse.transactionTypeId,
          "transactionModeId": "" + this.viewTransactionResponse.transactionModeId,
          "transactionForId": this.transactionForId,
          "transactionTypeName": "" + this.viewTransactionResponse.transactionTypeName,
          "transactionModeName": "" + this.viewTransactionResponse.transactionModeName,
          "transactionFor": "" + this.transactionFor,
          "chequeNumber": "" + $('#ChequeNumber').val(),
          "transactionDate": "" + new Date($("#ChequeDate").val()).getTime(), //"2019-06-21",
          "transactionAmount": "" + $('#ChequeAmount').val(),
          "flatIds": this.flatID, // [1087],
          "bookingFormId": "" + this.bookingFormID,
          "bankId": this.bindingbankid,
          "bankName": this.bindingbankname,
          "siteAccountId": "" + this.siteAccountId,
          "siteBankAccountNumber": "" + this.companyBankAccountNo, //"10000111101",
          "paymentSetOff": "true",
          //"sourceOfFunds": $("#Sourcefound").val(),
          "chequeHandoverDate": this.handoverdate,
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
              "invoiceNo": $("#ModificationInvoiceId").val(),
              "refundFromMileStone": this.refundForMilestone
            },
            {
              "finTransactionSetOffId": "" + this.LegalChargesSetOffId, //"1",
              "setOffTypeName": "LEGAL_COST",
              "amount": $('#LeagalCharges').val(), //this.legalAmount,  //"0",
              "invoiceNo": $("#LegalInvoiceId").val(),
              "refundFromMileStone": this.refundForMilestone
            },

            {
              "finTransactionSetOffId": "" + this.carparkingChargesSetOffId,
              "setOffTypeName": "Car_Parking_Cost",
              "amount": $("#carparkingcost").val(),
              "invoiceNo": this.carparkingInvoiceID_binding,
              "refundFromMileStone": this.refundForMilestone
            },

            {
              "finTransactionSetOffId": "" + this.Assignment_ChargesSetOffId,
              "setOffTypeName": "Assignment_Transfer_Fee",
              "amount": $("#Assignment_transfer_fee").val(),
              "invoiceNo": this.Assignment_tranfer_InvoiceID,
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
          ],
          "transactionEntryId": "" + this.viewTransactionResponse.transactionEntryId,
          "transactionSetOffEntryId": +this.transSetOffEntryId,
          "buttonType": approve,
          "comment": "" + $('#CustomerCommentsId').val(),
          "transactionReceiptNo": "" + this.transactionReceiptNo // "SIPL/2020-2021/Sumadhura Soham/262"
        }

      }



      console.log(JSON.stringify(body));



      this.http.post(url, body).map(res => res.json()).subscribe(resp => {

        $('.page-loader-wrapper').hide();
        if (resp.responseCode == 200) {
          this.router.navigate(['View-Pending-Transactions']);
          swal("Your transaction got approved sucessfully !!");
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
          // var error = JSON.parse(error._body).responseCode;
          if (error == 440) {
            swal("Your Session has been Timed Out!", "Please login once again.", "error");
            this.router.navigate([""]);
          }
        }
      );
    } else { }
  }
  /*--------------------------Approve MIS Payment Cheque End------------------*/


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


    if ($('#CustomerCommentsId').val() == "") {
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

      if ($("#carparkingcost").val() == undefined || $("#carparkingcost").val() == "") {
        this.carparkingcost_amount = 0;
      } else {
        this.carparkingcost_amount = $("#carparkingcost").val();
      }


      if (this.carparkingInvoiceID_binding == undefined) {
        this.carparkingInvoiceID_binding = null;
      }


      if (this.carparkingChargesSetOffId == undefined) {
        this.carparkingChargesSetOffId = 0;
      }


      if (this.Assignment_ChargesSetOffId == undefined) {
        this.Assignment_ChargesSetOffId = 0;
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
        "transactionForId": "" + this.transactionForId,
        "transactionTypeName": "" + this.viewTransactionResponse.transactionTypeName,
        "transactionModeName": "" + this.viewTransactionResponse.transactionModeName,
        "transactionFor": "" + this.transactionFor,
        "chequeNumber": "" + $('#ChequeNumber').val(),
        "transactionDate": null, //"2019-06-21",
        "transactionAmount": "" + $('#ChequeAmount').val(),
        "flatIds": this.flatID, // [1087],
        "bookingFormId": "" + this.bookingFormID,
        "bankId": this.bindingbankid,
        "bankName": this.bindingbankname,
        "siteAccountId": "" + this.siteAccountId,
        "siteBankAccountNumber": "" + this.companyBankAccountNo, //"10000111101",
        "paymentSetOff": "true",
        // "sourceOfFunds": $("#Sourcefound").val(),
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
            "invoiceNo": $("#ModificationInvoiceId").val(),
            "refundFromMileStone": this.refundForMilestone
          },
          {
            "finTransactionSetOffId": "" + this.LegalChargesSetOffId, //"1",
            "setOffTypeName": "LEGAL_COST",
            "amount": $('#LeagalCharges').val(), //this.legalAmount,  //"0",
            "invoiceNo": $("#LegalInvoiceId").val(),
            "refundFromMileStone": this.refundForMilestone
          },

          {
            "finTransactionSetOffId": "" + this.carparkingChargesSetOffId,
            "setOffTypeName": "Car_Parking_Cost",
            "amount": $("#carparkingcost").val(),
            "invoiceNo": this.carparkingInvoiceID_binding,
            "refundFromMileStone": this.refundForMilestone
          },

          , {
            "finTransactionSetOffId": "" + this.Assignment_ChargesSetOffId,
            "setOffTypeName": "Assignment_Transfer_Fee",
            "amount": $("#Assignment_transfer_fee").val(),
            "invoiceNo": this.Assignment_tranfer_InvoiceID,
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
        "transactionEntryId": "" + this.viewTransactionResponse.transactionEntryId,
        "transactionSetOffEntryId": +this.transSetOffEntryId,
        "buttonType": rejectAndModify,
        "comment": "" + $('#CustomerCommentsId').val(),
        "transactionReceiptNo": "" + this.transactionReceiptNo // "SIPL/2020-2021/Sumadhura Soham/262"
      }


      console.log(JSON.stringify(body));




      this.http.post(url, body).map(res => res.json()).subscribe(resp => {

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
  }
  /*--------------------------Reject and Modify MIS Payment Cheque End------------------*/

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
    $("#ChequehandoverDate").prop('disabled', condition);
    $("#ChequeAmount").prop('disabled', condition);
    $("#bankNameID").prop('disabled', condition);
    // $("#bankAccNoID").prop('disabled', condition);
    $('#PrincipalAmount').prop('disabled', condition);
    $('#InterstAmount').prop('disabled', condition);
    $('#ModificationCharges').prop('disabled', condition);
    $('#LeagalCharges').prop('disabled', condition);
    // $('#CorpusFund').prop('disabled', condition);
    // $('#MaintinaceCharges').prop('disabled', condition);
    $('#refundableAdvanceID').prop('disabled', condition);

    $('#carparkingcost').prop('disabled', condition);
    $('#Assignment_transfer_fee').prop('disabled', condition);


    $('#Registration_and_Mutation_Charges').prop('disabled', condition);
    $('#Non_refundable_Caution_Deposit').prop('disabled', condition);
    $('#Electricity_Deposit').prop('disabled', condition);


  }

  /*--------------------------disableEnableEditableFields end------------------*/

  /*--------------------------Modify Mis Receipt Online start------------------*/

  // modifyMisReceiptOnline(){
  //   // $('#PrincipalAmount').prop('disabled', false);
  //   // $('#InterstAmount').prop('disabled', false);
  //   // $('#ModificationCharges').prop('disabled', false);
  //   // $('#LeagalCharges').prop('disabled', false);
  // }

  /*--------------------------Modify Mis Receipt Online end------------------*/


  homeClick() {
    this.cmn.commonHomeNavigation();
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
    const pattern = /[0-9\A-Za-z\ ]/;

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

    let headers = new Headers({ 'Content-Type': 'application/json' });

    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteId": JSON.stringify(this.sideidname),
      "siteName": this.con_sitename,
      "transactionTypeId": JSON.stringify(this.transactionTypeId),
      "transactionModeId": this.transactionModeId,
      "transactionTypeName": this.transactionTypeName,
      "transactionModeName": this.transactionModeName,
      "transferModeName": this.paymentMode,
      "transactionFor": this.transactionFor,
      "flatIds": [this.flatIds],
      "bookingFormId": JSON.stringify(this.bookingFormId),
      "actualFlatIds": [this.actualFlatIds],
      "actualBookingFormId": JSON.stringify(this.actualBookingFormId),
      "buttonType": this.buttonType,
      "actionUrl": this.actionUrl,
      "transactionEntryId": JSON.stringify(this.transactionEntryId),
      "transactionSetOffEntryId": JSON.stringify(this.transactionSetOffEntryId),
      "transactionNo": JSON.stringify(this.transactionNumber),
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

  /*-----------------Getting Payment mode list Start---------------------*/
  paymentModeList() {
    $('.page-loader-wrapper').show();

    let url = this.cmn.commonUrl + "financial/viewFinTransactionTypeModeData.spring";


    let headers = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: headers });

    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "condition": "Fin Anonymous Entry"
    }


    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 200) {
        for (var i = 0; i < resp.responseObjList.finTransferModeResponseList.length; i++) {
          $('#PaymentModeID').append("<option value='" + resp.responseObjList.finTransferModeResponseList[i].transferModeId + "'>" + resp.responseObjList.finTransferModeResponseList[i].name + "</option>");
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
  /*-----------------Getting Payment mode list End---------------------*/
  openChequeClearedModel() {

    if ($("#carparkingcost").val() == undefined || $("#carparkingcost").val() == "") {
      this.carparkingcost_amount = 0;
    } else {
      this.carparkingcost_amount = $("#carparkingcost").val();
    }


    if ($("#Assignment_transfer_fee").val() == undefined || $("#Assignment_transfer_fee").val() == "") {
      this.Assignment_transfer_amount = 0;
    } else {
      this.Assignment_transfer_amount = $("#Assignment_transfer_fee").val();
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
      && ($("#ModificationCharges").val() == "0" || $("#ModificationCharges").val() == "")
      && ($("#InterstAmount").val() == "0" || $("#InterstAmount").val() == "")
      && ($("#LeagalCharges").val() == "0" || $("#LeagalCharges").val() == "")
      && ($("#refundableAdvanceID").val() == "0" || $("#refundableAdvanceID").val() == "") && ($('#TdsAmount').val() == "0" || $('#TdsAmount').val() == "") && this.CorpusFund == "0" && this.MaintinaceCharges == "0" && this.FlatKhataBifurcation == "0" && this.carparkingcost_amount == "0" && this.Assignment_transfer_amount == "0" && this.Registration_And_Mutation_Charges == "0" && this.Non_refundable_Caution_Deposit == "0" && this.Electricity_Deposit == "0") {
      swal("Please enter Principle amount (OR) Corpus Fund (OR) Maintinance Charges (OR) Flat Khata Bifurcation (OR)  Interest amount (OR) Modification charges (OR) Legal charges (OR) Refundable Advance (OR) Car parking cost (OR) Assignment Transfer Fee (OR) Registration And Mutation Charges (OR) Non-refundable Caution Deposit (OR) Electricity Deposit");
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

    if ($("#LegalInvoiceId").val() != "" && $("#LegalInvoiceId").val() != null) {
      if ($("#LeagalCharges").val() == "" || $("#LeagalCharges").val() == "0") {
        $('#LeagalCharges').focus();
        swal("Please enter the legal charges");
        return false;
      }
    }

    if ((Number($('#PrincipalAmount').val()) + Number($('#InterstAmount').val()) + Number($('#refundableAdvanceID').val()) + Number($('#ModificationCharges').val())
      + Number($('#LeagalCharges').val())) + Number(this.CorpusFund) + Number(this.MaintinaceCharges) + Number(this.FlatKhataBifurcation) + Number(this.carparkingcost_amount) + Number(this.Assignment_transfer_amount)
      + Number($('#TdsAmount').val()) + Number(this.Registration_And_Mutation_Charges) + Number(this.Non_refundable_Caution_Deposit) + Number(this.Electricity_Deposit) > Number($('#ChequeAmount').val())) {
      swal("Payment Setoff amount should not be greater than Cheque amount");
      return false
    }

    // if ($('#CustomerCommentsId').val() == "") {
    //   swal("Please enter the comments");
    //   return false;
    // }

    if ($('#ChequeDepositedDateID').val() == "") {
      swal("Please select the cheque deposited date");
      return false;
    }

    $("#chequeClearedModel").modal();


  }

  chequeBounceAccReceipt(reject) {
    // if(($("#PrincipalAmount").val() == "0" || $("#PrincipalAmount").val() == "")  
    //         && ($("#ModificationCharges").val() == "0" || $("#ModificationCharges").val() == "") && ($("#InterstAmount").val() == "0" || $("#InterstAmount").val() == "") 
    //          && ($("#LeagalCharges").val() == "0" || $("#LeagalCharges").val() == "") )
    //      {
    //       swal("Please enter Principle amount (OR) Interest amount (OR) Modification charges (OR) Legal charges");
    //       return false;
    //      } 

    // if((Number($('#PrincipalAmount').val()) + Number($('#InterstAmount').val()) + Number($('#ModificationCharges').val()) + Number($('#LeagalCharges').val()) ) > Number($('#ChequeAmount').val())){
    //   swal("Payment Setoff amount should not be greater than Cheque amount");
    //   return false
    // }

    // if ($('#CustomerCommentsId').val() == "") {
    //   swal("Please enter the comments");
    //   return false;
    // }

    // if($('#ChequeDepositedDateID').val() == ""){
    //   swal("please select the date");
    //   return false;
    // }

    // if ($("#ChequeDepositedDateID").val() == "") {
    //   swal("Please select cheque deposited date");
    //   return false;
    // }

    $("#chequeBounceModel").modal();


  }

  approveAccReceiptCheque(approve) {

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



    if (Number($('#TdsAmount').val()) !== 0 && $("#paidbyname").val() == "") {
      swal("Please select Paid By Name");
      return false
    }



    if ($('#Sourcefound').val() == "") {
      swal("Please select the Source of funds");
      return false;
    }

    if ($('#ChequeClearanceDateID').val() == "") {
      swal("Please select the date");
      return false;
    }

    var temp_ChequeClearanceDateID = new Date($("#ChequeClearanceDateID").val()).getTime()
    var temp_receiveDateID = new Date($("#receivedDateID").val()).getTime()
    var temp_ChequeDepositedDateID = new Date($("#ChequeDepositedDateID").val()).getTime()
    if (temp_ChequeClearanceDateID < temp_receiveDateID) {
      swal("Clearance date should be  greater than Cheque received date");
      return false;
    }

    if (temp_ChequeClearanceDateID < temp_ChequeDepositedDateID) {
      swal("Clearance date should be equal to or greater than Cheque deposited date");
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

      if ($("#carparkingcost").val() == undefined || $("#carparkingcost").val() == "") {
        this.carparkingcost_amount = 0;
      } else {
        this.carparkingcost_amount = $("#carparkingcost").val();
      }


      if (this.carparkingInvoiceID_binding == undefined) {
        this.carparkingInvoiceID_binding = null;
      }


      if (this.carparkingChargesSetOffId == undefined) {
        this.carparkingChargesSetOffId = 0;
      }



      $('.page-loader-wrapper').show();
      let url = this.cmn.commonUrl + "financial/approveOrRejectMisReceiptOrPayment.spring";

      let headers = new Headers({ 'Content-Type': 'application/json' });


      var body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "transactionFor": "" + this.transactionFor,
        "transactionForId": this.transactionForId,
        "siteId": "" + this.siteID,
        "siteName": "" + this.projectName,
        "transactionTypeId": "" + this.viewTransactionResponse.transactionTypeId,
        "transactionModeId": "" + this.viewTransactionResponse.transactionModeId,
        "transactionTypeName": "" + this.viewTransactionResponse.transactionTypeName,
        "transactionModeName": "" + this.viewTransactionResponse.transactionModeName,
        "chequeNumber": "" + $('#ChequeNumber').val(),
        "transactionDate": "" + new Date($("#ChequeDate").val()).getTime(), //"2019-09-05",
        "transactionReceiveDate": this.viewTransactionResponse.transactionReceiveDate, //"2020-03-29",
        "transactionAmount": "" + $('#ChequeAmount').val(),
        //"payableAmount":this.payableAmount, //2000000,
        "flatIds": this.flatID, // [1087],
        "bookingFormId": "" + this.bookingFormID,
        "bankId": this.bindingbankid,
        "bankName": this.bindingbankname,
        "siteAccountId": "" + this.siteAccountId,
        "siteBankAccountNumber": "" + this.companyBankAccountNo, //"10000111101",
        "paymentSetOff": "true",
        "sourceOfFunds": $("#Sourcefound").val(),
        "optionalButtonType": "Cheque Cleared",
        "chequeHandoverDate": this.viewTransactionResponse.chequeHandoverDate,
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
            "amount": "" + $('#ModificationCharges').val(), // this.modificationAmount,  //"0",
            "invoiceNo": $("#ModificationInvoiceId").val()
          },
          {
            "finTransactionSetOffId": "" + this.LegalChargesSetOffId, //"1",
            "setOffTypeName": "LEGAL_COST",
            "amount": "" + $('#LeagalCharges').val(), //this.legalAmount,  //"0",
            "invoiceNo": $("#LegalInvoiceId").val()
          },

          {
            "finTransactionSetOffId": "" + this.carparkingChargesSetOffId,
            "setOffTypeName": "Car_Parking_Cost",
            "amount": $("#carparkingcost").val(),
            "invoiceNo": this.carparkingInvoiceID_binding
          },

          {
            "finTransactionSetOffId": "0",
            "setOffTypeName": "Assignment_Transfer_Fee",
            "amount": $("#Assignment_transfer_fee").val(),
            "invoiceNo": this.Assignment_tranfer_InvoiceID,
            "refundFromMileStone": this.refundForMilestone
          },


          {
            "finTransactionSetOffId": "" + this.RefundableChargesSetOffId, //"1",
            "setOffTypeName": "REFUNDABLE_ADVANCE",
            "amount": $('#refundableAdvanceID').val(), //this.legalAmount,  //"0",
            "invoiceNo": ""
          }
          , { "finTransactionSetOffId": this.finTransactionSetOffId, "setOffTypeName": "TDS", "amount": $("#TdsAmount").val(), "paidByName": "Customer" }
          , { "finTransactionSetOffId": this.finTransactionSetOffId_maintanance, "setOffTypeName": "Maintenance_Charge", "amount": this.MaintinaceCharges, "invoiceNo": "" }
          , { "finTransactionSetOffId": this.finTransactionSetOffId_corpus, "setOffTypeName": "Corpus_Fund", "amount": this.CorpusFund, "invoiceNo": "" }
          , { "finTransactionSetOffId": this.finTransactionSetOffId_flatkhata, "setOffTypeName": "Individual_Flat_Khata_bifurcation_and_other_charges", "amount": this.FlatKhataBifurcation }
          
          , { "finTransactionSetOffId": this.Registration_and_Mutation_back, "setOffTypeName": "Registration_And_Mutation_Charges", "amount": this.Registration_And_Mutation_Charges }
          , { "finTransactionSetOffId": this.Non_refundable_Caution_back, "setOffTypeName": "Non_refundable_Caution_Deposit", "amount": this.Non_refundable_Caution_Deposit }
          , { "finTransactionSetOffId": this.Electricity_Deposit_back, "setOffTypeName": "Electricity_Deposit", "amount": this.Electricity_Deposit }

        ],
        "buttonType": approve,
        "transactionEntryId": "" + this.viewTransactionResponse.transactionEntryId,
        "transactionSetOffEntryId": "" + this.transSetOffEntryId,
        "comment": "" + $('#CustomerCommentsId').val(),
        "chequeDepositedDate": this.viewTransactionResponse.chequeDepositedDate,
        "chequeClearanceDate": "" + new Date($("#ChequeClearanceDateID").val()).getTime(),
        "transactionReceiptNo": "" + this.transactionReceiptNo // "SIPL/2020-2021/Sumadhura Soham/262"
      }




      console.log(JSON.stringify(body));





      this.http.post(url, body).map(res => res.json()).subscribe(resp => {
        console.log(JSON.stringify(resp));

        $('.page-loader-wrapper').hide();
        if (resp.responseCode == 200) {
          //  window.open(resp.responseObjList.fileResponse.url,"_blank");
          $('.modal').modal('hide');
          $('#chequeClearedModel').modal('hide');


          swal("Your transaction got approved successfully !!");



          if (this.transactionStatusNameval == "Uncleared Cheque") {
            setTimeout(() => {
              this.router.navigate(['uncleared-cheque-list']);
            }, 1000);
          } else {
            setTimeout(() => {
              this.router.navigate(['View-Pending-Transactions']);
            }, 1000);
          }

          if (resp.responseObjList.fileResponse.url != null) {
            //window.open(resp.responseObjList.fileResponse.url, "_blank");
            window.open(resp.responseObjList.fileResponse.url, '_system', 'location=yes,closebuttoncaption=Fechar,enableViewportScale=no');

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
          // var error = JSON.parse(error._body).responseCode;
          if (error == 440) {
            swal("Your Session has been Timed Out!", "Please login once again.", "error");
            this.router.navigate([""]);
          }
        }
      );
    } else { }
  }

  rejectReceiptCheque(reject) {


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



    if ($('#insuffientbalId').is(':checked') || $('#others_Id').is(':checked')) {

    } else {
      swal("Please select In Sufficient Balance (or) Others");
      return false;
    }


    if ($('#others_Id').is(':checked')) {
      // if ($("#otherscomentid").val() == "") {
      //   swal("Plese enter comments")
      //   return false;
      // }
      otherscomment = $("#otherscomentid").val();
    } else {
      otherscomment = null;
    }

    if ($('#Sourcefound').val() == "") {
      swal("Please select the Source of funds");
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



    if (this.carparkingInvoiceID_binding == undefined) {
      this.carparkingInvoiceID_binding = null;
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


      if (this.carparkingChargesSetOffId == undefined) {
        this.carparkingChargesSetOffId = 0;
      }



      $('.page-loader-wrapper').show();

      let url = this.cmn.commonUrl + "financial/approveOrRejectMisReceiptOrPayment.spring";


      let headers = new Headers({ 'Content-Type': 'application/json' });
      //let options = new RequestOptions({ headers: headers }); 

      var body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "transactionFor": "" + this.transactionFor,
        "transactionForId": this.transactionForId,
        "siteId": "" + this.siteID,
        "siteName": "" + this.projectName,
        "transactionTypeId": "" + this.viewTransactionResponse.transactionTypeId,
        "transactionModeId": "" + this.viewTransactionResponse.transactionModeId,
        "transactionTypeName": "" + this.viewTransactionResponse.transactionTypeName,
        "transactionModeName": "" + this.viewTransactionResponse.transactionModeName,
        "chequeNumber": "" + $('#ChequeNumber').val(),
        "transactionDate": "" + new Date($("#ChequeDate").val()).getTime(), //"2019-09-05",
        "transactionReceiveDate": this.viewTransactionResponse.transactionReceiveDate, //"2020-03-29",
        "transactionAmount": "" + $('#ChequeAmount').val(),
        //"payableAmount":this.payableAmount, //2000000,
        "flatIds": this.flatID, // [1087],
        "bookingFormId": "" + this.bookingFormID,
        "bankId": this.bindingbankid,
        "bankName": this.bindingbankname,
        "siteAccountId": "" + this.siteAccountId,
        "siteBankAccountNumber": "" + this.companyBankAccountNo, //"10000111101",
        "chequeBounceReasonValue": checkbouncereasonval,
        "optionalButtonType": "Cheque Bounced",
        "chequeBounceComment": otherscomment,
        "paymentSetOff": "true",
        "sourceOfFunds": $("#Sourcefound").val(),
        "chequeHandoverDate": this.viewTransactionResponse.chequeHandoverDate,
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
            "amount": "" + $('#ModificationCharges').val(), // this.modificationAmount,  //"0",
            "invoiceNo": $("#ModificationInvoiceId").val()
          },
          {
            "finTransactionSetOffId": "" + this.LegalChargesSetOffId, //"1",
            "setOffTypeName": "LEGAL_COST",
            "amount": "" + $('#LeagalCharges').val(), //this.legalAmount,  //"0",
            "invoiceNo": $("#LegalInvoiceId").val()
          },

          {
            "finTransactionSetOffId": "" + this.carparkingChargesSetOffId,
            "setOffTypeName": "Car_Parking_Cost",
            "amount": $("#carparkingcost").val(),
            "invoiceNo": this.carparkingInvoiceID_binding
          },
          {
            "finTransactionSetOffId": "0",
            "setOffTypeName": "Assignment_Transfer_Fee",
            "amount": $("#Assignment_transfer_fee").val(),
            "invoiceNo": this.Assignment_tranfer_InvoiceID,
            "refundFromMileStone": this.refundForMilestone
          },


          {
            "finTransactionSetOffId": "" + this.RefundableChargesSetOffId, //"1",
            "setOffTypeName": "REFUNDABLE_ADVANCE",
            "amount": $('#refundableAdvanceID').val(), //this.legalAmount,  //"0",
            "invoiceNo": ""
          },
          { "finTransactionSetOffId": this.finTransactionSetOffId, "setOffTypeName": "TDS", "amount": $("#TdsAmount").val(), "paidByName": "Customer" }


          , { "finTransactionSetOffId": this.finTransactionSetOffId_maintanance, "setOffTypeName": "Maintenance_Charge", "amount": this.MaintinaceCharges, "invoiceNo": "" }
          , { "finTransactionSetOffId": this.finTransactionSetOffId_corpus, "setOffTypeName": "Corpus_Fund", "amount": this.CorpusFund, "invoiceNo": "" }
          , { "finTransactionSetOffId": this.finTransactionSetOffId_flatkhata, "setOffTypeName": "Individual_Flat_Khata_bifurcation_and_other_charges", "amount": this.FlatKhataBifurcation }
          , { "finTransactionSetOffId": this.Registration_and_Mutation_back, "setOffTypeName": "Registration_And_Mutation_Charges", "amount": this.Registration_And_Mutation_Charges }
          , { "finTransactionSetOffId": this.Non_refundable_Caution_back, "setOffTypeName": "Non_refundable_Caution_Deposit", "amount": this.Non_refundable_Caution_Deposit }
          , { "finTransactionSetOffId": this.Electricity_Deposit_back, "setOffTypeName": "Electricity_Deposit", "amount": this.Electricity_Deposit }
        ],
        "buttonType": reject,
        "transactionEntryId": "" + this.viewTransactionResponse.transactionEntryId,
        "transactionSetOffEntryId": "" + this.transSetOffEntryId,
        "comment": "" + $('#CustomerCommentsId').val(),
        "chequeDepositedDate": this.viewTransactionResponse.chequeDepositedDate,
        // "chequeClearanceDate":"",
        "transactionReceiptNo": "" + this.transactionReceiptNo // "SIPL/2020-2021/Sumadhura Soham/262"
      }



      console.log(JSON.stringify(body));



      this.http.post(url, body).map(res => res.json()).subscribe(resp => {

        $('.page-loader-wrapper').hide();

        if (resp.responseCode == 200) {
          $('.modal').modal('hide');
          $('#chequeBounceModel').modal('hide')
          this.router.navigate(['View-Pending-Transactions']);
          swal("Your transaction got rejected successfully !!");
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
          // var error = JSON.parse(error._body).responseCode;
          if (error == 440) {
            swal("Your Session has been Timed Out!", "Please login once again.", "error");
            this.router.navigate([""]);
          }
        }
      );
    }
  }


  carparkingInvoiceNumberfun() {
    console.log(this.carparkingLocationname);
    window.open(this.carparkingLocationname);
  }

  carparkingInvoice(event: any) {
    $("#CarparkingInvoiceId").attr("disabled", false);
  }
  Assignment_invoicefun() {
    console.log(this.AssignmentLocationname);

    window.open(this.AssignmentLocationname);
  }

  Assignment_Invoice(event: any) {
    $("#AssignmentfeeInvoiceId").attr("disabled", false);
  }
}
