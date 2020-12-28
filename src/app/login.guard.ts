import { Injectable } from "@angular/core";
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
@Injectable()
export class LoginGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {

    }

    canActivate(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
        console.log(route);
        if (!this.authService.loggedIn()) {
            alert("请先登录");
            this.router.navigate(['/home']);
        }
        return this.authService.loggedIn();
    }


}