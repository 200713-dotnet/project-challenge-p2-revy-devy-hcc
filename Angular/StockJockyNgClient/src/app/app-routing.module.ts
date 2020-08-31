import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StockViewComponent } from './stock-view/stock-view.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'StockView', component: StockViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
