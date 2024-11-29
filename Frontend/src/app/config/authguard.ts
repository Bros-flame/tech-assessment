import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs"; 
import { HelperService } from "../service/helper";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard {

    decodedToken:any;
    constructor(private router:Router,private helper:HelperService){}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        let url: string = state.url;
        return this.userLogIn(next, url);
    }

    userLogIn(route:ActivatedRouteSnapshot, url: any):boolean{
        if(this.router.url === "/login")
            return true;

        if(this.helper.isLoggedIn())
            return true;
        
        this.router.navigateByUrl("/login")
        return false;
    }
}