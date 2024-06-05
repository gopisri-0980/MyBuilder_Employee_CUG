import { NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { CommonComponent } from '../common/common.component';
import { Carparking } from '../model/carparking.model';
//import { SinglepageprojectdetailsComponent } from '../singlepageprojectdetails/singlepageprojectdetails.component';
import { ShortcutService } from './car-parking-creation.service';
//import { ShortcutService } from '../shortcut-components.service';
//import $ from 'jquery';
declare const $: any;
declare const swal: any;
var selected_projectid;
var selected_blockid;
var selected_floorid;
var selected_flatid;
var interestval;
var site_name;
var prevslot
var latestslot
var carparkingbasementand_slot_array: any = [];
enum CheckBoxType { APPLY_FOR_JOB, MODIFY_A_JOB, NONE };
var tempindex;
@Component({
  selector: 'app-car-parking-creation',
  templateUrl: './car-parking-creation.component.html',
  styleUrls: ['./car-parking-creation.component.sass']
})
export class CarParkingCreationComponent implements OnInit {

  check_box_type = CheckBoxType;

  currentlyChecked: CheckBoxType;


  custmerDetails: any = {};
  milestonedemand_details: any;
  tabList: any;
  autocompleteform: FormGroup;
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
  loaderhideme: boolean = true;
  customerdata: Array<any> = [];
  availableTags: Array<any> = [];
  flatbookingId: any;
  keyword = "name";
  countries: any;
  employeeIds: any;
  myupdate: any;
  siteIDvalue: any;
  customer_Id: any;
  flatbooking_Id: any;
  coaplicant_custmerDetails: any;
  flatInfo: any;
  flatId_Id: any;
  milestonedetails: any;
  receiptDetailsdata: any;
  selection: any;
  selected: any = [];
  // carparkingbasementand_slot_array: any = [];
  btnstatus: string;
  Unit_Details: any;
  paymentdetailsList: any;
  registrationDetails: any;
  mystest: any[];
  sale_DeedNo: any;
  sale_DeedDate: any;
  sale_DeedValue: any;
  registration_Status: any;
  saleDeed_CDno: any;
  referFriend_Dtot: any;
  notification_Responses: any;
  employeecommunication_Responses: any;
  count: any = 0;
  count1: any = 0;
  count2: any = 0;
  count3: any = 0;
  count4: any = 0;
  ticketdetails_Id: any;
  viewticketData: any;
  demandnotedate: any;
  ActionURL: string;
  hideme1: boolean;
  interestcount: any = 0;
  interestletterList: any;
  temp_selectedval: any;
  consoledata: any;
  milestoneArray: Array<any> = [];
  financialProjectMileStoneRequests: any = [];
  milestone: Carparking = {
    basement: "",
    slot: ""
  };
  basementlist_: any;
  createMilestoneRequest: { basementId: any; slotId: any; };
  slotarray: any = [];




  constructor(private formBuilder: FormBuilder, private service: ShortcutService, private cmn: CommonComponent, private http: Http, private router: Router,) {
    $('.page-loader-wrapper').hide();
    interestval = "With Out Interest";
    sessionStorage.setItem('fromviewpagepredefined', null);
    this.siteList();



  }




  ngOnDestroy() {
    // this.customer_Id = sessionStorage.setItem("customeridsession","");
    // this.flatbooking_Id =sessionStorage.setItem("flatbookingidsession","");
    // this.flatId_Id=sessionStorage.setItem("flatidsession","");
  }
  selectEvent(item) {
    //alert(item)
    //  $("#hideflat").hide()

    this.selected = []
    this.count = 0;
    this.count1 = 0;
    this.count2 = 0;
    this.count3 = 0;
    this.count4 = 0;
    this.customer_Id = (item.id).split("&&")[0];
    this.flatbooking_Id = (item.id).split("&&")[1];
    this.flatId_Id = (item.id).split("&&")[1];
    //$("#flatSelection").val("select")
    //  $('#flatSelection').text('select');
    $('#flatSelection').val(['select']);
    $('#flatSelection').trigger('change');
    if (item == undefined) {
      this.employeeIds = null;
    } else {
      this.employeeIds = item.id;

    }
  }
  onChangeSearch(event) { }
  ngOnInit() {


    this.milestoneArray.push(this.milestone);
    $(function () {
      $("#basement0").select2({
        placeholder: "Select basement",
        dir: "ltl",
      });

      $("#slot0").select2({
        placeholder: "Select slot",
        dir: "ltl",
      });
    })
    this.autocompleteform = this.formBuilder.group({
      employeename: ['']
    });
    $(function () {
      var accordionItem = document.getElementsByClassName("accordion-item");
      var accordionHeading = document.getElementsByClassName("accordion-item-heading");

      // Create event listeners for each accordion heading
      for (var i = 0; i < accordionHeading.length; i++) {
        accordionHeading[i].addEventListener("click", openItem);
      }

      function openItem() {
        var itemClassName = this.parentNode.className;

        // If we want to close previous open item when opening another
        for (var i = 0; i < accordionItem.length; i++) {
          accordionItem[i].className = 'accordion-item closed';
        }

        if (itemClassName == 'accordion-item closed') {
          this.parentNode.className = 'accordion-item open';
        }
      }

      window.onunload = function () {
        for (i = 0; i < accordionHeading.length; i++) {
          accordionHeading[i].removeEventListener("click", openItem);
        }
        return;
      }


    })
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
    $(function () {

      $('#basement0').change(function (e) {

        var selected_basementid = $(e.target).val();
        // alert(selected_projectid)
        if (selected_basementid == 'select') {
          $("#slot option[value]").remove();
        } else {
          self.basementschange(selected_basementid, 0);
        }

      })
      // $('#basement1').change(function (e) {
      //  alert(e)
      //   var selected_basementid = $(e.target).val();
      //    alert(selected_basementid)
      //    self.basementschange(selected_basementid,1);
      //  })

      $('#projectID').change(function (e) {
        selected_projectid = $(e.target).val();
        site_name = $('#projectID').select2('data')[0].text

        if (selected_projectid == "select") {
          //swal("please select project");
          $("#BlockId option[value]").remove();
          $("#floorSelection option[value]").remove();
          $("#flatSelection option[value]").remove();
          // this.getmessageListfun(null, null, null);
          self.customerautofield('');
        } else {
          // $('.table-responsive').hide();
          // this.viewData = "";
          self.basementList(0);
          sessionStorage.setItem('ledgerData', '');
          self.projectchangeFun(selected_projectid);
          self.floorsitewisechange(selected_projectid);
          self.flatsitewisechange(selected_projectid);

          console.log(selected_projectid);

          this.siteIDvalue = selected_projectid;

          self.customerautofield(this.siteIDvalue);

        }
      })

      $('#BlockId').change(function (e) {
        selected_blockid = $(e.target).val();
        if (selected_blockid == "select") {
          swal("please select the block");

          $("#floorSelection option[value]").remove();
          // $("#flatSelection option[value]").remove();
          self.flatsitewisechange(selected_projectid);
          self.floorsitewisechange(selected_projectid);
        } else {
          this.controller = [0];
          sessionStorage.setItem('ledgerData', '');
          self.blockchangeFun(selected_blockid);
          self.flatwiseblockchange(selected_blockid);
        }
      })

      $('#floorSelection').change(function (e) {
        this.selectedFloorID = "";
        selected_floorid = $(e.target).val();
        if (selected_floorid == "select") {
          swal("please select the floor");
          //$("#flatSelection option[value]").remove();
        } else {
          this.controller = [0];
          sessionStorage.setItem('ledgerData', '');
          self.floorchangeFun(selected_floorid);
        }
      })

      $('#flatSelection').change(function (e) {
        this.selectedFlatID = "";
        selected_flatid = $(e.target).val();

        if (selected_flatid == "select") {
          //  swal("please select the flat");
          $("#hideflat2").show();

        } else {

          // $('.table-responsive').hide();
          // this.viewData = "";
          sessionStorage.setItem('ledgerData', '');
          self.flatchangeFun(selected_flatid);

        }
      })

    })
  }
  /*-----------------Getting Project(site) list Start---------------------*/
  siteList() {
    var arr = localStorage.getItem('AllotCarParking');
    console.log(arr)
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



  /*------------------------Projects On Change Functionality Start--------------------*/
  projectchangeFun(selectedSiteID) {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "block/blocks.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "ids": [selectedSiteID],
      "requestUrl": "All"
    }
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#BlockId').html("");
        $('#BlockId').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#BlockId').append("<option value='" + resp.responseObjList[i].detId + "'>" + resp.responseObjList[i].name + "</option>");
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
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "ids": [Number($('#BlockId').val())],
      "requestUrl": "All"
    }
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#floorSelection').html("");
        $('#floorSelection').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#floorSelection').append("<option value='" + resp.responseObjList[i].detId + "'>" + resp.responseObjList[i].name + "</option>");
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
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "ids": [selectedFloorID],
      "requestUrl": "All"
    }
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      console.log("Flat list--- :" + JSON.stringify(resp))
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#flatSelection').html("");
        this.controller = [0];
        $('#flatSelection').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#flatSelection').append("<option value='" + resp.responseObjList[i].detId + "'>" + resp.responseObjList[i].name + "</option>");
          this.controller.push(resp.responseObjList[i].detId);
          this.autocompleteform.patchValue({
            employeename: '',
          });
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
    this.selected = []
    this.count = 0;
    this.count1 = 0;
    this.count2 = 0;
    this.count3 = 0;
    this.count4 = 0;
    this.controller = [0];
    this.controller.push(Number(selectedFlatID));
    $('.page-loader-wrapper').show();
    // -------------------------------
    let url = this.cmn.commonUrl + "financial/activeBlocksFlats.spring";
    // http://localhost:8080/employeeservice/flat/flatBlock.spring
    console.log("url :" + url);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: headers }); 
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "flatIds": [selectedFlatID]
    }
    console.log("----body :" + JSON.stringify(body));
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      //$('.page-loader-wrapper').hide();
      console.log("flat change response----------" + JSON.stringify(resp));
      //this.Blocklinks =  resp;
      if (resp.responseCode == 200) {

        $('.page-loader-wrapper').hide();
        this.customer_Id = resp.responseObjList[0].customerId;
        this.flatbooking_Id = resp.responseObjList[0].flatBookingId;
        this.flatId_Id = resp.responseObjList[0].flatId;

        $("#hideflat2").hide();
        this.autocompleteform.patchValue({
          employeename: '',
        });

        // this.form = this.formBuilder.group({
        //   bankName: new FormControl(bankName, Validators.required)
        // });

      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        swal(resp.status);
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


  floorsitewisechange(siteid) {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "floor/floorSite.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "ids": [siteid],
      "requestUrl": "All"
    }
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#floorSelection').html("");
        $('#floorSelection').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#floorSelection').append("<option value='" + resp.responseObjList[i].detId + "'>" + resp.responseObjList[i].name + "</option>");
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
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "ids": [siteid],
      "requestUrl": "All"
    }
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      console.log("flat List----- :" + JSON.stringify(resp))
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#flatSelection').html("");
        this.controller = [0];
        $('#flatSelection').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#flatSelection').append("<option value='" + resp.responseObjList[i].detId + "'>" + resp.responseObjList[i].name + "</option>");
          this.controller.push(resp.responseObjList[i].detId);
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



  flatwiseblockchange(blockid) {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "flat/flatBlock.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "ids": [blockid],
      "requestUrl": "All"
    }
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#flatSelection').html("");
        this.controller = [0];
        $('#flatSelection').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#flatSelection').append("<option value='" + resp.responseObjList[i].detId + "'>" + resp.responseObjList[i].name + "</option>");
          this.controller.push(resp.responseObjList[i].detId);
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
  customerautofield(SiteIDS) {
    $(".page-loader-wrapper").show();
    console.log(SiteIDS);
    this.service.GetCustomernamefun(sessionStorage.getItem("login_sessionkey"), "", SiteIDS).then(resp => {

      $(".page-loader-wrapper").hide();
      console.log("custmer Nameds :" + JSON.stringify(resp))
      if (resp.responseCode == 200) {
        this.customerdata = resp.responseObjList.referedCustomer;
        this.availableTags = [];
        for (var i = 0; i < this.customerdata.length; i++) {
          this.availableTags.push({
            id: this.customerdata[i].custId + "&&" + this.customerdata[i].flatBookingId + "&&" + this.customerdata[i].flatId,
            name: this.customerdata[i].siteNameCustomerFlatNo
          });
          //   this.employeeIds = [this.customerdata[i].employeeId];
        }

        this.countries = this.availableTags;
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
    }

    )
  }












  // when checkbox change, add/remove the item from the array
  onChange(checked, item) {
    if (checked) {
      this.selected.push(item);
    } else {
      this.selected.splice(this.selected.indexOf(item), 1)
    }
    console.log(this.selected)
  }


  /*--------------------click on milestone Amount end-----------------*/

  paymentdetailspdf(link) {
    window.open(link)
  }

  attachmentlink(link) {
    window.open(link);
  }
  onClearSearch(item) {
    console.log(item);
    if (item == undefined) {
      this.employeeIds = undefined;
    }
  }

  homeClick() {
    this.cmn.commonHomeNavigation();
  }


  basementList(index) {
    let url = this.cmn.commonUrl + "carParkingAllotment/getCarParkingBasementDetails.spring";
    // http://106.51.38.64:9999/employeeservice/site/site.spring
    console.log("url :" + url);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "requestUrl": "Basement",
      "siteId": $("#projectID").val()
    }
    console.log("body :" + JSON.stringify(body))
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      //$('.page-loader-wrapper').hide();
      console.log("basement list response----------" + JSON.stringify(resp));
      if (resp.responseCode == 200) {
        // var Options = "";
        this.basementlist_ = resp.responseObjList.carParkingBasementSlotsResponseList;

        // for (var i = 0; i < resp.responseObjList.carParkingBasementSlotsResponseList.length; i++) {
        //   $('#basement'+index).append("<option value='" + resp.responseObjList.carParkingBasementSlotsResponseList[i].basementId + "'>" + resp.responseObjList.carParkingBasementSlotsResponseList[i].basementName + "</option>");
        // }
      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        // alert(resp.status);
        swal(resp.errors[0]);
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
  customTrackBy(index: number, obj: any): any {
    return index;
  }
  getDetails() {
    this.slotarray = []
    //alert($('#tbl_post tr').length);


    if ($('#projectID').val() == 'select' || $('#projectID').val() == null) {
      swal("Please select project");
      return false;
    }

    // alert($('#flatSelection').val())
    // alert(this.employeeIds)
    if ($('#flatSelection').val() == 'select' && this.employeeIds == undefined) {
      swal("Please select flat OR customer name");
      return false;
    }

    if ($('#BlockId').val() == 'select' || $('#BlockId').val() == null) {
      this.blockID = [];
    } else {
      this.blockID = [Number($('#BlockId').val())]
    }

    if ($('#floorSelection').val() == 'select' || $('#floorSelection').val() == null) {
      this.floorID = [];
    } else {
      this.floorID = [Number($('#floorSelection').val())]
    }

    if ($('#flatSelection').val() == 'select' || $('#flatSelection').val() == null) {
      this.flatID = null;
    } else {
      this.flatID = $('#flatSelection').val()
    }


    for (var i = 0; i < $('#tbl_post tr').length; i++) {
      if ($('#basement' + i).val() == "select" || $('#basement' + i).val() == null) {
        swal("please select basement");
        //$('#milestone_percentage'+id).focus();
        return false;
      }



      if ($('#slot' + i).val() == "select" || $('#slot' + i).val() == null) {
        swal("please select slot");
        //$('#milestone_percentage'+id).focus();
        return false;
      }

      if (i < 0) {
        if ($('#slot' + (i - 1)).val() == $('#slot' + i).val()) {
          swal("Slot already selected.Please change the slot");
          //$('#milestone_percentage'+id).focus();
          return false;
        }
      }
      this.slotarray.push($('#slot' + i).val())
    }
    // return false;
    for (var i = 0; i < this.slotarray.length; i++) {
      for (var j = i + 1; j < this.slotarray.length; j++) {
        if (this.slotarray[i] == this.slotarray[j]) {
          swal("Slot already selected.Please change the slot");
          return false;

        }
      }
    }
    var self = this;


    $('.tabletrClass').each(function () {
      console.log("working");
      var index = $(this).attr('id').split('-')[1];
      console.log(index);
      self.financialProjectMileStoneRequests.push({
        "basementId": $('#basement' + index).val(),
        "slotId": $('#slot' + index).val(),
      });

      console.log(self.financialProjectMileStoneRequests);

    })

    console.log(self.financialProjectMileStoneRequests)


    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "carParkingAllotment/saveCarParkingAllotmentDetails.spring"
    console.log("saveCarParkingAllotmentDetails url :" + url);

    let headers = new Headers({ 'Content-Type': 'application/json' });


    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "flatBookId": this.flatbooking_Id,
      "carParkingAllotmentBasementInfoList": this.financialProjectMileStoneRequests
    }




    console.log(url);
    console.log(JSON.stringify(body));



    //return false
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      console.log("save car parking response----------" + JSON.stringify(resp));
      if (resp.responseCode == 200) {

        //swal("Car parking allotment created successfully !!");
        swal(resp.description);
        location.reload()
        // this.router.navigate(["/car-parking-view"]);
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

  //   changebasement(e){
  //     debugger;
  //     alert(e)
  // alert(e.id)
  // alert(e.target.id)
  // alert(e.target.value)
  //   }

  basementschange(id, ind) {

    console.log(id);
    console.log(ind);

    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "carParkingAllotment/getCarParkingBasementDetails.spring";
    // http://106.51.38.64:9999/employeeservice/site/site.spring
    console.log("url :" + url);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "requestUrl": "Slot",
      "basementId": id
    }

    this.http.post(url, body).map(res => res.json()).subscribe(resp => {

      console.log(resp);

      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 200) {
        // var Options = "";
        // this.basementlist_ = resp.responseObjList.carParkingBasementSlotsResponseList;
        $('#slot' + ind).html('')
        for (var i = 0; i < resp.responseObjList.carParkingBasementSlotsResponseList.length; i++) {
          $('#slot' + ind).append("<option value='" + resp.responseObjList.carParkingBasementSlotsResponseList[i].slotId + "'>" + resp.responseObjList.carParkingBasementSlotsResponseList[i].slotName + "</option>");
        }
      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        // alert(resp.status);
        swal(resp.errors[0]);
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

  addMilestone(index) {
    console.log(index);
    this.slotarray = []
    if ($('#projectID').val() == 'select' || $('#projectID').val() == null) {
      swal("Please select project");
      return false;
    }

    if ($('#flatSelection').val() == 'select' && this.employeeIds == undefined) {
      swal("Please select flat OR customer name");
      return false;
    }



    var test = this;

    if ($('#basement' + index).val() == "select" || $('#basement' + index).val() == null) {
      swal("please select basement");
      return false;
    }
    if ($('#slot' + index).val() == "select" || $('#slot' + index).val() == null) {
      swal("please select slot");
      return false;
    }
    if (index < 0) {
      if ($('#slot' + (index - 1)).val() == $('#slot' + index).val()) {
        swal("Slot already selected.Please change the slot");
        return false;
      }
    }
    this.slotarray.push($('#slot' + index).val())



    for (var i = 0; i < this.slotarray.length; i++) {
      for (var j = i + 1; j < this.slotarray.length; j++) {
        if (this.slotarray[i] == this.slotarray[j]) {
          swal("Slot already selected.Please change the slot");
          return false;
          this.slotarray = []
        }
      }
    }




    $('.tabletrClass').each(function () {
      var id = $(this).attr('id').split('-')[1];
      if ($('#basement' + index).val() == "select" || $('#basement' + index).val() == null) {
        swal("please select basement");
        return false;
      }

      if ($('#slot' + index).val() == "select" || $('#slot' + index).val() == "select") {
        swal("please select slot");
        return false;
      }


    })


    tempindex = index + 1
    if ($('#slot' + index).val() != "select" && $('#basement' + index).val() != "select") {
      this.milestone = { basement: "", slot: "" };
      this.milestoneArray.push(this.milestone);
      console.log(this.milestoneArray);

      $(function () {
        var self = test;
        $('#basement' + tempindex).select2({
          placeholder: "Select basement",
          dir: "ltl",
        });

        $('#slot' + tempindex).select2({
          placeholder: "Select basement",
          dir: "ltl",
        });

        $('#basement' + tempindex).change(function (e) {

          // alert(tempindex)
          var selected_basementid = $(e.target).val();
          // alert(selected_basementid)

          if (selected_basementid == "select") {

          } else {
            self.basementschange(selected_basementid, tempindex);
          }

        })

      })

    }
  }


  deleteMilestone(index) {
    tempindex = tempindex - 1;
    console.log(tempindex);
    var delBtn = confirm(' Do you want to delete ?');
    if (delBtn == true) {
      this.milestoneArray.splice(index, 1);
      console.log(this.milestoneArray);
    }


  }





}
