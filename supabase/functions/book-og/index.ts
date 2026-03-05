const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");

const getImageDataUrl = async (imageUrl: string) => {
  try {
    const response = await fetch(imageUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status}`);
    }

    const contentType = response.headers.get("content-type") || "image/jpeg";
    const bytes = new Uint8Array(await response.arrayBuffer());

    let binary = "";
    const chunkSize = 0x8000;
    for (let index = 0; index < bytes.length; index += chunkSize) {
      binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
    }

    return `data:${contentType};base64,${btoa(binary)}`;
  } catch (error) {
    console.error("Unable to inline OG cover image", error);
    return imageUrl;
  }
};

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const { searchParams } = new URL(request.url);

  const title = escapeXml(searchParams.get("title") || "Hadith Tech Book Club");
  const author = escapeXml(searchParams.get("author") || "Community Pick");
  const genre = escapeXml(searchParams.get("genre") || "Tech Literature");
  const meetingDate = escapeXml(searchParams.get("meetingDate") || "Monthly discussion");
  const slug = escapeXml(searchParams.get("slug") || "book");
  const rawCoverImage = searchParams.get("coverImage") || "https://book.hadithtech.com/placeholder.svg";
  const inlinedCoverImage = await getImageDataUrl(rawCoverImage);
  const coverImage = escapeXml(inlinedCoverImage);

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
  <svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="title desc">
    <title id="title">${title} | Hadith Tech</title>
    <desc id="desc">Open Graph image for ${title} by ${author} in the Hadith Tech book club.</desc>
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
        <stop stop-color="#07111F" />
        <stop offset="1" stop-color="#152C46" />
      </linearGradient>
      <linearGradient id="accent" x1="150" y1="80" x2="1050" y2="550" gradientUnits="userSpaceOnUse">
        <stop stop-color="#F6C46B" stop-opacity="0.34" />
        <stop offset="1" stop-color="#F6C46B" stop-opacity="0" />
      </linearGradient>
      <clipPath id="coverClip">
        <rect x="82" y="82" width="312" height="466" rx="24" />
      </clipPath>
    </defs>

    <rect width="1200" height="630" fill="url(#bg)"/>
    <rect width="1200" height="630" fill="url(#accent)"/>
    <circle cx="1010" cy="108" r="210" fill="#F6C46B" fill-opacity="0.08"/>
    <circle cx="1120" cy="560" r="180" fill="#F6C46B" fill-opacity="0.06"/>

    <rect x="60" y="60" width="1080" height="510" rx="32" fill="#FFFFFF" fill-opacity="0.04" stroke="#FFFFFF" stroke-opacity="0.12"/>

    <rect x="82" y="82" width="312" height="466" rx="24" fill="#0F1E30" stroke="#FFFFFF" stroke-opacity="0.1"/>
    <image href="${coverImage}" x="82" y="82" width="312" height="466" preserveAspectRatio="xMidYMid slice" clip-path="url(#coverClip)"/>

    <text x="448" y="122" fill="#F6C46B" font-size="24" font-family="Georgia, serif" letter-spacing="3">HADITH TECH BOOK CLUB</text>
    <text x="448" y="196" fill="#FFFFFF" font-size="56" font-weight="700" font-family="Georgia, serif">${title}</text>
    <text x="448" y="246" fill="#D6E0EA" font-size="28" font-family="Arial, sans-serif">by ${author}</text>

    <rect x="448" y="286" width="220" height="44" rx="22" fill="#F6C46B" fill-opacity="0.14" stroke="#F6C46B" stroke-opacity="0.3"/>
    <text x="476" y="315" fill="#F6C46B" font-size="22" font-family="Arial, sans-serif">${genre}</text>

    <text x="448" y="392" fill="#FFFFFF" font-size="20" font-family="Arial, sans-serif">Monthly discussion • ${meetingDate}</text>
    <text x="448" y="432" fill="#C9D5E1" font-size="26" font-family="Arial, sans-serif">Tech books, sharper conversations, curious builders.</text>

    <rect x="448" y="476" width="326" height="56" rx="28" fill="#FFFFFF" fill-opacity="0.08" stroke="#FFFFFF" stroke-opacity="0.14"/>
    <text x="478" y="512" fill="#FFFFFF" font-size="24" font-family="Arial, sans-serif">book.hadithtech.com/book/${slug}</text>
  </svg>`;

  return new Response(svg, {
    headers: {
      ...corsHeaders,
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
});
