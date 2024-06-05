import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
import { unwatchFile } from 'fs';
import { DomSanitizer } from '@angular/platform-browser';
import { stringify } from '@angular/core/src/util';
declare const $: any;
declare const swal: any;
var base64textString;
var checkedornot;
var flatId_bookingid;
var flatId
var selected_paymentid;
var refundFromMileStone;
var bookingformIDS;
var siteidsvalue;
var invoicedetails_url;
var ModificationInvoice_url;
var lagelinvoicenumber;
var modificationinvoice;

var carparkingdetails_url;
var carparkinginvoicenumber;

var Assignment_trnsfer_Invoice_url;
var Assignment_invoicenumber;


@Component({
  selector: 'app-crm-receipt-payment',
  templateUrl: './crm-receipt-payment.component.html',
  styleUrls: ['./crm-receipt-payment.component.sass']
})
export class CrmReceiptPaymentComponent implements OnInit {
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
  bookingFormId: any;
  setOffTypeName: any;
  controller: number[];
  blockIDvalue: any;
  AmountRefund: string;
  previousUrl: string;
  currentUrl: string;
  public edited = false;
  filenameval: any;
  urls: Array<any> = [];
  imgsrc: any;

  fileUrl: any;
  imageUrl: string | ArrayBuffer;
  base64_array_object_data: any = [];
  ortitle: boolean;
  public fileName;
  extensiontype: any;
  filetypeurlsplit: any;
  filetypeurlsplit1: any;
  filenamedoc: any;
  filesplitdata: any;
  customerbankid: any;
  customerbankname: any;
  companybankAcIdval: any;
  companybankAcIdtext: any;
  controllerdata: any;

  CorpusFund: any;
  MaintinaceCharges: any;
  FlatKhataBifurcation: any;
  bankaccount_number: any;
  carparkingcost_amount: any;
  Assignment_transfer_fee_Amount: any;
  paymentfor_text: any;
  Registration_And_Mutation_Charges: any;
  Non_refundable_Caution_Deposit: any;
  Electricity_Deposit: any;

  constructor(private cmn: CommonComponent, private http: Http, private router: Router, private sanitizer: DomSanitizer) {
    $('.page-loader-wrapper').hide();
    checkedornot = false;
    this.transactionType();
    //this.PaymentFor();
    this.siteList();
    //  this.transactionFor();

  }

