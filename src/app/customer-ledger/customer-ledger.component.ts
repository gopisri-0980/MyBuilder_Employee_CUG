import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Http, RequestOptions, Headers } from '@angular/http';
import { CommonComponent } from 'src/app/common/common.component';
declare const $: any;
declare const swal: any;
var selected_projectid;
var selected_blockid;
var selected_floorid;
var selected_flatid;

@Component({
  selector: 'app-customer-ledger',
  templateUrl: './customer-ledger.component.html',
  styleUrls: ['./customer-ledger.component.sass']
})
export class CustomerLedgerComponent implements OnInit {
  ledgerData: any;
  viewData: any;
  blockID: number[];
  floorID: number[];
  flatID: number[];

  constructor(private cmn: CommonComponent, private http: Http, private router: Router) {
    $('.page-loader-wrapper').hide();
    this.siteList();

    // if(sessionStorage.getItem("ledgerData") == '' || sessionStorage.getItem("ledgerData") == null){

    // }else{
    //   $('.table-responsive').show();
    //   this.viewData=JSON.parse(sessionStorage.getItem("ledgerData"));
    //   console.log("Data: "+JSON.stringify(this.viewData));
    //   setTimeout(function () {
    //     $('#tableExport').DataTable();
    //   }, 1000);
    // }
    
  }

  ngOnInit() {

    var self = this;

    $("#projectID").select2({
      placeholder: "--Select--",
      dir: "ltl",
    });

    $("#BlockId").select2({
      placeholder: "--Select--",
      dir: "ltl"
    });

    $("#floorSelection").select2({
      placeholder: "--Select--",
      dir: "ltl"
    });

    $("#flatSelection").select2({
      placeholder: "--Select--",
      dir: "ltl"
    });

    $(function(){
      
      $('#projectID').change(function(e){
        selected_projectid = $(e.target).val();

        if(selected_projectid == "select"){
           swal("please select project");
        }else{
          // $('.table-responsive').hide();
          // this.viewData = "";
          sessionStorage.setItem('ledgerData','');
          self.projectchangeFun(selected_projectid);
        }
      })

      $('#BlockId').change(function(e){
        selected_blockid = $(e.target).val();
        
        if(selected_blockid == "select"){
          swal("please select the block");
        }else{
          // $('.table-responsive').hide();
          // this.viewData = "";
          sessionStorage.setItem('ledgerData','');
          self.blockchangeFun(selected_blockid);
        }
      })

      $('#floorSelection').change(function(e){
        this.selectedFloorID = "";
        selected_floorid = $(e.target).val();

        if(selected_floorid == "select"){
          swal("please select the floor");
        }else{
          // $('.table-responsive').hide();
          // this.viewData = "";
          sessionStorage.setItem('ledgerData','');
          self.floorchangeFun(selected_floorid);
        }
      })

      $('#flatSelection').change(function(e){
        this.selectedFlatID = "";
        selected_flatid = $(e.target).val();

        if(selected_flatid == "select"){
          swal("please select the flat");
        }else{
          // $('.table-responsive').hide();
          // this.viewData = "";
          sessionStorage.setItem('ledgerData','');
          self.flatchangeFun(selected_flatid);
        }
      })

    })

  }


  /*-----------------Getting Project(site) list Start---------------------*/
  siteList() {
    $('.page-loader-wrapper').show();
  
    let url = this.cmn.commonUrl + "financial/raisedMilestoneSites.spring";
    console.log("raisedMilestoneSites url :" + url);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "actionUrl" : "Customer_ledger"
    }
    console.log("raisedMilestoneSites body :" + JSON.stringify(body));

    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      console.log("raisedMilestoneSites Site list response----------" + JSON.stringify(resp));
      if(resp.responseCode == 200){
        $('#projectID').html("");
        $('#projectID').append('<option value="select">--Select--</option>'); 
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#projectID').append("<option value='" + resp.responseObjList[i].siteId + "'>" + resp.responseObjList[i].siteName + "</option>");
        }
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
        $('.page-loader-wrapper').hide();
      
