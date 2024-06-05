import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { DynamicGrid } from '../model/DynamicGrid';
import { NgForm } from '@angular/forms';
import { CarparkingCostDetailsRequest } from '../model/carparkingCostDetailsReuest.model';


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
  selector: 'app-car-parking-invoice',
  templateUrl: './car-parking-invoice.component.html',
  styleUrls: ['./car-parking-invoice.component.sass']
})
export class CarParkingInvoiceComponent implements OnInit {

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
  modificationCostDetailsRequest: CarparkingCostDetailsRequest;
  isValidFormSubmitted = false;
  modiCostDtlsRequests: Array<CarparkingCostDetailsRequest> = [];
  @ViewChild('raiseInvoice') form: NgForm;
  constructor(private cmn: CommonComponent, private http: Http, private router: Router) {

    $('.page-loader-wrapper').hide();
    this.siteList();
  
  }

  ngAfterViewInit() {
  }

  ngOnInit() {




    var self = this;
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
        if (percentage_text == "--Select--") {
          $("#labelhideshow").hide()
        } else {
          $("#labelhideshow").show()
          self.valbindFun(percentage_text);

        }
      })
      $('#projectID').change(function (e) {

        selected_projectid = $(e.target).val();
        if (selected_projectid == "select") {
        } else {
          self.projectchangeFun(selected_projectid);
          self.floorsitewisechange(selected_projectid);
          self.siteBank_Ac_List(selected_projectid) 
          self.percentagesList(selected_projectid);
        }
      })

      $('#BlockId').change(function (e) {
        selected_blockid = $(e.target).val();
        if (selected_blockid == "select") {
        }
        $('#customerName').hide();
        $('#totalTableID').hide();

        if (selected_blockid == "select") {
        } else {
          self.blockchangeFun(selected_blockid);
          self.floorlist_byblock(selected_blockid);
          self.flatwiseblockchange(selected_blockid);
        }
      })

      $('#floorSelection').change(function (e) {
        this.selectedFloorID = "";
        selected_floorid = $(e.target).val();
        if (selected_blockid == "select") {
        }
        if (selected_floorid == "select") {
        } else {
          self.flatsitewisechange(selected_floorid);
        }
      })

      $('#flatSelection').change(function (e) {
        this.selectedFlatID = "";
        selected_flatid = $(e.target).val();

        if (selected_flatid == "select") {

          $("#customerName").hide();
          $("#totalTableID").hide();

        } else {
          self.flatchangeFun(selected_flatid);
        }
      })

    

    })

  }

  addRow(index) {

    this.isValidFormSubmitted = true;
    if (this.form.invalid) {
      swal('Please enter valid data');
      return false;
    }
    this.milestone = { detailsOfModification: "", units: "", quantity: "", rate: "", amount: "" };
    this.milestoneArray.splice(index + 1, 0, this.milestone);
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
        this.transactionAmount = this.transactionAmount + milestone.amount;
      } else {
        milestone.amount = 0;
      }
    }
  }

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
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "actionUrl": "Car Parking Invoice"
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

  /*------------------------Projects On Change Functionality Start--------------------*/
  projectchangeFun(selectedSiteID) {
    this.selectedSiteID = JSON.parse(selectedSiteID);
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "block/blocks.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
   
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
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
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/activeBlocksFlats.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
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
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/activeBlocksFlats.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
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
    
    if ($("#projectID").val() == "select") {
      swal("Please select Project");
      return false;
    }

  
    if ($("#flatSelection").val() == "select") {
      swal("Please select Flat");
      return false;
    }

    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/activeBlocksFlats.spring";
   

    let headers = new Headers({ 'Content-Type': 'application/json' });
  
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
      console.log(milestone);

      this.modificationCostDetailsRequest = {
        carParkingChargeDesc: milestone.detailsOfModification,
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
  


    let url = this.cmn.commonUrl + "financial/doCarParkingChargesEntry.spring"


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
      "carParkingCostDtlsRequests": this.modiCostDtlsRequests,
      "comment": $("#Comments").val(),
      "siteAccountId": $("#companybankAcId").val(),
      "siteBankAccountNumber": $('#companybankAcId').select2('data')[0].text,

    }


  console.log(url);
  console.log(JSON.stringify(body));




    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
    console.log(resp);

      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {

       if(resp.responseObjList != null){
        window.open(resp.responseObjList.url, '_blank', 'location=yes,closebuttoncaption=Fechar,enableViewportScale=no');
       } 

       setTimeout(() => {
        location.reload();
      },2000);
   

        swal("Car Parking Invoice sent Successfully !!");
        return false;

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
        
        $('#flatSelection').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#flatSelection').append("<option value='" + resp.responseObjList[i].detId + "'>" + resp.responseObjList[i].name + "</option>");
        
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
       
        $('#flatSelection').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#flatSelection').append("<option value='" + resp.responseObjList[i].detId + "'>" + resp.responseObjList[i].name + "</option>");
         
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
  

    let headers = new Headers({ 'Content-Type': 'application/json' });
   
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "ids": value
    }

    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
   

      var Options = "";
      $('#FlatId').html("");
      if (resp.responseCode == 200) {

        for (var i = 0; i < resp.responseObjList.length; i++) {
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
       
        $('.page-loader-wrapper').hide();
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }

  FloorOnChangeFun(value) {
  
    let url = this.cmn.commonUrl + "flat/flat.spring";
 


    let headers = new Headers({ 'Content-Type': 'application/json' });
   
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "ids": value
    }

    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      

      if (resp.responseCode == 200) {
        var Options = "";
      
        $('#FlatId').html("");
        for (var i = 0; i < resp.responseObjList.length; i++) {
        
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
       
        $('.page-loader-wrapper').hide();
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }

  /*-----------------Getting Percentage list Start---------------------*/
  percentagesList(siteid) {
    let url = this.cmn.commonUrl + "financial/mileStonePercentages.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
   
    }
    console.log(body);

    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
     console.log(resp);

      if (resp.responseCode == 200) {
        this.dynamicselect = resp;
        for (var i = 0; i < resp.responseObjList.length; i++) {
          $('#percentageID').append("<option value='" + resp.responseObjList[i].percentagesId + "'>" + resp.responseObjList[i].percentage + "</option>");
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
  /*-----------------Getting Percentsge list End---------------------*/
  valbindFun(percent) {
    
    this.GSTAmount = (this.transactionAmount * percent) / 100;
   
    var CGSTAmount = (this.GSTAmount / 2).toFixed(3);
    $("#cgst").html(CGSTAmount)
    var SGSTAmount = (this.GSTAmount / 2).toFixed(3);

    $("#sgst").html(SGSTAmount)
    this.afterGST = (this.transactionAmount + this.GSTAmount);
    $("#aftertax").html(this.afterGST.toFixed(3))
  }


  mobilenumberfun(event: any) {
    if (event.which === 32 && event.target.selectionStart === 0) {
      return false;
    } else {
      const pattern = /^[0-9]*$/;
      const inputChar = String.fromCharCode(event.charCode);
      if (event.keyCode !== 8 && !pattern.test(inputChar)) {
        event.preventDefault();
      }

    }
  }

  nospace(event: any) {
    const pattern = /^\S/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
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

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteIds": [siteid],
      "condition": "CAR_PARKING_COST",
      "requestUrl": "createModiInvoicePage"
    }

  

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
     

      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        $('.page-loader-wrapper').hide();
        $('#companybankAcId').html('');
        $('#companybankAcId').append('<option value="select">--Select--</option>');
        for (var i = 0; i < resp.responseObjList.finProjectAccountResponseList.length; i++) {
          $('#companybankAcId').append("<option value='" + resp.responseObjList.finProjectAccountResponseList[i].siteAccountId + "'>" + resp.responseObjList.finProjectAccountResponseList[i].siteBankAccountNumber + "</option>");
        }
       
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
