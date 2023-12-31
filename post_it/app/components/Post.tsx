"use client"

import Image from "next/image"
import Link from "next/link"

export default function Post({avatar, name, postTitle, id, comments}) {
  console.log(comments)
  return (
    <div className=" bg-gray-200 my-8 p-8 rounded-lg">
      <div className="flex gap-3 items-center">
        <Image
          className="rounded-full"
          width={32}
          height={32}
          src={avatar}
          alt="avatar"
        />
        <h3 className="font-bold text-gray-700">{name}</h3>
      </div>
      <div className="my-8">
        <p className="break-all">{postTitle}</p>
      </div>
      <div className="flex gap-4 cursor-pointer items-center">
        <Link href={`/post/${id}`}>
          <p className="text-sm font-bold text-gray-700">{comments.length} Comments</p>
        </Link>
      </div>
    </div>
  )
}