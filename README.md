# Or Hakerem - Luxury Properties in Tel Aviv

A premium luxury accommodation website featuring properties in Tel Aviv's vibrant Kerem HaTeimanim neighborhood. Built with Next.js 15, TypeScript, and Tailwind CSS.

## 🏨 Features

- **Luxury Properties**: Showcase of premium accommodations including penthouse with jacuzzi and cozy studio
- **Concierge Services**: Comprehensive luxury services including dining reservations, private transfers, and event planning
- **Event Spaces**: Dedicated event planning and venue booking system
- **Responsive Design**: Optimized for all devices with modern UI/UX
- **Contact System**: Integrated email system with Resend for inquiries and bookings
- **Multi-language Support**: Built with internationalization in mind

## 🚀 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Email**: Resend API
- **Validation**: Zod
- **Notifications**: React Hot Toast
- **Deployment**: Vercel

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/orhakerem.git
cd orhakerem
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Add your environment variables:
```env
RESEND_API_KEY=your_resend_api_key
RECIPIENT_EMAIL=your_email@example.com
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── concierge-services/ # Concierge services page
│   ├── events/            # Event planning page
│   ├── properties/        # Property listings and details
│   ├── reservation/       # Booking system
│   ├── faq/              # FAQ page
│   ├── terms/            # Terms & conditions
│   ├── cancellation/     # Cancellation policy
│   └── privacy/          # Privacy policy
├── components/            # Reusable React components
├── actions/              # Server actions for forms
└── validation.ts         # Zod schemas for form validation
```

## 🎨 Design System

- **Primary Color**: #a5382b (Warm Red)
- **Secondary Color**: #d8b084 (Gold)
- **Tertiary Color**: #115814 (Forest Green)
- **Background**: #f5f5f5 (Cream)
- **Typography**: Playfair Display (headings), System fonts (body)

## 📧 Contact Forms

The website includes several contact forms:
- General contact form
- Property reservation requests
- Event planning inquiries
- Concierge service requests

All forms use server actions with Zod validation and Resend for email delivery.

## 🚀 Deployment

The site is configured for deployment on Vercel:

```bash
npm run build
```

Environment variables needed for production:
- `RESEND_API_KEY`
- `RECIPIENT_EMAIL`

## 📱 Features

### Properties
- Luxury penthouse with jacuzzi and BBQ terrace
- Cozy studio apartment near the beach
- Detailed property pages with image galleries
- Room-by-room photo collections

### Concierge Services
- Restaurant reservations
- Private transportation
- Event planning
- Childcare services

### Event Planning
- Multiple venue options
- Capacity for up to 80 guests
- Cultural celebration support
- Custom event arrangements

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

### Code Quality

- ESLint configuration for Next.js and TypeScript
- Prettier for code formatting
- TypeScript for type safety
- Responsive design with Tailwind CSS

## 📄 License

This project is proprietary and confidential. All rights reserved.

## 📞 Contact

- **Email**: keremliving@gmail.com
- **Phone**: +33 6 51 17 99 25 / +972 52 686 9791
- **Instagram**: [@or_hakerem](https://www.instagram.com/or_hakerem/)

---

Built with ❤️ for luxury hospitality in Tel Aviv