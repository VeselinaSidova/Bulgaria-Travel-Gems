import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Location } from '../types/location';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private baseUrl = environment.baseUrl;
  private apiUrl = `${this.baseUrl}/data/locations`;

  constructor(private apiService: ApiService) {}

  getLocations(): Observable<Location[]> {
    return this.apiService.request('GET', this.apiUrl);
  }

  getLocationById(id: string): Observable<Location> {
    return this.apiService.request('GET', `${this.apiUrl}/${id}`);
  }

  addLocation(location: Location): Observable<Location> {
    return this.apiService.request('POST', this.apiUrl, location);
  }
}
