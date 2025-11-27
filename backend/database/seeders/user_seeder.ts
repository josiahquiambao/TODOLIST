import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    // Create admin user
    await User.updateOrCreate(
      { email: 'admin@example.com' },
      {
        email: 'admin@example.com',
        password: 'admin123',
        fullName: 'Admin User',
        role: 'admin',
      }
    )

    // Create regular user
    await User.updateOrCreate(
      { email: 'user@example.com' },
      {
        email: 'user@example.com',
        password: 'user123',
        fullName: 'Regular User',
        role: 'user',
      }
    )

    console.log('✅ Users seeded successfully')
    console.log('Admin: admin@example.com / admin123')
    console.log('User: user@example.com / user123')
  }
}
