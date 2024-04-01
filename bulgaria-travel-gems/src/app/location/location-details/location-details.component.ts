import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from '../location.service';
import { Location } from 'src/app/types/location';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.css'],
})
export class LocationDetailsComponent implements OnInit {
  location: Location | null = null;

  constructor(
    private activeRoute: ActivatedRoute,
    private locationService: LocationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((data) => {
      const locationId = data['_id'];

      this.locationService.getLocationById(locationId).subscribe({
        next: (location) => {
          if (location) {
            this.location = location;
          } else {
            this.router.navigate(['/not-found']);
          }
        },
        error: (error) => {
          this.router.navigate(['/not-found']);
        },
      });
    });
  }

  editLocation(id: string): void {
    // Implement your edit logic here
    console.log('Editing location', id);
  }

  deleteLocation(id: string): void {
    // Implement your delete logic here
    console.log('Deleting location', id);
  }
}
