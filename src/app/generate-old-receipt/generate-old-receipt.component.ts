import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from "@angular/router";
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { Http, RequestOptions, Headers } from '@angular/http';
import { CommonComponent } from '../common/common.component';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


//import { $ } from 'protractor';
//declare module "XLSX";
declare const swal: any;
var Block_A_TRN_XLSXData3;
declare var $: any;

@Component({
  selector: 'app-generate-old-receipt',
  templateUrl: './generate-old-receipt.component.html',
  styleUrls: ['./generate-old-receipt.component.sass']
})
export class GenerateOldReceiptComponent implements OnInit {

  @ViewChild('content') content: any;
  

  Chequenumbercompare: Array<any> = [];
  closeResult = '';

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
  transactionReceiptDate: any;
  controller: any;
  controllerdata: any;
  
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

      var worksheet = workbook.Sheets[first_sheet_name];

      this.XlSXData = XLSX.utils.sheet_to_json(worksheet, { raw: true, defval: null });

      $(".file-path").val(this.file.name);
    }
    fileReader.readAsArrayBuffer(this.file);


  }
  constructor(private http: Http, private router: Router, public cmn: CommonComponent, private modalService: NgbModal,
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
      // var findDuplicateLeadId = [];
      // for (var i = 0; i < Scheme_XLSXData1.length; i++) {
      //   console.log(Scheme_XLSXData1[i]);
      //   console.log(Scheme_XLSXData1[i].CHEQUE_NUMBER);

      //   findDuplicateLeadId.push(Scheme_XLSXData1[i].CHEQUE_NUMBER);
      // }
      // var findDuplicateLeadIdArray = this.find_duplicate_in_array(findDuplicateLeadId);
      // var StringForLeadId = "";
      // for (var k = 0; k < findDuplicateLeadIdArray.length; k++) {
      //   if (findDuplicateLeadIdArray.length == 1) {
      //     StringForLeadId += findDuplicateLeadIdArray[k];
      //   } else {
      //     if (k == (findDuplicateLeadIdArray.length - 1)) {
      //       StringForLeadId += " and " + findDuplicateLeadIdArray[k];
      //     } else {
      //       StringForLeadId += findDuplicateLeadIdArray[k] + ", ";
      //     }
      //   }
      // }
      // if (findDuplicateLeadIdArray.length > 0) {
      //   swal(StringForLeadId + " these are dupliacate Cheque number's, Please check.");
      //   $('.page-loader-wrapper').hide();
      //   return false;
      // }

      var financialSchemeRequests = [];

      for (var i = 0; i < Scheme_XLSXData1.length; i++) {


        if (new Date(Scheme_XLSXData1[i].Date).getTime() == 0 || new Date(Scheme_XLSXData1[i].Date).getTime() == undefined) {
          swal("Transaction receipt date found empty in line number : " + (i + 2));
          return false;
        }



        if (Scheme_XLSXData1[i].Title == null || Scheme_XLSXData1[i].Title == undefined) {
          swal("Pdf title found empty in line number : " + (i + 2));
          return false;
        }

        if (Scheme_XLSXData1[i].Invoice_No == null || Scheme_XLSXData1[i].Invoice_No == undefined) {
          swal("Transaction Receipt Number found empty in line number : " + (i + 2));
          return false;
        }


        if (Scheme_XLSXData1[i].Flat_No == null || Scheme_XLSXData1[i].Flat_No == undefined) {
          swal("Flst Number found empty in line number : " + (i + 2));
          return false;
        }

        if (Scheme_XLSXData1[i].Project_Name == null || Scheme_XLSXData1[i].Project_Name == undefined) {
          swal("Site Name found empty in line number : " + (i + 2));
          return false;
        }

        if (Scheme_XLSXData1[i].Customer_Name == null || Scheme_XLSXData1[i].Customer_Name == undefined) {
          swal("Customer Names found empty in line number : " + (i + 2));
          return false;
        }

        if (Scheme_XLSXData1[i].Customer_Address == null || Scheme_XLSXData1[i].Customer_Address == undefined) {
          swal("Address found empty in line number : " + (i + 2));
          return false;
        }

        if (Scheme_XLSXData1[i].RERA_No == null || Scheme_XLSXData1[i].RERA_No == undefined) {
          swal("Rera Number found empty in line number : " + (i + 2));
          return false;
        }


        if (Scheme_XLSXData1[i].Place_of_Supply == null || Scheme_XLSXData1[i].Place_of_Supply == undefined) {
          swal("Place Of Supply found empty in line number : " + (i + 2));
          return false;
        }

        if (Scheme_XLSXData1[i].B2C_B2B == null || Scheme_XLSXData1[i].B2C_B2B == undefined) {
          swal("B2C_B2B found empty in line number : " + (i + 2));
          return false;
        }

        if (Scheme_XLSXData1[i].Particulars == null || Scheme_XLSXData1[i].Particulars == undefined) {
          swal("Milestone Name found empty in line number : " + (i + 2));
          return false;
        }

        if (Scheme_XLSXData1[i].SAC == null || Scheme_XLSXData1[i].SAC == undefined) {
          swal("Sac found empty in line number : " + (i + 2));
          return false;
        }

        if (Scheme_XLSXData1[i].Amount == null || Scheme_XLSXData1[i].Amount == undefined) {
          swal("Due Amount Exclude GST found empty in line number : " + (i + 2));
          return false;
        }

        if (Scheme_XLSXData1[i].CGST_Heading == null || Scheme_XLSXData1[i].CGST_Heading == undefined) {
          swal("Cgst Heading found empty in line number : " + (i + 2));
          return false;
        }

        if (Scheme_XLSXData1[i].SGST_Heading == null || Scheme_XLSXData1[i].SGST_Heading == undefined) {
          swal("Sgst Heading found empty in line number : " + (i + 2));
          return false;
        }

        if (Scheme_XLSXData1[i].CGST_amount == null || Scheme_XLSXData1[i].CGST_amount == undefined) {
          swal("Total Cgst Amount found empty in line number : " + (i + 2));
          return false;
        }

        if (Scheme_XLSXData1[i].SGST_amount == null || Scheme_XLSXData1[i].SGST_amount == undefined) {
          swal("Total Sgst Amount found empty in line number : " + (i + 2));
          return false;
        }

        if (Scheme_XLSXData1[i].Total == null || Scheme_XLSXData1[i].Total == undefined) {
          swal("Total Receipt Paid Amount  found empty in line number : " + (i + 2));
          return false;
        }

        if (Scheme_XLSXData1[i].Amount_in_Words == null || Scheme_XLSXData1[i].Amount_in_Words == undefined) {
          swal("MileStone Amount In Words found empty in line number : " + (i + 2));
          return false;
        }



        if (Scheme_XLSXData1[i].sale_owner == null || Scheme_XLSXData1[i].sale_owner == undefined) {
          swal("Flat Sale Owner  found empty in line number : " + (i + 2));
          return false;
        }




        if (Scheme_XLSXData1[i].Company_Name == null || Scheme_XLSXData1[i].Company_Name == undefined) {
          swal("Company Name found empty in line number : " + (i + 2));
          return false;
        }


        if (Scheme_XLSXData1[i].Company_Billing_Address == null || Scheme_XLSXData1[i].Company_Billing_Address == undefined) {
          swal("Company Billing Address found empty in line number : " + (i + 2));
          return false;
        }

        if (Scheme_XLSXData1[i].Telephone_Number == null || Scheme_XLSXData1[i].Telephone_Number == undefined) {
          swal("Company Telephone No found empty in line number : " + (i + 2));
          return false;
        }

        if (Scheme_XLSXData1[i].Company_Email == null || Scheme_XLSXData1[i].Company_Email == undefined) {
          swal("Company Email found empty in line number : " + (i + 2));
          return false;
        }


        if (Scheme_XLSXData1[i].Gstin_Number == null || Scheme_XLSXData1[i].Gstin_Number == undefined) {
          swal("Company Gst in found empty in line number : " + (i + 2));
          return false;
        }




        if (Scheme_XLSXData1[i].Cin_Number == null || Scheme_XLSXData1[i].Cin_Number == undefined) {

          if (Scheme_XLSXData1[i].LLPIN_number == null || Scheme_XLSXData1[i].LLPIN_number == undefined) {
            swal("Company Llp in found empty in line number : " + (i + 2));
            return false;
          }


        }


        if (Scheme_XLSXData1[i].LLPIN_number == null || Scheme_XLSXData1[i].LLPIN_number == undefined) {

          if (Scheme_XLSXData1[i].Cin_Number == null || Scheme_XLSXData1[i].Cin_Number == undefined) {
            swal("Company Cin found empty in line number : " + (i + 2));
            return false;
          }


        }





        if (Scheme_XLSXData1[i].PAN_Number == null || Scheme_XLSXData1[i].PAN_Number == undefined) {
          swal("Company Pan Number found empty in line number : " + (i + 2));
          return false;
        }

        if (Scheme_XLSXData1[i].Website == null || Scheme_XLSXData1[i].Website == undefined) {
          swal("Company Website found empty in line number : " + (i + 2));
          return false;
        }

        if (Scheme_XLSXData1[i].Thanking_You == null || Scheme_XLSXData1[i].Thanking_You == undefined) {
          swal("Thanks And Regards From found empty in line number : " + (i + 2));
          return false;
        }



        if (new Date(Scheme_XLSXData1[i].Date).getTime() == 0 || new Date(Scheme_XLSXData1[i].Date).getTime() == undefined) {
          this.transactionReceiptDate = null;
        } else {

          var d = new Date(Scheme_XLSXData1[i].Date);
          d.setDate(d.getDate() + 1);
          var datestring =  ("0" + d.getDate()).slice(-2) + "/" + ("0"+(d.getMonth()+1)).slice(-2) + "/" +
          d.getFullYear();

         

          this.transactionReceiptDate = datestring;
        }


        $('.page-loader-wrapper').show();
        var demandNoteTransactionRequests =
        {
          "transactionReceiptDate": this.transactionReceiptDate,
          "pdfTitle": Scheme_XLSXData1[i].Title,
          "transactionReceiptNo": Scheme_XLSXData1[i].Invoice_No,
          "flatNo": Scheme_XLSXData1[i].Flat_No,
          "siteName": Scheme_XLSXData1[i].Project_Name,
          "customerNames": Scheme_XLSXData1[i].Customer_Name,
          "address": Scheme_XLSXData1[i].Customer_Address,
          "reraNo": Scheme_XLSXData1[i].RERA_No,
          "placeOfSupply": Scheme_XLSXData1[i].Place_of_Supply,
          "b2C_B2B": Scheme_XLSXData1[i].B2C_B2B,
          "milestoneName": Scheme_XLSXData1[i].Particulars,
          "sac": Scheme_XLSXData1[i].SAC,
          "dueAmountExcludeGST": new Intl.NumberFormat('en-IN').format(Scheme_XLSXData1[i].Amount),
          "cgstHeading": Scheme_XLSXData1[i].CGST_Heading,
          "sgstHeading": Scheme_XLSXData1[i].SGST_Heading,
          "totalCgstAmount": new Intl.NumberFormat('en-IN').format(Scheme_XLSXData1[i].CGST_amount),
          "totalSgstAmount": new Intl.NumberFormat('en-IN').format(Scheme_XLSXData1[i].SGST_amount),
          "totalReceiptPaidAmount": new Intl.NumberFormat('en-IN').format(Scheme_XLSXData1[i].Total),
          "mileStoneAmountInWords": Scheme_XLSXData1[i].Amount_in_Words,
          "flatSaleOwner": Scheme_XLSXData1[i].sale_owner,
          "companyName": Scheme_XLSXData1[i].Company_Name,
          "companyBillingAddress": Scheme_XLSXData1[i].Company_Billing_Address,
          "companyTelephoneNo": Scheme_XLSXData1[i].Telephone_Number,
          "companyEmail": Scheme_XLSXData1[i].Company_Email,
          "companyGstin": Scheme_XLSXData1[i].Gstin_Number,
          "companyCin": Scheme_XLSXData1[i].Cin_Number,
          "companyLlpin": Scheme_XLSXData1[i].LLPIN_number,
          "companyPanNumber": Scheme_XLSXData1[i].PAN_Number,
          "companyWebsite": Scheme_XLSXData1[i].Website,
          "thanksAndRegardsFrom": Scheme_XLSXData1[i].Thanking_You,

        }

        financialSchemeRequests.push(demandNoteTransactionRequests);
     

      }

      console.log(financialSchemeRequests);


      // for (var i = 0; i < financialSchemeRequests.length; i++) {
      //   if (financialSchemeRequests[i].some(item => item.chequeNumber == Scheme_XLSXData1[i].CHEQUE_NUMBER) == true) {
      //     swal("Cheque number found duplicate in line number : " + (i + 2));
      //     return false;
      //   }
      // }

     
      let url = this.cmn.commonUrl + "financial/uploadFinancialTransaction.spring";
      
      var body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "financialUploadDataRequests": financialSchemeRequests,
      };

      console.log(url);
     console.log(JSON.stringify(body));

      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
     
       console.log(JSON.stringify(resp));
        $('.page-loader-wrapper').hide();
        if (resp.responseCode == 200) {
          $("#files").val("");
          $('.page-loader-wrapper').hide();
          //swal("PDF files(s) generated successfully!");
          

          this.controller = resp.responseObjList[0].filePath;
          this.controllerdata = resp.responseObjList[0].fileType;
         

          if (Number(this.controllerdata) < 30) {
           // swal("PDF files(s) generated successfully!");
            swal({ title: "PDF files(s) generated successfully!" },
            function () {
              location.reload();
            }
          );
          window.open( resp.responseObjList[0].url);
            return false;
          } else {

            this.open();
          }

         
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
          return false;
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

  downloadlinkfun(){
      window.open(this.controller, '_blank').focus();
  }

  open() {
    this.modalService.open(this.content, { backdrop: 'static', size: 'lg', keyboard: false, centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


}


