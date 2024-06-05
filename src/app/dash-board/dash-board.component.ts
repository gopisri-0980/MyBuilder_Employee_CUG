import { Component, OnInit } from '@angular/core';
declare const $: any;

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.sass']
})
export class DashBoardComponent implements OnInit {
  
  depID: string;
  roleID: string;

  constructor() { 
      // To load the sidemenu
    //  $('.page-loader-wrapper').show();
      var nValFromSession=sessionStorage.getItem("nval");
      if(nValFromSession=="1"){
        window.location.reload();
        sessionStorage.setItem("nval", "2");
      }else{
        $('.page-loader-wrapper').hide();
      }

      $('.page-loader-wrapper').hide();
      this.depID = sessionStorage.getItem("session_deptid")
      this.roleID = sessionStorage.getItem("session_roleId")
      console.log("Department id " +this.depID);
       console.log("Role id " +this.roleID);
 }

  ngOnInit() {
    console.log("login working");
  }

  ngAfterViewInit(){
    // $('.block-header').hide();
  }
    
}
