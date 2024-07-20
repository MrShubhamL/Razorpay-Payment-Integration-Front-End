import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SuccessComponent } from './components/success/success.component';
import { FailedComponent } from './components/failed/failed.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: "home", component: HomeComponent},
  {path: "success", component: SuccessComponent},
  {path: "failed", component: FailedComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
