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

var body;
@Component({
  selector: 'app-view-intrestwalverdetailsofapprove',
  templateUrl: './view-intrestwalverdetailsofapprove.component.html',
  styleUrls: ['./view-intrestwalverdetailsofapprove.component.sass']
})
export class ViewIntrestwalverdetailsofapproveComponent implements OnInit {
  pageIndex: number;
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
  depID: string;
  roleID: string;
  transactionEntryId: any;
  bookingFormId: any;
  transactionModeName: any;
  operationType: any;
  loaderhideme: boolean = true;
  Flat_ID: any;
  description: any;
  approvedList_data: Array<any> = [];
  responsecode: any;
  totalPenaltyAmount: any;
  totalPenalityPaidAmount: any;
  interestWaiverAdjAmount: any;
  tickettotaldetailsresponse: any;
  totalcontroldata: any;
  ticketdetailsresponse: any;
  totalcontroller: string;
  viewTransactionData: string;

  constructor(private router: Router, private sanitizer: DomSanitizer, private cmn: CommonComponent, private http: Http,) {
    $('.page-loader-wrapper').hide();

    this.milestonedetails = JSON.parse(sessionStorage.getItem("view_transaction_data"));

    this.totalcontroldata = JSON.parse(sessionStorage.getItem("totalcontroldata"));
    if (this.milestonedetails != null) {
      this.transactionEntryId = this.milestonedetails.transactionEntryId;
      this.bookingFormId = this.milestonedetails.bookingFormId;
      this.transactionModeName = this.milestonedetails.transactionModeName;
      this.operationType = this.milestonedetails.operationType;

      this.tickettotaldetailsresponse = this.milestonedetails;
      for (var i = 0; i < this.totalcontroldata.length; i++) {
        if (this.totalcontroldata[i].transactionEntryId == this.tickettotaldetailsresponse.transactionEntryId) {
          this.pageIndex = i;
        }
      }

      this.getMisReceiptChequeData(this.transactionEntryId, this.bookingFormId, this.transactionModeName, this.operationType);

    } else {
      this.transactionEntryId = sessionStorage.getItem("transactionEntryId");
      this.bookingFormId = sessionStorage.getItem("bookingFormId");
      this.transactionModeName = sessionStorage.getItem("transactionModeName");
      this.operationType = sessionStorage.getItem("redirectUrl");
      this.getMisReceiptChequeData(this.transactionEntryId, this.bookingFormId, this.transactionModeName, this.operationType);

    }


  }

  ngOnInit() {
    $(function(){
      $(".mat-paginator-page-size").css("display","none")
    })
    
    var nValFromSession = sessionStorage.getItem("nval");
    if (nValFromSession == "1") {
      window.location.reload();
      sessionStorage.setItem("nval", "2");
    } else {
      $('.page-loader-wrapper').hide();
    }

    $('.page-loader-wrapper').hide();
    this.depID = sessionStorage.getItem("session_deptid")
    this.roleID = sessionStorage.getItem("session_roleId")
    console.log("Department id " + this.depID);
  }



  getServerData(event) {
    var json_response;
    var json_totalticketresponse;
    json_response = this.totalcontroldata[event.pageIndex];
    console.log(json_response);

    this.transactionEntryId = json_response.transactionEntryId;
    this.bookingFormId = json_response.bookingFormId;
    this.transactionModeName = json_response.transactionModeName;
    this.operationType = json_response.operationType;

    console.log(this.transactionEntryId);
    console.log(this.bookingFormId);
    console.log(this.transactionModeName);
    console.log(this.operationType);


    this.ticketdetailsresponse = json_response;
    json_totalticketresponse = eval('(' + sessionStorage.getItem('totalcontroldata') + ')');
    for (var i = 0; i < json_totalticketresponse.length; i++) {
      if (json_totalticketresponse[i].transactionEntryId == this.ticketdetailsresponse.transactionEntryId) {
        this.pageIndex = i;
      }
    }


    this.getMisReceiptChequeData(this.transactionEntryId, this.bookingFormId, this.transactionModeName, this.operationType);

  }


  homeClick() {
    this.router.navigateByUrl('approve-interest-waiver');
  }

