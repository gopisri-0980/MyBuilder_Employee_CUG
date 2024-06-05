import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { RequestOptions,Headers,Http } from '@angular/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
declare const swal: any;

declare const $: any;

@Component({
  selector: 'app-company-notifications-modifications',
  templateUrl: './company-notifications-modifications.component.html',
  styleUrls: ['./company-notifications-modifications.component.sass']
})
export class CompanyNotificationsModificationsComponent implements OnInit {

  // tabledata: { "NotificationId": string; "applicantName": string; "project": string;"block": string;"cdate": string; }[];
  mybookingform :boolean;
  MrMrsMs: any;
  inputText :string;
  showLoadingIndicatior: boolean;
  genderInfo: string;
  itemsPer_Page: number;
  current_Page: number;
  totalItems: number;
  searchText: any;
  tabledata: any;
  isButtonClicked: string;
  constructor(private router:Router,private cmn:CommonComponent, private http:Http) { 
    this.inputText  = "I am sample text";
    this.mybookingform = true;
    this.MrMrsMs = "Mr";
    this.genderInfo = "no";
    $('.page-loader-wrapper').hide();
   // this.projectNotificationList() 
   $('#noData').hide();
   setTimeout(function(){
      $('#noData').show();
   },5000)
  }

  ngOnInit() {
     
  }


  leadId(res){
    //alert("---"+JSON.stringify(res));
    //alert(sessionStorage.setItem('response',JSON.stringify(res)))
    sessionStorage.setItem('response',JSON.stringify(res));
    this.router.navigate(['modify-company-notifications']);
    
 
   }

  ngAfterViewInit() {

    this.isButtonClicked =  sessionStorage.getItem('isBackButtonClickedCompModify');
     if(this.isButtonClicked == "true"){
       this.pageChanged(sessionStorage.getItem('sessionCompModify_pageNo'));
     }else{
      this.projectNotificationList();
    }

    // this.projectNotificationList();
    
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
  projectNotificationList(){
    debugger;
    sessionStorage.setItem('sessionCompModify_pageNo','1');

    $('.page-loader-wrapper').show();
   
    let url = this.cmn.commonUrl + "notification/viewModifiedProjectNotificationsForApprovals.spring";
       console.log("url :"+url);
       
         let headers = new Headers({ 'Content-Type': 'application/json' });
             let options = new RequestOptions({ headers: headers });
            var body = {
              "sessionKey": ""+sessionStorage.getItem("login_sessionkey"),
              "action" : "Executive Level",
              "notificationType" : "Company",
              "pageNo":sessionStorage.getItem('sessionCompModify_pageNo'), // "1",
              "pageSize":"10"
            }
      /// console.log("----body :"+JSON.stringify(body));
       this.http.post(url,body,options).map(res => res.json()).subscribe(resp =>{
      $('.page-loader-wrapper').hide();
      console.log("Project notifications list response----------"+JSON.stringify(resp));
      if(resp.responseCode == 200){
        this.itemsPer_Page =resp.responseObjList.pagecount *10;
        this.current_Page =1;
        this.totalItems =10;
        this.tabledata = resp.responseObjList.notificationApprovalResponse;
        // setTimeout(function(){
        //   //$('#tableExport').DataTable();
        //   $('#tableExport').dataTable();
        //  },500)
      }else if(resp.responseCode ==440){
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      }else if(resp.responseCode ==800){
        swal(resp.description);
      }else{
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
  public pageChanged(event:any):void {
    debugger;
    //this method will trigger every page click 

    if(sessionStorage.getItem('sessionCompModify_pageNo') == ""){
      sessionStorage.setItem('sessionCompModify_pageNo','1');
    }else{
      sessionStorage.setItem('sessionCompModify_pageNo',event);
      console.log('Number items per page: ' + event);
    }

    $('.page-loader-wrapper').show();
   
    let url = this.cmn.commonUrl + "notification/viewModifiedProjectNotificationsForApprovals.spring";
       console.log("viewModifiedProjectNotificationsForApprovals url :"+url);
       
         let headers = new Headers({ 'Content-Type': 'application/json' });
             let options = new RequestOptions({ headers: headers });
            var body = {
              "sessionKey": ""+sessionStorage.getItem("login_sessionkey"),
              "action" : "Executive Level",
              "notificationType" : "Company",
              "pageNo":""+sessionStorage.getItem('sessionCompModify_pageNo'), //event,
              "pageSize":"10"
            }
       console.log("----viewModifiedProjectNotificationsForApprovals body :"+JSON.stringify(body));
       this.http.post(url,body,options).map(res => res.json()).subscribe(resp =>{
      $('.page-loader-wrapper').hide();
      console.log("viewModifiedProjectNotificationsForApprovals response----------"+JSON.stringify(resp));
      if(resp.responseCode == 200){
        this.itemsPer_Page =resp.responseObjList.pagecount *10;
        this.current_Page =event;
        this.totalItems =10;
        this.tabledata = resp.responseObjList.notificationApprovalResponse;
      //   setTimeout(function(){
      //     //$('#tableExport').DataTable();
      //     $('#tableExport').dataTable();
      //    },1000)
      }else if(resp.responseCode ==440){
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      }else{
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

  homeClick(){
    this.cmn.commonHomeNavigation();
  }

}
