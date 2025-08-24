# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# 🚀 GPU Marketplace - Premium 3D Experience

A stunning, next-generation GPU/CPU streaming marketplace built with cutting-edge web technologies and premium design aesthetics.

## ✨ Features

### 🎨 **Premium Design System**
- **Pure Black, White, Dark Green & Deep Blue** color palette
- **Glassmorphism** UI elements with backdrop blur effects
- **Premium gradients** and modern typography (Inter font)
- **Responsive design** optimized for all devices

### 🌟 **3D Visual Effects**
- **Animated particle system** with interconnected nodes
- **Floating 3D geometric shapes** with physics-based animations
- **Dynamic background grid** with continuous movement
- **Hero animations** with floating tech icons
- **Gradient orbs** with blur effects for depth

### 🎭 **Advanced Animations**
- **Framer Motion** powered smooth transitions
- **Staggered animations** for listing cards and UI elements
- **Hover effects** with scale and glow transformations
- **Loading spinner** with dual-ring rotation
- **Status badges** with spring animations

### 🎯 **Interactive Elements**
- **Custom cursor** with hover detection and trail effect
- **Scroll progress indicator** at the top of the page
- **Premium buttons** with wave hover effects
- **Glass cards** with depth and shadow effects
- **Metric cards** with animated value updates

### 🎵 **Sound Design** (Optional)
- **Hover sound effects** for interactive elements
- **Click feedback** with dual-tone confirmation
- **Success/Error audio** for transaction feedback
- **Connection sounds** for wallet interactions

### 🔧 **Technical Features**
- **Web3 Integration** with MetaMask connectivity
- **Real-time streaming** payment system using Superfluid
- **Smart contract** interactions for GPU/CPU listings
- **Payment history** tracking with animated timeline
- **Credential management** with secure modal display

## 🛠️ Technologies Used

### Core Framework
- **React 19** with TypeScript
- **Vite** for blazing-fast development
- **ESLint** for code quality

### 3D & Animation
- **Three.js** for 3D rendering
- **@react-three/fiber** React renderer for Three.js
- **@react-three/drei** useful helpers and abstractions
- **Framer Motion** for advanced animations
- **Custom particle system** with Canvas API

### UI & Styling
- **Custom CSS** with CSS variables and modern features
- **Glassmorphism** design patterns
- **Google Fonts** (Inter) for premium typography
- **Heroicons** for beautiful SVG icons
- **Responsive grid** layouts

### Web3 & Blockchain
- **Wagmi** for Ethereum interactions
- **Viem** for low-level Ethereum utilities
- **Superfluid SDK** for streaming payments
- **MetaMask** integration
- **Polygon Amoy** testnet support

## 🎨 Design Highlights

### Color Palette
```css
--pure-black: #000000
--pure-white: #ffffff
--dark-green: #004d40
--deep-blue: #0d1b2a
--accent-green: #00bfa5
--accent-blue: #1976d2
```

### Visual Effects
- **Backdrop blur**: `blur(20px)` for glass effects
- **Box shadows**: Multi-layered shadows for depth
- **Gradients**: Linear and radial gradients for visual interest
- **Animations**: Spring physics and easing curves
- **Transforms**: 3D transforms and perspective effects

## 🚀 Getting Started

### Prerequisites
- Node.js 20.19+ or 22.12+
- npm or yarn
- MetaMask browser extension

### Installation
```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Start development server
npm run dev
```

### Development
```bash
# Run development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🌐 Live Demo

Visit `http://localhost:5173` after running `npm run dev`

## 📱 Features Overview

### Wallet Connection
- **Stunning connection flow** with animated icons
- **Real-time MetaMask** detection and status
- **Error handling** with helpful troubleshooting
- **Connection status** display in navigation

### GPU/CPU Listings
- **Create listings** with premium form design
- **View available resources** in animated grid
- **Start/stop streaming** with transaction tracking
- **Real-time status updates** with badges

### Payment System
- **Balance tracking** with animated counters
- **Active streams** monitoring
- **Payment history** with timeline view
- **Transaction status** with visual feedback

### Remote Access
- **Secure credentials** modal with copy functionality
- **AnyDesk integration** for remote connections
- **Session management** with automatic cleanup

## 🎯 Performance Optimizations

- **Code splitting** with dynamic imports
- **Lazy loading** for heavy 3D components
- **Optimized animations** with GPU acceleration
- **Efficient re-renders** with React optimizations
- **Asset optimization** with Vite bundling

## 🔒 Security Features

- **Secure credential** handling and display
- **Transaction verification** before execution
- **Error boundaries** for graceful failure handling
- **Input validation** for all user inputs

## 📈 Future Enhancements

- **VR/AR support** for immersive 3D experience
- **Advanced 3D models** with Spline integration
- **Real-time collaboration** features
- **Advanced analytics** dashboard
- **Mobile app** with React Native

## 🤝 Contributing

We welcome contributions! Please feel free to submit issues and enhancement requests.

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ and cutting-edge web technologies for the future of decentralized computing.**

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
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
