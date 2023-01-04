import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Event } from 'src/events/event.schema';
import { Transform } from 'class-transformer';
export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Transform(({ value }) => value.toString())
  _id: mongoose.ObjectId;
  @Prop({ trim: true, required: true })
  name: string;
  @Prop({ unique: true, trim: true, required: true })
  email: string;
  @Prop({ trim: true, required: true })
  password: string;
  @Prop({ type: [mongoose.Types.ObjectId], ref: "Event", default: [] })
  listEvents: Event[];
}

export const UserSchema = SchemaFactory.createForClass(User);
