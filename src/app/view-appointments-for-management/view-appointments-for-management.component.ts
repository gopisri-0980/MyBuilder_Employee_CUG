import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, FormBuilder } from "@angular/forms";
import { Http, RequestOptions, Headers } from '@angular/http';
import { ActivatedRoute, Router, RoutesRecognized } from "@angular/router";
import { CommonComponent } from '../common/common.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ViewAppointmentsForManagementService } from "./view-appointments-for-management.service";
import * as moment from "moment";
import { ExcelService } from "./excel.service";

declare const $: any;
declare const swal: any;

var selected_projectid;
var selected_blockid;
var site_name;

@Component({
  selector: 'app-view-appointments-for-management',
  templateUrl: './view-appointments-for-management.component.html',
  styleUrls: ['./view-appointments-for-management.component.css']
})
export class ViewAppointmentsForManagementComponent implements OnInit {

  fg: FormGroup;
  Tabledata: any;
  sitename: any;
  blockname: any;
  startdata: any;
  enddate: any;
  closeResult = '';

  public flag = false;
  d = null;
  controller: any;
  Tablecontroller: Array<any> = [];

  page = 0;
  size = 4;

  data = [];
  p: number;
  employeename: any;
  statusname: any;
  apptmtBookingsId: any;
  flatBookId: any;
  statusdata: any;
  yourminutestextarea: any;
  tempdata: string;
  popres: any = [];
  temp: any;
  apptmtStatusName: any;
  apptmtReqComments: any;
  excel_controller: Array<any> = [];

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // obs: Observable<any>;
  // dataSource: MatTableDataSource<Card> = new MatTableDataSource<Card>(DATA);




  constructor(private cmn: CommonComponent, private http: Http, private formBuilder: FormBuilder,
    private router: Router, private modalService: NgbModal, private changeDetectorRef: ChangeDetectorRef,
    private service: ViewAppointmentsForManagementService, private excelService: ExcelService) {
    $('.page-loader-wrapper').hide();
    this.tempdata = sessionStorage.getItem('myobj')
    this.siteList();
    this.employeewisedate();





  }

  ngOnInit() {

    //this.defaultslots()


    this.fg = new FormGroup(
      {
        from: new FormControl(""),
        to: new FormControl("")
      },
      [Validators.required, this.dateRangeValidator]
    );


    $("#projectID").select2({
      placeholder: "--Select--",
      dir: "ltl",
    });

    $("#BlockId").select2({
      placeholder: "--Select--",
      dir: "ltl"
    });


    $("#Employeenames").select2({
      placeholder: "--Select--",
      dir: "ltl"
    });


    $("#StatusId").select2({
      placeholder: "--Select--",
      dir: "ltl"
    });


    var self = this;
    $(function () {

      //   $("input").on("change", function() {
      //     this.setAttribute(
      //         "data-date",
      //         moment(this.value, "YYYY-MM-DD")
      //         .format( this.getAttribute("data-date-format") )
      //     )
      // }).trigger("change")


      $('#projectID').change(function (e) {
        selected_projectid = $(e.target).val();
        site_name = $('#projectID').select2('data')[0].text
        if (selected_projectid == "select") {
          $("#BlockId option[value]").remove();
        } else {
          self.projectchangeFun(selected_projectid);
        }
      })

      $('#BlockId').change(function (e) {
        selected_blockid = $(e.target).val();
        if (selected_blockid == "select") {
          // swal("please select the block");
        } else {

        }
      })


    });

    // this.changeDetectorRef.detectChanges();
    // this.dataSource.paginator = this.paginator;
    // this.obs = this.dataSource.connect();
  }


  ngOnDestroy() {

    // if (this.dataSource) {
    //   this.dataSource.disconnect();
    // }
  }

