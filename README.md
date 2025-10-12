# Senah Park - Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, Tailwind CSS, and Framer Motion. This portfolio showcases professional work, skills, and provides a beautiful way to connect with potential clients or employers.

## ✨ Features

### Portfolio Features
- **Modern Design**: Clean, professional design with smooth animations
- **Responsive**: Fully responsive across all devices
- **Performance**: Optimized for speed and SEO
- **Animations**: Smooth scroll animations using Framer Motion
- **Contact Form**: Functional contact form (ready for backend integration)
- **Dark Mode Ready**: CSS variables set up for easy dark mode implementation
- **Accessible**: Built with accessibility in mind

### Lecture Transcription Platform (`/transcribe`)
- **Lecture Library**: Browse and organize lecture recordings by class
- **Audio Playback**: Full-featured audio player with:
  - Play/pause, seek, and skip controls
  - Volume control and adjustable playback speed (0.5x - 2x)
  - Keyboard shortcuts (Space, Arrow keys, 0-9 for seeking, M for mute)
- **Live Transcript**: Time-synced transcription that follows along with audio
- **AI Insights**: Automatically generated lecture summaries and key topics
- **Class Organization**: Expandable class groups with metadata (professor, schedule, etc.)
- **Google Drive Integration**: Direct streaming of lecture audio from Google Drive
- **Supabase Backend**: Stores lecture metadata, transcripts, and insights

### Links Page (`/links`)
- **Social Hub**: Linktree-style page with social media and affiliate links
- **Animated Interface**: Smooth entrance animations and hover effects
- **Contact Integration**: Direct links to email and portfolio

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account (for lecture transcription features)
- Google Cloud project with Drive API enabled (for audio streaming)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd senahpark.com
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google Drive API (for audio streaming)
GOOGLE_DRIVE_CLIENT_EMAIL=your_service_account_email
GOOGLE_DRIVE_PRIVATE_KEY=your_service_account_private_key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎨 Customization Guide

### Personal Information

Update the following files with your personal information:

#### 1. Header Component (`src/components/Header.tsx`)
- Change "Senah Park" to your name
- Update navigation links if needed

#### 2. Hero Section (`src/components/Hero.tsx`)
- Update name, title, and description
- Modify the call-to-action buttons
- Change background colors or gradients

#### 3. About Section (`src/components/About.tsx`)
- Update personal information (name, location, experience)
- Modify the "Who I Am" description
- Update core skills list
- Replace the profile image placeholder

#### 4. Skills Section (`src/components/Skills.tsx`)
- Update skill categories and proficiency levels
- Add or remove skills as needed
- Modify the additional skills list

#### 5. Projects Section (`src/components/Projects.tsx`)
- Replace project data with your actual projects
- Update project images, descriptions, and links
- Modify technology tags

#### 6. Contact Section (`src/components/Contact.tsx`)
- Update contact information (email, phone, location)
- Modify social media links
- Update the contact form handling

#### 7. Footer (`src/components/Footer.tsx`)
- Update social media links
- Modify footer links and services

#### 8. Links Page (`src/app/links/page.tsx`)
- Update social media URLs
- Modify affiliate links and promo codes
- Change profile information and description

### Styling Customization

#### Colors
The portfolio uses CSS custom properties for easy color customization. Update the variables in `src/app/globals.css`:

```css
:root {
  --primary: 221.2 83.2% 53.3%;
  --secondary: 210 40% 96%;
  /* ... other variables */
}
```

#### Typography
The portfolio uses Inter font by default. You can change this in `src/app/layout.tsx`:

```typescript
import { YourFont } from "next/font/google";
```

### Adding Real Images

1. Place your images in the `public` folder
2. Update image paths in the components
3. For the profile image, replace the placeholder in the About section

### Contact Form Integration

The contact form is currently set up to log form data to the console. To make it functional:

