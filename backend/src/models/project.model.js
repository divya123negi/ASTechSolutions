import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [1000, 'Description is too long'],
    },
    category: {
      type: String,
      required: [true, 'Category is required']
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
    },
    clientName: {
      type: String,
     
    },
    year: {
      type: Number,
   
    },
    technologiesUsed: {
      type: [String],
      required: [true, 'Technologies used are required'],
      validate: {
        validator: (arr) => arr.length > 0,
        message: 'At least one technology is required',
      },
    },

  imageUrl: {
  type: String,
  default: '',
  validate: {
    validator: (url) => {
      return !url || /^https?:\/\/.*\.(?:png|jpg|jpeg|webp|svg)(\?.*)?$/.test(url);
    },
    message: 'Invalid image URL format',
  },
}

  },
  { timestamps: true }
);

const Project = mongoose.model('projects', projectSchema);
export default Project; 