import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras, RoutesRecognized } from "@angular/router";
import { Http, RequestOptions, Headers } from '@angular/http';
import { CommonComponent } from 'src/app/common/common.component';
import { StartAChartService } from './start-achart.service';
import { filter, pairwise } from 'rxjs/operators';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ValidatorFn, AbstractControl } from "@angular/forms";
import * as XLSX from 'xlsx';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../product.service';
import { JsonPipe } from '@angular/common';

declare const $: any;
declare const swal: any;
var selected_projectid;
var selected_blockid;
var selected_floorid;
var selected_flatid;
var fromDate;
var toDate;
var project_status;
var Block_A_TRN_XLSXData3;
var Scheme_XLSXData1 = [];
var flatbooking_Id;



@Component({
  selector: 'app-start-achart',
  templateUrl: './start-achart.component.html',
  styleUrls: ['./start-achart.component.sass'],
  providers: [StartAChartService]
})
export class StartAChartComponent implements OnInit {
  public model: any;

  @ViewChild('auto') auto;
  fg: FormGroup;
  uploadtdsform: FormGroup;
  hideme: boolean = false;
  ledgerData: any;
  viewData: any;
  blockID: number[];
  floorID: number[];
  flatID: number[];
  controller: Array<any> = [];
  ChartDetails: Array<any> = [];
  getsiteids: any;
  today: Date;
  loaderhideme: boolean = false;
  customerdata: Array<any> = [];
  availableTags: Array<any> = [];
  flatbookingId: any;
  keyword = "name";
  public countries = this.availableTags;
  employeeIds: any;
  autocomplete: any;
  autocompleteform: FormGroup;
  IS: any;
  unviewedChatCount: any;
  chartcount: any;
  messengerIds: any;
  deptid: any;
  roleid: any;
  previousUrl: string;
  currentUrl: string;
  ledgerData1: any;
  employeeData: Array<any> = [];
  colleterdataview: Array<any> = [];
  norecordsfound: boolean;

  public count: number = 0;
  projectdata: any;
  flatdataname: string;
  number: { text: any; };
  totalcount: any;
  ledgerDatavalue: boolean;
  backflatid: any;
  messageunivcount: any;

  closeResult = '';
  submitted: boolean;
  file: any;
  arrayBuffer: any;
  XlSXData: unknown[];
  Flat_number: any;
  First_Application_name: any;
  Sale_Deed_Value: any;
  Registrationper: any;
  Stamp_Duty_val: any;
  Cesspercentage: any;
  Scanning_Free: any;
  EC: any;
  Total_Reg_Cost: any;
  Wing: any;
  Project_Name: any;
  flat_IDval: string[];
  startdate: string;
  enddate: string;
  customerbookingid: string;
  subjectwisesearch: string;

  floorIDval: string[];
  siteidvalue: string;
  blockIDval: string[];
  title: string;
  site_status: string;
  customerName: any;
  customerdatavalue: string;
  project_id: any[];
  block_id: any[];
  floor_id: any[];
  flat_id: any[];
  projectback_id: string[];






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


      console.log(this.XlSXData);
      console.log(this.file.name);

