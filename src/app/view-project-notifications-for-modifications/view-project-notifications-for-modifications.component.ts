import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { RequestOptions, Headers, Http } from '@angular/http';
import { Router } from '@angular/router';

import { PageEvent } from '@angular/material';
declare const Chart: any;
declare const CKEDITOR: any;
declare const tinymce: any;


import { debug } from 'util';
declare const $: any;
declare const swal: any
var file_second;
var file;
var imageename;
var filename
var existingimagebase64;
var existingfilebase64;
var existingimgeurl = "";
var existingfileurl = "";
var self = this;
var self_block = this;
var self_floor = this;
var selected_projectid;
var selected_blockId;
var selected_floor;
var selected_series;
var selected_sbua;
var selected_facing;
var selected_type;
var ostyPe;
var json_totalticketresponse;
var json_response;
var selected;
@Component({
  selector: 'app-view-project-notifications-for-modifications',
  templateUrl: './view-project-notifications-for-modifications.component.html',
  styleUrls: ['./view-project-notifications-for-modifications.component.sass']
})
export class ViewProjectNotificationsForModificationsComponent implements OnInit {

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
  flts_Count_valid: any = 0

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
  imageLocation: any;
  linkFileLoc: any;

  startdate: any;
  enddate: any;
  ckeditorError: string = "Please enter message";
  ckeditorErrorLengthExceed: string = "Characters length should not exceed 4000";
  ckeditorVal: any;
  fltsCount1: number = 0;
  selected_flat1: any[];
  fltsList1: any;
  datesrelatedflatesstatus1: boolean = true;

