import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Http, RequestOptions, Headers } from '@angular/http';
import { CommonComponent } from 'src/app/common/common.component';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, FormBuilder } from "@angular/forms";
declare const $: any;
declare const swal: any;
var temp_refId;
@Component({
  selector: 'app-referefriendsearch',
  templateUrl: './referefriendsearch.component.html',
  styleUrls: ['./referefriendsearch.component.sass']
})
export class ReferefriendsearchComponent implements OnInit {
  Customer_Flat_No: any;
  project_name: any;
  Customer_Name: any;
  Referrar_Id: any;
  Referrar_Name: any;
  referralData: Array<any> = [];
  myflat_booking_id: any;
  fg: FormGroup;
  keyword = 'name';
  controller_customerData: Array<any> = [];
  controller_Refrence_name: Array<any> = [];
  controller_Customer_name: Array<any> = [];
  controller_Flat_No: Array<any> = [];
  reference_number: any;
  reference_name: any;
  ref_customer_name: any;
  ref_customer_id: any;
  ref_Flat_id: any;
  ref_Flat_name: any;
  autocompleteform: FormGroup;

  constructor(public route: ActivatedRoute, private router: Router,
    public cmn: CommonComponent, private http: Http, private formBuilder: FormBuilder,) {
    sessionStorage.setItem('fromviewpagepredefined', null)
    $('.page-loader-wrapper').hide();
    $(function () {
      $("#customerName").val("")
      $("#Cust_Flat_No").val("")
    })


    console.log(sessionStorage.getItem("backbuttonStatus"));

    if (sessionStorage.getItem("backbuttonStatus") == "true") {
      sessionStorage.getItem("referee_name");
      sessionStorage.getItem("reference_Id");
      sessionStorage.getItem("flatbookId");
      sessionStorage.getItem("customer_flatno");
      sessionStorage.getItem("customer_flatno_binding");
      sessionStorage.getItem("customer_name");
      sessionStorage.getItem("fromdate");
      sessionStorage.getItem("todate");
      sessionStorage.getItem("ref_project_ID");


      console.log(sessionStorage.getItem("referee_name"));
      console.log(sessionStorage.getItem("reference_Id"));
      console.log(sessionStorage.getItem("flatbookId"));
      console.log(sessionStorage.getItem("customer_flatno"));
      console.log(sessionStorage.getItem("customer_flatno_binding"));
      console.log(sessionStorage.getItem("customer_name"));
      console.log(sessionStorage.getItem("fromdate"));
      console.log(sessionStorage.getItem("todate"));
      console.log(sessionStorage.getItem("ref_project_ID"));

      if (sessionStorage.getItem("reference_Id") !== null || sessionStorage.getItem("reference_Id") !== "undefined" || sessionStorage.getItem("reference_Id") !== "null") {
        this.onChangeSearch(sessionStorage.getItem("reference_Id"))
      }


      if (sessionStorage.getItem("referee_name") !== null || sessionStorage.getItem("referee_name") !== "undefined" || sessionStorage.getItem("referee_name") !== "null") {
        this.Ref_onChangeSearch(sessionStorage.getItem("referee_name"))
      }


      if (sessionStorage.getItem("customer_name") !== null || sessionStorage.getItem("customer_name") !== "undefined" || sessionStorage.getItem("customer_name") !== "null") {
        this.cust_onChangeSearch(sessionStorage.getItem("customer_name"))
      }

      if (sessionStorage.getItem("customer_flatno_binding") !== null || sessionStorage.getItem("customer_flatno_binding") !== "undefined" || sessionStorage.getItem("customer_flatno_binding") !== "null") {
        this.Flat_onChangeSearch(sessionStorage.getItem("customer_flatno_binding"))
      }





      $(function () {
        $("#fromDate").val(sessionStorage.getItem("fromdate"))
        $("#toDate").val(sessionStorage.getItem("todate"))
      })

      this.SearchRefferalFriend_backbutton(sessionStorage.getItem("fromdate"), sessionStorage.getItem("todate"), sessionStorage.getItem("reference_Id"), sessionStorage.getItem("referee_name"), sessionStorage.getItem("flatbookId"), sessionStorage.getItem("customer_flatno"), sessionStorage.getItem("ref_project_ID"))
    }


    this.loadSiteNames();


  }

