import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { HttpClient } from "@angular/common/http";

import { Router } from "@angular/router";
import 'rxjs/add/operator/map';
import { CommonComponent } from 'src/app/common/common.component';

//import { getMaxListeners } from 'cluster';
declare const $: any;
declare const swal: any
var leadlist_Data;
@Component({
  selector: 'app-update-lead-creation',
  templateUrl: './update-lead-creation.component.html',
  styleUrls: ['./update-lead-creation.component.sass']
})
export class UpdateLeadCreationComponent implements OnInit {
  templates_array: { name: string; type: string; description: string; }[];
  leadlistData: string;
  bookingForData : any;
  tabList : any;
  activityHistory : any;
  activityHistory2 : any;
  activityHistory3 : any;

  site_visit : any;
  site_visit2 : any;
  site_visit3 : any;

  open_activites:any;
  open_activites2:any;
  open_activites3:any;

  
  constructor(private router: Router,private cmn: CommonComponent,) {
    leadlist_Data = router.getCurrentNavigation().extras.state;

    this.leadlistData = JSON.stringify(router.getCurrentNavigation().extras.state);
console.log("---"+this.leadlistData)
    $('.page-loader-wrapper').hide();
    this.bookingForData = JSON.stringify(router.getCurrentNavigation().extras.state);
    this.tabList = [
                    'LEAD DETAIL',
                    'LEAD INFORMATION',
                    'HOUSING REQUIREMENTS',
                    'ADDRESS INFORMATION',
                    'MARKETING DETAILS',
                    'MARK AS OPPORTUNITY',
                    'OPEN ACTIVITIES',
                    'ACTIVITY HISTORY',
                    'LEAD HISTORY',
                    'SITE VISIT'

                   ];

                  this.open_activites = [
                    {
                       "subject": "General flow",
                        "Status": "Open",
                        "Assigned_To": "Ms.Alekya",
                        "Name": "Mr. Robert",
                        "Due_Date": "10/07/2020",
                        "Priority": "Normal",
                        "Description": "Spoke normally",
                        "Type": "",
                        "Time": "02/02/2020",
                        "First_Completed_Activity": "Yes",
                        "Related_To": "",
                        "Comments": "Spoke normally",
                        "Follow_up_Description": "Spoke normally",
                        "Follow_up_Type": "",
                        "Follow_up_Date": "15/07/2020",
                        "Follow_up_Time": "11.00 AM",
                    },
                  ]

                  this.open_activites2 = [
                    {
                       "subject": "General flow",
                        "Status": "Open",
                        "Assigned_To": "Mr.Mohammad Gous",
                        "Name": "Mr. Robert",
                        "Due_Date": "25/05/2020",
                        "Priority": "High",
                        "Description": "Spoke normally",
                        "Type": "",
                        "Time": "25/04/2020",
                        "First_Completed_Activity": "Yes",
                        "Related_To": "",
                        "Comments": "Spoke normally",
                        "Follow_up_Description": "Spoke normally",
                        "Follow_up_Type": "",
                        "Follow_up_Date": "16/07/2020",
                        "Follow_up_Time": "11.00 AM",
                    },
                  ]

                  this.open_activites3 = [
                    {
                       "subject": "General flow",
                        "Status": "Open",
                        "Assigned_To": "Mr.Prasad",
                        "Name": "Mr.Ram",
                        "Due_Date": "22/01/2020",
                        "Priority": "Normal",
                        "Description": "Ringing, No Response",
                        "Type": "",
                        "Time": "21/01/2020",
                        "First_Completed_Activity": "Yes",
                        "Related_To": "",
                        "Comments": "Ringing, No Response",
                        "Follow_up_Description": "Ringing, No Response",
                        "Follow_up_Type": "",
                        "Follow_up_Date": "",
                        "Follow_up_Time": "",
                    },
                  ]

                   this.site_visit = [
                     {
                    
                     "Site_Visit_Name" : "STVST_00025",
                     "Lead" : "Mr.Robert",
                     "Date_of_Visit" : "10/07/2020",
                     "Opportunity" : "",
                     "Actual_Site_visit_Date" : "10/07/2020",
                     "Sales_Rep" : "Mr. Ashok",
                     "Site_Visit_Status" : "Scheduled",
                     "Customer_Email" : "",
                     "Site_visit_Comments" : "Will visit again",
                     "Projects_Name" : "Greenspace",
                     "Site_Visit_Priorityit" : "Normal",
                     "Site_Visit_Aging" : "36 days",
                     "Current_User" : "",
                     "Walk_in_form_Number" : "",
                     "Opportunity_Aging" : "",
                     "Site_Lead_Aging" : "",
                     "Squad_Time_to_visit" : "",
                     "Squad_Voice_Record_URL" : "",
                     "Opportunity_Id" : "",
                    }
                   ]

                   this.site_visit2 = [
                    {
                   
                    "Site_Visit_Name" : "STVST_00052",
                    "Lead" : "Mr.Mohammad Gous",
                    "Date_of_Visit" : "25/05/2020",
                    "Opportunity" : "",
                    "Actual_Site_visit_Date" : "25/05/2020",
                    "Sales_Rep" : "Mr. Ashok",
                    "Site_Visit_Status" : "Completed",
                    "Customer_Email" : "",
                    "Site_visit_Comments" : "Will visit again",
                    "Projects_Name" : "Greenspace",
                    "Site_Visit_Priorityit" : "Normal",
                    "Site_Visit_Aging" : "82 days",
                    "Current_User" : "",
                    "Walk_in_form_Number" : "",
                    "Opportunity_Aging" : "",
                    "Site_Lead_Aging" : "",
                    "Squad_Time_to_visit" : "",
                    "Squad_Voice_Record_URL" : "",
                    "Opportunity_Id" : "",
                   }
                  ]

                  this.site_visit3 = [
                    {
                   
                    "Site_Visit_Name" : "STVST_00005",
                    "Lead" : "Mrs.Stela",
                    "Date_of_Visit" : "05/02/2020",
                    "Opportunity" : "",
                    "Actual_Site_visit_Date" : "05/02/2020",
                    "Sales_Rep" : "Mr. Ashok",
                    "Site_Visit_Status" : "Completed",
                    "Customer_Email" : "",
                    "Site_visit_Comments" : "Will visit again",
                    "Projects_Name" : "Greenspace",
                    "Site_Visit_Priorityit" : "Normal",
                    "Site_Visit_Aging" : "36 days",
                    "Current_User" : "",
                    "Walk_in_form_Number" : "",
                    "Opportunity_Aging" : "",
                    "Site_Lead_Aging" : "",
                    "Squad_Time_to_visit" : "",
                    "Squad_Voice_Record_URL" : "",
                    "Opportunity_Id" : "",
                   }
                  ]

                   this.activityHistory = [
                     {
                        "subject": "General flow",
                        "Status": "Closed",
                        "Assigned_To": "Ms.Alekya",
                        "Name": "Mr. Robert",
                        "Due_Date": "02/02/2020",
                        "Priority": "Normal",
                        "Description": "Spoke normally",
                        "Type": "",
                        "Time": "01/02/2020",
                        "First_Completed_Activity": "Yes",
                        "Related_To": "",
                        "Comments": "Spoke normally",
                        "Follow_up_Description": "Spoke normally",
                        "Follow_up_Type": "",
                        "Follow_up_Date": "10/07/2020",
                        "Follow_up_Time": "10.00 AM",
                        
                     },

                     {
                      "subject": "General flow",
                      "Status": "Open",
                      "Assigned_To": "Ms.Alekya",
                      "Name": "Mr. Robert",
                      "Due_Date": "10/07/2020",
                      "Priority": "Normal",
                      "Description": "Spoke normally",
                      "Type": "",
                      "Time": "02/02/2020",
                      "First_Completed_Activity": "Yes",
                      "Related_To": "",
                      "Comments": "Spoke normally",
                      "Follow_up_Description": "Spoke normally",
                      "Follow_up_Type": "",
                      "Follow_up_Date": "15/07/2020",
                      "Follow_up_Time": "11.00 AM",
                      
                   },

                   ]

                   this.activityHistory2 = [
                    {
                       "subject": "General flow",
                       "Status": "Closed",
                       "Assigned_To": "Ms.Alekya",
                       "Name": "Mr.Mohammad Gous",
                       "Due_Date": "25/04/2020",
                       "Priority": "Normal",
                       "Description": "Spoke normally",
                       "Type": "",
                       "Time": "24/04/2020",
                       "First_Completed_Activity": "Yes",
                       "Related_To": "",
                       "Comments": "Spoke normally",
                       "Follow_up_Description": "Spoke normally",
                       "Follow_up_Type": "",
                       "Follow_up_Date": "25/05/2020",
                       "Follow_up_Time": "10.00 AM",
                       
                    },

                    {
                     "subject": "General flow",
                     "Status": "Open",
                     "Assigned_To": "Ms.Alekya",
                     "Name": "Mr.Mohammad Gous",
                     "Due_Date": "25/05/2020",
                     "Priority": "High",
                     "Description": "Spoke normally",
                     "Type": "",
                     "Time": "25/04/2020",
                     "First_Completed_Activity": "Yes",
                     "Related_To": "",
                     "Comments": "Spoke normally",
                     "Follow_up_Description": "Spoke normally",
                     "Follow_up_Type": "",
                     "Follow_up_Date": "16/07/2020",
                     "Follow_up_Time": "11.00 AM",
                     
                  },

                  ]

                  this.activityHistory3 = [
                    {
                       "subject": "General flow",
                       "Status": "Closed",
                       "Assigned_To": "Mr.Satish",
                       "Name": "Mrs.Stela",
                       "Due_Date": "21/01/2020",
                       "Priority": "Normal",
                       "Description": "Spoke normally",
                       "Type": "",
                       "Time": "20/01/2020",
                       "First_Completed_Activity": "Yes",
                       "Related_To": "",
                       "Comments": "Spoke normally",
                       "Follow_up_Description": "Spoke normally",
                       "Follow_up_Type": "",
                       "Follow_up_Date": "05/02/2020",
                       "Follow_up_Time": "02.00 PM",
                       
                    },

                    {
                     "subject": "General flow",
                     "Status": "Open",
                     "Assigned_To": "Mr.Satish",
                     "Name": "Mrs.Stela",
                     "Due_Date": "05/02/2020",
                     "Priority": "High",
                     "Description": "Ringing, No Response",
                     "Type": "",
                     "Time": "21/01/2020",
                     "First_Completed_Activity": "Yes",
                     "Related_To": "",
                     "Comments": "Ringing, No Response",
                     "Follow_up_Description": "Ringing, No Response",
                     "Follow_up_Type": "",
                     "Follow_up_Date": "05/02/2020",
                     "Follow_up_Time": "02.00 PM",
                     
                  },

                  ]
    this.templates_array = [
      {
        "name":"Contact: Follow up (Sample)",
        "type":"Text",
        "description":"Follow up on meeting",
        

      },
      {
        "name":"Leads:New assignment notification(Sample)",
        "type":"Text",
        "description":"Internal notification to lead owner when new lead is assigned",
        
       

      },
      {
        "name":"Leads:Web-to-Lead email response(Sample)",
        "type":"Text",
        "description":"Auto-responsewhen new lead is submitted online",
      
        

      }
    ]
   }

