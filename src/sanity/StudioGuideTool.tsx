"use client";

import { HelpCircleIcon } from "@sanity/icons";
import type { Tool } from "sanity";

const card: React.CSSProperties = {
  background: "white",
  border: "1px solid #e4e4e7",
  borderRadius: 8,
  padding: "20px 24px",
  marginBottom: 16,
};

const label: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  color: "#8b8d98",
  marginBottom: 6,
};

const h1: React.CSSProperties = { fontSize: 24, fontWeight: 600, marginBottom: 4 };
const h2: React.CSSProperties = { fontSize: 16, fontWeight: 600, marginTop: 40, marginBottom: 16 };
const body: React.CSSProperties = { fontSize: 14, lineHeight: 1.65, color: "#44474d" };
const muted: React.CSSProperties = { fontSize: 13, color: "#6f7177", marginBottom: 24 };

function Step({ n, title, children }: { n: number; title: string; children: string }) {
  return (
    <div style={card}>
      <div style={label}>{`Step ${n}`}</div>
      <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>{title}</div>
      <div style={body}>{children}</div>
    </div>
  );
}

function Faq({ q, children }: { q: string; children: string }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{q}</div>
      <div style={body}>{children}</div>
    </div>
  );
}

/** Logging-in and day-to-day usage guide, pinned as its own top-level tab
 * in the Studio nav (see sanity.config.ts) so editors always have it to
 * hand without leaving the Studio. Mirrors the PDF version delivered
 * alongside it - keep the two in sync if either is updated. */
function StudioGuideTool() {
  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "48px 24px" }}>
      <div style={h1}>Logging in & using this Studio</div>
      <div style={muted}>
        A quick guide for the Clady Group content team. For anything not covered here, contact
        Discoverable.
      </div>

      <div style={h2}>Logging in</div>
      <Step n={1} title="Go to the Studio">
        {"Visit cladyfoodgroup.com/studio in your browser and bookmark it - this is the only address you need."}
      </Step>
      <Step n={2} title={'Choose "Continue with Google"'}>
        {"Do not create a separate Sanity password. Always sign in with the Google account Discoverable has added as a Studio member (your usual work Google account)."}
      </Step>
      <Step n={3} title="You're in">
        {"You'll land on the Content list with every page pinned at the top. If you see \"You don't have access to the content in this project\" after signing in, your Google account hasn't been added as a Studio member yet - contact Discoverable and we'll send an invite to that exact address."}
      </Step>

      <div style={h2}>Editing a page</div>
      <Step n={1} title="Pick the page">
        {"The pages (Home page, About page, Private Label page, White Label Coffee page, CSR page, Contact page) are pinned at the top of the Content list, above the divider. Each one is a single document - there's nothing to \"create\", just open it and edit."}
      </Step>
      <Step n={2} title="Edit the fields">
        {"Each section of the page (hero, intro, etc.) is broken into its own fields with plain English labels. Edit text directly; for an image field, click it to upload or replace the photo."}
      </Step>
      <Step n={3} title="Publish">
        {"Changes save as a draft automatically as you type, but the live site only updates once you click the green \"Publish\" button, top right. Unpublished changes are safe to leave as a draft and come back to later."}
      </Step>
      <Step n={4} title="Repeatable items (brands, facilities, accreditations, stats...)">
        {"Anything that appears as a list below the divider (Brands, Facilities, Produce categories, Accreditations, Group scale stats, CSR initiatives) can have items added, removed or reordered by you directly - open the list, use \"Create new\", and drag to reorder."}
      </Step>

      <div style={h2}>FAQ</div>
      <Faq q="Can I create a brand new page myself?">
        {"Not yet - each page on the site is still hand-built by Discoverable rather than generated from a generic template, so a genuinely new page (not just new content on an existing one) needs a short build from us first. Ask us and we'll scope it - once built, you'll be able to edit its content here yourself from day one, same as every other page."}
      </Faq>
      <Faq q="Can I turn a section off on a page?">
        {"Not directly from the Studio today. If you want a section hidden (e.g. while photography is pending, or a promotion has ended), let Discoverable know and we'll either add a show/hide toggle for that section or make the change for you - whichever's faster."}
      </Faq>
      <Faq q="I published something and the website looks wrong or hasn't updated.">
        {'The live site rebuilds within a few minutes of publishing. If it still looks wrong after that, check you clicked "Publish" and not just left a draft, then contact Discoverable with the page and what you expected to see.'}
      </Faq>
      <Faq q="Can I invite another colleague to edit the Studio?">
        {"Only Discoverable can add new Studio members at the moment (via Sanity's Members settings), so send us the Google account to add and we'll invite them the same way yours was set up."}
      </Faq>
      <Faq q="I can't find a page I know exists.">
        {"Every page is pinned above the divider in the Content list. Everything below the divider is a repeatable content type (brands, stats, facilities, etc.), not a page."}
      </Faq>
    </div>
  );
}

export const studioGuideTool: Tool = {
  name: "guide",
  title: "Guide",
  icon: HelpCircleIcon,
  component: StudioGuideTool,
};
