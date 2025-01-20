const ErrorsFormMessage = ({ errors }: { errors: string[] }) => {
  return (
    <div className=" text-danger-100 w-full text-[13px] my-1">
      {errors.map((error) => (
        <p key={error}>{error}</p>
      ))}
    </div>
  );
};

export default ErrorsFormMessage;
