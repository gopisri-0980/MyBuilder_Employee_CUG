
import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { RequestOptions, Headers, Http } from '@angular/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
declare const $: any;
declare const swal: any;
var totaltransactionAmount ;
var controller_data = [];
@Component({
  selector: 'app-crm-view-anonymous-entries',
  templateUrl: './crm-view-anonymous-entries.component.html',
  styleUrls: ['./crm-view-anonymous-entries.component.sass']
})
export class CrmViewAnonymousEntriesComponent implements OnInit {
  anonymous_list: any;
  deptId : any;
  roleId : any;
  view_clreared_transaction_data: any;
  Clear_from_Date_value: any;
  Clear_to_Date_value: any;
  constructor(private cmn: CommonComponent, private http: Http, private router: Router) {
    $('.page-loader-wrapper').hide();
   
    sessionStorage.setItem('fromviewpagepredefined', null);

    this.deptId = sessionStorage.getItem("session_deptid");
    this.roleId = sessionStorage.getItem("session_roleId");
    this.view_clreared_transaction_data =  eval('(' + sessionStorage.getItem('view_suspense_transaction_data') + ')')
    // alert(this.view_clreared_transaction_data.siteId)
     this.gettingAnonymousList();
    //  if(this.view_clreared_transaction_data == null){
    //   this.siteList();
    //   this.transactionTypeAndMode()
    //  }else{
    //   this.completedTransactions()
    //  }
   
  }

  ngOnInit() {

  }
  /*-----------------Getting viewAnonymousEntriesData list Start---------------------*/
  gettingAnonymousList() {
    

    if(sessionStorage.getItem("clear_Fromdate") == "null"){
      this.Clear_from_Date_value = null;
    } else {
      this.Clear_from_Date_value = sessionStorage.getItem("clear_Fromdate");
    }
  
    if(sessionStorage.getItem("clear_toDate") == "null"){
      this.Clear_to_Date_value = null;
    } else {
  
      this.Clear_to_Date_value = sessionStorage.getItem("clear_toDate");
    }

    
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/viewAnonymousEntriesData.spring";

    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body
    if(this.view_clreared_transaction_data == null){
      body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "siteId": sessionStorage.getItem("session_siteId"),
      }
    }else{
       body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "siteId": sessionStorage.getItem("session_siteId"),
        "siteIds": [this.view_clreared_transaction_data.siteId],
        "flatSaleOwnerId": this.view_clreared_transaction_data.flatSaleOwnerId,
        "receivedFromDate": this.Clear_from_Date_value,
        "receivedToDate": this.Clear_to_Date_value,
        "requestUrl": "getSuspnesEntryTransactionReport"


      }
    }
   
    console.log("-----------"+JSON.stringify(body))
    
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
    
      if (resp.responseCode == 200) {
        this.anonymous_list = resp.responseObjList.finAnonymousEntryResponseList;
        console.log(this.anonymous_list);
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
              },
              "footerCallback": function (row, data, start, end, display) {
                totaltransactionAmount = 0;
                controller_data = [];

                if (display.length == 0) {
                  $('#invoiceamount').html(0);
                } else {

                  for (var j = 0; j < display.length; j++) {
                    totaltransactionAmount += parseFloat(data[display[j]][4].replace(/\,/g, ''));
  
                    const fmt = require('indian-number-format');
                    console.log(fmt.format(Number(totaltransactionAmount.toFixed(2))))
   
  
  
                    $('#invoiceamount').html(fmt.format(Number(totaltransactionAmount.toFixed(2))));
                    console.log(Number(totaltransactionAmount).toFixed(2));
                    controller_data.push(resp.responseObjList.finAnonymousEntryResponseList[display[j]]);
                  }
                  
                }
              
              },

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
    this.router.navigate(['/crm-receipt-online'])
  }

  homeClick() {
    this.cmn.commonHomeNavigation();
  }

  ctreport(){
    // alert("ok")
     this.router.navigate(["ClearedTransactionReport"]);
   }
}
