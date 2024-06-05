import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { CommonComponent } from '../common/common.component';
import { Router } from '@angular/router';
declare const $:any;
declare const swal:any;
//import * as XLSX from 'xlsx';
@Component({
  selector: 'app-flatdetails',
  templateUrl: './flatdetails.component.html',
  styleUrls: ['./flatdetails.component.sass']
})
export class FlatdetailsComponent implements OnInit {
  DetailsArray: any;
  FlatcostArray: any;
  uploadeddocs: any;
  Modification_Array: any;
  showLoadingIndicatior: boolean;
  submodule: string;
  navigateTo: string;
  module: string;
  pagename: string;
  navigateToSubModule: string;
  navigateToPagenamee: string;
  binding_parentpage: string;
  binding_childpage: string;
  parent_condition: string;
  child_condition: string;

  constructor(private router:Router,private http:Http,private cmn:CommonComponent) { 
    $('.page-loader-wrapper').hide();
    this.getFlatDetails();
    this.getFlatCostDetails();
    this.getFlatDocuments();
    this.getModificationDetails();

    /*---------------------Setting parent module name-------------------------*/
    this.parent_condition = sessionStorage.getItem("common_for_flats");
    console.log("parent page :"+sessionStorage.getItem("common_for_flats"));
   
    if(sessionStorage.getItem("common_for_flats") == "view_my_tickets"){
      this.binding_parentpage  = "View My Tickets"
    }else if(sessionStorage.getItem("common_for_flats") == "viewtickets"){
     this.binding_parentpage  = "View All Tickets"
    }else if(sessionStorage.getItem("common_for_flats") == "view_info_request"){
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
     }else if(sessionStorage.getItem("common_for_flats_child") == "dashboard_ticket_details"){
      this.binding_childpage  = "Ticket Details";
     }
/*---------------------Setting child module name End-------------------------*/
     
  }

  ngOnInit() {
  }

