import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private requestError$$ = new BehaviorSubject(null);
  public requestError$ = this.requestError$$.asObservable();

  constructor() {}

  setError(err: any): void {
    this.requestError$$.next(err);
  }
}
