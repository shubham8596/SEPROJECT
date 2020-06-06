import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from "@angular/common/http";

import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private REST_API_SERVER = "http://localhost:3000/users";
  private REST_API_SERVER1 = "http://localhost:3000/city";


  constructor(private httpClient: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
  public sendGetRequest() {
    return this.httpClient.get(this.REST_API_SERVER).pipe(retry(3), catchError(this.handleError));
  }
  public sendGetCityRequest() {
    return this.httpClient.get(this.REST_API_SERVER1).pipe(retry(3), catchError(this.handleError));
  }
  public getById(id) {
    return this.httpClient.get(this.REST_API_SERVER + '/' + id);
  }

  public getByCityId(id) {
    return this.httpClient.get(this.REST_API_SERVER1 + '/' + id);
  }
  

  public insertUser(data) {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });
    let options = {
      headers: httpHeaders
    };
    return this.httpClient.post(this.REST_API_SERVER, data, options).pipe(catchError(this.handleError));
  }

  public insertBooking(data) {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });
    let options = {
      headers: httpHeaders
    };
    return this.httpClient.post(this.REST_API_SERVER1, data, options).pipe(catchError(this.handleError));
  }

  public deleteProduct(id) {
    return this.httpClient.delete(this.REST_API_SERVER + '/' + id).pipe(catchError(this.handleError));
  }
  public updateUser(data, id) {
    console.log("caledd update")
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    });
    let options = {
      headers: httpHeaders
    };
    return this.httpClient.put(this.REST_API_SERVER + '/' + id, data, options).pipe(catchError(this.handleError));
  }
}