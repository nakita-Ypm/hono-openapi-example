import { describe, expect, it } from 'vitest'
import { randomUUID } from 'crypto'

describe('PostService Test', () => {
  // createPost
  it('getPosts', async () => {
    const generatePosts = (count: number) => {
      return Array.from({ length: count }, (_, i) => ({
        id: randomUUID(),
        post: `OpenAPIHono🔥${i + 1}`,
        createdAt: new Date(`2021-01-${i + 1}`),
        updatedAt: new Date(`2021-01-${i + 1}`),
      }))
    }
  })
})
