import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class UsersController {
  // Get all users (Admin only)
  public async index({ response }: HttpContext) {
    const users = await User.query().orderBy('created_at', 'desc')
    return response.json({
      status: 'success',
      data: users.map(user => user.serialize())
    })
  }

  // Create new user (Admin only)
  public async store({ request, response }: HttpContext) {
    try {
      const { email, password, fullName, role } = request.only(['email', 'password', 'fullName', 'role'])
      
      const existingUser = await User.findBy('email', email)
      if (existingUser) {
        return response.conflict({ message: 'Email already in use' })
      }

      const user = await User.create({
        email,
        password,
        fullName,
        role: role || 'user'
      })

      return response.created({
        status: 'success',
        data: user.serialize()
      })
    } catch (error) {
      return response.status(500).json({
        status: 'error',
        message: 'Failed to create user'
      })
    }
  }

  // Get single user
  public async show({ params, response }: HttpContext) {
    try {
      const user = await User.findOrFail(params.id)
      return response.json({
        status: 'success',
        data: user.serialize()
      })
    } catch (error) {
      return response.notFound({ message: 'User not found' })
    }
  }

  // Update user (Admin only)
  public async update({ params, request, response }: HttpContext) {
    try {
      const user = await User.findOrFail(params.id)
      const data = request.only(['email', 'fullName', 'role', 'password'])
      
      user.merge(data)
      await user.save()

      return response.json({
        status: 'success',
        data: user.serialize()
      })
    } catch (error) {
      return response.status(500).json({
        status: 'error',
        message: 'Failed to update user'
      })
    }
  }

  // Delete user (Admin only)
  public async destroy({ params, response }: HttpContext) {
    try {
      const user = await User.findOrFail(params.id)
      await user.delete()
      return response.json({
        status: 'success',
        message: 'User deleted successfully'
      })
    } catch (error) {
      return response.status(500).json({
        status: 'error',
        message: 'Failed to delete user'
      })
    }
  }
}
