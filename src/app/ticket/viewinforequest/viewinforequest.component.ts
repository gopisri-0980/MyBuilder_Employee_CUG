import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Http, RequestOptions, Headers } from '@angular/http';
import { CommonComponent } from 'src/app/common/common.component';
declare const $: any;
declare const swal:any;
@Component({
  selector: 'app-viewinforequest',
  templateUrl: './viewinforequest.component.html',
  styleUrls: ['./viewinforequest.component.sass']
})
export class ViewinforequestComponent implements OnInit {
  ticketList:any;
  viewticketData:any;
  itemsPer_Page: number;
  current_Page: number;
  totalItems: number;
  searchText: any;
  total_Tickets: any;
  total_length: any;
  constructor(private router : Router,private http: Http,public cmn:CommonComponent) {
    this.view_requestInfo_tableList();
    $(function () {
      $("#tableSelect").select2({
        minimumResultsForSearch: Infinity
        // placeholder: "Search Device",
        // dir: "ltl"
      });
    });
    
    $('#noData').hide();
    setTimeout(function(){
       $('#noData').show();
    },5000)

   }

   

  ngOnInit() {
  }
  ngAfterViewInit() {
   // $('#tableExport').DataTable();
    this.view_requestInfo_tableList();
    $('#tableSelect').on('change', (event) => {debugger;
      if($("#tableSelect").val() == "select" ){
        return false;
      }
      var symbolSelected= event.target.value;
      //you can use the selected value
      $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "employeeTicket/viewRequestInfo.spring";
    //http://localhost:8080/employeeservice/employeeTicket/viewRequestInfo.spring
       console.log("url :"+url);
         let headers = new Headers({ 'Content-Type': 'application/json' });
             let options = new RequestOptions({ headers: headers });
             var body;
             if($("#tableSelect").val() == "All" ){
               
               body = {
                      "ticketId":"1",
                      "requestUrl":"viewRequestInfo.spring",
                      "sessionKey":""+sessionStorage.getItem("login_sessionkey"),
                 }
            }else{
             body = {
                    "ticketId":"1",
                    "requestUrl":"viewRequestInfo.spring",
                    "sessionKey":""+sessionStorage.getItem("login_sessionkey"),
                    "pageSize":""+$('#tableSelect').val()
                 }
            }
             
       console.log("----body :"+JSON.stringify(body));
       this.http.post(url,body,options).map(res => res.json()).subscribe(resp =>{
         $('.page-loader-wrapper').hide();
      console.log("Seek Info response----------"+JSON.stringify(resp));
         if(resp.responseCode == 200){
          this.itemsPer_Page =resp.pageCount *10;
       
          this.ticketList = resp.ticketResponseList;

       
          this.current_Page =1;
          this.totalItems =$('#tableSelect').val();
           // swal("Good job!", "Ticket has been Updated.", "success");
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
          // alert(_body.JSON.parse(responseCode));
          var error=JSON.parse(error._body).responseCode;
          //alert(error);
          $('.page-loader-wrapper').hide();
          if(error == 440){
            swal("Your Session has been Timed Out!", "Please login once again.", "error");
            this.router.navigate([""]);
          }
        }
      );
  });
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


  gotoViewTicketInfoRequestDetailspage(data){
    sessionStorage.setItem("common_for_flats", "view_info_request");
    this.viewticketData=JSON.stringify(data);
    this.router.navigate(["ticket/viewinforequestdetails"],  {state: this.viewticketData});
    sessionStorage.setItem('viewtickeinfo',this.viewticketData);
  }

  /*--------------------------View Request Info Table List Start----------------------*/
  view_requestInfo_tableList(){
    $('.page-loader-wrapper').show();
let url = this.cmn.commonUrl + "employeeTicket/viewRequestInfo.spring";
//http://localhost:8080/employeeservice/employeeTicket/viewRequestInfo.spring
   console.log("url :"+url);
     let headers = new Headers({ 'Content-Type': 'application/json' });
         let options = new RequestOptions({ headers: headers });
         var body = {
          "ticketId":"1",
         // "fromId":""+sessionStorage.getItem('session_empid'),
         // "fromType":"8",
         // "fromDeptId":""+sessionStorage.getItem('session_deptid'),
          "requestUrl":"viewRequestInfo.spring",
          "sessionKey":""+sessionStorage.getItem("login_sessionkey"),
          "pageNo":"1",
	        "pageSize":"10"
           }
   console.log("----body :"+JSON.stringify(body));
   this.http.post(url,body,options).map(res => res.json()).subscribe(resp =>{
     $('.page-loader-wrapper').hide();
  console.log("Seek Info response----------"+JSON.stringify(resp));
     if(resp.responseCode == 200){
  
      this.ticketList = resp.ticketResponseList;
      this.itemsPer_Page =resp.pageCount *10;
     // alert(this.itemsPer_Page);
      this.current_Page =1;
      this.totalItems =10;
      this.total_length = resp.ticketResponseList.length;
      //alert(this.total_length);
       // swal("Good job!", "Ticket has been Updated.", "success");
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
      // alert(_body.JSON.parse(responseCode));
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
/*--------------------------View Request Info Table List End----------------------*/
public pageChanged(event:any):void {
  //this method will trigger every page click 

      console.log('Number items per page: ' + event);
      $('.page-loader-wrapper').show();
      let url = this.cmn.commonUrl + "employeeTicket/viewRequestInfo.spring";
      //http://localhost:8080/employeeservice/employeeTicket/viewRequestInfo.spring
         console.log("url :"+url);
           let headers = new Headers({ 'Content-Type': 'application/json' });
               let options = new RequestOptions({ headers: headers });
               var body = {
                "ticketId":"1",
               // "fromId":""+sessionStorage.getItem('session_empid'),
               // "fromType":"8",
               // "fromDeptId":""+sessionStorage.getItem('session_deptid'),
                "requestUrl":"viewRequestInfo.spring",
                "sessionKey":""+sessionStorage.getItem("login_sessionkey"),
                "pageNo":+event,
                "pageSize":"10"
                 }
         console.log("----body :"+JSON.stringify(body));
         this.http.post(url,body,options).map(res => res.json()).subscribe(resp =>{
           $('.page-loader-wrapper').hide();
        console.log("Seek Info response----------"+JSON.stringify(resp));
           if(resp.responseCode == 200){
            this.ticketList = resp.ticketResponseList;
            this.itemsPer_Page =resp.pageCount *10;
            this.current_Page =event;
            this.totalItems =10;
             // swal("Good job!", "Ticket has been Updated.", "success");
           }else if(resp.responseCode ==440){
            swal("Your Session has been Timed Out!", "Please login once again.", "error");
            this.router.navigate([""]);
          } else {
            $('.page-loader-wrapper').hide();
            swal(resp.errors[0]);
            return false;
          }
           setTimeout(function(){
            $('#tableExport').DataTable();
           },1000);
        },
          error => {
            console.log(error);
            // alert(_body.JSON.parse(responseCode));
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

homeClick(){
  this.cmn.commonHomeNavigation();
}

}
