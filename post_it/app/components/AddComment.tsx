"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { useState } from "react"
import { toast } from "react-hot-toast"

type PostProps = {
  id?: string
}

type Comment = {
  postId?: string
  title: string
}

export default function AddComment({id}: PostProps) {
  const [title, setTitle] = useState("")
  const [isDisabled, setIsDisabled] = useState(false)
  const [toastCommentId, setToastCommentId] = useState("")
  let commentToastId: string
  const queryClient = useQueryClient()
  const {mutate} = useMutation(
    async (data: Comment) => axios.post('/api/posts/addComment', {data}),
    {
      onSuccess: data => {
        setTitle("")
        setIsDisabled(false)
        let temp = toast.success("Added your comment", {id: toastCommentId})
        setToastCommentId(temp)
        queryClient.invalidateQueries(["detail-post"])
      },
      onError: (error) => {
        setIsDisabled(false)
        if (error instanceof AxiosError) {
          let temp = toast.error(error?.response?.data.message, {id: toastCommentId})
          setToastCommentId(temp)
        }
      }
    })
  const submitComment =async (e: React.FormEvent) => {
    e.preventDefault()
    setIsDisabled(true)
    let temp = toast.loading('Adding your comment', {id: toastCommentId})
    setToastCommentId(temp)
    mutate({title, postId: id})
  }

  return (
    <form onSubmit={submitComment} className="my-8">
      <h3>Add comment</h3>
      <div className="flex flex-col my-2">
        <input 
          onChange={(e) => {
            setTitle(e.target.value)
          }}
          value={title}
          type="text"
          name="title"
          className = "p-4 text-lg rounded-md my-2  bg-gray-100"
        />
      </div>
      <div className="flex items-center gap-2">
        <button 
        className="text-sm bg-teal-600 text-gray-200 py-2 px-6 rounded-xl disabled:opacity-25"
        disabled={isDisabled}
        type="submit"
        >
          Add Comment
        </button>
        <p
        className={`font-bold ${title.length > 300 ? "text-red-700" : "text-gray-700"}`}
        >{`${title.length}/300`}</p>
      </div>
    </form>
  )
}