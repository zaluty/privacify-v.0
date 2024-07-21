"use client";
import React, { useState, useTransition } from "react";

import Image from "next/image";
import { toast } from "sonner";

const EmailForm = () => {
  const [isPending, startTransaction] = useTransition();
  const [email, setEmail] = useState("");
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const date = new Date();
  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const form = new FormData(target);
    const email = form.get("email");
    if (!email) {
      return null;
    }

    startTransaction(async () => {
      try {
        const res = await fetch("/api/resend", {
          method: "POST",
          body: JSON.stringify({ email }),
          headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
          target.reset();
          toast.success("Thank you for subscribing 🎉");
          console.log("Email sent", res);
        } else {
          console.error("Error:", res.status, res.statusText);
          toast.error("Something went wrong");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("Something went wrong");
      }
    });
  };
  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-[#8bb4ff]">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col justify-center items-center gap-2"
        >
          <div className="text-center mb-4 text-white text-2xl font-bold max-w-[500px]">
            Sign up for{" "}
            <span className="font-bold text-blue-800  underline underline-offset-4  ">
              privacify-blue
            </span>{" "}
            web-extension and protect yourself against unethical websites
          </div>
          <div className="relative">
            <input
              type="email"
              name="email"
              id="email"
              required
              className="lg:w-[300px]    py-2 px-3 rounded-md text-base pl-8 shadow-button-shadow border bg-white/50 focus-visible:outline-none focus-visible:bg-white"
            />
          </div>
          <button
            disabled={isPending}
            type="submit"
            className="bg-gradient-to-b from-white to-[#f8eedb] text-[#482307] shadow-button-shadow font-semibold py-2 px-3 rounded-md text-base transition-all duration-200"
          >
            Subscribe
          </button>
        </form>
      </div>
    </>
  );
};

export default EmailForm;
