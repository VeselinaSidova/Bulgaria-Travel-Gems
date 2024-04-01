import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeartToggleComponent } from './heart-toggle/heart-toggle.component';
import { SlicePipe } from './pipes/slice.pipe';
import { ElapsedTimePipe } from './pipes/elapsed-time.pipe';
import { LocationNameFromIdPipe } from './pipes/location-name-from-id.pipe';
import { CamelCaseToSpacePipe } from './pipes/camel-case-to-space.pipe';

@NgModule({
  declarations: [
    HeartToggleComponent,
    SlicePipe,
    ElapsedTimePipe,
    LocationNameFromIdPipe,
    CamelCaseToSpacePipe,
  ],
  imports: [CommonModule],
  exports: [
    HeartToggleComponent,
    SlicePipe,
    ElapsedTimePipe,
    LocationNameFromIdPipe,
    CamelCaseToSpacePipe,
  ],
})
export class SharedModule {}
