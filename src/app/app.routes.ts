import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ProjectsComponent } from './projects/projects.component';
import { ReadingComponent } from './reading/reading.component';
import { UsesComponent } from './uses/uses.component';
import { ArticlesComponent } from './articles/articles.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: '',
    data: {
      description:
        'Mohamed Oufrad is a software and data engineer in Rabat, Morocco, building scalable systems and data pipelines.'
    }
  },
  {
    path: 'about',
    component: AboutComponent,
    title: 'About',
    data: {
      description:
        'Background and work history of Mohamed Oufrad, software and data engineer based in Rabat, Morocco.'
    }
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    title: 'Projects',
    data: {
      description:
        'Software and data engineering projects built by Mohamed Oufrad, with the tools and technologies behind each.'
    }
  },
  {
    path: 'articles',
    component: ArticlesComponent,
    title: 'Articles',
    data: {
      description: 'Writing by Mohamed Oufrad on software engineering and working with data.'
    }
  },
  {
    path: 'uses',
    component: UsesComponent,
    title: 'Uses',
    data: {
      description: 'The hardware, software and services Mohamed Oufrad uses day to day.'
    }
  },
  {
    path: 'reading',
    component: ReadingComponent,
    title: 'Reading',
    data: {
      description: 'Books Mohamed Oufrad has read, tracked by year.'
    }
  },
  { path: '**', redirectTo: '' }
];
