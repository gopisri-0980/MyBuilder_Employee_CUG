import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { unwatchFile } from 'fs';
import { DomSanitizer } from '@angular/platform-browser';


declare const $: any;
declare const swal: any;
var base64textString;
var checkedornot;
var json_response;
var flatId;
var flatId_bookingid;
var convertbasesixtyfour = [];
var siteidsvalue;
var base64array = [];
var selectbankNameValue;
var selectbanknametext;
var imgs = [];

var invoicedetails_url;
var ModificationInvoice_url;
var lagelinvoicenumber;
var modificationinvoice;
var bookingformIDS;


var carparkingdetails_url;
var carparkinginvoicenumber;

@Component({
  selector: 'app-crm-receipt-online',
  templateUrl: './crm-receipt-online.component.html',
  styleUrls: ['./crm-receipt-online.component.sass']
})
export class CrmReceiptOnlineComponent implements OnInit {

  totalPenaltyAmount: any;
  totaldueamount: any;
  customerName: any;
  fileExtension_array: any[];
  file_name_array1: any[];
  File_Info1: any[];
  binaryString: any;
  base64textString: string;
  filename: any;
  filename_extension: any;
  refernceNumber: any;
  crmcomentsArray: any;
  attachmentArray: any;
  receiveDate: any;
  miscommentsArray: any;
  setOffTypeName: any;
  modificationChargeInvoiceID: any;
  documentextension: any;

  docName: any;
  fileInfo: any = [];
  controller: number[];
  blockIDvalue: any;
  bookingformIDS: any;
  edited: boolean;
  finTransactionSetOffId: any;
  tempfileInfo: Array<any> = [];
  base64_array_object_data1: any[];

  imgsrc: any;

  fileUrl: any;
  imageUrl: string | ArrayBuffer;
  base64_array_object_data: any = [];
  filenameval: any;
  urls: Array<any> = [];
  ortitle: boolean;
  public fileName;
  extensiontype: any;
  filetypeurlsplit: any;
  filetypeurlsplit1: any;
  filenamedoc: any;
  filesplitdata: any;
  finpaidbyname: any;
  imguploadurl: Array<any> = [];
  image;
  thumbnail: any;
  controllerdata: Array<any> = [];
  imageUrldatabase64: Array<any> = [];
  bindingbankname: any;
  bindingbankid: any;
  imagemainarray: any;
  maincollector: Array<any> = [];
  anonymous_EntryId: any;
  siteId: any;
  sitename: any;
  deptId: any;
  roleId: any;
  banknamevalue: any;
  banknametext: any;
  CorpusFund: any;
  MaintinaceCharges: any;
  FlatKhataBifurcation: any;
  carparkingcost_amount: any;
  Registration_And_Mutation_Charges: any;
  Non_refundable_Caution_Deposit: any;
  Electricity_Deposit: any;



  constructor(private cmn: CommonComponent, private http: Http, private router: Router, private sanitizer: DomSanitizer) {
    this.deptId = sessionStorage.getItem("session_deptid");
    this.roleId = sessionStorage.getItem("session_roleId");

    console.log(this.deptId);
    console.log(this.roleId);

    json_response = eval('(' + sessionStorage.getItem('anonymousjsonobject') + ')');
    console.log("json_response :" + JSON.stringify(json_response))

    this.crmcomentsArray = json_response.finAnnyEntryCommentsResponseList;
    this.miscommentsArray = json_response.finAnnyApproveStatResponseList
    this.attachmentArray = json_response.finAnnyEntryDocResponseList;
    this.receiveDate = json_response.transactionReceiveDate;
    this.anonymous_EntryId = json_response.anonymousEntryId
    this.siteId = json_response.siteId
    this.sitename = json_response.siteName
    console.log("Anonymous_EntryId :" + this.anonymous_EntryId)
    // this.attachmentArray.forEach((elem, i) => {
    //   // this.tempfileInfo.push({
    //   //   "extension": elem.docName.split('.').pop(),
    //   //   "name": elem.docName,
    //   //   "base64": window.btoa(elem.location)
    //   // })



    //   this.maincollector.push(elem.location);
    //   this.toDataURL(elem.location)
    //     .then(dataUrl => {
    //       console.log('RESULT:', dataUrl)
    //     })

    // })




    // console.log(this.maincollector);


    // var imgs = this.maincollector;
    // var arr = []
    // getBase64Arr(imgs, 0)
    // function getBase64Arr(iarr, count) {
    //   console.log(iarr);
    //   console.log(count);

    //   if (count === iarr.length) {
    //     console.log('over')
    //     console.log(arr)
    //     //call service here
    //   } else {
    //     toDataURL(iarr[count], function (dataUrl) {
    //       console.log(dataUrl);
    //       arr.push(dataUrl)
    //       count++
    //       getBase64Arr(iarr, count)
    //     }, ''
    //     )
    //   }


    // }


    function toDataURL(src, callback, outputFormat) {
      console.log("working");
      var img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = function () {
        var canvas: any = document.createElement('CANVAS');
        var ctx = canvas.getContext('2d');
        var dataURL;
        canvas.height = img.naturalHeight;
        canvas.width = img.naturalWidth;
        ctx.drawImage(this, 0, 0);
        dataURL = canvas.toDataURL(outputFormat);

        console.log(dataURL);
        callback(dataURL);
      };
      img.src = src;

      console.log(img.src);

    }

    //  var imgs = ['https://www.gravatar.com/avatar/d50c83cc0c6523b4d3f6085295c953e0', 'https://www.gravatar.com/avatar/d50c83cc0c6523b4d3f6085295c953e0', 'https://www.gravatar.com/avatar/d50c83cc0c6523b4d3f6085295c953e0']





    // function getDataUrl(img) {    // Create canvas    const canvas = document.createElement('canvas'); 
    //    const ctx = canvas.getContext('2d');    
    //    // Set width and height    canvas.width = img.width;  
    //      canvas.height = img.height;   
    //       // Draw the image    ctx.drawImage(img, 0, 0);   
    //        return canvas.toDataURL('image/jpeg'); } 

    //        // Select the image const img = document.querySelector('#my-image'); 
    //        img.addEventListener('load', function (event) {    const dataUrl = getDataUrl(event.currentTarget);  
    //           console.log(dataUrl); 
    //         });








    // for (var i = 0; i < this.attachmentArray.length; i++) {
    //   this.docName = this.attachmentArray[i].docName;
    //   this.documentextension = this.attachmentArray[i].docName.split('.').pop();
    //   this.imguploadurl.push({
    //     "extension": this.attachmentArray[i].docName.split('.').pop(),
    //     "name": this.attachmentArray[i].docName,
    //     "base64": this.attachmentArray[i].location
    //   })

    // }

    // console.log(this.imguploadurl);

    // for (var j = 0; j < this.imguploadurl.length; j++) {
    //   this.toDataURL(this.imguploadurl[j].base64, this.imguploadurl[j].extension, this.imguploadurl[j].name, function (dataUrl) {
    //   });
    // }




    $('.page-loader-wrapper').hide();
    // checkedornot = false;
    this.siteList();
    this.bankNamesList();
  }


