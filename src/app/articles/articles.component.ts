import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ContentService } from '../core/services/content.service';
import { ArticleYear } from '../core/models/article.model';

@Component({
  selector: 'app-articles',
  imports: [],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticlesComponent {
  private readonly contentService = inject(ContentService);

  protected readonly articleYears = toSignal(this.contentService.getArticles(), {
    initialValue: [] as ArticleYear[]
  });

  protected readonly total = computed(() =>
    this.articleYears().reduce((sum: number, year: ArticleYear) => sum + year.articles.length, 0)
  );
}
