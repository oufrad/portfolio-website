import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ContentService } from '../core/services/content.service';
import { Project, ProjectCategory } from '../core/models/project.model';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent {
  private readonly contentService = inject(ContentService);

  protected readonly projectCategories = toSignal(this.contentService.getProjects(), {
    initialValue: [] as ProjectCategory[]
  });

  protected readonly total = computed(() =>
    this.projectCategories().reduce(
      (sum: number, category: ProjectCategory) => sum + category.projects.length,
      0
    )
  );

  /** Zero-padded count for the heading, e.g. projects[03]. */
  protected readonly countLabel = computed(() => String(this.total()).padStart(2, '0'));

  protected linkFor(project: Project): string {
    return project.liveUrl ?? project.repoUrl ?? project.url;
  }
}
