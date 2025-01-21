"use client";
import { useEffect, useState } from "react";

const ErrorsFormMessage = ({ errors }: { errors: string[] }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (errors.length > 0) {
      setVisible(false);
      const timer = setTimeout(() => {
        setVisible(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [errors]);

  if (visible) {
    return null;
  }

  return (
    <div className=" text-danger-100 w-full text-[13px] my-2">
      {errors.map((error) => (
        <p key={error}>{error}</p>
      ))}
    </div>
  );
};

export default ErrorsFormMessage;
