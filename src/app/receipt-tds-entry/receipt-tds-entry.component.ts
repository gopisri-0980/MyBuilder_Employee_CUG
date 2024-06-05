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
var bsr_number_value;
var ack_number_value;
var Cheque_amountfun;
var carparkingdetails_url;
var carparkinginvoicenumber;

@Component({
  selector: 'app-receipt-tds-entry',
  templateUrl: './receipt-tds-entry.component.html',
  styleUrls: ['./receipt-tds-entry.component.sass']
})
export class ReceiptTdsEntryComponent implements OnInit {

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
  modificationChargeInvoiceID: any;
  legalChargeInvoiceID: any;
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
  carparkingInvoiceID: any;
  carparkingcost_amount: any;
  controller_dep_date: any;
  chequeDepositedDate_Milliseconds: number;
  constructor(private cmn: CommonComponent, private http: Http, private router: Router,
    private formBuilder: FormBuilder, private sanitizer: DomSanitizer) {
    $('.page-loader-wrapper').hide();
    // checkedornot = false;
    this.deptid = sessionStorage.getItem("session_deptid");

    this.roleid = sessionStorage.getItem("session_roleId");
    this.transactionType();
    this.siteList();
  }

  ngOnInit() {
    $("#paidbyname").prop("disabled", true);
    var self = this;
    var month;
    var day;

    $(function () {
      $("#checkdepositeddate").hide();
      var date = new Date().getMonth();
        var minimumdate = new Date().setMonth(date - 3);
        var maximumdate = new Date().setMonth(date + 3);

        $('#ChequeRecDate').bootstrapMaterialDatePicker({
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



      console.log(sessionStorage.getItem('employeeId'))
      if (self.deptid == '993' && self.roleid == '8') {
        var date = new Date().getMonth();
        var minimumdate = new Date().setMonth(date - 3);
        var maximumdate = new Date().setMonth(date + 3);
        $('#ChequeDate').bootstrapMaterialDatePicker({
          format: 'YYYY-MM-DD',
          //  minDate: new Date(minimumdate),
          maxDate: new Date(),
          clearButton: true,
          weekStart: 1,
          time: false,
        }).on('change', function (e, datee) {
          // alert(datee)


          if (self.deptid == '993' && self.roleid == '8') {
            $('#ChequeRecDate').bootstrapMaterialDatePicker('setMinDate', datee);
          } else {
            // alert(datee)
            var temp2 = new Date(datee)
            //  alert(temp2.getMonth()+1)
            // $('#ChequeRecDate').bootstrapMaterialDatePicker('setMinDate', '2021-12-19');
            var date = new Date();
            var temdate = date.getDate();
            var tempmonth = date.getMonth() + 1;
            var temp_altr_month = tempmonth - 1;
            var tempmonthh = date.getMonth();
            var tempyear = date.getFullYear()
            var tempyear_for_first_month = date.getFullYear() - 1;
            // alert(tempyear_for_first_month);
            var setdate = tempyear + "/" + tempmonth + "/" + 10;
            if (temdate < 11) {
              var temp2 = new Date(datee)
              //  alert(temp2)
              var tempmonth = date.getMonth() + 1;
              //  alert(temp2.getMonth()+1)
              //  alert(tempmonth)
              // var test = tempyear+'-'+(tempmonth-1)+'-'+'01'
              //  $('#ChequeRecDate').bootstrapMaterialDatePicker('setMinDate',datee);

              if ((temp2.getMonth() + 1) != tempmonth) {
                if ((temp2.getMonth() + 1) == (tempmonth - 1)) {

                  console.log(temp2.getMonth() + 1)
                  console.log(tempmonth)
                  var test = tempyear + '-' + (tempmonth - 1) + '-' + temp2.getDate()
                  console.log(test)
                  $('#ChequeRecDate').bootstrapMaterialDatePicker('setMinDate', new Date(test));

                } else {
                  console.log(temp2.getMonth() + 1)
                  console.log(tempmonth)
                  var test = tempyear + '-' + (tempmonth - 1) + '-' + '01'
                  console.log(test)
                  $('#ChequeRecDate').bootstrapMaterialDatePicker('setMinDate', new Date(test));

                }

              } else {
                console.log(temp2.getMonth() + 1)
                console.log(tempmonth)
                console.log(datee)
                $('#ChequeRecDate').bootstrapMaterialDatePicker('setMinDate', datee);

              }

            } else {
              var temp2 = new Date(datee)
              var tempmonth = date.getMonth() + 1;
              //  alert(temp2.getMonth()+1)
              //  alert(tempmonth)
              if ((temp2.getMonth() + 1) != tempmonth) {
                console.log(temp2.getMonth() + 1)
                console.log(tempmonth)
                var test = tempyear + '-' + (tempmonth) + '-' + '01'
                console.log(new Date(test))
                $('#ChequeRecDate').bootstrapMaterialDatePicker('setMinDate', new Date(test));

              } else {
                console.log(temp2.getMonth() + 1)
                console.log(tempmonth)
                console.log(datee)
                $('#ChequeRecDate').bootstrapMaterialDatePicker('setMinDate', datee);

              }
            }

          }

        });

      } else {
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
        }).on('change', function (e, datee) {
          // alert(datee)


          if (self.deptid == '993' && self.roleid == '8') {
            $('#ChequeRecDate').bootstrapMaterialDatePicker('setMinDate', datee);
          } else {
            // alert(datee)
            var temp2 = new Date(datee)
            //  alert(temp2.getMonth()+1)
            // $('#ChequeRecDate').bootstrapMaterialDatePicker('setMinDate', '2021-12-19');
            var date = new Date();
            var temdate = date.getDate();
            var tempmonth = date.getMonth() + 1;
            var temp_altr_month = tempmonth - 1;
            var tempmonthh = date.getMonth();
            var tempyear = date.getFullYear()
            var tempyear_for_first_month = date.getFullYear() - 1;
            // alert(tempyear_for_first_month);
            var setdate = tempyear + "/" + tempmonth + "/" + 10;
            if (temdate < 11) {
              var temp2 = new Date(datee)
              //  alert(temp2)
              var tempmonth = date.getMonth() + 1;
              //  alert(temp2.getMonth()+1)
              //  alert(tempmonth)
              // var test = tempyear+'-'+(tempmonth-1)+'-'+'01'
              //  $('#ChequeRecDate').bootstrapMaterialDatePicker('setMinDate',datee);

              if ((temp2.getMonth() + 1) != tempmonth) {
                if ((temp2.getMonth() + 1) == (tempmonth - 1)) {

                  console.log(temp2.getMonth() + 1)
                  console.log(tempmonth)
                  var test = tempyear + '-' + (tempmonth - 1) + '-' + temp2.getDate()
                  console.log(test)
                  $('#ChequeRecDate').bootstrapMaterialDatePicker('setMinDate', new Date(test));

                } else {
                  console.log(temp2.getMonth() + 1)
                  console.log(tempmonth)
                  var test = tempyear + '-' + (tempmonth - 1) + '-' + '01'
                  console.log(test)
                  $('#ChequeRecDate').bootstrapMaterialDatePicker('setMinDate', new Date(test));

                }

              } else {
                console.log(temp2.getMonth() + 1)
                console.log(tempmonth)
                console.log(datee)
                $('#ChequeRecDate').bootstrapMaterialDatePicker('setMinDate', datee);

              }

            } else {
              var temp2 = new Date(datee)
              var tempmonth = date.getMonth() + 1;
              //  alert(temp2.getMonth()+1)
              //  alert(tempmonth)
              if ((temp2.getMonth() + 1) != tempmonth) {
                console.log(temp2.getMonth() + 1)
                console.log(tempmonth)
                var test = tempyear + '-' + (tempmonth) + '-' + '01'
                console.log(new Date(test))
                $('#ChequeRecDate').bootstrapMaterialDatePicker('setMinDate', new Date(test));

              } else {
                console.log(temp2.getMonth() + 1)
                console.log(tempmonth)
                console.log(datee)
                $('#ChequeRecDate').bootstrapMaterialDatePicker('setMinDate', datee);

              }
            }

          }

        });
      }



      $(function () {
        console.log("Employee Id :" + sessionStorage.getItem('employeeId'))
        if (self.deptid == '993' && self.roleid == '8') {
          $('#ChequeRecDate').bootstrapMaterialDatePicker({
            format: 'YYYY-MM-DD',
            // minDate: new Date(minimumdate),
            maxDate: new Date(),
            clearButton: true,
            weekStart: 1,
            time: false
          }).on('change', function (e, date) {
            $('#ChequeRecDate').bootstrapMaterialDatePicker('setMinDate', date);
          });

        } else {

          var date = new Date();
          var temdate = date.getDate();
          var tempmonth = date.getMonth() + 1;
          var temp_altr_month = tempmonth - 1;
          var tempmonthh = date.getMonth();
          var tempyear = date.getFullYear()
          var tempyear_for_first_month = date.getFullYear() - 1;
          // alert(tempyear_for_first_month);
          var setdate = tempyear + "/" + tempmonth + "/" + 10;
          if (temdate < 6) {
            if (tempmonth == 1) {
              var min_date = tempyear_for_first_month + "/" + 12 + "/" + '01';
              var max_date = tempyear + "/" + ('0' + (tempmonth)).slice(-2) + "/" + ('0' + (temdate)).slice(-2)
              //  $( "#ChequeDate" ).datepicker({
              //   inline: true,
              //   changeMonth: true,
              //   changeYear: true,
              //  // minDate:min_date,
              //  // maxDate: max_date
              //   });

              // $('#ChequeDate').bootstrapMaterialDatePicker({
              //   format: 'DD/MM/YYYY',
              //   minDate: min_date,
              //   maxDate: max_date,
              //   clearButton: true,
              //   weekStart: 1,
              //   time: false
              // });
              $('#ChequeRecDate').bootstrapMaterialDatePicker({
                format: 'YYYY-MM-DD',
                minDate: min_date,
                maxDate: max_date,
                clearButton: true,
                weekStart: 1,
                time: false
              });

            } else {
              var min_date = tempyear + "/" + temp_altr_month + "/" + '01';

              var max_date = tempyear + "/" + ('0' + (tempmonth)).slice(-2) + "/" + ('0' + (temdate)).slice(-2)
              //  $('#ChequeDate').bootstrapMaterialDatePicker({
              //   format: 'DD/MM/YYYY',
              //   minDate: min_date,
              //   maxDate: max_date,
              //   clearButton: true,
              //   weekStart: 1,
              //   time: false
              // });
              $('#ChequeRecDate').bootstrapMaterialDatePicker({
                format: 'YYYY-MM-DD',
                minDate: min_date,
                maxDate: max_date,
                clearButton: true,
                weekStart: 1,
                time: false
              });

            }
          } else {

            var min_date = tempyear + "/" + tempmonth + "/" + '01';
            //  alert(min_date);
            var max_date = tempyear + "/" + ('0' + (tempmonth)).slice(-2) + "/" + ('0' + (temdate)).slice(-2)
            //  $('#ChequeDate').bootstrapMaterialDatePicker({
            //   format: 'DD/MM/YYYY',
            //   minDate: min_date,
            //   maxDate: max_date,
            //   clearButton: true,
            //   weekStart: 1,
            //   time: false
            // });

            $('#ChequeRecDate').bootstrapMaterialDatePicker({
              format: 'YYYY-MM-DD',
              minDate: min_date,
              maxDate: max_date,
              clearButton: true,
              weekStart: 1,
              time: false
            });
          }
        }


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

      $('#ChequeAmount').bind("cut copy paste", function (e) {
        e.preventDefault();
      });

      $('#carparkingcost').bind("cut copy paste", function (e) {
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


      $("#CarparkingInvoiceId").select2({
        placeholder: "Search Car Parking Invoice",
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


      $('#ProjectId').change(function (e) {
        var siteId = $(e.target).val();
        siteidsvalue = $(e.target).val();
        if ($(e.target).val() == "select") {

          $("#BlockId option[value]").remove();
          $("#FaltId option[value]").remove();


        } else {
          self.blockList(siteId);
          self.siteBankList(siteId);
          self.flatsitewisechange(siteId);
          self.checkNextAppModule(siteId);
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
          $(".carparkinginvoicecls").hide();
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




      //  var minimumdate = "2020-07-21";
      //  var maximumdate = "2020-07-25";
      //  $('#ChequeRecDate').attr("min", minimumdate);
      //  $('#ChequeRecDate').attr("max", maximumdate);

      //  var date = new Date().getMonth();
      //  var minimumdate = new Date().setMonth(date - 3);
      //  var maximumdate = new Date().setMonth(date + 3);

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

    });
  }


  viewinvoicefun() {

    window.open(invoicedetails_url);
  }

  Modificationfun() {
    window.open(ModificationInvoice_url);
  }

  carparkinginvoicefun() {

    window.open(carparkingdetails_url);
  }



  getToday(): string {
    return new Date().toISOString().split('T')[0]
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
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#ProjectId').append("<option value='" + resp.responseObjList[i].siteId + "'>" + resp.responseObjList[i].siteName + "</option>");
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

    console.log(body);

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      console.log(resp);

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
              $('#ModificationInvoiceId').val(this.modificationChargeInvoiceID);
            } else if (this.setOffTypeName == "LEGAL_COST") {
              $('#LegalInvoiceId').append("<option value='" + resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo + '$$' + resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].documentLocation + "'>" + resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo + "</option>");
              $('#LegalInvoiceId').val(this.legalChargeInvoiceID);
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
  /*-----Getting modification and legal invoices list End------------*/

  /*-------------------------------Final Submission Start----------------------------*/
  CRMReceiptTDSSubmit() {

    console.log($("#ChequeDepositedDateID").val());



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
      swal("Please enter challan number");
      $('#ChequeNumber').focus();
      return false;
    }

    if (($("#ChequeNumber").val()).length < 6) {
      swal("Challan number should be more than 5 digits");
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

    if ($("#ChequeRecDate").val() == "") {
      swal("Please select challan received date");
      //$('#ChequeRecDate').focus();
      return false;
    }

    // if ($("#bank_type").val() == "select") {
    //   swal("Please select customer bank name");
    //   $('#bank_type').focus();
    //   return false;
    // }

    if ($("#ackNumber").val() == "") {
      swal("Please enter ACK number");
      $('#ChequeNumber').focus();
      return false;
    }

    if (($("#ackNumber").val()).length < 6) {
      swal("ACK number should be more than 5 digits");
      $('#ChequeNumber').focus();
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

    if ($("#bsrNumber").val() == "") {
      swal("Please enter BSR code");
      $('#ChequeNumber').focus();
      return false;
    }

    if (($("#bsrNumber").val()).length < 6) {
      swal("BSR code should be more than 5 digits");
      $('#ChequeNumber').focus();
      return false;
    }
    if(this.controller_dep_date == "true"){
      if ($('#ChequeDepositedDateID').val() == "") {
        swal("Please select the cheque deposited date");
        return false;
      }

      this.chequeDepositedDate_Milliseconds = new Date($("#ChequeDepositedDateID").val()).getTime();
    } else {
      this.chequeDepositedDate_Milliseconds = null;
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



    if ($("#PrincipalAmount").val() == "0" ) {
      swal("Please enter Principle amount");
      return false;
    }



    // if ($("#ModificationCharges").val() != "0") {
    //   if ($("#ModificationInvoiceId").val() == "select") {
    //     $("#ModificationInvoiceId").attr("disabled", false);
    //     swal("Please select modification invoice");
    //     $('#ModificationInvoiceId').focus();
    //     return false;
    //   }
    // }

    // if ($("#LeagalCharges").val() != "0") {
    //   $("#LegalInvoiceId").attr("disabled", false);
    //   if ($("#LegalInvoiceId").val() == "select") {
    //     swal("Please select legal invoice");
    //     $('#LegalInvoiceId').focus();
    //     return false;
    //   }

    // }

    // console.log($("#carparkingcost").val());
    // console.log($("#CarparkingInvoiceId").val());


    // if ($("#carparkingcost").val() != "0") {
    //   $("#CarparkingInvoiceId").attr("disabled", false);
    //   if ($("#CarparkingInvoiceId").val() == "select" || $("#CarparkingInvoiceId").val() == null) {
    //     swal("Please select car parking invoice");
    //     $('#CarparkingInvoiceId').focus();
    //     return false;
    //   }

    // }


    if ((Number($('#PrincipalAmount').val())) > Number($('#ChequeAmount').val())) {

      swal("Payment Setoff should be equal to Challan amount");
      return false
    }



    if ((Number($('#PrincipalAmount').val()) ) < Number($('#ChequeAmount').val())) {

      swal("Payment Setoff should be equal to Challan amount");
      return false
    }

    // if (Number($('#TdsAmount').val()) !== 0 && $("#paidbyname").val() == "" || Number($('#TdsAmount').val()) !== 0 && $("#paidbyname").val() == "select") {
    //   swal("Please select paid by name");
    //   return false
    // }


    // this.finpaidbyname = $("#paidbyname").val();

    // if (this.finpaidbyname == "select") {
    //   this.finpaidbyname = null;
    // }

    // if ($("#Sourcefound").val() == "" || $("#Sourcefound").val() == "select") {
    //   swal("Please select Source of funds");
    //   $('#CustomerCommentsId').focus();
    //   return false;
    // }

    // if ($("#companybankAcId").val() == "select") {
    //   swal("Please select company bank account");
    //   $('#companybankAcId').focus();
    //   return false;
    // }

    console.log(this.controller_dep_date);



    if (this.urls.length == 0) {
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


    this.transactionAmount = Cheque_amountfun;
    this.chequeNumber = cheque_number_value;
    this.bankId = $("#bank_type").val();
    this.bookingFormId = this.bookingformIDS;

    console.log(this.transactionAmount);
    console.log(this.chequeNumber);
    console.log(this.bankId);
    console.log(this.bookingFormId);
    if (confirm("Do you want to Submit the Page ?")) {
      this.final_submission_crmReceiptTDS();
    } else { }

    //  $('.page-loader-wrapper').show();
   // let url = this.cmn.commonUrl + "financial/checkDuplicateTransactionOrNot.spring";

   // let headers = new Headers({ 'Content-Type': 'application/json' });
    // var body = {
    //   "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
    //   "transactionAmount": this.transactionAmount,
    //   "bankId": this.bankId,
    //   "chequeNumber": this.chequeNumber,
    //   "referenceNo": null,
    //   "bookingFormId": this.bookingFormId,
    //   "transactionDate": new Date($("#ChequeDate").val()).getTime(),
    // }

 //   console.log(body);
    // this.http.post(url, body).map(res => res.json()).subscribe(resp => {

    //   console.log(JSON.stringify(resp))
    //   if (resp.responseCode == 200) {
    //     $('.page-loader-wrapper').hide();

    //     if (confirm("Do you want to Submit the Page ?")) {
    //       this.final_submission_crmReceiptTDS();
    //     } else { }

    //   } else if (resp.responseCode == 440) {
    //     swal("Your Session has been Timed Out!", "Please login once again.", "error");
    //     this.router.navigate([""]);
    //   } else if (resp.responseCode == 800) {
    //     $('.page-loader-wrapper').hide();
    //     swal(resp.description);
    //     return false;
    //   } else {
    //     $('.page-loader-wrapper').hide();
    //     swal(resp.errors[0]);
    //     return false;
    //   }
    // },
    //   error => {
    //     var error = JSON.parse(error._body).responseCode;
    //     $('.page-loader-wrapper').hide();
    //     if (error == 440) {
    //       swal("Your Session has been Timed Out!", "Please login once again.", "error");
    //       this.router.navigate([""]);
    //     }
    //   }
    // );








  }

  final_submission_crmReceiptTDS() {


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

    // if ($("#bank_type").val() == "select") {
    //   this.customerbankid = null;
    // } else {
    //   this.customerbankid = $("#bank_type").val();
    // }

    // if ($('#bank_type').select2('data')[0].text == "--Select--") {
    //   this.customerbankname = null;
    // } else {
    //   this.customerbankname = $('#bank_type').select2('data')[0].text;
    // }


    // if (lagelinvoicenumber == undefined) {
    //   lagelinvoicenumber = null;
    // }

    // if (modificationinvoice == undefined) {
    //   modificationinvoice = null;
    // }

    // if (carparkinginvoicenumber == undefined) {
    //   carparkinginvoicenumber = null;
    // }


    // if ($("#CorpusFund").val() == undefined || $("#CorpusFund").val() == "") {
    //   this.CorpusFund = 0;
    // } else {
    //   this.CorpusFund = $("#CorpusFund").val();
    // }

    // if ($("#MaintinaceCharges").val() == undefined || $("#MaintinaceCharges").val() == "") {
    //   this.MaintinaceCharges = 0;
    // } else {
    //   this.MaintinaceCharges = $("#MaintinaceCharges").val();
    // }

    // if ($("#FlatKhataBifurcation").val() == undefined || $("#FlatKhataBifurcation").val() == "") {
    //   this.FlatKhataBifurcation = 0;
    // } else {
    //   this.FlatKhataBifurcation = $("#FlatKhataBifurcation").val();
    // }



    var body = {

      "sessionKey": sessionStorage.getItem("login_sessionkey"),
      "bookingFormId": this.bookingformIDS,
      "siteId": $("#ProjectId").val(),
      "siteName": $('#ProjectId').select2('data')[0].text,
      "transactionTypeId": "1",
      "transactionModeId": "6",
      "transactionTypeName": "Receipt",
      "transactionModeName": "TDS",
      "challanNo": $("#ChequeNumber").val(),
      "bsrCode": $("#bsrNumber").val(),
      "ackNo": $("#ackNumber").val(),
      "transactionDate": new Date($("#ChequeDate").val()).getTime(),
     // "transactionReceiveDate":  new Date($("#ChequeRecDate").val()).getTime(),
      "transactionAmount": $("#ChequeAmount").val(),
      "blockIds": this.blockIDvalue,
      "floorIds": [],
      "flatIds": [flatId],
      "paymentSetOffDetails": [{ "setOffTypeName": "Principal_Amount", "amount": $("#PrincipalAmount").val() }],
      "comments": [{ "CUSTOMER": $("#CustomerCommentsId").val() }],
      "comment": $("#CrmCommentsId").val(),
      "projectAccountNumber": null,
      "fileInfos": this.tempfileInfo
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

  homeClick() {
    this.cmn.commonHomeNavigation();
  }

  modificationInvoice(event: any) {
    $("#ModificationInvoiceId").attr("disabled", false);
  }

  legalInvoice(event: any) {
    $("#LegalInvoiceId").attr("disabled", false);
  }


  carparkingInvoice(event: any) {
    $("#CarparkingInvoiceId").attr("disabled", false);
  }



  keyPress(event: any) {
    const pattern = /[0-9\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  keyPress_ack(event: any) {
    const pattern = /^[a-zA-Z0-9]*$/;
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


  Cheque_numberfun(event: any) {
    console.log(event.target.value);
    cheque_number_value = event.target.value;
  }

  bsr_numberfun(event: any) {
    console.log(event.target.value);
    bsr_number_value = event.target.value;
  }
  ack_numberfun(event: any) {
    console.log(event.target.value);
    ack_number_value = event.target.value;
  }
  Cheque_amountfun(event: any) {
    console.log(event.target.value);
    Cheque_amountfun = event.target.value;
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



  paidbynamefun(event) {

    if (event.target.value !== "" && event.target.value !== "0") {
      $("#paidbyname").prop("disabled", false);

    } else {
      $("#paidbyname").prop("disabled", true);
      $("#paidbyname").val("select");
      $("#paidbyname").trigger('change');
    }
  }


  fileClick(val) {

    window.open(val, '_system', 'location=yes,closebuttoncaption=Fechar,enableViewportScale=no');

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




  checkNextAppModule(siteID) {

    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/checkNextAppModule.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteId": siteID
    }

    console.log(body);

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      console.log(resp);

      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
      
        this.controller_dep_date = resp.responseObjList.showDepositDate;
        if(resp.responseObjList.showDepositDate != "false"){
          $(function () {
            $("#checkdepositeddate").show();
          });
         
        } else {
          $(function () {
            $("#checkdepositeddate").hide();
          });
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


}

