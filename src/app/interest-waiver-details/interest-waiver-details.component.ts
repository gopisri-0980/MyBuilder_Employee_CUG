import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonComponent } from 'src/app/common/common.component';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

import { file } from 'jszip';
import * as moment from "moment";
import { Http, RequestOptions, Headers } from '@angular/http';
declare const tinymce: any;

declare const $: any;
declare const swal: any;

@Component({
  selector: 'app-interest-waiver-details',
  templateUrl: './interest-waiver-details.component.html',
  styleUrls: ['./interest-waiver-details.component.sass']
})
export class InterestWaiverDetailsComponent implements OnInit {

  urls = [];
  filename: any;
  filenameval: any;
  filemode: any;
  ortitle: boolean;

  extensiontype: any;
  filetypeurlsplit: any;
  filetypeurlsplit1: any;
  filenamedoc: any;
  filesplitdata: any;
  imgsrc: any;

  fileUrl: any;
  fileName: SafeResourceUrl;
  financialPMileStoneRequests: Array<any> = [];
  interest_waiver: Array<any> = [];
  fileInfos: Array<any> = [];
  milestonedetails: any;

  controller: Array<any> = [];
  previousCRMComments: Array<any> = [];
  customercomments: Array<any> = [];
  paymentSetOffDetails: Array<any> = [];
  financialProjectMileStoneRequests1: Array<any> = [];

  buttontype: string;
  controllerdata: any;
  titlename: string;


  Totalforinterest = 0
  interestamountpaid = 0;
  interestamountdue = 0;
  interestwaiver = 0;
  interest_Waiver_Amount = 0;
  interestWaiverPendingAmount = 0;

  customerdetails: Array<any> = [];

  RequestDate: any;
  ProjectName: any;
  FlatNumber: any;
  customerName: any;
  bookingDate: any;
  crmname: any;
  flatcostdata: any;
  Paid_Amount: any;
  totalPendingAmount: any;
  Current_Waiver_Request: any;
  blockCompletionPercent: any;
  totalPenaltyAmount: any;
  totalPenalityPaidAmount: any;
  interestWaiverAdjAmount: any;

  constructor(private router: Router, private sanitizer: DomSanitizer, private cmn: CommonComponent, private http: Http,) {
    $('.page-loader-wrapper').hide();

    this.milestonedetails = JSON.parse(sessionStorage.getItem("view_transaction_data"));

    this.titlename = sessionStorage.getItem("headtitle");

    console.log(this.titlename);

    this.getMisReceiptChequeData();
  }

  ngOnInit() {
  }

  homeClick(title) {
    console.log(title);

    if (title == "View Customer Data") {
      this.router.navigateByUrl('shortcut-components');
    } else if (title == "Completed Transactions") {
      this.router.navigateByUrl('View-Completed-Transactions');
    } else if (title == "View pending interest waiver status") {
      this.router.navigateByUrl('view-pending-interest-waiver-status');
    } else {
      this.router.navigateByUrl('View-Pending-Transactions-Status');
    }


  }

  getMisReceiptChequeData() {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/viewMisReceiptChequeOnlineData.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "transactionEntryId": this.milestonedetails.transactionEntryId,
      "bookingFormId": this.milestonedetails.bookingFormId,
      "transactionModeName": "" + this.milestonedetails.transactionModeName,
      "operationType": "" + this.milestonedetails.operationType
    }

    console.log(body);

    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      console.log(resp);

      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 200) {

        this.customerdetails = resp.responseObjList.customerPropertyDetailsInfoList;

        this.controllerdata = resp.responseObjList.finTransactionEntryDetailsResponseList[0];
        this.controller = resp.responseObjList.finTransactionEntryDetailsResponseList[0].financialProjectMileStoneResponseList;
        this.previousCRMComments = resp.responseObjList.finTransactionEntryDetailsResponseList[0].finTransactionApprStatResponseList;
        this.customercomments = resp.responseObjList.finTransactionEntryDetailsResponseList[0].finTransactionCommentsResponseList;

        this.RequestDate = this.controllerdata.transactionDate;
        this.ProjectName = this.customerdetails[0].siteName;
        this.FlatNumber = this.customerdetails[0].flatNo;
        this.customerName = this.customerdetails[0].customerName;
        this.bookingDate = this.customerdetails[0].bookingDate;
        this.crmname = this.controllerdata.customerAmountData.crmName;
        this.flatcostdata = this.controllerdata.customerAmountData.flatCost;
        this.Paid_Amount = this.controllerdata.customerAmountData.totalAmountPaid;
        this.totalPendingAmount = this.controllerdata.customerAmountData.totalPendingAmount;
        this.Current_Waiver_Request = this.controllerdata.transactionAmount;
        this.blockCompletionPercent = this.controllerdata.customerAmountData.blockCompletionPercent;


        this.totalPenaltyAmount = resp.responseObjList.finTransactionEntryDetailsResponseList[0].customerAmountData.TotalInterestAmount;
        this.totalPenalityPaidAmount = resp.responseObjList.finTransactionEntryDetailsResponseList[0].customerAmountData.TotalPenalityPaidAmount;
        this.interestWaiverAdjAmount = resp.responseObjList.finTransactionEntryDetailsResponseList[0].customerAmountData.TotalInterestWaiverAdjAmount;

        for (var i = 0; i < this.controller.length; i++) {



          this.Totalforinterest = this.Totalforinterest + parseFloat(this.controller[i].totalPenaltyAmount);

          this.interestamountdue = this.interestamountdue + Number(this.controller[i].totalPendingPenaltyAmount);
          this.interestamountpaid = this.interestamountpaid + Number(this.controller[i].totalPenalityPaidAmount);
          this.interestwaiver = this.interestwaiver + Number(this.controller[i].setOffAmount);
          this.interest_Waiver_Amount = this.interest_Waiver_Amount + Number(this.controller[i].interestWaiverAdjAmount);
          this.interestWaiverPendingAmount = this.interestWaiverPendingAmount + Number(this.controller[i].interestWaiverPendingAmount);

        }

        if (isNaN(this.interest_Waiver_Amount)) {
          this.interest_Waiver_Amount = 0.00;
        }

        if (isNaN(this.interestWaiverPendingAmount)) {
          this.interestWaiverPendingAmount = 0.00;
        }


        setTimeout(function () {
          $(document).ready(function () {
            $('#tableExport').DataTable({
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
              "scrollY": true,
              "scrollCollapse": true,
              "scrollX": true,
              "autoWidth": false,
              "iCookieDuration": 60,

            }).draw();

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
    window.open(link);
  }


}




