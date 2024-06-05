import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { unwatchFile } from 'fs';
import { DomSanitizer } from '@angular/platform-browser';

declare const $: any;
declare const swal: any;

var base64textString;
var checkedornot;
var flatId;
var flatId_bookingid;
var siteidsvalue;
var invoicedetails_url;
var ModificationInvoice_url;
var lagelinvoicenumber;
var modificationinvoice;
var cheque_number_value;
var Cheque_amountfun;

@Component({
  selector: 'app-approve-waive-off',
  templateUrl: './approve-waive-off.component.html',
  styleUrls: ['./approve-waive-off.component.sass']
})
export class ApproveWaiveOffComponent implements OnInit {

  [x: string]: any;
  chequereceiptform: FormGroup;
  submitted: boolean;
  totalPenaltyAmount: any;
  totaldueamount: any;
  customerName: any;
  fileExtension_array: any[];
  file_name_array1: any[];
  tempfileInfo: Array<any> = [];
  base64_array_object_data1: any[];
  File_Info1: any[];
  binaryString: any;
  base64textString: string;
  filename: any;
  filename_extension: any;
  setOffTypeName: any;

  controller: number[];
  blockidval: any;
  blockIDvalue: any[];
  bookingformIDS: any;
  paidbynamehideme: boolean;
  public edited = false;
  filenameval: any;
  urls: Array<any> = [];
  filemode: Array<any> = [];
  ortitle: boolean;
  public fileName;
  extensiontype: any;
  filetypeurlsplit: any;
  filetypeurlsplit1: any;
  filenamedoc: any;
  filesplitdata: any;
  imgsrc: any;

  fileUrl: any;
  imageUrl: string | ArrayBuffer;
  base64_array_object_data: any = [];
  finpaidbyname: any;
  customerbankid: any;
  customerbankname: any;
  controllerdata: any;
  CorpusFund: any;
  MaintinaceCharges: any;
  FlatKhataBifurcation: any;
  deptid: any;
  roleid: any
  transactionAmount: any;
  chequeNumber: any;
  bankId: any;



  constructor(private cmn: CommonComponent, private http: Http, private router: Router,
    private formBuilder: FormBuilder, private sanitizer: DomSanitizer) {
    $('.page-loader-wrapper').hide();
    this.deptid = sessionStorage.getItem("session_deptid");
    this.roleid = sessionStorage.getItem("session_roleId");

    var json_response;
    json_response = eval('(' + sessionStorage.getItem('view_transaction_data') + ')');
    this.viewTransactionResponse = json_response;
    this.controller = this.viewTransactionResponse;
    console.log(this.controller);
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
    console.log(this.transactionStatusNameval);
    this.operationType = this.viewTransactionResponse.operationType;
    console.log(this.operationType);

    this.transactionType_namefun();
    this.siteList();
    this.getMisPaymentChequeData();
  }