      $(".file-path").val(this.file.name);
    }
    fileReader.readAsArrayBuffer(this.file);


  }


  constructor(private cmn: CommonComponent, private http: Http, private formBuilder: FormBuilder,
    private router: Router, private service: StartAChartService, private productService: ProductService, private modalService: NgbModal) {
    $('.page-loader-wrapper').show();
    this.deptid = sessionStorage.getItem("session_deptid");
    this.roleid = sessionStorage.getItem("session_roleId");



    if (JSON.parse(sessionStorage.getItem("sitenamevalue")) !== null) {
      // sessionStorage.getItem("Floorname");
      // sessionStorage.getItem("Blocknameid");
      // sessionStorage.getItem("sitenamevalue");
      // sessionStorage.getItem("backflatid");
      // sessionStorage.getItem("backemployeeIds");
      // this.flatdataname = sessionStorage.getItem("backflatid");
      // this.employeeData = JSON.parse(sessionStorage.getItem("backemployeeIds"));
      // this.colleterdataview = JSON.parse(sessionStorage.getItem("backflatid"));

      // if (this.employeeData == undefined || this.employeeData == null) {
      //   this.employeeData = null;
      // } else {
      //   this.employeeData = [JSON.parse(sessionStorage.getItem("backemployeeIds"))];
      // }

      if (this.deptid == 988) {
        this.customerautofield();
      }
      this.siteList();
      this.ChartTotalCountList();

      this.ledgerDatavalue = false;

      // console.log(sessionStorage.getItem("backfromdate"));
      // console.log(sessionStorage.getItem("backtodate"));
      // console.log(sessionStorage.getItem("backemployeeIds"));
      // console.log(sessionStorage.getItem("backflatid"));
      // console.log(sessionStorage.getItem("Blocknameid"));
      // console.log(sessionStorage.getItem("backemployeeIds"));
      // console.log(sessionStorage.getItem("Floorname"));
      // console.log(sessionStorage.getItem("customerbookingid"));
      // console.log(sessionStorage.getItem("subjectwisesearch"));
      // console.log(sessionStorage.getItem("sitenamevalue"));
      // console.log(sessionStorage.getItem("project_status"));

      this.customerdatavalue = sessionStorage.getItem("pagecustomerName");

      this.startdate = sessionStorage.getItem("backfromdate");
      this.enddate = sessionStorage.getItem("backtodate");
      this.employeeIds = sessionStorage.getItem("backemployeeIds");
      this.site_status = sessionStorage.getItem("project_status");

      if (sessionStorage.getItem("backflatid") != null || sessionStorage.getItem("backflatid") != undefined || sessionStorage.getItem("backflatid") != "") {
        this.flat_IDval = [sessionStorage.getItem("backflatid")];
      } else {
        this.flat_IDval = [];
      }


      if (this.flat_IDval[0] == "") {
        this.flat_IDval = [];
      }


      if (sessionStorage.getItem("Blocknameid") != null || sessionStorage.getItem("Blocknameid") != undefined) {
        this.blockIDval = [sessionStorage.getItem("Blocknameid")];
      } else {
        this.blockIDval = [];
      }

      if (this.blockIDval[0] == "") {
        this.blockIDval = [];
      }



      if (sessionStorage.getItem("backemployeeIds") == "null" || sessionStorage.getItem("backemployeeIds") == null || sessionStorage.getItem("backemployeeIds") == undefined) {
        this.employeeIds = null;
      } else {
        this.employeeData = [JSON.parse(sessionStorage.getItem("backemployeeIds"))];
      }


      if (sessionStorage.getItem("Floorname") == "null" || sessionStorage.getItem("Floorname") == null || sessionStorage.getItem("Floorname") == undefined || sessionStorage.getItem("Floorname") == "") {
        this.floorIDval = [];
      } else {
        this.floorIDval = [JSON.parse(sessionStorage.getItem("Floorname"))];
      }

      if (this.floorIDval[0] == "") {
        this.floorIDval = [];
      }

      if (sessionStorage.getItem("customerbookingid") == "null" || sessionStorage.getItem("customerbookingid") == null) {
        this.customerbookingid = null;
      } else {
        this.customerbookingid = sessionStorage.getItem("customerbookingid");
      }

      if (sessionStorage.getItem("subjectwisesearch") == "null" || sessionStorage.getItem("subjectwisesearch") == "") {
        this.subjectwisesearch = null;
      } else {
        this.subjectwisesearch = sessionStorage.getItem("subjectwisesearch");
      }


      this.siteidvalue = sessionStorage.getItem("sitenamevalue");



      this.getmessageListfun(this.flat_IDval, this.startdate, this.enddate, this.employeeIds, this.blockIDval, this.floorIDval, this.customerbookingid, this.subjectwisesearch);
    } else {
      this.ChartTotalCountList();
      setTimeout(() => {
        this.ledgerDatavalue = true;
        // this.getmessagerviewlist();
        this.siteList();
        if (this.deptid == 988) {
          this.customerautofield();
        }

      }, 3000);
    }

  }




  ngOnInit() {

    this.uploadtdsform = this.formBuilder.group({
      filruploadinput: ['', Validators.required],
    });

    this.autocompleteform = this.formBuilder.group({
      employeename: ['']
    });

    this.fg = new FormGroup(
      {
        from: new FormControl(""),
        to: new FormControl("")
      },
      [Validators.required, this.dateRangeValidator]
    );

    this.router.events
      .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
      .subscribe((events: RoutesRecognized[]) => {
        this.previousUrl = events[0].urlAfterRedirects;
        this.currentUrl = events[1].urlAfterRedirects;
        if (this.previousUrl.includes('chartview')) {

        } else {
          // sessionStorage.removeItem("backflatid");
          // sessionStorage.removeItem("backfromdate");
          // sessionStorage.removeItem("backtodate");
          // sessionStorage.removeItem("backemployeeIds");
        }
      });



    this.title = "StartAChart";
    sessionStorage.setItem("title", this.title);



    this.autocompleteform = this.formBuilder.group({
      employeename: ['']
    });





    function initCharts() {
      //Chart Bar
      $('.chart.chart-bar').sparkline(undefined, {
        type: 'bar',
        barColor: '#fff',
        negBarColor: '#fff',
        barWidth: '4px',
        height: '45px'
      });

      //Chart Pie
      $('.chart.chart-pie').sparkline(undefined, {
        type: 'pie',
        height: '45px',
        sliceColors: ['rgba(255,255,255,0.70)', 'rgba(255,255,255,0.85)', 'rgba(255,255,255,0.95)', 'rgba(255,255,255,1)']
      });

      //Chart Line
      $('.chart.chart-line').sparkline(undefined, {
        type: 'line',
        width: '60px',
        height: '45px',
        lineColor: '#fff',
        lineWidth: 1.3,
        fillColor: 'rgba(0,0,0,0)',
        spotColor: 'rgba(255,255,255,0.40)',
        maxSpotColor: 'rgba(255,255,255,0.40)',
        minSpotColor: 'rgba(255,255,255,0.40)',
        spotRadius: 3,
        highlightSpotColor: '#fff'
      });
    }
    var self = this;
    $("#projectID").select2({
      placeholder: "--Select--",
      dir: "ltl",
    });

    $("#BlockId").select2({
      placeholder: "--Select--",
      dir: "ltl"
    });

    $("#floorSelection").select2({
      placeholder: "--Select--",
      dir: "ltl"
    });

    $("#flatSelection").select2({
      placeholder: "--Select--",
      dir: "ltl"
    });

    $("#customerID").select2({
      placeholder: "--Select--",
      dir: "ltl"
    });

    $(function () {
      $('#projectID').change(function (e) {


        project_status = $(e.target).val().split("-")[1];
        selected_projectid = $(e.target).val().split("-")[0];
        if (selected_projectid == "select") {
          flatbooking_Id = null;
          this.customerbookingid = null;
          sessionStorage.removeItem("customerbookingid");
          sessionStorage.removeItem("backflatid");
          sessionStorage.removeItem("Blocknameid");
          $("#BlockId option[value]").remove();
          $("#floorSelection option[value]").remove();
          $("#flatSelection option[value]").remove();
          $("#customerID option[value]").remove();
          sessionStorage.removeItem("Floorname");

        } else {
          sessionStorage.removeItem("Floorname");
          sessionStorage.removeItem("backflatid");
          sessionStorage.setItem('ledgerData', '');
          self.projectchangeFun(selected_projectid);
          self.floorsitewisechange(selected_projectid);
          self.customernamelist(selected_projectid);
          setTimeout(() => {
            self.flatsitewisechange(selected_projectid);
          }, 500);


        }
      })

      $('#BlockId').change(function (e) {
        selected_blockid = $(e.target).val();
        if (selected_blockid == "select") {
          // swal("please select the block");
          flatbooking_Id = null;
          $("#floorSelection option[value]").remove();
          // $("#flatSelection option[value]").remove();
          self.flatsitewisechange(selected_projectid);
          self.floorsitewisechange(selected_projectid);
          self.customernamelist(selected_projectid);
          $("#customerID option[value]").remove();
          this.customerbookingid = null;
          sessionStorage.removeItem("customerbookingid");
          sessionStorage.removeItem("backflatid");
          sessionStorage.removeItem("Blocknameid");
          sessionStorage.removeItem("Floorname");
        } else {
          this.controller = [0];
          sessionStorage.setItem('ledgerData', '');
          self.blockchangeFun(selected_blockid);
          self.flatwiseblockchange(selected_blockid);
          self.customernamelist(selected_blockid);
          sessionStorage.removeItem("backflatid");
          sessionStorage.removeItem("Blocknameid");
          sessionStorage.removeItem("Floorname");
        }
      })

      $('#floorSelection').change(function (e) {
        this.selectedFloorID = "";
        selected_floorid = $(e.target).val();

        console.log(selected_floorid);
        if (selected_floorid == "select") {
          //   swal("please select the floor");
          //$("#flatSelection option[value]").remove();
          $("#customerID option[value]").remove();
          sessionStorage.removeItem("backflatid");
          flatbooking_Id = null;
          this.customerbookingid = null;
          sessionStorage.removeItem("customerbookingid");

          if (selected_blockid != undefined && selected_projectid != undefined || selected_blockid != null && selected_projectid != null) {
            self.flatwiseblockchange(selected_blockid);
            self.customernamelist(selected_blockid);
          } else if (selected_blockid == undefined && selected_projectid != undefined || selected_blockid == null && selected_projectid != null) {
            self.flatsitewisechange(selected_projectid);
            self.customernamelist(selected_blockid);
          }

        } else {
          this.controller = [0];
          sessionStorage.setItem('ledgerData', '');
          self.floorchangeFun(selected_floorid);
          self.customernamelist(selected_floorid);
        }
      })

      $('#flatSelection').change(function (e) {
        this.selectedFlatID = "";
        selected_flatid = $(e.target).val();

        if (selected_flatid == "select") {
          //  swal("please select the flat");

          flatbooking_Id = null;
          this.customerbookingid = null;
          sessionStorage.removeItem("customerbookingid");
          $("#customerID option[value]").remove();
          self.customernamelist(selected_floorid);
        } else {
          // $('.table-responsive').hide();
          // this.viewData = "";
          sessionStorage.setItem('ledgerData', '');
          self.flatchangeFun(selected_flatid);
          self.customernamelist(selected_flatid);

        }
      })


      $('#customerID').change(function (e) {
        flatbooking_Id = $(e.target).val();
        if (flatbooking_Id == "select") {
          flatbooking_Id = null;
        } else {
          flatbooking_Id = $(e.target).val();
        }
      })


    })


    // var date = new Date().getMonth();
    // var minimumdate = new Date().setMonth(date - 3);
    // var maximumdate = new Date().setMonth(date + 3);
    // $('#fromDate').bootstrapMaterialDatePicker({
    //   format: 'YYYY-MM-DD',
    //   minDate: new Date(minimumdate),
    //   maxDate: new Date(),
    //   clearButton: true,
    //   weekStart: 1,
    //   time: false,

    // });

    // $('#toDate').bootstrapMaterialDatePicker({
    //   format: 'YYYY-MM-DD',
    //   minDate: new Date(minimumdate),
    //   maxDate: new Date(),
    //   clearButton: true,
    //   weekStart: 1,
    //   time: false
    // });

    // $(function () {
    //   $("#fromDate").datepicker({
    //     dateFormat: "yy-mm-dd",
    //     maxDate: 0,
    //     onSelect: function (date) {
    //       var dt2 = $('#toDate');
    //       var startDate = $(this).datepicker('getDate');
    //       var minDate = $(this).datepicker('getDate');
    //       if (dt2.datepicker('getDate') == null) {
    //         // dt2.datepicker('setDate', minDate);
    //       }
    //       //dt2.datepicker('option', 'maxDate', '0');
    //       dt2.datepicker('option', 'minDate', minDate);
    //     }
    //   });
    //   $('#toDate').datepicker({
    //     dateFormat: "yy-mm-dd",
    //     maxDate: 0
    //   });
    // });

  }

  get f() { return this.uploadtdsform.controls; }

  homeClick() {
    // this.router.navigate(['leave-update']);
    this.router.navigate(['dashboard']);
  }

  setDate() {
    // var getmonth = new Date().getMonth();
    // var temp = new Date().setMonth(getmonth - 1);
    // var minDate = new Date(temp);
    // var year = minDate.getFullYear();
    // var month = ("0" + (minDate.getMonth() + 1)).slice(-2);
    // var day = ("0" + minDate.getDate()).slice(-2);
    // var minimumdate = year + '-' + month + '-' + day;

    // var date2 = new Date();
    // var year2 = date2.getFullYear();
    // var month2 = ("0" + (date2.getMonth() + 1)).slice(-2);
    // var day2 = ("0" + date2.getDate()).slice(-2);
    // var maximumdate = year2 + '-' + month2 + '-' + day2;
    // fromDate = minimumdate;
    // toDate = maximumdate;
  }


  /*-----------------Getting Project(site) list Start---------------------*/
  siteList() {
    var arr = localStorage.getItem('SiteIDS');
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "messenger/sitesForInbox.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": sessionStorage.getItem("login_sessionkey"),
      "siteIds": JSON.parse(arr).map(String),
      "subModuleName": "startAChat"
    }

    console.log(body);

    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      console.log(resp);
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#projectID').html("");
        $('#projectID').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#projectID').append("<option value='" + resp.responseObjList[i].siteId + "-" + resp.responseObjList[i].siteStatus + "'>" + resp.responseObjList[i].siteName + "</option>");
        }

        console.log(this.siteidvalue);
        console.log(this.site_status);

        var self = this;

        if (sessionStorage.getItem("sitenamevalue") == null) {

        } else {
          $('#projectID').val(this.siteidvalue + "-" + this.site_status);
          self.projectchangeFun(this.siteidvalue);
          self.blockchangeFun(this.siteidvalue);
          self.customernamelist(this.siteidvalue);
          //  self.floorsitewisechange(JSON.parse(sessionStorage.getItem("sitenamevalue")));
          self.flatsitewisechange(this.siteidvalue);
          // this.projectchangeFun(JSON.parse(sessionStorage.getItem("sitenamevalue")));
          // this.floorsitewisechange(JSON.parse(sessionStorage.getItem("sitenamevalue")));
        }


        if (sessionStorage.getItem("backflatid") != null) {
          self.flatsitewisechange(this.siteidvalue);
        }

        if (sessionStorage.getItem("Floorname") != null) {
          this.floorsitewisechange(this.siteidvalue);
        }



        if (sessionStorage.getItem("backflatid") == null) {

        } else {
          self.flatsitewisechange(this.siteidvalue);

        }


        if (this.subjectwisesearch == null || this.subjectwisesearch == "" || this.subjectwisesearch == undefined) {

        } else {
          $("#subject_wise_search").val(this.subjectwisesearch);
        }




        if (sessionStorage.getItem("backfromdate") == null) {

        } else {
          $("#fromDate").val(sessionStorage.getItem("backfromdate"));
        }

        if (sessionStorage.getItem("backtodate") == null) {

        } else {
          $("#toDate").val(sessionStorage.getItem("backtodate"));
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



  /*------------------------Projects On Change Functionality Start--------------------*/
  projectchangeFun(selectedSiteID) {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "block/blocks.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "ids": [selectedSiteID]
    }

    console.log(body);
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      console.log(resp);
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#BlockId').html("");
        $('#BlockId').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#BlockId').append("<option value='" + resp.responseObjList[i].detId + "'>" + resp.responseObjList[i].name + "</option>");
        }

        console.log(sessionStorage.getItem("Blocknameid"));

        var self = this;
        if (sessionStorage.getItem("Blocknameid") == null || sessionStorage.getItem("Blocknameid") == undefined || sessionStorage.getItem("Blocknameid") == "") {

        } else {
          $('#BlockId').val(JSON.parse(sessionStorage.getItem("Blocknameid")));
          self.blockchangeFun(JSON.parse(sessionStorage.getItem("Blocknameid")));
          self.floorchangeFun(JSON.parse(sessionStorage.getItem("Blocknameid")));

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

  /*------------------------Block On Change Functionality Start--------------------*/
  blockchangeFun(selectedBlockID) {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "floor/floor.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "ids": [Number($('#BlockId').val())],
    }
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#floorSelection').html("");
        $('#floorSelection').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#floorSelection').append("<option value='" + resp.responseObjList[i].detId + "'>" + resp.responseObjList[i].name + "</option>");
        }


        if (sessionStorage.getItem("Floorname") == null || sessionStorage.getItem("Floorname") == "" || sessionStorage.getItem("Floorname") == undefined) {

        } else {
          $('#floorSelection').val(sessionStorage.getItem("Floorname"));
        }


        console.log(sessionStorage.getItem("Floorname"));

        var self = this;
        if (sessionStorage.getItem("Floorname") == null || sessionStorage.getItem("Floorname") == "" || sessionStorage.getItem("Floorname") == undefined) {

        } else {
          self.floorchangeFun(sessionStorage.getItem("Floorname"));
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
  /*------------------------Blocks On Change Functionality End--------------------*/

  /*------------------------Floors On Change Functionality Start--------------------*/
  floorchangeFun(selectedFloorID) {


    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "flat/flat.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "ids": [selectedFloorID],
    }

    console.log(body);
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      console.log(resp);
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#flatSelection').html("");
        this.controller = [0];
        $('#flatSelection').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#flatSelection').append("<option value='" + resp.responseObjList[i].detId + "'>" + resp.responseObjList[i].name + "</option>");

          if (sessionStorage.getItem("backflatid") == null || sessionStorage.getItem("backflatid") == "null" || sessionStorage.getItem("backflatid") == undefined) {
            this.controller.push(resp.responseObjList[i].detId);
          }
        }


        if (sessionStorage.getItem("backflatid") == null || sessionStorage.getItem("backflatid") == "null" || sessionStorage.getItem("backflatid") == undefined || sessionStorage.getItem("backflatid") == "undefined") {

        } else {
          $('#flatSelection').val(sessionStorage.getItem("backflatid"));
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
  /*------------------------Floors On Change Functionality End--------------------*/


  /*------------------------Floors On Change Functionality Start--------------------*/
  flatchangeFun(selectedFlatID) {
    this.controller = [0];
    this.controller.push(Number(selectedFlatID));
  }

  floorsitewisechange(siteid) {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "floor/floorSite.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "ids": [siteid]
    }

    console.log(body);
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      console.log(resp);
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#floorSelection').html("");
        $('#floorSelection').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#floorSelection').append("<option value='" + resp.responseObjList[i].detId + "'>" + resp.responseObjList[i].name + "</option>");
        }
        if (sessionStorage.getItem("Floorname") == null) {

        } else {
          $('#floorSelection').val(JSON.parse(sessionStorage.getItem("Floorname")));
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



  flatsitewisechange(siteid) {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "flat/flatSite.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "ids": [siteid],

    }
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#flatSelection').html("");
        this.controller = [0];
        $('#flatSelection').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#flatSelection').append("<option value='" + resp.responseObjList[i].detId + "'>" + resp.responseObjList[i].name + "</option>");

          if (sessionStorage.getItem("backflatid") == null || sessionStorage.getItem("backflatid") == "null" || sessionStorage.getItem("backflatid") == undefined) {
            this.controller.push(resp.responseObjList[i].detId);
          }
        }

        console.log(sessionStorage.getItem("backflatid"));


        if (sessionStorage.getItem("backflatid") == null || sessionStorage.getItem("backflatid") == "null" || sessionStorage.getItem("backflatid") == undefined || sessionStorage.getItem("backflatid") == "undefined") {

        } else {
          $('#flatSelection').val(this.flatdataname);
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
        //var error = JSON.parse(error._body).responseCode;
        //alert(error);
        $('.page-loader-wrapper').hide();
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }




  flatwiseblockchange(blockid) {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "flat/flatBlock.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "ids": [blockid],
    }

    console.log(body);
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      console.log(resp);
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#flatSelection').html("");
        this.controller = [0];
        $('#flatSelection').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#flatSelection').append("<option value='" + resp.responseObjList[i].detId + "'>" + resp.responseObjList[i].name + "</option>");
          this.controller.push(resp.responseObjList[i].detId);
        }


        console.log(sessionStorage.getItem("backflatid"));
        if (sessionStorage.getItem("backflatid") == null || sessionStorage.getItem("backflatid") == "" || sessionStorage.getItem("backflatid") == undefined) {

        } else {
          $('#flatSelection').val(sessionStorage.getItem("backflatid"));
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
        //  var error = JSON.parse(error._body).responseCode;
        $('.page-loader-wrapper').hide();
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }

  /*----------------------- get Customer Ledger Functionality Start--------------------*/
  getCustomerLedger() {
    sessionStorage.removeItem("sitenamevalue");
    sessionStorage.removeItem("this.ratingvalue");
    sessionStorage.removeItem("categoryname");
    sessionStorage.removeItem("pagecustomerName");
    sessionStorage.removeItem("employeeIds");
    sessionStorage.removeItem("Escalationlevelempid");


    sessionStorage.removeItem("backflatid");
    sessionStorage.removeItem("backfromdate");
    sessionStorage.removeItem("backtodate");
    sessionStorage.removeItem("backemployeeIds");
    sessionStorage.removeItem("Blocknameid");
    sessionStorage.removeItem("Floorname");
    sessionStorage.removeItem("customerbookingid");
    sessionStorage.removeItem("subjectwisesearch");
    sessionStorage.removeItem("subjectwisesearch");

    this.project_id = [];
    this.block_id = [];
    this.floor_id = [];
    this.flat_id = [];




    // $("#subject_wise_search").val("");
    // $("#fromDate").val("");
    // $("#toDate").val("");



    var startdate = $('#fromDate').val();
    var endDate = $('#toDate').val();

    if (new Date(startdate) > new Date(endDate)) {
      swal('To Date should be greater than or equal to From Date');
      return false;
    }


    if ($('#projectID').val() == 'select' || $('#projectID').val() == null) {
      swal("Please select project");
      return false;
    }
    sessionStorage.setItem("ledgerData", "");
    if ($('#BlockId').val() == 'select' || $('#BlockId').val() == null) {
      this.blockID = [];
    } else {
      this.blockID = [Number($('#BlockId').val())]
    }

    if (selected_floorid == "select" || selected_floorid == undefined) {
      this.floorID = [];
      // swal("Please select flat");
      // return false;

    } else {
      this.floorID = [Number($('#floorSelection').val())]
    }

    if ($('#flatSelection').val() == 'select' || $('#flatSelection').val() == null) {
      this.flatID = [];
    } else {
      this.flatID = [Number($('#flatSelection').val())]
    }



    var startdate = $('#fromDate').val();
    var endDate = $('#toDate').val();
    if (new Date(startdate) > new Date(endDate)) {
      swal('Please select  a valid from and to date');
      return false;
    }



    if (($('#fromDate').val() == '' || $('#toDate').val() == '')) {

      startdate = $('#fromDate').val();
      endDate = $('#toDate').val();


      if (startdate == '') {
        startdate = null;
      }
      if (endDate == '') {
        endDate = null;
      }
    } else {
      this.setDate();
    }

    this.hideme = true;

    if (sessionStorage.getItem("backflatid") == null || sessionStorage.getItem("backflatid") == "null" || sessionStorage.getItem("backflatid") == undefined || sessionStorage.getItem("backflatid") == "undefined") {
      this.controller = [];
    } else {
      this.controller = JSON.parse(sessionStorage.getItem("backflatid"));
    }


    // console.log(this.floorID);
    // console.log(startdate);
    // console.log(endDate);
    // console.log(this.employeeIds);

    // console.log( this.blockID);
    // console.log(this.flatID);
    // console.log(flatbooking_Id);
    // console.log($("#subject_wise_search").val());



    this.getmessageListfun(this.flatID, startdate, endDate, this.employeeIds, this.blockID, this.floorID, flatbooking_Id, $("#subject_wise_search").val());

  }
  /*------------------------Floors On Change Functionality End--------------------*/


  viewallcustomers(userdata, index) {

    $(".page-loader-wrapper").show();
    this.service.getmessageslist(userdata.messengerId).then(resp => {
      $(".page-loader-wrapper").hide();
      if (resp.responseCode == 200) {

        localStorage.removeItem('ChartDetails');
        localStorage.removeItem("MessagerID");
        localStorage.setItem('Customerviewchartdetails', JSON.stringify(userdata));
        sessionStorage.setItem("chartdata", JSON.stringify(resp));
        this.router.navigateByUrl('chartview');
        this.getmessagerviewlist();

      } else if (resp.responseCode == 440) {
        swal("Error!", "Your session has been expired.", "error");
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
    })


  }


  startnewchart() {
    if ($('#projectID').val() == 'select' || $('#projectID').val() == null) {
      swal("Please select project");
      return false;
    }

    if (project_status != "nonCCSite") {
      swal("You don't have the access to create a new chat option to selected project.");
      return false;
    }

    if ($('#flatSelection').val() == 'select') {
      swal("Please select Flat");
      return false;
    }

    if ($('#flatSelection').val() == 'select' || $('#flatSelection').val() == null) {
      this.flatID = [];
    } else {
      this.flatID = [Number($('#flatSelection').val())]
    }


    if (this.controller[0] == 0) {
      this.controller = this.flatID;
    }


    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "/messenger/startNewChat.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "flatIds": this.controller,
      "siteIds": [selected_projectid],
    }

    console.log(url);
    console.log(JSON.stringify(body));



    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      console.log(resp);

      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        this.ChartDetails = resp.messengerDetailsPojos;
        localStorage.removeItem('Customerviewchartdetails');
        localStorage.removeItem("MessagerID");
        localStorage.setItem('ChartDetails', JSON.stringify(this.ChartDetails));
        this.router.navigateByUrl('chartview');
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



  getmessageListfun(flatid, fromdate, todate, employeeIds, blockid, floorid, bookingid, subjectwisesearch) {

    $('#tableExport1').DataTable().destroy();
    $('.page-loader-wrapper').show();
    if ($('#fromDate').val() == undefined) {
      if (fromdate == "undefined" || fromdate == "null") {
        fromdate = null;
      }
    }

    if ($('#toDate').val() == undefined) {
      if (todate == "undefined" || todate == "null") {
        todate = null;
      }
    }


    if (employeeIds == undefined) {
      employeeIds = null
    }
    if (subjectwisesearch == undefined || subjectwisesearch == "") {
      subjectwisesearch = null;
    }

    if (bookingid == undefined || bookingid == "") {
      bookingid = null;
    }

    console.log(floorid[0]);
    if (isNaN(floorid[0])) {
      floorid = [];
    }








    $('.page-loader-wrapper').show();
    this.ledgerData = [];
    let url = this.cmn.commonUrl + "messenger/getMessagesList.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "requestUrl": "getMessagesList",
      "flatIds": flatid,
      "startDate": fromdate,
      "endDate": todate,
      "employeeIds": employeeIds,
      "siteIds": [selected_projectid],
      "blockIds": blockid,
      "floorIds": floorid,
      "subject": subjectwisesearch,
      "flatBookingId": bookingid,
    }

    console.log(body);



    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      console.log(resp);
      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();


        this.ledgerData1 = resp.messengerDetailsPojos;
        sessionStorage.setItem("slidearrowoption", JSON.stringify(this.ledgerData1));
        if (this.ledgerData1.length == 0) {
          this.norecordsfound = true;
        } else {
          this.norecordsfound = false;
        }

        console.log(JSON.parse(sessionStorage.getItem("sitenamevalue")));
        if (JSON.parse(sessionStorage.getItem("sitenamevalue")) !== null) {

          setTimeout(function () {
            $(document).ready(function () {
              $('#tableExport1').DataTable({
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


        } else {
          setTimeout(function () {
            $(document).ready(function () {
              $('#tableExport1').DataTable({
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



              }).draw();

            });
          }, 2000)

        }





        sessionStorage.setItem("sitenamevalue", selected_projectid);
        sessionStorage.setItem("Blocknameid", blockid);
        sessionStorage.setItem("Floorname", floorid);
        sessionStorage.setItem("backflatid", flatid);
        sessionStorage.setItem("backfromdate", fromdate);
        sessionStorage.setItem("backtodate", todate);
        sessionStorage.setItem("flatiddata", selected_flatid);
        sessionStorage.setItem("customerbookingid", bookingid);
        sessionStorage.setItem("subjectwisesearch", subjectwisesearch);
        sessionStorage.setItem("backemployeeIds", employeeIds);
        sessionStorage.setItem("project_status", project_status);
        sessionStorage.setItem("pagecustomerName", this.customerName);

        this.loaderhideme = false;
        // this.auto.clear();
        // $("#projectID option[value]").remove();
        // $("#BlockId option[value]").remove();
        // $("#floorSelection option[value]").remove();
        // $("#flatSelection option[value]").remove();
        // $('#fromDate').val("");
        // $('#toDate').val("");
        // this.employeeIds = null;
        // this.autocompleteform.patchValue({
        //   employeename: '',
        // });



        //   this.siteList();

        //  this.customerautofield();




      } else if (resp.responseCode == 440) {
        $('.page-loader-wrapper').hide();
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        $('.page-loader-wrapper').hide();
        this.ledgerData = resp.messengerDetailsPojos;
        if (this.ledgerData = null) {
          this.norecordsfound = false;
        } else {
          this.norecordsfound = true;
        }
        swal(resp.errors[0]);
      }
    },
      error => {
        $('.page-loader-wrapper').hide();
        var error = JSON.parse(error._body).responseCode;
        $('.page-loader-wrapper').hide();
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }



  getmessagerviewlist() {
    this.loaderhideme = true;
    this.service.getmessagerviewlistdata().then(resp => {

      console.log(resp);

      this.loaderhideme = false;
      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        this.messageunivcount = resp.messengerDetailsPojos;
        console.log(this.messageunivcount);

        sessionStorage.setItem("slidearrowoption", JSON.stringify(this.messageunivcount));
        sessionStorage.setItem("messagecount", JSON.stringify(this.messageunivcount));
        this.productService.sendNumber(this.increament());

        console.log(sessionStorage.getItem("sitenamevalue"));
        console.log(JSON.parse(sessionStorage.getItem("sitenamevalue")));

        if (JSON.parse(sessionStorage.getItem("sitenamevalue")) == null || sessionStorage.getItem("sitenamevalue") == undefined) {
          this.ledgerData = resp.messengerDetailsPojos;
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
                  localStorage.setItem('offersDataTables1', JSON.stringify(oData));
                },
                "fnStateLoad": function (oSettings) {
                  return JSON.parse(localStorage.getItem('offersDataTables1'));
                }

              });
            });
          }, 2000)
          this.loaderhideme = false;
          // if (this.ledgerData == 0) {
          //   swal('No Data Available');
          // }
        }


      } else if (resp.responseCode == 440) {
        $('.page-loader-wrapper').hide();
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else if (resp.responseCode == 900) {
        $('.page-loader-wrapper').hide();
        this.ledgerData = resp.messengerDetailsPojos;
        if (this.ledgerData = null) {
          this.norecordsfound = false;
        } else {
          this.norecordsfound = true;
        }


        sessionStorage.setItem("messagecount", JSON.stringify(this.messageunivcount));
        sessionStorage.setItem("messageTotalcount", "Messagecount");
        if (resp.messengerDetailsPojos == null) {
          this.loaderhideme = false;
        }
        //  swal(resp.errors[0]);

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
    })
  }

  increament() {
    this.count = this.messageunivcount.length;
    console.log("done");
    return this.count;
  }

  selectEvent(item) {
    if (item == undefined) {
      this.employeeIds = null;
    } else {
      this.employeeIds = [item.id];
      this.customerName = item.name;
    }
  }


  onChangeSearch(val: string) {

    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {

    // do something when input is focused
  }

  onClearSearch(item) {
    if (item == undefined) {
      this.employeeIds = null;
    }
  }


  customerautofield() {
    //  $(".page-loader-wrapper").show();
    this.service.GetCustomernamefun("", "").then(resp => {

      $(".page-loader-wrapper").hide();
      if (resp.responseCode == 200) {
        this.customerdata = resp.employeeDetailsPojos;
        if (this.customerdata.length == 0) {
          swal("Error!", "Please enter valid customer name", "error");

        } else {
          for (var i = 0; i < this.customerdata.length; i++) {
            this.availableTags.push({
              id: this.customerdata[i].employeeId,
              name: this.customerdata[i].employeeName
            });

          }

          if (this.customerdatavalue == null || this.customerdatavalue == "undefined") {
          } else {
            this.autocompleteform.get('employeename').patchValue(this.customerdatavalue);
          }

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

  // setDate() {
  //   var getmonth = new Date().getMonth();
  //   var temp = new Date().setMonth(getmonth - 1);
  //   var minDate = new Date(temp);
  //   var year = minDate.getFullYear();
  //   var month = ("0" + (minDate.getMonth() + 1)).slice(-2);
  //   var day = ("0" + minDate.getDate()).slice(-2);
  //   var minimumdate = year + '-' + month + '-' + day;
  //   var date2 = new Date();
  //   var year2 = date2.getFullYear();
  //   var month2 = ("0" + (date2.getMonth() + 1)).slice(-2);
  //   var day2 = ("0" + date2.getDate()).slice(-2);
  //   var maximumdate = year2 + '-' + month2 + '-' + day2;
  //   fromDate = minimumdate;
  //   toDate = maximumdate;
  // }
  getToday(): string {
    return new Date().toISOString().split('T')[0]
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





  ChartTotalCountList() {
    this.service.ChartTotalCountListservice().then(resp => {
      console.log(resp);
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
          }

          this.getmessagerviewlist();

        } else if (resp.responseCode == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        } else {
          //swal(resp.errors[0]);
        }
      }, 1000);

    });
  }



  SendBultchartsfun(content) {
    if ($('#projectID').val() == 'select' || $('#projectID').val() == null) {
      swal("Please select project");
      return false;
    }

    this.modalService.open(content, { backdrop: 'static', size: 'lg', keyboard: false, centered: true }).result.then((result) => {
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



  filesubmit() {
    this.submitted = true;
    if (this.uploadtdsform.invalid) {
      return;
    } else {

      var error = true;
      Scheme_XLSXData1 = this.XlSXData;

      if (Scheme_XLSXData1.length == 0) {
        swal("Please upload valid excel.");
        return false;
      }


      var financialSchemeRequests = [];

      for (var i = 0; i < Scheme_XLSXData1.length; i++) {



        if (Scheme_XLSXData1[i]['Flat No.'] == null || Scheme_XLSXData1[i]['Flat No.'] == undefined) {
          this.Flat_number = null;
        } else {
          this.Flat_number = Scheme_XLSXData1[i]['Flat No.'];
        }

        if (Scheme_XLSXData1[i]['First Applicant Name'] == null || Scheme_XLSXData1[i]['First Applicant Name'] == undefined) {
          this.First_Application_name = null;
        } else {
          this.First_Application_name = Scheme_XLSXData1[i]['First Applicant Name'];
        }

        if (Scheme_XLSXData1[i][" Sale Deed Value "] == null || Scheme_XLSXData1[i][" Sale Deed Value "] == undefined) {
          this.Sale_Deed_Value = null;
        } else {
          this.Sale_Deed_Value = Scheme_XLSXData1[i][" Sale Deed Value "];
        }





        if (Scheme_XLSXData1[i]['Registration @ 1%'] == null || Scheme_XLSXData1[i]['Registration @ 1%'] == undefined) {
          this.Registrationper = null;
        } else {
          this.Registrationper = Scheme_XLSXData1[i]['Registration @ 1%'];
        }

        if (Scheme_XLSXData1[i]['Stamp Duty @ 5.15%'] == null || Scheme_XLSXData1[i]['Stamp Duty @ 5.15%'] == undefined) {
          this.Stamp_Duty_val = null;
        } else {
          this.Stamp_Duty_val = Scheme_XLSXData1[i]['Stamp Duty @ 5.15%'];
        }


        if (Scheme_XLSXData1[i]['Cess @ 0.5%'] == null || Scheme_XLSXData1[i]['Cess @ 0.5%'] == undefined) {
          this.Cesspercentage = null;
        } else {
          this.Cesspercentage = Scheme_XLSXData1[i]['Cess @ 0.5%'];
        }

        if (Scheme_XLSXData1[i]['Scanning Fee'] == null || Scheme_XLSXData1[i]['Scanning Fee'] == undefined) {
          this.Scanning_Free = null;
        } else {
          this.Scanning_Free = Scheme_XLSXData1[i]['Scanning Fee'];
        }

        if (Scheme_XLSXData1[i]['EC'] == null || Scheme_XLSXData1[i]['EC'] == undefined) {
          this.EC = null;
        } else {
          this.EC = Scheme_XLSXData1[i]["EC"];
        }


        if (Scheme_XLSXData1[i]['Total Reg Cost'] == null || Scheme_XLSXData1[i]['Total Reg Cost'] == undefined) {
          this.Total_Reg_Cost = null;
        } else {
          this.Total_Reg_Cost = Scheme_XLSXData1[i]['Total Reg Cost'];
        }


        if (Scheme_XLSXData1[i]['Wing'] == null || Scheme_XLSXData1[i]['Wing'] == undefined) {
          this.Wing = null;
        } else {
          this.Wing = Scheme_XLSXData1[i]['Wing'];
        }





        // console.log(this.Flat_number);
        // console.log(this.First_Application_name);
        // console.log(this.Sale_Deed_Value);
        // console.log(this.Registrationper);
        // console.log(this.Stamp_Duty_val);
        // console.log(this.Cesspercentage);
        // console.log(this.Scanning_Free);
        // console.log(this.EC);
        // console.log(this.Total_Reg_Cost);
        // console.log(this.Wing);


        var demandNoteTransactionRequests = {
          "filed_A": this.Flat_number,
          "filed_B": this.First_Application_name,
          "filed_C": this.Sale_Deed_Value,
          "filed_D": this.Registrationper,
          "filed_E": this.Stamp_Duty_val,
          "filed_F": this.Cesspercentage,
          "filed_G": this.Scanning_Free,
          "filed_H": this.EC,
          "filed_I": this.Total_Reg_Cost,
          "filed_J": this.Wing
        }

        financialSchemeRequests.push(demandNoteTransactionRequests);


      }

      // console.log(financialSchemeRequests);

      var arr = localStorage.getItem('SiteIDS');
      $('.page-loader-wrapper').show();
      let url = this.cmn.commonUrl + "messenger/chatSubmit.spring";

      var body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "requestType": "RegistrationProcess",
        "siteIds": [selected_projectid],
        "excelObject": financialSchemeRequests,
      };

      console.log(url);

      console.log(JSON.stringify(body));




      // console.log(JSON.stringify(body));
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

        console.log(JSON.stringify(resp));
        $('.page-loader-wrapper').hide();
        if (resp.responseCode == 200) {
          this.modalService.dismissAll();
          $("#files").val("");
          $('.page-loader-wrapper').hide();
          swal(resp.responseObjList);
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
          this.modalService.dismissAll();
          // swal("Failed to do something exceptional!");
          swal("Error!", resp.errors, "error");
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

  /*-----------------Getting Project(site) list Start---------------------*/
  customernamelist(siteidd) {

    this.projectback_id = [this.siteidvalue];

    if (selected_projectid == undefined || selected_projectid == "select" || selected_projectid == null || selected_projectid == "null") {
      this.project_id = [];
    } else {
      this.project_id = [JSON.parse(selected_projectid)];
    }

    if (selected_blockid == undefined || selected_blockid == "select" || selected_blockid == null || selected_blockid == "null") {
      this.block_id = [];
    } else {
      this.block_id = [JSON.parse(selected_blockid)]
    }


    if (selected_floorid == undefined || selected_floorid == "select" || selected_floorid == null || selected_floorid == "null") {
      this.floor_id = [];
    } else {
      this.floor_id = [JSON.parse(selected_floorid)]
    }



    if (selected_flatid == undefined || selected_flatid == "select" || selected_flatid == null || selected_flatid == "null") {
      this.flat_id = [];
    } else {
      this.flat_id = [JSON.parse(selected_flatid)];
    }


    $('.page-loader-wrapper').show();
    var arr = localStorage.getItem('SiteIDS');
    let url = this.cmn.commonUrl + "references/searchCustomer.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "customerName": null,
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "requestUrl": "CustomerFlatNoForInbox",
      "siteIds": this.project_id,
      "blockIds": this.block_id,
      "floorIds": this.floor_id,
      "flatIds": this.flat_id,
    }


    console.log(url);
    console.log(JSON.stringify(body));


    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      console.log(resp);

      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        this.customerdata = resp.responseObjList.referedCustomer;
        var Options = "";
        $('#customerID').html('');
        $('#customerID').append("<option value='select'>--Select--</option>")
        for (var i = 0; i < this.customerdata.length; i++) {
          $('#customerID').append("<option value='" + this.customerdata[i].flatBookingId + "'>" + this.customerdata[i].siteNameCustomerFlatNo + "</option>");
        }

        if (sessionStorage.getItem("customerbookingid") == "null" || sessionStorage.getItem("customerbookingid") == null) {

        } else {
          $('#customerID').val(this.customerbookingid);
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




}

