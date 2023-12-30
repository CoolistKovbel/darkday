import WriteForm from '@/components/WriteForm'
import { getAuthSession } from '@/lib/auth'
import React from 'react'

async function WritePage() {

  const session = await getAuthSession()
 
  if(!session){
    return window.location.href = "/sign-in"
  }

  return <WriteForm />
}

export default WritePage