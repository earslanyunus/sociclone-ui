"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const emailPasswordSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const otpSchema = z.object({
  otp: z.string().length(6),
});

function SigninForm({ lang }: { lang: any }) {
  const SigninPage = lang;
  const router = useRouter();
  const mailpasswordref = useRef<HTMLDivElement>(null);
  const otpRef = useRef<HTMLDivElement>(null);
  const [showOTP, setShowOTP] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const emailPasswordForm = useForm<z.infer<typeof emailPasswordSchema>>({
    resolver: zodResolver(emailPasswordSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  useEffect(() => {
    if (showOTP) {
      mailpasswordref.current?.classList.add("-translate-x-[130%]");
      otpRef.current?.classList.remove("translate-x-[130%]");
    }
  }, [showOTP]);

  const onEmailPasswordSubmit = async (values: z.infer<typeof emailPasswordSchema>) => {
    setError(null);
    try {
      const response = await fetch("http://localhost:3002/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (response.ok) {
        setEmail(values.email);
        setShowOTP(true);
      } else {
        setError(data.message || "Giriş başarısız. Lütfen bilgilerinizi kontrol edin.");
      }
    } catch (error) {
      setError("Sunucu hatası. Lütfen daha sonra tekrar deneyin.");
    }
  };

  const onOTPSubmit = async (values: z.infer<typeof otpSchema>) => {
    setError(null);
    try {
      const response = await fetch("http://localhost:3002/auth/login-verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: values.otp }),
        credentials: "include"
      });
      const data = await response.json();
      if (response.ok) {
        
        router.push("/home");

        
      } else {
        setError(data.message || "OTP doğrulama başarısız.");
      }
    } catch (error) {
      setError("Sunucu hatası. Lütfen daha sonra tekrar deneyin.");
    }
  };

  const ErrorMessage = ({ message }: { message: string }) => (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
      <span className="block sm:inline">{message}</span>
    </div>
  );

  // Animasyon ayarları
  const variants = {
    initial: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    }),
  };

  return (
    <div className="relative w-full max-w-sm overflow-hidden">
      <AnimatePresence initial={false} custom={showOTP ? 1 : -1}>
        {!showOTP ? (
          <motion.div
            key="signin"
            custom={showOTP ? 1 : -1}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="px-4"
            layout
          >
            <Form {...emailPasswordForm}>
              {error && <ErrorMessage message={error} />}
              <form
                onSubmit={emailPasswordForm.handleSubmit(onEmailPasswordSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={emailPasswordForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{SigninPage.email}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          autoComplete="email"
                          type="email"
                          className="focus-visible:ring-lime-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={emailPasswordForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{SigninPage.password}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          autoComplete="current-password"
                          type="password"
                          className="focus-visible:ring-lime-500"
                        />
                      </FormControl>
                      <FormMessage />
                      <Link
                        href="/forgot-password"
                        className="text-sm text-gray-400 hover:underline"
                      >
                        {SigninPage.forgotPassword}
                      </Link>
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  variant="default"
                  className="w-full py-6 bg-lime-300 text-lime-800 font-bold tracking-wide hover:bg-lime-400"
                >
                  {SigninPage.login}
                </Button>
              </form>
            </Form>
          </motion.div>
        ) : (
          <motion.div
            key="otp"
            custom={showOTP ? 1 : -1}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="px-4"
            layout
          >
            <Form {...otpForm}>
              {error && <ErrorMessage message={error} />}
              <form
                onSubmit={otpForm.handleSubmit(onOTPSubmit)}
                className="flex flex-col items-center justify-center"
              >
                <FormField
                  control={otpForm.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>{SigninPage.otp}</FormLabel>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup className="w-full">
                            <InputOTPSlot index={0} className="w-full" />
                            <InputOTPSlot index={1} className="w-full" />
                            <InputOTPSlot index={2} className="w-full" />
                            <InputOTPSlot index={3} className="w-full" />
                            <InputOTPSlot index={4} className="w-full" />
                            <InputOTPSlot index={5} className="w-full" />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormMessage />
                      <p className="text-sm text-center mt-2 text-gray-400">
                        {SigninPage.otpDescription}
                      </p>
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  variant="default"
                  className="w-full mt-12 py-6 bg-lime-300 text-lime-800 font-bold tracking-wide hover:bg-lime-400"
                >
                  {SigninPage.verify}
                </Button>
              </form>
            </Form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SigninForm;
