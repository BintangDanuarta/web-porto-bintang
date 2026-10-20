/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  async rewrites() {
    return {
      fallback: [
        { source: "/images/:path*", destination: "https://binpoin.my.id/images/:path*" },
        { source: "/projects/:path*", destination: "https://binpoin.my.id/projects/:path*" },
        { source: "/pdfs/:path*", destination: "https://binpoin.my.id/pdfs/:path*" },
        { source: "/:asset([^/]+\\.(?:pdf|svg|png|jpg|jpeg|webp|avif|gif|ico))", destination: "https://binpoin.my.id/:asset" },
      ],
    };
  },
};

export default nextConfig;
