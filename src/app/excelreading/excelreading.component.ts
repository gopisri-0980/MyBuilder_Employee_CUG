import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from "@angular/router";
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { Http, RequestOptions, Headers } from '@angular/http';
import { CommonComponent } from '../common/common.component';
//import { $ } from 'protractor';
//declare module "XLSX";
declare const swal: any;
declare var $: any;

@Component({
  selector: 'app-excelreading',
  templateUrl: './excelreading.component.html',
  styleUrls: ['./excelreading.component.sass']
})
export class ExcelreadingComponent implements OnInit {
  firstName: any;
  fileattached: any;
  file_attachment: Event;
  private base64textString: String = "";
  base64multifiles_data: any = [];
  file: any;
  arrayBuffer: any;
  XlSXData: any;
  XlSXData1: any;
  handleFileSelect(evt) {
    this.file = evt.target.files[0];
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary", cellDates: true, dateNF: 'dd/mm/yyyy;@' });

      var first_sheet_name = workbook.SheetNames[0];
      var second_sheet_name = workbook.SheetNames[1];
      var worksheet = workbook.Sheets[first_sheet_name];
      var worksheet1 = workbook.Sheets[second_sheet_name];
      this.XlSXData = XLSX.utils.sheet_to_json(worksheet, { raw: true, defval: null });
      this.XlSXData1 = XLSX.utils.sheet_to_json(worksheet1, { raw: true, defval: null });
      $(".file-path").val(this.file.name);
    }

