import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Location } from '../types/location';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { TokenAuthService } from '../shared/services/token-auth.service';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private baseUrl = environment.baseUrl;
  private apiUrl = `${this.baseUrl}/data/locations`;

  constructor(
    private apiService: ApiService,
    private tokenAuthService: TokenAuthService
  ) {}

  getLocations(): Observable<Location[]> {
    return this.apiService.request('GET', this.apiUrl);
  }

  getLocationById(id: string): Observable<Location> {
    return this.apiService.request('GET', `${this.apiUrl}/${id}`);
  }

  addLocation(
    name: string,
    imageUrl: string,
    region: string,
    province: string,
    distanceFromCapital: number,
    description: string
  ): Observable<Location> {
    const token = this.tokenAuthService.verifyToken();
    if (typeof token !== 'string') return token;
    return this.apiService.request(
      'POST',
      this.apiUrl,
      { name, imageUrl, region, province, distanceFromCapital, description },
      token
    );
  }

  updateLocation(
    _id: string,
    name: string,
    imageUrl: string,
    region: string,
    province: string,
    distanceFromCapital: number,
    description: string
  ): Observable<Location> {
    const token = this.tokenAuthService.verifyToken();
    if (typeof token !== 'string') return token;
    return this.apiService.request(
      'PUT',
      `${this.apiUrl}/${_id}`,
      { name, imageUrl, region, province, distanceFromCapital, description },
      token
    );
  }

  deleteLocation(id: string): Observable<Location> {
    const token = this.tokenAuthService.verifyToken();
    if (typeof token !== 'string') return token;
    return this.apiService.request('DELETE', `${this.apiUrl}/${id}`, {}, token);
  }
}
