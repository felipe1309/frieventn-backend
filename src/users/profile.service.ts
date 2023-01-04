import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';

@Injectable()
export class ProfileService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async getData(idUser: string) {
    const user = await this.userModel.findById(idUser);
    if(!user) return null
    return {
      name: user.name,
      email: user.email,
      id: user._id,
      listEvents: user.listEvents,
    };
  }
}
