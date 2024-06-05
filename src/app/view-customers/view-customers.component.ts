import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, RequestOptions, Headers } from '@angular/http';
import { CommonComponent } from '../common/common.component';
import { ActivatedRoute, RoutesRecognized } from "@angular/router";
import { filter, pairwise } from 'rxjs/operators';
declare const $: any;
declare const swal: any;
var selected_projectid;
var fromDate;
var toDate;

var selected_statusID;

@Component({
  selector: 'app-view-customers',
  templateUrl: './view-customers.component.html',
  styleUrls: ['./view-customers.component.sass']
})
export class ViewCustomersComponent implements OnInit {
  tabledata: Array<any> = [];
  closingBalanceData: Array<any> = [];
  approveCustData: any;
  salesowner_Demo: Array<any> = [];
  projectId: any;
  previousUrl: any;
  currentUrl: any;
  statusId: string;
  buttonVisible: boolean;
  columnVisible: boolean;
  sessionRoleId: any
  sessionDeptId: any
  singledd2 = {};
  controller_blocks_list: Array<any> = [];
  block_controller_data: Array<any> = [];
  block_controller_name: Array<any> = [];
  block_new_site_creation: Array<any> = [];
  floor_list_name: Array<any> = [];
  flat_list_name: Array<any> = [];
  salesowner_list_name: Array<any> = [];
  block_list_name: Array<any> = [];
  floor_controller_data: Array<any> = [];
  flat_controller_data: Array<any> = [];
  salesowner_controller_data: Array<any> = [];
  controller_saleowner_list: Array<any> = [];
  singledd5: {};
  salesowner_new_site_creation: Array<any> = [];
  project_list_name_demo: Array<any> = [];
  sales_owner_wise_array: Array<any> = [];
  chi_controller: Array<any> = [];
  block_controller_data_fcm: any;
  salesowner_controller_data_fcm: any;
  demo_sas: any;
  sum_controller_data: any;
  status: string;
  startdate: string;
  endDate: string;


