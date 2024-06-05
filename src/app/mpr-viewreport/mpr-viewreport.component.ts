import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonComponent } from '../common/common.component';
import { Http } from '@angular/http';
declare const $: any;
declare const swal: any;
@Component({
  selector: 'app-mpr-viewreport',
  templateUrl: './mpr-viewreport.component.html',
  styleUrls: ['./mpr-viewreport.component.sass']
})
export class MprViewreportComponent implements OnInit {
  controller: any = [];
  controllerdata: Array<any> = [];
  recievedCount: any;
  constructor(private cmn: CommonComponent, private http: Http, private router: Router) {
    $('.page-loader-wrapper').hide();
    this.controller = JSON.parse(sessionStorage.getItem("userdata"));

    console.log(this.controller['mprId']);

    this.getdetails();
  }

  ngOnInit() {
  }

  getdetails() {
    $('#mpr_view').DataTable().destroy();
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "mpr/getMPRViewReport.spring";
    console.log(url);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "mprId": this.controller['mprId']
    }

    console.log(url);
    console.log(JSON.stringify(body));

 


    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      console.log(resp);
      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        this.controllerdata = [];
        this.recievedCount = resp.responseObjList;
        this.controllerdata = resp.responseObjList.mprviewDetails;
        console.log(this.controllerdata);

        setTimeout(function () {
          $(document).ready(function () {
            $('#mpr_view').DataTable({
              pageLength: 10,
              lengthMenu: [[ 10, 20, -1], [10, 20, 'Todos']],
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
              "scrollX": false,
              "autoWidth": false,
              "iCookieDuration": 60,

            });
          });


        }, 2000)


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


  homeClick(){
    this.router.navigateByUrl('MPR_View');
  }
}
