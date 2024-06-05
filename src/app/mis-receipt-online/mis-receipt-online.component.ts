import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
declare const $: any;
declare const swal: any;

var base64textString;
// var checkedornot;
var flatId;
var flatId_bookingid;
var convertbasesixtyfour = [];
var selectbankNameValue;
var selectbanknametext;
var carparkingLocationname;
@Component({
  selector: 'app-mis-receipt-online',
  templateUrl: './mis-receipt-online.component.html',
  styleUrls: ['./mis-receipt-online.component.sass']
})
export class MisReceiptOnlineComponent implements OnInit {
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
  modificationChargeInvoiceNo: any = "";
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
  customerCommentsArray: any;
  metadataName: any;
  custComments: any;
  operationType: any;
  pathName: string;
  refundableAdvance: any;
  siteAccountId: any;
  setOffID: any;
  principleAmountSetOffId: any;
  InterestSetOffId: any;
  modificationChargesSetOffId: any;
  LegalChargesSetOffId: any;
  principleMoney: any;
  finalityAmount: any;
  modificationAmount: any;
  legalAmount: any;
  docListArray: any;
  transactionReceiptNo: any;
  RefundableChargesSetOffId: any;
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
  transferModeId: any;
  transactionStatusNameval: any;
  documentLocation: any;
  sourceOfFunds: any;
  paidByName: any;
  deptid: any;
  roleid: any;
  finTransactionSetOffId: any;
  TDSfinTransactionSetOffId: any;
  finpaidbyname: any;
  bindingbankname: any;
  bindingbankid: any;
  banknamevalue: any;
  banknametext: any;
  controllerdata: any;
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
  flatBookingId: any;
  CorpusFund_amount: any;
  carparkingInvoiceID: any;
  carparkingInvoiceNumber: any;

  carparkingcost_amount: any;
  carparkingChargesSetOffId: any;
  Bank_Statement_Comments: any;
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

    console.log(JSON.stringify(this.controller));

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


