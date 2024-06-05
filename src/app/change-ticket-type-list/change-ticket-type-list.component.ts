import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras } from "@angular/router";
import { Http, RequestOptions, Headers } from '@angular/http';
import { HttpClient } from "@angular/common/http";
import { CommonComponent } from '../common/common.component';
import 'rxjs/add/operator/map'
declare const $: any;
declare const swal:any;

@Component({
  selector: 'app-change-ticket-type-list',
  templateUrl: './change-ticket-type-list.component.html',
  styleUrls: ['./change-ticket-type-list.component.sass']
})
export class ChangeTicketTypeListComponent implements OnInit {

  ticketList: any;
  viewticketData:any;
  total_tickets: any;
  open_tickets: any;
  total_inProgress: any;
  total_closed: any;
  showLoadingIndicatior: boolean;
  itemsPer_Page: number;
  current_Page: number;
  totalItems: number;
  searchText: any;
  total_length: any;
  ticketListtotaldata: string;

  constructor(private router : Router,private http: Http,public cmn:CommonComponent) {
   sessionStorage.setItem("from_Viewalltickets", "");
   sessionStorage.setItem("from_Changeticketowner", "");
   this.getTicketList();
   $('#noData').hide();
   setTimeout(function(){
      $('#noData').show();
   },5000)
  }

  ngOnInit() {
   // location.reload();
   // $(".page-loader-wrapper").show();
    'use strict';
    $(function () {
      initCounters();
      initCharts();
    });

    //Widgets count plugin
    function initCounters() {
      $('.count-to').countTo();
    }

    //Charts
    function initCharts() {
      //Chart Bar
      $('.chart.chart-bar').sparkline(undefined, {
        type: 'bar',
        barColor: '#fff',
        negBarColor: '#fff',
        barWidth: '4px',
        height: '45px'
      });

      //Chart Pie
      $('.chart.chart-pie').sparkline(undefined, {
        type: 'pie',
        height: '45px',
        sliceColors: ['rgba(255,255,255,0.70)', 'rgba(255,255,255,0.85)', 'rgba(255,255,255,0.95)', 'rgba(255,255,255,1)']
      });

      //Chart Line
      $('.chart.chart-line').sparkline(undefined, {
        type: 'line',
        width: '60px',
        height: '45px',
        lineColor: '#fff',
        lineWidth: 1.3,
        fillColor: 'rgba(0,0,0,0)',
        spotColor: 'rgba(255,255,255,0.40)',
        maxSpotColor: 'rgba(255,255,255,0.40)',
        minSpotColor: 'rgba(255,255,255,0.40)',
        spotRadius: 3,
        highlightSpotColor: '#fff'
      });
    }
  }
  ngAfterViewInit() {
   
    // this.getTicketList();
  }
//assigning color for status based on condition
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

  gotoTicketDetailspage(data){
    sessionStorage.setItem("common_for_flats", "changetickettype");
    sessionStorage.setItem("from_Changetickettype", "true");
    this.viewticketData=JSON.stringify(data);
    this.ticketListtotaldata = JSON.stringify(this.ticketList);
    this.router.navigate(["ticket/ticketdetails"],  {state: this.viewticketData});
    sessionStorage.setItem('ticketdetails_view',this.viewticketData);
    sessionStorage.setItem("Totalticketdata" , this.ticketListtotaldata);
    sessionStorage.setItem('buttonstutus','');
  
    sessionStorage.setItem("currentpageindex" , JSON.stringify(this.current_Page));
  }



 


