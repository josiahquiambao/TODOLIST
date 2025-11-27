import type { AuthenticatedContext } from '../types/context.js'
import AuthController from './auth_controller.js'
import Task from '#models/task'

export default class TasksController extends AuthController {
  // Get tasks - Admin sees all, users see only their own
  public async index({ response, user }: AuthenticatedContext) {
    console.log('Current user ID:', user.id, 'Role:', user.role)
    
    let tasks
    if (user.role === 'admin') {
      // Admin can see all tasks
      tasks = await Task.query()
        .preload('user')
        .orderBy('created_at', 'desc')
    } else {
      // Regular users see only their tasks
      tasks = await Task.query()
        .where('user_id', user.id)
        .orderBy('created_at', 'desc')
    }
      
    console.log('Query results:', tasks)
    
    return response.json({
      status: 'success',
      data: tasks.map(task => task.serialize())
    })
  }


  public async store({ request, response, user }: AuthenticatedContext) {
    try {
      const data = request.only(['title', 'description'])
      const task = await Task.create({
        ...data,
        userId: user.id
      })
      
      return response.status(201).json({
        status: 'success',
        data: task
      })
    } catch (error) {
      return response.status(500).json({
        status: 'error',
        message: 'Failed to create task'
      })
    }
  }

  public async show({ params, response }: AuthenticatedContext) {
    const task = await Task.findOrFail(params.id)
    return response.json(task)
  }

  public async update({ params, request, response, user }: AuthenticatedContext) {
    const task = await Task.findOrFail(params.id)
    
    // Verify task belongs to user OR user is admin
    if (task.userId !== user.id && user.role !== 'admin') {
      return response.unauthorized({ message: 'Not authorized to update this task' })
    }
    
    const data = request.only(['title', 'description', 'isCompleted'])
    task.merge(data)
    await task.save()
    return response.json(task)
  }

  public async delete({ params, response, user }: AuthenticatedContext) {
    const task = await Task.findOrFail(params.id)
    
    // Verify task belongs to user OR user is admin
    if (task.userId !== user.id && user.role !== 'admin') {
      return response.unauthorized({ message: 'Not authorized to delete this task' })
    }
    
    await task.delete()
    return response.noContent()
  }
}
