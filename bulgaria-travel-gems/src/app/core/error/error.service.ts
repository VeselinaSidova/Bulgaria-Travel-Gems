import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private requestError$$ = new BehaviorSubject<string | null>(null);
  public requestError$ = this.requestError$$.asObservable();

  constructor() {}

  setError(message: string): void {
    this.requestError$$.next(message);
  }

  clearError(): void {
    this.requestError$$.next(null);
  }
}
