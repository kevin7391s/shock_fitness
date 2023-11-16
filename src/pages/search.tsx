import React, { useContext, useState, useEffect } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import { firestore } from "../lib/firebase.js";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";
import { UserContext } from "@/context/userContext";
import { addFriend } from "@/friendshipUtils/addFriend";
import Image from "next/image.js";

interface User {
  username: string;
  id: string; // include the user id
  profilePic?: string; // URL of the profile picture
  friends?: string[];
  pendingRequests?: string[];
}

function Search() {
  const currentUser = useContext(UserContext);
  const [currentUserData, setCurrentUserData] = useState<User | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (currentUser) {
        const userDoc = await getDoc(doc(firestore, "users", currentUser.uid));
        setCurrentUserData(userDoc.data() as User);
      }
    };
    fetchCurrentUser();
  }, [currentUser]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const usersRef = collection(firestore, "users");
    const q = query(usersRef, where("username", "==", searchTerm));

    const querySnapshot = await getDocs(q);
    const foundUsers: User[] = [];
    querySnapshot.forEach((doc) => {
      foundUsers.push({ ...doc.data(), id: doc.id } as User);
    });

    setResults(foundUsers);
    setLoading(false);
  };

  const getButtonText = (userId: string) => {
    if (currentUserData) {
      if (currentUserData.friends?.includes(userId)) return "Friends";
      if (currentUserData.pendingRequests?.includes(userId)) return "Pending";
    }
    return "Add Friend";
  };

  return (
    <div
      className="flex flex-col min-h-screen bg-black text-white"
      style={{ backgroundColor: "#121212" }}
    >
      <NavBar />
      <div className="flex flex-col items-center mt-32">
        <Image
          src="/images/search.png"
          alt="Fitness App Logo"
          width={200}
          height={100}
        />
      </div>
      <div className="flex flex-col items-center">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            className="rounded h-8 w-72 w-auto text-black ml "
            placeholder=" Search for a user..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className=" items-center h-8 w-15  mt-10 mb-10 bg-cyan-300 hover:bg-cyan-400 text-black font-bold py-1s px-4 ml-4 rounded "
          >
            Search
          </button>
        </form>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="flex flex-col">
            <ul>
              {results.map((user, index) => (
                <li
                  key={index}
                  className="flex justify-start items-center my-2"
                >
                  <div className="border-3 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 border-white  rounded p-3  flex items-center space-x-4 text-black">
                    <p className="mr-10 font-bold">{user.username}</p>
                    {user.profilePic && (
                      <img
                        src={user.profilePic}
                        alt="Profile"
                        className="h-8 w-8 "
                      />
                    )}
                    <button
                      className=" w-auto bg-cyan-300 hover:bg-cyan-400 text-black text-xs  py-2 px-3 rounded-full border-1 border-gray-500 shadow-lg "
                      onClick={async () => {
                        if (currentUser?.uid && currentUserData) {
                          // <-- add optional chaining here
                          const newFriendId = await addFriend(
                            currentUser.uid,
                            user.id
                          );
                          setCurrentUserData({
                            ...currentUserData,
                            pendingRequests: [
                              ...(currentUserData.pendingRequests || []),
                              newFriendId,
                            ],
                          });
                        } else {
                          console.error("Current user is not defined");
                        }
                      }} // Add friend request from current user to this user
                      disabled={getButtonText(user.id) !== "Add Friend"}
                    >
                      {getButtonText(user.id)}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Search;
