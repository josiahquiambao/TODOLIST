import type { HttpContext } from '@adonisjs/core/http'
import jwt from 'jsonwebtoken'
import hash from '@adonisjs/core/services/hash'
import User from '#models/user'

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key'

export default class AuthController {
  public async register({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    
    const existingUser = await User.findBy('email', email)
    if (existingUser) {
      return response.conflict({ message: 'Email already in use' })
    }

    const user = await User.create({ email, password })
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '24h' })

    return response.created({
      user: user.serialize(),
      token
    })
  }

  public async login({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const user = await User.findBy('email', email)

    if (!user || !(await hash.verify(user.password, password))) {
      return response.unauthorized({ message: 'Invalid credentials' })
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '24h' })
    return response.ok({
      user: user.serialize(),
      token
    })
  }

  public async verifyToken(ctx: HttpContext) {
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

      // Attach user to context
      ctx.user = user
      return true
    } catch (error: any) {
      console.error('JWT verification failed:', error.message)
      return ctx.response.unauthorized({ message: 'Invalid or expired token' })
    }
  }
  // Example protected route handler
  public async protectedRoute(ctx: HttpContext) {
    const verified = await this.verifyToken(ctx)
    if (verified !== true) return

    return ctx.response.json({
      status: 'success',
      data: {
        message: 'Access granted'
      }
    })
  }
}
