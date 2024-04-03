import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, catchError, of } from 'rxjs';
import { UserService } from '../user.service';
import { emailValidator } from 'src/app/shared/utils/email-validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnDestroy {
  private subscriptions = new Subscription();
  form: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, emailValidator()]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login(): void {
    this.errorMessage = null;
    if (this.form.invalid) {
      return;
    }

    const { email, password } = this.form.value;

    this.subscriptions.add(
      this.userService
        .login(email, password)
        .pipe(
          catchError((error) => {
            this.errorMessage = 'Email and/or password are not correct!';
            return of({});
          })
        )
        .subscribe({
          next: (response) => {
            if (response && response.accessToken) {
              this.router.navigate(['/']);
            }
          },
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
