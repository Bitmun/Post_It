"use client"

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import toast from "react-hot-toast"


export default function CreatePost() {
  const [title, setTitle] = useState("")
  const [isDisabled, setIsDisabled] = useState(false)
  const [toastPostId, setToastPostId] = useState("")
  const queryClient = useQueryClient()

  //Create a post
  const { mutate } = useMutation(
    async (title: string) => await axios.post('/api/posts/addPost', {title}), 
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          console.log(toastPostId)
          toast.error(error?.response?.data.message, {id: toastPostId})
        }
        setIsDisabled(false)
      },
      onSuccess: (data) => {
        toast.success("Post has been made !", {id: toastPostId})
        setTitle("")
        setIsDisabled(false)
        queryClient.invalidateQueries(["posts"])
      }
    }
  )
  const submitPost = async (e: React.FormEvent) => {
    let temp = toast.loading("Creating your post...", {id: toastPostId})
    setToastPostId(temp)
    e.preventDefault()
    setIsDisabled(true)
    mutate(title)
  }

  return (
    <form onSubmit={submitPost} className=" bg-blue-200 my-8 p-8 rounded-md">
      <div className="flex flex-col my-4">
        <textarea name="title" onChange={(e) => {
          setTitle(e.target.value)
        }}
        value={title} placeholder="What's on your mind?"
        className="p-4 text-lg rounded-md my-2 bg-gray-200"></textarea>
      </div>
      <div className="flex items-cemter justify-between ">
        <p className={`font-bold text-sm ${title.length > 300 ? "text-red-700" : "text-gray-700"}`}>{`${title.length}/300`}</p>
        <button
          disabled={isDisabled}
          className="text-sm bg-teal-600 text-white py-2 rounded-lg px-4 disabled:opacity-25"
          type="submit"
        >Create post</button>
      </div>
    </form>
  )
}