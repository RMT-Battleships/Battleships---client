import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccInfoComponent } from './account/acc-info/acc-info.component';
import { EditPassComponent } from './account/edit-pass/edit-pass.component';
import { GuestComponent } from './menu/guest/guest.component';
import { MainComponent } from './menu/main/main.component';


const routes: Routes = [
 {path: 'acc-info', component: AccInfoComponent},
 {path: 'edit-pass', component: EditPassComponent},
 { path: 'main', component: MainComponent },
 { path:'guest', component:GuestComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
