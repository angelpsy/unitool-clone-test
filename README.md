# Unitool Chat App

A Next.js 15+ application with TypeScript, Tailwind CSS, authentication, and real-time chat capabilities.

## Features

- 🔐 Authentication (register, login, logout)
- 👤 User profile
- 💬 Real-time chat with AI
- 🖼️ Image gallery with Unsplash and Lorem Picsum integration
- 🔍 Advanced image search and filtering
- 🌐 Internationalization (English and Russian)
- 🎨 Responsive design with dark/light mode
- ✨ Modern UI with shadcn/ui components
- 📱 Responsive masonry grid layout

## Tech Stack

- Next.js 15+
- TypeScript
- Tailwind CSS
- Zustand (state management)
- TanStack Query (data fetching)
- next-intl (internationalization)
- React Hook Form (form handling)
- Shadcn/UI (UI components)
- react-masonry-css (responsive image grid)
- Unsplash API (high-quality stock photos)
- pnpm (package manager)

## Getting Started

### Prerequisites

- Node.js 18+ (recommended: 20+)
- pnpm (recommended) or npm

### Environment Setup

1. Copy the example environment file (or create a new one):
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your configuration:
   ```
   JWT_SECRET=your_secure_random_string_here
   NEXT_PUBLIC_WS_HOST=http://localhost
   NEXT_PUBLIC_WS_PORT=4000
   NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here
   ```
   For development, you can generate a secure random string for `JWT_SECRET` with this command:
   ```bash
   openssl rand -hex 32
   ```
   
   To get an Unsplash API key:
   1. Create an account at [Unsplash Developers](https://unsplash.com/developers)
   2. Create a new application
   3. Copy the "Access Key" to your `.env.local` file

3. Run the development server:

```bash
# Install dependencies
pnpm install
# or
npm install

# Run the development server
pnpm dev
# or
npm run dev

# Run the WebSocket server for chat (in a separate terminal)
pnpm start:ws
# or
npm run start:ws
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

To create a production build:

```bash
# Install dependencies (if not already installed)
pnpm install
# or
npm install

# Build the application
pnpm build
# or
npm run build

# Start the production server
pnpm start
# or
npm start
```

## Project Structure

- `src/app` - Next.js App Router pages and API routes
- `src/components` - Reusable components
- `src/features` - Feature-based code organization
- `src/hooks` - Custom React hooks
- `src/lib` - Utility functions and libraries
- `src/locales` - Internationalization files (EN/RU)
- `src/public` - Static assets
- `src/services` - Service layer (API clients, etc.)
- `src/mappers` - Data mappers for transforming data between layers
- `src/types` - TypeScript type definitions
- `server/chat-server.js` - WebSocket server for chat

## Authentication

The app uses JWT-based authentication with httpOnly cookies for secure token storage. Protected routes require authentication, redirecting unauthenticated users to the login page.

## Chat

The chat interface supports:
- Real-time messaging
- Markdown support
- Automatic scrolling to the latest message
- Typing indicators

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
