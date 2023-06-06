import React, { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../lib/firebase.js";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";

interface User {
  username: string;
  profilePic?: string; // URL of the profile picture
}

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const usersRef = collection(firestore, "users");
    const q = query(usersRef, where("username", "==", searchTerm));

    const querySnapshot = await getDocs(q);
    const foundUsers: User[] = [];
    querySnapshot.forEach((doc) => {
      foundUsers.push(doc.data() as User);
    });

    setResults(foundUsers);
    setLoading(false);
  };

  return (
    <div
      className="flex flex-col min-h-screen bg-black text-white"
      style={{ backgroundColor: "#121212" }}
    >
      <NavBar />
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a user..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {results.map((user, index) => (
            <li key={index}>
              <p>{user.username}</p>
              {user.profilePic && <img src={user.profilePic} alt="Profile" />}
              <button>Add Friend</button>
            </li>
          ))}
        </ul>
      )}
      <Footer />
    </div>
  );
}

export default Search;
