import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { RequestOptions, Http } from '@angular/http';
import { Router } from '@angular/router';
import { Milestone } from '../model/milestone.model';
declare const $: any;
declare const swal:any;
var selected_projectid;

@Component({
  selector: 'app-create-milestone',
  templateUrl: './create-milestone.component.html',
  styleUrls: ['./create-milestone.component.sass']
})

export class CreateMilestoneComponent implements OnInit {
  private fieldArray: Array<any> = [];
  private newAttribute: any = {};

milestoneArray: Array<Milestone> = []; 
milestone: Milestone={
  name:"",
  date:"",
  percentage:""
 }; 
showRemaining: boolean = false;
  availableAliasNames: any;
  selectedSiteID: any;
  dynamicselect: any;
  financialProjectMileStoneRequests: any = [];
  blockID: any;
  temdate_milestone_createDate:number;
  createMilestoneRequest: { milestoneName: any; percentagesId: any; milestoneDate: any; };
  //dynamicArray: Array<DynamicGrid> = [];  
  newDynamic: any = {};
  dynamicArray: any = [];
  constructor(private cmn: CommonComponent, private http: Http, private router: Router) {
    sessionStorage.setItem('fromviewpagepredefined', null);
    $('.page-loader-wrapper').hide();
    //window.alert('i am inside constructor')
    $(function(){
      $("#milestone_percentage0").select2({
        placeholder: "Select Percentage",
        dir: "ltl",
      });
    })
    //this.milestoneArray.push(1);
   }

   ngAfterViewInit() {
    this.siteList();
    //this.percentagesList(0);
  }
  addRow() {    
    this.newDynamic = {name: "", email: "",phone:""};  
      this.dynamicArray.push(this.newDynamic);  
      alert('New row added successfully');  
      console.log(this.dynamicArray);  
      return true;  
  }  

  deleteRow(index) {  
      if(this.dynamicArray.length ==1) {  
        alert("Can't delete the row when there is only one row");  
          return false;  
      } else {  
          this.dynamicArray.splice(index, 1);  
          alert('Row deleted successfully');  
          return true;  
      }
    }
  ngOnInit() {
    this.newDynamic = {name: "", email: "",phone:""};  
          this.dynamicArray.push(this.newDynamic);  
    var self = this;
    this.milestoneArray.push(this.milestone);
    // var date = new Date();
    // var newdate = date.setDate(date.getDate() - 365);

    var date = new Date().getMonth();
    var minimumdate = new Date().setMonth(date - 3);
    var maximumdate = new Date().setMonth(date + 3);
    
    $(function(){
      $('.datepicker').bootstrapMaterialDatePicker({
        format: 'DD-MM-YYYY',
        minDate: new Date(minimumdate),
        maxDate: new Date(maximumdate),
        clearButton: true,
        weekStart: 1,
        time: false
      });
    })
  
    $("#projectID").select2({
      placeholder: "Select Project",
      dir: "ltl",
    });

    $("#BlockId").select2({
      placeholder: "--Select--",
      dir: "ltl"
    });
    $("#milestonetypeID").select2({
      placeholder: "--Select--",
      dir: "ltl"
    });
    
    $('.datepicker').bootstrapMaterialDatePicker({
      format: 'DD-MM-YYYY',
      minDate: new Date(minimumdate),
      maxDate: new Date(maximumdate),
      clearButton: true,
      weekStart: 1,
      time: false
    });
  
      
    $(function(){
      $('#projectID').change(function(e){
        selected_projectid = $(e.target).val();
        $('#blocksID').show();
        $('#milestonediv').show();
        
        $('#aliasNameID').show();
        $('#totalTableID').show();
        $('#submitButtonID').show();

        if(selected_projectid == ""){
           
        }else{
          self.projectchangeFun(selected_projectid);
        }
      })
    })


// Table code start
    // var self =this;
    // $(document).delegate('a.add-record', 'click', function(e) {
    //  debugger;
    //  self.milestoneArray.push(1);
    //   e.preventDefault();    
    //   var content = $('#sample_table tr')

    // //size = $('#tbl_posts >tbody >tr').length + 1,
    //   var temp = $("#temperory-table-val").val(),
    //   size= parseInt(temp)+1,

    //   element = null,    
    //   element = content.clone();
    //   element.attr('id', 'rec-'+size);
    //   element.find('.delete-record').attr('data-id', size);
      // element.appendTo('#tbl_posts_body');
    //   // element.find('.sn').html(size);

    //   $("#temperory-table-val").val(size)
    //   self.mydatepicker(size);
    // });

    // $(document).delegate('a.delete-record', 'click', function(e) {
    //   e.preventDefault();    
    //   var didConfirm = confirm("Are you sure You want to delete");
    //   if (didConfirm == true) {
    //   var id = $(this).attr('data-id');
    //   var targetDiv = $(this).attr('targetDiv');
    //   $('#rec-' + id).remove();
      
    // //regnerate index number on table
    // $('#tbl_posts_body tr').each(function(index) {
    //   //alert(index);
    //   $(this).find('span.sn').html(index+1);
    // });
    // return true;
    // } else {
    // return false;
    // }
    // });

  // Table code end

  }
  
