import { defineConfig } from '@adonisjs/cors'

/**
 * Configuration options to tweak the CORS policy.
 * Docs: https://docs.adonisjs.com/guides/security/cors
 */
const corsConfig = defineConfig({
  enabled: true,
  origin: ['http://localhost:4200'], // allow Angular dev server
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'PATCH'],
  headers: true, // allow all headers
  exposeHeaders: [],
  credentials: true,
  maxAge: 90,
})

export default corsConfig
