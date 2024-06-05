import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApprovependinginvoiceService } from './approvependinginvoice.service';
declare const $: any;
declare const swal: any;
@Component({
  selector: 'app-approve-pending-invoice',
  templateUrl: './approve-pending-invoice.component.html',
  styleUrls: ['./approve-pending-invoice.component.sass']
})
export class ApprovePendingInvoiceComponent implements OnInit {
  controller: Array<any> = [];

  constructor(private router: Router, private service: ApprovependinginvoiceService) {
    $('.page-loader-wrapper').hide();

    this.Approve_pending_invoice();
  }

  ngOnInit() {
  }


  Approve_pending_invoice() {
    $('.page-loader-wrapper').show();
    this.service.getApprovePendingInvoice().then(resp => {
      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        this.controller = resp.responseObjList;
        console.log(this.controller);
        setTimeout(function () {
          $(document).ready(function () {
            $('#viewpendingdata').DataTable({
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
              }

            });
          });

        }, 2000)

      } else if (resp.responseCode == 440) {
        $('.page-loader-wrapper').hide();
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
      }
    });

  }


  viewdetails(userdata) {
    sessionStorage.setItem("userdata", JSON.stringify(userdata));
    this.router.navigateByUrl("viewmodificationinvoice");
  }






}
