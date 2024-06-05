import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { CommonComponent } from 'src/app/common/common.component';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validator, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { PageEvent } from '@angular/material';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
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
  selector: 'app-company-notifications',
  templateUrl: './company-notifications.component.html',
  styleUrls: ['./company-notifications.component.sass']
})
export class CompanyNotificationsComponent implements OnInit {
  closeResult = '';
  file_name_array: any = [];
  file_name_array1: any = [];
  binaryString: any;
  base64textString: string;
  base64_array_object_data: any = [];
  base64_array_object_data1: any = [];
  File_Info: any = [];
  File_Info1: any = [];
  siteval: number;
  stateval: number;
  state_val: any = [];
  ostype_val: any;
  //selectedstate: any;
  Projected_wise_data: Array<any> = [];

  ckeditorError: string = "Please enter message";
  ckeditorErrorLengthExceed: string = "Characters length should not exceed 4000";
  ckeditorVal: any;
  projectVal: any;
  filename: any;
  singledd8 = {};
  project_wise_project: Array<any> = []

  title6: any;
  dateandtime: string;
  weekdayNames: string[];
  monthNames: string[];
  dateString: string;
  main_notification_id: any;
  main_notification_title: any;
  main_notification_dec: any;
  userForm: FormGroup;

  constructor(private httpClient: HttpClient, public route: ActivatedRoute, private modalService: NgbModal,
    private router: Router, private http: Http, public cmn: CommonComponent, public fb: FormBuilder,) {

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



    this.singledd8 = {
      singleSelection: false,
      enableSearchFilter: true,
      searchPlaceholderText: 'Search',
      classes: 'my_dropdown1',
      unSelectAllText: 'UnSelect All',
      // lazyLoading: true,
    };

    this.stateList();
    var selectedstate;
    $('.page-loader-wrapper').hide();
    $("select.states").change(function () {
      selectedstate = $(this).children("option:selected").val();
      // alert("You have selected the country - " + selectedstate);
    });
    var nValFromSession = sessionStorage.getItem("nval");
    setTimeout(function () {
      if (nValFromSession == "1") {
        window.location.reload();
        sessionStorage.setItem("nval", "2");
      } else {
      }
    });

  }

  truncateHTML(text: string): string {

    let charlimit = 160;
    if (!text || text.length <= charlimit) {
      return text;
    }


    let without_html = text.replace(/<(?:.|\n)*?>/gm, '');
    let shortened = without_html.substring(0, charlimit) + "...";
    return shortened;
  }


  ngAfterViewInit() {

  }

