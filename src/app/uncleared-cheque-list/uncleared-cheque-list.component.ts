import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { RequestOptions, Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare const $: any;
declare const swal: any;
var body;
var buttonType;
var optionalButtonType;
var userRoleListTemp = [];
var maindivarray = [];

var userRoleListTemp1 = [];

var temp;
var selected_projectid;
var site_name;
var selected_bank_account_number;
var selected_transaction_set_off;

var Transaction_type_back;
var Transaction_Mode_back;
var Transaction_set_off_back = [];
var Transaction_bank_account_back = [];
var Project_Id_back = [];

var pendingTransDetails;

@Component({
  selector: 'app-uncleared-cheque-list',
  templateUrl: './uncleared-cheque-list.component.html',
  styleUrls: ['./uncleared-cheque-list.component.sass']
})
export class UnclearedChequeListComponent implements OnInit {

  @ViewChildren("checkboxes") checkboxes: QueryList<ElementRef>;
  userRoleListTemp: any = [];
  userRoleListToSave: any = [];
  pendingTransData: any;
  viewTransactionData: any;
  controller = [];
  ischecked: any;
  ChequeClearanceDate: any;
  arrOfObj: { name: string; }[];
  injectObj: {};
  buttonType: string;
  newArrOfObjval: any = [];
  //optionalButtonType: string;
  approvebtns_showHide: boolean = true;
  temp: any;
  temp_chequebounceDate: any;
  closeResult = '';

  registerForm: FormGroup;
  submitted = false;
  bounce_reason_value: any;


  project_wise_project: Array<any> = [];

  chequedepositeDate_showHide: boolean = false
  chequedepositDateDate: any;
  search_showHide: boolean = true;
  depidval: boolean = false;
  flatdetailsData: any;
  depositedateval: any;
  Array: string[] = [];

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




  constructor(private cmn: CommonComponent, private http: Http, private router: Router,
    private modalService: NgbModal, private formBuilder: FormBuilder) {
    $('.page-loader-wrapper').hide();


    this.userForm = this.formBuilder.group({
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





    this.siteList();

    if (sessionStorage.getItem("session_deptName") == "ACCOUNTS") {
      this.chequedepositeDate_showHide = true;

    }


    if (sessionStorage.getItem("un_view_pending_approval_status") == "true") {

      if (sessionStorage.getItem("un_Transaction_type") != undefined && sessionStorage.getItem("un_Transaction_type") != "undefined" && sessionStorage.getItem("un_Transaction_type") != "" && sessionStorage.getItem("un_Transaction_type") != "select") {
        Transaction_type_back = sessionStorage.getItem("un_Transaction_type");


      } else {
        Transaction_type_back = null;
      }

      if (sessionStorage.getItem("un_Transaction_Mode") != undefined && sessionStorage.getItem("un_Transaction_Mode") != "undefined" && sessionStorage.getItem("un_Transaction_Mode") != "" && sessionStorage.getItem("un_Transaction_Mode") != "select") {
        Transaction_Mode_back = sessionStorage.getItem("un_Transaction_Mode");



      } else {
        Transaction_Mode_back = null;
      }


      console.log(sessionStorage.getItem("un_Transaction_set_off"));
      console.log(sessionStorage.getItem("un_Transaction_bank_account"));
      console.log(sessionStorage.getItem("un_Project_back_Id"));

      if (sessionStorage.getItem("un_Transaction_set_off") != undefined && sessionStorage.getItem("un_Transaction_set_off") != "" && sessionStorage.getItem("un_Transaction_set_off") != "select" && sessionStorage.getItem("un_Transaction_set_off") != "undefined" && sessionStorage.getItem("un_Transaction_set_off").length != 0) {

        Transaction_bank_account_back = [];
        for (var i = 0; i < JSON.parse(sessionStorage.getItem("un_Transaction_set_off")).length; i++) {
          Transaction_set_off_back.push(JSON.parse(sessionStorage.getItem("un_Transaction_set_off"))[i].id);
        }
      } else {
        Transaction_set_off_back = [];
      }



      if (sessionStorage.getItem("un_Transaction_bank_account") != undefined && sessionStorage.getItem("un_Transaction_bank_account") != "" && sessionStorage.getItem("un_Transaction_bank_account") != "select" && sessionStorage.getItem("un_Transaction_bank_account") != "undefined" && sessionStorage.getItem("un_Transaction_bank_account").length != 0) {
        Transaction_bank_account_back = [];
        for (var i = 0; i < JSON.parse(sessionStorage.getItem("un_Transaction_bank_account")).length; i++) {
          Transaction_bank_account_back.push(JSON.parse(sessionStorage.getItem("un_Transaction_bank_account"))[i].id);
        }
      } else {
        Transaction_bank_account_back = [];
      }

      if (sessionStorage.getItem("un_Project_back_Id") != undefined && sessionStorage.getItem("un_Project_back_Id") != "" && sessionStorage.getItem("un_Project_back_Id") != "select" && sessionStorage.getItem("un_Project_back_Id") != "undefined" && sessionStorage.getItem("un_Project_back_Id").length != 0) {
        Project_Id_back = [];
        for (var i = 0; i < JSON.parse(sessionStorage.getItem("un_Project_back_Id")).length; i++) {
          Project_Id_back.push(JSON.parse(sessionStorage.getItem("un_Project_back_Id"))[i].id);
        }


      } else {
        Project_Id_back = [];
      }



      this.transactionTypeAndMode();
      this.getPenidngTransactions("back_option");

      this.Bank_Account_Number(Project_Id_back);
      this.Transaction_Set_Off_Type(Project_Id_back, "");

    } else {
      var arr = localStorage.getItem('Pending_Transactions_For_Approval');
      this.transactionTypeAndMode();
      this.Bank_Account_Number(JSON.parse(arr).map(String));
      this.Transaction_Set_Off_Type(JSON.parse(arr).map(String), "");
      this.getPenidngTransactions("default");


    }


  }




  showallfun() {


    $('#tableExport').DataTable().destroy();


    $("#transaction_type").val('select')
    $('#transaction_type').select2().trigger('change');


    //$("#transaction_mode").val('select')
    // $('#transaction_mode').select2().trigger('change');


    this.Projected_wise_data = [];
    this.Company_Bank_Account_wise = [];
    this.Transaction_set_off_data = [];

    this.company_list_item = [];
    this.Transaction_set_List = [];
    this.project_list_item = [];

    sessionStorage.removeItem("un_Transaction_type");
    // sessionStorage.removeItem("un_Transaction_Mode");
    sessionStorage.removeItem("un_Transaction_set_off");
    sessionStorage.removeItem("un_Transaction_bank_account");
    sessionStorage.removeItem("un_Project_back_Id");
    sessionStorage.removeItem("un_view_pending_approval_status");

    Transaction_set_off_back = [];
    Transaction_bank_account_back = [];
    Project_Id_back = []



    this.userForm.reset();

    // this.getPenidngTransactions();
    this.getPenidngTransactions("default");


    // this.userForm.patchValue({
    //   project_wise_form : "",
    //   Bank_account_number_form : "",
    //   Transaction_set_off_form : "",

    // });


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


    sessionStorage.removeItem("un_Project_back_Id");


    if (this.project_list_item != undefined && this.project_list_item.length != 0 && this.project_list_item != null) {
      sessionStorage.setItem("un_Project_back_Id", JSON.stringify(this.project_list_item));
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

    sessionStorage.removeItem("un_Project_back_Id");

    if (this.project_list_item != undefined && this.project_list_item.length != 0 && this.project_list_item != null) {
      sessionStorage.setItem("un_Project_back_Id", JSON.stringify(this.project_list_item));
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

    sessionStorage.removeItem("un_Project_back_Id");

    if (this.project_list_item != undefined && this.project_list_item.length != 0 && this.project_list_item != null) {
      sessionStorage.setItem("un_Project_back_Id", JSON.stringify(this.project_list_item));

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
    sessionStorage.removeItem("un_Project_back_Id");

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
    sessionStorage.removeItem("un_Transaction_bank_account");

    if (this.company_list_item != undefined && this.company_list_item.length != 0 && this.company_list_item != null) {
      sessionStorage.setItem("un_Transaction_bank_account", JSON.stringify(this.company_list_item));
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
    sessionStorage.removeItem("un_Transaction_bank_account");

    if (this.company_list_item != undefined && this.company_list_item.length != 0 && this.company_list_item != null) {
      sessionStorage.setItem("un_Transaction_bank_account", JSON.stringify(this.company_list_item));
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

    sessionStorage.removeItem("un_Transaction_bank_account");
    if (this.company_list_item != undefined && this.company_list_item.length != 0 && this.company_list_item != null) {
      sessionStorage.setItem("un_Transaction_bank_account", JSON.stringify(this.company_list_item));
    }

  }

  company_onDeSelectAll(item: any) {
    this.Company_Bank_Account_wise = [];
    this.company_list_item = [];
    sessionStorage.removeItem("un_Transaction_bank_account");

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

    sessionStorage.removeItem("un_Transaction_set_off");
    if (this.Transaction_set_List != undefined && this.Transaction_set_List != 0 && this.Transaction_set_List != null) {
      sessionStorage.setItem("un_Transaction_set_off", JSON.stringify(this.Transaction_set_List));
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

    sessionStorage.removeItem("un_Transaction_set_off");
    if (this.Transaction_set_List != undefined && this.Transaction_set_List != 0 && this.Transaction_set_List != null) {
      sessionStorage.setItem("un_Transaction_set_off", JSON.stringify(this.Transaction_set_List));
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

    sessionStorage.removeItem("un_Transaction_set_off");
    if (this.Transaction_set_List != undefined && this.Transaction_set_List != 0 && this.Transaction_set_List != null) {
      sessionStorage.setItem("un_Transaction_set_off", JSON.stringify(this.Transaction_set_List));
    }

  }

  Transaction_set_off_onDeSelectAll(item: any) {
    this.Transaction_set_off_data = [];
    this.Transaction_set_List = [];
    sessionStorage.removeItem("un_Transaction_set_off");

  }






  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      bounce_reason_commite: ['', Validators.required],

    });


    var self = this;
    var date = new Date();
    var newdate = date.setDate(date.getDate() - 365);

    $(function () {

      $("#transaction_type").select2({
        placeholder: "Search transaction type",
        dir: "ltl"
      });
      // $("#transaction_mode").select2({
      //   placeholder: "Search transaction mode",
      //   dir: "ltl"
      // });


      $('#milestone_blocks_tables').hide();
      $("#chequebounceComent1").select2({
        placeholder: "Select Reason",
        dir: "ltl"
      });
    })

  }

  get f() { return this.registerForm.controls; }




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

        console.log(sessionStorage.getItem("un_Project_back_Id"));

        if (sessionStorage.getItem("un_Project_back_Id") != null && sessionStorage.getItem("un_Project_back_Id") != undefined && sessionStorage.getItem("un_Project_back_Id").length != 0) {
          this.itemscc = [];
          for (var i = 0; i < JSON.parse(sessionStorage.getItem("un_Project_back_Id")).length; i++) {
            console.log(JSON.parse(sessionStorage.getItem("un_Project_back_Id"))[i].id);
            console.log(JSON.parse(sessionStorage.getItem("un_Project_back_Id"))[i].name);

            this.itemscc.push({
              id: parseInt(JSON.parse(sessionStorage.getItem("un_Project_back_Id"))[i].id),
              name: JSON.parse(sessionStorage.getItem("un_Project_back_Id"))[i].name
            });

            this.project_wise_controller.push(JSON.parse(sessionStorage.getItem("un_Project_back_Id"))[i].id);
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



        // if (sessionStorage.getItem("un_Project_back_Id") != undefined && sessionStorage.getItem("un_Project_back_Id") != "" && sessionStorage.getItem("un_Project_back_Id") != "select" && sessionStorage.getItem("un_Project_back_Id") != "undefined") {
        //   $('#projectID').val(JSON.parse(sessionStorage.getItem("un_Project_back_Id")));

        //   this.Bank_Account_Number(JSON.parse(sessionStorage.getItem("un_Project_back_Id")));
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

        console.log(sessionStorage.getItem("un_Transaction_bank_account"));


        if (sessionStorage.getItem("un_Transaction_bank_account") != null && sessionStorage.getItem("un_Transaction_bank_account") != undefined && sessionStorage.getItem("un_Transaction_bank_account").length != 0) {
          this.itemsbank = [];
          for (var i = 0; i < JSON.parse(sessionStorage.getItem("un_Transaction_bank_account")).length; i++) {
            console.log(JSON.parse(sessionStorage.getItem("un_Transaction_bank_account"))[i].id);
            console.log(JSON.parse(sessionStorage.getItem("un_Transaction_bank_account"))[i].name);

            this.itemsbank.push({
              id: parseInt(JSON.parse(sessionStorage.getItem("un_Transaction_bank_account"))[i].id),
              siteBankAccountNumber: JSON.parse(sessionStorage.getItem("un_Transaction_bank_account"))[i].name
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
        // if (sessionStorage.getItem("un_Transaction_bank_account") != undefined && sessionStorage.getItem("un_Transaction_bank_account") != "" && sessionStorage.getItem("un_Transaction_bank_account") != "select" && sessionStorage.getItem("un_Transaction_bank_account") != "undefined") {
        //   $('#Bank_account_number').val(JSON.parse(sessionStorage.getItem("un_Transaction_bank_account")));
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



        console.log(sessionStorage.getItem("un_Transaction_set_off"));

        if (sessionStorage.getItem("un_Transaction_set_off") != null && sessionStorage.getItem("un_Transaction_set_off") != undefined && sessionStorage.getItem("un_Transaction_set_off").length != 0) {
          this.itemssetoff = [];
          for (var i = 0; i < JSON.parse(sessionStorage.getItem("un_Transaction_set_off")).length; i++) {
            console.log(JSON.parse(sessionStorage.getItem("un_Transaction_set_off"))[i].id);
            console.log(JSON.parse(sessionStorage.getItem("un_Transaction_set_off"))[i].name);

            this.itemssetoff.push({
              key: JSON.parse(sessionStorage.getItem("un_Transaction_set_off"))[i].name,
              id: JSON.parse(sessionStorage.getItem("un_Transaction_set_off"))[i].id
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

        // if (sessionStorage.getItem("un_Transaction_set_off") != undefined && sessionStorage.getItem("un_Transaction_set_off") != "" && sessionStorage.getItem("un_Transaction_set_off") != "select" && sessionStorage.getItem("un_Transaction_set_off") != "undefined") {
        //   $('#Transaction_set_offtype').val(JSON.parse(sessionStorage.getItem("un_Transaction_set_off")));
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






  eventfunction(event, index, content) {
    console.log(userRoleListTemp);
    console.log(event.target.value);
    console.log(index);

    this.bounce_reason_value = event.target.value;

    if (event.target.value == "Others") {

      this.registerForm.patchValue({
        bounce_reason_commite: ""

      });


      this.modalService.open(content, { backdrop: 'static', size: 'lg', keyboard: false, centered: true }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });

    } else {
      this.registerForm.patchValue({
        bounce_reason_commite: ""

      });

    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  bounce_reason_savefunction(index) {

    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    } else {

      console.log(userRoleListTemp);
      console.log(userRoleListTemp[index]);




      if (this.bounce_reason_value == "Others") {
        for (var i = 0; i < userRoleListTemp.length; i++) {
          if (userRoleListTemp[i] == userRoleListTemp[index]) {
            console.log(userRoleListTemp[i].reson == this.registerForm.value.bounce_reason_commite);

            userRoleListTemp[i].Reson = this.registerForm.value.bounce_reason_commite;
            // console.log(userRoleListTemp[i]);
            // userRoleListTemp[i].map(function (entry) {
            //   entry.reason = this.registerForm.value.bounce_reason_commite;
            //   return entry;
            // });


          }
        }
      }




      console.log(userRoleListTemp);

      this.modalService.dismissAll();
    }

  }



  /*--------------------------Pending transactions table start------------------*/
  getPenidngTransactions(search_default_val) {

    this.loaderhideme = true;

    if (sessionStorage.getItem("un_Project_back_Id") == null && this.Projected_wise_data == null) {
      this.Projected_wise_data = null;
    } else if (sessionStorage.getItem("un_Project_back_Id") == null && this.Projected_wise_data.length == 0) {
      this.Projected_wise_data = null;
    } else {
      this.Projected_wise_data = [];
      for (var i = 0; i < JSON.parse(sessionStorage.getItem("un_Project_back_Id")).length; i++) {
        this.Projected_wise_data.push(JSON.parse(sessionStorage.getItem("un_Project_back_Id"))[i].id);
      }

    }

    if (sessionStorage.getItem("un_Transaction_bank_account") == null && this.Company_Bank_Account_wise == null) {
      this.Company_Bank_Account_wise = null;
    } else if (sessionStorage.getItem("un_Transaction_bank_account") == null && this.Company_Bank_Account_wise.length == 0) {
      this.Company_Bank_Account_wise = null;
    } else {
      this.Company_Bank_Account_wise = [];
      for (var i = 0; i < JSON.parse(sessionStorage.getItem("un_Transaction_bank_account")).length; i++) {
        this.Company_Bank_Account_wise.push(JSON.parse(sessionStorage.getItem("un_Transaction_bank_account"))[i].id);
      }

    }

    if (sessionStorage.getItem("un_Transaction_set_off") == null && this.Transaction_set_off_data == null) {
      this.Transaction_set_off_data = null;
    } else if (sessionStorage.getItem("un_Transaction_set_off") == null && this.Transaction_set_off_data.length == 0) {
      this.Transaction_set_off_data = null;
    } else {
      this.Transaction_set_off_data = [];
      for (var i = 0; i < JSON.parse(sessionStorage.getItem("un_Transaction_set_off")).length; i++) {
        this.Transaction_set_off_data.push(JSON.parse(sessionStorage.getItem("un_Transaction_set_off"))[i].id);
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

    // if ($("#transaction_mode").val() == "" || $("#transaction_mode").val() == "select" || $("#transaction_mode").val() == undefined || $("#transaction_mode").val() == null) {
    //   this.transaction_mode_name = null;
    // } else {
    //   this.transaction_mode_name = $("#transaction_mode").val();
    // }

    console.log(this.transaction_type_name);
    console.log(this.transaction_mode_name);

    console.log(this.Transaction_set_off_data);
    console.log(this.Company_Bank_Account_wise);
    console.log(this.Projected_wise_data);

    console.log(search_default_val);

    if (search_default_val == "search") {
      if (this.transaction_type_name == null && this.Transaction_set_off_data == null && this.Company_Bank_Account_wise == null && this.Projected_wise_data == null) {
        swal("Please select any option to continue!");
        return false;
      }
    }


    console.log("working");
    $('.page-loader-wrapper').show();
    $('#tableExport').DataTable().destroy();
    this.pendingTransData = []

    let url = this.cmn.commonUrl + "financial/viewMisPendingTransactions.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    if (search_default_val == "default") {


      body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "condition": "approveTransaction",
        "actionUrl": "getUnclearedChequeDetails",
        "siteId": sessionStorage.getItem("session_siteId")
      }

    } else if (search_default_val == "search") {





      body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "condition": "approveTransaction",
        "actionUrl": "getUnclearedChequeDetails",
        "transactionTypeId": this.transaction_type_name,
        // "transactionModeId": this.transaction_mode_name,
        "searchBySetOffTypes": this.Transaction_set_off_data,
        "siteAccountIds": this.Company_Bank_Account_wise,
        "siteIds": this.Projected_wise_data

      }

    } else if (search_default_val == "back_option") {

      body = {
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
        "condition": "approveTransaction",
        "actionUrl": "getUnclearedChequeDetails",
        "transactionTypeId": this.transaction_type_name,
        // "transactionModeId": this.transaction_mode_name,
        "searchBySetOffTypes": this.Transaction_set_off_data,
        "siteAccountIds": this.Company_Bank_Account_wise,
        "siteIds": this.Projected_wise_data

      }

    }



    console.log(body);



    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      console.log(JSON.stringify(resp));

      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        this.hideme = true;
        this.pendingTransData = resp.responseObjList.finTransactionEntryResponseList;
        console.log(this.pendingTransData);
        var temp = this.pendingTransData

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


            });

          });
        }, 2000)




        $(function () {
          pendingTransDetails = resp.responseObjList.finTransactionEntryResponseList;
          console.log(pendingTransDetails);

          for (var i = 0; i < pendingTransDetails.length; i++) {

            var d = new Date(pendingTransDetails[i].chequeDepositedDate);
            var datestring = d.getFullYear() + "/" + ("0" + (d.getMonth() + 1)).slice(-2) + "/" + ("0" + d.getDate()).slice(-2);

            $('#clearencedate' + (i + 1)).bootstrapMaterialDatePicker({
              format: 'YYYY-MM-DD',
              minDate: new Date(datestring),
              maxDate: new Date(),
              clearButton: true,
              weekStart: 1,
              time: false,

            }).on('change', function (e, date) {
              var index = e.target.id.split("clearencedate")[1];

              $('#bouncedate' + index).prop('disabled', true);
              $('#chequebounceComent' + index).prop('disabled', true);

            });

            $('#bouncedate' + (i + 1)).bootstrapMaterialDatePicker({
              format: 'YYYY-MM-DD',
              minDate: new Date(datestring),
              maxDate: new Date(),
              clearButton: true,
              weekStart: 1,
              time: false
            }).on('change', function (e, date) {
              var index = e.target.id.split("bouncedate")[1];

              $('#clearencedate' + index).prop('disabled', true);


            });

          }

        });


      } else if (resp.responseCode == 440) {
        $('.page-loader-wrapper').hide();
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        swal(resp.errors[0]);
      }
    },
      error => {
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


    console.log(this.Transaction_set_List);


    console.log(this.Transaction_set_off_data);
    console.log(this.Company_Bank_Account_wise);
    console.log(this.Projected_wise_data);




    if ($("#transaction_type").val() != undefined && $("#transaction_type").val() != "undefined" && $("#transaction_type").val() != "" && $("#transaction_type").val() != "select") {
      sessionStorage.setItem("un_Transaction_type", $("#transaction_type").val());
    }

    if ($("#transaction_mode").val() != undefined && $("#transaction_mode").val() != "undefined" && $("#transaction_mode").val() != "" && $("#transaction_type").val() != "select") {
      sessionStorage.setItem("un_Transaction_Mode", $("#transaction_mode").val());
    }


    if (this.Transaction_set_List != undefined && this.Transaction_set_List != 0 && this.Transaction_set_List != null) {

      // for (var i = 0; i < this.Transaction_set_List.length; i++) {
      //   this.selected_transaction_set_off_value.push(this.Transaction_set_List[i]);
      // }


      sessionStorage.setItem("un_Transaction_set_off", JSON.stringify(this.Transaction_set_List));
    }

    if (this.company_list_item != undefined && this.company_list_item.length != 0 && this.company_list_item != null) {

      // for (var i = 0; i < this.company_list_item.length; i++) {
      //   this.selected_bank_account_value.push(this.company_list_item);
      // }

      sessionStorage.setItem("un_Transaction_bank_account", JSON.stringify(this.company_list_item));
    }

    if (this.project_list_item != undefined && this.project_list_item.length != 0 && this.project_list_item != null) {
      // for (var i = 0; i <  this.project_list_item.length; i++) {
      //   this.selected_projectid_value.push( this.project_list_item[i].id);
      //   this.selected_projectid_name.push( this.project_list_item[i].name);

      // }
      sessionStorage.setItem("un_Project_back_Id", JSON.stringify(this.project_list_item));
      //sessionStorage.setItem("Project_back_name", JSON.stringify(this.selected_projectid_name));
    }

    sessionStorage.setItem("un_view_pending_approval_status", "true");


    if (itemData.transactionTypeName == "Receipt" && itemData.transactionModeName == "Cheque") {
      if (sessionStorage.getItem("session_deptid") == '997') {
        sessionStorage.setItem('sessionFor_receiptCheque', 'receiptCheque');
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
    } else if (itemData.transactionTypeName == "Payment" && itemData.transactionModeName == "Cheque") {  // 
      if (sessionStorage.getItem("session_deptid") == '995') {
        this.router.navigate(["Payment-Cheque"]);
      } else {
        this.router.navigate(["accounts-payment-cheque"]);
        sessionStorage.setItem("unclear", "UnCleared Cheque");
      }
    } else {
    }

  }




  toggleVisibility(event, item, index) {

    console.log(event);
    console.log(item);


    this.temp = event.target.id.split("tablerowdata")[1];
    if (event.target.checked == true) {
      $('#clearencedate' + this.temp).prop('disabled', false);
      $('#bouncedate' + this.temp).prop('disabled', false);
      $('#chequebounceComent' + this.temp).prop('disabled', false);


      $('#chequebouncereson' + this.temp).val();

      console.log($('#chequebouncereson' + index).val());

      //$("#clearencedate" + this.temp).focus();
      userRoleListTemp.push({
        "siteId": item.siteId,
        "siteName": item.siteName,
        "transactionTypeId": item.transactionTypeId,
        "transactionModeId": item.transactionModeId,
        "transactionTypeName": item.transactionTypeName,
        "transactionModeName": item.transactionModeName,
        "transactionAmount": item.transactionAmount,
        "transactionReceiveDate": item.transactionReceiveDate,
        "flatIds": item.flatId,
        "bookingFormId": item.bookingFormId,
        "finTransactionNo": item.finTransactionNo,
        "transactionEntryId": item.transactionEntryId,
        "transactionSetOffEntryId": 8,
        "transactionDate": item.transactionDate,
        "rowId": this.temp,
        "Reson": '',
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
        "transactionReceiveDate": item.transactionReceiveDate,
        "flatIds": item.flatId,
        "bookingFormId": item.bookingFormId,
        "finTransactionNo": item.finTransactionNo,
        "transactionEntryId": item.transactionEntryId,
        "transactionSetOffEntryId": 8,
        "transactionDate": item.transactionDate,
        "rowId": this.temp,
        "Reson": '',
      });
      userRoleListTemp.splice(index, 1);
      $('#clearencedate' + this.temp).prop('disabled', true);
      $('#bouncedate' + this.temp).prop('disabled', true);
      $('#chequebounceComent' + this.temp).prop('disabled', true);


      $('#clearencedate' + this.temp).val("");
      $('#bouncedate' + this.temp).val("");
      $('#chequebounceComent' + this.temp).val("select");



    }


    console.log(userRoleListTemp);

  }




  homeClick() {
    this.cmn.commonHomeNavigation();
  }




  cheque_bounce_clearFun(buttonval) {

    console.log(this.bounce_reason_value);


    if (buttonval == "Approve") {
      buttonType = "Approve";
      optionalButtonType = "Cheque Clear"
    } else if (buttonval == "Reject") {
      buttonType = "Reject";
      optionalButtonType = "Cheque Bounced"
    }


    userRoleListTemp.map(function (entry) {
      entry.buttonType = buttonType;
      return entry;
    });

    userRoleListTemp.map(function (entry) {
      entry.optionalButtonType = optionalButtonType;
      return entry;
    });



    if (sessionStorage.getItem("session_deptName") == "ACCOUNTS") {
      var temp_chequedepositDate;
      var temp_chequebounceDate;
      var temp_referenceNumber;
      var temp_chequebounceComent;

      maindivarray = [];
      for (var i = 0; i < userRoleListTemp.length; i++) {
        console.log(userRoleListTemp[i]);

        if (optionalButtonType == "Cheque Clear") {
          if ($("#clearencedate" + userRoleListTemp[i].rowId).val() == "") {
            temp_chequedepositDate = null;
            swal("Please select clearence date");
            return false;
          } else {

          }

          temp_chequedepositDate = new Date($("#clearencedate" + userRoleListTemp[i].rowId).val()).getTime()


          temp_chequebounceDate = null
          temp_chequebounceComent = "";


        } else {

          if ($("#bouncedate" + userRoleListTemp[i].rowId).val() == "") {
            temp_chequebounceDate = null;
            swal("Please select bounce date");
            return false;
          } else {
            temp_chequebounceDate = new Date($("#bouncedate" + userRoleListTemp[i].rowId).val()).getTime()
          }

          if ($("#chequebounceComent" + userRoleListTemp[i].rowId).val() == "select") {
            temp_chequebounceComent = "";
            swal("Please select bounce reason");
            return false;

          } else {
            temp_chequebounceComent = $("#chequebounceComent" + userRoleListTemp[i].rowId).val()

          }


          if (this.bounce_reason_value == "Others") {
            if (userRoleListTemp[i].Reson == "") {
              swal("Please enter the Cheque bounce reason");
              return false;
            }



          }

          temp_chequedepositDate = null;
          temp_referenceNumber = null
        }
        if (temp_referenceNumber == undefined) {
          temp_referenceNumber = null;
        }
        maindivarray.push({
          "siteId": userRoleListTemp[i].siteId,
          "siteName": userRoleListTemp[i].siteName,
          "transactionTypeId": userRoleListTemp[i].transactionTypeId,
          "transactionModeId": userRoleListTemp[i].transactionModeId,
          "transactionTypeName": userRoleListTemp[i].transactionTypeName,
          "transactionModeName": userRoleListTemp[i].transactionModeName,
          "transactionAmount": userRoleListTemp[i].transactionAmount,
          "transactionReceiveDate": userRoleListTemp[i].transactionReceiveDate,
          "flatIds": [userRoleListTemp[i].flatIds],
          "bookingFormId": userRoleListTemp[i].bookingFormId,
          "finTransactionNo": userRoleListTemp[i].finTransactionNo,
          "transactionEntryId": userRoleListTemp[i].transactionEntryId,
          "transactionSetOffEntryId": 8,
          "chequeClearanceDate": temp_chequedepositDate,
          "chequeBounceDate": temp_chequebounceDate,
          "chequeBounceReasonValue": temp_chequebounceComent,
          "chequeBounceComment": userRoleListTemp[i].Reson,
          "buttonType": userRoleListTemp[i].buttonType,
          "transactionDate": userRoleListTemp[i].transactionDate,
          // "referenceNo" : temp_referenceNumber,
          "optionalButtonType": userRoleListTemp[i].optionalButtonType,


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

            if (optionalButtonType == "Cheque Clear") {
              if ($('#clearencedate' + (temp)).val() == "") {
                $("#clearencedate" + (temp)).focus();
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

    //   // swal("Please select demand note date.");
    //   return false;
    // }


    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/approveFinancialMultipleTransaction.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    body = {
      "sessionKey": sessionStorage.getItem("login_sessionkey"),
      "financialTRNRequests": maindivarray
    }
    console.log(url);
    console.log(JSON.stringify(body));





    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        if (buttonval == "Approve") {
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
              //  this.router.navigate(["/uncleared-cheque-list"]);
              location.reload();
            }, 3000)
          })


        } else {
          swal('Your transaction successfully Bounced');
          this.router.navigate(["/uncleared-cheque-list"]);
          location.reload();
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
  attachmentlink(link) {

    window.open(link, '_system', 'location=yes,closebuttoncaption=Fechar,enableViewportScale=no');

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
        // $('#transaction_mode').html('');
        //  $('#transaction_mode').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.finTrnasactionTypeResponseList.length; i++) {
          $('#transaction_type').append("<option value='" + resp.responseObjList.finTrnasactionTypeResponseList[i].transactionTypeId + "'>" + resp.responseObjList.finTrnasactionTypeResponseList[i].name + "</option>");
        }

        // for (var i = 0; i < resp.responseObjList.finTransactionModeResponseList.length; i++) {
        //   $('#transaction_mode').append("<option value='" + resp.responseObjList.finTransactionModeResponseList[i].transactionModeId + "'>" + resp.responseObjList.finTransactionModeResponseList[i].name + "</option>");

        // }

        console.log(sessionStorage.getItem("un_Transaction_type"));
        if (sessionStorage.getItem("un_Transaction_type") != undefined && sessionStorage.getItem("un_Transaction_type") != "undefined" && sessionStorage.getItem("un_Transaction_type") != "" && sessionStorage.getItem("un_Transaction_type") != "select") {
          Transaction_type_back = sessionStorage.getItem("un_Transaction_type");
          $("#transaction_type").val(Transaction_type_back);
        }

        // if (sessionStorage.getItem("un_Transaction_Mode") != undefined && sessionStorage.getItem("un_Transaction_Mode") != "undefined" && sessionStorage.getItem("un_Transaction_Mode") != "" && sessionStorage.getItem("un_Transaction_Mode") != "select") {
        //   Transaction_Mode_back = sessionStorage.getItem("un_Transaction_Mode");
        //   $("#transaction_mode").val(Transaction_Mode_back);
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
        var error = JSON.parse(error._body).responseCode;
        $('.page-loader-wrapper').hide();
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );

  }


  searchFun() {
    $('#tableExport').DataTable().destroy();

    this.getPenidngTransactions("search");
  }

  cheque_reject_clearFun(buttonval) {

    console.log(this.bounce_reason_value);


    if (buttonval == "Reject") {
      buttonType = "Reject";

    }


    userRoleListTemp.map(function (entry) {
      entry.buttonType = buttonType;
      return entry;
    });



    console.log(sessionStorage.getItem("session_deptName"));

    if (sessionStorage.getItem("session_deptName") == "ACCOUNTS") {

      var temp_chequedepositDate;
      var temp_chequebounceDate;
      var temp_referenceNumber;
      var temp_chequebounceComent;

      maindivarray = [];
      for (var i = 0; i < userRoleListTemp.length; i++) {
        console.log(userRoleListTemp[i]);


        if ($("#clearencedate" + userRoleListTemp[i].rowId).val() == "") {
          temp_chequedepositDate = null;

        } else {
          swal("Please click on cheque clear button");
          return false;

        }

        temp_chequedepositDate = new Date($("#clearencedate" + userRoleListTemp[i].rowId).val()).getTime()


        temp_chequebounceDate = null
        temp_chequebounceComent = "";

        if ($("#bouncedate" + userRoleListTemp[i].rowId).val() == "") {
          temp_chequebounceDate = null;

        } else {
          swal("Please click on cheque bounce button");
          return false;


        }

        if ($("#chequebounceComent" + userRoleListTemp[i].rowId).val() == "select") {
          temp_chequebounceComent = "";


        } else {
          swal("Please click on cheque bounce button");
          return false;


        }


        if (this.bounce_reason_value == "Others") {
          if (userRoleListTemp[i].Reson == "") {

          } else {
            swal("Please click on cheque bounce button");
            return false;
          }



        }

        temp_chequedepositDate = null;
        temp_referenceNumber = null






      }

      maindivarray = [];
      for (var i = 0; i < userRoleListTemp.length; i++) {
        console.log(userRoleListTemp[i]);


        if (temp_referenceNumber == undefined) {
          temp_referenceNumber = null;
        }
        maindivarray.push({
          "siteId": userRoleListTemp[i].siteId,
          "siteName": userRoleListTemp[i].siteName,
          "transactionTypeId": userRoleListTemp[i].transactionTypeId,
          "transactionModeId": userRoleListTemp[i].transactionModeId,
          "transactionTypeName": userRoleListTemp[i].transactionTypeName,
          "transactionModeName": userRoleListTemp[i].transactionModeName,
          "transactionAmount": userRoleListTemp[i].transactionAmount,
          "transactionReceiveDate": userRoleListTemp[i].transactionReceiveDate,
          "flatIds": [userRoleListTemp[i].flatIds],
          "bookingFormId": userRoleListTemp[i].bookingFormId,
          "finTransactionNo": userRoleListTemp[i].finTransactionNo,
          "transactionEntryId": userRoleListTemp[i].transactionEntryId,
          "transactionSetOffEntryId": 8,
          "chequeDepositedDate": null,
          "challanReflectionDate": null,
          "chequeHandoverDate": null,
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

            if (optionalButtonType == "Cheque Clear") {
              if ($('#clearencedate' + (temp)).val() == "") {
                $("#clearencedate" + (temp)).focus();
                return false;
              }
            }



          }
          $("#demand_note_date").val(2)
        });
        return false;

      });

    }





    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/approveFinancialMultipleTransaction.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    body = {
      "sessionKey": sessionStorage.getItem("login_sessionkey"),
      "financialTRNRequests": maindivarray
    }
    console.log(url);
    console.log(JSON.stringify(body));


    


    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        swal('Your transaction successfully rejected');
        this.router.navigate(["/uncleared-cheque-list"]);
        location.reload();


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
