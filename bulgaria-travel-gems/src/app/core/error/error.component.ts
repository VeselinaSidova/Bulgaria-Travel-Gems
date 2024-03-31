import { Component, OnInit } from '@angular/core';
import { ErrorService } from './error.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent implements OnInit {
  errorMessage: string | null = null;

  constructor(private errorService: ErrorService) {}

  ngOnInit(): void {
    this.errorService.requestError$.subscribe((err: any) => {
      this.errorMessage = err?.message || null;
    });
  }

  // // Optionally create a method to clear the error message
  // clearError() {
  //   this.errorService.clearErrorMessage();
  //   this.errorMessage = null;
  // }
}
