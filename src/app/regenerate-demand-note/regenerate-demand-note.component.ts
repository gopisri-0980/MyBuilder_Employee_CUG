import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { RequestOptions, Headers, Http } from '@angular/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { map, tap } from 'rxjs/operators';
declare const swal: any;
declare const $: any;
var status_for_block_links: boolean;
var mileStoneAliasName;
var finMilestoneClassifidesId;
var validation_status;
var demandNoteSelectionType;
var mysecondmilestoneId = [];
var forflatmilestoneIds = []
var dummyfinmilestoneids = []
var interestval;


var site_name_list;
var allBlockIds = [];

var mystusnames = [];
var blockidsending;
var flatidsending;




@Component({
  selector: 'app-regenerate-demand-note',
  templateUrl: './regenerate-demand-note.component.html',
  styleUrls: ['./regenerate-demand-note.component.sass']
})
export class RegenerateDemandNoteComponent implements OnInit {

  userForm: FormGroup;
  employee_name: any;

  singledd1 = {};
  Blocklinks: any;
  milestonedemand_details: any;
  financialProjectMileStoneRequests: any = [];

  milestoneAlias: any;
  my_milestone_ids: any = [];
  demandNoteSelectionType: string;
  fltIds: any[];
  blkIds: any;
  employee_list: Array<any> = [];

