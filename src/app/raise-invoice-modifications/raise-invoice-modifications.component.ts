import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { DynamicGrid } from '../model/DynamicGrid';
import { NgForm } from '@angular/forms';
import { ModificationCostDetailsRequest } from '../model/ModificationCostDetailsRequest.model';

declare const $: any;
declare const swal: any;
var selected_projectid;
var selected_blockid;
var selected_floorid;
var selected_flatid;
var entered_rate = 0;
var entered_quantity = 0;
var totalAmount = 0;
var Total_amount =0;

@Component({
  selector: 'app-raise-invoice-modifications',
  templateUrl: './raise-invoice-modifications.component.html',
  styleUrls: ['./raise-invoice-modifications.component.sass']
})
export class RaiseInvoiceModificationsComponent implements OnInit {
  showRemaining: boolean = false;
  availableAliasNames: any;
  selectedSiteID: any;
  dynamicselect: any;
  financialProjectMileStoneRequests: any = [];
  blockID: any;
  temdate_milestone_createDate: string;
  selectedBlockID: any;
  selectedSiteIDArray: any;
  selectedFloorID: any;
  selectedFlatID: any;
  customerName: any;
  bookingFormID: any;
  transactionAmount: number = 0;
  projectName: any;
  afterGST: number = 0;
  GSTAmount: number = 0;
  CGSTAmount: number = 0;
  SGSTAmount: number = 0;
  GSTpercentage: any = 0;
  milestoneArray: Array<DynamicGrid> = [];
  milestone: DynamicGrid = {
    detailsOfModification: "",
    units: "",
    quantity: "",
    rate: "",
    amount: ""
  };
  modificationCostDetailsRequest: ModificationCostDetailsRequest;
  isValidFormSubmitted = false;
  modiCostDtlsRequests: Array<ModificationCostDetailsRequest> = [];

  @ViewChild('raiseInvoice') form: NgForm;
  // milestone: DynamicGrid; 
  constructor(private cmn: CommonComponent, private http: Http, private router: Router) {

    $('.page-loader-wrapper').hide();
    this.siteList();
    this.percentagesList();
  }

  ngAfterViewInit() {
  }

