import { notFound } from "next/navigation";

// This `[...not_found]` catch-all segment is a workaround for a Next.js issue
// with 404s. Without this, the following scenario would happen:
// 1. Visit a non-existent top-level route like /abc
// 2. On the `not-found` page, click "Back to Home" (or any other `Link` tag
// with an `href` of `/`).
// 3. The URL updates, but Next.js won't render the homepage. It continues to
// render the 404 page.
//
// This catch-all segment causes Next.js to correctly display the homepage in
// this scenario. I found this approach mentioned in the following places:
// https://stackoverflow.com/questions/75302340/not-found-page-does-not-work-in-next-js-13
// https://github.com/vercel/next.js/issues/60695#issuecomment-1919452883
// https://github.com/vercel/next.js/issues/60408#issuecomment-1882733747
export default function NotFoundCatchAll() {
  notFound();
}
