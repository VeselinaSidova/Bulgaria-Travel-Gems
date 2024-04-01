import { Injectable } from '@angular/core';
import { AsyncValidatorFn, AbstractControl } from '@angular/forms';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { LocationService } from 'src/app/location/location.service';

@Injectable({ providedIn: 'root' })
export class LocationValidators {
  static locationExists(locationService: LocationService): AsyncValidatorFn {
    return (control: AbstractControl) => {
      if (!control.value) {
        return of(null);
      }
      return locationService.getLocationById(control.value).pipe(
        map((location) => {
          return null;
        }),
        catchError(() => {
          return of({ locationNotFound: true });
        })
      );
    };
  }
}
