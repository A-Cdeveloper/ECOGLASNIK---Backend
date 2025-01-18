const ErrorField = ({
  field,
  errors,
}: {
  field: string;
  errors: { [key: string]: string }[];
}) => {
  // Filter errors for the specified field
  const fieldErrors = errors
    .filter((error) => error[field])
    .map((error) => error[field]);

  return (
    <div className="mt-1">
      {fieldErrors.length > 0 && (
        <>
          {fieldErrors.map((message, index) => (
            <span key={index} className="text-danger-100 w-full text-[13px]">
              {`${message} `}
            </span>
          ))}
        </>
      )}
    </div>
  );
};

export default ErrorField;
