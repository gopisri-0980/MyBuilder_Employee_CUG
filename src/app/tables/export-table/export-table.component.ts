import { Component, OnInit } from '@angular/core';
declare const $: any;
@Component({
  selector: 'app-export-table',
  templateUrl: './export-table.component.html',
  styleUrls: ['./export-table.component.scss']
})
export class ExportTableComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    $('#tableExport').DataTable({
      dom: 'Bfrltip',
      buttons: [
        'copy', 'csv', 'excel', 'print', {
          extend: 'pdfHtml5',
          orientation: 'landscape',
          pageSize: 'LEGAL'
        }
      ],

    });
  }

}
