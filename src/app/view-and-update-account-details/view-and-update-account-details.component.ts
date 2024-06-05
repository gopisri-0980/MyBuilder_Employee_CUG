import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { CommonComponent } from '../common/common.component';
import { ViewAndUpdateAccountDetailsService } from './view-and-update-account-details.service';
declare const $: any;
declare const swal: any;

@Component({
  selector: 'app-view-and-update-account-details',
  templateUrl: './view-and-update-account-details.component.html',
  styleUrls: ['./view-and-update-account-details.component.sass']
})
export class ViewAndUpdateAccountDetailsComponent implements OnInit {
  controller_sites_list: Array<any> = [];
  controller_payment_setoff_list: Array<any> = [];
  controller_bank_list: Array<any> = [];
  controller_owner_type_list: Array<any> = [];
  project_list_name: any;
  setoff_list_name: any;
  bank_list_name: any;
  owner_list_name: any;
  singledd1 = {};
  singledd2 = {};
  singledd3 = {};
  singledd4 = {};
  controller_site_data: any
  new_site_creation: any;
  controller_setoff_data: any;
  controller_bank_data: any;
  controller_owner_data: any;
  search_type_owner: any;
  table_controller: Array<any> = [];


  constructor(private formBuilder: FormBuilder, private cmn: CommonComponent, private service: ViewAndUpdateAccountDetailsService,
    private http: Http, private router: Router) {
    $('.page-loader-wrapper').hide();
  }

  ngOnInit() {

    this.singledd1 = {
      singleSelection: true,
      enableSearchFilter: true,
      searchPlaceholderText: 'Search',
      classes: 'my_dropdown1',
      unSelectAllText: 'UnSelect All',
    };

    this.singledd2 = {
      singleSelection: true,
      enableSearchFilter: true,
      searchPlaceholderText: 'Search',
      classes: 'my_dropdown1',
      unSelectAllText: 'UnSelect All',
    };

    this.singledd3 = {
      singleSelection: true,
      enableSearchFilter: true,
      searchPlaceholderText: 'Search',
      classes: 'my_dropdown1',
      unSelectAllText: 'UnSelect All',
    };

    this.singledd4 = {
      singleSelection: true,
      enableSearchFilter: true,
      searchPlaceholderText: 'Search',
      classes: 'my_dropdown1',
      unSelectAllText: 'UnSelect All',
    };
    this.siteList();
    this.set_off_type_list();
    this.bank_names_list();

  }


