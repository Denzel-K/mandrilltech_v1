# Mandrill Technologies Portfolio Website

A modern portfolio website for Mandrill Technologies, showcasing Denzel Kariuki Ndegwa's skills, projects, and services as a fullstack developer.

## Features

- **Modern Design**: Featuring glassmorphism, animations, and a dark theme inspired by mandrill colors
- **Portfolio Page**: Showcasing skills, technologies, and projects
- **Business Page**: Highlighting services and including a contact form
- **Admin Dashboard**: Secure area for managing projects and messages
- **MongoDB Integration**: For storing projects and contact form submissions
- **Email Functionality**: For responding to contact form submissions

## Tech Stack

- **Frontend**: Next.js, React, Framer Motion, TailwindCSS
- **Backend**: Next.js API Routes, MongoDB/Mongoose
- **Authentication**: NextAuth.js
- **Email**: Nodemailer
- **Form Handling**: React Hook Form, Zod

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB database

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/mandrilltech_v1.git
   cd mandrilltech_v1
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file based on the `.env.local.example` file:
   ```bash
   cp .env.local.example .env.local
   ```

4. Update the `.env.local` file with your own values:
   - MongoDB connection string
   - NextAuth secret
   - Email server configuration

5. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Setting Up Admin User

To create an admin user for accessing the admin dashboard:

1. Create a script to add a user to your MongoDB database
2. Use bcrypt to hash the password
3. Ensure the user has the role 'admin'

Example script (save as `scripts/create-admin.js`):
```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  createdAt: Date,
});

const User = mongoose.model('User', UserSchema);

async function createAdmin() {
  try {
    await mongoose.connect(MONGODB_URI);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('your-secure-password', salt);

    const admin = new User({
      name: 'Denzel Kariuki',
      email: 'your-email@example.com',
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date(),
    });

    await admin.save();
    console.log('Admin user created successfully');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
}

createAdmin();
```

Run the script with:
```bash
node scripts/create-admin.js
```

## Folder Structure

- `/app`: Main application code
  - `/api`: API routes
  - `/components`: React components
  - `/lib`: Utility functions and models
  - `/admin`: Admin dashboard pages
  - `/business`: Business page
- `/public`: Static assets

## Deployment

This project can be deployed on Vercel, Netlify, or any other platform that supports Next.js applications.

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

1. Push your code to a GitHub repository
2. Import the project to Vercel
3. Add your environment variables
4. Deploy

## License

This project is licensed under the MIT License.
