import { NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { CommonComponent } from '../common/common.component';

declare const $: any;
declare const swal: any;

@Component({
  selector: 'app-companey-view-notification-details',
  templateUrl: './companey-view-notification-details.component.html',
  styleUrls: ['./companey-view-notification-details.component.sass']
})
export class CompaneyViewNotificationDetailsComponent implements OnInit {

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
  title_name: string;
  title_name1: string;

  constructor(private formBuilder: FormBuilder, private cmn: CommonComponent, private http: Http, private router: Router,) {
    this.projectId = sessionStorage.getItem("projId");

    this.view_report_details()
  }

  ngOnInit() {

     this.title_name = sessionStorage.getItem("Title_name");
     this.title_name1 = sessionStorage.getItem("Title_name1")
  }
  view_report_details() {
    $('.page-loader-wrapper').show();
    $('#tableExport').DataTable().destroy();


    $('.page-loader-wrapper').show();

    let url = this.cmn.commonUrl + "notification/getCompanyNotificationViewReport.spring"
    //http://106.51.38.64:8888/SumadhuraGateway/employeeservice/notification/getCompanyNotificationViewReport.spring
  
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": sessionStorage.getItem("login_sessionkey"),
      "id": this.projectId,
    }

    console.log(JSON.stringify(body));
   
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      console.log(resp);
      if (resp.responseCode == 200) {
        this.viewDetails = [];
        $('.page-loader-wrapper').hide();
        this.viewDetails = resp.responseObjList[0].companyNotificationViewDetails;
        this.project_name = resp.responseObjList[0].siteName;
        this.notification_title = resp.responseObjList[0].message;
        this.notification_text = resp.responseObjList[0].notificationText;
        this.notification_description = resp.responseObjList[0].description;
        this.notification_type = resp.responseObjList[0].notificationType;
        this.target_count = resp.responseObjList[0].numOfFlatsToBeSent;
        this.received_count = resp.responseObjList[0].recievedCount;
        this.view_count = resp.responseObjList[0].viewCount;
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

  notification_list(data) {
    if(data == "View Customer Notifications"){
      this.router.navigate(['company-notificationlist']);
    }

    if(data == "View Non-Customer Notifications"){
      this.router.navigate(['View-Non-Customer-Notifications']);
    }

    if(data == "View All Notifications"){
      this.router.navigate(['View-All-Company-Notifications']);
    }

  }


  notification_list1(data , data1){
    console.log(data);
    console.log(data1);

  
    if(data == "View Customer Notifications" && data1 == "View Notification Details"){
      this.router.navigate(['viewand-approve-notifications']);
    }

    if(data == "View Non-Customer Notifications" && data1 == "View Notification Details"){
      this.router.navigate(['View-Non-Customer-Notifications/Notification-Details']);
    }

    if(data == "View All Notifications" && data1 == "View Notification Details"){
      this.router.navigate(['View-All-Notification-Details']);
    }
  }
}