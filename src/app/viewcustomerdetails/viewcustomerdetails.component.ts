import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { CommonComponent } from '../common/common.component';
import { Router } from '@angular/router';
declare const $:any;
declare const swal:any;
@Component({
  selector: 'app-viewcustomerdetails',
  templateUrl: './viewcustomerdetails.component.html',
  styleUrls: ['./viewcustomerdetails.component.sass']
})
export class ViewcustomerdetailsComponent implements OnInit {

  prof_name: any;
  DOB: any;
  son_of: any;
  telephone: any;
  phoneNo: any;
  email: any;
  pan_num: any;
  adar_num: any;
  nationality: any;
  address: any;
  data_array: any;
  resp: any;
  showLoadingIndicatior: boolean;
  module: string;
  child_condition: string;
  binding_childpage: string;
  binding_parentpage: string;
  parent_condition: string;

  constructor(private http:Http, private cmn:CommonComponent,private router:Router) { 
    this.getCustomerDetails();
    /*---------------------Setting parent module name-------------------------*/
    this.parent_condition = sessionStorage.getItem("common_for_flats");
    console.log("parent page :"+sessionStorage.getItem("common_for_flats"));
    if(sessionStorage.getItem("common_for_flats") == "view_my_tickets"){
      this.binding_parentpage  = "View My Tickets"
    }else if(sessionStorage.getItem("common_for_flats") == "viewtickets"){
     this.binding_parentpage  = "View All Tickets"
    }else if(sessionStorage.getItem("commons_for_flats") == "view_info_request"){
      this.binding_parentpage  = "View Info Request"
     }else if(sessionStorage.getItem("common_for_flats") == "escalation_ticket"){
      this.binding_parentpage  = "Escalation Tickets";
     }else if(sessionStorage.getItem("common_for_flats") == "approve_escalation_ticket"){
      this.binding_parentpage  = "Approve Escalation Time";
     }else if(sessionStorage.getItem("common_for_flats") == "changeticketowner"){
      this.binding_parentpage  = "Change Ticket Owner";
     }else if(sessionStorage.getItem("common_for_flats") == "view_closed_tickets"){
      this.binding_parentpage  = "View Closed Tickets";
    }
       /*---------------------Setting parent module name End-------------------------*/
       

      /*---------------------Setting child module name start-------------------------*/
      console.log("Child page :"+sessionStorage.getItem("common_for_flats_child"));
      this.child_condition = sessionStorage.getItem("common_for_flats_child"); 

     if(sessionStorage.getItem("common_for_flats_child") == "view_info_request_details"){
      this.binding_childpage  = "View Info Request Details";
     }else if(sessionStorage.getItem("common_for_flats_child") == "ticket_details"){
      this.binding_childpage  = "Ticket Details";
     }else if(sessionStorage.getItem("common_for_flats_child") == "escalation_details"){
      this.binding_childpage  = "Escalation Details";
     }else if(sessionStorage.getItem("common_for_flats_child") == "approve_escalation_details"){
      this.binding_childpage  = "Approve Escalation Details";
     }
/*---------------------Setting child module name End-------------------------*/
  }

  ngOnInit() {
  }

  getCustomerDetails(){
    var getpageName = sessionStorage.getItem('getPageName');
    if (getpageName == "escalationTicketDetailsPage") {
      this.module = "Escalation Tickets";
      // this.submodule = "View My Tickets";
      // this.pagename = "Ticket Details";
      // this.navigateToSubModule = "/view-my-tickets";
      // this.navigateToPagenamee = "/ticket/ticketdetails";

    } 
    // else if(getpageName == "approveEscalationDetailsPage"){
    //   this.module = "Approve Escalation Time";
    // }
    // else if(getpageName == "viewAllTicketspage") {
    //   // this.module = "View Customers";
    //   this.submodule = "View All Tickets";
    // //  this.pagename = "Customer Details";
    //   this.navigateTo = "/ticket/viewticket";
    // }
    else{
      this.module = "Ticketing";
    }
    $('.page-loader-wrapper').show();

       let serviceUrl = this.cmn.commonUrl+"employeeTicket/getCustomerProfileDetails.spring";
       console.log("serviceUrl :"+serviceUrl);
      // let serviceUrl ="http://129.154.74.18:8888/customerservice_UAT/getCustomerProfileDetails.spring"
     // let serviceUrl ="http://129.154.74.18:9999/employeeservice/employeeTicket/getCustomerProfileDetails.spring"
  
      let Body = {
        "customerId":""+ sessionStorage.getItem('custIdd'),
        "flatId":""+sessionStorage.getItem('flatIdd'),
        "sessionKey":""+sessionStorage.getItem("login_sessionkey")
      };
     console.log("Body :"+JSON.stringify(Body));
      let headers = new Headers({
        "Content-Type": "application/json",
        "Accept": "application/json"
      });

      let options = new RequestOptions({ headers: headers });
      this.http.post(serviceUrl, Body, options).map(res => res.json()).subscribe(resp => {
        console.log("Cus Details: "+ JSON.stringify(resp));
        $('.page-loader-wrapper').hide();
        if(resp.responseCode == 200){
          this.data_array = resp.coApplicants;
           //alert(this.data_array);
          this.showLoadingIndicatior = false;
          this.resp = resp;
          this.prof_name = resp.customer.firstName+" "+resp.customer.lastName;
          this.DOB = resp.customer.dateOfBirth;
          this.son_of = resp.customer.relationName;
          this.telephone = resp.customer.telephone;
          this.phoneNo = resp.customer.phoneNo;
          this.email = resp.customer.email;
          this.pan_num = resp.customer.pancard;
          this.adar_num = resp.customer.aadharNumber;
          this.nationality = resp.customer.nationality;
         // this.address = resp.customer.customerAddress.hno+","+resp.customer.customerAddress.tower+","+resp.customer.customerAddress.city+","+resp.customer.customerAddress.pincode;
      
        }else if(resp.responseCode ==440){
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
        
      },
        error => {
          $('.page-loader-wrapper').hide();
        var error=JSON.parse(error._body).responseCode;
        if(error == 440){
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
        }
      );
  }

  homeClick(){
    this.cmn.commonHomeNavigation();
  }

  viewalltickets(){
    this.router.navigate(['ticket/viewticket']);
  }

  view_my_tickets(){
    this.router.navigate(['view-my-tickets']);
  }

  approve_escalation_ticket(){
    this.router.navigate(['approve-escalation']);
  }
  view_info_request(){
    this.router.navigate(['ticket/viewinforequest']);
  }

  ticketdetail(){
    this.router.navigate(['ticket/ticketdetails']);
  }

  viewinforequestdetail(){
    this.router.navigate(['ticket/viewinforequestdetails']);
  }

  escalation_ticket(){
    this.router.navigate(['escalation-tickets']);
  }

  escalation_details(){
    this.router.navigate(['escaltion-ticketdetails']); 
  }

  approve_escalation_details(){
    this.router.navigate(['approve-escalation-details']); 
  }

  changeticketowner(){
    this.router.navigate(['changeticketowner']); 
  }
}
