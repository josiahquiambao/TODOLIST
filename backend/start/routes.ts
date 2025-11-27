import router from '@adonisjs/core/services/router'
import AuthController from '#controllers/auth_controller'
import TasksController from '#controllers/tasks_controller'
import UsersController from '#controllers/users_controller'
import AdminMiddleware from '#middleware/admin_middleware'
import type { AuthenticatedContext } from '#app/types/context.d.ts'

router.group(() => {
  // Public routes
  router.post('/login', '#controllers/auth_controller.login')
  router.post('/register', '#controllers/auth_controller.register')

  // Protected routes group
  router.group(() => {
    // Task CRUD routes with proper auth verification
    router.get('/tasks', async (ctx) => {
      const auth = new AuthController()
      const verified = await auth.verifyToken(ctx)
      if (verified && ctx.user) {
        const authenticatedCtx = ctx as AuthenticatedContext
        await new TasksController().index(authenticatedCtx)
        return
      }
      return ctx.response.unauthorized()
    })

    router.post('/tasks', async (ctx) => {
      const auth = new AuthController()
      const verified = await auth.verifyToken(ctx)
      
      if (verified && ctx.user) {
        const authenticatedCtx = ctx as AuthenticatedContext
        const result = await new TasksController().store(authenticatedCtx)
        return ctx.response.json(result)
      }
      return ctx.response.unauthorized()
    })

    router.put('/tasks/:id', async (ctx) => {
      const auth = new AuthController()
      const verified = await auth.verifyToken(ctx)
      
      if (verified && ctx.user) {
        const authenticatedCtx = ctx as AuthenticatedContext
        const result = await new TasksController().update(authenticatedCtx)
        return ctx.response.json(result)
      }
      return ctx.response.unauthorized()
    })

    router.delete('/tasks/:id', async (ctx) => {
      const auth = new AuthController()
      const verified = await auth.verifyToken(ctx)
      
      if (verified && ctx.user) {
        const authenticatedCtx = ctx as AuthenticatedContext
        const result = await new TasksController().delete(authenticatedCtx)
        return ctx.response.json(result)
      }
      return ctx.response.unauthorized()
    })

    // Admin-only routes for user management
    router.group(() => {
      router.get('/users', async (ctx) => {
        const auth = new AuthController()
        const verified = await auth.verifyToken(ctx)
        
        if (verified && ctx.user) {
          const adminMiddleware = new AdminMiddleware()
          await adminMiddleware.handle(ctx, async () => {
            await new UsersController().index(ctx)
          })
        } else {
          return ctx.response.unauthorized()
        }
      })

      router.post('/users', async (ctx) => {
        const auth = new AuthController()
        const verified = await auth.verifyToken(ctx)
        
        if (verified && ctx.user) {
          const adminMiddleware = new AdminMiddleware()
          await adminMiddleware.handle(ctx, async () => {
            await new UsersController().store(ctx)
          })
        } else {
          return ctx.response.unauthorized()
        }
      })

      router.get('/users/:id', async (ctx) => {
        const auth = new AuthController()
        const verified = await auth.verifyToken(ctx)
        
        if (verified && ctx.user) {
          const adminMiddleware = new AdminMiddleware()
          await adminMiddleware.handle(ctx, async () => {
            await new UsersController().show(ctx)
          })
        } else {
          return ctx.response.unauthorized()
        }
      })

      router.put('/users/:id', async (ctx) => {
        const auth = new AuthController()
        const verified = await auth.verifyToken(ctx)
        
        if (verified && ctx.user) {
          const adminMiddleware = new AdminMiddleware()
          await adminMiddleware.handle(ctx, async () => {
            await new UsersController().update(ctx)
          })
        } else {
          return ctx.response.unauthorized()
        }
      })

      router.delete('/users/:id', async (ctx) => {
        const auth = new AuthController()
        const verified = await auth.verifyToken(ctx)
        
        if (verified && ctx.user) {
          const adminMiddleware = new AdminMiddleware()
          await adminMiddleware.handle(ctx, async () => {
            await new UsersController().destroy(ctx)
          })
        } else {
          return ctx.response.unauthorized()
        }
      })
    })

  }).prefix('/api')
})

