import { defineConfig, drivers } from '@adonisjs/core/hash'

export default defineConfig({
  default: 'bcrypt',
  list: {
    bcrypt: drivers.bcrypt({
      rounds: 10,
      saltSize: 16,
      version: 98,
    }),
  },
})
