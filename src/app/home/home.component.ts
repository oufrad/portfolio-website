import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ContentService } from '../core/services/content.service';
import { AsciiFieldComponent } from '../shared/components/ascii-field/ascii-field.component';

@Component({
  selector: 'app-home',
  imports: [AsciiFieldComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  private readonly contentService = inject(ContentService);
  protected readonly homeData = toSignal(this.contentService.getHome());
}