  ngOnInit() {
    $(function() {
      $("label").css("font-weight","bold")
     if(leadlist_Data.leadId == 13567){
        $("#acthistry1").show()
        $("#nodata").hide()
     }else if(leadlist_Data.leadId == 12456){
      $("#acthistry2").show()
      $("#nodata").hide()
    }else if(leadlist_Data.leadId == 12341){
      $("#acthistry3").show()
      $("#nodata").hide()
    }else{
      $("#nodata").show()
    }

    if(leadlist_Data.leadId == 13567){
      $("#sitvst1").show()
      $("#nodata_sitvist").hide()
   }else if(leadlist_Data.leadId == 12456){
    $("#sitvst2").show()
    $("#nodata_sitvist").hide()
  }else if(leadlist_Data.leadId == 12341){
    $("#sitvst3").show()
    $("#nodata_sitvist").hide()
  }else{
    $("#nodata_sitvist").show()
  }

      $("#lead_id").val(leadlist_Data.leadId);
      $("#nameid").val(leadlist_Data.name);
      $("#company_id").val(leadlist_Data.company);
      $("#disignation_id").val(leadlist_Data.Designation);
      $("#registeredon_id").val(leadlist_Data.RegisteredOn);
      $("#location_id").val(leadlist_Data.location);
      $("#lead_crtd_sit_scdule_id").val(leadlist_Data.name);
      $("#email_id").val(leadlist_Data.mail_id);
      $("#aternative_email_id").val(leadlist_Data.Alternative_Email);
      $("#alter_email2_id").val(leadlist_Data.Alternative_Email_2);
      $("#mobileid").val(leadlist_Data.Mobile);
      $("#addi_mob_id").val(leadlist_Data.Alternative_Mobile);
      $("#add_mob2_id").val(leadlist_Data.Alternative_Mobile_2);
      $("#phone_id").val(leadlist_Data.phone);
      $("#extension_id").val(leadlist_Data.Extension);
      $("#projectID").val(leadlist_Data.Projects);
      $("#timeslotID").val(leadlist_Data.time_slot);
      $("#projectlocID").val(leadlist_Data.Preffered_Project_Location);
      $("#channel_partner_id").prop("checked", leadlist_Data.channel_partner_id);;
      $("#walkinformId").prop("checked", leadlist_Data.walik_in_form_1);
      
      $("#second_source_id").val(leadlist_Data.Second_Source);
      $("#third_srce_id").val(leadlist_Data.Thired_Source);
      $("#reactive_source_id").val(leadlist_Data.Reactivated_Source);
      $("#Reason").val(leadlist_Data.reason);
      $("#last_task_comments").val(leadlist_Data.last_task_coments);
      $("#rating_id").val(leadlist_Data.rating);
      $("#lead_sub_status_id").val(leadlist_Data.lead_sub_status);
      $("#sourcedescID").val(leadlist_Data.Source_Description);
      $("#firstsourceID").val(leadlist_Data.first_source);
      $("#latsrcID").val(leadlist_Data.latest_source);
      $("#leadownerID").val(leadlist_Data.Lead_Owner);
      $("#leadstatusID").val(leadlist_Data.Lead_Status);
 
      $("#house_type_id").val(leadlist_Data.House_Type);
      $("#comments_id").val(leadlist_Data.Comments);
      $("#max_budget").val(leadlist_Data.Maximum_Budget);
      $("#mini_budget_id").val(leadlist_Data.Minimum_Budget);
      $("#budge_range_id").val(leadlist_Data.Budget_range);
      $("#req_type").val(leadlist_Data.Requirement_Type);
      $("#flat_area_id").val(leadlist_Data.Flat_Area);
      $("#timeframepurID").val(leadlist_Data.Time_frame_to_Purchase);
      $("#housinreqID").val(leadlist_Data.Housing_Requirement);
     
      $("#area_id").val(leadlist_Data.Area);
      $("#lacality_id").val(leadlist_Data.Locality);
      $("#alt_address").val(leadlist_Data.Alternative_Address);
      $("#cityID").val(leadlist_Data.city);
      $("#stateID").val(leadlist_Data.state);
      
      if(leadlist_Data.leadId == "14900"){
       $("#fbid").show();
       $("#linkedinid").hide();
       $("#livechat").hide();
       $("#channelpartner").hide();
       $("#referencediv").hide();
       $("#marketingID").val("Facebook");
       $("#facebook_leadId").val("FB98756");
       
      }else if(leadlist_Data.leadId == "13788"){
       $("#fbid").hide();
       $("#linkedinid").show();
       $("#livechat").hide();
       $("#channelpartner").hide();
       $("#referencediv").hide();
       $("#marketingID").val("LinkedIn");
       $("#linked_lead_id").val("LI78745");
       
      }else if(leadlist_Data.leadId == "13567"){
       $("#fbid").hide();
       $("#linkedinid").hide();
       $("#livechat").hide();
       $("#channelpartner").show();
       $("#referencediv").hide();
       $("#marketingID").val("Channel Partner");
 
       $("#chanel_partnr_leadId").val("CP985");
       $("#chanel_partnr_name").val("Anand Consulatancy");
       $("#chanel_partnr_address").val("Hyderabad");
       $("#chanel_partnr_number").val("9856978214");
      }else if(leadlist_Data.leadId == "12456"){
       $("#fbid").hide();
       $("#linkedinid").hide();
       $("#livechat").hide();
       $("#channelpartner").hide();
       $("#referencediv").show();
       
       $("#reference_name").val("Alekya");
       $("#reference_project").val("Sunshine");
       $("#reference_unit_number").val("R4565");
 
       $("#marketingID").val("Reference");
     }else if(leadlist_Data.leadId == "12345"){
       $("#fbid").hide();
       $("#linkedinid").hide();
       $("#livechat").hide();
       $("#channelpartner").show();
       $("#referencediv").hide();
       $("#marketingID").val("Channel Partner");
       $("#chanel_partnr_leadId").val("CP985");
       $("#chanel_partnr_name").val("Anand Consulatancy");
       $("#chanel_partnr_address").val("Hyderabad");
       $("#chanel_partnr_number").val("9856978214");
     }else if(leadlist_Data.leadId == "12341"){
       $("#fbid").hide();
       $("#linkedinid").show();
       $("#livechat").hide();
       $("#channelpartner").hide();
       $("#referencediv").hide();
       $("#marketingID").val("LinkedIn");
       $("#linked_lead_id").val("LIP9853");
     }
     // $(".bootstrap-select").css("display","block")
      //$(".dropdown-toggle").css("display","block")
      $('#marketingID').change(function(e) {
        var selected = $(e.target).val();
        console.log(selected);
        if(selected == "select"){
         
        }else if(selected == "Facebook"){
         $("#fbid").show();
         $("#linkedinid").hide();
         $("#livechat").hide();
         $("#channelpartner").hide();
         $("#referencediv").hide();
         
        }else if(selected == "livechat"){
          $("#fbid").hide();
          $("#linkedinid").hide();
          $("#livechat").show();
          $("#channelpartner").hide();
          $("#referencediv").hide();
        }else if(selected == "LinkedIn"){
          $("#fbid").hide();
          $("#linkedinid").show();
          $("#livechat").hide();
          $("#channelpartner").hide();
          $("#referencediv").hide();
        }else if(selected == "Channel Partner"){
          $("#fbid").hide();
          $("#linkedinid").hide();
          $("#livechat").hide();
          $("#channelpartner").show();
          $("#referencediv").hide();
          
        }else if(selected == "Reference"){
          $("#fbid").hide();
          $("#linkedinid").hide();
          $("#livechat").hide();
          $("#channelpartner").hide();
          $("#referencediv").show();
          
        }
    });
      $('#sitevisitename').click(function(){
        $("#sitevisitDetailModal").modal()
    });
      $('#sitevisitId').click(function(){
        $("#sitevisitModal").modal()
    });
      $('#logacallId').click(function(){
        $("#logcallModal").modal()
    });

    $('#sendemailId').click(function(){
      
      $("#sendanemailModal").modal()
  });
  $("#log_timeId").select2({
    placeholder: "Select Time",
    dir: "ltl"
  });
  $("#log_statusId").select2({
    placeholder: "Select Status",
    dir: "ltl"
  });
  $("#log_priorityId").select2({
    placeholder: "Select Priority",
    dir: "ltl"
  });
  $("#log_typeId").select2({
    placeholder: "Select Type",
    dir: "ltl"
  });
  $("#cityID").select2({
    placeholder: "Select City",
    dir: "ltl"
  });

  $("#stateID").select2({
    placeholder: "Select State",
    dir: "ltl"
  });

  $("#marketingID").select2({
    placeholder: "Select Type",
    dir: "ltl"
  });
  $("#timeframepurID").select2({
    placeholder: "Select Time Frame",
    dir: "ltl"
  });

  $("#housinreqID").select2({
    placeholder: "Select Housing Requirements",
    dir: "ltl"
  });
  $("#leadstatusID").select2({
    placeholder: "Select Lead Status",
    dir: "ltl"
  });

  $("#leadownerID").select2({
    placeholder: "Select Lead Owner",
    dir: "ltl"
  });
  
  $("#latsrcID").select2({
    placeholder: "Select Latest Source",
    dir: "ltl"
  });
  $("#firstsourceID").select2({
    placeholder: "Select First Source",
    dir: "ltl"
  });
  $("#sourcedescID").select2({
    placeholder: "Select Source Description",
    dir: "ltl"
  });
  $("#projectID").select2({
    placeholder: "Select Type",
    dir: "ltl"
  });
  $("#timeslotID").select2({
    placeholder: "Select Type",
    dir: "ltl"
  });

$("#projectlocID").select2({
  placeholder: "Select Type",
  dir: "ltl"
});
  $("#sitevisitstatusId").select2({
    placeholder: "Select Status",
    dir: "ltl"
  });
  $("#sitevisitpriorityId").select2({
    placeholder: "Select Priority",
    dir: "ltl"
  });
    $("#typeId").select2({
      placeholder: "Select Type",
      dir: "ltl"
    });

    $("#priorityId").select2({
      placeholder: "Select Priority",
      dir: "ltl"
    });

    $("#statusId").select2({
      placeholder: "Select Status",
      dir: "ltl"
    });

    $("#timeId").select2({
      placeholder: "Select Time",
      dir: "ltl"
    });
     

   
    $("#leadstatusID").select2({
      placeholder: "Select Lead Status",
      dir: "ltl"
    });

    $("#leadownerID").select2({
      placeholder: "Select Lead Owner",
      dir: "ltl"
    });
    
    $("#latsrcID").select2({
      placeholder: "Select Latest Source",
      dir: "ltl"
    });

    

    
    
  });
  // $('#wizard_horizontal').steps({
//     headerTag: 'h2',
//     bodyTag: 'section',
//     transitionEffect: 'slideLeft',
//     onInit: function (event, currentIndex) {
//         setButtonWavesEffect(event);
//     },
//     onStepChanged: function (event, currentIndex, priorIndex) {
//         setButtonWavesEffect(event);
//     }
// });

//Vertical form basic
// $('#wizard_vertical').steps({
//     headerTag: 'h2',
//     bodyTag: 'section',
//     transitionEffect: 'slideLeft',
//     stepsOrientation: 'vertical',
//     onInit: function (event, currentIndex) {
//         setButtonWavesEffect(event);
//     },
//     onStepChanged: function (event, currentIndex, priorIndex) {
//         setButtonWavesEffect(event);
//     }
// });

//Advanced form with validation
var form = $('#wizard_with_validation').show();
form.steps({
    headerTag: 'h3',
    bodyTag: 'fieldset',
    stepsOrientation: 'vertical',
    transitionEffect: 'slideLeft',
    onInit: function (event, currentIndex) {

        //Set tab width
        var $tab = $(event.currentTarget).find('ul[role="tablist"] li');
        var tabCount = $tab.length;
        $tab.css('width', (100 / tabCount) + '%');

        //set button waves effect
        setButtonWavesEffect(event);
    },
    onStepChanging: function (event, currentIndex, newIndex) {
        if (currentIndex > newIndex) { return true; }

        if (currentIndex < newIndex) {
            form.find('.body:eq(' + newIndex + ') label.error').remove();
            form.find('.body:eq(' + newIndex + ') .error').removeClass('error');
        }

        form.validate().settings.ignore = ':disabled,:hidden';
        return form.valid();
    },
    onStepChanged: function (event, currentIndex, priorIndex) {
        setButtonWavesEffect(event);
    },
    onFinishing: function (event, currentIndex) {
        form.validate().settings.ignore = ':disabled';
        return form.valid();
    },
    onFinished: function (event, currentIndex) {
        swal("Good job!", "Submitted!", "success");
    }
});

form.validate({
    highlight: function (input) {
        $(input).parents('.form-line').addClass('error');
    },
    unhighlight: function (input) {
        $(input).parents('.form-line').removeClass('error');
    },
    errorPlacement: function (error, element) {
        $(element).parents('.form-group').append(error);
    },
    rules: {
        'confirm': {
            equalTo: '#password'
        }
    }
});


function setButtonWavesEffect(event) {
$(event.currentTarget).find('[role="menu"] li a').removeClass('waves-effect');
$(event.currentTarget).find('[role="menu"] li:not(.disabled) a').addClass('waves-effect');
}

  
    $(".waves-effect").click(function () {
     // this.router.navigate(['/lead-creation-list']);
      var value = $(this).val();
    //  alert(value)
      var value = $(this).text();
      if (value == "Finish") {
      swal("Updated Successfully");
     // this.router.navigate(['crmmodule/lead-creation-list'])
   //  this.router.navigate(['/lead-creation-list']);
     // this.router.navigate(['crmmodule/lead-creation-list']);
    // window.location.href="http://localhost:4200/#/lead-creation-list"
      
      }
    })
  }
  logaCallsubmission(){
    swal("Progressing")
  }

