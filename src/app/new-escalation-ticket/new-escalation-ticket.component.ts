import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, RequestOptions, Headers } from '@angular/http';
import { CommonComponent } from '../common/common.component';
import { FormGroup, FormBuilder, Validator, FormControl, Validators } from '@angular/forms';
import { DynamicGrid } from './dynamic-grid.model';
declare const $: any;
declare const swal: any;

var selected_tickettype;
var selected_projectid;
@Component({
  selector: 'app-new-escalation-ticket',
  templateUrl: './new-escalation-ticket.component.html',
  styleUrls: ['./new-escalation-ticket.component.sass']
})


export class NewEscalationTicketComponent implements OnInit {
  newDynamic: any = {};
  dynamicArray: Array<DynamicGrid> = [];
  submited: boolean;
  radio_Controller: Array<any> = [];
  EscalationLevel: Array<any> = [];
  selectname: any;
  title_name: string;
  Employee_Names: Array<any> = [];
  selectType: any;
  select_Ticket_Level: any;
  controller: string;
  controller_data: Array<any> = [];

  constructor(private router: Router, private http: Http, public cmn: CommonComponent) {
    $('.page-loader-wrapper').hide();
  }

  ngOnInit() {

    this.radio_Controller = [];
    this.radio_Controller = [
      { Name: 'Escalations Level', id: 'EscalationsLevels' },
      { Name: 'Extend Escalation Time', id: 'EscalationsExtLevels' }
    ];

    this.newDynamic = { title1: "", title2: "" };
    this.dynamicArray.push(this.newDynamic);

    var self = this;
    $(function () {

      $("#projectID").select2({
        placeholder: "--Select--",
        dir: "ltl",
      });

      $("#ticket_type").select2({
        placeholder: "--Select--",
        dir: "ltl",
      });

      $("#Escalation_Level0").select2({
        placeholder: "--Select--",
        dir: "ltl",
      });

      $("#Employee_Name0").select2({
        placeholder: "--Select--",
        dir: "ltl",
      });

      $('#projectID').change(function (e) {
        selected_projectid = $(e.target).val();

        console.log(self.dynamicArray);


        if (selected_projectid == "select") {


          $('input[type=radio]').prop('checked', false)
          $("#ticket_type").val(['select']);
          $("#ticket_type").trigger('change');

          $("#ticket_type").val(['select']);
          $("#ticket_type").trigger('change');

          self.dynamicArray = [];
       
          self.dynamicArray.push(self.newDynamic);

          console.log(self.dynamicArray);
          for (var i = 0; i < self.dynamicArray.length; i++) {
            self.dynamicArray[i].title1 = null;
            self.dynamicArray[i].title2 = null;
            $("#Escalation_Level" + (i)).val(['select']);
            $("#Escalation_Level" + (i)).trigger('change');
            $('#Employee_Name' + (i)).val(['select']);
            $("#Employee_Name" + (i)).trigger('change');

            $("#Escalation_Level" + (i + 1)).val(['select']);
            $("#Escalation_Level" + (i + 1)).trigger('change');
            $('#Employee_Name' + (i + 1)).val(['select']);
            $("#Employee_Name" + (i + 1)).trigger('change');

            $('#Escalation_Level' + (i)).val("")
            $('#Employee_Name' + (i)).val("");

            $('#Escalation_Level' + (i + 1)).val("")
            $('#Employee_Name' + (i + 1)).val("");

          }

          self.select_Ticket_Level = null;



        } else {

          $('input[type=radio]').prop('checked', false)
          $("#ticket_type").val(['select']);
          $("#ticket_type").trigger('change');

          $("#ticket_type").val(['select']);
          $("#ticket_type").trigger('change');



          self.dynamicArray = [];
      
          self.dynamicArray.push(self.newDynamic);
          for (var i = 0; i < self.dynamicArray.length; i++) {

            console.log(self.dynamicArray[i].title1);
            self.dynamicArray[i].title1 = null;
            self.dynamicArray[i].title2 = null;

            $("#Escalation_Level" + (i)).val(['select']);
            $("#Escalation_Level" + (i)).trigger('change');
            $('#Employee_Name' + (i)).val(['select']);
            $("#Employee_Name" + (i)).trigger('change');


            $("#Escalation_Level" + (i + 1)).val(['select']);
            $("#Escalation_Level" + (i + 1)).trigger('change');
            $('#Employee_Name' + (i + 1)).val(['select']);
            $("#Employee_Name" + (i + 1)).trigger('change');

            $('#Escalation_Level' + (i)).val("")
            $('#Employee_Name' + (i)).val("");
            $('#Escalation_Level' + (i + 1)).val("")
            $('#Employee_Name' + (i + 1)).val("");
          }
          self.select_Ticket_Level = null;
        }
      })


      $('#ticket_type').change(function (e) {
        selected_tickettype = $(e.target).val();
        if (selected_tickettype == "select") {
          self.dynamicArray = [];
          self.dynamicArray.push(self.newDynamic);
          for (var i = 0; i < self.dynamicArray.length; i++) {

            $("#Escalation_Level" + (i)).val(['select']);
            $("#Escalation_Level" + (i)).trigger('change');
            $('#Employee_Name' + (i)).val(['select']);
            $("#Employee_Name" + (i)).trigger('change');


            $("#Escalation_Level" + (i + 1)).val(['select']);
            $("#Escalation_Level" + (i + 1)).trigger('change');
            $('#Employee_Name' + (i + 1)).val(['select']);
            $("#Employee_Name" + (i + 1)).trigger('change');

            $('#Escalation_Level' + (i)).val("")
            $('#Employee_Name' + (i)).val("");
            $('#Escalation_Level' + (i + 1)).val("")
            $('#Employee_Name' + (i + 1)).val("");
          }
        } else {
          self.dynamicArray = [];
          self.dynamicArray.push(self.newDynamic);
          for (var i = 0; i < self.dynamicArray.length; i++) {

            $("#Escalation_Level" + (i)).val(['select']);
            $("#Escalation_Level" + (i)).trigger('change');
            $('#Employee_Name' + (i)).val(['select']);
            $("#Employee_Name" + (i)).trigger('change');


            $("#Escalation_Level" + (i + 1)).val(['select']);
            $("#Escalation_Level" + (i + 1)).trigger('change');
            $('#Employee_Name' + (i + 1)).val(['select']);
            $("#Employee_Name" + (i + 1)).trigger('change');

            $('#Escalation_Level' + (i)).val("")
            $('#Employee_Name' + (i)).val("");
            $('#Escalation_Level' + (i + 1)).val("")
            $('#Employee_Name' + (i + 1)).val("");
          }

          self.ticketchangeFun(selected_tickettype);
        }
      })


    });

    this.siteList();
    this.getEscalationLevel();

  }


