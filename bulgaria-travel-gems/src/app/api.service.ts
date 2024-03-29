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
      body: data,
    };

    switch (method) {
      case 'GET':
        return this.http.get(url, { headers: this.getHeaders(token) });
      case 'POST':
        return this.http.post(url, data, { headers: this.getHeaders(token) });
      case 'PUT':
        return this.http.put(url, data, { headers: this.getHeaders(token) });
      case 'DELETE':
        return this.http.delete(url, { headers: this.getHeaders(token) });
      default:
        throw new Error(`Unsupported request method: ${method}`);
    }
  }
}