  getFlatDetails(){

    $('.page-loader-wrapper').show();
    let serviceUrl = this.cmn.commonUrl+"employeeTicket/propertyDetails.spring";
    console.log(serviceUrl);
   // let serviceUrl = "http://129.154.74.18:9999/customerservice/profile/propertyDetails.spring";
    let Body = {
      "customerId":""+sessionStorage.getItem('custIdd'),
      "flatId":""+sessionStorage.getItem('flatIdd'),
      "sessionKey":""+sessionStorage.getItem("login_sessionkey")
    };
    console.log(console.log(JSON.stringify(Body)));
    
 
    let headers = new Headers({
      "Content-Type": "application/json",
      "Accept": "application/json"
    });

    let options = new RequestOptions({ headers : headers });

   // let options = new RequestOptions({ headers: headers });

    this.http.post(serviceUrl, Body, options).map(resp => resp.json()).subscribe(resp => {
      console.log(resp);
      $('.page-loader-wrapper').hide();
      if(resp.responseCode == 200){
       this.DetailsArray = resp.flatDetailsInfoList;
       console.log(" Property Details view  Data:" + JSON.stringify(this.DetailsArray));
       sessionStorage.setItem('getPageName', "viewMyflatDetailsPage");

      }else if(resp.responseCode == 440){
        $('.page-loader-wrapper').hide();
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);

      } else {
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
      }
    },
      error => {
        console.log(error);
        var error=JSON.parse(error._body).responseCode;
        //alert(error);
        $('.page-loader-wrapper').hide();
        if(error == 440){
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }

  getFlatCostDetails(){
    //this.showLoadingIndicatior = true;
    let serviceUrl = this.cmn.commonUrl+"employeeTicket/propertyAmenitiesCost.spring";
    //let serviceUrl = "http://129.154.74.18:9999/customerservice/profile/propertyAmenitiesCost.spring";
    let Body = {
      "customerId":""+sessionStorage.getItem('custIdd'),
      "flatId":""+sessionStorage.getItem('flatIdd'),
      "sessionKey":""+sessionStorage.getItem("login_sessionkey")
    };

    let headers = new Headers({
      "Content-Type": "application/json",
      "Accept": "application/json"
    });

    let options = new RequestOptions({ headers: headers });
    this.http.post(serviceUrl, Body, options).map(resp => resp.json()).subscribe(resp => {
      console.log(resp);
      if(resp.responseCode == 200){
        //this.showLoadingIndicatior = false;
       this.FlatcostArray = resp.flatDetailsInfoList; 
       sessionStorage.setItem('flatdetails','true');     
       console.log(" Property Amenities view  Data:" + JSON.stringify(this.FlatcostArray));
      }else if(resp.responseCode ==440){
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
      }
    },
      error => {
        console.log(error);
      }
    );
  }

  getFlatDocuments(){
    this.showLoadingIndicatior = true;
    let serviceUrl = this.cmn.commonUrl+"employeeTicket/propertyUploadedDocs.spring";
   // let serviceUrl = "http://129.154.74.18:9999/customerservice/profile/propertyUploadedDocs.spring";
    let Body = {
     
      "customerId":""+sessionStorage.getItem('custIdd'),
      "flatId":""+sessionStorage.getItem('flatIdd'),
      "sessionKey":""+sessionStorage.getItem("login_sessionkey")
    };
    let headers = new Headers({
      "Content-Type": "application/json",
      "Accept": "application/json"
    });
    let options = new RequestOptions({ headers: headers });
    this.http.post(serviceUrl, Body, options).map(resp => resp.json()).subscribe(resp => {
      console.log(resp);
      if(resp.responseCode == 200){
        this.showLoadingIndicatior = false;
       this.uploadeddocs = resp.pdfDetails;
       console.log(" Property Amenities view  Data1234:" + JSON.stringify(this.uploadeddocs));
      }else if(resp.responseCode ==440){
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
      }
    },
      error => {
        console.log(error);
      }
    );
  }

  getModificationDetails(){
    this.showLoadingIndicatior = true;
    let serviceUrl = this.cmn.commonUrl+"employeeTicket/modificationDetails.spring";
   // let serviceUrl = "http://129.154.74.18:9999/customerservice/profile/modificationDetails.spring";
    let Body = {
     
      "customerId":""+sessionStorage.getItem('custIdd'),
      "flatId":""+sessionStorage.getItem('flatIdd'),
      "sessionKey":""+sessionStorage.getItem("login_sessionkey")
    };
    let headers = new Headers({
      "Content-Type": "application/json",
      "Accept": "application/json"
    });
    let options = new RequestOptions({ headers: headers });
    this.http.post(serviceUrl, Body, options).map(resp => resp.json()).subscribe(resp => {
      console.log(resp);
      if(resp.responseCode == 200){
        this.showLoadingIndicatior = false;
       this.Modification_Array = resp.flatModificationCostDTOLIST;
       console.log("Property Modification view  Data:" + JSON.stringify(this.Modification_Array));
      }else if(resp.responseCode ==440){
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
      }
    },
      error => {
        console.log(error);
      }
    );
  }

  downloadFile(filepath) {
    window.open(filepath, '_system', 'location=yes,closebuttoncaption=Fechar,enableViewportScale=yes');
    //   let loader=this.loadCtrl.create({});
    //   loader.present();
    //   // const alert = this.alertController.create({
    //   //   message: 'File downloaded successfully.',
    //   //   buttons: ['OK'],
    //   //   cssClass: 'alertCustomCss'
    //   // });

    //   const options: DocumentViewerOptions = {
    //     title: 'My PDF'
    //   }  
      
    //    var uri = encodeURI(filepath);
    //   const transfer=this.filetrans.create();
    //  console.log("Path: "+this.storageDirectory);
    //   transfer.download(filepath, this.storageDirectory+"file.pdf").then(entry=>{
    //     loader.dismiss();
    //    // alert.present();
    //     let url=entry.toURL();
    //     this.documentView.viewDocument(url, 'application/pdf', {})
    //   }, (error) => {
    //    console.log("Error: "+JSON.stringify(error));
    //    loader.dismiss();
    //   })

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
  
  dashboard_ticket_details(){
    this.router.navigate(['Ticketing-Dashboard/View-Tickets/Ticket-Details']); 
  }
}
