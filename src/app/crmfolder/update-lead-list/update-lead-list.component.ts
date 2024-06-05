import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonComponent } from '../../common/common.component';
import { Http, Headers,RequestOptions } from '@angular/http';
declare const $:any;
declare const swal: any;
@Component({
  selector: 'app-update-lead-list',
  templateUrl: './update-lead-list.component.html',
  styleUrls: ['./update-lead-list.component.sass']
})
export class UpdateLeadListComponent implements OnInit {
  milestonedemand_table: any;
  total_length: any;
  leadlist_array : any;
  constructor(private cmn: CommonComponent, private http: Http, private router: Router) {
    var nValFromSession=sessionStorage.getItem("nval");
    if(nValFromSession=="1"){
      window.location.reload();
      sessionStorage.setItem("nval", "2");
     // $(".showhidediv").hide();
     // $('#milestone_blocks_tables').hide();
    }else{
      //$(".showhidediv").show();
     // $(".showhidediv").show();
      $('#milestone_blocks_tables').show();
      $('.page-loader-wrapper').hide();
      $('#tableExport').DataTable( {
        dom: 'Bfrltip',
        buttons: [
            'copyHtml5',
            'excelHtml5',
            'csvHtml5',
            'pdfHtml5'
        ]
    } );
    }
    $('.page-loader-wrapper').hide();
   
    //this.siteList();
    this.leadlist_array = [
      {
        "leadId":"14900",
        "RegisteredOn":"03/07/2020",
        "name":"Mr.Madan",
        "phone":"9776778809",
        "mail_id":"madan@gmail.com",
        "address":"Hyderabad",
        "status":"New",
        "source":"Facebook",
        "company":"AMS",
        "Designation" : "Manager",
        "location" : "",
        "Projects" : "Breezy Village",
        "Preffered_Project_Location" : "Hyderabad",
        "Alternative_Email" : "",
        "Alternative_Email_2" : "",
        "Mobile" : "8776778809",
        "Alternative_Mobile" : "",
        "Alternative_Mobile_2" : "",
        "Extension" : "",
        "Second_Source" : "99acres.com",
        "Thired_Source" : "",
        "Reactivated_Source" : "",
        "latest_source" : "source1",
        "Source_Description" : "",
        "Lead_Owner" : "Mr.Prasad",
        "Lead_Status" : "New",
        "Lead_Sub_Status":"",
        "Description" : "",
        "House_Type" : "",
        "Time_frame_to_Purchase" : "2-6 months",
        "Comments" : "",
        "Housing_Requirement" : "2.5BHK",
        "Maximum_Budget" : "12000000",
        "Minimum_Budget" : "8000000",
        "Budget_range" : "",
        "Requirement_Type" : "",
        "Flat_Area" : "800sft",
        "Area" : "",
        "Locality" : "",
        "Alternative_Address" : "",
        "city" : "Hyderabad",
        "state" : "Telangana",
        "time_slot" : "10Am-1pm",
        "channel_partner_id" : "true",
        "walik_in_form_1" : "false",
        "first_source" : "first source1",
        "reason" : "",
        "rating" : "",
        "last_task_coments" : "",
        "lead_sub_status" : ""
    
      },
      {
        "leadId":"13788",
        "RegisteredOn":"03/08/2020",
        "name":"Ms.Geeta",
        "phone":"8776779909",
        "mail_id":"geeta123@gmail.com",
        "address":"Banglore",
        "status":"New",
        "source":"LinkedIn",
        "company":"",
        "Designation" : "",
        "location" : "",
        "Projects" : "Ocean shores",
        "Preffered_Project_Location" : "Bangalore",
        "Alternative_Email" : "",
        "Alternative_Email_2" : "",
        "Mobile" : "8776774809",
        "Alternative_Mobile" : "",
        "Alternative_Mobile_2" : "",
        "Extension" : "",
        "Second_Source" : "99acres.com",
        "Thired_Source" : "",
        "Reactivated_Source" : "",
        "latest_source" : "source2",
        "Source_Description" : "",
        "Lead_Owner" : "Mr.Prasad",
        "Lead_Status" : "New",
        "Lead_Sub_Status" : "",
        "Description" : "",
        "House_Type" : "",
        "Time_frame_to_Purchase" : "0-2 months",
        "Comments" : "",
        "Housing_Requirement" : "2.5BHK",
        "Maximum_Budget" : "13000000",
        "Minimum Budget" : "8000000",
        "Budget_range" : "",
        "Requirement_Type" : "",
        "Flat_Area" : "900sft",
        "Area" : "",
        "Locality" : "",
        "Alternative Address" : "",
        "city" : "Hyderabad",
        "state" : "Telangana",
        "time_slot" : "3pm-4pm",
        "channel_partner_id" : "true",
       "walik_in_form_1" : "false",
       "first_source" : "first source1",
       "reason" : "",
       "rating" : "",
       "last_task_coments" : "",
       "lead_sub_status" : ""
      },
      {
        "leadId":"13567",
        "RegisteredOn":"01/02/2020",
        "name":"Mr.Robert",
        "phone":"7876779908",
        "mail_id":"robert@yahoo.com",
        "address":"Hyderabad",
        "status":"New",
        "source":"Channel partner",
        "company":"TCS",
        "Designation" : "Application Developer",
        "location" : "",
        "Projects" : "Greenspace",
        "Preffered_Project_Location" : "Banglore",
        "Alternative_Email" : "",
        "Alternative_Email_2" : "",
        "Mobile" : "6776778809",
        "Alternative_Mobile" : "",
        "Alternative_Mobile_2" : "8585623546",
        "Extension" : "",
        "Second_Source" : "99acres.com",
        "Thired_Source" : "",
        "Reactivated_Source" : "",
        "latest_source" : "source1",
        "Source_Description" : "",
        "Lead_Owner" : "Mr.Prasad",
        "Lead_Status" : "Working",
        "Lead_Sub_Status" : "",
        "Description" : "",
        "House_Type" : "",
        "Time_frame_to_Purchase" : "6-12 months",
        "Comments" : "",
        "Housing_Requirement" : "2.5BHK",
        "Maximum_Budget" : "14000000",
        "Minimum Budget" : "8000000",
        "Budget_range" : "",
        "Requirement_Type" : "",
        "Flat_Area" : "800sft",
        "Area" : "",
        "Locality" : "",
        "Alternative Address" : "",
        "city" : "Mumbai",
        "state" : "Maharastra",
        "time_slot" : "3pm-4pm",
        "channel_partner_id" : "true",
        "walik_in_form_1" : "true",
        "first_source" : "first source1",
        "reason" : "",
        "rating" : "",
        "last_task_coments" : "",
        "lead_sub_status" : ""
      },
      {
        "leadId":"12456",
        "RegisteredOn":"24/04/2020",
        "name":"Mr.Mohammad Gous",
        "phone":"9976779908",
        "mail_id":"m.gous@gmail.com",
        "address":"Banglore",
        "status":"New",
        "source":"Reference",
        "company":"",
        "Designation" : "",
        "location" : "",
        "Projects" : "Greenspace",
        "Preffered_Project_Location" : "Hyderabad",
        "Alternative_Email" : "",
        "Alternative_Email_2" : "",
        "Mobile" : "8745778809",
        "Alternative_Mobile" : "",
        "Alternative_Mobile_2" : "7325615426",
        "Extension" : "",
        "Second_Source" : "49acres.com",
        "Thired_Source" : "",
        "Reactivated_Source" : "",
        "latest_source" : "source2",
        "first_source" : "first source1",
        "Source_Description" : "",
        "Lead_Owner" : "Mr.Prasad",
        "Lead_Status" : "Working",
        "Lead_Sub_Status" : "",
        "Description" : "",
        "House_Type" : "",
        "Time_frame_to_Purchase" : "6-12 months",
        "Comments" : "",
        "Housing_Requirement" : "4BHK",
        "Maximum_Budget" : "15000000",
        "Minimum_Budget" : "8000000",
        "Budget_range" : "",
        "Requirement_Type" : "",
        "Flat_Area" : "600sft",
        "Area" : "",
        "Locality" : "",
        "Alternative_Address" : "",
        "city" : "Vijayawada",
        "state" : "Andhra Pradesh",
        "time_slot" : "3pm-4pm",
        "channel_partner_id" : "true",
      "walik_in_form_1" : "true",
      "reason" : "",
      "rating" : "",
      "last_task_coments" : "",
      "lead_sub_status" : ""

        
      },
    {
      "leadId":"12345",
      "RegisteredOn":"21/01/2020",
      "name":"Mr.Ram",
      "phone":"8776779908",
      "mail_id":"ram9877@gmail.com",
      "address":"Hyderabad",
      "status":"New",
      "source":"Channel Partner",
      "company":"",
      "Designation" : "",
      "location" : "",
      "Projects" : "Greenspace",
      "Preffered_Project_Location" : "Hyderabad",
      "Alternative_Email" : "",
      "Alternative_Email_2" : "",
      "Mobile" : "9779878812",
      "Alternative_Mobile" : "",
      "Alternative_Mobile_2" : "",
      "Extension" : "",
      "Second_Source" : "99acres.com",
      "Thired_Source" : "",
      "Reactivated_Source" : "",
      "Source_Description" : "",
      "Lead_Owner" : "Mr.Prasad",
      "Lead_Status" : "Inactive",
      "Lead_Sub_Status" : "",
      "Description" : "",
      "House_Type" : "",
      "Time_frame_to_Purchase" : "2-6months",
      "Comments" : "",
      "Housing_Requirement" : "2.5BHK",
      "Maximum_Budget" : "16000000",
      "Minimum_Budget" : "8000000",
      "Budget_range" : "",
      "Requirement_Type" : "",
      "Flat_Area" : "700sft",
      "Area" : "",
      "Locality" : "",
      "Alternative_Address" : "",
      "city" : "Banglore",
      "state" : "Karanataka",
      "time_slot" : "3pm-4pm",
      "channel_partner_id" : "false",
    "walik_in_form_1" : "true",
    "first_source" : "first source1",
    "reason" : "",
    "rating" : "",
    "last_task_coments" : "",
    "lead_sub_status" : ""

    },
    {
      "leadId":"12341",
      "RegisteredOn":"20/01/2020",
      "name":"Mrs.Stela",
      "phone":"8776779908",
      "mail_id":"stela.k@yahoo.com",
      "address":"Banglore",
      "status":"New",
      "source":"LinkedIn",
      "company":"Microsoft",
      "Designation" : "Associate Developer",
      "location" : "",
      "Projects" : "Greenspace",
      "Preffered_Project_Location" : "Hyderabad",
      "Alternative_Email" : "",
      "Alternative_Email_2" : "",
      "Mobile" : "7776779812",
      "Alternative_Mobile" : "",
      "Alternative_Mobile_2" : "",
      "Extension" : "",
      "Second_Source" : "99acres.com",
      "Thired_Source" : "",
      "Reactivated_Source" : "",
      "Source_Description" : "",
      "Lead_Owner" : "Mr.Prasad",
      "Lead_Status" : "Inactive",
      "Lead_Sub_Status" : "",
      "Description" : "",
      "House_Type" : "",
      "Time_frame_to_Purchase" : "6-12 months",
      "Comments" : "",
     "Housing_Requirement" : "3BHK",
     "Maximum_Budget" : "17000000",
     "Minimum_Budget" : "8000000",
     "Budget_range" : "",
     "Requirement_Type" : "",
     "Flat_Area" : "600sft",
     "Area" : "",
     "Locality" : "",
     "Alternative_Address" : "",
     "city" : "Banglore",
    "state" : "Karanataka",
    "time_slot" : "3pm-4pm",
    "channel_partner_id" : "true",
    "walik_in_form_1" : "false",
    "first_source" : "first source1",
    "reason" : "",
    "rating" : "",
    "last_task_coments" : "",
    "lead_sub_status" : ""



          }
    ]
   }

