import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]"
import prisma from "../../../prisma/client"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const session = await getServerSession(req, res, authOptions)
    if (!session) {
      return res.status(401).json({message: "Please sign in to make a post!"})
    }
    //Delete post
    try {
      const postId = req.body
      const result = await prisma.post.delete({
        where: {
          id: postId,
        }
      })
      res.status(200).json(result)
    } catch (err) {
      res.status(403).json({err: "Error occured whilst fetching auth users posts"})
    }
  }
}