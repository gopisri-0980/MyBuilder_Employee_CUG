import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { CommonComponent } from '../common/common.component';
import { SuspenseEntriesReportService } from './suspense-entries-report.service';
declare const $: any;
declare const swal: any;

var totalInvoiceAmount = 0;
var totalpaidAmount = 0;
var totalDueAmountval = 0;


var sixtonineAmount = 0;
var nineaboveAmount = 0;
var rowwisetotal = 0;

@Component({
  selector: 'app-suspense-entries-report',
  templateUrl: './suspense-entries-report.component.html',
  styleUrls: ['./suspense-entries-report.component.sass']
})
export class SuspenseEntriesReportComponent implements OnInit {
  controller: Array<any> = [];

  constructor(private cmn: CommonComponent, private http: Http, private router: Router, private service: SuspenseEntriesReportService) {
    $('.page-loader-wrapper').hide();
  }

  ngOnInit() {
    this.gettabledata();
  }

  /*------------------------ get table data Start--------------------*/
  gettabledata() {
    $('.page-loader-wrapper').show();
    this.service.gettabledetails().then(resp => {
      console.log(resp);
      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 200) {

        this.controller = resp.responseObjList;

        console.log(this.controller);

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

                totalInvoiceAmount = 0;
                totalpaidAmount = 0;
                totalDueAmountval = 0;
                sixtonineAmount = 0;
                nineaboveAmount = 0;
                rowwisetotal = 0;

                if (display.length == 0) {
                  $('#invoiceamount').html(0);
                  $('#payedamount').html(0);
                  $('#dueamount').html(0);

                  $('#sixtonineAmount').html(0);
                  $('#nineaboveAmount').html(0);
                  $('#rowwisetotal').html(0);

                } else {

                  for (var j = 0; j < display.length; j++) {
                    const str = data[display[j]][2].split(';')[1];
                    const withoutCommas = str.replaceAll(',', '');
                    totalInvoiceAmount += parseFloat(withoutCommas);
  
  
                    const str1 = data[display[j]][3].split(';')[1];
                    const withoutCommas1 = str1.replaceAll(',', '');
                    totalpaidAmount += parseFloat(withoutCommas1);
  
  
                    const str2 = data[display[j]][4].split(';')[1];
                    const withoutCommas2 = str2.replaceAll(',', '');
                    totalDueAmountval += parseFloat(withoutCommas2);
  
                    const str3 = data[display[j]][5].split(';')[1];
                    const withoutCommas3 = str3.replaceAll(',', '');
                    sixtonineAmount += parseFloat(withoutCommas3);
  
                    const str4 = data[display[j]][6].split(';')[1];
                    const withoutCommas4 = str4.replaceAll(',', '');
                    nineaboveAmount += parseFloat(withoutCommas4);
  
                    const str5 = data[display[j]][7].split(';')[1];
                    const withoutCommas5 = str5.replaceAll(',', '');
                    rowwisetotal += parseFloat(withoutCommas5);
                    const fmt = require('indian-number-format');
  
                    $('#invoiceamount').html(fmt.format(Number(totalInvoiceAmount.toFixed(2))));
                    $('#payedamount').html(fmt.format(Number(totalpaidAmount.toFixed(2))));
                    $('#dueamount').html(fmt.format(Number(totalDueAmountval.toFixed(2))));
                    $('#sixtonineAmount').html(fmt.format(Number(sixtonineAmount.toFixed(2))));
                    $('#nineaboveAmount').html(fmt.format(Number(nineaboveAmount.toFixed(2))));
                    $('#rowwisetotal').html(fmt.format(Number(rowwisetotal.toFixed(2))));
  
                  }

                }

              
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
    }, error => {
      $('.page-loader-wrapper').hide();
      if (error == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      }
    }
    );
  }
  /*------------------------get table data End--------------------*/

  homeClick() {
    this.cmn.commonHomeNavigation();
  }

}
