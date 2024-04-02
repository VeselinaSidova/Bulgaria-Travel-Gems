import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { LocationService } from '../location.service';
import { UserService } from 'src/app/user/user.service';
import { Location } from 'src/app/types/location';

@Component({
  selector: 'app-my-locations',
  templateUrl: './my-locations.component.html',
  styleUrls: ['./my-locations.component.css'],
})
export class MyLocationsComponent implements OnInit {
  myLocations$!: Observable<Location[]>;
  hasLocations = false;
  currentUser: any;

  constructor(
    private locationService: LocationService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const userDataJson = localStorage.getItem('user_data');
    if (userDataJson) {
      this.currentUser = JSON.parse(userDataJson);
    }

    if (this.currentUser?.id) {
      this.myLocations$ = this.locationService.getLocations().pipe(
        map((locations) => {
          const userLocations = locations.filter(
            (location) => location._ownerId === this.currentUser.id
          );
          this.hasLocations = userLocations.length > 0;
          return userLocations;
        })
      );
    }
  }
}
