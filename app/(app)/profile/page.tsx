"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Weight, Target, Trophy, Flame, Save, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getUserProfile, saveUserProfile, UserProfile, getDefaultProfile } from "@/lib/storage";

const fitnessGoals = [
  "Build Muscle",
  "Lose Weight",
  "Improve Strength",
  "Increase Endurance",
  "Stay Active",
];

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>(getDefaultProfile());
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile>(getDefaultProfile());

  useEffect(() => {
    const storedProfile = getUserProfile();
    setProfile(storedProfile);
    setEditedProfile(storedProfile);
  }, []);

  const handleSave = () => {
    saveUserProfile(editedProfile);
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const stats = [
    {
      label: "Total Workouts",
      value: profile.totalWorkouts,
      icon: Trophy,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
    {
      label: "Current Streak",
      value: `${profile.currentStreak} days`,
      icon: Flame,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground">Profile</h1>
          <p className="text-sm text-muted-foreground">Manage your fitness profile</p>
        </div>
        {!isEditing && (
          <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
            <Edit2 className="w-4 h-4 mr-2" />
            Edit
          </Button>
        )}
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-3xl border border-border p-6"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <User className="w-8 h-8 text-primary" />
          </div>
          <div>
            {isEditing ? (
              <Input
                value={editedProfile.name}
                onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                className="text-lg font-bold mb-1"
                placeholder="Your name"
              />
            ) : (
              <h2 className="text-xl font-bold text-foreground">{profile.name}</h2>
            )}
            <p className="text-sm text-muted-foreground">Fitness Enthusiast</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Weight */}
          <div className="flex items-center justify-between p-4 bg-secondary rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Weight className="w-5 h-5 text-blue-500" />
              </div>
              <span className="font-medium text-foreground">Weight</span>
            </div>
            {isEditing ? (
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={editedProfile.weight}
                  onChange={(e) => setEditedProfile({ ...editedProfile, weight: parseFloat(e.target.value) || 0 })}
                  className="w-20 text-right"
                />
                <span className="text-muted-foreground">kg</span>
              </div>
            ) : (
              <span className="text-foreground font-semibold">{profile.weight} kg</span>
            )}
          </div>

          {/* Fitness Goal */}
          <div className="p-4 bg-secondary rounded-2xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <span className="font-medium text-foreground">Fitness Goal</span>
            </div>
            {isEditing ? (
              <div className="flex flex-wrap gap-2">
                {fitnessGoals.map((goal) => (
                  <button
                    key={goal}
                    onClick={() => setEditedProfile({ ...editedProfile, fitnessGoal: goal })}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                      editedProfile.fitnessGoal === goal
                        ? "bg-primary text-primary-foreground"
                        : "bg-background text-muted-foreground hover:bg-background/80"
                    }`}
                  >
                    {goal}
                  </button>
                ))}
              </div>
            ) : (
              <span className="text-primary font-semibold">{profile.fitnessGoal}</span>
            )}
          </div>
        </div>

        {isEditing && (
          <div className="flex gap-3 mt-6">
            <Button variant="outline" className="flex-1" onClick={() => {
              setIsEditing(false);
              setEditedProfile(profile);
            }}>
              Cancel
            </Button>
            <Button className="flex-1" onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        )}
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 gap-4"
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-card rounded-2xl border border-border p-4"
          >
            <div className={`w-10 h-10 rounded-xl ${stat.bgColor} flex items-center justify-center mb-3`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Pro Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-2xl border border-border p-6"
      >
        <h3 className="text-lg font-semibold text-foreground mb-4">Tips for {profile.fitnessGoal}</h3>
        <div className="space-y-3">
          {profile.fitnessGoal === "Build Muscle" && (
            <>
              <TipItem text="Aim for 1.6-2.2g protein per kg bodyweight" />
              <TipItem text="Progressive overload is key - increase weight or reps weekly" />
              <TipItem text="Get 7-9 hours of sleep for optimal recovery" />
            </>
          )}
          {profile.fitnessGoal === "Lose Weight" && (
            <>
              <TipItem text="Create a moderate calorie deficit of 300-500 calories" />
              <TipItem text="Prioritize protein to maintain muscle mass" />
              <TipItem text="Include both cardio and strength training" />
            </>
          )}
          {profile.fitnessGoal === "Improve Strength" && (
            <>
              <TipItem text="Focus on compound movements like squats, deadlifts, bench press" />
              <TipItem text="Train in the 3-5 rep range for strength gains" />
              <TipItem text="Rest 3-5 minutes between heavy sets" />
            </>
          )}
          {profile.fitnessGoal === "Increase Endurance" && (
            <>
              <TipItem text="Gradually increase workout duration each week" />
              <TipItem text="Include both steady-state and interval training" />
              <TipItem text="Stay hydrated and fuel workouts with carbs" />
            </>
          )}
          {profile.fitnessGoal === "Stay Active" && (
            <>
              <TipItem text="Aim for at least 150 minutes of activity per week" />
              <TipItem text="Find activities you enjoy to stay consistent" />
              <TipItem text="Take the stairs and walk more throughout the day" />
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function TipItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  );
}
