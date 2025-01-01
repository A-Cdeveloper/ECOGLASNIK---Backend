"use client";
import Image from "next/image";
import Button from "./_components/ui/Buttons/Button";
import Headline from "./_components/ui/Headline";
import { useRouter } from "next/navigation";
import errorImg from "../public/404.png";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="w-full h-full flex justify-center items-center text-center">
      <div>
        <Image
          src={errorImg}
          alt="404"
          width={120}
          height={150}
          className="mx-auto"
        />
        <Headline className="mb-8" level={2}>
          Stranica nije pronađena!
        </Headline>

        <Button
          type="button"
          variation="info"
          size="medium"
          onClick={() => router.push("/")}
        >
          Povratak na početnu
        </Button>
      </div>
    </div>
  );
}
