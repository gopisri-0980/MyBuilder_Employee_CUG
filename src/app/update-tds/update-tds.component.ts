import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonComponent } from '../common/common.component';
import { Http, Headers, RequestOptions } from '@angular/http';
declare const $: any;
declare const swal: any;
var flatId;
var flatId_bookingid;
var modificationmilestonesarray = [];
var self = this;
@Component({
  selector: 'app-update-tds',
  templateUrl: './update-tds.component.html',
  styleUrls: ['./update-tds.component.sass']
})
export class UpdateTdsComponent implements OnInit {

  milestonedemand_table: any;
  // modificationmilestones_array: any = [];

  constructor(private cmn: CommonComponent, private http: Http, private router: Router) {
    $('.page-loader-wrapper').hide();
    //this.siteList_temp()
    this.siteList();
  }

  ngOnInit() {
    var self = this;

    $(function () {
      $('#milestone_blocks_tables').hide();
      $('#milestonsubmitBtn').hide();

      $("#projectID").select2({
        placeholder: "Search Project",
        dir: "ltl",
      });

      $("#BlockId").select2({
        placeholder: "Search Block",
        dir: "ltl",
      });

      $("#FlatId").select2({
        placeholder: "Search Flat",
        dir: "ltl",
      });

      $("#floorId").select2({
        placeholder: "Search Floor",
        dir: "ltl",
      });

      $("#statusId").select2({
        placeholder: "Search status",
        dir: "ltl",
      });

      $('#projectID').change(function (e) {
        var selected_projectid = $(e.target).val();
        self.projectchangeFun([selected_projectid]);

      })

      $('#BlockId').change(function (e) {
        var selected_projectid = $(e.target).val();
        self.BlockchangeFun([selected_projectid]);
      })

      $('#FlatId').change(function (e) {
        flatId = $(e.target).val().split('-')[0];

        flatId_bookingid = $(e.target).val().split('-')[1];
      })
    })
  }
  /*-----------------Getting Project(site) list Start---------------------*/
  siteList() {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/raisedMilestoneSites.spring";
    // http://106.51.38.64:9999/employeeservice/site/site.spring
    console.log("url :" + url);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "actionUrl": "Update TDS"

    }
    console.log("body :" + JSON.stringify(body))
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      //$('.page-loader-wrapper').hide();
      console.log("Site list response----------" + JSON.stringify(resp));
      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        var Options = "";
        // $('#projectID').formSelect();

        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#projectID').append("<option value='" + resp.responseObjList[i].siteId + "'>" + resp.responseObjList[i].siteName + "</option>");
          //	$('#projectID').formSelect();
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
  /*-----------------Getting Project(site) list End---------------------*/



  /*------------------------Projects On Change for blocks Functionality Start--------------------*/


  projectchangeFun(value) {
    debugger;
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/activeBlocksFlats.spring";
    // hhttp://106.51.38.64:9999/employeeservice/block/blocks.spring
    console.log("url :" + url);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteIds": value.map(Number)
    }

    console.log("----body :" + JSON.stringify(body));
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