  fltsCount: number = 0;
  selected_flat: any[];
  fltsList: any;
  datesrelatedflatesstatus: boolean = true;
  temp_fromDate: any = null;
  temp_toDate: any = null;
  tempRequesturl: string;
  tickettotaldetailsresponse: any;
  currentpageindex: string;
  pageIndex: number = 0;
  ticketdetailsresponse: any;
  constructor(private cmn: CommonComponent, private http: Http, private router: Router,) {
    $('.page-loader-wrapper').hide();
   
    //     json_totalticketresponse = eval('(' + sessionStorage.getItem('Totalticketdata') + ')');
    //     this.tickettotaldetailsresponse = json_totalticketresponse;
    //     this.currentpageindex = sessionStorage.getItem("currentpageindex");

    //     json_response = eval('(' + sessionStorage.getItem('ticketdetails_view') + ')');
    //     this.ticketdetailsresponse = json_response;
    //     this.json_response = eval('('+sessionStorage.getItem('response')+')');

    //      this.notificationIdd = this.json_response.notificationId;
    // //alert(this.tickettotaldetailsresponse.length)
    //     for (var i = 0; i < this.tickettotaldetailsresponse.length; i++) {
    //       //alert(this.tickettotaldetailsresponse[i].notificationId)
    //     //  alert(this.notificationIdd)
    //       if (this.tickettotaldetailsresponse[i].notificationId ==  this.notificationIdd) {
    //         this.pageIndex = i;
    //       }
    //     }
    var nValFromSession = sessionStorage.getItem("nval");
    setTimeout(function () {
      if (nValFromSession == "4") {
        window.location.reload();
        sessionStorage.setItem("nval", "5");
      } else {

      }
    });

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
    if (file_second >= 10240) {
      $("#files").val(null);
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

    if (file >= 1024) {
      $("#imgfile").val(null);
      $(function(){
        $(".image-area").css("display","none");
      })
      swal("Image size is more than 1MB. Please select below 1MB image.");
      //$('#imageLinkField').show();
      $('#driveImg').hide();
      $('#myImg').hide();
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

  ngOnInit() {

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


    this.isLoaded = true;
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

    $(function () {

      $('#myImg').on('click', function () {

        var img = document.getElementById('myImg');
        // alert(img.getAttribute('src')); // foo.jpg
        $('.imagepreview').attr('src', img.getAttribute('src'));
        $('#imagemodal').modal('show');

      });

      $("#imgfile").change(function () {
        debugger;
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

    });

    function imageIsLoaded(e) {
      this.imgsrcId = e.target.result;
      //alert(e.target.result);
      $('#myImg').attr('src', e.target.result);
    };

    var self = this;
    var self_f = this
    var self_floor = this;
    var self_block = this;
    $(function () {

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
        debugger;
        selected_floor = $(e.target).val();
        if(selected_floor == "" && selected ==""&& selected_series =="" && selected_sbua =="" && selected_facing ==""&& selected_type ==""){

          //  alert("flatIds :" + selected);
          self_f.datesrelatedflatesstatus = true
          $("#datesrelatedflatesstatus").show()
        } else {
          //  alert("flatIds :" + selected);
          $("#datesrelatedflatesstatus").hide()
          $("#fromDate").val('')
          $("#toDate").val('')
          self.selected_flat = []
          self.fltsCount = 0
          self_f.datesrelatedflatesstatus = false;
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
        // if(selected_floor == "" && selected ==""&& selected_series =="" && selected_sbua =="" && selected_facing ==""&& selected_type ==""){
        //   self_f.datesrelatedflatesstatus = true
        //  }else{
        //   self_f.datesrelatedflatesstatus = false;
        // this.selected = [];
        //  }

        // $("#projectID option[value]").remove();
        // $("#BlockId option[value]").remove();
        // $("#FloorId option[value]").remove();

        if(selected_floor == "" && selected ==""&& selected_series =="" && selected_sbua =="" && selected_facing ==""&& selected_type ==""){

          //  alert("flatIds :" + selected);
          self_f.datesrelatedflatesstatus = true
          $("#datesrelatedflatesstatus").show()
        } else {
          //  alert("flatIds :" + selected);
          $("#datesrelatedflatesstatus").hide()
          $("#fromDate").val('')
          $("#toDate").val('')
          self.selected_flat = []
          self.fltsCount = 0
          self_f.datesrelatedflatesstatus = false;
          this.selected = [];
        }
       });
      //Second row drop downs

      $('#seriesId').change(function (e) {
        selected_series = $(e.target).val();
        if(selected_floor == "" && selected ==""&& selected_series =="" && selected_sbua =="" && selected_facing ==""&& selected_type ==""){

          //  alert("flatIds :" + selected);
          self_f.datesrelatedflatesstatus = true
          $("#datesrelatedflatesstatus").show()
        } else {
          //  alert("flatIds :" + selected);
          $("#datesrelatedflatesstatus").hide()
          $("#fromDate").val('')
          $("#toDate").val('')
          self.selected_flat = []
          self.fltsCount = 0
          self_f.datesrelatedflatesstatus = false;
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
        if(selected_floor == "" && selected ==""&& selected_series =="" && selected_sbua =="" && selected_facing ==""&& selected_type ==""){

          //  alert("flatIds :" + selected);
          self_f.datesrelatedflatesstatus = true
          $("#datesrelatedflatesstatus").show()
        } else {
          //  alert("flatIds :" + selected);
          $("#datesrelatedflatesstatus").hide()
          $("#fromDate").val('')
          $("#toDate").val('')
          self.selected_flat = []
          self.fltsCount = 0
          self_f.datesrelatedflatesstatus = false;
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
        if(selected_floor == "" && selected ==""&& selected_series =="" && selected_sbua =="" && selected_facing ==""&& selected_type ==""){

          //  alert("flatIds :" + selected);
          self_f.datesrelatedflatesstatus = true
          $("#datesrelatedflatesstatus").show()
        } else {
          //  alert("flatIds :" + selected);
          $("#datesrelatedflatesstatus").hide()
          $("#fromDate").val('')
          $("#toDate").val('')
          self.selected_flat = []
          self.fltsCount = 0
          self_f.datesrelatedflatesstatus = false;
          this.selected = [];
        }



        console.log("selected_facing ids :" + selected_facing);
        if (selected_sbua == "") {

        } else {
          self_floor.BhktypeOnChangeFun();
          self_floor.Falt_OnChangeFun();

        }




      //   $('#projectID').change(function (e) {
      //     var selected = $(e.target).val();
      //     console.log("projectIds :" + selected);
      //   });
      //   $('#BlockId').change(function (e) {
      //     var selected = $(e.target).val();
      //     console.log("blockIds :" + selected);
      //   });
      //   $('#FloorId').change(function (e) {
      //     var selected = $(e.target).val();
      //     console.log("floorIds :" + selected);
      //     if(selected_floor == "" && selected ==""&& selected_series =="" && selected_sbua =="" && selected_facing ==""&& selected_type ==""){
      //       self.datesrelatedflatesstatus = true
      //      }else{
      //         self.datesrelatedflatesstatus = false;
      //     this.selected = [];
      //      }
      //   });

        // $('#FlatId').change(function (e) {
        //   selected = $(e.target).val();
        //   console.log("flatIds :" + selected);
        //   if(selected_floor == "" && selected ==""&& selected_series =="" && selected_sbua =="" && selected_facing ==""&& selected_type ==""){
        //     self.datesrelatedflatesstatus = true
        //    }else{
        //       self.datesrelatedflatesstatus = false;
        //   this.selected = [];
        //    }
        // });

      });

      
      $('#typeId').change(function (e) {
        selected_type = $(e.target).val();

        if(selected_floor == "" && selected ==""&& selected_series =="" && selected_sbua =="" && selected_facing ==""&& selected_type ==""){

          //  alert("flatIds :" + selected);
          self_f.datesrelatedflatesstatus = true
          $("#datesrelatedflatesstatus").show()
        } else {
          //  alert("flatIds :" + selected);
          $("#datesrelatedflatesstatus").hide()
          $("#fromDate").val('')
          $("#toDate").val('')
          self.selected_flat = []
          self.fltsCount = 0
          self_f.datesrelatedflatesstatus = false;
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


  myimage(fileurl) {
    window.open(fileurl, '_system', 'location=yes,closebuttoncaption=Fechar,enableViewportScale=yes');
  }
  homeClick() {
    this.cmn.commonHomeNavigation();
  }

  notification_list() {
    this.router.navigate(['view-project-notifications-for-modifications']);

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
          $(".image-area").hide()
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

        }

        if (filename == "" || filename == null) {

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
        this.startdate = resp.responseObjList.notificationDetailChangesResonse[0].startDate;
        this.enddate = resp.responseObjList.notificationDetailChangesResonse[0].endDate;

        // $("#textarea2").val(resp.responseObjList.notificationRequests[0].description);

        CKEDITOR.instances['ckeditor'].setData(resp.responseObjList.notificationRequests[0].description);

        $("#title_id").val(resp.responseObjList.notificationRequests[0].message);
        if (resp.responseObjList.notificationDetailChangesResonse[0].siteList == null) {

        } else {
          this.siteNames = [];
          this.blockListnames = [];
          this.floorListnames = [];
          this.flatListnames = [];
          this.sbuaListnames = [];
          this.facingListnames = [];
          this.bhkTypeListnames = [];
          this.flatSeriesListnames = [];
          this.siteids = [];
          this.blockids = [];
          this.floorids = [];
          this.flatids = [];
          for (var i = 0; i < resp.responseObjList.notificationDetailChangesResonse[0].siteList.length; i++) {
            this.siteNames.push(resp.responseObjList.notificationDetailChangesResonse[0].siteList[i].name)
            this.siteids.push(resp.responseObjList.notificationDetailChangesResonse[0].siteList[i].id)
          }
          $("#projectID1").val(this.siteNames);
        }

        if (resp.responseObjList.notificationDetailChangesResonse[0].blockList == null) {

        } else {
          for (var i = 0; i < resp.responseObjList.notificationDetailChangesResonse[0].blockList.length; i++) {
            this.blockListnames.push(resp.responseObjList.notificationDetailChangesResonse[0].blockList[i].name)
            this.blockids.push(resp.responseObjList.notificationDetailChangesResonse[0].blockList[i].id)
          }
          $("#BlockId1").val(this.blockListnames);
        }

        if (resp.responseObjList.notificationDetailChangesResonse[0].floorList == null) {

        } else {
          for (var i = 0; i < resp.responseObjList.notificationDetailChangesResonse[0].floorList.length; i++) {
            this.floorListnames.push(resp.responseObjList.notificationDetailChangesResonse[0].floorList[i].name)
            this.floorids.push(resp.responseObjList.notificationDetailChangesResonse[0].floorList[i].id)
          }
          $("#FloorId1").val(this.floorListnames);
        }

        if (resp.responseObjList.notificationDetailChangesResonse[0].flatList == null) {
          this.datesrelatedflatesstatus1 = true;
        } else {
          this.datesrelatedflatesstatus1 = false;
          for (var i = 0; i < resp.responseObjList.notificationDetailChangesResonse[0].flatList.length; i++) {
            this.flatListnames.push(resp.responseObjList.notificationDetailChangesResonse[0].flatList[i].name)
            this.flatids.push(resp.responseObjList.notificationDetailChangesResonse[0].flatList[i].id)
          }
          $("#FlatId1").val(this.flatListnames);
        }

        if (resp.responseObjList.notificationDetailChangesResonse[0].sbuaList == null) {

        } else {
          for (var i = 0; i < resp.responseObjList.notificationDetailChangesResonse[0].sbuaList.length; i++) {
            this.sbuaListnames.push(resp.responseObjList.notificationDetailChangesResonse[0].sbuaList[i])
          }
          $("#sbuaID1").val(this.sbuaListnames);
        }


        if (resp.responseObjList.notificationDetailChangesResonse[0].facingList == null) {

        } else {
          for (var i = 0; i < resp.responseObjList.notificationDetailChangesResonse[0].facingList.length; i++) {
            this.facingListnames.push(resp.responseObjList.notificationDetailChangesResonse[0].facingList[i])
          }
          $("#facingId1").val(this.facingListnames);
        }


        if (resp.responseObjList.notificationDetailChangesResonse[0].bhkTypeList == null) {

        } else {
          for (var i = 0; i < resp.responseObjList.notificationDetailChangesResonse[0].bhkTypeList.length; i++) {
            this.bhkTypeListnames.push(resp.responseObjList.notificationDetailChangesResonse[0].bhkTypeList[i])
          }
          $("#typeId1").val(this.bhkTypeListnames);
        }


        if (resp.responseObjList.notificationDetailChangesResonse[0].flatSeriesList == null) {

        } else {
          for (var i = 0; i < resp.responseObjList.notificationDetailChangesResonse[0].flatSeriesList.length; i++) {
            this.flatSeriesListnames.push(resp.responseObjList.notificationDetailChangesResonse[0].flatSeriesList[i])
          }
          $("#seriesId1").val(this.flatSeriesListnames);
        }
        this.forModelpopupclick1('')

        //alert(resp.responseObjList.notificationRequests[0].imgLoc)

        this.siteList();
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


  modify_submit() {
    //alert(actionid)

    // alert($('#fromDate').val())
    if ($('#fromDate').val() == "" || $('#fromDate').val() == undefined) {
      this.temp_fromDate = null
    } else {
      this.temp_fromDate = $('#fromDate').val()
    }

    if ($('#toDate').val() == "" || $('#toDate').val() == undefined) {
      this.temp_toDate = null
    } else {
      this.temp_toDate = $('#toDate').val()
    }
    if ($("#seriesId").val() == "" && $("#SBUAId").val() == "" && $("#FacingId").val() == "" && $("#typeId").val() == "" && $("#projectID").val() == "select" && $("#BlockId").val() == "" && $("#FloorId").val() == "" && $("#FlatId").val() == "") {
      swal("Please select atleast one project (or) Block (or) Floor (or) Series (or) SBUA (or) Facing (or) Type (or) Flat");
      return false;
    }

    if ($("#projectID").val() == "select") {
      swal("Please select Project");
      return false;
    }
    if ($("#title_id").val() == "") {
      swal("Please enter title");
      return false;
    }

    this.ckeditorVal = CKEDITOR.instances["ckeditor"].getData();
    if (this.ckeditorVal.length > 3980) {
      alert("Character limit exceeded, it should be less than 3625 characters");
      return false;
    }
    // if (this.ckeditorVal == "") {
    //   $("#ckeditorError").show();
    //   $("#CKEditiorDiv").addClass("borderforerror");
    //   return false;
    // }

    console.log(this.ckeditorVal);


    var notification_id = $("#notificationtext_id").val();

    if (notification_id == "" && this.File_Info.length == 0 && this.ckeditorVal == "") {
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
    if (this.fltsCount == 0) {
      this.tempRequesturl = "";
    } else {
      if (this.temp_fromDate == null || this.temp_toDate == null) {
        this.tempRequesturl = "";
      } else {
        this.tempRequesturl = "validateCount";
      }

    }

    // alert(this.flts_Count_valid)
    // alert(this.selected_flat.length)
    if (this.flts_Count_valid == this.selected_flat.length) {
      this.selected_flat = []
    }
    if($("#toDate").val() != '' && $("#fromDate").val() == ''){
      swal("Please select from date")
      return false;
      
    }
  
    if($("#toDate").val() == '' && $("#fromDate").val() != '' ){
      swal("Please select to date")
      return false;
      
    }
    if((this.temp_fromDate != null && this.temp_toDate != null) && this.fltsCount ==0){
      swal("Please select minimum one flat against the booking dates")
      $("#toDate").val("");
      $("#fromDate").val("");
      return false;
      
    }
    $('.page-loader-wrapper').show();

    let url = this.cmn.commonUrl + "notification/sendProjectNotificationsForApprovals.spring";
    //http://localhost:8181/SumadhuraGateway/employeeservice/notification/sendProjectNotificationsForApprovals.spring
    console.log("url :" + url);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {

      "message": $("#title_id").val(),
      "description": this.ckeditorVal,
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
      "imgLoc": existingimgeurl,
      "linkFileLoc": existingfileurl,
      "notificationText": $("#notificationtext_id").val(),
      "osType": ostyPe, //this.ostype_val,
      "sessionKey": sessionStorage.getItem("login_sessionkey"),
      "action": "Modified_For_Approvals",
      "id": this.notificationIdd,
      "comments": $("#coments").val(),
      "startDate": this.temp_fromDate,
      "endDate": this.temp_toDate,
      "selectedFlatIds": this.selected_flat,
      "flatCount": this.fltsCount,
      "requestUrl": this.tempRequesturl



    }

    console.log(body);


    console.log("----body :" + JSON.stringify(body));
    // return false;
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      console.log("Project pending modification response----------" + JSON.stringify(resp));
      if (resp.responseCode == 200) {
        swal(resp.description);
        //  location.reload();
        this.router.navigate(["/view-project-notifications-for-modifications"]);
      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
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

        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#projectID').append("<option value='" + resp.responseObjList[i].id + "'>" + resp.responseObjList[i].name + "</option>");
          //	$('#projectID').formSelect();
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
  /*------------------------series Functionality Start--------------------*/
  SeriesOnChangeFun() {

    let url = this.cmn.commonUrl + "notificationdropdown/seriesbysiteblockfloor.spring";


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
    console.log(body);

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

      console.log(resp);

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

    console.log(url);
    console.log(body);

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      console.log(resp);

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
        //swal(resp.status);
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
  forModelpopupclick1(text) {

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
        this.selected_flat1 = []
        this.fltsList1 = resp.responseObjList;
        //  alert(JSON.stringify(this.fltsList))
        //  for(var i=0;i<resp.responseObjList.length;i++){
        //   this.selected_flat.push(resp.responseObjList[i].flatId);
        //  }

        this.fltsCount1 = this.selected_flat1.length;
        // alert(this.fltsCount1)
        if (this.fltsCount1 == 0) {
          // swal("No flats available")+

          $("#flatsmodelId").modal('hide');
        } else {
          if (text != '') {
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

  forModelpopupclick_count() {
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

  getServerData(event) {
    $("#projectID1").html('');
    $("#BlockId1").html('');
    $("#FloorId1").html('');
    $("#FlatId1").html('');
    $("#sbuaID1").html('');
    $("#facingId1").html('');
    $("#typeId1").html('');
    $("#seriesId1").html('');

    debugger;
    console.log(event.pageIndex);
    console.log(this.tickettotaldetailsresponse[event.pageIndex]);

    var json_response;
    var json_totalticketresponse;
    json_response = this.tickettotaldetailsresponse[event.pageIndex];

    this.ticketdetailsresponse = json_response;

    json_totalticketresponse = eval('(' + sessionStorage.getItem('Totalticketdata') + ')');

    console.log(json_response);
    console.log(json_totalticketresponse);
    this.tickettotaldetailsresponse = json_totalticketresponse;
    // for (var i = 0; i < this.tickettotaldetailsresponse.length; i++) {
    //   if (this.tickettotaldetailsresponse[i].ticketId == this.ticketdetailsresponse.ticketId) {
    //     this.pageIndex = i;
    //   }
    // }
    for (var i = 0; i < this.tickettotaldetailsresponse.length; i++) {
      //   alert(this.tickettotaldetailsresponse[i].notificationId)
      //  alert(json_response.notificationId)
      if (this.tickettotaldetailsresponse[i].notificationId == json_response.notificationId) {
        this.pageIndex = i;
      }
    }
    this.notificationIdd = json_response.notificationId;
    // alert(this.ticketdetailsresponse)
    this.getDetails();


  }

 
}
