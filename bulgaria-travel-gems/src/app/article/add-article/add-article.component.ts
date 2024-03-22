import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { Article } from 'src/app/types/article';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css'],
})
export class AddArticleComponent implements OnInit {
  ngOnInit(): void {
    this.addArticle(); // Call addArticle() when component initializes
  }

  constructor(private articleService: ArticleService) {}

  addArticle(): void {
    // Define a custom article object
    // const newArticle: Article = {
    //   id: '2',
    //   title: 'Test Article Title',
    //   content: 'This is the content of the test article.',
    //   // ... set other article properties as needed
  }

  // addArticle(): void {
  //   // Define a custom article object
  //   const newArticle: Omit<Article, 'id'> = {
  //     title: 'Test Article Title',
  //     content: 'This is the content of the test article.',
  //     // ... set other article properties as needed
  //   };

  // Call the service method to create the article
  // this.articleService.createArticle(newArticle).subscribe({
  //   next: (article) => {
  //     console.log('Article created', article);
  //   },
  //   error: (error) => {
  //     console.error('Error creating article', error);
  //   },
  // });
}
