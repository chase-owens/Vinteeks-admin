# Vinteeks CMS

Administrative platform for managing Vinteeks website content, products, images, and customer inquiries.

---

## Overview

Vinteeks CMS is the internal administration application used to manage data consumed by the public Vinteeks website.

The system is separated into:

- Public website
- CMS application
- AWS serverless APIs
- Shared TypeScript models

This repository contains the CMS application and backend services.

---

## Repository Structure

```text
vinteeks-cms/
├── client/
├── server/
└── shared/
```

### client/

React administration application.

Responsibilities:

- Dashboard
- Inquiry management
- Product management
- Module management
- Image management

Technology:

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS

---

### server/

AWS Lambda functions and backend integrations.

Responsibilities:

- Read inquiries
- Update inquiries
- Product management APIs
- Image upload APIs
- Future authentication APIs

Technology:

- AWS Lambda
- API Gateway
- DynamoDB
- S3

---

### shared/

Shared TypeScript models used by both frontend and backend.

Examples:

- Inquiry
- Product
- Category
- Room

Purpose:

- Single source of truth
- Consistent typing across services

---

## System Architecture

```text
                     ┌─────────────────┐
                     │ Public Website  │
                     │   (SvelteKit)   │
                     └────────┬────────┘
                              │
                              │ Reads
                              ▼

                    ┌──────────────────┐
                    │ CloudFront       │
                    └────────┬─────────┘
                             │

        ┌────────────────────┴────────────────────┐
        │                                         │
        ▼                                         ▼

┌──────────────────┐                 ┌──────────────────┐
│ Content Bucket   │                 │ Images Bucket    │
│ JSON Content     │                 │ Product Images   │
└──────────────────┘                 └──────────────────┘


                             ▲
                             │
                             │ Managed By
                             │

                    ┌──────────────────┐
                    │ Vinteeks CMS     │
                    │ React Admin App  │
                    └────────┬─────────┘
                             │
                             ▼

                    ┌──────────────────┐
                    │ API Gateway      │
                    └────────┬─────────┘
                             │
                             ▼

                    ┌──────────────────┐
                    │ AWS Lambda       │
                    └────────┬─────────┘
                             │
                             ▼

                    ┌──────────────────┐
                    │ DynamoDB         │
                    └──────────────────┘
```

---

## AWS Resources

### Content Distribution

Purpose:

- Products
- Categories
- Rooms
- Homepage content
- Images

Consumed by:

- Public website
- CMS application

Environment Variable:

```env
VITE_CONTENT_BASE_URL=
```

---

### Inquiry Database

DynamoDB Table:

```text
vinteeks-inquiries-prod
```

Stores:

- Customer inquiries
- Uploaded image keys
- Contact information
- Inquiry status

---

### Inquiry API

API Gateway

Current Routes:

```http
GET    /inquiries
PATCH  /inquiries/{inquiryId}
POST   /inquiries/upload-url
POST   /contact
```

---

## Lambda Functions

### vinteeks-get-inquiries

Purpose:

- Reads inquiries from DynamoDB

Used By:

```http
GET /inquiries
```

---

### vinteeks-update-inquiry

Purpose:

- Updates inquiry status

Used By:

```http
PATCH /inquiries/{inquiryId}
```

---

### Existing Inquiry Upload Lambda

Purpose:

- Generates signed S3 upload URLs

Used By:

```http
POST /inquiries/upload-url
```

---

## Development Setup

### Install Dependencies

Client:

```bash
cd client
npm install
```

Server:

```bash
cd server
npm install
```

---

## Environment Variables

### Client

Create:

```text
client/.env.local
```

Example:

```env
VITE_CONTENT_BASE_URL=https://your-cloudfront-url.net
VITE_API_BASE_URL=https://your-api-id.execute-api.us-east-1.amazonaws.com
```

---

## Current Features

### Dashboard

- Product count
- Inquiry count

### Inquiries

- View inquiries
- View inquiry details
- View uploaded photos
- Update inquiry status

Statuses:

- new
- reviewing
- quoted
- completed
- closed

---

## Planned Features

### Products

- Create products
- Edit products
- Delete products
- Reorder products
- Featured products
- Sale products

### Modules

- Homepage modules
- Hero sections
- CTA sections
- Product listings

### Images

- Upload images
- Delete images
- Organize assets

### Authentication

- Admin login
- Route protection
- Role-based permissions

---

## Deployment

### Frontend

Target:

- S3
- CloudFront

Build:

```bash
cd client
npm run build
```

---

### Backend

Target:

- AWS Lambda
- API Gateway

Deployment currently managed through AWS Console.

---

## Project Status

Completed:

- React CMS setup
- Shared TypeScript models
- Dashboard
- Inquiry listing
- Inquiry detail pages
- Inquiry image display
- Inquiry status updates
- DynamoDB integration
- Lambda integration
- API Gateway integration

Next Priority:

1. Products CRUD
2. Module editor
3. Image manager
4. Authentication
5. Deployment automation

```

```
