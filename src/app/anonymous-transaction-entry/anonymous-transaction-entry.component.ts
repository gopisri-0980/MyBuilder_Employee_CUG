import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonComponent } from '../common/common.component';
import { unwatchFile } from 'fs';
import { DomSanitizer } from '@angular/platform-browser';

import { Http } from '@angular/http';
declare const $: any;
declare const swal: any;
var file;
var file_second;

@Component({
  selector: 'app-anonymous-transaction-entry',
  templateUrl: './anonymous-transaction-entry.component.html',
  styleUrls: ['./anonymous-transaction-entry.component.sass']
})
export class AnonymousTransactionEntryComponent implements OnInit {
  transaction_ReceivedDate: string;
  File_Info1: any = [];
  base64_array_object_data1: any[] = [];
  file_name_array1: any[];
  binaryString: any;
  base64textString: string;
  commentsArray: any[] = [];
  receivedDate_Milliseconds: any;
  fileExtension_array: any[];
  tempfileInfo: Array<any> = [];
  imgsrc: any;
  public edited = false;
  filenameval: any;
  urls: Array<any> = [];
  filemode: Array<any> = [];
  fileUrl: any;
  imageUrl: string | ArrayBuffer;
  base64_array_object_data: any = [];
  filename: any;
  filename_extension: any;
  ortitle: boolean;
  public fileName;
  extensiontype: any;
  filetypeurlsplit: any;
  filetypeurlsplit1: any;
  filenamedoc: any;
  filesplitdata: any;
  companyAccnumberID: any;
  companyAccnumberIDvalue: any;
  banknamevalue: any;
  deptid : any;
  roleid : any;
  constructor(private cmn: CommonComponent, private http: Http, private router: Router, private sanitizer: DomSanitizer) {
    this.deptid = sessionStorage.getItem("session_deptid");

    this.roleid = sessionStorage.getItem("session_roleId");
    
    $('.page-loader-wrapper').hide();
    this.paymentModeList();
    this.bankNamesList();
    this.siteList();
  }

