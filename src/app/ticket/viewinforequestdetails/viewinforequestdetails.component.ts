import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Http, RequestOptions, Headers } from '@angular/http';
import { CommonComponent } from 'src/app/common/common.component';
import { NgxSpinnerService } from 'ngx-spinner';
declare const Chart: any;
declare const $: any;
declare const CKEDITOR: any;
declare const swal: any;
declare const tinymce: any;
var file_limit;
@Component({
  selector: 'app-viewinforequestdetails',
  templateUrl: './viewinforequestdetails.component.html',
  styleUrls: ['./viewinforequestdetails.component.sass']
})
export class ViewinforequestdetailsComponent implements OnInit {

  ticketmessageData: any;
  sub: any;
  id: any;
  messageReplay: String;
  escalationDate: any;
  flatdetailstoview: any;
  ckeditorError: string = "Please enter message";
  private base64textString: String = "";
  total_tickets: any;
  open_tickets: any;
  total_closed: any;
  clased_tickets: string;
  closed_tickets: string;
  flat_number: any;
  ticket_Id: any;
  department_Name: any;
  ticket_escalationdate: any;
  customer_name: any;
  customer_email: any;
  ticketInfo_status: any;
  ticketInfo_createdDate: any;
  total_open: any;
  tickets_closed: any;
  ticketINfomessage: any;
  pdf_array: any;
  binaryString: any;
  base64_array_object_data: any = [];
  file_name_array: any = [];
  File_Info: any = [];
  myconvert_text: string;
  ckeditorVal: any;
  modellabel_name: string;
  clickedButtonName: string;
  display: any;
  seekInfoJson: any;
  seekInfo_tabs: { "name": string; "id": string; }[];
  mytickettitle: any;
  created_date: any;
  view_seekinfo_ticketId: any;
  view_seekinfo_escalationdate: any;
  view_seekinfo_status: any;
  view_seekinfo_pend_depart: any;
  view_seekinfo_sitename: any;
  view_seekinfo_flatId: any;
  view_seekinfo_ticket_type: any;
  seekinfobutton : any
  relybutton : any;
  flat_Id: any;
  customer_id: any;
  reply_ticket: boolean;
  attach_file: boolean;
  ckeditor_input: boolean;
  constructor(private spinner: NgxSpinnerService, public route: ActivatedRoute, private router: Router, private http: Http, public cmn: CommonComponent) {
  //  this.seekinfobutton = true;
  //  this.relybutton = true;
  debugger;
   var json_response = eval('(' + sessionStorage.getItem('viewtickeinfo') + ')');

    this.ticket_Id = json_response.ticketId;
    console.log("status response"+json_response.status);
    // if (json_response.status == "Open") {
     //  $("#hidingclass").css('display', 'none')
    //  this.seekinfobutton = false;
    //  this.reply_ticket = false;
    // }else{
    //   this.seekinfobutton = true;
    //   this.reply_ticket = true;
    // }

    $(document).ready(function () {
      $('#sel').on('change', function () {
        this.department_val = this.value;
      });
    });

  }
  ngOnInit() {
    this.getTicketDetails();

  }
  ngAfterViewInit() {

  }

