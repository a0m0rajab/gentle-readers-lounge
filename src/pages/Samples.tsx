import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Calendar, Copy, Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BookQuote, ReadingNote, Spoiler, ThemeTag } from "@/components/mdx/MDXComponents";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const copyToClipboard = (text: string) => navigator.clipboard.writeText(text);

const CodeBlock = ({ title, code }: { title: string; code: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    copyToClipboard(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="my-6 rounded-xl border border-border overflow-hidden">
      <div className="flex items-center justify-between bg-muted px-4 py-2 border-b border-border">
        <span className="font-mono text-sm text-muted-foreground">{title}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto bg-card text-sm font-mono text-muted-foreground leading-relaxed whitespace-pre">
        {code}
      </pre>
    </div>
  );
};

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h3 className="font-serif text-2xl text-foreground mt-10 mb-4 border-b border-border pb-2">
    {children}
  </h3>
);

const bookFrontmatterSample = `---
title: "Book Title"
author: "Author Name"
genre: "Literary Fiction"
month: "Mar 2025"
pageCount: 320
readerCount: 28
isCurrent: true
color: "from-blue-700 to-blue-900"
meetingDate: "March 15, 2025"
description: "A one-paragraph summary of the book that appears in cards and previews."
discussionQuestions:
  - "First discussion question for the group?"
  - "Second discussion question?"
  - "Third question about themes?"
  - "Fourth question about characters?"
totalAttendees: 28
averageRating: 4.5
totalDiscussions: 3
readingTime: "3 weeks"
completionRate: 88
topContributor: "Member Name"
firstTimers: 5
regulars: 15
veterans: 8
themes:
  - "Theme One"
  - "Theme Two"
  - "Theme Three"
  - "Identity"
  - "Community"
highlight: "A memorable moment from the discussion or reading experience."
---`;

const bookBodySample = `import { BookQuote, ReadingNote, Spoiler, ThemeTag } from "@/components/mdx/MDXComponents";

## About This Selection

Introductory paragraph about the book and why it was selected.
Use *italics* for book titles and **bold** for emphasis.

<BookQuote author="Author Name">
A memorable quote from the book goes here.
</BookQuote>

## Key Themes

<ThemeTag>Theme One</ThemeTag>
<ThemeTag>Theme Two</ThemeTag>
<ThemeTag>Identity</ThemeTag>
<ThemeTag>Community</ThemeTag>

## Why We Chose This Book

Explain the reasoning behind selecting this book for the club.

<ReadingNote title="Historical Context">
Background information, reading tips, or supplementary
material that enriches the reading experience.
</ReadingNote>

## Discussion Highlights

1. **First Topic** - Summary of discussion point
2. **Second Topic** - Another key insight
3. **Third Topic** - A surprising perspective

## Member Reviews

> "A member quote about their experience." — Member A.

> "Another review from a different member." — Member B.

## Reading Companion

### Key Characters

- **Character One** - Brief description
- **Character Two** - Brief description
- **Character Three** - Brief description

### Contextual Notes

Additional information to enrich the reading.

<Spoiler>
Content with major plot reveals goes inside the Spoiler
component. Readers must click to expand it.
</Spoiler>

## Recommended Pairings

- **Similar Book One** by Author
- **Similar Book Two** by Author
- **Related Non-Fiction** by Author

---

*Discussion completed March 15, 2025. Thank you to all 28 participants!*`;

const eventFrontmatterSample = `---
bookSlug: "book-slug"
date: "March 15, 2025"
location: "Venue Name, City"
description: "A short description of the event and its atmosphere."
attendeeCount: 28
attendees:
  - name: "Member Name"
    initials: "MN"
  - name: "Another Member"
    initials: "AM"
  - name: "Third Person"
    initials: "TP"
photos:
  - url: "https://images.unsplash.com/photo-xxx?w=600&h=400&fit=crop"
    caption: "Photo description"
    featured: true
  - url: "https://images.unsplash.com/photo-yyy?w=600&h=400&fit=crop"
    caption: "Another moment"
highlights:
  - "First highlight from the event"
  - "Second memorable moment"
  - "Third discussion point"
---`;

