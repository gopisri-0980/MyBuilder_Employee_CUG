import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Http, RequestOptions, Headers } from '@angular/http';
import { CommonComponent } from 'src/app/common/common.component';
import { DeviceDetectorService } from 'ngx-device-detector';
declare const Chart: any;
declare const $: any;
declare const CKEDITOR: any;
declare const swal: any;
declare const tinymce: any;

var json_response;
var json_totalticketresponse;


@Component({
  selector: 'app-escaltion-complaint-details',
  templateUrl: './escaltion-complaint-details.component.html',
  styleUrls: ['./escaltion-complaint-details.component.sass']
})
export class EscaltionComplaintDetailsComponent implements OnInit {

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
  project_name: any;
  ticket_type: any;
  escalation_remarks: string;
  ticketdetailsresponse: any;
  ticketInfo_ticketId: any;
  seekInfo_replies: { "": string; }[];
  seekInfo_tabs: { "name": string; "id": string; }[];
  pdflist: any;
  profilepic: any;
  deviceInfo: any;
  seekInfoJson: any;
  mytickettitle: any;
  close_ticket: boolean;
  forward_ticket: boolean;
  flat_Id: any;
  customer_id: any;
  extenddateIn_milliseconds: any;
  depart_id: any;
  typeof_text: any;
  pending_department: any;
  departmentId: any;
  ticket_esclationId: any;
  ticketInfo_ticketdetailsId: any;
  preloader: boolean;


  loading2: boolean = false;
  loading1: boolean = false;
  flatBookingIdvalue: any;
  ticketIdvalue: any;
  customerhideme1: boolean = true;
  customerhideme: boolean = true;
  tickettotaldetailsresponse: any;
  pageIndex: number;
  currentpageindex: string;
  currentpagenumber: string;
  employeeId: string;
  viewticketData: string;
  ticketListtotaldata: string;
  ticketId: any;

  constructor(private _router: Router, private deviceService: DeviceDetectorService, public route: ActivatedRoute, private router: Router, private http: Http, public cmn: CommonComponent) {
    //  this.seek_infogetTicketDetails();

   
    $('.page-loader-wrapper').hide();
    

    if (sessionStorage.getItem('session_deptid') == "101") {
      this.close_ticket = true;
      this.forward_ticket = true;
    } else {
      this.close_ticket = false;
      this.forward_ticket = false;
    }

     json_response;
     json_totalticketresponse;
    json_response = eval('(' + sessionStorage.getItem('ticketdetails_view') + ')');
  
    this.ticketdetailsresponse = json_response;

    json_totalticketresponse = eval('(' + sessionStorage.getItem('Totalticketdata') + ')');
    this.tickettotaldetailsresponse = json_totalticketresponse;

    this.currentpageindex = sessionStorage.getItem("currentpageindex");

    console.log(json_response);
    console.log(json_totalticketresponse);


    for (var i = 0; i < this.tickettotaldetailsresponse.length; i++) {
      if (this.tickettotaldetailsresponse[i].complaintId == this.ticketdetailsresponse.complaintId) {
        this.pageIndex = i;
      }
    }






    /*--------------Customer Flat Details Start-------------------*/
    var flatdetails = json_response.customerPropertyDetails;
    sessionStorage.setItem("ticket_flatdetails", json_response.customerPropertyDetails)
    this.ticketInfo_ticketdetailsId = json_response.complaintTypeDetailsId;
    // alert(this.ticketInfo_ticketdetailsId);
    this.flat_number = flatdetails.flatNo;
    console.log("---------------" + this.flat_number);
    this.ticketInfo_status = json_response.status;
    this.ticketInfo_ticketId = json_response.complaintId;
    this.ticketInfo_createdDate = json_response.createdDate;
    this.customer_name = json_response.customerPropertyDetails.customerName;
    this.profilepic = json_response.customerPropertyDetails.customerProfilePic;

    this.customer_email = json_response.customerPropertyDetails.customerEmail;
    this.ticket_Id = json_response.complaintId;
    this.department_Name = json_response.department.departmentName;
    this.project_name = json_response.customerPropertyDetails.siteName;
    this.ticket_type = json_response.complaintType.complaintType;
    this.ticket_escalationdate = json_response.estimatedResolvedDate;
//alert(this.ticket_escalationdate)
    this.depart_id = json_response.department.departmentId;
    this.ticket_esclationId = json_response.complaintEscalationId;

    /*--------------Customer Flat Details End-------------------*/

    this.getTicketDetails();


    $(document).ready(function () {
      $('#sel').on('change', function () {
        this.department_val = this.value;
      });

    });

  }





