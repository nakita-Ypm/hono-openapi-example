import { serve } from '@hono/node-server'
import { OpenAPIHono } from '@hono/zod-openapi'
import { swaggerUI } from '@hono/swagger-ui'
import { logger } from 'hono/logger'
import { get, getPosts, postPosts, putPostsId, deletePostsId } from '@packages/hono-rpc'
import { getHandler } from '../handler/openapi_hono_handler'
import { postPostsHandler, getPostsHandler, putPostsIdHandler, deletePostsIdHandler } from '../handler/post_handler'

export class App {
  static init() {
    const app = new OpenAPIHono()

    const port = 3000
    console.log(`Server is running on http://localhost:${port}`)

    serve({
      fetch: app.fetch,
      port,
    })

    app.use('*', logger())
    app.use('*', (c, next) => {
      console.log(`  ::: ${c.req.method} ${c.req.url}`)
      return next()
    })

    app.use('*', async (c, next) => {
      try {
        await next()
      } catch (e) {
        return c.json({ error: (e as Error).message }, 500)
      }
    })

    app
      .doc('/doc', {
        info: {
          title: 'Hono API',
          version: 'v1',
        },
        openapi: '3.1.0',
        tags: [
          {
            name: 'Hono',
            description: 'Hono API',
          },
          {
            name: 'Post',
            description: 'Post API',
          },
        ],
      })
      .get('/ui', swaggerUI({ url: '/doc' }))

    return this.applyRoutes(app)
  }

  static applyRoutes(app: OpenAPIHono) {
    return app
      .openapi(get, getHandler)
      .openapi(postPosts, postPostsHandler)
      .openapi(getPosts, getPostsHandler)
      .openapi(putPostsId, putPostsIdHandler)
      .openapi(deletePostsId, deletePostsIdHandler)
  }
}
