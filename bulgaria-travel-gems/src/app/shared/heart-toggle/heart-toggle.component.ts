import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-heart-toggle',
  templateUrl: './heart-toggle.component.html',
  styleUrls: ['./heart-toggle.component.css'],
})
export class HeartToggleComponent {
  @Input() isToggled?: boolean;
  @Output() toggle = new EventEmitter<boolean>();

  onToggle(): void {
    this.isToggled = !this.isToggled;
    this.toggle.emit(this.isToggled);
  }
}
