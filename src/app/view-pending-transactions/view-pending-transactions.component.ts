import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { RequestOptions, Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validator, FormControl, Validators, ValidatorFn } from '@angular/forms';
declare const $: any;
declare const swal: any;
var buttonType;
var optionalButtonType;
var userRoleListTemp = [];
var maindivarray = [];
var userRoleListTemp1 = [];
var body;
var temp;
var selected_projectid;
var site_name;
var selected_bank_account_number;
var selected_transaction_set_off;

var Transaction_type_back;
var Transaction_Mode_back;
var Transaction_set_off_back = [];
var Transaction_bank_account_back = [];
var Project_Id_back = []
@Component({
  selector: 'app-view-pending-transactions',
  templateUrl: './view-pending-transactions.component.html',
  styleUrls: ['./view-pending-transactions.component.sass']
})
export class ViewPendingTransactionsComponent implements OnInit {
  project_wise_project: Array<any> = [];
  pendingTransData: any;
  viewTransactionData: any;
  userRoleListToSave: any = [];
  controller = [];
  ischecked: any;
  ChequeClearanceDate: any;
  arrOfObj: { name: string; }[];
  injectObj: {};
  buttonType: string;
  newArrOfObjval: any = [];
  optionalButtonType: string;
  approvebtns_showHide: boolean = true;
  checkboxes: any;
  chequedepositeDate_showHide: boolean = false
  chequedepositDateDate: any;
  search_showHide: boolean = true;
  depidval: boolean = false;
  flatdetailsData: any;
  depositedateval: any;
  Array: string[] = [];
  temp: any;
  isDisabled: boolean = true;
  deptId: any;
  roleId: any;
  selected_projectid_value: Array<any> = [];
  selected_bank_account_value: Array<any> = [];
  selected_transaction_set_off_value: Array<any> = [];
  transaction_type_name: any;
  transaction_mode_name: any;

  singledd1 = {};
  singledd2 = {};
  singledd3 = {};
  userForm: FormGroup;
  Projected_wise_data: Array<any> = [];

  Bank_account_number_wise: Array<any> = [];
  Company_Bank_Account_wise: Array<any> = [];

  Transaction_Set_Off: Array<any> = [];
  Transaction_set_off_data: Array<any> = [];

  project_list_item: Array<any> = [];
  selected_projectid_name: Array<any> = [];
  itemscc: Array<any> = [];
  company_list_item: Array<any> = [];
  itemsbank: Array<any> = [];
  Transaction_set_List: any;
  itemssetoff: Array<any> = [];
  title1: any;
  title2: any;
  title3: any;
  hideme: boolean = false;
  loaderhideme: boolean = false;