  toDataURL = url => fetch(url)
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    }))




  // toDataURL(url, extension, name, callback) {
  //   var xhr = new XMLHttpRequest();
  //   xhr.onload = function () {
  //     var reader = new FileReader();
  //     reader.onloadend = function () {
  //       let document = reader.result;

  //       base64array.push({
  //         "extension": extension,
  //         "name": name,
  //         "base64": document
  //       });


  //       callback(reader.result);

  //     }
  //     reader.readAsDataURL(xhr.response);
  //   };
  //   xhr.open('GET', url);
  //   xhr.responseType = 'blob';
  //   xhr.send();
  // }



  ngOnInit() {
    $("#paidbyname").prop("disabled", true);
    var self = this;
    var date = new Date().getMonth();
    var minimumdate = new Date().setMonth(date - 3);
    var maximumdate = new Date().setMonth(date + 3);

    $(function () {

      
$("#PrincipalAmount").val(0);
$("#CorpusFund").val(0);
$("#MaintinaceCharges").val(0);
$("#FlatKhataBifurcation").val(0);
$("#refundableAdvanceID").val(0);
$("#cancellationChargesID").val(0);
$("#InterstAmount").val(0);
$("#ModificationCharges").val(0);
$("#LeagalCharges").val(0);
$("#carparkingcost").val(0);



      //$("#bankNamesID").attr("disabled", true);

      $('#PrincipalAmount').bind("cut copy paste", function (e) {
        e.preventDefault();
      });

      $('#refundableAdvanceID').bind("cut copy paste", function (e) {
        e.preventDefault();
      });

      $('#cancellationChargesID').bind("cut copy paste", function (e) {
        e.preventDefault();
      });

      $('#InterstAmount').bind("cut copy paste", function (e) {
        e.preventDefault();
      });

      $('#ModificationCharges').bind("cut copy paste", function (e) {
        e.preventDefault();
      });

      $('#LeagalCharges').bind("cut copy paste", function (e) {
        e.preventDefault();
      });

      $(document).on('keydown', 'input[pattern]', function (e) {
        var input = $(this);
        var oldVal = input.val();
        var regex = new RegExp(input.attr('pattern'), 'g');

        setTimeout(function () {
          var newVal = input.val();
          if (!regex.test(newVal)) {
            input.val(oldVal);
          }
        }, 0);
      });



      $("#refernceNumber").html(json_response.referenceNo)
      $("#receiveDate").html(json_response.transactionReceiveDate)
      $("#paymentmode").html(json_response.transferMode)

      $("#frombank").html(json_response.bankId)
      $("#fromacnumber").html(json_response.siteBankAccountNumber)
      $("#transactionamount").html(json_response.amount)


      // $('#checlist').click(function(){
      //   if($(this).prop("checked") == true){
      //     $("#PaymentSetOffDiv").show();
      //   }else{
      //     $("#PaymentSetOffDiv").hide();
      //   }
      // }); 

      $("#bankNamesID").select2({
        placeholder: "Select Project",
        dir: "ltl",
        styleUrls: ['./anonymous-transaction-entry.component.sass']
      });

      $("#paidbyname").select2({
        placeholder: "Paid By",
        dir: "ltl"
      });

      $("#Sourcefound").select2({
        placeholder: "Source of funds",
        dir: "ltl"
      });

      $("#ProjectId").select2({
        placeholder: "Search Project",
        dir: "ltl"
      });
      $("#BlockId").select2({
        placeholder: "Search Block",
        dir: "ltl"
      });
      $("#FaltId").select2({
        placeholder: "Search Flat",
        dir: "ltl"
      });

      $("#ModificationInvoiceId").select2({
        placeholder: "Search Modification Invoice",
        dir: "ltl"
      });
      $("#LegalInvoiceId").select2({
        placeholder: "Search Legal Invoice",
        dir: "ltl"
      });


      $("#transaction_mode").select2({
        placeholder: "Search Transacion Mode",
        dir: "ltl"
      });

      $("#CarparkingInvoiceId").select2({
        placeholder: "Search Car Parking Invoice",
        dir: "ltl"
      });



      $('#bankNamesID').change(function (event) {
        var bankname = $(event.target).val();
        if (bankname == "select") {
          selectbankNameValue = null;
          selectbanknametext = null;
        } else {
          var banknametext = event.target.options[event.target.options.selectedIndex].text;
          selectbankNameValue = event.target.value;
          selectbanknametext = banknametext;
        }
      });



      $("#CarparkingInvoiceId").change(function (e) {
        if ($(e.target).val() !== 'select') {
          $(".carparkinginvoicecls").show();
          carparkingdetails_url = $(e.target).val().split('$$')[1];
          carparkinginvoicenumber = $(e.target).val().split('$$')[0];

        } else {
          $(function () {
            $(".carparkinginvoicecls").hide();
          });
        }
      });



      $('#ProjectId').change(function (e) {
        var siteId = $(e.target).val();
        siteidsvalue = $(e.target).val();
        if (siteId == "select") {
          $("#BlockId option[value]").remove();
          $("#FaltId option[value]").remove();

        } else {
          self.blockList(siteId);
          self.flatsitewisechange(siteId);
        }
      });

      $('#BlockId').change(function (e) {
        var siteId = $(e.target).val();
        if (siteId == "select") {
          self.flatsitewisechange(siteidsvalue);
        } else {
          self.flatList(siteId);
        }
      });

      $('#FaltId').change(function (e) {

        if ($(e.target).val() == "select") {
          $(".viewinvoicecls").hide();
          $(".Modificationinvoicecls").hide();
        }


        flatId = $(e.target).val().split('-')[0];
        flatId_bookingid = $(e.target).val().split('-')[1];

        self.modification_legalInvoiceList(flatId);
        self.forFlatbookingIdkList(flatId)

      });



      $("#LegalInvoiceId").change(function (e) {
        if ($(e.target).val() !== 'select') {
          $(".viewinvoicecls").show();
          invoicedetails_url = $(e.target).val().split('$$')[1];
          lagelinvoicenumber = $(e.target).val().split('$$')[0];

        } else {
          $(function () {
            $(".viewinvoicecls").hide();
          });
        }
      });



      $("#ModificationInvoiceId").change(function (e) {
        if ($(e.target).val() !== 'select') {
          $(".Modificationinvoicecls").show();
          ModificationInvoice_url = $(e.target).val().split('$$')[1];
          modificationinvoice = $(e.target).val().split('$$')[0];
        } else {
          $(function () {
            $(".Modificationinvoicecls").hide();
          })
        }
      });



      //  $('#ChequeDate').bootstrapMaterialDatePicker({
      //   format: 'YYYY-MM-DD',
      //   minDate: new Date(minimumdate),
      //   maxDate: new Date(maximumdate),
      //   clearButton: true,
      //   weekStart: 1,
      //   time: false
      // });
      // $('#ChequeRecDate').bootstrapMaterialDatePicker({
      //   format: 'YYYY-MM-DD',
      //   minDate: new Date(minimumdate),
      //   maxDate: new Date(maximumdate),
      //   clearButton: true,
      //   weekStart: 1,
      //   time: false
      // });

    });
  }


  viewinvoicefun() {

    window.open(invoicedetails_url);
  }

  Modificationfun() {
    window.open(ModificationInvoice_url);
  }


  /*-----------------Getting Project(site) list Start---------------------*/
  siteList() {
    let url = this.cmn.commonUrl + "financial/raisedMilestoneSites.spring";



    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "actionUrl": "View Suspense Entries"

    }



    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {


      if (resp.responseCode == 200) {

        var Options = "";
        //   $('#projectID').formSelect();
        $('#ProjectId').html('');
        $('#ProjectId').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#ProjectId').append("<option value='" + resp.responseObjList[i].siteId + "'>" + resp.responseObjList[i].siteName + "</option>");
          //	$('#projectID').formSelect();
          $('#blkcls').show();
        }
        $('#ProjectId').val(this.siteId)
        this.blockList(this.siteId);
        this.flatsitewisechange(this.siteId);
        //this.siteBankList(this.siteId);
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
        $('.page-loader-wrapper').hide();
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }
  /*-----------------Getting Project(site) list End---------------------*/



  /*-----------------Getting Blocks list start---------------------*/
  blockList(siteid) {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/activeBlocksFlats.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteIds": [siteid]
    }

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        $('#BlockId').html('');
        $('#BlockId').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#BlockId').append("<option value='" + resp.responseObjList[i].blockId + "'>" + resp.responseObjList[i].blockName + "</option>");
          $("#BlockId").attr("disabled", false)
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
        $('.page-loader-wrapper').hide();
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );

  }
  /*-----------------Getting Blocks list End---------------------*/

  /*-----------------Getting Flats list Start---------------------*/
  flatList(blockid) {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/activeBlocksFlats.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "blockIds": [blockid],//$("#BlockId").val()
      "siteIds": [$('#ProjectId').val()]
    }

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        $('#FaltId').html('');
        $('#FaltId').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#FaltId').append("<option value='" + resp.responseObjList[i].flatId + "-" + resp.responseObjList[i].flatBookingId + "'>" + resp.responseObjList[i].flatNo + "</option>");
        }
        $("#FaltId").attr("disabled", false)
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
        $('.page-loader-wrapper').hide();
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );

  }
  /*-----------------Getting Flats list End---------------------*/

  /*-----------------Getting grid details start---------------------*/
  gridDetails(flatId, flatId_bookingid) {
    console.log(flatId_bookingid);

    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/viewPendingAmount.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "flatIds": [flatId],
      "bookingFormId": flatId_bookingid,
      "transactionTypeId": "1",
      "transactionModeId": '2',
      "transferModeId": json_response.transferModeId,
      "transactionTypeName": "Receipt",
      "transactionModeName": "Online",
      "transferModeName": json_response.transferMode,
      "requestUrl": "createTransaction",
    }

    console.log(url);
    console.log(JSON.stringify(body));

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

      console.log(JSON.stringify(resp));

      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        this.totalPenaltyAmount = resp.responseObjList.financialProjectMileStoneResponse[0].totalPenaltyAmount;
        $("#interestamnt").html(this.totalPenaltyAmount);
        this.totaldueamount = resp.responseObjList.financialProjectMileStoneResponse[0].totalDueAmount;
        $("#pendingamnt").html(this.totaldueamount);
        this.customerName = resp.responseObjList.financialProjectMileStoneResponse[0].customerName;
        $("#custname").html(this.customerName);
        $("#custdet_div").show();
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
        $('.page-loader-wrapper').hide();
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }
  /*-----------------Getting grid details End---------------------*/

  /*-----Getting modification and legal invoices list start------------*/
  modification_legalInvoiceList(flatId) {
    $('.page-loader-wrapper').show();
    // -------------------------------
    let url = this.cmn.commonUrl + "financial/viewPendingAmount.spring";


    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "flatIds": [flatId].map(Number),//$("#FaltId").val(),
      "bookingFormId": flatId_bookingid,
      "condition": "CRM_COMMENTS",
      "transactionTypeId": "1",
      "transactionModeId": '2',
      "transferModeId": json_response.transferModeId,
      "transactionTypeName": "Receipt",
      "transactionModeName": "Online",
      "transferModeName": json_response.transferMode,
      "requestUrl": "createTransaction",
    }

    console.log(url);
    console.log(JSON.stringify(body));


    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

      console.log(JSON.stringify(resp));

      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        $('#ModificationInvoiceId').html('');
        $('#LegalInvoiceId').html('');
        $('#CarparkingInvoiceId').html('');


        $('#LegalInvoiceId').append('<option value="select">--Select--</option>');
        $('#ModificationInvoiceId').append('<option value="select">--Select--</option>');
        $('#CarparkingInvoiceId').append('<option value="select">--Select--</option>');

        if (resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList.length != 0) {
          for (var i = 0; i < resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList.length; i++) {
            this.setOffTypeName = resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].metadataName;

            this.controllerdata = resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i];

            if (this.setOffTypeName == "MODIFICATION_COST") {
              $('#ModificationInvoiceId').append("<option value='" + resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo + '$$' + resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].documentLocation + "'>" + resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo + "</option>");
              //  $('#ModificationInvoiceId').val(this.modificationChargeInvoiceID);
            } else if (this.setOffTypeName == "LEGAL_COST") {
              $('#LegalInvoiceId').append("<option value='" + resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo + '$$' + resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].documentLocation + "'>" + resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo + "</option>");
              // $('#LegalInvoiceId').val(this.legalChargeInvoiceID);
            } else if (this.setOffTypeName == "CAR_PARKING_COST") {
              $('#CarparkingInvoiceId').append("<option value='" + resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo + '$$' + resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].documentLocation + "'>" + resp.responseObjList.financialProjectMileStoneResponse[0].finBookingFormAccountsResponseList[i].finBokAccInvoiceNo + "</option>");
              // $('#CarparkingInvoiceId').val(this.carparkingInvoiceID);
            }
          }
        } else {
          $(".viewinvoicecls").hide();
          $(".Modificationinvoicecls").hide();
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
        $('.page-loader-wrapper').hide();
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }

  /*-----Getting modification and legal invoices list End------------*/

  /*-------------------------------Final Submission Start----------------------------*/
  CRMReceiptonlineSubmit(button_val) {

    console.log("button_val :" + button_val)


    // if (selectbankNameValue !== undefined && selectbanknametext !== undefined) {
    //   this.bindingbankname = selectbanknametext;
    //   this.bindingbankid = selectbankNameValue;
    // } else if (json_response.bankId !== null && json_response.bankName !== null) {
    //   this.bindingbankname = json_response.bankName;
    //   this.bindingbankid = json_response.bankId;
    // } else {
    //   this.bindingbankname = null;
    //   this.bindingbankid = null;
    // }

    //  console.log(this.attachmentArray.length)

    console.log($("#bankNamesID").val());

    if ($("#bankNamesID").val() == "select" || $("#bankNamesID").val() == null) {
      swal("Please select customer bank name");
      $('#ProjectId').focus();
      return false;
    }

    if (button_val == "submit") {

      if ($("#ProjectId").val() == "select") {
        swal("Please select project");
        $('#ProjectId').focus();
        return false;
      }

      // if ($("#BlockId").val() == "select") {
      //   swal("Please select block");
      //   $('#BlockId').focus();
      //   return false;
      // }

      if ($("#FaltId").val() == "select") {
        swal("Please select Flat");
        $('#FaltId').focus();
        return false;
      }


      if ($("#CorpusFund").val() == undefined || $("#CorpusFund").val() == "") {
        this.CorpusFund = 0;
      } else {
        this.CorpusFund = $("#CorpusFund").val();
      }

      if ($("#MaintinaceCharges").val() == undefined || $("#MaintinaceCharges").val() == "") {
        this.MaintinaceCharges = 0;
      } else {
        this.MaintinaceCharges = $("#MaintinaceCharges").val();
      }

      if ($("#FlatKhataBifurcation").val() == undefined || $("#FlatKhataBifurcation").val() == "") {
        this.FlatKhataBifurcation = 0;
      } else {
        this.FlatKhataBifurcation = $("#FlatKhataBifurcation").val();
      }


      if ($("#carparkingcost").val() == undefined || $("#carparkingcost").val() == "") {
        this.carparkingcost_amount = 0;
      } else {
        this.carparkingcost_amount = $("#carparkingcost").val();
      }


      if ($("#Registration_and_Mutation_Charges").val() == undefined || $("#Registration_and_Mutation_Charges").val() == "") {
        this.Registration_And_Mutation_Charges = 0;
      } else {
        this.Registration_And_Mutation_Charges = $("#Registration_and_Mutation_Charges").val();
      }
  
  
      if ($("#Non_refundable_Caution_Deposit").val() == undefined || $("#Non_refundable_Caution_Deposit").val() == "") {
        this.Non_refundable_Caution_Deposit = 0;
      } else {
        this.Non_refundable_Caution_Deposit = $("#Non_refundable_Caution_Deposit").val();
      }
  
  
      if ($("#Electricity_Deposit").val() == undefined || $("#Electricity_Deposit").val() == "") {
        this.Electricity_Deposit = 0;
      } else {
        this.Electricity_Deposit = $("#Electricity_Deposit").val();
      }
      



      if ($("#PrincipalAmount").val() == "0" && $("#ModificationCharges").val() == "0" && $("#InterstAmount").val() == "0"
        && $("#LeagalCharges").val() == "0" && $("#refunableCharges").val() == "0" && $('#TdsAmount').val() == "0"
        && $("#CorpusFund").val() == "0" && $("#MaintinaceCharges").val() == "0" && $("#FlatKhataBifurcation").val() == "0" && this.CorpusFund == "0" && this.MaintinaceCharges == "0" && this.FlatKhataBifurcation == "0" && this.carparkingcost_amount == "0"  && this.Registration_And_Mutation_Charges == "0" && this.Non_refundable_Caution_Deposit == "0" && this.Electricity_Deposit == "0") {
        swal("Please enter Principle amount (OR) Corpus Fund (OR) Maintinance Charges (OR) Flat Khata Bifurcation (OR) Modification charges (OR) Interest amount (OR) Legal charges (OR) Refundable Advance (OR) Car parking cost (OR) Registration And Mutation Charges (OR) Non-refundable Caution Deposit (OR) Electricity Deposit");
        return false;
      }



      if ($("#ModificationCharges").val() != "0" && $("#ModificationCharges").val() != "") {
        if ($("#ModificationInvoiceId").val() == "select") {
          $("#ModificationInvoiceId").attr("disabled", false);
          swal("Please select modification invoice");
          $('#ModificationInvoiceId').focus();
          return false;
        }
      }

      if ($("#LeagalCharges").val() != "0" && $("#LeagalCharges").val() != "") {
        if ($("#LegalInvoiceId").val() == "select") {
          $("#LegalInvoiceId").attr("disabled", false);
          swal("Please select legal invoice");
          $('#LegalInvoiceId').focus();
          return false;
        }

      }





      var tempamount = (Number($('#PrincipalAmount').val()) + Number($('#InterstAmount').val()) + Number($('#refunableCharges').val())
        + Number($('#ModificationCharges').val()) + Number($('#LeagalCharges').val())) + Number(this.CorpusFund) + Number(this.MaintinaceCharges) + Number(this.FlatKhataBifurcation) + Number(this.carparkingcost_amount)
        + Number($('#TdsAmount').val()) + Number(this.Registration_And_Mutation_Charges) + Number(this.Non_refundable_Caution_Deposit) + Number(this.Electricity_Deposit);
      //alert(Number(tempamount).toFixed(2))
      if (Number(tempamount.toFixed(2)) > Number($('#transactionamount').html())) {
        swal("Payment Setoff should be equal to transaction amount");
        return false;
      }

      if (Number(tempamount.toFixed(2)) < Number($('#transactionamount').html())) {
        swal("Payment Setoff should be equal to transaction amount");
        return false;
      }


      if (Number($('#TdsAmount').val()) !== 0 && $("#paidbyname").val() == "" || Number($('#TdsAmount').val()) !== 0 && $("#paidbyname").val() == "select") {
        swal("Please select paid by name");
        return false
      }


      this.finpaidbyname = $("#paidbyname").val();

      if (this.finpaidbyname == "select") {
        this.finpaidbyname = null;
      }

      if ($("#Sourcefound").val() == "" || $("#Sourcefound").val() == "select") {
        swal("Please select Source of funds");
        $('#CustomerCommentsId').focus();
        return false;
      }


      if ($("#companybankAcId").val() == "select") {
        swal("Please select company bank account");
        $('#companybankAcId').focus();
        return false;
      }
      if (this.urls.length == 0) {
        swal("Please select attachment");
        return false;
      }

    }
    if (button_val == "modify") {
      if ($("#CrmCommentsId").val() == "") {
        swal("Please enter comments");
        return false;
      }
    }

    if (button_val == "reject") {
      if ($("#CrmCommentsId").val() == "") {
        swal("Please enter comments");
        return false;
      }
    }
    // if (this.filename == undefined) {
    //   if (base64array !== []) {
    //     for (var i = 0; i < base64array.length; i++) {
    //       this.tempfileInfo.push({
    //         "extension": base64array[i].extension,
    //         "name": base64array[i].name,
    //         "base64": base64array[i].base64
    //       });

    //     }
    //   } else {
    //     this.tempfileInfo = [];
    //   }

    // } else {
    //   if (base64array !== []) {
    //     for (var i = 0; i < base64array.length; i++) {
    //       this.tempfileInfo.push({
    //         "extension": base64array[i].extension,
    //         "name": base64array[i].name,
    //         "base64": base64array[i].base64
    //       });

    //     }
    //   }
    // }




    // this.fileInfo.push.apply(this.fileInfo, this.tempfileInfo);

    if ($("#BlockId").val() == "select") {
      this.blockIDvalue = null;
    } else {
      this.blockIDvalue = [$("#BlockId").val()];
    }
    this.banknamevalue = $('#bankNamesID').val();
    // this.banknametext = $('#bankNamesID').select2('data')[0].text;
    //  alert(this.banknamevalue)
    if (this.banknamevalue == "select" || this.banknamevalue == null) {
      this.banknamevalue = JSON.parse(null);
      this.banknametext = JSON.parse(null);
    } else {
      this.banknamevalue = $('#bankNamesID').val();
      this.banknametext = $('#bankNamesID').select2('data')[0].text;
    }

    if (confirm("Do you want to " + button_val + " the Page ?")) {
      console.log(this.attachmentArray)
      debugger;
      for (var i = 0; i < this.attachmentArray.length; i++) {
        this.tempfileInfo.push({
          "extension": this.attachmentArray[i].docName.split('.').pop(),
          "name": this.attachmentArray[i].docName,
          "filePath": this.attachmentArray[i].filePath,
          "url": this.attachmentArray[i].location
        });
        console.log("----------" + JSON.stringify(this.tempfileInfo))

      }
      if (this.tempfileInfo.length == 0) {
        this.tempfileInfo = null;
      } else {
        this.tempfileInfo = this.tempfileInfo;
      }

      if (json_response.bankAccountNumber == undefined) {
        json_response.bankAccountNumber = "";
      }

      if (this.blockIDvalue == null) {
        this.blockIDvalue = [];
      }


      if (this.finTransactionSetOffId == undefined || this.finTransactionSetOffId == "undefined" || this.finTransactionSetOffId == "") {
        this.finTransactionSetOffId = 0;
      }


      if (lagelinvoicenumber == undefined) {
        lagelinvoicenumber = null;
      }

      if (modificationinvoice == undefined) {
        modificationinvoice = null;
      }

      $('.page-loader-wrapper').show();
      // -------------------------------
      let url;
      if (button_val == "submit") {
        url = this.cmn.commonUrl + "financial/saveFinancialTransactionReceiptRequest.spring";
      } else if (button_val == "modify") {
        url = this.cmn.commonUrl + "financial/saveFinancialTransactionReceiptRequest.spring";
      } else if (button_val == "reject") {
        url = this.cmn.commonUrl + "financial/saveFinancialTransactionReceiptRequest.spring";
      }

      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      var body;
      if (button_val == "submit") {
        body = {
          "sessionKey": sessionStorage.getItem("login_sessionkey"),
          "siteId": $("#ProjectId").val(),
          "siteName": $('#ProjectId').select2('data')[0].text,
          "transactionTypeId": "1",
          "transactionModeId": '2',
          "transferModeId": json_response.transferModeId,
          "transactionTypeName": "Receipt",
          "transactionModeName": "Online",
          "transferModeName": json_response.transferMode,
          "referenceNo": json_response.referenceNo,
          //"transactionDate": json_response.createdDate,
          "transactionReceiveDate": json_response.transactionReceiveDate,
          "transactionAmount": json_response.amount,
          "payableAmount": "0",
          "blockIds": this.blockIDvalue,
          "floorIds": [],
          "flatIds": [flatId],
          "bookingFormId": flatId_bookingid,
          "bankId": this.banknamevalue,
          "bankName": this.banknametext,
          "bankAccountNumber": json_response.bankAccountNumber,
          "siteAccountId": json_response.siteAccountId,
          "siteBankAccountNumber": json_response.siteBankAccountNumber,
          "paymentSetOff": "true",
          "sourceOfFunds": $("#Sourcefound").val(),
          "paymentSetOffDetails": [{ "setOffTypeName": "Principal_Amount", "amount": $("#PrincipalAmount").val() }
            , { "setOffTypeName": "Fin_Penalty", "amount": $("#InterstAmount").val() }
            , { "setOffTypeName": "Refundable_Advance", "amount": $("#refunableCharges").val(), "invoiceNo": "" }
            , { "setOffTypeName": "Modification_Cost", "amount": $("#ModificationCharges").val(), "invoiceNo": modificationinvoice }
            , { "setOffTypeName": "Legal_Cost", "amount": $("#LeagalCharges").val(), "invoiceNo": lagelinvoicenumber }

            , { "setOffTypeName": "Car_Parking_Cost", "amount": $("#carparkingcost").val(), "invoiceNo": carparkinginvoicenumber }


            , { "finTransactionSetOffId": this.finTransactionSetOffId, "setOffTypeName": "TDS", "amount": $("#TdsAmount").val(), "paidByName": this.finpaidbyname }
            , { "setOffTypeName": "Maintenance_Charge", "amount": this.MaintinaceCharges }
            , { "setOffTypeName": "Corpus_Fund", "amount": this.CorpusFund }
            , { "setOffTypeName": "Individual_Flat_Khata_bifurcation_and_other_charges", "amount": this.FlatKhataBifurcation }

            , { "setOffTypeName": "Registration_And_Mutation_Charges", "amount": this.Registration_And_Mutation_Charges }
            , { "setOffTypeName": "Non_refundable_Caution_Deposit", "amount": this.Non_refundable_Caution_Deposit }
            , { "setOffTypeName": "Electricity_Deposit", "amount": this.Electricity_Deposit }

          ],
          "comment": $("#CrmCommentsId").val(),
          "comments": [],
          "fileInfos": this.tempfileInfo

        }

      } else if (button_val == "modify") {
        body = {
          "sessionKey": sessionStorage.getItem("login_sessionkey"),
          "siteId": this.siteId,
          "siteName": this.sitename,
          "anonymousEntryId": this.anonymous_EntryId,
          "operationType": "ModifySuspenceEntry",
          "comment": $("#CrmCommentsId").val(),
          "comments": [

          ]

          // this.siteId = json_response.siteId
          // this.sitename = json_response.siteName
          // "sessionKey": sessionStorage.getItem("login_sessionkey"),
          // "siteId": $("#ProjectId").val(),
          // "siteName": $('#ProjectId').select2('data')[0].text,
          // "transactionTypeId": "1",
          // "transactionModeId": '2',
          // "transferModeId": json_response.transferModeId,
          // "transactionTypeName": "Receipt",
          // "transactionModeName": "Online",
          // "transferModeName": json_response.transferMode,
          // "referenceNo": json_response.referenceNo,
          // //"transactionDate": json_response.createdDate,
          // "transactionReceiveDate": json_response.transactionReceiveDate,
          // "transactionAmount": json_response.amount,
          // "payableAmount": "0",
          // "blockIds": this.blockIDvalue,
          // "floorIds": [],
          // "flatIds": [flatId],
          // "bookingFormId": flatId_bookingid,
          // "bankId": this.bindingbankid,
          // "bankName": this.bindingbankname,
          // "bankAccountNumber": json_response.bankAccountNumber,
          // "siteAccountId": json_response.siteAccountId,
          // "siteBankAccountNumber": json_response.siteBankAccountNumber,
          // "paymentSetOff": "true",
          // "sourceOfFunds": $("#Sourcefound").val(),
          // "anonymousEntryId":this.anonymous_EntryId,
          // "operationType":"ModifySuspenceEntry",
          // "paymentSetOffDetails": [{ "setOffTypeName": "Principal_Amount", "amount": $("#PrincipalAmount").val() }
          //   , { "setOffTypeName": "Fin_Penalty", "amount": $("#InterstAmount").val() }
          //   , { "setOffTypeName": "Refundable_Advance", "amount": $("#refunableCharges").val(), "invoiceNo": "" }
          //   , { "setOffTypeName": "Modification_Cost", "amount": $("#ModificationCharges").val(), "invoiceNo": $("#ModificationInvoiceId").val() }
          //   , { "setOffTypeName": "Legal_Cost", "amount": $("#LeagalCharges").val(), "invoiceNo": $("#LegalInvoiceId").val() }
          //   , { "finTransactionSetOffId": this.finTransactionSetOffId, "setOffTypeName": "TDS", "amount": $("#TdsAmount").val(), "paidByName": this.finpaidbyname }
          // ],
          // "comment": $("#CrmCommentsId").val(),
          // "comments": [],
          // "fileInfos": this.tempfileInfo

        }

        console.log("modify :" + JSON.stringify(body));
      } else if (button_val == "reject") {
        body = {
          "sessionKey": sessionStorage.getItem("login_sessionkey"),
          "siteId": this.siteId,
          "siteName": this.sitename,
          "referenceNo": json_response.referenceNo,
          "transactionReceiveDate": json_response.transactionReceiveDate,
          "transactionAmount": json_response.amount,
          "anonymousEntryId": this.anonymous_EntryId,
          "operationType": "RejectSuspenceEntry",
          "comment": "",
          "comments": [

          ]
          // "sessionKey": sessionStorage.getItem("login_sessionkey"),
          // "siteId": $("#ProjectId").val(),
          // "siteName": $('#ProjectId').select2('data')[0].text,
          // "transactionTypeId": "1",
          // "transactionModeId": '2',
          // "transferModeId": json_response.transferModeId,
          // "transactionTypeName": "Receipt",
          // "transactionModeName": "Online",
          // "transferModeName": json_response.transferMode,
          // "referenceNo": json_response.referenceNo,
          // //"transactionDate": json_response.createdDate,
          // "transactionReceiveDate": json_response.transactionReceiveDate,
          // "transactionAmount": json_response.amount,
          // "payableAmount": "0",
          // "blockIds": this.blockIDvalue,
          // "floorIds": [],
          // "flatIds": [flatId],
          // "bookingFormId": flatId_bookingid,
          // "bankId": this.bindingbankid,
          // "bankName": this.bindingbankname,
          // "bankAccountNumber": json_response.bankAccountNumber,
          // "siteAccountId": json_response.siteAccountId,
          // "siteBankAccountNumber": json_response.siteBankAccountNumber,
          // "paymentSetOff": "true",
          // "sourceOfFunds": $("#Sourcefound").val(),
          // "anonymousEntryId":this.anonymous_EntryId,
          // "operationType":"RejectSuspenceEntry",
          // "paymentSetOffDetails": [{ "setOffTypeName": "Principal_Amount", "amount": $("#PrincipalAmount").val() }
          //   , { "setOffTypeName": "Fin_Penalty", "amount": $("#InterstAmount").val() }
          //   , { "setOffTypeName": "Refundable_Advance", "amount": $("#refunableCharges").val(), "invoiceNo": "" }
          //   , { "setOffTypeName": "Modification_Cost", "amount": $("#ModificationCharges").val(), "invoiceNo": $("#ModificationInvoiceId").val() }
          //   , { "setOffTypeName": "Legal_Cost", "amount": $("#LeagalCharges").val(), "invoiceNo": $("#LegalInvoiceId").val() }
          //   , { "finTransactionSetOffId": this.finTransactionSetOffId, "setOffTypeName": "TDS", "amount": $("#TdsAmount").val(), "paidByName": this.finpaidbyname }
          // ],
          // "comment": $("#CrmCommentsId").val(),
          // "comments": [],
          // "fileInfos": this.tempfileInfo

        }


      }


      console.log(url);
      console.log(JSON.stringify(body));

   

      this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
        console.log(JSON.stringify(resp));

        $('.page-loader-wrapper').hide();


        if (resp.responseCode == 200) {
          $('.page-loader-wrapper').hide();
          this.router.navigate(["crm-view-anonymous-entries"]);

          if (button_val == "submit") {
            swal("Transaction sent successfully");
          } else if (button_val == "modify") {
            swal("Suspense entry sent to modify successfully.");
          } else if (button_val == "reject") {
            swal("Suspense entry rejected successfully");
          }
          this.tempfileInfo = [];

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
          $('.page-loader-wrapper').hide();
          if (error == 440) {
            swal("Your Session has been Timed Out!", "Please login once again.", "error");
            this.router.navigate([""]);
          }
        }
      );
    } else { }

  }
  /*-------------------------------Final Submission End----------------------------*/
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

          console.log(file);

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

    console.log(readerEvt.target.result);

    this.binaryString = readerEvt.target.result;
    this.base64textString = btoa(this.binaryString);
    this.base64_array_object_data.push(btoa(this.binaryString));
    this.imageUrl = "data:image/jpeg;base64," + btoa(this.binaryString);

    console.log(this.imageUrl);

    $('#files').css("color", "transparent");

    this.tempfileInfo.push({
      "extension": this.filename_extension,
      "name": this.filename,
      "base64": this.imageUrl
    });


    console.log(this.tempfileInfo);


  }

  homeClick() {
    this.cmn.commonHomeNavigation();
  }

  goToList() {
    this.router.navigate(['crm-view-anonymous-entries'])
  }

  modificationInvoice(event: any) {
    // $("#ModificationInvoiceId").attr("disabled", false);
    if ($("#ModificationCharges").val() == '0' || $("#ModificationCharges").val() == '') {
      $("#ModificationInvoiceId").attr("disabled", true);
    } else {
      $("#ModificationInvoiceId").attr("disabled", false);
    }
  }

  legalInvoice(event: any) {
    // $("#LegalInvoiceId").attr("disabled", false);

    if ($("#LeagalCharges").val() == '0' || $("#LeagalCharges").val() == '') {
      $("#LegalInvoiceId").attr("disabled", true);
    } else {
      $("#LegalInvoiceId").attr("disabled", false);
    }
  }

  fileview(file) {
    window.open(file, '_system', 'location=yes,closebuttoncaption=Fechar,enableViewportScale=no');
  }

  keyPressAmount(event: any) {
    // -- for any symbols  /[0-9\+\-\ ]/
    const pattern = /[0-9\.\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }


  carparkingInvoice(event: any) {
    $("#CarparkingInvoiceId").attr("disabled", false);
  }



  flatsitewisechange(siteid) {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "flat/flatSite.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "ids": [siteid],
      "requestUrl": "All"
    }


    this.http.post(url, body).map(res => res.json()).subscribe(resp => {

      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#FaltId').html("");
        this.controller = [0];
        $('#FaltId').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#FaltId').append("<option value='" + resp.responseObjList[i].detId + "'>" + resp.responseObjList[i].name + "</option>");
          this.controller.push(resp.responseObjList[i].detId);
          $("#FaltId").attr("disabled", false)
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
        $('.page-loader-wrapper').hide();
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }




  /*-----------------Getting Flat list start---------------------*/
  forFlatbookingIdkList(flatid) {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/activeBlocksFlats.spring";

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "flatIds": [flatid]
    }


    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      console.log(resp);

      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        flatId = resp.responseObjList[0].flatId;
        flatId_bookingid = resp.responseObjList[0].flatBookingId;
        console.log(flatId_bookingid);
        this.gridDetails(flatId, flatId_bookingid);

      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        swal(resp.status);
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




  paidbynamefun(event) {

    if (event.target.value !== "" && event.target.value !== "0") {
      $("#paidbyname").prop("disabled", false);
    } else {
      $("#paidbyname").prop("disabled", true);

      $("#paidbyname").val("select");
      $("#paidbyname").trigger('change');
    }
  }



  fileClick(val) {

    window.open(val, '_system', 'location=yes,closebuttoncaption=Fechar,enableViewportScale=no');

  }


  fileClickfun(val, extensiontype) {

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

      console.log(json_response.bankId);

      if (resp.responseCode == 200) {
        for (var i = 0; i < resp.responseObjList.finBankResponseList.length; i++) {
          $('#bankNamesID').append("<option value='" + resp.responseObjList.finBankResponseList[i].finBankId + "'>" + resp.responseObjList.finBankResponseList[i].bankName + "</option>");

          $('#bankNamesID').val(json_response.bankId);
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
        $('.page-loader-wrapper').hide();
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }
  /*-----------------Getting Bank names list End---------------------*/

  carparkinginvoicefun() {

    window.open(carparkingdetails_url);
  }


}
