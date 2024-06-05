import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { Http, Headers, RequestOptions } from '@angular/http';
declare const $: any;

declare const swal: any;
import { FormGroup, FormBuilder, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { Router, NavigationExtras, RoutesRecognized } from "@angular/router";
import { filter, pairwise } from 'rxjs/operators';
import * as moment from 'moment';
var selected_projectid;
var site_ac_number;
var site_ac_name;
var project_name;
var back_selected_project_name;
var back_transaction_type_name;
var back_transaction_mode_name;

var Transaction_type_back;
var Transaction_Mode_back;


var Transaction_set_off_back = [];
var Transaction_bank_account_back = [];
var Project_Id_back = []

@Component({
  selector: 'app-view-pending-interest-waiver-status',
  templateUrl: './view-pending-interest-waiver-status.component.html',
  styleUrls: ['./view-pending-interest-waiver-status.component.sass']
})
export class ViewPendingInterestWaiverStatusComponent implements OnInit {
  pendingTransData: Array<any> = [];
  viewTransactionData: any;

  fg: FormGroup;
  view_clreared_transaction_data: any;
  site_ac_name: any;
  site_ac_number: any;
  Clear_from_Date_value: any;
  Clear_to_Date_value: any;
  back_Status: string;
  back_trasactionfrom_date: string;
  back_trasactionto_date: string;
  back_receivedfrom_date: string;
  back_receivedto_date: string;
  back_setoff_type: string;
  back_pendingat: string;
  back_selected_projectid: string;
  back_site_ac_number: string;
  select_projectid: any;
  project_wise_project: Array<any> = [];
  userForm: FormGroup;

  singledd1 = {};
  singledd2 = {};
  singledd3 = {};
  Projected_wise_data: Array<any> = [];
  project_list_item: Array<any> = [];
  title1: any;
  company_list_item: Array<any> = [];
  Company_Bank_Account_wise: Array<any> = [];
  title2: any;
  Transaction_set_off_data: Array<any> = [];
  Transaction_set_List: Array<any> = [];
  title3: any;
  Bank_account_number_wise: Array<any> = [];
  Transaction_Set_Off: Array<any> = [];

  account_number_company: Array<any> = [];
  account_name_company: Array<any> = [];
  transaction_type_name: any;
  transaction_mode_name: any;
  itemscc: any[];
  project_wise_controller: Array<any> = [];
  itemsbank: any[];
  itemssetoff: any[];
  loaderhideme: boolean;
  hideme: boolean;

  constructor(private cmn: CommonComponent, private http: Http, private router: Router, public fb: FormBuilder) {

    this.singledd1 = {
      singleSelection: false,
      enableSearchFilter: true,
      searchPlaceholderText: 'Search',
      classes: 'my_dropdown1',
      unSelectAllText: 'UnSelect All',
      // lazyLoading: true,
    };

    this.singledd2 = {
      singleSelection: false,
      enableSearchFilter: true,
      searchPlaceholderText: 'Search',
      classes: 'my_dropdown1',
      unSelectAllText: 'UnSelect All',
      // lazyLoading: true,
    };

    this.singledd3 = {
      singleSelection: false,
      enableSearchFilter: true,
      searchPlaceholderText: 'Search',
      classes: 'my_dropdown1',
      unSelectAllText: 'UnSelect All',
      // lazyLoading: true,
    };


    this.userForm = this.fb.group({
      project_wise_form: [''],
      Bank_account_number_form: [''],
      Transaction_set_off_form: ['']

    });



    $('.page-loader-wrapper').hide();
    sessionStorage.setItem('fromviewpagepredefined', null);
    this.siteList();
    // this.transactionTypeAndMode();

    var arr = localStorage.getItem('View_Pending_transaction_status');




    this.projectchangeFun_remainDropdowndata(JSON.parse(arr).map(String));
    this.siteBankList(JSON.parse(arr).map(String));


    this.view_clreared_transaction_data = eval('(' + sessionStorage.getItem('view_pending_transaction_data') + ')')


    console.log(sessionStorage.getItem("interest_view_pending_transaction_status"));

    if (sessionStorage.getItem("interest_view_pending_transaction_status") == "true") {

      if (sessionStorage.getItem("interest_back_Status") != null) {
        this.back_Status = sessionStorage.getItem("interest_back_Status");
      }

      if (sessionStorage.getItem("interest_back_trasactionfrom_date") != null) {
        var date = sessionStorage.getItem("interest_back_trasactionfrom_date");
        var d = new Date(parseInt(date, 10));
        var datestring_from = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
        $(function () {
          $("#fromDate").val(datestring_from);
        });
        this.back_trasactionfrom_date = sessionStorage.getItem("interest_back_trasactionfrom_date");

        if (this.back_trasactionfrom_date != null) {
          $("#seconddaterow").css("display", "none");
          $("#seconddaterow1").css("display", "none");
          $("#fromDate2").val("");
          $("#toDate2").val("");
        }


      }

      if (sessionStorage.getItem("interest_back_trasactionto_date") != null) {

        var date1 = sessionStorage.getItem("interest_back_trasactionto_date");
        var d = new Date(parseInt(date1, 10));
        var datestring_to = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
        console.log(datestring_to);
        $(function () {
          $("#toDate").val(datestring_to);
        });


        this.back_trasactionto_date = sessionStorage.getItem("interest_back_trasactionto_date");
        if (this.back_trasactionto_date != null) {
          // $("#fistdaterow").css("display","block")
          $("#seconddaterow").css("display", "none");
          $("#seconddaterow1").css("display", "none");
          $("#fromDate2").val("")
          $("#toDate2").val("")

        }



      }

      if (sessionStorage.getItem("interest_back_receivedfrom_date") != null) {

        var date_rec = sessionStorage.getItem("interest_back_receivedfrom_date");
        var d = new Date(parseInt(date_rec, 10));
        var datestring_recfrom = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
        console.log(datestring_recfrom);
        $(function () {
          $("#fromDate2").val(datestring_recfrom);
        });


        this.back_receivedfrom_date = sessionStorage.getItem("interest_back_receivedfrom_date");

        if (this.back_receivedfrom_date != null) {
          $("#fistdaterow").css("display", "none");
          $("#fistdaterow1").css("display", "none")
          $("#fromDate").val("")
          $("#toDate").val("")
        }


      }

      if (sessionStorage.getItem("interest_back_receivedto_date") != null) {

        var date_rec_to = sessionStorage.getItem("interest_back_receivedfrom_date");
        var d = new Date(parseInt(date_rec_to, 10));
        var datestring_rec_to = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
        console.log(datestring_rec_to);
        $(function () {
          $("#toDate2").val(datestring_rec_to);
        });


        this.back_receivedto_date = sessionStorage.getItem("interest_back_receivedto_date");

        if (this.back_receivedto_date != null) {
          $("#fistdaterow").css("display", "none");
          $("#fistdaterow1").css("display", "none")
          $("#fromDate").val("")
          $("#toDate").val("")
        }




      }

      if (sessionStorage.getItem("interest_back_setoff_type") != null) {
        this.back_setoff_type = sessionStorage.getItem("interest_back_setoff_type");
      }

      if (sessionStorage.getItem("interest_back_pendingat") != null) {
        this.back_pendingat = sessionStorage.getItem("interest_back_pendingat");
      }

      if (sessionStorage.getItem("interest_back_selected_projectid") != null) {
        this.back_selected_projectid = sessionStorage.getItem("interest_back_selected_projectid");
      }

      if (sessionStorage.getItem("interest_back_site_ac_number") != null) {
        site_ac_number = sessionStorage.getItem("interest_back_site_ac_number");
      }

      if (sessionStorage.getItem("interest_site_ac_name") != null) {
        site_ac_name = sessionStorage.getItem("interest_site_ac_name");
      }

      if (sessionStorage.getItem("back_selected_project_name") != null) {
        back_selected_project_name = sessionStorage.getItem("back_selected_project_name");
      }




      Transaction_set_off_back = []

      if (sessionStorage.getItem("interest_back_setoff_type") != undefined && sessionStorage.getItem("interest_back_setoff_type") != "" && sessionStorage.getItem("interest_back_setoff_type") != "select" && sessionStorage.getItem("interest_back_setoff_type") != "undefined" && sessionStorage.getItem("interest_back_setoff_type").length != 0) {

        Transaction_set_off_back = [];
        for (var i = 0; i < JSON.parse(sessionStorage.getItem("interest_back_setoff_type")).length; i++) {
          Transaction_set_off_back.push(JSON.parse(sessionStorage.getItem("interest_back_setoff_type"))[i].id);
        }
      } else {
        Transaction_set_off_back = [];
      }



      if (sessionStorage.getItem("interest_back_site_ac_number") != undefined && sessionStorage.getItem("interest_back_site_ac_number") != "" && sessionStorage.getItem("interest_back_site_ac_number") != "select" && sessionStorage.getItem("interest_back_site_ac_number") != "undefined" && sessionStorage.getItem("interest_back_site_ac_number").length != 0) {
        Transaction_bank_account_back = [];
        for (var i = 0; i < JSON.parse(sessionStorage.getItem("interest_back_site_ac_number")).length; i++) {
          Transaction_bank_account_back.push(JSON.parse(sessionStorage.getItem("interest_back_site_ac_number"))[i].id);
        }
      } else {
        Transaction_bank_account_back = [];
      }

      if (sessionStorage.getItem("interest_back_selected_projectid") != undefined && sessionStorage.getItem("interest_back_selected_projectid") != "" && sessionStorage.getItem("interest_back_selected_projectid") != "select" && sessionStorage.getItem("interest_back_selected_projectid") != "undefined" && sessionStorage.getItem("interest_back_selected_projectid").length != 0) {
        Project_Id_back = [];
        for (var i = 0; i < JSON.parse(sessionStorage.getItem("interest_back_selected_projectid")).length; i++) {
          Project_Id_back.push(JSON.parse(sessionStorage.getItem("interest_back_selected_projectid"))[i].id);
        }


      } else {
        Project_Id_back = [];
      }




      console.log(this.back_trasactionfrom_date);
      console.log(this.back_trasactionto_date);
      console.log(this.back_receivedfrom_date);
      console.log(this.back_receivedto_date);
      console.log(this.back_setoff_type);
      console.log(this.back_pendingat);
      console.log(this.back_selected_projectid);



      this.getPenidngTransactions("search", this.back_trasactionfrom_date, this.back_trasactionto_date,
        this.back_receivedfrom_date, this.back_receivedto_date, Transaction_set_off_back, this.back_pendingat, Project_Id_back, Transaction_bank_account_back, site_ac_name)

    } else {
      this.getPenidngTransactions("default", null, null, null, null, null, null, null, null, null);
    }

  }

  ngOnInit() {

    
    this.fg = new FormGroup(
      {
        from: new FormControl(""),
        to: new FormControl("")
      },
      [Validators.required, this.dateRangeValidator]
    );

    this.siteList();
    var self = this;
    $(function () {


      $("#fistdaterow").show();
      $("#fistdaterow1").show();
      $("#seconddaterow").show();
      $("#seconddaterow1").show();

      $('#fromDate').on('change', function (e, date) {
        $("#seconddaterow").css("display", "none");
        $("#seconddaterow1").css("display", "none");
        $("#fromDate2").val("");
        $("#toDate2").val("");


        sessionStorage.removeItem("interest_back_receivedfrom_date");
        sessionStorage.removeItem("interest_back_receivedto_date");


      });

      $('#toDate').on('change', function (e, date) {
        // $("#fistdaterow").css("display","block")
        $("#seconddaterow").css("display", "none");
        $("#seconddaterow1").css("display", "none");
        $("#fromDate2").val("")
        $("#toDate2").val("")


        sessionStorage.removeItem("interest_back_receivedfrom_date");
        sessionStorage.removeItem("interest_back_receivedto_date");

      });

      $('#fromDate2').on('change', function (e, date) {
        $("#fistdaterow").css("display", "none");
        $("#fistdaterow1").css("display", "none")
        $("#fromDate").val("")
        $("#toDate").val("")
        //$("#seconddaterow").css("display","block")

        sessionStorage.removeItem("interest_back_trasactionfrom_date");
        sessionStorage.removeItem("interest_back_trasactionto_date");


      });


      $('#toDate2').on('change', function (e, date) {
        $("#fistdaterow").css("display", "none");
        $("#fistdaterow1").css("display", "none")
        $("#fromDate").val("")
        $("#toDate").val("")
        // $("#seconddaterow").css("display","block")

        sessionStorage.removeItem("interest_back_trasactionfrom_date");
        sessionStorage.removeItem("interest_back_trasactionto_date");


      });
      $("#transaction_setoff_type").select2({
        placeholder: "Search transaction set off type",
        dir: "ltl"
      });
      $("#pending_at").select2({
        placeholder: "Search pending at",
        dir: "ltl"
      });
      $("#projectID").select2({
        placeholder: "Select Project",
        dir: "ltl",
      });
      $("#companybankAcId").select2({
        placeholder: "Search Company Bank Account",
        dir: "ltl"
      });


      $('#pending_at').change(function (e) {
        sessionStorage.removeItem("interest_back_pendingat");
      });


      // $("#transaction_type").select2({
      //   placeholder: "Search transaction type",
      //   dir: "ltl"
      // });
      // $("#transaction_mode").select2({
      //   placeholder: "Search transaction mode",
      //   dir: "ltl"
      // });



      $('#transaction_setoff_type').change(function (e) {
        sessionStorage.removeItem("interest_back_setoff_type");
      });


      $('#companybankAcId').change(function (e) {
        sessionStorage.removeItem("interest_back_site_ac_number");
      });

      $('#transaction_type').change(function (e) {
        sessionStorage.removeItem("Transaction_type");


      });

      $('#transaction_mode').change(function (e) {
        sessionStorage.removeItem("Transaction_Mode");
      });




      $('#projectID').change(function (e) {

        selected_projectid = $(e.target).val();
        project_name = $(e.target).select2('data')[0].text
        // alert(project_name)
        if (selected_projectid == "select") {
          // $("#BlockId").val('select')
          // $('#BlockId').select2().trigger('change');
          // $("#floorSelection").val('select')
          // $('#floorSelection').select2().trigger('change');
          // $("#flatSelection").val('select')
          // $('#flatSelection').select2().trigger('change');



          sessionStorage.removeItem("interest_back_site_ac_number");
          sessionStorage.removeItem("interest_site_ac_name");

          site_ac_number = null;
          site_ac_name = null;
        } else {
          sessionStorage.removeItem("interest_back_site_ac_number");
          sessionStorage.removeItem("interest_site_ac_name");

          site_ac_number = null;
          site_ac_name = null;
          self.view_clreared_transaction_data = null



        }
      })
    })

    $("input").on("change", function () {
      this.setAttribute(
        "data-date",
        moment(this.value, "DD-MM-YYYY")
          .format(this.getAttribute("data-date-format"))
      )
    }).trigger("change")



  }

  private dateRangeValidator: ValidatorFn = (): {
    [key: string]: any;
  } | null => {
    let invalid = false;
    const from = this.fg && this.fg.get("from").value;
    const to = this.fg && this.fg.get("to").value;
    if (from && to) {
      invalid = new Date(from).valueOf() > new Date(to).valueOf();
    }
    return invalid ? { invalidRange: { from, to } } : null;
  };



  showallfun() {

    $("#transaction_type").val('select')
    $('#transaction_type').select2().trigger('change');


    $("#transaction_mode").val('select')
    $('#transaction_mode').select2().trigger('change');

    $("#pending_at").val('select')
    $('#pending_at').select2().trigger('change');

    $("#fromDate").val("");
    $("#toDate").val("");

    $("#fromDate2").val("");
    $("#toDate2").val("");


    this.Projected_wise_data = [];
    this.Company_Bank_Account_wise = [];
    this.Transaction_set_off_data = [];

    this.company_list_item = [];
    this.Transaction_set_List = [];
    this.project_list_item = [];


    this.userForm.reset();

    sessionStorage.removeItem("interest_view_pending_transaction_status");

    this.getPenidngTransactions("default", "", "", "", "", "", "", "", "", "");
  }

  selectedSIDs(item: any) {
    console.log(item);
    this.Projected_wise_data = [];
    this.project_list_item = [];
    for (var i = 0; i < this.title1.length; i++) {
      console.log(this.title1);
      this.Projected_wise_data.push(this.title1[i].id);
      this.project_list_item.push({
        name: this.title1[i].name,
        id: this.title1[i].id
      });

    }
    sessionStorage.removeItem("interest_back_selected_projectid");


    if (this.project_list_item != undefined && this.project_list_item.length != 0 && this.project_list_item != null) {
      sessionStorage.setItem("interest_back_selected_projectid", JSON.stringify(this.project_list_item));
    }

    this.projectchangeFun_remainDropdowndata(this.Projected_wise_data);
    this.siteBankList(this.Projected_wise_data);


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

    sessionStorage.removeItem("interest_back_selected_projectid");

    if (this.project_list_item != undefined && this.project_list_item.length != 0 && this.project_list_item != null) {
      sessionStorage.setItem("interest_back_selected_projectid", JSON.stringify(this.project_list_item));
    }

    this.projectchangeFun_remainDropdowndata(this.Projected_wise_data);
    this.siteBankList(this.Projected_wise_data);

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

    sessionStorage.removeItem("interest_back_selected_projectid");

    if (this.project_list_item != undefined && this.project_list_item.length != 0 && this.project_list_item != null) {
      sessionStorage.setItem("interest_back_selected_projectid", JSON.stringify(this.project_list_item));
      this.projectchangeFun_remainDropdowndata(this.Projected_wise_data);
      this.siteBankList(this.Projected_wise_data);

    } else {

      var arr = localStorage.getItem('View_Pending_transaction_status');

      this.projectchangeFun_remainDropdowndata(JSON.parse(arr).map(String));
      this.siteBankList(JSON.parse(arr).map(String));



    }





  }

  onDeSelectAll(item: any) {
    this.Projected_wise_data = [];
    this.project_list_item = [];
    sessionStorage.removeItem("interest_back_selected_projectid");

    var arr = localStorage.getItem('View_Pending_transaction_status');


    this.projectchangeFun_remainDropdowndata(JSON.parse(arr).map(String));
    this.siteBankList(JSON.parse(arr).map(String));




  }


  company_selectedSIDs(item: any) {
    console.log(item);
    this.company_list_item = [];
    this.Company_Bank_Account_wise = [];

    for (var i = 0; i < this.title2.length; i++) {
      this.Company_Bank_Account_wise.push(this.title2[i].siteAccountId);

      if (this.title2[i].siteBankAccountNumber != undefined) {
        this.company_list_item.push({
          name: this.title2[i].siteBankAccountNumber,
          id: this.title2[i].siteAccountId
        });
      }

    }
    sessionStorage.removeItem("interest_back_site_ac_number");

    if (this.company_list_item != undefined && this.company_list_item.length != 0 && this.company_list_item != null) {
      sessionStorage.setItem("interest_back_site_ac_number", JSON.stringify(this.company_list_item));
    }


  }

  company_onSelectAll(item: any) {
    this.company_list_item = [];
    this.Company_Bank_Account_wise = [];
    for (var i = 0; i < this.title2.length; i++) {
      this.Company_Bank_Account_wise.push(this.title2[i].siteAccountId);
      if (this.title2[i].siteBankAccountNumber != undefined) {
        this.company_list_item.push({
          name: this.title2[i].siteBankAccountNumber,
          id: this.title2[i].siteAccountId
        });
      }
    }
    sessionStorage.removeItem("interest_back_site_ac_number");

    if (this.company_list_item != undefined && this.company_list_item.length != 0 && this.company_list_item != null) {
      sessionStorage.setItem("interest_back_site_ac_number", JSON.stringify(this.company_list_item));
    }


  }

  company_onItemDeSelect(item: any) {
    this.company_list_item = [];
    this.Company_Bank_Account_wise = [];
    for (var i = 0; i < this.title2.length; i++) {
      this.Company_Bank_Account_wise.push(this.title2[i].siteAccountId);
      if (this.title2[i].siteBankAccountNumber != undefined) {
        this.company_list_item.push({
          name: this.title2[i].siteBankAccountNumber,
          id: this.title2[i].siteAccountId
        });
      }
    }

    sessionStorage.removeItem("interest_back_site_ac_number");
    if (this.company_list_item != undefined && this.company_list_item.length != 0 && this.company_list_item != null) {
      sessionStorage.setItem("interest_back_site_ac_number", JSON.stringify(this.company_list_item));
    }

  }

  company_onDeSelectAll(item: any) {
    this.Company_Bank_Account_wise = [];
    this.company_list_item = [];
    sessionStorage.removeItem("interest_back_site_ac_number");

  }




  Transaction_set_off_selectedSIDs(item: any) {

    console.log(item);
    this.Transaction_set_off_data = [];
    this.Transaction_set_List = [];
    for (var i = 0; i < this.title3.length; i++) {
      this.Transaction_set_off_data.push(this.title3[i].id);
      this.Transaction_set_List.push({
        name: this.title3[i].key,
        id: this.title3[i].id
      });
    }

    sessionStorage.removeItem("interest_back_setoff_type");
    // if (this.Transaction_set_List != undefined && this.Transaction_set_List != 0 && this.Transaction_set_List != null) {
    //   sessionStorage.setItem("Transaction_set_off", JSON.stringify(this.Transaction_set_List));
    // }


    console.log(this.Transaction_set_List);
  }

  Transaction_set_off_onSelectAll(item: any) {
    this.Transaction_set_off_data = [];
    this.Transaction_set_List = [];
    for (var i = 0; i < this.title3.length; i++) {
      this.Transaction_set_off_data.push(this.title3[i].id);
      this.Transaction_set_List.push({
        name: this.title3[i].key,
        id: this.title3[i].id
      });
    }

    sessionStorage.removeItem("interest_back_setoff_type");
    // if (this.Transaction_set_List != undefined && this.Transaction_set_List != 0 && this.Transaction_set_List != null) {
    //   sessionStorage.setItem("Transaction_set_off", JSON.stringify(this.Transaction_set_List));
    // }

  }

  companTransaction_set_offy_onItemDeSelect(item: any) {
    this.Transaction_set_off_data = [];
    this.Transaction_set_List = [];
    for (var i = 0; i < this.title3.length; i++) {
      this.Transaction_set_off_data.push(this.title3[i].id);
      this.Transaction_set_List.push({
        name: this.title3[i].key,
        id: this.title3[i].id
      });
    }

    sessionStorage.removeItem("interest_back_setoff_type");
    // if (this.Transaction_set_List != undefined && this.Transaction_set_List != 0 && this.Transaction_set_List != null) {
    //   sessionStorage.setItem("Transaction_set_off", JSON.stringify(this.Transaction_set_List));
    // }

  }

  Transaction_set_off_onDeSelectAll(item: any) {
    this.Transaction_set_off_data = [];
    this.Transaction_set_List = [];
    sessionStorage.removeItem("interest_back_setoff_type");

  }


  /*--------------------------Pending transactions table start------------------*/
  getPenidngTransactions(status, trasactionfrom_date, trasactionto_date, receivedfrom_date, receivedto_date, setoff_type, pendingat, sitename, bankaccountno, bankaccountname) {





    if ($("#companybankAcId").val() == undefined && sessionStorage.getItem("interest_back_site_ac_number") == null && sessionStorage.getItem("interest_site_ac_name") == null) {
      site_ac_number = null;
      site_ac_name = null;
    } else {
      if ($("#companybankAcId").val() !== undefined && sessionStorage.getItem("interest_back_site_ac_number") == null && sessionStorage.getItem("interest_site_ac_name") == null) {

        if ($("#companybankAcId").val() == "select" && sessionStorage.getItem("interest_back_site_ac_number") == null && sessionStorage.getItem("interest_site_ac_name") == null) {
          site_ac_number = null;
          site_ac_name = null;
        } else {
          site_ac_number = $("#companybankAcId").val();
          site_ac_name = $('#companybankAcId').select2('data')[0].text;
        }
      } else if ($("#companybankAcId").val() == undefined && sessionStorage.getItem("interest_back_site_ac_number") != null && sessionStorage.getItem("interest_site_ac_name") != null) {
        site_ac_number = sessionStorage.getItem("interest_back_site_ac_number");
        site_ac_name = sessionStorage.getItem("interest_site_ac_name");
      }


    }




    if (status == undefined) {
      status = null;
    }
    if (trasactionfrom_date == undefined) {
      trasactionfrom_date = null;
    }

    if (trasactionto_date == undefined) {
      trasactionto_date = null;
    }

    if (receivedfrom_date == undefined) {
      receivedfrom_date = null;
    }

    if (receivedto_date == undefined) {
      receivedto_date = null;
    }

    if (setoff_type == undefined || setoff_type == "") {
      setoff_type = [];
    }

    if (pendingat == undefined) {
      pendingat = null;
    }

    if (bankaccountno == undefined || bankaccountno == "") {
      bankaccountno = null;
    }

    if (bankaccountname == undefined || bankaccountname == "") {
      bankaccountname = null;
    }

    if (sitename == null || sitename == "") {
      sitename = [];
    }













  //  $('#tableExport').DataTable().destroy();
    this.loaderhideme = true;

    $('.page-loader-wrapper').show();

    let url = this.cmn.commonUrl + "financial/viewMisPendingTransactions.spring";
    console.log(url)

    let headers = new Headers({ 'Content-Type': 'application/json' });


    //let options = new RequestOptions({ headers: headers }); 
    var body;

    if (status == "search") {
      body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "condition": "transactionStatus",
        "actionUrl": "Interest Waiver",
        "trnCreatedFromDate": trasactionfrom_date,
        "trnCreatedTotoDate": trasactionto_date,
        "receivedFromDate": receivedfrom_date,
        "receivedToDate": receivedto_date,
        "pendingTrnByEmpId": pendingat,
        "transactionTypeId": null,
        "transactionModeId": null,
        "searchBySetOffTypes": setoff_type,
        "siteAccountIds": bankaccountno,
        "bankAccountNumbers": null,
        "siteIds": sitename



      }

      if (status != null) {
        sessionStorage.setItem("interest_back_Status", status);
      }



      if (trasactionfrom_date != null) {
        sessionStorage.setItem("interest_back_trasactionfrom_date", trasactionfrom_date);
      }

      if (trasactionto_date != null) {
        sessionStorage.setItem("interest_back_trasactionto_date", trasactionto_date);
      }

      if (receivedfrom_date != null) {
        sessionStorage.setItem("interest_back_receivedfrom_date", receivedfrom_date);
      }

      if (receivedto_date != null) {
        sessionStorage.setItem("interest_back_receivedto_date", receivedto_date);
      }


      if (pendingat != null) {
        sessionStorage.setItem("interest_back_pendingat", pendingat);
      }

      if (this.Transaction_set_List != undefined && this.Transaction_set_List.length != 0 && this.Transaction_set_List != null) {
        sessionStorage.setItem("interest_back_setoff_type", JSON.stringify(this.Transaction_set_List));
      }

      if (this.company_list_item != undefined && this.company_list_item.length != 0 && this.company_list_item != null) {
        sessionStorage.setItem("interest_back_site_ac_number", JSON.stringify(this.company_list_item));
      }

      if (this.project_list_item != undefined && this.project_list_item.length != 0 && this.project_list_item != null) {

        sessionStorage.setItem("interest_back_selected_projectid", JSON.stringify(this.project_list_item));

      }

      sessionStorage.setItem("interest_view_pending_transaction_status", "true");

    } else {
      body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "condition": "transactionStatus",
        "actionUrl": "Interest Waiver",
        "siteId": sessionStorage.getItem("session_siteId"),
        "siteAccountId": site_ac_number,
        "siteBankAccountNumber": site_ac_name,
      }
    }



    console.log(url);
    console.log(body);
    console.log(JSON.stringify(body))


    this.http.post(url, body).map(res => res.json()).subscribe(resp => {

      console.log(resp);
      this.loaderhideme = false;
      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 200) {
        this.pendingTransData = [];
        this.pendingTransData = resp.responseObjList.finTransactionEntryResponseList;

        

        
        //alert(this.pendingTransData)
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
              }

            })
          });
        }, 2000)

        if (this.pendingTransData.length == 0) {
          this.hideme = true;
        } else {
          this.hideme = false;
        }


        // setTimeout(function () {
        //   $('#tableExport').DataTable();
        // }, 100);
      } else if (resp.responseCode == 440) {
        this.loaderhideme = false;
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        this.loaderhideme = false;
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
      }
    },
      error => {
        this.loaderhideme = false;
        $('.page-loader-wrapper').hide();
        var error = JSON.parse(error._body).responseCode;
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }
  /*--------------------------Mile stone table details End------------------*/

  goToDetails(itemData) {

    console.log(itemData);

    this.viewTransactionData = JSON.stringify(itemData);
    sessionStorage.setItem('view_transaction_data', this.viewTransactionData);

    if (itemData.transactionTypeName == "Receipt" && itemData.transactionModeName == "Cheque") {
      sessionStorage.setItem("headtitle", "View pending interest waiver status");
      if (sessionStorage.getItem("session_deptid") == '997') {
        this.router.navigate(["Accounts-Receipt-Cheque"]);
        return false;
      } else if (sessionStorage.getItem("session_deptid") == '995') {
        this.router.navigate(["crm-receipt-cheque-view"]);
      } else {
        this.router.navigate(["Receipt-Cheque"]);
      }
    } else if (itemData.transactionTypeName == "Receipt" && itemData.transactionModeName == "Online") {
      if (sessionStorage.getItem("session_deptid") == '995') {
        this.router.navigate(["view-crm-receipt-online"]);
        return false;
      } else {
        this.router.navigate(["Receipt-Online"]);
      }
    } else if (itemData.transactionTypeName == "Payment" && itemData.transactionModeName == "Cheque") {
      if (sessionStorage.getItem("session_deptid") == '995') {
        this.router.navigate(["crm-receipt-payment-view"]);
      } else {
        this.router.navigate(["Payment-Cheque"]);
      }
    } else if (itemData.transactionTypeName == "Payment" && itemData.transactionModeName == "Online") {
      this.router.navigate(["Payment-Cheque"]);

    } else if (itemData.transactionTypeName == "Interest Waiver" && itemData.transactionModeName == "Interest Waiver") {
      sessionStorage.setItem("headtitle", "View pending interest waiver status");
      this.router.navigate(["interestwaiver-details"]);

    } else if (itemData.transactionTypeName == "Receipt" && itemData.transactionModeName == "waived off") {

      this.router.navigate(["Approve_Waive-Off"]);

    }


  }
  // else if (itemData.transactionTypeName == "Payment" && itemData.transactionModeName == "Online") {
  //     if (sessionStorage.getItem("session_deptid") == '995') {
  //       this.router.navigate(["payment-online-edit"]);
  //     } else {
  //      this.router.navigate(["payment-online-edit"]);
  //     }
  //   }
  homeClick() {
    this.cmn.commonHomeNavigation();
  }

  searchFun() {
    var date = new Date($("#fromDate").val());
    var milliseconds_transaction_from = date.getTime();
    if (!isNaN(milliseconds_transaction_from)) {
      milliseconds_transaction_from = milliseconds_transaction_from
    } else {
      milliseconds_transaction_from = null
    }

    var date = new Date($("#toDate").val());
    var milliseconds_transaction_to = date.getTime();

    if (!isNaN(milliseconds_transaction_to)) {
      milliseconds_transaction_to = milliseconds_transaction_to
    } else {
      milliseconds_transaction_to = null
    }


    var date = new Date($("#fromDate2").val());
    var milliseconds_received_from = date.getTime();

    if (!isNaN(milliseconds_received_from)) {
      milliseconds_received_from = milliseconds_received_from
    } else {
      // alert("enter")
      milliseconds_received_from = null
    }
    var date = new Date($("#toDate2").val());
    var milliseconds_received_to = date.getTime();


    if (!isNaN(milliseconds_received_to)) {
      milliseconds_received_to = milliseconds_received_to
    } else {
      milliseconds_received_to = null
    }
    var transactiontypeval;
    var pendingat;




    if ($("#transaction_setoff_type").val() == "select") {
      transactiontypeval = null;
    } else {
      transactiontypeval = $("#transaction_setoff_type").val()
    }

    if ($("#pending_at").val() == "select") {
      pendingat = null;
    } else {
      pendingat = $("#pending_at").val()
    }

    if ($("#companybankAcId").val() == "select" || $("#companybankAcId").val() == null) {
      site_ac_number = null;
      site_ac_name = null;
    } else {
      site_ac_number = $("#companybankAcId").val();
      if ($('#companybankAcId').select2('data')[0].text != undefined) {
        site_ac_name = $('#companybankAcId').select2('data')[0].text;
      }

    }

    var startdate = $('#fromDate').val();
    var endDate = $('#toDate').val();
    if (new Date(startdate) > new Date(endDate)) {
      swal('Please select valid transaction Created from date and to date');
      return false;
    }

    var startdate1 = $('#fromDate2').val();
    var endDate1 = $('#toDate2').val();
    if (new Date(startdate1) > new Date(endDate1)) {
      swal('Please select valid received from date and to date');
      return false;
    }



    if (site_ac_number == undefined || site_ac_number == "") {
      site_ac_number = null;
    }

    if (site_ac_name == undefined || site_ac_name == "") {
      site_ac_name = null;
    }

    if (selected_projectid == null) {
      this.select_projectid = null;
    } else {
      this.select_projectid = [selected_projectid];
    }

    if (transactiontypeval == undefined) {
      transactiontypeval = null;
    }


    // if ($("#transaction_type").val() == "" || $("#transaction_type").val() == "select" || $("#transaction_type").val() == undefined || $("#transaction_type").val() == null) {
    //   this.transaction_type_name = null;
    // } else {
    //   this.transaction_type_name = $("#transaction_type").val();
    // }

    // if ($("#transaction_mode").val() == "" || $("#transaction_mode").val() == "select" || $("#transaction_mode").val() == undefined || $("#transaction_mode").val() == null) {
    //   this.transaction_mode_name = null;
    // } else {
    //   this.transaction_mode_name = $("#transaction_mode").val();
    // }


    console.log(sessionStorage.getItem("interest_back_selected_projectid"));
    console.log(sessionStorage.getItem("interest_back_site_ac_number"));
    console.log(sessionStorage.getItem("interest_back_setoff_type"));

    if (sessionStorage.getItem("interest_back_selected_projectid") == null && this.Projected_wise_data == null) {
      this.Projected_wise_data = null;
    } else if (sessionStorage.getItem("interest_back_selected_projectid") == null && this.Projected_wise_data.length == 0) {
      this.Projected_wise_data = null;
    } else {
      this.Projected_wise_data = [];
      for (var i = 0; i < JSON.parse(sessionStorage.getItem("interest_back_selected_projectid")).length; i++) {
        this.Projected_wise_data.push(JSON.parse(sessionStorage.getItem("interest_back_selected_projectid"))[i].id);
      }

    }

    if (sessionStorage.getItem("interest_back_site_ac_number") == null && this.Company_Bank_Account_wise == null) {
      this.Company_Bank_Account_wise = null;
    } else if (sessionStorage.getItem("interest_back_site_ac_number") == null && this.Company_Bank_Account_wise.length == 0) {
      this.Company_Bank_Account_wise = null;
    } else {
      this.Company_Bank_Account_wise = [];
      for (var i = 0; i < JSON.parse(sessionStorage.getItem("interest_back_site_ac_number")).length; i++) {
        this.Company_Bank_Account_wise.push(JSON.parse(sessionStorage.getItem("interest_back_site_ac_number"))[i].id);
      }

    }

    console.log(sessionStorage.getItem("interest_back_setoff_type"));
    console.log(this.Transaction_set_off_data);
  
    if (sessionStorage.getItem("interest_back_setoff_type") == null && this.Transaction_set_off_data == null) {
      this.Transaction_set_off_data = null;
    } else if (sessionStorage.getItem("interest_back_setoff_type") == null && this.Transaction_set_off_data.length == 0) {
      this.Transaction_set_off_data = null;
    } else {
       this.Transaction_set_off_data = [];

      console.log(sessionStorage.getItem("interest_back_setoff_type"));
      console.log(this.Transaction_set_off_data);

      for (var i = 0; i < JSON.parse(sessionStorage.getItem("interest_back_setoff_type")).length; i++) {
        this.Transaction_set_off_data.push(JSON.parse(sessionStorage.getItem("interest_back_setoff_type"))[i].id);
      }

    }



    this.account_number_company = [];
    this.account_name_company = [];

    for (var i = 0; i < this.company_list_item.length; i++) {
      this.account_number_company.push(this.company_list_item[i].id);
      this.account_name_company.push(this.company_list_item[i].name);
    }



    console.log(milliseconds_transaction_from);
    console.log(milliseconds_transaction_to);
    console.log(milliseconds_received_from);
    console.log(milliseconds_received_to);
    console.log(this.Transaction_set_off_data);
    console.log(pendingat);
    console.log(this.Projected_wise_data);
    console.log(this.Company_Bank_Account_wise);
    console.log(this.transaction_type_name);
    console.log(this.transaction_mode_name);



    if (milliseconds_transaction_from == null && milliseconds_transaction_to == null && milliseconds_received_from == null
      && milliseconds_received_to == null && this.Transaction_set_off_data == null && pendingat == null &&
      this.Projected_wise_data == null && this.Company_Bank_Account_wise == null
      && this.transaction_type_name == null && this.transaction_mode_name == null) {
      swal("Please select any option to continue!");
      return false;
    }



  


    this.getPenidngTransactions("search", milliseconds_transaction_from, milliseconds_transaction_to, milliseconds_received_from,
      milliseconds_received_to, this.Transaction_set_off_data, pendingat, this.Projected_wise_data, this.Company_Bank_Account_wise, this.account_name_company)
  }

  /*-----------------Getting Project(site) list Start---------------------*/
  siteList() {
    $('.page-loader-wrapper').show();
    var arr = localStorage.getItem('View_Pending_transaction_status');
    let url = this.cmn.commonUrl + "site/site.spring";
    // http://106.51.38.64:9999/employeeservice/site/site.spring

    let headers = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteIds": JSON.parse(arr).map(String)
    }

    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 200) {

        this.project_wise_project = resp.responseObjList;
        this.project_wise_project.forEach((o: any, i) => (o.id = o.id));

        console.log(sessionStorage.getItem("interest_back_selected_projectid"));

        if (sessionStorage.getItem("interest_back_selected_projectid") != null && sessionStorage.getItem("interest_back_selected_projectid") != undefined && sessionStorage.getItem("interest_back_selected_projectid").length != 0) {
          this.itemscc = [];
          for (var i = 0; i < JSON.parse(sessionStorage.getItem("interest_back_selected_projectid")).length; i++) {
            console.log(JSON.parse(sessionStorage.getItem("interest_back_selected_projectid"))[i].id);
            console.log(JSON.parse(sessionStorage.getItem("interest_back_selected_projectid"))[i].name);

            this.itemscc.push({
              id: parseInt(JSON.parse(sessionStorage.getItem("interest_back_selected_projectid"))[i].id),
              name: JSON.parse(sessionStorage.getItem("interest_back_selected_projectid"))[i].name
            });

            this.project_wise_controller.push(JSON.parse(sessionStorage.getItem("interest_back_selected_projectid"))[i].id);
          }

          this.userForm.patchValue({
            project_wise_form: this.itemscc

          });


          this.siteBankList(this.project_wise_controller);
          this.projectchangeFun_remainDropdowndata(this.project_wise_controller);









        }


      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        //alert(resp.status);
        swal(resp.errors[0]);
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
  Bank_Account_Number(project_wise_controller: any) {
    throw new Error('Method not implemented.');
  }
  Transaction_Set_Off_Type(project_wise_controller: any, arg1: string) {
    throw new Error('Method not implemented.');
  }
  /*-----------------Getting Project(site) list End---------------------*/

  projectchangeFun_remainDropdowndata(siteIds) {
    $('.page-loader-wrapper').show();

    let url = this.cmn.commonUrl + "financial/loadTransactionStatusData.spring";
    // http://106.51.38.64:9999/employeeservice/site/site.spring

    let headers = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteIds": siteIds,
      "flatIds": [],
      "bookingFormIds": [],
      "requestUrl": "transactionStatus",
      "actionUrl": "Interest Waiver",
      "transactionTypeId": "3",
      "transactionModeId": "3"


    }

    console.log(url);
    console.log(JSON.stringify(body));

    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      console.log(JSON.stringify(resp));
      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 200) {
        $('#pending_at').html("");
        $('#pending_at').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.pendingLevelEmpDetails.length; i++) {
          $('#pending_at').append("<option value='" + resp.responseObjList.pendingLevelEmpDetails[i].EMP_ID + "'>" + resp.responseObjList.pendingLevelEmpDetails[i].EMP_NAME + "</option>");
        }

        this.Transaction_Set_Off = resp.responseObjList.paymentSetOffData;
        this.Transaction_Set_Off.forEach((o: any, i) => (o.id = o.value));


        console.log(sessionStorage.getItem("interest_back_setoff_type"));

        if (sessionStorage.getItem("interest_back_setoff_type") != null && sessionStorage.getItem("interest_back_setoff_type") != undefined && sessionStorage.getItem("interest_back_setoff_type").length != 0) {
          this.itemssetoff = [];
          for (var i = 0; i < JSON.parse(sessionStorage.getItem("interest_back_setoff_type")).length; i++) {
            console.log(JSON.parse(sessionStorage.getItem("interest_back_setoff_type"))[i].id);
            console.log(JSON.parse(sessionStorage.getItem("interest_back_setoff_type"))[i].name);

            this.itemssetoff.push({
              key: JSON.parse(sessionStorage.getItem("interest_back_setoff_type"))[i].name,
              id: JSON.parse(sessionStorage.getItem("interest_back_setoff_type"))[i].id
            });

            console.log(this.itemssetoff);
          }

          this.userForm.patchValue({
            Transaction_set_off_form: this.itemssetoff

          });

          console.log(this.userForm);


        }





        if (sessionStorage.getItem("interest_back_pendingat") != null && sessionStorage.getItem("interest_back_pendingat") != undefined && sessionStorage.getItem("interest_back_pendingat") != 'select') {
          $('#pending_at').val(sessionStorage.getItem("interest_back_pendingat"));
        }


      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        //alert(resp.status);
        swal(resp.errors[0]);
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
  getToday(): string {
    return new Date().toISOString().split('T')[0]
  }



  trans_from_date() {
    $("#fromDate").val("");
    sessionStorage.removeItem("interest_back_trasactionfrom_date");

  }

  trans_to_date() {
    $("#toDate").val("");
    sessionStorage.removeItem("interest_back_trasactionto_date");
  }

  received_from_date() {
    $("#fromDate2").val("");
    sessionStorage.removeItem("interest_back_receivedfrom_date");
  }

  received_to_date() {
    $("#toDate2").val("");
    sessionStorage.removeItem("interest_back_receivedto_date");
  }

  siteBankList(siteIds) {


    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/viewFinProjectAccountData.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteIds": siteIds,
    }

    console.log(body);

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      console.log(JSON.stringify(resp));

      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();

        this.Bank_account_number_wise = resp.responseObjList.finProjectAccountResponseList;
        this.Bank_account_number_wise.forEach((o: any, i) => (o.id = o.siteAccountId));



        console.log(sessionStorage.getItem("interest_back_site_ac_number"));


        if (sessionStorage.getItem("interest_back_site_ac_number") != null && sessionStorage.getItem("interest_back_site_ac_number") != undefined && sessionStorage.getItem("back_site_ac_number").length != 0) {
          this.itemsbank = [];
          for (var i = 0; i < JSON.parse(sessionStorage.getItem("interest_back_site_ac_number")).length; i++) {
            console.log(JSON.parse(sessionStorage.getItem("interest_back_site_ac_number"))[i].id);
            console.log(JSON.parse(sessionStorage.getItem("interest_back_site_ac_number"))[i].name);

            this.itemsbank.push({
              id: parseInt(JSON.parse(sessionStorage.getItem("interest_back_site_ac_number"))[i].id),
              siteBankAccountNumber: JSON.parse(sessionStorage.getItem("interest_back_site_ac_number"))[i].name
            });
          }

          this.userForm.patchValue({
            Bank_account_number_form: this.itemsbank

          });


        }


      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        swal(resp.status);
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

  ctreport() {
    // alert("ok")
    this.router.navigate(["ClearedTransactionReport"]);
  }



  /*------------------------Transaction type start-------------------*/
  // transactionTypeAndMode() {
  //   $('.page-loader-wrapper').show();
  //   let url = this.cmn.commonUrl + "financial/viewFinTransactionTypeModeData.spring";
  //   let headers = new Headers({ 'Content-Type': 'application/json' });
  //   let options = new RequestOptions({ headers: headers });
  //   var body = {
  //     "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
  //     "condition": "fetchTransactionData",
  //     "actionUrl": "ApproveTransaction"
  //   }
  //   this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
  //     $('.page-loader-wrapper').hide();
  //     if (resp.responseCode == 200) {
  //       $('#transaction_type').html('');
  //       $('#transaction_type').append('<option value="select">--Select--</option>');
  //       $('#transaction_mode').html('');
  //       $('#transaction_mode').append('<option value="select">--Select--</option>');
  //       for (var i = 0; i < resp.responseObjList.finTrnasactionTypeResponseList.length; i++) {
  //         $('#transaction_type').append("<option value='" + resp.responseObjList.finTrnasactionTypeResponseList[i].transactionTypeId + "'>" + resp.responseObjList.finTrnasactionTypeResponseList[i].name + "</option>");
  //       }

  //       for (var i = 0; i < resp.responseObjList.finTransactionModeResponseList.length; i++) {
  //         $('#transaction_mode').append("<option value='" + resp.responseObjList.finTransactionModeResponseList[i].transactionModeId + "'>" + resp.responseObjList.finTransactionModeResponseList[i].name + "</option>");

  //       }

  //       if (sessionStorage.getItem("interest_transaction_type_name") != undefined && sessionStorage.getItem("interest_transaction_type_name") != "undefined" && sessionStorage.getItem("interest_transaction_type_name") != "" && sessionStorage.getItem("interest_transaction_type_name") != "select") {
  //         Transaction_type_back = sessionStorage.getItem("interest_transaction_type_name");
  //         $("#transaction_type").val(Transaction_type_back);
  //       }

  //       if (sessionStorage.getItem("interest_transaction_mode_name") != undefined && sessionStorage.getItem("interest_transaction_mode_name") != "undefined" && sessionStorage.getItem("interest_transaction_mode_name") != "" && sessionStorage.getItem("interest_transaction_mode_name") != "select") {
  //         Transaction_Mode_back = sessionStorage.getItem("interest_transaction_mode_name");
  //         $("#transaction_mode").val(Transaction_Mode_back);
  //       }



  //     } else if (resp.responseCode == 440) {
  //       swal("Your Session has been Timed Out!", "Please login once again.", "error");
  //       this.router.navigate([""]);
  //     } else {
  //       $('.page-loader-wrapper').hide();
  //       swal(resp.errors[0]);
  //       return false;
  //     }

  //   },
  //     error => {
  //       var error = JSON.parse(error._body).responseCode;
  //       $('.page-loader-wrapper').hide();
  //       if (error == 440) {
  //     swal("Your Session has been Timed Out!", "Please login once again.", "error");
  //         this.router.navigate([""]);
  //       }
  //     }
  //   );

  // }


}
