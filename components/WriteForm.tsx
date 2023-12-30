"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

import { useRouter } from "next/navigation";
import { BlogFormSchema } from "@/lib/constant";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState } from "react";

function WriteForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [iFile, setFile] = useState<any>();

  const form = useForm<z.infer<typeof BlogFormSchema>>({
    resolver: zodResolver(BlogFormSchema),
    defaultValues: {
      title: "",
      category: "",
      message: "",
      image: "",
    },
  });

  const slugify = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const onSubmit = async (values: z.infer<typeof BlogFormSchema>) => {
    try {
      values.image = iFile;

      const formD = new FormData();

      formD.append("title", values.title);
      formD.append("slug", slugify(values.title));
      formD.append("category", slugify(values.category));
      formD.append("message", values.message);
      formD.append("image", values.image);

      const res = await fetch("/api/write", {
        method: "POST",
        body: formD
      });

      if(res.ok){
        console.log(await res.json())
      }

      form.reset()


    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-[#111] h-screen flex items-center align-center justify-center">
      <div className="p-10 h-full w-full flex flex-col items-center justify-between">
        <h2 className="text-4xl font-bold mb-4">Whats on your mind.....</h2>

        <div className="flex items-center justify-between w-[80%] m-auto flex-col md:flex-row">
          <Form {...form}>
            <form
              className="bg-[#000] p-4 w-[250px] md:w-[800px] rounded-lg mb-10"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="p-2 flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>title </FormLabel>
                      <FormControl>
                        <Input
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
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Whats on your mind... </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Theme" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="food">food</SelectItem>
                            <SelectItem value="coding">coding</SelectItem>
                            <SelectItem value="crypto">crypto</SelectItem>
                            <SelectItem value="life">life</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <input
                    type="file"
                    onChange={(e: any) => setFile(e.target.files[0])}
                    className="border-2"
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Whats on your mind... </FormLabel>
                      <FormControl className="w-full bg-black text-emerald-500 border-2 shadow-lg h-[250px] overflow-auto resize-none">
                        <ReactQuill
                          theme="bubble"
                          {...field}
                          placeholder="tell your story"
                          className="p-4"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button className="bg-black text-[#16a34a] text-1xl uppercase hover:text-[yellow] mt-5">
                  enter message
                </Button>

              </div>
            </form>
          </Form>

          {/* Banner */}
          <div className="relative w-[300px] h-[300px]">
            <Image src="/feature-1.jpeg" alt="small banner" fill />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WriteForm;
