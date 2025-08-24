import { motion } from "framer-motion";

export function LoadingSpinner() {
  return (
    <div className="loading-container">
      <motion.div 
        className="loading-spinner"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <div className="spinner-inner"></div>
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="loading-text"
      >
        Loading GPU Resources...
      </motion.p>
    </div>
  );
}

export function PremiumButton({ 
  children, 
  onClick, 
  disabled = false, 
  variant = "primary",
  className = "",
  ...props 
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "danger";
  className?: string;
  [key: string]: unknown;
}) {
  return (
    <motion.button
      className={`btn btn-${variant} ${className}`}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export function GlassCard({ 
  children, 
  className = "",
  premium = false,
  ...props 
}: {
  children: React.ReactNode;
  className?: string;
  premium?: boolean;
  [key: string]: unknown;
}) {
  return (
    <motion.div
      className={`card ${premium ? 'card-premium' : ''} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.2 }
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StatusBadge({ 
  status, 
  className = "" 
}: { 
  status: "idle" | "streaming" | "active" | "completed";
  className?: string;
}) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "streaming":
      case "active":
        return {
          className: "status-streaming",
          text: "STREAMING",
          icon: "🟢"
        };
      case "idle":
        return {
          className: "status-idle",
          text: "AVAILABLE",
          icon: "⚪"
        };
      case "completed":
        return {
          className: "status-completed",
          text: "COMPLETED",
          icon: "✅"
        };
      default:
        return {
          className: "status-idle",
          text: "UNKNOWN",
          icon: "❓"
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <motion.div 
      className={`listing-status ${config.className} ${className}`}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
    >
      <span>{config.icon}</span> {config.text}
    </motion.div>
  );
}

export function MetricCard({ 
  icon, 
  value, 
  label, 
  color = "green" 
}: {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  color?: "green" | "blue" | "purple" | "orange";
}) {
  const colorMap = {
    green: "text-green-400",
    blue: "text-blue-400", 
    purple: "text-purple-400",
    orange: "text-orange-400"
  };

  return (
    <motion.div 
      className="balance-display"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
    >
      <div className={`w-3 h-3 mx-auto mb-2 ${colorMap[color]}`}>
        {icon}
      </div>
      <motion.div 
        className="balance-amount"
        key={value}
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {value}
      </motion.div>
      <div className="balance-label">{label}</div>
    </motion.div>
  );
}
