import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ContentService } from '../core/services/content.service';
import { Experience } from '../core/models/experience.model';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent {
  private readonly contentService = inject(ContentService);
  protected readonly aboutData = toSignal(this.contentService.getAbout());
  protected readonly experience = toSignal(this.contentService.getExperience(), {
    initialValue: [] as Experience[]
  });

  /** "2023-06" -> "Jun 2023". Returns the raw value if it isn't a known shape. */
  protected formatMonth(value: string | undefined): string {
    if (!value) return '';
    const match = /^(\d{4})-(\d{2})$/.exec(value);
    if (!match) return value;
    const date = new Date(Number(match[1]), Number(match[2]) - 1, 1);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  }

  protected dateRange(item: Experience): string {
    if (!item.start) return '';
    return `${this.formatMonth(item.start)} — ${item.end ? this.formatMonth(item.end) : 'Present'}`;
  }
}
