import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { CommonComponent } from '../common/common.component';
declare const $: any;
declare const swal: any;

@Component({
  selector: 'app-table-one-project-wise-tkt-count',
  templateUrl: './table-one-project-wise-tkt-count.component.html',
  styleUrls: ['./table-one-project-wise-tkt-count.component.sass']
})
export class TableOneProjectWiseTktCountComponent implements OnInit {
  json_response_projectWIse: any;
  sumOfTotal: any = 0;
  sumOfNew: any = 0;
  sumOfOpen: any = 0;
  sumOfInprogress: any = 0;
  sumOfReopen: any = 0;
  sumOfClose: any = 0;
  projectWiseTicketCountTableData: any = [];
  allSiteIds: any = [];
  getTicketsData: any = [];
  totalTicketResponse: any;
  preloader: boolean;

  constructor(private cmn: CommonComponent, private http: Http, private router: Router) { 


  


    $('.page-loader-wrapper').hide();
    this.preloader = false;
    this.json_response_projectWIse = eval('('+sessionStorage.getItem('getProjectWiseTicketCountResponse')+')');
    this.projectWiseTicketCountTableData = this.json_response_projectWIse.ticketReportingResponces[0].projectwiseTicketCount;
    for(let item of this.projectWiseTicketCountTableData){
      this.sumOfTotal += item.totalTickets;
      this.sumOfNew += item.newT;
      this.sumOfOpen += item.openT; 
      this.sumOfInprogress += item.inprogressT; 
      this.sumOfReopen += item.reopenT; 
      this.sumOfClose += item.closedT;
      this.allSiteIds.push(item.siteId); 
    }




  setTimeout(function () {
    $(document).ready(function () {
      $('#Projectwiseticketcounting').DataTable({
        pageLength: 10,
        lengthMenu: [[ 10, 20, -1], [ 10, 20, 'Todos']],
        dom: 'Bfrltip',
        buttons: [
          'copy', 'csv', 'excel', 'print', {
            extend: 'pdfHtml5',
            orientation: 'landscape',
            pageSize: 'LEGAL'
          }
        ],

        retrieve: true,

      });
    });


  }, 2000)

  }

  ngOnInit() {
  }

  getTicketingDashBoardDetails(siteid,ticketStatusIds){
     this.preloader = true;
      let url = this.cmn.commonUrl + "ticketreport/getTicketingDashBoardDetails.spring";
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers }); 
      var body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "startDate":this.json_response_projectWIse.startDate,
        "endDate":this.json_response_projectWIse.endDate,
        "siteIds":siteid,
        "ticketStatusIds":ticketStatusIds,
        "flag":"false"
      }
      this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
        console.log(resp);
       this.preloader = false;
      if(resp.responseCode == 200){
        this.totalTicketResponse = resp;
        this.getTicketsData = resp.ticketReportingResponces[0].ticketReportingPojos;
        console.log( this.getTicketsData);
        if(this.getTicketsData.length == 0){
          swal("No tickets available");
        }else{
          sessionStorage.setItem('totalTicketResponse',JSON.stringify(this.totalTicketResponse));
          sessionStorage.setItem('totalTicketResponseTwo',"");
          sessionStorage.setItem('navigatingFrom','projectWiseTktCount');
          this.router.navigate(["Ticketing-Dashboard/View-Tickets"]);
        }
      }else if(resp.responseCode ==440){
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      }else{
      swal(resp.errors[0]);
      }
      },
        error => {
          var error = JSON.parse(error._body).responseCode;
         this.preloader = false;
          if (error == 440) {
            swal("Your Session has been Timed Out!", "Please login once again.", "error");
            this.router.navigate([""]);
          }
        }
      );
  }

  homeClick(){
    this.router.navigateByUrl("ticket/viewticket");
  }

  dashtitle(){
    this.router.navigateByUrl("Ticketing-Dashboard");
  }
}
