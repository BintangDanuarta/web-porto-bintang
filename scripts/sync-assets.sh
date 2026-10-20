#!/bin/sh
set -eu
cd "$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)"
rsync -rv --chmod=ugo+rX \
  --include='*/' \
  --include='*.pdf' --include='*.jpg' --include='*.jpeg' \
  --include='*.png' --include='*.webp' --include='*.avif' \
  --include='*.gif' --include='*.svg' --include='*.ico' \
  --exclude='*' \
  public/ ubuntu@43.157.225.163:/var/www/binpoin-assets/