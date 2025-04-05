"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoaderUI from "./LoaderUI";
import { useUserRole } from "@/hooks/useUserRole";

interface RouteGuardProps {
  children: React.ReactNode;
  requireInterviewer?: boolean;
}

export function RouteGuard({ children, requireInterviewer = false }: RouteGuardProps) {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useUser();
  const { isInterviewer, isLoading: isRoleLoading } = useUserRole();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Check basic authentication
    if (isLoaded && !isSignedIn) {
      router.push("/");
      return;
    }

    // If interviewer role is required, check that too
    if (requireInterviewer) {
      if (!isRoleLoading) {
        if (!isInterviewer) {
          router.push("/");
          return;
        } else {
          setIsAuthorized(true);
        }
      }
    } else if (isLoaded && isSignedIn) {
      // If just auth is required (no specific role)
      setIsAuthorized(true);
    }
  }, [isLoaded, isSignedIn, isInterviewer, isRoleLoading, router, requireInterviewer]);

  // Show loading state while checking authentication
  if (!isAuthorized) {
    return <LoaderUI />;
  }

  // If authorized, render children
  return <>{children}</>;
}