import { Component, OnInit } from '@angular/core';
import { ErrorService } from './error.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent implements OnInit {
  errorMessage: string | null = null;

  constructor(private errorService: ErrorService) {}

  ngOnInit(): void {
    this.errorService.requestError$.subscribe((message: string | null) => {
      this.errorMessage = message;
    });
  }

  clearError(): void {
    this.errorService.clearError();
  }
}
