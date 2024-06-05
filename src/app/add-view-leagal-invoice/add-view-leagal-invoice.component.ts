
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { CommonComponent } from '../common/common.component';

declare const $: any;
declare const swal: any;


@Component({
  selector: 'app-add-view-leagal-invoice',
  templateUrl: './add-view-leagal-invoice.component.html',
  styleUrls: ['./add-view-leagal-invoice.component.sass']
})
export class AddViewLeagalInvoiceComponent implements OnInit {
  
  invoicedatatable: Array<any> = [];
  hideme: boolean;
  siteIDval: any;
  flatIdval: any;
  flatBookingIdval: any;
  controller: any;

  constructor(private formBuilder: FormBuilder, private cmn: CommonComponent, private http: Http, private router: Router,) {
    $('.page-loader-wrapper').hide();
    this.controller = JSON.parse(sessionStorage.getItem("userdata"));
    console.log(JSON.parse(sessionStorage.getItem("userdata")));

    this.siteIDval = this.controller.siteId;
    this.flatIdval = this.controller.flatId;
    this.flatBookingIdval = this.controller.flatBookingId;

    console.log(this.siteIDval);
    console.log(this.flatIdval);
    console.log(this.flatBookingIdval);

  }

  ngOnInit() {

    this.getdetails();
  }


  getdetails() {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/getCustomerInvoices.spring";
    console.log(url);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "requestUrl": "getCustomerInvoices",
      "siteIds": [this.siteIDval],
      "flatIds": [this.flatIdval],
      "bookingFormIds": [this.flatBookingIdval]
    }

    console.log(JSON.stringify(body));
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      console.log(resp);
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {

        this.invoicedatatable = resp.responseObjList.finBookingFormAccountsResponseList;
        if (this.invoicedatatable.length == 0) {
          this.hideme = true;
        } else {
          this.hideme = false;
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

            
            
            })
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


  openDocument(url){
    if(url == null || url == ""){

    }else{
      window.open(url);
    }
  }
  
  homeClick(){
    this.cmn.commonHomeNavigation();
  }

  viewinvoicefun(){
    this.router.navigate(["/view-invoice"]);
  }
}
