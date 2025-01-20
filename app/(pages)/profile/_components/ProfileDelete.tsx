import { LogoutUserAction } from "@/app/(auth)/_actions";
import Button from "@/app/_components/ui/Buttons/Button";
import { startTransition, useState } from "react";
import { deleteProfileAction } from "../_actions";
import SuccessFormMessage from "@/app/_components/ui/Form/SuccessFormMessage";
import ErrorsFormMessage from "@/app/_components/ui/Form/ErrorsFormMessage";
import { wait } from "@/app/_utils/helpers";
import { useRouter } from "next/navigation";

const ProfileDelete = ({ userId }: { userId: number }) => {
  const router = useRouter();

  const [response, setResponse] = useState({
    success: false,
    message: [] as string[],
  });

  console.log("response" + response);
  const handleDelete = async () => {
    startTransition(async () => {
      const actionResponse = (await deleteProfileAction(userId)) as {
        success: boolean;
        message: string[];
      };
      setResponse(actionResponse);

      if (actionResponse.success) {
        await LogoutUserAction();
        await wait(3000);
        sessionStorage.clear();
        router.replace("/");
      }
    });
  };

  return (
    <div className="text-end  w-full col-span-3 border-t border-b border-secondary-500/20 py-2 mt-4">
      {/* Success and error messages */}
      {response.message.length > 0 &&
        (response.success ? (
          <SuccessFormMessage message={response.message} />
        ) : (
          <ErrorsFormMessage errors={response.message} />
        ))}
      <Button variation="danger" onClick={handleDelete}>
        Obriši nalog
      </Button>
    </div>
  );
};

export default ProfileDelete;
