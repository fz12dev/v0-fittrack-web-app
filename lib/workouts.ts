export interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  sets: number;
  reps: number;
  videoUrl: string;
  instructions: string;
}

export interface WorkoutDay {
  day: string;
  name: string;
  exercises: Exercise[];
  isRestDay: boolean;
}

export interface SetLog {
  setNumber: number;
  weight: number;
  reps: number;
  notes?: string;
}

export interface ExerciseLog {
  exerciseId: string;
  exerciseName: string;
  completed: boolean;
  sets: SetLog[];
}

export interface WorkoutLog {
  id: string;
  date: string;
  dayName: string;
  workoutName: string;
  exercises: ExerciseLog[];
  completed: boolean;
  completedAt?: string;
}

export interface UserProfile {
  name: string;
  weight: number;
  fitnessGoal: string;
  totalWorkouts: number;
  currentStreak: number;
  lastWorkoutDate?: string;
}

export const weeklyWorkouts: WorkoutDay[] = [
  {
    day: "Monday",
    name: "Chest & Triceps",
    isRestDay: false,
    exercises: [
      {
        id: "bench-press",
        name: "Barbell Bench Press",
        muscleGroup: "Chest",
        sets: 4,
        reps: 8,
        videoUrl: "https://www.youtube.com/embed/rT7DgCr-3pg",
        instructions: "Lie flat on bench, grip bar slightly wider than shoulder width. Lower to chest, press up explosively."
      },
      {
        id: "incline-db-press",
        name: "Incline Dumbbell Press",
        muscleGroup: "Upper Chest",
        sets: 3,
        reps: 10,
        videoUrl: "https://www.youtube.com/embed/8iPEnn-ltC8",
        instructions: "Set bench to 30-45 degrees. Press dumbbells up, keeping elbows at 45-degree angle."
      },
      {
        id: "cable-flyes",
        name: "Cable Flyes",
        muscleGroup: "Chest",
        sets: 3,
        reps: 12,
        videoUrl: "https://www.youtube.com/embed/Iwe6AmxVf7o",
        instructions: "Stand between cables, slight bend in elbows. Bring handles together in hugging motion."
      },
      {
        id: "tricep-pushdown",
        name: "Tricep Pushdown",
        muscleGroup: "Triceps",
        sets: 3,
        reps: 12,
        videoUrl: "https://www.youtube.com/embed/2-LAMcpzODU",
        instructions: "Keep elbows pinned to sides. Push bar down until arms are fully extended."
      },
      {
        id: "skull-crushers",
        name: "Skull Crushers",
        muscleGroup: "Triceps",
        sets: 3,
        reps: 10,
        videoUrl: "https://www.youtube.com/embed/d_KZxkY_0cM",
        instructions: "Lie on bench, lower EZ bar to forehead by bending elbows. Extend arms back up."
      },
      {
        id: "dips",
        name: "Tricep Dips",
        muscleGroup: "Triceps",
        sets: 3,
        reps: 12,
        videoUrl: "https://www.youtube.com/embed/wjUmnZH528Y",
        instructions: "Grip parallel bars, lower body by bending elbows to 90 degrees. Push back up."
      }
    ]
  },
  {
    day: "Tuesday",
    name: "Back & Biceps",
    isRestDay: false,
    exercises: [
      {
        id: "deadlift",
        name: "Conventional Deadlift",
        muscleGroup: "Back",
        sets: 4,
        reps: 6,
        videoUrl: "https://www.youtube.com/embed/op9kVnSso6Q",
        instructions: "Stand with feet hip-width apart. Hinge at hips, grip bar. Drive through heels to stand."
      },
      {
        id: "lat-pulldown",
        name: "Lat Pulldown",
        muscleGroup: "Lats",
        sets: 4,
        reps: 10,
        videoUrl: "https://www.youtube.com/embed/CAwf7n6Luuc",
        instructions: "Grip bar wide, pull down to upper chest. Squeeze shoulder blades together."
      },
      {
        id: "barbell-row",
        name: "Barbell Row",
        muscleGroup: "Back",
        sets: 3,
        reps: 10,
        videoUrl: "https://www.youtube.com/embed/FWJR5Ve8bnQ",
        instructions: "Hinge forward at hips, pull bar to lower chest. Keep back flat throughout."
      },
      {
        id: "seated-cable-row",
        name: "Seated Cable Row",
        muscleGroup: "Back",
        sets: 3,
        reps: 12,
        videoUrl: "https://www.youtube.com/embed/GZbfZ033f74",
        instructions: "Sit upright, pull handle to abdomen. Squeeze shoulder blades at peak contraction."
      },
      {
        id: "barbell-curl",
        name: "Barbell Curl",
        muscleGroup: "Biceps",
        sets: 3,
        reps: 10,
        videoUrl: "https://www.youtube.com/embed/kwG2ipFRgfo",
        instructions: "Stand with arms extended, curl bar up. Keep elbows stationary at sides."
      },
      {
        id: "hammer-curl",
        name: "Hammer Curl",
        muscleGroup: "Biceps",
        sets: 3,
        reps: 12,
        videoUrl: "https://www.youtube.com/embed/zC3nLlEvin4",
        instructions: "Hold dumbbells with neutral grip. Curl up without rotating wrists."
      }
    ]
  },
  {
    day: "Wednesday",
    name: "Legs",
    isRestDay: false,
    exercises: [
      {
        id: "squat",
        name: "Barbell Back Squat",
        muscleGroup: "Quadriceps",
        sets: 4,
        reps: 8,
        videoUrl: "https://www.youtube.com/embed/bEv6CCg2BC8",
        instructions: "Bar on upper back, feet shoulder-width. Squat down until thighs parallel, drive up."
      },
      {
        id: "leg-press",
        name: "Leg Press",
        muscleGroup: "Quadriceps",
        sets: 4,
        reps: 10,
        videoUrl: "https://www.youtube.com/embed/IZxyjW7MPJQ",
        instructions: "Feet shoulder-width on platform. Lower weight with control, press back up."
      },
      {
        id: "romanian-deadlift",
        name: "Romanian Deadlift",
        muscleGroup: "Hamstrings",
        sets: 3,
        reps: 10,
        videoUrl: "https://www.youtube.com/embed/JCXUYuzwNrM",
        instructions: "Hold bar, hinge at hips keeping legs nearly straight. Feel stretch in hamstrings."
      },
      {
        id: "leg-curl",
        name: "Lying Leg Curl",
        muscleGroup: "Hamstrings",
        sets: 3,
        reps: 12,
        videoUrl: "https://www.youtube.com/embed/1Tq3QdYUuHs",
        instructions: "Lie face down, curl weight up by bending knees. Squeeze at top."
      },
      {
        id: "leg-extension",
        name: "Leg Extension",
        muscleGroup: "Quadriceps",
        sets: 3,
        reps: 12,
        videoUrl: "https://www.youtube.com/embed/YyvSfVjQeL0",
        instructions: "Sit with back against pad. Extend legs until straight, squeeze quads."
      },
      {
        id: "calf-raise",
        name: "Standing Calf Raise",
        muscleGroup: "Calves",
        sets: 4,
        reps: 15,
        videoUrl: "https://www.youtube.com/embed/-M4-G8p8fmc",
        instructions: "Stand on edge of platform. Rise up on toes, pause at top, lower slowly."
      }
    ]
  },
  {
    day: "Thursday",
    name: "Shoulders",
    isRestDay: false,
    exercises: [
      {
        id: "overhead-press",
        name: "Overhead Press",
        muscleGroup: "Shoulders",
        sets: 4,
        reps: 8,
        videoUrl: "https://www.youtube.com/embed/2yjwXTZQDDI",
        instructions: "Stand with bar at shoulders. Press overhead, lockout at top. Lower with control."
      },
      {
        id: "lateral-raise",
        name: "Lateral Raise",
        muscleGroup: "Side Delts",
        sets: 4,
        reps: 12,
        videoUrl: "https://www.youtube.com/embed/3VcKaXpzqRo",
        instructions: "Stand with dumbbells at sides. Raise arms out to shoulder height, lower slowly."
      },
      {
        id: "front-raise",
        name: "Front Raise",
        muscleGroup: "Front Delts",
        sets: 3,
        reps: 12,
        videoUrl: "https://www.youtube.com/embed/-t7fuZ0KhDA",
        instructions: "Hold dumbbells in front of thighs. Raise one arm to shoulder height, alternate."
      },
      {
        id: "rear-delt-fly",
        name: "Rear Delt Fly",
        muscleGroup: "Rear Delts",
        sets: 3,
        reps: 15,
        videoUrl: "https://www.youtube.com/embed/pYcpY20QaE8",
        instructions: "Bend forward at hips. Raise dumbbells out to sides, squeeze shoulder blades."
      },
      {
        id: "face-pull",
        name: "Face Pull",
        muscleGroup: "Rear Delts",
        sets: 3,
        reps: 15,
        videoUrl: "https://www.youtube.com/embed/rep-qVOkqgk",
        instructions: "Pull rope to face, externally rotating shoulders. Keep elbows high."
      },
      {
        id: "shrugs",
        name: "Dumbbell Shrugs",
        muscleGroup: "Traps",
        sets: 3,
        reps: 12,
        videoUrl: "https://www.youtube.com/embed/cJRVVxmytaM",
        instructions: "Hold dumbbells at sides. Shrug shoulders up toward ears, hold briefly."
      }
    ]
  },
  {
    day: "Friday",
    name: "Arms & Abs",
    isRestDay: false,
    exercises: [
      {
        id: "close-grip-bench",
        name: "Close Grip Bench Press",
        muscleGroup: "Triceps",
        sets: 4,
        reps: 8,
        videoUrl: "https://www.youtube.com/embed/nEF0bv2FW94",
        instructions: "Grip bar shoulder-width or narrower. Lower to chest, press up focusing on triceps."
      },
      {
        id: "preacher-curl",
        name: "Preacher Curl",
        muscleGroup: "Biceps",
        sets: 3,
        reps: 10,
        videoUrl: "https://www.youtube.com/embed/fIWP-FRFNU0",
        instructions: "Rest arms on preacher pad. Curl weight up, squeeze biceps at top."
      },
      {
        id: "overhead-extension",
        name: "Overhead Tricep Extension",
        muscleGroup: "Triceps",
        sets: 3,
        reps: 12,
        videoUrl: "https://www.youtube.com/embed/_gsUck-7M74",
        instructions: "Hold dumbbell overhead with both hands. Lower behind head, extend back up."
      },
      {
        id: "concentration-curl",
        name: "Concentration Curl",
        muscleGroup: "Biceps",
        sets: 3,
        reps: 12,
        videoUrl: "https://www.youtube.com/embed/0AUGkch3tzc",
        instructions: "Sit, elbow against inner thigh. Curl dumbbell up, squeeze at top."
      },
      {
        id: "cable-crunch",
        name: "Cable Crunch",
        muscleGroup: "Abs",
        sets: 3,
        reps: 15,
        videoUrl: "https://www.youtube.com/embed/AV5PmSJlMlQ",
        instructions: "Kneel below cable, hold rope behind head. Crunch down, curling torso."
      },
      {
        id: "hanging-leg-raise",
        name: "Hanging Leg Raise",
        muscleGroup: "Abs",
        sets: 3,
        reps: 12,
        videoUrl: "https://www.youtube.com/embed/hdng3Nm1x_E",
        instructions: "Hang from bar, raise legs to parallel. Lower with control."
      },
      {
        id: "plank",
        name: "Plank Hold",
        muscleGroup: "Core",
        sets: 3,
        reps: 60,
        videoUrl: "https://www.youtube.com/embed/ASdvN_XEl_c",
        instructions: "Hold push-up position on forearms. Keep body straight for 60 seconds."
      }
    ]
  },
  {
    day: "Saturday",
    name: "Full Body",
    isRestDay: false,
    exercises: [
      {
        id: "clean-press",
        name: "Dumbbell Clean & Press",
        muscleGroup: "Full Body",
        sets: 4,
        reps: 8,
        videoUrl: "https://www.youtube.com/embed/TwD-YGVP4Bk",
        instructions: "Clean dumbbells to shoulders, then press overhead. Lower and repeat."
      },
      {
        id: "pullup",
        name: "Pull-ups",
        muscleGroup: "Back",
        sets: 4,
        reps: 8,
        videoUrl: "https://www.youtube.com/embed/eGo4IYlbE5g",
        instructions: "Hang from bar with overhand grip. Pull yourself up until chin over bar."
      },
      {
        id: "goblet-squat",
        name: "Goblet Squat",
        muscleGroup: "Legs",
        sets: 3,
        reps: 12,
        videoUrl: "https://www.youtube.com/embed/MeIiIdhvXT4",
        instructions: "Hold dumbbell at chest. Squat down keeping torso upright."
      },
      {
        id: "pushup",
        name: "Push-ups",
        muscleGroup: "Chest",
        sets: 3,
        reps: 15,
        videoUrl: "https://www.youtube.com/embed/IODxDxX7oi4",
        instructions: "Hands shoulder-width, lower chest to ground. Push back up explosively."
      },
      {
        id: "lunges",
        name: "Walking Lunges",
        muscleGroup: "Legs",
        sets: 3,
        reps: 20,
        videoUrl: "https://www.youtube.com/embed/L8fvypPrzzs",
        instructions: "Step forward into lunge, knee over ankle. Alternate legs walking forward."
      },
      {
        id: "burpees",
        name: "Burpees",
        muscleGroup: "Full Body",
        sets: 3,
        reps: 10,
        videoUrl: "https://www.youtube.com/embed/dZgVxmf6jkA",
        instructions: "Drop to push-up, perform push-up, jump feet to hands, jump up."
      }
    ]
  },
  {
    day: "Sunday",
    name: "Rest Day",
    isRestDay: true,
    exercises: []
  }
];

export function getTodaysWorkout(): WorkoutDay {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const today = days[new Date().getDay()];
  return weeklyWorkouts.find(w => w.day === today) || weeklyWorkouts[6];
}

export function getWorkoutByDay(day: string): WorkoutDay | undefined {
  return weeklyWorkouts.find(w => w.day === day);
}
