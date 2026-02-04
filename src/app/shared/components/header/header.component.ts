import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  navLinks = [
    { path: '/about', label: 'About' },
    { path: '/articles', label: 'Articles' },
    { path: '/projects', label: 'Projects' },
    { path: '/uses', label: 'Uses' },
    { path: '/reading', label: 'Reading' }
  ];
}