  handleFileSelect(evt) {
   // debugger;
   this.file_name_array = [];
   this.base64_array_object_data = [];
   this.File_Info = [];
    var files = evt.target.files;
  //  alert(files.length);
    var file_val = evt.target.value;
    // alert("------------"+file_name);
    console.log(evt.target.value);
    console.log(evt.target.value);
    const fsize = files.item(i).size; 
    file_limit = Math.round((fsize / 1024)); 
   if (file_limit >= 25600) { 
    $("#files").val(null);
    swal("Your max file size limit is 25 MB, Please enter the file link in the text box."); 
    $('#fileLinkField').show();
       return false;
   }else{
    $('#fileLinkField').hide();

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
   
  }

  _handleReaderLoaded(readerEvt) {
    this.binaryString = readerEvt.target.result;
    //alert(this.binaryString);
    this.base64textString = btoa(this.binaryString);
    this.base64_array_object_data.push(btoa(this.binaryString));
    //alert("Data: " + btoa(this.binaryString));

  }


 
  /*--------------------seek info modal popup start------------------*/
  public openSeekInfoModal(ival) {
   // debugger;
    this.ckeditorVal = CKEDITOR.instances["ckeditor"+ival].getData();
    if (this.ckeditorVal == "") {
      $("#ckeditorError"+ival).show();
      $("#CKEditiorDiv"+ival).addClass("borderforerror");
      return false;
    }
    $("#seekinfo"+ival).modal();
    this.modellabel_name = "Seek Info";
    sessionStorage.setItem('myseekforwardInfo', 'Seek Info');
    this.departmentList(ival) ;
  }

  /*------------------------department list start-----------------------------------*/
  departmentList(dval) {
    debugger;
    let url = this.cmn.commonUrl + "employeeTicket/getTicketForwardMenuDetails.spring";
    // http://129.154.74.18:8888/employeeservice/employeeTicket/getTicketForwardMenuDetails.spring
    console.log("url :" + url);
  
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      //"employeeId": ""+sessionStorage.getItem('session_empid')
      "sessionKey":""+sessionStorage.getItem("login_sessionkey")
    }
    console.log("----body :" + JSON.stringify(body));
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      //$('.page-loader-wrapper').hide();
      console.log("Department list response----------" + JSON.stringify(resp));
      if (resp.responseCode == 200) {
        /* basic select start*/
       $('select').formSelect();
       $('#sel'+dval).formSelect();
        //var data = [{ id: 0, name: "--Select--" },{ id: 1, name: "CRM Department" }, { id: 2, name: "Purchase Department" }, { id: 3, name: "QS Department" }];

        var Options = "";
        $('#sel'+dval).html('');
        $.each(resp.ticketForwardMenuList, function (i, val) {
         
          $('#sel'+dval).append("<option value='" + val.typeOf + "," + val.genericId + "'>" + val.item + "</option>");
          $('#sel'+dval).formSelect();
        });
        /* basic select end*/
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
        $('.page-loader-wrapper').hide();
        var error=JSON.parse(error._body).responseCode;
        if(error == 440){
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }
  /*------------------------department list end-----------------------------------*/
  //update ticket functionality
  public replyMessage(ival,deptid, reqid, depttype) {
    debugger;
   // $('.page-loader-wrapper').show();
    console.log("data: " + CKEDITOR.instances["ckeditor"+ival].getData());
    var ckeditorVal = CKEDITOR.instances["ckeditor"+ival].getData();
    if (ckeditorVal == "") {
      $("#ckeditorError"+ival).show();
      $("#CKEditiorDiv"+ival).addClass("borderforerror");
      return false;
    }
    // swal("Good job!", "Successfully ticket updated ", "success");
    CKEDITOR.instances["ckeditor"+ival].setData('');
    //console.log("deptid :"+deptid);
    // console.log("reqid :"+reqid);
    // console.log("depttype :"+depttype);
    if (confirm("Are you sure send the message ?")) {
      this.myUpdate(ckeditorVal, deptid, reqid, depttype);
    }
   

  }
  /*------------------------------Update Button Functionality Start------------------------*/
  myUpdate(ckeditor_msg, dept_id, req_id, dept_type) {

    /*-------------------plan text convertion start------------------------*/
    // var span = document.createElement('span');
    // span.innerHTML = ckeditor_msg;
    // this.myconvert_text = span.textContent || span.innerText;
    // console.log(this.myconvert_text)
    // /*-------------------plan text convertion end------------------------*/
  
    console.log(this.base64_array_object_data.length + "---" + this.file_name_array.length);
    this.File_Info = [];
    for (var i = 0; i < this.base64_array_object_data.length; i++) {
      this.File_Info.push({
        "id": "" + i,
        "name": "" + this.file_name_array[i],
        "base64": "" + this.base64_array_object_data[i]

      });
    }
    console.log("-------------" + JSON.stringify(this.File_Info));
    let temp = JSON.stringify(this.File_Info);
    //$('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "employeeTicket/insertSeekInfoDetails.spring";
    //http://localhost:8080/employeeservice/employeeTicket/insertSeekInfoDetails.spring
    console.log("url :" + url);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body;
    
    if (dept_type == "9") {
      body = {
        "ticketId": "" + this.ticket_Id,
       // "fromId": ""+sessionStorage.getItem('session_empid'), //login
       // "fromType": "8", //fixed
     //"fromDeptId": ""+sessionStorage.getItem('session_deptid'), //login
        "toId": "0",
        "toDeptId": "" + dept_id,
        "toType": "" + dept_type,
        "requestUrl": "insertSeekInfoDetails.spring",
        "ticketSeekInforequestId": "" + req_id,
        "message": ckeditor_msg,
        "fileInfos": this.File_Info,
        "sessionKey":""+sessionStorage.getItem("login_sessionkey"),
        "externalDriveFileLocation" : $('#driveLinkField').val()
      }
    } else if (dept_type == "8") {
      body = {
     
        "ticketId": "" + this.ticket_Id,
        //"fromId": ""+ sessionStorage.getItem('session_empid'), //login
       // "fromType": "8", //fixed
       // "fromDeptId": ""+sessionStorage.getItem('session_deptid'), //login
        "toId": "" + dept_id,
        "toDeptId": "0",
        "toType": "" + dept_type,
        "requestUrl": "ticketSpecifictviewRequestInfo.spring",
        "ticketSeekInforequestId": "" + req_id,
        "message": this.myconvert_text,
        "fileInfos": this.File_Info,
        "sessionKey":""+sessionStorage.getItem("login_sessionkey")
      }
    }

    console.log("----body :" + JSON.stringify(body));
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      //$('.page-loader-wrapper').hide();
      console.log("Ticket seekinfo reply response----------" + JSON.stringify(resp));
      if (resp.responseCode == 200) {
        // swal("Good job!", "Ticket has been Updated.", "success");
        // this.router.navigate(["ticket/ticketdetails"]);
        //ckeditor_msg = "";
         $("#files").val("");
         this.File_Info = [];
         this.file_name_array = [];
         this.base64_array_object_data = [];
         $('#driveLinkField').val('');
         this.getTicketDetails();
      }else if(resp.responseCode == 440){
        $('.page-loader-wrapper').hide();
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
        var error=JSON.parse(error._body).responseCode;
        if(error == 440){
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }

  /*------------------------------Update Button Functionality End------------------------*/


  sendSeekInfo_forward_Data(ival) {
    var mydepartval = $("#sel"+ival).val();
    if (mydepartval == "" || mydepartval == undefined || mydepartval == "undefined" || mydepartval == "select") {
      alert("Please select department name");
      return false;
    }

    var typeof_val = mydepartval.split(',')[0];
    var genericId_val = mydepartval.split(',')[1];

    console.log("typeof_val :" + typeof_val);
    console.log("genericId_val :" + genericId_val);
    this.seek_Forward_Infocalling(this.ckeditorVal, typeof_val, genericId_val,ival);
  }
  /*--------------------seek info modal popup end------------------*/
  //to view the Customer Details
  public viewCustomerDetails() {
    this.router.navigate(["customer/viewcustomerdetails"]);
  }

  

  getTicketDetails() {
   // debugger;
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "employeeTicket/ticketSpecifictviewRequestInfo.spring";
    //  http://localhost:8080/employeeservice/employeeTicket/ticketSpecifictviewRequestInfo.spring
    console.log("url :" + url);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
  
    var body = {
      "ticketId": "" + this.ticket_Id,
     // "fromId": ""+sessionStorage.getItem('session_empid'),
     // "fromType": "8",
     // "fromDeptId": ""+ sessionStorage.getItem('session_deptid'),
      "requestUrl": "ticketSpecifictviewRequestInfo.spring",
      "sessionKey":""+sessionStorage.getItem("login_sessionkey")
    }
    console.log("----body :" + JSON.stringify(body));
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      console.log("TicketDetails response----------" + JSON.stringify(resp));
    //  debugger;
      if (resp.responseCode == 200) {
        this.seekInfoJson = resp;
        this.mytickettitle = resp.ticketResponse.description;
        this.view_seekinfo_ticket_type = resp.ticketResponse.title
        this.created_date = resp.ticketResponse.createdDate;
        this.pdf_array = resp.ticketResponse.fileInfos;
       this.view_seekinfo_ticketId = resp.ticketResponse.ticketId;
       this.view_seekinfo_escalationdate = resp.ticketResponse.estimatedResolvedDate;
       this.view_seekinfo_status = resp.ticketResponse.status;
       this.view_seekinfo_pend_depart = resp.ticketResponse.pendingDepartmentName;
       this.view_seekinfo_sitename = resp.ticketResponse.customerPropertyDetails.siteName;
       this.view_seekinfo_flatId = resp.ticketResponse.customerPropertyDetails.flatNo;
        this.flat_Id = resp.ticketResponse.customerPropertyDetails.flatId;
        this.customer_id = resp.ticketResponse.customerPropertyDetails.customerId;
        if (this.view_seekinfo_status == "Closed") {
           //$("#hidingclass").css('display', 'none')
           this.ckeditor_input = false;
           this.attach_file = false;
           this.seekinfobutton = false;
           this.reply_ticket = false;
          }else{
            this.ckeditor_input = true;
            this.attach_file = true;
            this.seekinfobutton = true;
            this.reply_ticket = true;
          }
        sessionStorage.setItem('flatId',this.flat_Id);
        sessionStorage.setItem('customer_id',this.customer_id);
      console.log(resp.genericTicketSeekInfos.length);
       
           for(var i=0;i<this.seekInfoJson.genericTicketSeekInfos.length;i++){
      //  alert("-------"+i);
        (function(n) {
            setTimeout(function(){
            console.log(n)  
          'use strict';
          $("#ckeditorError"+n).hide();
          $(function () {
          //  alert("in finction"+n)
            //CKEditor
            CKEDITOR.replace('ckeditor'+n);
            CKEDITOR.config.height = 300;
            //TinyMCE
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
          //method for CKEditor KeyPress event for hide the error message
          CKEDITOR.on('instanceCreated', function (e) {
            e.editor.on('contentDom', function () {
              e.editor.document.on('keyup', function (event) {
                // keyup event in ckeditor
                $("#CKEditiorDiv"+n).removeClass("borderforerror");
                $("#ckeditorError"+n).hide();
              }
              );
            });
          });
           },100)
          }(i));
          }
     
      }else if(resp.responseCode == 440){
        $('.page-loader-wrapper').hide();
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
        var error=JSON.parse(error._body).responseCode;
        if(error == 440){
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }

  

  /*---------------------------Seek Info Button Functionality Start----------------------*/
  seek_Forward_Infocalling(ckmsg, typeofval, genericid,ivalue) {
    console.log("clicked button name :" + sessionStorage.getItem('myseekforwardInfo'));
    this.clickedButtonName = sessionStorage.getItem('myseekforwardInfo');
    //return false;
    /*-------------------plan text convertion start------------------------*/
    var span = document.createElement('span');
    span.innerHTML = ckmsg;
    this.myconvert_text = span.textContent || span.innerText;
    console.log(this.myconvert_text)
    /*-------------------plan text convertion end------------------------*/
    /*-------------------FileInfo Start------------------------*/
    console.log(this.base64_array_object_data.length + "---" + this.file_name_array.length);
    for (var i = 0; i < this.base64_array_object_data.length; i++) {
      this.File_Info.push({
        "id": "" + i,
        "name": "" + this.file_name_array[i],
        "base64": "" + this.base64_array_object_data[i]
      });
    }
    console.log("-------------" + JSON.stringify(this.File_Info));
    /*-------------------FileInfo End------------------------*/
    debugger;
    $('.page-loader-wrapper').show();
   
      let url = this.cmn.commonUrl + "employeeTicket/seekInfoTicketDetails.spring";
      //http://localhost:8080/employeeservice/employeeTicket/seekInfoTicketDetails.spring

    console.log("url :" + url);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body;

      if (typeofval == 9) {
        body = {
          "ticketId":""+this.ticket_Id,
          //"fromId":""+sessionStorage.getItem('session_empid'),
        //  "fromType":"8",
         // "fromDeptId":""+sessionStorage.getItem('session_deptid'),
          "message":""+ckmsg,
          "toDeptId":""+genericid,
          "toId":"0",
          "requestUrl":"seekInfoTicketDetails.spring",
         // "departmentId":""+sessionStorage.getItem('session_deptid'),
          "fileInfos":this.File_Info,
          "sessionKey":""+sessionStorage.getItem("login_sessionkey"),
          "externalDriveFileLocation" : $('#driveLinkField').val()
        }
      } else if (typeofval == 8) {
        body = {
          "ticketId":""+this.ticket_Id,
         // "fromId":""+sessionStorage.getItem('session_empid'),
         // "fromType":"8",
         // "fromDeptId":""+sessionStorage.getItem('session_deptid'),
          "message":""+ckmsg,
          "toId":""+genericid,
          "toDeptId":"0",
          "requestUrl":"seekInfoTicketDetails.spring",
         // "departmentId":""+sessionStorage.getItem('session_deptid'),
          "fileInfos":this.File_Info,
          "sessionKey":""+sessionStorage.getItem("login_sessionkey"),
          "externalDriveFileLocation" : $('#driveLinkField').val()
        }
      }
    
    console.log("----body :" + JSON.stringify(body));
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#fileLinkField').hide();
          console.log("Ticket Forward response----------" + JSON.stringify(resp));
          swal("Good job!", "Your ticket information request has been sent.", "success");
          $('.modal').modal('hide');
         // CKEDITOR.instances["ckeditor"+ivalue].setData('');
         $("#files").val(null);
          this.file_name_array = [];
          this.base64_array_object_data = [];
          this.File_Info = [];
          $('#driveLinkField').val('');
         // alert(this.File_Info);
         this.getTicketDetails();
          this.router.navigate(["ticket/viewinforequestdetails"]);
      }else if(resp.responseCode == 440){
        $('.page-loader-wrapper').hide();
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
        var error=JSON.parse(error._body).responseCode;
        if(error == 440){
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }

      }
    );
  }
  /*---------------------------Seek Info Button Functionality End----------------------*/

  customCss(id) {
    //Logic here;
    if (id == 0) {
      return 'tab-pane fade in active show'
    } else {
      return 'tab-pane fade'
    }
  }

  customCsstabs(id){
    if (id == 0) {
      return 'active'
    } else {
      return 'tab-pane fade show'
    }
  }

  pdfClick(val){
    window.open(val, '_system', 'location=yes,closebuttoncaption=Fechar,enableViewportScale=yes');
  }

  ticketlink(){
    sessionStorage.setItem('ticketdetails_view',JSON.stringify(this.seekInfoJson.ticketResponse));
    //alert(JSON.stringify(this.seekInfoJson.ticketResponse));
    //this.router.navigate(["ticket/ticketdetails"]);
  }

  viewflatDetails(custId,flatId){
    sessionStorage.setItem("common_for_flats_child", "view_info_request_details");
    sessionStorage.setItem('custIdd',custId);
    sessionStorage.setItem('flatIdd',flatId);
  
      this.router.navigate(["ticket/flatdetails"]);
  }
  homeClick(){
    this.cmn.commonHomeNavigation();
  }
}   
