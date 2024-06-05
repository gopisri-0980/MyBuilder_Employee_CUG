import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare const $: any;
@Component({
  selector: 'app-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.sass']
})
export class CommonComponent implements OnInit {
  //https live
  // commonUrl: any = "http://129.154.43.149:8066/Gateway/employeeservice/";
  // commonUrl2: any = "http://129.154.43.149:8066/employeeservice/";
  // commonUrl3: any = "http://129.154.43.149:8066/customerservice/";

  commonUrl: any = "http://144.24.96.219:8066/Gateway/employeeservice/";
  commonUrl2: any = "http://144.24.96.219:8066/employeeservice/";
  commonUrl3: any = "http://144.24.96.219:8066/customerservice/";




  //https LIVE URL
  // commonUrl: any = "https://amsapps.app/Gateway/employeeservice/";
  // commonUrl2: any = "https://amsapps.app/employeeservice/";
  // commonUrl3: any = "https://amsapps.app/customerservice/";

  constructor(private _router: Router, private router: Router) { }

  ngOnInit() {
  }

  commonAfterLoginNavigation() {
    // this.router.navigate(['leave-update']);
    this.router.navigate(['shortcut-components']);

    //this.router.navigate(['dashboard']);
  }

  commonHomeNavigation() {
    // this.router.navigate(['leave-update']);
    // this.router.navigate(['shortcut-components']);
    this.router.navigate(['dashboard']);
  }

  // commonHomeNavigation(){
  //   // this.router.navigate(['leave-update']);
  //   this.router.navigate(['dashboard']);
  // }

  commonHomeNavigation1() {
    // this.router.navigate(['leave-update']);
    this.router.navigate(['crm_dashboard']);
  }

}