import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getContent } from "@/lib/cms";
import type {
  BlogContent,
  CorporateContent,
  GlobalContent,
  HomeContent,
  SocialContent,
  VenuesContent,
  WeddingContent,
} from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [global, home, wedding, corporateEvent, weddingVenues, socialEvents, blog] = await Promise.all([
    getContent<GlobalContent>("global"),
    getContent<HomeContent>("home"),
    getContent<WeddingContent>("wedding"),
    getContent<CorporateContent>("corporate-event"),
    getContent<VenuesContent>("wedding-venues"),
    getContent<SocialContent>("social-events"),
    getContent<BlogContent>("blog"),
  ]);

  const footerByPath: Record<string, { text: string; links: { label: string; href: string }[] }> = {
    "/": { text: home.footerContent.brandText, links: global.footerLinksHome },
    "/wedding": { text: wedding.footerText, links: global.footerLinksStandard },
    "/corporate-event": { text: corporateEvent.footerText, links: global.footerLinksStandard },
    "/wedding-venues": { text: weddingVenues.footerText, links: global.footerLinksStandard },
    "/social-events": { text: socialEvents.footerText, links: global.footerLinksStandard },
    "/blog": { text: blog.footerText, links: global.footerLinksBlog },
  };

  return (
    <>
      <Navbar
        siteInfo={global.siteInfo}
        navLinks={global.navLinks}
        socialLinks={global.socialLinks}
        navCtaLabel={global.headerFooter.navCtaLabel}
      />
      <main className="flex-1">{children}</main>
      <Footer
        siteInfo={global.siteInfo}
        socialLinks={global.socialLinks}
        copyright={global.copyright}
        contact={home.homeContact}
        footerByPath={footerByPath}
        headerFooter={global.headerFooter}
      />
    </>
  );
}
