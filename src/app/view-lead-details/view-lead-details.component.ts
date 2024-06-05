import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router, RoutesRecognized } from "@angular/router";
import { CommonComponent } from '../common/common.component';
import { Http, RequestOptions, Headers } from '@angular/http';
import { ViewLeadDetailsService } from './view-lead-details.service';

declare const $: any;
declare const swal: any;
var selected_projectid;
var flatSelection;
var customerSelection;
var Bank_name_Selection;
@Component({
  selector: 'app-view-lead-details',
  templateUrl: './view-lead-details.component.html',
  styleUrls: ['./view-lead-details.component.sass']
})
export class ViewLeadDetailsComponent implements OnInit {
  fg: FormGroup;
  leadidval: any;
  sitename: any;
  startdata: any;
  enddate: any;
  customer_name_value: any;
  flat_number: any;
  blockname: any;
  statusname: string;
  Bank_name_list: any;
  siteids: any;
  bookingform_id: any;
  customerSelection: any;
  bankerlistId: any;
  leadfromdate: any;
  leadtodate: any;
  customerLoan_edit_id: any;
  Tablecontroller: Array<any> = [];
  notbutton: boolean;
  status_name_backoption: string;
  constructor(private cmn: CommonComponent, private http: Http, private formBuilder: FormBuilder, private service: ViewLeadDetailsService,
    private router: Router) {
    this.siteList();
    this.get_bank_details();
  }

