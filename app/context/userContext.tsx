"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { UserRestrictedType } from "../_utils/db/prismaTypes";
import { getUserFromToken } from "../(auth)/_actions";

type UserContextType = {
  user: UserRestrictedType;
  setUser: (user: UserRestrictedType | null) => void;
  refreshUser: () => Promise<void>; // Function to refresh user data
};

const UserContext = createContext({} as UserContextType);

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<UserRestrictedType | null>(null);

  //   // Fetch the user on initial load
  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUserFromToken();
      setUser(userData!);
    };

    fetchUser();
  }, []);

  // Function to refresh user data (e.g., after editing)
  const refreshUser = useCallback(async () => {
    const updatedUser = await getUserFromToken();
    setUser(updatedUser!);
  }, []);

  const value = {
    user: user as UserRestrictedType,
    setUser,
    refreshUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserContextProvider");
  }
  return context;
};
