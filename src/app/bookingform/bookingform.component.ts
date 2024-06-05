import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { HttpClient } from "@angular/common/http";
import { CommonComponent } from '../common/common.component';
//import { Router } from "@angular/router";
import 'rxjs/add/operator/map';
import { ActivatedRoute, Router, RoutesRecognized } from "@angular/router";

import { filter, pairwise } from 'rxjs/operators';
import { AlertsComponent } from '../ui/alerts/alerts.component';

//import { getMaxListeners } from 'cluster';
declare const $: any;
declare const swal: any
@Component({
  selector: 'app-bookingform',
  templateUrl: './bookingform.component.html',
  styleUrls: ['./bookingform.component.sass']
})
export class BookingformComponent implements OnInit {
  bookingForData: any;
  a: any;
  b: any;
  n: any;
  num: any;
  value: any;
  submodule: string;
  pagename: string;
  navigateTo: string;
  module: string;
  tabList: any[];
  previousUrl: string;
  currentUrl: string;
  constructor(private http: Http, public cmn: CommonComponent, private router: Router) {
    $('.page-loader-wrapper').hide();
    sessionStorage.setItem('fromviewpagepredefined', "true");
   // alert(sessionStorage.getItem('fromviewpagepredefined_list'))
    $(function () {
      $(".datepicker").click(function () {
        $(".datepicker").datepicker();
      });

    });
    this.bookingForData = JSON.stringify(router.getCurrentNavigation().extras.state);
    this.tabList = [
                    'KYC DOCUMENTS (ALL APPLICANTS)',
                    'FIRST APPLICANT (MANDATORY)',
                    'SECOND APPLICANT (MANDATORY)',
                    'THIRD APPLICANT (MANDATORY)',
                    'UNIT DETAILS',
                    // 'TERMS AND CONDITIONS',
                    // 'BOOKING CONFIRMATION CHECKLIST-SALES HEAD',
                    // 'BOOKING CONFIRMATION CHECKLIST-CRM',
                    // 'AGREEMENT CHECKLIST-LEGAL OFFICER',
                    // 'REGISTRATION CHECKLIST'
                   ];
  }

