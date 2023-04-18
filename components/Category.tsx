'use client'
import { Icon } from '@iconify/react'
import { useRouter } from 'next/navigation'
import React from 'react'
interface Props {
    category: {
        id: string,
        emoji: string,
        name: string
    },
    voted: boolean
}

function Category({category, voted} : Props) {
  const router = useRouter()
  return (
    <button 
    onClick ={() => router.push(`/${category.id}`)}
    key={category.id} disabled={!voted} className={`bg-tertiary active:bg-quaternary transition-all ease-out p-2 rounded-xl flex flex-col items-center justify-center gap-2 opacity-${voted ? '20' : '100'}`}>
    <Icon icon={category.emoji} fontSize={50}/>
    <h1 className="text-center" style={{fontSize: 10}}>{category.name}</h1>
  </button>
  )
}

export default Category