import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private getHeaders(token?: string): HttpHeaders {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) {
      headers = headers.set('X-Authorization', token);
    }
    return headers;
  }

  request(
    method: string,
    url: string,
    data?: any,
    token?: string
  ): Observable<any> {
    const options = {
      headers: this.getHeaders(token),
      body: JSON.stringify(data),
    };

    switch (method) {
      case 'GET':
        return this.http.get(url, options);
      case 'POST':
        return this.http.post(url, data, options);
      case 'PUT':
        return this.http.put(url, data, options);
      case 'DELETE':
        return this.http.delete(url, options);
      default:
        throw new Error(`Unsupported request method: ${method}`);
    }
  }
}
