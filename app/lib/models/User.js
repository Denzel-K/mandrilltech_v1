import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    maxlength: [100, 'Name cannot be more than 100 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [8, 'Password should be at least 8 characters long'],
    select: false, // Don't return password by default
  },
  role: {
    type: String,
    enum: ['admin'],
    default: 'admin',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Check if the model is already defined to prevent overwriting during hot reloads
let User;

// Check if we're in an environment where mongoose is fully available
if (mongoose && mongoose.models) {
  User = mongoose.models.User || mongoose.model('User', UserSchema);
} else {
  // For Edge runtime or other environments where mongoose is not fully available
  console.warn("Mongoose models not available, using placeholder User model");
  User = {
    findOne: () => null,
    findById: () => null,
    create: () => null
  };
}

export default User;
