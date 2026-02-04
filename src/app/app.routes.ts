import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ProjectsComponent } from './projects/projects.component';
import { ReadingComponent } from './reading/reading.component';
import { UsesComponent } from './uses/uses.component';
import { ArticlesComponent } from './articles/articles.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'reading', component: ReadingComponent },
  { path: 'uses', component: UsesComponent },
  { path: 'articles', component: ArticlesComponent }
];
