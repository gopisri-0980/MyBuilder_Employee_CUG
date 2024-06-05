import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { HttpClient } from "@angular/common/http";
import { CommonComponent } from '../common/common.component';
//import { Router } from "@angular/router";
import 'rxjs/add/operator/map';
import { ActivatedRoute, Router, RoutesRecognized } from "@angular/router";

import { filter, pairwise } from 'rxjs/operators';
import { AlertsComponent } from '../ui/alerts/alerts.component';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdatedCustomerService } from './updated-customer.service';



//import { getMaxListeners } from 'cluster';
declare const $: any;
declare const swal: any

var selected_projectid;
var site_name;
var selected_blockid;
var selected_flatid;
var selected_unitno;
var first_perment_countryid;
var first_perment_country_name;
var first_perment_cityid;
var first_perment_city_name;
var first_perment_stateid;
var first_perment_state_name;

var first_perment_countryid1;
var first_perment_country_name1;
var first_perment_cityid1;
var first_perment_city_name1;
var first_perment_stateid1;
var first_perment_state_name1;
var first_marrital_statusdata;

var second_perment_countryid;
var second_perment_country_name;
var second_perment_cityid;
var second_perment_city_name;
var second_perment_stateid;
var second_perment_state_name;

var second_perment_countryid1;
var second_perment_country_name1;
var second_perment_cityid1;
var second_perment_city_name1;
var second_perment_stateid1;
var second_perment_state_name1;
var second_marrital_statusdata;
var third_marrital_statusdata;

var third_perment_countryid;
var third_perment_country_name;
var third_perment_cityid;
var third_perment_city_name;
var third_perment_stateid;
var third_perment_state_name;

var third_perment_countryid1;
var third_perment_country_name1;
var third_perment_cityid1;
var third_perment_city_name1;
var third_perment_stateid1;
var third_perment_state_name1;
var third_marrital_statusdata;
var unit_projectname_id;
var unit_project_name;
var unit_blockname_id;
var unit_block_name;
var unit_floorname_id;
var unit_floorname_name;
var unit_flatname_id;
var unit_flatname_name;
var unit_schema_id;
var unit_schema_name;

var customerBookingFormInfoList = [];
var total_controller_ami = 0;

var old_flatbooking_id;
var old_flatbooking_name;
var Total_cost_exclude_gst;
var Total_cost_exclude_gst_txt;
var Total_gst_amount;
var Total_gst_amount_txt;
var first_city_bck_val;
var first_city_bck_text;
var first_state_bck_val;
var first_state_bck_text;
var first_country_back_val;
var first_country_back_text;
var changeradiobutton_val;
var custPermanentAddress;
var custCorespondingAddress;
var secondApplicantPermanentAddress;
var secondApplicantcorespondedAddress;
var thirdApplicantPermanentAddress;
var thirdApplicantcorespondedAddress;
var unitDetails;
var KYDDetails;
var search_projectid;
var search_customer_name;
var bookingForData;
var flatbooking_Id;
var customer_Id;
var POAHolderDetails;
var secondApplicantInfo;
var thirdApplicantInfo;
@Component({
  selector: 'app-updated-customer',
  templateUrl: './updated-customer.component.html',
  styleUrls: ['./updated-customer.component.sass']
})
export class UpdatedCustomerComponent implements OnInit {
  @Input() fieldvalue = '';
  @Input() ratepersqftvalue = '';
  @Input() aminititesinfra = '';
  @Input() total_agreement_cost = '';

  [x: string]: any;
  tabList: Array<any> = [];
  Checkbox_list: Array<any> = [];
  first_mr: any;
  dob_first: any;
  sof_first: any;
  first_marrital_status: any;
  doa_first: any;
  Permanent_first: any;
  first_City: any;
  first_State: any;
  first_pincode: any;
  first_Correspondence: any;
  first_City1: any;
  first_State1: any;
  first_pincode1: any;
  first_tel: any;
  first_mobile: any;
  first_email: any;
  pan_no_first: any;
  nationality_first: any;
  aadhaar_no_first: any;
  first_designation: any;
  first_name_of_organisation: any;
  first_address_of_organisation: any;
  first_office_number: any;
  first_office_email_id: any;
  first_organizational_type: any;
  first_industry_sector_of_work: any;
  first_work_function_role: any;
  first_number_of_years: any;
  first_education_qualification: any;
  first_annual_household: any;
  first_how_did_get_to_know: any;
  first_purpose_of_purchase: any;
  first_current_residential_status: any;
  first_name_of_poa_holder: any;
  first_tel_bck: any;
  first_mobile_number_bck: any;
  first_email_bck: any;
  first_address_back: any;
  first_city_bck: any;
  first_state_bck: any;
  first_pincode_bck: any;
  second_mrs: any;
  second_dob: any;
  second_wof: any;
  second_Marrital_status: any;
  second_permanent: any;
  second_city: any;
  second_State: any;
  second_pincode: any;
  second_Correspondence: any;
  second_City1: any;
  second_State1: any;
  second_pincode1: any;
  second_mobile: any;
  second_email: any;
  second_pan_no: any;
  second_nationality: any;
  second_aadhaar_no: any;
  second_Designation: any;
  second_name_of_organisation: any;
  second_of_organisation: any;
  second_office_number: any;
  second_office_emailid: any;
  Second_Organisation_type: any;
  second_Industry_sector: any;
  second_work_function_role: any;
  second_number_of_years: any;
  second_education_qualification: any;
  second_Annual_household: any;
  Third_mr: any;
  Third_dob: any;
  third_marrital_status: any;
  third_permanent: any;
  third_City: any;
  third_State: any;
  third_pincode: any;
  third_correspondence: any;
  third_City1: any;
  third_State1: any;
  Third_tel: any;
  Third_Mobile: any;
  Third_email: any;
  Third_Nationality: any;
  Third_aadhaar_no: any;
  Third_designation: any;
  Third_Name_of_organisation: any;
  Third_Address_of_Organisation: any;
  Third_Office_number: any;
  Third_office_email_id: any;
  Third_Organization_type: any;
  Third_Industry_sector_of_work: any;
  Third_work_function_role: any;
  Third_Number_of_years: any;
  Third_Education_Qualification: any;
  Third_Annual_household: any;
  unitno: any;
  sbua_unit: any;
  carpet_area_unit: any;
  unit_floor: any;
  Rate_per_sqft_unit: any;
  unit_block: any;
  car_parking_unit: any;
  unit_basic_flat_cost: any;
  unit_amenities_cost: any;
  unit_total_cost: any;
  unit_total_gst_amount: any;
  unit_total_agreement_cost: any;
  unit_Rupees_in_words: any;
  unit_eoi_applicable: any;
  unit_eoi_sequence_number: any;
  unit_experience_with_sumadhura: any;
  booking_saleshead_appname: any;
  booking_saleshead_leadid: any;
  booking_saleshead_STM: any;
  booking_saleshead_sourceofbooking: any;
  booking_saleshead_Referal_bonus: any;
  booking_saleshead_offersifany: any;
  booking_saleshead_availability_list: any;
  booking_saleshead_commitments: any;
  booking_saleshead_remarks: any;
  booking_saleshead_signature: any;
  booking_saleshead_date: any;
  booking_saleshead_authorized: any;
  booking_saleshead_authorized_date: any;
  booking_confirm_crm_commitments: any;
  booking_confirm_crm_remarks: any;
  booking_confirm_crm_preferences: any;
  booking_confirm_crm_comment: any;
  booking_confirm_crm_date: any;
  booking_confirm_crm_vefified_by_name: any;
  booking_confirm_crm_emailid: any;
  booking_confirm_crm_signature: any;
  booking_confirm_crm_authorized_sig: any;
  booking_confirm_crm_authorized_date: any;
  Agreement_banker_name: any;
  Agreement_bank: any;
  Agreement_contact: any;
  Agreement_banker_email: any;
  Agreement_offersifany: any;
  Agreement_comments: any;
  Agreement_legal_officer: any;
  Agreement_empid: any;
  Agreement_date: any;
  Agreement_signator: any;
  Agreement_auth_date: any;
  registation_project: any;
  registation_flatno: any;
  registation_agvalue: any;
  registation_sdvalue: any;
  registation_comments_from_legal: any;
  registation_comments_from_accounts: any;
  registation_legal_officer_signature: any;
  registation_Emp_id: any;
  registation_Date: any;
  registation_accounts_executive_signature: any;
  registation_emp_id: any;
  registation_date: any;
  registation_authorized_signatory: any;
  registation_auth_Date: any;

  kyc_controller: Array<any> = [];
  state_controller: any;
  selection: any;
  aminitiesList_controller: any;
  sbua: any;
  carpetArea: any;
  hideme: boolean = false;
  hideme_three: boolean = false;
  controller_data: Array<any> = [];
  unit_project: any;
  secondform_validation: any;
  thirdform_validation: any;
  first_namePrefix: any;
  first_Relation_with: any;
  first_relationnamePrefix: any;
  first_relation_name: any;
  first_country: any;
  first_country1: any;
  second_namePrefix: any;
  second_Relation_with: any;
  second_relationnamePrefix: any;
  second_relation_name: any;
  second_Country: any;
  second_Country1: any;
  second_tel: any;
  doa_second: any;
  third_namePrefix: any;
  third_Relation_with: any;
  third_relationnamePrefix: any;
  third_relation_name: any;
  Third_Country: any;
  Third_Country1: any;
  third_pincode1: any;
  Scheme_name: any;
  second_City: any;
  item_data: Array<any> = [];
  booking_main_id: any;
  registration_date_first_applicant: any;
  handing_over_date_first_applicant: any;

  disableread: boolean[] = [];

  urls: Array<any> = [];
  mbytesarray_cam: any = []
  imageuploadfile: any = [];
  totmb_cam: any = 0;
  ortitle: boolean = true;
  file_name_array_temp: Array<any> = [];

  filenameval: any;
  file_name_array: any = [];
  base64_array_object_data: any = [];
  mbytesarray: any = []

  controller_main_dev: Array<any> = [];



  constructor(private cmn: CommonComponent, private http: Http, private formBuilder: FormBuilder,
    private router: Router, private modalService: NgbModal, private changeDetectorRef: ChangeDetectorRef,
    private service: UpdatedCustomerService,) {


    $('.page-loader-wrapper').hide();

    this.tabList = [
      'KYC DOCUMENTS (ALL APPLICANTS)',
      'FIRST APPLICANT (MANDATORY)',
      'SECOND APPLICANT (MANDATORY)',
      'THIRD APPLICANT (MANDATORY)',
      'UNIT DETAILS',
      'PAYMENT SCHEDULE',
      // 'TERMS AND CONDITIONS',
      // 'BOOKING CONFIRMATION CHECKLIST-SALES HEAD',
      // 'BOOKING CONFIRMATION CHECKLIST-CRM',
      // 'AGREEMENT CHECKLIST-LEGAL OFFICER',
      // 'REGISTRATION CHECKLIST'
    ];

    this.item_data = [
      {
        key: 'yes',
        value: 'yes',
        checked: '',
      }, {
        key: 'no',
        value: 'no',
        checked: '',
      }
    ];



  }




