import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Http, RequestOptions, Headers } from '@angular/http';
import { CommonComponent } from 'src/app/common/common.component';
import { DomSanitizer } from '@angular/platform-browser';

import { ViewChartAllService } from '../view-chart-all/view-chart-all.service';
import { ChartviewService } from './chartview.service';
import { MatSnackBar } from '@angular/material';
declare const Chart: any;
declare const CKEDITOR: any;
declare const $: any;
declare const swal: any;
var fsize = 0;
var selected_projectid;
declare const tinymce: any;

@Component({
  selector: 'app-chartview',
  templateUrl: './chartview.component.html',
  styleUrls: ['./chartview.component.sass'],
  providers: [ViewChartAllService, ChartviewService]
})
export class ChartviewComponent implements OnInit {
  totmb_cam: any = 0;
  mbytesarray_cam: any = []
  loading: boolean;
  name = 'Angular 6';
  htmlContent = '';
  subjectContent = '';
  public fileName;
  fileUrl;
  charthideme: boolean = false;
  isDisabled = false;
  loader: boolean = false;
  items: Array<any> = [];
  customerdata: Array<any> = [];
  ccData: Array<any> = [];
  controller: Array<any> = [];
  employeechangedata: string;
  siteId: any;
  deptId: any;
  flatBookingId: any;
  sendType: any;
  sendTo: any;
  customerviewDetails: any;
  bindingdata: Array<any> = [];
  messageId: any;

  subject: any;
  employename: any;
  employeeId: any;
  file_val: any;
  file_name_array: any = [];
  binaryString: any;
  base64textString: string;
  base64_array_object_data: any = [];
  imageUrl: string | ArrayBuffer;
  sendData: { sessionKey: string; siteIds: any; deptIds: any; subject: any; message: any; flatBookingId: any; sendType: string; sendTo: any; employeeIds: number[]; files: { id: string; name: string; base64: string | ArrayBuffer; }[]; };
  filename: any;
  imageuploadfile: any = [];
  googledrivelink: any[];
  filemode: Array<any> = [];
  selectemployeeid: any;
  employeeID: any;
  employeeIDval: any;
  createdByName: any;
  employeedropdown: Array<any> = [];
  Editable: any;
  hideEditable = true;
  createdById: any;
  urls: Array<any> = [];
  docmenttypeval: any;
  filenameval: any;
  imgsrc: any;
  Texteditor: any;
  filenamedoc: any;
  filesplitdata: any;
  filetypeurlsplit: any;
  filetypeurlsplit1: any;
  textfilesplit: any;
  Base64File: any;
  extensiontype: any;
  titlediv: string;
  unviewedChatCount: any;
  chartcount: any;
  messengerIds: any;
  myconvert_text: string;
  ledgerData: any;
  chartcreateddate: any;
  ortitle: boolean = true;
  resp: any;
  startacharttotalrowsdata: any;
  pageIndex: number;
  myconvertionId: any;
  btndisablestatus: boolean = false;
  customerview_Details: any;
  statrtchatbtnstatus: string;
  messengerConversationId: string;
  maindivcontroller: Array<any> = [];
  ckeditorError: string = "Please enter message";
  ckeditorVal: any;
  customerviewDetails_temp: any;
  mainpopup: boolean = false;
  file_name_array_temp: any;
  mbytesarray: any = []
  brundcumb_Click: string;

  undo = false;
  data = { 'key': 'key1', 'value': 'value1' };
  sub_site_id: any;

