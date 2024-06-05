
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, FormBuilder } from "@angular/forms";
import { Http, RequestOptions, Headers } from '@angular/http';
import { ActivatedRoute, Router, RoutesRecognized } from "@angular/router";
import { CommonComponent } from '../common/common.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { BookYourAppointmentService } from "./book-your-appointment.service";
import { ProductService } from '../product.service';



import * as moment from "moment";
import { ExcelService } from "./excel.service";

declare const $: any;
declare const swal: any;

var selected_projectid;
var selected_blockid;
var site_name;





// export interface Card {
//   custName: string,
//   siteName: number,
//   apptmtStatusId: string,
//   blockName: string;
//   apptmtDate: string;
//   slotTime: string;
//   apptmtReqComments: string;
// }

// const DATA: Card[] = Tablecontroller;



@Component({
  selector: 'app-book-your-appointment',
  templateUrl: './book-your-appointment.component.html',
  styleUrls: ['./book-your-appointment.component.sass']
})
export class BookYourAppointmentComponent implements OnInit, OnDestroy {
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
  statusname: any;
  statusdata: any;
  yourminutestextarea: any;
  apptmtBookingsId: any;
  flatBookId: any;
  popres: any = [];
  temp: any;
  tempdata: any;
  apptmtStatusName: any;
  apptmtReqComments: any;
  canclationoption: any;
  excel_controller: Array<any> = [];
  appointment_count: number;

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // obs: Observable<any>;
  // dataSource: MatTableDataSource<Card> = new MatTableDataSource<Card>(DATA);




  constructor(private cmn: CommonComponent, private http: Http, private formBuilder: FormBuilder,
    private router: Router, private modalService: NgbModal, private changeDetectorRef: ChangeDetectorRef,
    private service: BookYourAppointmentService, private excelService: ExcelService , private productService: ProductService) {
    $('.page-loader-wrapper').hide();
    this.tempdata = sessionStorage.getItem('myobj')
    this.siteList();





  }

