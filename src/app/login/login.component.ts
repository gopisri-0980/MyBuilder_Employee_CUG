import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerEmpServiceService } from "../customer-emp-service.service";
import { Http, RequestOptions, Headers } from '@angular/http';
import { CommonComponent } from '../common/common.component';

import { ActivatedRoute } from '@angular/router';


declare const $: any;
declare const swal: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  hide = true;

  loginForm: FormGroup;
  submitted = false;
  firstName: any;
  show = false;
  username: string;
  password: string;
  toggled: boolean = false;
  menu_array: any;
  dept_Id: any;
  department_Role_Mapping_Id: any;
  employee_Department_Mapping_Id: any;
  role_Id: any;
  employeeId: any;
  shortmobile: any;
  usernaame: any;
  controller: Array<any> = [];
  subcontroller: Array<any> = [];
  subcontroller_singlepage: Array<any> = [];
  unviewedChatCount: any;
  Appointmentpage: Array<any> = [];
  ViewCarParkingSlots: Array<any> = [];
  AllotCarParking: Array<any> = [];

  CreateAppointmentTimeSlots: Array<any> = [];
  ViewAppointmentTimeSlots: Array<any> = [];
  PendingModificationInvoices: Array<any> = [];
  ViewAppointments: Array<any> = [];
  ViewCompletedTransactions: Array<any> = [];
  ViewMyComplaints: Array<any> = [];
  ViewInterestWaiverRequestforApproval: Array<any> = [];
  Authentication_id: any;
  redirectUrl: any;
  transactionEntryId: any;
  bookingFormId: any;
  transactionModeName: any;
  Url_empId: any;
  requestUrl: any;

  view_my_tickets: Array<any> = [];
  ViewInterestPaidand_WaivedDetails: Array<any> = [];
  Transaction_details_bank_statement_view: Array<any> = [];
  View_Lead_Details: Array<any> = [];
  Pending_Transactions_For_Approval: Array<any> = [];
  create_booking_controller: Array<any> = [];
  View_Pending_transaction_status: Array<any> = [];
  notificationId: any;
  view_my_complaints_controller: Array<any> = [];
  mailPassword: any;
  action: any;
  username_online_url: any;
  password_online_url: any;
  requestUrl_online: any;
  loaderhideme: boolean;

  Register_And_Unregister_controller: Array<any> = [];

  flats_availablity_controller: Array<any> = [];

  leave_update_controller: any;
  Create_Booking_With_Existing_Data: Array<any> = [];
  update_booking: Array<any> = [];
  View_Bank_Account_Details: Array<any> = [];
  module_and_site_access_masters: Array<any> = [];

  constructor(private router: Router, private http: Http, public cmn: CommonComponent,
    private formBuilder: FormBuilder, public _ser: CustomerEmpServiceService,
    private route: ActivatedRoute,) {
    $('#main-component').hide();
    $(".menu").hide();
    $(".navbar").hide();
    $(".container-fluid").hide();
    $(".container").hide();
    $(".sidebar").hide();


    this.route.queryParams
      .subscribe(params => {

        this.Authentication_id = params.Authentication_id;
        this.redirectUrl = params.redirectUrl;
        this.requestUrl = params.requestUrl;
        this.transactionEntryId = params.transactionEntryId;
        this.bookingFormId = params.bookingFormId;
        this.transactionModeName = params.transactionModeName;
        this.Url_empId = params.empId;
        this.username_online_url = params.username;
        this.password_online_url = params.password;
        this.requestUrl_online = params.requestUrl;

        if (this.Authentication_id == undefined) {
          this.Authentication_id = 0;
        } else {
          this.Authentication_id = this.Authentication_id;
        }

        console.log(this.Authentication_id);
        console.log(this.redirectUrl);
        console.log(this.transactionEntryId);
        console.log(this.bookingFormId);
        console.log(this.transactionModeName);
        console.log(this.Url_empId);
        console.log(this.username_online_url);
        console.log(this.password_online_url);
        console.log(this.requestUrl_online);

        if (this.username_online_url != undefined && this.username_online_url != 'undefined' && this.username_online_url != null && this.username_online_url != 'null') {
          this.loaderhideme = true;

          this.loginservice_controller(this.username_online_url, this.password_online_url, this.requestUrl_online);
        } else {

          this.loaderhideme = false;
        }





      }
      );

  }

  handleSelection(event) {
    // alert(event.char);
  }
  ngOnInit() {

    history.pushState(null, null, location.href);
    window.onpopstate = function () {
      history.go(1);
    };
    var uniqueId = Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
    //  alert(uniqueId);
    function uuidv4() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }

    //  alert(uuidv4())
    function preventBack() { window.history.forward(); }
    setTimeout("preventBack()", 0);
    window.onunload = function () { null };
    $(document).ready(function () {
      function preventBack() { window.history.forward(); }
      setTimeout("preventBack()", 0);
      window.onunload = function () { null };
    })
    $('.page-loader-wrapper').hide();
    document.getElementById("main-component").style["display"] = "none";
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      pass: ['', [Validators.required]],
    });
    (function ($) {

      $('#createpwdid').on('click', function () {
        $(this).attr('type', 'password');

      });
      $('#confirmpwd').on('click', function () {
        $(this).attr('type', 'password');

      });
      $("#mobilnumid").attr('maxlength', '6');
      function validatePhone(phoneNumber) {
        var phoneNumberPattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
        return phoneNumberPattern.test(phoneNumber);
      }
      "use strict";
      /*==================================================================
      [ Focus input ]*/
      $('.input100').each(function () {
        $(this).on('blur', function () {
          if ($(this).val().trim() != "") {
            $(this).addClass('has-val');
          }
          else {
            $(this).removeClass('has-val');
          }
        })
      })

      /*==================================================================
      [ Validate ]*/
      var input = $('.validate-input .input100');
      $('.validate-form').on('submit', function () {
        var check = true;

        for (var i = 0; i < input.length; i++) {
          if (validate(input[i]) == false) {
            showValidate(input[i]);
            check = false;
          }
        }

        return check;
      });


      $('.validate-form .input100').each(function () {
        $(this).focus(function () {
          hideValidate(this);
        });
      });

      function validate(input) {
        if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
          if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
            return false;
          }
        }
        else {
          if ($(input).val().trim() == '') {
            return false;
          }
        }
      }

      function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
        $(".erroe_dis").remove();
        $(".alert-validate").append('<i class="material-icons erroe_dis">error</i>');
      }

      function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
        $(".erroe_dis").remove();
      }

      /*==================================================================
      [ Show pass ]*/
      var showPass = 0;
      $('.btn-show-pass').on('click', function () {
        if (showPass == 0) {
          $(this).next('input').attr('type', 'text');
          $(this).addClass('active');
          showPass = 1;
        }
        else {
          $(this).next('input').attr('type', 'password');
          $(this).removeClass('active');
          showPass = 0;
        }

      });


    })($);
  }
  loginUser(val) {

    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    } else {
      if (this.username == "" || this.username == undefined || this.password == "" || this.password == undefined) {
        // alert("Invalid Credentials");
        this.username = "";
        this.password = ""
        return false;
      }
      this.loginservice_controller(this.username, this.password, "authenticate");
    }


  }
  /*-----------------------Calling Login Service Calling End----------------------------*/



  loginservice_controller(username, password, request_type) {

    console.log(username);
    console.log(password);
    console.log(request_type);

    this.loaderhideme = true;
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "login/authenticate.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "username": "" + username,
      "password": "" + password,
      "requestUrl": request_type
    }

    console.log(JSON.stringify(body));
    console.log(url);
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      this.controller = resp;
      console.log(JSON.stringify(resp))
      //return false;
      console.log(this.controller);

      sessionStorage.setItem('loginresponse', JSON.stringify(resp));
      sessionStorage.setItem("nval", "1");
      if (resp.responseCode == 200) {
        this.loaderhideme = false;
        $('.page-loader-wrapper').hide();
        sessionStorage.setItem("login_sessionkey", resp.sessionKey);
        sessionStorage.setItem("session_deptid", resp.departments[0].departmentId);
        sessionStorage.setItem("session_deptName", resp.departments[0].departmentName);
        sessionStorage.setItem("session_desigName", resp.departments[0].name);
        sessionStorage.setItem("session_empName", resp.departments[0].departmentRoleMappingId);
        sessionStorage.setItem("session_roleId", resp.departments[0].roleId);
        sessionStorage.setItem("session_siteId", resp.departments[0].loginModule[0].loginSubModules[0].sites[0].siteId);
        this.menu_array = eval('(' + sessionStorage.getItem('loginresponse') + ')');
        sessionStorage.setItem("crms_dashboard", this.username);
        sessionStorage.setItem("crmrefund", "Amount refund");

        sessionStorage.setItem("employeeId", resp.empId);
        sessionStorage.setItem("redirectUrl", this.redirectUrl);
        sessionStorage.setItem("transactionEntryId", this.transactionEntryId);
        sessionStorage.setItem("bookingFormId", this.bookingFormId);
        sessionStorage.setItem("transactionModeName", this.transactionModeName);
        sessionStorage.setItem("Url_empId", this.Url_empId);

        sessionStorage.setItem("requestUrl", this.requestUrl);
        sessionStorage.setItem("user_name", this.username);
        sessionStorage.setItem("user_password", this.password);
        sessionStorage.setItem("salesForceEmpName", resp.employee.salesForceEmpName);

        sessionStorage.setItem("notificationId", this.notificationId);
        sessionStorage.setItem("portNumber", resp.portNumber)
        sessionStorage.setItem("sumadhuraEmpId", resp.employee.sumadhuraEmpId)

        if (this.Authentication_id == 0) {
          this.cmn.commonAfterLoginNavigation();
        } else {
          if (this.Url_empId == resp.empId) {
            sessionStorage.removeItem("view_transaction_data");
            this.router.navigateByUrl("View_Interest_waiver");
          } else {
            this.cmn.commonAfterLoginNavigation();
          }
        }




        // this.cmn.commonAfterLoginNavigation();
        for (var i = 0; i < this.controller['departments'][0].loginModule.length; i++) {

          for (var j = 0; j < this.controller['departments'][0].loginModule[i].loginSubModules.length; j++) {
            // alert(this.controller['departments'][0].loginModule[i].loginSubModules[j].subModuleName)
            if (this.controller['departments'][0].loginModule[i].loginSubModules[j].subModuleName == "View Customer Data") {
              for (var k = 0; k < this.controller['departments'][0].loginModule[i].loginSubModules[j].sites.length; k++) {
                // alert(this.controller['departments'][0].loginModule[i].loginSubModules[j].sites[k].siteId)
                this.subcontroller_singlepage.push(this.controller['departments'][0].loginModule[i].loginSubModules[j].sites[k].siteId);
                localStorage.setItem('SiteIDS_singlepage', JSON.stringify(this.subcontroller_singlepage));
              }
            }

            if (this.controller['departments'][0].loginModule[i].loginSubModules[j].subModuleName == "View Car Parking Slots") {
              for (var k = 0; k < this.controller['departments'][0].loginModule[i].loginSubModules[j].sites.length; k++) {
                this.ViewCarParkingSlots.push(this.controller['departments'][0].loginModule[i].loginSubModules[j].sites[k].siteId);
                localStorage.setItem('ViewCarParking', JSON.stringify(this.ViewCarParkingSlots));
              }
            }


            if (this.controller['departments'][0].loginModule[i].loginSubModules[j].subModuleName == "Allot Car Parking") {
              for (var k = 0; k < this.controller['departments'][0].loginModule[i].loginSubModules[j].sites.length; k++) {
                this.AllotCarParking.push(this.controller['departments'][0].loginModule[i].loginSubModules[j].sites[k].siteId);
                localStorage.setItem('AllotCarParking', JSON.stringify(this.AllotCarParking));
              }
            }
            if (this.controller['departments'][0].loginModule[i].loginSubModules[j].subModuleName == "View My Appointments") {
              for (var k = 0; k < this.controller['departments'][0].loginModule[i].loginSubModules[j].sites.length; k++) {
                this.Appointmentpage.push(this.controller['departments'][0].loginModule[i].loginSubModules[j].sites[k].siteId);
                localStorage.setItem('ViewMyAppointments', JSON.stringify(this.Appointmentpage));
              }
            }

            if (this.controller['departments'][0].loginModule[i].loginSubModules[j].subModuleName == "Create Appointment Time Slots") {
              for (var k = 0; k < this.controller['departments'][0].loginModule[i].loginSubModules[j].sites.length; k++) {
                this.CreateAppointmentTimeSlots.push(this.controller['departments'][0].loginModule[i].loginSubModules[j].sites[k].siteId);
                localStorage.setItem('CreateAppTimeSlots', JSON.stringify(this.CreateAppointmentTimeSlots));
              }
            }


            if (this.controller['departments'][0].loginModule[i].loginSubModules[j].subModuleName == "View Appointment Time Slots") {
              for (var k = 0; k < this.controller['departments'][0].loginModule[i].loginSubModules[j].sites.length; k++) {
                this.ViewAppointmentTimeSlots.push(this.controller['departments'][0].loginModule[i].loginSubModules[j].sites[k].siteId);
                localStorage.setItem('ViewAppTimeSlots', JSON.stringify(this.ViewAppointmentTimeSlots));
              }
            }


            if (this.controller['departments'][0].loginModule[i].loginSubModules[j].subModuleName == "Pending Modification Invoices") {
              for (var k = 0; k < this.controller['departments'][0].loginModule[i].loginSubModules[j].sites.length; k++) {
                this.PendingModificationInvoices.push(this.controller['departments'][0].loginModule[i].loginSubModules[j].sites[k].siteId);
                localStorage.setItem('Pending_Modification_Invoices', JSON.stringify(this.PendingModificationInvoices));
              }
            }

            if (this.controller['departments'][0].loginModule[i].loginSubModules[j].subModuleName == "View Appointments") {
              for (var k = 0; k < this.controller['departments'][0].loginModule[i].loginSubModules[j].sites.length; k++) {
                this.ViewAppointments.push(this.controller['departments'][0].loginModule[i].loginSubModules[j].sites[k].siteId);
                localStorage.setItem('ViewAppointments', JSON.stringify(this.ViewAppointments));
              }
            }

            if (this.controller['departments'][0].loginModule[i].loginSubModules[j].subModuleName == "View Completed Transactions") {
              for (var k = 0; k < this.controller['departments'][0].loginModule[i].loginSubModules[j].sites.length; k++) {
                this.ViewCompletedTransactions.push(this.controller['departments'][0].loginModule[i].loginSubModules[j].sites[k].siteId);
                localStorage.setItem('ViewCompletedTransactions', JSON.stringify(this.ViewCompletedTransactions));
              }
            }


            if (this.controller['departments'][0].loginModule[i].loginSubModules[j].subModuleName == "View Complaints") {
              for (var k = 0; k < this.controller['departments'][0].loginModule[i].loginSubModules[j].sites.length; k++) {
                this.ViewMyComplaints.push(this.controller['departments'][0].loginModule[i].loginSubModules[j].sites[k].siteId);
                localStorage.setItem('ViewMyComplaints', JSON.stringify(this.ViewMyComplaints));
              }
            }

            if (this.controller['departments'][0].loginModule[i].loginSubModules[j].subModuleName == "View Interest Waiver Request for Approval") {
              for (var k = 0; k < this.controller['departments'][0].loginModule[i].loginSubModules[j].sites.length; k++) {
                this.ViewInterestWaiverRequestforApproval.push(this.controller['departments'][0].loginModule[i].loginSubModules[j].sites[k].siteId);
                localStorage.setItem('Viewinterestwaiverforapprove', JSON.stringify(this.ViewInterestWaiverRequestforApproval));
              }
            }



            if (this.controller['departments'][0].loginModule[i].loginSubModules[j].subModuleName == "View My Tickets") {
              for (var k = 0; k < this.controller['departments'][0].loginModule[i].loginSubModules[j].sites.length; k++) {
                this.view_my_tickets.push(this.controller['departments'][0].loginModule[i].loginSubModules[j].sites[k].siteId);
                localStorage.setItem('view_my_tickets', JSON.stringify(this.view_my_tickets));
              }
            }


            if (this.controller['departments'][0].loginModule[i].loginSubModules[j].subModuleName == "View Interest Paid and Waived Details") {
              for (var k = 0; k < this.controller['departments'][0].loginModule[i].loginSubModules[j].sites.length; k++) {
                this.ViewInterestPaidand_WaivedDetails.push(this.controller['departments'][0].loginModule[i].loginSubModules[j].sites[k].siteId);
                localStorage.setItem('ViewInterest_Paidand_WaivedDetails', JSON.stringify(this.ViewInterestPaidand_WaivedDetails));
              }
            }

            if (this.controller['departments'][0].loginModule[i].loginSubModules[j].subModuleName == "Transaction details-Bank statement view ") {
              for (var k = 0; k < this.controller['departments'][0].loginModule[i].loginSubModules[j].sites.length; k++) {
                this.Transaction_details_bank_statement_view.push(this.controller['departments'][0].loginModule[i].loginSubModules[j].sites[k].siteId);
                localStorage.setItem('Transaction_Details_Bank_Details', JSON.stringify(this.Transaction_details_bank_statement_view));
              }
            }

            if (this.controller['departments'][0].loginModule[i].loginSubModules[j].subModuleName == "View Lead Details") {
              for (var k = 0; k < this.controller['departments'][0].loginModule[i].loginSubModules[j].sites.length; k++) {
                this.View_Lead_Details.push(this.controller['departments'][0].loginModule[i].loginSubModules[j].sites[k].siteId);
                localStorage.setItem('Apply_loan_details', JSON.stringify(this.View_Lead_Details));
              }
            }

            if (this.controller['departments'][0].loginModule[i].loginSubModules[j].subModuleName == "Pending Transactions For Approval") {
              for (var k = 0; k < this.controller['departments'][0].loginModule[i].loginSubModules[j].sites.length; k++) {
                this.Pending_Transactions_For_Approval.push(this.controller['departments'][0].loginModule[i].loginSubModules[j].sites[k].siteId);
                localStorage.setItem('Pending_Transactions_For_Approval', JSON.stringify(this.Pending_Transactions_For_Approval));
              }
            }



            if (this.controller['departments'][0].loginModule[i].loginSubModules[j].subModuleName == "View Pending transaction status") {
              for (var k = 0; k < this.controller['departments'][0].loginModule[i].loginSubModules[j].sites.length; k++) {
                this.View_Pending_transaction_status.push(this.controller['departments'][0].loginModule[i].loginSubModules[j].sites[k].siteId);
                localStorage.setItem('View_Pending_transaction_status', JSON.stringify(this.View_Pending_transaction_status));
              }
            }


            if (this.controller['departments'][0].loginModule[i].loginSubModules[j].subModuleName == "Create booking") {
              for (var k = 0; k < this.controller['departments'][0].loginModule[i].loginSubModules[j].sites.length; k++) {
                this.create_booking_controller.push(this.controller['departments'][0].loginModule[i].loginSubModules[j].sites[k].siteId);
                localStorage.setItem('Create_booking_data', JSON.stringify(this.create_booking_controller));
              }
            }


            if (this.controller['departments'][0].loginModule[i].loginSubModules[j].subModuleName == "View My Complaints") {
              for (var k = 0; k < this.controller['departments'][0].loginModule[i].loginSubModules[j].sites.length; k++) {
                this.view_my_complaints_controller.push(this.controller['departments'][0].loginModule[i].loginSubModules[j].sites[k].siteId);
                localStorage.setItem('View_My_Complaints', JSON.stringify(this.view_my_complaints_controller));
              }
            }



            if (this.controller['departments'][0].loginModule[i].loginSubModules[j].subModuleName == "Flats Availablity Details") {
              for (var k = 0; k < this.controller['departments'][0].loginModule[i].loginSubModules[j].sites.length; k++) {
                this.flats_availablity_controller.push(this.controller['departments'][0].loginModule[i].loginSubModules[j].sites[k].siteId);
                localStorage.setItem('flats_availablity_controller', JSON.stringify(this.flats_availablity_controller));
              }
            }


            if (this.controller['departments'][0].loginModule[i].loginSubModules[j].subModuleName == "Leave Update") {
              for (var k = 0; k < this.controller['departments'][0].loginModule[i].loginSubModules[j].sites.length; k++) {
                this.leave_update_controller = this.controller['departments'][0].loginModule[i].loginSubModules[j].sites[k].siteId;
                localStorage.setItem('leave_update_controller', JSON.stringify(this.leave_update_controller));
              }
            }


            if (this.controller['departments'][0].loginModule[i].loginSubModules[j].subModuleName == "Create Booking With Existing Data") {
              for (var k = 0; k < this.controller['departments'][0].loginModule[i].loginSubModules[j].sites.length; k++) {
                this.Create_Booking_With_Existing_Data.push(this.controller['departments'][0].loginModule[i].loginSubModules[j].sites[k].siteId);
                localStorage.setItem('Create_Booking_With_Existing_Data', JSON.stringify(this.Create_Booking_With_Existing_Data));
              }
            }


            if (this.controller['departments'][0].loginModule[i].loginSubModules[j].subModuleName == "Update booking") {
              for (var k = 0; k < this.controller['departments'][0].loginModule[i].loginSubModules[j].sites.length; k++) {
                this.update_booking.push(this.controller['departments'][0].loginModule[i].loginSubModules[j].sites[k].siteId);
                localStorage.setItem('update_booking', JSON.stringify(this.update_booking));
              }
            }

            if (this.controller['departments'][0].loginModule[i].loginSubModules[j].subModuleName == "View Bank Account Details") {
              for (var k = 0; k < this.controller['departments'][0].loginModule[i].loginSubModules[j].sites.length; k++) {
                this.View_Bank_Account_Details.push(this.controller['departments'][0].loginModule[i].loginSubModules[j].sites[k].siteId);
                localStorage.setItem('View_Bank_Account_Details', JSON.stringify(this.View_Bank_Account_Details));
              }
            }



            if (this.controller['departments'][0].loginModule[i].loginSubModules[j].subModuleName == "Register And Unregister Data") {
              for (var k = 0; k < this.controller['departments'][0].loginModule[i].loginSubModules[j].sites.length; k++) {
                this.Register_And_Unregister_controller.push(this.controller['departments'][0].loginModule[i].loginSubModules[j].sites[k].siteId);
                console.log(this.Register_And_Unregister_controller);

                localStorage.setItem('Register_And_Unregister_Data', JSON.stringify(this.Register_And_Unregister_controller));
              }
            }



            if (this.controller['departments'][0].loginModule[i].loginSubModules[j].subModuleName != null && this.controller['departments'][0].loginModule[i].loginSubModules[j].subModuleName != "null") {
              if (this.controller['departments'][0].loginModule[i].loginSubModules[j].subModuleName == "Module And Site Access Masters") {
                for (var k = 0; k < this.controller['departments'][0].loginModule[i].loginSubModules[j].sites.length; k++) {
                  this.module_and_site_access_masters.push(this.controller['departments'][0].loginModule[i].loginSubModules[j].sites[k].siteId);
                  localStorage.setItem('Site_Access_Masters', JSON.stringify(this.module_and_site_access_masters));
                }
              }
            }





          }
        }
        console.log(localStorage.getItem('SiteIDS_singlepage'))
        for (var i = 0; i <= this.controller['departments'][0].loginModule.length; i++) {
          for (var j = 0; j <= this.controller['departments'][0].loginModule[i].loginSubModules.length; j++) {
            for (var k = 0; k <= this.controller['departments'][0].loginModule[i].loginSubModules[j].sites.length; k++) {
              this.subcontroller.push(this.controller['departments'][0].loginModule[i].loginSubModules[j].sites[k].siteId);
              localStorage.setItem('SiteIDS', JSON.stringify(this.subcontroller));
            }
          }
        }


      } else if (resp.responseCode == 1002) {
        this.loaderhideme = false;
        $('.modal').modal('show');
        $('select').formSelect();
        $('#sel').formSelect();

        var Options = "";
        for (var i = 0; i < resp.departments.length; i++) {
          Options += "<option value='" + resp.departments[i].departmentId + ", " + resp.departments[i].departmentRoleMappingId + ", " + resp.departments[i].employeeDepartmentMappingId + ", " + resp.departments[i].roleId + ", " + resp.departments[i].employeeId + "'>" + resp.departments[i].departmentName + "</option>";
        }
        $('#sel').html(Options);
        $('#sel').formSelect();
        $("#sel").val('select');


      } else if (resp.responseCode == 435 || resp.responseCode == 535) {
        this.loaderhideme = false;
        $('.page-loader-wrapper').hide();
        swal("Error!", "Invalid Credentials.", "error");
      } else if (resp.responseCode == 700) {
        this.loaderhideme = false;
        $('.page-loader-wrapper').hide();
        swal("Error!", resp.status, "error");
      } else {
        this.loaderhideme = false;
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
      }
    },
      error => {
        this.loaderhideme = false;
        $('.page-loader-wrapper').hide();
        swal("Error!", "Intrenal server error! Please try again.", "error");
      }
    );
  }


  loginRedirction() {
    this.router.navigate(['ticket/viewticket']);
  }

  multidepartment_Submission() {
    $('.page-loader-wrapper').show();
    //  let url = "http://localhost:8080/employeeservice/login/departmentSpecificModulesSubmodules.spring";
    let url = this.cmn.commonUrl + "login/departmentSpecificModulesSubmodules.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "departmentRoleMappingId": "" + this.department_Role_Mapping_Id,
      "employeeDepartmentMappingId": "" + this.employee_Department_Mapping_Id,
      "requestUrl": "departmentSpecificModulesSubmodules",
      "departmentId": "" + this.dept_Id,
      "roleId": "" + this.role_Id,
      "employeeId": "" + this.employeeId
    }
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      sessionStorage.setItem('loginresponse', JSON.stringify(resp));
      //alert(resp.departments.length);
      if (resp.responseCode == 200) {
        sessionStorage.setItem("login_sessionkey", resp.sessionKey);
        sessionStorage.setItem("session_deptid", resp.departments[0].departmentId);
        sessionStorage.setItem("session_deptName", resp.departments[0].departmentName);
        sessionStorage.setItem("session_desigName", resp.departments[0].name);
        this.menu_array = eval('(' + sessionStorage.getItem('loginresponse') + ')');
        $('.modal').modal('hide');
        this.cmn.commonAfterLoginNavigation();
        // this.router.navigate(['leave-update']);
      } else {
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
      }
    },
      error => {
        $('.page-loader-wrapper').hide();
        swal(error);
      }
    );
  }

  departmentSelection(event) {
    //alert(event.target.value)
    let temp = event.target.value;
    this.dept_Id = temp.split(',')[0];
    this.department_Role_Mapping_Id = temp.split(',')[1];
    this.employee_Department_Mapping_Id = temp.split(',')[2];
    this.role_Id = temp.split(',')[3];
    this.employeeId = temp.split(',')[4];

  }

  forgotPassword() {
    $("#mobilenumid").val('');
    $("#otpid").val('');
    $("#createpwdid").val('');
    $("#confirmpwd").val('');
    $("#changepasswrdmodal").modal();
  }

  /*-------------------send otp start------------------*/
  sendotp_Submission() {
    if ($("#mobilenumid").val() == "") {
      swal("Please enter mobile number");
      return false;
    }

    if ($("#mobilenumid").val().length < 10) {
      swal("Mobile number should be 10 digits");
      return false;
    }


    $('.page-loader-wrapper').show();
    //  http://localhost:8181/SumadhuraGateway/employeeservice/login/sendOtpForgotPassword
    let url = this.cmn.commonUrl + "login/sendOtpForgotPassword.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "mobileNo": $("#mobilenumid").val(),
      "requestUrl": "sendOtp"

    }
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 534) {
        //  sessionStorage.setItem('shortname',)
        this.shortmobile = ($("#mobilenumid").val()).toString().substr(resp.mobileNo.length - 4)
        sessionStorage.setItem("login_sessionkey", resp.sessionKey);
        sessionStorage.setItem("login_sessionotp", resp.otp);
        swal(resp.description);
        $('#changepasswrdmodal').modal('hide');
        $("#changepasswrdmodal2").modal();
      } else if (resp.responseCode == 700) {
        swal(resp.description);
        return false;
      } else if (resp.responseCode == 502) {
        swal(resp.description);
        return false;
      } else if (resp.responseCode == 501) {
        swal(resp.description);
        return false;
      } else if (resp.responseCode == 600) {
        swal(resp.description);
        return false;
      } else if (resp.responseCode == 800) {
        swal(resp.description);
        return false;
      } else {
        swal(resp.description);
        return false;
      }
    },
      error => {
        $('.page-loader-wrapper').hide();
        swal(error);
      }
    );

  }
  /*-------------------send otp end------------------*/
  next_Submission() {
    if ($("#otpid").val() == "") {
      swal("Please enter OTP");
      return false;
    }

    $('.page-loader-wrapper').show();
    // http://localhost:8181/SumadhuraGateway/employeeservice/login/verifyOtpForgotPassword
    let url = this.cmn.commonUrl + "login/verifyOtpForgotPassword.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "otp": $("#otpid").val()
    }
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 545) {
        this.usernaame = resp.responseObjList.username;
        swal(resp.description);
        $('#changepasswrdmodal').modal('hide');
        $('#changepasswrdmodal2').modal('hide');
        $("#changepasswrdmodal3").modal();
      } else if (resp.responseCode == 546) {
        swal(resp.description);
        return false;
      } else if (resp.responseCode == 600) {
        swal(resp.errors[0]);
        return false;
      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        swal(resp.description);
        return false;
      }
    },
      error => {
        $('.page-loader-wrapper').hide();
        swal(error);
      }
    );

  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  reSend() {
    $('.page-loader-wrapper').show();
    //  http://localhost:8181/SumadhuraGateway/employeeservice/login/sendOtpForgotPassword
    let url = this.cmn.commonUrl + "login/sendOtpForgotPassword.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": sessionStorage.getItem("login_sessionkey"),
      "requestUrl": "resendOtp",
      "otp": sessionStorage.getItem("login_sessionotp"),
    }
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 534) {
        sessionStorage.setItem("login_sessionkey", resp.sessionKey);
        swal(resp.description);
        return false;
      } else if (resp.responseCode == 700) {
        swal(resp.description);
        return false;
      } else if (resp.responseCode == 600) {
        swal(resp.status);
        return false;
      } else {
        swal(resp.description);
        return false;
      }
    },
      error => {
        $('.page-loader-wrapper').hide();
        swal(error);
      }
    );
  }

  forgotpwd_save() {
    if ($("#createpwdid").val() == "") {
      swal("Please enter create password");
      return false;
    }

    if ($("#confirmpwd").val() == "") {
      swal("Please enter confirm password");
      return false;
    }

    if ($("#confirmpwd").val() != $("#createpwdid").val()) {
      swal("Confirm password should be same as Create password");
      return false;
    }
    $('.page-loader-wrapper').show();
    //  http://localhost:8181/SumadhuraGateway/employeeservice/login/changePassword.spring
    let url = this.cmn.commonUrl + "login/changePassword.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": sessionStorage.getItem("login_sessionkey"),
      "newPassword": $("#confirmpwd").val(),
      "requestUrl": "forgotPassword"
    }
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#changepasswrdmodal3').modal('hide');
        swal("Your password has been changed successfully !!");
      } else if (resp.responseCode == 600) {
        swal(resp.status);
        return false;
      } else if (resp.responseCode == 800) {
        swal(resp.description);
        return false;
      } else {
        swal(resp.description);
        return false;
      }
    },
      error => {
        $('.page-loader-wrapper').hide();
        swal(error);
      }
    );

  }






}
