import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ShipService } from '../game/services/ship.service';

@Injectable({
  providedIn: 'root'
})
export class WaitingGuard implements CanActivate {
  constructor(private shipService:ShipService, protected router:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.shipService.getShips().length > 0){
      this.router.navigate(['/game/strategy']);
      return false;
    }
    else{
      return true;
    }
  }
  
}
