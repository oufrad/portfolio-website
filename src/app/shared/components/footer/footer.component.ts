import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  socialLinks = [
    { name: 'Mastodon', url: 'https://phpc.social/@stefanzweifel', rel: 'me' },
    { name: 'Bluesky', url: 'https://bsky.app/profile/stefanzweifel.dev', rel: 'me' },
    { name: 'GitHub', url: 'https://github.com/stefanzweifel', rel: 'me' },
    { name: 'Email', url: 'mailto:hello@stefanzweifel.dev', rel: '' }
  ];

  secondaryLinks = [
    { name: 'RSS', url: '/rss.xml' },
    { name: 'Micro', url: '/micro/' },
    { name: 'Now', url: '/now/' },
    { name: 'Blogroll', url: '/blogroll/' },
    { name: 'Colophon', url: '/colophon/' },
    { name: 'Changelog', url: '/changelog/' },
    { name: 'Subscribe', url: '/subscribe' }
  ];

  currentYear = new Date().getFullYear();
}
