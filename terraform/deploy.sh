#!/bin/bash
set -e

BUCKET="syncromet-website"
DISTRIBUTION_ID=$(aws cloudfront list-distributions --query "DistributionList.Items[?Origins.Items[?DomainName=='${BUCKET}.s3.ca-central-1.amazonaws.com']].Id" --output text)

# Sync site files (exclude non-site folders)
aws s3 sync . s3://$BUCKET \
  --exclude ".git/*" \
  --exclude "terraform/*" \
  --exclude "scripts/*" \
  --exclude "design_bundle/*" \
  --exclude ".playwright-mcp/*" \
  --exclude ".vercel/*" \
  --exclude "assets/env.js" \
  --exclude "*.py" \
  --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id $DISTRIBUTION_ID \
  --paths "/*"

echo "Deployed to S3 and CloudFront cache invalidated."
