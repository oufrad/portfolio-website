import { Component, inject, OnInit } from '@angular/core';
import { ContentService } from '../core/services/content.service';
import { UsesCategory } from '../core/models/uses.model';

@Component({
  selector: 'app-uses',
  standalone: true,
  imports: [],
  templateUrl: './uses.component.html'
})
export class UsesComponent implements OnInit {
  private contentService = inject(ContentService);
  usesCategories: UsesCategory[] = [];

  ngOnInit() {
    this.contentService.getUses().subscribe(data => {
      this.usesCategories = data;
    });
  }
}