    fileReader.readAsArrayBuffer(this.file);
  }

  // _handleReaderLoaded(readerEvt) {
  //   var binaryString = readerEvt.target.result;
  //   this.base64textString = btoa(binaryString);
  //   this.fileattached = btoa(binaryString);

  //   this.base64multifiles_data.push(this.fileattached);
  //   //   console.log("Binarystring"+btoa(binaryString));
  //   //alert(btoa(binaryString));
  // }
  constructor(private http: Http, private router: Router, public cmn: CommonComponent) {
    $('.page-loader-wrapper').hide();
    sessionStorage.setItem('fromviewpagepredefined', null);
  }

  ngOnInit() {
    //  this.firstName = "chandu";
    $("#BlockID").select2();

  }

  find_duplicate_in_array(arra1) {
    var object = {};
    var result = [];

    arra1.forEach(function (item) {
      if (!object[item])
        object[item] = 0;
      object[item] += 1;
    })

    for (var prop in object) {
      if (object[prop] >= 2) {
        result.push(prop);
      }
    }

    return result;

  }

  filesubmit() {
    var error = true;
    if (this.file == null || this.file == "null" || this.file == undefined || this.file == "undefined") {
      // alert("Please import your file");
      swal("Error!", "Please import your file.", "error");
      return false;
    }
    console.log(this.XlSXData);

    var XLSXData = this.XlSXData;
    console.log("XLSXData: " + XLSXData);
    var bookingAmenitiesData = this.XlSXData1;
    if (XLSXData.length == 0) {
      swal("Error!", "Please upload valid excel.", "error");
      return false;
    }

    // if (bookingAmenitiesData.length == 0) {
    //   swal("Error!", "Please upload the valid amenities excel.", "error");
    //   return false;
    // }


    $(".page-loader-wrapper").show();
    var str = JSON.stringify(XLSXData);
    str = str.replace(/Opportunity__r.Owner.Name/g, 'Opportunity__r_owner_name');
    str = str.replace(/Unit__r.Name/g, 'Unit__r_name');
    str = str.replace(/Block__r.Name/g, 'block__r_name');
    str = str.replace(/Floor__r.Name/g, 'floor__r_name');
    str = str.replace(/Project_Flat_no__r.Name/g, 'Project_Flat_no__r_name');
    str = str.replace(/Project_Flat_no__r.Rera_Number__c/g, 'Project_Flat_no__r_Rera_Number__c');
    str = str.replace(/opportunity__r.EOI_SEQUENCE_NUMBER__c/g, 'opportunity_r_EOI_SEQUENCE_NUMBER_c');
    str = str.replace(/Bank_Name1__r.Bank_Name__c/g, 'Bank_Name1__r_Bank_Name__c');
    str = str.replace(/Bank_Name1__r.Banker_Mob_No__c/g, 'Bank_Name1__r_Banker_Mob_No__c');
    str = str.replace(/Bank_Name1__r.Banker_Email_ID__c/g, 'Bank_Name1__r_Banker_Email_ID__c');
    str = str.replace(/Opportunity__r.Lead_Number__c/g, 'Opportunity__r_Lead_Number__c');
    str = str.replace(/Unit__r.Car_Parking_Spaces__c/g, 'Unit__r_Car_Parking_Spaces__c');
    str = str.replace(/Opportunity__r.No_of_Carparking__c/g, 'Opportunity__r_No_of_Carparking__c');
    str = str.replace(/Bank_Name1__r.Bank_Name__c/g, 'Bank_Name1__r_Bank_Name__c');

    XLSXData = JSON.parse(str);
    var findDuplicateLeadId = [];
    for (var i = 0; i < XLSXData.length; i++) {

      findDuplicateLeadId.push(XLSXData[i].Opportunity__r_Lead_Number__c);
    }
    var findDuplicateLeadIdArray = this.find_duplicate_in_array(findDuplicateLeadId);
    var StringForLeadId = "";
    for (var k = 0; k < findDuplicateLeadIdArray.length; k++) {
      if (findDuplicateLeadIdArray.length == 1) {
        StringForLeadId += findDuplicateLeadIdArray[k];
      } else {
        if (k == (findDuplicateLeadIdArray.length - 1)) {
          StringForLeadId += " and " + findDuplicateLeadIdArray[k];
        } else {
          StringForLeadId += findDuplicateLeadIdArray[k] + ", ";
        }
      }
    }
    if (findDuplicateLeadIdArray.length > 0) {

      alert(StringForLeadId + " these are dupliacate LEAD ID's, Please check.");
      $('.page-loader-wrapper').hide();
      return false;
    }

    var customerBookingFormInfoList = [];
    for (var i = 0; i < XLSXData.length; i++) {
      //mandatory fields 
      // console.log("data: "+ XLSXData[i].InfraCharges-Electricity/STP/WTP/Piped Gas/DG);
      var applicant_name = XLSXData[i].Client_Name__c;
      //alert(applicant_name)
      var email_of_applicant = XLSXData[i].Email__c;
      var pancard_of_applicant = XLSXData[i].PAN_No__c;
      var adhaar_num_of_applicant = XLSXData[i].Adhaar_No__c;
      var annuval_income_applicant = XLSXData[i].Annual_Household_Income_Rupees__c;
      var work_experienceof_applicant = XLSXData[i].Number_of_years_of_Work_Experience__c;
      var educational_qualification_of_applicant = XLSXData[i].Education_Qualification_FirstApplicant__c;
      var organizational_type_of_applicant = XLSXData[i].Organizational_type_FirstApplicant__c;
      var if_other_organizational_type_of_applicant = XLSXData[i].OrganizationalTypeIfOthers_FirstApplican__c;
      var industry_sector_type_of_applicant = XLSXData[i].Industry_SectorofWork_FirstApplicant__c;
      var if_other_industry_sector_type_of_applicant = XLSXData[i].If_Others_IndustryofWork_1stApplicant__c;
      var work_function_of_applicant = XLSXData[i].Work_Function_Role_Firstapplicant__c;
      var if_other_work_function_of_applicant = XLSXData[i].IfOthersWorkRol1stApplicant__c;
      var professional_details_designation = XLSXData[i].Designation_FirstApplicant__c;
      var professional_details_organization_name = XLSXData[i].Name_of_Organizations_Firstapplicant__c;
      var professional_details_organization_address = XLSXData[i].Address_of_Organization_FirstApplicant__c;
      var customer_nationality = XLSXData[i].NATIONALITY_FirstApplicant__c;
      var Milestone_days = XLSXData[i].Milestone_Days__c;
      var Unit_Car_Parking_Spaces = XLSXData[i].Unit__r_Car_Parking_Spaces__c
      var Opportunity_No_of_Carparking = XLSXData[i].Opportunity__r_No_of_Carparking__c
      var Facing__c = XLSXData[i].Facing__c
      var MILESTONE_ALIAS_NAME = XLSXData[i].MILESTONE_ALIAS_NAME
      console.log(MILESTONE_ALIAS_NAME)
      var Bank_Name = XLSXData[i].Bank_Name1__r_Bank_Name__c
      console.log(Unit_Car_Parking_Spaces)
      console.log(Opportunity_No_of_Carparking)
      console.log(Facing__c)
      console.log(Bank_Name)
      //  var agreement_date= XLSXData[i].Date_CommentDate_AgreementDate__c;


      if (XLSXData[i].Id == "" || XLSXData[i].Id == null) {
        swal("Please fill the sales force transaction id , Line no : " + (i + 2));
        $('.page-loader-wrapper').hide();
        return false;
      }

      if (applicant_name == "" || applicant_name == null) {
        swal("Please Enter the Valid Applicant Name for lead id ,  Line no " + (i + 2));
        $('.page-loader-wrapper').hide();
        return false;
      }
      if (email_of_applicant == "" || email_of_applicant == null) {
        swal("Please Enter the Valid Email Address for lead id , Line no " + (i + 2));
        $('.page-loader-wrapper').hide();
        return false;
      }
      if (pancard_of_applicant == "" || pancard_of_applicant == null) {
        swal("Please Enter the Valid PAN Card Number for lead id ,  Line no " + (i + 2));
        $('.page-loader-wrapper').hide();
        return false;
      }

      console.log(customer_nationality);

      if (customer_nationality == "Indian") {
        if (adhaar_num_of_applicant == "" || adhaar_num_of_applicant == null) {
          swal("Please Enter the Valid Adhaar Card Number for lead id ,  Line no " + (i + 2));
          $('.page-loader-wrapper').hide();
          return false;
        }
      }
      // if(agreement_date=="" || agreement_date==null){
      //   alert("Please Enter the Valid Agreement Date.");
      //   $('.page-loader-wrapper').hide();
      //   return false;
      // }
      // alert(XLSXData[i].block__r_name);
      // if(annuval_income_applicant=="" || annuval_income_applicant==null){
      //   alert("Please Enter the Applicant Annual Income.");
      //   $('.page-loader-wrapper').hide();
      //   return false;
      // }
      // if(educational_qualification_of_applicant=="" || educational_qualification_of_applicant==null){
      //   alert("Please Enter the Applicant Educational Qualification.");
      //   $('.page-loader-wrapper').hide();
      //   return false;
      // }
      // if(work_experienceof_applicant=="" || work_experienceof_applicant==null){
      //   alert("Please Enter the Applicant Work Experience.");
      //   $('.page-loader-wrapper').hide();
      //   return false;
      // }
      // if( (organizational_type_of_applicant=="" || organizational_type_of_applicant==null) && (if_other_organizational_type_of_applicant=="" || if_other_organizational_type_of_applicant==null) ){
      //   alert("Please Enter the Applicant Organizational type.");
      //   $('.page-loader-wrapper').hide();
      //   return false;
      // }
      // if( (industry_sector_type_of_applicant=="" || industry_sector_type_of_applicant==null) && (if_other_industry_sector_type_of_applicant=="" || if_other_industry_sector_type_of_applicant==null)){
      //   alert("Please Enter the Applicant Industry Sector.");
      //   $('.page-loader-wrapper').hide();
      //   return false;
      // }
      // if( (work_function_of_applicant=="" || work_function_of_applicant==null) && (if_other_work_function_of_applicant=="" || if_other_work_function_of_applicant==null)){
      //   alert("Please Enter the Applicant Work Function.");
      //   $('.page-loader-wrapper').hide();
      //   return false;
      // }
      // if(professional_details_designation=="" || professional_details_designation==null){
      //   alert("Please Enter the Applicant Designation.");
      //   $('.page-loader-wrapper').hide();
      //   return false;
      // }
      // if(professional_details_organization_name=="" || professional_details_organization_name==null){
      //   alert("Please Enter the Organization Name.");
      //   $('.page-loader-wrapper').hide();
      //   return false;
      // }

      if (Milestone_days == "") {
        Milestone_days = 0;
      }

      if (Milestone_days == null) {
        alert("Please Enter the Milestone days.");
        $('.page-loader-wrapper').hide();
        return false;
      }

      if (XLSXData[i].PAN_No__c == XLSXData[i].PAN_NO_Mandatory_2ndApplicant__c) {
        alert("Applicant and Co-Applicant pan numbers should not be same for" + (XLSXData[i].PAN_No__c));
        $('.page-loader-wrapper').hide();
        return false;
      }

      if (XLSXData[i].PAN_No__c == XLSXData[i].Pan_No3__c) {
        alert("Applicant and Co-Applicant pan numbers should not be same for" + XLSXData[i].PAN_No__c);
        $('.page-loader-wrapper').hide();
        return false;
      }

      if (XLSXData[i].PAN_NO_Mandatory_2ndApplicant__c == XLSXData[i].Pan_No3__c && XLSXData[i].PAN_NO_Mandatory_2ndApplicant__c != undefined && XLSXData[i].Pan_No3__c != undefined) {
        alert("Applicant and Co-Applicant pan numbers should not be same for" + XLSXData[i].PAN_NO_Mandatory_2ndApplicant__c);
        $('.page-loader-wrapper').hide();
        return false;
      }
      //end mandatory fields  Pan_No3__c
      // alert(XLSXData[i].Date_of_Birth__c.split("T")[0]);
      //alert(XLSXData[i].Date_of_Birth__c.split("T")[0]);

      var date_of_birth__c;
      if (XLSXData[i].Date_of_Birth__c == null) {
        date_of_birth__c = null;
      } else {
        date_of_birth__c = XLSXData[i].Date_of_Birth__c.split("T")[0];
      }

      var customerInfo = {
        "customerId": 1,
        "namePrefix": XLSXData[i].Salutation__c,
        "firstName": XLSXData[i].Client_Name__c,
        "lastName": null,
        "gender": null,
        "age": null,
        "dob": date_of_birth__c,
        "profilePic": null,
        "nationality": XLSXData[i].NATIONALITY_FirstApplicant__c,
        "adharNumber": XLSXData[i].Adhaar_No__c,
        "pancard": XLSXData[i].PAN_No__c,
        "voterId": null,
        "relationNamePrefix": XLSXData[i].Relation_Salutation1__c,
        "relationName": XLSXData[i].S_O_D_o__c,
        "relationWith": XLSXData[i].Relation__c,
        "statusId": null,
        "createdDate": null,
        "updatedDate": null
      }
      var DOA_firstApplicant__c;
      if (XLSXData[i].DOA_FirstApplicant__c == null) {
        DOA_firstApplicant__c = null
      } else {
        DOA_firstApplicant__c = XLSXData[i].DOA_FirstApplicant__c.split("T")[0]
      }


      var customerSchemeInfosArray = [];
      var customerSchemeInfos = {
        "schemeName": XLSXData[i].CRM_Access__c,
      }


      customerSchemeInfosArray.push(customerSchemeInfos);

      var customerBookingInfo = {
        "custBookInfoId": null,
        "phoneNo": XLSXData[i].Mobile__c,
        "alternatePhoneNo": null,
        "telePhone": XLSXData[i].Tel_R_FirstApplicant__c,
        "email": XLSXData[i].Email__c,
        "maritalStatus": XLSXData[i].Marital_Status_FirstApplicant__c,
        "documentsUpload": null,
        "custAppId": null,
        "dateOfAnniversery": DOA_firstApplicant__c,
        "salesTeamEmpId": null,
        "salesTeamEmpName": XLSXData[i].STM_Bookingcnfmchklist_SalesHead__c,
        "salesTeamLeadId": XLSXData[i].Opportunity__r_Lead_Number__c,
        "salesTeamLeadName": null,
        "workExperience": XLSXData[i].Number_of_years_of_Work_Experience__c,
        "educationalQualification": XLSXData[i].Education_Qualification_FirstApplicant__c,
        "annualHouseHoldIncome": XLSXData[i].Annual_Household_Income_Rupees__c,
        "custProffisionalId": null,
        "overallExperienceWithSumadhura": XLSXData[i].Over_All_Experience_With_SUMADHURA__c,
        "tdsAuthorizationId": null,
        "tdsAuthorization": null,
        "tdsAuthorizationType": "Option:1",
        "termsConditionFileName": null,
        "termsConditionFileData": null,
        "statusId": null,
        "status": null,
        "createdDate": null,
        "updatedDate": null,
        "flatBookId": null,
        "custId": null
      }

      var custAdressInfosArray = [];
      var custAdressInfos1 = {
        "addressId": null,
        "custAddressId": null,
        "floorNo": null,
        "tower": null,
        "street": null,
        "area": null,
        "landmark": null,
        "pincode": XLSXData[i].PIN__c,
        "cityId": null,
        "city": XLSXData[i].City__c,
        "cityIcon": null,
        "stateId": null,
        "state": XLSXData[i].State__c,
        "country": XLSXData[i].Country__c,
        "langitude": null,
        "latitude": null,
        "createdDate": null,
        "updatedDate": null,
        "addressType": null,
        "address1": XLSXData[i].Permanent__c,
        "address2": null,
        "address3": null,
        "statusId": null,
        "surveyNo": null,
        "district": null,
        "contactNo": null,
        "email": null,
        "website": null,
        "nearBy": null,
        "hno": null,
        "foraddress": null,
        "addressMappingType": {
          "addressMappingTypeId": null,
          "typeId": 1,
          "type": null,
          "metaType": "CUSTOMER",
          "addressType": "permenent",
          "addressId": null
        }
      }
      custAdressInfosArray.push(custAdressInfos1);
      // if(){
      var custAdressInfos2 = {
        "addressId": null,
        "custAddressId": null,
        "floorNo": null,
        "tower": null,
        "street": null,
        "area": null,
        "landmark": null,
        "pincode": XLSXData[i].PIN_cor__c,
        "cityId": null,
        "city": XLSXData[i].City_cor__c,
        "cityIcon": null,
        "stateId": null,
        "state": XLSXData[i].State_cor__c,
        "country": XLSXData[i].Country_Cor__c,
        "langitude": null,
        "latitude": null,
        "createdDate": null,
        "updatedDate": null,
        "addressType": null,
        "address1": XLSXData[i].Correspondence__c,
        "address2": null,
        "address3": null,
        "statusId": null,
        "surveyNo": null,
        "district": null,
        "contactNo": null,
        "email": null,
        "website": null,
        "nearBy": null,
        "hno": null,
        "foraddress": null,
        "addressMappingType": {
          "addressMappingTypeId": null,
          "typeId": 1,
          //"type": null,
          "metaType": "CUSTOMER",
          "addressType": "Correspondence",
          "addressId": null
        }
      }
      custAdressInfosArray.push(custAdressInfos2);
      // }
      var KYCDetails = [];
      var KYCDetails1 = {
        "docName": "Application money Cheque / Demand Draft / Pay Order.",
        "status": XLSXData[i].Application_money_Cheque_Demand_Draft__c,
        "documentId": null,
        "flatBookId": null,
        "custBookInfoId": null,
        "submittedDocId": null,
        "empId": null,
        "statusId": null,
        "createdDate": null,
        "modifiedDate": null
      }
      KYCDetails.push(KYCDetails1);
      var KYCDetails2 = {
        "docName": "PAN No. and Copy of PAN Card / Undertaking.",
        "status": XLSXData[i].PAN_No_and_Copy_of_PAN_Card__c,
        "documentId": null,
        "flatBookId": null,
        "custBookInfoId": null,
        "submittedDocId": null,
        "empId": null,
        "statusId": null,
        "createdDate": null,
        "modifiedDate": null
      }
      KYCDetails.push(KYCDetails2);
      var KYCDetails3 = {
        "docName": "Proof of Residence (Ration Card / Electricity Bill / Phone Bill / Driving Licence / Voter Identity Card / Aadhaar Card)",
        "status": XLSXData[i].Proof_of_Residence_Ration_Card__c,
        "documentId": null,
        "flatBookId": null,
        "custBookInfoId": null,
        "submittedDocId": null,
        "empId": null,
        "statusId": null,
        "createdDate": null,
        "modifiedDate": null
      }
      KYCDetails.push(KYCDetails3);
      var KYCDetails4 = {
        "docName": "If the Applicant and/ or Co-Applicant is an NRI, kindly attach a true copy of the Applicant's valid Passport.",
        "status": XLSXData[i].If_the_Applicant_and_or_Co_Applicant__c,
        "documentId": null,
        "flatBookId": null,
        "custBookInfoId": null,
        "submittedDocId": null,
        "empId": null,
        "statusId": null,
        "createdDate": null,
        "modifiedDate": null
      }
      KYCDetails.push(KYCDetails4);
      var KYCDetails5 = {
        "docName": "Please mention applicantion number/ Unit number and name of applicant behide the cheque and all supporting documents.",
        "status": XLSXData[i].Please_mention_application_number__c,
        "documentId": null,
        "flatBookId": null,
        "custBookInfoId": null,
        "submittedDocId": null,
        "empId": null,
        "statusId": null,
        "createdDate": null,
        "modifiedDate": null
      }
      KYCDetails.push(KYCDetails5);
      var KYCDetails6 = {
        "docName": "If the Applicant is a Corporate entity then the copy of Memorandum Of Association (MOA). Board Resolution, Power of Attorney of the authorised signatory.",
        "status": XLSXData[i].If_the_Applicant_is_a_Corporate_entity_t__c,
        "documentId": null,
        "flatBookId": null,
        "custBookInfoId": null,
        "submittedDocId": null,
        "empId": null,
        "statusId": null,
        "createdDate": null,
        "modifiedDate": null
      }
      KYCDetails.push(KYCDetails6);
      var KYCDetails7 = {
        "docName": "For Partnership Firm: Partnership Deed along with authority in favour of Partner to sign application / documents/ cheque.",
        "status": XLSXData[i].For_Partnership_Firm_Partnership_Deed__c,
        "documentId": null,
        "flatBookId": null,
        "custBookInfoId": null,
        "submittedDocId": null,
        "empId": null,
        "statusId": null,
        "createdDate": null,
        "modifiedDate": null
      }
      KYCDetails.push(KYCDetails7);
      var KYCDetails8 = {
        "docName": "Current Photograph of Applicant/s",
        "status": XLSXData[i].Current_Photograph_of_Applicant_s__c,
        "documentId": null,
        "flatBookId": null,
        "custBookInfoId": null,
        "submittedDocId": null,
        "empId": null,
        "statusId": null,
        "createdDate": null,
        "modifiedDate": null
      }
      KYCDetails.push(KYCDetails8);
      var KYCDetails9 = {
        "docName": "Aadhaar Card",
        "status": XLSXData[i].Aadhaar_Card__c,
        "documentId": null,
        "flatBookId": null,
        "custBookInfoId": null,
        "submittedDocId": null,
        "empId": null,
        "statusId": null,
        "createdDate": null,
        "modifiedDate": null
      }
      KYCDetails.push(KYCDetails9);

      var professionalInfo = {
        "designation": XLSXData[i].Designation_FirstApplicant__c,
        "nameOfOrganization": XLSXData[i].Name_of_Organizations_Firstapplicant__c,
        "addressOfOrganization": XLSXData[i].Address_of_Organization_FirstApplicant__c,
        "officeNumber": XLSXData[i].Office_Number_FirstApplicant__c,
        "officeEmailId": XLSXData[i].Official_Email_ID_FirstApplicant__c,
        "custProffisionalId": null,
        "statusId": null,
        "createdDate": null,
        "modifiedDate": null,
        "oraganizationDetails": {
          "organizationTypeId": null,
          "organizationTypeName": XLSXData[i].Organizational_type_FirstApplicant__c,
          "ifOtherOrgTypeName": XLSXData[i].OrganizationalTypeIfOthers_FirstApplican__c
        },
        "sectorDetailsInfo": {
          "workSectorId": null,
          "workSectorName": XLSXData[i].Industry_SectorofWork_FirstApplicant__c,
          "ifOtherWorkSectorName": XLSXData[i].If_Others_IndustryofWork_1stApplicant__c
        },
        "workFunctionInfo": {
          "workFunctionId": null,
          "workFunctionName": XLSXData[i].Work_Function_Role_Firstapplicant__c,
          "ifOtherworkFunctionName": XLSXData[i].IfOthersWorkRol1stApplicant__c
        },
        "yearsOfExperience": XLSXData[i].Number_of_years_of_Work_Experience__c
      }
      var customerOtherDetailsInfo = {
        "applicationNumber": XLSXData[i].Application_No__c,
        "empIdOfSTM": null,
        "empNameOfSTM": XLSXData[i].Opportunity__r_owner_name,
        "purposeofPurchase": XLSXData[i].Purpose_of_PurchaseFirstApplicant__c,
        "currentResidentialStatus": XLSXData[i].Current_Residential_Status_1stApplicant__c,
        "referenceId": null,
        "referenceName": XLSXData[i].How_did_you_get_to_know_about_the_projec__c,
        "referenceStatus": null,
        "haveYouOwnedSumadhuraHome": XLSXData[i].HaveOwnedHomeEver_FirstApplicant__c,
        "haveYouOwnedSumadhuraHomeIfYesProjectName": XLSXData[i].If_Yes_Project_Details_Sumadhura__c,
        "haveYouOwnedSumadhuraHomeIfYesUnitNo": XLSXData[i].Unit_No_HaveUEverOwnedHouse1StApplicant__c,
        "referencesFriend": {
          "referencesFriendId": null,
          "referenceFreindsorFamilyName": XLSXData[i].Reference_Friends_Family_Name__c
        },
        "referencesCustomer": {
          "referencesCustomerId": null,
          "customerId": null,
          "customerName": XLSXData[i].ReferenceExistingSUMADHURAHome_Name__c,
          "projectName": XLSXData[i].Referral_Project__c,
          "unitNo": XLSXData[i].Referral_Unit__c,
          "id": 0
        },
        "referencesMappingInfo": {
          "typeId": null,
          "type": null,
          "custOtherId": null,
          "referencesMappingId": null
        },
        "referenceMaster": {
          "referenceId": null,
          "referenceType": null,
          "statusId": 0,
          "createdDate": null,
          "modifiedDate": null
        },
        "channelPartnerInfo": {
          "channelPartnerId": null,
          "channelPartnerName": XLSXData[i].Channel_Partner__c,
          "channelPartnerCompanyName": XLSXData[i].CP_CompanyChannelPartner_FirstApplicant__c,
          "channelPartnerCPID": XLSXData[i].CP_ID_ChannelPartner__c,
          "channelPartnerRERANO": XLSXData[i].CPRERARegNo_ChannelPartner_1stApplicant__c
        },
        "poadetailsInfo": {
          "nameOfPOA": XLSXData[i].Name_of_PoA_Holder_1stApplicant__c,
          "telOfPOA": XLSXData[i].Tel_R_PoAHolder_FirstApplicant__c,
          "mobileNumOfPOA": XLSXData[i].Mobile_Number_PoAHolder1stApplicant__c,
          "emailOfPOA": XLSXData[i].Email_ID_PoAHolder_1stApplicant__c,
          "addressOfPOA": XLSXData[i].Address_PoAHolder_1stApplicant__c,
          "cityOfPOA": XLSXData[i].City_PoAHolder_FirstApplicant__c,
          "stateOfPOA": XLSXData[i].State_PoAHolder_1stApplicant__c,
          "pincodeOfPOA": XLSXData[i].Pincode_PoAHolder1StApplicant__c,
          "telePhone": null,
          "statusId": null,
          "stateId": null,
          "cityId": null,
          "createdDate": null,
          "modifiedDate": null,
          "poaHolderId": null
        }
      }
      var CoAppData = [];
      var dOB_secondApplicant__c;
      // alert(XLSXData[i].DOB_SecondApplicant__c.split("T")[0])
      if (XLSXData[i].DOB_SecondApplicant__c == null) {
        dOB_secondApplicant__c = null;
      } else {
        dOB_secondApplicant__c = XLSXData[i].DOB_SecondApplicant__c.split("T")[0];
      }
      var co_ApplicantInfo1 = {
        "coApplicantId": null,
        "coApplicantNumber": null,
        "namePrefix": XLSXData[i].Salutation_of_Second_Applicant__c,
        "firstName": XLSXData[i].Mr_Mrs_Ms_2ndApplicant__c,
        "lastName": null,
        "middleName": null,
        "gender": null,
        "dateOfBirth": dOB_secondApplicant__c,
        "age": null,
        "aadharId": XLSXData[i].AADHAAR_NO_Mandatory_2ndApplicant__c,
        "voterId": null,
        "pancard": XLSXData[i].PAN_NO_Mandatory_2ndApplicant__c,
        "nationality": XLSXData[i].NATIONALITY_2ndApplicant__c,
        "relationWith": XLSXData[i].Relation_of_Second_Applicant__c,
        "relationWithCust": null,
        "relationName": XLSXData[i].S_o_D_o_W_o_2ndApplicant__c,
        "relationNamePrefix": null,
        "statusId": null,
        "status": null,
        "createdDate": null,
        "updatedDate": null
      }

      var dOA2__c;
      if (XLSXData[i].DOA2__c == null) {
        dOA2__c = null;
      } else {
        dOA2__c = XLSXData[i].DOA2__c.split("T")[0];
      }
      var coApplicentBookingInfo1 = {
        "coAppBookInfoId": null,
        "phoneNo": XLSXData[i].Mobile_Mandatory_2ndApplicant__c,
        "alternatePhoneNo": null,
        "email": XLSXData[i].EMAIL_Mandatory_2ndApplicant__c,
        "telePhone": XLSXData[i].Tel_R_SecondApploiocant__c,
        "maritalStatus": XLSXData[i].Marital_Status_2ndApplicant__c,
        "workExperience": null,
        "dateOfAnniversery": dOA2__c,
        "educationalQualification": XLSXData[i].Education_Qualification_2ndApplicant__c,
        "annualHouseHoldIncome": XLSXData[i].Annual_Household_Income_2ndApplicant__c,
        "custProffisionalId": null,
        "statusId": null,
        "status": null,
        "createdDate": null,
        "updatedDate": null,
        "coApplicantId": null,
        "custBookInfoId": null
      }
      var CoAppaddressInfosone = [];
      var CoAppaddressInfos1 = {
        "custAddressId": null,
        "floorNo": null,
        "tower": null,
        "street": null,
        "area": null,
        "landmark": null,
        "pincode": XLSXData[i].Permanent_Pincode_2ndApplicant__c,
        "cityId": null,
        "city": XLSXData[i].City_2ndApplicant__c,
        "cityIcon": null,
        "stateId": null,
        "state": XLSXData[i].Permanent_State_2ndApplicant__c,
        "country": XLSXData[i].Country2_permanent__c,
        "langitude": null,
        "latitude": null,
        "createdDate": null,
        "updatedDate": null,
        "addressType": null,
        "address1": XLSXData[i].Permanent_2ndApplicant__c,
        "address2": null,
        "address3": null,
        "statusId": null,
        "hno": null,
        "addressMappingType": {
          "addressMappingTypeId": null,
          "typeId": 1,
          //"type": null,
          "metaType": "APPLICANT1",
          "addressType": "permenent"
        }
      }
      CoAppaddressInfosone.push(CoAppaddressInfos1);
      var CoAppaddressInfos2 = {
        "custAddressId": null,
        "floorNo": null,
        "tower": null,
        "street": null,
        "area": null,
        "landmark": null,
        "pincode": XLSXData[i].Correspondece_Pincode_2ndApplicant__c,
        "cityId": null,
        "city": XLSXData[i].CorrespondeceCity_2ndApplicant__c,
        "cityIcon": null,
        "stateId": null,
        "state": XLSXData[i].Correspondece_State_2ndApplicant__c,
        "country": XLSXData[i].Country2_Correspondance__c,
        "langitude": null,
        "latitude": null,
        "createdDate": null,
        "updatedDate": null,
        "addressType": null,
        "address1": XLSXData[i].Correspondence_2ndApplicant__c,
        "address2": null,
        "address3": null,
        "statusId": null,
        "hno": null,
        "addressMappingType": {
          "addressMappingTypeId": null,
          "typeId": 1,
          // "type":null,
          "metaType": "APPLICANT1",
          "addressType": "Correspondence"
        }
      }
      CoAppaddressInfosone.push(CoAppaddressInfos2);
      var professionalInfo1 = {
        "designation": XLSXData[i].Designation_2ndApplicant__c,
        "nameOfOrganization": XLSXData[i].Name_of_Organization_2ndApplicant__c,
        "addressOfOrganization": XLSXData[i].Address_of_Organization_2ndApplicant__c,
        "officeNumber": XLSXData[i].Office_Number_2ndApplicant__c,
        "officeEmailId": XLSXData[i].Official_Email_ID_2ndApplicant__c,
        "custProffisionalId": null,
        "statusId": null,
        "createdDate": null,
        "modifiedDate": null,
        "oraganizationDetails": {
          "organizationTypeId": null,
          "organizationTypeName": XLSXData[i].Organizational_type_2ndApplicant__c,
          "ifOtherOrgTypeName": XLSXData[i].If_Others_OrgType_2ndApplicant__c
        },
        "sectorDetailsInfo": {
          "workSectorId": null,
          "workSectorName": XLSXData[i].Industry_Sector_of_Work_2ndApplicant__c,
          "ifOtherWorkSectorName": XLSXData[i].If_Others_IndustryWork_2ndApplicant__c
        },
        "workFunctionInfo": {
          "workFunctionId": null,
          "workFunctionName": XLSXData[i].Work_Function_Role_2ndApplicant__c,
          "ifOtherworkFunctionName": XLSXData[i].If_Others_WorkRole_2ndApplicant__c
        },
        "yearsOfExperience": XLSXData[i].NumberofyearsofWorkExp_2ndApplicant__c
      }

      CoAppData.push({ "co_ApplicantInfo": co_ApplicantInfo1, "coApplicentBookingInfo": coApplicentBookingInfo1, "addressInfos": CoAppaddressInfosone, "professionalInfo": professionalInfo1 });
      //alert(XLSXData[i].DOB3__c);
      var dOB3__c;
      if (XLSXData[i].DOB3__c == null) {
        dOB3__c = null;
      } else {
        dOB3__c = XLSXData[i].DOB3__c.split("T")[0];
      }

      var dOA3__c;
      if (XLSXData[i].DOA3__c == null) {
        dOA3__c = null;
      } else {
        dOA3__c = XLSXData[i].DOA3__c.split("T")[0]
      }
      var co_ApplicantInfo2 = {
        "coApplicantId": null,
        "coApplicantNumber": null,
        "namePrefix": XLSXData[i].Salutation_of_Third_Applicant__c,
        "firstName": XLSXData[i].Name_of_Third_Applicant__c,
        "lastName": null,
        "middleName": null,
        "gender": "Male",
        "dateOfBirth": dOB3__c,
        "age": 12,
        "aadharId": XLSXData[i].AADHAAR_NO3__c,
        "voterId": null,
        "pancard": XLSXData[i].Pan_No3__c,
        "nationality": XLSXData[i].NATIONALITY3__c,
        "relationWith": XLSXData[i].Relation_of_Third_Applicant__c,
        "relationWithCust": null,
        "relationName": XLSXData[i].S_o_D_o_W_o_3ndApplicant__c,
        "relationNamePrefix": XLSXData[i].Relation_Salutation3__c,
        "statusId": null,
        "status": null,
        "createdDate": null,
        "updatedDate": null
      }
      var coApplicentBookingInfo2 = {
        "coAppBookInfoId": null,
        "phoneNo": XLSXData[i].Mobile3__c,
        "alternatePhoneNo": null,
        "email": XLSXData[i].Email3__c,
        "telePhone": XLSXData[i].Tel_R3__c,
        "maritalStatus": XLSXData[i].Marital_Status3__c,
        "workExperience": "7 Years",
        "dateOfAnniversery": dOA3__c,
        "educationalQualification": XLSXData[i].Education_Qualification3__c,
        "annualHouseHoldIncome": XLSXData[i].Annual_Household_Income_Rupees3__c,
        "custProffisionalId": null,
        "statusId": null,
        "status": null,
        "createdDate": null,
        "updatedDate": null,
        "coApplicantId": null,
        "custBookInfoId": null
      }
      var CoAppaddressInfostwo = [];
      var CoAppaddressInfos21 = {
        "custAddressId": null,
        "floorNo": null,
        "tower": null,
        "street": null,
        "area": null,
        "landmark": null,
        "pincode": XLSXData[i].Pincode3__c,
        "cityId": null,
        "city": XLSXData[i].City3__c,
        "cityIcon": null,
        "stateId": null,
        "state": XLSXData[i].State3__c,
        "country": XLSXData[i].Country3__c,
        "langitude": null,
        "latitude": null,
        "createdDate": null,
        "updatedDate": null,
        "addressType": null,
        "address1": XLSXData[i].Permanent3__c,
        "address2": null,
        "address3": null,
        "statusId": null,
        "hno": null,
        "addressMappingType": {
          "addressMappingTypeId": null,
          "typeId": 1,
          //"type":null,
          "metaType": "APPLICANT2",
          "addressType": "permenent"
        }
      }
      CoAppaddressInfostwo.push(CoAppaddressInfos21);
      var CoAppaddressInfos22 = {
        "custAddressId": null,
        "floorNo": null,
        "tower": null,
        "street": null,
        "area": null,
        "landmark": null,
        "pincode": XLSXData[i].Pincode3_cor__c,
        "cityId": null,
        "city": XLSXData[i].City3_cor__c,
        "cityIcon": null,
        "stateId": null,
        "state": XLSXData[i].State3_cor__c,
        "country": XLSXData[i].Country3_corr__c,
        "langitude": null,
        "latitude": null,
        "createdDate": null,
        "updatedDate": null,
        "addressType": null,
        "address1": XLSXData[i].Correspondence3__c,
        "address2": null,
        "address3": null,
        "statusId": null,
        "hno": null,
        "addressMappingType": {
          "addressMappingTypeId": null,
          "typeId": 1,
          //"type":null,
          "metaType": "APPLICANT2",
          "addressType": "Correspondence"
        }
      }
      CoAppaddressInfostwo.push(CoAppaddressInfos22);
      var professionalInfo2 = {
        "designation": XLSXData[i].Designation3__c,
        "nameOfOrganization": XLSXData[i].Name_of_Organization_Business3__c,
        "addressOfOrganization": XLSXData[i].Address_of_Organization_Business3__c,
        "officeNumber": XLSXData[i].Office_Number3__c,
        "officeEmailId": XLSXData[i].Official_Email_ID3__c,
        "custProffisionalId": null,
        "statusId": null,
        "createdDate": null,
        "modifiedDate": null,
        "oraganizationDetails": {
          "organizationTypeId": null,
          "organizationTypeName": XLSXData[i].Organizational_type3__c,
          "ifOtherOrgTypeName": XLSXData[i].OrganizationalTypeIfOthers_3Applican__c
        },
        "sectorDetailsInfo": {
          "workSectorId": null,
          "workSectorName": XLSXData[i].Industry_Sector_of_Work_Business3__c,
          "ifOtherWorkSectorName": XLSXData[i].If_Others_IndustryofWork_3rdApplicant_c__c
        },
        "workFunctionInfo": {
          "workFunctionId": null,
          "workFunctionName": XLSXData[i].Work_Function_Role3__c,
          "ifOtherworkFunctionName": XLSXData[i].IfOthersWorkRol3rdApplicant__c
        },
        "yearsOfExperience": XLSXData[i].Number_of_years_of_Work_Experience3__c
      }

      CoAppData.push({
        "co_ApplicantInfo": co_ApplicantInfo2,
        "coApplicentBookingInfo": coApplicentBookingInfo2,
        "addressInfos": CoAppaddressInfostwo,
        "professionalInfo": professionalInfo2
      });

      var flatInfo = {
        "flatId": null,
        "floorDetId": null,
        "flatNo": XLSXData[i].Unit__r_name,
        "imageLocation": null,
        "status_Id": null,
        "expectedHandOverDate": null
      }
      var floorInfo = {
        "floorId": null,
        "floorName": XLSXData[i].floor__r_name,
        "createdDate": null
      }


      var blockInfo = {
        "blockId": null,
        "name": XLSXData[i].block__r_name,
        "createdDate": null
      }
      var siteInfo = {
        "siteId": null,
        "name": XLSXData[i].Project_Flat_no__r_name,
        "cityId": null,
        "statusId": null,
        "createdDate": null,
        "imageLocation": null,
        "modifiedDate": null,
        "referMessage": null,
        "stateId": null,
        "addressId": null,
        "landmarkImage": null,
        "projectArea": null,
        "noofUnits": null,
        "rera": XLSXData[i].Project_Flat_no__r_Rera_Number__c,
        "description": null,
        "overviewImage": null,
        "masterplanImage": null,
        "refererDescription": null
      }

      var flatCost = {
        "flatCostId": null,
        "flatId": null,
        "unitNumber": null,
        "sqftCost": null,
        "subaSqft": XLSXData[i].SBUA_In_Sqft__c,
        "carpetAreaSqft": XLSXData[i].Carpet_Area_In_Sqft__c,
        "plc": XLSXData[i].PLC,
        "floorRise": XLSXData[i].Floor_Rise,
        "basicFlatCost": XLSXData[i].Basic_Flat_cost__c,
        "amenitiesFlatCost": XLSXData[i].All_Component_Cost__c,
        "gstPercentage": null,
        "totalCost": XLSXData[i].Grand_total__c,
        "extraChanges": null,
        "fourWheelerParking": null,
        "twoWheelerParking": null,
        "clubHouse": null,
        "infra": null,
        "modificationCost": null,
        "taxesPerSft": XLSXData[i].Taxes_per_sft__c,
        "overallPricePerSft": XLSXData[i].Overall_price_per_sft__c,
        "createdDate": null,
        "updatedDate": null,
        "statusId": null,
        "createdBy": null,
        "updatedBy": null,
        "unitGroup": XLSXData[i].Unit_Group__c,
        "actualPricePerSft": XLSXData[i].total_falt_cost_per_sft__c,
        "soldBasePrice": XLSXData[i].Discount_Base_price__c,
        "perSqftCost": XLSXData[i].Base_Price__c,
        "flatCost": XLSXData[i].Total_cost__c,
        "gstCost": XLSXData[i].Total_GST_Price__c,
      }



      var aminitiesInfraCostInfo = [];
      var UnitNumber = XLSXData[i].Unit__r_name;
      // alert("UnitNumber :"+UnitNumber);
      var ProjectName = XLSXData[i].Project_Flat_no__r_name;
      for (var j = 0; j < bookingAmenitiesData.length; j++) {

        if (UnitNumber == bookingAmenitiesData[j].Units__c && ProjectName == bookingAmenitiesData[j].Projects__c) {
          var aminitiesInfraCostInfoObject = {
            "aminititesInfraCostId": null,
            "aminititesInfraFlatWiseId": null,
            "aminititesInfraId": null,
            "aminititesInfraName": bookingAmenitiesData[j].Aminitie__c,
            "flatCostId": null,
            "perSqftCost": null,
            "aminititesInfraCost": null,
            "totalCost": bookingAmenitiesData[j].Amount__c,
            "creationDate": null,
            "modifyDate": null,
            "statusId": null,
            "createdBy": null,
            "modifyBy": null
          }
          aminitiesInfraCostInfo.push(aminitiesInfraCostInfoObject);

          console.log(aminitiesInfraCostInfo);
        }
      }


      var booking_date__c;
      if (XLSXData[i].Booking_Date__c == null) {
        booking_date__c = ""
      } else {
        booking_date__c = XLSXData[i].Booking_Date__c.split("T")[0];
      }

      var Actual_Agg_Date__c;
      if (XLSXData[i].Actual_Agg_Date__c == null || XLSXData[i].Actual_Agg_Date__c == "") {
        Actual_Agg_Date__c = null;
      } else {


        let day = 60 * 60 * 24 * 1000;
        let date1 = new Date(XLSXData[i].Actual_Agg_Date__c);
        let endDate = new Date(date1.getTime() + day).getTime();
        Actual_Agg_Date__c = endDate;

        //Actual_Agg_Date__c = XLSXData[i].Actual_Agg_Date__c.split("T")[0];
      }


      // if (new Date(Scheme_XLSXData1[i].CHEQUE_DATE).getTime() == 0 || new Date(Scheme_XLSXData1[i].CHEQUE_DATE).getTime() == undefined) {
      //   this.CHEQUE_DATE = null;
      // } else {


      //   let day = 60 * 60 * 24 * 1000;
      //   let endDate = new Date(Scheme_XLSXData1[i].CHEQUE_DATE.getTime() + day).getTime();
      //   this.CHEQUE_DATE = endDate;

      // }


      if (XLSXData[i].salesforceTransactionId == "" || XLSXData[i].salesforceTransactionId == undefined) {
        XLSXData[i].salesforceTransactionId = null;
      }

      if (XLSXData[i].Milestone_days == "" || XLSXData[i].Milestone_days == undefined) {
        XLSXData[i].Milestone_days = null;
      }

      if (XLSXData[i].Old_Booking_Name__c == "" || XLSXData[i].Old_Booking_Name__c == undefined) {
        XLSXData[i].Old_Booking_Name__c = null;
      }

      if (XLSXData[i].New_Booking_Reason == "" || XLSXData[i].New_Booking_Reason == undefined) {
        XLSXData[i].New_Booking_Reason = null;
      }

      if (XLSXData[i].Name == "" || XLSXData[i].Name == undefined) {
        XLSXData[i].Name = null;
      }



      // console.log(XLSXData[i].Milestone_days);
      // console.log(XLSXData[i].Old_Booking_Name);
      // console.log(XLSXData[i].New_Booking_Reason);
      // console.log(XLSXData[i].Booking_Id);


      var flatBookingInfo = {
        "flatInfo": flatInfo,
        "floorInfo": floorInfo,
        "blockInfo": blockInfo,
        "siteInfo": siteInfo,
        "carpetArea": null,
        "facing": Facing__c,
        "carParkingSpaces": Unit_Car_Parking_Spaces,
        "carParkingAllotmentNo": Opportunity_No_of_Carparking,
        "uds": null,
        "eoiApplicable": XLSXData[i].EOI_Applicable__c,
        "eoiSequenceNumber": XLSXData[i].opportunity_r_EOI_SEQUENCE_NUMBER_c,
        "sbua": XLSXData[i].SBUA_In_Sqft__c,
        "registrationDate": null,
        "paymentId": null,
        "statusId": null,
        "flatId": null,
        "createdDate": null,
        "bookingRecieptFront": null,
        "bookingRecieptBack": null,
        "bookingDate": booking_date__c,
        "agreementDate": Actual_Agg_Date__c,
        "customerLoanBank": Bank_Name,
        "milestoneDueDays": XLSXData[i].Milestone_days,

        "OldBookingName": XLSXData[i].Old_Booking_Name__c,
        "NewBookingReason": XLSXData[i].New_Booking_Reason,
        "BookingId": XLSXData[i].Name,
        "salesforceTransactionId": XLSXData[i].Id,
        "customerId": null,
        "aminitiesInfraCostInfo": aminitiesInfraCostInfo,
        "flatCost": flatCost
      }

      console.log(JSON.stringify(flatBookingInfo))
      //return false;
      var customerCheckListVerificationsalesHead = [];
      var customerCheckListVerificationsalesHead1 = {
        "checkListVerfiId": null,
        "checkListInfo": {
          "checkListId": null,
          "checkListName": "Bkg dt,Project,Flat no,Area verification",
          "checkListDiscription": null
        },
        "checkListStatus": XLSXData[i].Booking_Date_Verification_SalesHead__c,
        "custId": null,
        "deparmentName": null,
        "departmentId": null,
        "checklistDeptMapId": null,
        "flatBookId": null,
        "is_verified": null
      }
      customerCheckListVerificationsalesHead.push(customerCheckListVerificationsalesHead1);
      var customerCheckListVerificationsalesHead2 = {
        "checkListVerfiId": null,
        "checkListInfo": {
          "checkListId": null,
          "checkListName": "Sqft Rates,Amenities & Cost verification",
          "checkListDiscription": null
        },
        "checkListStatus": XLSXData[i].Project_Name_Verification_SalesHead__c,
        "custId": null,
        "deparmentName": null,
        "departmentId": null,
        "checklistDeptMapId": null,
        "flatBookId": null,
        "is_verified": null
      }
      customerCheckListVerificationsalesHead.push(customerCheckListVerificationsalesHead2);
      var customerCheckListVerificationsalesHead3 = {
        "checkListVerfiId": null,
        "checkListInfo": {
          "checkListId": null,
          "checkListName": "All applicants KYC,Details verification",
          "checkListDiscription": null
        },
        "checkListStatus": XLSXData[i].Flat_Number_Verification_SalesHead__c,
        "custId": null,
        "deparmentName": null,
        "departmentId": null,
        "checklistDeptMapId": null,
        "flatBookId": null,
        "is_verified": null
      }
      customerCheckListVerificationsalesHead.push(customerCheckListVerificationsalesHead3);
      // var customerCheckListVerificationsalesHead4 = {
      //   "checkListVerfiId": null,
      //   "checkListInfo": {
      //     "checkListId": null,
      //     "checkListName": "Area of Flat",
      //     "checkListDiscription": null
      //   },
      //   "checkListStatus": XLSXData[i].Area_Of_Flat_Verification_SalesHead__c,
      //   "custId": null,
      //   "deparmentName": null,
      //   "departmentId": null,
      //   "checklistDeptMapId": null,
      //   "flatBookId": null,
      //   "is_verified": null
      // }
      // customerCheckListVerificationsalesHead.push(customerCheckListVerificationsalesHead4);

      // var customerCheckListVerificationsalesHead5 = {
      //   "checkListVerfiId": null,
      //   "checkListInfo": {
      //     "checkListId": null,
      //     "checkListName": "Base Rate",
      //     "checkListDiscription": null
      //   },
      //   "checkListStatus": XLSXData[i].Base_Rate_Verification_SalesHead__c,
      //   "custId": null,
      //   "deparmentName": null,
      //   "departmentId": null,
      //   "checklistDeptMapId": null,
      //   "flatBookId": null,
      //   "is_verified": null
      // }
      // customerCheckListVerificationsalesHead.push(customerCheckListVerificationsalesHead5);
      // var customerCheckListVerificationsalesHead6 = {
      //   "checkListVerfiId": null,
      //   "checkListInfo": {
      //     "checkListId": null,
      //     "checkListName": "Floor Rise",
      //     "checkListDiscription": null
      //   },
      //   "checkListStatus": XLSXData[i].Floor_Rise_Verification_SalesHead__c,
      //   "custId": null,
      //   "deparmentName": null,
      //   "departmentId": null,
      //   "checklistDeptMapId": null,
      //   "flatBookId": null,
      //   "is_verified": null
      // }
      // customerCheckListVerificationsalesHead.push(customerCheckListVerificationsalesHead6);
      // var customerCheckListVerificationsalesHead7 = {
      //   "checkListVerfiId": null,
      //   "checkListInfo": {
      //     "checkListId": null,
      //     "checkListName": "Amenities Facing",
      //     "checkListDiscription": null
      //   },
      //   "checkListStatus": XLSXData[i].Amenities_Facing_Verification_SalesHead__c,
      //   "custId": null,
      //   "deparmentName": null,
      //   "departmentId": null,
      //   "checklistDeptMapId": null,
      //   "flatBookId": null,
      //   "is_verified": null
      // }
      // customerCheckListVerificationsalesHead.push(customerCheckListVerificationsalesHead7);
      // var customerCheckListVerificationsalesHead8 = {
      //   "checkListVerfiId": null,
      //   "checkListInfo": {
      //     "checkListId": null,
      //     "checkListName": "Total Cost",
      //     "checkListDiscription": null
      //   },
      //   "checkListStatus": XLSXData[i].Total_Cost_Verification_SalesHead__c,
      //   "custId": null,
      //   "deparmentName": null,
      //   "departmentId": null,
      //   "checklistDeptMapId": null,
      //   "flatBookId": null,
      //   "is_verified": null
      // }
      // customerCheckListVerificationsalesHead.push(customerCheckListVerificationsalesHead8);
      // var customerCheckListVerificationsalesHead9 = {
      //   "checkListVerfiId": null,
      //   "checkListInfo": {
      //     "checkListId": null,
      //     "checkListName": "Contact Details",
      //     "checkListDiscription": null
      //   },
      //   "checkListStatus": XLSXData[i].Contact_Details_Verification_SalesHead__c,
      //   "custId": null,
      //   "deparmentName": null,
      //   "departmentId": null,
      //   "checklistDeptMapId": null,
      //   "flatBookId": null,
      //   "is_verified": null
      // }
      // customerCheckListVerificationsalesHead.push(customerCheckListVerificationsalesHead9);
      // var customerCheckListVerificationsalesHead10 = {
      //   "checkListVerfiId": null,
      //   "checkListInfo": {
      //     "checkListId": null,
      //     "checkListName": "DOB Applicant",
      //     "checkListDiscription": null
      //   },
      //   "checkListStatus": XLSXData[i].DOB_Applicant_Verification_SalesHead__c,
      //   "custId": null,
      //   "deparmentName": null,
      //   "departmentId": null,
      //   "checklistDeptMapId": null,
      //   "flatBookId": null,
      //   "is_verified": null
      // }
      // customerCheckListVerificationsalesHead.push(customerCheckListVerificationsalesHead10);
      // var customerCheckListVerificationsalesHead11 = {
      //   "checkListVerfiId": null,
      //   "checkListInfo": {
      //     "checkListId": null,
      //     "checkListName": "Anniversary Date",
      //     "checkListDiscription": null
      //   },
      //   "checkListStatus": XLSXData[i].Anniversary_Date_Verification_SalesHead__c,
      //   "custId": null,
      //   "deparmentName": null,
      //   "departmentId": null,
      //   "checklistDeptMapId": null,
      //   "flatBookId": null,
      //   "is_verified": null
      // }
      // customerCheckListVerificationsalesHead.push(customerCheckListVerificationsalesHead11);
      // var customerCheckListVerificationsalesHead12 = {
      //   "checkListVerfiId": null,
      //   "checkListInfo": {
      //     "checkListId": null,
      //     "checkListName": "DOB Co-Applicant",
      //     "checkListDiscription": null
      //   },
      //   "checkListStatus": XLSXData[i].DOB_Co_Applicant_Verification_SalesHead__c,
      //   "custId": null,
      //   "deparmentName": null,
      //   "departmentId": null,
      //   "checklistDeptMapId": null,
      //   "flatBookId": null,
      //   "is_verified": null
      // }
      // customerCheckListVerificationsalesHead.push(customerCheckListVerificationsalesHead12);


      var date_signatureOfProjectSalesHead__c;
      if (XLSXData[i].Date_SignatureOfProjectSalesHead__c == null) {
        date_signatureOfProjectSalesHead__c = null;
      } else {
        date_signatureOfProjectSalesHead__c = XLSXData[i].Date_SignatureOfProjectSalesHead__c.split("T")[0];
      }

      var date_authorizedSignatory__c;
      if (XLSXData[i].Date_AuthorizedSignatory__c == null) {
        date_authorizedSignatory__c = null;
      } else {
        date_authorizedSignatory__c = XLSXData[i].Date_AuthorizedSignatory__c.split("T")[0];
      }

      var checkListSalesHead = {
        "customerCheckListVerification": customerCheckListVerificationsalesHead,
        "name": XLSXData[i].Applicant_Name_SalesHeadVerification__c,
        "leadId": XLSXData[i].Lead_Id_BookingCNFMChklstSalesHead__c,
        //"stm":"ChandraMouli",
        "stm": XLSXData[i].STM_Bookingcnfmchklist_SalesHead__c,
        "sourceofBooking": XLSXData[i].Source_of_Booking_BookingcnfmSalesHead__c,
        "referralBonusStatus": XLSXData[i].Referral_Bonus_BookingchklstcnfmSalesHea__c,
        "offersAny": XLSXData[i].Offerrs_If_AnybookingCnfmchklstSalesHea__c,
        "availability": XLSXData[i].Availability_List_in_ERP_SalesHead__c,
        "availabilityIfOther": null,
        "salesTeamCommitments": XLSXData[i].Commitments_From_Sales_Team_Member__c,
        "remarks": XLSXData[i].Remarks_SalesHead__c,
        "projectSalesheadId": null,
        "projectSalesheadName": XLSXData[i].Signature_of_Project_Sales_Head__c,
        "projectSalesHeadDate": date_signatureOfProjectSalesHead__c,
        "authorizedSignatoryId": null,
        "authorizedSignatoryName": XLSXData[i].BookingConfCheckAuthorizedSignDate__c,
        "authorizedSignatoryDate": date_authorizedSignatory__c
      }

      var customerCheckListVerificationCRMData = [];

      var customerCheckListVerificationCRM1 = {
        "checkListVerfiId": null,
        "checkListInfo": {
          "checkListId": null,
          "checkListName": "Bkg dt,Project,Flat no,Area Verification",
          "checkListDiscription": null
        },
        "checkListStatus": XLSXData[i].BookingDateVerification_CRM__c,
        "custId": null,
        "deparmentName": null,
        "departmentId": null,
        "checklistDeptMapId": null,
        "flatBookId": null,
        "is_verified": null
      }
      customerCheckListVerificationCRMData.push(customerCheckListVerificationCRM1);
      var customerCheckListVerificationCRM2 = {
        "checkListVerfiId": null,
        "checkListInfo": {
          "checkListId": null,
          "checkListName": "All applicants KYC,Details verification",
          "checkListDiscription": null
        },
        "checkListStatus": XLSXData[i].ProjectNameVerification_CRM__c,
        "custId": null,
        "deparmentName": null,
        "departmentId": null,
        "checklistDeptMapId": null,
        "flatBookId": null,
        "is_verified": null
      }
      customerCheckListVerificationCRMData.push(customerCheckListVerificationCRM2);
      var customerCheckListVerificationCRM3 = {
        "checkListVerfiId": null,
        "checkListInfo": {
          "checkListId": null,
          "checkListName": "Total Cost Verification",
          "checkListDiscription": null
        },
        "checkListStatus": XLSXData[i].Total_Cost_Verification_CRM__c,
        "custId": null,
        "deparmentName": null,
        "departmentId": null,
        "checklistDeptMapId": null,
        "flatBookId": null,
        "is_verified": null
      }
      customerCheckListVerificationCRMData.push(customerCheckListVerificationCRM3);
      // var customerCheckListVerificationCRM4 = {
      //   "checkListVerfiId": null,
      //   "checkListInfo": {
      //     "checkListId": null,
      //     "checkListName": "Area of Flat",
      //     "checkListDiscription": null
      //   },
      //   "checkListStatus": XLSXData[i].Area_Of_Flat_Verification_CRM__c,
      //   "custId": null,
      //   "deparmentName": null,
      //   "departmentId": null,
      //   "checklistDeptMapId": null,
      //   "flatBookId": null,
      //   "is_verified": null
      // }
      // customerCheckListVerificationCRMData.push(customerCheckListVerificationCRM4);
      // var customerCheckListVerificationCRM5 = {
      //   "checkListVerfiId": null,
      //   "checkListInfo": {
      //     "checkListId": null,
      //     "checkListName": "Pancard",
      //     "checkListDiscription": null
      //   },
      //   "checkListStatus": XLSXData[i].Pancard_Verification_CRM__c,
      //   "custId": null,
      //   "deparmentName": null,
      //   "departmentId": null,
      //   "checklistDeptMapId": null,
      //   "flatBookId": null,
      //   "is_verified": null
      // }
      // customerCheckListVerificationCRMData.push(customerCheckListVerificationCRM5);
      // var customerCheckListVerificationCRM6 = {
      //   "checkListVerfiId": null,
      //   "checkListInfo": {
      //     "checkListId": null,
      //     "checkListName": "Total Cost",
      //     "checkListDiscription": null
      //   },
      //   "checkListStatus": XLSXData[i].Total_Cost_Verification_CRM__c,
      //   "custId": null,
      //   "deparmentName": null,
      //   "departmentId": null,
      //   "checklistDeptMapId": null,
      //   "flatBookId": null,
      //   "is_verified": null
      // }
      // customerCheckListVerificationCRMData.push(customerCheckListVerificationCRM6);
      // var customerCheckListVerificationCRM7 = {
      //   "checkListVerfiId": null,
      //   "checkListInfo": {
      //     "checkListId": null,
      //     "checkListName": "Contact Details",
      //     "checkListDiscription": null
      //   },
      //   "checkListStatus": XLSXData[i].Contact_Details_Verification_CRM__c,
      //   "custId": null,
      //   "deparmentName": null,
      //   "departmentId": null,
      //   "checklistDeptMapId": null,
      //   "flatBookId": null,
      //   "is_verified": null
      // }
      // customerCheckListVerificationCRMData.push(customerCheckListVerificationCRM7);
      // var customerCheckListVerificationCRM8 = {
      //   "checkListVerfiId": null,
      //   "checkListInfo": {
      //     "checkListId": null,
      //     "checkListName": "DOB Applicant",
      //     "checkListDiscription": null
      //   },
      //   "checkListStatus": XLSXData[i].DOB_Applicant_Verification_CRM__c,
      //   "custId": null,
      //   "deparmentName": null,
      //   "departmentId": null,
      //   "checklistDeptMapId": null,
      //   "flatBookId": null,
      //   "is_verified": null
      // }
      // customerCheckListVerificationCRMData.push(customerCheckListVerificationCRM8);
      // var customerCheckListVerificationCRM9 = {
      //   "checkListVerfiId": null,
      //   "checkListInfo": {
      //     "checkListId": null,
      //     "checkListName": "Anniversary Date",
      //     "checkListDiscription": null
      //   },
      //   "checkListStatus": XLSXData[i].Anniversary_Date_Verification_CRM__c,
      //   "custId": null,
      //   "deparmentName": null,
      //   "departmentId": null,
      //   "checklistDeptMapId": null,
      //   "flatBookId": null,
      //   "is_verified": null
      // }
      // customerCheckListVerificationCRMData.push(customerCheckListVerificationCRM9);
      // var customerCheckListVerificationCRM10 = {
      //   "checkListVerfiId": null,
      //   "checkListInfo": {
      //     "checkListId": null,
      //     "checkListName": "DOB Co-applicant",
      //     "checkListDiscription": null
      //   },
      //   "checkListStatus": XLSXData[i].DOB_Co_applicant_Verification_CRM__c,
      //   "custId": null,
      //   "deparmentName": null,
      //   "departmentId": null,
      //   "checklistDeptMapId": null,
      //   "flatBookId": null,
      //   "is_verified": null
      // }
      // customerCheckListVerificationCRMData.push(customerCheckListVerificationCRM10);

      var date_dommentDate_AgreementDate__c;
      if (XLSXData[i].Date_CommentDate_AgreementDate__c == null) {
        date_dommentDate_AgreementDate__c = null;
      } else {
        date_dommentDate_AgreementDate__c = XLSXData[i].Date_CommentDate_AgreementDate__c.split("T")[0];
      }


      var date_verifiedByName_agreementDate__c;
      if (XLSXData[i].Date_VerifiedByName_agreementDate__c == null) {
        date_verifiedByName_agreementDate__c = null;
      } else {
        date_verifiedByName_agreementDate__c = XLSXData[i].Date_VerifiedByName_agreementDate__c.split("T")[0];
      }


      var date_authorizedSignatory_CRM__c;
      if (XLSXData[i].Date_AuthorizedSignatory_CRM__c == null) {
        date_authorizedSignatory_CRM__c = null;
      } else {
        date_authorizedSignatory_CRM__c = XLSXData[i].Date_AuthorizedSignatory_CRM__c.split("T")[0];
      }
      var checkListCRM = {
        "customerCheckListVerification": customerCheckListVerificationCRMData,
        "commitmentsFromSTM": XLSXData[i].Commitment_from_Sales_Team_Member_CRM__c,
        "welcomeCallRecord": XLSXData[i].Welcome_Call_Record__c,
        "crmRemarks": XLSXData[i].Remarks_BookingCNFMCHKLIST_CRM__c,
        "crmPreferenceBankLoan": XLSXData[i].Preferences_forbankloan_CRM__c,
        "expectedAgreeDateComment": XLSXData[i].Comment_ExpectedAgreementDate__c,
        "expectedAgreeDate": date_dommentDate_AgreementDate__c,
        "crmVerifiedByName": XLSXData[i].Verified_by_Name_ExpectedAgreementDate__c,
        "crmEmpID": XLSXData[i].EMP_ID_ExpectedAgreementDate__c,
        "crmSignedName": XLSXData[i].SignatureVerifiedByExpectedAgreementDate__c,
        "crmSignedDate": date_verifiedByName_agreementDate__c,
        "authorizedSignatoryeId": null,
        "authorizedSignatoryeName": XLSXData[i].AuthorizedSignatoryofExpectagreementDate__c,
        "authorizedSignatoryDate": date_authorizedSignatory_CRM__c
      }

      var customerCheckListVerificationLegalofcData = [];
      var customerCheckListVerificationLegalofcData1 = {
        "checkListVerfiId": null,
        "checkListInfo": {
          "checkListId": null,
          "checkListName": "Booking Form",
          "checkListDiscription": null
        },
        "checkListStatus": XLSXData[i].Booking_Form_LegalOfficer__c,
        "custId": null,
        "deparmentName": null,
        "departmentId": null,
        "checklistDeptMapId": null,
        "flatBookId": null,
        "is_verified": null
      }
      customerCheckListVerificationLegalofcData.push(customerCheckListVerificationLegalofcData1);

      var customerCheckListVerificationLegalofcData2 = {
        "checkListVerfiId": null,
        "checkListInfo": {
          "checkListId": null,
          "checkListName": "Applicant1 - Age,Address,Name,Relation",
          "checkListDiscription": null
        },
        "checkListStatus": XLSXData[i].Applicant_1_Name_LegalOfficer__c,
        "custId": null,
        "deparmentName": null,
        "departmentId": null,
        "checklistDeptMapId": null,
        "flatBookId": null,
        "is_verified": null
      }
      customerCheckListVerificationLegalofcData.push(customerCheckListVerificationLegalofcData2);

      // var customerCheckListVerificationLegalofcData3 = {
      //   "checkListVerfiId": null,
      //   "checkListInfo": {
      //     "checkListId": null,
      //     "checkListName": "Applicant2 - Age,Address,Name,Relation",
      //     "checkListDiscription": null
      //   },
      //   "checkListStatus": XLSXData[i].Applicant_1_Address_LegalOfficer__c,
      //   "custId": null,
      //   "deparmentName": null,
      //   "departmentId": null,
      //   "checklistDeptMapId": null,
      //   "flatBookId": null,
      //   "is_verified": null
      // }
      // customerCheckListVerificationLegalofcData.push(customerCheckListVerificationLegalofcData3);

      var customerCheckListVerificationLegalofcData4 = {
        "checkListVerfiId": null,
        "checkListInfo": {
          "checkListId": null,
          "checkListName": "Project, Flat No, Block/Wing, Floor No",
          "checkListDiscription": null
        },
        "checkListStatus": XLSXData[i].Applicant_1_Name_LegalOfficer__c,
        "custId": null,
        "deparmentName": null,
        "departmentId": null,
        "checklistDeptMapId": null,
        "flatBookId": null,
        "is_verified": null
      }
      customerCheckListVerificationLegalofcData.push(customerCheckListVerificationLegalofcData4);

      var customerCheckListVerificationLegalofcData5 = {
        "checkListVerfiId": null,
        "checkListInfo": {
          "checkListId": null,
          "checkListName": "SBUA, Carpet Area, UDS",
          "checkListDiscription": null
        },
        "checkListStatus": XLSXData[i].Carpet_Area_UDS_LegalOfficer__c,
        "custId": null,
        "deparmentName": null,
        "departmentId": null,
        "checklistDeptMapId": null,
        "flatBookId": null,
        "is_verified": null
      }
      customerCheckListVerificationLegalofcData.push(customerCheckListVerificationLegalofcData5);

      var customerCheckListVerificationLegalofcData6 = {
        "checkListVerfiId": null,
        "checkListInfo": {
          "checkListId": null,
          "checkListName": "Agreement cost, cost break up",
          "checkListDiscription": null
        },
        "checkListStatus": XLSXData[i].Agreement_Cost_LegalOfficer__c,
        "custId": null,
        "deparmentName": null,
        "departmentId": null,
        "checklistDeptMapId": null,
        "flatBookId": null,
        "is_verified": null
      }
      customerCheckListVerificationLegalofcData.push(customerCheckListVerificationLegalofcData6);

      var customerCheckListVerificationLegalofcData7 = {
        "checkListVerfiId": null,
        "checkListInfo": {
          "checkListId": null,
          "checkListName": "Tripartite Agreement",
          "checkListDiscription": null
        },
        "checkListStatus": XLSXData[i].Tripartite_Agreement_LegalOfficer__c,
        "custId": null,
        "deparmentName": null,
        "departmentId": null,
        "checklistDeptMapId": null,
        "flatBookId": null,
        "is_verified": null
      }
      customerCheckListVerificationLegalofcData.push(customerCheckListVerificationLegalofcData7);

      var customerCheckListVerificationLegalofcData8 = {
        "checkListVerfiId": null,
        "checkListInfo": {
          "checkListId": null,
          "checkListName": "Own Funds",
          "checkListDiscription": null
        },
        "checkListStatus": XLSXData[i].Own_Funds_LegalOfficer__c,
        "custId": null,
        "deparmentName": null,
        "departmentId": null,
        "checklistDeptMapId": null,
        "flatBookId": null,
        "is_verified": null
      }
      customerCheckListVerificationLegalofcData.push(customerCheckListVerificationLegalofcData8);

      // var customerCheckListVerificationLegalofcData9 = {
      //   "checkListVerfiId": null,
      //   "checkListInfo": {
      //     "checkListId": null,
      //     "checkListName": "Cost Break Up",
      //     "checkListDiscription": null
      //   },
      //   "checkListStatus": XLSXData[i].Cost_Break_Up_LegalOfficer__c,
      //   "custId": null,
      //   "deparmentName": null,
      //   "departmentId": null,
      //   "checklistDeptMapId": null,
      //   "flatBookId": null,
      //   "is_verified": null
      // }
      // customerCheckListVerificationLegalofcData.push(customerCheckListVerificationLegalofcData9);

      // var customerCheckListVerificationLegalofcData10 = {
      //   "checkListVerfiId": null,
      //   "checkListInfo": {
      //     "checkListId": null,
      //     "checkListName": "Tripartite Agreement",
      //     "checkListDiscription": null
      //   },
      //   "checkListStatus": XLSXData[i].Tripartite_Agreement_LegalOfficer__c,
      //   "custId": null,
      //   "deparmentName": null,
      //   "departmentId": null,
      //   "checklistDeptMapId": null,
      //   "flatBookId": null,
      //   "is_verified": null
      // }
      // customerCheckListVerificationLegalofcData.push(customerCheckListVerificationLegalofcData10);

      // var customerCheckListVerificationLegalofcData11 = {
      //   "checkListVerfiId": null,
      //   "checkListInfo": {
      //     "checkListId": null,
      //     "checkListName": "Own Funds",
      //     "checkListDiscription": null
      //   },
      //   "checkListStatus": XLSXData[i].Own_Funds_LegalOfficer__c,
      //   "custId": null,
      //   "deparmentName": null,
      //   "departmentId": null,
      //   "checklistDeptMapId": null,
      //   "flatBookId": null,
      //   "is_verified": null
      // }
      // customerCheckListVerificationLegalofcData.push(customerCheckListVerificationLegalofcData11);
      //

      var coApplicentCheckListVerificationData1 = [];
      var coApplicentCheckListVerification11 = {
        "checkListVerfiId": null,
        "checkListInfo": {
          "checkListId": null,
          "checkListName": "Applicant2 - Age,Address,Name,Relation",
          "checkListDiscription": null
        },
        "checkListStatus": XLSXData[i].Applicant_1_Address_LegalOfficer__c,
        "coApplicantId": null,
        "checkListDeptMappingId": null,
        "custId": 0,
        "is_verified": 0,
        "coapplicentPanCard": XLSXData[i].PAN_NO_Mandatory_2ndApplicant__c
      }
      // coApplicentCheckListVerificationData1.push(coApplicentCheckListVerification11);
      // var coApplicentCheckListVerification12 = {
      //   "checkListVerfiId": null,
      //   "checkListInfo": {
      //     "checkListId": null,
      //     "checkListName": "Age",
      //     "checkListDiscription": null
      //   },
      //   "checkListStatus": XLSXData[i].Applicant1Age_LegalOfficer__c,
      //   "coApplicantId": null,
      //   "checkListDeptMappingId": null,
      //   "custId": 0,
      //   "is_verified": 0,
      //   "coapplicentPanCard": XLSXData[i].PAN_NO_Mandatory_2ndApplicant__c

      // }
      // coApplicentCheckListVerificationData1.push(coApplicentCheckListVerification12);

      // var coApplicentCheckListVerification13 = {
      //   "checkListVerfiId": null,
      //   "checkListInfo": {
      //     "checkListId": null,
      //     "checkListName": "Relation",
      //     "checkListDiscription": null
      //   },
      //   "checkListStatus": XLSXData[i].Applicant_1_Relation_LegalOfficer__c,
      //   "coApplicantId": null,
      //   "checkListDeptMappingId": null,
      //   "custId": 0,
      //   "is_verified": 0,
      //   "coapplicentPanCard": XLSXData[i].PAN_NO_Mandatory_2ndApplicant__c
      // }
      // coApplicentCheckListVerificationData1.push(coApplicentCheckListVerification13);

      // var coApplicentCheckListVerification14 = {
      //   "checkListVerfiId": null,
      //   "checkListInfo": {
      //     "checkListId": null,
      //     "checkListName": "Address",
      //     "checkListDiscription": null
      //   },
      //   "checkListStatus": XLSXData[i].Applicant_1_Address_LegalOfficer__c,
      //   "coApplicantId": null,
      //   "checkListDeptMappingId": null,
      //   "custId": 0,
      //   "is_verified": 0,
      //   "coapplicentPanCard": XLSXData[i].PAN_NO_Mandatory_2ndApplicant__c
      // }
      // coApplicentCheckListVerificationData1.push(coApplicentCheckListVerification14);

      // var coApplicentCheckListVerification21 = {
      //   "checkListVerfiId": null,
      //   "checkListInfo": {
      //     "checkListId": null,
      //     "checkListName": "Applicant Name",
      //     "checkListDiscription": null
      //   },
      //   "checkListStatus": XLSXData[i].Applicant_2_Name_LegalOfficer__c,
      //   "coApplicantId": null,
      //   "checkListDeptMappingId": null,
      //   "custId": 0,
      //   "is_verified": 0,
      //   "coapplicentPanCard": XLSXData[i].Pan_No3__c
      // }
      // coApplicentCheckListVerificationData1.push(coApplicentCheckListVerification21);
      // var coApplicentCheckListVerification22 = {
      //   "checkListVerfiId": null,
      //   "checkListInfo": {
      //     "checkListId": null,
      //     "checkListName": "Age",
      //     "checkListDiscription": null
      //   },
      //   "checkListStatus": XLSXData[i].Applicant_2_Age_LegalOfficer__c,
      //   "coApplicantId": null,
      //   "checkListDeptMappingId": null,
      //   "custId": 0,
      //   "is_verified": 0,
      //   "coapplicentPanCard": XLSXData[i].Pan_No3__c
      // }
      // coApplicentCheckListVerificationData1.push(coApplicentCheckListVerification22);

      // var coApplicentCheckListVerification23 = {
      //   "checkListVerfiId": null,
      //   "checkListInfo": {
      //     "checkListId": null,
      //     "checkListName": "Relation",
      //     "checkListDiscription": null
      //   },
      //   "checkListStatus": XLSXData[i].Applicant_2_Relation_LegalOfficer__c,
      //   "coApplicantId": null,
      //   "checkListDeptMappingId": null,
      //   "custId": 0,
      //   "is_verified": 0,
      //   "coapplicentPanCard": XLSXData[i].Pan_No3__c
      // }
      // coApplicentCheckListVerificationData1.push(coApplicentCheckListVerification23);

      // var coApplicentCheckListVerification24 = {
      //   "checkListVerfiId": null,
      //   "checkListInfo": {
      //     "checkListId": null,
      //     "checkListName": "Address",
      //     "checkListDiscription": null
      //   },
      //   "checkListStatus": XLSXData[i].Applicant_2_Address_LegalOfficer__c,
      //   "coApplicantId": null,
      //   "checkListDeptMappingId": null,
      //   "custId": 0,
      //   "is_verified": 0,
      //   "coapplicentPanCard": XLSXData[i].Pan_No3__c
      // }
      // coApplicentCheckListVerificationData1.push(coApplicentCheckListVerification24);


      var date_legalOfficerSignature__c;
      if (XLSXData[i].Date_LegalOfficerSignature__c == null) {
        date_legalOfficerSignature__c = null;
      } else {
        date_legalOfficerSignature__c = XLSXData[i].Date_LegalOfficerSignature__c.split("T")[0];
      }


      var date_AgreementChkLst_authorizedSign__c;
      if (XLSXData[i].Date_AgreementChkLst_AuthorizedSign__c == null) {
        date_AgreementChkLst_authorizedSign__c = null;
      } else {
        date_AgreementChkLst_authorizedSign__c = XLSXData[i].Date_AgreementChkLst_AuthorizedSign__c.split("T")[0];
      }

      var checkListLegalOfficer = {
        "customerCheckListVerification": customerCheckListVerificationLegalofcData,
        "coappCheckListApp": coApplicentCheckListVerificationData1,
        "bankerName": XLSXData[i].Bank_Name1__r_Bank_Name__c,
        "bank": XLSXData[i].Bank_Name1__c,
        "contact": XLSXData[i].Bank_Name1__r_Banker_Mob_No__c,
        "bankerEmailAddress": XLSXData[i].Bank_Name1__r_Banker_Email_ID__c,
        "offersIfAny": XLSXData[i].Offers_If_Any_AgreementCheckList__c,
        "legelOfficerComments": XLSXData[i].Comments_LegalOfficer__c,
        "legalOfficer": XLSXData[i].Legal_Officer_AgreementCheckList__c,
        "empId": XLSXData[i].EMP_ID_LegalOfficer__c,
        "legalOfficeSignedate": date_legalOfficerSignature__c,
        "authorizedSignatoryId": null,
        "authorizedSignatoryName": XLSXData[i].Authorized_Signatory_AgreementCheckList__c,
        "authorizedSignatoryDate": date_AgreementChkLst_authorizedSign__c
      }

      var customerCheckListVerificationRegData = [];
      var customerCheckListVerificationReg1 =
      {
        "checkListVerfiId": null,
        "checkListInfo": {
          "checkListId": null,
          "checkListName": "Project/Flat Number - Verified",
          "checkListDiscription": null
        },
        "checkListStatus": XLSXData[i].Project_Flat_Number_Verified_Legal__c,
        "custId": null,
        "deparmentName": null,
        "departmentId": null,
        "checklistDeptMapId": null,
        "flatBookId": null,
        "is_verified": null
      }
      customerCheckListVerificationRegData.push(customerCheckListVerificationReg1);
      var customerCheckListVerificationReg2 =
      {
        "checkListVerfiId": null,
        "checkListInfo": {
          "checkListId": null,
          "checkListName": "Applicant CoApplicants Name-Verification",
          "checkListDiscription": null
        },
        "checkListStatus": XLSXData[i].ApplicantCoApplicant_Verification_RegChk__c,
        "custId": null,
        "deparmentName": null,
        "departmentId": null,
        "checklistDeptMapId": null,
        "flatBookId": null,
        "is_verified": null
      }
      customerCheckListVerificationRegData.push(customerCheckListVerificationReg2);
      var customerCheckListVerificationReg3 =
      {
        "checkListVerfiId": null,
        "checkListInfo": {
          "checkListId": null,
          "checkListName": "Floor,SBUA,UDS-Verification",
          "checkListDiscription": null
        },
        "checkListStatus": XLSXData[i].Floor_SBUA_UDS_Verification_RegChkLst__c,
        "custId": null,
        "deparmentName": null,
        "departmentId": null,
        "checklistDeptMapId": null,
        "flatBookId": null,
        "is_verified": null
      }
      customerCheckListVerificationRegData.push(customerCheckListVerificationReg3);
      var customerCheckListVerificationReg4 = {
        "checkListVerfiId": null,
        "checkListInfo": {
          "checkListId": null,
          "checkListName": "Agreement Cost -Verification",
          "checkListDiscription": null
        },
        "checkListStatus": XLSXData[i].Agreement_Cost_Verification_RegChkLst__c,
        "custId": null,
        "deparmentName": null,
        "departmentId": null,
        "checklistDeptMapId": null,
        "flatBookId": null,
        "is_verified": null
      }
      customerCheckListVerificationRegData.push(customerCheckListVerificationReg4);

      var customerCheckListVerificationReg5 = {
        "checkListVerfiId": null,
        "checkListInfo": {
          "checkListId": null,
          "checkListName": "Flat Advance(RECO)",
          "checkListDiscription": null
        },
        "checkListStatus": XLSXData[i].Flat_Advance_RECO_REGCHKLST__c,
        "custId": null,
        "deparmentName": null,
        "departmentId": null,
        "checklistDeptMapId": null,
        "flatBookId": null,
        "is_verified": null
      }
      customerCheckListVerificationRegData.push(customerCheckListVerificationReg5);
      var customerCheckListVerificationReg6 = {
        "checkListVerfiId": null,
        "checkListInfo": {
          "checkListId": null,
          "checkListName": "Extra works Receipts are -Verified",
          "checkListDiscription": null
        },
        "checkListStatus": XLSXData[i].ExtraWorksReceiptsVerified_RegChkLst__c,
        "custId": null,
        "deparmentName": null,
        "departmentId": null,
        "checklistDeptMapId": null,
        "flatBookId": null,
        "is_verified": null
      }
      customerCheckListVerificationRegData.push(customerCheckListVerificationReg6);
      var customerCheckListVerificationReg7 = {
        "checkListVerfiId": null,
        "checkListInfo": {
          "checkListId": null,
          "checkListName": "TDS Challan Payments -Verification",
          "checkListDiscription": null
        },
        "checkListStatus": XLSXData[i].TDS_Challan_Payments_Verifica_RegChkLST__c,
        "custId": null,
        "deparmentName": null,
        "departmentId": null,
        "checklistDeptMapId": null,
        "flatBookId": null,
        "is_verified": null
      }
      customerCheckListVerificationRegData.push(customerCheckListVerificationReg7);
      // var customerCheckListVerificationReg8 = {
      //   "checkListVerfiId": null,
      //   "checkListInfo": {
      //     "checkListId": null,
      //     "checkListName": "VERIFIED ALL THE ABOVE PARAMETERS WITH SALE DEED.",
      //     "checkListDiscription": null
      //   },
      //   "checkListStatus": XLSXData[i].VERIFIED_ALL_THEABOVEPARAMETERSRegChklst__c,
      //   "custId": null,
      //   "deparmentName": null,
      //   "departmentId": null,
      //   "checklistDeptMapId": null,
      //   "flatBookId": null,
      //   "is_verified": null
      // }
      // customerCheckListVerificationRegData.push(customerCheckListVerificationReg8);


      var date_legalOfficerSignature__c;
      if (XLSXData[i].Date_LegalOfficerSignature__c == null) {
        date_legalOfficerSignature__c = null;
      } else {
        date_legalOfficerSignature__c = XLSXData[i].Date_LegalOfficerSignature__c.split("T")[0];
      }


      var date_accountsExecutiveSignature__c;
      if (XLSXData[i].Date_AccountsExecutiveSignature__c == null) {
        date_accountsExecutiveSignature__c = null;
      } else {
        date_accountsExecutiveSignature__c = XLSXData[i].Date_AccountsExecutiveSignature__c.split("T")[0];
      }


      var authorized_signatory_date_acctCmmt__c;
      if (XLSXData[i].Authorized_Signatory_Date_AcctCmmt__c == null) {
        authorized_signatory_date_acctCmmt__c = null;
      } else {
        authorized_signatory_date_acctCmmt__c = XLSXData[i].Authorized_Signatory_Date_AcctCmmt__c.split("T")[0];
      }
      var checkListRegistration = {
        "customerCheckListVerification": customerCheckListVerificationRegData,
        "agValue": XLSXData[i].Grand_total__c,
        "sdValue": XLSXData[i].Sale_Deed_Value__c,
        "legalComments": XLSXData[i].Comments_From_Legal_RegChkList__c,
        "accountsComments": XLSXData[i].Comments_From_Accounts_RegChkLst__c,
        "legalOfficerEmpId": XLSXData[i].EMP_ID_LegalOfficerSignature__c,
        "legalOfficerEmpName": XLSXData[i].Legal_Officer_Signature_CommtFromAccount__c,
        "legalOfficerDate": date_legalOfficerSignature__c,
        "accountsExecutiveEmpid": XLSXData[i].EMP_ID_AccountsExecutiveSignature__c,
        "accountsExecutiveEmpName": XLSXData[i].AccountsExecutiveSignature_CmtFrmAccount__c,
        "accountsExecutiveDate": date_accountsExecutiveSignature__c,
        "authorizedSignatureId": null,
        "authorizedSignatureName": XLSXData[i].Authorized_Signatory_CommentsFrmAccounts__c,
        "authorizedDate": authorized_signatory_date_acctCmmt__c,
        "customerId": null,
        "flatBookingId": null,
        "sdNumber": null
      }

      var employeeFinancialRequest = {
        // "mileStoneAliasName": "temp"
        "mileStoneAliasName": MILESTONE_ALIAS_NAME
      }
      var customerApplicationInfo = {
        "custAppId": null,
        "siteId": null,
        "unit": null,
        "leadId": XLSXData[i].Opportunity__r_Lead_Number__c,
        "ackId": XLSXData[i].Project_Flat_no__r_Rera_Number__c,
        "appNo": null,
        "blockId": null,
        "statusId": null,
        "createdDate": null,
        "modifiedDate": null,
        "flatBookId": null,
        "reasonForNoKYC": XLSXData[i].Reason_For_No_KYC_Documents__c,
        "stmId": null
      }
      customerBookingFormInfoList.push({ "customerInfo": customerInfo, "customerSchemeInfos": customerSchemeInfosArray, "customerBookingInfo": customerBookingInfo, "addressInfos": custAdressInfosArray, "customerKYCSubmitedInfo": KYCDetails, "customerApplicationInfo": customerApplicationInfo, "professionalInfo": professionalInfo, "customerOtherDetailsInfo": customerOtherDetailsInfo, "coApplicentDetails": CoAppData, "flatBookingInfo": flatBookingInfo, "checkListSalesHead": checkListSalesHead, "checkListCRM": checkListCRM, "checkListLegalOfficer": checkListLegalOfficer, "checkListRegistration": checkListRegistration, "employeeFinancialRequest": employeeFinancialRequest });
    }

    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "bookingFormService/saveBookingDetails.spring";
    //let url ="http://192.168.50.74:8080/employeeservice/bookingFormService/saveBookingDetails.spring";
    var body = {
      "customerBookingFormsInfos": customerBookingFormInfoList,
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "requestUrl": "saveBookingDetails"
    };

    console.log(JSON.stringify(body));



    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    console.log("body: " + JSON.stringify(body));
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      console.log("Seek Info response----------" + JSON.stringify(resp));
      if (resp.responseCode == 200) {

        $("#files").val("");
        $(".file-path").val("");
        var statusData = resp.bookingFormSavedStatuses;
        var str = "";
        for (var i = 0; i < statusData.length; i++) {
          var color;
          if (statusData[i].status == "success") {
            color = "green";
          } else {
            color = "red";
          }
          str += '<tr>';
          str += '<td class="text-center">' + (i + 1) + '</td>';
          str += '<td class="text-center">' + statusData[i].leadId + '</td>';
          str += '<td class="text-center">' + statusData[i].custName + '</td>';
          str += '<td><span style="color:' + color + ';text-center;">' + statusData[i].status + '</span></td>';
          if (statusData[i].status == "success") {
            str += '<td style="text-align:center;">-</td>';
          } else {
            str += '<td><span style="color:' + color + ';text-center; word-break: break-all;">' + statusData[i].error + '</span></td>';
          }
          str += '<tr>';
        }
        $("#responseData").html(str);
        var error =
          $("#statusData").modal();
      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else if (resp.responseCode == 800) {
        $('.page-loader-wrapper').hide();
        console.log(resp.bookingFormSavedStatuses);
        console.log(resp.bookingFormSavedStatuses[0].error);
        swal(resp.bookingFormSavedStatuses[0].error[0]);
        return false;
      } else {
        $('.page-loader-wrapper').hide();
        swal(resp.bookingFormSavedStatuses[0].error[0]);
        return false;
      }
    },
      error => {
        //  alert(error.status);
        $('.page-loader-wrapper').hide();
        if (error.status == 400) {
          swal("Error!", "Please check the data in excel sheet", "error");
          return false;
        } else {
          swal("Error!", "Internal server error.", "error");
          return false;
          console.log(error);
        }


      }
    );
  }

  homeClick() {
    // this.router.navigate(['leave-update']);
    this.router.navigate(['dashboard']);
  }
}
