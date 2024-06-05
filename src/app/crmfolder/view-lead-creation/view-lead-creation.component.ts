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
  selector: 'app-view-lead-creation',
  templateUrl: './view-lead-creation.component.html',
  styleUrls: ['./view-lead-creation.component.sass']
})
export class ViewLeadCreationComponent implements OnInit {
  leadlistData: string;
  bookingForData: any;
  tabList: any;


  constructor(private router: Router,private cmn: CommonComponent) {
    $('.page-loader-wrapper').hide();
    this.bookingForData = JSON.stringify(router.getCurrentNavigation().extras.state);
    this.tabList = [
                    'LEAD DETAIL',
                    'LEAD INFORMATION',
                    'HOUSING REQUIREMENTS',
                    'ADDRESS INFORMATION',
                    'MARKETING DETAILS',
                   
                   ];
    leadlist_Data = router.getCurrentNavigation().extras.state;

    this.leadlistData = JSON.stringify(router.getCurrentNavigation().extras.state);
console.log("---"+this.leadlistData)


   }

  ngOnInit() {
    $(function() {
      $("label").css("font-weight","bold")
      $("input").prop('disabled', true);
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
     
     if(leadlist_Data.leadId == "12341"){
      $("#fbid").show();
      $("#linkedinid").hide();
      $("#livechat").hide();
      $("#channelpartner").hide();
      $("#referencediv").hide();
      $("#marketingID").val("Facebook");
      $("#facebook_leadId").val("FB98756");
      
     }else if(leadlist_Data.leadId == "12345"){
      $("#fbid").hide();
      $("#linkedinid").show();
      $("#livechat").hide();
      $("#channelpartner").hide();
      $("#referencediv").hide();
      $("#marketingID").val("LinkedIn");
      $("#linked_lead_id").val("LI78745");
      
     }else if(leadlist_Data.leadId == "123456"){
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
     }else if(leadlist_Data.leadId == "123457"){
      $("#fbid").hide();
      $("#linkedinid").hide();
      $("#livechat").hide();
      $("#channelpartner").hide();
      $("#referencediv").show();
      $("#marketingID").val("Reference");

      $("#marketingID").val("Reference");
    }else if(leadlist_Data.leadId == "13788"){
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
    }else if(leadlist_Data.leadId == "14900"){
      $("#fbid").hide();
      $("#linkedinid").show();
      $("#livechat").hide();
      $("#channelpartner").hide();
      $("#referencediv").hide();
      $("#marketingID").val("LinkedIn");
      $("#linked_lead_id").val("LIP9853");
    }
     
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
    $("#timeframepurID").select2({
      placeholder: "Select Time Frame",
      dir: "ltl"
    });

    $("#housinreqID").select2({
      placeholder: "Select Housing Requirements",
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

    $('#marketingID').change(function(e) {
      var selected = $(e.target).val();
      console.log(selected);
      if(selected == "select"){
       
      }else if(selected == "facebook"){
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
      }else if(selected == "linkedin"){
        $("#fbid").hide();
        $("#linkedinid").show();
        $("#livechat").hide();
        $("#channelpartner").hide();
        $("#referencediv").hide();
      }else if(selected == "cahnelpartner"){
        $("#fbid").hide();
        $("#linkedinid").hide();
        $("#livechat").hide();
        $("#channelpartner").show();
        $("#referencediv").hide();
        
      }else if(selected == "reference"){
        $("#fbid").hide();
        $("#linkedinid").hide();
        $("#livechat").hide();
        $("#channelpartner").hide();
        $("#referencediv").show();
        
      }
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

// //Advanced form with validation
// var form = $('#wizard_with_validation').show();
// form.steps({
//     headerTag: 'h3',
//     bodyTag: 'fieldset',
//     stepsOrientation: 'vertical',
//     //transitionEffect: 'slideLeft',
//     onInit: function (event, currentIndex) {

//         //Set tab width
//         var $tab = $(event.currentTarget).find('ul[role="tablist"] li');
//         var tabCount = 10;
//         $tab.css('width', (100 / tabCount) + '%');

//         //set button waves effect
//         setButtonWavesEffect(event);
//     },
//     onStepChanging: function (event, currentIndex, newIndex) {
//         if (currentIndex > newIndex) { return true; }

//         if (currentIndex < newIndex) {
//             form.find('.body:eq(' + newIndex + ') label.error').remove();
//             form.find('.body:eq(' + newIndex + ') .error').removeClass('error');
//         }

//         form.validate().settings.ignore = ':disabled,:hidden';
//         return form.valid();
//     },
//     onStepChanged: function (event, currentIndex, priorIndex) {
//         setButtonWavesEffect(event);
//     },
//     onFinishing: function (event, currentIndex) {
//         form.validate().settings.ignore = ':disabled';
//         return form.valid();
//     },
//     onFinished: function (event, currentIndex) {
//       //  swal("Good job!", "Submitted!", "success");
//     }
// });

// form.validate({
//     highlight: function (input) {
//         $(input).parents('.form-line').addClass('error');
//     },
//     unhighlight: function (input) {
//         $(input).parents('.form-line').removeClass('error');
//     },
//     errorPlacement: function (error, element) {
//         $(element).parents('.form-group').append(error);
//     },
//     rules: {
//         'confirm': {
//             equalTo: '#password'
//         }
//     }
// });


// function setButtonWavesEffect(event) {
// $(event.currentTarget).find('[role="menu"] li a').removeClass('waves-effect');
// $(event.currentTarget).find('[role="menu"] li:not(.disabled) a').addClass('waves-effect');
// }

  
//     $(".waves-effect").click(function () {
//      // this.router.navigate(['/lead-creation-list']);
//       var value = $(this).val();
//     //  alert(value)
//       var value = $(this).text();
//       if (value == "Finish") {
//         $(this).hide()
//      // swal("Lead created Successfully");
//      // this.router.navigate(['crmmodule/lead-creation-list'])
//    //  this.router.navigate(['/lead-creation-list']);
//      // this.router.navigate(['crmmodule/lead-creation-list']);
//    //  window.location.href="http://localhost:4200/#/lead-creation-list"
      
//       }
//     })
   }
  customCsstabs(id){
    if (id == 0) {
      return 'active'
    } else {
      return 'tab-pane fade show'
    }
  }

  homeClick(){
    this.cmn.commonHomeNavigation1();
  }
}
