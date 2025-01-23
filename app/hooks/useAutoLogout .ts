"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LogoutUserAction } from "../(auth)/_actions";

export const useAutoLogout = (
  tokenExpiry: Date | null,
  onLogout: () => void,
  userid: number
) => {
  const router = useRouter();

  useEffect(() => {
    if (!tokenExpiry) return;

    const expirationDate = new Date(tokenExpiry);
    const millisecondsUntilExpiry = expirationDate.getTime() - Date.now();

    if (millisecondsUntilExpiry <= 0) {
      // Token already expired; log out immediately
      handleLogout(onLogout, userid);
      router.replace("/");
    } else {
      // Set a timeout to log out when the token expires
      const timeoutId = setTimeout(() => {
        handleLogout(onLogout, userid);
        router.replace("/");
      }, millisecondsUntilExpiry);

      // Clear timeout if the component unmounts
      return () => clearTimeout(timeoutId);
    }
  }, [tokenExpiry, onLogout, router, userid]);
};

const handleLogout = async (onLogout: () => void, userid: number) => {
  onLogout(); // Client-side state cleanup
  await LogoutUserAction(userid);
};
