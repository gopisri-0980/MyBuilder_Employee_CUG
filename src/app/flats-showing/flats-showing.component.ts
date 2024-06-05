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


@Component({
  selector: 'app-flats-showing',
  templateUrl: './flats-showing.component.html',
  styleUrls: ['./flats-showing.component.css']
})
export class FlatsShowingComponent implements OnInit {
  controller_sites_list : Array<any> = [];
  singledd4 = {};
  fltas_array: any;
  tooltipHover: boolean[] = [];
  // fltas_array : any=[]

  new_site_creation: Array<any> = [];
  controller_data: Array<any> = [];
  view_controller: Array<any> = [];
  module_based_checked: any;
  disableread: boolean[] = [];
  disabled: boolean = true;

  constructor(private _router: Router, private deviceService: DeviceDetectorService, public route: ActivatedRoute, private router: Router, private http: Http, public cmn: CommonComponent) {
    $('.page-loader-wrapper').hide();
   

   this.singledd4 = {
    singleSelection: false,
    enableSearchFilter: true,
    searchPlaceholderText: 'Search',
    classes: 'my_dropdown1',
    unSelectAllText: 'UnSelect All',
    //lazyLoading: true,
  };

  }

  ngOnInit() {
    this.siteList();
  }


  sites_selectedSIDs(event) {
    this.controller_data = [];
    this.new_site_creation.push(event);
    for (var i = 0; i < this.new_site_creation.length; i++) {
      this.controller_data.push(this.new_site_creation[i].id);
    }

  }
  sites_onSelectAll(event) {
    this.new_site_creation = [];
    this.controller_data = [];

    this.new_site_creation.push(event);
    for (var i = 0; i < this.new_site_creation[0].length; i++) {
      this.controller_data.push(this.new_site_creation[0][i].id);
    }
  }
  sites_onItemDeSelect(event) {
    this.new_site_creation = this.new_site_creation.filter((el) => el.id !== event.id);
    this.controller_data = [];
    for (var i = 0; i < this.new_site_creation.length; i++) {
      this.controller_data.push(this.new_site_creation[i].id);
    }

  }
  sites_onDeSelectAll(event) {
    this.new_site_creation = [];
    this.controller_data = [];
  }


  

 /*-----------------Getting Project(site) list Start---------------------*/
  siteList() {
    var arr = localStorage.getItem('SiteIDS_singlepage');

    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "site/site.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    var body = {
     // "sessionKey":"CB1CEA215B6643911AC25FEAD3B90BAD6A87CE87BF504E99FD0D3B973016187E","siteIds":["201"]
       "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
       "siteIds": JSON.parse(arr).map(String)
    }
    console.log(JSON.stringify(body))
    this.http.post(url, body).map(res => res.json()).subscribe(resp => {
      console.log(JSON.stringify(resp))
      if (sessionStorage.getItem("customeridsession") == null || sessionStorage.getItem("customeridsession") == "") {
        $('.page-loader-wrapper').hide();
      }


      if (resp.responseCode == 200) {
        this.controller_sites_list = [];

        this.controller_sites_list = resp.responseObjList;
        this.controller_sites_list.forEach((o: any, i) => (o.id = o.id));


      
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


  search_function(){
    console.log(this.controller_data);
    if (this.controller_data.length == 0 || this.controller_data == undefined) {
      swal("Please select the project");
      return false;
    }


    $(".page-loader-wrapper").show();
    let url = this.cmn.commonUrl + "flat/getAllFlats.spring";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "siteIds": this.controller_data,
    }

    console.log(url);
    console.log(body);
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {

      console.log(resp);

      $(".page-loader-wrapper").hide();
      if (resp.responseCode == 200) {
        this.fltas_array = resp.responseObjList;

        
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
        // this.preloader = false;
        var error = JSON.parse(error._body).responseCode;
        if (error == 440) {
          swal("Your Session has been Timed Out!", "Please login once again.", "error");
          this.router.navigate([""]);
        }
      }
    );
  }





}
