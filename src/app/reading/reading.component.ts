import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ContentService } from '../core/services/content.service';

@Component({
  selector: 'app-reading',
  standalone: true,
  imports: [],
  templateUrl: './reading.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReadingComponent {
  private readonly contentService = inject(ContentService);
  protected readonly readingYears = toSignal(this.contentService.getReading(), { initialValue: [] });
}