  constructor(private cmn: CommonComponent, private http: Http,
    private router: Router, private service: ViewChartAllService, private IS: ChartviewService,
    private sanitizer: DomSanitizer, public snackBar: MatSnackBar) {
    this.brundcumb_Click = sessionStorage.getItem("brundcumbClick");
    this.employeedetailslist();
    $('.page-loader-wrapper').hide();
    $("#unreadid").show();

    this.statrtchatbtnstatus = sessionStorage.getItem("statrtchatbtnstatus")
    if (this.statrtchatbtnstatus == "true") {
      $(function () {
        $("#unreadid").hide()
      })

    } else {
      $(function () {
        $("#unreadid").show()
      })
    }



    this.customerviewDetails = JSON.parse(localStorage.getItem('Customerviewchartdetails'));
    this.customerviewDetails_temp = JSON.parse(localStorage.getItem('Customerviewchartdetails'));
    this.customerview_Details = JSON.parse(localStorage.getItem('Customerviewchartdetails'));



    this.controller = JSON.parse(localStorage.getItem('ChartDetails'));
    this.startacharttotalrowsdata = JSON.parse(sessionStorage.getItem("slidearrowoption"));

    if (this.customerviewDetails != null) {
      for (var i = 0; i < this.startacharttotalrowsdata.length; i++) {

        if (this.startacharttotalrowsdata[i].messengerId == this.customerviewDetails.messengerId) {
          this.pageIndex = i;

        }
      }
    }

    console.log(localStorage.getItem("MessagerID"));

    if (localStorage.getItem("MessagerID") !== null) {
      $('.page-loader-wrapper').hide();
      this.getChartDetails(localStorage.getItem("MessagerID"));
    }



    if (this.controller !== null) {
      if (this.controller[0].siteId !== null) {
        this.siteId = [this.controller[0].siteId];
        this.sub_site_id = this.controller[0].siteId;
      } else {
        this.siteId = null;
        this.sub_site_id = null;
      }

      if (this.controller[0].deptId !== null) {
        this.deptId = [this.controller[0].deptId];
      } else {
        this.deptId = null;
      }
      this.flatBookingId = this.controller[0].flatBookingId;
      this.sendType = this.controller[0].sendType;
      this.sendTo = this.controller[0].sendTo;
      this.messageId = this.controller[0].messengerId;
    } else {

    }



    if (this.customerviewDetails !== null) {
      this.bindingdata.push(this.customerviewDetails);
      if (this.bindingdata[0].siteId !== null) {
        this.siteId = [this.bindingdata[0].siteId];
      } else {
        this.siteId = null;
      }

      if (this.bindingdata[0].deptId !== null) {
        this.deptId = [this.bindingdata[0].deptId];
      } else {
        this.deptId = null;
      }
      this.flatBookingId = this.bindingdata[0].flatBookingId;
      this.sendType = this.bindingdata[0].sendType;
      this.sendTo = this.bindingdata[0].sendTo;
      this.messageId = this.bindingdata[0].messengerId;
      this.createdById = this.bindingdata[0].createdById;
      //  this.getChartDetails(this.bindingdata[0].messengerId);

      this.resp = JSON.parse(sessionStorage.getItem("chartdata"));

      console.log(this.resp.editable);


      for (var i = 0; i < this.resp.messengerDetailsPojos.length; i++) {
        this.maindivcontroller.push([this.resp.messengerDetailsPojos[i].messengerConversationId]);

      }
      let lastElement = this.maindivcontroller[this.maindivcontroller.length - 1];
      this.messengerConversationId = lastElement[0];


      if (this.resp.responseCode == 200) {
        if (this.resp.editable == true) {
          this.hideEditable = true;
        } else {
          this.hideEditable = false;
        }


        this.isDisabled = true;
        this.items = [];
        if (this.resp.employeeDetailsPojos.length !== 0) {
          for (var i = 0; i < this.resp.employeeDetailsPojos.length; i++) {
            this.employename = this.resp.employeeDetailsPojos[i].employeeName;
            this.employeeId = this.resp.employeeDetailsPojos[i].employeeId;
            this.employeedropdown.push(this.employeeId);
          }

          this.isDisabled = true;

        }


        for (var i = 0; i < this.resp.messengerDetailsPojos.length; i++) {
          this.messageId = this.resp.messengerDetailsPojos[i].messengerId;
          localStorage.setItem("MessagerID", this.messageId);
          this.createdByName = this.resp.messengerDetailsPojos[i].createdByName;
          this.chartcreateddate = this.resp.messengerDetailsPojos[i].createdDate;
          // if (resp.messengerDetailsPojos[i].chatType == "MESSEGE_OWNER") {
          // }
          $("#fileInputId").val(null);
          this.subject = this.resp.messengerDetailsPojos[i].subject;
          this.imageuploadfile = [];
          for (var j = 0; j <= this.resp.messengerDetailsPojos[i].fileList.length; j++) {
            if (this.resp.messengerDetailsPojos[i].fileList[j] !== undefined) {
              this.imageuploadfile.push({
                'imgurl': this.resp.messengerDetailsPojos[i].fileList[j].url,
                'Extension': this.resp.messengerDetailsPojos[i].fileList[j].extension,
                'fileType': this.resp.messengerDetailsPojos[i].fileList[j].fileType,
                'filename': this.resp.messengerDetailsPojos[i].fileList[j].name,
              });
            } else {
              this.imageuploadfile.push();
            }
          }
          var d = new Date();
          this.dateToYMD(new Date(d.getFullYear(), (d.getMonth() + 1), d.getDate()))
          this.items.push({
            imgsrc: 'assets/images/DeafaultUserImg.jpg',
            text: this.resp.messengerDetailsPojos[i].messege,
            date: this.chartcreateddate,
            fileimg: this.imageuploadfile,
            chartType: this.resp.messengerDetailsPojos[i].chatType,
            status: '✔✔',
            viewStatus: this.resp.messengerDetailsPojos[i].customerViewStatus,
            createdByName: this.createdByName,
          });
          $('#chatid').val('');
          this.loader = false;
          $("#fileInputId").val(null);
          this.imageuploadfile = [];
          this.filename = '';
          this.imageUrl = '';
          this.charthideme = true;
          this.isDisabled = true;
        }

        $('#imageLinkField').show();
        this.ortitle = true;
        this.employeedetailslist();
        this.isDisabled = true;
      } else {
        this.isDisabled = false;

      }

    };

  }