  ngOnInit() {

    this.router.events
      .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
      .subscribe((events: RoutesRecognized[]) => {

        this.previousUrl = events[0].urlAfterRedirects;
        this.currentUrl = events[1].urlAfterRedirects;


        if (this.previousUrl.includes('/dashboard')) {
          sessionStorage.removeItem("crmrefund");
          sessionStorage.removeItem("NonRefundFlats");
        } else {
          sessionStorage.removeItem("crmrefund");
          sessionStorage.removeItem("NonRefundFlats");
        }

      }, error => {


      }
      );



    if (JSON.parse(sessionStorage.getItem("NonRefundFlats")) !== null) {
      this.AmountRefund = JSON.parse(sessionStorage.getItem("NonRefundFlats"));
      // this.RefundflatDetails(); 
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

      $('#ChequeAmount').bind("cut copy paste", function (e) {
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



      $('#checlist').click(function () {
        if ($(this).prop("checked") == true) {
          $("#PaymentSetOffDiv").show();
        } else { }
      });

      $("#transaction_type").select2({
        placeholder: "Search transaction type",
        dir: "ltl"
      });
      $("#transactionmodeid").select2({
        placeholder: "Search transaction mode",
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


      $("#Sourcefound").select2({
        placeholder: "Source of funds",
        dir: "ltl"
      });


      $("#Paymentfor").select2({
        placeholder: "Search Payment For",
        dir: "ltl"
      });


      $("#CarparkingInvoiceId").select2({
        placeholder: "Search Car Parking Invoice",
        dir: "ltl"
      });


      $("#AssignmentfeeInvoiceId").select2({
        placeholder: "Assignment Transfer Fee Invoice",
        dir: "ltl"
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


      $("#AssignmentfeeInvoiceId").change(function (e) {
        console.log($(e.target).val());
        if ($(e.target).val() !== 'select') {
          $(".Assignment_tranferinvoicecls").show();
          Assignment_trnsfer_Invoice_url = $(e.target).val().split('$$')[1];
          Assignment_invoicenumber = $(e.target).val().split('$$')[0];
        } else {
          $(function () {
            $(".Assignment_tranferinvoicecls").hide();
          })
        }
      });



      $('#ProjectId').change(function (e) {
        siteidsvalue = $(e.target).val();
        if ($(e.target).val() == "select") {
          $("#BlockId option[value]").remove();
          $("#FaltId option[value]").remove();
        } else {



          var siteId = $(e.target).val();
          if (JSON.parse(sessionStorage.getItem("NonRefundFlats")) !== null && selected_paymentid == undefined) {
            this.AmountRefund = JSON.parse(sessionStorage.getItem("NonRefundFlats"));
            self.blockList(siteId);
            self.siteBankList(siteId);
            self.RefundflatDetails();
          } else if (JSON.parse(sessionStorage.getItem("NonRefundFlats")) !== null && selected_paymentid == "2") {
            this.AmountRefund = JSON.parse(sessionStorage.getItem("NonRefundFlats"));
            self.blockList(siteId);
            self.siteBankList(siteId);
            self.RefundflatDetails();
          } else {

            self.flatsitewisechange(siteId);
            self.blockList(siteId);
            self.siteBankList(siteId);
          }

          $("#BlockId").attr("disabled", false)
        }
      });

      $('#BlockId').change(function (e) {
        var siteId = $(e.target).val();

        if ($(e.target).val() == "select") {
          if (JSON.parse(sessionStorage.getItem("NonRefundFlats")) !== null) {
            self.RefundflatDetails();
          } else {
            self.flatsitewisechange(siteidsvalue);
          }

        } else {



          if (JSON.parse(sessionStorage.getItem("NonRefundFlats")) !== null && selected_paymentid == undefined) {
            this.AmountRefund = JSON.parse(sessionStorage.getItem("NonRefundFlats"));
            self.RefundflatDetailsblock(siteId);
          } else if (JSON.parse(sessionStorage.getItem("NonRefundFlats")) !== null && selected_paymentid == "2") {
            this.AmountRefund = JSON.parse(sessionStorage.getItem("NonRefundFlats"));
            self.RefundflatDetailsblock(siteId);
          } else {
            self.flatList(siteId);
          }
        }



      });

      $('#FaltId').change(function (e) {



        if ($(e.target).val() == "select") {
          $(".viewinvoicecls").hide();
          $(".Modificationinvoicecls").hide();

          $(".Assignment_tranferinvoicecls").hide();
        }

        flatId = $(e.target).val().split('-')[0];
        flatId_bookingid = $(e.target).val().split('-')[1];

        console.log(flatId);
        console.log(flatId_bookingid);


        bookingformIDS = $(e.target).val().split('-')[1];
        if ($(e.target).val() == "select") {
        } else {

          if ($("#transactionmodeid").val() == "select" || $("#transactionmodeid").val() == null) {
            swal("Please select transaction mode");
            $('#transactionmodeid').focus();
            $('#FaltId').val(['select']);
            $('#FaltId').trigger('change');
            return false;
          }
          if ($("#Paymentfor").val() == "select" || $("#Paymentfor").val() == null) {
            swal("Please select payment for");
            $('#Paymentfor').focus();
            $('#FaltId').val(['select']);
            $('#FaltId').trigger('change');
            return false;
          }





          self.forFlatbookingIdkList(flatId, flatId_bookingid)

          console.log(JSON.parse(sessionStorage.getItem("NonRefundFlats")));

          if (JSON.parse(sessionStorage.getItem("NonRefundFlats")) !== null) {
            this.AmountRefund = JSON.parse(sessionStorage.getItem("NonRefundFlats"));
            self.gridDetails(flatId, flatId_bookingid);

            if (flatId_bookingid !== undefined) {
              self.modification_legalInvoiceList(flatId);
            }

          } else {
            self.forFlatbookingIdkList(flatId, flatId_bookingid)

            if (flatId_bookingid !== undefined) {
              self.modification_legalInvoiceList(flatId);
            }
          }
        }
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





      var date = new Date().getMonth();
      var minimumdate = new Date().setMonth(date - 3);
      var maximumdate = new Date().setMonth(date + 3);
      $('#ChequeDate').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
        minDate: new Date(minimumdate),
        maxDate: new Date(),
        clearButton: true,
        weekStart: 1,
        time: false
      });

    });


    $(function () {
      $('#Paymentfor').change(function (e) {
        selected_paymentid = $(e.target).val();

        console.log(selected_paymentid);

        if (selected_paymentid == 2) {
          $("#ProjectId").trigger('change');

          $("#BlockId option[value]").remove();
          $("#FaltId option[value]").remove();
          refundFromMileStone = "true";
          self.RefundflatDetails();

        } else {
          // $("#ProjectId option[value]").remove();

          $("#ProjectId").trigger('change');

          $("#BlockId option[value]").remove();
          $("#FaltId option[value]").remove();
          refundFromMileStone = "false";


        }

      })
    })
  }


  Assignment_Invoice(event) {

    if (event.target.value !== "" && event.target.value !== "0") {
      $("#AssignmentfeeInvoiceId").prop("disabled", false);


    } else {
      $("#AssignmentfeeInvoiceId").prop("disabled", true);
      $("#AssignmentfeeInvoiceId").val("select");
      $("#AssignmentfeeInvoiceId").trigger('change');
      $("#Assignment_tranferinvoicecls").hide();
    }


  }



  viewinvoicefun() {

    window.open(invoicedetails_url);
  }

  Modificationfun() {
    window.open(ModificationInvoice_url);
  }


  Assignment_invoicefun() {

    window.open(Assignment_trnsfer_Invoice_url);
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
        $('#transactionmodeid').html('');
        $('#transactionmodeid').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.finTransactionModeResponseList.length; i++) {
          $('#transactionmodeid').append("<option value='" + resp.responseObjList.finTransactionModeResponseList[i].transactionModeId + "'>" + resp.responseObjList.finTransactionModeResponseList[i].name + "</option>");

        }
        for (var i = 0; i < resp.responseObjList.finBankResponseList.length; i++) {
          $('#bank_type').append("<option value='" + resp.responseObjList.finBankResponseList[i].finBankId + "'>" + resp.responseObjList.finBankResponseList[i].bankName + "</option>");

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

  /*------------------------Transaction for start-------------------*/
  transactionFor() {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/viewFinTransactionTypeModeData.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "condition": "Payment"
    }



    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

      console.log("----------" + JSON.stringify(resp))
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#Paymentfor').html('');
        $('#Paymentfor').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.transactionForResponseList.length; i++) {
          $('#Paymentfor').append("<option value='" + resp.responseObjList.transactionForResponseList[i].transactionforId + "'>" + resp.responseObjList.transactionForResponseList[i].name + "</option>");

        }
        if (JSON.parse(sessionStorage.getItem("NonRefundFlats")) !== null) {
          $("#Paymentfor").val(2);
          // $('#Paymentfor').prop('disabled', true);
        } else {
          $("#Paymentfor").val("");
          //  $('#Paymentfor').prop('disabled', false);
        }


        // setTimeout(() => {
        //   $('#bank_type').val(2);
        // }, 2000);

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

  /*-----------------site bank list start---------------------*/
  /*-----------------site bank list End---------------------*/
  siteBankList(siteid) {
    $('.page-loader-wrapper').show();
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
        }
        $("#companybankAcId").attr("disabled", false)
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
        $("#BlockId").attr("disabled", false)
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
  gridDetails(flatId, bookingid) {



    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/viewPendingAmount.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "flatIds": [flatId],
      "bookingFormId": bookingid,
      "transactionTypeId": "2",// $("#transaction_type").val(),
      "transactionModeId": $("#transactionmodeid").val(),
      "transactionTypeName": "Payment", //$('#transaction_type').select2('data')[0].text,
      "transactionModeName": $("#transactionmodeid").select2('data')[0].text,
      "transactionFor": $("#Paymentfor").select2('data')[0].text,
      "transactionForId": $("#Paymentfor").val(),
      "requestUrl": "createTransaction",
      "buttonType": "initiatepayemt"
    }




    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

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


  /*-------------------------------Final Submission Start----------------------------*/
  CRMPaymentChequeSubmit() {





    if ($("#transactionmodeid").val() == "select") {
      swal("Please select transaction mode");
      $('#transactionmodeid').focus();
      return false;
    }


    if ($("#Paymentfor").val() == "select" || $("#Paymentfor").val() == null) {
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

    if ($("#carparkingcost").val() == undefined || $("#carparkingcost").val() == "") {
      this.carparkingcost_amount = 0;
    } else {
      this.carparkingcost_amount = $("#carparkingcost").val();
    }

    if ($("#Assignment_transfer_fee").val() == undefined || $("#Assignment_transfer_fee").val() == "") {
      this.Assignment_transfer_fee_Amount = 0;
    } else {
      this.Assignment_transfer_fee_Amount = $("#Assignment_transfer_fee").val();
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



    if (selected_paymentid == 2) {
      if ($("#PrincipalAmount").val() == "0" && $("#CancelationCharges").val() == "0"
        && $("#ModificationCharges").val() == "0"
        && $("#InterstAmount").val() == "0" && $("#LeagalCharges").val() == "0"
        && $("#refunableCharges").val() == "0" && this.CorpusFund == "0" && this.MaintinaceCharges == "0" && this.FlatKhataBifurcation && this.carparkingcost_amount == "0" && this.Assignment_transfer_fee_Amount == "0" && this.Registration_And_Mutation_Charges == "0" && this.Non_refundable_Caution_Deposit == "0" && this.Electricity_Deposit == "0") {
        swal("Please enter Principle amount (OR) Corpus Fund (OR) Maintinance Charges (OR) Flat Khata Bifurcation (OR) Modification charges (OR) Interest amount (OR) Cancellation charges (OR) Legal charges (OR) Refundable Advance (OR) Car parking cost (OR) Assignment Transfer Fee (OR) Registration And Mutation Charges (OR) Non-refundable Caution Deposit (OR) Electricity Deposit");
        return false;
      }

      if ($("#CancelationCharges").val() == "") {
        swal("Please enter cancellation charges");
        $('#CancelationCharges').focus();
        return false;
      }
    } else {
      if ($("#PrincipalAmount").val() == "0" && $("#ModificationCharges").val() == "0" && $("#InterstAmount").val() == "0"
        && $("#LeagalCharges").val() == "0" && $("#refunableCharges").val() == "0" && $("#CorpusFund").val() == "0" && $("#MaintinaceCharges").val() == "0" && $("#FlatKhataBifurcation").val() == "0" && $("#carparkingcost").val() == "0" && $("#Assignment_transfer_fee").val() == "0" && this.Registration_And_Mutation_Charges == "0" && this.Non_refundable_Caution_Deposit == "0" && this.Electricity_Deposit == "0") {
        swal("Please enter Principle amount (OR) Corpus Fund (OR) Maintenance Charges (OR) Flat Khata Bifurcation (OR) Modification charges (OR) Interest amount (OR) Legal charges (OR) Refundable Advance (OR) Car parking cost  (OR) Assignment Transfer Fee (OR) Registration And Mutation Charges (OR) Non-refundable Caution Deposit (OR) Electricity Deposit");
        return false;
      }
    }







    if ((Number($('#PrincipalAmount').val()) + Number($('#ModificationCharges').val()) + Number($('#InterstAmount').val()) + Number($('#LeagalCharges').val()) + Number(this.CorpusFund) + Number(this.MaintinaceCharges) + Number(this.FlatKhataBifurcation) + Number(this.carparkingcost_amount) + Number(this.Assignment_transfer_fee_Amount)
      + Number($('#refunableCharges').val())) + Number(this.Registration_And_Mutation_Charges) + Number(this.Non_refundable_Caution_Deposit) + Number(this.Electricity_Deposit) > Number($('#ChequeAmount').val())) {
      swal("Payment Setoff should be equal to Cheque amount");
      return false
    }

    if ((Number($('#PrincipalAmount').val()) + Number($('#ModificationCharges').val()) + Number($('#InterstAmount').val()) + Number($('#LeagalCharges').val()) + Number(this.CorpusFund) + Number(this.MaintinaceCharges) + Number(this.FlatKhataBifurcation) + Number(this.carparkingcost_amount) + Number(this.Assignment_transfer_fee_Amount) + Number($('#refunableCharges').val())) + Number(this.Registration_And_Mutation_Charges) + Number(this.Non_refundable_Caution_Deposit) + Number(this.Electricity_Deposit) < Number($('#ChequeAmount').val())) {
      swal("Payment Setoff should be equal to Cheque amount");
      return false
    }

    if ($("#ModificationCharges").val() != "0") {
      if ($("#ModificationInvoiceId").val() == "") {
        $("#ModificationInvoiceId").attr("disabled", false);
        swal("Please select modification invoice");
        $('#ModificationInvoiceId').focus();
        return false;
      }
    }

    if ($("#LeagalCharges").val() != "0") {
      $("#LegalInvoiceId").attr("disabled", false);
      if ($("#LegalInvoiceId").val() == "") {
        swal("Please select legal invoice");
        $('#LegalInvoiceId').focus();
        return false;
      }

    }


    if ($("#Assignment_transfer_fee").val() != "0") {
      $("#AssignmentfeeInvoiceId").attr("disabled", false);
      if ($("#AssignmentfeeInvoiceId").val() == "select" || $("#AssignmentfeeInvoiceId").val() == null) {
        swal("Please select assignment transfer fee");
        $('#AssignmentfeeInvoiceId').focus();
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




    // if ($("#companybankAcId").val() == "select") {
    //   swal("Please select company bank account");
    //   $('#companybankAcId').focus();
    //   return false;
    // }
    // this.companybankAcIdval = $('#companybankAcId').val();
    // // this.banknametext = $('#bankNamesID').select2('data')[0].text;
    // //  alert(this.banknamevalue)
    // if (this.companybankAcIdval == "select" || this.companybankAcIdval == null) {
    //   this.companybankAcIdval = JSON.parse(null);
    //   this.companybankAcIdtext = JSON.parse(null);
    // } else {
    //   this.companybankAcIdval = $('#companybankAcId').val();
    //   this.companybankAcIdtext = $('#companybankAcId').select2('data')[0].text;
    // }
    if (confirm("Do you want to Submit the Page ?")) {
      if (this.filename == undefined) {
        $('#files').focus();
        this.tempfileInfo = [];
      } else {
        // this.tempfileInfo = [{
        //   "extension": this.filename_extension,
        //   "name": this.filename,
        //   "base64": base64textString
        // }]
      }

      if ($("#BlockId").val() == "select") {
        this.blockIDvalue = null;
      } else {
        this.blockIDvalue = [$("#BlockId").val()].map(Number);
      }
      $('.page-loader-wrapper').show();

      if ($("#BlockId").val() == "select") {
        this.blockIDvalue = [];
      } else {
        this.blockIDvalue = [$("#BlockId").val()];
      }

      if (bookingformIDS == undefined) {
        bookingformIDS = "";
      }



      if ($("#bank_type").val() == "select") {
        this.customerbankid = null;
      } else {
        this.customerbankid = $("#bank_type").val();
      }

      if ($('#bank_type').select2('data')[0].text == "--Select--") {
        this.customerbankname = null;
      } else {
        this.customerbankname = $('#bank_type').select2('data')[0].text;
      }


      if ($("#Paymentfor").val() == 2) {
        refundFromMileStone = "true";


      } else if ($("#Paymentfor").val() == 1) {
        refundFromMileStone = "false";
      }
      if ($("#Paymentfor").select2('data')[0].text == "Cancelation refund") {

        this.paymentfor_text = "Flat Cancellation"

      } else if ($("#Paymentfor").select2('data')[0].text == "Excess amount refund") {
        this.paymentfor_text = "Refund"
      }
      if (modificationinvoice == undefined) {
        modificationinvoice = null
      }

      if (lagelinvoicenumber == undefined) {
        lagelinvoicenumber = null
      }

      if (Assignment_invoicenumber == undefined) {
        Assignment_invoicenumber = null;
      }


      // if ($('#companybankAcId').select2('data')[0].text == "--Select--" || $('#companybankAcId').select2('data')[0].text == undefined || $('#companybankAcId').select2('data')[0].text == "") {
      //   this.bankaccount_number = null;
      // } else {
      //   this.bankaccount_number = $('#companybankAcId').select2('data')[0].text;
      // }

      let url = this.cmn.commonUrl + "financial/saveFinancialTransactionReceiptRequest.spring";


      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      var body = {
        "sessionKey": sessionStorage.getItem("login_sessionkey"),
        "siteId": $("#ProjectId").val(),
        "siteName": $('#ProjectId').select2('data')[0].text,
        "transactionTypeId": "2",// $("#transaction_type").val(),
        "transactionModeId": $("#transactionmodeid").val(),
        //  "transferModeId": "1",
        "transactionTypeName": "Payment", //$('#transaction_type').select2('data')[0].text,
        "transactionModeName": $("#transactionmodeid").select2('data')[0].text,
        "transactionFor": this.paymentfor_text,
        "transactionForId": $("#Paymentfor").val(),
        "chequeNumber": null, //$("#ChequeNumber").val()
        "transactionDate": null, //new Date($("#ChequeDate").val()).getTime()
        "transactionAmount": $("#ChequeAmount").val(),
        "blockIds": this.blockIDvalue,
        "floorIds": [],
        "flatIds": [flatId].map(Number),
        "bookingFormId": bookingformIDS,
        "bankId": this.customerbankid,
        "bankName": this.customerbankname,
        // "siteAccountId": this.companybankAcIdval,
        // "siteBankAccountNumber": this.companybankAcIdtext,
        //"sourceOfFunds": $("#Sourcefound").val(),
        "paymentSetOffDetails": [
          {
            "setOffTypeName": "Principal_Amount",
            "amount": $("#PrincipalAmount").val(),
            "refundFromMileStone": refundFromMileStone //"true"
          },
          {
            "setOffTypeName": "Fin_Penalty",
            "amount": $("#InterstAmount").val(),
            "refundFromMileStone": refundFromMileStone //"true"
          },
          {
            "setOffTypeName": "Refundable_Advance",
            "amount": $("#refunableCharges").val(),
            "invoiceNo": "",
            "refundFromMileStone": refundFromMileStone //"true"
          },
          {
            "setOffTypeName": "Flat_Cancellation",
            "amount": $("#CancelationCharges").val(),
            "invoiceNo": "",
            "refundFromMileStone": refundFromMileStone //"true"
          },
          {
            "setOffTypeName": "Modification_Cost",
            "amount": $("#ModificationCharges").val(),
            "invoiceNo": modificationinvoice,
            "refundFromMileStone": refundFromMileStone //"true"
          },
          {
            "setOffTypeName": "Legal_Cost",
            "amount": $("#LeagalCharges").val(),
            "invoiceNo": lagelinvoicenumber,
            "refundFromMileStone": refundFromMileStone //"true"
          },
          {
            "setOffTypeName": "Car_Parking_Cost",
            "amount": $("#carparkingcost").val(),
            "invoiceNo": carparkinginvoicenumber
          }
          , {
            "setOffTypeName": "Assignment_Transfer_Fee",
            "amount": $("#Assignment_transfer_fee").val(),
            "invoiceNo": Assignment_invoicenumber
          }
          , { "setOffTypeName": "Maintenance_Charge", "amount": this.MaintinaceCharges }
          , { "setOffTypeName": "Corpus_Fund", "amount": this.CorpusFund }
          , { "setOffTypeName": "Individual_Flat_Khata_bifurcation_and_other_charges", "amount": this.FlatKhataBifurcation }

          , { "setOffTypeName": "Registration_And_Mutation_Charges", "amount": this.Registration_And_Mutation_Charges }
          , { "setOffTypeName": "Non_refundable_Caution_Deposit", "amount": this.Non_refundable_Caution_Deposit }
          , { "setOffTypeName": "Electricity_Deposit", "amount": this.Electricity_Deposit }

        ],
        "comments": [{ "CUSTOMER": $("#CustomerCommentsId").val() }, { "CANCEL_REASON": $("#CancelreasonId").val() }],
        "comment": $("#CrmCommentsId").val(),
        "projectAccountNumber": this.bankaccount_number,
        "fileInfos": this.tempfileInfo
      }





      console.log(body);

      console.log(JSON.stringify(body));


     
      this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {


        console.log(resp);
        $('.page-loader-wrapper').hide();
        if (resp.responseCode == 200) {
          swal({ title: "Transaction sent successfully" },



            function () {
              location.reload();
            }
          );

          sessionStorage.removeItem("crmrefund");
          sessionStorage.removeItem("NonRefundFlats");

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
    } else { }

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




  }


  modificationInvoice(event: any) {
    $("#ModificationInvoiceId").attr("disabled", false);
  }

  legalInvoice(event: any) {
    $("#LegalInvoiceId").attr("disabled", false);
  }

  /*---------------------------------payment for start-----------------------------*/
  PaymentFor() {
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
      "transactionTypeId": "2",
      "transactionModeId": $("#transactionmodeid").val(),
      "transactionTypeName": "Payment",
      "transactionModeName": $("#transactionmodeid").select2('data')[0].text,
      "bookingFormIds": [flatId_bookingid],



    }

    console.log(url);
    console.log(JSON.stringify(body));


    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      console.log(resp);



      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        $('#ModificationInvoiceId').html('');
        $('#LegalInvoiceId').html('');
        $('#CarparkingInvoiceId').html('');
        $('#AssignmentfeeInvoiceId').html('');

        $('#LegalInvoiceId').append('<option value="select">--Select--</option>');
        $('#ModificationInvoiceId').append('<option value="select">--Select--</option>');
        $('#CarparkingInvoiceId').append('<option value="select">--Select--</option>');

        $('#AssignmentfeeInvoiceId').append('<option value="select">--Select--</option>');


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
            } else if (this.setOffTypeName == "CAR_PARKING_COST") {
              $('#CarparkingInvoiceId').append("<option value='" + resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo + '$$' + resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].documentLocation + "'>" + resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo + "</option>");
              // $('#CarparkingInvoiceId').val(this.carparkingInvoiceID);
            } else if (this.setOffTypeName == "ASSIGNMENT_TRANSFER_FEE") {
              $('#AssignmentfeeInvoiceId').append("<option value='" + resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo + '$$' + resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].documentLocation + "'>" + resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo + "</option>");
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
  modificationChargeInvoiceID(modificationChargeInvoiceID: any) {
    throw new Error('Method not implemented.');
  }
  legalChargeInvoiceID(legalChargeInvoiceID: any) {
    throw new Error('Method not implemented.');
  }
  /*-----Getting modification and legal invoices list End------------*/

  homeClick() {
    this.cmn.commonHomeNavigation();
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



  flatsitewisechange(siteid) {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "flat/flatSite.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "ids": [siteid],
      "requestUrl": "All"

    }

    console.log(url);
    console.log(JSON.stringify(body));

    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      console.log(resp);

      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#FaltId').html("");
        this.controller = [0];
        $('#FaltId').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#FaltId').append("<option value='" + resp.responseObjList[i].detId + "-" + resp.responseObjList[i].flatBookingId + "'>" + resp.responseObjList[i].name + "</option>");
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


  RefundflatDetails() {
    var arr = localStorage.getItem('SiteIDS');

    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/getNonRefundFlats.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteIds": JSON.parse(arr),
      "requestUrl": "getNonRefundFlats",
      "condition": "FlatsWithCustName",
    }



    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {


      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        $('#FaltId').html('');
        $('#FaltId').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#FaltId').append("<option value='" + resp.responseObjList[i].FLAT_ID + "-" + resp.responseObjList[i].FLAT_BOOK_ID + "'>" + resp.responseObjList[i].customerName_FlatNo + "</option>");
        }
        $("#FaltId").attr("disabled", false);
        $('#cancellationLabel').show();
        $('#cancellationField').show();
        // $('#ProjectId').val(['select']);
        // $('#ProjectId').trigger('change');
        // $('#BlockId').val(['select']);
        //  $('#BlockId').trigger('change');
        // $('#FaltId').val(['select']);
        // $('#FaltId').trigger('change');
        sessionStorage.setItem("NonRefundFlats", JSON.stringify(resp.responseObjList));

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


  RefundflatDetailsblock(blockid) {

    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/getNonRefundFlats.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "blockIds": [JSON.parse(blockid)],
      "requestUrl": "getNonRefundFlats",
      "condition": "FlatsWithCustName",

    }

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        $('#FaltId').html('');
        $('#FaltId').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#FaltId').append("<option value='" + resp.responseObjList[i].FLAT_ID + "-" + resp.responseObjList[i].FLAT_BOOK_ID + "'>" + resp.responseObjList[i].customerName_FlatNo + "</option>");
        }
        $("#FaltId").attr("disabled", false);



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
  forFlatbookingIdkList(flatid, flatId_bookingid) {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/activeBlocksFlats.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "flatIds": [JSON.parse(flatid)]
    }


    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {


      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();

        if (JSON.parse(sessionStorage.getItem("NonRefundFlats")) !== null && selected_paymentid == undefined) {
          bookingformIDS = flatId_bookingid;
        } else if (JSON.parse(sessionStorage.getItem("NonRefundFlats")) !== null && selected_paymentid == "2") {
          bookingformIDS = flatId_bookingid;
        } else {
          bookingformIDS = resp.responseObjList[0].flatBookingId;
          this.gridDetails(flatId, bookingformIDS);
        }






        //  bookingformIDS = flatId_bookingid;
        // if(flatId_bookingid !== null && flatId_bookingid !== undefined && flatId_bookingid !== "" && flatId_bookingid !== "null" && flatId_bookingid !=="undefined"){
        //   bookingformIDS = flatId_bookingid;
        // } else {
        //   bookingformIDS = resp.responseObjList[0].flatBookingId
        // }




        // alert(bookingformIDS)
        // $('#BlockId').html('');
        // $('#BlockId').append('<option value="select">--Select--</option>');
        // for (var i = 0; i < resp.responseObjList.length; i++) {
        //   $('#BlockId').append("<option value='" + resp.responseObjList[i].blockId + "'>" + resp.responseObjList[i].blockName + "</option>");
        //   //	$('#projectID').formSelect();
        //   $("#BlockId").attr("disabled", false)
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
  /*-----------------Getting Flat list End---------------------*/


  fileClick(val) {

    window.open(val, '_system', 'location=yes,closebuttoncaption=Fechar,enableViewportScale=no');

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

  carparkingInvoice(event: any) {
    $("#CarparkingInvoiceId").attr("disabled", false);
  }

  carparkinginvoicefun() {

    window.open(carparkingdetails_url);
  }


}
