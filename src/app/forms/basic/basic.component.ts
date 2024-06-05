import { Component, OnInit } from '@angular/core';

declare const $: any;
declare const autosize: any;

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    'use strict';
    $(function () {
      //Textare auto growth
      autosize($('textarea.auto-growth'));

      //Datetimepicker plugin
      $('.datetimepicker').bootstrapMaterialDatePicker({
        format: 'dddd DD MMMM YYYY - HH:mm',
        clearButton: true,
        weekStart: 1
      });

      $('.datepicker').bootstrapMaterialDatePicker({
        format: 'dddd DD MMMM YYYY',
        clearButton: true,
        weekStart: 1,
        time: false
      });
      $('.datepicker2').bootstrapMaterialDatePicker({
        format: 'DD MMMM YYYY',
        clearButton: true,
        weekStart: 1,
        time: false
      });

      $('.timepicker').bootstrapMaterialDatePicker({
        format: 'HH:mm',
        clearButton: true,
        date: false
      });

      $('input#input_text, textarea#textarea2').characterCounter();
    });



  }

}
