import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../common/common.component';

import { Router } from '@angular/router';
import { Milestone } from '../model/milestone.model';
import { Http, Headers, RequestOptions } from '@angular/http';
declare const $: any;
declare const swal: any;
var selected_projectid;
var deletedRowStatus = [];
var financialProjectMileStoneRequests = [];
var isDeletionHappened;

@Component({
  selector: 'app-update-interest',
  templateUrl: './update-interest.component.html',
  styleUrls: ['./update-interest.component.sass']
})
export class UpdateInterestComponent implements OnInit {

  milestoneArray: Array<Milestone> = [];
  milestone: Milestone = {
    name: "",
    date: "",
    percentage: ""
  };
  showRemaining: boolean = false;
  selectedSiteID: any;
  dynamicselect: any;
  temdate_milestone_createDate: number;
  temdate_startDate: number;
  temdate_endDate: number;
  createMilestoneRequest: { milestoneName: any; percentagesId: any; milestoneDate: any; };
  deletedRows: any = [];

  constructor(private cmn: CommonComponent, private http: Http, private router: Router) {

    $('.page-loader-wrapper').hide();
  //  this.siteList_temp()

  }

  ngAfterViewInit() {
    this.siteList();
  }

  addRecord(index) {
    var tempindex;
    if ($('#startDate' + index).val() == "") {
      swal("Please select the start date");
      return false;
    }

    if ($('#endDate' + index).val() == "") {
      swal("Please select the end date");
      return false;
    }

    if ($('#rate' + index).val() == "") {
      swal("Please enter the interest rate");
      return false;
    }

    if (new Date($('#startDate' + index).val()) > new Date($('#endDate' + index).val())) {
      swal("End date should be greater than start date.");
      return false;
    }

    tempindex = index + 1
    if ($('#startDate' + index).val() != "" && $('#endDate' + index).val() != "" && $('#rate' + index).val() != "") {
      this.milestone = { name: "", date: "", percentage: "" };
      this.milestoneArray.splice(index + 1, 0, this.milestone);
    }

    $(function () {
      var d = new Date();
      var date = new Date().getMonth();
      var minimumdate = new Date().setMonth(date - 3);
      var maximumdate = new Date().setMonth(date + 3);
      $('#startDate' + (index + 1)).bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
        minDate: new Date(minimumdate),
        maxDate: new Date(),
        clearButton: true,
        weekStart: 1,
        time: false
      }).on('change', function (e, date) {
        $('#endDate' + (index + 1)).bootstrapMaterialDatePicker('setMinDate', date);
      });


      $('#endDate' + (index + 1)).bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
        minDate: new Date(minimumdate),
        maxDate: new Date(maximumdate),
        clearButton: true,
        weekStart: 1,
        time: false
      });
    });

  }

  ngOnInit() {
    var self = this;
    $("#projectID").select2({
      placeholder: "Select Project",
      dir: "ltl",
    });

    $(function () {
      $('#projectID').change(function (e) {
        selected_projectid = $(e.target).val();
        if ($('#projectID').val() == "") {
          $('#totalTableID').hide();
          $('#submitButtonID').hide();
        } else {
          $('#totalTableID').show();
          $('#submitButtonID').show();
          self.projectchangeFun()
        }
      })
    })

  }

  deleteMilestone(index, item) {
    if (this.milestoneArray.length == 1 && item.startDate == undefined && item.endDate == undefined && item.percentageId == undefined
      && item.percentageValue == undefined) {
      swal("You only have one row");
      return false;
    } else {
      if (confirm("Are you sure ?")) {
        this.milestoneArray.splice(index, 1);
        if (item.startDate != undefined && item.endDate != undefined && item.percentageId != undefined && item.percentageValue != undefined) {
          financialProjectMileStoneRequests.push({
            "actualStartDate": "" + item.startDate,//"2020-05-02",
            "actualEndDate": "" + item.endDate,//"2020-07-02",
            "percentageId": "",//19,
            "percentageValue": $('#rate' + index).val(), //9.0,
            "startDate": "" + new Date($("#startDate" + index).val()).getTime(), //"2020-05-02",
            "endDate": "" + new Date($("#endDate" + index).val()).getTime(), //"2020-07-02",
            "actualPercentageId": "" + item.percentageId, //"6",
            "actualPercentageValue": "" + item.percentageValue,//"9.0",
            "rowStatus": "Removed"
          });
        } else { }

      }
    }


  }


  /*-----------------Getting Project(site) list Start---------------------*/
  siteList() {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/raisedMilestoneSites.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });

    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "actionUrl": "Update Interest Rates"
    }

    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#projectID').append("<option value='" + resp.responseObjList[i].siteId + "'>" + resp.responseObjList[i].siteName + "</option>");
        }
      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
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
  /*-----------------Getting Project(site) list End---------------------*/

  /*------------------------Projects On Change Functionality Start--------------------*/
  projectchangeFun() {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/loadRequestedData.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteIds": $("#projectID").val(),
      "actionUrl": "Load Interest Data"
    }

    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      console.log(JSON.stringify(resp))
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        this.milestoneArray = resp.responseObjList.data;
        if (this.milestoneArray.length == 0) {
          this.milestoneArray.push(this.milestone);
        }

        var currentDate = new Date().getTime();


        $(function () {
          for (let i = 0; i < resp.responseObjList.data.length; i++) {

            var d = new Date();
            var date = new Date().getMonth();
            var minimumdate = new Date().setMonth(date - 3);
            var maximumdate = new Date().setMonth(date + 3);
            $('#startDate' + (i + 1)).bootstrapMaterialDatePicker({
              format: 'YYYY-MM-DD',
              minDate: new Date(minimumdate),
              maxDate: new Date(),
              clearButton: true,
              weekStart: 1,
              time: false
            }).on('change', function (e, date) {
              $('#endDate' + (i + 1)).bootstrapMaterialDatePicker('setMinDate', date);
            });


            $('#endDate' + (i + 1)).bootstrapMaterialDatePicker({
              format: 'YYYY-MM-DD',
              minDate: new Date(minimumdate),
              maxDate: new Date(maximumdate),
              clearButton: true,
              weekStart: 1,
              time: false
            });


       if(resp.responseObjList.data[i].endDate == undefined){
        $(function () {
          $("#startDate" + i).prop('disabled', false);
          $("#endDate" + i).prop('disabled', false);
          $("#rate" + i).prop('disabled', false);
          // $("#delete"+i).prop('disabled', true);
          $("#delete" + i).show();
        })
       } else if (currentDate => resp.responseObjList.data[i].endDate) {

        $(function () {
          $("#startDate" + i).prop('disabled', true);
          $("#endDate" + i).prop('disabled', true);
          $("#rate" + i).prop('disabled', true);
          // $("#delete"+i).prop('disabled', true);
          $("#delete" + i).hide();
        })
             
            }


          }
        });






      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        swal(resp.errors[0]);
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

  /*----------------- Update interest Start ---------------------*/
  updateInterestRates() {
    for (let i = 0; i < this.milestoneArray.length; i++) {
      if ($('#startDate' + i).val() == "") {
        swal("Please select the start date.");
        return false;
      }

      if ($('#endDate' + i).val() == "") {
        swal("Please select the end date.");
        return false;
      }

      if ($('#rate' + i).val() == "") {
        swal("Please enter the interest rate (row-" + (i + 1) + ").");
        return false;
      }

    }



    if (confirm("Are you sure to submit ?")) {

      var self = this;
      var actualStartTime;
      var actualEndTime;
      var actualPercentageId;
      var actualPercentageValue;
      var actualStartDate;
      var newStartDate;
      var actualEndDate;
      var newEndDate;
      var newPercentageValue;

      $('.tabletrClass').each(function () {

        var id = $(this).attr('id').split('-')[1];

        actualStartTime = $('#dummyinput' + id).val().split(',')[0];
        actualEndTime = $('#dummyinput' + id).val().split(',')[1];
        actualPercentageId = $('#dummyinput' + id).val().split(',')[2];
        actualPercentageValue = $('#dummyinput' + id).val().split(',')[3];
        newPercentageValue = $('#rate' + id).val();

        if (actualStartTime == "undefined" && actualEndTime == "undefined" && actualPercentageId == "undefined" && actualPercentageValue == "undefined") {
          actualStartTime = null;
          actualEndTime = null;
          actualPercentageId = null;
          actualPercentageValue = null;
          this.rowStatus = "Added";
        } else {
          var actualTempStartTime = Number($('#dummyinput' + id).val().split(',')[0]);
          actualStartDate = new Date(actualTempStartTime).toDateString();
          newStartDate = new Date($('#startDate' + id).val()).toDateString();

          var actualTempEndTime = Number($('#dummyinput' + id).val().split(',')[1]);
          actualEndDate = new Date(actualTempEndTime).toDateString();
          newEndDate = new Date($('#endDate' + id).val()).toDateString();

          if ((newStartDate != actualStartDate) || (newEndDate != actualEndDate) || (newPercentageValue != actualPercentageValue)) {
            this.rowStatus = "Modify";
          } else {
            this.rowStatus = "";
          }
        }

        financialProjectMileStoneRequests.push({
          "actualStartDate": actualStartTime,//"2020-05-02",
          "actualEndDate": actualEndTime,//"2020-07-02",
          "percentageId": "",//19,
          "percentageValue": $('#rate' + id).val(), //9.0,
          "startDate": "" + new Date($("#startDate" + id).val()).getTime(), //"2020-05-02",
          "endDate": "" + new Date($("#endDate" + id).val()).getTime(), //"2020-07-02",
          "actualPercentageId": actualPercentageId, //"6",
          "actualPercentageValue": actualPercentageValue,//"9.0",
          "rowStatus": this.rowStatus
          //""//If nothing is modified
          //"rowStatus":"Modify"//if start date or end date or percentage is modified then send "rowStatus":"Modify"
          //"rowStatus":"Removed"//if row is deleted then send  "rowStatus":"Removed"
          //"rowStatus":"Added"//if new row added then send "rowStatus":"Added"
        });

      })


      $('.page-loader-wrapper').show();
      let url = this.cmn.commonUrl + "financial/updateInterestRates.spring"

      let headers = new Headers({ 'Content-Type': 'application/json' });
      //let options = new RequestOptions({ headers: headers });

      var body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "siteIds": $("#projectID").val(),//[111,107],
        "actionUrl": "Update Interest Data",
        "financialGstDetailsRequests": financialProjectMileStoneRequests
      }


      console.log(body);

      this.http.post(url, body).map(res => res.json()).subscribe(resp => {

        console.log(resp);

        $('.page-loader-wrapper').hide();
        if (resp.responseCode == 200) {

          swal({ title: "Interest rates updated successfully !!" },
            function () {
              location.reload();
            }
          );

        } else if (resp.responseCode == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        } else {
          swal({ title: resp.errors[0] },

          );
        }
      },
        error => {
          $('.page-loader-wrapper').hide();
          swal({ title: error },
            function () {
              //  location.reload();
            }
          );
        });

    } else { }

  }

  /*----------------- Update interest End ---------------------*/

  homeClick() {
    this.cmn.commonHomeNavigation();
  }

  customTrackBy(index: number, obj: any): any {
    return index;
  }

  keyPress(event: any) {

    event.target.value = event.target.value.replace(/[^\d-.]/g, '')
      .replace(/(?!^)-/g, '')
      .replace(/\.(?=.*\.)/g, '');
    if (event.which === 32 && event.target.selectionStart === 0) {
      return false;
    } else {
      const pattern = /^[0-9.]*$/;
      const inputChar = String.fromCharCode(event.charCode);
      if (event.keyCode !== 8 && !pattern.test(inputChar)) {
        event.preventDefault();
      }

      var target = event.target;
      var charCode = event.which || event.keyCode;

      var DECIMAL_REGEXP = /(?<=^.[0-9]$)/g;
      target.value = target.value.replace(DECIMAL_REGEXP, '.');
      return true;
    }
  }


  pasteEvent(event: ClipboardEvent) {
    const clipboardData = event.clipboardData;
    const pastedText = clipboardData.getData('text');

    event.preventDefault();
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