  getServerData(event) {
    console.log(event.pageIndex);
    console.log(this.tickettotaldetailsresponse[event.pageIndex]);

    $("#markascomplaint").prop('disabled', false);
    $("#markascomplaint").css({ 'background': '' });
    $("#markascomplaint").css({ 'color': '' });
    $("#markascomplaint").css({ 'cursor': 'pointer' });
    $("#markascomplaint").addClass("color-1");


    $("#customerinfoid").css({ 'filter': 'alpha(opacity=60)', 'zoom': '1', 'opacity': '0.2' });
    $("#customerinfoid1").css({ 'filter': 'alpha(opacity=60)', 'zoom': '1', 'opacity': '0.2' });
    this.customerhideme1 = true;
    this.customerhideme = true;



    this.total_tickets = 0;
    this.total_open = 0;
    this.tickets_closed = 0;
    this.pdflist = [];


    var json_response;
    var json_totalticketresponse;
    json_response = this.tickettotaldetailsresponse[event.pageIndex];
  
    this.ticketdetailsresponse = json_response;

    json_totalticketresponse = eval('(' + sessionStorage.getItem('Totalticketdata') + ')');
    this.tickettotaldetailsresponse = json_totalticketresponse;

    console.log(json_response);
    console.log(json_totalticketresponse);


    for (var i = 0; i < this.tickettotaldetailsresponse.length; i++) {
      if (this.tickettotaldetailsresponse[i].complaintId == this.ticketdetailsresponse.complaintId) {
        this.pageIndex = i;
      }
    }






    /*--------------Customer Flat Details Start-------------------*/
    var flatdetails = json_response.customerPropertyDetails;
    sessionStorage.setItem("ticket_flatdetails", json_response.customerPropertyDetails)
    this.ticketInfo_ticketdetailsId = json_response.complaintTypeDetailsId;
    // alert(this.ticketInfo_ticketdetailsId);
    this.flat_number = flatdetails.flatNo;
    console.log("---------------" + this.flat_number);
    this.ticketInfo_status = json_response.status;
    this.ticketInfo_ticketId = json_response.complaintId;
    this.ticketInfo_createdDate = json_response.createdDate;
    this.customer_name = json_response.customerPropertyDetails.customerName;
    this.profilepic = json_response.customerPropertyDetails.customerProfilePic;

    this.customer_email = json_response.customerPropertyDetails.customerEmail;
    this.ticket_Id = json_response.complaintId;
    this.department_Name = json_response.department.departmentName;
    this.project_name = json_response.customerPropertyDetails.siteName;
    this.ticket_type = json_response.complaintType.complaintType;
    this.ticket_escalationdate = json_response.estimatedResolvedDate;

    this.depart_id = json_response.department.departmentId;
    this.ticket_esclationId = json_response.complaintEscalationId;

    /*--------------Customer Flat Details End-------------------*/

    this.getTicketDetails();


    $(document).ready(function () {
      $('#sel').on('change', function () {
        this.department_val = this.value;
      });

    });


  }




  ngAfterViewInit() {

  }

