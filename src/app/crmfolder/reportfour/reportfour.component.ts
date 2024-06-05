import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';

import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import {ViewChild } from '@angular/core';
import { Color, BaseChartDirective } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { CommonComponent } from 'src/app/common/common.component';
declare const $:any;
declare const swal:any;


@Component({
  selector: 'app-reportfour',
  templateUrl: './reportfour.component.html',
  styleUrls: ['./reportfour.component.sass']
})
export class ReportfourComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{
      ticks: {
      }
    }] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['Events','Corporate','Brand Ambassador','ATL','Administrative',
  'Events','Corporate','Brand Ambassador','ATL','Administrative','Events','Corporate','ATL','Administrative'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56, 55, 40], label: 'Series A', stack: 'a' },
    { data: [280, 480, 400, 190, 860, 270, 900,280, 480, 400, 190, 860, 270, 900], label: 'Series B', stack: 'a' }
  ];

  constructor(private cmn: CommonComponent,) {
    $('.page-loader-wrapper').show();
      var nValFromSession=sessionStorage.getItem("nval");
      if(nValFromSession=="1"){
        window.location.reload();
        sessionStorage.setItem("nval", "2");
      }else{
        $('.page-loader-wrapper').hide();
      }

     
     // this.depID = sessionStorage.getItem("session_deptid")
     // this.roleID = sessionStorage.getItem("session_roleId")
     // console.log("Department id " +this.depID);
   }

  ngOnInit() {
  }

  public pieChartColors:Array<any> = [
    { 
        backgroundColor: 'red',
        borderColor: 'rgba(135,206,250,1)',
    },{ 
      backgroundColor: '#203d4b',
      borderColor: 'rgba(135,206,250,1)',
  }
];

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }


  homeClick(){
  //  this.cmn.commonHomeNavigation();
  }

}

