import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Http, RequestOptions, Headers } from '@angular/http';
import { CommonComponent } from 'src/app/common/common.component';
import { DeviceDetectorService } from 'ngx-device-detector';
import { LeaveUpdateComponent } from '../leave-update/leave-update.component';
declare const $: any;
declare const swal: any
@Component({
  selector: 'app-approve-escalation',
  templateUrl: './approve-escalation.component.html',
  styleUrls: ['./approve-escalation.component.sass']
})
export class ApproveEscalationComponent implements OnInit {
  tabledata: any;
  //tabledata: { "ticketno": string; "current_date": string; "request_date": string; }[];

  constructor(private _router: Router, private deviceService: DeviceDetectorService, public route: ActivatedRoute, private router: Router, private http: Http, public cmn: CommonComponent) {
    $('.page-loader-wrapper').hide();
    this.aproveEscalation_list();
    // $('#noData').hide();
    // setTimeout(function(){
    //    $('#noData').show();
    // },5000)
  }

  aproveEscalation_list() {

    $(".page-loader-wrapper").show();


    let url = this.cmn.commonUrl + "employeeTicket/getExtendEsacalationTimeDetails.spring";
    //  let url = "http://129.154.74.18:8888/employeeservice/employeeTicket/getExtendEsacalationTimeDetails.spring"
 

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      // "employeeId":""+sessionStorage.getItem('session_empid'),
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey")
    }

    console.log(url);
    console.log(JSON.stringify(body));
   
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $(".page-loader-wrapper").hide();

      console.log(JSON.stringify(resp));
     

      if (resp.responseCode == 200) {
        this.tabledata = resp.escalationApprovals;
      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);

      } else {
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
      }

      setTimeout(function () {
        $(document).ready(function () {
          $('#tableExport').DataTable({
            pageLength: 5,
            lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todos']],
            dom: 'Bfrltip',
            buttons: [
              'copy', 'csv', 'excel', 'print', {
                extend: 'pdfHtml5',
                orientation: 'landscape',
                pageSize: 'LEGAL'
              }
            ],


            retrieve: true,
            "scrollY": false,
            "scrollCollapse": true,
            "scrollX": true,
            "autoWidth": false,
            "iCookieDuration": 60,
            "bStateSave": true,

            "fnStateSave": function (oSettings, oData) {
              localStorage.setItem('offersDataTables', JSON.stringify(oData));
            },
            "fnStateLoad": function (oSettings) {
              return JSON.parse(localStorage.getItem('offersDataTables'));
            },



          });

        });
      }, 2000)

      
    },
      error => {
        $(".page-loader-wrapper").hide();
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

  ngOnInit() {
  }

  ngAfterViewInit() {

    $('.js-basic-example').DataTable({
      responsive: true
    });

    $('.save-stage').DataTable({
      "scrollX": true,
      stateSave: true
    });

    var t = $('#example3').DataTable({
      "scrollX": true
    });
    var counter = 1;

  }
  ticketId(esc_time_response) {
    // alert(JSON.stringify(esc_time_response.id));
    sessionStorage.setItem("common_for_flats", "approve_escalation_ticket");
    sessionStorage.setItem('esctimeresponse', JSON.stringify(esc_time_response.ticketId));
    sessionStorage.setItem('escaltioncomment', JSON.stringify(esc_time_response.comments));
    sessionStorage.setItem('escaltionId', JSON.stringify(esc_time_response.id));
    sessionStorage.setItem('escaltion_escalationApprovals', JSON.stringify(esc_time_response));
    this.router.navigate(['approve-escalation-details']);
  }

  homeClick() {
    this.cmn.commonHomeNavigation();
  }


}
