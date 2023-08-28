import React, { useState, useEffect, useContext } from "react";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../lib/firebase.js";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";

import { UserContext } from "@/context/userContext";

function Friends() {
  type Friend = {
    username: string;
    // Add other properties as needed.
  };
  const [friends, setFriends] = useState<Friend[]>([]);

  const currentUser = useContext(UserContext);

  useEffect(() => {
    if (currentUser && currentUser.uid) {
      const currentUserID = currentUser.uid;

      const fetchFriends = async () => {
        const userDoc = await getDoc(doc(firestore, "users", currentUserID));

        if (userDoc.exists() && Array.isArray(userDoc.data()?.friends)) {
          const friendsIDs = userDoc.data()?.friends;

          const friendsData = await Promise.all(
            friendsIDs.map(async (id: string) => {
              const friendDoc = await getDoc(doc(firestore, "users", id));
              return friendDoc.data() as Friend;
            })
          );

          setFriends(friendsData);
        }
      };

      fetchFriends();
    }
  }, [currentUser]);

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <NavBar />
      <main className="flex flex-col mt-32 items-center flex-1 w-full px-20">
        <h1 className="text-3xl font-semibold mb-6">My Friends</h1>
        <div className="flex flex-wrap justify-center">
          {friends.map((friend, index) => (
            <div
              key={index} // Use the index if ID isn't available, or use another unique identifier.
              className="friend-card m-4 p-6 border border-gray-500 rounded-lg w-32 h-8 flex flex-col items-center justify-center text-white"
            >
              {friend.username}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Friends;
