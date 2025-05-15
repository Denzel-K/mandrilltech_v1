import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for this project'],
    maxlength: [100, 'Title cannot be more than 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description for this project'],
  },
  technologies: {
    type: [String],
    required: [true, 'Please provide at least one technology used in this project'],
  },
  category: {
    type: String,
    required: [true, 'Please provide a category for this project'],
    enum: ['Web', 'Mobile', 'Desktop', 'Other'],
  },
  imageUrl: {
    type: String,
    required: [true, 'Please provide an image for this project'],
  },
  liveUrl: {
    type: String,
  },
  githubUrl: {
    type: String,
  },
  downloadUrl: {
    type: String,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Check if the model is already defined to prevent overwriting during hot reloads
let Project;

// Check if we're in an environment where mongoose is fully available
if (mongoose && mongoose.models) {
  Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);
} else {
  // For Edge runtime or other environments where mongoose is not fully available
  console.warn("Mongoose models not available, using placeholder Project model");
  Project = {
    find: () => [],
    findById: () => null,
    create: () => null,
    findByIdAndUpdate: () => null,
    findByIdAndDelete: () => null
  };
}

export default Project;
