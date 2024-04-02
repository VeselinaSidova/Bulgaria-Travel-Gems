import { Component, Input } from '@angular/core';
import { Location } from 'src/app/types/location';

@Component({
  selector: 'app-location-item',
  templateUrl: './location-item.component.html',
  styleUrls: ['./location-item.component.css'],
})
export class LocationItemComponent {
  @Input() location!: Location;
}
