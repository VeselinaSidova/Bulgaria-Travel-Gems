import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocationService } from 'src/app/location/location.service';
import { Location } from '../../types/location';

@Pipe({
  name: 'locationNameFromId',
})
export class LocationNameFromIdPipe implements PipeTransform {
  constructor(private locationService: LocationService) {}

  transform(locationId: string): Observable<string> {
    if (!locationId) {
      return of('');
    }

    return this.locationService.getLocationById(locationId).pipe(
      map((location: Location) => {
        return location.name || 'Unknown';
      })
    );
  }
}
