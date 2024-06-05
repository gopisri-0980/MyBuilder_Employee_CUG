import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { CommonComponent } from 'src/app/common/common.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PageEvent } from '@angular/material';
declare const Chart: any;
declare const CKEDITOR: any;
declare const tinymce: any;

declare const $: any;
declare const autosize: any;
declare const swal: any;
var file;
var file_second;
var image_controller;

@Component({
  selector: 'app-company-view-and-approve',
  templateUrl: './company-view-and-approve.component.html',
  styleUrls: ['./company-view-and-approve.component.sass']
})
export class CompanyViewAndApproveComponent implements OnInit {

  file_name_array: any = [];
  binaryString: any;
  base64textString: string;
  base64_array_object_data: any = [];
  File_Info: any = [];
  siteval: number;
  stateval: number;
  state_val: number;
  file_val: any;
  imgsrcId: any;
  json_response: any;
  myimgg: boolean = true;
  fileExtension: any;
  itemsPer_Page_companyNotifications: number;
  current_Page_companyNotifications: any;
  totalItems_companyNotifications: number;
  tabledata_companyNotifications: any;
  stateResponseArray: any = [];
  notTypeResponseArray: any = [];
  linkFileLoc: any;
  osType: any;
  stateID: any = [];
  imgLoc: any;
  fileLoc: any;
  file_name_array1: any = [];
  base64_array_object_data1: any = [];
  File_Info1: any = [];
  imageLocation: any;
  //selectedstate: any;

  ckeditorError: string = "Please enter message";
  ckeditorErrorLengthExceed: string = "Characters length should not exceed 4000";
  ckeditorVal: any;
  textdisc: any;
  projectResponseArray: any = [];
  projectID: any = [];
  depID: string;
  roleID: string;
  notificationId: string;
  state_value: any;
  closeResult: string;
  dateandtime: string;
  weekdayNames: string[];
  monthNames: string[];
  dateString: string;
  main_notification_id: any;
  main_notification_title: any;
  main_notification_dec: any;
  constructor(public route: ActivatedRoute, private router: Router, private http: Http, 
    public cmn: CommonComponent , private modalService: NgbModal,) {

      var d = new Date();
      d.toLocaleString();
      d.toLocaleDateString();
      d.toLocaleTimeString();
      this.dateandtime = d.toLocaleTimeString();
  
      var date = new Date();
  
      this.weekdayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      this.monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      this.dateString = this.weekdayNames[date.getDay()] + ","
  
        + this.monthNames[date.getMonth()] + " " + date.getDate() + "," + date.getFullYear();
  
      console.log(this.dateString);
      

    $('.page-loader-wrapper').hide();

    console.log(sessionStorage.getItem("notificationId"));

    if(sessionStorage.getItem('response') !== null){
      this.json_response = eval('(' + sessionStorage.getItem('response') + ')');

      console.log(sessionStorage.getItem('response'));
      this.notificationId = this.json_response.notificationId;
    } else {
      this.notificationId = sessionStorage.getItem("notificationId");
      console.log(this.notificationId);
      
    }
 



   


    this.getCompanyNotificationDetails();
  }

  truncateHTML(text: string): string {

    let charlimit = 160;
    if(!text || text.length <= charlimit )
    {
        return text;
    }


  let without_html = text.replace(/<(?:.|\n)*?>/gm, '');
  let shortened = without_html.substring(0, charlimit) + "...";
  return shortened;
}



