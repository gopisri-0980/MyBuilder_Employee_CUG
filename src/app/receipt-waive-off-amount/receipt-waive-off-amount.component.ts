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
  selector: 'app-receipt-waive-off-amount',
  templateUrl: './receipt-waive-off-amount.component.html',
  styleUrls: ['./receipt-waive-off-amount.component.sass']
})
export class ReceiptWaiveOffAmountComponent implements OnInit {
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

    this.transactionType();
    this.siteList();
    this.lendorNamesList()
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
    $("#payment_Type").select2({
      placeholder: "Select payment from",
      dir: "ltl"
    });
    $("#lener_project").select2({
      placeholder: "Select project",
      dir: "ltl"
    });
    $("#lender_name").select2({
      placeholder: "Select Lender Name",
      dir: "ltl"
    });
    $('#lener_project').change(function (e) {
      var siteId = $(e.target).val();
      siteidsvalue = $(e.target).val();
      if ($(e.target).val() == "select") {



      } else {
        //self.blockList(siteId);
       // self.siteBankList(siteId);
      //  self.flatsitewisechange(siteId);
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

          self.modification_legalInvoiceList(flatId);
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
    $('#ChequeAmount').bind("cut copy paste", function (e) {
      e.preventDefault();
    });




  }


  // keyPress(event: any) {
  //   const pattern = /[0-9\ ]/;
  //   let inputChar = String.fromCharCode(event.charCode);
  //   if (event.keyCode != 8 && !pattern.test(inputChar)) {
  //     event.preventDefault();
  //   }
  // }

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
  modification_legalInvoiceList(flatId) {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/viewPendingAmount.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "flatIds": [flatId].map(Number),//$("#FaltId").val(),
      "condition": "CRM_COMMENTS",
      "requestUrl": "createTransaction",
      "transactionTypeId": "1",
      "transactionModeId": "1",
      "transactionTypeName": "Receipt",
      "transactionModeName": "Cheque",
      "bookingFormIds": [this.bookingformIDS],
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

        if (resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList.length != 0) {
          for (var i = 0; i < resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList.length; i++) {
            this.setOffTypeName = resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].metadataName;

            this.controllerdata = resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i];

            if (this.setOffTypeName == "MODIFICATION_COST") {
              $('#ModificationInvoiceId').append("<option value='" + resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo + '$$' + resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].documentLocation + "'>" + resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo + "</option>");
              $('#ModificationInvoiceId').val(this.modificationChargeInvoiceID);
            } else if (this.setOffTypeName == "LEGAL_COST") {
              $('#LegalInvoiceId').append("<option value='" + resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo + '$$' + resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].documentLocation + "'>" + resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo + "</option>");
              $('#LegalInvoiceId').val(this.legalChargeInvoiceID);
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


        for (var i = 0; i < resp.responseObjList.finTransactionModeResponseList.length; i++) {
          $('#transaction_mode').append("<option value='" + resp.responseObjList.finTransactionModeResponseList[i].transactionModeId + "'>" + resp.responseObjList.finTransactionModeResponseList[i].name + "</option>");

        }


        for (var i = 0; i < resp.responseObjList.finBankResponseList.length; i++) {
          $('#bank_type').append("<option value='" + resp.responseObjList.finBankResponseList[i].finBankId + "'>" + resp.responseObjList.finBankResponseList[i].bankName + "</option>");

        }


        // $('#bank_type').html('');
        // $('#bank_type').append('<option value="select">--Select--</option>');
        // $('#transaction_type').html('');
        // $('#transaction_type').append('<option value="select">--Select--</option>');
        // $('#transaction_mode').html('');
        // $('#transaction_mode').append('<option value="select">--Select--</option>');
        // for (var i = 0; i < resp.responseObjList.finTrnasactionTypeResponseList.length; i++) {
        //   $('#transaction_type').append("<option value='" + resp.responseObjList.finTrnasactionTypeResponseList[i].transactionTypeId + "'>" + resp.responseObjList.finTrnasactionTypeResponseList[i].name + "</option>");

        // }
        // for (var i = 0; i < resp.responseObjList.finTransactionModeResponseList.length; i++) {
        //   $('#transaction_mode').append("<option value='" + resp.responseObjList.finTransactionModeResponseList[i].transactionModeId + "'>" + resp.responseObjList.finTransactionModeResponseList[i].name + "</option>");

        // }


        // for (var i = 0; i < resp.responseObjList.finBankResponseList.length; i++) {
        //   $('#bank_type').append("<option value='" + resp.responseObjList.finBankResponseList[i].finBankId + "'>" + resp.responseObjList.finBankResponseList[i].bankName + "</option>");

        // }


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
        $('#lener_project').html('');
        $('#lener_project').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#ProjectId').append("<option value='" + resp.responseObjList[i].siteId + "'>" + resp.responseObjList[i].siteName + "</option>");
          $('#lener_project').append("<option value='" + resp.responseObjList[i].siteId + "'>" + resp.responseObjList[i].siteName + "</option>");

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

  CRMReceiptChequeSubmit() {



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


    if ($("#ProjectId").val() == "select" || $("#ProjectId").val() == null || $("#ProjectId").val() == "") {
      swal("Please select project");
      $('#ProjectId').focus();
      return false;
    }


    if ($("#FaltId").val() == "select" || $("#FaltId").val() == null || $("#FaltId").val() == "") {
      swal("Please select flat");
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


    //  $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/checkDuplicateTransactionOrNot.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "transactionAmount": this.transactionAmount,
      "bankId": null,
      "chequeNumber": null,
      "referenceNo": null,
      "bookingFormId": this.bookingFormId,
      "transactionDate": null,
      "transactionReceiveDate": new Date($("#ChequeDate").val()).getTime(),
    }

    console.log(JSON.stringify(body));

    this.http.post(url, body).map(res => res.json()).subscribe(resp => {

      console.log(JSON.stringify(resp))
      if (resp.responseCode == 200) {
         $('.page-loader-wrapper').hide();  

        if (confirm("Do you want to Submit the Page ?")) {
          this.final_submission_crmReceiptcheque();
        } else { }

      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else if (resp.responseCode == 800) {
         $('.page-loader-wrapper').hide();  
        swal(resp.description);
        return false;
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

  final_submission_crmReceiptcheque() {

    this.finpaidbyname = $("#paidbyname").val();

    if (this.finpaidbyname == "select") {
      this.finpaidbyname = null;
    }

    if ($("#BlockId").val() == "select") {
      this.blockIDvalue = [];
    } else {
      this.blockIDvalue = [$("#BlockId").val()];
    }

    $('.page-loader-wrapper').show();
    // -------------------------------
    let url = this.cmn.commonUrl + "financial/saveFinancialTransactionReceiptRequest.spring";
    console.log(url);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    if (this.bookingformIDS == undefined) {
      this.bookingformIDS = "";
    }



    if (lagelinvoicenumber == undefined) {
      lagelinvoicenumber = null;
    }

    if (modificationinvoice == undefined) {
      modificationinvoice = null;
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



    var body = {
      "sessionKey": sessionStorage.getItem("login_sessionkey"),
      "bookingFormId": this.bookingformIDS,
      "siteId": $("#ProjectId").val(),
      "siteName": $('#ProjectId').select2('data')[0].text,
      "transactionTypeId": "1",
      "transactionModeId": "5",
      "transactionTypeName": "Receipt",
      "transactionModeName": "waived off",
      "transactionReceiveDate": new Date($("#ChequeDate").val()).getTime(),
      "chequeDepositedDate": null,
      "transactionAmount": $("#ChequeAmount").val(),
      "blockIds": this.blockIDvalue,
      "floorIds": [],
      "flatIds": [flatId],
      "chequeBounceValue": "false",
      "paymentSetOffDetails": [{ "setOffTypeName": "Principal_Amount", "amount": $("#PrincipalAmount").val() }
        , { "setOffTypeName": "Fin_Penalty", "amount": $("#InterstAmount").val() }
        , { "setOffTypeName": "Refundable_Advance", "amount": $("#refunableCharges").val(), "invoiceNo": "" }
        , { "setOffTypeName": "Modification_Cost", "amount": $("#ModificationCharges").val(), "invoiceNo": modificationinvoice }
        , { "setOffTypeName": "Legal_Cost", "amount": $("#LeagalCharges").val(), "invoiceNo": lagelinvoicenumber }
        , { "setOffTypeName": "TDS", "amount": $("#TdsAmount").val(), "paidByName": this.finpaidbyname }
        , { "setOffTypeName": "Maintenance_Charge", "amount": this.MaintinaceCharges }
        , { "setOffTypeName": "Corpus_Fund", "amount": this.CorpusFund }
        , { "setOffTypeName": "Individual_Flat_Khata_bifurcation_and_other_charges", "amount": this.FlatKhataBifurcation }
      ],
      "comments": [{ "CUSTOMER": $("#CustomerCommentsId").val() }],
      "comment": $("#CrmCommentsId").val(),
      "fileInfos": []
    }



    console.log(url);

    console.log(JSON.stringify(body));



    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

      console.log(JSON.stringify(resp));

       $('.page-loader-wrapper').hide();  
      if (resp.responseCode == 200) {
         $('.page-loader-wrapper').hide();  
        swal({ title: "Transaction sent successfully" },
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

  lendorNamesList() {
    $('.page-loader-wrapper').show();

    let url = this.cmn.commonUrl + "lendor/getLendorDetails.spring";


    let headers = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: headers });

    var body = {
      "sessionKey":  "" + sessionStorage.getItem("login_sessionkey"),
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


  other_submitfun(){

    console.log($('#waiveoff_Date').val());
    console.log($('#waiveoff_Amount').val());
    console.log($("#lener_project").val());
    console.log($("#lender_name").val());

   
   
    if ($('#waiveoff_Date').val() == "") {
      // $('#receivedDateID').focus();
      swal("Please select Waive Off Date");
      return false;
    }

    if ($('#waiveoff_Amount').val() == "") {
      $('#waiveoff_Amount').focus();
      swal("Please enter the Waive Off Amount");
      return false;
    }

  
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


      $('.page-loader-wrapper').show();

      let url = this.cmn.commonUrl + "financial/saveLenderTrnsactionRequest.spring";


      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      var body = 
      {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "lenderId": $('#lender_name').val(),
        "siteId":  $('#lener_project').val(),
        "siteName": $('#lener_project').select2('data')[0].text,
        "transactionTypeId": "1",
        "transactionModeId": "5",
        "transactionTypeName": "Receipt",
        "transactionModeName": "waived off",
        "transactionReceiveDate": new Date($("#waiveoff_Date").val()).getTime(),
        "transactionAmount":$('#waiveoff_Amount').val(),
        "paymentSetOffDetails": [
          {
              "setOffTypeName": "LENDER_PAYMENT",
              "amount": $('#waiveoff_Amount').val()
          }
      ],
      "comments": [{ "CUSTOMER": $("#Lendercommentsid").val() }],
      "comment": $("#bankcomentsID").val(),
      "fileInfos": []
    }


console.log(url);
console.log(JSON.stringify(body));


    


      this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

console.log(resp);
        console.log(JSON.stringify(resp));
         $('.page-loader-wrapper').hide();  
        if (resp.responseCode == 200) {
          swal({ title: resp.description},

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
