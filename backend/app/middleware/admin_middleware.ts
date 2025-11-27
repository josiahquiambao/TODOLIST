import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class AdminMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const user = ctx.user

    if (!user || user.role !== 'admin') {
      return ctx.response.forbidden({ 
        message: 'Access denied. Admin privileges required.' 
      })
    }

    await next()
  }
}
