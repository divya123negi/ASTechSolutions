import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Service title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Service description is required'],
      maxlength: [1000, 'Description is too long'],
    },
 
    services:{
       type: [String],
      required: [true, 'Benefits  are required'],
      validate: {
        validator: (arr) => arr.length > 0,
        message: 'At least one benefit is required',
      },
    }
  },
  { timestamps: true }
);

const Service = mongoose.model('services', serviceSchema);
export default Service;
