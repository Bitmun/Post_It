import prisma from "@/prisma/client";
import axios from "axios";

import { NextApiRequest, NextApiResponse } from "next"


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      console.log(req.query)
      const data = await prisma.post.findUnique({
        where: {
          id: req.query.details,
        },
        include: {
          user: true,
          comments: {
            orderBy: {
              createdAt: "desc"
            },
            include: {
              user:true
            }
          }
        }
      })
      res.status(200).json(data)
    } catch (err) {
      res.status(403).json({err: "Error occured whilst fetching auth users posts"})
    }
  }
}