import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  hostAddress = 'http://localhost:8000/';

  constructor(private http: HttpClient) {}

  getData(url: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
    .get(this.hostAddress + url, { headers })
    .pipe(
      catchError((error: any) => {
        return throwError('something went wrong in the server');
      })
    );
  }

  postData(url: string, data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
    .post(this.hostAddress + url, data, { headers })
    .pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error: any) => {
        return throwError('something went wrong in the server');
      })
    );
  }

  putData(url: string, data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
    .put(this.hostAddress + url, data, { headers })
    .pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error: any) => {
        return throwError('something went wrong in the server');
      })
    );
  }

  deleteData(url: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
    .delete(this.hostAddress + url, { headers })
    .pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error: any) => {
        return throwError('something went wrong in the server');
      })
    );
  }
}
