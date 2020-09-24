import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { WebSocketService } from '../game/services/web-socket.service';

@Injectable({
  providedIn: 'root'
})
export class GameGuard implements CanActivate {
  constructor(private webSocket:WebSocketService, protected router:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.webSocket.getRoomOwner() === undefined){
      this.router.navigate(['/game/waiting']);
      return false;
    }else{
      return true;
    }
  }
  
}
