import { Component, OnInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { CreateAppointmentTimeSlotsService } from './create-appointment-time-slots.service';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, FormBuilder } from "@angular/forms";
import { Http, Headers, RequestOptions } from '@angular/http';
import { ActivatedRoute, Router, RoutesRecognized } from "@angular/router";
import { CommonComponent } from '../common/common.component';

import { ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';
import { MatInput } from '@angular/material';

//import French from 'flatpickr/dist/l10n/fr.js';
//import flatpickr from 'flatpickr';

declare const $: any;
declare const swal: any;

var selected_projectid;
var selected_blockid;
var selected_blockid1;
var selected_floors;
var selected_floors1;
var title_floorname;
var fromdate;
var todate;
var flatwiseselect = [];



@Component({
  selector: 'app-create-appointment-time-slots',
  templateUrl: './create-appointment-time-slots.component.html',
  styleUrls: ['./create-appointment-time-slots.component.sass'],

})
export class CreateAppointmentTimeSlotsComponent implements OnInit {
  @ViewChild('content_title') content;

  dateform: FormGroup;
  closeResult = '';
  fg: FormGroup;
  controller: Array<any> = [];
  SelectDates: Array<any> = [];
  apptmtSlotTimesInfoListdetails: Array<any> = [];
  returnslotdates: Array<any> = [];
  private showDatepicker: boolean = true;
  minDate = new Date();
  // closebtnhideshow:boolean=false;
  projectname: any;
  starttimehours: any;
  starttimeminutes: any;
  startampm: any;
  endhours: any;
  endminutes: any;
  endampm: any;
  slotstime: string;
  starttimoment: moment.Moment;
  endtimemoment: moment.Moment;
  disstarttime: any;
  disendtime: any;
  select_Hours: Array<any> = [];
  select_Minutes: Array<any> = [];
  select_Am_Pm: Array<any> = [];
  public CLOSE_ON_SELECTED = false;
  public init = new Date();
  public resetModel = new Date(0);
  public model: Array<any> = [];


  popres: string;
  temp: any;
  Tablecontroller: any;
  viewselectedvaluelength: Array<any> = [];
  viewselectedController: Array<any> = [];
  BlockIDsArray: any[];
  ViewAllBlockshide: boolean;
  nontrade: any;
  allNonTrades_data = false;
  allNonTrades_floor = false;
  viewselected: boolean;
  floorwiseselect: any[];
  trade: Array<any> = [];
  title_blockname: any;
  floorchangevalue: any;
  viewselectedflatslength: any;
  floorDetIdArray = 0;
  flatDetIdArray = 0;
  viewselectedfloorslength: any[];
  ViewAllFloorshide: boolean;
  viewselectedFloor: boolean;
  flat_wiseselect: any[];
  flatwiseselect: any[];
  trade1: any;
  floor_controller: any;
  title_floorname: any;
  ViewAllFlatshide: boolean;
  allNonTrades_flats = false;
  selectedflats: boolean;
  floordArray: any[];
  mydata_Blockselect: Array<any> = [];
  blockDetId_controller: Array<any> = [];
  customer_All_Flats: Array<any> = [];
  value: boolean;
  Customer_floordArray: any[];
  viewselected_Customers_length: any[];
  CustomerFlats_Array = 0;
  customersflathide: boolean;
  isflatsSelected: boolean = true;
  loading: boolean;
  editbtnhideme: boolean = true;
  Savebtnhideme: boolean = false;
  loading1: boolean;
  radio_Controller: Array<any> = [];
  disableTextbox: boolean = true;
  project_controller: any;
  viewselected_controller: Array<any> = [];
  blockDetId: any;
  viewselectedFlats: boolean;
  viewselected_flat_controller: Array<any> = [];
  selectType: any;
  selectname: any;
  mainController: any[];
  testhtml: any = '@';
  CreateSlots_controller: Array<any> = [];
  apptmtDtlsReqstList: Array<any> = [];
  type_id: string;
  setdates_controller: Array<any> = [];
  selectedflats_controller: Array<any> = [];
  datesselection_controller: Array<any> = [];
  selectedData_cont: any;
  start_time: string;
  end_time: string;
  public date: Date;

  isTrade: boolean = false
  isNonTrade: boolean = false
  checkAllNonTrades: boolean = false
  checkAllTrades: boolean = false

  apptmtDtlsReqstList1: Array<any> = [];
  resultoftwoarray: Array<any> = [];
  date_selection_array: Array<any> = [];
  loading_submit: boolean;
  title_submit: string;
  wayofcontrollerdata: Array<any> = [];
  customers_all_flats_controller: Array<any> = [];
  blockchangevalue: any[];
  select_blockname: string;
  bblockviewselected_controller: any[];
  errormessage_controller: string;
  error_dates: any[];

  changeTradesByCategory(event, index, item) {
    item.checked = !item.checked;
    this.allNonTrades_data = false;
  }

  changeTradesByCategoryflats(event, item) {
    this.allNonTrades_flats = false;
    this.viewselectedflatslength = [];
    item.forEach(item => {
      if (item.selected == true) {
        this.viewselectedflatslength.push(item.selected);
      }
    });

  }


  changeTradesByCategoryfloor(event, i, item) {
    item.checked = !item.checked;
    this.allNonTrades_floor = false;
  }

  changeTradesByCategoryflat(event, i, item) {
    console.log(event);
    console.log(item);
    item.checked = !item.checked;
  }

  allTrades(event) {
    const checked = event.target.checked;
    this.floorchangevalue.forEach(item => item.checked = checked);
    this.viewselected_controller = [];
    for (var j = 0; j < this.floorchangevalue.length; j++) {
      if (this.floorchangevalue[j].checked != undefined) {
        if (this.floorchangevalue[j].checked == true) {
          if (this.viewselected_controller != undefined) {
            this.viewselected_controller.push(this.floorchangevalue[j].checked);
          }
        }
      }
    }

    if (this.viewselected_controller.length == this.floorchangevalue.length) {
      $('#selectfloors').prop('checked', true);
      this.viewselectedFloor = true;

    }


    // if(checked == true){
    //   this.viewselectedFloor = true;
    // } else {
    //   this.viewselectedFloor = false;
    // }


  }

  allNonTrades(event) {
    const checked = event.target.checked;
    this.allNonTrades_data = event.target.checked;
    this.nontrade.forEach(item => item.checked = checked);
  }



  selectAllFlats(event) {

    console.log(event);
    const checked = event.target.checked;
    this.flatwiseselect.forEach(item => item.checked = checked);
    console.log(this.trade1);

    console.log(this.flatwiseselect);
    this.viewselected_flat_controller = [];
    for (var j = 0; j < this.flatwiseselect.length; j++) {
      if (this.flatwiseselect[j].checked !== undefined || this.flatwiseselect[j].checked !== "undefined") {
        if (this.flatwiseselect[j].checked == true) {
          if (this.viewselected_flat_controller != undefined) {
            this.viewselected_flat_controller.push(this.flatwiseselect[j].checked);
          }
        }
      }
    }

    if (this.viewselected_flat_controller.length == this.flatwiseselect.length) {
      $('#selectflats').prop('checked', true);
      this.viewselectedFlats = true;
    }

    console.log(this.viewselected_flat_controller);

  }

  constructor(private service: CreateAppointmentTimeSlotsService, private cmn: CommonComponent, private http: Http, private formBuilder: FormBuilder,
    private router: Router, private _eref: ElementRef, private modalService: NgbModal) {
    $('.page-loader-wrapper').hide();



    this.siteList();
    var self = this;
    $(function () {

      var dtToday = new Date();

      this.month = dtToday.getMonth() + 1;
      this.day = dtToday.getDate();
      this.year = dtToday.getFullYear();
      if (this.month < 10)
        this.month = '0' + this.month.toString();
      if (this.day < 10)
        this.day = '0' + this.day.toString();

      var maxDate = this.year + '-' + this.month + '-' + this.day;
      $('#txtDate').attr('min', maxDate);
      $('#txtDate1').attr('min', maxDate);


      $('#Mydatetime').flatpickr({
        mode: "multiple",
        altInput: true,
        minDate: "today",
        altFormat: 'j/m/Y',
        enableTime: false,
        dateFormat: 'Y-m-d',
        locale: {
          'firstDayOfWeek': 1 // start week on Monday
        },
        onChange: (selectedDates: any) => {
          self.selecteddatesfun(selectedDates);
        },
      });

      $("#Mydatetime").change(function (event) {
        self.selecteddatesfun(event.target._flatpickr.selectedDates);
      });

      $('#selectfloors').prop('checked', true);
    });

    this.radio_Controller = [
      { Name: 'Select Floors,Flats', id: 'Floors' },
      { Name: 'Select Customers', id: 'Customers' }
    ];
  }


  myForm = this.formBuilder.group({
    firstDate: [''],

  });




  // optionsWithAltInput: FlatpickrOptions = {
  //   wrap: true,
  //   mode: "multiple",
  //   altFormat: 'j/m/Y',
  //   dateFormat: 'Y-m-d',
  //   minDate: "today",
  //   onChange: (selectedDates: any) => {
  //     this.model = selectedDates;
  //     this.pickers.first.writeValue(selectedDates[0]);
  //   },
  // };



  public typeOf(x: any) {
    return JSON.stringify(x);
  }

  ngOnInit() {

    this.dateform = this.formBuilder.group({
      maindate: []
    });

    $(function () {
      $(".controll").prop("disabled", true);
      $("#fromDate").prop("disabled", true);
      $("#toDate").prop("disabled", true);
      $(".submit").prop("disabled", true);
    });


    $(function () {
      $("#BlockId").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });
    });

    this.fg = new FormGroup(
      {
        from: new FormControl(""),
        to: new FormControl("")
      },
      [Validators.required, this.dateRangeValidator]
    );





    this.select_Hours = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    $('#selecthours').html("");
    $('#selecthours').append('<option value="select">--Select Hours--</option>');
    for (var i = 0; i < this.select_Hours.length; i++) {
      $('#selecthours').append("<option value='" + this.select_Hours[i] + "'>" + this.select_Hours[i] + "</option>");
    }


    $('#selecthoursend').html("");
    $('#selecthoursend').append('<option value="select">--Select Hours--</option>');
    for (var i = 0; i < this.select_Hours.length; i++) {
      $('#selecthoursend').append("<option value='" + this.select_Hours[i] + "'>" + this.select_Hours[i] + "</option>");
    }

    this.select_Minutes = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19",
      "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42",
      "43", "44", "45", "46", '47', "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"];

    $('#selectminits').html("");
    $('#selectminits').append('<option value="select">--Select Minutes--</option>');
    for (var i = 0; i < this.select_Minutes.length; i++) {
      $('#selectminits').append("<option value='" + this.select_Minutes[i] + "'>" + this.select_Minutes[i] + "</option>");
    }


    $('#selectminitsend').html("");
    $('#selectminitsend').append('<option value="select">--Select Minutes--</option>');
    for (var i = 0; i < this.select_Minutes.length; i++) {
      $('#selectminitsend').append("<option value='" + this.select_Minutes[i] + "'>" + this.select_Minutes[i] + "</option>");
    }


    this.select_Am_Pm = ["AM", "PM"];
    $('#selecampm').html("");
    $('#selecampm').append('<option value="select">--Select AM/PM--</option>');
    for (var i = 0; i < this.select_Am_Pm.length; i++) {
      $('#selecampm').append("<option value='" + this.select_Am_Pm[i] + "'>" + this.select_Am_Pm[i] + "</option>");
    }


    $('#selecampmend').html("");
    $('#selecampmend').append('<option value="select">--Select AM/PM--</option>');
    for (var i = 0; i < this.select_Am_Pm.length; i++) {
      $('#selecampmend').append("<option value='" + this.select_Am_Pm[i] + "'>" + this.select_Am_Pm[i] + "</option>");
    }

    $("#projectID").select2({
      placeholder: "--Select--",
      dir: "ltl",
    });


    $("#selecthours").select2({
      placeholder: "--select Hours--",
      dir: "ltl",
    });

    $("#selectminits").select2({
      placeholder: "--Select Minutes--",
      dir: "ltl",
    });

    $("#selecampm").select2({
      placeholder: "--Select AM/PM--",
      dir: "ltl",
    });

    $("#selecthoursend").select2({
      placeholder: "--select Hours--",
      dir: "ltl",
    });

    $("#selectminitsend").select2({
      placeholder: "--Select Minutes--",
      dir: "ltl",
    });

    $("#selecampmend").select2({
      placeholder: "--Select AM/PM--",
      dir: "ltl",
    })

    var self = this;
    $(function () {




      $("#fromDate").change(function (event) {
        if ($("#fromDate").val() != "" && $("#toDate").val() != "") {
          self.GetBookingFlatDetails(selected_projectid);
          $("#customerData").show();
        }
      });

      $("#toDate").change(function (event) {
        if ($("#fromDate").val() != "" && $("#toDate").val() != "") {
          self.GetBookingFlatDetails(selected_projectid);
          $("#customerData").show();
        }
      });


      $('#projectID').change(function (e) {
        selected_projectid = $(e.target).val();
        if (selected_projectid == "select") {
        } else {
          self.projectchangeFun(selected_projectid);
          self.blockonchangeFun(selected_projectid, null);
          self.flooronchangefun(selected_projectid, null, null);


        }
      })
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

  getToday(): string {
    return new Date().toISOString().split('T')[0]
  }

  changedateFn(event) {
    if (this.SelectDates.includes(event.target.value)) {
      swal("Appointment schedule date already taken!");
      return false;
    } else {
      this.SelectDates.push(event.target.value);
      setTimeout(() => {
        $("#fromDate").val("");
      }, 1000);

    }

  }


  selecteddatesfun(data) {
    this.model = [];
    this.model = data;
    console.log(this.model);

  }

  /*-----------------Getting Project(site) list Start---------------------*/
  siteList() {
    var arr = localStorage.getItem('CreateAppTimeSlots');
    $('.page-loader-wrapper').show();
    this.service.ProjectDetails(JSON.parse(arr).map(String)).then(resp => {
      if (sessionStorage.getItem("customeridsession") == null || sessionStorage.getItem("customeridsession") == "") {
      }
      if (resp.responseCode == 200) {
        $('#projectID').html("");
        $('#projectID').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#projectID').append("<option value='" + resp.responseObjList[i].id + "'>" + resp.responseObjList[i].name + "</option>");
        }
        this.defaultslots()
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



  buttonclickfun() {
    if ($("#projectID").val() == "select" || $("#projectID").val() == undefined || $("#projectID").val() == null) {
      swal("Please select the project.");
      return false;
    }

    // if (this.viewselectedvaluelength.length == 0) {
    //   swal("Please select the blocks");
    //   return false;
    // }

    // console.log(this.selectType);

    // if (this.selectType !== "on") {
    //   swal("Please select the type.");
    //   return false;
    // }

    if (this.selectname == "Floors") {
      // if (this.viewselectedvaluelength.length == 0) {
      //   swal("Please select the blocks");
      //   return false;
      // }
      // if (this.floorDetIdArray == 0) {
      //   swal("Please select the floors");
      //   return false;
      // }

      // if (this.flatDetIdArray == 0) {
      //   swal("Please select the flats");
      //   return false;
      // }


    } else if (this.selectname == "Customers") {
      if ($("#fromDate").val() == "" || $("#fromDate").val() == null || $("#fromDate").val() == undefined) {
        swal("Please select the flat booking from date");
        return false;
      }

      if ($("#toDate").val() == "" || $("#toDate").val() == null || $("#toDate").val() == undefined) {
        swal("Please select the flat booking to date");
        return false;
      }

    }


    if ($("#selecthours").val() == "select" || $("#selecthours").val() == undefined || $("#selecthours").val() == null) {
      swal("Please select the start time hours.");
      return false;
    }


    if ($("#selectminits").val() == "select" || $("#selectminits").val() == undefined || $("#selectminits").val() == null) {
      swal("Please select the start time minutes.");
      return false;
    }

    if ($("#selecampm").val() == "select" || $("#selecampm").val() == undefined || $("#selecampm").val() == null) {
      swal("Please select the start time AM/PM.");
      return false;
    }

    if ($("#selecthoursend").val() == "select" || $("#selecthoursend").val() == undefined || $("#selecthoursend").val() == null) {
      swal("Please select the  end time hours.");
      return false;
    }


    if ($("#selectminitsend").val() == "select" || $("#selectminitsend").val() == undefined || $("#selectminitsend").val() == null) {
      swal("Please select the end time minutes.");
      return false;
    }

    if ($("#selecampmend").val() == "select" || $("#selecampmend").val() == undefined || $("#selecampmend").val() == null) {
      swal("Please select the end time AM/PM.");
      return false;
    }

    this.projectname = $("#projectID").val();
    this.starttimehours = $("#selecthours").val();
    this.starttimeminutes = $("#selectminits").val();
    this.startampm = $("#selecampm").val();
    this.endhours = $("#selecthoursend").val();
    this.endminutes = $("#selectminitsend").val();
    this.endampm = $("#selecampmend").val();

    // this.slotstime = this.starttimehours + ":" + this.starttimeminutes + " " + this.startampm + " - " + this.endhours + ":" + this.endminutes + " " + this.endampm;


    this.start_time = this.starttimehours + ":" + this.starttimeminutes + " " + this.startampm;
    this.end_time = this.endhours + ":" + this.endminutes + " " + this.endampm;


    var beginningTime = moment(this.starttimehours + ":" + this.starttimeminutes + " " + this.startampm, 'h:mma');
    var endTime = moment(this.endhours + ":" + this.endminutes + " " + this.endampm, 'h:mma');
    if (beginningTime.isBefore(endTime) == false) {
      swal("Your End date cannot be before or equal to Start Date");
      return false;
    }


    if (this.controller.length !== 0) {
      for (var i = 0; i < this.controller.length; i++) {
        var currentTime = moment(beginningTime, "HH:mm a");
        var currentTimeend = moment(endTime, "HH:mm a");

        var startTime = moment(this.controller[i].startTime, "HH:mm a");
        var endTime = moment(this.controller[i].endTime, "HH:mm a");

        if (currentTime.isBetween(startTime, endTime) == true || currentTimeend.isBetween(startTime, endTime) == true) {
          swal("Appointment schedule time already selected!");
          return false;
        }
      }
    }


    if (this.controller.some(item => item.startTime === this.start_time) == true) {
      swal("Selected Time slot is already Available!");
      return false;
    } else {
      this.controller.push({
        "startTime": this.start_time,
        "endTime": this.end_time
      });


    }


    $("#selecthours").val(['select']);
    $("#selecthours").trigger('change');

    $("#selectminits").val(['select']);
    $("#selectminits").trigger('change');

    $("#selecampm").val(['select']);
    $("#selecampm").trigger('change');

    $("#selecthoursend").val(['select']);
    $("#selecthoursend").trigger('change');

    $("#selectminitsend").val(['select']);
    $("#selectminitsend").trigger('change');

    $("#selecampmend").val(['select']);
    $("#selecampmend").trigger('change');
  }


  removeItem(i: number): void {
    this.controller.splice(i, 1);
  }


  dateremoveItem(i: number): void {
    this.SelectDates.splice(i, 1);
  }



  submitfunction() {


    if ($("#projectID").val() == "select" || $("#projectID").val() == undefined || $("#projectID").val() == null) {
      swal("Please select the project.");
      return false;
    }

    if (this.trade1 != undefined) {
      for (var i = 0; i < this.trade1.length; i++) {
        for (var j = 0; j < this.trade1[i].floorDetRespList.length; j++) {
          for (var k = 0; k < this.trade1[i].floorDetRespList[j].flatDetRespList.length; k++) {
            if (this.trade1[i].floorDetRespList[j].flatDetRespList[k].checked == true) {
              this.selectedflats_controller.push(this.trade1[i].floorDetRespList[j].flatDetRespList[k].flatId);
            }
          }
        }
      }
    }

    this.customers_all_flats_controller = [];
    if (this.customer_All_Flats != undefined) {
      for (var i = 0; i < this.customer_All_Flats.length; i++) {
        this.customers_all_flats_controller.push(this.customer_All_Flats[i].flatId);
      }
    }





    if (selected_projectid === undefined && this.BlockIDsArray === undefined && this.selectname === undefined && this.floordArray === undefined && this.selectedflats_controller.length === 0) {
      this.wayofcontrollerdata = [];
    } else if (selected_projectid !== undefined && this.BlockIDsArray === undefined && this.selectname === undefined && this.floordArray === undefined && this.selectedflats_controller.length === 0) {
      this.type_id = "1";
      this.wayofcontrollerdata = [JSON.parse(selected_projectid)];
    } else if (selected_projectid !== undefined && this.BlockIDsArray !== undefined && this.selectname === undefined && this.floordArray === undefined && this.selectedflats_controller.length === 0) {
      this.type_id = "2";
      this.wayofcontrollerdata = this.BlockIDsArray;
    } else if (selected_projectid !== undefined && this.BlockIDsArray !== undefined && this.selectname === "Floors" && this.floordArray === undefined && this.selectedflats_controller.length === 0) {
      this.type_id = "2";
      this.wayofcontrollerdata = this.BlockIDsArray;
    } else if (selected_projectid !== undefined && this.BlockIDsArray !== undefined && this.selectname === "Floors" && this.floordArray !== undefined && this.selectedflats_controller.length === 0) {
      this.type_id = "3";
      this.wayofcontrollerdata = this.floordArray;
    } else if (selected_projectid !== undefined && this.BlockIDsArray !== undefined && this.selectname === "Floors" && this.floordArray !== undefined && this.selectedflats_controller.length !== 0) {
      this.type_id = "4";
      this.wayofcontrollerdata = this.selectedflats_controller;
    } else if (selected_projectid !== undefined && this.BlockIDsArray !== undefined && this.selectname === "Customers" && this.floordArray === undefined && this.selectedflats_controller.length === 0 && this.customers_all_flats_controller.length === 0) {
      this.type_id = "2";
      this.wayofcontrollerdata = this.BlockIDsArray;
    } else if (selected_projectid !== undefined && this.BlockIDsArray !== undefined && this.selectname === "Customers" && this.floordArray === undefined && this.selectedflats_controller.length === 0 && this.customers_all_flats_controller.length !== 0) {
      this.type_id = "110";
      this.wayofcontrollerdata = this.customers_all_flats_controller;
    }


    // if (this.viewselectedvaluelength.length == 0) {
    //   swal("Please select the blocks");
    //   return false;
    // }


    // if (this.selectType !== "on") {
    //   swal("Please select the type.");
    //   return false;
    // }

    if (this.selectname == "Floors") {
      if (this.viewselectedvaluelength.length == 0) {
        swal("Please select the blocks");
        return false;
      }
      if (this.floorDetIdArray == 0 && this.flatDetIdArray == 0) {
        swal("Please select the floors (or) flats");
        return false;
      }


      // if (this.flatDetIdArray == 0) {
      //   swal("Please select the flats");
      //   return false;
      // }
    } else if (this.selectname == "Customers") {
      if ($("#fromDate").val() == "" || $("#fromDate").val() == null || $("#fromDate").val() == undefined) {
        swal("Please select the flat booking from date");
        return false;
      }

      if ($("#toDate").val() == "" || $("#toDate").val() == null || $("#toDate").val() == undefined) {
        swal("Please select the flat booking to date");
        return false;
      }

    }

    if (this.controller.length == 0) {
      if ($("#selecthours").val() == "select" || $("#selecthours").val() == undefined || $("#selecthours").val() == null) {
        swal("Please select the start time hours.");
        return false;
      }


      if ($("#selectminits").val() == "select" || $("#selectminits").val() == undefined || $("#selectminits").val() == null) {
        swal("Please select the start time minutes.");
        return false;
      }

      if ($("#selecampm").val() == "select" || $("#selecampm").val() == undefined || $("#selecampm").val() == null) {
        swal("Please select the start time AM/PM.");
        return false;
      }

      if ($("#selecthoursend").val() == "select" || $("#selecthoursend").val() == undefined || $("#selecthoursend").val() == null) {
        swal("Please select the end time hours.");
        return false;
      }


      if ($("#selectminitsend").val() == "select" || $("#selectminitsend").val() == undefined || $("#selectminitsend").val() == null) {
        swal("Please select the end time minutes.");
        return false;
      }

      if ($("#selecampmend").val() == "select" || $("#selecampmend").val() == undefined || $("#selecampmend").val() == null) {
        swal("Please select the end time AM/PM.");
        return false;
      }

      this.projectname = $("#projectID").val();
      this.starttimehours = $("#selecthours").val();
      this.starttimeminutes = $("#selectminits").val();
      this.startampm = $("#selecampm").val();
      this.endhours = $("#selecthoursend").val();
      this.endminutes = $("#selectminitsend").val();
      this.endampm = $("#selecampmend").val();

      this.start_time = this.starttimehours + ":" + this.starttimeminutes + " " + this.startampm;
      this.end_time = this.endhours + ":" + this.endminutes + " " + this.endampm;

      var beginningTime = moment(this.starttimehours + ":" + this.starttimeminutes + " " + this.startampm, 'h:mma');
      var endTime = moment(this.endhours + ":" + this.endminutes + " " + this.endampm, 'h:mma');
      if (beginningTime.isBefore(endTime) == false) {
        swal("Your End date cannot be before or equal to Start Date");
        return false;
      }

      if (this.controller.length !== 0) {
        for (var i = 0; i < this.controller.length; i++) {
          var currentTime = moment(beginningTime, "HH:mm a");
          var currentTimeend = moment(endTime, "HH:mm a");
          var startTime = moment(this.controller[i].startTime, "HH:mm a");
          var endTime = moment(this.controller[i].endTime, "HH:mm a");
          if (currentTime.isBetween(startTime, endTime) == true || currentTimeend.isBetween(startTime, endTime) == true) {
            swal("Appointment schedule time already selected!");
            return false;
          }
        }
      }
      if (this.controller.some(item => item.startTime === this.start_time) == true) {
        swal("Selected Time slot is already Available!");
        return false;
      } else {
        this.controller.push({
          "startTime": this.start_time,
          "endTime": this.end_time
        });

      }

      $("#selecthours").val(['select']);
      $("#selecthours").trigger('change');
      $("#selectminits").val(['select']);
      $("#selectminits").trigger('change');
      $("#selecampm").val(['select']);
      $("#selecampm").trigger('change');
      $("#selecthoursend").val(['select']);
      $("#selecthoursend").trigger('change');
      $("#selectminitsend").val(['select']);
      $("#selectminitsend").trigger('change');
      $("#selecampmend").val(['select']);
      $("#selecampmend").trigger('change');
    }


    console.log($("#txtDate").val());
    console.log($("#txtDate1").val());


    if ($("#txtDate").val() == "" || $("#txtDate").val() == undefined || $("#txtDate").val() == null) {
      swal("Please select the start date.");
      return false;
    }

    if ($("#txtDate1").val() == "" || $("#txtDate1").val() == undefined || $("#txtDate1").val() == null) {
      swal("Please select the end date.");
      return false;
    }

    var startdate_id = $("#txtDate").val();
    var endDate_id = $('#txtDate1').val();
    if (new Date(startdate_id) > new Date(endDate_id)) {
      swal('Please select  a valid from and to date');
      return false;
    }


    var between = [];

    var datePickedDate1 = new Date(startdate_id);
    var datePickedDate2 = new Date(endDate_id);

    while (datePickedDate1 <= datePickedDate2) {
      var d = new Date(datePickedDate1);
      var datestring = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
        ("0" + d.getDate()).slice(-2);

      between.push(datestring);

      this.datesselection_controller.push(datestring);

      datePickedDate1.setDate(datePickedDate1.getDate() + 1);
    }

    console.log(between);




    // if (this.model.length == 0) {
    //   swal("Please select the select dates .");
    //   return false;
    // }


    // for (var i = 0; i < between.length; i++) {
    //   var d = new Date(this.model[i]);
    //   var datestring = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
    //     ("0" + d.getDate()).slice(-2);
    //   this.datesselection_controller.push(between);
    // }

    this.mainController = [];
    for (var i = 0; i < this.controller.length; i++) {
      this.mainController.push({ 'startTime': this.controller[i].startTime, 'endTime': this.controller[i].endTime, 'date': this.datesselection_controller });
    }

    console.log(this.mainController);

    // var c = this.testhtml;
    // this.testhtml = this.nextCharacter(c);

    this.CreateSlots_controller.push({
      // name: this.testhtml,
      data: this.mainController,
    });

    console.log(this.CreateSlots_controller);

    for (var i = 0; i < this.CreateSlots_controller.length; i++) {
      this.apptmtSlotTimesInfoListdetails = [];
      this.setdates_controller = [];
      for (var j = 0; j < this.CreateSlots_controller[i].data.length; j++) {
        this.apptmtSlotTimesInfoListdetails.push({
          "startTime": this.CreateSlots_controller[i].data[j].startTime,
          "endTime": this.CreateSlots_controller[i].data[j].endTime,
        });


        this.selectedData_cont = [];
        this.selectedData_cont = this.CreateSlots_controller[i].data[j].date;

      }
    }

    var c = this.testhtml;
    this.testhtml = this.nextCharacter(c);

    this.apptmtDtlsReqstList.push({
      "apptmtSlotTimeReqList": this.apptmtSlotTimesInfoListdetails,
      "slotDatesList": this.selectedData_cont,
      "type": this.type_id,
      "typeIds": this.wayofcontrollerdata,
      "siteId": selected_projectid,
      "setName": this.testhtml
    });

    console.log(this.apptmtDtlsReqstList);

    this.myForm.reset({
      firstDate: ''
    });


    if (this.CreateSlots_controller.length != 0) {
      $(".submit").prop("disabled", false);

    }
    this.ViewAllBlockshide = false;
    this.viewselectedvaluelength = [];
    this.SelectDates = [];
    this.apptmtSlotTimesInfoListdetails = [];
    this.setdates_controller = [];
    this.selectedflats_controller = [];
    this.controller = [];
    this.datesselection_controller = [];
    this.floorDetIdArray = 0;

    $("#txtDate").val("");
    $('#txtDate1').val("");



    // $('#Mydatetime').flatpickr().clear();
    // $('#Mydatetime').flatpickr({
    //   mode: "multiple",
    //   altInput: true,
    //   minDate: 'today',
    //   altFormat: 'j/m/Y',
    //   enableTime: false,
    //   dateFormat: 'd-m-Y',
    // });

    // setTimeout(() => {
    //   this.model = [];
    // }, 700);

    this.radio_Controller = [];
    this.radio_Controller = [
      { Name: 'Select Floors,Flats', id: 'Floors' },
      { Name: 'Select Customers', id: 'Customers' }
    ];
    this.selectType = "";

    console.log(selected_projectid);
    console.log(this.BlockIDsArray);
    console.log(this.floordArray);

    if (selected_projectid !== undefined) {
      this.projectchangeFun(selected_projectid);
    }

    if (this.BlockIDsArray !== undefined) {
      this.blockonchangeFun(selected_projectid, this.BlockIDsArray);
    }

    if (this.floordArray !== undefined) {
      this.flooronchangefun(selected_projectid, this.mydata_Blockselect, this.floordArray);
    }


    this.flatDetIdArray = 0;

    $(function () {
      $(".controll").prop("disabled", true);
      $("#fromDate").prop("disabled", true);
      $("#toDate").prop("disabled", true);

    });


    $("#fromDate").val("");
    $("#toDate").val("");
    $("#customerData").hide();

    this.customer_All_Flats = [];

    $("#projectID").val(['select']);
    $("#projectID").trigger('change');

    selected_projectid = undefined;
    this.BlockIDsArray = undefined;
    this.selectname = undefined;
    this.floordArray = undefined;
    this.selectedflats_controller.length = 0;
  }

  removeDuplicates(data) {
    return data.filter((value, index) => data.indexOf(value) !== index);
  }

  nextCharacter(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
  }

  homeClick() {
    this.router.navigateByUrl("dashboard");
  }

  defaultslots() {
    $(".page-loader-wrapper").show();
    var arr = localStorage.getItem('SiteIDS');
    var url = this.cmn.commonUrl + "appointmentBooking/getCompletedAppointmentBookingDetails.spring";
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": sessionStorage.getItem("login_sessionkey"),
    }

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

      $(".page-loader-wrapper").hide();
      if (resp.responseCode == 200) {
        if (resp.responseObjList.apptmtBookingsDetailResponseList.length !== 0) {
          // this.controller = resp.responseObjList;
          this.popres = resp.responseObjList.apptmtBookingsDetailResponseList;
          this.temp = resp.responseObjList.apptmtBookingsDetailResponseList;
          $('#imagemodal').modal('show');
        } else {
          $('#imagemodal').modal('hide');
        }
      } else if (resp.responseCode == 440) {
        $('#imagemodal').modal('hide');
        swal("Error!", "Your session has been expired.", "error");
        this.router.navigate([""]);
      } else {
        $('#imagemodal').modal('hide');
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
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

  paymentProceed() {
    $('#imagemodal').modal('hide');
    this.Tablecontroller = this.temp
    sessionStorage.setItem("myobj", this.popres)
    this.router.navigateByUrl("View_My_Appointments");
  }


  open(ViewAllBlocks) {
    this.nontrade == this.project_controller;

    console.log(this.nontrade);
    this.viewselected = this.allNonTrades_data;
    this.blockchangevalue = [];
    this.select_blockname = "";
    this.bblockviewselected_controller = [];
    for (var i = 0; i < this.nontrade.length; i++) {
      if (this.nontrade[i].checked != undefined) {
        if (this.nontrade[i].checked == true) {
          if (this.bblockviewselected_controller != undefined) {
            this.bblockviewselected_controller.push(this.nontrade[i].checked);
          }
        }
      }

      if (this.bblockviewselected_controller.length == this.nontrade.length) {
        $('#selectblocks').prop('checked', true);
        this.viewselected = true;
      } else {
        this.viewselected = false;
      }
    }



    if ($("#projectID").val() == "select" || $("#projectID").val() == undefined || $("#projectID").val() == null) {
      swal("Please select the project.");
      return false;
    }
    this.modalService.open(ViewAllBlocks, { backdrop: 'static', size: 'lg', keyboard: false, centered: true, windowClass: 'my-class' }).result.then((result) => {
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

  /*------------------------Projects On Change Functionality Start--------------------*/
  projectchangeFun(selectedSiteID) {
    $('.page-loader-wrapper').show();
    this.service.Blockdetails(selectedSiteID).then(resp => {

      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        this.nontrade = resp.responseObjList.blockDetRespList;

        this.project_controller = resp.responseObjList.blockDetRespList;

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
    );
  }
  /*------------------------Projects On Change Functionality End--------------------*/

  SelectBlocksfun() {
    this.floorDetIdArray = 0;
    this.flatDetIdArray = 0;
    this.viewselectedvaluelength = [];
    this.viewselectedController = [];
    this.BlockIDsArray = [];
    this.viewselectedController = this.nontrade;
    this.viewselectedController.forEach(item => {
      if (item.checked == true) {
        this.BlockIDsArray.push(item['blockDetId']);
        this.viewselectedvaluelength.push(item.checked);

      }
    });

    if (this.viewselectedvaluelength.length == 0) {
      swal("Please select the blocks");
      return false;
    }
    this.ViewAllBlockshide = true;
    this.modalService.dismissAll();
    this.blockonchangeFun(selected_projectid, this.BlockIDsArray);
  }

  viewselectedblocks(viewselectedblc) {
    this.viewselected = this.allNonTrades_data;
    this.viewselectedController = this.nontrade;

    this.modalService.open(viewselectedblc, { backdrop: 'static', size: 'lg', keyboard: false, centered: true, windowClass: 'my-class' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReasonview(reason)}`;
    });
  }

  private getDismissReasonview(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }



  viewallfloors(ViewAllFloors) {

    this.floorchangevalue = [];
    this.title_blockname = "";
    for (var i = 0; i < this.trade.length; i++) {
      if (this.trade[i].blockDetId == this.trade[0].blockDetId) {
        this.title_blockname = this.trade[i].blockName;
        this.floorchangevalue = this.trade[i].floorDetRespList;
        this.viewselected_controller = [];
        for (var j = 0; j < this.floorchangevalue.length; j++) {
          if (this.floorchangevalue[j].checked != undefined) {
            if (this.floorchangevalue[j].checked == true) {
              if (this.viewselected_controller != undefined) {
                this.viewselected_controller.push(this.floorchangevalue[j].checked);
              }
            }
          }
        }



        if (this.viewselected_controller.length == this.floorchangevalue.length) {
          $('#selectfloors').prop('checked', true);
          this.viewselectedFloor = true;

        } else {
          this.viewselectedFloor = false;
        }

      }
    }

    if ($("#projectID").val() == "select" || $("#projectID").val() == undefined || $("#projectID").val() == null) {
      swal("Please select the project.");
      return false;
    }


    if (this.viewselectedvaluelength.length == 0) {
      swal("Please select the blocks");
      return false;
    }

    var self = this;
    $(function () {
      $("#BlockId").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });

      $('#BlockId').change(function (e) {
        console.log("working data");
        $('#selectfloors').prop('checked', false);
        selected_blockid = $(e.target).val();

        if (selected_blockid == "select") {
        } else {
          self.floorchangevalue = [];
          self.viewselected_controller = [];
          self.title_blockname = "";
          console.log(self.trade);
          for (var i = 0; i < self.trade.length; i++) {
            console.log(self.trade[i].blockDetId);
            console.log(selected_blockid);
            if (self.trade[i].blockId == selected_blockid) {
              self.title_blockname = self.trade[i].blockName;
              self.blockDetId_controller.push(self.trade[i].blockDetId);
              self.floorchangevalue = self.trade[i].floorDetRespList;
              for (var j = 0; j < self.floorchangevalue.length; j++) {
                if (self.floorchangevalue[j].checked != undefined) {
                  if (self.floorchangevalue[j].checked == true) {
                    if (self.viewselected_controller != undefined) {
                      self.viewselected_controller.push(self.floorchangevalue[j].checked);
                    }
                  }
                }
              }
              if (self.viewselected_controller.length == self.floorchangevalue.length) {
                $('#selectfloors').prop('checked', true);
              }

            }
          }
        }
      });
    });



    this.modalService.open(ViewAllFloors, { backdrop: 'static', size: 'lg', keyboard: false, centered: true, windowClass: 'my-class' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason1(reason)}`;
    });
  }

  private getDismissReason1(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  /*------------------------Projects On Change Functionality Start--------------------*/
  blockonchangeFun(selectedSiteID, value) {

    console.log(selectedSiteID);
    console.log(value);


    $('.page-loader-wrapper').show();
    this.service.Floordetails(selectedSiteID, value).then(resp => {
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        this.floorwiseselect = [];
        this.trade = resp.responseObjList.blockDetRes;
        for (var i = 0; i < resp.responseObjList.blockDetRes.length; i++) {
          this.blockDetId = resp.responseObjList.blockDetRes[0].blockDetId;
          if (resp.responseObjList.blockDetRes[i].blockDetId == resp.responseObjList.blockDetRes[0].blockDetId) {
            this.title_blockname = resp.responseObjList.blockDetRes[i].blockName;
            this.floorchangevalue = resp.responseObjList.blockDetRes[i].floorDetRespList;
          }
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
    );
  }


  Selecfloorsfun() {
    this.flatDetIdArray = 0;
    this.floorchangevalue = [];
    this.title_blockname = "";
    for (var i = 0; i < this.trade.length; i++) {
      if (this.trade[i].blockDetId == this.trade[0].blockDetId) {
        this.title_blockname = this.trade[i].blockName;
        this.floorchangevalue = this.trade[i].floorDetRespList;
      }
    }


    this.floordArray = [];
    this.viewselectedfloorslength = [];
    this.floorDetIdArray = 0;

    for (var i = 0; i < this.trade.length; i++) {
      for (var j = 0; j < this.trade[i].floorDetRespList.length; j++) {
        if (this.trade[i].floorDetRespList[j].checked == true) {
          this.floordArray.push(this.trade[i].floorDetRespList[j].floorDetId);
          this.viewselectedfloorslength.push(this.trade[i].floorDetRespList[j].checked);
        }
      }
    }
    this.floorDetIdArray = this.viewselectedfloorslength.length;
    if (this.viewselectedfloorslength.length == 0) {
      swal("Please select the floors");
      return false;
    }

    this.ViewAllFloorshide = true;
    this.modalService.dismissAll();

    for (var i = 0; i < this.trade.length; i++) {
      if (this.trade[i].blockDetId != undefined || this.trade[i].blockDetId != null) {
        this.mydata_Blockselect.push(this.trade[i].blockDetId);
      } else {
        this.mydata_Blockselect = [];
      }

    }

    this.flooronchangefun(selected_projectid, this.mydata_Blockselect, this.floordArray);
  }





  viewselectedfloors(viewselectedfls) {
    this.floorchangevalue = [];
    this.title_blockname = "";
    for (var i = 0; i < this.trade.length; i++) {
      if (this.trade[i].blockDetId == this.trade[0].blockDetId) {
        this.title_blockname = this.trade[i].blockName;
        this.floorchangevalue = this.trade[i].floorDetRespList;
        this.viewselected_controller = [];
        for (var j = 0; j < this.floorchangevalue.length; j++) {
          if (this.floorchangevalue[j].checked != undefined) {
            if (this.floorchangevalue[j].checked == true) {
              if (this.viewselected_controller != undefined) {
                this.viewselected_controller.push(this.floorchangevalue[j].checked);
              }
            }
          }
        }
        if (this.viewselected_controller.length == this.floorchangevalue.length) {
          $('#selectfloors').prop('checked', true);

        }

      }
    }


    var self = this;
    $(function () {
      $("#BlockId").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });

      $('#BlockId').change(function (e) {
        $('#selectfloors').prop('checked', false);
        selected_blockid = $(e.target).val();
        if (selected_blockid == "select") {
        } else {
          self.floorchangevalue = [];
          self.viewselected_controller = [];
          self.title_blockname = "";
          for (var i = 0; i < self.trade.length; i++) {
            if (self.trade[i].blockId == selected_blockid) {
              self.title_blockname = self.trade[i].blockName;
              self.blockDetId_controller.push(self.trade[i].blockDetId);
              self.floorchangevalue = self.trade[i].floorDetRespList;
              for (var j = 0; j < self.floorchangevalue.length; j++) {
                if (self.floorchangevalue[j].checked != undefined) {
                  if (self.floorchangevalue[j].checked == true) {
                    if (self.viewselected_controller != undefined) {
                      self.viewselected_controller.push(self.floorchangevalue[j].checked);
                    }
                  }
                }
              }
              if (self.viewselected_controller.length == self.floorchangevalue.length) {
                $('#selectfloors').prop('checked', true);

              }

            }
          }
        }
      });
    });

    this.modalService.open(viewselectedfls, { backdrop: 'static', size: 'lg', keyboard: false, centered: true, windowClass: 'my-class' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissviewselectedfloors(reason)}`;
    });
  }


  private getDismissviewselectedfloors(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }



  viewallflats(ViewAllFlats) {
    $('#selectflats').prop('checked', false);
    for (var i = 0; i < this.trade1.length; i++) {

      if (this.trade1[i].blockDetId == this.trade1[0].blockDetId) {
        this.title_blockname = this.trade1[i].blockName;
        this.floor_controller = this.trade1[i].floorDetRespList;

        for (var j = 0; j < this.trade1[i].floorDetRespList.length; j++) {
          if (this.trade1[i].floorDetRespList[j].floorDetId == this.trade1[i].floorDetRespList[0].floorDetId) {
            this.title_floorname = this.trade1[i].floorDetRespList[j].floorName;
            for (var k = 0; k < this.trade1[i].floorDetRespList[j].flatDetRespList.length; k++) {
              this.flatwiseselect = this.trade1[i].floorDetRespList[j].flatDetRespList;

            }
          }

        }



        this.viewselected_flat_controller = [];
        for (var j = 0; j < this.flatwiseselect.length; j++) {
          if (this.flatwiseselect[j].checked !== undefined || this.flatwiseselect[j].checked !== "undefined") {
            if (this.flatwiseselect[j].checked == true) {
              if (this.viewselected_flat_controller != undefined) {
                this.viewselected_flat_controller.push(this.flatwiseselect[j].checked);
              }
            }
          }
        }

        if (this.viewselected_flat_controller.length == this.flatwiseselect.length) {
          $('#selectflats').prop('checked', true);
        } else {
          this.viewselectedFlats = false;
        }


      }
    }

    if ($("#projectID").val() == "select" || $("#projectID").val() == undefined || $("#projectID").val() == null) {
      swal("Please select the project.");
      return false;
    }

    if (this.viewselectedvaluelength.length == 0) {
      swal("Please select the blocks");
      return false;
    }


    if (this.floorDetIdArray == 0) {
      swal("Please select the floors");
      return false;
    }

    var self = this;
    $(function () {
      $("#BlockId1").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });

      $('#BlockId1').change(function (e) {

        $('#selectflats').prop('checked', false);
        selected_blockid1 = $(e.target).val();
        if (selected_blockid1 == "select") {
        } else {
          self.floorchangevalue = [];
          self.title_blockname = "";
          for (var i = 0; i < self.trade1.length; i++) {
            console.log(self.trade1);
            console.log(self.trade1[i].blockId);
        
            if (self.trade1[i].blockDetId == selected_blockid1) {
              self.title_blockname = self.trade1[i].blockName;
              self.floor_controller = self.trade1[i].floorDetRespList;

              console.log(self.trade1[i].floorDetRespList);

              for (var j = 0; j < self.trade1[i].floorDetRespList.length; j++) {
                if (self.trade1[i].floorDetRespList[j].floorDetId == self.trade1[i].floorDetRespList[0].floorDetId) {
                  self.title_floorname = self.trade1[i].floorDetRespList[j].floorName;

                  for (var k = 0; k < self.trade1[i].floorDetRespList[j].flatDetRespList.length; k++) {
                    if (self.trade1[i].floorDetRespList[j].flatDetRespList[k].flatId == self.trade1[i].floorDetRespList[j].flatDetRespList[0].flatId) {
                      self.flatwiseselect = self.trade1[i].floorDetRespList[j].flatDetRespList;
                    }
                  }
                }
              }

            }
          }

          self.viewselected_flat_controller = [];
          for (var j = 0; j < self.flatwiseselect.length; j++) {
            if (self.flatwiseselect[j].checked !== undefined || self.flatwiseselect[j].checked !== "undefined") {
              if (self.flatwiseselect[j].checked == true) {
                if (self.viewselected_flat_controller != undefined) {
                  self.viewselected_flat_controller.push(self.flatwiseselect[j].checked);
                }
              }
            }
          }
          if (self.viewselected_flat_controller.length == self.flatwiseselect.length) {
            $('#selectflats').prop('checked', true);
            this.viewselectedFlats = true;
          } else {
            this.viewselectedFlats = false;
          }


        }
      });

      $("#Flatid").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });

      $('#Flatid').change(function (e) {
        console.log($(e.target).val());
        $('#selectflats').prop('checked', false);
        selected_floors1 = $(e.target).val();
        if (selected_floors1 == "select") {
        } else {

          selected_blockid1 = $('#BlockId1').val();
          selected_floors1 = $('#Flatid').val();

          for (var i = 0; i < self.trade1.length; i++) {
            if (self.trade1[i].blockDetId == selected_blockid1) {
              self.title_blockname = self.trade1[i].blockName;
              self.floor_controller = self.trade1[i].floorDetRespList;

              for (var j = 0; j < self.trade1[i].floorDetRespList.length; j++) {
                if (self.trade1[i].floorDetRespList[j].floorDetId == selected_floors1) {
                  self.title_floorname = self.trade1[i].floorDetRespList[j].floorName;

                  for (var k = 0; k < self.trade1[i].floorDetRespList[j].flatDetRespList.length; k++) {
                    if (self.trade1[i].floorDetRespList[j].flatDetRespList[k].flatId == self.trade1[i].floorDetRespList[j].flatDetRespList[0].flatId) {
                      self.flatwiseselect = self.trade1[i].floorDetRespList[j].flatDetRespList;
                    }
                  }
                }
              }
            }
          }

          self.viewselected_flat_controller = [];
          for (var j = 0; j < self.flatwiseselect.length; j++) {
            if (self.flatwiseselect[j].checked !== undefined || self.flatwiseselect[j].checked !== "undefined") {
              if (self.flatwiseselect[j].checked == true) {
                if (self.viewselected_flat_controller != undefined) {
                  self.viewselected_flat_controller.push(self.flatwiseselect[j].checked);
                }
              }
            }
          }
          if (self.viewselected_flat_controller.length == self.flatwiseselect.length) {
            $('#selectflats').prop('checked', true);
            this.viewselectedFlats = true;
          } else {
            this.viewselectedFlats = false;
          }
        }
      });
    });

    this.modalService.open(ViewAllFlats, { backdrop: 'static', size: 'lg', keyboard: false, centered: true, windowClass: 'my-class' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason2(reason)}`;
    });
  }

  private getDismissReason2(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  /*------------------------Projects On Change Functionality End--------------------*/


  flooronchangefun(selectedSiteID, blocks, flats) {
    $('.page-loader-wrapper').show();
    this.service.Flatdetails(selectedSiteID, blocks, flats).then(resp => {
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        this.flat_wiseselect = [];
        this.flatwiseselect = [];
        this.trade1 = resp.responseObjList.blockDetRespList;

        for (var i = 0; i < resp.responseObjList.blockDetRespList.length; i++) {
          if (resp.responseObjList.blockDetRespList[i].blockDetId == resp.responseObjList.blockDetRespList[0].blockDetId) {
            this.title_blockname = resp.responseObjList.blockDetRespList[i].blockName;
            this.floor_controller = resp.responseObjList.blockDetRespList[i].floorDetRespList;
            for (var j = 0; j < resp.responseObjList.blockDetRespList[i].floorDetRespList.length; j++) {
              if (resp.responseObjList.blockDetRespList[i].floorDetRespList[j].floorDetId == resp.responseObjList.blockDetRespList[i].floorDetRespList[0].floorDetId) {
                this.title_floorname = resp.responseObjList.blockDetRespList[i].floorDetRespList[j].floorName;
                for (var k = 0; k < resp.responseObjList.blockDetRespList[i].floorDetRespList[j].flatDetRespList.length; k++) {
                  this.flatwiseselect = resp.responseObjList.blockDetRespList[i].floorDetRespList[j].flatDetRespList;

                }
              }

            }
          }
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
    );
  }



  Selectflatsfun() {
    this.viewselectedflatslength = [];
    for (var i = 0; i < this.trade1.length; i++) {
      for (var j = 0; j < this.trade1[i].floorDetRespList.length; j++) {
        this.title_floorname = this.trade1[i].floorDetRespList[j].floorName;
        for (var k = 0; k < this.trade1[i].floorDetRespList[j].flatDetRespList.length; k++) {
          if (this.trade1[i].floorDetRespList[j].flatDetRespList[k].checked == true) {
            this.viewselectedflatslength.push(this.trade1[i].floorDetRespList[j].flatDetRespList[k].selected);
          }
        }
      }
    }

    this.flatDetIdArray = this.viewselectedflatslength.length;
    if (this.viewselectedflatslength.length == 0) {
      swal("Please select the Flats");
      return false;
    }
    this.ViewAllFlatshide = true;
    this.modalService.dismissAll();
  }

  viewselectedflats(viewselectedflat) {

    this.selectedflats = this.allNonTrades_flats;
    for (var i = 0; i < this.trade1.length; i++) {
      if (this.trade1[i].blockDetId == this.trade1[0].blockDetId) {
        this.title_blockname = this.trade1[i].blockName;
        this.floor_controller = this.trade1[i].floorDetRespList;
        for (var j = 0; j < this.trade1[i].floorDetRespList.length; j++) {
          if (this.trade1[i].floorDetRespList[j].floorDetId == this.trade1[i].floorDetRespList[0].floorDetId) {
            this.title_floorname = this.trade1[i].floorDetRespList[j].floorName;
            for (var k = 0; k < this.trade1[i].floorDetRespList[j].flatDetRespList.length; k++) {
              this.flatwiseselect = this.trade1[i].floorDetRespList[j].flatDetRespList;

            }
          }

        }


        this.viewselected_flat_controller = [];
        for (var j = 0; j < this.flatwiseselect.length; j++) {
          if (this.flatwiseselect[j].checked !== undefined || this.flatwiseselect[j].checked !== "undefined") {
            if (this.flatwiseselect[j].checked == true) {
              if (this.viewselected_flat_controller != undefined) {
                this.viewselected_flat_controller.push(this.flatwiseselect[j].checked);
              }
            }
          }
        }

        if (this.viewselected_flat_controller.length == this.flatwiseselect.length) {
          $('#selectflats').prop('checked', true);
          this.viewselectedFlats = true;
        } else {
          this.viewselectedFlats = false;
        }



      }
    }


    var self = this;
    $(function () {
      $("#BlockId1").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });

      $('#BlockId1').change(function (e) {
        $('#selectflats').prop('checked', false);
        selected_blockid1 = $(e.target).val();
        if (selected_blockid1 == "select") {
        } else {
          self.floorchangevalue = [];
          self.title_blockname = "";
          for (var i = 0; i < self.trade1.length; i++) {
            if (self.trade1[i].blockDetId == selected_blockid1) {
              self.title_blockname = self.trade1[i].blockName;
              self.floor_controller = self.trade1[i].floorDetRespList;

              console.log(self.trade1[i].floorDetRespList);

              for (var j = 0; j < self.trade1[i].floorDetRespList.length; j++) {
                if (self.trade1[i].floorDetRespList[j].floorDetId == self.trade1[i].floorDetRespList[0].floorDetId) {
                  self.title_floorname = self.trade1[i].floorDetRespList[j].floorName;

                  for (var k = 0; k < self.trade1[i].floorDetRespList[j].flatDetRespList.length; k++) {
                    if (self.trade1[i].floorDetRespList[j].flatDetRespList[k].flatId == self.trade1[i].floorDetRespList[j].flatDetRespList[0].flatId) {
                      self.flatwiseselect = self.trade1[i].floorDetRespList[j].flatDetRespList;
                    }
                  }
                }
              }

              self.viewselected_flat_controller = [];
              for (var j = 0; j < self.flatwiseselect.length; j++) {
                if (self.flatwiseselect[j].checked !== undefined || self.flatwiseselect[j].checked !== "undefined") {
                  if (self.flatwiseselect[j].checked == true) {
                    if (self.viewselected_flat_controller != undefined) {
                      self.viewselected_flat_controller.push(self.flatwiseselect[j].checked);
                      console.log(self.viewselected_flat_controller);
                    }
                  }
                }
              }

              if (self.viewselected_flat_controller.length == self.flatwiseselect.length) {
                $('#selectflats').prop('checked', true);
                this.viewselectedFlats = true;
              } else {
                this.viewselectedFlats = false;
              }


            }
          }

        }
      });

      $("#Flatid").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });

      $('#Flatid').change(function (e) {
        $('#selectflats').prop('checked', false);
        selected_floors1 = $(e.target).val();
        if (selected_floors1 == "select") {
        } else {

          selected_blockid1 = $('#BlockId1').val();
          selected_floors1 = $('#Flatid').val();


          for (var i = 0; i < self.trade1.length; i++) {
            if (self.trade1[i].blockDetId == selected_blockid1) {
              self.title_blockname = self.trade1[i].blockName;
              self.floor_controller = self.trade1[i].floorDetRespList;

              for (var j = 0; j < self.trade1[i].floorDetRespList.length; j++) {
                if (self.trade1[i].floorDetRespList[j].floorDetId == selected_floors1) {
                  self.title_floorname = self.trade1[i].floorDetRespList[j].floorName;

                  for (var k = 0; k < self.trade1[i].floorDetRespList[j].flatDetRespList.length; k++) {
                    if (self.trade1[i].floorDetRespList[j].flatDetRespList[k].flatId == self.trade1[i].floorDetRespList[j].flatDetRespList[0].flatId) {
                      self.flatwiseselect = self.trade1[i].floorDetRespList[j].flatDetRespList;
                    }
                  }
                }
              }
            }
          }

          self.viewselected_flat_controller = [];
          for (var j = 0; j < self.flatwiseselect.length; j++) {
            if (self.flatwiseselect[j].checked !== undefined || self.flatwiseselect[j].checked !== "undefined") {
              if (self.flatwiseselect[j].checked == true) {
                if (self.viewselected_flat_controller != undefined) {
                  self.viewselected_flat_controller.push(self.flatwiseselect[j].checked);
                }
              }
            }
          }

          if (self.viewselected_flat_controller.length == self.flatwiseselect.length) {
            $('#selectflats').prop('checked', true);
            this.viewselectedFlats = true;
          } else {
            this.viewselectedFlats = false;
          }
        }
      });
    });


    this.modalService.open(viewselectedflat, { backdrop: 'static', size: 'lg', keyboard: false, centered: true, windowClass: 'my-class' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissviewselectedflats(reason)}`;
    });
  }

  private getDismissviewselectedflats(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  Customersviewallflats(customerallflats) {
    if ($("#projectID").val() == "select" || $("#projectID").val() == undefined || $("#projectID").val() == null) {
      swal("Please select the project.");
      return false;
    }

    if ($("#fromDate").val() == "" || $("#fromDate").val() == null || $("#fromDate").val() == undefined) {
      swal("Please select the flat booking from date");
      return false;
    }

    if ($("#toDate").val() == "" || $("#toDate").val() == null || $("#toDate").val() == undefined) {
      swal("Please select the flat booking to date");
      return false;
    }



    if (this.customer_All_Flats.length != 0) {
      this.modalService.open(customerallflats, { backdrop: 'static', size: 'lg', keyboard: false, centered: true, windowClass: 'my-class' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getcustomersallflats(reason)}`;
      });
    } else {
      swal("Customer flats are not available!");
      return false;
    }



  }

  private getcustomersallflats(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }



  GetBookingFlatDetails(selectedSiteID) {
    fromdate = $("#fromDate").val();
    todate = $("#toDate").val();

    $('.page-loader-wrapper').show();
    this.service.GetBookingFlatDetailsval(selectedSiteID, this.BlockIDsArray, fromdate, todate).then(resp => {
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        this.customer_All_Flats = resp.responseObjList.flatBookingPojoList;
        if (this.customer_All_Flats.length == 0) {
          swal("Customer flats are not available!");
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
    );
  }
  startdatefun() {
    $("#fromDate").val("");
  }

  endtimefun() {
    $("#toDate").val("");
  }

  handleChange(event, data) {
    this.selectType = event.target.value;
    this.selectname = data.id;

    if (data.id == "Floors") {
      if ($("#projectID").val() == "select" || $("#projectID").val() == undefined || $("#projectID").val() == null) {
        $('input[type=radio]').prop('checked', false);
        swal("Please select the project.");
        return false;
      }

      if (this.viewselectedvaluelength.length == 0) {
        $('input[type=radio]').prop('checked', false);
        swal("Please select the blocks");
        return false;
      }

      $(function () {
        $(".controll").prop("disabled", false);
        $("#fromDate").prop("disabled", true);
        $("#toDate").prop("disabled", true);
        $("#fromDate").val("");
        $("#toDate").val("");
        $("#customerData").hide();
      });

    } else if (data.id == "Customers") {
      if ($("#projectID").val() == "select" || $("#projectID").val() == undefined || $("#projectID").val() == null) {
        $('input[type=radio]').prop('checked', false);
        swal("Please select the project.");
        return false;
      }

      if (this.viewselectedvaluelength.length == 0) {
        $('input[type=radio]').prop('checked', false);
        swal("Please select the blocks");
        return false;
      }

      this.floorDetIdArray = 0;
      this.flatDetIdArray = 0;

      $(function () {
        $(".controll").prop("disabled", true);
        $("#fromDate").prop("disabled", false);
        $("#toDate").prop("disabled", false);

      });

    }
  }



  finallsubmistion(submitcontent) {
    this.projectname = $("#projectID").val();
    this.starttimehours = $("#selecthours").val();
    this.starttimeminutes = $("#selectminits").val();
    this.startampm = $("#selecampm").val();
    this.endhours = $("#selecthoursend").val();
    this.endminutes = $("#selectminitsend").val();
    this.endampm = $("#selecampmend").val();

    console.log(this.projectname);
    console.log(this.starttimehours);
    console.log(this.starttimeminutes);
    console.log(this.startampm);
    console.log(this.endhours);
    console.log(this.endminutes);
    console.log(this.endampm);
    console.log(this.model.length);
    console.log(this.selectType);

    if (this.projectname === "select" && this.starttimehours === "select" && this.starttimeminutes === "select" && this.startampm === "select" && this.endhours === "select"
      && this.endminutes === "select" && this.endampm === "select" && $("#txtDate").val() == "" && $("#txtDate1").val() == "" && this.selectType === "") {
      this.title_submit = "Do you really want to Submit ?";
    } else if (this.projectname !== "select" && this.starttimehours === "select" && this.starttimeminutes === "select" && this.startampm === "select" && this.endhours === "select"
      && this.endminutes === "select" && this.endampm === "select" && $("#txtDate").val() == "" && $("#txtDate1").val() == "" && this.datesselection_controller.length !== 0 && this.controller.length !== 0) {
      this.title_submit = "Do you really want to Submit ?";
    } else {
      this.title_submit = "Please complete incomplete transaction ?";
    }

    this.modalService.open(submitcontent, { backdrop: 'static', size: 'sm', keyboard: false, centered: true, windowClass: 'my-class' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getsubmitDismissReason(reason)}`;
    });



  }



  dialogsubmit() {
    this.modalService.dismissAll();
    if (this.projectname === "select" && this.starttimehours === "select" && this.starttimeminutes === "select" && this.startampm === "select" && this.endhours === "select"
      && this.endminutes === "select" && this.endampm === "select" && $("#txtDate").val() == "" && $("#txtDate1").val() == "" && this.selectType === "") {

    } else {
      if (this.trade1 != undefined) {
        for (var i = 0; i < this.trade1.length; i++) {
          for (var j = 0; j < this.trade1[i].floorDetRespList.length; j++) {
            for (var k = 0; k < this.trade1[i].floorDetRespList[j].flatDetRespList.length; k++) {
              if (this.trade1[i].floorDetRespList[j].flatDetRespList[k].checked == true) {
                this.selectedflats_controller.push(this.trade1[i].floorDetRespList[j].flatDetRespList[k].flatId);
              }
            }
          }
        }
      }
      this.customers_all_flats_controller = [];

      if (this.customer_All_Flats != undefined) {
        for (var i = 0; i < this.customer_All_Flats.length; i++) {
          this.customers_all_flats_controller.push(this.customer_All_Flats[i].flatId);
        }
      }

      if (selected_projectid === undefined && this.BlockIDsArray === undefined && this.selectname === undefined && this.floordArray === undefined && this.selectedflats_controller.length === 0) {
        this.wayofcontrollerdata = [];
      } else if (selected_projectid !== undefined && this.BlockIDsArray === undefined && this.selectname === undefined && this.floordArray === undefined && this.selectedflats_controller.length === 0) {
        this.type_id = "1";
        this.wayofcontrollerdata = [JSON.parse(selected_projectid)];
      } else if (selected_projectid !== undefined && this.BlockIDsArray !== undefined && this.selectname === undefined && this.floordArray === undefined && this.selectedflats_controller.length === 0) {
        this.type_id = "2";
        this.wayofcontrollerdata = this.BlockIDsArray;
      } else if (selected_projectid !== undefined && this.BlockIDsArray !== undefined && this.selectname === "Floors" && this.floordArray === undefined && this.selectedflats_controller.length === 0) {
        this.type_id = "2";
        this.wayofcontrollerdata = this.BlockIDsArray;
      } else if (selected_projectid !== undefined && this.BlockIDsArray !== undefined && this.selectname === "Floors" && this.floordArray !== undefined && this.selectedflats_controller.length === 0) {
        this.type_id = "3";
        this.wayofcontrollerdata = this.floordArray;
      } else if (selected_projectid !== undefined && this.BlockIDsArray !== undefined && this.selectname === "Floors" && this.floordArray !== undefined && this.selectedflats_controller.length !== 0) {
        this.type_id = "4";
        this.wayofcontrollerdata = this.selectedflats_controller;
      } else if (selected_projectid !== undefined && this.BlockIDsArray !== undefined && this.selectname === "Customers" && this.floordArray === undefined && this.selectedflats_controller.length === 0 && this.customers_all_flats_controller.length === 0) {
        this.type_id = "2";
        this.wayofcontrollerdata = this.BlockIDsArray;
      } else if (selected_projectid !== undefined && this.BlockIDsArray !== undefined && this.selectname === "Customers" && this.floordArray === undefined && this.selectedflats_controller.length === 0 && this.customers_all_flats_controller.length !== 0) {
        this.type_id = "110";
        this.wayofcontrollerdata = this.customers_all_flats_controller;
      }


      console.log(this.type_id);
      console.log(this.wayofcontrollerdata);

      this.projectname = $("#projectID").val();
      this.starttimehours = $("#selecthours").val();
      this.starttimeminutes = $("#selectminits").val();
      this.startampm = $("#selecampm").val();
      this.endhours = $("#selecthoursend").val();
      this.endminutes = $("#selectminitsend").val();
      this.endampm = $("#selecampmend").val();

      if ($("#projectID").val() == "select" || $("#projectID").val() == undefined || $("#projectID").val() == null) {
        swal("Please select the project.");
        return false;
      }

      if (this.selectname == "Floors") {
        if (this.viewselectedvaluelength.length == 0) {
          swal("Please select the blocks");
          return false;
        }
        if (this.floorDetIdArray == 0 && this.flatDetIdArray == 0) {
          swal("Please select the floors (or) flats");
          return false;
        }

      } else if (this.selectname == "Customers") {
        if ($("#fromDate").val() == "" || $("#fromDate").val() == null || $("#fromDate").val() == undefined) {
          swal("Please select the flat booking from date");
          return false;
        }

        if ($("#toDate").val() == "" || $("#toDate").val() == null || $("#toDate").val() == undefined) {
          swal("Please select the flat booking to date");
          return false;
        }

      }



      if (this.controller.length == 0) {
        if ($("#selecthours").val() == "select" || $("#selecthours").val() == undefined || $("#selecthours").val() == null) {
          swal("Please select the start time hours.");
          return false;
        }


        if ($("#selectminits").val() == "select" || $("#selectminits").val() == undefined || $("#selectminits").val() == null) {
          swal("Please select the start time minutes.");
          return false;
        }

        if ($("#selecampm").val() == "select" || $("#selecampm").val() == undefined || $("#selecampm").val() == null) {
          swal("Please select the start time AM/PM.");
          return false;
        }

        if ($("#selecthoursend").val() == "select" || $("#selecthoursend").val() == undefined || $("#selecthoursend").val() == null) {
          swal("Please select the end time hours.");
          return false;
        }


        if ($("#selectminitsend").val() == "select" || $("#selectminitsend").val() == undefined || $("#selectminitsend").val() == null) {
          swal("Please select the end time minutes.");
          return false;
        }

        if ($("#selecampmend").val() == "select" || $("#selecampmend").val() == undefined || $("#selecampmend").val() == null) {
          swal("Please select the end time AM/PM.");
          return false;
        }

        this.projectname = $("#projectID").val();
        this.starttimehours = $("#selecthours").val();
        this.starttimeminutes = $("#selectminits").val();
        this.startampm = $("#selecampm").val();
        this.endhours = $("#selecthoursend").val();
        this.endminutes = $("#selectminitsend").val();
        this.endampm = $("#selecampmend").val();

        // this.slotstime = this.starttimehours + ":" + this.starttimeminutes + " " + this.startampm + " - " + this.endhours + ":" + this.endminutes + " " + this.endampm;

        this.start_time = this.starttimehours + ":" + this.starttimeminutes + " " + this.startampm;
        this.end_time = this.endhours + ":" + this.endminutes + " " + this.endampm;


        var beginningTime = moment(this.starttimehours + ":" + this.starttimeminutes + " " + this.startampm, 'h:mma');
        var endTime = moment(this.endhours + ":" + this.endminutes + " " + this.endampm, 'h:mma');
        if (beginningTime.isBefore(endTime) == false) {
          swal("Your End date cannot be before or equal to Start Date");
          return false;
        }



        if (this.controller.length !== 0) {
          for (var i = 0; i < this.controller.length; i++) {
            var currentTime = moment(beginningTime, "HH:mm a");
            var currentTimeend = moment(endTime, "HH:mm a");
            var startTime = moment(this.controller[i].startTime, "HH:mm a");
            var endTime = moment(this.controller[i].endTime, "HH:mm a");
            if (currentTime.isBetween(startTime, endTime) == true || currentTimeend.isBetween(startTime, endTime) == true) {
              swal("Appointment schedule time already selected!");
              return false;
            }
          }
        }
        if (this.controller.some(item => item.startTime === this.start_time) == true) {
          swal("Selected Time slot is already Available!");
          return false;
        } else {
          this.controller.push({
            "startTime": this.start_time,
            "endTime": this.end_time
          });

        }

        $("#selecthours").val(['select']);
        $("#selecthours").trigger('change');
        $("#selectminits").val(['select']);
        $("#selectminits").trigger('change');
        $("#selecampm").val(['select']);
        $("#selecampm").trigger('change');
        $("#selecthoursend").val(['select']);
        $("#selecthoursend").trigger('change');
        $("#selectminitsend").val(['select']);
        $("#selectminitsend").trigger('change');
        $("#selecampmend").val(['select']);
        $("#selecampmend").trigger('change');
      }

      // if (this.model.length == 0) {
      //   swal("Please select the select dates .");
      //   return false;
      // }

      console.log($("#txtDate").val());
      console.log($("#txtDate1").val());


      if ($("#txtDate").val() == "" || $("#txtDate").val() == undefined || $("#txtDate").val() == null) {
        swal("Please select the start date.");
        return false;
      }

      if ($("#txtDate1").val() == "" || $("#txtDate1").val() == undefined || $("#txtDate1").val() == null) {
        swal("Please select the end date.");
        return false;
      }

      var startdate_id = $("#txtDate").val();
      var endDate_id = $('#txtDate1').val();
      if (new Date(startdate_id) > new Date(endDate_id)) {
        swal('Please select  a valid from and to date');
        return false;
      }


      var between = [];

      var datePickedDate1 = new Date(startdate_id);
      var datePickedDate2 = new Date(endDate_id);

      while (datePickedDate1 <= datePickedDate2) {
        var d = new Date(datePickedDate1);
        var datestring = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
          ("0" + d.getDate()).slice(-2);

        between.push(datestring);

        this.datesselection_controller.push(datestring);

        datePickedDate1.setDate(datePickedDate1.getDate() + 1);
      }

      console.log(between);


      this.title_submit = "Do you really want to Submit ?";
      this.modalService.dismissAll();

      // for (var i = 0; i < this.model.length; i++) {
      //   var d = new Date(this.model[i]);
      //   var datestring = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
      //     ("0" + d.getDate()).slice(-2);
      //   this.datesselection_controller.push(datestring);
      // }




      this.mainController = [];
      for (var i = 0; i < this.controller.length; i++) {
        this.mainController.push({ 'startTime': this.controller[i].startTime, 'endTime': this.controller[i].endTime, 'date': this.datesselection_controller });
      }

      this.CreateSlots_controller.push({
        // name: this.testhtml,
        data: this.mainController,
      });

      for (var i = 0; i < this.CreateSlots_controller.length; i++) {
        this.apptmtSlotTimesInfoListdetails = [];
        this.setdates_controller = [];
        for (var j = 0; j < this.CreateSlots_controller[i].data.length; j++) {
          this.apptmtSlotTimesInfoListdetails.push({
            "startTime": this.CreateSlots_controller[i].data[j].startTime,
            "endTime": this.CreateSlots_controller[i].data[j].endTime,
          });
          this.selectedData_cont = [];
          this.selectedData_cont = this.CreateSlots_controller[i].data[j].date;
        }
      }


      if (this.apptmtSlotTimesInfoListdetails.length !== 0) {
        var c = this.testhtml;
        this.testhtml = this.nextCharacter(c);
        this.apptmtDtlsReqstList.push({
          "apptmtSlotTimeReqList": this.apptmtSlotTimesInfoListdetails,
          "slotDatesList": this.selectedData_cont,
          "type": this.type_id,
          "typeIds": this.wayofcontrollerdata,
          "siteId": selected_projectid,
          "setName": this.testhtml
        });
        let result = false;
        // this.date_selection_array = [];
      }


      this.myForm.reset({
        firstDate: ''
      });


      if (this.CreateSlots_controller.length != 0) {
        $(".submit").prop("disabled", false);

      }

      this.SelectDates = [];
      this.apptmtSlotTimesInfoListdetails = [];
      this.setdates_controller = [];
      this.selectedflats_controller = [];
      this.controller = [];
      this.datesselection_controller = [];
      this.floorDetIdArray = 0;

      // $('#Mydatetime').flatpickr().clear();
      // $('#Mydatetime').flatpickr({
      //   mode: "multiple",
      //   altInput: true,
      //   minDate: 'today',
      //   altFormat: 'j/m/Y',
      //   enableTime: false,
      //   dateFormat: 'd-m-Y',
      // });

    }

    console.log(selected_projectid);
    console.log(this.apptmtDtlsReqstList);



    this.loading_submit = true;
    $('.page-loader-wrapper').show();
    this.service.final_submissionfun(selected_projectid, this.apptmtDtlsReqstList).then(resp => {

      console.log(resp);
      $('.page-loader-wrapper').hide();
      this.loading_submit = false;
      this.modalService.dismissAll();
      if (resp.responseCode == 200) {
        swal(resp.description);
        this.CreateSlots_controller = [];
        this.viewselectedvaluelength = [];

        this.apptmtDtlsReqstList = [];

        this.floorDetIdArray = 0;
        this.flatDetIdArray = 0;
        this.ViewAllBlockshide = false;

        $(function () {
          $('input[type=radio]').prop('checked', false);
        });
        this.siteList();

        setTimeout(() => {

          location.reload();
        }, 3000);

        this.radio_Controller = [];
        this.radio_Controller = [
          { Name: 'Select Floors,Flats', id: 'Floors' },
          { Name: 'Select Customers', id: 'Customers' }
        ];
        this.selectType = "";

        if (this.BlockIDsArray !== undefined) {
          this.blockonchangeFun(selected_projectid, this.BlockIDsArray);
        }

        if (this.floordArray !== undefined) {
          this.flooronchangefun(selected_projectid, this.mydata_Blockselect, this.floordArray);
        }


        this.flatDetIdArray = 0;
        $(function () {
          $(".controll").prop("disabled", true);
          $("#fromDate").prop("disabled", true);
          $("#toDate").prop("disabled", true);
        });


        $("#fromDate").val("");
        $("#toDate").val("");
        $("#customerData").hide();
        this.customer_All_Flats = [];
        $("#projectID").val(['select']);
        $("#projectID").trigger('change');

      } else if (resp.responseCode == 800) {
        this.loading_submit = false;
        this.SelectDates = [];
        this.apptmtSlotTimesInfoListdetails = [];
        this.setdates_controller = [];
        this.selectedflats_controller = [];
        this.returnslotdates = [];
        for (var i = 0; i < resp.responseObjList.apptmtSlotTimesResponseList.length; i++) {
          this.returnslotdates.push(resp.responseObjList.apptmtSlotTimesResponseList[i].slotTime);
        }

        console.log("Its workig");
        // swal(resp.description + "\n" + this.returnslotdates.join("\r\n"));

        this.errormessage_controller = resp.description;
        this.error_dates = this.returnslotdates;

        this.modalService.open(this.content,  { backdrop: 'static', size: 'lg', keyboard: false, centered: true,  }).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.finallyservice_title_getDismissReason(reason)}`;
        });


        setTimeout(() => {
          this.model = [];


        }, 700);

        this.radio_Controller = [];
        this.radio_Controller = [
          { Name: 'Select Floors,Flats', id: 'Floors' },
          { Name: 'Select Customers', id: 'Customers' }
        ];
        this.selectType = "";

        console.log(this.BlockIDsArray);
        console.log(this.floordArray);

        if (this.BlockIDsArray !== undefined) {
          this.blockonchangeFun(selected_projectid, this.BlockIDsArray);
        }

        if (this.floordArray !== undefined) {
          this.flooronchangefun(selected_projectid, this.mydata_Blockselect, this.floordArray);
        }
        this.flatDetIdArray = 0;

        $(function () {
          $(".controll").prop("disabled", true);
          $("#fromDate").prop("disabled", true);
          $("#toDate").prop("disabled", true);

        });


        $("#fromDate").val("");
        $("#toDate").val("");
        $("#customerData").hide();

        this.customer_All_Flats = [];
        $("#projectID").val(['select']);
        $("#projectID").trigger('change');

        selected_projectid = undefined;
        this.BlockIDsArray = undefined;
        this.selectname = undefined;
        this.floordArray = undefined;
        this.selectedflats_controller.length = 0;

      } else if (resp.responseCode == 600) {
        this.loading_submit = false;
        swal(resp.status);
        return false;

      } else if (resp.responseCode == 440) {
        this.loading_submit = false;
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        this.loading_submit = false;
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
      }
    }, error => {
      this.loading_submit = false;
      $('.page-loader-wrapper').hide();
      var error = JSON.parse(error._body).responseCode;
      if (error == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      }
    }
    );


  }




  private getsubmitDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  slotsremoveItem(index: number, controller, apptmtDtlsReqstList, mainindex): void {
    controller.splice(index, 1);
    if (controller.length == 0) {
      apptmtDtlsReqstList[mainindex].slotDatesList = [];
      apptmtDtlsReqstList[mainindex].typeIds = [];
      apptmtDtlsReqstList[mainindex].type = "";
      apptmtDtlsReqstList[mainindex].siteId = "";
      apptmtDtlsReqstList[mainindex].setName = "";
      apptmtDtlsReqstList.splice(mainindex, 1);
    }

    if (this.apptmtDtlsReqstList.length == 0) {
      $(function () {
        $(".submit").prop("disabled", true);
      })
    }
  }



  slotstartdatefun() {
    $("#txtDate").val("");

  }

  slotendtimefun() {
    $("#txtDate1").val("");
  }



    private finallyservice_title_getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


}
