import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Http, RequestOptions, Headers } from '@angular/http';
import { CommonComponent } from 'src/app/common/common.component';
declare const $: any;
declare const swal: any;
var json_escaltion_escalationApprovals;

@Component({
  selector: 'app-approve-escalation-details',
  templateUrl: './approve-escalation-details.component.html',
  styleUrls: ['./approve-escalation-details.component.sass']
})
export class ApproveEscalationDetailsComponent implements OnInit {

  ticketmessageData: any;
  sub: any;
  id: any;
  messageReplay: String;
  escalationDate: any;
  flatdetailstoview: any;
  total_tickets: any;
  open_tickets: any;
  total_closed: any;
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

  modellabel_name: string;
  clickedButtonName: string;
  display: any;
  cust_name: any;
  proj_name: any;
  flat_Id: any;
  customer_id: any;
  estimated_date: any;
  ticketIdd: string;
  created_date: any;
  pending_department: any;
  ticketType: any;
  proj_status: any;
  pdflist: any;
  remarks: any;
  requestedEscalationDate: any;

  loading2: boolean = false;
  loading1: boolean = false;
  flatBookingIdvalue: any;
  ticketIdvalue: any;
  customerhideme1: boolean = true;
  customerhideme: boolean = true;

  constructor(public route: ActivatedRoute, private router: Router, private http: Http, public cmn: CommonComponent) {
    $('.page-loader-wrapper').hide();
    this.getTicketDetails();
    // console.log("data: " + router.getCurrentNavigation().extras.state);
    var json_response = sessionStorage.getItem('escaltioncomment');
    json_escaltion_escalationApprovals = eval('(' + sessionStorage.getItem("escaltion_escalationApprovals") + ')');
    this.remarks = json_escaltion_escalationApprovals.comments;
    this.requestedEscalationDate = json_escaltion_escalationApprovals.extendedEscalationDate;

    // alert(this.remarks);
    $(function () {

      $("#customerinfoid").css({ 'filter': 'alpha(opacity=60)', 'zoom': '1', 'opacity': '0.2' });
      $("#customerinfoid1").css({ 'filter': 'alpha(opacity=60)', 'zoom': '1', 'opacity': '0.2' });


      var currentEscalationDate = new Date(json_escaltion_escalationApprovals.currentEscalationDateTimestamp);
      var newdate = currentEscalationDate.setDate(currentEscalationDate.getDate() +1);
    //  alert(new Date(newdate))
      var maxApprovalDate = currentEscalationDate.setDate(currentEscalationDate.getDate()+ (json_escaltion_escalationApprovals.noOfDays -1));
//alert(new Date(maxApprovalDate))
     // alert(json_escaltion_escalationApprovals.noOfDays)
      $('#escalationDate').bootstrapMaterialDatePicker({
        format: 'DD-MM-YYYY',
        minDate: new Date(newdate),
        maxDate: new Date(maxApprovalDate),
        clearButton: true,
        weekStart: 1,
        time: false
      });
    });
    //alert(json_escaltion_escalationApprovals.currentEscalationDateTimestamp);
    // /*--------------Customer Flat Details Start-------------------*/
    // var flatdetails = json_response.customerPropertyDetails;
    // this.flat_number = flatdetails.flatNo;
    // console.log("---------------"+this.flat_number);
    // this.ticketInfo_status = json_response.status;
    // this.ticketInfo_createdDate = json_response.createdDate;
    //  this.customer_name = json_response.customerPropertyDetails.customerName;
    //  this.customer_email = json_response.customerPropertyDetails.customerEmail;

    // this.department_Name = json_response.department.departmentName; 
    // this.ticket_escalationdate = json_response.ticketEscalationResponses[json_response.ticketEscalationResponses.length-1].escalationDate;
    //  /*--------------Customer Flat Details End-------------------*/

    $(document).ready(function () {

    });
  }

  ngOnInit() {
  }

  viewflatDetails(custId, flatId) {
    sessionStorage.setItem("common_for_flats_child", "approve_escalation_details");
    sessionStorage.setItem('custIdd', custId);
    sessionStorage.setItem('flatIdd', flatId);

    this.router.navigate(["ticket/flatdetails"]);
  }

  //to view the Customer Details
  public viewCustomerDetails() {
    this.router.navigate(["customer/viewcustomerdetails"]);
  }

