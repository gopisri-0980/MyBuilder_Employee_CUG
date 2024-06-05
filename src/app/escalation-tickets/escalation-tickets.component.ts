import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from "@angular/router";
import { Http, RequestOptions, Headers } from '@angular/http';
import { HttpClient } from "@angular/common/http";
import { CommonComponent } from '.././common/common.component';
import 'rxjs/add/operator/map';
import { DeviceDetectorService } from 'ngx-device-detector';
declare const $: any;
declare const swal: any;
@Component({
  selector: 'app-escalation-tickets',
  templateUrl: './escalation-tickets.component.html',
  styleUrls: ['./escalation-tickets.component.sass']
})
export class EscalationTicketsComponent implements OnInit {
  ticketList: any;
  viewticketData: any;
  total_tickets: any;
  open_tickets: any;
  total_inProgress: any;
  total_closed: any;
  showLoadingIndicatior: boolean;
  deviceInfo: any;
  itemsPer_Page: number;
  current_Page: number;
  totalItems: number;
  searchText: any;
  dynamicpage_size: number;
  total_Tickets: any;
  total_length: any;
  ticketListtotaldata: string;

  constructor(private deviceService: DeviceDetectorService, private router: Router, private http: Http, public cmn: CommonComponent) {
    this.getTicketList();
    $(function () {
      $("#tableSelect").select2({
        minimumResultsForSearch: Infinity
        // placeholder: "Search Device",
        // dir: "ltl"
      });
    });
   
    $('#noData').hide();
    setTimeout(function () {
      $('#noData').show();
    }, 5000)
  }
  ngViewDidLoad() {

  }

  epicFunction() {
  
    this.deviceInfo = this.deviceService.getDeviceInfo();
   
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();
  
  }
  ngOnInit() {

  }
  ngAfterViewInit() {
    $('#tableSelect').on('change', (event) => {
      if ($("#tableSelect").val() == "select") {
        return false;
      }
      var symbolSelected = event.target.value;
      $(".page-loader-wrapper").show();

      let url = this.cmn.commonUrl + "employeeTicket/getSystemEscalatedTicketDetails.spring";
  
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      var body;
      if ($("#tableSelect").val() == "All") {

        body = {
          "requestUrl": "getSystemEscalatedTicketDetails.spring",
          "sessionKey": "" + sessionStorage.getItem("login_sessionkey")
        }
      } else {
        body = {
          "requestUrl": "getSystemEscalatedTicketDetails.spring",
          "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
          "pageSize": "" + $('#tableSelect').val(),
          "pageNo": "1",
        }
      }

 
      this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
        $(".page-loader-wrapper").hide();
      
        if (resp.responseCode == 200) {
          this.current_Page = 1;
          if ($("#tableSelect").val() == "All") {
          
            this.totalItems = resp.ticketResponseList.length;
          
            this.itemsPer_Page = resp.ticketResponseList.length;
          
          } else {
            this.totalItems = $('#tableSelect').val();
            this.itemsPer_Page = resp.pageCount * $('#tableSelect').val();
          }

          this.ticketList = resp.ticketResponseList;

         

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
          
          $('.page-loader-wrapper').hide();
          if (error == 440) {
            swal("Your Session has been Timed Out!", "Please login once again.", "error");
            this.router.navigate([""]);
          }
          console.log(error);
        }
      );
    });

  }

  getColor(country) {
    switch (country) {
      case 'Closed':
        return '#4caf50';
      case 'pending':
        return '#9c27b0';
      case 'open':
        return '#f44336';
    }
  }

  gotoTicketDetailspage(data) {
    // let navigationExtras: NavigationExtras = {
    //   queryParams: {
    //       "user": JSON.stringify(data)
    //   }
    // };
    sessionStorage.setItem("common_for_flats", "escalation_ticket");
    this.viewticketData = JSON.stringify(data);
    this.ticketListtotaldata = JSON.stringify(this.ticketList);
    this.router.navigate(["escaltion-ticketdetails"], { state: this.viewticketData });
    sessionStorage.setItem("Totalticketdata" , this.ticketListtotaldata);
    sessionStorage.setItem('ticketdetails_view', this.viewticketData);
    sessionStorage.setItem("currentpageindex" , JSON.stringify(this.current_Page));

  }



 




  getTicketList() {
    $(".page-loader-wrapper").show();
    let url = this.cmn.commonUrl + "employeeTicket/getSystemEscalatedTicketDetails.spring";
   
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      // "employeeId":""+sessionStorage.getItem('session_empid'),
      "requestUrl": "getSystemEscalatedTicketDetails.spring",
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "pageNo": "1",
      "pageSize": "10"
    }
    console.log("----body :" + JSON.stringify(body));
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $(".page-loader-wrapper").hide();
     
      if (resp.responseCode == 200) {
        this.itemsPer_Page = resp.pageCount * 10;

        this.current_Page = 1;
        this.totalItems = 10;
        this.ticketList = resp.ticketResponseList;
        this.total_length = resp.ticketResponseList.length;
       

      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);

      } else if (resp.responseCode == 700) { //by venkat on 26-12-2019 at 1:23pm
        //swal(resp.description, "error");
        this.total_length = resp.ticketResponseList;

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
        console.log(error);
      }
    );
  }

  public pageChanged(event: any): void {
  
    console.log('Number items per page: ' + event);
    $(".page-loader-wrapper").show();

    let url = this.cmn.commonUrl + "employeeTicket/getSystemEscalatedTicketDetails.spring";
  

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      // "employeeId":""+sessionStorage.getItem('session_empid'),
      "requestUrl": "getSystemEscalatedTicketDetails.spring",
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "pageNo": event,
      "pageSize": 10
    }

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      console.log(resp);
      $(".page-loader-wrapper").hide();
      console.log(JSON.stringify(resp));
      if (resp.responseCode == 200) {
        this.itemsPer_Page = resp.pageCount * 10;
        this.current_Page = event;
        this.totalItems = 10;
        this.ticketList = resp.ticketResponseList;
        //  setTimeout(function(){
        //   $('#tableExport').DataTable();
        //  },1000)

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
        console.log(error);
      }
    );
  }

  homeClick() {
    this.cmn.commonHomeNavigation();
  }
}
