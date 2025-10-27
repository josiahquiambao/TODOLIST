import type { HttpContext } from '@adonisjs/core/http'
import jwt from 'jsonwebtoken'
import User from '#models/user'

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key'

export default class AuthJwtMiddleware {
  public async handle(ctx: HttpContext, next: () => Promise<void>) {
    console.log('ctx.request',ctx.request);
    console.log('🟡 Incoming headers:', ctx.request.headers());

    const authHeader = ctx.request.header('authorization')
    if (!authHeader) {
      return ctx.response.unauthorized({ message: 'Missing token' })
    }
    const token = authHeader.split(' ')[1]

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { id: number }
      const user = await User.find(decoded.id)
      if (!user) {
        return ctx.response.unauthorized({ message: 'Invalid token user' })
      }

      // Attach user to the context so controllers can access ctx.user
      ctx.user = user
      console.log('✅ Attached user to ctx:', user.id)

      await next()
    } catch (error: any) {
      console.error('❌ JWT verification failed:', error.message)
      return ctx.response.unauthorized({ message: 'Invalid or expired token' })
    }
  }
}
