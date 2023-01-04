import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
  Put,
  Param,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { JwtAuthGuard } from 'src/jwt-auth.guard';
import { CreateEventDto } from './dto/create-event.dto';
import { GetEventFromListId } from './dto/getEventFromListId';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Request() req,
    @Body() { description, initDate, name }: CreateEventDto,
  ) {
    const event = await this.eventsService.create(
      {
        description,
        initDate,
        name,
      },
      req.user.id,
    );
    return event;
  }

  @Get()
  async findAll() {
    return await this.eventsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.eventsService.findOne(id);
  }
  @UseGuards(JwtAuthGuard)
  @Put('addUser/:id')
  async addUserEvent(@Param('id') id: string, @Request() req) {
    return await this.eventsService.addUser(req.user.id, id);
  }
  @UseGuards(JwtAuthGuard)
  @Get('miEvents')
  async listEventsFromListId(@Request() req) {
    console.log(req.user)
    await 'el pepe'
  }
}
