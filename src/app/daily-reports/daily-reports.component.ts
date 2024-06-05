import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { RequestOptions, Http } from '@angular/http';
import { Router } from '@angular/router';
declare const $: any;
declare const swal:any;
var selected_projectid;
var status_for_block_links:boolean;
var mileStoneAliasName;
var finMilestoneClassifidesId
var siteid;
var startDate;
var endDate;

@Component({
  selector: 'app-daily-reports',
  templateUrl: './daily-reports.component.html',
  styleUrls: ['./daily-reports.component.sass']
})
export class DailyReportsComponent implements OnInit {
  selectedSiteID: any;
  availableAliasNames: any;
  milestonedemand_details: any;
  isSelected: boolean;
  aliasfinanceID: any;
  milestoneAlias: any;
  ticketEmployee_Report: any;
  ticketEscalationLevel_EmployeeDetails: any;
  ticketReporting_Pojos: any;
  end_Date:any;
  constructor(private cmn: CommonComponent, private http: Http, private router: Router) {
    $('.page-loader-wrapper').hide();
    $(".menu").hide()
    $(".navbar").hide()
    $(".container-fluid").hide()
    $(".container").hide()
    $(".sidebar").hide()
  }

  ngOnInit() {
    var self = this;

    $("#projectID").select2({
      placeholder: "Select Project",
      dir: "ltl",
    });
var self=this;
    $(function(){
      console.log(window.location.href)
      // var url_string = window.location.href;
      var temp = window.location.href;
     // var temp = "http://106.51.38.64:8888/sumadhura_CUG/#/leave-update?siteIds=111,102&startDate=1587925800000&endDate=1588012199000"
      console.log("temp :"+temp);
      var url_string = temp.replace("/#","");
        console.log(url_string);
               //var url_string = "http://106.51.38.64:9999/sumadhura_UAT/leave-update?siteIds=111,102&startDate=1587925800000&endDate=1588012199000"
     var url = new URL(url_string);
      siteid = url.searchParams.get("siteIds");
     startDate = url.searchParams.get("startDate");
     endDate = url.searchParams.get("endDate");
     
     console.log(siteid);
     self.siteList();
      $('#projectID').change(function(e){
        selected_projectid = $(e.target).val();
        var sitetext = $('#projectID').select2('data')[0].text
        $("#sitenmae").html(sitetext)

        if($('#projectID').val() == "select"){
          swal("please select the site");
          return false;
        }

        if(selected_projectid == ""){
           
        }else{

         self.milestoneDetails(selected_projectid);
        }
      })
    })
    
  
  
  }

  /*-----------------Getting Project(site) list Start---------------------*/
 siteList() {
 
  $('.page-loader-wrapper').show();
  var site_ids = siteid.split(',').map(Number);
  let url = "http://129.154.74.18:8090/employeeservice/ticketreport/site.spring";
 // let url = "http://106.51.38.64:8888/employeeservice/ticketreport/site.spring";
 
  console.log("url :" + url);

  let headers = new Headers({ 'Content-Type': 'application/json' });
  //let options = new RequestOptions({ headers: headers });

  var body = {
    "siteIds":site_ids
  }
  console.log("body :" + JSON.stringify(body));

  this.http.post(url, body).map(res => res.json()).subscribe(resp => {
    $('.page-loader-wrapper').hide();
    console.log("Site list response----------" + JSON.stringify(resp));
    if(resp.responseCode == 200){
     // var Options = "";  
      for (var i = 0; i < resp.responseObjList.length; i++) {
        $('#projectID').append("<option value='" + resp.responseObjList[i].id + "'>" + resp.responseObjList[i].name + "</option>");
      }
    }else if(resp.responseCode ==440){
      swal("Your Session has been Timed Out!", "Please login once again.", "error");
      this.router.navigate([""]);
    }else{
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
/*-----------------Getting Project(site) list End---------------------*/





/*--------------------------Mile stone table details start------------------*/
milestoneDetails(id){
  $('.page-loader-wrapper').show();

  let url = "http://129.154.74.18:8090/employeeservice/ticketreport/getReport.spring";
 // let url = "http://106.51.38.64:8888/employeeservice/ticketreport/getReport.spring";
  console.log("url :" + url);

  let headers = new Headers({ 'Content-Type': 'application/json' });
  //let options = new RequestOptions({ headers: headers }); 

  var body = {
    "startDate":startDate,
    "endDate":endDate,
    "siteIds":[id]
  }
  console.log("---- body :" + JSON.stringify(body));

  this.http.post(url, body).map(res => res.json()).subscribe(resp => {
    $('.page-loader-wrapper').hide();
    console.log("table response ----------" + JSON.stringify(resp));
    if(resp.responseCode == 200){
   this.ticketReporting_Pojos = resp.ticketReportingResponces[0].ticketReportingPojos
   this.ticketEmployee_Report = resp.ticketReportingResponces[0].ticketEmployeeReport
   //alert(this.ticketEmployeeReport.length)
   $("#ticketdetailstableid").show()
       $("#escalationtableid").show()
       $("#sitetableid").show()
      $(".spancls").show()
      this.end_Date =endDate
   this.ticketEscalationLevel_EmployeeDetails = resp.ticketReportingResponces[0].ticketEscalationLevelEmployeeDetails
  }else if(resp.responseCode ==440){
    swal("Your Session has been Timed Out!", "Please login once again.", "error");
    this.router.navigate([""]);
  }else{
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
/*--------------------------Mile stone table details End------------------*/

homeClick(){
  this.cmn.commonHomeNavigation();
}
}
