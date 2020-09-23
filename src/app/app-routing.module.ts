import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccInfoComponent } from './account/acc-info/acc-info.component';
import { EditPassComponent } from './account/edit-pass/edit-pass.component';
import { LoginComponent } from './account/login/login.component';
import { SingupComponent } from './account/singup/singup.component';
import { BattleComponent } from './game/battle/battle.component';
import { WaitingComponent } from './game/battle/waiting/waiting.component';
import { BoardComponent } from './game/board/board.component';
import { GameComponent } from './game/game.component';
import { ShipsComponent } from './game/strategy/ships/ships.component';
import { StrategyComponent } from './game/strategy/strategy.component';
import { AuthGuard } from './guards/auth.guard';
import { GuestComponent } from './menu/guest/guest.component';
import { MainComponent } from './menu/main/main.component';
import { UserComponent } from './menu/user/user.component';
import { RangComponent } from './rang/rang.component';
import {OutcomeComponent} from "./game/battle/outcome/outcome.component";


const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'acc-info', canActivate:[AuthGuard], component: AccInfoComponent },
  { path: 'edit-pass', component: EditPassComponent },
  { path: 'singup', component: SingupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainComponent },
  { path: 'guest', component: GuestComponent },
  { path: 'user', canActivate:[AuthGuard], component: UserComponent },
  { path: 'rang', component: RangComponent },
  {
    path: 'game', component: GameComponent, children:
      [{ path: 'strategy', component: StrategyComponent },
      { path: 'battle', component: BattleComponent },
      { path: 'waiting', component: WaitingComponent },
      { path: 'outcome', component: OutcomeComponent}]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
