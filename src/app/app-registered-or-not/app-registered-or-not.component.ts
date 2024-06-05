import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, RequestOptions, Headers } from '@angular/http';
import { CommonComponent } from '../common/common.component';
import { FormGroup, FormBuilder, Validator, FormControl, Validators, ValidatorFn } from '@angular/forms';

import { ActivatedRoute, RoutesRecognized } from "@angular/router";
import { filter, pairwise } from 'rxjs/operators';
declare const $: any;
declare const swal: any;
var selected_projectid;
var totalflatsBooked = 0;
var appregistered = 0;
var appNotregistered = 0;
@Component({
  selector: 'app-app-registered-or-not',
  templateUrl: './app-registered-or-not.component.html',
  styleUrls: ['./app-registered-or-not.component.sass']
})
export class AppRegisteredOrNotComponent implements OnInit {
  tabledata: any;
  approveCustData: any;
  closingBalanceData: any
  projectId: any;
  previousUrl: any;
  currentUrl: any;
  Projected_wise_data: Array<any> = [];
  title6: any;
  singledd8 = {};
  project_wise_project: Array<any> = []
  userForm: any;
    constructor(public fb: FormBuilder,private router: Router, private http: Http, public cmn: CommonComponent) {
    $('.page-loader-wrapper').hide();
    this.stateList()
    this.projectsList(0,"default");
this.getApproveCustomerList([],[])
   
    this.singledd8 = {
      singleSelection: false,
      enableSearchFilter: true,
      searchPlaceholderText: 'Search',
      classes: 'my_dropdown1',
      unSelectAllText: 'UnSelect All',
      // lazyLoading: true,
    };

  }
  ngOnInit() {
    this.userForm = this.fb.group({
      project_wise_form: [''],

    });
    var self = this;
      var sitval;
    $(function () {
      $("#projectID").select2({
        placeholder: "--Select--",
        dir: "ltl",
      });

      $("#stateID").select2({
        placeholder: "--Select--",
        dir: "ltl",
      });
      
      $('#stateID').change(function (e) {



        sitval = $(e.target).val();
        console.log(sitval)
        $('#projectID').val("")
        $('#projectID').select2().trigger('change');
        this.Projected_wise_data = [];
        if ($("#stateID").val() == "select") {
  
        } else {
  
          self.projectsList(sitval,"inner");
          self.Projected_wise_data = [];

  
        }
  
      });
      $('#projectID').change(function (e) {
        //  selected_projectid = $(e.target).val();
        //   site_name = $('#projectID').select2('data')[0].text

        if (selected_projectid == "select") {
          sessionStorage.removeItem('prjctIDSeesion')
        } else {
          sessionStorage.setItem('fromviewpagepredefined', null);

        }
      })
    })

   


  }
  
