import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonComponent } from '../common/common.component';
import { Http, Headers,RequestOptions } from '@angular/http';
declare const $:any;
declare const swal: any;

@Component({
  selector: 'app-dashboard-management',
  templateUrl: './dashboard-management.component.html',
  styleUrls: ['./dashboard-management.component.sass']
})
export class DashboardManagementComponent implements OnInit {
  projectwise_site_count: any;
  viewTransactionData: string;

  constructor(private cmn: CommonComponent, private http: Http, private router: Router) {
    $('.page-loader-wrapper').hide();
   
 //   this.defaultCompleteTransactionlist();
 this.projectwise_site_count = [{
                          "projects" : "Sumadhura Acropolis",
                          "noofTickets" : "26",
                          "openTickets" : "10",
                          "Inprogress" : "5",
                          "Reopen"  : "4",
                          "Close" : "7"

                              },

                              {
                                "projects" : "Sumadhura Nandanam",
                                "noofTickets" : "15",
                                "openTickets" : "10",
                                "Inprogress" : "2",
                                "Reopen"  : "1",
                                "Close" : "3"
      
                                    }
                            ]
                                }

  ngOnInit() {
    var self=this;
    var date = new Date();
    var newdate = date.setDate(date.getDate() - 365);

    $(function(){
      //$('#milestone_blocks_tables').hide();
      $('#fromDate').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
        minDate: new Date(newdate),
        clearButton: true,
        weekStart: 1,
        time: false,
       
      })

      $('#toDate').bootstrapMaterialDatePicker({
        format: 'YYYY-MM-DD',
        maxDate: new Date(),
        clearButton: true,
        weekStart: 1,
        time: false
      });
     
  
  })
  }
 

  completedTransactions(){
    
    if ($("#fromDate").val() == "") {
      swal("Please select from date");
      return false;
    }

    if ($("#toDate").val() == "") {
      swal("Please select to date");
      return false;
    }

    //alert(new Date($("#fromDate").val()).getTime())
   // alert(new Date($("#toDate").val()).getTime())

    if(new Date($("#fromDate").val()).getTime() > new Date($("#toDate").val()).getTime()){
      swal("To date should be equal or greater than from date");
      $("#toDate").val('')
      return false;
    }

//     if($("#fromDate").val().split('-')[0] > $("#toDate").val().split('-')[0] && $("#fromDate").val().split('-')[1] > $("#toDate").val().split('-')[1] && $("#fromDate").val().split('-')[2] > $("#toDate").val().split('-')[2]){
// alert("working");
// return false;
//     }

   //return false;
    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/viewMisPendingTransactions.spring";
    // localhost:8082/SumadhuraGateway/employeeservice/financial/viewMisPendingTransactions.spring
    console.log("url :" + url);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers }); 
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "condition":"loadCompletedTransaction",
      "fromDate": $("#fromDate").val(),  //"2020-03-30",
      "toDate": $("#toDate").val(), //"2020-04-30"
      "siteId" : sessionStorage.getItem("session_siteId")

    }
    console.log("----body :" + JSON.stringify(body));
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      console.log("View Completed transaction response----------" + JSON.stringify(resp));
      if(resp.responseCode == 200){
        $("#tableExportvthdates").show()
        $("#tableExport").hide()
       
        $("#milestone_blocks_tables").show();
      // alert("Response Success")
   //   this.milestonedemand_table = resp.responseObjList.finTransactionEntryResponseList;
      setTimeout(function(){
       
        $("#tableExportvthdates").DataTable();
        $("#tableExport_wrapper").hide();
        
      },1000)
    
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

  defaultCompleteTransactionlist(){
    var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

 var temp = yyyy  + '-' + mm + '-' + dd;

    $('.page-loader-wrapper').show();
    let url = this.cmn.commonUrl + "financial/viewMisPendingTransactions.spring";
    // localhost:8082/SumadhuraGateway/employeeservice/financial/viewMisPendingTransactions.spring
    console.log("url :" + url);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers }); 
    var body = {
      "sessionKey": "" + sessionStorage.getItem("login_sessionkey"),
      "condition":"loadCompletedTransaction",
      "fromDate": null,  //"2020-03-30",
      "toDate": temp, //"2020-04-30"
      "siteId" : sessionStorage.getItem("session_siteId")

    }
    console.log("----body :" + JSON.stringify(body));
    this.http.post(url, body, options).map(res => res.json()).subscribe(resp => {
      $('.page-loader-wrapper').hide();
      console.log("View Completed transaction response----------" + JSON.stringify(resp));
      if(resp.responseCode == 200){
        $("#milestone_blocks_tables").show();
      // alert("Response Success")
     // this.milestonedemand_table = resp.responseObjList.finTransactionEntryResponseList;
      setTimeout(function(){
        $("#tableExport").DataTable();
      },100)
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
  goToDetails(itemData){
    debugger;
    console.log(JSON.stringify(itemData));
    this.viewTransactionData = JSON.stringify(itemData );
    sessionStorage.setItem('view_transaction_data',this.viewTransactionData);
    
    if(itemData.transactionTypeName == "Receipt" && itemData.transactionModeName == "Cheque"){
      if(sessionStorage.getItem("session_deptid") == '997'){
        this.router.navigate(["Accounts-Receipt-Cheque"]);
        return false;
      }else if(sessionStorage.getItem("session_deptid") == '995'){
        this.router.navigate(["crm-receipt-cheque-view"]);
      }else{
        this.router.navigate(["Receipt-Cheque"]);
      }
    }else if(itemData.transactionTypeName == "Receipt" && itemData.transactionModeName == "Online"){
      if(sessionStorage.getItem("session_deptid") == '995'){
        this.router.navigate(["view-crm-receipt-online"]);
        return false;
      }else{
        this.router.navigate(["Receipt-Online"]);
      }
    }else if(itemData.transactionTypeName == "Payment" && itemData.transactionModeName == "Cheque"){
      if(sessionStorage.getItem("session_deptid") == '995'){
        this.router.navigate(["crm-receipt-payment-view"]);
      }else{
        this.router.navigate(["Payment-Cheque"]);
      }
    }else{
    }
    
  }

  homeClick(){
    this.cmn.commonHomeNavigation();
  }
}

