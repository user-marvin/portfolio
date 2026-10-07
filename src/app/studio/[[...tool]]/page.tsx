import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";
import { isSanityConfigured } from "@/sanity/env";

export const dynamic = "force-static";
export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main className="container py-32">
        <h1 className="text-2xl font-semibold">Sanity isn&apos;t connected yet</h1>
        <p className="mt-3 max-w-xl text-muted">
          Add <code className="font-mono">NEXT_PUBLIC_SANITY_PROJECT_ID</code> to <code className="font-mono">.env.local</code>{" "}
          and restart the dev server. See the README for setup steps.
        </p>
      </main>
    );
  }
  return <NextStudio config={config} />;
}
