import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationsListComponent } from './locations-list/locations-list.component';
import { MyLocationsComponent } from './my-locations/my-locations.component';
import { LocationsWishlistComponent } from './locations-wishlist/locations-wishlist.component';
import { LocationRoutingModule } from './location-routing.module';
import { LocationDetailsComponent } from './location-details/location-details.component';

@NgModule({
  declarations: [
    LocationsListComponent,
    MyLocationsComponent,
    LocationsWishlistComponent,
    LocationDetailsComponent,
  ],
  imports: [CommonModule, LocationRoutingModule],
})
export class LocationModule {}
