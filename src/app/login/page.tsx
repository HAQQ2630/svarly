import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { SignInForm } from "@/components/sign-in-form";

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#F8F9F7] px-6 py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(47,79,62,0.10),transparent_65%)]" />

      <div className="relative z-10 w-full max-w-[400px]">
        <Link href="/" className="mb-8 flex flex-col items-center gap-3">
          <span className="flex h-[50px] w-[50px] items-center justify-center overflow-hidden rounded-[15px]">
            <Image
              src="/logo.png"
              alt="Svarly"
              width={1158}
              height={1154}
              priority
              className="h-full w-full object-cover mix-blend-multiply"
            />
          </span>
          <span className="text-[18px] font-semibold tracking-[-0.3px] text-[#1F2A24]">
            Svarly
          </span>
        </Link>

        <div className="rounded-[18px] bg-card px-8 py-9">
          <h1 className="mb-1.5 text-center text-[22px] font-semibold tracking-[-0.4px] text-[#1F2A24]">
            Velkommen tilbage
          </h1>
          <p className="mb-7 text-center text-[14px] text-[#5C6B62]">
            Log ind for at administrere dine anmeldelser
          </p>

          <Suspense fallback={null}>
            <SignInForm />
          </Suspense>
        </div>

        <p className="mt-5 text-center text-[13px] text-[#5C6B62]">
          Har du ikke en konto?{" "}
          <Link
            href="/signup"
            className="font-medium text-[#2F4F3E] hover:underline"
          >
            Opret gratis
          </Link>
        </p>

        <p className="mt-3 text-center text-[11.5px] text-[#5C6B62]">
          <Link href="/privacy" className="hover:underline">
            Privatlivspolitik
          </Link>
          {" · "}
          <Link href="/vilkaar" className="hover:underline">
            Vilkår
          </Link>
        </p>
      </div>
    </div>
  );
}
