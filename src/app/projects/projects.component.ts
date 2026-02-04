import { Component, inject, OnInit } from '@angular/core';
import { ContentService } from '../core/services/content.service';
import { ProjectCategory } from '../core/models/project.model';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [],
  templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit {
  private contentService = inject(ContentService);
  projectCategories: ProjectCategory[] = [];

  ngOnInit() {
    this.contentService.getProjects().subscribe(data => {
      this.projectCategories = data;
    });
  }
}