  getServerData(event) {

    
    this.bindingdata = [];
    var json_response;
    var json_totalticketresponse;
    json_response = this.startacharttotalrowsdata[event.pageIndex];

    console.log(json_response.flatBookingId);

    this.flatBookingId  = json_response.flatBookingId;

    this.customerviewDetails = JSON.parse(localStorage.getItem('Customerviewchartdetails'));



    this.controller = JSON.parse(localStorage.getItem('ChartDetails'));
    // this.startacharttotalrowsdata = JSON.parse(sessionStorage.getItem("slidearrowoption"));

    
    console.log(json_response);
    console.log(this.startacharttotalrowsdata);

    this.bindingdata.push(json_response);

    for (var i = 0; i < this.startacharttotalrowsdata.length; i++) {
      if (this.startacharttotalrowsdata[i].messengerId == this.customerviewDetails.messengerId) {
        this.pageIndex = i;

      }
    }

    //alert(json_response.messengerId)
    this.getChartDetails(json_response.messengerId);

    // this.getTicketDetails();
    // this.departmentList();





  }

  ngDoCheck() {

  }



  ngOnInit() {
    $(function () {

      $(document).ready(function () {
        $('#fileInputId').change(function () {
          var fp = $("#fileInputId");
          var lg = fp[0].files.length; // get length
          var items = fp[0].files;
          var fileSize = 0;

          if (lg > 0) {
            for (var i = 0; i < lg; i++) {
              fileSize = fileSize + items[i].size; // get file size
            }
            //alert("fileSize :"+fileSize)
            // if(fileSize > 2097152) {
            //     alert('File size must not be more than 2 MB');
            //     $('#fUpload').val('');
            // }
          }
        });
      });

      'use strict';
      $("#ckeditorError").hide();
      $(function () {
        CKEDITOR.replace('chatid');
        // CKEDITOR.replace( 'chatid', {
        //   removeButtons: 'Cut,Copy,Paste,Undo,Redo,Anchor,Source,Maximize,Paste from Word,Spell Checker,Insert Special Character,Insert Horizontal Line,Table,Image,Paste from Word,Italic,Underline,Strikethrough,Subscript,Superscript,Remove format,Insert/Remove Numbered List,Insert/Remove Bullet List,Increase Indent,Block Quotes,Formatting Styles,Paragraph Format'
        // });
        CKEDITOR.config.height = 300;
        CKEDITOR.config.scayt_autoStartup = true;
        // For the Basic preset:

        tinymce.init({
          selector: 'textarea#tinymce1',
          theme: "modern",
          height: 300,
          plugins: [
            'advlist autolink lists link image charmap print preview hr anchor pagebreak',
            'searchreplace wordcount visualblocks visualchars code fullscreen',
            'insertdatetime media nonbreaking save table contextmenu directionality',
            'emoticons template paste textcolor colorpicker textpattern imagetools'
          ],

        });
      });
      CKEDITOR.on('instanceCreated', function (e) {
        e.editor.on('contentDom', function () {
          e.editor.document.on('keyup', function (event) {
            this.ckeditorVal = CKEDITOR.instances["chatid"].getData();
            $("#CKEditiorDiv").removeClass("borderforerror");
            $("#ckeditorError").hide();
          }
          );
        });
      });


      var ctx = <HTMLCanvasElement>document.getElementById("doughut-chart");
      if (ctx) {
        ctx.height = 150;
        var myChart = new Chart(ctx, {
          type: 'doughnut',
          data: {
            datasets: [{
              data: [2, 1, 0],
              backgroundColor: [
                "rgb(255, 130, 28)",
                "rgb(64, 196, 255)",
                "rgb(41, 97, 255)"
              ],
              hoverBackgroundColor: [
                "rgb(255, 130, 28)",
                "rgb(64, 196, 255)",
                "rgb(41, 97, 255)"
              ]

            }],
            labels: [
              "Total",
              "Open",
              "Closed"
            ]
          },
          options: {
            legend: {
              position: 'top',
              labels: {
                fontFamily: 'Poppins'
              }

            },
            responsive: true
          }
        });
      }
    })
    setTimeout(() => {
      this.employeedetailslist();
      this.ChartTotalCountList();
    }, 600)

    sessionStorage.removeItem("messengerIds");
    'use strict';
    $("#ckeditorError").hide();
    $("#ccprojectID").select2({
      placeholder: "--Select--",
      dir: "ltl",
      allowClear: true
    });

    this.titlediv = sessionStorage.getItem("title");

    console.log(this.titlediv);

    $(function () {
      //$(".mat-paginator-page-size").hide();
      $(".mat-paginator-page-size").css("display", "none");
      $('#ccprojectID').change(function (e) {
        selected_projectid = $(e.target).val();
        if (selected_projectid == "select") {
          swal("please select project");
        } else {
          selected_projectid = $(e.target).val();
          this.selectemployeeid = selected_projectid;
        }
      })
    })



  }



