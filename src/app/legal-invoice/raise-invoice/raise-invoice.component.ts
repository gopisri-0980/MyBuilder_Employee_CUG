import { Component, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { CommonComponent } from 'src/app/common/common.component';
import { FinBookingFormLglCostDtls } from 'src/app/model/FinBookingFormLglCostDtls';
import { FinBookingFormLegalCost } from 'src/app/model/FinBookingFormLegalCost';
declare const $: any;
declare const swal: any;
var selected_projectid;
var selected_blockid;
var selected_floorid;
var selected_flatid;
var selected_bookingid;
var entered_rate = 0;
var entered_quantity = 0;
var totalAmount = 0;

@Component({
  selector: 'app-raise-invoice',
  templateUrl: './raise-invoice.component.html',
  styleUrls: ['./raise-invoice.component.sass']
})
export class RaiseInvoiceComponent implements OnInit {
  showRemaining: boolean = false;
  availableAliasNames: any;
  selectedSiteID: any;
  dynamicselect: any;
  financialProjectMileStoneRequests: any = [];
  blockID: any;
  temdate_milestone_createDate: string;
  selectedBlockID: any[] = [];
  selectedSiteIDArray: any[] = [];
  selectedFloorID: any[] = [];
  selectedFlatID: any[] = [];
  customerName: any;
  modiCostDtlsRequests: any[] = [];
  bookingFormID: any;
  transactionAmount: number = 0;
  projectName: any;
  afterGST: number = 0;
  GSTAmount: number = 0;
  CGSTAmount: number = 0;
  SGSTAmount: number = 0;
  GSTpercentage: any = 0;
  finTaxMappingId: any = 0;
  flatArray: number[] = [];
  flatbooking_Id: any;

  constructor(private cmn: CommonComponent, private http: Http, private router: Router) {
    $('.page-loader-wrapper').hide();
    this.siteList();
  }

  ngAfterViewInit() {
  }

  ngOnInit() {
    var self = this;

    $("#companybankAcId").select2({
      placeholder: "Search Company Bank Account",
      dir: "ltl"
    });
    $("#projectID").select2({
      placeholder: "Select Project",
      dir: "ltl",
    });

    $("#BlockId").select2({
      placeholder: "Select Block",
      dir: "ltl"
    });

    $("#floorSelection").select2({
      placeholder: "--Select--",
      dir: "ltl"
    });

    $("#flatSelection").select2({
      placeholder: "--Select--",
      dir: "ltl"
    });

    $(function () {
      $('#amount').bind("cut copy paste", function (e) {
        e.preventDefault();
      });
      $('#projectID').change(function (e) {
        selected_projectid = $(e.target).val();
        // $('#blocksID').show();
        // $('#floorsID').hide();
        // $('#flatsID').hide();
        if (selected_projectid == "select") {
          $("#BlockId").val('select')
          $('#BlockId').select2().trigger('change');
          $("#floorSelection").val('select')
          $('#floorSelection').select2().trigger('change');
          $("#flatSelection").val('select')
          $('#flatSelection').select2().trigger('change');
        }


        $('#customerName').hide();
        $('#totalTableID').hide();
        if (selected_projectid == "select") {
          // swal("please select project");
        } else {
          self.projectchangeFun(selected_projectid);
          // self.projectchangeFun(selected_projectid);
          self.floorsitewisechange(selected_projectid);
          self.flatsitewisechange(selected_projectid);
          self.siteBank_Ac_List(selected_projectid)
        }
      })

      $('#BlockId').change(function (e) {
        $('#customerName').hide();
        selected_blockid = $(e.target).val();
        if (selected_blockid == "select") {
          // $("#BlockId").val('select')
          // $('#BlockId').select2().trigger('change');
          $("#floorSelection").val('select')
          $('#floorSelection').select2().trigger('change');
          $("#flatSelection").val('select')
          $('#flatSelection').select2().trigger('change');
        }
        // $('#floorsID').show();
        // $('#customerName').hide();
        // $('#flatsID').hide();
        $('#totalTableID').hide();
        if (selected_blockid == "select") {
          //  swal("please select the block");
        } else {
          self.blockchangeFun(selected_blockid);
          self.flatwiseblockchange(selected_blockid);
        }
      })

      // $('#floorSelection').change(function(e){
      //   $('#customerName').hide();
      //   $('#totalTableID').hide();
      //   this.selectedFloorID = "";
      //   selected_floorid = $(e.target).val();
      //   $('#flatsID').show();
      //   if(selected_floorid == "select"){
      //     // $("#BlockId").val('select')
      //     // $('#BlockId').select2().trigger('change');
      //    // $("#floorSelection").val('select')
      //   //  $('#floorSelection').select2().trigger('change');
      //     $("#flatSelection").val('select')
      //     $('#flatSelection').select2().trigger('change');
      //   }
      //   if(selected_floorid == "select"){
      //    // swal("please select the floor");
      //   }else{
      //     self.floorchangeFun(selected_floorid);
      //   }
      // })

      $('#flatSelection').change(function (e) {
        this.selectedFlatID = "";
        selected_flatid = $(e.target).val().split("$")[0];
        selected_bookingid = $(e.target).val().split("$")[1];

        if (selected_flatid == "select") {
          //   swal("please select the flat");

          $("#totalTableID").hide();
          $("#customerName").hide();
        } else {
          self.flatchangeFun(selected_flatid);
          self.flatchangeFun1(selected_flatid);

        }
      })

    })

  }







  /*-----------------Getting Project(site) list Start---------------------*/
  siteList() {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/raisedMilestoneSites.spring";
    console.log("raisedMilestoneSites url :" + url);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "actionUrl": "Legal Invoice"
    }
    console.log("raisedMilestoneSites body :" + JSON.stringify(body))
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      console.log("raisedMilestoneSites Site list response----------" + JSON.stringify(resp));
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
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
      }

    },
      error => {
        $('.page-loader-wrapper').hide();

        var error = JSON.parse(error._body).responseCode;
        //alert(error);
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }
  /*-----------------Getting Project(site) list End---------------------*/

  /*------------------------Projects On Change Functionality Start--------------------*/
  projectchangeFun(selectedSiteID) {
    this.selectedSiteID = JSON.parse(selectedSiteID);
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "block/blocks.spring";
    console.log("activeBlocksFlats url :" + url);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      //"siteIds": [Number($('#projectID').val())],//[Number(selectedSiteID)],
      "ids": [Number($('#projectID').val())],
      "requestUrl": "All"
    }

    console.log(body);
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      console.log(resp);
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#BlockId').html("");
        $('#BlockId').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#BlockId').append("<option value='" + resp.responseObjList[i].detId + "'>" + resp.responseObjList[i].name + "</option>");
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
  /*------------------------Projects On Change Functionality End--------------------*/

  /*------------------------Block On Change Functionality Start--------------------*/
  blockchangeFun(selectedBlockID) {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/activeBlocksFlats.spring";
    console.log(url);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "blockIds": [Number($('#BlockId').val())],
      "condition": "Legal Cost",
      "siteIds": [$("#projectID").val()],
      "actionUrl": "LoadBlockFloorFlatDetails"
    }

    console.log(JSON.stringify(body));
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      console.log(JSON.stringify(resp));
      if (resp.responseCode == 200) {
        $('#floorSelection').html("");
        $('#floorSelection').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#floorSelection').append("<option value='" + resp.responseObjList[i].floorId + "'>" + resp.responseObjList[i].floorName + "</option>");
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
  /*------------------------Blocks On Change Functionality End--------------------*/

  /*------------------------Floors On Change Functionality Start--------------------*/
  floorchangeFun(selectedFloorID) {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/activeBlocksFlats.spring";
    console.log(url);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "floorIds": [Number($('#floorSelection').val())],
      "blockIds": [Number($('#BlockId').val())],
      "condition": "Legal Cost",
      "siteIds": [$("#projectID").val()],
      "actionUrl": "LoadBlockFloorFlatDetails"
    }

    console.log(JSON.stringify(body));
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      console.log(resp);
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#flatSelection').html("");
        $('#flatSelection').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#flatSelection').append("<option value='" + resp.responseObjList[i].flatId + "$" + resp.responseObjList[i].flatBookingId + "'>" + resp.responseObjList[i].flatNo + "</option>");
          // this.customerName =  resp.responseObjList[i].customerName;
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
  /*------------------------Floors On Change Functionality End--------------------*/


  /*------------------------Floors On Change Functionality Start--------------------*/

  flatchangeFun(selectedFlatID) {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/activeBlocksFlats.spring";
    console.log("activeBlocksFlats customer name url :" + url);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "flatIds": [selectedFlatID],

    }


    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      console.log("activeBlocksFlats customer name response----------" + JSON.stringify(resp));
      if (resp.responseCode == 200) {
        this.customerName = resp.responseObjList[0].customerName;
        this.bookingFormID = resp.responseObjList[0].flatBookingId;
        this.projectName = resp.responseObjList[0].siteName;
        $('#totalTableID').show();
        $('#submitButtonID').show();
        $('#calculationPart').show();
        $('#calculateButton').show();
        $('#customerName').show();
        this.getGSTPercentage();
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









    //   $('.page-loader-wrapper').show();
    //   let url = this.cmn.commonUrl + "financial/activeBlocksFlats.spring";
    //   // hhttp://106.51.38.64:9999/employeeservice/block/blocks.spring
    //   console.log("activeBlocksFlats customer name url :" + url);

    //   let headers = new Headers({ 'Content-Type': 'application/json' });
    //  // let options = new RequestOptions({ headers: headers });
    //   var body = {
    //     "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
    //     "flatIds":[Number($('#flatSelection').val())]
    //   }

    //   console.log("----activeBlocksFlats customer name body :" + JSON.stringify(body));
    //   this.http.post(url, body).map(res => res.json()).subscribe(resp => {
    //     $('.page-loader-wrapper').hide();
    //     console.log("activeBlocksFlats customer name response----------" + JSON.stringify(resp));
    //     if(resp.responseCode == 200){
    //        // this.customerName = resp.responseObjList[0].customerName;
    //        // this.bookingFormID = resp.responseObjList[0].flatBookingId;
    //        // this.projectName = resp.responseObjList[0].siteName;
    //       //  $('#customerName').show();
    //         $('#totalTableID').show();
    //         $('#submitButtonID').show();
    //         $('#calculationPart').show();
    //         $('#calculateButton').show();
    //         this.getGSTPercentage();
    //     }else if(resp.responseCode ==440){
    //       swal("Your Session has been Timed Out!", "Please login once again.", "error");
    //       this.router.navigate([""]);
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




  }


  /*------------------------Floors On Change Functionality End--------------------*/

  /*------------------------Get GST percentage and Calculation Functionality Start--------------------*/
  getGSTPercentage() {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/getTaxPercentage.spring";
    console.log("getTaxPercentage url :" + url);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "typeName": "Legal_Cost",
      "siteIds": [$("#projectID").val()],
    }

    console.log("getTaxPercentage body :" + JSON.stringify(body));
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      console.log("getTaxPercentage response----------" + JSON.stringify(resp));
      if (resp.responseCode == 200) {
        this.GSTpercentage = resp.responseObjList.finPenaltyTaxResponseList[0].percentageValue;
        this.finTaxMappingId = resp.responseObjList.finPenaltyTaxResponseList[0].finTaxMappingId;
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
        var error = JSON.parse(error._body).responseCode;
        //alert(error);
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }

  calculateTotalAmount() {
    debugger;
    this.transactionAmount = 0;
    this.modiCostDtlsRequests = [];

    var self = this;

    $('.tabletrClass').each(function () {
      var id = $(this).attr('id').split('-')[1];
      self.modiCostDtlsRequests.push({
        "basicAmount": "" + $('#amount' + id).val()
      });
    })

    console.log("modiCostDtlsRequests array: " + JSON.stringify(this.modiCostDtlsRequests));
    for (let i = 0; i < this.modiCostDtlsRequests.length; i++) {
      this.transactionAmount = Number(this.transactionAmount) + Number(this.modiCostDtlsRequests[i].basicAmount);
      console.log("total amount" + this.transactionAmount);
    }
  }
  /*------------------------Get GST percentage and Calculation Functionality End--------------------*/




  /*----------------- Raise Invoice Start ---------------------*/

  raiseInvoiceModification() {
   // alert("test")
    this.transactionAmount = 0;
    this.modiCostDtlsRequests = [];

    $('.tabletrClass').each(function () {
      var id = $(this).attr('id').split('-')[1];

      if ($('#milestone_name' + id).val() == "") {
        swal("please enter the modification details");
        return false;
      }


      if ($('#units' + id).val() == "") {
        swal("please enter the units");
        return false;
      }

      if ($('#quntity' + id).val() == "") {
        swal("please enter the quantity");
        return false;
      }

      if ($('#rate' + id).val() == "") {
        swal("please enter the rate");
        return false;
      }

      if ($('#amount' + id).val() == "") {
        swal("please enter the amount");
        return false;
      }
    })

    if ($('#projectID').val() == "select") {
      swal("please select the site");
      return false;
    }

    if ($('#BlockId').val() == "select") {
      swal("please select the block");
      return false;
    }

    if ($('#floorSelection').val() == "select") {
      swal("please select the floor");
      return false;
    }

    if ($('#flatSelection').val() == "select") {
      swal("please select the flat");
      return false;
    }

    var self = this;
    $('.tabletrClass').each(function () {

      var id = $(this).attr('id').split('-')[1];

      self.modiCostDtlsRequests.push({
        "modificationChargeDesc": "" + $('#milestone_name' + id).val(),//"dsada",
        "units": "" + $('#units' + id).val(),//"kg's",
        "quantity": "" + $('#quntity' + id).val(),//"2",
        "rate": "" + $('#rate' + id).val(),//"100.00",
        "basicAmount": "" + $('#amount' + id).val(),//"200.00"
      });

    })
    console.log("modiCostDtlsRequests array: " + JSON.stringify(this.modiCostDtlsRequests));
    for (let i = 0; i < this.modiCostDtlsRequests.length; i++) {
      this.transactionAmount = Number(this.transactionAmount) + Number(this.modiCostDtlsRequests[i].basicAmount);
      console.log("total amount" + this.transactionAmount);
    }

    $('.page-loader-wrapper').show();
    debugger;

    let url = this.cmn.commonUrl + "financial/doModificationChargesEntry.spring"
    console.log("doModificationChargesEntry url :" + url);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: headers });

    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteId": $('#projectID').val(), //"111",
      "siteName": "" + this.projectName,
      "blockIds": [Number($('#BlockId').val())], //[160],
      "floorIds": [Number($('#floorSelection').val())], //[12],
      "flatIds": [Number($('#flatSelection').val())],// [1087],
      "bookingFormId": "" + this.bookingFormID,
      "transactionAmount": "" + this.transactionAmount,
      "modiCostDtlsRequests": this.modiCostDtlsRequests
    }

    console.log("----doModificationChargesEntry body :" + JSON.stringify(body));
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      console.log("doModificationChargesEntry response----------" + JSON.stringify(resp));
      if (resp.responseCode == 200) {
        // location.reload();
        // $("#projectID option[value]").remove();
        // $("#BlockId option[value]").remove();

        window.open(resp.responseObjList.url, '_system', 'location=yes,closebuttoncaption=Fechar,enableViewportScale=no');

        console.log(JSON.stringify(resp.responseObjList.url));
        swal("Good job!", "Invoice sent Sucessfully !!", "success");

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

  onChange(event: Event) {
    //window.alert('****** control is inside the noOnChanges *******')
    this.GSTAmount = (Number(this.transactionAmount) * Number(this.GSTpercentage)) / 100;
    this.CGSTAmount = Number(this.GSTAmount) / 2
    this.SGSTAmount = Number(this.GSTAmount) / 2;
    this.afterGST = Number(this.transactionAmount) + Number(this.GSTAmount);
  }

  /* when he clicks on home symbol it will navigate to Leave Updates Page */
  homeClick() {
    this.cmn.commonHomeNavigation();
  }

  onSubmit() {
    if ($("#projectID").val() == "select") {
      swal("Please select Project");
      return false;
    }

    // if ($("#BlockId").val() == "select") {
    //   swal("Please select Block");
    //   return false;
    // }
    // if ($("#floorSelection").val() == "select") {
    //   swal("Please select Floor");
    //   return false;
    // }
    if ($("#flatSelection").val() == "select") {
      swal("Please select Flat");
      return false;
    }

    if ($("#companybankAcId").val() == "select" || $("#companybankAcId").val() == null|| $("#companybankAcId").val() == undefined || $("#companybankAcId").val() == "") {
      swal("Please select company bank account number");
      return false;
    }

    debugger;
    console.log('****** control is inside the onSubmit *******');

    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/saveLegalCharges.spring"
    console.log("save Legal charges url :" + url);


    let finBookingFormLglCostDtls: FinBookingFormLglCostDtls = { legalAmount: this.transactionAmount, description: "Flat Legal and Documentation charges" };
    let finBookingFormLglCostDtlsList: Array<FinBookingFormLglCostDtls>;
    finBookingFormLglCostDtlsList = [finBookingFormLglCostDtls];
    let finBookingFormLegalCostList: Array<FinBookingFormLegalCost>;
    let taxAmount = (Number(this.transactionAmount) * Number(this.GSTpercentage)) / 100;
    let totalAmount = Number(this.transactionAmount) + Number(taxAmount);
    let finBookingFormLegalCost: FinBookingFormLegalCost = { legalAmount: this.transactionAmount, taxAmount: taxAmount, totalAmount: totalAmount, finBookingFormLglCostDtlsList: finBookingFormLglCostDtlsList };
    finBookingFormLegalCostList = [finBookingFormLegalCost];

    // let bookingIds:[] = $('#flatSelection').val();
    // const flatBookingIds = bookingIds.map(x => Number.parseInt(x, 10));

    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "finTaxMappingId": this.finTaxMappingId,
      "percentageValue": this.GSTpercentage,
      "siteIds": [Number($('#projectID').val())], //"[111]",
      "bookingFormIds": [this.flatbooking_Id],
      "finBookingFormLegalCostList": finBookingFormLegalCostList,
      "siteAccountId": $("#companybankAcId").val(),
      "siteBankAccountNumber": $('#companybankAcId').select2('data')[0].text,
    }

    console.log("----Raise Lega invoice body :" + JSON.stringify(body));
    this.http.post(url, body)
      .map(res => res.json()).subscribe(resp => {
        $('.page-loader-wrapper').hide();
        console.log(resp);
        if (resp.responseCode == 200) {
          window.open(resp.responseObjList[0].url, '_blank');

          //console.log(resp.responseObjList[0].url);
          swal("Invoice sent Sucessfully !!");
          //  location.reload();      
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
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  floorsitewisechange(siteid) {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "floor/floorSite.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "ids": [siteid],
      "requestUrl": "All"
    }
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#floorSelection').html("");
        $('#floorSelection').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#floorSelection').append("<option value='" + resp.responseObjList[i].detId + "'>" + resp.responseObjList[i].name + "</option>");
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
      console.log("flat List----- :" + JSON.stringify(resp))
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#flatSelection').html("");
        //  this.controller = [0];
        $('#flatSelection').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#flatSelection').append("<option value='" + resp.responseObjList[i].detId + "'>" + resp.responseObjList[i].name + "</option>");
          // this.controller.push(resp.responseObjList[i].detId);
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
  flatwiseblockchange(blockid) {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "flat/flatBlock.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "ids": [blockid],
      "requestUrl": "All"
    }
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('#flatSelection').html("");
        //  this.controller = [0];
        $('#flatSelection').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#flatSelection').append("<option value='" + resp.responseObjList[i].detId + "'>" + resp.responseObjList[i].name + "</option>");
          //  this.controller.push(resp.responseObjList[i].detId);
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
  flatchangeFun1(selectedFlatID) {

    $('.page-loader-wrapper').show();
    // -------------------------------
    let url = this.cmn.commonUrl + "financial/activeBlocksFlats.spring";
    // http://localhost:8080/employeeservice/flat/flatBlock.spring
    console.log("url :" + url);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: headers }); 
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "flatIds": [selectedFlatID]
    }
    console.log("----body :" + JSON.stringify(body));
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      //$('.page-loader-wrapper').hide();
      console.log("flat change response----------" + JSON.stringify(resp));
      //this.Blocklinks =  resp;
      if (resp.responseCode == 200) {

        $('.page-loader-wrapper').hide();

        this.flatbooking_Id = resp.responseObjList[0].flatBookingId;




        // this.form = this.formBuilder.group({
        //   bankName: new FormControl(bankName, Validators.required)
        // });

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

  siteBank_Ac_List(siteid) {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl2 + "financial/viewFinProjectAccountDataForInvoices.spring";
console.log("ac num url :"+url)
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteIds": [siteid],
      "condition": "LEGAL_COST",
      "requestUrl":"createLegalInvoicePage"
    }

    console.log("ac num req :"+JSON.stringify(body));

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      console.log(JSON.stringify("ac num response :"+resp));

      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        $('#companybankAcId').html('');
        $('#companybankAcId').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.finProjectAccountResponseList.length; i++) {
          $('#companybankAcId').append("<option value='" + resp.responseObjList.finProjectAccountResponseList[i].siteAccountId + "'>" + resp.responseObjList.finProjectAccountResponseList[i].siteBankAccountNumber + "</option>");
        }
       // $("#companybankAcId").attr("disabled", false)
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
}
