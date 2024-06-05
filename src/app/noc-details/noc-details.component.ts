import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonComponent } from '../common/common.component';
import { Http, RequestOptions, Headers } from '@angular/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NocDetailsService } from './noc-details.service';
declare const $: any;
declare const swal: any;

var selected_projectid;
var selected_flatid;
var selectflat_bookingid;
var show_value;
@Component({
  selector: 'app-noc-details',
  templateUrl: './noc-details.component.html',
  styleUrls: ['./noc-details.component.sass']
})
export class NocDetailsComponent implements OnInit {

  controller: Array<any> = [];

  constructor(private cmn: CommonComponent, private http: Http, private formBuilder: FormBuilder,
    private router: Router, private service: NocDetailsService) {
    $('.page-loader-wrapper').hide();
    this.siteList();
  }

  ngOnInit() {
    var self = this;
    $(function () {
      $("#projectID").select2({
        placeholder: "--Select--",
        dir: "ltl",
      });

      $("#flatSelection").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });

      $("#showSelection").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });

    });

    $(function () {
      $('#projectID').change(function (e) {
        selected_projectid = $(e.target).val();
        if (selected_projectid == "select") {
          $("#flatSelection").val("select");
          $("#flatSelection").trigger("change");
        } else {
          $("#showSelection").val("select");
          $("#showSelection").trigger("change");
          self.projectchangeFun(selected_projectid);
        }
      })

      $('#flatSelection').change(function (e) {
        selectflat_bookingid = $(e.target).val().split("-")[1];
        selected_flatid = $(e.target).val().split("-")[0];
        if (selected_flatid == "select") {
          $("#showSelection").val("select");
          $("#showSelection").trigger("change");
        } else {
          $("#showSelection").val("select");
          $("#showSelection").trigger("change");
          console.log(selected_flatid);
          console.log(selectflat_bookingid);

        }
      });

      $('#showSelection').change(function (e) {
        show_value = $(e.target).val();
        if (show_value == "select") {
          //  swal("please select the flat");
        } else {
          console.log(show_value);
        }
      });
    });


    this.siteList();
  }


  /*-----------------Getting Project(site) list Start---------------------*/
  siteList() {
    var arr = localStorage.getItem('SiteIDS');
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "site/site.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": sessionStorage.getItem("login_sessionkey"),
      "siteIds": JSON.parse(arr).map(String),
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
  /*-----------------Getting Project(site) list End---------------------*/

  projectchangeFun(select_id) {

    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "references/searchCustomer.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "customerName": null,
      "requestUrl": "CustomerFlatNo",
      "siteId": select_id
    }

    console.log(body);
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      console.log(resp);
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#flatSelection').html("");

        $('#flatSelection').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.referedCustomer.length; i++) {
          $('#flatSelection').append("<option value='" + resp.responseObjList.referedCustomer[i].flatId + "-" + resp.responseObjList.referedCustomer[i].flatBookingId + "'>" + resp.responseObjList.referedCustomer[i].customerFlatNo + "</option>");


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


  searchFun() {
    if (selected_projectid == undefined || selected_projectid == 'select') {
      selected_projectid = null;
    }

    if (selectflat_bookingid == undefined || selectflat_bookingid == 'select') {
      selectflat_bookingid = null;
    }


    if (selected_flatid == undefined || selected_flatid == 'select') {
      selected_flatid = null;
    }


    if (show_value == undefined || show_value == 'select') {
      show_value = null;
    }


    if (selected_projectid == null && selectflat_bookingid == null && selected_flatid == null && show_value == null) {
      swal("Please select any option to continue !!");
      return false;
    }

    $('#tableExport').DataTable().destroy();
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "bookingFormService/getNOCDocumentsList.spring"


    let headers = new Headers({ 'Content-Type': 'application/json' });


    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteId": selected_projectid,
      "flatBookingId": selectflat_bookingid,
      "showStatusKey": show_value,
      "flatId": selected_flatid
    }

    console.log(url);
    console.log(JSON.stringify(body));


    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      console.log(resp);
      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 200) {

        this.controller = [];
        this.controller = resp.responseObjList;

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
            });

          });
        }, 2000)


      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        // alert(resp.status);
        swal(resp.errors[0]);
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


  attachmentlink(link) {
    window.open(link);
  }


  dashboardfun() {
    console.log("working");
    this.router.navigateByUrl("ticket/viewticket");
  }

}