  onKeyDown(event) {
    console.log(event.target.value);
  }
  ngOnInit() {




    this.autocompleteform = this.formBuilder.group({
      ReferenceId: [''],
      RefereeName: [''],
      CustomerName: [''],
      CustomerFlatNo: [''],
    });


    this.fg = new FormGroup(
      {
        from: new FormControl(""),
        to: new FormControl("")
      },
      [Validators.required, this.dateRangeValidator]
    );


    $(function () {
      $("#projectID").select2({
        placeholder: "Search Project",
        dir: "ltl",

      });
    });
    $("#projectID").change(function () {
      $(".closeIcon").show();
    });
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

  loadSiteNames() {
    let url = this.cmn.commonUrl + "site/allSites.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": sessionStorage.getItem("login_sessionkey")

    }

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

      if (resp.responseCode == 200) {
        sessionStorage.setItem("siteNames", JSON.stringify(resp.responseObjList));
        var siteNames = "<option value=''>--Select--</option>";
        for (var i = 0; i < resp.responseObjList.length; i++) {
          siteNames += "<option value='" + resp.responseObjList[i].id + "'>" + resp.responseObjList[i].name + "</option>";
        }
        $('#projectID').html(siteNames);


        if (sessionStorage.getItem("ref_project_ID") != null || sessionStorage.getItem("ref_project_ID") !== "null" || sessionStorage.getItem("ref_project_ID") !== "") {
          $("#projectID").val(sessionStorage.getItem("ref_project_ID"))
        }


      } else if (resp.responseCode == 440) {
        sessionStorage.clear();
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
        if (error == 440) {
          sessionStorage.clear();
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      });
  }

