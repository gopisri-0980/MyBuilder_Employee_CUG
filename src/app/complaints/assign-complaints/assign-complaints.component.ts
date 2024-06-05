import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, RequestOptions, Headers } from '@angular/http';
import { CommonComponent } from '../../common/common.component';
declare const $: any;
declare const swal: any;
var selected_projectid;
var site_name;
var selected_blockid;
var block_name;
var selected_employeeid;
var Employee_name;
var selected_blockname;
@Component({
  selector: 'app-assign-complaints',
  templateUrl: './assign-complaints.component.html',
  styleUrls: ['./assign-complaints.component.sass']
})
export class AssignComplaintsComponent implements OnInit {

  radio_Controller: Array<any> = [];
  items: Array<any> = [];
  selectType: any;
  selectname: any;
  title_name: string;
  title_value: string;
  controller: Array<any> = [];
  controller_data: Array<any> = [];
  constructor(private router: Router, private http: Http, public cmn: CommonComponent) {
    $('.page-loader-wrapper').hide();

    this.radio_Controller = [];
    this.radio_Controller = [
      { Name: 'CRM Technical', id: 'Crm_technical' },
      { Name: 'CRM Financial', id: 'Crm_financial' }
    ];
  }

  ngOnInit() {



    var self = this;
    $(function () {

      $("#projectID").select2({
        placeholder: "--Select--",
        dir: "ltl",
      });

      $("#BlockId").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });

      $("#Employee_name").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });

      $('#projectID').change(function (e) {
        selected_projectid = $(e.target).val();
        site_name = $('#projectID').select2('data')[0].text;
        console.log(site_name);
        if (selected_projectid == "select") {
          $("#BlockId").val(['']);
          $("#BlockId").trigger('change');

          $("#Employee_name").val(['select']);
          $("#Employee_name").trigger('change');
          $('input[type=radio]').prop('checked', false);
          this.selectname = null;
          this.title_value = null;
        } else {
          this.selectname = null;
          this.title_value = null;
          $('input[type=radio]').prop('checked', false);
          $("#Employee_name").val(['select']);
          $("#Employee_name").trigger('change');
          self.projectchangeFun(selected_projectid);
        }
      })


      $('#BlockId').change(function (e) {
        selected_blockid = $(e.target).val();
        //  block_name = $('#BlockId').select2('data')[0].text;
        selected_blockname = "";
        for (var i = 0; i < $('#BlockId').select2('data').length; i++) {
          console.log($('#BlockId').select2('data')[i].text);
          selected_blockname += $('#BlockId').select2('data')[i].text + ",";
          console.log(selected_blockname);
        }
      })

      $('#Employee_name').change(function (e) {
        selected_employeeid = $(e.target).val();
        if (selected_employeeid == "select" || selected_employeeid == null) {

        } else {
          Employee_name = $('#Employee_name').select2('data')[0].text;
          console.log(Employee_name);
        }



      })


    });

    this.siteList();
  }


  /*-----------------Getting Project(site) list Start---------------------*/
  siteList() {
    var arr = localStorage.getItem('SiteIDS_singlepage');

    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "site/site.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteIds": JSON.parse(arr).map(String)
    }
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      if (sessionStorage.getItem("customeridsession") == null || sessionStorage.getItem("customeridsession") == "") {
        $('.page-loader-wrapper').hide();
      }


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
    console.log(selectedSiteID);
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "block/blocks.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "ids": [selectedSiteID],
      "requestUrl": "AllData"
    }
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      console.log(resp)
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        this.selectname = null;
        $('#BlockId').html("");
        $('#BlockId').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#BlockId').append("<option value='" + resp.responseObjList[i].id + "'>" + resp.responseObjList[i].name + "</option>");
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
  /*------------------------Projects On Change Functionality End--------------------*/

  handleChange(event, data) {
    this.selectType = event.target.value;
    this.selectname = data.id;

    console.log(this.selectType);
    console.log(this.selectname);

    if ($("#projectID").val() == "select" || $("#projectID").val() == undefined || $("#projectID").val() == null) {
      $('input[type=radio]').prop('checked', false);
      swal("Please select the project.");
      return false;
    }

    if ($("#BlockId").val() == "select" || $("#BlockId").val() == undefined || $("#BlockId").val() == null || $("#BlockId").val().length == 0) {
      $('input[type=radio]').prop('checked', false);
      swal("Please select the Block.");
      return false;
    }

    if (this.selectname == "Crm_technical") {
      this.title_name = "crmtech";
    } else if (this.selectname == "Crm_financial") {
      this.title_name = "crmfinance";
    }

    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "employeeComplaint/getCrmEmployees.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "type": this.title_name,
      "siteIds": [$("#projectID").val()]
    }
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      console.log(resp);
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#Employee_name').html("");
        $('#Employee_name').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#Employee_name').append("<option value='" + resp.responseObjList[i].empDetailId + "'>" + resp.responseObjList[i].employeeName + "</option>");
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


  AddtoBoxfun() {

    if ($("#projectID").val() == "select" || $("#projectID").val() == undefined || $("#projectID").val() == null) {
      $('input[type=radio]').prop('checked', false);
      swal("Please select the project.");
      return false;
    }

    if ($("#BlockId").val() == "select" || $("#BlockId").val() == undefined || $("#BlockId").val() == null || $("#BlockId").val().length == 0) {
      $('input[type=radio]').prop('checked', false);
      swal("Please select the Block.");
      return false;
    }

    console.log(this.selectname);

    if (this.selectname == undefined || this.selectname == "undefined" || this.selectname == null) {
      swal("Please select the complaint type.");
      return false;
    }


    if ($("#Employee_name").val() == "select" || $("#Employee_name").val() == undefined || $("#Employee_name").val() == null || $("#Employee_name").val().length == 0) {

      swal("Please select the employee name.");
      return false;
    }

    if (this.selectname == "Crm_technical") {
      this.title_value = "CRM Technical";

    } else if (this.selectname == "Crm_financial") {
      this.title_value = "CRM Financial";
    }


    console.log($("#projectID").val());
    console.log($("#BlockId").val());

  

    for (var i = 0; i < this.controller.length; i++) {
      console.log(this.controller[i].complaintType);
      console.log(this.title_value);
      if( this.controller[i].complaintType == this.title_value && this.controller[i].siteId == $("#projectID").val() && JSON.stringify(this.controller[i].blockIds) === JSON.stringify($("#BlockId").val()) ){
        swal("Given complaint type already configured with employee!");
        return false;
      }
     }

    this.controller.push(
      {
        "siteId": $("#projectID").val(),
        "Sitename": site_name,
        "blockIds": $("#BlockId").val(),
        "blocknames": selected_blockname,
        "employeeDetailsId": $("#Employee_name").val(),
        "employeename": Employee_name,
        "complaintType": this.title_value
      }
    );







    this.selectname = null;
    console.log(this.controller);
    $("#projectID").val(['select']);
    $("#projectID").trigger('change');

    $("#BlockId").val(['']);
    $("#BlockId").trigger('change');

    $("#Employee_name").val(['select']);
    $("#Employee_name").trigger('change');
    $('input[type=radio]').prop('checked', false);
  }


  removeItem(i: number): void {
    this.controller.splice(i, 1);
  }


  submitfunction() {

    if ($("#projectID").val() == "select" && $("#BlockId").val().length == 0 && this.selectname == null && $("#Employee_name").val() == "select") {
      console.log("success");
      console.log(this.controller);

      if (this.selectname == "Crm_technical") {
        this.title_value = "CRM Technical";
  
      } else if (this.selectname == "Crm_financial") {
        this.title_value = "CRM Financial";
      }
  

    console.log(this.title_value);
    console.log($("#projectID").val());
    console.log(JSON.stringify($("#BlockId").val()));


      for (var i = 0; i < this.controller.length; i++) {



        if( this.controller[i].complaintType == this.title_value && this.controller[i].siteId == $("#projectID").val() && JSON.stringify(this.controller[i].blockIds) === JSON.stringify($("#BlockId").val()) ){
          swal("Given complaint type already configured with employee!");
          return false;
        } else {
          this.controller_data.push({
            "siteId": this.controller[i].siteId,
            "blockIds": this.controller[i].blockIds,
            "employeeDetailsId": this.controller[i].employeeDetailsId,
            "complaintType": this.controller[i].complaintType,
          });
        }

      


      }


      console.log(this.controller_data);

      if (confirm("Do you really want to Submit ?")) {

        console.log($("#projectID").val());
        console.log($("#BlockId").val());
        console.log(this.selectname);
        console.log($("#Employee_name").val());
        $('.page-loader-wrapper').show();
        //http://localhost:8888/SumadhuraGateway/employeeservice/employeeComplaint/createComplaintTypeDetailsForCRM.spring
        let url = this.cmn.commonUrl + "employeeComplaint/createComplaintTypeDetailsForCRM.spring";
        let headers = new Headers({ 'Content-Type': 'application/json' });
        var body = {
          "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
          "complaintTypeRequestList": this.controller_data,
        }

        console.log(url);
        console.log(JSON.stringify(body));
        this.http.post(url, body).map(res => res.json()).subscribe(resp => {
          console.log(JSON.stringify(resp));

          $('.page-loader-wrapper').hide();
          if (resp.responseCode == 200) {
            this.controller_data = [];
            this.controller = [];

            swal(resp.description);
            return false;

          } else if (resp.responseCode == 440) {
            swal("Your Session has been Timed Out!", "Please login once again.", "error");
            this.router.navigate([""]);
          } else if (resp.responseCode == 800) {
            swal(resp.description);
            return false;
          }
          else {
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




    } else {
      // swal("Please complete incomplete complaint ?");
      // return false;


      if ($("#projectID").val() == "select" || $("#projectID").val() == undefined || $("#projectID").val() == null) {
        $('input[type=radio]').prop('checked', false);
        swal("Please select the project.");
        return false;
      }

      if ($("#BlockId").val() == "select" || $("#BlockId").val() == undefined || $("#BlockId").val() == null || $("#BlockId").val().length == 0) {
        $('input[type=radio]').prop('checked', false);
        swal("Please select the Block.");
        return false;
      }

      if (this.selectname == undefined || this.selectname == "undefined" || this.selectname == null) {
        swal("Please select the complaint type.");
        return false;
      }


      if ($("#Employee_name").val() == "select" || $("#Employee_name").val() == undefined || $("#Employee_name").val() == null || $("#Employee_name").val().length == 0) {

        swal("Please select the employee name.");
        return false;
      }

      if (this.selectname == "Crm_technical") {
        this.title_value = "CRM Technical";

      } else if (this.selectname == "Crm_financial") {
        this.title_value = "CRM Financial";
      }

      for (var i = 0; i < this.controller.length; i++) {
        console.log(this.controller[i].complaintType);
        console.log(this.title_value);
        if( this.controller[i].complaintType == this.title_value && this.controller[i].siteId == $("#projectID").val() && JSON.stringify(this.controller[i].blockIds) === JSON.stringify($("#BlockId").val()) ){
          swal("Given complaint type already configured with employee!");
          return false;
        }
       }


      this.controller.push(
        {
          "siteId": $("#projectID").val(),
          "Sitename": site_name,
          "blockIds": $("#BlockId").val(),
          "blocknames": selected_blockname,
          "employeeDetailsId": $("#Employee_name").val(),
          "employeename": Employee_name,
          "complaintType": this.title_value
        }
      );

      this.selectname = null;
      console.log(this.controller);
      $("#projectID").val(['select']);
      $("#projectID").trigger('change');

      $("#BlockId").val(['']);
      $("#BlockId").trigger('change');

      $("#Employee_name").val(['select']);
      $("#Employee_name").trigger('change');
      $('input[type=radio]').prop('checked', false);

    }



  }

  homeClick() {
    this.cmn.commonHomeNavigation();
  }
}