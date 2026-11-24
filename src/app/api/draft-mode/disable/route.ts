import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

// Lets an editor (or the Presentation tool, which calls this when they
// leave preview) drop back to viewing published content only.
export async function GET(request: Request) {
  (await draftMode()).disable();
  return NextResponse.redirect(new URL("/", request.url));
}
