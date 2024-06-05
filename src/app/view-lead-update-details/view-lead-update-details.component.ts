import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router, RoutesRecognized } from "@angular/router";
import { CommonComponent } from '../common/common.component';
import { Http, RequestOptions, Headers } from '@angular/http';
import { ViewLeadUpdateDetailsService } from './view-lead-update-details.service';

declare const $: any;
declare const swal: any;
@Component({
  selector: 'app-view-lead-update-details',
  templateUrl: './view-lead-update-details.component.html',
  styleUrls: ['./view-lead-update-details.component.sass']
})
export class ViewLeadUpdateDetailsComponent implements OnInit {
  controller: any;
  controller_data: Array<any> = [];
  banker_siteid: any;
  banker_flatbookingid: any;
  banker_customerLoanEOIDetailsId: any;
  banker_LeadViewStatusId: any;
  hideme: boolean;
  dept_id: any;
  role_id: any;
  submit_siteids: any;
  submit_bookingFormId: any;
  submit_EOIdetailsid: any;
  submit_statusid: any;
  submit_siteName: any;
  submit_flatNo: any;
  submit_bankerviewstatusname: any;
  submit_previousBankerComments: any;
  submit_lead_statusid: any;
  submit_lead_Status: any;
  submit_bankerComment: any;
  banklistid: string;
  bankname: string;
  fileUrl: string;
  fileURL: string;
  flatcost: any;

  constructor(private cmn: CommonComponent, private http: Http, private formBuilder: FormBuilder,
    private service: ViewLeadUpdateDetailsService,
    private router: Router) {

    // $(function() {
    //   console.log("working");
    //   $("#update_status_names").select2({
    //     placeholder: "--Select--",
    //     dir: "ltl"
    //   });
    //  });



  }

  ngOnInit() {

    $(function () {
      console.log("working");
      $("#update_status_names").select2({
        placeholder: "Search Project",
        dir: "ltl",
      });
    });

    this.controller = JSON.parse(sessionStorage.getItem("getdetails"));
    this.get_view_detailsfun(this.controller.siteId, this.controller.flatBookingId, this.controller.customerLoanEOIDetailsId);

    this.dept_id = sessionStorage.getItem("session_deptid");
    this.role_id = sessionStorage.getItem("session_roleId");

    if (sessionStorage.getItem("session_deptid") == "984" && sessionStorage.getItem("session_roleId") == "21") {

      $("#update").show();
    } else {

      $("#update").hide()
    }
  }


  homeClick() {
    this.router.navigate(['dashboard']);
  }

  view_lead_details() {
    this.router.navigate(['view_lead_details']);
  }


