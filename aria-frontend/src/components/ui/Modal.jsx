import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

// Fix: Create an explicit PascalCase component variable from the motion object
const MotionDiv = motion.div;

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        // Use the new PascalCase component
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          {/* Use the new PascalCase component */}
          <MotionDiv
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-slate-800 rounded-lg shadow-xl p-6 w-full max-w-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X />
            </button>
            {children}
          </MotionDiv>
        </MotionDiv>
      )}
    </AnimatePresence>
  );
};

export default Modal;
