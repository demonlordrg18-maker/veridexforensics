# Veridex Developer Quick Start

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Git

### Installation

```bash
# 1. Clone repository
git clone [repo-url]
cd veridex

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env.local

# Required variables:
# DATABASE_URL=postgresql://user:pass@localhost:5432/veridex
# NEXTAUTH_URL=http://localhost:3000
# NEXTAUTH_SECRET=your-secret-key

# 4. Setup database
npm run db:generate  # Generate Prisma client
npm run db:migrate   # Run migrations
npm run db:seed      # (Optional) Seed demo data

# 5. Start development server
npm run dev

# 6. Open http://localhost:3000
```

---

## 📁 Project Structure

```
frontend/
├── app/                    ← Next.js 15 app directory
│   ├── api/               ← API routes
│   ├── dashboard/         ← Dashboard pages
│   ├── cases/             ← Case pages
│   ├── evidence/          ← Evidence pages
│   ├── layout.tsx         ← Root layout
│   └── page.tsx           ← Home page
│
├── components/            ← React components
│   ├── shared/            ← Reusable components
│   ├── dashboard/         ← Dashboard widgets
│   ├── cases/             ← Case components
│   ├── evidence/          ← Evidence components
│   ├── workspace/         ← Layout components
│   └── Navigation.tsx     ← Navigation
│
├── lib/                   ← Utilities & logic
│   ├── api/               ← API client
│   ├── hooks/             ← React hooks
│   ├── types/             ← TypeScript types
│   ├── utils/             ← Helper functions
│   ├── services/          ← Business logic (future)
│   └── auth.ts            ← Auth helpers (existing)
│
├── public/                ← Static assets
├── prisma/                ← Database
│   └── schema.prisma      ← Prisma schema
│
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.js

backend/                   ← FastAPI (separate)
├── main.py               ← FastAPI app
├── core/                 ← Forensic analyzers
└── models/               ← ML models
```

---

## 📖 Common Tasks

### Create a New Page

```bash
# Create app/my-feature/page.tsx
mkdir -p app/my-feature
```

```typescript
// app/my-feature/page.tsx
"use client";

import { PageHeader } from "@/components/shared";

export default function MyFeaturePage() {
  return (
    <div className="min-h-screen bg-obsidian text-slate-300 p-6 lg:p-8">
      <PageHeader 
        title="My Feature"
        description="Feature description"
      />
      {/* Your content here */}
    </div>
  );
}
```

### Create a New Component

```typescript
// components/my-component/MyComponent.tsx
"use client";

import type { MyComponentProps } from "@/lib/types";

export function MyComponent({ prop1 }: MyComponentProps) {
  return (
    <div className="bg-slate-900 border border-deepslate rounded-lg p-6">
      {/* Your component */}
    </div>
  );
}

// components/my-component/index.ts
export { MyComponent } from "./MyComponent";
```

### Create a New Hook

```typescript
// lib/hooks/useMyHook.ts
import { useState, useCallback } from "react";

export function useMyHook() {
  const [state, setState] = useState(null);
  
  const update = useCallback((value) => {
    setState(value);
  }, []);

  return { state, update };
}

// lib/hooks/index.ts
export * from "./useMyHook";
```

### Create a New Type

```typescript
// lib/types/mytype.ts
export interface MyType {
  id: string;
  name: string;
}

// lib/types/index.ts
export * from "./mytype";
```

### Create a New API Route

```typescript
// app/api/my-resource/route.ts
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await prisma.myModel.findMany({
      where: { userId: session.user.id }
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
```

---

## 🎨 Styling

### Color Palette

```css
/* In tailwind.config.js */
colors: {
  obsidian: "#0f0f0f",      /* Background */
  deepslate: "#1a1a2e",      /* Dark element */
  slate: {
    300: "#cbd5e1",           /* Light text */
    400: "#94a3b8",           /* Muted text */
    500: "#64748b",           /* Darker text */
    600: "#475569",           /* Even darker */
    900: "#0f172a",           /* Darkest */
  },
  "amber-signal": "#fbbf24",  /* Accent color */
}
```

### Common Classes

