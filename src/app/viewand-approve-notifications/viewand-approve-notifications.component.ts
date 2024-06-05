import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { CommonComponent } from 'src/app/common/common.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Session } from 'protractor';
declare const $: any;
declare const autosize: any;
declare const swal :any;
var json_response;
var json_totalticketresponse
@Component({
  selector: 'app-viewand-approve-notifications',
  templateUrl: './viewand-approve-notifications.component.html',
  styleUrls: ['./viewand-approve-notifications.component.sass']
})
export class ViewandApproveNotificationsComponent implements OnInit {

  file_name_array: any = [];
  binaryString: any;
  base64textString: string;
  base64_array_object_data: any = [];
  File_Info: any = [];
  siteval: number;
  stateval: number;
  state_val: number;
  file_val: any;
  imgsrcId:any;
  json_response: any;
  myimgg:boolean = true;
  fileExtension: any;
  itemsPer_Page_companyNotifications: number;
  current_Page_companyNotifications: any;
  totalItems_companyNotifications: number;
  tabledata_companyNotifications: any;
  textdisc: any;
  tickettotaldetailsresponse: any;
  ticketdetailsresponse: any;
  pageIndex: number;
  currentpageindex: string;
  notificationIdd: any;
  //selectedstate: any;

  constructor(public route: ActivatedRoute, private router : Router,private http: Http,public cmn:CommonComponent) { 
   
    $('.page-loader-wrapper').hide();
    json_totalticketresponse = eval('(' + sessionStorage.getItem('Totalticketdata1') + ')');
    this.tickettotaldetailsresponse = json_totalticketresponse;
    console.log("---------"+this.tickettotaldetailsresponse)
    this.currentpageindex = sessionStorage.getItem("currentpageindex");

    json_response = eval('(' + sessionStorage.getItem('ticketdetails_view') + ')');
    this.ticketdetailsresponse = json_response;
    this.json_response = eval('('+sessionStorage.getItem('response')+')');
    
     this.notificationIdd = this.json_response.id;

     sessionStorage.setItem("projId",this.json_response.id)
     sessionStorage.setItem("Title_name" , "View Customer Notifications");
     sessionStorage.setItem("Title_name1" , "View Notification Details");
     
    //  alert(this.notificationIdd)
//alert(this.tickettotaldetailsresponse.length)
    for (var i = 0; i < this.tickettotaldetailsresponse.length; i++) {
      //alert(this.tickettotaldetailsresponse[i].id)
     // alert(this.notificationIdd)
      if (this.tickettotaldetailsresponse[i].id ==  this.notificationIdd) {
        this.pageIndex = i;
      }
    }
  console.log("Approve response:"+sessionStorage.getItem('response'));
  this.json_response = eval('('+sessionStorage.getItem('response')+')');
 // alert(this.json_response.description);
 
    var selectedstate;
    $(document).ready(function(){
     // $('#stateID').val().text($('#stateID').val().substr(0,13)+'…')
      $("select.states").change(function(){
         selectedstate = $(this).children("option:selected").val();
         // alert("You have selected the country - " + selectedstate);
      });
  });
  }

