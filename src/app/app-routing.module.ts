import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SellerComponent } from './seller/seller.component';
import { TransactionComponent } from './transaction/transaction.component';

const routes: Routes = [
  { path: 'transactions', component: TransactionComponent },
  { path: 'sellersummery', component: SellerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