  ngOnInit() {

    var self = this;
    $(function () {

      
      $("#passport_no_first").each(function (index, element) {
        $(this).bind('keyup', function (event) {
          var regex = new RegExp("^[A-Z]{1}[0-9]{7}$");
          var value = event.currentTarget.value;
          if (!regex.test(value)) {
            $(this).next(".box-infoes").find(".error").css("display", "block");

          } else {
            $(this).next(".box-infoes").find(".error").css("display", "none")
          }

        });
      });


      $("#passport_no_second").each(function (index, element) {
        $(this).bind('keyup', function (event) {
          var regex = new RegExp("^[A-Z]{1}[0-9]{7}$");
          var value = event.currentTarget.value;
          if (!regex.test(value)) {
            $(this).next(".box-infoes").find(".error").css("display", "block");

          } else {
            $(this).next(".box-infoes").find(".error").css("display", "none")
          }

        });
      });



      $("#passport_no_third").each(function (index, element) {
        $(this).bind('keyup', function (event) {
          var regex = new RegExp("^[A-Z]{1}[0-9]{7}$");
          var value = event.currentTarget.value;
          if (!regex.test(value)) {
            $(this).next(".box-infoes").find(".error").css("display", "block");

          } else {
            $(this).next(".box-infoes").find(".error").css("display", "none")
          }

        });
      });

    

      $("#search_projectID").select2({
        placeholder: "--Select--",
        dir: "ltl",
      });

      $("#customername").select2({
        placeholder: "--Select--",
        dir: "ltl",
      });


      $("#first_marrital_status").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });

      $("#second_Marrital_status").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });

      $("#third_marrital_status").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });

      $("#first_City").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });

      $("#second_City").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });

      $("#third_City").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });

      $("#first_State").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });

      $("#second_State").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });

      $("#third_State").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });

      $("#first_City1").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });

      $("#second_City1").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });

      $("#third_City1").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });

      $("#first_State1").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });

      $("#second_State1").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });

      $("#third_State1").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });

      $("#first_City2").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });

      $("#first_State2").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });

      $("#second_City2").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });

      $("#second_State2").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });

      $("#third_City2").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });

      $("#third_State2").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });

      $("#unit_floor").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });

      $("#unit_block").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });

      $("#bank").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });

      $("#registation_project").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });

      $("#flatno").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });

      $("#first_state_bck").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });

      $("#unit_project").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });

      // $("#unitno").select2({
      //   placeholder: "--Select--",
      //   dir: "ltl"
      // });

      $("#first_country").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });


      $("#first_country1").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });

      $("#first_country_back").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });

      $("#first_city_bck").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });

      $("#second_Country").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });
      $("#second_Country1").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });

      $("#Third_Country").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });

      $("#Third_Country1").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });

      $("#first_namePrefix").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });

      $("#first_Relation_with").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });

      $("#first_relationnamePrefix").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });


      $("#second_namePrefix").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });


      $("#second_namePrefix").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });

      $("#second_Relation_with").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });

      $("#second_relationnamePrefix").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });

      $("#third_namePrefix").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });

      $("#third_Relation_with").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });

      $("#third_relationnamePrefix").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });

      $("#Scheme_name").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });

      $("#unit_oldbooking_name").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });



    });




    var self = this;
    $(function () {

      $('#first_city_bck').change(function (e) {
        first_city_bck_val = $(e.target).val();
        first_city_bck_text = $('#first_city_bck').select2('data')[0].text;
      });

      $('#first_state_bck').change(function (e) {
        first_state_bck_val = $(e.target).val();
        first_state_bck_text = $('#first_state_bck').select2('data')[0].text;

        self.citysList(first_state_bck_val, 'first_back');

      });

      $('#first_country_back').change(function (e) {
        first_country_back_val = $(e.target).val();
        first_country_back_text = $('#first_country_back').select2('data')[0].text;

        self.state_list(first_country_back_val, 'first_back');

      });

      $('#unit_oldbooking_name').change(function (e) {
        old_flatbooking_id = $(e.target).val();
        old_flatbooking_name = $('#unit_oldbooking_name').select2('data')[0].text;
      });

      $('#Scheme_name').change(function (e) {

        console.log($('#Scheme_name').select2('data')[0].text);

        if ($('#Scheme_name').select2('data')[0].text == "--Select--") {
          $("#aaa_unit").hide();
        } else if ($('#Scheme_name').select2('data')[0].text == "Regular") {
          $("#aaa_unit").hide();

        } else if ($('#Scheme_name').select2('data')[0].text == "AAA") {
          $("#aaa_unit").show();
        }



        unit_schema_id = $(e.target).val();
        unit_schema_name = $('#Scheme_name').select2('data')[0].text;


        if ($("#unit_total_cost_exclude_gst").val() != "") {
          const num1 = parseFloat($("#unit_total_cost_exclude_gst").val());
          const num2 = parseFloat(unit_schema_id);
          const sum = (num1 * num2 / 100).toFixed(2);
          $("#unit_total_gst_amount").val(sum);
        }

        if ($("#sbua_unit").val() != "" && $("#unit_total_gst_amount").val() != "") {
          const gstamount = parseFloat($("#unit_total_gst_amount").val());
          const suba = parseFloat($("#sbua_unit").val());
          const basicsum = (gstamount / suba).toFixed(2);
          $("#unit_taxesPerSft").val(basicsum);
        }





        if ($("#unit_total_cost_exclude_gst").val() != "" && $("#unit_total_gst_amount").val() != "") {
          const num1 = parseFloat($("#unit_total_cost_exclude_gst").val());
          const num2 = parseFloat($("#unit_total_gst_amount").val());
          const sum = (num1 + num2).toFixed(2);
          $("#unit_total_cost").val(sum);
          const num1_val = parseFloat($("#unit_total_cost").val());
          const num2_val = parseFloat($("#sbua_unit").val());
          const sum_val = (num1_val / num2_val).toFixed(2);
          $("#unit_actualPricePerSft").val(sum_val);
          $("#unit_overallPricePerSft").val(sum_val);
        }

        if ($("#unit_total_cost_exclude_gst").val() != "" && $("#unit_total_cost_exclude_gst").val() != 'select' && $("#unit_total_cost_exclude_gst").val() != null) {
          const num1 = parseFloat($("#unit_total_gst_amount").val());
          const num2 = parseFloat($("#unit_total_cost_exclude_gst").val());
          const sum = (num1 + num2).toFixed(2);
          $("#unit_total_agreement_cost").val(sum);

          const numWords = require('num-words')
          const amountInWords = numWords(sum)
          $("#unit_Rupees_in_words").val(amountInWords);
          $("#unit_overallPricePerSft").val(sum);

        }



      })




      $('#unit_project').change(function (e) {
        unit_projectname_id = $(e.target).val();
        unit_project_name = $('#unit_project').select2('data')[0].text;

      })

      $('#unit_block').change(function (e) {
        unit_blockname_id = $(e.target).val();
        unit_block_name = $('#unit_block').select2('data')[0].text;

      })

      $('#unit_floor').change(function (e) {
        unit_floorname_id = $(e.target).val();
        unit_floorname_name = $('#unit_floor').select2('data')[0].text;

      })

      // $('#unitno').change(function (e) {
      //   selected_unitno = $(e.target).val();

      //   if (selected_unitno == "select") {
      //     // swal("please select the block");
      //   } else {
      //     self.unitnochangeFun(selected_unitno);
      //   }
      // })

      $('#unitno').change(function (e) {
        selected_unitno = $(e.target).val();
        unit_flatname_id = $(e.target).val();
        unit_flatname_name = $('#unitno').select2('data')[0].text;

        console.log(unit_flatname_id);
        console.log(unit_flatname_name);

        if (unit_flatname_id == "select") {
          $("#unit_booking_date").val("");
          $("#unit_Agreement_date").val("");

          $("#unit_oldbooking_name").val(['select']);
          $("#unit_oldbooking_name").trigger('change');



          $("#unit_new_booking_reason").val("");
          $("#carpet_area_unit").val("");
          $("#sbua_unit").val("");

          $("#Scheme_name").val(['select']);
          $("#Scheme_name").trigger('change');



          $("#unit_quoted_base_price").val("");
          $("#Rate_per_sqft_unit").val("");
          $("#unit_basic_flat_cost").val("");
          $("#unit_amenitiesFlatCost").val("");
          $("#unit_total_cost_exclude_gst").val("");
          $("#unit_total_gst_amount").val("");
          $("#unit_taxesPerSft").val("");
          $("#unit_total_cost").val("");
          $("#unit_actualPricePerSft").val("");
          $("#unit_total_agreement_cost").val("");
          $("#unit_Rupees_in_words").val("");
          $("#unit_overallPricePerSft").val("");
          $("#unit_group").val("");
          $("#unit_eoi_applicable").val("");
          $("#unit_eoi_sequence_number").val("");
          $("#unit_experience_with_sumadhura").val("");

        } else {
          $("#unit_booking_date").val("");
          $("#unit_Agreement_date").val("");

          $("#unit_oldbooking_name").val(['select']);
          $("#unit_oldbooking_name").trigger('change');



          $("#unit_new_booking_reason").val("");
          //  $("#carpet_area_unit").val("");
          //  $("#sbua_unit").val("");

          $("#Scheme_name").val(['select']);
          $("#Scheme_name").trigger('change');



          $("#unit_quoted_base_price").val("");
          $("#Rate_per_sqft_unit").val("");
          $("#unit_basic_flat_cost").val("");
          $("#unit_amenitiesFlatCost").val("");
          $("#unit_total_cost_exclude_gst").val("");
          $("#unit_total_gst_amount").val("");
          $("#unit_taxesPerSft").val("");
          $("#unit_total_cost").val("");
          $("#unit_actualPricePerSft").val("");
          $("#unit_total_agreement_cost").val("");
          $("#unit_Rupees_in_words").val("");
          $("#unit_overallPricePerSft").val("");
          $("#unit_group").val("");
          $("#unit_eoi_applicable").val("");
          $("#unit_eoi_sequence_number").val("");
          $("#unit_experience_with_sumadhura").val("");
          self.unitnochangeFun(selected_unitno);
        }




      })




      $('#first_marrital_status').change(function (e) {
        first_marrital_statusdata = $(e.target).val();
      })

      $("#second_Marrital_status").change(function (e) {
        second_marrital_statusdata = $(e.target).val();
      })

      $("#third_marrital_status").change(function (e) {
        third_marrital_statusdata = $(e.target).val();
      })





      $('#first_country').change(function (e) {
        first_perment_countryid = $(e.target).val();
        first_perment_country_name = $('#first_country').select2('data')[0].text;

        console.log(first_perment_countryid);
        console.log(first_perment_country_name);

        self.state_list(first_perment_countryid, 'first');

      })


      $('#first_City').change(function (e) {
        first_perment_cityid = $(e.target).val();
        first_perment_city_name = $('#first_City').select2('data')[0].text;
      })

      $('#first_State').change(function (e) {
        first_perment_stateid = $(e.target).val();
        first_perment_state_name = $('#first_State').select2('data')[0].text;

        self.citysList(first_perment_stateid, 'first');

      })


      $('#first_country1').change(function (e) {
        first_perment_countryid1 = $(e.target).val();
        first_perment_country_name1 = $('#first_country1').select2('data')[0].text;

        self.state_list(first_perment_countryid1, 'first1');

      })


      $('#first_City1').change(function (e) {
        first_perment_cityid1 = $(e.target).val();
        first_perment_city_name1 = $('#first_City1').select2('data')[0].text;
      })

      $('#first_State1').change(function (e) {
        first_perment_stateid1 = $(e.target).val();
        first_perment_state_name1 = $('#first_State1').select2('data')[0].text;

        self.citysList(first_perment_stateid1, 'first1');

      })



      $('#second_Country').change(function (e) {
        second_perment_countryid = $(e.target).val();
        second_perment_country_name = $('#second_Country').select2('data')[0].text;
        self.state_list(second_perment_countryid, 'second');
      })


      $('#second_City').change(function (e) {
        second_perment_cityid = $(e.target).val();
        second_perment_city_name = $('#second_City').select2('data')[0].text;
      })

      $('#second_State').change(function (e) {
        second_perment_stateid = $(e.target).val();
        second_perment_state_name = $('#second_State').select2('data')[0].text;

        self.citysList(second_perment_stateid, 'second');

      })


      $('#second_Country1').change(function (e) {
        second_perment_countryid1 = $(e.target).val();
        second_perment_country_name1 = $('#second_Country1').select2('data')[0].text;

        self.state_list(second_perment_countryid1, 'second1');

      })


      $('#second_City1').change(function (e) {
        second_perment_cityid1 = $(e.target).val();
        second_perment_city_name1 = $('#first_City1').select2('data')[0].text;
      })

      $('#second_State1').change(function (e) {
        second_perment_stateid1 = $(e.target).val();
        second_perment_state_name1 = $('#second_State1').select2('data')[0].text;

        self.citysList(second_perment_stateid1, 'second1');

      })





      $('#Third_Country').change(function (e) {
        third_perment_countryid = $(e.target).val();
        third_perment_country_name = $('#Third_Country').select2('data')[0].text;

        self.state_list(third_perment_countryid, 'third');
      })


      $('#third_City').change(function (e) {
        third_perment_cityid = $(e.target).val();
        third_perment_city_name = $('#second_City').select2('data')[0].text;
      })

      $('#third_State').change(function (e) {
        third_perment_stateid = $(e.target).val();
        third_perment_state_name = $('#second_State').select2('data')[0].text;

        self.citysList(third_perment_stateid, 'third');

      })


      $('#Third_Country1').change(function (e) {
        third_perment_countryid1 = $(e.target).val();
        third_perment_country_name1 = $('#Third_Country1').select2('data')[0].text;
        self.state_list(third_perment_countryid1, 'third1');
      })


      $('#third_City1').change(function (e) {
        third_perment_cityid1 = $(e.target).val();
        third_perment_city_name1 = $('#first_City1').select2('data')[0].text;
      })

      $('#third_State1').change(function (e) {
        third_perment_stateid1 = $(e.target).val();
        third_perment_state_name1 = $('#third_State1').select2('data')[0].text;

        self.citysList(third_perment_stateid1, 'third1');

      })


      $('#unit_project').change(function (e) {
        selected_projectid = $(e.target).val();
        site_name = $('#unit_project').select2('data')[0].text;
        if (selected_projectid == "select") {

        } else {
          self.projectchangeFun(selected_projectid);
          self.get_oldsalesforesbg(selected_projectid);
          self.Scheme_Name(selected_projectid);
        }
      })

      $('#unit_block').change(function (e) {
        selected_blockid = $(e.target).val();
        if (selected_blockid == "select") {
          // swal("please select the block");
        } else {
          self.blockchangeFun(selected_projectid, selected_blockid);
        }
      })

      $('#unit_floor').change(function (e) {
        selected_flatid = $(e.target).val();

        if (selected_flatid == "select") {
          // swal("please select the block");
        } else {
          self.floorchangeFun(selected_projectid, selected_blockid, selected_flatid);
        }
      })


      $('#search_projectID').change(function (e) {
        search_projectid = $(e.target).val();

        if (search_projectid == "select") {
          // swal("please select the block");
        } else {
          self.customerautofield(search_projectid);
        }
      })

      $('#customername').change(function (e) {




        if (search_customer_name == "select") {
          search_customer_name = null;
        } else {
          search_customer_name = $(e.target).val();

          customer_Id = search_customer_name.split("&&")[1];
          flatbooking_Id = search_customer_name.split("&&")[0];



        }
      })


      // $('#unitno').change(function (e) {
      //   selected_unitno = $(e.target).val();

      //   if (selected_unitno == "select") {
      //     // swal("please select the block");
      //   } else {
      //     self.unitnochangeFun(selected_unitno);
      //   }
      // })

      $('#unitno').change(function (e) {
        selected_unitno = $(e.target).val();
        unit_flatname_id = $(e.target).val();
        unit_flatname_name = $('#unitno').select2('data')[0].text;

        console.log(unit_flatname_id);
        console.log(unit_flatname_name);

        if (unit_flatname_id == "select") {
          $("#unit_booking_date").val("");
          $("#unit_Agreement_date").val("");

          $("#unit_oldbooking_name").val(['select']);
          $("#unit_oldbooking_name").trigger('change');



          $("#unit_new_booking_reason").val("");
          $("#carpet_area_unit").val("");
          $("#sbua_unit").val("");

          $("#Scheme_name").val(['select']);
          $("#Scheme_name").trigger('change');



          $("#unit_quoted_base_price").val("");
          $("#Rate_per_sqft_unit").val("");
          $("#unit_basic_flat_cost").val("");
          $("#unit_amenitiesFlatCost").val("");
          $("#unit_total_cost_exclude_gst").val("");
          $("#unit_total_gst_amount").val("");
          $("#unit_taxesPerSft").val("");
          $("#unit_total_cost").val("");
          $("#unit_actualPricePerSft").val("");
          $("#unit_total_agreement_cost").val("");
          $("#unit_Rupees_in_words").val("");
          $("#unit_overallPricePerSft").val("");
          $("#unit_group").val("");
          $("#unit_eoi_applicable").val("");
          $("#unit_eoi_sequence_number").val("");
          $("#unit_experience_with_sumadhura").val("");

        } else {
          $("#unit_booking_date").val("");
          $("#unit_Agreement_date").val("");

          $("#unit_oldbooking_name").val(['select']);
          $("#unit_oldbooking_name").trigger('change');



          $("#unit_new_booking_reason").val("");
          //  $("#carpet_area_unit").val("");
          //  $("#sbua_unit").val("");

          $("#Scheme_name").val(['select']);
          $("#Scheme_name").trigger('change');



          $("#unit_quoted_base_price").val("");
          $("#Rate_per_sqft_unit").val("");
          $("#unit_basic_flat_cost").val("");
          $("#unit_amenitiesFlatCost").val("");
          $("#unit_total_cost_exclude_gst").val("");
          $("#unit_total_gst_amount").val("");
          $("#unit_taxesPerSft").val("");
          $("#unit_total_cost").val("");
          $("#unit_actualPricePerSft").val("");
          $("#unit_total_agreement_cost").val("");
          $("#unit_Rupees_in_words").val("");
          $("#unit_overallPricePerSft").val("");
          $("#unit_group").val("");
          $("#unit_eoi_applicable").val("");
          $("#unit_eoi_sequence_number").val("");
          $("#unit_experience_with_sumadhura").val("");
          self.unitnochangeFun(selected_unitno);
        }




      })

    });

    this.deptid = sessionStorage.getItem("session_deptid");
    this.roleid = sessionStorage.getItem("session_roleId");


    this.siteList_search();




  }


  unit_discount_keyFunc(event) {
    if (event.which === 32 && event.target.selectionStart === 0) {
      return false;
    } else {
      const pattern = /^[^0-9.]*$/;
      const inputChar = String.fromCharCode(event.charCode);
      if (event.keyCode !== 8 && !pattern.test(inputChar)) {
        event.preventDefault();
      }
    }

    console.log($("#unit_amenitiesFlatCost").val());
    console.log($("#unit_basic_flat_cost").val());
    console.log($("#unit_discount").val());
    console.log($("#unit_AAA").val());


    if ($("#unit_amenitiesFlatCost").val() != "" && $("#unit_basic_flat_cost").val() != "" && event != "") {
      const aminitycost = parseFloat($("#unit_amenitiesFlatCost").val());
      const basicflatcost = parseFloat($("#unit_basic_flat_cost").val());
      const basic_discount = parseFloat(event);
      if ($("#unit_AAA").val() != "") {
        this.basic_aaa = parseFloat($("#unit_AAA").val());
      } else {
        this.basic_aaa = 0;
      }
      const basicsum = (aminitycost + basicflatcost + this.basic_aaa).toFixed(2);
      console.log(basicsum);
      const total_discount = basicsum - parseFloat(event);

      console.log(total_discount);
      $("#unit_total_cost_exclude_gst").val(total_discount);
    }

    if ($("#unit_amenitiesFlatCost").val() != "" && $("#unit_basic_flat_cost").val() != "" && event == "") {
      const aminitycost = parseFloat($("#unit_amenitiesFlatCost").val());
      const basicflatcost = parseFloat($("#unit_basic_flat_cost").val());
      const basic_discount = 0;
      if ($("#unit_AAA").val() != "") {
        this.basic_aaa = parseFloat($("#unit_AAA").val());
      } else {
        this.basic_aaa = 0;
      }
      const basicsum = (aminitycost + basicflatcost + this.basic_aaa).toFixed(2);
      const total_discount = basicsum - 0;
      $("#unit_total_cost_exclude_gst").val(total_discount);
    }


    console.log(unit_schema_id);
    if ($("#unit_total_cost_exclude_gst").val() != "") {
      const num1 = parseFloat($("#unit_total_cost_exclude_gst").val());
      const num2 = parseFloat(unit_schema_id);
      const sum = (num1 * num2 / 100).toFixed(2);
      $("#unit_total_gst_amount").val(sum);
    }

    if ($("#sbua_unit").val() != "" && $("#unit_total_gst_amount").val() != "") {
      const gstamount = parseFloat($("#unit_total_gst_amount").val());
      const suba = parseFloat($("#sbua_unit").val());
      const basicsum = (gstamount / suba).toFixed(2);
      $("#unit_taxesPerSft").val(basicsum);
    }



    if ($("#unit_total_cost_exclude_gst").val() != "" && $("#unit_total_gst_amount").val() != "") {
      const num1 = parseFloat($("#unit_total_cost_exclude_gst").val());
      const num2 = parseFloat($("#unit_total_gst_amount").val());
      const sum = (num1 + num2).toFixed(2);
      $("#unit_total_cost").val(sum);
    }

    setTimeout(() => {
      if ($("#unit_total_cost").val() != "" && $("#sbua_unit").val() != "") {
        const num1 = parseFloat($("#unit_total_cost").val());
        const num2 = parseFloat($("#sbua_unit").val());

        console.log(num1);
        console.log(num2);

        const sum = (num1 / num2).toFixed(2);
        $("#unit_actualPricePerSft").val(sum);
        $("#unit_overallPricePerSft").val(sum);
      }
    }, 1000);


    if ($("#unit_total_cost_exclude_gst").val() != "" && $("#unit_total_cost_exclude_gst").val() != 'select' && $("#unit_total_cost_exclude_gst").val() != null) {
      const num1 = parseFloat($("#unit_total_gst_amount").val());
      const num2 = parseFloat($("#unit_total_cost_exclude_gst").val());
      const sum = (num1 + num2).toFixed(2);
      $("#unit_total_agreement_cost").val(sum);
      //  $("#unit_overallPricePerSft").val(sum);


      const numWords = require('num-words')
      const amountInWords = numWords(parseInt(sum))
      $("#unit_Rupees_in_words").val(amountInWords);


    }


  }

  unit_aaa_keyFunc(event) {
    console.log(event);
    if (event.which === 32 && event.target.selectionStart === 0) {
      return false;
    } else {
      const pattern = /^[^0-9.]*$/;
      const inputChar = String.fromCharCode(event.charCode);
      if (event.keyCode !== 8 && !pattern.test(inputChar)) {
        event.preventDefault();
      }
    }

    console.log($("#unit_amenitiesFlatCost").val());
    console.log($("#unit_basic_flat_cost").val());
    console.log(event);


    if ($("#unit_amenitiesFlatCost").val() != "" && $("#unit_basic_flat_cost").val() != "" && event != "") {
      const aminitycost = parseFloat($("#unit_amenitiesFlatCost").val());
      const basicflatcost = parseFloat($("#unit_basic_flat_cost").val());
      const basic_aaa = parseFloat(event);
      const basicsum = (aminitycost + basicflatcost + basic_aaa).toFixed(2);
      $("#unit_total_cost_exclude_gst").val(basicsum);
    }

    if ($("#unit_amenitiesFlatCost").val() != "" && $("#unit_basic_flat_cost").val() != "" && event == "") {
      const aminitycost = parseFloat($("#unit_amenitiesFlatCost").val());
      const basicflatcost = parseFloat($("#unit_basic_flat_cost").val());
      const basic_aaa = 0;
      const basicsum = (aminitycost + basicflatcost + basic_aaa).toFixed(2);
      $("#unit_total_cost_exclude_gst").val(basicsum);
    }


    console.log(unit_schema_id);
    if ($("#unit_total_cost_exclude_gst").val() != "") {
      const num1 = parseFloat($("#unit_total_cost_exclude_gst").val());
      const num2 = parseFloat(unit_schema_id);
      const sum = (num1 * num2 / 100).toFixed(2);
      $("#unit_total_gst_amount").val(sum);
    }

    if ($("#sbua_unit").val() != "" && $("#unit_total_gst_amount").val() != "") {
      const gstamount = parseFloat($("#unit_total_gst_amount").val());
      const suba = parseFloat($("#sbua_unit").val());
      const basicsum = (gstamount / suba).toFixed(2);
      $("#unit_taxesPerSft").val(basicsum);
    }



    if ($("#unit_total_cost_exclude_gst").val() != "" && $("#unit_total_gst_amount").val() != "") {
      const num1 = parseFloat($("#unit_total_cost_exclude_gst").val());
      const num2 = parseFloat($("#unit_total_gst_amount").val());
      const sum = (num1 + num2).toFixed(2);
      $("#unit_total_cost").val(sum);
    }

    setTimeout(() => {
      if ($("#unit_total_cost").val() != "" && $("#sbua_unit").val() != "") {
        const num1 = parseFloat($("#unit_total_cost").val());
        const num2 = parseFloat($("#sbua_unit").val());

        console.log(num1);
        console.log(num2);

        const sum = (num1 / num2).toFixed(2);
        $("#unit_actualPricePerSft").val(sum);
        $("#unit_overallPricePerSft").val(sum);
      }
    }, 1000);


    if ($("#unit_total_cost_exclude_gst").val() != "" && $("#unit_total_cost_exclude_gst").val() != 'select' && $("#unit_total_cost_exclude_gst").val() != null) {
      const num1 = parseFloat($("#unit_total_gst_amount").val());
      const num2 = parseFloat($("#unit_total_cost_exclude_gst").val());
      const sum = (num1 + num2).toFixed(2);
      $("#unit_total_agreement_cost").val(sum);
      //  $("#unit_overallPricePerSft").val(sum);


      const numWords = require('num-words')
      const amountInWords = numWords(parseInt(sum))
      $("#unit_Rupees_in_words").val(amountInWords);


    }


  }

  /*-----------------Getting Project(site) list Start---------------------*/
  siteList_search() {
    var arr = localStorage.getItem('SiteIDS_singlepage');

    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "site/site.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteIds": JSON.parse(arr).map(String)
    }
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {


      $('.page-loader-wrapper').hide();


      if (resp.responseCode == 200) {
        $('#search_projectID').html("");
        $('#search_projectID').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#search_projectID').append("<option value='" + resp.responseObjList[i].id + "'>" + resp.responseObjList[i].name + "</option>");
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
  /*-----------------Getting Customer Names list Start---------------------*/
  customerautofield(SiteIDS) {
    $(".page-loader-wrapper").show();
    this.service.GetCustomernamefun(sessionStorage.getItem("login_sessionkey"), "", SiteIDS).then(resp => {


      $(".page-loader-wrapper").hide();

      if (resp.responseCode == 200) {
        $('#customername').html("");
        $('#customername').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.referedCustomer.length; i++) {
          $('#customername').append("<option value='" + resp.responseObjList.referedCustomer[i].flatBookingId + '&&' + resp.responseObjList.referedCustomer[i].custId + "'>" + resp.responseObjList.referedCustomer[i].siteNameCustomerFlatNo + "</option>");
        }

      } else if (resp.responseCode == 440) {
        swal("Error!", "Your session has been expired.", "error");
        this.router.navigate([""]);
      } else {
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
      }
    }, error => {
      $('.page-loader-wrapper').hide();
      var error = JSON.parse(error._body).responseCode;
      if (error == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      }
    }

    )
  }
  /*-----------------Getting Customer Names list end---------------------*/


  search_function() {
    $("#tab_third").hide();
    $("#tab_second").hide();
    $('#second_checkbox').prop('checked', false);
    $('#third_checkbox').prop('checked', false);

    if (search_projectid == "select" || search_projectid == undefined) {
      swal("Please select the project!");
      return false;
    }

    if (search_customer_name == "select" || search_customer_name == undefined) {
      swal("Please select the customer name!");
      return false;
    }




    $('.page-loader-wrapper').show();
    var flatBookingId = flatbooking_Id;
    var cutID = customer_Id;
    let url = this.cmn.commonUrl + "bookingFormService/getBookingDetails.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "customerId": cutID,
      "flatBookingId": flatBookingId,
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "requestUrl": "getBookingDetails"
    }

    console.log(url);
    console.log(JSON.stringify(body));

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();

        this.approveCustData = resp;
        console.log(this.approveCustData)
        // window.sessionStorage.setItem('approveCustData', JSON.stringify(this.approveCustData));
        sessionStorage.setItem('getPageName', "approveCustomerPage");
        // this.router.navigate(['bookingform'],  {state: this.approveCustData});
        this.getBookingFormDetails(JSON.stringify(this.approveCustData));

        //sessionStorage.removeItem('approveCustData');

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

  /*----------------------------Getting booking form details end-----------------------*/

  getBookingFormDetails(userdata) {
    $("#maindiv_hideme").show();
    bookingForData = "";
    bookingForData = JSON.parse(userdata);

    console.log(bookingForData);

    var getpageName = sessionStorage.getItem('getPageName');

    if (getpageName == "approveCustomerPage") {
      this.module = "Customer Registration";
      this.submodule = "Approve Customer";
      this.pagename = "Booking Form";
      this.navigateTo = "/approvedcustomer";
    } else {
      this.module = "View Customers";
      this.submodule = "View All Customers";
      this.pagename = "Customer Details";
      this.navigateTo = "/view-customers"
    }



    KYDDetails = bookingForData.customerKYCSubmitedInfo;

    console.log(KYDDetails);

    this.kyc_controller = bookingForData.customerKYCSubmitedInfo;
    console.log(this.kyc_controller);


    for (var i = 0; i < this.kyc_controller.length; i++) {

      if (this.kyc_controller[i].status == 'true') {
        this.disableread[i] = false;

      } else {
        this.disableread[i] = true;

      }



    }





    // var str = "";
    // for (var kyc = 0; kyc < KYDDetails.length; kyc++) {
    //   var docName = KYDDetails[kyc].docName;
    //   var status = KYDDetails[kyc].status;
    //   var statusForCheck = "";

    //   if (status == "true" || status == true) {
    //     statusForCheck = "checked"
    //   }
    //   str += '<div class="form-check m-l-10">'
    //     + '<label class="form-check-label">'
    //     + '<input class="form-check-input KYCCls"  (change)="changecheckboxStatus(p)" type="checkbox" ' + statusForCheck + ' >'
    //     + docName
    //     + '<span class="form-check-sign"><span class="check"></span></span></label>'
    //     + '</div>'

    // }
    // $("#KYCDiv").html(str);

    var customerInfo = bookingForData.customerInfo;
    this.customerSchemeInfos = bookingForData.customerSchemeInfos;

    if (bookingForData.customerSchemeInfos.length != 0) {
      if (bookingForData.customerSchemeInfos[0].schemeName != null && bookingForData.customerSchemeInfos[0].schemeName != undefined && bookingForData.customerSchemeInfos[0].schemeName != "") {
        unit_schema_name = bookingForData.customerSchemeInfos[0].schemeName;
      }
    }


    $("#first_namePrefix").val(customerInfo.namePrefix);
    $("#first_namePrefix").trigger('change');
    $("#first_mr").val(customerInfo.firstName);

    const date = new Date(customerInfo.dob);
    var d = new Date(date);
    var datestring = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);

    $("#dob_first").val(datestring);
    $("#first_Relation_with").val(customerInfo.relationWith);
    $("#first_Relation_with").trigger('change');
    $("#first_relationnamePrefix").val(customerInfo.relationNamePrefix);
    $("#first_relationnamePrefix").trigger('change');

    $("#first_relation_name").val(customerInfo.relationName);

    $("#doa_first").val();
    $("#aadhaar_no_first").val(customerInfo.adharNumber);
    $("#pan_no_first").val(customerInfo.pancard);

    $("#passport_no_first").val(customerInfo.passport);

    $("#nationality_first").val(customerInfo.nationality);

    var customerBookingInfo = bookingForData.customerBookingInfo;
    var firstAppBookingDetails = bookingForData.customerBookingInfo;
    var customerOtherDetails = bookingForData.customerOtherDetailsInfo;


    $("#first_tel").val(customerBookingInfo.telePhone);
    $("#first_mobile").val(customerBookingInfo.phoneNo);
    $("#first_email").val(customerBookingInfo.email);
    $("#first_marrital_status").val(customerBookingInfo.maritalStatus);
    $("#first_marrital_status").trigger('change');
    const date1 = new Date(customerBookingInfo.dateOfAnniversery);
    var d = new Date(date1);
    var datestring1 = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);

    $("#doa_first").val(datestring1);
    //     if(customerBookingInfo.handingOverDate == null){
    //       $("#hod_first").val("");
    //     }else{
    //       const date2 = new Date(customerBookingInfo.handingOverDate);
    //       var d2 = new Date(date2);
    //       var datestring2 = d2.getFullYear() + "-" + ("0" + (d2.getMonth() + 1)).slice(-2) + "-" + ("0" + d2.getDate()).slice(-2);

    //       $("#hod_first").val(datestring2);
    //     }


    // if(customerBookingInfo.registrationDate == null){
    //   $("#rd_first").val("");
    // }else{
    //   const date3 = new Date(customerBookingInfo.registrationDate);
    //   var d3 = new Date(date3);
    //   var datestring3 = d3.getFullYear() + "-" + ("0" + (d3.getMonth() + 1)).slice(-2) + "-" + ("0" + d3.getDate()).slice(-2);

    //   $("#rd_first").val(datestring3);
    // }




    $("#first_annual_household").val(customerBookingInfo.annualHouseHoldIncome);
    $("#first_number_of_years").val(customerBookingInfo.overallExperienceWithSumadhura);

    $("#first_education_qualification").val(firstAppBookingDetails.educationalQualification);
    $("#first_annual_household").val(firstAppBookingDetails.annualHouseHoldIncome);

    $("#first_purpose_of_purchase").val(customerOtherDetails.purposeofPurchase);
    $("#first_current_residential_status").val(customerOtherDetails.currentResidentialStatus);

    // $("#first_how_did_get_to_know").val(customerOtherDetails.referenceName);


    custPermanentAddress = bookingForData.addressInfos[0];
    custCorespondingAddress = bookingForData.addressInfos[1];

    console.log(custPermanentAddress);

    if (custPermanentAddress.addressMappingType.addressType == "permenent") {
      $("#Permanent_first").val(custPermanentAddress.address1);
      $("#Permanent_first").attr("title", custPermanentAddress.address1);
      setTimeout(() => {

        first_perment_countryid = custPermanentAddress.countryId;
        first_perment_country_name = custPermanentAddress.country;

        first_perment_cityid = custPermanentAddress.cityId;
        first_perment_city_name = custPermanentAddress.city;

        first_perment_stateid = custPermanentAddress.stateId;
        first_perment_state_name = custPermanentAddress.state;


        $("#first_country").val(custPermanentAddress.countryId);
        this.state_list(custPermanentAddress.countryId, 'first');

        this.citysList(custPermanentAddress.stateId, 'first');


        $("#first_City").val(custPermanentAddress.cityId);
        $("#first_State").val(custPermanentAddress.stateId);
      }, 1000);
      $("#first_pincode").val(custPermanentAddress.pincode);

    } else {
      $("#first_Correspondence").val(custPermanentAddress.address1);
      $("#first_Correspondence").attr("title", custPermanentAddress.address1);
      setTimeout(() => {

        first_perment_countryid1 = custPermanentAddress.countryId;
        first_perment_country_name1 = custPermanentAddress.country;

        first_perment_cityid1 = custPermanentAddress.cityId;
        first_perment_city_name1 = custPermanentAddress.city;

        first_perment_stateid1 = custPermanentAddress.stateId;
        first_perment_state_name1 = custPermanentAddress.state;



        $("#first_country1").val(custPermanentAddress.countryId);

        this.state_list(custPermanentAddress.countryId, 'first1');

        this.citysList(custPermanentAddress.stateId, 'first1');


        $("#first_City1").val(custPermanentAddress.cityId);
        $("#first_State1").val(custPermanentAddress.stateId);
      }, 1000);
      $("#first_pincode1").val(custPermanentAddress.pincode);
    }

    if (custCorespondingAddress.addressMappingType.addressType == "Correspondence") {
      $("#first_Correspondence").val(custCorespondingAddress.address1);
      $("#first_Correspondence").attr("title", custCorespondingAddress.address1);


      first_perment_countryid1 = custCorespondingAddress.countryId;
      first_perment_country_name1 = custCorespondingAddress.country;

      first_perment_cityid1 = custCorespondingAddress.cityId;
      first_perment_city_name1 = custCorespondingAddress.city;

      first_perment_stateid1 = custCorespondingAddress.stateId;
      first_perment_state_name1 = custCorespondingAddress.state;

      $("#first_country1").val(custCorespondingAddress.countryId);
      $("#first_City1").val(custCorespondingAddress.cityId);
      $("#first_State1").val(custCorespondingAddress.stateId);

      this.state_list(custCorespondingAddress.countryId, 'first1');

      this.citysList(custCorespondingAddress.stateId, 'first1');



      $("#first_pincode1").val(custCorespondingAddress.pincode);
    } else {
      $("#Permanent_first").val(custCorespondingAddress.address1);
      $("#Permanent_first").attr("title", custCorespondingAddress.address1);

      first_perment_countryid = custCorespondingAddress.countryId;
      first_perment_country_name = custCorespondingAddress.country;

      first_perment_cityid = custCorespondingAddress.cityId;
      first_perment_city_name = custCorespondingAddress.city;

      first_perment_stateid = custCorespondingAddress.stateId;
      first_perment_state_name = custCorespondingAddress.state;



      $("#first_country").val(custCorespondingAddress.countryId);

      this.state_list(custCorespondingAddress.countryId, 'first');

      this.citysList(custCorespondingAddress.stateId, 'first');


      $("#first_City").val(custCorespondingAddress.cityId);
      $("#first_State").val(custCorespondingAddress.stateId);

      $("#first_pincode").val(custCorespondingAddress.pincode);
    }
    var professionalInfo = bookingForData.professionalInfo;


    $("#first_designation").val(professionalInfo.designation);
    $("#first_name_of_organisation").val(professionalInfo.nameOfOrganization);
    $("#first_address_of_organisation").val(professionalInfo.addressOfOrganization);
    $("#first_office_number").val(professionalInfo.officeNumber);
    $("#first_office_email_id").val(professionalInfo.officeEmailId);
    $("#first_number_of_years").val(professionalInfo.yearsOfExperience);

    $("#first_organizational_type").val(professionalInfo.oraganizationDetails.organizationTypeName);
    $("#first_industry_sector_of_work").val(professionalInfo.sectorDetailsInfo.workSectorName);
    $("#first_work_function_role").val(professionalInfo.workFunctionInfo.workFunctionName);
    if (professionalInfo.oraganizationDetails.organizationTypeName == "" || professionalInfo.oraganizationDetails.organizationTypeName == null) {
      $("#first_organizational_type").val(professionalInfo.oraganizationDetails.ifOtherOrgTypeName);
    }

    if (professionalInfo.sectorDetailsInfo.workSectorName == "" || professionalInfo.sectorDetailsInfo.workSectorName == null) {
      $("#first_industry_sector_of_work").val(professionalInfo.sectorDetailsInfo.ifOtherWorkSectorName);
    }

    if (professionalInfo.workFunctionInfo.workFunctionName == "" || professionalInfo.workFunctionInfo.workFunctionName == null) {
      $("#first_work_function_role").val(professionalInfo.workFunctionInfo.ifOtherworkFunctionName);
    }

    var haveYouOwnedSumadhuraHome = customerOtherDetails.haveYouOwnedSumadhuraHome;

    console.log(haveYouOwnedSumadhuraHome);

    if (haveYouOwnedSumadhuraHome == "Yes" || haveYouOwnedSumadhuraHome == "YES" || haveYouOwnedSumadhuraHome == "yes") {
      this.Checkbox_list_value = true;


      this.item_data = [
        {
          key: 'yes',
          value: 'yes',
          checked: true,
        }, {
          key: 'no',
          value: 'no',
          checked: false,
        }
      ];

    } else {


      this.item_data = [
        {
          key: 'yes',
          value: 'yes',
          checked: false,
        }, {
          key: 'no',
          value: 'no',
          checked: true,
        }
      ];

      this.Checkbox_list_value = false;
    }




    POAHolderDetails = bookingForData.customerOtherDetailsInfo.poadetailsInfo;

    console.log(POAHolderDetails);
    this.first_name_of_poa_holder = bookingForData.customerOtherDetailsInfo.poadetailsInfo.nameOfPOA;
    this.first_tel_bck = bookingForData.customerOtherDetailsInfo.poadetailsInfo.telOfPOA;
    this.first_mobile_number_bck = bookingForData.customerOtherDetailsInfo.poadetailsInfo.mobileNumOfPOA;
    this.first_email_bck = bookingForData.customerOtherDetailsInfo.poadetailsInfo.emailOfPOA;
    first_city_bck_text = bookingForData.customerOtherDetailsInfo.poadetailsInfo.cityOfPOA;
    first_state_bck_text = bookingForData.customerOtherDetailsInfo.poadetailsInfo.stateOfPOA;
    this.first_pincode_bck = bookingForData.customerOtherDetailsInfo.poadetailsInfo.pincodeOfPOA;
    first_state_bck_val = bookingForData.customerOtherDetailsInfo.poadetailsInfo.stateId;
    first_city_bck_val = bookingForData.customerOtherDetailsInfo.poadetailsInfo.cityId;
    first_country_back_text = bookingForData.customerOtherDetailsInfo.poadetailsInfo.first_country_back_text;
    first_country_back_val = bookingForData.customerOtherDetailsInfo.poadetailsInfo.first_country_back_val;

    console.log(POAHolderDetails);
    $("#first_name_of_poa_holder").val(POAHolderDetails.nameOfPOA);
    $("#first_tel_bck").val(POAHolderDetails.telOfPOA);
    $("#first_mobile_number_bck").val(POAHolderDetails.mobileNumOfPOA);
    $("#first_email_bck").val(POAHolderDetails.emailOfPOA);
    $("#first_address_back").val(POAHolderDetails.addressOfPOA);
    $("#first_city_bck").val(POAHolderDetails.cityId);
    $("#first_state_bck").val(POAHolderDetails.stateId);
    $("#first_country_back").val(POAHolderDetails.countryId);

    this.state_list(POAHolderDetails.countryId, 'first_back');

    this.citysList(POAHolderDetails.stateId, 'first_back');


    $("#first_pincode_bck").val(POAHolderDetails.pincodeOfPOA);


    if (bookingForData.coApplicentDetails.length == 0) {
      this.hideme = false;


      this.hideme_three = false;
      $("#tab_third3").show();
      $("#tab_second2").show();

    } else {

      this.hideme = true;
      $("#tab_second2").show();

      this.hideme_three = true;
      $("#tab_third3").show();

    }


    if (bookingForData.coApplicentDetails.length == 2) {
      this.hideme = true;
      $("#tab_second").show();

      $("#tab_second2").hide();
      $("#tab_third3").hide();
      this.hideme_three = true;
      $("#tab_third").show();

      secondApplicantInfo = [];
      thirdApplicantInfo = [];
      thirdApplicantPermanentAddress = [];
      var applicantNUmber = bookingForData.coApplicentDetails[0].addressInfos[0].addressMappingType.metaType;
      if (applicantNUmber == "APPLICANT1") {
        secondApplicantInfo = bookingForData.coApplicentDetails[0].co_ApplicantInfo;
        var secondApplicantBookingInfo = bookingForData.coApplicentDetails[0].coApplicentBookingInfo;
        var secondApplicantprofessionalInfo = bookingForData.coApplicentDetails[0].professionalInfo;
        secondApplicantPermanentAddress = bookingForData.coApplicentDetails[0].addressInfos[0];
        secondApplicantcorespondedAddress = bookingForData.coApplicentDetails[0].addressInfos[1];
        thirdApplicantInfo = bookingForData.coApplicentDetails[1].co_ApplicantInfo;
        var thirdApplicantprofessionalInfo = bookingForData.coApplicentDetails[1].professionalInfo;
        var thirdApplicantBookingInfo = bookingForData.coApplicentDetails[1].coApplicentBookingInfo;
        thirdApplicantPermanentAddress = bookingForData.coApplicentDetails[1].addressInfos[0];
        thirdApplicantcorespondedAddress = bookingForData.coApplicentDetails[1].addressInfos[1];
      } else if (applicantNUmber == "APPLICANT2") {
        secondApplicantInfo = bookingForData.coApplicentDetails[1].co_ApplicantInfo;
        var secondApplicantBookingInfo = bookingForData.coApplicentDetails[1].coApplicentBookingInfo;
        var secondApplicantprofessionalInfo = bookingForData.coApplicentDetails[1].professionalInfo;
        secondApplicantPermanentAddress = bookingForData.coApplicentDetails[1].addressInfos[0];
        secondApplicantcorespondedAddress = bookingForData.coApplicentDetails[1].addressInfos[1];
        thirdApplicantInfo = bookingForData.coApplicentDetails[0].co_ApplicantInfo;
        var thirdApplicantprofessionalInfo = bookingForData.coApplicentDetails[0].professionalInfo;
        var thirdApplicantBookingInfo = bookingForData.coApplicentDetails[0].coApplicentBookingInfo;
        thirdApplicantPermanentAddress = bookingForData.coApplicentDetails[0].addressInfos[0];
        thirdApplicantcorespondedAddress = bookingForData.coApplicentDetails[0].addressInfos[1];
      }
    }
    if (bookingForData.coApplicentDetails.length == 1) {

      this.hideme = true;
      $("#tab_second").show();


      $("#tab_second2").hide();
      $("#tab_third3").hide();

      this.hideme_three = true;
      $("#tab_third").show();

      secondApplicantInfo = [];
      secondApplicantInfo = bookingForData.coApplicentDetails[0].co_ApplicantInfo;
      var secondApplicantBookingInfo = bookingForData.coApplicentDetails[0].coApplicentBookingInfo;
      var secondApplicantprofessionalInfo = bookingForData.coApplicentDetails[0].professionalInfo;
      secondApplicantPermanentAddress = bookingForData.coApplicentDetails[0].addressInfos[0];
      secondApplicantcorespondedAddress = bookingForData.coApplicentDetails[0].addressInfos[1];
    }


    /*------------------------second applicant start---------------*/
    if (bookingForData.coApplicentDetails.length == 1 || bookingForData.coApplicentDetails.length == 2) {


      if (this.deptid == 988) {

        this.disableEnableEditableFields(false, bookingForData.coApplicentDetails.length);

      } else {
        this.disableEnableEditableFields(true, bookingForData.coApplicentDetails.length);
      }



      var secondApplicantInfo_dateOfbirth;

      if (secondApplicantInfo.dateOfBirth == null) {
        secondApplicantInfo_dateOfbirth = "";

      } else {
        secondApplicantInfo_dateOfbirth = secondApplicantInfo.dateOfBirth;
      }
      $("#second_namePrefix").val(secondApplicantInfo.namePrefix);
      $("#second_namePrefix").trigger('change');
      $("#second_mrs").val(secondApplicantInfo.firstName);
      const date = new Date(secondApplicantInfo_dateOfbirth);
      var d = new Date(date);
      var datestring = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
      $("#second_dob").val(datestring);
      $("#second_relationnamePrefix").val(secondApplicantInfo.namePrefix);
      $("#second_relationnamePrefix").trigger('change');
      $("#second_Relation_with").val(secondApplicantInfo.relationWith);
      $("#second_Relation_with").trigger('change');
      $("#second_relation_name").val(secondApplicantInfo.relationName);
      $("#second_Marrital_status").val(secondApplicantBookingInfo.maritalStatus);

      $("#second_Marrital_status").trigger('change');

      const date1 = new Date(secondApplicantBookingInfo.dateOfAnniversery);
      var d = new Date(date1);
      var datestring1 = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
      $("#doa_second").val(datestring1);

      //for permenent



      if (secondApplicantPermanentAddress.addressMappingType.addressType == "permenent") {
        $("#second_permanent").val(secondApplicantPermanentAddress.address1);
        $("#second_permanent").attr("title", secondApplicantPermanentAddress.address1);



        second_perment_countryid = secondApplicantPermanentAddress.countryId;

        this.state_list(secondApplicantPermanentAddress.countryId, 'second');

        this.citysList(secondApplicantPermanentAddress.stateId, 'second');


        second_perment_country_name = secondApplicantPermanentAddress.country;

        second_perment_cityid = secondApplicantPermanentAddress.cityId;
        second_perment_city_name = secondApplicantPermanentAddress.city;

        second_perment_stateid = secondApplicantPermanentAddress.stateId;
        second_perment_state_name = secondApplicantPermanentAddress.state;


        $("#second_Country").val(secondApplicantPermanentAddress.countryId);
        $("#second_City").val(secondApplicantPermanentAddress.cityId);
        $("#second_State").val(secondApplicantPermanentAddress.stateId);
        $("#second_pincode").val(secondApplicantPermanentAddress.pincode);
      } else {
        $("#second_Correspondence").val(secondApplicantPermanentAddress.address1);
        $("#second_Correspondence").attr("title", secondApplicantPermanentAddress.address1);

        second_perment_countryid1 = secondApplicantPermanentAddress.countryId;
        second_perment_country_name1 = secondApplicantPermanentAddress.country;

        second_perment_cityid1 = secondApplicantPermanentAddress.cityId;
        second_perment_city_name1 = secondApplicantPermanentAddress.city;

        second_perment_stateid1 = secondApplicantPermanentAddress.stateId;
        second_perment_state_name1 = secondApplicantPermanentAddress.state;

        this.state_list(secondApplicantPermanentAddress.countryId, 'second1');

        this.citysList(secondApplicantPermanentAddress.stateId, 'second1');


        $("#second_Country1").val(secondApplicantPermanentAddress.countryId);
        $("#second_City1").val(secondApplicantPermanentAddress.cityId);
        $("#second_State1").val(secondApplicantPermanentAddress.stateId);
        $("#second_pincode1").val(secondApplicantPermanentAddress.pincode);
      }
      //for Correspondence
      if (custCorespondingAddress.addressMappingType.addressType == "Correspondence") {
        $("#second_Correspondence").val(secondApplicantcorespondedAddress.address1);
        $("#second_Correspondence").attr("title", secondApplicantcorespondedAddress.address1);
        $("#second_Country1").val(secondApplicantcorespondedAddress.countryId);

        second_perment_countryid1 = secondApplicantcorespondedAddress.countryId;
        second_perment_country_name1 = secondApplicantcorespondedAddress.country;

        second_perment_cityid1 = secondApplicantcorespondedAddress.cityId;
        second_perment_city_name1 = secondApplicantcorespondedAddress.city;

        second_perment_stateid1 = secondApplicantcorespondedAddress.stateId;
        second_perment_state_name1 = secondApplicantcorespondedAddress.state;

        this.state_list(secondApplicantcorespondedAddress.countryId, 'second1');

        this.citysList(secondApplicantcorespondedAddress.stateId, 'second1');

        $("#second_City1").val(secondApplicantcorespondedAddress.cityId);
        $("#second_State1").val(secondApplicantcorespondedAddress.stateId);
        $("#second_pincode1").val(secondApplicantcorespondedAddress.pincode);
      } else {
        $("#second_permanent").val(secondApplicantcorespondedAddress.address1);
        $("#second_permanent").attr("title", secondApplicantcorespondedAddress.address1);

        second_perment_countryid = secondApplicantcorespondedAddress.countryId;
        second_perment_country_name = secondApplicantcorespondedAddress.country;

        second_perment_cityid = secondApplicantcorespondedAddress.cityId;
        second_perment_city_name = secondApplicantcorespondedAddress.city;

        second_perment_stateid = secondApplicantcorespondedAddress.stateId;
        second_perment_state_name = secondApplicantcorespondedAddress.state;
        this.state_list(secondApplicantcorespondedAddress.countryId, 'second');

        this.citysList(secondApplicantcorespondedAddress.stateId, 'second');

        $("#second_Country").val(secondApplicantcorespondedAddress.countryId);
        $("#second_City").val(secondApplicantcorespondedAddress.cityId);
        $("#second_State").val(secondApplicantcorespondedAddress.stateId);
        $("#second_pincode").val(secondApplicantcorespondedAddress.pincode);
      }

      $("#second_tel").val(secondApplicantBookingInfo.telePhone);
      $("#second_mobile").val(secondApplicantBookingInfo.phoneNo);
      $("#second_email").val(secondApplicantBookingInfo.email);
      $("#second_pan_no").val(secondApplicantInfo.pancard);
      $("#second_nationality").val(secondApplicantInfo.nationality);
      $("#second_aadhaar_no").val(secondApplicantInfo.aadharId);

      $("#passport_no_second").val(secondApplicantInfo.passport);


      $("#second_Designation").val(secondApplicantprofessionalInfo.designation);
      $("#second_name_of_organisation").val(secondApplicantprofessionalInfo.nameOfOrganization);
      $("#second_of_organisation").val(secondApplicantprofessionalInfo.addressOfOrganization);
      $("#second_office_number").val(secondApplicantprofessionalInfo.officeNumber);
      $("#second_office_emailid").val(secondApplicantprofessionalInfo.officeEmailId);

      $("#second_number_of_years").val(secondApplicantprofessionalInfo.yearsOfExperience);
      $("#second_education_qualification").val(secondApplicantBookingInfo.educationalQualification);
      $("#second_Annual_household").val(secondApplicantBookingInfo.annualHouseHoldIncome);

      $("#Second_Organisation_type").val(secondApplicantprofessionalInfo.oraganizationDetails.organizationTypeName);
      $("#second_Industry_sector").val(secondApplicantprofessionalInfo.sectorDetailsInfo.workSectorName);
      $("#second_work_function_role").val(secondApplicantprofessionalInfo.workFunctionInfo.workFunctionName);

      if (secondApplicantprofessionalInfo.oraganizationDetails.organizationTypeName == "" || secondApplicantprofessionalInfo.oraganizationDetails.organizationTypeName == null) {
        $("#Second_Organisation_type").val(secondApplicantprofessionalInfo.oraganizationDetails.ifOtherOrgTypeName);
      }
      if (secondApplicantprofessionalInfo.sectorDetailsInfo.workSectorName == "" || secondApplicantprofessionalInfo.sectorDetailsInfo.workSectorName == null) {
        $("#second_Industry_sector").val(secondApplicantprofessionalInfo.sectorDetailsInfo.ifOtherWorkSectorName);
      }
      if (secondApplicantprofessionalInfo.workFunctionInfo.workFunctionName == "" || secondApplicantprofessionalInfo.workFunctionInfo.workFunctionName == null) {
        $("#second_work_function_role").val(secondApplicantprofessionalInfo.workFunctionInfo.ifOtherworkFunctionName);
      }
    }



    /* THIRD APPLICANT    ---------------------------- */
    /*------------------------second applicant start---------------*/
    if (bookingForData.coApplicentDetails.length == 2) {
      $("#third_namePrefix").val(thirdApplicantInfo.namePrefix);
      $("#third_namePrefix").trigger('change');
      $("#Third_mr").val(thirdApplicantInfo.firstName);

      var thirdapplicantInfo_dateOfbirth;
      if (thirdApplicantInfo.dateOfBirth == null) {
        thirdapplicantInfo_dateOfbirth = null;
      } else {
        thirdapplicantInfo_dateOfbirth = thirdApplicantInfo.dateOfBirth;
      }

      const date = new Date(thirdapplicantInfo_dateOfbirth);
      var d = new Date(date);
      var datestring = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
      $("#Third_dob").val(datestring);
      $("#third_Relation_with").val(thirdApplicantInfo.relationWith);
      $("#third_Relation_with").trigger('change');

      $("#third_relationnamePrefix").val(thirdApplicantInfo.relationNamePrefix);
      $("#third_relationnamePrefix").trigger('change');


      $("#third_relation_name").val(thirdApplicantInfo.relationName);
      $("#third_marrital_status").val(thirdApplicantBookingInfo.maritalStatus);

      $("#third_marrital_status").trigger('change');

      const date1 = new Date(thirdApplicantBookingInfo.dateOfAnniversery);
      var d = new Date(date1);
      var datestring1 = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);



      $("#doa_third").val(datestring1);


      if (secondApplicantPermanentAddress.addressMappingType.addressType == "permenent") {
        $("#third_permanent").val(thirdApplicantPermanentAddress.address1);
        $("#third_permanent").attr("title", thirdApplicantPermanentAddress.address1);


        third_perment_countryid = thirdApplicantPermanentAddress.countryId;
        third_perment_country_name = thirdApplicantPermanentAddress.country;

        third_perment_cityid = thirdApplicantPermanentAddress.cityId;
        third_perment_city_name = thirdApplicantPermanentAddress.city;

        third_perment_stateid = thirdApplicantPermanentAddress.stateId;
        third_perment_state_name = thirdApplicantPermanentAddress.state;

        this.state_list(thirdApplicantPermanentAddress.countryId, 'third');

        this.citysList(thirdApplicantPermanentAddress.stateId, 'third');

        $("#Third_Country").val(thirdApplicantPermanentAddress.countryId);
        $("#third_City").val(thirdApplicantPermanentAddress.cityId);
        $("#third_State").val(thirdApplicantPermanentAddress.stateId);
        $("#third_pincode").val(thirdApplicantPermanentAddress.pincode);
      } else {
        $("#third_correspondence").val(thirdApplicantPermanentAddress.address1);
        $("#third_aplcnt_correspond_addres").attr("title", thirdApplicantPermanentAddress.address1);


        third_perment_countryid1 = thirdApplicantPermanentAddress.countryId;
        third_perment_country_name1 = thirdApplicantPermanentAddress.country;

        third_perment_cityid1 = thirdApplicantPermanentAddress.cityId;
        third_perment_city_name1 = thirdApplicantPermanentAddress.city;

        third_perment_stateid1 = thirdApplicantPermanentAddress.stateId;
        third_perment_state_name1 = thirdApplicantPermanentAddress.state;

        this.state_list(thirdApplicantPermanentAddress.countryId, 'third1');
        this.citysList(thirdApplicantPermanentAddress.stateId, 'third1');

        $("#Third_Country1").val(thirdApplicantPermanentAddress.countryId);
        $("#third_City1").val(thirdApplicantPermanentAddress.cityId);
        $("#third_State1").val(thirdApplicantPermanentAddress.stateId);
        $("#third_pincode1").val(thirdApplicantPermanentAddress.pincode);
      }
      if (custCorespondingAddress.addressMappingType.addressType == "Correspondence") {
        $("#third_correspondence").val(thirdApplicantcorespondedAddress.address1);
        $("#third_correspondence").attr("title", thirdApplicantcorespondedAddress.address1);

        third_perment_countryid1 = thirdApplicantcorespondedAddress.countryId;
        third_perment_country_name1 = thirdApplicantcorespondedAddress.country;

        third_perment_cityid1 = thirdApplicantcorespondedAddress.cityId;
        third_perment_city_name1 = thirdApplicantcorespondedAddress.city;

        third_perment_stateid1 = thirdApplicantcorespondedAddress.stateId;
        third_perment_state_name1 = thirdApplicantcorespondedAddress.state;


        this.state_list(thirdApplicantcorespondedAddress.countryId, 'third1');

        this.citysList(thirdApplicantcorespondedAddress.stateId, 'third1');


        $("#Third_Country1").val(thirdApplicantcorespondedAddress.countryId);
        $("#third_City1").val(thirdApplicantcorespondedAddress.cityId);
        $("#third_State1").val(thirdApplicantcorespondedAddress.stateId);
        $("#third_pincode1").val(thirdApplicantcorespondedAddress.pincode);
      } else {
        $("#third_permanent").val(thirdApplicantcorespondedAddress.address1);
        $("#third_permanent").attr("title", thirdApplicantcorespondedAddress.address1);

        third_perment_countryid = thirdApplicantcorespondedAddress.countryId;
        third_perment_country_name = thirdApplicantcorespondedAddress.country;

        third_perment_cityid = thirdApplicantcorespondedAddress.cityId;
        third_perment_city_name = thirdApplicantcorespondedAddress.city;

        third_perment_stateid = thirdApplicantcorespondedAddress.stateId;
        third_perment_state_name = thirdApplicantcorespondedAddress.state;


        this.state_list(thirdApplicantcorespondedAddress.countryId, 'third');

        this.citysList(thirdApplicantcorespondedAddress.stateId, 'third');

        $("#Third_Country").val(thirdApplicantcorespondedAddress.countryId);
        $("#third_City").val(thirdApplicantcorespondedAddress.cityId);
        $("#third_State").val(thirdApplicantcorespondedAddress.stateId);
        $("#third_pincode").val(thirdApplicantcorespondedAddress.pincode);
      }

      $("#Third_tel").val(thirdApplicantBookingInfo.telePhone);
      $("#Third_Mobile").val(thirdApplicantBookingInfo.phoneNo);
      $("#Third_email").val(thirdApplicantBookingInfo.email);
      $("#Third_pan_no").val(thirdApplicantInfo.pancard);
      $("#Third_Nationality").val(thirdApplicantInfo.nationality);
      $("#Third_aadhaar_no").val(thirdApplicantInfo.aadharId);
      $("#passport_no_third").val(thirdApplicantInfo.passport);


      $("#Third_designation").val(thirdApplicantprofessionalInfo.designation);
      $("#Third_Name_of_organisation").val(thirdApplicantprofessionalInfo.nameOfOrganization);
      $("#Third_Address_of_Organisation").val(thirdApplicantprofessionalInfo.addressOfOrganization);
      $("#Third_Office_number").val(thirdApplicantprofessionalInfo.officeNumber);
      $("#Third_office_email_id").val(thirdApplicantprofessionalInfo.officeEmailId);

      $("#Third_Number_of_years").val(thirdApplicantprofessionalInfo.yearsOfExperience);
      $("#Third_Education_Qualification").val(thirdApplicantBookingInfo.educationalQualification);
      $("#Third_Annual_household").val(thirdApplicantBookingInfo.annualHouseHoldIncome);

      $("#Third_Organization_type").val(thirdApplicantprofessionalInfo.oraganizationDetails.organizationTypeName);
      $("#Third_Industry_sector_of_work").val(thirdApplicantprofessionalInfo.sectorDetailsInfo.workSectorName);
      $("#Third_work_function_role").val(thirdApplicantprofessionalInfo.workFunctionInfo.workFunctionName);

      if (thirdApplicantprofessionalInfo.oraganizationDetails.organizationTypeName == "" || thirdApplicantprofessionalInfo.oraganizationDetails.organizationTypeName == "") {
        $("#Third_Organization_type").val(thirdApplicantprofessionalInfo.oraganizationDetails.ifOtherOrgTypeName);
      }
      if (thirdApplicantprofessionalInfo.sectorDetailsInfo.workSectorName == "" || thirdApplicantprofessionalInfo.sectorDetailsInfo.workSectorName == null) {
        $("#Third_Industry_sector_of_work").val(thirdApplicantprofessionalInfo.sectorDetailsInfo.ifOtherWorkSectorName);
      }
      if (thirdApplicantprofessionalInfo.workFunctionInfo.workFunctionName == "" || thirdApplicantprofessionalInfo.workFunctionInfo.workFunctionName == null) {
        $("#Third_work_function_role").val(thirdApplicantprofessionalInfo.workFunctionInfo.ifOtherworkFunctionName);
      }
    }


    if (bookingForData.coApplicentDetails.length == 0) {


      $("#second_namePrefix").val("");
      $("#second_namePrefix").trigger('change');
      $("#second_mrs").val("");


      $("#second_dob").val("");
      $("#second_relationnamePrefix").val("");
      $("#second_relationnamePrefix").trigger('change');
      $("#second_Relation_with").val("");
      $("#second_Relation_with").trigger('change');
      $("#second_relation_name").val("");
      $("#second_Marrital_status").val("");

      $("#second_Marrital_status").trigger('change');


      $("#doa_second").val("");

      //for permenent
      $("#second_permanent").val("");
      $("#second_permanent").attr("title", "");

      $("#second_Country").val("");
      $("#second_City").val("");
      $("#second_State").val("");
      $("#second_pincode").val("");

      $("#second_Correspondence").val("");
      $("#second_Correspondence").attr("title", "");

      $("#second_Country1").val("");
      $("#second_City1").val("");
      $("#second_State1").val("");
      $("#second_pincode1").val("");

      $("#second_Correspondence").val("");
      $("#second_Correspondence").attr("title", "");
      $("#second_Country1").val("");
      $("#second_City1").val("");
      $("#second_State1").val("");
      $("#second_pincode1").val("");
      $("#second_permanent").val("");
      $("#second_permanent").attr("title", "");
      $("#second_Country").val("");
      $("#second_City").val("");
      $("#second_State").val("");
      $("#second_pincode").val("");

      $("#second_tel").val("");
      $("#second_mobile").val("");
      $("#second_email").val("");
      $("#second_pan_no").val("");
      $("#second_nationality").val("");
      $("#second_aadhaar_no").val("");

      $("#second_Designation").val("");
      $("#second_name_of_organisation").val("");
      $("#second_of_organisation").val("");
      $("#second_office_number").val("");
      $("#second_office_emailid").val("");

      $("#second_number_of_years").val("");
      $("#second_education_qualification").val("");
      $("#second_Annual_household").val("");

      $("#Second_Organisation_type").val("");
      $("#second_Industry_sector").val("");
      $("#second_work_function_role").val("");
      $("#Second_Organisation_type").val("");
      $("#second_Industry_sector").val("");
      $("#second_work_function_role").val("");





      $("#third_namePrefix").val("");
      $("#third_namePrefix").trigger('change');
      $("#Third_mr").val("");
      $("#Third_dob").val("");
      $("#third_Relation_with").val("");
      $("#third_Relation_with").trigger('change');
      $("#third_relationnamePrefix").val("");
      $("#third_relationnamePrefix").trigger('change');
      $("#third_relation_name").val("");
      $("#third_marrital_status").val("");
      $("#third_marrital_status").trigger('change');
      $("#doa_third").val("");
      $("#third_permanent").val("");
      $("#third_permanent").attr("");
      $("#Third_Country").val("");
      $("#third_City").val("");
      $("#third_State").val("");
      $("#third_pincode").val("");
      $("#third_correspondence").val("");
      $("#third_aplcnt_correspond_addres").attr("title", "");
      $("#Third_Country1").val("");
      $("#third_City1").val("");
      $("#third_State1").val("");
      $("#third_pincode1").val("");

      $("#third_correspondence").val("");
      $("#third_correspondence").attr("title", "");
      $("#Third_Country1").val("");
      $("#third_City1").val("");
      $("#third_State1").val("");
      $("#third_pincode1").val("");
      $("#third_permanent").val("");
      $("#third_permanent").attr("title", "");
      $("#Third_Country").val("");
      $("#third_City").val("");
      $("#third_State").val("");
      $("#third_pincode").val("");

      $("#Third_tel").val("");
      $("#Third_Mobile").val("");
      $("#Third_email").val("");
      $("#Third_pan_no").val("");
      $("#Third_Nationality").val("");
      $("#Third_aadhaar_no").val("");

      $("#Third_designation").val("");
      $("#Third_Name_of_organisation").val("");
      $("#Third_Address_of_Organisation").val("");
      $("#Third_Office_number").val("");
      $("#Third_office_email_id").val("");

      $("#Third_Number_of_years").val("");
      $("#Third_Education_Qualification").val("");
      $("#Third_Annual_household").val("");

      $("#Third_Organization_type").val("");
      $("#Third_Industry_sector_of_work").val("");
      $("#Third_work_function_role").val("");
      $("#Third_Organization_type").val("");
      $("#Third_Industry_sector_of_work").val("");
      $("#Third_work_function_role").val("");

      if (this.deptid == 988) {

        this.disableEnableEditableFields(false, bookingForData.coApplicentDetails.length);

      } else {
        this.disableEnableEditableFields(false, bookingForData.coApplicentDetails.length);
      }


    }

    console.log(bookingForData.coApplicentDetails.length);
    if (bookingForData.coApplicentDetails.length == 1) {
      $("#third_namePrefix").val("");
      $("#third_namePrefix").trigger('change');
      $("#Third_mr").val("");
      $("#Third_dob").val("");
      $("#third_Relation_with").val("");
      $("#third_Relation_with").trigger('change');
      $("#third_relationnamePrefix").val("");
      $("#third_relationnamePrefix").trigger('change');
      $("#third_relation_name").val("");
      $("#third_marrital_status").val("");
      $("#third_marrital_status").trigger('change');
      $("#doa_third").val("");
      $("#third_permanent").val("");
      $("#third_permanent").attr("");

      $("#third_City").val("");
      $("#third_State").val("");
      $("#Third_Country").val("");


      $("#third_City1").val("");
      $("#third_State1").val("");
      $("#Third_Country1").val("");



      $("#third_pincode").val("");
      $("#third_correspondence").val("");
      $("#third_aplcnt_correspond_addres").attr("title", "");





      $("#third_pincode1").val("");

      $("#third_correspondence").val("");
      $("#third_correspondence").attr("title", "");

      $("#third_pincode1").val("");
      $("#third_permanent").val("");
      $("#third_permanent").attr("title", "");

      $("#third_pincode").val("");

      $("#Third_tel").val("");
      $("#Third_Mobile").val("");
      $("#Third_email").val("");
      $("#Third_pan_no").val("");
      $("#Third_Nationality").val("");
      $("#Third_aadhaar_no").val("");

      $("#Third_designation").val("");
      $("#Third_Name_of_organisation").val("");
      $("#Third_Address_of_Organisation").val("");
      $("#Third_Office_number").val("");
      $("#Third_office_email_id").val("");

      $("#Third_Number_of_years").val("");
      $("#Third_Education_Qualification").val("");
      $("#Third_Annual_household").val("");

      $("#Third_Organization_type").val("");
      $("#Third_Industry_sector_of_work").val("");
      $("#Third_work_function_role").val("");
      $("#Third_Organization_type").val("");
      $("#Third_Industry_sector_of_work").val("");
      $("#Third_work_function_role").val("");

      if (this.deptid == 988) {

        this.disableEnableEditableFields(false, bookingForData.coApplicentDetails.length);

      } else {
        this.disableEnableEditableFields(false, bookingForData.coApplicentDetails.length);
      }

    }


    unitDetails = bookingForData.flatBookingInfo;

    console.log(JSON.stringify(unitDetails))
    this.aminitiesList_controller = bookingForData.flatBookingInfo.aminitiesInfraCostInfo;

    this.booking_main_id = bookingForData.flatBookingInfo.BookingId;

    this.sbua = bookingForData.flatBookingInfo.sbua;
    this.carpetArea = bookingForData.flatBookingInfo.carpetArea;

    if (bookingForData.flatBookingInfo.handingOverDate == null) {
      $("#hod_first").val("");
    } else {
      const date2 = new Date(bookingForData.flatBookingInfo.handingOverDate);
      var d2 = new Date(date2);
      var datestring2 = d2.getFullYear() + "-" + ("0" + (d2.getMonth() + 1)).slice(-2) + "-" + ("0" + d2.getDate()).slice(-2);

      $("#hod_first").val(datestring2);
    }


    if (bookingForData.flatBookingInfo.registrationDate == null) {
      $("#rd_first").val("");
    } else {
      const date3 = new Date(bookingForData.flatBookingInfo.registrationDate);
      var d3 = new Date(date3);
      var datestring3 = d3.getFullYear() + "-" + ("0" + (d3.getMonth() + 1)).slice(-2) + "-" + ("0" + d3.getDate()).slice(-2);

      $("#rd_first").val(datestring3);
    }

    const booking_date = new Date(bookingForData.flatBookingInfo.bookingDate);
    var d = new Date(booking_date);
    var datestring = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);


    const Agreement_date = new Date(bookingForData.flatBookingInfo.bookingDate);
    var d = new Date(Agreement_date);
    var datestring1 = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);




    $("#unit_booking_date").val(datestring);
    $("#unit_Agreement_date").val(datestring1);
 
    $("#unit_actualPricePerSft").val(unitDetails.flatCost.actualPricePerSft);
    $("#unit_amenitiesFlatCost").val(unitDetails.flatCost.amenitiesFlatCost);
    $("#unit_basic_flat_cost").val(unitDetails.flatCost.basicFlatCost);
    $("#facing_unit").val(unitDetails.facing);

    $("#unit_total_gst_amount").val(unitDetails.flatCost.gstCost);
    $("#unit_overallPricePerSft").val(unitDetails.flatCost.overallPricePerSft);
    $("#Rate_per_sqft_unit").val(unitDetails.flatCost.soldBasePrice);
    $("#unit_taxesPerSft").val(unitDetails.flatCost.taxesPerSft);
    $("#unit_total_cost").val(unitDetails.flatCost.totalCost);

    $("#unit_AAA").val(unitDetails.flatCost.aaaCost);
    $("#unit_discount").val(unitDetails.flatCost.discount);

    $("#unit_total_cost_exclude_gst").val(unitDetails.flatCost.totalCostExcludeGst);
    $("#unit_group").val(unitDetails.flatCost.unitGroup);
    $("#unit_quoted_base_price").val(unitDetails.flatCost.quotedBasePrice);
    $("#Rate_per_sqft_unit").val(unitDetails.flatCost.soldBasePrice);
    // $("#unit_Rupees_in_words").val(this.convertNumberToWords(parseFloat(unitDetails.flatCost.totalCost).toFixed(2)));
    $("#unit_LeadId").val(bookingForData.customerApplicationInfo.leadId);

    $("#unit_eoi_applicable").val(unitDetails.eoiApplicable);
    $("#unit_eoi_sequence_number").val(unitDetails.eoiSequenceNumber);
    $("#unit_experience_with_sumadhura").val(firstAppBookingDetails.overallExperienceWithSumadhura);

    $("#unit_total_agreement_cost").val(unitDetails.flatCost.totalCost);
    console.log(unitDetails);

    if (unitDetails.flatCost.totalCost != null && unitDetails.flatCost.totalCost != undefined && unitDetails.flatCost.totalCost != "") {

      const numWords = require('num-words')
      const amountInWords = numWords(Math.round(unitDetails.flatCost.totalCost))
      $("#unit_Rupees_in_words").val(amountInWords);
    }

    console.log(unitDetails.siteInfo.siteId);

    this.projectchangeFun(unitDetails.siteInfo.siteId);
    this.get_oldsalesforesbg(unitDetails.siteInfo.siteId);
    this.Scheme_Name(unitDetails.siteInfo.siteId);


    this.siteList();
    //this.Kyc_documents_list();
    this.milestoneDetails();
    //    this.state_list();
    this.countryList();
    // this.citysList();

  }





  changeradiobutton(event) {

    changeradiobutton_val = event.target.value;
  }

  totalcost_onPaste(event) {
    if ($("#unit_total_cost_exclude_gst").val() != "" && $("#unit_total_gst_amount").val() != "") {
      const num1 = parseFloat($("#unit_total_cost_exclude_gst").val());
      const num2 = parseFloat($("#unit_total_gst_amount").val());
      const sum = (num1 + num2).toFixed(2);
      $("#unit_total_cost").val(sum);
    }
  }

  total_cost_exclude_gstfun(event) {
    if ($("#unit_total_gst_amount").val() != "" && $("#unit_total_gst_amount").val() != 'select' && $("#unit_total_gst_amount").val() != null) {
      const num1 = parseFloat($("#unit_total_cost_exclude_gst").val());
      const num2 = parseFloat($("#unit_total_gst_amount").val());
      const sum = (num1 + num2).toFixed(2);
      $("#unit_total_cost").val(sum);
    }

    if ($("#unit_total_gst_amount").val() != "" && $("#unit_total_gst_amount").val() != 'select' && $("#unit_total_gst_amount").val() != null) {
      const num1 = parseFloat($("#unit_total_gst_amount").val());
      const num2 = parseFloat($("#unit_total_cost_exclude_gst").val());
      const sum = (num1 + num2).toFixed(2);
      $("#unit_total_agreement_cost").val(sum);

      const numWords = require('num-words')
      const amountInWords = numWords(sum)
      $("#unit_Rupees_in_words").val(amountInWords);

    }




  }
  total_costfun(event) {
    if ($("#Scheme_name").val() != "" && $("#Scheme_name").val() != "select" && $("#Scheme_name").val() != null) {
      const num1 = parseFloat($("#unit_total_cost_exclude_gst").val());
      const num2 = parseFloat(unit_schema_id);
      const sum = (num1 * num2 / 100).toFixed(2);
      $("#unit_total_gst_amount").val(sum);

    }


    if ($("#sbua_unit").val() != "" && $("#unit_total_gst_amount").val() != "") {
      const gstamount = parseFloat($("#unit_total_gst_amount").val());
      const suba = parseFloat($("#sbua_unit").val());
      const basicsum = (gstamount / suba).toFixed(2);
      $("#unit_taxesPerSft").val(basicsum);
    }

    if ($("#unit_taxesPerSft").val() != "" && $("#Rate_per_sqft_unit").val()) {
      const ratepersqrt = parseFloat($("#Rate_per_sqft_unit").val());
      const taxespersft = parseFloat($("#unit_taxesPerSft").val());
      const basicsum = ratepersqrt + taxespersft;
      $("#unit_actualPricePerSft").val(basicsum);

    }

    if ($("#unit_total_cost").val() != "" && $("#sbua_unit").val() != "") {
      const num1 = parseFloat($("#unit_total_cost").val());
      const num2 = parseFloat($("#sbua_unit").val());
      const sum = (num1 / num2).toFixed(2);
      $("#unit_actualPricePerSft").val(sum);
    }


  }

  totalagreement_keyFunc(event) {

    if ($("#sbua_unit").val() != "") {
      const num1 = parseFloat($("#sbua_unit").val());
      const num2 = parseFloat($("#unit_total_agreement_cost").val());
      const sum = (num1 / num2).toFixed(2);
      $("#unit_overallPricePerSft").val(sum);
    }
  }

  Actualpricepersftfun(event) {
    if ($("#unit_taxesPerSft").val() != "" && $("#Rate_per_sqft_unit").val()) {
      const ratepersqrt = parseFloat($("#Rate_per_sqft_unit").val());
      const taxespersft = parseFloat($("#unit_taxesPerSft").val());
      const basicsum = ratepersqrt + taxespersft;
      $("#unit_actualPricePerSft").val(basicsum);

    }




  }

  total_gst_amountfun(event) {
    if ($("#sbua_unit").val() != "" && $("#unit_total_gst_amount").val() != "") {
      const gstamount = parseFloat($("#unit_total_gst_amount").val());
      const suba = parseFloat($("#sbua_unit").val());
      const basicsum = (gstamount / suba).toFixed(2);
      $("#unit_taxesPerSft").val(basicsum);
    }

    if ($("#unit_taxesPerSft").val() != "" && $("#Rate_per_sqft_unit").val()) {
      const ratepersqrt = parseFloat($("#Rate_per_sqft_unit").val());
      const taxespersft = parseFloat($("#unit_taxesPerSft").val());
      const basicsum = ratepersqrt + taxespersft;
      $("#unit_actualPricePerSft").val(basicsum);

    }


    if ($("#unit_total_cost_exclude_gst").val() != "" && $("#unit_total_cost_exclude_gst").val() != 'select' && $("#unit_total_cost_exclude_gst").val() != null) {
      const num1 = parseFloat($("#unit_total_cost_exclude_gst").val());
      const num2 = parseFloat($("#unit_total_gst_amount").val());
      const sum = (num1 + num2).toFixed(2);
      $("#unit_total_cost").val(sum);
    }

    if ($("#unit_total_cost_exclude_gst").val() != "" && $("#unit_total_cost_exclude_gst").val() != 'select' && $("#unit_total_cost_exclude_gst").val() != null) {
      const num1 = parseFloat($("#unit_total_gst_amount").val());
      const num2 = parseFloat($("#unit_total_cost_exclude_gst").val());
      const sum = (num1 + num2).toFixed(2);
      $("#unit_total_agreement_cost").val(sum);
      const numWords = require('num-words')
      const amountInWords = numWords(sum)
      $("#unit_Rupees_in_words").val(amountInWords);
    }


  }

  sbua_aminititesInfranamefun(event) {
    total_controller_ami = 0;
    for (var i = 0; i < this.aminitiesList_controller.length; i++) {

      if (!isNaN(parseFloat(this.aminitiesList_controller[i].totalCost))) {
        console.log(parseFloat(this.aminitiesList_controller[i].totalCost));
        total_controller_ami += parseFloat(this.aminitiesList_controller[i].totalCost);
        console.log(total_controller_ami);
        $("#unit_amenitiesFlatCost").val(total_controller_ami);
        if ($("#unit_amenitiesFlatCost").val() != "" && $("#unit_basic_flat_cost").val() != "") {
          const aminitycost = parseFloat($("#unit_amenitiesFlatCost").val());
          const basicflatcost = parseFloat($("#unit_basic_flat_cost").val());
          const basicsum = (aminitycost + basicflatcost).toFixed(2);;

          $("#unit_total_cost_exclude_gst").val(basicsum);
        }
      }
    }


    if ($("#unit_total_cost_exclude_gst").val() != "") {
      const num1 = parseFloat($("#unit_total_cost_exclude_gst").val());
      const num2 = parseFloat(unit_schema_id);
      const sum = (num1 * num2 / 100).toFixed(2);
      $("#unit_total_gst_amount").val(sum);
    }

    if ($("#sbua_unit").val() != "" && $("#unit_total_gst_amount").val() != "") {
      const gstamount = parseFloat($("#unit_total_gst_amount").val());
      const suba = parseFloat($("#sbua_unit").val());
      const basicsum = (gstamount / suba).toFixed(2);
      $("#unit_taxesPerSft").val(basicsum);
    }



    if ($("#unit_total_cost_exclude_gst").val() != "" && $("#unit_total_gst_amount").val() != "") {
      const num1 = parseFloat($("#unit_total_cost_exclude_gst").val());
      const num2 = parseFloat($("#unit_total_gst_amount").val());
      const sum = (num1 + num2).toFixed(2);
      $("#unit_total_cost").val(sum);
    }

    setTimeout(() => {
      if ($("#unit_total_cost").val() != "" && $("#sbua_unit").val() != "") {
        const num1 = parseFloat($("#unit_total_cost").val());
        const num2 = parseFloat($("#sbua_unit").val());

        console.log(num1);
        console.log(num2);

        const sum = (num1 / num2).toFixed(2);
        $("#unit_actualPricePerSft").val(sum);
        $("#unit_overallPricePerSft").val(sum);
      }
    }, 1000);


    if ($("#unit_total_cost_exclude_gst").val() != "" && $("#unit_total_cost_exclude_gst").val() != 'select' && $("#unit_total_cost_exclude_gst").val() != null) {
      const num1 = parseFloat($("#unit_total_gst_amount").val());
      const num2 = parseFloat($("#unit_total_cost_exclude_gst").val());
      const sum = (num1 + num2).toFixed(2);
      $("#unit_total_agreement_cost").val(sum);
      //  $("#unit_overallPricePerSft").val(sum);


      const numWords = require('num-words')
      const amountInWords = numWords(parseInt(sum))
      $("#unit_Rupees_in_words").val(amountInWords);


    }


  }


  sbua_keyFunc(event) {
    if ($("#sbua_unit").val() != "" && $("#Rate_per_sqft_unit").val() != "") {
      const num1 = parseFloat($("#sbua_unit").val());
      const num2 = parseFloat($("#Rate_per_sqft_unit").val());
      const sum = num1 * num2;
      $("#unit_basic_flat_cost").val(sum);
    }

    if ($("#unit_amenitiesFlatCost").val() != "" && $("#unit_basic_flat_cost").val() != "") {

      const aminitycost = parseFloat($("#unit_amenitiesFlatCost").val());
      const basicflatcost = parseFloat($("#unit_basic_flat_cost").val());
      const basicsum = aminitycost + basicflatcost;

      $("#unit_total_cost_exclude_gst").val(basicsum);
    }

    if ($("#unit_total_agreement_cost").val() != "") {
      const num1 = parseFloat($("#sbua_unit").val());
      const num2 = parseFloat($("#unit_total_agreement_cost").val());
      const sum = (num1 / num2).toFixed(2);
      $("#unit_overallPricePerSft").val(sum);


    }

    if ($("#sbua_unit").val() != "" && $("#unit_total_gst_amount").val() != "") {
      const gstamount = parseFloat($("#unit_total_gst_amount").val());
      const suba = parseFloat($("#sbua_unit").val());
      const basicsum = (gstamount / suba).toFixed(2);
      $("#unit_taxesPerSft").val(basicsum);
    }

    if ($("#unit_taxesPerSft").val() != "" && $("#Rate_per_sqft_unit").val()) {
      const ratepersqrt = parseFloat($("#Rate_per_sqft_unit").val());
      const taxespersft = parseFloat($("#unit_taxesPerSft").val());
      const basicsum = ratepersqrt + taxespersft;
      $("#unit_actualPricePerSft").val(basicsum);

    }

    if ($("#unit_total_cost").val() != "" && $("#sbua_unit").val() != "") {
      const num1 = parseFloat($("#unit_total_cost").val());
      const num2 = parseFloat($("#sbua_unit").val());
      const sum = (num1 / num2).toFixed(2);
      $("#unit_actualPricePerSft").val(sum);
    }



  }

  ratepersqft_keyFunc(event) {

    if (event.which === 32 && event.target.selectionStart === 0) {
      return false;
    } else {
      const pattern = /^[^0-9.]*$/;
      const inputChar = String.fromCharCode(event.charCode);
      if (event.keyCode !== 8 && !pattern.test(inputChar)) {
        event.preventDefault();
      }

      // if (event.target.value.length > 25) {
      //   event.target.value = event.target.value.slice(0, -1);
      // }
    }


    if ($("#sbua_unit").val() != "" && $("#Rate_per_sqft_unit").val() != "") {
      const num1 = parseFloat($("#sbua_unit").val());
      const num2 = parseFloat($("#Rate_per_sqft_unit").val());
      const sum = num1 * num2;
      $("#unit_basic_flat_cost").val(sum);



    }

    if ($("#unit_amenitiesFlatCost").val() != "" && $("#unit_basic_flat_cost").val() != "") {
      const aminitycost = parseFloat($("#unit_amenitiesFlatCost").val());
      const basicflatcost = parseFloat($("#unit_basic_flat_cost").val());
      const basicsum = aminitycost + basicflatcost;

      $("#unit_total_cost_exclude_gst").val(basicsum);

    }
    if ($("#unit_taxesPerSft").val() != "" && $("#Rate_per_sqft_unit").val()) {
      const ratepersqrt = parseFloat($("#Rate_per_sqft_unit").val());
      const taxespersft = parseFloat($("#unit_taxesPerSft").val());
      const basicsum = ratepersqrt + taxespersft;
      $("#unit_actualPricePerSft").val(basicsum);

    }

    if ($("#unit_amenitiesFlatCost").val() != "" && $("#unit_basic_flat_cost").val() != "") {
      const aminitycost = parseFloat($("#unit_amenitiesFlatCost").val());
      const basicflatcost = parseFloat($("#unit_basic_flat_cost").val());
      const basicsum = aminitycost + basicflatcost;

      $("#unit_total_cost_exclude_gst").val(basicsum);
    }


    // unit_schema_id = $(e.target).val();
    // unit_schema_name = $('#Scheme_name').select2('data')[0].text;

    console.log(unit_schema_id);
    if ($("#unit_total_cost_exclude_gst").val() != "") {
      const num1 = parseFloat($("#unit_total_cost_exclude_gst").val());
      const num2 = parseFloat(unit_schema_id);
      const sum = (num1 * num2 / 100).toFixed(2);
      $("#unit_total_gst_amount").val(sum);
    }

    if ($("#sbua_unit").val() != "" && $("#unit_total_gst_amount").val() != "") {
      const gstamount = parseFloat($("#unit_total_gst_amount").val());
      const suba = parseFloat($("#sbua_unit").val());
      const basicsum = (gstamount / suba).toFixed(2);
      $("#unit_taxesPerSft").val(basicsum);
    }

    if ($("#unit_taxesPerSft").val() != "" && $("#Rate_per_sqft_unit").val()) {
      const ratepersqrt = parseFloat($("#Rate_per_sqft_unit").val());
      const taxespersft = parseFloat($("#unit_taxesPerSft").val());
      const basicsum = ratepersqrt + taxespersft;
      $("#unit_actualPricePerSft").val(basicsum);

    }


    if ($("#unit_total_cost_exclude_gst").val() != "" && $("#unit_total_gst_amount").val() != "") {
      const num1 = parseFloat($("#unit_total_cost_exclude_gst").val());
      const num2 = parseFloat($("#unit_total_gst_amount").val());
      const sum = (num1 + num2).toFixed(2);
      $("#unit_total_cost").val(sum);
    }

    if ($("#unit_total_cost_exclude_gst").val() != "" && $("#unit_total_cost_exclude_gst").val() != 'select' && $("#unit_total_cost_exclude_gst").val() != null) {
      const num1 = parseFloat($("#unit_total_gst_amount").val());
      const num2 = parseFloat($("#unit_total_cost_exclude_gst").val());
      const sum = (num1 + num2).toFixed(2);
      $("#unit_total_agreement_cost").val(sum);

      const numWords = require('num-words')
      const amountInWords = numWords(sum)
      $("#unit_Rupees_in_words").val(amountInWords);

    }





  }

  changeStatus(event) {

    if (event.target.checked == true) {
      this.secondform_validation = event.target.checked;
      this.hideme = true;
      $("#tab_second").show();
      // $("#tab_second2").hide();


    } else {
      this.secondform_validation = event.target.checked;
      this.hideme = false;
      $("#tab_second").hide();
      // $("#tab_second2").show();
    }
  }

  changeStatus_three(event) {

    if (event.target.checked == true) {
      this.thirdform_validation = event.target.checked;
      this.hideme_three = true;
      $("#tab_third").show();

      this.hideme_three = false;
      $("#tab_third3").show();
    } else {
      this.thirdform_validation = event.target.checked;
      this.hideme_three = false;
      $("#tab_third").hide();
      $("#tab_third3").show();

    }
  }

  // somethingfun(event) {


  //   if (event == "SECOND APPLICANT (MANDATORY)") {
  //     this.hideme = false;

  //   } else if (event == "THIRD APPLICANT (MANDATORY)") {
  //     this.hideme_three = false;
  //   }
  // }



  customCsstabs(id) {
    if (id == 0) {
      return 'active'
    } else {
      return 'tab-pane fade show'
    }
  }


  keyPress1(event: any) {
    if (event.which === 32 && event.target.selectionStart === 0) {
      return false;
    } else {
      const pattern = /^[a-zA-Z ]*$/;
      const inputChar = String.fromCharCode(event.charCode);
      if (event.keyCode !== 8 && !pattern.test(inputChar)) {
        event.preventDefault();
      }

      if (event.target.value.length > 100) {
        event.target.value = event.target.value.slice(0, -1);
      }
    }
  }


  pasteEvent(event: ClipboardEvent) {
    const clipboardData = event.clipboardData;
    const pastedText = clipboardData.getData('text');
    const pattern = /^[a-zA-Z ]*$/;
    if (!pattern.test(pastedText)) {
      event.preventDefault();
    }
  }

  mobilenumberfun(event: any) {
    const pattern = /^[a-zA-Z ]*$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
    if (event.target.value.length > 8) {
      event.target.value = event.target.value.slice(0, -1);
    }
  }

  phonenumberfun(event: any) {
    const pattern = /^[a-zA-Z ]*$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
    if (event.target.value.length > 15) {
      event.target.value = event.target.value.slice(0, -1);
    }
  }

  pannumberfun(event: any) {
    if (event.target.value.length > 20) {
      event.target.value = event.target.value.slice(0, -1);
    }
  }


  pincodefun(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }


 


  countryList() {
    $('.page-loader-wrapper').show();
    this.service.get_Country_List().then(resp => {
      console.log(resp);
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {



        $('.country').html("");
        $('.country').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {

          if (resp.responseObjList[i].country != "N/A") {
            $('.country').append("<option value='" + resp.responseObjList[i].countryId + "'>" + resp.responseObjList[i].country + "</option>");
          }

        }


        if (custPermanentAddress.countryId != "" && custPermanentAddress.countryId != null && custPermanentAddress.countryId != undefined) {
          $("#first_country").val(custPermanentAddress.countryId);
        }

        if (custCorespondingAddress.countryId != "" && custCorespondingAddress.countryId != null && custCorespondingAddress.countryId != undefined) {
          $("#first_country1").val(custCorespondingAddress.countryId);
        }

        console.log(POAHolderDetails.countryId);

        if (POAHolderDetails.countryId != "" && POAHolderDetails.countryId != null && POAHolderDetails.countryId != undefined) {
          $("#first_country_back").val(POAHolderDetails.countryId);
        }

        if (bookingForData.coApplicentDetails.length == 1) {
          if (secondApplicantPermanentAddress.countryId != "" && secondApplicantPermanentAddress.countryId != null && secondApplicantPermanentAddress.countryId != undefined) {
            $("#second_Country").val(secondApplicantPermanentAddress.countryId);
          }

          if (secondApplicantcorespondedAddress.countryId != "" && secondApplicantcorespondedAddress.countryId != null && secondApplicantcorespondedAddress.countryId != undefined) {
            $("#second_Country1").val(secondApplicantcorespondedAddress.countryId);
          }




        }

        if (bookingForData.coApplicentDetails.length == 2) {

          if (secondApplicantPermanentAddress.countryId != "" && secondApplicantPermanentAddress.countryId != null && secondApplicantPermanentAddress.countryId != undefined) {
            $("#second_Country").val(secondApplicantPermanentAddress.countryId);
          }

          if (secondApplicantcorespondedAddress.countryId != "" && secondApplicantcorespondedAddress.countryId != null && secondApplicantcorespondedAddress.countryId != undefined) {
            $("#second_Country1").val(secondApplicantcorespondedAddress.countryId);
          }



          if (thirdApplicantPermanentAddress.countryId != "" && thirdApplicantPermanentAddress.countryId != null && thirdApplicantPermanentAddress.countryId != undefined) {
            $("#Third_Country").val(thirdApplicantPermanentAddress.countryId);
          }


          if (thirdApplicantcorespondedAddress.countryId != "" && thirdApplicantcorespondedAddress.countryId != null && thirdApplicantcorespondedAddress.countryId != undefined) {
            $("#Third_Country1").val(thirdApplicantcorespondedAddress.countryId);
          }

        }





      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
      }
    }, error => {
      $('.page-loader-wrapper').hide();
      var error = JSON.parse(error._body).responseCode;
      if (error == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      }
    }

    )
  }


  citysList(state_id, item_name) {
    $('.page-loader-wrapper').show();
    this.service.get_citys_List(state_id).then(resp => {
      console.log(resp);
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        console.log(resp);




        if (item_name == "first_back") {
          $('#first_city_bck').html("");
          $('#first_city_bck').append('<option value="select">--Select--</option>');
          for (var i = 0; i < resp.responseObjList.length; i++) {
            $('#first_city_bck').append("<option value='" + resp.responseObjList[i].cityId + "'>" + resp.responseObjList[i].city + "</option>");
          }

        } else if (item_name == "first") {

          $('#first_City').html("");
          $('#first_City').append('<option value="select">--Select--</option>');
          for (var i = 0; i < resp.responseObjList.length; i++) {
            $('#first_City').append("<option value='" + resp.responseObjList[i].cityId + "'>" + resp.responseObjList[i].city + "</option>");
          }



        } else if (item_name == "first1") {

          $('#first_City1').html("");
          $('#first_City1').append('<option value="select">--Select--</option>');
          for (var i = 0; i < resp.responseObjList.length; i++) {
            $('#first_City1').append("<option value='" + resp.responseObjList[i].cityId + "'>" + resp.responseObjList[i].city + "</option>");
          }


        } else if (item_name == "second") {

          $('#second_City').html("");
          $('#second_City').append('<option value="select">--Select--</option>');
          for (var i = 0; i < resp.responseObjList.length; i++) {
            $('#second_City').append("<option value='" + resp.responseObjList[i].cityId + "'>" + resp.responseObjList[i].city + "</option>");
          }


        } else if (item_name == "second1") {

          $('#second_City1').html("");
          $('#second_City1').append('<option value="select">--Select--</option>');
          for (var i = 0; i < resp.responseObjList.length; i++) {
            $('#second_City1').append("<option value='" + resp.responseObjList[i].cityId + "'>" + resp.responseObjList[i].city + "</option>");
          }


        } else if (item_name == "third") {

          $('#third_City').html("");
          $('#third_City').append('<option value="select">--Select--</option>');
          for (var i = 0; i < resp.responseObjList.length; i++) {
            $('#third_City').append("<option value='" + resp.responseObjList[i].cityId + "'>" + resp.responseObjList[i].city + "</option>");
          }



        } else if (item_name == "third1") {

          $('#third_City1').html("");
          $('#third_City1').append('<option value="select">--Select--</option>');
          for (var i = 0; i < resp.responseObjList.length; i++) {
            $('#third_City1').append("<option value='" + resp.responseObjList[i].cityId + "'>" + resp.responseObjList[i].city + "</option>");
          }

        }



        console.log(custPermanentAddress);

        if (custPermanentAddress.cityId != "" && custPermanentAddress.cityId != null && custPermanentAddress.cityId != undefined) {
          $("#first_City").val(custPermanentAddress.cityId);
        }



        if (custCorespondingAddress.cityId != "" && custCorespondingAddress.cityId != null && custCorespondingAddress.cityId != undefined) {
          $("#first_City1").val(custCorespondingAddress.cityId);
        }

        if (POAHolderDetails.cityId != "" && POAHolderDetails.cityId != null && POAHolderDetails.cityId != undefined) {
          $("#first_city_bck").val(POAHolderDetails.cityId);
        }

        if (bookingForData.coApplicentDetails.length == 1) {
          if (secondApplicantPermanentAddress.cityId != "" && secondApplicantPermanentAddress.cityId != null && secondApplicantPermanentAddress.cityId != undefined) {
            $("#second_City").val(secondApplicantPermanentAddress.cityId);
          }

          if (secondApplicantcorespondedAddress.cityId != "" && secondApplicantcorespondedAddress.cityId != null && secondApplicantcorespondedAddress.cityId != undefined) {
            $("#second_City1").val(secondApplicantcorespondedAddress.cityId);
          }



        }



        if (bookingForData.coApplicentDetails.length == 2) {

          if (secondApplicantPermanentAddress.cityId != "" && secondApplicantPermanentAddress.cityId != null && secondApplicantPermanentAddress.cityId != undefined) {
            $("#second_City").val(secondApplicantPermanentAddress.cityId);
          }

          if (secondApplicantcorespondedAddress.cityId != "" && secondApplicantcorespondedAddress.cityId != null && secondApplicantcorespondedAddress.cityId != undefined) {
            $("#second_City1").val(secondApplicantcorespondedAddress.cityId);
          }


          if (thirdApplicantPermanentAddress.cityId != "" && thirdApplicantPermanentAddress.cityId != null && thirdApplicantPermanentAddress.cityId != undefined) {
            $("#third_City").val(thirdApplicantPermanentAddress.cityId);
          }

          console.log(thirdApplicantPermanentAddress.cityId);
          console.log(thirdApplicantcorespondedAddress.cityId);
          if (thirdApplicantcorespondedAddress.cityId != "" && thirdApplicantcorespondedAddress.cityId != null && thirdApplicantcorespondedAddress.cityId != undefined) {
            $("#third_City1").val(thirdApplicantcorespondedAddress.cityId);
          }
        }



      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
      }
    }, error => {
      $('.page-loader-wrapper').hide();
      var error = JSON.parse(error._body).responseCode;
      if (error == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      }
    }

    )
  }



  state_list(country_id, item_name) {
    console.log(country_id);
    $('.page-loader-wrapper').show();
    this.service.getstate_list(country_id).then(resp => {
      console.log(resp);
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {

        if (item_name == "first_back") {
          $('#first_state_bck').html("");
          $('#first_state_bck').append('<option value="select">--Select--</option>');
          for (var i = 0; i < resp.responseObjList.length; i++) {
            $('#first_state_bck').append("<option value='" + resp.responseObjList[i].id + "'>" + resp.responseObjList[i].name + "</option>");
          }

        } else if (item_name == "first") {

          $('#first_State').html("");
          $('#first_State').append('<option value="select">--Select--</option>');
          for (var i = 0; i < resp.responseObjList.length; i++) {
            $('#first_State').append("<option value='" + resp.responseObjList[i].id + "'>" + resp.responseObjList[i].name + "</option>");
          }



        } else if (item_name == "first1") {

          $('#first_State1').html("");
          $('#first_State1').append('<option value="select">--Select--</option>');
          for (var i = 0; i < resp.responseObjList.length; i++) {
            $('#first_State1').append("<option value='" + resp.responseObjList[i].id + "'>" + resp.responseObjList[i].name + "</option>");
          }


        } else if (item_name == "second") {

          $('#second_State').html("");
          $('#second_State').append('<option value="select">--Select--</option>');
          for (var i = 0; i < resp.responseObjList.length; i++) {
            $('#second_State').append("<option value='" + resp.responseObjList[i].id + "'>" + resp.responseObjList[i].name + "</option>");
          }


        } else if (item_name == "second1") {

          $('#second_State1').html("");
          $('#second_State1').append('<option value="select">--Select--</option>');
          for (var i = 0; i < resp.responseObjList.length; i++) {
            $('#second_State1').append("<option value='" + resp.responseObjList[i].id + "'>" + resp.responseObjList[i].name + "</option>");
          }


        } else if (item_name == "third") {

          $('#third_State').html("");
          $('#third_State').append('<option value="select">--Select--</option>');
          for (var i = 0; i < resp.responseObjList.length; i++) {
            $('#third_State').append("<option value='" + resp.responseObjList[i].id + "'>" + resp.responseObjList[i].name + "</option>");
          }



        } else if (item_name == "third1") {

          $('#third_State1').html("");
          $('#third_State1').append('<option value="select">--Select--</option>');
          for (var i = 0; i < resp.responseObjList.length; i++) {
            $('#third_State1').append("<option value='" + resp.responseObjList[i].id + "'>" + resp.responseObjList[i].name + "</option>");
          }

        }




        if (custPermanentAddress.stateId != "" && custPermanentAddress.stateId != null && custPermanentAddress.stateId != undefined) {
          $("#first_State").val(custPermanentAddress.stateId);
        }


        if (custCorespondingAddress.stateId != "" && custCorespondingAddress.stateId != null && custCorespondingAddress.stateId != undefined) {
          $("#first_State1").val(custCorespondingAddress.stateId);
        }

        if (POAHolderDetails.stateId != "" && POAHolderDetails.stateId != null && POAHolderDetails.stateId != undefined) {
          $("#first_state_bck").val(POAHolderDetails.stateId);
        }

        if (bookingForData.coApplicentDetails.length == 1) {
          if (secondApplicantPermanentAddress.stateId != "" && secondApplicantPermanentAddress.stateId != null && secondApplicantPermanentAddress.stateId != undefined) {
            $("#second_State").val(secondApplicantPermanentAddress.stateId);
          }


          if (secondApplicantcorespondedAddress.stateId != "" && secondApplicantcorespondedAddress.stateId != null && secondApplicantcorespondedAddress.stateId != undefined) {
            $("#second_State1").val(secondApplicantcorespondedAddress.stateId);
          }



        }


        if (bookingForData.coApplicentDetails.length == 2) {

          if (secondApplicantPermanentAddress.stateId != "" && secondApplicantPermanentAddress.stateId != null && secondApplicantPermanentAddress.stateId != undefined) {
            $("#second_State").val(secondApplicantPermanentAddress.stateId);
          }


          if (secondApplicantcorespondedAddress.stateId != "" && secondApplicantcorespondedAddress.stateId != null && secondApplicantcorespondedAddress.stateId != undefined) {
            $("#second_State1").val(secondApplicantcorespondedAddress.stateId);
          }


          if (thirdApplicantPermanentAddress.stateId != "" && thirdApplicantPermanentAddress.stateId != null && thirdApplicantPermanentAddress.stateId != undefined) {
            $("#third_State").val(thirdApplicantPermanentAddress.stateId);
          }

          if (thirdApplicantcorespondedAddress.stateId != "" && thirdApplicantcorespondedAddress.stateId != null && thirdApplicantcorespondedAddress.stateId != undefined) {
            $("#third_State1").val(thirdApplicantcorespondedAddress.stateId);
          }
        }







      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
      }
    }, error => {
      $('.page-loader-wrapper').hide();
      var error = JSON.parse(error._body).responseCode;
      if (error == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      }
    }

    )
  }




  Scheme_Name(siteids) {
    $('.page-loader-wrapper').show();
    this.service.get_schemes_list(siteids).then(resp => {
      console.log(resp);
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {



        $('#Scheme_name').html("");
        $('#Scheme_name').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#Scheme_name').append("<option value='" + resp.responseObjList[i].percentage + "'>" + resp.responseObjList[i].finSchemeName + "</option>");
        }

        if (bookingForData.customerSchemeInfos[0].schemeName == "Regular") {
          if (bookingForData.customerSchemeInfos[0].percentageValue != null && bookingForData.customerSchemeInfos[0].percentageValue != undefined && bookingForData.customerSchemeInfos[0].percentageValue != "") {
            $("#Scheme_name").val(bookingForData.customerSchemeInfos[0].percentageValue);
          }
          $("#aaa_unit").hide();
        } else {
          $("#aaa_unit").show();
          if (bookingForData.customerSchemeInfos[0].percentageValue != null && bookingForData.customerSchemeInfos[0].percentageValue != undefined && bookingForData.customerSchemeInfos[0].percentageValue != "") {
            $("#Scheme_name").val(bookingForData.customerSchemeInfos[0].percentageValue);
          }

        }




      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
      }
    }, error => {
      $('.page-loader-wrapper').hide();
      var error = JSON.parse(error._body).responseCode;
      if (error == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      }
    }

    )

  }


  /*-----------------Getting Project(site) list Start---------------------*/
  Kyc_documents_list() {

    $('.page-loader-wrapper').show();
    this.service.getKycdocuments_list().then(resp => {

      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {

        this.kyc_controller = resp.responseObjList;


        console.log(this.kyc_controller);

        for (var i = 0; i < this.kyc_controller.length; i++) {
          this.disableread[i] = true;
        }



      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
      }
    }, error => {
      $('.page-loader-wrapper').hide();
      var error = JSON.parse(error._body).responseCode;
      if (error == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      }
    }

    )
  }

  /*-----------------Getting Project(site) list Start---------------------*/
  siteList() {
    var arr = localStorage.getItem('update_booking');
    console.log("suresh:" + arr);
    $('.page-loader-wrapper').show();
    this.service.ProjectDetails(JSON.parse(arr).map(String)).then(resp => {

      console.log(resp);
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('.projectname').html("");
        $('.projectname').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('.projectname').append("<option value='" + resp.responseObjList[i].id + "'>" + resp.responseObjList[i].salesforceSiteName + "</option>");
        }

        if (unitDetails.siteInfo.siteId != null && unitDetails.siteInfo.siteId != "" && unitDetails.siteInfo.siteId != undefined) {

          unit_projectname_id = unitDetails.siteInfo.siteId;
          unit_project_name = unitDetails.siteInfo.name;


          $("#unit_project").val(unitDetails.siteInfo.siteId);
          this.get_oldsalesforesbg(unitDetails.siteInfo.siteId);
          this.projectchangeFun(unitDetails.siteInfo.siteId);
          this.Scheme_Name(unitDetails.siteInfo.siteId);
        }



      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
      }
    }, error => {
      $('.page-loader-wrapper').hide();
      var error = JSON.parse(error._body).responseCode;
      if (error == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      }
    }

    )
  }


  /*------------------------Projects On Change Functionality Start--------------------*/
  get_oldsalesforesbg(selectedSiteID) {
    $('.page-loader-wrapper').show();
    this.service.get_oldsalesforesbookingid(selectedSiteID).then(resp => {
      console.log(resp);

      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#unit_oldbooking_name').html("");
        $('#unit_oldbooking_name').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#unit_oldbooking_name').append("<option value='" + resp.responseObjList[i].salesforceBookingId + "'>" + resp.responseObjList[i].salesforceBookingId + "</option>");
        }

        console.log(bookingForData.flatBookingInfo.OldBookingName);
        if (bookingForData.flatBookingInfo.OldBookingName != undefined && bookingForData.flatBookingInfo.OldBookingName != null && bookingForData.flatBookingInfo.OldBookingName != "select") {
          $('#unit_oldbooking_name').val(bookingForData.flatBookingInfo.OldBookingName);
        }
        old_flatbooking_name = bookingForData.flatBookingInfo.OldBookingName
        if (bookingForData.flatBookingInfo.NewBookingReason != undefined && bookingForData.flatBookingInfo.NewBookingReason != null && bookingForData.flatBookingInfo.NewBookingReason != "") {
          $("#unit_new_booking_reason").val(bookingForData.flatBookingInfo.NewBookingReason);
        }





      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
      }
    }, error => {
      $('.page-loader-wrapper').hide();
      var error = JSON.parse(error._body).responseCode;
      if (error == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      }
    }
    );
  }
  /*------------------------Projects On Change Functionality End--------------------*/



  /*------------------------Projects On Change Functionality Start--------------------*/
  projectchangeFun(selectedSiteID) {
    $('.page-loader-wrapper').show();
    this.service.getFlat_details(selectedSiteID).then(resp => {

      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#unit_block').html("");
        $('#unit_block').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#unit_block').append("<option value='" + resp.responseObjList[i].blockDetId + "'>" + resp.responseObjList[i].blockName + "</option>");
        }

        if (unitDetails.blockInfo.blockId != null && unitDetails.blockInfo.blockId != "" && unitDetails.blockInfo.blockId != undefined) {

          unit_blockname_id = unitDetails.blockInfo.blockId;
          unit_block_name = unitDetails.blockInfo.name;

          $("#unit_block").val(unitDetails.blockInfo.blockId);
          this.blockchangeFun(unitDetails.siteInfo.siteId, unitDetails.blockInfo.blockId);
        }


      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
      }
    }, error => {
      $('.page-loader-wrapper').hide();
      var error = JSON.parse(error._body).responseCode;
      if (error == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      }
    }
    );
  }
  /*------------------------Projects On Change Functionality End--------------------*/




 
  blockchangeFun(projectid, blockid) {

    $('.page-loader-wrapper').show();
    this.service.getblock_details(projectid, blockid).then(resp => {

      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#unit_floor').html("");
        $('#unit_floor').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#unit_floor').append("<option value='" + resp.responseObjList[i].floorDetId + "'>" + resp.responseObjList[i].floorName + "</option>");
        }


        if (unitDetails.flatInfo.floorDetId != null && unitDetails.flatInfo.floorDetId != "" && unitDetails.flatInfo.floorDetId != undefined) {

          unit_floorname_id = unitDetails.floorInfo.floorId;
          unit_floorname_name = unitDetails.floorInfo.floorName;

        


          $("#unit_floor").val(unitDetails.flatInfo.floorDetId);
          // this.blockchangeFun(unitDetails.siteInfo.siteId, unitDetails.blockInfo.blockId);
          this.floorchangeFun(unitDetails.siteInfo.siteId, unitDetails.blockInfo.blockId, unitDetails.flatInfo.floorDetId);

        }


      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
      }
    }, error => {
      $('.page-loader-wrapper').hide();
      var error = JSON.parse(error._body).responseCode;
      if (error == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      }
    }
    );
  }



  floorchangeFun(projectid, blockid, floorDetId) {
    $('.page-loader-wrapper').show();
    this.service.getunit_details(projectid, blockid, floorDetId).then(resp => {

      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#unitno').html("");
        $('#unitno').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#unitno').append("<option value='" + resp.responseObjList[i].flatId + "'>" + resp.responseObjList[i].flatNo + "</option>");
        }

        if (unitDetails.flatInfo.flatId != null && unitDetails.flatInfo.flatId != "" && unitDetails.flatInfo.flatId != undefined) {

          unit_flatname_id = unitDetails.flatInfo.flatId;
          unit_flatname_name = unitDetails.flatInfo.flatNo;

          console.log(unitDetails);
          console.log(unitDetails.flatInfo.flatId);
          $("#unitno").val(unitDetails.flatInfo.flatNo);
          //$("#third_namePrefix").trigger('change');

          // this.blockchangeFun(unitDetails.siteInfo.siteId, unitDetails.blockInfo.blockId);
          // this.floorchangeFun(unitDetails.siteInfo.siteId, unitDetails.blockInfo.blockId, unitDetails.flatInfo.floorDetId);

        }


      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
      }
    }, error => {
      $('.page-loader-wrapper').hide();
      var error = JSON.parse(error._body).responseCode;
      if (error == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      }
    }
    );
  }


  unitnochangeFun(flatids) {
    $('.page-loader-wrapper').show();
    this.service.get_unitbooking_details(flatids).then(resp => {

      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        this.aminitiesList_controller = resp.responseObjList.aminitiesList;
        this.sbua = resp.responseObjList.flatDetailsPojos[0].sbua;
        this.carpetArea = resp.responseObjList.flatDetailsPojos[0].carpetArea;
        // this.flatDetailsPojos = resp.responseObjList.flatDetailsPojos[0].carpetArea;

        for (var i = 0; i < this.aminitiesList_controller.length; i++) {


          total_controller_ami += parseFloat(this.aminitiesList_controller[i].totalCost);

          $("#unit_amenitiesFlatCost").val(total_controller_ami);



        }



      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
      }
    }, error => {
      $('.page-loader-wrapper').hide();
      var error = JSON.parse(error._body).responseCode;
      if (error == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      }
    }
    );

  }

  changecheckboxStatus(event, index, item) {
    const checked = item.target.checked;
    if (checked == true) {
      for (var i = 0; i < this.kyc_controller.length; i++) {
        if (this.kyc_controller[i].documentId == event.documentId) {
          if (this.kyc_controller[i].status != true) {
            this.kyc_controller[i].status = "true";
          }
        }
      }
    } else {
      for (var i = 0; i < this.kyc_controller.length; i++) {
        if (this.kyc_controller[i].documentId == event.documentId) {
          this.kyc_controller[i].status = "false";
        }
      }
      for (var i = 0; i < this.kyc_controller.length; i++) {
        if (this.kyc_controller[i].documentId == event.documentId) {
          if (this.kyc_controller[i].files != null) {
            this.kyc_controller[i].files = null;

            this.controller_data = [];
            $("#fileInputId" + i).val(null);
          }
        }
      }
    }
    this.disableread[index] = !this.disableread[index];

    console.log(this.kyc_controller);
  }

  submitfun() {
    customerBookingFormInfoList = [];
    this.demo = [];
    // for (var i = 0; i < this.kyc_controller.length; i++) {
    //   if (this.kyc_controller[i].status == "true") {

    //     if (this.kyc_controller[i].files != null) {
    //       if (this.kyc_controller[i].files.length == 0) {
    //         swal("Please select the Kyc upload Documents");
    //         return false;
    //       }
    //     } else {
    //       swal("Please select the Kyc upload Documents");
    //       return false;
    //     }


    //     this.demo.push(this.kyc_controller[i].status);
    //   }



    // }

    // if (this.demo.length == 0) {
    //   swal("Please select the Kyc  Documents");
    //   return false;
    // }


    console.log(this.kyc_controller);

    // --------------------------FIRST APPLICANT (MANDATORY) start---------------------

    this.first_namePrefix = $("#first_namePrefix").val();
    this.first_mr = $("#first_mr").val();
    this.first_Relation_with = $("#first_Relation_with").val();
    this.first_relationnamePrefix = $("#first_relationnamePrefix").val();
    this.first_relation_name = $("#first_relation_name").val();
    this.dob_first = $("#dob_first").val();

    this.first_marrital_status = $("#first_marrital_status").val();
    this.doa_first = $("#doa_first").val();

    this.Permanent_first = $("#Permanent_first").val();
    this.first_country = $("#first_country").val();
    this.first_City = $("#first_City").val();
    this.first_State = $("#first_State").val();
    this.first_pincode = $("#first_pincode").val();

    this.first_Correspondence = $("#first_Correspondence").val();
    this.first_country1 = $("#first_country1").val();
    this.first_City1 = $("#first_City1").val();
    this.first_State1 = $("#first_State1").val();
    this.first_pincode1 = $("#first_pincode1").val();

    this.first_tel = $("#first_tel").val();
    this.first_mobile = $("#first_mobile").val();
    this.first_email = $("#first_email").val();
    this.pan_no_first = $("#pan_no_first").val();
    this.nationality_first = $("#nationality_first").val();



    this.aadhaar_no_first = $("#aadhaar_no_first").val();

    this.passport_no_first = $("#passport_no_first").val();

    this.first_designation = $("#first_designation").val();
    this.first_name_of_organisation = $("#first_name_of_organisation").val();
    this.first_address_of_organisation = $("#first_address_of_organisation").val();
    this.first_office_number = $("#first_office_number").val();
    this.first_office_email_id = $("#first_office_email_id").val();
    this.first_organizational_type = $("#first_organizational_type").val();
    this.first_industry_sector_of_work = $("#first_industry_sector_of_work").val();
    this.first_work_function_role = $("#first_work_function_role").val();
    this.first_number_of_years = $("#first_number_of_years").val();

    this.first_education_qualification = $("#first_education_qualification").val();
    this.first_annual_household = $("#first_annual_household").val();
    //this.first_how_did_get_to_know = $("#first_how_did_get_to_know").val();

    this.first_purpose_of_purchase = $("#first_purpose_of_purchase").val();
    this.first_current_residential_status = $("#first_current_residential_status").val();


    this.first_name_of_poa_holder = $("#first_name_of_poa_holder").val();
    this.first_tel_bck = $("#first_tel_bck").val();
    this.first_mobile_number_bck = $("#first_mobile_number_bck").val();
    this.first_email_bck = $("#first_email_bck").val();
    this.first_address_back = $("#first_address_back").val();
    this.first_city_bck = $("#first_city_bck").val();
    this.first_state_bck = $("#first_state_bck").val();
    this.first_pincode_bck = $("#first_pincode_bck").val();


    if (this.first_namePrefix == "select" || this.first_namePrefix == null) {
      swal("Please select the first applicate name prefix");
      return false;
    }

    if (this.first_mr == "") {
      swal("Please enter the first applicate customer name");
      return false;
    }


    if (this.first_Relation_with == "select" || this.first_Relation_with == null) {
      swal("Please select the first applicate relation with");
      return false;
    }

    if (this.first_relationnamePrefix == "select" || this.first_relationnamePrefix == null) {
      swal("Please select the first applicate relation name prefix");
      return false;
    }

    if (this.first_relation_name == "select" || this.first_relation_name == "") {
      swal("Please enter the first applicate relation name");
      return false;
    }


    // if(this.first_marrital_status == "select" && this.first_marrital_status == "" && this.first_marrital_status == undefined){
    //   swal("Please enter the first applicate marrital status");
    //   return false;
    // }

    if (this.Permanent_first == "") {
      swal("Please enter the first applicate permanent address");
      return false;
    }





    if (this.first_country == "select" || this.first_country == null) {
      this.first_country == null
      //  swal("Please select the first applicate country");
      //  return false;
    }

    if (this.first_State == "select" || this.first_State == null) {
      this.first_State == null
      //  swal("Please select the first applicate state");
      //  return false;
    }

    if (this.first_City == "select" || this.first_City == null || this.first_City == "") {
      this.first_City == null
      // swal("Please select the first applicate city");
      //  return false;
    }

    if (this.first_pincode == "" || this.first_pincode == null) {
      swal("Please enter the first applicate pincode");
      return false;
    }

    if (this.first_Correspondence == "") {
      swal("Please enter the first applicate Correspondence address");
      return false;
    }







    if (this.first_country1 == "select" || this.first_country1 == null) {
      this.first_country1 == null
      //  swal("Please select the first applicate country");
      //  return false;
    }


    if (this.first_State1 == "select" || this.first_State1 == null) {
      this.first_State1 == null
      //  swal("Please select the first applicate state");
      //  return false;
    }

    if (this.first_City1 == "select" || this.first_City1 == null || this.first_City1 == "") {
      this.first_City1 == null
      //  swal("Please select the first applicate city");
      //  return false;
    }


    if (this.first_pincode1 == "" || this.first_pincode1 == null) {
      swal("Please enter the first applicate pincode");
      return false;
    }


    if (this.first_mobile == "") {
      swal("Please enter the first applicate mobile number");
      return false;
    }

    if (this.first_email == "") {
      swal("Please enter the first applicate email");
      return false;
    }

    var email = this.first_email;
    var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (!regex.test(email)) {

      swal("Please enter the first applicant valid email");
      return false;
    }
    if (this.pan_no_first == "") {
      swal("Please enter the first applicate PAN number");
      return false;
    }



    if (this.nationality_first == "" || this.nationality_first == undefined || this.nationality_first == null) {
      swal("Please enter the first applicate  nationality");
      return false;
    }

    if (this.aadhaar_no_first == "" && $("#passport_no_first").val() == "") {
      swal("Please enter the first applicate passport (or) aadhar number");
      return false;
    }



    // if (this.aadhaar_no_first == "") {
    //   swal("Please enter the first applicate aadhar number");
    //   return false;
    // }

    if (this.dob_first == null || this.dob_first == "" || this.dob_first == "select" || this.dob_first == undefined || this.dob_first == "undefined") {
      this.dob_first = null;
    } else {
      this.dob_first = $("#dob_first").val();
    }

    if (this.first_namePrefix == undefined || this.first_namePrefix == "" || this.first_namePrefix == null) {
      this.first_namePrefix = null;
    }

    if (this.first_mr == undefined || this.first_mr == "" || this.first_mr == null) {
      this.first_mr = null;
    }

    if (this.dob_first == undefined || this.dob_first == "" || this.dob_first == null) {
      this.dob_first = null;
    }

    if (this.nationality_first == undefined || this.nationality_first == "" || this.nationality_first == null) {
      this.nationality_first = null;
    }

    if (this.aadhaar_no_first == undefined || this.aadhaar_no_first == "" || this.aadhaar_no_first == null) {
      this.aadhaar_no_first = null;
    }

    if (this.pan_no_first == undefined || this.pan_no_first == "" || this.pan_no_first == null) {
      this.pan_no_first = null;
    }


    if (this.first_relationnamePrefix == undefined || this.first_relationnamePrefix == "" || this.first_relationnamePrefix == null) {
      this.first_relationnamePrefix = null;
    }

    if (this.first_relation_name == undefined || this.first_relation_name == "" || this.first_relation_name == null) {
      this.first_relation_name = null;
    }
    if (this.first_Relation_with == undefined || this.first_Relation_with == "" || this.first_Relation_with == null) {
      this.first_Relation_with = null;
    }


    var customerInfo = {
      "customerId": 1,
      "namePrefix": this.first_namePrefix,
      "firstName": this.first_mr,
      "lastName": null,
      "gender": null,
      "age": null,
      "dob": this.dob_first,
      "profilePic": null,
      "nationality": this.nationality_first,
      "adharNumber": this.aadhaar_no_first,
      "passport": this.passport_no_first,
      "pancard": this.pan_no_first,
      "voterId": null,
      "relationNamePrefix": this.first_relationnamePrefix,
      "relationName": this.first_relation_name,
      "relationWith": this.first_Relation_with,
      "statusId": null,
      "createdDate": null,
      "updatedDate": null

    }




    if (this.first_pincode == undefined || this.first_pincode == "" || this.first_pincode == null) {
      this.first_pincode = null;
    }

    if (first_perment_cityid == undefined || first_perment_cityid == "" || first_perment_cityid == null) {
      first_perment_cityid = null;
    }

    if (first_perment_city_name == undefined || first_perment_city_name == "" || first_perment_city_name == null) {
      first_perment_city_name = null;
    }

    if (first_perment_stateid == undefined || first_perment_stateid == "" || first_perment_stateid == null) {
      first_perment_stateid = null;
    }

    if (first_perment_state_name == undefined || first_perment_state_name == "" || first_perment_state_name == null) {
      first_perment_state_name = null;
    }

    if (first_perment_country_name == undefined || first_perment_country_name == "" || first_perment_country_name == null) {
      first_perment_country_name = null;
    }

    if (this.Permanent_first == undefined || this.Permanent_first == "" || this.Permanent_first == null) {
      this.Permanent_first = null;
    }

    if (first_perment_countryid == undefined || first_perment_countryid == "" || first_perment_countryid == null) {
      first_perment_countryid = null;
    }

    var CoAppaddressInfosone = [];
    var CoAppaddressInfos1 = {
      "addressId": null,
      "custAddressId": null,
      "floorNo": null,
      "tower": null,
      "street": null,
      "area": null,
      "landmark": null,
      "pincode": this.first_pincode,
      "cityId": first_perment_cityid,
      "city": first_perment_city_name,
      "cityIcon": null,
      "stateId": first_perment_stateid,
      "state": first_perment_state_name,
      "country": first_perment_country_name,

      "langitude": null,
      "latitude": null,
      "createdDate": null,
      "updatedDate": null,
      "addressType": null,
      "address1": this.Permanent_first,
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
      "addressMappingType": {
        "addressMappingTypeId": null,
        "typeId": 1,
        "type": null,
        "metaType": "CUSTOMER",
        "addressType": "permenent",
        "addressId": null
      },
      "countryId": first_perment_countryid,
    }
    CoAppaddressInfosone.push(CoAppaddressInfos1);


    if (this.first_pincode1 == undefined || this.first_pincode1 == "" || this.first_pincode1 == null) {
      this.first_pincode1 = null;
    }

    if (first_perment_cityid1 == undefined || first_perment_cityid1 == "" || first_perment_cityid1 == null) {
      first_perment_cityid1 = null;
    }

    if (first_perment_city_name1 == undefined || first_perment_city_name1 == "" || first_perment_city_name1 == null) {
      first_perment_city_name1 = null;
    }

    if (first_perment_stateid1 == undefined || first_perment_stateid1 == "" || first_perment_stateid1 == null) {
      first_perment_stateid1 = null;
    }

    if (first_perment_state_name1 == undefined || first_perment_state_name1 == "" || first_perment_state_name1 == null) {
      first_perment_state_name1 = null;
    }


    if (first_perment_country_name1 == undefined || first_perment_country_name1 == "" || first_perment_country_name1 == null) {
      first_perment_country_name1 = null;
    }

    if (this.first_Correspondence == undefined || this.first_Correspondence == "" || this.first_Correspondence == null) {
      this.first_Correspondence = null;
    }

    if (first_perment_countryid1 == undefined || first_perment_countryid1 == "" || first_perment_countryid1 == null) {
      first_perment_countryid1 = null;
    }

    var CoAppaddressInfos2 = {
      "addressId": null,
      "custAddressId": null,
      "floorNo": null,
      "tower": null,
      "street": null,
      "area": null,
      "landmark": null,
      "pincode": this.first_pincode1,
      "cityId": first_perment_cityid1,
      "city": first_perment_city_name1,
      "cityIcon": null,
      "stateId": first_perment_stateid1,
      "state": first_perment_state_name1,
      "country": first_perment_country_name1,
      "langitude": null,
      "latitude": null,
      "createdDate": null,
      "updatedDate": null,
      "addressType": null,
      "address1": this.first_Correspondence,
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
        "metaType": "CUSTOMER",
        "addressType": "Correspondence",
        "addressId": null
      },
      "countryId": first_perment_countryid1,

    }
    CoAppaddressInfosone.push(CoAppaddressInfos2);





    if (this.first_designation == "" || this.first_designation == null || this.first_designation == undefined) {
      this.first_designation = null;
      //swal("Please enter the first applicate designation");
      //return false;
    }

    if (this.first_name_of_organisation == "" || this.first_name_of_organisation == null || this.first_name_of_organisation == undefined) {

      this.first_name_of_organisation = null;
      // swal("Please enter the first applicate Name of Organisation/ Business");
      // return false;
    }

    if (this.first_address_of_organisation == "" || this.first_address_of_organisation == null || this.first_address_of_organisation == undefined) {
      this.first_address_of_organisation = null;
      //  swal("Please enter the first applicate Address of Organisation/ Business");
      // return false;
    }

    if (this.first_office_number == "" || this.first_office_number == null || this.first_office_number == undefined) {
      this.first_office_number = null;
      // swal("Please enter the first applicate Office Number");
      //return false;
    }

    if (this.first_office_email_id == "" || this.first_office_email_id == null || this.first_office_email_id == undefined) {
      this.first_office_email_id = null;

      // swal("Please enter the first applicate Office Email Id");
      //return false;
    }


    if (this.first_organizational_type == "" || this.first_organizational_type == null || this.first_organizational_type == undefined) {

      this.first_organizational_type = null;

      //  swal("Please enter the first applicate Organizational Type");
      // return false;
    }

    if (this.first_industry_sector_of_work == "" || this.first_industry_sector_of_work == null || this.first_industry_sector_of_work == undefined) {

      this.first_industry_sector_of_work = null;

      //swal("Please enter the first applicate Industry Sector of work/ Business ");
      //return false;
    }

    if (this.first_work_function_role == "" || this.first_work_function_role == null || this.first_work_function_role == undefined) {
      this.first_work_function_role = null;

      // swal("Please enter the first applicate Work Function/ Role");
      //return false;
    }

    if (this.first_number_of_years == "" || this.first_number_of_years == null || this.first_number_of_years == undefined) {
      this.first_number_of_years = null;

      //swal("Please enter the first applicate Number of years of work Experience");
      //return false;
    }

    if (this.first_education_qualification == "" || this.first_education_qualification == null || this.first_education_qualification == undefined) {

      this.first_education_qualification = null;
      // swal("Please enter the first applicate Education Qualification ");
      // return false;
    }

    if (this.first_annual_household == "" || this.first_annual_household == null || this.first_annual_household == undefined) {
      this.first_annual_household = null;

      //  swal("Please enter the first applicate Annual Household Income (Rupees) ");
      //  return false;
    }


    var professionalInfo = {
      "designation": this.first_designation,
      "nameOfOrganization": this.first_name_of_organisation,
      "addressOfOrganization": this.first_address_of_organisation,
      "officeNumber": this.first_office_number,
      "officeEmailId": this.first_office_email_id,
      "custProffisionalId": null,
      "statusId": null,
      "createdDate": null,
      "modifiedDate": null,
      "oraganizationDetails": {
        "organizationTypeId": null,
        "organizationTypeName": this.first_organizational_type,
        "ifOtherOrgTypeName": this.first_designation
      },
      "sectorDetailsInfo": {
        "workSectorId": null,
        "workSectorName": this.first_industry_sector_of_work,
        "ifOtherWorkSectorName": this.first_name_of_organisation
      },
      "workFunctionInfo": {
        "workFunctionId": null,
        "workFunctionName": this.first_work_function_role,
        "ifOtherworkFunctionName": null
      },
      "yearsOfExperience": this.first_number_of_years
    }


    if ($("#unit_LeadId").val() == "" || $("#unit_LeadId").val() == null || $("#unit_LeadId").val() == undefined) {
      var myDate = new Date();
      var result = myDate.getTime();
      this.leadid = result;
    } else {
      this.leadid = $("#unit_LeadId").val();
    }

    if (this.first_name_of_poa_holder == null || this.first_name_of_poa_holder == undefined || this.first_name_of_poa_holder == "select" || this.first_name_of_poa_holder == "") {
      this.first_name_of_poa_holder = null;
    }

    if (this.first_tel_bck == null || this.first_tel_bck == undefined || this.first_tel_bck == "select" || this.first_tel_bck == "") {
      this.first_tel_bck = null;
    }

    if (this.first_mobile_number_bck == null || this.first_mobile_number_bck == undefined || this.first_mobile_number_bck == "select" || this.first_mobile_number_bck == "") {
      this.first_mobile_number_bck = null;
    }

    if (this.first_email_bck == null || this.first_email_bck == undefined || this.first_email_bck == "select" || this.first_email_bck == "") {
      this.first_email_bck = null;
    }

    if (this.first_address_back == null || this.first_address_back == undefined || this.first_address_back == "select" || this.first_address_back == "") {
      this.first_address_back = null;
    }

    if (first_city_bck_val == null || first_city_bck_val == undefined || first_city_bck_val == "select" || first_city_bck_val == "") {
      first_city_bck_val = null;
    }

    if (first_state_bck_val == null || first_state_bck_val == undefined || first_state_bck_val == "select" || first_state_bck_val == "") {
      first_state_bck_val = null;
    }

    if (this.first_pincode_bck == null || this.first_pincode_bck == undefined || this.first_pincode_bck == "select" || this.first_pincode_bck == "") {
      this.first_pincode_bck = null;
    }

    if (changeradiobutton_val == null || changeradiobutton_val == undefined || changeradiobutton_val == "") {
      changeradiobutton_val = null;
    }


    if (this.first_purpose_of_purchase == null || this.first_purpose_of_purchase == undefined || this.first_purpose_of_purchase == "") {
      this.first_purpose_of_purchase = null;
    }

    if (this.first_current_residential_status == null || this.first_current_residential_status == undefined || this.first_current_residential_status == "") {
      this.first_current_residential_status = null;
    }

    // if (this.first_how_did_get_to_know == null || this.first_how_did_get_to_know == undefined || this.first_how_did_get_to_know == "") {
    //   this.first_how_did_get_to_know = null;
    // }

    var myDate = new Date();
    var result = myDate.getTime();
    console.log(result);

    var customerApplicationInfo = {
      "custAppId": null,
      "siteId": null,
      "unit": null,
      "leadId": this.leadid,
      "ackId": null,
      "appNo": null,
      "blockId": null,
      "statusId": null,
      "createdDate": null,
      "modifiedDate": null,
      "flatBookId": null,
      "reasonForNoKYC": null,
      "stmId": null
    }

    var customerOtherDetailsInfo = {
      "applicationNumber": null,
      "empIdOfSTM": null,
      "empNameOfSTM": null,
      "purposeofPurchase": this.first_purpose_of_purchase,
      "currentResidentialStatus": this.first_current_residential_status,
      "referenceId": null,
      "referenceName": null,
      "referenceStatus": null,
      "haveYouOwnedSumadhuraHome": changeradiobutton_val,
      "haveYouOwnedSumadhuraHomeIfYesProjectName": null,
      "haveYouOwnedSumadhuraHomeIfYesUnitNo": null,
      "referencesFriend": {
        "referencesFriendId": null,
        "referenceFreindsorFamilyName": null
      },
      "referencesCustomer": {
        "referencesCustomerId": null,
        "customerId": null,
        "customerName": null,
        "projectName": null,
        "unitNo": null,
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
        "channelPartnerName": null,
        "channelPartnerCompanyName": null,
        "channelPartnerCPID": null,
        "channelPartnerRERANO": null
      },
      "poadetailsInfo": {
        "nameOfPOA": this.first_name_of_poa_holder,
        "telOfPOA": this.first_tel_bck,
        "mobileNumOfPOA": this.first_mobile_number_bck,
        "emailOfPOA": this.first_email_bck,
        "addressOfPOA": this.first_address_back,
        "cityOfPOA": first_city_bck_text,
        "stateOfPOA": first_state_bck_text,
        "pincodeOfPOA": this.first_pincode_bck,
        "telePhone": null,
        "statusId": null,
        "stateId": first_state_bck_val,
        "cityId": first_city_bck_val,
        "createdDate": null,
        "modifiedDate": null,
        "poaHolderId": null,
        "country": first_country_back_text,
        "countryId": first_country_back_val
      }
    }





    this.unit_experience_with_sumadhura = $("#unit_experience_with_sumadhura").val();

    if (this.unit_experience_with_sumadhura == "" || this.unit_experience_with_sumadhura == undefined) {
      this.unit_experience_with_sumadhura = null;
    }

    if ($("#unit_LeadId").val() == "" || $("#unit_LeadId").val() == null || $("#unit_LeadId").val() == undefined) {
      var myDate = new Date();
      var result = myDate.getTime();
      this.leadid = result;
    } else {
      this.leadid = $("#unit_LeadId").val();
    }


    if (first_marrital_statusdata == "" || first_marrital_statusdata == "select" || first_marrital_statusdata == undefined || first_marrital_statusdata == null) {
      first_marrital_statusdata = null;
    }

    if ($("#doa_first").val() == "" || $("#doa_first").val() == undefined || $("#doa_first").val() == "select" || $("#doa_first").val() == undefined) {
      this.doa_first_name = null;
    } else {
      this.doa_first_name = $("#doa_first").val();
    }


    if ($("#hod_first").val() == "" || $("#hod_first").val() == undefined || $("#hod_first").val() == "select" || $("#hod_first").val() == undefined) {
      this.handing_over_date_first_applicant = null;
    } else {
      this.handing_over_date_first_applicant = $("#hod_first").val();
    }

    if ($("#rd_first").val() == "" || $("#rd_first").val() == undefined || $("#rd_first").val() == "select" || $("#rd_first").val() == undefined) {
      this.registration_date_first_applicant = null;
    } else {
      this.registration_date_first_applicant = $("#rd_first").val();
    }

    if (this.first_mobile == undefined || this.first_mobile == "" || this.first_mobile == null) {
      this.first_mobile = null;
    }
    if (this.first_tel == undefined || this.first_tel == "" || this.first_tel == null) {
      this.first_tel = null;
    }

    if (this.first_email == undefined || this.first_email == "" || this.first_email == null) {
      this.first_email = null;
    }

    if (this.first_education_qualification == undefined || this.first_education_qualification == "" || this.first_education_qualification == null) {
      this.first_education_qualification = null;
    }

    if (this.first_annual_household == undefined || this.first_annual_household == "" || this.first_annual_household == null) {
      this.first_annual_household = null;
    }

    if (this.unit_experience_with_sumadhura == undefined || this.unit_experience_with_sumadhura == "" || this.unit_experience_with_sumadhura == null) {
      this.unit_experience_with_sumadhura = null;
    }

    var myDate = new Date();
    var result = myDate.getTime();
    console.log(result);

    var customerBookingInfo = {
      "custBookInfoId": null,
      "phoneNo": this.first_mobile,
      "alternatePhoneNo": null,
      "telePhone": this.first_tel,
      "email": this.first_email,
      "maritalStatus": first_marrital_statusdata,
      "documentsUpload": null,
      "custAppId": null,
      "dateOfAnniversery": this.doa_first_name,

      "salesTeamEmpId": null,
      "salesTeamEmpName": null,
      "salesTeamLeadId": this.leadid,
      "salesTeamLeadName": null,
      "workExperience": null,
      "educationalQualification": this.first_education_qualification,
      "annualHouseHoldIncome": this.first_annual_household,
      "custProffisionalId": null,
      "overallExperienceWithSumadhura": this.unit_experience_with_sumadhura,
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


    console.log("First applicant setails :" + JSON.stringify(customerBookingInfo))


    // --------------------------SECOND APPLICANT (MANDATORY) ---------------------
    this.second_namePrefix = $("#second_namePrefix").val();
    this.second_mrs = $("#second_mrs").val();
    this.second_Relation_with = $("#second_Relation_with").val();
    this.second_relationnamePrefix = $("#second_relationnamePrefix").val();
    this.second_relation_name = $("#second_relation_name").val();
    this.second_dob = $("#second_dob").val();
    this.second_wof = $("#second_wof").val();
    this.second_Marrital_status = $("#second_Marrital_status").val();
    this.doa_second = $("#doa_second").val();

    this.second_permanent = $("#second_permanent").val();
    this.second_Country = $("#second_Country").val();
    this.second_City = $("#second_City").val();
    this.second_State = $("#second_State").val();
    this.second_pincode = $("#second_pincode").val();
    this.second_Correspondence = $("#second_Correspondence").val();
    this.second_Country1 = $("#second_Country1").val();
    this.second_City1 = $("#second_City1").val();
    this.second_State1 = $("#second_State1").val();
    this.second_pincode1 = $("#second_pincode1").val();

    this.second_tel = $("#second_tel").val();
    this.second_mobile = $("#second_mobile").val();
    this.second_email = $("#second_email").val();
    this.second_pan_no = $("#second_pan_no").val();
    this.second_nationality = $("#second_nationality").val();
    this.second_aadhaar_no = $("#second_aadhaar_no").val();

    this.passport_no_second = $("#passport_no_second").val();

    this.second_Designation = $("#second_Designation").val();
    this.second_name_of_organisation = $("#second_name_of_organisation").val();
    this.second_of_organisation = $("#second_of_organisation").val();
    this.second_office_number = $("#second_office_number").val();
    this.second_office_emailid = $("#second_office_emailid").val();
    this.Second_Organisation_type = $("#Second_Organisation_type").val();
    this.second_Industry_sector = $("#second_Industry_sector").val();
    this.second_work_function_role = $("#second_work_function_role").val();
    this.second_number_of_years = $("#second_number_of_years").val();
    this.second_education_qualification = $("#second_education_qualification").val();
    this.second_Annual_household = $("#second_Annual_household").val();







    if (this.secondform_validation == true) {

      if (this.second_namePrefix == "select" || this.second_namePrefix == null) {
        swal("Please select the second applicate name prefix");
        return false;
      }

      if (this.second_mrs == "") {
        swal("Please enter the second applicate customer name");
        return false;
      }


      if (this.second_Relation_with == "select" || this.second_Relation_with == null) {
        swal("Please select the second applicate relation with");
        return false;
      }

      if (this.second_relationnamePrefix == "select" || this.second_relationnamePrefix == null) {
        swal("Please select the second applicate relation name prefix");
        return false;
      }

      if (this.second_relation_name == "select" || this.second_relation_name == "") {
        swal("Please enter the second applicate relation name");
        return false;
      }


      // if(this.second_Marrital_status == "select" && this.second_Marrital_status == "" && this.second_Marrital_status == undefined){
      //   swal("Please enter the second applicate marrital status");
      //   return false;
      // }



      if (this.second_permanent == "") {
        swal("Please enter the second applicate permanent address");
        return false;
      }






      if (this.second_Country == "select" || this.second_Country == null) {
        this.second_Country == null
        // swal("Please select the second applicate country");
        // return false;
      }

      if (this.second_State == "select" || this.second_State == null) {
        this.second_State == null
        // swal("Please select the second applicate state");
        //  return false;
      }

      if (this.second_City == "select" || this.second_City == null || this.second_City == "") {
        this.second_City == null
        //  swal("Please select the second applicate city");
        //  return false;
      }



      if (this.second_pincode == "" || this.second_pincode == null) {
        swal("Please enter the second applicate pincode");
        return false;
      }

      if (this.second_Correspondence == "") {
        swal("Please enter the second applicate Correspondence address");
        return false;
      }







      if (this.second_Country1 == "select" || this.second_Country1 == null) {
        this.second_Country1 == null
        //  swal("Please select the second applicate country");
        //  return false;
      }

      if (this.second_State1 == "select" || this.second_State1 == null) {
        this.second_State1 == null
        //  swal("Please select the second applicate state");
        //  return false;
      }

      if (this.second_City1 == "select" || this.second_City1 == null || this.second_City1 == "") {
        this.second_City1 == null
        // swal("Please select the second applicate city");
        //  return false;
      }


      if (this.second_pincode1 == "" || this.second_pincode1 == null) {
        swal("Please enter the second applicate pincode");
        return false;
      }


      if (this.first_mobile == "") {
        swal("Please enter the  second applicant mobile number");
        return false;
      }

      // if (this.second_email == "") {
      //   swal("Please enter the second applicant email");
      //   return false;
      // }

      var email = this.second_email;
      var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

      if (!regex.test(email)) {

        swal("Please enter the second applicant valid email");
        return false;
      }



      if (this.second_pan_no == "") {
        swal("Please enter the second applicant PAN number");
        return false;
      }


      if (this.second_nationality == "" || this.second_nationality == undefined || this.second_nationality == null) {
        swal("Please enter the second applicate  nationality");
        return false;
      }


      if (this.second_aadhaar_no == "" && $("#passport_no_second").val() == "") {
        swal("Please enter the second applicate passport (or) aadhar number");
        return false;
      }


      if (this.second_dob == null || this.second_dob == undefined || this.second_dob == "" || this.second_dob == "undefined") {
        this.second_dob = null;
      } else {
        this.second_dob = $("#second_dob").val();
      }


      if (this.second_namePrefix == undefined || this.second_namePrefix == "" || this.second_namePrefix == null) {
        this.second_namePrefix = null;
      }

      if (this.second_mrs == undefined || this.second_mrs == "" || this.second_mrs == null) {
        this.second_mrs = null;
      }

      if (this.second_dob == undefined || this.second_dob == "" || this.second_dob == null) {
        this.second_dob = null;
      }

      if (this.second_nationality == undefined || this.second_nationality == "" || this.second_nationality == null) {
        this.second_nationality = null;
      }

      if (this.second_aadhaar_no == undefined || this.second_aadhaar_no == "" || this.second_aadhaar_no == null) {
        this.second_aadhaar_no = null;
      }

      if (this.second_pan_no == undefined || this.second_pan_no == "" || this.second_pan_no == null) {
        this.second_pan_no = null;
      }

      if (this.second_relationnamePrefix == undefined || this.second_relationnamePrefix == "" || this.second_relationnamePrefix == null) {
        this.second_relationnamePrefix = null;
      }
      if (this.second_relation_name == undefined || this.second_relation_name == "" || this.second_relation_name == null) {
        this.second_relation_name = null;
      }

      if (this.second_Relation_with == undefined || this.second_Relation_with == "" || this.second_Relation_with == null) {
        this.second_Relation_with = null;
      }
      if (this.passport_no_second == undefined || this.passport_no_second == "" || this.passport_no_second == null) {
        this.passport_no_second = null;
      }

      var CoAppData = [];

      var customerInfo1 = {
        "coApplicantId": null,
        "coApplicantNumber": null,
        "namePrefix": this.second_namePrefix,
        "firstName": this.second_mrs,
        "middleName": null,
        "lastName": null,
        "gender": null,
        "age": null,
        "dateOfBirth": this.second_dob,
        "profilePic": null,
        "nationality": this.second_nationality,
        "passport": this.passport_no_second,

        "aadharId": this.second_aadhaar_no,
        "pancard": this.second_pan_no,
        "voterId": null,
        "relationNamePrefix": this.second_relationnamePrefix,
        "relationName": this.second_relation_name,
        "relationWith": this.second_Relation_with,
        "relationWithCust": null,
        "statusId": null,
        "status": null,
        "createdDate": null,
        "updatedDate": null
      }




      if (this.second_pincode == undefined || this.second_pincode == "" || this.second_pincode == null) {
        this.second_pincode = null;
      }

      if (second_perment_cityid == undefined || second_perment_cityid == "" || second_perment_cityid == null) {
        second_perment_cityid = null;
      }

      if (second_perment_city_name == undefined || second_perment_city_name == "" || second_perment_city_name == null) {
        second_perment_city_name = null;
      }

      if (second_perment_stateid == undefined || second_perment_stateid == "" || second_perment_stateid == null) {
        second_perment_stateid = null;
      }

      if (second_perment_state_name == undefined || second_perment_state_name == "" || second_perment_state_name == null) {
        second_perment_state_name = null;
      }

      if (second_perment_country_name == undefined || second_perment_country_name == "" || second_perment_country_name == null) {
        second_perment_country_name = null;
      }

      if (this.second_permanent == undefined || this.second_permanent == "" || this.second_permanent == null) {
        this.second_permanent = null;
        swal("Please enter the second applicate permanent address");
        return false;
      }


      var CoAppaddressInfosone_second = [];
      var CoAppaddressInfos_second = {
        "custAddressId": null,
        "floorNo": null,
        "tower": null,
        "street": null,
        "area": null,
        "landmark": null,
        "pincode": this.second_pincode,
        "cityId": second_perment_cityid,
        "city": second_perment_city_name,
        "cityIcon": null,
        "stateId": second_perment_stateid,
        "state": second_perment_state_name,
        "country": second_perment_country_name,
        "countryId": second_perment_countryid,
        "langitude": null,
        "latitude": null,
        "createdDate": null,
        "updatedDate": null,
        "addressType": null,
        "address1": this.second_permanent,
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
      CoAppaddressInfosone_second.push(CoAppaddressInfos_second);

      if (this.second_pincode1 == undefined || this.second_pincode1 == "" || this.second_pincode1 == null) {
        this.second_pincode1 = null;
      }

      if (second_perment_cityid1 == undefined || second_perment_cityid1 == "" || second_perment_cityid1 == null) {
        second_perment_cityid1 = null;
      }

      if (second_perment_city_name1 == undefined || second_perment_city_name1 == "" || second_perment_city_name1 == null) {
        second_perment_city_name1 = null;
      }

      if (second_perment_stateid1 == undefined || second_perment_stateid1 == "" || second_perment_stateid1 == null) {
        second_perment_stateid1 = null;
      }

      if (second_perment_state_name1 == undefined || second_perment_state_name1 == "" || second_perment_state_name1 == null) {
        second_perment_state_name1 = null;
      }

      if (second_perment_country_name1 == undefined || second_perment_country_name1 == "" || second_perment_country_name1 == null) {
        second_perment_country_name1 = null;
      }

      if (this.second_Correspondence == undefined || this.second_Correspondence == "" || this.second_Correspondence == null) {
        this.second_Correspondence = null;
        swal("Please enter the second applicate Correspondence address");
        return false;
      }

      var CoAppaddressInfos_second2 = {
        "custAddressId": null,
        "floorNo": null,
        "tower": null,
        "street": null,
        "area": null,
        "landmark": null,
        "pincode": this.second_pincode1,
        "cityId": second_perment_cityid1,
        "city": second_perment_city_name1,
        "cityIcon": null,
        "stateId": second_perment_stateid1,
        "state": second_perment_state_name1,
        "country": second_perment_country_name1,
        "countryId": second_perment_countryid1,
        "langitude": null,
        "latitude": null,
        "createdDate": null,
        "updatedDate": null,
        "addressType": null,
        "address1": this.second_Correspondence,
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
      CoAppaddressInfosone_second.push(CoAppaddressInfos_second2);


      if (second_marrital_statusdata == "" || second_marrital_statusdata == "select" || second_marrital_statusdata == undefined || second_marrital_statusdata == null) {
        second_marrital_statusdata = null;
      }

      if (this.doa_second == "" || this.doa_second == undefined || this.doa_second == null || this.doa_second == "undefined") {
        this.doa_second = null;
      }


      if (this.second_mobile == "" || this.second_mobile == undefined || this.second_mobile == null || this.second_mobile == "undefined") {
        this.second_mobile = null;
      }

      if (this.second_email == "" || this.second_email == undefined || this.second_email == null || this.second_email == "undefined") {
        this.second_email = null;
      }

      if (this.second_tel == "" || this.second_tel == undefined || this.second_tel == null || this.second_tel == "undefined") {
        this.second_tel = null;
      }

      if (this.second_education_qualification == "" || this.second_education_qualification == undefined || this.second_education_qualification == null || this.second_education_qualification == "undefined") {
        this.second_education_qualification = null;
      }

      if (this.second_Annual_household == "" || this.second_Annual_household == undefined || this.second_Annual_household == null || this.second_Annual_household == "undefined") {
        this.second_Annual_household = null;
      }

      var coApplicentBookingInfo1 = {
        "coAppBookInfoId": null,
        "phoneNo": this.second_mobile,
        "alternatePhoneNo": null,
        "email": this.second_email,
        "telePhone": this.second_tel,
        "maritalStatus": second_marrital_statusdata,
        "workExperience": null,
        "dateOfAnniversery": this.doa_second,
        "educationalQualification": this.second_education_qualification,
        "annualHouseHoldIncome": this.second_Annual_household,
        "custProffisionalId": null,
        "statusId": null,
        "status": null,
        "createdDate": null,
        "updatedDate": null,
        "coApplicantId": null,
        "custBookInfoId": null
      }







      if (this.second_Designation == "" || this.second_Designation == null || this.second_Designation == undefined) {
        this.second_Designation = null;
        //swal("Please enter the second applicate designation");
        // return false;
      }

      if (this.second_name_of_organisation == "" || this.second_name_of_organisation == null || this.second_name_of_organisation == undefined) {
        this.second_name_of_organisation = null;
        // swal("Please enter the second applicate Name of Organisation/ Business");
        // return false;
      }

      if (this.second_of_organisation == "" || this.second_of_organisation == null || this.second_of_organisation == undefined) {
        this.second_of_organisation = null;
        //swal("Please enter the second applicate Address of Organisation/ Business");
        // return false;
      }

      if (this.second_office_number == "" || this.second_office_number == null || this.second_office_number == undefined) {

        this.second_office_number = null;
        // swal("Please enter the second applicate Office Number");
        // return false;
      }

      if (this.second_office_emailid == "" || this.second_office_emailid == null || this.second_office_emailid == undefined) {
        this.second_office_emailid = null;
        //  swal("Please enter the second applicate Office Email Id");
        //  return false;
      }


      if (this.Second_Organisation_type == "" || this.Second_Organisation_type == null || this.Second_Organisation_type == undefined) {
        this.Second_Organisation_type = null;
        // swal("Please enter the second applicate Organizational Type");
        // return false;
      }

      if (this.second_Industry_sector == "" || this.second_Industry_sector == null || this.second_Industry_sector == undefined) {

        this.second_Industry_sector = null;
        //swal("Please enter the second applicate Industry Sector of work/ Business ");
        //return false;
      }

      if (this.second_work_function_role == "" || this.second_work_function_role == null || this.second_work_function_role == undefined) {
        this.second_work_function_role = null;
        //    swal("Please enter the second applicate Work Function/ Role");
        //   return false;
      }

      if (this.second_number_of_years == "" || this.second_number_of_years == null || this.second_number_of_years == undefined) {
        this.second_number_of_years = null;
        // swal("Please enter the second applicate Number of years of work Experience");
        //  return false;
      }

      if (this.second_education_qualification == "" || this.second_education_qualification == null || this.second_education_qualification == undefined) {
        this.second_education_qualification = null;
        //  swal("Please enter the second applicate Education Qualification ");
        //return false;
      }

      if (this.second_Annual_household == "" || this.second_Annual_household == null || this.second_Annual_household == undefined) {
        this.second_Annual_household = null;
        //  swal("Please enter the second applicate Annual Household Income (Rupees) ");
        //  return false;
      }


      var professionalInfo1 = {
        "designation": this.second_Designation,
        "nameOfOrganization": this.second_name_of_organisation,
        "addressOfOrganization": this.second_of_organisation,
        "officeNumber": this.second_office_number,
        "officeEmailId": this.second_office_emailid,
        "custProffisionalId": null,
        "statusId": null,
        "createdDate": null,
        "modifiedDate": null,
        "oraganizationDetails": {
          "organizationTypeId": null,
          "organizationTypeName": this.Second_Organisation_type,
          "ifOtherOrgTypeName": this.second_Designation
        },
        "sectorDetailsInfo": {
          "workSectorId": null,
          "workSectorName": this.second_Industry_sector,
          "ifOtherWorkSectorName": this.second_name_of_organisation
        },
        "workFunctionInfo": {
          "workFunctionId": null,
          "workFunctionName": this.second_work_function_role,
          "ifOtherworkFunctionName": null
        },
        "yearsOfExperience": this.second_number_of_years
      }


      CoAppData.push({ "co_ApplicantInfo": customerInfo1, "coApplicentBookingInfo": coApplicentBookingInfo1, "addressInfos": CoAppaddressInfosone_second, "professionalInfo": professionalInfo1 });



      if ($("#pan_no_first").val() == $("#second_pan_no").val()) {
        swal("PAN number must be unique number");
        return false;
      }

      if ($("#aadhaar_no_first").val() == $("#second_aadhaar_no").val()) {
        swal("Aadhar number must be unique number");
        return false;
      }

    } else if (secondApplicantInfo != undefined) {





      if (this.second_dob == null || this.second_dob == undefined || this.second_dob == "" || this.second_dob == "undefined") {
        this.second_dob = null;
      } else {
        this.second_dob = $("#second_dob").val();
      }


      if (this.second_namePrefix == undefined || this.second_namePrefix == "" || this.second_namePrefix == null) {
        this.second_namePrefix = null;
      }

      if (this.second_mrs == undefined || this.second_mrs == "" || this.second_mrs == null) {
        this.second_mrs = null;
      }

      if (this.second_dob == undefined || this.second_dob == "" || this.second_dob == null) {
        this.second_dob = null;
      }

      if (this.second_nationality == undefined || this.second_nationality == "" || this.second_nationality == null) {
        this.second_nationality = null;
      }

      if (this.second_aadhaar_no == undefined || this.second_aadhaar_no == "" || this.second_aadhaar_no == null) {
        this.second_aadhaar_no = null;
      }

      if (this.second_pan_no == undefined || this.second_pan_no == "" || this.second_pan_no == null) {
        this.second_pan_no = null;
      }

      if (this.second_relationnamePrefix == undefined || this.second_relationnamePrefix == "" || this.second_relationnamePrefix == null) {
        this.second_relationnamePrefix = null;
      }
      if (this.second_relation_name == undefined || this.second_relation_name == "" || this.second_relation_name == null) {
        this.second_relation_name = null;
      }

      if (this.second_Relation_with == undefined || this.second_Relation_with == "" || this.second_Relation_with == null) {
        this.second_Relation_with = null;
      }

      if (this.passport_no_second == undefined || this.passport_no_second == "" || this.passport_no_second == null) {
        this.passport_no_second = null;
      }

      var CoAppData = [];

      var customerInfo1 = {
        "coApplicantId": null,
        "coApplicantNumber": null,
        "namePrefix": this.second_namePrefix,
        "firstName": this.second_mrs,
        "middleName": null,
        "lastName": null,
        "gender": null,
        "age": null,
        "dateOfBirth": this.second_dob,
        "profilePic": null,
        "nationality": this.second_nationality,
        "aadharId": this.second_aadhaar_no,
        "passport": this.passport_no_second,

        "pancard": this.second_pan_no,
        "voterId": null,
        "relationNamePrefix": this.second_relationnamePrefix,
        "relationName": this.second_relation_name,
        "relationWith": this.second_Relation_with,
        "relationWithCust": null,
        "statusId": null,
        "status": null,
        "createdDate": null,
        "updatedDate": null
      }




      if (this.second_pincode == undefined || this.second_pincode == "" || this.second_pincode == null) {
        this.second_pincode = null;
      }

      if (second_perment_cityid == undefined || second_perment_cityid == "" || second_perment_cityid == null) {
        second_perment_cityid = null;
      }

      if (second_perment_city_name == undefined || second_perment_city_name == "" || second_perment_city_name == null) {
        second_perment_city_name = null;
      }

      if (second_perment_stateid == undefined || second_perment_stateid == "" || second_perment_stateid == null) {
        second_perment_stateid = null;
      }

      if (second_perment_state_name == undefined || second_perment_state_name == "" || second_perment_state_name == null) {
        second_perment_state_name = null;
      }

      if (second_perment_country_name == undefined || second_perment_country_name == "" || second_perment_country_name == null) {
        second_perment_country_name = null;
      }

      if (this.second_permanent == undefined || this.second_permanent == "" || this.second_permanent == null) {
        this.second_permanent = null;
      }

      var CoAppaddressInfosone_second = [];
      var CoAppaddressInfos_second = {
        "custAddressId": null,
        "floorNo": null,
        "tower": null,
        "street": null,
        "area": null,
        "landmark": null,
        "pincode": this.second_pincode,
        "cityId": second_perment_cityid,
        "city": second_perment_city_name,
        "cityIcon": null,
        "stateId": second_perment_stateid,
        "state": second_perment_state_name,
        "country": second_perment_country_name,
        "countryId": second_perment_countryid,
        "langitude": null,
        "latitude": null,
        "createdDate": null,
        "updatedDate": null,
        "addressType": null,
        "address1": this.second_permanent,
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
      CoAppaddressInfosone_second.push(CoAppaddressInfos_second);

      if (this.second_pincode1 == undefined || this.second_pincode1 == "" || this.second_pincode1 == null) {
        this.second_pincode1 = null;
      }

      if (second_perment_cityid1 == undefined || second_perment_cityid1 == "" || second_perment_cityid1 == null) {
        second_perment_cityid1 = null;
      }

      if (second_perment_city_name1 == undefined || second_perment_city_name1 == "" || second_perment_city_name1 == null) {
        second_perment_city_name1 = null;
      }

      if (second_perment_stateid1 == undefined || second_perment_stateid1 == "" || second_perment_stateid1 == null) {
        second_perment_stateid1 = null;
      }

      if (second_perment_state_name1 == undefined || second_perment_state_name1 == "" || second_perment_state_name1 == null) {
        second_perment_state_name1 = null;
      }

      if (second_perment_country_name1 == undefined || second_perment_country_name1 == "" || second_perment_country_name1 == null) {
        second_perment_country_name1 = null;
      }

      if (this.second_Correspondence == undefined || this.second_Correspondence == "" || this.second_Correspondence == null) {
        this.second_Correspondence = null;
      }

      var CoAppaddressInfos_second2 = {
        "custAddressId": null,
        "floorNo": null,
        "tower": null,
        "street": null,
        "area": null,
        "landmark": null,
        "pincode": this.second_pincode1,
        "cityId": second_perment_cityid1,
        "city": second_perment_city_name1,
        "cityIcon": null,
        "stateId": second_perment_stateid1,
        "state": second_perment_state_name1,
        "country": second_perment_country_name1,
        "countryId": second_perment_countryid1,
        "langitude": null,
        "latitude": null,
        "createdDate": null,
        "updatedDate": null,
        "addressType": null,
        "address1": this.second_Correspondence,
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
      CoAppaddressInfosone_second.push(CoAppaddressInfos_second2);


      if (second_marrital_statusdata == "" || second_marrital_statusdata == "select" || second_marrital_statusdata == undefined || second_marrital_statusdata == null) {
        second_marrital_statusdata = null;
      }

      if (this.doa_second == "" || this.doa_second == undefined || this.doa_second == null || this.doa_second == "undefined") {
        this.doa_second = null;
      }


      if (this.second_mobile == "" || this.second_mobile == undefined || this.second_mobile == null || this.second_mobile == "undefined") {
        this.second_mobile = null;
      }

      if (this.second_email == "" || this.second_email == undefined || this.second_email == null || this.second_email == "undefined") {
        this.second_email = null;
      }

      if (this.second_tel == "" || this.second_tel == undefined || this.second_tel == null || this.second_tel == "undefined") {
        this.second_tel = null;
      }

      if (this.second_education_qualification == "" || this.second_education_qualification == undefined || this.second_education_qualification == null || this.second_education_qualification == "undefined") {
        this.second_education_qualification = null;
      }

      if (this.second_Annual_household == "" || this.second_Annual_household == undefined || this.second_Annual_household == null || this.second_Annual_household == "undefined") {
        this.second_Annual_household = null;
      }

      var coApplicentBookingInfo1 = {
        "coAppBookInfoId": null,
        "phoneNo": this.second_mobile,
        "alternatePhoneNo": null,
        "email": this.second_email,
        "telePhone": this.second_tel,
        "maritalStatus": second_marrital_statusdata,
        "workExperience": null,
        "dateOfAnniversery": this.doa_second,
        "educationalQualification": this.second_education_qualification,
        "annualHouseHoldIncome": this.second_Annual_household,
        "custProffisionalId": null,
        "statusId": null,
        "status": null,
        "createdDate": null,
        "updatedDate": null,
        "coApplicantId": null,
        "custBookInfoId": null
      }







      if (this.second_Designation == "" || this.second_Designation == null || this.second_Designation == undefined) {
        this.second_Designation = null;
        //swal("Please enter the second applicate designation");
        // return false;
      }

      if (this.second_name_of_organisation == "" || this.second_name_of_organisation == null || this.second_name_of_organisation == undefined) {
        this.second_name_of_organisation = null;
        // swal("Please enter the second applicate Name of Organisation/ Business");
        // return false;
      }

      if (this.second_of_organisation == "" || this.second_of_organisation == null || this.second_of_organisation == undefined) {
        this.second_of_organisation = null;
        //swal("Please enter the second applicate Address of Organisation/ Business");
        // return false;
      }

      if (this.second_office_number == "" || this.second_office_number == null || this.second_office_number == undefined) {

        this.second_office_number = null;
        // swal("Please enter the second applicate Office Number");
        // return false;
      }

      if (this.second_office_emailid == "" || this.second_office_emailid == null || this.second_office_emailid == undefined) {
        this.second_office_emailid = null;
        //  swal("Please enter the second applicate Office Email Id");
        //  return false;
      }


      if (this.Second_Organisation_type == "" || this.Second_Organisation_type == null || this.Second_Organisation_type == undefined) {
        this.Second_Organisation_type = null;
        // swal("Please enter the second applicate Organizational Type");
        // return false;
      }

      if (this.second_Industry_sector == "" || this.second_Industry_sector == null || this.second_Industry_sector == undefined) {

        this.second_Industry_sector = null;
        //swal("Please enter the second applicate Industry Sector of work/ Business ");
        //return false;
      }

      if (this.second_work_function_role == "" || this.second_work_function_role == null || this.second_work_function_role == undefined) {
        this.second_work_function_role = null;
        //    swal("Please enter the second applicate Work Function/ Role");
        //   return false;
      }

      if (this.second_number_of_years == "" || this.second_number_of_years == null || this.second_number_of_years == undefined) {
        this.second_number_of_years = null;
        // swal("Please enter the second applicate Number of years of work Experience");
        //  return false;
      }

      if (this.second_education_qualification == "" || this.second_education_qualification == null || this.second_education_qualification == undefined) {
        this.second_education_qualification = null;
        //  swal("Please enter the second applicate Education Qualification ");
        //return false;
      }

      if (this.second_Annual_household == "" || this.second_Annual_household == null || this.second_Annual_household == undefined) {
        this.second_Annual_household = null;
        //  swal("Please enter the second applicate Annual Household Income (Rupees) ");
        //  return false;
      }


      var professionalInfo1 = {
        "designation": this.second_Designation,
        "nameOfOrganization": this.second_name_of_organisation,
        "addressOfOrganization": this.second_of_organisation,
        "officeNumber": this.second_office_number,
        "officeEmailId": this.second_office_emailid,
        "custProffisionalId": null,
        "statusId": null,
        "createdDate": null,
        "modifiedDate": null,
        "oraganizationDetails": {
          "organizationTypeId": null,
          "organizationTypeName": this.Second_Organisation_type,
          "ifOtherOrgTypeName": this.second_Designation
        },
        "sectorDetailsInfo": {
          "workSectorId": null,
          "workSectorName": this.second_Industry_sector,
          "ifOtherWorkSectorName": this.second_name_of_organisation
        },
        "workFunctionInfo": {
          "workFunctionId": null,
          "workFunctionName": this.second_work_function_role,
          "ifOtherworkFunctionName": null
        },
        "yearsOfExperience": this.second_number_of_years
      }


      CoAppData.push({ "co_ApplicantInfo": customerInfo1, "coApplicentBookingInfo": coApplicentBookingInfo1, "addressInfos": CoAppaddressInfosone_second, "professionalInfo": professionalInfo1 });


    } else {




      if (this.second_dob == null || this.second_dob == undefined || this.second_dob == "" || this.second_dob == "undefined") {
        this.second_dob = null;
      } else {
        this.second_dob = $("#second_dob").val();
      }


      if (this.second_namePrefix == undefined || this.second_namePrefix == "" || this.second_namePrefix == null) {
        this.second_namePrefix = null;
      }

      if (this.second_mrs == undefined || this.second_mrs == "" || this.second_mrs == null) {
        this.second_mrs = null;
      }

      if (this.second_dob == undefined || this.second_dob == "" || this.second_dob == null) {
        this.second_dob = null;
      }

      if (this.second_nationality == undefined || this.second_nationality == "" || this.second_nationality == null) {
        this.second_nationality = null;
      }

      if (this.second_aadhaar_no == undefined || this.second_aadhaar_no == "" || this.second_aadhaar_no == null) {
        this.second_aadhaar_no = null;
      }

      if (this.second_pan_no == undefined || this.second_pan_no == "" || this.second_pan_no == null) {
        this.second_pan_no = null;
      }

      if (this.second_relationnamePrefix == undefined || this.second_relationnamePrefix == "" || this.second_relationnamePrefix == null) {
        this.second_relationnamePrefix = null;
      }
      if (this.second_relation_name == undefined || this.second_relation_name == "" || this.second_relation_name == null) {
        this.second_relation_name = null;
      }

      if (this.second_Relation_with == undefined || this.second_Relation_with == "" || this.second_Relation_with == null) {
        this.second_Relation_with = null;
      }

      if (this.passport_no_second == undefined || this.passport_no_second == "" || this.passport_no_second == null) {
        this.passport_no_second = null;
      }

      var CoAppData = [];

      var customerInfo1 = {
        "coApplicantId": null,
        "coApplicantNumber": null,
        "namePrefix": this.second_namePrefix,
        "firstName": this.second_mrs,
        "middleName": null,
        "lastName": null,
        "gender": null,
        "age": null,
        "dateOfBirth": this.second_dob,
        "profilePic": null,
        "nationality": this.second_nationality,
        "aadharId": this.second_aadhaar_no,
        "passport": this.passport_no_second,

        "pancard": this.second_pan_no,
        "voterId": null,
        "relationNamePrefix": this.second_relationnamePrefix,
        "relationName": this.second_relation_name,
        "relationWith": this.second_Relation_with,
        "relationWithCust": null,
        "statusId": null,
        "status": null,
        "createdDate": null,
        "updatedDate": null
      }




      if (this.second_pincode == undefined || this.second_pincode == "" || this.second_pincode == null) {
        this.second_pincode = null;
      }

      if (second_perment_cityid == undefined || second_perment_cityid == "" || second_perment_cityid == null) {
        second_perment_cityid = null;
      }

      if (second_perment_city_name == undefined || second_perment_city_name == "" || second_perment_city_name == null) {
        second_perment_city_name = null;
      }

      if (second_perment_stateid == undefined || second_perment_stateid == "" || second_perment_stateid == null) {
        second_perment_stateid = null;
      }

      if (second_perment_state_name == undefined || second_perment_state_name == "" || second_perment_state_name == null) {
        second_perment_state_name = null;
      }

      if (second_perment_country_name == undefined || second_perment_country_name == "" || second_perment_country_name == null) {
        second_perment_country_name = null;
      }

      if (this.second_permanent == undefined || this.second_permanent == "" || this.second_permanent == null) {
        this.second_permanent = null;
      }

      var CoAppaddressInfosone_second = [];
      var CoAppaddressInfos_second = {
        "custAddressId": null,
        "floorNo": null,
        "tower": null,
        "street": null,
        "area": null,
        "landmark": null,
        "pincode": this.second_pincode,
        "cityId": second_perment_cityid,
        "city": second_perment_city_name,
        "cityIcon": null,
        "stateId": second_perment_stateid,
        "state": second_perment_state_name,
        "country": second_perment_country_name,
        "countryId": second_perment_countryid,
        "langitude": null,
        "latitude": null,
        "createdDate": null,
        "updatedDate": null,
        "addressType": null,
        "address1": this.second_permanent,
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
      CoAppaddressInfosone_second.push(CoAppaddressInfos_second);

      if (this.second_pincode1 == undefined || this.second_pincode1 == "" || this.second_pincode1 == null) {
        this.second_pincode1 = null;
      }

      if (second_perment_cityid1 == undefined || second_perment_cityid1 == "" || second_perment_cityid1 == null) {
        second_perment_cityid1 = null;
      }

      if (second_perment_city_name1 == undefined || second_perment_city_name1 == "" || second_perment_city_name1 == null) {
        second_perment_city_name1 = null;
      }

      if (second_perment_stateid1 == undefined || second_perment_stateid1 == "" || second_perment_stateid1 == null) {
        second_perment_stateid1 = null;
      }

      if (second_perment_state_name1 == undefined || second_perment_state_name1 == "" || second_perment_state_name1 == null) {
        second_perment_state_name1 = null;
      }

      if (second_perment_country_name1 == undefined || second_perment_country_name1 == "" || second_perment_country_name1 == null) {
        second_perment_country_name1 = null;
      }

      if (this.second_Correspondence == undefined || this.second_Correspondence == "" || this.second_Correspondence == null) {
        this.second_Correspondence = null;
      }

      var CoAppaddressInfos_second2 = {
        "custAddressId": null,
        "floorNo": null,
        "tower": null,
        "street": null,
        "area": null,
        "landmark": null,
        "pincode": this.second_pincode1,
        "cityId": second_perment_cityid1,
        "city": second_perment_city_name1,
        "cityIcon": null,
        "stateId": second_perment_stateid1,
        "state": second_perment_state_name1,
        "country": second_perment_country_name1,
        "countryId": second_perment_countryid1,
        "langitude": null,
        "latitude": null,
        "createdDate": null,
        "updatedDate": null,
        "addressType": null,
        "address1": this.second_Correspondence,
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
      CoAppaddressInfosone_second.push(CoAppaddressInfos_second2);


      if (second_marrital_statusdata == "" || second_marrital_statusdata == "select" || second_marrital_statusdata == undefined || second_marrital_statusdata == null) {
        second_marrital_statusdata = null;
      }

      if (this.doa_second == "" || this.doa_second == undefined || this.doa_second == null || this.doa_second == "undefined") {
        this.doa_second = null;
      }


      if (this.second_mobile == "" || this.second_mobile == undefined || this.second_mobile == null || this.second_mobile == "undefined") {
        this.second_mobile = null;
      }

      if (this.second_email == "" || this.second_email == undefined || this.second_email == null || this.second_email == "undefined") {
        this.second_email = null;
      }

      if (this.second_tel == "" || this.second_tel == undefined || this.second_tel == null || this.second_tel == "undefined") {
        this.second_tel = null;
      }

      if (this.second_education_qualification == "" || this.second_education_qualification == undefined || this.second_education_qualification == null || this.second_education_qualification == "undefined") {
        this.second_education_qualification = null;
      }

      if (this.second_Annual_household == "" || this.second_Annual_household == undefined || this.second_Annual_household == null || this.second_Annual_household == "undefined") {
        this.second_Annual_household = null;
      }

      var coApplicentBookingInfo1 = {
        "coAppBookInfoId": null,
        "phoneNo": this.second_mobile,
        "alternatePhoneNo": null,
        "email": this.second_email,
        "telePhone": this.second_tel,
        "maritalStatus": second_marrital_statusdata,
        "workExperience": null,
        "dateOfAnniversery": this.doa_second,
        "educationalQualification": this.second_education_qualification,
        "annualHouseHoldIncome": this.second_Annual_household,
        "custProffisionalId": null,
        "statusId": null,
        "status": null,
        "createdDate": null,
        "updatedDate": null,
        "coApplicantId": null,
        "custBookInfoId": null
      }







      if (this.second_Designation == "" || this.second_Designation == null || this.second_Designation == undefined) {
        this.second_Designation = null;
        //swal("Please enter the second applicate designation");
        // return false;
      }

      if (this.second_name_of_organisation == "" || this.second_name_of_organisation == null || this.second_name_of_organisation == undefined) {
        this.second_name_of_organisation = null;
        // swal("Please enter the second applicate Name of Organisation/ Business");
        // return false;
      }

      if (this.second_of_organisation == "" || this.second_of_organisation == null || this.second_of_organisation == undefined) {
        this.second_of_organisation = null;
        //swal("Please enter the second applicate Address of Organisation/ Business");
        // return false;
      }

      if (this.second_office_number == "" || this.second_office_number == null || this.second_office_number == undefined) {

        this.second_office_number = null;
        // swal("Please enter the second applicate Office Number");
        // return false;
      }

      if (this.second_office_emailid == "" || this.second_office_emailid == null || this.second_office_emailid == undefined) {
        this.second_office_emailid = null;
        //  swal("Please enter the second applicate Office Email Id");
        //  return false;
      }


      if (this.Second_Organisation_type == "" || this.Second_Organisation_type == null || this.Second_Organisation_type == undefined) {
        this.Second_Organisation_type = null;
        // swal("Please enter the second applicate Organizational Type");
        // return false;
      }

      if (this.second_Industry_sector == "" || this.second_Industry_sector == null || this.second_Industry_sector == undefined) {

        this.second_Industry_sector = null;
        //swal("Please enter the second applicate Industry Sector of work/ Business ");
        //return false;
      }

      if (this.second_work_function_role == "" || this.second_work_function_role == null || this.second_work_function_role == undefined) {
        this.second_work_function_role = null;
        //    swal("Please enter the second applicate Work Function/ Role");
        //   return false;
      }

      if (this.second_number_of_years == "" || this.second_number_of_years == null || this.second_number_of_years == undefined) {
        this.second_number_of_years = null;
        // swal("Please enter the second applicate Number of years of work Experience");
        //  return false;
      }

      if (this.second_education_qualification == "" || this.second_education_qualification == null || this.second_education_qualification == undefined) {
        this.second_education_qualification = null;
        //  swal("Please enter the second applicate Education Qualification ");
        //return false;
      }

      if (this.second_Annual_household == "" || this.second_Annual_household == null || this.second_Annual_household == undefined) {
        this.second_Annual_household = null;
        //  swal("Please enter the second applicate Annual Household Income (Rupees) ");
        //  return false;
      }


      var professionalInfo1 = {
        "designation": this.second_Designation,
        "nameOfOrganization": this.second_name_of_organisation,
        "addressOfOrganization": this.second_of_organisation,
        "officeNumber": this.second_office_number,
        "officeEmailId": this.second_office_emailid,
        "custProffisionalId": null,
        "statusId": null,
        "createdDate": null,
        "modifiedDate": null,
        "oraganizationDetails": {
          "organizationTypeId": null,
          "organizationTypeName": this.Second_Organisation_type,
          "ifOtherOrgTypeName": this.second_Designation
        },
        "sectorDetailsInfo": {
          "workSectorId": null,
          "workSectorName": this.second_Industry_sector,
          "ifOtherWorkSectorName": this.second_name_of_organisation
        },
        "workFunctionInfo": {
          "workFunctionId": null,
          "workFunctionName": this.second_work_function_role,
          "ifOtherworkFunctionName": null
        },
        "yearsOfExperience": this.second_number_of_years
      }


      CoAppData.push({ "co_ApplicantInfo": customerInfo1, "coApplicentBookingInfo": coApplicentBookingInfo1, "addressInfos": CoAppaddressInfosone_second, "professionalInfo": professionalInfo1 });



    }




    // --------------------------THIRD APPLICANT (MANDATORY) ---------------------
    this.third_namePrefix = $("#third_namePrefix").val();
    this.Third_mr = $("#Third_mr").val();
    this.Third_dob = $("#Third_dob").val();
    this.third_Relation_with = $("#third_Relation_with").val();
    this.third_relationnamePrefix = $("#third_relationnamePrefix").val();
    this.third_relation_name = $("#third_relation_name").val();

    this.Third_dob = $("#Third_dob").val();

    this.third_marrital_status = $("#third_marrital_status").val();
    this.third_permanent = $("#third_permanent").val();
    this.Third_Country = $("#Third_Country").val();
    this.third_City = $("#third_City").val();
    this.third_State = $("#third_State").val();
    this.third_pincode = $("#third_pincode").val();
    this.third_correspondence = $("#third_correspondence").val();
    this.Third_Country1 = $("#Third_Country1").val();
    this.third_City1 = $("#third_City1").val();
    this.third_State1 = $("#third_State1").val();
    this.third_pincode1 = $("#third_pincode1").val();

    this.Third_pan_no = $("#Third_pan_no").val();

    this.Third_tel = $("#Third_tel").val();
    this.Third_Mobile = $("#Third_Mobile").val();
    this.Third_email = $("#Third_email").val();
    this.Third_Nationality = $("#Third_Nationality").val();
    this.Third_aadhaar_no = $("#Third_aadhaar_no").val();
    this.passport_no_third = $("#passport_no_third").val();

    this.Third_designation = $("#Third_designation").val();
    this.Third_Name_of_organisation = $("#Third_Name_of_organisation").val();
    this.Third_Address_of_Organisation = $("#Third_Address_of_Organisation").val();
    this.Third_Office_number = $("#Third_Office_number").val();
    this.Third_office_email_id = $("#Third_office_email_id").val();
    this.Third_Organization_type = $("#Third_Organization_type").val();
    this.Third_Industry_sector_of_work = $("#Third_Industry_sector_of_work").val();
    this.Third_work_function_role = $("#Third_work_function_role").val();
    this.Third_Number_of_years = $("#Third_Number_of_years").val();
    this.Third_Education_Qualification = $("#Third_Education_Qualification").val();
    this.Third_Annual_household = $("#Third_Annual_household").val();






    if (this.thirdform_validation == true) {

      if (this.third_namePrefix == "select" || this.third_namePrefix == null) {
        swal("Please select the third applicate name prefix");
        return false;
      }

      if (this.Third_mr == "") {
        swal("Please enter the third applicate customer name");
        return false;
      }


      if (this.third_Relation_with == "select" || this.third_Relation_with == null) {
        swal("Please select the third applicate relation with");
        return false;
      }

      if (this.third_relationnamePrefix == "select" || this.third_relationnamePrefix == null) {
        swal("Please select the third applicate relation name prefix");
        return false;
      }

      if (this.third_relation_name == "select" || this.third_relation_name == "") {
        swal("Please enter the third applicate relation name");
        return false;
      }

      // if(this.third_marrital_status == "select" && this.third_marrital_status == "" && this.third_marrital_status == undefined){
      //   swal("Please enter the third applicate marrital status");
      //   return false;
      // }






      if (this.third_permanent == "") {
        swal("Please enter the third applicate permanent address");
        return false;
      }






      if (this.Third_Country == "select" || this.Third_Country == null) {
        this.Third_Country == null
        // swal("Please select the third applicate country");
        //return false;
      }

      if (this.third_State == "select" || this.third_State == null) {
        this.third_State == null
        // swal("Please select the third applicate state");
        // return false;
      }

      if (this.third_City == "select" || this.third_City == null || this.third_City == "") {
        this.third_City == ""
        // swal("Please select the third applicate city");
        // return false;
      }



      if (this.third_pincode == "" || this.third_pincode == null) {
        swal("Please enter the third applicate pincode");
        return false;
      }

      if (this.third_correspondence == "") {
        swal("Please enter the third applicate Correspondence address");
        return false;
      }







      if (this.Third_Country1 == "select" || this.Third_Country1 == null) {
        this.Third_Country1 == null
        // swal("Please select the third applicate country");
        //  return false;
      }

      if (this.third_State1 == "select" || this.third_State1 == null) {
        this.third_State1 == null
        //  swal("Please select the third applicate state");
        //  return false;
      }

      if (this.third_City1 == "select" || this.third_City1 == null || this.third_City1 == "") {
        this.third_City1 == null
        //  swal("Please select the third applicate city");
        //  return false;
      }


      if (this.third_pincode1 == "" || this.third_pincode1 == null) {
        swal("Please enter the third applicate pincode");
        return false;
      }





      if (this.Third_Mobile == "") {
        swal("Please enter the  third applicant mobile number");
        return false;
      }

      // if (this.Third_email == "") {
      //   swal("Please enter the third applicant email");
      //   return false;
      // }

      var email = this.Third_email;
      var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

      if (!regex.test(email)) {

        swal("Please enter the third applicant valid email");
        return false;
      }


      if (this.Third_pan_no == "") {
        swal("Please enter the third applicant PAN number");
        return false;
      }

      if (this.Third_Nationality == "" || this.Third_Nationality == undefined || this.Third_Nationality == null) {
        swal("Please enter the third applicate  nationality");
        return false;
      }



      if (this.Third_aadhaar_no == "" && $("#passport_no_third").val() == "") {
        swal("Please enter the third applicate passport (or) aadhar number");
        return false;
      }


      // --------------------------THIRD APPLICANT (MANDATORY) ---------------------


      if (this.Third_dob == null || this.Third_dob == undefined || this.Third_dob == "" || this.Third_dob == "undefined") {
        this.Third_dob = null;
      } else {
        this.Third_dob = $("#Third_dob").val();
      }

      if (this.third_namePrefix == null || this.third_namePrefix == undefined || this.third_namePrefix == "" || this.third_namePrefix == "undefined") {
        this.third_namePrefix = null;
      }

      if (this.Third_mr == null || this.Third_mr == undefined || this.Third_mr == "" || this.Third_mr == "undefined") {
        this.Third_mr = null;
      }

      if (this.Third_aadhaar_no == null || this.Third_aadhaar_no == undefined || this.Third_aadhaar_no == "" || this.Third_aadhaar_no == "undefined") {
        this.Third_aadhaar_no = null;
      }

      if (this.Third_pan_no == null || this.Third_pan_no == undefined || this.Third_pan_no == "" || this.Third_pan_no == "undefined") {
        this.Third_pan_no = null;
      }

      if (this.Third_Nationality == null || this.Third_Nationality == undefined || this.Third_Nationality == "" || this.Third_Nationality == "undefined") {
        this.Third_Nationality = null;
      }

      if (this.third_Relation_with == null || this.third_Relation_with == undefined || this.third_Relation_with == "" || this.Third_Nationality == "undefined") {
        this.third_Relation_with = null;
      }

      if (this.third_relation_name == null || this.third_relation_name == undefined || this.third_relation_name == "" || this.Third_Nationality == "undefined") {
        this.third_relation_name = null;
      }

      if (this.third_relationnamePrefix == null || this.third_relationnamePrefix == undefined || this.third_relationnamePrefix == "" || this.Third_Nationality == "undefined") {
        this.third_relationnamePrefix = null;
      }

      if (this.passport_no_third == null || this.passport_no_third == undefined || this.passport_no_third == "" || this.passport_no_third == "undefined") {
        this.passport_no_third = null;
      }


      var co_ApplicantInfo2 = {
        "coApplicantId": null,
        "coApplicantNumber": null,
        "namePrefix": this.third_namePrefix,
        "firstName": this.Third_mr,
        "lastName": null,
        "middleName": null,
        "gender": null,
        "dateOfBirth": this.Third_dob,
        "age": null,
        "aadharId": this.Third_aadhaar_no,
        "voterId": null,
        "pancard": this.Third_pan_no,
        "nationality": this.Third_Nationality,
        "passport": this.passport_no_third,
        "relationWith": this.third_Relation_with,
        "relationWithCust": null,
        "relationName": this.third_relation_name,
        "relationNamePrefix": this.third_relationnamePrefix,
        "statusId": null,
        "status": null,
        "createdDate": null,
        "updatedDate": null
      }


      if (third_marrital_statusdata == null || third_marrital_statusdata == "select" || third_marrital_statusdata == "" || third_marrital_statusdata == undefined) {
        third_marrital_statusdata = null;
      }

      if (this.Third_dob == null || this.Third_dob == undefined || this.Third_dob == "") {
        this.Third_dob = null;
      }

      if (this.Third_Mobile == null || this.Third_Mobile == undefined || this.Third_Mobile == "" || this.Third_Mobile == "undefined") {
        this.Third_Mobile = null;
      }

      if (this.Third_email == null || this.Third_email == undefined || this.Third_email == "" || this.Third_email == "undefined") {
        this.Third_email = null;
      }

      if (this.Third_tel == null || this.Third_tel == undefined || this.Third_tel == "" || this.Third_tel == "undefined") {
        this.Third_tel = null;
      }

      if (this.Third_Education_Qualification == null || this.Third_Education_Qualification == undefined || this.Third_Education_Qualification == "" || this.Third_Education_Qualification == "undefined") {
        this.Third_Education_Qualification = null;
      }


      if (this.Third_Annual_household == null || this.Third_Annual_household == undefined || this.Third_Annual_household == "" || this.Third_Annual_household == "undefined") {
        this.Third_Annual_household = null;
      }

      var coApplicentBookingInfo2 = {
        "coAppBookInfoId": null,
        "phoneNo": this.Third_Mobile,
        "alternatePhoneNo": null,
        "email": this.Third_email,
        "telePhone": this.Third_tel,
        "maritalStatus": third_marrital_statusdata,
        "workExperience": null,
        "dateOfAnniversery": this.Third_dob,
        "educationalQualification": this.Third_Education_Qualification,
        "annualHouseHoldIncome": this.Third_Annual_household,
        "custProffisionalId": null,
        "statusId": null,
        "status": null,
        "createdDate": null,
        "updatedDate": null,
        "coApplicantId": null,
        "custBookInfoId": null
      }


      if (this.third_pincode == null || this.third_pincode == undefined || this.third_pincode == "" || this.third_pincode == "undefined") {
        this.third_pincode = null;
      }
      if (third_perment_cityid == null || third_perment_cityid == undefined || third_perment_cityid == "" || third_perment_cityid == "undefined") {
        third_perment_cityid = null;
      }

      if (third_perment_city_name == null || third_perment_city_name == undefined || third_perment_city_name == "" || third_perment_city_name == "undefined") {
        third_perment_city_name = null;
      }

      if (third_perment_stateid == null || third_perment_stateid == undefined || third_perment_stateid == "" || third_perment_stateid == "undefined") {
        third_perment_stateid = null;
      }

      if (third_perment_state_name == null || third_perment_state_name == undefined || third_perment_state_name == "" || third_perment_state_name == "undefined") {
        third_perment_state_name = null;
      }

      if (third_perment_country_name == null || third_perment_country_name == undefined || third_perment_country_name == "" || third_perment_country_name == "undefined") {
        third_perment_country_name = null;
      }

      if (this.third_permanent == null || this.third_permanent == undefined || this.third_permanent == "" || this.third_permanent == "undefined") {
        this.third_permanent = null;
      }


      var CoAppaddressInfosone_third = [];
      var CoAppaddressInfos_third = {
        "custAddressId": null,
        "floorNo": null,
        "tower": null,
        "street": null,
        "area": null,
        "landmark": null,
        "pincode": this.third_pincode,
        "cityId": third_perment_cityid,
        "city": third_perment_city_name,
        "cityIcon": null,
        "stateId": third_perment_stateid,
        "state": third_perment_state_name,
        "country": third_perment_country_name,
        "countryId": third_perment_countryid,
        "langitude": null,
        "latitude": null,
        "createdDate": null,
        "updatedDate": null,
        "addressType": null,
        "address1": this.third_permanent,
        "address2": null,
        "address3": null,
        "statusId": null,
        "hno": null,
        "addressMappingType": {
          "addressMappingTypeId": null,
          "typeId": 1,
          //"type": null,
          "metaType": "APPLICANT2",
          "addressType": "permenent"
        }
      }
      CoAppaddressInfosone_third.push(CoAppaddressInfos_third);

      if (this.third_pincode1 == null || this.third_pincode1 == undefined || this.third_pincode1 == "" || this.third_pincode1 == "undefined") {
        this.third_pincode1 = null;
      }

      if (third_perment_cityid1 == null || third_perment_cityid1 == undefined || third_perment_cityid1 == "" || third_perment_cityid1 == "undefined") {
        third_perment_cityid1 = null;
      }

      if (third_perment_city_name1 == null || third_perment_city_name1 == undefined || third_perment_city_name1 == "" || third_perment_cityid1 == "undefined") {
        third_perment_city_name1 = null;
      }

      if (third_perment_stateid1 == null || third_perment_stateid1 == undefined || third_perment_stateid1 == "" || third_perment_stateid1 == "undefined") {
        third_perment_stateid1 = null;
      }

      if (third_perment_state_name1 == null || third_perment_state_name1 == undefined || third_perment_state_name1 == "" || third_perment_state_name1 == "undefined") {
        third_perment_state_name1 = null;
      }

      if (third_perment_country_name1 == null || third_perment_country_name1 == undefined || third_perment_country_name1 == "" || third_perment_country_name1 == "undefined") {
        third_perment_country_name1 = null;
      }

      if (this.third_correspondence == null || this.third_correspondence == undefined || this.third_correspondence == "" || this.third_correspondence == "undefined") {
        this.third_correspondence = null;
      }


      var CoAppaddressInfos_third2 = {
        "custAddressId": null,
        "floorNo": null,
        "tower": null,
        "street": null,
        "area": null,
        "landmark": null,
        "pincode": this.third_pincode1,
        "cityId": third_perment_cityid1,
        "city": third_perment_city_name1,
        "cityIcon": null,
        "stateId": third_perment_stateid1,
        "state": third_perment_state_name1,
        "country": third_perment_country_name1,
        "countryId": third_perment_countryid1,
        "langitude": null,
        "latitude": null,
        "createdDate": null,
        "updatedDate": null,
        "addressType": null,
        "address1": this.third_correspondence,
        "address2": null,
        "address3": null,
        "statusId": null,
        "hno": null,
        "addressMappingType": {
          "addressMappingTypeId": null,
          "typeId": 1,
          // "type":null,
          "metaType": "APPLICANT2",
          "addressType": "Correspondence"
        }
      }
      CoAppaddressInfosone_third.push(CoAppaddressInfos_third2);


      if (this.Third_designation == "" || this.Third_designation == null || this.Third_designation == undefined) {
        this.Third_designation = null;
        //  swal("Please enter the third applicate designation");
        //  return false;
      }

      if (this.Third_Name_of_organisation == "" || this.Third_Name_of_organisation == null || this.Third_Name_of_organisation == undefined) {
        this.Third_Name_of_organisation = null;
        //  swal("Please enter the third applicate Name of Organisation/ Business");
        //  return false;
      }

      if (this.Third_Address_of_Organisation == "" || this.Third_Address_of_Organisation == null || this.Third_Address_of_Organisation == undefined) {
        this.Third_Address_of_Organisation = null;
        // swal("Please enter the third applicate Address of Organisation/ Business");
        // return false;
      }

      if (this.Third_Office_number == "" || this.Third_Office_number == null || this.Third_Office_number == undefined) {
        this.Third_Office_number = null;
        // swal("Please enter the third applicate Office Number");
        // return false;
      }

      if (this.Third_office_email_id == "" || this.Third_office_email_id == null || this.Third_office_email_id == undefined) {

        this.Third_office_email_id = null;

        //swal("Please enter the third applicate Office Email Id");
        //  return false;
      }


      if (this.Third_Organization_type == "" || this.Third_Organization_type == null || this.Third_Organization_type == undefined) {
        this.Third_Organization_type = null;
        //  swal("Please enter the third applicate Organizational Type");
        //  return false;
      }

      if (this.Third_Industry_sector_of_work == "" || this.Third_Industry_sector_of_work == null || this.Third_Industry_sector_of_work == undefined) {
        this.Third_Industry_sector_of_work = null;
        //   swal("Please enter the third applicate Industry Sector of work/ Business ");
        //  return false;
      }

      if (this.Third_work_function_role == "" || this.Third_work_function_role == null || this.Third_work_function_role == undefined) {
        this.Third_work_function_role = null;
        //  swal("Please enter the third applicate Work Function/ Role");
        // return false;
      }

      if (this.Third_Number_of_years == "" || this.Third_Number_of_years == null || this.Third_Number_of_years == undefined) {
        this.Third_Number_of_years = null;
        //  swal("Please enter the third applicate Number of years of work Experience");
        //  return false;
      }

      if (this.Third_Education_Qualification == "" || this.Third_Education_Qualification == null || this.Third_Education_Qualification == undefined) {
        this.Third_Education_Qualification = null;
        //  swal("Please enter the third applicate Education Qualification ");
        //  return false;
      }

      if (this.Third_Annual_household == "" || this.Third_Annual_household == null || this.Third_Annual_household == undefined) {

        this.Third_Annual_household = null;
        //  swal("Please enter the third applicate Annual Household Income (Rupees) ");
        //  return false;
      }



      var professionalInfo_third = {
        "designation": this.Third_designation,
        "nameOfOrganization": this.Third_Name_of_organisation,
        "addressOfOrganization": this.Third_Address_of_Organisation,
        "officeNumber": this.Third_Office_number,
        "officeEmailId": this.Third_office_email_id,
        "custProffisionalId": null,
        "statusId": null,
        "createdDate": null,
        "modifiedDate": null,
        "oraganizationDetails": {
          "organizationTypeId": null,
          "organizationTypeName": this.Third_Organization_type,
          "ifOtherOrgTypeName": this.Third_designation
        },
        "sectorDetailsInfo": {
          "workSectorId": null,
          "workSectorName": this.Third_Industry_sector_of_work,
          "ifOtherWorkSectorName": this.Third_Name_of_organisation
        },
        "workFunctionInfo": {
          "workFunctionId": null,
          "workFunctionName": this.Third_work_function_role,
          "ifOtherworkFunctionName": null
        },
        "yearsOfExperience": this.Third_Number_of_years
      }



      CoAppData.push({ "co_ApplicantInfo": co_ApplicantInfo2, "coApplicentBookingInfo": coApplicentBookingInfo2, "addressInfos": CoAppaddressInfosone_third, "professionalInfo": professionalInfo_third });
      if ($("#pan_no_first").val() == $("#second_pan_no").val() || $("#second_pan_no").val() == $("#Third_pan_no").val() || $("#pan_no_first").val() == $("#Third_pan_no").val()) {
        swal("PAN number must be unique number");
        return false;
      }
      if ($("#aadhaar_no_first").val() == $("#second_aadhaar_no").val() || $("#second_aadhaar_no").val() == $("#Third_aadhaar_no").val() || $("#aadhaar_no_first").val() == $("#Third_aadhaar_no").val()) {
        swal("Aadhar number must be unique number");
        return false;
      }


    } else if (thirdApplicantInfo != undefined) {

      // --------------------------THIRD APPLICANT (MANDATORY) ---------------------


      if (this.Third_dob == null || this.Third_dob == undefined || this.Third_dob == "" || this.Third_dob == "undefined") {
        this.Third_dob = null;
      } else {
        this.Third_dob = $("#Third_dob").val();
      }

      if (this.third_namePrefix == null || this.third_namePrefix == undefined || this.third_namePrefix == "" || this.third_namePrefix == "undefined") {
        this.third_namePrefix = null;
      }

      if (this.Third_mr == null || this.Third_mr == undefined || this.Third_mr == "" || this.Third_mr == "undefined") {
        this.Third_mr = null;
      }

      if (this.Third_aadhaar_no == null || this.Third_aadhaar_no == undefined || this.Third_aadhaar_no == "" || this.Third_aadhaar_no == "undefined") {
        this.Third_aadhaar_no = null;
      }

      if (this.Third_pan_no == null || this.Third_pan_no == undefined || this.Third_pan_no == "" || this.Third_pan_no == "undefined") {
        this.Third_pan_no = null;
      }

      if (this.Third_Nationality == null || this.Third_Nationality == undefined || this.Third_Nationality == "" || this.Third_Nationality == "undefined") {
        this.Third_Nationality = null;
      }

      if (this.third_Relation_with == null || this.third_Relation_with == undefined || this.third_Relation_with == "" || this.Third_Nationality == "undefined") {
        this.third_Relation_with = null;
      }

      if (this.third_relation_name == null || this.third_relation_name == undefined || this.third_relation_name == "" || this.Third_Nationality == "undefined") {
        this.third_relation_name = null;
      }

      if (this.third_relationnamePrefix == null || this.third_relationnamePrefix == undefined || this.third_relationnamePrefix == "" || this.Third_Nationality == "undefined") {
        this.third_relationnamePrefix = null;
      }




      if (this.passport_no_third == null || this.passport_no_third == undefined || this.passport_no_third == "" || this.passport_no_third == "undefined") {
        this.passport_no_third = null;
      }

      

      var co_ApplicantInfo2 = {
        "coApplicantId": null,
        "coApplicantNumber": null,
        "namePrefix": this.third_namePrefix,
        "firstName": this.Third_mr,
        "lastName": null,
        "middleName": null,
        "gender": null,
        "dateOfBirth": this.Third_dob,
        "age": null,
        "aadharId": this.Third_aadhaar_no,
        "passport": this.passport_no_third,
        "voterId": null,
        "pancard": this.Third_pan_no,
        "nationality": this.Third_Nationality,
        "relationWith": this.third_Relation_with,
        "relationWithCust": null,
        "relationName": this.third_relation_name,
        "relationNamePrefix": this.third_relationnamePrefix,
        "statusId": null,
        "status": null,
        "createdDate": null,
        "updatedDate": null
      }


      if (third_marrital_statusdata == null || third_marrital_statusdata == "select" || third_marrital_statusdata == "" || third_marrital_statusdata == undefined) {
        third_marrital_statusdata = null;
      }

      if (this.Third_dob == null || this.Third_dob == undefined || this.Third_dob == "") {
        this.Third_dob = null;
      }

      if (this.Third_Mobile == null || this.Third_Mobile == undefined || this.Third_Mobile == "" || this.Third_Mobile == "undefined") {
        this.Third_Mobile = null;
      }

      if (this.Third_email == null || this.Third_email == undefined || this.Third_email == "" || this.Third_email == "undefined") {
        this.Third_email = null;
      }

      if (this.Third_tel == null || this.Third_tel == undefined || this.Third_tel == "" || this.Third_tel == "undefined") {
        this.Third_tel = null;
      }

      if (this.Third_Education_Qualification == null || this.Third_Education_Qualification == undefined || this.Third_Education_Qualification == "" || this.Third_Education_Qualification == "undefined") {
        this.Third_Education_Qualification = null;
      }


      if (this.Third_Annual_household == null || this.Third_Annual_household == undefined || this.Third_Annual_household == "" || this.Third_Annual_household == "undefined") {
        this.Third_Annual_household = null;
      }

      var coApplicentBookingInfo2 = {
        "coAppBookInfoId": null,
        "phoneNo": this.Third_Mobile,
        "alternatePhoneNo": null,
        "email": this.Third_email,
        "telePhone": this.Third_tel,
        "maritalStatus": third_marrital_statusdata,
        "workExperience": null,
        "dateOfAnniversery": this.Third_dob,
        "educationalQualification": this.Third_Education_Qualification,
        "annualHouseHoldIncome": this.Third_Annual_household,
        "custProffisionalId": null,
        "statusId": null,
        "status": null,
        "createdDate": null,
        "updatedDate": null,
        "coApplicantId": null,
        "custBookInfoId": null
      }


      if (this.third_pincode == null || this.third_pincode == undefined || this.third_pincode == "" || this.third_pincode == "undefined") {
        this.third_pincode = null;
      }
      if (third_perment_cityid == null || third_perment_cityid == undefined || third_perment_cityid == "" || third_perment_cityid == "undefined") {
        third_perment_cityid = null;
      }

      if (third_perment_city_name == null || third_perment_city_name == undefined || third_perment_city_name == "" || third_perment_city_name == "undefined") {
        third_perment_city_name = null;
      }

      if (third_perment_stateid == null || third_perment_stateid == undefined || third_perment_stateid == "" || third_perment_stateid == "undefined") {
        third_perment_stateid = null;
      }

      if (third_perment_state_name == null || third_perment_state_name == undefined || third_perment_state_name == "" || third_perment_state_name == "undefined") {
        third_perment_state_name = null;
      }

      if (third_perment_country_name == null || third_perment_country_name == undefined || third_perment_country_name == "" || third_perment_country_name == "undefined") {
        third_perment_country_name = null;
      }

      if (this.third_permanent == null || this.third_permanent == undefined || this.third_permanent == "" || this.third_permanent == "undefined") {
        this.third_permanent = null;
      }


      var CoAppaddressInfosone_third = [];
      var CoAppaddressInfos_third = {
        "custAddressId": null,
        "floorNo": null,
        "tower": null,
        "street": null,
        "area": null,
        "landmark": null,
        "pincode": this.third_pincode,
        "cityId": third_perment_cityid,
        "city": third_perment_city_name,
        "cityIcon": null,
        "stateId": third_perment_stateid,
        "state": third_perment_state_name,
        "country": third_perment_country_name,
        "countryId": third_perment_countryid,
        "langitude": null,
        "latitude": null,
        "createdDate": null,
        "updatedDate": null,
        "addressType": null,
        "address1": this.third_permanent,
        "address2": null,
        "address3": null,
        "statusId": null,
        "hno": null,
        "addressMappingType": {
          "addressMappingTypeId": null,
          "typeId": 1,
          //"type": null,
          "metaType": "APPLICANT2",
          "addressType": "permenent"
        }
      }
      CoAppaddressInfosone_third.push(CoAppaddressInfos_third);

      if (this.third_pincode1 == null || this.third_pincode1 == undefined || this.third_pincode1 == "" || this.third_pincode1 == "undefined") {
        this.third_pincode1 = null;
      }

      if (third_perment_cityid1 == null || third_perment_cityid1 == undefined || third_perment_cityid1 == "" || third_perment_cityid1 == "undefined") {
        third_perment_cityid1 = null;
      }

      if (third_perment_city_name1 == null || third_perment_city_name1 == undefined || third_perment_city_name1 == "" || third_perment_cityid1 == "undefined") {
        third_perment_city_name1 = null;
      }

      if (third_perment_stateid1 == null || third_perment_stateid1 == undefined || third_perment_stateid1 == "" || third_perment_stateid1 == "undefined") {
        third_perment_stateid1 = null;
      }

      if (third_perment_state_name1 == null || third_perment_state_name1 == undefined || third_perment_state_name1 == "" || third_perment_state_name1 == "undefined") {
        third_perment_state_name1 = null;
      }

      if (third_perment_country_name1 == null || third_perment_country_name1 == undefined || third_perment_country_name1 == "" || third_perment_country_name1 == "undefined") {
        third_perment_country_name1 = null;
      }

      if (this.third_correspondence == null || this.third_correspondence == undefined || this.third_correspondence == "" || this.third_correspondence == "undefined") {
        this.third_correspondence = null;
      }


      var CoAppaddressInfos_third2 = {
        "custAddressId": null,
        "floorNo": null,
        "tower": null,
        "street": null,
        "area": null,
        "landmark": null,
        "pincode": this.third_pincode1,
        "cityId": third_perment_cityid1,
        "city": third_perment_city_name1,
        "cityIcon": null,
        "stateId": third_perment_stateid1,
        "state": third_perment_state_name1,
        "country": third_perment_country_name1,
        "countryId": third_perment_countryid1,
        "langitude": null,
        "latitude": null,
        "createdDate": null,
        "updatedDate": null,
        "addressType": null,
        "address1": this.third_correspondence,
        "address2": null,
        "address3": null,
        "statusId": null,
        "hno": null,
        "addressMappingType": {
          "addressMappingTypeId": null,
          "typeId": 1,
          // "type":null,
          "metaType": "APPLICANT2",
          "addressType": "Correspondence"
        }
      }
      CoAppaddressInfosone_third.push(CoAppaddressInfos_third2);


      if (this.Third_designation == "" || this.Third_designation == null || this.Third_designation == undefined) {
        this.Third_designation = null;
        //  swal("Please enter the third applicate designation");
        //  return false;
      }

      if (this.Third_Name_of_organisation == "" || this.Third_Name_of_organisation == null || this.Third_Name_of_organisation == undefined) {
        this.Third_Name_of_organisation = null;
        //  swal("Please enter the third applicate Name of Organisation/ Business");
        //  return false;
      }

      if (this.Third_Address_of_Organisation == "" || this.Third_Address_of_Organisation == null || this.Third_Address_of_Organisation == undefined) {
        this.Third_Address_of_Organisation = null;
        // swal("Please enter the third applicate Address of Organisation/ Business");
        // return false;
      }

      if (this.Third_Office_number == "" || this.Third_Office_number == null || this.Third_Office_number == undefined) {
        this.Third_Office_number = null;
        // swal("Please enter the third applicate Office Number");
        // return false;
      }

      if (this.Third_office_email_id == "" || this.Third_office_email_id == null || this.Third_office_email_id == undefined) {

        this.Third_office_email_id = null;

        //swal("Please enter the third applicate Office Email Id");
        //  return false;
      }


      if (this.Third_Organization_type == "" || this.Third_Organization_type == null || this.Third_Organization_type == undefined) {
        this.Third_Organization_type = null;
        //  swal("Please enter the third applicate Organizational Type");
        //  return false;
      }

      if (this.Third_Industry_sector_of_work == "" || this.Third_Industry_sector_of_work == null || this.Third_Industry_sector_of_work == undefined) {
        this.Third_Industry_sector_of_work = null;
        //   swal("Please enter the third applicate Industry Sector of work/ Business ");
        //  return false;
      }

      if (this.Third_work_function_role == "" || this.Third_work_function_role == null || this.Third_work_function_role == undefined) {
        this.Third_work_function_role = null;
        //  swal("Please enter the third applicate Work Function/ Role");
        // return false;
      }

      if (this.Third_Number_of_years == "" || this.Third_Number_of_years == null || this.Third_Number_of_years == undefined) {
        this.Third_Number_of_years = null;
        //  swal("Please enter the third applicate Number of years of work Experience");
        //  return false;
      }

      if (this.Third_Education_Qualification == "" || this.Third_Education_Qualification == null || this.Third_Education_Qualification == undefined) {
        this.Third_Education_Qualification = null;
        //  swal("Please enter the third applicate Education Qualification ");
        //  return false;
      }

      if (this.Third_Annual_household == "" || this.Third_Annual_household == null || this.Third_Annual_household == undefined) {

        this.Third_Annual_household = null;
        //  swal("Please enter the third applicate Annual Household Income (Rupees) ");
        //  return false;
      }



      var professionalInfo_third = {
        "designation": this.Third_designation,
        "nameOfOrganization": this.Third_Name_of_organisation,
        "addressOfOrganization": this.Third_Address_of_Organisation,
        "officeNumber": this.Third_Office_number,
        "officeEmailId": this.Third_office_email_id,
        "custProffisionalId": null,
        "statusId": null,
        "createdDate": null,
        "modifiedDate": null,
        "oraganizationDetails": {
          "organizationTypeId": null,
          "organizationTypeName": this.Third_Organization_type,
          "ifOtherOrgTypeName": this.Third_designation
        },
        "sectorDetailsInfo": {
          "workSectorId": null,
          "workSectorName": this.Third_Industry_sector_of_work,
          "ifOtherWorkSectorName": this.Third_Name_of_organisation
        },
        "workFunctionInfo": {
          "workFunctionId": null,
          "workFunctionName": this.Third_work_function_role,
          "ifOtherworkFunctionName": null
        },
        "yearsOfExperience": this.Third_Number_of_years
      }



      CoAppData.push({ "co_ApplicantInfo": co_ApplicantInfo2, "coApplicentBookingInfo": coApplicentBookingInfo2, "addressInfos": CoAppaddressInfosone_third, "professionalInfo": professionalInfo_third });


    } else {

      // --------------------------THIRD APPLICANT (MANDATORY) ---------------------


      if (this.Third_dob == null || this.Third_dob == undefined || this.Third_dob == "" || this.Third_dob == "undefined") {
        this.Third_dob = null;
      } else {
        this.Third_dob = $("#Third_dob").val();
      }

      if (this.third_namePrefix == null || this.third_namePrefix == undefined || this.third_namePrefix == "" || this.third_namePrefix == "undefined") {
        this.third_namePrefix = null;
      }

      if (this.Third_mr == null || this.Third_mr == undefined || this.Third_mr == "" || this.Third_mr == "undefined") {
        this.Third_mr = null;
      }

      if (this.Third_aadhaar_no == null || this.Third_aadhaar_no == undefined || this.Third_aadhaar_no == "" || this.Third_aadhaar_no == "undefined") {
        this.Third_aadhaar_no = null;
      }

      if (this.Third_pan_no == null || this.Third_pan_no == undefined || this.Third_pan_no == "" || this.Third_pan_no == "undefined") {
        this.Third_pan_no = null;
      }

      if (this.Third_Nationality == null || this.Third_Nationality == undefined || this.Third_Nationality == "" || this.Third_Nationality == "undefined") {
        this.Third_Nationality = null;
      }

      if (this.third_Relation_with == null || this.third_Relation_with == undefined || this.third_Relation_with == "" || this.Third_Nationality == "undefined") {
        this.third_Relation_with = null;
      }

      if (this.third_relation_name == null || this.third_relation_name == undefined || this.third_relation_name == "" || this.Third_Nationality == "undefined") {
        this.third_relation_name = null;
      }

      if (this.third_relationnamePrefix == null || this.third_relationnamePrefix == undefined || this.third_relationnamePrefix == "" || this.Third_Nationality == "undefined") {
        this.third_relationnamePrefix = null;
      }

      if (this.passport_no_third == null || this.passport_no_third == undefined || this.passport_no_third == "" || this.passport_no_third == "undefined") {
        this.passport_no_third = null;
      }




      var co_ApplicantInfo2 = {
        "coApplicantId": null,
        "coApplicantNumber": null,
        "namePrefix": this.third_namePrefix,
        "firstName": this.Third_mr,
        "lastName": null,
        "middleName": null,
        "gender": null,
        "dateOfBirth": this.Third_dob,
        "age": null,
        "aadharId": this.Third_aadhaar_no,
        "passport": this.passport_no_third,
        "voterId": null,
        "pancard": this.Third_pan_no,
        "nationality": this.Third_Nationality,
        "relationWith": this.third_Relation_with,
        "relationWithCust": null,
        "relationName": this.third_relation_name,
        "relationNamePrefix": this.third_relationnamePrefix,
        "statusId": null,
        "status": null,
        "createdDate": null,
        "updatedDate": null
      }


      if (third_marrital_statusdata == null || third_marrital_statusdata == "select" || third_marrital_statusdata == "" || third_marrital_statusdata == undefined) {
        third_marrital_statusdata = null;
      }

      if (this.Third_dob == null || this.Third_dob == undefined || this.Third_dob == "") {
        this.Third_dob = null;
      }

      if (this.Third_Mobile == null || this.Third_Mobile == undefined || this.Third_Mobile == "" || this.Third_Mobile == "undefined") {
        this.Third_Mobile = null;
      }

      if (this.Third_email == null || this.Third_email == undefined || this.Third_email == "" || this.Third_email == "undefined") {
        this.Third_email = null;
      }

      if (this.Third_tel == null || this.Third_tel == undefined || this.Third_tel == "" || this.Third_tel == "undefined") {
        this.Third_tel = null;
      }

      if (this.Third_Education_Qualification == null || this.Third_Education_Qualification == undefined || this.Third_Education_Qualification == "" || this.Third_Education_Qualification == "undefined") {
        this.Third_Education_Qualification = null;
      }


      if (this.Third_Annual_household == null || this.Third_Annual_household == undefined || this.Third_Annual_household == "" || this.Third_Annual_household == "undefined") {
        this.Third_Annual_household = null;
      }

      var coApplicentBookingInfo2 = {
        "coAppBookInfoId": null,
        "phoneNo": this.Third_Mobile,
        "alternatePhoneNo": null,
        "email": this.Third_email,
        "telePhone": this.Third_tel,
        "maritalStatus": third_marrital_statusdata,
        "workExperience": null,
        "dateOfAnniversery": this.Third_dob,
        "educationalQualification": this.Third_Education_Qualification,
        "annualHouseHoldIncome": this.Third_Annual_household,
        "custProffisionalId": null,
        "statusId": null,
        "status": null,
        "createdDate": null,
        "updatedDate": null,
        "coApplicantId": null,
        "custBookInfoId": null
      }


      if (this.third_pincode == null || this.third_pincode == undefined || this.third_pincode == "" || this.third_pincode == "undefined") {
        this.third_pincode = null;
      }
      if (third_perment_cityid == null || third_perment_cityid == undefined || third_perment_cityid == "" || third_perment_cityid == "undefined") {
        third_perment_cityid = null;
      }

      if (third_perment_city_name == null || third_perment_city_name == undefined || third_perment_city_name == "" || third_perment_city_name == "undefined") {
        third_perment_city_name = null;
      }

      if (third_perment_stateid == null || third_perment_stateid == undefined || third_perment_stateid == "" || third_perment_stateid == "undefined") {
        third_perment_stateid = null;
      }

      if (third_perment_state_name == null || third_perment_state_name == undefined || third_perment_state_name == "" || third_perment_state_name == "undefined") {
        third_perment_state_name = null;
      }

      if (third_perment_country_name == null || third_perment_country_name == undefined || third_perment_country_name == "" || third_perment_country_name == "undefined") {
        third_perment_country_name = null;
      }

      if (this.third_permanent == null || this.third_permanent == undefined || this.third_permanent == "" || this.third_permanent == "undefined") {
        this.third_permanent = null;
      }


      var CoAppaddressInfosone_third = [];
      var CoAppaddressInfos_third = {
        "custAddressId": null,
        "floorNo": null,
        "tower": null,
        "street": null,
        "area": null,
        "landmark": null,
        "pincode": this.third_pincode,
        "cityId": third_perment_cityid,
        "city": third_perment_city_name,
        "cityIcon": null,
        "stateId": third_perment_stateid,
        "state": third_perment_state_name,
        "country": third_perment_country_name,
        "countryId": third_perment_countryid,
        "langitude": null,
        "latitude": null,
        "createdDate": null,
        "updatedDate": null,
        "addressType": null,
        "address1": this.third_permanent,
        "address2": null,
        "address3": null,
        "statusId": null,
        "hno": null,
        "addressMappingType": {
          "addressMappingTypeId": null,
          "typeId": 1,
          //"type": null,
          "metaType": "APPLICANT2",
          "addressType": "permenent"
        }
      }
      CoAppaddressInfosone_third.push(CoAppaddressInfos_third);

      if (this.third_pincode1 == null || this.third_pincode1 == undefined || this.third_pincode1 == "" || this.third_pincode1 == "undefined") {
        this.third_pincode1 = null;
      }

      if (third_perment_cityid1 == null || third_perment_cityid1 == undefined || third_perment_cityid1 == "" || third_perment_cityid1 == "undefined") {
        third_perment_cityid1 = null;
      }

      if (third_perment_city_name1 == null || third_perment_city_name1 == undefined || third_perment_city_name1 == "" || third_perment_cityid1 == "undefined") {
        third_perment_city_name1 = null;
      }

      if (third_perment_stateid1 == null || third_perment_stateid1 == undefined || third_perment_stateid1 == "" || third_perment_stateid1 == "undefined") {
        third_perment_stateid1 = null;
      }

      if (third_perment_state_name1 == null || third_perment_state_name1 == undefined || third_perment_state_name1 == "" || third_perment_state_name1 == "undefined") {
        third_perment_state_name1 = null;
      }

      if (third_perment_country_name1 == null || third_perment_country_name1 == undefined || third_perment_country_name1 == "" || third_perment_country_name1 == "undefined") {
        third_perment_country_name1 = null;
      }

      if (this.third_correspondence == null || this.third_correspondence == undefined || this.third_correspondence == "" || this.third_correspondence == "undefined") {
        this.third_correspondence = null;
      }


      var CoAppaddressInfos_third2 = {
        "custAddressId": null,
        "floorNo": null,
        "tower": null,
        "street": null,
        "area": null,
        "landmark": null,
        "pincode": this.third_pincode1,
        "cityId": third_perment_cityid1,
        "city": third_perment_city_name1,
        "cityIcon": null,
        "stateId": third_perment_stateid1,
        "state": third_perment_state_name1,
        "country": third_perment_country_name1,
        "countryId": third_perment_countryid1,
        "langitude": null,
        "latitude": null,
        "createdDate": null,
        "updatedDate": null,
        "addressType": null,
        "address1": this.third_correspondence,
        "address2": null,
        "address3": null,
        "statusId": null,
        "hno": null,
        "addressMappingType": {
          "addressMappingTypeId": null,
          "typeId": 1,
          // "type":null,
          "metaType": "APPLICANT2",
          "addressType": "Correspondence"
        }
      }
      CoAppaddressInfosone_third.push(CoAppaddressInfos_third2);


      if (this.Third_designation == "" || this.Third_designation == null || this.Third_designation == undefined) {
        this.Third_designation = null;
        //  swal("Please enter the third applicate designation");
        //  return false;
      }

      if (this.Third_Name_of_organisation == "" || this.Third_Name_of_organisation == null || this.Third_Name_of_organisation == undefined) {
        this.Third_Name_of_organisation = null;
        //  swal("Please enter the third applicate Name of Organisation/ Business");
        //  return false;
      }

      if (this.Third_Address_of_Organisation == "" || this.Third_Address_of_Organisation == null || this.Third_Address_of_Organisation == undefined) {
        this.Third_Address_of_Organisation = null;
        // swal("Please enter the third applicate Address of Organisation/ Business");
        // return false;
      }

      if (this.Third_Office_number == "" || this.Third_Office_number == null || this.Third_Office_number == undefined) {
        this.Third_Office_number = null;
        // swal("Please enter the third applicate Office Number");
        // return false;
      }

      if (this.Third_office_email_id == "" || this.Third_office_email_id == null || this.Third_office_email_id == undefined) {

        this.Third_office_email_id = null;

        //swal("Please enter the third applicate Office Email Id");
        //  return false;
      }


      if (this.Third_Organization_type == "" || this.Third_Organization_type == null || this.Third_Organization_type == undefined) {
        this.Third_Organization_type = null;
        //  swal("Please enter the third applicate Organizational Type");
        //  return false;
      }

      if (this.Third_Industry_sector_of_work == "" || this.Third_Industry_sector_of_work == null || this.Third_Industry_sector_of_work == undefined) {
        this.Third_Industry_sector_of_work = null;
        //   swal("Please enter the third applicate Industry Sector of work/ Business ");
        //  return false;
      }

      if (this.Third_work_function_role == "" || this.Third_work_function_role == null || this.Third_work_function_role == undefined) {
        this.Third_work_function_role = null;
        //  swal("Please enter the third applicate Work Function/ Role");
        // return false;
      }

      if (this.Third_Number_of_years == "" || this.Third_Number_of_years == null || this.Third_Number_of_years == undefined) {
        this.Third_Number_of_years = null;
        //  swal("Please enter the third applicate Number of years of work Experience");
        //  return false;
      }

      if (this.Third_Education_Qualification == "" || this.Third_Education_Qualification == null || this.Third_Education_Qualification == undefined) {
        this.Third_Education_Qualification = null;
        //  swal("Please enter the third applicate Education Qualification ");
        //  return false;
      }

      if (this.Third_Annual_household == "" || this.Third_Annual_household == null || this.Third_Annual_household == undefined) {

        this.Third_Annual_household = null;
        //  swal("Please enter the third applicate Annual Household Income (Rupees) ");
        //  return false;
      }



      var professionalInfo_third = {
        "designation": this.Third_designation,
        "nameOfOrganization": this.Third_Name_of_organisation,
        "addressOfOrganization": this.Third_Address_of_Organisation,
        "officeNumber": this.Third_Office_number,
        "officeEmailId": this.Third_office_email_id,
        "custProffisionalId": null,
        "statusId": null,
        "createdDate": null,
        "modifiedDate": null,
        "oraganizationDetails": {
          "organizationTypeId": null,
          "organizationTypeName": this.Third_Organization_type,
          "ifOtherOrgTypeName": this.Third_designation
        },
        "sectorDetailsInfo": {
          "workSectorId": null,
          "workSectorName": this.Third_Industry_sector_of_work,
          "ifOtherWorkSectorName": this.Third_Name_of_organisation
        },
        "workFunctionInfo": {
          "workFunctionId": null,
          "workFunctionName": this.Third_work_function_role,
          "ifOtherworkFunctionName": null
        },
        "yearsOfExperience": this.Third_Number_of_years
      }



      CoAppData.push({ "co_ApplicantInfo": co_ApplicantInfo2, "coApplicentBookingInfo": coApplicentBookingInfo2, "addressInfos": CoAppaddressInfosone_third, "professionalInfo": professionalInfo_third });
    }







    // --------------------------Unit Details ---------------------
    this.unit_project = $("#unit_project").val();
    this.unit_block = $("#unit_block").val();
    this.unit_floor = $("#unit_floor").val();
    this.unitno = $("#unitno").val();
    // this.unit_LeadId = $("#unit_LeadId").val();
    this.unit_booking_date = $("#unit_booking_date").val();
    this.unit_Agreement_date = $("#unit_Agreement_date").val();
    this.facing_unit = $("#facing_unit").val();
    this.unit_oldbooking_name = $("#unit_oldbooking_name").val();
    this.unit_new_booking_reason = $("#unit_new_booking_reason").val();
    this.carpet_area_unit = $("#carpet_area_unit").val();
    this.sbua_unit = $("#sbua_unit").val();
    this.Rate_per_sqft_unit = $("#Rate_per_sqft_unit").val();
    this.unit_basic_flat_cost = $("#unit_basic_flat_cost").val();
    this.unit_total_agreement_cost = $("#unit_total_agreement_cost").val();
    this.unit_overallPricePerSft = $("#unit_overallPricePerSft").val();
    this.unit_total_cost = $("#unit_total_cost").val();
    this.Scheme_name = $("#Scheme_name").val();
    this.unit_total_gst_amount = $("#unit_total_gst_amount").val();
    this.unit_taxesPerSft = $("#unit_taxesPerSft").val();
    this.unit_actualPricePerSft = $("#unit_actualPricePerSft").val();
    this.unit_amenitiesFlatCost = $("#unit_amenitiesFlatCost").val();
    this.unit_total_cost_exclude_gst = $("#unit_total_cost_exclude_gst").val();
    //this.unit_subaSqft = $("#unit_subaSqft").val();
    this.unit_group = $("#unit_group").val();
    this.unit_quoted_base_price = $("#unit_quoted_base_price").val();

    this.unit_Rupees_in_words = $("#unit_Rupees_in_words").val();
    this.unit_eoi_applicable = $("#unit_eoi_applicable").val();
    this.unit_eoi_sequence_number = $("#unit_eoi_sequence_number").val();
    this.unit_experience_with_sumadhura = $("#unit_experience_with_sumadhura").val();
    this.unit_amenities_cost = $("#unit_amenities_cost").val();
    this.unit_AAA = $("#unit_AAA").val();
    this.unit_discount = $("#unit_discount").val();







    // if (this.unit_project == "select" || this.unit_project == null) {
    //   swal("Please select the project name");
    //   return false;
    // }
    // if (this.unit_block == null || this.unit_block == "select") {
    //   swal("Please select the block name");
    //   return false;
    // }
    // if (this.unit_floor == null || this.unit_floor == "select") {
    //   swal("Please select the floor name");
    //   return false;
    // }

    // if (this.unitno == null || this.unitno == "select") {
    //   swal("Please select the unit number");
    //   return false;
    // }

    // if (this.unit_LeadId == null || this.unit_LeadId == "select") {
    //   swal("Please enter the Lead Id");
    //   return false;
    // }


    // if (this.unit_booking_date == "" || this.unit_booking_date == null || this.unit_booking_date == "select" || this.unit_booking_date == undefined) {
    //   swal("Please select the booking date");
    //   return false;
    // }

    if (this.unit_Agreement_date == "" || this.unit_Agreement_date == null || this.unit_Agreement_date == "select" || this.unit_Agreement_date == undefined) {
      this.unit_Agreement_date = null;
      // swal("Please select the Agreement date");
      //return false;
    }

    if (this.facing_unit == "" || this.facing_unit == null || this.facing_unit == undefined) {
      this.facing_unit = null;
      // swal("Please select the Agreement date");
      //return false;
    }

    // if (this.unit_oldbooking_name == "" || this.unit_oldbooking_name == null || this.unit_oldbooking_name == "select" || this.unit_oldbooking_name == undefined) {
    //   swal("Please enter old booking name");
    //   return false;
    // }

    // if (this.unit_new_booking_reason == "" || this.unit_new_booking_reason == null || this.unit_new_booking_reason == "select" || this.unit_new_booking_reason == undefined) {
    //   swal("Please enter the new booking reason");
    //   return false;
    // }

    if (this.carpet_area_unit == "" || this.carpet_area_unit == null || this.carpet_area_unit == "select" || this.carpet_area_unit == undefined) {
      // this.carpet_area_unit == null
      //  swal("Please enter the carpet area");
      // return false;
    }

    // if (this.sbua_unit == "") {
    //   swal("Please enter the SBUA");
    //   return false;
    // }
    // if (this.unit_quoted_base_price == "") {
    //   swal("Please enter the quoted base price ");
    //   return false;
    // }

    // if (this.Rate_per_sqft_unit == "") {
    //   swal("Please enter the rate per sq.ft");
    //   return false;
    // }

    // if (this.unit_basic_flat_cost == "") {
    //   swal("Please enter the  basic flat cost");
    //   return false;
    // }


    // if (this.unit_amenitiesFlatCost == "") {
    //   swal("Please enter the Builder/Aminities ");
    //   return false;
    // }

    // if (this.unit_total_cost_exclude_gst == "") {
    //   swal("Please enter the total cost exclude gst ");
    //   return false;
    // }

    // if (this.Scheme_name == "") {
    //   swal("Please select the  schema name");
    //   return false;
    // }

    // if (this.unit_total_gst_amount == "") {
    //   swal("Please enter the total GST amount ");
    //   return false;
    // }

    // if (this.unit_taxesPerSft == "") {
    //   swal("Please enter the taxes perSft ");
    //   return false;
    // }


    // if (this.unit_total_cost == "") {
    //   swal("Please enter the  total cost");
    //   return false;
    // }

    // if (this.unit_actualPricePerSft == "") {
    //   swal("Please enter the actual price perSft ");
    //   return false;
    // }

    // if (this.unit_total_agreement_cost == "") {
    //   swal("Please enter the total agreement Cost");
    //   return false;
    // }

    // if (this.unit_overallPricePerSft == "") {
    //   swal("Please enter the overall price perSft");
    //   return false;
    // }

    // if (this.unit_subaSqft == "") {
    //   swal("Please enter the suba sqft ");
    //   return false;
    // }

    // if (this.unit_group == "" || this.unit_group == null || this.unit_group == "select" || this.unit_group == undefined) {
    //   swal("Please select the unit group");
    //   return false;
    // }

    if (unit_flatname_id == null || unit_flatname_id == undefined || unit_flatname_id == "" || unit_flatname_id == "undefined") {
      unit_flatname_id = null;
    }

    if (unit_floorname_id == null || unit_floorname_id == undefined || unit_floorname_id == "" || unit_floorname_id == "undefined") {
      unit_floorname_id = null;
    }

    if (unit_flatname_name == null || unit_flatname_name == undefined || unit_flatname_name == "" || unit_flatname_name == "undefined") {
      unit_flatname_name = null;
    }

    if (unit_floorname_name == undefined) {
      unit_floorname_name = null;
    }

    var flatInfo = {
      "flatId": unit_flatname_id,
      "floorDetId": unit_floorname_id,
      "flatNo": unit_flatname_name,
      "imageLocation": null,
      "status_Id": null,
      "expectedHandOverDate": null
    }


    if (unit_floorname_name == null || unit_floorname_name == undefined || unit_floorname_name == "" || unit_floorname_name == "undefined") {
      unit_floorname_name = null;
    }

    var floorInfo = {
      "floorId": bookingForData.flatBookingInfo.floorInfo.floorId,
      "floorName": bookingForData.flatBookingInfo.floorInfo.floorName,
      "createdDate": null
    }

    if (unit_blockname_id == null || unit_blockname_id == undefined || unit_blockname_id == "" || unit_blockname_id == "undefined") {
      unit_blockname_id = null;
    }

    if (unit_block_name == null || unit_block_name == undefined || unit_block_name == "" || unit_block_name == "undefined") {
      unit_block_name = null;
    }

    var blockInfo = {
      "blockId": unit_blockname_id,
      "name": unit_block_name,
      "createdDate": null
    }

    if (unit_projectname_id == null || unit_projectname_id == undefined || unit_projectname_id == "" || unit_projectname_id == "undefined") {
      unit_projectname_id = null;
    }

    if (unit_project_name == null || unit_project_name == undefined || unit_project_name == "" || unit_project_name == "undefined") {
      unit_project_name = null;
    }

    var siteInfo = {
      "siteId": unit_projectname_id,
      "name": unit_project_name,
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
      "rera": null,
      "description": null,
      "overviewImage": null,
      "masterplanImage": null,
      "refererDescription": null
    }


    // if ($("#unit_subaSqft").val() == "" || $("#unit_subaSqft").val() == undefined || $("#unit_subaSqft").val() == null) {
    //   this.unit_subaSqft = null;
    // } else {
    //   this.unit_subaSqft = $("#unit_subaSqft").val();
    // }

    if ($("#Rate_per_sqft_unit").val() == "" || $("#Rate_per_sqft_unit").val() == undefined || $("#Rate_per_sqft_unit").val() == null) {
      this.Rate_per_sqft = null;
    } else {
      this.Rate_per_sqft = $("#Rate_per_sqft_unit").val();
    }

    if ($("#unit_amenitiesFlatCost").val() == "" || $("#unit_amenitiesFlatCost").val() == undefined || $("#unit_amenitiesFlatCost").val() == null) {
      this.unit_amenitiesFlatCost = null;
    } else {
      this.unit_amenitiesFlatCost = $("#unit_amenitiesFlatCost").val();
    }

    if ($("#unit_total_cost").val() == "" || $("#unit_total_cost").val() == undefined || $("#unit_total_cost").val() == null) {
      this.unit_total_cost = null;
    } else {
      this.unit_total_cost = $("#unit_total_cost").val();
    }

    if ($("#unit_taxesPerSft").val() == "" || $("#unit_taxesPerSft").val() == undefined || $("#unit_taxesPerSft").val() == null) {
      this.unit_taxesPerSft = null;
    } else {
      this.unit_taxesPerSft = $("#unit_taxesPerSft").val();
    }

    if ($("#unit_total_gst_amount").val() == "" || $("#unit_total_gst_amount").val() == undefined || $("#unit_total_gst_amount").val() == null) {
      this.unit_total_gst_amount = null;
    } else {
      this.unit_total_gst_amount = $("#unit_total_gst_amount").val();
    }

    if ($("#unit_actualPricePerSft").val() == "" || $("#unit_actualPricePerSft").val() == undefined || $("#unit_actualPricePerSft").val() == null) {
      this.unit_actualPricePerSft = null;
    } else {
      this.unit_actualPricePerSft = $("#unit_actualPricePerSft").val();
    }

    if ($("#unit_overallPricePerSft").val() == "" || $("#unit_overallPricePerSft").val() == undefined || $("#unit_overallPricePerSft").val() == null) {
      this.unit_overallPricePerSft = null;
    } else {
      this.unit_overallPricePerSft = $("#unit_overallPricePerSft").val();
    }

    if ($("#unit_total_cost_exclude_gst").val() == "" || $("#unit_total_cost_exclude_gst").val() == undefined || $("#unit_total_cost_exclude_gst").val() == null) {
      this.unit_total_cost_exclude_gst = null;
    } else {
      this.unit_total_cost_exclude_gst = $("#unit_total_cost_exclude_gst").val();
    }

    if ($("#unit_quoted_base_price").val() == "" || $("#unit_quoted_base_price").val() == undefined || $("#unit_quoted_base_price").val() == null) {
      this.unit_quoted_base_price = null;
    } else {
      this.unit_quoted_base_price = $("#unit_quoted_base_price").val();
    }


    if ($("#unit_AAA").val() == "" || $("#unit_AAA").val() == undefined || $("#unit_AAA").val() == null) {
      this.unit_AAA = null;
    } else {
      this.unit_AAA = $("#unit_AAA").val()
    }

    if ($("#unit_discount").val() == "" || $("#unit_discount").val() == undefined || $("#unit_discount").val() == null) {
      this.unit_discount = null;
    } else {
      this.unit_discount = $("#unit_discount").val()
    }




    var flatCost = {
      "flatCostId": null,
      "flatId": null,
      "unitNumber": null,
      "sqftCost": null,
      "subaSqft": null,
      "carpetAreaSqft": this.carpet_area_unit,
      "perSqftCost": this.unit_quoted_base_price,
      "basicFlatCost": this.unit_basic_flat_cost,
      "amenitiesFlatCost": this.unit_amenitiesFlatCost,
      "gstCost": this.unit_total_gst_amount,
      "gstPercentage": null,
      "totalCost": this.unit_total_cost,
      "extraChanges": null,
      "fourWheelerParking": null,
      "twoWheelerParking": null,
      "clubHouse": null,
      "infra": null,
      "modificationCost": null,
      "flatCost": this.unit_total_cost_exclude_gst,
      "taxesPerSft": this.unit_taxesPerSft,
      "actualPricePerSft": this.unit_actualPricePerSft,
      "overallPricePerSft": this.unit_overallPricePerSft,
      "unitGroup": "Builder",
      "createdDate": null,
      "updatedDate": null,
      "statusId": null,
      "createdBy": null,
      "updatedBy": null,
      "totalCostExcludeGst": null,
      "quotedBasePrice": this.unit_quoted_base_price,
      "soldBasePrice": this.Rate_per_sqft,
      "aaaCost": this.unit_AAA,
      "discount": this.unit_discount

    }

    if ($("#unit_booking_date").val() == "" || $("#unit_booking_date").val() == undefined || $("#unit_booking_date").val() == null) {
      this.unit_booking_date = null;
    } else {
      this.unit_booking_date = $("#unit_booking_date").val();
    }

    if ($("#unit_Agreement_date").val() == "" || $("#unit_Agreement_date").val() == undefined || $("#unit_Agreement_date").val() == null) {
      this.unit_Agreement_date = null;
    } else {
      this.unit_Agreement_date = $("#unit_Agreement_date").val();
    }
    if ($("#facing_unit").val() == "" || $("#facing_unit").val() == undefined || $("#facing_unit").val() == null) {
      this.facing_unit = null;
    } else {
      this.facing_unit = $("#facing_unit").val();
    }

    var myDate = new Date();
    var result = myDate.getTime();



    if ($("#unit_new_booking_reason").val() == "" || $("#unit_new_booking_reason").val() == undefined || $("#unit_new_booking_reason").val() == null) {
      this.unit_new_booking_reason = null;
    } else {
      this.unit_new_booking_reason = $("#unit_new_booking_reason").val();
    }

    var flatBookingInfo = {
      "flatInfo": flatInfo,
      "floorInfo": floorInfo,
      "blockInfo": blockInfo,
      "siteInfo": siteInfo,
      "carpetArea": null,
      "facing": this.facing_unit,
      "uds": null,
      "eoiApplicable": this.unit_eoi_applicable,
      "eoiSequenceNumber": this.unit_eoi_sequence_number,
      "sbua": this.sbua_unit,

      "paymentId": null,
      "statusId": null,
      "flatId": null,
      "createdDate": null,
      "bookingRecieptFront": null,
      "bookingRecieptBack": null,
      "bookingDate": this.unit_booking_date,
      "agreementDate": this.unit_Agreement_date,

      "milestoneDueDays": null,
      "handingOverDate": this.handing_over_date_first_applicant,
      "registrationDate": this.registration_date_first_applicant,
      "OldBookingName": old_flatbooking_name,
      "NewBookingReason": this.unit_new_booking_reason,
      "BookingId": this.booking_main_id,
      "salesforceTransactionId": null,
      "customerId": null,
      "aminitiesInfraCostInfo": this.aminitiesList_controller,
      "flatCost": flatCost
    }
    console.log("----------" + JSON.stringify(flatBookingInfo))
    var customerCheckListVerificationsalesHead = [];
    var customerCheckListVerificationsalesHead1 = {
      "checkListVerfiId": null,
      "checkListInfo": {
        "checkListId": null,
        "checkListName": "Bkg dt,Project,Flat no,Area verification",
        "checkListDiscription": null
      },
      "checkListStatus": null,
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
      "checkListStatus": null,
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
      "checkListStatus": null,
      "custId": null,
      "deparmentName": null,
      "departmentId": null,
      "checklistDeptMapId": null,
      "flatBookId": null,
      "is_verified": null
    }
    customerCheckListVerificationsalesHead.push(customerCheckListVerificationsalesHead3);


    if ($("#unit_LeadId").val() == "" || $("#unit_LeadId").val() == null || $("#unit_LeadId").val() == undefined) {
      var myDate = new Date();
      var result = myDate.getTime();
      this.leadid = result;
    } else {
      this.leadid = $("#unit_LeadId").val();
    }

    var myDate = new Date();
    var result = myDate.getTime();
    console.log(result);

    var checkListSalesHead = {
      "customerCheckListVerification": customerCheckListVerificationsalesHead,
      "name": null,
      "leadId": this.leadid,
      //"stm":"ChandraMouli",
      "stm": null,
      "sourceofBooking": null,
      "referralBonusStatus": null,
      "offersAny": null,
      "availability": null,
      "availabilityIfOther": null,
      "salesTeamCommitments": null,
      "remarks": null,
      "projectSalesheadId": null,
      "projectSalesheadName": null,
      "projectSalesHeadDate": null,
      "authorizedSignatoryId": null,
      "authorizedSignatoryName": null,
      "authorizedSignatoryDate": null
    }


    var customerCheckListVerificationCRMData = [];

    var customerCheckListVerificationCRM1 = {
      "checkListVerfiId": null,
      "checkListInfo": {
        "checkListId": null,
        "checkListName": "Bkg dt,Project,Flat no,Area Verification",
        "checkListDiscription": null
      },
      "checkListStatus": null,
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
      "checkListStatus": null,
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
      "checkListStatus": null,
      "custId": null,
      "deparmentName": null,
      "departmentId": null,
      "checklistDeptMapId": null,
      "flatBookId": null,
      "is_verified": null
    }
    customerCheckListVerificationCRMData.push(customerCheckListVerificationCRM3);


    var checkListCRM = {
      "customerCheckListVerification": customerCheckListVerificationCRMData,
      "commitmentsFromSTM": null,
      "welcomeCallRecord": null,
      "crmRemarks": null,
      "crmPreferenceBankLoan": null,
      "expectedAgreeDateComment": null,
      "expectedAgreeDate": null,
      "crmVerifiedByName": null,
      "crmEmpID": null,
      "crmSignedName": null,
      "crmSignedDate": null,
      "authorizedSignatoryeId": null,
      "authorizedSignatoryeName": null,
      "authorizedSignatoryDate": null
    }


    var customerCheckListVerificationLegalofcData = [];
    var customerCheckListVerificationLegalofcData1 = {
      "checkListVerfiId": null,
      "checkListInfo": {
        "checkListId": null,
        "checkListName": "Booking Form",
        "checkListDiscription": null
      },
      "checkListStatus": null,
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
      "checkListStatus": null,
      "custId": null,
      "deparmentName": null,
      "departmentId": null,
      "checklistDeptMapId": null,
      "flatBookId": null,
      "is_verified": null
    }
    customerCheckListVerificationLegalofcData.push(customerCheckListVerificationLegalofcData2);


    var coApplicentCheckListVerificationData1 = [];
    var coApplicentCheckListVerification11 = {
      "checkListVerfiId": null,
      "checkListInfo": {
        "checkListId": null,
        "checkListName": "Applicant2 - Age,Address,Name,Relation",
        "checkListDiscription": null
      },
      "checkListStatus": null,
      "coApplicantId": null,
      "checkListDeptMappingId": null,
      "custId": 0,
      "is_verified": 0,
      "coapplicentPanCard": null
    }
    coApplicentCheckListVerificationData1.push(coApplicentCheckListVerification11);


    var checkListLegalOfficer = {
      "customerCheckListVerification": customerCheckListVerificationLegalofcData,
      "coappCheckListApp": coApplicentCheckListVerificationData1,
      "bankerName": null,
      "bank": null,
      "contact": null,
      "bankerEmailAddress": null,
      "offersIfAny": null,
      "legelOfficerComments": null,
      "legalOfficer": null,
      "empId": null,
      "legalOfficeSignedate": null,
      "authorizedSignatoryId": null,
      "authorizedSignatoryName": null,
      "authorizedSignatoryDate": null
    }

    var customerSchemeInfosArray = [];
    var customerSchemeInfos = [{
      "schemeName": unit_schema_name,
    }]


    var customerCheckListVerificationRegData = [];
    var customerCheckListVerificationReg1 =
    {
      "checkListVerfiId": null,
      "checkListInfo": {
        "checkListId": null,
        "checkListName": "Project/Flat Number - Verified",
        "checkListDiscription": null
      },
      "checkListStatus": null,
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
      "checkListStatus": null,
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
      "checkListStatus": null,
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
      "checkListStatus": null,
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
      "checkListStatus": null,
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
      "checkListStatus": null,
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
      "checkListStatus": null,
      "custId": null,
      "deparmentName": null,
      "departmentId": null,
      "checklistDeptMapId": null,
      "flatBookId": null,
      "is_verified": null
    }
    customerCheckListVerificationRegData.push(customerCheckListVerificationReg7);

    var checkListRegistration = {
      "customerCheckListVerification": customerCheckListVerificationRegData,
      "agValue": null,
      "sdValue": null,
      "legalComments": null,
      "accountsComments": null,
      "legalOfficerEmpId": null,
      "legalOfficerEmpName": null,
      "legalOfficerDate": null,
      "accountsExecutiveEmpid": null,
      "accountsExecutiveEmpName": null,
      "accountsExecutiveDate": null,
      "authorizedSignatureId": null,
      "authorizedSignatureName": null,
      "authorizedDate": null,
      "customerId": null,
      "flatBookingId": null,
      "sdNumber": null
    }




    customerBookingFormInfoList.push({
      "customerInfo": customerInfo,
      "customerSchemeInfos": customerSchemeInfos,
      "customerBookingInfo": customerBookingInfo,
      "addressInfos": CoAppaddressInfosone,
      "customerKYCSubmitedInfo": this.kyc_controller,
      "customerApplicationInfo": customerApplicationInfo,
      "professionalInfo": professionalInfo,
      "customerOtherDetailsInfo": customerOtherDetailsInfo,
      "coApplicentDetails": CoAppData,
      "flatBookingInfo": flatBookingInfo,
      "checkListSalesHead": checkListSalesHead,
      "checkListCRM": checkListCRM,
      "checkListLegalOfficer": checkListLegalOfficer,
      "checkListRegistration": checkListRegistration
    });


    console.log(customerBookingFormInfoList);


    // if (this.second_permanent == "" || this.second_permanent == null) {
    //   swal("Please enter the second applicate permanent address");
    //   return false;
    // }

    // if (this.second_Correspondence == "" || this.second_Correspondence == null) {
    //   swal("Please enter the second applicate correspondence address");
    //   return false;
    // }

    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "bookingFormService/updateApplicantOrCoapplicant.spring";
    //let url ="http://192.168.50.74:8080/employeeservice/bookingFormService/saveBookingDetails.spring";
    var body = {
      "customerBookingFormsInfos": customerBookingFormInfoList,
      //  "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "employeeName": sessionStorage.getItem("salesForceEmpName"),
      "requestUrl": "saveBookingDetails",
      "merchantId": "B97AAF841EA5C46372AF36E4A2F898D2"
    };


    console.log(url);
    console.log(JSON.stringify(body));



    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

      console.log(JSON.stringify(resp));

      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();

        swal(resp.description);

        setTimeout(() => {
          location.reload();
        }, 3000);

        return false;

      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else if (resp.responseCode == 800) {
        $('.page-loader-wrapper').hide();

        swal(resp.error[0]);
        return false;
      } else if (resp.responseCode == 600) {
        $('.page-loader-wrapper').hide();

        swal(resp.errors[0]);
        return false;
      } else {
        $('.page-loader-wrapper').hide();
        swal(resp.error[0]);
        return false;
      }
    },
      error => {
        //  alert(error.status);
        $('.page-loader-wrapper').hide();
        if (error.status == 400) {
          swal("Something went wrong please try again!");
          return false;
        } else {
          swal("Internal server error.");
          return false;

        }


      }
    );


  }



  closefun() {
    $("#statusData").hide();

    setTimeout(() => {
      location.reload();
    }, 1000);

  }


  homeClick() {
    this.cmn.commonHomeNavigation();
  }

  disableEnableEditableFields(condition, controller_length) {




    if (controller_length == 0 && condition == false) {


      if (this.deptid != 988) {
        //  $("#first_namePrefix").attr("disabled", true);
       // $("#first_mr").attr("disabled", true);
        //$("#dob_first").attr("disabled", true);
        // $("#pan_no_first").attr("disabled", true);
        // $("#aadhaar_no_first").attr("disabled", true);


        if (condition == false) {
         // $("#first_mr").css({ backgroundColor: '#eee' });
          //  $("#dob_first").css({ backgroundColor: '#eee' });
          //$("#pan_no_first").css({ backgroundColor: '#eee' });
          // $("#aadhaar_no_first").css({ backgroundColor: '#eee' });

        }
      } else {
        //  $("#first_namePrefix").attr("disabled", condition);
        //$("#first_mr").attr("disabled", condition);
        // $("#dob_first").attr("disabled", condition);
        // $("#pan_no_first").attr("disabled", condition);
        // $("#aadhaar_no_first").attr("disabled", condition);


        if (condition == false) {
        //  $("#first_mr").css({ backgroundColor: '#FFF!important' });
          // $("#dob_first").css({ backgroundColor: '#FFF!important' });
          //  $("#pan_no_first").css({ backgroundColor: '#FFF!important' });
          //  $("#aadhaar_no_first").css({ backgroundColor: '#FFF!important' });

        }
      }



      // $("#second_namePrefix").attr("disabled", condition);
     // $("#second_mrs").attr("disabled", condition);
      // $("#second_dob").attr("disabled", condition);
      //  $("#second_pan_no").attr("disabled", condition);
      //  $("#second_aadhaar_no").attr("disabled", condition);


      // $("#third_namePrefix").attr("disabled", condition);
     // $("#Third_mr").attr("disabled", condition);
      //  $("#Third_dob").attr("disabled", condition);
      //  $("#Third_pan_no").attr("disabled", condition);
      //  $("#Third_aadhaar_no").attr("disabled", condition);


      if (condition == false) {
      //  $("#second_mrs").css({ backgroundColor: '#FFF!important' });
        // $("#second_dob").css({ backgroundColor: '#FFF!important' });
        //  $("#second_pan_no").css({ backgroundColor: '#FFF!important' });
        //  $("#second_aadhaar_no").css({ backgroundColor: '#FFF!important' });
     //   $("#Third_mr").css({ backgroundColor: '#FFF!important' });
        //  $("#Third_dob").css({ backgroundColor: '#FFF!important' });
        $("#Third_pan_no").css({ backgroundColor: '#FFF!important' });
        $("#Third_aadhaar_no").css({ backgroundColor: '#FFF!important' });
      }



    } else if (controller_length == 1) {

      if (this.deptid != 988) {
        // $("#first_namePrefix").attr("disabled", true);
      //  $("#first_mr").attr("disabled", true);
        // $("#dob_first").attr("disabled", true);
        //  $("#pan_no_first").attr("disabled", true);
        //  $("#aadhaar_no_first").attr("disabled", true);


        //$("#second_namePrefix").attr("disabled", true);
       // $("#second_mrs").attr("disabled", true);
        //$("#second_dob").attr("disabled", true);
        // $("#second_pan_no").attr("disabled", true);
        // $("#second_aadhaar_no").attr("disabled", true);


        //$("#third_namePrefix").attr("disabled", false);
        //$("#Third_mr").attr("disabled", false);
        // $("#Third_dob").attr("disabled", false);
        //  $("#Third_pan_no").attr("disabled", false);
        //  $("#Third_aadhaar_no").attr("disabled", false);


        if (condition == false) {
         // $("#first_mr").css({ backgroundColor: '#eee' });
          //  $("#dob_first").css({ backgroundColor: '#eee' });
          // $("#pan_no_first").css({ backgroundColor: '#eee' });
          // $("#aadhaar_no_first").css({ backgroundColor: '#eee' });

          // $("#second_namePrefix").css({ backgroundColor: '#eee' });
         // $("#second_mrs").css({ backgroundColor: '#eee' });
          // $("#second_dob").css({ backgroundColor: '#eee' });
          // $("#second_pan_no").css({ backgroundColor: '#eee' });
          // $("#second_aadhaar_no").css({ backgroundColor: '#eee' });


          // $("#third_namePrefix").css({ backgroundColor: '#FFF!important' });
        //  $("#Third_mr").css({ backgroundColor: '#FFF!important' });
          // $("#Third_dob").css({ backgroundColor: '#FFF!important' });
          // $("#Third_pan_no").css({ backgroundColor: '#FFF!important' });
          // $("#Third_aadhaar_no").css({ backgroundColor: '#FFF!important' });


        }
      } else {
        // $("#first_namePrefix").attr("disabled", condition);
       // $("#first_mr").attr("disabled", condition);
        //$("#dob_first").attr("disabled", condition);
        // $("#pan_no_first").attr("disabled", condition);
        // $("#aadhaar_no_first").attr("disabled", condition);


        if (condition == false) {
       //   $("#first_mr").css({ backgroundColor: '#FFF!important' });
          //$("#dob_first").css({ backgroundColor: '#FFF!important' });
          //  $("#pan_no_first").css({ backgroundColor: '#FFF!important' });
          //  $("#aadhaar_no_first").css({ backgroundColor: '#FFF!important' });


          // $("#second_namePrefix").css({ backgroundColor: '#FFF!important' });
         // $("#second_mrs").css({ backgroundColor: '#FFF!important' });
          //$("#second_dob").css({ backgroundColor: '#FFF!important' });
          // $("#second_pan_no").css({ backgroundColor: '#FFF!important' });
          // $("#second_aadhaar_no").css({ backgroundColor: '#FFF!important' });


          // $("#third_namePrefix").css({ backgroundColor: '#FFF!important' });
         // $("#Third_mr").css({ backgroundColor: '#FFF!important' });
          //  $("#Third_dob").css({ backgroundColor: '#FFF!important' });
          // $("#Third_pan_no").css({ backgroundColor: '#FFF!important' });
          // $("#Third_aadhaar_no").css({ backgroundColor: '#FFF!important' });



        }
      }


    








    } else if (controller_length == 2) {

      //$("#first_namePrefix").attr("disabled", condition);
     // $("#first_mr").attr("disabled", condition);
      //$("#dob_first").attr("disabled", condition);
      //  $("#pan_no_first").attr("disabled", condition);
      //  $("#aadhaar_no_first").attr("disabled", condition);



      // $("#second_namePrefix").attr("disabled", condition);
     // $("#second_mrs").attr("disabled", condition);
      //$("#second_dob").attr("disabled", condition);
      //  $("#second_pan_no").attr("disabled", condition);
      //  $("#second_aadhaar_no").attr("disabled", condition);


      // $("#third_namePrefix").attr("disabled", condition);
      //$("#Third_mr").attr("disabled", condition);
      // $("#Third_dob").attr("disabled", condition);
      //  $("#Third_pan_no").attr("disabled", condition);
      //  $("#Third_aadhaar_no").attr("disabled", condition);


      if (condition == true) {
      //  $("#first_mr").css({ backgroundColor: '#eee' });
        // $("#dob_first").css({ backgroundColor: '#eee' });
        //  $("#pan_no_first").css({ backgroundColor: '#eee' });
        // $("#aadhaar_no_first").css({ backgroundColor: '#eee' });
     //   $("#second_mrs").css({ backgroundColor: '#eee' });
        //$("#second_dob").css({ backgroundColor: '#eee' });
        //  $("#second_pan_no").css({ backgroundColor: '#eee' });
        //  $("#second_aadhaar_no").css({ backgroundColor: '#eee' });
      //  $("#Third_mr").css({ backgroundColor: '#eee' });
        // $("#Third_dob").css({ backgroundColor: '#eee' });
        //   $("#Third_pan_no").css({ backgroundColor: '#eee' });
        //   $("#Third_aadhaar_no").css({ backgroundColor: '#eee' });
      }



    } else {
      //$("#first_namePrefix").attr("disabled", condition);
    //  $("#first_mr").attr("disabled", condition);
      // $("#dob_first").attr("disabled", condition);
      //  $("#pan_no_first").attr("disabled", condition);
      //  $("#aadhaar_no_first").attr("disabled", condition);


      if (condition == true) {
      //  $("#first_mr").css({ backgroundColor: '#eee' });
        // $("#dob_first").css({ backgroundColor: '#eee' });
        //   $("#pan_no_first").css({ backgroundColor: '#eee' });
        //   $("#aadhaar_no_first").css({ backgroundColor: '#eee' });

      }

    }

  }







  handle_FileSelect(evt, index, item) {

    console.log(this.kyc_controller);

    this.imageuploadfile = [];
    var files = evt.target.files;
    this.file_val = evt.target.value;

    if (evt.target.value.split('.')[1] == "gif" || evt.target.value.split('.')[1] == "mp4" || evt.target.value.split('.')[1] == "dwg" || evt.target.value.split('.')[1] == "zip") {


      swal('This File Type Is Not Permitted for Security Reasons');

      $("#fileInputId" + index).val(null);
      this.ortitle = true;
      this.urls = [];
      $('#driveImageLinkField').val("");

      $('#imageLinkField').show();
      $('.image-area').hide();
      this.file_name_array = [];
      this.base64_array_object_data = [];
      this.mbytesarray = []
      return false;
    }


    var fp = $("#fileInputId" + index);
    var lg = fp[0].files.length;

    var items = fp[0].files;
    var fileSize = 0;
    if (lg > 0) {
      for (var i = 0; i < lg; i++) {
        fileSize = fileSize + items[i].size;
        console.log("File Size : " + fileSize);

      }

    }
    const file = Math.round((fileSize / 1024))
    console.log(file);
    this.mbytesarray.push(file);
    this.totmb_cam = 0;
    for (var i = 0; i < this.mbytesarray.length; i++) {
      this.totmb_cam = this.totmb_cam + this.mbytesarray[i];

    }

    if (this.totmb_cam >= 20480) {
      $("#fileInputId" + index).val(null);
      swal('File Upload(s) exceeded the Maximum 20 MB limit');
      this.ortitle = true;
      this.urls = [];
      $('#driveImageLinkField').val("");

      $('#imageLinkField').show();
      $('.image-area').hide();
      this.file_name_array = [];
      this.base64_array_object_data = [];
      this.mbytesarray = []
      return false;

    } else {
      this.ortitle = false;
      $('#driveImageLinkField').val("");
      $('#imageLinkField').hide();
      this.file_name_array_temp = []
      for (var i = 0; i < files.length; i++) {
        var temp = evt.target.files[i].name;

        this.filename = temp.toLowerCase();
        //alert(this.filename)
        this.filenameval = this.filename.split('.').pop();
        // this.file_name_array_temp.push(temp);


        //  this.file_name_array.push(temp);
        const file = files[i];
        if (files && file) {
          var reader = new FileReader();
          reader.onload = this._handleReaderLoaded.bind(this);
          reader.readAsBinaryString(file);
        } else {
        }
      }


      if (evt.target.files && evt.target.files[0]) {
        var filesAmount = evt.target.files.length;
        for (let k = 0; k < filesAmount; k++) {
          var reader = new FileReader();
          reader.onload = (event: any) => {

            this.urls.push({
              'upload': event.target.result,
              'Type': this.filenameval,
              'Name': this.file_name_array_temp[i],

            });


            this.file_name_array_temp.push({
              id: '',
              name: temp,
              base64: event.target.result,

              upload: event.target.result,
              Type: this.filenameval,

            });

            for (var i = 0; i < this.kyc_controller.length; i++) {
              if (this.kyc_controller[i].status == "true") {
                this.controller_main_dev = [];
                if (this.kyc_controller[i].documentId == item.documentId) {

                  console.log(this.kyc_controller[i].files == null);


                  if (this.kyc_controller[i].files == null) {
                    this.controller_main_dev.push({
                      id: '',
                      name: this.file_name_array_temp[0].name,
                      base64: this.file_name_array_temp[0].base64,

                      upload: this.file_name_array_temp[0].upload,
                      Type: this.file_name_array_temp[0].Type,

                    });

                    this.kyc_controller[i].files = this.controller_main_dev;
                    console.log(this.controller_main_dev);

                  } else {
                    this.controller_main_dev.push({
                      id: '',
                      name: this.file_name_array_temp[0].name,
                      base64: this.file_name_array_temp[0].base64,
                      upload: this.file_name_array_temp[0].upload,
                      Type: this.file_name_array_temp[0].Type,
                    });

                    this.kyc_controller[i].files = this.controller_main_dev;
                    console.log(this.controller_main_dev);

                  }
                }



              }

              // for (var j = 0; j < this.controller_data.length; j++) {

              //   this.controller_main_dev = [];



              //   if (this.kyc_controller[i].documentId == this.controller_data[j].documentId) {

              //     console.log(this.kyc_controller[i].documentId);
              //     console.log(this.controller_data[j].documentId);
              //     if (this.kyc_controller[i].files == null) {
              //       this.kyc_controller[i].files = this.file_name_array_temp;

              //     }
              //   }
              // }
            }

            console.log(this.kyc_controller);
            console.log(this.controller_main_dev);




          }

          reader.readAsDataURL(evt.target.files[k]);

        }
      }
    }
  }


  _handleReaderLoaded(readerEvt) {
    this.binaryString = readerEvt.target.result;
    this.base64textString = btoa(this.binaryString);
    this.base64_array_object_data.push(btoa(this.binaryString));
    this.imageUrl = btoa(this.binaryString);
    //this.filemode = [{ "id": "", "name": this.filename, "base64": this.imageUrl }];



    //  $('#fileInputId').css("color", "black");

  }

  preview_url(item) {

    console.log(item);
    console.log(item.url);

    if (item.url != undefined) {
      window.open(item.url, '_system', 'location=yes,closebuttoncaption=Fechar,enableViewportScale=no');
    } else {
      console.log("its working");

      var val = item.upload;
      var extensiontype = item.Type;

      console.log(val);
      console.log(extensiontype);

      this.fileName = "";
      this.extensiontype = extensiontype;
      this.filetypeurlsplit = val.split(';')[0];
      this.filetypeurlsplit1 = this.filetypeurlsplit.split(':')[1];
      this.filenamedoc = val.split('/')[0];
      this.filesplitdata = this.filenamedoc.split(':')[1];

      console.log(this.extensiontype);
      console.log(this.filetypeurlsplit);
      console.log(this.filetypeurlsplit1);
      console.log(this.filenamedoc);
      console.log(this.filesplitdata);

      if (this.filesplitdata == "image/jpg" || this.filesplitdata == "image/png" || this.filesplitdata == "image/svg" || this.filesplitdata == "image/jpeg") {
        $('#imagemodal').modal('show');
      }



      if (this.filesplitdata == "image") {
        this.imgsrc = val;
        $('#imagemodal').modal('show');
      }

      if (this.filetypeurlsplit1 == 'application/pdf') {
        this.fileName = "";
        setTimeout(() => {
          this.fileName = this.sanitizer.bypassSecurityTrustResourceUrl(val);
        }, 1000);
        $('#imagemodal').modal('show');

      }

      if (this.filetypeurlsplit1 == "text/plain") {
        const blob = new Blob([val], { type: this.filetypeurlsplit1 });
        this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(val);
        $('#imagemodal').modal('show');
      }

      if (extensiontype == "xlsx" || extensiontype == 'xlsx' || extensiontype == 'xlsm'
        || extensiontype == 'xlsb' || extensiontype == 'xltx' || extensiontype == 'xltm'
        || extensiontype == 'xls' || extensiontype == 'xlt'
        || extensiontype == 'xls' || extensiontype == 'xml'
        || extensiontype == 'xml' || extensiontype == 'xlam'
        || extensiontype == 'xla' || extensiontype == 'xlw' || extensiontype == 'xlr') {
        console.log(extensiontype);
        const blob = new Blob([val], { type: 'application/octet-stream' });
        this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(val);
        $('#imagemodal').modal('show');
      } else if (extensiontype == "docx") {
        const blob = new Blob([val], { type: 'application/octet-stream' });
        this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(val);
        $('#imagemodal').modal('show');
      } else {
        const blob = new Blob([val], { type: 'application/octet-stream' });
        this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(val);
        $('#imagemodal').modal('show');
      }

    }
  }
  panvalidation(e) {
    this.pan_num = e.target.value; 
    let filter_name = /^[a-zA-Z 0-9]{1,10}$/;
    console.log(filter_name.test(this.pan_num));
    if (!filter_name.test(this.pan_num)) {
      // alert('random');
      this.pan_num = this.pan_num.substr(0, this.pan_num.length - 1);
      return false;
    }
    console.log(this.pan_num);

    if (this.pan_num.length == 10) {
      // alert(this.pan_num.length);
      let filter_pan = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
      if (!filter_pan.test(this.pan_num)) {
        this.pan_num = "";
        swal("Please enter the valid pan number (EX:ABCDE1234F)");
        return false;

      }
    }
  }

  aadhaar_nofun(event: any) {
    const pattern = /^[2-9]{1}[0-9]{3}\s{1}[0-9]{4}\s{1}[0-9]{4}$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
    if (event.target.value.length > 12) {
      event.target.value = event.target.value.slice(0, -1);
    }
  }



  pan_number_change_event(event, username) {
    console.log(event.target.value);
    console.log(username);

    if (username == "first_applicant") {

      if ($("#first_mr").val() == "") {
        $("#pan_no_first").val("");
        swal("Please enter the first applicate customer name");
        return false;
      } else {
        this.pan_number_change_function(event.target.value, $("#first_mr").val(), username);
      }

    } else if (username == "second_applicant") {

      if ($("#second_mrs").val() == "") {
        $("#second_pan_no").val("");
        swal("Please enter the second applicate customer name");
        return false;
      } else {
        this.pan_number_change_function(event.target.value, $("#second_mrs").val(), username);
      }

    } else if (username == "third_applicant") {

      if ($("#Third_mr").val() == "") {
        $("#Third_pan_no").val("");
        swal("Please enter the third applicate customer name");
        return false;
      } else {
        this.pan_number_change_function(event.target.value, $("#Third_mr").val(), username);
      }

    }
  }



  pan_number_change_function(value, name, username) {
    $('.page-loader-wrapper').show();
    this.service.get_pan_number_fun(name, value).then(resp => {

      console.log(resp);
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {


        if (resp.description != "success") {
          if (username == "first_applicant") {

            $('#imagemodal_div').modal('show');
            this.pan_status_event = resp.description;
            this.username_tabs = username;
            this.siteName_exits = resp.responseObjList;
            this.status_dis = resp.status;

            this.customer_name_data = name;

            if (resp.responseObjList.length != 0) {
              this.validation_details = true;
            }

            // $("#pan_no_first").val("");
            return false;

          } else if (username == "second_applicant") {
            $('#imagemodal_div').modal('show');
            this.pan_status_event = resp.description;
            this.username_tabs = username;
            this.siteName_exits = resp.responseObjList;
            this.status_dis = resp.status;

            this.customer_name_data = name;

            if (resp.responseObjList.length != 0) {
              this.second_validation_details = true;
            }




            // $("#second_pan_no").val("");
            return false;

          } else if (username == "third_applicant") {
            $('#imagemodal_div').modal('show');
            this.pan_status_event = resp.description;
            this.username_tabs = username;
            this.siteName_exits = resp.responseObjList;
            this.status_dis = resp.status;

            this.customer_name_data = name;


            if (resp.responseObjList.length != 0) {
              this.third_validation_details = true;
            }





            // $("#Third_pan_no").val("");
            return false;
          }

        } else {
          $('#imagemodal_div').modal('hide');
          this.pan_status_event = "";

          if (username == "first_applicant") {
            if (resp.responseObjList.length == 0) {
              this.validation_details = false;
            }
          }

          if (username == "second_applicant") {
            if (resp.responseObjList.length == 0) {
              this.second_validation_details = false;
            }
          }


          if (username == "third_applicant") {
            if (resp.responseObjList.length == 0) {
              this.third_validation_details = false;
            }
          }


        }

      } else if (resp.responseCode == 440) {
        $('#imagemodal_div').modal('hide');
        swal("Your Session has been Timed Out!", "Please login once again.", "error");

      } else {
        $('#imagemodal_div').modal('hide');
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
      }
    }, error => {
      $('#imagemodal_div').modal('hide');
      $('.page-loader-wrapper').hide();
      var error = JSON.parse(error._body).responseCode;
      if (error == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      }
    }
    );


  }


  Validation_details() {
    $('#imagemodal_div').modal('show');
  }

  Accept_fun(user_data) {
    console.log(user_data[0].customerId);
    console.log(this.customer_name_data);



    $('.page-loader-wrapper').show();
    this.service.get_customer_name_validation_fun(this.customer_name_data, user_data[0].customerId).then(resp => {

      console.log(resp);
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#imagemodal_div').modal('hide');
        swal("Customer name updated successfully !!");
        return false;

      } else if (resp.responseCode == 440) {
        $('#imagemodal_div').modal('hide');
        swal("Your Session has been Timed Out!", "Please login once again.", "error");

      } else {
        $('#imagemodal_div').modal('hide');
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
      }
    }, error => {
      $('#imagemodal_div').modal('hide');
      $('.page-loader-wrapper').hide();
      var error = JSON.parse(error._body).responseCode;
      if (error == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      }
    }
    );


  }

  milestoneDetails() {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/getMileStoneDemandNoteDetails.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "finMilestoneClassifidesId": bookingForData.employeeFinancialRequest.finMilestoneClassifidesId,
      "siteId": unitDetails.siteInfo.siteId,
      "mileStoneAliasName": "Test",
      "condition": "",
      "requestUrl":"createCustomer"
    }

    console.log(url);
    console.log(JSON.stringify(body));


    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      console.log(JSON.stringify(resp));
      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 200) {

        this.milestonedemand_details = resp.responseObjList[0].financialProjectMileStoneResponse;

        if(this.milestonedemand_details.length == 0){
          this.milestonedemand_details = undefined;
        }
        
       
      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        $('.page-loader-wrapper').hide();
       // swal(resp.errors[0]);
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