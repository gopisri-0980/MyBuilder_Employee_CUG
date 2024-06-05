import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Http, RequestOptions, Headers } from '@angular/http';
import { CommonComponent } from 'src/app/common/common.component';
import { DeviceDetectorService } from 'ngx-device-detector';

declare const $: any;
declare const swal: any;
declare const autosize: any;
declare const moment: any;
@Component({
  selector: 'app-leave-update',
  templateUrl: './leave-update.component.html',
  styleUrls: ['./leave-update.component.sass']
})
export class LeaveUpdateComponent implements OnInit {
  leaveupdate_startdate: any;
  leaveupdate_enddate: string;
  approver_name: any;
  remarks_leaveupdation: string;
  leaveupdate_rejoindate: string;
  temdate_satrt: string;
  temdate_end: string;
  location: string;
  bas64String: any;

  constructor(private _router: Router, private deviceService: DeviceDetectorService, public route: ActivatedRoute,
    private router: Router, private http: Http, public cmn: CommonComponent) {
    this.siteList_temp()
    this.approverList();
    sessionStorage.setItem('fromviewpagepredefined', null);
    // $('.page-loader-wrapper').hide();
    // //alert("step1 constructor");
    // var nValFromSession=sessionStorage.getItem("nval");   
    // setTimeout(function () {
    //   if(nValFromSession=="1"){
    //   window.location.reload();
    //   sessionStorage.setItem("nval", "2");
    //   }else{

    //   }
    // });
    $(function () {
      $("#approverID").select2({
        placeholder: "Search Device",
        dir: "ltl"
      });


      var dtToday = new Date();

      this.month = dtToday.getMonth() + 1;
      this.day = dtToday.getDate();
      this.year = dtToday.getFullYear();
      if (this.month < 10)
        this.month = '0' + this.month.toString();
      if (this.day < 10)
        this.day = '0' + this.day.toString();

      var maxDate = this.year + '-' + this.month + '-' + this.day;
      $('#leaveupdate_startdate').attr('min', maxDate);
      $('#leaveupdate_enddate').attr('min', maxDate);


    });
    $('.page-loader-wrapper').show();
    //alert("step1 constructor");
    // var nValFromSession=sessionStorage.getItem("nval");
    //   if(nValFromSession=="1"){
    //   window.location.reload();
    //   sessionStorage.setItem("nval", "2");
    //   }else{
    // //alert("step1 constructor");
    //   $('.page-loader-wrapper').hide();
    //   }

    //url to base64 converting  
    // this.location = 'https://pbs.twimg.com/profile_images/558329813782376448/H2cb-84q_400x400.jpeg';
    // this.toDataURL(this.location, function (dataUrl) {
    //   var bas64String = dataUrl;
    //     console.log("convert http url to base64: "+bas64String);
    // })

  }

  //url to base64 converting  
  // toDataURL(url, callback) {
  //   var xhr = new XMLHttpRequest();
  //   xhr.onload = function () {
  //       var reader = new FileReader();
  //       reader.onloadend = function () {
  //           callback(reader.result);
  //       }
  //       reader.readAsDataURL(xhr.response);
  //   };
  //   xhr.open('GET', url);
  //   xhr.responseType = 'blob';
  //   xhr.send();
  // }



  startdatefun() {
    $("#leaveupdate_startdate").val("");
  }

  endtimefun() {
    $("#leaveupdate_enddate").val("");
  }


  ngAfterContentInit() {
    // alert("step4 ngAfterContentInit");
  }
  ngAfterContentChecked() {
    // alert("step5 ngAfterContentChecked");
  }

  ngAfterViewChecked() {
    // alert("step7 ngAfterViewChecked");
  }

