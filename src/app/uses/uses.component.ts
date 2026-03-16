import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ContentService } from '../core/services/content.service';

@Component({
  selector: 'app-uses',
  standalone: true,
  imports: [],
  templateUrl: './uses.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsesComponent {
  private readonly contentService = inject(ContentService);
  protected readonly usesCategories = toSignal(this.contentService.getUses(), { initialValue: [] });
}
