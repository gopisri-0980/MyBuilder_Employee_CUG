import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { RequestOptions, Headers, Http } from '@angular/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

declare const swal: any;
declare const $: any;
var status_for_block_links: boolean;
var mileStoneAliasName;
var finMilestoneClassifidesId;
var validation_status;
var demandNoteSelectionType;
var mysecondmilestoneId = [];
var mystusnames = [];
var allBlockIds = [];
var blockidsending;
var flatidsending;

var site_name_list;

@Component({
  selector: 'app-generate-demand-note',
  templateUrl: './generate-demand-note.component.html',
  styleUrls: ['./generate-demand-note.component.sass']
})
export class GenerateDemandNoteComponent implements OnInit {



  singledd1 = {};
  singledd2 = {};
  Blocklinks: any;
  milestonedemand_details: any;
  financialProjectMileStoneRequests: any = [];
  interestval: any;
  milestoneAlias: any;
  my_milestone_ids: any = [];
  temp: any;
  employee_list: Array<any> = [];
  scheme_list: Array<any> = [];
  allChecked: boolean
  hideme_name: boolean;
  hideme_name_scheme_wise: boolean;
  employes_statusid: any;
  isSelectedSaleOwnerWise: any;
  isSelectedSchemeWise: any;
  controller_data: Array<any> = [];
  controller_data_scheme: Array<any> = [];

  new_emp_creation: Array<any> = [];
  new_scheme_creation: Array<any> = [];
  flatwiseselect: Array<any> = [];
  userForm: FormGroup;
  userForm_scheme: FormGroup;
  employee_name: any;
  scheme_name: any;
  closeResult: string;
  viewselectedflatslength: any;
  viewselected_flat_controller: any[];
  viewselectedFlats: boolean;
  selectedFlatIds: Array<any> = [];
  selectAllFlatsCheckbox: boolean = false;
  @ViewChild('content_title') contentTitle: TemplateRef<any>;
  constructor(private cmn: CommonComponent, private http: Http, private router: Router, public fb: FormBuilder, private modalService: NgbModal , private cdr: ChangeDetectorRef) {

    this.singledd1 = {
      singleSelection: false,
      enableSearchFilter: true,
      searchPlaceholderText: 'Search',
      classes: 'my_dropdown1',
      unSelectAllText: 'UnSelect All',
      //lazyLoading: true,
    };

    this.singledd2 = {
      singleSelection: false,
      enableSearchFilter: true,
      searchPlaceholderText: 'Search',
      classes: 'my_dropdown1',
      unSelectAllText: 'UnSelect All',
      //lazyLoading: true,
    };

    this.userForm = this.fb.group({
      project_wise_form: [''],

    });

    this.userForm_scheme = this.fb.group({
      project_wise_form2: [''],

    });

    $('.page-loader-wrapper').hide();
    this.milestoneAlias = mileStoneAliasName
    this.interestval = "With Out Interest";
    sessionStorage.setItem("interestval", this.interestval);
    this.siteList();


  }