  ngOnInit() {

    var nValFromSession = sessionStorage.getItem("nval");
    if (nValFromSession == "1") {
      window.location.reload();
      sessionStorage.setItem("nval", "2");
    } else {
      $('.page-loader-wrapper').hide();
    }

    $('.page-loader-wrapper').hide();
    this.depID = sessionStorage.getItem("session_deptid")
    this.roleID = sessionStorage.getItem("session_roleId")
    console.log("Department id " + this.depID);


    'use strict';
    $("#ckeditorError").hide();
    $(function () {
      CKEDITOR.replace('ckeditor');
      CKEDITOR.config.height = 300;
      CKEDITOR.config.scayt_autoStartup = true;
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
          this.ckeditorVal = CKEDITOR.instances["ckeditor"].getData();
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



    // if(this.json_response.imgLoc == "NA"){
    //   this.myimgg= false;
    //   $('#myImg').attr('src','');
    //  }else{
    //   this.myimgg= true;
    //   $('#myImg').attr('src', this.json_response.imgLoc);
    //  }

    $(function () {

      $('#myImg').on('click', function () {
        // alert( this.imgsrcId);
        var img = document.getElementById('myImg');
        // alert(img.getAttribute('src')); // foo.jpg
        $('.imagepreview').attr('src', img.getAttribute('src'));
        $('#imagemodal').modal('show');
      });



      $("#imgfile").change(function () {

        if (file >= 10240) {
          $('#imagefilee').val(null);
          // alert("File too Big, please select a file less than 10mb"); 
          return false;
        } else {
          $('#driveImg').hide();
          $("#myImg").show();
          $(".image-area").show();
          if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = imageIsLoaded;
            reader.readAsDataURL(this.files[0]);
          }
        }

      });

      $("#filee").change(function () {

        if (file_second >= 10240) {

          $("#filee").val(null);

          $("#myfilebinding").hide();
          $("#image-myfilebinding").hide();
          // alert("File too Big, please select a file less than 10mb"); 
          return false;
        } else {
          $("#image-myfilebinding").show();
          $(".fileDiv").hide();
          // if (this.files && this.files[0]) {
          //     var reader = new FileReader();
          //     reader.onload = imageIsLoaded;
          //     reader.readAsDataURL(this.files[0]);
          // }
        }

      });

    });



    function imageIsLoaded(e) {
      this.imgsrcId = e.target.result;
      $('#myImg').attr('src', e.target.result);
      image_controller = e.target.result;
    };

  }

  getCompanyNotificationDetails() {
    $('.page-loader-wrapper').show();

    let url = this.cmn.commonUrl + "notification/viewProjectNotificationDetailChanges.spring";
    console.log("viewProjectNotificationDetailChanges url :" + url);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "id": this.notificationId, 
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "notificationType": "Company"
    }
console.log(body);

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      console.log(resp);
      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 200) {

        this.state_value = resp.responseObjList.notificationApprovalPojoList[0].statusId;

        this.osType = resp.responseObjList.notificationRequests[0].osType;
        this.imgLoc = resp.responseObjList.notificationRequests[0].imgLoc;
        this.fileLoc = resp.responseObjList.notificationRequests[0].linkFileLoc;

        $("#notificationtype_id").prop("disabled", true);
        $("#state_id").prop("disabled", true);
        $("#device_id").prop("disabled", true);

        for (let i = 0; i < resp.responseObjList.notificationDetailChangesResonse[0].notificationTypeList.length; i++) {
          this.notTypeResponseArray.push(resp.responseObjList.notificationDetailChangesResonse[0].notificationTypeList[i].value);
        }

        for (let i = 0; i < resp.responseObjList.notificationDetailChangesResonse[0].stateList.length; i++) {
          this.stateResponseArray.push(resp.responseObjList.notificationDetailChangesResonse[0].stateList[i].name);
          this.stateID.push(resp.responseObjList.notificationDetailChangesResonse[0].stateList[i].id);
        }

        for (let i = 0; i < resp.responseObjList.notificationDetailChangesResonse[0].siteList.length; i++) {
          this.projectResponseArray.push(resp.responseObjList.notificationDetailChangesResonse[0].siteList[i].name);
          this.projectID.push(resp.responseObjList.notificationDetailChangesResonse[0].siteList[i].id);
        }

        $("#notificationtype_id").val(this.notTypeResponseArray);
        $("#state_id").val(this.stateResponseArray);
        $("#project_id").val(this.projectResponseArray);
        $("#device_id").val(resp.responseObjList.notificationRequests[0].osType);
        $("#title_id").val(resp.responseObjList.notificationRequests[0].message);
        $("#notificationtext_id").val(resp.responseObjList.notificationRequests[0].notificationText);
        //  $("#notificationdescription_id").val(resp.responseObjList.notificationRequests[0].description);


        //  CKEDITOR.instances['ckeditor'].setData(resp.responseObjList.notificationRequests[0].description);


        this.textdisc = resp.responseObjList.notificationRequests[0].description;

        if (resp.responseObjList.notificationRequests[0].imgLoc == null || resp.responseObjList.notificationRequests[0].imgLoc == "") {
          $(".image-area").hide();
        } else {

          this.imageLocation = resp.responseObjList.notificationRequests[0].imgLoc;

          // alert(this.imageLocation)
          var gDrivePath = this.imageLocation.split('//')[1].split('/')[0];
          if (gDrivePath == 'drive.google.com' || gDrivePath == 'www.youtube.com' || gDrivePath == 'youtu.be') {
            $("#myImg").hide();
            $('#driveImg').show();
            $("#imagefilee").val(this.imageLocation);
          } else {
            $('#driveImg').hide();
            $('#myImg').attr('src', resp.responseObjList.notificationRequests[0].imgLoc);

            image_controller =  resp.responseObjList.notificationRequests[0].imgLoc;

            var imageename = this.imageLocation.split(/[\\/]/).pop();
            $("#imagefilee").val(imageename);
          }


        }

        $(function () {
          $('#myImg').on('click', function () {
            var img = document.getElementById('myImg');
            $('.imagepreview').attr('src', img.getAttribute('src'));
            $('#imagemodal').modal('show');
          });
        });
        //alert(resp.responseObjList.notificationRequests[0].linkFileLoc)
        if (resp.responseObjList.notificationRequests[0].linkFileLoc == null || resp.responseObjList.notificationRequests[0].linkFileLoc == "") {
          $(".fileDiv").hide();
        } else {
          var gDrivePath = resp.responseObjList.notificationRequests[0].linkFileLoc.split('/')[4];
          //alert(gDrivePath)
          if (gDrivePath == 'sumadhura_projects_images') {
            this.linkFileLoc = resp.responseObjList.notificationRequests[0].linkFileLoc;
            var basename = resp.responseObjList.notificationRequests[0].linkFileLoc.split(/[\\/]/).pop(),  // extract file name from full path ...
              // (supports `\\` and `/` separators)
              pos = basename.lastIndexOf(".");       // get last position of `.`
            if (basename === "" || pos < 1)            // if file name is empty or ...
              return "";                             //  `.` not found (-1) or comes first (0)
            this.fileExtension = basename.slice(pos + 1);
            console.log("file extension -->" + this.fileExtension);
            $("#filee").val(basename);

          } else {
            this.linkFileLoc = resp.responseObjList.notificationRequests[0].linkFileLoc;
            this.fileExtension = 'gDriveFile';

            $("#filee").val(this.linkFileLoc);


          }

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
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }

  approveRejectModifyNotification(action) {


    // this.ckeditorVal = CKEDITOR.instances["ckeditor"].getData();
    // if (this.ckeditorVal.length > 3980) {
    //   alert("Character limit exceeded, it should be less than 3625 characters");
    //   return false;
    // }

    // if (this.ckeditorVal == "") {
    //   $("#ckeditorError").show();
    //   $("#CKEditiorDiv").addClass("borderforerror");
    //   return false;
    // }

    // console.log(this.ckeditorVal);


    var title = $("#title_id").val();
    if (title == "" || title == "undefined" || title == undefined) {
      swal("Please enter title");
      return false;
    }

    var notification_id = $("#notificationtext_id").val();
    var discription = $("#notificationdescription_id").val();


    if (notification_id == "" && this.textdisc == "" && this.File_Info == "" && (this.imgLoc == "" || this.imgLoc == null)) {
      swal("Please enter notification text (or) notification description (or) upload notification image");
      return false;
    }

    $('.page-loader-wrapper').show();

    for (var i = 0; i < this.base64_array_object_data.length; i++) {
      this.File_Info.push({
        "id": "" + i,
        "name": "" + this.file_name_array,
        "base64": "" + this.base64_array_object_data
      });
    }



    for (var i = 0; i < this.base64_array_object_data1.length; i++) {
      this.File_Info1.push({
        "id": "" + i,
        "name": "" + this.file_name_array1,
        "base64": "" + this.base64_array_object_data1
      });
    }




    if (this.File_Info == "") {
      // this.imgLoc = "";
    } else {
      this.imgLoc = "";
    }

    if (this.File_Info1 == "") {
      // this.fileLoc = "";
    } else {
      this.fileLoc = "";
    }

    if ($('#driveImageLinkField').val() != '') {
      this.imgLoc = $('#driveImageLinkField').val().trim();
    } else {

    }

    if ($('#driveFileLinkField').val() != '') {
      this.fileLoc = $('#driveFileLinkField').val().trim();
    } else {

    }

    let url = this.cmn.commonUrl + "notification/approveOrRejectCompanyNotifications.spring";
    console.log("approveOrRejectCompanyNotifications url :" + url);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "message": $("#title_id").val(),
      "description": this.textdisc,
      "types": this.notTypeResponseArray,
      "stateIds": this.stateID,
      "siteIds": this.projectID,
      "fileInfos": this.File_Info,
      "linkFiles": this.File_Info1,
      "imgLoc": this.imgLoc,
      "linkFileLoc": this.fileLoc,
      "notificationText": $("#notificationtext_id").val(),
      "osType": this.osType,
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "action": action,
      "comments": $("#comments_id").val(),
      "id": this.notificationId
    }

    console.log(url);
    console.log(body);

    


    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      console.log(resp);

      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 200) {
        if (action == "APPROVED") {
          swal("Notification Approved successfully !!");
        } else if (action == "REJECTED") {
          swal("Notification Rejected successfully !!");
        } else if (action == "Modify") {
          swal("Notification sent for modification successfully !!");
        } else {

        }
        this.router.navigate(["view-company-notifications-for-approvals"]);
        sessionStorage.removeItem("notificationId");
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
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }

