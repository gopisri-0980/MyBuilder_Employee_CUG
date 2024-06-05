import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Http, RequestOptions, Headers } from '@angular/http';
import { CommonComponent } from 'src/app/common/common.component';
import { DeviceDetectorService } from 'ngx-device-detector';
import { title } from 'process';
import { PageEvent } from '@angular/material';
declare const Chart: any;
declare const $: any;
declare const CKEDITOR: any;
declare const swal: any;
declare const tinymce: any;

var file_limit;
var mychcklist_ticketId = [];
var json_response;
var json_totalticketresponse;
var temp_empDetailsId: any;
var temp_departmentId: any;
var temp_employeeId: any;
var fsize = 0;
var files: any = [];
var ticketPurposeTypes;
var selected_subPurpose;

@Component({
  selector: 'app-complaints-view-details',
  templateUrl: './complaints-view-details.component.html',
  styleUrls: ['./complaints-view-details.component.sass']
})
export class ComplaintsViewDetailsComponent implements OnInit {
  ticketList: Array<any> = [];
 
  total_tickets: any;
  open_tickets: any;
  total_inProgress: any;
  total_closed: any;

  loading = false;
  ticketmessageData: any;
  sub: any;
  id: any;
  messageReplay: String;
  escalationDate: any;
  flatdetailstoview: any;
  ckeditorError: string = "Please enter message";
  ckeditorErrorLengthExceed: string = "Characters length should not exceed 4000";
  private base64textString: String = "";

  clased_tickets: string;
  closed_tickets: string;
  flat_number: any;
  ticket_Id: any;
  department_Name: any;
  ticket_escalationdate: any;
  customer_name: any;
  customer_email: any;
  ticketInfo_status: any;
  ticketInfo_createdDate: any;
  total_open: any;
  tickets_closed: any;
  ticketINfomessage: any;
  pdf_array: any;
  binaryString: any;
  base64_array_object_data: any = [];
  file_name_array: any = [];
  File_Info: any = [];
  myconvert_text: string;
  ckeditorVal: any;
  modellabel_name: string;
  clickedButtonName: string;
  display: any;
  project_name: any;
  ticket_type: any;
  escalation_remarks: string;
  ticketdetailsresponse: any;
  ticketInfo_ticketId: any;
  seekInfo_replies: { "": string; }[];
  seekInfo_tabs: { "name": string; "id": string; }[];
  pdflist: any;
  profilepic: any;
  deviceInfo: any;
  seekInfoJson: any;
  mytickettitle: any;
  close_ticket: boolean;
  forward_ticket: boolean;
  flat_Id: any;
  customer_id: any;
  extenddateIn_milliseconds: any;
  reply_ticket: boolean;
  seekinfo_ticket: boolean;
  viewrequestInfo: boolean;
  change_ticketowner: boolean;
  view_ticketdetails_status: any;
  ticket_type_detail_id: any;
  isTicketOwner: any;
  hideLoader = 1;
  escalationCalender_hide: boolean = true;
  from_View_alltickets: string;
  submodule: string;
  pagename: string;
  navigateTo: string;
  parent_condition: string;
  binding_parentpage: string;
  from_Change_Ticketowner: string;
  disabledate: string;
  filename: any;
  hidepdf: boolean;
  file_limit_MB: number;
  resovedDate: any;
  changeTicketTypeLink: boolean;
  ticketTypeChangeRequestID: any;
  to: any;
  cc: any;
  subject: any;
  messageBody: any;
  employeeName: any;
  raisedUnderCategory: any;
  categoryToBeChanged: any;
  description: any;
  ticketTypeId: any;
  ticketId: any;
  remindAgainLink: boolean;
  changeTcktTypeReject: boolean;
  changeTcktTypeApprove: boolean;
  from_Change_Tickettype: string;
  ticketTypeResponses: any;
  subPurposeList: string;
  purposeType_val: any;
  message: string;
  messagedetails: Array<any> = [];
  siteIdList: string;
  flatbookingId: string;
  ticketnumber: string;
  complaintStatus: any;
  controllertitle: string;
  deptid: any;
  roleid: any;

  loading2: boolean = false;
  loading1: boolean = false;
  flatBookingIdvalue: any;
  ticketIdvalue: any;
  customerhideme1: boolean = true;

  customerhideme: boolean = true;
  tickettotaldetailsresponse: any;

  pageEvent: PageEvent;
  datasource: null;
  pageIndex: number;
  pageSize: number;
  length: number;
  currentpageindex: string;
  requestUrl: string;
  jsontotalticketresponse: any;
  showLoadingIndicatior: boolean;
  Modification_Array: any;
  uploadeddocs: any;
  DetailsArray: any;
  FlatcostArray: any;
  data_array: any;
  resp_: any;
  prof_name: string;
  DOB: any;
  module: string;
  son_of: any;
  telephone: any;
  phoneNo: any;
  email: any;
  pan_num: any;
  adar_num: any;
  nationality: any;
  address: any;
  pendingDeptId: any;
  pendingEmpId: any;
  employeeId: string;
  currentpagenumber: string;
  viewticketData: string;
  ticketListtotaldata: string;
  total_length: any;


  constructor(private _router: Router, private deviceService: DeviceDetectorService,
    public route: ActivatedRoute, private router: Router, private http: Http, public cmn: CommonComponent) {
    $('.page-loader-wrapper').hide();
    if (sessionStorage.getItem("common_for_flats") == "View-Closed-Complaints") {
      json_response = eval('(' + sessionStorage.getItem('ticketdetails_view') + ')');
      this.ticketdetailsresponse = json_response;
      this.jsontotalticketresponse = eval('(' + sessionStorage.getItem('Totalticketdata') + ')');


      this.tickettotaldetailsresponse = this.jsontotalticketresponse
      this.currentpageindex = sessionStorage.getItem("currentpageindex");
      for (var i = 0; i < this.jsontotalticketresponse.length; i++) {
        if (this.jsontotalticketresponse[i].ticketId == this.ticketdetailsresponse.complaintId) {
          this.pageIndex = i;
        }
      }
    }

    if (sessionStorage.getItem("common_for_flats") == "View-All-Complaints") {
      sessionStorage.setItem("forsessionvalues", "true")
      json_response = eval('(' + sessionStorage.getItem('ticketdetails_view') + ')');
      this.ticketdetailsresponse = json_response;
      this.jsontotalticketresponse = eval('(' + sessionStorage.getItem('Totalticketdata') + ')');


      this.tickettotaldetailsresponse = this.jsontotalticketresponse
      this.currentpageindex = sessionStorage.getItem("currentpageindex");
      for (var i = 0; i < this.jsontotalticketresponse.length; i++) {
        if (this.jsontotalticketresponse[i].ticketId == this.ticketdetailsresponse.complaintId) {
          this.pageIndex = i;
        }
      }
    }

    this.deptid = sessionStorage.getItem("session_deptid");
    this.roleid = sessionStorage.getItem("session_roleId");

    sessionStorage.getItem("site_idd");
    sessionStorage.getItem("fromdatee");
    sessionStorage.getItem("todatee");
    sessionStorage.getItem("mystaus_val");

    this.parent_condition = sessionStorage.getItem("common_for_flats");
    if (sessionStorage.getItem("common_for_flats") == "View-My-Complaints") {
      this.binding_parentpage = "View My Complaint";

    } else if(sessionStorage.getItem("common_for_flats") == "View-Close-Complaints"){
      this.binding_parentpage = "View Closed Complaints";
    }else if(sessionStorage.getItem("common_for_flats") == "View-All-Complaints"){
      this.binding_parentpage = "View All Complaints";
    }

    this.from_View_alltickets = sessionStorage.getItem("from_Viewalltickets");
    this.from_Change_Ticketowner = sessionStorage.getItem("from_Changeticketowner");
    this.from_Change_Tickettype = sessionStorage.getItem("from_Changetickettype");





    json_response = eval('(' + sessionStorage.getItem('ticketdetails_view') + ')');
    this.ticketdetailsresponse = json_response;
    console.log(this.ticketdetailsresponse);
    console.log(sessionStorage.getItem('session_deptid'));
    console.log(sessionStorage.getItem("common_for_flats"));

    console.log(this.isTicketOwner);
    console.log(this.pendingDeptId);
    console.log(this.pendingEmpId);
    console.log(this.employeeId);




    if (sessionStorage.getItem('session_deptid') == "995" && sessionStorage.getItem("common_for_flats") != "View-My-Complaints" || sessionStorage.getItem('session_deptid') == "994" && sessionStorage.getItem("common_for_flats") != "View-My-Complaints") {
      this.close_ticket = true;
      this.forward_ticket = true;
      this.reply_ticket = true;
      this.seekinfo_ticket = true;
      this.viewrequestInfo = true;

    } else if (sessionStorage.getItem("common_for_flats") == "View-My-Complaints") {




      $("#hidingclass").css('display', 'block')
      $("#hidingclass2").css('display', 'block')
      $("#inputfile").css('display', 'block')



      if (this.isTicketOwner != true && this.pendingDeptId == null && this.pendingEmpId == this.employeeId) {

        this.reply_ticket = true;
        this.forward_ticket = true;
        this.close_ticket = true;
        this.seekinfo_ticket = true;
      } else if (this.pendingDeptId == this.deptid) {
        this.reply_ticket = true;
      } else if (this.pendingDeptId == null && this.pendingEmpId == this.employeeId) {

        this.reply_ticket = true;

      } else {
        this.reply_ticket = false;
        this.forward_ticket = false;
        this.close_ticket = false;
        this.seekinfo_ticket = true;
        this.viewrequestInfo = true;
      }
    } else {


      this.close_ticket = false;
      this.forward_ticket = false;
      this.reply_ticket = true;
      this.seekinfo_ticket = true;
      this.viewrequestInfo = true;
    }
    if (sessionStorage.getItem("common_for_flats") != "View-Closed-Complaints") {
      json_totalticketresponse = eval('(' + sessionStorage.getItem('Totalticketdata') + ')');
      this.tickettotaldetailsresponse = json_totalticketresponse;
      this.currentpageindex = sessionStorage.getItem("currentpageindex");



      for (var i = 0; i < this.tickettotaldetailsresponse.length; i++) {
        if (this.tickettotaldetailsresponse[i].complaintId == this.ticketdetailsresponse.complaintId) {
          this.pageIndex = i;

          this.isTicketOwner = this.tickettotaldetailsresponse[i].isTicketOwner;
          this.pendingDeptId = this.tickettotaldetailsresponse[i].pendingDeptId;
          this.pendingEmpId = this.tickettotaldetailsresponse[i].pendingEmpId;
          this.deptid = sessionStorage.getItem("session_deptid");
          this.employeeId = sessionStorage.getItem("employeeId");


          if (sessionStorage.getItem('session_deptid') == "995" && sessionStorage.getItem("common_for_flats") != "View-My-Complaints" || sessionStorage.getItem('session_deptid') == "994" && sessionStorage.getItem("common_for_flats") != "View-My-Complaints") {
            this.close_ticket = true;
            this.forward_ticket = true;
            this.reply_ticket = true;
            this.seekinfo_ticket = true;
            this.viewrequestInfo = true;

          } else if (sessionStorage.getItem("common_for_flats") == "View-My-Complaints") {


            $("#hidingclass").css('display', 'block')
            $("#hidingclass2").css('display', 'block')
            $("#inputfile").css('display', 'block')



            if (this.isTicketOwner != true && this.pendingDeptId == null && this.pendingEmpId == this.employeeId) {

              this.reply_ticket = true;
              this.forward_ticket = true;
              this.close_ticket = true;
              this.seekinfo_ticket = true;
            } else if (this.pendingDeptId == this.deptid) {
              this.reply_ticket = true;
            } else if (this.pendingDeptId == null && this.pendingEmpId == this.employeeId) {

              this.reply_ticket = true;

            } else {
              this.reply_ticket = false;
              this.forward_ticket = false;
              this.close_ticket = false;
              this.seekinfo_ticket = true;
              this.viewrequestInfo = true;
            }
          } else {


            this.close_ticket = false;
            this.forward_ticket = false;
            this.reply_ticket = true;
            this.seekinfo_ticket = true;
            this.viewrequestInfo = true;
          }

        }
      }
    }









    var flatdetails = json_response.customerPropertyDetails;

    console.log(flatdetails);

    this.customer_id = json_response.customerPropertyDetails.customerId;

    sessionStorage.setItem("ticket_flatdetails", json_response.customerPropertyDetails)
    this.flat_number = flatdetails.flatNo;
    this.ticketInfo_status = json_response.status;
    if (json_response.status == "Closed") {

      if (sessionStorage.getItem("common_for_flats") != "View-My-Complaints") {
        this.forward_ticket = false;
        this.close_ticket = false;
        this.reply_ticket = false;
        this.seekinfo_ticket = false;
        this.viewrequestInfo = false;
      }

    }

    console.log(json_response);

    this.ticketInfo_ticketId = json_response.complaintId;
    this.change_ticket_owner_list(this.ticketInfo_ticketId);
    mychcklist_ticketId.push(this.ticketInfo_ticketId);
    this.ticketInfo_createdDate = json_response.createdDate;
    this.customer_name = json_response.customerPropertyDetails.customerName;
    this.profilepic = json_response.customerPropertyDetails.customerProfilePic;

    this.customer_email = json_response.customerPropertyDetails.customerEmail;
    this.ticket_Id = json_response.complaintId;
    this.department_Name = json_response.department.departmentName;
    this.project_name = json_response.customerPropertyDetails.siteName;
    this.ticket_type = json_response.complaintType.complaintType;
    this.ticket_escalationdate = json_response.estimatedResolvedDate;
    this.resovedDate = json_response.resolvedDate
    this.ticket_type_detail_id = json_response.complaintTypeDetailsId;
//alert(this.ticket_type_detail_id)
    this.getTicketDetails();
    this.departmentList();



  }