  ngOnInit() {

    // this.router.events
    // .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
    // .subscribe((events: RoutesRecognized[]) => {
    //   this.previousUrl = events[0].urlAfterRedirects;
    //   this.currentUrl = events[1].urlAfterRedirects;
    
    //   if (this.previousUrl.includes('view-customers')) {
    //     sessionStorage.setItem('fromviewpagepredefined', "true");
    //    alert(sessionStorage.getItem("fromviewpagepredefined"));
    //   } else {
        
    //   }
    // });

    //Vertical form basic    
    $(".form-control").prop("disabled", true);
    $(".form-check-input").attr("disabled", true);
    $("input[type=radio]").attr('disabled', true);

    $('#wizard_vertical').steps({
      headerTag: 'h2',
      bodyTag: 'section',
      transitionEffect: 'slideLeft',
      stepsOrientation: 'vertical',
      onInit: function (event, currentIndex) {
        setButtonWavesEffect(event);
      },
      onStepChanged: function (event, currentIndex, priorIndex) {
        setButtonWavesEffect(event);
      }
    });
    var form = $('#wizard_with_validation').show();
    form.steps({
      headerTag: 'h3',
      bodyTag: 'fieldset',
      transitionEffect: 'slideLeft',
      onInit: function (event, currentIndex) {

        //Set tab width
        var $tab = $(event.currentTarget).find('ul[role="tablist"] li');
        var tabCount = $tab.length;
        $tab.css('width', (250 / tabCount) + '%');
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
        // alert(event+"---"+currentIndex);
        swal("Good job!", "Submitted!", "success");

      }

      // onFinish: function () { alert("Finish Clicked!") }
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
      //  $(".form-control").focus();

      $(".form-control").prop("disabled", true);
      $(".form-check-input").attr("disabled", true);
      $("input[type=radio]").attr('disabled', true);
      // this.MrMrsMs = "Mr";
      $(event.currentTarget).find('[role="menu"] li a').removeClass('waves-effect');
      $(event.currentTarget).find('[role="menu"] li:not(.disabled) a').addClass('waves-effect');
    }

    $(".waves-effect").click(function () {
      var value = $(this).text();
      if (value == "Finish") {
        var pageName = $("#pageName").val();
        if (pageName == "approveCustomerPage") {
          $("#approveModal").modal();
        } else {
          console.log("Success!.");
          alert("Success!.");
        }
      }
    })

  }
  ngAfterViewInit() {
    this.getBookingFormDetails();
    var getpageName = sessionStorage.getItem('getPageName');
    if (getpageName == "approveCustomerPage") {
    } else {
      $('#finishButton').hide();
      $('#wizard_vertical').find("a[href*='finish']").hide();
    }
  }

  approveModel(){
    var pageName = $("#pageName").val();
        if (pageName == "approveCustomerPage") {
          $("#approveModal").modal();
        } else {
        }
  }
  /*----------------------------Getting booking form details start-----------------------*/


  /*----------------------------Getting booking form details end-----------------------*/

  public getBookingFormDetails() {
    var bookingForData = JSON.parse(sessionStorage.getItem('approveCustData'));
    var getpageName = sessionStorage.getItem('getPageName');
   
    if (getpageName == "approveCustomerPage") {
     // alert("getpageName :"+getpageName);
      this.module = "Customer Registration";
      this.submodule = "Approve Customer";
      this.pagename = "Booking Form";
      this.navigateTo = "/approvedcustomer";
    } else {
     // alert("getpageName :"+getpageName);
      this.module = "View Customers";
      this.submodule = "View All Customers";
      this.pagename = "Customer Details";
      this.navigateTo = "/view-customers"
    }

    //binding kyc values in wizard
    var KYDDetails = bookingForData.customerKYCSubmitedInfo;
    console.log(KYDDetails);
    var str = "";
    for (var kyc = 0; kyc < KYDDetails.length; kyc++) {
      var docName = KYDDetails[kyc].docName;
      var status = KYDDetails[kyc].status;
      var statusForCheck = "";

      if (status == "true" || status == true) {
        statusForCheck = "checked"
      }
      str += '<div class="form-check m-l-10">'
        + '<label class="form-check-label">'
        + '<input class="form-check-input KYCCls" type="checkbox" ' + statusForCheck + ' disabled>'
        + docName
        + '<span class="form-check-sign"><span class="check"></span></span></label>'
        + '</div>'

    }
    $("#KYCDiv").html(str);

    //First Applicant Details
    var firstAppDetails = bookingForData.customerInfo;
    var firstAppBookingDetails = bookingForData.customerBookingInfo;
    var customerOtherDetails = bookingForData.customerOtherDetailsInfo;
    var professionalInfo = bookingForData.professionalInfo;
    var custPermanentAddress = bookingForData.addressInfos[0];
    var custCorespondingAddress = bookingForData.addressInfos[1];
    console.log("firstAppDetails " + JSON.stringify(firstAppDetails));
    console.log("professionalInfo " + JSON.stringify(firstAppBookingDetails));
    // console.log("custPermanentAddress "+JSON.stringify(custPermanentAddress));
    var firstAppDetails_dob = firstAppDetails.dob;
      if(firstAppDetails.dob == null){
        firstAppDetails_dob = "NA";
      }else{
        firstAppDetails_dob = this.convertToDate(new Date(firstAppDetails.dob));
      }

     
    $("#namePrefixCust").text(firstAppDetails.namePrefix);
    $("#salutation").val(firstAppDetails.firstName);
    $("#date_of_birth").val(firstAppDetails_dob);
    $("#relationWith").text(firstAppDetails.relationWith)
    $("#realtion_name").val(firstAppDetails.relationName);
    $("#marital_status").val(firstAppBookingDetails.maritalStatus);
    if (firstAppBookingDetails.maritalStatus == "UNMARRIED" || firstAppBookingDetails.maritalStatus == "unmarried" || firstAppBookingDetails.maritalStatus == "" || firstAppBookingDetails.maritalStatus == null) {
      $("#date_of_anniversary").val("NA");
    } else {
      var dateOfAnniversery = firstAppBookingDetails.dateOfAnniversery;
      //  alert(dateOfAnniversery)
        if(dateOfAnniversery == null){
          dateOfAnniversery = "";
          $("#date_of_anniversary").val("NA");
        }else{
          dateOfAnniversery = firstAppBookingDetails.dateOfAnniversery;
          $("#date_of_anniversary").val(this.convertToDate(new Date(dateOfAnniversery)));
        }
    
    }
    $("#customerId").val(firstAppDetails.customerId);
    $("#flatBookingId").val(firstAppBookingDetails.flatBookId);
    $("#pageName").val(getpageName);

    if (custPermanentAddress.addressMappingType.addressType == "permenent") {
      $("#perminent_address").val(custPermanentAddress.address1);
      $("#perminent_address").attr("title", custPermanentAddress.address1);
      $("#perminentAdd_city").val(custPermanentAddress.city);
      $("#perminentAdd_state").val(custPermanentAddress.state);
      $("#perminentAdd_pincode").val(custPermanentAddress.pincode);
    } else {
      $("#correspondence_address").val(custPermanentAddress.address1);
      $("#correspondence_address").attr("title", custPermanentAddress.address1);
      $("#correspondence_city").val(custPermanentAddress.city);
      $("#correspondence_state").val(custPermanentAddress.state);
      $("#correspondence_pincode").val(custPermanentAddress.pincode);
    }

    if (custCorespondingAddress.addressMappingType.addressType == "Correspondence") {
      $("#correspondence_address").val(custCorespondingAddress.address1);
      $("#correspondence_address").attr("title", custCorespondingAddress.address1);
      $("#correspondence_city").val(custCorespondingAddress.city);
      $("#correspondence_state").val(custCorespondingAddress.state);
      $("#correspondence_pincode").val(custCorespondingAddress.pincode);
    } else {
      $("#perminent_address").val(custCorespondingAddress.address1);
      $("#perminent_address").attr("title", custCorespondingAddress.address1);
      $("#perminentAdd_city").val(custCorespondingAddress.city);
      $("#perminentAdd_state").val(custCorespondingAddress.state);
      $("#perminentAdd_pincode").val(custCorespondingAddress.pincode);
    }

    $("#telephone_num").val(firstAppBookingDetails.telePhone);
    $("#mobile_num").val(firstAppBookingDetails.phoneNo);
    $("#email_id").val(firstAppBookingDetails.email);
    $("#pan_number").val(firstAppDetails.pancard);
    $("#nationality").val(firstAppDetails.nationality);
    $("#adhar_num").val(firstAppDetails.adharNumber);

    $("#designation").val(professionalInfo.designation);
    $("#business_name").val(professionalInfo.nameOfOrganization);
    $("#business_address").val(professionalInfo.addressOfOrganization);
    $("#office_number").val(professionalInfo.officeNumber);
    $("#office_emailid").val(professionalInfo.officeEmailId);
    $("#exp_work").val(professionalInfo.yearsOfExperience);
    $("#education_qualification").val(firstAppBookingDetails.educationalQualification);
    $("#annual_household_income").val(firstAppBookingDetails.annualHouseHoldIncome);
    $("#purchase_purpose").val(customerOtherDetails.purposeofPurchase);
    $("#residential_status").val(customerOtherDetails.currentResidentialStatus);

    $("#organisation_type").val(professionalInfo.oraganizationDetails.organizationTypeName);
    $("#industry_sector").val(professionalInfo.sectorDetailsInfo.workSectorName);
    $("#work_role").val(professionalInfo.workFunctionInfo.workFunctionName);
    if (professionalInfo.oraganizationDetails.organizationTypeName == "" || professionalInfo.oraganizationDetails.organizationTypeName == null) {
      $("#organisation_type").val(professionalInfo.oraganizationDetails.ifOtherOrgTypeName);
    }

    if (professionalInfo.sectorDetailsInfo.workSectorName == "" || professionalInfo.sectorDetailsInfo.workSectorName == null) {
      $("#industry_sector").val(professionalInfo.sectorDetailsInfo.ifOtherWorkSectorName);
    }

    if (professionalInfo.workFunctionInfo.workFunctionName == "" || professionalInfo.workFunctionInfo.workFunctionName == null) {
      $("#work_role").val(professionalInfo.workFunctionInfo.ifOtherworkFunctionName);
    }


    //reference data
    $("#about_project").val(customerOtherDetails.referenceName);
    if (customerOtherDetails.referenceName == "Reference, Existing SUMADHURA Home Owner") {
      $("#referenceSumadhuraHomeOwnerName").val(customerOtherDetails.referencesCustomer.customerName);
      $("#referenceProjectName").val(customerOtherDetails.referencesCustomer.projectName);
      $("#unitNum").val(customerOtherDetails.referencesCustomer.unitNo);
      $("#ownedSumahuraDiv").show();
    }
    if (customerOtherDetails.referenceName == "Reference, Friends/Family") {
      $("#referenceFriendsFamilyName").val(customerOtherDetails.referencesFriend.referenceFreindsorFamilyName);
      $("#referenceFriendsFamilyNameDiv").show();
    }
    if (customerOtherDetails.referenceName == "Channel Partner (CP)") {
      $("#channelPartnerName").val(customerOtherDetails.channelPartnerInfo.channelPartnerName);
      $("#cpCompany").val(customerOtherDetails.channelPartnerInfo.channelPartnerCompanyName);
      $("#cpID").val(customerOtherDetails.channelPartnerInfo.channelPartnerCPID);
      $("#cpReraRegNum").val(customerOtherDetails.channelPartnerInfo.channelPartnerRERANO);
      $("#referenceChannelPartnerDiv").show();
    }

    var haveYouOwnedSumadhuraHome = customerOtherDetails.haveYouOwnedSumadhuraHome;
    if (haveYouOwnedSumadhuraHome == "Yes" || haveYouOwnedSumadhuraHome == "YES" || haveYouOwnedSumadhuraHome == "yes") {
      $("#yesOwnedSumadhuraHome").prop('checked', true);
      $("#sumadhura_sitename").val(customerOtherDetails.haveYouOwnedSumadhuraHomeIfYesProjectName);
      $("#unit_num").val(customerOtherDetails.haveYouOwnedSumadhuraHomeIfYesUnitNo);

    } else {
      $("#noOwnedSumadhuraHome").prop('checked', true);
      $("#ownhouse_hidden_fields").hide();
    }

    var POAHolderDetails = bookingForData.customerOtherDetailsInfo.poadetailsInfo;
    $("#POA_holder").val(POAHolderDetails.nameOfPOA);
    $("#POA_telephone_num").val(POAHolderDetails.telOfPOA);
    $("#POA_mobile_number").val(POAHolderDetails.mobileNumOfPOA);
    $("#POA_email_id").val(POAHolderDetails.emailOfPOA);
    $("#POA_addres").val(POAHolderDetails.addressOfPOA);
    $("#POA_city").val(POAHolderDetails.cityOfPOA);
    $("#POA_state").val(POAHolderDetails.stateOfPOA);
    $("#POA_pincode").val(POAHolderDetails.pincodeOfPOA);
    // debugger;
    $("#secondApplicantNoData").hide();
    $("#secondApplicantData").hide();
    $("#thirdApplicantNoData").hide();
    $("#thirdApplicantData").hide();
    $("#co-appCheckListVerify1").hide();
    $("#co-appCheckListVerify2").hide();

    if (bookingForData.coApplicentDetails.length == 0) {
      $("#secondApplicantNoData").show();
      $("#thirdApplicantNoData").show();
    }
    
    if (bookingForData.coApplicentDetails.length == 2) {
      $("#secondApplicantData").show();
      $("#thirdApplicantData").show();
      $("#co-appCheckListVerify1").show();
      $("#co-appCheckListVerify2").show();
      var applicantNUmber = bookingForData.coApplicentDetails[0].addressInfos[0].addressMappingType.metaType;
      if (applicantNUmber == "APPLICANT1") {
        var secondApplicantInfo = bookingForData.coApplicentDetails[0].co_ApplicantInfo;
        var secondApplicantBookingInfo = bookingForData.coApplicentDetails[0].coApplicentBookingInfo;
        var secondApplicantprofessionalInfo = bookingForData.coApplicentDetails[0].professionalInfo;
        var secondApplicantPermanentAddress = bookingForData.coApplicentDetails[0].addressInfos[0];
        var secondApplicantcorespondedAddress = bookingForData.coApplicentDetails[0].addressInfos[1];
        var thirdApplicantInfo = bookingForData.coApplicentDetails[1].co_ApplicantInfo;
        var thirdApplicantprofessionalInfo = bookingForData.coApplicentDetails[1].professionalInfo;
        var thirdApplicantBookingInfo = bookingForData.coApplicentDetails[1].coApplicentBookingInfo;
        var thirdApplicantPermanentAddress = bookingForData.coApplicentDetails[1].addressInfos[0];
        var thirdApplicantcorespondedAddress = bookingForData.coApplicentDetails[1].addressInfos[1];
      } else if (applicantNUmber == "APPLICANT2") {
        var secondApplicantInfo = bookingForData.coApplicentDetails[1].co_ApplicantInfo;
        var secondApplicantBookingInfo = bookingForData.coApplicentDetails[1].coApplicentBookingInfo;
        var secondApplicantprofessionalInfo = bookingForData.coApplicentDetails[1].professionalInfo;
        var secondApplicantPermanentAddress = bookingForData.coApplicentDetails[1].addressInfos[0];
        var secondApplicantcorespondedAddress = bookingForData.coApplicentDetails[1].addressInfos[1];
        var thirdApplicantInfo = bookingForData.coApplicentDetails[0].co_ApplicantInfo;
        var thirdApplicantprofessionalInfo = bookingForData.coApplicentDetails[0].professionalInfo;
        var thirdApplicantBookingInfo = bookingForData.coApplicentDetails[0].coApplicentBookingInfo;
        var thirdApplicantPermanentAddress = bookingForData.coApplicentDetails[0].addressInfos[0];
        var thirdApplicantcorespondedAddress = bookingForData.coApplicentDetails[0].addressInfos[1];
      }
    }
    if (bookingForData.coApplicentDetails.length == 1) {
      $("#secondApplicantData").show();
      $("#thirdApplicantNoData").show();
      $("#co-appCheckListVerify1").show();
      var secondApplicantInfo = bookingForData.coApplicentDetails[0].co_ApplicantInfo;
      var secondApplicantBookingInfo = bookingForData.coApplicentDetails[0].coApplicentBookingInfo;
      var secondApplicantprofessionalInfo = bookingForData.coApplicentDetails[0].professionalInfo;
      var secondApplicantPermanentAddress = bookingForData.coApplicentDetails[0].addressInfos[0];
      var secondApplicantcorespondedAddress = bookingForData.coApplicentDetails[0].addressInfos[1];
    }

  
    /*------------------------second applicant start---------------*/
    if (bookingForData.coApplicentDetails.length == 1 || bookingForData.coApplicentDetails.length == 2) {
      var secondApplicantInfo_dateOfbirth;

      if(secondApplicantInfo.dateOfBirth == null){
          secondApplicantInfo_dateOfbirth = "";
  
      }else{
        secondApplicantInfo_dateOfbirth = secondApplicantInfo.dateOfBirth;
      }
  
      $("#secondApplicantPrifix").text(secondApplicantInfo.namePrefix);
      $("#secondApplicantrelationWith").text(secondApplicantInfo.relationWith);
      $("#secnd_aplcnt_salutation").val(secondApplicantInfo.firstName);
      $("#secnd_aplcnt_Dob").val(this.convertToDate(new Date(secondApplicantInfo_dateOfbirth)));
      $("#secnd_aplcnt_relation").val(secondApplicantInfo.relationName);
      $("#secnd_aplcnt_marital_satatus").val(secondApplicantBookingInfo.maritalStatus);
      //for permenent
      if (secondApplicantPermanentAddress.addressMappingType.addressType == "permenent") {
        $("#secnd_aplcnt_perminentadds").val(secondApplicantPermanentAddress.address1);
        $("#secnd_aplcnt_perminentadds").attr("title", secondApplicantPermanentAddress.address1);
        $("#secnd_aplcnt_perminent_city").val(secondApplicantPermanentAddress.city);
        $("#secnd_aplcnt_perminent_state").val(secondApplicantPermanentAddress.state);
        $("#secnd_aplcnt_perminent_pincode").val(secondApplicantPermanentAddress.pincode);
      } else {
        $("#secnd_aplcnt_correspond_addres").val(secondApplicantPermanentAddress.address1);
        $("#secnd_aplcnt_correspond_addres").attr("title", secondApplicantPermanentAddress.address1);
        $("#secnd_aplcnt_correspond_city").val(secondApplicantPermanentAddress.city);
        $("#secnd_aplcnt_correspond_state").val(secondApplicantPermanentAddress.state);
        $("#secnd_aplcnt_correspond_pincode").val(secondApplicantPermanentAddress.pincode);
      }
      //for Correspondence
      if (custCorespondingAddress.addressMappingType.addressType == "Correspondence") {
        $("#secnd_aplcnt_correspond_addres").val(secondApplicantcorespondedAddress.address1);
        $("#secnd_aplcnt_correspond_addres").attr("title", secondApplicantcorespondedAddress.address1);
        $("#secnd_aplcnt_correspond_city").val(secondApplicantcorespondedAddress.city);
        $("#secnd_aplcnt_correspond_state").val(secondApplicantcorespondedAddress.state);
        $("#secnd_aplcnt_correspond_pincode").val(secondApplicantcorespondedAddress.pincode);
      } else {
        $("#secnd_aplcnt_perminentadds").val(secondApplicantcorespondedAddress.address1);
        $("#secnd_aplcnt_perminentadds").attr("title", secondApplicantcorespondedAddress.address1);
        $("#secnd_aplcnt_perminent_city").val(secondApplicantcorespondedAddress.city);
        $("#secnd_aplcnt_perminent_state").val(secondApplicantcorespondedAddress.state);
        $("#secnd_aplcnt_perminent_pincode").val(secondApplicantcorespondedAddress.pincode);
      }

      $("#secnd_aplcnt_telephone").val(secondApplicantBookingInfo.telePhone);
      $("#secnd_aplcnt_mobilenum").val(secondApplicantBookingInfo.phoneNo);
      $("#secnd_aplcnt_emailid").val(secondApplicantBookingInfo.email);
      $("#secnd_aplcnt_panno").val(secondApplicantInfo.pancard);
      $("#secnd_aplcnt_nationality").val(secondApplicantInfo.nationality);
      $("#secnd_aplcnt_adharnum").val(secondApplicantInfo.aadharId);

      $("#secnd_aplcnt_designation").val(secondApplicantprofessionalInfo.designation);
      $("#secnd_aplcnt_business").val(secondApplicantprofessionalInfo.nameOfOrganization);
      $("#secnd_aplcnt_business_address").val(secondApplicantprofessionalInfo.addressOfOrganization);
      $("#secnd_aplcnt_officenumber").val(secondApplicantprofessionalInfo.officeNumber);
      $("#secnd_aplcnt_office_emailid").val(secondApplicantprofessionalInfo.officeEmailId);
      $("#secnd_aplcnt_workexperience").val(secondApplicantprofessionalInfo.yearsOfExperience);
      $("#secnd_aplcnt_eduction_qualificationn").val(secondApplicantBookingInfo.educationalQualification);
      $("#secnd_aplcnt_householdIncom").val(secondApplicantBookingInfo.annualHouseHoldIncome);

      $("#secnd_aplcnt_organisal_type").val(secondApplicantprofessionalInfo.oraganizationDetails.organizationTypeName);
      $("#secnd_aplcnt_industrywork").val(secondApplicantprofessionalInfo.sectorDetailsInfo.workSectorName);
      $("#secnd_aplcnt_workrole").val(secondApplicantprofessionalInfo.workFunctionInfo.workFunctionName);

      if (secondApplicantprofessionalInfo.oraganizationDetails.organizationTypeName == "" || secondApplicantprofessionalInfo.oraganizationDetails.organizationTypeName == null) {
        $("#secnd_aplcnt_organisal_type").val(secondApplicantprofessionalInfo.oraganizationDetails.ifOtherOrgTypeName);
      }
      if (secondApplicantprofessionalInfo.sectorDetailsInfo.workSectorName == "" || secondApplicantprofessionalInfo.sectorDetailsInfo.workSectorName == null) {
        $("#secnd_aplcnt_industrywork").val(secondApplicantprofessionalInfo.sectorDetailsInfo.ifOtherWorkSectorName);
      }
      if (secondApplicantprofessionalInfo.workFunctionInfo.workFunctionName == "" || secondApplicantprofessionalInfo.workFunctionInfo.workFunctionName == null) {
        $("#secnd_aplcnt_workrole").val(secondApplicantprofessionalInfo.workFunctionInfo.ifOtherworkFunctionName);
      }
    }

    /*-------------------------------second applicant end----------------------*/

    /* THIRD APPLICANT    ---------------------------- */
    /*------------------------second applicant start---------------*/
    if (bookingForData.coApplicentDetails.length == 2) {
      $("#thirdApplicantPrifix").text(thirdApplicantInfo.namePrefix);
      $("#thirdApplicantrelationWith").text(thirdApplicantInfo.relationWith);
      $("#third_aplcnt_salutation").val(thirdApplicantInfo.firstName);

      var thirdapplicantInfo_dateOfbirth;

      if(thirdApplicantInfo.dateOfBirth == null){
        thirdapplicantInfo_dateOfbirth =null;
      }else{
        thirdapplicantInfo_dateOfbirth = thirdApplicantInfo.dateOfBirth;
      }

      $("#third_aplcnt_Dob").val(this.convertToDate(new Date(thirdapplicantInfo_dateOfbirth)));
      $("#third_aplcnt_relation").val(thirdApplicantInfo.relationName);
      $("#third_aplcnt_marital_satatus").val(thirdApplicantBookingInfo.maritalStatus);

      if (secondApplicantPermanentAddress.addressMappingType.addressType == "permenent") {
        $("#third_aplcnt_perminentadds").val(thirdApplicantPermanentAddress.address1);
        $("#third_aplcnt_perminentadds").attr("title", thirdApplicantPermanentAddress.address1);
        $("#third_aplcnt_perminent_city").val(thirdApplicantPermanentAddress.city);
        $("#third_aplcnt_perminent_state").val(thirdApplicantPermanentAddress.state);
        $("#third_aplcnt_perminent_pincode").val(thirdApplicantPermanentAddress.pincode);
      } else {
        $("#third_aplcnt_correspond_addres").val(thirdApplicantPermanentAddress.address1);
        $("#third_aplcnt_correspond_addres").attr("title", thirdApplicantPermanentAddress.address1);
        $("#third_aplcnt_correspond_city").val(thirdApplicantPermanentAddress.city);
        $("#third_aplcnt_correspond_state").val(thirdApplicantPermanentAddress.state);
        $("#third_aplcnt_correspond_pincode").val(thirdApplicantPermanentAddress.pincode);
      }
      if (custCorespondingAddress.addressMappingType.addressType == "Correspondence") {
        $("#third_aplcnt_correspond_addres").val(thirdApplicantcorespondedAddress.address1);
        $("#third_aplcnt_correspond_addres").attr("title", thirdApplicantcorespondedAddress.address1);
        $("#third_aplcnt_correspond_city").val(thirdApplicantcorespondedAddress.city);
        $("#third_aplcnt_correspond_state").val(thirdApplicantcorespondedAddress.state);
        $("#third_aplcnt_correspond_pincode").val(thirdApplicantcorespondedAddress.pincode);
      } else {
        $("#third_aplcnt_perminentadds").val(thirdApplicantcorespondedAddress.address1);
        $("#third_aplcnt_perminentadds").attr("title", thirdApplicantcorespondedAddress.address1);
        $("#third_aplcnt_perminent_city").val(thirdApplicantcorespondedAddress.city);
        $("#third_aplcnt_perminent_state").val(thirdApplicantcorespondedAddress.state);
        $("#third_aplcnt_perminent_pincode").val(thirdApplicantcorespondedAddress.pincode);
      }

      $("#third_aplcnt_telephone").val(thirdApplicantBookingInfo.telePhone);
      $("#third_aplcnt_mobilenum").val(thirdApplicantBookingInfo.phoneNo);
      $("#third_aplcnt_emailid").val(thirdApplicantBookingInfo.email);
      $("#third_aplcnt_panno").val(thirdApplicantInfo.pancard);
      $("#third_aplcnt_nationality").val(thirdApplicantInfo.nationality);
      $("#third_aplcnt_adharnum").val(thirdApplicantInfo.aadharId);

      $("#third_aplcnt_designation").val(thirdApplicantprofessionalInfo.designation);
      $("#third_aplcnt_business").val(thirdApplicantprofessionalInfo.nameOfOrganization);
      $("#third_aplcnt_business_address").val(thirdApplicantprofessionalInfo.addressOfOrganization);
      $("#third_aplcnt_officenumber").val(thirdApplicantprofessionalInfo.officeNumber);
      $("#third_aplcnt_office_emailid").val(thirdApplicantprofessionalInfo.officeEmailId);
      $("#third_aplcnt_workexperience").val(thirdApplicantprofessionalInfo.yearsOfExperience);
      $("#third_aplcnt_eduction_qualificationn").val(thirdApplicantBookingInfo.educationalQualification);
      $("#third_aplcnt_householdIncom").val(thirdApplicantBookingInfo.annualHouseHoldIncome);

      $("#third_aplcnt_organisal_type").val(thirdApplicantprofessionalInfo.oraganizationDetails.organizationTypeName);
      $("#third_aplcnt_industrywork").val(thirdApplicantprofessionalInfo.sectorDetailsInfo.workSectorName);
      $("#third_aplcnt_workrole").val(thirdApplicantprofessionalInfo.workFunctionInfo.workFunctionName);

      if (thirdApplicantprofessionalInfo.oraganizationDetails.organizationTypeName == "" || thirdApplicantprofessionalInfo.oraganizationDetails.organizationTypeName == "") {
        $("#third_aplcnt_organisal_type").val(thirdApplicantprofessionalInfo.oraganizationDetails.ifOtherOrgTypeName);
      }
      if (thirdApplicantprofessionalInfo.sectorDetailsInfo.workSectorName == "" || thirdApplicantprofessionalInfo.sectorDetailsInfo.workSectorName == null) {
        $("#third_aplcnt_industrywork").val(thirdApplicantprofessionalInfo.sectorDetailsInfo.ifOtherWorkSectorName);
      }
      if (thirdApplicantprofessionalInfo.workFunctionInfo.workFunctionName == "" || thirdApplicantprofessionalInfo.workFunctionInfo.workFunctionName == null) {
        $("#third_aplcnt_workrole").val(thirdApplicantprofessionalInfo.workFunctionInfo.ifOtherworkFunctionName);
      }
    }

    /* End THIRD APPLICANT ---------------------------- */

    var unitDetails = bookingForData.flatBookingInfo;
    var aminitiesData = bookingForData.flatBookingInfo.aminitiesInfraCostInfo;
    console.log("unitDetails: " + JSON.stringify(unitDetails));
    /*-------------------unit Details start------------------------*/
    $("#unitdetails_unitnumber").val(unitDetails.flatInfo.flatNo);
    $("#unitdetails_sbua").val(unitDetails.sbua);
    $("#unitdetails_carpetarea").val(unitDetails.carpetArea);
    $("#unitdetails_floor").val(unitDetails.floorInfo.floorName);
    $("#unitdetails_ratepersqft").val(unitDetails.flatCost.perSqftCost);
    $("#unitdetails_plc").val(unitDetails.flatCost.plc);
    $("#unitdetails_floorrise").val(unitDetails.flatCost.floorRise);
    $("#unitdetails_wingblock").val(unitDetails.blockInfo.name);
    $("#unitdetails_totalcost").val(unitDetails.flatCost.totalCost);
    $("#unitdetails_rupees_words").val(this.convertNumberToWords(parseFloat(unitDetails.flatCost.totalCost).toFixed(2)));
    $("#unitdetails_EOI_applicable").val(unitDetails.eoiApplicable);
    $("#unitdetails_eoisequence").val(unitDetails.eoiSequenceNumber);
    $("#overall_exp_with_sumadhura").val(firstAppBookingDetails.overallExperienceWithSumadhura);
    /*-------------------unit Details end------------------------*/
    /* --------------------- Aminities ---------------*/
    debugger;
    var aminitiesString = '<div class="row clearfix">';
    for (var i = 0; i < aminitiesData.length; i++) {
      // alert(aminitiesData[i].totalCost);
      if (aminitiesData[i].totalCost != null) {
        aminitiesString += '<div class="col-md-6">';
        aminitiesString += '<div class="form-group form-float">';
        aminitiesString += '<div class="form-line">';
        aminitiesString += '<p style="border-bottom: 1px dotted rgba(0,0,0,0.42);padding-top: 32px;color: black;">' + aminitiesData[i].totalCost + '</p>';
        //  aminitiesString+='<input type="text" class="form-control color-black" value="'+aminitiesData[i].totalCost+'">';
        aminitiesString += '<label style="top: -10px;left: 0;font-size: 15px;color:#26a69a" class="form-label">' + aminitiesData[i].aminititesInfraName + '</label>';
        aminitiesString += '</div>';
        aminitiesString += '</div>';
        aminitiesString += '</div>';
      } else {
        
      }

    }
    aminitiesString += '</div>'
    $("#aminitiesDiv").html(aminitiesString);

    /* ---------------------Aminities ---------------*/
    /* --------------------- terms And Conditions ---------------*/

    console.log(firstAppBookingDetails.termsConditionFileData);

    $("#termsAndConditions").html(firstAppBookingDetails.termsConditionFileData);
    /* --------------------- terms And Conditions ---------------*/

   
    /*-----------------------Booking Confirmation Checlist-Sales Head Start---------------------*/
    debugger;
    var checkListSalesHead = bookingForData.checkListSalesHead;
    var saleCheckListCheckBoxes = checkListSalesHead.customerCheckListVerification;
    console.log("sales Head: " + JSON.stringify(checkListSalesHead));

    var salesHeadString = '<div class="row clearfix">';
    for (var saleHead = 0; saleHead < saleCheckListCheckBoxes.length; saleHead++) {
      var docName = saleCheckListCheckBoxes[saleHead].checkListInfo.checkListName;
      var status = saleCheckListCheckBoxes[saleHead].checkListStatus;
      var statusForCheck = "";

      if (docName != null && docName != "") {
        if (status == "true" || status == true) {
          statusForCheck = "checked"
        }
        salesHeadString +='<div class="col-md-6">'
                        + '<div class="form-check m-l-10">'
                        + '<label class="form-check-label">'
                        + '<input class="form-check-input" type="checkbox" ' + statusForCheck + ' disabled>'
                        + docName
                        + '<span class="form-check-sign"><span class="check"></span></span></label>'
                        + '</div>'
                        + '</div>'
      }else{
      }
    }
    salesHeadString += '</div><br>'
    $("#salesHeadDIV").html(salesHeadString);

    // for (var saleHead = 0; saleHead < saleCheckListCheckBoxes.length; saleHead++) {
    //   var salesHeadCheckListName = saleCheckListCheckBoxes[saleHead].checkListInfo.checkListName;
    //   var saleHeadCheckListStatus = saleCheckListCheckBoxes[saleHead].checkListStatus;
    //   $(".salesHeadCheckList").each(function () {
    //     if ($(this).val() == salesHeadCheckListName) {
    //       if (saleHeadCheckListStatus == "true" || saleHeadCheckListStatus == true) {
    //         $(this).prop("checked", true);
    //       } else {
    //         $(this).prop("checked", false);
    //       }
    //     }
    //   });
    // }

    $("#applicant_name").val(firstAppDetails.firstName);
    $("#leadid").val(firstAppBookingDetails.salesTeamLeadId);
    $("#stm").val(firstAppBookingDetails.salesTeamEmpName);
    $("#booking_source").val(checkListSalesHead.sourceofBooking);
    $("#referal_bonus").val(checkListSalesHead.referralBonusStatus);
    $("#offers_ifany").val(checkListSalesHead.offersAny);
    $("#Availability_listin_erp").val(checkListSalesHead.availability);
    $("#comitments_sales_team").val(checkListSalesHead.salesTeamCommitments);
    $("#remarks_booking_confirmation").val(checkListSalesHead.remarks);
debugger;
    $("#sales_project_sale_Name").val(checkListSalesHead.projectSalesheadName);

    var checkListSalesHead_projectsalesheaddate;
    if(checkListSalesHead.projectSalesHeadDate == null){
      checkListSalesHead_projectsalesheaddate = "";
    }else{
      checkListSalesHead_projectsalesheaddate = checkListSalesHead.projectSalesHeadDate;
    }
      var project_sales_head_date =  checkListSalesHead.projectSalesHeadDate;
      if(project_sales_head_date == null){
        $("#sales_project_sale_Date").val("NA");
      }else{
        $("#sales_project_sale_Date").val(this.convertToDate(new Date(project_sales_head_date)));
      }

   
    $("#sales_authorised_Name").val(checkListSalesHead.authorizedSignatoryName);

    var checkListSalesHead_projectSalesheaddate = checkListSalesHead.authorizedSignatoryDate;
    if(checkListSalesHead.authorizedSignatoryDate == null){
     // checkListSalesHead_projectSalesheaddate = "";
      $("#sales_authorised_Date").val("NA");

    }else{
    //  checkListSalesHead_projectSalesheaddate = checkListSalesHead.authorizedSignatoryDate;
    $("#sales_authorised_Date").val(this.convertToDate(new Date(checkListSalesHead_projectSalesheaddate)));

    }

    //var project sales

    /*-----------------------Booking Confirmation Checlist-Sales Head End---------------------*/

    /*--------------booking confirmation checklist crm start---------------------------------*/
    var checkListCRMData = bookingForData.checkListCRM;
    var crmCheckListCheckBoxes = checkListCRMData.customerCheckListVerification;
    console.log("CRM checklist: " + JSON.stringify(checkListCRMData));

    var crmString = '<div class="row clearfix">';
    for (var CRM = 0; CRM < crmCheckListCheckBoxes.length; CRM++) {
      var docName = crmCheckListCheckBoxes[CRM].checkListInfo.checkListName;
      var status = crmCheckListCheckBoxes[CRM].checkListStatus;
      var statusForCheck = "";

      if (docName != null && docName != "") {
        if (status == "true" || status == true) {
          statusForCheck = "checked"
        }
        crmString +='<div class="col-md-6">'
                        + '<div class="form-check m-l-10">'
                        + '<label class="form-check-label">'
                        + '<input class="form-check-input" type="checkbox" ' + statusForCheck + ' disabled>'
                        + docName
                        + '<span class="form-check-sign"><span class="check"></span></span></label>'
                        + '</div>'
                        + '</div>'
      }else{
      }
    }
    crmString += '</div><br><br>'
    $("#crmDIV").html(crmString);

    // for (var CRM = 0; CRM < crmCheckListCheckBoxes.length; CRM++) {
    //   var crmCheckListName = crmCheckListCheckBoxes[CRM].checkListInfo.checkListName;
    //   var crmCheckListStatus = crmCheckListCheckBoxes[CRM].checkListStatus;
    //   $(".CRMCheckList").each(function () {

    //     if ($(this).val() == crmCheckListName) {
    //       if (crmCheckListStatus == "true" || crmCheckListStatus == true) {
    //         $(this).prop("checked", true);
    //       } else {
    //         $(this).prop("checked", false);
    //       }
    //     }
    //   });
    // }

    $("#checklist_crm_commitment_sales_team_members").val(checkListCRMData.commitmentsFromSTM);
    $("#checkilist_crm_remarks").val(checkListCRMData.crmRemarks);
    $("#checkilist_crm_bankloan").val(checkListCRMData.crmPreferenceBankLoan);

    $("#expected_agrmnt_comment").val(checkListCRMData.expectedAgreeDateComment);

    var expected_AgreeDate = checkListCRMData.expectedAgreeDate;
    if(expected_AgreeDate == null){
      $("#expected_agrmnt_date").val("NA");
    }else{
      $("#expected_agrmnt_date").val(this.convertToDate(new Date(checkListCRMData.expectedAgreeDate)));
    }

   
    $("#expected_agrmnt_verifiedName").val(checkListCRMData.crmVerifiedByName);
    $("#expected_agrmnt_emailId").val(checkListCRMData.crmEmpID);
    $("#expected_agrmnt_signature").val(checkListCRMData.crmSignedName);
    var crm_Signed_Date = checkListCRMData.crmSignedDate;
    if(crm_Signed_Date == null){
      $("#expected_agrmnt_datee").val("NA");
    }else{
      $("#expected_agrmnt_datee").val(this.convertToDate(new Date(crm_Signed_Date)));
    }
    
    $("#expected_agrmnt_authorizedSignatory").val(checkListCRMData.authorizedSignatoryeName);
    var authorized_Signatory_Date = checkListCRMData.authorizedSignatoryDate;
    if(authorized_Signatory_Date == null){
      $("#expected_agrmnt_authorizedSignatory_date").val("NA");
    }else{
      $("#expected_agrmnt_authorizedSignatory_date").val(this.convertToDate(new Date(authorized_Signatory_Date)));
    }
   
    /*--------------booking confirmation checklist crm end---------------------------------*/

    /*--------------------------Registration check list start---------------------*/

    var registrationCheckList = bookingForData.checkListRegistration;
    var registrationCheckListCheckboxesList = registrationCheckList.customerCheckListVerification;
    console.log("registrationCheckListCheckboxesList: " + JSON.stringify(registrationCheckList));

    var regString = '<div class="row clearfix">';
    for (var regList = 0; regList < registrationCheckListCheckboxesList.length; regList++) {
      var docName = registrationCheckListCheckboxesList[regList].checkListInfo.checkListName;
      var status = registrationCheckListCheckboxesList[regList].checkListStatus;
      var statusForCheck = "";

      if (docName != null && docName != "") {
        if (status == "true" || status == true) {
          statusForCheck = "checked"
        }
        regString +='<div class="col-md-4">'
                        + '<div class="form-check m-l-10">'
                        + '<label class="form-check-label">'
                        + '<input class="form-check-input" type="checkbox" ' + statusForCheck + ' disabled>'
                        + docName
                        + '<span class="form-check-sign"><span class="check"></span></span></label>'
                        + '</div>'
                        + '</div>'
      }else{
      }
    }
    regString += '</div><br><br>'
    $("#regDIV").html(regString);

    // for (var regList = 0; regList < registrationCheckListCheckboxesList.length; regList++) {
    //   var regCheckListName = registrationCheckListCheckboxesList[regList].checkListInfo.checkListName;
    //   var regCheckListStatus = registrationCheckListCheckboxesList[regList].checkListStatus;
    //   $(".regCheckList").each(function () {
    //     if ($(this).val() == regCheckListName) {
    //       if (regCheckListStatus == "true" || regCheckListStatus == true) {
    //         $(this).prop("checked", true);
    //       } else {
    //         $(this).prop("checked", false);
    //       }
    //     }
    //   })
    // }

    $("#registration_checklist_project").val(unitDetails.siteInfo.name);
    $("#registration_checklist_fno").val(unitDetails.flatInfo.flatNo);
    $("#registration_checklist_agvalue").val(registrationCheckList.agValue);
    $("#registration_checklist_sdvalue").val(registrationCheckList.sdValue);

    $("#registration_comment_legal").val(registrationCheckList.legalComments);
    $("#registration_comentsfromaccounts").val(registrationCheckList.accountsComments);

    $("#registration_flatnumber").val(registrationCheckList.legalOfficerEmpName);
    $("#registration_empid").val(registrationCheckList.legalOfficerEmpId);

    var registrationCheckList_legalOfficerdate = registrationCheckList.legalOfficerDate;

    if(registrationCheckList.legalOfficerDate == null){
     // registrationCheckList_legalOfficerdate = null;
     $("#registration_date").val("NA");
    }else{
     //registrationCheckList_legalOfficerdate = registrationCheckList.legalOfficerDate;
      $("#registration_date").val(this.convertToDate(new Date(registrationCheckList_legalOfficerdate)));
    }

    
    $("#registration_executive_signature").val(registrationCheckList.accountsExecutiveEmpName);
    $("#registration_empid2").val(registrationCheckList.accountsExecutiveEmpid);

    var registrationCheckList_accountsExecutivedate = registrationCheckList.accountsExecutiveDate;
    if(registrationCheckList.legalOfficerDate == null){
      //registrationCheckList_accountsExecutivedate = null;
      $("#registration_date2").val("NA");
    }else{
     // registrationCheckList_accountsExecutivedate = registrationCheckList.accountsExecutiveDate;
      $("#registration_date2").val(this.convertToDate(new Date(registrationCheckList_accountsExecutivedate)));
    }

    
    $("#registration_authorized_signature").val(registrationCheckList.authorizedSignatureName);
    var registrationCheckList_authorizeddate = registrationCheckList.authorizedDate;
    if(registrationCheckList.authorizedDate == null){
     // registrationCheckList_authorizeddate = null;
      $("#registration_date3").val("NA");
    }else{
    //  registrationCheckList_authorizeddate = registrationCheckList.authorizedDate;
      $("#registration_date3").val(this.convertToDate(new Date(registrationCheckList_authorizeddate)));
    }
    
    /*--------------------------Registration check list end---------------------*/


    var checkListLegalOfficer = bookingForData.checkListLegalOfficer;
    var checkListLeagal = checkListLegalOfficer.customerCheckListVerification;
    var leagalApp1 = checkListLegalOfficer.coappCheckListApp;
    console.log("checkListLegalOfficer: " + JSON.stringify(checkListLegalOfficer));

    var legalCustString = '<div class="row clearfix">';
    for (var custCheck = 0; custCheck < checkListLeagal.length; custCheck++) {
      var docName = checkListLeagal[custCheck].checkListInfo.checkListName;
      var status = checkListLeagal[custCheck].checkListStatus;
      var statusForCheck = "";

      if (docName != null && docName != "") {
        if (status == "true" || status == true) {
          statusForCheck = "checked"
        }
        legalCustString +='<div class="col-md-6">'
                        + '<div class="form-check m-l-10">'
                        + '<label class="form-check-label">'
                        + '<input class="form-check-input" type="checkbox" ' + statusForCheck + ' disabled>'
                        + docName
                        + '<span class="form-check-sign"><span class="check"></span></span></label>'
                        + '</div>'
                        + '</div>'
      }else{
      }
    }
    legalCustString += '</div><br>'
    $("#legalCustDIV").html(legalCustString);

    // for (var custCheck = 0; custCheck < checkListLeagal.length; custCheck++) {
    //   var leagalCustCheckName = checkListLeagal[custCheck].checkListInfo.checkListName;
    //   var legalCheckListStatus = checkListLeagal[custCheck].checkListStatus;
    //   $(".leagalCustCheck").each(function () {
    //     if ($(this).val() == leagalCustCheckName) {
    //       if (legalCheckListStatus == "true" || legalCheckListStatus == true) {
    //         $(this).prop("checked", true);
    //       } else {
    //         $(this).prop("checked", false);
    //       }
    //     }
    //   })
    // }
    debugger;

    var legalCoappString = '<div class="row clearfix">';
    for (var leagalCoapp = 0; leagalCoapp < leagalApp1.length; leagalCoapp++) {
      var docName = leagalApp1[leagalCoapp].checkListInfo.checkListName;
      var status = leagalApp1[leagalCoapp].checkListStatus;
      var statusForCheck = "";

      if (docName != null && docName != "") {
        if (status == "true" || status == true) {
          statusForCheck = "checked"
        }
        legalCoappString +='<div class="col-md-6">'
                        + '<div class="form-check m-l-10">'
                        + '<label class="form-check-label">'
                        + '<input class="form-check-input" type="checkbox" ' + statusForCheck + ' disabled>'
                        + docName
                        + '<span class="form-check-sign"><span class="check"></span></span></label>'
                        + '</div>'
                        + '</div>'
      }else{
      }
    }
    legalCoappString += '</div><br><br>'
    $("#legalCoappDIV").html(legalCoappString);

    // for (var leagalCoapp = 0; leagalCoapp < leagalApp1.length; leagalCoapp++) {
    //   var coAppPancard;
    //   if(bookingForData.coApplicentDetails != ""){
    //     coAppPancard = secondApplicantInfo.pancard;
    //   }else{
    //     coAppPancard = "";
    //   }
     
    //   var leagalcoCustCheckName = leagalApp1[leagalCoapp].checkListInfo.checkListName
    //   var legalCoCheckListStatus = leagalApp1[leagalCoapp].checkListStatus;
    //   if (coAppPancard == leagalApp1[leagalCoapp].coapplicentPanCard) {
    //     $(".legalApp1").each(function () {
    //       if ($(this).val() == leagalcoCustCheckName) {
    //         if (legalCoCheckListStatus == "true" || legalCoCheckListStatus == true) {
    //           $(this).prop("checked", true);
    //         } else {
    //           $(this).prop("checked", false);
    //         }
    //       }
    //     })
    //   } else {
    //     $(".legalApp2").each(function () {
    //       if ($(this).val() == leagalcoCustCheckName) {
    //         if (legalCoCheckListStatus == "true" || legalCoCheckListStatus == true) {
    //           $(this).prop("checked", true);
    //         } else {
    //           $(this).prop("checked", false);
    //         }
    //       }
    //     })
    //   }
    // }
    /*--------------------------------Agrement checklist-legal officer start------------------*/
    $("#legal_officer_bankername").val(checkListLegalOfficer.bankerName);
    $("#legal_officer_bank").val(checkListLegalOfficer.bank);
    $("#legal_officer_contact").val(checkListLegalOfficer.contact);
    $("#legal_officer_emailaddress").val(checkListLegalOfficer.bankerEmailAddress);
    $("#legal_officer_officers_if_any").val(checkListLegalOfficer.offersIfAny);
    $("#legal_officer_comment").val(checkListLegalOfficer.legelOfficerComments);
    $("#legal_officer_legal_officer").val(checkListLegalOfficer.legalOfficer);
    $("#legal_officer_empId").val(checkListLegalOfficer.empId);

    var legalOffice_Signedate = checkListLegalOfficer.legalOfficeSignedate;
    if(legalOffice_Signedate == null){
      $("#legal_officer_datee").val("NA");
    }else{
      $("#legal_officer_datee").val(this.convertToDate(new Date(checkListLegalOfficer.legalOfficeSignedate)));
    }
    
    $("#legal_officer_authorized_signatory").val(checkListLegalOfficer.authorizedSignatoryName);

    var legalOfficeSignedate = checkListLegalOfficer.authorizedSignatoryDate;
    if(legalOfficeSignedate == null){
      $("#legal_officer_date").val("NA");
    }else{
      $("#legal_officer_date").val(this.convertToDate(new Date(checkListLegalOfficer.authorizedSignatoryDate)));
    }
    
    /*--------------------------------Agrement checklist-legal officer end------------------*/

  }

  approveOrRejectCustomer(action) {
    debugger;
    $('.page-loader-wrapper').show();
    var customerId = $("#customerId").val();
    var flatBookingId = $("#flatBookingId").val();
    var data = {
      "customerId": customerId,
      "flatBookingId": flatBookingId,
      "actionStr": action,
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "requestUrl": "actionBookingDetails"
    };
    var url = this.cmn.commonUrl + "bookingFormService/actionBookingDetails.spring";
    console.log(url);

    this.http.post(url, data).map(res => res.json()).subscribe(resp => {
      console.log("Booking Data:  " + JSON.stringify(resp));
      if (resp.responseCode == 200) {
        if (action == "approve") {
          $('.page-loader-wrapper').hide();
          this.router.navigate(['approvedcustomer']);
          swal("Good job!", "You have been approved customer.", "success");
          $(".modal").modal('hide');
        } else {
          $('.page-loader-wrapper').hide();
          this.router.navigate(['approvedcustomer']);
          swal("Good job!", "You have been rejected customer.", "info");
          $(".modal").modal('hide');
        }
      } else if (resp.responseCode == 440) {
        $('.page-loader-wrapper').hide();
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);

      } else {
        $('.page-loader-wrapper').hide();
        swal("Error!", "Internal server error.", "error");
        $(".modal").modal('hide');
        this.router.navigate(['approvedcustomer']);

      

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
  //amount in words 
  convertNumberToWords(amount) {
    var words = new Array();
    words[0] = '';
    words[1] = 'One';
    words[2] = 'Two';
    words[3] = 'Three';
    words[4] = 'Four';
    words[5] = 'Five';
    words[6] = 'Six';
    words[7] = 'Seven';
    words[8] = 'Eight';
    words[9] = 'Nine';
    words[10] = 'Ten';
    words[11] = 'Eleven';
    words[12] = 'Twelve';
    words[13] = 'Thirteen';
    words[14] = 'Fourteen';
    words[15] = 'Fifteen';
    words[16] = 'Sixteen';
    words[17] = 'Seventeen';
    words[18] = 'Eighteen';
    words[19] = 'Nineteen';
    words[20] = 'Twenty';
    words[30] = 'Thirty';
    words[40] = 'Forty';
    words[50] = 'Fifty';
    words[60] = 'Sixty';
    words[70] = 'Seventy';
    words[80] = 'Eighty';
    words[90] = 'Ninety';
    amount = amount.toString();
    var atemp = amount.split(".");
    var number = atemp[0].split(",").join("");
    var n_length = number.length;
    var words_string = "";
    if (n_length <= 9) {
      var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
      var received_n_array = new Array();
      for (var i = 0; i < n_length; i++) {
        received_n_array[i] = number.substr(i, 1);
      }
      for (var i = 9 - n_length, j = 0; i < 9; i++ , j++) {
        n_array[i] = received_n_array[j];
      }
      for (var i = 0, j = 1; i < 9; i++ , j++) {
        if (i == 0 || i == 2 || i == 4 || i == 7) {
          if (n_array[i] == 1) {
            n_array[j] = 10 + n_array[j];
            n_array[i] = 0;
          }
        }
      }
      this.value = "";
      for (var i = 0; i < 9; i++) {
        if (i == 0 || i == 2 || i == 4 || i == 7) {
          this.value = n_array[i] * 10;
        } else {
          this.value = n_array[i];
        }
        if (this.value != 0) {
          words_string += words[this.value] + " ";
        }
        if ((i == 1 && this.value != 0) || (i == 0 && this.value != 0 && n_array[i + 1] == 0)) {
          words_string += "crore ";
        }
        if ((i == 3 && this.value != 0) || (i == 2 && this.value != 0 && n_array[i + 1] == 0)) {
          words_string += "Lakhs ";
        }
        if ((i == 5 && this.value != 0) || (i == 4 && this.value != 0 && n_array[i + 1] == 0)) {
          words_string += "Thousand ";
        }
        if (i == 6 && this.value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
          words_string += "Hundred and ";
        } else if (i == 6 && this.value != 0) {
          words_string += "Hundred ";
        }
      }
      words_string = words_string.split("  ").join(" ");
    }
    console.log("Words: " + words_string + " Rupees Only");
    return words_string + " Rupees Only";
  }

  convertToDate(a) {debugger;
   // alert(a);
    if(a!=null){
      var mm = a.getMonth() + 1; // getMonth() is zero-based
    var dd = a.getDate();
    var yy = a.getFullYear()
  //  alert(dd + "-" + mm + "-" + yy);
    return dd + "-" + mm + "-" + yy;
    }else{
      return "";
    }
    
  };

  homeClick(){
    this.cmn.commonHomeNavigation();
  }

  customCsstabs(id){
    if (id == 0) {
      return 'active'
    } else {
      return 'tab-pane fade show'
    }
  }

}