        var error = JSON.parse(error._body).responseCode;
        //alert(error);
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }
  /*-----------------Getting Project(site) list End---------------------*/
  
  /*------------------------Projects On Change Functionality Start--------------------*/
  projectchangeFun(selectedSiteID) {
   $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/activeBlocksFlats.spring";
    // hhttp://106.51.38.64:9999/employeeservice/block/blocks.spring
    console.log("activeBlocksFlats url :" + url);
  
    let headers = new Headers({ 'Content-Type': 'application/json' });
   // let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteIds": [Number($('#projectID').val())]//[Number(selectedSiteID)]
    }
  
    console.log("----activeBlocksFlats body :" + JSON.stringify(body));
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      console.log("activeBlocksFlats list response----------" + JSON.stringify(resp));
      if(resp.responseCode == 200){
        
      $('#BlockId').html("");
      $('#BlockId').append('<option value="select">--Select--</option>'); 
      for (var i = 0; i < resp.responseObjList.length; i++) {
        $('#BlockId').append("<option value='" + resp.responseObjList[i].blockId + "'>" + resp.responseObjList[i].blockName + "</option>");
      }
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
  /*------------------------Projects On Change Functionality End--------------------*/
  
/*------------------------Block On Change Functionality Start--------------------*/
blockchangeFun(selectedBlockID) {
    //this.selectedBlockID.push(Number(selectedBlockID));
   $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/activeBlocksFlats.spring";
    // hhttp://106.51.38.64:9999/employeeservice/block/blocks.spring
    console.log("activeBlocksFlats floors url :" + url);
  
    let headers = new Headers({ 'Content-Type': 'application/json' });
   // let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "blockIds":[Number($('#BlockId').val())],
      "condition" : "Customer_Ledger",
      "siteIds":[Number($("#projectID").val())],
      "actionUrl":"LoadBlockFloorFlatDetails"
    }
  
    console.log("----activeBlocksFlats floors body :" + JSON.stringify(body));
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      console.log("activeBlocksFlats floors list response----------" + JSON.stringify(resp));
      if(resp.responseCode == 200){
      $('#floorSelection').html("");
      $('#floorSelection').append('<option value="select">--Select--</option>'); 
      for (var i = 0; i < resp.responseObjList.length; i++) {
        $('#floorSelection').append("<option value='" + resp.responseObjList[i].floorId + "'>" + resp.responseObjList[i].floorName + "</option>");
      }
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
  /*------------------------Blocks On Change Functionality End--------------------*/

  /*------------------------Floors On Change Functionality Start--------------------*/
floorchangeFun(selectedFloorID) {
 // this.selectedFloorID.push(Number(selectedFloorID));
 $('.page-loader-wrapper').show();
  let url = this.cmn.commonUrl + "financial/activeBlocksFlats.spring";
  // hhttp://106.51.38.64:9999/employeeservice/block/blocks.spring
  console.log("activeBlocksFlats flats url :" + url);

  let headers = new Headers({ 'Content-Type': 'application/json' });
 // let options = new RequestOptions({ headers: headers });
  var body = {
    "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
    "floorIds":[Number($('#floorSelection').val())],
    "condition" : "Customer_Ledger",
    "siteIds":[Number($("#projectID").val())],
    "actionUrl":"LoadBlockFloorFlatDetails"
  }

  console.log("----activeBlocksFlats flats body :" + JSON.stringify(body));
  this.http.post(url, body).map(res => res.json()).subscribe(resp => {
    $('.page-loader-wrapper').hide();
    console.log("activeBlocksFlats flats list response----------" + JSON.stringify(resp));
    if(resp.responseCode == 200){
    $('#flatSelection').html("");
    $('#flatSelection').append('<option value="select">--Select--</option>'); 
    for (var i = 0; i < resp.responseObjList.length; i++) {
      $('#flatSelection').append("<option value='" + resp.responseObjList[i].flatId + "'>" + resp.responseObjList[i].flatNo + "</option>");
    }
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
/*------------------------Floors On Change Functionality End--------------------*/


 /*------------------------Floors On Change Functionality Start--------------------*/
 flatchangeFun(selectedFlatID) {
  //this.selectedFlatID.push(Number(selectedFlatID));
 $('.page-loader-wrapper').show();
  let url = this.cmn.commonUrl + "financial/activeBlocksFlats.spring";
  // hhttp://106.51.38.64:9999/employeeservice/block/blocks.spring
  console.log("activeBlocksFlats customer name url :" + url);

  let headers = new Headers({ 'Content-Type': 'application/json' });
 // let options = new RequestOptions({ headers: headers });
  var body = {
    "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
    "flatIds":[Number($('#flatSelection').val())]
  }

  console.log("----activeBlocksFlats customer name body :" + JSON.stringify(body));
  this.http.post(url, body).map(res => res.json()).subscribe(resp => {
    $('.page-loader-wrapper').hide();
    console.log("activeBlocksFlats customer name response----------" + JSON.stringify(resp));
    if(resp.responseCode == 200){
        
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
/*------------------------Floors On Change Functionality End--------------------*/

/*----------------------- get Customer Ledger Functionality Start--------------------*/
getCustomerLedger() {

  if($('#projectID').val() == 'select' || $('#projectID').val() == null){
    swal("Please select project");
    return false;
  }

      sessionStorage.setItem("ledgerData","");
      // this.viewData= "";

  if($('#BlockId').val() == 'select' || $('#BlockId').val() == null){
    this.blockID = [];
  }else{
    this.blockID = [Number($('#BlockId').val())]
  }

  if($('#floorSelection').val() == 'select' || $('#floorSelection').val() == null){
    this.floorID = [];
  }else{
    this.floorID = [Number($('#floorSelection').val())]
  }

  if($('#flatSelection').val() == 'select' || $('#flatSelection').val() == null){
    this.flatID = [];
  }else{
    this.flatID = [Number($('#flatSelection').val())]
  }

  $('.page-loader-wrapper').show();
  let url = this.cmn.commonUrl + "financial/getCustomerLedger.spring";
  console.log("getCustomerLedger url :" + url);

  let headers = new Headers({ 'Content-Type': 'application/json' });
 // let options = new RequestOptions({ headers: headers });
  var body = {
    "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
    "siteIds":[Number($('#projectID').val())],
    "blockIds":this.blockID, //[Number($('#BlockId').val())],
    "floorIds":this.floorID, //[Number($('#floorSelection').val())],
    "flatIds":this.flatID //[Number($('#flatSelection').val())]
  }

  console.log("getCustomerLedger body :" + JSON.stringify(body));
  this.http.post(url, body).map(res => res.json()).subscribe(resp => {
    $('.page-loader-wrapper').hide();
    console.log("getCustomerLedger response" + JSON.stringify(resp));
    if(resp.responseCode == 200){

      $('.table-responsive').show();

      this.ledgerData = resp.responseObjList.flatsResponse;
      sessionStorage.setItem("ledgerData", JSON.stringify(this.ledgerData));
      this.router.navigate(['Customer-Ledger-Table']);

      // this.viewData=JSON.parse(sessionStorage.getItem("ledgerData"));
      // console.log("Data: "+JSON.stringify(this.viewData));
      // setTimeout(function () {
      //   $('#tableExport').DataTable();
      // }, 3000);

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
/*------------------------Floors On Change Functionality End--------------------*/

homeClick(){
  this.cmn.commonHomeNavigation();
}

}