  addRecord(index){
    debugger;

      //window.alert("**** I am inside the addRecord ****");
      // alert(index);
      // // alert($("#milestone_createDate"+index).val());
       //var content = $('#tbl_posts_body #rec-0 td milestone_createDate0').clone();
    //alert(content.attr('id', "#milestone_createDate"+index).val());
      //alert($("#tbl_posts_body").find('#rec-'+index).attr('id', "#milestone_createDate "+index).val());
    
      // if($("#milestone_createDate"+index).val() == ""){
      //   swal("Error...!", "Please select start date.", "error");
      //   return false;
      // }
      var self =this;
      var temp_data;
      var tempindex;
      $('.tabletrClass').each(function(){
        var id = $(this).attr('id').split('-')[1];
        // if($('#milestone_createDate'+id).val() == ""){
        //   swal("please select the date");
        
        //   return false;
        // }
    
        if($('#milestone_name'+id).val() == ""){
          swal("please enter the milestone name");
         // $('#milestone_name'+id).focus();
          return false;
        }
    
        if($('#milestone_percentage'+id).val() == "select"){
          swal("please select the milestone percentage");
        //$('#milestone_percentage'+id).focus();
          return false;
        }
      })
      temp_data = $("#dummyinput").val();
      tempindex = parseInt(temp_data)+1
      
      if($('#milestone_createDate'+temp_data).val() != "" && $('#milestone_name'+temp_data).val() != "" && $('#milestone_percentage'+temp_data).val() != "select"){
      //  this.milestoneArray.push(1);
        $("#dummyinput").val(tempindex);
       
      
      }

      $(function(){
        $('#milestone_percentage'+tempindex).select2({
          placeholder: "Select Percentage",
          dir: "ltl",
        });  
      })

      // var date = new Date();
      // var newdate = date.setDate(date.getDate() - 365);

      var date = new Date().getMonth();
      var minimumdate = new Date().setMonth(date - 3);
      var maximumdate = new Date().setMonth(date + 3);

      $(function(){
        debugger;      
        $('.datepicker').bootstrapMaterialDatePicker({
          format: 'DD-MM-YYYY',
          minDate: new Date(minimumdate),
          maxDate: new Date(maximumdate),
          clearButton: true,
          weekStart: 1,
          time: false
        });
      })
      
      this.percentagesList(tempindex);
      
    }

