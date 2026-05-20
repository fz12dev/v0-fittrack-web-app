"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Dumbbell, Calendar, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatsCards } from "@/components/stats-cards";
import { ProgressBar } from "@/components/progress-bar";
import { getTodaysWorkout, WorkoutDay } from "@/lib/workouts";
import { getCompletionStats, getUserProfile, UserProfile } from "@/lib/storage";

export default function DashboardPage() {
  const [todaysWorkout, setTodaysWorkout] = useState<WorkoutDay | null>(null);
  const [stats, setStats] = useState({ totalWorkouts: 0, currentStreak: 0, completionRate: 0 });
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    setTodaysWorkout(getTodaysWorkout());
    setStats(getCompletionStats());
    setProfile(getUserProfile());
  }, []);

  const currentDay = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const currentDate = new Date().toLocaleDateString("en-US", { 
    month: "long", 
    day: "numeric",
    year: "numeric"
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-1"
      >
        <p className="text-sm text-muted-foreground">{currentDate}</p>
        <h1 className="text-2xl font-bold text-foreground">
          Welcome back, {profile?.name?.split(" ")[0] || "Champion"}!
        </h1>
      </motion.div>

      {/* Stats */}
      <StatsCards 
        totalWorkouts={stats.totalWorkouts}
        currentStreak={stats.currentStreak}
        completionRate={stats.completionRate}
      />

      {/* Today's Workout Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-3xl border border-border overflow-hidden"
      >
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">{currentDay}</span>
          </div>
          
          {todaysWorkout?.isRestDay ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-bold text-foreground mb-2">Rest Day</h2>
              <p className="text-muted-foreground max-w-xs mx-auto">
                Take time to recover. Your muscles grow during rest, not during workouts.
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {todaysWorkout?.name}
              </h2>
              <p className="text-muted-foreground mb-4">
                {todaysWorkout?.exercises.length} exercises planned for today
              </p>
              
              {/* Exercise Preview */}
              <div className="flex flex-wrap gap-2 mb-6">
                {todaysWorkout?.exercises.slice(0, 4).map((exercise) => (
                  <span
                    key={exercise.id}
                    className="text-xs bg-secondary text-muted-foreground px-3 py-1.5 rounded-full"
                  >
                    {exercise.name}
                  </span>
                ))}
                {todaysWorkout && todaysWorkout.exercises.length > 4 && (
                  <span className="text-xs bg-secondary text-muted-foreground px-3 py-1.5 rounded-full">
                    +{todaysWorkout.exercises.length - 4} more
                  </span>
                )}
              </div>
              
              <Link href="/workout">
                <Button className="w-full" size="lg">
                  <Dumbbell className="w-5 h-5 mr-2" />
                  Start Workout
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </>
          )}
        </div>
      </motion.div>

      {/* Weekly Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card rounded-2xl border border-border p-6"
      >
        <h3 className="text-lg font-semibold text-foreground mb-4">Weekly Progress</h3>
        <ProgressBar
          percentage={stats.completionRate}
          label="Workouts Completed"
          size="lg"
        />
        <p className="text-xs text-muted-foreground mt-3">
          Complete {7 - Math.round(stats.completionRate / 100 * 7)} more workouts to reach your weekly goal
        </p>
      </motion.div>

      {/* Weekly Schedule */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card rounded-2xl border border-border p-6"
      >
        <h3 className="text-lg font-semibold text-foreground mb-4">This Week</h3>
        <div className="space-y-2">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => {
            const workouts = [
              "Chest & Triceps",
              "Back & Biceps", 
              "Legs",
              "Shoulders",
              "Arms & Abs",
              "Full Body",
              "Rest"
            ];
            const isToday = new Date().getDay() === (index === 6 ? 0 : index + 1);
            
            return (
              <div
                key={day}
                className={`flex items-center justify-between p-3 rounded-xl ${
                  isToday ? "bg-primary/10 border border-primary/20" : "bg-secondary"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-sm font-medium w-10 ${isToday ? "text-primary" : "text-muted-foreground"}`}>
                    {day}
                  </span>
                  <span className={`text-sm ${isToday ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                    {workouts[index]}
                  </span>
                </div>
                {isToday && (
                  <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                    Today
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
