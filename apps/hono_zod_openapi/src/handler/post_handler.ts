import { type RouteHandler } from '@hono/zod-openapi'
import { postPosts, getPosts, putPostsId, deletePostsId } from '@packages/hono-rpc'
import { Post } from '@packages/prisma'
import { PostService } from '@packages/service'
import { PostDomain } from '@packages/domain'

export const postPostsHandler: RouteHandler<typeof postPosts> = async (c) => {
  const valid = c.req.valid('json')
  const req = valid.post
  await PostService.createPost(req)
  return c.json({ message: 'Created' }, 201)
}

export const getPostsHandler: RouteHandler<typeof getPosts> = async (c) => {
  const valid = c.req.valid('query')
  const { page, rows } = PostDomain.convertNumberQueryParams(valid)
  if (isNaN(page) || isNaN(rows) || page < 1 || rows < 1) {
    return c.json({ message: 'Bad Request' }, 400)
  }
  const limit = rows
  const offset = (page - 1) * rows
  const res: Post[] = await PostService.getPosts(limit, offset)
  return c.json(res, 200)
}

export const putPostsIdHandler: RouteHandler<typeof putPostsId> = async (c) => {
  const param_valid = c.req.valid('param')
  const id = param_valid.id
  const json_valid = c.req.valid('json')
  const { post } = json_valid
  await PostService.putPost(id, post)
  return new Response(null, { status: 204 })
}

export const deletePostsIdHandler: RouteHandler<typeof deletePostsId> = async (c) => {
  const valid = c.req.valid('param')
  const id = valid.id
  await PostService.deletePost(id)
  return new Response(null, { status: 204 })
}
