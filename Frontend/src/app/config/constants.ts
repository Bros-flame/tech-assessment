import { HttpHeaders } from "@angular/common/http"

export const headers = new HttpHeaders()
.set('Content-Type', 'application/json')
.set('Access-Control-Allow-Credentials', 'true')
.set('Access-Control-Allow-Methods','POST,GET,PUT,DELETE')
.set('skip', 'true')

export interface Task {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    completed: boolean;
  }

export const headersSecure = new HttpHeaders()
.set('Content-Type','application/json')
.set('Access-Control-Allow-Headers','Content-Type')
.set('Access-Control-Allow-Credentials','true')
.set('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE')