import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { HttpClient } from "@angular/common/http";

import { Router } from "@angular/router";
import 'rxjs/add/operator/map';
import { CommonComponent } from 'src/app/common/common.component';

//import { getMaxListeners } from 'cluster';
declare const $: any;
declare const swal: any

@Component({
  selector: 'app-lead-creation',
  templateUrl: './lead-creation.component.html',
  styleUrls: ['./lead-creation.component.sass']
})
export class LeadCreationComponent implements OnInit {
  bookingForData: any;
  tabList: any;
  Name_val: any;
  email_val: any;
  mobile_val: any;

  constructor(private router: Router,private cmn: CommonComponent,) {
    $('.page-loader-wrapper').hide();
    this.bookingForData = JSON.stringify(router.getCurrentNavigation().extras.state);
    this.tabList = [
                    'LEAD DETAIL',
                    'LEAD INFORMATION',
                    'HOUSING REQUIREMENTS',
                    'ADDRESS INFORMATION',
                    'MARKETING DETAILS',
                   
                   ];
  
   }

  ngOnInit() {
    $(function() {
      $("label").css("font-weight","bold")
      $("#wizard_with_validation-t-5").hide();
      $("#wizard_with_validation-t-6").hide();
      $("#wizard_with_validation-t-7").hide();
      $("#wizard_with_validation-t-8").hide();
     
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

//Advanced form with validation
var form = $('#wizard_with_validation').show();
form.steps({
    headerTag: 'h3',
    bodyTag: 'fieldset',
    stepsOrientation: 'vertical',
    //enablePagination: true,
   // enableAllSteps: true,
    //transitionEffect: 'slideLeft',
    onInit: function (event, currentIndex) {

        //Set tab width
        var $tab = $(event.currentTarget).find('ul[role="tablist"] li');
        var tabCount = 10;
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

  
//     $(".waves-effect").click(function () {
//      // this.router.navigate(['/lead-creation-list']);
//       var value = $(this).val();
//     //  alert(value)
//       var value = $(this).text();
//       if (value == "Finish") {
//       swal("Lead created Successfully");
//      // this.router.navigate(['crmmodule/lead-creation-list'])
//    //  this.router.navigate(['/lead-creation-list']);
//  // this.router.navigate(['crmmodule/lead-creation-list']);
//      window.location.href="http://106.51.38.64:9999/sumadhura_UAT/#/lead-creation-list"
      
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

  createLead(){
    swal("Lead created Successfully");
    this.router.navigate(['/lead-creation-list']);
  }

  leadDetails(){
 
    if($("#Name_val").val() == ""){
      swal("Please enter name");
      return false;
    }

    if($("#email_val").val() == ""){
      swal("Please enter email");
      return false;
    }

    if($("#mobileid").val() == ""){
      swal("Please enter mobile");
      return false;
    }

    swal("Lead created Successfully");
    this.router.navigate(['/lead-creation-list']);
  }

  homeClick(){
    this.cmn.commonHomeNavigation1();
  }
  
}