  ngOnInit() {
    var self=this;
    var date = new Date();
    var newdate = date.setDate(date.getDate() - 365);
    $(function(){
      $('#milestone_blocks_tables').hide();
     

      $("#viewId").select2({
        placeholder: "Search View",
        dir: "ltl",
      }); 

      $("#sourceId").select2({
        placeholder: "Search Source",
        dir: "ltl",
      });
     
      $('#fromDate').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
        minDate: new Date(newdate),
        clearButton: true,
        weekStart: 1,
        time: false,
       
      })

      $('#toDate').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
        maxDate: new Date(),
        clearButton: true,
        weekStart: 1,
        time: false
      });
  })
  }
 /*-----------------Getting Project(site) list Start---------------------*/
 siteList() {
  $('.page-loader-wrapper').show();
  let url = this.cmn.commonUrl + "financial/raisedMilestoneSites.spring";
  // http://106.51.38.64:9999/employeeservice/site/site.spring
  console.log("url :" + url);
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers });
  var body = {
    "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
    "actionUrl" : "View Demand Notes"

  }
  console.log("body :" + JSON.stringify(body))
  this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
    //$('.page-loader-wrapper').hide();
    console.log("Site list response----------" + JSON.stringify(resp));
    if(resp.responseCode == 200){
      $('.page-loader-wrapper').hide();
      var Options = "";
      // $('#projectID').formSelect();
      $('#projectID').html('');
      $('#projectID').append('<option value="select">--Select--</option>');
      for (var i = 0; i < resp.responseObjList.length; i++) {
        $('#projectID').append("<option value='" + resp.responseObjList[i].siteId + "'>" + resp.responseObjList[i].siteName + "</option>");
        //	$('#projectID').formSelect();
      }
    }else if(resp.responseCode ==440){
      swal("Your Session has been Timed Out!", "Please login once again.", "error");
      this.router.navigate([""]);
    }else{
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
/*-----------------Getting Project(site) list End---------------------*/



/*------------------------Projects On Change for blocks Functionality Start--------------------*/


projectchangeFun(value) {
debugger;
$('.page-loader-wrapper').show();
  let url = this.cmn.commonUrl + "financial/activeBlocksFlats.spring";
  // hhttp://106.51.38.64:9999/employeeservice/block/blocks.spring
  console.log("url :" + url);

  let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers });
  var body = {
    "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
    "siteIds": value.map(Number)
  }

  console.log("----body :" + JSON.stringify(body));
  this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

    //$('.page-loader-wrapper').hide();
    console.log("Block list response----------" + JSON.stringify(resp));
    if(resp.responseCode == 200){
      $('.page-loader-wrapper').hide();
      $('#BlockId').html('');
      $('#BlockId').append('<option value="select">--Select--</option>');
    for (var i = 0; i < resp.responseObjList.length; i++) {
      $('#BlockId').append("<option value='" + resp.responseObjList[i].blockId + "'>" + resp.responseObjList[i].blockName + "</option>");
    
    }
  }else if(resp.responseCode ==440){
    swal("Your Session has been Timed Out!", "Please login once again.", "error");
    this.router.navigate([""]);
  }else{
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
/*------------------------Projects On Change  for blocks Functionality End--------------------*/

/*------------------------Blocks On Change for flats Functionality Start--------------------*/


BlockchangeFun(value) {
  debugger;
  $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/activeBlocksFlats.spring";
    // hhttp://106.51.38.64:9999/employeeservice/block/blocks.spring
    console.log("url :" + url);
  
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "blockIds": value.map(Number)
    }
  
    console.log("----body :" + JSON.stringify(body));
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
  
      //$('.page-loader-wrapper').hide();
      console.log("Flat list response----------" + JSON.stringify(resp));
      if(resp.responseCode == 200){
        $('.page-loader-wrapper').hide();
        $('#FlatId').html('');
        $('#FlatId').append('<option value="select">--Select--</option>');
      for (var i = 0; i < resp.responseObjList.length; i++) {
        $('#FlatId').append("<option value='" + resp.responseObjList[i].flatId + "'>" + resp.responseObjList[i].flatNo + "</option>");
        ;
      }
    }else if(resp.responseCode ==440){
      swal("Your Session has been Timed Out!", "Please login once again.", "error");
      this.router.navigate([""]);
    }else{
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
  /*------------------------Blocks On Change  for flats Functionality End--------------------*/

  /*-----------------------------Milestone names start----------------------------*/
  milestoneNamesfun(value) {
    debugger;
    $('.page-loader-wrapper').show();
      let url = this.cmn.commonUrl + "financial/getMileStoneDemandNoteDetails.spring";
      // hhttp://106.51.38.64:9999/employeeservice/block/blocks.spring
      console.log("url :" + url);
    
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      var body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "siteIds": [$("#projectID").val()].map(Number),
        "blockIds":value.map(Number),
        "condition":"VIEW_DEMAND_NOTES"
      }
    
      console.log("---- get mile stone details body :" + JSON.stringify(body));
      this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
    
        //$('.page-loader-wrapper').hide();
        console.log("milestone names list response----------" + JSON.stringify(resp));
        if(resp.responseCode == 200){
          $('.page-loader-wrapper').hide();
          $('#milestonesId').html('');
          $('#milestonesId').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList[0].financialProjectMileStoneResponse.length; i++) {
          $('#milestonesId').append("<option value='" + resp.responseObjList[0].financialProjectMileStoneResponse[i].projectMilestoneId + "'>" + resp.responseObjList[0].financialProjectMileStoneResponse[i].milestoneName + "</option>");
        
        }
      }else if(resp.responseCode ==440){
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      }else{
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
  /*-----------------------------Milestone names end----------------------------*/
 
  demandNotes(){
    $("#milestone_blocks_tables").show();

    return false;
    var projectidval;
    var blockidval;
    var flatidval;
    var milestoneidval;
    // alert($("#projectID").val());
    // alert($("#BlockId").val());
    // alert($("#FlatId").val());
    // alert($("#milestonesId").val());
    
    if($("#projectID").val() == "select" ||  $("#projectID").val() == null){
       projectidval = []
    }else{
      projectidval = [$("#projectID").val()]
    }

    if($("#BlockId").val() == "select" ||  $("#BlockId").val() == null){
      blockidval = []
   }else{
     blockidval = [$("#BlockId").val()]
   }

   if($("#FlatId").val() == "select" ||  $("#FlatId").val() == null){
    flatidval = []
 }else{
   flatidval = [$("#FlatId").val()]
 }

 if($("#milestonesId").val() == "select" ||  $("#milestonesId").val() == null){
  milestoneidval = []
}else{
  milestoneidval = [$("#milestonesId").val()]
}
    if ($("#projectID").val() == "select") {
      swal("Please select project");
      return false;
    }

    // if ($("#BlockId").val() == "select") {
    //   swal("Please select block");
    //   return false;
    // }

    // if ($("#FlatId").val() == "select") {
    //   swal("Please select Flat");
    //   return false;
    // }

    // if ($("#milestonesId").val() == "select") {
    //   swal("Please select milestone name");
    //   return false;
    // }
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/viewDemandNotes.spring";
    // http://localhost:8080/employeeservice/flat/flatBlock.spring
    console.log("url :" + url);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers }); 
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      //"flatIds": [$("#FlatId").val()],
    //  "blockIds": [$("#blockIds").val()],
      //"projectMileStoneIds" : [$("#milestonesId").val()]
      "siteIds":projectidval,
	"blockIds":blockidval,
	"flatIds":flatidval,
	"projectMileStoneIds":milestoneidval
    }

   
    console.log("----body :" + JSON.stringify(body));
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      console.log("View demand note response----------" + JSON.stringify(resp));
      if(resp.responseCode == 200){
        $("#milestone_blocks_tables").show();
      // alert("Response Success")
      this.milestonedemand_table = resp.responseObjList.finBookingFormDemandNoteesponse;
      this.total_length = resp.responseObjList.finBookingFormDemandNoteesponse.length;
      // setTimeout(function(){
      //   $('#tableExport').DataTable();
      //  },1000);
    }else if(resp.responseCode ==440){
      swal("Your Session has been Timed Out!", "Please login once again.", "error");
      this.router.navigate([""]);
    }else{
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
  demandnoteView(pdfurl){
//alert(pdfurl);
window.open(pdfurl,"_blank"); 

  }

  homeClick(){
    // this.router.navigate(['leave-update']);
    this.cmn.commonHomeNavigation1();
  }
  view_leadinfo(myjson){
    //this.router.navigate(['view-lead-creation'])
    this.router.navigate(['update-lead-creation'],  {state: myjson});
  }

}
