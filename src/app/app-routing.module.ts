import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ClientListComponent } from './client-list/client-list.component';
import { AddClientComponent } from './add-client/add-client.component';
import { PricesComponent } from './prices/prices.component';
import { AddSuscriptionComponent } from './add-suscription/add-suscription.component';
import { SubscriptionListComponent } from './subscription-list/subscription-list.component';


const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'clientList',component:ClientListComponent},
  {path:'addClient/:id',component:AddClientComponent},
  {path:'addClient',component:AddClientComponent},
  {path:'pricing', component:PricesComponent},
  {path:'addSubscription',component:AddSuscriptionComponent},
  {path:'subscriptionList',component:SubscriptionListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