  myfun(id) {

    $('#loader1').show();
    let url = this.cmn.commonUrl + "employeeComplaint/isEmployeeAvailable.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "departmentId": "" + id,
      "requestUrl": "isEmployeeAvailable",
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
    }

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $('#loader1').hide();

      if (resp.responseCode == 800) {

        this.departmentList();
      }

    },
      error => {
        $('#loader1').hide();
        var error = JSON.parse(error._body).responseCode;
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }
  ngAfterViewInit() {

  }

  getServerData(event) {

    $("#markascomplaint").prop('disabled', false);
    $("#markascomplaint").css({ 'background': '' });
    $("#markascomplaint").css({ 'color': '' });
    $("#markascomplaint").css({ 'cursor': 'pointer' });
    $("#markascomplaint").addClass("color-1");


    $("#customerinfoid").css({ 'filter': 'alpha(opacity=60)', 'zoom': '1', 'opacity': '0.2' });
    $("#customerinfoid1").css({ 'filter': 'alpha(opacity=60)', 'zoom': '1', 'opacity': '0.2' });
    this.customerhideme1 = true;
    this.customerhideme = true;



    this.total_tickets = 0;
    this.total_open = 0;
    this.tickets_closed = 0;
    this.pdflist = [];



    var json_response;
    var json_totalticketresponse;
    json_response = this.tickettotaldetailsresponse[event.pageIndex];
    this.ticketdetailsresponse = json_response;

    json_totalticketresponse = eval('(' + sessionStorage.getItem('Totalticketdata') + ')');



    console.log(json_response);

    if (json_response.raisedBy == "Customer") {

      sessionStorage.removeItem("ticket_new_tab");
      sessionStorage.setItem("common_for_flats", "View-My-Complaints");
      this.currentpagenumber = sessionStorage.getItem('currentPageNo');
      if (this.currentpagenumber == undefined) {
        this.currentpagenumber = JSON.stringify(1);
      }
      sessionStorage.setItem('currentPageNo', this.currentpagenumber);
      sessionStorage.setItem("from_Viewalltickets", "");
      this.viewticketData = JSON.stringify(json_response);
      this.ticketListtotaldata = JSON.stringify(json_totalticketresponse);
      this.ticketListtotaldata = JSON.stringify(json_totalticketresponse);
      this.router.navigate(["Complaints-view-details"], { state: json_totalticketresponse });
      sessionStorage.setItem('ticketdetails_view', this.viewticketData);
      sessionStorage.setItem("Totalticketdata", JSON.stringify(json_totalticketresponse));
      sessionStorage.setItem('buttonstutus', '');
      sessionStorage.setItem("currentpageindex", JSON.stringify(this.current_Page));

      var flatdetails = json_response.customerPropertyDetails;
      sessionStorage.setItem("ticket_flatdetails", json_response.customerPropertyDetails)
  
      this.ticketInfo_status = json_response.status;
      if (json_response.status == "Closed") {
  
        if (sessionStorage.getItem("common_for_flats") != "View-My-Complaints") {
  
          this.forward_ticket = false;
          this.close_ticket = false;
          this.reply_ticket = false;
          this.seekinfo_ticket = false;
          this.viewrequestInfo = false;
        }
  
  
      }
  
      this.ticketInfo_ticketId = json_response.complaintId;
      this.change_ticket_owner_list(this.ticketInfo_ticketId);
      mychcklist_ticketId.push(this.ticketInfo_ticketId);
      this.ticketInfo_createdDate = json_response.createdDate;
      this.customer_name = json_response.customerPropertyDetails.customerName;
      this.profilepic = json_response.customerPropertyDetails.customerProfilePic;
  
      this.customer_email = json_response.customerPropertyDetails.customerEmail;
      this.ticket_Id = json_response.complaintId;
      this.department_Name = json_response.department.departmentName;
      this.project_name = json_response.customerPropertyDetails.siteName;
      this.ticket_type = json_response.complaintType.complaintType;
      this.ticket_escalationdate = json_response.estimatedResolvedDate;
      this.resovedDate = json_response.resolvedDate
      this.ticket_type_detail_id = json_response.complaintTypeDetailsId;

      console.log(this.ticket_type_detail_id);
      /*--------------Customer Flat Details End-------------------*/
      this.getTicketDetails();
      this.departmentList();


    } else if (json_response.raisedBy == "Employee") {

     
      sessionStorage.removeItem("ticket_new_tab");
      sessionStorage.setItem("common_for_flats", "View-My-Complaints");
      this.currentpagenumber = sessionStorage.getItem('currentPageNo');
      if (this.currentpagenumber == undefined) {
        this.currentpagenumber = JSON.stringify(1);
      }
      sessionStorage.setItem('currentPageNo', this.currentpagenumber);
      sessionStorage.setItem("from_Viewalltickets", "");
      this.viewticketData = JSON.stringify(json_response);
      this.ticketListtotaldata = JSON.stringify(json_totalticketresponse);
      this.ticketListtotaldata = JSON.stringify(json_totalticketresponse);
      this.router.navigate(["tickets-view-details"], { state: json_totalticketresponse });
      sessionStorage.setItem('ticketdetails_view', this.viewticketData);
      sessionStorage.setItem("Totalticketdata", JSON.stringify(json_totalticketresponse));
      sessionStorage.setItem('buttonstutus', '');
      sessionStorage.setItem("currentpageindex", JSON.stringify(this.current_Page));

      var flatdetails = json_response.customerPropertyDetails;
      sessionStorage.setItem("ticket_flatdetails", json_response.customerPropertyDetails)
  
      this.ticketInfo_status = json_response.status;
      if (json_response.status == "Closed") {
  
        if (sessionStorage.getItem("common_for_flats") != "View-My-Complaints") {
  
          this.forward_ticket = false;
          this.close_ticket = false;
          this.reply_ticket = false;
          this.seekinfo_ticket = false;
          this.viewrequestInfo = false;
        }
  
  
      }
  
      this.ticketInfo_ticketId = json_response.complaintId;
      this.change_ticket_owner_list(this.ticketInfo_ticketId);
      mychcklist_ticketId.push(this.ticketInfo_ticketId);
      this.ticketInfo_createdDate = json_response.createdDate;
      this.customer_name = json_response.customerPropertyDetails.customerName;
      this.profilepic = json_response.customerPropertyDetails.customerProfilePic;
  
      this.customer_email = json_response.customerPropertyDetails.customerEmail;
      this.ticket_Id = json_response.complaintId;
      this.department_Name = json_response.department.departmentName;
      this.project_name = json_response.customerPropertyDetails.siteName;
      this.ticket_type = json_response.complaintType.complaintType;
      this.ticket_escalationdate = json_response.estimatedResolvedDate;
      this.resovedDate = json_response.resolvedDate
      this.ticket_type_detail_id = json_response.complaintTypeDetailsId;
      /*--------------Customer Flat Details End-------------------*/
      this.getTicketDetails();
      this.departmentList();

    } else {
      sessionStorage.removeItem("ticket_new_tab");
      sessionStorage.setItem("common_for_flats", "View-My-Complaints");
      this.currentpagenumber = sessionStorage.getItem('currentPageNo');
      if (this.currentpagenumber == undefined) {
        this.currentpagenumber = JSON.stringify(1);
      }
      sessionStorage.setItem('currentPageNo', this.currentpagenumber);
      sessionStorage.setItem("from_Viewalltickets", "");
      this.viewticketData = JSON.stringify(json_response);
      this.ticketListtotaldata = JSON.stringify(json_totalticketresponse);
      this.ticketListtotaldata = JSON.stringify(json_totalticketresponse);
      this.router.navigate(["Complaints-view-details"], { state: json_totalticketresponse });
      sessionStorage.setItem('ticketdetails_view', this.viewticketData);
      sessionStorage.setItem("Totalticketdata", JSON.stringify(json_totalticketresponse));
      sessionStorage.setItem('buttonstutus', '');
      sessionStorage.setItem("currentpageindex", JSON.stringify(this.current_Page));

      var flatdetails = json_response.customerPropertyDetails;
      sessionStorage.setItem("ticket_flatdetails", json_response.customerPropertyDetails)
  
      this.ticketInfo_status = json_response.status;
      if (json_response.status == "Closed") {
  
        if (sessionStorage.getItem("common_for_flats") != "View-My-Complaints") {
  
          this.forward_ticket = false;
          this.close_ticket = false;
          this.reply_ticket = false;
          this.seekinfo_ticket = false;
          this.viewrequestInfo = false;
        }
  
  
      }
  
      this.ticketInfo_ticketId = json_response.complaintId;
      this.change_ticket_owner_list(this.ticketInfo_ticketId);
      mychcklist_ticketId.push(this.ticketInfo_ticketId);
      this.ticketInfo_createdDate = json_response.createdDate;
      this.customer_name = json_response.customerPropertyDetails.customerName;
      this.profilepic = json_response.customerPropertyDetails.customerProfilePic;
  
      this.customer_email = json_response.customerPropertyDetails.customerEmail;
      this.ticket_Id = json_response.complaintId;
      this.department_Name = json_response.department.departmentName;
      this.project_name = json_response.customerPropertyDetails.siteName;
      this.ticket_type = json_response.complaintType.complaintType;
      this.ticket_escalationdate = json_response.estimatedResolvedDate;
      this.resovedDate = json_response.resolvedDate
      this.ticket_type_detail_id = json_response.complaintTypeDetailsId;

      console.log(this.ticket_type_detail_id);
      /*--------------Customer Flat Details End-------------------*/
      this.getTicketDetails();
      this.departmentList();

    }


    if (sessionStorage.getItem("common_for_flats") == "View-Closed-Complaints") {

      this.tickettotaldetailsresponse = this.jsontotalticketresponse;
      for (var i = 0; i < this.jsontotalticketresponse.length; i++) {

        if (this.jsontotalticketresponse[i].complaintId == this.ticketdetailsresponse.complaintId) {
          this.pageIndex = i;
        }
      }
    } else {
      this.tickettotaldetailsresponse = json_totalticketresponse;
      for (var i = 0; i < this.tickettotaldetailsresponse.length; i++) {
        if (this.tickettotaldetailsresponse[i].complaintId == this.ticketdetailsresponse.complaintId) {
          this.pageIndex = i;
        }
      }
    }










  }
  current_Page(current_Page: any): string {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {

    $(function () {

      $("#customerinfoid").css({ 'filter': 'alpha(opacity=60)', 'zoom': '1', 'opacity': '0.2' });
      $("#customerinfoid1").css({ 'filter': 'alpha(opacity=60)', 'zoom': '1', 'opacity': '0.2' });

      $('#sel_ect').on('change', function () {

        this.department_val = this.value;

        temp_empDetailsId = this.value.split(',')[0];

        temp_departmentId = this.value.split(',')[1];

        temp_employeeId = this.value.split(',')[2];

      });

    })
    $(function () {
      $('#purposeTypeID').on('change', function (e) {
        var tempTarget = $(e.target).val();
        for (var i = 0; i < ticketPurposeTypes.length; i++) {
          if (ticketPurposeTypes[i].ticketMainType == tempTarget) {
            this.subPurposeList = ticketPurposeTypes[i].ticketTypeResponseList;
          }
        }

        $('#subPurposeTypeID').html('');
        $('#subPurposeTypeID').append("<option value='select'>--Select SubPurpose Type--</option>");
        $.each(this.subPurposeList, function (i, val) {
          $('#subPurposeTypeID').append("<option value='" + val.ticketTypeId + "," + val.ticketType + "'>" + val.ticketType + "</option>");
          $('#subPurposeTypeID').formSelect();
          $("#subPurposeTypeID").val('select');
        });
      });
    })

    var self = this;
    $(function () {
      $('#sel').on('change', function () {
        this.department_val = this.value;
        this.temp_dept = this.value.split(',')[1];
        sessionStorage.getItem('myseekforwardInfo');
        if (sessionStorage.getItem('myseekforwardInfo') == "Forward") {

          self.myfun(this.temp_dept);
        }
      });
    });

    // -------------------------------------------------------------------------
    this.seek_infogetTicketDetails();
    'use strict';
    $("#ckeditorError").hide();
    $(function () {
      CKEDITOR.replace('ckeditor');
      CKEDITOR.config.height = 300;
      CKEDITOR.config.scayt_autoStartup = true;
      tinymce.init({
        selector: 'textarea#tinymce1',
        theme: "modern",
        height: 300,
        plugins: [
          'advlist autolink lists link image charmap print preview hr anchor pagebreak',
          'searchreplace wordcount visualblocks visualchars code fullscreen',
          'insertdatetime media nonbreaking save table contextmenu directionality',
          'emoticons template paste textcolor colorpicker textpattern imagetools'
        ],

      });
    });
    CKEDITOR.on('instanceCreated', function (e) {
      e.editor.on('contentDom', function () {
        e.editor.document.on('keyup', function (event) {
          this.ckeditorVal = CKEDITOR.instances["ckeditor"].getData();
          $("#CKEditiorDiv").removeClass("borderforerror");
          $("#ckeditorError").hide();
        }
        );
      });
    });


    var ctx = <HTMLCanvasElement>document.getElementById("doughut-chart");
    if (ctx) {
      ctx.height = 150;
      var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          datasets: [{
            data: [2, 1, 0],
            backgroundColor: [
              "rgb(255, 130, 28)",
              "rgb(64, 196, 255)",
              "rgb(41, 97, 255)"
            ],
            hoverBackgroundColor: [
              "rgb(255, 130, 28)",
              "rgb(64, 196, 255)",
              "rgb(41, 97, 255)"
            ]

          }],
          labels: [
            "Total",
            "Open",
            "Closed"
          ]
        },
        options: {
          legend: {
            position: 'top',
            labels: {
              fontFamily: 'Poppins'
            }

          },
          responsive: true
        }
      });
    }



    var date = new Date(this.ticket_escalationdate);
    var newdate = date.setDate(date.getDate() + 1);
    $('.datepicker').bootstrapMaterialDatePicker({
      format: 'DD-MM-YYYY',
      minDate: new Date(newdate),
      clearButton: true,
      weekStart: 1,
      time: false
    });
    if (sessionStorage.getItem('buttonstutus') == 'true') {


      if (sessionStorage.getItem("common_for_flats") != "View-My-Complaints") {
        this.close_ticket = false;
        this.forward_ticket = false;
        this.reply_ticket = false;
        this.seekinfo_ticket = false;
        this.viewrequestInfo = false;

        $("#hidingclass").css('display', 'none')
        $("#hidingclass2").css('display', 'none')
        $("#inputfile").css('display', 'none')
      }

    }
  }





  deleteFile(item) {
    let index = this.file_name_array.indexOf(item);
    if (index > -1) {
      this.base64_array_object_data.splice(index, 1);
      this.file_name_array.splice(index, 1);
      this.File_Info.splice(index, 1);
      // this.hidepdf = true;
      if (files.length < 1) {
        this.hidepdf = true;
      }
    }
  }
  handleFileSelect(evt) {
    files = evt.target.files;
    var file_val = evt.target.value;
    for (i = 0; i < files.length; i++) {
      fsize = fsize + files.item(i).size;
    }
    file_limit = Math.round((fsize / 1024));
    this.file_limit_MB = Math.round((file_limit / 1024)) - 25;
    if (file_limit >= 25600) {
      swal("Your max file size limit is 25 MB, Total file size is exceeded by " + this.file_limit_MB + "MB. " + "Please enter the file link in the text box.");
      fsize = 0;
      this.file_name_array = [];
      this.base64_array_object_data = [];
      this.File_Info = [];
      return false;
    } else {
      for (var i = 0; i < files.length; i++) {
        var temp = evt.target.files[i].name;
        this.file_name_array.push(temp);
        this.hidepdf = false;
        var file = files[i];
        if (files && file) {
          var reader = new FileReader();
          reader.onload = this._handleReaderLoaded.bind(this);
          reader.readAsBinaryString(file);
        } else {

        }
      }
    }

  }

  _handleReaderLoaded(readerEvt) {
    this.binaryString = readerEvt.target.result;
    this.base64textString = btoa(this.binaryString);
    this.base64_array_object_data.push(btoa(this.binaryString));
  }

  public replyMessage() {
    this.ckeditorVal = CKEDITOR.instances["ckeditor"].getData();
    if (this.ckeditorVal == "") {
      $("#ckeditorError").show();
      $("#CKEditiorDiv").addClass("borderforerror");
      return false;
    }
    if (this.ckeditorVal.length > 3980) {
      alert("Character limit exceeded, it should be less than 3625 characters");
      return false;
    }
    if (confirm("Are you sure ?")) {
      this.myUpdate(this.ckeditorVal);
    } else { }


  }
  /*-----------------changing esclation date start-----------------*/
  public saveEscaltionDetails() {
    if ($("#escalationDate").val() == "" || $("#escalationDate").val() == "undefined" || $("#escalationDate").val() == undefined || $("#escalationDate").val() == null) {
      alert("please enter escalation extend date");
      return false;
    }
    var tempDate = $("#escalationDate").val().split('-')[2] + "-" + $("#escalationDate").val().split('-')[1] + "-" + $("#escalationDate").val().split('-')[0]
    if (this.escalation_remarks == "" || this.escalation_remarks == "undefined" || this.escalation_remarks == "undefined" || this.escalation_remarks == null) {
      alert("please enter your remarks");
      return false;
    }

    $('#loader1').show();
    let url = this.cmn.commonUrl + "employeeComplaint/insertExtendEsacalationTime.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "complaintId": "" + this.ticketInfo_ticketId,
      "extendedEscalationTime": "" + tempDate,
      "message": "" + this.escalation_remarks,
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
    }

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $('#loader1').hide();
      if (resp.responseCode == 200) {
        swal("Your escalation time extension request has been sent.");
        $(".modal").modal('hide');

      } else if (resp.responseCode == 440) {
        $('#loader1').hide();
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);

      }
      error => {
        $('#loader1').hide();
        var error = JSON.parse(error._body).responseCode;
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    }
    );

  }
  // /*-----------------changing esclation date end-----------------*/

  viewflatDetails(flatId, custId) {
    sessionStorage.setItem('custIdd', custId);
    sessionStorage.setItem('flatIdd', flatId);
    $("#flatdetails").modal('show');
    this.getFlatDetails();
    this.getFlatCostDetails();
    this.getFlatDocuments();
    this.getModificationDetails();
  }
  /*--------------------seek info modal popup start------------------*/
  public openSeekInfoModal() {

    

    this.ckeditorVal = CKEDITOR.instances["ckeditor"].getData();
    if (this.ckeditorVal == "") {
      $("#ckeditorError").show();
      $("#CKEditiorDiv").addClass("borderforerror");
      return false;
    }
    $("#seekinfo").modal();
    this.modellabel_name = "Seek Info";
    sessionStorage.setItem('myseekforwardInfo', 'Seek Info');
  }
  // /*------------------------department list start-----------------------------------*/
  departmentList() {
    $('#loader1').show();
    let url = this.cmn.commonUrl + "employeeComplaint/getComplaintForwardMenuDetails.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
    }

    console.log(url);
    console.log(JSON.stringify(body));

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      console.log(JSON.stringify(resp));
      $('#loader1').hide();
      if (resp.responseCode == 200) {

        $('#sel').html("");
        $('#sel').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.complaintForwardMenuList.length; i++) {
          $('#sel').append("<option value='" + resp.complaintForwardMenuList[i].typeOf + "," + resp.complaintForwardMenuList[i].genericId + "'>" + resp.complaintForwardMenuList[i].item + "</option>");
        }

       


        // $('select').formSelect();
        // $('#sel').formSelect();
        // var Options = "";
        // $.each(resp.complaintForwardMenuList, function (i, val) {

        //   console.log(i);
        //   console.log(val);
        //   $('#sel').append("<option value='" + val.typeOf + "," + val.genericId + "'>" + val.item + "</option>");
        //   $('#sel').formSelect();
        //   $("#sel").val('select');
        // });
      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      }
      error => {
        $('#loader1').hide();
        var error = JSON.parse(error._body).responseCode;
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    }
    );
  }
  // /*------------------------department list end-----------------------------------*/

  sendSeekInfo_forward_Data() {
    var mydepartval = $("#sel").val();
    if (mydepartval == "" || mydepartval == undefined || mydepartval == "undefined" || mydepartval == "select") {
      alert("Please select department name");
      return false;
    }
    var typeof_val = mydepartval.split(',')[0];
    var genericId_val = mydepartval.split(',')[1];
    this.seek_Forward_Infocalling(this.ckeditorVal, typeof_val, genericId_val);
  }
  /*--------------------seek info modal popup end------------------*/

  public viewCustomerDetails(custId, flatId) {
    $("#customer_details").modal('show');
    sessionStorage.setItem('custIdd', custId);
    sessionStorage.setItem('flatIdd', flatId);
    this.getCustomerDetails()
  }

  //close the ticket
  public closeticket() {
    this.ckeditorVal = CKEDITOR.instances["ckeditor"].getData();
    if (this.ckeditorVal.length > 3980) {
      alert("Character limit exceeded, it should be less than 3625 characters");
      return false;
    }
    /*-------------------plan text convertion start------------------------*/
    var span = document.createElement('span');
    span.innerHTML = this.ckeditorVal;
    this.myconvert_text = span.textContent || span.innerText;
    /*-------------------plan text convertion end------------------------*/

    $('#loader1').show();
    let url = this.cmn.commonUrl + "employeeComplaint/closeComplaint.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body;
    if (this.myconvert_text == "") {
      body = {
        "complaintId": "" + this.ticketInfo_ticketId,
        "requestUrl": "closeComplaint.spring",
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),

      }
    } else {
      body = {
        "complaintId": "" + this.ticketInfo_ticketId,
        "requestUrl": "closeComplaint.spring",
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "message": "" + this.myconvert_text

      }
    }

    console.log(url);
    console.log(JSON.stringify(body));

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

      console.log(JSON.stringify(resp));

      $('#loader1').hide();
      var temp_avr = sessionStorage.getItem("session_roleId")
      if (resp.responseCode == 200) {
        if (temp_avr == "12" || temp_avr == "14") {
          swal("Your complaint has been closed successfully");
          this.router.navigate(["ticket/viewticket"]);
          $("#closeticketmodal").modal('hide');
        } else {
          swal("Your complaint has been closed successfully");
          this.router.navigate(["View-My-Complaints"]);
          $("#closeticketmodal").modal('hide');
        }
      } else if (resp.responseCode == 440) {
        $('#loader1').hide();
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);

      }
    },
      error => {
        $('#loader1').hide();
        var error = JSON.parse(error._body).responseCode;
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );


  }

  getTicketDetails() {
    var getpageName = sessionStorage.getItem('getPageName');

    if (getpageName == "viewmyticketspage") {

      this.submodule = "View My Tickets";

      this.navigateTo = "/View-My-Complaints";
    } else if (getpageName == "viewAllTicketspage") {

      this.submodule = "View All Tickets";

      this.navigateTo = "/ticket/viewticket";
    } else if (getpageName == "viewMyflatDetailsPage") {

      this.submodule = "View My Tickets";

      this.navigateTo = "/View-My-Complaints";
    }

    else {

    }

    let url = this.cmn.commonUrl + "employeeComplaint/getComplaint.spring";

    $('#loader2').show();

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "complaintId": "" + this.ticketInfo_ticketId,
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "requestUrl": "getComplaint",
      "complaintTypeDetailsId": this.ticket_type_detail_id
    }

    console.log(url);
    console.log(JSON.stringify(body));
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

      console.log(JSON.stringify(resp));

      $('#loader2').hide();
      if (resp.responseCode == 200) {
        if (resp.complaintResponseList[0].complaintsStatus !== null || resp.complaintResponseList[0].complaintsStatus !== undefined) {
          this.complaintStatus = resp.complaintResponseList[0].complaintsStatus;

          this.deptid = sessionStorage.getItem("session_deptid");
          this.roleid = sessionStorage.getItem("session_roleId");

          if (this.complaintStatus == "86") {
            this.controllertitle = "Mark As Complaint";
            $("#markascomplaint").show();
            $("#markascomplaint").prop('disabled', false);
            $("#markascomplaint").addClass("color-1");

          } else if (this.complaintStatus !== "86" && this.deptid == 988 && this.roleid == 15) {
            this.controllertitle = "Mark As Uncomplaint";
            $("#markascomplaint").show();
            $("#markascomplaint").addClass("color-1");
          } else {
            $("#markascomplaint").hide();

          }
        }


        this.pdf_array = resp.viewComplaintsPdfs;
        this.ticketINfomessage = resp.complaintResponseList[0].description;

        this.flatBookingIdvalue = resp.complaintResponseList[0].flatBookingId;
        this.ticketIdvalue = resp.complaintResponseList[0].complaintId;

        this.ticketId = resp.complaintResponseList[0].ticketId;

        this.ticketmessageData = resp.complaintResponseList[0].complaintComments;

        console.log(this.ticketmessageData);

        this.view_ticketdetails_status = resp.complaintResponseList[0].status;

        this.flat_number = resp.complaintResponseList[0].customerPropertyDetails.flatNo;
        this.flat_Id = resp.complaintResponseList[0].customerPropertyDetails.flatId;
        this.customer_id = resp.complaintResponseList[0].customerPropertyDetails.customerId;
        this.isTicketOwner = resp.complaintResponseList[0].isComplaintOwner;
        this.ticketTypeChangeRequestID = resp.complaintResponseList[0].complaintTypeChangeRequest;

        console.log(this.ticketTypeChangeRequestID);
        console.log(this.isTicketOwner);
      


        this.ticketList = [];

        this.total_tickets = resp.totalComplaints;
        localStorage.setItem('totalTickets', this.total_tickets);
        this.open_tickets = resp.open;
        localStorage.setItem('openTickets', this.open_tickets);
        this.total_inProgress = resp.inProgress;
        this.total_closed = resp.closed;
        localStorage.setItem('Closed', this.total_closed);
        this.ticketList = resp.complaintResponseList;
        this.total_length = resp.complaintResponseList.length;




        sessionStorage.setItem('flatId', this.flat_Id);
        sessionStorage.setItem('customer_id', this.customer_id);
        sessionStorage.setItem('getPageName', "ticketDetailsPage");
        sessionStorage.setItem("session_escalatedTicket", resp.complaintResponseList[0].estimatedResolvedDateStatus);


        if (sessionStorage.getItem('session_deptid') == "995" || sessionStorage.getItem('session_deptid') == "994") {

          if (resp.complaintResponseList[0].isComplaintOwner == true) {
            if (this.view_ticketdetails_status == "Closed") {

              if (sessionStorage.getItem("common_for_flats") != "View-My-Complaints") {
                this.close_ticket = false;
                this.forward_ticket = false;
                this.reply_ticket = false;
                this.seekinfo_ticket = false;
                this.viewrequestInfo = true;
                this.escalationCalender_hide = true;

                this.changeTicketTypeLink = false;
                this.remindAgainLink = false;

                $("#hidingclass").hide();
                $("#hidingclass2").hide();
                $("#inputfile").hide();
              }





            } else {

              if (sessionStorage.getItem("common_for_flats") != "View-My-Complaints") {
                this.close_ticket = true;
                this.forward_ticket = true;
                this.reply_ticket = true;
                this.seekinfo_ticket = true;
              }

              this.viewrequestInfo = true;
              this.escalationCalender_hide = false;

              this.changeTicketTypeLink = true;
              this.remindAgainLink = true;

              if ((this.remindAgainLink == true) && (this.ticketTypeChangeRequestID == 34 && this.ticketTypeChangeRequestID != null)) {

                if (sessionStorage.getItem("common_for_flats") != "View-My-Complaints") {
                  this.close_ticket = false;
                  this.forward_ticket = false;
                  this.reply_ticket = false;
                  this.seekinfo_ticket = false;
                  this.viewrequestInfo = true;
                  this.escalationCalender_hide = true;

                  $("#hidingclass").hide();
                  $("#hidingclass2").hide();
                  $("#inputfile").hide();
                }


              }

              if (this.from_View_alltickets == "true") {
                var temp_escalatedTicket = sessionStorage.getItem("session_escalatedTicket");
                var temp_avr = sessionStorage.getItem("session_roleId")
                if ((temp_avr == '12' || temp_avr == '14') && (temp_escalatedTicket == null || temp_escalatedTicket != '17')) {
                  $("#hidingclass").css('display', 'block')
                  $("#hidingclass2").css('display', 'block')
                  $("#inputfile").css('display', 'block')

                  if (sessionStorage.getItem("common_for_flats") != "View-My-Complaints") {
                    this.close_ticket = true;
                    this.forward_ticket = true;
                    this.reply_ticket = true;
                    this.seekinfo_ticket = true;
                  }

                  this.viewrequestInfo = true;
                  this.escalationCalender_hide = false;
                  this.changeTicketTypeLink = false;
                  this.remindAgainLink = false;
                } else {

                  if (sessionStorage.getItem("common_for_flats") != "View-My-Complaints") {
                    this.close_ticket = false;
                    this.forward_ticket = false;
                    this.reply_ticket = false;
                    this.seekinfo_ticket = false;
                  }

                  this.viewrequestInfo = true;
                  this.escalationCalender_hide = true;
                  this.changeTicketTypeLink = false;
                  this.remindAgainLink = false;
                }
              } else if (this.from_Change_Ticketowner == "true") {

                $("#hidingclass").css('display', 'none')
                $("#hidingclass2").css('display', 'none')
                $("#inputfile").css('display', 'none')

                if (sessionStorage.getItem("common_for_flats") != "View-My-Complaints") {
                  this.close_ticket = false;
                  this.forward_ticket = false;
                  this.reply_ticket = false;
                  this.seekinfo_ticket = false;
                }

                this.viewrequestInfo = true;
                this.escalationCalender_hide = true;
                this.changeTicketTypeLink = false;
                this.remindAgainLink = false;
              } else if (this.from_Change_Tickettype == "true") {



                if (sessionStorage.getItem("common_for_flats") != "View-My-Complaints") {
                  $("#hidingclass").css('display', 'none')
                  $("#hidingclass2").css('display', 'none')
                  $("#inputfile").css('display', 'none')

                  this.close_ticket = false;
                  this.forward_ticket = false;
                  this.reply_ticket = false;
                  this.seekinfo_ticket = false;
                }

                this.viewrequestInfo = true;
                this.escalationCalender_hide = true;
                this.changeTicketTypeLink = false;
                this.remindAgainLink = false;
              } else {
                // this.escalationCalender_hide = false;
              }
            }

          } else if (resp.complaintResponseList[0].isComplaintOwner == false) {

            if (this.view_ticketdetails_status == "Closed") {

              if (sessionStorage.getItem("common_for_flats") != "View-My-Complaints") {
                this.close_ticket = false;
                this.forward_ticket = false;
                this.reply_ticket = false;
                this.seekinfo_ticket = false;
                this.viewrequestInfo = true;
                this.escalationCalender_hide = true;
                this.changeTicketTypeLink = false;
                this.remindAgainLink = false;
                $("#hidingclass").hide();
                $("#hidingclass2").hide();
                $("#inputfile").hide();
              }



            } else {

              if (this.from_View_alltickets == "true") {
                var temp_escalatedTicket = sessionStorage.getItem("session_escalatedTicket");
                var temp_avr = sessionStorage.getItem("session_roleId")
                if ((temp_avr == '12' || temp_avr == '14') && (temp_escalatedTicket == null || temp_escalatedTicket != '17')) {

                  $("#hidingclass").css('display', 'block')
                  $("#hidingclass2").css('display', 'block')
                  $("#inputfile").css('display', 'block')

                  if (sessionStorage.getItem("common_for_flats") != "View-My-Complaints") {
                    this.close_ticket = true;
                    this.forward_ticket = true;
                    this.reply_ticket = true;
                    this.seekinfo_ticket = true;
                  }

                  this.viewrequestInfo = true;
                  this.escalationCalender_hide = true;
                  this.changeTicketTypeLink = false;
                  this.remindAgainLink = false;
                } else {


                  if (sessionStorage.getItem("common_for_flats") != "View-My-Complaints") {
                    $("#hidingclass").css('display', 'none')
                    $("#hidingclass2").css('display', 'none')
                    $("#inputfile").css('display', 'none')

                    this.close_ticket = true;
                    this.close_ticket = false;
                    this.forward_ticket = false;
                    this.reply_ticket = false;
                    this.seekinfo_ticket = false;
                  }

                  this.viewrequestInfo = true;
                  this.escalationCalender_hide = true;
                  this.changeTicketTypeLink = false;
                  this.remindAgainLink = false;
                }
              } else if (this.from_Change_Ticketowner == "true") {


                if (sessionStorage.getItem("common_for_flats") != "View-My-Complaints") {
                  this.close_ticket = false;
                  this.forward_ticket = false;
                  this.reply_ticket = false;
                  this.seekinfo_ticket = false;
                  $("#hidingclass").css('display', 'none')
                  $("#hidingclass2").css('display', 'none')
                  $("#inputfile").css('display', 'none')
                }



                this.viewrequestInfo = true;
                this.escalationCalender_hide = true;
                this.changeTicketTypeLink = false;
                this.remindAgainLink = false;
              } else if (this.from_Change_Tickettype == "true") {


                if (sessionStorage.getItem("common_for_flats") != "View-My-Complaints") {
                  this.close_ticket = false;
                  this.forward_ticket = false;
                  this.reply_ticket = false;
                  this.seekinfo_ticket = false;

                  $("#hidingclass").css('display', 'none')
                  $("#hidingclass2").css('display', 'none')
                  $("#inputfile").css('display', 'none')
                }


                this.viewrequestInfo = true;
                this.escalationCalender_hide = true;
                this.changeTicketTypeLink = false;
                this.remindAgainLink = false;
              }
              else {

                if (sessionStorage.getItem("common_for_flats") != "View-My-Complaints") {
                  this.close_ticket = false;
                  this.forward_ticket = false;
                  this.reply_ticket = true;
                  this.seekinfo_ticket = true;
                }


                this.viewrequestInfo = true;
                this.escalationCalender_hide = false;
                this.changeTicketTypeLink = false;
                this.remindAgainLink = false;
              }
            }
          }
        } else {
          if (this.from_View_alltickets == "true") {

          } else {
            this.escalationCalender_hide = false;
          }
        }

      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      }
    },
      error => {
        var error = JSON.parse(error._body).responseCode;

        $('#loader2').hide();
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }

  // /*------------------------------Update Button Functionality Start------------------------*/
  myUpdate(ckeditor_msg) {


    /*-------------------plan text convertion start------------------------*/
    var span = document.createElement('span');
    span.innerHTML = ckeditor_msg;
    this.myconvert_text = span.textContent || span.innerText;

    /*-------------------plan text convertion end------------------------*/

    for (var i = 0; i < this.base64_array_object_data.length; i++) {
      this.File_Info.push({
        "id": "" + i,
        "name": "" + this.file_name_array[i],
        "base64": "" + this.base64_array_object_data[i]
      });
    }

    let temp = JSON.stringify(this.File_Info);
    $('#loader1').show();



    var url;
    var temp_avr = sessionStorage.getItem("session_roleId")

    console.log(sessionStorage.getItem('session_deptid'));
    console.log(this.isTicketOwner);
    console.log(temp_avr);

    
    // if(this.customer_id == undefined){
    //   this.customer_id = null;
    // }


    if (sessionStorage.getItem('session_deptid') == "995" || sessionStorage.getItem('session_deptid') == "994" || sessionStorage.getItem('session_deptid') == "988") {
      
      console.log(this.isTicketOwner );
      console.log(temp_avr);
      
      if (this.isTicketOwner == true || temp_avr == "12" || temp_avr == "14" || temp_avr == "15") {
        url = this.cmn.commonUrl + "employeeComplaint/updateComplaintConversation.spring";
      } else {
        url = this.cmn.commonUrl + "employeeComplaint/forwardComplaintDetails.spring";
      }


    } else {
      url = this.cmn.commonUrl + "employeeComplaint/forwardComplaintDetails.spring";
    }


    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body;
    if (sessionStorage.getItem('session_deptid') == "995" || sessionStorage.getItem('session_deptid') == "994" || sessionStorage.getItem('session_deptid') == "988") {
      if (this.isTicketOwner == true || temp_avr == "12" || temp_avr == "28" || temp_avr == "15") {
        body = {
          "complaintId": "" + this.ticketInfo_ticketId,
          "requestUrl": "updateComplaintConversation.spring",
          "toType": "7",
          "toId": "" + this.customer_id,
          "message": ckeditor_msg,
          "fileInfos": this.File_Info,
          "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
          "externalDriveFileLocation": $('#driveLinkField').val().trim(),
          "toDeptId": this.deptid,

        }
      } else {
        body = {
          "complaintId": "" + this.ticketInfo_ticketId,
          "requestUrl": "forwardComplaintDetails.spring",
          "message": this.myconvert_text,
          "fileInfos": this.File_Info,
          "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
          "externalDriveFileLocation": $('#driveLinkField').val().trim(),
          "toDeptId": this.deptid,
        }
      }


    } else {
      body = {
        "complaintId": "" + this.ticketInfo_ticketId,
        "requestUrl": "forwardComplaintDetails.spring",
        "message": this.myconvert_text,
        "fileInfos": this.File_Info,
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "externalDriveFileLocation": $('#driveLinkField').val().trim(),
        "toDeptId": this.deptid,
      }
    }

    console.log(url);
    console.log(JSON.stringify(body));

   

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      console.log(JSON.stringify(resp));
      $('#loader1').hide();
      if (resp.responseCode == 200) {
        if (sessionStorage.getItem('session_deptid') == "995" || sessionStorage.getItem('session_deptid') == "994" || sessionStorage.getItem('session_deptid') == "988") {
          if (this.isTicketOwner == true || temp_avr == "12" || temp_avr == "28" || temp_avr == "15") {
            swal("Complaint has been Updated.");
          } else {
            swal("Complaint has been Forwarded.");
            this.router.navigate(["View-My-Complaints"]);
          }


          CKEDITOR.instances["ckeditor"].setData('')
          $("#files").val(null);
          this.File_Info = [];
          this.file_name_array = [];
          this.base64_array_object_data = [];
          $('#driveLinkField').val('');
          this.getTicketDetails();
        } else {
          swal("Ticket has been Forwarded.");
          this.router.navigate(["View-My-Complaints"]);
          CKEDITOR.instances["ckeditor"].setData('');
          $("#files").val(null);
          this.File_Info = [];
          this.file_name_array = [];
          this.base64_array_object_data = [];

        }

      } else if (resp.responseCode == 440) {
        $('#loader1').hide();
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);

      }
    },
      error => {
        var error = JSON.parse(error._body).responseCode;
        //alert(error);
        $('#loader1').hide();
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }

  // /*------------------------------Update Button Functionality End------------------------*/

  // /*---------------------------Seek Info Button Functionality Start----------------------*/
  seek_Forward_Infocalling(ckmsg, typeofval, genericid) {
    this.clickedButtonName = sessionStorage.getItem('myseekforwardInfo');

    /*-------------------plan text convertion start------------------------*/
    var span = document.createElement('span');
    span.innerHTML = ckmsg;
    this.myconvert_text = span.textContent || span.innerText;
    /*-------------------plan text convertion end------------------------*/
    /*-------------------FileInfo Start------------------------*/
    for (var i = 0; i < this.base64_array_object_data.length; i++) {
      this.File_Info.push({
        "id": "" + i,
        "name": "" + this.file_name_array[i],
        "base64": "" + this.base64_array_object_data[i]
      });
    }
    /*-------------------FileInfo End------------------------*/
    $('#loader1').show();
    let url;


    if (this.clickedButtonName == "Forward") {
      url = this.cmn.commonUrl + "employeeComplaint/forwardComplaintDetails.spring";

    } else {
      url = this.cmn.commonUrl + "employeeComplaint/seekInfoComplaintDetails.spring";

    }
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body;

    if (this.clickedButtonName == "Forward") {
      if (typeofval == 9) {
        body = {

          "complaintId": "" + this.ticketInfo_ticketId,
          "toDeptId": "" + genericid,
          "toId": "0",
          "message": "" + this.myconvert_text,
          "requestUrl": "forwardComplaintDetails.spring",
          "fileInfos": this.File_Info,
          "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
          "externalDriveFileLocation": $('#driveLinkField').val().trim()

        }
      } else if (typeofval == 8) {
        body = {
          "complaintId": "" + this.ticketInfo_ticketId,

          "toId": "" + genericid,
          "toDeptId": " 0",
          "message": "" + this.myconvert_text,
          "requestUrl": "forwardComplaintDetails.spring",
          "fileInfos": this.File_Info,
          "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
          "externalDriveFileLocation": $('#driveLinkField').val().trim()
        }
      }
    } else {
      if (typeofval == 9) {
        body = {
          "complaintId": "" + this.ticketInfo_ticketId,

          "message": "" + this.myconvert_text,
          "toDeptId": "" + genericid,
          "toId": "0",
          "requestUrl": "seekInfoComplaintDetails.spring",

          "fileInfos": this.File_Info,
          "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
          "externalDriveFileLocation": $('#driveLinkField').val().trim()
        }
      } else if (typeofval == 8) {
        body = {
          "complaintId": "" + this.ticketInfo_ticketId,

          "message": "" + this.myconvert_text,
          "toId": "" + genericid,
          "toDeptId": "0",
          "requestUrl": "seekInfoComplaintDetails.spring",

          "fileInfos": this.File_Info,
          "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
          "externalDriveFileLocation": $('#driveLinkField').val().trim()
        }
      }
    }

    console.log(body);

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $('#loader1').hide();
      var temp_avr = sessionStorage.getItem("session_roleId")
      if (resp.responseCode == 200) {
        if (this.clickedButtonName == "Forward" && temp_avr != "12" && temp_avr != "14") {
          swal("Your complaint has been forwarded.");
          this.router.navigate(["View-My-Complaints"]);
          $('.modal').modal('hide');
          this.ckeditorVal = "";

        } else if (this.clickedButtonName == "Forward" && (temp_avr == "12" || temp_avr == "14")) {
          swal("Your complaint has been forwarded.");
          this.router.navigate(["View-My-Complaints"]);
          $('.modal').modal('hide');
          this.ckeditorVal = "";
        } else {
          swal("Your request has been sent.");
          $(".select-dropdown").val("--select--");
          $('.modal').modal('hide');
          CKEDITOR.instances["ckeditor"].setData('')
          $("#files").val(null);
          this.File_Info = [];
          this.file_name_array = [];
          this.base64_array_object_data = [];
          $('#driveLinkField').val('');

          this.seek_infogetTicketDetails();
          this.getTicketDetails();
        }

      } else if (resp.responseCode == 440) {
        $('#loader1').hide();
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      }

    },
      error => {
        var error = JSON.parse(error._body).responseCode;
        $('#loader1').hide();
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }


      }
    );
  }
  // /*---------------------------Seek Info Button Functionality End----------------------*/
  // /*-------------------------------------Forward Button Start---------------------------------*/
  openForwardModal() {

 

    this.ckeditorVal = CKEDITOR.instances["ckeditor"].getData();
    if (this.ckeditorVal == "") {
      $("#ckeditorError").show();
      $("#CKEditiorDiv").addClass("borderforerror");
      return false;
    }

    var deptId = sessionStorage.getItem('session_deptid');

    console.log(deptId);

    if (deptId == "995" || deptId == "994" || deptId == "988") {
      $("#seekinfo").modal();
      this.modellabel_name = "Forward";
      sessionStorage.setItem('myseekforwardInfo', 'Forward');

    } else {
      this.employee_forward(this.ckeditorVal);
    }

  }
  // /*-------------------------------------Forward Button End---------------------------------*/

  viewRequestInfo() {

  

    $("#myModal").modal('show');
  }

  pdfClick(val) {
    window.open(val, '_system', 'location=yes,closebuttoncaption=Fechar,enableViewportScale=no');
  }

  // /*----------------------------------employee seek and forward buttons start--------------*/
  employee_forward(ckeditor) {
    this.clickedButtonName = sessionStorage.getItem('myseekforwardInfo');
    //return false;
    /*-------------------plan text convertion start------------------------*/
    var span = document.createElement('span');
    span.innerHTML = ckeditor;
    this.myconvert_text = span.textContent || span.innerText;

    /*-------------------plan text convertion end------------------------*/
    /*-------------------FileInfo Start------------------------*/

    for (var i = 0; i < this.base64_array_object_data.length; i++) {
      this.File_Info.push({
        "id": "" + i,
        "name": "" + this.file_name_array[i],
        "base64": "" + this.base64_array_object_data[i]
      });
    }

    /*-------------------FileInfo End------------------------*/
    $('#loader1').show();
    let url;

    url = this.cmn.commonUrl + "employeeComplaint/forwardComplaintDetails.spring";



    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body;
    body = {
      "complaintId": "" + this.ticketInfo_ticketId,
      "toId": "0",
      "toDeptId": " 0",
      "message": "" + this.myconvert_text,
      "requestUrl": "forwardComplaintDetails.spring",
      "fileInfos": this.File_Info,
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "externalDriveFileLocation": $('#driveLinkField').val().trim()

    }


    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $('#loader1').hide();
      if (resp.responseCode == 200) {
        swal("Your complaint has been forwarded.");
        this.router.navigate(["View-My-Complaints"]);
        $('.modal').modal('hide');
        this.ckeditorVal = "";

      } else if (resp.responseCode == 440) {
        $('#loader1').hide();
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);

      }
    },
      error => {
        $('#loader1').hide();
        var error = JSON.parse(error._body).responseCode;
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }

      }
    );
  }
  // /*----------------------------------employee seek and forward buttons end--------------*/
  // /*----------------------seek info details--------------------------*/
  seek_infogetTicketDetails() {

    $('#loader1').show();
    let url = this.cmn.commonUrl + "employeeComplaint/complaintSpecifictviewRequestInfo.spring";



    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "complaintId": "" + this.ticket_Id,
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "requestUrl": "ticketSpecifictviewRequestInfo.spring",

    }

    console.log(url);
    console.log(JSON.stringify(body));
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

      console.log(resp);
      console.log(JSON.stringify(resp));

      $('#loader1').hide();

      if (resp.responseCode == 200) {
        this.seekInfoJson = resp.genericComplaintSeekInfos;

        if (resp.genericComplaintSeekInfos !== null) {
          this.mytickettitle = resp.genericComplaintSeekInfos[0].complaintSeekInfo[0].message;

        }


      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      }
    },
      error => {
        $('#loader1').hide();
        var error = JSON.parse(error._body).responseCode;
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }

  // //------
  custom_Css(id) {
    if (id == 0) {
      return 'tab-pane fade in active show'
    } else {
      return 'tab-pane fade'
    }
  }

  makeasPublic(url, id) {

    if (this.from_View_alltickets == "true") {
      return false;
    } else if (this.isTicketOwner == false) {
      return false;
    } else {
      if (confirm("Do you want to make As public ?")) {
        this.makeas_Public(url, id);
      } else { }
    }
  }
  // /*----------------Make As Public---------------------*/
  makeas_Public(myurl, id) {
    var fileInfo = [
      {
        "id": "" + id,
        "name": myurl
      }
    ]

    $('#loader1').show();
    let url = this.cmn.commonUrl + "employeeTicket/makeAsPublic.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "ticketId": "" + this.ticket_Id,
      "requestUrl": "makeAsPublic",
      "fileInfos": fileInfo
    }

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $('#loader1').hide();

      if (resp.responseCode == 200) {

        this.getTicketDetails();
        this.router.navigate(["ticket/ticketdetails"]);
      } else if (resp.responseCode == 440) {
        $('#loader1').hide();
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);

      }
    },
      error => {
        $('#loader1').hide();
        var error = JSON.parse(error._body).responseCode;
        //alert(error);
        $('#loader1').hide();
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }
  // /*----------------Make As Public---------------------*/
  change_ticket_owner_list(ticktId) {

    $('#loader1').show();
    let url = this.cmn.commonUrl + "employeeComplaint/changeComplaintOwnerDropDown.spring";



    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {

      "complaintIds": [ticktId],
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
    }

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $('#loader1').hide();

      if (resp.responseCode == 200) {

        $('#sel_ect').formSelect();

        $('#sel_ect').html('<option value="select">--Select--</option>');

        $.each(resp.employeeDetailsList, function (i, val) {
          $('#sel_ect').append("<option value='" + val.empDetailsId + "," + val.departmentId + "," + val.employeeId + "'>" + val.employeeName + "</option>");
          $('#sel_ect').formSelect();
          $("#sel_ect").val('select');
        });

      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      }
      error => {
        $('#loader1').hide();
        var error = JSON.parse(error._body).responseCode;
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    }
    );
  }
  ChangeTicketOwner() {

    $("#changeticketinfo").modal();

  }


  change_ticket_owner_modal_Data() {

    if ($("#sel_ect").val() == "select") {
      alert("Please select ticket owner");
      return false;
    }

    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "employeeComplaint/changeComplaintOwnerDropDown.spring";



    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body =

    {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "empDetailsId": "" + temp_empDetailsId,
      "departmentId": "" + temp_departmentId,
      "employeeId": "" + temp_employeeId,
      "complaintIds": [this.ticketInfo_ticketId]
    }


    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 200) {

        $('.page-loader-wrapper').hide();
        $(".modal").modal('hide');

        this.router.navigate(["changeticketowner"]);
      } else if (resp.responseCode == 600) {
        $('.page-loader-wrapper').hide();
        swal("" + resp.errors);
        $(".modal").modal('hide');
      } else if (resp.responseCode == 440) {
        $('.page-loader-wrapper').hide();
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);

      }
    },
      error => {
        $('.page-loader-wrapper').hide();
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
  refresh() {
    this.getTicketDetails();
  }

  homeClick() {
    this.cmn.commonHomeNavigation();
  }

  viewalltickets() {
    this.router.navigate(['ticket/viewticket']);
  }

  viewalltickets_graph() {
    this.router.navigate(['View_Ticket_Graphs']);
  }

  view_my_tickets() {
    this.router.navigate(['View-My-Complaints']);
  }

  changeticketowner() {
    this.router.navigate(['changeticketowner']);
  }

  changetickettype() {
    this.router.navigate(['changeTicketType']);
  }

  getExtendedEscalationTimeApprovalLevel() {

    swal("Work in progress !!");
    return false;

    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "employeeTicket/getExtendedEscalationTimeApprovalLevel.spring";


    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body =

    {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "ticketId": this.ticketInfo_ticketId
    }

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 601) {
        $('.page-loader-wrapper').hide();
        swal("" + resp.description);
      } else if (resp.responseCode == 602) {
        $('.page-loader-wrapper').hide();
        swal("" + resp.description);
      } else if (resp.responseCode == 603) {
        $('.page-loader-wrapper').hide();
        $("#basicModal").modal();
        // swal(""+resp.description);
      } else if (resp.responseCode == 604) {
        $('.page-loader-wrapper').hide();
        swal("" + resp.description);
      } else if (resp.responseCode == 440) {
        $('.page-loader-wrapper').hide();
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);

      }
    },
      error => {
        $('.page-loader-wrapper').hide();
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

  // /*--------------------Change Ticket Type modal popup start------------------*/
  openChangeTicketTypeModal() {

    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "employeeComplaint/getChangeComplaintTypeMailDetails.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body =
    {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "complaintId": this.ticketInfo_ticketId
    }

    console.log(url);
    console.log(body);

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

      console.log(resp);
      console.log(JSON.stringify(resp));

      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 200) {

        this.to = resp.changeComplaintTypeResponce.to;
        this.cc = resp.changeComplaintTypeResponce.cc;
        this.subject = resp.changeComplaintTypeResponce.subject;
        this.messageBody = resp.changeComplaintTypeResponce.messageBody;
        $('#messageField').val(resp.changeComplaintTypeResponce.messageBody);

        this.employeeName = resp.changeComplaintTypeResponce.employeeName;
        this.raisedUnderCategory = resp.changeComplaintTypeResponce.raisedUnderCategory;
        this.categoryToBeChanged = resp.changeComplaintTypeResponce.categoryToBeChanged;
        $('#categoryChangeTo').val(resp.changeComplaintTypeResponce.categoryToBeChanged);

        this.ticketId = resp.changeComplaintTypeResponce.complaintId;
        this.description = resp.changeComplaintTypeResponce.description;
        this.ticketTypeId = resp.changeComplaintTypeResponce.complaintTypeId;

        $("#changeTicketTypeModal").modal();
      } else if (resp.responseCode == 440) {
        $('.page-loader-wrapper').hide();
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        swal(resp.description);
      }
    },
      error => {
        $('.page-loader-wrapper').hide();
        var error = JSON.parse(error._body).responseCode;
        $('.page-loader-wrapper').hide();
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      });

  }
  // /*--------------------Change Ticket Type modal popup end------------------*/

  sendChangeTicketTypeMail() {

    if ($('#messageField').val() == "") {
      swal("Please enter message body");
      return false;
    }

    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "employeeComplaint/sendChangeComplaintTypeMail.spring";



    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body =
    {
      "to": this.to,
      "cc": this.cc,
      "subject": this.subject,
      "messageBody": $('#messageField').val(),
      "employeeName": this.employeeName,
      "raisedUnderCategory": this.raisedUnderCategory,
      "categoryToBeChanged": $('#categoryChangeTo').val(),
      "complaintId": this.ticketId,
      "description": this.description,
      "complaintTypeId": this.ticketTypeId,
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey")
    }

    console.log(url);
    console.log(JSON.stringify(body));

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      console.log(JSON.stringify(resp));

      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 504) {
        $("#changeTicketTypeModal").modal('hide');
        swal(resp.description);
        this.getTicketDetails();
      } else if (resp.responseCode == 440) {
        $('.page-loader-wrapper').hide();
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        swal(resp.description);
      }
    },
      error => {
        $('.page-loader-wrapper').hide();
        var error = JSON.parse(error._body).responseCode;
        $('.page-loader-wrapper').hide();
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      });

  }

  remindAgainAction() {

    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "employeeComplaint/remindAgainAction.spring";
    //http://106.51.38.64:8888/SumadhuraGateway/employeeservice/employeeComplaint/remindAgainAction.spring

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body =
    {
      "complaintId": this.ticketInfo_ticketId,
      "sessionKey": sessionStorage.getItem("login_sessionkey")
    }


    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 200) {
        swal("Reminder sent successfully !!");
      } else if (resp.responseCode == 440) {
        $('.page-loader-wrapper').hide();
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        swal(resp.description);
      }
    },
      error => {
        $('.page-loader-wrapper').hide();
        var error = JSON.parse(error._body).responseCode;
        $('.page-loader-wrapper').hide();
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      });

  }

  openTicketTypeModel() {

    $("#ticketTypeModal").modal();
  }

  getTicketTypeDetails() {

    this.ticketTypeResponses = "";
    ticketPurposeTypes = "";
    this.subPurposeList = "";

    $('#purposeTypeID').html('');
    $('#subPurposeTypeID').html('');

    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "employeeTicket/getTicketTypeDetails.spring";


    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body =
    {
      "sessionKey": sessionStorage.getItem("login_sessionkey")
    }


    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 200) {
        this.ticketTypeResponses = resp.ticketTypeResponses;
        ticketPurposeTypes = resp.ticketTypeResponses;


        $('#purposeTypeID').append("<option value='select'>--Select Purpose Type--</option>");

        $.each(this.ticketTypeResponses, function (i, val) {
          $('#purposeTypeID').append("<option value='" + val.ticketMainType + "'>" + val.ticketMainType + "</option>");
          $('#purposeTypeID').formSelect();
          $("#purposeTypeID").val('select');
        });


      } else if (resp.responseCode == 440) {
        $('.page-loader-wrapper').hide();
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        $("#ticketTypeModal").modal('hide');
        this.router.navigate([""]);
      } else {
      }
    },
      error => {
        $('.page-loader-wrapper').hide();
        var error = JSON.parse(error._body).responseCode;
        $('.page-loader-wrapper').hide();
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      });
  }

  approveChangeTicketType() {

    if ($('#purposeTypeID').val() == "select" || $('#purposeTypeID').val() == null) {
      swal("Please select purpose type");
      return false;
    }

    if ($('#subPurposeTypeID').val() == "select" || $('#subPurposeTypeID').val() == null) {
      swal("Please select sub-purpose type");
      return false;
    }

    $('#loader2').show();
    let url = this.cmn.commonUrl + "employeeComplaint/actionChangeComplaintType.spring";


    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body =
    {
      "complaintId": this.ticketInfo_ticketId,
      "changeTicketTypeAction": "APPROVED",
      "changedTicketTypeId": $('#subPurposeTypeID').val().split(',')[0], //"4",
      "categoryToBeChanged": $('#purposeTypeID').val() + "/" + $('#subPurposeTypeID').val().split(',')[1],  //"Booking /Welcome mail",
      "sessionKey": sessionStorage.getItem("login_sessionkey")
    }



    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $('#loader2').hide();

      if (resp.responseCode == 505) {
        $("#ticketTypeModal").modal('hide');
        swal(resp.description);
        this.router.navigate(["changeTicketType"]);
      } else if (resp.responseCode == 440) {
        $('.page-loader-wrapper').hide();
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        swal(resp.description);
      }
    },
      error => {
        $('#loader2').hide();
        var error = JSON.parse(error._body).responseCode;
        $('.page-loader-wrapper').hide();
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      });
  }

  rejectChangeTicketType() {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "employeeComplaint/actionChangeComplaintType.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body =
    {
      "complaintId": this.ticketInfo_ticketId,
      "changeTicketTypeAction": "REJECTED",
      "sessionKey": sessionStorage.getItem("login_sessionkey")
    }

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 506) {
        swal(resp.description);
        this.router.navigate(["changeTicketType"]);
      } else if (resp.responseCode == 440) {
        $('.page-loader-wrapper').hide();
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        swal(resp.description);
      }
    },
      error => {
        $('.page-loader-wrapper').hide();
        var error = JSON.parse(error._body).responseCode;
        $('.page-loader-wrapper').hide();
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      });

  }

  backToList() {
    if (sessionStorage.getItem("common_for_flats") == "viewtickets_graph") {
      sessionStorage.setItem('isBackButton_Clicked1', 'true');
      this.router.navigate(["View_Ticket_Graphs"]);
    }else if(sessionStorage.getItem("common_for_flats") == "View-All-Complaints"){
      sessionStorage.setItem('isBackButton_Clicked_viewallcmplnts', 'true');
      this.router.navigate(["View-All-Complaints"]);
    } else {
      sessionStorage.setItem('isBackButton_Clicked', 'true');
      this.router.navigate(["ticket/viewticket"]);
    }


  }
  viewclsedtickts() {
    this.router.navigate(["view-closed-tickets"]);
  }

  viewmycomplaints() {
    this.router.navigate(["View_My_Complaints"]);
  }


  marksofcomplaintfun(usertype) {
    if (usertype == "Mark As Complaint") {
      this.requestUrl = "Complaint";
    } else {
      this.requestUrl = "UnComplaint";
    }


    $("#markascomplaint").prop('disabled', false);
    $("#markascomplaint").addClass("color-1");
    this.loading = true;
    $('.page-loader-wrapper').hide();
    let url = this.cmn.commonUrl + "employeeTicket/saveTicketsComplaint.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body =
    {
      "sessionKey": sessionStorage.getItem("login_sessionkey"),
      "ticketIds": [this.ticketInfo_ticketId],
      "requestUrl": this.requestUrl
    }


    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {

        let url = this.cmn.commonUrl + "employeeTicket/getTicket.spring";
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var body = {
          "ticketId": "" + this.ticketInfo_ticketId,
          "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
          "requestUrl": "getComplaint",
          "ticketTypeDetailsId": this.ticket_type_detail_id
        }



        this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
          if (resp.responseCode == 200) {
            this.loading = false;
            if (resp.ticketResponseList[0].complaintStatus !== null || resp.ticketResponseList[0].complaintStatus !== undefined) {
              this.complaintStatus = resp.ticketResponseList[0].complaintStatus;
              if (this.complaintStatus == "86") {
                this.controllertitle = "Mark As Complaint";
                $("#markascomplaint").show();
                $("#markascomplaint").prop('disabled', false);
                $("#markascomplaint").addClass("color-1");
              } else if (this.complaintStatus !== "86" && this.deptid == 988 && this.roleid == 15) {
                this.controllertitle = "Mark As Uncomplaint";
                $("#markascomplaint").show();
                $("#markascomplaint").prop('disabled', false);
                $("#markascomplaint").addClass("color-1");

              } else {
                $("#markascomplaint").hide();

              }
            }
          }
        });



      } else if (resp.responseCode == 440) {
        $('.page-loader-wrapper').hide();
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        swal(resp.description);
      }
    },
      error => {
        $('.page-loader-wrapper').hide();
        var error = JSON.parse(error._body).responseCode;
        $('.page-loader-wrapper').hide();
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      });


  }




  Attachmentsfun() {
    this.loading1 = true;
    // $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "employeeComplaint/getComplaintAdditionalDetails.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "complaintId": this.ticketInfo_ticketId,
      "flatBookingId": this.flatBookingIdvalue,
      "requestUrl": "getComplaint",
      "type": "getAttachments"
    }

    console.log(url);
    console.log(JSON.stringify(body));
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      console.log(body);
      console.log(JSON.stringify(resp));
      this.loading1 = false;
      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        $("#customerinfoid1").css({ 'filter': 'alpha(opacity=60)', 'zoom': '1', 'opacity': '1' });
        if (resp.complaintResponseList[0].fileInfos.length !== 0) {
          this.pdflist = resp.complaintResponseList[0].fileInfos;
          this.customerhideme1 = false;
        } else {
          this.customerhideme1 = false;
          swal("No attachments found");
          return false;

        }

      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        if (resp.status == "Insufficient Input is given.") {
          swal("No data found");
          return false;
        }
      }
    },
      error => {
        this.loading1 = false;
        var error = JSON.parse(error._body).responseCode;
        $('.page-loader-wrapper').hide();
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }


  Customerinfofun() {
    this.loading2 = true;
    //  $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "employeeComplaint/getComplaintAdditionalDetails.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "complaintId": this.ticketIdvalue,
      "flatBookingId": this.flatBookingIdvalue,
      "requestUrl": "getComplaint",
      "type": "getPastComplaintHistory"

    }

    console.log(body);

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      console.log(resp);
      console.log(JSON.stringify(resp));
      this.loading2 = false;
      if (resp.responseCode == 200) {
        this.total_tickets = resp.totalComplaints;
        this.total_open = resp.open;
        this.tickets_closed = resp.closed;

        $("#customerinfoid").css({ 'filter': 'alpha(opacity=60)', 'zoom': '1', 'opacity': '1' });
        this.customerhideme = false;
      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        if (resp.status == "Insufficient Input is given.") {
          swal("No data found");
          return false;
        }
      }
    },
      error => {
        this.loading2 = false;
        var error = JSON.parse(error._body).responseCode;
        $('.page-loader-wrapper').hide();
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );

  }



  getFlatDetails() {

    $('.page-loader-wrapper').show();
    let serviceUrl = this.cmn.commonUrl + "employeeTicket/propertyDetails.spring";
    let Body = {
      "customerId": "" + sessionStorage.getItem('custIdd'),
      "flatId": "" + sessionStorage.getItem('flatIdd'),
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey")
    };
    let headers = new Headers({
      "Content-Type": "application/json",
      "Accept": "application/json"
    });

    let options = new RequestOptions({ headers: headers });

    this.http.post(serviceUrl, Body, options).map(resp => resp.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        this.DetailsArray = resp.flatDetailsInfoList;
        sessionStorage.setItem('getPageName', "viewMyflatDetailsPage");

      } else if (resp.responseCode == 440) {
        $('.page-loader-wrapper').hide();
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);

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

  getFlatCostDetails() {
    let serviceUrl = this.cmn.commonUrl + "employeeTicket/propertyAmenitiesCost.spring";
    let Body = {
      "customerId": "" + sessionStorage.getItem('custIdd'),
      "flatId": "" + sessionStorage.getItem('flatIdd'),
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey")
    };

    let headers = new Headers({
      "Content-Type": "application/json",
      "Accept": "application/json"
    });

    let options = new RequestOptions({ headers: headers });
    this.http.post(serviceUrl, Body, options).map(resp => resp.json()).subscribe(resp => {
      if (resp.responseCode == 200) {
        this.FlatcostArray = resp.flatDetailsInfoList;
        sessionStorage.setItem('flatdetails', 'true');
      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      }
    },
      error => {
        console.log(error);
      }
    );
  }

  getFlatDocuments() {
    this.showLoadingIndicatior = true;
    let serviceUrl = this.cmn.commonUrl + "employeeTicket/propertyUploadedDocs.spring";
    let Body = {
      "customerId": "" + sessionStorage.getItem('custIdd'),
      "flatId": "" + sessionStorage.getItem('flatIdd'),
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey")
    };
    let headers = new Headers({
      "Content-Type": "application/json",
      "Accept": "application/json"
    });
    let options = new RequestOptions({ headers: headers });
    this.http.post(serviceUrl, Body, options).map(resp => resp.json()).subscribe(resp => {
      if (resp.responseCode == 200) {
        this.showLoadingIndicatior = false;
        this.uploadeddocs = resp.pdfDetails;
      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      }
    },
      error => {
        console.log(error);
      }
    );
  }

  getModificationDetails() {
    this.showLoadingIndicatior = true;
    let serviceUrl = this.cmn.commonUrl + "employeeTicket/modificationDetails.spring";
    let Body = {
      "customerId": "" + sessionStorage.getItem('custIdd'),
      "flatId": "" + sessionStorage.getItem('flatIdd'),
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey")
    };
    let headers = new Headers({
      "Content-Type": "application/json",
      "Accept": "application/json"
    });
    let options = new RequestOptions({ headers: headers });
    this.http.post(serviceUrl, Body, options).map(resp => resp.json()).subscribe(resp => {
      if (resp.responseCode == 200) {
        this.showLoadingIndicatior = false;
        this.Modification_Array = resp.flatModificationCostDTOLIST;
        console.log("Property Modification view  Data:" + JSON.stringify(this.Modification_Array));
      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      }
    },
      error => {
        console.log(error);
      }
    );
  }

  downloadFile(filepath) {
    window.open(filepath, '_system', 'location=yes,closebuttoncaption=Fechar,enableViewportScale=yes');


  }


  getCustomerDetails() {
    var getpageName = sessionStorage.getItem('getPageName');
    if (getpageName == "escalationTicketDetailsPage") {
      this.module = "Escalation Tickets";
    }
    else {
      this.module = "Ticketing";
    }
    //$('.page-loader-wrapper').show();

    let serviceUrl = this.cmn.commonUrl + "employeeTicket/getCustomerProfileDetails.spring";

    let Body = {
      "customerId": "" + sessionStorage.getItem('custIdd'),
      "flatId": "" + sessionStorage.getItem('flatIdd'),
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey")
    };
    let headers = new Headers({
      "Content-Type": "application/json",
      "Accept": "application/json"
    });

    let options = new RequestOptions({ headers: headers });
    this.http.post(serviceUrl, Body, options).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        this.data_array = resp.coApplicants;
        this.showLoadingIndicatior = false;
        this.resp_ = resp;
        this.address = resp.customer.address
        this.prof_name = resp.customer.firstName + " " + resp.customer.lastName;
        this.DOB = resp.customer.dateOfBirth;
        this.son_of = resp.customer.relationName;
        this.telephone = resp.customer.telephone;
        this.phoneNo = resp.customer.phoneNo;
        this.email = resp.customer.email;
        this.pan_num = resp.customer.pancard;
        this.adar_num = resp.customer.aadharNumber;
        this.nationality = resp.customer.nationality;
      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
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

  titleclassfun() {
    this.router.navigateByUrl("View-My-Complaints");
  }

  close_complaint_fun() {
    this.router.navigateByUrl("View-Closed-Complaints");
  }
  view_all_complaint_fun() {
    this.router.navigateByUrl("View-All-Complaints");
  }
  viewticketDetails(){

    sessionStorage.setItem("common_for_flats", "Complaints-view-details");
      this.currentpagenumber = sessionStorage.getItem('currentPageNo');
      if (this.currentpagenumber == undefined) {
        this.currentpagenumber = JSON.stringify(1);
      }
      sessionStorage.setItem('currentPageNo', this.currentpagenumber);
      sessionStorage.setItem("from_Viewalltickets", "");
      this.viewticketData = JSON.stringify(json_response);
      this.ticketListtotaldata = JSON.stringify(json_totalticketresponse);
      this.ticketListtotaldata = JSON.stringify(json_totalticketresponse);

      // const host: string = location.origin;
      // const url: string = host + '/#' + String(this.router.createUrlTree(['tickets-view-details'],{ state: json_totalticketresponse} ));
      // window.open(url, '_blank');
  sessionStorage.setItem("ticket_new_tab" , "ticket_new_tab");

      const host: string = location.origin;
      const url: string = host + '/Ams_apps/#' + String(this.router.createUrlTree(['tickets-view-details'],{ state: json_totalticketresponse }));
      window.open(url, '_blank');


      //this.router.navigate(["tickets-view-details"], { state: json_totalticketresponse });
      sessionStorage.setItem('ticketdetails_view', this.viewticketData);
      sessionStorage.setItem("Totalticketdata", JSON.stringify(json_totalticketresponse));
      sessionStorage.setItem('buttonstutus', '');
      sessionStorage.setItem("currentpageindex", JSON.stringify(this.current_Page));


    
  }

}
