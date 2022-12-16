import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ trim: true, required: true })
  name: string;
  @Prop({ unique: true, trim: true, required: true })
  email: string;
  @Prop({ trim: true, required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
