import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuestComponent } from './menu/guest/guest.component';
import { MainComponent } from './menu/main/main.component';


const routes: Routes = [
 { path: 'main', component: MainComponent },
 { path:'guest', component:GuestComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
