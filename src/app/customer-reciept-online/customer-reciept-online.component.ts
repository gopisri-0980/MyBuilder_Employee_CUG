import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { CommonComponent } from '../common/common.component';
import { unwatchFile } from 'fs';
import { DomSanitizer } from '@angular/platform-browser';

import { Http, Headers, RequestOptions } from '@angular/http';
declare const $: any;
declare const swal: any;

var siteidsvalue;

var base64textString;
var checkedornot;
var json_response;
var flatId;
var flatId_bookingid;
var convertbasesixtyfour = [];
var siteidsvalue;
var base64array = [];
var selectbankNameValue;
var selectbanknametext;
var imgs = [];
var cheque_number_value;
var invoicedetails_url;
var ModificationInvoice_url;
var lagelinvoicenumber;
var modificationinvoice;
var bookingformIDS;


var carparkingdetails_url;
var carparkinginvoicenumber;

var PaymentModeID_value;
var PaymentModeID_name;


@Component({
  selector: 'app-customer-reciept-online',
  templateUrl: './customer-reciept-online.component.html',
  styleUrls: ['./customer-reciept-online.component.sass']
})
export class CustomerRecieptOnlineComponent implements OnInit {
  controller: number[];
  setOffTypeName: any;
  controllerdata: Array<any> = [];
  totalPenaltyAmount: any;
  totaldueamount: any;
  customerName: any;
  fileExtension_array: any[];
  file_name_array1: any[];
  base64_array_object_data1: Array<any> = [];
  File_Info1: any[];

  public fileName;
  filename_extension: any;
  filenameval: any;
  urls: Array<any> = [];
  tempfileInfo: Array<any> = [];
  ortitle: boolean;
  binaryString: any;
  base64textString: string;
  base64_array_object_data: Array<any> = [];
  imageUrl: string;

  extensiontype: any;
  filetypeurlsplit: any;
  filetypeurlsplit1: any;
  filenamedoc: any;
  filesplitdata: any;
  imgsrc: any;
  filename: any;
  CorpusFund: any;
  MaintinaceCharges: any;
  FlatKhataBifurcation: any;
  carparkingcost_amount: any;
  finpaidbyname: any;
  blockIDvalue: any;
  banknamevalue: any;
  banknametext: any;
  finTransactionSetOffId: any;
  attachmentArray: Array<any> = [];
  urls1: Array<any> = [];
  customerbankid: any;
  customerbankname: any;
  Registration_And_Mutation_Charges: any;
  Non_refundable_Caution_Deposit: any;
  Electricity_Deposit: any;
  constructor(private cmn: CommonComponent, private http: Http, private router: Router, private sanitizer: DomSanitizer) {
    $('.page-loader-wrapper').hide();

    this.paymentModeList();
    this.bankNamesList();
    this.lendorNamesList();
    this.siteList();
  }

  getToday(): string {
    return new Date().toISOString().split('T')[0]
  }