  homeClick() {
    // this.router.navigate(['leave-update']);
    if (sessionStorage.getItem("brundcumbClick") == "true") {

    } else {
      this.router.navigate(['StartAChart']);
    }

  }
  ngOnDestroy() {
    sessionStorage.setItem("brundcumbClick", null)
  }
  homeClick1() {
    // this.router.navigate(['leave-update']);
    this.router.navigate(['ViewAllCharts']);
  }

  homeiconfun() {
    this.router.navigate(['dashboard']);
  }

  handle_FileSelect(evt) {
    this.imageuploadfile = [];
    var files = evt.target.files;

    this.file_val = evt.target.value;
    var fp = $("#fileInputId");
    var lg = fp[0].files.length; // get length
    var items = fp[0].files;
    var fileSize = 0;

    if (lg > 0) {
      for (var i = 0; i < lg; i++) {
        fileSize = fileSize + items[i].size; // get file size
      }
      // if(fileSize > 2097152) {
      //     alert('File size must not be more than 2 MB');
      //     $('#fUpload').val('');
      // }
    }
    // alert(lg)
    // alert(this.file_val)
    //  fsize = files.item(i).size;
    // alert(fsize)
    //     for (i = 0; i < files.length; i++) {
    //       fsize = fsize + files.item(i).size;
    //     }
    //     alert(fsize)
    const file = Math.round((fileSize / 1024));

    // alert(file)
    //alert(file)
    this.mbytesarray.push(file)
    // this.totmb = this.totmb + this.Mbytes
    // alert(this.totmb)
    // var temtot =0;
    console.log(this.mbytesarray)
    // alert(this.mbytesarray.length)
    this.totmb_cam = 0;
    for (var i = 0; i < this.mbytesarray.length; i++) {
      debugger;
      this.totmb_cam = this.totmb_cam + this.mbytesarray[i];

      // alert("this.totmb_cam :"+this.totmb_cam);
      // if(this.totmb > 20){
      //   alert("Your max file size limit is 20 MB, Total file size is exceeded by " + this.totmb + "MB.");
      //  break
      // }
    }
    //alert(this.totmb_cam)
    if (this.totmb_cam >= 20480) {
      $("#fileInputId").val(null);

      swal('File Upload(s) exceeded the Maximum 20 MB limit. For such files, Please use "File Path" option to Upload.');
      // swal("Your max file size limit is 20 MB, Total file size is exceeded by " + this.totmb_cam + "MB.");
      this.ortitle = true;
      this.urls = [];
      $('#driveImageLinkField').val("");

      $('#imageLinkField').show();
      $('.image-area').hide();
      this.file_name_array = [];
      this.base64_array_object_data = [];
      this.mbytesarray = []
      return false;

    } else {
      this.ortitle = false;
      $('#driveImageLinkField').val("");
      $('#imageLinkField').hide();
      this.file_name_array_temp = []
      for (var i = 0; i < files.length; i++) {
        var temp = evt.target.files[i].name;
        // alert(temp)
        this.filename = temp.toLowerCase();
        //alert(this.filename)
        this.filenameval = this.filename.split('.').pop();
        this.file_name_array_temp.push(temp);
        this.file_name_array.push(temp);
        const file = files[i];
        if (files && file) {
          var reader = new FileReader();
          reader.onload = this._handleReaderLoaded.bind(this);
          reader.readAsBinaryString(file);
        } else {
        }
      }

      if (evt.target.files && evt.target.files[0]) {
        var filesAmount = evt.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
          var reader = new FileReader();
          reader.onload = (event: any) => {

            this.urls.push({
              'upload': event.target.result,
              'Type': this.filenameval,
              'Name': this.file_name_array_temp[i],

            });
          }

          reader.readAsDataURL(evt.target.files[i]);

        }
      }
    }
  }

  ngDestroy() {
    sessionStorage.setItem("statrtchatbtnstatus", null)
  }
  Deleteimage(val) {
    // this.filemode.splice(val, 1);

    this.mbytesarray.splice(val, 1);
    this.urls.splice(val, 1);
    this.file_name_array.splice(val, 1);
    this.base64_array_object_data.splice(val, 1);

    if (this.file_name_array.length == 0) {
      $('#fileInputId').css("color", "black");
      $('#fileInputId').val("");
      $('#imageLinkField').show();
      this.ortitle = true;
    } else {
      $('#imageLinkField').hide();
      this.ortitle = false;
    }
  }

  _handleReaderLoaded(readerEvt) {
    this.binaryString = readerEvt.target.result;
    this.base64textString = btoa(this.binaryString);
    this.base64_array_object_data.push(btoa(this.binaryString));
    this.imageUrl = btoa(this.binaryString);
    //this.filemode = [{ "id": "", "name": this.filename, "base64": this.imageUrl }];



    $('#fileInputId').css("color", "transparent");

  }



  employeedetailslist() {
    //$('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "employeeTicket/getEmployeeDetails.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "employeeName": "a",
      "requestUrl": "getEmployeeDetails",
      "siteId": this.sub_site_id
    }

    console.log(url);
    console.log(JSON.stringify(body));


    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#ccprojectID').html("");
        // $('#ccprojectID').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.employeeDetailsList.length; i++) {
          $('#ccprojectID').append("<option  value='" + resp.employeeDetailsList[i].employeeId + "'>" + resp.employeeDetailsList[i].employeeName + "</option>");
        }
        $('#ccprojectID').val(this.employeedropdown);

      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        // swal(resp.errors[0]);
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

  onKey(event) {
    this.Texteditor = event.target.innerText;
  }

  submitfun() {



    this.selectemployeeid = $('#ccprojectID').val();
    this.googledrivelink = [$('#driveImageLinkField').val()];

    if ($('#subjectid').val() == '') {
      swal("Please enter the Subject");
    }

    // else if (this.selectemployeeid == undefined || this.selectemployeeid == 'select' || this.selectemployeeid == '') {
    //   swal("Please select the CC");
    // } 

    else if (CKEDITOR.instances["chatid"].getData() == '') {

      this.ckeditorVal = CKEDITOR.instances["chatid"].getData();

      if (this.ckeditorVal == "") {
        // $("#ckeditorError").show();
        // $("#CKEditiorDiv").addClass("borderforerror");
        swal("Please enter the description:");
        return false;
      }
      if (this.ckeditorVal.length > 3980) {
        alert("Character limit exceeded, it should be less than 3625 characters");
        return false;
      }



    } else {

      for (var i = 0; i < this.file_name_array.length; i++) {
        this.filemode.push({
          "id": "",
          "name": this.file_name_array[i],
          "base64": this.base64_array_object_data[i]
        });
      }
      if ($('#driveImageLinkField').val() == "") {
        if (this.filemode.length == 0) {
          this.filename = "";
          this.imageUrl = "";
          this.filemode = [{ "id": "", "name": this.filename, "base64": this.imageUrl }]
        }
      } else {
        this.filemode = null;
      }
      //       this.mainpopup =true;
      // var self=this;
      // setTimeout(function(){
      //  // alert("test")
      //   self.mainpopup =false;
      // },10000)

      // return false;
      $('.page-loader-wrapper').show();
      this.loader = true;
      let url = this.cmn.commonUrl + "messenger/chatSubmit.spring";
      let headers = new Headers({ 'Content-Type': 'application/json' });

      if (this.selectemployeeid == undefined || this.selectemployeeid == 'select' || this.selectemployeeid == '') {
        this.employeeIDval = [];
      } else {
        this.employeeIDval = this.selectemployeeid;
        //  this.employeeIDval.push(this.createdById);
        if (this.createdById !== undefined) {
          this.employeeIDval.push(this.createdById);
        }
      }
      this.ckeditorVal = CKEDITOR.instances["chatid"].getData();
      console.log(this.ckeditorVal)
      var span = document.createElement('span');
      span.innerHTML = this.ckeditorVal;
      this.myconvert_text = span.textContent || span.innerText;
      console.log(this.myconvert_text)
      if (this.messageId == null) {
        var body = {
          "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
          "siteIds": this.siteId,
          "deptIds": this.deptId,
          "subject": $('#subjectid').val(),
          "message": this.ckeditorVal,
          "chatMsgWithoutTags": this.myconvert_text,
          "flatBookingId": this.flatBookingId,
          "sendType": "4",
          "sendTo": this.flatBookingId,
          "employeeIds": this.employeeIDval,
          "googleDriveLinks": this.googledrivelink,
          "files": this.filemode
        }
        this.sendData = body;
      } else {
        var body1 = {
          "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
          "messengerId": this.messageId,
          "flag": true,
          "siteIds": this.siteId,
          "deptIds": this.deptId,
          "subject": $('#subjectid').val(),
          "message": this.ckeditorVal,
          "chatMsgWithoutTags": this.myconvert_text,
          "flatBookingId": this.flatBookingId,
          "sendType": "4",
          "sendTo": this.flatBookingId,
          "employeeIds": this.employeeIDval,
          "googleDriveLinks": [$('#driveImageLinkField').val()],
          "files": this.filemode
        }

        this.sendData = body1;
      }


      console.log(JSON.stringify(this.sendData));

      // return false;

      this.http.post(url, this.sendData).map(res => res.json()).subscribe(resp => {

        console.log(JSON.stringify(resp));
        $('.page-loader-wrapper').hide();
        if (resp.responseCode == 200) {
          if (resp.description == "success") {
            // swal('Message sent successfully');
            CKEDITOR.instances["chatid"].setData('')
            $('#chatid').val('');
            this.htmlContent = "";
            $('#driveImageLinkField').val('');
            $('#imageLinkField').hide();
            $('.page-loader-wrapper').hide();
            this.file_name_array = []
            this.base64_array_object_data = []
            this.urls = [];
            this.filemode = [];
            this.isDisabled = true;
            $("#chatid").val("");
            CKEDITOR.instances["chatid"].setData('')
            this.myconvert_text = "";



            this.getChartDetails(resp.messengerId);
            return false;
          } else {
            //swal(resp.description);
            return false;
          }

        }  else if (resp.responseCode == 700) {
          swal(resp.description);
          return false;
       
        } else if (resp.responseCode == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        } else {
          //  swal(resp.errors[0]);
        }
      },
        error => {

          $('.page-loader-wrapper').hide();
          // if (error == 440) {
          //   swal("Your Session has been Timed Out!", "Please login once again.", "error");
          //   this.router.navigate([""]);
          // }
        }
      );




    }
  }



  dateToYMD(date) {
    var strArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var d = date.getDate();
    var m = strArray[date.getMonth()];
    var y = date.getFullYear();
    return '' + (d <= 9 ? '0' + d : d) + '-' + m + '-' + y;
  }


  getChartDetails(messageID) {


  
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "messenger/getChatDetails.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "messengerId": messageID,
    }


    console.log(body);
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {

      console.log(resp);
      this.customerviewDetails = resp;
      if (resp.editable == true) {
        this.hideEditable = true;
      } else {
        this.hideEditable = false;
      }

       $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {

        this.isDisabled = true;
        this.items = [];
        if (resp.employeeDetailsPojos.length !== 0) {
          for (var i = 0; i < resp.employeeDetailsPojos.length; i++) {
            this.employename = resp.employeeDetailsPojos[i].employeeName;
            this.employeeId = resp.employeeDetailsPojos[i].employeeId;
            // alert( this.employeeId)
            this.employeedropdown.push(this.employeeId);
          }

          this.isDisabled = true;

        }

        this.employeedetailslist();
        for (var i = 0; i < resp.messengerDetailsPojos.length; i++) {
          this.messageId = resp.messengerDetailsPojos[i].messengerId;
          localStorage.setItem("MessagerID", this.messageId);
          this.createdByName = resp.messengerDetailsPojos[i].createdByName;
          this.chartcreateddate = resp.messengerDetailsPojos[i].createdDate;
          // if (resp.messengerDetailsPojos[i].chatType == "MESSEGE_OWNER") {
          // }
          $("#fileInputId").val(null);
          this.subject = resp.messengerDetailsPojos[i].subject;
          this.imageuploadfile = [];
          for (var j = 0; j <= resp.messengerDetailsPojos[i].fileList.length; j++) {
            if (resp.messengerDetailsPojos[i].fileList[j] !== undefined) {
              this.imageuploadfile.push({
                'imgurl': resp.messengerDetailsPojos[i].fileList[j].url,
                'Extension': resp.messengerDetailsPojos[i].fileList[j].extension,
                'fileType': resp.messengerDetailsPojos[i].fileList[j].fileType,
                'filename': resp.messengerDetailsPojos[i].fileList[j].name,
              });
            } else {
              this.imageuploadfile.push();
            }
          }
          var d = new Date();
          this.dateToYMD(new Date(d.getFullYear(), (d.getMonth() + 1), d.getDate()))
          this.items.push({
            imgsrc: 'assets/images/DeafaultUserImg.jpg',
            text: resp.messengerDetailsPojos[i].messege,
            date: this.chartcreateddate,
            fileimg: this.imageuploadfile,
            chartType: resp.messengerDetailsPojos[i].chatType,
            status: '✔✔',
            viewStatus: resp.messengerDetailsPojos[i].customerViewStatus,
            createdByName: this.createdByName,
          });
          $('#chatid').val('');
          this.loader = false;
          $("#fileInputId").val(null);
          this.imageuploadfile = [];
          this.filename = '';
          this.imageUrl = '';
          this.charthideme = true;
          this.isDisabled = true;
        }

        $('#imageLinkField').show();
        this.ortitle = true;
        this.ChartTotalCountList();


      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        // swal(resp.errors[0]);
      }
    },
      error => {
        var error = JSON.parse(error._body).responseCode;
        // $('.page-loader-wrapper').hide();
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );

  }


  fileClick(val) {
    window.open(val, '_blank');
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

  ChartTotalCountList() {
    this.service.ChartTotalCountListservice().then(resp => {
      setTimeout(() => {
        if (resp.responseCode == 200) {
          this.unviewedChatCount = resp.unviewedChatCount;
          this.chartcount = resp.unviewedChatCount;
          this.messengerIds = resp.messengerIds;
          sessionStorage.setItem("messengerIds", JSON.stringify(this.messengerIds));
          if (this.messengerIds !== undefined) {
            setTimeout(() => {

              this.service.getunreadmessageslist(JSON.parse(sessionStorage.getItem("messengerIds"))).then(resp => {
                if (resp.responseCode == 200) {
                  this.ledgerData = resp.messengerDetailsPojos;
                }
              });

            }, 500);
          }
        } else if (resp.responseCode == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        } else {
          //swal(resp.errors[0]);
        }
      }, 1000);

    });
  }


  valid() {
    var url = $('#driveImageLinkField').val();
    if (url == "") {

    } else {
      $("#fileInputId").val(null);
      this.imageuploadfile = [];
      this.filename = '';
      this.imageUrl = '';
      window.open(url, 'targetWindow', 'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=400,height=500')
      swal("Please check your file path correct or not(If it is valid please click send button Otherwise, change the file path)");

    }
  }


  textChanged(event) {
    //console.log(event);
  }

  unreadFun() {
    this.loading = true;
    // $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "messenger/updateViewStatusAsUnread.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "messengerConversationId": this.messengerConversationId
    }

    console.log(JSON.stringify(url));
    console.log(JSON.stringify(body));


    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      console.log(resp);
      this.loading = false;
      // $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {

        $("#unreadid").hide();

        //this.router.navigateByUrl("StartAChart");

        //  swal(resp.description);
      } else if (resp.responseCode == 440) {
        this.loading = false;
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        this.loading = false;
        swal(resp);
      }
    },
      error => {
        var error = JSON.parse(error._body).responseCode;
        //alert(error);
        //$('.page-loader-wrapper').hide();
        this.loading = false;
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }

  popclose() {
    this.mainpopup = false
  }


  // Confirmation(msg){
  //   this.snackBar.open(msg, 'Ok', {
  //     duration: 30000
  //   });
  // }

  ActionConfirmation(msg, func, data) {

    this.selectemployeeid = $('#ccprojectID').val();
    this.googledrivelink = [$('#driveImageLinkField').val()];
    if ($('#subjectid').val() == '') {
      swal("Please enter the Subject");
    } else if (CKEDITOR.instances["chatid"].getData() == '') {
      this.ckeditorVal = CKEDITOR.instances["chatid"].getData();
      if (this.ckeditorVal == "") {
        swal("Please enter the description:");
        return false;
      }
      if (this.ckeditorVal.length > 3980) {
        alert("Character limit exceeded, it should be less than 3625 characters");
        return false;
      }
    } else {

      for (var i = 0; i < this.file_name_array.length; i++) {
        this.filemode.push({
          "id": "",
          "name": this.file_name_array[i],
          "base64": this.base64_array_object_data[i]
        });
      }
      if ($('#driveImageLinkField').val() == "") {
        if (this.filemode.length == 0) {
          this.filename = "";
          this.imageUrl = "";
          this.filemode = [{ "id": "", "name": this.filename, "base64": this.imageUrl }]
        }
      } else {
        this.filemode = null;
      }
      //       this.mainpopup =true;
      // var self=this;
      // setTimeout(function(){
      //  // alert("test")
      //   self.mainpopup =false;
      // },10000)

      // return false;
      //  $('.page-loader-wrapper').show();
      //  this.loader = true;
      let url = this.cmn.commonUrl + "messenger/chatSubmit.spring";
      let headers = new Headers({ 'Content-Type': 'application/json' });

      if (this.selectemployeeid == undefined || this.selectemployeeid == 'select' || this.selectemployeeid == '') {
        this.employeeIDval = [];
      } else {
        this.employeeIDval = this.selectemployeeid;
        //  this.employeeIDval.push(this.createdById);
        if (this.createdById !== undefined) {
          this.employeeIDval.push(this.createdById);
        }
      }
      this.ckeditorVal = CKEDITOR.instances["chatid"].getData();
      console.log(this.ckeditorVal)
      var span = document.createElement('span');
      span.innerHTML = this.ckeditorVal;
      this.myconvert_text = span.textContent || span.innerText;
      console.log(this.myconvert_text)
      if (this.messageId == null) {
        var body = {
          "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
          "siteIds": this.siteId,
          "deptIds": this.deptId,
          "subject": $('#subjectid').val(),
          "message": this.ckeditorVal,
          "chatMsgWithoutTags": this.myconvert_text,
          "flatBookingId": this.flatBookingId,
          "sendType": "4",
          "sendTo": this.flatBookingId,
          "employeeIds": this.employeeIDval,
          "googleDriveLinks": this.googledrivelink,
          "files": this.filemode
        }
        this.sendData = body;
      } else {
        var body1 = {
          "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
          "messengerId": this.messageId,
          "flag": true,
          "siteIds": this.siteId,
          "deptIds": this.deptId,
          "subject": $('#subjectid').val(),
          "message": this.ckeditorVal,
          "chatMsgWithoutTags": this.myconvert_text,
          "flatBookingId": this.flatBookingId,
          "sendType": "4",
          "sendTo": this.flatBookingId,
          "employeeIds": this.employeeIDval,
          "googleDriveLinks": [$('#driveImageLinkField').val()],
          "files": this.filemode
        }

        this.sendData = body1;
      }


      console.log(JSON.stringify(this.sendData));

      
     
      this.undo = false;
      let snackBarRef = this.snackBar.open(msg, 'Undo', {
        duration: 10000
      });
      console.log("save search");
      setTimeout(() => {
        if (!this.undo) {
          this.http.post(url, this.sendData).map(res => res.json()).subscribe(resp => {

            console.log("-----"+JSON.stringify(resp));
            $('.page-loader-wrapper').hide();
           // alert(resp.responseCode)
            if (resp.responseCode == 200) {
              if (resp.description == "success") {
                // swal('Message sent successfully');
                CKEDITOR.instances["chatid"].setData('')
                $('#chatid').val('');
                this.htmlContent = "";
                $('#driveImageLinkField').val('');
                $('#imageLinkField').hide();
                $('.page-loader-wrapper').hide();
                this.file_name_array = []
                this.base64_array_object_data = []
                this.urls = [];
                this.filemode = [];
                this.isDisabled = true;
                $("#chatid").val("");
                CKEDITOR.instances["chatid"].setData('')
                this.myconvert_text = "";



                this.getChartDetails(resp.messengerId);
                return false;
              }else {
                swal(resp.description);
                return false;
              }

            } else if (resp.responseCode == 700) {
              swal(resp.description);
              return false;
            } else if (resp.responseCode == 440) {
              swal("Your Session has been Timed Out!", "Please login once again.", "error");
              this.router.navigate([""]);
            } else {
              //  swal(resp.errors[0]);
            }
          },
            error => {

              $('.page-loader-wrapper').hide();
              // if (error == 440) {
              //   swal("Your Session has been Timed Out!", "Please login once again.", "error");
              //   this.router.navigate([""]);
              // }
            }
          );
        }
      }, 9000);

      snackBarRef.onAction().subscribe(() => {
        console.log('undo');
        this.undo = true;

        this.getChartDetails(localStorage.getItem("MessagerID"));
      });
    }
  }

  somefunction(data) {
    console.log(data);
  }
}