  ngOnInit() {

    this.userForm = this.fb.group({
      project_wise_form: [''],

    });


    'use strict';
    $("#ckeditorError").hide();
    $(function () {
      $("#projectID option[value]").remove();
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

    $(function () {
      $("#myfilebinding").click(function () {
        alert("test")
        $("#driveFileLinkField").val("");
      })
      $('#notificationTypeID').change(function (e) {
        var selected = $(e.target).val();
        console.log(selected);
        if (selected == "NONCUSTOMER") {
          $('#stateLabel2').show();
          $('#stateLabel').hide();
          $('#projectgrid').hide();

        } else if (selected == "All") {
          //  $('#projectgrid').hide();
          $('#projectgrid').show();
          $('#stateLabel').show();
          $('#stateLabel2').hide();
        } else {
          $('#projectgrid').show();
          $('#stateLabel').show();
          $('#stateLabel2').hide();
        }
      });


      $('#myImg').on('click', function () {
        // alert( this.imgsrcId);
        var img = document.getElementById('myImg');
        // alert(img.getAttribute('src')); // foo.jpg
        $('.imagepreview').attr('src', img.getAttribute('src'));
        $('#imagemodal').modal('show');
      });



      $("#imgfile").change(function () {

        image_controller = '';
        if (file >= 10240) {
          $("#imagefilee").val(null);

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

      $("#filee").change(function () {

        if (file_second >= 10240) {

          $("#filee").val(null);

          $("#myfilebinding").hide();
          $("#image-myfilebinding").hide();
          // alert("File too Big, please select a file less than 10mb"); 
          return false;
        } else {
          $("#image-myfilebinding").show();

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
      console.log(e.target.result);
      $('#myImg').attr('src', e.target.result);
      image_controller = e.target.result;
    };

    $("#notificationTypeID").select2({
      placeholder: "Select Type",
      dir: "ltl"
    });
    $("#stateID").select2({
      placeholder: "Select State",
      dir: "ltl"
    });
    var self = this;
    var sitval;
    $('#stateID').change(function (e) {



      sitval = $(e.target).val();
      console.log(sitval)
      $('#projectID').val("")
      $('#projectID').select2().trigger('change');
      this.Projected_wise_data = [];
      if ($("#stateID").val() == "select") {

      } else {





        self.projectList(sitval);



      }

    });
    $("#projectID").select2({
      placeholder: "Select Project",
      dir: "ltl"
    });


    $("#deviceID").select2({
      placeholder: "Search Device",
      dir: "ltl"
    });
    $(function () {
      //Textare auto growth
      autosize($('textarea.auto-growth'));
      //	initMultiSelect();
      //Multi-select
      $('#optgroup').multiSelect({ selectableOptgroup: true });
    });


  }



  selectedSIDs(item: any) {
    this.Projected_wise_data = [];
    for (var i = 0; i < this.title6.length; i++) {
      this.Projected_wise_data.push(this.title6[i].id);
      console.log(this.Projected_wise_data);
    }
  }

  onSelectAll(item: any) {
    this.Projected_wise_data = [];
    for (var i = 0; i < this.title6.length; i++) {
      this.Projected_wise_data.push(this.title6[i].id);
      console.log(this.Projected_wise_data);
    }
  }

  onItemDeSelect(item: any) {
    this.Projected_wise_data = [];
    for (var i = 0; i < this.title6.length; i++) {
      this.Projected_wise_data.push(this.title6[i].id);
      console.log(this.Projected_wise_data);
    }
  }




  onDeSelectAll(item: any) {
    this.Projected_wise_data = [];

  }


  handle_FileSelect(evt) {
    $("#myfilebinding").show();
    $('#driveFileLinkField').val("");
    this.file_name_array1 = [];
    this.base64_array_object_data1 = [];
    this.File_Info1 = [];

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
    this.base64_array_object_data1 = [];
    this.binaryString = readerEvt.target.result;

    this.base64textString = btoa(this.binaryString);
    this.base64_array_object_data1.push(btoa(this.binaryString));


    console.log(this.binaryString);
    console.log(this.base64_array_object_data1);

  }


  handleFileSelect(evt) {


    var files = evt.target.files;
    var file_val = evt.target.value;
    //alert("------------"+files);
    console.log(evt.target.value);

    const fsize = files.item(i).size;
    file = Math.round((fsize / 1024));

    if (file >= 10240) {
      $("#imgfile").val(null);
      $("#imagefilee").val(null);
      swal("Image size is more than 10MB. Please select below 10MB image.");
      // $('#imageLinkField').show();
      $('.image-area').hide();
      this.file_name_array = [];
      this.base64_array_object_data = [];
      return false;

    } else {
      $('#imageLinkField').hide();

      for (var i = 0; i < files.length; i++) {
        // The size of the file. 
        var temp = evt.target.files[i].name;
        this.filename = evt.target.files[i].name;
        //  this.file_name_array.push(temp);

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
    this.base64_array_object_data = [];
    this.binaryString = readerEvt.target.result;
    console.log(this.binaryString);
    this.base64textString = btoa(this.binaryString);
    this.base64_array_object_data.push(btoa(this.binaryString));
    console.log(this.base64textString);
    console.log(JSON.stringify(this.base64_array_object_data));
  }
  /*--------------------------Final submission of company notification start------------------*/
  filesubmit() {

    console.log(this.Projected_wise_data);

    if ($("#notificationTypeID").val() == "select") {
      swal("Please select Notification Type");
      return false;
    }

    var stateval = $("#stateID").val();

    if (stateval == "select" || stateval == "" || stateval == undefined || stateval == "undefined") {
      swal("Please select state");
      return false;
    }

    if ($("#notificationTypeID").val() == "All") {

    } else if ($("#notificationTypeID").val() == "NONCUSTOMER") {

    } else {

      if (this.Projected_wise_data.length == 0) {
        swal('Please select projects');
        return false;
      }


      // var projectval = $("#projectID").val();

      // if (projectval == "select" || projectval == "" || projectval == undefined || projectval == "undefined") {
      //   swal("Please select projects");
      //   return false;
      // }
    }


    if ($("#deviceID").val() == "select") {
      swal("Please select device");
      return false;
    }

    this.File_Info = [];
    for (var i = 0; i < this.base64_array_object_data.length; i++) {
      this.File_Info.push({
        "id": "" + i,
        "name": "" + this.filename,
        "base64": "" + this.base64_array_object_data
      });
    }

    console.log(this.File_Info);

    if (stateval[0] == 0) {
      this.state_val = null;
    } else {
      this.state_val = [];
      this.state_val.push($("#stateID").val());
    }



    var title = $("#title_id").val();
    if (title == "" || title == "undefined" || title == undefined) {
      swal("Please enter title");
      return false;
    }


    this.ckeditorVal = CKEDITOR.instances["ckeditor"].getData();
    if (this.ckeditorVal.length > 3980) {
      alert("Character limit exceeded, it should be less than 3625 characters");
      return false;
    }




    var notification_id = $("#notification_id").val();
    var discription = $("#textarea2").val();
    if (notification_id == "" && this.ckeditorVal == "" && this.File_Info.length == 0) {
      swal("Please enter Notification text (or) Notification decription (or) upload notification image");
      return false;
    }

    var discription = $("#textarea2").val();
    this.File_Info1 = [];
    for (var i = 0; i < this.base64_array_object_data1.length; i++) {
      this.File_Info1.push({
        "id": "" + i,
        "name": "" + this.file_name_array1,
        "base64": "" + this.base64_array_object_data1
      });
    }

    console.log(this.File_Info1);


    if ($("#deviceID").val() == "All") {
      this.ostype_val = "All";
    } else {
      this.ostype_val = $("#deviceID").val();
    }

    if ($("#notificationTypeID").val() == "All") {
      this.projectVal = []
    } else if ($("#notificationTypeID").val() == "NONCUSTOMER") {
      this.projectVal = []
    } else {
      this.projectVal = this.Projected_wise_data;
    }

    console.log(this.projectVal);



    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "notification/sendCompanyNotificationsForApprovals.spring";

    var body = {
      "message": "" + $("#title_id").val(),
      "description": "" + this.ckeditorVal,
      "types": [$("#notificationTypeID").val()],
      "stateIds": this.state_val,
      "fileInfos": this.File_Info,
      "linkFiles": this.File_Info1,
      "imgLoc": $('#driveImageLinkField').val().trim(),
      "linkFileLoc": $('#driveFileLinkField').val().trim(),
      "notificationText": $("#notification_id").val(),
      "osType": this.ostype_val,
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteIds": this.projectVal,
      "action": "For_Approvals"

    }

    console.log(url);
    console.log(JSON.stringify(body));





    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 200) {
        $('#fileLinkField').hide();
        $('#imageLinkField').hide();
        swal("Notification sent for approval successfully !!");
        //location.reload();
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
  /*--------------------------Final submission of company notification end------------------*/
  stateList() {

    let url = this.cmn.commonUrl + "notification/getStateList.spring";
    console.log("url :" + url);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "osType": "Android",
    }

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        var Options = "";
        // $('#stateID').append('<option value="select">--Select State--</option>'); 

        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#stateID').append("<option value='" + resp.responseObjList[i].id + "'>" + resp.responseObjList[i].name + "</option>");
          // $('#stateID').formSelect();
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

  projectList(ids) {

    var sitIDS
    if (ids == 0) {
      sitIDS = null
    } else {
      sitIDS = [ids]
    }
    let url = this.cmn.commonUrl + "site/getStateWiseSites.spring";
    console.log("url :" + url);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "ids": [JSON.parse(sitIDS)]
    }

    console.log(url);
    console.log(JSON.stringify(body));


    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      console.log(JSON.stringify(resp))
      if (resp.responseCode == 200) {

        $('#projectID').html("");

        this.project_wise_project = resp.responseObjList;
        this.project_wise_project.forEach((o: any, i) => (o.id = o.id));

        this.userForm.reset();
        this.Projected_wise_data = [];



        // for (var i = 0; i < resp.responseObjList.length; i++) {
        //   $('#projectID').append("<option value='" + resp.responseObjList[i].id + "'>" + resp.responseObjList[i].name + "</option>");
        //   // $('#stateID').formSelect();
        // }
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
  delete_image() {
    //alert("test")
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

  delete_filee() {



    $('#driveFileLinkField').val();
    $("#filee").val(null);
    $("#myfilebinding").hide();

    this.file_name_array1 = [];
    this.base64_array_object_data1 = [];
    this.File_Info1 = [];
    console.log("file name length :" + this.file_name_array1.length);
    console.log("file base64 length :" + this.base64_array_object_data1.length);
  }


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


  Previewfun(content3) {





    if ($("#notificationTypeID").val() == "select") {
      swal("Please select Notification Type");
      return false;
    }

    var stateval = $("#stateID").val();

    if (stateval == "select" || stateval == "" || stateval == undefined || stateval == "undefined") {
      swal("Please select state");
      return false;
    }

    if ($("#notificationTypeID").val() == "All") {

    } else if ($("#notificationTypeID").val() == "NONCUSTOMER") {

    } else {

      if (this.Projected_wise_data.length == 0) {
        swal('Please select projects');
        return false;
      }


      // var projectval = $("#projectID").val();

      // if (projectval == "select" || projectval == "" || projectval == undefined || projectval == "undefined") {
      //   swal("Please select projects");
      //   return false;
      // }
    }


    if ($("#deviceID").val() == "select") {
      swal("Please select device");
      return false;
    }

    this.File_Info = [];
    for (var i = 0; i < this.base64_array_object_data.length; i++) {
      this.File_Info.push({
        "id": "" + i,
        "name": "" + this.filename,
        "base64": "" + this.base64_array_object_data
      });
    }



    if (stateval[0] == 0) {
      this.state_val = null;
    } else {
      this.state_val = [];

      this.state_val.push($("#stateID").val());
    }



    var title = $("#title_id").val();
    if (title == "" || title == "undefined" || title == undefined) {
      swal("Please enter title");
      return false;
    }


    this.ckeditorVal = CKEDITOR.instances["ckeditor"].getData();
    if (this.ckeditorVal.length > 3980) {
      alert("Character limit exceeded, it should be less than 3625 characters");
      return false;
    }




    var notification_id = $("#notification_id").val();
    var notification_title = $("#title_id").val();
    var discription = $("#textarea2").val();
    if (notification_id == "" && this.ckeditorVal == "" && this.File_Info.length == 0) {
      swal("Please enter Notification text (or) Notification decription (or) upload notification image");
      return false;
    }

    var discription = $("#textarea2").val();
    this.File_Info1 = [];
    for (var i = 0; i < this.base64_array_object_data1.length; i++) {
      this.File_Info1.push({
        "id": "" + i,
        "name": "" + this.file_name_array1,
        "base64": "" + this.base64_array_object_data1
      });
    }


    if ($("#deviceID").val() == "All") {
      this.ostype_val = "All";
    } else {
      this.ostype_val = $("#deviceID").val();
    }

    if ($("#notificationTypeID").val() == "All") {
      this.projectVal = []
    } else if ($("#notificationTypeID").val() == "NONCUSTOMER") {
      this.projectVal = []
    } else {
      this.projectVal = this.Projected_wise_data;
    }

    console.log(image_controller);




    //   var img = document.getElementById('myImg_preview');
    //     // alert(img.getAttribute('src')); // foo.jpg
    //     $('#myImg_preview').attr('src', img.getAttribute('src'));



    this.main_notification_title = notification_title.replaceAll('&nbsp;', ' ').replaceAll('<br>', ' ').trim();

    console.log(this.main_notification_title);
    this.main_notification_id = notification_id;
    this.main_notification_dec = this.ckeditorVal.replaceAll('&nbsp;', ' ').replaceAll('<br>', ' ').trim();

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


