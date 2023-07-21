"use client"

import { useState } from "react"


export default function CreatePost() {
  const [title, setTitle] = useState("")
  const [isDisabled, setIsDisabled] = useState(false)
  return (
    <form className=" bg-blue-200 my-8 p-8 rounded-md">
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