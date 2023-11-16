import React, { useState, useEffect, useContext } from "react";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../lib/firebase.js";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";
import Image from "next/image";
import Link from "next/link.js";

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
    <div
      className="flex flex-col min-h-screen bg-black text-white"
      style={{ backgroundColor: "#121212" }}
    >
      <NavBar />

      <main className="flex flex-col mt-32 items-center flex-1 w-full px-20 ">
        <Image
          src="/images/friends.png"
          alt="Fitness App Logo"
          width={200}
          height={100}
        />
        <div className="grid grid-cols-1 justify-center mt-10 mb-24">
          {friends.map((friend, index) => (
            <div
              key={index}
              className="friend-card m-4 p-5  shadow-md rounded-lg w-80 h-12 flex flex-row justify-between items-center text-white bg-gray-600 mb-5"
              style={{ backgroundColor: "#333333" }}
            >
              <span>{friend.username}</span>
              <Link href="/underConstruction">
                <div className="bg-gray-500 hover:bg-cyan-500 text-sm text-black px-1 py-1 rounded">
                  View Profile
                </div>
              </Link>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Friends;
