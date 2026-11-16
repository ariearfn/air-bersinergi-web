import type { requireAdmin } from '../utils/auth'

declare module 'h3' {
  interface H3EventContext {
    admin?: Awaited<ReturnType<typeof requireAdmin>>
  }
}

export {}
