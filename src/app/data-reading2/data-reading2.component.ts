import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from "@angular/router";
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { Http, RequestOptions, Headers } from '@angular/http';
import { CommonComponent } from '../common/common.component';
import { CodegenComponentFactoryResolver } from '@angular/core/src/linker/component_factory_resolver';
//import { $ } from 'protractor';
//declare module "XLSX";

var Block_A_TRN_XLSXData3;

var second_sheet_name;
var thired_sheet_name;
var first_sheet_name;

declare const $: any;
declare const swal: any;
@Component({
  selector: 'app-data-reading2',
  templateUrl: './data-reading2.component.html',
  styleUrls: ['./data-reading2.component.sass']
})
export class DataReading2Component implements OnInit {

  transaction_amountfield = 0;
  firstName: any;
  fileattached: any;
  file_attachment: Event;
  private base64textString: String = "";
  base64multifiles_data: any = [];
  file: any;
  arrayBuffer: any;
  XlSXData: any;
  XlSXData1: any;
  XlSXData2: unknown[];
  handleFileSelect(evt) {
    this.file = evt.target.files[0];
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary", cellDates: true, dateNF: 'dd/mm/yyyy;@' });



      // if (workbook.SheetNames.includes('Milestones')) {
      //   second_sheet_name = workbook.SheetNames[workbook.SheetNames.indexOf('Milestones')];
      // }

      if (workbook.SheetNames.includes('Transactions')) {
        thired_sheet_name = workbook.SheetNames[workbook.SheetNames.indexOf('Transactions')];
      }

      // if (workbook.SheetNames.includes('Scheme Details ')) {
      //   first_sheet_name = workbook.SheetNames[workbook.SheetNames.indexOf('Scheme Details ')];

      // }


    //  console.log(first_sheet_name);
     // console.log(second_sheet_name);
      console.log(thired_sheet_name);

     // var worksheet = workbook.Sheets[first_sheet_name];
     // var worksheet1 = workbook.Sheets[second_sheet_name];
      var worksheet2 = workbook.Sheets[thired_sheet_name];


//console.log(worksheet);
//console.log(worksheet1);
console.log(worksheet2);

    //  this.XlSXData = XLSX.utils.sheet_to_json(worksheet, { raw: true, defval: null });
     // this.XlSXData1 = XLSX.utils.sheet_to_json(worksheet1, { raw: true, defval: null });
      this.XlSXData2 = XLSX.utils.sheet_to_json(worksheet2, { raw: true, defval: null });


    //  console.log(this.XlSXData);
     // console.log(this.XlSXData1);
      console.log(this.XlSXData2);


      $(".file-path").val(this.file.name);
    }
    fileReader.readAsArrayBuffer(this.file);
  }

  constructor(private http: Http, private router: Router, public cmn: CommonComponent) {
    $('.page-loader-wrapper').hide();
    this.siteList_temp()
  }

  ngOnInit() {
    //  this.firstName = "chandu";
    // $("#BlockID").select2();

  }

  find_duplicate_in_array(arra1) {
    var object = {};
    var result = [];

    arra1.forEach(function (item) {
      if (!object[item])
        object[item] = 0;
      object[item] += 1;
    })

    for (var prop in object) {
      if (object[prop] >= 2) {
        result.push(prop);
      }
    }

    return result;

  }

  filesubmit() {
    var error = true;
    if (this.file == null || this.file == "null" || this.file == undefined || this.file == "undefined") {
      swal("Error!", "Please import your file.", "error");
      return false;
    }



   // var Scheme_XLSXData1 = this.XlSXData;
  //  var Block_A_DN_XLSXData2 = this.XlSXData1;
    Block_A_TRN_XLSXData3 = this.XlSXData2;


    if ((Block_A_TRN_XLSXData3.length == 0)) {
      swal("Error!", "Please upload valid excel.", "error");
      return false;
    }


    //Scheme_XLSXData1 = JSON.parse(str);
    var findDuplicateLeadId = [];
    // for (var i = 0; i < Scheme_XLSXData1.length; i++) {
    //   findDuplicateLeadId.push(Scheme_XLSXData1[i].CHEQUE_NUMBER);
    // }
    var findDuplicateLeadIdArray = this.find_duplicate_in_array(findDuplicateLeadId);
    var StringForLeadId = "";
    for (var k = 0; k < findDuplicateLeadIdArray.length; k++) {
      if (findDuplicateLeadIdArray.length == 1) {
        StringForLeadId += findDuplicateLeadIdArray[k];
      } else {
        if (k == (findDuplicateLeadIdArray.length - 1)) {
          StringForLeadId += " and " + findDuplicateLeadIdArray[k];
        } else {
          StringForLeadId += findDuplicateLeadIdArray[k] + ", ";
        }
      }
    }
    if (findDuplicateLeadIdArray.length > 0) {
      swal(StringForLeadId + " these are dupliacate Cheque number's, Please check.");
      $('.page-loader-wrapper').hide();
      return false;
    }




    var financialSchemeRequests = [];


    // for (var i = 0; i < Scheme_XLSXData1.length; i++) {
    //   var date_startdate = new Date(Scheme_XLSXData1[i].START_DATE);
    //   date_startdate.setDate(date_startdate.getDate() + 1);

    //   var date_enddate = new Date(Scheme_XLSXData1[i].END_DATE);
    //   date_enddate.setDate(date_enddate.getDate() + 1);



    //   //alert((new Date(Scheme_XLSXData1[i].START_DATE)).setDate((new Date(Scheme_XLSXData1[i].START_DATE)).getDate() + 1)))
    //   // var financialschemerequests = {
    //   //   "siteName": Scheme_XLSXData1[i].SITE_NAME,
    //   //   "blockName": Scheme_XLSXData1[i].BLOCK_NAME,
    //   //   "flatNo": Scheme_XLSXData1[i].FLAT_NO,
    //   //   "flatBookingId": Scheme_XLSXData1[i].FLAT_BOOK_ID,
    //   //   "schemeName": Scheme_XLSXData1[i].SCHEME_NAME,
    //   //   "taxName": Scheme_XLSXData1[i].TAX_NAME,
    //   //   "percentageValue": Scheme_XLSXData1[i].PERCENTAGE_VALUE,
    //   //   "startDate": date_startdate.getTime(),
    //   //   "endDate": date_enddate.getTime(),
    //   //   "recordType": Scheme_XLSXData1[i].TYPE
    //   // }
    //   // financialSchemeRequests.push(financialschemerequests);

    // }

    // var demandnoteRequests = []
    // for (var i = 0; i < Block_A_DN_XLSXData2.length; i++) {

    //   if (Block_A_DN_XLSXData2[i].TYPE == null || Block_A_DN_XLSXData2[i].TYPE == undefined) {
    //     swal({
    //       title: second_sheet_name,
    //       text: "Type found empty in line number : " + (i + 2),
    //     });
    //     return false;
    //   }

    //   if (Block_A_DN_XLSXData2[i].SITE_NAME == null || Block_A_DN_XLSXData2[i].SITE_NAME == undefined) {

    //     swal({
    //       title: second_sheet_name,
    //       text: "Site name found empty in line number : " + (i + 2),
    //     });
    //     return false;
    //   }

    //   if (Block_A_DN_XLSXData2[i].BLOCK_NAME == null || Block_A_DN_XLSXData2[i].BLOCK_NAME == undefined) {

    //     swal({
    //       title: second_sheet_name,
    //       text: "Block name found empty in line number : " + (i + 2),
    //     });

    //     return false;
    //   }


    //   if (Block_A_DN_XLSXData2[i].FLAT_NO == null || Block_A_DN_XLSXData2[i].FLAT_NO == undefined) {

    //     swal({
    //       title: second_sheet_name,
    //       text: "Flat number found empty in line number : " + (i + 2),
    //     });

    //     return false;
    //   }

    //   if (Block_A_DN_XLSXData2[i].DEMAND_NOTE_DATE == null || Block_A_DN_XLSXData2[i].DEMAND_NOTE_DATE == undefined) {

    //     swal({
    //       title: second_sheet_name,
    //       text: "Demand note date found empty in line number : " + (i + 2),
    //     });
    //     return false;
    //   }

    //   if (Block_A_DN_XLSXData2[i].IS_INTEREST_OR_WITH_OUT_INTEREST == null || Block_A_DN_XLSXData2[i].IS_INTEREST_OR_WITH_OUT_INTEREST == undefined) {
    //     swal({
    //       title: second_sheet_name,
    //       text: "Is interest or with out intrest found empty in line number : " + (i + 2),
    //     });

    //     return false;
    //   }

    //   if (Block_A_DN_XLSXData2[i].MILESTONE_NO == null || Block_A_DN_XLSXData2[i].MILESTONE_NO == undefined) {

    //     swal({
    //       title: second_sheet_name,
    //       text: "Milestone number found empty in line number : " + (i + 2),
    //     });
    //     return false;
    //   }


    //   if (Block_A_DN_XLSXData2[i].MILESTONE_NAME == null || Block_A_DN_XLSXData2[i].MILESTONE_NAME == undefined) {

    //     swal({
    //       title: second_sheet_name,
    //       text: "Milestone name found empty in line number : " + (i + 2),
    //     });
    //     return false;
    //   }


    //   if (Block_A_DN_XLSXData2[i].MILSSTONE_PERCENTAGE == null || Block_A_DN_XLSXData2[i].MILSSTONE_PERCENTAGE == undefined) {
    //     swal({
    //       title: second_sheet_name,
    //       text: "Milestone percentage found empty in line number : " + (i + 2),
    //     });
    //     return false;

    //   }

    //   if (Block_A_DN_XLSXData2[i].DEMAND_NOTE_DATE == null || Block_A_DN_XLSXData2[i].DEMAND_NOTE_DATE == undefined) {
    //     swal({
    //       title: second_sheet_name,
    //       text: "Demand note date found empty in line number : " + (i + 2),
    //     });
    //     return false;

    //   }

    //   if (Block_A_DN_XLSXData2[i].DUE_DATE == null || Block_A_DN_XLSXData2[i].DUE_DATE == undefined) {
    //     swal({
    //       title: second_sheet_name,
    //       text: "Due date date found empty in line number : " + (i + 2),
    //     });
    //     return false;

    //   }




    //   var date_DEMAND_NOTE_DATE = new Date(Block_A_DN_XLSXData2[i].DEMAND_NOTE_DATE);
    //   date_DEMAND_NOTE_DATE.setDate(date_DEMAND_NOTE_DATE.getDate() + 1);

    //   var date_DUE_DATE = new Date(Block_A_DN_XLSXData2[i].DUE_DATE);
    //   date_DUE_DATE.setDate(date_DUE_DATE.getDate() + 1);



    //   var demandnoterequests = {
    //     "recordType": Block_A_DN_XLSXData2[i].TYPE,
    //     "siteName": Block_A_DN_XLSXData2[i].SITE_NAME,
    //     "demandNoteNo": Block_A_DN_XLSXData2[i].DEMAND_NOTE_NO,
    //     "blockName": Block_A_DN_XLSXData2[i].BLOCK_NAME,
    //     "flatNo": Block_A_DN_XLSXData2[i].FLAT_NO,
    //     "flatBookingId": Block_A_DN_XLSXData2[i].FLAT_BOOK_ID,
    //     "demandNoteDate": new Date(date_DEMAND_NOTE_DATE).getTime(),
    //     "isWithInterestOrWithOut": Block_A_DN_XLSXData2[i].IS_INTEREST_OR_WITH_OUT_INTEREST,
    //     "projectMilestoneId": Block_A_DN_XLSXData2[i].PROJECT_MILESTONE_ID,
    //     "mileStoneNo": Block_A_DN_XLSXData2[i].MILESTONE_NO,
    //     "milestoneName": Block_A_DN_XLSXData2[i].MILESTONE_NAME,
    //     "mileStonePercentage": Block_A_DN_XLSXData2[i].MILSSTONE_PERCENTAGE,
    //     "milestoneCompletedDate": new Date(date_DEMAND_NOTE_DATE).getTime(),
    //     "mileStoneDueDate": new Date(date_DUE_DATE).getTime(),
    //     "totalFlatAmountIncludeGST": Block_A_DN_XLSXData2[i].TOTAL_FLAT_AMOUNT_INCLUDE_GST,
    //     "amountReceivedIncludeGST": Block_A_DN_XLSXData2[i].AMOUNT_RECEIVED_INCLUDE_GST,
    //     "dueAmountExcludinggst": Block_A_DN_XLSXData2[i].DUE_AMOUNT_EXCLUDING_GST,
    //     "cgst": Block_A_DN_XLSXData2[i].CGST,
    //     "sgst": Block_A_DN_XLSXData2[i].SGST,
    //     "totalDueAmount": Block_A_DN_XLSXData2[i].TOTAL_DUE_AMOUNT,
    //     "isShowGstInPDF": Block_A_DN_XLSXData2[i].SHOW_GST_IN_PDF,
    //     "excelRecordNo": Block_A_DN_XLSXData2[i].EXCEL_RECORD_NO
    //   }
    //   demandnoteRequests.push(demandnoterequests);
    // }

    var demandNoteTransactionRequests = [];
    for (var i = 0; i < Block_A_TRN_XLSXData3.length; i++) {


      if (Block_A_TRN_XLSXData3[i].TYPE == null || Block_A_TRN_XLSXData3[i].TYPE == undefined) {

        swal({
          title: thired_sheet_name,
          text: "Type found empty in line number : " + (i + 2),
        });
        return false;
      }

      var typecapitalize = Block_A_TRN_XLSXData3[i].TYPE;
      if (typecapitalize != typecapitalize.toUpperCase()) {
        swal({
          title: thired_sheet_name,
          text: "Type must be capital letter in line number : " + (i + 2),
        });
        return false;
      }


      if (Block_A_TRN_XLSXData3[i].SITE_NAME == null || Block_A_TRN_XLSXData3[i].SITE_NAME == undefined) {

        swal({
          title: thired_sheet_name,
          text: "Site name found empty in line number : " + (i + 2),
        });
        return false;

      }


      // if (Block_A_TRN_XLSXData3[i].TRANSACTION_RECEIPT_NO == null || Block_A_TRN_XLSXData3[i].TRANSACTION_RECEIPT_NO == undefined) {

      //   swal({
      //     title: thired_sheet_name,
      //     text: "Transaction receipt number found empty in line number : " + (i + 2),
      //   });
      //   return false;
      // }


      // if (Block_A_TRN_XLSXData3[i].BLOCK_NAME == null || Block_A_TRN_XLSXData3[i].BLOCK_NAME == undefined) {

      //   swal({
      //     title: thired_sheet_name,
      //     text: "Block name found empty in line number : " + (i + 2),
      //   });
      //   return false;

      // }

      if (Block_A_TRN_XLSXData3[i].FLAT_NO == null || Block_A_TRN_XLSXData3[i].FLAT_NO == undefined) {
        swal({
          title: thired_sheet_name,
          text: "Flat number found empty in line number : " + (i + 2),
        });
        return false;

      }

      if (Block_A_TRN_XLSXData3[i].TRANSACTION_TYPE == null || Block_A_TRN_XLSXData3[i].TRANSACTION_TYPE == undefined) {
        swal({
          title: thired_sheet_name,
          text: "Transaction type found empty in line number : " + (i + 2),
        });
        return false;

      }

      if (Block_A_TRN_XLSXData3[i].TRANSACTION_MODE == null || Block_A_TRN_XLSXData3[i].TRANSACTION_MODE == undefined) {

        swal({
          title: thired_sheet_name,
          text: "Transaction mode found empty in line number : " + (i + 2),
        });
        return false;

      }

      // if (Block_A_TRN_XLSXData3[i].ONLINE_TRANSFER_MODE == null || Block_A_TRN_XLSXData3[i].ONLINE_TRANSFER_MODE == undefined) {

      //   swal({
      //     title: thired_sheet_name,
      //     text: "Online transfer mode found empty in line number : " + (i + 2),
      //   });
      //   return false;

      // }

      if (Block_A_TRN_XLSXData3[i].TRANSACTION_FOR == null || Block_A_TRN_XLSXData3[i].TRANSACTION_FOR == undefined) {

        swal({
          title: thired_sheet_name,
          text: "Transaction for found empty in line number :" + (i + 2),
        });
        return false;


      }


      if (Block_A_TRN_XLSXData3[i].TRANSACTION_FOR == 'TDS') {
        swal({
          title: thired_sheet_name,
          text: "Transaction For should not accept TDS transaction in line number : " + (i + 2),
        });
        return false;


      }


      if (Block_A_TRN_XLSXData3[i].TYPE !== 'TRANSACTION') {

        swal({
          title: thired_sheet_name,
          text: "Type should be  transaction in line number : " + (i + 2),
        });
        return false;
      }



      // if (Block_A_TRN_XLSXData3[i].ONLINE_TR_REFERENCE_NO == null || Block_A_TRN_XLSXData3[i].ONLINE_TR_REFERENCE_NO == undefined) {

      //   swal({
      //     title: thired_sheet_name,
      //     text: "Online transaction reference number found empty in line number : " + (i + 2),
      //   });
      //   return false;


      // }


      // if (new Date(Block_A_TRN_XLSXData3[i].ONLINE_TR_RECEIVE_DATE).getTime() == 0 || new Date(Block_A_TRN_XLSXData3[i].ONLINE_TR_RECEIVE_DATE).getTime() == undefined) {
      //   swal({
      //     title: thired_sheet_name,
      //     text: "Online transaction receive date found empty in line number : " + (i + 2),
      //   });
      //   return false;

      // }

      // if (new Date(Block_A_TRN_XLSXData3[i].CHEQUE_DATE).getTime() == 0 || new Date(Block_A_TRN_XLSXData3[i].CHEQUE_DATE).getTime() == undefined) {


      //   swal({
      //     title: thired_sheet_name,
      //     text: "Cheque date found empty in line number : " + (i + 2),
      //   });
      //   return false;

      // }

// if (Block_A_TRN_XLSXData3[i].TRANSACTION_MODE != "waived off"){
// if (Block_A_TRN_XLSXData3[i].CHEQUE_NUMBER == null || Block_A_TRN_XLSXData3[i].CHEQUE_NUMBER == undefined) {
//         swal("Cheque number found empty in line number : " + (i + 2));
//         return false;
//       }

// }
      
      console.log(Block_A_TRN_XLSXData3[i].TRANSACTION_MODE == "Cheque");

      if (Block_A_TRN_XLSXData3[i].TRANSACTION_MODE == "Cheque") {
        if (Block_A_TRN_XLSXData3[i].CHEQUE_NUMBER.length < 5) {
          swal("Minimum Cheque number length is five characters in line number : " + (i + 2));
          return false;
        }
      }


      // if (new Date(Block_A_TRN_XLSXData3[i].CHEQUE_RECEIVE_DATE).getTime() == 0 || new Date(Block_A_TRN_XLSXData3[i].CHEQUE_RECEIVE_DATE).getTime() == undefined) {
      //   swal("Cheque receive date found empty in line number : " + (i + 2));
      //   return false;
      // }

      if (Block_A_TRN_XLSXData3[i].TRANSACTION_AMOUNT == null || Block_A_TRN_XLSXData3[i].TRANSACTION_AMOUNT == undefined) {
        swal("Transaction amount found empty in line number : " + (i + 2));
        return false;
      }

      // if (Block_A_TRN_XLSXData3[i].TDS_AMOUNT == null || Block_A_TRN_XLSXData3[i].TDS_AMOUNT == undefined ) {
      //   swal("TDS amount found empty in line number" + (i + 2));
      //   return false;
      // }

      // if (Block_A_TRN_XLSXData3[i].PAID_BY == null || Block_A_TRN_XLSXData3[i].PAID_BY == undefined) {
      //   swal("Paid by found empty in line number" + (i + 2));
      //   return false;
      // }


      // if (Scheme_XLSXData1[i].RECEIPT_STAGE == null) {
      //   swal("Receipt stage found empty in line number" + (i + 2));
      //   return false;
      // }


      if (Block_A_TRN_XLSXData3[i].RECEIPT_STAGE != "Cleared" && Block_A_TRN_XLSXData3[i].RECEIPT_STAGE != "Received" && Block_A_TRN_XLSXData3[i].RECEIPT_STAGE != "Bounce" && Block_A_TRN_XLSXData3[i].RECEIPT_STAGE != null && Block_A_TRN_XLSXData3[i].RECEIPT_STAGE != undefined) {

        swal("Receipt stage  allow only (Cleared,Received,Bounce) in line number : " + (i + 2));
        return false;

      }





      if (Block_A_TRN_XLSXData3[i].RECEIPT_STAGE == null || Block_A_TRN_XLSXData3[i].RECEIPT_STAGE == undefined) {
        if (new Date(Block_A_TRN_XLSXData3[i].CHEQUE_DEPOSITED_DATE).getTime() == 0 || new Date(Block_A_TRN_XLSXData3[i].CHEQUE_DEPOSITED_DATE).getTime() == undefined) {
          swal("Receipt stage column is empty in line number :" + (i + 2));
          return false;
        }

      //   if (new Date(Block_A_TRN_XLSXData3[i].CHEQUE_CLEARECENCE_DATE).getTime() == 0 || new Date(Block_A_TRN_XLSXData3[i].CHEQUE_CLEARECENCE_DATE).getTime() == undefined) {
      //     swal("Cheque clearecence date found empty in line number :" + (i + 2));
      //     return false;
      //   }
      }




      if (Block_A_TRN_XLSXData3[i].TRANSACTION_AMOUNT == null) {
        Block_A_TRN_XLSXData3[i].TRANSACTION_AMOUNT = 0;
      }
      if (Block_A_TRN_XLSXData3[i].TRANSACTION_AMOUNT == null) {
        Block_A_TRN_XLSXData3[i].TRANSACTION_AMOUNT = 0;
      }
      if (Block_A_TRN_XLSXData3[i].TOTAL_AMOUNT == null) {
        Block_A_TRN_XLSXData3[i].TOTAL_AMOUNT = 0;
      }

      if (Block_A_TRN_XLSXData3[i].PENALTY_AMOUNT == null) {
        Block_A_TRN_XLSXData3[i].PENALTY_AMOUNT = 0;
      }

      if (Block_A_TRN_XLSXData3[i].MODIFICATION_COST == null) {
        Block_A_TRN_XLSXData3[i].MODIFICATION_COST = 0;
      }


      if (Block_A_TRN_XLSXData3[i].LEGAL_COST == null) {
        Block_A_TRN_XLSXData3[i].LEGAL_COST = 0;
      }

      // if (Block_A_TRN_XLSXData3[i].CAR_PARKING_COST == null) {
      //   Block_A_TRN_XLSXData3[i].CAR_PARKING_COST = 0;
      // }




      if (Block_A_TRN_XLSXData3[i].REFUNDABLE_ADVANCE == null) {
        Block_A_TRN_XLSXData3[i].REFUNDABLE_ADVANCE = 0;
      }


      if (Block_A_TRN_XLSXData3[i].TDS_AMOUNT == null) {
        Block_A_TRN_XLSXData3[i].TDS_AMOUNT = 0;
      }

//alert(Block_A_TRN_XLSXData3[i].TRANSACTION_AMOUNT)
//alert((Block_A_TRN_XLSXData3[i].PRINCIPAL_AMOUNT + Block_A_TRN_XLSXData3[i].TOTAL_AMOUNT))
      if (Block_A_TRN_XLSXData3[i].TRANSACTION_AMOUNT != (Block_A_TRN_XLSXData3[i].PRINCIPAL_AMOUNT)) {
        swal("Payment Setoff should be equal to transaction amount in line number : " + (i + 2));
        return false
      }

      if (Block_A_TRN_XLSXData3[i].TRANSACTION_AMOUNT != (Block_A_TRN_XLSXData3[i].TOTAL_AMOUNT)) {
        swal("Payment Setoff should be equal to transaction amount in line number : " + (i + 2));
        return false
      }
      if (Block_A_TRN_XLSXData3[i].PRINCIPAL_AMOUNT != (Block_A_TRN_XLSXData3[i].TOTAL_AMOUNT )) {
        swal("Payment Setoff should be equal to transaction amount in line number : " + (i + 2));
        return false
      }

      if (Block_A_TRN_XLSXData3[i].PRINCIPAL_AMOUNT != (Block_A_TRN_XLSXData3[i].TRANSACTION_AMOUNT )) {
        swal("Payment Setoff should be equal to transaction amount in line number : " + (i + 2));
        return false
      }
      if (Block_A_TRN_XLSXData3[i].TOTAL_AMOUNT != (Block_A_TRN_XLSXData3[i].TRANSACTION_AMOUNT )) {
        swal("Payment Setoff should be equal to transaction amount in line number : " + (i + 2));
        return false
      }

      if (Block_A_TRN_XLSXData3[i].TOTAL_AMOUNT != (Block_A_TRN_XLSXData3[i].PRINCIPAL_AMOUNT )) {
        swal("Payment Setoff should be equal to transaction amount in line number : " + (i + 2));
        return false
      }

      // if (Block_A_TRN_XLSXData3[i].TRANSACTION_AMOUNT !== (Block_A_TRN_XLSXData3[i].PRINCIPAL_AMOUNT + Block_A_TRN_XLSXData3[i].PENALTY_AMOUNT + Block_A_TRN_XLSXData3[i].MODIFICATION_COST + Block_A_TRN_XLSXData3[i].LEGAL_COST  + Block_A_TRN_XLSXData3[i].REFUNDABLE_ADVANCE + Block_A_TRN_XLSXData3[i].TDS_AMOUNT)) {
      //   swal("Payment Setoff should be equal to transaction amount in line number : " + (i + 2));
      //   return false
      // }

      var online_receive_date;
      //alert(Block_A_TRN_XLSXData3[i].ONLINE_TR_RECEIVE_DATE)
      if (Block_A_TRN_XLSXData3[i].ONLINE_TR_RECEIVE_DATE== "" || Block_A_TRN_XLSXData3[i].ONLINE_TR_RECEIVE_DATE== "N/A" || Block_A_TRN_XLSXData3[i].ONLINE_TR_RECEIVE_DATE== null|| Block_A_TRN_XLSXData3[i].ONLINE_TR_RECEIVE_DATE== undefined) {
        online_receive_date = null
      } else {
        online_receive_date = new Date(Block_A_TRN_XLSXData3[i].ONLINE_TR_RECEIVE_DATE);
        online_receive_date.setDate(online_receive_date.getDate() + 1);
      }

      var cheque_date;
      if (Block_A_TRN_XLSXData3[i].CHEQUE_DATE == "" || Block_A_TRN_XLSXData3[i].CHEQUE_DATE == "N/A") {

        cheque_date = null
      } else {
        cheque_date = new Date(Block_A_TRN_XLSXData3[i].CHEQUE_DATE);
        cheque_date.setDate(cheque_date.getDate() + 1);
      }
      var cheque_deposited_date;
      if (Block_A_TRN_XLSXData3[i].CHEQUE_DEPOSITED_DATE == null || Block_A_TRN_XLSXData3[i].CHEQUE_DEPOSITED_DATE == "" || Block_A_TRN_XLSXData3[i].CHEQUE_DEPOSITED_DATE == "N/A" || Block_A_TRN_XLSXData3[i].CHEQUE_DEPOSITED_DATE == null) {
        cheque_deposited_date = null
      } else {
        cheque_deposited_date = new Date(Block_A_TRN_XLSXData3[i].CHEQUE_DEPOSITED_DATE);
        cheque_deposited_date.setDate(cheque_deposited_date.getDate() + 1);
      }

      var cheque_clearence_date;
      if (Block_A_TRN_XLSXData3[i].CHEQUE_CLEARECENCE_DATE == null || Block_A_TRN_XLSXData3[i].CHEQUE_CLEARECENCE_DATE == "" || Block_A_TRN_XLSXData3[i].CHEQUE_CLEARECENCE_DATE == "N/A" || Block_A_TRN_XLSXData3[i].CHEQUE_CLEARECENCE_DATE == null) {
        cheque_clearence_date = null
      } else {
        cheque_clearence_date = new Date(Block_A_TRN_XLSXData3[i].CHEQUE_CLEARECENCE_DATE);
        cheque_clearence_date.setDate(cheque_clearence_date.getDate() + 1);


      }

      var cheque_receive_date;
      if (Block_A_TRN_XLSXData3[i].CHEQUE_RECEIVE_DATE == "" || Block_A_TRN_XLSXData3[i].CHEQUE_RECEIVE_DATE == "N/A" || Block_A_TRN_XLSXData3[i].CHEQUE_RECEIVE_DATE == null) {
        cheque_receive_date = null
      } else {
        cheque_receive_date = new Date(Block_A_TRN_XLSXData3[i].CHEQUE_RECEIVE_DATE);
        cheque_receive_date.setDate(cheque_receive_date.getDate() + 1);

      }

      var total_close_date;
      if (Block_A_TRN_XLSXData3[i].TRANSACTION_CLOSED_DATE == "" || Block_A_TRN_XLSXData3[i].TRANSACTION_CLOSED_DATE == "N/A" || Block_A_TRN_XLSXData3[i].TRANSACTION_CLOSED_DATE == null) {
        total_close_date = null
      } else {
        total_close_date = new Date(Block_A_TRN_XLSXData3[i].TRANSACTION_CLOSED_DATE);
        total_close_date.setDate(total_close_date.getDate() + 1);
      }

      var type;
      if (Block_A_TRN_XLSXData3[i].TYPE == "" || Block_A_TRN_XLSXData3[i].TYPE == "N/A") {
        type = null
      } else {
        type = Block_A_TRN_XLSXData3[i].TYPE;
      }

      var site_name;
      if (Block_A_TRN_XLSXData3[i].SITE_NAME == "" || Block_A_TRN_XLSXData3[i].SITE_NAME == "N/A") {
        site_name = null
      } else {
        site_name = Block_A_TRN_XLSXData3[i].SITE_NAME;
      }

      var block_name;
      if (Block_A_TRN_XLSXData3[i].BLOCK_NAME == "" || Block_A_TRN_XLSXData3[i].BLOCK_NAME == "N/A") {
        block_name = null
      } else {
        block_name = Block_A_TRN_XLSXData3[i].BLOCK_NAME;
      }

      var flat_no;
      if (Block_A_TRN_XLSXData3[i].FLAT_NO == "" || Block_A_TRN_XLSXData3[i].FLAT_NO == "N/A") {
        flat_no = null
      } else {
        flat_no = Block_A_TRN_XLSXData3[i].FLAT_NO;
      }

      var flat_booking_id;
      if (Block_A_TRN_XLSXData3[i].FLAT_BOOK_ID == "" || Block_A_TRN_XLSXData3[i].FLAT_BOOK_ID == "N/A") {
        flat_booking_id = null
      } else {
        flat_booking_id = Block_A_TRN_XLSXData3[i].FLAT_BOOK_ID;
      }

      var flat_booking_id;
      if (Block_A_TRN_XLSXData3[i].FLAT_BOOK_ID == "" || Block_A_TRN_XLSXData3[i].FLAT_BOOK_ID == "N/A") {
        flat_booking_id = null
      } else {
        flat_booking_id = Block_A_TRN_XLSXData3[i].FLAT_BOOK_ID;
      }

      var transaction_type;
      if (Block_A_TRN_XLSXData3[i].TRANSACTION_TYPE == "" || Block_A_TRN_XLSXData3[i].TRANSACTION_TYPE == "N/A") {
        transaction_type = null
      } else {
        transaction_type = Block_A_TRN_XLSXData3[i].TRANSACTION_TYPE;
      }

      var transaction_mode;
      if (Block_A_TRN_XLSXData3[i].TRANSACTION_MODE == "" || Block_A_TRN_XLSXData3[i].TRANSACTION_MODE == "N/A") {
        transaction_mode = null
      } else {
        transaction_mode = Block_A_TRN_XLSXData3[i].TRANSACTION_MODE;
      }

      var transfer_mode;
      if (Block_A_TRN_XLSXData3[i].ONLINE_TRANSFER_MODE == "" || Block_A_TRN_XLSXData3[i].ONLINE_TRANSFER_MODE == "N/A") {
        transfer_mode = null
      } else {
        transfer_mode = Block_A_TRN_XLSXData3[i].ONLINE_TRANSFER_MODE;
      }

      var transaction_for;
      if (Block_A_TRN_XLSXData3[i].TRANSACTION_FOR == "" || Block_A_TRN_XLSXData3[i].TRANSACTION_FOR == "N/A") {
        transaction_for = null
      } else {
        transaction_for = Block_A_TRN_XLSXData3[i].TRANSACTION_FOR;
      }

      var reference_number;
      if (Block_A_TRN_XLSXData3[i].ONLINE_TR_REFERENCE_NO == "" || Block_A_TRN_XLSXData3[i].ONLINE_TR_REFERENCE_NO == "N/A") {
        reference_number = null
      } else {
        reference_number = Block_A_TRN_XLSXData3[i].ONLINE_TR_REFERENCE_NO;
      }

      var cheque_number;
      if (Block_A_TRN_XLSXData3[i].CHEQUE_NUMBER == "" || Block_A_TRN_XLSXData3[i].CHEQUE_NUMBER == "N/A") {
        cheque_number = null
      } else {
        cheque_number = Block_A_TRN_XLSXData3[i].CHEQUE_NUMBER;
      }

      var transaction_amount;
      if (Block_A_TRN_XLSXData3[i].TRANSACTION_AMOUNT == "" || Block_A_TRN_XLSXData3[i].TRANSACTION_AMOUNT == "N/A") {
        transaction_amount = null
      } else {
        transaction_amount = Block_A_TRN_XLSXData3[i].TRANSACTION_AMOUNT;
      }

      var bank_nmae;
      if (Block_A_TRN_XLSXData3[i].BANK_NAME == "" || Block_A_TRN_XLSXData3[i].BANK_NAME == "N/A") {
        bank_nmae = null
      } else {
        bank_nmae = Block_A_TRN_XLSXData3[i].BANK_NAME;
      }

      var site_account_id;
      if (Block_A_TRN_XLSXData3[i].SITE_BANK_ACCOUNT_ID == "" || Block_A_TRN_XLSXData3[i].SITE_BANK_ACCOUNT_ID == "N/A") {
        site_account_id = null
      } else {
        site_account_id = Block_A_TRN_XLSXData3[i].SITE_BANK_ACCOUNT_ID;
      }

      var site_bank_account_num;
      if (Block_A_TRN_XLSXData3[i].SITE_BANK_ACCOUNT_NUMBER == "" || Block_A_TRN_XLSXData3[i].SITE_BANK_ACCOUNT_NUMBER == "N/A") {
        site_bank_account_num = null
      } else {
        site_bank_account_num = Block_A_TRN_XLSXData3[i].SITE_BANK_ACCOUNT_NUMBER;
      }


     

      var principle_updatetds_amount;
      if (Block_A_TRN_XLSXData3[i].PRINCIPAL_AMOUNT == 0 || Block_A_TRN_XLSXData3[i].PRINCIPAL_AMOUNT == "" || Block_A_TRN_XLSXData3[i].PRINCIPAL_AMOUNT == "N/A" || Block_A_TRN_XLSXData3[i].PRINCIPAL_AMOUNT == null) {
        principle_updatetds_amount = Block_A_TRN_XLSXData3[i].TDS_AMOUNT;
      } else {
        principle_updatetds_amount = Block_A_TRN_XLSXData3[i].PRINCIPAL_AMOUNT;
      }

      // var principle_amount;
      // if(Block_A_TRN_XLSXData3[i].PRINCIPAL_AMOUNT == "" || Block_A_TRN_XLSXData3[i].PRINCIPAL_AMOUNT == "N/A"){
      //   principle_amount = null
      // }else{
      //   principle_amount = Block_A_TRN_XLSXData3[i].PRINCIPAL_AMOUNT;
      // }

      var penality_amount;
      if (Block_A_TRN_XLSXData3[i].PENALTY_AMOUNT == "" || Block_A_TRN_XLSXData3[i].PENALTY_AMOUNT == "N/A") {
        penality_amount = null
      } else {
        penality_amount = Block_A_TRN_XLSXData3[i].PENALTY_AMOUNT;
      }

      var modification_cost;
      var modification_invoice;
      if (Block_A_TRN_XLSXData3[i].MODIFICATION_COST == "" || Block_A_TRN_XLSXData3[i].MODIFICATION_COST == "N/A") {
        modification_cost = null
      //  modification_invoice = null
      } else {
        modification_cost = Block_A_TRN_XLSXData3[i].MODIFICATION_COST;
       
        if(modification_cost != null){
          modification_invoice = Block_A_TRN_XLSXData3[i].INVOICE_NO;
        }else{
          modification_invoice = null
        }
      }

      var legal_cost;
      var legal_cost_invoice;
      if (Block_A_TRN_XLSXData3[i].LEGAL_COST == "" || Block_A_TRN_XLSXData3[i].LEGAL_COST == "N/A") {
        legal_cost = null
      //  legal_cost_invoice = null
      } else {
        legal_cost = Block_A_TRN_XLSXData3[i].LEGAL_COST;
       
        if(legal_cost != null){
          legal_cost_invoice = Block_A_TRN_XLSXData3[i].INVOICE_NO
        }else{
          legal_cost_invoice = null
        }
    
      }

      var Car_parking_cost;
      var Car_parking_cost_invoice;
      if (Block_A_TRN_XLSXData3[i].CAR_PARKING_COST == "" || Block_A_TRN_XLSXData3[i].CAR_PARKING_COST == "N/A") {
        Car_parking_cost = null
     
 
      } else {
        Car_parking_cost = Block_A_TRN_XLSXData3[i].CAR_PARKING_COST;
        if(Car_parking_cost != null){
          Car_parking_cost_invoice = Block_A_TRN_XLSXData3[i].INVOICE_NO;
        }else{
          Car_parking_cost_invoice = null
        }
       
      }
     // alert(Car_parking_cost_invoice)

      var Assignment_cost;
      var Assignment_cost_invoice;
      if (Block_A_TRN_XLSXData3[i].ASSIGNMENT_TRANSFER_FEE == "" || Block_A_TRN_XLSXData3[i].ASSIGNMENT_TRANSFER_FEE == "N/A") {
        Assignment_cost = null
       // Assignment_cost_invoice = null
      } else {
        Assignment_cost = Block_A_TRN_XLSXData3[i].ASSIGNMENT_TRANSFER_FEE;
       
        if(Assignment_cost != null){
          Assignment_cost_invoice = Block_A_TRN_XLSXData3[i].INVOICE_NO;
        }else{
          Assignment_cost_invoice = null
        }
      }

      // var Car_parking_cost;
      // if (Block_A_TRN_XLSXData3[i].CAR_PARKING_COST == "" || Block_A_TRN_XLSXData3[i].CAR_PARKING_COST == "N/A") {
      //   Car_parking_cost = null
      // } else {
      //   Car_parking_cost = Block_A_TRN_XLSXData3[i].CAR_PARKING_COST;
      // }



      var refundable_advance;
      if (Block_A_TRN_XLSXData3[i].REFUNDABLE_ADVANCE == "" || Block_A_TRN_XLSXData3[i].REFUNDABLE_ADVANCE == "N/A") {
        refundable_advance = null
      } else {
        refundable_advance = Block_A_TRN_XLSXData3[i].REFUNDABLE_ADVANCE;
      }

      var comment;
      if (Block_A_TRN_XLSXData3[i].COMMENT == "" || Block_A_TRN_XLSXData3[i].COMMENT == "N/A") {
        comment = null
      } else {
        comment = Block_A_TRN_XLSXData3[i].COMMENT;
      }

      var total_amount;
      if (Block_A_TRN_XLSXData3[i].TOTAL_AMOUNT == "" || Block_A_TRN_XLSXData3[i].TOTAL_AMOUNT == "N/A") {
        total_amount = null
      } else {
        total_amount = Block_A_TRN_XLSXData3[i].TOTAL_AMOUNT;
      }

      var receit_stage;
      if (Block_A_TRN_XLSXData3[i].RECEIPT_STAGE == "" || Block_A_TRN_XLSXData3[i].RECEIPT_STAGE == "N/A") {
        receit_stage = null
      } else {
        receit_stage = Block_A_TRN_XLSXData3[i].RECEIPT_STAGE;
      }

      var SHOWGSTINPDF;
      if (Block_A_TRN_XLSXData3[i].SHOW_GST_IN_PDF == "" || Block_A_TRN_XLSXData3[i].SHOW_GST_IN_PDF == "N/A") {
        SHOWGSTINPDF = null
      } else {
        SHOWGSTINPDF = Block_A_TRN_XLSXData3[i].SHOW_GST_IN_PDF;
      }

      var EXCELRECORDNO;
      if (Block_A_TRN_XLSXData3[i].EXCEL_RECORD_NO == "" || Block_A_TRN_XLSXData3[i].EXCEL_RECORD_NO == "N/A") {
        EXCELRECORDNO = null
      } else {
        EXCELRECORDNO = Block_A_TRN_XLSXData3[i].EXCEL_RECORD_NO;
      }

      var TRANSACTION_RECEIPT_NO;
      if (Block_A_TRN_XLSXData3[i].TRANSACTION_RECEIPT_NO == "" || Block_A_TRN_XLSXData3[i].TRANSACTION_RECEIPT_NO == "N/A") {
        TRANSACTION_RECEIPT_NO = null
      } else {
        TRANSACTION_RECEIPT_NO = Block_A_TRN_XLSXData3[i].TRANSACTION_RECEIPT_NO;
      }

      var SOURCE_OF_FUNDS;

      if (Block_A_TRN_XLSXData3[i].SOURCE_OF_FUNDS == "" || Block_A_TRN_XLSXData3[i].SOURCE_OF_FUNDS == "N/A") {
        SOURCE_OF_FUNDS = null
      } else {
        SOURCE_OF_FUNDS = Block_A_TRN_XLSXData3[i].SOURCE_OF_FUNDS;
      }

      var bsr_code;
      if (Block_A_TRN_XLSXData3[i].BSR_CODE == "" || Block_A_TRN_XLSXData3[i].BSR_CODE == "N/A") {
        bsr_code = null
      } else {
        bsr_code = Block_A_TRN_XLSXData3[i].BSR_CODE;
      }
      

      var acknowledge_NO;
     if (Block_A_TRN_XLSXData3[i].ACKNOWLEDGEMENT_NO == "" || Block_A_TRN_XLSXData3[i].ACKNOWLEDGEMENT_NO == "N/A") {
        acknowledge_NO = null
      } else {
        acknowledge_NO = Block_A_TRN_XLSXData3[i].ACKNOWLEDGEMENT_NO;
      }

      var  waived_off_date;
      if (Block_A_TRN_XLSXData3[i].WAIVED_OFF_DATE == "" || Block_A_TRN_XLSXData3[i].WAIVED_OFF_DATE == "N/A" || Block_A_TRN_XLSXData3[i].WAIVED_OFF_DATE == null) {
        waived_off_date = null
      } else {
        waived_off_date = Block_A_TRN_XLSXData3[i].WAIVED_OFF_DATE;
      }



      var Challan_NO;
      if (Block_A_TRN_XLSXData3[i].CHALLAN_NO == "" || Block_A_TRN_XLSXData3[i].CHALLAN_NO == "N/A") {
        Challan_NO = null
       } else {
        Challan_NO = Block_A_TRN_XLSXData3[i].CHALLAN_NO;
       }

       var Challan_DATE;
       if (Block_A_TRN_XLSXData3[i].CHALLAN_DATE == "" || Block_A_TRN_XLSXData3[i].CHALLAN_DATE == "N/A" || Block_A_TRN_XLSXData3[i].CHALLAN_DATE == null) {
        Challan_DATE = null
        } else {
          Challan_DATE = Block_A_TRN_XLSXData3[i].CHALLAN_DATE;

          Challan_DATE.setDate(Challan_DATE.getDate() + 1);
        }

        var TDS_TRANSACTION_RECEIVE_DATE;
        if (Block_A_TRN_XLSXData3[i].TDS_TRANSACTION_RECEIVE_DATE == "" || Block_A_TRN_XLSXData3[i].TDS_TRANSACTION_RECEIVE_DATE == "N/A" || Block_A_TRN_XLSXData3[i].TDS_TRANSACTION_RECEIVE_DATE == null) {
          TDS_TRANSACTION_RECEIVE_DATE = null
         } else {
          TDS_TRANSACTION_RECEIVE_DATE = Block_A_TRN_XLSXData3[i].TDS_TRANSACTION_RECEIVE_DATE;
 
          TDS_TRANSACTION_RECEIVE_DATE.setDate(TDS_TRANSACTION_RECEIVE_DATE.getDate() + 1);
         }
        
            var challan_reflection_DATE;
       if (Block_A_TRN_XLSXData3[i].CHALLAN_REFLECTION_DATE == "" || Block_A_TRN_XLSXData3[i].CHALLAN_REFLECTION_DATE == "N/A"|| Block_A_TRN_XLSXData3[i].CHALLAN_REFLECTION_DATE == null) {
        challan_reflection_DATE = null
        } else {
          challan_reflection_DATE = Block_A_TRN_XLSXData3[i].CHALLAN_REFLECTION_DATE;
         // alert(challan_reflection_DATE)
          challan_reflection_DATE.setDate(challan_reflection_DATE.getDate() + 1);
        }

        console.log("bsr_code :"+bsr_code)
        console.log("acknowledge_NO :"+acknowledge_NO)
        console.log("Challan_NO :"+Challan_NO)
        console.log("Challan_DATE :"+Challan_DATE)
        console.log("TDS_TRANSACTION_RECEIVE_DATE :"+TDS_TRANSACTION_RECEIVE_DATE)
        
        console.log("challan_reflection_DATE :"+challan_reflection_DATE)
        if (Block_A_TRN_XLSXData3[i].TRANSACTION_MODE == "TDS") {
              // if (bsr_code == null){
              //   swal({
              //     title: thired_sheet_name,
              //     text: "BSR code found empty in line number : " + (i + 2),
              //   });
              //   return false;
              // }

              if (acknowledge_NO == null){
                swal({
                  title: thired_sheet_name,
                  text: "Acknowledge number found empty in line number : " + (i + 2),
                });
                return false;
              }

              // if (Challan_NO == null){
              //   swal({
              //     title: thired_sheet_name,
              //     text: "Challan number found empty in line number : " + (i + 2),
              //   });
              //   return false;
              // }
        
              if (TDS_TRANSACTION_RECEIVE_DATE == null){
                swal({
                  title: thired_sheet_name,
                  text: "TDS receive date found empty in line number : " + (i + 2),
                });
                return false;
              }

              // if (challan_reflection_DATE == null){
              //   swal({
              //     title: thired_sheet_name,
              //     text: "Challan reflection date found empty in line number : " + (i + 2),
              //   });
              //   return false;
              // }
        }
      
        if (Block_A_TRN_XLSXData3[i].TRANSACTION_MODE == "Cheque") {
          
          if (cheque_date == null){
            swal({
              title: thired_sheet_name,
              text: "Cheque date found empty in line number : " + (i + 2),
            });
            return false;
          }
          // if (cheque_deposited_date == null){
          //   swal({
          //     title: thired_sheet_name,
          //     text: "Cheque deposite date found empty in line number : " + (i + 2),
          //   });
          //   return false;
          // }

          // if (cheque_clearence_date == null){
          //   swal({
          //     title: thired_sheet_name,
          //     text: "Cheque clearence date found empty in line number : " + (i + 2),
          //   });
          //   return false;
          // }

          // if (cheque_number == null){
          //   swal({
          //     title: thired_sheet_name,
          //     text: "Cheque number found empty in line number : " + (i + 2),
          //   });
          //   return false;
          // }

          if (cheque_receive_date == null){
            swal({
              title: thired_sheet_name,
              text: "Cheque receive date found empty in line number : " + (i + 2),
            });
            return false;
          }

          // if (online_receive_date == null){
          //   swal({
          //     title: thired_sheet_name,
          //     text: "Online receive date found empty in line number : " + (i + 2),
          //   });
          //   return false;
          // }
          
        }
       
        if (Block_A_TRN_XLSXData3[i].TRANSACTION_MODE == "Online"){
          if (site_bank_account_num == null){
            swal({
              title: thired_sheet_name,
              text: "Site bank account number found empty in line number : " + (i + 2),
            });
            return false;
          }
          if (reference_number == null){
            swal({
              title: thired_sheet_name,
              text: "Online transaction reference number found empty in line number : " + (i + 2),
            });
            return false;
          }

          if (Block_A_TRN_XLSXData3[i].ONLINE_TR_PAYMENT_DATE== "" || Block_A_TRN_XLSXData3[i].ONLINE_TR_PAYMENT_DATE== "N/A" || Block_A_TRN_XLSXData3[i].ONLINE_TR_PAYMENT_DATE== null|| Block_A_TRN_XLSXData3[i].ONLINE_TR_PAYMENT_DATE== undefined) {
            online_receive_date = null
          } else {
            online_receive_date = new Date(Block_A_TRN_XLSXData3[i].ONLINE_TR_PAYMENT_DATE);
            online_receive_date.setDate(online_receive_date.getDate() + 1);
          }

          if (online_receive_date == null){
            swal({
              title: thired_sheet_name,
              text: "Online transaction payment date found empty in line number : " + (i + 2),
            });
            return false;
          }
        }


        
      if (Block_A_TRN_XLSXData3[i].TRANSACTION_MODE == "waived off") {
        if (waived_off_date == null) {
          swal({
            title: thired_sheet_name,
            text: "Online transaction waived off date found empty in line number : " + (i + 2),
          });
          return false;
        } else {

          waived_off_date = Block_A_TRN_XLSXData3[i].WAIVED_OFF_DATE;
          waived_off_date.setDate(waived_off_date.getDate() + 1);


        }

      
      }


        
      var demandNotetransactionrequests = {
        "waivedOffDate": (waived_off_date != null ? new Date(waived_off_date).getTime() : waived_off_date),
        "recordType": type,
        "siteName": site_name,
        "salesFrTransactionReceiptNo": TRANSACTION_RECEIPT_NO,
        "blockName": block_name,
        "flatNo": flat_no,
        "flatBookingId": flat_booking_id,
        "transactionTypeName": transaction_type,
        "transactionModeName": transaction_mode,
        "transferModeName": transfer_mode,
        "transactionFor": transaction_for,
        "referenceNo": reference_number,
        "onlineReceiveDate": online_receive_date,
        "chequeDate": (cheque_date != null ? new Date(cheque_date).getTime() : cheque_date),
        "chequeDepositedDate": (cheque_deposited_date != null ? new Date(cheque_deposited_date).getTime() : cheque_deposited_date),
        "chequeClearanceDate": (cheque_clearence_date != null ? new Date(cheque_clearence_date).getTime() : cheque_clearence_date),
        "chequeNumber": cheque_number,
        "chequeReceiveDate": (cheque_receive_date != null ? new Date(cheque_receive_date).getTime() : cheque_receive_date),
        "transactionAmount": transaction_amount,
        "bankName": bank_nmae,
        "siteAccountId": site_account_id,
        "siteBankAccountNumber": site_bank_account_num,
        "challanReflectionDate":  (challan_reflection_DATE != null ? new Date(challan_reflection_DATE).getTime() : challan_reflection_DATE),
        "challanNo": Challan_NO,
        "bsrCode": bsr_code,
        "ackNo": acknowledge_NO,
        "challanDate": (Challan_DATE != null ? new Date(Challan_DATE).getTime() : Challan_DATE),
        "transactionReceiveDate": (TDS_TRANSACTION_RECEIVE_DATE != null ? new Date(TDS_TRANSACTION_RECEIVE_DATE).getTime() : TDS_TRANSACTION_RECEIVE_DATE),
        "paymentSetOffDetails": [{ "setOffTypeName": "Fin_Booking_Form_Milestones", "amount": principle_updatetds_amount }
          , { "setOffTypeName": "Fin_Penalty", "amount": penality_amount }
          , { "setOffTypeName": "Modification_Cost", "amount": modification_cost, "invoiceNo": modification_invoice }
          , { "setOffTypeName": "Legal_Cost", "amount": legal_cost, "invoiceNo": legal_cost_invoice }
          , { "setOffTypeName": "Car_Parking_Cost", "amount": Car_parking_cost, "invoiceNo": Car_parking_cost_invoice }

          , { "setOffTypeName": "Assignment_Transfer_Fee", "amount": Assignment_cost, "invoiceNo": Assignment_cost_invoice }
          , { "setOffTypeName": "Refundable_Advance", "amount": refundable_advance }
        ],
        "comment": comment,
        "totalAmount": total_amount,
        "transactionClosedDate":(total_close_date != null ? new Date(total_close_date).getTime() : total_close_date),
        "receiptStage": receit_stage,
        "isShowGstInPDF": SHOWGSTINPDF,
        "excelRecordNo": EXCELRECORDNO,
        "sourceOfFunds": SOURCE_OF_FUNDS,

      }
      demandNoteTransactionRequests.push(demandNotetransactionrequests);
    }
console.log(JSON.stringify(demandNoteTransactionRequests))
   // return false;
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/uploadDemandNoteMilestones.spring";
    //  localhost:8082/SumadhuraGateway/employeeservice/financial/uploadDemandNoteMilestones.spring
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      // "financialSchemeRequests": financialSchemeRequests,
    //  "demandNoteMSRequests": demandnoteRequests,
      "demandNoteTransactionRequests": demandNoteTransactionRequests,
      "requestUrl": "uploadDemandNoteMilestones"
    };
    console.log("final request --------------:"+JSON.stringify(body))

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      console.log(JSON.stringify(resp))
      if (resp.responseCode == 200) {
        // this.tabledata = resp.applicantInfo;
        $("#files").val("");
        $('.page-loader-wrapper').hide();
        swal("Good job!", "Excel uploaded successfully.", "success");
        $("#files").val("");
        $(".file-path").val("");
        // var statusData = resp.bookingFormSavedStatuses;
        // var str = "";
        // for (var i = 0; i < statusData.length; i++) {
        //   var color;
        //   if (statusData[i].status == "success") {
        //     color = "green";
        //   } else {
        //     color = "red";
        //   }
        //   str += '<tr>';
        //   str += '<td class="text-center">' + (i + 1) + '</td>';
        //   str += '<td class="text-center">' + statusData[i].leadId + '</td>';
        //   str += '<td class="text-center">' + statusData[i].custName + '</td>';
        //   str += '<td><span style="color:' + color + ';text-center;">' + statusData[i].status + '</span></td>';
        //   if (statusData[i].status == "success") {
        //     str += '<td style="text-align:center;">-</td>';
        //   }else{
        //     str += '<td><span style="color:' + color + ';text-center; word-break: break-all;">' + statusData[i].error + '</span></td>';
        //   }
        //   str += '<tr>';
        // }
        // $("#responseData").html(str);      
        // var error=  
        // $("#statusData").modal();
      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } 
      else {
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
      }
    },
      error => {
        //  alert(error.status);
        $('.page-loader-wrapper').hide();
        if (error.status == 400) {
          swal("Error!", "Please check the data in excel sheet", "error");
          return false;
        } else {
          swal("Error!", "Internal server error.", "error");
          return false;

        }


      }
    );
  }


  homeClick() {
    // this.router.navigate(['leave-update']);
    this.router.navigate(['dashboard']);
  }

  
  siteList_temp() {
    var arr = localStorage.getItem('SiteIDS');
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "site/site.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": sessionStorage.getItem("login_sessionkey"),
      "siteIds": [107],
    }
console.log(JSON.stringify(body))
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#projectID').html("");
        $('#projectID').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#projectID').append("<option value='" + resp.responseObjList[i].id + "'>" + resp.responseObjList[i].name + "</option>");
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
        this.router.navigate([""]);
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }
}

