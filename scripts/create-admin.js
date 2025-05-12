const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

// Admin user details - you can modify these
const adminDetails = {
  name: 'Denzel Kariuki',
  email: 'denzelk741@gmail.com',
  password: 'Admin@123', // You should change this to a secure password
  role: 'admin',
};

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined in .env.local');
  console.error('Please make sure you have a valid MongoDB connection string in your .env.local file');
  process.exit(1);
}

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  createdAt: Date,
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function createAdmin() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });
    console.log('Connected to MongoDB successfully');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminDetails.email });

    if (existingAdmin) {
      console.log(`Admin user with email ${adminDetails.email} already exists`);
      console.log('\n----------------------------------');
      console.log('Admin dashboard can be accessed at: http://localhost:3000/admin');
      console.log(`Login with email: ${adminDetails.email} and your password`);
      console.log('----------------------------------\n');
      await mongoose.connection.close();
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminDetails.password, salt);

    const admin = new User({
      name: adminDetails.name,
      email: adminDetails.email,
      password: hashedPassword,
      role: adminDetails.role,
      createdAt: new Date(),
    });

    await admin.save();
    console.log('Admin user created successfully!');
    console.log('\n----------------------------------');
    console.log('Admin dashboard can be accessed at: http://localhost:3000/admin');
    console.log(`Login with email: ${adminDetails.email}`);
    console.log(`Password: ${adminDetails.password}`);
    console.log('----------------------------------');
    console.log('Make sure to change this password after your first login for security reasons.\n');

    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error('Error creating admin user:', error);

    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
      console.log('MongoDB connection closed');
    }

    process.exit(1);
  }
}

createAdmin();
