import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import { Outfit, JetBrains_Mono } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
});

const bingVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;

function toMetadataBase(raw?: string) {
  if (!raw) return undefined;
  const trimmed = raw.trim();
  if (!trimmed) return undefined;

  const candidate = /^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  try {
    return new URL(candidate);
  } catch {
    return undefined;
  }
}

export const metadata: Metadata = {
  metadataBase: toMetadataBase(process.env.NEXT_PUBLIC_SITE_URL) ?? new URL("https://veridex.ai"),
  title: {
    default: "Veridex Forensics | AI Content Verification for Evidence, News, and Risk",
    template: "%s | Veridex Forensics",
  },
  description:
    "Verify digital content with multimodal forensic analysis for documents, images, audio, video, and links. Built for journalists, legal teams, and researchers.",
  keywords: [
    "deepfake detection",
    "AI content verification",
    "forensic audit",
    "digital evidence",
    "synthetic media detection",
    "bias analysis",
  ],
  openGraph: {
    title: "Veridex Forensics",
    description:
      "Probabilistic forensic analysis for digital evidence, newsroom verification, and enterprise risk review.",
    type: "website",
    url: "/",
    siteName: "Veridex Forensics",
  },
  twitter: {
    card: "summary_large_image",
    title: "Veridex Forensics",
    description:
      "Multimodal forensic verification for digital evidence, newsroom review, and synthetic media risk.",
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    ...(bingVerification
      ? {
          other: {
            "msvalidate.01": bingVerification,
          },
        }
      : {}),
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

  return (
    <html lang="en" className={`${outfit.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">
        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        ) : null}
        {clarityId ? (
          <Script id="microsoft-clarity" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${clarityId}");
            `}
          </Script>
        ) : null}
        {children}
      </body>
    </html>
  );
}
