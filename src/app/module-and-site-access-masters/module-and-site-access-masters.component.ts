import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { RequestOptions, Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validator, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { ModuleAndSiteAccessMastersService } from './module-and-site-access-masters.service';
declare const $: any;
declare const swal: any;

@Component({
  selector: 'app-module-and-site-access-masters',
  templateUrl: './module-and-site-access-masters.component.html',
  styleUrls: ['./module-and-site-access-masters.component.sass']
})
export class ModuleAndSiteAccessMastersComponent implements OnInit {

  singledd1 = {};
  singledd2 = {};
  singledd3 = {};
  singledd4 = {};
  singledd5 = {};

  singledd6 = {};
  singledd7 = {};

  userForm: FormGroup;
  employee_list: Array<any> = [];
  title1: any;
  department_list: Array<any> = [];
  role_list: Array<any> = [];
  controller_sites_list: Array<any> = [];

  project_list_name: any;
  role_name: any;
  department_name: any;
  employee_name: any;
  controller: Array<any> = [];
  employes_statusid: any;
  department_select_id: any;
  roll_creation: any;
  new_site_creation: Array<any> = [];
  controller_data: Array<any> = [];
  view_controller: Array<any> = [];
  module_based_checked: any;
  sub_module_based_checked: any;
  disableread: boolean[] = [];
  disabled: boolean = true;

  demodata: Array<any> = [];
  sub_demodata: Array<any> = [];
  maincontroller: Array<any> = [];
  radio_Controller: Array<any> = [];
  selectType: any;
  selectname: any;
  second_div: boolean = true;
  second_submit: boolean = false;

  employee_div: boolean = true;
  department_div: boolean = true;
  role_div: boolean = true;
  project_div: boolean = true;
  Update_menu_and_sub_menu: boolean;
  menu_and_submenu_controller: Array<any> = [];

  sub_view_controller: Array<any> = [];
  moduleName_list: Array<any> = [];
  subModuleName_list: Array<any> = [];
  menu_controller_data: Array<any> = [];
  new_menu_creation: Array<any> = [];

  sub_menu_controller_data: Array<any> = [];
  new_sub_menu_creation: Array<any> = [];

  final_fourth_tab_sub_fun: Array<any> = [];

  menu_div: boolean;
  sub_menu_div: boolean;
  sub_menu_names: any;

  favoriteSeason: any;

  constructor(private cmn: CommonComponent, private http: Http, private router: Router,
    public fb: FormBuilder, private service: ModuleAndSiteAccessMastersService,) {
    $('.page-loader-wrapper').hide();


    this.radio_Controller = [];
    this.radio_Controller = [
      { Name: 'New project and new employee', id: '1' },
      { Name: 'New project and old employee', id: '2' },
    //  { Name: 'Update menu and sub menu', id: '3' },
      { Name: 'Update new menu to Role wise', id: '4' }
    ];



    this.userForm = this.fb.group({
      Employee: [''],
      Department: [''],
      Role: [''],
      Project_name: [''],
      Menu_name: [''],
      Sub_menu_name: ['']

    });

    this.singledd1 = {
      singleSelection: true,
      enableSearchFilter: true,
      searchPlaceholderText: 'Search',
      classes: 'my_dropdown1',
      unSelectAllText: 'UnSelect All',
      //lazyLoading: true,
    };

    this.singledd2 = {
      singleSelection: true,
      enableSearchFilter: true,
      searchPlaceholderText: 'Search',
      classes: 'my_dropdown1',
      unSelectAllText: 'UnSelect All',
      //lazyLoading: true,
    };

    this.singledd3 = {
      singleSelection: true,
      enableSearchFilter: true,
      searchPlaceholderText: 'Search',
      classes: 'my_dropdown1',
      unSelectAllText: 'UnSelect All',
      //lazyLoading: true,
    };



    this.singledd4 = {
      singleSelection: false,
      enableSearchFilter: true,
      searchPlaceholderText: 'Search',
      classes: 'my_dropdown1',
      unSelectAllText: 'UnSelect All',
      //lazyLoading: true,
    };


    this.singledd5 = {
      singleSelection: true,
      enableSearchFilter: true,
      searchPlaceholderText: 'Search',
      classes: 'my_dropdown1',
      unSelectAllText: 'UnSelect All',
      //lazyLoading: true,
    };


    this.singledd6 = {
      singleSelection: true,
      enableSearchFilter: true,
      searchPlaceholderText: 'Search',
      classes: 'my_dropdown1',
      unSelectAllText: 'UnSelect All',
      //lazyLoading: true,
    };


    this.singledd7 = {
      singleSelection: false,
      enableSearchFilter: true,
      searchPlaceholderText: 'Search',
      classes: 'my_dropdown1',
      unSelectAllText: 'UnSelect All',
      //lazyLoading: true,
    };


  }

  ngOnInit() {

    this.get_employee_list();
    this.get_department_list();
    this.get_site_list();
    this.get_menu_details();
    this.get_sub_menu_details();
  }

  get_employee_list() {
    $('.page-loader-wrapper').show();
    this.service.Employee_Details().then(resp => {
      console.log(JSON.stringify(resp));
      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 200) {
        this.employee_list = resp.responseObjList;
        this.employee_list.forEach((o: any, i) => (o.id = o.employeeId));
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


  emp_selectedSIDs(event) {
    this.employes_statusid = event.employeeId;

    if (this.selectname == 3) {
      this.employee_id_based_submodel_list(event.employeeId);
    }

  }

  emp_onItemDeSelect(event) {
    this.employes_statusid = null;
  }



  dep_selectedSIDs(event) {
    this.department_select_id = event.departmentId;
  }

  dep_onItemDeSelect(event) {
    this.department_select_id = null;

  }



  role_selectedSIDs(event) {
    this.roll_creation = event.roleId;

    if (this.selectname != 3 && this.selectname != 4) {
      this.role_id_based_submodel_list(event.roleId);
    }


  }

  role_onItemDeSelect(event) {
    this.roll_creation = event.roleId;
    this.controller = [];
  }


  sites_selectedSIDs(event) {
    console.log(event);
    this.controller_data = [];
    this.new_site_creation.push(event);
    for (var i = 0; i < this.new_site_creation.length; i++) {
      this.controller_data.push(this.new_site_creation[i].id);
    }

    console.log(this.controller_data);

  }
  sites_onSelectAll(event) {
    this.new_site_creation = [];
    this.controller_data = [];

    this.new_site_creation.push(event);
    for (var i = 0; i < this.new_site_creation[0].length; i++) {
      this.controller_data.push(this.new_site_creation[0][i].id);
    }
  }
  sites_onItemDeSelect(event) {
    this.new_site_creation = this.new_site_creation.filter((el) => el.id !== event.id);
    console.log(this.new_site_creation);
    this.controller_data = [];
    for (var i = 0; i < this.new_site_creation.length; i++) {
      this.controller_data.push(this.new_site_creation[i].id);
    }

    console.log(this.controller_data);

  }
  sites_onDeSelectAll(event) {
    this.new_site_creation = [];
    this.controller_data = [];
  }


  get_department_list() {
    $('.page-loader-wrapper').show();
    this.service.Department_Details().then(resp => {
      console.log(resp);
      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 200) {
        this.department_list = resp.responseObjList.departments;
        this.department_list.forEach((o: any, i) => (o.id = o.departmentId));

        this.role_list = resp.responseObjList.roles;
        this.role_list.forEach((o: any, i) => (o.id = o.roleId));

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


  get_site_list() {
    $('.page-loader-wrapper').show();

    var arr = localStorage.getItem('Site_Access_Masters');

    console.log(arr);
    console.log(JSON.parse(arr).map(String));

    this.service.Project_Details(JSON.parse(arr).map(String)).then(resp => {
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

  employee_id_based_submodel_list(employeeId) {


    $('.page-loader-wrapper').show();
    this.service.get_employee_change_details(employeeId).then(resp => {
      console.log(resp);
      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 200) {

        this.menu_and_submenu_controller = resp.responseObjList.menuSubMenuModule;

        this.menu_and_submenu_controller.forEach(item => item.checked = true);
        for (var i = 0; i < this.menu_and_submenu_controller.length; i++) {
          for (var j = 0; j < this.menu_and_submenu_controller[i].subMenuModuleList.length; j++) {
            if (this.menu_and_submenu_controller[i].subMenuModuleList[j].isModulePresent == "true") {
              this.menu_and_submenu_controller[i].subMenuModuleList[j].checked = true;
            } else {
              this.menu_and_submenu_controller[i].subMenuModuleList[j].checked = false;
            }

          }
        }
        console.log(this.menu_and_submenu_controller);


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

  role_id_based_submodel_list(roleid) {
    $('.page-loader-wrapper').show();
    this.service.submodules_details(roleid).then(resp => {
      console.log(resp);
      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 200) {
        this.controller = resp.responseObjList;

        this.controller.forEach(item => item.checked = true);
        //  this.controller.forEach(item => item.subMenuModuleList.checked = true);
        console.log(this.controller);

        for (var i = 0; i < this.controller.length; i++) {
          for (var j = 0; j < this.controller[i].subMenuModuleList.length; j++) {
            this.controller[i].subMenuModuleList[j].checked = true;
          }
        }

        console.log(this.controller);

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

  allNonTrades(event, itemdata, index) {
    const checked = event.target.checked;
    if (checked == true) {
      this.module_based_checked = itemdata;
    } else {

      for (var i = 0; i < this.controller.length; i++) {
        if (itemdata.moduleId == this.controller[i].moduleId) {
          this.controller[i].checked = false;
          for (var j = 0; j < this.controller[i].subMenuModuleList.length; j++) {
            this.controller[i].subMenuModuleList[j].checked = false;
          }
        }
      }
    }
  }

  sub_menu_allNonTrades(event, itemdata, index) {
    const checked = event.target.checked;
    if (checked == true) {
      this.sub_module_based_checked = itemdata;
    } else {

      for (var i = 0; i < this.menu_and_submenu_controller.length; i++) {
        if (itemdata.moduleId == this.menu_and_submenu_controller[i].moduleId) {
          this.menu_and_submenu_controller[i].checked = false;
          for (var j = 0; j < this.menu_and_submenu_controller[i].subMenuModuleList.length; j++) {
            this.menu_and_submenu_controller[i].subMenuModuleList[j].checked = false;
          }
        }
      }
    }
  }


  subNonTrades(event, itemdata) {
    const checked = event.target.checked;
    if (checked == true) {
    }

  }

  sub_menu_NonTrades(event, itemdata) {
    const checked = event.target.checked;
    if (checked == true) {
    }

  }



  // toogleButtonStatee(index:number , itemdata){
  //   for (var i = 0; i < itemdata.subMenuModuleList.length; i++) {
  //     itemdata.subMenuModuleList.action == false
  //   }
  // }




  submitFun() {
    if (this.employes_statusid == undefined || this.employes_statusid == "") {
      swal("Please select the employee");
      return false;
    }

    if (this.department_select_id == undefined || this.department_select_id == "") {
      swal("Please select the department");
      return false;
    }

    if (this.roll_creation == undefined || this.roll_creation == "") {
      swal("Please select the role");
      return false;
    }

    if (this.controller_data.length == 0 || this.controller_data == undefined) {
      swal("Please select the project");
      return false;
    }



    if (this.controller.length == 0) {
      swal("Pleae select Menu and Submenus below.");
      return false;
    }

    for (var i = 0; i < this.controller.length; i++) {
      if (this.controller[i].checked == false) {
        for (var j = 0; j < this.controller[i].subMenuModuleList.length; j++) {

          if (this.controller[i].subMenuModuleList[j].checked == true) {
            swal("Please select module name");
            return false;
          }

        }
      }


      if (this.controller[i].checked == true) {
        this.demodata = [];
        for (var j = 0; j < this.controller[i].subMenuModuleList.length; j++) {
          if (this.controller[i].subMenuModuleList[j].checked == false) {
            this.demodata.push(this.controller[i].subMenuModuleList[j].checked);

            if (this.demodata.length == this.controller[i].subMenuModuleList.length) {
              swal("Please select sub module name");
              return false;
            }
          }
        }
      }
    }

    this.view_controller = [];
    for (var i = 0; i < this.controller.length; i++) {

      if (this.controller[i].checked == true) {
        for (var j = 0; j < this.controller[i].subMenuModuleList.length; j++) {
          if (this.controller[i].subMenuModuleList[j].checked == true) {
            this.view_controller.push({
              "moduleId": this.controller[i].moduleId,
              "subModuleId": this.controller[i].subMenuModuleList[j].subModuleId
            });
          }
        }
      }




    }



    console.log(this.view_controller);




    $('.page-loader-wrapper').show();
    this.service.get_finally_submition(this.department_select_id, this.roll_creation, this.controller_data, this.employes_statusid, this.view_controller).then(resp => {
      console.log(resp);
      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 200) {

        swal({ title: resp.status },
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
        swal({ title: resp.errors[0] },
          function () {
            location.reload();
          }
        );

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


  homeClick() {
    this.router.navigate(['dashboard']);
  }


  handleChange(event, data) {
    this.selectType = event.target.value;
    this.selectname = data.id;

    if (this.selectname == 1) {
      this.employee_div = true;
      this.department_div = true;
      this.role_div = true;
      this.project_div = true;
      this.second_submit = false;
      this.userForm.reset();
      this.Update_menu_and_sub_menu = false;

      this.employes_statusid = "";
      this.department_select_id = "";
      this.roll_creation = "";
      this.controller_data = [];
      this.controller = [];
      this.menu_and_submenu_controller = [];
      this.menu_div = false;
      this.sub_menu_div = false;


    } else if (this.selectname == 2) {

      this.employee_div = true;
      this.department_div = false;
      this.role_div = false;
      this.project_div = true;
      this.second_submit = true;
      this.userForm.reset();
      this.Update_menu_and_sub_menu = false;

      this.employes_statusid = "";
      this.department_select_id = "";
      this.roll_creation = "";
      this.controller_data = [];
      this.controller = [];
      this.menu_and_submenu_controller = [];
      this.menu_div = false;
      this.sub_menu_div = false;


    }
    //  else if (this.selectname == 3) {
    //   this.employee_div = true;
    //   this.department_div = true;
    //   this.role_div = true;
    //   this.project_div = true;
    //   this.Update_menu_and_sub_menu = false;
    //   this.second_submit = false;
    //   this.userForm.reset();

    //   this.employes_statusid = "";
    //   this.department_select_id = "";
    //   this.roll_creation = "";
    //   this.controller_data = [];
    //   this.controller = [];
    //   this.menu_and_submenu_controller = [];
    //   this.menu_div = false;
    //   this.sub_menu_div = false;

    // }

    else if (this.selectname == 4) {

      this.employee_div = false;
      this.department_div = false;
      this.role_div = true;
      this.project_div = false;
      this.Update_menu_and_sub_menu = true;
      this.second_submit = false;
      this.userForm.reset();

      this.employes_statusid = "";
      this.department_select_id = "";
      this.roll_creation = "";
      this.controller_data = [];
      this.controller = [];
      this.menu_and_submenu_controller = [];

      this.menu_div = true;
      this.sub_menu_div = true;
    }

  }


  second_submitFun() {
    if (this.employes_statusid == undefined || this.employes_statusid == "") {
      swal("Please select the employee");
      return false;
    }

    if (this.controller_data.length == 0 || this.controller_data == undefined) {
      swal("Please select the project");
      return false;
    }
    $('.page-loader-wrapper').show();
    this.service.get_second_finally_submition(this.controller_data, this.employes_statusid).then(resp => {
      console.log(JSON.stringify(resp));
      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 200) {

        swal({ title: resp.status },
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
        swal({ title: resp.errors[0] },
          function () {
            location.reload();
          }
        );

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




  // sub_model_submitFun() {

  //   if (this.employes_statusid == undefined || this.employes_statusid == "") {
  //     swal("Please select the employee");
  //     return false;
  //   }

  //   if (this.department_select_id == undefined || this.department_select_id == "") {
  //     swal("Please select the department");
  //     return false;
  //   }

  //   if (this.roll_creation == undefined || this.roll_creation == "") {
  //     swal("Please select the role");
  //     return false;
  //   }

  //   if (this.controller_data.length == 0 || this.controller_data == undefined) {
  //     swal("Please select the project");
  //     return false;
  //   }



  //   if (this.menu_and_submenu_controller.length == 0) {
  //     swal("Pleae select Menu and Submenus below.");
  //     return false;
  //   }

  //   for (var i = 0; i < this.menu_and_submenu_controller.length; i++) {
  //     if (this.menu_and_submenu_controller[i].checked == false) {
  //       for (var j = 0; j < this.menu_and_submenu_controller[i].subMenuModuleList.length; j++) {

  //         if (this.menu_and_submenu_controller[i].subMenuModuleList[j].checked == true) {
  //           swal("Please select module name");
  //           return false;
  //         }

  //       }
  //     }


  //     if (this.menu_and_submenu_controller[i].checked == true) {
  //       this.sub_demodata = [];
  //       for (var j = 0; j < this.menu_and_submenu_controller[i].subMenuModuleList.length; j++) {
  //         if (this.menu_and_submenu_controller[i].subMenuModuleList[j].checked == false) {
  //           this.sub_demodata.push(this.menu_and_submenu_controller[i].subMenuModuleList[j].checked);

  //           if (this.sub_demodata.length == this.menu_and_submenu_controller[i].subMenuModuleList.length) {
  //             swal("Please select sub module name");
  //             return false;
  //           }
  //         }
  //       }
  //     }
  //   }

  //   this.sub_view_controller = [];
  //   for (var i = 0; i < this.menu_and_submenu_controller.length; i++) {

  //     if (this.menu_and_submenu_controller[i].checked == true) {
  //       for (var j = 0; j < this.menu_and_submenu_controller[i].subMenuModuleList.length; j++) {
  //         if (this.menu_and_submenu_controller[i].subMenuModuleList[j].checked == true) {
  //           this.sub_view_controller.push({
  //             "moduleId": this.menu_and_submenu_controller[i].moduleId,
  //             "subModuleId": this.menu_and_submenu_controller[i].subMenuModuleList[j].subModuleId
  //           });
  //         }
  //       }
  //     }




  //   }



  //   console.log(this.sub_view_controller);

  //   $('.page-loader-wrapper').show();
  //   this.service.get_finally_submition(this.department_select_id, this.roll_creation, this.controller_data, this.employes_statusid, this.sub_view_controller).then(resp => {
  //     console.log(resp);
  //     $('.page-loader-wrapper').hide();

  //     if (resp.responseCode == 200) {

  //       swal({ title: resp.status },
  //         function () {
  //           location.reload();
  //         }
  //       );
  //       return false;





  //     } else if (resp.responseCode == 440) {
  //       swal("Your Session has been Timed Out!", "Please login once again.", "error");
  //       this.router.navigate([""]);
  //     } else {
  //       $('.page-loader-wrapper').hide();
  //       swal({ title: resp.errors[0] },
  //         function () {
  //           location.reload();
  //         }
  //       );

  //       return false;
  //     }
  //   }, error => {
  //     $('.page-loader-wrapper').hide();
  //     var error = JSON.parse(error._body).responseCode;
  //     if (error == 440) {
  //       swal("Your Session has been Timed Out!", "Please login once again.", "error");
  //       this.router.navigate([""]);
  //     }
  //   }

  //   )

  // }

  get_menu_details() {
    $('.page-loader-wrapper').show();
    this.service.Get_Menu_Details().then(resp => {
      console.log(resp);
      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 200) {
        this.moduleName_list = resp.responseObjList;
        this.moduleName_list.forEach((o: any, i) => (o.id = o.moduleId));
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



  get_sub_menu_details() {
    $('.page-loader-wrapper').show();
    this.service.Get_Sub_Menu_Details().then(resp => {
      console.log(resp);
      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 200) {
        this.subModuleName_list = resp.responseObjList;
        this.subModuleName_list.forEach((o: any, i) => (o.id = o.subModuleId));
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


  menu_selectedSIDs(event) {
    console.log(event);
    this.menu_controller_data = [];
    this.new_menu_creation = [];
    this.new_menu_creation.push(event);
    for (var i = 0; i < this.new_menu_creation.length; i++) {
      this.menu_controller_data.push(this.new_menu_creation[i].id, this.new_menu_creation[i].moduleName);
    }

  }
  menu_onSelectAll(event) {

    this.menu_controller_data = [];
    this.new_menu_creation = [];

    this.new_menu_creation.push(event);
    for (var i = 0; i < this.new_menu_creation[0].length; i++) {
      this.menu_controller_data.push(this.new_menu_creation[0][i].id, this.new_menu_creation[0][i].moduleName);
    }

  }
  menu_onItemDeSelect(event) {
    this.menu_controller_data = [];
    this.new_menu_creation = [];
    this.new_menu_creation = this.new_menu_creation.filter((el) => el.id !== event.id);

    for (var i = 0; i < this.new_menu_creation.length; i++) {
      this.menu_controller_data.push(this.new_menu_creation[i].id, this.new_menu_creation[i].moduleName);
    }

  }
  menu_onDeSelectAll(event) {
    this.menu_controller_data = [];
    this.new_menu_creation = [];
  }





  sub_menus_selectedSIDs(event) {

    console.log(event);
     this.sub_menu_controller_data = [];
    //this.new_sub_menu_creation = [];

    this.new_sub_menu_creation.push(event);
    for (var i = 0; i < this.new_sub_menu_creation.length; i++) {
      this.sub_menu_controller_data.push({
        id: this.new_sub_menu_creation[i].id,
        name: this.new_sub_menu_creation[i].subModuleName
      });
    }

  }
  sub_menus_onSelectAll(event) {

    console.log(event);

    this.sub_menu_controller_data = [];
    this.new_sub_menu_creation = [];

    this.new_sub_menu_creation.push(event);
    for (var i = 0; i < this.new_sub_menu_creation[0].length; i++) {
      this.sub_menu_controller_data.push({
        id: this.new_sub_menu_creation[0][i].id,
        name: this.new_sub_menu_creation[0][i].subModuleName
      });
    }

  }
  sub_menus_onItemDeSelect(event) {
    console.log(event);

    // this.new_sub_menu_creation = [];


    this.new_sub_menu_creation = this.new_sub_menu_creation.filter((el) => el.id !== event.id);
    console.log(this.new_sub_menu_creation);
    this.sub_menu_controller_data = [];
    for (var i = 0; i < this.new_sub_menu_creation.length; i++) {
      this.sub_menu_controller_data.push({
        id: this.new_sub_menu_creation[i].id,
        name: this.new_sub_menu_creation[i].subModuleName
      });
    }


    console.log(this.sub_menu_controller_data);
  }
  sub_menus_onDeSelectAll(event) {
    this.sub_menu_controller_data = [];
    this.new_sub_menu_creation = [];
  }


  update_menu_submitFun() {



    if (this.roll_creation == undefined || this.roll_creation == "") {
      swal("Please select the role");
      return false;
    }

    if (this.menu_controller_data.length == 0 || this.menu_controller_data == undefined) {
      swal("Please select the menu name");
      return false;
    }

    if (this.sub_menu_controller_data.length == 0 || this.sub_menu_controller_data == undefined) {
      swal("Please select the sub menu name");
      return false;
    }

    console.log(this.roll_creation);
    console.log(this.menu_controller_data);
    console.log(this.sub_menu_controller_data);

    this.final_fourth_tab_sub_fun = [];
    for (var i = 0; i < this.sub_menu_controller_data.length; i++) {
      this.final_fourth_tab_sub_fun.push({
        "moduleId": this.menu_controller_data[0],
        "subModuleId": this.sub_menu_controller_data[i].id,
        "moduleName": this.menu_controller_data[1],
        "subModuleName": this.sub_menu_controller_data[i].name
      });
    }

    console.log(this.final_fourth_tab_sub_fun);

   




    console.log(this.final_fourth_tab_sub_fun);

    $('.page-loader-wrapper').show();
    this.service.get_Update_new_menu_to_all(this.roll_creation, this.final_fourth_tab_sub_fun).then(resp => {
      console.log(JSON.stringify(resp));
      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 200) {

        swal({ title: resp.status },
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
        swal({ title: resp.errors[0] },
          function () {
            location.reload();
          }
        );

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