  getTicketDetails() {
    debugger;
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "employeeTicket/getTicket.spring";
    //  let url = "http://129.154.74.18:8888/employeeservice/employeeTicket/getTicket.spring"
    console.log("url :" + url);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "ticketId": "" + sessionStorage.getItem('esctimeresponse'),
      "requestUrl": "getTicket",
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey")
    }
    console.log("----body :" + JSON.stringify(body));
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      console.log(" Approve escalation TicketDetails response----------" + JSON.stringify(resp));
      if (resp.responseCode == 200) {
        this.pdf_array = resp.ticketResponseList[0].fileInfos;
        this.ticketINfomessage = resp.ticketResponseList[0].description;
        this.pdflist = resp.ticketResponseList[0].fileInfos;
        //  alert(this.pdflist)
        this.ticketmessageData = resp.ticketResponseList[0].ticketComments;

        this.flat_number = resp.ticketResponseList[0].customerPropertyDetails.flatNo;
        this.proj_name = resp.ticketResponseList[0].customerPropertyDetails.siteName;
        this.proj_status = resp.ticketResponseList[0].status;
        this.flat_Id = resp.ticketResponseList[0].customerPropertyDetails.flatId;
        this.customer_id = resp.ticketResponseList[0].customerPropertyDetails.customerId;
        this.pending_department = resp.ticketResponseList[0].department.departmentName;

        this.flatBookingIdvalue = resp.ticketResponseList[0].flatBookingId;
        this.ticketIdvalue = resp.ticketResponseList[0].ticketId;

        this.ticketType = resp.ticketResponseList[0].ticketType.ticketType;
        this.estimated_date = resp.ticketResponseList[0].estimatedResolvedDate;
        this.created_date = resp.ticketResponseList[0].createdDate;

        this.ticketIdd = sessionStorage.getItem('esctimeresponse');
        sessionStorage.setItem('getPageName', "approveEscalationDetailsPage");
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

  approveClickModal() {
    $("#basicModal").modal();

  }



  /*-----------------------Approve Click Event Start-----------------------*/
  approveClick() {

    var temp = $('#escalationDate').val().split("-")[2] + "-" + $('#escalationDate').val().split("-")[1] + "-" + $('#escalationDate').val().split("-")[0]

    // $( "#datepicker" ).datepicker({
    //   inline: true,
    //   changeMonth: true,
    //   changeYear: true,
    //   minDate:min_date,
    //   maxDate: max_date
    //   });
    //  $('#escalationDate').focus();


    // alert("Approve Click Event");
    // return false;
    debugger;
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "employeeTicket/updateExtendEsacalationTimeDetailsStatus.spring";
    // http://localhost:8080/employeeservice/employeeTicket/updateExtendEsacalationTimeDetailsStatus.spring
    console.log("url :" + url);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "ticketId": "" + sessionStorage.getItem('esctimeresponse'),
      "ticketExtendedEscalationApprovalId": "" + sessionStorage.getItem('escaltionId'),
      "requestUrl": "approval",
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "approvedEscalationDate": new Date(temp).getTime()
    }

    console.log("----updateExtendEsacalationTimeDetailsStatus body :" + JSON.stringify(body));
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      console.log(" Approve button response----------" + JSON.stringify(resp));
      if (resp.responseCode == 200) {
        swal("Request has been approved.");
        $("#basicModal").modal('hide');
        this.router.navigate(["approve-escalation"]);
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
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }
  /*-----------------------Approve Click Event End-----------------------*/

  /*-----------------------Reject Click Event Start-----------------------*/
  rejectClick() {
    //alert("Reject Click Event");
    // return false;

    debugger;
    var temp = $('#escalationDate').val().split("-")[2] + "-" + $('#escalationDate').val().split("-")[1] + "-" + $('#escalationDate').val().split("-")[0]

    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "employeeTicket/updateExtendEsacalationTimeDetailsStatus.spring";
    //  let url = "http://129.154.74.18:8888/employeeservice/employeeTicket/updateExtendEsacalationTimeDetailsStatus.spring"
    console.log("url :" + url);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "ticketId": "" + sessionStorage.getItem('esctimeresponse'),
      "ticketExtendedEscalationApprovalId": "" + sessionStorage.getItem('escaltionId'),
      "requestUrl": "reject",
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      //   "approvedEscalationDate":""

    }
    console.log("----body :" + JSON.stringify(body));
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      console.log("Escalation reject response----------" + JSON.stringify(resp));
      if (resp.responseCode == 200) {
        swal("Request has been rejected.");
        $("#basicModal").modal('hide');
        this.router.navigate(["approve-escalation"]);
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
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }
  /*-----------------------Reject Click Event End-----------------------*/

  homeClick() {
    this.cmn.commonHomeNavigation();
  }

  pdfClick(val) {
    window.open(val, '_system', 'location=yes,closebuttoncaption=Fechar,enableViewportScale=yes');
  }
  approveEscalationlist() {
    this.router.navigate(['approve-escalation']);
  }



  Attachmentsfun() {
    this.loading1 = true;
    //  $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "employeeTicket/getTicketAdditionalDetails.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "ticketId": this.ticketIdvalue,
      "flatBookingId": this.flatBookingIdvalue,
      "requestUrl": "getTicket",
      "type": "getAttachments"
    }

    console.log(JSON.stringify(body));

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      console.log(JSON.stringify(resp));
      this.loading1 = false;
      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        $("#customerinfoid1").css({ 'filter': 'alpha(opacity=60)', 'zoom': '1', 'opacity': '1' });
        if (resp.ticketResponseList[0].fileInfos.length !== 0) {
          this.pdflist = resp.ticketResponseList[0].fileInfos;
          this.customerhideme1 = false;
        } else {
          this.customerhideme1 = true
          swal("No attachments found");
          return false;

        }

      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        swal(resp.status);
      }
    },
      error => {
        this.loading1 = false;
        var error = JSON.parse(error._body).responseCode;
        //$('.page-loader-wrapper').hide();
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }

  Customerinfofun() {
    this.loading2 = true;
    //$('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "employeeTicket/getTicketAdditionalDetails.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "ticketId": this.ticketIdvalue,
      "flatBookingId": this.flatBookingIdvalue,
      "requestUrl": "getTicket",
      "type": "getPastTicketHistory"

    }

    console.log(JSON.stringify(body));

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      console.log(JSON.stringify(resp));
      //  $('.page-loader-wrapper').hide();
      this.loading2 = false;
      if (resp.responseCode == 200) {

        //  $('.page-loader-wrapper').hide();
        this.total_tickets = resp.totalTickets;
        this.total_open = resp.open;
        this.tickets_closed = resp.closed;

        $("#customerinfoid").css({ 'filter': 'alpha(opacity=60)', 'zoom': '1', 'opacity': '1' });
        this.customerhideme = false;
      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        swal(resp.status);
      }
    },
      error => {
        this.loading2 = false;
        var error = JSON.parse(error._body).responseCode;
        // $('.page-loader-wrapper').hide();
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );

  }
}





