import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { CommonComponent } from 'src/app/common/common.component';
import { ActivatedRoute, Router } from '@angular/router';
declare const $: any;
declare const autosize: any;
declare const swal :any;

@Component({
  selector: 'app-singlepageprojectdetails',
  templateUrl: './singlepageprojectdetails.component.html',
  styleUrls: ['./singlepageprojectdetails.component.sass']
})
export class SinglepageprojectdetailsComponent implements OnInit {

  file_name_array: any;
  file_val: any;
  binaryString: any;
  base64_array_object_data: any;
  base64textString: string;
  json_response: any;
  myimgg:boolean = true;
  fileExtension: any;
  constructor(private cmn:CommonComponent, private http:Http,private router:Router,) {
    $('.page-loader-wrapper').hide();
    
    var nValFromSession=sessionStorage.getItem("nval");   
    setTimeout(function () {
      if(nValFromSession=="4"){
      window.location.reload();
      sessionStorage.setItem("nval", "5");
      }else{
 
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
    this.base64textString= btoa(this.binaryString);
    this.base64_array_object_data.push(btoa(this.binaryString));
    //alert("Data: " + btoa(this.binaryString));

    
  }
  ngOnInit() {
    debugger;
    $("input").prop("disabled", true);
    $("textarea").prop("disabled", true);
    console.log("Approve response:"+sessionStorage.getItem('response'));
    this.json_response = eval('('+sessionStorage.getItem('response')+')');
    $("#textarea2").val(this.json_response.description);
    $("#title_id").val(this.json_response.message);
    $("#notificationtext_id").val(this.json_response.notificationText);
    $("#projectID").val(this.json_response.siteNames);
    $("#BlockId").val(this.json_response.blockNames);
    $("#FloorId").val(this.json_response.floorNames);
    $("#FlatId").val(this.json_response.flatNamess);
if(this.json_response.imgLoc == "NA"){

}else{
  var gDrivePath =  this.json_response.imgLoc.split('//')[1].split('/')[0];
  if(gDrivePath == 'drive.google.com'){
   $("#myImg").hide();
   $('#driveImg').show();
  }else{
   $('#myImg').attr('src', this.json_response.imgLoc);
  }
}
   
   
   // alert( this.json_response.linkFileLoc);
if(this.json_response.linkFileLoc == "NA"){

}else{
  var gDrivePath =  this.json_response.linkFileLoc.split('//')[1].split('/')[0];
  if(gDrivePath == 'drive.google.com'){
     this.fileExtension = 'gDriveFile';
  }else{
   var basename =  this.json_response.linkFileLoc.split(/[\\/]/).pop(),  // extract file name from full path ...
   // (supports `\\` and `/` separators)
   
     pos = basename.lastIndexOf(".");       // get last position of `.`

     if(basename == "NA"){

     }else{
     if (basename === "" || pos < 1)            // if file name is empty or ...
     return "";                             //  `.` not found (-1) or comes first (0)
     this.fileExtension = basename.slice(pos + 1);
     // alert(basename.slice(pos + 1))
     }
  }
}
           

  
    
  
   if(this.json_response.imgLoc == "NA"){
   
    this.myimgg= false;
    $('#myImg').attr('src','');
   //alert("na")
   }else{
    // alert(this.json_response.imgLoc);
    this.myimgg= true;
    $('#myImg').attr('src', this.json_response.imgLoc);
   }
    
    $(function() {
      $('#myImg').on('click', function() {
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

    $(function () {
      $('#projectID').change(function(e) {
        var selected = $(e.target).val();
        console.log("projectIds :"+selected);
    }); 
    $('#BlockId').change(function(e) {
      var selected = $(e.target).val();
      console.log("blockIds :"+selected);
    });
    $('#FloorId').change(function(e) {
      var selected = $(e.target).val();
      console.log("floorIds :"+selected);
    });

    $('#FlatId').change(function(e) {
      var selected = $(e.target).val();
      console.log("flatIds :"+selected);
    });
    });
    

  }

  // filesubmit(){
  //   if($("#projectID").val() == ""){
  //   alert("Please select atleast one project");
  //   return false;
  //   }

  //   if($("#title_id").val() == ""){
  //     alert("Please enter title");
  //     return false;
  //   }
  //   if($("#discription_val").val() == ""){
  //     alert("Please enter discription");
  //     return false;
  //   }
  //   return false;
  //   let url = this.cmn.commonUrl + "employeeTicket/getTicketForwardMenuDetails.spring";
  // // http://129.154.74.18:8888/employeeservice/employeeTicket/getTicketForwardMenuDetails.spring
  //    console.log("url :"+url);
     
  //      let headers = new Headers({ 'Content-Type': 'application/json' });
  //          let options = new RequestOptions({ headers: headers });
  //          var body = {
  //           "employeeId":"1"
  //          }
  //    console.log("----body :"+JSON.stringify(body));
  //    this.http.post(url,body,options).map(res => res.json()).subscribe(resp =>{
  //   //$('.page-loader-wrapper').hide();
  //   console.log("Department list response----------"+JSON.stringify(resp));
  //      if(resp.responseCode == 200){
  //   		/ simple with multi select /
	// 		$('#multisel').formSelect();
	// 		var data = [{ id: 1, name: "ALL" }, { id: 2, name: "Telangana" }, { id: 3, name: "Karnataka" }];

	// 		var Options = "";
	// 		$.each(data, function (i, val) {
	// 			$('#multisel').append("<option value='" + val.id + "'>" + val.name + "</option>");
	// 			$('#multisel').formSelect();
	// 		});
	// 		/ end simple with multi select /
  //      }
       
  //   },
  //     error => {
  //       console.log(error);
  //     }
  //   );
  // }
  myimage(fileurl){
    window.open(fileurl, '_system', 'location=yes,closebuttoncaption=Fechar,enableViewportScale=yes');
  }
  homeClick(){
    this.cmn.commonHomeNavigation();
  }

  notification_list(){
      this.router.navigate(['project-notification-list']);
    
  }
}