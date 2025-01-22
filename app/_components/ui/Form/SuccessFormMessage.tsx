"use client";
import { useEffect, useState } from "react";

const SuccessFormMessage = ({
  message,
  animated = true,
}: {
  message: string[];
  animated?: boolean;
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      if (animated) {
        // Show the success message and hide it after 3 seconds
        setVisible(true);
        const timer = setTimeout(() => {
          setVisible(false); // Hide the message after 3 seconds
        }, 3000);

        return () => clearTimeout(timer); // Cleanup the timer
      } else {
        // Keep the success message visible indefinitely
        setVisible(true);
      }
    }
  }, [message, animated]);

  if (!visible || !message) {
    return null; // Render nothing if not visible or no message
  }

  return (
    <div className="text-turquoise-100 w-full text-[13px] my-2">
      {message[0]}
    </div>
  );
};

export default SuccessFormMessage;
