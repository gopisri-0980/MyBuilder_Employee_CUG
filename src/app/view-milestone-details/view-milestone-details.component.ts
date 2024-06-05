import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { RequestOptions, Http } from '@angular/http';
import { Router } from '@angular/router';
declare const $: any;
declare const swal:any;
var selected_projectid;
var status_for_block_links:boolean;
var mileStoneAliasName;
var finMilestoneClassifidesId
var siteId
@Component({
  selector: 'app-view-milestone-details',
  templateUrl: './view-milestone-details.component.html',
  styleUrls: ['./view-milestone-details.component.sass']
})
export class ViewMilestoneDetailsComponent implements OnInit {

  controller: Array<any> = [];
  controller_main: Array<any> = [];

  selectedSiteID: any;
  availableAliasNames: any;
  milestonedemand_details: any;
  isSelected: boolean;
  aliasfinanceID: any;
  milestoneAlias: any;
  financialProjectMileStoneRequests: any =[];
  statusIdd: any;
  tempitem: any;
  deptid : any;
  completed_date_temp : any;
  masterDemandNotedate_temp : any;
  mileStoneDueDate_temp : any;

  constructor(private cmn: CommonComponent, private http: Http, private router: Router) {
    $('.page-loader-wrapper').hide();
    this.siteList();
    sessionStorage.setItem('fromviewpagepredefined', null);
    this.deptid = sessionStorage.getItem("session_deptid");
  }

  ngOnInit() {
    var self = this;

    $("#projectID").select2({
      placeholder: "Select Project",
      dir: "ltl",
    });
    $("#statusnameId3").select2({
      placeholder: "Select Status",
      dir: "ltl",
    });

    $("#milestonetypeID").select2({
      placeholder: "Select Status",
      dir: "ltl",
    });

    
    
    $(function(){
      $('#projectID').change(function(e){
        selected_projectid = $(e.target).val();
        
      
        $('#blocksID').show();
        $('#aliasNameID').show();
        $('#totalTableID').show();
        $('#submitButtonID').show();
        $("#milestone_blocks_tables").hide();


        if($('#projectID').val() == "select"){
          swal("please select the site");
          return false;
        }

        if(selected_projectid == ""){
           
        }else{
          self.aliasNamesFun(selected_projectid);
        }
      })
    })

  }

