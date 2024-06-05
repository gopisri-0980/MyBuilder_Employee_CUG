import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, FormBuilder } from "@angular/forms";
import { Http, RequestOptions, Headers } from '@angular/http';
import { ActivatedRoute, Router, RoutesRecognized } from "@angular/router";
import { CommonComponent } from '../common/common.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ViewAppointmentScheduleService } from "./view-appointment-schedule.service";
import * as moment from "moment";


declare const $: any;
declare const swal: any;

var selected_projectid;
var selected_blockid;
var site_name;


@Component({
  selector: 'app-view-appointment-schedule',
  templateUrl: './view-appointment-schedule.component.html',
  styleUrls: ['./view-appointment-schedule.component.sass']
})
export class ViewAppointmentScheduleComponent implements OnInit, OnDestroy {

  Tablecontroller: Array<any> = [];
  fg: FormGroup;
  Tabledata: any;
  sitename: any;
  blockname: any;
  startdata: any;
  enddate: any;
  closeResult = '';
  loaderhideme: boolean;

  public flag = false;
  d = null;
  controller: any;
  p: number;
  statusid: any;
  popres: any = [];
  temp: any;


  constructor(private cmn: CommonComponent, private http: Http, private formBuilder: FormBuilder,
    private router: Router, private modalService: NgbModal, private changeDetectorRef: ChangeDetectorRef,
    private service: ViewAppointmentScheduleService) {
    $('.page-loader-wrapper').hide();
    this.siteList();


  }

  ngOnInit() {



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


    $("#StatusId").select2({
      placeholder: "--Select--",
      dir: "ltl"
    });






    var self = this;
    $(function () {
      $('#projectID').change(function (e) {
        selected_projectid = $(e.target).val();
        site_name = $('#projectID').select2('data')[0].text
        if (selected_projectid == "select") {
          $("#BlockId option[value]").remove();
        }
      })


      //   $("input").on("change", function() {
      //     this.setAttribute(
      //         "data-date",
      //         moment(this.value, "YYYY-MM-DD")
      //         .format( this.getAttribute("data-date-format") )
      //     )
      // }).trigger("change")


    });


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
    $("#StatusId").val(['select']);
    $("#StatusId").trigger('change');



  }

  ngOnDestroy() {

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
    var arr = localStorage.getItem('ViewAppTimeSlots');
    $('.page-loader-wrapper').show();
    this.service.ProjectDetails(JSON.parse(arr).map(String)).then(resp => {

      console.log(resp);

      if (sessionStorage.getItem("customeridsession") == null || sessionStorage.getItem("customeridsession") == "") {
        // $('.page-loader-wrapper').hide();
      }
      if (resp.responseCode == 200) {
        $('#projectID').html("");
        $('#projectID').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#projectID').append("<option value='" + resp.responseObjList[i].id + "'>" + resp.responseObjList[i].name + "</option>");
        }
        this.defaultslots();
        this.gettabledata();
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





  searchfunction() {
    this.sitename = $("#projectID").val();
    this.blockname = $("#BlockId").val();
    this.startdata = $("#fromDate").val();
    this.enddate = $("#toDate").val();
    this.statusid = $("#StatusId").val();


    console.log(this.sitename);
    console.log(this.blockname);
    console.log(this.startdata);
    console.log(this.enddate);
    console.log(this.statusid);




    if (this.sitename == "select" && this.blockname == null && this.startdata == "" && this.enddate == "" && this.statusid == "select") {
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

    if (this.startdata == "") {
      this.startdata = null;
    }

    if (this.enddate == "") {
      this.enddate = null;
    }

    if (this.statusid == "select" || this.statusid == "") {
      this.statusid = null;
    }




    this.loaderhideme = true;
    //$('.page-loader-wrapper').show();
    this.service.searchsubmitfun(this.startdata, this.enddate, this.sitename, this.statusid).then(resp => {

      console.log(JSON.stringify(resp));

      this.p = 1;
      this.Tablecontroller = [];

      this.loaderhideme = false;

      // $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        this.Tablecontroller = resp.responseObjList.apptmtSlotTimesDetailResponseList;
        console.log(this.Tablecontroller);
      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
      }
    }, error => {
      this.loaderhideme = false;
      if (error == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      }
    }
    );
  }



  /*------------------------ get table data Start--------------------*/
  gettabledata() {
    this.loaderhideme = true;
    //$('.page-loader-wrapper').show();
    this.service.gettabledetails().then(resp => {
      console.log(resp);
      this.loaderhideme = false;
      if (resp.responseCode == 200) {
        this.Tablecontroller = resp.responseObjList.apptmtSlotTimesDetailResponseList;
      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
      }
    }, error => {
      this.loaderhideme = false;
      //$('.page-loader-wrapper').hide();
      if (error == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      }
    }
    );
  }
  /*------------------------get table data End--------------------*/

  open(content) {
    this.modalService.open(content, { backdrop: 'static', size: 'lg', keyboard: false, centered: true, windowClass: 'my-class' }).result.then((result) => {
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


  deletebtnfun(userdata) {

    $('.page-loader-wrapper').show();
    this.service.appointmentdeletefun(userdata.apptmtSlotTimesId, userdata.apptmtBookingsId, userdata.flatBookId).then(resp => {
      console.log(resp);

      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        this.modalService.dismissAll();

        this.sitename = $("#projectID").val();
        this.blockname = $("#BlockId").val();
        this.startdata = $("#fromDate").val();
        this.enddate = $("#toDate").val();

        this.statusid = $("#StatusId").val();


        var startdate = $('#fromDate').val();
        var endDate = $('#toDate').val();
        if (new Date(startdate) > new Date(endDate)) {
          swal('Please select  a valid from and to date');
          return false;
        }


        if (this.sitename == "select" || this.sitename == "") {
          this.sitename = null;
        }

        if (this.startdata == "") {
          this.startdata = null;
        }

        if (this.enddate == "") {
          this.enddate = null;
        }


        if (this.statusid == "select" || this.statusid == "") {
          this.statusid = null;
        }


        this.loaderhideme = true;
        //$('.page-loader-wrapper').show();
        this.service.searchsubmitfun(this.startdata, this.enddate, this.sitename, this.statusid).then(resp => {

          this.p = 1;
          this.Tablecontroller = [];

          this.loaderhideme = false;

          // $('.page-loader-wrapper').hide();
          if (resp.responseCode == 200) {
            this.Tablecontroller = resp.responseObjList.apptmtSlotTimesDetailResponseList;
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


        swal("Appointment Time Slot Deleted successfully!");
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
      if (error == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      }
    }
    );


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
      console.log(resp);
      $(".page-loader-wrapper").hide();
      if (resp.responseCode == 200) {
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
    sessionStorage.setItem("myobj", this.popres)

    this.router.navigateByUrl("View_My_Appointments");
  }
}


