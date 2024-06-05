import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions,Headers } from '@angular/http';
import { Router } from '@angular/router';
import { switchAll } from 'rxjs/operators';
import { CommonComponent } from '../common/common.component';
declare const $: any;
declare const swal: any;
var file_second;
@Component({
  selector: 'app-upload-mpr',
  templateUrl: './upload-mpr.component.html',
  styleUrls: ['./upload-mpr.component.sass']
})
export class UploadMPRComponent implements OnInit {
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
  startingvalue: any;
  constructor(private cmn: CommonComponent, private http: Http, private router: Router) { 
    $('.page-loader-wrapper').hide();
    this.siteList()
  }
  
  handle_FileSelect(evt) {
    $("#myfilebinding").show();
    this.file_name_array1 = [];
    this.base64_array_object_data1 = [];
    this.File_Info1 = [];
    debugger;
    var files = evt.target.files;
    var file_val = evt.target.value;
   //  alert("------------"+file_val);
     //window.open(file_val)
    console.log(evt.target.value);
    const fsize = files.item(i).size; 
    file_second = Math.round((fsize / 1024)); 
   if (file_second >= 10240) { 
    $("#files").val(null);
    //$(".remove-image2").hide();
    swal("File size is more than 10MB. Please enter the google drive file link in the text box."); 
   // $('#imglinkiddiv').show();
    this.file_name_array1 = [];
    this.base64_array_object_data1 = [];
       return false;
   }else{
  //  $('#imglinkiddiv').hide();
    $("#driveFileLinkField").val("")
    
    for (var i = 0; i < files.length; i++) {
      var temp = evt.target.files[i].name;
      var temp2 = temp.split('.').pop();
      if(temp2 != "pdf"){
        swal('Please upload pdf file only.');
        $("#files").val(null);
        break;
      }

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
  ngOnInit() {
    $(function(){
      $("#driveFileLinkField").on("keydown", function (e) {
        return e.which !== 32;
    });
    })
    
    $("#projectID").select2({
      placeholder: "--Select--",
      dir: "ltl",
    });
  }
  mprcraetionSubmit(){
    
  //  swal("progressing")
  if($("#projectID").val() == "select"){
    swal("Please select project");
    return false;
  }
  if($("#mprName").val() == ""){
    swal("Please enter MPR name");
    return false;
  }
 // this.mprnameValid()
  if( $("#files").val() == "" && $("#driveFileLinkField").val() == ""){
    swal("Please select pdf file (OR) Enter google drive path(If pdf size is more than 25 mb)");
    return false;
  }
  // if( $("#files").val() != ""){
  //   var fileName = $("#files").val().toLowerCase();
  //   if(!fileName.endsWith('.pdf')){
  //       swal('Please upload pdf file only.');
  //       return false;
  //   }
  // }
  
  //window.open("data:application/pdf;"+ this.base64_array_object_data1)
  for (var i = 0; i < this.base64_array_object_data1.length; i++) {
    this.File_Info1.push({
     // "id": 0,
      "name": "" + this.file_name_array1,
      "base64": "" + this.base64_array_object_data1
    });
  }
 // console.log("-------------" + JSON.stringify(this.File_Info));
 if($('#driveFileLinkField').val() != ""){
  this.File_Info1 = null;
 }
  $('.page-loader-wrapper').show();

    let url = this.cmn.commonUrl + "mpr/saveMPRDetails.spring"
    console.log("url :" + url);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    var body = {

    "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
    "mprName"    : $("#mprName").val(),
    "siteId"     : $("#projectID").val(),
    "remarks"    : $("#remarksId").val(),
    "fileInfos"  :this.File_Info1,
    "externalDriveLocation" : $('#driveFileLinkField').val()
  
  //     "linkFileLoc": $('#driveFileLinkField').val().trim() //"link/file/loc/external/drive/file"
    }
    console.log("----body :" + JSON.stringify(body));
   // return false;
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      console.log("MPR creation response----------" + JSON.stringify(resp));
      //return false;
      if (resp.responseCode == 200) {
        $('#imglinkiddiv').hide();
        $("#driveFileLinkField").val("")
        //swal("Good job!", "Notification send successfully", "success");
        swal("MPR created successfully !!");
        location.reload();
       
        //this.router.navigate(["/MPR_View"]);
        
      }else if(resp.responseCode ==440){
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
      //  this.router.navigate([""]);
      }else{
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
         // this.router.navigate([""]);
        }
      }
    );
  }

  
/*-----------------Getting Project(site) list Start---------------------*/
siteList() {
  var arr = localStorage.getItem('SiteIDS');
  let url = this.cmn.commonUrl + "site/site.spring";
  // http://106.51.38.64:9999/SumadhuraGateway/employeeservice/site/site.spring
  console.log("url :" + url);
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers });
  var body = {
    "siteIds":JSON.parse(arr).map(String),
    "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),

  }
  console.log("body :" + JSON.stringify(body))
  this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
    //$('.page-loader-wrapper').hide();
    console.log("Site list response----------" + JSON.stringify(resp));
    if(resp.responseCode == 200){
      var Options = "";
      // $('#projectID').formSelect();
      $('#projectID').html();
      $('#projectID').append("<option value='select'>--Select--</option>")
      for (var i = 0; i < resp.responseObjList.length; i++) {
        $('#projectID').append("<option value='" + resp.responseObjList[i].id + "'>" + resp.responseObjList[i].name + "</option>");
        //	$('#projectID').formSelect();
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
    
      var error = JSON.parse(error._body).responseCode;
      //alert(error);
      $('.page-loader-wrapper').hide();
      if (error == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      }
    }
  );

/*-----------------Getting Project(site) list End---------------------*/

}
valid(){
  var url = $('#driveFileLinkField').val();
  if(url == ""){

  }else{
    $("#filee").val('');
    $("#files").val(null);
    this.file_name_array1 = [];
    this.base64_array_object_data1 = [];
    window.open(url,'targetWindow','toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=400,height=500')
    swal("Please check your file path correct or not(If it is valid please click submit button Otherwise, change the file path)");
   
  }
 return false;
  var urlRegx = new RegExp('(docs.google.com|(http|https))(://[A-Za-z]+-my.sharepoint.com)?', 'i');
 // alert(urlRegx.test(url));
  if(urlRegx.test(url) == false){
    $('#driveFileLinkField').val('')
  swal("Please give valid path");
  return false;
 }else{
  
  var http = new XMLHttpRequest();
  http.open('HEAD', url, false);
  http.send();
 // alert(http.status)
  if (http.status == 200){
   // alert("ok")
   $("#filee").val('');
   $("#files").val(null);
   this.file_name_array1 = [];
   this.base64_array_object_data1 = [];
  }else{
    $('#driveFileLinkField').val('')
    swal("Please give valid path");
    return false;
  }
 }
  var http = new XMLHttpRequest();
  http.open('HEAD', url, false);
  http.send();
  //alert(http.status)
  if (http.status == 200){
   // alert("ok")
   $("#filee").val('');
   $("#files").val(null);
   this.file_name_array1 = [];
   this.base64_array_object_data1 = [];
  }else{
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
// spaceRestriction(event){
//   var test = event ? event.which : window.event.keyCode;
//   if (test == 32) return false;
// }

homeClick(){
  // this.router.navigate(['leave-update']);
  this.router.navigate(['dashboard']);
}
mprnameValid(){
  //return false;
 // $('.page-loader-wrapper').show();
  var arr = localStorage.getItem('SiteIDS');
  let url = this.cmn.commonUrl + "mpr/checkMprNameExistence.spring";
  // http://106.51.38.64:9999/SumadhuraGateway/employeeservice/site/site.spring
  console.log("url :" + url);
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers });
  var body = {
  
    "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
    "mprName"   : $("#mprName").val()

  }
  console.log("body :" + JSON.stringify(body))
  this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
   // $('.page-loader-wrapper').hide();
    console.log("Site list response----------" + JSON.stringify(resp));
    if(resp.responseCode == 200){
     // alert(resp.responseObjList.rowCount)
      if(resp.responseObjList.rowCount != null){
      swal("MPR name already exists.Please change the name");
      $("#mprName").val('')
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

keyPress1(event: any) {
  this.startingvalue = event.target.selectionStart;
  if (event.which === 32 && event.target.selectionStart === 0) {
    return false;
  } else {
    // const pattern = /^[a-zA-Z ]*$/;
    // const inputChar = String.fromCharCode(event.charCode);
    // if (event.keyCode !== 8 && !pattern.test(inputChar)) {
    //   event.preventDefault();
    // }
  }
}
}
