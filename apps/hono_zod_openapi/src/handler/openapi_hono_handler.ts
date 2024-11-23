import { type RouteHandler } from '@hono/zod-openapi'
import { get } from '@packages/hono-rpc'

export const getHandler: RouteHandler<typeof get> = async (c) => {
  return c.json({ message: 'Hono🔥' })
}
