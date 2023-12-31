"use client"
import axios from "axios"
import AddPost from "./components/AddPost"
import { useQuery } from "@tanstack/react-query"
import Post from "./components/Post"
import { PostType } from "./types/Posts" 


const allPosts = async() => {
  const response = await axios.get('/api/posts/getPosts')
  return response.data
}

export default function Home() {
  const {data, error, isLoading} = useQuery<PostType[]>({queryFn: allPosts, queryKey: ["posts"]})
  if (error) {
    return error
  }
  if (isLoading) {
    return "Loading..."
  }
  return (
    <main >
      <AddPost />
      {data?.map((post) => (
        <Post
         comments = {post.comments}
         name={post.user.name}
         key={post.id}
         avatar={post.user.image} 
         postTitle={post.title}
         id={post.id}
         />
      ))}
    </main>
  )
}
