import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Http, RequestOptions, Headers } from '@angular/http';
import { CommonComponent } from 'src/app/common/common.component';
import { file } from 'jszip';
declare const Chart: any;
declare const CKEDITOR: any;
declare const $: any;
declare const swal: any;
declare const tinymce: any;
var selected_projectid;
@Component({
  selector: 'app-singlepageemployee-comunication',
  templateUrl: './singlepageemployee-comunication.component.html',
  styleUrls: ['./singlepageemployee-comunication.component.sass']
})
export class SinglepageemployeeComunicationComponent implements OnInit {
  loading: boolean;
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
  pageIndex: number;
  startacharttotalrowsdata: any;
  customerviewDetails_temp: any;
  customerview_Details: any;
  statrtchatbtnstatus: any;
  constructor(private cmn: CommonComponent, private http: Http, private router: Router) {
    $('.page-loader-wrapper').hide();
    $("#unreadid").show();
    this.employeedetailslist();
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
    this.customerviewDetails = JSON.parse(localStorage.getItem('Customerviewchartdetails'));
    this.controller = JSON.parse(localStorage.getItem('ChartDetails'));
    if (this.controller !== null) {
      if (this.controller[0].siteId !== null) {
        this.siteId = [this.controller[0].siteId];
      } else {
        this.siteId = null;
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

    }



    if (localStorage.getItem("MessagerID") !== null) {
      this.getChartDetails(localStorage.getItem("MessagerID"));
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
      this.getChartDetails(this.bindingdata[0].messengerId);

      this.isDisabled = true;

    } else {

      this.isDisabled = false;
    }

    this.employeedetailslist();
  }

  ngDoCheck() {

  }
  ngOnInit() {
    'use strict';
    $("#ckeditorError").hide();
    $(function () {
      $(".mat-paginator-page-size").css('display','none')
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

  


    //   $("#chatid").keypress(function(e) {
    //     var textVal = $(this).val();
    //     if(e.which == 13 && e.shiftKey) {

    //     }
    //     else if (e.which == 13) {
    //        e.preventDefault(); //Stops enter from creating a new line

    //     }
    // });

    // (<any>window).fcWidget.init({ 
    //   token:"5535da24-4882-4b93-945f-f55202bb2ff2", 
    //   host : 'https://wchat.freshchat.com',

    // });


    //   $('#projectID').multiselect({
    //     columns: 1,
    //     placeholder: 'Select Languages',
    //     search: true,
    //     selectAll: true
    // });

    $("#ccprojectID").select2({
      placeholder: "--Select--",
      dir: "ltl",
    });



    $(function () {
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
    this.router.navigate(['dashboard']);
  }

  handle_FileSelect(evt) {
    this.imageuploadfile = [];
    var files = evt.target.files;
    this.file_val = evt.target.value;
    const fsize = files.item(i).size;
    const file = Math.round((fsize / 1024));

    if (file >= 30720) {
      $("#fileInputId").val(null);
      swal("Image size is more than 30MB. Please enter the google drive image link in the text box.");
      $('#imageLinkField').show();
      $('.image-area').hide();
      this.file_name_array = [];
      this.base64_array_object_data = [];
      return false;

    } else {
      
      $('#imageLinkField').hide();
      for (var i = 0; i < files.length; i++) {
        var temp = evt.target.files[i].name;
        this.filename = temp;
        this.filenameval = this.filename.split('.').pop();
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
              'Type': this.filenameval
            });
          }
          reader.readAsDataURL(evt.target.files[i]);
        
        }
      }
    }
  }


  Deleteimage(val) {
    this.filemode.splice(val, 1);
    this.urls.splice(val, 1);

    if(this.filemode.length == 0){
      $('#fileInputId').css("color","black");
      $('#fileInputId').val("");
    }
  }

  _handleReaderLoaded(readerEvt) {
    this.binaryString = readerEvt.target.result;
    this.base64textString = btoa(this.binaryString);
    this.base64_array_object_data.push(btoa(this.binaryString));
    this.imageUrl = btoa(this.binaryString);
    //this.filemode = [{ "id": "", "name": this.filename, "base64": this.imageUrl }];

    this.filemode.push({
      "id": "",
      "name": this.filename,
      "base64": this.imageUrl
    });

    $('#fileInputId').css("color","transparent");

  }



  employeedetailslist() {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "employeeTicket/getEmployeeDetails.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "employeeName": "a",
      "requestUrl": "getEmployeeDetails"
    }

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
        swal(resp.errors[0]);
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



  submitfun() {
    this.selectemployeeid = $('#ccprojectID').val();
    this.googledrivelink = [$('#driveImageLinkField').val()];
    if ($('#driveImageLinkField').val() == "") {
      if (this.filemode.length == 0) {
        this.filename = "";
        this.imageUrl ="";
        this.filemode = [{ "id": "", "name": this.filename, "base64": this.imageUrl }]
      }
    } else {
      this.filemode = null;
    }
    if ($('#subjectid').val() == '') {
      swal("Please enter the Subject");
    }

    // else if (this.selectemployeeid == undefined || this.selectemployeeid == 'select' || this.selectemployeeid == '') {
    //   swal("Please select the CC");
    // } 

    else if ($('#chatid').val() == '') {
      swal("Please enter the message");

    } else {

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




      if (this.messageId == null) {
        var body = {
          "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
          "siteIds": this.siteId,
          "deptIds": this.deptId,
          "subject": $('#subjectid').val(),
          "message": $('#chatid').val(),
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
          "message": $('#chatid').val(),
          "flatBookingId": this.flatBookingId,
          "sendType": "4",
          "sendTo": this.flatBookingId,
          "employeeIds": this.employeeIDval,
          "googleDriveLinks": [$('#driveImageLinkField').val()],
          "files": this.filemode
        }

        this.sendData = body1;
      }

      this.http.post(url, this.sendData).map(res => res.json()).subscribe(resp => {
    
        $('.page-loader-wrapper').hide();
        if (resp.responseCode == 200) {
          if (resp.description == "success") {
            // swal('Message sent successfully');
            $('#chatid').val('');
            $('#driveImageLinkField').val('');
            $('#imageLinkField').hide();
            $('.page-loader-wrapper').hide();

            this.urls = [];
            this.filemode = [];
            this.isDisabled = true;

            this.getChartDetails(resp.messengerId);
            return false;
          } else {
            swal(resp.description);
            return false;
          }

        } else if (resp.responseCode == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        } else {
          swal(resp.errors[0]);
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

  dateToYMD(date) {
    var strArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var d = date.getDate();
    var m = strArray[date.getMonth()];
    var y = date.getFullYear();
    return '' + (d <= 9 ? '0' + d : d) + '-' + m + '-' + y;
  }


  getChartDetails(messageID) {
   
    // $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "messenger/getChatDetails.spring";
    console.log(url)
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "messengerId": messageID,
    }
    console.log(JSON.stringify(body))
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
    console.log(JSON.stringify(resp))
      this.customerviewDetails = resp;
      if (resp.editable == true) {
        this.hideEditable = true;
      } else {
        this.hideEditable = false;
      }

      // $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        this.isDisabled = true;
        this.items = [];
        if (resp.employeeDetailsPojos.length !== 0) {
          for (var i = 0; i < resp.employeeDetailsPojos.length; i++) {
            this.employename = resp.employeeDetailsPojos[i].employeeName;
            this.employeeId = resp.employeeDetailsPojos[i].employeeId;
            this.employeedropdown.push(this.employeeId);
          }

          this.isDisabled = true;

        }

        this.employeedetailslist();
        for (var i = 0; i < resp.messengerDetailsPojos.length; i++) {
          this.messageId = resp.messengerDetailsPojos[i].messengerId;
          localStorage.setItem("MessagerID", this.messageId);
          this.createdByName = resp.messengerDetailsPojos[i].createdByName;
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
                'fileType': resp.messengerDetailsPojos[i].fileList[j].fileType
              });
            } else {
              this.imageuploadfile.push();
            }
          }
          var d = new Date();
          this.dateToYMD(new Date(d.getFullYear(), (d.getMonth() + 1), d.getDate()))
          this.items.push({
            imgsrc: 'https://image.flaticon.com/icons/svg/145/145867.svg',
            text: resp.messengerDetailsPojos[i].messege,
            date: this.dateToYMD(new Date(d.getFullYear(), (d.getMonth()), d.getDate())),
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
      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        swal(resp.errors[0]);
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
    window.open(val, '_system', 'location=yes,closebuttoncaption=Fechar,enableViewportScale=no');
  }


  fileClickfun(val){
    this.imgsrc = val;
    $('#imagemodal').modal('show'); 
  }

  
  getServerData(event) {

    this.bindingdata = [];
    var json_response;
    var json_totalticketresponse;
    json_response = this.startacharttotalrowsdata[event.pageIndex];


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





  }
  unreadFun() {
    this.loading = true;
    // $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "messenger/updateViewStatusAsUnread.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      //"messengerConversationId": this.messengerConversationId
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
}