  ngOnInit() {
    $("#paidbyname").prop("disabled", true);
    $("#ProjectId").select2({
      placeholder: "Select Project",
      dir: "ltl",
    });

    $("#BlockId").select2({
      placeholder: "Select Block",
      dir: "ltl"
    });



    $("#FaltId").select2({
      placeholder: "--Select--",
      dir: "ltl"
    });

    $("#paidbyname").select2({
      placeholder: "--Select--",
      dir: "ltl"
    });

    $("#LegalInvoiceId").select2({
      placeholder: "--Select--",
      dir: "ltl"
    });

    $("#ModificationInvoiceId").select2({
      placeholder: "--Select--",
      dir: "ltl"
    });

    var self = this;

    $(function () {
      $('#ProjectId').change(function (e) {
        var siteId = $(e.target).val();
        siteidsvalue = $(e.target).val();
        if ($(e.target).val() == "select") {
          $("#BlockId option[value]").remove();
          $("#FaltId option[value]").remove();


        } else {
          self.blockList(siteId);

          self.flatsitewisechange(siteId);
        }



      });

      $('#BlockId').change(function (e) {
        var siteId = $(e.target).val();
        if ($(e.target).val() == "select") {
          self.flatsitewisechange(siteidsvalue);
        } else {
          self.flatList(siteId);
        }
      });

      $('#FaltId').change(function (e) {
        if ($(e.target).val() == "select") {
          $(".viewinvoicecls").hide();
          $(".Modificationinvoicecls").hide();
        }

        flatId = $(e.target).val().split('-')[0];

        flatId_bookingid = $(e.target).val().split('-')[1];
        this.bookingformIDS = $(e.target).val().split('-')[1];
        self.forFlatbookingIdkList(flatId);
        setTimeout(() => {

          self.modification_legalInvoiceList(this.bookingformIDS, flatId);
        }, 1000);




      });

      $("#LegalInvoiceId").change(function (e) {
        if ($(e.target).val() !== 'select') {
          $(".viewinvoicecls").show();
          invoicedetails_url = $(e.target).val().split('$$')[1];
          lagelinvoicenumber = $(e.target).val().split('$$')[0];

        } else {
          $(function () {
            $(".viewinvoicecls").hide();
          });
        }
      });



      $("#ModificationInvoiceId").change(function (e) {
        if ($(e.target).val() !== 'select') {
          $(".Modificationinvoicecls").show();
          ModificationInvoice_url = $(e.target).val().split('$$')[1];
          modificationinvoice = $(e.target).val().split('$$')[0];
        } else {
          $(function () {
            $(".Modificationinvoicecls").hide();
          })
        }
      });

    });




    $("#paidbyname").prop("disabled", true);
    if (this.operationType == 'approveTransaction' && this.transactionStatusNameval !== "Uncleared Cheque") {
      this.pathName = "View Pending Transactions for Approval";
      this.disableEnableEditableFields(true);
      $("#actionButtons").show();
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

      $('#actionButtons').hide();
      $('#userCommentsLabel').hide();
      $('#userCommentsField').hide();
      $('#chequeDepositedDateLabel').hide();
      $('#chequeDepositedDateField').hide();

      this.deptid = sessionStorage.getItem("session_deptid");

      if (this.operationType == 'loadCompletedTransaction' && this.deptid == 993) {
        this.disableEnableEditableFields(false);
      } else {
        this.disableEnableEditableFields(true);
      }


    } else if (this.transactionStatusNameval == "Uncleared Cheque") {
      this.pathName = "Uncleared Cheque";

    } else if (this.operationType == 'modifyTransaction') {
      $('#actionButtons').hide();
      $('#userCommentsLabel').hide();
      $('#userCommentsField').hide();
      $('#chequeDepositedDateLabel').hide();
      $('#chequeDepositedDateField').hide();

      this.disableEnableEditableFields(false);

    } else if(this.operationType == 'ViewCustomerData') {
      this.pathName = "View Customer Data";
      $('#actionButtons').hide();
      $('#userCommentsLabel').hide();
      $('#userCommentsField').hide();
      $('#chequeDepositedDateLabel').hide();
      $('#chequeDepositedDateField').hide();
    }



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
    } else if(this.operationType == 'ViewCustomerData') {
      this.router.navigate(['shortcut-components']);
    }



  }


  waivekeyPressAmount(event: any) {
    if (event.which === 32 && event.target.selectionStart === 0) {
      return false;
    } else {
      const pattern = /^\S/;
      const inputChar = String.fromCharCode(event.charCode);
      if (event.keyCode !== 8 && !pattern.test(inputChar)) {
        event.preventDefault();
      }
    }
  }


  getToday(): string {
    return new Date().toISOString().split('T')[0]
  }


  viewinvoicefun() {

    window.open(invoicedetails_url);
  }

  Modificationfun() {
    window.open(ModificationInvoice_url);
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
  homeClick() {
    this.cmn.commonHomeNavigation();
  }

  modificationInvoice(event: any) {
    $("#ModificationInvoiceId").attr("disabled", false);
  }

  legalInvoice(event: any) {
    $("#LegalInvoiceId").attr("disabled", false);
  }

  keyPress(event: any) {
    const pattern = /[0-9\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  keyPressAmount(event: any) {
    const pattern = /[0-9\.\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }





  Cheque_amountfun(event: any) {
    console.log(event.target.value);
    Cheque_amountfun = event.target.value;
  }


  /*-----------------Getting Flat list start---------------------*/
  forFlatbookingIdkList(flatid) {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/activeBlocksFlats.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "flatIds": [flatid]
    }



    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {


      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        flatId = resp.responseObjList[0].flatId;
        flatId_bookingid = resp.responseObjList[0].flatBookingId;

        this.bookingformIDS = resp.responseObjList[0].flatBookingId;
        console.log(flatId_bookingid);
        this.gridDetails(flatId, flatId_bookingid);






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
  /*-----------------Getting Flat list End---------------------*/

  /*-----------------Getting grid details start---------------------*/
  gridDetails(flatId, bookingformIDS) {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/viewPendingAmount.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "flatIds": [flatId],//$("#FaltId").val()
      "requestUrl": "createTransaction",
      "transactionTypeId": "1",
      "transactionModeId": "1",
      "transactionTypeName": "Receipt",
      "transactionModeName": "Cheque",
      "bookingFormIds": [bookingformIDS],
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
  modification_legalInvoiceList(bookingFormID, flatID) {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/viewPendingAmount.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "flatIds": [flatID].map(Number),//$("#FaltId").val(),
      "condition": "CRM_COMMENTS",
      "requestUrl": "createTransaction",
      "transactionTypeId": "1",
      "transactionModeId": "5",
      "transactionTypeName": "Receipt",
      "transactionModeName": "waived off",
      "bookingFormIds": [bookingFormID],
    }

    console.log(url);
    console.log(JSON.stringify(body));

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

      console.log(JSON.stringify(resp));

      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        $('#ModificationInvoiceId').html('');
        $('#LegalInvoiceId').html('');
        $('#LegalInvoiceId').append('<option value="select">--Select--</option>');
        $('#ModificationInvoiceId').append('<option value="select">--Select--</option>');

        console.log(resp.responseObjList.financialProjectMileStoneResponse);
        if (resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList.length != 0) {
          for (var i = 0; i < resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList.length; i++) {
            this.setOffTypeName = resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].metadataName;

            this.controllerdata = resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i];

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
            }




          }
        } else {
          $(".viewinvoicecls").hide();
          $(".Modificationinvoicecls").hide();
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

  /*------------------------Transaction type start-------------------*/
  transactionType_namefun() {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/viewFinTransactionTypeModeData.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "condition": "fetchPaymentData"
    }

    console.log(url);
    console.log(JSON.stringify(body));

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      console.log(resp);

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
  /*------------------------Transaction type end-------------------*/
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

      $('.page-loader-wrapper').hide();
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


        // if (this.paidByName == null || this.paidByName == undefined || this.paidByName == "undefined") {

        // } else {
        //   $('#paidbyname').html("<option value='select'>Select</option>" + "" + "<option value='Customer'>Customer</option>" + "" + "<option value='Sumadhura'>Sumadhura</option>");
        //   $("#paidbyname").val(this.paidByName)
        // }


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
          $("#BlockId").attr("disabled", false)
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
  /*-----------------Getting Blocks list End---------------------*/

  /*-----------------Getting Flats list Start---------------------*/
  flatList(blockid) {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/activeBlocksFlats.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "blockIds": [blockid],//$("#BlockId").val(),
      "siteIds": [$("#ProjectId").val()],
      "actionUrl": "LoadBlockFloorFlatDetails"
    }


    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        $('#FaltId').html('');
        $('#FaltId').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#FaltId').append("<option value='" + resp.responseObjList[i].flatId + "-" + resp.responseObjList[i].flatBookingId + "'>" + resp.responseObjList[i].flatNo + "</option>");
        }
        $("#FaltId").attr("disabled", false)
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
  /*-----------------Getting Flats list End---------------------*/
  flatsitewisechange(siteid) {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "flat/flatSite.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "ids": [siteid],
      "requestUrl": "All"

    }


    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#FaltId').html("");
        this.controller = [0];
        $('#FaltId').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#FaltId').append("<option value='" + resp.responseObjList[i].detId + "'>" + resp.responseObjList[i].name + "</option>");
          this.controller.push(resp.responseObjList[i].detId);
          $("#FaltId").attr("disabled", false)
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
        this.flatID = this.customerPropertyDetails.flatId;
        this.siteID = this.customerPropertyDetails.siteId;





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


        this.gridDetails(this.flatID, this.bookingFormID);
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

        this.transactionReceiveDate = this.finTransactionEntryDetails.transactionReceiveDate;



        var d = new Date(this.transactionReceiveDate);

        var datestring = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);


        //this.transReceiveFormat = transRceiveDate.split('/')[2]+"-"+transRceiveDate.split('/')[0]+"-"+transRceiveDate.split('/')[1];
        console.log(datestring);

        $('#ChequeDate').val(datestring);

        this.payableAmount = this.finTransactionEntryDetails.payableAmount;
        $('#PayableAmount').val(this.payableAmount);

        this.docListArray = resp.responseObjList.finTransactionEntryDetailsResponseList[0].transactionEntryDocResponsesList

         this.sourceOfFunds = resp.responseObjList.finTransactionEntryDetailsResponseList[0].sourceOfFunds;
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
        console.log(this.SetOffResponseList);
        for (let i = 0; i < this.SetOffResponseList.length; i++) {

          this.setOffTypeName = this.SetOffResponseList[i].setOffTypeName;
          this.setOffAmount = this.SetOffResponseList[i].setOffAmount;


          if (this.setOffTypeName == "TDS") {
            this.paidByName = this.SetOffResponseList[i].paidByName;
            console.log(this.paidByName);
            $("#paidbyname").prop("disabled", true);
          }


          // $("#TdsAmount").val(this.setOffAmount);
          // $("#paidbyname").val(this.paidByName);


          this.finBokAccInvoiceNo = this.SetOffResponseList[i].finBokAccInvoiceNo;
          this.setOffID = this.SetOffResponseList[i].finTransactionSetOffId;
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
          } else if (this.setOffTypeName == "TDS") {
            this.finTransactionSetOffId = this.SetOffResponseList[i].finTransactionSetOffId;
            $("#TdsAmount").val(this.setOffAmount);
            $("#paidbyname").val(this.paidByName);
            console.log(this.paidByName);
            if (this.setOffAmount !== null) {
              $("#paidbyname").prop("disabled", true);
            }



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

          this.employee_Comments =  this.finTransactionEntryDetails.finTransactionApprStatResponseList[0].comments;
        }
        this.modification_legalInvoiceList(this.bookingFormID, this.flatID);

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
      this.requesturl = "approveTransaction";
    }


    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/viewPendingAmount.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: headers });

    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "flatIds": [this.flatID],
      "transactionTypeId": "" + this.viewTransactionResponse.transactionTypeId,
      "transactionModeId": "" + this.viewTransactionResponse.transactionModeId,
      "transactionForId": this.viewTransactionResponse.transactionForId,
      "transactionTypeName": "" + this.viewTransactionResponse.transactionTypeName,
      "transactionModeName": "" + this.viewTransactionResponse.transactionModeName,
      "bookingFormId": bookingid,
      "buttonType": "initiatepayemt",
      "requestUrl": this.requesturl,


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
    $('#CorpusFund').prop('disabled', condition);
    $('#MaintinaceCharges').prop('disabled', condition);
    $('#refundableAdvanceID').prop('disabled', condition);
    $('#ChequeDepositedDateID').prop('disabled', condition);
    $("#TdsAmount").prop('disabled', condition);
    $("#Sourcefound").prop('disabled', condition);
    $("#paidbyname").prop('disabled', condition);
    $("#FlatKhataBifurcation").prop("disabled", condition);

    $("#refunableCharges").prop("disabled", condition);
    $("#CustomerCommentsId").prop("disabled", condition);
    $("#ChequeAmount").prop("disabled", condition);
    $("#CrmCommentsId").prop("disabled", condition);

  }

  legalChargeInvoiceNumberfun() {
    window.open(this.documentLocationname);
  }

  modificationInvoiceNumberfun() {
    window.open(this.ModificationdocumentLocation);
  }

  /*--------------------------Approve MIS Receipt Cheque start------------------*/
  approveMisReceiptCheque(approve) {


    if ($("#ChequeDate").val() == undefined || $("#ChequeDate").val() == "" || $("#ChequeDate").val() == null) {
      swal("Please select waive off date");
      $('#ChequeDate').focus();
      return false;
    }

    if ($("#ChequeAmount").val() == undefined || $("#ChequeAmount").val() == "" || $("#ChequeAmount").val() == null) {
      swal("Please enter the waive off amount");
      $('#ChequeAmount').focus();
      return false;
    }


    // if ($("#ProjectId").val() == "select" || $("#ProjectId").val() == null || $("#ProjectId").val() == "") {
    //   swal("Please select project");
    //   $('#ProjectId').focus();
    //   return false;
    // }


    // if ($("#FaltId").val() == "select" || $("#FaltId").val() == null || $("#FaltId").val() == "") {
    //   swal("Please select flat");
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


    if ($("#PrincipalAmount").val() == "0" && $("#ModificationCharges").val() == "0" && $("#InterstAmount").val() == "0" && $("#LeagalCharges").val() == "0" && $("#refunableCharges").val() == "0" && $('#TdsAmount').val() == "0" && this.CorpusFund == "0" && this.MaintinaceCharges == "0" && this.FlatKhataBifurcation == "0") {
      swal("Please enter Principle amount (OR) Corpus Fund (OR) Maintinance Charges (OR) Flat Khata Bifurcation (OR) modification charges (OR) Interest amount (OR)  Legal charges (OR) Refunable Advance");
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
      + Number($('#TdsAmount').val()) > Number($('#ChequeAmount').val())) {

      swal("Payment Setoff should be equal to waive off amount");
      return false
    }



    if ((Number($('#PrincipalAmount').val()) + Number($('#refunableCharges').val()) + Number($('#ModificationCharges').val()) + Number($('#InterstAmount').val()) + Number($('#LeagalCharges').val())) + Number(this.CorpusFund) + Number(this.MaintinaceCharges) + Number(this.FlatKhataBifurcation) + Number($('#TdsAmount').val()) < Number($('#ChequeAmount').val())) {

      swal("Payment Setoff should be equal to waive off amount");
      return false
    }

    if (Number($('#TdsAmount').val()) !== 0 && $("#paidbyname").val() == "" || Number($('#TdsAmount').val()) !== 0 && $("#paidbyname").val() == "select") {
      swal("Please select paid by name");
      return false
    }


    this.transactionAmount = Cheque_amountfun;

    this.bookingFormId = this.bookingformIDS;




    if (confirm("Do you want to Submit the Page ?")) {

      //setting default amount values
      if ($('#PrincipalAmount').val() == "" || $('#PrincipalAmount').val() == undefined) {
        $('#PrincipalAmount').val(0);
      } else {
        $('#PrincipalAmount').val();
      }
      if ($('#InterstAmount').val() == "" || $('#InterstAmount').val() == undefined) {
        $('#InterstAmount').val(0);
      } else {
        $('#InterstAmount').val();
      }
      if ($('#ModificationCharges').val() == "" || $('#ModificationCharges').val() == undefined) {
        $('#ModificationCharges').val(0);
      } else {
        $('#ModificationCharges').val();
      }
      if ($('#LeagalCharges').val() == "" || $('#LeagalCharges').val() == undefined) {
        $('#LeagalCharges').val(0);
      } else {
        $('#LeagalCharges').val();
      }
      if ($('#refundableAdvanceID').val() == "" || $('#refundableAdvanceID').val() == undefined) {
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

      if (this.MaintinaceCharges == undefined) {
        this.MaintinaceCharges = null;
      }

      if (this.CorpusFund == undefined) {
        this.CorpusFund = null;
      }

      if (this.FlatKhataBifurcation == undefined) {
        this.FlatKhataBifurcation = null;
      }

      var body;
      var url;
      if (approve == "Approve") {
        $('.page-loader-wrapper').show();

        url = this.cmn.commonUrl + "financial/approveFinancialMultipleTransaction.spring";
        console.log(url);

        let headers = new Headers({ 'Content-Type': 'application/json' });
        //let options = new RequestOptions({ headers: headers }); 

        body = {
          "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
          "financialTRNRequests": [
            {
              "siteId": "" + this.siteID,
              "siteName": "" + this.projectName,
              "transactionTypeId": "" + this.viewTransactionResponse.transactionTypeId,
              "transactionModeId": "" + this.viewTransactionResponse.transactionModeId,
              "transactionTypeName": "" + this.viewTransactionResponse.transactionTypeName,
              "transactionModeName": "" + this.viewTransactionResponse.transactionModeName,
              "transactionAmount": $('#ChequeAmount').val(),
              "transactionReceiveDate": this.transactionReceiveDate,
              "flatIds": [this.flatID],
              "bookingFormId": "" + this.bookingFormID,
              "finTransactionNo": this.transactionID,
              "transactionEntryId": "" + this.viewTransactionResponse.transactionEntryId,
              "transactionSetOffEntryId": "" + this.transSetOffEntryId,
              "chequeHandoverDate": null,
              "buttonType": "Approve"
            }
          ]

        }


      } else if (approve == "Modify") {
        if (this.paidByName == undefined) {
          this.paidByName = null;
        } else {
          this.paidByName = this.paidByName;
        }

        if ($('#refundableAdvanceID').val() == undefined) {
          this.refundableAdvanceID = 0;
        } else {
          this.refundableAdvanceID = $('#refundableAdvanceID').val();
        }

        if (this.MaintinaceCharges == undefined) {
          this.MaintinaceCharges = 0;
        }

        if (this.CorpusFund == undefined) {
          this.CorpusFund = 0;
        }

        if (this.FlatKhataBifurcation == undefined) {
          this.FlatKhataBifurcation = 0;
        }

        if (this.finTransactionSetOffId_maintanance == undefined) {
          this.finTransactionSetOffId_maintanance = 0;
        }

        if (this.finTransactionSetOffId_corpus == undefined) {
          this.finTransactionSetOffId_corpus = 0;
        }

        if (this.finTransactionSetOffId_flatkhata == undefined) {
          this.finTransactionSetOffId_flatkhata = 0;
        }


        $('.page-loader-wrapper').show();

        url = this.cmn.commonUrl + "financial/approveOrRejectMisReceiptOrPayment.spring";
        console.log(url);

        let headers = new Headers({ 'Content-Type': 'application/json' });
        //let options = new RequestOptions({ headers: headers }); 

        body = {
          "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
          "siteId": "" + this.siteID,
          "siteName": "" + this.projectName,
          "transactionTypeId": "" + this.viewTransactionResponse.transactionTypeId,
          "transactionModeId": "" + this.viewTransactionResponse.transactionModeId,
          "transactionTypeName": "" + this.viewTransactionResponse.transactionTypeName,
          "transactionModeName": "" + this.viewTransactionResponse.transactionModeName,
          "chequeNumber": null,
          "transactionDate": null,
          "transactionAmount": $('#ChequeAmount').val(),
          "transactionReceiveDate": this.transactionReceiveDate,
          "flatIds": [this.flatID],
          "bookingFormId": "" + this.bookingFormID,
          "chequeDepositedDate": null,
          "paymentSetOff": "true",
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
              "finTransactionSetOffId": "" + this.RefundableChargesSetOffId, //"1",
              "setOffTypeName": "REFUNDABLE_ADVANCE",
              "amount": $('#refundableAdvanceID').val(), //this.legalAmount,  //"0",
              "invoiceNo": ""
            }
            , { "finTransactionSetOffId": this.finTransactionSetOffId, "setOffTypeName": "TDS", "amount": $("#TdsAmount").val(), "paidByName": this.paidByName }


            , { "finTransactionSetOffId": this.finTransactionSetOffId_maintanance, "setOffTypeName": "Maintenance_Charge", "amount": this.MaintinaceCharges, "invoiceNo": "" }
            , { "finTransactionSetOffId": this.finTransactionSetOffId_corpus, "setOffTypeName": "Corpus_Fund", "amount": this.CorpusFund, "invoiceNo": "" }
            , { "finTransactionSetOffId": this.finTransactionSetOffId_flatkhata, "setOffTypeName": "Individual_Flat_Khata_bifurcation_and_other_charges", "amount": this.FlatKhataBifurcation }


          ],
          "buttonType": "Modify",
          "transactionEntryId": "" + this.viewTransactionResponse.transactionEntryId,
          "transactionSetOffEntryId": "" + this.transSetOffEntryId,
          "comments": [{ "CUSTOMER": $("#CustomerCommentsId").val() }],
      
          "comment": $("#CrmCommentsId").val(),
          "transactionReceiptNo": "" + this.transactionReceiptNo


        }


      } else if (approve == "Reject") {

        if (this.paidByName == undefined) {
          this.paidByName = null;
        } else {
          this.paidByName = this.paidByName;
        }

        if ($('#refundableAdvanceID').val() == undefined) {
          this.refundableAdvanceID = 0;
        } else {
          this.refundableAdvanceID = $('#refundableAdvanceID').val();
        }

        if (this.refundableAdvanceID == undefined) {
          this.refundableAdvanceID = 0;
        }

        if (this.MaintinaceCharges == undefined) {
          this.MaintinaceCharges = 0;
        }

        if (this.CorpusFund == undefined) {
          this.CorpusFund = 0;
        }

        if (this.FlatKhataBifurcation == undefined) {
          this.FlatKhataBifurcation = 0;
        }

        if (this.finTransactionSetOffId_maintanance == undefined) {
          this.finTransactionSetOffId_maintanance = 0;
        }

        if (this.finTransactionSetOffId_corpus == undefined) {
          this.finTransactionSetOffId_corpus = 0;
        }

        if (this.finTransactionSetOffId_flatkhata == undefined) {
          this.finTransactionSetOffId_flatkhata = 0;
        }


        $('.page-loader-wrapper').show();

        url = this.cmn.commonUrl + "financial/approveOrRejectMisReceiptOrPayment.spring";
        console.log(url);

        let headers = new Headers({ 'Content-Type': 'application/json' });
        //let options = new RequestOptions({ headers: headers }); 

        body = {
          "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
          "bookingFormId": "" + this.bookingFormID,
          "siteId": "" + this.siteID,
          "siteName": "" + this.projectName,
          "transactionTypeId": "" + this.viewTransactionResponse.transactionTypeId,
          "transactionModeId": "" + this.viewTransactionResponse.transactionModeId,
          "transactionTypeName": "" + this.viewTransactionResponse.transactionTypeName,
          "transactionModeName": "" + this.viewTransactionResponse.transactionModeName,
          "transactionReceiveDate": this.transactionReceiveDate,
          "chequeDepositedDate": null,
          "transactionAmount": $('#ChequeAmount').val(),
          "chequeBounceValue": "false",
          "blockIds": [],
          "floorIds": [],
          "flatIds": [this.flatID],
          "paymentSetOff": "true",
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
              "finTransactionSetOffId": "" + this.RefundableChargesSetOffId, //"1",
              "setOffTypeName": "REFUNDABLE_ADVANCE",
              "amount": this.refundableAdvanceID, //this.legalAmount,  //"0",
              "invoiceNo": ""
            }
            , { "finTransactionSetOffId": this.finTransactionSetOffId, "setOffTypeName": "TDS", "amount": $("#TdsAmount").val(), "paidByName": this.paidByName }


            , { "finTransactionSetOffId": this.finTransactionSetOffId_maintanance, "setOffTypeName": "Maintenance_Charge", "amount": this.MaintinaceCharges, "invoiceNo": "" }
            , { "finTransactionSetOffId": this.finTransactionSetOffId_corpus, "setOffTypeName": "Corpus_Fund", "amount": this.CorpusFund, "invoiceNo": "" }
            , { "finTransactionSetOffId": this.finTransactionSetOffId_flatkhata, "setOffTypeName": "Individual_Flat_Khata_bifurcation_and_other_charges", "amount": this.FlatKhataBifurcation }


          ],
          "buttonType": "Reject",
          "transactionEntryId": "" + this.viewTransactionResponse.transactionEntryId,
          "transactionSetOffEntryId": "" + this.transSetOffEntryId,
          "comments": [{ "CUSTOMER": $("#CustomerCommentsId").val() }],
      
          "comment": $("#CrmCommentsId").val(),
          "transactionReceiptNo": "" + this.transactionReceiptNo



        }


      }




      console.log(body);



      this.http.post(url, body).map(res => res.json()).subscribe(resp => {

        console.log(JSON.stringify(resp));

        $('.page-loader-wrapper').hide();

        if (resp.responseCode == 200) {
          this.router.navigate(['View-Pending-Transactions']);

          if (approve == "Approve") {
            swal("Your transaction approve successfully !!");
          } else if (approve == "Reject") {
            swal("Your transaction reject successfully !!");
          } else if (approve == "Modify") {
            swal("Your transaction modify successfully !!");
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



        if (this.paidByName == null || this.paidByName == undefined || this.paidByName == "undefined") {

        } else {
          $('#paidbyname').html("<option value='select'>Select</option>" + "" + "<option value='Customer'>Customer</option>" + "" + "<option value='Sumadhura'>Sumadhura</option>");
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

  editSubmit() {

    if ($("#ChequeDate").val() == undefined || $("#ChequeDate").val() == "" || $("#ChequeDate").val() == null) {
      swal("Please select waive off date");
      $('#ChequeDate').focus();
      return false;
    }

    if ($("#ChequeAmount").val() == undefined || $("#ChequeAmount").val() == "" || $("#ChequeAmount").val() == null) {
      swal("Please enter the waive off amount");
      $('#ChequeAmount').focus();
      return false;
    }


    // if ($("#ProjectId").val() == "select" || $("#ProjectId").val() == null || $("#ProjectId").val() == "") {
    //   swal("Please select project");
    //   $('#ProjectId').focus();
    //   return false;
    // }


    // if ($("#FaltId").val() == "select" || $("#FaltId").val() == null || $("#FaltId").val() == "") {
    //   swal("Please select flat");
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


    if ($("#PrincipalAmount").val() == "0" && $("#ModificationCharges").val() == "0" && $("#InterstAmount").val() == "0" && $("#LeagalCharges").val() == "0" && $("#refunableCharges").val() == "0" && $('#TdsAmount').val() == "0" && this.CorpusFund == "0" && this.MaintinaceCharges == "0" && this.FlatKhataBifurcation == "0") {
      swal("Please enter Principle amount (OR) Corpus Fund (OR) Maintinance Charges (OR) Flat Khata Bifurcation (OR) modification charges (OR) Interest amount (OR)  Legal charges (OR) Refunable Advance");
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
      + Number($('#TdsAmount').val()) > Number($('#ChequeAmount').val())) {

      swal("Payment Setoff should be equal to waive off amount");
      return false
    }



    if ((Number($('#PrincipalAmount').val()) + Number($('#refunableCharges').val()) + Number($('#ModificationCharges').val()) + Number($('#InterstAmount').val()) + Number($('#LeagalCharges').val())) + Number(this.CorpusFund) + Number(this.MaintinaceCharges) + Number(this.FlatKhataBifurcation) + Number($('#TdsAmount').val()) < Number($('#ChequeAmount').val())) {

      swal("Payment Setoff should be equal to waive off amount");
      return false
    }

    if (Number($('#TdsAmount').val()) !== 0 && $("#paidbyname").val() == "" || Number($('#TdsAmount').val()) !== 0 && $("#paidbyname").val() == "select") {
      swal("Please select paid by name");
      return false
    }


    this.transactionAmount = Cheque_amountfun;

    this.bookingFormId = this.bookingformIDS;




    if (confirm("Do you want to Submit the Page ?")) {

      //setting default amount values
      if ($('#PrincipalAmount').val() == "" || $('#PrincipalAmount').val() == undefined) {
        $('#PrincipalAmount').val(0);
      } else {
        $('#PrincipalAmount').val();
      }
      if ($('#InterstAmount').val() == "" || $('#InterstAmount').val() == undefined) {
        $('#InterstAmount').val(0);
      } else {
        $('#InterstAmount').val();
      }
      if ($('#ModificationCharges').val() == "" || $('#ModificationCharges').val() == undefined) {
        $('#ModificationCharges').val(0);
      } else {
        $('#ModificationCharges').val();
      }
      if ($('#LeagalCharges').val() == "" || $('#LeagalCharges').val() == undefined) {
        $('#LeagalCharges').val(0);
      } else {
        $('#LeagalCharges').val();
      }
      if ($('#refundableAdvanceID').val() == "" || $('#refundableAdvanceID').val() == undefined) {
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

      if (this.MaintinaceCharges == undefined) {
        this.MaintinaceCharges = null;
      }

      if (this.CorpusFund == undefined) {
        this.CorpusFund = null;
      }

      if (this.FlatKhataBifurcation == undefined) {
        this.FlatKhataBifurcation = null;
      }


    }


    if (this.paidByName == undefined) {
      this.paidByName = null;
    } else {
      this.paidByName = this.paidByName;
    }

    if ($('#refundableAdvanceID').val() == undefined) {
      this.refundableAdvanceID = 0;
    } else {
      this.refundableAdvanceID = $('#refundableAdvanceID').val();
    }

    if (this.MaintinaceCharges == undefined) {
      this.MaintinaceCharges = 0;
    }

    if (this.CorpusFund == undefined) {
      this.CorpusFund = 0;
    }

    if (this.FlatKhataBifurcation == undefined) {
      this.FlatKhataBifurcation = 0;
    }

    if (this.finTransactionSetOffId_maintanance == undefined) {
      this.finTransactionSetOffId_maintanance = 0;
    }

    if (this.finTransactionSetOffId_corpus == undefined) {
      this.finTransactionSetOffId_corpus = 0;
    }

    if (this.finTransactionSetOffId_flatkhata == undefined) {
      this.finTransactionSetOffId_flatkhata = 0;
    }


    $('.page-loader-wrapper').show();

    var url = this.cmn.commonUrl + "financial/editFinancialTransaction.spring";
    console.log(url);

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
      "transactionDate": null,
      "transactionReceiveDate": this.transactionReceiveDate,
      "actualTransactionReceiveDate": null,
      "transactionAmount": $('#ChequeAmount').val(),
      "flatIds": [this.flatID],
      "flatNos": [this.flatNumber],
      "actualFlatIds": [this.flatID],
      "actualBookingFormId": this.bookingFormID,
      "actualFlatNos": [this.flatNumber],
      "isRecievedDateORSetOffChanged": "false",
      "paymentSetOff": "true",
      "sourceOfFunds": "Self",
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
          "finTransactionSetOffId": "" + this.RefundableChargesSetOffId, //"1",
          "setOffTypeName": "REFUNDABLE_ADVANCE",
          "amount": this.refundableAdvanceID, //this.legalAmount,  //"0",
          "invoiceNo": ""
        }
        , { "finTransactionSetOffId": this.finTransactionSetOffId, "setOffTypeName": "TDS", "amount": $("#TdsAmount").val(), "paidByName": this.paidByName }


        , { "finTransactionSetOffId": this.finTransactionSetOffId_maintanance, "setOffTypeName": "Maintenance_Charge", "amount": this.MaintinaceCharges, "invoiceNo": "" }
        , { "finTransactionSetOffId": this.finTransactionSetOffId_corpus, "setOffTypeName": "Corpus_Fund", "amount": this.CorpusFund, "invoiceNo": "" }
        , { "finTransactionSetOffId": this.finTransactionSetOffId_flatkhata, "setOffTypeName": "Individual_Flat_Khata_bifurcation_and_other_charges", "amount": this.FlatKhataBifurcation }


      ],
      "comments": [{ "CUSTOMER": $("#CustomerCommentsId").val() }],
      
      "comment": $("#CrmCommentsId").val(),
      "buttonType": "Edit",
      "operationType": "Modify",
      "prevTransactionEntryId": this.transactionEntryId,
      "transactionEntryId": "" + this.viewTransactionResponse.transactionEntryId,
      "transactionSetOffEntryId": "" + this.transSetOffEntryId,
      "fileInfos": [

      ],
      "deleteFileInfos": []



    }



    console.log(body);




    this.http.post(url, body).map(res => res.json()).subscribe(resp => {

      console.log(JSON.stringify(resp));

      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 200) {



        swal("Transaction updated successfully")

        this.router.navigate(['View-Completed-Transactions']);

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

  }


  Deletelistfun() {

    if ($("#ChequeDate").val() == undefined || $("#ChequeDate").val() == "" || $("#ChequeDate").val() == null) {
      swal("Please select waive off date");
      $('#ChequeDate').focus();
      return false;
    }

    if ($("#ChequeAmount").val() == undefined || $("#ChequeAmount").val() == "" || $("#ChequeAmount").val() == null) {
      swal("Please enter the waive off amount");
      $('#ChequeAmount').focus();
      return false;
    }


    // if ($("#ProjectId").val() == "select" || $("#ProjectId").val() == null || $("#ProjectId").val() == "") {
    //   swal("Please select project");
    //   $('#ProjectId').focus();
    //   return false;
    // }


    // if ($("#FaltId").val() == "select" || $("#FaltId").val() == null || $("#FaltId").val() == "") {
    //   swal("Please select flat");
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


    if ($("#PrincipalAmount").val() == "0" && $("#ModificationCharges").val() == "0" && $("#InterstAmount").val() == "0" && $("#LeagalCharges").val() == "0" && $("#refunableCharges").val() == "0" && $('#TdsAmount').val() == "0" && this.CorpusFund == "0" && this.MaintinaceCharges == "0" && this.FlatKhataBifurcation == "0") {
      swal("Please enter Principle amount (OR) Corpus Fund (OR) Maintinance Charges (OR) Flat Khata Bifurcation (OR) modification charges (OR) Interest amount (OR)  Legal charges (OR) Refunable Advance");
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
      + Number($('#TdsAmount').val()) > Number($('#ChequeAmount').val())) {

      swal("Payment Setoff should be equal to waive off amount");
      return false
    }



    if ((Number($('#PrincipalAmount').val()) + Number($('#refunableCharges').val()) + Number($('#ModificationCharges').val()) + Number($('#InterstAmount').val()) + Number($('#LeagalCharges').val())) + Number(this.CorpusFund) + Number(this.MaintinaceCharges) + Number(this.FlatKhataBifurcation) + Number($('#TdsAmount').val()) < Number($('#ChequeAmount').val())) {

      swal("Payment Setoff should be equal to waive off amount");
      return false
    }

    if (Number($('#TdsAmount').val()) !== 0 && $("#paidbyname").val() == "" || Number($('#TdsAmount').val()) !== 0 && $("#paidbyname").val() == "select") {
      swal("Please select paid by name");
      return false
    }


    this.transactionAmount = Cheque_amountfun;

    this.bookingFormId = this.bookingformIDS;




    if (confirm("Do you want to Submit the Page ?")) {

      //setting default amount values
      if ($('#PrincipalAmount').val() == "" || $('#PrincipalAmount').val() == undefined) {
        $('#PrincipalAmount').val(0);
      } else {
        $('#PrincipalAmount').val();
      }
      if ($('#InterstAmount').val() == "" || $('#InterstAmount').val() == undefined) {
        $('#InterstAmount').val(0);
      } else {
        $('#InterstAmount').val();
      }
      if ($('#ModificationCharges').val() == "" || $('#ModificationCharges').val() == undefined) {
        $('#ModificationCharges').val(0);
      } else {
        $('#ModificationCharges').val();
      }
      if ($('#LeagalCharges').val() == "" || $('#LeagalCharges').val() == undefined) {
        $('#LeagalCharges').val(0);
      } else {
        $('#LeagalCharges').val();
      }
      if ($('#refundableAdvanceID').val() == "" || $('#refundableAdvanceID').val() == undefined) {
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

      if (this.MaintinaceCharges == undefined) {
        this.MaintinaceCharges = null;
      }

      if (this.CorpusFund == undefined) {
        this.CorpusFund = null;
      }

      if (this.FlatKhataBifurcation == undefined) {
        this.FlatKhataBifurcation = null;
      }


    }

    $('.page-loader-wrapper').show();

    var url = this.cmn.commonUrl + "financial/deleteFinancialTransaction.spring";
    console.log(url);

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
      "transactionAmount": $('#ChequeAmount').val(),
      "transactionReceiveDate": this.transactionReceiveDate,
      "transactionDate": null,
      "actualTransactionReceiveDate": this.transactionReceiveDate,
      "flatIds": [this.flatID],
      "actualFlatIds": [this.flatID],
      "bookingFormId": "" + this.bookingFormID,
      "actualBookingFormId": this.bookingFormID,
      "actionUrl": "Delete_Transaction",
      "transactionEntryId": "" + this.viewTransactionResponse.transactionEntryId,
      "transactionSetOffEntryId": "" + this.transSetOffEntryId,
      "transactionNo": this.transactionID,
      "comment": "",
      "transactionReceiptNo": "" + this.transactionReceiptNo,
      "buttonType": "Delete",

    }
    console.log(body);

    this.http.post(url, body).map(res => res.json()).subscribe(resp => {

      console.log(JSON.stringify(resp));

      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 200) {

        swal("Transaction delete successfully");
        this.router.navigateByUrl('View-Completed-Transactions');




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

  }



  CRMReceiptChequeSubmit(){
    
    if ($("#ChequeDate").val() == undefined || $("#ChequeDate").val() == "" || $("#ChequeDate").val() == null) {
      swal("Please select waive off date");
      $('#ChequeDate').focus();
      return false;
    }

    if ($("#ChequeAmount").val() == undefined || $("#ChequeAmount").val() == "" || $("#ChequeAmount").val() == null) {
      swal("Please enter the waive off amount");
      $('#ChequeAmount').focus();
      return false;
    }


    // if ($("#ProjectId").val() == "select" || $("#ProjectId").val() == null || $("#ProjectId").val() == "") {
    //   swal("Please select project");
    //   $('#ProjectId').focus();
    //   return false;
    // }


    // if ($("#FaltId").val() == "select" || $("#FaltId").val() == null || $("#FaltId").val() == "") {
    //   swal("Please select flat");
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


    if ($("#PrincipalAmount").val() == "0" && $("#ModificationCharges").val() == "0" && $("#InterstAmount").val() == "0" && $("#LeagalCharges").val() == "0" && $("#refunableCharges").val() == "0" && $('#TdsAmount').val() == "0" && this.CorpusFund == "0" && this.MaintinaceCharges == "0" && this.FlatKhataBifurcation == "0") {
      swal("Please enter Principle amount (OR) Corpus Fund (OR) Maintinance Charges (OR) Flat Khata Bifurcation (OR) modification charges (OR) Interest amount (OR)  Legal charges (OR) Refunable Advance");
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
      + Number($('#TdsAmount').val()) > Number($('#ChequeAmount').val())) {

      swal("Payment Setoff should be equal to waive off amount");
      return false
    }



    if ((Number($('#PrincipalAmount').val()) + Number($('#refunableCharges').val()) + Number($('#ModificationCharges').val()) + Number($('#InterstAmount').val()) + Number($('#LeagalCharges').val())) + Number(this.CorpusFund) + Number(this.MaintinaceCharges) + Number(this.FlatKhataBifurcation) + Number($('#TdsAmount').val()) < Number($('#ChequeAmount').val())) {

      swal("Payment Setoff should be equal to waive off amount");
      return false
    }

    if (Number($('#TdsAmount').val()) !== 0 && $("#paidbyname").val() == "" || Number($('#TdsAmount').val()) !== 0 && $("#paidbyname").val() == "select") {
      swal("Please select paid by name");
      return false
    }


    this.transactionAmount = Cheque_amountfun;

    this.bookingFormId = this.bookingformIDS;




    if (confirm("Do you want to Submit the Page ?")) {

      //setting default amount values
      if ($('#PrincipalAmount').val() == "" || $('#PrincipalAmount').val() == undefined) {
        $('#PrincipalAmount').val(0);
      } else {
        $('#PrincipalAmount').val();
      }
      if ($('#InterstAmount').val() == "" || $('#InterstAmount').val() == undefined) {
        $('#InterstAmount').val(0);
      } else {
        $('#InterstAmount').val();
      }
      if ($('#ModificationCharges').val() == "" || $('#ModificationCharges').val() == undefined) {
        $('#ModificationCharges').val(0);
      } else {
        $('#ModificationCharges').val();
      }
      if ($('#LeagalCharges').val() == "" || $('#LeagalCharges').val() == undefined) {
        $('#LeagalCharges').val(0);
      } else {
        $('#LeagalCharges').val();
      }
      if ($('#refundableAdvanceID').val() == "" || $('#refundableAdvanceID').val() == undefined) {
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

      if (this.MaintinaceCharges == undefined) {
        this.MaintinaceCharges = null;
      }

      if (this.CorpusFund == undefined) {
        this.CorpusFund = null;
      }

      if (this.FlatKhataBifurcation == undefined) {
        this.FlatKhataBifurcation = null;
      }


  


    if (this.paidByName == undefined) {
      this.paidByName = null;
    } else {
      this.paidByName = this.paidByName;
    }

    if ($('#refundableAdvanceID').val() == undefined) {
      this.refundableAdvanceID = 0;
    } else {
      this.refundableAdvanceID = $('#refundableAdvanceID').val();
    }

    if (this.MaintinaceCharges == undefined) {
      this.MaintinaceCharges = 0;
    }

    if (this.CorpusFund == undefined) {
      this.CorpusFund = 0;
    }

    if (this.FlatKhataBifurcation == undefined) {
      this.FlatKhataBifurcation = 0;
    }

    if (this.finTransactionSetOffId_maintanance == undefined) {
      this.finTransactionSetOffId_maintanance = 0;
    }

    if (this.finTransactionSetOffId_corpus == undefined) {
      this.finTransactionSetOffId_corpus = 0;
    }

    if (this.finTransactionSetOffId_flatkhata == undefined) {
      this.finTransactionSetOffId_flatkhata = 0;
    }


    $('.page-loader-wrapper').show();

    var url = this.cmn.commonUrl + "financial/approveOrRejectMisReceiptOrPayment.spring";
    console.log(url);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: headers }); 

    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "bookingFormId": this.bookingFormID,
      "siteId": "" + this.siteID,
      "siteName": "" + this.projectName,
      "transactionTypeId": "" + this.viewTransactionResponse.transactionTypeId,
      "transactionModeId": "" + this.viewTransactionResponse.transactionModeId,
      "transactionTypeName": "" + this.viewTransactionResponse.transactionTypeName,
      "transactionModeName": "" + this.viewTransactionResponse.transactionModeName,
      "transactionReceiveDate": this.transactionReceiveDate,
      "chequeDepositedDate": null,
      "transactionAmount": $('#ChequeAmount').val(),
      "chequeBounceValue": "false",
      "blockIds": [],
      "floorIds": [],
      "flatIds": [this.flatID],
      "paymentSetOff": "true",
      "optionalButtonType": "Modify",
      "actualTransactionRequest": {
        "siteId": this.sideidname,
        "siteName": this.con_sitename,
        "transactionTypeId": this.transactionTypeId,
        "transactionModeId": this.transactionModeId,
        "transactionTypeName": this.transactionTypeName,
        "transactionModeName": this.transactionModeName,
        "flatIds": [this.flatIds],
        "flatNos": [this.flatNumber],
        "bookingFormId": this.actualBookingFormId,
        "transactionAmount": $('#ChequeAmount').val(),
      },
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
          "finTransactionSetOffId": "" + this.RefundableChargesSetOffId, //"1",
          "setOffTypeName": "REFUNDABLE_ADVANCE",
          "amount": this.refundableAdvanceID, //this.legalAmount,  //"0",
          "invoiceNo": ""
        }
        , { "finTransactionSetOffId": this.finTransactionSetOffId, "setOffTypeName": "TDS", "amount": $("#TdsAmount").val(), "paidByName": this.paidByName }


        , { "finTransactionSetOffId": this.finTransactionSetOffId_maintanance, "setOffTypeName": "Maintenance_Charge", "amount": this.MaintinaceCharges, "invoiceNo": "" }
        , { "finTransactionSetOffId": this.finTransactionSetOffId_corpus, "setOffTypeName": "Corpus_Fund", "amount": this.CorpusFund, "invoiceNo": "" }
        , { "finTransactionSetOffId": this.finTransactionSetOffId_flatkhata, "setOffTypeName": "Individual_Flat_Khata_bifurcation_and_other_charges", "amount": this.FlatKhataBifurcation }


      ],
      "buttonType": "Approve",
        "transactionEntryId": "" + this.viewTransactionResponse.transactionEntryId,
        "transactionSetOffEntryId": "" + this.transSetOffEntryId,


        "comments": [{ "CUSTOMER": $("#CustomerCommentsId").val() }],
      
        "comment": $("#CrmCommentsId").val(),

        "transactionReceiptNo": "" + this.transactionReceiptNo, // "SIPL/2020-2021/Sumadhura Soham/262"
        "prevTransactionEntryId": this.transactionEntryId,
        "fileInfos": [],
        "deleteFileInfos": []
  
    }

  console.log(url);
  console.log(JSON.stringify(body));
   

    this.http.post(url, body).map(res => res.json()).subscribe(resp => {

      console.log(JSON.stringify(resp));

      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 200) {
        swal("Transaction sent successfully")
        this.router.navigateByUrl("modify-transaction");

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


  }
  }

  rejectAndModifytMisReceiptCheque(){
     
    if ($("#ChequeDate").val() == undefined || $("#ChequeDate").val() == "" || $("#ChequeDate").val() == null) {
      swal("Please select waive off date");
      $('#ChequeDate').focus();
      return false;
    }

    if ($("#ChequeAmount").val() == undefined || $("#ChequeAmount").val() == "" || $("#ChequeAmount").val() == null) {
      swal("Please enter the waive off amount");
      $('#ChequeAmount').focus();
      return false;
    }


    // if ($("#ProjectId").val() == "select" || $("#ProjectId").val() == null || $("#ProjectId").val() == "") {
    //   swal("Please select project");
    //   $('#ProjectId').focus();
    //   return false;
    // }


    // if ($("#FaltId").val() == "select" || $("#FaltId").val() == null || $("#FaltId").val() == "") {
    //   swal("Please select flat");
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


    if ($("#PrincipalAmount").val() == "0" && $("#ModificationCharges").val() == "0" && $("#InterstAmount").val() == "0" && $("#LeagalCharges").val() == "0" && $("#refunableCharges").val() == "0" && $('#TdsAmount').val() == "0" && this.CorpusFund == "0" && this.MaintinaceCharges == "0" && this.FlatKhataBifurcation == "0") {
      swal("Please enter Principle amount (OR) Corpus Fund (OR) Maintinance Charges (OR) Flat Khata Bifurcation (OR) modification charges (OR) Interest amount (OR)  Legal charges (OR) Refunable Advance");
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
      + Number($('#TdsAmount').val()) > Number($('#ChequeAmount').val())) {

      swal("Payment Setoff should be equal to waive off amount");
      return false
    }



    if ((Number($('#PrincipalAmount').val()) + Number($('#refunableCharges').val()) + Number($('#ModificationCharges').val()) + Number($('#InterstAmount').val()) + Number($('#LeagalCharges').val())) + Number(this.CorpusFund) + Number(this.MaintinaceCharges) + Number(this.FlatKhataBifurcation) + Number($('#TdsAmount').val()) < Number($('#ChequeAmount').val())) {

      swal("Payment Setoff should be equal to waive off amount");
      return false
    }

    if (Number($('#TdsAmount').val()) !== 0 && $("#paidbyname").val() == "" || Number($('#TdsAmount').val()) !== 0 && $("#paidbyname").val() == "select") {
      swal("Please select paid by name");
      return false
    }


    this.transactionAmount = Cheque_amountfun;

    this.bookingFormId = this.bookingformIDS;




    if (confirm("Do you want to Submit the Page ?")) {

      //setting default amount values
      if ($('#PrincipalAmount').val() == "" || $('#PrincipalAmount').val() == undefined) {
        $('#PrincipalAmount').val(0);
      } else {
        $('#PrincipalAmount').val();
      }
      if ($('#InterstAmount').val() == "" || $('#InterstAmount').val() == undefined) {
        $('#InterstAmount').val(0);
      } else {
        $('#InterstAmount').val();
      }
      if ($('#ModificationCharges').val() == "" || $('#ModificationCharges').val() == undefined) {
        $('#ModificationCharges').val(0);
      } else {
        $('#ModificationCharges').val();
      }
      if ($('#LeagalCharges').val() == "" || $('#LeagalCharges').val() == undefined) {
        $('#LeagalCharges').val(0);
      } else {
        $('#LeagalCharges').val();
      }
      if ($('#refundableAdvanceID').val() == "" || $('#refundableAdvanceID').val() == undefined) {
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

      if (this.MaintinaceCharges == undefined) {
        this.MaintinaceCharges = null;
      }

      if (this.CorpusFund == undefined) {
        this.CorpusFund = null;
      }

      if (this.FlatKhataBifurcation == undefined) {
        this.FlatKhataBifurcation = null;
      }


  


    if (this.paidByName == undefined) {
      this.paidByName = null;
    } else {
      this.paidByName = this.paidByName;
    }

    if ($('#refundableAdvanceID').val() == undefined) {
      this.refundableAdvanceID = 0;
    } else {
      this.refundableAdvanceID = $('#refundableAdvanceID').val();
    }

    if (this.MaintinaceCharges == undefined) {
      this.MaintinaceCharges = 0;
    }

    if (this.CorpusFund == undefined) {
      this.CorpusFund = 0;
    }

    if (this.FlatKhataBifurcation == undefined) {
      this.FlatKhataBifurcation = 0;
    }

    if (this.finTransactionSetOffId_maintanance == undefined) {
      this.finTransactionSetOffId_maintanance = 0;
    }

    if (this.finTransactionSetOffId_corpus == undefined) {
      this.finTransactionSetOffId_corpus = 0;
    }

    if (this.finTransactionSetOffId_flatkhata == undefined) {
      this.finTransactionSetOffId_flatkhata = 0;
    }


    $('.page-loader-wrapper').show();

    var url = this.cmn.commonUrl + "financial/approveOrRejectMisReceiptOrPayment.spring";
    console.log(url);

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
        "chequeNumber": null,
        "transactionDate": null,
        "transactionReceiveDate": this.transactionReceiveDate,
        "transactionAmount": $('#ChequeAmount').val(),
      
        "flatIds": [this.flatID],
        "bookingFormId": this.bookingFormID,
        "bankId": null,
        "bankName": null,
        "siteAccountId": null,
        "siteBankAccountNumber": null,
        "chequeDepositedDate": null,
        "paymentSetOff": "true",
        "sourceOfFunds": null,
        "actualTransactionRequest": {
          "siteId": this.sideidname,
          "siteName": this.con_sitename,
          "transactionTypeId": this.transactionTypeId,
          "transactionModeId": this.transactionModeId,
          "transactionTypeName": this.transactionTypeName,
          "transactionModeName": this.transactionModeName,
          "flatIds": [this.flatIds],
          "flatNos": [this.flatNumber],
          "bookingFormId": this.actualBookingFormId,
          "transactionAmount": $('#ChequeAmount').val(),
        },
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
            "finTransactionSetOffId": "" + this.RefundableChargesSetOffId, //"1",
            "setOffTypeName": "REFUNDABLE_ADVANCE",
            "amount": this.refundableAdvanceID, //this.legalAmount,  //"0",
            "invoiceNo": ""
          }
          , { "finTransactionSetOffId": this.finTransactionSetOffId, "setOffTypeName": "TDS", "amount": $("#TdsAmount").val(), "paidByName": this.paidByName }
  
  
          , { "finTransactionSetOffId": this.finTransactionSetOffId_maintanance, "setOffTypeName": "Maintenance_Charge", "amount": this.MaintinaceCharges, "invoiceNo": "" }
          , { "finTransactionSetOffId": this.finTransactionSetOffId_corpus, "setOffTypeName": "Corpus_Fund", "amount": this.CorpusFund, "invoiceNo": "" }
          , { "finTransactionSetOffId": this.finTransactionSetOffId_flatkhata, "setOffTypeName": "Individual_Flat_Khata_bifurcation_and_other_charges", "amount": this.FlatKhataBifurcation }
  
  
        ],
        "buttonType": "Reject",
        "transactionEntryId": "" + this.viewTransactionResponse.transactionEntryId,
        "transactionSetOffEntryId": "" + this.transSetOffEntryId,
        "comments": [{ "CUSTOMER": $("#CustomerCommentsId").val() }],
      
        "comment": $("#CrmCommentsId").val(),
        "transactionReceiptNo": "" + this.transactionReceiptNo // "SIPL/2020-2021/Sumadhura Soham/262"
    }

console.log(body);

   

    this.http.post(url, body).map(res => res.json()).subscribe(resp => {

      console.log(JSON.stringify(resp));

      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 200) {
        swal("Your transaction got rejected successfully !!");
        this.router.navigateByUrl("modify-transaction");

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

    }
  }
}
