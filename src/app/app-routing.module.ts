import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WidgetComponent } from './widget/widget.component';
import { LoginComponent } from './login/login.component';
import { TicketdetailsComponent } from "./ticket/ticketdetails/ticketdetails.component";
import { ViewticketsComponent } from "./ticket/viewtickets/viewtickets.component";
import { ApprovedcustomerComponent } from './approvedcustomer/approvedcustomer.component';
import { FlatdetailsComponent } from './flatdetails/flatdetails.component';
import { ViewinforequestComponent } from './ticket/viewinforequest/viewinforequest.component';
import { ViewinforequestdetailsComponent } from './ticket/viewinforequestdetails/viewinforequestdetails.component';
import { CommonComponent } from './common/common.component';
import { ApproveEscalationComponent } from './approve-escalation/approve-escalation.component';
import { ApproveEscalationDetailsComponent } from './approve-escalation-details/approve-escalation-details.component';
import { ViewMyTicketsComponent } from './view-my-tickets/view-my-tickets.component';
import { EscalationTicketsComponent } from './escalation-tickets/escalation-tickets.component';
import { EscaltionTicketdetailsComponent } from './escaltion-ticketdetails/escaltion-ticketdetails.component';
import { ViewReferalDataComponent } from "./ReferFriend/view-referal-data/view-referal-data.component";
import { ChangeticketownerComponent } from './changeticketowner/changeticketowner.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { CreateMilestoneComponent } from './create-milestone/create-milestone.component';
import { ViewMilestoneDetailsComponent } from './view-milestone-details/view-milestone-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth.guard';
import { RaiseInvoiceModificationsComponent } from './raise-invoice-modifications/raise-invoice-modifications.component';
import { UpdateTdsComponent } from './update-tds/update-tds.component';
import { DailyReportsComponent } from './daily-reports/daily-reports.component';
import { AllCompanyNotificationslistComponent } from './all-company-notificationslist/all-company-notificationslist.component';
import { AllNotificationsViewDetailsComponent } from './all-notifications-view-details/all-notifications-view-details.component';
import { CompanyNotificationsApprovalsComponent } from './company-notifications-approvals/company-notifications-approvals.component';
import { CompanyViewAndApproveComponent } from './company-view-and-approve/company-view-and-approve.component';
import { ChangeTicketTypeListComponent } from './change-ticket-type-list/change-ticket-type-list.component';
import { CustomerLedgerDetailsComponent } from './customer-ledger-details/customer-ledger-details.component';
import { TDSUploadComponent } from './tdsupload/tdsupload.component';
import { SinglepageticketdetailsComponent } from './singlepageticketdetails/singlepageticketdetails.component';
import { SinglepageReferencedetailsComponent } from './singlepage-referencedetails/singlepage-referencedetails.component';
import { AddViewLeagalInvoiceComponent } from './add-view-leagal-invoice/add-view-leagal-invoice.component';
import { AddMonthlyreportComponent } from './add-monthlyreport/add-monthlyreport.component';
import { CrmPaymentChequeCompletedEDITComponent } from './crm-payment-cheque-completed-edit/crm-payment-cheque-completed-edit.component';
import { ModifyCrmReceiptChequeViewComponent } from './modify-crm-receipt-cheque-view/modify-crm-receipt-cheque-view.component';
import { ModifyCrmReceiptOnlineViewComponent } from './modify-crm-receipt-online-view/modify-crm-receipt-online-view.component';
import { ModifyCrmReceiptPaymentViewComponent } from './modify-crm-receipt-payment-view/modify-crm-receipt-payment-view.component';
import { AccountsPaymentChequeComponent } from './accounts-payment-cheque/accounts-payment-cheque.component';
import { CrmPaymentOnlineEditComponent } from './crm-payment-online-edit/crm-payment-online-edit.component';
import { CrmViewAnonymousEntriesComponent } from './crm-view-anonymous-entries/crm-view-anonymous-entries.component';
import { ClearedTransactionReportComponent } from './cleared-transaction-report/cleared-transaction-report.component';
import { FlatsShowingComponent } from './flats-showing/flats-showing.component';
import { CompenyMailApproveComponent } from './compeny-mail-approve/compeny-mail-approve.component';
import { AppRegisteredOrNotComponent } from './app-registered-or-not/app-registered-or-not.component';
import { EsacationComplaintsComponent } from './complaints/esacation-complaints/esacation-complaints.component';
import { EscaltionComplaintDetailsComponent } from './complaints/escaltion-complaint-details/escaltion-complaint-details.component';
import { DataReading2Component } from './data-reading2/data-reading2.component';

import { ReceiptTdsEntryComponent } from './receipt-tds-entry/receipt-tds-entry.component';
import { ReceiptTdsViewComponent } from './receipt-tds-view/receipt-tds-view.component';
import { ModifyReceiptTdsViewComponent } from './modify-receipt-tds-view/modify-receipt-tds-view.component';
import { AssignComplaintsComponent } from './complaints/assign-complaints/assign-complaints.component';
import { SinglepageReceiptTdsViewComponent } from './singlepage-receipt-tds-view/singlepage-receipt-tds-view.component';
import { EscalationComplaintMasterComponent } from './complaints/escalation-complaint-master/escalation-complaint-master.component';
import { UpdateMilestoneDueDatesComponent } from './update-milestone-due-dates/update-milestone-due-dates.component';



