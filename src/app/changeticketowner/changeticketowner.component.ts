import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router,NavigationExtras } from "@angular/router";
import { Http, RequestOptions, Headers } from '@angular/http';
import { HttpClient } from "@angular/common/http";
import { CommonComponent } from '../common/common.component';
import 'rxjs/add/operator/map'
import { DeviceDetectorService } from 'ngx-device-detector';
declare const $: any;
declare const swal: any
var mychcklist_ticketIdd = [];
var mychcklist_final_ticketIdd=[];
var self = this;
var temp_empDetailsId ;
var temp_departmentId;
var temp_employeeId;
@Component({
  selector: 'app-changeticketowner',
  templateUrl: './changeticketowner.component.html',
  styleUrls: ['./changeticketowner.component.sass']
})
export class ChangeticketownerComponent implements OnInit {

  ticketList: any;
  viewticketData:any;
  total_tickets: any;
  open_tickets: any;
  total_inProgress: any;
  total_closed: any;
  showLoadingIndicatior: boolean;
  deviceInfo: any;
  menu_array: any;
  new_tickets: any;
  total_replied: any;
  reOpen_tickets: any;
  itemsPer_Page : any;
  current_Page : any;
  totalItems : any;
  searchText: any;

  @Input() id: string;
@Input() maxSize: number;
@Output() pageChange: EventEmitter<number>;
  total_length: any;
  mychcklist_ticketId = [];
  constructor(private deviceService: DeviceDetectorService,private router : Router,private http: Http,public cmn:CommonComponent) {
   sessionStorage.setItem("from_Viewalltickets", "");
   sessionStorage.setItem("from_Changetickettype", "");

   this.getTicketList();
   this.menu_array = eval('('+sessionStorage.getItem('loginresponse')+')')
  //this.epicFunction();
  // this.departmentList();
  $('#noData').hide();
  setTimeout(function(){
     $('#noData').show();
  },5000)
  }
  
  
  epicFunction() {
    console.log('hello `Home` component');
    this.deviceInfo = this.deviceService.getDeviceInfo();
    console.log("------unique device no:"+this.deviceInfo);
   // alert("------unique device no:"+JSON.stringify(this.deviceInfo));
    console.log('hello `Home` component');
      this.deviceInfo = this.deviceService.getDeviceInfo();
      const isMobile = this.deviceService.isMobile();
      const isTablet = this.deviceService.isTablet();
      const isDesktopDevice = this.deviceService.isDesktop();
      console.log(this.deviceInfo);
      //alert(JSON.stringify(this.deviceInfo));
      console.log(isMobile);  // returns if the device is a mobile device (android / iPhone / windows-phone etc)
     // alert(isMobile);
      console.log(isTablet);  // returns if the device us a tablet (iPad etc)
      //alert(isTablet);
      console.log(isDesktopDevice); // returns if the app is running on a Desktop browser.
      //alert(isDesktopDevice);
  }
  // ngOnInit(): void {
  //   var self = this;
  //   $(function () {
  //     $('#sel').on('change', function () {
  //       //debugger;
  //       this.department_val = this.value;
  //       this.temp_dept = this.value.split(',')[1];
       

  //     });
  //   });
  // });

  ngOnInit() {
    'use strict';
    $(function () {
      initCounters();
      initCharts();
    });

   
    $(function () {
      $('#sel').on('change', function () {
        //debugger;
        this.department_val = this.value;
        console.log( this.department_val);
        temp_empDetailsId = this.value.split(',')[0];
        console.log("Temp_empDetailsId :"+temp_empDetailsId);
        temp_departmentId = this.value.split(',')[1];
        console.log("Temp_departmentId :"+temp_departmentId);
      temp_employeeId = this.value.split(',')[2];
        console.log("temp_employeeId :"+temp_employeeId);
      });
    })

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
    
    sessionStorage.setItem("common_for_flats", "changeticketowner");
   // sessionStorage.setItem("from_Viewalltickets", "true");
    sessionStorage.setItem("from_Changeticketowner", "true");
    this.viewticketData=JSON.stringify(data);
    this.router.navigate(["ticket/ticketdetails"],  {state: this.viewticketData});
    sessionStorage.setItem('ticketdetails_view',this.viewticketData);
    sessionStorage.setItem('buttonstutus','true');

  }

