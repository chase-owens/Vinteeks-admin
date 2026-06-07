# Vinteeks CMS Client

Administrative interface for managing Vinteeks content, products, images, and customer inquiries.

---

## Overview

The Vinteeks CMS is the internal administration application used to manage the public Vinteeks website.

The public website consumes content from AWS-hosted JSON files and APIs. This application allows administrators to manage that content without manually editing files.

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS

### Backend

AWS Serverless Architecture

- API Gateway
- Lambda
- DynamoDB
- S3
- CloudFront

---

## Features

### Dashboard

Current:

- Total products
- Total inquiries

Planned:

- Inquiry status breakdown
- Recent inquiries
- Recent product changes
- Image upload statistics

---

### Inquiries

Current:

- View all inquiries
- View inquiry details
- View uploaded images
- Update inquiry status

Inquiry statuses:

- new
- reviewing
- quoted
- completed
- closed

Planned:

- Internal notes
- Search
- Filtering
- Sorting
- Archive closed inquiries

---

### Products

Planned:

- Create products
- Edit products
- Delete products
- Reorder products
- Toggle featured products
- Toggle sale products

---

### Modules

Planned:

- Homepage modules
- Featured sections
- Category sections
- CTA sections
- Hero content

---

### Images

Planned:

- Upload images
- Delete images
- Organize folders
- Reuse uploaded assets

---

## AWS Resources

### Content

CloudFront Distribution

Used for:

- products.json
- categories.json
- rooms.json
- images

Environment Variable:

```env
VITE_CONTENT_BASE_URL=
```

Example:

```env
VITE_CONTENT_BASE_URL=https://d7r9an6gzs271.cloudfront.net
```

---

### Inquiry API

API Gateway Base URL

Environment Variable:

```env
VITE_API_BASE_URL=
```

Example:

```env
VITE_API_BASE_URL=https://n5k7mx128f.execute-api.us-east-1.amazonaws.com
```

---

## API Endpoints

### Get Inquiries

Method:

```http
GET /inquiries
```

Lambda:

```text
vinteeks-get-inquiries
```

Purpose:

Returns all inquiries from DynamoDB.

---

### Update Inquiry Status

Method:

```http
PATCH /inquiries/{inquiryId}
```

Lambda:

```text
vinteeks-update-inquiry
```

Purpose:

Updates inquiry status.

Example payload:

```json
{
	"status": "reviewing"
}
```

---

## DynamoDB

Table:

```text
vinteeks-inquiries-prod
```

Stores:

- Inquiry information
- Uploaded image keys
- Contact information
- Status updates

---

## Environment Variables

Create:

```text
client/.env.local
```

Example:

```env
VITE_CONTENT_BASE_URL=https://d7r9an6gzs271.cloudfront.net
VITE_API_BASE_URL=https://n5k7mx128f.execute-api.us-east-1.amazonaws.com
```

---

## Development

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Application:

```text
http://localhost:5173
```

---

## Build

Create production build:

```bash
npm run build
```

Preview build:

```bash
npm run preview
```

---

## Linting

```bash
npm run lint
```

---

## Folder Structure

```text
client/
├── public/
├── src/
│   ├── api/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── router/
│   └── styles/
├── package.json
└── vite.config.ts

server/
├── lambdas/

shared/
└── types/
```

---

## Current Progress

Completed:

- Dashboard
- Inquiry list
- Inquiry detail page
- Inquiry image display
- Inquiry status updates
- Shared inquiry types
- DynamoDB integration
- API Gateway integration

Next:

- Products CRUD
- Module management
- Image management
- Authentication
- Deployment pipeline

```

```