  sendanemailsubmission(){

  }

  selectTemplateclick(){
$("#selecttemplateModal").modal()
  }

  nameforbody(itme_name){

      $("#textarea_body").val(itme_name)
      $('#selecttemplateModal').modal('hide');
      $("#sendanemailModal").modal();
  }

  siteVisitsubmission(){
    swal("Progressing");
  }
 
  siteVisitedit(){
   swal("Progressing")
  }

  siteVisitdelete(){
    swal("Progressing")
  }
  customCsstabs(id){
    if (id == 0) {
      return 'active'
    } else {
      return 'tab-pane fade show'
    }
  }

  activityhistrygenflowModal(itemdata){
    $("#activityHistoryModal").modal();

    $("#subjectId").val(itemdata.subject);
    $("#statusId").val(itemdata.Status);
    $("#assignedId").val(itemdata.Assigned_To);
    $("#nameId").val(itemdata.Name);
    $("#duedateId").val(itemdata.Due_Date);
    $("#priorityId").val(itemdata.Priority);
    $("#descriptionId").val(itemdata.Description);
    $("#typeId").val(itemdata.Type);
    $("#timeId").val(itemdata.Time);
    $("#FirstCompletedActivityId").val(itemdata.First_Completed_Activity);
    $("#RelatedToId").val(itemdata.Related_To);
    $("#CommentsId").val(itemdata.Comments);
    $("#FollowupDescriptionId").val(itemdata.Follow_up_Description);
    $("#FollowupTypeId").val(itemdata.Follow_up_Type);
    $("#FollowupDateId").val(itemdata.Follow_up_Date);
    $("#FollowupTimeId").val(itemdata.Follow_up_Time);

  }

