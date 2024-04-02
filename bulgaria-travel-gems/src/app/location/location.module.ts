import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationsListComponent } from './locations-list/locations-list.component';
import { MyLocationsComponent } from './my-locations/my-locations.component';
import { LocationsWishlistComponent } from './locations-wishlist/locations-wishlist.component';
import { LocationRoutingModule } from './location-routing.module';
import { LocationDetailsComponent } from './location-details/location-details.component';
import { AddLocationComponent } from './add-location/add-location.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LocationItemComponent } from './location-item/location-item.component';

@NgModule({
  declarations: [
    LocationsListComponent,
    MyLocationsComponent,
    LocationsWishlistComponent,
    LocationDetailsComponent,
    AddLocationComponent,
    LocationItemComponent,
  ],
  imports: [
    CommonModule,
    LocationRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class LocationModule {}
