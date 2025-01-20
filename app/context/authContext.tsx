"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { getUserFromToken } from "../(auth)/_actions";
import { UserRestrictedType } from "../_utils/db/prismaTypes";
import useSessionStorage from "../hooks/useSessionStorage";

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
  const [user, setUser] = useSessionStorage<UserRestrictedType | null>(
    "user",
    null
  );

  //   // Fetch the user on initial load
  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUserFromToken();
      setUser(userData!);
    };

    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Function to refresh user data (e.g., after editing)
  const refreshUser = useCallback(async () => {
    const updatedUser = await getUserFromToken();
    setUser(updatedUser!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
