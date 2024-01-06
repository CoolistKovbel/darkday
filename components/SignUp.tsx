"use client";

import * as z from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { SignUpFormSchema } from "@/lib/constant";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

import axios from "axios";
import Image from "next/image";

// import {  toast } from 'react-toastify';

function SignUpForm() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      console.log(file);
      setFile(e.target.files[0]);
    }
  };

  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      metaAddress: "",
      image: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof SignUpFormSchema>) => {
    try {
      values.image = file;

      const formD = new FormData();

      formD.append("username", values.username);
      formD.append("email", values.email);
      formD.append("password", values.password);
      formD.append("metaAddress", values.metaAddress);
      formD.append("image", values.image);

      const res = await axios.post("/api/sign-up", formD);

      // console.log(res?.data)
      // console.log(res, "This is res data")
      if (res.status === 200) {
        router.push("/sign-in");
      } else {
        console.log("failed sign up");
      }
    } catch (error: any) {
      console.log(error?.response?.data);
      //   toast(`💀 ${error?.response?.data}`);
    }
  };

  return (
    <div className=" h-screen flex items-center align-center justify-center"> {/* layer 1 */}

      <div className="p-10 h-full w-full flex flex-col items-center justify-between bg-[#2826267a]  rounded-lg"> {/* layer 2 */}
        <h2 className="text-4xl md:text-8xl  font-bold ">Sign Up today</h2>

        <div>

          <div  className="w-[200px] h-[200px] relative mb-10">
            <Image src="/TestConflict.png" alt="logo" fill />
          </div>


          {/* Signup Form */}
          <Form {...form}>
            <form
              className="bg-[#111] p-4 w-[250px] md:w-[550px] rounded-lg shadow-2xl"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              {/* Form Content */}
              <div className="p-2 flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username: </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="enter a username"
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email: </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="enter your email"
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
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image: </FormLabel>
                      <FormControl>
                        <input type="file" onChange={handleFileChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button className="bg-black text-[#16a34a] text-1xl uppercase hover:text-[yellow] mt-5">
                  sign up
                </Button>
              </div>
            </form>
          </Form>
        </div>

        <p>
          Already have an account{" "}
          <Link href="/sign-in" className="text-[yellow] font-bold">
            Sign In
          </Link>
        </p>
      </div>

    </div>
  );
}

export default SignUpForm;