  hideme_name: boolean;
  closeResult: string;
  employes_statusid: any;
  isSelectedSaleOwnerWise: any;
  controller_data: Array<any> = [];
  new_emp_creation: Array<any> = [];
  selectedFlatIds: Array<any> = [];
  selectAllFlatsCheckbox: boolean = false
  flatwiseselect: Array<any> = [];
  flatVisible: boolean = false
  flatCondition: boolean
  viewselectedFlats:any
  scheme_list : Array<any> = [];
  hideme_name_scheme_wise : boolean;
  isSelectedSchemeWise : any;
  controller_data_scheme: Array<any> = [];
  new_scheme_creation: Array<any> = [];
  userForm_scheme : FormGroup;
  scheme_name : any;
  singledd2 = {};
  @ViewChild('content_title') contentTitle: TemplateRef<any>;
  constructor(private cmn: CommonComponent, private http: Http, private router: Router, public fb: FormBuilder, private modalService: NgbModal, private cdr: ChangeDetectorRef) {
    $('.page-loader-wrapper').hide();

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


    this.milestoneAlias = mileStoneAliasName
    interestval = "With Out Interest";
    this.siteList();

  }
  ngOnInit() {




    $("#milestone_blockss").hide();
    $("#milestone_flats").hide();
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
    $("#scheme_wise_div").hide();
    $("#sale_owner_div").hide();

    // this.hideme_name = false;

    var self = this;
    $(function () {
      $('.checlist1').click(function () {
        if ($(this).prop("checked") == true) {
          //alert("Checkbox is checked.");

          interestval = "With Interest";
          // alert(interestval);
        }
        else if ($(this).prop("checked") == false) {
          //alert("Checkbox is unchecked.");
          interestval = "With Out Interest";
          // alert(interestval);
        }
      });
      // $('#all_blocksId').click(function () {
      //   if ($(this).prop("checked") == true) {
      //     demandNoteSelectionType = "All Blocks";
      //     $("#Blockwise_Id").prop("checked", false);
      //     $("#flatwise_Id").prop("checked", false);
      //     $("#milestone_blocks").hide();
      //     $("#milestone_flats").hide();

      //     self.get_employee_list(allBlockIds);


      //   } else {
      //     // $("#Blockwise_Id").prop("disabled", true);
      //   }
      // });

      $('#Blockwise_Id').click(function () {
        self.hideme_name_scheme_wise = false;
        self.userForm_scheme.reset();
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
          $("#Faltwisediv").show();
          self.flatVisible = true


          self.hideme_name = true;
          self.get_employee_list(allBlockIds);

        } else {
          self.hideme_name = false;
          self.flatVisible = false;

          $("#milestone_blocks").hide();
          $("#BlockId").val(['select']);
          $("#BlockId").trigger('change');


        }
      });

      // $('#Blockwise_Id').click(function () {
      //   $("#BlockId").val(['select']);
      //   $("#BlockId").trigger('change');
      //   $("#FlatId").val(['select']);
      //   $("#FlatId").trigger('change');

      //   // this.hideme_name = false;
      //   if ($(this).prop("checked") == true) {

      //     demandNoteSelectionType = "Block Wise";
      //     $("#all_blocksId").prop("checked", false);
      //     $("#flatwise_Id").prop("checked", false);
      //     $("#sale_owner").prop("checked", false);
      //     $("#milestone_blocks").show();
      //     $("#milestone_flats").show();
      //     self.get_employee_list(allBlockIds);
      //     self.hideme_name = true;

      //   } else {

      //     $("#milestone_blocks").hide();
      //     $("#milestone_flats").hide();
      //     $("#BlockId").val(['select']);
      //     $("#BlockId").trigger('change');
      //     $("#FlatId").val(['select']);
      //     $("#FlatId").trigger('change');
      //     // this.hideme_name = false;

      //     self.hideme_name = false;

      //     //$("#all_blocksId").prop("disabled", true);
      //   }
      // });

      

      $('#sale_owner').click(function () {

        self.userForm_scheme.reset();
        self.hideme_name_scheme_wise = false;
        // $("#FlatId").val(['select']);
        // $("#FlatId").trigger('change');

        if ($(this).prop("checked") == true) {
          demandNoteSelectionType = "Send Single/Multiple";
          $("#all_blocksId").prop("checked", false);
          $("#Blockwise_Id").prop("checked", false);
          $("#flatwise_Id").prop("checked", false);
          $("#scheme_wise").prop("checked", false);
          $("#milestone_blocks").hide();
          $("#milestone_flats").hide();
          self.get_employee_list(allBlockIds);
          self.hideme_name = true;
          self.flatVisible = false
        } else {
          self.flatVisible = false
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
      $('#demand_note_date').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
        minDate: new Date(),
        clearButton: true,
        weekStart: 1,
        time: false
      });

      $('#duedateselection').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
        minDate: new Date(),
        clearButton: true,
        weekStart: 1,
        time: false
      });
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

        self.blockLinks(siteId);

        self.get_employee_list(siteId);

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
          this.flatCondition = true
          
        }
       
  
        if (blockId == "") {
          this.flatCondition = false
        } else {
          this.flatCondition = true
          $('#FlatId').html('');
          forflatmilestoneIds = []
          $.each($(".checlist:checked"), function () {
            // console.log($(this).is(":checked"));
            if ($(this).is(":checked") == true) {
              var temp = $(this).attr("id").split('tablerowdata')[1];
              // alert($(this).val());
              let temp_milestoneprojectid = $(this).val().split('#')[3];
              // console.log("temp1_milestoneNo:" + temp_milestoneprojectid);

              //  alert(temp_statusName);
              forflatmilestoneIds.push(temp_milestoneprojectid)


            }
          });
          self.flat_list(blockId);
        }



      })
      // $('#flatwise_Id').click(function () {
      //   if ($(this).prop("checked") == true) {
      //     if (this.flatCondition === true) {
      //       demandNoteSelectionType = "Send Single/Multiple";
      //       $("#all_blocksId").prop("checked", false);
      //       $("#sale_owner").prop("checked", false);
      //       $("#Blockwise_Id").prop("checked", true);
      //       $("#flatwise_Id").prop("checked", false);
      //       $("#milestone_blocks").hide();
      //       $("#milestone_flats").show();
      //       self.hideme_name = false;
      //     } else {
      //       swal("Please select Block");
      //     }

      //   } else {
      //     //$("#all_blocksId").prop("disabled", true);
      //     $("#milestone_flats").hide();
      //     self.hideme_name = false;
      //   }
      // });
      $('#flatwise_Id').click(function () {
        if ($(this).prop("checked") == true) {
            if (this.flatCondition === true) {
                demandNoteSelectionType = "Send Single/Multiple";
                $("#all_blocksId").prop("checked", false);
                $("#sale_owner").prop("checked", false);
                $("#Blockwise_Id").prop("checked", true);
                $("#flatwise_Id").prop("checked", true);
                $("#milestone_blocks").hide();
                $("#milestone_flats").show();
                self.hideme_name = false;
    
                // Trigger click event of block-wise checkbox to open the block selection popup
                $("#Blockwise_Id").click();
            } else {
                swal("Please select Block");
            }
        } else {
            //$("#all_blocksId").prop("disabled", true);
            $("#milestone_flats").hide();
            self.hideme_name = false;
        }
    });
    
    })
    // this.flat_list()
  }


  emp_selectedSIDs(event) {
    this.controller_data = [];
    this.new_emp_creation.push(event);
    for (var i = 0; i < this.new_emp_creation.length; i++) {
      this.controller_data.push(this.new_emp_creation[i].flatSaleOwnerId);
    }
    this.get_scheme_wise_list(allBlockIds, this.controller_data)
    // console.log(this.controller_data);

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




  /*-----------------Getting Project(site) list Start---------------------*/
  siteList() {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/raisedMilestoneSites.spring";
    // http://106.51.38.64:9999/employeeservice/site/site.spring
    // console.log("url :" + url);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "actionUrl": "Regenerate Demand Note"

    }
    // console.log("body :" + JSON.stringify(body))
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      //$('.page-loader-wrapper').hide();
      // console.log("Site list response----------" + JSON.stringify(resp));
      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        var Options = "";
        //   $('#projectID').formSelect();

        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#projectID').append("<option value='" + resp.responseObjList[i].siteId + "'>" + resp.responseObjList[i].siteName + "</option>");
          //	$('#projectID').formSelect();
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
  /*-----------------Getting Project(site) list End---------------------*/

  blockLinks(siteid) {
    $('.page-loader-wrapper').show();
    // -------------------------------
    let url = this.cmn.commonUrl + "financial/getMileStoneSetsDtls.spring";
    // http://localhost:8080/employeeservice/flat/flatBlock.spring
    // console.log("url :" + url);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteId": siteid
    }
    // console.log("----body :" + JSON.stringify(body));
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      //$('.page-loader-wrapper').hide();
      // console.log("Block links response----------" + JSON.stringify(resp));
      //this.Blocklinks =  resp;
      if (resp.responseCode == 200) {
        //   alert("success")
        $('.page-loader-wrapper').hide();
        $("#milestone_blocks_link_status").show();

        this.Blocklinks = resp.responseObjList;
        $('#blocktypeID').html('');
        $('#blocktypeID').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
            $('#blocktypeID').append("<option value='" + resp.responseObjList[i].mileStoneAliasName +"$$"+ resp.responseObjList[i].finMilestoneClassifidesId+"$$"+ resp.responseObjList[i].siteId+"$$"+ resp.responseObjList[i].siteName+ "'>" + resp.responseObjList[i].mileStoneAliasName + "</option>");
           
        }
        $("#blockslinksid").show();
        //for(var i=0;i<this.Blocklinks.length;i++){
        // $("#test").append('<span>this.Blocklinks[i].mileStoneAliasName</span>');
        // <a  href="#" style="text-decoration: underline; pointer-events: none;">{{item.mileStoneAliasName}}</a><br>
        // }
        // console.log(this.Blocklinks);
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
    // -------------------------------
  }

  milestoneClickEvent() {
    $("#milestone__checkbox_status").show();
    $("#milestone_blocks_tables").show();
    $("#milestone_blocks").show();
    $("#demandnotedatediv").show();
    $("#milestone_blockss").show();
    $("#milestone_flats").show();


  }

  // flat_list(BlockId){
  //   $("#milestone_flat").show();
  // }
  /*---------------------------Final submission Start--------------------*/
  send_to_Customer() {

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
    forflatmilestoneIds = []
    dummyfinmilestoneids = []
    this.financialProjectMileStoneRequests = []
    $.each($(".checlist:checked"), function () {
      // console.log($(this).is(":checked"));
      if ($(this).is(":checked") == true) {
        var temp = $(this).attr("id").split('tablerowdata')[1];
        // alert($(this).val());
        let temp_milestoneNo = $(this).val().split('#')[0];
        // console.log("temp1_milestoneNo:" + temp_milestoneNo);
        let temp_percentagesId = $(this).val().split('#')[1];
        // console.log("temp_percentagesId:" + temp_percentagesId);
        let temp_finMilestoneClassifidesId = $(this).val().split('#')[2];
        // console.log("temp_finMilestoneClassifidesId:" + temp_finMilestoneClassifidesId);
        dummyfinmilestoneids.push(temp_finMilestoneClassifidesId)
        let temp_projectMilestoneId = $(this).val().split('#')[3];
        // console.log("temp_projectMilestoneId:" + temp_projectMilestoneId);

        let temp_milestoneDate = $(this).val().split('#')[4];
        let modi_milestoneDate;
        if (temp_milestoneDate == "null") {
          modi_milestoneDate = null;
        } else {
          modi_milestoneDate = temp_milestoneDate;
        }
        // console.log("modi_milestoneDate:" + modi_milestoneDate);

        let temp_milestoneName = $(this).val().split('#')[5];
        // console.log("temp_milestoneName:" + temp_milestoneName);


        let temp_mileStonePercentage = $(this).val().split('#')[6];
        // console.log("temp_mileStonePercentage:" + temp_mileStonePercentage);

        let temp_mileStoneDueDate = $(this).val().split('#')[7];
        let modi_temp_mileStoneDueDate;
        if (temp_mileStoneDueDate == "null") {
          modi_temp_mileStoneDueDate = null;
        } else {
          modi_temp_mileStoneDueDate = temp_mileStoneDueDate;
        }
        // console.log("modi_temp_mileStoneDueDate:" + modi_temp_mileStoneDueDate);
        let temp_statusName = $(this).val().split('#')[8];
        //  alert(temp_statusName);
        forflatmilestoneIds.push(temp_projectMilestoneId)
        // console.log("temp_statusName:" + temp_statusName);
        if (temp_statusName == "Active") {
          mysecondmilestoneId.push(temp_milestoneNo)
          //alert(temp_statusName);
        }
        self.financialProjectMileStoneRequests.push({
          "projectMilestoneId": temp_projectMilestoneId,
          "milestoneName": temp_milestoneName,
          "finMilestoneClassifidesId": temp_finMilestoneClassifidesId,
          "percentagesId": temp_percentagesId,
          "mileStonePercentage": temp_mileStonePercentage,
          "milestoneDate": modi_milestoneDate,
          "mileStoneDueDate": modi_temp_mileStoneDueDate,
          "mileStoneNo": temp_milestoneNo,

        });

      }

      // console.log("ticket ids :"+mychcklist_ticketIdd);
    });

    self.financialProjectMileStoneRequests.push({
      "projectMilestoneId": 0,
      "milestoneName": "Dummy MileStone for Regenerate Demand Note",
      "finMilestoneClassifidesId": dummyfinmilestoneids[0],
      "percentagesId": 1,
      "mileStonePercentage": 12.0,
      "milestoneDate": Date.now(),
      "mileStoneDueDate": Date.now(),
      "mileStoneNo": 0
    });
    // console.log(this.financialProjectMileStoneRequests);
    if (this.financialProjectMileStoneRequests.length == 1) {
      swal("Please select atleast one milestone");
      return false;
    }
    // console.log("selected-------" + mysecondmilestoneId.length);
    // console.log("all-------" + this.my_milestone_ids);
    // for(var i=0;i<mysecondmilestoneId.length;i++){
    //   if(mysecondmilestoneId[i] != this.my_milestone_ids[i]){
    //    swal("Please select active status should be sequence");
    //     return false;
    //     break;
    //   }

    // }
    if (this.financialProjectMileStoneRequests.length > 0) {
      $(function () {

        $.each($(".checlist:checked"), function () {
          debugger;
          var temp = $(this).attr("id").split('tablerowdata')[1];

          if ($("#completedateselection" + temp).val() == "") {
            swal("Please select complete date");
            // $("#duedateselection"+temp).focus();
            return false;
          }
          if ($("#demandnotedateselection" + temp).val() == "") {
            swal("Please select demand note date");
            //  $("#duedateselection"+temp).focus();
            return false;
          }
          if ($("#duedateselection" + temp).val() == "") {
            swal("Please select due date");
            // $("#duedateselection"+temp).focus();
            return false;
          }

        });
        return false;

      });


    }
    if ($("#demand_note_date").val() == "") {
      // alert("Please select start date");
      swal("Please select demand note date.");
      return false;
    }


    // start change -------------------------------------------------
    // if ( $('#Blockwise_Id').is(':checked') || $('#sale_owner').is(':checked')) {

    //   if ($('#Blockwise_Id').is(':checked')) {
    //     for (var i = 0; i < mystusnames.length; i++) {
    //       if (mystusnames[i] == "Raised") {
    //         swal("Generate Demand is already generated on this Milestone");
    //         return false;
    //         break;
    //       }

    //     }
    //     validation_status = "blocks";
    //     // $("#all_blocksId").prop("disabled", true);
    //     $("#milestone_blocks").show();
    //     $("#milestone_flat").hide();
    //   }
    //   if ($('#flatwise_Id').is(':checked')) {
    //     validation_status = "flats";
    //   }
    //   if ($('#sale_owner').is(':checked')) {
    //     validation_status = "sale owner";
    //   }
    // } else {
    //   swal("Please select Block Wise / Flat Wise (or) Sale owner");
    //   //$("#milestone_flat").show();
    //   return false;
    // }
    // if (validation_status == "blocks") {
    //   if ($("#BlockId").val() == "") {
    //     swal("Please select block");
    //     return false;
    //   }
    // }
    // if (validation_status == "sale owner") {
      // console.log(this.controller_data);
    //   if (this.controller_data.length == 0) {
    //     swal("Please select sale owner");
    //     return false;
    //   }
    // }


    //  if (this.fltIds.length === 0) {
    //   this.demandNoteSelectionType = "Block Wise";
    //   this.fltIds = []
    //   this.blkIds = $("#BlockId").val().map(Number)
    // } else {
    //   this.demandNoteSelectionType = "Send Single/Multiple";

    //   this.fltIds = this.selectedFlatIds

    //   // this.fltIds = $("#FlatId").val().map(Number)
    //   this.blkIds = []
    // }

    // end here----------------------------------



    if ($('#Blockwise_Id').is(':checked') || $('#flatwise_Id').is(':checked') || $('#sale_owner').is(':checked')|| $('#scheme_wise').is(':checked')) {

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


    } else {
      swal("Please select  Block Wise (or) Flat Wise (or) Sale owner (or) Scheme wise")
      //$("#milestone_flat").show();
      return false;
    }
    //if($(this).prop("checked") == true){



    if (validation_status == "blocks") {
      if ($("#BlockId").val() == "") {
        this.flatCondition = false
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

    if ($("#FlatId").val() == "") {
      swal("Please select flat");
      // this.demandNoteSelectionType = "Block Wise";
      this.fltIds = []
      blockidsending = $("#BlockId").val().map(Number)
    } else {
      this.demandNoteSelectionType = "Send Single/Multiple";

      this.fltIds = this.selectedFlatIds

      // this.fltIds = $("#FlatId").val().map(Number)
      blockidsending = []
    }


    // if ($("#FlatId").val() == "") {
    //   this.demandNoteSelectionType = "Block Wise";
    //   this.fltIds = []
    //   this.blkIds = $("#BlockId").val().map(Number)
    // } else {
    //   this.demandNoteSelectionType = "Send Single/Multiple";

    //   this.fltIds = this.selectedFlatIds

    //   // this.fltIds = $("#FlatId").val().map(Number)
    //   this.blkIds = []
    // }

    // if(validation_status == "flats"){
    //   if($("#FlatId").val() == ""){
    //     swal("Please select flat");
    //     return false;
    //   }
    // }
    // if ($("#FlatId").val() == "") {
    //   swal("Please select flat");
    //   return false;
    // }
    //     if ($('#all_blocksId').is(':checked') || $('#Blockwise_Id').is(':checked') || $('#flatwise_Id').is(':checked')) {
    //      if($('#all_blocksId').is(':checked')){
    //      // $("#Blockwise_Id").prop("disabled", true);
    //     // $("#milestone_flat").show();
    //        // alert("alll block checked");
    //        $("#milestone_blocks").hide();
    //        $("#milestone_flat").hide();
    //        $("#BlockId").val("");
    //        $("#FlatId").val("");
    //        validation_status = "all_blocks";
    //        // return false;
    //      }

    //      if($('#Blockwise_Id').is(':checked')){
    //       validation_status = "blocks";
    //      // $("#all_blocksId").prop("disabled", true);
    //      $("#milestone_blocks").show();
    //      $("#milestone_flat").show();
    //       //alert(" block id checked");
    //      // return false;

    //     }

    //     if($('#flatwise_Id').is(':checked')){
    //       validation_status = "flats";
    //      // $("#all_blocksId").prop("disabled", true);
    //    //  $("#milestone_blocks").show();
    //    //  $("#milestone_flat").show();
    //       //alert(" block id checked");
    //      // return false;

    //     }



    // }else{
    //   swal("Please check All Block (or) Block Wise (or) Flat Wise")
    //   //$("#milestone_flat").show();
    //   return false;
    // }
    // //if($(this).prop("checked") == true){
    // //  alert(validation_status);
    // if(validation_status == "blocks"){
    //   //alert($("#BlockId").val())
    //   if($("#BlockId").val() == ""){
    //     swal("Please select block");
    //     return false;
    //    }


    // }

    // if(validation_status == "flats"){
    //   if($("#FlatId").val() == ""){
    //     swal("Please select flat");
    //     return false;
    //   }
    // }
    //return false;

    // -------------------------------


    if (validation_status == "blocks") {
      blockidsending = $("#BlockId").val()
      this.fltIds = []
    } else if (validation_status == "flats") {
      blockidsending = []
      this.fltIds = this.selectedFlatIds
      // flatidsending = $("#FlatId").val().map(Number)
    } else {
      this.fltIds = []
      blockidsending = allBlockIds;

    }

    if (this.controller_data.length == 0) {

      this.isSelectedSaleOwnerWise = "false";
    } else {
      this.isSelectedSaleOwnerWise = "true";
      demandNoteSelectionType = "Block Wise";
    }

    // this.isSelectedSaleOwnerWise = "true";
    // console.log(this.controller_data);

    if (this.fltIds.length != 0) {
      blockidsending = [];
    }


    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/generateDemandNote.spring";
    // console.log("url :" + url);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    var body = {
      "sessionKey": sessionStorage.getItem("login_sessionkey"),
      "finMilestoneClassifidesId": finMilestoneClassifidesId,
      "siteId": $("#projectID").val(),
      "siteName": $('#projectID').select2('data')[0].text,
      "demandNoteDate": new Date($("#demand_note_date").val()).getTime(),
      "isInterestOrWithOutInterest": interestval,
      "condition": "sendEmails",
      "isNewCustomer": "false",
      "demandNoteSelectionType": this.demandNoteSelectionType,
      "isReGenerateDemandNote": "true",
      "isShowGstInPDF": "true",
      "flatIds": this.fltIds,
      "blockIds": blockidsending,
      "financialProjectMileStoneRequests": this.financialProjectMileStoneRequests,
      "requestUrl": "ReGenerateDemandNote",
      "flatSaleOwnerIds": this.controller_data,
      "isSelectedSaleOwnerWise": this.isSelectedSaleOwnerWise,
      "isSelectedSchemeWise": this.isSelectedSchemeWise,
      "finSchemeIds": this.controller_data_scheme
    }


    // console.log(JSON.stringify(body));






    // var body ={			
    //   "sessionKey":"" + sessionStorage.getItem("login_sessionkey"),
    //  "finMilestoneClassifidesId": finMilestoneClassifidesId,
    //  "siteId": $("#projectID").val(),
    //  "siteName": $('#projectID').select2('data')[0].text,
    //  "demandNoteDate":new Date($("#demand_note_date").val()).getTime(),
    //  "isNewCustomer":"false", 
    //  "mileStoneAliasName": mileStoneAliasName,
    //  "statusId": 6,
    //   "isInterestOrWithOutInterest":this.interestval,
    //    "condition":"sendEmails",
    //    "demandNoteSelectionType" : demandNoteSelectionType,
    //    "flatIds": $("#FlatId").val().map(Number),
    //    "blockIds":$("#BlockId").val().map(Number),
    //  "financialProjectMileStoneRequests": this.financialProjectMileStoneRequests,
    //  "isReGenerateDemandNote":"false",
    //   "isShowGstInPDF":"true"
    // }
    // console.log("----body :" + JSON.stringify(body));
    // return false;
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      // console.log("Generate Demand note response----------" + JSON.stringify(resp));
      //this.Blocklinks =  resp;
      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        swal("Re-Generate demand note has been created")
        this.router.navigate(['/view-demand-note'])
        // console.log(this.Blocklinks);
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
    // -------------------------------

  }
  /*---------------------------Final submission End--------------------*/

  /*---------------------------Save submission Start--------------------*/
  Save() {
    // const urll ="http://106.51.38.64:9999/images/sumadhura_projects_images/Financial_Transaction/Demand_Note/111/15-04-2020 13.23.38  DemandNotePdfFiles.zip";

    // swal("Under Development..")
    //return false;
    debugger;
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
    forflatmilestoneIds = []
    this.financialProjectMileStoneRequests = []
    dummyfinmilestoneids = []
    $.each($(".checlist:checked"), function () {




      // console.log($(this).is(":checked"));
      if ($(this).is(":checked") == true) {
        var temp = $(this).attr("id").split('tablerowdata')[1];
        // alert($(this).val());
        let temp_milestoneNo = $(this).val().split('#')[0];
        // console.log("temp1_milestoneNo:" + temp_milestoneNo);
        let temp_percentagesId = $(this).val().split('#')[1];
        // console.log("temp_percentagesId:" + temp_percentagesId);
        let temp_finMilestoneClassifidesId = $(this).val().split('#')[2];
        // console.log("temp_finMilestoneClassifidesId:" + temp_finMilestoneClassifidesId);
        dummyfinmilestoneids.push(temp_finMilestoneClassifidesId)
        let temp_projectMilestoneId = $(this).val().split('#')[3];
        // console.log("temp_projectMilestoneId:" + temp_projectMilestoneId);
        let temp_milestoneDate = $(this).val().split('#')[4];
        let modi_milestoneDate;
        if (temp_milestoneDate == "null") {
          modi_milestoneDate = null;
        } else {
          modi_milestoneDate = temp_milestoneDate;
        }
        // console.log("modi_milestoneDate:" + modi_milestoneDate);
        let temp_milestoneName = $(this).val().split('#')[5];
        // console.log("temp_milestoneName:" + temp_milestoneName);
        let temp_mileStonePercentage = $(this).val().split('#')[6];
        // console.log("temp_mileStonePercentage:" + temp_mileStonePercentage);
        let temp_mileStoneDueDate = $(this).val().split('#')[7];

        let modi_temp_mileStoneDueDate;
        if (temp_mileStoneDueDate == "null") {
          modi_temp_mileStoneDueDate = null;
        } else {
          modi_temp_mileStoneDueDate = temp_mileStoneDueDate;
        }
        // console.log("modi_temp_mileStoneDueDate:" + modi_temp_mileStoneDueDate);
        let temp_statusName = $(this).val().split('#')[8];
        forflatmilestoneIds.push(temp_projectMilestoneId)
        // console.log("temp_statusName:" + temp_statusName);
        // console.log("temp_statusName:" + temp_statusName);
        if (temp_statusName == "Active") {
          mysecondmilestoneId.push(temp_milestoneNo)
          //alert(temp_statusName);
        }


        self.financialProjectMileStoneRequests.push({
          "projectMilestoneId": temp_projectMilestoneId,
          "milestoneName": temp_milestoneName,
          "finMilestoneClassifidesId": temp_finMilestoneClassifidesId,
          "percentagesId": temp_percentagesId,
          "mileStonePercentage": temp_mileStonePercentage,
          "milestoneDate": modi_milestoneDate,
          "mileStoneDueDate": modi_temp_mileStoneDueDate,
          "mileStoneNo": temp_milestoneNo,


        });
        //  console.log(this.financialProjectMileStoneRequests);



      }

      // console.log("ticket ids :"+mychcklist_ticketIdd);
    });

    self.financialProjectMileStoneRequests.push({
      "projectMilestoneId": 0,
      "milestoneName": "Dummy MileStone for Regenerate Demand Note",
      "finMilestoneClassifidesId": dummyfinmilestoneids[0],
      "percentagesId": 1,
      "mileStonePercentage": 12.0,
      "milestoneDate": Date.now(),
      "mileStoneDueDate": Date.now(),
      "mileStoneNo": 0
    });

    if (this.financialProjectMileStoneRequests.length == 1) {
      swal("Please select atleast one milestone");
      return false;
    }
    // console.log("selected-------" + mysecondmilestoneId.length);
    // console.log("all-------" + this.my_milestone_ids);
    // for(var i=0;i<mysecondmilestoneId.length;i++){
    //   if(mysecondmilestoneId[i] != this.my_milestone_ids[i]){
    //     swal("Please select active status should be sequence");
    //     return false;
    //     break;
    //   }

    // }

    if (this.financialProjectMileStoneRequests.length > 0) {
      $(function () {

        $.each($(".checlist:checked"), function () {
          debugger;
          var temp = $(this).attr("id").split('tablerowdata')[1];

          if ($("#completedateselection" + temp).val() == "") {
            swal("Please select complete date");
            // $("#duedateselection"+temp).focus();
            return false;
          }
          if ($("#demandnotedateselection" + temp).val() == "") {
            swal("Please select demand note date");
            //  $("#duedateselection"+temp).focus();
            return false;
          }
          if ($("#duedateselection" + temp).val() == "") {
            swal("Please select due date");
            // $("#duedateselection"+temp).focus();
            return false;
          }

        });
        return false;

      });
    }


    if ($("#demand_note_date").val() == "") {
      // alert("Please select start date");
      swal("Please select demand note date.");
      return false;
    }

    //     if ($('#all_blocksId').is(':checked') || $('#Blockwise_Id').is(':checked') || $('#flatwise_Id').is(':checked')) {
    //      if($('#all_blocksId').is(':checked')){
    //      // $("#Blockwise_Id").prop("disabled", true);
    //     // $("#milestone_flat").show();
    //        // alert("alll block checked");
    //        $("#milestone_blocks").hide();
    //        $("#milestone_flat").hide();
    //        $("#BlockId").val("");
    //        $("#FlatId").val("");
    //        validation_status = "all_blocks";
    //        // return false;
    //      }

    //      if($('#Blockwise_Id').is(':checked')){
    //       validation_status = "blocks";
    //      // $("#all_blocksId").prop("disabled", true);
    //      $("#milestone_blocks").show();
    //      $("#milestone_flat").show();
    //       //alert(" block id checked");
    //      // return false;

    //     }

    //     if($('#flatwise_Id').is(':checked')){
    //       validation_status = "flats";
    //      // $("#all_blocksId").prop("disabled", true);
    //    //  $("#milestone_blocks").show();
    //    //  $("#milestone_flat").show();
    //       //alert(" block id checked");
    //      // return false;

    //     }



    // }else{
    //   swal("Please check All Block (or) Block Wise (or) Flat Wise")
    //   //$("#milestone_flat").show();
    //   return false;
    // }
    //if($(this).prop("checked") == true){
    //  alert(validation_status);

    // if(validation_status == "blocks"){
    //   //alert($("#BlockId").val())
    //   if($("#BlockId").val() == ""){
    //     swal("Please select block");
    //     return false;
    //    }




    // if(validation_status == "flats"){
    //   if($("#FlatId").val() == ""){
    //     swal("Please select flat");
    //     return false;
    //   }
    // }
    // if ($("#FlatId").val() == "") {
    //   swal("Please select flat");
    //   return false;
    // }


    if ($('#Blockwise_Id').is(':checked') || $('#flatwise_Id').is(':checked') || $('#sale_owner').is(':checked')|| $('#scheme_wise').is(':checked')) {

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

    } else {
      swal("Please check Block Wise (or) Flat Wise (or) sale owner (or) scheme wise")
      //$("#milestone_flat").show();
      return false;
    }



    if (validation_status == "blocks") {
      if ($("#BlockId").val() == "") {
        swal("Please select block");
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

    if ($("#FlatId").val() == "") {
      this.demandNoteSelectionType = "Block Wise";
      this.fltIds = []
      blockidsending = $("#BlockId").val().map(Number)
    } else {
      this.demandNoteSelectionType = "Send Single/Multiple";
      this.fltIds = this.selectedFlatIds

      // this.fltIds = $("#FlatId").val().map(Number)
      blockidsending = []
    }
    //return false;


    if (validation_status == "blocks") {
      blockidsending = $("#BlockId").val()
      this.fltIds = []
    } else if (validation_status == "flats") {
      blockidsending = []
      this.fltIds = this.selectedFlatIds
      // flatidsending = $("#FlatId").val().map(Number)
    } else {
      this.fltIds = []
      blockidsending = allBlockIds;

    }

    if (this.controller_data.length == 0) {
      this.controller_data = [];
      this.isSelectedSaleOwnerWise = "false";
    } else {
      this.isSelectedSaleOwnerWise = "true";
      demandNoteSelectionType = "Block Wise";
    }

    if (this.fltIds.length != 0) {
      blockidsending = [];
    }


    // -------------------------------
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/generatedDemandNotePreview.spring";
    // console.log("url :" + url);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    var body = {


      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "financialProjectMileStoneRequests": this.financialProjectMileStoneRequests,
      "siteIds": [$("#projectID").val()].map(Number),
      "isInterestOrWithOutInterest": interestval,
      "flatIds": this.fltIds,
      "blockIds": blockidsending,
      "demandNoteDate": new Date($("#demand_note_date").val()).getTime(),
      "isReGenerateDemandNote": "true",
      "isShowGstInPDF": "true",
      "demandNoteSelectionType": this.demandNoteSelectionType,
      "requestUrl": "ReGenerateDemandNote",
      "flatSaleOwnerIds": this.controller_data,
      "isSelectedSaleOwnerWise": this.isSelectedSaleOwnerWise,
      "isSelectedSchemeWise": this.isSelectedSchemeWise,
      "finSchemeIds": this.controller_data_scheme
    }
    // console.log("----body :" + JSON.stringify(body));
    //return false;
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      // console.log(JSON.stringify(resp));
      //this.Blocklinks =  resp;
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


        // alert(resp.responseObjList[0].url);
        //  window.open(resp.responseObjList[0].url,"_blank"); 


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
  /*---------------------------Save submission End--------------------*/


  /*-----------------------------------Block Link onchange functionalities start----------------*/
  blocksClickEvent(id) {
    $("#milestonediv").show()
    $('.page-loader-wrapper').show();
    status_for_block_links = true;
    // console.log("value :" + id);

    mileStoneAliasName = id.split('$')[0];
    finMilestoneClassifidesId = id.split('$')[1];
    // console.log(finMilestoneClassifidesId)
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
    // http://106.51.38.64:9999/SumadhuraGateway/employeeservice/financial/getMileStoneDemandNoteDetails.spring
    // console.log("url :" + url);
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
    // console.log("----body :" + JSON.stringify(body));
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      //$('.page-loader-wrapper').hide();
      $('#milestonetypeID').html("<option value='select'>--Select--</option>" + "" + "<option value='181'>Regular</option>" + "" + "<option value='182'>Customized</option>");

      $("#milestonetypeID").val(resp.responseObjList[0].milestoneType)
      // console.log("only for table response----------" + JSON.stringify(resp.responseObjList.financialProjectMileStoneResponse));
      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        $("#interestDiv").show();
        $("#allblockdiv").show();
        $("#blockwisediv").show();
        $("#Faltwisediv").show();
        $("#milestone_blocks_tables").show();
        $("#demandnotedatediv").show();
        $("#scheme_wise_div").show();
        //   $("#milestone_blockss").show();
        //   $("#milestone_flats").show();

        $("#sale_owner_div").show();

        // this.hideme_name = false;
        // alert("Response Success")
        this.milestonedemand_details = resp.responseObjList[0].financialProjectMileStoneResponse;
        //alert(this.milestonedemand_details.length);
        for (var i = 0; i < this.milestonedemand_details.length; i++) {
          // debugger;
          if (this.milestonedemand_details[i].statusName == "Active") {
            this.my_milestone_ids.push(this.milestonedemand_details[i].mileStoneNo)
          }

        }

        $(function () {
          var milestonedemand_details = resp.responseObjList[0].financialProjectMileStoneResponse;
          for (var i = 0; i < milestonedemand_details.length; i++) {
            // debugger;
            $('#duedateselection' + (i + 1)).bootstrapMaterialDatePicker({
              format: 'YYYY-MM-DD',
              minDate: new Date(),
              clearButton: true,
              weekStart: 1,
              time: false
            });

            $('#demandnotedateselection' + (i + 1)).bootstrapMaterialDatePicker({
              format: 'YYYY-MM-DD',
              minDate: new Date(),
              clearButton: true,
              weekStart: 1,
              time: false
            });

            $('#completedateselection' + (i + 1)).bootstrapMaterialDatePicker({
              format: 'YYYY-MM-DD',
              minDate: new Date(),
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
        //alert(error);
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
    // console.log("url :" + url);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "finMilestoneClassifidesId": cid,
      "siteId": sid,
      "mileStoneAliasName": mname,
      "siteName": sname,

    }
    // console.log("----body :" + JSON.stringify(body));
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      //$('.page-loader-wrapper').hide();
      // console.log("Blocks and flats response----------" + JSON.stringify(resp));
      if (resp.responseCode == 200) {

        // console.log(resp)
        $('.page-loader-wrapper').hide();
        $('#BlockId').html('');
        // $('#BlockId').append("<option value='select'>--Select--</option>");
        for (var i = 0; i < resp.responseObjList[0].mappingBlocksResponse.length; i++) {

          allBlockIds.push(Number(resp.responseObjList[0].mappingBlocksResponse[i].blockId));

          $('#BlockId').append("<option value='" + resp.responseObjList[0].mappingBlocksResponse[i].blockId + "'>" + resp.responseObjList[0].mappingBlocksResponse[i].blockName + "</option>");
          //	$('#projectID').formSelect();
        }

        // $('#FlatId').html();
        // $('#FlatId').append("<option value='select'>--Select--</option>");
        // console.log(resp.responseObjList[0].flatsResponse.length);
        // for (var i = 0; i < resp.responseObjList[0].flatsResponse.length; i++) {
        //   $('#FlatId').append("<option value='" + resp.responseObjList[0].flatsResponse[i].flatId + "'>" + resp.responseObjList[0].flatsResponse[i].flatNo + "</option>");
        //   //	$('#projectID').formSelect();
        // }
        // $('#FlatId').html();
        // $('#FlatId').append("<option value='select'>--Select--</option>");
        // console.log(resp.responseObjList[0].flatsResponse.length);
        // for (var i = 0; i < resp.responseObjList[0].flatsResponse.length; i++) {
        //   this.flatwiseselect = resp.responseObjList[0].flatsResponse
          // console.log(this.flatwiseselect)
        //   //   $('#FlatId').append("<option value='" + resp.responseObjList[0].flatsResponse[i].flatId + "'>" + resp.responseObjList[0].flatsResponse[i].flatNo + "</option>");
        //   //   //	$('#projectID').formSelect();
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
  /*--------------------------Blocks and flats dropdown functionality End------------------*/
  flat_list(blockId) {

    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/getCustomerDetailsAndPendingAmounts.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "projectMileStoneIds": forflatmilestoneIds.map(Number),
      // "blockIds": $('#BlockId').val().map(Number)
      "blockIds": blockId

    }
    // console.log(body);
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      if (resp.responseCode == 200) {
        // console.log(resp)
        $('.page-loader-wrapper').hide();

        // $('#FlatId').html();
        // $('#FlatId').append("<option value='select'>--Select--</option>");
        // console.log(resp.responseObjList.length);
        // for (var i = 0; i < resp.responseObjList.length; i++) {
        //   $('#FlatId').append("<option value='" + resp.responseObjList[i].flatId + "'>" + resp.responseObjList[i].pendingAmountDetails + "</option>");
        //   //	$('#projectID').formSelect();
        // }
        this.flatwiseselect = resp.responseObjList


        setTimeout(() => {
          this.cdr.detectChanges();
        }, 0);
    
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

  /*-----------------------------------Zip file delete start ----------------------------*/
  DeleteCurrentZipfile(zipfile) {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/deleteDemandNoteZipFile.spring";
    // localhost:8082/SumadhuraGateway/employeeservice/financial/deleteDemandNoteZipFile.spring
    // console.log("url :" + url);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "fileInfos": [{
        "filePath": zipfile,
        "url": ""
      }]

    }
    // console.log("----body :" + JSON.stringify(body));
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      //$('.page-loader-wrapper').hide();
      // console.log("Zip file delete response----------" + JSON.stringify(resp));
      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        // console.log("Zip File Deleted From Server")
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
  /*-----------------------------------Zip file delete End----------------------------*/
  homeClick() {
    this.cmn.commonHomeNavigation();
  }



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
      "requestUrl":"demandNote",
      "finMilestoneClassifidesId":finMilestoneClassifidesId

    }
    // console.log(body);

    this.http.post(url, body, options).map(res => res.json()).subscribe((resp:any) => {

      // console.log(resp);
      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        this.userForm.reset();
        // this.hideme_name = true;
        this.employee_list = [];
        this.employee_list = resp.responseObjList || [];
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


  openFlatWisePopup() {
    if ($("#BlockId").val() && $("#BlockId").val().length > 0) {
      this.openModal();
    } else {

      swal("Please select Block");
      $("#flatwise_Id").prop("checked", false);
      this.selectAllFlatsCheckbox = false;
    }
  }

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

  
  toggleAllFlats() {
    // Toggle the state of individual checkboxes based on the state of "Flat Wise" checkbox
    this.flatwiseselect.forEach(item => item.checked = this.selectAllFlatsCheckbox);
  }
  get_scheme_wise_list(allBlockIds, saleownwerdata) {

    // console.log(allBlockIds);

if(saleownwerdata == ""){
  saleownwerdata = null
}else{
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
      "requestUrl":"demandNote",
      "finMilestoneClassifidesId":finMilestoneClassifidesId

    }
    // console.log("shemewise reqest"+ JSON.stringify(body));

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      // console.log("shemewise response"+ JSON.stringify(resp));
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
}
