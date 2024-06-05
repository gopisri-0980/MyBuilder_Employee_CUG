import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { CommonComponent } from '../common/common.component';
declare const Chart: any;
declare const $: any;
declare const CKEDITOR: any;
declare const swal: any;
declare const tinymce: any;
var json_response;
var json_totalticketresponse;
@Component({
  selector: 'app-ticketing-dashboard-ticket-details',
  templateUrl: './ticketing-dashboard-ticket-details.component.html',
  styleUrls: ['./ticketing-dashboard-ticket-details.component.sass']
})
export class TicketingDashboardTicketDetailsComponent implements OnInit {
  ticketINfomessage: any;
  pdflist: any;
  ticketmessageData: any;
  total_tickets: any;
  total_open: any;
  tickets_closed: any;
  view_ticketdetails_status: any;
  flat_number: any;
  ticket_type: any;
  department_Name: any;
  flat_Id: any;
  customer_id: any;
  ticket_Id: any;
  ticketInfo_createdDate: any;
  ticket_escalationdate: any;
  project_name: any;
  profilepic: any;
  customer_name: any;
  customer_email: any;
  breadCrumbUnRespondingTickets: boolean;
  breadCrumbViewTickets: boolean;

  loading2: boolean = false;
  loading1: boolean = false;
  flatBookingIdvalue: any;
  ticketIdvalue: any;
  customerhideme1: boolean = true;

  customerhideme: boolean = true;
  reportdetails: string;
  ticketdetailsresponse: any;
  tickettotaldetailsresponse: any;
  pageIndex: number;
  ticketInfo_status: any;
  ticketInfo_ticketId: any;
  ticket_type_detail_id: any;
  constructor(private router: Router, private http: Http, public cmn: CommonComponent) {
    json_response = eval('(' + sessionStorage.getItem('ticketdetails_view') + ')');

    console.log(JSON.stringify(json_response));
    console.log(json_response.ticketId);
   // var json_response;

    //json_response = eval('(' + sessionStorage.getItem('ticketdetails_view') + ')');

    this.ticketdetailsresponse = json_response;
    console.log(sessionStorage.getItem('Totalticketdata'))
    console.log(JSON.stringify(sessionStorage.getItem('Totalticketdata')))
    json_totalticketresponse = eval('(' + sessionStorage.getItem('Totalticketdata') + ')');
    this.tickettotaldetailsresponse = json_totalticketresponse;
    console.log(this.tickettotaldetailsresponse)
    console.log(JSON.stringify(this.tickettotaldetailsresponse))
    //this.currentpageindex = sessionStorage.getItem("currentpageindex");

console.log(this.tickettotaldetailsresponse.length)
//alert(this.ticketdetailsresponse.ticketId)
    for (var i = 0; i < this.tickettotaldetailsresponse.length; i++) {
    //  alert(this.tickettotaldetailsresponse[i].ticketId)
     
      if (this.tickettotaldetailsresponse[i].ticketId == this.ticketdetailsresponse.ticketId) {
        this.pageIndex = i;
      }
    }
    if (sessionStorage.getItem('navigatingFrom') == 'UnRespondingTickets') {
      this.breadCrumbUnRespondingTickets = true;
    } else {
      this.breadCrumbViewTickets = true
    }
    this.getTicketDetails(json_response.ticketId,json_response.ticketTypeDetailsId);
  }

  ngOnInit() {
  
    console.log(sessionStorage.getItem("Ticketaveragetimeside"));
    console.log(sessionStorage.getItem('Feedbackreport1'));
    console.log(sessionStorage.getItem('Monthlyreport'));

   // sessionStorage.setItem("Ticketprojectwisereport" ,"Ticket projectwise report");


    if (sessionStorage.getItem('Monthlyreport') == "Monthlyreport") {
      this.reportdetails = "Monthly Report Details";
    } else if (sessionStorage.getItem('Feedbackreport1') == "Feedbackreport1") {
      this.reportdetails = "Feedback Report Details";
    } else if(sessionStorage.getItem("Ticketaveragetimeside") == "Ticketaveragetimeside" ) {
      this.reportdetails = "Ticket average closing time";
    } else if(sessionStorage.getItem("Ticketprojectwisereport") == "Ticket projectwise report"){
      this.reportdetails = "Ticket projectwise report";
    } else if( sessionStorage.getItem('escalationTickets') == "escalationTickets"){

      this.reportdetails = "Escalation tickets";
    }
    else {
      this.reportdetails = "Ticketing Dashboard";
    }


   

    $("#customerinfoid").css({ 'filter': 'alpha(opacity=60)', 'zoom': '1', 'opacity': '0.2' });
    $("#customerinfoid1").css({ 'filter': 'alpha(opacity=60)', 'zoom': '1', 'opacity': '0.2' });
  }


  ticketingnav(data){

    if(data == "Monthly Report Details"){
      this.router.navigateByUrl("Ticket_Monthly_Report");
    } else if(data == "Feedback Report Details"){
      this.router.navigateByUrl("Ticket_Feedback_Report");
    }else if(data == "Ticket average closing time") {
      this.router.navigateByUrl("Ticket_Average_Time");
    } else if(data == "Ticketing Dashboard") {
      this.router.navigateByUrl("Ticketing-Dashboard");
    } else if(data == "Ticket projectwise report"){
      this.router.navigateByUrl("Ticket_Projectwise_Details");
    } else if(data == "Escalation tickets"){
      this.router.navigateByUrl("ProjectWise_Escalation_Report");
    }

    

  }

