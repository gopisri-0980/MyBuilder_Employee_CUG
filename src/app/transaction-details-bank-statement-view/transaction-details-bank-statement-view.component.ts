import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';
import { TransactionDetailsBankStatementViewService } from './transaction-details-bank-statement-view.service';
declare const $: any;
declare const swal: any;
var selected_projectid;
var site_name;
var totalInvoiceAmount;
var totalInvoiceAmount1;
var totalInvoiceAmount_1;
var totalInvoiceAmount_debit;
@Component({
  selector: 'app-transaction-details-bank-statement-view',
  templateUrl: './transaction-details-bank-statement-view.component.html',
  styleUrls: ['./transaction-details-bank-statement-view.component.sass']
})
export class TransactionDetailsBankStatementViewComponent implements OnInit {
  project_wise_project: Array<any> = [];
  Bank_account_number_project: Array<any> = [];
  Bank_account_number_data: Array<any> = [];
  controller: Array<any> = [];
  controller_data: Array<any> = [];
  [x: string]: any;
  fg: FormGroup;
  siteid_value: any;
  hideme: boolean;
  singledd8 = {};
  singledd9 = {};

  title6: any;

  title7: any;
  constructor(private http: Http, private formBuilder: FormBuilder, private cmn: CommonComponent,
    private router: Router, private service: TransactionDetailsBankStatementViewService) {



    this.singledd8 = {
      singleSelection: false,
      enableSearchFilter: true,
      searchPlaceholderText: 'Search',
      classes: 'my_dropdown1',
      unSelectAllText: 'UnSelect All',
      // lazyLoading: true,
    };

    this.singledd9 = {
      singleSelection: false,
      enableSearchFilter: true,
      searchPlaceholderText: 'Search',
      classes: 'my_dropdown1',
      unSelectAllText: 'UnSelect All',
      // lazyLoading: true,
    };




    $('.page-loader-wrapper').hide();
    this.siteList();
    var arr = localStorage.getItem('Transaction_Details_Bank_Details');
    this.Bank_Account_Number(JSON.parse(arr).map(String));
  }

  ngOnInit() {






    this.fg = new FormGroup(
      {
        from: new FormControl(""),
        to: new FormControl(""),
        Family_status: new FormControl(""),
        bank_account_form: new FormControl("")
      },
      [Validators.required, this.dateRangeValidator]
    );

    // this.fg = this.formBuilder.group({
    //   Family_status: [''],
    //   bank_account_form: [''],

    // });

    var self = this;
    $(function () {
      var dtToday = new Date();
      this.month = dtToday.getMonth() + 1;
      this.day = dtToday.getDate();
      this.year = dtToday.getFullYear();
      if (this.month < 10)
        this.month = '0' + this.month.toString();
      if (this.day < 10)
        this.day = '0' + this.day.toString();
      var maxDate = this.year + '-' + this.month + '-' + this.day;
      $('#fromDate').attr('max', maxDate);
      $('#toDate').attr('max', maxDate);

      // $("#projectID").select2({
      //   placeholder: "Select project",
      //   dir: "ltl",
      // });

      $("#Bank_account_number").select2({
        placeholder: "Select Bank Account Number",
        dir: "ltl",
      });


      $("#Actionfield").select2({
        placeholder: "Select Action",
        dir: "ltl",
      });

      $('#projectID').change(function (e) {
        selected_projectid = $(e.target).val();
        site_name = $('#projectID').select2('data')[0].text
        $("#Actionfield").val(['select']);
        $("#Actionfield").trigger('change');
        $("#clearencefromDate").val("");
        $("#ClearencetoDate").val("");
        if (selected_projectid == "select") {

          self.Bank_Account_Number("");
        } else {
          this.siteIDvalue = selected_projectid;
          console.log(this.siteIDvalue);
          self.Bank_Account_Number(selected_projectid);

        }
      })

    });
  }

  selectedSIDs(item: any) {
    this.Projected_wise_data = [];
    for (var i = 0; i < this.title6.length; i++) {
      this.Projected_wise_data.push(this.title6[i].id);
      console.log(this.Projected_wise_data);
    }
  }

