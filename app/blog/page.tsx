import CardList from '@/components/CardList'
import Menu from '@/components/Menu'
import React from 'react'

interface BlogPageProps {
  searchParams: any
}

function BlogPage({searchParams}: BlogPageProps) {
  const page = parseInt(searchParams.page) || 1;
  const {cat} = searchParams

  return (
    <div>
        <h1 className='bg-[#222] text-white p-y-5 p-x-10 text-center text-4xl md:text-6xl p-4 font-bold capitalize rounded-lg shadow-lg'>{cat} Page</h1>
        <div className='flex gap-[50px]'>
            <CardList page={page} cat={cat} />
            <Menu />
        </div>
    </div>
  )
}

export default BlogPage