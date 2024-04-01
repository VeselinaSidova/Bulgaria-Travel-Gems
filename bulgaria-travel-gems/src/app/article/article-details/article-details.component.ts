import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from '../article.service';
import { LocationService } from '../../location/location.service';
import { Article } from 'src/app/types/article';
import { Location } from 'src/app/types/location';
import { urlValidator } from 'src/app/shared/utils/url-validator';
import { LocationValidators } from 'src/app/shared/utils/locationId-validator';
import { User } from 'src/app/types/user';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css'],
})
export class ArticleDetailsComponent implements OnInit {
  article: Article | null = null;
  locations: Location[] = [];
  articleId: string | null = null;
  currentUser: Omit<User, 'password'> | null = null;
  form: FormGroup;
  showEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private articleService: ArticleService,
    private locationService: LocationService,
    private router: Router,
    private userService: UserService
  ) {
    this.form = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
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
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      this.articleId = params['_id'];

      this.fetchArticle(this.articleId!);
    });

    this.loadLocations();

    this.userService.authState$.subscribe((state) => {
      this.currentUser = state.user;
    });
  }

  fetchArticle(articleId: string): void {
    this.articleService.getArticleById(articleId).subscribe({
      next: (article) => {
        this.article = article;
        this.form.patchValue(article);
      },
      error: () => this.router.navigate(['/not-found']),
    });
  }

  loadLocations(): void {
    this.locationService.getLocations().subscribe({
      next: (locations) => {
        this.locations = locations;
      },
      error: (error) => console.error('Error fetching locations:', error),
    });
  }

  isOwner(): boolean {
    return this.article?._ownerId === this.currentUser?.id;
  }

  toggleEditMode(): void {
    this.showEditMode = !this.showEditMode;
  }

  cancelEdit(): void {
    this.toggleEditMode();
    this.form.reset(this.article);
  }

  saveChanges(): void {
    if (this.form.invalid) {
      return;
    }
    const { title, imageUrl, locationId, content } = this.form.value;
    this.articleService
      .updateArticle(this.articleId!, title!, imageUrl!, locationId!, content!)
      .subscribe({
        next: () => {
          this.article = { title, imageUrl, locationId, content };
          this.toggleEditMode();
        },
        error: (error) => console.error('Error updating article:', error),
      });
  }

  deleteArticle(id: string): void {
    if (confirm('Are you sure you want to delete this article?')) {
      this.articleService.deleteArticle(id).subscribe({
        next: () => {
          this.router.navigate(['/articles']);
        },
        error: () => {
          alert('There was an error deleting the article.');
        },
      });
    }
  }
}
