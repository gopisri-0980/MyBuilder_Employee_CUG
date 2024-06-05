import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { CommonComponent } from '../common/common.component';
declare const $: any;
declare const swal: any;
@Component({
  selector: 'app-mpr-view',
  templateUrl: './mpr-view.component.html',
  styleUrls: ['./mpr-view.component.sass']
})
export class MPRViewComponent implements OnInit {
  mpr_list : any;
  loaderhideme :boolean=true;
  roleid: any;
  deptid: any;
  constructor(private cmn: CommonComponent, private http: Http, private router: Router) { 
    $('.page-loader-wrapper').hide();
    this.deptid = sessionStorage.getItem("session_deptid");
    this.roleid = sessionStorage.getItem("session_roleId");

    this.mprList();
  }


  mprList(){
  $('.page-loader-wrapper').show();
  let url = this.cmn.commonUrl + "mpr/getMPRDetails.spring";
  let headers = new Headers({ 'Content-Type': 'application/json' });
  var body = {
    "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
     //"pageNo" :1,
    //"pageSize" :10
   
  }
  this.http.post(url, body).map(res => res.json()).subscribe(resp => {
    
    console.log(JSON.stringify(resp))
    if (resp.responseCode == 200) {
      $('.page-loader-wrapper').hide();
     // $('.table-responsive').show();
      this.mpr_list = resp.responseObjList.mprResponseList;
      // setTimeout(function () {
      //   $('#mpr_view').DataTable(
      //     {
      //      dom: 'Bfrltip',
      //       buttons: [
      //           'copy', 'csv', 'excel', 'pdf', 'print'
      //       ]
      //   }
      //   );
      // },1000)
      setTimeout(function () {
       



        $(document).ready(function () {
          $('#mpr_view').DataTable({
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
              localStorage.setItem('offersDataTables1', JSON.stringify(oData));
            },
            "fnStateLoad": function (oSettings) {
              return JSON.parse(localStorage.getItem('offersDataTables1'));
            }

          });
        });


      }, 2000)
this.loaderhideme = false;
     

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
      var error = JSON.parse(error._body).responseCode;
      $('.page-loader-wrapper').hide();
      if (error == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      }
    }
  );
}
  ngOnInit() {
    // this.mpr_list = [
    //   {
    //     "project":"Nandanam",
    //     "mpr_name":"NAN_AUG_20 MPR",
    //     "date":"01-09-2020",

    //   },
    //   {
    //     "project":"Eden Garden",
    //     "mpr_name":"EG_OCT_20 MPR",
    //     "date":"01-11-2020",

    //   },
    // ]
  }
  attachmentlink(link){
    window.open(link);
  }

  homeClick(){
    // this.router.navigate(['leave-update']);
    this.router.navigate(['dashboard']);
  }
  mprDelete(mprId){
    if (confirm("Do you want to Delete the record ?")) {
       this.mprDelete1(mprId);
    }
  }
  mprDelete1(mprId){
    console.log("mprId :"+mprId)
  //  return false;
    $('.page-loader-wrapper').show();
  let url = this.cmn.commonUrl + "mpr/inActiveMPRDetails.spring";
  let headers = new Headers({ 'Content-Type': 'application/json' });
  var body = {
    "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
    "mprIds" : [mprId],
    "requestUrl" : "Delete"
  }
  this.http.post(url, body).map(res => res.json()).subscribe(resp => {
    
    console.log(JSON.stringify(resp))
    if (resp.responseCode == 200) {
      $('.page-loader-wrapper').hide();
     swal("Record successfully deleted");
     //this.mprList();
     location.reload()
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
      var error = JSON.parse(error._body).responseCode;
      $('.page-loader-wrapper').hide();
      if (error == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      }
    }
  );
  }


  viewreportfun(userdata){

    console.log(userdata);

    sessionStorage.setItem("userdata" , JSON.stringify(userdata));

    this.router.navigateByUrl("mprviewreport");
  }
}
