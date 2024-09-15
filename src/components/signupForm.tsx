'use client'
import { motion, AnimatePresence } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const signupSchema = z.object({
  username: z.string().min(3, 'Kullanıcı adı en az 3 karakter olmalıdır'),
  name: z.string().min(2, 'İsim en az 2 karakter olmalıdır'),
  email: z.string().email('Geçerli bir e-posta adresi giriniz'),
  password: z.string().min(6, 'Şifre en az 6 karakter olmalıdır'),
});

const otpSchema = z.object({
  otp: z.string().length(6),
});

const SignupForm = ({ lang }: { lang: any }) => {
  const SignupPage = lang;
  const [error, setError] = useState<string | null>(null);
  const [showOTP, setShowOTP] = useState(false);
  const [email, setEmail] = useState("");

  const signupForm = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      name: "",
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

  const signupUser = async (userData: any) => {
    try {
      console.log('Gönderilen veri:', JSON.stringify(userData, null, 2));

      const response = await fetch("http://localhost:3002/auth/signup", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      console.log('Yanıt durumu:', response.status);
      console.log('Yanıt başlıkları:', response.headers);

      const data = await response.json();
      console.log('Alınan yanıt:', JSON.stringify(data, null, 2));

      if (response.ok) {
        return { success: true };
      } else {
        return { success: false, error: data.message || "Kayıt işlemi başarısız oldu." };
      }
    } catch (error) {
      console.error('Hata:', error);
      return { success: false, error: "Bir hata oluştu. Lütfen daha sonra tekrar deneyin." };
    }
  };

  const verifySignupOTP = async (formData: any) => {
    console.log('Gönderilen veri:', JSON.stringify(formData, null, 2));
    try {
      const response = await fetch("http://localhost:3002/auth/signup-verify", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      });
      const data = await response.json();
      if (response.ok) {
        return { success: true };
      } else {
        return { success: false, error: data.message || "OTP doğrulama başarısız oldu." };
      }
    } catch (error) {
      return { success: false, error: "Bir hata oluştu. Lütfen daha sonra tekrar deneyin." };
    }
  };

  const onSignupSubmit = async (values: z.infer<typeof signupSchema>) => {
    setError(null);
    const result = await signupUser(values);

    if (result.success) {
      setEmail(values.email);
      setShowOTP(true);
    } else {
      setError(result.error);
    }
  };

  const onOTPSubmit = async (values: z.infer<typeof otpSchema>) => {
    setError(null);
    const formData = {
      email: email,
      otp: values.otp
    };

    const result = await verifySignupOTP(formData);

    if (result.success) {
      alert("Kayıt başarılı!");
      // Burada kullanıcıyı giriş sayfasına yönlendirebilirsiniz
    } else {
      setError(result.error);
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
            key="signup"
            custom={showOTP ? 1 : -1}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="px-4"
            layout 





            
          >
            <Form {...signupForm}>
              {error && <ErrorMessage message={error} />}
              <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-4">
                <FormField
                  control={signupForm.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{SignupPage.username}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          autoComplete="username"
                          className="focus-visible:ring-lime-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signupForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{SignupPage.fullname}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          autoComplete="name"
                          className="focus-visible:ring-lime-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signupForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{SignupPage.email}</FormLabel>
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
                  control={signupForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{SignupPage.password}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          autoComplete="new-password"
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
                  {SignupPage.register}
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
            layout // Bu satırı ekleyin
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
                    <FormItem className="">
                      <FormLabel>{SignupPage.otp}</FormLabel>
                      <FormControl>
                        <InputOTP autoComplete="off" maxLength={6} {...field}>
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
                        {SignupPage.otpDescription}
                      </p>
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  variant="default"
                  className="w-full  mt-12 py-6 bg-lime-300 text-lime-800 font-bold tracking-wide hover:bg-lime-400"
                >
                  {SignupPage.verify}
                </Button>
              </form>
            </Form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SignupForm;