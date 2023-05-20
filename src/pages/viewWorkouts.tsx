import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import { auth, firestore } from "../lib/firebase.js";
import Image from "next/image";
import NavBar from "@/components/navbar";

interface Workout {
  workoutType: string;
  cardioType?: string;
  intensity?: string;
  duration?: number;
  weightliftingType?: string;
  sets?: number;
  setDetails?: { weight: number; reps: number }[];
  user: string;
  date: Timestamp;
}

function ViewWorkouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      console.log("No user logged in");
      return;
    }

    const workoutQuery = query(
      collection(firestore, "workouts"),
      where("user", "==", user.uid)
    );

    const unsub = onSnapshot(workoutQuery, (snapshot) => {
      const fetchedWorkouts: Workout[] = [];
      snapshot.forEach((doc) => fetchedWorkouts.push(doc.data() as Workout));
      setWorkouts(fetchedWorkouts);
    });

    // Clean up the subscription on unmount
    return () => unsub();
  }, []);

  return (
    <div>
      <NavBar />
      {workouts.map((workout, i) => (
        <div key={i} className="workout-box">
          <h2>Date: {workout.date.toDate().toDateString()}</h2>
          <p>Workout Type: {workout.workoutType}</p>
          {workout.workoutType === "cardio" && (
            <>
              <p>Cardio Type: {workout.cardioType}</p>
              <p>Intensity: {workout.intensity}</p>
              <p>Duration: {workout.duration} minutes</p>
            </>
          )}
          {workout.workoutType === "weightlifting" && (
            <>
              <p>Weightlifting Type: {workout.weightliftingType}</p>
              <p>Sets: {workout.sets}</p>
              {workout.setDetails?.map((set, i) => (
                <div key={i}>
                  <p>
                    Set {i + 1} Weight: {set.weight} lbs
                  </p>
                  <p>
                    Set {i + 1} Reps: {set.reps}
                  </p>
                </div>
              ))}
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default ViewWorkouts;
