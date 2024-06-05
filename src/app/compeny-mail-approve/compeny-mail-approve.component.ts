import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Http, RequestOptions, Headers } from '@angular/http';
import { CommonComponent } from '../common/common.component';

import { ActivatedRoute } from '@angular/router';
import { UnreadmessagesService } from '../unreadmessages.service';

declare const $: any;
declare const autosize: any;
declare const swal: any;
@Component({
  selector: 'app-compeny-mail-approve',
  templateUrl: './compeny-mail-approve.component.html',
  styleUrls: ['./compeny-mail-approve.component.sass']
})
export class CompenyMailApproveComponent implements OnInit {
  [x: string]: any;
  Authentication_id: any;
  redirectUrl: any;
  requestUrl: any;
  transactionEntryId: any;
  bookingFormId: any;
  transactionModeName: any;
  Url_empId: any;
  notificationId: any;
  mailPassword: any;
  action: any;
  project_controller: Array<any> = [];

  constructor(private router: Router, private http: Http, public cmn: CommonComponent,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute, private service: UnreadmessagesService) {
    $('.page-loader-wrapper').hide();

    $(".menu").hide()
    $(".navbar").hide()
    $(".container-fluid").hide()
    $(".container").hide()
    $(".sidebar").hide()

    this.route.queryParams
      .subscribe(params => {
        this.Authentication_id = params.Authentication_id;
        this.redirectUrl = params.redirectUrl;
        this.requestUrl = params.requestUrl;
        this.transactionEntryId = params.transactionEntryId;
        this.bookingFormId = params.bookingFormId;
        this.transactionModeName = params.transactionModeName;
        this.Url_empId = params.empId;
        this.notificationId = params.notificationId;
        this.mailPassword = params.mailPassword;
        this.action = params.action;

        if (this.Authentication_id == undefined) {
          this.Authentication_id = 0;
        } else {
          this.Authentication_id = this.Authentication_id;
        }

        console.log(this.Authentication_id);
        console.log(this.redirectUrl);
        console.log(this.requestUrl);
        console.log(this.transactionEntryId);
        console.log(this.bookingFormId);
        console.log(this.transactionModeName);
        console.log(this.Url_empId);
        console.log(this.notificationId);
        console.log(this.mailPassword);
        console.log(this.action);

        if (this.action == 'APPROVED') {
          $('.page-loader-wrapper').show();
          this.service.Approvenotificationfun(this.Url_empId, this.mailPassword, this.notificationId, this.action, null).then(resp => {
            console.log(resp);
            $('.page-loader-wrapper').hide();
            if (resp.responseCode == 200) {
              this.controller = resp.description;
            } else if (resp.responseCode == 440) {
              swal("Your Session has been Timed Out!", "Please login once again.", "error");
              this.router.navigate([""]);
            } else {
              $('.page-loader-wrapper').hide();
              swal(resp.errors[0]);
              return false;
            }
          }, error => {
            $('.page-loader-wrapper').hide();
            var error = JSON.parse(error._body).responseCode;
            if (error == 440) {
              swal("Your Session has been Timed Out!", "Please login once again.", "error");
              this.router.navigate([""]);
            }
          }
          );
        }


        if (this.action == 'Modify' || this.action == "REJECTED") {
          $('.page-loader-wrapper').show();
          this.service.Modifienotificationfun(this.notificationId).then(resp => {
            console.log(resp);
            $('.page-loader-wrapper').hide();
            if (resp.responseCode == 200) {


              this.Modifie_controller = resp.description;
              this.status_own = resp.status;

            } else if (resp.responseCode == 440) {
              swal("Your Session has been Timed Out!", "Please login once again.", "error");
              this.router.navigate([""]);
            } else {
              $('.page-loader-wrapper').hide();
              swal(resp.errors[0]);
              return false;
            }
          }, error => {
            $('.page-loader-wrapper').hide();
            var error = JSON.parse(error._body).responseCode;
            if (error == 440) {
              swal("Your Session has been Timed Out!", "Please login once again.", "error");
              this.router.navigate([""]);
            }
          }
          );
        }

        if (this.action == 'View') {

          $('.page-loader-wrapper').show();
          this.service.view_details_mail(this.notificationId).then(resp => {
            console.log(resp);
            $('.page-loader-wrapper').hide();
            if (resp.responseCode == 200) {

              $("#state_id").val(resp.responseObjList.notificationDetailChangesResonse[0].stateList[0].name);

              for (var i = 0; i < resp.responseObjList.notificationDetailChangesResonse[0].siteList.length; i++) {
                this.project_controller.push(resp.responseObjList.notificationDetailChangesResonse[0].siteList[i].name);
              }

              $("input").prop("disabled", true);
              $("textarea").prop("disabled", true);

              this.textdisc = resp.responseObjList.notificationRequests[0].description;

              $("#title_id").val(resp.responseObjList.notificationRequests[0].message);

              $("#project_id").val(this.project_controller);

              $("#notificationtext_id").val(resp.responseObjList.notificationRequests[0].notificationText);
              this.json_response = resp.responseObjList.notificationRequests[0];

              var gDrivePath = resp.responseObjList.notificationRequests[0].imgLoc.split('//')[1].split('/')[0];
              if (gDrivePath == 'drive.google.com') {
                $("#myImg").hide();
                $('#driveImg').show();
              } else {
                $('#myImg').attr('src', resp.responseObjList.notificationRequests[0].imgLoc);
              }


              if (resp.responseObjList.notificationRequests[0].imgLoc == "NA") {
                this.myimgg = false;
                $('#myImg').attr('src', '');
                //alert("na")
              } else {
                this.myimgg = true;
                // alert(this.json_response.imgLoc);
                $('#myImg').attr('src', resp.responseObjList.notificationRequests[0].imgLoc);
              }
              //  alert( this.json_response.linkFileLoc);
              if (resp.responseObjList.notificationRequests[0].linkFileLoc != "NA") {
                var gDrivePath = resp.responseObjList.notificationRequests[0].linkFileLoc.split('/')[4];
                if (gDrivePath == 'sumadhura_projects_images') {
                  var basename = resp.responseObjList.notificationRequests[0].linkFileLoc.split(/[\\/]/).pop(),  // extract file name from full path ...
                    // (supports `\\` and `/` separators)
                    pos = basename.lastIndexOf(".");       // get last position of `.`

                  if (basename === "" || pos < 1)            // if file name is empty or ...
                    return "";                             //  `.` not found (-1) or comes first (0)
                  this.fileExtension = basename.slice(pos + 1);
                } else {
                  this.fileExtension = 'gDriveFile';

                }
              }



            } else if (resp.responseCode == 440) {
              swal("Your Session has been Timed Out!", "Please login once again.", "error");
              this.router.navigate([""]);
            } else {
              $('.page-loader-wrapper').hide();
              swal(resp.errors[0]);
              return false;
            }
          }, error => {
            $('.page-loader-wrapper').hide();
            var error = JSON.parse(error._body).responseCode;
            if (error == 440) {
              swal("Your Session has been Timed Out!", "Please login once again.", "error");
              this.router.navigate([""]);
            }
          }
          );


        }


      });

  }

