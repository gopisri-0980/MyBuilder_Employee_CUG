import { NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CommonComponent } from '../common/common.component';
//import { SinglepageprojectdetailsComponent } from '../singlepageprojectdetails/singlepageprojectdetails.component';
import { ShortcutService } from './shortcut_components.service';
//import { ShortcutService } from '../shortcut-components.service';
declare const $: any;
declare const swal: any;
var temp2_forhideingbuttons
var selected_projectid;
var selected_blockid;
var selected_floorid;
var selected_flatid;
var interestval;
var site_name;
var milestonedetails;

var maincontrollerval = [];
enum CheckBoxType { APPLY_FOR_JOB, MODIFY_A_JOB, NONE };

@Component({
  selector: 'app-shortcut-components',
  templateUrl: './shortcut-components.component.html',
  styleUrls: ['./shortcut-components.component.sass']
})
export class ShortcutComponentsComponent implements OnInit {
  milestone_alias_name: any;
  welcomemail: FormGroup;
  check_box_type = CheckBoxType;
  currentlyChecked: CheckBoxType;
  closeResult = '';
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
  selected_waiver_status: any = [];
  selected: any = [];
  selected1: any = [];
  selected2: any = [];
  financialProjectMileStoneRequests: any = [];

  financialPMileStoneRequests: Array<any> = [];

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
  count5: any = 0;
  count6: any = 0;
  ticketdetails_Id: any;
  viewticketData: any;
  demandnotedate: any;
  ActionURL: string;
  hideme1: boolean;
  interestcount: any = 0;
  interestletterList: any;
  temp_selectedval: any;
  consoledata: any;
  interest_breakuplist: any;
  totalPenalty_Amount: any;
  totalMilestonePaid_Amount: any;
  totalMilestoneDue_Amount: any;
  financialAmtDetails: any;
  btndhideshoe: any;
  statusId: any;
  temp: any;
  deptid: any;
  roleid: any;
  ReadOnlyStyleGuideNotes: boolean;
  bookingFormId: any;
  interest_Amount: any;
  mileStone_Amount: any;

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  sendwelcome: boolean = false;
  nocbankerhide : boolean=false;
  submitted: boolean;
  submitval: boolean;
  Document_Typesname: Array<any> = [];
  documenttypevalue: any;
  milestoneAmountDue: any;
  loading: boolean;
  loading1: boolean;
  controllerURLdata: Array<any> = [];
  DemandNoteFormats_controller: Array<any> = [];

  agreementDraftFile: Array<any> = [];
  allotmentLetterFile: Array<any> = [];
  costBreakUpLetterFile: Array<any> = [];

  documentpreview: boolean = true;
  controller_documentlist: Array<any> = [];
  document_status: any;
  status_name: any;
  customerRegisteredInApp: any;
  description_status: any;
  controller_Milestone: boolean;
  loading_mil: boolean;

  favoriteSeason: string;
  generate_noc_Letter: any;
  Noc_loading: boolean = false;
  controller_NOCdocumentlist: Array<any> = [];
  NOC_preview_loading: boolean;
  previewNOCbtn: boolean = true;
  controller_docNoc: Array<any> = [];
  GenerateNOCbtn: boolean = true;
  returnslotdates: Array<any> = [];
  controller1: any = [];
  statusName: any;
  selectstatus: any;
  flatNumber: any;
  salesforce_SiteName: any;
  salesforce_BookingId: any;
  democlass: boolean = false;
  salesTeamLeadId: any;
  temp_milestoneDAte: any;
  viewTransactionData: string;
  employee_id: string;
  modificationDetailsdata: any;
  controller_stat : any;
  constructor(private formBuilder: FormBuilder, private service: ShortcutService, private cmn: CommonComponent,
    private http: Http, private router: Router, private modalService: NgbModal) {
    this.deptid = sessionStorage.getItem("session_deptid");
    this.roleid = sessionStorage.getItem("session_roleId");
    this.employee_id = sessionStorage.getItem("employeeId");

    console.log(this.deptid)
    console.log(this.roleid)

    var nValFromSession=sessionStorage.getItem("nval");
      if(nValFromSession=="1"){
        window.location.reload();
        sessionStorage.setItem("nval", "2");
      }else{
        $('.page-loader-wrapper').hide();
      }

      $('.page-loader-wrapper').hide();
      //this.siteList();
     // this.depID = sessionStorage.getItem("session_deptid")
     // this.roleID = sessionStorage.getItem("session_roleId")
    //  console.log("Department id " +this.depID);
    //   this.financialAmtDetails =[
    //     {
    //         "value": " 13,32,295.00",
    //         "key": "Total Due/Excess amount as per Milestone Completion"
    //     },
    //     {
    //         "value": " 17,00,000.00",
    //         "key": "Total Amount Paid"
    //     },
    //     {
    //         "value": " 2,513.39",
    //         "key": "Total Pending Penalty Amount"
    //     }
    // ],
    interestval = "With Out Interest";
    sessionStorage.setItem('fromviewpagepredefined', null);
    //alert(sessionStorage.getItem("customeridsession"))

    if (sessionStorage.getItem("customeridsession") == null || sessionStorage.getItem("customeridsession") == "") {
      this.siteList();
      $(function () {
        $("#hideshowcontent").css("display", "none");
      })

    } else {
      // alert("else")
      $(function () {
        $("#hideshowcontent").css("display", "block");
      })
      this.customer_Id = sessionStorage.getItem("customeridsession");
      this.flatbooking_Id = sessionStorage.getItem("flatbookingidsession");
      this.flatId_Id = sessionStorage.getItem("flatidsession");
      let projectId = sessionStorage.getItem("projectidsession");

      site_name = sessionStorage.getItem("projectnamesession")
      //alert(sessionStorage.getItem("projectnamesession"))
      //  $("#projectID").val()
      //$("#projectID").select2("val", projectId);
      this.getCustomerAndCoAppDetails();
      this.siteList();

    }


    // sessionStorage.setItem("flatbookingidsession",this.flatbooking_Id)
    //  sessionStorage.setItem("flatidsession",this.flatId_Id)
  }

