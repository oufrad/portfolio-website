import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  protected readonly socialLinks = [
    { name: 'Mastodon', url: 'https://phpc.social/@stefanzweifel' },
    { name: 'Bluesky', url: 'https://bsky.app/profile/stefanzweifel.dev' },
    { name: 'GitHub', url: 'https://github.com/stefanzweifel' },
    { name: 'Email', url: 'mailto:hello@stefanzweifel.dev' }
  ];

  protected readonly selectedWriting = [
    { date: '08/2024', title: 'Deployer: Build and Cache Frontend Assets once using GitHub Actions', url: '/posts/2024/08/03/deployer-build-and-cache-frontend-assets-once-using-github-actions/' },
    { date: '03/2024', title: 'Meal Planning in Things 3', url: '/posts/2024/03/09/meal-planning-in-things-3/' },
    { date: '09/2023', title: 'An Opinionated Personal Folder Structure', url: '/posts/2023/09/16/an-opinionated-personal-folder-structure/' },
    { date: '12/2022', title: 'My updated Things 3 Setup', url: '/posts/2022/12/18/my-updated-things-3-setup/' },
    { date: '05/2021', title: 'Deployer on GitHub Actions', url: '/posts/2021/05/24/deployer-on-github-actions/' },
    { date: '04/2021', title: 'Auto Merge Dependabot Pull Requests with GitHub Actions', url: '/posts/2021/04/28/auto-merge-dependabot-pull-requests/' },
    { date: '02/2021', title: 'My Alfred Setup', url: '/posts/2021/02/03/my-alfred-setup/' },
    { date: '12/2020', title: 'Getting Started with Bash Testing with Bats', url: '/posts/2020/12/22/getting-started-with-bash-testing-with-bats/' },
    { date: '08/2020', title: 'Synology NAS Setup (2020)', url: '/posts/2020/08/04/synology-nas-setup-2020/' },
    { date: '12/2019', title: 'Things 3 Setup', url: '/posts/2019/12/26/things-3-setup/' }
  ];
}