  handleChange(event, data) {
    this.selectType = event.target.value;
    console.log(this.selectType);
    this.select_Ticket_Level = data.id;
    console.log(this.select_Ticket_Level);


    $("#ticket_type").val(['select']);
    $("#ticket_type").trigger('change');





    this.dynamicArray = [];
    this.dynamicArray.push(this.newDynamic);
    for (var i = 0; i < this.dynamicArray.length; i++) {
      $("#Escalation_Level" + (i + 1)).val(['select']);
      $("#Escalation_Level" + (i + 1)).trigger('change');
      $('#Employee_Name' + (i + 1)).val(['select']);
      $("#Employee_Name" + (i + 1)).trigger('change');
    }



  }


  addRow(index) {
    console.log(index);


    if ($("#projectID").val() == "select" || $("#projectID").val() == undefined || $("#projectID").val() == null) {
      swal("Please select the project.");
      return false;
    }

    if (this.select_Ticket_Level == undefined || this.select_Ticket_Level == "undefined" || this.select_Ticket_Level == null) {
      swal("Please select the ticket leavel.");
      return false;
    }

    if ($("#ticket_type").val() == "select" || $("#ticket_type").val() == undefined || $("#ticket_type").val() == null) {
      swal("Please select the ticket type.");
      return false;
    }

    var self = this;
    $(function () {
      $('#Escalation_Level' + (index + 1)).select2({
        placeholder: "--Select--",
        dir: "ltl",
      });

      $('#Employee_Name' + (index + 1)).select2({
        placeholder: "--Select--",
        dir: "ltl",
      });

    });


    console.log(this.dynamicArray);


    for (var i = 0; i < this.dynamicArray.length; i++) {

      if (this.dynamicArray[i] == this.dynamicArray[index]) {
        if ($('#Escalation_Level' + (index)).val() == null) {
          swal("Escalation level is required!");
          return false;
        }

        if ($('#Employee_Name' + (index)).val() == null) {
          swal("Employee name is required!");
          return false;
        }

        this.dynamicArray[i].title1 = $('#Escalation_Level' + (index)).val();
        this.dynamicArray[i].title2 = $('#Employee_Name' + (index)).val();
      }
    }

    console.log(this.dynamicArray);

    this.submited = false;
    this.newDynamic = { title1: "", title2: "" };
    this.dynamicArray.push(this.newDynamic);
    console.log(this.dynamicArray);
    swal('New row added successfully');

    return true;
  }

