"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation';


interface ThereType {
  title: string;
  desc: string;
  slug: any;
  img: any;
}

function Featured() {
  const [og, setOg] = useState<ThereType | {}>({})
  const router = useRouter()


  useEffect(() => {
    const x = async () => {
      const res = await fetch("/api/featured")

      
      const f: ThereType[] = await res.json()
      console.log(f)
      setOg(f[0])
    }
    x()
  },[])

  const title = (og as ThereType).title;
  const desc = (og as ThereType).desc;
  const slug = (og as ThereType).slug;
  const img = (og as ThereType).img;


  return (
    <div className='mt-[30px]'>
      {/* Title */}

      <h1 className=' text-2xl md:text-[96px] font-bold'>
        <a href="/" className='leading-[90px]'>Hey th3_g3ntl3m4n here, express myself..</a>
      </h1>


      {/* Featured Posts */}
      <div className='mt-[60px] flex align-center gap-[50px]  flex-col md:flex-row'>

        {/* Image container */}
        <div className='relative w-[300px] md:w-[800px] h-[300px] md:h-[500px] shadow-lg'>
          <Image src={img} alt="featured image" fill    />
        </div>

        <div className='flex-1 flex  justify-between flex-col'>
          <div>
            <h2 className='text-2xl md:text-4xl font-bold mb-2'>{title}</h2>
            <p className='leading-6'>
              {desc}
            </p>
          </div>

          <Button className='p-4 text-md font-bold mt-4 w-[15%]' onClick={() => router.push(`/posts/${slug}`)}>Read More</Button>
        </div>

      </div>


      
    </div>
  )
}

export default Featured