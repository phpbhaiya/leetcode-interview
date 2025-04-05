import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { useEffect, useState } from "react";
import { api } from "../../convex/_generated/api";

export const useUserRole = () => {
  const { user, isLoaded: isClerkLoaded } = useUser();
  const [isLoading, setIsLoading] = useState(true);

  const userData = useQuery(api.users.getUserByClerkId, {
    clerkId: user?.id || "",
  });

  useEffect(() => {
    if (isClerkLoaded && userData !== undefined) {
      setIsLoading(false);
    }
  }, [isClerkLoaded, userData]);

  return {
    isLoading,
    isInterviewer: userData?.role === "interviewer",
    isCandidate: userData?.role === "candidate",
    user: userData,
  };
};
