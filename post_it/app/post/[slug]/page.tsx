"use client"

import AddComment from "@/app/components/AddComment"
import Post from "@/app/components/Post"
import { PostType } from "@/app/types/Posts"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Image from "next/image"
type URL = {
  params: {
    slug: string
  }
}

const fetchDetails =async (slug:string) => {
  const response = await axios.get(`/api/posts/${slug}`)
  return response.data
}

export default function PostDetail(url: URL) {
  const {data, isLoading} = useQuery<PostType[]>({
    queryKey: ["detail-post"],
    queryFn: () => fetchDetails(url.params.slug)
  })
  if (isLoading) return "Loading..."
  console.log(data)
  return (
    <div>
      <Post comments={data.comments} id={data.id} name={data.user.name} postTitle={data.title} avatar={data.user.image} />
      <AddComment id={data?.id}/>
      {data?.comments?.map((comment) => (
        <div key={comment.id} className="my-6 bg-gray-200 p-8 rounded-md">
          <div className="flex items-center gap-2">
            <Image 
              width={24}
              height={24}
              src={comment.user?.image}
              alt="avatar"
              className="rounded-full"
            />
            <h3 className="font-bold">{comment?.user?.name}</h3>
            <h2 className="text-sm">{comment.createdAt}</h2>
          </div>
          <div className="py-4">{comment.message}</div>
        </div>
      ))}
    </div>
  )
}