const fieldReference = [
  { field: "title", type: "string", required: true, desc: "Book title displayed everywhere" },
  { field: "author", type: "string", required: true, desc: "Author's full name" },
  { field: "genre", type: "string", required: true, desc: 'Genre label, e.g. "Literary Fiction"' },
  { field: "month", type: "string", required: true, desc: 'Display month, e.g. "Mar 2025"' },
  { field: "pageCount", type: "number", required: true, desc: "Total page count" },
  { field: "readerCount", type: "number", required: true, desc: "Number of readers" },
  { field: "isCurrent", type: "boolean", required: true, desc: "true if this is the current selection" },
  { field: "color", type: "string", required: true, desc: 'Tailwind gradient classes, e.g. "from-blue-700 to-blue-900"' },
  { field: "meetingDate", type: "string", required: true, desc: "Formatted meeting date" },
  { field: "description", type: "string", required: true, desc: "Summary for cards & previews" },
  { field: "discussionQuestions", type: "string[]", required: true, desc: "Array of discussion prompts" },
  { field: "totalAttendees", type: "number", required: true, desc: "Total attendee count" },
  { field: "averageRating", type: "number", required: true, desc: "Average rating out of 5" },
  { field: "themes", type: "string[]", required: true, desc: "Array of theme labels" },
  { field: "highlight", type: "string", required: true, desc: "A standout moment from the discussion" },
  { field: "readingTime", type: "string", required: false, desc: 'Suggested reading time, e.g. "3 weeks"' },
  { field: "completionRate", type: "number", required: false, desc: "Percentage of readers who finished" },
  { field: "topContributor", type: "string", required: false, desc: "Most active discussion member" },
  { field: "firstTimers", type: "number", required: false, desc: "New member count" },
  { field: "regulars", type: "number", required: false, desc: "Regular member count" },
  { field: "veterans", type: "number", required: false, desc: "Veteran member count" },
];

const eventFieldReference = [
  { field: "bookSlug", type: "string", required: true, desc: "Slug matching the book MDX filename (without .mdx)" },
  { field: "date", type: "string", required: true, desc: "Event date in readable format" },
  { field: "location", type: "string", required: true, desc: "Venue name and/or city" },
  { field: "description", type: "string", required: true, desc: "Short event summary" },
  { field: "attendeeCount", type: "number", required: true, desc: "Total number of attendees" },
  { field: "attendees", type: "array", required: true, desc: "List of { name, initials } objects" },
  { field: "photos", type: "array", required: true, desc: "List of { url, caption, featured? } objects" },
  { field: "highlights", type: "string[]", required: true, desc: "Array of event highlights" },
];

