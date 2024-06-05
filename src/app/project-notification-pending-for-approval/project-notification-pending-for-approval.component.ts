import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { RequestOptions, Headers, Http } from '@angular/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/product.service';


declare const swal: any;

declare const $: any;
var controller_data = [];
@Component({
  selector: 'app-project-notification-pending-for-approval',
  templateUrl: './project-notification-pending-for-approval.component.html',
  styleUrls: ['./project-notification-pending-for-approval.component.sass']
})
export class ProjectNotificationPendingForApprovalComponent implements OnInit {

  mybookingform: boolean;
  MrMrsMs: any;
  inputText: string;
  showLoadingIndicatior: boolean;
  genderInfo: string;
  itemsPer_Page: number;
  current_Page: number;
  totalItems: number;
  searchText: any;
  tabledata: any;
  project_count: number;
  constructor(private router: Router, private cmn: CommonComponent, private http: Http , private productService: ProductService,) {
    this.inputText = "I am sample text";
    this.mybookingform = true;
    this.MrMrsMs = "Mr";
    this.genderInfo = "no";
    this.siteList_temp()
    $('.page-loader-wrapper').hide();
    
     this.projectNotificationList() 
    $('#noData').hide();
    setTimeout(function () {
      $('#noData').show();
    }, 5000)
  }

  ngOnInit() {

  }


  leadId(res) {
    //alert("---"+JSON.stringify(res));
    //alert(sessionStorage.setItem('response',JSON.stringify(res)))
    sessionStorage.setItem('response', JSON.stringify(res));
    this.router.navigate(['project-notification-pending-for-approval-view']);


  }

  ngAfterViewInit() {
    this.projectNotificationList();
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
  projectNotificationList() {
    debugger;
    $('.page-loader-wrapper').show();

    let url = this.cmn.commonUrl + "notification/viewModifiedProjectNotificationsForApprovals.spring";
    //http://localhost:8181/SumadhuraGateway/employeeservice/notification/viewModifiedProjectNotificationsForApprovals.spring
    console.log("url :" + url);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "osType": "Android",
      // "pageNo":"1",
      // "pageSize":"10",
      "action": "Approval Level",
      "notificationType": "Project"

    }
    /// console.log("----body :"+JSON.stringify(body));
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      console.log("Project notifications list response----------" + JSON.stringify(resp));
      if (resp.responseCode == 200) {

        this.tabledata = [];

        this.itemsPer_Page = resp.responseObjList.pagecount * 10;
        this.current_Page = 1;
        this.totalItems = 10;
        this.tabledata = resp.responseObjList.notificationApprovalResponse;



        setTimeout(function () {
          $(document).ready(function () {
            $('#tableExport').DataTable({
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
              "footerCallback": function (row, data, start, end, display) {
                controller_data = [];
                for (var j = 0; j < display.length; j++) {
                  controller_data.push(resp.responseObjList.notificationApprovalResponse[display[j]]);
                }
              },
            })

          });

        }, 1000)

        this.productService.project_sendNumber(this.project_increament());


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
        //  var error=JSON.parse(error._body).responseCode;
        //alert(error);
        $('.page-loader-wrapper').hide();
        // if(error == 440){
        //   swal("Your Session has been Timed Out!", "Please login once again.", "error");
        //   this.router.navigate([""]);
        // }
      }
    );
  }


  project_increament() {
    this.project_count = this.tabledata.length;
 
    return this.project_count;
  }


  
  public pageChanged(event: any): void {
    //this method will trigger every page click 
    console.log('Number items per page: ' + event);

    debugger;
    $('.page-loader-wrapper').show();

    let url = this.cmn.commonUrl + "notification/viewModifiedProjectNotificationsForApprovals.spring";
    console.log("url :" + url);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "osType": "Android",
      "pageNo": "" + event,
      "pageSize": "10",
      "action": "Approval Level",
      "notificationType": "Project"
    }
    /// console.log("----body :"+JSON.stringify(body));
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      console.log("Project notifications list response----------" + JSON.stringify(resp));
      if (resp.responseCode == 200) {
        this.itemsPer_Page = resp.responseObjList.pagecount * 10;
        this.current_Page = event;
        this.totalItems = 10;
        this.tabledata = resp.responseObjList.siteLevelNotifyResponseDto;
        //   setTimeout(function(){
        //     //$('#tableExport').DataTable();
        //     $('#tableExport').dataTable();
        //    },1000)
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
        //  var error=JSON.parse(error._body).responseCode;
        //alert(error);
        $('.page-loader-wrapper').hide();
        // if(error == 440){
        //   swal("Your Session has been Timed Out!", "Please login once again.", "error");
        //   this.router.navigate([""]);
        // }
      }
    );
  }

  homeClick() {
    this.cmn.commonHomeNavigation();
  }
  siteList_temp() {
    var arr = localStorage.getItem('SiteIDS');
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "site/site.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": sessionStorage.getItem("login_sessionkey"),
      "siteIds": [107],
    }
console.log(JSON.stringify(body))
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
     
      
      if (resp.responseCode == 200) {
        $(function(){
          setTimeout(function(){
            $('.page-loader-wrapper').hide();
          },5000)
        })
        
        $('#projectID').html("");
        $('#projectID').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#projectID').append("<option value='" + resp.responseObjList[i].id + "'>" + resp.responseObjList[i].name + "</option>");
        }

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
        $('.page-loader-wrapper').hide();
        var error = JSON.parse(error._body).responseCode;
        this.router.navigate([""]);
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }
}
