"use client";

import { useEffect, useState, PropsWithChildren } from "react";

export default function Hydrate({ children }: PropsWithChildren) {
  const [isHydrated, setIsHydrated] = useState(false);

  // Wait until nextjs rehydration completes
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated ? children : <div>Loading</div>;
}
