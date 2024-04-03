import { Component, OnInit } from '@angular/core';
import { Location } from 'src/app/types/location';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-locations-list',
  templateUrl: './locations-list.component.html',
  styleUrls: ['./locations-list.component.css'],
})
export class LocationsListComponent implements OnInit {
  locations: Location[] = [];
  hasLocations: boolean = true;

  constructor(private locationService: LocationService) {}

  ngOnInit(): void {
    this.getLocations();
  }

  getLocations(): void {
    this.locationService.getLocations().subscribe({
      next: (locations) => {
        this.locations = locations;
        this.hasLocations = locations.length > 0;
      },
      error: (error) => {
        console.error('Error fetching locations from server:', error);
        this.hasLocations = false;
      },
    });
  }
}
