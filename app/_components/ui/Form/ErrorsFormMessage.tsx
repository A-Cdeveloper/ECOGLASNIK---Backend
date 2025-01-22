"use client";
import { useEffect, useState } from "react";

const ErrorsFormMessage = ({
  errors,
  animated = true,
}: {
  errors: string[];
  animated?: boolean;
}) => {
  const [visibleErrors, setVisibleErrors] = useState<string[]>([]);

  useEffect(() => {
    if (errors.length > 0) {
      if (animated) {
        // Show errors and hide them after 3 seconds
        setVisibleErrors(errors);
        const timer = setTimeout(() => {
          setVisibleErrors([]); // Clear errors after 3 seconds
        }, 3000);

        return () => clearTimeout(timer); // Cleanup the timer
      } else {
        // Keep errors visible indefinitely
        setVisibleErrors(errors);
      }
    }
  }, [errors, animated]);

  // Don't render if there are no visible errors
  if (visibleErrors.length === 0) {
    return null;
  }

  return (
    <div className="text-danger-100 w-full text-[13px] my-2">
      {visibleErrors.map((error, index) => (
        <p key={index}>{error}</p>
      ))}
    </div>
  );
};

export default ErrorsFormMessage;