  project_wise_controller: Array<any> = [];
  constructor(private cmn: CommonComponent, private http: Http, private router: Router, public fb: FormBuilder) {

    sessionStorage.removeItem("unclear");
    this.userForm = this.fb.group({
      project_wise_form: [''],
      Bank_account_number_form: [''],
      Transaction_set_off_form: ['']

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




    sessionStorage.setItem('fromviewpagepredefined', null);
    this.deptId = sessionStorage.getItem("session_deptid");
    this.roleId = sessionStorage.getItem("session_roleId");
    // alert(sessionStorage.getItem("session_deptName"))
    $('.page-loader-wrapper').hide();
    if (sessionStorage.getItem("session_deptName") == "ACCOUNTS") {
      this.chequedepositeDate_showHide = true;

    }
    this.transactionTypeAndMode();

    this.siteList();



    if (sessionStorage.getItem("view_pending_approval_status") == "true") {

      if (sessionStorage.getItem("Transaction_type") != undefined && sessionStorage.getItem("Transaction_type") != "undefined" && sessionStorage.getItem("Transaction_type") != "" && sessionStorage.getItem("Transaction_type") != "select") {
        Transaction_type_back = sessionStorage.getItem("Transaction_type");


      } else {
        Transaction_type_back = null;
      }

      if (sessionStorage.getItem("Transaction_Mode") != undefined && sessionStorage.getItem("Transaction_Mode") != "undefined" && sessionStorage.getItem("Transaction_Mode") != "" && sessionStorage.getItem("Transaction_Mode") != "select") {
        Transaction_Mode_back = sessionStorage.getItem("Transaction_Mode");



      } else {
        Transaction_Mode_back = null;
      }


      console.log(sessionStorage.getItem("Transaction_set_off"));
      console.log(sessionStorage.getItem("Transaction_bank_account"));
      console.log(sessionStorage.getItem("Project_back_Id"));

      if (sessionStorage.getItem("Transaction_set_off") != undefined && sessionStorage.getItem("Transaction_set_off") != "" && sessionStorage.getItem("Transaction_set_off") != "select" && sessionStorage.getItem("Transaction_set_off") != "undefined" && sessionStorage.getItem("Transaction_set_off").length != 0) {

        Transaction_bank_account_back = [];
        for (var i = 0; i < JSON.parse(sessionStorage.getItem("Transaction_set_off")).length; i++) {
          Transaction_set_off_back.push(JSON.parse(sessionStorage.getItem("Transaction_set_off"))[i].id);
        }
      } else {
        Transaction_set_off_back = [];
      }



      if (sessionStorage.getItem("Transaction_bank_account") != undefined && sessionStorage.getItem("Transaction_bank_account") != "" && sessionStorage.getItem("Transaction_bank_account") != "select" && sessionStorage.getItem("Transaction_bank_account") != "undefined" && sessionStorage.getItem("Transaction_bank_account").length != 0) {
        Transaction_bank_account_back = [];
        for (var i = 0; i < JSON.parse(sessionStorage.getItem("Transaction_bank_account")).length; i++) {
          Transaction_bank_account_back.push(JSON.parse(sessionStorage.getItem("Transaction_bank_account"))[i].id);
        }
      } else {
        Transaction_bank_account_back = [];
      }

      if (sessionStorage.getItem("Project_back_Id") != undefined && sessionStorage.getItem("Project_back_Id") != "" && sessionStorage.getItem("Project_back_Id") != "select" && sessionStorage.getItem("Project_back_Id") != "undefined" && sessionStorage.getItem("Project_back_Id").length != 0) {
        Project_Id_back = [];
        for (var i = 0; i < JSON.parse(sessionStorage.getItem("Project_back_Id")).length; i++) {
          Project_Id_back.push(JSON.parse(sessionStorage.getItem("Project_back_Id"))[i].id);
        }


      } else {
        Project_Id_back = [];
      }

      this.getPenidngTransactions("back_option");

      this.Bank_Account_Number(Project_Id_back);
      this.Transaction_Set_Off_Type(Project_Id_back, "");

    } else {
      var arr = localStorage.getItem('Pending_Transactions_For_Approval');
      this.Bank_Account_Number(JSON.parse(arr).map(String));
      this.Transaction_Set_Off_Type(JSON.parse(arr).map(String), "");

    }
  }

  ngOnInit() {
    if (sessionStorage.getItem("session_deptName") == "ACCOUNTS") {

      this.depidval = true;
    }
    $(function () {

      $('#chequedepositDate').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
        minDate: new Date(),
        clearButton: true,
        weekStart: 1,
        time: false
      });
      $('#chequereflectionDate').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
        minDate: new Date(),
        clearButton: true,
        weekStart: 1,
        time: false
      });
      $('#chequeHandoverDate').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
        minDate: new Date(),
        clearButton: true,
        weekStart: 1,
        time: false
      });
    })
    $("#transaction_type").select2({
      placeholder: "Search transaction type",
      dir: "ltl"
    });
    $("#transaction_mode").select2({
      placeholder: "Search transaction mode",
      dir: "ltl"
    });

    var self = this;

    $(function () {
      $("#projectID").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });

      $("#Bank_account_number").select2({
        placeholder: "Select Company Account Number",
        dir: "ltl",
      });

      $("#Transaction_set_offtype").select2({
        placeholder: "Select transaction set off type",
        dir: "ltl",
      });

      $('#transaction_type').change(function (e) {
        sessionStorage.removeItem("Transaction_type");


      });

      $('#transaction_mode').change(function (e) {
        sessionStorage.removeItem("Transaction_Mode");
      });



      // $('#projectID').change(function (e) {

      //   selected_projectid = $(e.target).val();

      //   if (selected_projectid.length == 0) {
      //     selected_projectid = null;
      //     site_name = null;
      //     sessionStorage.removeItem("Project_back_Id");

      //     $("#Bank_account_number").val('select')
      //     $('#Bank_account_number').select2().trigger('change');

      //   } else {

      //     selected_projectid = $(e.target).val();
      //     site_name = $('#projectID').select2('data')[0].text;
      //     self.Bank_Account_Number(selected_projectid);
      //     self.Transaction_Set_Off_Type(selected_projectid, site_name);

      //   }
      // })


      // $('#Bank_account_number').change(function (e) {

      //   selected_bank_account_number = $(e.target).val();
      //   if (selected_bank_account_number.length == 0) {
      //     selected_bank_account_number = null;
      //     sessionStorage.removeItem("Transaction_bank_account");
      //   } else {
      //     selected_bank_account_number = $(e.target).val();

      //   }
      // })


      // $('#Transaction_set_offtype').change(function (e) {

      //   selected_transaction_set_off = $(e.target).val();
      //   if (selected_transaction_set_off.length == 0) {
      //     selected_transaction_set_off = null;
      //     sessionStorage.removeItem("Transaction_set_off");
      //   } else {
      //     selected_transaction_set_off = $(e.target).val();

      //   }
      // })




    });
  }


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

    this.Bank_Account_Number(this.Projected_wise_data);

    this.Transaction_Set_Off_Type(this.Projected_wise_data, "");

    //this.Transaction_Set_Off_Type(selected_projectid, site_name);


    sessionStorage.removeItem("Project_back_Id");


    if (this.project_list_item != undefined && this.project_list_item.length != 0 && this.project_list_item != null) {
      sessionStorage.setItem("Project_back_Id", JSON.stringify(this.project_list_item));
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

    sessionStorage.removeItem("Project_back_Id");

    if (this.project_list_item != undefined && this.project_list_item.length != 0 && this.project_list_item != null) {
      sessionStorage.setItem("Project_back_Id", JSON.stringify(this.project_list_item));
    }

    this.Bank_Account_Number(this.Projected_wise_data);
    this.Transaction_Set_Off_Type(this.Projected_wise_data, "");
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

    sessionStorage.removeItem("Project_back_Id");

    if (this.project_list_item != undefined && this.project_list_item.length != 0 && this.project_list_item != null) {
      sessionStorage.setItem("Project_back_Id", JSON.stringify(this.project_list_item));

      this.Bank_Account_Number(this.Projected_wise_data);
      this.Transaction_Set_Off_Type(this.Projected_wise_data, "");
    } else {
      var arr = localStorage.getItem('Pending_Transactions_For_Approval');


      this.Bank_Account_Number(JSON.parse(arr).map(String));

      this.Transaction_Set_Off_Type(JSON.parse(arr).map(String), "");

    }




  }

  onDeSelectAll(item: any) {
    this.Projected_wise_data = [];
    this.project_list_item = [];
    sessionStorage.removeItem("Project_back_Id");

    var arr = localStorage.getItem('Pending_Transactions_For_Approval');


    this.Bank_Account_Number(JSON.parse(arr).map(String));
    this.Transaction_Set_Off_Type(JSON.parse(arr).map(String), "");





  }





  company_selectedSIDs(item: any) {
    console.log(item);
    this.company_list_item = [];
    this.Company_Bank_Account_wise = [];

    for (var i = 0; i < this.title2.length; i++) {
      this.Company_Bank_Account_wise.push(this.title2[i].id);

      if (this.title2[i].siteBankAccountNumber != undefined) {
        this.company_list_item.push({
          name: this.title2[i].siteBankAccountNumber,
          id: this.title2[i].siteAccountId
        });
      }

    }
    sessionStorage.removeItem("Transaction_bank_account");

    if (this.company_list_item != undefined && this.company_list_item.length != 0 && this.company_list_item != null) {
      sessionStorage.setItem("Transaction_bank_account", JSON.stringify(this.company_list_item));
    }

    console.log(this.company_list_item);

  }

  company_onSelectAll(item: any) {
    this.company_list_item = [];
    this.Company_Bank_Account_wise = [];
    for (var i = 0; i < this.title2.length; i++) {
      this.Company_Bank_Account_wise.push(this.title2[i].id);
      if (this.title2[i].siteBankAccountNumber != undefined) {
        this.company_list_item.push({
          name: this.title2[i].siteBankAccountNumber,
          id: this.title2[i].siteAccountId
        });
      }
    }
    sessionStorage.removeItem("Transaction_bank_account");

    if (this.company_list_item != undefined && this.company_list_item.length != 0 && this.company_list_item != null) {
      sessionStorage.setItem("Transaction_bank_account", JSON.stringify(this.company_list_item));
    }
    console.log(this.company_list_item);

  }

  company_onItemDeSelect(item: any) {
    this.company_list_item = [];
    this.Company_Bank_Account_wise = [];
    for (var i = 0; i < this.title2.length; i++) {
      this.Company_Bank_Account_wise.push(this.title2[i].id);
      if (this.title2[i].siteBankAccountNumber != undefined) {
        this.company_list_item.push({
          name: this.title2[i].siteBankAccountNumber,
          id: this.title2[i].siteAccountId
        });
      }
    }

    sessionStorage.removeItem("Transaction_bank_account");
    if (this.company_list_item != undefined && this.company_list_item.length != 0 && this.company_list_item != null) {
      sessionStorage.setItem("Transaction_bank_account", JSON.stringify(this.company_list_item));
    }

  }

  company_onDeSelectAll(item: any) {
    this.Company_Bank_Account_wise = [];
    this.company_list_item = [];
    sessionStorage.removeItem("Transaction_bank_account");

  }




  Transaction_set_off_selectedSIDs(item: any) {
    this.Transaction_set_off_data = [];
    this.Transaction_set_List = [];
    for (var i = 0; i < this.title3.length; i++) {
      this.Transaction_set_off_data.push(this.title3[i].id);
      this.Transaction_set_List.push({
        name: this.title3[i].key,
        id: this.title3[i].id
      });
    }

    sessionStorage.removeItem("Transaction_set_off");
    if (this.Transaction_set_List != undefined && this.Transaction_set_List != 0 && this.Transaction_set_List != null) {
      sessionStorage.setItem("Transaction_set_off", JSON.stringify(this.Transaction_set_List));
    }


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

    sessionStorage.removeItem("Transaction_set_off");
    if (this.Transaction_set_List != undefined && this.Transaction_set_List != 0 && this.Transaction_set_List != null) {
      sessionStorage.setItem("Transaction_set_off", JSON.stringify(this.Transaction_set_List));
    }

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

    sessionStorage.removeItem("Transaction_set_off");
    if (this.Transaction_set_List != undefined && this.Transaction_set_List != 0 && this.Transaction_set_List != null) {
      sessionStorage.setItem("Transaction_set_off", JSON.stringify(this.Transaction_set_List));
    }

  }

  Transaction_set_off_onDeSelectAll(item: any) {
    this.Transaction_set_off_data = [];
    this.Transaction_set_List = [];
    sessionStorage.removeItem("Transaction_set_off");

  }




  showallfun() {





    $("#transaction_type").val('select')
    $('#transaction_type').select2().trigger('change');


    $("#transaction_mode").val('select')
    $('#transaction_mode').select2().trigger('change');


    this.Projected_wise_data = [];
    this.Company_Bank_Account_wise = [];
    this.Transaction_set_off_data = [];

    this.company_list_item = [];
    this.Transaction_set_List = [];
    this.project_list_item = [];

    sessionStorage.removeItem("Transaction_type");
    sessionStorage.removeItem("Transaction_Mode");
    sessionStorage.removeItem("Transaction_set_off");
    sessionStorage.removeItem("Transaction_bank_account");
    sessionStorage.removeItem("Project_back_Id");
    sessionStorage.removeItem("view_pending_approval_status");

    Transaction_set_off_back = [];
    Transaction_bank_account_back = [];
    Project_Id_back = []



    this.userForm.reset();


    this.getPenidngTransactions("default");


    // this.userForm.patchValue({
    //   project_wise_form : "",
    //   Bank_account_number_form : "",
    //   Transaction_set_off_form : "",

    // });


  }

  /*--------------------------Pending transactions table start------------------*/

  /*-----------------Getting Project(site) list Start---------------------*/
  siteList() {
    var arr = localStorage.getItem('Pending_Transactions_For_Approval');

    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "site/site.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteIds": JSON.parse(arr).map(String)
    }



    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      if (resp.responseCode == 200) {

        this.project_wise_project = resp.responseObjList;
        this.project_wise_project.forEach((o: any, i) => (o.id = o.id));

        // $('#projectID').html("");
        // for (var i = 0; i < resp.responseObjList.length; i++) {
        //   $('#projectID').append("<option value='" + resp.responseObjList[i].id + "'>" + resp.responseObjList[i].name + "</option>");
        // }

        console.log(sessionStorage.getItem("Project_back_Id"));

        if (sessionStorage.getItem("Project_back_Id") != null && sessionStorage.getItem("Project_back_Id") != undefined && sessionStorage.getItem("Project_back_Id").length != 0) {
          this.itemscc = [];
          for (var i = 0; i < JSON.parse(sessionStorage.getItem("Project_back_Id")).length; i++) {
            console.log(JSON.parse(sessionStorage.getItem("Project_back_Id"))[i].id);
            console.log(JSON.parse(sessionStorage.getItem("Project_back_Id"))[i].name);

            this.itemscc.push({
              id: parseInt(JSON.parse(sessionStorage.getItem("Project_back_Id"))[i].id),
              name: JSON.parse(sessionStorage.getItem("Project_back_Id"))[i].name
            });

            this.project_wise_controller.push(JSON.parse(sessionStorage.getItem("Project_back_Id"))[i].id);
          }

          this.userForm.patchValue({
            project_wise_form: this.itemscc

          });


          this.Bank_Account_Number(this.project_wise_controller);
          this.Transaction_Set_Off_Type(this.project_wise_controller, "");

        }

        // this.userForm.patchValue({
        // project_wise_form: [''],
        //  Bank_account_number_form: [''],
        //  Transaction_set_off_form: ['']
        //project_wise_form: [{ name: this.controller_data[0].clientName, id: parseInt(this.controller_data[0].clientId) }],

        //});



        // if (sessionStorage.getItem("Project_back_Id") != undefined && sessionStorage.getItem("Project_back_Id") != "" && sessionStorage.getItem("Project_back_Id") != "select" && sessionStorage.getItem("Project_back_Id") != "undefined") {
        //   $('#projectID').val(JSON.parse(sessionStorage.getItem("Project_back_Id")));

        //   this.Bank_Account_Number(JSON.parse(sessionStorage.getItem("Project_back_Id")));
        //   this.Transaction_Set_Off_Type(selected_projectid, "");

        // }





        //  if (JSON.parse(sessionStorage.getItem("Siteids")).map(String)[0] != undefined, JSON.parse(sessionStorage.getItem("Siteids")).map(String)[0] != null || JSON.parse(sessionStorage.getItem("Siteids")).map(String)[0] != "null" || JSON.parse(sessionStorage.getItem("Siteids")).map(String)[0] !== "undefined" || JSON.parse(sessionStorage.getItem("Siteids")).map(String)[0] !== undefined) {
        //  $('#projectID').val(JSON.parse(sessionStorage.getItem("Siteids")).map(String)[0]);

        //  this.flatsitewisechange(JSON.parse(sessionStorage.getItem("Siteids")).map(String)[0]);
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


  /*-----------------Getting Project(site) list end---------------------*/

  Bank_Account_Number(siteid) {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/viewFinProjectAccountData.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteIds": siteid
    }

    console.log(body);

    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      console.log(resp);

      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {


        this.Bank_account_number_wise = resp.responseObjList.finProjectAccountResponseList;
        this.Bank_account_number_wise.forEach((o: any, i) => (o.id = o.siteAccountId));

        console.log(sessionStorage.getItem("Transaction_bank_account"));


        if (sessionStorage.getItem("Transaction_bank_account") != null && sessionStorage.getItem("Transaction_bank_account") != undefined && sessionStorage.getItem("Transaction_bank_account").length != 0) {
          this.itemsbank = [];
          for (var i = 0; i < JSON.parse(sessionStorage.getItem("Transaction_bank_account")).length; i++) {
            console.log(JSON.parse(sessionStorage.getItem("Transaction_bank_account"))[i].id);
            console.log(JSON.parse(sessionStorage.getItem("Transaction_bank_account"))[i].name);

            this.itemsbank.push({
              id: parseInt(JSON.parse(sessionStorage.getItem("Transaction_bank_account"))[i].id),
              siteBankAccountNumber: JSON.parse(sessionStorage.getItem("Transaction_bank_account"))[i].name
            });
          }

          this.userForm.patchValue({
            Bank_account_number_form: this.itemsbank

          });


        }


        // $('#Bank_account_number').html("");
        // for (var i = 0; i < resp.responseObjList.finProjectAccountResponseList.length; i++) {
        //   $('#Bank_account_number').append("<option value='" + resp.responseObjList.finProjectAccountResponseList[i].siteAccountId + "'>" + resp.responseObjList.finProjectAccountResponseList[i].siteBankAccountNumber + "</option>");
        // }
        // if (sessionStorage.getItem("Transaction_bank_account") != undefined && sessionStorage.getItem("Transaction_bank_account") != "" && sessionStorage.getItem("Transaction_bank_account") != "select" && sessionStorage.getItem("Transaction_bank_account") != "undefined") {
        //   $('#Bank_account_number').val(JSON.parse(sessionStorage.getItem("Transaction_bank_account")));
        // }


      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        $('.page-loader-wrapper').hide();
        //swal(resp.errors[0]);
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


  Transaction_Set_Off_Type(Siteids, siteName) {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/loadTransactionStatusData.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteIds": Siteids,
      "flatIds": [],
      "bookingFormIds": [],
      "requestUrl": "transactionStatus"

    }

    console.log(body);

    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      console.log(resp);

      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {

        this.Transaction_Set_Off = resp.responseObjList.paymentSetOffData;
        this.Transaction_Set_Off.forEach((o: any, i) => (o.id = o.value));



        console.log(sessionStorage.getItem("Transaction_set_off"));

        if (sessionStorage.getItem("Transaction_set_off") != null && sessionStorage.getItem("Transaction_set_off") != undefined && sessionStorage.getItem("Transaction_set_off").length != 0) {
          this.itemssetoff = [];
          for (var i = 0; i < JSON.parse(sessionStorage.getItem("Transaction_set_off")).length; i++) {
            console.log(JSON.parse(sessionStorage.getItem("Transaction_set_off"))[i].id);
            console.log(JSON.parse(sessionStorage.getItem("Transaction_set_off"))[i].name);

            this.itemssetoff.push({
              key: JSON.parse(sessionStorage.getItem("Transaction_set_off"))[i].name,
              id: JSON.parse(sessionStorage.getItem("Transaction_set_off"))[i].id
            });

            console.log(this.itemssetoff);
          }

          this.userForm.patchValue({
            Transaction_set_off_form: this.itemssetoff

          });

          console.log(this.userForm);


        }




        // $('#Transaction_set_offtype').html("");
        // for (var i = 0; i < resp.responseObjList.paymentSetOffData.length; i++) {
        //   $('#Transaction_set_offtype').append("<option value='" + resp.responseObjList.paymentSetOffData[i].value + "'>" + resp.responseObjList.paymentSetOffData[i].key + "</option>");
        // }

        // if (sessionStorage.getItem("Transaction_set_off") != undefined && sessionStorage.getItem("Transaction_set_off") != "" && sessionStorage.getItem("Transaction_set_off") != "select" && sessionStorage.getItem("Transaction_set_off") != "undefined") {
        //   $('#Transaction_set_offtype').val(JSON.parse(sessionStorage.getItem("Transaction_set_off")));
        // }


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

  getPenidngTransactions(search_default_val) {
    this.loaderhideme = true;
    console.log(this.Projected_wise_data);
    console.log(this.Company_Bank_Account_wise);
    console.log(this.Transaction_set_off_data);

    console.log(sessionStorage.getItem("Project_back_Id"));
    console.log(sessionStorage.getItem("Transaction_bank_account"));
    console.log(sessionStorage.getItem("Transaction_set_off"));

    if (sessionStorage.getItem("Project_back_Id") == null && this.Projected_wise_data == null) {
      this.Projected_wise_data = null;
    } else if (sessionStorage.getItem("Project_back_Id") == null && this.Projected_wise_data.length == 0) {
      this.Projected_wise_data = null;
    } else {
      this.Projected_wise_data = [];
      for (var i = 0; i < JSON.parse(sessionStorage.getItem("Project_back_Id")).length; i++) {
        this.Projected_wise_data.push(JSON.parse(sessionStorage.getItem("Project_back_Id"))[i].id);
      }

    }

    if (sessionStorage.getItem("Transaction_bank_account") == null && this.Company_Bank_Account_wise == null) {
      this.Company_Bank_Account_wise = null;
    } else if (sessionStorage.getItem("Transaction_bank_account") == null && this.Company_Bank_Account_wise.length == 0) {
      this.Company_Bank_Account_wise = null;
    } else {
      this.Company_Bank_Account_wise = [];
      for (var i = 0; i < JSON.parse(sessionStorage.getItem("Transaction_bank_account")).length; i++) {
        this.Company_Bank_Account_wise.push(JSON.parse(sessionStorage.getItem("Transaction_bank_account"))[i].id);
      }

    }

    if (sessionStorage.getItem("Transaction_set_off") == null && this.Transaction_set_off_data == null) {
      this.Transaction_set_off_data = null;
    } else if (sessionStorage.getItem("Transaction_set_off") == null && this.Transaction_set_off_data.length == 0) {
      this.Transaction_set_off_data = null;
    } else {
      this.Transaction_set_off_data = [];
      for (var i = 0; i < JSON.parse(sessionStorage.getItem("Transaction_set_off")).length; i++) {
        this.Transaction_set_off_data.push(JSON.parse(sessionStorage.getItem("Transaction_set_off"))[i].id);
      }

    }




    console.log(this.Projected_wise_data);
    console.log(this.Company_Bank_Account_wise);
    console.log(this.Transaction_set_off_data);





    if ($("#transaction_type").val() == "" || $("#transaction_type").val() == "select" || $("#transaction_type").val() == undefined || $("#transaction_type").val() == null) {
      this.transaction_type_name = null;
    } else {
      this.transaction_type_name = $("#transaction_type").val();
    }

    if ($("#transaction_mode").val() == "" || $("#transaction_mode").val() == "select" || $("#transaction_mode").val() == undefined || $("#transaction_mode").val() == null) {
      this.transaction_mode_name = null;
    } else {
      this.transaction_mode_name = $("#transaction_mode").val();
    }

    console.log(this.transaction_type_name);
    console.log(this.transaction_mode_name);

    console.log(this.Transaction_set_off_data);
    console.log(this.Company_Bank_Account_wise);
    console.log(this.Projected_wise_data);



    if (search_default_val == "search") {
      if (this.transaction_type_name == null && this.transaction_mode_name == null && this.Transaction_set_off_data == null && this.Company_Bank_Account_wise == null && this.Projected_wise_data == null) {
        swal("Please select any option to continue!");
        return false;
      }
    }





    $('#viewpendingdata').DataTable().destroy();
    this.pendingTransData = []
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/viewMisPendingTransactions.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body;
    if (search_default_val == "default") {


      body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "condition": "approveTransaction"
      }


    } else if (search_default_val == "search") {
      body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "condition": "approveTransaction",
        "transactionTypeId": this.transaction_type_name,
        "transactionModeId": this.transaction_mode_name,
        "searchBySetOffTypes": this.Transaction_set_off_data,
        "siteAccountIds": this.Company_Bank_Account_wise,
        "siteIds": this.Projected_wise_data

      }

    } else if (search_default_val == "back_option") {

      body = {

        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "condition": "approveTransaction",
        "transactionTypeId": Transaction_type_back,
        "transactionModeId": Transaction_Mode_back,
        "searchBySetOffTypes": Transaction_set_off_back,
        "siteAccountIds": Transaction_bank_account_back,
        "siteIds": Project_Id_back

      }

    }


    console.log(body);
    console.log(JSON.stringify(body));




    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      console.log(JSON.stringify(resp));

      this.loaderhideme = false;
      $('.page-loader-wrapper').show();

      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        this.pendingTransData = [];
        this.pendingTransData = resp.responseObjList.finTransactionEntryResponseList;
        console.log(this.pendingTransData);

        if (this.pendingTransData.length == 0) {
          this.hideme = true;
        } else {
          this.hideme = false;
        }

        if (this.pendingTransData == null || this.pendingTransData == "" || this.pendingTransData == "null") {
          this.chequedepositeDate_showHide = false;
          this.approvebtns_showHide = false;
          this.search_showHide = false;
        } else {
          this.approvebtns_showHide = true;
        }

        setTimeout(function () {
          $(document).ready(function () {
            $('#viewpendingdata').DataTable({
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

            });
          });

        }, 2000)




        $(function () {
          var pendingTransDetails = resp.responseObjList.finTransactionEntryResponseList;

          for (var i = 0; i < pendingTransDetails.length; i++) {
            var d = new Date(pendingTransDetails[i].chequeOrOnlineDate);
            // var dateToStr = d.toUTCString().split(' ');
            var datestring = d.getFullYear() + "/" + ("0" + (d.getMonth() + 1)).slice(-2) + "/" + ("0" + d.getDate()).slice(-2);
            // var date = new Date().getMonth();
            //  var minimumdate = new Date().setMonth(date - 3);
            //  var maximumdate = new Date().setMonth(date + 3);
            $('#chequedepositDate' + (i + 1)).bootstrapMaterialDatePicker({
              format: 'YYYY-MM-DD',
              minDate: new Date(datestring),
              maxDate: new Date(),
              clearButton: true,
              weekStart: 1,
              time: false
            });
            $('#chequereflectionDate' + (i + 1)).bootstrapMaterialDatePicker({
              format: 'YYYY-MM-DD',
              minDate: new Date(datestring),
              maxDate: new Date(),
              clearButton: true,
              weekStart: 1,
              time: false
            });

            $('#chequeHandoverDate' + (i + 1)).bootstrapMaterialDatePicker({
              format: 'YYYY-MM-DD',
              minDate: new Date(datestring),
              maxDate: new Date(),
              clearButton: true,
              weekStart: 1,
              time: false
            });


            $('#chequedepositDate' + (i + 1)).bootstrapMaterialDatePicker({ weekStart: 0, time: false }).on('change', function (e, date) {

            });
            $('#chequereflectionDate' + (i + 1)).bootstrapMaterialDatePicker({ weekStart: 0, time: false }).on('change', function (e, date) {

            });

            $('#chequeHandoverDate' + (i + 1)).bootstrapMaterialDatePicker({ weekStart: 0, time: false }).on('change', function (e, date) {

            });

          }

        });

      } else if (resp.responseCode == 440) {
        this.loaderhideme = false;
        $('.page-loader-wrapper').hide();
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

    console.log(this.Transaction_set_List);


    console.log(this.Transaction_set_off_data);
    console.log(this.Company_Bank_Account_wise);
    console.log(this.Projected_wise_data);




    if ($("#transaction_type").val() != undefined && $("#transaction_type").val() != "undefined" && $("#transaction_type").val() != "" && $("#transaction_type").val() != "select") {
      sessionStorage.setItem("Transaction_type", $("#transaction_type").val());
    }

    if ($("#transaction_mode").val() != undefined && $("#transaction_mode").val() != "undefined" && $("#transaction_mode").val() != "" && $("#transaction_type").val() != "select") {
      sessionStorage.setItem("Transaction_Mode", $("#transaction_mode").val());
    }


    if (this.Transaction_set_List != undefined && this.Transaction_set_List != 0 && this.Transaction_set_List != null) {

      // for (var i = 0; i < this.Transaction_set_List.length; i++) {
      //   this.selected_transaction_set_off_value.push(this.Transaction_set_List[i]);
      // }


      sessionStorage.setItem("Transaction_set_off", JSON.stringify(this.Transaction_set_List));
    }

    if (this.company_list_item != undefined && this.company_list_item.length != 0 && this.company_list_item != null) {

      // for (var i = 0; i < this.company_list_item.length; i++) {
      //   this.selected_bank_account_value.push(this.company_list_item);
      // }

      sessionStorage.setItem("Transaction_bank_account", JSON.stringify(this.company_list_item));
    }

    if (this.project_list_item != undefined && this.project_list_item.length != 0 && this.project_list_item != null) {
      // for (var i = 0; i <  this.project_list_item.length; i++) {
      //   this.selected_projectid_value.push( this.project_list_item[i].id);
      //   this.selected_projectid_name.push( this.project_list_item[i].name);

      // }
      sessionStorage.setItem("Project_back_Id", JSON.stringify(this.project_list_item));
      //sessionStorage.setItem("Project_back_name", JSON.stringify(this.selected_projectid_name));
    }

    sessionStorage.setItem("view_pending_approval_status", "true");

    this.viewTransactionData = JSON.stringify(itemData);

    console.log( this.viewTransactionData);

    sessionStorage.setItem('view_transaction_data', this.viewTransactionData);
    if (itemData.transactionTypeName == "Receipt" && itemData.transactionModeName == "Cheque") {
      if (sessionStorage.getItem("session_deptid") == '997') {
        sessionStorage.setItem('view_transaction_data', this.viewTransactionData);
        sessionStorage.setItem('sessionFor_receiptCheque', 'receiptCheque');
        this.router.navigate(["Receipt-Cheque"]);
        return false;
      } else if (sessionStorage.getItem("session_deptid") == '995') {
       
        this.viewTransactionData = JSON.stringify(itemData);
        sessionStorage.setItem('view_transaction_data', this.viewTransactionData);
        this.router.navigate(["Receipt-Cheque"]);
      } else {
        this.router.navigate(["Receipt-Cheque"]);
        sessionStorage.setItem('view_transaction_data', this.viewTransactionData);
      }
    } else if (itemData.transactionTypeName == "Receipt" && itemData.transactionModeName == "Online") {
      if (sessionStorage.getItem("session_deptid") == '995') {
        this.router.navigate(["Receipt-Online"]);
        return false;
      } else {
        this.router.navigate(["Receipt-Online"]);
      }
    } else if (itemData.transactionTypeName == "Receipt" && itemData.transactionModeName == "TDS") {
      if (sessionStorage.getItem("session_deptid") == '997') {
        this.router.navigate(["receipt_tds_view"]);
        return false;
      } else {
        // this.router.navigate(["Receipt-Online"]);
      }
    } else if (itemData.transactionTypeName == "Payment") {  //&& itemData.transactionModeName == "Cheque"
      if (sessionStorage.getItem("session_deptid") == '995') {
        this.router.navigate(["Payment-Cheque"]);
      } else {
        this.router.navigate(["Payment-Cheque"]);
      }
    } else if (itemData.transactionTypeName == "Interest Waiver" && itemData.transactionModeName == "Interest Waiver") {

      this.router.navigate(["View_Interest_waiver"]);

    } else if (itemData.transactionTypeName == "Receipt" && itemData.transactionModeName == "waived off") {

      this.router.navigate(["Approve_Waive-Off"]);

    }

  }



  homeClick() {
    this.router.navigate(['dashboard']);
  }


  toggleVisibility(event, item) {

    console.log(event);
    console.log(item);


    this.temp = event.target.id.split("tablerowdata")[1];
    if (event.target.checked == true) {
      $('#chequedepositDate' + this.temp).prop('disabled', false);
      $('#chequeHandoverDate' + this.temp).prop('disabled', false);
      $('#chequereflectionDate' + this.temp).prop('disabled', false);

      // $("#chequedepositDate" + this.temp).focus();
      // alert(item.challanNo)
      userRoleListTemp.push({
        "siteId": item.siteId,
        "siteName": item.siteName,
        "transactionTypeId": item.transactionTypeId,
        "transactionModeId": item.transactionModeId,
        "transactionTypeName": item.transactionTypeName,
        "transactionModeName": item.transactionModeName,
        "transactionAmount": item.transactionAmount,
        "transactionReceiveDate": item.transactionDate,
        "flatIds": item.flatId,
        "bookingFormId": item.bookingFormId,
        "finTransactionNo": item.finTransactionNo,
        "transactionEntryId": item.transactionEntryId,
        "challanReflectionDate": item.challanReflectionDate,
        "challanNo": item.challanNo,
        "ackNo": item.ackNo,
        "bsrCode": item.bsrCode,
        "transactionSetOffEntryId": 8,
        "rowId": this.temp,
        "transactionDate": item.transactionDate,
      });



    } else {
      let index = userRoleListTemp.indexOf({
        "siteId": item.siteId,
        "siteName": item.siteName,
        "transactionTypeId": item.transactionTypeId,
        "transactionModeId": item.transactionModeId,
        "transactionTypeName": item.transactionTypeName,
        "transactionModeName": item.transactionModeName,
        "transactionAmount": item.transactionAmount,
        "transactionReceiveDate": item.transactionDate,
        "flatIds": item.flatId,
        "bookingFormId": item.bookingFormId,
        "finTransactionNo": item.finTransactionNo,
        "transactionEntryId": item.transactionEntryId,
        "challanReflectionDate": item.challanReflectionDate,
        "challanNo": item.challanNo,
        "ackNo": item.ackNo,
        "bsrCode": item.bsrCode,
        "transactionSetOffEntryId": 8,
        "transactionDate": item.transactionDate,
      });
      userRoleListTemp.splice(index, 1);
      $('#chequedepositDate' + this.temp).prop('disabled', true);
      $('#chequeHandoverDate' + this.temp).prop('disabled', true);
      $('#chequereflectionDate' + this.temp).prop('disabled', true);

      //$('#chequedepositDate' + this.temp).val("");
    }


  }


  cheque_bounce_clearFun(buttonval) {
    //   userRoleListTemp = [];
    if (buttonval == "Approve") {
      buttonType = "Approve";
    } else if (buttonval == "Reject") {
      buttonType = "Reject";
    }



    userRoleListTemp.map(function (entry) {
      entry.buttonType = buttonType;
      return entry;
    });

    console.log(userRoleListTemp);

    if (sessionStorage.getItem("session_deptName") == "ACCOUNTS") {
      var temp_chequedepositDate;
      var temp_handoverDate
      var temp_chequereflectionDate
      var challanNo
      var bsrNo
      var ackNo

      maindivarray = [];
      for (var i = 0; i < userRoleListTemp.length; i++) {

        if (buttonType == "Approve") {
          //  "challanReflectionDate": item.challanReflectionDate,

          if (userRoleListTemp[i].challanNo) {
            challanNo = userRoleListTemp[i].challanNo;
          } else {
            challanNo = null
          }

          if (userRoleListTemp[i].ackNo) {
            ackNo = userRoleListTemp[i].ackNo
          } else {
            ackNo = null
          }

          if (userRoleListTemp[i].bsrCode) {
            bsrNo = userRoleListTemp[i].bsrCode;
          } else {
            bsrNo = null
          }
          //  return false;
          if ($("#chequedepositDate" + userRoleListTemp[i].rowId).val() == "") {
            temp_chequedepositDate = null;
            swal("Please select deposite date");
            return false;
          } else {
            temp_chequedepositDate = new Date($("#chequedepositDate" + userRoleListTemp[i].rowId).val()).getTime()
          }

          if ($("#chequereflectionDate" + userRoleListTemp[i].rowId).val() == "") {
            temp_chequereflectionDate = null;
            swal("Please select reflection date");
            return false;
          } else {
            temp_chequereflectionDate = new Date($("#chequereflectionDate" + userRoleListTemp[i].rowId).val()).getTime()
          }

          if ($("#chequeHandoverDate" + userRoleListTemp[i].rowId).val() == "") {
            temp_handoverDate = null;
            swal("Please select cheque hand over date");
            return false;
          } else {
            temp_handoverDate = new Date($("#chequeHandoverDate" + userRoleListTemp[i].rowId).val()).getTime()
          }
        } else {
          temp_chequedepositDate = null;
          temp_handoverDate = null;
          temp_chequereflectionDate = null
        }



        maindivarray.push({
          "siteId": userRoleListTemp[i].siteId,
          "siteName": userRoleListTemp[i].siteName,
          "transactionTypeId": userRoleListTemp[i].transactionTypeId,
          "transactionModeId": userRoleListTemp[i].transactionModeId,
          "transactionTypeName": userRoleListTemp[i].transactionTypeName,
          "transactionModeName": userRoleListTemp[i].transactionModeName,
          "transactionAmount": userRoleListTemp[i].transactionAmount,
          "transactionReceiveDate": userRoleListTemp[i].transactionDate,
          "flatIds": [userRoleListTemp[i].flatIds],
          "bookingFormId": userRoleListTemp[i].bookingFormId,
          "finTransactionNo": userRoleListTemp[i].finTransactionNo,
          "transactionEntryId": userRoleListTemp[i].transactionEntryId,
          "transactionSetOffEntryId": 8,
          "chequeDepositedDate": temp_chequedepositDate,
          "challanReflectionDate": temp_chequereflectionDate,
          "challanNo": challanNo,
          "bsrNo": bsrNo,
          "ackNo": ackNo,
          "chequeHandoverDate": temp_handoverDate,
          "buttonType": userRoleListTemp[i].buttonType,
          "transactionDate": userRoleListTemp[i].transactionDate,
        });
      }

    } else if (sessionStorage.getItem("session_deptName") == "CRM FINANCE") {
      // var temp_chequedepositDate;
      var temp_handoverDate
      maindivarray = [];
      for (var i = 0; i < userRoleListTemp.length; i++) {

        if (buttonType == "Approve") {
          // if ($("#chequedepositDate" +userRoleListTemp[i].rowId).val() == "") {
          //   temp_chequedepositDate = null;
          //   swal("Please select deposite date");
          //   return false;
          // } else {
          //   temp_chequedepositDate = new Date($("#chequedepositDate" + userRoleListTemp[i].rowId).val()).getTime()
          // }

          if ($("#chequeHandoverDate" + userRoleListTemp[i].rowId).val() == "") {
            temp_handoverDate = null;
            swal("Please select cheque hand over date");
            return false;
          } else {
            temp_handoverDate = new Date($("#chequeHandoverDate" + userRoleListTemp[i].rowId).val()).getTime()
          }
        } else {
          temp_chequedepositDate = null;
          temp_handoverDate = null;
        }



        maindivarray.push({
          "siteId": userRoleListTemp[i].siteId,
          "siteName": userRoleListTemp[i].siteName,
          "transactionTypeId": userRoleListTemp[i].transactionTypeId,
          "transactionModeId": userRoleListTemp[i].transactionModeId,
          "transactionTypeName": userRoleListTemp[i].transactionTypeName,
          "transactionModeName": userRoleListTemp[i].transactionModeName,
          "transactionAmount": userRoleListTemp[i].transactionAmount,
          "transactionReceiveDate": userRoleListTemp[i].transactionDate,
          "challanReflectionDate": temp_chequereflectionDate,
          "challanNo": challanNo,
          "bsrNo": bsrNo,
          "ackNo": ackNo,
          "flatIds": [userRoleListTemp[i].flatIds],
          "bookingFormId": userRoleListTemp[i].bookingFormId,
          "finTransactionNo": userRoleListTemp[i].finTransactionNo,
          "transactionEntryId": userRoleListTemp[i].transactionEntryId,
          "transactionSetOffEntryId": 8,
          "chequeHandoverDate": temp_handoverDate,
          "buttonType": userRoleListTemp[i].buttonType,
          "transactionDate": userRoleListTemp[i].transactionDate,

        });
      }
    } else {

      maindivarray = [];
      for (var i = 0; i < userRoleListTemp.length; i++) {
        maindivarray.push({
          "siteId": userRoleListTemp[i].siteId,
          "siteName": userRoleListTemp[i].siteName,
          "transactionTypeId": userRoleListTemp[i].transactionTypeId,
          "transactionModeId": userRoleListTemp[i].transactionModeId,
          "transactionTypeName": userRoleListTemp[i].transactionTypeName,
          "transactionModeName": userRoleListTemp[i].transactionModeName,
          "transactionAmount": userRoleListTemp[i].transactionAmount,
          "transactionReceiveDate": userRoleListTemp[i].transactionDate,
          "flatIds": [userRoleListTemp[i].flatIds],
          "bookingFormId": userRoleListTemp[i].bookingFormId,
          "finTransactionNo": userRoleListTemp[i].finTransactionNo,
          "transactionEntryId": userRoleListTemp[i].transactionEntryId,
          "challanReflectionDate": temp_chequereflectionDate,
          "challanNo": challanNo,
          "bsrNo": bsrNo,
          "ackNo": ackNo,
          "transactionSetOffEntryId": 8,
          "buttonType": userRoleListTemp[i].buttonType,
          "transactionDate": userRoleListTemp[i].transactionDate,
        });
      }
    }

    console.log(maindivarray);

    if (maindivarray.length < 1) {
      swal("Please select atleast one transaction");
      return false;
    }

    if (maindivarray.length > 0) {
      $(function () {
        $.each($(".checlist:checked"), function () {
          var temp = $(this).attr("id").split('tablerowdata')[1];
          if (($(this).val().split('-')[5]) == "Cheque") {

            if (buttonType == "Approve") {
              if ($('#chequedepositDate' + (temp)).val() == "") {
                $("#chequedepositDate" + (temp)).focus();
                return false;
              }
            }

          }
          $("#demand_note_date").val(2)
        });
        return false;

      });

    }

    // if ($("#demand_note_date").val() == "") {
    //   return false;
    // }

    this.finalSubmission(buttonType);
  }

  finalSubmission(buttonType) {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/approveFinancialMultipleTransaction.spring";

    console.log(url);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    body = {
      "sessionKey": sessionStorage.getItem("login_sessionkey"),
      "financialTRNRequests": maindivarray
    }

    console.log(JSON.stringify(body));





    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      console.log(JSON.stringify(resp));
      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        if (buttonType == "Approve") {

          if (resp.responseObjList.approvedAndFailedStrMsg.split(",")[0] !== "Invalid request for transaction") {
            swal(resp.responseObjList.approvedAndFailedStrMsg);

            let customeResponse = [];
            for (let i = 0; i < resp.responseObjList.approvedAndFailedTRN.length; i++) {
              customeResponse.push(resp.responseObjList.approvedAndFailedTRN[i])
            }

            for (let item of resp.responseObjList.transactionRespList) {
              if (item.fileInfoList == null) {
              } else {
                for (let p of item.fileInfoList) {

                  window.open(p.url, '_system', 'location=yes,closebuttoncaption=Fechar,enableViewportScale=no');

                }
              }

            }

            $(document).ready(function () {
              setTimeout(function () {

                location.reload();
              }, 3000)
            })


          } else {
            swal(resp.responseObjList.approvedAndFailedStrMsg);

          }


        } else {

          if (resp.responseObjList.approvedAndFailedStrMsg.split(",")[0] !== "Invalid request for transaction") {
            swal('Your transaction successfully rejected');
            this.router.navigate(["/View-Pending-Transactions"]);
            $(document).ready(function () {
              setTimeout(function () {
                // this.router.navigate(["/View-Pending-Transactions"]);
                //   location.reload();
              }, 3000)
            })
          } else {
            swal(resp.responseObjList.approvedAndFailedStrMsg);
          }

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


  /*------------------------Transaction type start-------------------*/
  transactionTypeAndMode() {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/viewFinTransactionTypeModeData.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "condition": "fetchTransactionData",
      "actionUrl": "ApproveTransaction"
    }
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#transaction_type').html('');
        $('#transaction_type').append('<option value="select">--Select--</option>');
        $('#transaction_mode').html('');
        $('#transaction_mode').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.finTrnasactionTypeResponseList.length; i++) {
          $('#transaction_type').append("<option value='" + resp.responseObjList.finTrnasactionTypeResponseList[i].transactionTypeId + "'>" + resp.responseObjList.finTrnasactionTypeResponseList[i].name + "</option>");
        }

        for (var i = 0; i < resp.responseObjList.finTransactionModeResponseList.length; i++) {
          $('#transaction_mode').append("<option value='" + resp.responseObjList.finTransactionModeResponseList[i].transactionModeId + "'>" + resp.responseObjList.finTransactionModeResponseList[i].name + "</option>");

        }

        if (sessionStorage.getItem("Transaction_type") != undefined && sessionStorage.getItem("Transaction_type") != "undefined" && sessionStorage.getItem("Transaction_type") != "" && sessionStorage.getItem("Transaction_type") != "select") {
          Transaction_type_back = sessionStorage.getItem("Transaction_type");
          $("#transaction_type").val(Transaction_type_back);
        }

        if (sessionStorage.getItem("Transaction_Mode") != undefined && sessionStorage.getItem("Transaction_Mode") != "undefined" && sessionStorage.getItem("Transaction_Mode") != "" && sessionStorage.getItem("Transaction_Mode") != "select") {
          Transaction_Mode_back = sessionStorage.getItem("Transaction_Mode");
          $("#transaction_mode").val(Transaction_Mode_back);
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
  /*------------------------Transaction type end-------------------*/
  searchFun() {


    // if ($("#projectID").val().length == 0) {
    //   swal("Please select the project name");
    //   return false;
    // }

    // if ($("#transaction_type").val() == "select") {
    //   swal("Please select transaction type");
    //   return false;
    // }

    // if ($("#transaction_mode").val() == "select") {
    //   swal("Please select transaction mode");
    //   return false;
    // }


    // sessionStorage.removeItem("Transaction_type");
    // sessionStorage.removeItem("Transaction_Mode");
    // sessionStorage.removeItem("Transaction_set_off");
    // sessionStorage.removeItem("Transaction_bank_account");
    // sessionStorage.removeItem("Project_back_Id");
    // sessionStorage.removeItem("view_pending_approval_status");


    this.getPenidngTransactions("search");
  }

  attachmentlink(link) {

    window.open(link, '_system', 'location=yes,closebuttoncaption=Fechar,enableViewportScale=no');

  }
}
