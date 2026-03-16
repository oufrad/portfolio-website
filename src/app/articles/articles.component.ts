import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ContentService } from '../core/services/content.service';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [],
  templateUrl: './articles.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticlesComponent {
  private readonly contentService = inject(ContentService);
  protected readonly articleYears = toSignal(this.contentService.getArticles(), { initialValue: [] });
}
