# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
# Property Management Dashboard

A comprehensive property management dashboard built with React, TypeScript, Vite, and shadcn/ui.

## Features

- 📊 Multi-chart dashboard with 6 chart types (Area, Bar, Line, Pie, Donut, Radar, Radial)
- 🎨 Consistent theme system with customizable colors
- 📱 Responsive design
- 🌙 Dark mode support
- 🔄 Real-time data visualization
- 📈 Property management metrics tracking

## Tech Stack

- **React 19** with TypeScript
- **Vite** for build tooling
- **shadcn/ui** for UI components
- **Recharts** for chart visualizations
- **Highcharts** for 3D pie charts
- **Tailwind CSS** for styling
- **Lucide React** for icons

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Deployment on Vercel

This project is configured for easy deployment on Vercel.

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. For production deployment:
```bash
vercel --prod
```

### Option 2: Deploy via GitHub

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will automatically detect Vite and configure the build settings
6. Click "Deploy"

### Vercel Configuration

The project includes `vercel.json` with the following settings:
- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **SPA Routing**: All routes redirect to `index.html` for client-side routing

### Environment Variables

If you need to add environment variables:
1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add your variables
4. Redeploy

## Project Structure

```
src/
├── components/
│   ├── dashboard/        # Dashboard components and charts
│   ├── layout/           # Layout components (Sidebar, etc.)
│   └── ui/               # shadcn/ui components
├── lib/
│   ├── chart-theme.tsx   # Chart theme configuration
│   └── utils.ts          # Utility functions
└── App.tsx               # Main app component
```

## Chart Types

- **Area Chart**: 5-year revenue & contract trends
- **Bar Chart**: Manager performance comparison
- **Line Chart**: Collection trends over months
- **Pie Chart**: Commercial vs Residential distribution
- **Donut Chart**: Sectors & number of tenants
- **Radar Chart**: Overall performance metrics
- **Radial Chart**: Collection rate by zone
- **3D Pie Chart**: Annual income chart (5 years)

## Customization

### Changing Chart Themes

The dashboard includes a theme selector that allows you to switch between:
- Default (Blue/Gray palette)
- Blue theme
- Green theme
- Purple theme

You can add more themes in `src/lib/chart-theme.tsx`

## License

Private project