  deleteRow(index) {
    if (this.dynamicArray.length == 1) {
      swal("Can't delete the row when there is only one row");
      return false;
    } else {
      this.dynamicArray.splice(index, 1);
      console.log(this.dynamicArray);
      swal('Row deleted successfully');
      return true;
    }
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

  getEscalationLevel() {


    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "employeeTicket/getEscalationLevel.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),

    }
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      console.log(resp);
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {

        this.EscalationLevel = resp.responseObjList;

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


  ticketchangeFun(event) {
    this.selectname = event;

    if ($("#projectID").val() == "select" || $("#projectID").val() == undefined || $("#projectID").val() == null) {
      $('input[type=radio]').prop('checked', false);
      swal("Please select the project.");
      return false;
    }

    if (this.selectname == "Crm_technical") {
      this.title_name = "crmtech";
    } else if (this.selectname == "Crm_financial") {
      this.title_name = "crmfinance";
    }

    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "employeeTicket/getEscalationLevelEmployees.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "type": this.title_name,
      "siteId": $("#projectID").val()
    }

    console.log(body);
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      console.log(resp);
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        this.Employee_Names = resp.responseObjList;
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


  submitfunction() {

    console.log(this.dynamicArray);

    if ($("#projectID").val() == "select" || $("#projectID").val() == undefined || $("#projectID").val() == null) {
      swal("Please select the project.");
      return false;
    }

    if (this.select_Ticket_Level == undefined || this.select_Ticket_Level == "undefined" || this.select_Ticket_Level == null) {
      swal("Please select the ticket leavel.");
      return false;
    }

    if ($("#ticket_type").val() == "select" || $("#ticket_type").val() == undefined || $("#ticket_type").val() == null) {
      swal("Please select the ticket type.");
      return false;
    }

    console.log(this.dynamicArray);


    for (var i = 0; i < this.dynamicArray.length; i++) {
      console.log($('#Escalation_Level' + (i)).val());

      if (this.dynamicArray[i].title1 == "" || this.dynamicArray[i].title1 == null || this.dynamicArray[i].title1 == "select") {
        this.dynamicArray[i].title1 = $('#Escalation_Level' + (i)).val();
      }

      if (this.dynamicArray[i].title2 == "" || this.dynamicArray[i].title2 == null || this.dynamicArray[i].title2 == "select") {
        this.dynamicArray[i].title2 = $('#Employee_Name' + (i)).val();
      }


      console.log(this.dynamicArray[i].title1);

      if (this.dynamicArray[i].title1 == "" || this.dynamicArray[i].title1 == null || this.dynamicArray[i].title1 == "select") {
        swal("Escalation level is required!");
        return false;
      }

      if (this.dynamicArray[i].title2 == "" || this.dynamicArray[i].title2 == null || this.dynamicArray[i].title2 == "select") {
        swal("Employee name is required!");
        return false;
      }
    }

    if ($("#ticket_type").val() == "Crm_financial") {
      this.controller = "CRM Financial";
    } else if ($("#ticket_type").val() == "Crm_technical") {
      this.controller = "CRM Technical";
    }
    this.controller_data = [];

    for (var i = 0; i < this.dynamicArray.length; i++) {
      this.controller_data.push({
        "levelId": this.dynamicArray[i].title1,
        "empId": this.dynamicArray[i].title2,
      });
    }

    console.log($("#projectID").val());
    console.log(this.select_Ticket_Level);
    console.log(this.controller);
    console.log(this.controller_data);


    if (confirm("Do you really want to Submit ?")) {


      $('.page-loader-wrapper').show();
      //http://localhost:8888/SumadhuraGateway/employeeservice/employeeTicket/createTicketEscalationsLevels.spring
      let url = this.cmn.commonUrl + "employeeTicket/createTicketEscalationsLevels.spring";
      let headers = new Headers({ 'Content-Type': 'application/json' });
      var body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "siteId": $("#projectID").val(),
        "requestUrl": this.select_Ticket_Level,
        "ticketEscalationRequest": [
          {
            "ticketEscalationLevelRequestList": this.controller_data,
            "ticketType": this.controller
          }
        ]
      }


      console.log(url);
      console.log(JSON.stringify(body));


      this.http.post(url, body).map(res => res.json()).subscribe(resp => {
        console.log(JSON.stringify(resp));

        $('.page-loader-wrapper').hide();
        if (resp.responseCode == 200) {

          $("#projectID").val(['select']);
          $("#projectID").trigger('change');
          $('input[type=radio]').prop('checked', false)
          $("#ticket_type").val(['select']);
          $("#ticket_type").trigger('change');

          $("#ticket_type").val(['select']);
          $("#ticket_type").trigger('change');

          $("#Escalation_Level0").val(['select']);
          $("#Escalation_Level0").trigger('change');

          $('#Employee_Name0').val(['select']);
          $("#Employee_Name0").trigger('change');


          $('.page-loader-wrapper').hide();
          swal({ title: resp.description },
            function () {
              location.reload();
            }
          );




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


  }

  homeClick() {
    this.cmn.commonHomeNavigation();
  }

}
