import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Http } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonComponent } from '../common/common.component';
import { AddAccountAndUpdateAccountService } from './add-account-and-update-account.service';

declare const $: any;
declare const swal: any;

@Component({
  selector: 'app-add-account-and-update-account',
  templateUrl: './add-account-and-update-account.component.html',
  styleUrls: ['./add-account-and-update-account.component.sass']
})
export class AddAccountAndUpdateAccountComponent implements OnInit {
  ifscForm: FormGroup;

  controller_sites_list: Array<any> = [];
  controller_payment_setoff_list: Array<any> = [];
  controller_bank_list: Array<any> = [];
  controller_owner_type_list: Array<any> = [];
  project_list_name: Array<any> = [];
  setoff_list_name: Array<any> = [];
  bank_list_name: Array<any> = [];
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
  Account_Holder_Name: any;
  Enter_Account_Number: any;
  Enter_Branch_Name: any;
  Enter_ISFC_Code: any;
  address_data: any;
  sub: any;
  back_input_param: any;


  constructor(private formBuilder: FormBuilder, private cmn: CommonComponent,
    private service: AddAccountAndUpdateAccountService, private fb: FormBuilder,
    private http: Http, private router: Router, private route: ActivatedRoute) {
    $('.page-loader-wrapper').hide();



    this.ifscForm = this.fb.group({
      ifscCode: ['', [Validators.required, Validators.pattern('^[A-Z]{4}0[0-9]{6}$')]]
    });

    $(document).ready(function () {
      $("#Enter_ISFC_Code").change(function () {
        var inputvalues = $(this).val();
        var reg = /[A-Z|a-z]{4}[0][a-zA-Z0-9]{6}$/;
        if (inputvalues.match(reg)) {
          return true;
        }
        else {
          $("#Enter_ISFC_Code").val("");

          swal("You entered invalid IFSC code");
          return false;
        }
      });
    });



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
      console.log(JSON.stringify(resp));
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

        console.log(this.controller_bank_list);

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


  keyPress1(event: any) {
    if (event.which === 32 && event.target.selectionStart === 0) {
      return false;
    } else {
      const pattern = /^[a-zA-Z ]*$/;
      const inputChar = String.fromCharCode(event.charCode);
      if (event.keyCode !== 8 && !pattern.test(inputChar)) {
        event.preventDefault();
      }

      if (event.target.value.length > 100) {
        event.target.value = event.target.value.slice(0, -1);
      }
    }
  }


  keyPress(event: any) {
    if (event.which === 32 && event.target.selectionStart === 0) {
      return false;
    } else {
      const pattern = /^[a-zA-Z ]*$/;
      const inputChar = String.fromCharCode(event.charCode);
      if (event.keyCode !== 8 && !pattern.test(inputChar)) {
        event.preventDefault();
      }

      if (event.target.value.length > 100) {
        event.target.value = event.target.value.slice(0, -1);
      }
    }
  }


  pincodefun(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    } else {
      if (event.target.value.length > 20) {
        event.target.value = event.target.value.slice(0, -1);
      }
    }
    return true;
  }