  ngOnInit() {
    // var date = new Date();
    // var newdate = date.setDate(date.getDate() - 183);
    var self = this;
    var date = new Date().getMonth();
    var minimumdate = new Date().setMonth(date - 3);
    var maximumdate = new Date().setMonth(date + 3);
    var month;
    var day;
    $(function() {
      console.log("Employee Id :"+sessionStorage.getItem('employeeId')) 
    //  alert(self.deptid)
     // alert(self.roleid)
      if (self.deptid == '993' && self.roleid == '8') {
        $('#receivedDateID').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
       // minDate: new Date(minimumdate),
        maxDate: new Date(),
        clearButton: true,
        weekStart: 1,
        time: false
      }).on('change', function (e, date) {
        $('#ChequeRecDate').bootstrapMaterialDatePicker('setMinDate', date);
      });
  
     }else{
      
    

    var date = new Date();
    var temdate = date.getDate();
    var tempmonth = date.getMonth()+1;
  var temp_altr_month = tempmonth-1;
     var tempmonthh = date.getMonth();
    var tempyear = date.getFullYear()
     var tempyear_for_first_month = date.getFullYear()-1;
   // alert(tempyear_for_first_month);
   var setdate = tempyear+"/"+tempmonth+"/"+10;
   if(temdate < 6){
     if(tempmonth == 1){
        var min_date = tempyear_for_first_month+"/"+12+"/"+'01';
        var max_date = tempyear+"/"+ ('0' +(tempmonth)).slice(-2)+"/"+('0' +(temdate)).slice(-2)
    
     $('#receivedDateID').bootstrapMaterialDatePicker({
       format: 'YYYY-MM-DD',
       minDate: min_date,
       maxDate: max_date,
       clearButton: true,
       weekStart: 1,
       time: false
     });
     
     }else{
        
        var min_date = tempyear+"/"+temp_altr_month+"/"+'01';
        var max_date = tempyear+"/"+ ('0' +(tempmonth)).slice(-2)+"/"+('0' +(temdate)).slice(-2)
 
   $('#receivedDateID').bootstrapMaterialDatePicker({
     format: 'YYYY-MM-DD',
     minDate: min_date,
     maxDate: max_date,
     clearButton: true,
     weekStart: 1,
     time: false
   });

 }  
   }else{
 
       var min_date = tempyear+"/"+tempmonth+"/"+'01';
       //  alert(min_date);
      var max_date = tempyear+"/"+ ('0' +(tempmonth)).slice(-2)+"/"+('0' +(temdate)).slice(-2)
   

     $('#receivedDateID').bootstrapMaterialDatePicker({
       format: 'YYYY-MM-DD',
       minDate: min_date,
       maxDate: max_date,
       clearButton: true,
       weekStart: 1,
       time: false
     });
   }
     }
      
   
   });
   $("#projectID").select2({
    placeholder: "Select Project",
    dir: "ltl",
  });
    $("#PaymentModeID").select2({
      placeholder: "Select Project",
      dir: "ltl",
    });

    $("#bankNamesID").select2({
      placeholder: "Select Project",
      dir: "ltl",
    });

    $("#companyAccnumberID").select2({
      placeholder: "Select Project",
      dir: "ltl",
    });

    $(function () {
      $('#projectID').change(function (e) {
        var selected_projectid = $(e.target).val();
        if (selected_projectid == "select") {

        } else {
          self.siteAccNumList(selected_projectid);
        }
      })

      // const myInput = document.getElementById('receivedAmountID');
      // myInput.onpaste = function (e) {
      //   e.preventDefault();
      // }

    })



  }


  /*-----------------Getting Payment mode list Start---------------------*/
  paymentModeList() {
    $('.page-loader-wrapper').show();

    let url = this.cmn.commonUrl + "financial/viewFinTransactionTypeModeData.spring";


    let headers = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: headers });

    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "condition": "Fin Anonymous Entry"
    }


    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 200) {
        for (var i = 0; i < resp.responseObjList.finTransferModeResponseList.length; i++) {
          $('#PaymentModeID').append("<option value='" + resp.responseObjList.finTransferModeResponseList[i].transferModeId + "'>" + resp.responseObjList.finTransferModeResponseList[i].name + "</option>");
        }
      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
      }

    },
      error => {

        var error = JSON.parse(error._body).responseCode;
        $('.page-loader-wrapper').hide();
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }
  /*-----------------Getting Payment mode list End---------------------*/

  /*-----------------Getting Bank names list Start---------------------*/
  bankNamesList() {
    $('.page-loader-wrapper').show();

    let url = this.cmn.commonUrl + "financial/viewFinTransactionTypeModeData.spring";


    let headers = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: headers });

    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "condition": "fetchAllData"
    }


    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 200) {
        for (var i = 0; i < resp.responseObjList.finBankResponseList.length; i++) {
          $('#bankNamesID').append("<option value='" + resp.responseObjList.finBankResponseList[i].finBankId + "'>" + resp.responseObjList.finBankResponseList[i].bankName + "</option>");
        }
      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
      }

    },
      error => {

        var error = JSON.parse(error._body).responseCode;
        $('.page-loader-wrapper').hide();
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }
  /*-----------------Getting Bank names list End---------------------*/

  /*-----------------Getting site acc number's list Start---------------------*/
  siteAccNumList(selectedSiteid) {
    $('.page-loader-wrapper').show();

    let url = this.cmn.commonUrl + "financial/viewFinProjectAccountData.spring";


    let headers = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: headers });

    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteIds": [selectedSiteid]//["111"]
    }


    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 200) {
        $('#companyAccBlock').show();
        $('#companyAccnumberID').html("");
        $('#companyAccnumberID').append("<option value='select'>" + "--Select--" + "</option>");
        for (var i = 0; i < resp.responseObjList.finProjectAccountResponseList.length; i++) {
          $('#companyAccnumberID').append("<option value='" + resp.responseObjList.finProjectAccountResponseList[i].siteAccountId + "'>" + resp.responseObjList.finProjectAccountResponseList[i].siteBankAccountNumber + "</option>");
        }
      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
      }

    },
      error => {

        var error = JSON.parse(error._body).responseCode;
        $('.page-loader-wrapper').hide();
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }
  /*-----------------Getting Payment mode list End---------------------*/

  /*-----------------Getting Project(site) list Start---------------------*/
  siteList() {
    $('.page-loader-wrapper').show();

    let url = this.cmn.commonUrl + "financial/raisedMilestoneSites.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "actionUrl": "Suspense Entry"
    }

    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 200) {
        $('#projectID').html("");
        $('#projectID').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#projectID').append("<option value='" + resp.responseObjList[i].siteId + "'>" + resp.responseObjList[i].siteName + "</option>");
        }
      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        swal(resp.errors[0]);
      }

    },
      error => {
        $('.page-loader-wrapper').hide();

        var error = JSON.parse(error._body).responseCode;
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }
  /*-----------------Getting Project(site) list End---------------------*/

  handle_FileSelect(evt) {
    this.fileExtension_array = [];
    this.file_name_array1 = [];
    this.base64_array_object_data1 = [];
    this.File_Info1 = [];
    var files = evt.target.files;
    var file_val = evt.target.value;
    this.filename = evt.target.files[0].name.toLowerCase();

    this.filename_extension = this.filename.split('.').pop();



    if (this.filename_extension == "jpg" || this.filename_extension == "JPG" || this.filename_extension == "png" || this.filename_extension == "PNG"
      || this.filename_extension == "jpeg" || this.filename_extension == "JPEG" || this.filename_extension == "pdf"
      || this.filename_extension == "PDF") {

      const fsize = files.item(i).size;
      const file_second = Math.round((fsize / 1024));
      if (file_second >= 1024) {
        $("#files").val(null);
        swal("File too Big, please select a file less than 1MB");
        return false;
      } else {
        for (var i = 0; i < files.length; i++) {
          var temp = evt.target.files[i].name.toLowerCase();
          var tempFileExtension = temp.split('.').pop();
          this.filenameval = temp.split('.').pop();
          this.fileExtension_array.push(tempFileExtension);
          this.file_name_array1.push(temp);
          var file = files[i];
          if (files && file) {
            var reader = new FileReader();
            reader.onload = this._handleReader_Loaded.bind(this);
            reader.readAsBinaryString(file);
          } else {

          }
        }



        if (evt.target.files && evt.target.files[0]) {
          var filesAmount = evt.target.files.length;
          for (let i = 0; i < filesAmount; i++) {
            var reader = new FileReader();
            reader.onload = (event: any) => {


              this.urls.push({
                'upload': event.target.result,
                'Type': this.filenameval,
                'Name': this.filename,
              });

              console.log(this.urls);
            }
            reader.readAsDataURL(evt.target.files[i]);
          }
        }


      }
    } else {
      $('#files').val("");
      $('#files').css("color", "transparent");
      swal("The selected file format is invalid, please upload only .jpg, .png, .pdf");
      return false;
      this.urls = [];

      this.tempfileInfo = [];
    }


  }


  Deleteimage(val) {
    this.tempfileInfo.splice(val, 1);
    this.urls.splice(val, 1);
    if (this.tempfileInfo.length == 0) {
      $('#files').css("color", "black");
      $('#files').val("");
      $('#imageLinkField').show();
      this.ortitle = true;
    } else {
      $('#imageLinkField').hide();
      this.ortitle = false;
    }
  }

  _handleReader_Loaded(readerEvt) {
    this.binaryString = readerEvt.target.result;
    this.base64textString = btoa(this.binaryString);
    this.base64_array_object_data.push(btoa(this.binaryString));
    this.imageUrl = btoa(this.binaryString);
    $('#files').css("color", "transparent");

    this.tempfileInfo.push({
      "extension": this.filename_extension,
      "name": this.filename,
      "base64": this.imageUrl
    });

    console.log(this.tempfileInfo);


  }



  /*----------------- Suspense entry submission Start ---------------------*/
  suspenseEntry() {
    if ($('#referenceNumberID').val() == "") {
      $('#referenceNumberID').focus();
      swal("Please enter the Reference Number");
      return false;
    }

    if ($('#receivedDateID').val() == "") {
      // $('#receivedDateID').focus();
      swal("Please select the Receive Date");
      return false;
    }

    if ($('#receivedAmountID').val() == "") {
      $('#receivedAmountID').focus();
      swal("Please enter the Received Amount");
      return false;
    }

    if ($('#PaymentModeID').val() == "select") {
      $('#PaymentModeID').focus();
      swal("Please select the Payment Mode");
      return false;
    }

    // if ($('#bankNamesID').val() == "select") {
    //   $('#bankNamesID').focus();
    //   swal("Please select the Bank Name");
    //   return false;
    // }

    if ($('#projectID').val() == "select") {
      $('#projectID').focus();
      swal("Please select the Project Name");
      return false;
    }

    if ($('#companyAccnumberID').val() == "select") {
      $('#companyAccnumberID').focus();
      swal("Please select the Account Number");
      return false;
    }

    // if ($('#bankStatementCommentsID').val() == "") {
    //   $('#bankStatementCommentsID').focus();
    //   swal("Please enter the Bank Comments");
    //   return false;
    // }

    // if ($('#misStatementCommentsID').val() == "") {
    //   $('#misStatementCommentsID').focus();
    //   swal("Please enter the MIS Comments");
    //   return false;
    // }

    // if($('#bankStatementCommentsID').val().length > 120){
    //   swal("please enter the characters below 120");
    //   return false;
    // }

    // if($('#misStatementCommentsID').val().length > 120){
    //   swal("please enter the characters below 120");
    //   return false;
    // }

    // onValidate(){
    //   if($('#misStatementCommentsID').val().length > 120){
    //     swal("please enter the characters below 120");
    //     return false;
    //   }
    // }



    // for (var i = 0; i < this.base64_array_object_data1.length; i++) {
    //   this.File_Info1.push({
    //     "extension": "" + this.fileExtension_array,
    //     "name": "" + this.file_name_array1,
    //     "base64": "" + this.base64_array_object_data1
    //   });
    // }


    // Upload File Validation
    // if(this.File_Info1 == ""){
    //   swal("please upload the file");
    //   return false;
    // }

    this.commentsArray.push(
      // { "MIS": ""+ $('#misStatementCommentsID').val()},
      { "BANK_STATEMENT": "" + $('#bankStatementCommentsID').val() }
    )

    if (confirm("Are you sure to submit ?")) {
      this.finalSubmissionSuspenseEntry();
    } else { }

  }

  finalSubmissionSuspenseEntry() {

    $('.page-loader-wrapper').show();

    let url = this.cmn.commonUrl + "financial/doOnlinePaymentAnonymousEntry.spring"


    let headers = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: headers });

    this.companyAccnumberID = $('#companyAccnumberID').select2('data')[0].text;

    if (this.companyAccnumberID == "--Select--") {
      this.companyAccnumberID = JSON.parse(null);
    } else {
      this.companyAccnumberID = $('#companyAccnumberID').select2('data')[0].text;
    }

    this.companyAccnumberIDvalue = $('#companyAccnumberID').val();

    if (this.companyAccnumberIDvalue == "select") {
      this.companyAccnumberIDvalue = JSON.parse(null);
    } else {
      this.companyAccnumberIDvalue = $('#companyAccnumberID').val();
    }

    this.banknamevalue = $('#bankNamesID').val();

    if(this.banknamevalue == "select"){
      this.banknamevalue = JSON.parse(null);
    } else {
      this.banknamevalue = $('#bankNamesID').val();
    }
