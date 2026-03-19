"use client";

import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";

interface SubscriptionState {
  status: "free" | "pro" | "cancelled";
  loading: boolean;
}

export function useSubscription(): SubscriptionState {
  const { user, isLoaded } = useUser();
  const [state, setState] = useState<SubscriptionState>({
    status: "free",
    loading: true,
  });

  useEffect(() => {
    if (!isLoaded || !user) {
      setState({ status: "free", loading: !isLoaded });
      return;
    }

    fetch("/api/user/subscription")
      .then((res) => res.json())
      .then((data) => {
        setState({
          status: data.subscriptionStatus ?? "free",
          loading: false,
        });
      })
      .catch(() => {
        setState({ status: "free", loading: false });
      });
  }, [user, isLoaded]);

  return state;
}
