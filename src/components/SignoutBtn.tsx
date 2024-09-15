'use client'

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignoutBtn = ({lang} : {lang:string}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSignout = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("http://localhost:3002/auth/signout", {
                method: "POST",
                credentials: "include", // Bu, çerezleri de göndermemizi sağlar
            });

            if (response.ok) {
                router.push(`/${lang}/signin`);
                router.refresh(); // Bu, sayfayı yenileyerek tüm istemci tarafı durumunu sıfırlar
            } else {
                console.error("Çıkış yapılırken bir hata oluştu");
            }
        } catch (error) {
            console.error("Çıkış yapılırken bir hata oluştu", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button 
            onClick={handleSignout} 
            disabled={isLoading}
        >
            {isLoading ? "Çıkış yapılıyor..." : "Çıkış Yap"}
        </Button>
    )
}

export default SignoutBtn;