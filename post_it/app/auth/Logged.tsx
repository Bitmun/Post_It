"use client"
import Image from 'next/image'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

type User = {
  image: string
}

export default function Logged( {image}: User) {
  return (
    <li className='flex gap-8 items-center'>
      <button onClick={() => {
        signOut()
      }} className='texs-sm bg-gray-700 text-white py-2 px-6 rounded-xl '>Sign out</button>
      <Link href={"/dashboard"}>
        <Image width={64} height={64} src={image} alt="" priority className='rounded-full'/>
      </Link>
    </li>
  )
}