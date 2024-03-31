import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isLoggedIn$: Observable<boolean>;

  constructor(private userService: UserService, private router: Router) {
    this.isLoggedIn$ = this.userService.authState$.pipe(
      map((state) => state.isLoggedIn)
    );
  }

  logout() {
    this.userService.logout().subscribe({
      next: () => this.router.navigate(['/']),
      error: () => this.router.navigate(['/']),
    });
  }
}
