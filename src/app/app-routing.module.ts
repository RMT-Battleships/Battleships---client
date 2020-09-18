import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccInfoComponent } from './account/acc-info/acc-info.component';
import { EditPassComponent } from './account/edit-pass/edit-pass.component';
import { LoginComponent } from './account/login/login.component';
import { SingupComponent } from './account/singup/singup.component';
import { WaitingComponent } from './game/battle/waiting/waiting.component';
import { GuestComponent } from './menu/guest/guest.component';
import { MainComponent } from './menu/main/main.component';
import { UserComponent } from './menu/user/user.component';


const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'acc-info', component: AccInfoComponent },
  { path: 'edit-pass', component: EditPassComponent },
  { path: 'singup', component: SingupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainComponent },
  { path: 'guest', component: GuestComponent },
  { path: 'user', component: UserComponent },
  { path: 'battle/waiting', component: WaitingComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
