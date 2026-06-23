# Syncromet — Website

Static website for [syncromet.com](https://syncromet.com) — Canada's scrap metal trading partner.

## Stack

- **Frontend:** Static HTML/CSS/JS
- **Hosting:** AWS S3 + CloudFront (`ca-central-1`)
- **Domain:** syncromet.com (Namecheap DNS → CloudFront)
- **SSL:** AWS ACM (auto-renews)
- **IaC:** Terraform (`terraform/`)

## Deploy

### First-time setup
```bash
aws configure        # enter Access Key, Secret, region: ca-central-1
cd terraform
terraform init
terraform apply
```

### Deploy code changes
```bash
bash terraform/deploy.sh
```

This syncs files to S3 and invalidates the CloudFront cache.

## Project Structure

```
/
├── index.html
├── about.html
├── services.html
├── ferrous.html
├── non-ferrous.html
├── safety.html
├── blog.html
├── faq.html
├── contact.html
├── prices.html
├── assets/
│   ├── styles.css
│   ├── modern.css
│   ├── site.js
│   └── images/
└── terraform/
    ├── main.tf       # S3 + CloudFront infrastructure
    └── deploy.sh     # sync + cache invalidation script
```

## DNS (Namecheap)

| Type | Host | Value |
|------|------|-------|
| CNAME | `www` | `d11r9k0s8e3krq.cloudfront.net` |
| CNAME/ALIAS | `@` | `d11r9k0s8e3krq.cloudfront.net` |
