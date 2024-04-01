import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from '../article.service';
import { Location } from 'src/app/types/location';
import { LocationService } from 'src/app/location/location.service';
import { Router } from '@angular/router';
import { urlValidator } from 'src/app/shared/utils/url-validator';
import { LocationValidators } from 'src/app/shared/utils/locationId-validator';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css'],
})
export class AddArticleComponent implements OnInit {
  form = this.fb.group({
    title: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
    ],
    imageUrl: ['', [Validators.required, urlValidator()]],
    locationId: [
      '',
      [Validators.required],
      [LocationValidators.locationExists(this.locationService)],
    ],
    content: [
      '',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(7000),
      ],
    ],
  });
  locations: Location[] = [];

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private locationService: LocationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadLocations();
  }

  loadLocations(): void {
    this.locationService.getLocations().subscribe({
      next: (locations) => {
        this.locations = locations;
      },
      error: (error) => {
        console.error('Error fetching locations:', error);
      },
    });
  }

  addArticle(): void {
    if (this.form.invalid) {
      return;
    }
    const { title, imageUrl, locationId, content } = this.form.value;

    this.articleService
      .addArticle(title!, imageUrl!, locationId!, content!)
      .subscribe(() => {
        this.router.navigate(['/articles']);
      });
  }
}