  ngOnDestroy() {
    sessionStorage.setItem("brundcumbClick", null)
    // this.customer_Id = sessionStorage.setItem("customeridsession","");
    // this.flatbooking_Id =sessionStorage.setItem("flatbookingidsession","");
    // this.flatId_Id=sessionStorage.setItem("flatidsession","");
  }
  selectEvent(item) {
    console.log(item)
    console.log(JSON.stringify(item))
    //alert(item.name)
    console.log(item.id.split("&&")[3]);
    if(item.id.split("&&")[3] == 6){
      this.controller_stat = item.id.split("&&")[3];
    

    } else {
      this.controller_stat = item.id.split("&&")[3];
    

    }
    //alert(temp2_forhideingbuttons)
    //  $("#hideflat").hide()

    this.selected = []
    this.count = 0;
    this.count1 = 0;
    this.count2 = 0;
    this.count3 = 0;
    this.count4 = 0;
    this.count5 = 0;
    this.count6 = 0;
    var self = this;
    $(function () {
     // self.flatNumber = (item.name).split("-")[1];
     // self.statusName = (item.name).split("-")[2];

      
      //  alert(self.flatNumber)
       //  alert(self.statusName)
      // alert(item.id)
    //  self.salesforce_SiteName = (item.id).split("&&")[4];
    //self.salesforce_BookingId = (item.id).split("&&")[1];
     // self.salesforce_BookingId = (item.id).split("&&")[5];
      //  alert(self.salesforce_SiteName)
      //  alert(self.salesforce_BookingId)

      self.all_data((item.id).split("&&")[1])
    })

    //alert(this.flatNumber)
    //alert(this.statusName)

// $(function () {
//  // alert(self.statusName)
//     if (self.statusName == "active") {
      
//       //  alert('active')
//         $("#totaldiv_update").show()
//         $("#activstate").show()
//         $("#pendingstate").hide()
//         $("#Cancelbutnotrefund").hide()
    

//     } else if (this.statusName == "Pending") {
     
//         $("#totaldiv_update").show()
//         $("#activstate").hide()
//         $("#pendingstate").show()
//         $("#Cancelbutnotrefund").hide()
    
//     } else if (this.statusName == "Cancelled Not Refunded") {
      
//         $("#totaldiv_update").show()
//         $("#activstate").hide()
//         $("#pendingstate").hide()
//         $("#Cancelbutnotrefund").show()
     
//     } else {
      
//         $("#totaldiv_update").hide()
      
//     }
//   })


//     this.customer_Id = (item.id).split("&&")[0];
//     this.flatbooking_Id = (item.id).split("&&")[1];
//     this.flatId_Id = (item.id).split("&&")[2];
//     this.statusId = (item.id).split("&&")[3];
//     $(function () {
//       temp2_forhideingbuttons = (item.id).split("&&")[3];
//     })
    //  alert(item.id)
    //  alert(this.statusId)
    // this.btndhideshoe = ((item.name).split("-").splice(-1));
    // alert(this.btndhideshoe)
    // var temp =item.name
    // temp2_forhideingbuttons = (temp.split("-").splice(-1));
    // alert(temp2_forhideingbuttons)
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

    this.welcomemail = this.formBuilder.group({
      documentName: ['', Validators.required],
    });

    this.dropdownList = [
      { "id": 1, "itemName": "Allotment letter" },
      { "id": 2, "itemName": "Cost break up letter Demand draft" },
      { "id": 3, "itemName": "General Format" },
      { "id": 4, "itemName": "After OC Rec Format" },

    ];

    // this.selectedItems = [
    //   { "id": 1, "itemName": "Allotment letter" },
    //   { "id": 2, "itemName": "Cost break up letter Demand draft" },
    //   { "id": 3, "itemName": "General Format" },
    //   { "id": 4, "itemName": "After OC Rec Format" },
    // ];


    this.dropdownSettings = {
      singleSelection: true,
      text: "Select Document Name",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: "myclass custom-class"
    };


    this.autocompleteform = this.formBuilder.group({
      employeename: ['']
    });
    $(function () {
      debugger;
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

      $('.checlist1').click(function () {
        if ($(this).prop("checked") == true) {
          //alert("Checkbox is checked.");
          interestval = "With Interest";

        }
        else if ($(this).prop("checked") == false) {
          //alert("Checkbox is unchecked.");
          interestval = "With Out Interest";

        }
      });

      $('.checlist2').click(function () {
        if ($(this).prop("checked") == true) {
          //alert("Checkbox is checked.");
          interestval = "With Interest";

        }
        else if ($(this).prop("checked") == false) {
          //alert("Checkbox is unchecked.");
          interestval = "With Out Interest";

        }
      });
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

    $("#statusId1").select2({
      placeholder: "--Select--",
      dir: "ltl"
    });

    $("#statusId2").select2({
      placeholder: "--Select--",
      dir: "ltl"
    });
    $("#statusId3").select2({
      placeholder: "--Select--",
      dir: "ltl"
    });
    $(function () {
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

          sessionStorage.setItem('ledgerData', '');
          self.projectchangeFun(selected_projectid);
          self.floorsitewisechange(selected_projectid);
          self.flatsitewisechange(selected_projectid);



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
      //  var self = this;
      $('#flatSelection').change(function (e) {
        self.count = 0;
        self.count1 = 0;
        self.count2 = 0;
        self.count3 = 0;
        self.count4 = 0;
        self.count5 = 0;
        self.count6 = 0;
        $(function () {


          //   $(".accordion-item").removeClass('open');
          //   $(".accordion-item").addClass('close');
          //$(".accordion-item-content").hide();
        })

        // $(".accordion-item").accordion({ header: "h2", collapsible: true, active: false });
        // $(".closed").accordion({ header: "h2", collapsible: true, active: false });
        //  return false;
        this.selectedFlatID = "";
        selected_flatid = $(e.target).val();
       // alert(selected_flatid)
        console.log(selected_flatid)
        var temp = $(e.target).select2('data')[0].text
        console.log(temp)
        //self.salesforce_SiteName = selected_flatid.split("&&")[4];
       // self.salesforce_BookingId = selected_flatid.split("&&")[5];

        //   alert(self.salesforce_SiteName)
        //   alert(self.salesforce_BookingId)
      //  self.statusName = temp.split("-")[3]
       // self.flatNumber = temp.split("-")[2]
        //  alert(self.flatNumber)
        // alert(self.statusName)

        // if (self.statusName == "active") {
        //   $("#activstate").show()
        //   $("#pendingstate").hide()
        //   $("#Cancelbutnotrefund").hide()
        //   $("#totaldiv_update").show()
        // } else if (self.statusName == "pending") {
        //   // alert(self.statusName)
        //   $("#activstate").hide()
        //   $("#pendingstate").show()
        //   $("#Cancelbutnotrefund").hide()
        //   $("#totaldiv_update").show()
        // } else if (self.statusName == "Cancelled Not Refunded") {
        //   $("#activstate").hide()
        //   $("#pendingstate").hide()
        //   $("#Cancelbutnotrefund").show()
        //   $("#totaldiv_update").show()
        // } else {
        //   $("#totaldiv_update").hide()
        // }
        //alert(temp.split("-")[3])
        temp2_forhideingbuttons = selected_flatid.split("&&")[1];
       
        if (selected_flatid == "select") {
          //  swal("please select the flat");
          $("#hideflat2").show();

        } else {

          self.customer_Id = selected_flatid.split("&&")[2];
          self.flatbooking_Id = selected_flatid.split("&&")[3];
          self.flatId_Id = selected_flatid.split("&&")[0];
          self.all_data(self.flatbooking_Id)
         
          sessionStorage.setItem('ledgerData', '');
         


        }
      })

    })
  }



  /*-----------------Getting Project(site) list Start---------------------*/
  siteList() {
    var arr = localStorage.getItem('SiteIDS_singlepage');

    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "site/site.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
     // "sessionKey":"CB1CEA215B6643911AC25FEAD3B90BAD6A87CE87BF504E99FD0D3B973016187E","siteIds":["201"]
       "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
       "siteIds": JSON.parse(arr).map(String)
    }
    console.log(JSON.stringify(body))
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      console.log(JSON.stringify(resp))
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
      "requestUrl": "ViewAllData"
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
      "requestUrl": "ViewAllData"
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
      "requestUrl": "ViewAllData"
    }
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {

      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#flatSelection').html("");
        this.controller = [0];
        $('#flatSelection').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#flatSelection').append("<option value='" + resp.responseObjList[i].detId + "&&" + resp.responseObjList[i].statusId + "&&" + resp.responseObjList[i].customerId + "&&" + resp.responseObjList[i].flatBookingId + "&&" + resp.responseObjList[i].salesforceSiteName + "&&" + resp.responseObjList[i].salesforceBookingId + "'>" + resp.responseObjList[i].name + "</option>");
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

    let headers = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: headers }); 
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "flatIds": [selectedFlatID],
      "requestUrl": "ViewAllData"
    }

    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      //$('.page-loader-wrapper').hide();

      //this.Blocklinks =  resp;
      if (resp.responseCode == 200) {

        $('.page-loader-wrapper').hide();
        this.customer_Id = resp.responseObjList[0].customerId;
        this.flatbooking_Id = resp.responseObjList[0].flatBookingId;

        this.bookingFormId = sessionStorage.setItem("bookingFormId", this.flatbooking_Id);

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


  floorsitewisechange(siteid) {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "floor/floorSite.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "ids": [siteid],
      "requestUrl": "ViewAllData"
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
      "requestUrl": "ViewAllData"
    }
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      console.log("sitewise flat bookid :" + JSON.stringify(resp))
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#flatSelection').html("");
        this.controller = [0];
        $('#flatSelection').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#flatSelection').append("<option value='" + resp.responseObjList[i].detId + "&&" + resp.responseObjList[i].statusId + "&&" + resp.responseObjList[i].customerId + "&&" + resp.responseObjList[i].flatBookingId + "&&" + resp.responseObjList[i].salesforceSiteName + "&&" + resp.responseObjList[i].salesforceBookingId + "'>" + resp.responseObjList[i].name + "</option>");
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
      "requestUrl": "ViewAllData"
    }
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#flatSelection').html("");
        this.controller = [0];
        $('#flatSelection').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#flatSelection').append("<option value='" + resp.responseObjList[i].detId + "&&" + resp.responseObjList[i].statusId + "&&" + resp.responseObjList[i].customerId + "&&" + resp.responseObjList[i].flatBookingId + "&&" + resp.responseObjList[i].salesforceSiteName + "&&" + resp.responseObjList[i].salesforceBookingId + "'>" + resp.responseObjList[i].name + "</option>");
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

    this.service.GetCustomernamefun(sessionStorage.getItem("login_sessionkey"), "", SiteIDS).then(resp => {
      console.log(JSON.stringify(resp))
      $(".page-loader-wrapper").hide();

      if (resp.responseCode == 200) {
        this.customerdata = resp.responseObjList.referedCustomer;
        this.availableTags = [];
        for (var i = 0; i < this.customerdata.length; i++) {
          this.availableTags.push({
            id: this.customerdata[i].custId + "&&" + this.customerdata[i].flatBookingId + "&&" + this.customerdata[i].flatId + "&&" + this.customerdata[i].statusId + "&&" + this.customerdata[i].salesforceSiteName + "&&" + this.customerdata[i].salesforceBookingId,
            name: this.customerdata[i].siteNameCustomerFlatNo
          });
          //   this.employeeIds = [this.customerdata[i].employeeId];
        }

        this.countries = this.availableTags;
        console.log(this.countries)
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

  /*---------Generat and Re generate demand note buttons fuctionality----*/
  generate_and_regenerate_Demand_note(value) {
    if (value == "Generate") {
      this.btnstatus = "false"
      if (this.selected.length == 0) {
        swal("Please select atleast one milestone");
        return false;
      }
    } else if (value == 'Interest_Letter') {
      if (this.selected.length == 0) {
        swal("Please select atleast one milestone");
        return false;
      }
      this.btnstatus = "false"
      // alert(this.interestcount)
      this.interestcount = 0
      //alert(this.milestonedetails.length)
      this.temp_selectedval = this.selected[(this.selected.length) - 1].projectMilestoneId
      for (var i = 1; i <= this.milestonedetails.length; i++) {
        if (this.milestonedetails[i - 1].mileStoneStatus == "Completed") {
          // alert(this.milestonedetails[i-1].totalPenalityAmount);
          this.interestcount = this.interestcount = parseInt(this.interestcount) + parseInt((this.milestonedetails[i - 1].totalPenalityAmount));
          if (this.temp_selectedval == this.milestonedetails[i - 1].projectMilestoneId) {

            // alert(this.milestonedetails[i-1].projectMilestoneId);
            break;
          }

        }


      }

      // for(var i=1;i<=this.selected.length;i++){
      //   console.log(this.interestcount)
      //   console.log(this.selected[(i-1)].totalPenalityAmount)

      //   this.interestcount = parseInt(this.interestcount) + parseInt(this.selected[(i-1)].totalPenalityAmount);
      // }

      if (this.interestcount <= 0) {
        swal("Interest amount should be greater than 0")
        return false;
      }
      // alert(this.interestcount)

    } else {

      if (this.ActionURL == undefined || this.ActionURL == null || this.ActionURL == "null" || this.ActionURL == "undefined") {
        swal("Please select atleast one radio button");
        return false;
      }


      this.btnstatus = "true"
    }


    this.financialProjectMileStoneRequests = [];
    for (var i = 0; i < this.selected.length; i++) {
      console.log(this.selected[i].mileStoneDate)
      if(this.selected[i].mileStoneDate == null || this.selected[i].mileStoneDate == 0){
          this.temp_milestoneDAte = this.selected[i].demandNoteDate;
      }else{
        this.temp_milestoneDAte = this.selected[i].mileStoneDate;
      }
      this.financialProjectMileStoneRequests.push({
        "projectMilestoneId": this.selected[i].projectMilestoneId,
        "milestoneName": this.selected[i].mileStoneName,
        "finMilestoneClassifidesId": this.selected[i].finMilestoneClassifidesId,
        "percentagesId": this.selected[i].percentageId,
        "mileStonePercentage": this.selected[i].paymentPercentageInMileStone,
        "milestoneDate": new Date(this.temp_milestoneDAte).getTime(),
        "mileStoneDueDate": new Date(this.selected[i].dueDate).getTime(),
        "mileStoneNo": this.selected[i].milStoneNo,
        "demandNoteDate": new Date(this.selected[i].demandNoteDate).getTime(),
      })
    }

    if (value == "Generate") {

    } else if (value == 'Interest_Letter') {
      this.financialProjectMileStoneRequests.push(
        {
          "projectMilestoneId": 0,
          "milestoneName": "Dummy MileStone for Regenerate Demand Note",
          "finMilestoneClassifidesId": "1",
          "percentagesId": 1,
          "mileStonePercentage": 12,
          "milestoneDate": Date.now(),
          "mileStoneDueDate": Date.now(),
          "mileStoneNo": 0,

        }
      )
    } else {
      this.financialProjectMileStoneRequests.push(
        {
          "projectMilestoneId": 0,
          "milestoneName": "Dummy MileStone for Regenerate Demand Note",
          "finMilestoneClassifidesId": "1",
          "percentagesId": 1,
          "mileStonePercentage": 12,
          "milestoneDate": Date.now(),
          "mileStoneDueDate": Date.now(),
          "mileStoneNo": 0
        }
      )
    }


    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/generateDemandNote.spring";
console.log(url)
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    //this.demandnotedate = this.selected[this.selected.length-1].demandNoteDate;
    var body;
    if (value == "Generate") {
      body = {
        "sessionKey": sessionStorage.getItem("login_sessionkey"),
        "finMilestoneClassifidesId": this.selected[0].finMilestoneClassifidesId,
        "siteId": selected_projectid,
        "siteName": site_name,
        // "demandNoteDate": this.demandnotedate,
        "isInterestOrWithOutInterest": interestval,
        "condition": "sendEmails",
        "isNewCustomer": "false",
        "demandNoteSelectionType": "Send Single/Multiple",
        "isReGenerateDemandNote": this.btnstatus,
        "isShowGstInPDF": "true",
        "flatIds": [this.flatId_Id],
        "financialProjectMileStoneRequests": this.financialProjectMileStoneRequests,
        "requestUrl": "ViewCustomerData",
        "actionUrl": "First_Disbursement_Demandnote"
      }
    } else if (value == 'Interest_Letter') {
      body = {
        "sessionKey": sessionStorage.getItem("login_sessionkey"),
        "finMilestoneClassifidesId": this.selected[0].finMilestoneClassifidesId,
        "siteId": selected_projectid,
        "siteName": site_name,
        "isInterestOrWithOutInterest": 'With Interest',
        "condition": "sendEmails",
        "isNewCustomer": "false",
        "demandNoteSelectionType": "Send Single/Multiple",
        "isReGenerateDemandNote": "true",
        "isShowGstInPDF": "true",
        "flatIds": [this.flatId_Id],
        "financialProjectMileStoneRequests": this.financialProjectMileStoneRequests,
        "requestUrl": "ViewCustomerData",
        "actionUrl": "Interest_Letter"
      }
    } else {
      body = {
        "sessionKey": sessionStorage.getItem("login_sessionkey"),
        "finMilestoneClassifidesId": this.selected[0].finMilestoneClassifidesId,
        "siteId": selected_projectid,
        "siteName": site_name,
        // "demandNoteDate": this.demandnotedate,
        "isInterestOrWithOutInterest": interestval,
        "condition": "sendEmails",
        "isNewCustomer": "false",
        "demandNoteSelectionType": "Send Single/Multiple",
        "isReGenerateDemandNote": this.btnstatus,
        "isShowGstInPDF": "true",
        "flatIds": [this.flatId_Id],
        "financialProjectMileStoneRequests": this.financialProjectMileStoneRequests,
        "requestUrl": "ViewCustomerData",
        "actionUrl": this.ActionURL
      }
    }


       console.log("-----"+JSON.stringify(body))

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();

      //this.Blocklinks =  resp;
      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        if (value == 'Interest_Letter') {
          this.interestcount = 0;
          swal("Interest letter has been created");
        } else {

          swal("Demand note has been created");

          $('#imagemodal').modal('hide');
          $('#checkbox1').prop('checked', false);
          $('#checkbox2').prop('checked', false);
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


  Save(value) {

    //  alert(value)
    if (value == "Generate") {
      this.btnstatus = "false"
      if (this.selected.length == 0) {
        swal("Please select atleast one milestone");
        return false;
      }
    } else {

      if (this.ActionURL == undefined || this.ActionURL == null || this.ActionURL == "null" || this.ActionURL == "undefined") {
        swal("Please select atleast one radio button");
        return false;
      }


      this.btnstatus = "true"
    }

    this.financialProjectMileStoneRequests = [];



    for (var i = 0; i < this.selected.length; i++) {
      this.financialProjectMileStoneRequests.push({
        "projectMilestoneId": this.selected[i].projectMilestoneId,
        "milestoneName": this.selected[i].mileStoneName,
        "finMilestoneClassifidesId": this.selected[i].finMilestoneClassifidesId,
        "percentagesId": this.selected[i].percentageId,
        "mileStonePercentage": this.selected[i].paymentPercentageInMileStone,
        "milestoneDate": new Date(this.selected[i].mileStoneDate).getTime(),
        "mileStoneDueDate": new Date(this.selected[i].dueDate).getTime(),
        "mileStoneNo": this.selected[i].milStoneNo,
        "demandNoteDate": new Date(this.selected[i].demandNoteDate).getTime(),
      })
    }

    if (value == "Generate") {

    } else {
      this.financialProjectMileStoneRequests.push(
        {
          "projectMilestoneId": 0,
          "milestoneName": "Dummy MileStone for Regenerate Demand Note",
          "finMilestoneClassifidesId": "1",
          "percentagesId": 1,
          "mileStonePercentage": 12,
          "milestoneDate": Date.now(),
          "mileStoneDueDate": Date.now(),
          "mileStoneNo": 0,

        }
      )
    }

    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/generatedDemandNotePreview.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    // this.demandnotedate = this.selected[this.selected.length-1].demandNoteDate;
    var body;
    if (value == "Generate") {
      body = {
        "sessionKey": sessionStorage.getItem("login_sessionkey"),
        "finMilestoneClassifidesId": this.selected[0].finMilestoneClassifidesId,
        "siteIds": [selected_projectid],
        "siteName": site_name,
        "isInterestOrWithOutInterest": interestval,
        "condition": "sendEmails",
        "isNewCustomer": "false",
        "demandNoteSelectionType": "Send Single/Multiple",
        "isReGenerateDemandNote": this.btnstatus,
        "isShowGstInPDF": "true",
        "flatIds": [this.flatId_Id],
        "financialProjectMileStoneRequests": this.financialProjectMileStoneRequests,
        "requestUrl": "ViewCustomerData",
        "actionUrl": "First_Disbursement_Demandnote"
      }
    } else {
      body = {
        "sessionKey": sessionStorage.getItem("login_sessionkey"),
        "finMilestoneClassifidesId": this.selected[0].finMilestoneClassifidesId,
        "siteIds": [selected_projectid],
        "siteName": site_name,
        "isInterestOrWithOutInterest": interestval,
        "condition": "sendEmails",
        "isNewCustomer": "false",
        "demandNoteSelectionType": "Send Single/Multiple",
        "isReGenerateDemandNote": this.btnstatus,
        "isShowGstInPDF": "true",
        "flatIds": [this.flatId_Id],
        "financialProjectMileStoneRequests": this.financialProjectMileStoneRequests,
        "requestUrl": "ViewCustomerData",
        "actionUrl": this.ActionURL
      }
    }

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();

      //this.Blocklinks =  resp;
      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        //swal(" please set your path.File will be save your local directory");

        $('#imagemodal').modal('hide');
        $('#checkbox1').prop('checked', false);
        $('#checkbox2').prop('checked', false);

        window.open(resp.responseObjList[0].url, '_blank');

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

  /*----------------------- get Customer Ledger Functionality Start--------------------*/
  getDetails() {

        if((this.deptid == 993 && this.roleid == 8) || (this.deptid == 988 && this.roleid == 15)){
          $(function(){
            $("#onlymisshowing").show()
          })
        }else{
          $(function(){
            $("#onlymisshowing").hide()
           
              })
        }

    // $(function(){
    //   $("#hideshowcontent").show();
    // })

    // return false;
    this.selected = [];
    sessionStorage.removeItem("Request_for_interest_waiver");

    if ($('#projectID').val() == 'select' || $('#projectID').val() == null) {
      swal("Please select project");
      return false;
    }

    // alert($('#flatSelection').val())
    // alert(this.employeeIds)
    if ($('#flatSelection').val() == 'select' && this.employeeIds == undefined || $('#flatSelection').val() == null && this.employeeIds == undefined) {
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
    //alert(this.btndhideshoe)
    // if(this.btndhideshoe == "active"){
    //   $(function(){
    //     $("#gdn").hide()
    //     $("#gdnp").hide()
    //     $("#rgdn").hide()
    //     $("#rgdnp").hide()
    //     $("#gil").hide()
    //     $("#vib").hide()
    //   })
    // }

    //alert(temp2_forhideingbuttons)
    
    if (this.statusName == "active") {
      $("#activstate").show()
      $("#pendingstate").hide()
      $("#Cancelbutnotrefund").hide()
      $("#totaldiv_update").show()
    } else if (this.statusName == "pending") {
      // alert(self.statusName)
      $("#activstate").hide()
      $("#pendingstate").show()
      $("#Cancelbutnotrefund").hide()
      $("#totaldiv_update").show()
    } else if (this.statusName == "Cancelled Not Refunded") {
      $("#activstate").hide()
      $("#pendingstate").hide()
      $("#Cancelbutnotrefund").show()
      $("#totaldiv_update").show()
    } else {
      $("#totaldiv_update").hide()
    }
    // if(this.statusId == 6){

    // }else{
    //   $(function(){
    //     $("#gdn").hide()
    //         $("#gdnp").hide()
    //         $("#rgdn").hide()
    //         $("#rgdnp").hide()
    //         $("#gil").hide()
    //         $("#vib").hide()
    //   })
    // }
    if(this.controller_stat != undefined){
      temp2_forhideingbuttons = this.controller_stat;
     }
    $(function () {
      //  alert(temp2_forhideingbuttons)
      if (temp2_forhideingbuttons == 6) {
        $("#gdn").show()
        $("#gdnp").show()
        $("#rgdn").show()
        $("#rgdnp").show()
        $("#gil").show()
        $("#vib").show()
        $("#edit").show()
        $("#costBreakdocument").show()   
        $("#SendWelcomemail").show()
        $("#request_interest").show()

      } else {
        $("#gdn").hide()
        $("#gdnp").hide()
        $("#rgdn").hide()
        $("#rgdnp").hide()
        $("#gil").hide()
        $("#vib").hide()
        $("#edit").hide()
        $("#costBreakdocument").hide()
        $("#SendWelcomemail").hide()
        $("#request_interest").hide()
      }
    })

    this.getCustomerAndCoAppDetails();

    $("#hideshowcontent").show();


  }
  /*---------------Applicant and co-applicant details start--------*/
  getCustomerAndCoAppDetails() {
    $(function () {


      //   $(".accordion-item").removeClass('open');
      //   $(".accordion-item").addClass('close');
      $(".accordion-item-content").hide();
    })

    // return false;
    $('.page-loader-wrapper').show();


    if (this.employeeIds == undefined) {
      this.employeeIds = null
    }

    $('.page-loader-wrapper').show();
    this.ledgerData = [];
    let url = this.cmn.commonUrl + "bookingFormService/getCustomerAndCo_AppDetails.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "customerId": this.customer_Id,
      "flatBookingId": this.flatbooking_Id,
      "siteId": selected_projectid,
      "sessionKey": sessionStorage.getItem("login_sessionkey"),
      "requestUrl": "getCustomerAndCo_AppDetails",

    }


    this.http.post(url, body).map(res => res.json()).subscribe(resp => {

      //  this.custmerDetails = resp.responseObjList.FirstApplicant;
      // this.coaplicant_custmerDetails = resp.responseObjList.SecondApplicant;
      if (resp.responseCode == 200) {
        // $('.page-loader-wrapper').hide();
        this.custmerDetails = resp.responseObjList.FirstApplicant;

        console.log(this.custmerDetails);
        this.coaplicant_custmerDetails = resp.responseObjList.SecondApplicant;
        this.Noc_documentsList("");
        this.unit_details();
        this.Document_typefun();
        this.loadDemandNoteFormats();


      } else if (resp.responseCode == 440) {
        $('.page-loader-wrapper').hide();
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        $('.page-loader-wrapper').hide();
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
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
  /*---------------Applicant and co-applicant details end--------*/

  /*-------------------Milestone list start-----------------------*/
  financialDtls() {
    $('.page-loader-wrapper').show();
    $('#tableExport').DataTable().destroy();
    $('#tableExport1').DataTable().destroy();
    $('#tableExport2').DataTable().destroy();
    if (this.employeeIds == undefined) {
      this.employeeIds = null
    }

    $('.page-loader-wrapper').show();
    this.ledgerData = [];
    let url = this.cmn.commonUrl + "financial/financialDtls.spring"

    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {

      "sessionKey": sessionStorage.getItem("login_sessionkey"),
      "customerId": this.customer_Id,
      "flatId": this.flatId_Id,
      "flatBookingId": this.flatbooking_Id,
      "siteId": selected_projectid,
      "requestUrl": "ViewCustomerData"
    }

    this.http.post(url, body).map(res => res.json()).subscribe(resp => {

      if (resp.responseCode == 200) {
        //  $('.page-loader-wrapper').hide();
        this.nocbankerhide = true;
        this.milestone_alias_name = resp.finMilestonAliasName
        this.milestonedetails = resp.mileStones;
        this.financialAmtDetails = resp.financialAmtDetails;
        this.totalMilestonePaid_Amount = resp.totalMilestonePaidAmount
        this.totalMilestoneDue_Amount = resp.totalMilestoneDueAmount
        this.totalPenalty_Amount = resp.totalPenaltyAmount
        this.documentList();
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

            }).draw();

          });

        }, 2000)

        //  $('#tableExport1').DataTable()
        setTimeout(function () {
          $('#tableExport1').DataTable().destroy();
          $(document).ready(function () {
            $('#tableExport1').DataTable({
              pageLength: 10,
              lengthMenu: [[10, 20, -1], [5, 10, 20, 'Todos']],
              dom: 'Bfrltip',
              buttons: [
                'copy', 'csv', 'excel', 'pdf', 'print'
              ],
              'columnDefs': [{

                'targets': [1], /* column index */

                'orderable': false, /* true or false */

              }]


            }).draw();

          });

        }, 2000)
        setTimeout(function () {
          // $('#tableExport1').DataTable().destroy();
          $('#tableExport2').DataTable().destroy();
          $(document).ready(function () {
            $('#tableExport2').DataTable({
              pageLength: 10,
              lengthMenu: [[10, 20, -1], [5, 10, 20, 'Todos']],
              dom: 'Bfrltip',
              buttons: [
                'copy', 'csv', 'excel', 'print', {
                  extend: 'pdfHtml5',
                  orientation: 'landscape',
                  pageSize: 'LEGAL'
                }
              ],

              'columnDefs': [{

                'targets': [1], /* column index */

                'orderable': false, /* true or false */

              }]
              //   retrieve: true,
              //   "scrollY": true,
              //  // "scrollCollapse": true,
              //   "scrollX": true,
              //  // "autoWidth": false,
              //   "iCookieDuration": 60,

            }).draw();
            // $('#tableExport').DataTable({
            //   pageLength: 10,
            //   lengthMenu: [[10, 20, -1], [10, 20, 'Todos']],
            //  dom: 'Bfrltip',
            //   buttons: [
            //     'copy', 'csv', 'excel', 'pdf', 'print'
            //   ],
            //   retrieve: true,

            // }).draw();
          });

        }, 2000)
        $(function () {
          // var pendingTransDetails = resp.responseObjList.finTransactionEntryResponseList;
          milestonedetails = resp.mileStones;
          // alert(milestonedetails.length)
          for (var i = 0; i < milestonedetails.length; i++) {
            // alert(milestonedetails[i].mileStoneStatus)
            if (milestonedetails[i].mileStoneStatus == "Completed") {

              var d = new Date(milestonedetails[i].demandNoteDate);
              var d1 = new Date(milestonedetails[i].dueDate);
              //  alert(d)
              // var dateToStr = d.toUTCString().split(' ');
              var datestring = d.getFullYear() + "/" + ("0" + (d.getMonth() + 1)).slice(-2) + "/" + ("0" + d.getDate()).slice(-2);
              var datestring1 = d1.getFullYear() + "/" + ("0" + (d1.getMonth() + 1)).slice(-2) + "/" + ("0" + d1.getDate()).slice(-2);

              //  alert(datestring)
              // var date = new Date().getMonth();
              //  var minimumdate = new Date().setMonth(date - 3);
              //  var maximumdate = new Date().setMonth(date + 3);
              // alert(new Date(datestring))
              $('#demandnoteDate' + (i + 1)).bootstrapMaterialDatePicker({
                format: 'YYYY-MM-DD',
                // minDate: new Date(datestring),
                // maxDate: new Date(),
                clearButton: true,
                weekStart: 1,
                time: false
              });

              $('#dueDateDate' + (i + 1)).bootstrapMaterialDatePicker({
                format: 'YYYY-MM-DD',
                // minDate: new Date(datestring1),
                // maxDate: new Date(),
                clearButton: true,
                weekStart: 1,
                time: false
              });
            }



            // $('#chequedepositDate' + (i + 1)).bootstrapMaterialDatePicker({ weekStart: 0, time: false }).on('change', function (e, date) {

            // });


            // $('#chequeHandoverDate' + (i + 1)).bootstrapMaterialDatePicker({ weekStart: 0, time: false }).on('change', function (e, date) {

            // });

          }

        });
        this.receipt_details()
        this.modification_details()
        //   this.loaderhideme = false;
        //  // this.auto.clear();
        //   $("#projectID option[value]").remove();
        //   $("#BlockId option[value]").remove();
        //   $("#floorSelection option[value]").remove();
        //   $("#flatSelection option[value]").remove();

        //   $('#fromDate').val("");
        //   $('#toDate').val("");

        //   this.siteList();
        //   if (this.ledgerData == 0) {
        //     swal('No Data Available');
        //   }

      } else if (resp.responseCode == 440) {
        $('.page-loader-wrapper').hide();
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        $('.page-loader-wrapper').hide();
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
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

  financialDtls1() {
    // $('.page-loader-wrapper').show();
    $('#tableExport').DataTable().destroy();
    $('#tableExport1').DataTable().destroy();
    $('#tableExport2').DataTable().destroy();
    if (this.employeeIds == undefined) {
      this.employeeIds = null
    }

    $('.page-loader-wrapper').show();
    this.ledgerData = [];
    let url = this.cmn.commonUrl + "financial/financialDtls.spring"


    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {

      "sessionKey": sessionStorage.getItem("login_sessionkey"),
      "customerId": this.customer_Id,
      "flatId": this.flatId_Id,
      "flatBookingId": this.flatbooking_Id,
      "siteId": selected_projectid,
      "requestUrl": "ViewCustomerData"
    }

    this.http.post(url, body).map(res => res.json()).subscribe(resp => {

      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        this.nocbankerhide = true;
        this.milestonedetails = resp.mileStones;
        this.financialAmtDetails = resp.financialAmtDetails;
        this.totalMilestonePaid_Amount = resp.totalMilestonePaidAmount
        this.totalMilestoneDue_Amount = resp.totalMilestoneDueAmount
        this.totalPenalty_Amount = resp.totalPenaltyAmount

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

              // retrieve: true,
              // "scrollY": true,
              // "scrollCollapse": true,
              // "scrollX": true,
              // "autoWidth": false,
              // "iCookieDuration": 60,

            }).draw();

          });

        }, 2000)

        //  $('#tableExport1').DataTable()
        setTimeout(function () {

          $(document).ready(function () {
            $('#tableExport1').DataTable({
              pageLength: 10,
              lengthMenu: [[10, 20, -1], [5, 10, 20, 'Todos']],
              dom: 'Bfrltip',
              buttons: [
                'copy', 'csv', 'excel', 'print', {
                  extend: 'pdfHtml5',
                  orientation: 'landscape',
                  pageSize: 'LEGAL'
                }
              ],

              'columnDefs': [{

                'targets': [1], /* column index */

                'orderable': false, /* true or false */

              }]
              //   retrieve: true,
              //   "scrollY": true,
              //  // "scrollCollapse": true,
              //   "scrollX": true,
              //  // "autoWidth": false,
              //   "iCookieDuration": 60,

            }).draw();

          });

        }, 2000)
        setTimeout(function () {

          $(document).ready(function () {
            $('#tableExport2').DataTable({
              pageLength: 10,
              lengthMenu: [[10, 20, -1], [5, 10, 20, 'Todos']],
              dom: 'Bfrltip',
              buttons: [
                'copy', 'csv', 'excel', 'print', {
                  extend: 'pdfHtml5',
                  orientation: 'landscape',
                  pageSize: 'LEGAL'
                }
              ],

              'columnDefs': [{

                'targets': [1], /* column index */

                'orderable': false, /* true or false */

              }]
              //   retrieve: true,
              //   "scrollY": true,
              //  // "scrollCollapse": true,
              //   "scrollX": true,
              //  // "autoWidth": false,
              //   "iCookieDuration": 60,

            }).draw();
            // $('#tableExport').DataTable({
            //   pageLength: 10,
            //   lengthMenu: [[10, 20, -1], [10, 20, 'Todos']],
            //  dom: 'Bfrltip',
            //   buttons: [
            //     'copy', 'csv', 'excel', 'pdf', 'print'
            //   ],
            //   retrieve: true,

            // }).draw();
          });

        }, 2000)
        $(function () {
          // var pendingTransDetails = resp.responseObjList.finTransactionEntryResponseList;
          milestonedetails = resp.mileStones;
          // alert(milestonedetails.length)
          for (var i = 0; i < milestonedetails.length; i++) {
            // alert(milestonedetails[i].mileStoneStatus)
            if (milestonedetails[i].mileStoneStatus == "Completed") {

              var d = new Date(milestonedetails[i].demandNoteDate);
              var d1 = new Date(milestonedetails[i].dueDate);
              //  alert(d)
              // var dateToStr = d.toUTCString().split(' ');
              var datestring = d.getFullYear() + "/" + ("0" + (d.getMonth() + 1)).slice(-2) + "/" + ("0" + d.getDate()).slice(-2);
              var datestring1 = d1.getFullYear() + "/" + ("0" + (d1.getMonth() + 1)).slice(-2) + "/" + ("0" + d1.getDate()).slice(-2);

              //  alert(datestring)
              // var date = new Date().getMonth();
              //  var minimumdate = new Date().setMonth(date - 3);
              //  var maximumdate = new Date().setMonth(date + 3);
              // alert(new Date(datestring))
              $('#demandnoteDate' + (i + 1)).bootstrapMaterialDatePicker({
                format: 'YYYY-MM-DD',
                // minDate: new Date(datestring),
                // maxDate: new Date(),
                clearButton: true,
                weekStart: 1,
                time: false
              });

              $('#dueDateDate' + (i + 1)).bootstrapMaterialDatePicker({
                format: 'YYYY-MM-DD',
                //  minDate: new Date(datestring1),
                //  maxDate: new Date(),
                clearButton: true,
                weekStart: 1,
                time: false
              });
            }



            // $('#chequedepositDate' + (i + 1)).bootstrapMaterialDatePicker({ weekStart: 0, time: false }).on('change', function (e, date) {

            // });


            // $('#chequeHandoverDate' + (i + 1)).bootstrapMaterialDatePicker({ weekStart: 0, time: false }).on('change', function (e, date) {

            // });

          }

        });
        // this.receipt_details()
        //   this.loaderhideme = false;
        //  // this.auto.clear();
        //   $("#projectID option[value]").remove();
        //   $("#BlockId option[value]").remove();
        //   $("#floorSelection option[value]").remove();
        //   $("#flatSelection option[value]").remove();

        //   $('#fromDate').val("");
        //   $('#toDate').val("");

        //   this.siteList();
        //   if (this.ledgerData == 0) {
        //     swal('No Data Available');
        //   }

      } else if (resp.responseCode == 440) {
        $('.page-loader-wrapper').hide();
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        $('.page-loader-wrapper').hide();
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
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
  /*-------------------Milestone list end-----------------------*/
  /*---------------------Unit Details start -----------------*/
  unit_details() {
    $('.page-loader-wrapper').show();


    if (this.employeeIds == undefined) {
      this.employeeIds = null
    }

    $('.page-loader-wrapper').show();
    this.ledgerData = [];
    let url = this.cmn.commonUrl + "bookingFormService/getUnitDetails.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "customerId": this.customer_Id,
      "flatBookingId": this.flatbooking_Id,
      "siteId": selected_projectid,
      "sessionKey": sessionStorage.getItem("login_sessionkey"),
      "requestUrl": "getUnitDetails",

    }


    this.http.post(url, body).map(res => res.json()).subscribe(resp => {


      if (resp.responseCode == 200) {
        // $('.page-loader-wrapper').hide();
        this.Unit_Details = resp.responseObjList.UnitDetails;
        console.log("this.Unit_Details :" + JSON.stringify(this.Unit_Details))
        //this.registration_details()

        this.financialDtls();

        // alert(this.flatInfo)
        //  this.coaplicant_custmerDetails = resp.coApplicentDetails;
        //  alert( this.custmerDetails);

      } else if (resp.responseCode == 440) {
        $('.page-loader-wrapper').hide();
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        $('.page-loader-wrapper').hide();
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
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
  /*---------------------Unit Details end -----------------*/

  /*---------------------Registration Details start -----------------*/
  registration_details() {
    $(".accordion-item-content").show();
    this.count4++;
    if (this.count4 == 1) {
      $('.page-loader-wrapper').show();


      if (this.employeeIds == undefined) {
        this.employeeIds = null
      }

      $('.page-loader-wrapper').show();
      this.ledgerData = [];
      let url = this.cmn.commonUrl + "bookingFormService/getRegistrationDetails.spring";
      //  http://106.51.38.64:8888/SumadhuraGateway/employeeservice/bookingFormService/getRegistrationDetails.spring

      let headers = new Headers({ 'Content-Type': 'application/json' });
      var body = {
        "customerId": this.customer_Id,
        "flatBookingId": this.flatbooking_Id,
        //"siteId": $('#projectID').val(),
        "sessionKey": sessionStorage.getItem("login_sessionkey"),
        "requestUrl": "getRegistrationDetails",

      }


      this.http.post(url, body).map(res => res.json()).subscribe(resp => {

        console.log(resp);
        if (resp.responseCode == 200) {
          $('.page-loader-wrapper').hide();
          this.registrationDetails = resp.responseObjList;
          this.sale_DeedNo = resp.responseObjList[0].saleDeedNo;

          this.sale_DeedDate = resp.responseObjList[0].saleDeedDate;
          this.sale_DeedValue = resp.responseObjList[0].saleDeedValue;
          this.registration_Status = resp.responseObjList[0].registrationStatus;
          this.saleDeed_CDno = resp.responseObjList[0].saleDeedCDno;
          ;
          // alert(this.flatInfo)
          //  this.coaplicant_custmerDetails = resp.coApplicentDetails;
          //  alert( this.custmerDetails);

        } else if (resp.responseCode == 440) {
          $('.page-loader-wrapper').hide();
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        } else {
          $('.page-loader-wrapper').hide();
          $('.page-loader-wrapper').hide();
          swal(resp.errors[0]);
          return false;
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
  }
  /*---------------------Registration Details end -----------------*/


  /*---------------------Receipt Details start -----------------*/
  receipt_details() {
    $('#tablereceiptdetails').DataTable().destroy();

    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/viewMisPendingTransactions.spring"

    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {


      "sessionKey": sessionStorage.getItem("login_sessionkey"),
      "condition": "ViewCustomerData",
      "siteIds": [selected_projectid],
      "bookingFormId": this.flatbooking_Id,

    }

      console.log(JSON.stringify(body))
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      console.log(JSON.stringify(resp))
      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        this.nocbankerhide = true;
        this.receiptDetailsdata = resp.responseObjList.finTransactionEntryResponseList;
        setTimeout(function () {
          $(document).ready(function () {
            $('#tablereceiptdetails').DataTable({
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

            }).draw();
            // $('#tableExport').DataTable({
            //   pageLength: 10,
            //   lengthMenu: [[10, 20, -1], [10, 20, 'Todos']],
            //  dom: 'Bfrltip',
            //   buttons: [
            //     'copy', 'csv', 'excel', 'pdf', 'print'
            //   ],
            //   retrieve: true,

            // }).draw();
          });

        }, 2000)

        // $('#projectID').val(['select']);
        // $('#projectID').trigger('change');

        // $('#BlockId').val(['select']);
        // $('#BlockId').trigger('change');

        // $('#floorSelection').val(['select']);
        // $('#floorSelection').trigger('change');

        // $('#flatSelection').val(['select']);
        // $('#flatSelection').trigger('change');
        // this.autocompleteform = this.formBuilder.group({
        //   employeename: ['']
        // });
        // this.employeeIds = undefined;
      } else if (resp.responseCode == 800) {
        // swal(resp.description);
        this.receiptDetailsdata = resp.responseObjList;
      } else if (resp.responseCode == 440) {
        $('.page-loader-wrapper').hide();
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        $('.page-loader-wrapper').hide();
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
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
  /*---------------------Receipt Details end -----------------*/
    /*---------------------Receipt Details start -----------------*/
    modification_details() {
      $('#tablemodificationdetails').DataTable().destroy();
  
      $('.page-loader-wrapper').show();
      let url = this.cmn.commonUrl + "financial/getModificationCostDetailsList.spring"
    //  http://localhost:8888/SumadhuraGateway/employeeservice/financial/getModificationCostDetailsList.spring
  
      let headers = new Headers({ 'Content-Type': 'application/json' });
      var body = {
  
        "sessionKey": sessionStorage.getItem("login_sessionkey"),
        "bookingFormId": this.flatbooking_Id,
  
      }
  
        console.log(JSON.stringify("modification body :"+JSON.stringify(body)))
      this.http.post(url, body).map(res => res.json()).subscribe(resp => {
        console.log(JSON.stringify("modification resp :"+JSON.stringify(resp)))
        if (resp.responseCode == 200) {
          $('.page-loader-wrapper').hide();
          
          this.modificationDetailsdata = resp.responseObjList;
          setTimeout(function () {
            $(document).ready(function () {
              $('#tablemodificationdetails').DataTable({
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
  
              }).draw();
              // $('#tableExport').DataTable({
              //   pageLength: 10,
              //   lengthMenu: [[10, 20, -1], [10, 20, 'Todos']],
              //  dom: 'Bfrltip',
              //   buttons: [
              //     'copy', 'csv', 'excel', 'pdf', 'print'
              //   ],
              //   retrieve: true,
  
              // }).draw();
            });
  
          }, 2000)
  
          // $('#projectID').val(['select']);
          // $('#projectID').trigger('change');
  
          // $('#BlockId').val(['select']);
          // $('#BlockId').trigger('change');
  
          // $('#floorSelection').val(['select']);
          // $('#floorSelection').trigger('change');
  
          // $('#flatSelection').val(['select']);
          // $('#flatSelection').trigger('change');
          // this.autocompleteform = this.formBuilder.group({
          //   employeename: ['']
          // });
          // this.employeeIds = undefined;
        } else if (resp.responseCode == 800) {
          // swal(resp.description);
          this.receiptDetailsdata = resp.responseObjList;
        } else if (resp.responseCode == 440) {
          $('.page-loader-wrapper').hide();
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        } else {
          $('.page-loader-wrapper').hide();
          $('.page-loader-wrapper').hide();
          swal(resp.errors[0]);
          return false;
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
    /*---------------------Receipt Details end -----------------*/
  // check if the item are selected
  checked(item) {
    if (this.selected.indexOf(item) != -1) {
      return true;
    }
  }

  // when checkbox change, add/remove the item from the array
  onChange(event, checked, item) {
    this.temp = event.target.id.split("tablerowdata")[1];


    if (checked) {
      this.selected.push(item);

      this.selected_waiver_status.push(
        {
          "msStatusid": item.msStatusId,
          "mileStoneName": item.mileStoneName,
          "rowId": this.temp
        }
      )

    } else {

      this.selected_waiver_status.splice(this.selected_waiver_status.indexOf(item), 1)
      this.selected.splice(this.selected.indexOf(item), 1)
    }

    sessionStorage.setItem("Request_for_interest_waiver", JSON.stringify(this.selected));
  }

  onChange_edit(event, checked, item) {
    this.temp = event.target.id.split("tablerowdata")[1];

    if (checked) {
      this.selected1.push({
        "projectMilestoneId": item.projectMilestoneId,
        "milestoneName": item.mileStoneName,
        "finMilestoneClassifidesId": item.finMilestoneClassifidesId,
        "mileStonePercentage": item.paymentPercentageInMileStone,
        "milestoneDate": item.mileStoneDate,
        "mileStoneDueDate": item.dueDate,
        "mileStoneNo": item.milStoneNo,
        "demandNoteDate": item.demandNoteDate,
        "rowId": this.temp
      });
      // this.selected1.rowId = this.temp;
    } else {
      $('#demandnoteDate' + this.temp).val("");
      $('#dueDateDate' + this.temp).val("");
      this.selected1.splice(this.selected1.indexOf(item), 1)
    }

  }


  onChange_edit_generate(event, checked, item) {
    this.temp = event.target.id.split("tablerowdata")[1];

    if (checked) {
      this.selected2.push({
        "projectMilestoneId": item.projectMilestoneId,
        "milestoneName": item.mileStoneName,
        "finMilestoneClassifidesId": item.finMilestoneClassifidesId,
        "percentagesId": item.percentageId,
        "mileStonePercentage": item.paymentPercentageInMileStone,
        "milestoneDate": item.mileStoneDate,
        "mileStoneDueDate": item.dueDate,
        "mileStoneNo": item.milStoneNo,
        "demandNoteDate": item.demandNoteDate,
        "rowId": this.temp
      });
      // this.selected1.rowId = this.temp;
    } else {
      $('#demandnoteDate' + this.temp).val("");
      $('#dueDateDate' + this.temp).val("");
      this.selected2.splice(this.selected2.indexOf(item), 1)
    }

  }

  /*--------------------click on milestone Amount start-----------------*/
  generateRecetitformilestone(paymntscheduleId) {


    $('.page-loader-wrapper').show();
    $('#tablereceiptdetails_modalpop').DataTable().destroy();
    let url = this.cmn.commonUrl3 + "financial/paymentDtls.spring"

    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {

      "customerId": this.customer_Id,
      "flatId": this.flatId_Id,
      "flatBookingId": this.flatbooking_Id,
      "paymentScheduleId": paymntscheduleId,
      "siteId": selected_projectid,
      "requestUrl": "ViewCustomerData"
    }


    this.http.post(url, body).map(res => res.json()).subscribe(resp => {

      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        this.paymentdetailsList = resp.paymentDetailsList;
        console.log(this.paymentdetailsList);

        setTimeout(function () {
          $(document).ready(function () {
            $('#tablereceiptdetails_modalpop').DataTable({
              pageLength: 5,
              lengthMenu: [[10, 20, -1], [10, 20, 'Todos']],
              dom: 'Bfrltip',
              buttons: [
                'copy', 'csv', 'excel', 'print', {
                  extend: 'pdfHtml5',
                  orientation: 'landscape',
                  pageSize: 'LEGAL'
                }
              ],

              retrieve: true,

            }).draw();
            // $('#tableExport').DataTable({
            //   pageLength: 10,
            //   lengthMenu: [[10, 20, -1], [10, 20, 'Todos']],
            //   dom: 'Bfrltip',
            //   buttons: [
            //     'copy', 'csv', 'excel', 'pdf', 'print'
            //   ],
            //   retrieve: true,

            // }).draw();
          });

        }, 2000)
        $("#paymentdetails").modal();
        //alert("success")
      } else if (resp.responseCode == 800) {
        // swal(resp.description);
        this.receiptDetailsdata = resp.responseObjList;
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
        $('.page-loader-wrapper').hide();
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }
  /*--------------------click on milestone Amount end-----------------*/

  paymentdetailspdf(link) {
    window.open(link)
  }

  attachmentlink(link) {
    window.open(link);
  }
  onClearSearch(item) {

    if (item == undefined) {
      this.employeeIds = undefined;
    }
  }

  homeClick() {
    this.cmn.commonHomeNavigation();
  }
  attachmentlink_receiptdetails(item) {
    for (var i = 0; i < item.length; i++) {
      window.open(item[i].location);
    }
  }
  /*----Reference Details Start--------*/

  reference_details() {
    $(".accordion-item-content").show();
    this.count++;
    if (this.count == 1) {


      $('.page-loader-wrapper').show();
      $('#tablereferencedetailsID').DataTable().destroy();
      let url = this.cmn.commonUrl + "references/referedCustomers.spring"
      // http://106.51.38.64:9999/SumadhuraGateway/employeeservice/references/referedCustomers.spring

      let headers = new Headers({ 'Content-Type': 'application/json' });
      var body = {


        "referrerName": null,
        "refrenceId": null,
        "custId": this.customer_Id,
        "customerFlatNo": null,
        "siteId": null,
        "sessionKey": sessionStorage.getItem("login_sessionkey"),

      }


      this.http.post(url, body).map(res => res.json()).subscribe(resp => {

        if (resp.responseCode == 200) {
          $('.page-loader-wrapper').hide();
          this.referFriend_Dtot = resp.responseObjList.referedCustomer;

          setTimeout(function () {
            $(document).ready(function () {
              $('#tablereferencedetailsID').DataTable({
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

              }).draw();
              // $('#tableExport').DataTable({
              //   pageLength: 10,
              //   lengthMenu: [[10, 20, -1], [10, 20, 'Todos']],
              //  dom: 'Bfrltip',
              //   buttons: [
              //     'copy', 'csv', 'excel', 'pdf', 'print'
              //   ],
              //   retrieve: true,

              // }).draw();
            });

          }, 2000)

          //alert("success")
        } else if (resp.responseCode == 800) {
          // swal(resp.description);
          this.receiptDetailsdata = resp.responseObjList;
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
          $('.page-loader-wrapper').hide();
          if (error == 440) {
            swal("Your Session has been Timed Out!", "Please login once again.", "error");
            this.router.navigate([""]);
          }
        }
      );
    } else {

    }

  }
  /*----Reference Details End--------*/


  /*----Reference Details Start--------*/
  projectNotfic_details() {
    $(".accordion-item-content").show();
    this.count1++;
    if (this.count1 == 1) {
      $('.page-loader-wrapper').show();
      $('#table_projectnotifictionID').DataTable().destroy();
      let url = this.cmn.commonUrl + "notification/sitesNotifys.spring"
      //http://106.51.38.64:9999/SumadhuraGateway/employeeservice/notification/sitesNotifys.spring

      let headers = new Headers({ 'Content-Type': 'application/json' });
      var body = {

        "sessionKey": sessionStorage.getItem("login_sessionkey"),
        "flatId": this.flatId_Id,
        "requestUrl": "Specific"
      }


      this.http.post(url, body).map(res => res.json()).subscribe(resp => {

        if (resp.responseCode == 200) {
          $('.page-loader-wrapper').hide();
          this.notification_Responses = resp.responseObjList.siteLevelNotifyResponseDto;

          setTimeout(function () {
            $(document).ready(function () {
              $('#table_projectnotifictionID').DataTable({
                pageLength: 5,
                lengthMenu: [[10, 20, -1], [10, 20, 'Todos']],
                dom: 'Bfrltip',
                buttons: [
                  'copy', 'csv', 'excel', 'print', {
                    extend: 'pdfHtml5',
                    orientation: 'landscape',
                    pageSize: 'LEGAL'
                  }
                ],

                retrieve: true,

              }).draw();
              // $('#tableExport').DataTable({
              //   pageLength: 10,
              //   lengthMenu: [[10, 20, -1], [10, 20, 'Todos']],
              //    dom: 'Bfrltip',
              //   buttons: [
              //     'copy', 'csv', 'excel', 'pdf', 'print'
              //   ],
              //   retrieve: true,

              // }).draw();
            });

          }, 2000)

          //alert("success")
        } else if (resp.responseCode == 800) {
          // swal(resp.description);
          this.receiptDetailsdata = resp.responseObjList;
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
          $('.page-loader-wrapper').hide();
          if (error == 440) {
            swal("Your Session has been Timed Out!", "Please login once again.", "error");
            this.router.navigate([""]);
          }
        }
      );
    }
  }
  /*----Project Notification Details End--------*/

  /*----Employee Communication Details Start--------*/
  EmployyeeCommunication_details() {
    $(".accordion-item-content").show();
    this.count2++;
    if (this.count2 == 1) {
      $('.page-loader-wrapper').show();
      $('#table_employeeCommunicationId').DataTable().destroy();
      let url = this.cmn.commonUrl + "messenger/getCustomerMessagesList.spring"

      let headers = new Headers({ 'Content-Type': 'application/json' });
      var body = {
        "sessionKey": sessionStorage.getItem("login_sessionkey"),
        "recipientId": this.flatbooking_Id,
        "flatIds": [this.flatId_Id],
        "requestEnum": "CUSTOMER_SINGLE_PAGE"
      }

      this.http.post(url, body).map(res => res.json()).subscribe(resp => {

        if (resp.responseCode == 200) {
          $('.page-loader-wrapper').hide();
          if (resp.departmentwisemessengerDetailsPojos == '') {
            this.employeecommunication_Responses = []
          } else {
            this.employeecommunication_Responses = resp.departmentwisemessengerDetailsPojos[0].messengerDetailsPojos;
            sessionStorage.setItem("slidearrowoption", JSON.stringify(this.employeecommunication_Responses));

          }


          setTimeout(function () {
            $(document).ready(function () {
              $('#table_employeeCommunicationId').DataTable({
                pageLength: 5,
                lengthMenu: [[10, 20, -1], [10, 20, 'Todos']],
                dom: 'Bfrltip',
                buttons: [
                  'copy', 'csv', 'excel', 'print', {
                    extend: 'pdfHtml5',
                    orientation: 'landscape',
                    pageSize: 'LEGAL'
                  }
                ],

                retrieve: true,

              }).draw();
              // $('#tableExport').DataTable({
              //   pageLength: 10,
              //   lengthMenu: [[10, 20, -1], [10, 20, 'Todos']],
              //   dom: 'Bfrltip',
              //   buttons: [
              //     'copy', 'csv', 'excel', 'pdf', 'print'
              //   ],
              //   retrieve: true,

              // }).draw();
            });

          }, 2000)

          //alert("success")
        } else if (resp.responseCode == 800) {
          // swal(resp.description);
          this.receiptDetailsdata = resp.responseObjList;
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
          $('.page-loader-wrapper').hide();
          if (error == 440) {
            swal("Your Session has been Timed Out!", "Please login once again.", "error");
            this.router.navigate([""]);
          }
        }
      );
    }
  }
  /*----Employee Communication Details End--------*/

  /*----Ticket Details Start--------*/
  ticket_Details() {
    $(".accordion-item-content").show();
    this.count3++;
    if (this.count3 == 1) {
      $('.page-loader-wrapper').show();

      $('#ticketdetailsId').DataTable().destroy();
      let url = this.cmn.commonUrl + "employeeTicket/getCustomerTicketList.spring"

      let headers = new Headers({ 'Content-Type': 'application/json' });
      var body = {
        "sessionKey": sessionStorage.getItem("login_sessionkey"),
        "flatBookingId": this.flatbooking_Id,
      }


      this.http.post(url, body).map(res => res.json()).subscribe(resp => {

        if (resp.responseCode == 200) {
          $('.page-loader-wrapper').hide();
          this.ticketdetails_Id = resp.responseObjList;

          setTimeout(function () {
            $(document).ready(function () {
              $('#ticketdetailsId').DataTable({
                pageLength: 5,
                lengthMenu: [[10, 20, -1], [10, 20, 'Todos']],
                dom: 'Bfrltip',
                buttons: [
                  'copy', 'csv', 'excel', 'print', {
                    extend: 'pdfHtml5',
                    orientation: 'landscape',
                    pageSize: 'LEGAL'
                  }
                ],

                retrieve: true,

              }).draw();

            });

          }, 2000)

          //alert("success")
        } else if (resp.responseCode == 800) {
          // swal(resp.description);
          this.receiptDetailsdata = resp.responseObjList;
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
          $('.page-loader-wrapper').hide();
          if (error == 440) {
            swal("Your Session has been Timed Out!", "Please login once again.", "error");
            this.router.navigate([""]);
          }
        }
      );
    }
  }
  /*----Ticket Details End--------*/

  gotoTicketDetailspage(data) {

    sessionStorage.setItem("customeridsession", this.customer_Id)
    sessionStorage.setItem("flatbookingidsession", this.flatbooking_Id)
    sessionStorage.setItem("flatidsession", this.flatId_Id)
    sessionStorage.setItem("projectidsession", $("#projectID").val())
    //alert(site_name)
    sessionStorage.setItem("projectnamesession", site_name)

    sessionStorage.setItem("common_for_flats", "view_my_tickets");

    sessionStorage.setItem("from_Viewalltickets", "");
    this.viewticketData = JSON.stringify(data);
    // this.router.navigate(["ticket_details"], { state: this.viewticketData });
    sessionStorage.setItem("Totalticketdata", JSON.stringify(this.ticketdetails_Id));

    sessionStorage.setItem('ticketdetails_view', this.viewticketData);
    sessionStorage.setItem('buttonstutus', '');
    this.router.navigate([]).then(result => { window.open('#/ticket_details', '_blank'); });
    //window.open(window.location.href+"/ticket_details", '_blank');
    //  const url = this.router.serializeUrl(
    //   this.router.createUrlTree(['/ticket_details'])
    // );

    // window.open(url, '_blank');
    //this.router.navigate([]).then(result => {  window.open('/ticket_detail', '_blank'); });
  }


  documentsfun() {
    console.log("working data");
    $(".accordion-item-content").show();
    this.count5++;
    if (this.count5 == 1) {
      $(".accordion-item-content").hide();
    }
  }

  leadId(res) {
    sessionStorage.setItem("brundcumbClick", "true")
    sessionStorage.setItem("brundcumbClick", "true")
    sessionStorage.setItem("customeridsession", this.customer_Id)
    sessionStorage.setItem("flatbookingidsession", this.flatbooking_Id)
    sessionStorage.setItem("flatidsession", this.flatId_Id)
    sessionStorage.setItem("projectidsession", $("#projectID").val())
    // alert(site_name)
    sessionStorage.setItem("projectnamesession", site_name)
    //alert("---"+JSON.stringify(res));
    //alert(sessionStorage.setItem('response',JSON.stringify(res)))
    sessionStorage.setItem('response', JSON.stringify(res));
    sessionStorage.setItem("Totalticketdata1", JSON.stringify(this.notification_Responses));
    sessionStorage.setItem('response', JSON.stringify(res));
    //this.router.navigate(['notification_details']);
    this.router.navigate([]).then(result => { window.open('#/viewandapprovetwo', '_blank'); });



  }

  viewReferenceData(data) {
    sessionStorage.setItem("customeridsession", this.customer_Id)
    sessionStorage.setItem("flatbookingidsession", this.flatbooking_Id)
    sessionStorage.setItem("flatidsession", this.flatId_Id)
    sessionStorage.setItem("projectidsession", $("#projectID").val())
    // alert(site_name)
    sessionStorage.setItem("projectnamesession", site_name)

    sessionStorage.setItem("refferalData1", JSON.stringify(data));
    // this.router.navigate(["reference_details"]);
    this.router.navigate([]).then(result => { window.open('#/reference_details', '_blank'); });

  }
  attachmentlink1(link) {
    window.open(link);
  }

  milestoneamountreceipt(link) {
    window.open(link);
  }
  viewallcustomers(userdata, index) {
    sessionStorage.setItem("brundcumbClick", "true")
    $(".page-loader-wrapper").show();
    this.service.getmessageslist(userdata.messengerId).then(resp => {
      $(".page-loader-wrapper").hide();
      if (resp.responseCode == 200) {

        localStorage.removeItem('ChartDetails');
        localStorage.removeItem("MessagerID");
        localStorage.setItem('Customerviewchartdetails', JSON.stringify(userdata));
        sessionStorage.setItem("chartdata", JSON.stringify(resp));
        // this.router.navigateByUrl('chartview');
        this.router.navigate([]).then(result => { window.open('#/chartview', '_blank'); });

        // this.getmessagerviewlist();

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
    })

    // sessionStorage.setItem("customeridsession", this.customer_Id)
    // sessionStorage.setItem("flatbookingidsession", this.flatbooking_Id)
    // sessionStorage.setItem("flatidsession", this.flatId_Id)
    // sessionStorage.setItem("projectidsession", $("#projectID").val())
    // // alert(site_name)
    // sessionStorage.setItem("projectnamesession", site_name)
    // localStorage.removeItem('ChartDetails');
    // localStorage.removeItem("MessagerID");
    // localStorage.setItem('Customerviewchartdetails', JSON.stringify(userdata));
    // console.log(JSON.stringify(userdata))
    // sessionStorage.setItem("chartdata", JSON.stringify(this.res_p));
    // this.router.navigateByUrl('chart_view');

  }

  selectCheckBox(event, data) {



    this.ActionURL = data.FORMAT_VALUE;
    // if (this.currentlyChecked == 0) {
    //   this.ActionURL = "First_Disbursement_Demandnote";
    //   console.log(this.ActionURL);
    // } else {
    //   this.ActionURL = null;
    // }


  }

  viewInterestLetters() {

    // if (this.selected.length == 0) {
    //   swal("Please select atleast one milestone");
    //   return false;
    // }

    // for(var i=1;i<=this.selected.length;i++){
    //   console.log(this.interestcount)
    //   console.log(this.selected[(i-1)].totalPenalityAmount)

    //   this.interestcount = parseInt(this.interestcount) + parseInt(this.selected[(i-1)].totalPenalityAmount);
    // }
    // if(this.interestcount <= 0){
    // swal("Interest amount should be greater than 0")
    // return false;
    // }

    this.financialProjectMileStoneRequests = [];
    for (var i = 0; i < this.selected.length; i++) {
      this.financialProjectMileStoneRequests.push(this.selected[i].projectMilestoneId)
    }
    $('#viewinterest_modal_modalpop').DataTable().destroy();
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/viewDemandNotes.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": sessionStorage.getItem("login_sessionkey"),
      "siteIds": [selected_projectid],
      "blockIds": null,
      "flatIds": [this.flatId_Id],
      "projectMileStoneIds": null,
      "requestUrl": "Interest_Letter",
      "flatBookingId": this.flatbooking_Id,

    }




    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();


      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        this.interestcount = 0;
        this.interestletterList = resp.responseObjList.finBookingFormDemandNoteesponse;
        $('#viewinterest_modal').modal('show');
        setTimeout(function () {
          $(document).ready(function () {
            // $('#viewinterest_modal_modalpop').DataTable();
            $('#viewinterest_modal_modalpop').DataTable(
              {
                pageLength: 5,
                lengthMenu: [[10, 20, -1], [10, 20, 'Todos']],
                dom: 'Bfrltip',
                aaSorting: [[0, 'desc']],
                buttons: [
                  'copy', 'csv', 'excel', 'print', {
                    extend: 'pdfHtml5',
                    orientation: 'landscape',
                    pageSize: 'LEGAL'
                  }
                ],

                retrieve: true,

              }).draw();

          }
          );

        }, 2000)
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

  Regeneratedemandnotefun(typedata) {

    $('#checkbox1').prop('checked', false);
    $('#checkbox2').prop('checked', false);

    if (this.selected.length == 0) {
      swal("Please select atleast one milestone");
      return false;
    }

    if (typedata == "regeneratedemandnote") {
      this.hideme = true;
      this.hideme1 = false;

    } else {
      this.hideme = false;
      this.hideme1 = true;

    }

    $('#imagemodal').modal('show');

  }

  InterestBreakupfun() {
    $('#interestbreakuptableId_modal_modalpop').DataTable().destroy();
    if (this.selected.length == 0) {
      swal("Please select atleast one milestone");
      return false;
    }
    this.btnstatus = "false"
    // alert(this.interestcount)
    this.interestcount = 0
    //alert(this.milestonedetails.length)
    this.temp_selectedval = this.selected[(this.selected.length) - 1].projectMilestoneId
    for (var i = 1; i <= this.milestonedetails.length; i++) {
      if (this.milestonedetails[i - 1].mileStoneStatus == "Completed") {
        // alert(this.milestonedetails[i-1].totalPenalityAmount);
        this.interestcount = this.interestcount = parseInt(this.interestcount) + parseInt((this.milestonedetails[i - 1].totalPenalityAmount));
        if (this.temp_selectedval == this.milestonedetails[i - 1].projectMilestoneId) {

          // alert(this.milestonedetails[i-1].projectMilestoneId);
          break;
        }

      }


    }

    // for(var i=1;i<=this.selected.length;i++){
    //   console.log(this.interestcount)
    //   console.log(this.selected[(i-1)].totalPenalityAmount)

    //   this.interestcount = parseInt(this.interestcount) + parseInt(this.selected[(i-1)].totalPenalityAmount);
    // }

    if (this.interestcount <= 0) {
      swal("Interest amount should be greater than 0")
      return false;
    }
    this.financialProjectMileStoneRequests = [];
    for (var i = 0; i < this.selected.length; i++) {
      this.financialProjectMileStoneRequests.push({
        "projectMilestoneId": this.selected[i].projectMilestoneId,
        "milestoneName": this.selected[i].mileStoneName,
        "finMilestoneClassifidesId": this.selected[i].finMilestoneClassifidesId,
        "percentagesId": this.selected[i].percentageId,
        "mileStonePercentage": this.selected[i].paymentPercentageInMileStone,
        "milestoneDate": new Date(this.selected[i].mileStoneDate).getTime(),
        "mileStoneDueDate": new Date(this.selected[i].dueDate).getTime(),
        "mileStoneNo": this.selected[i].milStoneNo,
        "demandNoteDate": new Date(this.selected[i].demandNoteDate).getTime(),
      })
    }

    this.financialProjectMileStoneRequests.push(
      {
        "projectMilestoneId": 0,
        "milestoneName": "Dummy MileStone for Regenerate Demand Note",
        "finMilestoneClassifidesId": "1",
        "percentagesId": 1,
        "mileStonePercentage": 12,
        "milestoneDate": Date.now(),
        "mileStoneDueDate": Date.now(),
        "mileStoneNo": 0
      })
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/getCustomerFinancialDetails.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": sessionStorage.getItem("login_sessionkey"),
      "finMilestoneClassifidesId": this.selected[0].finMilestoneClassifidesId,
      "siteId": selected_projectid,
      "siteName": site_name,
      // "demandNoteDate": this.demandnotedate,
      "isInterestOrWithOutInterest": "With Interest",
      "condition": "sendEmails",
      "isNewCustomer": "false",
      "demandNoteSelectionType": "Send Single/Multiple",
      "isReGenerateDemandNote": "true",
      "isShowGstInPDF": "true",
      "flatIds": [this.flatId_Id],
      "financialProjectMileStoneRequests": this.financialProjectMileStoneRequests,
      "requestUrl": "CalculateCustomerInterestBreakUpData",

    }






    this.http.post(url, body).map(res => res.json()).subscribe(resp => {



      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {

        this.interest_breakuplist = resp.responseObjList;
        $('#interestbreakup_modal').modal('show');
        setTimeout(function () {
          $(document).ready(function () {
            // $('#viewinterest_modal_modalpop').DataTable();
            $('#interestbreakuptableId_modal_modalpop').DataTable(
              {
                pageLength: 10,
                lengthMenu: [[10, 20, -1], [10, 20, 'Todos']],
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
                },


              }).draw();

          }
          );

        }, 2000)
        // setTimeout(function () {
        //   $(document).ready(function () {
        //     $('#interestbreakuptableId_modal_modalpop').DataTable({
        //       pageLength: 5,
        //       lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todos']],
        //      dom: 'Bfrltip',
        //       buttons: [
        //         'copy', 'csv', 'excel', 'pdf', 'print'
        //       ],
        //       retrieve: true,
        //       "scrollY": true,
        //       "scrollCollapse": true,
        //       "scrollX": true,
        //       "autoWidth": false,
        //       "iCookieDuration": 60,

        //     }).draw();

        //   });

        // }, 2000)
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
  Consolidatedfun() {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/generateConsolidatedReceipt.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "bookingFormId": this.flatbooking_Id,
      "requestUrl": "ViewAllData"
    }
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {



      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {

        if (resp.errors == null) {
          this.consoledata = resp.responseObjList.fileInfoList[0].url;
          window.open(this.consoledata);
        } else {
          swal(resp.errors[0]);
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

  costBreakdocumentOpen() {
    $('.page-loader-wrapper').show();
    // http://144.24.96.219:8888/SumadhuraGateway/employeeservice/bookingFormService/generateCostBreakUpLetter.spring

    let url = this.cmn.commonUrl + "bookingFormService/generateCostBreakUpLetter.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteId": selected_projectid,
      "customerId": this.customer_Id,
      "flatBookingId": this.flatbooking_Id,
      "flatId": this.flatId_Id,
      "requestUrl": "generateBookingAllotmentLetter",
      "agreementType": this.documenttypevalue,
      "actionStr": "Preview"
    }
    // console.log(url);
    // console.log(JSON.stringify(body));
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {

      // console.log(JSON.stringify(resp));

      $('.page-loader-wrapper').hide();
      if (resp.responseCode === 200) {
        if (resp.errors === null) {
          // console.log(resp)
          const documentURL = resp.responseObjList.costBreakUpLetterFile[0].url;
          // console.log(documentURL)
          window.open(documentURL);
        } else {
          swal(resp.errors[0]);
        }

      }
      else if (resp.responseCode == 440) {
        $('.page-loader-wrapper').hide();
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        this.modalService.dismissAll();
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
      }
    },
      error => {
        this.loading = false;
        // $('.page-loader-wrapper').hide();
        var error = JSON.parse(error._body).responseCode;
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }

  allNonTrades(event) {
    this.selected = [];
    const checked = event.target.checked;
    if (checked == true) {
      this.milestonedetails.forEach(item => item.selected = checked);
      for (let i = 0; i < this.milestonedetails.length; i++) {
        if (this.milestonedetails[i].mileStoneStatus == "Completed") {
          this.selected.push(this.milestonedetails[i]);
        }
      }
    } else {
      this.selected = [];
      this.milestonedetails.forEach(item => item.selected = checked);
    }





  }

  allNonTrades1(event) {
    this.selected1 = [];
    const checked = event.target.checked;
    this.temp = event.target.id.split("tablerowdata")[1];
    if (checked == true) {
      this.milestonedetails.forEach(item => item.selected1 = checked);
      for (let i = 0; i < this.milestonedetails.length; i++) {
        if (this.milestonedetails[i].mileStoneStatus == "Completed") {

          this.selected1.push(
            {
              "projectMilestoneId": this.milestonedetails[i].projectMilestoneId,
              "milestoneName": this.milestonedetails[i].mileStoneName,
              "finMilestoneClassifidesId": this.milestonedetails[i].finMilestoneClassifidesId,
              "mileStonePercentage": this.milestonedetails[i].paymentPercentageInMileStone,
              "milestoneDate": this.milestonedetails[i].mileStoneDate,
              "mileStoneDueDate": this.milestonedetails[i].dueDate,
              "mileStoneNo": this.milestonedetails[i].milStoneNo,
              "demandNoteDate": this.milestonedetails[i].demandNoteDate,
              "rowId": i + 1
            }
          );

        }
      }
    } else {
      this.selected1 = [];
      this.milestonedetails.forEach(item => item.selected1 = checked);
    }





  }

  allNonTrades2(event) {
    this.selected2 = [];
    const checked = event.target.checked;
    this.temp = event.target.id.split("tablerowdata")[1];
    if (checked == true) {
      this.milestonedetails.forEach(item => item.selected2 = checked);
      for (let i = 0; i < this.milestonedetails.length; i++) {
        if (this.milestonedetails[i].mileStoneStatus == "Completed") {

          this.selected2.push(
            {
              "projectMilestoneId": this.milestonedetails[i].projectMilestoneId,
              "milestoneName": this.milestonedetails[i].mileStoneName,
              "finMilestoneClassifidesId": this.milestonedetails[i].finMilestoneClassifidesId,
              "mileStonePercentage": this.milestonedetails[i].paymentPercentageInMileStone,
              "milestoneDate": this.milestonedetails[i].mileStoneDate,
              "mileStoneDueDate": this.milestonedetails[i].dueDate,
              "mileStoneNo": this.milestonedetails[i].milStoneNo,
              "demandNoteDate": this.milestonedetails[i].demandNoteDate,
              "rowId": i + 1
            }
          );

        }
      }
    } else {
      this.selected2 = [];
      this.milestonedetails.forEach(item => item.selected2 = checked);
    }





  }
  viewintrestbreakupfun() {
    $('#imagemodal1').modal('show');
  }


  EditFunction() {
    $('#editdetails').modal('show');
  }

  Editgenerate_Function() {
    $('#editgeneratedetails').modal('show');
  }
  editSubmit() {
    if (this.selected1.length == 0) {
      swal("Please select atleast one milestone");
      return false;
    }

    this.financialProjectMileStoneRequests = [];
    for (var i = 0; i < this.selected1.length; i++) {
      //alert(this.selected1[i].rowId)
      if ($("#demandnoteDate" + this.selected1[i].rowId).val() == "") {
        swal("Please select demand date");
        return false;
      }

      if ($("#dueDateDate" + this.selected1[i].rowId).val() == "") {
        swal("Please select due date");
        return false;
      }
      debugger;
      //alert((this.selected1[i].rowId)-1);
      var prevRowNumber = parseInt(this.selected1[i].rowId) - 1;
      var nextRowNumber = parseInt(this.selected1[i].rowId) + 1;
      var currentRowNumber = parseInt(this.selected1[i].rowId);

      var prevRowDate = $("#demandnoteDate" + (prevRowNumber)).val();
      var nextRowDate = $("#demandnoteDate" + (nextRowNumber)).val();
      var currentRowDate = $("#demandnoteDate" + (currentRowNumber)).val();

      //if(prevRowDate==undefined || nextRowDate==undefined){
      //  continue;
      //} else 

      if (prevRowDate == "") {
        swal("Previous milestone demand note date should not be empty");
        return false;
      }

      if (nextRowDate == "") {
        swal("Next milestone demand note date should not be empty");
        return false;
      }
      if (new Date(prevRowDate).getTime() > new Date(currentRowDate).getTime()) {
        swal("Demand note date should not be greater than next milestone");
        return false;
      }

      if (new Date(currentRowDate).getTime() > new Date(nextRowDate).getTime()) {
        swal("Demand note date should not be greater than next milestone");
        return false;
      }


      var prevRowDate1 = $("#dueDateDate" + (prevRowNumber)).val();
      var nextRowDate1 = $("#dueDateDate" + (nextRowNumber)).val();
      var currentRowDate1 = $("#dueDateDate" + (currentRowNumber)).val();

      //if(prevRowDate==undefined || nextRowDate==undefined){
      //  continue;
      //} else 
      if (prevRowDate1 == "") {
        swal("Previous milestone due date should not be empty");
        return false;
      }

      if (nextRowDate1 == "") {
        swal("Next milestone due date should not be empty");
        return false;
      }
      if (new Date(prevRowDate1).getTime() > new Date(currentRowDate1).getTime()) {
        swal("Due date should not be greater than next milestone");
        return false;
      }

      if (new Date(currentRowDate1).getTime() > new Date(nextRowDate1).getTime()) {
        swal("Due date should not be greater than next milestone");
        return false;
      }

      if (new Date(currentRowDate).getTime() > new Date(currentRowDate1).getTime()) {
        swal("Due date should not be greater than next milestone");
        return false;
      }


      // for(var j=0;j < this.milestonedetails.length;j++){
      //   debugger;
      //   if(new Date($("#demandnoteDate" + this.selected1[i].rowId).val()).getTime() > this.milestonedetails[j].demandNoteDate){
      //     swal("Demand note date should not be greater than next milestone");
      //     return false;
      //   }

      //   if(new Date($("#dueDateDate" + this.selected1[i].rowId).val()).getTime() >  this.milestonedetails[j].dueDate){
      //     swal("Due date should not be greater than next milestone");
      //     return false;
      //   }
      // }




      // alert(this.selected1[i].rowId)
      this.financialProjectMileStoneRequests.push({
        "projectMilestoneId": this.selected1[i].projectMilestoneId,
        "milestoneName": this.selected1[i].milestoneName,
        "finMilestoneClassifidesId": this.selected1[i].finMilestoneClassifidesId,
        "mileStonePercentage": this.selected1[i].milStonePercentage,
        "milestoneDate": this.selected1[i].milestoneDate,
        "mileStoneDueDate": new Date($("#dueDateDate" + this.selected1[i].rowId).val()).getTime(),
        "mileStoneNo": this.selected1[i].mileStoneNo,
        "demandNoteDate": new Date($("#demandnoteDate" + this.selected1[i].rowId).val()).getTime(),
      })
    }
    // return false;
    this.financialProjectMileStoneRequests.push(
      {
        "projectMilestoneId": 0,
        "milestoneName": "Dummy MileStone for Regenerate Demand Note",
        "finMilestoneClassifidesId": "1",
        "percentagesId": 1,
        "mileStonePercentage": 12,
        "milestoneDate": Date.now(),
        "mileStoneDueDate": Date.now(),
        "mileStoneNo": 0,
        "demandNoteDate": Date.now(),
      }
    )




    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/editDemandNoteDetails.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    //this.demandnotedate = this.selected[this.selected.length-1].demandNoteDate;
    var body =
    {
      "sessionKey": sessionStorage.getItem("login_sessionkey"),
      "finMilestoneClassifidesId": this.selected1[0].finMilestoneClassifidesId,
      "siteId": selected_projectid,
      "siteName": site_name,
      "isInterestOrWithOutInterest": interestval,
      "demandNoteSelectionType": "Send Single/Multiple",
      "isThisUpdateDemandNote": "true",
      "flatIds": [this.flatId_Id],
      "requestUrl": "ViewCustomerData",
      "financialProjectMileStoneRequests": this.financialProjectMileStoneRequests
    }




    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();

      //this.Blocklinks =  resp;
      if (resp.responseCode == 200) {
        swal("Milestone details Updated successfully")
        $('.page-loader-wrapper').hide();
        $('#editdetails').modal('hide');
        this.selected1 = []
        this.financialDtls1();
        $(function () {
          $("#selectallid").prop("checked", false);
        })
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



  Requestforinterest() {
    debugger;
    if (this.selected.length == 0) {
      swal("Please select atleast one milestone");
      return false;
    } else {

      for (var i = 0; i < this.selected_waiver_status.length; i++) {
        if (this.selected_waiver_status[i].msStatusid == 6) {

        } else {
          swal("Demand note not generated for " + this.selected_waiver_status[i].mileStoneName + " milestone");
          return false;
        }
      }
      for (var i = 0; i < this.selected.length; i++) {





        if (this.selected[i].totalPendingPenaltyAmount != null) {
          this.interest_Amount = this.selected[i].totalPendingPenaltyAmount.replace(/\,/g, '');
        } else {
          this.interest_Amount = null;
        }


        if (this.selected[i].mileStoneAmount != null) {
          this.mileStone_Amount = this.selected[i].mileStoneAmount.replace(/\,/g, '');
        } else {
          this.mileStone_Amount = null;
        }



        //alert(Math.floor(parseFloat(this.mileStone_Amount) * 100))
        //alert(this.mileStone_Amount)

        if (Math.floor(parseFloat(this.mileStone_Amount) * 100) <= Number(0.00) || this.mileStone_Amount == null) {
          swal("Demand amount due should be more than 0");
          return false;
        }

        if (this.selected[i].milestoneAmountDue != null) {
          this.milestoneAmountDue = this.selected[i].milestoneAmountDue.replace(/\,/g, '');
        } else {
          this.milestoneAmountDue = null;
        }
        //alert(this.milestoneAmountDue)
        //alert(Math.floor(parseFloat(this.milestoneAmountDue) * 100))
        if (this.milestoneAmountDue > Number(20) || this.milestoneAmountDue == null) {
          swal("Demand amount is due should not raise the request for interest waiver ");
          return false;
        }





        if (Math.floor(parseFloat(this.interest_Amount) * 100) <= Number(0.00) || this.interest_Amount == null) {

          swal("Interest amount due should be more than zero");
          return false;
        }
        // if (this.selected[i].milestoneAmountDue <= Number(0.00) || this.selected[i].milestoneAmountDue == '-') {
        //   swal("Amount due should be more than zero");
        //   return false;
        // }
      }


      sessionStorage.setItem("Project_Id", selected_projectid);
      sessionStorage.setItem("site_nameval", site_name);
      sessionStorage.setItem("flatId_Idval", this.flatId_Id);
      sessionStorage.setItem("flatbooking_Idval", this.flatbooking_Id);

      sessionStorage.setItem("RequestforInterestwaiver", JSON.stringify(this.selected));
      this.router.navigateByUrl("requestforinterestwaiver");

    }

  }
  editGenerate_demandnote(value) {

    if (this.selected2.length == 0) {
      swal("Please select atleast one milestone");
      return false;
    }

    this.financialProjectMileStoneRequests = [];
    for (var i = 0; i < this.selected2.length; i++) {
      //alert(this.selected1[i].rowId)
      if ($("#demandnoteDate" + this.selected2[i].rowId).val() == "") {
        swal("Please select demand date");
        return false;
      }

      if ($("#dueDateDate" + this.selected2[i].rowId).val() == "") {
        swal("Please select due date");
        return false;
      }
      debugger;
      //alert((this.selected1[i].rowId)-1);
      var prevRowNumber = parseInt(this.selected2[i].rowId) - 1;
      var nextRowNumber = parseInt(this.selected2[i].rowId) + 1;
      var currentRowNumber = parseInt(this.selected2[i].rowId);

      var prevRowDate = $("#demandnoteDate" + (prevRowNumber)).val();
      var nextRowDate = $("#demandnoteDate" + (nextRowNumber)).val();
      var currentRowDate = $("#demandnoteDate" + (currentRowNumber)).val();

      //if(prevRowDate==undefined || nextRowDate==undefined){
      //  continue;
      //} else 

      if (prevRowDate == "") {
        swal("Previous milestone demand note date should not be empty");
        return false;
      }

      if (nextRowDate == "") {
        swal("Next milestone demand note date should not be empty");
        return false;
      }

      if (new Date(prevRowDate).getTime() > new Date(currentRowDate).getTime()) {
        swal("Demand note date should not be greater than next milestone");
        return false;
      }

      if (new Date(currentRowDate).getTime() > new Date(nextRowDate).getTime()) {
        swal("Demand note date should not be greater than next milestone");
        return false;
      }


      var prevRowDate1 = $("#dueDateDate" + (prevRowNumber)).val();
      var nextRowDate1 = $("#dueDateDate" + (nextRowNumber)).val();
      var currentRowDate1 = $("#dueDateDate" + (currentRowNumber)).val();

      //if(prevRowDate==undefined || nextRowDate==undefined){
      //  continue;
      //} else 
      if (prevRowDate1 == "") {
        swal("Previous milestone due date should not be empty");
        return false;
      }

      if (nextRowDate1 == "") {
        swal("Next milestone due date should not be empty");
        return false;
      }
      if (new Date(prevRowDate1).getTime() > new Date(currentRowDate1).getTime()) {
        swal("Due date should not be greater than next milestone");
        return false;
      }

      if (new Date(currentRowDate1).getTime() > new Date(nextRowDate1).getTime()) {
        swal("Due date should not be greater than next milestone");
        return false;
      }





      this.financialProjectMileStoneRequests.push({
        // "projectMilestoneId": this.selected[i].projectMilestoneId,
        // "milestoneName": this.selected[i].mileStoneName,
        // "finMilestoneClassifidesId": this.selected[i].finMilestoneClassifidesId,
        // "percentagesId": this.selected[i].percentageId,
        // "mileStonePercentage": this.selected[i].paymentPercentageInMileStone,
        // "milestoneDate": new Date(this.selected[i].mileStoneDate).getTime(),
        // "mileStoneDueDate": new Date($("#dueDateDate" + this.selected2[i].rowId).val()).getTime(),
        // "mileStoneNo": this.selected2[i].mileStoneNo,
        // "demandNoteDate":  new Date($("#demandnoteDate" + this.selected2[i].rowId).val()).getTime(),

        "projectMilestoneId": this.selected2[i].projectMilestoneId,
        "milestoneName": this.selected2[i].milestoneName,
        "finMilestoneClassifidesId": this.selected2[i].finMilestoneClassifidesId,
        "percentagesId": this.selected2[i].percentagesId,
        "mileStonePercentage": this.selected2[i].mileStonePercentage,
        "milestoneDate": this.selected2[i].milestoneDate,
        "mileStoneDueDate": new Date($("#dueDateDate" + this.selected2[i].rowId).val()).getTime(),
        "mileStoneNo": this.selected2[i].mileStoneNo,
        "demandNoteDate": new Date($("#demandnoteDate" + this.selected2[i].rowId).val()).getTime(),
      })
    }





    $('.page-loader-wrapper').show();
    let url;
    if (value == "Generate") {
      url = this.cmn.commonUrl + "financial/generateDemandNote.spring";
    } else {
      url = this.cmn.commonUrl + "financial/generatedDemandNotePreview.spring";
    }



    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    //this.demandnotedate = this.selected[this.selected.length-1].demandNoteDate;
    var body;
    if (value == "Generate") {
      body = {
        "sessionKey": sessionStorage.getItem("login_sessionkey"),
        "finMilestoneClassifidesId": this.selected2[0].finMilestoneClassifidesId,
        "siteId": selected_projectid,
        "siteName": site_name,
        // "demandNoteDate": this.demandnotedate,
        "isInterestOrWithOutInterest": interestval,
        "condition": "sendEmails",
        "isNewCustomer": "false",
        "demandNoteSelectionType": "Send Single/Multiple",
        "isReGenerateDemandNote": "false",
        "isShowGstInPDF": "true",
        "flatIds": [this.flatId_Id],
        "financialProjectMileStoneRequests": this.financialProjectMileStoneRequests,
        "requestUrl": "ViewCustomerData",
        "actionUrl": "First_Disbursement_Demandnote"
      }
    } else {
      body = {
        "sessionKey": sessionStorage.getItem("login_sessionkey"),
        "finMilestoneClassifidesId": this.selected2[0].finMilestoneClassifidesId,
        "siteIds": [selected_projectid],
        "siteName": site_name,
        "isInterestOrWithOutInterest": interestval,
        "condition": "sendEmails",
        "isNewCustomer": "false",
        "demandNoteSelectionType": "Send Single/Multiple",
        "isReGenerateDemandNote": "false",
        "isShowGstInPDF": "true",
        "flatIds": [this.flatId_Id],
        "financialProjectMileStoneRequests": this.financialProjectMileStoneRequests,
        "requestUrl": "ViewCustomerData",
        "actionUrl": "First_Disbursement_Demandnote"
      }
    }






    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      if (value == "Generate") {

      } else {

      }

      //this.Blocklinks =  resp;
      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        if (value == "Generate") {
          swal("Demand note has been updated");
          $('#editgeneratedetails').modal('hide');
          this.selected1 = []
          this.financialDtls1();
          $(function () {
            $("#selectallid").prop("checked", false);
          })
        } else {
        //  swal(" please set your path.File will be save your local directory");
          window.open(resp.responseObjList[0].url, '_blank');
        }


        // $('#imagemodal').modal('hide');
        // $('#checkbox1').prop('checked', false);
        // $('#checkbox2').prop('checked', false);



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


  sendwelcomemail(content) {
    if (this.customerRegisteredInApp == null) {
      this.democlass = false;
      this.modalService.open(content, { backdrop: 'static', size: 'lg', keyboard: false, centered: true }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.documentgetDismissReason(reason)}`;

        this.status_name = "";
        this.agreementDraftFile = [];
        this.documentpreview = true;
        this.documenttypevalue = undefined;
      });
    } else {
      swal(this.customerRegisteredInApp);
      return false;
    }
  }

  private documentgetDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }




  Document_typefun() {
    //$('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "bookingFormService/getAgreementTypesList.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteId": selected_projectid,
      "customerId": this.customer_Id,
      "flatBookingId": this.flatbooking_Id,
      "flatId": this.flatId_Id,
      "requestUrl": "ViewCustomerData",
      "actionUrl": "getAgreementTypesList"
    }



    this.http.post(url, body).map(res => res.json()).subscribe(resp => {

      console.log(resp);


      // $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {

        this.Document_Typesname = resp.responseObjList.listOfAgreementTypes;
        maincontrollerval = resp.responseObjList.listOfAgreementTypes;

        this.document_status = resp.responseObjList.showWelcomeMailButton;


        this.customerRegisteredInApp = resp.responseObjList.customerRegisteredInApp;

        if (this.document_status !== false) {
          $("#SendWelcomemail").show();
        } else {
          $("#SendWelcomemail").hide();
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
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }


  handleChange(event, data) {


    this.documenttypevalue = data.AGGREMENT_DRAFT_NAME;
  }

  document_previewfun() {

    if (maincontrollerval.length == 0) {

    } else {
      if (this.documenttypevalue == undefined || this.documenttypevalue == "undefined") {
        swal("Please select Demand draft");
        return false;
      }
    }

    if (this.documenttypevalue == undefined) {
      this.documenttypevalue = null;
    }
    // console.log(this.Document_Typesname);

    this.loading1 = true;
    // $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "bookingFormService/generateBookingWelcomeLetter.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteId": selected_projectid,
      "customerId": this.customer_Id,
      "flatBookingId": this.flatbooking_Id,
      "flatId": this.flatId_Id,
      "requestUrl": "generateBookingAllotmentLetter",
      "agreementType": this.documenttypevalue,
      "actionStr": "Preview"
    }

  console.log(url);
  console.log(JSON.stringify(body));



    this.http.post(url, body).map(res => res.json()).subscribe(resp => {

      console.log(JSON.stringify(resp));
      this.loading1 = false;
      // $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {

        this.controllerURLdata = resp.responseObjList;

        if (this.controllerURLdata.length !== 0) {
          this.democlass = true;
        } else {
          this.democlass = false;
        }

        this.agreementDraftFile = this.controllerURLdata['agreementDraftFile'];
        this.allotmentLetterFile = this.controllerURLdata['allotmentLetterFile'];
        this.costBreakUpLetterFile = this.controllerURLdata['costBreakUpLetterFile'];

        this.status_name = resp.responseObjList.customerRegisteredinApp;

        this.documentpreview = false;


      } else if (resp.description == "failure") {


        this.modalService.dismissAll();
        swal(resp.errors[0]);
        //return false;
      }
      else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        this.modalService.dismissAll();
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
      }
    },
      error => {
        this.loading = false;
        // $('.page-loader-wrapper').hide();
        var error = JSON.parse(error._body).responseCode;
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }







  document_submitfun(content) {

    if (maincontrollerval.length == 0) {

    } else {
      if (this.documenttypevalue == undefined || this.documenttypevalue == "undefined") {
        swal("Please select Demand draft");
        return false;
      }
    }

    this.modalService.open(content, { backdrop: 'static', size: 'sm', keyboard: false, centered: true, windowClass: 'my-class' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  DailogSubmit() {
    this.loading = true;

 

    if (this.documenttypevalue == undefined) {
      this.documenttypevalue = null;
    }
    // $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "bookingFormService/generateBookingWelcomeLetter.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteId": selected_projectid,
      "customerId": this.customer_Id,
      "flatBookingId": this.flatbooking_Id,
      "flatId": this.flatId_Id,
      "requestUrl": "generateBookingAllotmentLetter",
      "agreementType": this.documenttypevalue
    }

    this.http.post(url, body).map(res => res.json()).subscribe(resp => {

      this.loading = false;
      this.controller_documentlist = [];
      // $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {


        this.description_status = resp.description;
        if (resp.description == "failure") {
          $("#SendWelcomemail").show();
          swal("welcome mail send failured");
          return false;
        } else {

          this.controller_documentlist = resp.responseObjList.welcomeLetterFile;


          $("#SendWelcomemail").hide();
          this.modalService.dismissAll();
          swal("welcome mail sent successfully");
          return false;
        }

      } else if (resp.description == "failure") {
        this.modalService.dismissAll();
        swal(resp.errors[0]);
        return false;
      }
      else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        this.modalService.dismissAll();
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
      }
    },
      error => {
        this.loading = false;
        // $('.page-loader-wrapper').hide();
        var error = JSON.parse(error._body).responseCode;
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );

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


  image_preview(data) {
    window.open(data.url);
  }



  documentList() {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "bookingFormService/getCustomerFlatDocuments.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteId": selected_projectid,
      "customerId": this.customer_Id,
      "flatBookingId": this.flatbooking_Id,
      "flatId": this.flatId_Id,
      "requestUrl": "getCustomerFaltDocuments",
    }

    this.http.post(url, body).map(res => res.json()).subscribe(resp => {

      this.controller_documentlist = [];
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {


        this.controller_documentlist = resp.responseObjList;



      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        if (resp.responseObjList != null) {
          $('.page-loader-wrapper').hide();
          swal(resp.errors[0]);
          return false;
        }

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


  loadDemandNoteFormats() {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/loadDemandNoteFormats.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteId": selected_projectid,
      "siteName": site_name,
      "flatIds": [this.flatId_Id],
      "requestUrl": "ViewCustomerData",
    }


    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      this.DemandNoteFormats_controller = resp.responseObjList;

      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        //  this.viewinterestpendingdetailsfun();
      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        if (resp.responseObjList != null) {
          $('.page-loader-wrapper').hide();
          swal(resp.errors[0]);
          return false;
        }
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


  noc_details() {
    $(function () {
      $(".accordion-item-content").show();
    });

    this.count6++;
    if (this.count6 == 1) {

      $(function () {
        $(".accordion-item-content").show();
      });
      this.Noc_documentsList("data");
    } else {
      $(function () {
        $(".accordion-item-content").show();
      });


    }
  }


  Noc_documentsList(data) {

    console.log(data);




    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "bookingFormService/getNOCDocuments.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "flatBookingId": this.flatbooking_Id,
    }

    console.log(body);
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      console.log(resp);

      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        this.generate_noc_Letter = resp.responseObjList[0].nocShowStatus;
        this.controller_docNoc = resp.responseObjList;
        this.controller_NOCdocumentlist = [];
        this.previewNOCbtn = true;
        this.GenerateNOCbtn = true;
        // if (data == "data") {
        //   $(function () {
        //     $(".accordion-item-content").show();
        //   });
        // }

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
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }

  NOC_previewfun() {
    this.NOC_preview_loading = true;
    // $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "bookingFormService/generateBookingNOCLetter.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteId": selected_projectid,
      "customerId": this.customer_Id,
      "flatBookingId": this.flatbooking_Id,
      "flatId": this.flatId_Id,
      "actionStr": "Preview",
      "requestUrl": "generateBookingNOCLetter"
    }

    this.http.post(url, body).map(res => res.json()).subscribe(resp => {


      this.NOC_preview_loading = false;
      //   $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        this.previewNOCbtn = false;
        this.controller_NOCdocumentlist = resp.responseObjList.NOCLetterFile;
      } else if (resp.responseCode == 440) {
        this.NOC_preview_loading = false;
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {

        this.NOC_preview_loading = false;
        //$('.page-loader-wrapper').hide();
        //  swal(resp.errors[0]);
        //  return false;
        this.returnslotdates = [];
        for (var i = 0; i < resp.errors.length; i++) {
          this.returnslotdates.push(resp.errors[i]);
        }
        swal(this.returnslotdates.join("\r\n"))

      }
    },
      error => {
        this.NOC_preview_loading = false;
        //$('.page-loader-wrapper').hide();
        var error = JSON.parse(error._body).responseCode;
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );

  }

  generateBookingNOCLetter() {
    this.Noc_loading = true;
    // $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "bookingFormService/generateBookingNOCLetter.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteId": selected_projectid,
      "customerId": this.customer_Id,
      "flatBookingId": this.flatbooking_Id,
      "flatId": this.flatId_Id,
      "actionStr": "generate",
      "requestUrl": "generateBookingNOCLetter"
    }

    this.http.post(url, body).map(res => res.json()).subscribe(resp => {


      this.Noc_loading = false;
      //   $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        swal(resp.responseObjList.successMasg);
        this.controller_NOCdocumentlist = resp.responseObjList.NOCLetterFile;
        this.GenerateNOCbtn = false;
      } else if (resp.responseCode == 440) {
        this.Noc_loading = false;
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {

        this.Noc_loading = false;
        //$('.page-loader-wrapper').hide();
        //   swal(resp.errors[0]);
        // return false;
        this.returnslotdates = [];
        for (var i = 0; i < resp.errors.length; i++) {
          this.returnslotdates.push(resp.errors[i]);
        }
        swal(this.returnslotdates.join("\r\n"))

      }
    },
      error => {
        this.Noc_loading = false;
        //$('.page-loader-wrapper').hide();
        var error = JSON.parse(error._body).responseCode;
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }

  image_previewNOC(data) {
    window.open(data.url);
  }

  image_previewNOC_data(data) {
    window.open(data.nocURLLocation);
  }

  viewinterestpendingdetailsfun() {
    this.controller = [];
    this.controller1 = [];
    $('#tableExport1').DataTable().destroy();

    var d = new Date();

    var datestring = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();

    this.hideme = false;
    this.loading = true;
    // $('.page-loader-wrapper').show();

    let url = this.cmn.commonUrl + "financial/getInterestWaiverReportDetails.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteId": selected_projectid,
      "requestUrl": "GiveInterestWaiverReport",
      "isInterestOrWithOutInterest": "With Interest",
      "isReGenerateDemandNote": "true",
      "isShowGstInPDF": "true",
      "flatIds": [this.flatId_Id],
      "blockIds1": [

      ],
      "financialProjectMileStoneRequests": [
        {
          "projectMilestoneId": 150000,
          "milestoneName": "Dummy MileStone for Regenerate Demand Note",
          "finMilestoneClassifidesId": "1",
          "percentagesId": 1,
          "mileStonePercentage": 12,
          "milestoneDate": datestring,
          "mileStoneDueDate": datestring,
          "mileStoneNo": 0,
          "demandNoteDate": datestring,
          "interestCalculationUptoDate": datestring
        }
      ]
    }

    console.log(url);
    console.log(JSON.stringify(body));

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      console.log(resp);
      console.log(JSON.stringify(resp))
      //  this.loading = false;
      //  this.modalService.dismissAll();
      // $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {

        $('.page-loader-wrapper').hide();
        this.controller = [];
        this.controller1 = [];
        this.controller1 = resp.responseObjList.demandNoteGeneratorInfoList[0].customerDetailsList;
        console.log(this.controller1);
        if (this.controller1.length == 0) {
          this.hideme = true;
        }

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
              "scrollY": true,
              "scrollCollapse": true,
              "scrollX": true,
              "autoWidth": false,
              "iCookieDuration": 60,

            }).draw();

          });
        }, 2000)

      } else if (resp.responseCode == 440) {
        this.loading = false;
        $('.page-loader-wrapper').hide();
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);

      } else {
        this.loading = false;
        $('.page-loader-wrapper').hide();
        // swal(resp.errors[0]);
        return false;
      }
    },
      error => {
        this.loading = false;
        $('.page-loader-wrapper').hide();
        var error = JSON.parse(error._body).responseCode;
        swal(error);
        $('.page-loader-wrapper').hide();
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );







  }
  statusUpdate() {
    // alert(this.statusName)


    //  alert(this.salesforce_SiteName)
    //  alert(this.salesforce_BookingId)
    //  alert(this.statusName)
    //  alert(this.flatNumber)
    if ($('#projectID').val() == 'select' || $('#projectID').val() == null) {
      swal("Please select project");
      return false;
    }

    // alert($('#flatSelection').val())
    // alert(this.employeeIds)
    if ($('#flatSelection').val() == 'select' && this.employeeIds == undefined || $('#flatSelection').val() == null && this.employeeIds == undefined) {
      swal("Please select flat OR customer name");
      return false;
    }

    // if ($('#BlockId').val() == 'select' || $('#BlockId').val() == null) {
    //   swal("Please select block");
    //   return false;
    // }

    // if ($('#floorSelection').val() == 'select' || $('#floorSelection').val() == null) {
    //   swal("Please select floor");
    //   return false;
    // }

    // if ($('#flatSelection').val() == 'select' || $('#flatSelection').val() == null) {
    //   this.flatID = null;
    // } else {
    //   this.flatID = $('#flatSelection').val()
    // }


    if ($('#flatSelection').val() == 'select' && this.employeeIds == undefined || $('#flatSelection').val() == null && this.employeeIds == undefined) {
      swal("Please select flat OR customer name");
      return false;
    }
    if (this.statusName == "active") {
      // alert($('#statusId1').val())
      if ($('#statusId1').val() == 'select' || $('#statusId1').val() == null) {
        swal("Please select status");
        return false;
      }
      this.selectstatus = $('#statusId1').val();
      if ($('#statusComentId').val() == '') {
        swal("Please enter comments");
        return false;
      }
    } else if (this.statusName == "pending") {
      if ($('#statusId2').val() == 'select' || $('#statusId2').val() == null) {
        swal("Please select status");
        return false;
      }

      this.selectstatus = $('#statusId2').val();
      // alert(this.selectstatus)
      if ($('#statusComentId').val() == '') {
        swal("Please enter comments");
        return false;
      }
    } else if (this.statusName == "Cancelled Not Refunded") {
      if ($('#statusId3').val() == 'select' || $('#statusId3').val() == null) {
        swal("Please select status");
        return false;

      }

      if ($('#statusComentId').val() == '') {
        swal("Please enter comments");
        return false;
      }
      this.selectstatus = $('#statusId3').val();
    }
    var d = new Date();

    var datestring = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();


    //this.Unit_Details
    var temp = this.Unit_Details;
    var blockName;
    var floorName;
    for (const element of temp) {
      // ...use `element`...


      if (element.key == "Block") {
        // alert(element.value)
        blockName = element.value;
      }

      if (element.key == "Floor") {
        floorName = element.value;
      }
    }

    if (this.salesforce_BookingId == "null") {
      swal("Sales force booking id should not be null ");
      return false;
    }

    //  alert(blockName)
    //   alert(floorName)

    if (confirm("Do you want to Update the Page ?")) {
      $('.page-loader-wrapper').show();
      let url = this.cmn.commonUrl + "bookingFormService/actionBookingDetails.spring";
      //Url :- http://localhost:8181/SumadhuraGateway/employeeservice/bookingFormService/actionBookingDetails.spring

      let headers = new Headers({ 'Content-Type': 'application/json' });
      var body = {
        //  "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "siteName": this.salesforce_SiteName,
        "blockName": blockName,
        "floorName": floorName,
        "flatNo": this.flatNumber,
        "actionStr": this.selectstatus,
        "requestUrl": "actionBookingDetails",
        "bookingformCanceledDate": datestring,
        "comments": $('#statusComentId').val(),
        "employeeName": 'AMS_TEAM',              //sessionStorage.getItem("session_desigName"),
        "merchantId": "586E39B38E1070CDCC7238AE2C3CA8FB",
        "BookingId": this.salesforce_BookingId
      }

      console.log("status final sunbmission :" + JSON.stringify(body))
      //return false;
      this.http.post(url, body).map(res => res.json()).subscribe(resp => {
        console.log(JSON.stringify(resp))
        $('.page-loader-wrapper').hide();
        if (resp.responseCode == 200) {
          // swal(resp.description);
          swal("Status changed successfully")
          window.location.reload();
          // setTimeout(function () {
          //   window.location.reload();
          // }, 20000);

        } else if (resp.responseCode == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        } else {



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
  }


  GenerateNOCforBankerFun() {
  //  this.NOC_preview_loading = true;
     $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "bookingFormService/generateLoanNOCLetter.spring";
   // http://localhost:8888/SumadhuraGateway/employeeservice/bookingFormService/generateLoanNOCLetter.spring
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteId": selected_projectid,
      "customerId": this.customer_Id,
      "flatBookingId": this.flatbooking_Id,
      "flatId": this.flatId_Id,
      "actionStr": "Preview",
      "requestUrl": "loanNocLetter"
    }

   console.log("url :"+url)
   console.log("url :"+JSON.stringify(body))
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {

console.log("Generate NOC for banker response  :"+JSON.stringify(resp))
     // this.NOC_preview_loading = false;
         $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
       // this.previewNOCbtn = false;
       swal(resp.description)
        var noc_banker_url = resp.responseObjList.NOCLetterFile[0].url;
        window.open(noc_banker_url, '_blank');
      } else if (resp.responseCode == 440) {
       // this.NOC_preview_loading = false;
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {

       // this.NOC_preview_loading = false;
        $('.page-loader-wrapper').hide();
        //  swal(resp.errors[0]);
        //  return false;
        this.returnslotdates = [];
        for (var i = 0; i < resp.errors.length; i++) {
          this.returnslotdates.push(resp.errors[i]);
        }
        swal(this.returnslotdates.join("\r\n"))

      }
    },
      error => {
       // this.NOC_preview_loading = false;
        $('.page-loader-wrapper').hide();
        var error = JSON.parse(error._body).responseCode;
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );

  }


  all_data(flatbookingId) {
   
    $('.page-loader-wrapper').show();
    // -------------------------------
    let url = this.cmn.commonUrl + "bookingFormService/getCustomerData.spring";
    //http://localhost:8888/SumadhuraGateway/employeeservice/bookingFormService/getCustomerData.spring
    let headers = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: headers }); 
    //alert(flatbookingId)
    var body = {
     
    "sessionKey": sessionStorage.getItem("login_sessionkey"),
    "flatBookingId": flatbookingId,
}
    console.log("all data body :"+JSON.stringify(body))

    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
    $('.page-loader-wrapper').hide();
        console.log('all customer data :'+JSON.stringify(resp))
      
      if (resp.responseCode == 200) {

        $('.page-loader-wrapper').hide();
      this.customer_Id = resp.responseObjList[0].customerId;
       this.salesTeamLeadId =resp.responseObjList[0].salesTeamLeadId;
       this.flatbooking_Id = resp.responseObjList[0].flatBookingId;
       this.flatId_Id = resp.responseObjList[0].flatId;
       
       this.flatNumber = resp.responseObjList[0].flatNo;
       this.statusName = resp.responseObjList[0].status;
 
       this.salesforce_SiteName = resp.responseObjList[0].siteName;
       this.salesforce_BookingId = resp.responseObjList[0].salesForceBookingId;
       this.statusId = resp.responseObjList[0].statusId;

      console.log("customer_Id :"+this.customer_Id)
      console.log("salesTeamLeadId :"+this.salesTeamLeadId)
      console.log("flatbooking_Id :"+this.flatbooking_Id)
      console.log("flatId_Id :"+this.flatId_Id)
      console.log("flatNumber :"+this.flatNumber)
      console.log("statusName :"+this.statusName)
      console.log("salesforce_SiteName :"+this.salesforce_SiteName)
      console.log("salesforce_BookingId :"+this.salesforce_BookingId)

      if (this.statusName == "active") {
        $("#activstate").show()
        $("#pendingstate").hide()
        $("#Cancelbutnotrefund").hide()
        $("#totaldiv_update").show()
      } else if (this.statusName == "pending") {
        // alert(self.statusName)
        $("#activstate").hide()
        $("#pendingstate").show()
        $("#Cancelbutnotrefund").hide()
        $("#totaldiv_update").show()
      } else if (this.statusName == "Cancelled Not Refunded") {
        $("#activstate").hide()
        $("#pendingstate").hide()
        $("#Cancelbutnotrefund").show()
        $("#totaldiv_update").show()
      } else {
        $("#totaldiv_update").hide()
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

  Receipt_Details_fun(itemData){

    if(itemData.receiptStage == "Cleared"){

      this.viewTransactionData = JSON.stringify(itemData);

  

      sessionStorage.setItem('view_transaction_data', this.viewTransactionData);
      if (itemData.transactionTypeName == "Receipt" && itemData.transactionModeName == "Cheque") {
        if (sessionStorage.getItem("session_deptid") == '997') {
          sessionStorage.setItem("headtitle", "View Customer Data");
  
          this.router.navigate([]).then(result => { window.open('#/receipt-cheque-edit', '_blank'); });
  
  
          //this.router.navigate(["receipt-cheque-edit"]);
          return false;
        } else if (sessionStorage.getItem("session_deptid") == '993') {
          sessionStorage.setItem("headtitle", "View Customer Data");
  
          this.router.navigate([]).then(result => { window.open('#/receipt-cheque-edit', '_blank'); });
  
  
          //this.router.navigate(["receipt-cheque-edit"]);
        } else {
          sessionStorage.setItem("headtitle", "View Customer Data");
         // this.router.navigate(["receipt-cheque-edit"]);
  
         this.router.navigate([]).then(result => { window.open('#/receipt-cheque-edit', '_blank'); });
  
  
        }
      } else if (itemData.transactionTypeName == "Receipt" && itemData.transactionModeName == "Online") {
        if (sessionStorage.getItem("session_deptid") == '993') {
          sessionStorage.setItem("headtitle", "View Customer Data");
  
          this.router.navigate([]).then(result => { window.open('#/receipt-online-edit', '_blank'); });
  
  
         // this.router.navigate(["receipt-online-edit"]);
          return false;
        } else {
          sessionStorage.setItem("headtitle", "View Customer Data");
  
          this.router.navigate([]).then(result => { window.open('#/receipt-online-edit', '_blank'); });
  
         // this.router.navigate(["receipt-online-edit"]);
        }
      } else if (itemData.transactionTypeName == "Payment" && itemData.transactionModeName == "Cheque") {
        if (sessionStorage.getItem("session_deptid") == '993') {
          sessionStorage.setItem("headtitle", "View Customer Data");
  
          this.router.navigate([]).then(result => { window.open('#/payment-cheque-edit', '_blank'); });
  
  
          //this.router.navigate(["payment-cheque-edit"]);
        } else {
          sessionStorage.setItem("headtitle", "View Customer Data");
  
          this.router.navigate([]).then(result => { window.open('#/payment-cheque-edit', '_blank'); });
  
  
         // this.router.navigate(["payment-cheque-edit"]);
        }
      } else if (itemData.transactionTypeName == "Payment" && itemData.transactionModeName == "Online") {
        sessionStorage.setItem("headtitle", "View Customer Data");
  
        this.router.navigate([]).then(result => { window.open('#/payment-online-edit', '_blank'); });
  
  
      //  this.router.navigate(["payment-cheque-edit"]);
  
      }
      else if (itemData.transactionTypeName == "Interest Waiver" && itemData.transactionModeName == "Interest Waiver") {
        sessionStorage.setItem("headtitle", "View Customer Data");
  
        this.router.navigate([]).then(result => { window.open('#/interestwaiver-details', '_blank'); });
  
    //    this.router.navigate(["interestwaiver-details"]);
  
      } else if (itemData.transactionTypeName == "Receipt" && itemData.transactionModeName == "waived off") {
        sessionStorage.setItem("headtitle", "View Customer Data");
  
        this.router.navigate([]).then(result => { window.open('#/Approve_Waive-Off', '_blank'); });
  
        //this.router.navigate(["Approve_Waive-Off"]);
  
      }else if (itemData.transactionTypeName == "Receipt" && itemData.transactionModeName == "TDS") {
        sessionStorage.setItem("headtitle", "View Customer Data");
  
        this.router.navigate([]).then(result => { window.open('#/Receipt_Tds_View', '_blank'); });
      // console.log("working");
  
        //this.router.navigateByUrl("Receipt_Tds_View");
  
      }
  

    }


   


  }

  invoice_Details_fun(data){
    window.open(data.documentLocation, '_blank');
  }
}
