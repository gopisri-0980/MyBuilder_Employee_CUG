import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { RequestOptions, Headers, Http } from '@angular/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validator, FormControl, Validators, ValidatorFn } from '@angular/forms';
import * as moment from 'moment';
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
var flatidsending
var siteId;

@Component({
  selector: 'app-update-milestone-due-dates',
  templateUrl: './update-milestone-due-dates.component.html',
  styleUrls: ['./update-milestone-due-dates.component.sass']
})
export class UpdateMilestoneDueDatesComponent implements OnInit {
 
  showhidediv : boolean=false;

  Blocklinks: any;
  milestonedemand_details: any;
  financialProjectMileStoneRequests: any = [];
  interestval: any;
  milestoneAlias: any;
  my_milestone_ids: any = [];
  temp: any;
  project_list_item: Array<any> = [];
  project_list_item2: Array<any> = [];
  project_list_item3: Array<any> = [];
  selected_projectid_name: Array<any> = [];
  itemscc: Array<any> = [];
  title1: any;
  Projected_wise_data: Array<any> = [];
  userForm: FormGroup;
  singledd1 = {};
  
  project_wise_project: Array<any> = [];
  flat_wise_project: Array<any> = [];
  title2: any;
  title3: any;
  floor_wise_data: Array<any> = [];
  flat_wise_data: Array<any> = [];
  singledd2 = {};
  singledd3 = {};
  floor_wise_project: Array<any> = [];
  floor_wise_project3: Array<any> = [];
  project_binding : any
 // dates_show_hide : boolean = true;
  temp_fromdate: any;
  temp_todate: any;
  fg: FormGroup;
  constructor(private cmn: CommonComponent, private http: Http, private router: Router,public fb: FormBuilder) {

    $('.page-loader-wrapper').hide();
    $(function(){
      $("#divforhide").show()
      });
    this.milestoneAlias = mileStoneAliasName
    this.interestval = "With Out Interest";
    sessionStorage.setItem("interestval", this.interestval);
    this.siteList();
    this.userForm = this.fb.group({
      project_wise_form: [''],
      floor_wise_form: [''],
      flat_wise_form: [''],
    });

    this.singledd1 = {
      singleSelection: false,
      enableSearchFilter: true,
      searchPlaceholderText: 'Search',
      classes: 'my_dropdown1',
      unSelectAllText: 'UnSelect All',
      // lazyLoading: true,
    };

    this.singledd2 = {
      singleSelection: false,
      enableSearchFilter: true,
      searchPlaceholderText: 'Search',
      classes: 'my_dropdown1',
      unSelectAllText: 'UnSelect All',
      // lazyLoading: true,
    };

    this.singledd3 = {
      singleSelection: false,
      enableSearchFilter: true,
      searchPlaceholderText: 'Search',
      classes: 'my_dropdown1',
      unSelectAllText: 'UnSelect All',
      // lazyLoading: true,
    };

  }

  startdatefun() {
    $("#fromDate").val("");

  //  sessionStorage.removeItem("complete_back_fromdate");


  }

  endtimefun() {
    $("#toDate").val("");
  //  sessionStorage.removeItem("complete_back_todate");

  }

