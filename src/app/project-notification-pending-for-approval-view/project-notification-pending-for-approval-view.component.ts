import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { RequestOptions, Headers, Http } from '@angular/http';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PageEvent } from '@angular/material';
declare const Chart: any;
declare const CKEDITOR: any;
declare const tinymce: any;


declare const $: any;
declare const swal: any
var count = 0;
var file_second;
var file;
var imageename;
var filename
var existingimagebase64;
var existingfilebase64;
var existingimgeurl = "";
var existingfileurl = "";
var ostyPe;
var image_controller;
@Component({
  selector: 'app-project-notification-pending-for-approval-view',
  templateUrl: './project-notification-pending-for-approval-view.component.html',
  styleUrls: ['./project-notification-pending-for-approval-view.component.sass']
})
export class ProjectNotificationPendingForApprovalViewComponent implements OnInit {
  file_name_array1: any = [];
  file_name_array: any = [];
  file_val: any;
  binaryString: any;
  base64_array_object_data1: any = [];
  base64_array_object_data: any = [];
  base64textString: string;
  formatChild: any;
  isLoaded: boolean;
  toggled: boolean = false;
  emojitext: string = "";
  emajibind: any = "";
  File_Info: any = [];
  File_Info1: any = [];
  ostype_val: any;


  json_response: any;
  myimgg: boolean = true;
  fileExtension: any;
  notificationIdd: any;
  siteNames: any = [];
  blockListnames: any = [];
  floorListnames: any = [];
  flatListnames: any = [];
  sbuaListnames: any = [];
  facingListnames: any = [];
  bhkTypeListnames: any = [];
  flatSeriesListnames: any = [];
  siteids: any = [];
  blockids: any = [];
  floorids: any = [];
  flatids: any = [];
  existing_File_Info: any = [];
  existing_img_Info: any = [];
  filename_forview: any;
  linkFileLoc: any;
  imageLocation: any;

  ckeditorError: string = "Please enter message";
  ckeditorErrorLengthExceed: string = "Characters length should not exceed 4000";
  ckeditorVal: any;
  textdisc: any;
  temp_fromDate: any = null;
  temp_toDate: any = null;
  selected_flat: any = []
  fltsCount: any = 0;
  fltsList: any;
  datesrelatedflatesstatus: boolean = true;

