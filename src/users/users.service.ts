import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId,Types } from 'mongoose';
import { User, UserDocument } from './users.schema';
import { hash, compare } from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async create({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) {
    const plainPassword = await hash(password, 10);
    const user = await this.userModel.create({
      name,
      password: plainPassword,
      email,
    });
    return user;
  }
  async findUserForEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    return user;
  }
  /**
   * metodo que verifica si una contraseña de determinado usurio de la vase de datos es correcta
   * @param password la contraseña que biene por el cuerpo de la peticion
   * @param passwordDb la contraseña (en hash) que biene de la base de datos
   */
  async checkPassword(password: string, passwordDb: string): Promise<boolean> {
    const checkPassword = await compare(password, passwordDb);
    return checkPassword;
  }
  async createEvent(idUser: string, idEvent: Types.ObjectId) {
    const { listEvents } = await this.userModel.findById(idUser);
    const userUpdate = await this.userModel.findByIdAndUpdate(idUser, {
      listEvents: [idEvent, ...listEvents],
    });
    return userUpdate
  }
}
