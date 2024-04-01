import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeartToggleComponent } from './heart-toggle/heart-toggle.component';
import { SlicePipe } from './pipes/slice.pipe';
import { ElapsedTimePipe } from './pipes/elapsed-time.pipe';
import { LocationNameFromIdPipe } from './pipes/location-name-from-id.pipe';

@NgModule({
  declarations: [
    HeartToggleComponent,
    SlicePipe,
    ElapsedTimePipe,
    LocationNameFromIdPipe,
  ],
  imports: [CommonModule],
  exports: [
    HeartToggleComponent,
    SlicePipe,
    ElapsedTimePipe,
    LocationNameFromIdPipe,
  ],
})
export class SharedModule {}
