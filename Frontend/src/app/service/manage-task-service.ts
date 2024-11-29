import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, Subject, tap, throwError } from "rxjs";
import { headersSecure, Task } from "../config/constants";

@Injectable({ providedIn: 'root' })
export class ManageTaskService {

    private apiUrl = "/api/task";
    constructor(private httpClient: HttpClient) { }

    private refreshrequired = new Subject<void>();
    get RefreshRequired() { return this.refreshrequired; }

    public deleteTask(taskId:any): Observable<any> {
        return this.httpClient.delete(`${this.apiUrl}/delete-task/${taskId}`,{ headers: headersSecure }).pipe(
            tap(()=>this.refreshrequired.next()),
            catchError((error) => {
                return throwError(() => error);
            })
        )
    }

    public createTask(task:Task): Observable<any> {
        return this.httpClient.post(`${this.apiUrl}/create-task`,task,{ headers: headersSecure }).pipe(
            tap(()=>this.refreshrequired.next()),
            catchError((error) => {
                return throwError(() => error);
            })
        )
    }

    public updateTask(taskId:any,task:Task): Observable<any> {
        return this.httpClient.put(`${this.apiUrl}/update-task/${taskId}`,task,{ headers: headersSecure }).pipe(
            tap(()=>this.refreshrequired.next()),
            catchError((error) => {
                return throwError(() => error);
            })
        )
    }

    public getTasks(): Observable<any> {
        return this.httpClient.get<any>(`${this.apiUrl}/get-tasks`,{ headers: headersSecure }).pipe(
            catchError((error) => {
                return throwError(() => error);
            })
        )
    }
}