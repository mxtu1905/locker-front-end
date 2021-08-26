import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListCustomerComponent } from './components/list-customer/list-customer.component';
import { HttpClientModule } from '@angular/common/http';
import { TicketHistoryComponent } from './components/ticket-history/ticket-history.component';
import { FormsModule } from '@angular/forms';
import { ListTicketComponent } from './components/list-ticket/list-ticket.component';
import { TicketDetailComponent } from './components/ticket-detail/ticket-detail.component';
import { CustomerAssignComponent } from './components/customer-assign/customer-assign.component';


const routers: Routes = [
  {path: 'list-customer', component: ListCustomerComponent},
  {path: 'list-ticket', component: ListTicketComponent},
  {path: 'ticket-history/:id', component: TicketHistoryComponent},
  {path: 'ticket-detail/:id', component: TicketDetailComponent},
  {path: 'customer-assign/:id', component: CustomerAssignComponent},
  {path: '', redirectTo: '/list-customer', pathMatch: 'full'}
];
@NgModule({
  declarations: [
    AppComponent,
    ListCustomerComponent,
    TicketHistoryComponent,
    ListTicketComponent,
    TicketDetailComponent,
    CustomerAssignComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routers)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