  /*-----------------Getting Project(site) list Start---------------------*/
  siteList() {
    var arr = localStorage.getItem('View_Bank_Account_Details');
    var site_id = JSON.parse(arr).map(String);

    $('.page-loader-wrapper').show();
    this.service.Get_project_list(site_id).then(resp => {
      console.log(resp);
      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 200) {
        this.controller_sites_list = resp.responseObjList;
        this.controller_sites_list.forEach((o: any, i) => (o.id = o.id));
      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
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
  /*-----------------Getting Project(site) list End---------------------*/

  /*-----------------Getting set off type service Start---------------------*/


  set_off_type_list() {
    $('.page-loader-wrapper').show();
    this.service.Get_setoff_type_list().then(resp => {
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        this.controller_payment_setoff_list = resp.responseObjList.paymentSetOffData;
        this.controller_payment_setoff_list.forEach((o: any, i) => (o.id = o.value));
      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
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

  /*-----------------Getting set off type service end---------------------*/

  /*-----------------Getting bank names service start---------------------*/
  bank_names_list() {
    $('.page-loader-wrapper').show();
    this.service.Get_bank_names_list().then(resp => {
      console.log(resp);
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        this.controller_bank_list = resp.responseObjList;
        this.controller_bank_list.forEach((o: any, i) => (o.id = o.finBankId));
      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
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

  /*-----------------Getting bank names service end---------------------*/

  /*-----------------Getting owner_type service start---------------------*/

  owner_type_list(site_id) {

    $('.page-loader-wrapper').show();
    this.service.Get_owner_type_list(site_id).then(resp => {
      console.log(resp);
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        this.controller_owner_type_list = resp.responseObjList;
        this.controller_owner_type_list.forEach((o: any, i) => (o.id = o.flatSaleOwnerId));
      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
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

  /*-----------------Getting owner_type service end---------------------*/

  // ----------------site on change start-------------------
  sites_selectedSIDs(event) {
    this.owner_list_name = "";
    this.controller_site_data = event.id;
    this.owner_type_list(this.controller_site_data);
  }

  sites_onItemDeSelect(event) {
    this.owner_list_name = "";
    this.controller_site_data = null;
    this.controller_owner_type_list = [];


  }

  // ----------------site on change end-------------------

  // ----------------setoff type on change start-------------------

  setoff_selectedSIDs(event) {
    this.controller_setoff_data = event.id;
  }

  setoff_onItemDeSelect(event) {
    this.controller_setoff_data = null;

  }
  // ----------------setoff type on change end-------------------



  // ----------------Bank name on change start-------------------

  bank_selectedSIDs(event) {
    this.controller_bank_data = event.finBankId;
  }
  bank_onItemDeSelect(event) {
    this.controller_bank_data = null;
  }

  // ----------------Bank name on change end-------------------


  // ----------------Bank name on change start-------------------

  owner_selectedSIDs(event) {
    this.controller_owner_data = event.flatSaleOwnerId;

  }
  owner_onItemDeSelect(event) {
    this.controller_owner_data = null;

  }

  // ----------------Bank name on change end-------------------


  submitfunction() {
    if (this.controller_site_data == undefined || this.controller_site_data == null) {
      swal("Please select the project name");
      return false;
    }

    if ($("#search_owner").val() == undefined || $("#search_owner").val() == "") {
      this.search_type_owner = null;
    } else {
      this.search_type_owner = $("#search_owner").val();
    }

    if (this.controller_site_data == undefined || this.controller_site_data == "") {
      this.controller_site_data = null;
    }

    if (this.controller_setoff_data == undefined || this.controller_setoff_data == "") {
      this.controller_setoff_data = null;
    }

    if (this.controller_bank_data == undefined || this.controller_bank_data == "") {
      this.controller_bank_data = null;
    }
    if (this.controller_owner_data == undefined || this.controller_owner_data == "") {
      this.controller_owner_data = null;
    }



    $('#tableExport').DataTable().destroy();
    $('.page-loader-wrapper').show();
    this.service.Get_search_list(this.controller_bank_data, this.controller_site_data, this.controller_owner_data, this.controller_setoff_data, this.search_type_owner).then(resp => {
      console.log(resp);
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        this.table_controller = [];

        this.table_controller = resp.responseObjList;

        setTimeout(function () {
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

            "footerCallback": function (row, data, start, end, display) { }
          });

        }, 2000)

      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
      }
    }, error => {
      $('.page-loader-wrapper').hide();
      var error = JSON.parse(error._body).responseCode;
      if (error == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      }
    })
  }


  delete_function(data) {
    if (confirm("Are you sure you want to delete ?")) {
      console.log(data.finproaccId);
      console.log(data.finsiteAccMapId);
      $('.page-loader-wrapper').show();
      this.service.Get_delete_function(data.finproaccId, data.finsiteAccMapId).then(resp => {
        console.log(resp);
        $('.page-loader-wrapper').hide();
        if (resp.responseCode == 200) {

          swal({ title: resp.description },
            function () {
              location.reload();
            }
          );
          return false;
        } else if (resp.responseCode == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        } else {
          $('.page-loader-wrapper').hide();
          swal(resp.errors[0]);
          return false;
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
  }


  edit_function(data) {
    this.router.navigateByUrl("Update_Bank_Account_Details");
    sessionStorage.setItem("update_details", JSON.stringify(data));

  }

}
