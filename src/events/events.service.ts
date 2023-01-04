import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { CreateEventDto } from './dto/create-event.dto';
import { Event, EventDocument } from './event.schema';
@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
    private usersService: UsersService,
  ) {}
  async create(createEventDto: CreateEventDto, adminId: string) {
    const event = await this.eventModel.create({
      name: createEventDto.name,
      adminId,
      description: createEventDto.description,
      initDate: createEventDto.initDate,
    });
    await this.usersService.createEvent(adminId, event._id);
    return event;
  }

  async findAll() {
    return await this.eventModel.find({});
  }

  async findOne(id: string) {
    return await this.eventModel.findById(id);
  }
  /**
   * metodo que agraga un usurio a un evento en especifico
   * @param idUser el id del usurio que se va a agregar al evento
   * @param idEvent el id del evento en el cual vamos a agregar el usurio
   * @returns el evento actulizado
   */
  async addUser(idUser: string, idEvent: string) {
    const user = await this.eventModel.findById(idEvent);
    const { name, description, initDate, adminId, listUserId } = user;
    if (idUser === adminId.toString()) return user;
    for (let i = 0; i < listUserId.length; i++) {
      if (idUser === listUserId[i].toString()) return user;
    }
    const eventUpdate = await this.eventModel.findByIdAndUpdate(
      idEvent,
      {
        name,
        description,
        initDate,
        adminId,
        listUserId: [idUser, ...listUserId],
      },
      { new: true },
    );
    return eventUpdate;
  }
  async getDataFromListIdEvents(listId:string[]) {
    let listDataEvent;
    for (let i = 0; i < listId.length; i++) {
      const idEvent = listId[i];
      const dataEvent = await this.eventModel.findById(idEvent)
      listDataEvent = [...listDataEvent, dataEvent]
    }
    return listDataEvent;
  }
}