  ngOnInit() {
    $("#milestone_blocks_link_status").hide();
    $("#milestone__checkbox_status").hide();
    $("#milestone_blocks_tables").hide();
    $("#demandnotedatediv").hide();
    $("#milestone_blocks").hide();
    $("#milestone_flat").hide();
    $("#interestDiv").hide();
    $("#allblockdiv").hide();
    $("#blockwisediv").hide();
    $("#Faltwisediv").hide();
    $("#sale_owner_div").hide();
    $("#scheme_wise_div").hide();


    var self = this;

    $(document).ready(function () {
      $('.checlist1').click(function () {
        if ($(this).prop("checked") == true) {
          this.interestval = "With Interest";
          sessionStorage.setItem("interestval", this.interestval);
        }
        else if ($(this).prop("checked") == false) {
          this.interestval = "With Out Interest";
          sessionStorage.setItem("interestval", this.interestval);
        }
      });

      $('#all_blocksId').click(function () {
        self.userForm_scheme.reset();
        self.hideme_name_scheme_wise = false;
        // console.log("its working");

        this.employee_name = "";
        this.scheme_name = ""
        if ($(this).prop("checked") == true) {

          // console.log(this.userForm);


          demandNoteSelectionType = "All Blocks";
          $("#Blockwise_Id").prop("checked", false);
          $("#flatwise_Id").prop("checked", false);
          $("#sale_owner").prop("checked", false);
          $("#scheme_wise").prop("checked", false);

          $("#milestone_blocks").hide();
          $("#milestone_flat").hide();
          self.hideme_name = true;

          self.get_employee_list(allBlockIds);

        } else {
          self.hideme_name = false;

        }
      });

      $('#Blockwise_Id').click(function () {
        self.userForm_scheme.reset();
        self.hideme_name_scheme_wise = false;
        // console.log($(this).prop("checked"));
        // console.log(allBlockIds);
        if ($(this).prop("checked") == true) {
          demandNoteSelectionType = "Block Wise";
          $("#all_blocksId").prop("checked", false);
          $("#flatwise_Id").prop("checked", false);
          $("#sale_owner").prop("checked", false);
          $("#scheme_wise").prop("checked", false);

          $("#milestone_blocks").show();
          $("#milestone_flat").hide();



          self.hideme_name = true;
          self.get_employee_list(allBlockIds);

        } else {
          self.hideme_name = false;
          $("#milestone_blocks").hide();
          $("#BlockId").val(['select']);
          $("#BlockId").trigger('change');


        }
      });

      // $('#flatwise_Id').click(function () {


      //   if ($(this).prop("checked") == true) {
          // console.log("welcome");

      //     // self.open();


      //     demandNoteSelectionType = "Send Single/Multiple";
      //     $("#all_blocksId").prop("checked", false);
      //     $("#sale_owner").prop("checked", false);
      //     $("#Blockwise_Id").prop("checked", false);
      //     $("#flatwise_Id").prop("checked", false);
      //     $("#milestone_blocks").hide();
      //     $("#milestone_flat").show();
      //     self.hideme_name = false;



      //   } else {
      //     self.hideme_name = false;

      //     $("#milestone_flat").hide();


      //   }
      // });

      $('#flatwise_Id').click(function () {
        self.userForm_scheme.reset();
        if ($(this).prop("checked") == true) {

          self.controller_data_scheme = []
          // if (this.flatCondition === true) {
          demandNoteSelectionType = "Send Single/Multiple";
          $("#all_blocksId").prop("checked", false);
          $("#sale_owner").prop("checked", false);
          $("#scheme_wise").prop("checked", false);
          self.hideme_name_scheme_wise = false;
          $("#Blockwise_Id").prop("checked", false);
          $("#flatwise_Id").prop("checked", true);
          $("#milestone_blocks").hide();
          $("#milestone_flats").show();
          self.hideme_name = false;

          // Trigger click event of block-wise checkbox to open the block selection popup
          // $("#Blockwise_Id").click();
          // } else {
          //     swal("Please select Block");
          // }
        } else {
          //$("#all_blocksId").prop("disabled", true);
          $("#milestone_flats").hide();
          self.hideme_name = false;
        }
      });

      $('#sale_owner').click(function () {
        self.userForm_scheme.reset();
        if ($(this).prop("checked") == true) {
          self.hideme_name_scheme_wise = false;
          demandNoteSelectionType = "Send Single/Multiple";
          $("#all_blocksId").prop("checked", false);
          $("#Blockwise_Id").prop("checked", false);
          $("#flatwise_Id").prop("checked", false);
          $("#scheme_wise").prop("checked", false);
          $("#milestone_blocks").hide();
          $("#milestone_flat").hide();
          self.get_employee_list(allBlockIds);
          self.hideme_name = true;

        } else {

          self.hideme_name = false;

          $("#BlockId").val(['select']);
          $("#BlockId").trigger('change');

        }
      });

      $('#scheme_wise').click(function () {
        self.userForm_scheme.reset();
        if ($(this).prop("checked") == true) {
          demandNoteSelectionType = "Block Wise";
          $("#all_blocksId").prop("checked", false);
          $("#Blockwise_Id").prop("checked", false);
          $("#flatwise_Id").prop("checked", false);
          $("#sale_owner").prop("checked", false);
          $("#milestone_blocks").hide();
          $("#milestone_flat").hide();
          self.get_scheme_wise_list(allBlockIds, "");
          self.hideme_name_scheme_wise = true;
          self.hideme_name = false;
        } else {

          self.hideme_name_scheme_wise = false;

          $("#BlockId").val(['select']);
          $("#BlockId").trigger('change');

        }
      });


    });

    $(function () {
      $("#projectID").select2({
        placeholder: "Search Project",
        dir: "ltl",
      });

      $("#BlockId").select2({
        placeholder: "Search Block",
        dir: "ltl"
      })

      $("#milestonetypeID").select2({
        placeholder: "Search type",
        dir: "ltl"
      })
      $("#blocktypeID").select2({
        placeholder: "Search type",
        dir: "ltl"
      })

      // $("#FlatId").select2({
      //   placeholder: "Search Flat",
      //   dir: "ltl"
      // });

      $('#projectID').change(function (e) {

        site_name_list = $(e.target).val();
        var siteId = $(e.target).val();
        // console.log(siteId);

        if (siteId == "select") {
          $("#blockslinksid").hide()
          $("#milestone_blocks_tables").hide()
          $("#demandnotedatediv").hide()
          $("#allblockdiv").hide()
          $("#blockwisediv").hide()
          $("#Faltwisediv").hide()
          $("#sale_owner_div").hide();
          $("#scheme_wise_div").hide();
          $("#milestone_blocks").hide()
          $("#milestone_flat").hide()
          $("#interestDiv").hide();
        } else {
          self.blockLinks(siteId);
        }
      });

      $('#blocktypeID').change(function (e) {
        var blockId = $(e.target).val();
        // console.log(blockId);
        if (blockId == "select") {
        } else {
          $("#milestonediv").show()
          $('.page-loader-wrapper').show();
          status_for_block_links = true;
          mileStoneAliasName = blockId.split('$$')[0];
          finMilestoneClassifidesId = blockId.split('$$')[1];
          self.milestoneAlias = mileStoneAliasName
          var siteId = blockId.split('$$')[2];
          var siteName = blockId.split('$$')[3];
          self.milestoneDetails(mileStoneAliasName, finMilestoneClassifidesId, siteId);
          self.getblock_faltList(mileStoneAliasName, finMilestoneClassifidesId, siteId, siteName);

        }
      });

      $('#BlockId').change(function (e) {
        var blockId = $(e.target).val();
        // console.log(blockId);
        if (blockId.length != 0) {
          self.get_employee_list(blockId);
        }
        //  self.get_employee_list(blockId);
        // self.flat_list(blockId);


      })
    })
  }



  emp_selectedSIDs(event) {
    this.controller_data = [];
    this.new_emp_creation.push(event);
    for (var i = 0; i < this.new_emp_creation.length; i++) {
      this.controller_data.push(this.new_emp_creation[i].flatSaleOwnerId);
    }

    // console.log(this.controller_data);
    this.get_scheme_wise_list(allBlockIds, this.controller_data)

  }

