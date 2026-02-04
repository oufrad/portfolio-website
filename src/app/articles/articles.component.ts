import { Component, inject, OnInit } from '@angular/core';
import { ContentService } from '../core/services/content.service';
import { ArticleYear } from '../core/models/article.model';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [],
  templateUrl: './articles.component.html'
})
export class ArticlesComponent implements OnInit {
  private contentService = inject(ContentService);
  articleYears: ArticleYear[] = [];

  ngOnInit() {
    this.contentService.getArticles().subscribe(data => {
      this.articleYears = data;
    });
  }
}
