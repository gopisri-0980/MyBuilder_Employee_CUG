import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CommonComponent } from '../common/common.component';
import { CustomerBankDetailsService } from './customer-bank-details.service';

declare const $: any;
declare const swal: any;
var selected_projectid;
var site_name;
var selected_blockid;
var selected_floorid;
var selected_flatid;
var selected_flatId;
var flat_selection;
var falat_booking_data;
var flat_bookingId;
@Component({
  selector: 'app-customer-bank-details',
  templateUrl: './customer-bank-details.component.html',
  styleUrls: ['./customer-bank-details.component.sass']
})
export class CustomerBankDetailsComponent implements OnInit {

  @ViewChild('auto') auto;

  countries: any;
  autocompleteform: FormGroup;
  keyword = "name";
  controller: Array<any> = [];

  customerdata: Array<any> = [];
  availableTags: Array<any> = [];
  falat_booking_data: any;
  project_list_dropdown: any;
  block_list_dropdown: any;
  flatselection_dropdown: any;
  falat_booking_data_drop: any;
  controller_table_data: Array<any> = [];
  hideme: boolean = true;
  bankname: any;
  brancname: any;
  sendingId: any;
  sendingflatBookingId: any;


  constructor(private formBuilder: FormBuilder, private service: CustomerBankDetailsService, private cmn: CommonComponent,
    private http: Http, private router: Router, private modalService: NgbModal) {
    $('.page-loader-wrapper').hide();
  }

  ngOnInit() {

    this.autocompleteform = this.formBuilder.group({
      employeename: ['']
    });


    var self = this;

    $("#projectID").select2({
      placeholder: "--Select--",
      dir: "ltl",
    });

    $("#BlockId").select2({
      placeholder: "--Select--",
      dir: "ltl",
    });

    $("#flatSelection").select2({
      placeholder: "--Select--",
      dir: "ltl"
    });

    $(function () {
      $('#projectID').change(function (e) {
        falat_booking_data = null;
        flat_selection = null;
        selected_projectid = $(e.target).val();
        site_name = $('#projectID').select2('data')[0].text
        if (selected_projectid == "select") {
          $("#BlockId option[value]").remove();
          $("#flatSelection option[value]").remove();

          self.customerautofield('');
        } else {
          self.projectchangeFun(selected_projectid);
          self.flatsitewisechange(selected_projectid);
          this.siteIDvalue = selected_projectid;
          self.customerautofield(this.siteIDvalue);

        }
      })

      $('#BlockId').change(function (e) {
        selected_blockid = $(e.target).val();
        if (selected_blockid == "select") {
          //swal("please select the block");
          self.flatsitewisechange(selected_projectid);
        } else {
          self.flatwiseblockchange(selected_blockid);
        }
      })

      $('#flatSelection').change(function (e) {
        selected_flatId = $(e.target).val();
        console.log(selected_flatId);
        if (selected_flatId == "select") {
          flat_selection = null;
        } else {
          flat_selection = selected_flatId.split("&&")[0];
          flat_bookingId = selected_flatId.split("&&")[3];
          console.log(flat_bookingId)

        }
      })




    });

    this.siteList();

  }
  selectEvent(item) {
    console.log(item);
    console.log(item.id.split("&&")[1]);
    if (item.id.split("&&")[1] != undefined) {
      falat_booking_data = item.id.split("&&")[1];
    } else {
      falat_booking_data = null;
    }

  }

  onChangeSearch(event) {
    console.log(event);
  }

  onClearSearch(item) {
    console.log(item);

    if (item == undefined) {
      falat_booking_data = null;
    }

    console.log(falat_booking_data);
  }


