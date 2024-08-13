"use client";

import React, { useEffect, useState } from "react";
import { RhfProvider } from "@/contexts/rhf-provider";
import { schema1 } from "./types/schema";
import { useUser } from "./services/queries";
import TestForm from "./TestForm";

const TestFormWrapper = () => {
  const { data: user, isLoading, error } = useUser(1);
  const [defaultValues1, setDefaultValues1] = useState(null);

  useEffect(() => {
    if (user) {
      setDefaultValues1({
        email: user.email,
        name: user.name,
        states: user.states,
      });
    }
  }, [user]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading user data.</p>;
  if (!defaultValues1) return <p>Loading default values...</p>;

  return (
    <RhfProvider schema={schema1} defaultValues={defaultValues1}>
      <TestForm />
    </RhfProvider>
  );
};

export default TestFormWrapper;
