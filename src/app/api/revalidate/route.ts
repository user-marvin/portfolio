import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

// Called by a Sanity webhook on publish so edits appear immediately instead of within a minute.
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return new NextResponse("Missing SANITY_REVALIDATE_SECRET", { status: 500 });

  const { isValidSignature, body } = await parseBody<{ _type?: string }>(req, secret);
  if (!isValidSignature) return new NextResponse("Invalid signature", { status: 401 });

  revalidateTag("sanity", "max");
  return NextResponse.json({ revalidated: true, type: body?._type ?? null });
}
