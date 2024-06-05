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
@Component({
  selector: 'app-crm-receipt-cheque-view',
  templateUrl: './crm-receipt-cheque-view.component.html',
  styleUrls: ['./crm-receipt-cheque-view.component.sass']
})
export class CrmReceiptChequeViewComponent implements OnInit {

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
  viewTransactionResponse: any;
  operationType: string;
  chequeDate: any;
  bankType: any;
  transactionFor: any;
  cheqrecDate: any;
  site_Id: any;
  block_Id: any;
  flat_Id: any;
  flatBookingId: any;
  siteAccountId: any;
  setOffTypeName: any;
  setOffAmount: any;
  finBokAccInvoiceNo: any;
  legalChargeInvoiceID: any;
  modificationChargeInvoiceID: any;
  customerCommentsArray: any;
  metadataName: any;
  custComments: any;
  customerComments: any;
  finTransactionEntryDetails: any;
  previousCRMComments: any;
  transactionEntryId: any;
  paymentchequebutton_hide_show: boolean;
  docListArray: any = [];
  fileInfo: any = [];
  lastTransactionEditedDate: any;
  lastTransactionEditedBy: any;

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
  paymentMode: any;
  referenceNum: any;
  transactionStatusNameval: any;
  transactionReceiptNo: any;
  documentLocationdata: any;
  paidByName: any;
  sourceOfFunds: any;
  hideme: boolean;
  hideme1: boolean;
  deptid: any;
  roleid: any;
  finTransactionSetOffId: any;
  finpaidbyname: any;
  bankName: any;
  bindingbankname: any;
  bindingbankid: any;
  controllerdata: any;
  modificationChargeInvoiceNo: any;
  modificationInvoiceNumber: any;
  legalChargeInvoiceNo: any;
  legalChargeInvoiceNumber: any;
  documentLocationname: string;
  ModificationdocumentLocation: string;
  requesturl: string;

  CorpusFund: any;
  MaintinaceCharges: any;
  FlatKhataBifurcation: any;
  CorpusFund_amount: any;
  carparkingInvoiceID: any;
  carparkingInvoiceNumber: any;
  carparkingLocationname: any;
  Registration_And_Mutation_Charges: any;
  Non_refundable_Caution_Deposit: any;
  Electricity_Deposit: any;

  constructor(private cmn: CommonComponent, private http: Http, private router: Router) {

    //sessionStorage.setItem("headtitle" , "View Temporary Transactions");
    this.deptid = sessionStorage.getItem("session_deptid");
    this.roleid = sessionStorage.getItem("session_roleId");


    if (sessionStorage.getItem("headtitle") == "View Temporary Transactions") {
      this.hideme1 = true;
      this.hideme = false;
    } else {
      this.hideme = true;
      this.hideme1 = false;
    }

    this.viewTransactionResponse = eval('(' + sessionStorage.getItem('view_transaction_data') + ')');
    console.log(JSON.stringify(this.viewTransactionResponse));



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
    this.transactionReceiptNumber = this.controller['chequeOrReferenceNo'];
    this.transactionStatusNameval = this.controller['transactionStatusName'];


    this.transactionEntryId = this.viewTransactionResponse.transactionEntryId;
    this.operationType = this.viewTransactionResponse.operationType;
    $('.page-loader-wrapper').hide();
    // checkedornot = false;


    this.bindingDetails();
  }