  getTicketList(){
$(".page-loader-wrapper").show();

    let url = this.cmn.commonUrl + "employeeTicket/getTicketList.spring";
   //  let url = "http://129.154.74.18:8888/employeeservice/employeeTicket/getTicketList.spring"
      console.log("url :"+url);
      
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
            var body = {
              // "employeeId":""+sessionStorage.getItem('session_empid'),
              // "siteId":"111",
              // "departmentId":""+sessionStorage.getItem('session_deptid'),

              "requestUrl":"getTickets/AllTickets",
              "sessionKey":""+sessionStorage.getItem("login_sessionkey"),
              "type" : "specific",
              "pageNo":"1",
	            "pageSize":"10"

            }
      console.log("----body :"+JSON.stringify(body));
      this.http.post(url,body,options).map(res => res.json()).subscribe(resp =>{
        console.log(JSON.stringify(resp));
        $(".page-loader-wrapper").hide();
     console.log(resp)
        if(resp.responseCode == 200){
          this.itemsPer_Page =resp.pageCount *10;
          this.current_Page =1;
          this.totalItems =10;
          this.total_tickets = resp.totalTickets;
          this.open_tickets = resp.open;
          this.reOpen_tickets = resp.reOpen;
          this.new_tickets = resp.newState;
          this.total_inProgress = resp.inProgress;
          this.total_closed = resp.closed;
          this.total_replied = resp.replied;
          this.ticketList = resp.ticketResponseList;
          this.total_length = resp.ticketResponseList.length;
          sessionStorage.setItem('getPageName', "viewAllTicketspage");
        //  setTimeout(function(){
        //   $('#tableExport').DataTable();
        //  },1000)
        
        }else if(resp.responseCode == 700){
          swal("Error!", "Your session has been expired.", "error");
          this.router.navigate(['']);
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
        $(".page-loader-wrapper").hide();
        swal("Error!", "Internal server error.", "error");
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
  public pageChanged(event:any):void {
    //this method will trigger every page click 
  
        console.log('Number items per page: ' + event);
        $(".page-loader-wrapper").show();

    let url = this.cmn.commonUrl + "employeeTicket/getTicketList.spring";
   //  let url = "http://129.154.74.18:8888/employeeservice/employeeTicket/getTicketList.spring"
      console.log("url :"+url);
      
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
            var body = {
              // "employeeId":""+sessionStorage.getItem('session_empid'),
              // "siteId":"111",
              // "departmentId":""+sessionStorage.getItem('session_deptid'),

              "requestUrl":"getTickets/AllTickets",
              "sessionKey":""+sessionStorage.getItem("login_sessionkey"),
              "type" : "specific",
              "pageNo":event,
	            "pageSize":"10"

            }
      console.log("----body :"+JSON.stringify(body));
      this.http.post(url,body,options).map(res => res.json()).subscribe(resp =>{
        $(".page-loader-wrapper").hide();
     console.log(resp)
        if(resp.responseCode == 200){
          this.itemsPer_Page =resp.pageCount *10;
          this.current_Page =event;
          this.totalItems =10;
          this.total_tickets = resp.totalTickets;
          this.open_tickets = resp.open;
          this.reOpen_tickets = resp.reOpen;
          this.new_tickets = resp.newState;
          this.total_inProgress = resp.inProgress;
          this.total_closed = resp.closed;
          this.total_replied = resp.replied;
          this.ticketList = resp.ticketResponseList;

        //  setTimeout(function(){
        //   $('#tableExport').DataTable();
        //  },1000)
        
        }else if(resp.responseCode == 700){
          swal("Error!", "Your session has been expired.", "error");
          this.router.navigate(['']);
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
        $(".page-loader-wrapper").hide();
        swal("Error!", "Internal server error.", "error");
        var error=JSON.parse(error._body).responseCode;
        //alert(error);
        $('.page-loader-wrapper').hide();
        if(error == 440){
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
       }
     );
      };

      homeClick(){
        this.cmn.commonHomeNavigation();
      }
 /*------------------------change owner list start-----------------------------------*/
 departmentList() {
  $('#loader1').show();
  let url = this.cmn.commonUrl + "employeeTicket/changeTicketOwnerDropDown.spring";
  // http://localhost:8181/SumadhuraGateway/employeeservice/employeeTicket/changeTicketOwnerDropDown.spring
  console.log("url :" + url);

  let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers });
  var body = {
    // "employeeId":""+sessionStorage.getItem('session_empid')
    "ticketIds":mychcklist_ticketIdd,
    "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
  }
  console.log("----body :" + JSON.stringify(body));
  this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
    $('#loader1').hide();
    console.log("Department list response----------" + JSON.stringify(resp));
    if (resp.responseCode == 200) {
      /* basic select start*/
      $('select').formSelect();
      $('#sel').formSelect();
      //var data = [{ id: 0, name: "--Select--" },{ id: 1, name: "CRM Department" }, { id: 2, name: "Purchase Department" }, { id: 3, name: "QS Department" }];
      // debugger;
     // var Options = "";$('#sel').append();
      if(resp.employeeDetailsList.length==0){
      // alert("empty")
        $('#sel').html('<option value="select">--Select--</option>');
        $('#sel').formSelect();
      }
      $('#sel').html('<option value="select">--Select--</option>');
      $.each(resp.employeeDetailsList, function (i, val) {
        //alert("test"+i);
        $('#sel').append("<option value='" + val.empDetailsId + "," + val.departmentId + ","+ val.employeeId + "'>" + val.employeeName + "</option>");
         $('#sel').formSelect();
        // $("#sel").val('select');
      });
      mychcklist_ticketIdd = [];
      /* basic select end*/
    }else if(resp.responseCode ==440){
      swal("Your Session has been Timed Out!", "Please login once again.", "error");
      this.router.navigate([""]);
    }else {
      $('.page-loader-wrapper').hide();
      swal(resp.errors[0]);
      return false;
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
/*------------------------change owner list end-----------------------------------*/

ChangeTicketOwner(){

  $.each($(".checlist:checked"), function(){ 
    debugger;
        console.log($(this).is(":checked"));
        if($(this).is(":checked") == true){
          console.log($(this).val());
         // var myticketid = $(this).val();
         mychcklist_ticketIdd.push($(this).val());
         mychcklist_final_ticketIdd.push($(this).val());
         
        }
     console.log("ticket ids :"+mychcklist_ticketIdd);
      });
     
    if(mychcklist_ticketIdd.length == 0){
      alert("Please select atleast one ticket");
      return false;
    }else{
      mychcklist_ticketIdd = [];
      mychcklist_final_ticketIdd = [];
      $("#changeticketinfo").modal();
    }
       
      //$("#changeticketinfo").show();

      $.each($(".checlist:checked"), function(){ 
    debugger;

        console.log($(this).is(":checked"));
        if($(this).is(":checked") == true){
          console.log($(this).val());
         // var myticketid = $(this).val();
         mychcklist_ticketIdd.push($(this).val());
         mychcklist_final_ticketIdd.push($(this).val());
        }
          console.log("ticket ids :"+mychcklist_ticketIdd);
      });

      this.departmentList();

  }


      change_ticket_owner_modal_Data(){
        
        if($("#sel").val() == "select"){
          alert("Please select ticket owner");
          return false;
        }
        $('.page-loader-wrapper').show();
        let url = this.cmn.commonUrl + "employeeTicket/changeTicketOwner.spring";
    //  http://localhost:8181/SumadhuraGateway/employeeservice/employeeTicket/changeTicketOwner.spring
    console.log("url :" + url);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = 

    {
      "sessionKey":"" +sessionStorage.getItem("login_sessionkey"),
      "empDetailsId": ""+temp_empDetailsId,
       "departmentId": ""+temp_departmentId,
        "employeeId": ""+temp_employeeId,
        "ticketIds" :mychcklist_final_ticketIdd
      }
      
    console.log("----final ticket owner change submission body :" + JSON.stringify(body));
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      console.log("make as public response----------" + JSON.stringify(resp));
      if (resp.responseCode == 200) {
        console.log("Ticket owner changed successfully");
        $('.page-loader-wrapper').hide();
        $(".modal").modal('hide');
        this.getTicketList();
       // this.router.navigate(["changeticketowner"]);
      }else if (resp.responseCode == 600) {
        $('.page-loader-wrapper').hide();
        swal(""+resp.errors);
        $(".modal").modal('hide');
      } else if (resp.responseCode == 440) {
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
}
