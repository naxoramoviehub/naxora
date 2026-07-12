'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle2, X } from 'lucide-react';
import Button from './Button';
import Card from './Card';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: 'confirm' | 'alert' | 'success';
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}

export default function Dialog({
  isOpen,
  onClose,
  title,
  message,
  type = 'confirm',
  onConfirm,
  confirmText = 'Confirm',
  cancelText = 'Cancel'
}: DialogProps) {
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  const iconMap = {
    confirm: AlertCircle,
    alert: AlertCircle,
    success: CheckCircle2
  };

  const iconColorMap = {
    confirm: 'text-amber-500',
    alert: 'text-red-500',
    success: 'text-emerald-500'
  };

  const Icon = iconMap[type];
  const iconColor = iconColorMap[type];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-5"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="p-6 border border-glass-stroke" glowColor="none">
              <div className="flex items-start gap-4 mb-4">
                <div className={`p-2 rounded-lg bg-surface-elevated/40 ${iconColor}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-sans text-xl font-bold text-white mb-2 uppercase tracking-wider">
                    {title}
                  </h3>
                  <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                    {message}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="text-on-surface-variant transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex justify-end gap-3 border-t border-glass-stroke pt-4 mt-4">
                {type === 'confirm' && (
                  <Button variant="secondary" onClick={onClose}>
                    {cancelText}
                  </Button>
                )}
                <Button 
                  variant={type === 'alert' ? 'ghost' : 'primary'} 
                  onClick={handleConfirm}
                  className={type === 'alert' ? '!text-error' : ''}
                >
                  {confirmText}
                </Button>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
