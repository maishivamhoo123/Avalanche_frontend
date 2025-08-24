# 🚀 Avalanche GPU Marketplace - Premium 3D Experience

A revolutionary, next-generation decentralized marketplace for GPU/CPU streaming services built with cutting-edge web technologies, immersive 3D graphics, and premium design aesthetics. Leveraging the power of Avalanche blockchain technology and Superfluid's streaming payment infrastructure to create the future of computational resource sharing.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.3-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-Latest-000000?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12.23.12-0055FF?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)

## 🌟 Overview

The Avalanche GPU Marketplace represents a paradigm shift in computational resource sharing, combining the power of decentralized finance with cutting-edge 3D web experiences. This platform enables users to seamlessly rent and provide GPU/CPU resources through real-time streaming payments, all wrapped in a stunning visual interface that sets new standards for Web3 applications.

### 🎯 Key Value Propositions

- **🔥 Instant Resource Access**: Connect to high-performance GPU/CPU resources within seconds
- **💰 Real-time Payments**: Stream payments automatically using Superfluid's money streaming protocol
- **🌐 Decentralized Infrastructure**: Built on Avalanche for fast, low-cost transactions
- **🎨 Premium UX**: Immersive 3D interface with glassmorphism design and advanced animations
- **🔒 Secure & Trustless**: Smart contract-based escrow and credential management

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Technology Stack](#️-technology-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Usage Guide](#-usage-guide)
- [Smart Contracts](#-smart-contracts)
- [API Reference](#-api-reference)
- [Development](#-development)
- [Deployment](#-deployment)
- [Security](#-security)
- [Performance](#-performance)
- [Contributing](#-contributing)
- [License](#-license)
- [Support](#-support)

## ✨ Features

### 🎨 **Premium Design System**
- **Sophisticated Color Palette**: Pure Black (#000000), Pure White (#FFFFFF), Dark Green (#004d40), Deep Blue (#0d1b2a)
- **Glassmorphism UI**: Advanced backdrop blur effects with multi-layered depth
- **Premium Typography**: Inter font family with optimized weight variations
- **Responsive Design**: Mobile-first approach with fluid breakpoints and adaptive layouts

### 🌟 **Immersive 3D Visual Effects**
- **Particle System**: Real-time Canvas-based particle network with physics simulation
- **3D Geometric Shapes**: Three.js powered floating cubes with MeshDistortMaterial
- **Dynamic Backgrounds**: Animated grid patterns and gradient orbs with continuous movement
- **Hero Animations**: Physics-based floating technology icons with realistic motion
- **Depth Effects**: Multi-layer Z-index management for true dimensional experience

### 🎭 **Advanced Animation Framework**
- **Framer Motion Integration**: Spring physics and gesture-based interactions
- **Staggered Animations**: Choreographed entrance animations for UI elements
- **Microinteractions**: Hover effects, click feedback, and state transitions
- **Loading States**: Sophisticated dual-ring spinners and progress indicators
- **Status Animations**: Real-time badge updates with spring-based transitions

### 🎯 **Interactive Experience**
- **Custom Cursor System**: Dynamic cursor with trail effects and hover detection
- **Scroll Progress**: Visual scroll indicator with smooth interpolation
- **Premium Controls**: Wave-effect buttons with haptic-style feedback
- **Glass Cards**: Depth-based card system with realistic shadow casting
- **Metric Visualization**: Animated counter components with easing functions

### 🔧 **Core Functionality**
- **Web3 Wallet Integration**: Seamless MetaMask connectivity with real-time status
- **Streaming Payments**: Superfluid SDK integration for continuous payment flows
- **Smart Contract Interface**: Direct blockchain interactions for resource listing/renting
- **Payment Analytics**: Comprehensive transaction history with visual timeline
- **Credential Management**: Secure modal system for remote access credentials
- **Resource Monitoring**: Real-time status tracking for active GPU/CPU sessions

### �️ **Security & Reliability**
- **Transaction Validation**: Multi-step verification before contract execution
- **Error Boundaries**: Graceful failure handling with user-friendly recovery
- **Input Sanitization**: Comprehensive validation for all user inputs
- **Demo Mode**: Fallback system for offline development and testing

## 🛠️ Technology Stack

### 🏗️ **Frontend Architecture**
```typescript
├── React 19.0.0          // Latest React with Concurrent Features
├── TypeScript 5.7.2      // Type-safe development
├── Vite 7.1.3            // Next-generation build tool
└── ESLint + Prettier     // Code quality and formatting
```

### 🎨 **3D Graphics & Animation**
```typescript
├── Three.js              // 3D rendering engine
├── @react-three/fiber    // React renderer for Three.js
├── @react-three/drei     // Helper components and abstractions
├── Framer Motion 12.23.12 // Advanced animation library
└── Custom Canvas API     // Particle systems and effects
```

### 🎭 **UI Framework & Styling**
```typescript
├── Custom CSS Variables  // Design system tokens
├── Glassmorphism         // Modern UI design patterns
├── Google Fonts (Inter)  // Premium typography
├── Heroicons 2.2.0      // Professional SVG icon library
└── CSS Grid & Flexbox    // Modern layout systems
```

### ⛓️ **Blockchain & Web3**
```typescript
├── Wagmi 2.16.4          // React hooks for Ethereum
├── Viem 2.0.0            // TypeScript Ethereum library
├── Superfluid SDK 0.9.0  // Streaming payment protocol
├── Ethers.js 5.8.0       // Ethereum JavaScript library
└── MetaMask Integration  // Wallet connectivity
```

### 🔧 **Development & Build Tools**
```typescript
├── Vite Development Server // Hot module replacement
├── TypeScript Compiler   // Static type checking
├── ESLint Configuration  // Code linting and standards
├── PostCSS Processing    // CSS transformations
└── Asset Optimization    // Image and bundle optimization
```

## 🏛️ Architecture

### 📁 **Project Structure**
```
src/
├── components/           # Reusable UI components
│   ├── Scene3D.tsx     # Three.js 3D scene management
│   ├── ParticleSystem.tsx # Canvas-based particle effects
│   ├── UIComponents.tsx # Premium UI component library
│   ├── HeroAnimations.tsx # Hero section animations
│   └── CustomCursor.tsx # Custom cursor implementation
├── lib/                 # Core business logic
│   ├── contract.ts     # Smart contract interactions
│   ├── superfluid.ts   # Streaming payment logic
│   └── utils/          # Utility functions
├── assets/             # Static assets and resources
├── styles/             # Global CSS and design tokens
└── types/              # TypeScript type definitions
```

### 🔄 **Data Flow Architecture**
```mermaid
graph TD
    A[User Interface] --> B[React Components]
    B --> C[Wagmi Hooks]
    C --> D[Viem/Ethers]
    D --> E[Smart Contracts]
    E --> F[Avalanche Network]
    
    B --> G[Superfluid SDK]
    G --> H[Stream Management]
    H --> F
    
    B --> I[Three.js Scene]
    I --> J[WebGL Renderer]
    J --> K[Canvas Output]
```

### 🎯 **Component Hierarchy**
```typescript
App
├── Scene3D (Three.js Canvas)
│   ├── FloatingCubes
│   ├── NetworkLines
│   └── Environment
├── ParticleSystem (Canvas API)
├── CustomCursor
├── Navigation
├── WalletConnection
├── GPUListings
│   ├── ListingCard[]
│   └── CreateListingForm
├── PaymentDashboard
│   ├── BalanceDisplay
│   ├── ActiveStreams
│   └── TransactionHistory
└── CredentialsModal
```

## 👨‍💻 Development

### 🏗️ **Project Setup for Contributors**

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/avalanche-gpu-marketplace.git
   cd avalanche-gpu-marketplace
   ```
3. **Create a new branch** for your feature:
   ```bash
   git checkout -b feature/amazing-new-feature
   ```
4. **Install dependencies** and start coding:
   ```bash
   npm install
   npm run dev
   ```

### 🎨 **Design System Guidelines**

#### **Color Palette**
```css
:root {
  /* Primary Colors */
  --pure-black: #000000;
  --pure-white: #ffffff;
  --dark-green: #004d40;
  --deep-blue: #0d1b2a;
  
  /* Accent Colors */
  --accent-green: #00bfa5;
  --accent-blue: #1976d2;
  --accent-purple: #7c4dff;
  
  /* Glassmorphism */
  --glass-bg: rgba(255, 255, 255, 0.1);
  --glass-border: rgba(255, 255, 255, 0.2);
  --glass-backdrop: blur(20px);
}
```

#### **Typography Scale**
```css
--font-size-xs: 0.75rem;    /* 12px */
--font-size-sm: 0.875rem;   /* 14px */
--font-size-base: 1rem;     /* 16px */
--font-size-lg: 1.125rem;   /* 18px */
--font-size-xl: 1.25rem;    /* 20px */
--font-size-2xl: 1.5rem;    /* 24px */
--font-size-3xl: 1.875rem;  /* 30px */
--font-size-4xl: 2.25rem;   /* 36px */
```

#### **Animation Guidelines**
- **Duration**: Use `150ms` for micro-interactions, `300ms` for component transitions
- **Easing**: Prefer `cubic-bezier(0.4, 0, 0.2, 1)` for natural motion
- **Transform**: Use `transform3d()` for GPU acceleration
- **Performance**: Animate only `transform` and `opacity` properties when possible

### 🧪 **Testing Strategy**

```bash
# Unit Tests
npm run test:unit

# Integration Tests  
npm run test:integration

# E2E Tests
npm run test:e2e

# Visual Regression Tests
npm run test:visual

# Performance Tests
npm run test:perf
```

### 📊 **Code Quality Standards**

- **TypeScript**: Strict mode enabled, no `any` types in production code
- **ESLint**: Extended React and TypeScript rules
- **Prettier**: Consistent code formatting
- **Husky**: Pre-commit hooks for quality gates
- **Conventional Commits**: Semantic commit message format

## 🚀 Deployment

### 🌍 **Production Deployment**

#### **Vercel (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
vercel --prod

# Custom domain configuration
vercel domains add yourdomain.com
```

#### **Netlify**
```bash
# Build the project
npm run build

# Deploy dist folder to Netlify
# Or connect GitHub repo for automatic deployments
```

#### **AWS S3 + CloudFront**
```bash
# Build for production
npm run build

# Upload to S3 bucket
aws s3 sync dist/ s3://your-bucket-name

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

### 🔧 **Environment Configuration**

#### **Production Environment Variables**
```env
# Mainnet Configuration
VITE_RPC_URL=https://rpc-mainnet.polygon.technology
VITE_MARKETPLACE_ADDRESS=0x... # Your deployed contract address
VITE_CHAIN_ID=137

# Performance Optimizations
VITE_ENABLE_3D=true
VITE_ENABLE_ANALYTICS=true
VITE_BUNDLE_ANALYZER=false

# Security
VITE_CSP_ENABLED=true
VITE_SECURITY_HEADERS=true
```

### 📈 **CI/CD Pipeline**

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 🚀 Getting Started

### 📋 **Prerequisites**

Ensure you have the following installed on your development machine:

- **Node.js**: Version 20.19+ or 22.12+ (LTS recommended)
- **npm**: Version 10+ or **yarn**: Version 1.22+
- **Git**: Latest version for version control
- **MetaMask**: Browser extension for Web3 interactions
- **Modern Browser**: Chrome 100+, Firefox 100+, Safari 16+, or Edge 100+

### ⚡ **Quick Start**

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/avalanche-gpu-marketplace.git
   cd avalanche-gpu-marketplace
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment configuration**
   ```bash
   cp .env.example .env.local
   # Configure your environment variables
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### 🔧 **Environment Variables**

Create a `.env.local` file in the root directory:

```env
# Blockchain Configuration
VITE_RPC_URL=https://rpc-amoy.polygon.technology
VITE_MARKETPLACE_ADDRESS=0xa6165bbb69f7e8f3d960220B5F28e990ea5F630D
VITE_CHAIN_ID=80002

# Application Configuration
VITE_APP_NAME="Avalanche GPU Marketplace"
VITE_APP_VERSION="1.0.0"

# Feature Flags
VITE_ENABLE_3D=true
VITE_ENABLE_SOUND=false
VITE_DEMO_MODE=false
```

### 🛠️ **Development Scripts**

```bash
# Development
npm run dev          # Start development server with hot reload
npm run dev:host     # Start server accessible on network

# Building
npm run build        # Build for production
npm run build:analyze # Build with bundle analysis

# Quality Assurance
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues automatically
npm run type-check   # Run TypeScript compiler check

# Testing
npm run test         # Run test suite
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Generate coverage report

# Preview & Deploy
npm run preview      # Preview production build locally
npm run deploy       # Deploy to production (configure as needed)
```

## 📖 Usage Guide

### 🔐 **Wallet Connection**

1. **Install MetaMask**: Download and install the MetaMask browser extension
2. **Network Configuration**: The app will automatically prompt to add Polygon Amoy testnet
3. **Connect Wallet**: Click the "Connect Wallet" button and approve the connection
4. **Account Status**: Your wallet address and balance will be displayed in the navigation

### � **Creating GPU/CPU Listings**

1. **Navigate to Listings**: Access the "Create Listing" section
2. **Fill Details**:
   - **Title**: Descriptive name for your resource (e.g., "RTX 4090 Gaming Rig")
   - **Specifications**: Hardware details and capabilities
   - **Pricing**: Set hourly rate in supported tokens (fDAIx, fUSDCx)
3. **Submit Transaction**: Confirm the smart contract transaction
4. **Listing Active**: Your resource is now available for rent

### 🔍 **Browsing & Renting Resources**

1. **Browse Marketplace**: View available GPU/CPU resources in the listings grid
2. **Filter Options**: Sort by price, performance, availability
3. **Resource Details**: Click on cards to view specifications and pricing
4. **Start Rental**: Click "Start Streaming" to begin the rental process
5. **Payment Stream**: Automatic streaming payments via Superfluid
6. **Access Credentials**: Receive secure remote access details

### 💰 **Payment Management**

1. **Balance Monitoring**: Real-time display of token balances
2. **Active Streams**: View all ongoing payment streams
3. **Transaction History**: Complete record of all marketplace activities
4. **Stream Control**: Start, modify, or stop payment streams as needed

### 🖥️ **Remote Access**

1. **Credentials Modal**: Secure display of connection details
2. **AnyDesk Integration**: One-click remote desktop access
3. **Session Management**: Monitor active sessions and usage
4. **Automatic Cleanup**: Sessions terminate when payments stop

## 📋 Smart Contracts

### 🏗️ **Marketplace Contract**

**Address**: `0xa6165bbb69f7e8f3d960220B5F28e990ea5F630D`  
**Network**: Polygon Amoy Testnet  
**Verified**: ✅ on PolygonScan

#### **Core Functions**

```solidity
// Create a new resource listing
function createListing(
    string memory superTokenSymbol,
    uint96 flowRate,
    string memory title,
    string memory specsCID
) external returns (uint256 listingId)

// Start renting a resource
function startStream(
    uint256 listingId,
    address superToken,
    uint96 flowRate
) external

// Stop an active rental
function stopStream(uint256 listingId) external

// Get listing details
function getListing(uint256 listingId) 
    external view returns (Listing memory)
```

#### **Data Structures**

```solidity
struct Listing {
    address provider;           // Resource owner
    string superTokenSymbol;    // Payment token
    uint96 flowRate;           // Payment rate (wei/second)
    string title;              // Resource name
    string specsCID;           // IPFS hash for specifications
    address activeRenter;      // Current renter (if any)
    Status status;             // AVAILABLE, RENTED, INACTIVE
    bool exists;               // Listing validity
}

enum Status {
    AVAILABLE,    // Ready for rent
    RENTED,       // Currently being used
    INACTIVE      // Temporarily unavailable
}
```

### 💸 **Superfluid Integration**

The platform leverages Superfluid's continuous payment streaming:

- **Real-time Payments**: Money flows every second during resource usage
- **No Periodic Transactions**: Eliminates need for manual payment intervals
- **Automatic Settlement**: Payments stop when resource access ends
- **Gas Efficient**: Single transaction starts/stops entire payment stream

#### **Supported Tokens**
- **fDAIx**: Fake DAI on testnet
- **fUSDCx**: Fake USDC on testnet
- **ETHx**: Wrapped ETH for streaming

## 🔧 API Reference

### 📡 **Core Hooks**

#### `useWalletConnection()`
```typescript
const {
  address,           // Connected wallet address
  isConnected,       // Connection status
  isConnecting,      // Loading state
  connect,           // Connection function
  disconnect,        // Disconnection function
  switchNetwork      // Network switching
} = useWalletConnection();
```

#### `useMarketplaceContract()`
```typescript
const {
  createListing,     // Create new listing
  getListings,       // Fetch all listings
  startRental,       // Begin resource rental
  stopRental,        // End resource rental
  getUserListings    // Get user's listings
} = useMarketplaceContract();
```

#### `useSuperfluids()`
```typescript
const {
  startStream,       // Initialize payment stream
  stopStream,        // Terminate payment stream
  getStreamData,     // Get stream information
  calculateFlowRate  // Convert hourly rate to flow rate
} = useSuperfluids();
```

### 🎨 **Component API**

#### `<PremiumButton />`
```typescript
interface PremiumButtonProps {
  variant: 'primary' | 'secondary' | 'outline';
  size: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}
```

#### `<Scene3D />`
```typescript
interface Scene3DProps {
  enableControls?: boolean;
  showStats?: boolean;
  backgroundColor?: string;
  cameraPosition?: [number, number, number];
}
```

## 🔒 Security

### 🛡️ **Security Features**

- **Secure Credential Handling**: Credentials are never stored in localStorage or transmitted unencrypted
- **Transaction Verification**: Multi-step validation before any blockchain transactions
- **Input Sanitization**: Comprehensive validation for all user inputs and contract interactions
- **Error Boundaries**: Graceful failure handling prevents application crashes
- **Rate Limiting**: Protection against spam transactions and abuse
- **CSP Headers**: Content Security Policy implementation for XSS protection

### 🔐 **Smart Contract Security**

- **Access Control**: Role-based permissions for critical functions
- **Reentrancy Protection**: Guards against reentrancy attacks
- **Integer Overflow**: SafeMath usage for all arithmetic operations
- **Pausable Contracts**: Emergency stop functionality for critical issues
- **Upgrade Patterns**: Proxy patterns for secure contract upgrades

### � **Security Audits**

- **Automated Scanning**: Continuous security monitoring with Slither
- **Manual Review**: Code review process for all security-critical changes
- **Penetration Testing**: Regular security assessments of the application
- **Bug Bounty**: Responsible disclosure program for security researchers

## ⚡ Performance

### 🚀 **Optimization Features**

- **Code Splitting**: Dynamic imports for optimal bundle size
- **Lazy Loading**: On-demand loading of heavy 3D components
- **Tree Shaking**: Eliminates unused code from production builds
- **Asset Optimization**: Image compression and format optimization
- **CDN Delivery**: Global content delivery for faster load times

### � **Performance Metrics**

```
Lighthouse Score (Production):
├── Performance: 95+ 🟢
├── Accessibility: 100 🟢
├── Best Practices: 100 🟢
└── SEO: 95+ 🟢

Bundle Analysis:
├── Initial Bundle: < 500KB
├── 3D Components: Lazy loaded
├── Vendor Chunks: Optimally split
└── Cache Strategy: Long-term caching
```

### 🎯 **Performance Monitoring**

- **Core Web Vitals**: Continuous monitoring of LCP, FID, CLS
- **Real User Monitoring**: Performance data from actual users
- **Bundle Analysis**: Regular bundle size monitoring and optimization
- **Memory Profiling**: WebGL memory usage tracking for 3D components

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### 🐛 **Bug Reports**

1. **Check existing issues** to avoid duplicates
2. **Use the bug report template** when creating new issues
3. **Provide detailed reproduction steps** and environment information
4. **Include screenshots or videos** when applicable

### ✨ **Feature Requests**

1. **Search existing feature requests** first
2. **Describe the problem** the feature would solve
3. **Propose a solution** with implementation details
4. **Consider backward compatibility** and breaking changes

### 💻 **Code Contributions**

1. **Fork the repository** and create a feature branch
2. **Follow coding standards** and write tests
3. **Update documentation** for any API changes
4. **Submit a pull request** with a clear description

### 📝 **Documentation**

- **Improve existing docs** with better examples
- **Add missing documentation** for new features
- **Translate documentation** to other languages
- **Create tutorials** and guides for common use cases

### 🎨 **Design Contributions**

- **UI/UX improvements** with Figma designs
- **3D model contributions** for enhanced visuals
- **Animation suggestions** for better user experience
- **Accessibility improvements** for inclusive design

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### 📋 **License Summary**

- ✅ **Commercial Use**: Use in commercial applications
- ✅ **Modification**: Modify and create derivative works
- ✅ **Distribution**: Distribute original or modified versions
- ✅ **Private Use**: Use privately without restrictions
- ❗ **Limitation**: Limited liability and warranty
- ❗ **Condition**: Must include license and copyright notice

## 📞 Support

### 🆘 **Getting Help**

- **📖 Documentation**: Start with this README and inline code comments
- **💬 Discord**: Join our community server for real-time support
- **🐛 GitHub Issues**: Report bugs and request features
- **📧 Email**: Contact us at support@avalanche-gpu-marketplace.com

### 🔗 **Useful Links**

- **🌐 Live Demo**: [https://avalanche-gpu-marketplace.vercel.app](https://avalanche-gpu-marketplace.vercel.app)
- **📊 Analytics**: [Performance Dashboard](https://analytics.example.com)
- **🎨 Design System**: [Figma Design Files](https://figma.com/example)
- **📚 API Docs**: [Developer Documentation](https://docs.example.com)

### 🏆 **Community**

- **🐦 Twitter**: [@AvalancheGPU](https://twitter.com/avalanchegpu)
- **📱 Telegram**: [Community Chat](https://t.me/avalanchegpu)
- **📰 Medium**: [Technical Blog](https://medium.com/@avalanchegpu)
- **🎥 YouTube**: [Tutorial Channel](https://youtube.com/@avalanchegpu)

---

<div align="center">

**🚀 Built with ❤️ for the future of decentralized computing**

[![Made with React](https://img.shields.io/badge/Made%20with-React-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Powered by Avalanche](https://img.shields.io/badge/Powered%20by-Avalanche-E84142?style=for-the-badge&logo=avalanche)](https://www.avax.network/)
[![Superfluid Streaming](https://img.shields.io/badge/Superfluid-Streaming-00D395?style=for-the-badge)](https://superfluid.finance/)

**⭐ Star us on GitHub if this project helped you!**

</div>
