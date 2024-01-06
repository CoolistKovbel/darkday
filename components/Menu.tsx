
import React from 'react'
import MenuPosts from './MenuPosts'
import CategoryList from './CategoryList'

function Menu() {
  return (
    <div className='w-[300px] md:w-[400px] bg-[#111] mt-10 p-10 border-2 border-[#444] text-right'>

      <h2 className='text-[28px] font-bold md:text-4xl capitalize'>Whats hot</h2>
      <h3 className='text-[gray] text-[16px] font-400 font-bold'>Most Popular:</h3>

      {/* MENU POSTS */}
      <MenuPosts withImage={false} />

      <h2 className='text-[28px]'>Discover by Topic</h2>
      <h3 className='text-[gray] text-[16px] font-400'>Categories:</h3>

      {/* CATEGORY POSTS */}
      <CategoryList withImage={false} />

      <h2 className='text-[28px]'>Chosen by the editor</h2>
      <h3 className='text-[gray] text-[16px] font-400'>Editors pick:</h3>

      {/* MENUPosts POSTS */}
      <MenuPosts withImage={true} />
      
    </div>
  )
}

export default Menu