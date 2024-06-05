import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { RequestOptions, Headers, Http } from '@angular/http';
import { Router } from '@angular/router';

declare const $: any;
declare const swal: any
var json_totalticketresponse;
var json_response;
var json_totalticketresponse;
@Component({
  selector: 'app-viewandapprovetwo',
  templateUrl: './viewandapprovetwo.component.html',
  styleUrls: ['./viewandapprovetwo.component.sass']
})
export class ViewandapprovetwoComponent implements OnInit {

  file_name_array: any;
  file_val: any;
  binaryString: any;
  base64_array_object_data: any;
  base64textString: string;
  json_response: any;
  myimgg: boolean = true;
  fileExtension: any;
  textdisc: any;
  temp_fromDate: any = null;
  temp_toDate: any = null;
  selected_flat: any = []
  fltsCount: any = 0;
  fltsList: any;
  datesrelatedflatesstatus: boolean = true;

  startdate: any;
  enddate: any;
  sbualist: any = [];
  flatSeriesList: any;
  facingList: any;
  bhkTypeList: any;
  siteids: any = [];
  blockids: any = [];
  tickettotaldetailsresponse: any;
  currentpageindex: string;
  pageIndex: number = 0;
  ticketdetailsresponse: any;
  notificationIdd: any;
  siteNames: any = [];
  blockListnames: any = [];
  floorListnames: any = [];
  flatListnames: any = [];
  sbuaListnames: any = [];
  facingListnames: any = [];
  bhkTypeListnames: any = [];
  flatSeriesListnames: any = [];
  floorids: any = [];
  flatids: any = [];
  brundcumb_Click: string;
  title_ID: any;
  constructor(private cmn: CommonComponent, private http: Http, private router: Router,) {
    $('.page-loader-wrapper').hide();
    $(function () {
      $(".mat-paginator-page-size").css("display", "none")
    })

    this.brundcumb_Click = sessionStorage.getItem("brundcumbClick");
    json_totalticketresponse = eval('(' + sessionStorage.getItem('Totalticketdata1') + ')');
    this.tickettotaldetailsresponse = json_totalticketresponse;
    console.log("---------" + this.tickettotaldetailsresponse)
    this.currentpageindex = sessionStorage.getItem("currentpageindex");

    json_response = eval('(' + sessionStorage.getItem('ticketdetails_view') + ')');
    this.ticketdetailsresponse = json_response;
    this.json_response = eval('(' + sessionStorage.getItem('response') + ')');

    this.notificationIdd = this.json_response.id;
    //  alert(this.notificationIdd)
    //alert(this.tickettotaldetailsresponse.length)
    for (var i = 0; i < this.tickettotaldetailsresponse.length; i++) {
      //alert(this.tickettotaldetailsresponse[i].id)
      // alert(this.notificationIdd)
      if (this.tickettotaldetailsresponse[i].id == this.notificationIdd) {
        this.pageIndex = i;
      }
    }
    var nValFromSession = sessionStorage.getItem("nval");
    setTimeout(function () {
      if (nValFromSession == "4") {
        window.location.reload();
        sessionStorage.setItem("nval", "5");
      } else {

      }
    });
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
    this.base64textString = btoa(this.binaryString);
    this.base64_array_object_data.push(btoa(this.binaryString));
    //alert("Data: " + btoa(this.binaryString));


  }
  ngOnInit() {
 
    $("input").prop("disabled", true);
    
    this.json_response = eval('(' + sessionStorage.getItem('response') + ')');

    this.textdisc = this.json_response.description;
   
    this.notificationIdd = this.json_response.id;

    console.log(this.json_response.description);
    console.log(this.json_response.message);
    console.log(this.json_response.notificationText);
  

    $("#title_id").val(this.json_response.message);
    $("#notificationtext_id").val(this.json_response.notificationText);
    $("#projectID").val(this.json_response.siteNames);
    $("#BlockId").val(this.json_response.blockNames);
    $("#FloorId").val(this.json_response.floorNames);
    $("#FlatId").val(this.json_response.flatNamess);

  
    sessionStorage.setItem("projId", this.json_response.id)
    this.notificationViewDetails();
    if (this.json_response.imgLoc == "NA") {

    } else {
      var gDrivePath = this.json_response.imgLoc.split('//')[1].split('/')[0];
      if (gDrivePath == 'drive.google.com') {
        $("#myImg").hide();
        $('#driveImg').show();
      } else {
        $('#myImg').attr('src', this.json_response.imgLoc);
      }
    }


    // alert( this.json_response.linkFileLoc);
    if (this.json_response.linkFileLoc == "NA") {

    } else {
      var gDrivePath = this.json_response.linkFileLoc.split('/')[4];
      if (gDrivePath == 'sumadhura_projects_images') {
        var basename = this.json_response.linkFileLoc.split(/[\\/]/).pop(),  // extract file name from full path ...
          // (supports `\\` and `/` separators)

          pos = basename.lastIndexOf(".");       // get last position of `.`

        if (basename == "NA") {

        } else {
          if (basename === "" || pos < 1)            // if file name is empty or ...
            return "";                             //  `.` not found (-1) or comes first (0)
          this.fileExtension = basename.slice(pos + 1);
          // alert(basename.slice(pos + 1))
        }
      } else {
        this.fileExtension = 'gDriveFile';

      }
    }





    if (this.json_response.imgLoc == "NA") {

      this.myimgg = false;
      $('#myImg').attr('src', '');
      //alert("na")
    } else {
      // alert(this.json_response.imgLoc);
      this.myimgg = true;
      $('#myImg').attr('src', this.json_response.imgLoc);
    }

    $(function () {
      $('#myImg').on('click', function () {
        // alert( this.imgsrcId);
        var img = document.getElementById('myImg');
        // alert(img.getAttribute('src')); // foo.jpg
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
    function imageIsLoaded(e) {
      this.imgsrcId = e.target.result;
      //alert(e.target.result);
      $('#myImg').attr('src', e.target.result);
    };
    $("#projectID").select2({
      placeholder: "Search Project",
      keepOrder: true,
      dir: "ltl",

    });

    $("#BlockId").select2({
      placeholder: "Search Block",
      dir: "ltl"
    });

    $("#FloorId").select2({
      placeholder: "Search Floor",
      dir: "ltl"
    });

    $("#FlatId").select2({
      placeholder: "Search Flat",
      dir: "ltl"
    });
    var self_ = this;
    $(function () {

      $('#fromDate').change(function () {

        if ($("#projectID").val() == "select") {
          swal("Please select Project");
          $('#fromDate').val('')
          return false;
        }
        self_.forModelpopupclick('');
      });

      $('#toDate').change(function () {

        if ($("#projectID").val() == "select") {
          swal("Please select Project");
          $('#toDate').val('')
          return false;
        }
        self_.forModelpopupclick('');
      });
      $('#projectID').change(function (e) {
        var selected = $(e.target).val();
        console.log("projectIds :" + selected);
      });
      $('#BlockId').change(function (e) {
        var selected = $(e.target).val();
        console.log("blockIds :" + selected);
      });
      $('#FloorId').change(function (e) {
        var selected = $(e.target).val();
        console.log("floorIds :" + selected);
      });

      $('#FlatId').change(function (e) {
        var selected = $(e.target).val();
        console.log("flatIds :" + selected);
      });
    });


  }

  // getInnerHTML(val){
  //   return val.replace(/(<([^>]+)>)/ig,'');
  // }

  notificationViewDetails() {
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "notification/viewProjectNotificationDetailChanges.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": sessionStorage.getItem("login_sessionkey"),
      "id": this.notificationIdd,
      "notificationType": "Project"
    }

    console.log(body);

    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      console.log(resp);
      $('.page-loader-wrapper').hide();

      if (resp.responseCode == 200) {

      
       
        $("#title_id").html(resp.responseObjList.notificationRequests[0].message);
        $("#notificationtext_id").html(resp.responseObjList.notificationRequests[0].notificationText);
     //   this.textdisc = resp.responseObjList.notificationRequests[0].description;
       
        if (resp.responseObjList.notificationDetailChangesResonse[0].siteList == null) {
          $("#projectID").val('')
        } else {
          this.siteids = [];
          this.siteNames = [];
          for (var i = 0; i < resp.responseObjList.notificationDetailChangesResonse[0].siteList.length; i++) {
            this.siteNames.push(resp.responseObjList.notificationDetailChangesResonse[0].siteList[i].name)
            this.siteids.push(resp.responseObjList.notificationDetailChangesResonse[0].siteList[i].id)
          }
       
          $("#projectID").val(this.siteNames);
        }

        if (resp.responseObjList.notificationDetailChangesResonse[0].blockList == null) {
          $("#BlockId").val('')
        } else {
          for (var i = 0; i < resp.responseObjList.notificationDetailChangesResonse[0].blockList.length; i++) {
            this.blockListnames.push(resp.responseObjList.notificationDetailChangesResonse[0].blockList[i].name)
            this.blockids.push(resp.responseObjList.notificationDetailChangesResonse[0].blockList[i].id)
          }
          
          $("#BlockId").val(this.blockListnames);
        }

        if (resp.responseObjList.notificationDetailChangesResonse[0].floorList == null) {
          $("#FloorId").val('')
        } else {
          for (var i = 0; i < resp.responseObjList.notificationDetailChangesResonse[0].floorList.length; i++) {
            this.floorListnames.push(resp.responseObjList.notificationDetailChangesResonse[0].floorList[i].name)
            this.floorids.push(resp.responseObjList.notificationDetailChangesResonse[0].floorList[i].id)
          }
          $("#FloorId").val(this.floorListnames);
        }

        if (resp.responseObjList.notificationDetailChangesResonse[0].flatList == null) {
          // this.datesrelatedflatesstatus1 = true;
          $("#FlatId").val('')
        } else {
          // this.datesrelatedflatesstatus1 = false;
          for (var i = 0; i < resp.responseObjList.notificationDetailChangesResonse[0].flatList.length; i++) {
            this.flatListnames.push(resp.responseObjList.notificationDetailChangesResonse[0].flatList[i].name)
            this.flatids.push(resp.responseObjList.notificationDetailChangesResonse[0].flatList[i].id)
          }
          $("#FlatId").val(this.flatListnames);
        }

        if (resp.responseObjList.notificationDetailChangesResonse[0].sbuaList == null) {
          $("#sbuaID").val('')
        } else {
          for (var i = 0; i < resp.responseObjList.notificationDetailChangesResonse[0].sbuaList.length; i++) {
            this.sbuaListnames.push(resp.responseObjList.notificationDetailChangesResonse[0].sbuaList[i])
          }
          $("#sbuaID").val(this.sbuaListnames);
        }


        if (resp.responseObjList.notificationDetailChangesResonse[0].facingList == null) {
          $("#facingId").val('')
        } else {
          for (var i = 0; i < resp.responseObjList.notificationDetailChangesResonse[0].facingList.length; i++) {
            this.facingListnames.push(resp.responseObjList.notificationDetailChangesResonse[0].facingList[i])
          }
          $("#facingId").val(this.facingListnames);
        }


        if (resp.responseObjList.notificationDetailChangesResonse[0].bhkTypeList == null) {

        } else {
          for (var i = 0; i < resp.responseObjList.notificationDetailChangesResonse[0].bhkTypeList.length; i++) {
            this.bhkTypeListnames.push(resp.responseObjList.notificationDetailChangesResonse[0].bhkTypeList[i])
          }
          $("#typeId").val(this.bhkTypeListnames);
        }


        if (resp.responseObjList.notificationDetailChangesResonse[0].flatSeriesList == null) {

        } else {
          for (var i = 0; i < resp.responseObjList.notificationDetailChangesResonse[0].flatSeriesList.length; i++) {
            this.flatSeriesListnames.push(resp.responseObjList.notificationDetailChangesResonse[0].flatSeriesList[i])
          }
          $("#seriesId").val(this.flatSeriesListnames);
        }
        this.forModelpopupclick('');

      }
    },
      error => {
        console.log(error);
      }
    );
  }
  myimage(fileurl) {
    window.open(fileurl, '_system', 'location=yes,closebuttoncaption=Fechar,enableViewportScale=yes');
  }
  homeClick() {
    this.cmn.commonHomeNavigation();
  }

  notification_list() {
    if (sessionStorage.getItem("brundcumbClick") == "true") {

    } else {
      this.router.navigate(['project-notification-list']);
    }


  }
  ngOnDestroy() {
    sessionStorage.setItem("brundcumbClick", null)
  }
  viewReport() {
    this.router.navigate(['Project-Notification-View-Report']);

  }

  forModelpopupclick(text) {

    // if($('#fromDate').val() == ""){
    // this.temp_fromDate = null
    // }else{
    //   this.temp_fromDate = $('#fromDate').val()
    // }

    // if($('#toDate').val() == ""){
    //   this.temp_toDate = null
    // }else{
    //   this.temp_toDate = $('#toDate').val()
    // }
    // $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "notification/getFlatsByDates.spring";
    //http://localhost:9999/SumadhuraGateway/employeeservice/notification/getFlatsByDates.spring
    console.log("url :" + url);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    var body = {

      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "startDate": this.startdate,
      "endDate": this.enddate,
      "siteIds": this.siteids,
      //  "blockIds":selected_blockId
    }
    console.log("----count body :" + JSON.stringify(body));
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      console.log("Flates list based on click event response----------" + JSON.stringify(resp));
      if (resp.responseCode == 200) {
        this.selected_flat = []
        this.fltsList = resp.responseObjList;
        //  alert(JSON.stringify(this.fltsList))
        for (var i = 0; i < resp.responseObjList.length; i++) {
          this.selected_flat.push(resp.responseObjList[i].flatId);
        }

        this.fltsCount = this.selected_flat.length;
        if (this.fltsCount == 0) {
          if (text != "") {
            swal("No flats available")
          }

          $("#flatsmodelId").modal('hide');
        } else {
          if (text != "") {
            $("#flatsmodelId").modal('show');
          }

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
        //alert(error);
        $('.page-loader-wrapper').hide();
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }

  onChange(event, checked, item) {
    // this.temp = event.target.id.split("tablerowdata")[1];
    console.log(item);

    if (checked) {
      this.selected_flat.push(item.flatId);

      this.fltsCount = this.selected_flat.length;

    } else {


      this.selected_flat.splice(this.selected_flat.indexOf(item.flatId), 1)
      this.fltsCount = this.selected_flat.length;
    }
    console.log(this.selected_flat)
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
    this.notificationIdd = json_response.id;
    // alert(this.ticketdetailsresponse)
    this.notificationViewDetails();


  }



}