  ngOnInit() {

    $("#paidbyname").prop("disabled", true);


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
    var date = new Date().getMonth();
    var minimumdate = new Date().setMonth(date - 3);
    var maximumdate = new Date().setMonth(date + 3);

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

      $('#refunableCharges').bind("cut copy paste", function (e) {
        e.preventDefault();
      });

      // $('#checlist').click(function(){
      //   if($(this).prop("checked") == true){
      //     $("#PaymentSetOffDiv").show();
      //   }else{}
      // }); 


      $("#Sourcefound").select2({
        placeholder: "Source of funds",
        dir: "ltl"
      });

      $("#paidbyname").select2({
        placeholder: "Paid By",
        dir: "ltl"
      });






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

      $("#transaction_mode").select2({
        placeholder: "Search Transacion Mode",
        dir: "ltl"
      });


      $('#bank_type').change(function (event) {
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
        self.siteBankList(siteId);

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
        minDate: new Date(minimumdate),
        maxDate: new Date(),
        clearButton: true,
        weekStart: 1,
        time: false,
      }).on('change', function (e, date) {
        $('#ChequeRecDate').bootstrapMaterialDatePicker('setMinDate', date);
      });

      $('#ChequeRecDate').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
        minDate: new Date(minimumdate),
        maxDate: new Date(),
        clearButton: true,
        weekStart: 1,
        time: false,
      })


      //  $('#ChequeDate').bootstrapMaterialDatePicker({
      //   format: 'YYYY-MM-DD',
      //   minDate: new Date(minimumdate),
      //   maxDate: new Date(maximumdate),
      //   clearButton: true,
      //   weekStart: 1,
      //   time: false
      // });
      // $('#ChequeRecDate').bootstrapMaterialDatePicker({
      //   format: 'YYYY-MM-DD',
      //   minDate: new Date(minimumdate),
      //   maxDate: new Date(maximumdate),
      //   clearButton: true,
      //   weekStart: 1,
      //   time: false
      // });



      $('#ChequeAmount').bind("cut copy paste", function (e) {
        e.preventDefault();
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
      // $('#checlist').click(function(){
      //   if($(this).prop("checked") == true){
      //     $("#PaymentSetOffDiv").show();
      //   }else{}
      // }); 


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


  /*------------------------Transaction type start-------------------*/
  transactionType() {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/viewFinTransactionTypeModeData.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "condition": "fetchAllData"
    }

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#bank_type').html('');
        $('#bank_type').append('<option value="select">--Select--</option>');
        $('#transaction_type').html('');
        $('#transaction_type').append('<option value="select">--Select--</option>');
        $('#transaction_mode').html('');
        $('#transaction_mode').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.finTrnasactionTypeResponseList.length; i++) {
          $('#transaction_type').append("<option value='" + resp.responseObjList.finTrnasactionTypeResponseList[i].transactionTypeId + "'>" + resp.responseObjList.finTrnasactionTypeResponseList[i].name + "</option>");

        }
        $('#transaction_type').val(this.viewTransactionResponse.transactionTypeId);

        for (var i = 0; i < resp.responseObjList.finTransactionModeResponseList.length; i++) {

          $('#transaction_mode').append("<option value='" + resp.responseObjList.finTransactionModeResponseList[i].transactionModeId + "'>" + resp.responseObjList.finTransactionModeResponseList[i].name + "</option>");


        }
        $('#transaction_mode').val(this.transactionFor);

        for (var i = 0; i < resp.responseObjList.finBankResponseList.length; i++) {
          $('#bank_type').append("<option value='" + resp.responseObjList.finBankResponseList[i].finBankId + "'>" + resp.responseObjList.finBankResponseList[i].bankName + "</option>");


        }
        $('#bank_type').val(this.bankType);
        //  $("transaction_mode option[value="+this.viewTransactionResponse.transactionModeId+"]").attr("selected", "selected");
        // $('#transaction_mode').val(this.viewTransactionResponse.transactionModeId);

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
  /*------------------------Transaction type end-------------------*/



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



  /*-----------------Getting Project(site) list Start---------------------*/
  siteList() {

    let url = this.cmn.commonUrl + "financial/raisedMilestoneSites.spring";
    // http://106.51.38.64:9999/employeeservice/site/site.spring
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
        $('#ProjectId').val(this.site_Id)
        this.blockList(this.site_Id);
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
        $('.page-loader-wrapper').hide();
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }
  /*-----------------Getting Project(site) list End---------------------*/

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
          //	$('#projectID').formSelect();

        }
        // if(this.operationType == "approveTransaction"){
        //   $("#BlockId").attr("disabled", false) 

        // }else{
        //   $("#BlockId").attr("disabled", true)
        // }
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

      if (resp.responseCode == 200) {

        $('.page-loader-wrapper').hide();
        $('#FaltId').html('');
        $('#FaltId').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#FaltId').append("<option value='" + resp.responseObjList[i].flatId + "-" + resp.responseObjList[i].flatBookingId + "'>" + resp.responseObjList[i].flatNo + "</option>");
          //	$('#projectID').formSelect();
          // $("#FaltId").attr("disabled", false) 
        }
        // if(this.operationType == "approveTransaction"){
        //   $("#FaltId").attr("disabled", false)

        // }else{
        //   $("#FaltId").attr("disabled", true)
        // }
        $("#PaymentSetOffDiv").show();
        $("#FaltId").val(this.flat_Id + "-" + this.flatBookingId);
        this.gridDetails(this.flat_Id);
        this.modification_legalInvoiceList(this.flat_Id);
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

        this.controllerdata = resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList;
        for (var i = 0; i < resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList.length; i++) {
          this.setOffTypeName = resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].metadataName;

          // console.log(this.setOffTypeName);

          if (this.setOffTypeName == "MODIFICATION_COST") {
            $('#ModificationInvoiceId').append("<option value='" + resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo + "'>" + resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo + "</option>");
            //  $('#ModificationInvoiceId').val(this.modificationChargeInvoiceNo);
            if (resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo == this.modificationChargeInvoiceID) {
              this.modificationInvoiceNumber = resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo;
              this.ModificationdocumentLocation = resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].documentLocation;
            }
          } else if (this.setOffTypeName == "LEGAL_COST") {
            $('#LegalInvoiceId').append("<option value='" + resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo + "'>" + resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo + "</option>");
            //   $('#LegalInvoiceId').val(this.legalChargeInvoiceNo);
            if (resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo == this.legalChargeInvoiceID) {
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
  CRMReceiptChequeSubmit() {
    if (selectbankNameValue !== undefined && selectbanknametext !== undefined) {
      this.bindingbankname = selectbanknametext;
      this.bindingbankid = selectbankNameValue;
    } else if (this.bankType !== null && this.bankName !== null) {
      this.bindingbankname = this.bankName;
      this.bindingbankid = this.bankType;
    } else {
      this.bindingbankname = null;
      this.bindingbankid = null;
    }

    if ($("#transaction_type").val() == "select") {
      swal("Please select transaction type");
      $('#transaction_type').focus();
      return false;
    }

    if ($("#transaction_mode").val() == "select") {
      swal("Please select transaction mode");
      $('#transaction_mode').focus();
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

    if ($("#ChequeRecDate").val() == "") {
      swal("Please select cheque received date");
      //$('#ChequeRecDate').focus();
      return false;
    }

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
      swal("Please select flat");
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




    if ($("#PrincipalAmount").val() == "0" && $("#ModificationCharges").val() == "0" && $("#InterstAmount").val() == "0" && $("#LeagalCharges").val() == "0" && $("#refunableCharges").val() == "0" && $('#TdsAmount').val() == "0" && this.CorpusFund == "0" && this.MaintinaceCharges == "0" && this.FlatKhataBifurcation == "0" && this.Registration_And_Mutation_Charges == "0" && this.Non_refundable_Caution_Deposit == "0" && this.Electricity_Deposit == "0") {
      swal("Please enter Principle amount (OR) Corpus Fund (OR) Maintenance Charges (OR) Flat Khata Bifurcation (OR) modification charges (OR) Interest amount (OR)  Legal charges (OR) Refunable Advance (OR) Registration And Mutation Charges (OR) Non-refundable Caution Deposit (OR) Electricity Deposit");
      return false;
    }



    if ($("#ModificationCharges").val() != "0") {
      if ($("#ModificationInvoiceId").val() == "select") {
        $("#ModificationInvoiceId").attr("disabled", false);
        swal("Please select modification invoice");
        $('#ModificationInvoiceId').focus();
        return false;
      }
    }

    if ($("#LeagalCharges").val() != "0") {
      $("#LegalInvoiceId").attr("disabled", false);
      if ($("#LegalInvoiceId").val() == "select") {
        swal("Please select legal invoice");
        $('#LegalInvoiceId').focus();
        return false;
      }

    }





    if ((Number($('#PrincipalAmount').val()) + Number($('#refunableCharges').val()) + Number($('#ModificationCharges').val())
      + Number($('#InterstAmount').val()) + Number($('#LeagalCharges').val())) + Number(this.CorpusFund) + Number(this.MaintinaceCharges) + Number(this.FlatKhataBifurcation)
      + Number($('#TdsAmount').val()) + Number(this.Registration_And_Mutation_Charges) + Number(this.Non_refundable_Caution_Deposit) + Number(this.Electricity_Deposit)

      > Number($('#ChequeAmount').val())) {

      swal("Payment Setoff should be equal to Cheque amount");
      return false
    }

    if ((Number($('#PrincipalAmount').val()) + Number($('#refunableCharges').val()) + Number($('#ModificationCharges').val()) + Number($('#InterstAmount').val())
      + Number($('#LeagalCharges').val())) + Number(this.CorpusFund) + Number(this.MaintinaceCharges) + Number(this.FlatKhataBifurcation)
      + Number($('#TdsAmount').val()) + Number(this.Registration_And_Mutation_Charges) + Number(this.Non_refundable_Caution_Deposit) + Number(this.Electricity_Deposit) < Number($('#ChequeAmount').val())) {

      swal("Payment Setoff should be equal to Cheque amount");
      return false
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

    // if ($("#companybankAcId").val() == "select") {
    //   swal("Please select company bank account");
    //   $('#companybankAcId').focus();
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

      if (this.filename == undefined) {
        //   swal("Please attach file");
        // $('#files').focus();
        this.tempfileInfo = [];
        //  return false;

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


      if (this.finTransactionSetOffId == undefined || this.finTransactionSetOffId == "undefined" || this.finTransactionSetOffId == "") {
        this.finTransactionSetOffId = 0;
      }

      $('.page-loader-wrapper').show();
      // -------------------------------
      let url = this.cmn.commonUrl + "financial/saveFinancialTransactionReceiptRequest.spring";



      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      var body = {
        "sessionKey": sessionStorage.getItem("login_sessionkey"),
        "bookingFormId": flatId_bookingid,
        "siteId": $("#ProjectId").val(),
        "siteName": $('#ProjectId').select2('data')[0].text,
        "transactionTypeId": $("#transaction_type").val(),
        "transactionModeId": $("#transaction_mode").val(),
        "transactionTypeName": $('#transaction_type').select2('data')[0].text,
        "transactionModeName": $('#transaction_mode').select2('data')[0].text,
        "chequeNumber": $("#ChequeNumber").val(),
        "transactionDate": new Date($("#ChequeDate").val()).getTime(),
        "transactionReceiveDate": new Date($("#ChequeRecDate").val()).getTime(),
        "transactionAmount": $("#ChequeAmount").val(),
        //"payableAmount":$("#PayableAmount").val(),
        "chequeBounceValue": "false",
        "blockIds": [$("#BlockId").val()],
        "floorIds": [],
        "flatIds": [flatId],
        "bankId": this.bindingbankid,
        "bankName": this.bindingbankname,
        "siteAccountId": $("#companybankAcId").val(),
        "siteBankAccountNumber": null,
        "paymentSetOff": "true",
        "sourceOfFunds": $("#Sourcefound").val(),
        "paymentSetOffDetails": [{ "setOffTypeName": "Principal_Amount", "amount": $("#PrincipalAmount").val() }
          , { "setOffTypeName": "Fin_Penalty", "amount": $("#InterstAmount").val() }
          , { "setOffTypeName": "Refundable_Advance", "amount": $("#refunableCharges").val(), "invoiceNo": "" }
          , { "setOffTypeName": "Modification_Cost", "amount": $("#ModificationCharges").val(), "invoiceNo": $("#ModificationInvoiceId").val() }
          , { "setOffTypeName": "Legal_Cost", "amount": $("#LeagalCharges").val(), "invoiceNo": $("#LegalInvoiceId").val() }
          , { "finTransactionSetOffId": this.finTransactionSetOffId, "setOffTypeName": "TDS", "amount": $("#TdsAmount").val(), "paidByName": this.finpaidbyname }
          , { "setOffTypeName": "Maintenance_Charge", "amount": this.MaintinaceCharges }
          , { "setOffTypeName": "Corpus_Fund", "amount": this.CorpusFund }
          , { "setOffTypeName": "Individual_Flat_Khata_bifurcation_and_other_charges", "amount": this.FlatKhataBifurcation }
          , { "setOffTypeName": "Registration_And_Mutation_Charges", "amount": this.Registration_And_Mutation_Charges }
          , { "setOffTypeName": "Non_refundable_Caution_Deposit", "amount": this.Non_refundable_Caution_Deposit }
          , { "setOffTypeName": "Electricity_Deposit", "amount": this.Electricity_Deposit }


        ],
        "comments": [{ "CUSTOMER": $("#CustomerCommentsId").val() }],
        "comment": $("#CrmCommentsId").val(),
        "projectAccountNumber": null,
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
          $('.page-loader-wrapper').hide();
          swal("Transaction sent successfully")
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
  handle_FileSelect(evt) {
    // $("#myfilebinding").show();
    this.fileExtension_array = [];
    this.file_name_array1 = [];
    this.base64_array_object_data1 = [];
    this.File_Info1 = [];

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
    base64textString = btoa(this.binaryString);
  }

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

    console.log(body);

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      console.log(resp);
      console.log(JSON.stringify(resp));

      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 200) {


        // this.lastTransactionEditedDate = resp.responseObjList.lastTransactionEditedDate;
        // this.lastTransactionEditedBy = resp.responseObjList.lastTransactionEditedBy;

        $("#ChequeNumber").val(resp.responseObjList.finTransactionEntryDetailsResponseList[0].chequeNumber);
        this.chequeDate = resp.responseObjList.finTransactionEntryDetailsResponseList[0].chequeDate;
        $("#ChequeAmount").val(resp.responseObjList.finTransactionEntryDetailsResponseList[0].transactionAmount);
        this.bankName = resp.responseObjList.finTransactionEntryDetailsResponseList[0].bankName;
        this.bankType = resp.responseObjList.finTransactionEntryDetailsResponseList[0].finBankId;

        this.transactionFor = resp.responseObjList.finTransactionEntryDetailsResponseList[0].transactionModeId
        this.cheqrecDate = resp.responseObjList.finTransactionEntryDetailsResponseList[0].transactionReceiveDate;
        this.sourceOfFunds = resp.responseObjList.finTransactionEntryDetailsResponseList[0].sourceOfFunds;
        //$("#PayableAmount").val(resp.responseObjList.finTransactionEntryDetailsResponseList[0].payableAmount);

        this.site_Id = resp.responseObjList.customerPropertyDetailsInfoList[0].siteId;
        this.block_Id = resp.responseObjList.customerPropertyDetailsInfoList[0].blockId;
        this.flat_Id = resp.responseObjList.customerPropertyDetailsInfoList[0].flatId;
        this.flatBookingId = resp.responseObjList.customerPropertyDetailsInfoList[0].flatBookingId;
        this.siteAccountId = resp.responseObjList.finTransactionEntryDetailsResponseList[0].siteAccountId;
        this.transactionReceiptNo = resp.responseObjList.finTransactionEntryDetailsResponseList[0].transactionReceiptNo;

        this.documentLocationdata = resp.responseObjList.finTransactionEntryDetailsResponseList[0].transactionReceiptDocResponsesList;


        console.log(this.documentLocationdata);

        for (var i = 0; i < resp.responseObjList.finTransactionEntryDetailsResponseList[0].finTransactionSetOffResponseList.length; i++) {
          this.setOffTypeName = resp.responseObjList.finTransactionEntryDetailsResponseList[0].finTransactionSetOffResponseList[i].setOffTypeName;
          this.setOffAmount = resp.responseObjList.finTransactionEntryDetailsResponseList[0].finTransactionSetOffResponseList[i].setOffAmount;
          this.paidByName = resp.responseObjList.finTransactionEntryDetailsResponseList[0].finTransactionSetOffResponseList[i].paidByName;

          if (this.setOffTypeName == "Corpus_Fund") {

            this.CorpusFund_amount = this.setOffAmount;
            $('#CorpusFund').val(this.CorpusFund_amount);


          } else if (this.setOffTypeName == "MODIFICATION_COST") {
            $('#ModificationCharges').val(this.setOffAmount);
            // $('#ModificationInvoiceId').val(this.modificationChargeInvoiceID);
            this.modificationChargeInvoiceID = resp.responseObjList.finTransactionEntryDetailsResponseList[0].finTransactionSetOffResponseList[i].finBokAccInvoiceNo;

          } else if (this.setOffTypeName == "FIN_BOOKING_FORM_MILESTONES") {
            $('#PrincipalAmount').val(this.setOffAmount);
          } else if (this.setOffTypeName == "LEGAL_COST") {
            $('#LeagalCharges').val(this.setOffAmount);
            //$('#LegalInvoiceId').val(this.legalChargeInvoiceID);
            this.legalChargeInvoiceID = resp.responseObjList.finTransactionEntryDetailsResponseList[0].finTransactionSetOffResponseList[i].finBokAccInvoiceNo;

          } else if (this.setOffTypeName == "FIN_PENALTY") {
            $('#InterstAmount').val(this.setOffAmount);
          } else if (this.setOffTypeName == "REFUNDABLE_ADVANCE") {
            $('#refunableCharges').val(this.setOffAmount);
          } else if (this.setOffTypeName == "TDS") {
            this.finTransactionSetOffId = resp.responseObjList.finTransactionEntryDetailsResponseList[0].finTransactionSetOffResponseList[i].finTransactionSetOffId;
            $("#TdsAmount").val(this.setOffAmount);
            $("#paidbyname").val(this.paidByName);
            if (this.setOffAmount !== null) {
              $("#paidbyname").prop("disabled", false);
            }

          } else if (this.setOffTypeName == "Maintenance_Charge") {
            $("#MaintinaceCharges").val(this.setOffAmount);

          } else if (this.setOffTypeName == "Corpus_Fund") {
            $("#CorpusFund").val(this.setOffAmount);

          } else if (this.setOffTypeName == "Individual_Flat_Khata_bifurcation_and_other_charges") {
            $("#FlatKhataBifurcation").val(this.setOffAmount);
          } else if (this.setOffTypeName == "CAR_PARKING_COST") {
            $('#carparkingcost').val(this.setOffAmount);
            this.carparkingInvoiceID = resp.responseObjList.finTransactionEntryDetailsResponseList[0].finTransactionSetOffResponseList[i].finBokAccInvoiceNo;
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

            console.log(convertbasesixtyfour);
          })
        }

        this.customerCommentsArray = resp.responseObjList.finTransactionEntryDetailsResponseList[0].finTransactionCommentsResponseList;


        for (let i = 0; i < this.customerCommentsArray.length; i++) {

          this.metadataName = this.customerCommentsArray[i].metadataName;


          this.custComments = this.customerCommentsArray[i].comments;


          if (this.metadataName == "CUSTOMER") {
            this.customerComments = this.custComments;
          }
          this.finTransactionEntryDetails = resp.responseObjList.finTransactionEntryDetailsResponseList[0];
          this.previousCRMComments = this.finTransactionEntryDetails.finTransactionApprStatResponseList;
        }


        //$("#bank_type option:selected").val(resp.responseObjList.finTransactionEntryDetailsResponseList[0].finBankId)



        this.transactionType();
        this.siteList();

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

  backfun() {
    this.router.navigateByUrl("View-Completed-Transactions");
  }

  backfun1() {
    this.router.navigateByUrl("View-Pending-Transactions-Status");
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

}