    addMilestone(index){
      debugger;
      var tempindex;
      $('.tabletrClass').each(function(){
        var id = $(this).attr('id').split('-')[1];
        if($('#milestone_createDate'+index).val() == ""){
          swal("please select the date");
        
          return false;
        }
    
        if($('#milestone_name'+index).val() == ""){
          swal("please enter the milestone name");
         // $('#milestone_name'+id).focus();
          return false;
        }
    
        if($('#milestone_percentage'+index).val() == "select"){
          swal("please select the milestone percentage");
        //$('#milestone_percentage'+id).focus();
          return false;
        }
      })

      tempindex = index+1
      if($('#milestone_createDate'+index).val() != "" && $('#milestone_name'+index).val() != "" && $('#milestone_percentage'+index).val() != "select"){

          console.log('****** conrol is inside the addMilestone *******');
          // let milestone: Milestone={
          //   name:"",
          //   date:"",
          //   percentage:""
          // }; 
    this.milestone = {name: "", date: "",percentage:""};  

          this.milestoneArray.splice(index+1,0,this.milestone);
          console.log(JSON.stringify(this.milestoneArray));
     
          
      
      }

      $(function(){
        $('#milestone_percentage'+tempindex).select2({
          placeholder: "Select Percentage",
          dir: "ltl",
        });  
      })

    //  var date = new Date();
    //  var newdate = date.setDate(date.getDate() - 365);

    var date = new Date().getMonth();
    var minimumdate = new Date().setMonth(date - 3);
    var maximumdate = new Date().setMonth(date + 3);

     $(function(){
       debugger;      
       $('.datepicker').bootstrapMaterialDatePicker({
         format: 'DD-MM-YYYY',
         minDate: new Date(minimumdate),
         maxDate: new Date(maximumdate),
         clearButton: true,
         weekStart: 1,
         time: false
       });
     })

    

     this.percentagesList(tempindex);
    }
  deleteMilestone(index:number) {  
    if(this.milestoneArray.length ==1) {  
      swal("you only have one row");  
        return false;
     } else {  
      if (confirm("Are you sure ?")) {
        
        this.milestoneArray.splice(index, 1);   
         return true;
      }
    }  
  } 
    