  ngOnInit() {

    var self = this;
    //this.milestone = {detailsOfModification: "", units: "",quantity:"",rate:"",amount:""};  

    this.milestoneArray.push(this.milestone);
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
      $('.demo').keypress(function (event) {
        var $this = $(this);
        if ((event.which != 46 || $this.val().indexOf('.') != -1) &&
          ((event.which < 48 || event.which > 57) &&
            (event.which != 0 && event.which != 8))) {
          event.preventDefault();
        }

        var text = $(this).val();
        if ((event.which == 46) && (text.indexOf('.') == -1)) {
          setTimeout(function () {
            if ($this.val().substring($this.val().indexOf('.')).length > 3) {
              $this.val($this.val().substring(0, $this.val().indexOf('.') + 3));
            }
          }, 1);
        }

        if ((text.indexOf('.') != -1) &&
          (text.substring(text.indexOf('.')).length > 2) &&
          (event.which != 0 && event.which != 8) &&
          ($(this)[0].selectionStart >= text.length - 2)) {
          event.preventDefault();
        }
      });

      $('.demo').bind("paste", function (e) {
        var text = e.originalEvent.clipboardData.getData('Text');
        if ($.isNumeric(text)) {
          if ((text.substring(text.indexOf('.')).length > 3) && (text.indexOf('.') > -1)) {
            e.preventDefault();
            $(this).val(text.substring(0, text.indexOf('.') + 3));
          }
        }
        else {
          e.preventDefault();
        }
      });



      $("#percentageID").select2({
        placeholder: "--Select--",
        dir: "ltl"
      });
      $('#percentageID').change(function (e) {

        selected_projectid = $(e.target).val();
        var percentage_text = $(e.target).select2('data')[0].text
        // $('#blocksID').show();

        //  $('#blocksID').show();
        // $('#floorsID').hide();
        // $('#flatsID').hide();
        // $('#customerName').hide();
        //  $('#totalTableID').hide();
        if (percentage_text == "--Select--") {
          $("#labelhideshow").hide()
        } else {
          // alert(percentage_text)
          $("#labelhideshow").show()
          self.valbindFun(percentage_text);

        }
      })
      $('#projectID').change(function (e) {

        selected_projectid = $(e.target).val();
        // $('#blocksID').show();

        //  $('#blocksID').show();
        // $('#floorsID').hide();
        // $('#flatsID').hide();
        // $('#customerName').hide();
        //  $('#totalTableID').hide();
        if (selected_projectid == "select") {
          // $("#BlockId").val('select')
          // $('#BlockId').select2().trigger('change');
          // $("#floorSelection").val('select')
          // $('#floorSelection').select2().trigger('change');
          // $("#flatSelection").val('select')
          // $('#flatSelection').select2().trigger('change');
        } else {
          self.projectchangeFun(selected_projectid);
          self.floorsitewisechange(selected_projectid);
          self.siteBank_Ac_List(selected_projectid) 

        }
      })

      $('#BlockId').change(function (e) {
        selected_blockid = $(e.target).val();
        // $('#floorsID').show();
        if (selected_blockid == "select") {
          //   $("#BlockId").val('select')
          //   $('#BlockId').select2().trigger('change');
          //  $("#floorSelection").val('select')
          //  $('#floorSelection').select2().trigger('change');
          //  $("#flatSelection").val('select')
          //  $('#flatSelection').select2().trigger('change');
        }
        // $('#floorsID').show();
        // $('#flatsID').hide();
        $('#customerName').hide();
        $('#totalTableID').hide();

        if (selected_blockid == "select") {
          // swal("please select the block");
        } else {
          self.blockchangeFun(selected_blockid);
          self.floorlist_byblock(selected_blockid);
          self.flatwiseblockchange(selected_blockid);
        }
      })

      $('#floorSelection').change(function (e) {
        this.selectedFloorID = "";
        selected_floorid = $(e.target).val();
        // $('#flatsID').show();
        if (selected_blockid == "select") {
          //   $("#BlockId").val('select')
          //   $('#BlockId').select2().trigger('change');
          //   $("#floorSelection").val('select')
          //   $('#floorSelection').select2().trigger('change');
          //  $("#flatSelection").val('select')
          //  $('#flatSelection').select2().trigger('change');
        }
        if (selected_floorid == "select") {
          //  swal("please select the floor");
        } else {
          // self.floorchangeFun(selected_floorid);
          //  self.FloorOnChangeFun(selected_floorid);
          self.flatsitewisechange(selected_floorid);
        }
      })

      $('#flatSelection').change(function (e) {
        this.selectedFlatID = "";
        selected_flatid = $(e.target).val();

        if (selected_flatid == "select") {

          $("#customerName").hide();
          $("#totalTableID").hide();

          //  swal("please select the flat");
        } else {
          self.flatchangeFun(selected_flatid);
        }
      })

    })

  }

  addRow(index) {

    this.isValidFormSubmitted = true;
    // console.log(this.form.form.get('milestone_name0').invalid);
    // this.getTouched('milestone_name',0);
    if (this.form.invalid) {
      swal('Please enter valid data');
      return false;
    }
    this.milestone = { detailsOfModification: "", units: "", quantity: "", rate: "", amount: "" };
    this.milestoneArray.splice(index + 1, 0, this.milestone);
    //this.milestoneArray.push(this.milestone);  
    this.isValidFormSubmitted = false;

    return true;
  }

  deleteRow(index) {
    if (this.milestoneArray.length == 1) {
      swal('Deleting the first row is not allowed');
      return false;
    } else {
      this.milestoneArray.splice(index, 1);
      this.calculation();
      return true;
    }
  }


  onChange(event: Event) {


    this.calculation();
    $(function () {
      $('#percentageID').val(['select']);
      $('#percentageID').trigger('change');
      $("#labelhideshow").hide()
    })
  }


  calculation() {


    this.transactionAmount = 0;
    for (var milestone of this.milestoneArray) {

      if (milestone.quantity != undefined && milestone.quantity != "" && milestone.rate != "") {
        var n = (milestone.quantity * milestone.rate);
        var result = Math.floor(n * 100) / 100;
       milestone.amount = result;
       // Total_amount = parseFloat(milestone.quantity) * parseFloat(milestone.rate);
        //milestone.amount = milestone.amount.toFixed(3);
        this.transactionAmount = this.transactionAmount + milestone.amount;
      } else {
        milestone.amount = 0;
      }
    }


  }



  // firechange(event){
  //   var name = event.target.attributes.getNamedItem('ng-reflect-name').value;
  //   console.log('name')
  // }
  // firechange(event){
  //   console.log(this.form.controls[event.target.id].valid);
  // }

  getTouched(name): boolean {


    const control = this.form.form.get(name);

    return control ? control.dirty : false;
  }

  getValidity(name): boolean {


    const control = this.form.form.get(name);

    return control ? control.invalid : false;
  }

  /*-----------------Getting Project(site) list Start---------------------*/
  siteList() {
    $('.page-loader-wrapper').show();

    let url = this.cmn.commonUrl + "financial/raisedMilestoneSites.spring";
    // http://106.51.38.64:9999/employeeservice/site/site.spring

    let headers = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "actionUrl": "Modification Invoice"
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
        //alert(resp.status);
        swal(resp.errors[0]);
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
    // hhttp://106.51.38.64:9999/employeeservice/block/blocks.spring


    let headers = new Headers({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      //  "siteIds": [Number($('#projectID').val())]//[Number(selectedSiteID)]
      "ids": [Number($('#projectID').val())],
      "requestUrl": "All"
    }


    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 200) {
        $('#blocksID').show();
        $('#BlockId').html("");
        $('#BlockId').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#BlockId').append("<option value='" + resp.responseObjList[i].detId + "'>" + resp.responseObjList[i].name + "</option>");
        }
        this.flatsitewisechange(this.selectedSiteID);
      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        swal(resp.errors[0]);
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
    //this.selectedBlockID.push(Number(selectedBlockID));
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/activeBlocksFlats.spring";
    // hhttp://106.51.38.64:9999/employeeservice/block/blocks.spring


    let headers = new Headers({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "blockIds": [Number($('#BlockId').val())],
      "condition": "Modification Cost",
      "siteIds": [$("#projectID").val()],
      "actionUrl": "LoadBlockFloorFlatDetails"
    }


    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 200) {
        $('#floorsID').show();
        $('#floorSelection').html("");
        $('#floorSelection').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#floorSelection').append("<option value='" + resp.responseObjList[i].floorId + "'>" + resp.responseObjList[i].floorName + "</option>");
        }
      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        swal(resp.errors[0]);
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
    // this.selectedFloorID.push(Number(selectedFloorID));
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/activeBlocksFlats.spring";
    // hhttp://106.51.38.64:9999/employeeservice/block/blocks.spring


    let headers = new Headers({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "floorIds": [Number($('#floorSelection').val())],
      "blockIds": [Number($('#BlockId').val())],
      "condition": "Modification Cost",
      "siteIds": [$("#projectID").val()],
      "actionUrl": "LoadBlockFloorFlatDetails"
    }


    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 200) {
        $('#flatsID').show();
        $('#flatSelection').html("");
        $('#flatSelection').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#flatSelection').append("<option value='" + resp.responseObjList[i].flatId + "'>" + resp.responseObjList[i].flatNo + "</option>");
        }
      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        swal(resp.errors[0]);
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
    //this.selectedFlatID.push(Number(selectedFlatID));
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

    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/activeBlocksFlats.spring";
    // hhttp://106.51.38.64:9999/employeeservice/block/blocks.spring


    let headers = new Headers({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "flatIds": [Number($('#flatSelection').val())]
    }


    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 200) {
        this.customerName = resp.responseObjList[0].customerName;
        this.bookingFormID = resp.responseObjList[0].flatBookingId;
        this.projectName = resp.responseObjList[0].siteName;
        $('#customerName').show();
        // $('#totalTableID').show();
        $('#submitButtonID').show();
        $('#calculationPart').show();
        $('#calculateButton').show();
        this.getGSTPercentage();
      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        swal(resp.errors[0]);
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

  /*------------------------Get GST percentage and Calculation Functionality Start--------------------*/
  getGSTPercentage() {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/getTaxPercentage.spring";


    let headers = new Headers({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "typeName": "Modification_Cost",
      "siteIds": [$("#projectID").val()],
    }


    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 200) {

        this.GSTpercentage = resp.responseObjList.finPenaltyTaxResponseList[0].percentageValue;
        $('#totalTableID').show();

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
        //alert(error);
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }


  convertMilestonerArrayToModificationCostDetailsRequestArray() {

    this.modiCostDtlsRequests = [];

    for (var milestone of this.milestoneArray) {

      this.modificationCostDetailsRequest = {
        modificationChargeDesc: milestone.detailsOfModification,
        units: milestone.units,
        quantity: milestone.quantity,
        rate: milestone.rate,
        basicAmount: milestone.amount
      };
      this.modiCostDtlsRequests.push(this.modificationCostDetailsRequest);
    }

  }
  /*------------------------Get GST percentage and Calculation Functionality End--------------------*/

  onSubmit(form) {





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

    if ($('#percentageID').val() == 'select') {
      swal("Please select percentage");
      return false;
    }

    if ($("#companybankAcId").val() == "select" || $("#companybankAcId").val() == null|| $("#companybankAcId").val() == undefined || $("#companybankAcId").val() == "") {
      swal("Please select company bank account number");
      return false;
    }
    // if (isNaN(this.afterGST)) {
    //   swal("Please check your transaction amount");
    //   return false;
    // }


    let url = this.cmn.commonUrl + "financial/doModificationChargesEntry.spring"


    this.convertMilestonerArrayToModificationCostDetailsRequestArray();
    $('.page-loader-wrapper').show();
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "percentageId": $('#percentageID').val(),
      "percentageValue": $('#percentageID').select2('data')[0].text,
      "siteId": $('#projectID').val(), //"111",
      "siteName": "" + this.projectName,
      "blockIds": [Number($('#BlockId').val())], //[160],
      "floorIds": [], //[12],
      "flatIds": [Number($('#flatSelection').val())],// [1087],
      "bookingFormId": "" + this.bookingFormID,
      "transactionAmount": "" + this.afterGST,
      "modiCostDtlsRequests": this.modiCostDtlsRequests,
      "comment": $("#Comments").val(),
      "siteAccountId": $("#companybankAcId").val(),
      "siteBankAccountNumber": $('#companybankAcId').select2('data')[0].text,

    }


   

    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      console.log(url);
      console.log(JSON.stringify(body));
      console.log(JSON.stringify(resp));

      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {

       if(resp.responseObjList != null){
        window.open(resp.responseObjList.url, '_blank', 'location=yes,closebuttoncaption=Fechar,enableViewportScale=no');
       } 

       setTimeout(() => {
        location.reload();
      },2000);
   

        swal("Modification Invoice sent Successfully !!");
        return false;

      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        // alert(resp.status);
        swal(resp.errors[0]);
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


  /*----------------- Raise Invoice Start ---------------------*/

  // raiseInvoiceModification(){
  //     //debugger;
  //     this.transactionAmount = 0;
  //     this.modiCostDtlsRequests = [];

  //     $('.tabletrClass').each(function(){
  //       var id = $(this).attr('id').split('-')[1];

  //       if($('#milestone_name'+id).val() == ""){
  //         swal("please enter the modification details");
  //         return false;
  //       }


  //       if($('#units'+id).val() == ""){
  //         swal("please enter the units");
  //         return false;
  //       }

  //       if($('#quntity'+id).val() == ""){
  //         swal("please enter the quantity");
  //         return false;
  //       }

  //       if($('#rate'+id).val() == ""){
  //         swal("please enter the rate");
  //         return false;
  //       }

  //       if($('#amount'+id).val() == ""){
  //         swal("please enter the amount");
  //         return false;
  //       }
  //     })

  //     if($('#projectID').val() == "select"){
  //       swal("please select the site");
  //       return false;
  //     }

  //     if($('#BlockId').val() == "select"){
  //       swal("please select the block");
  //       return false;
  //     }

  //     if($('#floorSelection').val() == "select"){
  //       swal("please select the floor");
  //       return false;
  //     }

  //     if($('#flatSelection').val() == "select"){
  //       swal("please select the flat");
  //       return false;
  //     }

  //      var self = this;
  //      $('.tabletrClass').each(function(){

  //         var id = $(this).attr('id').split('-')[1];

  //         self.modiCostDtlsRequests.push({
  //           "modificationChargeDesc": ""+$('#milestone_name'+id).val(),//"dsada",
  //           "units": ""+$('#units'+id).val(),//"kg's",
  //           "quantity": ""+$('#quntity'+id).val(),//"2",
  //           "rate": ""+$('#rate'+id).val(),//"100.00",
  //           "basicAmount": ""+$('#amount'+id).val(),//"200.00"
  //         });

  //      })
  //     console.log("modiCostDtlsRequests array: "+JSON.stringify(this.modiCostDtlsRequests));
  //     for(let i=0;i<this.modiCostDtlsRequests.length;i++){
  //       this.transactionAmount = Number(this.transactionAmount) + Number(this.modiCostDtlsRequests[i].basicAmount);
  //       console.log("total amount"+this.transactionAmount);
  //     }

  //     $('.page-loader-wrapper').show();
  //     //debugger;

  //     let url = this.cmn.commonUrl + "financial/doModificationChargesEntry.spring"
  //     console.log("doModificationChargesEntry url :" + url);

  //     let headers = new Headers({ 'Content-Type': 'application/json' });
  //     //let options = new RequestOptions({ headers: headers });

  //     var body = {
  //       "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
  //       "siteId":$('#projectID').val(), //"111",
  //       "siteName": ""+this.projectName,
  //       "blockIds": [Number($('#BlockId').val())], //[160],
  //       "floorIds": [Number($('#floorSelection').val())], //[12],
  //       "flatIds": [Number($('#flatSelection').val())],// [1087],
  //       "bookingFormId": ""+this.bookingFormID,
  //       "transactionAmount":""+this.transactionAmount,
  //       "modiCostDtlsRequests": this.modiCostDtlsRequests
  //     }

  //     console.log("----doModificationChargesEntry body :" + JSON.stringify(body));
  //     this.http.post(url, body).map(res => res.json()).subscribe(resp => {
  //       $('.page-loader-wrapper').hide();
  //       console.log("doModificationChargesEntry response----------" + JSON.stringify(resp));
  //       if (resp.responseCode == 200) {
  //         // location.reload();
  //         // $("#projectID option[value]").remove();
  //         // $("#BlockId option[value]").remove();
  //         window.open(resp.responseObjList.url);
  //         console.log(JSON.stringify(resp.responseObjList.url));
  //         swal("Good job!","Invoice sent Sucessfully !!","success");

  //       }else if(resp.responseCode ==440){
  //         swal("Your Session has been Timed Out!", "Please login once again.", "error");
  //         this.router.navigate([""]);
  //       }else{
  //         alert(resp.status);
  //       }
  //     },
  //       error => {
  //         var error = JSON.parse(error._body).responseCode;
  //         //alert(error);
  //         $('.page-loader-wrapper').hide();
  //         if (error == 440) {
  //           swal("Your Session has been Timed Out!", "Please login once again.", "error");
  //           this.router.navigate([""]);
  //         }
  //       }
  //     );  
  // }
  /*----------------- Create milestone End ---------------------*/
  homeClick() {
    this.cmn.commonHomeNavigation();
  }

  customTrackBy(index: number, obj: any): any {
    return index;
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

  floorlist_byblock(value) {
    let url = this.cmn.commonUrl + "flat/flatBlock.spring";
    // http://localhost:8080/employeeservice/flat/flatBlock.spring

    let headers = new Headers({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "ids": value
    }

    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      //$('.page-loader-wrapper').hide();

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
        alert(resp.status);
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

  FloorOnChangeFun(value) {
    //alert("test");
    let url = this.cmn.commonUrl + "flat/flat.spring";
    //http://localhost:8080/employeeservice/flat/flat.spring


    let headers = new Headers({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "ids": value
    }

    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      //$('.page-loader-wrapper').hide();

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
        alert(resp.status);
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

  /*-----------------Getting Percentage list Start---------------------*/
  percentagesList() {
    let url = this.cmn.commonUrl + "financial/mileStonePercentages.spring";
    // http://106.51.38.64:9999/employeeservice/site/site.spring

    let headers = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey")
    }

    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      //$('.page-loader-wrapper').hide();

      if (resp.responseCode == 200) {
        // var Options = "";
        this.dynamicselect = resp;
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#percentageID').append("<option value='" + resp.responseObjList[i].percentagesId + "'>" + resp.responseObjList[i].percentage + "</option>");
        }
      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        // alert(resp.status);
        swal(resp.errors[0]);
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
  /*-----------------Getting Percentsge list End---------------------*/
  valbindFun(percent) {
    // alert(percent)
    this.GSTAmount = (this.transactionAmount * percent) / 100;
    // alert( this.GSTAmount)
    var CGSTAmount = this.GSTAmount / 2;
    $("#cgst").html(CGSTAmount)
    var SGSTAmount = this.GSTAmount / 2;

    $("#sgst").html(SGSTAmount)
    this.afterGST = this.transactionAmount + this.GSTAmount;
    $("#aftertax").html(this.afterGST)
  }


  mobilenumberfun(event: any) {
    const pattern = /[0-9\.\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  pastemobilenumEvent(event: ClipboardEvent) {
    const clipboardData = event.clipboardData;
    const pastedText = clipboardData.getData('text');
    const pattern = /[0-9\.\ ]/;
    if (!pattern.test(pastedText)) {
      event.preventDefault();
    }
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
      "condition": "MODIFICATION_COST",
      "requestUrl":"createModiInvoicePage"
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