const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },


    {
        path: 'changeTicketType',
        loadChildren: "./change-ticket-type-list/change-ticket-type-list.module#ChangeTicketTypeListModule",
        canActivate: [AuthGuard]
    },


    {
        path: 'UploadTds',
        loadChildren: "./tdsupload/tdsupload.module#TdsuploadModule",
        canActivate: [AuthGuard]
    },
    {
        path: 'ticket_details',

        loadChildren: "./singlepageticketdetails/singlepageticketdetails.module#SinglepageticketdetailsModule",
        // canActivate: [AuthGuard]
    },
    {
        path: 'reference_details',
        loadChildren: "./singlepage-referencedetails/singlepage-referencedetails.module#SinglepageReferencedetailsModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'AddLeagalinvoice',
        loadChildren: "./add-view-leagal-invoice/add-view-leagal-invoice.module#AddViewLeagalInvoiceModule",
        canActivate: [AuthGuard]
    },

    // {
    //     path: 'AddTicketfeedback',
    //     loadChildren: "./add-ticket-feedback-report/add-ticket-feedback-report.module#AddTicketFeedackReportModule",
    //     canActivate: [AuthGuard]
    // },


    {
        path: 'Addmonthlyreport',
        loadChildren: "./add-monthlyreport/add-monthlyreport.module#AddMonthlyreportModule",
        canActivate: [AuthGuard]

    },


    {
        path: 'payment-cheque-edit',
        loadChildren: "./crm-payment-cheque-completed-edit/crm-payment-cheque-completed-edit.module#CrmPaymentChequeCompletedEditModule",
        canActivate: [AuthGuard]

    },
    {
        path: 'escalation-tickets',
        component: EscalationTicketsComponent,
        canActivate: [AuthGuard]
    },

    {
        path: 'modify-crm-receipt-cheque-view',
        loadChildren: "./modify-crm-receipt-cheque-view/modify-crm-receipt-cheque-view.module#ModifyCrmReceiptChequeViewModule",
        canActivate: [AuthGuard]
    },
    {
        path: 'modify-crm-receipt-online-view',
        loadChildren: "./modify-crm-receipt-online-view/modify-crm-receipt-online-view.module#ModifyCrmReceiptOnlineViewModule",
        canActivate: [AuthGuard]
    },
    {
        path: 'modify-crm-receipt-payment-view',
        loadChildren: "./modify-crm-receipt-payment-view/modify-crm-receipt-payment-view.module#ModifyCrmReceiptPaymentViewModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'accounts-payment-cheque',
        loadChildren: "./accounts-payment-cheque/accounts-payment-cheque.module#AccountsPaymentChequeModule",
        canActivate: [AuthGuard]
    },


    {
        path: 'payment-online-edit',
        loadChildren: "./crm-payment-online-edit/crm-payment-online-edit.module#CrmPaymentOnlineEditModule",
        canActivate: [AuthGuard]
    },

    {
        path: "project-notification-list",
        loadChildren: "./project-notification-list/project-notification-list.module#ProjectNotificationListModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'viewandapprovetwo',
        loadChildren: "./viewandapprovetwo/viewandapprovetwo.module#ViewandapprovetwoModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'legal-invoice',
        loadChildren: './legal-invoice/legal-invoice.module#LegalInvoiceModule'
    },

    {
        path: "View_My_Appointments",
        loadChildren: "./book-your-appointment/book-your-appointment.module#BookYourAppointmentModule",
        canActivate: [AuthGuard]
    },

    {
        path: "Create_Appointment_Time_Slots",
        loadChildren: "./create-appointment-time-slots/create-appointment-time-slots.module#CreateAppointmentTimeSlotsModule",
        canActivate: [AuthGuard]

    },

    {
        path: "View_Appointment_Time_Slots",
        loadChildren: "./view-appointment-schedule/view-appointment-schedule.module#ViewAppointmentScheduleModule",
        canActivate: [AuthGuard]
    },

    {
        path: "View_Appointments",
        loadChildren: "./view-appointments-for-management/view-appointments-for-management.module#ViewAppointmentsForManagementModule",
        canActivate: [AuthGuard]
    },

    {
        path: "approve-pending-invoices",
        loadChildren: "./approve-pending-invoice/approve-pending-invoice.module#ApprovePendingInvoiceModule",
        canActivate: [AuthGuard]
    },
    {
        path: "viewmodificationinvoice",
        loadChildren: "./view-modification-invoice/view-modification-invoice.module#ViewModificationInvoiceModule",
        canActivate: [AuthGuard]
    },

    {
        path: "requestforinterestwaiver",
        loadChildren: "./request-for-interest-waiver/request-for-interest-waiver.module#RequestForInterestWaiverModule",
        canActivate: [AuthGuard]
    }, {

        path: "View_Interest_waiver",
        loadChildren: "./view-intrestwalverdetailsofapprove/view-intrestwalverdetailsofapprove.module#ViewIntrestwalverdetailsofapproveModule",
        //canActivate: [AuthGuard]

    },

    {
        path: "interestwaiver-details",
        loadChildren: "./interest-waiver-details/interest-waiver-details.module#InterestWaiverDetailsModule",
        canActivate: [AuthGuard]
    },

    {
        path: "mprviewreport",
        loadChildren: "./mpr-viewreport/mpr-viewreport.module#MprViewreportModule",
        canActivate: [AuthGuard]
    },

    {
        path: "View_My_Complaints",
        loadChildren: "./view-my-complaints/view-my-complaints.module#ViewMyComplaintsModule",
        canActivate: [AuthGuard]
    },

    {
        path: "approve-interest-waiver",
        loadChildren: "./view-interestwaiver-requestforapproval/view-interestwaiver-requestforapproval.module#ViewInterestwaiverRequestforapprovalModule",
        canActivate: [AuthGuard]
    },
    {
        path: "interest-waiver-request-details",
        loadChildren: "./interest-waiver-request-details/interest-waiver-request-details.module#InterestWaiverRequestDetailsModule",
        canActivate: [AuthGuard]
    },
    {
        path: "upload-tax-invoice",
        loadChildren: "./generate-old-receipt/generate-old-receipt.module#GenerateOldReceiptModule",
        canActivate: [AuthGuard]
    },

    {
        path: "View_Ticket_Graphs",
        loadChildren: "./ticket-graph/ticket-graph.module#TicketGraphModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'View_Interest_Paid_and_Waived_Details',
        loadChildren: "./view-interest-paidand-waived-details/view-interest-paidand-waived-details.module#ViewInterestPaidandWaivedDetailsModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'crm-cheque-receipt',
        loadChildren: "./crm-cheque-receipt/crm-cheque-receipt.module#CrmChequeReceiptModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'View-Pending-Transactions-Status',
        loadChildren: "./view-pending-transactions-status/view-pending-transactions-status.module#ViewPendingTransactionsStatusModule",
        canActivate: [AuthGuard]
    },
    {
        path: 'crm-receipt-cheque-view',
        loadChildren: "./crm-receipt-cheque-view/crm-receipt-cheque-view.module#CrmReceiptChequeViewModule",
        canActivate: [AuthGuard]
    },
    {
        path: 'Receipt-Cheque',
        loadChildren: "./mis-receipt-cheque/mis-receipt-cheque.module#MisReceiptChequeModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'View-Pending-Transactions',
        loadChildren: "./view-pending-transactions/view-pending-transactions.module#ViewPendingTransactionsModule",
        canActivate: [AuthGuard]
    },
    {
        path: 'Accounts-Receipt-Cheque',
        loadChildren: "./accounts-receipt-cheque/accounts-receipt-cheque.module#AccountsReceiptChequeModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'uncleared-cheque-list',
        loadChildren: "./uncleared-cheque-list/uncleared-cheque-list.module#UnclearedChequeListModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'View-Completed-Transactions',
        loadChildren: "./completed-transactions/completed-transactions.module#CompletedTransactionsModule",
        canActivate: [AuthGuard]
    },
    {
        path: 'Suspense-Entry',
        loadChildren: "./anonymous-transaction-entry/anonymous-transaction-entry.module#AnonymousTransactionEntryModule",
        canActivate: [AuthGuard]
    },
    {
        path: 'crm-view-anonymous-entries',
        component: CrmViewAnonymousEntriesComponent,
        canActivate: [AuthGuard]
    },

    {
        path: 'crm-receipt-online',
        loadChildren: "./crm-receipt-online/crm-receipt-online.module#CrmReceiptOnlineModule",
        canActivate: [AuthGuard]
    },
    {
        path: 'view-crm-receipt-online',
        loadChildren: "./view-crm-receipt-online/view-crm-receipt-online.module#ViewCrmReceiptOnlineModule",
        canActivate: [AuthGuard]
    },
    {
        path: 'Receipt-Online',
        loadChildren: "./mis-receipt-online/mis-receipt-online.module#MisReceiptOnlineModule",
        canActivate: [AuthGuard]
    },
    {
        path: 'crm-receipt-payment',
        loadChildren: "./crm-receipt-payment/crm-receipt-payment.module#CrmReceiptPaymentModule",
        canActivate: [AuthGuard]
    },
    {
        path: 'crm-receipt-payment-view',
        loadChildren: "./crm-receipt-payment-view/crm-receipt-payment-view.module#CrmReceiptPaymentViewModule",
        canActivate: [AuthGuard]
    },
    {
        path: 'Payment-Cheque',
        loadChildren: "./mis-payment-cheque/mis-payment-cheque.module#MisPaymentChequeModule",
        canActivate: [AuthGuard]
    },
    {
        path: 'view-closed-tickets',
        loadChildren: "./view-closed-tickets/view-closed-tickets.module#ViewClosedTicketsModule",
        canActivate: [AuthGuard]
    },
    {
        path: 'MPR_View',
        loadChildren: "./mpr-view/mpr-view.module#MprViewModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'Ticket_Monthly_Report',
        loadChildren: "./ticket-monthly-report/ticket-monthly-report.module#TicketMonthlyReportModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'Ticket_monthly_report_projectwise',
        loadChildren: "./ticket-type-reportfor-all-projects/ticket-type-reportfor-all-projects.module#TicketTypeReportforAllProjectsModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'Ticket_Feedback_Report',
        loadChildren: "./ticket-feedback-report/ticket-feedback-report.module#TicketFeedbackReportModule",
        canActivate: [AuthGuard]
    },
    {
        path: 'Ticket_Average_Time',
        loadChildren: "./ticket-average-timesidemenu/ticket-average-timesidemenu.module#TicketAverageTimesidemenuModule",
        canActivate: [AuthGuard]
    },
    {
        path: 'Ticket_Projectwise_Details',
        loadChildren: "./ticket-projectwise-details/ticket-projectwise-details.module#TicketProjectwiseDetailsModule",
        canActivate: [AuthGuard]
    },
    {
        path: 'Ticketing-Dashboard',
        loadChildren: "./ticketing-management-dashboard/ticketing-management-dashboard.module#TicketingManagementDashboardModule",
        canActivate: [AuthGuard]
    },
    {
        path: 'Customer-Ledger',
        loadChildren: "./customer-ledger/customer-ledger.module#CustomerLedgerModule",
        canActivate: [AuthGuard]
    },
    {
        path: 'Customer-Ledger-Table',
        loadChildren: "./customer-ledger-table/customer-ledger-table.module#CustomerLedgerTableModule",
        canActivate: [AuthGuard]
    },
    {
        path: 'Customer-Ledger-Details',
        loadChildren: "./customer-ledger-details/customer-ledger-details.module#CustomerLedgerDetailsModule",
        canActivate: [AuthGuard]
    },
    {
        path: 'MPR_Upload',
        loadChildren: "./upload-mpr/upload-mpr.module#UploadMprModule",
        canActivate: [AuthGuard]
    },
    {
        path: 'ProjectWise-Ticket-Count',
        loadChildren: "./table-one-project-wise-tkt-count/table-one-project-wise-tkt-count.module#TableOneProjectWiseTktCountModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'Ticketing-Dashboard/View-Tickets',
        loadChildren: "./table-one-ticket-list/table-one-ticket-list.module#TableOneTicketListModule",
        canActivate: [AuthGuard]
    },
    {
        path: 'Ticketing-Dashboard/View-Tickets/Ticket-Details',
        loadChildren: "./ticketing-dashboard-ticket-details/ticketing-dashboard-ticket-details.module#TicketingDashboardTicketDetailsModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'Escalation-Tickets',
        loadChildren: "./table-five-escalation-tickets/table-five-escalation-tickets.module#TableFiveEscalationTicketsModule",
        canActivate: [AuthGuard]
    },
    {
        path: 'UnResponding-Tickets',
        loadChildren: "./table-seven-unresponding-tickets/table-seven-unresponding-tickets.module#TableSevenUnrespondingTicketsModule",
        canActivate: [AuthGuard]
    },
    {
        path: 'Employeewiseticket',
        loadChildren: "./employeewise-tickets/employeewise-tickets.module#EmployeewiseTicketsModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'All-TicketTypes-ProjectWise-Report',
        loadChildren: "./table-three-all-ticket-type-project-wise/table-three-all-ticket-type-project-wise.module#TableThreeAllTicketTypeProjectWiseModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'EmployeeWise-Ticket-Average-Closing-Time',
        loadChildren: "./table-sixe-employeewise-tkt-avg-closing-time/table-sixe-employeewise-tkt-avg-closing-time.module#TableSixeEmployeewiseTktAvgClosingTimeModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'view-customers',
        loadChildren: "./view-customers/view-customers.module#ViewCustomersModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'shortcut-components',
        loadChildren: './shortcut-components/shortcut-components.module#ShortcutComponentsModule',
        // canActivate: [AuthGuard]
    },
    {
        path: 'bookingform',
        loadChildren: "./bookingform/bookingform.module#BookingformModule",
        canActivate: [AuthGuard]
    },
    {
        path: 'StartAChart',
        loadChildren: "./start-achart/start-achart.module#StartAChartModule",
        canActivate: [AuthGuard]
    },
    {
        path: 'chartview',
        loadChildren: "./chartview/chartview.module#ChartviewModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'ViewAllCharts',
        loadChildren: "./view-chart-all/view-chart-all.module#ViewChartAllModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'car-parking-creation',
        loadChildren: "./car-parking-creation/car-parking-creation.module#CarParkingCreationModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'car-parking-view',
        loadChildren: "./car-parking-view/car-parking-view.module#CarParkingViewModule",
        canActivate: [AuthGuard]
    },
    {
        path: "Project-Notification-View-Report",
        loadChildren: "./project-notfication-view-report/project-notfication-view-report.module#ProjectNotficationViewReportModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'view-project-notifications-for-approvals',
        loadChildren: "./project-notification-pending-for-approval/project-notification-pending-for-approval.module#ProjectNotificationPendingForApprovalModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'project-notification-pending-for-approval-view',
        loadChildren: "./project-notification-pending-for-approval-view/project-notification-pending-for-approval-view.module#ProjectNotificationPendingForApprovalViewModule",
        canActivate: [AuthGuard]
    },
    {
        path: 'Notifications/CompanyNotification',
        loadChildren: "./company-notifications/company-notifications.module#CompanyNotificationsModule",
        canActivate: [AuthGuard]
    },
    {
        path: 'view-company-notifications-for-modifications',
        loadChildren: "./company-notifications-modifications/company-notifications-modifications.module#CompanyNotificationsModificationsModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'modify-company-notifications',
        loadChildren: "./company-modif-view-and-submit/company-modif-view-and-submit.module#CompanyModifViewAndSubmitModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'company-notificationlist',
        loadChildren: "./company-notificationlist/company-notificationlist.module#CompanyNotificationlistModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'viewand-approve-notifications',
        loadChildren: "./viewand-approve-notifications/viewand-approve-notifications.module#ViewandApproveNotificationsModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'View-Non-Customer-Notifications',
        loadChildren: "./non-customer-notificationslist/non-customer-notificationslist.module#NonCustomerNotificationslistModule",
        canActivate: [AuthGuard]
    },
    {
        path: 'View-Non-Customer-Notifications/Notification-Details',
        loadChildren: "./non-customer-view-notification-details/non-customer-view-notification-details.module#NonCustomerViewNotificationDetailsModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'View-All-Company-Notifications',
        component: AllCompanyNotificationslistComponent,
        canActivate: [AuthGuard]
    },

    {
        path: 'Flats_Details',
        component: FlatsShowingComponent,
        canActivate: [AuthGuard]
    },

    {
        path: 'generate-demand-note',
        loadChildren: "./generate-demand-note/generate-demand-note.module#GenerateDemandNoteModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'regenerate-demand-note',
        loadChildren: "./regenerate-demand-note/regenerate-demand-note.module#RegenerateDemandNoteModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'view-demand-note',
        loadChildren: "./view-demand-note/view-demand-note.module#ViewDemandNoteModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'update-interest',
        loadChildren: "./update-interest/update-interest.module#UpdateInterestModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'data-reading',
        loadChildren: "./horizon-customer/horizon-customer.module#HorizonCustomerModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'View_Interest_Letter',
        loadChildren: "./view-interest-letter/view-interest-letter.module#ViewInterestLetterModule",
        canActivate: [AuthGuard]
    },
    {
        path: 'view-invoice',
        loadChildren: "./view-legal-invoice/view-legal-invoice.module#ViewLegalInvoiceModule",
        canActivate: [AuthGuard]
    },
    {
        path: 'modify-transaction',
        loadChildren: "./modify-transaction/modify-transaction.module#ModifyTransactionModule",
        canActivate: [AuthGuard]
    },
    {
        path: 'send-notifications',
        loadChildren: "./send-notifications/send-notifications.module#SendNotificationsModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'view-project-notifications-for-modifications',
        loadChildren: "./project-notifications-for-modifications/project-notifications-for-modifications.module#ProjectNotificationsForModificationsModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'project-notifications-for-modifications-view',
        loadChildren: "./view-project-notifications-for-modifications/view-project-notifications-for-modifications.module#ViewProjectNotificationsForModificationsModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'receipt-cheque-edit',
        loadChildren: "./crm-receipt-cheque-completed-edit/crm-receipt-cheque-completed-edit.module#CrmReceiptChequeCompletedEditModule",
        canActivate: [AuthGuard]

    },
    {
        path: 'receipt-online-edit',
        loadChildren: "./crm-receipt-online-completed-edit/crm-receipt-online-completed-edit.module#CrmReceiptOnlineCompletedEditModule",
        canActivate: [AuthGuard]

    },

    {
        path: 'leave-update',
        loadChildren: "./leave-update/leave-update.module#LeaveUpdateModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'change-password',
        loadChildren: "./reset-password/reset-password.module#ResetPasswordModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'modify-suspense-entry',
        loadChildren: "./edit-suspenceentry-list/edit-suspenceentry-list.module#EditSuspenceentryListModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'edit-suspense-entry_view',
        loadChildren: "./edit-suspenceentry-view/edit-suspenceentry-view.module#EditSuspenceentryViewModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'reference',
        loadChildren: "./ReferFriend/referefriendsearch/referefriendsearch.module#ReferefriendsearchModule",
        canActivate: [AuthGuard]
    },
    {
        path: 'view-refer-data',
        loadChildren: "./ReferFriend/view-referal-data/view-referal-data.module#ViewReferalDataModule",
        canActivate: [AuthGuard]
    },
    {
        path: 'reference-list',
        loadChildren: "./reference-list/reference-list.module#ReferenceListModule",
        canActivate: [AuthGuard]
    },
    {
        path: 'excelreading',
        loadChildren: "./excelreading/excelreading.module#ExcelreadingModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'dashboard',
        component: DashBoardComponent,
        canActivate: [AuthGuard]
    },

    {
        path: 'dashboard-management',
        loadChildren: "./dashboard-management/dashboard-management.module#DashboardManagementModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'login',
        loadChildren: "./login/login.module#LoginModule",

    },

    {
        path: 'Projectwise-Ticket-Report',
        loadChildren: "./table-two-project-wise-tkt-report/table-two-project-wise-tkt-report.module#TableTwoProjectWiseTktReportModule",
        canActivate: [AuthGuard]
    },



    {
        path: 'viewcustomerdetails',
        loadChildren: "./viewcustomerdetails/viewcustomerdetails.module#ViewcustomerdetailsModule",
        canActivate: [AuthGuard]
    },


    {
        path: 'approvedcustomer',
        loadChildren: "./approvedcustomer/approvedcustomer.module#ApprovedcustomerModule",
        canActivate: [AuthGuard]
    },


    {
        path: 'createMilestone',
        loadChildren: "./create-milestone/create-milestone.module#CreateMilestoneModule",
        canActivate: [AuthGuard]
    },
    {
        path: 'view-milestone',
        loadChildren: "./view-milestone-details/view-milestone-details.module#ViewMilestoneDetailsModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'changeticketowner',
        loadChildren: "./changeticketowner/changeticketowner.module#ChangeticketownerModule",
        canActivate: [AuthGuard]
    },


    {
        path: 'modification-invoice',
        loadChildren: "./raise-invoice-modifications/raise-invoice-modifications.module#RaiseInvoiceModificationsModule",
        canActivate: [AuthGuard]
    },


    {
        path: 'update-tds',
        loadChildren: "./update-tds/update-tds.module#UpdateTdsModule",
        canActivate: [AuthGuard]
    },


    {
        path: 'crmmodule/lead-creation',
        loadChildren: "./crmfolder/lead-creation/lead-creation.module#LeadCreationModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'lead-creation-list',
        loadChildren: "./crmfolder/lead-creation-list/lead-creation-list.module#LeadCreationListModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'crm_dashboard',
        loadChildren: "./crmfolder/reportfour/reportfour.module#ReportfourModule",
        canActivate: [AuthGuard]
    },
    {
        path: 'view-lead-creation',
        loadChildren: "./crmfolder/view-lead-creation/view-lead-creation.module#ViewLeadCreationModule",
        canActivate: [AuthGuard]
    },
    {
        path: 'update-lead-list',
        loadChildren: "./crmfolder/update-lead-list/update-lead-list.module#UpdateLeadListModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'update-lead-creation',
        loadChildren: "./crmfolder/update-lead-creation/update-lead-creation.module#UpdateLeadCreationModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'View-All-Notification-Details',
        loadChildren: "./all-notifications-view-details/all-notifications-view-details.module#AllNotificationsViewDetailsModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'view-company-notifications-for-approvals',
        loadChildren: "./company-notifications-approvals/company-notifications-approvals.module#CompanyNotificationsApprovalsModule",
        canActivate: [AuthGuard]
    },
    {
        path: 'approve-company-notifications',
        loadChildren: "./company-view-and-approve/company-view-and-approve.module#CompanyViewAndApproveModule",
        canActivate: [AuthGuard]
    },
    {
        path: 'ticket/viewticket',
        component: ViewticketsComponent,
        canActivate: [AuthGuard]
    },


    {
        path: 'view-my-tickets',
        component: ViewMyTicketsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'approve-escalation',
        component: ApproveEscalationComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'approve-escalation-details',
        component: ApproveEscalationDetailsComponent,
        canActivate: [AuthGuard]
    },

    {
        path: 'ticket/flatdetails',
        component: FlatdetailsComponent,
        canActivate: [AuthGuard]
    },


    {
        path: 'ticket/ticketdetails',
        component: TicketdetailsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'ticket/viewinforequest',
        component: ViewinforequestComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'ticket/viewinforequestdetails',
        component: ViewinforequestdetailsComponent,
        canActivate: [AuthGuard]
    },

    {
        path: 'escaltion-ticketdetails',
        component: EscaltionTicketdetailsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'Escalation_Complaints_Master',
        component: EscalationComplaintMasterComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'Assign-Complaint-Master',
        component: AssignComplaintsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'NOC_Report',
        loadChildren: "./noc-details/noc-details.module#NocDetailsModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'suspense-entries-report',
        loadChildren: "./suspense-entries-report/suspense-entries-report.module#SuspenseEntriesReportModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'Ticket_Type_Details',
        loadChildren: "./assign-ticket/assign-ticket.module#AssignTicketModule",
        canActivate: [AuthGuard]
    },
    {
        path: 'Create_Escalation_Levels',
        loadChildren: "./new-escalation-ticket/new-escalation-ticket.module#NewEscalationTicketModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'transaction_details_Bank_statement_view',
        loadChildren: "./transaction-details-bank-statement-view/transaction-details-bank-statement-view.module#TransactionDetailsBankStatementViewModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'Companey-view-notification-details',
        loadChildren: "./companey-view-notification-details/companey-view-notification-details.module#CompaneyViewNotificationDetailsModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'view_lead_details',
        loadChildren: "./view-lead-details/view-lead-details.module#ViewLeadDetailsModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'view-lead-update-details',
        loadChildren: "./view-lead-update-details/view-lead-update-details.module#ViewLeadUpdateDetailsModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'Ticket_Avg_Close_Time_Report',
        loadChildren: "./ticket-avg-close-time-report/ticket-avg-close-time-report.module#TicketAvgCloseTimeReportModule",
        canActivate: [AuthGuard]
    },


    {
        path: 'ClearedTransactionReport',
        component: ClearedTransactionReportComponent,
        canActivate: [AuthGuard]
    },

    {
        path: 'Add_Customer',
        loadChildren: "./add-customer/add-customer.module#AddCustomerModule",
        canActivate: [AuthGuard]
    },
    {
        path: 'Create-booking',
        loadChildren: "./add-customer/add-customer.module#AddCustomerModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'update-booking',
        loadChildren: "./updated-customer/updated-customer.module#UpdatedCustomerModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'Waive-Off',
        loadChildren: "./receipt-waive-off-amount/receipt-waive-off-amount.module#ReceiptWaiveOffAmountModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'Approve_Waive-Off',
        loadChildren: "./approve-waive-off/approve-waive-off.module#ApproveWaiveOffModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'ProjectWise_Escalation_Report',
        loadChildren: "./projectwise-escalation-report/projectwise-escalation-report.module#ProjectwiseEscalationReportModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'View-My-Complaints',
        loadChildren: "./complaints/view-complaints/view-complaints.module#ViewComplaintsModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'Complaints-view-details',
        loadChildren: "./complaints/complaints-view-details/complaints-view-details.module#ComplaintsViewDetailsModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'tickets-view-details',
        loadChildren: "./complaints/tickets-view-details/tickets-view-details.module#TicketsViewDetailsModule",
        canActivate: [AuthGuard]
    },
    {
        path: 'View-All-Complaints',
        loadChildren: "./complaints/view-all-complaints/view-all-complaints.module#ViewAllComplaintsModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'view-pending-interest-waiver-status',
        loadChildren: "./view-pending-interest-waiver-status/view-pending-interest-waiver-status.module#ViewPendingInterestWaiverStatusModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'daily-reports',
        loadChildren: "./daily-reports/daily-reports.module#DailyReportsModule",
        // canActivate: [AuthGuard]   -- need to open from mail without login(authentication)
    },

    {
        path: 'company_notification_mail_info',
        loadChildren: "./compeny-mail-approve/compeny-mail-approve.module#CompenyMailApproveModule",
        //canActivate: [AuthGuard]-- need to open from mail without login(authentication)
    },


    {
        path: 'carparking-invoice',
        loadChildren: "./car-parking-invoice/car-parking-invoice.module#CarParkingInvoiceModule",
        canActivate: [AuthGuard]
    },


    {
        path: 'approve-carparking-invoices',
        loadChildren: "./approve-carparking-invoice/approve-carparking-invoice.module#ApproveCarparkingInvoiceModule",
        canActivate: [AuthGuard]
    },
    {
        path: "view-carparking-invoice",
        loadChildren: "./view-carparking-invoice/view-carparking-invoice.module#ViewCarparkingInvoiceModule",
        canActivate: [AuthGuard]
    },
    {
        path: 'AppRegisteredOrNot',
        component: AppRegisteredOrNotComponent,
        canActivate: [AuthGuard]
    },

    // {
    //     path: 'assign-complaints',
    //     component: AssignComplaintsComponent,
    //     canActivate: [AuthGuard]
    // },

    {
        path: 'receipt_tds_entry',
        component: ReceiptTdsEntryComponent,
        canActivate: [AuthGuard]
    },

    {
        path: 'modify-receipt-tds-view',
        component: ModifyReceiptTdsViewComponent,
        canActivate: [AuthGuard]
    },


    {
        path: 'View-Closed-Complaints',
        loadChildren: "./complaints/view-closed-complaints/view-closed-complaints.module#ViewClosedComplaintsModule",
        canActivate: [AuthGuard]
    },

    // {
    //     path: 'receipt_tds_entry',
    //     loadChildren: "./receipt-tds-entry/receipt-tds-entry.module#ReceiptTdsEntryModule",
    //     canActivate: [AuthGuard]
    // },
    // {
    //     path: 'assign-complaints',
    //     loadChildren: "./complaints/assign-complaints/assign-complaints.module#AssignComplaintsModule",
    //     canActivate: [AuthGuard]
    // },
    {
        path: 'lender-creation',
        loadChildren: "./lender-creation/lender-creation.module#LenderCreationModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'Escalation_Complaints',
        component: EsacationComplaintsComponent,
        canActivate: [AuthGuard]
    },

    {
        path: 'Escalation_Complaints_Details',
        component: EscaltionComplaintDetailsComponent,
        canActivate: [AuthGuard]
    },

    {
        path: 'transaction_reading',
        component: DataReading2Component,
        canActivate: [AuthGuard]
    },

    {
        path: 'receipt_tds_view',
        component: ReceiptTdsViewComponent,
        canActivate: [AuthGuard]
    },

    {
        path: 'Receipt_Tds_View',
        component: SinglepageReceiptTdsViewComponent,
        canActivate: [AuthGuard]
    },

    // {
    //     path: 'update_milestone_due_dates',
    //     component: UpdateMilestoneDueDatesComponent,
    //     canActivate: [AuthGuard]
    // },

    
    {
        path: 'update_milestone_due_dates',
        loadChildren: "./update-milestone-due-dates/update-milestone-due-dates.module#UpdateMilestoneDueDatesModule",
        canActivate: [AuthGuard]
    },
    {
        path: 'RecieptOnline',
        loadChildren: "./customer-reciept-online/customer-reciept-online.module#CustomerRecieptOnlineModule",
        canActivate: [AuthGuard]
    },
    {
        path: 'register-unregister-list',
        loadChildren: "./register-and-unregister-list/register-and-unregister-list.module#RegisterAndUnregisterListModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'Complaint-report-projectwise',
        loadChildren: "./complaint-monthly-report-projectwise/complaint-monthly-report-projectwise.module#ComplaintMonthlyReportProjectwiseModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'AssignmentTransferFee-invoice',
        loadChildren: "./assignment-transfer-free/assignment-transfer-free.module#AssignmentTransferFreeModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'approve-AssignmentTransferFee-invoices',
        loadChildren: "./approve-assignment-transfer-fee/approve-assignment-transfer-fee.module#ApproveAssignmentTransferFeeModule",
        canActivate: [AuthGuard]
    },


    {
        path: "view-assignment-transfer-fee",
        loadChildren: "./view-assignment-transfer-fee/view-assignment-transfer-fee.module#ViewAssignmentTransferFeeModule",
        canActivate: [AuthGuard]
    },
    {
        path: "view_cust_bank_details",
        loadChildren: "./customer-bank-details/customer-bank-details.module#CustomerBankDetailsModule",
        canActivate: [AuthGuard]
    },


    {
        path: "module_and_site_access_masters",
        loadChildren: "./module-and-site-access-masters/module-and-site-access-masters.module#ModuleAndSiteAccessMastersModule",
        canActivate: [AuthGuard]
    },
    {
        path: "Module_and_site_access_masters",
        loadChildren: "./module-and-site-access-masters/module-and-site-access-masters.module#ModuleAndSiteAccessMastersModule",
        canActivate: [AuthGuard]
    },

    {
        path: 'lendor-creation',
        loadChildren: "./lender-creation/lender-creation.module#LenderCreationModule",
        canActivate: [AuthGuard]
    },
    
    {
        path: 'lendor-list',
        loadChildren: "./lender-list/lender-list.module#LenderListModule",
        canActivate: [AuthGuard]
    },
    {
        path: 'lendor-view-details',
        loadChildren: "./lender-view-details/lender-view-details.module#LenderViewDetailsModule",
        canActivate: [AuthGuard]
    },

    {
        path: "Existing_Bookings",
        loadChildren: "./existing-booking/existing-booking.module#ExistingBookingModule",
        canActivate: [AuthGuard]
    },



    {
        path: 'approvebooking',
        loadChildren: "./approve-booking/approve-booking.module#ApproveBookingModule",
      //  component: ApproveBookingComponent,
        canActivate: [AuthGuard]
    },


    {
        path: "View_Bank_Account_Details",
        loadChildren: "./view-and-update-account-details/view-and-update-account-details.module#ViewAndUpdateAccountDetailsModule",
        canActivate: [AuthGuard]
    },

    {
        path: "Add_Bank_Account_Details",
        loadChildren: "./add-account-and-update-account/add-account-and-update-account.module#AddAccountAndUpdateAccountModule",
        canActivate: [AuthGuard]
    },

    {
        path: "Update_Bank_Account_Details",
        loadChildren: "./update-bank-account-details/update-bank-account-details.module#UpdateBankAccountDetailsModule",
        canActivate: [AuthGuard]
    },

    

    {
        path: "**",
        component: DashBoardComponent,
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        scrollPositionRestoration: 'top'
    })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
