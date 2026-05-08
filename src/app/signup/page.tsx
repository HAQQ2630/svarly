import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { SignUpForm } from "@/components/sign-up-form";

export default function SignUpPage() {
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

        <div
          className="rounded-[18px] border border-[#E0DDD5] bg-white px-8 py-9"
          style={{ boxShadow: "0 4px 32px rgba(0,0,0,0.08)" }}
        >
          <h1 className="mb-1.5 text-center text-[22px] font-semibold tracking-[-0.4px] text-[#1F2A24]">
            Opret din konto
          </h1>
          <p className="mb-7 text-center text-[14px] text-[#5C6B62]">
            Gratis i 14 dage. Intet kreditkort.
          </p>

          <Suspense fallback={null}>
            <SignUpForm />
          </Suspense>
        </div>

        <p className="mt-5 text-center text-[13px] text-[#5C6B62]">
          Har du allerede en konto?{" "}
          <Link
            href="/login"
            className="font-medium text-[#2F4F3E] hover:underline"
          >
            Log ind
          </Link>
        </p>
      </div>
    </div>
  );
}
