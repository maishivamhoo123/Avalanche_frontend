import { motion } from 'framer-motion';
import { CpuChipIcon, BoltIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: { 
    scale: 1, 
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15
    }
  },
  hover: {
    scale: 1.2,
    rotate: 10,
    transition: {
      type: "spring",
      stiffness: 300
    }
  }
};

export function HeroAnimations() {
  return (
    <motion.div
      className="hero-animations"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1
      }}
    >
      {/* Floating GPU Icon */}
      <motion.div
        variants={iconVariants}
        whileHover="hover"
        style={{
          position: 'absolute',
          top: '20%',
          left: '20%',
          width: '60px',
          height: '60px',
          color: 'var(--accent-green)',
          filter: 'drop-shadow(0 0 20px rgba(0, 191, 165, 0.5))'
        }}
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <CpuChipIcon className="w-full h-full" />
      </motion.div>

      {/* Floating Lightning Icon */}
      <motion.div
        variants={iconVariants}
        style={{
          position: 'absolute',
          top: '60%',
          right: '25%',
          width: '50px',
          height: '50px',
          color: 'var(--accent-blue)',
          filter: 'drop-shadow(0 0 15px rgba(25, 118, 210, 0.5))'
        }}
        animate={{
          y: [0, -15, 0],
          rotate: [0, -5, 5, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        <BoltIcon className="w-full h-full" />
      </motion.div>

      {/* Floating Network Icon */}
      <motion.div
        variants={iconVariants}
        style={{
          position: 'absolute',
          bottom: '25%',
          left: '15%',
          width: '55px',
          height: '55px',
          color: 'var(--dark-green)',
          filter: 'drop-shadow(0 0 18px rgba(0, 77, 64, 0.5))'
        }}
        animate={{
          y: [0, -25, 0],
          rotate: [0, 10, -10, 0],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      >
        <GlobeAltIcon className="w-full h-full" />
      </motion.div>

      {/* Animated Rings */}
      <motion.div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '400px',
          height: '400px',
          border: '2px solid rgba(0, 191, 165, 0.2)',
          borderRadius: '50%'
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
          rotate: [0, 360]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <motion.div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          border: '1px solid rgba(25, 118, 210, 0.1)',
          borderRadius: '50%'
        }}
        animate={{
          scale: [1, 0.8, 1],
          opacity: [0.2, 0.4, 0.2],
          rotate: [360, 0]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </motion.div>
  );
}

export function DataStreamAnimation() {
  const streamVariants = {
    initial: { 
      pathLength: 0,
      opacity: 0 
    },
    animate: { 
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop" as const,
        repeatDelay: 1
      }
    }
  };

  return (
    <motion.svg
      width="100%"
      height="100%"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0,
        pointerEvents: 'none'
      }}
      initial="initial"
      animate="animate"
    >
      {/* Animated data streams */}
      <motion.path
        d="M 100 100 Q 200 50 300 100 T 500 100"
        stroke="url(#gradient1)"
        strokeWidth="2"
        fill="none"
        variants={streamVariants}
      />
      
      <motion.path
        d="M 50 200 Q 150 150 250 200 T 450 200"
        stroke="url(#gradient2)"
        strokeWidth="2"
        fill="none"
        variants={streamVariants}
        transition={{
          delay: 0.5,
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
          repeatDelay: 1
        }}
      />

      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(0, 191, 165, 0)" />
          <stop offset="50%" stopColor="rgba(0, 191, 165, 0.8)" />
          <stop offset="100%" stopColor="rgba(0, 191, 165, 0)" />
        </linearGradient>
        
        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(25, 118, 210, 0)" />
          <stop offset="50%" stopColor="rgba(25, 118, 210, 0.8)" />
          <stop offset="100%" stopColor="rgba(25, 118, 210, 0)" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
}