  public toggle(): void {
    this.flag = !this.flag
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



  /*-----------------Getting Project(site) list Start---------------------*/
  siteList() {
    var arr = localStorage.getItem('ViewAppointments');

    console.log(arr);
    $('.page-loader-wrapper').show();
    this.service.ProjectDetails(JSON.parse(arr).map(String)).then(resp => {
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


  /*------------------------Projects On Change Functionality Start--------------------*/
  projectchangeFun(selectedSiteID) {
    $('.page-loader-wrapper').show();
    this.service.Blockdetails(selectedSiteID).then(resp => {
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
    }, error => {
      $('.page-loader-wrapper').hide();
      var error = JSON.parse(error._body).responseCode;
      if (error == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      }
    }
    );
  }
  /*------------------------Projects On Change Functionality End--------------------*/





  searchfunction() {
    this.sitename = $("#projectID").val();
    this.blockname = $("#BlockId").val();
    this.startdata = $("#fromDate").val();
    this.enddate = $("#toDate").val();
    this.employeename = $("#Employeenames").val();

    this.statusname = $("#StatusId").val();

    console.log(this.statusname);


    if (this.sitename == "select" && this.blockname == null && this.startdata == "" && this.enddate == "" && this.statusname == "select") {
      swal("Please select any option to continue!");
      return false;
    }

    var startdate = $('#fromDate').val();
    var endDate = $('#toDate').val();
    if (new Date(startdate) > new Date(endDate)) {
      swal('Please select  a valid from and to date');
      return false;
    }

    if (this.sitename == "select" || this.sitename == "") {
      this.sitename = null;
    }


    if (this.blockname == "select" || this.blockname == "") {
      this.blockname = null;
    }


    if (this.startdata == "") {
      this.startdata = null;
    }

    if (this.enddate == "") {
      this.enddate = null;
    }

    $('.page-loader-wrapper').show();
    this.service.searchsubmitfun(this.startdata, this.enddate, this.sitename, this.blockname, this.employeename, this.statusname).then(resp => {

      console.log(resp);

      this.p = 1;
      this.Tablecontroller = [];
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        this.Tablecontroller = resp.responseObjList.apptmtBookingsDetailResponseList;
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
      if (error == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      }
    }
    );
  }



  open(content, item) {
    this.controller = item;
    this.modalService.open(content, { backdrop: 'static', size: 'lg', keyboard: false, centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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


  homeClick() {

    this.router.navigateByUrl("dashboard");
  }


  startdatefun() {
    $("#fromDate").val("");
  }

  endtimefun() {
    $("#toDate").val("");
  }

  ClearAll() {

    $("#fromDate").val("");
    $("#toDate").val("");
    $("#projectID").val(['select']);
    $("#projectID").trigger('change');

    $("#Employeenames").val(['select']);
    $("#Employeenames").trigger('change');

    $("#StatusId").val(['select']);
    $("#StatusId").trigger('change');
  }


  employeewisedate() {

    $('.page-loader-wrapper').show();
    this.service.Employeedetails().then(resp => {
      console.log(resp);
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#Employeenames').html("");
        $('#Employeenames').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#Employeenames').append("<option value='" + resp.responseObjList[i].empId + "'>" + resp.responseObjList[i].employeeName + "</option>");
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




  open3(content3, userdata) {

    this.apptmtStatusName = userdata.apptmtStatusName;
    this.apptmtReqComments = userdata.apptmtSummary

    this.modalService.open(content3, { backdrop: 'static', size: 'lg', keyboard: false, centered: true, }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason3(reason)}`;
    });
  }

  private getDismissReason3(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }



  savepopupfun() {
    this.statusdata = $("#popupStatus").val();
    this.yourminutestextarea = $("#yourminutestextarea").val();

    if (this.statusdata == "select") {
      swal("Please select the Status");
      return false;
    }

    if (this.yourminutestextarea == undefined || this.yourminutestextarea == null || this.yourminutestextarea == "") {
      swal("Please enter the Note Your Minutes of Meeting here!");
      return false;
    }

    console.log(this.statusdata);
    console.log(this.apptmtBookingsId);
    console.log(this.flatBookId);
    console.log(this.yourminutestextarea);

    $('.page-loader-wrapper').show();
    this.service.ClicktoviewMOMfun(this.statusdata, this.apptmtBookingsId, this.flatBookId, this.yourminutestextarea).then(resp => {
      console.log(resp);

      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        this.modalService.dismissAll();

        this.sitename = $("#projectID").val();
        this.blockname = $("#BlockId").val();
        this.startdata = $("#fromDate").val();
        this.enddate = $("#toDate").val();


        var startdate = $('#fromDate').val();
        var endDate = $('#toDate').val();


        if (this.sitename == "select" || this.sitename == "") {
          this.sitename = null;
        }


        if (this.blockname == "select" || this.blockname == "") {
          this.blockname = null;
        }


        if (this.startdata == "") {
          this.startdata = null;
        }

        if (this.enddate == "") {
          this.enddate = null;
        }

        $('.page-loader-wrapper').show();
        this.service.searchsubmitfun(this.startdata, this.enddate, this.sitename, this.blockname, this.employeename, this.statusname).then(resp => {

          console.log(resp);


          this.Tablecontroller = [];
          $('.page-loader-wrapper').hide();
          if (resp.responseCode == 200) {
            this.Tablecontroller = resp.responseObjList.apptmtBookingsDetailResponseList;
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
          if (error == 440) {
            swal("Your Session has been Timed Out!", "Please login once again.", "error");
            this.router.navigate([""]);
          }
        }
        );

        swal("Appointment status changed successfully!");
        return false;

      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        swal(resp.errors[0]);
      }
    }, error => {
      $('.page-loader-wrapper').hide();
      if (error == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      }
    });



  }

  defaultslots() {
    $(".page-loader-wrapper").show();
    var arr = localStorage.getItem('SiteIDS');
    var url = this.cmn.commonUrl + "appointmentBooking/getCompletedAppointmentBookingDetails.spring";
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": sessionStorage.getItem("login_sessionkey"),
    }
    console.log(body);
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      console.log(JSON.stringify(resp));
      $(".page-loader-wrapper").hide();
      if (resp.responseCode == 200) {
        //  alert(resp.responseObjList.apptmtBookingsDetailResponseList.length)
        if (resp.responseObjList.apptmtBookingsDetailResponseList.length !== 0) {
          // this.controller = resp.responseObjList;


          this.popres = resp.responseObjList.apptmtBookingsDetailResponseList;
          this.temp = resp.responseObjList.apptmtBookingsDetailResponseList;
          $('#imagemodal').modal('show');


        } else {
          $('#imagemodal').modal('hide');
        }

        // if(sessionStorage.getItem("session_deptid") == "995"){
        //   if(sessionStorage.getItem("crmrefund") == "Amount refund"){
        //     if(resp.responseObjList.length == 0){
        //       $('#imagemodal').modal('hide');
        //     } else {
        //       if(resp.responseObjList.length !== 0){
        //         this.controller = resp.responseObjList;
        //         $('#imagemodal').modal('show');
        //       } else {
        //         $('#imagemodal').modal('hide');
        //       }

        //       sessionStorage.removeItem("crmrefund");
        //       sessionStorage.setItem("NonRefundFlats" , JSON.stringify(this.controller));
        //     }
        //   }

        // }

      } else if (resp.responseCode == 440) {
        $('#imagemodal').modal('hide');
        swal("Error!", "Your session has been expired.", "error");
        this.router.navigate([""]);
      } else {
        $('#imagemodal').modal('hide');
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
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

  paymentProceed() {
    $('#imagemodal').modal('hide');
    this.Tablecontroller = this.temp
    //this.router.navigateByUrl("crm-receipt-payment");
  }



  exportAsXLSX(): void {
    this.excel_controller = [];

  //  console.log(this.Tablecontroller);
    for (var i = 0; i < this.Tablecontroller.length; i++) {

      let day = 60 * 60 * 24 * 1000;
      let date1 = new Date(this.Tablecontroller[i].apptmtDate);
      let endDate = new Date(date1.getTime() + day).getTime();

      this.excel_controller.push({
        custName: this.Tablecontroller[i].custName,
        siteName: this.Tablecontroller[i].siteName,
        blockName: this.Tablecontroller[i].blockName,
        flatNo: this.Tablecontroller[i].flatNo,
        apptmtDate: this.prettyDate(endDate),
        slotTime: this.Tablecontroller[i].slotTime,
        apptmtStatusName: this.Tablecontroller[i].apptmtStatusName,
      });
    }

    console.log(this.excel_controller);
    this.excelService.exportAsExcelFile(this.excel_controller, 'View Appointments');
  }

  prettyDate(date) {
    var d = new Date(date);
   var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
 
   return months[d.getUTCMonth()] + ' ' + d.getUTCDate() + ', ' + d.getUTCFullYear();
 }

}








