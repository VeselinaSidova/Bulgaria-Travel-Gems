import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from 'src/app/user/user.service';
import { User } from 'src/app/types/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: Omit<User, 'password'> | null = null;
  private subscription!: Subscription; // Added definite assignment assertion here

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.subscription = this.userService.authState$.subscribe((authState) => {
      this.user = authState.user;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
