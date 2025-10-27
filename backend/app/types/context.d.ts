import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

declare module '@adonisjs/core/http' {
  interface HttpContext {
    user?: User
  }
}

export interface AuthenticatedContext extends HttpContext {
  user: User
}