  emp_onSelectAll(event) {
    this.new_emp_creation = [];
    this.controller_data = [];

    this.new_emp_creation.push(event);
    for (var i = 0; i < this.new_emp_creation[0].length; i++) {
      this.controller_data.push(this.new_emp_creation[0][i].flatSaleOwnerId);
    }

    // console.log(this.controller_data);

  }
  emp_onItemDeSelect(event) {
    this.new_emp_creation = this.new_emp_creation.filter((el) => el.id !== event.flatSaleOwnerId);
    this.controller_data = [];
    for (var i = 0; i < this.new_emp_creation.length; i++) {
      this.controller_data.push(this.new_emp_creation[i].flatSaleOwnerId);
    }

    // console.log(this.controller_data);

  }
  emp_onDeSelectAll(event) {
    this.new_emp_creation = [];
    this.controller_data = [];

    // console.log(this.controller_data);

  }


  scheme_selectedSIDs(event) {
    this.controller_data_scheme = [];
    this.new_scheme_creation.push(event);
    for (var i = 0; i < this.new_scheme_creation.length; i++) {
      this.controller_data_scheme.push(this.new_scheme_creation[i].finSchemeId);
    }

    // console.log(this.controller_data_scheme);

  }

  scheme_onSelectAll(event) {
    this.new_scheme_creation = [];
    this.controller_data_scheme = [];

    this.new_scheme_creation.push(event);
    for (var i = 0; i < this.new_scheme_creation[0].length; i++) {
      this.controller_data.push(this.new_scheme_creation[0][i].finSchemeId);
    }

    // console.log(this.controller_data_scheme);

  }
  scheme_onItemDeSelect(event) {
    this.new_scheme_creation = this.new_scheme_creation.filter((el) => el.id !== event.finSchemeId);
    this.controller_data_scheme = [];
    for (var i = 0; i < this.new_scheme_creation.length; i++) {
      this.controller_data_scheme.push(this.new_scheme_creation[i].finSchemeId);
    }

    // console.log(this.controller_data_scheme);

  }
  scheme_onDeSelectAll(event) {
    this.new_scheme_creation = [];
    this.controller_data_scheme = [];

    // console.log(this.controller_data_scheme);

  }



  /*-----------------Getting Project(site) list Start---------------------*/
  siteList() {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/raisedMilestoneSites.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "actionUrl": "Generate Demand Note"
    }

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        var Options = "";
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#projectID').append("<option value='" + resp.responseObjList[i].siteId + "'>" + resp.responseObjList[i].siteName + "</option>");
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
  /*-----------------Getting Project(site) list End---------------------*/

  blockLinks(siteid) {
    $('.page-loader-wrapper').show();
    // -------------------------------
    let url = this.cmn.commonUrl + "financial/getMileStoneSetsDtls.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteId": siteid
    }


    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        $("#milestone_blocks_link_status").show();

