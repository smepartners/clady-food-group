"use client";

import { Icon } from "@sanity/icons";
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
const note: React.CSSProperties = {
  fontSize: 13,
  lineHeight: 1.6,
  color: "#55604f",
  background: "#f6f5ec",
  border: "1px solid #e4e1cc",
  borderRadius: 8,
  padding: "14px 16px",
  marginTop: 16,
};

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

function SectionType({ title, children }: { title: string; children: string }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{title}</div>
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
        {"Home page, About page, Private Label page, White Label Coffee page, CSR page and Contact page are pinned at the top of the Content list, above the divider. Each one is a single document - there's nothing to \"create\", just open it and edit."}
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

      <div style={h2}>Hiding a section</div>
      <div style={muted}>
        {"Every section on a page (other than the hero at the very top) has its own \"Hide this section\" switch. Use it to take a section off the live site temporarily - while photography is pending, a promotion has ended, or you just want it out of the way - without deleting any of the content you've written."}
      </div>
      <Step n={1} title="Open the section">
        {"Inside the page document, scroll to the section you want to hide (its field group has the section's name as a heading, e.g. \"How it works steps\")."}
      </Step>
      <Step n={2} title={'Switch on "Hide this section"'}>
        {"It sits at the top of that section's fields. Switching it on does not clear or delete anything below it - your text, images and settings all stay exactly as they were."}
      </Step>
      <Step n={3} title="Publish">
        {"As with any other change, the section only disappears from the live site once you click Publish."}
      </Step>
      <div style={note}>
        <strong>Where this works today:</strong>{" "}
        {"every content section (not the hero) on Home, About, Private Label, CSR and White Label Coffee, plus every section on any page you build yourself (see below). If you want the same toggle added to a section that doesn't have one yet, ask Discoverable."}
      </div>

      <div style={h2}>Building a new page</div>
      <div style={muted}>
        {'"Page (build your own)" is a new document type in the Content list (below the divider) that lets you create and publish a brand new page on the site yourself, without waiting on a developer. You give it a title and web address, then assemble it from a fixed library of section templates - the same visual building blocks used across the rest of the site, so it will still look like a Clady Group page.'}
      </div>
      <Step n={1} title="Create the page">
        {'In the Content list, open "Page (build your own)" and click "Create new". Give it a Page title and a URL (this fills in automatically from the title, but you can edit it - it\'s what appears after cladyfoodgroup.com/, e.g. cladyfoodgroup.com/your-page).'}
      </Step>
      <Step n={2} title="Set the hero">
        {"Every page opens with the same full-bleed photo hero as the rest of the site: a heading, optional subtext, a background photo and an optional button."}
      </Step>
      <Step n={3} title="Add sections">
        {'Under "Page sections", click "Add item" and choose a section type each time. Drag sections to reorder them, and use each section\'s own "Hide this section" switch to take one off the page without removing it.'}
      </Step>
      <Step n={4} title="Publish">
        {"Same as any other page - nothing goes live until you click Publish."}
      </Step>

      <div style={{ ...label, marginTop: 24 }}>{"The six section types available"}</div>
      <SectionType title="Text + photo">
        {"A heading, body paragraphs and a photo, side by side - the workhorse layout used across most pages."}
      </SectionType>
      <SectionType title="Icon grid">
        {"A heading plus a row of small icon cards - good for listing sectors, services or features."}
      </SectionType>
      <SectionType title="Stats row">
        {"A simple row of big numbers with labels underneath."}
      </SectionType>
      <SectionType title="Cards">
        {"Two or more boxed cards, each with its own title and body text."}
      </SectionType>
      <SectionType title="Pill list">
        {"A row of rounded \"pill\" tags (e.g. product formats or options) plus an optional note underneath."}
      </SectionType>
      <SectionType title="Textured CTA band">
        {"A full-width call-to-action band with a button - plain green, or the darker green with the gold texture used for \"How it works\" and \"Our impact\" elsewhere on the site."}
      </SectionType>
      <div style={note}>
        <strong>A few things to know:</strong>{" "}
        {"a handful of web addresses are reserved (about, contact, brands, private-label, csr) since those already belong to existing pages - the Studio will tell you if you pick one of these. New pages you build this way also won't automatically appear in the site's main navigation menu; let Discoverable know if you'd like a link added there, or link to it from another page yourself. If you need a section type that isn't in the list of six above, ask Discoverable - it's a quick addition to the library, not a one-off build."}
      </div>

      <div style={h2}>FAQ</div>
      <Faq q="Can I create a brand new page myself?">
        {'Yes - see "Building a new page" above. Use "Page (build your own)" for anything the six section templates can cover. If you need something more bespoke - a layout or interaction the templates can\'t do - that still needs a short build from Discoverable, same as the six original pages.'}
      </Faq>
      <Faq q="Can I turn a section off on a page?">
        {'Yes - every section (other than a page\'s hero) now has its own "Hide this section" switch. See "Hiding a section" above for how.'}
      </Faq>
      <Faq q="I published something and the website looks wrong or hasn't updated.">
        {'The live site rebuilds within a few minutes of publishing. If it still looks wrong after that, check you clicked "Publish" and not just left a draft, then contact Discoverable with the page and what you expected to see.'}
      </Faq>
      <Faq q="Can I invite another colleague to edit the Studio?">
        {"Only Discoverable can add new Studio members at the moment (via Sanity's Members settings), so send us the Google account to add and we'll invite them the same way yours was set up."}
      </Faq>
      <Faq q="I can't find a page I know exists.">
        {'Pages built the original way are pinned above the divider in the Content list. A page you built yourself lives as a document under "Page (build your own)", below the divider.'}
      </Faq>
      <Faq q="Will a page I build myself show up in the site's menu?">
        {"Not automatically - the main navigation menu is still fixed in the site's code. Let Discoverable know if you'd like it added, or link to the page from elsewhere on the site (e.g. another page's body text) in the meantime."}
      </Faq>
    </div>
  );
}

export const studioGuideTool: Tool = {
  name: "guide",
  title: "Guide",
  icon: () => <Icon symbol="help-circle" />,
  component: StudioGuideTool,
};
