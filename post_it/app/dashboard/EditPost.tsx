"use client"

import Image from "next/image"
import Toggle from "./Toggle"
import { useState } from "react"
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { error } from "console"
import { toast } from "react-hot-toast"

type EditProps = {
  id: string
  avatar: string
  name: string
  title: string
  comments? : {
    id: string
    postId: string
    userId: string
  }[]
}

export default function EditPost({avatar, name, title, comments, id} : EditProps) {
  const [toggle, setToggle] = useState(false)
  const queryClient = useQueryClient()
  const [deleteToastId, setDeleteToastId] = useState("")
  const {mutate}  = useMutation(
    async (id:string) => await axios.delete('/api/posts/deletePost', {data: id}),
    {
      onError: (error) => {
        console.log(error)
        toast.error("Error deleting that post", {id: deleteToastId})
        let temp = toast.loading("Deleting your post...", {id: deleteToastId})
        setDeleteToastId(temp)
      },
      onSuccess: (data) => {
        let temp =  toast.success("Post has been deleted.", {id: deleteToastId})
        setDeleteToastId(temp)
        queryClient.invalidateQueries(["auth-posts"])
      }
    }
  )
  const deletePost = () => {
    let temp = toast.loading("Deleting your post...", {id: deleteToastId})
    setDeleteToastId(temp)
    mutate(id)
  }

  return (
    <>
    <div className=" bg-gray-200 my-8 p-8 rounded-lg">
      <div className="flex gap-4 items-center">
        <Image
        height = {32}
        width = {32}
        src = {avatar}
        alt="avatar"
        />
        <h3 className="font-bold text-gray-600">{name}</h3>
      </div>
      <div className="my-8">
        <p className="break-all">{title}</p>
      </div>
      <div className="flex items-center gap-4">
        <p className="text-sm font-bold text-gray-500">
          {comments?.length} Comments
        </p>
        <button onClick={(e) => {
          setToggle(true)
        }} className="text-sm font-bold text-red-500">Delete</button>
      </div>
    </div>
    {toggle && <Toggle deletePost={deletePost} setToggle={setToggle}/>}
    </>
  )
}