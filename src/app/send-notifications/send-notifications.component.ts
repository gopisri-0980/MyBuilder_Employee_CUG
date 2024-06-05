import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { RequestOptions, Headers, Http } from '@angular/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PageEvent } from '@angular/material';
import { ValidatorFn } from '@angular/forms';
declare const Chart: any;
declare const CKEDITOR: any;
declare const tinymce: any;

declare const swal: any;
var file_second;
var file;
var fromDate;
var toDate;
var selected
declare const $: any;
var selected_projectid;
var selected_blockId;
var selected_floor;
var selected_series;
var selected_sbua;
var selected_facing;
var selected_type;
var image_controller;

@Component({
  selector: 'app-send-notifications',
  templateUrl: './send-notifications.component.html',
  styleUrls: ['./send-notifications.component.sass']
})
export class SendNotificationsComponent implements OnInit {
  [x: string]: any;
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
  datesrelatedflatesstatus: boolean = true;
  ckeditorError: string = "Please enter message";
  ckeditorErrorLengthExceed: string = "Characters length should not exceed 4000";
  ckeditorVal: any;
  finlaflatlist: any
  fg: any;
  fltsCount: any = 0;
  flts_Count_valid: any = 0
  fltsList: any;
  temp_fromDate: any = null;
  temp_toDate: any = null;
  selected_flat: any = []
  tempRequesturl: any;
  count: any = 0;
  main_notification_id: any;
  constructor(private cmn: CommonComponent, private http: Http, private router: Router , private modalService: NgbModal,) {
    $('.page-loader-wrapper').hide();
   // this.siteList_temp()

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
    $('#driveFileLinkField').val("")
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
    if (file_second >= 10240) {
      $("#files").val(null);
      $(".remove-image2").hide();
      swal("File size is more than 10MB. Please enter the google drive file link in the text box.");
      //$('#fileLinkField').show();
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


    var files = evt.target.files;
    var file_val = evt.target.value;
    //alert("------------"+files);
    console.log(evt.target.value);

    const fsize = files.item(i).size;
    file = Math.round((fsize / 1024));
    var extension = file_val.substring(file_val.lastIndexOf('.')+1);
    // alert(extension)
     if(extension == "png" || extension == "jpg" || extension == "jpeg"){
 
     }else{
       $("#imgfile").val(null);
       swal("Sorry, Please upload only .jpg, .png, .jpeg formats which are accepted.");
       return false;
     }
    if (file >= 1024) {
      $("#imgfile").val(null);
      $("#myImg").val(null);
      $(function(){
        $(".image-area").css("display","none");
      })
      $("#imagefilee").val(null);
      swal("Image size is more than 1MB. Please select below 1MB image.");
      // $('#imageLinkField').show();
      $('.image-area').hide();
      this.file_name_array = [];
      this.base64_array_object_data = [];
      return false;
    } else {
      $(function(){
        $(".image-area").css("display","block");
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


  ngAfterViewInit() {
    this.siteList();
  }
  ngOnInit(): void {


    'use strict';
    $("#ckeditorError").hide();
    var self_ = this;
    $(function () {


      $('#fromDate').change(function () {
        var startdate = $('#fromDate').val();
        var endDate = $('#toDate').val();
        if (new Date(startdate) > new Date(endDate)) {
          swal('To Date should be greater than or equal to From Date');
          return false;
        }
        if ($("#projectID").val() == "select") {
          swal("Please select Project");
          $('#fromDate').val('')
          return false;
        }
        self_.count = 0
        self_.forModelpopupclick_count();
      });

      $('#toDate').change(function () {
        var startdate = $('#fromDate').val();
        var endDate = $('#toDate').val();
        if (new Date(startdate) > new Date(endDate)) {
          swal('To Date should be greater than or equal to From Date');
          return false;
        }
        if ($("#projectID").val() == "select") {
          swal("Please select Project");
          $('#toDate').val('')
          return false;
        }
        self_.count = 0
        self_.forModelpopupclick_count();
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


    var self = this;
    var self_block = this;
    var self_floor = this;
    this.isLoaded = true;

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

          // alert("File too Big, please select a file less than 10mb"); 
          return false;
        } else {
          $("#myImg").show();
          $(".image-area").show();
          if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = imageIsLoaded;
            reader.readAsDataURL(this.files[0]);
          }
        }

      });

    });
    function imageIsLoaded(e) {
      this.imgsrcId = e.target.result;
      //alert(e.target.result);
      $('#myImg').attr('src', e.target.result);
      image_controller = e.target.result;
    };
    $("#projectID").select2({
      placeholder: "Search Project",
      dir: "ltl",

    });

    $("#deviceID").select2({
      placeholder: "Search Device",
      dir: "ltl"
    });

    // $("#projectID").select2().maximizeSelect2Height({
    //   cushion: 50 // Must be a numerical pixel value.
    // });

    $("#BlockId").select2({
      placeholder: "Search Block",
      dir: "ltl"
    });

    $("#FloorId").select2({
      placeholder: "Search Floor",
      dir: "ltl"
    });

    $("#FlatId").select2({
      placeholder: "Search Flat",
      dir: "ltl"
    });
    // Second row dropdowns
    $("#seriesId").select2({
      placeholder: "Search Series",
      dir: "ltl"
    });

    $("#SBUAId").select2({
      placeholder: "Search SBUA",
      dir: "ltl"
    });

    $("#FacingId").select2({
      placeholder: "Search Facing",
      dir: "ltl"
    });

    $("#typeId").select2({
      placeholder: "Search Type",
      dir: "ltl"
    });


    $(function () {

      $('#projectID').change(function (e) {
        selected_projectid = $(e.target).val();


        if ($("#projectID").val() == "select") {

        } else {
          if (selected_projectid.length < 1) {
            $("#BlockId").attr("disabled", false);
            $("#FloorId").attr("disabled", false);
            $("#FlatId").attr("disabled", false);
            $("#seriesId").attr("disabled", false);
            $("#SBUAId").attr("disabled", false);
            $("#FacingId").attr("disabled", false);
            $("#typeId").attr("disabled", false);

            $("#FlatId option[value]").remove();
            $("#BlockId option[value]").remove();
            $("#FloorId option[value]").remove();
            $("#seriesId option[value]").remove();
            $("#seriesId option[value]").remove();
            $("#FacingId option[value]").remove();
            $("#typeId option[value]").remove();

            return false;
          } else {
            $("#BlockId").attr("disabled", false);
            $("#FloorId").attr("disabled", false);
            $("#FlatId").attr("disabled", false);

            $("#seriesId").attr("disabled", false);
            $("#SBUAId").attr("disabled", false);
            $("#FacingId").attr("disabled", false);
            $("#typeId").attr("disabled", false);
          }
        }

        // this.projectSelectedIds = $(e.target).val();
        if (selected_projectid == "") {

        } else {
          self.projectchangeFun([selected_projectid]);
          self.floorlist_bysite([selected_projectid]);
          //  self.flatlist_bysite([selected_projectid])
          self_floor.SeriesOnChangeFun();
          self_floor.SBUAOnChangeFun();
          self_floor.FacingOnChangeFun();
          self_floor.BhktypeOnChangeFun();
          self_floor.Falt_OnChangeFun();
        }

        console.log("projectIds :" + selected_projectid);
      });
      $('#BlockId').change(function (e) {
        selected_blockId = $(e.target).val();
        $("#FlatId option[value]").remove();
        $("#FloorId option[value]").remove();


        console.log("blockIds :" + selected_blockId);
        if (selected_blockId == "") {

        } else {
          self_block.BlockChangeFun(selected_blockId);
          self_block.floorlist_byblock(selected_blockId);
          self_block.SeriesOnChangeFun();
          self_floor.SBUAOnChangeFun();
          self_floor.FacingOnChangeFun();
          self_floor.BhktypeOnChangeFun();
          self_floor.Falt_OnChangeFun();
        }

      })
      $('#FloorId').change(function (e) {

        selected_floor = $(e.target).val();

        if (selected_floor == "" && selected == "" && selected_series == "" && selected_sbua == "" && selected_facing == "" && selected_type == "") {
          self.datesrelatedflatesstatus = true
        } else {
          self.datesrelatedflatesstatus = false;
          this.selected = [];
        }

        $("#FlatId option[value]").remove();
        //$("#FlatId").attr("disabled", true); 
        // if(selected.length<1){
        //   $("#FlatId option[value]").remove();
        //   // $("#FlatId").attr("disabled", true);  
        //   return false;
        // }else{
        //   // $("#FlatId").attr("disabled", false);
        // }
        console.log("floorIds :" + selected_floor);
        if (selected_floor == "") {

        } else {
          self_floor.FloorOnChangeFun(selected_floor);
          self_floor.SeriesOnChangeFun();
          self_floor.SBUAOnChangeFun();
          self_floor.FacingOnChangeFun();
          self_floor.BhktypeOnChangeFun();
          self_floor.Falt_OnChangeFun();
        }

      });

      $('#FlatId').change(function (e) {
        selected = $(e.target).val();
        // $("#projectID option[value]").remove();
        // $("#BlockId option[value]").remove();
        // $("#FloorId option[value]").remove();
        console.log("flatIds :" + selected);

        if (selected_floor == "" && selected == "" && selected_series == "" && selected_sbua == "" && selected_facing == "" && selected_type == "") {
          self.datesrelatedflatesstatus = true
        } else {
          self.datesrelatedflatesstatus = false;
          this.selected = [];
        }

      });
      //Second row drop downs

      $('#seriesId').change(function (e) {
        selected_series = $(e.target).val();
        if (selected_floor == "" && selected == "" && selected_series == "" && selected_sbua == "" && selected_facing == "" && selected_type == "") {
          self.datesrelatedflatesstatus = true
        } else {
          self.datesrelatedflatesstatus = false;
          this.selected = [];
        }

        console.log("selected_series ids :" + selected_series);
        if (selected_series == "") {

        } else {
          // self_floor.SeriesOnChangeFun();

          self_floor.SBUAOnChangeFun();
          self_floor.FacingOnChangeFun();
          self_floor.BhktypeOnChangeFun();
          self_floor.Falt_OnChangeFun();
        }
      });

      $('#SBUAId').change(function (e) {
        selected_sbua = $(e.target).val();
        if (selected_floor == "" && selected == "" && selected_series == "" && selected_sbua == "" && selected_facing == "" && selected_type == "") {
          self.datesrelatedflatesstatus = true
        } else {
          self.datesrelatedflatesstatus = false;
          this.selected = [];
        }


        console.log("sbua ids :" + selected_sbua);
        if (selected_sbua == "") {

        } else {
          self_floor.FacingOnChangeFun();
          self_floor.BhktypeOnChangeFun();
          self_floor.Falt_OnChangeFun();

        }
      });

      $('#FacingId').change(function (e) {
        selected_facing = $(e.target).val();
        if (selected_floor == "" && selected == "" && selected_series == "" && selected_sbua == "" && selected_facing == "" && selected_type == "") {
          self.datesrelatedflatesstatus = true
        } else {
          self.datesrelatedflatesstatus = false;
          this.selected = [];
        }



        console.log("selected_facing ids :" + selected_facing);
        if (selected_sbua == "") {

        } else {
          self_floor.BhktypeOnChangeFun();
          self_floor.Falt_OnChangeFun();

        }

      });


      $('#typeId').change(function (e) {
        selected_type = $(e.target).val();

        if (selected_floor == "" && selected == "" && selected_series == "" && selected_sbua == "" && selected_facing == "" && selected_type == "") {
          self.datesrelatedflatesstatus = true
        } else {
          self.datesrelatedflatesstatus = false;
          this.selected = [];
        }



        console.log("selected_type ids :" + selected_type);
        if (selected_type == "") {

        } else {
          self_floor.Falt_OnChangeFun();

        }
      });

    });

  }

  // showDriveImageField(){
  //   $('#driveIconDiv').hide();
  //   $('#imageLinkField').show();
  // }

  // showDriveFileField(){
  //   $('#driveIconFileDiv').hide();
  //   $('#fileLinkField').show();
  // }

  filesubmit() {

    //alert($("#FlatId").val())
    // alert(this.selected_flat)

    //     if($("#FlatId").val() == undefined){
    //       this.finlaflatlist = this.selected_flat
    //     }else{
    //       this.finlaflatlist = $("#FlatId").val()
    //     }

    // console.log(this.finlaflatlist)


    if ($("#seriesId").val() == "" && $("#SBUAId").val() == "" && $("#FacingId").val() == "" && $("#typeId").val() == "" && $("#projectID").val() == "select" && $("#BlockId").val() == "" && $("#FloorId").val() == "" && $("#FlatId").val() == "") {
      swal("Please select atleast one project (or) Block (or) Floor (or) Series (or) SBUA (or) Facing (or) Type (or) Flat");
      return false;
    }

    if ($("#projectID").val() == "select") {
      swal("Please select Project");
      return false;
    }

    if ($("#deviceID").val() == "select") {
      swal("Please select device");
      return false;
    }

    if ($("#title_id").val() == "") {
      swal("Please enter title");
      return false;
    }



    this.ckeditorVal = CKEDITOR.instances["ckeditor"].getData();
    if (this.ckeditorVal.length > 3980) {
      alert("Character limit exceeded, it should be less than 3980 characters");
      return false;
    }


    console.log(this.ckeditorVal);

    var notification_id = $("#notification_id").val();

    if (notification_id == "" && this.File_Info.length == 0 && this.ckeditorVal == "") {
      swal("Please enter Notification text (or) Notification decription (or) upload notification image");
      return false;
    }

    // if( $("#files").val() == "" && $("#driveFileLinkField").val() == ""){
    //   swal("Please select pdf file (OR) Enter google drive path(If pdf size is more than 25 mb)");
    //   return false;
    // }
    console.log(this.base64_array_object_data.length + "---" + this.file_name_array.length);
    for (var i = 0; i < this.base64_array_object_data.length; i++) {
      this.File_Info.push({
        "id": 0,
        "name": "" + this.file_name_array,
        "base64": "" + this.base64_array_object_data
      });
    }

    /*-------------------FileInfo Start------------------------*/
    console.log(this.base64_array_object_data1.length + "---" + this.file_name_array1.length);
    for (var i = 0; i < this.base64_array_object_data1.length; i++) {
      this.File_Info1.push({
        "id": 0,
        "name": "" + this.file_name_array1,
        "base64": "" + this.base64_array_object_data1
      });
    }
    console.log("-------------" + JSON.stringify(this.File_Info));

    if ($('#driveFileLinkField').val() != "") {
      this.File_Info1 = null;
    }

    if ($("#deviceID").val() == "All") {
      this.ostype_val = "All";
    } else {
      this.ostype_val = $("#deviceID").val();
    }
    // alert(this.flts_Count_valid)
    //  alert(this.selected_flat.length)
    if (this.flts_Count_valid == this.selected_flat.length) {
      this.selected_flat = []
    }
    //  alert(this.temp_fromDate)
    //  alert(this.temp_toDate)
    //  alert(this.fltsCount)
    if ($("#toDate").val() != '' && $("#fromDate").val() == '') {
      swal("Please select from date")
      return false;

    }

    if ($("#toDate").val() == '' && $("#fromDate").val() != '') {
      swal("Please select to date")
      return false;

    }

    //return false;
    if ((this.temp_fromDate != null && this.temp_toDate != null) && this.fltsCount == 0) {
      swal("Please select minimum one flat against the booking dates")
      $("#toDate").val("");
      $("#fromDate").val("");
      return false;

    }

    $('.page-loader-wrapper').show();

    let url = this.cmn.commonUrl + "notification/sendProjectNotificationsForApprovals.spring"
    console.log("url :" + url);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    if (this.fltsCount == 0) {
      this.tempRequesturl = "";
    } else {
      if (this.temp_fromDate == null || this.temp_toDate == null) {
        this.tempRequesturl = "";
      } else {
        this.tempRequesturl = "validateCount";
      }

    }
    var body = {
      "message": $("#title_id").val(),
      "description": "" + this.ckeditorVal,
      "siteIds": [$("#projectID").val()],
      "blockIds": $("#BlockId").val(),
      "floorIds": $("#FloorId").val(),
      "flatIds": $("#FlatId").val(),
      "flatSeriesList": $("#seriesId").val(),
      "sbuaList": $("#SBUAId").val(),
      "facingList": $("#FacingId").val(),
      "bhkTypeList": $("#typeId").val(),
      "fileInfos": this.File_Info,
      "linkFiles": this.File_Info1,
      "notificationText": $("#notification_id").val(),
      "osType": this.ostype_val,
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "action": "For_Approvals",
      "imgLoc": $('#driveImageLinkField').val().trim(), //"img/loca/external/drive/image",
      "linkFileLoc": $('#driveFileLinkField').val().trim(), //"link/file/loc/external/drive/file"
      "startDate": this.temp_fromDate,
      "endDate": this.temp_toDate,
      "selectedFlatIds": this.selected_flat,
      "flatCount": this.fltsCount,
      "requestUrl": this.tempRequesturl


    }

    console.log(body);

    console.log("----body :" + JSON.stringify(body));
    //return false;


    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      console.log(JSON.stringify(resp));
      $('.page-loader-wrapper').hide();

      //return false;
      if (resp.responseCode == 200) {
        $('#fileLinkField').hide();
        $('#imageLinkField').hide();
        //swal("Good job!", "Notification send successfully", "success");
        location.reload();
        swal("Notification sent for approval successfully !!");
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

  /*-----------------Getting Project(site) list Start---------------------*/
  siteList() {
    let url = this.cmn.commonUrl + "site/site.spring";
    // http://106.51.38.64:9999/employeeservice/site/site.spring
    console.log("url :" + url);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),

    }
    console.log("body :" + JSON.stringify(body))
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      //$('.page-loader-wrapper').hide();
      console.log("Site list response----------" + JSON.stringify(resp));
      if (resp.responseCode == 200) {
        var Options = "";
        // $('#projectID').formSelect();
        $('#projectID').html("");
        $('#projectID').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#projectID').append("<option value='" + resp.responseObjList[i].id + "'>" + resp.responseObjList[i].name + "</option>");
          //	$('#projectID').formSelect();
        }
      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        // alert(resp.status);
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
  /*-----------------Getting Project(site) list End---------------------*/

  /*------------------------Projects On Change Functionality Start--------------------*/
  projectchangeFun(value) {

    let url = this.cmn.commonUrl + "block/blocks.spring";
    // hhttp://106.51.38.64:9999/employeeservice/block/blocks.spring
    console.log("url :" + url);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "ids": value
    }

    console.log("----body :" + JSON.stringify(body));
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

      //$('.page-loader-wrapper').hide();
      console.log("Block list response----------" + JSON.stringify(resp));
      if (resp.responseCode == 200) {
        var Options = "";
        $('#BlockId').html("");
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#BlockId').append("<option value='" + resp.responseObjList[i].detId + "'>" + resp.responseObjList[i].name + "</option>");
          //$('#BlockId').formSelect();
        }
      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
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


  floorlist_bysite(value) {
    let url = this.cmn.commonUrl + "floor/floorSite.spring";
    // http://localhost:8080/employeeservice/floor/floorSite.spring
    console.log("url :" + url);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "ids": value
    }
    console.log("----body :" + JSON.stringify(body));
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      //$('.page-loader-wrapper').hide();
      console.log("Floor list response by site----------" + JSON.stringify(resp));
      if (resp.responseCode == 200) {
        var Options = "";
        $('#FloorId').html("");
        for (var i = 0; i < resp.responseObjList.length; i++) {

          $('#FloorId').append("<option value='" + resp.responseObjList[i].detId + "'>" + resp.responseObjList[i].name + "</option>");
          // $('#FloorId').formSelect();
        }
      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
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

  flatlist_bysite(value) {
    let url = this.cmn.commonUrl + "flat/flatSite.spring";
    // http://localhost:8080/employeeservice/flat/flatSite.spring
    console.log("url :" + url);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "ids": value
    }
    console.log("----body :" + JSON.stringify(body));
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      //$('.page-loader-wrapper').hide();
      console.log("Flat list response by site----------" + JSON.stringify(resp));
      if (resp.responseCode == 200) {
        var Options = "";
        $('#FlatId').html("");
        for (var i = 0; i < resp.responseObjList.length; i++) {

          $('#FlatId').append("<option value='" + resp.responseObjList[i].id + "'>" + resp.responseObjList[i].name + "</option>");
          // $('#FlatId').formSelect();
        }
      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
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
  /*------------------------Projects On Change Functionality End--------------------*/

  /*------------------------Blocks On Change Functionality Start--------------------*/
  BlockChangeFun(value) {
    //alert("test");
    let url = this.cmn.commonUrl + "floor/floor.spring";
    // http://localhost:8080/employeeservice/floor/floor.spring
    console.log("url :" + url);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "ids": value
    }

    console.log("----body :" + JSON.stringify(body));
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      //$('.page-loader-wrapper').hide();
      console.log("Floor list response----------" + JSON.stringify(resp));
      if (resp.responseCode == 200) {
        var Options = "";
        $('#FloorId').html("");
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#FloorId').append("<option value='" + resp.responseObjList[i].detId + "'>" + resp.responseObjList[i].name + "</option>");
          // $('#FloorId').formSelect();
        }
      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        // alert(resp.status);
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

  floorlist_byblock(value) {
    let url = this.cmn.commonUrl + "flat/flatBlock.spring";
    // http://localhost:8080/employeeservice/flat/flatBlock.spring
    console.log("url :" + url);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "ids": value
    }
    console.log("----body :" + JSON.stringify(body));
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      //$('.page-loader-wrapper').hide();
      console.log("Flat list by block response----------" + JSON.stringify(resp));
      var Options = "";
      $('#FlatId').html("");
      if (resp.responseCode == 200) {

        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#FlatId').append("<option value='" + resp.responseObjList[i].id + "'>" + resp.responseObjList[i].name + "</option>");
          // $('#FlatId').formSelect();
        }
      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        // alert(resp.status);
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
  /*------------------------Floor On Change Functionality Start--------------------*/
  FloorOnChangeFun(value) {
    //alert("test");
    let url = this.cmn.commonUrl + "flat/flat.spring";
    //http://localhost:8080/employeeservice/flat/flat.spring
    console.log("url :" + url);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "ids": value
    }
    console.log("----body :" + JSON.stringify(body));
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      //$('.page-loader-wrapper').hide();
      console.log("Flat list response----------" + JSON.stringify(resp));
      if (resp.responseCode == 200) {
        var Options = "";
        // $.each(resp.responseObjList,function(i,val){
        //   $('#FlatId').append("<option value='" + val.responseObjList.id + "'>" + val.responseObjList.name + "</option>");
        //  // $('#FlatId').formSelect();
        // })
        $('#FlatId').html("");
        for (var i = 0; i < resp.responseObjList.length; i++) {
          //$('#FlatId').append("<option value='" + resp.responseObjList[i].id + "'>" + resp.responseObjList[i].name + "</option>");
          // $('#FlatId').formSelect();
          $('#FlatId').append("<option value='" + resp.responseObjList[i].id + "'>" + resp.responseObjList[i].name + "</option>");
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
  /*------------------------Floor On Change Functionality End--------------------*/

  delete_image() {
    console.log("----Delete image----")
    $("#imgfile").val(null);
    $("#imagefilee").val(null);
    $(".image-area").hide();
    image_controller = '';
    this.file_name_array = [];
    this.base64_array_object_data = [];
    this.File_Info = [];
    console.log("file name length :" + this.file_name_array.length);
    console.log("file base64 length :" + this.base64_array_object_data.length);

  }

  delete_file() {
    // window.open(this.base64_array_object_data1,"_blank","hidden=no,location=no,clearsessioncache=yes,clearcache=yes,hardwareback=no");
    console.log("----Delete file----")
    $("#filee").val(null);
    $("#myfilebinding").hide();
    $('#driveFileLinkField').val("");
    this.file_name_array1 = [];
    this.base64_array_object_data1 = [];
    this.File_Info1 = [];
    console.log("file name length :" + this.file_name_array1.length);
    console.log("file base64 length :" + this.base64_array_object_data1.length);
  }


  /*------------------------series Functionality Start--------------------*/
  SeriesOnChangeFun() {
    //alert("test");
    let url = this.cmn.commonUrl + "notificationdropdown/seriesbysiteblockfloor.spring";
    //http://localhost:8080/employeeservice/flat/flat.spring
    console.log("url :" + url);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    if (selected_blockId == null) {
      selected_blockId = [];
    } else {
      selected_blockId = selected_blockId;
    }

    if (selected_floor == null) {
      selected_floor = [];
    } else {
      selected_floor = selected_floor;
    }

    var body = {

      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteIds": [selected_projectid],
      "blockDetIds": selected_blockId,
      "floorDetIds": selected_floor


    }
    console.log("----series body :" + JSON.stringify(body));
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      //$('.page-loader-wrapper').hide();
      console.log("Series list response----------" + JSON.stringify(resp));
      if (resp.responseCode == 200) {
        var Options = "";
        // $.each(resp.responseObjList,function(i,val){
        //   $('#FlatId').append("<option value='" + val.responseObjList.id + "'>" + val.responseObjList.name + "</option>");
        //  // $('#FlatId').formSelect();
        // })
        $('#seriesId').html("");
        for (var i = 0; i < resp.responseObjList.length; i++) {
          //$('#FlatId').append("<option value='" + resp.responseObjList[i].id + "'>" + resp.responseObjList[i].name + "</option>");
          // $('#FlatId').formSelect();
          $('#seriesId').append("<option value='" + resp.responseObjList[i].flatSeries + "'>" + resp.responseObjList[i].flatSeries + "</option>");
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
  /*------------------------Series Functionality End--------------------*/


  /*------------------------SBUA Functionality Start--------------------*/
  SBUAOnChangeFun() {
    //alert("test");
    let url = this.cmn.commonUrl + "notificationdropdown/sbuabysiteblockfloor.spring";
    //http://localhost:8080/employeeservice/flat/flat.spring
    console.log("url :" + url);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    if (selected_blockId == null) {
      selected_blockId = [];
    } else {
      selected_blockId = selected_blockId;
    }

    if (selected_floor == null) {
      selected_floor = [];
    } else {
      selected_floor = selected_floor;
    }

    if (selected_series == null) {
      selected_series = [];
    } else {
      selected_series = selected_series;
    }

    var body = {

      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteIds": [selected_projectid],
      "blockDetIds": selected_blockId,
      "floorDetIds": selected_floor,
      "flatSeriesList": selected_series

    }
    console.log("----SBUA body :" + JSON.stringify(body));
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      //$('.page-loader-wrapper').hide();
      console.log("SBUA list response----------" + JSON.stringify(resp));
      if (resp.responseCode == 200) {
        var Options = "";
        // $.each(resp.responseObjList,function(i,val){
        //   $('#FlatId').append("<option value='" + val.responseObjList.id + "'>" + val.responseObjList.name + "</option>");
        //  // $('#FlatId').formSelect();
        // })
        $('#SBUAId').html("");
        for (var i = 0; i < resp.responseObjList.length; i++) {
          //$('#FlatId').append("<option value='" + resp.responseObjList[i].id + "'>" + resp.responseObjList[i].name + "</option>");
          // $('#FlatId').formSelect();
          $('#SBUAId').append("<option value='" + resp.responseObjList[i].sbua + "'>" + resp.responseObjList[i].sbua + "</option>");
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
  /*------------------------SBUA Functionality End--------------------*/


  /*------------------------Facing Functionality Start--------------------*/
  FacingOnChangeFun() {
    //alert("test");
    let url = this.cmn.commonUrl + "notificationdropdown/facingbysiteblockfloor.spring ";
    //http://localhost:8080/employeeservice/flat/flat.spring
    console.log("url :" + url);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    if (selected_blockId == null) {
      selected_blockId = [];
    } else {
      selected_blockId = selected_blockId;
    }

    if (selected_floor == null) {
      selected_floor = [];
    } else {
      selected_floor = selected_floor;
    }

    if (selected_series == null) {
      selected_series = [];
    } else {
      selected_series = selected_series;
    }

    if (selected_sbua == null) {
      selected_sbua = [];
    } else {
      selected_sbua = selected_sbua;
    }



    var body = {

      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteIds": [selected_projectid],
      "blockDetIds": selected_blockId,
      "floorDetIds": selected_floor,
      "flatSeriesList": selected_series,
      "sbuaList": selected_sbua

    }
    console.log("----Facing body :" + JSON.stringify(body));
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      //$('.page-loader-wrapper').hide();
      console.log("Facing list response----------" + JSON.stringify(resp));
      if (resp.responseCode == 200) {
        var Options = "";
        // $.each(resp.responseObjList,function(i,val){
        //   $('#FlatId').append("<option value='" + val.responseObjList.id + "'>" + val.responseObjList.name + "</option>");
        //  // $('#FlatId').formSelect();
        // })
        $('#FacingId').html("");
        for (var i = 0; i < resp.responseObjList.length; i++) {
          //$('#FlatId').append("<option value='" + resp.responseObjList[i].id + "'>" + resp.responseObjList[i].name + "</option>");
          // $('#FlatId').formSelect();
          $('#FacingId').append("<option value='" + resp.responseObjList[i].facing + "'>" + resp.responseObjList[i].facing + "</option>");
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
  /*------------------------Facing Functionality End--------------------*/


  /*------------------------BHK Type Functionality Start--------------------*/
  BhktypeOnChangeFun() {
    //alert("test");
    let url = this.cmn.commonUrl + "notificationdropdown/bhktypebysiteblockfloor.spring";
    //http://localhost:8080/employeeservice/flat/flat.spring
    console.log("url :" + url);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    if (selected_blockId == null) {
      selected_blockId = [];
    } else {
      selected_blockId = selected_blockId;
    }

    if (selected_floor == null) {
      selected_floor = [];
    } else {
      selected_floor = selected_floor;
    }

    if (selected_series == null) {
      selected_series = [];
    } else {
      selected_series = selected_series;
    }

    if (selected_sbua == null) {
      selected_sbua = [];
    } else {
      selected_sbua = selected_sbua;
    }

    if (selected_facing == null) {
      selected_facing = [];
    } else {
      selected_facing = selected_facing;
    }




    var body = {

      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteIds": [selected_projectid],
      "blockDetIds": selected_blockId,
      "floorDetIds": selected_floor,
      "flatSeriesList": selected_series,
      "sbuaList": selected_sbua,
      "facingList": selected_facing

    }
    console.log("----bhkType body :" + JSON.stringify(body));
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      //$('.page-loader-wrapper').hide();
      console.log("bhkType list response----------" + JSON.stringify(resp));
      if (resp.responseCode == 200) {
        var Options = "";

        $('#typeId').html("");
        for (var i = 0; i < resp.responseObjList.length; i++) {
          //$('#FlatId').append("<option value='" + resp.responseObjList[i].id + "'>" + resp.responseObjList[i].name + "</option>");
          // $('#FlatId').formSelect();
          $('#typeId').append("<option value='" + resp.responseObjList[i].bhkType + "'>" + resp.responseObjList[i].bhkType + "</option>");
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
  /*------------------------BHK Type Functionality End--------------------*/

  /*------------------------Falt new requirement  Functionality Start--------------------*/
  Falt_OnChangeFun() {
    //alert("test");
    let url = this.cmn.commonUrl + "flat/flatsbua.spring";
    //http://localhost:8080/employeeservice/flat/flat.spring
    console.log("url :" + url);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    if (selected_blockId == null) {
      selected_blockId = [];
    } else {
      selected_blockId = selected_blockId;
    }

    if (selected_floor == null) {
      selected_floor = [];
    } else {
      selected_floor = selected_floor;
    }

    if (selected_series == null) {
      selected_series = [];
    } else {
      selected_series = selected_series;
    }

    if (selected_sbua == null) {
      selected_sbua = [];
    } else {
      selected_sbua = selected_sbua;
    }

    if (selected_facing == null) {
      selected_facing = [];
    } else {
      selected_facing = selected_facing;
    }

    if (selected_type == null) {
      selected_type = [];
    } else {
      selected_type = selected_type;
    }




    var body = {

      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteIds": [selected_projectid],
      "blockDetIds": selected_blockId,
      "floorDetIds": selected_floor,
      "flatSeriesList": selected_series,
      "sbuaList": selected_sbua,
      "facingList": selected_facing,
      "bhkTypeList": selected_type,

    }
    console.log("----Flat body :" + JSON.stringify(body));
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      //$('.page-loader-wrapper').hide();
      console.log("Flat list response----------" + JSON.stringify(resp));
      if (resp.responseCode == 200) {
        var Options = "";

        $('#FlatId').html("");
        for (var i = 0; i < resp.responseObjList.length; i++) {
          //$('#FlatId').append("<option value='" + resp.responseObjList[i].id + "'>" + resp.responseObjList[i].name + "</option>");
          // $('#FlatId').formSelect();
          $('#FlatId').append("<option value='" + resp.responseObjList[i].id + "'>" + resp.responseObjList[i].name + "</option>");
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
  /*------------------------Falt new requirement  Functionality End--------------------*/

  homeClick() {
    this.cmn.commonHomeNavigation();
  }

  valid() {
    var url = $('#driveFileLinkField').val();
    if (url == "") {

    } else {
      $("#filee").val('');
      $("#files").val(null);
      $(".remove-image2").hide();
      this.file_name_array1 = [];
      this.base64_array_object_data1 = [];
      window.open(url, 'targetWindow', 'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=400,height=500')
      swal("Please check your file path correct or not(If it is valid please click send button Otherwise, change the file path)");

    }
    return false;
    var urlRegx = new RegExp('(docs.google.com|(http|https))(://[A-Za-z]+-my.sharepoint.com)?', 'i');
    // alert(urlRegx.test(url));
    if (urlRegx.test(url) == false) {
      $('#driveFileLinkField').val('')
      swal("Please give valid path");
      return false;
    } else {

      var http = new XMLHttpRequest();
      http.open('HEAD', url, false);
      http.send();
      // alert(http.status)
      if (http.status == 200) {
        // alert("ok")
        $("#filee").val('');
        $("#files").val(null);
        this.file_name_array1 = [];
        this.base64_array_object_data1 = [];
      } else {
        $('#driveFileLinkField').val('')
        swal("Please give valid path");
        return false;
      }
    }
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    //alert(http.status)
    if (http.status == 200) {
      // alert("ok")
      $("#filee").val('');
      $("#files").val(null);
      this.file_name_array1 = [];
      this.base64_array_object_data1 = [];
    } else {
      $('#driveFileLinkField').val()
      swal("Please give valid path");
      return false;
    }
    //   var url = $('#driveFileLinkField').val();
    // var urlRegx = new RegExp('(docs.google.com|(http|https))(://[A-Za-z]+-my.sharepoint.com)?', 'i');
    // //alert(urlRegx.test(url));
    // if(urlRegx.test(url) == false){
    // swal("Please give valid path");
    // return false;
    // }else{
    //   window.open(url)
    // }
  }

  // private dateRangeValidator: ValidatorFn = (): {
  //   [key: string]: any;
  // } | null => {
  //   let invalid = false;
  //   const from = this.fg && this.fg.get("from").value;
  //   const to = this.fg && this.fg.get("to").value;
  //   if (from && to) {
  //     invalid = new Date(from).valueOf() > new Date(to).valueOf();
  //   }
  //   return invalid ? { invalidRange: { from, to } } : null;
  // };

  getToday(): string {
    return new Date().toISOString().split('T')[0]
  }

  setDate() {
    var getmonth = new Date().getMonth();
    var temp = new Date().setMonth(getmonth - 1);
    var minDate = new Date(temp);
    var year = minDate.getFullYear();
    var month = ("0" + (minDate.getMonth() + 1)).slice(-2);
    var day = ("0" + minDate.getDate()).slice(-2);
    var minimumdate = year + '-' + month + '-' + day;
    var date2 = new Date();
    var year2 = date2.getFullYear();
    var month2 = ("0" + (date2.getMonth() + 1)).slice(-2);
    var day2 = ("0" + date2.getDate()).slice(-2);
    var maximumdate = year2 + '-' + month2 + '-' + day2;
    fromDate = minimumdate;
    toDate = maximumdate;
    console.log("fromDate :" + fromDate);
    console.log("toDate :" + toDate);
  }

  // okSubmission(){
  //   $('.page-loader-wrapper').show();
  //   let url = this.cmn.commonUrl + "notification/getFlatDetailsCountBydates.spring";
  //   //http://localhost:9999/SumadhuraGateway/employeeservice/notification/getFlatDetailsCountBydates.spring
  //   console.log("url :" + url);

  //   let headers = new Headers({ 'Content-Type': 'application/json' });
  //   let options = new RequestOptions({ headers: headers });

  //   var body = {

  //     "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
  //     "startDate": $('#fromDate').val(),
  //     "endDate": $('#toDate').val(),
  //     "siteIds": [selected_projectid],
  //     "blockIds":selected_blockId
  //   }
  //   console.log("----count body :" + JSON.stringify(body));
  //   this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
  //     $('.page-loader-wrapper').hide();
  //     console.log("count response----------" + JSON.stringify(resp));
  //     if (resp.responseCode == 200) {
  //      this.fltsCount = resp.responseObjList.flatCount;
  //     } else if (resp.responseCode == 440) {
  //       swal("Your Session has been Timed Out!", "Please login once again.", "error");
  //       this.router.navigate([""]);
  //     } else {
  //       swal(resp.status);
  //     }
  //   },
  //     error => {
  //       var error = JSON.parse(error._body).responseCode;
  //       //alert(error);
  //       $('.page-loader-wrapper').hide();
  //       if (error == 440) {
  //         swal("Your Session has been Timed Out!", "Please login once again.", "error");
  //         this.router.navigate([""]);
  //       }
  //     }
  //   );
  // }
  forModelpopupclick_count() {
    debugger;
    this.count = this.count + 1
    // alert(this.count)
    if (this.count > 1) {
      $("#flatsmodelId").modal('show');
      return false;
    }
    if ($('#fromDate').val() == "") {
      this.temp_fromDate = null
    } else {
      this.temp_fromDate = $('#fromDate').val()
    }

    if ($('#toDate').val() == "") {
      this.temp_toDate = null
    } else {
      this.temp_toDate = $('#toDate').val()
    }

    if (this.temp_fromDate == null || this.temp_toDate == null) {
      return false;
    }
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "notification/getFlatDetailsCountBydates.spring";
    //	getFlatDetailsCountBydates.spring
    console.log("url :" + url);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    var body = {

      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "startDate": this.temp_fromDate,
      "endDate": this.temp_toDate,
      "siteIds": [selected_projectid],
      "blockIds": selected_blockId
    }
    console.log("----count body :" + JSON.stringify(body));
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      //$('.page-loader-wrapper').hide();
      console.log("Flates list count response----------" + JSON.stringify(resp));
      if (resp.responseCode == 200) {
        this.fltsCount = resp.responseObjList.flatCount;
        this.selected_flat = []
        this.fltsCount = resp.responseObjList.flatCount;
        this.flts_Count_valid = resp.responseObjList.flatCount;
        //  alert(this.flts_Count_valid)
        //  for(var i=0;i<resp.responseObjList.length;i++){
        //   this.selected_flat.push(resp.responseObjList[i].flatId);
        //  }

        // this.fltsCount = this.selected_flat.length;
        if (this.fltsCount == 0) {
          $('.page-loader-wrapper').hide();
          swal("No flats available")
          // $("#flatsmodelId").modal('hide');
        } else {
          this.forModelpopupclick()
          //  $("#flatsmodelId").modal('show');
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
  forModelpopupclick() {

    if ($('#fromDate').val() == "") {
      this.temp_fromDate = null
    } else {
      this.temp_fromDate = $('#fromDate').val()
    }

    if ($('#toDate').val() == "") {
      this.temp_toDate = null
    } else {
      this.temp_toDate = $('#toDate').val()
    }
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "notification/getFlatsByDates.spring";
    //http://localhost:9999/SumadhuraGateway/employeeservice/notification/getFlatsByDates.spring
    console.log("url :" + url);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    var body = {

      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "startDate": this.temp_fromDate,
      "endDate": this.temp_toDate,
      "siteIds": [selected_projectid],
      "blockIds": selected_blockId
    }
    console.log("----count body :" + JSON.stringify(body));
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      console.log("Flates list based on click event response----------" + JSON.stringify(resp));
      if (resp.responseCode == 200) {
        this.selected_flat = []
        this.fltsList = resp.responseObjList;
        for (var i = 0; i < resp.responseObjList.length; i++) {
          this.selected_flat.push(resp.responseObjList[i].flatId);
        }

        this.fltsCount = this.selected_flat.length;
        if (this.fltsCount == 0) {
          swal("No flats available")
          $("#flatsmodelId").modal('hide');
        } else {
          $("#flatsmodelId").modal('show');
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

  // siteList_temp() {
  //   var arr = localStorage.getItem('SiteIDS');
  //   $('.page-loader-wrapper').show();
  //   let url = this.cmn.commonUrl + "site/site.spring";
  //   let headers = new Headers({ 'Content-Type': 'application/json' });
  //   let options = new RequestOptions({ headers: headers });
  //   var body = {
  //     "sessionKey": sessionStorage.getItem("login_sessionkey"),
  //     "siteIds": [107],
  //   }
  //   console.log(JSON.stringify(body))
  //   this.http.post(url, body).map(res => res.json()).subscribe(resp => {
  //     $('.page-loader-wrapper').hide();
  //     if (resp.responseCode == 200) {
  //       $('#projectID').html("");
  //       $('#projectID').append('<option value="select">--Select--</option>');
  //       for (var i = 0; i < resp.responseObjList.length; i++) {
  //         $('#projectID').append("<option value='" + resp.responseObjList[i].id + "'>" + resp.responseObjList[i].name + "</option>");
  //       }

  //     } else if (resp.responseCode == 440) {
  //       swal("Your Session has been Timed Out!", "Please login once again.", "error");
  //       this.router.navigate([""]);
  //     } else {
  //       $('.page-loader-wrapper').hide();
  //       swal(resp.errors[0]);
  //       return false;
  //     }

  //   },
  //     error => {
  //       $('.page-loader-wrapper').hide();
  //       var error = JSON.parse(error._body).responseCode;
  //       this.router.navigate([""]);
  //       if (error == 440) {
  //         swal("Your Session has been Timed Out!", "Please login once again.", "error");
  //         this.router.navigate([""]);
  //       }
  //     }
  //   );
  // }


  Previewfun(content3) {

    if ($("#seriesId").val() == "" && $("#SBUAId").val() == "" && $("#FacingId").val() == "" && $("#typeId").val() == "" && $("#projectID").val() == "select" && $("#BlockId").val() == "" && $("#FloorId").val() == "" && $("#FlatId").val() == "") {
      swal("Please select atleast one project (or) Block (or) Floor (or) Series (or) SBUA (or) Facing (or) Type (or) Flat");
      return false;
    }

    if ($("#projectID").val() == "select") {
      swal("Please select Project");
      return false;
    }

    if ($("#deviceID").val() == "select") {
      swal("Please select device");
      return false;
    }

    if ($("#title_id").val() == "") {
      swal("Please enter title");
      return false;
    }



    this.ckeditorVal = CKEDITOR.instances["ckeditor"].getData();
    if (this.ckeditorVal.length > 3980) {
      alert("Character limit exceeded, it should be less than 3980 characters");
      return false;
    }



    var notification_id = $("#notification_id").val();
    var notification_title = $("#title_id").val();
    var discription = $("#ckeditor").val();


    if (notification_id == "" && this.File_Info.length == 0 && this.ckeditorVal == "") {
      swal("Please enter Notification text (or) Notification decription (or) upload notification image");
      return false;
    }

    for (var i = 0; i < this.base64_array_object_data.length; i++) {
      this.File_Info.push({
        "id": 0,
        "name": "" + this.file_name_array,
        "base64": "" + this.base64_array_object_data
      });
    }

    /*-------------------FileInfo Start------------------------*/
    for (var i = 0; i < this.base64_array_object_data1.length; i++) {
      this.File_Info1.push({
        "id": 0,
        "name": "" + this.file_name_array1,
        "base64": "" + this.base64_array_object_data1
      });
    }
    

    if ($('#driveFileLinkField').val() != "") {
      this.File_Info1 = null;
    }

    if ($("#deviceID").val() == "All") {
      this.ostype_val = "All";
    } else {
      this.ostype_val = $("#deviceID").val();
    }
 
    if (this.flts_Count_valid == this.selected_flat.length) {
      this.selected_flat = []
    }
 
    if ($("#toDate").val() != '' && $("#fromDate").val() == '') {
      swal("Please select from date")
      return false;

    }

    if ($("#toDate").val() == '' && $("#fromDate").val() != '') {
      swal("Please select to date")
      return false;

    }


    if ((this.temp_fromDate != null && this.temp_toDate != null) && this.fltsCount == 0) {
      swal("Please select minimum one flat against the booking dates")
      $("#toDate").val("");
      $("#fromDate").val("");
      return false;

    }


    this.main_notification_title = notification_title;
    this.main_notification_id = notification_id;
    this.main_notification_dec = this.ckeditorVal;

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

