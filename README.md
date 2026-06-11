# SpeechNova

AI Speech Generator powered by Chatterbox TTS and Next.js.

## Features

- **Text-to-Speech Conversion**: Convert text to natural-sounding speech using advanced AI models
- **Voice Selection**: Choose from various pre-built voices or upload custom voices
- **Parameter Control**: Adjust temperature, top-p, top-k, and repetition penalty for customized output
- **Quick Actions**: Pre-built templates for common use cases (stories, speeches, podcasts, etc.)
- **History Tracking**: View and regenerate previous speech generations
- **Secure Authentication**: Clerk-based authentication with organization support
- **Payment Integration**: Polar integration for subscription management
- **Audio Storage**: AWS S3 (via Cloudflare R2) for reliable audio file storage
- **Real-time Preview**: Listen to generated speech directly in the browser
- **Cost Estimation**: See estimated costs before generating speech

## Technology Stack

- **Framework**: [Next.js 16.2.2](https://nextjs.org/)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: [Clerk](https://clerk.com/)
- **Database**: PostgreSQL with Prisma ORM
- **Payments**: [Polar](https://polar.sh/)
- **Audio Generation**: Chatterbox TTS API
- **Storage**: Cloudflare R2 (S3-compatible)
- **State Management**: TanStack Query
- **API Layer**: tRPC
- **UI Components**: Shadcn/UI with Radix UI primitives
- **Monitoring**: Sentry

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL database
- Cloudflare R2 account (for audio storage)
- Clerk account (for authentication)
- Polar account (for payments)
- Chatterbox TTS API access

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Next.js
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Database
DATABASE_URL=

# Polar (Payments)
POLAR_ACCESS_TOKEN=
POLAR_WEBhook_SECRET=

# Chatterbox TTS
CHATTERBOX_API_URL=

# Cloudflare R2
R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=

# Sentry (Optional)
NEXT_PUBLIC_SENTRY_DSN=
SENTRY_ORG=
SENTRY_PROJECT=

# Other
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd speechnova
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   ```bash
   npx prisma migrate dev
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
speechnova/
├─ src/
│  ├─ app/                 # Next.js app directory
│  ├─ components/          # Reusable UI components
│  ├─ features/            # Feature-specific modules
│  ├─ lib/                 # Utility functions and external service clients
│  ├─ trpc/                # tRPC routers and context
│  └─ ... 
├─ public/                 # Static assets
├─ prisma/                 # Database schema and migrations
├─ scripts/                # Utility scripts
└─ ...
```

## Key Features Explained

### Text Input Panel
Located in `src/features/dashboard/components/text-input-panel.tsx`, this component allows users to:
- Enter text for speech generation
- See real-time cost estimation based on character count
- Generate speech with a single click

### Quick Actions
Pre-defined templates for common use cases found in `src/features/dashboard/data/quick-actions.ts`:
- Narrate a story
- Motivational speech
- Kids bedtime story
- Podcast intro
- News headline reading
- Product advertisement

### Voice Management
Users can:
- Select from system voices (provided by Chatterbox)
- Upload custom voices via the settings panel
- Preview voices before generation

### Generation Process
The flow for generating speech:
1. User submits text and selects voice/parameters
2. tRPC route (`src/trpc/routers/generations.ts`) validates subscription
3. Request sent to Chatterbox TTS API
4. Audio stored in Cloudflare R2
5. Generation record saved to PostgreSQL
6. Signed URL returned for audio playback

### Settings Panel
Accessible in the Text-to-Speech view, allows users to:
- Adjust generation parameters (temperature, top-p, etc.)
- Manage custom voices
- View subscription status

## Deployment

### Vercel (Recommended)
1. Push code to GitHub repository
2. Import project in Vercel
3. Configure environment variables
4. Vercel will automatically build and deploy

### Manual Deployment
```bash
# Build for production
npm run build

# Start production server
npm start
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run sync-api` - Sync API types (if using openapi-fetch)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is private and proprietary. All rights reserved.

## Acknowledgments

- [Chatterbox TTS](https://github.com/resemble-ai/chatterbox) for the speech generation model
- [Next.js](https://nextjs.org/) for the React framework
- [Clerk](https://clerk.com/) for authentication
- [Polar](https://polar.sh/) for payment processing
- [Cloudflare R2](https://www.cloudflare.com/products/r2/) for object storage