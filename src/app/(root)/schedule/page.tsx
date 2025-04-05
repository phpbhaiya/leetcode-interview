"use client";

import LoaderUI from "@/components/LoaderUI";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import InterviewScheduleUI from "./InterviewScheduleUI";

function SchedulePage() {
  const { isLoaded, isSignedIn } = useUser();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      setIsLoading(false);
    }
  }, [isLoaded]);

  if (isLoading) return <LoaderUI />;
  if (!isSignedIn) return <div>Please sign in to access this page</div>;

  return <InterviewScheduleUI />;
}
export default SchedulePage;
