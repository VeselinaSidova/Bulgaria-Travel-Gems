import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationsListComponent } from './locations-list/locations-list.component';
import { MyLocationsComponent } from './my-locations/my-locations.component';
import { AuthActivate } from '../guards/auth.activate';
import { LocationDetailsComponent } from './location-details/location-details.component';
import { AddLocationComponent } from './add-location/add-location.component';

const routes: Routes = [
  {
    path: 'locations',
    children: [
      { path: '', pathMatch: 'full', component: LocationsListComponent },
      { path: ':_id', pathMatch: 'full', component: LocationDetailsComponent },
    ],
  },
  {
    path: 'add-location',
    component: AddLocationComponent,
    canActivate: [AuthActivate],
  },
  {
    path: 'my-locations',
    component: MyLocationsComponent,
    canActivate: [AuthActivate],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocationRoutingModule {}
