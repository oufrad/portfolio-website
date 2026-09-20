import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ContentService } from '../core/services/content.service';
import { ReadingYear } from '../core/models/reading.model';

/** Arabic, Arabic Supplement, Extended-A and the presentation forms. */
const ARABIC = /[؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿]/;

@Component({
  selector: 'app-reading',
  imports: [],
  templateUrl: './reading.component.html',
  styleUrl: './reading.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReadingComponent {
  private readonly contentService = inject(ContentService);

  protected readonly readingYears = toSignal(this.contentService.getReading(), {
    initialValue: [] as ReadingYear[]
  });

  protected readonly total = computed(() =>
    this.readingYears().reduce((sum: number, year: ReadingYear) => sum + year.books.length, 0)
  );

  protected readonly countLabel = computed(() => String(this.total()).padStart(2, '0'));

  /** Drives lang/dir so Arabic titles render right-to-left in Plex Sans Arabic. */
  protected isArabic(text: string): boolean {
    return ARABIC.test(text);
  }

  protected stars(rating: number): string {
    return '★'.repeat(rating) + '☆'.repeat(Math.max(0, 5 - rating));
  }
}
