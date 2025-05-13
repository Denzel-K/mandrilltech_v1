import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    maxlength: [100, 'Name cannot be more than 100 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
  },
  subject: {
    type: String,
    required: [true, 'Please provide a subject'],
    maxlength: [200, 'Subject cannot be more than 200 characters'],
  },
  message: {
    type: String,
    required: [true, 'Please provide a message'],
  },
  read: {
    type: Boolean,
    default: false,
  },
  replied: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  replies: [
    {
      content: {
        type: String,
        required: true,
      },
      sentAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

// Check if the model is already defined to prevent overwriting during hot reloads
let Message;

// Check if we're in an environment where mongoose is fully available
if (mongoose && mongoose.models) {
  Message = mongoose.models.Message || mongoose.model('Message', MessageSchema);
} else {
  // For Edge runtime or other environments where mongoose is not fully available
  console.warn("Mongoose models not available, using placeholder Message model");
  Message = {
    find: () => [],
    findById: () => null,
    create: () => null,
    findByIdAndUpdate: () => null
  };
}

export default Message;