  ngOnInit() {
  
    $("input").on("change", function () {
      this.setAttribute(
        "data-date",
        moment(this.value, "DD-MM-YYYY")
          .format(this.getAttribute("data-date-format"))
      )
    }).trigger("change")

    this.fg = new FormGroup(
      {
        from: new FormControl(""),
        to: new FormControl("")
      },
      [Validators.required, this.dateRangeValidator]
    );

   
    var self = this;
  
$(function(){
  $('#frmdate').bootstrapMaterialDatePicker({
    format: 'YYYY-MM-DD',
    //minDate: new Date(),
      maxDate: new Date(),
    clearButton: true,
    weekStart: 1,
    time: false,
  });

  $('#frmdate').bootstrapMaterialDatePicker({ weekStart: 0, time: false }).on('change', function (e, date) {
 //   alert("test")
//  var startdate = $('#frmdate').val();
//  var endDate = $('#toDate').val();
//  if (new Date(startdate) > new Date(endDate)) {
//    swal('To Date should be greater than or equal to From Date');
//    return false;
//  }
   $("#floor_flatID").hide()
   $("#ordiv").hide()
   
  });
  
  $('#todate').bootstrapMaterialDatePicker({
    format: 'YYYY-MM-DD',
   // minDate: new Date(),
     maxDate: new Date(),
    clearButton: true,
    weekStart: 1,
    time: false,
  });

  $('#todate').bootstrapMaterialDatePicker({ weekStart: 0, time: false }).on('change', function (e, date) {
   // alert("test")
  //  var startdate = $('#fromDate').val();
  //   var endDate = $('#toDate').val();
  //   if (new Date(startdate) > new Date(endDate)) {
  //     swal('To Date should be greater than or equal to From Date');
  //     return false;
  //   }
   $("#floor_flatID").hide()
   $("#ordiv").hide()
  });

  // $('#fromDate').on('change', function(e, date) {
  //   console.log("its working dara")
  //   //  var maxDate = $('#fromDate').val();
  //   //  alert("ok")
  //   //  $("#fistdaterow").css("display","block")
  //   // $("#floor_flatID").css("display", "none")
  //   // $("#fromDate2").val("")
  //   // $("#toDate2").val("")
  //  // $("#floor_flatID").hide()
  // });

  // $('#toDate').change(function () {
  //   var startdate = $('#fromDate').val();
  //   var endDate = $('#toDate').val();
  //   if (new Date(startdate) > new Date(endDate)) {
  //     swal('To Date should be greater than or equal to From Date');
  //     return false;
  //   }
  //   $("#floor_flatID").hide()
   
  // });

})
   

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
        if ($(this).prop("checked") == true) {
          demandNoteSelectionType = "All Blocks";
          $("#Blockwise_Id").prop("checked", false);
          $("#flatwise_Id").prop("checked", false);
          $("#milestone_blocks").hide();
          $("#milestone_flat").hide();
        } else {

        }
      });

      $('#Blockwise_Id').click(function () {
        if ($(this).prop("checked") == true) {
          demandNoteSelectionType = "Block Wise";
          $("#all_blocksId").prop("checked", false);
          $("#flatwise_Id").prop("checked", false);
          $("#milestone_blocks").show();
          $("#milestone_flat").hide();
        } else {
        }
      });

      $('#flatwise_Id').click(function () {
        if ($(this).prop("checked") == true) {
          demandNoteSelectionType = "Send Single/Multiple";
          $("#all_blocksId").prop("checked", false);

          $("#Blockwise_Id").prop("checked", false);
          $("#milestone_blocks").hide();
          $("#milestone_flat").show();
        } else {

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

      $("#FlatId").select2({
        placeholder: "Search Flat",
        dir: "ltl"
      });

      $('#projectID').change(function (e) {
        console.log(e)
        var siteId = $(e.target).val();
        var text = $('#projectID').select2('data')[0].text
        $("#test").html(text)
       // alert(text)
       self.project_binding = text;
      
       
        if (siteId == "select") {
          $("#blockslinksid").hide()
          $("#milestone_blocks_tables").hide()
          $("#demandnotedatediv").hide()
          $("#allblockdiv").hide()
          $("#blockwisediv").hide()
          $("#Faltwisediv").hide()
          $("#milestone_blocks").hide()
          $("#milestone_flat").hide()
          $("#interestDiv").hide();
        } else {
          self.blockLinks(siteId);
        }
      });

      $('#BlockId').change(function (e) {
        var blockId = $(e.target).val();
        // self.flat_list(blockId);
      })
    })
  }
  /*-----------------Getting Project(site) list Start---------------------*/
  siteList() {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/raisedMilestoneSites.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "actionUrl": "Update Due Note"
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
  update_dates() {
    console.log($("#frmdate").val())
    console.log($("#todate").val())
    console.log(this.Projected_wise_data)
    console.log(this.floor_wise_data)
    console.log(this.flat_wise_data)
    if ($("#projectID").val() == "select") {
      swal("Please select project");
      return false;
    }

    if (status_for_block_links == undefined) {
      swal("Please click any link");
      return false;
    }



    var self = this;
    mysecondmilestoneId = []
    mystusnames = []
    // if(this.financialProjectMileStoneRequests.length == 0){
    // alert("please check");
    // return false;
    // }
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
          "rowId":""+temp
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


//alert(this.financialProjectMileStoneRequests.length)

    if (this.financialProjectMileStoneRequests.length > 0) {
      for (var i = 0; i < this.financialProjectMileStoneRequests.length; i++) {
        // alert(this.financialProjectMileStoneRequests[i].rowId)
        // alert($("#completedateselection" +this.financialProjectMileStoneRequests[i].rowId))
         if ($("#completedateselection" +this.financialProjectMileStoneRequests[i].rowId).val() == "") {
         //  temp_chequedepositDate = null;
           swal("Please select completed date");
           return false;
         }
 
        //  if ($("#demand_note_date" +this.financialProjectMileStoneRequests[i].rowId).val() == "") {
        //    //  temp_chequedepositDate = null;
        // //     swal("Please select demand note date");
        //   //   return false;
        //    }
 
           if ($("#duedateselection" +this.financialProjectMileStoneRequests[i].rowId).val() == "") {
             //  temp_chequedepositDate = null;
               swal("Please select due date");
               return false;
             }
      
       }
     


    }



    if (this.Projected_wise_data.length == 0) {
        swal("Please select block");
        return false;
      }


    

    if (this.floor_wise_data.length != 0) {
    
    }else{
      this.floor_wise_data = []
      if ($("#fromDate").val() == '') {
       swal("Please select booking from date");
       return false;
      }
       
      if ($("#toDate").val() == '') {
       swal("Please select booking to date");
       return false;
      }
 
    }



    if (this.flat_wise_data.length != 0) {
      
      
      }else{
        this.flat_wise_data = []
        if ($("#fromDate").val() == '') {
          swal("Please select booking from date");
          return false;
         }
          
         if ($("#toDate").val() == '') {
          swal("Please select booking to date");
          return false;
         }
      }

      if ($("#fromDate").val() == '') {
        // swal("Please select from date")
        // return false;
      this.temp_fromdate = null
      }else{
        this.temp_fromdate = new Date($("#frmdate").val()).getTime()
      }


      if ($("#toDate").val() == '') {
        // swal("Please select from date")
        // return false;
      this.temp_todate = null
      }else{
     
    
        this.temp_todate = new Date($("#todate").val()).getTime()
      }

      console.log($("#frmdate").val())
      console.log($("#todate").val())
      console.log(this.Projected_wise_data)
      console.log(this.floor_wise_data)
      console.log(this.flat_wise_data)



      if($("#frmdate").val() != "" || $("#todate").val() != ""){
        if($("#frmdate").val() == ""){
          swal("Please select from date")
          return false;
        }
        if($("#todate").val() == ""){
          swal("Please select to date")
          return false;
        }
        new Date($("#todate").val()).getTime(),
        this.temp_todate = new Date($("#frmdate").val()).getTime()
        this.temp_todate = new Date($("#todate").val()).getTime()

        
        
      }else{
        this.temp_fromdate = null
        this.temp_todate = null
        // if(this.floor_wise_data.length == 0){
        //   swal("Please select floors")
        //   return false;
        // }
        // if(this.flat_wise_data.length == 0){
        //   swal("Please select flat")
        //   return false;
        // }
       
      }

      // if($("#todate").val() != ""){
     
      //   this.temp_todate = $("#todate").val()
      // }else{
      //   this.temp_todate = null
      //   if(this.floor_wise_data.length == 0){
      //     swal("Please select floors")
      //     return false;
      //   }
      //   if(this.flat_wise_data.length == 0){
      //     swal("Please select flat")
      //     return false;
      //   }
      
      // }
    
      // if( this.temp_todate < this.temp_todate){
      //   swal("Fromdate date should be greater than to date")
      //   return false;
      // }

   // return false;

    // -------------------------------

    if (confirm("Are you sure to submit ?")) {
      this.final_submission_sendToCustomer();
    } else { }


    // -------------------------------

  }


  final_submission_sendToCustomer() {
    // if (validation_status == "blocks") {
    //   blockidsending = $("#BlockId").val()
    //   flatidsending = []
    // } else if (validation_status == "flats") {
    //   blockidsending = []
    //   flatidsending = $("#FlatId").val().map(Number)
    // } else {
    //   flatidsending = []
    //   blockidsending = allBlockIds;

    // }
    this.financialProjectMileStoneRequests.push({
      "projectMilestoneId": 0,
      "milestoneName": "Dummy MileStone for Regenerate Demand Note",
      "finMilestoneClassifidesId": "1",
      "percentagesId": 1,
      "mileStonePercentage": 12,
      "milestoneDate": 1689753842459,
      "mileStoneDueDate": 1689753842459,
      "mileStoneNo": 0,
      "demandNoteDate": 1689753842459
  });
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/editAllDemandNoteDetails.spring";
   // http://localhost:8888/SumadhuraGateway/employeeservice/financial/editAllDemandNoteDetails.spring

console.log("url :"+url)
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

   

    var body = {
      // "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      // "finMilestoneClassifidesId": finMilestoneClassifidesId,
      // "siteId": $("#projectID").val(),
      // "siteName": $('#projectID').select2('data')[0].text,
      // //"demandNoteDate": new Date($("#demand_note_date").val()).getTime(),
      // "isNewCustomer": "false",
      // "mileStoneAliasName": mileStoneAliasName,
      // "statusId": 6,
      // "isInterestOrWithOutInterest": sessionStorage.getItem("interestval"),
      // "condition": "sendEmails",
      // "demandNoteSelectionType": demandNoteSelectionType,
      // "flatIds": flatidsending,
      // "blockIds": blockidsending,

      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "finMilestoneClassifidesId": finMilestoneClassifidesId,
      "siteId": $("#projectID").val(),
      "siteName": $('#projectID').select2('data')[0].text,
      "isInterestOrWithOutInterest": "With Out Interest",
      "demandNoteSelectionType": "Send Single/Multiple",
      "isThisUpdateDemandNote": "true",
      "requestUrl": "ViewCustomerData",
      "floorDetIds": this.floor_wise_data,
      "blockIds": this.Projected_wise_data,
      "flatIds":this.flat_wise_data,
      "startDate":  this.temp_fromdate,
      "endDate":  this.temp_todate,
      "financialProjectMileStoneRequests": this.financialProjectMileStoneRequests,
     
    }

   console.log(JSON.stringify(body))



    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      console.log(JSON.stringify(resp))

      $('.page-loader-wrapper').hide();
      //this.Blocklinks =  resp;
      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        swal(resp.description)
       // this.router.navigate(['/view-demand-note'])
       location.reload()
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





  /*-----------------------------------Block Link onchange functionalities start----------------*/
  blocksClickEvent(id) {
    this.userForm.patchValue({
      project_wise_form: [],
      floor_wise_form : [],
      flat_wise_form : []

    });
    $("#frmdate").val("")
    $("#todate").val("")
    $("#showhidediv").show()
    this.showhidediv =true;
    $('.page-loader-wrapper').show();
    status_for_block_links = true;
    mileStoneAliasName = id.split('$')[0];
    finMilestoneClassifidesId = id.split('$')[1];
    this.milestoneAlias = mileStoneAliasName
    siteId = id.split('$')[2];
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
     
      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        $("#interestDiv").show();
        $("#allblockdiv").show();
        $("#blockwisediv").show();
        $("#Faltwisediv").show();
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
            //  minDate: new Date(minimumdate),
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
    let url = this.cmn.commonUrl + "financial/getBlocksFloorFlatsByAliasNameAssociatedWithSite.spring";
   // http://localhost:8888/SumadhuraGateway/employeeservice/financial/getBlocksFloorFlatsByAliasNameAssociatedWithSite.spring

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
     console.log("----------"+JSON.stringify(resp))
      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        $('#BlockId').html('');
        allBlockIds = []
        this.project_wise_project = resp.responseObjList[0].mappingBlocksResponse;
        this.project_wise_project.forEach((o: any, i) => 
        (o.id = o.blockId));


        this.floor_wise_project = resp.responseObjList[0].mappingFloorResponse;
        this.floor_wise_project.forEach((o: any, i) => 
        (o.id = o.floorDetId));

        this.flat_wise_project = resp.responseObjList[0].flatsResponse;
        this.flat_wise_project.forEach((o: any, i) => 
        (o.id = o.flatId));
        
        // for (var i = 0; i < resp.responseObjList[0].mappingBlocksResponse.length; i++) {
        //   allBlockIds.push(resp.responseObjList[0].mappingBlocksResponse[i].blockId);
        //   $('#BlockId').append("<option value='" + resp.responseObjList[0].mappingBlocksResponse[i].blockId + "'>" + resp.responseObjList[0].mappingBlocksResponse[i].blockName + "</option>");
        // }

        // $('#FlatId').html('');
        // for (var i = 0; i < resp.responseObjList[0].flatsResponse.length; i++) {
        //   $('#FlatId').append("<option value='" + resp.responseObjList[0].flatsResponse[i].flatId + "'>" + resp.responseObjList[0].flatsResponse[i].flatNo + "</option>");
        // }
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
  onSelectAll(item: any) {
    this.Projected_wise_data = [];
    this.project_list_item = [];
    for (var i = 0; i < this.title1.length; i++) {
      this.Projected_wise_data.push(this.title1[i].blockId);
      this.project_list_item.push({
        blockName: this.title1[i].blockName,
        blockId: this.title1[i].blockId
      });

    }



  }


  onSelectAll2(item: any) {
    this.floor_wise_data = [];
    this.project_list_item2 = [];
    for (var i = 0; i < this.title2.length; i++) {
      this.floor_wise_data.push(this.title2[i].floorDetId);
      this.project_list_item2.push({
        floorName: this.title2[i].floorName,
        floorDetId: this.title2[i].floorDetId
      });

    }

  }

  onSelectAll3(item: any) {
    this.flat_wise_data = [];
    this.project_list_item3 = [];
    for (var i = 0; i < this.title3.length; i++) {
      this.flat_wise_data.push(this.title3[i].flatId);
      this.project_list_item3.push({
        flatNo: this.title3[i].flatNo,
        flatId: this.title3[i].flatId
      });

    }

  }

  onItemDeSelect(item: any) {
    this.Projected_wise_data = [];
    this.project_list_item = [];
    for (var i = 0; i < this.title1.length; i++) {
      this.Projected_wise_data.push(this.title1[i].blockId);
      this.project_list_item.push({
        blockName: this.title1[i].blockName,
        blockId: this.title1[i].blockId
      });

    }

  }

  onItemDeSelect2(item: any) {
    this.floor_wise_data = [];
    this.project_list_item2 = [];
    for (var i = 0; i < this.title2.length; i++) {
      this.floor_wise_data.push(this.title2[i].floorDetId);
      this.project_list_item2.push({
        floorName: this.title2[i].floorName,
        floorDetId: this.title2[i].floorDetId
      });

    }

  }

  onItemDeSelect3(item: any) {
    this.flat_wise_data = [];
    this.project_list_item3 = [];
    for (var i = 0; i < this.title3.length; i++) {
      this.flat_wise_data.push(this.title3[i].flatId);
      this.project_list_item3.push({
        flatNo: this.title3[i].flatNo,
        flatId: this.title3[i].flatId
      });

    }

  }

  onDeSelectAll(item: any) {
    this.Projected_wise_data = [];
    this.project_list_item = [];

 
  }

  onDeSelectAll2(item: any) {
    this.floor_wise_data = [];
    this.project_list_item2 = [];

 
  }

  onDeSelectAll3(item: any) {
    this.flat_wise_data = [];
    this.project_list_item3 = [];

 
  }
  selectedSIDs(item: any) {
    
    this.Projected_wise_data = [];
    this.project_list_item = [];
    for (var i = 0; i < this.title1.length; i++) {
      this.Projected_wise_data.push(this.title1[i].blockId);
      this.project_list_item.push({
        blockName: this.title1[i].blockName,
        blockId: this.title1[i].blockId
      });

    }
  }

  selectedSIDs2(item: any) {
   

    
    this.floor_wise_data = [];
    this.project_list_item2 = [];
    for (var i = 0; i < this.title2.length; i++) {
      this.floor_wise_data.push(this.title2[i].floorDetId);
      this.project_list_item2.push({
        floorName: this.title2[i].floorName,
        floorDetId: this.title2[i].floorDetId
      });

    }
  }

  selectedSIDs3(item: any) {
    
    this.flat_wise_data = [];
    this.project_list_item3 = [];
    for (var i = 0; i < this.title3.length; i++) {
      this.flat_wise_data.push(this.title3[i].flatId);
      this.project_list_item3.push({
        flatNo: this.title3[i].flatNo,
        flatId: this.title3[i].flatId
      });

    }
  }

  getToday(): string {
    return new Date().toISOString().split('T')[0]
  }
  public onChange1(event): void {
    console.log(event)
    if(event.length == 0){

    }else{
      this.Projected_wise_data = [];
      this.project_list_item = [];
      for (var i = 0; i < event.length; i++) {
        this.Projected_wise_data.push(event[i].blockId);
        this.project_list_item.push({
          blockName: event[i].blockName,
          blockId: event[i].blockId
        });
  
       }
      console.log(this.Projected_wise_data)
     // console.log(this.title1)
      this.blockOnchange_getfloors();
    }
    //console.log(this.title1);
 
  // console.log(this.Projected_wise_data)
   
  }

  onChange2(event){
   
 
    
      
    console.log(event)
    if(event.length == 0){

    }else{
      $("#divforhide").hide()
      this.floor_wise_data = [];
      this.project_list_item2 = [];
      for (var i = 0; i < event.length; i++) {
        this.floor_wise_data.push(event[i].floorDetId);
        this.project_list_item2.push({
          floorName: event[i].floorName,
          floorDetId: event[i].floorDetId
        });
  
      
       }
      console.log(this.floor_wise_data)
     // console.log(this.title1)
      this.floorOnchange_getflats();
    }
    //console.log(this.title1);
 
  // console.log(this.Projected_wise_data)
   
  }

  onChange3(event){
    if(event.length == 0){

    }else{
      this.flat_wise_data = [];
      this.project_list_item3 = [];
      for (var i = 0; i < event.length; i++) {
        this.flat_wise_data.push(event[i].flatId);
        this.project_list_item3.push({
          flatName: event[i].flatName,
          flatId: event[i].flatId
        });
  
      
       }
      console.log(this.flat_wise_data)
      $("#divforhide").hide()
    }
  }
  blockOnchange_getfloors(){
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/getFloorFlatsByAliasNameAssociatedWithSite.spring";
  //  http://localhost:8888/SumadhuraGateway/employeeservice/financial/getFloorFlatsByAliasNameAssociatedWithSite.spring
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
   
    "finMilestoneClassifidesId": finMilestoneClassifidesId,
    "siteId": siteId,
    "mileStoneAliasName": mileStoneAliasName,
    "blockIds": this.Projected_wise_data,
  //  "siteName": "Folium by Sumadhura Phase 1"
}
console.log("body----------"+JSON.stringify(body))
// mileStoneAliasName = id.split('$')[0];
// finMilestoneClassifidesId = id.split('$')[1];
// this.milestoneAlias = mileStoneAliasName
// var siteId = id.split('$')[2];
// var siteName = id.split('$')[3];

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
     console.log("----------"+JSON.stringify(resp))
      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        // $('#BlockId').html('');
        // allBlockIds = []
        // this.project_wise_project = resp.responseObjList[0].mappingBlocksResponse;
        // this.project_wise_project.forEach((o: any, i) => 
        // (o.id = o.blockId));

        this.floor_wise_project = []
        this.floor_wise_project = resp.responseObjList[0].mappingFloorResponse;
        this.floor_wise_project.forEach((o: any, i) => 
        (o.id = o.floorDetId));

        // this.flat_wise_project = resp.responseObjList[0].flatsResponse;
        // this.flat_wise_project.forEach((o: any, i) => 
        // (o.id = o.flatId));
        
        // for (var i = 0; i < resp.responseObjList[0].mappingBlocksResponse.length; i++) {
        //   allBlockIds.push(resp.responseObjList[0].mappingBlocksResponse[i].blockId);
        //   $('#BlockId').append("<option value='" + resp.responseObjList[0].mappingBlocksResponse[i].blockId + "'>" + resp.responseObjList[0].mappingBlocksResponse[i].blockName + "</option>");
        // }

        // $('#FlatId').html('');
        // for (var i = 0; i < resp.responseObjList[0].flatsResponse.length; i++) {
        //   $('#FlatId').append("<option value='" + resp.responseObjList[0].flatsResponse[i].flatId + "'>" + resp.responseObjList[0].flatsResponse[i].flatNo + "</option>");
        // }
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

  floorOnchange_getflats(){
    if(this.Projected_wise_data.length == 0){
      this.userForm.patchValue({
      //  project_wise_form: [],
        floor_wise_form : [],
       // flat_wise_form : []
  
      });
      swal("Please select blocks")
       return false;
    }

    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/getFlatsByAliasNameAssociatedWithSite.spring";
    //http://localhost:8888/SumadhuraGateway/employeeservice/financial/getFlatsByAliasNameAssociatedWithSite.spring
        let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
   
    "finMilestoneClassifidesId": finMilestoneClassifidesId,
    "siteId": siteId,
    "mileStoneAliasName": mileStoneAliasName,
    "blockIds": this.Projected_wise_data,
  "floorIds": this.floor_wise_data,
  //  "siteName": "Folium by Sumadhura Phase 1"
}
console.log("body----------"+JSON.stringify(body))
// mileStoneAliasName = id.split('$')[0];
// finMilestoneClassifidesId = id.split('$')[1];
// this.milestoneAlias = mileStoneAliasName
// var siteId = id.split('$')[2];
// var siteName = id.split('$')[3];

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
     console.log("----------"+JSON.stringify(resp))
      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        
        this.flat_wise_project = []
        this.flat_wise_project = resp.responseObjList[0].flatsResponse;
        this.flat_wise_project.forEach((o: any, i) => 
        (o.id = o.flatId));
        
        // for (var i = 0; i < resp.responseObjList[0].mappingBlocksResponse.length; i++) {
        //   allBlockIds.push(resp.responseObjList[0].mappingBlocksResponse[i].blockId);
        //   $('#BlockId').append("<option value='" + resp.responseObjList[0].mappingBlocksResponse[i].blockId + "'>" + resp.responseObjList[0].mappingBlocksResponse[i].blockName + "</option>");
        // }

        // $('#FlatId').html('');
        // for (var i = 0; i < resp.responseObjList[0].flatsResponse.length; i++) {
        //   $('#FlatId').append("<option value='" + resp.responseObjList[0].flatsResponse[i].flatId + "'>" + resp.responseObjList[0].flatsResponse[i].flatNo + "</option>");
        // }
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
 }

