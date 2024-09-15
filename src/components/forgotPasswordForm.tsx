"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { useState } from "react";
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

const emailSchema = z.object({
  email: z.string().email('Geçerli bir e-posta adresi giriniz'),
});

const otpSchema = z.object({
  otp: z.string().length(6, 'OTP 6 haneli olmalıdır'),
});

const passwordSchema = z.object({
  newPassword: z.string().min(6, 'Şifre en az 6 karakter olmalıdır'),
});

const ForgotPasswordForm = ({ ForgotPasswordPage }: { ForgotPasswordPage: any }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [part1Hash, setPart1Hash] = useState("");
  const [part2Hash, setPart2Hash] = useState("");

  const router = useRouter();

  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      newPassword: "",
    },
  });

  const onEmailSubmit = async (values: z.infer<typeof emailSchema>) => {
    setError(null);
    try {
      const response = await fetch("http://localhost:3002/auth/forgotpassword-part1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (response.ok) {
        setPart1Hash(data.part1Hash);
        setCurrentStep(2);
      } else {
        setError(data.message || "Bir hata oluştu");
      }
    } catch (error) {
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  const onOTPSubmit = async (values: z.infer<typeof otpSchema>) => {
    setError(null);
    try {
      const response = await fetch("http://localhost:3002/auth/forgotpassword-part2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ part1Hash, otp: values.otp }),
      });
      const data = await response.json();
      if (response.ok) {
        setPart2Hash(data.part2Hash);
        setCurrentStep(3);
      } else {
        setError(data.message || "Bir hata oluştu");
      }
    } catch (error) {
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  const onPasswordSubmit = async (values: z.infer<typeof passwordSchema>) => {
    setError(null);
    try {
      const response = await fetch("http://localhost:3002/auth/forgotpassword-part3", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ part2Hash, newPassword: values.newPassword }),
      });
      const data = await response.json();
      if (response.ok) {
        router.push("/signin");
      } else {
        setError(data.message || "Bir hata oluştu");
      }
    } catch (error) {
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
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
    <div className="max-w-sm w-full relative overflow-hidden">
      {error && <ErrorMessage message={error} />}
      
      <AnimatePresence initial={false} custom={currentStep}>
        {currentStep === 1 && (
          <motion.div
            key="email"
            custom={currentStep}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="px-4"
            layout
          >
            <Form {...emailForm}>
              <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-4">
                <FormField
                  control={emailForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{ForgotPasswordPage.email}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          className="focus-visible:ring-lime-500"
                          placeholder={ForgotPasswordPage.emailPlaceholder}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  variant="default"
                  className="w-full py-6 bg-lime-300 text-lime-800 font-bold tracking-wide hover:bg-lime-400"
                >
                  {ForgotPasswordPage.sendResetLink}
                </Button>
              </form>
            </Form>
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div
            key="otp"
            custom={currentStep}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="px-4"
            layout
          >
            <Form {...otpForm}>
              <form onSubmit={otpForm.handleSubmit(onOTPSubmit)} className="space-y-4">
                <FormField
                  control={otpForm.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{ForgotPasswordPage.otp}</FormLabel>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup className="w-full">
                            <InputOTPSlot className="w-full" index={0} />
                            <InputOTPSlot className="w-full" index={1} />
                            <InputOTPSlot className="w-full" index={2} />
                            <InputOTPSlot className="w-full" index={3} />
                            <InputOTPSlot className="w-full" index={4} />
                            <InputOTPSlot className="w-full" index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  variant="default"
                  className="w-full py-6 bg-lime-300 text-lime-800 font-bold tracking-wide hover:bg-lime-400"
                >
                  {ForgotPasswordPage.verifyOTP}
                </Button>
              </form>
            </Form>
          </motion.div>
        )}

        {currentStep === 3 && (
          <motion.div
            key="password"
            custom={currentStep}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="px-4"
            layout
          >
            <Form {...passwordForm}>
              <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                <FormField
                  control={passwordForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{ForgotPasswordPage.newPassword}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          className="focus-visible:ring-lime-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  variant="default"
                  className="w-full py-6 bg-lime-300 text-lime-800 font-bold tracking-wide hover:bg-lime-400"
                >
                  {ForgotPasswordPage.resetPassword}
                </Button>
              </form>
            </Form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ForgotPasswordForm;