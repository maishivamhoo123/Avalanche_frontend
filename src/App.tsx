import { useEffect, useState } from "react";
import axios from "axios";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";
import { formatAddress } from "./utils/address";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CpuChipIcon, 
  WalletIcon, 
  PlayIcon, 
  StopIcon, 
  EyeIcon, 
  ChartBarIcon,
  ClockIcon,
  CurrencyDollarIcon,
  SignalIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import { SimpleBackground3D } from "./components/Scene3D";
import { LoadingSpinner, PremiumButton, StatusBadge, MetricCard } from "./components/UIComponents";
import { HeroAnimations } from "./components/HeroAnimations";
import { CustomCursor, ScrollProgress } from "./components/CustomCursor";

import { nextId, getListing, createListing, startSession as startSess, stopSession as stopSess, initializeDemoMode } from "./lib/contract";
import { perHourToPerSec, tokensPerSecToFlowRateWei, startStream, stopStream, setDemoMode } from "./lib/superfluid";
import "./App.css";

type Listing = {
  id: number;
  provider: string;
  superTokenSymbol: string;
  flowRate: bigint;
  title: string;
  specsCID: string;
  activeRenter: string;
  status: number; // 0 Idle, 1 Streaming
  exists: boolean;
};

const BACKEND = "https://avalnche-team1.onrender.com";