//alert(typeof $("#receivedDateID").val())
console.log(new Date($("#receivedDateID").val()).getTime())
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteId": "" + $('#projectID').val(),
      "referenceNo": "" + $('#referenceNumberID').val(),
      "transactionReceiveDate": ""+ new Date($("#receivedDateID").val()).getTime(),
      "receivedAmount": "" + $('#receivedAmountID').val(),
      "transferModeId": "" + $('#PaymentModeID').val(),
      "bankId":this.banknamevalue,
      "siteAccountId": this.companyAccnumberIDvalue,
      "siteBankAccountNumber": this.companyAccnumberID,
      "comments": this.commentsArray,
      "comment": "" + $('#misStatementCommentsID').val(),
      "fileInfos": this.tempfileInfo,
    }

console.log(JSON.stringify(body));

// return false;

    this.http.post(url, body).map(res => res.json()).subscribe(resp => {

      console.log(JSON.stringify(resp));


      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 200) {
        // location.reload();
        // swal("Transaction created sucessfully !!");
        swal({ title: "Transaction created sucessfully !!" },
          function () {
            location.reload();
          }
        );
      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
      }
    },
      error => {

        $('.page-loader-wrapper').hide();
        swal({ title: error },
          function () {
            location.reload();
          }
        );
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );

  }

  /*----------------- Suspense entry submission End ---------------------*/

  homeClick() {
    this.cmn.commonHomeNavigation();
  }

  // Site Account Data :--

  // Url :- http://localhost:8181/SumadhuraGateway/employeeservice/financial/viewFinProjectAccountData.spring

  // Request :-

  // {
  // 	"sessionKey": "B79A1B75B41E9E4ABDFCB0DD37C5A06C8ADC312464F4A3EEB9AF2683EB993239",
  // 	"siteIds":["111"]
  // }
  // Response :-

  // {
  //     "responseCode": 200,
  //     "status": null,
  //     "sessionKey": null,
  //     "errors": null,
  //     "description": "success",
  //     "responseObjList": {
  //         "finBankResponseList": null,
  //         "finTransactionModeResponseList": null,
  //         "finTrnasactionTypeResponseList": null,
  //         "finProjectAccountResponseList": [
  //             {
  //                 "finBankId": 3,
  //                 "bankName": "ICICI",
  //                 "siteAccountId": 3,
  //                 "siteBankAccountNumber": "1001233213133",
  //                 "finSiteProjAccMapId": 3,
  //                 "siteId": 111,
  //                 "ifscCode": "ICICI-001",
  //                 "accountAddress": "Building No.28, M. G. Road, Bangalore"
  //             }
  //         ],
  //         "financialProjectMileStoneResponse": null,
  //         "finTransactionEntryResponseList": null,
  //         "customerPropertyDetailsInfoList": null,
  //         "finTransactionEntryDetailsResponseList": null,
  //         "finAnonymousEntryResponseList": null
  //     },
  //     "notificationResponses": null,
  //     "isNotificationResponsesAvailable": null,
  //     "ticketEscalationResponses": null
  // }

  keyPress(event: any) {
    // -- for any symbols  /[0-9\+\-\ ]/
    const pattern = /[0-9\A-Za-z\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  keyPressAmount(event: any) {
    // -- for any symbols  /[0-9\+\-\ ]/
    const pattern = /[0-9\.\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  fileClick(val) {
    
    window.open(val, '_system', 'location=yes,closebuttoncaption=Fechar,enableViewportScale=no');

  }


  fileClickfun(val, extensiontype) {
    console.log(val);
    console.log(extensiontype);
    this.fileName = "";
    this.extensiontype = extensiontype;
    this.filetypeurlsplit = val.split(';')[0];
    this.filetypeurlsplit1 = this.filetypeurlsplit.split(':')[1];
    this.filenamedoc = val.split('/')[0];
    this.filesplitdata = this.filenamedoc.split(':')[1];

    if (this.filesplitdata == "image") {
      this.imgsrc = val;
      $('#imagemodal').modal('show');
    }

    if (this.filetypeurlsplit1 == 'application/pdf') {
      this.fileName = "";
      setTimeout(() => {
        this.fileName = this.sanitizer.bypassSecurityTrustResourceUrl(val);
      }, 1000);
      $('#imagemodal').modal('show');

    }
  }


}