  constructor(private router: Router, private http: Http, public cmn: CommonComponent) {
    $('.page-loader-wrapper').hide();
    this.singledd2 = {
      singleSelection: false,
      enableSearchFilter: true,
      searchPlaceholderText: 'Search',
      classes: 'my_dropdown1',
      unSelectAllText: 'UnSelect All',
    };

    this.singledd5 = {
      singleSelection: false,
      enableSearchFilter: true,
      searchPlaceholderText: 'Search',
      classes: 'my_dropdown1',
      unSelectAllText: 'UnSelect All',
    };
    this.siteList();

    if (sessionStorage.getItem('fromviewpagepredefined') == "true") {

      // console.log(sessionStorage.getItem('prjctIDSeesion'));
      // console.log(sessionStorage.getItem('block_wise_list'));
      // console.log(sessionStorage.getItem('sales_array'));
      console.log(sessionStorage.getItem('statusIDSeesion'));
      // console.log(sessionStorage.getItem('startdate_approve'));
      // console.log(sessionStorage.getItem('enddate_approve'));

      if (sessionStorage.getItem('prjctIDSeesion') != "" && sessionStorage.getItem('prjctIDSeesion') != null && sessionStorage.getItem('prjctIDSeesion') != "null"
        && sessionStorage.getItem('prjctIDSeesion') != undefined && sessionStorage.getItem('prjctIDSeesion') != "undefined") {
        this.projectId = sessionStorage.getItem('prjctIDSeesion');
      } else {
        this.projectId = null;
      }

      if (sessionStorage.getItem('block_wise_list') != "" && sessionStorage.getItem('block_wise_list') != null && sessionStorage.getItem('block_wise_list') != "null"
        && sessionStorage.getItem('block_wise_list') != undefined && sessionStorage.getItem('block_wise_list') != "undefined" && JSON.parse(sessionStorage.getItem('block_wise_list')).length != 0) {

        this.block_controller_data = [];

        for (var i = 0; i < JSON.parse(sessionStorage.getItem('block_wise_list')).length; i++) {
          this.block_controller_data.push(JSON.parse(sessionStorage.getItem('block_wise_list'))[i].id);
        }

      } else {
        this.block_controller_data = null;
        this.block_controller_name = [];
      }


      if (sessionStorage.getItem('sales_array') != "" && sessionStorage.getItem('sales_array') != null && sessionStorage.getItem('sales_array') != "null"
        && sessionStorage.getItem('sales_array') != undefined && sessionStorage.getItem('sales_array') != "sales_array" && JSON.parse(sessionStorage.getItem('sales_array'))) {
        this.salesowner_controller_data = [];

        for (var i = 0; i < JSON.parse(sessionStorage.getItem('sales_array')).length; i++) {
          this.salesowner_controller_data.push(JSON.parse(sessionStorage.getItem('sales_array'))[i].id);
        }

      } else {
        this.salesowner_controller_data = [];
      }

      if (sessionStorage.getItem('statusIDSeesion') != "" && sessionStorage.getItem('statusIDSeesion') != null && sessionStorage.getItem('statusIDSeesion') != "null" && sessionStorage.getItem('statusIDSeesion') != "select"
        && sessionStorage.getItem('statusIDSeesion') != undefined && sessionStorage.getItem('statusIDSeesion') != "undefined") {
        this.status = sessionStorage.getItem('statusIDSeesion');
      } else {
        this.status = null;
      }

      $(function () {
        if (sessionStorage.getItem("enddate_approve") == null) {
        } else {
          $("#toDate").val(sessionStorage.getItem("enddate_approve"))
        }
        if (sessionStorage.getItem("startdate_approve") == null) {
        } else {
          $("#fromDate").val(sessionStorage.getItem("startdate_approve"))
        }

      });


      if (sessionStorage.getItem('startdate_approve') != "" && sessionStorage.getItem('startdate_approve') != null && sessionStorage.getItem('startdate_approve') != "null"
        && sessionStorage.getItem('startdate_approve') != undefined && sessionStorage.getItem('startdate_approve') != "undefined") {
        this.startdate = sessionStorage.getItem('startdate_approve');
      } else {
        this.startdate = null;
      }


      if (sessionStorage.getItem('enddate_approve') != "" && sessionStorage.getItem('enddate_approve') != null && sessionStorage.getItem('enddate_approve') != "null"
        && sessionStorage.getItem('enddate_approve') != undefined && sessionStorage.getItem('enddate_approve') != "undefined") {
        this.endDate = sessionStorage.getItem('enddate_approve')
      } else {
        this.endDate = null;
      }

      console.log(this.projectId);
      console.log(this.block_controller_data);
      console.log(this.salesowner_controller_data);
      console.log(this.status);
      console.log(this.startdate);
      console.log(this.endDate);

      this.getApproveCustomerList(this.projectId, this.block_controller_data, this.salesowner_controller_data, this.status, this.startdate, this.endDate);

      this.projectchangeFun(sessionStorage.getItem('prjctIDSeesion'));
    }




  }
  ngOnInit() {
    var self = this;
    $(function () {

      $("#projectID").select2({
        placeholder: "--Select--",
        dir: "ltl",
      });

      $("#statusID").select2({
        placeholder: "--Select--",
        dir: "ltl",
      });

      $('#projectID').change(function (e) {
        selected_projectid = $(e.target).val();
        console.log(selected_projectid);
        if (selected_projectid == "select") {

          self.block_list_name = [];
          self.salesowner_list_name = [];
          self.salesowner_controller_data = [];
          self.block_controller_data = [];

          sessionStorage.removeItem('sales_array');
          sessionStorage.removeItem('block_wise_list');
          sessionStorage.removeItem('prjctIDSeesion');
          self.projectchangeFun(selected_projectid);
          self.getsaleownerlist(null, null, null, null);

        } else {

          self.block_list_name = [];
          self.salesowner_list_name = [];
          self.salesowner_controller_data = [];
          self.block_controller_data = [];
          sessionStorage.removeItem('sales_array');
          sessionStorage.removeItem('block_wise_list');
          sessionStorage.removeItem('prjctIDSeesion');
          self.projectchangeFun(selected_projectid);
          self.getsaleownerlist(selected_projectid, null, null, null);

        }
      })

      $('#statusID').change(function (e) {
        selected_statusID = $(e.target).val();
        if (selected_statusID == "select") {

        } else {

        }
      })
    })



    this.sessionRoleId = sessionStorage.getItem('session_roleId');
    this.sessionDeptId = sessionStorage.getItem("session_deptid");
    console.log("role-id" + this.sessionRoleId, "dept-id" + this.sessionDeptId)

    if ((this.sessionRoleId == "4" && this.sessionDeptId == "997") || (this.sessionRoleId == "16" && this.sessionDeptId == "988") || (this.sessionRoleId == "12" && this.sessionDeptId == "995") || (this.sessionRoleId == "8" && this.sessionDeptId == "993") || (this.sessionRoleId == "14" && this.sessionDeptId == "994") || (this.sessionRoleId == "15" && this.sessionDeptId == "988") || (this.sessionRoleId == "17" && this.sessionDeptId == "988") || (this.sessionRoleId == "11" && this.sessionDeptId == "989")) {

      this.buttonVisible = true
      this.columnVisible = true
    } else {

      this.buttonVisible = false
      this.columnVisible = false
    }


    if ((this.sessionRoleId == "1" && this.sessionDeptId == "995") || (this.sessionRoleId == "8" && this.sessionDeptId == "993") || (this.sessionRoleId == "20" && this.sessionDeptId == "993")) {
      this.buttonVisible = true
      this.columnVisible = false
    }
  }


