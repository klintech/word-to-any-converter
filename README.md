# 📝 Word to Any Converter

A modern, AI-powered document converter built with **Next.js 15**, **React 19**, and **Tailwind CSS**. Easily convert `.docx`, `.pdf`, and `.odt` files into multiple formats including `.txt`, `.html`, `.rtf`, `.markdown`, `.epub`, and more — all through a beautiful and intuitive interface.


---

## 🚀 Live Demo

👉 [View App on Vercel](https://word-converter-mu.vercel.app/)

---

## 🔧 Features

- 📁 Drag & Drop file upload or click-to-select
- 🔄 Convert to: PDF, TXT, Markdown, HTML, RTF, EPUB, ODT
- 📌 Rename converted files before download
- ⏳ Real-time progress indicators
- 📱 Fully responsive, mobile-first design
- ♿️ Accessible UI (ARIA labels + semantic HTML)
- 🌙 Light/Dark mode toggle
- ⚠️ File type validation with error handling

---

## 🛠️ Tech Stack

| Tech                 | Description                                      |
|----------------------|--------------------------------------------------|
| **Next.js 15.2.4**   | React-based framework with App Router support     |
| **React 19**         | Core UI library for components and logic          |
| **TypeScript 5**     | Typed JavaScript for safer, scalable code         |
| **Tailwind CSS**     | Utility-first CSS framework for custom UI design |
| **Shadcn/ui**        | Prebuilt modern components using Radix UI        |
| **Lucide React**     | Beautiful icon library                           |
| **CVA & clsx**       | Dynamic styling with variants                    |

---

## 🗂️ Project Structure

```bash
.
├── app/                 # App Router pages & layouts
├── components/          # Reusable UI components
├── lib/                 # Utility functions & helpers
├── public/              # Static files (icons, preview images)
├── styles/              # Global styles
├── tailwind.config.ts   # Tailwind configuration
├── tsconfig.json        # TypeScript settings
└── next.config.mjs      # Next.js custom configuration

# 1. Clone the repository
git clone https://github.com/klintech/word-to-any-converter.git
cd word-to-any-converter

# 2. Install dependencies
npm install

# 3. Run the development server
npm run dev
