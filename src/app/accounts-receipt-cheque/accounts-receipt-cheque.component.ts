import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
declare const $: any;
declare const swal: any;
var checkbouncereasonval;
var otherscomment;
var ChequeBounceDate;

var selectbankNameValue;
var selectbanknametext;

@Component({
  selector: 'app-accounts-receipt-cheque',
  templateUrl: './accounts-receipt-cheque.component.html',
  styleUrls: ['./accounts-receipt-cheque.component.sass']
})
export class AccountsReceiptChequeComponent implements OnInit {
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
  operationType: any;
  pathName: string;
  refundableAdvance: any;
  chequeDepositedDate: string;
  chequeDepositedDate_Milliseconds: number;
  chequeClearanceDate: string;
  chequeClearanceDate_Milliseconds: number;
  siteAccountId: any;
  docListArray: any;
  finBokAccInvoiceNo: any;
  setOffID: any;
  principleAmountSetOffId: any;
  InterestSetOffId: any;
  modificationChargesSetOffId: any;
  LegalChargesSetOffId: any;
  customerCommentsArray: any;
  metadataName: any;
  custComments: any;
  transaction_chequeDate: string;
  chequeDate_Milliseconds: number;
  transactionReceiptNo: any;
  RefundableChargesSetOffId: any;
  lastTransactionEditedDate: any;
  lastTransactionEditedBy: any;
  cheque_DepositedDate: any;
  chequeDate_Format: string;
  checkboxval_bouncemodal: any;

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
  transactionPaymentSetOff: any;
  documentLocation: any;
  sourceOfFunds: any;
  paidByName: any;
  deptid: any;
  roleid: any;
  finTransactionSetOffId: any;
  bindingbankname: any;
  bindingbankid: any;
  modificationInvoiceNumber: any;
  ModificationdocumentLocation: any;
  legalChargeInvoiceNumber: any;
  documentLocationname: any;
  controllerdata: any;
  requesturl: string;
  CorpusFund: any;
  MaintinaceCharges: any;
  FlatKhataBifurcation: any;
  finTransactionSetOffId_maintanance: any;
  finTransactionSetOffId_corpus: any;
  finTransactionSetOffId_flatkhata: any;
  cheque_Bouncedate: any;
  chequeBounce_Comment: any;
  Cheque_bounce_reason: boolean;
  CorpusFund_amount: any;
  carparkingInvoiceID: any;
  carparkingInvoiceNumber: any;
  carparkingLocationname: any;
  carparkingcost_amount: any;
  carparkingChargesSetOffId: any;
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
    this.viewTransactionResponse = json_response;
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
    this.actualBookingFormId = this.controller['bookingFormId'];
    this.actualBookingFormId = this.controller['bookingFormId'];
    this.buttonType = "Delete";
    this.actionUrl = "Delete_Transaction";
    this.transactionEntryId = this.controller['transactionEntryId'];
    this.transactionSetOffEntryId = this.controller['transactionEntryId'];
    this.transactionNumber = this.controller['finTransactionNo'];
    this.commentfield = "";
    //this.transactionReceiptNumber = this.controller['chequeOrReferenceNo'];
    this.transactionStatusNameval = this.controller['transactionStatusName'];
    this.transactionPaymentSetOff = this.controller['transactionPaymentSetOff'];
    this.operationType = this.viewTransactionResponse.operationType;
    this.getAccountsReceiptChequeData();

  }

  ngOnInit() {
    $("#otherscomentid").hide();
    $("#bouncedateid").hide();


    $("#paidbyname").prop("disabled", true);
    if (this.operationType == 'approveTransaction' && this.transactionStatusNameval !== "Uncleared Cheque") {
      this.pathName = "View Pending Transactions for Approval";
      this.disableEnableEditableFields(false);
    } else if (this.operationType == 'transactionStatus') {
      this.pathName = "View Temporary Transactions Status";
      this.disableEnableEditableFields(true);
      $('#actionButtons').hide();
      $('#userCommentsLabel').hide();
      $('#userCommentsField').hide();
      $('#chequeDepositedDateLabel').hide();
      $('#chequeDepositedDateField').hide();
    } else if (this.operationType == 'loadCompletedTransaction') {
      this.pathName = "View Completed Transactions";
      this.disableEnableEditableFields(true);
      $('#actionButtons').hide();
      $('#userCommentsLabel').hide();
      $('#userCommentsField').hide();
      $('#chequeDepositedDateLabel').hide();
      $('#chequeDepositedDateField').hide();
    } else if (this.transactionStatusNameval == "Uncleared Cheque") {
      this.pathName = "Uncleared Cheque";
      this.disableEnableEditableFields(true);
    }

    var self = this;
    var month
    var day
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



      var dtToday = new Date();
      month = dtToday.getMonth() + 1;
      day = dtToday.getDate();
      var year = dtToday.getFullYear();
      if (month < 10)
        month = '0' + month.toString();
      if (day < 10)
        day = '0' + day.toString();
      var maxDate = year + '-' + month + '-' + day;
      $('#receivedDateID').attr('max', maxDate);
      $('#ChequeClearanceDateID').attr('max', maxDate);
      $('#insuffientbalId').click(function () {
        if ($(this).prop("checked") == true) {
          $("#others_Id").prop("checked", false);
          $("#otherscomentid").hide();
          $("#bouncedateid").hide();

          $("#otherscomentid").val('');
          checkbouncereasonval = "INSUFFICIENT_BALANCE"
        } else {
        }
      });

      $('#others_Id').click(function () {
        if ($(this).prop("checked") == true) {
          $("#insuffientbalId").prop("checked", false);
          $("#otherscomentid").show();
          $("#bouncedateid").show();

          checkbouncereasonval = "OTHER";
        } else {

        }
      });


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
      }).on('change', function (e, date) {
        $('#ChequeDepositedDateID').bootstrapMaterialDatePicker('setMinDate', date);
      });

      $('#ChequeDepositedDateID').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
        minDate: new Date(minimumdate),
        maxDate: new Date(),
        clearButton: true,
        time: false
      })



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

      $('#chequebounceReasons').change(function (event) {
        var chequeboucereason = $(event.target).val();
        if (chequeboucereason == "select") {
          checkbouncereasonval = null;

        } else {
          // var banknametext = event.target.options[event.target.options.selectedIndex].text;
          checkbouncereasonval = event.target.value;

          if (checkbouncereasonval == "Others") {
            $("#bouncedateid").show()
            $("#otherscomentid").show()

          } else {
            $("#bouncedateid").hide()
            $("#otherscomentid").hide()
          }

          // selectbanknametext = banknametext;
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
      $("#chequebounceReasons").select2({
        placeholder: "Select Reason",
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


  legalChargeInvoiceNumberfun() {
    window.open(this.documentLocationname);
  }

  modificationInvoiceNumberfun() {
    window.open(this.ModificationdocumentLocation);
  }

  carparkingInvoiceNumberfun() {
    window.open(this.carparkingLocationname);
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

  /*--------------------------Accounts Receipt Cheque data start------------------*/
  getAccountsReceiptChequeData() {
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
        this.checkboxval_bouncemodal = resp.responseObjList.finTransactionEntryDetailsResponseList[0].chequeBounceReasonValue;
        if (this.checkboxval_bouncemodal == "INSUFFICIENT_BALANCE") {
          $("input[value='" + this.checkboxval_bouncemodal + "']").prop('checked', true);
          checkbouncereasonval = "INSUFFICIENT_BALANCE"
        }
        this.getPendingAndInterestAmount();
        this.modification_legalInvoiceList();
        this.finTransactionEntryDetails = resp.responseObjList.finTransactionEntryDetailsResponseList[0];
        this.transactionType = this.viewTransactionResponse.transactionTypeName;
        this.transactionID = this.finTransactionEntryDetails.finTransactionNo;
        this.transactionReceiptNo = this.finTransactionEntryDetails.transactionReceiptNo;
        this.siteAccountId = this.finTransactionEntryDetails.siteAccountId;
        this.transSetOffEntryId = this.finTransactionEntryDetails.transactionSetOffEntryId;
        this.bookingFormID = this.finTransactionEntryDetails.bookingFormId;
        this.chequeNum = this.finTransactionEntryDetails.chequeNumber;
        this.documentLocation = this.finTransactionEntryDetails.transactionReceiptDocResponsesList;
        this.sourceOfFunds = resp.responseObjList.finTransactionEntryDetailsResponseList[0].sourceOfFunds;
        $('#ChequeNumber').val(this.chequeNum);
        this.chequeDate = this.finTransactionEntryDetails.chequeDate;
        this.cheque_DepositedDate = this.finTransactionEntryDetails.chequeDepositedDate;
        this.cheque_Bouncedate = this.finTransactionEntryDetails.chequeBounceDate;
        this.chequeBounce_Comment = this.finTransactionEntryDetails.chequeBounceComment;


        // alert(this.viewTransactionResponse.transactionTypeName)
        // alert(this.viewTransactionResponse.transactionModeName)
        // alert(this.viewTransactionResponse.transactionStatusName)
        if (this.viewTransactionResponse.transactionTypeName == "Receipt" && this.viewTransactionResponse.transactionModeName == "Cheque" && this.viewTransactionResponse.transactionStatusName == "Cheque Bounced") {
          this.cheque_Bouncedate = this.finTransactionEntryDetails.chequeBounceDate;
          this.chequeBounce_Comment = this.finTransactionEntryDetails.chequeBounceComment;
          //  alert(this.cheque_Bouncedate)
          // alert(this.chequeBounce_Comment)
        } else {
          $(function () {
            $("#chequebouncedDateField").hide()
            $("#checkbounceComents").hide()
          })
        }
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
        $('#ChequeBounceDateID').bootstrapMaterialDatePicker({
          format: 'YYYY-MM-DD',
          // minDate: new Date(),
          maxDate: new Date(),
          clearButton: true,
          weekStart: 1,
          time: false
        });



        this.chequeAmount = this.finTransactionEntryDetails.transactionAmount;
        $('#ChequeAmount').val(this.chequeAmount);
        this.bankName = this.finTransactionEntryDetails.bankName;
        this.bankID = this.finTransactionEntryDetails.finBankId;
        this.chequeReceiveDate = this.finTransactionEntryDetails.transactionReceiveDate;
        this.payableAmount = this.finTransactionEntryDetails.payableAmount;
        this.docListArray = resp.responseObjList.finTransactionEntryDetailsResponseList[0].transactionEntryDocResponsesList

        this.companyBankAccountNo = this.finTransactionEntryDetails.siteBankAccountNumber;
        this.previousCRMComments = this.finTransactionEntryDetails.finTransactionApprStatResponseList;
        this.SetOffResponseList = resp.responseObjList.finTransactionEntryDetailsResponseList[0].finTransactionSetOffResponseList;

        for (let i = 0; i < this.SetOffResponseList.length; i++) {
          this.setOffTypeName = this.SetOffResponseList[i].setOffTypeName;
          this.setOffAmount = this.SetOffResponseList[i].setOffAmount;
          this.paidByName = this.SetOffResponseList[i].paidByName;
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
            this.modificationChargeInvoiceNo = this.finBokAccInvoiceNo;
          } else if (this.setOffTypeName == "LEGAL_COST") {
            this.LegalChargesSetOffId = this.setOffID;
            this.LegalCharges = this.setOffAmount;
            $('#LeagalCharges').val(this.LegalCharges);
            this.legalChargeInvoiceNo = this.finBokAccInvoiceNo;
          } else if (this.setOffTypeName == "REFUNDABLE_ADVANCE") {
            this.RefundableChargesSetOffId = this.setOffID;
            this.refundableAdvance = this.setOffAmount;
            $('#refundableAdvanceID').val(this.refundableAdvance);
          } else if (this.setOffTypeName == "TDS") {
            this.finTransactionSetOffId = this.SetOffResponseList[i].finTransactionSetOffId;
            $("#TdsAmount").val(this.setOffAmount);
            $("#paidbyname").val(this.paidByName);

            // if(this.setOffAmount !== null){
            //   $("#paidbyname").prop("disabled", false);
            // }


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
          }else if (this.setOffTypeName == "REGISTRATION_AND_MUTATION_CHARGES") {

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
  /*--------------------------Accounts Receipt Cheque data End------------------*/

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
    console.log(body);
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
        swal(resp.status);
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

  /*-------------------------View file start---------------------------*/
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

      if (resp.responseCode == 200) {

        $('.page-loader-wrapper').hide();
        $('#ModificationInvoiceId').html('');
        $('#LegalInvoiceId').html('');
        $('#CarparkingInvoiceId').html('');


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
            console.log(this.legalChargeInvoiceNo);
            $('#LegalInvoiceId').append("<option value='" + resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo + "'>" + resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo + "</option>");
            //   $('#LegalInvoiceId').val(this.legalChargeInvoiceNo);
            if (resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo == this.legalChargeInvoiceNo) {
              this.legalChargeInvoiceNumber = resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo;
              this.documentLocationname = resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].documentLocation;

              console.log(this.legalChargeInvoiceNumber);
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
        swal(resp.status);
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

  openChequeClearedModel() {


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
      && ($("#ModificationCharges").val() == "0" || $("#ModificationCharges").val() == "")
      && ($("#InterstAmount").val() == "0" || $("#InterstAmount").val() == "")
      && ($("#LeagalCharges").val() == "0" || $("#LeagalCharges").val() == "")
      && ($("#refundableAdvanceID").val() == "0" || $("#refundableAdvanceID").val() == "") && ($('#TdsAmount').val() == "0" || $('#TdsAmount').val() == "") && this.CorpusFund == "0" && this.MaintinaceCharges == "0" && this.FlatKhataBifurcation == "0" && this.carparkingcost_amount == "0" && this.Registration_And_Mutation_Charges == "0" && this.Non_refundable_Caution_Deposit == "0" && this.Electricity_Deposit == "0") {
      swal("Please enter Principle amount (OR) Corpus Fund (OR) Maintinance Charges (OR) Flat Khata Bifurcation (OR) Interest amount (OR) Modification charges (OR) Legal charges (OR) Refundable Advance (OR) Car parking cost (OR) Registration And Mutation Charges (OR) Non-refundable Caution Deposit (OR) Electricity Deposit");
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

    if ((Number($('#PrincipalAmount').val()) + Number($('#InterstAmount').val()) + Number($('#refundableAdvanceID').val()) + Number($('#ModificationCharges').val())
      + Number($('#LeagalCharges').val())) + Number(this.CorpusFund) + Number(this.MaintinaceCharges) + Number(this.FlatKhataBifurcation) + Number(this.carparkingcost_amount)
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

    $("#ChequeClearanceDateID").val("");

    $("#chequeClearedModel").modal();


  }

  /*--------------------------Approve Accounts Receipt Cheque start------------------*/
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

      if (this.carparkingInvoiceNumber == undefined) {
        this.carparkingInvoiceNumber = null;
      }

      if (this.carparkingChargesSetOffId == undefined) {
        this.carparkingChargesSetOffId = 0;
      }


      $('.page-loader-wrapper').show();
      let url = this.cmn.commonUrl + "financial/approveOrRejectMisReceiptOrPayment.spring";

      let headers = new Headers({ 'Content-Type': 'application/json' });


      var body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "siteId": "" + this.siteID,
        "siteName": "" + this.projectName,
        "transactionTypeId": "" + this.viewTransactionResponse.transactionTypeId,
        "transactionModeId": "" + this.viewTransactionResponse.transactionModeId,
        "transactionTypeName": "" + this.viewTransactionResponse.transactionTypeName,
        "transactionModeName": "" + this.viewTransactionResponse.transactionModeName,
        "chequeNumber": "" + $('#ChequeNumber').val(),
        "transactionDate": "" + new Date($("#ChequeDate").val()).getTime(), //"2019-09-05",
        "transactionReceiveDate": "" + new Date($("#receivedDateID").val()).getTime(), //"2020-03-29",
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
            "invoiceNo": this.modificationChargeInvoiceNo
          },
          {
            "finTransactionSetOffId": "" + this.LegalChargesSetOffId, //"1",
            "setOffTypeName": "LEGAL_COST",
            "amount": "" + $('#LeagalCharges').val(), //this.legalAmount,  //"0",
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
        "chequeDepositedDate": "" + new Date($("#ChequeDepositedDateID").val()).getTime(),
        "chequeClearanceDate": "" + new Date($("#ChequeClearanceDateID").val()).getTime(),
        "transactionReceiptNo": "" + this.transactionReceiptNo // "SIPL/2020-2021/Sumadhura Soham/262"
      }


      console.log(url);
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
            // window.open(resp.responseObjList.fileResponse.url, "_blank");
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
  /*--------------------------Approve Accounts Receipt Cheque End------------------*/


  /*--------------------------Reject/Cheque Bounce Accounts Receipt Cheque start------------------*/
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

    $("#ChequeBounceDateID").val("");
    $("#otherscomentid").val("");
    $("#chequebounceReasons").val(['select']);
    $("#chequebounceReasons").trigger('change');


    $("#chequeBounceModel").modal();


  }
  /*--------------------------Reject/Cheque Bounce Accounts Receipt Cheque End------------------*/

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
    $('#ChequeDepositedDateID').prop('disabled', condition);
    $("#TdsAmount").prop('disabled', condition);
    $("#Sourcefound").prop('disabled', condition);
    //  $("#paidbyname").prop('disabled', condition);
    $("#paidbyname").prop("disabled", condition);
    $("#carparkingcost").prop("disabled", condition);
    $("#Registration_and_Mutation_Charges").prop("disabled", condition);
    $("#Non_refundable_Caution_Deposit").prop("disabled", condition);
    $("#Electricity_Deposit").prop("disabled", condition);


  }

  /*--------------------------disableEnableEditableFields end------------------*/

  /*--------------------------Modify Accounts Receipt Cheque start------------------*/

  // modifyAccountsReceiptCheque(){
  //   // $("#ChequeNumber").prop('disabled', false);
  //   // $("#ChequeDate").prop('disabled', false);
  //   // $("#ChequeAmount").prop('disabled', false);
  //   // $("#bankNameID").prop('disabled', false);
  //   // $("#receivedDateID").prop('disabled', false);
  //   // $('#PrincipalAmount').prop('disabled', false);
  //   // $('#InterstAmount').prop('disabled', false);
  //   // $('#ModificationCharges').prop('disabled', false);
  //   // $('#LeagalCharges').prop('disabled', false);
  // }

  /*--------------------------Modify Accounts Receipt Cheque end------------------*/


  homeClick() {
    // this.router.navigate(['leave-update']);
    this.router.navigate(['dashboard']);
  }

  redirectToPenidng() {

    if (this.transactionStatusNameval == "Uncleared Cheque") {

      this.router.navigate(['uncleared-cheque-list']);

    }

    if (this.operationType == 'approveTransaction' && this.transactionStatusNameval !== "Uncleared Cheque") {
      this.router.navigate(['View-Pending-Transactions']);
    } else if (this.operationType == 'transactionStatus') {
      this.router.navigate(['View-Pending-Transactions-Status']);
    } else if (this.operationType == 'loadCompletedTransaction') {
      this.router.navigate(['View-Completed-Transactions']);
    }



  }

  /*-----------------------------Cheque bounce model submit button functionality start----------------*/
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



    if ($("#chequebounceReasons").val() == "select" || $("#chequebounceReasons").val() == "null") {
      swal("Plese select cheque bounce reason")
      return false;
    }



    otherscomment = $("#otherscomentid").val();
    ChequeBounceDate = $("#ChequeBounceDateID").val();
    if (ChequeBounceDate == "") {
      swal("Plese select cheque bounce date")
      return false;
    }

    if ($("#chequebounceReasons").val() == "Others") {

      if (otherscomment == "") {
        swal("Plese enter cheque bounce comments")
        return false;
      }
    } else {
      otherscomment = "";
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

      var tempdate
      if ($("#ChequeBounceDateID").val() == null || $("#ChequeBounceDateID").val() == "" || $("#ChequeBounceDateID").val() == "NaN") {
        tempdate = null
      } else {
        tempdate = new Date($("#receivedDateID").val()).getTime()
      }

      // alert(tempdate)

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
        "transactionTypeId": "" + this.viewTransactionResponse.transactionTypeId,
        "transactionModeId": "" + this.viewTransactionResponse.transactionModeId,
        "transactionTypeName": "" + this.viewTransactionResponse.transactionTypeName,
        "transactionModeName": "" + this.viewTransactionResponse.transactionModeName,
        "chequeNumber": "" + $('#ChequeNumber').val(),
        "transactionDate": "" + new Date($("#ChequeDate").val()).getTime(), //"2019-09-05",
        "transactionReceiveDate": "" + new Date($("#receivedDateID").val()).getTime(), //"2020-03-29",
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
        "chequeBounceDate": tempdate,
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
            "amount": "" + $('#ModificationCharges').val(), // this.modificationAmount,  //"0",
            "invoiceNo": this.modificationChargeInvoiceNo
          },
          {
            "finTransactionSetOffId": "" + this.LegalChargesSetOffId, //"1",
            "setOffTypeName": "LEGAL_COST",
            "amount": "" + $('#LeagalCharges').val(), //this.legalAmount,  //"0",
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
        "chequeDepositedDate": "" + new Date($("#ChequeDepositedDateID").val()).getTime(),
        "transactionReceiptNo": "" + this.transactionReceiptNo // "SIPL/2020-2021/Sumadhura Soham/262"
      }



      console.log(url);
      console.log(body);
      console.log(JSON.stringify(body));




      this.http.post(url, body).map(res => res.json()).subscribe(resp => {

        console.log(JSON.stringify(resp));

        $('.page-loader-wrapper').hide();

        if (resp.responseCode == 200) {
          $('.modal').modal('hide');
          $('#chequeBounceModel').modal('hide')


          if (this.transactionStatusNameval == "Uncleared Cheque") {
            setTimeout(() => {
              this.router.navigate(['uncleared-cheque-list']);
            }, 1000);
          } else {
            setTimeout(() => {
              this.router.navigate(['View-Pending-Transactions']);
            }, 1000);
          }


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
  /*-----------------------------Cheque bounce model submit button functionality start----------------*/

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

    // var d = new Date(this.transactionDate);
    // var transactionDate = d.getTime();
    // var date = new Date(this.transactionReceiveDate);
    // var transactionRecDate = date.getTime();
    // var date1 = new Date(this.actualTransactionReceiveDate);
    // var actualTransactionRecDate = date1.getTime();

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
      "transactionDate": this.transactionDate,
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
      "comment": this.commentfield,
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

  paidbynamefun(event) {

    if (event.target.value !== "" && event.target.value !== "0") {
      $("#paidbyname").prop("disabled", false);

    } else {
      $("#paidbyname").prop("disabled", true);

    }
  }



  carparkingInvoice(event: any) {
    $("#CarparkingInvoiceId").attr("disabled", false);
  }


}