  autocompletedfun(event) {
    console.log(event.target.value);

    if (event.target.value != "") {
      $('.page-loader-wrapper').show();
      this.service.Get_account_number_fun(event.target.value).then(resp => {
        console.log(resp);
        $('.page-loader-wrapper').hide();
        if (resp.responseCode == 200) {

          if (resp.responseObjList !== null) {

            this.singledd3 = {
              singleSelection: true,
              enableSearchFilter: true,
              searchPlaceholderText: 'Search',
              classes: 'my_dropdown1',
              unSelectAllText: 'UnSelect All',
              disabled: true
            };

            $("#Account_Holder_Name").css({ backgroundColor: '#eee' });
            $("#Enter_Branch_Name").css({ backgroundColor: '#eee' });
            $("#Enter_ISFC_Code").css({ backgroundColor: '#eee' });
            $("#address_data").css({ backgroundColor: '#eee' });

            $("#Account_Holder_Name").prop( "disabled", true );
            $("#Enter_Branch_Name").prop( "disabled", true );
            $("#Enter_ISFC_Code").prop( "disabled", true );
            $("#address_data").prop( "disabled", true );


            $("#Account_Holder_Name").val(resp.responseObjList[0].holder);
            $("#Enter_Account_Number").val(resp.responseObjList[0].accountno);
            $("#Enter_Branch_Name").val(resp.responseObjList[0].branch);
            $("#Enter_ISFC_Code").val(resp.responseObjList[0].ifsc);
            $("#address_data").val(resp.responseObjList[0].adress);

            if (resp.responseObjList[0].finBankId != null && resp.responseObjList[0].finBankId != "") {
              this.bank_list_name = [
                {
                  id: resp.responseObjList[0].finBankId,
                  bankName: resp.responseObjList[0].bankName
                }
              ]

              this.controller_bank_data = resp.responseObjList[0].finBankId;
            }

            // if (resp.responseObjList[0].siteId != null && resp.responseObjList[0].siteId != "") {
            //   this.project_list_name = [
            //     {
            //       id: resp.responseObjList[0].siteId,
            //       name: resp.responseObjList[0].siteName
            //     }
            //   ]

            //   this.controller_site_data = resp.responseObjList[0].siteId;
            // }

            this.owner_type_list(resp.responseObjList[0].siteId);

            // if (resp.responseObjList[0].setofftypr != null && resp.responseObjList[0].setofftypr != "") {
            //   this.setoff_list_name = [
            //     {
            //       id: resp.responseObjList[0].setofftypr,
            //       key: resp.responseObjList[0].setofftype
            //     }
            //   ]

            //   this.controller_setoff_data = resp.responseObjList[0].setofftypr;

            // }


            // setTimeout(() => {
            //   if (resp.responseObjList[0].saleOwnerId != null && resp.responseObjList[0].saleOwnerId != "") {
            //     this.owner_list_name = [
            //       {
            //         id: resp.responseObjList[0].saleOwnerId,
            //         flatSaleOwner: resp.responseObjList[0].saleOwner
            //       }
            //     ]

            //     this.controller_owner_data = resp.responseObjList[0].saleOwnerId;

            //   }

            // }, 800);

          } else {

            this.bank_list_name = [];

            this.singledd3 = {
              singleSelection: true,
              enableSearchFilter: true,
              searchPlaceholderText: 'Search',
              classes: 'my_dropdown1',
              unSelectAllText: 'UnSelect All',
              disabled: false
            };

            $(document).ready(function () {
              $("#Account_Holder_Name").val("");
              $("#Enter_Branch_Name").val("");
              $("#Enter_ISFC_Code").val("");
              $("#address_data").val("");


              $("#Account_Holder_Name").css({ backgroundColor: '#FFF!important' });
              $("#Enter_Branch_Name").css({ backgroundColor: '#FFF!important' });
              $("#Enter_ISFC_Code").css({ backgroundColor: '#FFF!important' });
              $("#address_data").css({ backgroundColor: '#FFF!important' });
  
              $("#Account_Holder_Name").prop( "disabled", false );
              $("#Enter_Branch_Name").prop( "disabled", false );
              $("#Enter_ISFC_Code").prop( "disabled", false );
              $("#address_data").prop( "disabled", false );


            });


          }




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

  submitfunction() {




    if ($("#Account_Holder_Name").val() == "" || $("#Account_Holder_Name").val() == undefined) {
      this.Account_Holder_Name = null;
      swal("Please enter the account holder name");
      return false;

    } else {
      this.Account_Holder_Name = $("#Account_Holder_Name").val();
    }


    if ($("#Enter_Account_Number").val() == "" || $("#Enter_Account_Number").val() == undefined) {
      this.Enter_Account_Number = null;
      swal("Please enter the  account number");
      return false;
    } else {
      this.Enter_Account_Number = $("#Enter_Account_Number").val();
    }

    console.log(this.controller_bank_data);

    if (this.controller_bank_data == undefined || this.controller_bank_data == "") {
      this.controller_bank_data = null;
      swal("Please Select the Bank name");
      return false;
    }


    if ($("#Enter_Branch_Name").val() == "" || $("#Enter_Branch_Name").val() == undefined) {
      this.Enter_Branch_Name = null;

      swal("Please enter the branch name");
      return false;

    } else {
      this.Enter_Branch_Name = $("#Enter_Branch_Name").val();
    }


    if ($("#Enter_ISFC_Code").val() == "" || $("#Enter_ISFC_Code").val() == undefined) {
      this.Enter_ISFC_Code = null;
      swal("Please enter the IFSC code");
      return false;
    } else {
      this.Enter_ISFC_Code = $("#Enter_ISFC_Code").val();
    }

    if (this.controller_site_data == undefined || this.controller_site_data == null) {
      swal("Please select the project name");
      return false;
    }

    if (this.controller_site_data == undefined || this.controller_site_data == "") {
      this.controller_site_data = null;
    }


    if (this.controller_setoff_data == undefined || this.controller_setoff_data == "") {
      this.controller_setoff_data = null;
      swal("Please Select the Setoff type");
      return false;
    }


    if (this.controller_owner_data == undefined || this.controller_owner_data == "") {
      this.controller_owner_data = null;
      swal("Please Select the Owner Type");
      return false;
    }


    if ($("#address_data").val() == "" || $("#address_data").val() == undefined) {
      this.address_data = null;
      swal("Please enter the address");
      return false;
    } else {
      this.address_data = $("#address_data").val();
    }



    console.log(this.Account_Holder_Name);
    console.log(this.Enter_Account_Number);
    console.log(this.controller_bank_data);
    console.log(this.Enter_Branch_Name);
    console.log(this.Enter_ISFC_Code);
    console.log(this.controller_site_data);
    console.log(this.controller_setoff_data);
    console.log(this.controller_owner_data);
    console.log(this.address_data);


    if (confirm("Are you sure you want to save the account details ?")) {
      $('.page-loader-wrapper').show();
      this.service.Get_save_function(this.Enter_Account_Number, this.Enter_Branch_Name, this.address_data, this.controller_bank_data, this.controller_site_data, this.controller_owner_data, this.controller_setoff_data, this.Account_Holder_Name, this.Enter_ISFC_Code).then(resp => {
        console.log(resp);
        $('.page-loader-wrapper').hide();
        if (resp.responseCode == 200) {

          $('.page-loader-wrapper').hide();
          swal({ title: resp.status },
            function () {
              location.reload();
            }
          );


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



  homeClick() {
    this.router.navigate(['dashboard']);
  }

  view_and_update_account() {
    this.router.navigate(['View_Bank_Account_Details']);
  }




}