  /*-----------------Getting Project(site) list Start---------------------*/
 siteList() {
  $('.page-loader-wrapper').show();

  let url = this.cmn.commonUrl + "financial/raisedMilestoneSites.spring";
  console.log("url :" + url);

  let headers = new Headers({ 'Content-Type': 'application/json' });
  //let options = new RequestOptions({ headers: headers });

  var body = {
    "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
    "actionUrl" : "View Milestones"
  }
  console.log("raisedMilestoneSites body :" + JSON.stringify(body));

  this.http.post(url, body).map(res => res.json()).subscribe(resp => {
    $('.page-loader-wrapper').hide();
    console.log("Site list response----------" + JSON.stringify(resp));
    if(resp.responseCode == 200){
     // var Options = "";  
      for (var i = 0; i < resp.responseObjList.length; i++) {
        $('#projectID').append("<option value='" + resp.responseObjList[i].siteId + "'>" + resp.responseObjList[i].siteName + "</option>");
      }
    }else if(resp.responseCode ==440){
      swal("Your Session has been Timed Out!", "Please login once again.", "error");
      this.router.navigate([""]);
    }else{
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

/*------------------------Alias name availability Functionality Start--------------------*/
aliasNamesFun(selected_projectid) {
  this.selectedSiteID = selected_projectid
  $('.page-loader-wrapper').show();

  let url = this.cmn.commonUrl + "financial/getMileStoneSetsDtls.spring";
  console.log("url :" + url);

  let headers = new Headers({ 'Content-Type': 'application/json' });
 // let options = new RequestOptions({ headers: headers });

  var body = {
    "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
    "siteId": "" + this.selectedSiteID
  }
  console.log("----getMileStoneSetsDtls body :" + JSON.stringify(body));

  this.http.post(url, body).map(res => res.json()).subscribe(resp => {

    $('.page-loader-wrapper').hide();
    console.log("aliasNamesForMileStone list response----------" + JSON.stringify(resp));
    if(resp.responseCode == 200){

      this.availableAliasNames = resp.responseObjList;
      $('#aliasNamesID').show();
     // $('#milestonediv').show();
      
    }else if(resp.responseCode ==440){
      swal("Your Session has been Timed Out!", "Please login once again.", "error");
      this.router.navigate([""]);
    }else{
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
/*------------------------Alias name availability Functionality End--------------------*/

/*-----------------------------------Block Link onchange functionalities start----------------*/
blocksClickEvent(item){
   $("#milestonediv").show()
  $('#milestonetypeID').html("<option value='select'>--Select--</option>" + "" + "<option value='181'>Regular</option>" + "" + "<option value='182'>Customized</option>");

  $("#milestonetypeID").val(item.milestoneType)
 //alert(item.milestoneType) 
  this.tempitem = item;
  
  debugger;
  // mileStoneAliasName = id.split('-')[0];
  // finMilestoneClassifidesId = id.split('-')[1];
  // this.milestoneAlias = mileStoneAliasName
  // var siteId = id.split('-')[2];
  // var siteName = id.split('-')[3];
  status_for_block_links = true;
  console.log("item :"+JSON.stringify(item));
  mileStoneAliasName = item.mileStoneAliasName;
  finMilestoneClassifidesId = item.finMilestoneClassifidesId;
  this.milestoneAlias = mileStoneAliasName
   siteId = item.siteId;
  var siteName = item.siteName;
  this.milestoneDetails(mileStoneAliasName,finMilestoneClassifidesId,siteId);
}
/*----------------------------------- Block Link onchange functionalities end----------------*/

/*--------------------------Mile stone table details start------------------*/
milestoneDetails(mname,cid,sid){
  $('.page-loader-wrapper').show();

  let url = this.cmn.commonUrl + "financial/getMileStoneDemandNoteDetails.spring";
  console.log("url :" + url);

  let headers = new Headers({ 'Content-Type': 'application/json' });
  //let options = new RequestOptions({ headers: headers }); 

  var body = {
    "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
    "finMilestoneClassifidesId": cid,
    "siteId": sid,
    "mileStoneAliasName": mname,
    "condition" : ""
  }
  console.log("----getMileStoneDemandNoteDetails body :" + JSON.stringify(body));

  this.http.post(url, body).map(res => res.json()).subscribe(resp => {
    $('.page-loader-wrapper').hide();
    console.log("MileStoneDemandNoteDetails response----------" + JSON.stringify(resp));
    console.log("only for table response----------" + JSON.stringify(resp.responseObjList.financialProjectMileStoneResponse));
  if(resp.responseCode == 200){
      $("#milestone_blocks_tables").show();
    // alert("Response Success")
    this.milestonedemand_details = resp.responseObjList[0].financialProjectMileStoneResponse;
var self=this;
    $(function(){
      //alert("test")
   for(var i=0;i<=self.milestonedemand_details.length;i++){
   //alert(self.milestonedemand_details[i].masterDemandNotedate)
 
 
    var date = new Date().getMonth();
    var minimumdate = new Date().setMonth(date - 3);
    var maximumdate = new Date().setMonth(date + 3);
   // alert(self.milestonedemand_details[i].masterDemandNotedat)
   $('#completed_date' + (i + 1)).bootstrapMaterialDatePicker({
    format: 'YYYY-MM-DD',
   // minDate: new Date(minimumdate),
    //  maxDate: new Date(),
    clearButton: true,
    weekStart: 1,
    time: false,
  });

      $('#demand_note_date' + (i + 1)).bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
       // minDate: new Date(minimumdate),
        //  maxDate: new Date(),
        clearButton: true,
        weekStart: 1,
        time: false,
      });
    
    

    $('#duedateselection' + (i + 1)).bootstrapMaterialDatePicker({
      format: 'YYYY-MM-DD',
      //minDate: new Date(minimumdate),
      //  maxDate: new Date(),
      clearButton: true,
      weekStart: 1,
      time: false,
    });

    if(self.milestonedemand_details[i].milestoneDate != null){
      //alert($("#duedateselection"+(i+1)).val())
    //$("input").prop('disabled', true);
      $("#completed_date"+(i+1)).prop('disabled', true);
    }
    if(self.milestonedemand_details[i].masterDemandNotedate != null){
      //alert($("#duedateselection"+(i+1)).val())
    //$("input").prop('disabled', true);
      $("#duedateselection"+(i+1)).prop('disabled', true);
    }

    if(self.milestonedemand_details[i].masterDemandNotedate != null){
      //alert($("#duedateselection"+(i+1)).val())
    //$("input").prop('disabled', true);
      $("#demand_note_date"+(i+1)).prop('disabled', true);
    }
    // alert(self.milestonedemand_details[i].projectMsStatusId)
     if(self.milestonedemand_details[i].projectMsStatusId == 54){
      $(".percentages").select2({
        placeholder: "Select Status",
        dir: "ltl",
      });
     }
  
   }
 
 })
    
  }else if(resp.responseCode ==440){
    swal("Your Session has been Timed Out!", "Please login once again.", "error");
    this.router.navigate([""]);
  }else{
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

homeClick(){
  this.cmn.commonHomeNavigation();
}

update_staus(){

  this.financialProjectMileStoneRequests = [];
  
   for(var i=0;i<this.milestonedemand_details.length;i++){
    

    if($("#completed_date"+(i+1)).val() != ""){
      if($("#demand_note_date"+(i+1)).val() == ""){
        swal("Please select demand note date for milestone "+(i+1))
        return false;
      }
      if($("#duedateselection"+(i+1)).val() == ""){
        swal("Please select due date for milestone "+(i+1))
        return false;
      }
      if($("#statusnameId"+i).val() == "54"){
        swal("Please select milestone status for milestone "+(i+1))
        return false;
      }
    }


    if($("#demand_note_date"+(i+1)).val() != ""){
      if($("#completed_date"+(i+1)).val() == ""){
        swal("Please select completed date for milestone "+(i+1))
        return false;
      }
  if($("#duedateselection"+(i+1)).val() == ""){
    swal("Please select due date for milestone "+(i+1))
    return false;
  }
  if($("#statusnameId"+i).val() == "54"){
    swal("Please select milestone status for milestone "+(i+1))
    return false;
  }
 
}

if($("#duedateselection"+(i+1)).val() != ""){
  if($("#completed_date"+(i+1)).val() == ""){
    swal("Please select completed date for milestone "+(i+1))
    return false;
  }
  if($("#demand_note_date"+(i+1)).val() == ""){
    swal("Please select demand note date for milestone "+(i+1))
    return false;
  }
  if($("#statusnameId"+i).val() == "54"){
    swal("Please select milestone status for milestone "+(i+1))
    return false;
  }
 
}
 

if($("#statusnameId"+i).val() != "54"){
  if($("#completed_date"+(i+1)).val() == ""){
    swal("Please select completed date for milestone "+(i+1))
    return false;
  }
  if($("#demand_note_date"+(i+1)).val() == ""){
    swal("Please select demand note date for milestone "+(i+1))
    return false;
  }
  if($("#duedateselection"+(i+1)).val() == ""){
    swal("Please select due date for milestone "+(i+1))
    return false;
  }
}
//$('.page-loader-wrapper').show();
   // alert($("#statusnameId"+i).val())
    if($("#statusnameId"+i).val() == ''){
   this.statusIdd = "53"
    }else{
      this.statusIdd = $("#statusnameId"+i).val()
    }
    

    if($("#completed_date"+(i+1)).val() == ""){
      this.completed_date_temp = this.milestonedemand_details[i].milestoneDate
     // alert(this.masterDemandNotedate_temp)
       }else{
         this.completed_date_temp = new Date($("#completed_date"+(i+1)).val()).getTime()
       }
    if($("#demand_note_date"+(i+1)).val() == ""){
      this.masterDemandNotedate_temp = this.milestonedemand_details[i].masterDemandNotedate
     // alert(this.masterDemandNotedate_temp)
       }else{
         this.masterDemandNotedate_temp = new Date($("#demand_note_date"+(i+1)).val()).getTime()
       }

       if($("#duedateselection"+(i+1)).val() == ""){
        this.mileStoneDueDate_temp = this.milestonedemand_details[i].mileStoneDueDate
         }else{
           this.mileStoneDueDate_temp = new Date($("#duedateselection"+(i+1)).val()).getTime()
         }
         //$('.page-loader-wrapper').show();
   // alert(this.financialProjectMileStoneRequests[i].projectMilestoneId)
    this.financialProjectMileStoneRequests.push({
      "projectMilestoneId": this.milestonedemand_details[i].projectMilestoneId,
      "mileStoneNo": this.milestonedemand_details[i].mileStoneNo,
      "finMilestoneClassifidesId":this.milestonedemand_details[i].finMilestoneClassifidesId,
      "milestoneName": this.milestonedemand_details[i].milestoneName,
      "percentagesId": this.milestonedemand_details[i].percentagesId,
      "statusId": this.statusIdd,
      "milestoneDate" : this.completed_date_temp,
      "masterDemandNotedate": this.masterDemandNotedate_temp,
      "masterDemandDueDate": this.mileStoneDueDate_temp
    })
  }
console.log(JSON.stringify(this.financialProjectMileStoneRequests));

//return false;


 this.controller = [];
    for (var i = 0; i < this.milestonedemand_details.length; i++) {
      if (this.milestonedemand_details[i].masterDemandDueDate != null) {
        this.controller.push(this.milestonedemand_details[i].masterDemandDueDate);
      }
    }
    this.controller_main = [];
    for (var i = 0; i < this.financialProjectMileStoneRequests.length; i++) {
      if (this.financialProjectMileStoneRequests[i].masterDemandNotedate != null) {
        this.controller_main.push(this.financialProjectMileStoneRequests[i].masterDemandNotedate);
      }
    }


    console.log(this.controller);
    console.log(this.controller_main);

    if(this.controller.length == this.controller_main.length){
      swal("Please select any option to continue!");
      return false;
    }
 



  let url = this.cmn.commonUrl + "financial/updateMileStoneDataForDemandNote.spring"
 console.log("url :" + url);

  let headers = new Headers({ 'Content-Type': 'application/json' });
  //let options = new RequestOptions({ headers: headers }); 

  var body = {
    "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "empId": sessionStorage.getItem('employeeId'),
      "requestUrl": "viewAndEditUpdateMilestone",
      "siteId": siteId,
      "finMilestoneClassifidesId":finMilestoneClassifidesId,
      "mileStoneAliasName": mileStoneAliasName,
      "blockIds": [],
      "milestoneType": $("#milestonetypeID").val(),
      "financialProjectMileStoneRequests": this.financialProjectMileStoneRequests
  }
  
  console.log("----getupdatestatus body :" + JSON.stringify(body));
  //$('.page-loader-wrapper').hide();
//return false;
  this.http.post(url, body).map(res => res.json()).subscribe(resp => {
    $('.page-loader-wrapper').hide();
    console.log("update status response----------" + JSON.stringify(resp));
  if(resp.responseCode == 200){
    this.financialProjectMileStoneRequests = []
    swal(resp.description);
    this.blocksClickEvent(this.tempitem)
   // location.reload()
       }else if(resp.responseCode ==440){
    swal("Your Session has been Timed Out!", "Please login once again.", "error");
    this.router.navigate([""]);
  }else{
    $('.page-loader-wrapper').hide();
    this.financialProjectMileStoneRequests = []
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
