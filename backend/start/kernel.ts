import server from '@adonisjs/core/services/server'
import router from '@adonisjs/core/services/router'

server.errorHandler(() => import('#exceptions/handler'))

server.use([
  () => import('#middleware/container_bindings_middleware'),
  () => import('#middleware/force_json_response_middleware'),
  () => import('@adonisjs/cors/cors_middleware'),
])

router.use([
  () => import('@adonisjs/core/bodyparser_middleware'),
])

// ✅ Named middleware
export const middleware = {
  authJwt: () => import('#middleware/auth_jwt_middleware'),
}