  SearchRefferalFriend(condition) {

    console.log(sessionStorage.getItem("referee_name"));
   console.log(sessionStorage.getItem("reference_Id"));
   console.log(sessionStorage.getItem("flatbookId"));

   console.log(sessionStorage.getItem("customer_flatno"));
   console.log(sessionStorage.getItem("customer_flatno_binding"));
   console.log(sessionStorage.getItem("customer_name"));
   console.log(sessionStorage.getItem("fromdate"));
   console.log(sessionStorage.getItem("todate"));
   console.log(sessionStorage.getItem("ref_project_ID"));
   console.log(sessionStorage.getItem("backbuttonStatus"));


   console.log(this.reference_number);
   console.log(this.reference_name);
   console.log(this.ref_customer_name);
   console.log(this.ref_customer_id);
   console.log(this.ref_Flat_id);
   console.log(this.ref_Flat_name);



    var siteName = $("#projectID").val();
    var fromdate = $("#fromDate").val();
    var todate = $("#toDate").val();
    if (fromdate == "") {
      fromdate = null
    } else {
      fromdate = fromdate
    }

    if (todate == "") {
      todate = null
    } else {
      todate = todate
    }





    if (this.reference_number == undefined   &&  sessionStorage.getItem("reference_Id") == null || this.reference_number == undefined   &&  sessionStorage.getItem("reference_Id") == "null") {
      this.reference_number = null;
    } else  if (this.reference_number == undefined   &&  sessionStorage.getItem("reference_Id") !== null) {
      this.reference_number = sessionStorage.getItem("reference_Id");
    }

    if (this.reference_name == undefined && sessionStorage.getItem("referee_name") == null || this.reference_name == undefined && sessionStorage.getItem("referee_name") == "null") {
      this.reference_name = null;
    } else if (this.reference_name == undefined && sessionStorage.getItem("referee_name") !== null) {
      this.reference_name = sessionStorage.getItem("referee_name");
    }

    if (this.ref_customer_name == undefined  && sessionStorage.getItem("customer_name") == null || this.ref_customer_name == undefined  && sessionStorage.getItem("customer_name") == "null") {
      this.ref_customer_name = null;
    } else if (this.ref_customer_name == undefined  && sessionStorage.getItem("customer_name") !== null) {
      this.ref_customer_name = sessionStorage.getItem("customer_name");
    }

    if (this.ref_customer_id == undefined  && sessionStorage.getItem("flatbookId") == null || this.ref_customer_id == undefined  && sessionStorage.getItem("flatbookId") == "null") {
      this.ref_customer_id = null;
    } else if (this.ref_customer_id == undefined  && sessionStorage.getItem("flatbookId") !== null) {
      this.ref_customer_id = sessionStorage.getItem("flatbookId");
    }

    if (this.ref_Flat_id == undefined && sessionStorage.getItem("customer_flatno") == null || this.ref_Flat_id == undefined && sessionStorage.getItem("customer_flatno") == "null") {
      this.ref_Flat_id = null;
    } else  if (this.ref_Flat_id == undefined && sessionStorage.getItem("customer_flatno") !== null) {
      this.ref_Flat_id = sessionStorage.getItem("customer_flatno");
    }

    if (this.ref_Flat_name == undefined  && sessionStorage.getItem("customer_flatno_binding") == null || this.ref_Flat_name == undefined  && sessionStorage.getItem("customer_flatno_binding") == "null") {
      this.ref_Flat_name = null;
    } else if (this.ref_Flat_name == undefined  && sessionStorage.getItem("customer_flatno_binding") !== null) {
      this.ref_Flat_name = sessionStorage.getItem("customer_flatno_binding");
    }

  

    if (condition == 'true') {

      if (this.reference_number == null && this.reference_name == null && this.ref_customer_id == null && this.ref_Flat_id == null && siteName == "" && fromdate == null && todate == null) {
        swal("Please enter any one.");
        return false;
      }
      if ((this.reference_number != null || this.reference_name != null || this.ref_customer_id != null || this.ref_Flat_id != null || fromdate != null || todate != null) && siteName != '') {
        swal("Please select project or enter reference data.");
        return false;
      }
      var startdate_notif = $('#fromDate').val();
      var endDate = $('#toDate').val();
      if (new Date(startdate_notif) > new Date(endDate)) {
        swal('To Date should be greater than or equal to From Date');
        return false;
      }



    }

    if(siteName == ""){
      siteName = null;
    }

    $('#tableExport').DataTable().destroy();
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "references/referedCustomers.spring";



    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body;
    if (condition == 'true') {
      body = {
        "referrerName": this.reference_name,
        "refrenceId": this.reference_number,
        "custId": this.ref_customer_id,
        "customerFlatNo": this.ref_Flat_id,
        "siteId": siteName,
        "startDate": fromdate,
        "endDate": todate,
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey")
      }
    } else {
      body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey")
      }
    }


