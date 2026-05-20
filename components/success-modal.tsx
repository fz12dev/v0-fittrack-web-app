"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  workoutName: string;
  exercisesCompleted: number;
}

export function SuccessModal({ isOpen, onClose, workoutName, exercisesCompleted }: SuccessModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-card rounded-3xl overflow-hidden w-full max-w-sm border border-border p-8 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <PartyPopper className="w-5 h-5 text-yellow-500" />
                <span className="text-lg font-semibold text-foreground">Workout Complete!</span>
                <PartyPopper className="w-5 h-5 text-yellow-500" />
              </div>
              
              <p className="text-muted-foreground mb-2">
                Great job finishing your
              </p>
              <p className="text-xl font-bold text-primary mb-4">
                {workoutName}
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                You completed {exercisesCompleted} exercises today. Keep up the amazing work!
              </p>
              
              <Button 
                onClick={onClose}
                className="w-full"
                size="lg"
              >
                Continue
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
