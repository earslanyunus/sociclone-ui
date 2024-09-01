import CompanyLogo from "@/components/commons/CompanyLogo";
import { IcRoundApple } from "@/components/icons/IcRoundApple";
import { LogosGoogleIcon } from "@/components/icons/LogosGoogleIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import IconWhite from "/public/sociclone_icon_white.svg";
import Link from "next/link";
import { getDictionary } from "../dictionaries";

const signupPage = async ({
  params: { lang },
}: {
  params: { lang: string };
}) => {
  const dict = await getDictionary(lang);

  const { SignupPage } = dict;

  return (
    <main className="w-screen min-h-screen grid md:grid-cols-2">
      <div className=" py-4 ">
        <div className="w-full h-full rounded-tr-xl overflow-hidden rounded-br-xl  flex flex-col items-center  relative">
          <div className="w-full h-full absolute inset-0 bg-gradient-to-t from-lime-700 to-lime-100  opacity-70"></div>
          <img src={IconWhite?.src} className="z-10 w-24 mt-12" alt="" />
          <div className="mt-auto mb-4 z-10 w-2/3 flex flex-col">
            <p className="text-white text-2xl text-balance">
              {" "}
              “This app is amazing! Sharing photos is so easy, and the filters
              are fantastic.”
            </p>
            <div className="flex justify-between items-center">
              <p className="font-bold text-lg mt-3 text-white">Emily T</p>
              {/* register date-- 2017 yilindan beri uye */}
              <p className="text-white font-light">Member since 2017</p>
            </div>
            <p className="text-white">Photographer</p>
          </div>
          <img
            className="w-full h-full object-cover absolute inset-0 -z-20"
            src="https://images.pexels.com/photos/708392/pexels-photo-708392.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
        </div>
      </div>
      <div className="flex items-center justify-center ">
        <div className=" p-4 max-w-sm w-full">
          <Link href="/signin">
            <p className="text-left mb-2 flex items-center   text-gray-400 hover:underline">
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
              {SignupPage.haveAccount}
            </p>
          </Link>
          <p
            className="text-3xl font-bold  text-gray-700"
            dangerouslySetInnerHTML={{ __html: SignupPage.welcome }}
          ></p>
          <p className="text-gray-500  mb-8">{SignupPage.joinUs}</p>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">{SignupPage.email}</Label>
            <Input
              type="email"
              id="email"
              className="focus-visible:ring-lime-500 "
            />
          </div>
          <div className="grid mt-3 w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="password">{SignupPage.password}</Label>
            <Input
              type="password"
              id="password"
              className="focus-visible:ring-lime-500"
            />
          </div>
          <Button
            variant={"default"}
            className="w-full py-6 mt-6 bg-lime-300 text-lime-800 font-bold tracking-wide hover:bg-lime-400 "
          >
            {SignupPage.register}
          </Button>

          <p className=" mt-4 group  flex justify-between items-center underline bg-lime-100 rounded-md p-2 text-lime-600">
            {SignupPage.easierWay}{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 group-hover:animate-bounce"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M11 14.2V6q0-.425.288-.712T12 5t.713.288T13 6v8.2l2.9-2.9q.275-.275.7-.275t.7.275t.275.7t-.275.7l-4.6 4.6q-.3.3-.7.3t-.7-.3l-4.6-4.6q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275z"
              />
            </svg>
          </p>

          <Button
            variant={"outline"}
            className="w-full  py-6 mt-6 hover:bg-white hover:border-lime-400 shadow-sm"
          >
            <LogosGoogleIcon className="w-6 h-6 me-4 " />
            <span>{SignupPage.registerWithGoogle}</span>
          </Button>
          <Button
            variant={"outline"}
            className="w-full py-6 mt-4 hover:bg-white hover:border-lime-400 shadow-sm"
          >
            <IcRoundApple className="w-8 h-8 me-4 " />
            {SignupPage.registerWithApple}
          </Button>
        </div>
      </div>
    </main>
  );
};

export default signupPage;
