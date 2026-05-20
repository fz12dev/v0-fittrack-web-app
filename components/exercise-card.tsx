"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Check, ChevronDown, ChevronUp, X } from "lucide-react";
import { Exercise, SetLog } from "@/lib/workouts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ExerciseCardProps {
  exercise: Exercise;
  isCompleted: boolean;
  setLogs: SetLog[];
  onToggleComplete: () => void;
  onUpdateSet: (setLog: SetLog) => void;
}

export function ExerciseCard({
  exercise,
  isCompleted,
  setLogs,
  onToggleComplete,
  onUpdateSet,
}: ExerciseCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-card rounded-2xl border ${
        isCompleted ? "border-primary/50" : "border-border"
      } overflow-hidden transition-colors duration-200`}
    >
      {/* Header */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                {exercise.muscleGroup}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              {exercise.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {exercise.sets} sets × {exercise.reps} reps
            </p>
          </div>
          <button
            onClick={onToggleComplete}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
              isCompleted
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:bg-primary/20 hover:text-primary"
            }`}
          >
            <Check className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => setShowVideo(true)}
          >
            <Play className="w-4 h-4 mr-2" />
            Watch Demo
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4 mr-2" />
                Hide Sets
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-2" />
                Log Sets
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Expanded Set Tracking */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-border overflow-hidden"
          >
            <div className="p-4 space-y-3">
              <p className="text-xs text-muted-foreground">
                {exercise.instructions}
              </p>
              
              <div className="space-y-2">
                {Array.from({ length: exercise.sets }, (_, i) => {
                  const setNumber = i + 1;
                  const existingLog = setLogs.find(s => s.setNumber === setNumber);
                  
                  return (
                    <SetInput
                      key={setNumber}
                      setNumber={setNumber}
                      targetReps={exercise.reps}
                      initialWeight={existingLog?.weight}
                      initialReps={existingLog?.reps}
                      onSave={(weight, reps, notes) => {
                        onUpdateSet({ setNumber, weight, reps, notes });
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowVideo(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-2xl overflow-hidden w-full max-w-2xl border border-border"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h4 className="font-semibold text-foreground">{exercise.name}</h4>
                <button
                  onClick={() => setShowVideo(false)}
                  className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
              <div className="aspect-video">
                <iframe
                  src={exercise.videoUrl}
                  title={exercise.name}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface SetInputProps {
  setNumber: number;
  targetReps: number;
  initialWeight?: number;
  initialReps?: number;
  onSave: (weight: number, reps: number, notes?: string) => void;
}

function SetInput({ setNumber, targetReps, initialWeight, initialReps, onSave }: SetInputProps) {
  const [weight, setWeight] = useState(initialWeight?.toString() || "");
  const [reps, setReps] = useState(initialReps?.toString() || targetReps.toString());
  const isLogged = initialWeight !== undefined;

  const handleBlur = () => {
    if (weight && reps) {
      onSave(parseFloat(weight), parseInt(reps));
    }
  };

  return (
    <div className={`flex items-center gap-3 p-3 rounded-xl ${isLogged ? "bg-primary/10" : "bg-secondary"}`}>
      <span className={`text-sm font-medium w-16 ${isLogged ? "text-primary" : "text-muted-foreground"}`}>
        Set {setNumber}
      </span>
      <div className="flex-1 flex items-center gap-2">
        <Input
          type="number"
          placeholder="kg"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          onBlur={handleBlur}
          className="w-20 h-9 text-center bg-background"
        />
        <span className="text-muted-foreground text-xs">kg</span>
        <span className="text-muted-foreground">×</span>
        <Input
          type="number"
          placeholder="reps"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          onBlur={handleBlur}
          className="w-20 h-9 text-center bg-background"
        />
        <span className="text-muted-foreground text-xs">reps</span>
      </div>
      {isLogged && (
        <Check className="w-4 h-4 text-primary" />
      )}
    </div>
  );
}
