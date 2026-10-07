import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { getContent } from "@/sanity/content";
import RevealObserver from "@/components/RevealObserver";
import "@/styles/globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const { profile } = await getContent();
  const title = `${profile.shortName} — ${profile.role}`;
  return {
    title,
    description: profile.headline,
    openGraph: { title, description: profile.headline, type: "website" },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f3ee" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0e13" },
  ],
};

// Applies the saved or system theme before first paint to avoid a flash, and flags JS for scroll reveals.
const themeScript = `(function(){document.documentElement.classList.add('js');try{var t=localStorage.getItem('theme');var d=t?t==='dark':matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d)}catch(e){}})()`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.variable} ${mono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}
