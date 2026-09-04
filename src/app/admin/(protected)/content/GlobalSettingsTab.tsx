"use client";

import { useState } from "react";
import { useEditable } from "@/components/editable/context";
import { uploadImageAction } from "@/lib/actions";
import type { GlobalContent } from "@/lib/cms";

function TextField({ path, label, defaultValue }: { path: string; label: string; defaultValue: string }) {
  const ctx = useEditable()!;
  const current = (ctx.get(path) as string | undefined) ?? defaultValue;
  return (
    <div>
      <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-muted-light">{label}</label>
      <input
        key={current}
        defaultValue={current}
        onBlur={(e) => ctx.set(path, e.target.value)}
        className="w-full rounded-lg border border-navy/15 px-3 py-2 text-sm outline-none focus:border-gold"
      />
    </div>
  );
}

export default function GlobalSettingsTab({ global }: { global: GlobalContent }) {
  const ctx = useEditable()!;
  const [uploading, setUploading] = useState(false);
  const logo = (ctx.get("siteInfo.logo") as string) ?? global.siteInfo.logo;

  async function handleLogoUpload(file: File) {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const result = await uploadImageAction(formData);
      if ("url" in result) ctx.set("siteInfo.logo", result.url);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-8 sm:px-6 md:py-10">
      <div>
        <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-navy">Brand</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField path="siteInfo.name" label="Business name" defaultValue={global.siteInfo.name} />
          <div>
            <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-muted-light">Logo</label>
            <label className="flex h-16 w-32 cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-dashed border-navy/25 bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logo} alt="Logo" className="h-full w-full object-contain p-1" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleLogoUpload(file);
                }}
              />
            </label>
            {uploading && <p className="mt-1 text-xs text-muted-light">Uploading…</p>}
          </div>
        </div>
      </div>

      <div>
        <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-navy">Social & Contact Links</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField path="socialLinks.facebook" label="Facebook URL" defaultValue={global.socialLinks.facebook} />
          <TextField path="socialLinks.instagram" label="Instagram URL" defaultValue={global.socialLinks.instagram} />
          <TextField path="socialLinks.linkedin" label="LinkedIn URL" defaultValue={global.socialLinks.linkedin} />
          <TextField path="socialLinks.call" label="Call link (tel:...)" defaultValue={global.socialLinks.call} />
        </div>
      </div>

      <div>
        <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-navy">Navigation Menu</h2>
        <p className="mt-1 text-xs text-muted-light">Both the label and where it links to can be changed.</p>
        <div className="mt-4 space-y-3">
          {global.navLinks.map((link, i) => (
            <div key={i} className="grid grid-cols-2 gap-3">
              <TextField path={`navLinks.${i}.label`} label={`Link ${i + 1} label`} defaultValue={link.label} />
              <TextField path={`navLinks.${i}.href`} label={`Link ${i + 1} destination`} defaultValue={link.href} />
            </div>
          ))}
        </div>
        <div className="mt-4">
          <TextField path="headerFooter.navCtaLabel" label="Call button text" defaultValue={global.headerFooter.navCtaLabel} />
        </div>
      </div>

      <div>
        <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-navy">Footer Quick Links</h2>
        <p className="mt-1 text-xs text-muted-light">
          Shown at the bottom of every page — the exact set differs slightly between the Home page, the service pages, and the Blog page.
        </p>
        {(
          [
            { key: "footerLinksHome", label: "Home page footer", links: global.footerLinksHome },
            { key: "footerLinksStandard", label: "Wedding / Corporate / Venues / Social footer", links: global.footerLinksStandard },
            { key: "footerLinksBlog", label: "Blog page footer", links: global.footerLinksBlog },
          ] as const
        ).map((group) => (
          <div key={group.key} className="mt-5">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-muted-light">{group.label}</p>
            <div className="space-y-3">
              {group.links.map((link, i) => (
                <div key={i} className="grid grid-cols-2 gap-3">
                  <TextField path={`${group.key}.${i}.label`} label={`Link ${i + 1} label`} defaultValue={link.label} />
                  <TextField path={`${group.key}.${i}.href`} label={`Link ${i + 1} destination`} defaultValue={link.href} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div>
        <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-navy">Footer</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField path="copyright" label="Copyright line" defaultValue={global.copyright} />
          <TextField
            path="headerFooter.footerQuickLinksHeading"
            label={'"Quick Links" heading'}
            defaultValue={global.headerFooter.footerQuickLinksHeading}
          />
          <TextField
            path="headerFooter.footerContactHeading"
            label={'"Contact" heading'}
            defaultValue={global.headerFooter.footerContactHeading}
          />
          <TextField
            path="headerFooter.footerFollowHeading"
            label={'"Follow Us" heading'}
            defaultValue={global.headerFooter.footerFollowHeading}
          />
        </div>
        <p className="mb-1 mt-5 text-[11px] font-semibold uppercase tracking-wide text-muted-light">Social link labels</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <TextField
            path="headerFooter.socialLabels.facebook"
            label="Facebook"
            defaultValue={global.headerFooter.socialLabels.facebook}
          />
          <TextField
            path="headerFooter.socialLabels.instagram"
            label="Instagram"
            defaultValue={global.headerFooter.socialLabels.instagram}
          />
          <TextField
            path="headerFooter.socialLabels.linkedin"
            label="LinkedIn"
            defaultValue={global.headerFooter.socialLabels.linkedin}
          />
          <TextField path="headerFooter.socialLabels.call" label="Call" defaultValue={global.headerFooter.socialLabels.call} />
        </div>
      </div>
    </div>
  );
}
