import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonComponent } from '../common/common.component';
import { Http, Headers, RequestOptions } from '@angular/http';
declare const $: any;
declare const swal: any;
var totalDueAmount;
var totalAmount;
@Component({
  selector: 'app-view-demand-note',
  templateUrl: './view-demand-note.component.html',
  styleUrls: ['./view-demand-note.component.sass']
})
export class ViewDemandNoteComponent implements OnInit {
  milestonedemand_table: Array<any> = [];
  total_length: any;
  hideme: boolean;
  showhidedata:boolean = false;
  fromdatevalue: null;
  todatevalue: null;
  fromdatevalue2: null;
  todatevalue2: null;
  fromdatevaluename: number;
  todatevaluename: number;
  fromdatevaluename2: number;
  todatevaluename2: number;
  demandduepercentage: any;
  demandduedays: any;
  constructor(private cmn: CommonComponent, private http: Http, private router: Router) {
    $('.page-loader-wrapper').hide();

    this.siteList();
  }

  ngOnInit() {

    
    var self = this;
    $(function () {

      $('#demand_due_percentage'). blur(function() { if(parseInt($(this). val()) > 100) { 
        $(this). val('');
        swal("Percentage value should be up to 100")
       } })

      $(".fistdaterow").css("display", "block")
      $(".seconddaterow").css("display", "block")
      $('#fromDate').on('change', function (e, date) {
        //  var maxDate = $('#fromDate').val();
        // alert("ok")
        //  $("#fistdaterow").css("display","block")
        $(".seconddaterow").css("display", "none")
        $("#fromDate2").val("")
        $("#toDate2").val("")
      });

      $('#fromDate2').on('change', function (e, date) {
        //  var maxDate = $('#fromDate').val();
        //  alert("ok")
        $(".fistdaterow").css("display", "none")
        $("#fromDate").val("")
        $("#toDate").val("")
        //$("#seconddaterow").css("display","block")
      });

      $('#toDate').on('change', function (e, date) {
        //   var maxDate = $('#fromDate').val();
        //  alert("ok")
        // $("#fistdaterow").css("display","block")
        $(".seconddaterow").css("display", "none")
        $("#fromDate2").val("")
        $("#toDate2").val("")

      });

      $('#toDate2').on('change', function (e, date) {
        // var maxDate = $('#fromDate').val();
        // alert("ok")
        $(".fistdaterow").css("display", "none")
        $("#fromDate").val("")
        $("#toDate").val("")
        // $("#seconddaterow").css("display","block")
      });
    
      $('#milestone_blocks_tables').hide();
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

      $("#milestonesId").select2({
        placeholder: "Search Milestone",
        dir: "ltl",
      });

      $('#projectID').change(function (e) {
        var selected_projectid = $(e.target).val();
        self.projectchangeFun([selected_projectid]);
        self.milestoneNamesfun_proj([selected_projectid]);
        self.flatsitewisechange(selected_projectid);
      })

      $('#BlockId').change(function (e) {
        var selected_projectid = $(e.target).val();
        self.BlockchangeFun([selected_projectid]);
        self.milestoneNamesfun([selected_projectid]);
      })

      $('#FlatId').change(function (e) {
        var selected_projectid = $(e.target).val().split("&&")[0];
        var selected_projectid_flatbookingid = $(e.target).val().split("&&")[1];
        self.milestoneNamesfun_flatonchange([selected_projectid], selected_projectid_flatbookingid);
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
      "actionUrl": "View Demand Notes"

    }
    console.log("body :" + JSON.stringify(body))
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      //$('.page-loader-wrapper').hide();
      console.log("Site list response----------" + JSON.stringify(resp));
      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        var Options = "";
        // $('#projectID').formSelect();
        $('#projectID').html('');
        $('#projectID').append('<option value="select">--Select--</option>');
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
 
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/activeBlocksFlats.spring";
    // hhttp://106.51.38.64:9999/employeeservice/block/blocks.spring
    console.log("url :" + url);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "blockIds": value.map(Number)
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
          console.log("-------------"+resp.responseObjList[i].flatBookingId)
          $('#FlatId').append("<option value='" + resp.responseObjList[i].flatId +"&&"+ resp.responseObjList[i].flatBookingId+"'>" + resp.responseObjList[i].flatNo + "</option>");
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
  /*------------------------Blocks On Change  for flats Functionality End--------------------*/


  flatsitewisechange(siteid) {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "flat/flatSite.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "ids": [siteid],
      "requestUrl": "All"
    }

    console.log(url);
    console.log(JSON.stringify(body));
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      console.log("flat List----- :" + JSON.stringify(resp))
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#FlatId').html('');
        $('#FlatId').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#FlatId').append("<option value='" + resp.responseObjList[i].detId + "'>" + resp.responseObjList[i].name + "</option>");
          // this.controller.push(resp.responseObjList[i].detId);
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
        $('.page-loader-wrapper').hide();
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }


  /*-----------------------------Milestone names start----------------------------*/
  milestoneNamesfun_proj(value) {
  
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/getMileStoneDemandNoteDetails.spring";
    // hhttp://106.51.38.64:9999/employeeservice/block/blocks.spring
    console.log("url :" + url);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteIds": [value].map(Number),
      // "blockIds":value.map(Number),
      "condition": "VIEW_DEMAND_NOTES"
    }

    console.log("---- get mile stone details body :" + JSON.stringify(body));
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

      //$('.page-loader-wrapper').hide();
      console.log("milestone names list response----------" + JSON.stringify(resp));
      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        $('#milestonesId').html('');
        $('#milestonesId').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList[0].financialProjectMileStoneResponse.length; i++) {
          $('#milestonesId').append("<option value='" + resp.responseObjList[0].financialProjectMileStoneResponse[i].projectMilestoneId + "'>" + resp.responseObjList[0].financialProjectMileStoneResponse[i].milestoneName + "</option>");

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
  /*-----------------------------Milestone names end----------------------------*/
  /*-----------------------------Milestone names start----------------------------*/
  milestoneNamesfun(value) {
    debugger;
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/getMileStoneDemandNoteDetails.spring";
    // hhttp://106.51.38.64:9999/employeeservice/block/blocks.spring
    console.log("url :" + url);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteIds": [$("#projectID").val()].map(Number),
      "blockIds": value.map(Number),
      "condition": "VIEW_DEMAND_NOTES"
    }

    console.log("---- get mile stone details body :" + JSON.stringify(body));
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

      //$('.page-loader-wrapper').hide();
      console.log("milestone names list response----------" + JSON.stringify(resp));
      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        $('#milestonesId').html('');
        $('#milestonesId').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList[0].financialProjectMileStoneResponse.length; i++) {
          $('#milestonesId').append("<option value='" + resp.responseObjList[0].financialProjectMileStoneResponse[i].projectMilestoneId + "'>" + resp.responseObjList[0].financialProjectMileStoneResponse[i].milestoneName + "</option>");

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
  /*-----------------------------Milestone names end----------------------------*/

  
  milestoneNamesfun_flatonchange(value, bookingid) {
    debugger;
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/getMileStoneDemandNoteDetails.spring";
    // hhttp://106.51.38.64:9999/employeeservice/block/blocks.spring
    console.log("url :" + url);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteIds": [$("#projectID").val()].map(Number),
      "flatIds": value.map(Number),
      "bookingFormId" : bookingid,
      "condition": "VIEW_DEMAND_NOTES"
    }

    console.log("---- get mile stone details body :" + JSON.stringify(body));
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

      //$('.page-loader-wrapper').hide();
      console.log("milestone names list response----------" + JSON.stringify(resp));
      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        $('#milestonesId').html('');
        $('#milestonesId').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList[0].financialProjectMileStoneResponse.length; i++) {
          $('#milestonesId').append("<option value='" + resp.responseObjList[0].financialProjectMileStoneResponse[i].projectMilestoneId + "'>" + resp.responseObjList[0].financialProjectMileStoneResponse[i].milestoneName + "</option>");

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
  demandNotes() {
    $(function () {

      $('#demand_due_percentage'). blur(function() { if(parseInt($(this). val()) > 100) { 
        $(this). val('');
        swal("Percentage value should be up to 100")
       } })
      })
    var projectidval;
    var blockidval;
    var flatidval;
    var milestoneidval;
    // alert($("#projectID").val());
    // alert($("#BlockId").val());
    // alert($("#FlatId").val());
    // alert($("#milestonesId").val());

    if ($("#projectID").val() == "select" || $("#projectID").val() == null) {
      projectidval = []
    } else {
      projectidval = [$("#projectID").val()]
    }

    if ($("#BlockId").val() == "select" || $("#BlockId").val() == null) {
      blockidval = []
    } else {
      blockidval = [$("#BlockId").val()]
    }

    if ($("#FlatId").val() == "select" || $("#FlatId").val() == null) {
      flatidval = []
    } else {
      flatidval = [$("#FlatId").val()]
    }

    if ($("#milestonesId").val() == "select" || $("#milestonesId").val() == null) {
      milestoneidval = []
    } else {
      milestoneidval = [$("#milestonesId").val()]
    }
    if ($("#projectID").val() == "select") {
      swal("Please select project");
      return false;
    }

    if ($("#demand_due_percentage").val() == "") {
      this.demandduepercentage = null;
    } else {
      this.demandduepercentage = $("#demand_due_percentage").val();
    }

    if ($("#demand_due_days").val() == "") {
      this.demandduedays = null;
    } else {
      this.demandduedays = $("#demand_due_days").val();
    }

    if ($("#fromDate").val() == "") {
      this.fromdatevalue = null;
    } else {
      this.fromdatevalue = $("#fromDate").val();
    }

    if ($("#toDate").val() == "") {
      this.todatevalue = null;
    } else {
      this.todatevalue = $("#toDate").val();
    }

    if ($("#fromDate2").val() == "") {
      this.fromdatevalue2 = null;
    } else {
      this.fromdatevalue2 = $("#fromDate2").val();
    }

    if ($("#toDate2").val() == "") {
      this.todatevalue2 = null;
    } else {
      this.todatevalue2 = $("#toDate2").val();
    }




    if (this.fromdatevalue != null) {
      var d = new Date(this.fromdatevalue);
      var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
        d.getFullYear();

      var offset = d.getTimezoneOffset() * 60 * 1000;
      var withOffset = d.getTime();
      this.fromdatevaluename = withOffset;

    } else {
      this.fromdatevaluename = null;
    }


    if (this.todatevalue != null) {
      var todate = new Date(this.todatevalue);
      var todatestring = ("0" + todate.getDate()).slice(-2) + "-" + ("0" + (todate.getMonth() + 1)).slice(-2) + "-" +
        todate.getFullYear();

      var offset1 = todate.getTimezoneOffset() * 60 * 1000;
      var withOffset1 = todate.getTime();

      var withoutOffset = withOffset1 - offset1;
      this.todatevaluename = withoutOffset;
      //this.todatevalue = new Date(todatestring).getTime();
    } else {
      this.todatevaluename = null;
    }


    if ((this.fromdatevaluename != null && this.todatevaluename == null) || (this.fromdatevaluename == null && this.todatevaluename != null)) {

    } else {
    
        if (this.fromdatevaluename > this.todatevaluename) {
          swal("Demand To Date should be greater than Demand From Date")
          return false;
        }
      

    }

    if (this.fromdatevalue2 != null) {
      var d = new Date(this.fromdatevalue2);
      var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
        d.getFullYear();

      var offset = d.getTimezoneOffset() * 60 * 1000;
      var withOffset = d.getTime();
      this.fromdatevaluename2 = withOffset;

    } else {
      this.fromdatevaluename2 = null;
    }


    if (this.todatevalue2 != null) {
      var todate = new Date(this.todatevalue2);
      var todatestring = ("0" + todate.getDate()).slice(-2) + "-" + ("0" + (todate.getMonth() + 1)).slice(-2) + "-" +
        todate.getFullYear();

      var offset1 = todate.getTimezoneOffset() * 60 * 1000;
      var withOffset1 = todate.getTime();

      var withoutOffset = withOffset1 - offset1;
      this.todatevaluename2 = withoutOffset;
      //this.todatevalue = new Date(todatestring).getTime();
    } else {
      this.todatevaluename2 = null;
    }

    // if(this.fromdatevaluename2 == null && this.todatevaluename2 == null){
    //   swal("Please select any date")
    //   return false;
    // }
    if ((this.fromdatevaluename2 != null && this.todatevaluename2 == null) || (this.fromdatevaluename2 == null && this.todatevaluename2 != null)) {

    } else {
     
        if (this.fromdatevaluename2 > this.todatevaluename2) {

          swal("Demand due to date should be greater than demand due from date")
          return false;
        }
    

    }
    // if ($("#BlockId").val() == "select") {
    //   swal("Please select block");
    //   return false;
    // }

    // if ($("#FlatId").val() == "select") {
    //   swal("Please select Flat");
    //   return false;
    // }

    // if ($("#milestonesId").val() == "select") {
    //   swal("Please select milestone name");
    //   return false;
    // }

    // if ($("#demand_due_percentage").val() == "") {
    //   if ( isNaN( this.demandduepercentage )) {
    //     this.demandduepercentage = 0
    //  }else{
    //   this.demandduepercentage = 0
    //  }
      
    // } else {
    //   this.demandduepercentage =  parseFloat(this.demandduepercentage).toFixed(2)
    // }
    $('#tableExport').DataTable().destroy();

    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/viewDemandNotes.spring";
    // http://localhost:8080/employeeservice/flat/flatBlock.spring
    console.log("url :" + url);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteIds": projectidval,
      "blockIds": blockidval,
      "flatIds": flatidval,
      "percentageValue": this.demandduepercentage,            //parseFloat(this.demandduepercentage).toFixed(2),
      "dueDays": this.demandduedays,
      "demandNoteFromDate": this.fromdatevaluename,
      "demandNoteToDate": this.todatevaluename,
      "demandNoteDueFromDate": this.fromdatevaluename2,
      "demandNoteDueToDate": this.todatevaluename2,
      "projectMileStoneIds": milestoneidval
    }
console.log("------------"+JSON.stringify(body))
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      console.log("------------"+JSON.stringify(resp))
      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 200) {

        if (resp.responseObjList.finBookingFormDemandNoteesponse !== null) {
          // alert("Response Success")
          this.showhidedata =true
          this.milestonedemand_table = [];
          this.milestonedemand_table = resp.responseObjList.finBookingFormDemandNoteesponse;
          this.total_length = resp.responseObjList.finBookingFormDemandNoteesponse.length;

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

                  totalDueAmount = 0.00;
                  totalAmount = 0.00;
                 console.log(display.length)
  
                  if (display.length == 0) {
                    $('#totaldueamount').html(0);
                    $('#totalamount').html(0);
                  } else {
                    for (var j = 0; j < display.length; j++) {
                    //  alert(data[display[j]][3])
                  if(data[display[j]][3] != "-"){
                    var tempdata = (data[display[j]][3].replace(/[^\x00-\x7F]/g, ""))
                    var convertdata = tempdata.replace(/\,/g,'')
                    totalDueAmount += parseFloat(convertdata);
                    console.log(totalDueAmount);
                    
                  }
                       
                       
                
              }

              for (var j = 0; j < display.length; j++) {
               if(data[display[j]][8] != "-"){
                console.log(data[display[j]][8])
                var tempdata1 = (data[display[j]][8].replace(/[^\x00-\x7F]/g, ""))
                var convertdata1 = tempdata1.replace(/\,/g,'')
                totalAmount += parseFloat(convertdata1);
                console.log(totalAmount);
               }
                    
                    
             
           }
              const fmt = require('indian-number-format');
              
              if(totalDueAmount == "0"){
               // alert(totalDueAmount)
                $('#totaldueamount').html("&#8377;0.00");

              }else{
                $('#totaldueamount').html("&#8377;"+fmt.format(totalDueAmount.toFixed(2)));

              }

              if(totalAmount == "0"){
                // alert(totalDueAmount)
                 $('#totalamount').html("&#8377;0.00");
 
               }else{
                 $('#totalamount').html("&#8377;"+fmt.format(totalAmount.toFixed(2)));
 
               }
             // $('#invoiceamount').html(this.totalDueAmount);
              }
            }
              });
  
            });
          }, 2000)

        }


        if (resp.responseObjList.finBookingFormDemandNoteesponse == null || resp.responseObjList.finBookingFormDemandNoteesponse.lenth == 0) {
          this.milestonedemand_table = [];
          this.hideme = true;
          swal("No data available")
          return false;
        } else {
          this.hideme = false;
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
  demandnoteView(pdfurl) {
    //alert(pdfurl);
    window.open(pdfurl, "_blank");

  }

  homeClick() {
    this.cmn.commonHomeNavigation();
  }

  startdatefun() {
    $("#fromDate").val("");
  }

  endtimefun() {
    $("#toDate").val("");
    }

    startdatefun2() {
      $("#fromDate2").val("");
    }
  
    endtimefun2() {
      $("#toDate2").val("");
      }

      getToday(): string {
        return new Date().toISOString().split('T')[0]
      }

}
