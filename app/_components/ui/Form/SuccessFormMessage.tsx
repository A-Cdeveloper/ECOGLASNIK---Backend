"use client";
import { useEffect, useState } from "react";

const SuccessFormMessage = ({ message }: { message: string[] }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message.length > 0) {
      setVisible(false);
      const timer = setTimeout(() => {
        setVisible(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  if (visible) {
    return null;
  }

  return (
    <div className="text-turquoise-100 w-full text-[13px] my-2">
      {message[0]}
    </div>
  );
};

export default SuccessFormMessage;
