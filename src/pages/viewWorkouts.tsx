import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  Timestamp,
  orderBy,
  DocumentSnapshot,
  DocumentData,
  startAfter,
  limit,
  getDocs,
} from "firebase/firestore";
import { auth, firestore } from "../lib/firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import Image from "next/image";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";

//create types for variables
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
  // this is setting the initial state to workouts, an empty array and when workouts get added it pushes workout objects to the array.
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [lastVisible, setLastVisible] =
    useState<null | DocumentSnapshot<DocumentData>>(null);

  // This is for checking user authentication, if user has auth, then query the collection
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const workoutQuery = query(
          collection(firestore, "workouts"),
          where("user", "==", user.uid),
          orderBy("date", "desc"),
          limit(5)
        );

        const snapshot = await getDocs(workoutQuery);
        if (!snapshot.empty) {
          const fetchedWorkouts: Workout[] = [];
          snapshot.forEach((doc) => {
            const data = doc.data() as Workout;
            fetchedWorkouts.push(data);
          });
          setWorkouts(fetchedWorkouts);
          setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
        } else {
          console.log("No workouts");
        }
      } else {
        console.log("No user logged in");
      }
    });

    return unsubscribeAuth;
  }, []);

  const loadMoreWorkouts = async () => {
    const user = auth.currentUser;
    if (user) {
      const nextWorkoutsQuery = query(
        collection(firestore, "workouts"),
        where("user", "==", user.uid),
        orderBy("date", "desc"),
        startAfter(lastVisible || {}),
        limit(5)
      );

      const snapshot = await getDocs(nextWorkoutsQuery);
      if (!snapshot.empty) {
        const fetchedWorkouts: Workout[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data() as Workout;
          fetchedWorkouts.push(data);
        });
        setWorkouts((prevWorkouts) => [...prevWorkouts, ...fetchedWorkouts]);
        setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
      } else {
        console.log("No more workouts");
      }
    } else {
      console.log("No user logged in");
    }
  };

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
            <React.Fragment key={i}>
              <h2 className="text-center mt-4">
                {workout.date.toDate().toDateString()}
              </h2>
              <div className="workout-box p-4 border border-white rounded">
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
            </React.Fragment>
          ))}
        </div>
        <button
          className="bg-cyan-300 hover:bg-cyan-400 text-black font-bold py-2 px-4 rounded mt-7 mb-8"
          onClick={loadMoreWorkouts}
        >
          Load More
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default ViewWorkouts;
