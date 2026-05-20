"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ExerciseCard } from "@/components/exercise-card";
import { ProgressBar } from "@/components/progress-bar";
import { SuccessModal } from "@/components/success-modal";
import { getTodaysWorkout, WorkoutDay, WorkoutLog, SetLog } from "@/lib/workouts";
import {
  getCurrentWorkout,
  saveCurrentWorkout,
  clearCurrentWorkout,
  saveWorkoutToHistory,
  createWorkoutLog,
  updateExerciseLog,
  toggleExerciseCompletion,
  calculateCompletionPercentage,
} from "@/lib/storage";

export default function WorkoutPage() {
  const router = useRouter();
  const [todaysWorkout, setTodaysWorkout] = useState<WorkoutDay | null>(null);
  const [workoutLog, setWorkoutLog] = useState<WorkoutLog | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const workout = getTodaysWorkout();
    setTodaysWorkout(workout);

    if (!workout.isRestDay) {
      // Check for existing workout session
      const existingWorkout = getCurrentWorkout();
      
      if (existingWorkout && existingWorkout.dayName === workout.day) {
        setWorkoutLog(existingWorkout);
      } else {
        // Create new workout log
        const newLog = createWorkoutLog(
          workout.day,
          workout.name,
          workout.exercises.map((e) => ({ id: e.id, name: e.name }))
        );
        setWorkoutLog(newLog);
        saveCurrentWorkout(newLog);
      }
    }
  }, []);

  const handleToggleComplete = (exerciseId: string) => {
    if (!workoutLog) return;
    
    const updatedLog = toggleExerciseCompletion(workoutLog, exerciseId);
    setWorkoutLog(updatedLog);
    saveCurrentWorkout(updatedLog);
  };

  const handleUpdateSet = (exerciseId: string, setLog: SetLog) => {
    if (!workoutLog) return;
    
    const updatedLog = updateExerciseLog(workoutLog, exerciseId, setLog);
    setWorkoutLog(updatedLog);
    saveCurrentWorkout(updatedLog);
  };

  const handleCompleteWorkout = () => {
    if (!workoutLog) return;
    
    const completedWorkout: WorkoutLog = {
      ...workoutLog,
      completed: true,
      completedAt: new Date().toISOString(),
    };
    
    saveWorkoutToHistory(completedWorkout);
    clearCurrentWorkout();
    setShowSuccess(true);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    router.push("/");
  };

  const completionPercentage = workoutLog
    ? calculateCompletionPercentage(workoutLog.exercises)
    : 0;

  const completedCount = workoutLog
    ? workoutLog.exercises.filter((e) => e.completed).length
    : 0;

  if (todaysWorkout?.isRestDay) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-xl">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Rest Day</h1>
            <p className="text-sm text-muted-foreground">{todaysWorkout.day}</p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-3xl border border-border p-8 text-center"
        >
          <div className="w-20 h-20 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-6">
            <Zap className="w-10 h-10 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-3">Time to Recover</h2>
          <p className="text-muted-foreground max-w-sm mx-auto mb-6">
            Rest days are essential for muscle recovery and growth. Use this time to stretch, 
            stay hydrated, and prepare for tomorrow&apos;s workout.
          </p>
          <div className="bg-secondary rounded-2xl p-4 max-w-sm mx-auto">
            <p className="text-sm font-medium text-foreground mb-2">Recovery Tips:</p>
            <ul className="text-sm text-muted-foreground space-y-1 text-left">
              <li>- Get 7-9 hours of sleep</li>
              <li>- Drink plenty of water</li>
              <li>- Do light stretching or yoga</li>
              <li>- Eat protein-rich foods</li>
            </ul>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="ghost" size="icon" className="rounded-xl">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground">
            {todaysWorkout?.name}
          </h1>
          <p className="text-sm text-muted-foreground">
            {todaysWorkout?.day} - {todaysWorkout?.exercises.length} exercises
          </p>
        </div>
      </div>

      {/* Progress */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-2xl border border-border p-4"
      >
        <ProgressBar
          percentage={completionPercentage}
          label={`${completedCount} of ${todaysWorkout?.exercises.length} completed`}
          size="md"
        />
      </motion.div>

      {/* Exercises */}
      <div className="space-y-4">
        {todaysWorkout?.exercises.map((exercise, index) => {
          const exerciseLog = workoutLog?.exercises.find(
            (e) => e.exerciseId === exercise.id
          );
          
          return (
            <motion.div
              key={exercise.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <ExerciseCard
                exercise={exercise}
                isCompleted={exerciseLog?.completed || false}
                setLogs={exerciseLog?.sets || []}
                onToggleComplete={() => handleToggleComplete(exercise.id)}
                onUpdateSet={(setLog) => handleUpdateSet(exercise.id, setLog)}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Complete Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky bottom-24 lg:bottom-4"
      >
        <Button
          onClick={handleCompleteWorkout}
          className="w-full"
          size="lg"
          disabled={completionPercentage < 50}
        >
          <CheckCircle2 className="w-5 h-5 mr-2" />
          Complete Workout
        </Button>
        {completionPercentage < 50 && (
          <p className="text-xs text-muted-foreground text-center mt-2">
            Complete at least 50% of exercises to finish workout
          </p>
        )}
      </motion.div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccess}
        onClose={handleSuccessClose}
        workoutName={todaysWorkout?.name || ""}
        exercisesCompleted={completedCount}
      />
    </div>
  );
}