    console.log(body);


    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      console.log(resp);
      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 200) {
        this.referralData = [];
        this.referralData = resp.responseObjList.referedCustomer;


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
              "bStateSave": true,
              "fnStateSave": function (oSettings, oData) {
                localStorage.setItem('offersDataTables', JSON.stringify(oData));
              },
              "fnStateLoad": function (oSettings) {
                return JSON.parse(localStorage.getItem('offersDataTables'));
              }

            });
          });
        }, 2000)

      } else if (resp.responseCode == 440) {
        sessionStorage.clear();
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
        if (error == 440) {
          sessionStorage.clear();
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      });
  }




  clearSiteName() {
    sessionStorage.removeItem("ref_project_ID");
    $("#projectID option[value]").remove();
    var sitenamesFromSession = JSON.parse(sessionStorage.getItem("siteNames"));
    var siteNames = "<option value=''>--Select--</option>";
    for (var i = 0; i < sitenamesFromSession.length; i++) {
      siteNames += "<option value='" + sitenamesFromSession[i].id + "'>" + sitenamesFromSession[i].name + "</option>";
    }
    $('#projectID').html(siteNames);
    $(".closeIcon").hide();
  }
  homeClick() {
    this.cmn.commonHomeNavigation();
  }

  viewReferenceData(data) {

    
    if (this.reference_number == undefined   &&  sessionStorage.getItem("reference_Id") == null || this.reference_number == undefined   &&  sessionStorage.getItem("reference_Id") == "null") {
      this.reference_number = null;
    } else  if (this.reference_number == undefined   &&  sessionStorage.getItem("reference_Id") !== null) {
      this.reference_number = sessionStorage.getItem("reference_Id");
    }

    if (this.reference_name == undefined && sessionStorage.getItem("referee_name") == null || this.reference_name == undefined && sessionStorage.getItem("referee_name") == "null") {
      this.reference_name = null;
    } else if (this.reference_name == undefined && sessionStorage.getItem("referee_name") !== null) {
      this.reference_name = sessionStorage.getItem("referee_name");
    }

    if (this.ref_customer_name == undefined  && sessionStorage.getItem("customer_name") == null || this.ref_customer_name == undefined  && sessionStorage.getItem("customer_name") == "null") {
      this.ref_customer_name = null;
    } else if (this.ref_customer_name == undefined  && sessionStorage.getItem("customer_name") !== null) {
      this.ref_customer_name = sessionStorage.getItem("customer_name");
    }

    if (this.ref_customer_id == undefined  && sessionStorage.getItem("flatbookId") == null || this.ref_customer_id == undefined  && sessionStorage.getItem("flatbookId") == "null") {
      this.ref_customer_id = null;
    } else if (this.ref_customer_id == undefined  && sessionStorage.getItem("flatbookId") !== null) {
      this.ref_customer_id = sessionStorage.getItem("flatbookId");
    }

    if (this.ref_Flat_id == undefined && sessionStorage.getItem("customer_flatno") == null || this.ref_Flat_id == undefined && sessionStorage.getItem("customer_flatno") == "null") {
      this.ref_Flat_id = null;
    } else  if (this.ref_Flat_id == undefined && sessionStorage.getItem("customer_flatno") !== null) {
      this.ref_Flat_id = sessionStorage.getItem("customer_flatno");
    }

    if (this.ref_Flat_name == undefined  && sessionStorage.getItem("customer_flatno_binding") == null || this.ref_Flat_name == undefined  && sessionStorage.getItem("customer_flatno_binding") == "null") {
      this.ref_Flat_name = null;
    } else if (this.ref_Flat_name == undefined  && sessionStorage.getItem("customer_flatno_binding") !== null) {
      this.ref_Flat_name = sessionStorage.getItem("customer_flatno_binding");
    }







    sessionStorage.setItem("referee_name", this.reference_name)
    sessionStorage.setItem("reference_Id", this.reference_number)
    sessionStorage.setItem("flatbookId", this.ref_customer_id)
    sessionStorage.setItem("customer_flatno", this.ref_Flat_id)
    sessionStorage.setItem("customer_flatno_binding", this.ref_Flat_name)
    sessionStorage.setItem("customer_name", this.ref_customer_name)
    sessionStorage.setItem("fromdate", $("#fromDate").val())
    sessionStorage.setItem("todate", $("#toDate").val())

    sessionStorage.setItem("ref_project_ID", $("#projectID").val())
    sessionStorage.setItem("backbuttonStatus", 'true')



    sessionStorage.setItem("refferalData1", JSON.stringify(data));
    this.router.navigate(["view-refer-data"]);
  }


  SearchRefferalFriend_backbutton(fromDate, toDate, reference_Id, referee_name, flatbookId, customer_flatno, project_ID) {



    console.log(fromDate);
    console.log(toDate);
    console.log(reference_Id);
    console.log(referee_name);
    console.log(flatbookId);
    console.log(customer_flatno);
    console.log(project_ID);



    $('#tableExport1').DataTable().destroy();
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "references/referedCustomers.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body;


    if (referee_name == "null" || referee_name == "undefined") {
      referee_name = null;
    }

    if (reference_Id == "null" || reference_Id == "undefined") {
      reference_Id = null;
    }

    if (flatbookId == "null" || flatbookId == "undefined") {
      flatbookId = null;
    }

    if (customer_flatno == "null" || customer_flatno == "undefined") {
      customer_flatno = null;
    }

    if (fromDate == "null" || fromDate == "" || fromDate == "undefined") {
      fromDate = null;
    }

    if (toDate == "null" || toDate == "" || toDate == "undefined") {
      toDate = null;
    }
    body = {
      "referrerName": referee_name,
      "refrenceId": reference_Id,
      "custId": flatbookId,
      "customerFlatNo": customer_flatno,
      "siteId": project_ID,
      "startDate": fromDate,
      "endDate": toDate,
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey")
    }

    console.log(body);

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 200) {

        this.referralData = resp.responseObjList.referedCustomer;
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
              "bStateSave": true,
              "fnStateSave": function (oSettings, oData) {
                localStorage.setItem('offersDataTables', JSON.stringify(oData));
              },
              "fnStateLoad": function (oSettings) {
                return JSON.parse(localStorage.getItem('offersDataTables'));
              }

            });
          });
        }, 2000)

      } else if (resp.responseCode == 440) {
        sessionStorage.clear();
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
        if (error == 440) {
          sessionStorage.clear();
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      });
  }

  startdatefun() {
    $("#fromDate").val("");
    sessionStorage.removeItem("fromdate");
  }

  endtimefun() {
    $("#toDate").val("");
    sessionStorage.removeItem("todate");
  }
  getToday(): string {
    return new Date().toISOString().split('T')[0]
  }

  selectEvent(item) {
    console.log(item);
    this.reference_number = item.id;
    console.log(this.reference_number);

  }

  onClearSearch(e) {
    console.log(e);
    this.reference_number = null;
    sessionStorage.removeItem("reference_Id");
  }


  onChangeSearch(val: string) {


    let url = this.cmn.commonUrl + "references/searchCustomer.spring";
    $("#referenceId").val('');

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "refrenceId": val,
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey")
    }

    console.log(body);
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      console.log(resp);

      if (resp.responseCode == 200) {

        this.controller_customerData = [];
        for (var i = 0; i < resp.responseObjList.referedCustomer.length; i++) {

          this.controller_customerData.push({ id: resp.responseObjList.referedCustomer[i].refrenceId, name: resp.responseObjList.referedCustomer[i].refrenceId });
        }

        console.log(sessionStorage.getItem("reference_Id"));
        if (sessionStorage.getItem("reference_Id") !== null && sessionStorage.getItem("reference_Id") !== "undefined" && sessionStorage.getItem("reference_Id") !== "null") {
          this.autocompleteform.patchValue({
            ReferenceId: sessionStorage.getItem("reference_Id"),

          });
        }



      } else if (resp.responseCode == 440) {
        sessionStorage.clear();
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
        if (error == 440) {
          sessionStorage.clear();
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      });

  }

  onFocused(e) {
    console.log(e);
    // do something when input is focused
  }

  //-----------------------------------------------

  Ref_selectEvent(item) {
    console.log(item);
    // do something with selected item
    this.reference_name = item.name;

  }

  Ref_onClearSearch(item) {
    this.reference_name = null;
    sessionStorage.removeItem("referee_name");
  }

  Ref_onChangeSearch(val: string) {
    let url = this.cmn.commonUrl + "references/searchCustomer.spring";
    $("#refereeName").val('');

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "referrerName": val,
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey")
    }

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      console.log(resp);

      if (resp.responseCode == 200) {

        this.controller_Refrence_name = [];
        for (var i = 0; i < resp.responseObjList.referedCustomer.length; i++) {

          this.controller_Refrence_name.push({ id: resp.responseObjList.referedCustomer[i].refrenceId, name: resp.responseObjList.referedCustomer[i].referrerName });
        }

        console.log(sessionStorage.getItem("referee_name"));

        if (sessionStorage.getItem("referee_name") !== null && sessionStorage.getItem("referee_name") !== "undefined" && sessionStorage.getItem("referee_name") !== "null") {
          this.autocompleteform.patchValue({
            RefereeName: sessionStorage.getItem("referee_name"),

          });
        }


      } else if (resp.responseCode == 440) {
        sessionStorage.clear();
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
        if (error == 440) {
          sessionStorage.clear();
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      });

  }

  Ref_onFocused(e) {
    console.log(e);
    // do something when input is focused
  }



  //-----------------------------------------------



  cust_selectEvent(item) {
    console.log(item);
    this.ref_customer_name = item.name;
    this.ref_customer_id = item.id;

    console.log(this.ref_customer_name);
    console.log(this.ref_customer_id);
  }

  Cust_onClearSearch(e) {
    this.ref_customer_name = null;
    this.ref_customer_id = null;
    sessionStorage.removeItem("customer_name");
    sessionStorage.removeItem("flatbookId");

  }

  cust_onChangeSearch(val: string) {
    let url = this.cmn.commonUrl + "references/searchCustomer.spring";
    $("#customerId").val('');

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "customerName": val,
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey")
    }

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      console.log(resp);

      if (resp.responseCode == 200) {

        this.controller_Customer_name = [];
        for (var i = 0; i < resp.responseObjList.referedCustomer.length; i++) {

          this.controller_Customer_name.push({ id: resp.responseObjList.referedCustomer[i].custId, name: resp.responseObjList.referedCustomer[i].customerName });
        }

        console.log(sessionStorage.getItem("customer_name"));

        if (sessionStorage.getItem("customer_name") !== null && sessionStorage.getItem("customer_name") !== "undefined" && sessionStorage.getItem("customer_name") !== "null") {
          this.autocompleteform.patchValue({
            CustomerName: sessionStorage.getItem("customer_name"),

          });
        }

      } else if (resp.responseCode == 440) {
        sessionStorage.clear();
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
        if (error == 440) {
          sessionStorage.clear();
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      });

  }

  cust_onFocused(e) {
    console.log(e);
    // do something when input is focused
  }

  //-----------------------------------------------



  Flat_selectEvent(item) {
    this.ref_Flat_id = item.id;
    this.ref_Flat_name = item.name;
  }

  Flat_onClearSearch(e) {

    this.ref_Flat_id = null;
    this.ref_Flat_name = null;
    sessionStorage.removeItem("customer_flatno_binding");
    sessionStorage.removeItem("customer_flatno");

  }

  Flat_onChangeSearch(val: string) {
    let url = this.cmn.commonUrl + "references/searchCustomer.spring";
    $("#customerFlatNo").val('');

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "customerFlatNo": val,
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey")
    }

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      console.log(resp);

      if (resp.responseCode == 200) {
        this.controller_Flat_No = [];
        for (var i = 0; i < resp.responseObjList.referedCustomer.length; i++) {

          this.controller_Flat_No.push({ id: resp.responseObjList.referedCustomer[i].customerFlatNo, name: resp.responseObjList.referedCustomer[i].siteNameCustomerFlatNo });
        }

        console.log(sessionStorage.getItem("customer_flatno_binding"));
        if (sessionStorage.getItem("customer_flatno_binding") !== null && sessionStorage.getItem("customer_flatno_binding") !== "undefined" && sessionStorage.getItem("customer_flatno_binding") !== "null") {
          this.autocompleteform.patchValue({
            CustomerFlatNo: sessionStorage.getItem("customer_flatno_binding"),

          });
        }


      } else if (resp.responseCode == 440) {
        sessionStorage.clear();
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
        if (error == 440) {
          sessionStorage.clear();
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      });

  }

  Flat_onFocused(e) {
    console.log(e);
    // do something when input is focused
  }




}
