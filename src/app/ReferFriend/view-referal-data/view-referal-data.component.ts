import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Http, RequestOptions, Headers } from '@angular/http';
import { CommonComponent } from 'src/app/common/common.component';
// import { ReferefriendsearchComponent } from "../referefriendsearch/referefriendsearch.component";
declare const $: any;
declare const swal: any;
var reference_id;
var reference_name;
@Component({
  selector: 'app-view-referal-data',
  templateUrl: './view-referal-data.component.html',
  styleUrls: ['./view-referal-data.component.sass']
})
export class ViewReferalDataComponent implements OnInit {
    viewData:any;
  comment: any;

 
  constructor(public route: ActivatedRoute, private router: Router,private http: Http, public cmn: CommonComponent) { 
    $('.page-loader-wrapper').hide();
    this.statusList();
 
    this.viewData=JSON.parse(sessionStorage.getItem("refferalData1"));
    console.log("Data: "+JSON.stringify(this.viewData));
    
    console.log("Referal Coments :"+this.viewData.comments);
   console.log("Referal Status :"+this.viewData.referralStatusValue+"-"+this.viewData.referralStatusName);
   reference_id = this.viewData.referralStatusValue;
        console.log("reference_id: "+this.viewData.referralStatusValue);
        reference_name = this.viewData.referralStatusName;
        console.log("reference_name: "+this.viewData.referralStatusName);
       this.comment = this.viewData.comments;
   //NON-ELIGIBLE
   
  //  alert(JSON.stringify(this.viewData.refrenceId));
        sessionStorage.setItem("previouspagetopresntpage_session",sessionStorage.getItem("previouspageId"));

          }

  ngOnInit() {
    $(function () {
      $("#statusID").select2({
        placeholder: "Select Status",
        dir: "ltl"
      });
      $('select').on('change', function() {
       // alert( this.value );
        reference_id = this.value.split('-')[0];
        console.log("reference_id: "+this.reference_id);
        reference_name = this.value.split('-')[1];
        console.log("reference_name: "+this.reference_name);
      });
    
    });
  }

  SearchRefferalFriend(){debugger;
  //  alert(this.comment);
    //return false;
    if($("#statusID").val() == "select"){
      swal("Error!","Please select status");
      return false;
    }
    // if(this.viewData.referralStatusValue+"-"+this.viewData.referralStatusName != "4-Non Eligible"){
    //   if($("#statusID").val() == "select"){
    //     swal("Error!","Please select status");
    //     return false;
    //   }
    // }
    if(this.comment == undefined){
      swal("Error!","Please enter comments");
      return false;
    }
    // if(this.viewData.comments == null){
    //   if(this.comment == undefined){
    //     swal("Error!","Please enter comments");
    //     return false;
    //   }
    // }
   
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "references/saveReferredFrndComments.spring";
    console.log("url :" + url);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body ={
       "refrenceId":this.viewData.refrenceId,
       "comments":this.comment,
       "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
       "referralStatusName":""+reference_name,
       "referralStatusValue":""+reference_id
      }

    console.log("----body :" + JSON.stringify(body));
  
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      console.log("Resp: "+JSON.stringify(resp));
      if(resp.responseCode==200){
        swal("Your comment/status has been added.");
        //this.router.navigate(["reference"]); 
        this.router.navigate(["reference"]);
      }else if(resp.responseCode ==440){
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      }else{        
        swal("Error!", resp.errors, "error");
      }
    },
    error => {
      console.log(error);
      $('.page-loader-wrapper').hide();
      swal("Error!", error, "error");
    });
  }

  homeClick(){
    this.cmn.commonHomeNavigation();
  }

  referencelistClick(){
   // this.router.navigate(["reference-list"]);
    this.router.navigate(["reference"]);

  }
  /*-----------------Getting status list Start---------------------*/
  statusList() {
    debugger;
    let url = this.cmn.commonUrl + "references/referralStatusList.spring";
    
    // http://106.51.38.64:9999/employeeservice/site/site.spring
    console.log("url :" + url);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "moduleId" :9,
      "subModuleId" :14
     
    }

    console.log("body :" + JSON.stringify(body))
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      //$('.page-loader-wrapper').hide();
      console.log("Status list response----------" + JSON.stringify(resp));
      if(resp.responseCode == 200){
       
        var Options = "";
     
        $('#statusID').html('');
        $('#statusID').html('<option value="select">--Select status--</option>');
        //alert(resp.responseObjList.menuModuleStatusInfoList.length)
        for (var i = 0; i < resp.responseObjList.menuModuleStatusInfoList.length; i++) {
          $('#statusID').append("<option value='" + resp.responseObjList.menuModuleStatusInfoList[i].menuModuleStatusId + '-'+resp.responseObjList.menuModuleStatusInfoList[i].statusName+"'>" + resp.responseObjList.menuModuleStatusInfoList[i].statusName + "</option>");
          //	$('#projectID').formSelect();
        }
        $("#statusID").val(this.viewData.referralStatusValue+"-"+this.viewData.referralStatusName);
        // if(this.viewData.referralStatusValue+"-"+this.viewData.referralStatusName == "4-Non Eligible"){

        //   $("#statusID").val(this.viewData.referralStatusValue+"-"+this.viewData.referralStatusName);
        //   //$("#statusID").prop("disabled", true);
        // }
      }else if(resp.responseCode ==440){
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      }else{
      swal(resp.status);
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
  /*-----------------Getting Status list End---------------------*/
}
