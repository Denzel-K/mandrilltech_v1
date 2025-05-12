# Admin Setup Instructions

This directory contains scripts for setting up and managing your Mandrill Technologies portfolio website.

## Creating an Admin User

To create an admin user that can access the admin dashboard, follow these steps:

1. Make sure your MongoDB connection is properly set up in your `.env.local` file:
   ```
   MONGODB_URI=your_mongodb_connection_string
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

3. Run the admin creation script:
   ```bash
   node scripts/create-admin.js
   ```

4. The script will create an admin user with the following default credentials:
   - Email: denzelk741@gmail.com
   - Password: Admin@123

   You can modify these credentials in the script before running it if you prefer different values.

5. Once the script completes successfully, you can access the admin dashboard at:
   ```
   http://localhost:3000/admin
   ```

6. Log in with the email and password you set up.

## Admin Dashboard Features

After logging in, you'll have access to:

1. **Project Management**
   - Add new projects
   - Edit existing projects
   - Delete projects

2. **Message Management**
   - View messages from the contact form
   - Reply to messages (sends an email to the sender)
   - Mark messages as read

## Security Notes

- For security reasons, it's recommended to change your password after the first login.
- The admin dashboard is only accessible by manually typing the URL and logging in.
- Make sure to use a strong password for your admin account.
