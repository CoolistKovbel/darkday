"use client";

import * as z from "zod";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { signIn } from "next-auth/react";


import { useRouter } from "next/navigation";
import { SignInFormSchema } from "@/lib/constant";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

function SignInForm() {
  const router = useRouter()

  const form = useForm<z.infer<typeof SignInFormSchema>>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      password: "",
      metaAddress: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof SignInFormSchema>) => {
    try {

      console.log(values);

      const res = await signIn("credentials", {
        MetaAddress: values.metaAddress,
        Password: values.password,
        redirect: false
      });

      console.log('result form sign in', res)
      
      if(res?.ok){
        router.push("/")
      }

    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="bg-[#111] h-screen flex items-center align-center justify-center">

      <div className="p-20 h-full w-full flex flex-col items-center justify-between p-10">

        <h2 className="text-4xl md:text-8xl capitalize font-bold">
          Join in and comment
        </h2>

        <div className="flex items-center justify-between w-[60%] m-auto flex-col md:flex-row">
          {/* Signup Form */}
          <Form {...form}>
            <form
              className="bg-[#222] p-4 w-[250px] rounded-lg mb-10"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              
              <div className="p-2 flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="metaAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meta Address: </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="enter 0xAddress"
                          className="bg-black text-[#16a34a] text-sm"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password: </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="enter your password"
                          className="bg-black text-[#16a34a] text-sm"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button className="bg-black text-[#16a34a] text-1xl uppercase hover:text-[yellow] mt-5">
                  sign in
                </Button>
              </div>

            </form>
          </Form>

          {/* Banner */}
          <div className="relative w-[300px] h-[300px]">
            <Image src="/ghost-2.png" alt="small banner" fill  className="rounded-lg"/>
          </div>
        </div>

        <p>
          Need an account
          <Link href="/sign-up" className="text-[yellow] font-bold ml-2">
            Sign Up
          </Link>
        </p>

      </div>
      
    </div>
  );
}

export default SignInForm;
