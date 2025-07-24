import { Schema, model, Document, FilterQuery } from 'mongoose';

export interface IUser extends Document {
  email: string;
  name?: string;
  phoneNumber?: string;
  photos?: string[];
  username?: string;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  name: { type: String },
  phoneNumber: { type: String },
  photos: [{ type: String }],
  username: { type: String }
});

const User = model<IUser>('User', userSchema);

export default User;
export const findOne = (query: FilterQuery<IUser>) => User.findOne(query);