    this.getMisReceiptOnlineData();
    this.siteList();

  }

  ngOnInit() {

    $("#paidbyname").prop("disabled", true);


    if (this.operationType == 'approveTransaction') {
      this.pathName = "View Pending Transactions for Approval";
      //  this.disableEnableEditableFields(false);

      if (this.deptid == 997 || this.deptid == 995) {
        $("#CustomerCommentsId").prop('disabled', false);
        this.disableEnableEditableFields(true);
      } else if (this.deptid == 993) {
        this.disableEnableEditableFields(true);
      }
      else {
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
      $('#transactionDateID').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
      //  minDate: new Date(minimumdate),
        maxDate: new Date(),
        clearButton: true,
        weekStart: 1,
        time: false,
      })



      // $('#bankNameID').change(function (event) {
      //   var bankname = $(event.target).val();
      //   if (bankname == "select") {
      //     selectbankNameValue = null;
      //     selectbanknametext = null;
      //   } else {
      //     var banknametext = event.target.options[event.target.options.selectedIndex].text;
      //     selectbankNameValue = event.target.value;
      //     selectbanknametext = banknametext;
      //   }
      // });


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

      $("#paidbyname").select2({
        placeholder: "Source of funds",
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

  /*--------------------------Mis Receipt Online data start------------------*/
  getMisReceiptOnlineData() {
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

        this.flatBookingId = this.customerPropertyDetails.flatBookingId;
        this.siteID = this.customerPropertyDetails.siteId;

        this.getPendingAndInterestAmount();
        this.modification_legalInvoiceList();


        this.finTransactionEntryDetails = resp.responseObjList.finTransactionEntryDetailsResponseList[0];
        this.transactionType = this.viewTransactionResponse.transactionTypeName;
        this.transactionID = this.finTransactionEntryDetails.finTransactionNo;
        this.transactionReceiptNo = this.finTransactionEntryDetails.transactionReceiptNo;
        //  this.transactionEntryId = this.finTransactionEntryDetails.transactionEntryId;
        this.transSetOffEntryId = this.finTransactionEntryDetails.transactionSetOffEntryId;
        this.bookingFormID = this.finTransactionEntryDetails.bookingFormId;
        this.referenceNum = this.finTransactionEntryDetails.referenceNo;

        this.documentLocation = this.finTransactionEntryDetails.transactionReceiptDocResponsesList;

        this.sourceOfFunds = resp.responseObjList.finTransactionEntryDetailsResponseList[0].sourceOfFunds;
        $('#ReferenceID').val(this.referenceNum);

        // this.transactionDate = this.finTransactionEntryDetails.transactionDate;
        // var transDate = new Date(this.transactionDate).toLocaleDateString(); 
        // $('#transactionDateID').val(transDate);

        this.paymentMode = this.finTransactionEntryDetails.transferMode;
        $('#paymentModeID').val(this.paymentMode);

        this.transactionAmount = this.finTransactionEntryDetails.transactionAmount;
        $('#transactionAmountID').val(this.transactionAmount);

        this.bankName = this.finTransactionEntryDetails.bankName;
        this.bankID = this.finTransactionEntryDetails.finBankId;

        // Milliseconds to date (DD-MM-YYYY) convertion
        if (this.finTransactionEntryDetails.transactionReceiveDate == null) {
          this.transReceiveFormat = "";
        } else {
          this.transactionReceiveDate = this.finTransactionEntryDetails.transactionReceiveDate;
          var transRceiveDate = new Date(this.transactionReceiveDate);
          var year = transRceiveDate.getFullYear();
          var month = ("0" + (transRceiveDate.getMonth() + 1)).slice(-2);
          var day = ("0" + transRceiveDate.getDate()).slice(-2);
          this.transReceiveFormat = year + "-" + month + "-" + day;
          $('#transactionDateID').val(this.transReceiveFormat);

          // this.transactionReceiveDate = this.finTransactionEntryDetails.transactionReceiveDate;
          // var transRceiveDate = new Date(this.transactionReceiveDate).toLocaleDateString();
          // this.transReceiveFormat = transRceiveDate.split('/')[1]+"-"+transRceiveDate.split('/')[0]+"-"+transRceiveDate.split('/')[2];
          // $('#transactionDateID').val(this.transReceiveFormat);
        }


        // this.payableAmount = this.finTransactionEntryDetails.payableAmount;
        // $('#PayableAmount').val(this.payableAmount);
        this.transferModeId = resp.responseObjList.finTransactionEntryDetailsResponseList[0].transferModeId;

        this.docListArray = resp.responseObjList.finTransactionEntryDetailsResponseList[0].transactionEntryDocResponsesList
        //  this.attachedFiles = this.finTransactionEntryDetails.docName
        //  this.location = this.finTransactionEntryDetails.location;
        this.siteAccountId = this.finTransactionEntryDetails.siteAccountId;
        this.companyBankAccountNo = this.finTransactionEntryDetails.siteBankAccountNumber;
        this.previousCRMComments = this.finTransactionEntryDetails.finTransactionApprStatResponseList;

        this.Bank_Statement_Comments = this.finTransactionEntryDetails.finTransactionCommentsResponseList;


        this.SetOffResponseList = resp.responseObjList.finTransactionEntryDetailsResponseList[0].finTransactionSetOffResponseList;
        for (let i = 0; i < this.SetOffResponseList.length; i++) {
          this.setOffTypeName = this.SetOffResponseList[i].setOffTypeName;
          this.setOffAmount = this.SetOffResponseList[i].setOffAmount;
          this.finBokAccInvoiceNo = this.SetOffResponseList[i].finBokAccInvoiceNo;
          this.setOffID = this.SetOffResponseList[i].finTransactionSetOffId;

          this.paidByName = this.SetOffResponseList[i].paidByName;

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

            console.log(this.modificationChargeInvoiceNo);

          } else if (this.setOffTypeName == "LEGAL_COST") {
            this.LegalChargesSetOffId = this.setOffID;
            this.LegalCharges = this.setOffAmount;
            $('#LeagalCharges').val(this.LegalCharges);
            // $('#legalChargeInvNo').show();
            this.legalChargeInvoiceNo = this.finBokAccInvoiceNo;


            console.log(this.legalChargeInvoiceNo);

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
        //setting default values when didn't get id from backend
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
  /*--------------------------Mis Receipt Online data End------------------*/

  /*-----------------get Pending And Interest Amount Start---------------------*/
  getPendingAndInterestAmount() {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/viewPendingAmount.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: headers });

    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "flatIds": this.flatID,//[1087]
      "bookingFormId": this.flatBookingId,
      "requestUrl": "approveTransaction",
      "transactionTypeId": "" + this.viewTransactionResponse.transactionTypeId,
      "transactionModeId": "" + this.viewTransactionResponse.transactionModeId,
      "transactionTypeName": "" + this.viewTransactionResponse.transactionTypeName,
      "transactionModeName": "" + this.viewTransactionResponse.transactionModeName,
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

  /*-------------------------file location start---------------------------*/
  viewFiles(location) {

    window.open(location, '_system', 'location=yes,closebuttoncaption=Fechar,enableViewportScale=no');

  }
  /*-------------------------file location end---------------------------*/

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
      "bookingFormId": this.flatBookingId,
      "condition": "CRM_COMMENTS",
      "requestUrl": this.requesturl,
      "transactionTypeId": "" + this.viewTransactionResponse.transactionTypeId,
      "transactionModeId": "" + this.viewTransactionResponse.transactionModeId,
      "transactionTypeName": "" + this.viewTransactionResponse.transactionTypeName,
      "transactionModeName": "" + this.viewTransactionResponse.transactionModeName,
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
            console.log(this.modificationChargeInvoiceNo);

            if (resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo == this.modificationChargeInvoiceNo) {
              this.modificationInvoiceNumber = resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo;
              this.ModificationdocumentLocation = resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].documentLocation;
            }
          } else if (this.setOffTypeName == "LEGAL_COST") {
            $('#LegalInvoiceId').append("<option value='" + resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo + "'>" + resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo + "</option>");
            //   $('#LegalInvoiceId').val(this.legalChargeInvoiceNo);
            console.log(this.legalChargeInvoiceNo);
            if (resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo == this.legalChargeInvoiceNo) {
              this.legalChargeInvoiceNumber = resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo;
              this.documentLocationname = resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].documentLocation;
            }
          } else if (this.setOffTypeName == "CAR_PARKING_COST") {
            $('#carparkingInvoiceId').append("<option value='" + resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo + "'>" + resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo + "</option>");

            if (resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo == this.carparkingInvoiceID) {
              this.carparkingInvoiceNumber = resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo;
              carparkingLocationname = resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].documentLocation;
            }


          }
        }


      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        // swal(resp.status);
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

  /*--------------------------Approve/Reject MIS Receipt Online start------------------*/
  approveMisReceiptOnline(approve) {





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

    console.log(this.banknamevalue);
    console.log(this.banknametext);


    if ($("#transactionDateID").val() == "") {
      swal("Please select received date");
      return false;
    }

    if ($("#transactionAmountID").val() == "") {
      swal("Please enter transaction amount");
      return false;
    }

    if ($("#transactionAmountID").val() == "") {
      swal("Please enter transaction amount");
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



    if (($("#PrincipalAmount").val() == "0" || $("#PrincipalAmount").val() == "")
      && ($("#ModificationCharges").val() == "0" || $("#ModificationCharges").val() == "")
      && ($("#InterstAmount").val() == "0" || $("#InterstAmount").val() == "")
      && ($("#LeagalCharges").val() == "0" || $("#LeagalCharges").val() == "")
      && ($("#refundableAdvanceID").val() == "0" || $("#refundableAdvanceID").val() == "") && ($('#TdsAmount').val() == "0" || $('#TdsAmount').val() == "") && this.CorpusFund == "0" && this.MaintinaceCharges == "0" && this.FlatKhataBifurcation == "0" && this.carparkingcost_amount == "0" && this.Registration_And_Mutation_Charges == "0" && this.Non_refundable_Caution_Deposit == "0" && this.Electricity_Deposit == "0") {
      swal("Please enter Principle amount (OR) Corpus Fund (OR) Maintenance Charges (OR) Flat Khata Bifurcation (OR) Interest amount (OR) Modification charges (OR) Legal charges (OR) Refundable Advance (OR) Car parking cost (OR) Registration And Mutation Charges (OR) Non-refundable Caution Deposit (OR) Electricity Deposit");
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

    // if ((Number($('#PrincipalAmount').val()) + Number($('#InterstAmount').val()) + Number($('#refundableAdvanceID').val()) + Number($('#ModificationCharges').val())
    //   + Number($('#LeagalCharges').val())) + Number(this.CorpusFund) + Number(this.MaintinaceCharges) + Number(this.FlatKhataBifurcation)
    //   + Number($('#TdsAmount').val()) > Number($('#transactionAmountID').val())) {
    //   swal("Payment Setoff amount should not be greater than Transaction amount");
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
    //return false;
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


    // if($('#CustomerCommentsId').val() == ""){
    //   swal("please enter the Comments");
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

      if (this.carparkingInvoiceNumber == undefined) {
        this.carparkingInvoiceNumber = null;
      }

      // if (this.modificationChargeInvoiceNo == "") {
      //   this.modificationChargeInvoiceNo = null;
      // }

      // if (this.legalChargeInvoiceNo == "") {
      //   this.legalChargeInvoiceNo = null;
      // }

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
        "transferModeId": this.transferModeId,
        "referenceNo": "" + this.referenceNum,
        "transactionReceiveDate": "" + milliseconds, //"2020-03-29",
        "transactionAmount": "" + $('#transactionAmountID').val(),
        "flatIds": this.flatID, //[1087],
        "bookingFormId": "" + this.bookingFormID,
        "bankId": this.banknamevalue,
        "bankName": this.banknametext,
        //  "bankAccountNumber":"45454545",
        "siteAccountId": "" + this.siteAccountId,
        "siteBankAccountNumber": "" + this.companyBankAccountNo, //"10000111101",
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
        "buttonType": approve,
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
          swal("Your transaction got approved successfully !!");
          if (resp.responseObjList.fileResponse != null) {
            // window.open(resp.responseObjList.fileResponse.url, "_blank");
            window.open(resp.responseObjList.fileResponse.url, '_system', 'location=yes,closebuttoncaption=Fechar,enableViewportScale=no');

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

    } else { }

  }
  /*--------------------------Approve/Reject MIS Receipt Online End------------------*/


  /*--------------------------Reject and Modify MIS Receipt Online start------------------*/
  rejectAndModifytMisReceiptOnline(rejectAndModify) {


    var date = new Date($("#transactionDateID").val());
    var milliseconds = date.getTime();

    console.log(milliseconds);



    this.banknamevalue = $('#bankNameID').val();

    // this.banknametext = $('#bankNamesID').select2('data')[0].text;
    if (this.banknamevalue == "select" || this.banknamevalue == null) {
      this.banknamevalue = JSON.parse(null);
      this.banknametext = JSON.parse(null);
    } else {
      this.banknamevalue = $('#bankNameID').val();
      this.banknametext = $('#bankNameID').select2('data')[0].text;
    }

    if ($("#carparkingcost").val() == undefined || $("#carparkingcost").val() == "") {
      this.carparkingcost_amount = 0;
    } else {
      this.carparkingcost_amount = $("#carparkingcost").val();
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
        "transferModeName": "" + this.paymentMode,
        "transferModeId": this.transferModeId,
        "referenceNo": "" + this.referenceNum,
        "transactionReceiveDate": "" + milliseconds, //"2020-03-29",
        "transactionAmount": "" + $('#transactionAmountID').val(),
        "flatIds": this.flatID, //[1087],
        "bookingFormId": "" + this.bookingFormID,
        "bankId": this.banknamevalue,
        "bankName": this.banknametext,
        //  "bankAccountNumber":"45454545",
        "siteAccountId": "" + this.siteAccountId,
        "siteBankAccountNumber": "" + this.companyBankAccountNo, //"10000111101",
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
    } else { }
  }
  /*--------------------------Reject MIS Receipt Online End------------------*/

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
    $("#Sourcefound").prop('disabled', condition);
    $("#transactionDateID").prop('disabled', condition);
    $("#transactionAmountID").prop('disabled', condition);
    $("#carparkingcost").prop('disabled', condition);

    $("#Registration_and_Mutation_Charges").prop('disabled', condition);
    $("#Non_refundable_Caution_Deposit").prop('disabled', condition);
    $("#Electricity_Deposit").prop('disabled', condition);


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
      "transferModeId": this.transferModeId,
      "transactionTypeName": this.transactionTypeName,
      "transactionModeName": this.transactionModeName,
      "transferModeName": this.paymentMode,
      "referenceNo": this.referenceNum,
      "transactionReceiveDate": this.transactionReceiveDate,
      "actualTransactionReceiveDate": this.transactionReceiveDate,
      "transactionAmount": "" + $('#transactionAmountID').val(),
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
        this.router.navigateByUrl('View-Completed-Transactions');
      } else if (resp.responseCode == 440) {
        $('.page-loader-wrapper').hide();
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);

      } else {
        $('.page-loader-wrapper').hide();
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0], "error");
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



  /*-----------------Getting Project(site) list Start---------------------*/
  siteList() {

    let url = this.cmn.commonUrl + "financial/raisedMilestoneSites.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "actionUrl": "Receipt Cheque"
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
          //	$('#projectID').formSelect();
          $('#blkcls').show();
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




  siteBankList(siteid) {
    $('.page-loader-wrapper').show();
    // -------------------------------
    let url = this.cmn.commonUrl + "financial/viewFinProjectAccountData.spring";

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
        $("#companybankAcId").val(this.siteAccountId);

      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        //  swal(resp.status);
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


  paidbynamefun(event) {
    if (event.target.value !== "" && event.target.value !== "0") {
      $("#paidbyname").prop("disabled", false);
    } else {
      $("#paidbyname").prop("disabled", true);
      $("#paidbyname").val("select");
      $("#paidbyname").trigger('change');

    }
  }

  carparkingInvoiceNumberfun() {
    window.open(carparkingLocationname);
  }


}