  ngOnInit() {

    this.fg = new FormGroup(
      {
        from: new FormControl(""),
        to: new FormControl("")
      },
      [Validators.required, this.dateRangeValidator]
    );



    $("#Customer_name").select2({
      placeholder: "--Select--",
      dir: "ltl"
    });


    $("#StatusId").select2({
      placeholder: "--Select--",
      dir: "ltl"
    });

    $("#project_names").select2({
      placeholder: "--Select--",
      dir: "ltl"
    });

    $("#flatSelection").select2({
      placeholder: "--Select--",
      dir: "ltl"
    });

    $("#Bank_name").select2({
      placeholder: "--Select--",
      dir: "ltl"
    });


    var self = this;

    $(function () {
      $('#project_names').change(function (e) {
        selected_projectid = $(e.target).val();
        if (selected_projectid == "select") {


          sessionStorage.removeItem("back_siteid");
          sessionStorage.removeItem("back_bookingform_id");
          sessionStorage.removeItem("back_customer_selection");
         sessionStorage.removeItem("back_banker_list_id");
         // sessionStorage.removeItem("back_customer_editid");



          $("#flatSelection option[value]").remove();
          self.customerautofield('');
        } else {
          self.flatsitewisechange(selected_projectid);
          self.customerautofield(selected_projectid);
        }
      })


      $('#flatSelection').change(function (e) {
        flatSelection = $(e.target).val();
        if (flatSelection == "select") {


          sessionStorage.removeItem("back_bookingform_id");


        } else {
        }
      })

      $('#Customer_name').change(function (e) {
        customerSelection = $(e.target).val();
        if (customerSelection == "select") {

          sessionStorage.removeItem("back_customer_selection");


        } else {
        }
      })


      $('#Bank_name').change(function (e) {
        Bank_name_Selection = $(e.target).val();
        if (Bank_name_Selection == "select") {

          sessionStorage.removeItem("back_banker_list_id");


        } else {
        }
      })


    });




    if (sessionStorage.getItem("view_lead_details") == "ApplyLoan") {


      if (sessionStorage.getItem("back_siteid") != null && sessionStorage.getItem("back_siteid") != "null") {
        this.siteids = [sessionStorage.getItem("back_siteid")]
      } else {
        this.siteids = null;
      }

      if (sessionStorage.getItem("back_bookingform_id") != null && sessionStorage.getItem("back_bookingform_id") != "null") {
        this.bookingform_id = sessionStorage.getItem("back_bookingform_id")
      } else {
        this.bookingform_id = null;
      }

      if (sessionStorage.getItem("back_customer_selection") != null && sessionStorage.getItem("back_customer_selection") != "null") {
        this.customerSelection = sessionStorage.getItem("back_customer_selection")
      } else {
        this.customerSelection = null;
      }

      console.log(sessionStorage.getItem("back_banker_list_id"));

      if (sessionStorage.getItem("back_banker_list_id") != null && sessionStorage.getItem("back_banker_list_id") != "null") {
        this.bankerlistId = sessionStorage.getItem("back_banker_list_id")

       
      } else {
        this.bankerlistId = null;
      }

      if(sessionStorage.getItem("back_leadval") != null && sessionStorage.getItem("back_leadval") != "null"){
        $("#LeadID").val(sessionStorage.getItem("back_leadval"));
      }

      if (sessionStorage.getItem("back_lead_fromdate") != null && sessionStorage.getItem("back_lead_fromdate") != "null") {
        this.leadfromdate = sessionStorage.getItem("back_lead_fromdate");

        $(function () {
          $("#fromDate").val(sessionStorage.getItem("back_lead_fromdate"));
        });
      } else {
        this.leadfromdate = null;
      }

      if (sessionStorage.getItem("back_leadtodate") != null && sessionStorage.getItem("back_leadtodate") != "null") {
        this.leadtodate = sessionStorage.getItem("back_leadtodate");

        $(function () {
          $("#toDate").val(sessionStorage.getItem("back_leadtodate"));
        });


      } else {
        this.leadtodate = null;
      }

      if (sessionStorage.getItem("back_customer_editid") != null && sessionStorage.getItem("back_customer_editid") != "null") {
        this.customerLoan_edit_id = sessionStorage.getItem("back_customer_editid")
      } else {
        this.customerLoan_edit_id = null;
      }




      if (this.siteids == null && this.bookingform_id == null && this.customerSelection == null &&
        this.bankerlistId == null && this.leadfromdate == null && this.leadtodate == null && this.customerLoan_edit_id == null) {
        this.status_name_backoption = "UnreadBankerList";
        this.notbutton = true;
      } else {
        this.status_name_backoption = "AllLeadDetails";
        this.notbutton = false;
      }


      $('#tableExport').DataTable().destroy();
      $('.page-loader-wrapper').show();
      this.service.searchsubmitfun(this.siteids, this.customerSelection, this.bookingform_id, this.customerLoan_edit_id, this.leadfromdate, this.leadtodate, this.bankerlistId, this.status_name_backoption).then(resp => {

        console.log(resp);
        this.Tablecontroller = [];
        $('.page-loader-wrapper').hide();
        if (resp.responseCode == 200) {
          this.Tablecontroller = resp.responseObjList;

          console.log(this.Tablecontroller);

          setTimeout(function () {
            $(document).ready(function () {
              $('#tableExport').DataTable({
                pageLength: 10,
                lengthMenu: [[10, 20, -1], [10, 20, 'Todos']],
                dom: 'Bfrltip',
                buttons: [
                  'copy', 'csv', 'print', {
                    extend: 'pdfHtml5',
                    orientation: 'landscape',
                    pageSize: 'LEGAL',
                    footer: true,
                  },
                  { extend: 'excelHtml5', footer: true },
                ],

                retrieve: true,

                "scrollCollapse": true,

                "autoWidth": false,
                "iCookieDuration": 60,
                "bStateSave": true,

                "fnStateSave": function (oSettings, oData) {
                  localStorage.setItem('offersDataTables', JSON.stringify(oData));
                },
                "fnStateLoad": function (oSettings) {
                  return JSON.parse(localStorage.getItem('offersDataTables'));
                },

              });
            });
          }, 1000)
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
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
      );

    } else if (sessionStorage.getItem("session_deptid") == "984" && sessionStorage.getItem("session_roleId") == "21") {
      this.get_view_lead_detailsfun();
    }








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

  startdatefun() {
    $("#fromDate").val("");

    sessionStorage.removeItem("back_lead_fromdate");
    
  }

  endtimefun() {
    $("#toDate").val("");
    sessionStorage.removeItem("back_leadtodate");
  }

  // ClearAll() {

  //   $("#fromDate").val("");
  //   $("#toDate").val("");
  //   $("#project_names").val(['select']);
  //   $("#project_names").trigger('change');

  //   $("#Leadid").val(['select']);
  //   $("#Leadid").trigger('change');

  //   $("#Customer_name").val(['select']);
  //   $("#Customer_name").trigger('change');

  //   $("#flatSelection").val(['select']);
  //   $("#flatSelection").trigger('change');

  // }



  /*-----------------Getting Project(site) list Start---------------------*/
  siteList() {
    var arr = localStorage.getItem('Apply_loan_details');
    $('.page-loader-wrapper').show();
    this.service.ProjectDetails(JSON.parse(arr).map(String)).then(resp => {
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#project_names').html("");
        $('#project_names').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#project_names').append("<option value='" + resp.responseObjList[i].id + "'>" + resp.responseObjList[i].name + "</option>");
        }

        console.log(sessionStorage.getItem("back_siteid"));

        if (sessionStorage.getItem("back_siteid") != null && sessionStorage.getItem("back_siteid") != "null") {
          $('#project_names').val(sessionStorage.getItem("back_siteid"));
          this.flatsitewisechange(sessionStorage.getItem("back_siteid"));
          this.customerautofield(sessionStorage.getItem("back_siteid"));
          this.get_bank_details();
        }
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

  flatsitewisechange(siteid) {
    $('.page-loader-wrapper').show();
    this.service.Select_Flat_Details(siteid).then(resp => {
      console.log(resp);
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#flatSelection').html("");
        $('#flatSelection').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#flatSelection').append("<option value='" + resp.responseObjList[i].detId + "'>" + resp.responseObjList[i].name + "</option>");
        }

        if (sessionStorage.getItem("back_bookingform_id") != null && sessionStorage.getItem("back_bookingform_id") != "null") {
          $('#flatSelection').val(sessionStorage.getItem("back_bookingform_id"))
        }
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




  customerautofield(SiteIDS) {

    console.log(SiteIDS);
    $(".page-loader-wrapper").show();

    this.service.GetCustomernamefun(sessionStorage.getItem("login_sessionkey"), "", SiteIDS).then(resp => {
      console.log(resp);

      $(".page-loader-wrapper").hide();

      if (resp.responseCode == 200) {

        $('#Customer_name').html("");
        $('#Customer_name').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.referedCustomer.length; i++) {
          $('#Customer_name').append("<option value='" + resp.responseObjList.referedCustomer[i].custId + "'>" + resp.responseObjList.referedCustomer[i].siteNameCustomerFlatNo + "</option>");
        }

        console.log(sessionStorage.getItem("back_customer_selection"));
        if (sessionStorage.getItem("back_customer_selection") != null && sessionStorage.getItem("back_customer_selection") != "null") {
          $('#Customer_name').val(sessionStorage.getItem("back_customer_selection"));
        }

      } else if (resp.responseCode == 440) {
        swal("Error!", "Your session has been expired.", "error");
        this.router.navigate([""]);
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



  get_bank_details() {

    $('.page-loader-wrapper').show();
    this.service.Bank_Details().then(resp => {
      console.log(resp);
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#Bank_name').html("");
        $('#Bank_name').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.bankerList.length; i++) {
          $('#Bank_name').append("<option value='" + resp.responseObjList.bankerList[i].bankerListId + "'>" + resp.responseObjList.bankerList[i].bankerName + "</option>");
        }

        if (sessionStorage.getItem("back_banker_list_id") != null && sessionStorage.getItem("back_banker_list_id") != "null") {
          $('#Bank_name').val(sessionStorage.getItem("back_banker_list_id"));
        }


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



  get_view_lead_detailsfun() {

    $('.page-loader-wrapper').show();
    this.service.searchsubmitfun(null, null, null, null, null, null, null, 'UnreadBankerList').then(resp => {

      console.log(resp);
      this.Tablecontroller = [];
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        this.Tablecontroller = resp.responseObjList;
        this.notbutton = true;
        console.log(this.Tablecontroller);

        setTimeout(function () {
          $(document).ready(function () {
            $('#tableExport').DataTable({
              pageLength: 10,
              lengthMenu: [[10, 20, -1], [10, 20, 'Todos']],
              dom: 'Bfrltip',
              buttons: [
                'copy', 'csv', 'print', {
                  extend: 'pdfHtml5',
                  orientation: 'landscape',
                  pageSize: 'LEGAL',
                  footer: true,
                },
                { extend: 'excelHtml5', footer: true },
              ],

              retrieve: true,

              "scrollCollapse": true,

              "autoWidth": false,
              "iCookieDuration": 60,
              "bStateSave": true,

              "fnStateSave": function (oSettings, oData) {
                localStorage.setItem('offersDataTables', JSON.stringify(oData));
              },
              "fnStateLoad": function (oSettings) {
                return JSON.parse(localStorage.getItem('offersDataTables'));
              },

            });
          });
        }, 1000)
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
      if (error == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      }
    }
    );

  }


  searchfunction() {
    $('#tableExport').DataTable().destroy();
    this.leadidval = $("#LeadID").val();
    this.sitename = $("#project_names").val();
    this.startdata = $("#fromDate").val();
    this.enddate = $("#toDate").val();
    this.customer_name_value = $("#Customer_name").val();
    this.flat_number = $("#flatSelection").val();
    this.Bank_name_list = $("#Bank_name").val();

console.log(this.leadidval);
    console.log(this.customer_name_value);


    if (this.leadidval == undefined || this.leadidval == "") {
      this.leadidval = "";

    
     sessionStorage.removeItem("back_customer_editid")
    }


    if (this.leadidval == "" && this.sitename == "select" && this.startdata == "" && this.enddate == "" && this.customer_name_value == null && this.flat_number == null && this.Bank_name_list == "select") {
      swal("Please select any option to continue!");
      return false;
    }

    var startdate = $('#fromDate').val();
    var endDate = $('#toDate').val();
    if (new Date(startdate) > new Date(endDate)) {
      swal('Please select  a valid from and to date');
      return false;
    }

    if (selected_projectid == "" && sessionStorage.getItem("back_siteid") == "" || selected_projectid == undefined && sessionStorage.getItem("back_siteid") == undefined || selected_projectid == "undefined" && sessionStorage.getItem("back_siteid") == "undefined" || selected_projectid == "select" && sessionStorage.getItem("back_siteid") == "select" || selected_projectid == null && sessionStorage.getItem("back_siteid") == null) {
      this.siteids = null;
    } else {

      if (selected_projectid == undefined) {
        this.siteids = [sessionStorage.getItem("back_siteid")];
      } else {
        this.siteids = [selected_projectid];
      }

    }

    if (flatSelection == "" && sessionStorage.getItem("back_bookingform_id") == "" || flatSelection == undefined && sessionStorage.getItem("back_bookingform_id") == undefined || flatSelection == "undefined" && sessionStorage.getItem("back_bookingform_id") == "undefined" || flatSelection == "select" && sessionStorage.getItem("back_bookingform_id") == "select" || flatSelection == null && sessionStorage.getItem("back_bookingform_id") == null) {
      this.bookingform_id = null;
    } else {

      if (flatSelection == undefined) {
        this.bookingform_id = sessionStorage.getItem("back_bookingform_id");
      } else {
        this.bookingform_id = flatSelection;
      }

    }


    if (customerSelection == "" && sessionStorage.getItem("back_customer_selection") == "" || customerSelection == undefined && sessionStorage.getItem("back_customer_selection") == undefined || customerSelection == "undefined" && sessionStorage.getItem("back_customer_selection") == "undefined" || customerSelection == "select" && sessionStorage.getItem("back_customer_selection") == "select" || customerSelection == null && sessionStorage.getItem("back_customer_selection") == null) {
      this.customerSelection = null;
    } else {

      if (customerSelection == undefined) {
        this.customerSelection = sessionStorage.getItem("back_customer_selection");
      } else {
        this.customerSelection = customerSelection;
      }


    }

    if (Bank_name_Selection == "" && sessionStorage.getItem("back_banker_list_id") == "" || Bank_name_Selection == undefined && sessionStorage.getItem("back_banker_list_id") == undefined || Bank_name_Selection == "undefined" && sessionStorage.getItem("back_banker_list_id") == "undefined" || Bank_name_Selection == "select" && sessionStorage.getItem("back_banker_list_id") == "select" || Bank_name_Selection == null && sessionStorage.getItem("back_banker_list_id") == null) {
      this.bankerlistId = null;
    } else {
      if (Bank_name_Selection == undefined) {
        this.bankerlistId = sessionStorage.getItem("back_banker_list_id");
      } else {
        this.bankerlistId = Bank_name_Selection;
      }

    }



    if ($("#fromDate").val() == "" && sessionStorage.getItem("back_lead_fromdate") == "" || $("#fromDate").val() == undefined && sessionStorage.getItem("back_lead_fromdate") == undefined || $("#fromDate").val() == "undefined" && sessionStorage.getItem("back_lead_fromdate") == "undefined" || $("#fromDate").val() == "select" && sessionStorage.getItem("back_lead_fromdate") == "select" || $("#fromDate").val() == null && sessionStorage.getItem("back_lead_fromdate") == null) {
      this.leadfromdate = null;
    } else {

      if ($("#fromDate").val() == "") {
        this.leadfromdate = sessionStorage.getItem("back_lead_fromdate");
      } else {
        this.leadfromdate = $("#fromDate").val();
      }

    }

    if ($('#toDate').val() == "" && sessionStorage.getItem("back_leadtodate") == "" || $('#toDate').val() == undefined && sessionStorage.getItem("back_leadtodate") == undefined || $('#toDate').val() == "undefined" && sessionStorage.getItem("back_leadtodate") == "undefined" || $('#toDate').val() == "select" && sessionStorage.getItem("back_leadtodate") == "select" || $('#toDate').val() == null && sessionStorage.getItem("back_leadtodate") == null) {
      this.leadtodate = null;
    } else {

      if ($('#toDate').val() == "") {
        this.leadtodate = sessionStorage.getItem("back_leadtodate");
      } else {
        this.leadtodate = $('#toDate').val();
      }


    }

    if ($('#LeadID').val() == "" && sessionStorage.getItem("back_customer_editid") == "" || $('#LeadID').val() == undefined && sessionStorage.getItem("back_customer_editid") == undefined || $('#LeadID').val() == "undefined" && sessionStorage.getItem("back_customer_editid") == "undefined" || $('#LeadID').val() == "select" && sessionStorage.getItem("back_customer_editid") == "select" && $('#LeadID').val() == null && sessionStorage.getItem("back_customer_editid") == null) {
      this.customerLoan_edit_id = null;
    } else {

      if ($('#LeadID').val() == "") {
        this.customerLoan_edit_id = sessionStorage.getItem("back_customer_editid");
      } else {
        this.customerLoan_edit_id = $('#LeadID').val();
      }

    }

    if (this.siteids == "select") {
      this.siteids = null;
    }

    if (this.bookingform_id == "select") {
      this.bookingform_id = null;
    }

    if (this.customerSelection == "select") {
      this.customerSelection = null;
    }

    if (this.bankerlistId == "select") {
      this.bankerlistId = null;
    }

    if (this.leadfromdate == "select") {
      this.leadfromdate = null;
    }

    if (this.leadtodate == "select") {
      this.leadtodate = null;
    }


    if (this.customerLoan_edit_id == "select") {
      this.customerLoan_edit_id = null;
    }

    if (this.leadfromdate == "null") {
      this.leadfromdate = null;
    }

    if (this.leadtodate == "null") {
      this.leadtodate = null;
    }


    if(this.customerLoan_edit_id == "null"){
      this.customerLoan_edit_id = null;
    }

    if(this.bankerlistId == "null"){
      this.bankerlistId = null;
    }

    if(this.customerSelection == "null"){
      this.customerSelection = null;
    }

    if(this.bookingform_id == "null"){
      this.bookingform_id = null;
    }

    $('#tableExport').DataTable().destroy();
    $('.page-loader-wrapper').show();
    this.service.searchsubmitfun(this.siteids, this.customerSelection, this.bookingform_id, this.customerLoan_edit_id, this.leadfromdate, this.leadtodate, this.bankerlistId, 'AllLeadDetails').then(resp => {

      console.log(resp);
      this.Tablecontroller = [];
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        this.Tablecontroller = resp.responseObjList;
        this.notbutton = false;
        console.log(this.Tablecontroller);

        setTimeout(function () {
          $(document).ready(function () {
            $('#tableExport').DataTable({
              pageLength: 10,
              lengthMenu: [[10, 20, -1], [10, 20, 'Todos']],
              dom: 'Bfrltip',
              buttons: [
                'copy', 'csv', 'print', {
                  extend: 'pdfHtml5',
                  orientation: 'landscape',
                  pageSize: 'LEGAL',
                  footer: true,
                },
                { extend: 'excelHtml5', footer: true },
              ],

              retrieve: true,

              "scrollCollapse": true,

              "autoWidth": false,
              "iCookieDuration": 60,
              "bStateSave": true,

              "fnStateSave": function (oSettings, oData) {
                localStorage.setItem('offersDataTables', JSON.stringify(oData));
              },
              "fnStateLoad": function (oSettings) {
                return JSON.parse(localStorage.getItem('offersDataTables'));
              },

            });
          });
        }, 1000)
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
      if (error == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      }
    }
    );
  }


  homeClick() {
    // this.router.navigate(['leave-update']);
    this.router.navigate(['dashboard']);
  }


  view_details_updatefun(userdata, index) {
    sessionStorage.setItem("getdetails", JSON.stringify(userdata));
    if (this.siteids == undefined) {
      this.siteids = null;
    }

    if (this.bookingform_id == undefined) {
      this.bookingform_id = null;
    }

    if (this.customerSelection == undefined) {
      this.customerSelection = null;
    }

    if (this.bankerlistId == undefined) {
      this.bankerlistId = null;
    }

    if (this.leadfromdate == undefined) {
      this.leadfromdate = null;
    }

    if (this.leadtodate == undefined) {
      this.leadtodate = null;
    }

    if (this.customerLoan_edit_id == undefined) {
      this.customerLoan_edit_id = null;
    }
    if (this.leadidval == undefined) {
      this.leadidval = null;
    }


    console.log(this.leadidval);
    console.log(this.customerSelection);

    sessionStorage.setItem("back_leadval", this.leadidval);
    sessionStorage.setItem("back_siteid", this.siteids);
    sessionStorage.setItem("back_bookingform_id", this.bookingform_id);
    sessionStorage.setItem("back_customer_selection", this.customerSelection);
    sessionStorage.setItem("back_banker_list_id", this.bankerlistId);
    sessionStorage.setItem("back_lead_fromdate", this.leadfromdate);
    sessionStorage.setItem("back_leadtodate", this.leadtodate);
    sessionStorage.setItem("back_customer_editid", this.customerLoan_edit_id);
    sessionStorage.setItem("view_lead_details", "ApplyLoan");

    this.router.navigate(['view-lead-update-details']);
  }

}