  onSelectAll(item: any) {
    this.Projected_wise_data = [];
    for (var i = 0; i < this.title6.length; i++) {
      this.Projected_wise_data.push(this.title6[i].id);
      console.log(this.Projected_wise_data);
    }
  }

  onItemDeSelect(item: any) {
    this.Projected_wise_data = [];
    for (var i = 0; i < this.title6.length; i++) {
      this.Projected_wise_data.push(this.title6[i].id);
      console.log(this.Projected_wise_data);
    }
  }




  onDeSelectAll(item: any) {
    this.Projected_wise_data = [];

  }


  bank_selectedSIDs(item: any) { 

   this.Bank_account_number_data = [];
    for (var i = 0; i < this.title7.length; i++) {
      this.Bank_account_number_data.push(this.title7[i].siteBankAccountNumber);
      console.log(this.Bank_account_number_data);
    }


  }
  bank_onSelectAll(item: any) { 

   this.Bank_account_number_data = [];
    for (var i = 0; i < this.title7.length; i++) {
      this.Bank_account_number_data.push(this.title7[i].siteBankAccountNumber);
      console.log(this.Bank_account_number_data);
    }


  }
  bank_onItemDeSelect(item: any) {

    this.Bank_account_number_data = [];
    for (var i = 0; i < this.title7.length; i++) {
      this.Bank_account_number_data.push(this.title7[i].siteBankAccountNumber);
      console.log(this.Bank_account_number_data);
    }

   }
  bank_onDeSelectAll(item: any) { 
    this.Bank_account_number_data = [];
  }



  private dateRangeValidator: ValidatorFn = (): {
    [key: string]: any;
  } | null => {
    let invalid = false;
    const from = this.fg && this.fg.get("from").value;
    const to = this.fg && this.fg.get("to").value;
    if (from && to) {
      invalid = new Date(from).valueOf() > new Date(to).valueOf();
    }
    return invalid ? { invalidRange: { from, to } } : null;
  };

  getToday(): string {
    return new Date().toISOString().split('T')[0]
  }

  homeClick() {
    this.cmn.commonHomeNavigation();
  }

  Clearencefromdatefun() {
    $("#clearencefromDate").val("");
  }

  Clearencetodatefun() {
    $("#ClearencetoDate").val("");
  }
  /*-----------------Getting Project(site) list Start---------------------*/
  siteList() {
    var arr = localStorage.getItem('Transaction_Details_Bank_Details');
    $('.page-loader-wrapper').show();
    this.service.ProjectDetails(JSON.parse(arr).map(String)).then(resp => {
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {


        this.project_wise_project = resp.responseObjList;
        this.project_wise_project.forEach((o: any, i) => (o.id = o.id));

        // this.fb.reset();
        // this.Projected_wise_data = [];



        //$('#projectID').html("");
        //  $('#projectID').append('<option value="select">--Select--</option>');
        // for (var i = 0; i < resp.responseObjList.length; i++) {
        //   $('#projectID').append("<option value='" + resp.responseObjList[i].id + "'>" + resp.responseObjList[i].name + "</option>");
        // }
      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
      }
    }, error => {
      $('.page-loader-wrapper').hide();
      var error = JSON.parse(error._body).responseCode;
      if (error == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      }
    }
    )
  }
  /*-----------------Getting Project(site) list end---------------------*/

  Bank_Account_Number(siteid) {
    $('.page-loader-wrapper').show();
    this.service.GetBank_account_numberfun(siteid).then(resp => {
      console.log(JSON.stringify(resp));
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {

        this.Bank_account_number_project = resp.responseObjList;
        this.Bank_account_number_project.forEach((o: any, i) => (o.id = o.siteBankAccountNumber));


        // $('#Bank_account_number').html("");

        // for (var i = 0; i < resp.responseObjList.length; i++) {
        //   $('#Bank_account_number').append("<option value='" + resp.responseObjList[i].siteBankAccountNumber + "'>" + resp.responseObjList[i].siteBankAccountNumber + "</option>");
        // }
      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
      }
    }, error => {
      $('.page-loader-wrapper').hide();
      var error = JSON.parse(error._body).responseCode;
      if (error == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      }
    }

    )
  }