  ngOnInit() {

    //alert(this.json_response.imgLoc);
    $(function () {
      $('#myImg').on('click', function () {
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



    }


  }


  RejectModifyNotification() {

    console.log(this.Authentication_id);
    console.log(this.redirectUrl);
    console.log(this.requestUrl);
    console.log(this.transactionEntryId);
    console.log(this.bookingFormId);
    console.log(this.transactionModeName);
    console.log(this.Url_empId);
    console.log(this.notificationId);
    console.log(this.mailPassword);
    console.log(this.action);

    if ($("#Comments").val() == "" || $("#Comments").val() == undefined) {
      swal("Please enter the comments.");
      return false;
    }

    $('.page-loader-wrapper').show();
    this.service.Approvenotificationfun(this.Url_empId, this.mailPassword, this.notificationId, this.action, $("#Comments").val()).then(resp => {
      console.log(resp);
      $('.page-loader-wrapper').hide();
      if (resp.responseCode == 200) {
        //this.controller = resp.description;
        $("#Comments").val("");
        swal(resp.description);

        return false;

      } else if (resp.responseCode == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      } else {
        $('.page-loader-wrapper').hide();
        swal(resp.errors[0]);
        return false;
      }
    }, error => {
      $('.page-loader-wrapper').hide();
      var error = JSON.parse(error._body).responseCode;
      if (error == 440) {
        swal("Your Session has been Timed Out!", "Please login once again.", "error");
        this.router.navigate([""]);
      }
    }
    );




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

  myimage(fileurl) {
    console.log(fileurl)
    window.open(fileurl, '_system', 'location=yes,closebuttoncaption=Fechar,enableViewportScale=yes');
  }

  homeClick() {
    this.cmn.commonHomeNavigation();
  }

  backToList() {
    sessionStorage.setItem('isBackButtonClickedAll', 'true');
    this.router.navigate(["View-All-Company-Notifications"]);
  }






}

