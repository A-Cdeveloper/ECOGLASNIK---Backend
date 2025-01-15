const ErrorsForm = ({ errors }: { errors: string[] }) => {
  return (
    <div className=" text-danger-100 w-full   py-2 text-[13px] my-2">
      {errors.map((error) => (
        <p key={error}>{error}</p>
      ))}
    </div>
  );
};

export default ErrorsForm;
