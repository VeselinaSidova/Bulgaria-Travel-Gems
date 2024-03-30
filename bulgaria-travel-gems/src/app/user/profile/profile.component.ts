import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: User = {
    firstName: 'Peter',
    lastName: 'Ivanov',
    email: 'peter@abv.bg',
    password: '123456',
  };

  constructor() {}

  ngOnInit(): void {}
}
