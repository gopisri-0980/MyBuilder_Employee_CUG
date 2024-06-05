import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WidgetComponent } from './widget/widget.component';
import { LocationStrategy, HashLocationStrategy, PathLocationStrategy } from '@angular/common';
import { ExampleComponent } from './example/example.component';
import { FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TicketdetailsComponent } from './ticket/ticketdetails/ticketdetails.component';
import { ViewticketsComponent } from './ticket/viewtickets/viewtickets.component';
import { HttpModule } from '@angular/http';
import { FlatdetailsComponent } from './flatdetails/flatdetails.component';
import { ViewinforequestComponent } from './ticket/viewinforequest/viewinforequest.component';
import { ViewinforequestdetailsComponent } from './ticket/viewinforequestdetails/viewinforequestdetails.component';
import { CommonComponent } from './common/common.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ApproveEscalationComponent } from './approve-escalation/approve-escalation.component';
import { ApproveEscalationDetailsComponent } from './approve-escalation-details/approve-escalation-details.component';
import { ViewMyTicketsComponent } from './view-my-tickets/view-my-tickets.component';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { EscalationTicketsComponent } from './escalation-tickets/escalation-tickets.component';
import { EscaltionTicketdetailsComponent } from './escaltion-ticketdetails/escaltion-ticketdetails.component';
import { UUID } from 'angular2-uuid';
import { NgxEmojiPickerModule } from 'ngx-emoji-picker';
import { NgxPaginationModule } from 'ngx-pagination'; 
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth.guard';
import { CrmViewAnonymousEntriesComponent } from './crm-view-anonymous-entries/crm-view-anonymous-entries.component';
import { AllCompanyNotificationslistComponent } from './all-company-notificationslist/all-company-notificationslist.component';
import { ChartsModule } from 'ng2-charts';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDialogComponent } from './dailogbox/confirm-dialog/confirm-dialog.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductService } from './product.service';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { SinglepageemployeeComunicationComponent } from './singlepageemployee-comunication/singlepageemployee-comunication.component';
import { SinglepageprojectdetailsComponent } from './singlepageprojectdetails/singlepageprojectdetails.component';
import { ClearedTransactionReportComponent } from './cleared-transaction-report/cleared-transaction-report.component';
import { FlatsShowingComponent } from './flats-showing/flats-showing.component';
import { AppRegisteredOrNotComponent } from './app-registered-or-not/app-registered-or-not.component';
import { EscaltionComplaintDetailsComponent } from './complaints/escaltion-complaint-details/escaltion-complaint-details.component';
import { EsacationComplaintsComponent } from './complaints/esacation-complaints/esacation-complaints.component';
import { DataReading2Component } from './data-reading2/data-reading2.component';

import { ReceiptTdsEntryComponent } from './receipt-tds-entry/receipt-tds-entry.component';
import { ReceiptTdsViewComponent } from './receipt-tds-view/receipt-tds-view.component';
import { ModifyReceiptTdsViewComponent } from './modify-receipt-tds-view/modify-receipt-tds-view.component';

import { SinglepageReceiptTdsViewComponent } from './singlepage-receipt-tds-view/singlepage-receipt-tds-view.component';
import { AssignComplaintsComponent } from './complaints/assign-complaints/assign-complaints.component';
import { EscalationComplaintMasterComponent } from './complaints/escalation-complaint-master/escalation-complaint-master.component';













@NgModule({
  declarations: [
    AppComponent,
    WidgetComponent,
    ExampleComponent,
    TicketdetailsComponent,
    ViewticketsComponent,
    FlatdetailsComponent,
    ViewinforequestComponent,
    ViewinforequestdetailsComponent,
    CommonComponent,
    ApproveEscalationComponent,
    ApproveEscalationDetailsComponent,
    ViewMyTicketsComponent,
    EscalationTicketsComponent,
    EscaltionTicketdetailsComponent,
    DashBoardComponent,
    PageNotFoundComponent,
    CrmViewAnonymousEntriesComponent,
    AllCompanyNotificationslistComponent,
    ConfirmDialogComponent,
    SinglepageemployeeComunicationComponent,
    SinglepageprojectdetailsComponent,
    ClearedTransactionReportComponent,
    FlatsShowingComponent,
    AppRegisteredOrNotComponent,
    EsacationComplaintsComponent,
    EscaltionComplaintDetailsComponent,
    DataReading2Component,
   
    ReceiptTdsEntryComponent,
    ReceiptTdsViewComponent,
    ModifyReceiptTdsViewComponent,
    AssignComplaintsComponent,
    SinglepageReceiptTdsViewComponent,
    EscalationComplaintMasterComponent,
   
    
   
 
   
   
 
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    ChartsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    NgxEmojiPickerModule.forRoot(),
    DeviceDetectorModule.forRoot(),
    AutocompleteLibModule,
    AngularEditorModule,
    NgbModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    AngularMultiSelectModule,
    
    
    
  ],
  providers: [ProductService, {
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }, UUID, CommonComponent, AuthGuard],
  entryComponents: [
    ConfirmDialogComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