  ngOnInit() {




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


    $("#paidbyname").prop("disabled", true);
    var self = this;
    $(function () {
      $("#Sourcefound").select2({
        placeholder: "Source of funds",
        dir: "ltl"
      });

      $("#paidbyname").select2({
        placeholder: "Paid By",
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


      $("#transaction_mode").select2({
        placeholder: "Search Transacion Mode",
        dir: "ltl"
      });

      $("#CarparkingInvoiceId").select2({
        placeholder: "Search Car Parking Invoice",
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
      $("#lender_bank_name").select2({
        placeholder: "Select lender bank name",
        dir: "ltl"
      });

      $("#lener_project").select2({
        placeholder: "Select project",
        dir: "ltl"
      });
      $("#Lender_companybankAcId").select2({
        placeholder: "Search Company Bank Account",
        dir: "ltl"
      });
      $("#lender_name").select2({
        placeholder: "Select Lender Name",
        dir: "ltl"
      });

      $("#PaymentModeID").select2({
        placeholder: "Select Project",
        dir: "ltl",
      });
      $("#PaymentModeID_lender").select2({
        placeholder: "Select Project",
        dir: "ltl",
      });

      $("#bankNamesID").select2({
        placeholder: "Select Project",
        dir: "ltl",
      });

      $("#companyAccnumberID").select2({
        placeholder: "Select Project",
        dir: "ltl",
      });
      $("#payment_Type").select2({
        placeholder: "Select payment from",
        dir: "ltl"
      });
      $('#lener_project').change(function (e) {
        var siteId = $(e.target).val();
        siteidsvalue = $(e.target).val();
        if ($(e.target).val() == "select") {



        } else {
          self.blockList(siteId);
          self.siteBankList(siteId);
          self.flatsitewisechange(siteId);
        }



      });

      $('#payment_Type').change(function (e) {
        console.log($(e.target).val());

        this.tempfileInfo = [];
        this.urls = [];

        if ($(e.target).val() == "Customer") {


          $("#customer_first_element").show();
          $("#other_first_element").hide();


        } else if ($(e.target).val() == "Other") {


          $("#customer_first_element").hide();
          $("#other_first_element").show();

        }
      });
      $('#ProjectId').change(function (e) {
        var siteId = $(e.target).val();
        siteidsvalue = $(e.target).val();
        if (siteId == "select") {
          $("#BlockId option[value]").remove();
          $("#FaltId option[value]").remove();

          $("#BlockId").attr("disabled", true);
          $("#FaltId").attr("disabled", true);


        } else {
          self.blockList(siteId);
          self.flatsitewisechange(siteId);
          self.siteAccNumList(siteidsvalue);
        }
      });
      $('#lener_project').change(function (e) {
        var siteId = $(e.target).val();
        siteidsvalue = $(e.target).val();
        if (siteId == "select") {
          $("#BlockId option[value]").remove();
          $("#FaltId option[value]").remove();

        } else {

          self.siteAccNumList(siteidsvalue);
          self.blockList(siteId);
          self.flatsitewisechange(siteId);
        }
      });

      $('#BlockId').change(function (e) {
        var siteId = $(e.target).val();
        if (siteId == "select") {
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

        self.modification_legalInvoiceList(flatId);
        self.forFlatbookingIdkList(flatId)

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


      $("#PaymentModeID").change(function (e) {
        if ($(e.target).val() !== 'select') {

          PaymentModeID_value = $(e.target).val();
          PaymentModeID_name = $('#PaymentModeID').select2('data')[0].text;

          console.log(PaymentModeID_value);
          console.log(PaymentModeID_name);
        } else {
          PaymentModeID_value = null;
          PaymentModeID_name = null;
        }
      });

      $("#PaymentModeID_lender").change(function (e) {
        if ($(e.target).val() !== 'select') {

          PaymentModeID_value = $(e.target).val();
          PaymentModeID_name = $('#PaymentModeID_lender').select2('data')[0].text;

          console.log(PaymentModeID_value);
          console.log(PaymentModeID_name);
        } else {
          PaymentModeID_value = null;
          PaymentModeID_name = null;
        }
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



    });




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

  modificationInvoice(event: any) {
    // $("#ModificationInvoiceId").attr("disabled", false);
    if ($("#ModificationCharges").val() == '0' || $("#ModificationCharges").val() == '') {
      $("#ModificationInvoiceId").attr("disabled", true);
    } else {
      $("#ModificationInvoiceId").attr("disabled", false);
    }
  }

  legalInvoice(event: any) {
    // $("#LegalInvoiceId").attr("disabled", false);

    if ($("#LeagalCharges").val() == '0' || $("#LeagalCharges").val() == '') {
      $("#LegalInvoiceId").attr("disabled", true);
    } else {
      $("#LegalInvoiceId").attr("disabled", false);
    }
  }

  fileview(file) {
    window.open(file, '_system', 'location=yes,closebuttoncaption=Fechar,enableViewportScale=no');
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




  carparkingInvoice(event: any) {
    $("#CarparkingInvoiceId").attr("disabled", false);
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
          $('#PaymentModeID_lender').append("<option value='" + resp.responseObjList.finTransferModeResponseList[i].transferModeId + "'>" + resp.responseObjList.finTransferModeResponseList[i].name + "</option>");

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


  /*-----------------Getting Bank names list Start---------------------*/
  bankNamesList() {
    $('.page-loader-wrapper').show();

    let url = this.cmn.commonUrl + "financial/viewFinTransactionTypeModeData.spring";


    let headers = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: headers });

    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "condition": "fetchAllData"
    }


    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 200) {
        $('#lender_bank_name').html('');
        $('#lender_bank_name').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.finBankResponseList.length; i++) {
          $('#bankNamesID').append("<option value='" + resp.responseObjList.finBankResponseList[i].finBankId + "'>" + resp.responseObjList.finBankResponseList[i].bankName + "</option>");
          $('#lender_bank_name').append("<option value='" + resp.responseObjList.finBankResponseList[i].finBankId + "'>" + resp.responseObjList.finBankResponseList[i].bankName + "</option>");

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



  lendorNamesList() {
    $('.page-loader-wrapper').show();

    let url = this.cmn.commonUrl + "lendor/getLendorDetails.spring";


    let headers = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: headers });

    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "requestUrl": "reciepts"
    }


    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      console.log(JSON.stringify(resp))
      if (resp.responseCode == 200) {
        $('#lender_name').html('');
        $('#lender_name').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#lender_name').append("<option value='" + resp.responseObjList[i].lenderId + "'>" + resp.responseObjList[i].name + "</option>");

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



  /*-----------------Getting Project(site) list Start---------------------*/
  siteList() {
    let url = this.cmn.commonUrl + "financial/raisedMilestoneSites.spring";



    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "actionUrl": "View Suspense Entries"

    }



    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {


      if (resp.responseCode == 200) {

        var Options = "";
        //   $('#projectID').formSelect();

        $('#ProjectId').html('');
        $('#ProjectId').append('<option value="select">--Select--</option>');
        $('#lener_project').html('');
        $('#lener_project').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#ProjectId').append("<option value='" + resp.responseObjList[i].siteId + "'>" + resp.responseObjList[i].siteName + "</option>");
          $('#lener_project').append("<option value='" + resp.responseObjList[i].siteId + "'>" + resp.responseObjList[i].siteName + "</option>");

          //	$('#projectID').formSelect();
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
          $("#BlockId").attr("disabled", false)
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
    let url = this.cmn.commonUrl + "financial/activeBlocksFlats.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "blockIds": [blockid],//$("#BlockId").val()
      "siteIds": [$('#ProjectId').val()]
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
        $('#Lender_companybankAcId').html("");
        $('#Lender_companybankAcId').append("<option value='select'>" + "--Select--" + "</option>");
        for (var i = 0; i < resp.responseObjList.finProjectAccountResponseList.length; i++) {
          $('#companyAccnumberID').append("<option value='" + resp.responseObjList.finProjectAccountResponseList[i].siteAccountId + "'>" + resp.responseObjList.finProjectAccountResponseList[i].siteBankAccountNumber + "</option>");

          $('#Lender_companybankAcId').append("<option value='" + resp.responseObjList.finProjectAccountResponseList[i].siteAccountId + "'>" + resp.responseObjList.finProjectAccountResponseList[i].siteBankAccountNumber + "</option>");
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
      "bookingFormId": flatId_bookingid,
      "condition": "CRM_COMMENTS",
      "transactionTypeId": "1",
      "transactionModeId": '2',
      "transferModeId": PaymentModeID_value,
      "transactionTypeName": "Receipt",
      "transactionModeName": "Online",
      "transferModeName": PaymentModeID_name,
      "requestUrl": "createTransaction",
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


        $('#LegalInvoiceId').append('<option value="select">--Select--</option>');
        $('#ModificationInvoiceId').append('<option value="select">--Select--</option>');
        $('#CarparkingInvoiceId').append('<option value="select">--Select--</option>');

        if (resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList.length != 0) {
          for (var i = 0; i < resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList.length; i++) {
            this.setOffTypeName = resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].metadataName;

            this.controllerdata = resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i];

            if (this.setOffTypeName == "MODIFICATION_COST") {
              $('#ModificationInvoiceId').append("<option value='" + resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo + '$$' + resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].documentLocation + "'>" + resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo + "</option>");
              //  $('#ModificationInvoiceId').val(this.modificationChargeInvoiceID);
            } else if (this.setOffTypeName == "LEGAL_COST") {
              $('#LegalInvoiceId').append("<option value='" + resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo + '$$' + resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].documentLocation + "'>" + resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo + "</option>");
              // $('#LegalInvoiceId').val(this.legalChargeInvoiceID);
            } else if (this.setOffTypeName == "CAR_PARKING_COST") {
              $('#CarparkingInvoiceId').append("<option value='" + resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo + '$$' + resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].documentLocation + "'>" + resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo + "</option>");
              // $('#CarparkingInvoiceId').val(this.carparkingInvoiceID);
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
      console.log(resp);

      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        flatId = resp.responseObjList[0].flatId;
        flatId_bookingid = resp.responseObjList[0].flatBookingId;
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


  /*-----------------Getting grid details start---------------------*/
  gridDetails(flatId, flatId_bookingid) {
    console.log(flatId_bookingid);

    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/viewPendingAmount.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "flatIds": [flatId],
      "bookingFormId": flatId_bookingid,
      "transactionTypeId": "1",
      "transactionModeId": '2',
      "transferModeId": PaymentModeID_value,
      "transactionTypeName": "Receipt",
      "transactionModeName": "Online",
      "transferModeName": PaymentModeID_name,
      "requestUrl": "createTransaction",
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

  viewinvoicefun() {

    window.open(invoicedetails_url);
  }

  Modificationfun() {
    window.open(ModificationInvoice_url);
  }
  /*-----------------Getting Project(site) list End---------------------*/
  handle_FileSelect1(evt) {
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


              this.urls1.push({
                'upload': event.target.result,
                'Type': this.filenameval,
                'Name': this.filename,
              });

              console.log(this.urls1);
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
      this.urls1 = [];

      this.tempfileInfo = [];
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

    console.log(this.filename_extension);

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

  Deleteimage1(val) {

    this.urls1.splice(val, 1);
    this.tempfileInfo.splice(val, 1);
    if (this.tempfileInfo.length == 0) {
      $('#files1').css("color", "black");
      $('#files1').val("");
      $('#imageLinkField').show();
      this.ortitle = true;
    } else {
      $('#imageLinkField').hide();
      this.ortitle = false;
    }
  }
  Cheque_numberfun(event: any) {
    console.log(event.target.value);
    cheque_number_value = event.target.value;
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

    console.log(readerEvt);
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
        this.fileName = this.sanitizer.bypassSecurityTrustResourceUrl(val);
      }, 1000);
      $('#imagemodal').modal('show');

    }
  }



  homeClick() {
    this.cmn.commonHomeNavigation();
  }



  CRMReceiptonlineSubmit(button_val) {



    if ($('#referenceNumberID').val() == "") {
      $('#referenceNumberID').focus();
      swal("Please enter the Reference Number");
      return false;
    }

    if ($('#receivedDateID').val() == "") {
      // $('#receivedDateID').focus();
      swal("Please select the Receive Date");
      return false;
    }

    if ($('#receivedAmountID').val() == "") {
      $('#receivedAmountID').focus();
      swal("Please enter the Received Amount");
      return false;
    }

    if ($('#PaymentModeID').val() == "select") {
      $('#PaymentModeID').focus();
      swal("Please select the Payment Mode");
      return false;
    }


    if ($("#bankNamesID").val() == "select" || $("#bankNamesID").val() == null) {
      swal("Please select customer bank name");
      $('#ProjectId').focus();
      return false;
    }



    if (button_val == "submit") {
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


      if ($("#companyAccnumberID").val() == "select") {
        swal("Please select company bank account");
        $('#companyAccnumberID').focus();
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
      



      if ($("#PrincipalAmount").val() == "0" && $("#ModificationCharges").val() == "0" && $("#InterstAmount").val() == "0"
        && $("#LeagalCharges").val() == "0" && $("#refunableCharges").val() == "0" && $('#TdsAmount').val() == "0"
        && $("#CorpusFund").val() == "0" && $("#MaintinaceCharges").val() == "0" && $("#FlatKhataBifurcation").val() == "0" && this.CorpusFund == "0" && this.MaintinaceCharges == "0" && this.FlatKhataBifurcation == "0" && this.carparkingcost_amount == "0" && this.Registration_And_Mutation_Charges == "0" && this.Non_refundable_Caution_Deposit == "0" && this.Electricity_Deposit == "0") {
        swal("Please enter Principle amount (OR) Corpus Fund (OR) Maintinance Charges (OR) Flat Khata Bifurcation (OR) Modification charges (OR) Interest amount (OR) Legal charges (OR) Refundable Advance (OR) Car parking cost (OR) Registration And Mutation Charges (OR) Non-refundable Caution Deposit (OR) Electricity Deposit");
        return false;
      }



      if ($("#ModificationCharges").val() != "0" && $("#ModificationCharges").val() != "") {
        if ($("#ModificationInvoiceId").val() == "select") {
          $("#ModificationInvoiceId").attr("disabled", false);
          swal("Please select modification invoice");
          $('#ModificationInvoiceId').focus();
          return false;
        }
      }

      if ($("#LeagalCharges").val() != "0" && $("#LeagalCharges").val() != "") {
        if ($("#LegalInvoiceId").val() == "select") {
          $("#LegalInvoiceId").attr("disabled", false);
          swal("Please select legal invoice");
          $('#LegalInvoiceId').focus();
          return false;
        }

      }





      var tempamount = (Number($('#PrincipalAmount').val()) + Number($('#InterstAmount').val()) + Number($('#refunableCharges').val())
        + Number($('#ModificationCharges').val()) + Number($('#LeagalCharges').val())) + Number(this.CorpusFund) + Number(this.MaintinaceCharges) + Number(this.FlatKhataBifurcation) + Number(this.carparkingcost_amount)
        + Number($('#TdsAmount').val()) + Number(this.Registration_And_Mutation_Charges) + Number(this.Non_refundable_Caution_Deposit) + Number(this.Electricity_Deposit);


      console.log(Number(tempamount.toFixed(2)));
      console.log(Number($('#receivedAmountID').val()));

      if (Number(tempamount.toFixed(2)) > Number($('#receivedAmountID').val())) {
        swal("Payment Setoff should be equal to transaction amount");
        return false;
      }

      if (Number(tempamount.toFixed(2)) < Number($('#receivedAmountID').val())) {
        swal("Payment Setoff should be equal to transaction amount");
        return false;
      }


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



      if (this.urls.length == 0) {
        swal("Please select attachment");
        return false;
      }

    }





    if ($("#BlockId").val() == "select") {
      this.blockIDvalue = null;
    } else {
      this.blockIDvalue = [$("#BlockId").val()];
    }
    this.banknamevalue = $('#bankNamesID').val();
    // this.banknametext = $('#bankNamesID').select2('data')[0].text;
    //  alert(this.banknamevalue)
    if (this.banknamevalue == "select" || this.banknamevalue == null) {
      this.banknamevalue = JSON.parse(null);
      this.banknametext = JSON.parse(null);
    } else {
      this.banknamevalue = $('#bankNamesID').val();
      this.banknametext = $('#bankNamesID').select2('data')[0].text;
    }

    if (confirm("Do you want to " + button_val + " the Page ?")) {


      if (this.tempfileInfo.length == 0) {
        this.tempfileInfo = null;
      } else {
        this.tempfileInfo = this.tempfileInfo;
      }


      if (this.blockIDvalue == null) {
        this.blockIDvalue = [];
      }


      if (this.finTransactionSetOffId == undefined || this.finTransactionSetOffId == "undefined" || this.finTransactionSetOffId == "") {
        this.finTransactionSetOffId = 0;
      }


      if (lagelinvoicenumber == undefined) {
        lagelinvoicenumber = null;
      }

      if (modificationinvoice == undefined) {
        modificationinvoice = null;
      }

      if (carparkinginvoicenumber == undefined) {
        carparkinginvoicenumber = null;
      }


      $('.page-loader-wrapper').show();

      let url = this.cmn.commonUrl + "financial/saveFinancialTransactionReceiptRequest.spring";


      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      var body = {
        "isWithoutSuspenseEntry": "yes",
        "sessionKey": sessionStorage.getItem("login_sessionkey"),
        "siteId": $("#ProjectId").val(),
        "siteName": $('#ProjectId').select2('data')[0].text,
        "transactionTypeId": "1",
        "transactionModeId": '2',
        "transferModeId": PaymentModeID_value,
        "transactionTypeName": "Receipt",
        "transactionModeName": "Online",
        "transferModeName": PaymentModeID_name,
        "referenceNo": $('#referenceNumberID').val(),
        //"transactionDate": json_response.createdDate,
        "transactionReceiveDate": new Date($("#receivedDateID").val()).getTime(),
        "transactionAmount": $('#receivedAmountID').val(),
        "payableAmount": "0",
        "blockIds": this.blockIDvalue,
        "floorIds": [],
        "flatIds": [flatId],
        "bookingFormId": flatId_bookingid,
        "bankId": this.banknamevalue,
        "bankName": this.banknametext,
        "bankAccountNumber": "",
        "siteAccountId": $("#companyAccnumberID").val(),
        "siteBankAccountNumber": $('#companyAccnumberID').select2('data')[0].text,
        "paymentSetOff": "true",
        "sourceOfFunds": $("#Sourcefound").val(),
        "paymentSetOffDetails": [{ "setOffTypeName": "Principal_Amount", "amount": $("#PrincipalAmount").val() }
          , { "setOffTypeName": "Fin_Penalty", "amount": $("#InterstAmount").val() }
          , { "setOffTypeName": "Refundable_Advance", "amount": $("#refunableCharges").val(), "invoiceNo": null }
          , { "setOffTypeName": "Modification_Cost", "amount": $("#ModificationCharges").val(), "invoiceNo": modificationinvoice }
          , { "setOffTypeName": "Legal_Cost", "amount": $("#LeagalCharges").val(), "invoiceNo": lagelinvoicenumber }

          , { "setOffTypeName": "Car_Parking_Cost", "amount": $("#carparkingcost").val(), "invoiceNo": carparkinginvoicenumber }


          , { "finTransactionSetOffId": this.finTransactionSetOffId, "setOffTypeName": "TDS", "amount": $("#TdsAmount").val(), "paidByName": this.finpaidbyname }
          , { "setOffTypeName": "Maintenance_Charge", "amount": this.MaintinaceCharges }
          , { "setOffTypeName": "Corpus_Fund", "amount": this.CorpusFund }
          , { "setOffTypeName": "Individual_Flat_Khata_bifurcation_and_other_charges", "amount": this.FlatKhataBifurcation }

          , { "setOffTypeName": "Registration_And_Mutation_Charges", "amount": this.Registration_And_Mutation_Charges }
          , { "setOffTypeName": "Non_refundable_Caution_Deposit", "amount": this.Non_refundable_Caution_Deposit }
          , { "setOffTypeName": "Electricity_Deposit", "amount": this.Electricity_Deposit }
          
        ],
        "comment": $("#misStatementCommentsID").val(),
        "comments": [{
          "BANK_STATEMENT": $("#bankStatementCommentsID").val()
        }],
        "fileInfos": this.tempfileInfo

      }

      console.log(JSON.stringify(body));




      this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {


        console.log(resp);
        $('.page-loader-wrapper').hide();
        if (resp.responseCode == 200) {
          swal({ title: resp.status },

            function () {
              location.reload();
            }
          );



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
          swal({ title: error },
            function () {
              location.reload();
            }
          );
          if (error == 440) {
            swal("Your Session has been Timed Out!", "Please login once again.", "error");
            this.router.navigate([""]);
          }
        }
      );


    }
  }



  carparkinginvoicefun() {

    window.open(carparkingdetails_url);
  }
  siteBankList(siteid) {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/viewFinProjectAccountData.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteIds": [siteid]
    }

    console.log(body);

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      console.log(resp);

      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();


        $('#Lender_companybankAcId').html('');
        $('#Lender_companybankAcId').append('<option value="select">--Select--</option>');

        $('#companybankAcId').html('');
        $('#companybankAcId').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.finProjectAccountResponseList.length; i++) {
          $('#companybankAcId').append("<option value='" + resp.responseObjList.finProjectAccountResponseList[i].siteAccountId + "'>" + resp.responseObjList.finProjectAccountResponseList[i].siteBankAccountNumber + "</option>");
          $('#Lender_companybankAcId').append("<option value='" + resp.responseObjList.finProjectAccountResponseList[i].siteAccountId + "'>" + resp.responseObjList.finProjectAccountResponseList[i].siteBankAccountNumber + "</option>");

        }
        $("#companybankAcId").attr("disabled", false)
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
  other_submitfun() {

    if ($('#ChequeNumber').val() == "") {
      $('#ChequeNumber').focus();
      swal("Please enter the Reference Number");
      return false;
    }

    if ($('#ChequeDate').val() == "") {
      // $('#receivedDateID').focus();
      swal("Please select the Receive Date");
      return false;
    }

    if ($('#ChequeAmount').val() == "") {
      $('#ChequeAmount').focus();
      swal("Please enter the Received Amount");
      return false;
    }

    if ($('#PaymentModeID_lender').val() == "select") {
      $('#PaymentModeID_lender').focus();
      swal("Please select the Payment Mode");
      return false;
    }


    // if ($("#lender_bank_name").val() == "select" || $("#lender_bank_name").val() == null) {
    //   swal("Please select customer bank name");
    //   $('#ProjectId').focus();
    //   return false;
    // }




    if ($("#lener_project").val() == "select") {
      swal("Please select project");
      $('#ProjectId').focus();
      return false;

    }
    if ($("#lender_name").val() == "select") {
      swal("Please select lender name");
      $('#BlockId').focus();
      return false;
    }


    if ($("#Lender_companybankAcId").val() == "select") {
      swal("Please select company account number");
      $('#companyAccnumberID').focus();
      return false;
    }

    if (this.urls1.length == 0) {
      swal("Please select attachment");
      return false;
    }
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
    if ($("#lender_bank_name").val() == "select") {
      this.customerbankid = null;
    } else {
      this.customerbankid = $("#lender_bank_name").val();
    }

    if ($('#lender_bank_name').select2('data')[0].text == "--Select--") {
      this.customerbankname = null;
    } else {
      this.customerbankname = $('#lender_bank_name').select2('data')[0].text;
    }
    $('.page-loader-wrapper').show();

    let url = this.cmn.commonUrl + "financial/saveLenderTrnsactionRequest.spring";

    console.log(url)
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    var body = {
      "lenderId": $('#lender_name').val(),
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteId": $('#lener_project').val(),
      "siteName": $('#lener_project').select2('data')[0].text,
      "transactionTypeId": "1",
      "transactionModeId": "2",
      "transferModeId": $('#PaymentModeID_lender').val(),
      "transactionTypeName": "Receipt",
      "transactionModeName": "Online",
      "transferModeName": $('#PaymentModeID_lender').select2('data')[0].text,
      "referenceNo": $('#ChequeNumber').val(),
      "transactionReceiveDate": new Date($("#ChequeDate").val()).getTime(),
      "transactionAmount": $('#ChequeAmount').val(),
      "bankId": this.customerbankid,
      "bankName": this.customerbankname,
      "bankAccountNumber": "",
      "siteAccountId": $('#Lender_companybankAcId').val(),
      "siteBankAccountNumber": $('#Lender_companybankAcId').select2('data')[0].text,
      "paymentSetOff": "true",
      "sourceOfFunds": "Bank",
      "paymentSetOffDetails": [
        {
          "setOffTypeName": "LENDER_PAYMENT",
          "amount": $('#ChequeAmount').val()
        }
      ],
      "comment": $('#Lendercommentsid').val(),
      "comments": [
        {
          "BANK_STATEMENT": $('#bankcomentsID').val(),
        }
      ],
      "fileInfos": this.tempfileInfo

    }

    console.log(JSON.stringify(body));

    // return false;


    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {


      console.log(JSON.stringify(resp));
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        swal({ title: resp.description },

          function () {
            location.reload();
          }
        );



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
        swal({ title: error },
          function () {
            location.reload();
          }
        );
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }



}