  startdate: any;
  enddate: any;
  closeResult: string;
  dateandtime: string;
  weekdayNames: string[];
  monthNames: string[];
  dateString: string;
  main_notification_id: any;
  main_notification_title: any;
  main_notification_dec: any;
  constructor(private cmn: CommonComponent, private http: Http, private router: Router, private modalService: NgbModal,) {
    $('.page-loader-wrapper').hide();

    var nValFromSession = sessionStorage.getItem("nval");
    setTimeout(function () {
      if (nValFromSession == "4") {
        window.location.reload();
        sessionStorage.setItem("nval", "5");
      } else {

      }
    });


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


  handleSelection(event) {
    this.emajibind += event.char;
    $("#title_id").val(this.emajibind);
    //alert(this.emajibind);
  }
  handle_FileSelect(evt) {
    $("#myfilebinding").show();
    $("#hidefile").hide()
    this.file_name_array1 = [];
    this.base64_array_object_data1 = [];
    this.File_Info1 = [];
    debugger;
    var files = evt.target.files;
    var file_val = evt.target.value;
    // alert("------------"+file_name);
    console.log(evt.target.value);
    const fsize = files.item(i).size;
    file_second = Math.round((fsize / 1024));
    var extension = file_val.substring(file_val.lastIndexOf('.') + 1);

    if (file_second >= 10240) {
      $("#files").val(null);
      // $("#.image-area").hide();

      swal("File size is more than 10MB. Please enter the google drive file link in the text box.");
      $('#fileLinkField').show();
      $(".hidefile").hide();

      $(".remove-image2").hide();
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
  handleFileSelect(evt) {

    debugger;
    var files = evt.target.files;
    var file_val = evt.target.value;
    //alert("------------"+files);
    console.log(evt.target.value);

    const fsize = files.item(i).size;
    file = Math.round((fsize / 1024));
    var extension = file_val.substring(file_val.lastIndexOf('.') + 1);
    if (extension == "png" || extension == "jpg" || extension == "jpeg") {

    } else {
      $("#imgfile").val(null);
      $("#myImg").val(null);
      swal("Sorry, Please upload only .jpg, .png, .jpeg formats which are accepted.");
      return false;
    }
    if (file >= 1024) {
      $("#imgfile").val(null);
      $("#myImg").val(null);
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

    // else if (file < 10240) { 
    //   alert( 
    //     "File too small, please select a file greater than 10mb");
    //     return false 
    // } else { 
    //   document.getElementById('size').innerHTML = '<b>'
    //   + file + '</b> KB'; 
    // } 

  }


  _handleReaderLoaded(readerEvt) {

    this.binaryString = readerEvt.target.result;
    //alert(this.binaryString);
    this.base64textString = btoa(this.binaryString);
    this.base64_array_object_data.push(btoa(this.binaryString));
    //alert("Data: " + btoa(this.binaryString));
  }

  ngOnInit() {


    'use strict';
    $("#ckeditorError").hide();
    var self_ = this;
    $(function () {

      $('#fromDate').change(function () {

        if ($("#projectID").val() == "select") {
          swal("Please select Project");
          $('#fromDate').val('')
          return false;
        }
        self_.forModelpopupclick('');
      });

      $('#toDate').change(function () {

        if ($("#projectID").val() == "select") {
          swal("Please select Project");
          $('#toDate').val('')
          return false;
        }
        self_.forModelpopupclick('');
      });

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


    $("input").prop("disabled", true);
    $("#title_id").prop("disabled", false);
    $("#files").prop("disabled", false);
    $("#imgfile").prop("disabled", false);
    // $("textarea").prop("disabled", true);
    console.log("Approve response:" + sessionStorage.getItem('response'));
    this.json_response = eval('(' + sessionStorage.getItem('response') + ')');
    // $("#textarea2").val(this.json_response.description);
    // $("#title_id").val(this.json_response.message);
    // $("#notificationtext_id").val(this.json_response.notificationText);
    // $("#projectID").val(this.json_response.siteNames);
    // $("#BlockId").val(this.json_response.blockNames);
    // $("#FloorId").val(this.json_response.floorNames);
    // $("#FlatId").val(this.json_response.flatNamess);
    this.notificationIdd = this.json_response.notificationId;
    this.getDetails()

    //   var basename =  this.json_response.linkFileLoc.split(/[\\/]/).pop(),  // extract file name from full path ...
    // (supports `\\` and `/` separators)

    //     pos = basename.lastIndexOf(".");       // get last position of `.`

    // if(basename == "NA"){

    // }else{
    //   if (basename === "" || pos < 1)            // if file name is empty or ...
    //   return "";                             //  `.` not found (-1) or comes first (0)
    //   this.fileExtension = basename.slice(pos + 1);
    // // alert(basename.slice(pos + 1))
    // }


    //  if(this.json_response.imgLoc == "NA"){

    //   this.myimgg= false;
    //   $('#myImg').attr('src','');
    //  //alert("na")
    //  }else{
    //   // alert(this.json_response.imgLoc);
    //   this.myimgg= true;
    //   $('#myImg').attr('src', this.json_response.imgLoc);
    //  }

    //   $(function() {
    //     $('#myImg').on('click', function() {
    //    // alert( this.imgsrcId);
    //    var img = document.getElementById('myImg');
    //   // alert(img.getAttribute('src')); // foo.jpg
    //       $('.imagepreview').attr('src', img.getAttribute('src'));
    //       $('#imagemodal').modal('show');   
    //     });		



    //     $(":file").change(function () {
    //       $("#myImg").show();
    //         if (this.files && this.files[0]) {
    //             var reader = new FileReader();
    //             reader.onload = imageIsLoaded;
    //             reader.readAsDataURL(this.files[0]);
    //         }
    //     });

    // });
    // function imageIsLoaded(e) {
    //   this.imgsrcId = e.target.result;
    //   //alert(e.target.result);
    //     $('#myImg').attr('src', e.target.result);
    // };
    // $("#projectID").select2({
    //   placeholder: "Search Project",
    //   keepOrder: true,
    //   dir: "ltl",

    // });

    // $("#BlockId").select2({
    //   placeholder: "Search Block",
    //   dir: "ltl"
    // });

    // $("#FloorId").select2({
    //   placeholder: "Search Floor",
    //   dir: "ltl"
    // });

    // $("#FlatId").select2({
    //   placeholder: "Search Flat",
    //   dir: "ltl"
    // });

    $(function () {
      $('#myImg').on('click', function () {

        var img = document.getElementById('myImg');
        // alert(img.getAttribute('src')); // foo.jpg
        $('.imagepreview').attr('src', img.getAttribute('src'));
        $('#imagemodal').modal('show');

      });

      $("#imgfile").change(function () {
        image_controller = '';
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


      function imageIsLoaded(e) {
        this.imgsrcId = e.target.result;
        //alert(e.target.result);
        $('#myImg').attr('src', e.target.result);
        image_controller = e.target.result;

      };
      $('#projectID').change(function (e) {
        var selected = $(e.target).val();
        console.log("projectIds :" + selected);
      });
      $('#BlockId').change(function (e) {
        var selected = $(e.target).val();
        console.log("blockIds :" + selected);
      });
      $('#FloorId').change(function (e) {
        var selected = $(e.target).val();
        console.log("floorIds :" + selected);
      });

      $('#FlatId').change(function (e) {
        var selected = $(e.target).val();
        console.log("flatIds :" + selected);
      });
    });


  }


  myimage(fileurl) {
    window.open(fileurl, '_system', 'location=yes,closebuttoncaption=Fechar,enableViewportScale=yes');
  }
  homeClick() {
    this.cmn.commonHomeNavigation();
  }

  notification_list() {
    this.router.navigate(['view-project-notifications-for-approvals']);

  }

  getDetails() {
    $('.page-loader-wrapper').show();

    let url = this.cmn.commonUrl + "notification/viewProjectNotificationDetailChanges.spring";
    //http://localhost:8181/SumadhuraGateway/employeeservice/notification/viewProjectNotificationDetailChanges.spring
    console.log("url :" + url);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "id": this.notificationIdd,
      "notificationType": "Project"


    }
    console.log("----body :" + JSON.stringify(body));
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      console.log("Project pending approval view response----------" + JSON.stringify(resp));
      if (resp.responseCode == 200) {

        imageename = resp.responseObjList.notificationRequests[0].imgLoc;
        this.imageLocation = resp.responseObjList.notificationRequests[0].imgLoc;
        ostyPe = resp.responseObjList.notificationRequests[0].osType;
        filename = resp.responseObjList.notificationRequests[0].linkFileLoc;
        if (imageename == "" || imageename == null) {
          $(".image-area").hide();
        } else {
          var gDrivePath = imageename.split('//')[1].split('/')[0];
          if (gDrivePath == 'drive.google.com') {
            $("#myImg").hide();
            $('#driveImg').show();
            $("#imagefilee").val(imageename);
          } else {
            $('#driveImg').hide();
            var imageename1 = resp.responseObjList.notificationRequests[0].imgLoc.split(/[\\/]/).pop();
            $('#myImg').attr('src', imageename);
            $('#imagefilee').val(imageename1);

           
          }


           image_controller = imageename;

        }

        if (filename == "" || filename == null) {
          $("#hidefile").hide()
        } else {

          var gDrivePath = resp.responseObjList.notificationRequests[0].linkFileLoc.split('/')[4];
          if (gDrivePath == 'sumadhura_projects_images') {
            this.filename_forview = resp.responseObjList.notificationRequests[0].linkFileLoc
            var filename1 = resp.responseObjList.notificationRequests[0].linkFileLoc.split(/[\\/]/).pop();
            var pos = filename1.lastIndexOf(".");       // get last position of `.`
            if (filename1 === "" || pos < 1)            // if file name is empty or ...
              return "";                             //  `.` not found (-1) or comes first (0)
            this.fileExtension = filename1.slice(pos + 1);
            $('#filee').val(filename1);
          } else {
            this.linkFileLoc = resp.responseObjList.notificationRequests[0].linkFileLoc;
            this.fileExtension = 'gDriveFile';
            $("#filee").val(this.linkFileLoc);


          }

        }





        //     this.toDataURL(resp.responseObjList.notificationRequests[0].imgLoc.location, function (dataUrl) {
        //       console.log("convert http url to base64 for image: "+dataUrl)
        //    existingimagebase64 = dataUrl;

        //   })

        //   this.toDataURL(resp.responseObjList.notificationRequests[0].linkFileLoc, function (dataUrl) {
        //     console.log("convert http url to base64 for file: "+dataUrl)
        // existingfilebase64 = dataUrl;

        //})

        $("#notificationtext_id").val(resp.responseObjList.notificationRequests[0].notificationText);
        //$("#textarea2").val(resp.responseObjList.notificationRequests[0].description);

        // CKEDITOR.instances['ckeditor'].setData(resp.responseObjList.notificationRequests[0].description);

        this.textdisc = resp.responseObjList.notificationRequests[0].description;
        this.startdate = resp.responseObjList.notificationDetailChangesResonse[0].startDate;
        this.enddate = resp.responseObjList.notificationDetailChangesResonse[0].endDate;
        if (resp.responseObjList.notificationDetailChangesResonse[0].siteList == null) {

        }
        $("#title_id").val(resp.responseObjList.notificationRequests[0].message);
        if (resp.responseObjList.notificationDetailChangesResonse[0].siteList == null) {

        } else {
          for (var i = 0; i < resp.responseObjList.notificationDetailChangesResonse[0].siteList.length; i++) {
            this.siteNames.push(resp.responseObjList.notificationDetailChangesResonse[0].siteList[i].name)
            this.siteids.push(resp.responseObjList.notificationDetailChangesResonse[0].siteList[i].id)
          }
          $("#projectID").val(this.siteNames);
        }

        if (resp.responseObjList.notificationDetailChangesResonse[0].blockList == null) {

        } else {
          for (var i = 0; i < resp.responseObjList.notificationDetailChangesResonse[0].blockList.length; i++) {
            this.blockListnames.push(resp.responseObjList.notificationDetailChangesResonse[0].blockList[i].name)
            this.blockids.push(resp.responseObjList.notificationDetailChangesResonse[0].blockList[i].id)
          }
          $("#BlockId").val(this.blockListnames);
        }

        if (resp.responseObjList.notificationDetailChangesResonse[0].floorList == null) {

        } else {
          for (var i = 0; i < resp.responseObjList.notificationDetailChangesResonse[0].floorList.length; i++) {
            this.floorListnames.push(resp.responseObjList.notificationDetailChangesResonse[0].floorList[i].name)
            this.floorids.push(resp.responseObjList.notificationDetailChangesResonse[0].floorList[i].id)
          }
          $("#FloorId").val(this.floorListnames);
        }

        if (resp.responseObjList.notificationDetailChangesResonse[0].flatList == null) {
          this.datesrelatedflatesstatus = true;
        } else {
          this.datesrelatedflatesstatus = false;
          for (var i = 0; i < resp.responseObjList.notificationDetailChangesResonse[0].flatList.length; i++) {
            this.flatListnames.push(resp.responseObjList.notificationDetailChangesResonse[0].flatList[i].name)
            this.flatids.push(resp.responseObjList.notificationDetailChangesResonse[0].flatList[i].id)
          }
          $("#FlatId").val(this.flatListnames);
        }

        if (resp.responseObjList.notificationDetailChangesResonse[0].sbuaList == null) {

        } else {
          for (var i = 0; i < resp.responseObjList.notificationDetailChangesResonse[0].sbuaList.length; i++) {
            this.sbuaListnames.push(resp.responseObjList.notificationDetailChangesResonse[0].sbuaList[i])
          }
          $("#sbuaID").val(this.sbuaListnames);
        }


        if (resp.responseObjList.notificationDetailChangesResonse[0].facingList == null) {

        } else {
          for (var i = 0; i < resp.responseObjList.notificationDetailChangesResonse[0].facingList.length; i++) {
            this.facingListnames.push(resp.responseObjList.notificationDetailChangesResonse[0].facingList[i])
          }
          $("#facingId").val(this.facingListnames);
        }


        if (resp.responseObjList.notificationDetailChangesResonse[0].bhkTypeList == null) {

        } else {
          for (var i = 0; i < resp.responseObjList.notificationDetailChangesResonse[0].bhkTypeList.length; i++) {
            this.bhkTypeListnames.push(resp.responseObjList.notificationDetailChangesResonse[0].bhkTypeList[i])
          }
          $("#typeId").val(this.bhkTypeListnames);
        }


        if (resp.responseObjList.notificationDetailChangesResonse[0].flatSeriesList == null) {

        } else {
          for (var i = 0; i < resp.responseObjList.notificationDetailChangesResonse[0].flatSeriesList.length; i++) {
            this.flatSeriesListnames.push(resp.responseObjList.notificationDetailChangesResonse[0].flatSeriesList[i])
          }
          $("#seriesId").val(this.flatSeriesListnames);
        }



        //alert(resp.responseObjList.notificationRequests[0].message)
        this.forModelpopupclick('')

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
        //  var error=JSON.parse(error._body).responseCode;
        //alert(error);
        $('.page-loader-wrapper').hide();
        // if(error == 440){
        //   swal("Your Session has been Timed Out!", "Please login once again.", "error");
        //   this.router.navigate([""]);
        // }
      }
    );
  }

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
    // window.open(this.base64_array_object_data1,"_blank","hidden=no,location=no,clearsessioncache=yes,clearcache=yes,hardwareback=no");
    console.log("----Delete file----")
    $("#filee").val(null);
    $("#myfilebinding").hide();
    this.file_name_array1 = [];
    this.base64_array_object_data1 = [];
    this.File_Info1 = [];
    console.log("file name length :" + this.file_name_array1.length);
    console.log("file base64 length :" + this.base64_array_object_data1.length);
  }


  Approve_modify_submit(actionid) {


    //alert(actionid)
    if ($("#title_id").val() == "") {
      swal("Please enter title");
      return false;
    }


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

    //  console.log(this.ckeditorVal);

    var notification_id = $("#notificationtext_id").val();

    if (notification_id == "" && this.textdisc == "" && this.File_Info == "") {
      swal("Please enter Notification text (or) Notification decription (or) upload notification image");
      return false;
    }

    // if($("#coments").val() == ""){
    //   swal("Please enter comments");
    //   return false;
    // }
    if ($("#deviceID").val() == "All") {
      this.ostype_val = "All";
    } else {
      this.ostype_val = $("#deviceID").val();
    }


    if (this.file_name_array == "") {
      existingimgeurl = imageename;
      // this.File_Info.push(
      //         {
      //           "id": 0,
      //           "name": imageename,
      //           "base64": "" + existingimagebase64
      //         }
      //       )
    } else {
      this.File_Info.push({
        "id": 0,
        "name": "" + this.file_name_array[0],
        "base64": "" + this.base64_array_object_data[0]
      });
    }

    if (this.file_name_array1 == "") {
      // this.File_Info1.push(
      //   {
      //     "id": 0,
      //     "name": filename,
      //     "base64": existingfilebase64
      //   })
      existingfileurl = filename;
    } else {
      this.File_Info1.push({
        "id": 0,
        "name": "" + this.file_name_array1,
        "base64": "" + this.base64_array_object_data1
      });
    }

    if ($('#driveImageLinkField').val() != '') {
      existingimgeurl = $('#driveImageLinkField').val().trim();
    } else {

    }

    if ($('#driveFileLinkField').val() != '') {
      existingfileurl = $('#driveFileLinkField').val().trim();
    } else {

    }

    $('.page-loader-wrapper').show();

    let url = this.cmn.commonUrl + "notification/approveOrRejectProjectNotifications.spring";
    //http://localhost:8181/SumadhuraGateway/employeeservice/notification/approveOrRejectProjectNotifications.spring
    console.log("url :" + url);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {

      "message": $("#title_id").val(),
      "description": this.textdisc,
      "siteIds": this.siteids,
      "blockIds": this.blockids,
      "floorIds": this.floorids,
      "flatIds": this.flatids,
      "flatSeriesList": this.flatSeriesListnames,
      "sbuaList": this.sbuaListnames,
      "facingList": this.facingListnames,
      "bhkTypeList": this.bhkTypeListnames,
      // "fileInfos":[{"id":0,"name":"Tax_Percentage_Mapping_Data.png","base64":"iVBORw0KGgoAAAANSUhEUgAAB4AAAAQ4CAYAAADo08FDAAAAAXNSR0IArs"}],
      //  "linkFiles":[{"id":0,"name":"dummy.pdf","base64":"IF0KPj4Kc3RhcnR4cmVmCjEyNzg3CiUlRU9GCg=="}],
      "fileInfos": this.File_Info,
      "linkFiles": this.File_Info1,
      "imgLoc": existingimgeurl,
      "linkFileLoc": existingfileurl,
      "notificationText": $("#notificationtext_id").val(),
      "osType": ostyPe,//this.ostype_val,
      "sessionKey": sessionStorage.getItem("login_sessionkey"),
      "action": actionid,
      "id": this.notificationIdd,
      "comments": $("#coments").val(),
      //   "startDate": this.temp_fromDate,
      //   "endDate": this.temp_toDate,
      //   "selectedFlatIds":this.selected_flat,
      // "flatCount":  this.fltsCount,
      //"requestUrl":this.tempRequesturl



    }





    console.log("----body :" + JSON.stringify(body));

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      console.log("Project pending modify and approval response----------" + JSON.stringify(resp));
      if (resp.responseCode == 200) {
        swal(resp.description);
        this.router.navigate(["/view-project-notifications-for-approvals"]);
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
        //  var error=JSON.parse(error._body).responseCode;
        //alert(error);
        $('.page-loader-wrapper').hide();
        // if(error == 440){
        //   swal("Your Session has been Timed Out!", "Please login once again.", "error");
        //   this.router.navigate([""]);
        // }
      }
    );

  }


  Rejectsubmit() {

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

    //   console.log(this.ckeditorVal);

    if ($("#title_id").val() == "") {
      swal("Please enter title");
      return false;
    }

    var notification_id = $("#notificationtext_id").val();

    if (notification_id == "" && this.File_Info.length == 0 && this.textdisc == "") {
      swal("Please enter Notification text (or) Notification decription (or) upload notification image");
      return false;
    }

    // if($("#coments").val() == ""){
    //   swal("Please enter comments");
    //   return false;
    // }
    if ($("#deviceID").val() == "All") {
      this.ostype_val = "All";
    } else {
      this.ostype_val = $("#deviceID").val();
    }


    if (this.file_name_array == "") {
      existingimgeurl = imageename;
      // this.File_Info.push(
      //         {
      //           "id": 0,
      //           "name": imageename,
      //           "base64": "" + existingimagebase64
      //         }
      //       )
    } else {
      this.File_Info.push({
        "id": 0,
        "name": "" + this.file_name_array[0],
        "base64": "" + this.base64_array_object_data[0]
      });
      existingimgeurl = "";
    }

    if (this.file_name_array1 == "") {
      // this.File_Info1.push(
      //   {
      //     "id": 0,
      //     "name": filename,
      //     "base64": existingfilebase64
      //   })
      existingfileurl = filename;
    } else {
      this.File_Info1.push({
        "id": 0,
        "name": "" + this.file_name_array1,
        "base64": "" + this.base64_array_object_data1
      });
      existingfileurl = "";
    }

    if ($('#driveImageLinkField').val() != '') {
      existingimgeurl = $('#driveImageLinkField').val().trim();
    } else {

    }

    if ($('#driveFileLinkField').val() != '') {
      existingfileurl = $('#driveFileLinkField').val().trim();
    } else {

    }

    $('.page-loader-wrapper').show();

    let url = this.cmn.commonUrl + "notification/approveOrRejectProjectNotifications.spring";
    //http://localhost:8181/SumadhuraGateway/employeeservice/notification/approveOrRejectProjectNotifications.spring
    console.log("url :" + url);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {

      "message": $("#title_id").val(),
      "description": this.textdisc,
      "siteIds": this.siteids,
      "blockIds": this.blockids,
      "floorIds": this.floorids,
      "flatIds": this.flatids,
      "flatSeriesList": this.flatSeriesListnames,
      "sbuaList": this.sbuaListnames,
      "facingList": this.facingListnames,
      "bhkTypeList": this.bhkTypeListnames,
      // "fileInfos":[{"id":0,"name":"Tax_Percentage_Mapping_Data.png","base64":"iVBORw0KGgoAAAANSUhEUgAAB4AAAAQ4CAYAAADo08FDAAAAAXNSR0IArs"}],
      //  "linkFiles":[{"id":0,"name":"dummy.pdf","base64":"IF0KPj4Kc3RhcnR4cmVmCjEyNzg3CiUlRU9GCg=="}],
      "fileInfos": this.File_Info,
      "linkFiles": this.File_Info1,
      "imgLoc": existingimgeurl,
      "linkFileLoc": existingfileurl,
      "notificationText": $("#notificationtext_id").val(),
      "osType": ostyPe,//this.ostype_val,
      "sessionKey": sessionStorage.getItem("login_sessionkey"),
      "action": "REJECTED",
      "id": this.notificationIdd,
      "comments": $("#coments").val()



    }
    console.log("----body :" + JSON.stringify(body));
    //return false;
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      console.log("Project pending modify and approval response----------" + JSON.stringify(resp));
      if (resp.responseCode == 200) {
        swal(resp.description);
        this.router.navigate(["/view-project-notifications-for-approvals"]);
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
        //  var error=JSON.parse(error._body).responseCode;
        //alert(error);
        $('.page-loader-wrapper').hide();
        // if(error == 440){
        //   swal("Your Session has been Timed Out!", "Please login once again.", "error");
        //   this.router.navigate([""]);
        // }
      }
    );
  }
  toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }

  forModelpopupclick(text) {

    // if($('#fromDate').val() == ""){
    // this.temp_fromDate = null
    // }else{
    //   this.temp_fromDate = $('#fromDate').val()
    // }

    // if($('#toDate').val() == ""){
    //   this.temp_toDate = null
    // }else{
    //   this.temp_toDate = $('#toDate').val()
    // }
    // $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "notification/getFlatsByDates.spring";
    //http://localhost:9999/SumadhuraGateway/employeeservice/notification/getFlatsByDates.spring
    console.log("url :" + url);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    var body = {

      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "startDate": this.startdate,
      "endDate": this.enddate,
      "siteIds": this.siteids,
      //  "blockIds":selected_blockId
    }
    console.log("----count body :" + JSON.stringify(body));
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      console.log("Flates list based on click event response----------" + JSON.stringify(resp));
      if (resp.responseCode == 200) {
        this.selected_flat = []
        this.fltsList = resp.responseObjList;
        //  alert(JSON.stringify(this.fltsList))
        for (var i = 0; i < resp.responseObjList.length; i++) {
          this.selected_flat.push(resp.responseObjList[i].flatId);
        }

        this.fltsCount = this.selected_flat.length;
        if (this.fltsCount == 0) {
          if (text != "") {
            swal("No flats available")
          }

          $("#flatsmodelId").modal('hide');
        } else {
          if (text != "") {
            $("#flatsmodelId").modal('show');
          }

        }

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

  onChange(event, checked, item) {
    // this.temp = event.target.id.split("tablerowdata")[1];
    console.log(item);

    if (checked) {
      this.selected_flat.push(item.flatId);

      this.fltsCount = this.selected_flat.length;

    } else {


      this.selected_flat.splice(this.selected_flat.indexOf(item.flatId), 1)
      this.fltsCount = this.selected_flat.length;
    }
    console.log(this.selected_flat)
  }
  Previewfun(content3) {
    if ($("#title_id").val() == "") {
      swal("Please enter title");
      return false;
    }

    var notification_id = $("#notificationtext_id").val();


    var notification_title = $("#title_id").val();
    var discription = $("#ckeditor").val();

    if (notification_id == "" && this.textdisc == "" && this.File_Info == "") {
      swal("Please enter Notification text (or) Notification decription (or) upload notification image");
      return false;
    }

    if ($("#deviceID").val() == "All") {
      this.ostype_val = "All";
    } else {
      this.ostype_val = $("#deviceID").val();
    }


    if (this.file_name_array == "") {
      existingimgeurl = imageename;
    } else {
      this.File_Info.push({
        "id": 0,
        "name": "" + this.file_name_array[0],
        "base64": "" + this.base64_array_object_data[0]
      });
    }

    if (this.file_name_array1 == "") {
      existingfileurl = filename;
    } else {
      this.File_Info1.push({
        "id": 0,
        "name": "" + this.file_name_array1,
        "base64": "" + this.base64_array_object_data1
      });
    }

    if ($('#driveImageLinkField').val() != '') {
      existingimgeurl = $('#driveImageLinkField').val().trim();
    } else {

    }

    if ($('#driveFileLinkField').val() != '') {
      existingfileurl = $('#driveFileLinkField').val().trim();
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



