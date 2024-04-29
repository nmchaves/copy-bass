/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Allow images from Spotify's CDN so we can display album covers
      {
        protocol: "https",
        hostname: "i.scdn.co",
        port: "",
        pathname: "/image/**",
      },
    ],
  },
  experimental: {
    outputFileTracingIncludes: {
      // Manually tell Next.js/Vercel to include the files exported from TabMaker.
      // Otherwise, they wouldn't be included when deploying to Vercel.
      //
      // See the official guide on using files in Vercel Functions:
      // https://vercel.com/guides/how-can-i-use-files-in-serverless-functions
      //
      // Here is a relevant excerpt from that guide:
      //
      //   Both Next.js and general Vercel Functions use Vercel’s Node File Trace
      //   to determine which files (including those in `node_modules`) are
      //   necessary to be included. This uses static analysis to inspect any
      //   `import`, `require`, and `fs` usage and determine all files that a
      //   page might load. Tell Next.js/Vercel to include all of the tab files
      //   in the `song/[id]` page's serverless function.
      //
      // However, this doesn't work for the tab files we use in the `/song/[id]`
      // route. We can't statically import those files. After all, the song is
      // dynamic, since it's based on the `id` route param! As a result, NFT's
      // static analysis doesn't realize we need to include all of the files
      // within the `tabMakerExports` dir.
      //
      // So we need to manually tell Next.js/Vercel to include those files here.
      //
      // For reference, here are the docs for `outputFileTracingIncludes` and
      // other related config options:
      // https://nextjs.org/docs/pages/api-reference/next-config-js/output#caveats
      ["/song/[id]"]: ["./server/tabs/tabMakerExports/*"],
    },
  },
};

export default nextConfig;
