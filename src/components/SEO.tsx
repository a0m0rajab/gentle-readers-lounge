import { Helmet } from "react-helmet-async";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BookStructuredData {
  title: string;
  author: string;
  description: string;
  genre: string;
  pageCount: number;
  datePublished?: string;
  coverImage?: string;
  isbn?: string;
  rating?: number;
  ratingCount?: number;
}

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "book";
  breadcrumbs?: BreadcrumbItem[];
  book?: BookStructuredData;
  noIndex?: boolean;
}

const BASE_URL = "https://gentlereaders.club";

const SEO = ({
  title,
  description,
  canonicalUrl,
  ogImage = "https://lovable.dev/opengraph-image-p98pqg.png",
  ogType = "website",
  breadcrumbs,
  book,
  noIndex = false,
}: SEOProps) => {
  const fullTitle = title.includes("Gentle Readers")
    ? title
    : `${title} | The Gentle Readers Club`;

  const fullCanonicalUrl = canonicalUrl
    ? `${BASE_URL}${canonicalUrl}`
    : undefined;

  // Generate Breadcrumb JSON-LD
  const breadcrumbJsonLd = breadcrumbs
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: `${BASE_URL}${item.url}`,
        })),
      }
    : null;

  // Generate Book JSON-LD
  const bookJsonLd = book
    ? {
        "@context": "https://schema.org",
        "@type": "Book",
        name: book.title,
        author: {
          "@type": "Person",
          name: book.author,
        },
        description: book.description,
        genre: book.genre,
        numberOfPages: book.pageCount,
        ...(book.coverImage && { image: book.coverImage }),
        ...(book.isbn && { isbn: book.isbn }),
        ...(book.rating && {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: book.rating,
            ratingCount: book.ratingCount || 1,
            bestRating: 5,
            worstRating: 1,
          },
        }),
        publisher: {
          "@type": "Organization",
          name: "The Gentle Readers Club",
          url: BASE_URL,
        },
      }
    : null;

  // Generate Organization JSON-LD (for reading guides hub)
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "The Gentle Readers Club",
    url: BASE_URL,
    description:
      "A community of passionate readers exploring literature together through monthly book discussions.",
    sameAs: [],
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {fullCanonicalUrl && <link rel="canonical" href={fullCanonicalUrl} />}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      {fullCanonicalUrl && <meta property="og:url" content={fullCanonicalUrl} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {/* JSON-LD Structured Data */}
      {breadcrumbJsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbJsonLd)}
        </script>
      )}
      {bookJsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(bookJsonLd)}
        </script>
      )}
      {!book && (
        <script type="application/ld+json">
          {JSON.stringify(organizationJsonLd)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