  // To upload images
  handleFileSelect(evt) {
    debugger;
    var files = evt.target.files;
    var file_val = evt.target.value;
    //alert("------------"+files);
    console.log(evt.target.value);
    var extension = file_val.substring(file_val.lastIndexOf('.') + 1);
    // alert(extension)
    if (extension == "png" || extension == "jpg" || extension == "jpeg") {

    } else {
      $("#imgfile").val(null);
      swal("Sorry, Please upload only .jpg, .png, .jpeg formats which are accepted.");
      return false;
    }
    // alert("going")
    const fsize = files.item(i).size;
    file = Math.round((fsize / 1024));

    if (file >= 1024) {
      $("#imgfile").val(null);
      $(function () {
        $(".image-area").css("display", "none");
      })
      swal("Image size is more than 1MB. Please select below 1MB image.");
      // $('#imageLinkField').show();
      $('#driveImg').hide();
      $('#myImg').hide();
      this.file_name_array = [];
      this.base64_array_object_data = [];
      return false;

    } else {
      $(function () {
        $(".image-area").css("display", "block");
      })
      $('#imageLinkField').hide();
      for (var i = 0; i < files.length; i++) {
        // The size of the file. 
        var temp = evt.target.files[i].name;

        this.file_name_array.push(temp);

        //alert(this.file_name_array.length);
        file = files[i];
        if (files && file) {
          var reader = new FileReader();
          reader.onload = this._handleReaderLoaded.bind(this);
          reader.readAsBinaryString(file);
        } else {
          console.log("file not uploaded.");
        }
      }
    }

  }