  /*-----------------Getting Project(site) list Start---------------------*/
  siteList() {
    var arr = localStorage.getItem('SiteIDS_singlepage');

    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "site/site.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      // "sessionKey":"CB1CEA215B6643911AC25FEAD3B90BAD6A87CE87BF504E99FD0D3B973016187E","siteIds":["201"]
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteIds": JSON.parse(arr).map(String)
    }
    console.log(JSON.stringify(body))
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      console.log(JSON.stringify(resp))
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
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "block/blocks.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "ids": [selectedSiteID],
      "requestUrl": "ViewAllData"
    }
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#BlockId').html("");
        $('#BlockId').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#BlockId').append("<option value='" + resp.responseObjList[i].detId + "'>" + resp.responseObjList[i].name + "</option>");
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

  flatsitewisechange(siteid) {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "flat/flatSite.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "ids": [siteid],
      "requestUrl": "ViewAllData"
    }
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#flatSelection').html("");
        this.controller = [0];
        $('#flatSelection').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#flatSelection').append("<option value='" + resp.responseObjList[i].detId + "&&" + resp.responseObjList[i].statusId + "&&" + resp.responseObjList[i].customerId + "&&" + resp.responseObjList[i].flatBookingId + "&&" + resp.responseObjList[i].salesforceSiteName + "&&" + resp.responseObjList[i].salesforceBookingId + "'>" + resp.responseObjList[i].name + "</option>");
          this.controller.push(resp.responseObjList[i].detId);
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

  flatwiseblockchange(blockid) {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "flat/flatBlock.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "ids": [blockid],
      "requestUrl": "ViewAllData"
    }
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#flatSelection').html("");
        this.controller = [0];
        $('#flatSelection').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#flatSelection').append("<option value='" + resp.responseObjList[i].detId + "&&" + resp.responseObjList[i].statusId + "&&" + resp.responseObjList[i].customerId + "&&" + resp.responseObjList[i].flatBookingId + "&&" + resp.responseObjList[i].salesforceSiteName + "&&" + resp.responseObjList[i].salesforceBookingId + "'>" + resp.responseObjList[i].name + "</option>");
          this.controller.push(resp.responseObjList[i].detId);
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



  customerautofield(SiteIDS) {
    this.availableTags = [];
    this.autocompleteform.patchValue({
      employeename: '',
    });


    $(".page-loader-wrapper").show();

    this.service.GetCustomernamefun(sessionStorage.getItem("login_sessionkey"), "", SiteIDS).then(resp => {
      console.log(JSON.stringify(resp))
      $(".page-loader-wrapper").hide();

      if (resp.responseCode == 200) {
        this.customerdata = resp.responseObjList.referedCustomer;
        this.availableTags = [];
        for (var i = 0; i < this.customerdata.length; i++) {
          this.availableTags.push({
            id: this.customerdata[i].custId + "&&" + this.customerdata[i].flatBookingId + "&&" + this.customerdata[i].flatId + "&&" + this.customerdata[i].statusId + "&&" + this.customerdata[i].salesforceSiteName + "&&" + this.customerdata[i].salesforceBookingId,
            name: this.customerdata[i].siteNameCustomerFlatNo
          });
          //   this.employeeIds = [this.customerdata[i].employeeId];
        }

        this.countries = this.availableTags;
        console.log(this.countries)
      } else if (resp.responseCode == 440) {
        swal("Error!", "Your session has been expired.", "error");
        this.router.navigate([""]);
      }
    }, error => {
      $('.page-loader-wrapper').hide();
      var error = JSON.parse(error._body).responseCode;
      if (error == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      }
    }

    )
  }

  getDetails() {

    if ($('#projectID').val() == 'select' || $('#projectID').val() == null) {
      swal("Please select project name");
      return false;
    }

    this.project_list_dropdown = $('#projectID').val();
    this.block_list_dropdown = $('#BlockId').val();
    this.flatselection_dropdown = flat_selection;
    this.falat_booking_data_drop = falat_booking_data;

    if (this.project_list_dropdown == undefined || this.project_list_dropdown == null || this.project_list_dropdown == "select") {
      this.project_list_dropdown = null;
    } else {
      this.project_list_dropdown = [this.project_list_dropdown];
    }

    if (this.block_list_dropdown == undefined || this.block_list_dropdown == null || this.block_list_dropdown == "select") {
      this.block_list_dropdown = null;
    } else {
      this.block_list_dropdown = [this.block_list_dropdown];
    }

    if (this.flatselection_dropdown == undefined || this.flatselection_dropdown == null || this.flatselection_dropdown == "select") {
      this.flatselection_dropdown = null;
    } else {
      this.flatselection_dropdown = [this.flatselection_dropdown]
    }

    if (this.falat_booking_data_drop == undefined || this.falat_booking_data_drop == null || this.falat_booking_data_drop == "select") {
      this.falat_booking_data_drop = null;
    } else {
      this.falat_booking_data_drop = [this.falat_booking_data_drop];
    }

    console.log(this.project_list_dropdown);
    console.log(this.block_list_dropdown);
    console.log(this.flatselection_dropdown);
    console.log(this.falat_booking_data_drop);

    this.customer_bank_account_details(this.project_list_dropdown, this.block_list_dropdown, this.flatselection_dropdown, this.falat_booking_data_drop);


  }

  customer_bank_account_details(project_list, block_list, flatselection, flat_booking) {


    $('.page-loader-wrapper').show();
    $('#tablecomplete').DataTable().destroy();
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/getCustBankDetails.spring";
    //http://106.51.38.64:8888/SumadhuraGateway/employeeservice/financial/getCustBankDetails.spring
    console.log(url)
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body;

    body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteids": project_list,
      "blockids": block_list,
      "flatids": flatselection,
      "flatbookingids": flat_booking
    }


    console.log(JSON.stringify(body));

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

      console.log(JSON.stringify(resp));

      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 200) {
        this.controller_table_data = [];

        this.controller_table_data = resp.responseObjList;

        console.log(this.controller_table_data);

        setTimeout(function () {
          $(document).ready(function () {
            $('#tablecomplete').DataTable({
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
              "scrollY": true,
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

              },
            });

          });
        }, 2000);



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

  homeClick() {
    this.cmn.commonHomeNavigation();
  }


  editDetails(data) {
    console.log(data)
    $('#editbankmodal').modal('show');
    //alert(data.bankName)
    $("#name").val(data.accountHolderName)
    $("#accountnumber").val(data.accountNumber)
    $("#bankName").val(data.bankName)
    $("#branch_name").val(data.branchName)
    $("#ifsccode").val(data.ifscCode)
    this.sendingId = data.id;
    this.sendingflatBookingId = data.flatBookingId;


  }

  Submit() {
    if ($("#name").val() == "") {
      swal("Please enter name");
      return false;
    }
    if ($("#branch_name").val() == "") {
      swal("Please enter branch name");
      return false;
    }
    if ($("#accountnumber").val() == "") {
      swal("Please enter account number");
      return false;
    }
    if ($("#bankName").val() == "") {
      swal("Please enter bank name");
      return false;
    }



    if ($("#ifsccode").val() == "") {
      swal("Please enter IFSC code");
      return false;
    }


    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/updateOrDeleteCustBankDetails.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body;

    body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "id": this.sendingId,
      "bankName": $("#bankName").val(),
      "branchName": $("#branch_name").val(),
      "flatBookingId": this.sendingflatBookingId,
      "action": "update",
      "accountNumber": $("#accountnumber").val(),
      "ifscCode": $("#ifsccode").val(),
      "accountHolderName": $("#name").val()
    }

    console.log(url);
    console.log(JSON.stringify(body));



    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

      console.log(JSON.stringify(resp));

      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 200) {

        swal(resp.status);
        this.customer_bank_account_details(this.project_list_dropdown, this.block_list_dropdown, this.flatselection_dropdown, this.falat_booking_data_drop);
        $('#editbankmodal').modal('hide');
        // location.reload()
      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {

        $('.page-loader-wrapper').hide();
        swal(resp.status);
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

  keyPress_ack(event: any) {
    const pattern = /^[a-zA-Z0-9_.-]*$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  keyPress_name(event: any) {
    const pattern = /^[A-Za-z]+$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  DeleteFunc(data) {
    if (confirm("Do you want to Delete the record ?")) {
      $('.page-loader-wrapper').show();
      let url = this.cmn.commonUrl + "financial/updateOrDeleteCustBankDetails.spring";

      console.log(url)
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      var body;

      body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "id": data.id,
        "bankName": data.bankName,
        "flatBookingId": data.flatBookingId,
        "action": "delete",
        "accountNumber": data.accountNumber,
        "ifscCode": data.ifscCode,
        "accountHolderName": data.accountHolderName
      }
      console.log(JSON.stringify(body));

      this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

        console.log(JSON.stringify(resp));

        $('.page-loader-wrapper').hide();

        if (resp.responseCode == 200) {

          swal(resp.status);
          this.customer_bank_account_details(this.project_list_dropdown, this.block_list_dropdown, this.flatselection_dropdown, this.falat_booking_data_drop);
          //location.reload()
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
  }
}
