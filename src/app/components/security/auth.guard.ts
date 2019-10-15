import { SharedService } from './../../services/shared.service';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

    public shared: SharedService;

    constructor(private router: Router) {
        this.shared = SharedService.getInstance();
    }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | boolean {
        if (this.shared.isLoggedIn()) {
            this.shared.user.profile = this.shared.user.profile;
            this.shared.showTemplate.emit(true);
            return true;
        }

        else if (localStorage.getItem('currentUser')) {
          
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }

}