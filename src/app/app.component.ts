import { Component, OnDestroy, OnInit } from '@angular/core';
import { Event, Router, NavigationStart, NavigationEnd, RouterEvent } from '@angular/router';
import { Http, RequestOptions, Headers } from '@angular/http';
import { PlatformLocation } from '@angular/common'
import { NgxSpinnerService } from 'ngx-spinner';
import { UUID } from 'angular2-uuid';
import { CommonComponent } from '../app/common/common.component';
import { UnreadmessagesService } from './unreadmessages.service';
//import { browser } from 'protractor';


import { ProductService } from './product.service';
import { interval, Subscription } from 'rxjs';
declare const $: any;
declare const swal: any

var ims_project_status;
var ims_selected_projectid;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [UnreadmessagesService],
})
export class AppComponent implements OnInit, OnDestroy {


  mySubscription: Subscription;

  currentUrl: string;
  accontsdept: boolean;
  ticketing: boolean;
  viewinforequest: boolean;
  viewalltickets: boolean;
  viewmytickets: boolean;
  employee_name: any;
  employee_designation: any;
  escalationTime: boolean;
  escalationTickets: boolean;
  menu_array: any;
  desigName: void;
  deptName: void;
  deptNamee: string;
  desigNamee: string;
  menu_array1: any;
  sessionkeyPresence: string;
  isSessionKey: boolean;
  chartcount: string;
  unviewedChatCount: any;
  messengerIds: Array<any> = [];
  totalcount: any;
  ledgerData: Array<any> = [];

