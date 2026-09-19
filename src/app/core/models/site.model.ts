export interface SiteData {
  siteName: string;
  navLinks: { path: string; label: string }[];
  footerSocialLinks: { name: string; url: string; rel?: string }[];
}
