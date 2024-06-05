import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonComponent } from 'src/app/common/common.component';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

import { file } from 'jszip';
import * as moment from "moment";
import { Http, RequestOptions, Headers } from '@angular/http';
declare const tinymce: any;

declare const $: any;
declare const swal: any;

@Component({
  selector: 'app-request-for-interest-waiver',
  templateUrl: './request-for-interest-waiver.component.html',
  styleUrls: ['./request-for-interest-waiver.component.sass']
})
export class RequestForInterestWaiverComponent implements OnInit {
  milestonedetails: any;
  urls = [];
  filename: any;
  filenameval: any;
  filemode: any;
  ortitle: boolean;

  extensiontype: any;
  filetypeurlsplit: any;
  filetypeurlsplit1: any;
  filenamedoc: any;
  filesplitdata: any;
  imgsrc: any;

  fileUrl: any;
  fileName: SafeResourceUrl;
  financialPMileStoneRequests: Array<any> = [];
  interest_waiver: Array<any> = [];
  fileInfos: Array<any> = [];
  Totalforinterest = 0
  interestamountpaid = 0;
  interestamountdue = 0;
  interestwaiver = 0;
  interestWaiverAdjAmount = 0;
  interestWaiverPendingAmount = 0;

  totalPenality_Amount: any;
  totalPenalityPaid_Amount: any;
  totalPendingPenalty_Amount: any;
  filesize: number;
  interestWaiverAdj_amount: any;
  interestWaiverPending_amount: any;

