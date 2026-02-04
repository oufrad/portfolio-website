import { Component, inject, OnInit } from '@angular/core';
import { ContentService } from '../core/services/content.service';
import { ReadingYear } from '../core/models/reading.model';

@Component({
  selector: 'app-reading',
  standalone: true,
  imports: [],
  templateUrl: './reading.component.html'
})
export class ReadingComponent implements OnInit {
  private contentService = inject(ContentService);
  readingYears: ReadingYear[] = [];

  ngOnInit() {
    this.contentService.getReading().subscribe(data => {
      this.readingYears = data;
    });
  }
}