  getTicketDetails(typeId, detailsId) {
    let url = this.cmn.commonUrl + "employeeTicket/getTicket.spring";
    $('#loader2').show();
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "ticketId": "" + typeId,
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "requestUrl": "getTicket",
      "ticketTypeDetailsId": detailsId
    }

    console.log(body)
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      console.log(resp);
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        this.ticket_Id = resp.ticketResponseList[0].ticketId;
        this.ticketINfomessage = resp.ticketResponseList[0].description;
        this.ticket_type = resp.ticketResponseList[0].ticketType.ticketType;
        this.department_Name = resp.ticketResponseList[0].department.departmentName;
        this.ticketInfo_createdDate = resp.ticketResponseList[0].createdDate;
        this.ticket_escalationdate = resp.ticketResponseList[0].estimatedResolvedDate;
        this.project_name = resp.ticketResponseList[0].customerPropertyDetails.siteName;
        this.pdflist = resp.ticketResponseList[0].fileInfos;
        this.ticketmessageData = resp.ticketResponseList[0].ticketComments;
        this.total_tickets = resp.totalTickets;
        this.total_open = resp.open;
        this.tickets_closed = resp.closed;
        this.view_ticketdetails_status = resp.ticketResponseList[0].status;
        this.flat_number = resp.ticketResponseList[0].customerPropertyDetails.flatNo;
        this.flat_Id = resp.ticketResponseList[0].customerPropertyDetails.flatId;
        this.customer_id = resp.ticketResponseList[0].customerPropertyDetails.customerId;
        this.profilepic = resp.ticketResponseList[0].customerPropertyDetails.customerProfilePic;
        this.customer_name = resp.ticketResponseList[0].customerPropertyDetails.customerName;
        this.customer_email = resp.ticketResponseList[0].customerPropertyDetails.customerEmail;
        this.flatBookingIdvalue = resp.ticketResponseList[0].flatBookingId;

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

  viewflatDetails(flatId, custId) {
    sessionStorage.setItem("common_for_flats_child", "dashboard_ticket_details");
    sessionStorage.setItem('custIdd', custId);
    sessionStorage.setItem('flatIdd', flatId);
    this.router.navigate(["ticket/flatdetails"]);
  }

  public viewCustomerDetails(custId, flatId) {
    sessionStorage.setItem("common_for_flats_child", "dashboard_ticket_details");
    sessionStorage.setItem('custIdd', custId);
    sessionStorage.setItem('flatIdd', flatId);
    this.router.navigate(["viewcustomerdetails"]);
  }

  pdfClick(val) {
    window.open(val, '_system', 'location=yes,closebuttoncaption=Fechar,enableViewportScale=no');
  }

  homeClick() {
    this.cmn.commonHomeNavigation();
  }

 

  Attachmentsfun() {
    this.loading1 = true;
    //  $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "employeeTicket/getTicketAdditionalDetails.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "ticketId": this.ticket_Id,
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
      "ticketId": this.ticket_Id,
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

  getServerData(event) {
    debugger;
    console.log(event.pageIndex);
    console.log(this.tickettotaldetailsresponse[event.pageIndex]);

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
    console.log(json_totalticketresponse);
  
      this.tickettotaldetailsresponse = json_totalticketresponse;
     // alert(this.ticketdetailsresponse.ticketId)
      for (var i = 0; i < this.tickettotaldetailsresponse.length; i++) {
        if (this.tickettotaldetailsresponse[i].ticketId == this.ticketdetailsresponse.ticketId) {
          this.pageIndex = i;
        }
      
    }

   






    /*--------------Customer Flat Details Start-------------------*/
    var flatdetails = this.ticketdetailsresponse.customerPropertyDetails;
    sessionStorage.setItem("ticket_flatdetails", json_response.customerPropertyDetails)
    //this.flat_number = flatdetails.flatNo;
    this.ticketInfo_status = this.ticketdetailsresponse.status;
   

    this.ticketInfo_ticketId = this.ticketdetailsresponse.ticketId;
  //  this.change_ticket_owner_list(this.ticketInfo_ticketId);
   // mychcklist_ticketId.push(this.ticketInfo_ticketId);
    this.ticketInfo_createdDate = json_response.createdDate;
    //this.customer_name = this.ticketdetailsresponse.customerPropertyDetails.customerName;
    //this.profilepic = this.ticketdetailsresponse.customerPropertyDetails.customerProfilePic;

   // this.customer_email = this.ticketdetailsresponse.customerPropertyDetails.customerEmail;
    this.ticket_Id = this.ticketdetailsresponse.ticketId;
  //  this.department_Name = this.ticketdetailsresponse.department.departmentName;
   // this.project_name = this.ticketdetailsresponse.customerPropertyDetails.siteName;
   // this.ticket_type = this.ticketdetailsresponse.ticketType.ticketType;
    this.ticket_escalationdate = this.ticketdetailsresponse.estimatedResolvedDate;
  //  this.resovedDate = this.ticketdetailsresponse.resolvedDate
//this.ticket_type_detail_id = this.ticketdetailsresponse.ticketTypeDetailsId;
    /*--------------Customer Flat Details End-------------------*/
    this.ticket_type_detail_id = this.ticketdetailsresponse.ticketTypeDetailsId;
    this.ticketdetailsresponse.ticketId
    this.getTicketDetails(this.ticketdetailsresponse.ticketId,this.ticketdetailsresponse.ticketTypeDetailsId);
   // this.departmentList();





  }
}

