import { WorkoutLog, UserProfile, ExerciseLog, SetLog } from './workouts';

const STORAGE_KEYS = {
  USER_PROFILE: 'fittrack_user_profile',
  WORKOUT_HISTORY: 'fittrack_workout_history',
  CURRENT_WORKOUT: 'fittrack_current_workout',
};

// User Profile
export function getUserProfile(): UserProfile {
  if (typeof window === 'undefined') {
    return getDefaultProfile();
  }
  const stored = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
  if (stored) {
    return JSON.parse(stored);
  }
  return getDefaultProfile();
}

export function getDefaultProfile(): UserProfile {
  return {
    name: 'Fitness Enthusiast',
    weight: 75,
    fitnessGoal: 'Build Muscle',
    totalWorkouts: 0,
    currentStreak: 0,
  };
}

export function saveUserProfile(profile: UserProfile): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
}

// Workout History
export function getWorkoutHistory(): WorkoutLog[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEYS.WORKOUT_HISTORY);
  if (stored) {
    return JSON.parse(stored);
  }
  return [];
}

export function saveWorkoutToHistory(workout: WorkoutLog): void {
  if (typeof window === 'undefined') return;
  const history = getWorkoutHistory();
  history.unshift(workout);
  localStorage.setItem(STORAGE_KEYS.WORKOUT_HISTORY, JSON.stringify(history));
  
  // Update user profile stats
  const profile = getUserProfile();
  profile.totalWorkouts += 1;
  
  // Calculate streak
  const today = new Date().toDateString();
  const lastWorkout = profile.lastWorkoutDate;
  
  if (lastWorkout) {
    const lastDate = new Date(lastWorkout);
    const todayDate = new Date(today);
    const diffTime = todayDate.getTime() - lastDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      profile.currentStreak += 1;
    } else if (diffDays > 1) {
      profile.currentStreak = 1;
    }
  } else {
    profile.currentStreak = 1;
  }
  
  profile.lastWorkoutDate = today;
  saveUserProfile(profile);
}

// Current Workout Session
export function getCurrentWorkout(): WorkoutLog | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(STORAGE_KEYS.CURRENT_WORKOUT);
  if (stored) {
    return JSON.parse(stored);
  }
  return null;
}

export function saveCurrentWorkout(workout: WorkoutLog): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.CURRENT_WORKOUT, JSON.stringify(workout));
}

export function clearCurrentWorkout(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEYS.CURRENT_WORKOUT);
}

// Create a new workout log
export function createWorkoutLog(dayName: string, workoutName: string, exerciseIds: { id: string; name: string }[]): WorkoutLog {
  return {
    id: `workout_${Date.now()}`,
    date: new Date().toISOString(),
    dayName,
    workoutName,
    exercises: exerciseIds.map(ex => ({
      exerciseId: ex.id,
      exerciseName: ex.name,
      completed: false,
      sets: [],
    })),
    completed: false,
  };
}

// Update exercise log
export function updateExerciseLog(
  workout: WorkoutLog,
  exerciseId: string,
  setLog: SetLog
): WorkoutLog {
  const exerciseIndex = workout.exercises.findIndex(e => e.exerciseId === exerciseId);
  if (exerciseIndex === -1) return workout;
  
  const exercise = workout.exercises[exerciseIndex];
  const setIndex = exercise.sets.findIndex(s => s.setNumber === setLog.setNumber);
  
  if (setIndex === -1) {
    exercise.sets.push(setLog);
  } else {
    exercise.sets[setIndex] = setLog;
  }
  
  workout.exercises[exerciseIndex] = exercise;
  return { ...workout };
}

// Toggle exercise completion
export function toggleExerciseCompletion(
  workout: WorkoutLog,
  exerciseId: string
): WorkoutLog {
  const exerciseIndex = workout.exercises.findIndex(e => e.exerciseId === exerciseId);
  if (exerciseIndex === -1) return workout;
  
  workout.exercises[exerciseIndex].completed = !workout.exercises[exerciseIndex].completed;
  return { ...workout };
}

// Calculate workout completion percentage
export function calculateCompletionPercentage(exercises: ExerciseLog[]): number {
  if (exercises.length === 0) return 0;
  const completed = exercises.filter(e => e.completed).length;
  return Math.round((completed / exercises.length) * 100);
}

// Get completion stats
export function getCompletionStats(): { totalWorkouts: number; currentStreak: number; completionRate: number } {
  const profile = getUserProfile();
  const history = getWorkoutHistory();
  
  // Calculate completion rate for the last 7 days
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
  const recentWorkouts = history.filter(w => new Date(w.date) >= sevenDaysAgo);
  const completionRate = recentWorkouts.length > 0 
    ? Math.round((recentWorkouts.filter(w => w.completed).length / 7) * 100)
    : 0;
  
  return {
    totalWorkouts: profile.totalWorkouts,
    currentStreak: profile.currentStreak,
    completionRate,
  };
}