  ngOnInit() {
    $("input").prop("disabled", true);
    $("textarea").prop("disabled", true);
    this.textdisc = this.json_response.description;
   // $("#textarea2").val(this.json_response.description);
    $("#title_id").val(this.json_response.message);
    $("#state_id").val(this.json_response.responseObjList);
    $("#project_id").val(this.json_response.siteobjList);
    
    $("#notificationtext_id").val(this.json_response.notificationText);
    //alert(this.json_response.imgLoc);
    // $('#myImg').attr('src', this.json_response.imgLoc);
    var gDrivePath =  this.json_response.imgLoc.split('//')[1].split('/')[0];
           if(gDrivePath == 'drive.google.com'){
            $("#myImg").hide();
            $('#driveImg').show();
           }else{
            $('#myImg').attr('src', this.json_response.imgLoc);
           }
    //alert(this.json_response.imgLoc);
    $(function() {
      $('#myImg').on('click', function() {
        debugger;
     // alert( this.imgsrcId);
     var img = document.getElementById('myImg');
    // alert(img.getAttribute('src')); 
     // foo.jpg
        $('.imagepreview').attr('src', img.getAttribute('src'));
        $('#imagemodal').modal('show');   
      });		
		
      $(":file").change(function () {
        $("#myImg").show();
          if (this.files && this.files[0]) {
              var reader = new FileReader();
              reader.onload = imageIsLoaded;
              reader.readAsDataURL(this.files[0]);
          }
      });

  });
    if(this.json_response.imgLoc == "NA"){
      this.myimgg= false;
      $('#myImg').attr('src','');
     //alert("na")
     }else{
      this.myimgg= true;
     // alert(this.json_response.imgLoc);
      $('#myImg').attr('src', this.json_response.imgLoc);
     }
    // alert( this.json_response.linkFileLoc);

    var gDrivePath =  this.json_response.linkFileLoc.split('/')[4];
           if(gDrivePath == 'sumadhura_projects_images'){
            var basename =  this.json_response.linkFileLoc.split(/[\\/]/).pop(),  // extract file name from full path ...
            // (supports `\\` and `/` separators)
            pos = basename.lastIndexOf(".");       // get last position of `.`

            if (basename === "" || pos < 1)            // if file name is empty or ...
            return "";                             //  `.` not found (-1) or comes first (0)
            this.fileExtension = basename.slice(pos + 1);
           }else{
            this.fileExtension = 'gDriveFile';
           
           }
     
   //  alert(basename.slice(pos + 1))
   
  
  function imageIsLoaded(e) {
    this.imgsrcId = e.target.result;
    //alert(e.target.result);
      $('#myImg').attr('src', e.target.result);
  };
    $("#stateID").select2({
      placeholder: "Search State",
      dir: "ltl"
    });
    $(function () {
       //Textare auto growth
       autosize($('textarea.auto-growth'));

			initMultiSelect();
			//Multi-select
			$('#optgroup').multiSelect({ selectableOptgroup: true });
    });
    
    function initMultiSelect() {
      / simple with multi select /
			$('#multisel').formSelect();
			var data = [{ id: 1, name: "ALL" }, { id: 2, name: "Telangana" }, { id: 3, name: "Karnataka" }];

			var Options = "";
			$.each(data, function (i, val) {
				$('#multisel').append("<option value='" + val.id + "'>" + val.name + "</option>");
				$('#multisel').formSelect();
			});
      / end simple with multi select /
      return false;
      //c
  let url = this.cmn.commonUrl + "employeeTicket/getTicketForwardMenuDetails.spring";
  // http://129.154.74.18:8888/employeeservice/employeeTicket/getTicketForwardMenuDetails.spring
     console.log("url :"+url);
     
       let headers = new Headers({ 'Content-Type': 'application/json' });
           let options = new RequestOptions({ headers: headers });
           var body = {
            "employeeId":"1"
           }
     console.log("----body :"+JSON.stringify(body));
     this.http.post(url,body,options).map(res => res.json()).subscribe(resp =>{
    //$('.page-loader-wrapper').hide();
    console.log("Department list response----------"+JSON.stringify(resp));
       if(resp.responseCode == 200){
    		/ simple with multi select /
			$('#multisel').formSelect();
			var data = [{ id: 1, name: "ALL" }, { id: 2, name: "Telangana" }, { id: 3, name: "Karnataka" }];

			var Options = "";
			$.each(data, function (i, val) {
				$('#multisel').append("<option value='" + val.id + "'>" + val.name + "</option>");
				$('#multisel').formSelect();
			});
			/ end simple with multi select /
       }else if(resp.responseCode ==440){
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      }
       
    },
      error => {
        console.log(error);
      }
    );
	
		}
  }

  handleFileSelect(evt) {
    debugger;
    var files = evt.target.files;
    this.file_val = evt.target.value;
    
   // alert("------------"+this.file_val);
   console.log(evt.target.value);
  
    for (var i = 0; i < files.length; i++) {
      var temp = evt.target.files[i].name;
      
      this.file_name_array.push(temp);

    //alert(this.file_name_array.length);
      var file = files[i];
      if (files && file) {
        var reader = new FileReader();
        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsBinaryString(file);

      } else {
        console.log("file not uploaded.");
      }
    }
  }

  _handleReaderLoaded(readerEvt) {
    this.binaryString = readerEvt.target.result;
    //alert(this.binaryString);
    this.base64textString= btoa(this.binaryString);
    this.base64_array_object_data.push(btoa(this.binaryString));
    //alert("Data: " + btoa(this.binaryString));
  }


  myimage(fileurl){
 //alert(fileurl)
    window.open(fileurl, '_system', 'location=yes,closebuttoncaption=Fechar,enableViewportScale=yes');
  }

  homeClick(){
    this.cmn.commonHomeNavigation();
  }

  backToList(){
      sessionStorage.setItem('isBackButtonClicked','true');
      this.router.navigate(["company-notificationlist"]);
  }
  getServerData(event) {
   
        
    debugger;
    console.log(event.pageIndex);
    console.log(this.tickettotaldetailsresponse[event.pageIndex]);

   // var json_response;
    var json_totalticketresponse;
    json_response = this.tickettotaldetailsresponse[event.pageIndex];
  
    this.ticketdetailsresponse = json_response;

    json_totalticketresponse = eval('(' + sessionStorage.getItem('Totalticketdata1') + ')');

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
        if (this.tickettotaldetailsresponse[i].id == json_response.id) {
          this.pageIndex = i;
        }
      }


      $("input").prop("disabled", true);
      $("textarea").prop("disabled", true);
      this.textdisc = this.ticketdetailsresponse.description;
     // $("#textarea2").val(this.json_response.description);
      $("#title_id").val(this.ticketdetailsresponse.message);
      $("#state_id").val(this.ticketdetailsresponse.responseObjList);
      $("#notificationtext_id").val(this.ticketdetailsresponse.notificationText);
      //alert(this.json_response.imgLoc);
      // $('#myImg').attr('src', this.json_response.imgLoc);
      var gDrivePath =  this.ticketdetailsresponse.imgLoc.split('//')[1].split('/')[0];
             if(gDrivePath == 'drive.google.com'){
              $("#myImg").hide();
              $('#driveImg').show();
             }else{
              $('#myImg').attr('src', this.ticketdetailsresponse.imgLoc);
             }
     // this.notificationIdd =json_response.id;
   // alert(this.ticketdetailsresponse)
  // this.notificationViewDetails();
  

  }
 

  viewreport(){
    this.router.navigateByUrl("Companey-view-notification-details");
  }
}