  _handleReaderLoaded(readerEvt) {
    this.binaryString = readerEvt.target.result;
    //alert(this.binaryString);
    this.base64textString = btoa(this.binaryString);
    this.base64_array_object_data.push(btoa(this.binaryString));
    // alert("Data: " + btoa(this.binaryString));
  }

  // to upload files 
  handle_FileSelect(evt) {
    $("#myfilebinding").show();
    this.file_name_array1 = [];
    this.base64_array_object_data1 = [];
    this.File_Info1 = [];
    debugger;
    var files = evt.target.files;
    var file_val = evt.target.value;
    //alert("------------"+files.length);
    console.log(evt.target.value);
    const fsize = files.item(i).size;
    file_second = Math.round((fsize / 1024));
    if (file_second >= 10240) {
      $("#files").val(null);
      swal("File size is more than 10MB. Please enter the google drive file link in the text box.");
      $('#fileLinkField').show();
      $(".fileDiv").hide();
      this.file_name_array1 = [];
      this.base64_array_object_data1 = [];
      return false;
    } else {
      $('#fileLinkField').hide();

      for (var i = 0; i < files.length; i++) {
        var temp = evt.target.files[i].name;
        this.file_name_array1.push(temp);
        //alert(this.file_name_array.length);
        var file = files[i];
        if (files && file) {
          var reader = new FileReader();
          reader.onload = this._handleReader_Loaded.bind(this);
          reader.readAsBinaryString(file);

        } else {
          console.log("file not uploaded.");
        }
      }
    }

  }

  _handleReader_Loaded(readerEvt) {
    this.binaryString = readerEvt.target.result;
    //alert(this.binaryString);
    this.base64textString = btoa(this.binaryString);
    this.base64_array_object_data1.push(btoa(this.binaryString));
    //alert("Data: " + btoa(this.binaryString));
  }