  ngOnInit() {


    //alert(this.tempdata)




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
    var arr = localStorage.getItem('ViewMyAppointments');

    console.log(arr);
    $('.page-loader-wrapper').show();
    this.service.ProjectDetails(JSON.parse(arr).map(String)).then(resp => {
      if (sessionStorage.getItem("customeridsession") == null || sessionStorage.getItem("customeridsession") == "") {
        //$('.page-loader-wrapper').hide();
      }
      if (resp.responseCode == 200) {
        $('#projectID').html("");
        $('#projectID').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#projectID').append("<option value='" + resp.responseObjList[i].id + "'>" + resp.responseObjList[i].name + "</option>");
        }
        this.defaultslots()

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


  /*------------------------ get table data Start--------------------*/
  gettabledata() {
    $('.page-loader-wrapper').show();
    this.service.gettabledetails().then(resp => {
      console.log(resp);
      $('.page-loader-wrapper').hide();
      this.Tablecontroller = [];
      if (resp.responseCode == 200) {
        this.Tablecontroller = resp.responseObjList.apptmtBookingsDetailResponseList;

        console.log(this.Tablecontroller);

        this.productService.appointment_sendNumber(this.appointment_increament());


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
  /*------------------------get table data End--------------------*/


  appointment_increament(){
    this.appointment_count = 0;
    return this.appointment_count;
  }

  



  searchfunction() {

    sessionStorage.removeItem("cancleoption");

    this.sitename = $("#projectID").val();
    this.blockname = $("#BlockId").val();
    this.startdata = $("#fromDate").val();
    this.enddate = $("#toDate").val();
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
    this.service.searchsubmitfun(this.startdata, this.enddate, this.sitename, this.blockname, this.statusname).then(resp => {

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

    $("#StatusId").val(['select']);
    $("#StatusId").trigger('change');

  }


  open1(content1) {
    console.log(content1);
    this.modalService.open(content1, { backdrop: 'static', size: 'lg', keyboard: false, centered: true, windowClass: 'my-class' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason1(reason)}`;
    });
  }

  private getDismissReason1(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  deletebtnfun(userdata) {


    this.canclationoption = JSON.parse(sessionStorage.getItem("cancleoption"));



    $('.page-loader-wrapper').show();
    this.service.appointmentdeletefun(userdata.apptmtSlotTimesId, userdata.apptmtBookingsId, userdata.flatBookId).then(resp => {
      console.log(resp);

      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        this.modalService.dismissAll();

        console.log(JSON.parse(sessionStorage.getItem("cancleoption")));

        if (JSON.parse(sessionStorage.getItem("cancleoption")) == null || JSON.parse(sessionStorage.getItem("cancleoption")) == "null") {
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
          this.service.searchsubmitfun(this.startdata, this.enddate, this.sitename, this.blockname, this.statusname).then(resp => {

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
        } else {
          this.defaultslots();
          this.Tablecontroller = this.canclationoption.responseObjList.apptmtBookingsDetailResponseList;
        }




        swal("Appointment cancelled successfully!");
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


  open3(content3, userdata) {

    this.apptmtBookingsId = userdata.apptmtBookingsId;
    this.flatBookId = userdata.flatBookId;
    $(function () {
      $("#popupStatus").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });
    });
    this.modalService.open(content3, { backdrop: 'static', size: 'lg', keyboard: false, centered: true, windowClass: 'my-class' }).result.then((result) => {
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




  open4(content4, userdata) {

    this.apptmtStatusName = userdata.apptmtStatusName;
    this.apptmtReqComments = userdata.apptmtSummary


    this.modalService.open(content4, { backdrop: 'static', size: 'lg', keyboard: false, centered: true, }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason4(reason)}`;
    });
  }

  private getDismissReason4(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  savepopupfun1() {
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
        this.service.searchsubmitfun(this.startdata, this.enddate, this.sitename, this.blockname, this.statusname).then(resp => {

          console.log(resp);


          this.Tablecontroller = [];
          // $('.page-loader-wrapper').hide();
          if (resp.responseCode == 200) {
            // this.Tablecontroller = resp.responseObjList.apptmtBookingsDetailResponseList;
            swal(resp.description);
            //  swal("Appointment status changed successfully!");
            this.forstatuschanged()
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
    });



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
        this.service.searchsubmitfun(this.startdata, this.enddate, this.sitename, this.blockname, this.statusname).then(resp => {

          console.log(resp);


          this.Tablecontroller = [];
          // $('.page-loader-wrapper').hide();
          if (resp.responseCode == 200) {
            // this.Tablecontroller = resp.responseObjList.apptmtBookingsDetailResponseList;

            swal("Appointment status changed successfully!");
            this.forstatuschanged()
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
    });



  }
  /*---------Edit to include MOM functionality start------------*/
  editToIncludeMom(item) {
    console.log(item)
    // return false;
    $('.page-loader-wrapper').show();
    debugger;

    let url = this.cmn.commonUrl + "appointmentBooking/updateAppointmentSummary.spring"
    console.log("saveCarParkingAllotmentDetails url :" + url);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: headers });

    var body = {

      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "apptmtStatusName": item.apptmtStatusName,
      "apptmtBookingsId": item.apptmtBookingsId,
      "flatBookingId": item.flatBookId,
      "apptmtSummary": item.apptmtSummary

    }
    console.log("----Edit to include MOM body :" + JSON.stringify(body));
    //return false
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      console.log("save car parking response----------" + JSON.stringify(resp));
      if (resp.responseCode == 200) {

        //swal("Car parking allotment created successfully !!");
        swal(resp.description);
        //  location.reload()
        // this.router.navigate(["/car-parking-view"]);
      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        // alert(resp.status);
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


    // /*---------Edit to include MOM functionality end------------*/
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

    console.log(url);
    console.log(JSON.stringify(body));
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      console.log(JSON.stringify(resp));

      sessionStorage.setItem("cancleoption", JSON.stringify(resp));

      $(".page-loader-wrapper").hide();
      if (resp.responseCode == 200) {
        if (resp.responseObjList.apptmtBookingsDetailResponseList.length !== 0) {
          // this.controller = resp.responseObjList;

          if (this.tempdata == "null") {

            this.popres = resp.responseObjList.apptmtBookingsDetailResponseList;
            this.temp = resp.responseObjList.apptmtBookingsDetailResponseList;
            $('#imagemodal').modal('show');
            // if (this.tempdata == "null") {
            //   this.gettabledata();
            // }






            this.gettabledata();
          } else {

            $('#imagemodal').modal('hide');
            this.Tablecontroller = resp.responseObjList.apptmtBookingsDetailResponseList;
          }
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

  forstatuschanged() {
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
      console.log("second time:" + resp);
      $(".page-loader-wrapper").hide();
      if (resp.responseCode == 200) {
        if (resp.responseObjList.apptmtBookingsDetailResponseList.length !== 0) {
          // this.controller = resp.responseObjList;

          this.Tablecontroller = resp.responseObjList.apptmtBookingsDetailResponseList;

        }



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


  exportAsXLSX(): void {
    this.excel_controller = [];

    //  console.log(this.Tablecontroller);
    for (var i = 0; i < this.Tablecontroller.length; i++) {

      let day = 60 * 60 * 24 * 1000;
      let date1 = new Date(this.Tablecontroller[i].apptmtDate);
      let endDate = new Date(date1.getTime() + day).getTime();

      console.log(endDate);
      console.log(this.Tablecontroller[i].apptmtDate);



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
    this.excelService.exportAsExcelFile(this.excel_controller, 'View My Appointments');
  }


  prettyDate(date) {
    var d = new Date(date);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return months[d.getUTCMonth()] + ' ' + d.getUTCDate() + ', ' + d.getUTCFullYear();
  }


}