  getTicketList(){
  $(".page-loader-wrapper").show();
  var url = this.cmn.commonUrl + "employeeTicket/getChangeTicketTypeTicketList.spring";;


      console.log("getChangeTicketTypeTicketList url :"+url);

        let headers = new Headers({
        'Content-Type': 'application/json' });
          let options = new RequestOptions({ headers: headers });
       
            var  body = {
              "requestUrl":"changeTicketType",
              "sessionKey":sessionStorage.getItem("login_sessionkey"),
              "pageNo":"1",
	            "pageSize":"10"
            }
        
            
      console.log("----getChangeTicketTypeTicketList body :"+JSON.stringify(body));
      this.http.post(url,body,options).map(res => res.json()).subscribe(resp =>{
        $(".page-loader-wrapper").hide();
        console.log("----getChangeTicketTypeTicketList resp :"+JSON.stringify(resp));
        if(resp.responseCode == 200){
          this.itemsPer_Page =resp.pageCount *10;
          this.current_Page =1;
          this.totalItems =10;
          this.total_tickets = resp.totalTickets;
          localStorage.setItem('totalTickets',this.total_tickets);
          this.open_tickets = resp.open;
          localStorage.setItem('openTickets',this.open_tickets);
          this.total_inProgress = resp.inProgress;
          this.total_closed = resp.closed;
          localStorage.setItem('Closed',this.total_closed);
          this.ticketList = resp.ticketResponseList;
          this.total_length = resp.ticketResponseList.length;
          // sessionStorage.setItem('getPageName', "viewmyticketspage");
        //  setTimeout(function(){
        //   $('#tableExport').DataTable();
        //  },1000)
        
        }else if(resp.responseCode == 440){
          swal("Error!", "Your session has been expired.", "error");
          this.router.navigate([""]);
        }else{
          $('.page-loader-wrapper').hide();
          swal(resp.errors[0]);
          return false;
        }
        
     },
       error => {
        $('.page-loader-wrapper').hide();
        console.log(error);
         var error=JSON.parse(error._body).responseCode;
         //alert(error);
       //  $('.page-loader-wrapper').hide();
         if(error == 440){
           swal("Your Session has been Timed Out!", "Please login once again.", "error");
           this.router.navigate([""]);
         }
       }
     );
  }
  public pageChanged(event:any):void {
    //this method will trigger every page click 
  
        console.log('Number items per page: ' + event);
        $(".page-loader-wrapper").show();
  var url = this.cmn.commonUrl + "employeeTicket/getMyTicketList.spring";;


      console.log("url :"+url);

        let headers = new Headers({
        'Content-Type': 'application/json' });
          let options = new RequestOptions({ headers: headers });
       
            var  body = {
              "sessionKey":""+sessionStorage.getItem("login_sessionkey"),
              "requestUrl":"getTickets/MyTickets",
              "pageNo":""+event,
	            "pageSize":"10"
            }
        
            
      console.log("----body :"+JSON.stringify(body));
      this.http.post(url,body,options).map(res => res.json()).subscribe(resp =>{
        $(".page-loader-wrapper").hide();
        console.log("----resp :"+JSON.stringify(resp));
        if(resp.responseCode == 200){
          this.itemsPer_Page =resp.pageCount *10;
          this.current_Page =event;
          this.totalItems =10;
          this.total_tickets = resp.totalTickets;
          localStorage.setItem('totalTickets',this.total_tickets);
          this.open_tickets = resp.open;
          localStorage.setItem('openTickets',this.open_tickets);
          this.total_inProgress = resp.inProgress;
          this.total_closed = resp.closed;
          localStorage.setItem('Closed',this.total_closed);
          this.ticketList = resp.ticketResponseList;
        //  setTimeout(function(){
        //   $('#tableExport').DataTable();
        //  },1000)
        
        }else if(resp.responseCode == 440){
          swal("Error!", "Your session has been expired.", "error");
          this.router.navigate([""]);
        } else {
          $('.page-loader-wrapper').hide();
          swal(resp.errors[0]);
          return false;
        }
        
     },
       error => {
        $('.page-loader-wrapper').hide();
        console.log(error);
         var error=JSON.parse(error._body).responseCode;
         //alert(error);
       //  $('.page-loader-wrapper').hide();
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

}
