import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ArticleYear } from '../models/article.model';
import { ProjectCategory } from '../models/project.model';
import { ReadingYear } from '../models/reading.model';
import { UsesCategory } from '../models/uses.model';
import { AboutData } from '../models/about.model';

@Injectable({ providedIn: 'root' })
export class ContentService {
  private http = inject(HttpClient);

  getArticles(): Observable<ArticleYear[]> {
    return this.http.get<ArticleYear[]>('assets/data/articles.json');
  }

  getProjects(): Observable<ProjectCategory[]> {
    return this.http.get<ProjectCategory[]>('assets/data/projects.json');
  }

  getReading(): Observable<ReadingYear[]> {
    return this.http.get<ReadingYear[]>('assets/data/reading.json');
  }

  getUses(): Observable<UsesCategory[]> {
    return this.http.get<UsesCategory[]>('assets/data/uses.json');
  }

  getAbout(): Observable<AboutData> {
    return this.http.get<AboutData>('assets/data/about.json');
  }
}
