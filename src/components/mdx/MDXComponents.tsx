import type { ComponentPropsWithoutRef } from "react";

// Custom components for MDX rendering with literary styling
export const mdxComponents = {
  h1: (props: ComponentPropsWithoutRef<"h1">) => (
    <h1 className="font-serif text-4xl md:text-5xl font-medium text-foreground mt-12 mb-6" {...props} />
  ),
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 className="font-serif text-3xl font-medium text-foreground mt-10 mb-4 border-b border-border pb-2" {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="font-serif text-2xl font-medium text-foreground mt-8 mb-3" {...props} />
  ),
  h4: (props: ComponentPropsWithoutRef<"h4">) => (
    <h4 className="font-serif text-xl font-medium text-foreground mt-6 mb-2" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="font-body text-muted-foreground leading-relaxed mb-6" {...props} />
  ),
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a className="text-primary hover:text-primary/80 underline underline-offset-4 transition-colors" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="font-body text-muted-foreground list-disc list-inside mb-6 space-y-2 pl-4" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="font-body text-muted-foreground list-decimal list-inside mb-6 space-y-2 pl-4" {...props} />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li className="leading-relaxed" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote className="border-l-4 border-accent pl-6 py-2 my-8 italic font-serif text-lg text-secondary bg-accent/5 rounded-r-lg" {...props} />
  ),
  hr: (props: ComponentPropsWithoutRef<"hr">) => (
    <hr className="my-12 border-border" {...props} />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono" {...props} />
  ),
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-6 font-mono text-sm" {...props} />
  ),
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="overflow-x-auto mb-6">
      <table className="w-full border-collapse" {...props} />
    </div>
  ),
  th: (props: ComponentPropsWithoutRef<"th">) => (
    <th className="border border-border bg-muted px-4 py-2 text-left font-serif font-medium" {...props} />
  ),
  td: (props: ComponentPropsWithoutRef<"td">) => (
    <td className="border border-border px-4 py-2 font-body" {...props} />
  ),
  img: (props: ComponentPropsWithoutRef<"img">) => (
    <img className="rounded-lg shadow-card my-8 max-w-full h-auto" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
  em: (props: ComponentPropsWithoutRef<"em">) => (
    <em className="italic text-secondary" {...props} />
  ),
};

// Special components for book pages
export const BookQuote = ({ children, author }: { children: React.ReactNode; author?: string }) => (
  <figure className="my-10 px-8 py-6 bg-primary/5 rounded-xl border border-primary/10">
    <blockquote className="font-serif text-xl italic text-foreground leading-relaxed">
      "{children}"
    </blockquote>
    {author && (
      <figcaption className="mt-4 text-sm text-muted-foreground">
        — {author}
      </figcaption>
    )}
  </figure>
);

export const ReadingNote = ({ title, children }: { title?: string; children: React.ReactNode }) => (
  <aside className="my-8 p-6 bg-accent/10 border border-accent/30 rounded-xl">
    {title && (
      <h4 className="font-serif text-lg font-medium text-accent-foreground mb-2">{title}</h4>
    )}
    <div className="font-body text-sm text-muted-foreground">{children}</div>
  </aside>
);

export const Spoiler = ({ children }: { children: React.ReactNode }) => (
  <details className="my-6 p-4 bg-muted rounded-lg">
    <summary className="font-serif font-medium text-foreground cursor-pointer hover:text-primary transition-colors">
      🔍 Contains Spoilers - Click to Reveal
    </summary>
    <div className="mt-4 font-body text-muted-foreground">{children}</div>
  </details>
);

export const ThemeTag = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm rounded-full mr-2 mb-2">
    {children}
  </span>
);