      //$('.page-loader-wrapper').hide();
      console.log("Block list response----------" + JSON.stringify(resp));
      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        $('#BlockId').html('');
        $('#BlockId').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#BlockId').append("<option value='" + resp.responseObjList[i].blockId + "'>" + resp.responseObjList[i].blockName + "</option>");

        }
        $("#BlockId").attr("disabled", false)
        // for (var i = 0; i < resp.responseObjList.length; i++) {
        //   $('#floorId').append("<option value='" + resp.responseObjList[i].floorId + "'>" + resp.responseObjList[i].floorName + "</option>");

        // }
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
  /*------------------------Projects On Change  for blocks Functionality End--------------------*/

  /*------------------------Blocks On Change for flats Functionality Start--------------------*/


  BlockchangeFun(value) {
    debugger;
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/activeBlocksFlats.spring";
    // hhttp://106.51.38.64:9999/employeeservice/block/blocks.spring
    console.log("url :" + url);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "blockIds": value.map(Number),
      "siteIds": [$('#projectID').val()]
    }

    console.log("----body :" + JSON.stringify(body));
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

      //$('.page-loader-wrapper').hide();
      console.log("Flat list response----------" + JSON.stringify(resp));
      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        $('#FlatId').html('');
        $('#FlatId').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#FlatId').append("<option value='" + resp.responseObjList[i].flatId + "-" + resp.responseObjList[i].flatBookingId + "'>" + resp.responseObjList[i].flatNo + "</option>");
          ;
        }
        $("#FlatId").attr("disabled", false)
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
  /*------------------------Blocks On Change  for flats Functionality End--------------------*/



  upadtaDts() {

    if ($("#projectID").val() == "select") {
      swal("Please select project");
      return false;
    }

    if ($("#BlockId").val() == "select") {
      swal("Please select block");
      return false;
    }

    if ($("#FlatId").val() == "select") {
      swal("Please select Flat");
      return false;
    }


    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/getMileStoneDetailsForTDS.spring";
    // http://localhost:8080/employeeservice/flat/flatBlock.spring
    console.log("url :" + url);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "flatIds": [flatId].map(Number),
      "siteId": $("#projectID").val(),
      "blockIds": [$("#BlockId").val()].map(Number),
      "floorIds": [],
      "bookingFormId": flatId_bookingid

    }
    console.log("----body :" + JSON.stringify(body));
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      console.log("Update tds table response----------" + JSON.stringify(resp));
      if (resp.responseCode == 200) {
        $("#milestone_blocks_tables").show();
        $("#milestonsubmitBtn").show();

        // alert("Response Success")
        this.milestonedemand_table = resp.responseObjList[0].financialProjectMileStoneResponse;
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

  milestonessubmission() {
    debugger;

    $(".mistonetrclss").each(function () {
      debugger;
      // $.each($(".mistonetrclss"), function(){ 
      var temp = $(this).attr("id").split('tablerowdata')[1];

      // if($("#submittedBy"+temp).val() == null || $("#submittedBy"+temp).val() == "null"){
      //     swal("please select paid by");
      //     return false;
      // }

      // if($("#statustype"+temp).val() ==""){
      //   swal("please select status")
      //   return false;
      // }

      if (($("#submittedBy" + temp).val() == null || $("#submittedBy" + temp).val() == "") && ($("#statustype" + temp).val() == "Pending")) {

      } else {
        modificationmilestonesarray.push(
          {
            "finBookingFormTdsDtlsId": $("#finId" + temp).html(),
            "submitedByName": $("#submittedBy" + temp).val(),
            "statusName": $("#statustype" + temp).val()
          }
        )
      }

    });

    console.log(modificationmilestonesarray);

    if (modificationmilestonesarray.length == 0) {
      swal("Please select paid by");
      return false;
    }
    if (confirm("Do you want to Submit the Page ?")) {

      $('.page-loader-wrapper').show();
      let url = this.cmn.commonUrl + "financial/updateMileStoneTDSDetails.spring";

      console.log("url :" + url);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      var body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "flatIds": [flatId].map(Number),
        "siteId": $("#projectID").val(),
        "blockIds": [$("#BlockId").val()].map(Number),
        "floorIds": [],
        "bookingFormId": flatId_bookingid,
        "financialProjectMileStoneRequests": modificationmilestonesarray

      }
      console.log("----body :" + JSON.stringify(body));

      if (modificationmilestonesarray.length == 0) {
        swal("Please select paid by");
        return false;
      }

      this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
        $('.page-loader-wrapper').hide();
        console.log("Update tds response----------" + JSON.stringify(resp));
        if (resp.responseCode == 200) {
          modificationmilestonesarray = [];
          swal("TDS got updated on the Milestone !!")
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
          var error = JSON.parse(error._body).responseCode;
          //alert(error);
          $('.page-loader-wrapper').hide();
          if (error == 440) {
            swal("Your Session has been Timed Out!", "Please login once again.", "error");
            this.router.navigate([""]);
          }
        }
      );
    } else {

    }

  }

  homeClick() {
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
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
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