  sitvisit_modalclick(itemdata){
    $("#sitevisitDetailModal").modal()

    $("#sitevisitname").val(itemdata.Site_Visit_Name);
    $("#leadid").val(itemdata.Lead);
    $("#dueofvisitId").val(itemdata.Date_of_Visit);
    $("#opportunityId").val(itemdata.Opportunity);
    $("#actsitedateId").val(itemdata.Actual_Site_visit_Date);
    $("#salesrepId").val(itemdata.Sales_Rep);
    $("#siteVisitstatusId").val(itemdata.Site_Visit_Status);
    $("#custemailId").val(itemdata.Customer_Email);
    $("#sit_vst_cmnt_Id").val(itemdata.Site_visit_Comments);
    $("#projectnameId").val(itemdata.Projects_Name);
    $("#sit_vst_priority_Id").val(itemdata.Site_Visit_Priorityit);
    $("#sit_visit_aging_Id").val(itemdata.Site_Visit_Aging);
    $("#current_user_Id").val(itemdata.Current_User);
    $("#walk_in_form_number_id").val(itemdata.Walk_in_form_Number);
    $("#oportunty_aging_Id").val(itemdata.Opportunity_Aging);
    $("#sit_lead_aging_Id").val(itemdata.Site_Lead_Aging);
    $("#sqad_time_of_vst_Id").val(itemdata.Squad_Time_to_visit);
    $("#sqad_voice_rec_url_Id").val(itemdata.Squad_Voice_Record_URL);
    $("#opportunit_Id").val(itemdata.Opportunity_Id);
  }

  updateLead(){
    swal("Lead details successfully updated");
    this.router.navigate(['update-lead-list'])
  }

  homeClick(){
    this.cmn.commonHomeNavigation1();
  }
}
