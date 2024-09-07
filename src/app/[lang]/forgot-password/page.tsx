import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import IconWhite from "/public/sociclone_icon_white.svg";
import { getDictionary } from "../dictionaries";

const ForgotPasswordPage = async ({
  params: { lang },
}: {
  params: { lang: string };
}) => {
  const dict = await getDictionary(lang);

  const { ForgotPasswordPage } = dict;

  return (
    <main className="w-screen min-h-screen grid md:grid-cols-2">
      <div className="py-4">
        <div className="w-full h-full rounded-tr-xl overflow-hidden rounded-br-xl flex flex-col items-center relative">
          <div className="w-full h-full absolute inset-0 bg-gradient-to-t from-lime-700 to-lime-100 opacity-70"></div>
          <img src={IconWhite?.src} className="z-10 w-24 mt-12" alt="" />
          <div className="mt-auto mb-4 z-10 w-4/5 flex flex-col">
            <p className="text-white text-2xl text-balance">
              {ForgotPasswordPage.testimonial}
            </p>
            <div className="flex justify-between items-center">
              <p className="font-bold text-lg mt-3 text-white">{ForgotPasswordPage.testimonialName}</p>
              <p className="text-white font-light">{ForgotPasswordPage.testimonialMember}</p>
            </div>
            <p className="text-white">{ForgotPasswordPage.testimonialOccupation}</p>
          </div>
          <img
            className="w-full h-full object-cover absolute inset-0 -z-20"
            src="https://images.pexels.com/photos/831545/pexels-photo-831545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""
          />
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="p-4 max-w-sm w-full">
          <Link href="/signin">
            <p className="text-left mb-2 flex items-center text-gray-400 hover:underline">
              <svg
                className="w-6 h-6 inline-block me-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m7.85 13l2.85 2.85q.3.3.288.7t-.288.7q-.3.3-.712.313t-.713-.288L4.7 12.7q-.3-.3-.3-.7t.3-.7l4.575-4.575q.3-.3.713-.287t.712.312q.275.3.288.7t-.288.7L7.85 11H19q.425 0 .713.288T20 12t-.288.713T19 13z"
                />
              </svg>{" "}
              {ForgotPasswordPage.backToLogin}
            </p>
          </Link>
          <h1 className="text-3xl font-bold text-gray-700 mb-2">{ForgotPasswordPage.title}</h1>
          <p className="text-gray-500 mb-8">
            {ForgotPasswordPage.description}
          </p>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">{ForgotPasswordPage.email}</Label>
            <Input
              type="email"
              id="email"
              className="focus-visible:ring-lime-500"
              placeholder={ForgotPasswordPage.emailPlaceholder}
            />
          </div>
          <Button
            variant={"default"}
            className="w-full py-6 mt-6 bg-lime-300 text-lime-800 font-bold tracking-wide hover:bg-lime-400"
          >
            {ForgotPasswordPage.sendResetLink}
          </Button>
        </div>
      </div>
    </main>
  );
};

export default ForgotPasswordPage;
