import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  Timestamp,
  orderBy,
} from "firebase/firestore";
import { auth, firestore } from "../lib/firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import Image from "next/image";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";

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
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const workoutQuery = query(
          collection(firestore, "workouts"),
          where("user", "==", user.uid),
          orderBy("date", "desc")
        );

        const unsub = onSnapshot(workoutQuery, (snapshot) => {
          const fetchedWorkouts: Workout[] = [];
          snapshot.forEach((doc) =>
            fetchedWorkouts.push(doc.data() as Workout)
          );
          setWorkouts(fetchedWorkouts);
        });

        // Clean up the subscription on unmount
        return () => {
          unsub();
        };
      } else {
        console.log("No user logged in");
      }
    });

    return unsubscribe;
  }, []);

  return (
    <div
      className="flex flex-col bg-black min-h-screen text-white"
      style={{ backgroundColor: "#121212" }}
    >
      <NavBar />
      <div className="flex flex-col items-center flex-grow overflow-auto pb-48">
        <Image
          src="/images/viewWorkouts.png"
          alt="viewWorkoutImage"
          className="mt-36"
          width={300}
          height={100}
        />

        <div className="grid grid-flow-row gap-4 mt-3">
          {workouts.map((workout, i) => (
            <>
              <h2 className="text-center mt-4">
                {workout.date.toDate().toDateString()}
              </h2>
              <div
                key={i}
                className="workout-box p-4 border border-white rounded"
              >
                <div className="border-b border-white mb-2">
                  <p>Workout Type: {workout.workoutType}</p>
                </div>
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
            </>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ViewWorkouts;
