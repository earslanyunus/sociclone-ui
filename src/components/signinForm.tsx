"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRef } from "react";
import Link from "next/link";
import { Button } from "./ui/button";

const SigninForm = ({ lang }: { lang: any }) => {
  const SigninPage = lang;
  const mailpasswordref = useRef<HTMLDivElement>(null);
  const otpRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <div className="relative px-4  w-full overflow-hidden max-w-sm">
        <div ref={mailpasswordref} className="transition-all duration-300">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">{SigninPage.email}</Label>
            <Input
              type="email"
              id="email"
              className="focus-visible:ring-lime-500 "
            />
          </div>
          <div className="grid mt-3 w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="password">{SigninPage.password}</Label>
            <Input
              type="password"
              id="password"
              className="focus-visible:ring-lime-500"
            />
            <Link
              href="/forgot-password"
              className="text-sm  text-gray-400 hover:underline"
            >
              {SigninPage.forgotPassword}
            </Link>
          </div>
        </div>

        <div
          ref={otpRef}
          className=" absolute top-1/2  px-4  -translate-y-1/2 left-0  w-full   transition-all duration-300 translate-x-[130%]"
        >
                        <Label htmlFor="otp">{SigninPage.otp}</Label>

          <InputOTP  id="otp"  maxLength={6}>
            <InputOTPGroup  className="w-full" >
              <InputOTPSlot className="w-full"  index={0} />
              <InputOTPSlot className="w-full" index={1} />
              <InputOTPSlot className="w-full" index={2} />

              <InputOTPSlot className="w-full" index={3} />
              <InputOTPSlot className="w-full" index={4} />

              <InputOTPSlot className="w-full" index={5} />
            </InputOTPGroup>
          </InputOTP>
          <div className="flex justify-center items-center">
            <p className="text-sm text-center mt-2 text-gray-400">{SigninPage.otpDescription}</p>
          </div>
        </div>
      </div>

      <div className="px-4 mt-4">
        <Button
          onClick={() => {
            mailpasswordref.current?.classList.add("-translate-x-[130%]");
            mailpasswordref.current?.classList.remove("translate-x-0");
            otpRef.current?.classList.add("translate-x-0");
            otpRef.current?.classList.remove("translate-x-[130%]");
          }}
          variant={"default"}
          className="w-full py-6   bg-lime-300 text-lime-800 font-bold tracking-wide hover:bg-lime-400 "
        >
          {SigninPage.login}
        </Button>
      </div>
    </div>
  );
};

export default SigninForm;
