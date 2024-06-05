import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Http, RequestOptions, Headers } from '@angular/http';
import { CommonComponent } from 'src/app/common/common.component';
declare const $: any;
declare const swal: any;

@Component({
  selector: 'app-customer-ledger-details',
  templateUrl: './customer-ledger-details.component.html',
  styleUrls: ['./customer-ledger-details.component.sass']
})
export class CustomerLedgerDetailsComponent implements OnInit {
  ledgerItem: any;
  bookingDate: any;
  totalFlatCost: any;
  tableData: any;
  tableLength: any;
  totalCreditAmount: any;
  totalDebitAmount: any;

  constructor(private cmn: CommonComponent, private http: Http, private router: Router) { 
    this.ledgerItem = JSON.parse(sessionStorage.getItem("ledgerItem"));
    console.log("ledgerItem Data: "+JSON.stringify(this.ledgerItem));
    this.getCustomerStatement(this.ledgerItem);
  }

  ngOnInit() {
  }

  getCustomerStatement(ledgerItem){
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/getCustomerLedgerDetails.spring";
    console.log("getCustomerLedgerDetails url :" + url);
  
    let headers = new Headers({ 'Content-Type': 'application/json' });
   // let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteIds":[ledgerItem.siteId], //[111],
      "flatIds":[ledgerItem.flatId], //[1118],
      "bookingFormIds":[ledgerItem.flatBookingId] //[328]
    }
  
    console.log("getCustomerLedgerDetails body :" + JSON.stringify(body));
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      console.log("getCustomerLedgerDetails response----------" + JSON.stringify(resp));
      if(resp.responseCode == 200){
        this.totalFlatCost = resp.responseObjList.totalFlatCost;
        this.bookingDate = resp.responseObjList.bookingDate;

        this.tableData = resp.responseObjList.customerLedgerResponses;
        this.tableLength = this.tableData.length;
        this.totalCreditAmount = resp.responseObjList.totalCreditAmount;
        this.totalDebitAmount = resp.responseObjList.totalDebitAmount;
          
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
        var error = JSON.parse(error._body).responseCode;
        //alert(error);
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

  customerLedgerClick(){
    this.router.navigate(['Customer-Ledger']);
  }

  customerLedgerTableClick(){
    this.router.navigate(['Customer-Ledger-Table']);
  }

  homeClick(){
    this.cmn.commonHomeNavigation();
  }

}
