import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeartToggleComponent } from './heart-toggle/heart-toggle.component';

@NgModule({
  declarations: [HeartToggleComponent],
  imports: [CommonModule],
  exports: [HeartToggleComponent],
})
export class SharedModule {}
