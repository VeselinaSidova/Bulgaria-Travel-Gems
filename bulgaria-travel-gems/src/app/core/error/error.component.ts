import { Component, OnDestroy, OnInit } from '@angular/core';
import { ErrorService } from './error.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  errorMessage: string | null = null;

  constructor(private errorService: ErrorService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.errorService.requestError$.subscribe((message: string | null) => {
        this.errorMessage = message;
      })
    );
  }

  clearError(): void {
    this.errorService.clearError();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