  searchfunction() {

    console.log(this.Projected_wise_data);
    console.log(this.Bank_account_number_data);

    if(this.Projected_wise_data == undefined ){
      this.Projected_wise_data = null;
    } else if(this.Projected_wise_data.length == 0){
      this.Projected_wise_data = null;
    }

    if(this.Bank_account_number_data == undefined){
      this.Bank_account_number_data = null;
    } else if(this.Bank_account_number_data.length == 0){
      this.Bank_account_number_data = null;
    }

    console.log(this.Projected_wise_data);
    console.log(this.Bank_account_number_data);
    

    this.Clearencefromdate = $("#clearencefromDate").val();
    this.ClearencetoDate = $("#ClearencetoDate").val();
    if ($("#Actionfield").val() == "select" || $("#Actionfield").val() == null) {
      this.action_field = null;
    } else {
      this.action_field = $("#Actionfield").val();
    }

    if (this.Projected_wise_data == null && this.Bank_account_number_data == null && this.Clearencefromdate == "" && this.ClearencetoDate == "" && this.action_field == "select") {
      swal("Please select any option to continue!");
      return false;
    }

    // if ($("#projectID").val().length == 0) {
    //   swal("Please select the project name");
    //   return false;
    // }

    // if (this.bankaccountnumber.length == 0) {
    //   swal("Please select the bank account number");
    //   return false;
    // }

    if ($("#clearencefromDate").val() == "" && $("#ClearencetoDate").val() == "") {
      swal("Please select clearance from date (or) clearance to date");
      return false;
    }

    

    if (isNaN(this.Clearencefromdate)) {
      var d = new Date(this.Clearencefromdate);
      var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
        d.getFullYear();

      var offset = d.getTimezoneOffset() * 60 * 1000;
      var withOffset = d.getTime();
      this.clearformdate_val = withOffset;

    } else {
      this.clearformdate_val = null;
    }

    if (isNaN(this.ClearencetoDate)) {
      var todate = new Date(this.ClearencetoDate);
      var todatestring = ("0" + todate.getDate()).slice(-2) + "-" + ("0" + (todate.getMonth() + 1)).slice(-2) + "-" +
        todate.getFullYear();

      var offset1 = todate.getTimezoneOffset() * 60 * 1000;
      var withOffset1 = todate.getTime();

      var withoutOffset = withOffset1 - offset1;
      this.cleartodate_val = withoutOffset;
      //this.todatevalue = new Date(todatestring).getTime();
    } else {
      this.cleartodate_val = null;
    }

    $('.page-loader-wrapper').show();
    $('#viewpendingdata').DataTable().destroy();
    $('#viewpendingdata1').DataTable().destroy();

  


    console.log(this.Projected_wise_data);
    console.log(this.Bank_account_number_data);
    console.log(this.action_field);
    console.log(this.clearformdate_val);
    console.log(this.cleartodate_val);

    



    this.service.GetSearchfunction(this.Projected_wise_data, this.Bank_account_number_data, this.action_field, this.clearformdate_val, this.cleartodate_val).then(resp => {
      console.log("------------"+JSON.stringify(resp));
      $('.page-loader-wrapper').hide();
      this.controller = [];
      this.controller_data = [];
      if (resp.responseCode == 200) {
        this.hideme = true;

        this.controller = resp.responseObjList.clearedTXList;

        this.controller_data = resp.responseObjList.unclearedTXList;

        setTimeout(function () {
          $(document).ready(function () {
            $('#viewpendingdata').DataTable({
              pageLength: 5,
              lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todos']],
              dom: 'Bfrltip',
              buttons: [
                'copy', 'csv', 'excel', 'print', {
                  extend: 'pdfHtml5',
                  orientation: 'landscape',
                  pageSize: 'LEGAL'
                }
              ],


              retrieve: true,
              "scrollY": false,
              "scrollCollapse": true,
              "scrollX": true,
              "autoWidth": false,
              "iCookieDuration": 60,
              "bStateSave": true,
              "fnStateSave": function (oSettings, oData) {
                localStorage.setItem('offersDataTables', JSON.stringify(oData));
              },
              "fnStateLoad": function (oSettings) {
                return JSON.parse(localStorage.getItem('offersDataTables'));
              },

              "footerCallback": function (row, data, start, end, display) {
                totalInvoiceAmount = 0;
                totalInvoiceAmount_debit = 0;
                if (display.length == 0) {
                  $('#invoiceamount').html(0);
                } else {
                  for (var j = 0; j < display.length; j++) {


                     const str2 = data[display[j]][8].split('.')[0];
                    const withoutCommas2 = str2.replaceAll(',', '');
                    totalInvoiceAmount += Number(withoutCommas2);
                    const fmt = require('indian-number-format');
                    $('#invoiceamount').html(fmt.format(Number(totalInvoiceAmount.toFixed(2))));



                    // if (isNaN(data[display[j]][8])) {
                    //   totalInvoiceAmount += parseFloat(data[display[j]][8].replace(/\,/g, ''));

                    //   const fmt = require('indian-number-format');
                    //   $('#invoiceamount').html(fmt.format(Number(totalInvoiceAmount.toFixed(2))));

                    // }



                    const str3 = data[display[j]][9].split('.')[0];
                    const withoutCommas3 = str3.replaceAll(',', '');
                    totalInvoiceAmount_debit += Number(withoutCommas3);
                    const fmt1 = require('indian-number-format');
                    $('#totalInvoice_Amount_debit').html(fmt1.format(Number(totalInvoiceAmount_debit.toFixed(2))));


                    // if (isNaN(data[display[j]][9])) {
                    //   totalInvoiceAmount_debit += parseFloat(data[display[j]][9].replace(/\,/g, ''));

                    //   const fmt_debit = require('indian-number-format');
                    //   $('#totalInvoice_Amount_debit').html(fmt_debit.format(Number(totalInvoiceAmount_debit.toFixed(2))));

                    // }


                  }
                }

              },
            })

          });

        }, 2000)

        setTimeout(function () {
          $(document).ready(function () {
            $('#viewpendingdata1').DataTable({
              pageLength: 5,
              lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todos']],
              dom: 'Bfrltip',
              buttons: [
                'copy', 'csv', 'excel', 'print', {
                  extend: 'pdfHtml5',
                  orientation: 'landscape',
                  pageSize: 'LEGAL'
                }
              ],


              retrieve: true,
              "scrollY": false,
              "scrollCollapse": true,
              "scrollX": true,
              "autoWidth": false,
              "iCookieDuration": 60,
              "bStateSave": true,
              "fnStateSave": function (oSettings, oData) {
                localStorage.setItem('offersDataTables', JSON.stringify(oData));
              },
              "fnStateLoad": function (oSettings) {
                return JSON.parse(localStorage.getItem('offersDataTables'));
              },

              "footerCallback": function (row, data, start, end, display) {



                totalInvoiceAmount1 = 0;
                totalInvoiceAmount_1 = 0;
                if (display.length == 0) {
                  $('#invoiceamount1').html(0);
                  $('#invoiceamount_debit').html(0);
                } else {
                  for (var j = 0; j < display.length; j++) {

                    const str = data[display[j]][8].split('.')[0];
                    const withoutCommas = str.replaceAll(',', '');
                    totalInvoiceAmount1 += Number(withoutCommas);
                    const fmt = require('indian-number-format');
                    $('#invoiceamount1').html(fmt.format(Number(totalInvoiceAmount1.toFixed(2))));


                  }

                  for (var k = 0; k < display.length; k++) {

                    const str1 = data[display[k]][9].split('.')[0];
                    const withoutCommas1 = str1.replaceAll(',', '');
                    totalInvoiceAmount_1 += Number(withoutCommas1);
                    const fmt = require('indian-number-format');
                    $('#invoiceamount_debit').html(fmt.format(Number(totalInvoiceAmount_1.toFixed(2))));





                    // if (isNaN(data[display[k]][9])) {

                    //   totalInvoiceAmount_1 += parseFloat(data[display[k]][9].replace(/\,/g, ''));

                    //   const fmt_de = require('indian-number-format');
                    //   $('#invoiceamount_debit').html(fmt_de.format(Number(totalInvoiceAmount_1.toFixed(2))));

                    // }

                  }
                }



              },
            })

          });

        }, 2000)
      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
      }
    }, error => {
      $('.page-loader-wrapper').hide();
      var error = JSON.parse(error._body).responseCode;
      if (error == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      }
    }
    )
  }
}