  getApproveCustomerList(location,siteIds) {
    $('.page-loader-wrapper').show();
    $('#tableExport').DataTable().destroy();
    let url = this.cmn.commonUrl + "bookingFormService/getProjectReportCount.spring";
    var body = {
      "stateIds":location,
      "empSiteId": siteIds,
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      //"requestUrl": "getFormsList"
    }

    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      console.log(resp);

       

      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $("#downloaddiv").hide()
        $("#prevdiv").show();
        this.tabledata = resp.responseObjList;
        setTimeout(function () {
          $(document).ready(function () {
            $('#tableExport').DataTable({
              pageLength: 5,
              lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todos']],
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
              "footerCallback": function (row, data, start, end, display) {
                totalflatsBooked = 0;
                appregistered = 0;
                appNotregistered = 0;
                for (var j = 0; j < display.length; j++) {
                  totalflatsBooked += parseFloat(data[display[j]][2].replace(/\,/g, ''));
                  const fmt = require('indian-number-format');
                  $('#totalflatsBooked').html(fmt.format(Number(totalflatsBooked.toFixed(2))));

                  appregistered += parseFloat(data[display[j]][3].replace(/\,/g, ''));
                  const fmt2 = require('indian-number-format');
                  $('#appregistered').html(fmt2.format(Number(appregistered.toFixed(2))));

                  appNotregistered += parseFloat(data[display[j]][4].replace(/\,/g, ''));
                  const fmt3 = require('indian-number-format');
                  $('#appNotregistered').html(fmt2.format(Number(appNotregistered.toFixed(2))));

                }
              },

            });
          });
        }, 1000)
        // setTimeout(function () {
        //   $(document).ready(function () {
        //     $('#tableExport').DataTable({
        //       pageLength: 5,
        //       lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todos']],
        //       dom: 'Bfrltip',
              
        //       buttons: [
        //         'copy', 'csv', 'print', {
        //           extend: 'pdfHtml5',
        //           orientation: 'landscape',
        //           pageSize: 'LEGAL',
        //           footer: true,
        //         },
        //         { extend: 'excelHtml5', footer: true },
        //       ],


        //       retrieve: true,
        //       "scrollY": false,
        //       "scrollCollapse": true,
        //       "scrollX": true,
        //       "autoWidth": false,
        //       "iCookieDuration": 60,
        //       "bStateSave": true,
        //       "fnStateSave": function (oSettings, oData) {
        //         localStorage.setItem('offersDataTables', JSON.stringify(oData));
        //       },
        //       "fnStateLoad": function (oSettings) {
        //         return JSON.parse(localStorage.getItem('offersDataTables'));
        //       },
        //       "footerCallback": function (row, data, start, end, display) {
        //         totalflatsBooked = 0;
        //         appregistered = 0;
        //         appNotregistered = 0;
        //         for (var j = 0; j < display.length; j++) {
        //           totalflatsBooked += parseFloat(data[display[j]][2].replace(/\,/g, ''));
        //           const fmt = require('indian-number-format');
        //           $('#totalflatsBooked').html(fmt.format(Number(totalflatsBooked.toFixed(2))));

        //           appregistered += parseFloat(data[display[j]][3].replace(/\,/g, ''));
        //           const fmt2 = require('indian-number-format');
        //           $('#appregistered').html(fmt2.format(Number(appregistered.toFixed(2))));

        //           appNotregistered += parseFloat(data[display[j]][4].replace(/\,/g, ''));
        //           const fmt3 = require('indian-number-format');
        //           $('#appNotregistered').html(fmt2.format(Number(appNotregistered.toFixed(2))));

        //         }
        //       },
            
        //     }).draw();

        //   });
        // }, 2000)


        //$('.page-loader-wrapper').hide();

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
        console.log(error);
      }
    );
  }

  getApproveCustomer(data) {


    if (sessionStorage.getItem('fromviewpagepredefined') == "true") {

    } else {
      sessionStorage.setItem('prjctIDSeesion', $("#projectID").val());
    }

    debugger;
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
    console.log("getBookingDetails body :" + JSON.stringify(body));

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      console.log("Booking Data:  " + JSON.stringify(resp));
      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        this.approveCustData = resp;
        sessionStorage.setItem('approveCustData', JSON.stringify(this.approveCustData));
        sessionStorage.setItem('getPageName', "viewCustomerPage");
        this.router.navigate(['bookingform'], { state: this.approveCustData });
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
  projectsList(val, loadingstatus) {
    this.Projected_wise_data = []
    var sitIDS
    if (val == 0) {
      sitIDS = null
    } else {
      sitIDS = [val]
    }
    var arr = localStorage.getItem('SiteIDS_singlepage');
    console.log(arr)
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "site/getStateWiseSites.spring";
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "ids": sitIDS
    }
    console.log(JSON.stringify(body))
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      console.log(JSON.stringify(resp))
      if (loadingstatus == "inner" ) {
       $('.page-loader-wrapper').hide();
      }


      if (resp.responseCode == 200) {
        $('#projectID').html("");
        $('#projectID').html("");

        this.project_wise_project = resp.responseObjList;
        this.project_wise_project.forEach((o: any, i) => (o.id = o.id));

        this.userForm.reset();
        this.Projected_wise_data = [];
        // $('#projectID').append('<option value="select">--Select--</option>');
        // for (var i = 0; i < resp.responseObjList.length; i++) {
        //   $('#projectID').append("<option value='" + resp.responseObjList[i].id + "'>" + resp.responseObjList[i].name + "</option>");
        // }

       

        if (sessionStorage.getItem("prjctIDSeesion") != null && sessionStorage.getItem("prjctIDSeesion") != undefined && sessionStorage.getItem("prjctIDSeesion") != "select") {
          $('#projectID').val(sessionStorage.getItem("prjctIDSeesion"));
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

  downloadDetails() {
    if ($('#projectID').val() == 'select' || $('#projectID').val() == null) {
      swal("Please select project");
      return false;
    }

   
  }

  viewcustomerData() {
    if ($('#stateID').val() == 'select' && this.Projected_wise_data.length == 0) {
      swal("Please select location or project name");
      return false;
    }

    if($('#stateID').val() == "select"){
      this.getApproveCustomerList([],this.Projected_wise_data);
    }else{
      this.getApproveCustomerList([$('#stateID').val()],this.Projected_wise_data);
    }
  
  }

  

  stateList() {

    let url = this.cmn.commonUrl + "notification/getStateList.spring";
    console.log("url :" + url);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "osType": "Android",
    }

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
     // $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        var Options = "";
        // $('#stateID').append('<option value="select">--Select State--</option>'); 

        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#stateID').append("<option value='" + resp.responseObjList[i].id + "'>" + resp.responseObjList[i].name + "</option>");
          // $('#stateID').formSelect();
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
        //alert(error);
        $('.page-loader-wrapper').hide();
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
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
}

