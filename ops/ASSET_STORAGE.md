# Portfolio asset storage

Public images and PDFs live at `/var/www/binpoin-assets` on `ubuntu@43.157.225.163`.
Nginx serves them at their existing `https://binpoin.my.id` paths using
`/etc/nginx/snippets/binpoin-assets.conf`. This directory is independent of Docker releases.

Local files in `public/images`, `public/projects`, `public/pdfs`, and root-level public
images/PDFs are ignored by Git. Fonts remain in Git for `next/font/local` builds.
Next.js fallback rewrites fetch missing assets from production during local development.

Upload changed public assets with `sh scripts/sync-assets.sh`. Uploads do not delete
remote files. Update `ops/assets-manifest.json` when publishing changed assets.
Never upload private PDFs: every file in this storage is publicly accessible.

Deploy application code without bundling ignored images/PDFs. Keep the Nginx snippet
enabled before deploying an application without local assets. Missing assets must return
404 at Nginx rather than proxy back to Next.js, avoiding a fallback rewrite loop.

Back up `/var/www/binpoin-assets` independently; Git and Docker images do not contain it.
The original local files are retained as an additional copy.