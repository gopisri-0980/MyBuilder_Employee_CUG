import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { RequestOptions, Headers, Http } from '@angular/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
declare const $: any;
declare const swal: any;

@Component({
  selector: 'app-edit-suspenceentry-list',
  templateUrl: './edit-suspenceentry-list.component.html',
  styleUrls: ['./edit-suspenceentry-list.component.sass']
})
export class EditSuspenceentryListComponent implements OnInit {
  anonymous_list: any;

  constructor(private cmn: CommonComponent, private http: Http, private router: Router) {
    $('.page-loader-wrapper').hide();
    this.gettingAnonymousList();
    sessionStorage.setItem('fromviewpagepredefined', null);
  }

  ngOnInit() {

  }
  /*-----------------Getting viewAnonymousEntriesData list Start---------------------*/
  gettingAnonymousList() {
    
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/viewAnonymousEntriesData.spring";

    console.log("url :" + url);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteId": sessionStorage.getItem("session_siteId"),
      "requestUrl":"LoadModifySuspenceEntry"
    }
    console.log("body :" + JSON.stringify(body))
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      console.log("viewAnonymousEntriesData list response----------" + JSON.stringify(resp));
      if (resp.responseCode == 200) {
        this.anonymous_list = resp.responseObjList.finAnonymousEntryResponseList;
        //  setTimeout(function(){
        //   $('#tableExport').DataTable();
        //  },100);

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
              "bStateSave": true,
              "fnStateSave": function (oSettings, oData) {
                localStorage.setItem('offersDataTables', JSON.stringify(oData));
              },
              "fnStateLoad": function (oSettings) {
                return JSON.parse(localStorage.getItem('offersDataTables'));
              }

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
  /*-----------------Getting viewAnonymousEntriesData list End---------------------*/

  redirectCrmOnlineReceipt(jsonObject) {
    
    var my_Data = JSON.stringify(jsonObject);
    sessionStorage.setItem('anonymousjsonobject', my_Data);
    this.router.navigate(['/edit-suspense-entry_view'])
  }

  homeClick() {
    this.cmn.commonHomeNavigation();
  }

}
