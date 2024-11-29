import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { headers } from "../config/constants";


@Injectable({ providedIn: 'root' })
export class LoginService {

    private apiUrl = "/api/auth";
    constructor(private httpClient: HttpClient) { }

    public login(user:{username:any,password:any}): Observable<any> {
        return this.httpClient.post<any>(`${this.apiUrl}/login`,user,{ headers: headers,responseType: 'text' as 'json' }).pipe(
            catchError((error) => {
                return throwError(() => error);
            })
        )
    }

    public register(user:{username:any,password:any}): Observable<any> {
        return this.httpClient.post<any>(`${this.apiUrl}/register`,user,{ headers: headers,responseType: 'text' as 'json' }).pipe(
            catchError((error) => {
                return throwError(() => error);
            })
        )
    }

}