import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';
import { ArticleYear } from '../models/article.model';
import { ProjectCategory } from '../models/project.model';
import { ReadingYear } from '../models/reading.model';
import { UsesCategory } from '../models/uses.model';
import { AboutData } from '../models/about.model';
import { HomeData } from '../models/home.model';
import { SiteData } from '../models/site.model';
import { Experience } from '../models/experience.model';

@Injectable({ providedIn: 'root' })
export class ContentService {
  private readonly http = inject(HttpClient);

  /**
   * Falls back to a supplied empty value rather than `EMPTY`. `EMPTY` never
   * emits, so a missing or malformed JSON file used to leave `toSignal` at
   * `undefined` forever and the page hung blank with no way to tell why.
   */
  private load<T>(file: string, fallback: T): Observable<T> {
    return this.http.get<T>(`assets/data/${file}`).pipe(
      catchError((error: unknown) => {
        console.error(`[ContentService] failed to load ${file}`, error);
        return of(fallback);
      }),
      shareReplay(1)
    );
  }

  private readonly articles$ = this.load<ArticleYear[]>('articles.json', []);
  private readonly projects$ = this.load<ProjectCategory[]>('projects.json', []);
  private readonly reading$ = this.load<ReadingYear[]>('reading.json', []);
  private readonly uses$ = this.load<UsesCategory[]>('uses.json', []);
  private readonly experience$ = this.load<Experience[]>('experience.json', []);
  private readonly about$ = this.load<AboutData | null>('about.json', null);
  private readonly home$ = this.load<HomeData | null>('home.json', null);
  private readonly site$ = this.load<SiteData | null>('site.json', null);

  getArticles() {
    return this.articles$;
  }
  getProjects() {
    return this.projects$;
  }
  getReading() {
    return this.reading$;
  }
  getUses() {
    return this.uses$;
  }
  getExperience() {
    return this.experience$;
  }
  getAbout() {
    return this.about$;
  }
  getHome() {
    return this.home$;
  }
  getSite() {
    return this.site$;
  }
}