const Samples = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <span className="text-accent font-body text-sm tracking-widest uppercase">
            Documentation
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mt-4 mb-4">
            Content Samples
          </h1>
          <p className="font-body text-lg text-muted-foreground mb-10 leading-relaxed">
            Reference templates for creating book and event MDX content files.
            Copy any section and adapt it for your new content.
          </p>

          <Tabs defaultValue="book" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="book" className="gap-2">
                <BookOpen className="w-4 h-4" /> Book Samples
              </TabsTrigger>
              <TabsTrigger value="event" className="gap-2">
                <Calendar className="w-4 h-4" /> Event Samples
              </TabsTrigger>
            </TabsList>

            {/* ── Book Tab ── */}
            <TabsContent value="book">
              <SectionHeading>File Location</SectionHeading>
              <p className="font-body text-muted-foreground mb-2">
                Create a new file at <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">src/content/books/your-book-slug.mdx</code>. The filename becomes the URL slug (e.g. <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">/book/your-book-slug</code>).
              </p>

              <SectionHeading>Frontmatter (YAML Metadata)</SectionHeading>
              <p className="font-body text-muted-foreground mb-2">
                This block goes at the very top of the MDX file between <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">---</code> delimiters.
              </p>
              <CodeBlock title="Book Frontmatter" code={bookFrontmatterSample} />

              <SectionHeading>Field Reference</SectionHeading>
              <div className="overflow-x-auto mb-8 rounded-xl border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted">
                      <th className="px-4 py-2.5 text-left font-serif font-medium text-foreground">Field</th>
                      <th className="px-4 py-2.5 text-left font-serif font-medium text-foreground">Type</th>
                      <th className="px-4 py-2.5 text-center font-serif font-medium text-foreground">Required</th>
                      <th className="px-4 py-2.5 text-left font-serif font-medium text-foreground">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fieldReference.map((f) => (
                      <tr key={f.field} className="border-t border-border">
                        <td className="px-4 py-2 font-mono text-accent">{f.field}</td>
                        <td className="px-4 py-2 font-mono text-muted-foreground">{f.type}</td>
                        <td className="px-4 py-2 text-center">{f.required ? "✓" : "—"}</td>
                        <td className="px-4 py-2 font-body text-muted-foreground">{f.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <SectionHeading>Body Content (MDX)</SectionHeading>
              <p className="font-body text-muted-foreground mb-2">
                Everything below the frontmatter. Uses Markdown plus custom components.
              </p>
              <CodeBlock title="Book Body Content" code={bookBodySample} />

              <SectionHeading>Custom Components</SectionHeading>
              <div className="space-y-6">
                <div className="p-5 rounded-xl border border-border bg-card">
                  <h4 className="font-serif text-lg text-foreground mb-2">{`<BookQuote>`}</h4>
                  <p className="font-body text-sm text-muted-foreground mb-3">
                    A styled blockquote for memorable passages. Accepts an optional <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">author</code> prop.
                  </p>
                  <CodeBlock title="Usage" code={`<BookQuote author="Author Name">\nA memorable line from the book.\n</BookQuote>`} />
                  <div className="mt-4 pt-4 border-t border-border">
                    <span className="text-xs font-mono text-muted-foreground mb-2 block">Preview</span>
                    <BookQuote author="Gabriel García Márquez">Many years later, as he faced the firing squad, Colonel Aureliano Buendía was to remember that distant afternoon when his father took him to discover ice.</BookQuote>
                  </div>
                </div>

                <div className="p-5 rounded-xl border border-border bg-card">
                  <h4 className="font-serif text-lg text-foreground mb-2">{`<ReadingNote>`}</h4>
                  <p className="font-body text-sm text-muted-foreground mb-3">
                    A callout box for tips, context, or supplementary material. Accepts an optional <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">title</code> prop.
                  </p>
                  <CodeBlock title="Usage" code={`<ReadingNote title="Historical Context">\nBackground information that enriches the reading.\n</ReadingNote>`} />
                  <div className="mt-4 pt-4 border-t border-border">
                    <span className="text-xs font-mono text-muted-foreground mb-2 block">Preview</span>
                    <ReadingNote title="Historical Context">This novel is set during the Colombian civil wars of the early 20th century. Understanding the political landscape enriches the reading experience considerably.</ReadingNote>
                  </div>
                </div>

                <div className="p-5 rounded-xl border border-border bg-card">
                  <h4 className="font-serif text-lg text-foreground mb-2">{`<Spoiler>`}</h4>
                  <p className="font-body text-sm text-muted-foreground mb-3">
                    A collapsible section for plot reveals. Content is hidden until clicked.
                  </p>
                  <CodeBlock title="Usage" code={`<Spoiler>\nMajor plot point or ending discussion.\n</Spoiler>`} />
                  <div className="mt-4 pt-4 border-t border-border">
                    <span className="text-xs font-mono text-muted-foreground mb-2 block">Preview</span>
                    <Spoiler>The manuscript that Aureliano deciphers at the end reveals that the entire history of the Buendía family was predestined, and Macondo is destroyed by a hurricane as he finishes reading.</Spoiler>
                  </div>
                </div>

                <div className="p-5 rounded-xl border border-border bg-card">
                  <h4 className="font-serif text-lg text-foreground mb-2">{`<ThemeTag>`}</h4>
                  <p className="font-body text-sm text-muted-foreground mb-3">
                    Inline pill-style label for tagging themes.
                  </p>
                  <CodeBlock title="Usage" code={`<ThemeTag>Identity</ThemeTag>\n<ThemeTag>Community</ThemeTag>`} />
                  <div className="mt-4 pt-4 border-t border-border">
                    <span className="text-xs font-mono text-muted-foreground mb-2 block">Preview</span>
                    <div><ThemeTag>Identity</ThemeTag><ThemeTag>Community</ThemeTag><ThemeTag>Solitude</ThemeTag><ThemeTag>Memory</ThemeTag></div>
                  </div>
                </div>
              </div>

              <SectionHeading>Markdown Features</SectionHeading>
              <p className="font-body text-muted-foreground mb-2">
                Standard Markdown is fully supported in the body content:
              </p>
              <CodeBlock
                title="Markdown Examples"
                code={`## Headings (h2, h3, h4)

**Bold text** and *italic text*

- Unordered list item
- Another item

1. Ordered list item
2. Second item

> Blockquote for member reviews — Author Name

[Link text](https://example.com)

---  ← Horizontal rule / section divider

| Column 1 | Column 2 |
|-----------|----------|
| Cell      | Cell     |`}
              />
            </TabsContent>

            {/* ── Event Tab ── */}
            <TabsContent value="event">
              <SectionHeading>File Location</SectionHeading>
              <p className="font-body text-muted-foreground mb-2">
                Create a new file at <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">src/content/events/your-event-slug.mdx</code>. The filename becomes the event URL slug.
              </p>

              <SectionHeading>Frontmatter (YAML Metadata)</SectionHeading>
              <p className="font-body text-muted-foreground mb-2">
                Event files are <strong>frontmatter-only</strong> — no body content is needed. All data is rendered automatically.
              </p>
              <CodeBlock title="Event Frontmatter" code={eventFrontmatterSample} />

              <SectionHeading>Field Reference</SectionHeading>
              <div className="overflow-x-auto mb-8 rounded-xl border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted">
                      <th className="px-4 py-2.5 text-left font-serif font-medium text-foreground">Field</th>
                      <th className="px-4 py-2.5 text-left font-serif font-medium text-foreground">Type</th>
                      <th className="px-4 py-2.5 text-center font-serif font-medium text-foreground">Required</th>
                      <th className="px-4 py-2.5 text-left font-serif font-medium text-foreground">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {eventFieldReference.map((f) => (
                      <tr key={f.field} className="border-t border-border">
                        <td className="px-4 py-2 font-mono text-accent">{f.field}</td>
                        <td className="px-4 py-2 font-mono text-muted-foreground">{f.type}</td>
                        <td className="px-4 py-2 text-center">{f.required ? "✓" : "—"}</td>
                        <td className="px-4 py-2 font-body text-muted-foreground">{f.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <SectionHeading>Key Notes</SectionHeading>
              <div className="space-y-4 font-body text-muted-foreground">
                <div className="p-5 rounded-xl border border-border bg-card">
                  <h4 className="font-serif text-lg text-foreground mb-2">bookSlug Linking</h4>
                  <p className="text-sm">
                    The <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">bookSlug</code> must match the filename of a book in <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">src/content/books/</code> (without the .mdx extension). This links the event to the correct book.
                  </p>
                </div>
                <div className="p-5 rounded-xl border border-border bg-card">
                  <h4 className="font-serif text-lg text-foreground mb-2">Photos</h4>
                  <p className="text-sm">
                    Set <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">featured: true</code> on one photo to make it the hero image. Use Unsplash URLs with <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">w=600&h=400&fit=crop</code> parameters for consistent sizing.
                  </p>
                </div>
                <div className="p-5 rounded-xl border border-border bg-card">
                  <h4 className="font-serif text-lg text-foreground mb-2">Attendees</h4>
                  <p className="text-sm">
                    Each attendee needs a <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">name</code> and <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">initials</code> (2 letters). The initials appear in avatar circles on the event page.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Samples;