  constructor(private router: Router, private sanitizer: DomSanitizer, private cmn: CommonComponent, private http: Http,) {
    $('.page-loader-wrapper').hide();
    this.milestonedetails = JSON.parse(sessionStorage.getItem("RequestforInterestwaiver"));

    console.log(this.milestonedetails);

    for (var i = 0; i < this.milestonedetails.length; i++) {


      console.log(this.milestonedetails[i].totalPenalityAmount);
      console.log(this.milestonedetails[i].totalPenalityPaidAmount);
      console.log(this.milestonedetails[i].totalPendingPenaltyAmount);
      console.log(this.milestonedetails[i].interestWaiverAdjAmount);
      console.log(this.milestonedetails[i].interestWaiverPendingAmount);
      

      

     


      if (this.milestonedetails[i].totalPenalityAmount !== null) {
        this.totalPenality_Amount = this.milestonedetails[i].totalPenalityAmount.replace(/,/g, '');
        this.Totalforinterest = this.Totalforinterest + parseFloat(this.totalPenality_Amount);
        console.log(this.Totalforinterest);
      } else {
        this.Totalforinterest = 0.00;
      }


      if (this.milestonedetails[i].totalPenalityPaidAmount !== null) {
        this.totalPenalityPaid_Amount = this.milestonedetails[i].totalPenalityPaidAmount.replace(/,/g, '');
        this.interestamountpaid = this.interestamountpaid + parseFloat(this.totalPenalityPaid_Amount);
      }


      if (this.milestonedetails[i].totalPendingPenaltyAmount != null) {
        this.totalPendingPenalty_Amount = this.milestonedetails[i].totalPendingPenaltyAmount.replace(/,/g, '');
        this.interestamountdue = this.interestamountdue + parseFloat(this.totalPendingPenalty_Amount);
      } else {
        this.interestamountdue = 0.00;
      }


      if (this.milestonedetails[i].interestWaiverAdjAmount !== null) {
        this.interestWaiverAdj_amount = this.milestonedetails[i].interestWaiverAdjAmount.replace(/,/g, '');
        this.interestWaiverAdjAmount = this.interestWaiverAdjAmount + parseFloat(this.interestWaiverAdj_amount);
      
      } else {
        this.interestWaiverAdjAmount = 0.00;
      }

      
      if (this.milestonedetails[i].interestWaiverPendingAmount !== null) {
        this.interestWaiverPending_amount = this.milestonedetails[i].interestWaiverPendingAmount.replace(/,/g, '');
        this.interestWaiverPendingAmount = this.interestWaiverPendingAmount + parseFloat(this.interestWaiverPending_amount);
       
      } else {
        this.interestWaiverPendingAmount = 0.00;
      }

      
      


      console.log(this.Totalforinterest);
      console.log(this.interestamountpaid);
      console.log(this.interestamountdue);


      if (isNaN(this.Totalforinterest)) {
        this.Totalforinterest = 0.00;
      }

      if (isNaN(this.interestamountpaid)) {
        this.interestamountpaid = 0.00;
      }


      if (isNaN(this.interestamountdue)) {
        this.interestamountdue = 0.00;
      }

      if (isNaN(this.interestWaiverAdjAmount)) {
        this.interestWaiverAdjAmount = 0.00;
      }

      if (isNaN(this.interestWaiverPendingAmount)) {
        this.interestWaiverPendingAmount = 0.00;
      }


    }




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
          "scrollY": true,
          "scrollCollapse": true,
          "scrollX": true,
          "autoWidth": false,
          "iCookieDuration": 60,

        }).draw();

      });

    }, 2000)
  }

  ngOnInit() {

    $(function () {



      $('.demo').keypress(function (event) {
        var $this = $(this);
        if ((event.which != 46 || $this.val().indexOf('.') != -1) &&
          ((event.which < 48 || event.which > 57) &&
            (event.which != 0 && event.which != 8))) {
          event.preventDefault();
        }

        var text = $(this).val();
        if ((event.which == 46) && (text.indexOf('.') == -1)) {
          setTimeout(function () {
            if ($this.val().substring($this.val().indexOf('.')).length > 3) {
              $this.val($this.val().substring(0, $this.val().indexOf('.') + 3));
            }
          }, 1);
        }

        if ((text.indexOf('.') != -1) &&
          (text.substring(text.indexOf('.')).length > 2) &&
          (event.which != 0 && event.which != 8) &&
          ($(this)[0].selectionStart >= text.length - 2)) {
          event.preventDefault();
        }
      });

      $('.demo').bind("paste", function (e) {
        var text = e.originalEvent.clipboardData.getData('Text');
        if ($.isNumeric(text)) {
          if ((text.substring(text.indexOf('.')).length > 3) && (text.indexOf('.') > -1)) {
            e.preventDefault();
            $(this).val(text.substring(0, text.indexOf('.') + 3));
          }
        }
        else {
          e.preventDefault();
        }
      });

    })
  }

  homeClick() {
    this.router.navigateByUrl('shortcut-components');
  }

  onSelectFile(event) {
    console.log(event);
    console.log(event.target.files[0].size );

    this.filesize = Math.round(event.target.files[0].size / 1024 / 1024);
    console.log(this.filesize);
    if (this.filesize > Number(1)) {
      $("#fileInputId").val("");
      this.urls.splice(-1)
      swal(`Your max file size limit is 1 MB, Total file size is exceeded by ${this.filesize} mb`);
      return false;
    } else {

      if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
          var temp = event.target.files[i].name;
          this.filename = temp.toLowerCase();
          this.filenameval = this.filename.split('.').pop();
          var reader = new FileReader();
          reader.onload = (event: any) => {
            // console.log(event.target.result);
            this.urls.push({
              'upload': event.target.result,
              'Type': this.filenameval,
              'Name': this.filename,
  
            });
  
            console.log(this.urls);
          }
  
          reader.readAsDataURL(event.target.files[i]);
          $('#fileInputId').css("color", "transparent");
        }
  
  
      }

    }



   
  }


  Deleteimage(val) {
    this.urls.splice(val, 1);

    console.log(this.urls);
    if (this.urls.length == 0) {
      $('#fileInputId').css("color", "black");
      $('#fileInputId').val("");

    }

  }


  fileClickfun(val, extensiontype) {
    this.fileName = "";
    this.extensiontype = extensiontype;
    this.filetypeurlsplit = val.split(';')[0];
    this.filetypeurlsplit1 = this.filetypeurlsplit.split(':')[1];
    this.filenamedoc = val.split('/')[0];
    this.filesplitdata = this.filenamedoc.split(':')[1];


    if (this.filesplitdata == "image") {
      this.imgsrc = val;
      $('#imagemodal').modal('show');
    }

    if (this.filetypeurlsplit1 == 'application/pdf') {
      this.fileName = "";
      setTimeout(() => {
        this.fileName = this.sanitizer.bypassSecurityTrustResourceUrl(val);
      }, 1000);
      $('#imagemodal').modal('show');

    }

    if (this.filetypeurlsplit1 == "text/plain") {
      const blob = new Blob([val], { type: this.filetypeurlsplit1 });
      this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(val);
      $('#imagemodal').modal('show');
    }


    if (this.filetypeurlsplit1 == "application/octet-stream") {
      if (extensiontype == "xlsx") {
        const blob = new Blob([val], { type: 'application/octet-stream' });
        this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(val);
        $('#imagemodal').modal('show');
      } else if (extensiontype == "docx") {
        const blob = new Blob([val], { type: 'application/octet-stream' });
        this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(val);
        $('#imagemodal').modal('show');
      } else {
        const blob = new Blob([val], { type: 'application/octet-stream' });
        this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(val);
        $('#imagemodal').modal('show');
      }
    }

  }


  Submitfun() {



    this.financialPMileStoneRequests = [];

    for (var i = 0; i < this.milestonedetails.length; i++) {

      console.log(this.milestonedetails[i].value);

      if (this.milestonedetails[i].value == undefined || this.milestonedetails[i].value == "undefined") {
        swal("Please enter the  waiver request amount");
        return false;
      }

      if (this.milestonedetails[i].value == "0" || this.milestonedetails[i].value == 0) {
        swal("Please enter valid  waiver request amount");
        return false;
      }

      if (this.milestonedetails[i].value == "" || this.milestonedetails[i].value == "") {
        swal("Please enter the  waiver request amount");
        return false;
      }



      if (Number(this.milestonedetails[i].value) > parseFloat(this.milestonedetails[i].totalPenalityAmount.replace(/,/g, ''))) {
        swal("Interest waiver amount should not be more than the interest amount");
        return false;
      }

      this.financialPMileStoneRequests.push({
        "projectMilestoneId": this.milestonedetails[i].projectMilestoneId,
        "finBookingFormMilestonesId": this.milestonedetails[i].paymentScheduleId,
        "milestoneName": this.milestonedetails[i].mileStoneName,
        //  "finMilestoneClassifidesId": this.milestonedetails[i].finMilestoneClassifidesId,
        "mileStonePercentage": this.milestonedetails[i].milStonePercentage,
        "milestoneDate": this.milestonedetails[i].mileStoneDate,
        "mileStoneDueDate": this.milestonedetails[i].dueDate,
        "mileStoneNo": this.milestonedetails[i].milStoneNo,
        "demandNoteDate": this.milestonedetails[i].demandNoteDate,
        "setOffAmount": this.milestonedetails[i].value,

      })

    }

    for (var i = 0; i < this.urls.length; i++) {
      this.fileInfos.push({
        "extension": this.urls[i].Type,
        "name": this.urls[i].Name,
        "base64": this.urls[i].upload,
      });
    }

    console.log(this.fileInfos);

    this.interest_waiver = [
      {
        "INTEREST_WAIVER": $("#waiverreason").val()
      }
    ]
    $(".page-loader-wrapper").show();
    var url = this.cmn.commonUrl + "financial/saveInterestWaiver.spring";
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteId": sessionStorage.getItem("Project_Id"),
      "siteName": sessionStorage.getItem("site_nameval"),
      "bookingFormId": sessionStorage.getItem("flatbooking_Idval"),
      "flatIds": [
        JSON.parse(sessionStorage.getItem("flatId_Idval"))
      ],
      "comment": $("#Comments").val(),
      "comments": this.interest_waiver,
      "financialProjectMileStoneRequests": this.financialPMileStoneRequests,
      "fileInfos": this.fileInfos,
      "requestUrl": "saveInterestWaiver"
    }

    console.log(body);
    console.log(JSON.stringify(body));



    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

      console.log(resp);
      $(".page-loader-wrapper").hide();

      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        swal("Milestone interest waiver request send successfully");
        setTimeout(() => {
          this.router.navigateByUrl("shortcut-components");
        }, 700);
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

  mobilenumberfun(event: any) {
    if (event.which === 32 && event.target.selectionStart === 0) {
      return false;
    } else {
      event.target.value = event.target.value
        .replace(/[^\d-.]/g, '')
        .replace(/(?!^)-/g, '')
        .replace(/\.(?=.*\.)/g, '');

      const pattern = /^[0-9-+.]*$/;
      const inputChar = String.fromCharCode(event.charCode);
      if (event.keyCode !== 8 && !pattern.test(inputChar)) {
        event.preventDefault();
      }

    }
  }

  pastemobilenumEvent(event: ClipboardEvent) {
    const clipboardData = event.clipboardData;
    const pastedText = clipboardData.getData('text');
    const pattern = /^[0-9-+.]*$/;
    if (!pattern.test(pastedText)) {
      event.preventDefault();
    }
  }

}


