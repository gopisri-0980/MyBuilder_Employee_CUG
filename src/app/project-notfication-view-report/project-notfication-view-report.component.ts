import { NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { CommonComponent } from '../common/common.component';

declare const $: any;
declare const swal: any;

@Component({
  selector: 'app-project-notfication-view-report',
  templateUrl: './project-notfication-view-report.component.html',
  styleUrls: ['./project-notfication-view-report.component.sass']
})
export class ProjectNotficationViewReportComponent implements OnInit {
  projectId: string;
  viewDetails: any = [];
  project_name: any;
  notification_title: any;
  notification_text: any;
  notification_description: any;
  notification_type: any;
  target_count: any;
  view_count: any;
  received_count: any;

  constructor(private formBuilder: FormBuilder,private cmn: CommonComponent, private http: Http, private router: Router,) {
  this.projectId = sessionStorage.getItem("projId");
  
      this.view_report_details()
   }

  ngOnInit() {
  }
  view_report_details() {
    $('.page-loader-wrapper').show();
    $('#tableExport').DataTable().destroy();
   

    $('.page-loader-wrapper').show();
 
    let url = this.cmn.commonUrl + "notification/getNotificationViewReport.spring"
//http://localhost:9999/SumadhuraGateway/employeeservice/notification/getNotificationViewReport.spring
    console.log("url :" + url);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {

      "sessionKey": sessionStorage.getItem("login_sessionkey"),
      "id": this.projectId,
      
    }
    console.log("view report request :" + JSON.stringify(body))
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      console.log("View report details:" + JSON.stringify(resp))
      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
       this.viewDetails = resp.responseObjList.notificationViewDetails;
       this.project_name = resp.responseObjList.siteName;
       this.notification_title = resp.responseObjList.message;
       this.notification_text = resp.responseObjList.notificationText;
       this.notification_description = resp.responseObjList.description;
       this.notification_type = resp.responseObjList.notificationType;
       this.target_count = resp.responseObjList.numOfFlatsToBeSent;
       this.received_count = resp.responseObjList.recievedCount;
       this.view_count = resp.responseObjList.viewCount;
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
              "scrollY": true,
              "scrollCollapse": true,
              "scrollX": true,
              "autoWidth": false,
              "iCookieDuration": 60,

            }).draw();
           
          });

        }, 2000)

      
      } else if (resp.responseCode == 440) {
        $('.page-loader-wrapper').hide();
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
      }
    },
      error => {
        $('.page-loader-wrapper').hide();
        var error = JSON.parse(error._body).responseCode;
        $('.page-loader-wrapper').hide();
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }

  
  homeClick() {
    this.cmn.commonHomeNavigation();
  }

  notification_list(){
    this.router.navigate(['project-notification-list']);
  
}
}
