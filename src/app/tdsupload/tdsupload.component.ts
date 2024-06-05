import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from "@angular/router";
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { Http, RequestOptions, Headers } from '@angular/http';
import { CommonComponent } from '../common/common.component';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
//import { $ } from 'protractor';
//declare module "XLSX";
declare const swal: any;
var Block_A_TRN_XLSXData3;
declare var $: any;

@Component({
  selector: 'app-tdsupload',
  templateUrl: './tdsupload.component.html',
  styleUrls: ['./tdsupload.component.sass']
})
export class TDSUploadComponent implements OnInit {

  Chequenumbercompare: Array<any> = [];

  uploadtdsform: FormGroup;
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
  submitted: boolean;
  ONLINE_TR_RECEIVE_DATE: any;
  CHEQUE_DATE: any;
  CHEQUE_DEPOSITED_DATE: any;
  CHEQUE_CLEARECENCE_DATE: any;
  CHEQUE_RECEIVE_DATE: any;
  TRANSACTION_CLOSED_DATE: any;
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
      var first_sheet_name = workbook.SheetNames[0];
      var second_sheet_name = workbook.SheetNames[3];
      var thired_sheet_name = workbook.SheetNames[4];
      var worksheet = workbook.Sheets[first_sheet_name];
      var worksheet1 = workbook.Sheets[second_sheet_name];
      var worksheet2 = workbook.Sheets[thired_sheet_name];
      this.XlSXData = XLSX.utils.sheet_to_json(worksheet, { raw: true, defval: null });
      this.XlSXData1 = XLSX.utils.sheet_to_json(worksheet1, { raw: true, defval: null });
      this.XlSXData2 = XLSX.utils.sheet_to_json(worksheet2, { raw: true, defval: null });
      $(".file-path").val(this.file.name);
    }
    fileReader.readAsArrayBuffer(this.file);


  }
  constructor(private http: Http, private router: Router, public cmn: CommonComponent,
    private form_Builer: FormBuilder) {
    $('.page-loader-wrapper').hide();
    sessionStorage.setItem('fromviewpagepredefined', null);
  }

  ngOnInit() {
    this.uploadtdsform = this.form_Builer.group({
      filruploadinput: ['', Validators.required],
    });

  }





  get f() { return this.uploadtdsform.controls; }

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
    this.submitted = true;
    if (this.uploadtdsform.invalid) {
      return;
    } else {
      var error = true;
      var Scheme_XLSXData1 = this.XlSXData;

      if (Scheme_XLSXData1.length == 0) {
        swal("Please upload valid excel.");
        return false;
      }



      //Scheme_XLSXData1 = JSON.parse(str);
      var findDuplicateLeadId = [];
      for (var i = 0; i < Scheme_XLSXData1.length; i++) {
        findDuplicateLeadId.push(Scheme_XLSXData1[i].CHEQUE_NUMBER);
      }
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

      for (var i = 0; i < Scheme_XLSXData1.length; i++) {
        //alert(Scheme_XLSXData1[i].TRANSACTION_RECEIPT_NO)
        if (Scheme_XLSXData1[i].TYPE == null || Scheme_XLSXData1[i].TYPE == undefined) {
          swal("Type found empty in line number : " + (i + 2));
          return false;
        }

        if (Scheme_XLSXData1[i].SITE_NAME == null || Scheme_XLSXData1[i].SITE_NAME == undefined) {
          swal("Site name found empty in line number : " + (i + 2));
          return false;
        }


        // if (Scheme_XLSXData1[i].TRANSACTION_RECEIPT_NO == null || Scheme_XLSXData1[i].TRANSACTION_RECEIPT_NO == undefined) {
        //   swal("Transaction receipt number found empty in line number : " + (i + 2));
        //   return false;
        // }


        if (Scheme_XLSXData1[i].BLOCK_NAME == null || Scheme_XLSXData1[i].BLOCK_NAME == undefined) {
          swal("Block name found empty in line number : " + (i + 2));
          return false;
        }

        if (Scheme_XLSXData1[i].FLAT_NO == null || Scheme_XLSXData1[i].FLAT_NO == undefined) {
          swal("Flat number found empty in line number : " + (i + 2));
          return false;
        }

        if (Scheme_XLSXData1[i].TRANSACTION_TYPE == null || Scheme_XLSXData1[i].TRANSACTION_TYPE == undefined) {
          swal("Transaction type found empty in line number : " + (i + 2));
          return false;
        }

        if (Scheme_XLSXData1[i].TRANSACTION_MODE == null || Scheme_XLSXData1[i].TRANSACTION_MODE == undefined) {
          swal("Transaction mode found empty in line number : " + (i + 2));
          return false;
        }

        if (Scheme_XLSXData1[i].ONLINE_TRANSFER_MODE == null || Scheme_XLSXData1[i].ONLINE_TRANSFER_MODE == undefined) {
          swal("Online transfer mode found empty in line number : " + (i + 2));
          return false;
        }

        if (Scheme_XLSXData1[i].TRANSACTION_FOR == null || Scheme_XLSXData1[i].TRANSACTION_FOR == undefined) {
          swal("Transaction for found empty in line number : " + (i + 2));
          return false;
        }



        if (Scheme_XLSXData1[i].TRANSACTION_FOR !== 'TDS') {
          swal("Transaction For should be tds in line number : " + (i + 2));
          return false;
        }

        console.log(Scheme_XLSXData1[i].TYPE);

        if (Scheme_XLSXData1[i].TYPE !== 'TRANSACTION') {
          swal("Type should be  transaction in line number : " + (i + 2));
          return false;
        }



        if (Scheme_XLSXData1[i].ONLINE_TR_REFERENCE_NO == null || Scheme_XLSXData1[i].ONLINE_TR_REFERENCE_NO == undefined) {
          swal("Online transaction reference number found empty in line number : " + (i + 2));
          return false;
        }


        if (new Date(Scheme_XLSXData1[i].ONLINE_TR_RECEIVE_DATE).getTime() == 0 || new Date(Scheme_XLSXData1[i].ONLINE_TR_RECEIVE_DATE).getTime() == undefined) {
          swal("Online transaction receive date found empty in line number :" + (i + 2));
          return false;
        }

        if (new Date(Scheme_XLSXData1[i].CHEQUE_DATE).getTime() == 0 || new Date(Scheme_XLSXData1[i].CHEQUE_DATE).getTime() == undefined) {
          swal("Cheque date found empty in line number : " + (i + 2));
          return false;
        }




        if (Scheme_XLSXData1[i].CHEQUE_NUMBER == null || Scheme_XLSXData1[i].CHEQUE_NUMBER == undefined) {
          swal("Cheque number found empty in line number : " + (i + 2));
          return false;
        }

        if (Scheme_XLSXData1[i].CHEQUE_NUMBER.length < 5) {
          swal("Minimum Cheque number length is five characters in line number : " + (i + 2));
          return false;
        }




        if (new Date(Scheme_XLSXData1[i].CHEQUE_RECEIVE_DATE).getTime() == 0 || new Date(Scheme_XLSXData1[i].CHEQUE_RECEIVE_DATE).getTime() == undefined) {
          swal("Cheque receive date found empty in line number : " + (i + 2));
          return false;
        }

        if (Scheme_XLSXData1[i].TRANSACTION_AMOUNT == null || Scheme_XLSXData1[i].TRANSACTION_AMOUNT == undefined) {
          swal("Transaction amount found empty in line number : " + (i + 2));
          return false;
        }

        if (Scheme_XLSXData1[i].TDS_AMOUNT == null || Scheme_XLSXData1[i].TDS_AMOUNT == undefined) {
          swal("TDS amount found empty in line number : " + (i + 2));
          return false;
        }

        if (Scheme_XLSXData1[i].PAID_BY == null || Scheme_XLSXData1[i].PAID_BY == undefined) {
          swal("Paid by found empty in line number : " + (i + 2));
          return false;
        }


        // if (Scheme_XLSXData1[i].RECEIPT_STAGE == null) {
        //   swal("Receipt stage found empty in line number" + (i + 2));
        //   return false;
        // }

        console.log(Scheme_XLSXData1[i].RECEIPT_STAGE);

        if (Scheme_XLSXData1[i].RECEIPT_STAGE != "Cleared" && Scheme_XLSXData1[i].RECEIPT_STAGE != "Received" && Scheme_XLSXData1[i].RECEIPT_STAGE != "Bounce" && Scheme_XLSXData1[i].RECEIPT_STAGE != null && Scheme_XLSXData1[i].RECEIPT_STAGE != undefined) {

          swal("Receipt stage  allow only (Cleared,Received,Bounce) in line number : " + (i + 2));
          return false;

        }



        if (Scheme_XLSXData1[i].RECEIPT_STAGE == null || Scheme_XLSXData1[i].RECEIPT_STAGE == undefined) {
          if (new Date(Scheme_XLSXData1[i].CHEQUE_DEPOSITED_DATE).getTime() == 0 || new Date(Scheme_XLSXData1[i].CHEQUE_DEPOSITED_DATE).getTime() == undefined) {
            swal("Cheque Deposited date found empty in line number : " + (i + 2));
            return false;
          }
          if (new Date(Scheme_XLSXData1[i].CHEQUE_CLEARECENCE_DATE).getTime() == 0 || new Date(Scheme_XLSXData1[i].CHEQUE_CLEARECENCE_DATE).getTime() == undefined) {
            swal("Cheque clearecence date found empty in line number : " + (i + 2));
            return false;
          }

        }


        if (Scheme_XLSXData1[i].TRANSACTION_AMOUNT !== (Scheme_XLSXData1[i].TDS_AMOUNT)) {
          swal("Tds amount should be equal to transaction amount in line number : " + (i + 2));
          return false
        }


        if (new Date(Scheme_XLSXData1[i].ONLINE_TR_RECEIVE_DATE).getTime() == 0 || new Date(Scheme_XLSXData1[i].ONLINE_TR_RECEIVE_DATE).getTime() == undefined) {
          this.ONLINE_TR_RECEIVE_DATE = null;
        } else {

          var day = 60 * 60 * 24 * 1000;
          var endDate = new Date(Scheme_XLSXData1[i].ONLINE_TR_RECEIVE_DATE.getTime() + day).getTime();
          this.ONLINE_TR_RECEIVE_DATE = endDate;


        }



        if (new Date(Scheme_XLSXData1[i].CHEQUE_DATE).getTime() == 0 || new Date(Scheme_XLSXData1[i].CHEQUE_DATE).getTime() == undefined) {
          this.CHEQUE_DATE = null;
        } else {


          let day = 60 * 60 * 24 * 1000;
          let endDate = new Date(Scheme_XLSXData1[i].CHEQUE_DATE.getTime() + day).getTime();
          this.CHEQUE_DATE = endDate;
          
        }

        if (new Date(Scheme_XLSXData1[i].CHEQUE_DEPOSITED_DATE).getTime() == 0 || new Date(Scheme_XLSXData1[i].CHEQUE_DEPOSITED_DATE).getTime() == undefined) {
          this.CHEQUE_DEPOSITED_DATE = null;
        } else {
          

          let day = 60 * 60 * 24 * 1000;
          let endDate = new Date(Scheme_XLSXData1[i].CHEQUE_DEPOSITED_DATE.getTime() + day).getTime();
          this.CHEQUE_DEPOSITED_DATE = endDate;


        }

        if (new Date(Scheme_XLSXData1[i].CHEQUE_CLEARECENCE_DATE).getTime() == 0 || new Date(Scheme_XLSXData1[i].CHEQUE_CLEARECENCE_DATE).getTime() == undefined) {
          this.CHEQUE_CLEARECENCE_DATE = null;
        } else {
         
          let day = 60 * 60 * 24 * 1000;
          let endDate = new Date(Scheme_XLSXData1[i].CHEQUE_CLEARECENCE_DATE.getTime() + day).getTime();
          this.CHEQUE_CLEARECENCE_DATE = endDate;

        }

        if (new Date(Scheme_XLSXData1[i].CHEQUE_CLEARECENCE_DATE).getTime() == 0 || new Date(Scheme_XLSXData1[i].CHEQUE_CLEARECENCE_DATE).getTime() == undefined) {
          this.CHEQUE_CLEARECENCE_DATE = null;
        } else {

          let day = 60 * 60 * 24 * 1000;
          let endDate = new Date(Scheme_XLSXData1[i].CHEQUE_CLEARECENCE_DATE.getTime() + day).getTime();
          this.CHEQUE_CLEARECENCE_DATE = endDate;

        }

        if (new Date(Scheme_XLSXData1[i].CHEQUE_RECEIVE_DATE).getTime() == 0 || new Date(Scheme_XLSXData1[i].CHEQUE_RECEIVE_DATE).getTime() == undefined) {
          this.CHEQUE_RECEIVE_DATE = null;
        } else {
          
          let day = 60 * 60 * 24 * 1000;
          let endDate = new Date(Scheme_XLSXData1[i].CHEQUE_RECEIVE_DATE.getTime() + day).getTime();
          this.CHEQUE_RECEIVE_DATE = endDate;

        }


        if (new Date(Scheme_XLSXData1[i].TRANSACTION_CLOSED_DATE).getTime() == 0 || new Date(Scheme_XLSXData1[i].TRANSACTION_CLOSED_DATE).getTime() == undefined) {
          this.TRANSACTION_CLOSED_DATE = null;
        } else {
          
          let day = 60 * 60 * 24 * 1000;
          let endDate = new Date(Scheme_XLSXData1[i].TRANSACTION_CLOSED_DATE.getTime() + day).getTime();
          this.TRANSACTION_CLOSED_DATE = endDate;

        }

        var demandNoteTransactionRequests =
        {
          "recordType": Scheme_XLSXData1[i].TYPE,
          "siteName": Scheme_XLSXData1[i].SITE_NAME,
          "salesFrTransactionReceiptNo": Scheme_XLSXData1[i].TRANSACTION_RECEIPT_NO,
          "blockName": Scheme_XLSXData1[i].BLOCK_NAME,
          "flatNo": Scheme_XLSXData1[i].FLAT_NO,
          "flatBookingId": null,
          "transactionTypeName": Scheme_XLSXData1[i].TRANSACTION_TYPE,
          "transactionModeName": Scheme_XLSXData1[i].TRANSACTION_MODE,
          "transferModeName": Scheme_XLSXData1[i].ONLINE_TRANSFER_MODE,
          "transactionFor": Scheme_XLSXData1[i].TRANSACTION_FOR,
          "referenceNo": Scheme_XLSXData1[i].ONLINE_TR_REFERENCE_NO,
          "onlineReceiveDate": this.ONLINE_TR_RECEIVE_DATE,
          "chequeDate": this.CHEQUE_DATE,
          "chequeDepositedDate": this.CHEQUE_DEPOSITED_DATE,
          "chequeClearanceDate": this.CHEQUE_CLEARECENCE_DATE,
          "chequeNumber": Scheme_XLSXData1[i].CHEQUE_NUMBER,
          "chequeReceiveDate": this.CHEQUE_RECEIVE_DATE,
          "transactionAmount": Scheme_XLSXData1[i].TRANSACTION_AMOUNT,
          "bankName": Scheme_XLSXData1[i].BANK_NAME,
          "siteAccountId": Scheme_XLSXData1[i].SITE_BANK_ACCOUNT_ID,
          "siteBankAccountNumber": Scheme_XLSXData1[i].SITE_BANK_ACCOUNT_NUMBER,
          "paymentSetOffDetails": [
            {
              "setOffTypeName": "TDS",
              "amount": Scheme_XLSXData1[i].TDS_AMOUNT,
              "paidByName": Scheme_XLSXData1[i].PAID_BY,
            }
          ],
          "comment": Scheme_XLSXData1[i].COMMENT,
          "totalAmount": null,
          "transactionClosedDate": this.TRANSACTION_CLOSED_DATE,
          "receiptStage": Scheme_XLSXData1[i].RECEIPT_STAGE,
          "isShowGstInPDF": Scheme_XLSXData1[i].SHOW_GST_IN_PDF,
          "excelRecordNo": Scheme_XLSXData1[i].EXCEL_RECORD_NO,
        }

        financialSchemeRequests.push(demandNoteTransactionRequests);
        console.log("-----------" + JSON.stringify(financialSchemeRequests))

      }


      // for (var i = 0; i < financialSchemeRequests.length; i++) {
      //   if (financialSchemeRequests[i].some(item => item.chequeNumber == Scheme_XLSXData1[i].CHEQUE_NUMBER) == true) {
      //     swal("Cheque number found duplicate in line number : " + (i + 2));
      //     return false;
      //   }
      // }







      $('.page-loader-wrapper').show();
      let url = this.cmn.commonUrl + "financial/uploadDemandNoteMilestones.spring";
      console.log(url);
      var body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "demandNoteTransactionRequests": financialSchemeRequests,
        "requestUrl": "uploadTDS"
      };






      console.log(JSON.stringify(body));
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
        console.log(JSON.stringify(resp));
        $('.page-loader-wrapper').hide();
        if (resp.responseCode == 200) {
          $("#files").val("");
          $('.page-loader-wrapper').hide();
          swal("Excel uploaded successfully.");
          $("#files").val("");
          $(".file-path").val("");
          this.submitted = false;
          this.uploadtdsform.reset();


        } else if (resp.responseCode == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
        else {
          $('.page-loader-wrapper').hide();
          swal(resp.errors[0]);
        }
      },
        error => {
          $('.page-loader-wrapper').hide();
          if (error.status == 400) {
            swal("Please check the data in excel sheet");
            return false;
          } else {
            swal("Error!", "Internal server error.", "error");
            return false;
          }
        }
      );

    }




  }


  resetfun() {
    this.submitted = false;
    this.uploadtdsform.reset();
    $(".file-path").val("");
  }

  homeClick() {
    this.router.navigate(['dashboard']);
  }
}