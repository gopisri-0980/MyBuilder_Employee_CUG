import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { CommonComponent } from 'src/app/common/common.component';
import { ActivatedRoute, Router } from '@angular/router';

import { PageEvent } from '@angular/material';
declare const Chart: any;
declare const CKEDITOR: any;
declare const tinymce: any;


declare const $: any;
declare const autosize: any;
declare const swal :any;
var file;
var file_second;

@Component({
  selector: 'app-company-modif-view-and-submit',
  templateUrl: './company-modif-view-and-submit.component.html',
  styleUrls: ['./company-modif-view-and-submit.component.sass']
})
export class CompanyModifViewAndSubmitComponent implements OnInit {

  file_name_array: any = [];
  binaryString: any;
  base64textString: string;
  base64_array_object_data: any = [];
  File_Info: any = [];
  siteval: number;
  stateval: number;
  state_val: any = [];
  file_val: any;
  imgsrcId:any;
  json_response: any;
  myimgg:boolean = true;
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
  ostype_val: any;
  imageLocation: any;
  //selectedstate: any;

  ckeditorError: string = "Please enter message";
  ckeditorErrorLengthExceed: string = "Characters length should not exceed 4000";
  ckeditorVal: any;
  projectResponseArray: any = [];
  projectID: any = [];
  projectVal: any[];

  constructor(public route: ActivatedRoute, private router : Router,private http: Http,public cmn:CommonComponent) { 
    this.stateList();
    $('.page-loader-wrapper').hide();
    console.log("Approve response:"+sessionStorage.getItem('response'));
    this.json_response = eval('('+sessionStorage.getItem('response')+')');
    this.getCompanyNotificationDetails();
  }

