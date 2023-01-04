import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/users.schema';
export type EventDocument = HydratedDocument<Event>;

@Schema()
export class Event {
  @Prop({ trim: true, required: true, unique: true })
  name: string;
  @Prop({ trim: true, required: true })
  description: string;
  @Prop({ type: Date, trim: true, required: true })
  initDate: Date;
  @Prop({
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User',
  })
  adminId: User;
  @Prop({
    type: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    default: [],
  })
  listUserId: string[];
}

export const EventSchema = SchemaFactory.createForClass(Event);