  // handleFileSelect(evt) {
  //   debugger;
  //   var files = evt.target.files;
  //   this.file_val = evt.target.value;

  //  console.log(evt.target.value);

  //   for (var i = 0; i < files.length; i++) {
  //     var temp = evt.target.files[i].name;

  //     this.file_name_array.push(temp);

  //     var file = files[i];
  //     if (files && file) {
  //       var reader = new FileReader();
  //       reader.onload = this._handleReaderLoaded.bind(this);
  //       reader.readAsBinaryString(file);

  //     } else {
  //       console.log("file not uploaded.");
  //     }
  //   }
  // }

  // _handleReaderLoaded(readerEvt) {
  //   this.binaryString = readerEvt.target.result;
  //   this.base64textString= btoa(this.binaryString);
  //   this.base64_array_object_data.push(btoa(this.binaryString));
  // }

  delete_image() {
    console.log("----Delete image----")
    $("#imgfile").val(null);
    $("#imagefilee").val(null);
    $(".image-area").hide();
    this.file_name_array = [];
    this.base64_array_object_data = [];
    this.File_Info = [];
    image_controller = '';
    console.log("file name length :" + this.file_name_array.length);
    console.log("file base64 length :" + this.base64_array_object_data.length);

  }

  delete_file() {
    console.log("----Delete file----")
    $("#filee").val(null);
    $("#myfilebinding").hide();
    this.file_name_array1 = [];
    this.base64_array_object_data1 = [];
    this.File_Info1 = [];
    console.log("file name length :" + this.file_name_array1.length);
    console.log("file base64 length :" + this.base64_array_object_data1.length);
  }

  myimage(fileurl) {
    window.open(fileurl, '_system', 'location=yes,closebuttoncaption=Fechar,enableViewportScale=yes');
  }

  homeClick() {
    this.cmn.commonHomeNavigation();
  }

  backToList() {
    sessionStorage.setItem('isBackButtonClickedComApprovals', 'true');
    this.router.navigate(["view-company-notifications-for-approvals"]);
  }


  Previewfun(content3) {

    var title = $("#title_id").val();
    if (title == "" || title == "undefined" || title == undefined) {
      swal("Please enter title");
      return false;
    }

    var notification_id = $("#notificationtext_id").val();
    var discription = $("#notificationdescription_id").val();



    var notification_title = $("#title_id").val();



    if (notification_id == "" && this.textdisc == "" && this.File_Info == "" && (this.imgLoc == "" || this.imgLoc == null)) {
      swal("Please enter notification text (or) notification description (or) upload notification image");
      return false;
    }

    

    for (var i = 0; i < this.base64_array_object_data.length; i++) {
      this.File_Info.push({
        "id": "" + i,
        "name": "" + this.file_name_array,
        "base64": "" + this.base64_array_object_data
      });
    }



    for (var i = 0; i < this.base64_array_object_data1.length; i++) {
      this.File_Info1.push({
        "id": "" + i,
        "name": "" + this.file_name_array1,
        "base64": "" + this.base64_array_object_data1
      });
    }




    if (this.File_Info == "") {
      // this.imgLoc = "";
    } else {
      this.imgLoc = "";
    }

    if (this.File_Info1 == "") {
      // this.fileLoc = "";
    } else {
      this.fileLoc = "";
    }

    if ($('#driveImageLinkField').val() != '') {
      this.imgLoc = $('#driveImageLinkField').val().trim();
    } else {

    }

    if ($('#driveFileLinkField').val() != '') {
      this.fileLoc = $('#driveFileLinkField').val().trim();
    } else {

    }


    this.main_notification_title = notification_title;
    this.main_notification_id = notification_id;
    this.main_notification_dec = this.textdisc;

    console.log(this.main_notification_dec);
    

    this.modalService.open(content3, { backdrop: 'static', size: 'lg', keyboard: false, centered: true, }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason3(reason)}`;
    });


    $(function () {

      if (image_controller == "" || image_controller == undefined || image_controller == null) {
        $('#myImg_view').attr('src', 'assets/images/download_not.jpg');
        $('#myImg_view1').attr('src', 'assets/images/download_not.jpg');
      } else {
        $('#myImg_view').attr('src', image_controller);
        $('#myImg_view1').attr('src', image_controller);
      }

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


}
