"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ChevronDown, ChevronUp, Clock, Dumbbell } from "lucide-react";
import { WorkoutLog } from "@/lib/workouts";
import { getWorkoutHistory } from "@/lib/storage";

export default function HistoryPage() {
  const [history, setHistory] = useState<WorkoutLog[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    setHistory(getWorkoutHistory());
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-foreground">Workout History</h1>
        <p className="text-sm text-muted-foreground">
          {history.length} workouts completed
        </p>
      </motion.div>

      {/* History List */}
      {history.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-3xl border border-border p-8 text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="text-lg font-semibold text-foreground mb-2">No Workouts Yet</h2>
          <p className="text-muted-foreground max-w-xs mx-auto">
            Complete your first workout and it will appear here. Start today!
          </p>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {history.map((workout, index) => (
            <motion.div
              key={workout.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-card rounded-2xl border border-border overflow-hidden"
            >
              <button
                onClick={() => setExpandedId(expandedId === workout.id ? null : workout.id)}
                className="w-full p-4 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Dumbbell className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{workout.workoutName}</h3>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(workout.date)}
                      </span>
                      {workout.completedAt && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatTime(workout.completedAt)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-primary font-medium">
                    {workout.exercises.filter((e) => e.completed).length}/{workout.exercises.length}
                  </span>
                  {expandedId === workout.id ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
              </button>

              <AnimatePresence>
                {expandedId === workout.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border-t border-border overflow-hidden"
                  >
                    <div className="p-4 space-y-3">
                      {workout.exercises.map((exercise) => (
                        <div
                          key={exercise.exerciseId}
                          className={`p-3 rounded-xl ${
                            exercise.completed ? "bg-primary/10" : "bg-secondary"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className={`font-medium ${exercise.completed ? "text-foreground" : "text-muted-foreground"}`}>
                              {exercise.exerciseName}
                            </span>
                            {exercise.completed && (
                              <span className="text-xs text-primary bg-primary/20 px-2 py-0.5 rounded-full">
                                Completed
                              </span>
                            )}
                          </div>
                          {exercise.sets.length > 0 && (
                            <div className="space-y-1">
                              {exercise.sets.map((set) => (
                                <div key={set.setNumber} className="text-sm text-muted-foreground">
                                  Set {set.setNumber}: {set.weight}kg × {set.reps} reps
                                  {set.notes && <span className="text-xs ml-2">({set.notes})</span>}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
