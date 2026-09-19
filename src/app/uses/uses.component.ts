import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ContentService } from '../core/services/content.service';
import { UsesCategory } from '../core/models/uses.model';

@Component({
  selector: 'app-uses',
  standalone: true,
  imports: [],
  templateUrl: './uses.component.html',
  styleUrl: './uses.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsesComponent {
  private readonly contentService = inject(ContentService);

  private readonly allCategories = toSignal(this.contentService.getUses(), {
    initialValue: [] as UsesCategory[]
  });

  /** Categories with no items used to render as bare headings. */
  protected readonly categories = computed(() =>
    this.allCategories().filter((category: UsesCategory) => category.items.length > 0)
  );
}
