"use client";

import { motion } from "framer-motion";

interface UniqueIconProps {
  number: string;
}

export function UniqueIcon({ number }: UniqueIconProps) {
  const getIconConfig = (num: string) => {
    switch (num) {
      case "1.1":
        return {
          shape: "brain",
          colors: ["#3B82F6", "#1E40AF"],
          animation: "pulse"
        };
      case "1.2":
        return {
          shape: "avatar",
          colors: ["#10B981", "#047857"],
          animation: "rotate"
        };
      case "1.3":
        return {
          shape: "video",
          colors: ["#8B5CF6", "#5B21B6"],
          animation: "scale"
        };
      case "1.4":
        return {
          shape: "lightning",
          colors: ["#F59E0B", "#D97706"],
          animation: "shake"
        };
      case "2.1":
        return {
          shape: "document",
          colors: ["#EF4444", "#DC2626"],
          animation: "bounce"
        };
      case "2.2":
        return {
          shape: "network",
          colors: ["#06B6D4", "#0891B2"],
          animation: "float"
        };
      case "3.1":
        return {
          shape: "database",
          colors: ["#84CC16", "#65A30D"],
          animation: "spin"
        };
      case "3.2":
        return {
          shape: "shield",
          colors: ["#F97316", "#EA580C"],
          animation: "glow"
        };
      case "4.1":
        return {
          shape: "alert",
          colors: ["#EC4899", "#BE185D"],
          animation: "pulse"
        };
      case "4.2":
        return {
          shape: "target",
          colors: ["#6366F1", "#4338CA"],
          animation: "expand"
        };
      case "4.3":
        return {
          shape: "analytics",
          colors: ["#14B8A6", "#0D9488"],
          animation: "wave"
        };
      default:
        return {
          shape: "circle",
          colors: ["#6B7280", "#4B5563"],
          animation: "none"
        };
    }
  };

  const config = getIconConfig(number);
  
  const renderShape = () => {
    const [primary, secondary] = config.colors;
    
    switch (config.shape) {
      case "brain":
        return (
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <motion.path
              d="M8 12c0-4.4 3.6-8 8-8s8 3.6 8 8c0 1.2-.3 2.4-.8 3.4.5 1 .8 2.2.8 3.4 0 4.4-3.6 8-8 8s-8-3.6-8-8c0-1.2.3-2.4.8-3.4-.5-1-.8-2.2-.8-3.4z"
              fill={`url(#gradient-${number.replace('.', '-')})`}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            <defs>
              <linearGradient id={`gradient-${number.replace('.', '-')}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={primary} />
                <stop offset="100%" stopColor={secondary} />
              </linearGradient>
            </defs>
          </svg>
        );

      case "avatar":
        return (
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <motion.circle
              cx="16" cy="12" r="6"
              fill={primary}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, ease: "backOut" }}
            />
            <motion.path
              d="M6 26c0-5.5 4.5-10 10-10s10 4.5 10 10"
              stroke={secondary}
              strokeWidth={3}
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: 0.5 }}
            />
          </svg>
        );

      case "video":
        return (
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <motion.rect
              x="4" y="8" width="20" height="14" rx="2"
              fill={primary}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8 }}
            />
            <motion.path
              d="M24 12l4-2v12l-4-2v-8z"
              fill={secondary}
              initial={{ x: 10 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            <motion.circle
              cx="12" cy="15" r="2"
              fill="white"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.6, delay: 0.8 }}
            />
          </svg>
        );

      case "lightning":
        return (
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <motion.path
              d="M18 2l-8 14h6l-2 14 8-14h-6l2-14z"
              fill={`url(#lightning-gradient-${number.replace('.', '-')})`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                rotate: [0, -5, 5, 0]
              }}
              transition={{ 
                duration: 0.8,
                rotate: { duration: 2, repeat: Infinity, repeatType: "reverse" }
              }}
            />
            <defs>
              <linearGradient id={`lightning-gradient-${number.replace('.', '-')}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={primary} />
                <stop offset="100%" stopColor={secondary} />
              </linearGradient>
            </defs>
          </svg>
        );

      case "document":
        return (
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <motion.rect
              x="6" y="4" width="16" height="24" rx="2"
              fill={primary}
              initial={{ height: 0 }}
              animate={{ height: 24 }}
              transition={{ duration: 0.8 }}
            />
            <motion.rect
              x="9" y="10" width="10" height="2"
              fill="white"
              initial={{ width: 0 }}
              animate={{ width: 10 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            />
            <motion.rect
              x="9" y="14" width="8" height="2"
              fill="white"
              initial={{ width: 0 }}
              animate={{ width: 8 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            />
            <motion.rect
              x="9" y="18" width="6" height="2"
              fill="white"
              initial={{ width: 0 }}
              animate={{ width: 6 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            />
          </svg>
        );

      case "network":
        return (
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <motion.circle cx="8" cy="8" r="3" fill={primary}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            />
            <motion.circle cx="24" cy="8" r="3" fill={primary}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
            <motion.circle cx="16" cy="24" r="3" fill={secondary}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            />
            <motion.line x1="8" y1="8" x2="24" y2="8" stroke={primary} strokeWidth={2}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            />
            <motion.line x1="8" y1="8" x2="16" y2="24" stroke={secondary} strokeWidth={2}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            />
            <motion.line x1="24" y1="8" x2="16" y2="24" stroke={secondary} strokeWidth={2}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            />
          </svg>
        );

      case "database":
        return (
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <motion.ellipse cx="16" cy="8" rx="10" ry="4" fill={primary}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8 }}
            />
            <motion.rect x="6" y="8" width="20" height="12" fill={primary}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            />
            <motion.ellipse cx="16" cy="20" rx="10" ry="4" fill={secondary}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
          </svg>
        );

      case "shield":
        return (
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <motion.path
              d="M16 2l10 6v10c0 6-10 12-10 12S6 24 6 18V8l10-6z"
              fill={`url(#shield-gradient-${number.replace('.', '-')})`}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
            <motion.path
              d="M12 16l3 3 6-6"
              stroke="white"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            />
            <defs>
              <linearGradient id={`shield-gradient-${number.replace('.', '-')}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={primary} />
                <stop offset="100%" stopColor={secondary} />
              </linearGradient>
            </defs>
          </svg>
        );

      case "alert":
        return (
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <motion.circle
              cx="16" cy="16" r="12"
              fill={primary}
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.8 }}
            />
            <motion.path
              d="M16 8v8M16 20v2"
              stroke="white"
              strokeWidth={3}
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </svg>
        );

      case "target":
        return (
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <motion.circle cx="16" cy="16" r="12" stroke={primary} strokeWidth={2} fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2 }}
            />
            <motion.circle cx="16" cy="16" r="8" stroke={secondary} strokeWidth={2} fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            />
            <motion.circle cx="16" cy="16" r="4" fill={primary}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            />
          </svg>
        );

      case "analytics":
        return (
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <motion.rect x="4" y="20" width="4" height="8" rx="1" fill={primary}
              initial={{ height: 0, y: 28 }}
              animate={{ height: 8, y: 20 }}
              transition={{ duration: 0.6 }}
            />
            <motion.rect x="10" y="14" width="4" height="14" rx="1" fill={secondary}
              initial={{ height: 0, y: 28 }}
              animate={{ height: 14, y: 14 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            />
            <motion.rect x="16" y="8" width="4" height="20" rx="1" fill={primary}
              initial={{ height: 0, y: 28 }}
              animate={{ height: 20, y: 8 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            />
            <motion.rect x="22" y="16" width="4" height="12" rx="1" fill={secondary}
              initial={{ height: 0, y: 28 }}
              animate={{ height: 12, y: 16 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            />
          </svg>
        );

      default:
        return (
          <motion.circle
            cx="16" cy="16" r="12"
            fill={primary}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
          />
        );
    }
  };

  const getAnimationProps = () => {
    switch (config.animation) {
      case "pulse":
        return {
          animate: { 
            scale: [1, 1.05, 1],
            opacity: [0.8, 1, 0.8]
          },
          transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        };
      case "rotate":
        return {
          animate: { rotate: 360 },
          transition: {
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }
        };
      case "bounce":
        return {
          animate: { y: [0, -4, 0] },
          transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }
        };
      case "float":
        return {
          animate: { 
            y: [0, -6, 0],
            x: [0, 2, 0]
          },
          transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }
        };
      case "shake":
        return {
          animate: { x: [0, -2, 2, -2, 2, 0] },
          transition: {
            duration: 0.5,
            repeat: Infinity,
            repeatDelay: 3
          }
        };
      case "glow":
        return {
          animate: { 
            filter: [
              "drop-shadow(0 0 0px rgba(249, 115, 22, 0))",
              "drop-shadow(0 0 12px rgba(249, 115, 22, 0.5))",
              "drop-shadow(0 0 0px rgba(249, 115, 22, 0))"
            ]
          },
          transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        };
      default:
        return {};
    }
  };

  return (
    <motion.div
      className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-white rounded-xl border border-gray-100 shadow-sm"
      {...getAnimationProps()}
      whileHover={{ 
        scale: 1.1,
        boxShadow: `0 8px 25px rgba(${config.colors[0]}, 0.15)`
      }}
    >
      {renderShape()}
    </motion.div>
  );
}