1. Add a backend API route in `src/app/api/contact/route.ts`
2. Update the form submission handler in `src/components/Contact.tsx`
3. Consider using services like:
   - EmailJS for client-side email sending
   - Formspree for form handling
   - Your own backend API

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── audio/[lectureId]/route.ts  # Audio streaming endpoint
│   │   └── lectures/
│   │       ├── route.ts                # Lecture CRUD operations
│   │       └── [id]/route.ts           # Individual lecture operations
│   ├── transcribe/
│   │   ├── components/
│   │   │   ├── AudioPlayer.tsx         # Audio playback component
│   │   │   ├── TranscriptPanel.tsx     # Live transcript display
│   │   │   ├── InsightsPanel.tsx       # AI-generated insights
│   │   │   ├── LectureSidebar.tsx      # Navigation sidebar
│   │   │   ├── ClassList.tsx           # Class organization
│   │   │   ├── LectureLanding.tsx      # Library landing page
│   │   │   └── LectureViewerIntegrated.tsx  # Main viewer
│   │   └── page.tsx                    # Transcribe app entry
│   ├── links/
│   │   └── page.tsx                    # Social links page
│   ├── globals.css                     # Global styles and CSS variables
│   ├── layout.tsx                      # Root layout component
│   └── page.tsx                        # Main portfolio page
├── components/
│   ├── Header.tsx                      # Navigation header
│   ├── Hero.tsx                        # Hero section
│   ├── About.tsx                       # About section
│   ├── Skills.tsx                      # Skills section
│   ├── Projects.tsx                    # Projects showcase
│   ├── Contact.tsx                     # Contact form and info
│   └── Footer.tsx                      # Footer component
├── hooks/
│   └── useLectures.ts                  # Custom hooks for lecture data
├── types/
│   └── lecture.ts                      # TypeScript type definitions
└── utils/
    ├── supabase.ts                     # Supabase client and services
    ├── googleDrive.ts                  # Google Drive API integration
    └── classMetadata.ts                # Class metadata configuration
```

## 🛠️ Technologies Used

### Core Technologies
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Utility-first styling
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful icon library

### Backend & Services
- **Supabase** - Backend-as-a-Service for lecture data storage
- **Google Drive API** - Audio file streaming
- **Google APIs** - Drive integration

### Key Features
- Server-side rendering (SSR)
- API routes for backend logic
- Real-time data fetching with custom hooks
- Responsive design with mobile-first approach

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- Mobile devices (320px+)
- Tablets (768px+)
- Desktop (1024px+)
- Large screens (1280px+)

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms
The portfolio can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Railway

## 🔧 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎓 Lecture Transcription Setup

To use the lecture transcription features (`/transcribe`):

### 1. Supabase Database Setup

Create the following tables in your Supabase project:

**`lectures` table:**
```sql
- id (uuid, primary key)
- class_number (text)
- title (text)
- date (date)
- duration_seconds (integer)
- audio_url (text)
- created_at (timestamp)
```

**`transcript_segments` table:**
```sql
- id (uuid, primary key)
- lecture_id (uuid, foreign key to lectures)
- text (text)
- start_time (real)
- end_time (real)
- created_at (timestamp)
```

**`lecture_insights` table:**
```sql
- id (uuid, primary key)
- lecture_id (uuid, foreign key to lectures)
- summary (text)
- key_topics (jsonb)
- created_at (timestamp)
```

### 2. Google Drive API Setup

1. Create a Google Cloud project
2. Enable the Google Drive API
3. Create a service account and download the JSON key
4. Share your lecture audio folder with the service account email
5. Add credentials to `.env.local`

### 3. Class Metadata Configuration

Update `utils/classMetadata.ts` with your class information:
```typescript
export const classMetadata = {
  "CLASS-101": {
    course_number: "CLASS-101",
    course_title: "Your Course Title",
    professor_name: "Professor Name",
    days: "Mon/Wed",
    lecture_time: "10:00 AM - 11:30 AM",
    lecture_titles: {
      "1": "Lecture 1 Title",
      // ... more lectures
    }
  }
};
```

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📞 Support

If you need help customizing this portfolio, feel free to reach out!

---

**Made with ❤️ and lots of coffee**