  getMisReceiptChequeData(transactionEntryId, bookingFormId, transactionModeName, operationType) {
    $('.page-loader-wrapper').show();
    this.loaderhideme = true;
    let url = this.cmn.commonUrl + "financial/viewMisReceiptChequeOnlineData.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    if (this.milestonedetails != null) {
      body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "transactionEntryId": transactionEntryId,
        "bookingFormId": bookingFormId,
        "transactionModeName": "" + transactionModeName,
        "operationType": "" + operationType
      }
    } else {
      body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "transactionEntryId": transactionEntryId,
        "bookingFormId": bookingFormId,
        "transactionModeName": "" + transactionModeName,
        "operationType": "" + operationType,
        "requestUrl": sessionStorage.getItem("requestUrl"),
        "empIdFromUrl": sessionStorage.getItem("Url_empId")
      }
    }

    console.log(url);
    console.log(JSON.stringify(body));
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      console.log(resp);
      this.loaderhideme = false;

      $('#tableExport').DataTable().destroy();
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {

        this.Totalforinterest = 0
        this.interestamountpaid = 0;
        this.interestamountdue = 0;
        this.interestwaiver = 0;
        this.interest_Waiver_Amount = 0;
        this.interestWaiverPendingAmount = 0;


        this.controller = [];
        this.controllerdata = {};
        this.customerdetails = resp.responseObjList.customerPropertyDetailsInfoList;
        this.controllerdata = resp.responseObjList.finTransactionEntryDetailsResponseList[0];
        console.log(this.controllerdata);
        this.controller = resp.responseObjList.finTransactionEntryDetailsResponseList[0].financialProjectMileStoneResponseList;
        this.previousCRMComments = resp.responseObjList.finTransactionEntryDetailsResponseList[0].finTransactionApprStatResponseList;
        this.customercomments = resp.responseObjList.finTransactionEntryDetailsResponseList[0].finTransactionCommentsResponseList;

        this.RequestDate = this.controllerdata.transactionDate;
        this.ProjectName = this.customerdetails[0].siteName;
        this.FlatNumber = this.customerdetails[0].flatNo;

        this.Flat_ID = this.customerdetails[0].flatId;

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
          console.log(this.controller);
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

      } else if (resp.responseCode == 406) {

        console.log(resp);
        this.approvedList_data = [];
        this.responsecode = resp.responseCode;

        this.description = resp.errors[0];
        console.log(this.description);
        this.approvedList_data = resp.responseObjList.responseObjList.finTransactionEntryResponseList;
        console.log(this.approvedList_data);

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

  Approvefun(usertype) {



    for (var i = 0; i < this.controllerdata.finTransactionSetOffResponseList.length; i++) {
      this.paymentSetOffDetails.push(
        {
          "finTransactionSetOffId": this.controllerdata.finTransactionSetOffResponseList[i].finTransactionSetOffId,
          "setOffTypeName": this.controllerdata.finTransactionSetOffResponseList[i].setOffTypeName,
          "amount": this.controllerdata.finTransactionSetOffResponseList[i].setOffAmount,
          "invoiceNo": this.controllerdata.finTransactionSetOffResponseList[i].finBokAccInvoiceNo
        });

    }
    for (var i = 0; i < this.controller.length; i++) {
      this.financialProjectMileStoneRequests1.push({
        "projectMilestoneId": this.controller[i].projectMilestoneId,
        "finBookingFormMilestonesId": this.controller[i].finBokFomDmdNoteId,
        "milestoneName": this.controller[i].milestoneName,
        "mileStonePercentage": this.controller[i].mileStonePercentage,
        "milestoneDate": this.controller[i].milestoneDate,
        "mileStoneDueDate": this.controller[i].mileStoneDueDate,
        "mileStoneNo": this.controller[i].mileStoneNo,
        "demandNoteDate": this.controller[i].demandNoteDate,
        "setOffAmount": this.controller[i].setOffAmount,
      })

    }

    if (usertype == 'Approve') {
      this.buttontype = 'Approve';

    } else if (usertype == 'Reject') {
      this.buttontype = 'Reject';
    }


    $(".page-loader-wrapper").show();
    var url = this.cmn.commonUrl + "financial/approveOrRejectMisReceiptOrPayment.spring";
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });

    console.log(this.milestonedetails);

    if (this.milestonedetails != null) {
      body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "siteId": this.controllerdata.siteId,
        "portNumber": "",
        "empId": "",
        "siteName": this.controllerdata.siteName,
        "transactionTypeId": this.controllerdata.transactionTypeId,
        "transactionModeId": this.controllerdata.transactionModeId,
        "transactionTypeName": this.controllerdata.transactionTypeName,
        "transactionModeName": this.controllerdata.transactionModeName,
        "transactionDate": this.controllerdata.transactionDate,
        "transactionAmount": this.controllerdata.transactionAmount,
        "flatIds": [this.Flat_ID],
        "bookingFormId": this.controllerdata.bookingFormId,
        "paymentSetOffDetails": this.paymentSetOffDetails,
        "financialProjectMileStoneRequests": this.financialProjectMileStoneRequests1,
        "buttonType": this.buttontype,
        "actualTransactionRequest": {
          "siteId": this.controllerdata.siteId,
          "siteName": this.controllerdata.siteName,
          "transactionTypeId": this.controllerdata.transactionTypeId,
          "transactionModeId": this.controllerdata.transactionModeId,
          "transactionTypeName": this.controllerdata.transactionTypeName,
          "transactionModeName": this.controllerdata.transactionModeName,
          "flatIds": [this.Flat_ID],
          "bookingFormId": this.controllerdata.bookingFormId,
          "transactionAmount": this.controllerdata.transactionAmount,
        },
        "transactionEntryId": this.controllerdata.transactionEntryId,
        "transactionSetOffEntryId": this.controllerdata.transactionSetOffEntryId,
        "comment": $("#Comments").val(),
        "transactionReceiptNo": this.controllerdata.transactionReceiptNo,
      }
    } else {

      body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "siteId": this.controllerdata.siteId,
        "portNumber": "",
        "empId": "",
        "siteName": this.controllerdata.siteName,
        "transactionTypeId": this.controllerdata.transactionTypeId,
        "transactionModeId": this.controllerdata.transactionModeId,
        "transactionTypeName": this.controllerdata.transactionTypeName,
        "transactionModeName": this.controllerdata.transactionModeName,
        "transactionDate": this.controllerdata.transactionDate,
        "transactionAmount": this.controllerdata.transactionAmount,
        "flatIds": [this.Flat_ID],
        "bookingFormId": this.controllerdata.bookingFormId,
        "paymentSetOffDetails": this.paymentSetOffDetails,
        "financialProjectMileStoneRequests": this.financialProjectMileStoneRequests1,
        "buttonType": this.buttontype,
        "actualTransactionRequest": {
          "siteId": this.controllerdata.siteId,
          "siteName": this.controllerdata.siteName,
          "transactionTypeId": this.controllerdata.transactionTypeId,
          "transactionModeId": this.controllerdata.transactionModeId,
          "transactionTypeName": this.controllerdata.transactionTypeName,
          "transactionModeName": this.controllerdata.transactionModeName,
          "flatIds": [this.Flat_ID],
          "bookingFormId": this.controllerdata.bookingFormId,
          "transactionAmount": this.controllerdata.transactionAmount,
        },
        "transactionEntryId": this.controllerdata.transactionEntryId,
        "transactionSetOffEntryId": this.controllerdata.transactionSetOffEntryId,
        "comment": $("#Comments").val(),
        "transactionReceiptNo": this.controllerdata.transactionReceiptNo,
        "requestUrl": sessionStorage.getItem("requestUrl"),
        "empIdFromUrl": sessionStorage.getItem("Url_empId")
      }

    }




    console.log(JSON.stringify(body));


    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      console.log(JSON.stringify(resp));

      $(".page-loader-wrapper").hide();

      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        if (resp.responseObjList !== null) {
          swal("Interest waiver " + this.buttontype + " successfully");
          // swal({ title: "Interest waiver " + this.buttontype + " successfully" },

          //   function () {
          //     // location.reload();

          //   }
          // );

          console.log(this.pageIndex);
          this.getdetails();
          // this.router.navigateByUrl('approve-interest-waiver');
        }
      } else if (resp.responseCode == 440) {
        $('.page-loader-wrapper').hide();
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
      }

    }, error => {
      $('.page-loader-wrapper').hide();
      console.log(error);
      var error = JSON.parse(error._body).responseCode;
      if (error == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      }


    });
  }


  getdetails() {
    console.log(this.pageIndex);

    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/viewInterestWaiverPendingTransactions.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body;
    body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "condition": "approveTransaction",
      "actionUrl": "Interest Waiver",
      "siteIds": [],
      "bookingFormIds": [],
      "fromDate": null,
      "toDate": null
    }

    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      console.log(resp);
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        console.log(this.pageIndex);
        if (resp.responseObjList.finTransactionEntryResponseList.length == 0) {
          this.router.navigateByUrl('approve-interest-waiver');
        } else {


          this.totalcontroller = JSON.stringify(resp.responseObjList.finTransactionEntryResponseList);
          sessionStorage.setItem("totalcontroldata", this.totalcontroller);


          if (this.pageIndex == resp.responseObjList.finTransactionEntryResponseList.length) {

            this.viewTransactionData = JSON.stringify(resp.responseObjList.finTransactionEntryResponseList[this.pageIndex - 1]);

            console.log(this.viewTransactionData);
            sessionStorage.setItem('view_transaction_data', this.viewTransactionData);
            setTimeout(() => {
              location.reload();
            }, 700);
          } else {

            this.viewTransactionData = JSON.stringify(resp.responseObjList.finTransactionEntryResponseList[this.pageIndex]);

            console.log(this.viewTransactionData);
            sessionStorage.setItem('view_transaction_data', this.viewTransactionData);

            setTimeout(() => {
              location.reload();
            }, 700);
          }

        }



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
}