        this.Blocklinks = resp.responseObjList;
        $('#blocktypeID').html('');
        $('#blocktypeID').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#blocktypeID').append("<option value='" + resp.responseObjList[i].mileStoneAliasName + "$$" + resp.responseObjList[i].finMilestoneClassifidesId + "$$" + resp.responseObjList[i].siteId + "$$" + resp.responseObjList[i].siteName + "'>" + resp.responseObjList[i].mileStoneAliasName + "</option>");

        }
        $("#blockslinksid").show();
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
    // -------------------------------
  }

  milestoneClickEvent() {
    $("#milestone__checkbox_status").show();
    $("#milestone_blocks_tables").show();
    $("#milestone_blocks").show();
    $("#demandnotedatediv").show();
    $("#interestDiv").show();

  }

  // flat_list(BlockId){
  //   $("#milestone_flat").show();
  // }
  /*---------------------------Final submission Start--------------------*/
  send_to_Customer() {
    // console.log(this.controller_data);
    // console.log(this.controller_data_scheme)


    if ($("#projectID").val() == "select") {
      swal("Please select project");
      return false;
    }

    if ($("#blocktypeID").val() == "select") {
      swal("Please select block");
      return false;
    }


    // if (status_for_block_links == undefined) {
    //   swal("Please click any link");
    //   return false;
    // }



    var self = this;
    mysecondmilestoneId = []
    mystusnames = []
    this.financialProjectMileStoneRequests = [];
    $.each($(".checlist:checked"), function () {
      if ($(this).is(":checked") == true) {
        var temp = $(this).attr("id").split('tablerowdata')[1];
        let temp_milestoneNo = $(this).val().split('#')[0];
        let temp_percentagesId = $(this).val().split('#')[1];
        let temp_finMilestoneClassifidesId = $(this).val().split('#')[2];
        let temp_projectMilestoneId = $(this).val().split('#')[3];
        let temp_milestoneDate = $(this).val().split('#')[4];
        let temp_milestoneName = $(this).val().split('#')[5];
        let temp_mileStonePercentage = $(this).val().split('#')[6];
        let temp_mileStoneDueDate = $(this).val().split('#')[7];
        let temp_statusName = $(this).val().split('#')[8];
        mystusnames.push(temp_statusName);
        if (temp_statusName == "Active") {
          mysecondmilestoneId.push(temp_milestoneNo);
        }
        self.financialProjectMileStoneRequests.push({
          "projectMilestoneId": temp_projectMilestoneId,
          "milestoneName": temp_milestoneName,
          "finMilestoneClassifidesId": temp_finMilestoneClassifidesId,
          "percentagesId": temp_percentagesId,
          "mileStonePercentage": temp_mileStonePercentage,
          "milestoneDate": new Date($("#completedateselection" + temp).val()).getTime(),
          "mileStoneDueDate": new Date($("#duedateselection" + temp).val()).getTime(),
          "mileStoneNo": temp_milestoneNo,
          "demandNoteDate": new Date($("#demand_note_date" + temp).val()).getTime(),
          "rowId": "" + temp
        });

      }

    });



    if (this.financialProjectMileStoneRequests.length == 0) {
      swal("Please select atleast one milestone");
      return false;
    }
    for (var i = 0; i < mysecondmilestoneId.length; i++) {
      if (mysecondmilestoneId[i] != this.my_milestone_ids[i]) {
        swal("Please select active status should be sequence");
        return false;
        break;
      }

    }




    if (this.financialProjectMileStoneRequests.length > 0) {
      for (var i = 0; i < this.financialProjectMileStoneRequests.length; i++) {
        // alert(this.financialProjectMileStoneRequests[i].rowId)
        // alert($("#completedateselection" +this.financialProjectMileStoneRequests[i].rowId))
        if ($("#completedateselection" + this.financialProjectMileStoneRequests[i].rowId).val() == "") {
          //  temp_chequedepositDate = null;
          swal("Please select completed date");
          return false;
        }

        if ($("#demand_note_date" + this.financialProjectMileStoneRequests[i].rowId).val() == "") {
          //  temp_chequedepositDate = null;
          swal("Please select demand note date");
          return false;
        }

        if ($("#duedateselection" + this.financialProjectMileStoneRequests[i].rowId).val() == "") {
          //  temp_chequedepositDate = null;
          swal("Please select due date");
          return false;
        }

      }
      // $(function () {
      //   $.each($(".checlist:checked"), function () {
      //     var temp = $(this).attr("id").split('tablerowdata')[1];

      //     if ($("#completedateselection" + temp).val() == "") {
      //       swal("Please select complete date");
      //       return false;
      //     }
      //     // if ($("#demandnotedateselection" + temp).val() == "") {
      //     //   swal("Please select demand note date");
      //     //   return false;
      //     // }
      //     if ($("#demand_note_date" + temp).val() == "") {
      //       swal("Please select demand note date.");
      //       return false;
      //     }
      //     if ($("#duedateselection" + temp).val() == "") {
      //       swal("Please select due date");
      //       return false;
      //     }

      //   });
      //   return false;

      // });


    }








    if ($('#all_blocksId').is(':checked') || $('#Blockwise_Id').is(':checked') || $('#flatwise_Id').is(':checked') || $('#sale_owner').is(':checked') || $('#scheme_wise').is(':checked')) {
      if ($('#all_blocksId').is(':checked')) {
        for (var i = 0; i < mystusnames.length; i++) {
          if (mystusnames[i] == "Raised") {
            swal("Generate Demand is already generated on this Milestone");
            return false;
            break;
          }

        }

        $("#milestone_blocks").hide();
        $("#milestone_flat").hide();
        $("#BlockId").val("");
        $("#FlatId").val("");
        validation_status = "all_blocks";

      }

      if ($('#Blockwise_Id').is(':checked')) {
        for (var i = 0; i < mystusnames.length; i++) {
          if (mystusnames[i] == "Raised") {
            swal("Generate Demand is already generated on this Milestone");
            return false;
            break;
          }

        }
        validation_status = "blocks";
        // $("#all_blocksId").prop("disabled", true);
        $("#milestone_blocks").show();
        $("#milestone_flat").hide();


      }

      if ($('#flatwise_Id').is(':checked')) {
        validation_status = "flats";


      }

      if ($('#sale_owner').is(':checked')) {
        validation_status = "sale owner";


      }

      if ($('#scheme_wise').is(':checked')) {
        validation_status = "scheme wise";


      }

      //test


    } else {
      swal("Please select All Block (or) Block Wise (or) Flat Wise (or) Sale owner (or) Scheme wise")
      //$("#milestone_flat").show();
      return false;
    }
    //if($(this).prop("checked") == true){



    if (validation_status == "blocks") {
      if ($("#BlockId").val() == "") {
        swal("Please select block");
        return false;
      }


    }

    if (validation_status == "flats") {
      if ($("#FlatId").val() == "") {
        swal("Please select flat");
        return false;
      }
    }



    if (validation_status == "sale owner") {
      // console.log(this.controller_data);
      if (this.controller_data.length == 0) {
        swal("Please select sale owner");
        return false;
      }
    }

    if (validation_status == "scheme wise") {
      // console.log(this.controller_data_scheme);
      if (this.controller_data_scheme.length == 0) {
        swal("Please select flat scheme");
        return false;
      }
    }

    //return false;

    // -------------------------------

    if (confirm("Are you sure to submit ?")) {
      this.final_submission_sendToCustomer();
    } else { }


    // -------------------------------

  }


  final_submission_sendToCustomer() {

    // console.log(this.controller_data);


    if (validation_status == "blocks") {
      blockidsending = $("#BlockId").val()
      flatidsending = []
    } else if (validation_status == "flats") {
      blockidsending = []
      flatidsending = this.selectedFlatIds

      // flatidsending = $("#FlatId").val().map(Number)
    } else {
      flatidsending = []
      blockidsending = allBlockIds;

    }

    if (this.controller_data.length == 0) {

      this.isSelectedSaleOwnerWise = "false";
    } else {
      this.isSelectedSaleOwnerWise = "true";
      demandNoteSelectionType = "Block Wise";
    }

    if (this.controller_data_scheme.length == 0) {

      this.isSelectedSchemeWise = "false";
    } else {
      this.isSelectedSchemeWise = "true";
      // demandNoteSelectionType = "Block Wise";
    }
    // this.isSelectedSaleOwnerWise = "true";
    // console.log(this.controller_data);

    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/generateDemandNote.spring";

    // console.log("url :" + url)
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    //     var body = {			
    //             "sessionKey":"" + sessionStorage.getItem("login_sessionkey"),
    //            "finMilestoneClassifidesId": finMilestoneClassifidesId,
    //            "siteId": $("#projectID").val(),
    //            "siteName": $('#projectID').select2('data')[0].text,
    //            "mileStoneAliasName": mileStoneAliasName,
    //            "statusId": "",
    //             "isInterestOrWithOutInterest":this.interestval,
    //              "condition":"sendEmails",
    //              "demandNoteSelectionType" : demandNoteSelectionType,
    //              "flatIds": $("#FlatId").val().map(Number),
    //              "blockIds":$("#BlockId").val().map(Number),
    //            "financialProjectMileStoneRequests": this.financialProjectMileStoneRequests
    // }

    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "finMilestoneClassifidesId": finMilestoneClassifidesId,
      "siteId": $("#projectID").val(),
      "siteName": $('#projectID').select2('data')[0].text,
      //"demandNoteDate": new Date($("#demand_note_date").val()).getTime(),
      "isNewCustomer": "false",
      "mileStoneAliasName": mileStoneAliasName,
      "statusId": 6,
      "isInterestOrWithOutInterest": sessionStorage.getItem("interestval"),
      "condition": "sendEmails",
      "demandNoteSelectionType": demandNoteSelectionType,
      "flatIds": flatidsending,
      "blockIds": blockidsending,
      "financialProjectMileStoneRequests": this.financialProjectMileStoneRequests,
      "isReGenerateDemandNote": "false",
      "isShowGstInPDF": "true",
      "flatSaleOwnerIds": this.controller_data,
      "isSelectedSaleOwnerWise": this.isSelectedSaleOwnerWise,
      "isSelectedSchemeWise": this.isSelectedSchemeWise,
      "finSchemeIds": this.controller_data_scheme,


    }

    // console.log(JSON.stringify(body))

    // console.log(body);
    //  $('.page-loader-wrapper').hide();
    //return false;


    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {


      $('.page-loader-wrapper').hide();
      //this.Blocklinks =  resp;
      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        swal("Demand note has been created")
        this.router.navigate(['/view-demand-note'])

        $(function () {
          location.reload();
        });
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
  /*---------------------------Final submission End--------------------*/




  /*---------------------------Save submission Start--------------------*/
  Save() {
    if ($("#projectID").val() == "select") {
      swal("Please select project");
      return false;
    }
    if ($("#blocktypeID").val() == "select") {
      swal("Please select block");
      return false;
    }
    // if (status_for_block_links == undefined) {
    //   swal("Please click any link");
    //   return false;
    // }
    var self = this;
    mysecondmilestoneId = []
    mystusnames = []
    this.financialProjectMileStoneRequests = []
    $.each($(".checlist:checked"), function () {
      if ($(this).is(":checked") == true) {
        var temp = $(this).attr("id").split('tablerowdata')[1];
        let temp_milestoneNo = $(this).val().split('#')[0];
        let temp_percentagesId = $(this).val().split('#')[1];
        let temp_finMilestoneClassifidesId = $(this).val().split('#')[2];
        let temp_projectMilestoneId = $(this).val().split('#')[3];
        let temp_milestoneDate = $(this).val().split('#')[4];
        let temp_milestoneName = $(this).val().split('#')[5];
        let temp_mileStonePercentage = $(this).val().split('#')[6];
        let temp_mileStoneDueDate = $(this).val().split('#')[7];
        let temp_statusName = $(this).val().split('#')[8];
        mystusnames.push(temp_statusName);
        if (temp_statusName == "Active") {
          mysecondmilestoneId.push(temp_milestoneNo)
        }
        self.financialProjectMileStoneRequests.push({
          "projectMilestoneId": temp_projectMilestoneId,
          "milestoneName": temp_milestoneName,
          "finMilestoneClassifidesId": temp_finMilestoneClassifidesId,
          "percentagesId": temp_percentagesId,
          "mileStonePercentage": temp_mileStonePercentage,
          "milestoneDate": new Date($("#completedateselection" + temp).val()).getTime(),
          "mileStoneDueDate": new Date($("#duedateselection" + temp).val()).getTime(),
          "mileStoneNo": temp_milestoneNo,
          "demandNoteDate": new Date($("#demand_note_date" + temp).val()).getTime(),
          "rowId": "" + temp

        });
      }
    });

    if (this.financialProjectMileStoneRequests.length == 0) {
      swal("Please select atleast one milestone");
      return false;
    }

    for (var i = 0; i < mysecondmilestoneId.length; i++) {
      if (mysecondmilestoneId[i] != this.my_milestone_ids[i]) {
        swal("Please select active status should be sequence");
        return false;
        break;
      }

    }

    if (this.financialProjectMileStoneRequests.length > 0) {

      for (var i = 0; i < this.financialProjectMileStoneRequests.length; i++) {
        // alert(this.financialProjectMileStoneRequests[i].rowId)
        // alert($("#completedateselection" +this.financialProjectMileStoneRequests[i].rowId))
        if ($("#completedateselection" + this.financialProjectMileStoneRequests[i].rowId).val() == "") {
          //  temp_chequedepositDate = null;
          swal("Please select completed date");
          return false;
        }

        if ($("#demand_note_date" + this.financialProjectMileStoneRequests[i].rowId).val() == "") {
          //  temp_chequedepositDate = null;
          swal("Please select demand note date");
          return false;
        }

        if ($("#duedateselection" + this.financialProjectMileStoneRequests[i].rowId).val() == "") {
          //  temp_chequedepositDate = null;
          swal("Please select due date");
          return false;
        }

      }
      // $(function () {
      //   $.each($(".checlist:checked"), function () {
      //     var temp = $(this).attr("id").split('tablerowdata')[1];

      //     if ($("#completedateselection" + temp).val() == "") {
      //       swal("Please select complete date");
      //       // $("#duedateselection"+temp).focus();
      //       return false;
      //     }
      //     if ($("#demand_note_date" + temp).val() == "") {
      //       swal("Please select demand note date.");
      //       return false;
      //     }
      //     if ($("#duedateselection" + temp).val() == "") {
      //       swal("Please select due date");
      //       // $("#duedateselection"+temp).focus();
      //       return false;
      //     }

      //   });
      //   return false;

      // });
    }




    if ($("#demand_note_date").val() == "") {
      swal("Please select demand note date.");
      return false;
    }

    if ($('#all_blocksId').is(':checked') || $('#Blockwise_Id').is(':checked') || $('#flatwise_Id').is(':checked') || $('#sale_owner').is(':checked') || $('#scheme_wise').is(':checked')) {
      if ($('#all_blocksId').is(':checked')) {

        for (var i = 0; i < mystusnames.length; i++) {
          if (mystusnames[i] == "Raised") {
            swal("Generate Demand is already generated on this Milestone");
            return false;
            break;
          }

        }
        $("#milestone_blocks").hide();
        $("#milestone_flat").hide();
        $("#BlockId").val("");
        $("#FlatId").val("");
        validation_status = "all_blocks";
        // return false;
      }

      if ($('#Blockwise_Id').is(':checked')) {
        for (var i = 0; i < mystusnames.length; i++) {
          if (mystusnames[i] == "Raised") {
            swal("Generate Demand is already generated on this Milestone");
            return false;
            break;
          }

        }
        validation_status = "blocks";
        $("#milestone_blocks").show();
        $("#milestone_flat").hide();

      }

      if ($('#flatwise_Id').is(':checked')) {
        validation_status = "flats";
      }

      if ($('#sale_owner').is(':checked')) {
        validation_status = "sale owner";


      }

      if ($('#scheme_wise').is(':checked')) {
        validation_status = "scheme wise";


      }

    } else {
      swal("Please check All Block (or) Block Wise (or) Flat Wise (or) sale owner (or) scheme wise")
      return false;
    }

    if (validation_status == "blocks") {
      if ($("#BlockId").val() == "") {
        swal("Please select block");
        return false;
      }
    }

    if (validation_status == "flats") {
      if ($("#FlatId").val() == "") {
        swal("Please select flat");
        return false;
      }
    }


    if (validation_status == "sale owner") {
      // console.log(this.controller_data);
      if (this.controller_data.length == 0) {
        swal("Please select sale owner");
        return false;
      }
    }


    if (validation_status == "blocks") {
      blockidsending = $("#BlockId").val()
      flatidsending = []
    } else if (validation_status == "flats") {
      blockidsending = []
      // flatidsending = $("#FlatId").val().map(Number)
      flatidsending = this.selectedFlatIds

    } else {
      flatidsending = []
      blockidsending = allBlockIds;

    }

    if (this.controller_data == undefined || this.controller_data.length == 0) {
      this.controller_data = [];
      this.isSelectedSaleOwnerWise = "false";
    } else {
      this.isSelectedSaleOwnerWise = "true";
      demandNoteSelectionType = "Block Wise";
    }

    if (this.controller_data_scheme.length == 0) {

      this.isSelectedSchemeWise = "false";
    } else {
      this.isSelectedSchemeWise = "true";
      // demandNoteSelectionType = "Block Wise";
    }


    if (validation_status == "scheme wise") {
      // console.log(this.controller_data_scheme);
      if (this.controller_data_scheme.length == 0) {
        swal("Please select flat scheme");
        return false;
      }
    }
    // -------------------------------
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/generatedDemandNotePreview.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "financialProjectMileStoneRequests": this.financialProjectMileStoneRequests,
      "siteIds": [$("#projectID").val()].map(Number),
      "isInterestOrWithOutInterest": sessionStorage.getItem("interestval"),
      "flatIds": flatidsending,
      "blockIds": blockidsending,
      "demandNoteSelectionType": demandNoteSelectionType,
      "flatSaleOwnerIds": this.controller_data,
      "isSelectedSaleOwnerWise": this.isSelectedSaleOwnerWise,
      "isSelectedSchemeWise": this.isSelectedSchemeWise,
      "finSchemeIds": this.controller_data_scheme


    }

    // console.log("GDN request :" + JSON.stringify(body))

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

      // console.log(JSON.stringify(resp));

      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();

        var fileName = resp.responseObjList[0].url;

        var extension = fileName.split('.').pop();


        if (extension == "zip") {
          swal(" please set your path.File will be save your local directory")
          window.open(resp.responseObjList[0].url, '_blank');
          this.DeleteCurrentZipfile(resp.responseObjList[0].url);
        } else {
          window.open(resp.responseObjList[0].url, '_blank');

        }



        // $(function () {
        //   location.reload();
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
        $('.page-loader-wrapper').hide();
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }
  /*---------------------------Save submission End--------------------*/


  /*-----------------------------------Block Link onchange functionalities start----------------*/
  blocksClickEvent(id) {
    $("#milestonediv").show()
    $('.page-loader-wrapper').show();
    status_for_block_links = true;
    mileStoneAliasName = id.split('$')[0];
    finMilestoneClassifidesId = id.split('$')[1];
    this.milestoneAlias = mileStoneAliasName
    var siteId = id.split('$')[2];
    var siteName = id.split('$')[3];
    this.milestoneDetails(mileStoneAliasName, finMilestoneClassifidesId, siteId);
    this.getblock_faltList(mileStoneAliasName, finMilestoneClassifidesId, siteId, siteName);
  }
  /*----------------------------------- Block Link onchange functionalities end----------------*/

  /*--------------------------Mile stone table details start------------------*/
  milestoneDetails(mname, cid, sid) {

    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/getMileStoneDemandNoteDetails.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "finMilestoneClassifidesId": cid,
      "siteId": sid,
      //"blockIds":[$("#BlockId").val()],
      "mileStoneAliasName": mname,
      "condition": ""
    }


    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $('#milestonetypeID').html("<option value='select'>--Select--</option>" + "" + "<option value='181'>Regular</option>" + "" + "<option value='182'>Customized</option>");

      $("#milestonetypeID").val(resp.responseObjList[0].milestoneType)

      // console.log("-----------milestone details :" + JSON.stringify(resp))
      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        $("#interestDiv").show();
        $("#allblockdiv").show();
        $("#blockwisediv").show();
        $("#Faltwisediv").show();
        $("#sale_owner_div").show();
        $("#scheme_wise_div").show();
        $("#milestone_blocks_tables").show();
        $("#demandnotedatediv").show();

        this.milestonedemand_details = resp.responseObjList[0].financialProjectMileStoneResponse;
        for (var i = 0; i < this.milestonedemand_details.length; i++) {
          if (this.milestonedemand_details[i].statusName == "Active") {
            this.my_milestone_ids.push(this.milestonedemand_details[i].mileStoneNo)
          }

        }
        $(function () {
          var milestonedemand_details = resp.responseObjList[0].financialProjectMileStoneResponse;
          for (var i = 0; i < milestonedemand_details.length; i++) {

            var date = new Date().getMonth();
            var minimumdate = new Date().setMonth(date - 3);
            var maximumdate = new Date().setMonth(date + 3);

            $('#demand_note_date' + (i + 1)).bootstrapMaterialDatePicker({ weekStart: 0, time: false }).on('change', function (e, date) {
              var myIdtemp = e.target.id;
              var FinalId = myIdtemp.split('demand_note_date')[1]
              var temp = i;
              var someDate = new Date(e.target.value);
              var numberOfDaysToAdd = 15;
              someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
              var d = new Date(someDate);
              var datestring = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
              $('#duedateselection' + FinalId).val(datestring);

              $('#duedateselection' + FinalId).bootstrapMaterialDatePicker('setMinDate', date);



            });



            $('#duedateselection' + (i + 1)).bootstrapMaterialDatePicker({
              format: 'YYYY-MM-DD',
              minDate: new Date(minimumdate),
              //  maxDate: new Date(),
              clearButton: true,
              weekStart: 1,
              time: false,
            });


            $('#completedateselection' + (i + 1)).bootstrapMaterialDatePicker({
              format: 'YYYY-MM-DD',
              minDate: new Date(minimumdate),
              maxDate: new Date(),
              clearButton: true,
              weekStart: 1,
              time: false
            });

          }

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
        $('.page-loader-wrapper').hide();
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }
  /*--------------------------Mile stone table details End------------------*/

  /*--------------------------Blocks and flats dropdown functionality Start------------------*/
  getblock_faltList(mname, cid, sid, sname) {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/getDemandNoteBlockSelectionDetails.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "finMilestoneClassifidesId": cid,
      "siteId": sid,
      "mileStoneAliasName": mname,
      "siteName": sname,
    }


    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      if (resp.responseCode == 200) {

        $('.page-loader-wrapper').hide();
        $('#BlockId').html('');
        allBlockIds = []
        for (var i = 0; i < resp.responseObjList[0].mappingBlocksResponse.length; i++) {
          // console.log(resp.responseObjList[0].mappingBlocksResponse)
          allBlockIds.push(resp.responseObjList[0].mappingBlocksResponse[i].blockId);
          $('#BlockId').append("<option value='" + resp.responseObjList[0].mappingBlocksResponse[i].blockId + "'>" + resp.responseObjList[0].mappingBlocksResponse[i].blockName + "</option>");
        }


        this.flatwiseselect = resp.responseObjList[0].flatsResponse
        setTimeout(() => {
          this.cdr.detectChanges();
        }, 0);
        
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
        var error = JSON.parse(error._body).responseCode;
        $('.page-loader-wrapper').hide();
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }
  /*--------------------------Blocks and flats dropdown functionality End------------------*/


  /*-----------------------------------Zip file delete start ----------------------------*/
  DeleteCurrentZipfile(zipfile) {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/deleteDemandNoteZipFile.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "fileInfos": [{
        "filePath": zipfile,
        "url": ""
      }]

    }



    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
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
  /*-----------------------------------Zip file delete End----------------------------*/

  homeClick() {
    this.cmn.commonHomeNavigation();
  }
  //   toggleVisibility(event, item) {
  //     this.temp = event.target.id.split("tablerowdata")[1];

  //     // if (event.target.checked == true) {
  //     //   $('#chequedepositDate' + this.temp).prop('disabled', false);

  //     //   $("#chequedepositDate" + this.temp).focus();
  //     //   userRoleListTemp.push({
  //     //     "siteId": item.siteId,
  //     //     "siteName": item.siteName,
  //     //     "transactionTypeId": item.transactionTypeId,
  //     //     "transactionModeId": item.transactionModeId,
  //     //     "transactionTypeName": item.transactionTypeName,
  //     //     "transactionModeName": item.transactionModeName,
  //     //     "transactionAmount": item.transactionAmount,
  //     //     "transactionReceiveDate": item.transactionReceiveDate,
  //     //     "flatIds": item.flatId,
  //     //     "bookingFormId": item.bookingFormId,
  //     //     "finTransactionNo": item.finTransactionNo,
  //     //     "transactionEntryId": item.transactionEntryId,
  //     //     "transactionSetOffEntryId": 8,
  //     //     "rowId":this.temp

  //     //   });



  //     // } else {
  //     //   let index = userRoleListTemp.indexOf({
  //     //     "siteId": item.siteId,
  //     //     "siteName": item.siteName,
  //     //     "transactionTypeId": item.transactionTypeId,
  //     //     "transactionModeId": item.transactionModeId,
  //     //     "transactionTypeName": item.transactionTypeName,
  //     //     "transactionModeName": item.transactionModeName,
  //     //     "transactionAmount": item.transactionAmount,
  //     //     "transactionReceiveDate": item.transactionReceiveDate,
  //     //     "flatIds": item.flatId,
  //     //     "bookingFormId": item.bookingFormId,
  //     //     "finTransactionNo": item.finTransactionNo,
  //     //     "transactionEntryId": item.transactionEntryId,
  //     //     "transactionSetOffEntryId": 8,
  //     //   });
  //     //   userRoleListTemp.splice(index, 1);
  //     //   $('#chequedepositDate' + this.temp).prop('disabled', true);
  //     //   //$('#chequedepositDate' + this.temp).val("");
  //     // }

  //    // }
  //   }




  get_employee_list(allBlockIds) {

    // console.log(allBlockIds);



    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/getFlatSaleOwners.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteId": site_name_list,
      "blockIds": allBlockIds,
      "requestUrl": "demandNote",
      "finMilestoneClassifidesId": finMilestoneClassifidesId

    }
    // console.log(body);

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

      // console.log(resp);

      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        this.userForm.reset();
        this.employee_list = [];
        this.employee_list = resp.responseObjList;
        this.employee_list.forEach((o: any, i) => (o.id = o.flatSaleOwnerId));


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

  get_scheme_wise_list(allBlockIds, saleownwerdata) {

    // console.log(allBlockIds);

    if (saleownwerdata == "") {
      saleownwerdata = null
    } else {
      saleownwerdata = saleownwerdata;
    }

    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/getSchemeNames.spring";
    //http://localhost:8888/SumadhuraGateway/employeeservice/financial/getSchemeNames.spring
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteIds": [site_name_list],
      "blockIds": allBlockIds,
      "flatSaleOwnerIds": saleownwerdata,
      "requestUrl": "demandNote",
      "finMilestoneClassifidesId": finMilestoneClassifidesId

    }
    // console.log("shemewise reqest" + JSON.stringify(body));

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      // console.log("shemewise response" + JSON.stringify(resp));
      // console.log(resp);

      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        this.userForm_scheme.reset();
        this.scheme_list = [];
        this.scheme_list = resp.responseObjList;
        this.scheme_list.forEach((o: any, i) => (o.id = o.finSchemeId));

        this.hideme_name_scheme_wise = true;
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

  viewallflats(content) {
    // console.log("this is calling")
    // console.log(content)
  }


  // open(content) {
  //   this.modalService.open(content, { backdrop: 'static', size: 'lg', keyboard: false, centered: true, windowClass: 'my-class' }).result.then(
  //     (result) => {
  //       this.closeResult = `Closed with: ${result}`;
  //     },
  //     (reason) => {
  //       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //     },
  //   );
  // }

  openModal() {
    $('.page-loader-wrapper').show();
    if (this.flatwiseselect != undefined) {
      setTimeout(() => {
        $('.page-loader-wrapper').hide();
        const modalRef = this.modalService.open(this.contentTitle, { backdrop: 'static', size: 'lg', keyboard: false, centered: true, windowClass: 'my-class' });
        modalRef.result.then(
          (result) => {
            // this.resetCheckboxSelection();
            this.closeResult = `Closed with: ${result}`;
          },
          (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          }
        );
      }, 2000)

    }

  }
  resetCheckboxSelection() {
    // Clear checkbox selection
    this.selectedFlatIds = [];
    this.viewselectedFlats = false;
    this.selectAllFlatsCheckbox = false;
    this.flatwiseselect.forEach(item => {
      item.checked = false;
    });
    if (this.selectedFlatIds.length === 0) {
      $("#flatwise_Id").prop("checked", false);

      return false;
    } else {
      $("#flatwise_Id").prop("checked", true);
    }
    // You may need to clear other checkbox variables here if applicable
  }
  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }
  changeTradesByCategoryflat(event, i, item) {
    item.checked = !item.checked;
    this.flatwiseselect[i].checked = event.target.checked;
    this.viewselectedFlats = this.flatwiseselect.every(item => item.checked);

  }

  selectAllFlats(event) {
    const checked = event.target.checked;
    this.flatwiseselect.forEach(item => item.checked = checked);
    this.viewselectedFlats = checked;
    this.viewselectedFlats = this.flatwiseselect.every(item => item.checked);

    // if (this.viewselected_flat_controller.length == this.flatwiseselect.length) {
    //   $('#selectflats').prop('checked', true);
    //   this.viewselectedFlats = true;
    // }
  }
  Selectflatsfun() {
    this.selectedFlatIds = [];
    for (const flat of this.flatwiseselect) {
      if (flat.checked) {
        this.selectedFlatIds.push(flat.flatId);
      }
    }


    if (this.selectedFlatIds.length === 0) {
      $("#flatwise_Id").prop("checked", false);
      swal("Please select at least one flat.");
      return false;
    } else {
      $("#flatwise_Id").prop("checked", true);
    }
    // console.log("Selected flat IDs:", this.selectedFlatIds);
    this.modalService.dismissAll();




    // this.viewselected_flat_controller = [];
    // for (var j = 0; j < this.flatwiseselect.length; j++) {
    //   if (this.flatwiseselect[j].checked !== undefined || this.flatwiseselect[j].checked !== "undefined") {
    //     if (this.flatwiseselect[j].checked == true) {
    //       if (   this.selectedFlatIds != undefined) {
    //         this.selectedFlatIds.push(this.flatwiseselect[j].checked);
    //       }
    //     }
    //   }
    // }


  }
  openFlatWisePopup() {
    // Check if BlockId is selected
    this.openModal();
    // if ($("#BlockId").val() && $("#BlockId").val().length > 0) {
    //   // Open the modal

    // } else {
    //   // No block is selected, show error message or handle as needed
    //   swal("Please select Block");
    //   $("#flatwise_Id").prop("checked", false);
    //   // Uncheck the checkbox to prevent further action
    //   this.selectAllFlatsCheckbox = false;
    // }
  }

  //   toggleAllFlats() {
  //     // Toggle the state of individual checkboxes based on the state of "Flat Wise" checkbox
  //     this.flatwiseselect.forEach(item => item.checked = this.selectAllFlatsCheckbox);
  // }

}