  getApproveCustomerList(selected_projectid, block_controller_data, salesowner_controller_data, status, start, end) {

    console.log(salesowner_controller_data);

    if (start == null) {
      start = null
    } else {
      start = new Date(start).getTime();
    }

    if (end == null) {
      end = null
    } else {
      end = new Date(end).getTime();
    }
    if (sessionStorage.getItem('fromviewpagepredefined') == "true") {
      this.projectId = sessionStorage.getItem('prjctIDSeesion');
    } else {
      this.projectId = selected_projectid
    }


    console.log(this.projectId);

    $('.page-loader-wrapper').show();
    $('#tableExport').DataTable().destroy();
    $('#tabledownload').DataTable().destroy();
    let url = this.cmn.commonUrl + "bookingFormService/getFormsList.spring";
    var body = {
      "statusId": status,
      "siteId": selected_projectid,
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "startDate": start,
      "endDate": end,
      "actionStr": "viewAllCustomers",
      "requestUrl": "getFormsList",
      "blockIds": block_controller_data,
      "flatSaleOwnerIds": salesowner_controller_data
    }

    console.log(body);


    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        this.tabledata = [];
        this.closingBalanceData = [];

        if (resp.applicantInfo == null) {
          this.tabledata = [];
        } else {
          this.tabledata = resp.applicantInfo;
        }
        setTimeout(function () {

          $("#downloaddiv").hide()
          $("#prevdiv").show();

          $(document).ready(function () {
            $('#tableExport').DataTable({
              pageLength: 5,
              lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todos']],
              dom: 'Bfrltip',
              buttons: [
                'copy', 'csv', 'excel', 'print', {
                  extend: 'pdfHtml5',
                  title: function () {
                    return "ABCDE List";
                  },
                  orientation: 'landscape',
                  pageSize: 'A1',
                  text: '<i class="fa fa-file-pdf-o"> PDF</i>',
                  titleAttr: 'PDF'
                },
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
            }).draw();

          });
        }, 2000)







      } else if (resp.responseCode == 440) {
        swal("Error!", "Your session has been expired.", "error");
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

      }
    );
  }

  getApproveCustomer(data) {
    if (sessionStorage.getItem('fromviewpagepredefined') == "true") {
    } else {
      sessionStorage.setItem('prjctIDSeesion', $("#projectID").val());
      sessionStorage.setItem('statusIDSeesion', $("#statusID").val());
    }
    $('.page-loader-wrapper').show();
    var flatBookingId = data.flatBookingId;
    var cutID = data.customerId;
    let url = this.cmn.commonUrl + "bookingFormService/getBookingDetails.spring";
    console.log("url :" + url);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "customerId": cutID,
      "flatBookingId": flatBookingId,
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "requestUrl": "getBookingDetails"
    }

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        this.approveCustData = resp;
        // sessionStorage.setItem('approveCustData', JSON.stringify(this.approveCustData));
        //   sessionStorage.setItem('getPageName', "viewCustomerPage");
        // this.router.navigate(['approvebooking'], { state: this.approveCustData });

        var flatBookingId = data.flatBookingId;
        var cutID = data.customerId;

        sessionStorage.setItem("custId", cutID)
        sessionStorage.setItem("flatBookingId", flatBookingId)
        this.router.navigate(['approvebooking']);

        this.router.navigate(['/approvebooking'], { queryParams: { id: "Update Booking" } });


        sessionStorage.setItem('fromviewpagepredefined', "true");

        console.log(sessionStorage.getItem('prjctIDSeesion'));
        console.log(selected_projectid);

        if (sessionStorage.getItem('prjctIDSeesion') != "" && sessionStorage.getItem('prjctIDSeesion') != null && sessionStorage.getItem('prjctIDSeesion') != "null"
          && sessionStorage.getItem('prjctIDSeesion') != undefined && sessionStorage.getItem('prjctIDSeesion') != "undefined") {
          this.projectId = sessionStorage.getItem('prjctIDSeesion');
          sessionStorage.setItem("prjctIDSeesion", this.projectId);
        } else {
          this.projectId = selected_projectid;
          sessionStorage.setItem("prjctIDSeesion", this.projectId);
        }

        console.log(sessionStorage.getItem('block_wise_list'));
        console.log(this.block_new_site_creation);
        console.log(this.block_controller_data);

        if (sessionStorage.getItem('block_wise_list') != "" && sessionStorage.getItem('block_wise_list') != null && sessionStorage.getItem('block_wise_list') != "null"
          && sessionStorage.getItem('block_wise_list') != undefined && sessionStorage.getItem('block_wise_list') != "undefined") {

          if (this.block_new_site_creation.length == 0) {
            this.block_controller_data = [];
            for (var i = 0; i < JSON.parse(sessionStorage.getItem('block_wise_list')).length; i++) {
              this.block_controller_data.push(JSON.parse(sessionStorage.getItem('block_wise_list'))[i].id);
            }

            sessionStorage.setItem("block_wise_list", JSON.stringify(JSON.parse(sessionStorage.getItem('block_wise_list'))));
          } else {
            sessionStorage.setItem("block_wise_list", JSON.stringify(this.block_new_site_creation));
          }



        } else {
          sessionStorage.setItem("block_wise_list", JSON.stringify(this.block_new_site_creation));

        }

        console.log(sessionStorage.getItem('sales_array'));
        console.log(this.salesowner_new_site_creation);



        if (sessionStorage.getItem('sales_array') != "" && sessionStorage.getItem('sales_array') != null && sessionStorage.getItem('sales_array') != "null"
          && sessionStorage.getItem('sales_array') != undefined && sessionStorage.getItem('sales_array') != "sales_array" && JSON.parse(sessionStorage.getItem('sales_array')).length != 0) {

          if (this.salesowner_new_site_creation.length == 0) {
            this.salesowner_controller_data = [];
            for (var i = 0; i < JSON.parse(sessionStorage.getItem('sales_array')).length; i++) {
              this.salesowner_controller_data.push(JSON.parse(sessionStorage.getItem('sales_array'))[i].id);
            }
            sessionStorage.setItem("sales_array", JSON.stringify(JSON.parse(sessionStorage.getItem('sales_array'))));
          } else {


            sessionStorage.setItem("sales_array", JSON.stringify(this.salesowner_new_site_creation));
          }






        } else {
          sessionStorage.setItem("sales_array", JSON.stringify(this.salesowner_new_site_creation));
        }

        if (sessionStorage.getItem('statusIDSeesion') != "" && sessionStorage.getItem('statusIDSeesion') != null && sessionStorage.getItem('statusIDSeesion') != "null"
          && sessionStorage.getItem('statusIDSeesion') != undefined && sessionStorage.getItem('statusIDSeesion') != "undefined") {
          this.status = sessionStorage.getItem('statusIDSeesion');

          if (this.status == "select") {
            this.status = null;
          }

          sessionStorage.setItem("statusIDSeesion", this.status);
        } else {
          if (selected_statusID == "select") {
            selected_statusID = null;
          }
          sessionStorage.setItem("statusIDSeesion", selected_statusID);
        }

        if (sessionStorage.getItem('startdate_approve') != "" && sessionStorage.getItem('startdate_approve') != null && sessionStorage.getItem('startdate_approve') != "null"
          && sessionStorage.getItem('startdate_approve') != undefined && sessionStorage.getItem('startdate_approve') != "undefined") {
          this.startdate = sessionStorage.getItem('startdate_approve');

          sessionStorage.setItem("startdate_approve", this.startdate);

        } else {
          sessionStorage.setItem("startdate_approve", $('#fromDate').val());
        }


        if (sessionStorage.getItem('enddate_approve') != "" && sessionStorage.getItem('enddate_approve') != null && sessionStorage.getItem('enddate_approve') != "null"
          && sessionStorage.getItem('enddate_approve') != undefined && sessionStorage.getItem('enddate_approve') != "undefined") {
          this.endDate = sessionStorage.getItem('enddate_approve');
          sessionStorage.setItem("enddate_approve", this.endDate);
        } else {
          sessionStorage.setItem("enddate_approve", $('#toDate').val());
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
    },
      error => {
        $('.page-loader-wrapper').hide();
        var error = JSON.parse(error._body).responseCode;
        //alert(error);
        $('.page-loader-wrapper').hide();
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }

  homeClick() {
    this.cmn.commonHomeNavigation();
  }

  /*-----------------Getting Project(site) list Start---------------------*/
  siteList() {
    var arr = localStorage.getItem('SiteIDS_singlepage');
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "site/site.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteIds": JSON.parse(arr).map(String)
    }
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      if (sessionStorage.getItem("customeridsession") == null || sessionStorage.getItem("customeridsession") == "") {
        $('.page-loader-wrapper').hide();
      }
      if (resp.responseCode == 200) {
        $('#projectID').html("");
        $('#projectID').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#projectID').append("<option value='" + resp.responseObjList[i].id + "'>" + resp.responseObjList[i].name + "</option>");
        }

        this.statusList()

        if (sessionStorage.getItem("prjctIDSeesion") != null && sessionStorage.getItem("prjctIDSeesion") != undefined && sessionStorage.getItem("prjctIDSeesion") != "select") {
          $('#projectID').val(sessionStorage.getItem("prjctIDSeesion"));

          this.getsaleownerlist(JSON.parse(sessionStorage.getItem("prjctIDSeesion")), null, null, null);


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
        //alert(error);
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }
  /*-----------------Getting Project(site) list End---------------------*/


  /*-----------------Getting Status list Start---------------------*/
  statusList() {
    var arr = localStorage.getItem('SiteIDS_singlepage');
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/getBookingStatuses.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
    }
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#statusID').html("");
        $('#statusID').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#statusID').append("<option value='" + resp.responseObjList[i].statusId + "'>" + resp.responseObjList[i].status + "</option>");
        }
        if (sessionStorage.getItem("statusIDSeesion") != null && sessionStorage.getItem("statusIDSeesion") != undefined && sessionStorage.getItem("statusIDSeesion") != "select") {
          $('#statusID').val(sessionStorage.getItem("statusIDSeesion"));
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
        //alert(error);
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }
  /*-----------------Getting Status list End---------------------*/

  downloadDetails() {
    var project;
    var status;
    if ($('#projectID').val() == 'select' || $('#projectID').val() == null) {
      swal("Please select project");
      return false;

    }
    if ($('#statusID').val() == 'select' || $('#statusID').val() == null) {

      status = null
    } else {
      status = $('#statusID').val();
    }

    var startdate = $('#fromDate').val();
    var endDate = $('#toDate').val();
    if (new Date(startdate) > new Date(endDate)) {
      swal('To Date should be greater than or equal to From Date');
      return false;
    }
    this.getdownloadList(status, startdate, endDate);
  }


  viewcustomerData() {
    var status;
    if ($('#projectID').val() == 'select' || $('#projectID').val() == null) {
      swal("Please select project");
      return false;
    }
    if ($('#statusID').val() == 'select' || $('#statusID').val() == null) {
      status = null
    } else {
      status = $('#statusID').val();
    }

    var startdate = $('#fromDate').val();
    var endDate = $('#toDate').val();
    if (new Date(startdate) > new Date(endDate)) {
      swal('Booking To Date should be greater than or equal to Booking From Date');
      return false;
    }

    if (isNaN(startdate) == false) {
      startdate = null
    } else {
      startdate = new Date(startdate).getTime();
    }

    if (isNaN(endDate) == false) {
      endDate = null
    } else {
      endDate = new Date(endDate).getTime();
    }

    console.log(this.block_new_site_creation);
    console.log(this.block_controller_data);
    console.log(JSON.parse(sessionStorage.getItem('block_wise_list')));


    console.log(JSON.parse(sessionStorage.getItem('sales_array')));
    console.log(this.salesowner_controller_data);
    console.log(this.salesowner_new_site_creation);



    if (this.salesowner_new_site_creation.length == 0) {

      if (JSON.parse(sessionStorage.getItem('sales_array')) != null) {
        this.salesowner_controller_data = [];
        for (var i = 0; i < JSON.parse(sessionStorage.getItem('sales_array')).length; i++) {
          this.salesowner_controller_data.push(JSON.parse(sessionStorage.getItem('sales_array'))[i].id);
        }
        sessionStorage.setItem("sales_array", JSON.stringify(JSON.parse(sessionStorage.getItem('sales_array'))));
      }

    }



    console.log(this.salesowner_controller_data);


    this.getApproveCustomerList($('#projectID').val(), this.block_controller_data, this.salesowner_controller_data, status, startdate, endDate);
  }

  getdownloadList(status, start, end) {
    if (isNaN(start) == false) {
      start = null
    } else {
      start = new Date(start).getTime();
    }

    if (isNaN(end) == false) {
      end = null
    } else {
      end = new Date(end).getTime();
    }
    this.projectId = $("#projectID").val();



    if (this.block_controller_data == undefined) {
      this.block_controller_data = [];
    }

    if (this.salesowner_controller_data == undefined) {
      this.salesowner_controller_data = [];
    }




    $('#tableExport').DataTable().destroy();
    $('#tabledownload').DataTable().destroy();


    $('.page-loader-wrapper').show();
    $('#tabledownload').DataTable().destroy();
    let url = this.cmn.commonUrl + "financial/generateClosingBalanceReport.spring";
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteId": this.projectId,
      "floorIds": [],
      "bookingFormIds": [],
      "startDate": start,
      "endDate": end,
      "requestUrl": "generateClosingBalanceReport",
      "condition": "generateClosingBalanceReport",
      "statusId": status,
      "blockIds": this.block_controller_data,
      "flatSaleOwnerIds": this.salesowner_controller_data

    }

    console.log(body);

    this.http.post(url, body).map(res => res.json()).subscribe(resp => {

      console.log(resp);

      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {

        this.tabledata = [];
        this.closingBalanceData = [];
        if (resp.responseObjList.closingBalanceData == null || resp.responseObjList.closingBalanceData.length == 0) {
          this.closingBalanceData = [];
        } else {
          this.closingBalanceData = resp.responseObjList.closingBalanceData;

        }



        setTimeout(function () {

          $("#downloaddiv").show()
          $("#prevdiv").hide();

          $(document).ready(function () {
            $('#tabledownload').DataTable({
              pageLength: 5,
              lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todos']],
              dom: 'Bfrltip',
              buttons: [
                'copy', 'csv', 'excel', 'print', {
                  extend: 'pdfHtml5',
                  title: function () {
                    return "ABCDE List";
                  },
                  orientation: 'landscape',
                  pageSize: 'A1',
                  text: '<i class="fa fa-file-pdf-o"> PDF</i>',
                  titleAttr: 'PDF'
                },

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
            }).draw();

          });
        }, 2000)
        $("#downloaddiv").show()
        $("#prevdiv").hide()




      } else if (resp.responseCode == 440) {
        swal("Error!", "Your session has been expired.", "error");
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

      }
    );
  }


  startdatefun() {
    $("#fromDate").val("");
  }

  endtimefun() {
    $("#toDate").val("");
  }
  setDate() {
    var getmonth = new Date().getMonth();
    var temp = new Date().setMonth(getmonth - 1);
    var minDate = new Date(temp);
    var year = minDate.getFullYear();
    var month = ("0" + (minDate.getMonth() + 1)).slice(-2);
    var day = ("0" + minDate.getDate()).slice(-2);
    var minimumdate = year + '-' + month + '-' + day;
    var date2 = new Date();
    var year2 = date2.getFullYear();
    var month2 = ("0" + (date2.getMonth() + 1)).slice(-2);
    var day2 = ("0" + date2.getDate()).slice(-2);
    var maximumdate = year2 + '-' + month2 + '-' + day2;
    fromDate = minimumdate;
    toDate = maximumdate;
  }
  getToday(): string {
    return new Date().toISOString().split('T')[0]
  }



  /*------------------------Projects On Change Functionality Start--------------------*/
  projectchangeFun(selectedSiteID) {
    if (selectedSiteID == "select") {
      selectedSiteID = null;
    } else {
      selectedSiteID = [selectedSiteID]
    }
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "block/blocks.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "ids": selectedSiteID,
      "requestUrl": "ViewAllData"
    }

    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        this.controller_blocks_list = resp.responseObjList;
        this.controller_blocks_list.forEach((o: any, i) => (o.id = o.detId));


        this.project_list_name_demo = [];
        this.chi_controller = [];




        if (sessionStorage.getItem("block_wise_list") != null && sessionStorage.getItem("block_wise_list") != undefined
          && sessionStorage.getItem("block_wise_list") != "select" && sessionStorage.getItem("block_wise_list") != "null") {


          for (var i = 0; i < JSON.parse(sessionStorage.getItem("block_wise_list")).length; i++) {
            this.project_list_name_demo.push(
              {
                id: JSON.parse(sessionStorage.getItem("block_wise_list"))[i].id,
                name: JSON.parse(sessionStorage.getItem("block_wise_list"))[i].name
              }
            );

            //  this.chi_controller.push(JSON.parse(sessionStorage.getItem("block_wise_list"))[i].id);

          }
          this.block_list_name = this.project_list_name_demo;
          //  this.getsaleownerlist(selectedSiteID, this.chi_controller, null, null);

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
  /*------------------------Projects On Change Functionality End--------------------*/



  getsaleownerlist(controller_data, blockid, floorid, flatid) {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/getFlatSaleOwners.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteIds": [controller_data],
      "blockIds": blockid,
      "floorIds": floorid,
      "flatIds": flatid,
      "requestUrl": "getSaleOwners"
    }

    console.log(url);
    console.log(JSON.stringify(body));

    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      console.log(JSON.stringify(resp));

      console.log(resp);
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {

        this.controller_saleowner_list = resp.responseObjList;
        this.controller_saleowner_list.forEach((o: any, i) => (o.id = o.flatSaleOwnerId));


        this.sales_owner_wise_array = [];
        if (sessionStorage.getItem("sales_array") != null && sessionStorage.getItem("sales_array") != undefined && sessionStorage.getItem("sales_array") != "select" && sessionStorage.getItem("sales_array") != "null") {
          for (var i = 0; i < JSON.parse(sessionStorage.getItem("sales_array")).length; i++) {
            this.sales_owner_wise_array.push(
              {
                id: JSON.parse(sessionStorage.getItem("sales_array"))[i].flatSaleOwnerId,
                flatSaleOwner: JSON.parse(sessionStorage.getItem("sales_array"))[i].flatSaleOwner
              }
            );
          }
          this.salesowner_list_name = this.sales_owner_wise_array;
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



  //  -----------------------------block on change start ------------------

  block_selectedSIDs(event) {
    console.log("test 1");
    this.salesowner_list_name = [];
    this.salesowner_controller_data = [];
    this.salesowner_new_site_creation = [];

    this.block_controller_data = [];
    console.log(sessionStorage.getItem('block_wise_list'));

    if (sessionStorage.getItem('block_wise_list') != "" && sessionStorage.getItem('block_wise_list') != null && sessionStorage.getItem('block_wise_list') != "null"
      && sessionStorage.getItem('block_wise_list') != undefined && sessionStorage.getItem('block_wise_list') != "undefined") {
      this.block_new_site_creation = [];
      for (var i = 0; i < JSON.parse(sessionStorage.getItem('block_wise_list')).length; i++) {
        this.block_new_site_creation.push(JSON.parse(sessionStorage.getItem('block_wise_list'))[i]);
      }

    }

    console.log(this.block_new_site_creation);


    this.block_new_site_creation.push(event);
    for (var i = 0; i < this.block_new_site_creation.length; i++) {
      this.block_controller_data.push(this.block_new_site_creation[i].id);
    }

    this.getsaleownerlist(selected_projectid, this.block_controller_data, null, null);

    console.log(this.block_new_site_creation);
    sessionStorage.removeItem('sales_array');
    sessionStorage.removeItem('block_wise_list');
  }

  block_onSelectAll(event) {
    console.log("test 2");
    this.salesowner_list_name = [];
    this.salesowner_controller_data = [];
    this.salesowner_new_site_creation = [];

    this.block_new_site_creation = [];
    this.block_controller_data = [];
    this.block_new_site_creation.push(event);
    for (var i = 0; i < event.length; i++) {
      this.block_controller_data.push(event[i].id);
    }

    this.getsaleownerlist(selected_projectid, this.block_controller_data, null, null);
    console.log(this.block_new_site_creation);
    sessionStorage.removeItem('sales_array');
    sessionStorage.removeItem('block_wise_list');
  }


  block_onItemDeSelect(event) {
    console.log(event);
    console.log("test 3");
    this.salesowner_list_name = [];
    this.salesowner_controller_data = [];
    this.salesowner_new_site_creation = [];

    this.block_new_site_creation = this.block_new_site_creation.filter((el) => el.id !== event.id);
    console.log(this.block_new_site_creation);
    this.block_controller_data = [];
    for (var i = 0; i < this.block_new_site_creation.length; i++) {
      this.block_controller_data.push(this.block_new_site_creation[i].id);
    }
    console.log(sessionStorage.getItem('block_wise_list'));
    console.log(this.block_new_site_creation);
    console.log(this.block_controller_data);





    if (sessionStorage.getItem('block_wise_list') != "" && sessionStorage.getItem('block_wise_list') != null && sessionStorage.getItem('block_wise_list') != "null"
      && sessionStorage.getItem('block_wise_list') != undefined && sessionStorage.getItem('block_wise_list') != "undefined" && JSON.parse(sessionStorage.getItem('block_wise_list')).length != 0) {

      this.block_controller_data = [];
      this.block_new_site_creation = [];
      for (var i = 0; i < JSON.parse(sessionStorage.getItem('block_wise_list')).length; i++) {
        if (JSON.parse(sessionStorage.getItem('block_wise_list'))[i].id == event.id) {
          JSON.parse(sessionStorage.getItem('block_wise_list')).slice(-1);
        } else {
          this.block_controller_data.push(JSON.parse(sessionStorage.getItem('block_wise_list'))[i].id);
          this.block_new_site_creation.push(JSON.parse(sessionStorage.getItem('block_wise_list'))[i]);
        }
      }

    }

    console.log(this.block_controller_data);


    sessionStorage.removeItem('sales_array');
    sessionStorage.removeItem('block_wise_list');
    this.getsaleownerlist(selected_projectid, this.block_controller_data, null, null);

  }


  block_onDeSelectAll(event) {
    console.log("test 4");
    this.salesowner_list_name = [];
    this.salesowner_controller_data = [];
    this.salesowner_new_site_creation = [];

    this.block_new_site_creation = [];
    this.block_controller_data = [];
    console.log(this.block_controller_data);
    this.getsaleownerlist(selected_projectid, this.block_controller_data, null, null);
    console.log(this.block_new_site_creation);

    sessionStorage.removeItem('sales_array');
    sessionStorage.removeItem('block_wise_list');

  }




  salesowner_selectedSIDs(event) {

    console.log(sessionStorage.getItem('sales_array'));
    this.salesowner_controller_data = [];


    if (sessionStorage.getItem('sales_array') != "" && sessionStorage.getItem('sales_array') != null && sessionStorage.getItem('sales_array') != "null"
      && sessionStorage.getItem('sales_array') != undefined && sessionStorage.getItem('sales_array') != "undefined" && JSON.parse(sessionStorage.getItem('sales_array')).length != 0) {
      this.salesowner_new_site_creation = [];
      for (var i = 0; i < JSON.parse(sessionStorage.getItem('sales_array')).length; i++) {
        this.salesowner_new_site_creation.push(JSON.parse(sessionStorage.getItem('sales_array'))[i]);
      }

    }

    console.log(this.salesowner_new_site_creation);

    this.salesowner_new_site_creation.push(event);
    for (var i = 0; i < this.salesowner_new_site_creation.length; i++) {
      this.salesowner_controller_data.push(this.salesowner_new_site_creation[i].id);
    }



    console.log(this.salesowner_new_site_creation);
    console.log(this.salesowner_controller_data);
    sessionStorage.removeItem('sales_array');
  }


  salesowner_onSelectAll(event) {
    this.salesowner_new_site_creation = [];
    this.salesowner_controller_data = [];
    this.salesowner_new_site_creation.push(event);
    for (var i = 0; i < event.length; i++) {
      this.salesowner_controller_data.push(event[i].id);
    }
    sessionStorage.removeItem('sales_array');
  }


  salesowner_onItemDeSelect(event) {
    this.salesowner_controller_data = [];
    this.salesowner_new_site_creation = this.salesowner_new_site_creation.filter((el) => el.id !== event.id);
    for (var i = 0; i < this.salesowner_new_site_creation.length; i++) {
      this.salesowner_controller_data.push(this.salesowner_new_site_creation[i].id);
    }




    if (sessionStorage.getItem('sales_array') != "" && sessionStorage.getItem('sales_array') != null && sessionStorage.getItem('sales_array') != "null"
      && sessionStorage.getItem('sales_array') != undefined && sessionStorage.getItem('sales_array') != "undefined" && JSON.parse(sessionStorage.getItem('sales_array')).length != 0) {

      this.salesowner_controller_data = [];
      this.salesowner_new_site_creation = [];
      for (var i = 0; i < JSON.parse(sessionStorage.getItem('sales_array')).length; i++) {
        if (JSON.parse(sessionStorage.getItem('sales_array'))[i].id == event.id) {
          JSON.parse(sessionStorage.getItem('sales_array')).slice(-1);
        } else {
          this.salesowner_controller_data.push(JSON.parse(sessionStorage.getItem('sales_array'))[i].id);
          this.salesowner_new_site_creation.push(JSON.parse(sessionStorage.getItem('sales_array'))[i]);
        }
      }

    }


    sessionStorage.removeItem('sales_array');
  }


  salesowner_onDeSelectAll(event) {
    this.salesowner_new_site_creation = [];
    this.salesowner_controller_data = [];
    sessionStorage.removeItem('sales_array');
  }


}
