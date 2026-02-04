import { Component, inject, OnInit } from '@angular/core';
import { ContentService } from '../core/services/content.service';
import { AboutData } from '../core/models/about.model';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit {
  private contentService = inject(ContentService);
  aboutData: AboutData | null = null;

  ngOnInit() {
    this.contentService.getAbout().subscribe(data => {
      this.aboutData = data;
    });
  }
}
