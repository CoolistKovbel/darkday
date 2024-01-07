"use client";

import { Form, FormField } from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";
import { useSession } from "next-auth/react";

const formSchema = z.object({
  comment: z.string().min(2).max(50),
});

const fetcher = async (url: any) => {
  const res = await fetch(url);

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
};

interface CommmentsProps {
  postSlug: any;
}

function Comments({ postSlug }: CommmentsProps) {
  const status = useSession();


  // dynmaic listing pleasing
  const { data, mutate, isLoading } = useSWR(
    `https://mind-pain-78q6.vercel.app/api/comments?postSlug=${postSlug}`,
    fetcher
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ postSlug, values }),
    });

    mutate();

  }



  return (
    <div className="bg-[#111] p-10">
      <h2 className="text-2xl md:text-4xl font-bold">Comments</h2>

      {status.status !== "unauthenticated" ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="comment"
              control={form.control}
              render={({ field }) => (
                <Textarea {...field} className="my-4 resize-none h-[150px] text-black" />
              )}
            />

            <Button>Submit</Button>
          </form>
        </Form>
      ) : (
        <Link href="/sign-in" className="text-sm text-[#666] p-2 hover:underline ">Login to comment</Link>
      )}

      {/* comments */}
      <div className="mt-[50px]">
        {isLoading
          ? "loading"
          : data?.map((item: any) => (
              <div
                key={crypto.randomUUID()}
                className="flex items-center justify-between bg-[#444] p-4"
              >
                <div className="flex items-center gap-[20px]">
                  {/* user */}
                  <Image
                    src={`/${item.user.image}`}
                    alt="user"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <div className="flex flex-col gap-[5px] color-emerald-500">
                    <span className="font-bold">{item.user.username}</span>
                    <span className="text-[14px]">
                      {item.createdAt.substring(0, 10)}
                    </span>
                  </div>
                </div>
                <p className="text-[14px] font-semibold">{item.desc}</p>
              </div>
            ))}
      </div>
    </div>
  );
}

export default Comments;
