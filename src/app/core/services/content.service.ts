import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';
import { ArticleYear } from '../models/article.model';
import { ProjectCategory } from '../models/project.model';
import { ReadingYear } from '../models/reading.model';
import { UsesCategory } from '../models/uses.model';
import { AboutData } from '../models/about.model';

@Injectable({ providedIn: 'root' })
export class ContentService {
  private readonly http = inject(HttpClient);

  private readonly articles$ = this.http.get<ArticleYear[]>('assets/data/articles.json').pipe(catchError(() => EMPTY), shareReplay(1));
  private readonly projects$ = this.http.get<ProjectCategory[]>('assets/data/projects.json').pipe(catchError(() => EMPTY), shareReplay(1));
  private readonly reading$ = this.http.get<ReadingYear[]>('assets/data/reading.json').pipe(catchError(() => EMPTY), shareReplay(1));
  private readonly uses$ = this.http.get<UsesCategory[]>('assets/data/uses.json').pipe(catchError(() => EMPTY), shareReplay(1));
  private readonly about$ = this.http.get<AboutData>('assets/data/about.json').pipe(catchError(() => EMPTY), shareReplay(1));

  getArticles() { return this.articles$; }
  getProjects() { return this.projects$; }
  getReading() { return this.reading$; }
  getUses() { return this.uses$; }
  getAbout() { return this.about$; }
}