  ngOnInit() {

    
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


    

    // if(this.json_response.imgLoc == "NA"){
    //   this.myimgg= false;
    //   $('#myImg').attr('src','');
    //  }else{
    //   this.myimgg= true;
    //   $('#myImg').attr('src', this.json_response.imgLoc);
    //  }

    $(function() {
      $('#notificationTypeID').change(function (e) {
        var selected = $(e.target).val();
        console.log(selected);
        if (selected == "NONCUSTOMER") {
          $('#stateLabel2').show();
          $('#stateLabel').hide();
          $('#projectgrid').hide();
          
        }else if(selected == "All"){
          $('#projectgrid').hide();
        } else {
          $('#projectgrid').show();
          $('#stateLabel').show();
          $('#stateLabel2').hide();
        }
      });
    // $('#notificationTypeID').change(function(e) {
    //     var selected = $(e.target).val();
    //     console.log(selected);
    //     if(selected == "NONCUSTOMER"){
    //       $('#stateLabel2').show();
    //       $('#stateLabel').hide();
    //     }else{
    //       $('#stateLabel').show();
    //       $('#stateLabel2').hide();
    //     }
    // }); 

    $('#myImg').on('click', function() {
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
       }else{
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
      debugger;
      if (file_second >= 10240) { 
       
        $("#filee").val(null);
       
        $("#myfilebinding").hide();
        $("#image-myfilebinding").hide();
       // alert("File too Big, please select a file less than 10mb"); 
          return false;
      }else{
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
    };

    $("#notificationTypeID").select2({
      placeholder: "Select Type",
      dir: "ltl"
    });
      $("#stateID").select2({
        placeholder: "Select State",
        dir: "ltl"
      });

      $("#projectID").select2({
        placeholder: "Select project",
        dir: "ltl"
      });

      
      $("#deviceID").select2({
        placeholder: "Search Device",
        dir: "ltl"
      });
      var self=this;
var sitval;
      $('#stateID').change(function (e) {
        sitval = $(e.target).val();
        $('#projectID').val("")
        $('#projectID').select2().trigger('change');
 
       if ($("#stateID").val() == "select") {
 
       } else {
         self.projectList(sitval);
       }
 
     });
  }

  getCompanyNotificationDetails(){
    $('.page-loader-wrapper').show();
   
    let url = this.cmn.commonUrl + "notification/viewProjectNotificationDetailChanges.spring";
       console.log("viewProjectNotificationDetailChanges url :"+url);
       
         let headers = new Headers({ 'Content-Type': 'application/json' });
             let options = new RequestOptions({ headers: headers });
            var body = {
              "id" : this.json_response.notificationId, //889,
              "sessionKey": ""+sessionStorage.getItem("login_sessionkey"),
              "notificationType" : "Company"            
            }
       console.log("Company viewProjectNotificationDetailChanges body :"+JSON.stringify(body));
       this.http.post(url,body,options).map(res => res.json()).subscribe(resp =>{
      $('.page-loader-wrapper').hide();
      console.log("Company viewProjectNotificationDetailChanges response----------"+JSON.stringify(resp));
      if(resp.responseCode == 200){
        this.osType = resp.responseObjList.notificationRequests[0].osType;
        this.imgLoc = resp.responseObjList.notificationRequests[0].imgLoc;
        this.fileLoc = resp.responseObjList.notificationRequests[0].linkFileLoc;

        $("#notificationtype_id").prop("disabled", true);
        $("#state_id").prop("disabled", true);
        $("#device_id").prop("disabled", true);

        for(let i=0; i<resp.responseObjList.notificationDetailChangesResonse[0].notificationTypeList.length; i++){
          this.notTypeResponseArray.push(resp.responseObjList.notificationDetailChangesResonse[0].notificationTypeList[i].value);
        }

        for(let i=0; i<resp.responseObjList.notificationDetailChangesResonse[0].stateList.length; i++){
          this.stateResponseArray.push(resp.responseObjList.notificationDetailChangesResonse[0].stateList[i].name);
          this.stateID.push(resp.responseObjList.notificationDetailChangesResonse[0].stateList[i].id);
        }
        for (let i = 0; i < resp.responseObjList.notificationDetailChangesResonse[0].siteList.length; i++) {
          this.projectResponseArray.push(resp.responseObjList.notificationDetailChangesResonse[0].siteList[i].name);
          this.projectID.push(resp.responseObjList.notificationDetailChangesResonse[0].siteList[i].id);
        }
        $("#notificationtype_id").val(this.notTypeResponseArray);
        if(this.notTypeResponseArray == "CUSTOMER"){

            $("#project_grid").show()
         
        }else{
         
            $("#project_grid").hide()
       
        }
        $("#state_id").val(this.stateResponseArray);
        $("#project_id").val(this.projectResponseArray);
        $("#device_id").val(resp.responseObjList.notificationRequests[0].osType);
        $("#title_id").val(resp.responseObjList.notificationRequests[0].message);        
        $("#notificationtext_id").val(resp.responseObjList.notificationRequests[0].notificationText);
       // $("#notificationdescription_id").val(resp.responseObjList.notificationRequests[0].description);

        CKEDITOR.instances['ckeditor'].setData(resp.responseObjList.notificationRequests[0].description);



        if(resp.responseObjList.notificationRequests[0].comments == null || resp.responseObjList.notificationRequests[0].comments == ""){
          $(".commentsDiv").hide();
        }else{
          $("#comments_id").val(resp.responseObjList.notificationRequests[0].comments);
        }

        if(resp.responseObjList.notificationRequests[0].imgLoc == null ||  resp.responseObjList.notificationRequests[0].imgLoc == ""){
          $(".image-area").hide();
        }else{
          this.imageLocation = resp.responseObjList.notificationRequests[0].imgLoc;

           var gDrivePath =  this.imageLocation.split('//')[1].split('/')[0];
           if(gDrivePath == 'drive.google.com'){
            $("#myImg").hide();
            $('#driveImg').show();
            $("#imagefilee").val(this.imageLocation);
           }else{
            $('#driveImg').hide();
            $('#myImg').attr('src', resp.responseObjList.notificationRequests[0].imgLoc);
            var imageename =  this.imageLocation.split(/[\\/]/).pop();
            $("#imagefilee").val(imageename);
           }
           
        }

        $(function() {
          $('#myImg').on('click', function() {
            debugger;
            var img = document.getElementById('myImg');
            $('.imagepreview').attr('src', img.getAttribute('src'));
            $('#imagemodal').modal('show');   
          });		
        });

        if(resp.responseObjList.notificationRequests[0].linkFileLoc == null ||  resp.responseObjList.notificationRequests[0].linkFileLoc == ""){
          $(".fileDiv").hide();
        }else{
          var gDrivePath =  resp.responseObjList.notificationRequests[0].linkFileLoc.split('/')[4];
           if(gDrivePath == 'sumadhura_projects_images'){
            this.linkFileLoc = resp.responseObjList.notificationRequests[0].linkFileLoc;
              var basename =  resp.responseObjList.notificationRequests[0].linkFileLoc.split(/[\\/]/).pop(),  // extract file name from full path ...
                                                    // (supports `\\` and `/` separators)
              pos = basename.lastIndexOf(".");       // get last position of `.`
              if (basename === "" || pos < 1)            // if file name is empty or ...
                return "";                             //  `.` not found (-1) or comes first (0)
              this.fileExtension = basename.slice(pos + 1);
              console.log("file extension -->"+this.fileExtension);
              $("#filee").val(basename);

           }else{
            this.linkFileLoc = resp.responseObjList.notificationRequests[0].linkFileLoc;
            this.fileExtension = 'gDriveFile';

            $("#filee").val(this.linkFileLoc);
             
           }
        }

      }else if(resp.responseCode ==440){
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      }else{
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
      }
      
      },
      error => {
        $('.page-loader-wrapper').hide();
          if(error == 440){
            swal("Your Session has been Timed Out!", "Please login once again.", "error");
            this.router.navigate([""]);
          }
      }
      );
  }

  ModifyNotification(){


    
    this.ckeditorVal = CKEDITOR.instances["ckeditor"].getData();
    if (this.ckeditorVal.length > 3980) {
      alert("Character limit exceeded, it should be less than 3625 characters");
      return false;
    }

    
    if (this.ckeditorVal == "") {
      $("#ckeditorError").show();
      $("#CKEditiorDiv").addClass("borderforerror");
      return false;
    }

    console.log(this.ckeditorVal);



    if($("#notificationTypeID").val() == "select"){
      swal("Please select notification type");
      return false;
    }

    var stateval = $("#stateID").val();
    console.log("stateval :"+stateval);
    console.log("stateval :"+stateval[0]);
    if(stateval[0] == 0){
      this.state_val = null;
    }else{
      // this.state_val = $("#stateID").val();
      this.state_val.push($("#stateID").val());
    }
    console.log(" this.stateval :"+ this.state_val);

    if(stateval == "select" || stateval == "" || stateval == undefined || stateval == "undefined"){
        swal("Please select state");
      // swal("Please select state");
        return false;
    }
    // var projectval = $("#projectID").val();
    //  console.log(" projectval :" + projectval);
    //  if (projectval == "select" || projectval == "" || projectval == undefined || projectval == "undefined") {
    //    swal("Please select projects");
    //    return false;
    //  }

    if ($("#notificationTypeID").val() == "All") {
   
    }else if($("#notificationTypeID").val() == "NONCUSTOMER"){
    
    }else{
     var projectval = $("#projectID").val();
     console.log(" projectval :" + projectval);
     if (projectval == "select" || projectval == "" || projectval == undefined || projectval == "undefined") {
       swal("Please select projects");
       return false;
     }
    }
    
    if($("#deviceID").val() == "select"){
      swal("Please select device");
      return false;
    }

    console.log("name :"+this.file_name_array);
    console.log(this.base64_array_object_data.length+"---"+this.file_name_array.length);
    for(var i=0;i<this.base64_array_object_data.length;i++){
      this.File_Info.push({
        "id":""+i,
        "name":""+this.file_name_array,
        "base64":""+this.base64_array_object_data
      });
    }
    console.log("-----images--------"+JSON.stringify(this.File_Info));

    console.log(this.base64_array_object_data1.length+"---"+this.file_name_array1.length);
    for(var i=0;i<this.base64_array_object_data1.length;i++){
      this.File_Info1.push({
        "id":""+i,
        "name":""+this.file_name_array1,
        "base64":""+this.base64_array_object_data1
      });
    }
    console.log("------files-------"+JSON.stringify(this.File_Info1));

    var title = $("#title_id").val();
    if(title == "" || title == "undefined" || title == undefined ){
      swal("Please enter title");
      return false;
    }

    var notification_id = $("#notificationtext_id").val();
    var discription = $("#notificationdescription_id").val();
    var notification_id = $("#notificationtext_id").val();

    if(notification_id == ""  && this.File_Info.length == 0 && this.ckeditorVal == ""){
      swal("Please enter Notification text (or) Notification decription (or) upload notification image");
      return false;
    }

    if(this.File_Info == ""){
      // this.imgLoc = "";
    }else{
      this.imgLoc = "";
    }

    if(this.File_Info1 == ""){
      // this.fileLoc = "";
    }else{
      this.fileLoc = "";
    }

    if($("#deviceID").val() == "All"){
      this.ostype_val = "All";
    }else{
      this.ostype_val = $("#deviceID").val();
    }

    if($('#driveImageLinkField').val() != ''){
      this.imgLoc = $('#driveImageLinkField').val().trim();
    }else{

    }

    if($('#driveFileLinkField').val() != ''){
      this.fileLoc = $('#driveFileLinkField').val().trim();
    }else{
      
    }
   
    if ($("#notificationTypeID").val() == "All") {
      this.projectVal = []
   }else if($("#notificationTypeID").val() == "NONCUSTOMER"){
     this.projectVal = []
   }else{
     this.projectVal = $("#projectID").val();
   }
    $('.page-loader-wrapper').show();

    let url = this.cmn.commonUrl + "notification/sendCompanyNotificationsForApprovals.spring";
       console.log("approveOrRejectCompanyNotifications url :"+url);
       
         let headers = new Headers({ 'Content-Type': 'application/json' });
             let options = new RequestOptions({ headers: headers });
            var body = {
              "message": ""+$("#title_id").val(),
              "description": this.ckeditorVal,
              "types":[$("#notificationTypeID").val()], //["CUSTOMER"],
              "stateIds": this.state_val,
              "fileInfos": this.File_Info,
              "linkFiles" : this.File_Info1,
              "imgLoc": this.imgLoc,
              "linkFileLoc": this.fileLoc,
              "notificationText" : $("#notificationtext_id").val(),
              "osType" : this.ostype_val,
              "sessionKey": ""+sessionStorage.getItem("login_sessionkey"),
              "action" : "Modified_For_Approvals",
              "siteIds":this.projectVal,
              "id" :this.json_response.notificationId //889
            }
       console.log("approveOrRejectCompanyNotifications body :"+JSON.stringify(body));

       
       this.http.post(url,body,options).map(res => res.json()).subscribe(resp =>{
         
        $('.page-loader-wrapper').hide();
        console.log("approveOrRejectCompanyNotifications response----------"+JSON.stringify(resp));
        if(resp.responseCode == 200){
          swal("Notification sent for approval successfully !!");
          this.router.navigate(["view-company-notifications-for-modifications"]);
        }else if(resp.responseCode ==440){
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }else{
          $('.page-loader-wrapper').hide();
          swal(resp.errors[0]);
          return false;
        }
      
      },
      error => {
        $('.page-loader-wrapper').hide();
          if(error == 440){
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
   
   const fsize = files.item(i).size; 
      file = Math.round((fsize / 1024));
  
    if (file >= 1024) { 
      $("#imgfile").val(null);
      
      swal("Image size is more than 1MB. Please select below 1MB image.");
      // $('#imageLinkField').show();
      $('#driveImg').hide();
      $('#myImg').hide();
      this.file_name_array = [];
      this.base64_array_object_data = [];
      return false;  
    }else{
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
    this.base64textString= btoa(this.binaryString);
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
   }else{
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
    this.base64textString= btoa(this.binaryString);
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

  stateList(){
    debugger;
    let url = this.cmn.commonUrl + "notification/getStateList.spring";
     console.log("url :"+url);
     
       let headers = new Headers({ 'Content-Type': 'application/json' });
           let options = new RequestOptions({ headers: headers });
           var body = {
            "sessionKey": ""+sessionStorage.getItem("login_sessionkey"),
            "osType" : "Android",
          }
    
     this.http.post(url,body,options).map(res => res.json()).subscribe(resp =>{
    $('.page-loader-wrapper').hide();
    if(resp.responseCode == 200){
      var Options = "";
      // $('#stateID').append('<option value="select">--Select State--</option>'); 

         for(var i=0;i<resp.responseObjList.length;i++){
           $('#stateID').append("<option value='" + resp.responseObjList[i].id + "'>" + resp.responseObjList[i].name + "</option>");
          // $('#stateID').formSelect();
         }
    }else if(resp.responseCode ==440){
      swal("Your Session has been Timed Out!", "Please login once again.", "error");
      this.router.navigate([""]);
    } else {
      $('.page-loader-wrapper').hide();
      swal(resp.errors[0]);
      return false;
    }
 
    },
      error => {
        var error=JSON.parse(error._body).responseCode;
        //alert(error);
        $('.page-loader-wrapper').hide();
        if(error == 440){
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }

  delete_image(){
    console.log("----Delete image----")
     $("#imgfile").val(null);
     $("#imagefilee").val(null);
     $(".image-area").hide();
     this.file_name_array = [];
     this.base64_array_object_data = [];
     this.File_Info = [];
     console.log("file name length :"+this.file_name_array.length);
     console.log("file base64 length :"+this.base64_array_object_data.length);
   
   }
 
   delete_file(){
     console.log("----Delete file----")
     $("#filee").val(null);
     $("#myfilebinding").hide();
     this.file_name_array1 = [];
     this.base64_array_object_data1 = [];
     this.File_Info1 = [];
     console.log("file name length :"+this.file_name_array1.length);
     console.log("file base64 length :"+this.base64_array_object_data1.length);
   }

  myimage(fileurl){
    window.open(fileurl, '_system', 'location=yes,closebuttoncaption=Fechar,enableViewportScale=yes');
  }

  homeClick(){
    this.cmn.commonHomeNavigation();
  }

  backToList(){
      sessionStorage.setItem('isBackButtonClickedCompModify','true');
      this.router.navigate(["view-company-notifications-for-modifications"]);
  }

  projectList(ids) {
    debugger;
    var sitIDS
    if(ids == 0){
      sitIDS = null
    }else{
      sitIDS = [ids]
    }
    let url = this.cmn.commonUrl + "site/getStateWiseSites.spring";
    console.log("url :" + url);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "ids":sitIDS
    }

 

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      console.log(JSON.stringify(resp))
      if (resp.responseCode == 200) {
        var Options = "";
        // $('#stateID').append('<option value="select">--Select State--</option>'); 
        $('#projectID').val("")
        $("#projectID option[value]").remove();

        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#projectID').append("<option value='" + resp.responseObjList[i].id + "'>" + resp.responseObjList[i].name + "</option>");
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

}
