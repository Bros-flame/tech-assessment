import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

const USER_TOKEN = 'token';

@Injectable({ providedIn: 'root' })
export class HelperService {

    private decodedToken: any;
    private role: any

    public getRole(): string {
        this.decodedToken = jwt_decode(this.getToken())
        this.role = this.decodedToken.scope;
        return this.role;
    }

    public clean(): void { window.sessionStorage.clear() }

    public storeToken(token: any): void {
        window.sessionStorage.removeItem(USER_TOKEN);
        window.sessionStorage.setItem(USER_TOKEN, JSON.stringify(token));
    }

    public getToken(): any {
        const token = window.sessionStorage.getItem(USER_TOKEN);
        if (token)
            return token;

        return {};
    }

    public isLoggedIn(): boolean {
        const token = window.sessionStorage.getItem(USER_TOKEN);
        if (token) {
            this.decodedToken = jwt_decode(token);
            return new Date((this.decodedToken.exp * 1000)) > new Date();
        }

        return false;
    }
}