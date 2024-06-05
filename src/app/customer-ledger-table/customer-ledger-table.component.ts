import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Http, RequestOptions, Headers } from '@angular/http';
import { CommonComponent } from 'src/app/common/common.component';
declare const $: any;
declare const swal: any;

@Component({
  selector: 'app-customer-ledger-table',
  templateUrl: './customer-ledger-table.component.html',
  styleUrls: ['./customer-ledger-table.component.sass']
})
export class CustomerLedgerTableComponent implements OnInit {
  tableData: any;

  constructor(private cmn: CommonComponent, private http: Http, private router: Router) { 
    $('.page-loader-wrapper').hide();
    this.tableData=JSON.parse(sessionStorage.getItem("ledgerData"));
    console.log("Data: "+JSON.stringify(this.tableData));
    setTimeout(function () {
      $('#tableExport').DataTable();
    }, 1000);
  }

  ngOnInit() {
  }

  goToCustomerStatement(item){
    sessionStorage.setItem('ledgerItem',JSON.stringify(item));
    this.router.navigate(['Customer-Ledger-Details']);
  }

  customerLedgerClick(){
    this.router.navigate(['Customer-Ledger']);
  }

  homeClick(){
    this.cmn.commonHomeNavigation();
  }
}
