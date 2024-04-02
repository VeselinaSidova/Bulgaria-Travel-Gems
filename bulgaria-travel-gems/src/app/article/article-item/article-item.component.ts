import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Article } from 'src/app/types/article';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.css'],
})
export class ArticleItemComponent {
  @Input() article!: Article;
  @Input() currentUser?: Omit<User, 'password'> | null = null;
  @Output() likeToggled = new EventEmitter<string>();

  onToggleLike(): void {
    this.likeToggled.emit(this.article._id);
  }

  isLiked(): boolean {
    return (
      this.currentUser?.likedArticles?.includes(this.article._id!) ?? false
    );
  }
}