  ngOnInit() {

    'use strict';
    $("#ckeditorError").hide();
    $(function () {


      $("#customerinfoid").css({ 'filter': 'alpha(opacity=60)', 'zoom': '1', 'opacity': '0.2' });
      $("#customerinfoid1").css({ 'filter': 'alpha(opacity=60)', 'zoom': '1', 'opacity': '0.2' });


      //CKEditor
      CKEDITOR.replace('ckeditor');
      CKEDITOR.config.height = 300;
      CKEDITOR.config.scayt_autoStartup = true;
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
      //Date
      // var $demoMaskedInput = $('.demo-masked-input');
      // $demoMaskedInput.find('.date').inputmask('dd/mm/yyyy', { placeholder: '__/__/____' });

      //initBasicSelect();
    });
    //method for CKEditor KeyPress event for hide the error message
    CKEDITOR.on('instanceCreated', function (e) {
      e.editor.on('contentDom', function () {
        e.editor.document.on('keyup', function (event) {
          // keyup event in ckeditor
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
    //console.log("A: "+ CKEDITOR.instances["ckeditor"].getData());
  }

  handleFileSelect(evt) {
    debugger;
    var files = evt.target.files;
    var file_val = evt.target.value;
    // alert("------------"+file_name);
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
    this.base64textString = btoa(this.binaryString);
    this.base64_array_object_data.push(btoa(this.binaryString));
    //alert("Data: " + btoa(this.binaryString));
  }
  //update ticket functionality
  public replyMessage() {
    console.log("data: " + CKEDITOR.instances["ckeditor"].getData());
    var ckeditorVal = CKEDITOR.instances["ckeditor"].getData();
    if (ckeditorVal == "") {
      $("#ckeditorError").show();
      $("#CKEditiorDiv").addClass("borderforerror");
      return false;
    }

    this.myUpdate(ckeditorVal);

  }

  //this method for to view the flat details
  viewflatDetails(custId, flatId) {
    // alert(custId+"c-------------F"+flatId);
    sessionStorage.setItem("common_for_flats_child", "escalation_details");
    sessionStorage.setItem('custIdd', custId);
    sessionStorage.setItem('flatIdd', flatId);
    this.router.navigate(["ticket/flatdetails"]);
  }



  sendSeekInfo_forward_Data() {
    var mydepartval = $("#sel").val();
    if (mydepartval == "" || mydepartval == undefined || mydepartval == "undefined" || mydepartval == "select") {
      alert("Please select department name");
      return false;
    }

    var typeof_val = mydepartval.split(',')[0];
    var genericId_val = mydepartval.split(',')[1];

    console.log("typeof_val :" + typeof_val);
    console.log("genericId_val :" + genericId_val);
    this.seek_Forward_Infocalling(this.ckeditorVal, typeof_val, genericId_val);
  }
  /*--------------------seek info modal popup end------------------*/
  //to view the Customer Details
  public viewCustomerDetails(custId, flatId) {
    // alert(custId+"c-------------F"+flatId);
    sessionStorage.setItem("common_for_flats_child", "escalation_details");
    sessionStorage.setItem('custIdd', custId);
    sessionStorage.setItem('flatIdd', flatId);
    this.router.navigate(["viewcustomerdetails"]);
  }

  getTicketDetails() {
    $(".page-loader-wrapper").show();
    this.preloader = true;
    let url = this.cmn.commonUrl + "employeeComplaint/getComplaint.spring";
    //  let url = "http://129.154.74.18:8888/employeeservice/employeeTicket/getTicket.spring"
    console.log("url :" + url);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "complaintId": "" + this.ticketInfo_ticketId,
      "requestUrl": "getComplaint",
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "complaintTypeDetailsId": "" + this.ticketInfo_ticketdetailsId
    }
    console.log("----body :" + JSON.stringify(body));
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $(".page-loader-wrapper").hide();
      this.preloader = false;
      console.log("Escalation Ticket Details response----------" + JSON.stringify(resp));
      if (resp.responseCode == 200) {
        this.pdf_array = resp.viewComplaintsPdfs;
        this.ticketINfomessage = resp.complaintResponseList[0].description;
        //this.pdflist = resp.complaintResponseList[0].fileInfos;

        this.ticketId = resp.complaintResponseList[0].ticketId;
        
        this.ticketmessageData = resp.complaintResponseList[0].complaintComments;

        // this.total_tickets = resp.totalTickets;
        // this.total_open = resp.open;
        // this.tickets_closed = resp.closed;

        this.flat_number = resp.complaintResponseList[0].customerPropertyDetails.flatNo;
        this.flat_Id = resp.complaintResponseList[0].customerPropertyDetails.flatId;
        this.customer_id = resp.complaintResponseList[0].customerPropertyDetails.customerId;
        this.typeof_text = resp.complaintResponseList[0].department.typeOf;
        this.departmentId = resp.complaintResponseList[0].department.departmentId;
        this.pending_department = resp.complaintResponseList[0].department.departmentName;

        this.flatBookingIdvalue = resp.complaintResponseList[0].flatBookingId;
        this.ticketIdvalue = resp.complaintResponseList[0].complaintId;
        
        //  sessionStorage.setItem('flatId', this.flat_Id);
        //  sessionStorage.setItem('customer_id', this.customer_id);
        sessionStorage.setItem('getPageName', "escalationTicketDetailsPage");

        //  alert(this.typeof_text);
      } else if (resp.responseCode == 440) {
        $(".page-loader-wrapper").hide();
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
      }
    },
      error => {
        $(".page-loader-wrapper").hide();
        this.preloader = false;
        var error = JSON.parse(error._body).responseCode;
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }

  /*------------------------------Update Button Functionality Start------------------------*/
  myUpdate(ckeditor_msg) {
    debugger;
    /*-------------------plan text convertion start------------------------*/
    var span = document.createElement('span');
    span.innerHTML = ckeditor_msg;
    this.myconvert_text = span.textContent || span.innerText;
    console.log(this.myconvert_text)
    /*-------------------plan text convertion end------------------------*/
    console.log("name :" + this.file_name_array);
    console.log(this.base64_array_object_data.length + "---" + this.file_name_array.length);
    for (var i = 0; i < this.base64_array_object_data.length; i++) {
      this.File_Info.push({
        "id": "" + i,
        "name": "" + this.file_name_array[i],
        "base64": "" + this.base64_array_object_data[i]
      });
    }
    console.log("-------------" + JSON.stringify(this.File_Info));
    let temp = JSON.stringify(this.File_Info);
    this.preloader = true;
    var url = this.cmn.commonUrl + "employeeComplaint/forwardComplaintDetails.spring";
    //  var url;


    console.log("url :" + url);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body;
    if (this.typeof_text == "EMPLOYEE") {
      body = {
        "complaintId": "" + this.ticketInfo_ticketId,
        //"fromId":""+ sessionStorage.getItem('session_empid'),                                             
        // "fromType":"8",                                           
        "toId": "" + this.departmentId,
        "message": "" + this.myconvert_text,
        "requestUrl": "forwardComplaintDetails.spring",
        "complaintEscalationId": "" + this.ticket_esclationId,
        "type": "PM",
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey")
      }
    } else {
      body = {
        "complaintId": "" + this.ticketInfo_ticketId,
        // "fromId":""+ sessionStorage.getItem('session_empid'),                                             
        // "fromType":"8",                                           
        "toDeptId": "" + this.departmentId,
        "message": "" + this.myconvert_text,
        "requestUrl": "forwardComplaintDetails.spring",
        "complaintEscalationId": "" + this.ticket_esclationId,
        "type": "PM",
        "sessionKey": "" + sessionStorage.getItem("login_sessionkey")
      }
    }


    console.log("----body :" + JSON.stringify(body));
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      this.preloader = false;
      console.log("Ticket Forward response----------" + JSON.stringify(resp));
      if (resp.responseCode == 200) {
        swal("Ticket has been Forwarded.");
        this.router.navigate(["Escalation_Complaints"]);
        this.ckeditorVal = "";

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
        this.preloader = false;
        var error = JSON.parse(error._body).responseCode;
        //alert(error);
        this.preloader = false;
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }

  /*------------------------------Update Button Functionality End------------------------*/

  /*---------------------------Seek Info Button Functionality Start----------------------*/
  seek_Forward_Infocalling(ckmsg, typeofval, genericid) {
    debugger;
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
    this.preloader = true;
    let url;


    if (this.clickedButtonName == "Forward") {
      url = this.cmn.commonUrl + "employeeComplaint/forwardComplaintDetails.spring";
      //http://localhost:8080/employeeservice/employeeTicket/forwardTicketDetails.spring
    }

    console.log("url :" + url);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body;

    if (this.clickedButtonName == "Forward") {
      if (typeofval == 9) {
        body = {

          "complaintId": "" + this.ticketInfo_ticketId,
          "departmentId": "" + sessionStorage.getItem('session_deptid'),  //login                                   
          "fromDeptId": "" + sessionStorage.getItem('session_deptid'),   //login   same as department                                  
          "fromId": "" + sessionStorage.getItem('session_empid'),      //login                                       
          "fromType": "8",       //login                                    
          "toDeptId": "" + genericid,
          "toId": " 0",
          "message": "" + this.myconvert_text,
          "requestUrl": "forwardComplaintDetails.spring",
          "fileInfos": this.File_Info


        }
      } else if (typeofval == 8) {
        body = {
          "complaintId": "" + this.ticketInfo_ticketId,
          "departmentId": "" + sessionStorage.getItem('session_deptid'),  //login                                   
          "fromDeptId": "" + sessionStorage.getItem('session_deptid'),   //login   same as department                                  
          "fromId": "" + sessionStorage.getItem('session_empid'),      //login                                       
          "fromType": "8",       //login                                    
          "toId": "" + genericid,
          "toDeptId": " 0",
          "message": "" + this.myconvert_text,
          "requestUrl": "forwardComplaintDetails.spring",
          "fileInfos": this.File_Info
        }
      }



    }



    console.log("----body :" + JSON.stringify(body));
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      this.preloader = false;

      if (resp.responseCode == 200) {

        if (this.clickedButtonName == "Forward") {

          console.log("Ticket Forward response----------" + JSON.stringify(resp));
          swal("Your ticket has been forwarded.");
          this.router.navigate(["View-My-Complaints"]);
          $('.modal').modal('hide');
          this.ckeditorVal = "";
          // this.getTicketDetails();
        } else {
          console.log("Ticket seekInfo response----------" + JSON.stringify(resp));
          swal("Your request has been sent.");
          $('.modal').modal('hide');
          this.ckeditorVal = "";

          this.getTicketDetails();
        }

        //this.router.navigate(["ticket/ticketdetails"]);
        // ckeditor_msg = "";
        //$("#files").val("");
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
        this.preloader = false;
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
        console.log(error);

      }
    );
  }
  /*---------------------------Seek Info Button Functionality End----------------------*/
  /*-------------------------------------Forward Button Start---------------------------------*/
  openForwardModal() {
    debugger;
    this.ckeditorVal = CKEDITOR.instances["ckeditor"].getData();
    if (this.ckeditorVal == "") {
      $("#ckeditorError").show();
      $("#CKEditiorDiv").addClass("borderforerror");
      return false;
    }

    var deptId = sessionStorage.getItem('session_deptid');

    if (deptId == "101") {
      $("#seekinfo").modal();
      this.modellabel_name = "Forward";
      sessionStorage.setItem('myseekforwardInfo', 'Forward');

    } else {
      this.employee_forward(this.ckeditorVal);
    }


  }
  /*-------------------------------------Forward Button End---------------------------------*/




  pdfClick(val) {
    window.open(val, '_system', 'location=yes,closebuttoncaption=Fechar,enableViewportScale=yes');
  }

  /*----------------------------------employee seek and forward buttons start--------------*/
  employee_forward(ckeditor) {
    debugger;
    console.log("clicked button name :" + sessionStorage.getItem('myseekforwardInfo'));
    this.clickedButtonName = sessionStorage.getItem('myseekforwardInfo');
    //return false;
    /*-------------------plan text convertion start------------------------*/
    var span = document.createElement('span');
    span.innerHTML = ckeditor;
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
    this.preloader = true;
    let url;

    url = this.cmn.commonUrl + "employeeComplaint/forwardComplaintDetails.spring";
    //http://localhost:8080/employeeservice/employeeTicket/forwardTicketDetails.spring

    console.log("url :" + url);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body;
    body = {
      "complaintId": "" + this.ticketInfo_ticketId,
      //"departmentId":""+ sessionStorage.getItem('session_deptid'),  //login                                   
      // "fromDeptId":""+ sessionStorage.getItem('session_deptid'),   //login   same as department                                  
      //"fromId":""+sessionStorage.getItem('session_empid'),      //login                                       
      // "fromType":"8",       //login                                    
      "toId": "0",
      "toDeptId": " 0",
      "message": "" + this.myconvert_text,
      "requestUrl": "forwardComplaintDetails.spring",
      "fileInfos": this.File_Info,
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey")

    }

    console.log("----body :" + JSON.stringify(body));
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      this.preloader = false;

      if (resp.responseCode == 200) {

        console.log("Ticket Forward response----------" + JSON.stringify(resp));
        swal("Your ticket has been forwarded.");
        $('.modal').modal('hide');
        this.ckeditorVal = "";
        this.getTicketDetails();
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
        this.preloader = false;
        var error = JSON.parse(error._body).responseCode;
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }

      }
    );
  }
  /*----------------------------------employee seek and forward buttons end--------------*/

  custom_Css(id) {
    //Logic here;
    debugger;
    if (id == 0) {
      return 'tab-pane fade in active show'
    } else {
      return 'tab-pane fade'
    }
  }

  makeasPublic(url) {
    if (confirm("Do you want make As public ?")) {
      //sessionStorage.clear();
      this.makeas_Public(url);
    } else { }
  }
  /*----------------Make As Public---------------------*/
  makeas_Public(myurl) {
    //return false;
    var fileInfo = [
      {
        "id": "0",
        "name": "myurl"
      }
    ]

    this.preloader = true;
    let url = this.cmn.commonUrl + "employeeComplaint/makeAsPublic.spring";
    //  http://129.154.74.18:8888/employeeservice/employeeTicket/makeAsPublic.spring
    console.log("url :" + url);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {

      "complaintId": "" + this.ticket_Id,
      "requestUrl": "makeAsPublic",
      "fileInfos": fileInfo,
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey")
    }
    console.log("----body :" + JSON.stringify(body));
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      this.preloader = false;
      console.log("make as public response----------" + JSON.stringify(resp));
      if (resp.responseCode == 200) {
        console.log("make as public success");
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
        this.preloader = false;
        var error = JSON.parse(error._body).responseCode;
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }
  /*----------------Make As Public---------------------*/
  homeClick() {
    this.cmn.commonHomeNavigation();
  }

  escalationticketlist() {
    sessionStorage.setItem("common_for_flats", "escalation_ticket");
    this.router.navigate(['Escalation_Complaints']);
  }



  Attachmentsfun() {
    this.loading1 = true;
    //  $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "employeeComplaint/getComplaintAdditionalDetails.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "complaintId": this.ticketIdvalue,
      "flatBookingId": this.flatBookingIdvalue,
      "requestUrl": "getComplaint",
      "type": "getAttachments"
    }

    console.log(JSON.stringify(body));

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
  console.log(JSON.stringify(resp));
      this.loading1 = false;
      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        $("#customerinfoid1").css({ 'filter': 'alpha(opacity=60)', 'zoom': '1', 'opacity': '1' });
        if (resp.complaintResponseList[0].fileInfos.length !== 0) {
          this.pdflist = resp.complaintResponseList[0].fileInfos;
          this.customerhideme1 = false;
        } else {
          this.customerhideme1 = true
          swal("No attachments found");
          return false;

        }

      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        swal(resp.status);
      }
    },
      error => {
        this.loading1 = false;
        var error = JSON.parse(error._body).responseCode;
        //$('.page-loader-wrapper').hide();
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }


  Customerinfofun() {
    this.loading2 = true;
    //$('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "employeeComplaint/getComplaintAdditionalDetails.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "complaintId": this.ticketIdvalue,
      "flatBookingId": this.flatBookingIdvalue,
      "requestUrl": "getComplaint",
      "type": "getPastComplaintHistory"

    }

    console.log(JSON.stringify(body));

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      console.log(JSON.stringify(resp));
      //  $('.page-loader-wrapper').hide();
      this.loading2 = false;
      if (resp.responseCode == 200) {

        //  $('.page-loader-wrapper').hide();
        this.total_tickets = resp.totalComplaints;
        this.total_open = resp.open;
        this.tickets_closed = resp.closed;

        $("#customerinfoid").css({ 'filter': 'alpha(opacity=60)', 'zoom': '1', 'opacity': '1' });
        this.customerhideme = false;
      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        swal(resp.status);
      }
    },
      error => {
        this.loading2 = false;
        var error = JSON.parse(error._body).responseCode;
        // $('.page-loader-wrapper').hide();
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );

  }



