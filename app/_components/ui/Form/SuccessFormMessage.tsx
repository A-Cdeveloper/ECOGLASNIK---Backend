const SuccessFormMessage = ({ message }: { message: string[] }) => {
  return (
    <div className=" text-turquoise-100 w-full py-2 text-[13px] my-2">
      {message[0]}
    </div>
  );
};

export default SuccessFormMessage;
