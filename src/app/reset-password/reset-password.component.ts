import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { CommonComponent } from 'src/app/common/common.component';
import { Router } from '@angular/router';

declare const $: any;
declare const swal:any;

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.sass']
})
export class ResetPasswordComponent implements OnInit {
  createPw: string;
  confirmPw: any;

  constructor(private router : Router, private http: Http, public cmn:CommonComponent) {
    $('.page-loader-wrapper').hide();
    this.siteList_temp()
    sessionStorage.setItem('fromviewpagepredefined', null);
  
  }

  ngOnInit() {
    
  }

  changePassword(){

    if($("#oldPW").val() == '' ||  $("#oldPW").val() == "undefined" || $("#oldPW").val() == undefined){
      swal("Please enter old password"); 
      return false;
    }

    if($("#createPW").val() == '' ||  $("#createPW").val() == "undefined" || $("#createPW").val() == undefined){
      swal("Please enter new password"); 
      return false;
    }

    this.createPw = $("#createPW").val(); 
    if(this.createPw.length < 6){
      swal("New password should be atleast 6 characters"); 
      return false;
    }

    if($("#confirmPW").val() == '' ||  $("#confirmPW").val() == "undefined" || $("#confirmPW").val() == undefined){
      swal("Please enter confirm password"); 
      return false;
    }

    this.confirmPw = $("#confirmPW").val(); 
    if(this.confirmPw.length < 6){
      swal("Confirm password should be atleast 6 characters"); 
      return false;
    }

    if($("#createPW").val() !=  $("#confirmPW").val()){
      swal("New password and Confirm password should match","", "warning"); 
      return false;
    }

    if($("#oldPW").val() ==  $("#createPW").val()){
      swal("Old password and New password should not match","", "warning"); 
      return false;
    }

    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "login/changePassword.spring";
      console.log("changePassword url :"+url);
  
        let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers });
            var body = {
              "sessionKey": ""+sessionStorage.getItem("login_sessionkey"),
              "password" : $("#oldPW").val(), //"crmsales@123",
              "newPassword": $("#createPW").val(), //"crmsales@123",
              "requestUrl" : "changePassword"              
            }
      console.log("----changePassword body :"+JSON.stringify(body));
      this.http.post(url,body,options).map(res => res.json()).subscribe(resp =>{

        $('.page-loader-wrapper').hide();
        console.log("changePassword response----------"+JSON.stringify(resp));

        if(resp.responseCode == 200){
          $("#oldPW").val("");
          $("#createPW").val("");
          $("#confirmPW").val("");
         swal("Your password has been changed successfully!","","success");      
        }else if(resp.responseCode == 440){
          $('.page-loader-wrapper').hide();
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }else{
          swal(resp.description);
        }
     },
       error => {
         console.log(error);
         var error=JSON.parse(error._body).responseCode;
         //alert(error);
         $('.page-loader-wrapper').hide();
         if(error == 440){
           swal("Your Session has been Timed Out!", "Please login once again.", "error");
           this.router.navigate([""]);
         }
       });
  }

  homeClick(){
    this.cmn.commonHomeNavigation();
  }
  siteList_temp() {
    var arr = localStorage.getItem('SiteIDS');
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "site/site.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": sessionStorage.getItem("login_sessionkey"),
      "siteIds": [107],
    }
console.log(JSON.stringify(body))
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
     
      
      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        // $(function(){
        //   setTimeout(function(){
            
        //   },600)
        // })
        
        $('#projectID').html("");
        $('#projectID').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#projectID').append("<option value='" + resp.responseObjList[i].id + "'>" + resp.responseObjList[i].name + "</option>");
        }

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
        $('.page-loader-wrapper').hide();
        var error = JSON.parse(error._body).responseCode;
        this.router.navigate([""]);
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }
}
