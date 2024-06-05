import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { RequestOptions, Headers, Http } from '@angular/http';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validator, FormControl, Validators, ValidatorFn } from '@angular/forms';
declare const swal: any;
declare const $: any;
@Component({
  selector: 'app-register-and-unregister-list',
  templateUrl: './register-and-unregister-list.component.html',
  styleUrls: ['./register-and-unregister-list.component.sass']
})
export class RegisterAndUnregisterListComponent implements OnInit {
  userForm: FormGroup;
  controller_register: Array<any> = [];
  controller_unregister: Array<any> = [];
  singledd1 = {};
  singledd2 = {};
  project_wise_project: Array<any> = [];
  Projected_wise_data: Array<any> = [];
  project_list_item: Array<any> = [];
  title1: any;
  Action_element: Array<any> = [];
  action_send_value: any;
  hideme: boolean = false;

  constructor(private cmn: CommonComponent, private http: Http, private router: Router, public fb: FormBuilder) {
    $('.page-loader-wrapper').hide();


    this.siteList();
  }

  ngOnInit() {

    this.Action_element = [
      {
        Action_name: 'Register',
        Action_Id: 'register'
      },
      {
        Action_name: 'Unregister',
        Action_Id: 'unregister'
      }
    ];
    this.Action_element.forEach((o: any, i) => (o.id = o.Action_Id));



    $("#Actionfield").select2({
      placeholder: "Select Action",
      dir: "ltl",
    });


    this.userForm = this.fb.group({
      project_wise_form: [''],
      Action: [''],
    });


    this.singledd1 = {
      singleSelection: false,
      enableSearchFilter: true,
      searchPlaceholderText: 'Search',
      classes: 'my_dropdown1',
      unSelectAllText: 'UnSelect All',
      // lazyLoading: true,
    };

    this.singledd2 = {
      singleSelection: true,
      enableSearchFilter: true,
      searchPlaceholderText: 'Search',
      classes: 'my_dropdown1',
      unSelectAllText: 'UnSelect All',
      lazyLoading: true
    };

  }



  /*-----------------Getting Project(site) list Start---------------------*/
  siteList() {
    var arr = localStorage.getItem('SiteIDS_singlepage');
    console.log(arr);
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "site/site.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteIds": JSON.parse(arr).map(String)
    }


    console.log(body);
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        this.project_wise_project = resp.responseObjList;
        this.project_wise_project.forEach((o: any, i) => (o.id = o.id));


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





  selectedSIDs(item: any) {

    this.Projected_wise_data = [];
    this.project_list_item = [];
    for (var i = 0; i < this.title1.length; i++) {
      this.Projected_wise_data.push(this.title1[i].id);
      this.project_list_item.push({
        name: this.title1[i].name,
        id: this.title1[i].id
      });

    }



  }

  onSelectAll(item: any) {
    this.Projected_wise_data = [];
    this.project_list_item = [];
    for (var i = 0; i < this.title1.length; i++) {
      this.Projected_wise_data.push(this.title1[i].id);
      this.project_list_item.push({
        name: this.title1[i].name,
        id: this.title1[i].id
      });

    }


  }

  onItemDeSelect(item: any) {
    this.Projected_wise_data = [];
    this.project_list_item = [];
    for (var i = 0; i < this.title1.length; i++) {
      this.Projected_wise_data.push(this.title1[i].id);
      this.project_list_item.push({
        name: this.title1[i].name,
        id: this.title1[i].id
      });

    }
  }

  onDeSelectAll(item: any) {
    this.Projected_wise_data = [];
    this.project_list_item = [];

  }
  homeClick() {
    this.cmn.commonHomeNavigation();
  }

  Action_onItemSelect(event) {
    console.log(event);
    this.action_send_value = event.Action_Id;
  }

  Action_OnItemDeSelect(event) {
    console.log(event);
    this.action_send_value = null;

  }

  searchfunction() {
    if (this.Projected_wise_data.length == 0) {
      swal("Please select project");
      return false;
    }


    if (this.action_send_value == undefined) {
      this.action_send_value = null;
    }


    console.log(this.Projected_wise_data);
    console.log(this.action_send_value);

    this.getApproveCustomerList(this.Projected_wise_data, this.action_send_value);

  }



  getApproveCustomerList(Projected_wise_data, action_send_value) {
    $('.page-loader-wrapper').show();
    $('#tableExport').DataTable().destroy();
    let url = this.cmn.commonUrl + "financial/registerAndUnrgisterlist.spring";
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteIds": Projected_wise_data,
      "status": action_send_value,
      "bookingFormIds": [],
      "requestUrl": "generateClosingBalanceReport",
      "condition": "generateClosingBalanceReport"
    }

    console.log(url);
    console.log(JSON.stringify(body));

    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      console.log(resp);


      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        this.hideme = true;
        this.controller_register = [];
        if (action_send_value == "register") {

          this.controller_register = resp.responseObjList['registerlist'];
        } else if (action_send_value == "unregister") {
          this.controller_register = resp.responseObjList['unregisterlist'];
        } else {
          this.controller_register = resp.responseObjList['registr&unregisterlist'];
        }



        // this.tabledata = resp.applicantInfo;
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
            }).draw();

          });
        }, 2000)




      } else if (resp.responseCode == 440) {
        swal("Error!", "Your session has been expired.", "error");
        this.router.navigate([""]);
      }
      else {
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
      }
    },
      error => {
        $('.page-loader-wrapper').hide();
        console.log(error);
      }
    );
  }

}
