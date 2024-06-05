import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { CommonComponent } from '../common/common.component';
declare const $: any;
declare const swal: any;

@Component({
  selector: 'app-table-five-escalation-tickets',
  templateUrl: './table-five-escalation-tickets.component.html',
  styleUrls: ['./table-five-escalation-tickets.component.sass']
})
export class TableFiveEscalationTicketsComponent implements OnInit {
  allSiteIds: any = [];
  getTicketsData: any = [];
  totalTicketResponse: any;
  json_response_EscalationTickets: any;
  escalationTicketCountTableData: any = [];
  itemsPer_Page: number;
  current_Page: number;
  totalItems: number;
  allTicketTypeIds: any = [];
  allLevelIds: any = [];
  table5TotalTicketResponse: any;
  uniqueAllSiteIdArray: any = [];
  uniqueAllTktTypeIdArray: any = [];
  uniqueAllLevelIdArray: any = [];
  totalnumberoftickets: any;
  preloader: boolean;


  constructor(private cmn: CommonComponent, private http: Http, private router: Router) {
    
    $('.page-loader-wrapper').hide();
  
    

   this.preloader = false;
    this.json_response_EscalationTickets = eval('(' + sessionStorage.getItem('getEscalationTicketsDetailsCount') + ')');
    console.log(this.json_response_EscalationTickets);
    this.escalationTicketCountTableData = this.json_response_EscalationTickets.ticketReportingResponces[0].ticketEscalationLevelEmployeeDetails;


    console.log(JSON.stringify(this.escalationTicketCountTableData));

    this.totalnumberoftickets = this.json_response_EscalationTickets.ticketReportingResponces[0].noOfTickets;
    console.log(this.totalnumberoftickets);
    setTimeout(function () {
      $(document).ready(function () {
        $('#Escalationtable').DataTable({
          pageLength: 10,
          lengthMenu: [[10, 20, -1], [10, 20, 'Todos']],
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

    for (let item of this.escalationTicketCountTableData) {
      this.allSiteIds.push(item.siteId);
      this.allTicketTypeIds.push(item.ticketTypeId);
      this.allLevelIds.push(item.escalationLevel);
    }
    this.uniqueAllSiteIdArray = Array.from(new Set(this.allSiteIds));
    this.uniqueAllTktTypeIdArray = Array.from(new Set(this.allTicketTypeIds));
    this.uniqueAllLevelIdArray = Array.from(new Set(this.allLevelIds));

  }

  ngOnInit() {
  }

  getSiteTickettypeLevelWiseEscalationDetails(siteid, levelid, ticketTypeId , employeeid) {

if(employeeid[0] == null){
  employeeid = null;
}

   this.preloader = true;
    let url = this.cmn.commonUrl + "ticketreport/getSiteTickettypeLevelWiseEscalationDetails.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "startDate": this.json_response_EscalationTickets.startDate,
      "endDate": this.json_response_EscalationTickets.endDate,
      "ticketTypeIds": ticketTypeId,
      "levelIds": levelid,
      "siteIds": siteid,
      "empIds" :employeeid,
    }

    console.log(body);

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      console.log(resp);
     this.preloader = false;
      if (resp.responseCode == 200) {
        this.table5TotalTicketResponse = resp;
        this.getTicketsData = resp.ticketReportingResponces[0].ticketReportingPojos;
        if (this.getTicketsData.length == 0) {
          swal("No tickets available");
        } else {
          sessionStorage.setItem('totalTicketResponse', JSON.stringify(this.table5TotalTicketResponse));
          sessionStorage.setItem('totalTicketResponseTwo', "");
          sessionStorage.setItem('navigatingFrom', 'escalationTickets');
          this.router.navigate(["Ticketing-Dashboard/View-Tickets"]);
        }
      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
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

  dashtitle(){
    this.router.navigateByUrl("ProjectWise_Escalation_Report");
  }

  homeclick() {
    this.router.navigateByUrl("ticket/viewticket");
  }

}