  viewticketDetails(){

    sessionStorage.setItem("common_for_flats", "Complaints-view-details");
      this.currentpagenumber = sessionStorage.getItem('currentPageNo');
      if (this.currentpagenumber == undefined) {
        this.currentpagenumber = JSON.stringify(1);
      }
      sessionStorage.setItem('currentPageNo', this.currentpagenumber);
      sessionStorage.setItem("from_Viewalltickets", "");
      this.viewticketData = JSON.stringify(json_response);
      this.ticketListtotaldata = JSON.stringify(json_totalticketresponse);
      this.ticketListtotaldata = JSON.stringify(json_totalticketresponse);

      // const host: string = location.origin;
      // const url: string = host + '/#' + String(this.router.createUrlTree(['tickets-view-details'],{ state: json_totalticketresponse} ));
      // window.open(url, '_blank');
  sessionStorage.setItem("ticket_new_tab" , "ticket_new_tab");

      const host: string = location.origin;
      const url: string = host + '/Ams_apps/#' + String(this.router.createUrlTree(['tickets-view-details'],{ state: json_totalticketresponse }));
      window.open(url, '_blank');


      //this.router.navigate(["tickets-view-details"], { state: json_totalticketresponse });
      sessionStorage.setItem('ticketdetails_view', this.viewticketData);
      sessionStorage.setItem("Totalticketdata", JSON.stringify(json_totalticketresponse));
      sessionStorage.setItem('buttonstutus', '');
      sessionStorage.setItem("currentpageindex", JSON.stringify(this.current_Page));


    
  }
  current_Page(current_Page: any): string {
    throw new Error('Method not implemented.');
  }

  
}