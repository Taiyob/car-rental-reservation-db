import { model, Schema } from 'mongoose';
import { TCar } from './car.interface';

const carSchema = new Schema<TCar>(
  {
    name: { type: String, required: [true, 'Name is required'] },
    description: { type: String, required: [true, 'Description is required'] },
    color: { type: String, required: [true, 'Color is required'] },
    isElectric: {
      type: Boolean,
      required: [true, 'Electric status is required'],
    },
    status: { type: String, enum: ['available', 'unavailable'] },
    features: {
      type: [String],
      required: true,
      validate: [
        (arr: string[]) => arr.length > 0,
        'At least one feature is required',
      ],
    },
    pricePerHour: {
      type: Number,
      required: [true, 'Price per hour is required'],
    },
    //createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Car = model<TCar>('Car', carSchema);
