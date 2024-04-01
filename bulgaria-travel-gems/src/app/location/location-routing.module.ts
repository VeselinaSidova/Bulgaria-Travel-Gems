import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationsListComponent } from './locations-list/locations-list.component';
import { MyLocationsComponent } from './my-locations/my-locations.component';
import { LocationsWishlistComponent } from './locations-wishlist/locations-wishlist.component';
import { AuthActivate } from '../guards/auth.activate';
import { LocationDetailsComponent } from './location-details/location-details.component';

const routes: Routes = [
  {
    path: 'locations',
    children: [
      { path: '', pathMatch: 'full', component: LocationsListComponent },
      { path: ':_id', component: LocationDetailsComponent },
    ],
  },
  {
    path: 'my-locations',
    component: MyLocationsComponent,
    canActivate: [AuthActivate],
  },
  {
    path: 'wishlist',
    component: LocationsWishlistComponent,
    canActivate: [AuthActivate],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocationRoutingModule {}
