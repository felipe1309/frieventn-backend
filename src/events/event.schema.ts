import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EventDocument = HydratedDocument<Event>;

@Schema()
export class Event {
  @Prop({ trim: true, required: true })
  name: string;
  @Prop({ unique: true, trim: true, required: true })
  email: string;
  @Prop({ trim: true, required: true })
  password: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);
