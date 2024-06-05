import { NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { CommonComponent } from '../common/common.component';
import { Carparking } from '../model/carparking.model';
//import { SinglepageprojectdetailsComponent } from '../singlepageprojectdetails/singlepageprojectdetails.component';
//import { ShortcutService } from '../shortcut-components.service';

import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';



declare const $: any;
declare const swal: any;
var statusidname;
var projectidname;
var selected_blockid;
var Blockidname;
var selected_flatid;
@Component({
  selector: 'app-car-parking-view',
  templateUrl: './car-parking-view.component.html',
  styleUrls: ['./car-parking-view.component.sass']
})
export class CarParkingViewComponent implements OnInit {
  controller: Array<any> = [];
  closeResult = '';
  controllername: any;
  valblockname: boolean;
  valflatname: boolean;
  customer_Id: any;
  flatbooking_Id: any;
  flatId_Id: any;
  deptId: any;
  roleId: any;

  Allottedbuttons: boolean;
  buttontype: string;
  PdfPreview: any;
  Approvebtn: boolean;
  Rejectbtn: boolean;

  constructor(private formBuilder: FormBuilder, private cmn: CommonComponent,
    private http: Http, private router: Router, private modalService: NgbModal,) {
    this.siteList();
    this.deptId = sessionStorage.getItem("session_deptid");
    this.roleId = sessionStorage.getItem("session_roleId");

 

  }

  ngOnInit() {

    $(function () {

 
      
      var self = this;

      $("#statusId").select2({
        placeholder: "Select status",
        dir: "ltl",
      });

      $("#projectID").select2({
        placeholder: "Select project",
        dir: "ltl",
      });

      $('#statusId').change(function (event) {
        console.log(event.target.value);
        if (event.target.value == "select") {
          statusidname = null;
        } else {
          statusidname = event.target.value;


        }
      });

      $('#projectID').change(function (event) {
        console.log(event.target.value);
        if (event.target.value == "select") {
          projectidname = null;
        } else {


          projectidname = JSON.parse(event.target.value);

        }
      });






    })
  }
  /*-----------------Getting Project(site) list Start---------------------*/
  siteList() {
    var arr = localStorage.getItem('ViewCarParking');
    console.log(arr)
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
  getDetails() {

    $('#tableExport').DataTable().destroy();
    if ($('#statusId').val() == "select") {
      swal("please select status");
      return false;
    }

    if ($('#projectID').val() == "select") {
      swal("please select project");
      return false;
    }


    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "carParkingAllotment/getAllCarParkingAllotmentDetails.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "slotStatusName": statusidname,
      "siteId": projectidname
    }

    console.log(body);



    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      console.log("-----car parking view reponse :" + JSON.stringify(resp))
      this.controller = [];

      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {

        this.controller = resp.responseObjList.carParkingAllotmentSlotResponseList;
        console.log(this.controller);

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
            });

          })
        }, 2000)


      } else if (resp.responseCode == 440) {
        $('.page-loader-wrapper').hide();
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



  /*------------------------Projects On Change Functionality Start--------------------*/
  projectchangeFun(selectedSiteID) {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "block/blocks.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "ids": [selectedSiteID],
      "requestUrl": "All"
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





  open(content, item) {

    console.log(content);
    console.log(item);
    this.controllername = item;
    if (this.controllername.slotStatusName == "Open") {
      if (this.deptId == 994 && this.roleId == 6) {
        var test = this;
        this.projectchangeFun(projectidname);
        this.flatsitewisechange(projectidname);
        $(function () {
          var self = test;
          $("#BlockId").select2({
            placeholder: "Select block",
            dir: "ltl",
          });

          $("#flatSelection").select2({
            placeholder: "--Select--",
            dir: "ltl"
          });

          $('#BlockId').change(function (event) {
            if (event.target.value == "select") {
              Blockidname = null;
              $("#flatSelection option[value]").remove();
            } else {
              Blockidname = event.target.value;
              console.log(Blockidname);
              self.flatwiseblockchange(Blockidname);
            }
          })


          $('#flatSelection').change(function (event) {
            selected_flatid = $(event.target).val();
            if (event.target.value == "select") {
            } else {
              self.flatchangeFun(selected_flatid);
            }
          })
        });

        this.modalService.open(content, { backdrop: 'static', size: 'lg', keyboard: false, centered: true }).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      }

    }


    if (this.controllername.slotStatusName == "Allotted") {
      if (this.deptId == 994 && this.roleId == 6) {
        $(function () {
          $("#cancleslot").show();
          $("#holdslot").show();
        })
      } else {

        $(function () {
          $("#cancleslot").hide();
          $("#holdslot").hide();
        })

      }

      this.modalService.open(content, { backdrop: 'static', size: 'lg', keyboard: false, centered: true }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }


    if (this.controllername.slotStatusName == 'Hold' || this.controllername.slotStatusName == 'Cancelled') {
      // alert(this.deptId)
      //  alert(this.roleId)

      this.modalService.open(content, { backdrop: 'static', size: 'lg', keyboard: false, centered: true }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }


    if (this.controllername.slotStatusName == "Pending For Approval") {

      console.log(item.approverEmpId);
      console.log(sessionStorage.getItem("employeeId"));

      if(item.approverEmpId == sessionStorage.getItem("employeeId")){
        this.Approvebtn = true;
        this.Rejectbtn = true;
      } else {
        this.Approvebtn = false;
        this.Rejectbtn = false;
      }

      this.GeneratePDFPreview(item.slotId, item.flatBookId);

      this.modalService.open(content, { backdrop: 'static', size: 'lg', keyboard: false, centered: true }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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


  flatsitewisechange(siteid) {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "flat/flatSite.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "ids": [siteid],
      "requestUrl": "All"
    }
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      console.log("flat List----- :" + JSON.stringify(resp))
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#flatSelection').html("");

        $('#flatSelection').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#flatSelection').append("<option value='" + resp.responseObjList[i].detId + "'>" + resp.responseObjList[i].name + "</option>");

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
      "requestUrl": "All"
    }

    console.log(body);
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      console.log(resp);
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#flatSelection').html("");
        $('#flatSelection').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#flatSelection').append("<option value='" + resp.responseObjList[i].detId + "'>" + resp.responseObjList[i].name + "</option>");

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


  /*------------------------Floors On Change Functionality Start--------------------*/
  flatchangeFun(selectedFlatID) {

    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/activeBlocksFlats.spring";
    console.log("url :" + url);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "flatIds": [selectedFlatID]
    }
    console.log("----body :" + JSON.stringify(body));
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      //$('.page-loader-wrapper').hide();
      console.log("flat change response----------" + JSON.stringify(resp));
      //this.Blocklinks =  resp;
      if (resp.responseCode == 200) {

        $('.page-loader-wrapper').hide();
        this.customer_Id = resp.responseObjList[0].customerId;
        this.flatbooking_Id = resp.responseObjList[0].flatBookingId;
        this.flatId_Id = resp.responseObjList[0].flatId;


      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        swal(resp.status);
      }
    },
      error => {
        var error = JSON.parse(error._body).responseCode;
        //alert(error);
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

  Allotparkingfun() {
    if ($('#BlockId').val() == "select") {
      swal("please select block name");
      return false;
    }

    if ($('#flatSelection').val() == "select") {
      swal("please select flat name");
      return false;
    }

    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "carParkingAllotment/saveCarParkingAllotmentDetails.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "flatBookId": this.flatbooking_Id,
      "carParkingAllotmentBasementInfoList": [
        {
          "basementId": this.controllername.basementId,
          "slotId": this.controllername.slotId
        }
      ]
    }
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      console.log("------open response:" + JSON.stringify(resp))
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        this.modalService.dismissAll();
        swal(resp.description);
        this.getDetails()
        return false;
      } else if (resp.responseCode == 204) {
        this.modalService.dismissAll();
        swal(resp.errors[0]);
        return false;

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



  cancleslotfun() {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "carParkingAllotment/updateCarParkingAllotmentStatus.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "slotStatusName": "Cancelled",
      "allotmentId": this.controllername.allotmentId,
      "flatBookId": this.controllername.flatBookId,
      "slotId": this.controllername.slotId
    }

    console.log(body);

    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      console.log(resp);
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        this.modalService.dismissAll();
        swal(resp.description);
        this.getDetails()
        return false;
      } else if (resp.responseCode == 204) {
        this.modalService.dismissAll();
        swal(resp.errors[0]);
        return false;

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



  Holdslotfun() {
    if (this.controllername.slotStatusName == 'Open') {
      if ($('#BlockId').val() == "select") {
        swal("please select block name");
        return false;
      }

      if ($('#flatSelection').val() == "select") {
        swal("please select flat name");
        return false;
      }
    }

    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "carParkingAllotment/updateCarParkingAllotmentStatus.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "slotStatusName": "Hold",
      "allotmentId": this.controllername.allotmentId,
      "flatBookId": this.controllername.flatBookId,
      "slotId": this.controllername.slotId
    }

    console.log(body);

    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      console.log(resp);
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        this.modalService.dismissAll();
        swal(resp.description);
        this.getDetails()
        return false;
      } else if (resp.responseCode == 204) {
        this.modalService.dismissAll();
        swal(resp.errors[0]);
        return false;

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

  myfile(file) {
    window.open(file)
  }



  Approvefun(usertype, userdata) {

    console.log(usertype);
    console.log(userdata);

    console.log(userdata.allotmentId);

    console.log(userdata.slotId);

    console.log(userdata.flatBookId);

  

    if (usertype == 'Approve') {
      this.buttontype = 'APPROVED';

    } else if (usertype == 'Reject') {
      this.buttontype = 'REJECTED';
    }


    $(".page-loader-wrapper").show();
    var url = this.cmn.commonUrl + "carParkingAllotment/approveOrRejectAllotment.spring";
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "slotStatusName": this.buttontype,
      "allotmentId": userdata.allotmentId,
      "slotId": userdata.slotId,
      "flatBookId": userdata.flatBookId,
      "comments": "Approving this slot"
    }

    console.log(JSON.stringify(body));




    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      console.log(JSON.stringify(resp));

      $(".page-loader-wrapper").hide();

      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        this.modalService.dismissAll();
        swal(usertype + " successfully completed");
        this.getDetails()
        return false;
      } else if (resp.responseCode == 440) {
        $('.page-loader-wrapper').hide();
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
      }

    }, error => {
      $('.page-loader-wrapper').hide();
      console.log(error);
      var error = JSON.parse(error._body).responseCode;
      if (error == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      }


    });
  }




  GeneratePDFPreview(slotId, flatBookId) {

    console.log(slotId);
    console.log(flatBookId);

    console.log("Working fine");


    //  $(".page-loader-wrapper").show();
    var url = this.cmn.commonUrl + "carParkingAllotment/allotmentLetterPdfPreview.spring";
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "slotId": slotId,
      "flatBookId": flatBookId
    }
    console.log(body);


    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      console.log(resp);

      $(".page-loader-wrapper").hide();

      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();

        this.PdfPreview = resp.responseObjList.allotmentLetterPathList[0];
        console.log(this.PdfPreview);

      } else if (resp.responseCode == 440) {
        $('.page-loader-wrapper').hide();
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
      }

    }, error => {
      $('.page-loader-wrapper').hide();
      console.log(error);
      var error = JSON.parse(error._body).responseCode;
      if (error == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      }


    });


  }
}