export default function App() {
  // Wallet connection hooks
  const { address, isConnected } = useAccount();
  const { connect, isPending: isConnecting, error: connectError } = useConnect();
  const { disconnect } = useDisconnect();

  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState("");
  const [credentials, setCredentials] = useState<any>(null);
  const [showCredentials, setShowCredentials] = useState<boolean>(false);
  const [userBalance, setUserBalance] = useState<string>("0");
  const [activeStreams, setActiveStreams] = useState<any[]>([]);
  const [paymentHistory, setPaymentHistory] = useState<any[]>([]);

  // Create form
  const [title, setTitle] = useState("");
  const [specsCID, setSpecsCID] = useState("");
  const [superTokenSymbol, setSuperTokenSymbol] = useState("fDAIx");
  const [ratePerHour, setRatePerHour] = useState(1); // tokens/hour
  const [statusMsg, setStatusMsg] = useState("");

  // Debug MetaMask availability
  useEffect(() => {
    const checkMetaMask = () => {
      const ethereum = (window as any).ethereum;
      const info = [
        `Ethereum available: ${typeof ethereum !== 'undefined'}`,
        `Is MetaMask: ${ethereum?.isMetaMask || false}`,
        `Is connected: ${ethereum?.isConnected() || false}`,
        `Accounts: ${ethereum?.selectedAddress || 'none'}`
      ].join('\n');
      setDebugInfo(info);
    };

    checkMetaMask();
    // Check every 2 seconds
    const interval = setInterval(checkMetaMask, 2000);
    return () => clearInterval(interval);
  }, []);

  // Initialize demo mode
  useEffect(() => {
    initializeDemoMode();
    // Also initialize Superfluid demo mode for unsupported networks
    setDemoMode(true);
  }, []);

  // Demo credentials for testing
  function getDemoCredentials(listingId: number) {
    const demoCreds = {
      0: { 
        anydeskId: "123456789", 
        anydeskPassword: "testpass123", 
        note: "High-Performance GPU - RTX 4090 with 24GB VRAM" 
      },
      1: { 
        anydeskId: "987654321", 
        anydeskPassword: "demo456", 
        note: "Intel i9-13900K CPU with 64GB RAM" 
      }
    };
    return demoCreds[listingId as keyof typeof demoCreds];
  }

  // Track user balance and payments
  async function updateUserBalance() {
    if (!isConnected || !address) return;
    
    try {
      // In demo mode, simulate balance
      const demoBalance = "1000.00"; // Demo balance in tokens
      setUserBalance(demoBalance);
    } catch (error) {
      console.log("Error fetching balance:", error);
      setUserBalance("0");
    }
  }

  // Add payment to history
  function addPaymentToHistory(payment: any) {
    const newPayment = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...payment
    };
    setPaymentHistory(prev => [newPayment, ...prev]);
  }

  // Track active streams
  function updateActiveStreams() {
    const active = listings.filter(l => l.status === 1 && l.activeRenter === address);
    setActiveStreams(active);
  }

  async function loadListings() {
    if (!isConnected) return;
    
    setLoading(true);
    try {
      const n = await nextId();
      const arr: Listing[] = [];
      for (let i = 0; i < n; i++) {
        const l = await getListing(i);
        if (l.exists) arr.push(l as any);
      }
      setListings(arr);
    } catch (e: any) {
      setStatusMsg(e?.message || "Failed to load listings");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { 
    if (isConnected) {
      loadListings();
      updateUserBalance();
    }
  }, [isConnected]);

  useEffect(() => {
    updateActiveStreams();
  }, [listings, address]);

  const handleConnect = async () => {
    try {
      setStatusMsg("Connecting to MetaMask...");
      console.log("Attempting to connect MetaMask...");
      
      // Check if MetaMask is available
      const ethereum = (window as any).ethereum;
      if (!ethereum) {
        setStatusMsg("MetaMask not found! Please install MetaMask extension.");
        return;
      }

      if (!ethereum.isMetaMask) {
        setStatusMsg("MetaMask not detected! Please make sure MetaMask is installed and enabled.");
        return;
      }

      // Try to connect
      await connect({ connector: injected() });
      setStatusMsg("MetaMask connection successful!");
    } catch (error: any) {
      console.error("Connection error:", error);
      setStatusMsg(`Connection failed: ${error?.message || 'Unknown error'}`);
    }
  };

  async function onCreate() {
    if (!isConnected) {
      setStatusMsg("Please connect your wallet first");
      return;
    }

    try {
      setStatusMsg("Creating listing...");
      const perSec = perHourToPerSec(ratePerHour);
      const flowRateWeiSec = tokensPerSecToFlowRateWei(perSec.toString(), 18);
      const hash = await createListing(superTokenSymbol, BigInt(flowRateWeiSec), title, specsCID);
      setStatusMsg("Transaction sent: " + hash);
      setTimeout(loadListings, 4000);
    } catch (e: any) {
      setStatusMsg(e?.reason || e?.message || "Create failed");
    }
  }

  async function onStart(listing: Listing) {
    if (!isConnected) {
      setStatusMsg("Please connect your wallet first");
      return;
    }

    try {
      setStatusMsg("Starting stream + session...");
      // 1) Start Superfluid stream
      const tx1 = await startStream({
        superTokenSymbol: listing.superTokenSymbol,
        receiver: listing.provider,
        flowRateWeiPerSec: listing.flowRate.toString(),
      });
      // 2) Mark session started in contract
      const tx2 = await startSess(listing.id);
      setStatusMsg(`Streaming tx: ${tx1}, session tx: ${tx2}`);

      // 3) Track payment
      const paymentInfo = {
        type: "stream_start",
        listingId: listing.id,
        listingTitle: listing.title,
        provider: listing.provider,
        flowRate: listing.flowRate.toString(),
        superToken: listing.superTokenSymbol,
        streamTxHash: tx1,
        sessionTxHash: tx2,
        amount: "0.00", // Will be calculated over time
        status: "active"
      };
      addPaymentToHistory(paymentInfo);

      // 4) Fetch credentials from backend and show
      try {
        const resp = await axios.get(`${BACKEND}/api/credentials/${listing.id}`, { 
          params: { renter: address } 
        });
        setCredentials(resp.data);
        setShowCredentials(true);
      } catch (credError: any) {
        // If backend fails, try demo credentials
        console.log("Backend credentials failed, trying demo mode:", credError.message);
        const demoCredentials = getDemoCredentials(listing.id);
        if (demoCredentials) {
          setCredentials(demoCredentials);
          setShowCredentials(true);
        }
      }
      
      setTimeout(loadListings, 4000);
    } catch (e: any) {
      setStatusMsg(e?.response?.data?.error || e?.reason || e?.message || "Start failed");
    }
  }

  async function onStop(listing: Listing) {
    if (!isConnected) {
      setStatusMsg("Please connect your wallet first");
      return;
    }

    try {
      setStatusMsg("Stopping stream + session...");
      const tx1 = await stopStream({
        superTokenSymbol: listing.superTokenSymbol,
        receiver: listing.provider,
      });
      const tx2 = await stopSess(listing.id);

      // Track payment completion
      const stopPaymentInfo = {
        type: "stream_stop",
        listingId: listing.id,
        listingTitle: listing.title,
        provider: listing.provider,
        streamTxHash: tx1,
        sessionTxHash: tx2,
        amount: "0.00", // Total amount paid
        status: "completed"
      };
      addPaymentToHistory(stopPaymentInfo);

      // Optional: notify provider
      await axios.post(`${BACKEND}/api/notify/stop`, { id: listing.id });

      setStatusMsg(`Stopped. Stream tx: ${tx1}, session tx: ${tx2}`);
      setTimeout(loadListings, 4000);
    } catch (e: any) {
      setStatusMsg(e?.response?.data?.error || e?.reason || e?.message || "Stop failed");
    }
  }

  // Wallet connection section with stunning design
  if (!isConnected) {
    return (
      <div className="app-container">
        <CustomCursor />
        <SimpleBackground3D />
        
        <div className="wallet-connection">
          <motion.div 
            className="wallet-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="wallet-card">
              <motion.div 
                className="wallet-icon"
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <WalletIcon className="w-10 h-10 text-white" />
              </motion.div>
              
              <h1 style={{ 
                fontSize: '2.5rem', 
                fontWeight: '900', 
                background: 'var(--gradient-accent)', 
                backgroundClip: 'text', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent', 
                marginBottom: '1rem',
                textAlign: 'center'
              }}>
                GPU Marketplace
              </h1>
              <p style={{ 
                fontSize: '1.1rem', 
                color: 'rgba(255, 255, 255, 0.8)', 
                marginBottom: '2rem',
                textAlign: 'center',
                lineHeight: '1.5'
              }}>
                Connect your wallet to access the next-generation streaming marketplace for GPU/CPU resources
              </p>
              
              <PremiumButton 
                variant="primary"
                onClick={handleConnect}
                disabled={isConnecting}
                style={{ marginBottom: '2rem', minWidth: '250px' }}
              >
                {isConnecting ? "Connecting..." : "Connect MetaMask"}
              </PremiumButton>

              {connectError && (
                <motion.div 
                  className="error-message"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <strong>Connection Error:</strong> {connectError.message}
                </motion.div>
              )}

              <div className="debug-section">
                <h3 className="debug-title">System Status</h3>
                <div className="debug-info">{debugInfo}</div>
              </div>

              <div style={{ marginTop: "2rem", textAlign: "left" }}>
                <h3 style={{ color: 'var(--accent-green)', marginBottom: '1rem' }}>
                  Quick Setup Guide:
                </h3>
                <ul style={{ 
                  textAlign: "left", 
                  color: 'rgba(255, 255, 255, 0.8)',
                  lineHeight: '1.8'
                }}>
                  <li>✓ Install MetaMask browser extension</li>
                  <li>✓ Unlock MetaMask wallet</li>
                  <li>✓ Allow popups for this domain</li>
                  <li>✓ Switch to Polygon Amoy testnet</li>
                  <li>✓ Refresh page if needed</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <CustomCursor />
      <ScrollProgress />
      <SimpleBackground3D />
      
      {/* Navigation */}
      <nav className="nav-container">
        <div className="nav-content">
          <motion.div 
            className="nav-logo"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <CpuChipIcon className="w-3 h-3 inline mr-2" />
            GPU Marketplace
          </motion.div>
          
          <div className="nav-wallet">
            <div className="wallet-address">
              {formatAddress(address)}
            </div>
            <PremiumButton 
              variant="secondary"
              onClick={() => disconnect()}
            >
              Disconnect
            </PremiumButton>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        
        {/* Hero Section */}
        <motion.section 
          className="hero-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{ minHeight: 'auto', padding: '4rem 0', position: 'relative' }}
        >
          <HeroAnimations />
          <div className="hero-content">
            <motion.h1 
              className="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Next-Gen Computing
            </motion.h1>
            <motion.p 
              className="hero-subtitle"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Stream powerful GPU and CPU resources on-demand with real-time payments
            </motion.p>
          </div>
        </motion.section>

        {/* Stats Grid */}
        <motion.div 
          className="stats-grid"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <MetricCard 
            icon={<ChartBarIcon />}
            value={`${userBalance} fDAIx`}
            label="Your Balance"
            color="green"
          />
          
          <MetricCard 
            icon={<SignalIcon />}
            value={activeStreams.length}
            label="Active Streams"
            color="blue"
          />
          
          <MetricCard 
            icon={<ClockIcon />}
            value={paymentHistory.length}
            label="Transactions"
            color="purple"
          />
        </motion.div>

        {/* Create Listing Form */}
        <motion.section 
          className="form-container"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2 style={{ marginBottom: '2rem', color: 'var(--pure-white)' }}>
            <CpuChipIcon style={{ width: '30px', height: '30px', display: 'inline', marginRight: '8px', verticalAlign: 'middle' }} />
            Create New Listing
          </h2>
          
          <div className="form-grid">
            <div className="input-group">
              <label className="input-label">Resource Title</label>
              <input 
                className="input-field"
                value={title} 
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g., RTX 4090 GPU Server"
              />
            </div>
            
            <div className="input-group">
              <label className="input-label">Specs CID (IPFS)</label>
              <input 
                className="input-field"
                value={specsCID} 
                onChange={e => setSpecsCID(e.target.value)}
                placeholder="IPFS hash for specifications"
              />
            </div>
            
            <div className="input-group">
              <label className="input-label">Payment Token</label>
              <input 
                className="input-field"
                value={superTokenSymbol} 
                onChange={e => setSuperTokenSymbol(e.target.value)}
                placeholder="fDAIx"
              />
            </div>
            
            <div className="input-group">
              <label className="input-label">Rate (tokens/hour)</label>
              <input 
                className="input-field"
                type="number" 
                value={ratePerHour} 
                step={0.01} 
                onChange={e => setRatePerHour(Number(e.target.value))}
                placeholder="1.00"
              />
            </div>
          </div>
          
          <PremiumButton 
            variant="primary"
            onClick={onCreate}
            style={{ width: '100%', marginTop: '1rem' }}
          >
            Create Listing
          </PremiumButton>
        </motion.section>

        {/* Listings Grid */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <h2 style={{ marginBottom: '2rem', color: 'var(--pure-white)' }}>
            Available Resources
          </h2>
          
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="listings-grid">
              <AnimatePresence>
                {listings.map((listing, index) => (
                  <motion.div
                    key={listing.id}
                    className="listing-card"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ 
                      y: -8,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <StatusBadge 
                      status={listing.status === 1 ? "streaming" : "idle"}
                    />
                    
                    <div className="card-header">
                      <h3 className="card-title">{listing.title}</h3>
                    </div>
                    
                    <div className="listing-info">
                      <div className="info-row">
                        <span className="info-label">Provider:</span>
                        <span className="info-value">{formatAddress(listing.provider)}</span>
                      </div>
                      
                      <div className="info-row">
                        <span className="info-label">Token:</span>
                        <span className="info-value">{listing.superTokenSymbol}</span>
                      </div>
                      
                      <div className="info-row">
                        <span className="info-label">Flow Rate:</span>
                        <span className="info-value">{listing.flowRate.toString()} wei/sec</span>
                      </div>
                      
                      {listing.status === 1 && listing.activeRenter && (
                        <div className="info-row">
                          <span className="info-label">Active Renter:</span>
                          <span className="info-value">{formatAddress(listing.activeRenter)}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="listing-actions">
                      <motion.button 
                        className={`btn ${listing.status === 1 ? 'btn-secondary' : 'btn-primary'}`}
                        onClick={() => onStart(listing)} 
                        disabled={listing.status === 1}
                        whileHover={{ scale: listing.status === 1 ? 1 : 1.05 }}
                        whileTap={{ scale: listing.status === 1 ? 1 : 0.95 }}
                      >
                        <PlayIcon />
                        <span>Start Stream</span>
                      </motion.button>
                      
                      <motion.button 
                        className={`btn ${listing.status === 0 ? 'btn-secondary' : 'btn-danger'}`}
                        onClick={() => onStop(listing)} 
                        disabled={listing.status === 0}
                        whileHover={{ scale: listing.status === 0 ? 1 : 1.05 }}
                        whileTap={{ scale: listing.status === 0 ? 1 : 0.95 }}
                      >
                        <StopIcon />
                        <span>Stop Stream</span>
                      </motion.button>
                      
                      {listing.status === 1 && listing.activeRenter === address && (
                        <motion.button 
                          className="btn btn-primary"
                          onClick={() => {
                            const demoCreds = getDemoCredentials(listing.id);
                            if (demoCreds) {
                              setCredentials(demoCreds);
                              setShowCredentials(true);
                            }
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <EyeIcon />
                          <span>View Access</span>
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {listings.length === 0 && (
                <motion.div 
                  className="card"
                  style={{ textAlign: 'center', padding: '4rem' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <CpuChipIcon className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <div style={{ fontSize: '1.2rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                    No resources available yet
                  </div>
                  <p style={{ color: 'rgba(255, 255, 255, 0.5)', marginTop: '1rem' }}>
                    Be the first to list your GPU/CPU resources!
                  </p>
                </motion.div>
              )}
            </div>
          )}
        </motion.section>

        {/* Payment History */}
        {paymentHistory.length > 0 && (
          <motion.section 
            className="payment-history"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <h2 style={{ marginBottom: '2rem', color: 'var(--pure-white)' }}>
              <CurrencyDollarIcon style={{ width: '30px', height: '30px', display: 'inline', marginRight: '8px', verticalAlign: 'middle' }} />
              Payment History
            </h2>
            
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              <AnimatePresence>
                {paymentHistory.map((payment, index) => (
                  <motion.div
                    key={payment.id}
                    className="payment-item"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="payment-info">
                      <div className="payment-title">
                        {payment.type === "stream_start" ? "🟢 Stream Started" : "🔴 Stream Stopped"}
                      </div>
                      <div className="payment-details">
                        {payment.listingTitle} • {new Date(payment.timestamp).toLocaleString()}
                      </div>
                      {payment.streamTxHash && (
                        <div style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.5)' }}>
                          TX: {payment.streamTxHash.substring(0, 20)}...
                        </div>
                      )}
                    </div>
                    <div className="payment-amount">
                      {payment.superToken}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.section>
        )}
      </main>

      {/* Status Message */}
      <AnimatePresence>
        {statusMsg && (
          <motion.div 
            className="status-container"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
          >
            <div className="status-message">
              {statusMsg}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Credentials Modal */}
      <AnimatePresence>
        {showCredentials && credentials && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCredentials(false)}
          >
            <motion.div 
              className="modal"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2 className="modal-title">
                  🔐 Remote Access Credentials
                </h2>
                <button 
                  className="modal-close"
                  onClick={() => setShowCredentials(false)}
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </div>
              
              <div className="credentials-container">
                <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '2rem' }}>
                  Use these credentials to connect to your remote machine via AnyDesk:
                </p>
                
                <div className="credential-field">
                  <div className="credential-label">AnyDesk ID</div>
                  <div className="credential-value">{credentials.anydeskId}</div>
                </div>
                
                <div className="credential-field">
                  <div className="credential-label">Password</div>
                  <div className="credential-value">{credentials.anydeskPassword}</div>
                </div>
                
                {credentials.note && (
                  <div className="credential-field">
                    <div className="credential-label">System Info</div>
                    <div className="credential-value" style={{ fontSize: '1rem' }}>
                      {credentials.note}
                    </div>
                  </div>
                )}
              </div>
              
              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <PremiumButton 
                  variant="primary"
                  onClick={() => setShowCredentials(false)}
                >
                  Got it!
                </PremiumButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
