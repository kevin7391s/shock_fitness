import React, { useState, useEffect, ReactNode } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { User } from "firebase/auth"; // import User type from firebase
import { auth } from "../lib/firebase.js";

// Define a context to store the user data
const UserContext = React.createContext<User | null>(null);

interface UserProviderProps {
  children: ReactNode;
}

// This component wraps your application and provides the UserContext
function UserProvider({ children }: UserProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null); // declare type for state

  // Listen for changes to the user's authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    // Clean up the listener when the component is unmounted
    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider value={currentUser}>{children}</UserContext.Provider>
  );
}

export { UserContext, UserProvider };