  ngDoCheck() {
    // alert("step3 ngDoCheck"); //every time loading after oninit
  }
  ngOnDestroy() {
    //alert("step5 ngOnDestroy");
  }
  ngAfterViewInit() {
    //alert("step6 ngAfterViewInit");
  }
  ngOnInit() {
    // alert("step2 ngoninit");
    'use strict';
    $(function () {
      //Textare auto growth
      autosize($('textarea.auto-growth'));

      // $('#leaveupdate_startdate').bootstrapMaterialDatePicker({
      //   format: 'DD-MM-YYYY',
      //   minDate: new Date(),
      //   clearButton: true,
      //   weekStart: 1,
      //   time: false
      // });
      // $('#leaveupdate_startdate').change(function () {debugger;
      //   var startDate =moment($("#leaveupdate_startdate").val(),"DD-MM-YYYY").toDate();
      //   $('#leaveupdate_enddate').val('');
      //   $('#leaveupdate_enddate').bootstrapMaterialDatePicker({
      //     format: 'DD-MM-YYYY',
      //     minDate: startDate,
      //     clearButton: true,
      //     weekStart: 1,
      //     time: false
      //   });
      // });
      // $('#leaveupdate_enddate').bootstrapMaterialDatePicker({
      //   format: 'DD-MM-YYYY',
      //   minDate: new Date(),
      //   clearButton: true,
      //   weekStart: 1,
      //   time: false
      // });
      $('input#input_text, textarea#textarea2').characterCounter();
    });

  }