  get_view_detailsfun(siteids, flatBookingId, EOIdetailsid) {
    $('.page-loader-wrapper').show();
    this.service.getlist_viewDetails(siteids, flatBookingId, EOIdetailsid).then(resp => {
      console.log(resp);
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {

        this.controller_data = resp.responseObjList;


        const fmt = require('indian-number-format');
        this.flatcost = fmt.format(Number(this.controller_data[0].flatCost.toFixed(2)))


        var self = this;
        $(function () {
          $("#update_status_names").val(self.controller_data[0].leadStatus);
          $("#update_status_names").trigger('change');
        });
        console.log(this.controller_data[0].bankerLeadViewStatusId);

        if (this.controller_data[0].siteId == null) {
          this.banker_siteid = null;
        } else {
          this.banker_siteid = this.controller_data[0].siteId;
        }

        if (this.controller_data[0].flatBookingId == null) {
          this.banker_flatbookingid = null;
        } else {
          this.banker_flatbookingid = this.controller_data[0].flatBookingId
        }

        if (this.controller_data[0].customerLoanEOIDetailsId == null) {
          this.banker_customerLoanEOIDetailsId = null;
        } else {
          this.banker_customerLoanEOIDetailsId = this.controller_data[0].customerLoanEOIDetailsId
        }

        if (this.controller_data[0].bankerLeadViewStatusId == null) {
          this.banker_LeadViewStatusId = null;
        } else {
          this.banker_LeadViewStatusId = this.controller_data[0].bankerLeadViewStatusId
        }




        setTimeout(() => {


          this.get_update_status_dropdownfun(this.banker_siteid, this.banker_flatbookingid, this.banker_customerLoanEOIDetailsId, this.banker_LeadViewStatusId);
        }, 1000);

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

  image_preview(data) {

    //   var ext = data.urlLocation.split('.').pop();
    //  if(ext == "png" || ext == "PNG" || ext == "Png"){

    //  } else if(ext == "jpg" || ext == "JPG" || ext == "Jpg"){

    //  } else if(ext == "pdf" || ext == "PDF" || ext == "Pdf"){
    //   window.open(data.urlLocation, '_blank');
    //  }





    var win = window.open(data.urlLocation, '_blank');
    win.focus();

  }


  get_update_status_dropdownfun(banker_siteid, banker_flatbookingid, banker_customerLoanEOIDetailsId, banker_LeadViewStatusId) {
    $('.page-loader-wrapper').show();
    this.service.getupdate_status_viewDetails(banker_siteid, banker_flatbookingid, banker_customerLoanEOIDetailsId, banker_LeadViewStatusId).then(resp => {

      console.log(resp);

      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {

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


  submitfun() {
    if ($("#update_status_names").val() == "select" || $("#update_status_names").val() == undefined || $("#update_status_names").val() == null) {
      swal("Please select update status!");
      return false;
    }

    if ($("#CustomerCommentsId").val() == "" || $("#CustomerCommentsId").val() == undefined || $("#CustomerCommentsId").val() == null) {
      swal("Please enter the comments!");
      return false;
    }


    if (this.controller_data[0].siteId == null) {
      this.submit_siteids = null;
    } else {
      this.submit_siteids = this.controller_data[0].siteId;
    }

    if (this.controller_data[0].flatBookingId == null) {
      this.submit_bookingFormId = null;
    } else {
      this.submit_bookingFormId = this.controller_data[0].flatBookingId
    }

    if (this.controller_data[0].customerLoanEOIDetailsId == null) {
      this.submit_EOIdetailsid = null;
    } else {
      this.submit_EOIdetailsid = this.controller_data[0].customerLoanEOIDetailsId
    }

    if (this.controller_data[0].bankerLeadViewStatusId == null) {
      this.submit_statusid = null;
    } else {
      this.submit_statusid = this.controller_data[0].bankerLeadViewStatusId
    }

    if (this.controller_data[0].siteName == null) {
      this.submit_siteName = null;
    } else {
      this.submit_siteName = this.controller_data[0].siteName
    }

    if (this.controller_data[0].flatNo == null) {
      this.submit_flatNo = null;
    } else {
      this.submit_flatNo = this.controller_data[0].flatNo
    }

    if (this.controller_data[0].bankerLeadViewStatus == null) {
      this.submit_bankerviewstatusname = null;
    } else {
      this.submit_bankerviewstatusname = this.controller_data[0].bankerLeadViewStatus
    }

    if (this.controller_data[0].bankerComments == null) {
      this.submit_previousBankerComments = null;
    } else {
      this.submit_previousBankerComments = this.controller_data[0].bankerComments
    }


    if (this.controller_data[0].leadStatusId == null) {
      this.submit_lead_statusid = null;
    } else {
      this.submit_lead_statusid = this.controller_data[0].leadStatusId
    }

    if ($("#update_status_names").val() == null) {
      this.submit_lead_Status = null;
    } else {
      this.submit_lead_Status = $("#update_status_names").val()
    }

    if ($("#CustomerCommentsId").val() == null) {
      this.submit_bankerComment = null;
    } else {
      this.submit_bankerComment = $("#CustomerCommentsId").val()
    }


    if (this.controller_data[0].bankerListId == null) {
      this.banklistid = null;
    } else {
      this.banklistid = this.controller_data[0].bankerListId
    }

    if (this.controller_data[0].bankerName == null) {
      this.bankname = null;
    } else {
      this.bankname = this.controller_data[0].bankerName
    }



    $('.page-loader-wrapper').show();
    this.service.getfinall_submit_fun(this.submit_siteids, this.submit_siteName, this.submit_flatNo, this.submit_bookingFormId, this.submit_EOIdetailsid, this.submit_statusid,
      this.submit_bankerviewstatusname, this.submit_lead_statusid, this.submit_lead_Status, this.submit_previousBankerComments, this.submit_bankerComment, this.banklistid, this.bankname).then(resp => {

        console.log(JSON.stringify(resp));

        $('.page-loader-wrapper').hide();
        if (resp.responseCode == 200) {
          swal(resp.responseObjList);

          setTimeout(() => {
            this.router.navigate(['view_lead_details']);
          }, 1000);
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
