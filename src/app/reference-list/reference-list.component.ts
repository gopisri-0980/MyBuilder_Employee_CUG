import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonComponent } from '../common/common.component';
declare const $: any;
@Component({
  selector: 'app-reference-list',
  templateUrl: './reference-list.component.html',
  styleUrls: ['./reference-list.component.sass']
})
export class ReferenceListComponent implements OnInit {
  viewData: any;

  constructor(private cmn: CommonComponent, private router: Router) {
    $('.page-loader-wrapper').hide();
    this.viewData=JSON.parse(sessionStorage.getItem("refferalData"));
   // alert(this.viewData);
    console.log("Data: "+JSON.stringify(this.viewData));
   }

  ngOnInit() {
  }
  
 viewReferenceData(data) {
    debugger;
    sessionStorage.setItem("refferalData1", JSON.stringify(data));
    this.router.navigate(["view-refer-data"]);
  }

  homeClick(){
    this.cmn.commonHomeNavigation();
  }

}