```typescript
// Dark container
className="bg-slate-900 border border-deepslate rounded-lg"

// Text
className="text-white"           // Bright white
className="text-slate-300"       // Light gray
className="text-slate-400"       // Medium gray
className="text-slate-500"       // Dark gray

// Hover effects
className="hover:bg-slate-700 transition-colors"
className="hover:border-amber-signal/30 transition-all"

// Focus states
className="focus:outline-none focus:border-amber-signal"

// Disabled
className="disabled:opacity-50 disabled:cursor-not-allowed"

// Icons
className="text-amber-signal"    // Accent color
className="text-white"            // Primary
className="text-slate-400"        // Secondary
```

---

## 🔍 Debugging

### Enable Debug Mode

```bash
# In .env.local
DEBUG=veridex:*
NEXT_PUBLIC_DEBUG=true
```

### Console Logging

```typescript
// Use conditional logging
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info:', data);
}

// Or use a debug utility
import debug from 'debug';
const log = debug('veridex:my-component');
log('Component mounted');
```

### Network Inspection

```typescript
// View API calls in Network tab (F12)
// Check response in Console:
// Right-click response → Copy response
```

### Database Inspection

```bash
# Open Prisma Studio
npm run db:studio
# Opens http://localhost:5555
```

---

## ✅ Testing

### Run Tests

```bash
# Unit tests
npm run test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage
```

### Write a Test

```typescript
// components/my-component/MyComponent.test.tsx
import { render, screen } from '@testing-library/react';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('renders text', () => {
    render(<MyComponent text="Hello" />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

---

## 🚢 Deployment

### Build

```bash
npm run build
```

### Check build size

```bash
npm run build --debug
npm run analyze  # If configured
```

### Deploy to Vercel

```bash
# Already configured with vercel.json
# Just push to main branch
git push origin main
```

### Deploy to your server

```bash
# Build
npm run build

# Start production server
npm start

# Or use PM2
pm2 start "npm start" --name veridex
```

---

## 📊 Performance Tips

### Image Optimization

```typescript
import Image from 'next/image';

<Image
  src="/image.jpg"
  alt="Description"
  width={400}
  height={300}
  priority={false}  // Set true only for above-fold images
/>
```

### Code Splitting

```typescript
// Dynamic imports for large components
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(
  () => import('@/components/heavy'),
  { loading: () => <LoadingState /> }
);
```

### Memoization

```typescript
import { memo, useMemo, useCallback } from 'react';

const MyComponent = memo(({ data }) => {
  const processed = useMemo(() => {
    return expensiveOperation(data);
  }, [data]);

  const handler = useCallback(() => {
    // handler
  }, []);

  return <div>{processed}</div>;
});
```

---

## 🔐 Security Checklist

- ✅ Always validate user input
- ✅ Check authentication on API routes
- ✅ Sanitize HTML content
- ✅ Use HTTPS in production
- ✅ Rotate secrets regularly
- ✅ Never commit .env.local
- ✅ Use rate limiting
- ✅ Validate file uploads
- ✅ Log security events
- ✅ Keep dependencies updated

---

## 📚 Useful Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs/)
- [React Docs](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [NextAuth.js](https://next-auth.js.org/)

---

## 🆘 Troubleshooting

### Build fails

```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Database connection error

```bash
# Check DATABASE_URL is correct
# Ensure PostgreSQL is running
# Test connection: psql $DATABASE_URL

# Reset database
npm run db:migrate:reset  # ⚠️ Destructive!
```

### CSS not applying

```bash
# Rebuild Tailwind
npm run build

# Check class names are in content paths
# In tailwind.config.js: content: ['./app/**/*.tsx']

# Hard refresh browser: Cmd+Shift+R (Mac) or Ctrl+Shift+F5 (Windows)
```

### Hot reload not working

```bash
# Restart dev server
npm run dev

# Check file is in app/ directory
# Only app/ directory uses hot reload
```

---

## 📞 Support

- **Issues**: Create GitHub issue with [BUG] or [FEATURE] tag
- **Questions**: Start a discussion
- **Security**: Email security@veridexforensics.com

---

## 🎯 Quick Commands

```bash
npm run dev              # Start dev server
npm run build            # Build for production
npm start                # Start production server
npm run lint             # Run linter
npm run format           # Format code
npm test                 # Run tests
npm run db:studio        # Open database UI
npm run db:generate      # Generate Prisma client
npm run db:migrate       # Run database migrations
```

---

**Happy coding! 🚀**