  subscription: Subscription;
  number: { text: any; };
  chart_number: { text: any; };
  complaint_number: { text: any; };
  appointment_number: { text: any; };
  term: any = "";
  mytemparray: any = [];
  Escalation_Tickets: { text: any; };
  View_Notifications_For_Approvals: { text: any; };
  Ticketing_Module: { text: any; };
  Appointments_Module: { text: any; };
  Project_Module: { text: any; };
  constructor(private uid: UUID, private router: Router, private spinner: NgxSpinnerService, private _router: Router,
    private service: UnreadmessagesService, location: PlatformLocation, private http: Http,
    private cmn: CommonComponent, private productService: ProductService) {

    sessionStorage.removeItem("startdatedata");
    sessionStorage.removeItem("endDatedata");
    sessionStorage.removeItem('Monthlyreport');
    sessionStorage.removeItem('Feedbackreport1');
    sessionStorage.removeItem('Ticketaveragetimeside');
    sessionStorage.removeItem("Ticketprojectwisereport");
    sessionStorage.removeItem("flatiddata");

    sessionStorage.removeItem("sitenamevalue");
    sessionStorage.removeItem("this.ratingvalue");
    sessionStorage.removeItem("categoryname");
    sessionStorage.removeItem("pagecustomerName");
    sessionStorage.removeItem("employeeIds");
    sessionStorage.removeItem("Escalationlevelempid");




    sessionStorage.removeItem("Fromdate");
    sessionStorage.removeItem("toDate");
    sessionStorage.removeItem("Siteid");
    sessionStorage.removeItem("Siteids");
    sessionStorage.removeItem("flatId_Id");
    sessionStorage.removeItem("flatbooking_Id");
    sessionStorage.removeItem("TitleName");
    sessionStorage.removeItem("selected_flatid");




    sessionStorage.removeItem("backflatid");
    sessionStorage.removeItem("backfromdate");
    sessionStorage.removeItem("backtodate");
    sessionStorage.removeItem("backemployeeIds");
    sessionStorage.removeItem("Blocknameid");
    sessionStorage.removeItem("Floorname");
    sessionStorage.removeItem("customerbookingid");
    sessionStorage.removeItem("subjectwisesearch");
    sessionStorage.removeItem("sitenamevalue");



    sessionStorage.removeItem("ticketing");
    sessionStorage.removeItem('currentPageNo')
    sessionStorage.removeItem("SiteIdList");
    sessionStorage.removeItem("PagesearchsiteIds");
    sessionStorage.removeItem("pagecustomernumber");
    sessionStorage.removeItem("PageTicketnumber");
    sessionStorage.removeItem("startdate");
    sessionStorage.removeItem("enddate");


    sessionStorage.removeItem("projectname");
    sessionStorage.removeItem("BlockIdname");
    sessionStorage.removeItem("floorIDname");
    sessionStorage.removeItem("flatIDname");


    sessionStorage.removeItem("site_idd");
    sessionStorage.removeItem("PendingDepartment");
    sessionStorage.removeItem("fromdatee_val");
    sessionStorage.removeItem("todatee_val");
    sessionStorage.removeItem("Ticket_number");
    sessionStorage.removeItem("flatbooking_Id");
    sessionStorage.removeItem("PendingDepartment_type");
    sessionStorage.removeItem("Backbuttonfunction");
    sessionStorage.removeItem("status_dropdown");





    // sessionStorage.removeItem("Transaction_type");
    // sessionStorage.removeItem("Transaction_Mode");
    // sessionStorage.removeItem("Transaction_set_off");
    // sessionStorage.removeItem("Transaction_bank_account");
    // sessionStorage.removeItem("Project_back_Id");
    // sessionStorage.removeItem("view_pending_approval_status");













    var self = this;
    $(function () {



      $("#ims_select_event").select2({
        placeholder: "Search",
        dir: "ltl"
      });

      $("#searchId").select2({
        placeholder: "Search Module",
        dir: "ltl"
      });



      $('#ims_select_event').change(function (e) {

        console.log($(e.target).val());
        console.log(sessionStorage.getItem("sumadhuraEmpId"));
        console.log(sessionStorage.getItem("session_siteId"));

        ims_project_status = $(e.target).val().split("-")[0];
        ims_selected_projectid = $(e.target).val().split("-")[1];

        console.log(ims_project_status);
        console.log(ims_selected_projectid);

        // window.open($(e.target).val(), '_blank');

        $('<form action=' + ims_project_status + ' id = "djdsjd" method="POST"> <input type="hidden" name="empId" value=' + sessionStorage.getItem("sumadhuraEmpId") + '>'
          + '<input type="hidden" name="site_id" value=' + ims_selected_projectid + '>'
          + '<input type="hidden" name="portalName" value="amsapps">'
          + '<input type="hidden" name="requestUrl" value="multiplePortalLogins">'
          + '</form>')
          .appendTo('body');
        $("#djdsjd").submit();




      });


      $('#searchId').change(function (e) {
        var searchval = $(e.target).val();
        if ($(e.target).val() == "select") {
        } else {
          self.myfunction(searchval)
        }
      });



      $(".slimScrollBar").css({ 'display': 'block' });
      $(".slimScrollBar").css("width", "12px")
      $(".menu-toggle").click(function () {
        $(".myactiveclass").removeClass("activeClick");
        $(this).addClass("activeClick");
      })
      $('.myactiveclass').click(function () {
        //  sessionStorage.setItem("Clear_transaction_TitleName",null)
        sessionStorage.setItem("for_fromdate_bind", null)
        sessionStorage.setItem("for_todate_bind", null)
        sessionStorage.setItem('view_clreared_transaction_data', null);
        sessionStorage.setItem('view_pending_transaction_data', null);
        sessionStorage.setItem('view_suspense_transaction_data', null);



        sessionStorage.setItem("site_idd_Notif", null)
        $(".myactiveclass").removeClass("activeClick");
        $(this).addClass("activeClick");
      });
      // var urlLink=window.location.href;
      // $('.myactiveclass').each(function(){
      //   var routerLink=$(this).attr("id");
      //   if(urlLink.match(routerLink)){
      //     $(this).addClass("activeClick");
      //   }
      // })
    })

    this._router.events.subscribe((routerEvent: Event) => {

      if (routerEvent instanceof NavigationStart) {
        // this.showLoadingIndicatior = true;
        location.onPopState(() => {
        });

        this.currentUrl = routerEvent.url.substring(routerEvent.url.lastIndexOf('/') + 1);
        this.deptNamee = sessionStorage.getItem("session_deptName");
        this.desigNamee = sessionStorage.getItem("session_desigName");
        this.menu_array1 = eval('(' + sessionStorage.getItem('loginresponse') + ')');
      }


      if (this.currentUrl == "View-Closed-Complaints" || this.currentUrl == "Complaints-view-details") {

      } else {
        sessionStorage.removeItem("complaint");
        sessionStorage.removeItem('complaint_currentPageNo')
        sessionStorage.removeItem("complaint_SiteIdList");
        sessionStorage.removeItem("complaint_PagesearchsiteIds");
        sessionStorage.removeItem("complaint_pagecustomernumber");
        sessionStorage.removeItem("complaint_PageTicketnumber");
        sessionStorage.removeItem("complaint_startdate");
        sessionStorage.removeItem("complaint_enddate");
        sessionStorage.removeItem("complaint_flatbookingId");

      }

      if (this.currentUrl == "reference" || this.currentUrl == "view-refer-data") {

      } else {
        sessionStorage.removeItem("referee_name");
        sessionStorage.removeItem("reference_Id");
        sessionStorage.removeItem("flatbookId");
        sessionStorage.removeItem("customer_flatno");
        sessionStorage.removeItem("customer_flatno_binding");
        sessionStorage.removeItem("customer_name");
        sessionStorage.removeItem("fromdate");
        sessionStorage.removeItem("todate");
        sessionStorage.removeItem("ref_project_ID");
        sessionStorage.removeItem("backbuttonStatus");
      }




      if (this.currentUrl == "View-My-Complaints" || this.currentUrl == "Complaints-view-details" || this.currentUrl == "tickets-view-details") {

      } else {
        sessionStorage.removeItem("complaint_site_idd");
        sessionStorage.removeItem("complaint_PendingDepartment");
        sessionStorage.removeItem("complaint_fromdatee_val");
        sessionStorage.removeItem("complaint_todatee_val");
        sessionStorage.removeItem("complaint_Ticket_number");
        sessionStorage.removeItem("complaint_flatbooking_Id");
        sessionStorage.removeItem("complaint_PendingDepartment_type");
        sessionStorage.removeItem("complaint_Backbuttonfunction");
        sessionStorage.removeItem("complaint_raisedby");
      }

      if (this.currentUrl == "ProjectWise_Escalation_Report" || this.currentUrl == "Escalation-Tickets" || this.currentUrl == "View-Tickets" || this.currentUrl == "Ticket-Details") {

      } else {
        sessionStorage.removeItem("select_project_id");
        sessionStorage.removeItem("start_date_data");
        sessionStorage.removeItem("end_Date_data");
      }

      if (this.currentUrl == "reference" || this.currentUrl == "view-refer-data") {

      } else {

        sessionStorage.removeItem("referee_name")
        sessionStorage.removeItem("reference_Id")
        sessionStorage.removeItem("flatbookId")
        sessionStorage.removeItem("customer_flatno")
        sessionStorage.removeItem("project_ID")
        sessionStorage.removeItem("backbuttonStatus")
        sessionStorage.removeItem("fromdate")
        sessionStorage.removeItem("todate")
        sessionStorage.removeItem("customer_flatno_binding")
        sessionStorage.removeItem("customer_name")
      }

     

    

      if (this.currentUrl == "view-customers" || this.currentUrl == "approvebooking?id=Update%20Booking"){
        
      } else {
        sessionStorage.removeItem("prjctIDSeesion")
        sessionStorage.removeItem("statusIDSeesion")
        sessionStorage.removeItem("startdate_approve")
        sessionStorage.removeItem("enddate_approve")
        sessionStorage.removeItem("block_wise_list")
        sessionStorage.removeItem("sales_owner_wise_list")
        sessionStorage.removeItem("block_array")
        sessionStorage.removeItem("sales_array")
        sessionStorage.removeItem("fromviewpagepredefined")
      }

      if (this.currentUrl == "approve-interest-waiver" || this.currentUrl == "View_Interest_waiver") {

      } else {

        sessionStorage.removeItem("view_interest_waiver_status");
        sessionStorage.removeItem("view_interest_waiver_siteid");
        sessionStorage.removeItem("view_interest_waiver_customername");
        sessionStorage.removeItem("view_interest_waiver_fromdate");
        sessionStorage.removeItem("view_interest_waiver_todate");
      }





      if (this.currentUrl == "modify-transaction" || this.currentUrl == "Accounts-Receipt-Cheque"
        || this.currentUrl == "crm-receipt-cheque-view" || this.currentUrl == "modify-crm-receipt-cheque-view"
        || this.currentUrl == "view-crm-receipt-online" || this.currentUrl == "modify-crm-receipt-online-view"
        || this.currentUrl == "crm-receipt-payment-view" || this.currentUrl == "Payment-Cheque" || this.currentUrl == "Payment-Cheque"
        || this.currentUrl == "interestwaiver-details") {

      } else {
        sessionStorage.removeItem("Modi_transaction_type");
        sessionStorage.removeItem("Modi_transaction_mode");
      }


      if (this.currentUrl == "View-Pending-Transactions-Status" || this.currentUrl == "Accounts-Receipt-Cheque"
        || this.currentUrl == "crm-receipt-cheque-view" || this.currentUrl == "Receipt-Cheque"
        || this.currentUrl == "view-crm-receipt-online" || this.currentUrl == "Receipt-Online"
        || this.currentUrl == "crm-receipt-payment-view" || this.currentUrl == "Payment-Cheque" || this.currentUrl == "Approve_Waive-Off"
        || this.currentUrl == "interestwaiver-details") {

      } else {
        sessionStorage.removeItem("back_Status");
        sessionStorage.removeItem("back_trasactionfrom_date");
        sessionStorage.removeItem("back_trasactionto_date");
        sessionStorage.removeItem("back_receivedfrom_date");
        sessionStorage.removeItem("back_receivedto_date");
        sessionStorage.removeItem("back_setoff_type");
        sessionStorage.removeItem("back_pendingat");
        sessionStorage.removeItem("back_selected_projectid");
        sessionStorage.removeItem("back_site_ac_number");
        sessionStorage.removeItem("site_ac_name");
        sessionStorage.removeItem("view_pending_transaction_status");

        sessionStorage.removeItem("transaction_type_name");
        sessionStorage.removeItem("transaction_mode_name");


      }


      if (this.currentUrl == "view-pending-interest-waiver-status"

        || this.currentUrl == "interestwaiver-details") {

      } else {
        sessionStorage.removeItem("interest_back_Status");
        sessionStorage.removeItem("interest_back_trasactionfrom_date");
        sessionStorage.removeItem("interest_back_trasactionto_date");
        sessionStorage.removeItem("interest_back_receivedfrom_date");
        sessionStorage.removeItem("interest_back_receivedto_date");
        sessionStorage.removeItem("interest_back_setoff_type");
        sessionStorage.removeItem("interest_back_pendingat");
        sessionStorage.removeItem("interest_back_selected_projectid");
        sessionStorage.removeItem("interest_back_site_ac_number");
        sessionStorage.removeItem("interest_site_ac_name");
        sessionStorage.removeItem("interest_view_pending_transaction_status");

        sessionStorage.removeItem("interest_transaction_type_name");
        sessionStorage.removeItem("interest_transaction_mode_name");


      }



      if (this.currentUrl == "View-Pending-Transactions" || this.currentUrl == "Receipt-Cheque"
        || this.currentUrl == "Receipt-Online" || this.currentUrl == "Payment-Cheque"
        || this.currentUrl == "receipt-online-edit" || this.currentUrl == "Receipt-Online"
        || this.currentUrl == "View_Interest_waiver" || this.currentUrl == "Approve_Waive-Off") {

      } else {
        sessionStorage.removeItem("Transaction_type");
        sessionStorage.removeItem("Transaction_Mode");
        sessionStorage.removeItem("Transaction_set_off");
        sessionStorage.removeItem("Transaction_bank_account");
        sessionStorage.removeItem("Project_back_Id");
        sessionStorage.removeItem("view_pending_approval_status");

      }


      if (this.currentUrl == "uncleared-cheque-list" || this.currentUrl == "Accounts-Receipt-Cheque"
        || this.currentUrl == "crm-receipt-cheque-view" || this.currentUrl == "Receipt-Cheque"
        || this.currentUrl == "view-crm-receipt-online" || this.currentUrl == "Receipt-Online"
        || this.currentUrl == "Payment-Cheque" || this.currentUrl == "accounts-payment-cheque") {

      } else {
        sessionStorage.removeItem("un_Transaction_type");
        sessionStorage.removeItem("un_Transaction_Mode");
        sessionStorage.removeItem("un_Transaction_set_off");
        sessionStorage.removeItem("un_Transaction_bank_account");
        sessionStorage.removeItem("un_Project_back_Id");
        sessionStorage.removeItem("un_view_pending_approval_status");

      }




      if (this.currentUrl == "View-Completed-Transactions" || this.currentUrl == "Accounts-Receipt-Cheque"
        || this.currentUrl == "receipt-cheque-edit" || this.currentUrl == "Receipt-Cheque" || this.currentUrl == "receipt_tds_view"
        || this.currentUrl == "receipt-online-edit" || this.currentUrl == "Receipt-Online" || this.currentUrl == "Approve_Waive-Off"
        || this.currentUrl == "payment-cheque-edit" || this.currentUrl == "Payment-Cheque"
        || this.currentUrl == "payment-cheque-edit" || this.currentUrl == "interestwaiver-details") {

      } else {
        sessionStorage.removeItem("complete_back_Siteids");
        sessionStorage.removeItem("complete_back_flatId_Id");
        sessionStorage.removeItem("complete_back_setofftypeId");
        sessionStorage.removeItem("complete_back_transactiontypeId");

        sessionStorage.removeItem("complete_back_Transaction_Mode");


        sessionStorage.removeItem("complete_back_fromdate");
        sessionStorage.removeItem("complete_back_todate");
        sessionStorage.removeItem("complete_back_clearanceFromDate");
        sessionStorage.removeItem("complete_back_clearanceToDate");
        sessionStorage.removeItem("complete_back_flatbooking_Id");
        sessionStorage.removeItem("complete_back_titleName");
        sessionStorage.removeItem("booking_status");
        sessionStorage.removeItem("customerId_flat");

      }




      if (this.currentUrl == "ClearedTransactionReport") {
        sessionStorage.removeItem("complete_back_Siteids");
        sessionStorage.removeItem("complete_back_flatId_Id");
        sessionStorage.removeItem("complete_back_setofftypeId");
        sessionStorage.removeItem("complete_back_transactiontypeId");

        sessionStorage.removeItem("complete_back_Transaction_Mode");




        sessionStorage.removeItem("complete_back_fromdate");
        sessionStorage.removeItem("complete_back_todate");
        sessionStorage.removeItem("complete_back_clearanceFromDate");
        sessionStorage.removeItem("complete_back_clearanceToDate");
        sessionStorage.removeItem("complete_back_flatbooking_Id");
        sessionStorage.removeItem("complete_back_titleName");
        sessionStorage.removeItem("booking_status");
        sessionStorage.removeItem("customerId_flat");



      }
      if (this.currentUrl == "view_lead_details" || this.currentUrl == "view-lead-update-details") {

      } else {
        sessionStorage.removeItem("projectname");
        sessionStorage.removeItem("BlockIdname");
        sessionStorage.removeItem("floorIDname");
        sessionStorage.removeItem("flatIDname");

        sessionStorage.removeItem("back_leadval");
        sessionStorage.removeItem("back_siteid");
        sessionStorage.removeItem("back_bookingform_id");
        sessionStorage.removeItem("back_customer_selection");
        sessionStorage.removeItem("back_banker_list_id");
        sessionStorage.removeItem("back_lead_fromdate");
        sessionStorage.removeItem("back_leadtodate");
        sessionStorage.removeItem("back_customer_editid");
        sessionStorage.removeItem("view_lead_details");

      }


      if (this.currentUrl == "AddLeagalinvoice" || this.currentUrl == "view-invoice") {

      } else {
        sessionStorage.removeItem("projectname");
        sessionStorage.removeItem("BlockIdname");
        sessionStorage.removeItem("floorIDname");
        sessionStorage.removeItem("flatIDname");
      }


      if (this.currentUrl == "project-notification-list" || this.currentUrl == "viewandapprovetwo") {

      } else {
        sessionStorage.setItem("startdate_notif", "null");
        sessionStorage.setItem("enddate_notif", "null");
      }
      if (this.currentUrl == "StartAChart" || this.currentUrl == "chartview" || this.currentUrl == "ViewAllCharts") {

      } else {
        sessionStorage.removeItem("backflatid");
        sessionStorage.removeItem("backfromdate");
        sessionStorage.removeItem("backtodate");
        sessionStorage.removeItem("backemployeeIds");
      }
      if (this.currentUrl == "View_My_Appointments") {

      } else {
        sessionStorage.setItem('myobj', null);
      }
      if (this.currentUrl == "company-notificationlist" || this.currentUrl == "viewand-approve-notifications") {

      } else {
        sessionStorage.setItem('isBackButtonClicked', '');
        sessionStorage.setItem('session_stateID', '');
        sessionStorage.setItem('session_deviceID', '');
        sessionStorage.setItem('session_fromDate', '');
        sessionStorage.setItem('session_toDate', '');
        sessionStorage.setItem('session_pageNo', '');
      }

      if (this.currentUrl.trim() === "shortcut-components" || this.currentUrl.trim() === "ticket_details" || this.currentUrl.trim() === "reference_details" || this.currentUrl.trim() === "notification_details" || this.currentUrl.trim() === "chart_view" || this.currentUrl.trim() === "") {

      } else {

        sessionStorage.setItem('customeridsession', '')
      }
      if (this.currentUrl == "View-Non-Customer-Notifications" || this.currentUrl == "Notification-Details") {

      } else {
        sessionStorage.setItem('isBackButtonClickedNonCust', '');
        sessionStorage.setItem('sessionNonCust_stateID', '');
        sessionStorage.setItem('sessionNonCust_deviceID', '');
        sessionStorage.setItem('sessionNonCust_fromDate', '');
        sessionStorage.setItem('sessionNonCust_toDate', '');
        sessionStorage.setItem('sessionNonCust_pageNo', '');
      }

      if (this.currentUrl == "View-All-Company-Notifications" || this.currentUrl == "View-All-Notification-Details") {

      } else {
        sessionStorage.setItem('isBackButtonClickedAll', '');
        sessionStorage.setItem('sessionAll_notificationType', '');
        sessionStorage.setItem('sessionAll_stateID', '');
        sessionStorage.setItem('sessionAll_deviceID', '');
        sessionStorage.setItem('sessionAll_fromDate', '');
        sessionStorage.setItem('sessionAll_toDate', '');
        sessionStorage.setItem('sessionAll_pageNo', '');
      }

      if (this.currentUrl == "View_My_Complaints" || this.currentUrl == "ticketdetails") {

      } else {
        //alert("else")

        sessionStorage.setItem("PagesearchsiteIds2", null)
        sessionStorage.setItem("flatbookingId2", null)
        sessionStorage.setItem("SiteIdListc", null)

      }
      if (this.currentUrl == "view-closed-tickets" || this.currentUrl == "ticketdetails") {


      } else {
        //alert("else")

        sessionStorage.setItem("PagesearchsiteIds", null)
        sessionStorage.setItem("flatbookingId", null)
        // sessionStorage.getItem("flatbookingId")
        // sessionStorage.setItem("flatbooking_Idd1", null);
        // sessionStorage.setItem("Ticketnumberr1", null);
        // sessionStorage.setItem("site_idd1", null);
        // sessionStorage.setItem("fromdatee1", "");
        // sessionStorage.setItem("todatee1", "");
        // sessionStorage.setItem("mystausval1", "");
        // sessionStorage.setItem('sessionpageNo1', "");
        // sessionStorage.setItem('isBackButton_Clicked1', '');
      }


      if (this.currentUrl == "View_Ticket_Graphs" || this.currentUrl == "ticketdetails") {

      } else {
        //alert("else")


        sessionStorage.setItem("flatbooking_Idd1", null);
        sessionStorage.setItem("Ticketnumberr1", null);
        sessionStorage.setItem("site_idd1", null);
        sessionStorage.setItem("fromdatee1", "");
        sessionStorage.setItem("todatee1", "");
        sessionStorage.setItem("mystausval1", "");
        sessionStorage.setItem('sessionpageNo1', "");
        sessionStorage.setItem('isBackButton_Clicked1', '');



      }

      if (this.currentUrl == "viewticket" || this.currentUrl == "ticketdetails" || this.currentUrl == "View-All-Complaints" || this.currentUrl == "Complaints-view-details") {

      } else {

        sessionStorage.setItem("forsessionvalues", null)
        sessionStorage.setItem("Ticketnumberr", "");
        //alert("else")forsessionvaluesnull")
        sessionStorage.setItem("flatbooking_Iddv_allcomplaints", "null")
        sessionStorage.setItem("flatbooking_Iddv", null);

        sessionStorage.setItem("Ticketnumberr", null);
        sessionStorage.setItem("site_iddv", null);
        sessionStorage.setItem("site_idd_allcomplaints", null);

        sessionStorage.setItem("fromdatee", "");
        sessionStorage.setItem("todatee", "");
        sessionStorage.setItem("mystaus_val", "");
        sessionStorage.setItem('sessionpageNo', "");
        sessionStorage.setItem('isBackButton_Clicked', '');
      }

      if (this.currentUrl == "view-company-notifications-for-approvals" || this.currentUrl == "approve-company-notifications") {

      } else {
        sessionStorage.setItem('sessionCompApprovals_pageNo', '');
        sessionStorage.setItem('isBackButtonClickedComApprovals', '');
      }

      if (this.currentUrl == "View-Completed-Transactions" || this.currentUrl == "ClearedTransactionReport" || this.currentUrl == "Receipt-Online" || this.currentUrl == "Receipt-Cheque" || this.currentUrl == "interestwaiver-details" || this.currentUrl == "Payment-Cheque") {

      } else {
        sessionStorage.setItem('view_clreared_transaction_data', null);

      }

      if (this.currentUrl == "View-Pending-Transactions-Status" || this.currentUrl == "ClearedTransactionReport" || this.currentUrl == "Receipt-Online" || this.currentUrl == "Receipt-Cheque" || this.currentUrl == "interestwaiver-details" || this.currentUrl == "Payment-Cheque") {

      } else {
        sessionStorage.setItem('view_pending_transaction_data', null);

      }

      if (this.currentUrl == "crm-view-anonymous-entries" || this.currentUrl == "ClearedTransactionReport" || this.currentUrl == "crm-receipt-online") {

      } else {
        sessionStorage.setItem('view_suspense_transaction_data', null);

      }

      if (this.currentUrl == "view-company-notifications-for-modifications" || this.currentUrl == "modify-company-notifications") {

      } else {
        sessionStorage.setItem('sessionCompModify_pageNo', '');
        sessionStorage.setItem('isBackButtonClickedCompModify', '');
      }

      if (this.currentUrl.trim() === "Receipt-Cheque" || this.currentUrl.trim() === "View-Pending-Transactions") {

      } else {
        sessionStorage.setItem('sessionFor_receiptCheque', '')
      }

      if (this.currentUrl.trim() === "daily-reports" || this.currentUrl.trim() === "signin" || this.currentUrl.trim() === "signup" || this.currentUrl.trim() === "forgot-password" || this.currentUrl.trim() === "locked" || this.currentUrl.trim() === "page404" || this.currentUrl.trim() === "page500") {
        document.getElementById("main-component").style["display"] = "none";
        // this.menu_array = eval('('+sessionStorage.getItem('loginresponse')+')')
        $("#myid").addClass("menu-toggle");
      } else {
        document.getElementById('main-component').style.removeProperty("display");
        $("#myid").addClass("waves-effect waves-block");
      }
      if (routerEvent instanceof NavigationEnd) {
        //this.showLoadingIndicatior = false;
      }
    });

  }
  ngOnChanges() {
    // alert("test1");
  }
  ngOnInit() {

    //alert("test2");
    this.menu_array1 = eval('(' + sessionStorage.getItem('loginresponse') + ')')
    if (this.menu_array1 == null) {
      this.menu_array = {
        "responseCode": 200, "status": null,
        "sessionKey": "0AAD38430A6F5D40B24CDD181BAB4AE215FA1DB68D70C442CA55F6689B3C6827",
        "errors": null, "description": "success", "departments": [{ "departmentId": 101, "departmentName": "SALES CRM ", "description": "SALES CRM ", "departmentMail": "chandusai53@gmail.com,", "statusId": 6, "typeOf": null, "roleId": 1, "name": "SR.CRM EXECUTIVE", "departmentRoleMappingId": null, "employeeRoleMenuGroupingId": null, "employeeDepartmentMappingId": null, "employeeId": null, "loginModule": [{ "moduleId": 1, "moduleName": "Ticketing", "createdBy": null, "createdDate": 1561083855831, "modifiedBy": null, "modifiedDate": null, "statusId": 6, "moduleIcon": null, "loginSubModules": [{ "subModuleId": 1, "subModuleName": "View All Tickets", "createdBy": null, "createdDate": 1561083968822, "modifiedBy": null, "modifiedDate": null, "statusId": 6, "pageLink": "ticket/viewticket", "sites": [{ "siteId": 111, "name": "Sumadhura Nandanam", "statusId": 2, "createdDate": 1548336953984, "imageLocation": "http://129.154.74.18:9999/images/sumadhura_projects_images/Sumadhura_Nandhanam/Sumadhura-Nandanam.jpg", "modifiedDate": 1549337800616, "referMessage": "Refer your friend about our Nandhanam.", "landmarkImage": "http://129.154.74.18:9999/images/sumadhura_projects_images/Sumadhura_Nandhanam/Sumadhura_Nandanam_landmark.jpg", "projectArea": "2.5 Acres", "noOfUnits": "250, 2/2.5/3 BHK\n", "rera": "PRM/KA/RERA/1251/446/PR/ 180507/001667", "description": null, "overviewImage": "E:\\venkat\\images\\sumadhura_projects_images\\Sumadhura_Nandhanam\\Overview_Images", "masterPlanImage": "http://129.154.74.18:9999/images/sumadhura_projects_images/Sumadhura_Nandhanam/Masterplan_Image/SUMADHURA NANDANAM_ Master plan.jpg", "refererDescription": "SumadhuraNandanam surprises with its contemporary new age architecture and lifestyle features. Its efficiently-planned, well-ventilated internal spaces are vaastu-compliant. Sumadhura uses all the major brands in these luxury apartments such as Grohe, TOTO, V-Guard, Havells, Schindler, Asian Paints and LG Hausys uPVC Doors & Windows." }] }, { "subModuleId": 2, "subModuleName": "View My Tickets", "createdBy": null, "createdDate": 1561083968822, "modifiedBy": null, "modifiedDate": null, "statusId": 6, "pageLink": "view-my-tickets", "sites": [{ "siteId": 111, "name": "Sumadhura Nandanam", "statusId": 2, "createdDate": 1548336953984, "imageLocation": "http://129.154.74.18:9999/images/sumadhura_projects_images/Sumadhura_Nandhanam/Sumadhura-Nandanam.jpg", "modifiedDate": 1549337800616, "referMessage": "Refer your friend about our Nandhanam.", "landmarkImage": "http://129.154.74.18:9999/images/sumadhura_projects_images/Sumadhura_Nandhanam/Sumadhura_Nandanam_landmark.jpg", "projectArea": "2.5 Acres", "noOfUnits": "250, 2/2.5/3 BHK\n", "rera": "PRM/KA/RERA/1251/446/PR/ 180507/001667", "description": null, "overviewImage": "E:\\venkat\\images\\sumadhura_projects_images\\Sumadhura_Nandhanam\\Overview_Images", "masterPlanImage": "http://129.154.74.18:9999/images/sumadhura_projects_images/Sumadhura_Nandhanam/Masterplan_Image/SUMADHURA NANDANAM_ Master plan.jpg", "refererDescription": "SumadhuraNandanam surprises with its contemporary new age architecture and lifestyle features. Its efficiently-planned, well-ventilated internal spaces are vaastu-compliant. Sumadhura uses all the major brands in these luxury apartments such as Grohe, TOTO, V-Guard, Havells, Schindler, Asian Paints and LG Hausys uPVC Doors & Windows." }] }, { "subModuleId": 3, "subModuleName": "View Info Request", "createdBy": null, "createdDate": 1561083968822, "modifiedBy": null, "modifiedDate": null, "statusId": 6, "pageLink": "ticket/viewinforequest", "sites": [{ "siteId": 111, "name": "Sumadhura Nandanam", "statusId": 2, "createdDate": 1548336953984, "imageLocation": "http://129.154.74.18:9999/images/sumadhura_projects_images/Sumadhura_Nandhanam/Sumadhura-Nandanam.jpg", "modifiedDate": 1549337800616, "referMessage": "Refer your friend about our Nandhanam.", "landmarkImage": "http://129.154.74.18:9999/images/sumadhura_projects_images/Sumadhura_Nandhanam/Sumadhura_Nandanam_landmark.jpg", "projectArea": "2.5 Acres", "noOfUnits": "250, 2/2.5/3 BHK\n", "rera": "PRM/KA/RERA/1251/446/PR/ 180507/001667", "description": null, "overviewImage": "E:\\venkat\\images\\sumadhura_projects_images\\Sumadhura_Nandhanam\\Overview_Images", "masterPlanImage": "http://129.154.74.18:9999/images/sumadhura_projects_images/Sumadhura_Nandhanam/Masterplan_Image/SUMADHURA NANDANAM_ Master plan.jpg", "refererDescription": "SumadhuraNandanam surprises with its contemporary new age architecture and lifestyle features. Its efficiently-planned, well-ventilated internal spaces are vaastu-compliant. Sumadhura uses all the major brands in these luxury apartments such as Grohe, TOTO, V-Guard, Havells, Schindler, Asian Paints and LG Hausys uPVC Doors & Windows." }] }] }, { "moduleId": 5, "moduleName": "Services", "createdBy": null, "createdDate": 1562815941539, "modifiedBy": null, "modifiedDate": null, "statusId": 6, "moduleIcon": null, "loginSubModules": [{ "subModuleId": 9, "subModuleName": "Leave Update", "createdBy": null, "createdDate": 1562663332776, "modifiedBy": null, "modifiedDate": null, "statusId": 6, "pageLink": "leave-update", "sites": [{ "siteId": 111, "name": "Sumadhura Nandanam", "statusId": 2, "createdDate": 1548336953984, "imageLocation": "http://129.154.74.18:9999/images/sumadhura_projects_images/Sumadhura_Nandhanam/Sumadhura-Nandanam.jpg", "modifiedDate": 1549337800616, "referMessage": "Refer your friend about our Nandhanam.", "landmarkImage": "http://129.154.74.18:9999/images/sumadhura_projects_images/Sumadhura_Nandhanam/Sumadhura_Nandanam_landmark.jpg", "projectArea": "2.5 Acres", "noOfUnits": "250, 2/2.5/3 BHK\n", "rera": "PRM/KA/RERA/1251/446/PR/ 180507/001667", "description": null, "overviewImage": "E:\\venkat\\images\\sumadhura_projects_images\\Sumadhura_Nandhanam\\Overview_Images", "masterPlanImage": "http://129.154.74.18:9999/images/sumadhura_projects_images/Sumadhura_Nandhanam/Masterplan_Image/SUMADHURA NANDANAM_ Master plan.jpg", "refererDescription": "SumadhuraNandanam surprises with its contemporary new age architecture and lifestyle features. Its efficiently-planned, well-ventilated internal spaces are vaastu-compliant. Sumadhura uses all the major brands in these luxury apartments such as Grohe, TOTO, V-Guard, Havells, Schindler, Asian Paints and LG Hausys uPVC Doors & Windows." }] }] }] }], "empName": "crm_sales_nandanam_1 ", "empId": 1, "employee": { "csEmpId": 1, "employeeId": 1, "firstName": "crm_sales_nandanam_1", "lastName": null, "employeeName": "crm_sales_nandanam_1 ", "email": "chandusai53@gmail.com", "statusId": 6, "createdDate": 1559263760176, "modifiedDate": null, "mobileNumber": "8500085263", "userProfile": "http://192.168.0.210:9999/images/sumadhura_projects_images/customercareimg.png" }
      }
    } else {
      this.menu_array = eval('(' + sessionStorage.getItem('loginresponse') + ')');
      for (var i = 0; i < this.menu_array.departments[0].loginModule.length; i++) {
        for (var j = 0; j < this.menu_array.departments[0].loginModule[i].loginSubModules.length; j++) {
          this.mytemparray.push(
            {
              name: this.menu_array.departments[0].loginModule[i].loginSubModules[j].subModuleName,
              link: this.menu_array.departments[0].loginModule[i].loginSubModules[j].pageLink
            }
          )
        }
      }
      $('#searchId').append('<option value="search">--Search--</option>');
      for (var i = 0; i < this.mytemparray.length; i++) {

        $('#searchId').append("<option value='" + this.mytemparray[i].link + "'>" + this.mytemparray[i].name + "</option>");

      }
   
      this.ChartTotalCountList();
      this.ticketTotalCountList();

      var countdown = 30 * 60 * 1000;
      this.mySubscription = interval(countdown).subscribe((x => {
        console.log("working now");
       this.ChartTotalCountList();
      this.ticketTotalCountList();
      }));




    }


    this.totalcount = JSON.parse(sessionStorage.getItem("messagecount"));
    if (this.totalcount == null) {
      this.ChartTotalCountList();
    }

    this.subscription = this.productService.getNumber().subscribe(number => {
      console.log(number);
      this.number = number

    },
      error => {
        this.ChartTotalCountList();
      });



    this.subscription = this.productService.ticket_getNumber().subscribe(number => {
      console.log(number);
      this.chart_number = number

    },
      error => {
        this.ticketTotalCountList();
      });




    this.subscription = this.productService.complaint_getNumber().subscribe(number => {
      console.log(number);
      this.complaint_number = number

    },
      error => {
        this.ticketTotalCountList();
      });


    this.subscription = this.productService.appointment_getNumber().subscribe(number => {
      console.log(number);
      this.appointment_number = number

    },
      error => {
        this.ticketTotalCountList();
      });


    this.subscription = this.productService.project_getNumber().subscribe(number => {
      console.log(number);
      this.View_Notifications_For_Approvals = number

    },
      error => {
        this.ticketTotalCountList();
      });


    this.ims_postnumber_temp();

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngDoCheck() {
    //  console.log("ngDoCheck");
    // this.menu_array1 = eval('('+sessionStorage.getItem('loginresponse')+')')
    // if(this.menu_array1 == null){
    //    this.menu_array ={"responseCode":200,"status":null,"sessionKey":"0AAD38430A6F5D40B24CDD181BAB4AE215FA1DB68D70C442CA55F6689B3C6827","errors":null,"description":"success","departments":[{"departmentId":101,"departmentName":"SALES CRM ","description":"SALES CRM ","departmentMail":"chandusai53@gmail.com,","statusId":6,"typeOf":null,"roleId":1,"name":"SR.CRM EXECUTIVE","departmentRoleMappingId":null,"employeeRoleMenuGroupingId":null,"employeeDepartmentMappingId":null,"employeeId":null,"loginModule":[{"moduleId":1,"moduleName":"Ticketing","createdBy":null,"createdDate":1561083855831,"modifiedBy":null,"modifiedDate":null,"statusId":6,"moduleIcon":null,"loginSubModules":[{"subModuleId":1,"subModuleName":"View All Tickets","createdBy":null,"createdDate":1561083968822,"modifiedBy":null,"modifiedDate":null,"statusId":6,"pageLink":"ticket/viewticket","sites":[{"siteId":111,"name":"Sumadhura Nandanam","statusId":2,"createdDate":1548336953984,"imageLocation":"http://129.154.74.18:9999/images/sumadhura_projects_images/Sumadhura_Nandhanam/Sumadhura-Nandanam.jpg","modifiedDate":1549337800616,"referMessage":"Refer your friend about our Nandhanam.","landmarkImage":"http://129.154.74.18:9999/images/sumadhura_projects_images/Sumadhura_Nandhanam/Sumadhura_Nandanam_landmark.jpg","projectArea":"2.5 Acres","noOfUnits":"250, 2/2.5/3 BHK\n","rera":"PRM/KA/RERA/1251/446/PR/ 180507/001667","description":null,"overviewImage":"E:\\venkat\\images\\sumadhura_projects_images\\Sumadhura_Nandhanam\\Overview_Images","masterPlanImage":"http://129.154.74.18:9999/images/sumadhura_projects_images/Sumadhura_Nandhanam/Masterplan_Image/SUMADHURA NANDANAM_ Master plan.jpg","refererDescription":"SumadhuraNandanam surprises with its contemporary new age architecture and lifestyle features. Its efficiently-planned, well-ventilated internal spaces are vaastu-compliant. Sumadhura uses all the major brands in these luxury apartments such as Grohe, TOTO, V-Guard, Havells, Schindler, Asian Paints and LG Hausys uPVC Doors & Windows."}]},{"subModuleId":2,"subModuleName":"View My Tickets","createdBy":null,"createdDate":1561083968822,"modifiedBy":null,"modifiedDate":null,"statusId":6,"pageLink":"view-my-tickets","sites":[{"siteId":111,"name":"Sumadhura Nandanam","statusId":2,"createdDate":1548336953984,"imageLocation":"http://129.154.74.18:9999/images/sumadhura_projects_images/Sumadhura_Nandhanam/Sumadhura-Nandanam.jpg","modifiedDate":1549337800616,"referMessage":"Refer your friend about our Nandhanam.","landmarkImage":"http://129.154.74.18:9999/images/sumadhura_projects_images/Sumadhura_Nandhanam/Sumadhura_Nandanam_landmark.jpg","projectArea":"2.5 Acres","noOfUnits":"250, 2/2.5/3 BHK\n","rera":"PRM/KA/RERA/1251/446/PR/ 180507/001667","description":null,"overviewImage":"E:\\venkat\\images\\sumadhura_projects_images\\Sumadhura_Nandhanam\\Overview_Images","masterPlanImage":"http://129.154.74.18:9999/images/sumadhura_projects_images/Sumadhura_Nandhanam/Masterplan_Image/SUMADHURA NANDANAM_ Master plan.jpg","refererDescription":"SumadhuraNandanam surprises with its contemporary new age architecture and lifestyle features. Its efficiently-planned, well-ventilated internal spaces are vaastu-compliant. Sumadhura uses all the major brands in these luxury apartments such as Grohe, TOTO, V-Guard, Havells, Schindler, Asian Paints and LG Hausys uPVC Doors & Windows."}]},{"subModuleId":3,"subModuleName":"View Info Request","createdBy":null,"createdDate":1561083968822,"modifiedBy":null,"modifiedDate":null,"statusId":6,"pageLink":"ticket/viewinforequest","sites":[{"siteId":111,"name":"Sumadhura Nandanam","statusId":2,"createdDate":1548336953984,"imageLocation":"http://129.154.74.18:9999/images/sumadhura_projects_images/Sumadhura_Nandhanam/Sumadhura-Nandanam.jpg","modifiedDate":1549337800616,"referMessage":"Refer your friend about our Nandhanam.","landmarkImage":"http://129.154.74.18:9999/images/sumadhura_projects_images/Sumadhura_Nandhanam/Sumadhura_Nandanam_landmark.jpg","projectArea":"2.5 Acres","noOfUnits":"250, 2/2.5/3 BHK\n","rera":"PRM/KA/RERA/1251/446/PR/ 180507/001667","description":null,"overviewImage":"E:\\venkat\\images\\sumadhura_projects_images\\Sumadhura_Nandhanam\\Overview_Images","masterPlanImage":"http://129.154.74.18:9999/images/sumadhura_projects_images/Sumadhura_Nandhanam/Masterplan_Image/SUMADHURA NANDANAM_ Master plan.jpg","refererDescription":"SumadhuraNandanam surprises with its contemporary new age architecture and lifestyle features. Its efficiently-planned, well-ventilated internal spaces are vaastu-compliant. Sumadhura uses all the major brands in these luxury apartments such as Grohe, TOTO, V-Guard, Havells, Schindler, Asian Paints and LG Hausys uPVC Doors & Windows."}]}]},{"moduleId":5,"moduleName":"Services","createdBy":null,"createdDate":1562815941539,"modifiedBy":null,"modifiedDate":null,"statusId":6,"moduleIcon":null,"loginSubModules":[{"subModuleId":9,"subModuleName":"Leave Update","createdBy":null,"createdDate":1562663332776,"modifiedBy":null,"modifiedDate":null,"statusId":6,"pageLink":"leave-update","sites":[{"siteId":111,"name":"Sumadhura Nandanam","statusId":2,"createdDate":1548336953984,"imageLocation":"http://129.154.74.18:9999/images/sumadhura_projects_images/Sumadhura_Nandhanam/Sumadhura-Nandanam.jpg","modifiedDate":1549337800616,"referMessage":"Refer your friend about our Nandhanam.","landmarkImage":"http://129.154.74.18:9999/images/sumadhura_projects_images/Sumadhura_Nandhanam/Sumadhura_Nandanam_landmark.jpg","projectArea":"2.5 Acres","noOfUnits":"250, 2/2.5/3 BHK\n","rera":"PRM/KA/RERA/1251/446/PR/ 180507/001667","description":null,"overviewImage":"E:\\venkat\\images\\sumadhura_projects_images\\Sumadhura_Nandhanam\\Overview_Images","masterPlanImage":"http://129.154.74.18:9999/images/sumadhura_projects_images/Sumadhura_Nandhanam/Masterplan_Image/SUMADHURA NANDANAM_ Master plan.jpg","refererDescription":"SumadhuraNandanam surprises with its contemporary new age architecture and lifestyle features. Its efficiently-planned, well-ventilated internal spaces are vaastu-compliant. Sumadhura uses all the major brands in these luxury apartments such as Grohe, TOTO, V-Guard, Havells, Schindler, Asian Paints and LG Hausys uPVC Doors & Windows."}]}]}]}],"empName":"crm_sales_nandanam_1 ","empId":1,"employee":{"csEmpId":1,"employeeId":1,"firstName":"crm_sales_nandanam_1","lastName":null,"employeeName":"crm_sales_nandanam_1 ","email":"chandusai53@gmail.com","statusId":6,"createdDate":1559263760176,"modifiedDate":null,"mobileNumber":"8500085263","userProfile":"http://192.168.0.210:9999/images/sumadhura_projects_images/customercareimg.png"}}
    //   }else{
    //    this.menu_array = eval('('+sessionStorage.getItem('loginresponse')+')');
    //   }
  }
  ngAfterViewInit() {
    const uuid = this.uid; //<-- use it
  }

  logout() {
    var self = this;
    swal({
      title: "Do you want to logout ?",
      // text: "Do you want to logout ?",
      type: "warning",
      showCancelButton: true,
      confirmButtonClass: "btn-danger",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      closeOnConfirm: false,
      closeOnCancel: false
    }, function (isConfirm) {
      if (isConfirm) {
        self.logOut();
      } else {
        swal.close();
      }
    });
  }


  logOut() {

    $('.page-loader-wrapper').show();
    console.log("Log Out");
    let url = this.cmn.commonUrl + "login/logout.spring";
    // let url = "http://106.51.38.64:8888/SumadhuraGateway/employeeservice/login/logout.spring";

    let body = {
      "requestUrl": "logout.spring",
      "sessionKey": sessionStorage.getItem("login_sessionkey")
    };
    console.log("----body :" + JSON.stringify(body));

    let headers = new Headers({
      "Content-Type": "application/json",
      "Accept": "application/json"

    });
    let options = new RequestOptions({ headers: headers });
    //$('.page-loader-wrapper').hide();
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      console.log("resp" + JSON.stringify(resp));
      localStorage.removeItem('unviewedChatCount');
      if (resp.responseCode == 200) {
        swal.close();
        $('.page-loader-wrapper').hide();
        sessionStorage.clear();
        // swal("Your has been logged out sucessfully", "success");
        this._router.navigate(['/']);
        localStorage.removeItem('SiteIDS');
        localStorage.removeItem('unviewedChatCount');
        sessionStorage.removeItem("messagecount");
        sessionStorage.removeItem("messengerIds");
      } else if (resp.responseCode == 440) {
        swal.close();
        $('.page-loader-wrapper').hide();
        //swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        swal.close();
        $('.page-loader-wrapper').hide();
        this.router.navigate([""]);
      }
    },
      error => {
        swal.close();
        this._router.navigate(['/']);
      }
    );
  }



  ChartTotalCountList() {
    this.service.chatcountUpdate.subscribe((resp: any) => {
      console.log(JSON.stringify(resp));
      setTimeout(() => {
        if (resp.responseCode == 200) {
          this.unviewedChatCount = resp.unviewedChatCount;
          this.chartcount = resp.unviewedChatCount;
          this.number = { text: resp.unviewedChatCount };
          console.log(this.number);

          this.messengerIds = resp.messengerIds;
          this.totalcount = resp.unviewedChatCount;
          if (this.messengerIds !== undefined) {
            sessionStorage.setItem("messengerIds", JSON.stringify(this.messengerIds));
            sessionStorage.removeItem("messageTotalcount");
            setTimeout(() => {
              this.service.NumberOfunreadmessages.subscribe((resp: any) => {
                if (resp.responseCode == 200) {
                  this.ledgerData = resp.messengerDetailsPojos;
                }

              });
            }, 3000);


          }
        } else if (resp.responseCode == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        } else {
          //swal(resp.errors[0]);
        }
      }, 1000);

    });
  }

  ticketTotalCountList() {
    this.service.ticketcountUpdate.subscribe((resp: any) => {

      console.log(resp);

      console.log("hello world");
      setTimeout(() => {
        if (resp.responseCode == 200) {


          this.chart_number = { text: resp.responseObjList.View_My_Tickets };
          this.complaint_number = { text: resp.responseObjList.View_My_Complaints };
          this.appointment_number = { text: resp.responseObjList.View_My_Appointments };
          this.Escalation_Tickets = { text: resp.responseObjList.Escalation_Tickets };
          this.View_Notifications_For_Approvals = { text: resp.responseObjList.View_Notifications_For_Approvals };

          this.Ticketing_Module = { text: resp.responseObjList.Ticketing };
          this.Appointments_Module = { text: resp.responseObjList.Appointments };
          this.Project_Module = { text: resp.responseObjList.Project_Notifications };

        } else if (resp.responseCode == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        } else {
          //swal(resp.errors[0]);
        }
      }, 1000);

    });
  }


  // get MsgReadCount() {
  //   this.totalcount = JSON.parse(sessionStorage.getItem("messagecount"));
  //   if (this.totalcount !== null) {
  //     const d = this.totalcount.filter((o: any) => o.status == 6);
  //     return d.length;
  //   } else {
  //     if (sessionStorage.getItem("messageTotalcount") == null) {
  //       return this.chartcount;
  //     } else {
  //       return 0;

  //     }

  //   }

  // }
  myfunction(temp) {
    // alert(temp)
    // this.router.navigate([temp]);
    setTimeout(() => {
      location.reload()

    }, 500);
    setTimeout(() => {
      this.router.navigate([temp]);

    }, 50);


  }
  tempclick(e: any) {
    console.log(e.target.id, e.target.className);
    console.log(window.location.href)
    var cliktemp = (e.target.id).split('/').pop();
    var temphref = (window.location.href).split('/').pop();
    console.log(temphref)

    if (cliktemp == temphref) {
      setTimeout(() => {
        location.reload()

      }, 500);
      setTimeout(() => {
        this.router.navigate([e.target.id]);

      }, 50);
    }
  }

  ims_postnumber_temp() {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "thirdParty/getEmployeeOfMultiplePortal.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "empId": sessionStorage.getItem("sumadhuraEmpId"),
      "siteId": sessionStorage.getItem("session_siteId"),
      "sessionKey": "Login",
      "requestUrl": "thirdPartyCall",
      "thirdPartyportNumber": sessionStorage.getItem("portNumber"),
      "portalName": "Sumadhura-CustomerApp"
    }

    console.log(url);
    console.log(JSON.stringify(body));


    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      console.log(resp);
      if (resp.responseCode == 200) {
        $('#ims_select_event').html("");
        $('#ims_select_event').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {

          if (resp.responseObjList[i].portalName != "Sumadhura-CustomerApp") {
            $(function () {
              $('#saket').show();
              $('#ims_select_event').show();
            });

            $('#ims_select_event').append("<option value='" + resp.responseObjList[i].portalLoginUrl + "-" + resp.responseObjList[i].siteId + "'>" + resp.responseObjList[i].portalName + '-' + resp.responseObjList[i].siteName + "</option>");
          } else {
            $(function () {
              $('#saket').hide();
              $('#ims_select_event').hide();
            });
          }

        }

      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        $('.page-loader-wrapper').hide();
        //   swal(resp.errors[0]);
        return false;
      }

    },
      error => {
        $('.page-loader-wrapper').hide();
        var error = JSON.parse(error._body).responseCode;
        this.router.navigate([""]);
        if (error == 440) {
          //   swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }



}

