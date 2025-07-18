# Senah Park - Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, Tailwind CSS, and Framer Motion. This portfolio showcases professional work, skills, and provides a beautiful way to connect with potential clients or employers.

## ✨ Features

- **Modern Design**: Clean, professional design with smooth animations
- **Responsive**: Fully responsive across all devices
- **Performance**: Optimized for speed and SEO
- **Animations**: Smooth scroll animations using Framer Motion
- **Contact Form**: Functional contact form (ready for backend integration)
- **Dark Mode Ready**: CSS variables set up for easy dark mode implementation
- **Accessible**: Built with accessibility in mind

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

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

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

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
│   ├── globals.css          # Global styles and CSS variables
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main page component
├── components/
│   ├── Header.tsx           # Navigation header
│   ├── Hero.tsx             # Hero section
│   ├── About.tsx            # About section
│   ├── Skills.tsx           # Skills section
│   ├── Projects.tsx         # Projects showcase
│   ├── Contact.tsx          # Contact form and info
│   └── Footer.tsx           # Footer component
└── ...
```

## 🛠️ Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons

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

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📞 Support

If you need help customizing this portfolio, feel free to reach out!

---

**Made with ❤️ and lots of coffee**
