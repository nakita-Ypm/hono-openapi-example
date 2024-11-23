import { type RouteHandler } from '@hono/zod-openapi'
import { get } from '../openapi'

export const postPostsHandler: RouteHandler<typeof get> = async (c) => {
  return c.json({ message: 'Hono🔥' })
}