  updateList(ev) {
    debugger;
    // alert(ev.target.value);
    // $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "employeeTicket/getEmployeeDetails.spring";
    //  http://localhost:8080/employeeservice/employeeTicket/getEmployeeDetails.spring
    console.log("url :" + url);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "employeeName": "" + ev.target.value,
      "requestUrl": "getEmployeeDetails",
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey")
    }
    console.log("----body :" + JSON.stringify(body));
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      //$('.page-loader-wrapper').hide();
      console.log("Leave auto completion response----------" + JSON.stringify(resp));
      if (resp.responseCode == 200) {
        var myautocomp_dataname = [];
        var myautocomp_dataid = [];
        var myauto_name_id = [];
        //  console.log("length: "+resp.employeeDetailsList.length);
        for (var i = 0; i < resp.employeeDetailsList.length; i++) {
          //console.log(resp.employeeDetailsList[i].employeeName);
          myautocomp_dataname.push(resp.employeeDetailsList[i].employeeName);
          myautocomp_dataid.push(resp.employeeDetailsList[i].employeeId);
        }
        for (var i = 0; i < myautocomp_dataname.length; i++) {
          myauto_name_id.push({
            "value": myautocomp_dataid[i],
            "label": myautocomp_dataname[i]
          });
        }
        console.log("DATA " + JSON.stringify(myauto_name_id));

        // Initialize ajax autocomplete:

        $("#autocomplete").autocomplete({
          source: myauto_name_id,
          delay: 300,
          select: function (event, ui) {
            event.preventDefault();
            $("#projeKatmanRaporCbx").val(ui.item.value);
            $("#autocomplete").val(ui.item.label);
          }
        });

      } else if (resp.responseCode == 440) {
        $('.page-loader-wrapper').hide();
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else if (resp.responseCode == 700) {
        $("#autocomplete").val("");
        swal("Error...!", "Approver name not found.", "error");
      } else {
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
      }
    },
      error => {
        console.log(JSON.stringify(error));
        // console.log(_body.responseCode);
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

  leaveupdationSubmission() {
    console.log($("#leaveupdate_startdate").val());
    console.log($("#leaveupdate_enddate").val());



    if ($("#leaveupdate_startdate").val() == "") {
      swal("Please select start date.");
      return false;
    }

    this.temdate_satrt = $("#leaveupdate_startdate").val().split('-')[2] + "-" + $("#leaveupdate_startdate").val().split('-')[1] + "-" + $("#leaveupdate_startdate").val().split('-')[0];


    if ($("#leaveupdate_enddate").val() == "") {
      swal("Please select end date.");
      return false;
    }

    var startdate = $('#leaveupdate_startdate').val();
    var endDate = $('#leaveupdate_enddate').val();
    if (new Date(startdate) > new Date(endDate)) {
      swal('Please select  a valid start and end date');
      return false;
    }


    this.temdate_end = $("#leaveupdate_enddate").val().split('-')[2] + "-" + $("#leaveupdate_enddate").val().split('-')[1] + "-" + $("#leaveupdate_enddate").val().split('-')[0];
    if (new Date(this.temdate_satrt).getTime() > new Date(this.temdate_end).getTime()) {
      swal("End date should be greater than start date.");
      $("#leaveupdate_enddate").val("");
      $("#leaveupdate_enddate").focus();

      return false;
    }


    if ($("#approverID").val() == "select") {
      swal("Please enter approver name.");
      return false;
    }

    if ($("#remarks_leaveupdation").val() == "") {
      swal("Please enter remarks.");
      return false;
    }


    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "employeeTicket/insertEmployeeLeaveDetails.spring";
    //  http://localhost:8080/employeeservice/employeeTicket/insertEmployeeLeaveDetails.spring
    console.log("url :" + url);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "requestUrl": "insertEmployeeLeaveDetails",
      "startDate": "" + $("#leaveupdate_startdate").val(),
      "endDate": "" + $("#leaveupdate_enddate").val(),
      "rejoinDate": "" + $("#leaveupdate_enddate").val(),
      "approvedBy": "" + $('#approverID').val(),
      "message": "" + $("#remarks_leaveupdation").val(),
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey")

    }




    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

      console.log(resp);

      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 200) {
        this.router.navigate(['leave-update']);
        $("#leaveupdate_startdate").val("");
        $("#leaveupdate_enddate").val("");
        $("#remarks_leaveupdation").val("");
        $("#approverID option[value]").remove();
        //window.location.reload();


        $('.page-loader-wrapper').show();
        let url = this.cmn.commonUrl + "employeeTicket/getEmployeeDetails.spring";

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var body =
        {
          "employeeName": "a",
          "requestUrl": "getEmployeeDetails",
          "sessionKey": "" + sessionStorage.getItem("login_sessionkey")
        }


        this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
          $('.page-loader-wrapper').hide();
          if (resp.responseCode == 200) {
            var Options = "";
            $('#approverID').append("");
            $('#approverID').append("<option value='select'>--Select Approver Name--</option>");
            for (var i = 0; i < resp.employeeDetailsList.length; i++) {
              $('#approverID').append("<option value='" + resp.employeeDetailsList[i].empDetailsId + "'>" + resp.employeeDetailsList[i].employeeName + "</option>");
            }
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



        //  alert("Your leave has been updated");
        swal("Good job!", "Your leave has been updated.", "success");
      } else if (resp.responseCode == 440) {
        $('.page-loader-wrapper').hide();
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      }
    },
      error => {
        console.log(error);
        var error = JSON.parse(error._body).responseCode;
        //alert(error);
        $('.page-loader-wrapper').hide();
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      });
  }



  /*-----------------Getting approver list Start---------------------*/
  approverList() {
    console.log(localStorage.getItem('leave_update_controller'));
    $('.page-loader-wrapper').show();


    let url = this.cmn.commonUrl + "bookingFormService/getSalesTeamDetails.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body =
    {
      
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteId":""+ localStorage.getItem('leave_update_controller')
    }

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      console.log(resp);
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        var Options = "";
        // $('#projectID').formSelect();
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#approverID').append("<option value='" + resp.responseObjList[i].employeeId + "'>" + resp.responseObjList[i].employeeName + "</option>");
          //	$('#projectID').formSelect();
        }
      } else if (resp.responseCode == 440) {
        $('.page-loader-wrapper').hide();
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
  /*-----------------Getting approver list End---------------------*/

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


      if (resp.responseCode == 200) {
        $(function () {
          setTimeout(function () {
            $('.page-loader-wrapper').hide();
          }, 5000)
        })

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