    deleteRecord(item){
   debugger;
      //alert("index"+item);
      if(this.milestoneArray.length == 1){
        swal("you only have one row");
        return false;
      } else{
        if (confirm("Are you sure ?")) {
          this.milestoneArray.splice(1,item);
          $('#rec-'+item).remove();
        } else { }
      }

      
    }
    
//FOR Serial Number- use ON 
// $(document).ready( function() {
//   $(document).on("click", ".add-record, .delete-record", function(){

//     $("td.sno").each(function(index,element){                 
//         $(element).text(index + 1); 
//     });
//   });
// });
 /*-----------------Getting Project(site) list Start---------------------*/
 siteList() {
  $('.page-loader-wrapper').show();

  let url = this.cmn.commonUrl + "financial/incompletedEmpSitesList.spring";
  // http://106.51.38.64:9999/employeeservice/site/site.spring
  console.log("url :" + url);
  let headers = new Headers({ 'Content-Type': 'application/json' });
  //let options = new RequestOptions({ headers: headers });
  var body = {
    "sessionKey": "" + sessionStorage.getItem("login_sessionkey")
  }
  console.log("body :" + JSON.stringify(body))
  this.http.post(url, body).map(res => res.json()).subscribe(resp => {
    $('.page-loader-wrapper').hide();
    console.log("Site list response----------" + JSON.stringify(resp));
    if(resp.responseCode == 200){
     // var Options = "";  
      for (var i = 0; i < resp.responseObjList.length; i++) {
        $('#projectID').append("<option value='" + resp.responseObjList[i].id + "'>" + resp.responseObjList[i].name + "</option>");
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

/*------------------------Projects On Change Functionality Start--------------------*/
projectchangeFun(selectedSiteID) {
  this.selectedSiteID = JSON.parse(selectedSiteID)
  $('.page-loader-wrapper').show();
  let url = this.cmn.commonUrl + "financial/incompleteBlocksListForMileStone.spring";
  // hhttp://106.51.38.64:9999/employeeservice/block/blocks.spring
  console.log("url :" + url);

  let headers = new Headers({ 'Content-Type': 'application/json' });
 // let options = new RequestOptions({ headers: headers });
  var body = {
    "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
    "siteId": selectedSiteID
  }

  console.log("----body :" + JSON.stringify(body));
  this.http.post(url, body).map(res => res.json()).subscribe(resp => {
    $('.page-loader-wrapper').hide();
    console.log("incompleteBlocksListForMileStone list response----------" + JSON.stringify(resp));
    if(resp.responseCode == 200){
      this.aliasNameAvailabilityFun("initial_calling");
      this.percentagesList(0);

    $('#BlockId').html("");
    for (var i = 0; i < resp.responseObjList.length; i++) {
      $('#BlockId').append("<option value='" + resp.responseObjList[i].id + "'>" + resp.responseObjList[i].name + "</option>");
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
/*------------------------Projects On Change Functionality End--------------------*/


/*------------------------Alias name availability Functionality Start--------------------*/
aliasNameAvailabilityFun(initial_text) {

  let url = this.cmn.commonUrl + "financial/aliasNamesForMileStone.spring";
  // hhttp://106.51.38.64:9999/employeeservice/block/blocks.spring
  console.log("url :" + url);

  let headers = new Headers({ 'Content-Type': 'application/json' });
 // let options = new RequestOptions({ headers: headers });
  var body = {
    "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
    "siteId": this.selectedSiteID
  }

  console.log("----body :" + JSON.stringify(body));
  this.http.post(url, body).map(res => res.json()).subscribe(resp => {

    //$('.page-loader-wrapper').hide();
    console.log("aliasNamesForMileStone list response----------" + JSON.stringify(resp));
    if(resp.responseCode == 200){
      this.availableAliasNames = resp.responseObjList;
      if(initial_text == "initial_calling"){

      }else if(initial_text == "OnButtonCalling"){
        $('#aliasNamesID').show();
      }else{}

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
/*------------------------Alias name availability Functionality End--------------------*/

/*-----------------Getting Project(site) list Start---------------------*/
percentagesList(id) {
  let url = this.cmn.commonUrl + "financial/mileStonePercentages.spring";
  // http://106.51.38.64:9999/employeeservice/site/site.spring
  console.log("url :" + url);
  let headers = new Headers({ 'Content-Type': 'application/json' });
  //let options = new RequestOptions({ headers: headers });
  var body = {
    "sessionKey": "" + sessionStorage.getItem("login_sessionkey")
  }
  console.log("body :" + JSON.stringify(body))
  this.http.post(url, body).map(res => res.json()).subscribe(resp => {
    //$('.page-loader-wrapper').hide();
    console.log("mileStonePercentages list response----------" + JSON.stringify(resp));
    if(resp.responseCode == 200){
     // var Options = "";
      this.dynamicselect = resp;
      for (var i = 0; i < resp.responseObjList.length; i++) {
        $('#milestone_percentage'+id).append("<option value='" + resp.responseObjList[i].percentagesId + "'>" + resp.responseObjList[i].percentage + "</option>");
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

convertMilestonerArrayToModificationCostDetailsRequestArray(){
  console.log("**** The control is inside the convertMilestonerArrayToModificationCostDetailsRequestArray ****")
 //debugger;
 this.financialProjectMileStoneRequests= [];
 console.log(this.milestoneArray);
  for(var milestone of  this.milestoneArray ) {
   console.log(milestone); 
   this.createMilestoneRequest = {
      milestoneName : milestone.name,
      percentagesId : milestone.percentage,
      milestoneDate : milestone.date
   };
   this.financialProjectMileStoneRequests.push(this.createMilestoneRequest);
 }
 console.log("---------"+this.financialProjectMileStoneRequests);
}

/*----------------- Create milestone Start ---------------------*/

createMilestone(){
    for(let i=0; i<this.availableAliasNames.length; i++){
      if($('#Alias_Name').val() == this.availableAliasNames[i].mileStoneAliasName){
          swal("Alias name already exists..");
          return false;
      }
    }

    if($('#projectID').val() == "select"){
      swal("please select the site");
      return false;
    }

    if($('#BlockId').val() == ""){
      swal("please select the blocks");
      return false;
    }
    if($('#milestonetypeID').val() == "" || $('#milestonetypeID').val() == "select"){
      swal("please select the milestone type");
      return false;
    }
    if($('#Alias_Name').val() == ""){
      swal("please enter the alias name");
      return false;
    }

    $('.tabletrClass').each(function(){
      var id = $(this).attr('id').split('-')[1];
      if($('#milestone_createDate'+id).val() == ""){
        swal("please select the date");
        return false;
      }
  
      if($('#milestone_name'+id).val() == ""){
        swal("please enter the milestone name");
        return false;
      }
  
      if($('#milestone_percentage'+id).val() == "select"){
        swal("please select the milestone percentage");
        return false;
      }
 
    })

    
     var self = this;
     $('.tabletrClass').each(function(){
       var id = $(this).attr('id').split('-')[1];
      console.log($("#milestone_createDate"+id).val());
       if($("#milestone_createDate"+id).val() == ""){
        this.temdate_milestone_createDate = null;
       }else{
       // this.temdate_milestone_createDate = $("#milestone_createDate"+id).val().split('-')[2]+"-"+$("#milestone_createDate"+id).val().split('-')[1]+"-"+$("#milestone_createDate"+id).val().split('-')[0];
       this.temdate_milestone_createDate = $("#milestone_createDate"+id).val();

       }

       console.log(this.temdate_milestone_createDate);

       if(this.temdate_milestone_createDate == "null" || this.temdate_milestone_createDate == null){
         console.log(JSON.parse(this.temdate_milestone_createDate));

        self.financialProjectMileStoneRequests.push({
          "milestoneName":""+$('#milestone_name'+id).val(),
          "percentagesId":$('#milestone_percentage'+id).val(),
          "milestoneDate":JSON.parse(this.temdate_milestone_createDate)
        });


       }else{
         console.log(new Date(this.temdate_milestone_createDate).getTime());
        self.financialProjectMileStoneRequests.push({
          "milestoneName":""+$('#milestone_name'+id).val(),
          "percentagesId":$('#milestone_percentage'+id).val(),
          "milestoneDate":new Date(this.temdate_milestone_createDate).getTime()
        });
       }
      

     
  
     })
     console.log("Milestone array: "+JSON.stringify(this.financialProjectMileStoneRequests));

   // this.convertMilestonerArrayToModificationCostDetailsRequestArray();
    
    $('.page-loader-wrapper').show();
    

    let url = this.cmn.commonUrl + "financial/createMileStoneDataForDemandNote.spring"
    console.log("createMileStoneDataForDemandNote url :" + url);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: headers });
    
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteId":this.selectedSiteID,
      "mileStoneAliasName" : ""+ $('#Alias_Name').val(),
      "blockIds": ($("#BlockId").val()).map(Number),
      "milestoneType": $("#milestonetypeID").val(),
      "financialProjectMileStoneRequests":this.financialProjectMileStoneRequests
    }
    
    console.log(JSON.stringify(body))


    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
     // console.log(JSON.stringify(body))
      $('.page-loader-wrapper').hide();
      console.log("createMileStoneDataForDemandNote response----------" + JSON.stringify(resp));
      if (resp.responseCode == 200) {
        location.reload();
        $("#projectID option[value]").remove();
        $("#BlockId option[value]").remove();
        $('#Alias_Name').val("");
        swal("Milestone created successfully !!");
      
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

/*----------------- Create milestone End ---------------------*/

homeClick(){
  this.cmn.commonHomeNavigation();
}

customTrackBy(index: number, obj: any): any {
  return index;
}

addFieldValue() {
  this.fieldArray.push(this.newAttribute)
  this.newAttribute = {};
}

deleteFieldValue(index) {
  this.fieldArray.splice(index, 1);
}

}
