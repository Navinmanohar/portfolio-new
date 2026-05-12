"use client";

import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";

export default function AIChatButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 300 }}
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-accent text-white h-12 px-5 rounded-2xl shadow-lg hover:bg-accent/90 transition-all"
    >
      <MessageSquare className="w-5 h-5" />
      <span className="text-sm font-medium hidden sm:inline">AI Assistant</span>
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
      </span>
    </motion.button>
  );
}
